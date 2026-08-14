# Motor Control

How to control motors in robot code.

## How Motors Work in FRC

The roboRIO (robot's brain) sends commands to motor controllers over the CAN bus (a communication cable). Each motor controller has a unique CAN ID so the roboRIO knows which motor to talk to.

```
roboRIO: "Motor #3, spin at 50%!"  →  CAN Bus  →  Motor #3 spins
                                               →  Motor #7 ignores (different ID)
```

### Common Motor Controllers

| Controller | Motors It Works With | Used For |
|------------|---------------------|----------|
| **SparkMax** | NEO (brushless) | Simple mechanisms |
| **TalonFX** | Kraken (high-power) | Swerve drive, shooter |
| **SparkFlex** | Neo Vortex (new) | Latest NEO motors |

### Basic Motor Operations

```java
// Set power (-1.0 to 1.0): like a gas pedal
motor.setPower(0.5);    // 50% forward
motor.setPower(-0.5);   // 50% reverse
motor.setPower(0);      // Stop

// Set voltage (more precise than power)
motor.setVoltage(Volts.of(6.0));  // Exactly 6 volts

// Set speed (PID maintains this)
motor.setRawVelocityTarget(RPM.of(5000), MotorPidMode.DutyCycle, 0);

// Read sensor data
double speed = motor.getVelocity().in(RotationsPerSecond);
double position = motor.getPosition().in(Rotations);
```

<details>
<summary><strong>What is the difference between setPower and setVoltage?</strong></summary>

| | `setPower(0.5)` | `setVoltage(6.0)` |
|---|---|---|
| **Meaning** | 50% of whatever power is available | Exactly 6 volts |
| **Battery dependent?** | Yes - 50% of a low battery is weaker | No - always 6V |
| **When to use** | Simple mechanisms | Precision control (shooter, swerve) |

**Analogy:** `setPower` is like "press the gas pedal halfway." `setVoltage` is like "cruise control at exactly 30 mph."

</details>

<details>
<summary><strong>What is an encoder?</strong></summary>

An **encoder** is a sensor inside the motor that measures:
- **Position:** How many rotations (like a car's odometer)
- **Velocity:** How fast it is spinning (like a speedometer)

```
Motor spins → Encoder counts rotations → Code reads position/speed
```

Without an encoder: "Spin at 50% and hope you go the right distance."
With an encoder: "Move exactly 10 rotations" (precise control).

</details>

## Exercise: Build Your Own MotorSubsystem

Now you will apply what you learned about Java and OOP. Your job is to create a `MotorSubsystem` class that wraps motor control logic.

### Requirements

Create a `MotorSubsystem` class that:

1. Has fields for the motor's power level and name
2. Has a `setPower(double power)` method that limits power to -1.0 to 1.0
3. Has a `stop()` method that sets power to 0
4. Has an `isRunning()` method that returns true if power is not 0
5. Has a `getPower()` method that returns the current power
6. Prints a message whenever the motor starts or stops
7. Checks if the hardware is ready before allowing motor control (use an `isHardwareReady` boolean passed to the constructor)

### Starter Template

```java
public class MotorSubsystem {
    // Your code here
    // Fields: name, power, isHardwareReady, isRunning

    // Constructor

    // setPower (with safety limits)

    // stop

    // isRunning

    // getPower
}
```

**Try to write this yourself before looking at the answer.** Think about:
- What fields does the class need?
- What does the constructor need to set up?
- How do you prevent power from going above 1.0 or below -1.0?
- How does the "ready check" protect against crashes?

<details>
<summary><strong>Click for the answer after you have tried</strong></summary>

```java
public class MotorSubsystem {
    private String name;
    private double power;
    private boolean isHardwareReady;

    public MotorSubsystem(String name, boolean isHardwareReady) {
        this.name = name;
        this.power = 0;
        this.isHardwareReady = isHardwareReady;

        if (isHardwareReady) {
            System.out.println(name + " subsystem initialized");
        } else {
            System.out.println("WARNING: " + name + " hardware not ready");
        }
    }

    public void setPower(double power) {
        if (!isHardwareReady) {
            System.out.println("WARNING: " + name + " cannot run - hardware not ready");
            return;
        }

        // Safety: limit power to safe range
        if (power > 1.0) power = 1.0;
        if (power < -1.0) power = -1.0;

        this.power = power;

        if (power != 0) {
            System.out.println(name + " running at " + power);
        } else {
            System.out.println(name + " stopped");
        }
    }

    public void stop() {
        setPower(0);
    }

    public boolean isRunning() {
        return power != 0;
    }

    public double getPower() {
        return power;
    }
}
```

### How to Test It

```java
// Create a motor that IS ready
MotorSubsystem driveMotor = new MotorSubsystem("Drive", true);
driveMotor.setPower(0.75);  // Should print: "Drive running at 0.75"
driveMotor.stop();           // Should print: "Drive stopped"

// Create a motor that is NOT ready
MotorSubsystem shooterMotor = new MotorSubsystem("Shooter", false);
shooterMotor.setPower(0.5);  // Should print: "WARNING: Shooter cannot run..."
```

### What You Practiced

| Concept | How You Used It |
|---------|----------------|
| **Encapsulation** | `power` is private, accessed through methods |
| **Safety checks** | Power is limited to -1.0 to 1.0 |
| **Ready check** | Prevents crashes when hardware is missing |
| **OOP design** | One class that wraps all motor logic |

### In Real XBot Code

The real `SimpleMotorSubsystem` in XBot does the same thing but also:
- Uses Dagger for dependency injection (learn in Core Programming)
- Uses factories to create motor controllers
- Uses properties for runtime tuning
- Provides built-in commands (forward, reverse, stop)

You will learn these advanced patterns after finishing the curriculum basics.

</details>

## Safety Patterns

### Always Check Before Using

```java
if (contract.isShooterReady()) {
    this.motor = factory.create(contract.getShooterMotor(), ...);
}
```

This prevents your code from crashing when testing on a partially-built robot.

### Use Optional for Safe Access

```java
public Optional<XCANMotorController> getMotor() {
    return Optional.ofNullable(this.motor);
}

// Safe: does nothing if motor is null
getMotor().ifPresent(m -> m.setPower(0.5));
```

---

## Quiz

**Q1:** What range does `setPower()` accept?

- [ ] A) 0 to 100
- [ ] B) -12 to 12
- [ ] C) -1.0 to 1.0
- [ ] D) 0 to 1.0

<details>
<summary>Answer</summary>

**C) -1.0 to 1.0**

-1.0 is full reverse, 0 is stopped, 1.0 is full forward. This is the standard for FRC motor control.

</details>

**Q2:** What does checking `contract.isShooterReady()` prevent?

- [ ] A) The motor from spinning too fast
- [ ] B) Crashes when hardware is not connected
- [ ] C) The robot from driving off the field
- [ ] D) Multiple motors running at once

<details>
<summary>Answer</summary>

**B) Crashes when hardware is not connected**

The ready check ensures you only create motor objects for hardware that is actually wired. If a motor is missing, the subsystem still works -- it just does nothing when you try to use that motor.

</details>

**Q3:** What does an encoder measure?

- [ ] A) The motor's temperature
- [ ] B) The motor's position and velocity
- [ ] C) The battery voltage
- [ ] D) The CAN bus speed

<details>
<summary>Answer</summary>

**B) The motor's position and velocity**

Encoders track how many rotations the motor has made (position) and how fast it is spinning (velocity). This enables precise control like "move exactly 10 rotations."

</details>
