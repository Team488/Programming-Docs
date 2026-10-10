# Running the Simulator

The simulator runs your robot code on your laptop and shows the robot driving around a virtual field. You can try out your code without a physical robot, which matters because the real robots are shared between a lot of people.

Running it takes two programs side by side:

- **Robot Simulation** -- runs your code, and is where you plug in a controller and enable the robot
- **AdvantageScope** -- draws the robot on the field so you can watch what it does

Come back to this page whenever a challenge says to try something in the simulator.

## What you need

- The XbotEdu project open in IntelliJ (see [Environment Setup](/curriculum/getting-started/environment-setup))
- **A USB gamepad.** The team usually has spares, so ask if you don't have one.

::: tip No gamepad?
The simulator can use your keyboard as a joystick, but only for the **left stick**: <kbd>W</kbd>/<kbd>S</kbd> push it up and down, <kbd>A</kbd>/<kbd>D</kbd> push it left and right, and <kbd>Z</kbd> <kbd>X</kbd> <kbd>C</kbd> <kbd>V</kbd> are buttons. That is enough for single-stick controls like arcade drive. **Tank drive needs a real gamepad**, since the keyboard has no right stick.
:::

## 1. Start the simulator

In the top-right corner of IntelliJ, select the **Simulate Robot** launch configuration, then click the green play triangle beside it.

<img src="https://github.com/user-attachments/assets/cdeb67b8-27b7-4e70-886a-a6dda0f23fb8" alt="The Simulate Robot launch configuration in IntelliJ">

Your code builds, and then a new window called **Robot Simulation** opens.

## 2. Connect your controller and enable the robot

In the Robot Simulation window:

1. Find your gamepad under **System Joysticks** on the left, and drag it into the **Joystick[0]** slot. Slot 0 is the one the robot code reads from (`operatorInterface.gamepad`).
   - Using the keyboard instead? Drag **Keyboard 0** into Joystick[0].
2. Under **Robot State** in the top left, select **Teleoperated**. This enables the robot -- until you do, it ignores the controller.

When you're done it should look like this:

<img src="https://github.com/user-attachments/assets/66e2b6ea-1b31-4788-94d1-f7e10899975c" alt="The Robot Simulation window with a gamepad in Joystick[0] and Teleoperated selected">

## 3. Watch the robot in AdvantageScope

1. Open **AdvantageScope (WPILib)**. It can take a while to start. The app name ends with the year of the WPILib version you installed, for example "AdvantageScope (WPILib) 2026".
2. Choose **File → Connect to Simulator**.
3. Choose **File → Import Layout...** and select `AdvantageScope_layout.json` from the top folder of your XbotEdu repository. This sets up tabs for viewing the robot.
4. Pick a tab at the top of the window.

The layout gives you two views of the robot on the 2026 field:

| Tab | What it shows |
|-----|---------------|
| **2d top view** | The robot from above. The easiest view for most challenges. |
| **3D Field** | The same thing in 3D. |

Now drive! The robot on screen should move as you use the controller.

::: tip Seeing the raw data
The sidebar on the left lists every value the robot code is logging. Drag any of them into a tab, or onto a new tab from the **+** button, to look at it -- for example the drive motors under `AdvantageKit/DriveSubsystem`.
:::

## Making changes

Your code only updates when the simulator restarts:

1. Stop the simulator with the red square button in IntelliJ.
2. Edit your code.
3. Start **Simulate Robot** again, and re-enable the robot by selecting **Teleoperated**.

If AdvantageScope shows no data after a restart, choose **File → Connect to Simulator** again.

## Troubleshooting

**The robot doesn't move at all.**
Check that **Teleoperated** is selected in the Robot Simulation window -- a disabled robot ignores every input. Then check that your controller is in the **Joystick[0]** slot, not one of the others. In the Robot Simulation window, the axis values under Joystick[0] should change as you move the sticks -- if they don't, the robot isn't getting your input.

**My gamepad isn't listed under System Joysticks.**
Make sure it's plugged in. If it still doesn't appear, stop and restart the simulator.

**Only one side of a tank drive moves.**
You're probably using the keyboard, which has no right stick. Use a gamepad.

**AdvantageScope is blank.**
The simulator has to be running before AdvantageScope can connect. Start it, then choose **File → Connect to Simulator**. If the field is there but the robot isn't, re-import the layout file.

**The robot drives the wrong way.**
That's usually your code rather than the simulator -- check the signs on the values you send to the motors.

## Learn more

- [AdvantageScope](/tooling/advantagescope) -- more on AdvantageScope, including replaying logs from a real robot
- [Elastic](/tooling/elastic) -- the dashboard used for tuning values and starting commands, introduced in [Moving to a Target Position](/curriculum/challenges/moving-to-a-target-position)
