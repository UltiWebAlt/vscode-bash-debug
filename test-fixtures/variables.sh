#!/usr/bin/env bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_PATH="$PROJECT_ROOT/.venv"
LAUNCHER_PATH="$VENV_PATH/bin/browser-selector"
DESKTOP_INSTALLER="$PROJECT_ROOT/desktop/install_desktop_entry.sh"

# DAP validation stops here after the four assignments above.
:

VENV_PATH="$PROJECT_ROOT/.venv-updated"
:

inspect_values() {
    local local_value='a value with spaces and "quotes"'
    local multiline=$'first line\nsecond line'
    local -a indexed=("zero" "two words" "")
    local -A assoc_values=([key]='value with spaces' [empty]='')
    :
}

inspect_values
