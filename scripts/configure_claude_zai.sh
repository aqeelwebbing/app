#!/usr/bin/env bash
set -euo pipefail

# configure_claude_zai.sh
# Usage:
#   ZAI_API_KEY=your_key ./scripts/configure_claude_zai.sh
#   or
#   ./scripts/configure_claude_zai.sh your_key
#
# This script will create (or overwrite) "$HOME/.claude/settings.json"
# with the correct variables for using Claude/Anthropic via the Z.ai Open
# Platform. It does NOT store your key in the repository.

API_KEY="${ZAI_API_KEY:-${1:-}}"

if [ -z "$API_KEY" ]; then
  echo "Error: No API key provided. Set ZAI_API_KEY env var or pass key as first arg."
  echo "Example: ZAI_API_KEY=pk_... ./scripts/configure_claude_zai.sh"
  exit 1
fi

CLAUDE_DIR="$HOME/.claude"
mkdir -p "$CLAUDE_DIR"

SETTINGS_FILE="$CLAUDE_DIR/settings.json"

cat > "$SETTINGS_FILE" <<EOF
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "$API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000"
  }
}
EOF

echo "Wrote $SETTINGS_FILE"
echo "Reminder: Do NOT commit your API key to git. Keep it in your local environment or a secrets manager."

exit 0
