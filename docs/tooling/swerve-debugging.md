# Debugging the Swerve Drive System

How to bring up a swerve drivetrain on a real robot and check that every motor is wired and configured correctly. Use this when a robot is new, has been rebuilt, or is driving strangely.

::: warning
Put the robot **on blocks** before any of this, with the wheels free and not touching anything. A miswired swerve module can drive the robot in an unexpected direction at full power.
:::

## Set up before testing

1. Get an Xbox controller for the robot.
2. Update the `main` branch in Git or GitHub Desktop.
3. Open the current season's robot repository (for example `TeamXbot2026`), then run the **Build Robot** configuration.
4. Put the robot you want to test **on blocks**. Make sure the wheels are free and not touching anything.
5. Turn the robot on, then connect to it -- WiFi if it works, otherwise a cable.
6. Open **FRC Driver Station**.
7. Run the **Build & Deploy Robot** configuration while connected to the robot, then connect the controller to your computer.
8. Carefully enable the robot through FRC Driver Station.
9. Open **Elastic (WPILib)**. Choose File, then open layout, find the season repo's `elasticLayout` file, and open it. Halve all the speed limits and set the correct Electrical Contract.

## Test individual motors

1. Press **up on the D-Pad** to put the robot into motor testing mode. Press **right on the D-Pad** to switch between individual motors.
2. Test each motor:
   - Push the **left joystick** slowly upwards. If that motor's wheel moves in the intended direction, the drive motor works.
   - Push the **right joystick** slowly to the right. If the wheel steers in the intended direction, the steering motor works.
3. Repeat for every motor. You only need the up-arrow step once.

If a motor moves the wrong way or not at all, fix its configuration in the code before continuing.

## Back to normal driving

1. Press **down on the D-Pad** to return the robot to normal drive mode.
2. Push the left joystick. All motors should now move together, in the direction you expect.
3. **If the motors jitter**, they may be inverted in the code. Correct the inversion in the [Electrical Contract](/curriculum/robot-fundamentals/electrical-contract).

## Related

- [Robot Coordinate Conventions](/curriculum/robot-fundamentals/coordinate-conventions) -- which way is positive, for both the robot and the field
- [Swerve Drive](/core-programming/patterns/swerve-drive) -- how the swerve code is structured
- [Elastic](/tooling/elastic) -- the dashboard used above
