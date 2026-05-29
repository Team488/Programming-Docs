# Environment Setup

Get your computer ready for FRC programming. No experience needed.

## What You Will Install

| Software | What It Does |
|----------|-------------|
| **Java 17** | The language your robot code is written in |
| **VSCode + WPILib** | The editor where you write code |
| **Git & GitHub Desktop** | Tracks changes to your code and shares it with the team |

## Install Java 17

Java is the programming language you will use to control the robot. Think of it like a translator between your brain and the robot -- you write instructions in Java, and the computer turns them into commands the robot understands.

### Windows / macOS
1. Go to [Adoptium](https://adoptium.net/)
2. Download **Java 17 (LTS)** for your operating system
3. Run the installer and follow the prompts

### Linux
```bash
# Ubuntu/Debian
sudo apt install openjdk-17-jdk

# Verify it worked
java -version
# Should show: openjdk version "17.x.x"
```

<details>
<summary><strong>What is Java and why Java 17 specifically?</strong></summary>

Java is one of the most popular programming languages in the world. It is used for everything from Android apps to bank systems to robot code. FRC uses Java because it runs on the roboRIO (the robot's computer) and WPILib (the FRC library) is written for it.

**Why version 17?** WPILib is built specifically for Java 17, which is a Long Term Support (LTS) release. This means it will receive updates for many years. Newer versions of Java exist, but WPILib has not been updated to use them yet. Older versions are missing features WPILib needs.

**If you already have a different Java version:** You can install Java 17 alongside it. Your robot project will use Java 17 even if your computer has other versions installed.

</details>

## Install VSCode + WPILib

VSCode is the editor where you will write all your robot code. WPILib is the FRC toolkit that adds all the robot-specific features to VSCode.

### Download WPILib
1. Go to [WPILib GitHub Releases](https://github.com/wpilibsuite/allwpilib/releases)
2. Download the installer for your OS

### Windows
1. Run the `.exe` installer
2. Select **"Install VSCode + WPILib"**
3. Follow the prompts

### macOS
1. Open the `.dmg` file
2. Drag VSCode to Applications
3. If blocked: go to **System Settings > Privacy & Security** and click **"Open Anyway"**

### Linux
1. Extract the `.zip` installer
2. Run: `sudo ./Install-WPILib.sh`

<details>
<summary><strong>What is WPILib?</strong></summary>

WPILib (WPI Library) is the official FRC software library made by Worcester Polytechnic Institute. It provides all the building blocks for robot control: motor control, sensors, communication, and the command-based framework.

**Analogy:** If building a robot program were building a house, WPILib would be the pre-made doors, windows, and plumbing. You could make everything from scratch, but the basics are already provided.

**What WPILib gives you:**
- Motor controller libraries (SparkMax, TalonFX)
- Sensor libraries (gyros, encoders, cameras)
- Command-based programming framework
- Robot simulation (test without a real robot)
- Dashboard tools (SmartDashboard, Shuffleboard)

</details>

<details>
<summary><strong>Why VSCode and not another editor?</strong></summary>

WPILib only works with VSCode because the WPILib extension integrates deeply with it. You cannot use IntelliJ, Eclipse, or any other editor for FRC development.

**Why VSCode is good:**
- Free on all operating systems
- WPILib extension provides one-click build, deploy, and test
- IntelliSense (autocomplete) for Java
- Built-in terminal and Git support
- Huge library of extensions

</details>

## Install Git & GitHub Desktop

Git tracks changes to your code (like a save button that remembers every version). GitHub Desktop gives you a visual way to use Git without typing commands.

### Install Git
- **Windows:** Download from [git-scm.com](https://git-scm.com/) and run the installer
- **macOS:** Run `git --version` in Terminal (it will prompt you to install if needed)
- **Linux:** `sudo apt install git`

### Install GitHub Desktop
1. Go to [desktop.github.com](https://desktop.github.com/)
2. Download and install for your OS
3. Sign in with your GitHub account (create one at github.com if you do not have one)

<details>
<summary><strong>What is the difference between Git and GitHub Desktop?</strong></summary>

**Git** is the engine that tracks changes. It runs in the background on your computer.

**GitHub Desktop** is a visual app that lets you use Git by clicking buttons instead of typing commands.

**Think of it like driving a car:**
- Git = the engine and transmission (does the actual work)
- GitHub Desktop = the steering wheel and pedals (lets you control it easily)

Both control the same thing -- GitHub Desktop just gives you buttons and menus instead of commands you have to memorize.

</details>

## Install OpenCode (AI Coding Assistant)

OpenCode is an AI coding assistant that helps you write, understand, and debug robot code. It runs in your terminal.

### Install OpenCode

```bash
curl -fsSL https://opencode.ai/install | bash
```

Or using a package manager:

```bash
# npm
npm install -g opencode-ai

# macOS (Homebrew)
brew install anomalyco/tap/opencode

# Arch Linux
sudo pacman -S opencode

# Windows (Chocolatey)
choco install opencode
```

### Windows Users

For the best experience, use [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install). OpenCode works best in a Unix-like environment.

You will learn how to configure and use OpenCode in Module 12.

## Verify Everything Works

1. Open VSCode
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette
3. Type **"WPILib"** -- you should see WPILib commands appear

## Clone XbotEdu (Your Practice Project)

XbotEdu is a practice robot project with built-in tests. You can write and test robot code without owning a physical robot.

### Using GitHub Desktop (recommended for beginners)
1. Open GitHub Desktop
2. Click **File > Clone Repository**
3. Go to the **URL** tab
4. Enter: `https://github.com/Team488/XbotEdu.git`
5. Choose where to save it on your computer
6. Click **Clone**

### Using the command line (alternative)
```bash
git clone https://github.com/Team488/XbotEdu.git
cd XbotEdu
```

## Build and Test

Once you have the project open in VSCode:

1. Open the terminal in VSCode: **Terminal > New Terminal**
2. Build the project:
   ```bash
   # Windows
   gradlew.bat build
   
   # macOS / Linux
   ./gradlew build
   ```
3. Run the tests:
   ```bash
   # Windows
   gradlew.bat test
   
   # macOS / Linux
   ./gradlew test
   ```

You should see **BUILD SUCCESSFUL** in the output.

<details>
<summary><strong>What does "build" actually do?</strong></summary>

Building is the process of turning your Java code into something the robot can run. When you run `./gradlew build`, this happens:

1. **Download dependencies** -- Gradle downloads all the libraries your code needs
2. **Compile** -- Your `.java` files are turned into `.class` files (bytecode)
3. **Test** -- Any unit tests are run to check for bugs
4. **Package** -- Everything is bundled into a deployable format

**The first build is slowest** because it downloads dependencies. Subsequent builds are much faster.

</details>

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `./gradlew: Permission denied` | Run `chmod +x gradlew` (macOS/Linux) |
| `Java version error` | Install Java 17 from [Adoptium](https://adoptium.net/) |
| VSCode does not show WPILib | Reinstall the WPILib extension from the marketplace |
| Build fails on first run | Wait for dependencies to download, then try again |
| GitHub Desktop cannot find repo | Make sure you typed the URL exactly right |
| "command not found" for git | Restart your terminal after installing Git |

## Learning Java Resources

You will learn Java in the next module, but here are excellent free resources to bookmark:

| Resource | What It Teaches | Best For |
|----------|----------------|----------|
| [Codecademy Learn Java](https://www.codecademy.com/learn/learn-java) | Interactive coding exercises | Complete beginners |
| [W3Schools Java Tutorial](https://www.w3schools.com/java/) | Quick reference with examples | Looking things up |
| [freeCodeCamp Java Course](https://www.youtube.com/watch?v=A74TOX803D0) | 4-hour video course | Visual learners |
| [Java for Complete Beginners](https://www.udemy.com/course/java-tutorial/) | Free Udemy course | Step-by-step learners |
| [Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/) | Official Java documentation | Reference when you get stuck |

---

## Quiz

**Q1:** Why does FRC use Java 17 specifically?

- [ ] A) It is the newest Java version
- [ ] B) WPILib is built for Java 17
- [ ] C) Java 17 is the only free version
- [ ] D) FRC does not use Java at all

<details>
<summary>Answer</summary>

**B) WPILib is built for Java 17**

WPILib targets Java 17 because it is a Long Term Support (LTS) release. Newer versions exist but WPILib has not been updated to use them yet.

</details>

**Q2:** What is the difference between Git and GitHub Desktop?

- [ ] A) They are the same thing
- [ ] B) Git is the engine, GitHub Desktop is a visual app to control it
- [ ] C) GitHub Desktop is only for Windows
- [ ] D) Git only works with GitHub Desktop

<details>
<summary>Answer</summary>

**B) Git is the engine, GitHub Desktop is a visual app to control it**

Git runs in the background and handles version control. GitHub Desktop gives you a visual interface with buttons and menus so you do not need to memorize commands.

</details>

**Q3:** What command runs the tests in XbotEdu?

- [ ] A) `./gradlew build`
- [ ] B) `./gradlew test`
- [ ] C) `./gradlew run`
- [ ] D) `./gradlew compile`

<details>
<summary>Answer</summary>

**B) `./gradlew test`**

The `test` command runs all unit tests in the project. `build` compiles everything (and also runs tests), but `test` specifically focuses on running the tests.

</details>
