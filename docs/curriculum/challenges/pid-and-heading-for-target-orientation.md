# PID and Heading for Target Orientation

In this lesson, you'll upgrade the DriveToOrientationCommand from [Rotating to a target orientation](/curriculum/challenges/rotating-to-a-target-orientation).

Instantiating the PID is the same as in [PID for Target Position](/curriculum/challenges/pid-for-target-position), so that's the first step: Implement then test.

Hint: Remember that the PID method first calculates the difference (error) between the goal and current position. So, you'll need to redo your execute function so that the PID loop drives toward 0 error. 

## Dealing with Circles - ContiguousDouble and Rotation2d

What's new is the challenge around "circular math" relating to the heading: knowing that, for example, the shortest difference between 179 and -179 degrees is just 2 degrees.

As you can imagine, we've had to deal with this before, and our solution is the `ContiguousDouble`, a class that can be given a number as well as a maximum and minimum value for that number. As a special case relating to robot rotation, there is also WPILib's `Rotation2d`, which already keeps itself wrapped between 180 and -180 for you. An additional challenge is that `Rotation2d` works in radians so conversions will be needed as follows:

```java
import edu.wpi.first.math.geometry.Rotation2d;

// ...

    @Override
    public void execute() {
        Rotation2d goal2d;
        goal2d = Rotation2d.fromDegrees(goal);
        double heading = pose.getCurrentHeading().getRadians();
        Rotation2d currentHeading = new Rotation2d(heading);
        Rotation2d difference2d = currentHeading.minus(goal2d);     //difference(goal);
        double difference = difference2d.getDegrees();
        double power = pid.calculate(0, difference);
        drive.tankDrive(-power, power);
    }
// ...
```

We're transforming the raw heading value into a `Rotation2d`, and then having that class handle all the "shortest difference" math for us. You can then feed that value into your PID, though you'll want to think through what your "goal" and "current" are.

* If your currentHeading is 170 and your goal is -170, the difference comes out as 20 degrees rather than 340 - that's the whole point. Watch the sign, though: it depends on which way round you subtract.
* As a result, you should consider which of the following approaches makes more sense to you:
  * **Tell the PID your currentHeading is always 0, and your goal is the difference**
    * This has the advantage of having no numerical inversions; the PID will give you back a positive number (which in our rotation definition, means you should turn left/counterclockwise), which makes intuitive sense for some people
    * However, it is a bit odd to think of the robot as stationary, and the goal as increasing or decreasing over time.
  * **Tell the PID your currentHeading is the difference, and your goal is 0**
    * This is basically saying that you have some error, and you want that error to go to 0.
    * This will require some negative sign somewhere, as by default that would return a negative value when you have a positive difference

Take whichever approach makes more sense to you. Or...

## HeadingModule

It turns out this whole rotation thing is something we do a lot, so we even have something for this! The `HeadingModule` wraps a PIDManager and does all of the circular math internally, so you hand it a target heading and it hands you back a power value.

You'll need these imports:

```java
import xbot.common.subsystems.drive.control_logic.HeadingModule;
import xbot.common.subsystems.drive.control_logic.HeadingModule.HeadingModuleFactory;
```

Note that HeadingModule gets the PoseSubsystem itself, which is why the constructor below doesn't need one:

```java
// ...
    DriveSubsystem drive;
    PIDManager pid;
    HeadingModule headingModule;
    
    @Inject
    public DriveToOrientationCommand(DriveSubsystem driveSubsystem, HeadingModuleFactory headingModuleFactory, PIDManagerFactory pidManagerFactory) {
        this.drive = driveSubsystem;
        pid = pidManagerFactory.create("Rotate");
        headingModule = headingModuleFactory.create(pid);
    }

    // ...

    @Override
    public void execute() {
        double power = headingModule.calculateHeadingPower(goal);
        drive.tankDrive(-power, power);
    }
}
```

**Note:** this code may not work in the visualizer, as in the Edu Project we did some things differently compared to the real robot.

Next: [Running XbotEDU on a Real Robot](/curriculum/challenges/running-on-a-real-robot)
