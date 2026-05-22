# Intermediate Java

Java features used heavily in XBot code that go beyond the basics.

The concepts here appear in nearly every XBot subsystem. You will see them in the competition robot code and SeriouslyCommonLib.

## 1. Generics `<T>`

Generics let you write code that works with any type. Instead of writing the same logic for every type, you use a **type parameter**.

```java
// Without generics: must cast, easy to make mistakes
List motors = new ArrayList();
motors.add(new TalonFX(1));
TalonFX m = (TalonFX) motors.get(0);  // Must cast, and what if it's not a TalonFX?

// With generics: type-safe, no casting needed
List<TalonFX> motors = new ArrayList<>();
motors.add(new TalonFX(1));
TalonFX m = motors.get(0);  // No cast needed -- Java knows it's a TalonFX
```

### Common Generics You Will See

```java
// Lists and Maps -- the most common
List<XCANMotorController> motors = new ArrayList<>();
Map<String, Double> pidValues = new HashMap<>();

// Optional
Optional<Distance> laserReading;

// Functional interfaces
Supplier<Double> valueSupplier;
Consumer<String> logger;
```

### Why Generics Matter in XBot

Every `List`, `Map`, and `Optional` in the codebase uses generics. You cannot read or write XBot code without understanding `< >`.

```java
// From TeamXbot2026 ShooterSubsystem -- storing motors in a typed list
public List<XCANMotorController> getShooterMotors() {
    var motors = new ArrayList<XCANMotorController>(3);
    // ... add motors
    return motors;
}
```

## 2. Collections (List, Map, ArrayList, HashMap)

Collections are objects that store groups of other objects. They are the standard way to manage multiple motors, configs, or data points.

### List -- Ordered Collection

```java
// List: ordered, can have duplicates
List<String> names = new ArrayList<>();
names.add("Drive");
names.add("Shooter");
names.add("Intake");
names.get(0);       // "Drive" -- access by index
names.size();       // 3
names.contains("Drive");  // true

// XBot pattern: storing all motors of a subsystem
List<XCANMotorController> shooterMotors = new ArrayList<>();
shooterMotors.add(leftMotor);
shooterMotors.add(rightMotor);
```

### Map -- Key-Value Pairs

```java
// Map: look up values by a key (like a dictionary)
Map<String, Double> motorSpeeds = new HashMap<>();
motorSpeeds.put("FrontLeft", 0.5);
motorSpeeds.put("FrontRight", 0.75);
motorSpeeds.get("FrontLeft");    // 0.5
motorSpeeds.containsKey("RearLeft");  // false

// XBot pattern: mapping configuration data
Map<CANBusId, List<CANDevice>> devicesByBus = new HashMap<>();
devicesByBus.computeIfAbsent(busId, k -> new ArrayList<>()).add(device);
```

<details>
<summary><strong>ArrayList vs LinkedList -- which to use?</strong></summary>

Use `ArrayList` 95% of the time. It is faster for most operations. `LinkedList` is only useful when you frequently add/remove items at the beginning of the list, which is rare in robot code.

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| Get by index | Instant | Slow (must walk the list) |
| Add at end | Instant | Instant |
| Add at beginning | Slow (shifts elements) | Instant |
| Memory overhead | Low | Higher (stores pointers) |

</details>

## 3. Optional\<T\>

`Optional` is a box that either contains a value or is empty. It forces you to handle the "no value" case instead of crashing with a `NullPointerException`.

### Creating Optional

```java
Optional<String> name = Optional.of("Drive");   // Contains "Drive"
Optional<String> empty = Optional.empty();       // Contains nothing
Optional<String> maybe = Optional.ofNullable(someVariable);  // null becomes empty
```

### Using Optional Safely

