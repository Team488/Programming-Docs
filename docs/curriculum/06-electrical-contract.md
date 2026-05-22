# Electrical Contract

The single source of truth for how the robot is wired.

## What Is It?

The **Electrical Contract** is an interface that defines every motor, sensor, and device on the robot and what port/CAN ID it uses. Instead of scattering port numbers throughout your code, everything goes through the contract.

**Without a contract (bad):**
```java
// Hardcoded everywhere -- if the wiring changes, you must update every file
motor1 = new TalonFX(11);  // In DriveSubsystem.java
motor2 = new TalonFX(11);  // In ShooterSubsystem.java -- wait, same port? Bug!
```

**With a contract (good):**
```java
// One place to update if wiring changes
contract.getDriveMotor();    // Returns port 11
contract.getShooterMotor();  // Returns port 12
```

### What is a CAN ID?

Every device on the robot's CAN bus needs a unique ID number, like a phone number. The roboRIO uses this ID to send commands to the right device.

```
roboRIO: "Device #11, spin at 50%!"
CAN Bus:  ─────────────────────
Devices:  #11 (Drive) ← responds
          #12 (Shooter) ← ignores, not its ID
```

The electrical team assigns these IDs when they wire the robot. Your contract just reads them.

## How XBot Uses Contracts

```java
// Interface: defines what methods every contract must provide
public interface ElectricalContract {
    CANMotorControllerInfo getDriveMotor();
    CANMotorControllerInfo getShooterMotor();
    boolean isDriveReady();
    boolean isShooterReady();
}

// Implementation for the competition robot
public class CompetitionContract implements ElectricalContract {
    @Override
    public CANMotorControllerInfo getDriveMotor() {
        return new CANMotorControllerInfo("Drive", CANBusId.RIO, 11);
    }

    @Override
    public boolean isDriveReady() {
        return true;  // Competition robot has all motors wired
    }
}

// Implementation for the practice robot (different wiring!)
public class PracticeContract implements ElectricalContract {
    @Override
    public CANMotorControllerInfo getDriveMotor() {
        return new CANMotorControllerInfo("Drive", CANBusId.RIO, 21);  // Different port!
    }

    @Override
    public boolean isDriveReady() {
        return false;  // Practice robot might not have this motor yet
    }
}
```

### Why Two Contracts?

Your team might have a practice robot with different wiring than the competition robot. By swapping which contract is used, the same code works on both robots.

```
Subsystem code → asks contract for motor info → gets correct ports for this robot
```

## The Ready Check Pattern

Always check if hardware is available before using it:

```java
if (contract.isShooterReady()) {
    // Only create the motor if it is actually wired
    this.motor = factory.create(contract.getShooterMotor(), ...);
}
```

This prevents crashes when testing code on a partially-built robot.

---

## Quiz

**Q1:** What is the main purpose of the Electrical Contract?

- [ ] A) To make the code run faster
- [ ] B) To keep all wiring information in one place
- [ ] C) To replace the electrical team
- [ ] D) To count how many motors are on the robot

<details>
<summary>Answer</summary>

**B) To keep all wiring information in one place**

The contract is the single source of truth for wiring. When the robot is rewired, you only update the contract -- all the subsystem code automatically gets the correct information.

</details>

**Q2:** Why does XBot have different contract implementations?

- [ ] A) To confuse new team members
- [ ] B) So the same code works on practice and competition robots
- [ ] C) Because Java requires multiple implementations
- [ ] D) To use more memory

<details>
<summary>Answer</summary>

**B) So the same code works on practice and competition robots**

Practice robots often have different wiring than competition robots. By swapping which contract is used, the same subsystem code works on both.

</details>

**Q3:** What does `contract.isShooterReady()` check?

- [ ] A) If the shooter is spinning
- [ ] B) If the shooter motor is wired and configured
- [ ] C) If the shooter subsystem exists
- [ ] D) If the robot is in autonomous mode

<details>
<summary>Answer</summary>

**B) If the shooter motor is wired and configured**

The `isReady()` methods check if the hardware is actually connected. This prevents crashes when running code on a robot that is not fully assembled.

</details>
