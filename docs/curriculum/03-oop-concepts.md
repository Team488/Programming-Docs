# Object-Oriented Programming

How to design your robot code using objects. This is how professional software is organized.

## What is OOP?

Object-Oriented Programming (OOP) is a way of organizing code by grouping related data and behavior into **objects**. Instead of writing one giant file with everything mixed together, you create separate classes that each handle one part of the robot.

**Analogy:** Think of a robot as a team of specialists:
- The **Drive Specialist** knows how to move the robot (DriveSubsystem)
- The **Shooter Specialist** knows how to shoot (ShooterSubsystem)  
- The **Intake Specialist** knows how to pick up game pieces (IntakeSubsystem)

Each specialist only worries about their own job. They do not need to know how the other specialists work internally.

## The Four Main Ideas of OOP

| Concept | What It Means | Robot Example |
|---------|---------------|---------------|
| **Encapsulation** | Keep data private, expose only what is needed | Motor power is private, accessed through `setPower()` |
| **Inheritance** | Child classes get parent features for free | `DriveSubsystem extends BaseSubsystem` |
| **Polymorphism** | Same method name, different behavior | All subsystems have `periodic()`, but each does something different |
| **Abstraction** | Hide complexity, show only the essential parts | `motor.setPower(0.5)` hides all the CAN bus complexity |

## 1. Encapsulation (Keep Data Safe)

Encapsulation means hiding the internal details of a class so outside code cannot mess things up.

**Bad -- no encapsulation:**
```java
public class Motor {
    public double power;  // Anyone can change this directly!
}

// Somewhere else in the code:
Motor m = new Motor();
m.power = 999;  // No safety check, no limit!
```

**Good -- with encapsulation:**
```java
public class Motor {
    private double power;  // Only this class can change it

    public void setPower(double power) {
        // Safety check: limit to -1.0 to 1.0
        if (power > 1.0) power = 1.0;
        if (power < -1.0) power = -1.0;
        this.power = power;
    }

    public double getPower() {
        return power;
    }
}

// Usage:
Motor m = new Motor();
m.setPower(0.5);  // Must go through the method
m.setPower(999);  // Gets capped to 1.0 -- safe!
```

**The rule:** Make fields `private`. Provide `public` methods to access and modify them. This is called **getters and setters**.

### Why Encapsulation Matters on a Robot

Without encapsulation, a bug in one part of the code could accidentally set your motor to full power and damage the mechanism. With encapsulation, every change goes through safety checks.

```java
// Encapsulated motor with built-in safety
public class SafeMotor {
    private double power;
    private double maxPower;

    public SafeMotor(double maxPower) {
        this.maxPower = maxPower;
    }

    public void setPower(double power) {
        // Never exceed the safe limit
        if (power > maxPower) power = maxPower;
        if (power < -maxPower) power = -maxPower;
        this.power = power;
    }
}
```

## 2. Inheritance (Reuse Code)

Inheritance lets one class get all the features of another class without rewriting them.

```java
// Parent class: shared robot behavior
public class BaseSubsystem {
    private String name;

    public BaseSubsystem(String name) {
        this.name = name;
    }

    public void log(String message) {
        System.out.println(name + ": " + message);
    }

    public void periodic() {
        // Override this in child classes
    }
}

// Child classes: each adds its own behavior
public class DriveSubsystem extends BaseSubsystem {
    public DriveSubsystem() {
        super("Drive");  // Call parent constructor with name "Drive"
    }

    @Override
    public void periodic() {
        log("Updating drive motors");  // log() comes from BaseSubsystem
        // Drive-specific code here
    }
}

public class ShooterSubsystem extends BaseSubsystem {
    public ShooterSubsystem() {
        super("Shooter");
    }

    @Override
    public void periodic() {
        log("Updating shooter motor");
        // Shooter-specific code here
    }
}
```

<details>
<summary><strong>What does 'super' mean?</strong></summary>

`super` refers to the parent class. `super()` calls the parent's constructor. `super.periodic()` would call the parent's `periodic()` method.

```java
public class DriveSubsystem extends BaseSubsystem {
    public DriveSubsystem() {
        super("Drive");  // Call BaseSubsystem's constructor
        // Now the name is set to "Drive"
    }
}
```

