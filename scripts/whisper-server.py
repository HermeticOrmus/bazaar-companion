#!/usr/bin/env python3
"""
Whisper Transcription Server for Bazaar Companion
Runs on localhost:5000, accepts audio uploads and returns transcriptions.
Uses local whisper.cpp for privacy - no data leaves your machine.

Usage:
    python3 whisper-server.py

Requires:
    pip install flask flask-cors
    ~/whisper.cpp with built binaries and models
"""

import os
import subprocess
import tempfile
import json
from pathlib import Path

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
except ImportError:
    print("Installing required packages...")
    subprocess.run(["pip3", "install", "flask", "flask-cors"])
    from flask import Flask, request, jsonify
    from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for browser requests

# Configuration
WHISPER_DIR = Path.home() / "whisper.cpp"
MODEL = "small.en"
WHISPER_CLI = WHISPER_DIR / "build" / "bin" / "whisper-cli"
MODEL_PATH = WHISPER_DIR / "models" / f"ggml-{MODEL}.bin"

def check_whisper():
    """Check if whisper.cpp is available"""
    if not WHISPER_CLI.exists():
        return False, f"Whisper CLI not found at {WHISPER_CLI}"
    if not MODEL_PATH.exists():
        return False, f"Model not found at {MODEL_PATH}"
    return True, "OK"

def convert_to_wav(input_path, output_path):
    """Convert audio to WAV format using ffmpeg"""
    try:
        subprocess.run([
            "ffmpeg", "-y", "-i", input_path,
            "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le",
            output_path
        ], check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg error: {e.stderr.decode()}")
        return False
    except FileNotFoundError:
        print("FFmpeg not found - install with: sudo apt install ffmpeg")
        return False

def transcribe(audio_path):
    """Run whisper.cpp on the audio file"""
    with tempfile.NamedTemporaryFile(suffix=".txt", delete=False) as tmp:
        output_base = tmp.name[:-4]  # Remove .txt extension

    try:
        result = subprocess.run([
            str(WHISPER_CLI),
            "-m", str(MODEL_PATH),
            "-f", audio_path,
            "--no-timestamps",
            "-otxt",
            "-of", output_base,
            "-vth", "0.6"  # Voice activity threshold
        ], capture_output=True, text=True, timeout=60)

        output_file = output_base + ".txt"
        if os.path.exists(output_file):
            with open(output_file, 'r') as f:
                text = f.read().strip()
            os.unlink(output_file)

            # Clean up repetitions (common Whisper hallucination)
            lines = text.split('\n')
            seen = {}
            cleaned = []
            for line in lines:
                line = line.strip()
                if line:
                    count = seen.get(line, 0) + 1
                    seen[line] = count
                    if count <= 2:  # Allow up to 2 repetitions
                        cleaned.append(line)
            return ' '.join(cleaned)
        else:
            return None
    except subprocess.TimeoutExpired:
        return None
    except Exception as e:
        print(f"Transcription error: {e}")
        return None

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    ok, msg = check_whisper()
    return jsonify({"status": "ok" if ok else "error", "message": msg})

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    """
    Transcribe uploaded audio file
    Accepts: multipart/form-data with 'audio' file
    Returns: {"text": "transcription", "success": true}
    """
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided", "success": False}), 400

    audio_file = request.files['audio']

    # Check whisper availability
    ok, msg = check_whisper()
    if not ok:
        return jsonify({"error": msg, "success": False}), 500

    # Save uploaded file
    with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as tmp:
        audio_file.save(tmp.name)
        webm_path = tmp.name

    # Convert to WAV
    wav_path = webm_path.replace('.webm', '.wav')
    if not convert_to_wav(webm_path, wav_path):
        os.unlink(webm_path)
        return jsonify({"error": "Failed to convert audio", "success": False}), 500

    # Transcribe
    text = transcribe(wav_path)

    # Cleanup
    os.unlink(webm_path)
    if os.path.exists(wav_path):
        os.unlink(wav_path)

    if text:
        return jsonify({"text": text, "success": True})
    else:
        return jsonify({"error": "Transcription failed", "success": False}), 500

if __name__ == '__main__':
    print("=" * 50)
    print("  Bazaar Companion - Whisper Transcription Server")
    print("=" * 50)

    ok, msg = check_whisper()
    if ok:
        print(f"✓ Whisper.cpp found at {WHISPER_DIR}")
        print(f"✓ Using model: {MODEL}")
    else:
        print(f"✗ {msg}")
        print("\nTo set up whisper.cpp:")
        print("  cd ~")
        print("  git clone https://github.com/ggerganov/whisper.cpp")
        print("  cd whisper.cpp && make")
        print("  ./models/download-ggml-model.sh small.en")

    print("\nStarting server on http://localhost:5000")
    print("Press Ctrl+C to stop\n")

    app.run(host='localhost', port=5000, debug=False)
