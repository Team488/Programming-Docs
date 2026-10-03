# Upgrading Using the SeriouslyCommonLib

Over the years, robots have had to do certain tasks over and over, such as driving to a target point, or rotating to a specific angle. Rather than rewrite all that code from scratch (as you just did as a learning experience), we have taken the bits of code we used most often and saved them in the SeriouslyCommonLib: a library of useful code gathered from the work of students on the team over many years.

The API documentation is hosted at [team488.github.io/SeriouslyCommonLib](https://team488.github.io/SeriouslyCommonLib/).

You don't need to download SCL yourself - Gradle pulls it into XbotEdu automatically, which is why you can already use classes like `XCANMotorController` and `BaseCommand`. You can browse the source at [Team488/SeriouslyCommonLib](https://github.com/Team488/SeriouslyCommonLib).

Now, let's go back over our previous solutions, and upgrade them to using the SCL (SeriouslyCommonLib). Work through these two in order:

1. [PID for Target Position](/curriculum/challenges/pid-for-target-position)
1. [PID and Heading for Target Orientation](/curriculum/challenges/pid-and-heading-for-target-orientation)
