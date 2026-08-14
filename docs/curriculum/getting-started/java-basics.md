# Java Basics

Learn enough Java to write robot code. If you have never programmed before, start here.

**New to programming?** You do not need any experience. This module starts from zero and teaches you exactly what you need for FRC.

## What is Programming?

Programming is giving instructions to a computer. You write steps in a language the computer can understand (Java), and it follows those steps exactly.

**Analogy:** Think of programming like writing a recipe. You list ingredients (variables) and steps (methods). The computer is the chef that follows your recipe perfectly every time.

## Learning Resources

Everyone learns differently. Use these alongside this tutorial:

| Resource | Style | Link |
|----------|-------|------|
| **Codecademy Learn Java** | Interactive -- type code in your browser | [codecademy.com/learn/learn-java](https://www.codecademy.com/learn/learn-java) |
| **W3Schools Java** | Read and try examples | [w3schools.com/java](https://www.w3schools.com/java/) |
| **freeCodeCamp Java Course** | 4-hour video walkthrough | [youtube.com/watch?v=A74TOX803D0](https://www.youtube.com/watch?v=A74TOX803D0) |
| **Java for Complete Beginners** | Udemy free course | [udemy.com/course/java-tutorial](https://www.udemy.com/course/java-tutorial/) |
| **Programiz Java** | Tutorials with visuals | [programiz.com/java-programming](https://www.programiz.com/java-programming) |

**Tip:** If you get stuck on a concept, look it up on W3Schools or watch the freeCodeCamp video. Seeing the same idea explained differently helps it click.

## Variables (Storing Information)

Variables store data so you can use it later. Every variable has a **type** (what kind of data) and a **name** (how you refer to it).

```java
// Type  name   =  value;
int    score  =  42;         // Whole numbers (no decimals)
double speed  =  0.75;       // Decimal numbers
String name   = "XBot";      // Text (must be in quotes)
boolean on    = true;        // True or false
```

<details>
<summary><strong>Why do I need to specify a type?</strong></summary>

Java is a **strongly typed** language. This means every variable must have a specific type, and you cannot put the wrong kind of data in it. This prevents bugs.

**Analogy:** Think of variable types like containers:
- `int` = a box that only holds whole items (you cannot put half an apple in it)
- `double` = a measuring cup (holds any amount: 1.5, 0.75, etc.)
- `String` = a label maker (holds text only)
- `boolean` = a light switch (only on or off)

```java
int x = 0.5;   // ERROR! Cannot put a decimal in an int
double y = 5;  // OK! Java automatically converts 5 to 5.0
```

**In robot code:**
- `int` for CAN IDs, port numbers, counting
- `double` for motor speeds, PID values, distances
- `String` for names, logging messages
- `boolean` for "is the button pressed?", "is the motor running?"

</details>

### Naming Rules

```java
int motorSpeed;    // camelCase -- start lowercase, capitalize each new word
int MotorSpeed;    // Wrong convention (classes use this style, not variables)
int 2ndMotor;      // ERROR! Cannot start with a number
int motor-speed;   // ERROR! No hyphens allowed
int motor speed;   // ERROR! No spaces allowed
```

**Always use descriptive names.** `speed` is better than `s`. `frontLeftMotorPower` is better than `flmp`.

## Methods (Actions)

A **method** is a named block of code that does something. Think of it like a command you create: "when I say `stopMotor()`, set the motor power to 0."

```java
// Returns a value -- gives a result back
public double add(double a, double b) {
    return a + b;  // "return" sends the result back to the caller
}

// Returns nothing (void) -- just does the work
public void stopMotor() {
    motor.setPower(0);
}
```

<details>
<summary><strong>Return vs Void -- what is the difference?</strong></summary>

When you ask someone a question, you expect an answer back. When you give someone an order, you just want them to do it.

```java
// "Return" = asking a question
double result = add(2, 3);  // Returns 5.0, stored in "result"

// "Void" = giving an order
stopMotor();  // Just does it, no result needed
```

**How to tell the difference:**
- `public double add(...)` -- the word `double` before the name means "this method returns a double"
- `public void stopMotor()` -- the word `void` means "this method returns nothing"

Whenever you see `return`, the method is sending a value back. Whenever you see `void`, there is no return value.

</details>

### Parameters (Inputs to Methods)

Methods can take **parameters** -- information they need to do their job.

```java
public void setMotorSpeed(double speed) {
    // "speed" is a parameter -- the caller decides what value to pass
    System.out.println("Setting motor to " + speed);
}

// Calling the method:
setMotorSpeed(0.5);   // Output: Setting motor to 0.5
setMotorSpeed(-1.0);  // Output: Setting motor to -1.0
```

The parameter `speed` gets a different value each time you call the method. This is how you make reusable code -- one method works for any value.

## Classes & Objects

A **class** is a blueprint. An **object** is an actual thing built from that blueprint.

```java
// Class = the blueprint
public class Motor {
    // Fields: data this class stores
    private int port;        // "private" means only code in this class can access it
    private double power;    // Current power level

    // Constructor: runs when you create a new Motor (builds the object)
    public Motor(int port) {
        this.port = port;     // "this.port" = the field, "port" = the parameter
        this.power = 0;       // Start stopped
    }

    // Method: something this Motor can do
    public void setPower(double power) {
        this.power = power;
    }
}

// Objects = actual motors built from the blueprint
Motor leftMotor = new Motor(1);   // Creates a Motor on port 1
Motor rightMotor = new Motor(2);  // Creates a Motor on port 2

leftMotor.setPower(0.5);   // Only left motor moves
rightMotor.setPower(-0.5); // Only right motor moves (reverse)
```

<details>
<summary><strong>The cookie cutter analogy for classes and objects</strong></summary>

A **class** is like a cookie cutter. It defines the shape but is not a cookie itself.
An **object** is an actual cookie made from that cutter.

```
Class:  Motor (blueprint) -- just a design
Object: leftMotor (port 1) -- an actual motor you can control
Object: rightMotor (port 2) -- another motor, independent
```

Each object is independent. Changing `leftMotor` does not affect `rightMotor`. This is important -- your robot might have 8 motors, each controlled by its own object, all created from the same class.

**In robot code:** You will write one class (like `IntakeSubsystem`) and create one object from it. But the class is the design, the object is the actual thing running on the robot.

</details>

### The Constructor

The **constructor** is a special method that runs when you create an object with `new`. It sets up the object's initial state.

```java
public class Motor {
    private int port;

    // Constructor: same name as the class, no return type
    public Motor(int port) {
        this.port = port;  // Save the port number
    }
}

// When you call this:
Motor m = new Motor(5);
// Java does: 1. Creates a blank Motor object
//            2. Calls the constructor with port=5
//            3. Returns the finished object
```

If you do not write a constructor, Java provides an empty one. But you usually want one to set up your object properly.

## Inheritance (Classes Can Extend Other Classes)

**Inheritance** lets one class get all the features of another class, then add its own.

```java
// Parent class -- defines shared behavior
public class BaseSubsystem {
    public void periodic() {
        // Called every robot loop (~20ms)
        // Default: do nothing
    }

    public void log(String message) {
        System.out.println(message);
    }
}

// Child class -- gets everything from BaseSubsystem, adds its own
// "extends" means DriveSubsystem IS A BaseSubsystem with extra features
public class DriveSubsystem extends BaseSubsystem {
    @Override  // Tells Java: "I am replacing the parent's periodic()"
    public void periodic() {
        // This runs instead of BaseSubsystem's periodic()
        // Update motor speeds, read sensors, etc.
    }

    // New method only DriveSubsystem has
    public void drive(double speed) {
        // Drive logic here
    }
}
```

<details>
<summary><strong>Why use inheritance instead of copying code?</strong></summary>

Without inheritance, you would copy the same code into every class:

```java
// BAD: Copy-paste in every subsystem
public class DriveSubsystem {
    public void log(String msg) { System.out.println(msg); }
}

public class ShooterSubsystem {
    public void log(String msg) { System.out.println(msg); }  // SAME CODE
}

// GOOD: Write once, inherit everywhere
public class BaseSubsystem {
    public void log(String msg) { System.out.println(msg); }
}

public class DriveSubsystem extends BaseSubsystem { }
public class ShooterSubsystem extends BaseSubsystem { }
// Both can call log() without writing it!
```

This is called **Don't Repeat Yourself (DRY)**. If you find yourself copying code, you should probably use inheritance or another pattern to share it.

</details>

## Interfaces (Contracts)

An **interface** is a list of requirements. Any class that `implements` the interface must provide all the methods listed.

```java
// Interface: "Any electrical contract must have these methods"
public interface ElectricalContract {
    double getMotorSpeed();   // Must exist
    int getMotorPort();       // Must exist
    boolean isMotorReady();   // Must exist
}

// Class that promises to fulfill the contract
public class CompetitionContract implements ElectricalContract {
    @Override
    public double getMotorSpeed() {
        return 0.5;  // Competition robot's motor speed
    }

    @Override
    public int getMotorPort() {
        return 1;  // Competition robot's wiring
    }

    @Override
    public boolean isMotorReady() {
        return true;  // It is wired and ready
    }
}
```

<details>
<summary><strong>Interface vs Class -- what is the difference?</strong></summary>

An **interface** says WHAT must exist (the method names and types).
A **class** says HOW it works (the actual code).

**Analogy:** An interface is like a restaurant menu (listing what dishes exist). A class is the kitchen (actually cooking the food).

```
Interface: "There will be a way to get the motor speed"
Class: "Here is the code that gets the motor speed: return 0.5;"
```

**Why use interfaces:** You can swap implementations without changing the code that uses them.

```java
// Your subsystem uses the INTERFACE, not a specific class
ElectricalContract contract;

// It does not care WHICH contract it gets:
contract = new CompetitionContract();  // Works on competition robot
contract = new PracticeContract();     // Works on practice robot

// Both work because both implement ElectricalContract
double speed = contract.getMotorSpeed();
```

</details>

## Putting It All Together

Here is how these concepts work together in a real robot class:

```java
// A subsystem that controls the robot's intake mechanism
public class IntakeSubsystem extends BaseSubsystem {

    // Fields: data this subsystem keeps track of
    private final ElectricalContract contract;
    private boolean isRunning;

    // Constructor: set up the subsystem
    public IntakeSubsystem(ElectricalContract contract) {
        this.contract = contract;
        this.isRunning = false;
    }

    // Methods: what this subsystem can do
    public void startIntake() {
        if (contract.isIntakeReady()) {  // Check if hardware exists
            isRunning = true;
            System.out.println("Intake started");
        }
    }

    public void stopIntake() {
        isRunning = false;
        System.out.println("Intake stopped");
    }

    // Returns a value (not void!)
    public boolean isRunning() {
        return isRunning;
    }
}
```

## Key Terms Cheat Sheet

| Term | Meaning | Example |
|------|---------|---------|
| **Variable** | Stores a value | `int x = 5;` |
| **Method** | A named block of code | `public void run() { }` |
| **Class** | A blueprint for objects | `public class Motor { }` |
| **Object** | An instance of a class | `new Motor(1)` |
| **Constructor** | Runs when creating an object | `public Motor(int port) { }` |
| **Field** | A variable inside a class | `private int port;` |
| **Parameter** | An input to a method | `setPower(double power)` |
| **extends** | Inheritance | `class A extends B` |
| **implements** | Interface fulfillment | `class A implements B` |
| **@Override** | Replacing a parent method | `@Override public void run()` |
| **return** | Send a value back | `return 42;` |
| **void** | Returns nothing | `public void stop()` |
| **private** | Only accessible in this class | `private int x;` |
| **public** | Accessible everywhere | `public int x;` |
| **final** | Cannot be changed | `final int MAX = 100;` |
| **this** | Refers to this object | `this.port = port;` |

---

## Quiz

**Q1:** What does `extends` do in Java?

- [ ] A) Makes the class run faster
- [ ] B) Lets one class inherit from another
- [ ] C) Deletes the parent class
- [ ] D) Creates a new object

<details>
<summary>Answer</summary>

**B) Lets one class inherit from another**

`extends` creates a parent-child relationship where the child class gets all the methods and fields of the parent. This lets you reuse code instead of writing it over and over.

</details>

**Q2:** What is the difference between a class and an object?

- [ ] A) A class is a blueprint, an object is an actual instance
- [ ] B) They are the same thing
- [ ] C) An object is a blueprint, a class is an instance
- [ ] D) Classes cannot have methods

<details>
<summary>Answer</summary>

**A) A class is a blueprint, an object is an actual instance**

A class defines the structure (like a cookie cutter). An object is an actual thing created from that class (like a cookie). You can create many objects from one class.

</details>

**Q3:** What is the difference between an interface and a class?

- [ ] A) Interfaces define WHAT methods must exist, classes define HOW they work
- [ ] B) Classes are faster than interfaces
- [ ] C) Interfaces contain working code
- [ ] D) There is no difference

<details>
<summary>Answer</summary>

**A) Interfaces define WHAT must exist, classes define HOW they work**

An interface is a contract that lists required methods (no code). A class provides the actual implementation. You use `implements` to connect a class to an interface.

</details>

