---
title: Whisper.cpp (Transcription)
---

## Whisper.cpp (Transcription)

Whisper.cpp is an optimized implementation of OpenAI's Whisper automatic speech recognition (ASR) model, designed for efficient local transcription.

### What is Whisper?

OpenAI's Whisper is a state-of-the-art speech recognition model that:
- **Multilingual Support**: Recognizes 99+ languages
- **Robust Performance**: Works with various audio qualities
- **Translation Capability**: Can translate to English
- **Punctuation and Formatting**: Adds appropriate punctuation

### What is Whisper.cpp?

Whisper.cpp is a C++ port of Whisper that offers:
- **Faster Inference**: Optimized C++ implementation
- **Lower Memory Usage**: More efficient than Python version
- **No Dependencies**: Minimal system requirements
- **Cross-platform**: Windows, macOS, Linux support

### Installation

#### Prerequisites
- C++ compiler (GCC, Clang, or MSVC)
- Make or CMake
- Git

#### Building from Source
```bash
# Clone the repository
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp

# Build
make

# Or with CMake
mkdir build
cd build
cmake ..
make
```

#### Download Models
```bash
# Download models (choose appropriate size)
bash ./models/download-ggml-model.sh base
bash ./models/download-ggml-model.sh small
bash ./models/download-ggml-model.sh medium
bash ./models/download-ggml-model.sh large-v3
```

### Available Models

#### Model Sizes and Performance

| Model  | Parameters | Size   | Speed | Quality |
|--------|------------|--------|-------|---------|
| tiny   | 39 M       | ~40 MB | Fast  | Basic   |
| base   | 74 M       | ~75 MB | Fast  | Good    |
| small  | 244 M      | ~250MB | Med   | Better  |
| medium | 769 M      | ~770MB | Slow  | High    |
| large  | 1550 M     | ~1.5GB | Slow  | Best    |

#### Choosing the Right Model
- **tiny/base**: Quick transcription, acceptable quality
- **small**: Balanced speed and accuracy
- **medium**: High accuracy, moderate speed
- **large**: Best quality, slower processing

### Basic Usage

#### Simple Transcription
```bash
# Transcribe an audio file
./main -m models/ggml-base.bin -f audio.wav

# Specify language (faster)
./main -m models/ggml-base.bin -l en -f audio.wav

# Output to file
./main -m models/ggml-base.bin -f audio.wav -of output.txt
```

#### Common Parameters
```bash
# Basic options
-m models/ggml-base.bin    # Model file
-f audio.wav               # Input audio file
-l en                      # Language (optional)
-t 4                       # Number of threads
-of output.txt             # Output file

# Quality options
--best-of 5               # Best of N attempts
--beam-size 5             # Beam search size
--temperature 0.0         # Temperature (0.0 = deterministic)
```

### Audio Format Support

#### Supported Formats
- **WAV**: Uncompressed audio (preferred)
- **MP3**: Compressed audio
- **M4A**: Apple audio format
- **OGG**: Open-source format
- **FLAC**: Lossless compression

#### Audio Preprocessing
```bash
# Convert to WAV using FFmpeg
ffmpeg -i input.mp3 -ar 16000 -ac 1 -c:a pcm_s16le output.wav

# Parameters explained:
# -ar 16000     : 16kHz sample rate
# -ac 1         : Mono audio
# -c:a pcm_s16le: 16-bit PCM encoding
```

### Advanced Features

#### Translation to English
```bash
# Translate non-English audio to English
./main -m models/ggml-base.bin -f spanish_audio.wav --translate
```

#### Timestamps
```bash
# Add timestamps to output
./main -m models/ggml-base.bin -f audio.wav -ot

# Custom timestamp format
./main -m models/ggml-base.bin -f audio.wav -ot -of output.srt
```

#### Voice Activity Detection
```bash
# Enable VAD for better silence handling
./main -m models/ggml-base.bin -f audio.wav --vad
```

### Output Formats

#### Text Output
```bash
# Plain text
./main -m models/ggml-base.bin -f audio.wav -ot

# With timestamps
./main -m models/ggml-base.bin -f audio.wav -ot
```

#### Structured Formats
```bash
# JSON output
./main -m models/ggml-base.bin -f audio.wav -oj

# SRT subtitles
./main -m models/ggml-base.bin -f audio.wav -osrt

# VTT subtitles
./main -m models/ggml-base.bin -f audio.wav -ovtt
```

### Python Integration

#### Using subprocess
```python
import subprocess
import json

def transcribe_audio(audio_file, model_path="models/ggml-base.bin"):
    """Transcribe audio file using whisper.cpp"""
    cmd = [
        "./main",
        "-m", model_path,
        "-f", audio_file,
        "-oj"  # JSON output
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        # Parse JSON output
        output_lines = result.stdout.strip().split('\n')
        json_line = next(line for line in output_lines if line.startswith('{'))
        return json.loads(json_line)
    else:
        raise Exception(f"Transcription failed: {result.stderr}")

# Usage
transcription = transcribe_audio("audio.wav")
print(transcription['transcription'])
```

