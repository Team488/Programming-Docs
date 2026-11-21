# Curriculum Overview

Welcome to the XBot programming curriculum. You will go from writing your first Java code to making a robot drive itself. No programming experience is needed. The curriculum starts from zero and teaches you everything step by step.

**The path is two parts: Setup, then the Challenges, in order.** Each step builds on the one before it, so don't skip ahead.

## Step 1: Setup

Get your accounts, tools, and a copy of the code before you write anything.

| # | Step | What You Will Do |
|---|------|------------------|
| 1 | [Onboarding](getting-started/onboarding) | Set up accounts and install the software you need |
| 2 | [Environment Setup](getting-started/environment-setup) | Fork the practice project and open it in IntelliJ |

::: tip New to Java?
If you don't already feel comfortable with Java, read [Java Basics](getting-started/java-basics) before the challenges. It covers the minimum you need to get started. If you already know Java, skip it.
:::

**Done with Setup?** Start the challenges below with [Basic Robot Principles](challenges/basic-robot-principles).

## Step 2: Challenges

Hands-on exercises in the [XbotEdu](https://github.com/Team488/XbotEdu) practice project you set up in Step 1. Each one has unit tests, so you can check your own work without a physical robot.

| # | Challenge | What You Will Build |
|---|-----------|---------------------|
| 1 | [Basic Robot Principles](challenges/basic-robot-principles) | Watch the command scheduler run, and see commands conflict |
| 2 | [Tank Drive](challenges/tank-drive) | Drive a robot with two joysticks |
| 3 | [Altering Tank Drive](challenges/altering-tank-drive) | Precision mode and arcade drive, mapped to buttons |
| 4 | [Moving to a Target Position](challenges/moving-to-a-target-position) | Drive to an exact distance and stop there |
| 5 | [Making a Pull Request](challenges/making-a-pull-request) | Submit your work for review |
| 6 | [Rotating to a Target Orientation](challenges/rotating-to-a-target-orientation) | Turn to a heading, including the tricky angle math |
| 7 | [Command Groups](challenges/command-groups) | Combine commands into an autonomous square |
| 8 | [Providers & Factories](/core-programming/patterns/providers-factories) | *Reading:* how the team's code creates objects it cannot build directly |
| 9 | [Dependency Injection](/core-programming/patterns/dependency-injection) | *Reading:* why your classes are handed what they need, and how |
| 10 | [Upgrading Using the SeriouslyCommonLib](challenges/upgrading-using-seriouslycommonlib) | Replace your own control code with the team's library |
| 11 | [Running on a Real Robot](challenges/running-on-a-real-robot) | Deploy your code to a RoboRIO |
| 12 | [Auto-stopping Collector](challenges/auto-stopping-collector) | Build a subsystem and commands from scratch |
| 13 | [Log Reading](Curriculum-challenge-~-Log-Reading) | Read Logs on the robot

::: tip Before the Auto-stopping Collector
This is the first time you write a class from scratch rather than filling in a method. Get comfortable with **classes and objects** in [Object-Oriented Programming](getting-started/oop-concepts) first.
:::

Once those are done, there is one more, considerably harder:

| Advanced | What You Will Build |
|----------|---------------------|
| [Advanced Swerve Challenges](challenges/advanced-swerve-challenges) | Drive a swerve chassis: steer and drive each module independently |

## What's Next?

After finishing the curriculum, move on to [Core Programming](/core-programming/) to learn the patterns the competition code is built on: maintainers, swerve drive, properties and tuning.

---

## Reference

You don't need to read these up front. The challenges link to them when they're relevant, and you can come back to them any time.

### Going deeper on Java

[Java Basics](getting-started/java-basics) is deliberately short: just enough to start driving a robot. These pages go further. Work through them alongside the challenges rather than before them.

| Page | What It Covers |
|------|----------------|
| [Object-Oriented Programming](getting-started/oop-concepts) | Encapsulation, inheritance, polymorphism, abstraction |
| [Intermediate Java](getting-started/intermediate-java) | Generics, lambdas, Optional, collections, streams, enums |

### Robot and tooling background

| Page | What It Covers |
|------|----------------|
| [Running the Simulator](robot-fundamentals/simulator) | Drive your code on a virtual field, and watch it in AdvantageScope |
| [Robot Architecture](robot-fundamentals/robot-architecture) | Subsystems, Commands, the Scheduler, and how they fit together |
| [Robot Coordinate Conventions](robot-fundamentals/coordinate-conventions) | Which way is positive, for both the robot and the field |
| [Mapping Buttons to Commands](robot-fundamentals/operator-command-map) | Binding commands to gamepad buttons |
| [Command Groups](robot-fundamentals/command-groups) | Running commands in sequence and in parallel |
| [Git Introduction](getting-started/git-introduction) | What source control is, and the terms you will see |
| [Clone with GitHub Desktop](getting-started/clone-with-github-desktop) | Getting a copy of a repository onto your computer |

### In-season

Programming on the competition robot during the season? [In-Season Onboarding](getting-started/in-season-onboarding) covers the extra hardware tools you will need.

### AI tools

| Page | What You Will Learn |
|------|---------------------|
| [AI Tools Setup](ai-tools/ai-tools-setup) | Configure and initialize OpenCode |
| [Built-in Commands](ai-tools/ai-tools-commands) | Slash commands, undo, share, custom commands |
| [Workflow Tips](ai-tools/ai-tools-workflow) | Writing prompts, Plan vs Build mode |
| [Responsible AI Use](ai-tools/responsible-ai) | Ethics, code review, simulation, safety |
