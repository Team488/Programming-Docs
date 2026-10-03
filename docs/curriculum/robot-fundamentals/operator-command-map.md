# Mapping Buttons to Commands

## Basic
If you want a robot to do something when you press a button on a gamepad or joystick, you'll need to learn about the OperatorCommandMap.

In any project based on the Robot Template, a file called OperatorCommandMap.java already exists. This is where you will be creating the mapping. In a new project, it may look like the following:

```java
@Singleton
public class OperatorCommandMap {
    
    // Example for setting up a command to fire when a button is pressed:
    @Inject
    public void setupMyCommands(
            OperatorInterface operatorInterface,
            SetRobotHeadingCommand resetHeading)
    {
        resetHeading.setHeadingToApply(90);
        operatorInterface.gamepad.getifAvailable(XboxButton.Start).onTrue(resetHeading);
    }

}
```

Let's break down what each important piece does.
- The function name: setupMyCommands(). Typically, we have one method for each major robot component. For example, you can see how [in the 2019 code](https://github.com/Team488/TeamXbot2019/blob/master/Competition/src/main/java/competition/operator_interface/OperatorCommandMap.java), we have methods like setupDriveCommands, setupGripperCommands, and setupElevatorCommands.
- The arguments: operatorInterface and resetHeading. You will always need the operator interface, and you need to include the commmand or commands you want to hook up to buttons.

In the body of the method, we do a few things:
1. Configure our commands as needed. The SetRobotHeadingCommand needs a heading to apply, so we set that first.
1. In the operator interface, we get the device the human is going to use. In this case, it is a gamepad.
1. On the gamepad, we "Get if available" the Start button. (This does some sanity checks to make sure you're not trying to use a button that somebody else already used in the code.) For a gamepad, use the `XboxButton` values rather than raw button numbers.
1. With the button, we set it to run our resetHeading command whenever the button is pressed, using `onTrue`. The useful options are:
  - `onTrue` - start the command once, when the button is pressed. Good for commands that do one thing and finish.
  - `whileTrue` - run the command while the button is held, and cancel it on release. Good for "do this as long as I hold the button" behavior.
  - `toggleOnTrue` - start the command on the first press, cancel it on the next press.

## Advanced
### Provider<> and using the same command over and over
You can run into a case where you need to use the same command multiple times. Perhaps you made a command called TurnToAnyAngleCommand, which needs to be given a goal angle, and you want to turn to 4 different directions. You could either do:

```java
    @Inject
    public void setupTurningCommands(
        OperatorInterface operatorInterface,
        TurnToAnyAngleCommand turnUp,
        TurnToAnyAngleCommand turnLeft,
        TurnToAnyAngleCommand turnRight,
        TurnToAnyAngleCommand turnDown,
    ) {
        turnUp.setGoal(90);
        turnLeft.setGoal(180);
        turnRight.setGoal(0);
        turnDown.setGoal(270);

        operatorInterface.gamepad.getifAvailable(XboxButton.Y).onTrue(turnUp);
        operatorInterface.gamepad.getifAvailable(XboxButton.X).onTrue(turnLeft);
        operatorInterface.gamepad.getifAvailable(XboxButton.B).onTrue(turnRight);
        operatorInterface.gamepad.getifAvailable(XboxButton.A).onTrue(turnDown);
    }
```

Or you could use the Provider<> as follows to create the commands "on-demand":

```java
    @Inject
    public void setupTurningCommands(
        OperatorInterface operatorInterface,
        Provider<TurnToAnyAngleCommand> turnProvider
    ) {
        operatorInterface.gamepad.getifAvailable(XboxButton.Y).onTrue(makeTurnCommand(turnProvider, 90));
        operatorInterface.gamepad.getifAvailable(XboxButton.X).onTrue(makeTurnCommand(turnProvider, 180));
        operatorInterface.gamepad.getifAvailable(XboxButton.B).onTrue(makeTurnCommand(turnProvider, 0));
        operatorInterface.gamepad.getifAvailable(XboxButton.A).onTrue(makeTurnCommand(turnProvider, 270));
    }

    private TurnToAnyAngleCommand makeTurnCommand(Provider<TurnToAnyAngleCommand> provider, double goal) {
        TurnToAnyAngleCommand command = provider.get();
        command.setGoal(goal);
        return command;
    }
```

Each call to `provider.get()` hands you a brand new command instance. That matters: a single Command instance can't be bound to several buttons or added to more than one CommandGroup, so when you need "the same" command in several places, a Provider is how you get separate copies of it.
