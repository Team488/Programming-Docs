# Command Groups

Command groups let you combine several commands into one bigger command. You can run commands one
after another, all at the same time, or at the same time until one of them finishes.

There are two ways to build them: the **group classes** and the shorter **builder syntax**. Both do
the same thing.

The examples on this page follow one robot through a typical autonomous routine: deploy the
intake, drive over and pick up a game piece, then shoot it. The command names are made up for
these examples, but they match the kinds of subsystems a real robot has (drive, intake, collector,
shooter, hood).

## Choosing a group

| Group | Runs commands... | Finishes when... |
|-------|------------------|------------------|
| `SequentialCommandGroup` | one after another | the last command finishes |
| `ParallelCommandGroup` | all at once | **every** command has finished |
| `ParallelRaceGroup` | all at once | **any** command finishes |
| `ParallelDeadlineGroup` | all at once | **one specific** command (the deadline) finishes |

## Group classes

### `SequentialCommandGroup`

Runs commands one after another. Each command has to finish before the next one starts.

```java
new SequentialCommandGroup(
    new DeployIntakeCommand(),
    new DriveToPositionCommand(gamePieceLocation),
    new ShootCommand()
);
```

First the robot lowers its intake and waits until it's all the way down. Then it drives to the game
piece. Only once it has arrived does it shoot.

**Use it when** order matters, and each step depends on the one before it being done. You can't
drive into a game piece with the intake still folded up.

### `ParallelCommandGroup`

Runs all commands at the same time. The group finishes when **all** of the commands have finished.

```java
new ParallelCommandGroup(
    new SpinUpShooterCommand(),
    new AimHoodCommand(shotAngle)
);
```

Before taking a shot, the shooter wheels need to reach speed and the hood needs to move to the
right angle. Neither step depends on the other, so the robot does both at once. The group finishes
only when both are ready, so whatever comes next (like feeding the game piece into the shooter)
won't start too early.

**Use it when** you have independent steps that all need to finish before you move on. Running
them together saves time, which matters a lot in a 15-second autonomous.

### `ParallelRaceGroup`

Runs all commands at the same time. The group finishes as soon as **any one** command finishes, and
the rest get interrupted.

```java
new ParallelRaceGroup(
    new CollectUntilGamePieceCommand(),
    new WaitCommand(3)
);
```

The collector runs until its sensor sees a game piece. But if the robot missed it, the collector
could keep spinning forever and the rest of autonomous would never happen. The `WaitCommand` is a
backup: whichever finishes first ends the group. The robot either gets the game piece, or gives up
after 3 seconds and moves on.

**Use it when** there are several ways for a step to be "done" and any of them is good enough.
The most common use is adding a timeout, like above.

::: tip
Timeouts are so common that every command has a shortcut for this:
`new CollectUntilGamePieceCommand().withTimeout(3)` does the same thing.
:::

### `ParallelDeadlineGroup`

Runs all commands at the same time. The group finishes when the **deadline** command finishes, and
the others get interrupted. **The first command you pass in is the deadline.**

```java
new ParallelDeadlineGroup(
    new DriveToPositionCommand(gamePieceLocation), // deadline: the group ends when this ends
    new RunCollectorCommand(),
    new RunHopperCommand()
);
```

The robot drives toward the game piece while running its collector and hopper, so it can grab the
game piece without stopping. `RunCollectorCommand` and `RunHopperCommand` never finish on their
own. They just keep the rollers spinning until something stops them. That's why the drive is the
deadline: once the robot reaches the spot, the group ends and the rollers stop.

**Use it when** one command decides how long the whole step lasts, and the others are "helpers"
that should run alongside it for exactly that long.

How is this different from a race? In a race, *any* command finishing ends the group. If you used
a race here and the collector command happened to finish early, the robot would stop driving
partway there. A deadline group only listens to the deadline.

## Builder syntax

Every `Command` also has methods that build these same groups with less code. You chain them onto
a command instead of creating the group class yourself.

### `.andThen(...)`

Runs commands **in sequence**, one after another.

```java
deployIntakeCommand
    .andThen(driveToGamePieceCommand)
    .andThen(shootCommand);
```

Same as:

```java
new SequentialCommandGroup(
    deployIntakeCommand,
    driveToGamePieceCommand,
    shootCommand
);
```

### `.alongWith(...)`

Runs commands **in parallel**. Ends when **all** of them finish.

```java
spinUpShooterCommand.alongWith(aimHoodCommand);
```

Same as:

```java
new ParallelCommandGroup(spinUpShooterCommand, aimHoodCommand);
```

### `.raceWith(...)`

Runs commands **in parallel**, but ends when **any** of them ends. The rest get interrupted.

```java
collectUntilGamePieceCommand.raceWith(new WaitCommand(3));
```

Same as:

```java
new ParallelRaceGroup(collectUntilGamePieceCommand, new WaitCommand(3));
```

### `.deadlineFor(...)`

Runs commands in parallel, but ends when the **original** command (the one you call it on)
finishes. The others get interrupted. Read it as "this command is the deadline for these others."

```java
driveToGamePieceCommand.deadlineFor(runCollectorCommand, runHopperCommand);
```

Same as:

```java
new ParallelDeadlineGroup(
    driveToGamePieceCommand,
    runCollectorCommand,
    runHopperCommand
);
```

::: warning
Older code and examples may use `.deadlineWith(...)`. It does the same thing, but WPILib has
deprecated it and will remove it, so use `.deadlineFor(...)` in new code.
:::

## Putting it together

You can chain the builder methods to build a whole routine. Here's the full autonomous from this
page:

```java
Command auto = deployIntakeCommand
    .andThen(driveToGamePieceCommand.deadlineFor(runCollectorCommand, runHopperCommand))
    .andThen(spinUpShooterCommand.alongWith(aimHoodCommand))
    .andThen(feedShooterCommand.withTimeout(1));
```

Step by step:

1. Lower the intake.
2. Drive to the game piece with the collector and hopper running, and stop them when the robot
   arrives.
3. Spin up the shooter and aim the hood at the same time, and wait until both are ready.
4. Feed the game piece into the shooter for 1 second.

## Things to know

- Each builder method returns a **new** `Command`. You can store it in a variable (like `auto`
  above) and use it like any other command.

- Once a command is part of a group, it belongs to that group. You can't add the same command
  instance to a second group, or to the same group twice, and you can't schedule it on its own
  anymore. If you need the same action more than once, create a separate instance each time.
