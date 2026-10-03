# Robot Coordinate Conventions

What is "forward?" Is it north?  Towards the front face of the robot? Towards the red end of the field? The blue? How does rotation fit into all of this?

We have questions like this constantly when programming the robot, and so we've created a convention that we can all agree on - meaning when the Robot Positioning System needs to talk to the Robot Motion system, they both agree about where "+1 foot distance" will take them.

Here are the simple rules:
- There are two reference frames: Robot and Field
- Robot
  - From the center of mass towards the front of the robot is Positive Y
  - From the center of mass towards the right of the robot is Positive X
  - When the robot rotates left, that is Positive Yaw
  - When the front of the robot is higher than the back of the robot (like a wheelie), that is Positive Pitch
  - When the right side of the robot is higher than the left side of the robot, that is Positive Roll
- Field
  - From our player station towards the opposing player station is Positive Y
  - From the left side of our player station towards the right side of our player station is Positive X
  - When anything rotates left, that is Positive Yaw
  - (Pitch and Roll are not currently accounted for)
