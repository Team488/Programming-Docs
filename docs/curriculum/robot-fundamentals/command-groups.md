# Command Groups

Command groups let you combine several commands into one bigger command. You can run commands one
after another, all at the same time, or at the same time until one of them finishes.

There are two ways to build them: the **group classes** and the shorter **builder syntax**. Both do
the same thing.

## Group classes

### `SequentialCommandGroup`

Runs commands one after another. Each command has to finish before the next one starts.

```java
new SequentialCommandGroup(
    new DriveForwardCommand(2.0),
    new TurnToAngleCommand(90),
    new ShootCommand()
);
```

### `ParallelCommandGroup`

Runs all commands at the same time. The group finishes when **all** of the commands have finished.

```java
new ParallelCommandGroup(
    new DriveForwardCommand(3.0),
    new SpinShooterCommand()
);
```

### `ParallelRaceGroup`

Runs all commands at the same time. The group finishes as soon as **any one** command finishes, and
the rest get interrupted.

```java
new ParallelRaceGroup(
    new WaitCommand(5),
    new IntakeCommand()
);
```

### `ParallelDeadlineGroup`

Runs all commands at the same time. The group finishes when the **deadline** command (the first
one) finishes, and the others get interrupted.

```java
new ParallelDeadlineGroup(
    new WaitCommand(3), // deadline command
    new IntakeCommand(),
    new ConveyorCommand()
);
```

## Builder syntax

Every `Command` also has methods that build these same groups with less code. You chain them onto
a command instead of creating the group class yourself.

### `.andThen(...)`

Runs commands **in sequence**, one after another.

```java
driveForwardCommand
    .andThen(turnCommand)
    .andThen(intakeCommand);
```

Same as:

```java
new SequentialCommandGroup(
    driveForwardCommand,
    turnCommand,
    intakeCommand
);
```

### `.alongWith(...)`

Runs commands **in parallel**. Ends when **all** of them finish.

```java
driveCommand.alongWith(shootCommand);
```

Same as:

```java
new ParallelCommandGroup(driveCommand, shootCommand);
```

### `.raceWith(...)`

Runs commands **in parallel**, but ends when **any** of them ends. The rest get interrupted.

```java
intakeCommand.raceWith(new WaitCommand(3));
```

Same as:

```java
new ParallelRaceGroup(intakeCommand, new WaitCommand(3));
```

### `.deadlineWith(...)`

Runs commands in parallel, but ends when the **original** command (the one you called it on)
finishes. The others get interrupted.

```java
new WaitCommand(3).deadlineWith(intakeCommand, conveyorCommand);
```

Same as:

```java
new ParallelDeadlineGroup(
    new WaitCommand(3),
    intakeCommand,
    conveyorCommand
);
```

## Mixing patterns

You can chain the builder methods to put together longer routines:

```java
shootCommand
    .alongWith(indexCommand)
    .andThen(driveCommand)
    .raceWith(new WaitCommand(10));
```

Each method wraps everything before it. Here, shooting and indexing run together, then the robot
drives, and the whole sequence gets cut off if it takes longer than 10 seconds.

## Things to know

- Each builder method returns a **new** `Command`. You can store it in a variable like any other
  command:

  ```java
  Command auto = intakeCommand
      .raceWith(new WaitCommand(5))
      .andThen(driveForwardCommand);
  ```

- Once a command is part of a group, it belongs to that group. You can't add the same command
  instance to a second group, or to the same group twice, and you can't schedule it on its own
  anymore. If you need the same action more than once, create a separate instance each time.
