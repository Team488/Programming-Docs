# Tank Drive Solution

This is one working solution to the [Tank Drive](/curriculum/challenges/tank-drive) challenge. Try it yourself first - there's not much to gain from reading this before you've struggled with it a bit!

Only two pieces of code need to change. Everything else in these files is already written for you.

### DriveSubsystem.tankDrive()

The starter code only drives the left motor. The fix is to give the right motor its power too:

```java
    public void tankDrive(double leftPower, double rightPower) {
        frontLeft.setPower(leftPower);
        frontRight.setPower(rightPower);
    }
```

- Question: Does the order of the two setPower calls matter?

### TankDriveWithJoysticksCommand.execute()

The starter code reads the left stick and sends `0` as the right power. Read the right stick as well, and pass both values through:

```java
    @Override
    public void execute() {
        // Get values from the joysticks:
        double leftValue = operatorInterface.gamepad.getLeftVector().getY();
        double rightValue = operatorInterface.gamepad.getRightVector().getY();

        // Pass values into the DriveSubsystem so it can control motors:
        drive.tankDrive(leftValue, rightValue);
    }
```

If your tests pass but the robot drives strangely in the [simulator](/curriculum/robot-fundamentals/simulator), check the signs: pushing a stick forward should move that side of the robot forward.
