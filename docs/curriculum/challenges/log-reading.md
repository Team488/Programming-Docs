# Curriculum challenge ~ Reading Robot Logs

## Overview

Robot logs let us investigate what a robot did without needing the physical robot. In this challenge, you will use AdvantageScope to identify robot modes, examine mechanism behavior, and support your observations with recorded data.

## What you will need

- **AdvantageScope** to view the recorded robot data.
- **Sample match log:** Download the `.wpilog` recording from [the provided OneDrive link](https://1drv.ms/u/c/f482142effd655fe/IQAaNBIEut-oSI4AS6ojEWqaAZQWXYeuM0f4LQu-MLA8g0o?e=gAaYtS).
- **TeamXbot2026 repository:** Fork [Team488/TeamXbot2026](https://github.com/Team488/TeamXbot2026) to your GitHub account, then clone your fork to your computer.

In your local copy, locate `LoggedLayout.json`. Import this file into AdvantageScope to load the tabs and fields used in this lesson.

## Open the Log Recordings

1. Select **File → Import Layout**, navigate to the `AdvantageScope` folder and open `LoggedLayout.json`.
2. If a **Version mismatch** warning appears, click **Continue** to attempt to load the layout. If the layout does not display correctly, ask your instructor for help.
3. Select **File → Open Log(s)** and choose the downloaded `.wpilog` file.

You should see this when you are completed with all of these steps:
<img width="3414" height="2148" alt="image" src="https://github.com/user-attachments/assets/0aa24640-ad13-4e78-8ab2-fb2aad5e76bc" />

## Navigate the layout

The provided layout organizes recorded data into tabs across the top of AdvantageScope:

| Tab | What it displays |
| --- | --- |
| **2D Field** | The robot’s recorded position and path from above |
| **3D Field** | Robot position and supported data in a 3D scene |
| **Command Timeline** | When commands were recorded as running |
| **Alerts** | Recorded robot alerts |
| **Power** | Electrical measurements, such as voltage and current |
| **Shooter** | Shooter motor speeds and current |
| **Intake Deploy** | Intake position, motor voltage, current, and controller mode |
| **Rotation Debugging** | The rotation-related fields configured in this tab |
| **Swerve** | Recorded swerve module angles and speeds |
| **Console** | Program messages, warnings, and errors |

Select a tab to explore that part of the robot’s behavior. Check the field names and units to understand what each view displays.

The layout determines which fields are displayed and how they appear, and the `.wpilog` file supplies their recorded values. Fields may appear greyed out or crossed out before you open a log. If they remain crossed out afterward, the recording may not contain a matching field.

1. Open either the **2D Field** or **3D Field** tab.
2. Find the last blue-highlighted interval on the timeline and move the time cursor near its beginning.
3. Start the playback.
4. Choose a item in the left sidebar and expand its fields. For example, expand **ShooterLeftMotor → CANMotorController** and watch **Angle**.
5. Observe how the recorded angle changes as playback progresses.

## Watch the match

Watch the match alongside the robot log to compare the robot’s actions with the recorded data. (This can help you visualize what the robot is doing in the whole match)

https://www.youtube.com/watch?v=tlL5_BXYXAg

## Understand the Command Timeline

Select the **Command Timeline** tab at the top of AdvantageScope.

The labeled bars show when commands were recorded as running. A longer bar represents a longer interval, and overlapping bars indicate commands running in parallel.

- **true:** The robot was enabled.
- **false:** The robot was disabled.

### Explore the recording

Move the time cursor through the timeline and zoom in to read the command names.

Find and record:

1. One interval when the robot was enabled and one when it was disabled.
2. Two commands that overlap. Record their names and a timestamp when both were running.
3. One command recorded across a disabled interval. Explain why a command appearing in the timeline does not prove that a motor was moving.

The Command Timeline shows recorded software activity. To investigate the robot's movements, look at the motor speeds, positions, voltage, or other measurements to investigate the robot's physical response.

## Observe the shooter

Open the **Shooter** tab.

Read the field names and axis labels before interpreting the graph. Motor speed is measured in RPM; electrical current is measured in amps and may use a separate axis.
The colored bars below the graph show recorded true/false states at each point in time:

- **Blue/Enabled:** Whether the robot was enabled (`true`) or disabled (`false`).
- **Green/ErrorWithinTotalTolerance:** Shows whether the shooter’s speed is close enough to its target, based on the controller’s allowed error.
- **Pink/ErrorIsTimeStable:** Shows whether the speed error has stayed within the controller’s stability limits for the required amount of time.
  
Find one interval where the shooter spins up and slows down.

- Approximately what speed does it reach?
- When does it begin slowing down?
- Is the robot enabled at that moment?
- Does wheel speed immediately become zero when the robot is disabled?

Use timestamps and recorded values in your answers. A console message stating a requested speed does not prove the wheels reached that speed.

## Observe intake deployment

Open the **Intake Deploy** tab.

Motor voltage and intake position are shown on the left axis. Current is shown on the right in amps. Before reading the position values, check what units they use.

The bars below the graph show the robot’s status and how the intake is being controlled:

- **Blue/Enabled:** Shows whether the robot is enabled (`true`) or disabled (`false`).
- **Green/CurrentMode:** Shows the intake controller’s recorded mode, such as `HumanControl`, `MachineControl`, or `Coast`.

The graph lines show:

- **Blue:** Intake deployment motor voltage.
- **Tan:** Recorded intake position.
- **Orange:** Intake deployment motor current.

Find the recorded position, motor voltage, motor current, and controller mode.

Choose one movement and record:

- Its start and end times.
- Its starting and ending positions.
- The controller mode during the movement.
- Whether position continues changing after motor voltage becomes zero.

## Read the console

Console messages come in different formats. Most formatted lines follow this pattern:

`Message Type | Date and time | Code line | Source | Message`

### Message Types

- **INFO:** Reports an event or status, such as a command starting.
- **WARN:** Reports something needing attention, such as a loop taking too long.
- **ERROR:** Reports a problem. Lines beginning with `at` show the code locations involved and which error they belong to.

Some messages are plain text and don't include these sections. Start by asking: **What happened, when did it happen, and which part of the program reported it?** Use the details available.

### Try it yourself

Choose an `INFO` message and one warning (`WARN`) or error (`ERROR`) and explain each in your own words.

## Check your understanding

Take the [Robot Log Reading Check](https://docs.google.com/forms/d/e/1FAIpQLSf6jrNXObfJBfly6mRTGmFmDBFtgOGxDWPvWvlwe_-scln9Ag/viewform?usp=publish-editor)