Think of `super` as saying "do the parent's version first, then add my own stuff."

</details>

### The IS-A Relationship

When you use inheritance, the child class **IS A** type of the parent class.

```java
DriveSubsystem drive = new DriveSubsystem();
drive instanceof BaseSubsystem;  // true! DriveSubsystem IS A BaseSubsystem

ShooterSubsystem shooter = new ShooterSubsystem();
shooter instanceof BaseSubsystem;  // true! ShooterSubsystem IS A BaseSubsystem
```

This means you can treat any subsystem the same way when you only need the parent's features:

```java
// Both work because both IS A BaseSubsystem:
BaseSubsystem[] subsystems = { new DriveSubsystem(), new ShooterSubsystem() };
for (BaseSubsystem sub : subsystems) {
    sub.periodic();  // Calls the correct version for each
}
```

## 3. Polymorphism (Many Forms)

Polymorphism means "many shapes." The same method name can behave differently on different classes.

```java
public class BaseSubsystem {
    public void periodic() {
        // Default: do nothing
    }
}

public class DriveSubsystem extends BaseSubsystem {
    @Override
    public void periodic() {
        System.out.println("Drive is running");
    }
}

public class ShooterSubsystem extends BaseSubsystem {
    @Override
    public void periodic() {
        System.out.println("Shooter is running");
    }
}

// Using polymorphism:
BaseSubsystem sub1 = new DriveSubsystem();
BaseSubsystem sub2 = new ShooterSubsystem();

sub1.periodic();  // Output: "Drive is running"
sub2.periodic();  // Output: "Shooter is running"
```

The same method call (`periodic()`) does different things depending on what type of object it is called on. Java figures out which version to run automatically.

<details>
<summary><strong>Why is polymorphism useful for robots?</strong></summary>

Your robot code calls `periodic()` on every subsystem 50 times per second. Without polymorphism, you would need:

```java
// WITHOUT polymorphism:
if (subsystem instanceof DriveSubsystem) {
    ((DriveSubsystem) subsystem).drivePeriodic();
} else if (subsystem instanceof ShooterSubsystem) {
    ((ShooterSubsystem) subsystem).shooterPeriodic();
}
// ...and 10 more checks!

// WITH polymorphism:
subsystem.periodic();  // Java knows which one to call!
```

Polymorphism eliminates all the "if/else" checks and makes the code cleaner.

</details>

## 4. Abstraction (Hide Complexity)

Abstraction means hiding complicated details behind a simple interface.

```java
// The complicated reality of controlling a motor:
// - You need to know CAN bus protocols
// - You need to configure PID values
// - You need to handle different motor brands
// - You need to set the control mode

// Abstraction hides all that:
motor.setPower(0.5);  // Simple! One line.
```

**Analogy:** You do not need to know how a car engine works to drive a car. The pedals and steering wheel are an abstraction that hides the engine's complexity.

```java
// Abstract class -- provides some structure, leaves details for children
public abstract class Subsystem {
    public abstract void periodic();    // Children MUST implement this
    public abstract void stop();        // Children MUST implement this

    public void log(String message) {   // Shared behavior -- free for children
        System.out.println(message);
    }
}

// Child provides the details:
public class DriveSubsystem extends Subsystem {
    @Override
    public void periodic() {
        // Drive-specific code
    }

    @Override
    public void stop() {
        // Drive-specific stop code
    }
    // log() is inherited for free!
}
```

An **abstract** class cannot be used directly -- you must create a child class that fills in the missing pieces (the `abstract` methods).

## Designing a Subsystem (Exercise)

Now that you understand OOP, try designing a simple subsystem class. Do not read ahead until you have attempted it.

### Your Task

Design a `MotorSubsystem` class that:

1. Has a private field to store the motor's power level
2. Has public methods to set power, stop the motor, and check if it is running
3. Limits power to the range -1.0 to 1.0 (encapsulation)
4. Has a name so you can identify different motors
5. Logs a message whenever the motor starts or stops

**Try to write this yourself before looking at the answer.**

```java
// Your code here:
// public class MotorSubsystem {
//
// }
```

