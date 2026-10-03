# Onboarding

Welcome to Team 488 XBOT's programming discipline! This document will guide you through setting up the accounts and software you'll need to complete the XbotEdu curriculum.

> [!NOTE]
> This document describes only the tools you'll need to complete the XbotEdu curriculum. **If you are a programming student during competition season, you'll need to set up a few additional accounts and tools.** Please see the [in-season Programming Onboarding](/curriculum/getting-started/in-season-onboarding) for more instructions.

> [!IMPORTANT]
> **Please don't skip any steps** during this onboarding process. Doing so always results in pain down the road as we try to figure out which steps you did or didn't do!

If you run into any problems when setting up these items, don't hesitate to reach out to other people on the programming team. We're here to help!

## Account setup

Follow the instructions below to get accounts for the following services.

### Team laptop

If you are using a team laptop, **create your own user account on the laptop**. To do this, log in as the XBOT account, and use that to make your own account. Don't use the XBOT account for programming work, otherwise it's difficult for the next person to use the shared laptop.

### GitHub

We store all our code using version control software called Git. A central copy of each code project is hosted on a service called GitHub, to make it easier to coordinate and collaborate with the rest of the programming team. If you aren't familiar with the terms "source control" or "Git", read [Git Introduction](/curriculum/getting-started/git-introduction) and then ask a mentor if you have further questions.

1.  If you don't already have a GitHub account, [sign up](https://github.com/signup) for one.
2.  Ask a programming mentor to add your GitHub account to the [Team 488 organization](https://github.com/Team488) on GitHub.
3.  GitHub will send by email an invitation to join the GitHub organization. You have to click the link in this email to join the Team488 organization and get increased access to the team's code and other resources on GitHub.

### Slack

Slack is a chat tool that XBOT Robotics uses organization-wide as the primary team communication tool. You should already have an account in the [XBOT Slack workspace](https://xbot.slack.com/), and should check and read messages regularly. If you don't have an account, let a mentor know ASAP and they will send an invite to an email address you provide.

Once Slack is set up on your devices, make sure you join the [\#programming](https://xbot.slack.com/archives/C03CS03M6) channel for programming discipline-specific discussions and announcements.

## Software installation

> [!IMPORTANT]
> If you are using a shared team laptop, it's possible that some or all of this software has already been set up. Before installing each piece of software below, check if it's already installed by searching for associated apps:
> * **GitHub Desktop:** search for the app. If it's already installed, open it and make sure it's logged in to your GitHub account
> * **WPILib:** search "AdvantageScope" and look for a version with the current year (e.g. `AdvantageScope (WPILib) 2026`)
> * **IntelliJ:** search "IntelliJ", and if it is installed, continue from step 4 in the IntelliJ section below to check that the necessary plugins are set up
> If you're unsure, please ask for help.

> [!WARNING]
> If you're using a shared team laptop, make sure you're logged into your own account on the laptop, not the "XBOT" account.

### GitHub Desktop

1.  Download GitHub Desktop from the [download page](https://desktop.github.com/download/).
2.  Run the installer. It shouldn't ask any questions. It will open GitHub Desktop when it's done.
3.  Click "Sign in to GitHub.com" and sign in with your account.

### WPILib

> [!TIP]
> It is easy to miss a step here, read the instructions carefully!

> [!NOTE]
> We write our robot code in IntelliJ, so why install WPILib? The WPILib installer delivers the FRC toolchain and the Java JDK (at `C:\Users\Public\wpilib\<year>\jdk`), which you'll point IntelliJ at in the next step of the curriculum. You need it even though you'll be working in IntelliJ.

Go here: <https://docs.wpilib.org/en/latest/docs/getting-started/getting-started-frc-control-system/wpilib-setup.html>

1.  Follow the **WPILib Installation Guide** steps.
2.  The guide sends you to the [WPILib releases page on GitHub](https://github.com/wpilibsuite/allwpilib/releases) to download the installer. Scroll down to the "Assets" section of the newest release and choose the installer for your operating system, then continue following the guide.
3.  Download and run the WPILibInstaller, it will prompt you to select All Users or Current User, select either.
4.  There will be checkboxes signaling whether or not you have the required files. If greyed out and checked it means it is installed, otherwise the installer will install what you need.
5.  The installer offers to download VS Code. We use IntelliJ for this curriculum, so you don't need it - but installing it does no harm if you'd rather have it available.
6.  After you press "Execute Install" the Install should take about 5 minutes.

### Installing and Configuring IntelliJ

1.  Check the [FRC plugin version page](https://plugins.jetbrains.com/plugin/9405-frc/versions) to find the most recent compatible version of IntelliJ. The FRC plugin is useful, but sometimes lags behind the latest version of IntelliJ. Once you find the most recent supported IntelliJ version number, take note of it so you know what version to download in the next step.
2.  Go to the [IntelliJ versions page](https://www.jetbrains.com/idea/download/other/) to download the correct version of the IntelliJ installer. Make sure you select "Community Edition" if given the option. There may be multiple download formats available; on Windows, use the `.exe` installer unless you have a reason not to.
3.  Run the installer. The default settings in the installer should work fine.
4.  Launch the IntelliJ app (it may be listed as "IntelliJ Community").
5.  Find the plugins tab and install the following plugins:
    *  [FRC](https://plugins.jetbrains.com/plugin/9405-frc)
    *  [CheckStyle-IDEA](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea)
    *  [VSCode Keymap](https://plugins.jetbrains.com/plugin/12062-vscode-keymap) (optional, but recommended).
6.  Restart IntelliJ to load the new plugins.
7.  From the Welcome screen, on the Projects tab, find the link "Configure FRC Team Number". Enter 488 in the dialog box and save the team number.
8.  From the Welcome screen, on the Customize tab, select VSCode under Keymap (optional, but recommended).

## Done!

Now you should have everything set up to complete the XbotEdu curriculum. Enjoy!

Head back to [Setting up your environment](/curriculum/getting-started/environment-setup) to fork the code and open it in IntelliJ.

> [!WARNING]
> Remember, **if you are a programming student during competition season, you'll need to set up a few additional accounts and tools.** Please see the [in-season Programming Onboarding](/curriculum/getting-started/in-season-onboarding) for more instructions.
