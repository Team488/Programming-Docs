# Environment Setup

## Getting started

In this first challenge you'll get your own copy of the XbotEdu code, download it to your computer, and open it in IntelliJ so you're ready to start writing robot code.

### Onboarding

If you just want to do the curriculum, follow the instructions in [Edu Onboarding](/curriculum/getting-started/onboarding).

Or if you need to set up for in-season robot programming, follow the instructions in [Full Programming Onboarding](/curriculum/getting-started/in-season-onboarding) instead. It covers everything in Edu Onboarding plus a few extra tools.

**Important:** Don't continue until onboarding is complete. Missing tools cause confusing errors in the steps below.

### Fork the XbotEdu repository
A 'fork' is a personal copy of a code repository on GitHub. Forking a repository allows you to freely experiment with changes without affecting the original project. [More background on forking](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

1. In the browser, make sure you're signed in to GitHub, then navigate to [Team488/XbotEdu](https://github.com/Team488/XbotEdu)
1. Click the **Fork** button in the upper right corner. (If a banner is covering it, close the banner first.)
1. On the "Create a new fork" page, make sure **Owner** is set to your own GitHub account, then click **Create fork**.

When it finishes, you'll be looking at `github.com/<your-username>/XbotEdu`, which is your fork.

### Sync the repository locally

"Cloning" downloads a copy of a repository from GitHub onto your computer so you can work on it.

1. Follow [Use GitHub Desktop to clone](/curriculum/getting-started/clone-with-github-desktop) to clone **your fork** (`<your-username>/XbotEdu`, not `Team488/XbotEdu`).
1. If GitHub Desktop asks **"How are you planning to use this fork?"**, choose **For my own purposes**. Later in the curriculum you'll open pull requests against your own fork.

**Warning: don't clone inside of a OneDrive folder.** OneDrive tries to sync the thousands of files the build creates, which causes slow builds and strange file-locking errors. On many Windows computers the `Documents` folder is inside OneDrive, so check the **Local path** in the clone dialog. If it contains `OneDrive`, change it to something like `C:\Users\<you>\GitHub`.

### Open the Edu projects in IntelliJ

1. Open the application **IntelliJ IDEA** (it may be listed as "IntelliJ IDEA Community Edition"), which you installed during the onboarding steps.
1. Click **Open** from the **Projects** tab.
1. Navigate to the XbotEdu folder you just cloned and open it.
1. If prompted, open the project as a **Gradle** project, not an Eclipse project.
1. If prompted, **Trust** the project.
1. The project will automatically start building. You can watch its progress in the status bar at the bottom of the window.

IntelliJ requires some additional configuration after you load a project for the first time. You need to tell it to use the Java version (JDK) that came with WPILib.

Open the main menu and choose **Project Structure...**

<img width="416" alt="Main menu" src="https://github.com/user-attachments/assets/a324e688-b384-40e1-b46a-9555e84e421e" />

<img width="717" alt="Project settings menu item" src="https://github.com/user-attachments/assets/782ef074-b50c-49e1-8411-b194f76f5d70" />

On the **Project** tab, set **SDK** to "temurin-17". If it's not present, you may need to select "Add JDK from disk..." and find the JDK that you installed with WPILib, which is located at `C:\Users\Public\wpilib\<year>\jdk` (for example, `C:\Users\Public\wpilib\2026\jdk`).

<img width="1862" alt="Select SDK" src="https://github.com/user-attachments/assets/078485d5-28e2-4549-9a1d-fdeb771fa2da" />

Go to the **SDKs** tab and select the same JDK (in this case, "temurin-17") and verify that the paths all start with `C:\Users\Public\wpilib\<year>\jdk`.

<img width="1842" alt="Verify correct SDK" src="https://github.com/user-attachments/assets/c3e24666-8a06-4e25-ac8c-1a5e050bc30b" />

Click **OK**.

Open the main menu again and choose **Settings...**

<img width="711" alt="Settings menu item" src="https://github.com/user-attachments/assets/37014dde-5c29-4ab0-b24e-3227b638017b" />

Navigate to "Build, Execution, Deployment" -> "Build Tools" -> "Gradle" in the menu on the left. In the "Gradle JVM" field, select "Project SDK", and then click **OK**.

<img width="1982" alt="Gradle Project SDK" src="https://github.com/user-attachments/assets/8fa6ca6d-ab1b-4f8c-b197-845ea0da7614" />

**Tip:** If IntelliJ shows build or Gradle errors after these steps, try reloading the project from the **Gradle** tool window (the elephant icon on the right side) using the **Reload All Gradle Projects** button. If errors persist, ask a mentor or teammate for help. That's what we're here for!

## Next Steps

Continue with the next lesson: [Java Basics](/curriculum/getting-started/java-basics)
