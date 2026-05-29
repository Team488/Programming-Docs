# AI Tools: Built-in Commands

OpenCode has slash commands that control how it works. Type `/` in the TUI to see available commands.

## Essential Commands

| Command | What It Does |
|---------|-------------|
| `/init` | Initialize OpenCode for the current project (creates AGENTS.md) |
| `/undo` | Undo the last change OpenCode made |
| `/redo` | Redo a change that was undone |
| `/share` | Create a shareable link to the current conversation |
| `/help` | Show help information |
| `/connect` | Set up or switch an LLM provider |
| `/model` | Switch to a different model mid-session |

## Undo and Redo

Made a mistake? No problem.

```
/undo
```

OpenCode reverts the last change it made. Run `/undo` multiple times to step back further.

Changed your mind again?

```
/redo
```

## Sharing Sessions

Sharing your session is useful for asking for help or showing your work.

```
/share
```

This creates a link to your current conversation and copies it to your clipboard. Example: `https://opencode.ai/s/4XP1fce5`

Conversations are never shared unless you explicitly run `/share`.

## Custom Commands

You can create custom slash commands for repetitive tasks. Create `.opencode/commands/test.md`:

```markdown
---
description: Run tests with coverage
---

Run the full test suite and show any failures.
Focus on the failing tests and suggest fixes.
```

Now you can run `/test` in the TUI.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Toggle between Plan mode and Build mode |
| `@` | Fuzzy search and reference a file |
| `Ctrl+C` | Cancel the current response |
| `Up/Down` | Navigate conversation history |

---

## Quiz

**Q1:** What command creates a shareable link to your OpenCode session?

- [ ] A) `/undo`
- [ ] B) `/share`
- [ ] C) `/link`
- [ ] D) `/export`

<details>
<summary>Answer</summary>

**B) `/share`**

The `/share` command creates a link to your current conversation and copies it to your clipboard. Conversations are never shared unless you explicitly run this command.

</details>

**Q2:** How do you undo a change OpenCode made?

- [ ] A) Close the terminal
- [ ] B) Type `/undo`
- [ ] C) Delete the file manually
- [ ] D) Type `/revert`

<details>
<summary>Answer</summary>

**B) Type `/undo`**

The `/undo` command reverts the last change OpenCode made. You can run it multiple times to step back further.

</details>

**Q3:** What does the `Tab` key do in OpenCode?

- [ ] A) Closes the program
- [ ] B) Toggles between Plan mode and Build mode
- [ ] C) Saves the current file
- [ ] D) Opens a new tab in your terminal

<details>
<summary>Answer</summary>

**B) Toggles between Plan mode and Build mode**

Tab switches between Plan mode (explains what it would do but makes no changes) and Build mode (reads, edits, and creates files).

</details>
