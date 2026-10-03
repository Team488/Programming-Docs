# Auto-stopping Collector

The 2023 robot had a collector to suck in inflatable cubes. But once the collector had a cube it needed to stop intaking so hard or it would pop the cube.

You're going to implement this feature from scratch yourself in this challenge. So far in the curriculum you've only been working with the drivetrain, in this challenge you'll get to program a different mechanism.

The collector is a motor that you can set the power of just like you've been doing for the drive motors this whole time.

Your first step is to implement a basic Subsystem and Commands for this collector mechanism that can run the motors forwards and backwards.

From there, you'll add in the ability to detect that a cube has been collected and the motor should stop trying so hard.

## Creating a new robot project from our template

First create a new git repository using our template as a base: https://github.com/new?template_name=FRCRobotTemplate&template_owner=Team488

Give the repository a name like "My2023Robot"

Then clone this repository locally

## Create a new Subsystem for the Collector

Create a new folder (aka 'package' in java) in the `subsystems` folder called `collector`

Create a new java class `CollectorSubsystem` that inherits from `BaseSubsystem`.

It should have a `XCANMotorController` motor inside of it that you can make go forward, backwards or stop with functions.

To make this motor in code, ask for `XCANMotorController.XCANMotorControllerFactory motorControllerFactory` in your constructor.

And then in your constructor you can create the motor with:
```java
this.collectorMotor = motorControllerFactory.create(
        new CANMotorControllerInfo("Collector", 25), getPrefix(), "CollectorMotor");
```

This is the same factory you saw in the XbotEdu `DriveSubsystem`. The `25` is the CAN device ID - use whatever ID the collector motor actually has on the robot.

Use `PropertyFactory` (you can ask for it in your constructor) to create `DoubleProperty`s for the amount of power for intake vs eject, that way you can tweak the number quickly without having to redeploy.

## Create intake, outtake and stop Commands

Create 3 new classes: `IntakeCollectorCommand`, `OuttakeCollectorCommand`, and `StopCollectorCommand` that extend `BaseCommand`

Map intake/outtake to reasonable buttons on the gamepad, the same way you mapped precision drive in [Altering Tank Drive](/curriculum/challenges/altering-tank-drive).

Make `StopCollectorCommand` the default command for your new subsystem so the motor will stop when no buttons are pressed.

## Test what you've done so far on the 2023 robot

Put the robot on blocks so it can't accidentally move. Hook up a gamepad to your laptop so you can push your buttons to run the collector.

Verify each button does what you expect.

## Update intake logic so it doesn't pop cubes

You can read the velocity that the motor is turning with `collectorMotor.getVelocity()`. That gives you an `AngularVelocity`, so call `.in(RPM)` on it to get a plain number you can compare against. Using this, we can try to detect if we're trying to intake but the motor isn't actually turning very fast anymore (because a cube is stuck in it). Once we've detected that, we can send a weaker power to the motors to keep the cube in the intake but not pop it!

When this is working, you should be able to run your intake command on the real robot and try feeding it a cube and verify the motor stops once the cube is acquired.

Create a new `DoubleProperty` for the weaker intake power when a cube is detected.

## Test your solution on the 2023 robot!

## Code review

Have a mentor review your code and make any changes requested.

## FIN

Congratulations on reaching the end of the XBOT Edu Curriculum!
