# Running XbotEdu on a Real Robot

## Overview

Time to actually get some code onto a robot computer (a RoboRIO) instead of just running it on your laptop. By the end of this, you will know how to deploy code onto the Robox and potentially even one of our older competition robots!

Handy addresses for later in this page:
- Wifi IP = 10.4.88.2
- USB IP = 172.22.11.2

If you only did the minimal computer setup at the start of the curriculum, you may need to install the FRC Game Tools from [Full Programming Onboarding](https://github.com/Team488/XbotEdu/wiki/Programming-Onboarding). Check if you have **FRC Driver Station** installed - if you don't have it, you will need to install the FRC Game Tools.

## The Robox
The Robox is a "robot-in-a-box" that we built a few years ago and have been using for all sorts of testing ever since.
1. Get the Robox from the electronics closet (and/or find somebody who knows where the electronics closet is and what the Robox looks like)
1. The robox comes with a power adapter. Plug one end into a traditional wall outlet, and the other into the red Anderson battery connector.
1. Turn on the robox by closing the main breaker (if this is your first time, find somebody who knows how to do this)
1. There should be a USB A to B cable, with the B end plugged into the [RoboRIO](https://github.com/Team488/XbotEdu/wiki/Roborio) (the large gray square). Plug the other end into your laptop
1. On your laptop, press Win+R, then type cmd, and hit enter. When the command window appears, do the following:
  1. Type, without the quotes: "ping 172.22.11.2"
  1. Hit enter
  1. If you see several lines like "Reply from 172.22.11.2: bytes=32 time<1ms TTL=64". Then things are good. If not, try using Wifi
1. If the wired connection didn't work, or if you need to control the robot at a distance, then it's better to use wifi. 
  1. Change your wireless network to "488_2018" or something that looks like that. (All of our robot networks have 488 somewhere in their name).
  1. On your laptop, press Win+R, then type cmd, and hit enter
  1. Type, without the quotes: "ping 10.4.88.2"
  1. Hit enter
  1. If you see several lines like "Reply from 10.4.88.2: bytes=32 time<1ms TTL=64". Then things are good. If not, seek out a mentor or veteran for help.

## Getting code onto the Robox
### Starting Fresh
It's time to put some code on an actual RoboRIO, instead of just running tests on your computer. We are going to use the FRCRobotTemplate project, a stripped-down "skeleton" project that has just enough code to boot up. Every year, we build the code for the competition robot using this template.

1. Create a new repository using our template as a base: https://github.com/new?template_name=FRCRobotTemplate&template_owner=Team488
1. Clone your new repository onto your computer (this one is generated from a template, so it isn't a fork like XbotEdu was)
1. Open the project in IntelliJ

### Getting a DriveSubsystem working
The FRCRobotTemplate already has a DriveSubsystem.java, and it references the ElectricalContract class to determine which devices are being used.

**⭐⭐ This section no longer matches the FRCRobotTemplate! We now largely use a different type of drivetrain called Swerve Drive which is not represented below. The descriptions below are still valid as concepts, but the class and method names have moved on - the current template has no getLeftLeader()/getRightLeader(), and its contracts describe swerve modules instead. The code in FRCRobotTemplate will run on the Robox, and you can still practice deploying it. Treat the snippets below as an illustration of the idea, and ask a mentor for the current wiring.**

```java
    @Inject
    public DriveSubsystem(XCANMotorControllerFactory mcFactory, XPropertyManager propManager, ElectricalContract contract, PIDManagerFactory pf) {
        log.info("Creating DriveSubsystem");

        this.leftLeader = mcFactory.create(contract.getLeftLeader());
        this.rightLeader = mcFactory.create(contract.getRightLeader());

        positionPid = pf.create(getPrefix() + "PositionPID");
        rotationPid = pf.create(getPrefix() + "RotationPID");
    }
```

On our robots, we typically have multiple implementations of the ElectricalContract. You can think of each copy of the ElectricalContract as a mapping for a specific robot. As an example, you might have a real robot chassis with one device mapping, but the Robox might have different mappings.

In the current template you'll find several of these side by side in `src/main/java/competition/electrical_contract/`: one per season (`Contract2023`, `Contract2025`, `Contract2026`), a `RoboxContract` for the Robox, and a `UnitTestCompetitionContract` for tests. The Robox is the one you want for this challenge.

```java
    @Override
    public CANMotorControllerInfo getLeftLeader() {
        return new CANMotorControllerInfo(
                            "LeftLeader",
                            MotorControllerType.SparkMax,
                            CANBusId.RIO,
                            31,
                            new CANMotorControllerOutputConfig());
    }

    @Override
    public CANMotorControllerInfo getRightLeader() {
        return new CANMotorControllerInfo(
                            "RightLeader",
                            MotorControllerType.SparkMax,
                            CANBusId.RIO,
                            32,
                            new CANMotorControllerOutputConfig());
    }
```
 
Your target, whether it's the Robox or a real robot, will likely have different numbers. If you're using the Robox, the numbers are labeled directly on the speed controllers. Choose any 2 speed controllers and use their numbers instead of the default ones.

### Getting a command ready
The FRCRobotTemplate already has a TankDriveWithJoysticksCommand.java. It assumes one gamepad - if you have more or different controllers, you may need to modify code here.

If you're using the robox and don't have any controllers on hand, you can modify the command to always drive forward at full speed. (Obviously, this would be a very bad idea if you were using an actual robot with wheels. Don't do that.)

This command is also considered the default command (check SubsystemDefaultCommandMap.java), so it will automatically run when the robot starts.

### Deploying code to the robot

At the top of the IntelliJ window, from the build target selector, select "Build & Deploy Robot".
Wait for the process to complete. Your output window should look something like this:
```java
BUILD SUCCESSFUL in 19s
15 actionable tasks: 8 executed, 7 up-to-date
```

### Enabling the Robot
1. Open the FRC Driver Station on your computer (should have already been installed during onboarding as part of the FRC Game Tools).
1. Click the gear icon on the left side of your screen, in that screen make the team number "488".
1. If you're using an actual robot, make sure your hand is hovering over the ENTER key. Pressing ENTER will disable the robot at any time.
1. Enable the robot, and observe what happens.