```java
// BAD: might crash
XCANMotorController motor = getMotor();  // Could be null!
motor.setPower(0.5);                     // CRASH if null!

// GOOD: safe patterns

// 1. ifPresent -- do something only if value exists
getMotor().ifPresent(m -> m.setPower(0.5));

// 2. orElse -- provide a default if empty
double speed = getVelocity().orElse(RPM.zero()).in(RPM);

// 3. map -- transform the value if present
Optional<Distance> calibrated = getRawLaserDistance()
    .map(d -> d.minus(offset));

// 4. isPresent -- check then use (old-style, avoid if possible)
if (getMotor().isPresent()) {
    getMotor().get().setPower(0.5);
}
```

### Why XBot Uses Optional

Hardware might not be connected during testing. Methods return `Optional` so the caller must consciously decide what to do when the hardware is absent.

```java
// From SeriouslyCommonLib -- motor might not exist
public Optional<XCANMotorController> getMotorController() {
    return Optional.ofNullable(this.motor);
}

// Usage -- safe even if motor was never created
getMotorController().ifPresent(m -> m.setPower(0.5));
```

## 4. Lambdas `->`

A **lambda** is a short anonymous function you can pass around as a value. Think of it as a snippet of code you can store in a variable or pass to another method.

```java
// Full method:
public double doubleIt(double x) {
    return x * 2;
}

// Lambda version of the same thing:
(x) -> x * 2
```

### Lambda Syntax

```java
// Zero parameters
() -> System.out.println("Hello")

// One parameter (parentheses optional)
x -> x * 2
(x) -> x * 2

// Multiple parameters
(a, b) -> a + b

// Multiple statements (need braces and return)
(x) -> {
    double result = x * 2;
    System.out.println(result);
    return result;
}
```

### Where XBot Uses Lambdas

```java
// 1. With Optional -- only run if value exists
getMotor().ifPresent(m -> m.setPower(0.5));

// 2. With Streams -- transform/filter data
reefPoses.stream()
    .filter(pose -> pose.getX() > 0)
    .forEach(pose -> System.out.println(pose));

// 3. With property change listeners
maxOutputProps.hasChangedSinceLastCheck(
    (value) -> setPowerRange(minOutputProps.get(), value)
);

// 4. In command factories
new NamedRunCommand("Run", () -> motor.setPower(0.5), this);

// 5. With Suppliers (deferred values)
new WaitForDurationCommand(() -> getRemainingTime());
```

## 5. Method References `::`

A **method reference** is a shorthand for a lambda that just calls one existing method.

```java
// Lambda:
x -> System.out.println(x)

// Method reference (same thing):
System.out::println
```

### Common Patterns

```java
// Calling a method on a parameter
getMotor().map(m -> m.getVelocity())    // Lambda
getMotor().map(XCANMotorController::getVelocity)  // Method reference

// Calling a method with no parameters
() -> this.setForward()   // Lambda
this::setForward          // Method reference

// Static method
x -> Math.abs(x)          // Lambda
Math::abs                 // Method reference

// In XBot commands
new NamedRunCommand("Forward", this::setForward, this);
new NamedRunCommand("Stop", this::stop, this);

// With streams
motors.stream().forEach(XCANMotorController::setPower);
```

## 6. Streams (Functional Programming)

**Streams** let you process collections declaratively -- you say WHAT you want, not HOW to do it.

### Without Streams (imperative)

```java
List<Pose2d> reefPoses = getReefPoses();
List<Pose2d> filtered = new ArrayList<>();
for (Pose2d pose : reefPoses) {
    if (pose.getX() > 0) {
        filtered.add(pose);
    }
}
```

### With Streams (declarative)

```java
List<Pose2d> filtered = getReefPoses().stream()
    .filter(pose -> pose.getX() > 0)
    .collect(Collectors.toList());
```

### Common Stream Operations

```java
// FILTER -- keep items that match a condition
motors.stream()
    .filter(m -> m.getVelocity() > 0)
    .collect(Collectors.toList());

// MAP -- transform each item
reefPoses.stream()
    .map(Pose3d::toPose2d)
    .collect(Collectors.toList());

// FOR EACH -- do something with each item
motors.stream().forEach(m -> m.setPower(0.5));

// REDUCE -- combine all items into one
double total = values.stream().reduce(0.0, Double::sum);

// Find max
String longest = names.stream()
    .max(Comparator.comparing(String::length))
    .orElse("");
```

