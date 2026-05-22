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
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/curriculum/' },
            { text: 'Environment Setup', link: '/curriculum/environment-setup' },
            { text: 'Java Basics', link: '/curriculum/java-basics' },
            { text: 'Object-Oriented Programming', link: '/curriculum/oop-concepts' },
            { text: 'Intermediate Java', link: '/curriculum/intermediate-java' },
            { text: 'Git & GitHub Desktop', link: '/curriculum/git-github' },
          ],
        },
        {
          text: 'Robot Fundamentals',
          items: [
            { text: 'Robot Architecture', link: '/curriculum/robot-architecture' },
            { text: 'Electrical Contract', link: '/curriculum/electrical-contract' },
            { text: 'Motor Control', link: '/curriculum/motor-control' },
            { text: 'PID Logic', link: '/curriculum/pid-logic' },
            { text: 'Command-Based Programming', link: '/curriculum/command-based' },
            { text: 'Operator Command Map', link: '/curriculum/operator-command-map' },
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
            { text: 'VSCode Keybinds', link: '/tooling/vscode-keybinds' },
            { text: 'Gradle Commands', link: '/tooling/gradle-commands' },
            { text: 'AdvantageScope', link: '/tooling/advantagescope' },
            { text: 'QDriverStation', link: '/tooling/qdriverstation' },
            { text: 'Elastic', link: '/tooling/elastic' },
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