#### Batch Processing Script
```python
import os
import subprocess
import glob

def batch_transcribe(audio_dir, output_dir, model_path="models/ggml-base.bin"):
    """Transcribe all audio files in a directory"""
    audio_files = glob.glob(os.path.join(audio_dir, "*.wav"))
    
    for audio_file in audio_files:
        filename = os.path.basename(audio_file)
        name, ext = os.path.splitext(filename)
        output_file = os.path.join(output_dir, f"{name}.txt")
        
        print(f"Transcribing {filename}...")
        
        cmd = [
            "./main",
            "-m", model_path,
            "-f", audio_file,
            "-of", output_file
        ]
        
        subprocess.run(cmd)
        print(f"Saved to {output_file}")

# Usage
batch_transcribe("audio_files/", "transcripts/")
```

### Real-time Transcription

#### Stream Processing
```bash
# Real-time transcription from microphone (if supported)
./stream -m models/ggml-base.bin -t 8 --step 500 --length 5000
```

#### Python Real-time Example
```python
import subprocess
import threading
import queue
import time

class RealTimeTranscriber:
    def __init__(self, model_path="models/ggml-base.bin"):
        self.model_path = model_path
        self.transcription_queue = queue.Queue()
        
    def transcribe_chunk(self, audio_chunk_file):
        """Transcribe a single audio chunk"""
        cmd = [
            "./main",
            "-m", self.model_path,
            "-f", audio_chunk_file,
            "-oj"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            # Parse and queue result
            output_lines = result.stdout.strip().split('\n')
            json_line = next(line for line in output_lines if line.startswith('{'))
            transcription = json.loads(json_line)
            self.transcription_queue.put(transcription['transcription'])
    
    def get_latest_transcription(self):
        """Get the latest transcription if available"""
        try:
            return self.transcription_queue.get_nowait()
        except queue.Empty:
            return None

# Usage would require audio chunking implementation
```

### Performance Optimization

#### Thread Configuration
```bash
# Optimize thread count for your CPU
./main -m models/ggml-base.bin -f audio.wav -t $(nproc)

# Or manually specify
./main -m models/ggml-base.bin -f audio.wav -t 8
```

#### Memory Management
```bash
# For large files, use smaller context
./main -m models/ggml-base.bin -f audio.wav --max-context 448

# Disable GPU if causing issues
./main -m models/ggml-base.bin -f audio.wav --no-gpu
```

### Use Cases

#### Meeting Transcription
```python
def transcribe_meeting(audio_file, participants=None):
    """Transcribe meeting with speaker identification hints"""
    # Basic transcription
    transcription = transcribe_audio(audio_file, "models/ggml-medium.bin")
    
    # Post-process for meeting format
    text = transcription['transcription']
    
    # Add meeting structure
    formatted = f"""
MEETING TRANSCRIPTION
Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}
Participants: {', '.join(participants) if participants else 'Unknown'}

TRANSCRIPT:
{text}
    """
    
    return formatted
```

#### Podcast Processing
```python
def process_podcast(audio_file, output_dir):
    """Process podcast episode"""
    # Transcribe with timestamps
    cmd = [
        "./main",
        "-m", "models/ggml-large.bin",
        "-f", audio_file,
        "-osrt", os.path.join(output_dir, "subtitles.srt"),
        "-ot", os.path.join(output_dir, "transcript.txt"),
        "--best-of", "5"
    ]
    
    subprocess.run(cmd)
```

#### Language Learning
```python
def create_learning_material(audio_file, target_language):
    """Create language learning materials"""
    # Transcribe in original language
    original = transcribe_audio(audio_file)
    
    # Translate to English
    cmd = [
        "./main",
        "-m", "models/ggml-base.bin",
        "-f", audio_file,
        "--translate",
        "-oj"
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    translation = json.loads(result.stdout)
    
    return {
        'original': original['transcription'],
        'translation': translation['transcription'],
        'language': target_language
    }
```

### Quality Improvement Tips

#### Audio Preparation
- **Clean Audio**: Remove background noise
- **Consistent Volume**: Normalize audio levels
- **Clear Speech**: Ensure speakers are close to microphone
- **Single Speaker**: Separate multi-speaker recordings

#### Model Selection
- **Language-specific**: Use appropriate model for content language
- **Domain-specific**: Consider fine-tuned models for specialized content
- **Quality vs Speed**: Balance accuracy needs with processing time

#### Post-processing
```python
def improve_transcription(raw_text):
    """Basic post-processing for transcription"""
    # Fix common issues
    text = raw_text.strip()
    
    # Capitalize sentences
    sentences = text.split('. ')
    sentences = [s.capitalize() for s in sentences]
    text = '. '.join(sentences)
    
    # Fix common transcription errors (customize for your use case)
    corrections = {
        ' i ': ' I ',
        "cant": "can't",
        "wont": "won't",
        "dont": "don't"
    }
    
    for wrong, right in corrections.items():
        text = text.replace(wrong, right)
    
    return text
```

### Troubleshooting

#### Common Issues
- **Model not found**: Ensure model is downloaded and path is correct
- **Audio format error**: Convert to supported format
- **Out of memory**: Use smaller model or reduce context length
- **Poor quality**: Try larger model or improve audio quality

#### Performance Issues
```bash
# Check system resources
htop  # Monitor CPU and memory usage

# Test different thread counts
for threads in 1 2 4 8; do
    time ./main -m models/ggml-base.bin -f test.wav -t $threads
done
```

Whisper.cpp provides powerful local speech recognition capabilities, enabling privacy-focused transcription workflows without requiring cloud services.