# Command-Based Programming

WPILib's framework for organizing robot behavior with injection support.

## Core Concepts

| Concept | Description |
|---------|-------------|
| **Subsystem** | A physical mechanism on the robot (drive, shooter, elevator) |
| **Command** | An action that runs on one or more subsystems |
| **Requirement** | A command claims the subsystems it needs |

## Subsystem with Injection

```java
public class ShooterSubsystem extends BaseSubsystem {
    private final XCANMotorController motor;

    @Inject
    public ShooterSubsystem(
        XCANMotorControllerFactory factory,
        ElectricalContract contract) {

        if (contract.isShooterReady()) {
            this.motor = factory.create(contract.getShooterMotor(), ...);
        }
    }

    public void setTargetVelocity(double rpm) {
        motor.setRawVelocityTarget(RPM.of(rpm), MotorPidMode.DutyCycle, 0);
    }

    @Override
    public void periodic() {
        // Called every ~20ms -- log data, update dashboard
    }
}
```

## Command with Injection

```java
public class ShooterFireCommand extends BaseCommand {
    private final ShooterSubsystem shooter;

    @Inject
    public ShooterFireCommand(ShooterSubsystem shooter) {
        this.shooter = shooter;
        addRequirements(shooter);
    }

    @Override
    public void initialize() {
        shooter.setTargetVelocity(5000);
    }

    @Override
    public boolean isFinished() {
        return shooter.isAtTargetVelocity();
    }

    @Override
    public void end(boolean interrupted) {
        // Clean up: stop motors, log
    }
}
```

### Command Lifecycle

```
initialize()  →  execute()  →  isFinished()?  →  end()
                   (every loop)    No: repeat
                                   Yes: end()
```

| Method | When | Purpose |
|--------|------|---------|
| `initialize()` | Once at start | Set targets, reset sensors |
| `execute()` | Every loop | Continuous actions |
| `isFinished()` | Every loop | Return `true` to end |
| `end(boolean interrupted)` | Once at end | Clean up |

## Binding to Buttons

```java
@Inject
public OperatorCommandMap(
    OperatorInterface oi,
    ShooterFireCommand fire,
    ShooterStopCommand stop) {

    oi.driverGamepad.a().onTrue(fire);
    oi.driverGamepad.a().onFalse(stop);
}
```

## Command Groups

### Sequential (one after another)

```java
new SequentialCommandGroup(
    new IntakeDeployExtendCommand(),
    new WaitCommand(0.5),
    new ShooterFireCommand()
);
```

### Parallel (at the same time)

```java
new ParallelCommandGroup(
    new ElevatorToHeightCommand(),
    new HoodToAngleCommand()
);
```

### Deadline (run until one finishes)

```java
new ParallelDeadlineGroup(
    new ShooterFireCommand(),       // Main event
    new IntakeFeederCommand()       // Cancelled when shooter is ready
);
```

## Default Commands

A default command runs when no other command requires the subsystem:

```java
shooter.setDefaultCommand(new ShooterMaintainerCommand(shooter));
```

This gives the subsystem a "resting behavior" (like a car idling).

## Source Code

- [TeamXbot2026 ShooterSubsystem](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/subsystems/shooter/ShooterSubsystem.java)
- [TeamXbot2026 ShooterFireCommand](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/subsystems/shooter/commands/ShooterOutputCommand.java)
- [SeriouslyCommonLib BaseCommand](https://github.com/Team488/SeriouslyCommonLib/blob/main/src/main/java/xbot/common/command/BaseCommand.java)
- [TeamXbot2026 OperatorCommandMap](https://github.com/Team488/TeamXbot2026/blob/main/src/main/java/competition/operator_interface/OperatorCommandMap.java)

---

## Quiz

**Q1:** What does `addRequirements(shooter)` do?

- [ ] A) Makes the command run faster
- [ ] B) Claims the subsystem so no other command can use it at the same time
- [ ] C) Deletes the subsystem
- [ ] D) Adds a new motor to the robot

<details>
<summary>Answer</summary>

**B) Claims the subsystem so no other command can use it at the same time**

`addRequirements()` prevents two commands from controlling the same subsystem simultaneously, which would cause unpredictable behavior.

</details>

**Q2:** What is the difference between `SequentialCommandGroup` and `ParallelCommandGroup`?

- [ ] A) Sequential runs commands one after another; Parallel runs them at the same time
- [ ] B) Sequential is faster
- [ ] C) Parallel only works in autonomous
- [ ] D) There is no difference

<details>
<summary>Answer</summary>

**A) Sequential runs commands one after another; Parallel runs them at the same time**

Sequential waits for each command to finish before starting the next. Parallel starts all commands at once and waits for all to finish.

</details>

**Q3:** When does a command's `initialize()` method run?

- [ ] A) Every 20ms
- [ ] B) Once when the command starts
- [ ] C) When the robot is disabled
- [ ] D) When the match ends

<details>
<summary>Answer</summary>

**B) Once when the command starts**

`initialize()` runs exactly once when the command is first scheduled. It is where you set targets, reset sensors, and start motors.

</details>
