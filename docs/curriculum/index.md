# Curriculum Overview

Welcome to the XBot programming curriculum. You will go from writing your first Java code to controlling real robot mechanisms.

**No programming experience?** Start here. The curriculum assumes you know nothing about programming and teaches you everything step by step.

## Learning Path

### Getting Started
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [1. Environment Setup](01-environment-setup) | Install Java, VSCode, WPILib, Git, GitHub Desktop | 30 min |
| [2. Java Basics](02-java-basics) | Variables, methods, classes, interfaces | 45 min |
| [3. Object-Oriented Programming](03-oop-concepts) | Encapsulation, inheritance, polymorphism, abstraction | 30 min |
| [4. Intermediate Java](04-intermediate-java) | Generics, lambdas, Optional, collections, streams, enums | 40 min |
| [5. Git & GitHub Desktop](05-git-github) | Clone, commit, branches, pull requests | 30 min |

### Robot Fundamentals
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [6. Robot Architecture](06-robot-architecture) | How the robot program runs and is organized | 20 min |
| [7. Electrical Contract](07-electrical-contract) | Wiring definitions as code | 20 min |
| [8. Motor Control](08-motor-control) | Controlling motors, building a MotorSubsystem | 30 min |
| [9. PID Logic](09-pid-logic) | Automatic control with Proportional-Integral-Derivative | 30 min |
| [10. Command-Based Programming](10-command-based) | WPILib framework for organizing robot behavior | 30 min |

### What's Next?

After finishing the curriculum, move on to [Core Programming](/core-programming/) to learn advanced XBot patterns like dependency injection, factories, maintainers, and swerve drive.

## Practice Repo

All exercises use [XbotEdu](https://github.com/Team488/XbotEdu) -- a practice robot project with unit tests so you can code without a physical robot.

```bash
git clone https://github.com/Team488/XbotEdu.git
cd XbotEdu
./gradlew test
```
