---
title: Ollama & Python
---

## Ollama & Python

Ollama is a powerful tool for running large language models locally, and when combined with Python, it enables sophisticated AI applications and automation.

<figure style="padding: 6px; font-size: 0.8em; color: #606060; background: #F0F0F0;">
    <img src="{{ 'img/ollama.png' | relative_url }}" alt="Ollama scheme (Andrea Telatin)">
    <figcaption><span style="font-size: 0.8em; color: #606060;">
    Ollama is a package that can provide access to LLMs from your terminal, to your Python programs, and - with additional programs - you can have a user friendly interface for it.
    </span></figcaption>
</figure>

### What is Ollama?

Ollama is a command-line tool and API server that:
- **Simplifies Model Management**: Easy installation and switching between models
- **Provides API Access**: RESTful API for programmatic integration (e.g. call LLM from your Python programs)
- **Supports Multiple Models**: Wide variety of open-source models (see [here](https://ollama.com/search))

### Installation

#### Install Ollama

Follow the [official instructions](https://ollama.com/download) to install Ollama, but experience using the command line is recommended

If you plan to use Ollama from Python, install its Python module too:
```bash
pip install ollama
```

### Basic Ollama Usage

1. Download a [model](https://ollama.com/search)
```bash
ollama pull qwen3:8b
```
2. To run a model (in a chat bot style, but from the terminal):

```bash
ollama run qwen3:8b
```
3. What models do you have available?

```bash
ollama list
```


###  Python example

```python
import ollama

# Simple chat (ensure the model exists!)
response = ollama.chat(model='qwen3:8b', messages=[
    {
        'role': 'user',
        'content': 'Why is the sky blue?',
    },
])
print(response['message']['content'])
```

#### Streaming Responses
```python
import ollama

stream = ollama.chat(
    model='qwen3:8b',
    messages=[{'role': 'user', 'content': 'Tell me a story'}],
    stream=True,
)

for chunk in stream:
    print(chunk['message']['content'], end='', flush=True)
```

#### Generate Text
```python
import ollama

response = ollama.generate(
    model='qwen3:8b',
    prompt='Write a haiku about programming'
)
print(response['response'])
``` 

#### Document Analysis Tool

```python
import ollama
import os

def analyze_document(file_path, model='llama2'):
    """Analyze a text document using local LLM"""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    prompt = f"""
    Please analyze the following document and provide:
    1. A brief summary
    2. Key themes
    3. Important insights
    
    Document:
    {content}
    """
    
    response = ollama.generate(model=model, prompt=prompt)
    return response['response']

# Usage
analysis = analyze_document('report.txt')
print(analysis)
```
 