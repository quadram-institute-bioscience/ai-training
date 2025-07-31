---
title: Whisper.cpp (Transcription)
---

## Whisper.cpp (Transcription)

Whisper.cpp is an optimized implementation of OpenAI's Whisper automatic speech recognition (ASR) model, designed for efficient local transcription.

### What is Whisper?

OpenAI's Whisper is a state-of-the-art speech recognition model that:

- **Multilingual Support**: Recognizes a hundred languages
- **Robust Performance**: Works with various audio qualities
- **Translation Capability**: Can translate to English
- **Punctuation and Formatting**: Adds appropriate punctuation


### Installation

Using the original Whisper requires coding skills, and you can check 
the [Whisper.cpp repository](https://github.com/ggerganov/whisper.cpp)

Prerequisites

- C++ compiler (GCC, Clang, or MSVC)
- Make or CMake
- Git


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
```

