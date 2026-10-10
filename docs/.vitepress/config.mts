import { defineConfig } from 'vitepress'

const coreProgrammingSidebar = [
  {
    text: 'Core Programming',
    items: [
      { text: 'Overview', link: '/core-programming/' },
    ],
  },
  {
    text: 'Patterns',
    items: [
      { text: 'Dependency Injection', link: '/core-programming/patterns/dependency-injection' },
      { text: 'Providers & Factories', link: '/core-programming/patterns/providers-factories' },
      { text: 'Command-Based Programming', link: '/core-programming/patterns/command-based' },
      { text: 'Maintainers', link: '/core-programming/patterns/maintainers' },
      { text: 'Swerve Drive', link: '/core-programming/patterns/swerve-drive' },
      { text: 'Properties & Tuning', link: '/core-programming/patterns/properties-tuning' },
    ],
  },
  {
    text: 'Examples',
    items: [
      { text: 'Overview', link: '/core-programming/example/' },
      { text: 'Elevator Logic', link: '/core-programming/example/elevator-logic' },
      { text: 'Swerve Drive Command', link: '/core-programming/example/swerve-drive-command' },
      { text: 'Simple Motor Subsystem', link: '/core-programming/example/simple-motor' },
      { text: 'Maintainer Pattern', link: '/core-programming/example/maintainer-pattern' },
    ],
  },
]

export default defineConfig({
  base: '/Programming-Docs/',
  title: 'XBot Programming',
  description: 'FRC Programming Documentation for Team 488',
  themeConfig: {
    logo: { src: '/xbot-logo.png', width: 24, height: 24 },
    nav: [
      { text: 'Curriculum', link: '/curriculum/' },
      { text: 'Core Programming', link: '/core-programming/' },
      { text: 'Tooling', link: '/tooling/' },
      { text: 'Vision', link: '/vision/' },
    ],
    sidebar: {
      '/curriculum/': [
        {
          text: 'Setup',
          items: [
            { text: 'Overview', link: '/curriculum/' },
            { text: 'Onboarding', link: '/curriculum/getting-started/onboarding' },
            { text: 'Environment Setup', link: '/curriculum/getting-started/environment-setup' },
            { text: 'Java Basics', link: '/curriculum/getting-started/java-basics' },
            { text: 'In-Season Onboarding', link: '/curriculum/getting-started/in-season-onboarding' },
          ],
        },
        {
          text: 'Java Track (optional depth)',
          items: [
            { text: 'Object-Oriented Programming', link: '/curriculum/getting-started/oop-concepts' },
            { text: 'Intermediate Java', link: '/curriculum/getting-started/intermediate-java' },
          ],
        },
        {
          text: 'Challenges',
          items: [
            { text: 'Basic Robot Principles', link: '/curriculum/challenges/basic-robot-principles' },
            { text: 'Tank Drive', link: '/curriculum/challenges/tank-drive' },
            { text: 'Altering Tank Drive', link: '/curriculum/challenges/altering-tank-drive' },
            { text: 'Moving to a Target Position', link: '/curriculum/challenges/moving-to-a-target-position' },
            { text: 'Making a Pull Request', link: '/curriculum/challenges/making-a-pull-request' },
            { text: 'Rotating to a Target Orientation', link: '/curriculum/challenges/rotating-to-a-target-orientation' },
            { text: 'Command Groups', link: '/curriculum/challenges/command-groups' },
            { text: 'Providers & Factories', link: '/core-programming/patterns/providers-factories' },
            { text: 'Dependency Injection', link: '/core-programming/patterns/dependency-injection' },
            { text: 'Upgrading Using the SeriouslyCommonLib', link: '/curriculum/challenges/upgrading-using-seriouslycommonlib' },
            { text: 'Running on a Real Robot', link: '/curriculum/challenges/running-on-a-real-robot' },
            { text: 'Auto-stopping Collector', link: '/curriculum/challenges/auto-stopping-collector' },
            { text: 'Advanced Swerve Challenges', link: '/curriculum/challenges/advanced-swerve-challenges' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Running the Simulator', link: '/curriculum/robot-fundamentals/simulator' },
            { text: 'Robot Architecture', link: '/curriculum/robot-fundamentals/robot-architecture' },
            { text: 'Robot Coordinate Conventions', link: '/curriculum/robot-fundamentals/coordinate-conventions' },
            { text: 'Mapping Buttons to Commands', link: '/curriculum/robot-fundamentals/operator-command-map' },
            { text: 'Git Introduction', link: '/curriculum/getting-started/git-introduction' },
            { text: 'Clone with GitHub Desktop', link: '/curriculum/getting-started/clone-with-github-desktop' },
          ],
        },
        {
          text: 'AI Tools',
          items: [
            { text: 'AI Tools Setup', link: '/curriculum/ai-tools/ai-tools-setup' },
            { text: 'Built-in Commands', link: '/curriculum/ai-tools/ai-tools-commands' },
            { text: 'Workflow Tips', link: '/curriculum/ai-tools/ai-tools-workflow' },
            { text: 'Responsible AI Use', link: '/curriculum/ai-tools/responsible-ai' },
          ],
        },
      ],
      '/core-programming/': coreProgrammingSidebar,
      '/tooling/': [
        {
          text: 'Tools & Setup',
          items: [
            { text: 'Overview', link: '/tooling/' },
            { text: 'WPILib Overview', link: '/tooling/wpilib-overview' },
            { text: 'PathPlanner', link: '/tooling/pathplanner' },
            { text: 'Phoenix Tuner', link: '/tooling/phoenix-tuner' },
            { text: 'IntelliJ Idea', link: '/tooling/intellij' },
            { text: 'VSCode Keybinds', link: '/tooling/vscode-keybinds' },
            { text: 'Maplesim', link: '/tooling/maplesim' },
            { text: 'Gradle Commands', link: '/tooling/gradle-commands' },
            { text: 'AdvantageScope', link: '/tooling/advantagescope' },
            { text: 'QDriverStation', link: '/tooling/qdriverstation' },
            { text: 'Elastic', link: '/tooling/elastic' },
            { text: 'Debugging Swerve Drive', link: '/tooling/swerve-debugging' },
            { text: 'Updating SeriouslyCommonLib', link: '/tooling/update-seriouslycommonlib' },
          ],
        },
      ],
      '/vision/': [
        {
          text: 'Vision Programming',
          items: [
            { text: 'Overview', link: '/vision/' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Team488/Programming-Docs' },
    ],
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/Team488/Programming-Docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Built for XBot Robotics Team 488',
      copyright: 'FRC FIRST Robotics',
    },
  },
})
