---
title: Ollama & Python
---

## Ollama & Python

Ollama is a powerful tool for running large language models locally, and when combined with Python, it enables sophisticated AI applications and automation.

### What is Ollama?

Ollama is a command-line tool and API server that:
- **Simplifies Model Management**: Easy installation and switching between models
- **Provides API Access**: RESTful API for programmatic integration
- **Optimizes Performance**: Efficient model loading and inference
- **Supports Multiple Models**: Wide variety of open-source models

### Installation

#### Install Ollama
**macOS:**
```bash
curl https://ollama.ai/install.sh | sh
```

**Windows:**
Download from https://ollama.ai/download

**Linux:**
```bash
curl https://ollama.ai/install.sh | sh
```

#### Install Python Client
```bash
pip install ollama
```

### Basic Ollama Usage

#### Download a Model
```bash
ollama pull llama2
ollama pull codellama
ollama pull mistral
```

#### Run a Model
```bash
ollama run llama2
```

#### List Models
```bash
ollama list
```

#### Remove a Model
```bash
ollama rm llama2
```

### Python Integration

#### Basic Python Usage
```python
import ollama

# Simple chat
response = ollama.chat(model='llama2', messages=[
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
    model='llama2',
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
    model='llama2',
    prompt='Write a haiku about programming'
)
print(response['response'])
```

### Advanced Python Examples

#### Building a Chat Assistant
```python
import ollama

class LocalChatAssistant:
    def __init__(self, model_name='llama2'):
        self.model = model_name
        self.conversation_history = []
    
    def chat(self, user_input):
        # Add user message to history
        self.conversation_history.append({
            'role': 'user',
            'content': user_input
        })
        
        # Get response from Ollama
        response = ollama.chat(
            model=self.model,
            messages=self.conversation_history
        )
        
        # Add assistant response to history
        assistant_message = response['message']
        self.conversation_history.append(assistant_message)
        
        return assistant_message['content']
    
    def reset_conversation(self):
        self.conversation_history = []

# Usage
assistant = LocalChatAssistant()
print(assistant.chat("Hello, how are you?"))
print(assistant.chat("What's the weather like?"))
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

#### Code Review Assistant
```python
import ollama

def review_code(code, language='python'):
    """Review code and provide suggestions"""
    prompt = f"""
    Please review this {language} code and provide:
    1. Code quality assessment
    2. Potential improvements
    3. Best practice suggestions
    4. Bug identification
    
    Code:
    ```{language}
    {code}
    ```
    """
    
    response = ollama.generate(
        model='codellama',
        prompt=prompt
    )
    return response['response']

# Usage
code = """
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)
"""

review = review_code(code)
print(review)
```

### API Server Usage

#### Starting the Server
```bash
ollama serve
```

#### Making HTTP Requests
```python
import requests
import json

def chat_with_api(message, model='llama2'):
    url = 'http://localhost:11434/api/chat'
    
    data = {
        'model': model,
        'messages': [
            {'role': 'user', 'content': message}
        ]
    }
    
    response = requests.post(url, json=data)
    return response.json()

# Usage
result = chat_with_api("Explain quantum computing")
print(result['message']['content'])
```

### Model Management with Python

#### Check Available Models
```python
import ollama

def list_local_models():
    models = ollama.list()
    return models['models']

for model in list_local_models():
    print(f"Model: {model['name']}")
    print(f"Size: {model['size']}")
    print(f"Modified: {model['modified_at']}")
    print("---")
```

#### Download Models Programmatically
```python
import ollama

def ensure_model_available(model_name):
    """Download model if not already available"""
    try:
        models = ollama.list()
        model_names = [m['name'] for m in models['models']]
        
        if model_name not in model_names:
            print(f"Downloading {model_name}...")
            ollama.pull(model_name)
            print(f"{model_name} downloaded successfully!")
        else:
            print(f"{model_name} is already available")
    except Exception as e:
        print(f"Error: {e}")