### Real XBot Examples

```java
// Converting blue to red alliance poses
public final List<Pose2d> redPoses = bluePoses.stream()
    .map(PoseSubsystem::convertBluetoRed)
    .collect(Collectors.toList());

// Finding max refresh rate
var maxEntry = refreshData.entrySet().stream()
    .max(Map.Entry.comparingByValue())
    .map(Map.Entry::getKey)
    .orElse(null);

// Calculating average of tag positions
double xTotal = tags.stream()
    .map(Pose2d::getX)
    .reduce(0.0, Double::sum);
```

<details>
<summary><strong>What is a "functional programming" style?</strong></summary>

Functional programming treats computation as evaluating functions and avoids changing state. Instead of writing loops that modify variables, you chain operations that describe the desired transformation.

**Imperative (how):**
```java
List<Double> speeds = new ArrayList<>();
for (XCANMotorController m : motors) {
    if (m.isConnected()) {
        speeds.add(m.getVelocity().in(RPM));
    }
}
```

**Functional (what):**
```java
List<Double> speeds = motors.stream()
    .filter(XCANMotorController::isConnected)
    .map(m -> m.getVelocity().in(RPM))
    .collect(Collectors.toList());
```

The functional version is shorter, clearer, and harder to accidentally break.

</details>

## 7. Enums

An **enum** (enumeration) is a fixed set of named constants. Use enums when a variable can only be one of a predefined set of values.

```java
// Without enum: magic strings, error-prone
String state = "running";
if (state.equals("RUNNING")) { }  // Typo: "RUNNING" vs "running"?

// With enum: type-safe, autocomplete works
public enum MotorState { STOPPED, RUNNING, REVERSING }

MotorState state = MotorState.STOPPED;
if (state == MotorState.RUNNING) { }  // Safe, compiler catches typos
```

### Enums in XBot

```java
// Defining robot states
public enum ClimberState { RETRACTED, EXTENDED, MOVING }
public enum CoralLevel { L1, L2, L3, L4 }
public enum DeviceHealth { Healthy, Unhealthy }

// Switching on enums (modern switch)
return switch (state) {
    case RETRACTED -> deployClimber();
    case EXTENDED -> retractClimber();
    case MOVING -> waitForStop();
};

// Enums with fields (advanced)
public enum ReefFace {
    CLOSE_LEFT(0), CLOSE_RIGHT(1), FAR_LEFT(2), FAR_RIGHT(3);

    private final int index;
    ReefFace(int index) { this.index = index; }
    public int getIndex() { return index; }
}
```

### Why Enums Matter

Enums replace "magic strings" and integer constants with readable, type-safe names. Every state machine in XBot uses them.

## 8. `var` Keyword

`var` lets the compiler figure out the type. It works only for local variables.

```java
// Without var (verbose):
ArrayList<XCANMotorController> motors = new ArrayList<>();
HashMap<String, Double> values = new HashMap<>();

// With var (cleaner):
var motors = new ArrayList<XCANMotorController>();
var values = new HashMap<String, Double>();
```

### When to Use `var`

| Use `var` | Don't Use `var` |
|-----------|----------------|
| When the type is obvious from the right side | When the type is unclear |
| `var motors = new ArrayList<XCANMotorController>();` | `var result = someMethod();` // What type is result? |
| `var name = subsystem.getName();` // Clearly String | `var value = complexOperation();` // What is this? |

### XBot Usage

```java
var motors = new ArrayList<XCANMotorController>(3);
var distance = getRawLaserDistance();
var robotPose = new Pose3d(x, y, z, rotation);
```

## 9. `static` Members

`static` means the member belongs to the **class itself**, not to any one instance.

