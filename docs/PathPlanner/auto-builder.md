# Using AutoBuilder to Run PathPlanner Autos

AutoBuilder is the recommended way to run PathPlanner autos. It handles:
- Path following
- Alliance mirroring
- Event marker execution
- Auto loading
- Holonomic control (swerve)

---

## AutoBuilder Overview

AutoBuilder connects your drivetrain to PathPlanner by providing:
- Pose supplier
- Pose reset function
- Chassis speed supplier
- Drive function
- Path follower configuration
- Alliance mirroring logic

This is typically configured once during robot initialization.

---
