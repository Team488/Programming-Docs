# PID for Target Position

As part of [Moving to a target position](/curriculum/challenges/moving-to-a-target-position), you wrote your own PD controller - something that decided how to drive based on 
1. The **P**roportional error between you and the target (distance)
1. The **D**erivative (rate of change) of the error between the robot and the target (speed)

Rather than rewrite that code over and over, we have a highly-tested and reliable PD controller that you can use.

## Setting up the PIDManager

To get it, we will get a PIDManagerFactory, and we'll use that to create a PIDManager, which is what we actually will use in your class (ask a mentor if you want an explanation for this two-step process). This is the same Factory pattern you read about in [Factories](/core-programming/patterns/providers-factories), and Dagger hands you the factory the same way it hands you the DriveSubsystem.

PIDManagerFactory is defined inside the PIDManager class, so you'll need this import:

```java
import xbot.common.math.PIDManager;
import xbot.common.math.PIDManager.PIDManagerFactory;
```

Let's modify the DriveToPositionCommand as follows:

```java
    DriveSubsystem drive;
    PoseSubsystem pose;
    PIDManager pid;
    
    @Inject
    public DriveToPositionCommand(DriveSubsystem driveSubsystem, PoseSubsystem pose, PIDManagerFactory pidManagerFactory){
        this.drive = driveSubsystem;
        this.pose = pose;
        this.pid = pidManagerFactory.create("DriveToPoint");
    }
```

We can also tell the PIDManager what the acceptable "finishing conditions" are:

```java
    @Inject
    public DriveToPositionCommand(DriveSubsystem driveSubsystem, PoseSubsystem pose, PIDManagerFactory pidManagerFactory){
        this.drive = driveSubsystem;
        this.pose = pose;
        this.pid = pidManagerFactory.create("DriveToPoint");
        
        pid.setEnableErrorThreshold(true); // Turn on distance checking
        pid.setErrorThreshold(0.1);
        pid.setEnableDerivativeThreshold(true); // Turn on speed checking
        pid.setDerivativeThreshold(0.1);
    }
```

Let's also give it some P and D values - though you should have better values from your own testing rather than the ones I picked out of a hat here:

```java
    @Inject
    public DriveToPositionCommand(DriveSubsystem driveSubsystem, PoseSubsystem pose, PIDManagerFactory pidManagerFactory){
        this.drive = driveSubsystem;
        this.pose = pose;
        this.pid = pidManagerFactory.create("DriveToPoint");
        
        pid.setEnableErrorThreshold(true); // Turn on distance checking
        pid.setErrorThreshold(0.1);
        pid.setEnableDerivativeThreshold(true); // Turn on speed checking
        pid.setDerivativeThreshold(0.1);
        
        // manually adjust these values to adjust the action
        pid.setP(0.5);
        pid.setD(2);
    }
```

Finally, the PIDManager holds onto some information that needs to be reset each time the command is run, just like how you probably used a variable to hold onto the last position of the robot. As a result, we'll call the PIDManager's reset() function in initialize:

```java
    @Override
    public void initialize() {
        // If you have some one-time setup, do it here.
        pid.reset();
    }
```

## Using the PIDManager to get to our target

Now to use this thing! Do something like the code below (it may be slightly different depending on how you wrote your DriveSubsystem). Here `goal` is whatever field you stored the target in when `setTargetPosition()` was called:

```java
    @Override
    public void execute() {
        double currentPosition = pose.getPosition();
        double power = pid.calculate(goal, currentPosition);
        drive.tankDrive(power, power);
    }
```

Our execute() is so short now! And we can do something similar for isFinished():

```java
    @Override
    public boolean isFinished() {
        return pid.isOnTarget();
    }
```

All that positional error checking, and speed checking, are just done automatically for you as long as you've enabled them and set some thresholds, which we did in our constructor. What a time savings!

There's all sorts of features the PIDManager brings to the table that we haven't even used yet:
- You can set a time threshold, so the robot has to be "on target" for a certain time duration before it reports that it is done
- You can modify the P, I, and D values while the robot is running using your laptop without recompiling the code

And most importantly, there are 15+ tests that run against the PIDManager every time the robot code is built, making sure that this critical piece of code is in great shape; you'll still need to test your class's overall logic, but you can feel confident that the PIDManager is behaving well.

Go ahead and run the LinearTestVisualizer to make sure everything works, and once you're ready, let's move on to the next lesson and upgrade rotation.

**note**: TurnLeft90DegreesCommand can be extended from the more general case DriveToOrientationCommand

Next Lesson: [PID and Heading for Target Orientation](/curriculum/challenges/pid-and-heading-for-target-orientation)
