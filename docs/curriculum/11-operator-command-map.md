# Operator Command Map

How buttons on the gamepad are connected to robot actions.

## The Problem

You have subsystems that can do things (drive, shoot, climb) and commands that control them. But how does pressing the A button on a gamepad actually make the robot shoot?

The **OperatorCommandMap** is the bridge. It connects every button, trigger, and D-pad direction to a specific command.

```
Driver presses A  →  OperatorCommandMap  →  ShooterFireCommand runs
```

## How XBot Organizes Button Bindings

XBot uses three separate classes to wire everything up:

| Class | What It Does |
|-------|-------------|
| **OperatorInterface** | Creates the gamepad objects (driver, operator, debug) |
| **OperatorCommandMap** | Binds buttons to commands |
| **SubsystemDefaultCommandMap** | Sets default commands for each subsystem |

## OperatorInterface: The Gamepad Provider

The `OperatorInterface` creates and exposes the gamepads. It is a `@Singleton` because there is only one set of physical controllers.

```java
@Singleton
public class OperatorInterface {
    public XXboxController driverGamepad;    // Port 0 - driver
    public XXboxController operatorGamepad;   // Port 1 - operator
    public XXboxController setupDebugGamepad; // Port 2 - debug/testing

    @Inject
    public OperatorInterface(
            XXboxControllerFactory controllerFactory,
            PropertyFactory pf) {

        // Create gamepad on USB port 0
        driverGamepad = controllerFactory.create(0);
        driverGamepad.setLeftInversion(false, true);   // Invert Y-axis
        driverGamepad.setRightInversion(true, true);

        operatorGamepad = controllerFactory.create(1);
        setupDebugGamepad = controllerFactory.create(2);

        // Tunable deadband (how far you must push the stick before it responds)
        pf.setPrefix("OperatorInterface");
        driverDeadband = pf.createPersistentProperty("Driver Deadband", 0.12);
    }
}
```

<details>
<summary><strong>What is a deadband?</strong></summary>

A **deadband** is a small zone near the center of a joystick where input is ignored. Joysticks do not always return exactly to 0 when released -- they might read 0.05 or 0.08. The deadband ignores tiny values so the robot does not drift when you let go of the stick.

```
Joystick position:  -1.0  [=======DEADBAND=======]  1.0
                            ↑                  ↑
                        -0.12               0.12
                    (anything here = 0)
```

</details>

## OperatorCommandMap: Binding Buttons to Commands

This is where you wire every button on the gamepad to a command. XBot uses a pattern where each group of related bindings has its own setup method.

```java
@Singleton
public class OperatorCommandMap {

    @Inject
    public OperatorCommandMap() {}  // Dagger creates the singleton

    // Driver controls -- movement, aiming, resetting
    @Inject
    public void setupDriveCommands(
            OperatorInterface oi,
            SetRobotHeadingCommand resetHeading,
            PrecisionModeCommand precisionMode,
            RotateToHubCommand rotateToHub) {

        // Start button -> reset robot heading to 0
        oi.driverGamepad.getifAvailable(XXboxController.XboxButton.Start)
            .onTrue(resetHeading);

        // Hold Y -> precision mode (slower, finer control)
        oi.driverGamepad.getifAvailable(XXboxController.XboxButton.Y)
            .whileTrue(precisionMode);

        // Hold A -> rotate toward the hub
        oi.driverGamepad.getifAvailable(XXboxController.XboxButton.A)
            .whileTrue(rotateToHub);

        // D-Pad up -> drive to alliance trench position
        oi.driverGamepad.getPovIfAvailable(0)
            .onTrue(driveThroughTrenchCommand);
    }

    // Operator controls -- shooter, intake, climber
    @Inject
    public void setupOperatorCommands(
            OperatorInterface oi,
            ShooterFireCommand shoot,
            IntakeDeployCommand deployIntake,
            ClimberExtendCommand climb) {

        oi.operatorGamepad.getifAvailable(XXboxController.XboxButton.RightBumper)
            .onTrue(shoot);

        oi.operatorGamepad.getifAvailable(XXboxController.XboxButton.A)
            .whileTrue(deployIntake);
    }
}
```

### Available Binding Methods

WPILib provides these ways to trigger a command from a button:

| Method | Behavior | When To Use |
|--------|----------|-------------|
| `onTrue(command)` | Runs command once when button pressed | Reset heading, toggle modes |
| `onFalse(command)` | Runs command once when button released | Cleanup when letting go |
| `whileTrue(command)` | Runs while button held, cancels on release | Driving, shooting, intake |
| `toggleOnTrue(command)` | Toggles on/off each press | Keep something running hands-free |

<details>
<summary><strong>What does getifAvailable do?</strong></summary>

`getifAvailable` is an XBot-specific safety feature. Each button can only be bound **once**. If you try to bind the same button twice, it throws an error at startup.

This prevents bugs like:
```java
// BUG: Both commands try to use the same button
oi.driverGamepad.getifAvailable(XboxButton.A).onTrue(shootCommand);
oi.driverGamepad.getifAvailable(XboxButton.A).onTrue(intakeCommand);
// ERROR! Button A was already claimed by shootCommand
```