```java
public class Units {
    public static final double INCHES_PER_METER = 39.37;  // Shared constant
    public static double metersToInches(double m) {        // Utility method
        return m * INCHES_PER_METER;
    }
}

// Usage -- no object needed, call on the class directly
double inches = Units.metersToInches(1.5);
```

### Static Fields

```java
public class RobotMap {
    public static final int DRIVE_MOTOR_PORT = 11;
    public static final int SHOOTER_MOTOR_PORT = 12;
    public static final double MAX_SPEED = 0.75;
}

// Access anywhere without creating a RobotMap object
int port = RobotMap.DRIVE_MOTOR_PORT;
```

### Static Methods

```java
public class PoseUtils {
    public static Pose2d convertBluetoRed(Pose2d bluePose) {
        return new Pose2d(-bluePose.getX(), bluePose.getY(), bluePose.getRotation());
    }
}

// Call without creating an instance
Pose2d redPose = PoseUtils.convertBluetoRed(bluePose);
```

### Static Imports

```java
// Without static import:
double rpm = Units.RPM.of(5000);

// With static import:
import static edu.wpi.first.units.Units.RPM;
double rpm = RPM.of(5000);  // Cleaner!
```

Static imports are used extensively in XBot for WPILib units (`RPM`, `Meters`, `Seconds`, etc.).

## 10. Modern `switch` Expressions

Java 14+ introduced a much cleaner `switch`:

```java
// Old switch (easy to forget break):
String result;
switch (color) {
    case RED:
        result = "stop";
        break;
    case GREEN:
        result = "go";
        break;
    default:
        result = "unknown";
}

// Modern switch (no break, returns a value):
String result = switch (color) {
    case RED -> "stop";
    case GREEN -> "go";
    default -> "unknown";
};
```

### XBot Examples

```java
return switch (symmetry) {
    case kBlueOrigin -> new Pose2d(x, fieldWidth - y, rotation);
    case kRedOrigin -> new Pose2d(fieldLength - x, y, rotation);
};

return switch (alliance) {
    case Blue -> blueFaces;
    case Red -> redFaces;
};
```

## 11. Records

A **record** is a concise way to create a class that just holds data. Java auto-generates the constructor, getters, `equals()`, `hashCode()`, and `toString()`.

```java
// Traditional class (lots of boilerplate):
public class Point {
    private final double x;
    private final double y;
    public Point(double x, double y) { this.x = x; this.y = y; }
    public double x() { return x; }
    public double y() { return y; }
    @Override public boolean equals(Object o) { ... }
    @Override public int hashCode() { ... }
}

// Record (one line, same thing):
public record Point(double x, double y) { }
```

### Records in XBot

```java
// CAN bus identification
public record CANBusId(String id) { }

// Vision observation
public record VisionPoseObservation(
    Pose2d visionRobotPoseMeters,
    double timestampSeconds,
    int tagCount
) { }

// Scoring task data
public record ScoringTask(
    GameAction gameAction,
    Optional<ReefFace> reefFace,
    Optional<Branch> branch,
    Optional<CoralLevel> coralLevel
) { }
```

Use records whenever you have data that you want to pass around without behavior.

## 12. Functional Interfaces

Functional interfaces are interfaces with a single method. They are the types that lambdas implement.

| Interface | Method | What It Does |
|-----------|--------|-------------|
| `Supplier<T>` | `T get()` | Provides a value, takes nothing |
| `Consumer<T>` | `void accept(T)` | Takes a value, returns nothing |
| `Predicate<T>` | `boolean test(T)` | Tests a condition |
| `Function<T,R>` | `R apply(T)` | Transforms T into R |

### Supplier -- Deferred Values

```java
Supplier<Double> timeSupplier = () -> getRemainingTime();

// Pass the supplier, not the value -- value is computed when get() is called
new WaitForDurationCommand(timeSupplier);
```

### Consumer -- Callbacks

```java
Consumer<XCANMotorController> motorStopper = m -> m.setPower(0);

// Apply to everything
motors.forEach(motorStopper);

// In XBot: iterate over all swerve modules
forEachSwerveModule(SwerveModuleSubsystem::refreshDataFrame);
```

