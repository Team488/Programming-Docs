# Core Programming

Advanced patterns used by XBot to build robust, testable robot code.

You should complete the [Curriculum](/curriculum/) before starting these modules. They build on the basics you learned there.

## Modules

| Module | What You Will Learn | Time |
|--------|-------------------|------|
| [Dependency Injection](patterns/dependency-injection) | How Dagger wires everything together automatically | 30 min |
| [Providers & Factories](patterns/providers-factories) | Creating objects with runtime parameters | 20 min |
| [Command-Based Programming](patterns/command-based) | WPILib's command framework | 30 min |
| [Maintainers](patterns/maintainers) | Continuous PID maintenance with human override | 25 min |
| [Swerve Drive](patterns/swerve-drive) | Holonomic driving with independent wheel control | 40 min |
| [Properties & Tuning](patterns/properties-tuning) | Runtime-tunable values for quick iteration | 15 min |

## Why These Patterns Matter

These patterns solve real problems that come up when writing robot code:

- **Dependency Injection** keeps your code testable (swap real hardware for mocks)
- **Factories** let you create objects with values only known at runtime
- **Maintainers** handle the transition between human and automatic control
- **Properties** let you tune values without rebuilding code

Each module links to the actual XBot source code so you can see how the patterns are used in competition robot code.