# Usage
ensure_model_available('mistral')
```

### Building Applications

#### Simple Web Interface with Flask
```python
from flask import Flask, request, jsonify, render_template_string
import ollama

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Local AI Chat</title>
</head>
<body>
    <div id="chat-container">
        <div id="messages"></div>
        <input type="text" id="user-input" placeholder="Type your message...">
        <button onclick="sendMessage()">Send</button>
    </div>
    
    <script>
        function sendMessage() {
            const input = document.getElementById('user-input');
            const message = input.value;
            if (!message) return;
            
            fetch('/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: message})
            })
            .then(response => response.json())
            .then(data => {
                const messages = document.getElementById('messages');
                messages.innerHTML += '<p><strong>You:</strong> ' + message + '</p>';
                messages.innerHTML += '<p><strong>AI:</strong> ' + data.response + '</p>';
                input.value = '';
            });
        }
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    response = ollama.generate(
        model='llama2',
        prompt=user_message
    )
    
    return jsonify({'response': response['response']})

if __name__ == '__main__':
    app.run(debug=True)
```

#### Batch Processing Script
```python
import ollama
import csv
import os

def batch_process_texts(input_file, output_file, task_prompt, model='llama2'):
    """Process multiple texts with the same prompt"""
    results = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        texts = [row[0] for row in reader]
    
    for i, text in enumerate(texts):
        print(f"Processing item {i+1}/{len(texts)}")
        
        full_prompt = f"{task_prompt}\n\nText: {text}"
        
        response = ollama.generate(
            model=model,
            prompt=full_prompt
        )
        
        results.append({
            'original_text': text,
            'result': response['response']
        })
    
    # Save results
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['original_text', 'result'])
        writer.writeheader()
        writer.writerows(results)

# Usage
batch_process_texts(
    'input_texts.csv',
    'results.csv',
    'Summarize this text in one sentence:'
)
```

### Performance Optimization

#### Concurrent Processing
```python
import ollama
import concurrent.futures
import time

def process_single_text(text):
    """Process a single text"""
    response = ollama.generate(
        model='llama2',
        prompt=f"Analyze the sentiment of: {text}"
    )
    return response['response']

def parallel_processing(texts, max_workers=3):
    """Process multiple texts in parallel"""
    results = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_text = {
            executor.submit(process_single_text, text): text 
            for text in texts
        }
        
        for future in concurrent.futures.as_completed(future_to_text):
            text = future_to_text[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as exc:
                print(f'Text {text} generated an exception: {exc}')
    
    return results

# Usage
texts = ["I love this product!", "This is terrible", "It's okay"]
results = parallel_processing(texts)
```

### Best Practices

#### Error Handling
```python
import ollama
import time

def robust_generate(prompt, model='llama2', max_retries=3):
    """Generate with retry logic"""
    for attempt in range(max_retries):
        try:
            response = ollama.generate(model=model, prompt=prompt)
            return response['response']
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise e

# Usage
result = robust_generate("Tell me about AI")
```

#### Resource Monitoring
```python
import psutil
import ollama

def monitor_system_resources():
    """Monitor system resources during AI tasks"""
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    
    print(f"CPU Usage: {cpu_percent}%")
    print(f"Memory Usage: {memory.percent}%")
    print(f"Available Memory: {memory.available / (1024**3):.1f} GB")

# Use before and after AI operations
monitor_system_resources()
response = ollama.generate(model='llama2', prompt='Complex task...')
monitor_system_resources()
```

### Integration Examples

#### Jupyter Notebook Integration
```python
# Cell 1: Setup
import ollama
import pandas as pd
from IPython.display import display, Markdown

# Cell 2: Helper function
def ai_analyze(data_description):
    prompt = f"Analyze this data description and suggest insights: {data_description}"
    response = ollama.generate(model='llama2', prompt=prompt)
    return response['response']

# Cell 3: Use with data
df = pd.read_csv('data.csv')
description = df.describe().to_string()
analysis = ai_analyze(description)
display(Markdown(f"## AI Analysis\n{analysis}"))
```

Ollama with Python provides a powerful combination for building local AI applications while maintaining privacy and control over your data and models.