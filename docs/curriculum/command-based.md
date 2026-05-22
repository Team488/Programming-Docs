# Command-Based Programming

How WPILib organizes robot behavior into reusable pieces.

## Core Concepts

| Concept | Description | Analogy |
|---------|-------------|---------|
| **Subsystem** | A physical mechanism on the robot | A kitchen station (grill, prep) |
| **Command** | An action that runs on a subsystem | A recipe (make burger) |
| **Requirement** | A command claims the subsystems it needs | "This recipe needs the grill" |

## Subsystems

A **subsystem** represents one physical mechanism. It provides methods for commands to call.

```java
public class ShooterSubsystem extends BaseSubsystem {
    private final XCANMotorController motor;

    @Inject
    public ShooterSubsystem(XCANMotorControllerFactory factory, ElectricalContract contract) {
        if (contract.isShooterReady()) {
            this.motor = factory.create(contract.getShooterMotor(), ...);
        }
    }

    public void setTargetVelocity(double rpm) {
        motor.setRawVelocityTarget(RPM.of(rpm), MotorPidMode.DutyCycle, 0);
    }

    public boolean isAtTargetVelocity() {
        // Check if motor has reached target
        return true;
    }
}
```

## Commands

A **command** is a specific action that runs on a subsystem.

```java
public class ShooterFireCommand extends BaseCommand {
    private final ShooterSubsystem shooter;

    @Inject
    public ShooterFireCommand(ShooterSubsystem shooter) {
        this.shooter = shooter;
        addRequirements(shooter);  // Claims the shooter -- no other command can use it
    }

    @Override
    public void initialize() {
        shooter.setTargetVelocity(5000);  // Start spinning up
    }

    @Override
    public boolean isFinished() {
        return shooter.isAtTargetVelocity();  // End when target is reached
    }
}
```

### Command Lifecycle

```
initialize()    →    execute()    →    isFinished()?    →    end()
(runs once)         (every loop)       No: repeat              (cleanup)
                                       Yes: end()
```

| Method | When | What To Do |
|--------|------|------------|
| `initialize()` | Once when command starts | Set targets, start motors |
| `execute()` | Every loop while running | Continuous actions (usually not needed) |
| `isFinished()` | Every loop | Return `true` to end the command |
| `end(boolean interrupted)` | Once when command ends | Stop motors, clean up |

## Binding Commands to Buttons

```java
// In operator command map:
oi.driverGamepad.a().onTrue(shooterFireCommand);   // Press A to fire
oi.driverGamepad.a().onFalse(shooterStopCommand);  // Release A to stop
```

| Method | Behavior |
|--------|----------|
| `onTrue(command)` | Runs command once when button is pressed |
| `onFalse(command)` | Runs command once when button is released |
| `whileTrue(command)` | Runs command while button is held (cancels on release) |
| `toggleOnTrue(command)` | Toggles command on/off each press |

## Command Groups

Run multiple commands together:

```java
// Sequential: one after another
new SequentialCommandGroup(
    new IntakeDeployExtendCommand(),  // 1. Deploy intake
    new WaitCommand(0.5),             // 2. Wait
    new ShooterFireCommand()           // 3. Fire
);

// Parallel: at the same time
new ParallelCommandGroup(
    new ElevatorToHeightCommand(),    // Move elevator
    new HoodToAngleCommand()          // Move hood (at the same time)
);

// Deadline: run until the first one finishes
new ParallelDeadlineGroup(
    new ShooterFireCommand(),         // Main event
    new IntakeFeederCommand()         // Runs alongside, cancelled when shooter is ready
);
```

## Default Commands

A **default command** runs whenever no other command is using the subsystem:

```java
shooter.setDefaultCommand(new ShooterMaintainerCommand(shooter));
```

This is like idle behavior -- the shooter stays at a ready speed when the driver is not actively firing.

---

## Quiz

**Q1:** What does `addRequirements(shooter)` do?

- [ ] A) Makes the command run faster
- [ ] B) Claims the subsystem so no other command can use it at the same time
- [ ] C) Adds a motor to the shooter
- [ ] D) Saves the command to a file

<details>
<summary>Answer</summary>

**B) Claims the subsystem so no other command can use it**

This prevents two commands from controlling the same subsystem at the same time (which would cause unpredictable behavior).

</details>

**Q2:** What is the difference between `SequentialCommandGroup` and `ParallelCommandGroup`?

- [ ] A) Sequential is for autonomous only
- [ ] B) Sequential runs commands one after another; Parallel runs them at the same time
- [ ] C) There is no difference
- [ ] D) Parallel is faster

<details>
<summary>Answer</summary>

**B) Sequential runs commands one after another; Parallel runs them at the same time**

Sequential waits for each command to finish before starting the next. Parallel starts all commands at once.

</details>

**Q3:** When does `initialize()` run in a command?

- [ ] A) Every 20ms
- [ ] B) Once when the command starts
- [ ] C) When the robot is disabled
- [ ] D) When the match ends

<details>
<summary>Answer</summary>

**B) Once when the command starts**

`initialize()` runs exactly once when the command is scheduled. It is where you set targets, start motors, and prepare the command to run.

</details>
