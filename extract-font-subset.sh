#!/bin/sh
set -e
SCRIPT_FILE="script.js"
IN_FONT_FILE="NewCMMath-Regular.otf"
OUT_FONT_FILE="newcmmath_subset.otf"
[ -f "$SCRIPT_FILE" ] || { echo "File \"$SCRIPT_FILE\" does not exist"; exit 1; }

SYMBOLS="$(cat "$SCRIPT_FILE" | grep -Eo '\[".", "' | awk '{print substr($0, 3, 1)}')"
# Radical signs are rendered out of whack by the New CM Math font
SYMBOLS_FILTERED="$(echo "$SYMBOLS" | grep -Ev '√|∛|∜')"
SYMBOLS_NONEWLINES="$(echo "$SYMBOLS_FILTERED" | tr -d \\n)"

SYMBOLS_NUM="$(echo "$SYMBOLS" | wc -l)"
SYMBOLS_FILTERED_NUM="$(echo "$SYMBOLS_FILTERED" | wc -l)"

echo "Found $SYMBOLS_NUM symbols in \"$SCRIPT_FILE\" ($SYMBOLS_FILTERED_NUM) filtered from ones not properly displayed)"
echo "These $SYMBOLS_FILTERED_NUM symbols are: $SYMBOLS_NONEWLINES"

echo "Generating a trimmed-down font..."
pyftsubset NewCMMath-Regular.otf --text="$SYMBOLS_NONEWLINES" --output-file=newcmmath_subset.otf
echo "Successfully created \"$OUT_FONT_FILE\""
