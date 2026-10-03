# Git Introduction

## Source Control
In a nutshell:
- It's really useful to save your code somewhere that isn't just on your local computer, in case your computer dies
- If all your code is somewhere where everybody can reach it, that means everybody can work on it together
- If you keep backups of what your code was like in the past, you can go back to it if you messed something up now.

Advanced:
- We call the code the "source code." Since we want to keep it under control (backed up, available, etc), we call solutions to this problem "Source Control."
- Source control systems such as Git or SVN let us easily back up our code and collaborate together

## Git

Git is the specific source control system we use. A few terms you'll see constantly:

- **Repository** (or "repo") - a project's folder of code, plus the entire history of every change ever made to it. `XbotEdu` is a repository.
- **Clone** - make a copy of a repository on your own computer so you can work on it. See [Use GitHub Desktop to clone](/curriculum/getting-started/clone-with-github-desktop).
- **Commit** - a saved snapshot of your changes, with a short message describing what you did. Commits are the "backups of what your code was like in the past" from above.
- **Branch** - a separate line of commits. You make a branch so your half-finished work doesn't disturb everyone else. The main branch is called `main`.
- **Push** / **Pull** - send your commits up to the shared copy, or bring other people's commits down to yours.
- **Merge** - combine the commits from one branch into another.

You don't have to memorize these. Most of what you'll do day to day is: make a branch, make some commits, push them, and open a pull request.

Most people on the team use **GitHub Desktop**, which does all of the above with buttons instead of typed commands. Using Git from the terminal is a good thing to learn eventually, but it isn't required.

## github.com

Git keeps the history; **GitHub** is the website that hosts the shared copy everyone works from. Our code lives in the [Team 488 organization](https://github.com/Team488).

GitHub also adds things Git itself doesn't have:

- **Forks** - your own copy of someone else's repository on GitHub. The curriculum has you work in a fork of XbotEdu, so you can experiment without affecting the original.
- **Pull requests** - how you propose that your branch be merged, and how teammates review your code first. See [Making a Pull Request](/curriculum/challenges/making-a-pull-request).
- **Issues** - a place to track bugs and work to be done.

If you want a more thorough introduction, GitHub's own [Hello World guide](https://docs.github.com/en/get-started/start-your-journey/hello-world) walks through branches, commits and pull requests in about 15 minutes.
