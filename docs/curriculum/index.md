# Curriculum Overview

Welcome to the XBot programming curriculum. You will go from writing your first Java code to controlling real robot mechanisms.

**No programming experience?** Start here. The curriculum assumes you know nothing about programming and teaches you everything step by step.

## Learning Path

### Getting Started
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [1. Environment Setup](getting-started/environment-setup) | Install Java, VSCode, WPILib, Git, GitHub Desktop | 30 min |
| [2. Java Basics](getting-started/java-basics) | Variables, methods, classes, interfaces | 45 min |
| [3. Object-Oriented Programming](getting-started/oop-concepts) | Encapsulation, inheritance, polymorphism, abstraction | 30 min |
| [4. Intermediate Java](getting-started/intermediate-java) | Generics, lambdas, Optional, collections, streams, enums | 40 min |
| [5. Git & GitHub Desktop](getting-started/git-github) | Clone, commit, branches, pull requests | 30 min |

### Robot Fundamentals
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [6. Robot Architecture](robot-fundamentals/robot-architecture) | How the robot program runs and is organized | 20 min |
| [7. Electrical Contract](robot-fundamentals/electrical-contract) | Wiring definitions as code | 20 min |
| [8. Motor Control](robot-fundamentals/motor-control) | Controlling motors, building a MotorSubsystem | 30 min |
| [9. PID Logic](robot-fundamentals/pid-logic) | Automatic control with Proportional-Integral-Derivative | 30 min |
| [10. Command-Based Programming](robot-fundamentals/command-based) | WPILib framework for organizing robot behavior | 30 min |
| [11. Operator Command Map](robot-fundamentals/operator-command-map) | Binding gamepad buttons to commands | 20 min |

### Challenges

Hands-on exercises in the [XbotEdu](https://github.com/Team488/XbotEdu) practice project. Each one has unit tests, so you can check your own work without a robot. Tackle them in order.

| Challenge | What You Will Build | Time |
|--------|-------------------|------|
| [Basic Robot Principles](challenges/basic-robot-principles) | Watch the command scheduler run, and see commands conflict | 30 min |
| [Tank Drive](challenges/tank-drive) | Drive a robot with two joysticks | 1-2 hrs |
| [Altering Tank Drive](challenges/altering-tank-drive) | Precision mode and arcade drive, mapped to buttons | 1-2 hrs |
| [Moving to a Target Position](challenges/moving-to-a-target-position) | Drive to an exact distance and stop there | 2 hrs |
| [Making a Pull Request](challenges/making-a-pull-request) | Submit your work for review | 30 min |
| [Rotating to a Target Orientation](challenges/rotating-to-a-target-orientation) | Turn to a heading, including the tricky angle math | 2 hrs |
| [Command Groups](challenges/command-groups) | Combine commands into an autonomous square | 1-2 hrs |
| [Upgrading Using the SeriouslyCommonLib](challenges/upgrading-using-seriouslycommonlib) | Replace your own control code with the team's library | 1-2 hrs |
| [Running on a Real Robot](challenges/running-on-a-real-robot) | Deploy your code to a RoboRIO | 1 hr |
| [Auto-stopping Collector](challenges/auto-stopping-collector) | Build a subsystem and commands from scratch | 2-3 hrs |

### AI Tools
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [12. AI Tools Setup](ai-tools/ai-tools-setup) | Configure and initialize OpenCode | 15 min |
| [13. AI Tools: Built-in Commands](ai-tools/ai-tools-commands) | Slash commands, undo, share, custom commands | 10 min |
| [14. AI Tools: Workflow Tips](ai-tools/ai-tools-workflow) | Writing prompts, Plan vs Build mode | 10 min |
| [15. Responsible AI Use](ai-tools/responsible-ai) | Ethics, code review, simulation, safety | 15 min |

### What's Next?

After finishing the curriculum, move on to [Core Programming](/core-programming/) to learn advanced XBot patterns like dependency injection, factories, maintainers, and swerve drive.

## Practice Repo

All exercises use [XbotEdu](https://github.com/Team488/XbotEdu) -- a practice robot project with unit tests so you can code without a physical robot.

```bash
git clone https://github.com/Team488/XbotEdu.git
cd XbotEdu
./gradlew test
```
