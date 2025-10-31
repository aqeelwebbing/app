Claude / Z.ai setup
====================

This document explains how to install Claude Code locally and configure it to use the Z.ai Open Platform (Anthropic-compatible API).

Important: Do NOT commit API keys to the repository. Use environment variables or your OS secret manager.

Prerequisites
-------------

- Node.js 18+ and npm (or pnpm)
- Network access to npm registry and Z.ai API

Install Claude Code
-------------------

Try installing the official Claude Code package globally (may require sudo):

```bash
# npm
npm install -g @anthropic-ai/claude-code

# OR using pnpm
pnpm add -g @anthropic-ai/claude-code
```

If installation fails (registry/private package), follow Z.ai docs for their CLI.

Configure environment (safe, local)
----------------------------------

1) Use the helper script in this repo that writes your key into ~/.claude/settings.json.

Example (preferred):

```bash
ZAI_API_KEY="<your_zai_api_key>" ./scripts/configure_claude_zai.sh
```

Or pass the key as an argument:

```bash
./scripts/configure_claude_zai.sh <your_zai_api_key>
```

The script will create `$HOME/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "<your_zai_api_key>",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000"
  }
}
```

2) Verify the file exists and does not contain other secrets in your repo.

Start Claude Code
-----------------

```bash
# From your project directory
claude
```

If asked "Do you want to use this API key?", answer Yes. Grant file access when prompted.

Security notes
--------------

- NEVER commit `~/.claude/settings.json` to git.
- Use a secret manager (1Password, macOS Keychain, Windows Credentials, or a CI secret store) for automated CI runs.

Troubleshooting
---------------

- If `claude` isn't found after install, ensure your npm global bin directory is on PATH.
- If the `claude` package is private/unavailable, follow Z.ai docs to obtain the official installer or a tarball.
