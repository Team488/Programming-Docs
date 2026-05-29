# Adding Autonomous Routines to the OperatorCommandMap

XBOT does not use a traditional WPILib `SendableChooser` for autonomous selection.  
Instead, it provides a higher‑level system built around the 
**OperatorCommandMap** and **AutonomousCommandProvider** classes.

This system allows you to:
- Register autonomous routines
- Attach metadata (like starting landmarks)
- Display autos on SmartDashboard
- Select autos through Elastic SmartDashboard

This page explains how to add autos to the OperatorCommandMap.

---

# 1. Overview of the XBOT Auto Selection System

In XBOT, each autonomous routine is represented by an `AutonomousCommandProvider`.  
You obtain one using dependency injection:

```java
var auto = setAutonomousCommandProvider.get();
``` 

Each provider can be configured with:

1. The command to run during autonomous

2. The starting landmark (field position)

3. A display name for SmartDashboard

Once configured, the auto is automatically added to the XBOT auto selector.

---     

# Registering the Auto with OperatorCommandMap

### Use the AutonomousCommandProvider to register the auto:
```
Here is an example of registering a single auto routine:

var hubToDepoToTower = setAutonomousCommandProvider.get();
hubToDepoToTower.setAutoCommand(AutoBuilder.buildAuto("HubToDepoToTower"));
hubToDepoToTower.includeOnSmartDashboard("Hub to Depo to Tower Auto");
```
### Breakdown:

#### 1. setAutoCommand(AutoBuilder.buildAuto("AutoName"));
- `AutoBuilder`: A utility class used to build auto routines.
- `.buildAuto("AutoName")`: Builds an auto routine based on the name of an auto you created in the PathPlanner GUI.
  - The string you pass must match the name of an auto in your PathPlanner project.

#### 2. includeOnSmartDashboard("Name")
- Adds the auto to:
  - SmartDashboard with the given name
  - AdvantageScope

The string you pass becomes the selectable name.

## Adding Multiple Autos

You can register as many autos as you want:
```
Here is an example of registering multiple autonomous programs:

var moveAcrossField = setAutonomousCommandProvider.get();
moveAcrossField.setAutoCommand(moveAcrossFieldCommand, Landmarks.blueStartTrenchToOutpost);
moveAcrossField.includeOnSmartDashboard("Move midway through field and back.");

var shootFromTrench = setAutonomousCommandProvider.get();
shootFromTrench.setAutoCommand(shootFromTrenchCommandGroup, Landmarks.blueStartTrenchToOutpost);
shootFromTrench.includeOnSmartDashboard("Shoot from trench.");
```
### Each auto will appear as a new separate autonomous routine.
#### When creating multiple autos, ensure each has a *unique*, *clear*, and *concise* name for the SmartDashboard.