# Curriculum Overview

Welcome to the XBot programming curriculum. You will go from writing your first Java code to controlling real robot mechanisms.

**No programming experience?** Start here. The curriculum assumes you know nothing about programming and teaches you everything step by step.

## Learning Path

### Getting Started
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [1. Environment Setup](environment-setup) | Install Java, VSCode, WPILib, Git, GitHub Desktop | 30 min |
| [2. Java Basics](java-basics) | Variables, methods, classes, interfaces | 45 min |
| [3. Object-Oriented Programming](oop-concepts) | Encapsulation, inheritance, polymorphism, abstraction | 30 min |
| [4. Intermediate Java](intermediate-java) | Generics, lambdas, Optional, collections, streams, enums | 40 min |
| [5. Git & GitHub Desktop](git-github) | Clone, commit, branches, pull requests | 30 min |

### Robot Fundamentals
| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [6. Robot Architecture](robot-architecture) | How the robot program runs and is organized | 20 min |
| [7. Electrical Contract](electrical-contract) | Wiring definitions as code | 20 min |
| [8. Motor Control](motor-control) | Controlling motors, building a MotorSubsystem | 30 min |
| [9. PID Logic](pid-logic) | Automatic control with Proportional-Integral-Derivative | 30 min |
| [10. Command-Based Programming](command-based) | WPILib framework for organizing robot behavior | 30 min |
| [11. Operator Command Map](operator-command-map) | Binding gamepad buttons to commands | 20 min |

### What's Next?

After finishing the curriculum, move on to [Core Programming](/core-programming/) to learn advanced XBot patterns like dependency injection, factories, maintainers, and swerve drive.

## Practice Repo

All exercises use [XbotEdu](https://github.com/Team488/XbotEdu) -- a practice robot project with unit tests so you can code without a physical robot.

```bash
git clone https://github.com/Team488/XbotEdu.git
cd XbotEdu
./gradlew test
```