For D-Pad directions, use `getPovIfAvailable(angle)` where angle is 0 (up), 90 (right), 180 (down), or 270 (left).

</details>

### Chaining Bindings

A single button can do different things on press and release:

```java
// Hold Y to aim, release to clear the target
oi.driverGamepad.getifAvailable(XXboxController.XboxButton.Y)
    .whileTrue(aimAtTargetCommand)     // Starts when Y is pressed
    .onFalse(clearTargetCommand);      // Runs when Y is released
```

## SubsystemDefaultCommandMap: Default Behaviors

Every subsystem needs a "resting behavior" -- what it does when no command is actively using it. This is set up in the `SubsystemDefaultCommandMap`.

```java
@Singleton
public class SubsystemDefaultCommandMap {

    @Inject
    public SubsystemDefaultCommandMap() {}

    @Inject
    public void setupDriveSubsystem(
            DriveSubsystem drive,
            SwerveDriveWithJoysticksCommand driveCommand) {
        // When no button is pressed, drive with joysticks
        drive.setDefaultCommand(driveCommand);
    }

    @Inject
    public void setupShooterSubsystem(
            ShooterSubsystem shooter,
            ShooterWheelMaintainerCommand maintainer) {
        // Keep shooter at idle speed when not firing
        shooter.setDefaultCommand(maintainer);
    }

    @Inject
    public void setupHopperRoller(
            HopperRollerSubsystem hopper) {
        // Stop when not actively running
        hopper.setDefaultCommand(hopper.getStopCommand());
    }
}
```

Default commands are typically:
- **MaintainerCommands** -- keep a mechanism at its target (PID idle)
- **Joystick drive commands** -- let the driver control when no other command claims drive
- **Stop commands** -- safely stop moving

## How It All Connects

Everything is wired together in `Robot.initializeSystems()`:

```java
@Override
protected void initializeSystems() {
    super.initializeSystems();

    // 1. Set up default commands for every subsystem
    getInjectorComponent().subsystemDefaultCommandMap();

    // 2. Bind buttons to commands
    getInjectorComponent().operatorCommandMap();
}
```

Dagger automatically calls the `@Inject` methods in both maps when they are accessed. Simply calling `getInjectorComponent().operatorCommandMap()` triggers all the button bindings.

### Complete Flow

```
Robot starts
  ↓
Robot.initializeSystems()
  ↓
subsystemDefaultCommandMap()    → Every subsystem gets a default command
  ↓
operatorCommandMap()            → Every button gets bound to a command
  ↓
Driver presses A button
  ↓
XXboxController detects button press
  ↓
OperatorCommandMap says: "A → ShooterFireCommand"
  ↓
ShooterFireCommand.initialize() → Sets shooter to 5000 RPM
  ↓
Command runs until isFinished() returns true
```

---

## Source Code

- [TeamXbot2026 OperatorCommandMap](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/operator_interface/OperatorCommandMap.java)
- [TeamXbot2026 OperatorInterface](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/operator_interface/OperatorInterface.java)
- [TeamXbot2026 SubsystemDefaultCommandMap](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/subsystems/SubsystemDefaultCommandMap.java)
- [XbotEdu OperatorCommandMap](https://github.com/Team488/XbotEdu/blob/main/src/main/java/competition/operator_interface/OperatorCommandMap.java)

---

## Quiz

**Q1:** What does `getifAvailable()` do?

- [ ] A) Checks if a gamepad is connected
- [ ] B) Claims a button and throws an error if it is already claimed
- [ ] C) Returns the battery level of the gamepad
- [ ] D) Makes the gamepad vibrate

<details>
<summary>Answer</summary>

**B) Claims a button and throws an error if it is already claimed**

`getifAvailable` is XBot's safety mechanism that prevents two commands from binding to the same button. Each button can only be claimed once -- duplicates cause a startup error.

</details>

**Q2:** What is the difference between `onTrue(command)` and `whileTrue(command)`?

- [ ] A) There is no difference
- [ ] B) `onTrue` runs once when pressed, `whileTrue` runs as long as the button is held
- [ ] C) `onTrue` is for the operator, `whileTrue` is for the driver
- [ ] D) `onTrue` runs in autonomous mode only

<details>
<summary>Answer</summary>

**B) `onTrue` runs once when pressed, `whileTrue` runs as long as the button is held**

`onTrue` schedules the command once when the button transitions from released to pressed. `whileTrue` schedules the command when pressed and cancels it when released -- the command runs continuously while held.

</details>

**Q3:** Where are default commands set up?

- [ ] A) In the OperatorCommandMap
- [ ] B) In the SubsystemDefaultCommandMap
- [ ] C) In each subsystem's constructor
- [ ] D) In the ElectricalContract

<details>
<summary>Answer</summary>

**B) In the SubsystemDefaultCommandMap**

The `SubsystemDefaultCommandMap` is a separate class with `@Inject` methods that call `subsystem.setDefaultCommand(command)` for each subsystem. It is called during `Robot.initializeSystems()` to give every subsystem a resting behavior.

</details>
