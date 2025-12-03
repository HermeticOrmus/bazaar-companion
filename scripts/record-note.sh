#!/bin/bash
# Bazaar Companion - Voice Note Recorder
# Uses local Whisper.cpp for transcription
#
# Usage: ./record-note.sh [duration_seconds]
# Examples:
#   ./record-note.sh          # Record until Ctrl+C
#   ./record-note.sh 30       # Record 30 seconds

set -e

DURATION=${1:-0}
WHISPER_DIR="$HOME/whisper.cpp"
MODEL="small.en"
PROJECT_DIR="$HOME/projects/01-ACTIVE/bazaar-companion"
NOTES_DIR="$PROJECT_DIR/voice-notes"
STORAGE_FILE="$PROJECT_DIR/ui/notes-storage.json"

mkdir -p "$NOTES_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RECORDING="$NOTES_DIR/recording_$TIMESTAMP.wav"
TRANSCRIPTION="$NOTES_DIR/transcription_$TIMESTAMP.txt"

echo "================================"
echo "  Bazaar Companion Voice Note"
echo "================================"
echo ""

# Record audio
record_audio() {
    if [ "$DURATION" -eq 0 ]; then
        echo "Recording... Press Ctrl+C to stop"
        arecord -f cd -t wav "$RECORDING" 2>/dev/null || true
    else
        echo "Recording for $DURATION seconds..."
        arecord -f cd -t wav -d "$DURATION" "$RECORDING" 2>/dev/null
    fi
}

record_audio

# Check if recording was created
if [ ! -f "$RECORDING" ] || [ ! -s "$RECORDING" ]; then
    echo "No recording captured"
    exit 1
fi

echo ""
echo "Transcribing with Whisper..."

# Run Whisper transcription
"$WHISPER_DIR/build/bin/whisper-cli" \
    -m "$WHISPER_DIR/models/ggml-$MODEL.bin" \
    -f "$RECORDING" \
    --no-timestamps \
    -otxt \
    -of "${TRANSCRIPTION%.txt}" \
    -vth 0.6 2>/dev/null

# Clean up potential hallucinations
if [ -f "$TRANSCRIPTION" ]; then
    # Remove lines that repeat more than 3 times
    awk '!seen[$0]++ || ++count[$0] <= 3 {print}' "$TRANSCRIPTION" > "${TRANSCRIPTION}.clean"
    mv "${TRANSCRIPTION}.clean" "$TRANSCRIPTION"

    CONTENT=$(cat "$TRANSCRIPTION")

    echo ""
    echo "================================"
    echo "  Transcription:"
    echo "================================"
    echo "$CONTENT"
    echo ""
    echo "Audio: $RECORDING"
    echo "Text:  $TRANSCRIPTION"

    # Add to localStorage via a helper file
    # The UI will pick this up on refresh
    echo ""
    echo "Note saved! Refresh the Bazaar Companion UI to see it."
    echo ""

    # Create a JSON file that the browser can read
    DATE=$(date -Iseconds)
    ID=$(date +%s%3N)

    # Read existing notes or create empty array
    if [ -f "$STORAGE_FILE" ]; then
        EXISTING=$(cat "$STORAGE_FILE")
    else
        EXISTING="[]"
    fi

    # Escape content for JSON
    ESCAPED_CONTENT=$(echo "$CONTENT" | jq -Rs .)

    # Add new note to array
    NEW_NOTE="{\"id\":$ID,\"date\":\"$DATE\",\"content\":$ESCAPED_CONTENT}"

    # Prepend to existing notes
    if [ "$EXISTING" = "[]" ]; then
        echo "[$NEW_NOTE]" > "$STORAGE_FILE"
    else
        echo "$EXISTING" | jq ". = [$NEW_NOTE] + ." > "$STORAGE_FILE"
    fi

    echo "Note added to storage. Refresh UI to view."
else
    echo "Transcription failed"
    exit 1
fi
