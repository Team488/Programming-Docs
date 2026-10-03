# 🔄 Lesson: Making a Pull Request (PR)

As you complete programming tasks, you'll submit your work using a **Pull Request** (PR). This lets your mentors/peers review your code before it becomes part of the main robot project. This is used every day in software jobs in industry as a best practice.

---

## 🧠 What is a Pull Request?

A **Pull Request** is a way to propose changes to the team's code. You're asking to "pull" your work into the official `main` branch.

We use PRs because:
- ✅ Code can be **reviewed before it’s merged**
- 🐛 Mistakes can be caught early
- 🧭 Your work stays separate from `main` until it’s ready

> 🚫 Never push directly to `main`. Always use a branch and a PR.

---

## 🌲 What is "merging into main"?

The `main` branch is the official version of the code — it’s what gets deployed to the robot.
When a PR is merged, your branch’s changes are added into `main` and everyone else will get them too.

---

## 🛠️ Steps: How to Make a Pull Request

### 1. Make sure you're on a branch

Check which branch you're on in GitHub Desktop (the Branch selector at the top). If it says `main`, create a branch now: **Branch** → **New Branch...**, and give it a useful name like `drive-to-position`.

From the terminal, the equivalent is:

```bash
git checkout -b drive-to-position
```

### 2. Commit your work

If using GitHub Desktop you can do it there, or if you want to learn how to do it from the terminal:

Open a terminal and run:

```bash
git add .
git commit -m "Add DriveToPosition exercise"
```

### 3. Push your branch to GitHub

Again if using GitHub Desktop you can push from there, or for the terminal approach:

Push it:

```bash
git push origin your-branch-name
```

### 4. Create the Pull Request

1. Go to your fork on github.com (`github.com/<your-username>/XbotEdu`)
2. Click the green **"Compare & pull request"** button
3. Fill in a title (e.g. `Add auto routine with shooter and drive`)
4. Add a short description of what you did
5. Make sure the PR is **from your branch → into `main`**
6. Click **Create pull request**

> [!WARNING]
> GitHub defaults the **base repository** to `Team488/XbotEdu`, because that's where your fork came from. For this exercise you want the PR to stay in your own fork, so change the **base repository** dropdown to `<your-username>/XbotEdu` before creating it. Double-check this before clicking **Create pull request** - the next section explains why.

### 5. Request a review

> [!IMPORTANT]
> For this exercise, we won't open a pull request against the real XbotEdu repo (so we don't clutter that repo for future users). Instead, we'll just open the PR against your fork's `main` branch. Because you "own" your fork, you'll need to add your teacher as a collaborator on your fork: go to Settings -> Collaborators -> Manage Access -> Add People, then type in your teacher's username (`aschokking` for Alex). Then you'll need to wait for your teacher to accept the invitation before you can add them as a reviewer below.
>
> You won't need to do this when you're on the real team, you only need to add the teacher as a collaborator because we're using personal forks in this exercise.

- In the PR page, find the **Reviewers** section
- Add your teacher’s GitHub username (for Alex that's `aschokking`)

---

✅ (sort of) done! Your code is now ready to be reviewed. After review your reviewer will either Approve the PR in which case you can merge it, or they'll Request Changes that should be made. This iterative process continues until the PR is approved and then merged.

---

## Next Steps

Continue with the next curriculum challenge: [Rotating to a target orientation](/curriculum/challenges/rotating-to-a-target-orientation)
