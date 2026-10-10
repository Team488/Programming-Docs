# Commmon Gotchas for Vision Pose/Subsystem

# Checklist

Full checklist for comp can potentially found here (2026):
https://docs.google.com/document/d/1yYC1oNBMamkWhqhyTJ1bEonhX55zIQ9615-wwTuGw9g/edit?usp=sharing

Shorter checklist

1. Make sure all OrangePis are connected

This can typically be done by visiting the website for each orangepi.
http://10.4.88.9:5800

We then increment by 1 for each additional orange pi (10.4.88.10 would be the next orange pi).

Confirming devices are turned on (power is available), and network connection is live (blinking lights on the network cable lights), and restarting the orange pis are quick ways to try to recover the device.

2. Make sure your field layout matches the field (PhotonVision and NetworkTable Preference)

Competitions tend to use welded, but practice fields likely use Andymark.

On each orange pi update the layout:
https://docs.photonvision.org/en/latest/docs/apriltag-pipelines/multitag.html#updating-the-field-layout

Field layouts can be found here:
https://github.com/wpilibsuite/allwpilib/tree/main/fields/src/main/native/resources/org/wpilib/fields/frc

Set the preference in Advantage Scope for AprilTagFieldLayout:
2026_welded or 2026_andymark

3. Exposure and Brightness settings for each camera

Point each camera to an April Tag and have the lowest exposure setting and boost the brightness and gain to have the april tag with the least amount of flicker.

See https://docs.photonvision.org/en/latest/docs/pipelines/input.html#exposure-and-brightness for more information.

4. Clean the camera lenses
