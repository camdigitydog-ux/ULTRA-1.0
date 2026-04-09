#!/usr/bin/env bash
# Run once: logs you into GitHub via gh, then pushes this repo.
set -e
export PATH="${HOME}/.local/bin:${PATH}"
command -v gh >/dev/null 2>&1 || {
  echo "Install gh first: https://cli.github.com/ or see project README."
  exit 1
}
if ! gh auth status >/dev/null 2>&1; then
  echo "Opening GitHub device login in your browser..."
  gh auth login --web --git-protocol https --hostname github.com
fi
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"
git push -u origin main
echo "Done."