Think about:
- What fields (variables) does it need?
- What should the constructor do?
- What methods should be public?
- What methods should be private?
- How do you prevent invalid power values?

<details>
<summary><strong>Click to reveal the answer after you have tried</strong></summary>

Here is one way to design it:

```java
public class MotorSubsystem {
    private String name;
    private double power;
    private boolean isRunning;

    public MotorSubsystem(String name) {
        this.name = name;
        this.power = 0;
        this.isRunning = false;
    }

    public void setPower(double power) {
        // Limit power to safe range
        if (power > 1.0) power = 1.0;
        if (power < -1.0) power = -1.0;

        this.power = power;
        this.isRunning = (power != 0);

        if (isRunning) {
            System.out.println(name + " running at " + power);
        } else {
            System.out.println(name + " stopped");
        }
    }

    public void stop() {
        setPower(0);
    }

    public boolean isRunning() {
        return isRunning;
    }

    public double getPower() {
        return power;
    }

    public String getName() {
        return name;
    }
}
```

**What this design demonstrates:**

| OOP Concept | How This Code Uses It |
|-------------|----------------------|
| **Encapsulation** | `power` is private, controlled through `setPower()` |
| **Abstraction** | Users call `stop()` instead of remembering `setPower(0)` |
| **Data hiding** | `isRunning` is calculated internally, not exposed as a settable field |

**What is missing (learn in Core Programming):**
- Dependency injection (Dagger providing dependencies)
- Factory pattern for creating motors
- Hardware abstraction (XCANMotorController)
- Property-based tuning values
- Safety checks for hardware readiness

</details>

## How XBot Uses OOP

In the XBot codebase, every physical mechanism on the robot is a **subsystem class** that:

1. **Encapsulates** its hardware (motors are private)
2. **Inherits** from `BaseSubsystem` (gets logging, periodic, etc.)
3. **Polymorphically** defines its own `periodic()` behavior
4. **Abstracts** hardware details behind clean method names

```
XBot Subsystem Structure:
┌────────────────────────────────────┐
│  BaseSubsystem (abstract parent)    │
│  - periodic()                       │
│  - log()                            │
│  - getPrefix()                      │
└──────────┬─────────────────────────┘
           │ extends
┌──────────▼──────────┐  ┌──────────▼──────────┐
│ DriveSubsystem      │  │ ShooterSubsystem    │
│ - drive motors      │  │ - shooter motor     │
│ - periodic: update  │  │ - periodic: update  │
│   swerve modules    │  │   shooter velocity  │
│ - getWheelAngles()  │  │ - setTargetRPM()    │
└─────────────────────┘  └─────────────────────┘
```

---

## Quiz

**Q1:** What does encapsulation mean in Java?

- [ ] A) Making all variables public so anyone can access them
- [ ] B) Keeping data private and providing controlled access through methods
- [ ] C) Writing all code in one file
- [ ] D) Making classes as large as possible

<details>
<summary>Answer</summary>

**B) Keeping data private and providing controlled access through methods**

Encapsulation hides the internal data of a class and only exposes it through public methods. This lets you add safety checks, logging, or other logic whenever data is read or modified.

</details>

**Q2:** What allows the same method name to do different things on different classes?

- [ ] A) Encapsulation
- [ ] B) Inheritance
- [ ] C) Polymorphism
- [ ] D) Abstraction

<details>
<summary>Answer</summary>

**C) Polymorphism**

Polymorphism ("many shapes") means the same method call can produce different behavior depending on what class the object actually is. For example, calling `periodic()` on a `DriveSubsystem` does something different than calling it on a `ShooterSubsystem`.

</details>

**Q3:** How would you prevent a motor from being set to 150% power?

- [ ] A) Use a `boolean` to track power
- [ ] B) Check the value in `setPower()` and cap it to 1.0
- [ ] C) Make `power` public and trust everyone to use valid values
- [ ] D) Remove `setPower()` entirely

<details>
<summary>Answer</summary>

**B) Check the value in `setPower()` and cap it to 1.0**

By keeping `power` private and controlling access through `setPower()`, you can add validation logic that clamps the value to the -1.0 to 1.0 range. This is a key benefit of encapsulation -- you control how data enters your class.

</details>
