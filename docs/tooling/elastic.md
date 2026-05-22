# Elastic

Competition dashboard for viewing robot data.

## What Is Elastic?

Elastic is a drag-and-drop dashboard by Team 353, designed for competition use. It connects to the robot via NetworkTables to display live data and camera streams.

## Launching Elastic

In VSCode, press Ctrl+Shift+P, select **WPILib: Start Tool**, then choose **Elastic**.

## Capabilities

| Feature | Description |
|---------|-------------|
| NT4 topics | View any NetworkTables value as a widget |
| Drag-and-drop cards | Arrange widgets freely on the dashboard |
| Color schemes | 20+ built-in themes |
| Camera streams | Auto-deactivate when not in use to save bandwidth |
| Auto IP | Retrieves robot IP from FRC Driver Station |

## Widgets

Common widgets to add to your dashboard:

- **Field** - Robot pose and trajectory visualization
- **Match Time** - Remaining match time from FMS
- **Swerve** - Module states and odometry
- **Mechanism** - 2D mechanism visualization
- **Number Bar** - Numeric telemetry (velocity, current, etc.)
- **Boolean** - Status indicators (note acquired, ready to shoot)

## Configuration

Elastic layout and widget settings persist between sessions. Layout files are stored on the dashboard computer, not the roboRIO.

## Detailed Docs

Full documentation: [Elastic GitBook](https://frc-elastic.gitbook.io/docs)
