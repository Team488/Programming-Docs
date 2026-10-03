# Curriculum Overview

Welcome to the XBot programming curriculum. You will go from writing your first Java code to making a robot drive itself.

**Everyone starts here**, whatever your programming background. Do the [Setup](#setup) steps, then work through the [Challenges](#challenges) in order -- each one builds on the one before it. The robot concepts are new to almost everybody.

What changes with experience is how much Java reading you do along the way:

- **New to programming?** The curriculum assumes you know nothing and teaches you step by step. Read [Java Basics](getting-started/java-basics) before starting the challenges, and dip into the [Java track](#java-track) as you go.
- **Already know some Java?** Skim [Java Basics](getting-started/java-basics) for the conventions we use, skip the Java track, and go straight to the challenges.

## Setup

Get your accounts, tools, and a copy of the code before writing anything.

| Step | What You Will Do |
|------|------------------|
| [Onboarding](getting-started/onboarding) | Set up accounts and install the software you need |
| [Environment Setup](getting-started/environment-setup) | Fork the practice project and open it in IntelliJ |
| [Java Basics](getting-started/java-basics) | The minimum Java you need to get started |

Programming on the competition robot during the season? [In-Season Onboarding](getting-started/in-season-onboarding) covers the extra hardware tools you will need.

## Reference

Background you will be pointed at from the challenges, and can come back to any time.

| Page | What It Covers |
|------|----------------|
| [Robot Architecture](robot-fundamentals/robot-architecture) | Subsystems, Commands, the Scheduler, and how they fit together |
| [Robot Coordinate Conventions](robot-fundamentals/coordinate-conventions) | Which way is positive, for both the robot and the field |
| [Mapping Buttons to Commands](robot-fundamentals/operator-command-map) | Binding commands to gamepad buttons |
| [Git Introduction](getting-started/git-introduction) | What source control is, and the terms you will see |
| [Clone with GitHub Desktop](getting-started/clone-with-github-desktop) | Getting a copy of a repository onto your computer |

## Java track

[Java Basics](getting-started/java-basics) is deliberately short -- just enough to start driving a robot. These two pages go further, and you can work through them alongside the challenges rather than before them.

| Page | What It Covers |
|------|----------------|
| [Object-Oriented Programming](getting-started/oop-concepts) | Encapsulation, inheritance, polymorphism, abstraction |
| [Intermediate Java](getting-started/intermediate-java) | Generics, lambdas, Optional, collections, streams, enums |

Of the two, get comfortable with **classes and objects** before the [Auto-stopping Collector](challenges/auto-stopping-collector) challenge -- that is the first time you write a class from scratch rather than filling in a method.

## Challenges

Hands-on exercises in the [XbotEdu](https://github.com/Team488/XbotEdu) practice project. Each one has unit tests, so you can check your own work without a physical robot.

| Step | What You Will Build |
|------|---------------------|
| [Basic Robot Principles](challenges/basic-robot-principles) | Watch the command scheduler run, and see commands conflict |
| [Tank Drive](challenges/tank-drive) | Drive a robot with two joysticks |
| [Altering Tank Drive](challenges/altering-tank-drive) | Precision mode and arcade drive, mapped to buttons |
| [Moving to a Target Position](challenges/moving-to-a-target-position) | Drive to an exact distance and stop there |
| [Making a Pull Request](challenges/making-a-pull-request) | Submit your work for review |
| [Rotating to a Target Orientation](challenges/rotating-to-a-target-orientation) | Turn to a heading, including the tricky angle math |
| [Command Groups](challenges/command-groups) | Combine commands into an autonomous square |
| [Providers & Factories](/core-programming/patterns/providers-factories) | How the team's code creates objects it cannot build directly |
| [Dependency Injection](/core-programming/patterns/dependency-injection) | Why your classes are handed what they need, and how |
| [Upgrading Using the SeriouslyCommonLib](challenges/upgrading-using-seriouslycommonlib) | Replace your own control code with the team's library |
| [Running on a Real Robot](challenges/running-on-a-real-robot) | Deploy your code to a RoboRIO |
| [Auto-stopping Collector](challenges/auto-stopping-collector) | Build a subsystem and commands from scratch |

Once those are done, there is one more, considerably harder:

| Advanced | What You Will Build |
|------|---------------------|
| [Advanced Swerve Challenges](challenges/advanced-swerve-challenges) | Drive a swerve chassis: steer and drive each module independently |

## AI Tools

| Module | What You Will Learn |
|--------|---------------------|
| [AI Tools Setup](ai-tools/ai-tools-setup) | Configure and initialize OpenCode |
| [Built-in Commands](ai-tools/ai-tools-commands) | Slash commands, undo, share, custom commands |
| [Workflow Tips](ai-tools/ai-tools-workflow) | Writing prompts, Plan vs Build mode |
| [Responsible AI Use](ai-tools/responsible-ai) | Ethics, code review, simulation, safety |

## What's Next?

After finishing the curriculum, move on to [Core Programming](/core-programming/) to learn the patterns the competition code is built on: maintainers, swerve drive, properties and tuning.

## Practice Repo

All exercises use [XbotEdu](https://github.com/Team488/XbotEdu) -- a practice robot project with unit tests so you can code without a physical robot.

```bash
git clone https://github.com/Team488/XbotEdu.git
cd XbotEdu
./gradlew test
```
