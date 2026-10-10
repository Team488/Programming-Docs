# Command Groups

## Background
In the Command-Based framework XBOT uses, complex robot behavior is built by composing smaller, reusable Command classes. When you want a robot to do multiple actions in a specific order or at the same time, you use CommandGroups. 

This often comes up in the context of autonomous mode, where in the first 15s of the match the robot moves on its own. But also more and more as what the student drivers want to do gets more complicated we use CommandGroups to enable complex actions during the teleoperated period.

## Learning about CommandGroup classes

Read the short article here: [Command Groups](https://github.com/Team488/SeriouslyCommonLib/wiki/Command-Groups)

## Test your knowledge

Now let's try to tackle some common robot coding challenges with these tools!

Take this [quiz](https://forms.gle/Yt39GZ9DoBDeZ8eo6)

## A basic autonomous mode

Now let's use everything you've learned so far to write a basic autonomous program that is going to drive the robot in a square.

You might want to start by writing a new Command that can drive straight for a specified relative distance from wherever the robot currently is. Note that `DriveToPositionCommand` won't work directly here - it drives to a position measured from where the robot started, not from where it is right now. That new relative-distance command, combined with your turn left 90 degrees command, should give you everything you need to have your robot follow a square.

Some practical notes:
- Put your new classes alongside the others in `src/main/java/competition/subsystems/drive/commands/`.
- To run your group in the simulator, register it the way `OperatorCommandMap` already registers `DriveToPosition` with `SmartDashboard.putData(...)`, or map it to a gamepad button like you did for precision drive. Then [run the simulator](/curriculum/robot-fundamentals/simulator).
- Heads up: a single Command instance can't be added to more than one CommandGroup, and can't be added to the same group twice. A square needs four turns, so you'll need four separate instances rather than reusing one.

Test your program in the simulator (visualized in AdvantageScope)

### Pull Request

Now is another great time to get feedback on your code so far. Make a [Pull Request](/curriculum/challenges/making-a-pull-request) and include:
- a video of your robot doing the square operation in the simulator


### Next Steps

Congratulations on making it this far! You now know a lot of the concepts you need to program a basic robot.

Next we'll level up your current code solutions using some powerful library features the team has built up, but first you need to learn about some of the techniques we use: [Factory Pattern](https://github.com/Team488/XbotEdu/wiki/Curriculum-Lesson-~-Factory-Pattern)
