# Robot Architecture

Team 488 programs its robots using a model known as the "Command" pattern. 

It roughly works like this:
- A **Robot** is made out of [Subsystems](#subsystems).
  - **Subsystems** have areas of responsibility. A robot might have a DriveSubsystem, an ArmSubsystem, a VisionSubsystem...
  - Basically, every "thing" on the robot is contained by one **Subsystem.**
- [Commands](#commands) use **Subsystems**. One **Subsystem** will have many **Commands** that use it.
  - RaiseArmCommand, LowerArmCommand, and StopArmCommand would all use the **ArmSubsystem**.
  - **Commands** can use more than one **Subsystem**. You could have a RaiseArmAndDriveForwardCommand.
  - **Commands** are often triggered by humans pushing joystick/gamepad buttons.
- The **Scheduler** runs Commands on the robot, and handles conflicts. It decides what happens when somebody tries to run RaiseArmCommand and LowerArmCommand at the same time.


WPILib also has a great page that explains the Command pattern: [What is "command-based" programming?](https://docs.wpilib.org/en/stable/docs/software/commandbased/what-is-command-based.html)

## More Details

### Subsystems
Subsystems are responsible for all of the direct communication with physical devices on the robot (things like motors, sensors etc..). They provide a single place for Commands that need to use these things to do so in a clean, abstract manner.

#### Motivation
For example, imagine a robot that has 2 motors on it (1 per side). All code that needs to move the robot needs to communicate with these 2 motors (this could be a lot of places in the code).  Over time the robot might change and now there are 4 motors instead of 2, all of the places that were talking to the motors need to be updated to account for this change. In order to avoid having to do this bulk updating of code, we use a Subsystem to wrap the motors (however many there are) and just expose out methods that aren't likely to change for others to use.

### Commands

This diagram helps show the lifecycle that a Command goes through: [Commands](https://github.com/Team488/SeriouslyCommonLib/wiki/Commands)

#### Starting commands
On the real robot, commands are often started by a human pushing a joystick button. For example the operator might push a button to run the intake to suck balls into the robot. They can also be manually started by calling `.schedule()` on the command (which you will see in the tests sometimes).

#### Requires
Requires is the way to ensure that only 1 command is telling motors/mechanisms what to do at any given time. For example if you had a command called DriveForward and another one called StopDrive you wouldn't want them both running at the same time or they would fight over the motors and bad things would happen.

A Command can "require" one or more subsystems. What this means in practice is that when this command starts running if there were any commands already running that also required any of these subsystems, those existing commands will be cancelled.

#### Default commands
A Subsystem can optionally have 1 default command specified. This command will be run whenever no other commands that require the subsystem are running. This can be really useful for providing a safe default behavior (for instance for an arm that can move perhaps by default you want to stop its motors so it doesn't hurt itself). Another common use is for a subsystem that will really only have 1 command that ever runs on it and it should be running all the time.

Default Commands for Subsystems are specified in the `SubsystemDefaultCommandMap` class. A default Command must require the Subsystem it is the default for.

#### Operator Command Map

Default commands handle what a Subsystem does when nothing else is happening. The other way Commands get started is a human pressing a button, and those bindings all live in one place: the `OperatorCommandMap` class.

A binding looks like this - ask for the command you want in the method's parameters, then attach it to a button:

```java
operatorInterface.gamepad.getifAvailable(XboxButton.A).whileTrue(togglePrecisionDriveCommand);
```

Keeping every binding in one class means you can answer "what does the A button do?" by reading a single file, instead of hunting through every Command.

See [Mapping Buttons to Commands](/curriculum/robot-fundamentals/operator-command-map) for more detail, including what to do when you need the same Command bound to several buttons.

### Virtual Subsystems

A Subsystem usually represents real hardware, but it is doing two jobs at once: it owns the devices, **and** it acts as a lock. Whenever a Command requires a Subsystem, the Scheduler guarantees that no other Command requiring that same Subsystem runs at the same time.

Sometimes we want that locking behavior without attaching it to hardware. For that we create a Subsystem that owns nothing at all - a "virtual subsystem" - and have Commands require it instead.

The clearest example is the setpoint + maintainer pattern in SeriouslyCommonLib's `BaseSetpointSubsystem`. It creates an empty Subsystem to use purely as a lock:

```java
    private final Subsystem setpointLock;

    public BaseSetpointSubsystem() {
        setpointLock = new Subsystem() {};
    }
```

Two different kinds of Command then require two different things:

- `BaseMaintainerCommand` requires the **real** subsystem. It typically runs as that subsystem's default command, continuously driving the motors toward whatever the current goal is.
- `BaseSetpointCommand` requires the **lock** (`getSetpointLock()`), not the real subsystem.

Why bother? If a command that just sets a new goal required the real subsystem, starting it would cancel the maintainer - the very thing doing the work of getting there. Requiring the lock instead keeps goal-setting commands mutually exclusive with each other, while leaving the maintainer running undisturbed.

The lock behaves like any other Subsystem, so it can have its own default command:

```java
shooter.getSetpointLock().setDefaultCommand(stopCommand);
```

## How tos
- [Mapping Buttons to Commands](/curriculum/robot-fundamentals/operator-command-map) - hooking Commands up to gamepad buttons
