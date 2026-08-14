# IntelliJ IDEA Docs
Configure and optimize your JetBrains integrated development environment (IDE).

## What Is IntelliJ IDEA?
IntelliJ IDEA is JetBrains' flagship IDE tailored for Java, Kotlin, Scala, and multi-language enterprise development. It features advanced code intelligence, built-in version control integration, and automated refactoring.

## Installation
Download from the [JetBrains website](https://www.jetbrains.com/idea/download/). Available for Windows, macOS, and Linux in both Community (free) and Ultimate (subscription) editions.

## Features

| Feature | Description |
| :--- | :--- |
| **Smart Code Completion** | Context-aware suggestions that understand expression types and data flow |
| **Advanced Refactoring** | Safely rename, extract, or move code elements across the entire codebase |
| **Built-in Profiler** | Analyze CPU, memory allocations, and CPU snapshots in real-time |
| **Database Tools** | Query, visualize, and manage SQL/NoSQL databases directly inside the IDE |
| **Version Control** | Unified UI for Git, GitHub, GitLab, and Mercurial without external clients |
| **Run Configurations** | Set up environment variables, VM options, and launch profiles for local/remote targets |

## Workflow

1. Open IntelliJ IDEA and import/clone your project directory
2. Wait for indexing to complete (enables advanced code intelligence)
3. Write code utilizing context actions (**Alt+Enter** / **Option+Return**) for quick fixes
4. Set breakpoints in the gutter and launch the application in Debug mode
5. **Commit and push changes** via the Git tool window (Ctrl+K / Cmd+K)

## When to Use IntelliJ IDEA

| Task | Use IntelliJ IDEA? |
| :--- | :--- |
| Enterprise Java/Kotlin development | Yes (Industry standard for Spring, Jakarta, and Android) |
| Large-scale codebase refactoring | Yes (Extremely accurate and safe global changes) |
| Quick single-file script editing | Yes (But VS Code or Vim might boot faster) |
| Cross-language cloud deployments | Yes (Ultimate edition natively handles Docker, K8s, and JS/TS) |
| Embedded micro-controller C programming | No (Use CLion or a specialized embedded IDE) |
| Running localized unit tests | Yes (Supports JUnit, TestNG, and seamless coverage reporting) |

## Project Module Setup
For each isolated sub-module or microservice:

1. Right-click the root directory and select `New > Module`
2. Select your build framework (Maven, Gradle, or native IntelliJ Project Structure)
3. Assign the correct **Project SDK (JDK version)** under Project Structure (`Ctrl+Alt+Shift+S` / `Cmd+;`)
4. Sync the build system tool window to download external dependencies

This ensures that the IDE indexes library sources correctly and resolves compilation dependencies.

## Troubleshooting

| Issue | Fix |
| :--- | :--- |
| High memory usage / UI lag | Increase max heap size via `Help > Change Memory Settings` |
| Unresolved symbols or code redlines | Run `File > Invalidate Caches...` and restart the IDE |
| Run configuration fails to build | Check your Gradle/Maven home path and verify the correct Project JDK is selected |