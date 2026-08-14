# Responsible AI Use

AI tools like OpenCode are powerful, but they do not replace understanding your own code. This page covers how to use AI ethically and safely on an FRC team.

## Golden Rule

> Never push code you do not understand.

If OpenCode writes something and you cannot explain how it works, do not deploy it. Your name goes on that code. You are responsible for what the robot does.

## The Required Workflow

Every time you use AI-generated code, follow these steps before pushing:

```
Write -> Review -> Simulate -> Deploy
```

### 1. Review Everything

AI can produce code that looks correct but is wrong. Always read every line before running it. Look for:

| What to Check | Why It Matters |
|---------------|----------------|
| **Logic errors** | AI may reverse conditions, use wrong units, or miss edge cases |
| **Unused imports/variables** | Clutter that can hide real issues |
| **Bad assumptions** | AI might guess your motor ports, CAN IDs, or constants |
| **Security issues** | Never let AI generate network tokens, API keys, or credentials |
| **Copyright** | AI can regurgitate licensed code. Do not push code from unknown sources |

### 2. Build First

```bash
./gradlew build
```

If it does not compile, do not simulate or deploy. Fix compilation errors first.

### 3. Simulate Before Deploy

Always run AI-generated code in the simulator before putting it on a real robot.

```bash
./gradlew simulateJava
```

The simulator catches:
- Null pointer exceptions
- Logic that works in theory but fails in practice
- Commands that never end or never start
- Subsystems that conflict with each other

**Never skip simulation.** A bug in simulation costs 5 minutes. The same bug on a competition field costs a match.

### 4. Deploy Only When Confident

Only deploy to a real robot after:
- Code compiles with zero errors and zero warnings
- Simulation runs without crashes
- You can explain every line the AI wrote

## When to Use AI

AI should only be used on **chore tasks** -- mechanical, repetitive work that does not affect how the robot behaves:

| Safe to Use AI | Do NOT Use AI For |
|----------------|-------------------|
| Renaming variables or methods | Writing drive train logic |
| Fixing imports and formatting | Tuning PID gains |
| Generating getters/setters | Creating safety logic (limit switches, current limits) |
| Adding Javadoc/comments | Writing autonomous routines |
| Refactoring to match team conventions | Designing command sequences |
| Converting units or constants | Calculating kinematics or odometry |

If the code affects how the robot moves, shoots, or drives, **you should write it yourself.** AI is a tool for chores, not for engineering decisions.

## Ethical Guidelines

### Do

- Use AI for chore tasks like refactoring, renaming, and formatting
- Use AI to learn new patterns and APIs
- Ask AI to explain code it wrote
- Treat AI as a tutor -- ask "why did you do it this way?"
- Credit AI tools in your documentation when appropriate
- Hold yourself to the same standard as handwritten code

### Do Not

- Use AI to write core robot logic (drive, intake, shooter, autonomous)
- Deploy code you do not understand
- Blindly trust AI output
- Use AI to bypass learning fundamentals
- Push unverified AI code to the shared repository
- Share proprietary team code with AI tools that train on your data

## Understanding AI-Generated Code

When OpenCode writes code, ask yourself these questions before accepting it:

```
- What does each method do?
- Why was this approach chosen over alternatives?
- What happens if a sensor fails or a value is null?
- Does this match the team's coding conventions?
- Would I write it this way?
```

If you cannot answer all five, ask OpenCode to explain:

```
Explain the code you just wrote. Walk through each method
and describe what it does and why.
```

## Real-World Consequences

FRC robots are 125-pound machines moving at high speed. Bad code can:

- Strip gears when a motor runs in the wrong direction
- Break mechanisms when limit switches are ignored
- Lose matches when autonomous fails unexpectedly
- Injure people if safety logic is missing

AI does not know your robot's physical limits. You do. Review accordingly.

## Quiz

1. What should you do before pushing AI-generated code?

- [ ] Deploy directly to the robot to test it
- [ ] Review, build, and simulate first
- [ ] Trust it because AI is smarter than you
- [ ] Only check if it compiles

<details><summary>Answer</summary>Review, build, and simulate first. Never push unverified code.</details>

2. What is the most important question to ask about AI-generated code?

- [ ] How fast did it write the code?
- [ ] Which model was used?
- [ ] Can I explain how this code works?
- [ ] Does it have comments?

<details><summary>Answer</summary>Can I explain how this code works? If you cannot explain it, do not push it.</details>

3. Why should you simulate before deploying to a real robot?

- [ ] Simulation is faster than deploying
- [ ] Simulation catches bugs safely without risking hardware or matches
- [ ] Simulation looks cool on a laptop
- [ ] The build server requires it

<details><summary>Answer</summary>Simulation catches bugs safely without risking hardware or matches. A bug in simulation costs minutes; on the field it costs a match.</details>
