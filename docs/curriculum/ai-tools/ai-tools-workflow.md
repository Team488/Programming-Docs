# AI Tools: Workflow Tips

Learn how to get the most out of OpenCode.

## Plan Mode vs Build Mode

OpenCode has two modes. Toggle between them with the **Tab** key.

| Mode | Behavior | Use When |
|------|----------|----------|
| **Plan** | Explains what it would do but makes no changes | Exploring approaches, reviewing design |
| **Build** | Reads, edits, and creates files | Making actual changes |

**Good practice:** Start in Plan mode for complex features. Review the plan, then switch to Build mode and say "Sounds good, go ahead."

## How to Write Good Prompts

### Be Specific

```
Bad: Fix the robot.
Good: The elevator subsystem in src/main/java/frc/robot/subsystems/Elevator.java
does not stop at the top limit switch. Add logic to stop the motor when
the limit switch is triggered.
```

### Provide Context

Use `@` to reference files:

```
How is the swerve drive configured in @src/main/java/frc/robot/subsystems/Drive.java?
```

### Show Examples

```
Look at how TankDrive handles motor safety in @src/main/java/frc/robot/subsystems/TankDrive.java.
Apply the same pattern to the Elevator subsystem.
```

## Working with the Codebase

### Ask Questions

```
How does the command scheduler work in this project?
```

### Add Features

```
Create a new command called IntakeCommand that runs the intake rollers
for 2 seconds when the A button is pressed.
```

### Debug Issues

```
The robot drifts to the left during autonomous. Look at the
odometry code in @Drivetrain.java and find the bug.
```

## Best Practices

1. **Commit before asking for changes** -- you can always undo if something goes wrong
2. **Run /init per project** -- the AGENTS.md file gives OpenCode critical context
3. **Be specific in prompts** -- the more context you give, the better the result
4. **Use Plan mode for unknowns** -- review before committing to changes
5. **Use /share to get help** -- share sessions with teammates or mentors
6. **Create custom commands** -- `/test`, `/deploy`, `/simulate` for repetitive tasks

## Common FRC Use Cases

| Task | Example Prompt |
|------|---------------|
| Fix a subsystem | "The intake motor keeps running after the button is released. Fix it." |
| Add a command | "Create a command that drives the robot forward 2 meters using encoders." |
| Tune PID | "The arm oscillates at the setpoint. Tune the PID gains." |
| Refactor code | "Extract the odometry logic into its own class." |
| Understand code | "Explain how the swerve drive kinematics work in this project." |

---

## Quiz

**Q1:** What is the difference between Plan mode and Build mode?

- [ ] A) Plan mode is faster
- [ ] B) Plan mode explains what it would do without making changes; Build mode makes actual changes
- [ ] C) Build mode only works with Python
- [ ] D) There is no difference

<details>
<summary>Answer</summary>

**B) Plan mode explains what it would do without making changes; Build mode makes actual changes**

Use Plan mode to explore approaches and review design. Switch to Build mode when you are ready to make changes.

</details>

**Q2:** How do you reference a specific file in a prompt to OpenCode?

- [ ] A) Type the full file path manually
- [ ] B) Use `@` followed by the filename
- [ ] C) Attach the file as an image
- [ ] D) Open the file in another window

<details>
<summary>Answer</summary>

**B) Use `@` followed by the filename**

The `@` key opens a fuzzy file search. Select a file to reference it in your prompt and give OpenCode context about the code you are discussing.

</details>

**Q3:** What should you do before asking OpenCode to make changes?

- [ ] A) Delete your code
- [ ] B) Commit your current changes to Git
- [ ] C) Close all other programs
- [ ] D) Restart your computer

<details>
<summary>Answer</summary>

**B) Commit your current changes to Git**

Always commit before asking for changes. If something goes wrong, you can undo using Git or OpenCode's `/undo` command.

</details>
