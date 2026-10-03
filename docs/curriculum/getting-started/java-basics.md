# Java Basics

## Overview

FIRST Robotics Competition (FRC) robot code is written using the Java programming language. Java is popularly used by large companies in industry like Google and Amazon, but it does not have the easiest learning curve. This lesson covers the minimum you need to know to get started with writing Java code.

## IntelliJ - Your IDE

We use a program called IntelliJ to write our code. IntelliJ is an IDE, an "Integrated Development Environment." IDEs provide an integrated environment full of tools to help you to write, build, and test code. In the case of IntelliJ, it is optimized for writing Java code.

Other examples of IDEs that you may have heard of include:

* Visual Studio
* Eclipse
* PyCharm
* Android Studio

### Navigating IntelliJ

There are a few key elements in the IntelliJ interface that you will need to familiarize yourself with:

#### Project and Branch selectors

The Project and Branch selectors tell you what version of the code you are working on. When working on the robot curriculum, you would usually expect the Project selector to say "XbotEdu".

The Branch selector may say "main", or it may show your own branch. A branch is a history of versions of your code, so you can track changes over time. Each saved version is called a "commit."

![Project](https://github.com/user-attachments/assets/de2caa94-3138-486d-bf3c-1029765cfcfc)
![Branch](https://github.com/user-attachments/assets/3d3525eb-683f-47f5-8213-6a5205d12c70)

#### Project Browser

The Project Browser is where you can navigate the various files that make up your project. There are two extremely important folders to know about: `src/main/java` and `src/test/java`.

* `src/main/java` contains all the code that gets executed on your robot.
* `src/test/java` contains all the code you use to verify the correctness of the code in `src/main/java` - we call these "test cases."

The robot curriculum you are working through is primarily structured to have you implement robot code in `src/main/java` to make test cases run successfully.

![Project Browser](https://github.com/user-attachments/assets/49f9bf3c-0576-46df-bd4e-26b1664ba9af)
![Code Folders](https://github.com/user-attachments/assets/5a5fad70-9ac0-4c2d-b054-b0ead291344b)

## Java

Java is what the industry calls an "object-oriented programming language." You don't necessarily need to understand what that means, but it carries with it some consequences that mean even the simplest code file has some components you need to be aware of.

```java
package competition;

public class Main {
  public static void main(String... args) {
    System.out.println("Hello, World!");
  }
}
```

What does the above program do? It simply writes the text `Hello, World!` and then ends. But despite doing so little, there is a lot to know about this little block of code.

### Code Organization

Java code is organized into "packages." All you really need to know here is that the package declared in a code file will generally match the folder structure that the file was placed in.

For a file with the following package declaration, it will be placed in either `src/main/java/competition` or `src/test/java/competition`.

```java
package competition;
```

IntelliJ automatically writes this line for you when you create a new file, so you usually don't need to worry about it.

### Functions

All Java logic needs to live inside a function. Other code elements may live outside functions, like properties or constants, but logic always lives inside a function.

In the example below, we have a class (described later) with a function named `execute`. For now, you can think of a class like a container for functions, properties, or constants that can be created or destroyed.

> [!NOTE]
> You'll hear people call these "methods" instead of "functions." In Java the two words mean the same thing in practice: a function that belongs to a class.

```java
public class SwerveDriveWithJoysticksCommand extends BaseCommand {
    // ... omitted code ...
    @Override
    public void execute() {
        swerveDrive.move(0, 0, 0);
    }
}
```

In a function declaration like this, `void` means that the function doesn't return anything. You could have other functions that return numbers like `double` or `int`, functions that return `String` (text), `boolean` (true/false), or "objects". The body of the function is contained within curly braces (`{}`).

> [!TIP]
> If you're coming from Python, in Java the indentation doesn't impact the code execution. As long as your code is within curly braces, it is treated like a block. We still indent our code for readability, even though the language does not require it.

Sometimes functions have "annotations" - in this case `@Override`. These tell you something about the function or impact its behavior. In this case, `@Override` means that the class `BaseCommand` already has an `execute` function, and we are changing its behavior in `SwerveDriveWithJoysticksCommand`. Usually IntelliJ will manage this for you.

You'll see other annotations like `@Singleton` or `@Inject` - these will be covered in more advanced lessons. Don't worry about them for now.

Some functions are called "constructors." They set up the context or state for a class when it is created.

```java
public class SwerveDriveWithJoysticksCommand extends BaseCommand {

    SwerveDriveSubsystem swerveDrive;
    OperatorInterface oi;

    @Inject
    public SwerveDriveWithJoysticksCommand(SwerveDriveSubsystem driveSubsystem, OperatorInterface oi) {
        this.swerveDrive = driveSubsystem;
        this.oi = oi;

        this.addRequirements(driveSubsystem);
    }
    // ... omitted code ...
}
```

You'll notice the `SwerveDriveWithJoysticksCommand` constructor has the same name as the class, and it doesn't have a return type. This is a feature of all constructors. In our robot code, it is very common for a constructor to have the `@Inject` annotation.

In this case, the constructor takes a couple of parameters. Each parameter is made up of a "type" followed by a "parameter name" - in `SwerveDriveSubsystem driveSubsystem`, the type is `SwerveDriveSubsystem` (the name of a class) and the parameter name is `driveSubsystem`.

> [!TIP]
> If you're coming from Python, you'll notice that Java requires you to specify types in many places, whereas Python does not require this. That is because Java is a "strongly typed" language. This makes it easier for your IDE to help you to auto-complete code, and for the process that builds your code, the "compiler" to check for errors before you ever run your code. This makes it harder to accidentally make silly mistakes like passing a number to a function where a true/false was expected.

### Classes

In object oriented programming languages, a "class" has a very specific meaning. In Java, every code file needs to contain a class, usually matching the file name. In the example below, you would expect the code to be in a file called `Main.java`.

```java
public class Main {
  public static void main(String... args) {
    System.out.println("Hello, World!");
  }
}
```

Notice how the body of the class is contained within curly braces (`{}`) just like a function. All blocks of code in Java use curly braces to mark the start and end of the block.

In this case, since this is a complete Java program, it needs a `main` function, but for the code you'll be writing, the `main` function is already written so you don't need to understand the meaning of it, other than that this is where a Java program starts, and only one class can have a `main` function.

Classes can also contain "state" - typically called properties. (This is different from the Property system that you will learn about later! The similarity in naming is inconvenient.)

```java
@Singleton
public class CoralArmSubsystem extends BaseSetpointSubsystem<Angle> {

    public final XCANMotorController armMotor;

    double periodicTickCounter;
    double rotationsAtZero = 0;
    boolean isCalibrated = false;

    // ... omitted code ...

    @Inject
    public CoralArmSubsystem(XCANMotorController.XCANMotorControllerFactory xcanMotorControllerFactory,
                             ElectricalContract electricalContract, PropertyFactory propertyFactory,
                             XDutyCycleEncoder.XDutyCycleEncoderFactory xDutyCycleEncoderFactory,
                             XDigitalInput.XDigitalInputFactory xDigitalInputFactory) {
        // ... omitted code ...
    }

    @Override
    public boolean isCalibrated() {
        return isCalibrated;
    }

    public void setCalibrated(boolean calibrated){
        isCalibrated = calibrated;
    }
    // ... omitted code ...
}
```

### Access Modifiers

All of the prior examples included `public` scattered throughout. Other accessibility modifiers are `private`, `protected`, and no modifier (package protected).

Accessibility modifiers determine how one class can interact with another class.

* `public` functions, classes, or properties can be accessed by any other class.
* `protected` functions or properties can be accessed by the current class or any subclasses.
* `private` functions or properties can only be accessed by the current class.
* package-private (no modifier) functions, classes, or properties are accessible to any code in the same package.

It is a common mistake to forget a `public` modifier on a class or function, which might prevent you from accessing it from a unit test.

Although it's not necessarily good practice, we tend to overuse `public` for most things in robot code, so that it is easily accessible to test cases. In industry, you would typically hide internal behavior of a class using `private` or `protected` to prevent a user of your class from using it in a way that would break its internal state.

In the example below, we have a protected property with a `public` "getter" and "setter" function. Other classes can't touch `isCalibrated` directly, but they can read it and change it through those two functions.

```java
@Singleton
public class CoralArmSubsystem extends BaseSetpointSubsystem<Angle> {
    protected boolean isCalibrated = false;

    // ... omitted code ...

    @Override
    public boolean isCalibrated() {
        return isCalibrated;
    }

    public void setCalibrated(boolean calibrated){
        isCalibrated = calibrated;
    }
    // ... omitted code ...
}
```

This example is simple, but you could imagine other scenarios where a "setter" changes more than one thing at the same time. If you exposed those properties as public, it is conceivable that some other class doesn't know that there is some complicated logic required to set the property correctly.

### Basic Logic

In Java, you can express logical operations with the following syntax:

| Operator | Description |
| --- | --- |
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical invert |
| `==` | Equality |
| `!=` | Inequality |

As an example, this would be a valid Java logical expression:

```java
boolean isFastFood = (isHamburger || isFrenchFries) && !isHealthy;
```

> [!WARNING]
> `==` compares two values, while a single `=` assigns a value. Writing `if (isCalibrated = true)` instead of `if (isCalibrated == true)` is a classic bug.

## Next Steps

Continue with the next challenge: [Basic Robot Principles](/curriculum/challenges/basic-robot-principles)