### Predicate -- Conditions

```java
Predicate<XCANMotorController> isRunning = m -> m.getVelocity() > 0;

// Check if any motor is running
boolean anyRunning = motors.stream().anyMatch(isRunning);

// In XBot: soft limits
BooleanSupplier reverseLimit = () -> getPosition() < minHeight;
```

## 13. Annotations You Will See

| Annotation | What It Means | Where You See It |
|-----------|---------------|------------------|
| `@Override` | Replacing a parent method | Every method override |
| `@Inject` | Dagger provides this | Constructors, fields |
| `@Singleton` | One instance for the whole robot | Subsystem classes |
| `@Test` | This method is a unit test | Test files |
| `@Module` | Dagger module definition | Injection config |
| `@Component` | Dagger component (entry point) | Injection config |
| `@Binds` | Maps interface to implementation | Dagger modules |
| `@Assisted` | Runtime parameter for factory | Factory classes |

Annotations are metadata -- they don't change what the code does, but tools (Dagger, JUnit) read them to act on the code.

---

## Key Terms Cheat Sheet

| Term | Meaning | Example |
|------|---------|---------|
| **Generic** | Type parameter `<T>` | `List<XCANMotorController>` |
| **List** | Ordered collection | `new ArrayList<>()` |
| **Map** | Key-value pairs | `new HashMap<>()` |
| **Optional** | Might contain a value | `Optional.ofNullable(x)` |
| **Lambda** | Anonymous function | `x -> x * 2` |
| **Method reference** | Shorthand lambda | `System.out::println` |
| **Stream** | Declarative data processing | `list.stream().filter(...).collect(...)` |
| **Enum** | Fixed set of constants | `enum State { ON, OFF }` |
| **`var`** | Type inference | `var x = new ArrayList<>();` |
| **`static`** | Belongs to the class, not an instance | `public static final double MAX = 1.0;` |
| **Record** | Concise data carrier | `record Point(double x, double y)` |
| **Supplier** | Provides a value | `() -> Math.random()` |
| **Consumer** | Accepts a value | `x -> System.out.println(x)` |

---

## Quiz

**Q1:** What does `Optional<XCANMotorController>` mean?

- [ ] A) The motor must always exist
- [ ] B) The motor might or might not be present
- [ ] C) There are multiple motors
- [ ] D) The motor is broken

<details>
<summary>Answer</summary>

**B) The motor might or might not be present**

`Optional` represents a value that may be absent. Common in XBot when hardware might not be connected. You must handle both cases -- when the value exists and when it does not.

</details>

**Q2:** What is the output of `names.stream().filter(n -> n.startsWith("A")).collect(Collectors.toList())` if `names` is `["Drive", "Arm", "Intake", "Aim"]`?

- [ ] A) `["Arm", "Aim"]`
- [ ] B) `["Drive", "Intake"]`
- [ ] C) `["Aim"]`
- [ ] D) `["Arm"]`

<details>
<summary>Answer</summary>

**A) `["Arm", "Aim"]`**

`filter` keeps only items where the condition is true. Both "Arm" and "Aim" start with "A", so they pass the filter. "Drive" and "Intake" are removed.

</details>

**Q3:** Which is the correct way to safely use a value from `Optional`?

- [ ] A) `getOptional().get().setPower(0.5);`
- [ ] B) `getOptional().ifPresent(m -> m.setPower(0.5));`
- [ ] C) `getOptional().setPower(0.5);`
- [ ] D) `if (getOptional() != null) getOptional().get().setPower(0.5);`

<details>
<summary>Answer</summary>

**B) `getOptional().ifPresent(m -> m.setPower(0.5));**

`ifPresent` only runs the lambda if the Optional contains a value. Option A crashes if Optional is empty. Option C doesn't compile (Optional has no `setPower`). Option D partially works but defeats the purpose of Optional -- `ifPresent` is the intended pattern.

</details>
