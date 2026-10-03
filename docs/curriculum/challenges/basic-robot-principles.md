# Basic Robot Principles

## Overview

With the "XbotEdu" git folder open in IntelliJ, in the left file tree navigate to `src` > `test` > `java` > `xbot` > `edubot` > `basic_understanding`. There you will find three test classes, meant to be run in order:

1. <code>AObserveHowCommandsWork.java</code>
2. <code>BObserveChatter.java</code>
3. <code>CObserveFightingCommands.java</code>

Run each test, watch the output log, and then view the associated code to get a basic understanding of how the robot command system works. Each class holds a single test.

Feel free to modify any of the code or play around - these classes are just meant to help you, and aren't used anywhere else in the curriculum. The techniques for running the examples are described in the following sections.

If you want to read more, see [Programming Robot Architecture](/curriculum/robot-fundamentals/robot-architecture), but consider running each of the tests once first. There's also a state machine diagram of what methods the scheduler runs on commands at the [SeriouslyCommonLib commands page].

## How to actually run tests

With the test class open (in our case, `AObserveHowCommandsWork.java`), click the green arrow to the left of the test method. (The arrow next to the class name runs all of the tests in the class. Since each of these classes has only one test, the two arrows do the same thing here.)


![Screenshot](https://github.com/Team488/XbotEdu/assets/3144757/cb10dd89-4cff-4f0b-b1dd-e174786e1f55)

The test runs, and its output appears in the Run panel at the bottom of the window. That log output is the whole point of these three tests, so read it from the top.

## AObserveHowCommandsWork

This test uses `ExampleCommand`. You'll see the command get started, and then the scheduler runs it 10 times. Watch the order of the functions the scheduler calls: `initialize`, then `execute` and `isFinished` over and over.

## BObserveChatter

This test uses `ChatCommandThatEnds`. You'll see a command get started, executed a number of times, and then end itself, even though the scheduler keeps running.

## CObserveFightingCommands

This test uses `CommandA` and `CommandB`. Both of these commands "require" `ExampleSubsystem`, and so the scheduler prevents both of them from running at the same time; the command that starts later will "win." The test runs `CommandA` by itself for a few steps, then starts `CommandB` - notice that `CommandA` goes quiet once it's been interrupted.

## Check your understanding

Take this [quick quiz](https://forms.gle/WfjFZPoCUBNndW6q9)

## Next Steps
Continue with the next curriculum challenge: [Tank Drive](/curriculum/challenges/tank-drive)

[SeriouslyCommonLib commands page]: https://github.com/Team488/SeriouslyCommonLib/wiki/Commands
