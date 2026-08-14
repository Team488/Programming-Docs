# AI Tools Setup

OpenCode is an open source AI coding assistant that helps you write, understand, and modify code. Think of it as an AI pair programmer that runs in your terminal.

You already installed OpenCode in Module 1. Now you will configure it and connect it to an AI provider.

## Configure a Provider

OpenCode needs an LLM provider to work. You have several options:

1. **OpenCode Zen** (recommended) -- curated models, no API key hassle
2. **Any provider** -- Anthropic, OpenAI, Google, GitHub Copilot, and 75+ more

To connect a provider:

1. Run `opencode` to start the TUI
2. Type `/connect` and select your provider
3. Follow the login instructions

Alternatively, set up an API key in your environment:

```bash
# Anthropic
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI
export OPENAI_API_KEY=sk-...

# Or use a .env file in your project
```

## Initialize OpenCode

Navigate to your project and start OpenCode:

```bash
cd /path/to/your/robot-code
opencode
```

Then run the `/init` command:

```
/init
```

This tells OpenCode to analyze your project and create an `AGENTS.md` file in your project root. This file helps OpenCode understand your project structure and coding patterns.

**Commit your AGENTS.md to Git** -- it helps OpenCode provide better results every time.

## Verify It Works

Ask OpenCode something simple:

```
What does this project do?
```

If it responds with a description of your project, you are ready to go.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Command not found | Reinstall or check your PATH |
| API key errors | Run `/connect` or set environment variable |
| Model not responding | Try a different model with `/model` |
| Slow responses | Use a smaller/faster model |

---

## Quiz

**Q1:** What does `/init` do in OpenCode?

- [ ] A) Deletes your project
- [ ] B) Creates an AGENTS.md file with project context
- [ ] C) Installs OpenCode
- [ ] D) Pushes code to GitHub

<details>
<summary>Answer</summary>

**B) Creates an AGENTS.md file with project context**

The `/init` command analyzes your project and creates an AGENTS.md file that helps OpenCode understand your codebase.

</details>

**Q2:** How do you connect an AI provider in OpenCode?

- [ ] A) Edit a JSON config file
- [ ] B) Type `/connect` in the TUI
- [ ] C) Reinstall OpenCode
- [ ] D) Providers are pre-configured

<details>
<summary>Answer</summary>

**B) Type `/connect` in the TUI**

The `/connect` command lets you select and sign in to an AI provider directly from the terminal.

</details>

**Q3:** What should you do with the AGENTS.md file after `/init` creates it?

- [ ] A) Delete it
- [ ] B) Add it to .gitignore
- [ ] C) Commit it to Git
- [ ] D) Ignore it

<details>
<summary>Answer</summary>

**C) Commit it to Git**

Committing AGENTS.md helps OpenCode provide better results every time someone works on the project.

</details>
