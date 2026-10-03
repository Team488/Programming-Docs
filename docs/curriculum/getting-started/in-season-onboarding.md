# In-Season Onboarding

Extra setup for programming students working on the competition robot during the season.

::: tip Start with the regular onboarding
This page covers **only what is different** for in-season work. Do [Onboarding](/curriculum/getting-started/onboarding) first -- accounts, GitHub Desktop, WPILib and IntelliJ are all set up there and are not repeated here.
:::

Everything below is about talking to real hardware, which is the part the curriculum never needs.

## FRC Game Tools

The Game Tools include the **FRC Driver Station**, the program that enables and disables the robot. You cannot drive a real robot without it.

::: warning Windows only
The FRC Game Tools do not run on macOS. If you are on a Mac, install [QDriverStation](/tooling/qdriverstation) instead -- it is a third-party replacement for the Driver Station.
:::

Follow WPILib's [FRC Game Tools installation guide](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/frc-game-tools.html), plus two notes:

- It is recommended to uninstall any previous FRC-related files first, as the guide describes.
- The installer prompts you to log in. Create a National Instruments account, and set Organization to `team488`.
- Install updates when the NI app prompts you.

## Device programming tools

These configure motor controllers and similar devices. Not everyone needs them, but they are useful when bringing up a brand new robot.

| Tool | Install |
|------|---------|
| REV Hardware Client | [REV Hardware Client 2 instructions](https://docs.revrobotics.com/rev-hardware-client-2) |
| Phoenix Tuner X | [Microsoft Store](https://apps.microsoft.com/detail/9nvv4pwdw27z?hl=en-US&gl=US) -- see [Phoenix Tuner](/tooling/phoenix-tuner) |

## Next steps

With the robot tooling installed, the [Running on a Real Robot](/curriculum/challenges/running-on-a-real-robot) challenge walks through deploying code to a RoboRIO and enabling it safely.
