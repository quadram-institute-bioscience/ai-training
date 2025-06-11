---
layout: post
title: "Introduction to Large Language Models (NBI)"
date: 2023-01-15 14:30:00 +0000
categories: course
author: Andrea Telatin
toc:
  - id: intro
    title: Introduction to Large Language Models
  - id: tools
    title: Some popular tools
  - id: reading-list
    title: Reading List
---

## Introduction to Large Language Models {#intro}

**Topics**

What are the foundations of Large Language Models (LLMs) and how do they generate text for us; 
Accuracy and limitations of LLMs; 
Ethical and integrity considerations; 
Privacy concerns and local use of LLMs; 
AI-powered literature mining tools; 
Overview of coding assistants and coding agents.


| **#**               | **Course details**                              |
| ------------------- | ----------------------------------------------- |
| **Target Audience** | Everyone at NBI (students, researchers, staff)  |
| **Duration**        | 2.0 hours                                       |
| **Format**          | Classroom                                       |
| **Attendees**       | 6 - 18 participants                             |
| **Structure**       | Frontal lectures alternated to group activities |

After the course, learners will be able to:

| #   | **Learning Outcome**                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------- |
| 1   | Critically evaluate LLM outputs by identifying potential hallucinations, biases, and knowledge limitations      |
| 2   | Make informed decisions about data privacy, academic integrity, and appropriate use of AI in scholarly work     |
| 3   | Select appropriate deployment models (local vs. cloud) based on data sensitivity and privacy requirements       |
| 4   | Effectively prompt and utilize generative AI tools (Claude, ChatGPT, Perplexity) for research-appropriate tasks |
| 5   | Utilise literature mining AI-powered tools (such as Elicit) and understand their limitations                    |
| 6   | Leverage coding assistants to generate, debug, and optimize code for research tasks                             |

## Before

* [Online form](https://forms.cloud.microsoft/e/h8ifhdFuxH)

## Some popular tools {#tools}

* Chat bots
  * [ChatGPT](https://chatgpt.com/)
  * [Claude](https://claude.ai/)
  * [Perplexity](https://www.perplexity.ai/)
  * [Microsoft Copilot](https://copilot.microsoft.com/)
  * [You.com](https://you.com/)
* Code assistants
  * [GitHub Copilot](https://github.com/features/copilot)
  * [Tabnine](https://www.tabnine.com/)
  * [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)
  * [Cursor](https://www.cursor.com/) 

## Reading List {#reading-list}


This reading list is designed to introduce learners to Large Language Models, covering foundational concepts, technical implementations, and practical applications. The resources are organized from beginner to advanced levels, with each section building upon the previous one.

### 📚 **Foundation Topics**

**1. Mathematics and Machine Learning (optional)**

Some Mathematical Background:
- [3Blue1Brown - The Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) - Visual introduction to linear algebra concepts
- [Khan Academy - Linear Algebra](https://www.khanacademy.org/math/linear-algebra) - Interactive course covering linear algebra fundamentals
- [StatQuest with Josh Starmer - Statistics Fundamentals](https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9) - Clear explanations of statistical concepts

Core Machine Learning Resources:
- **"Mathematics for Machine Learning" by Deisenroth, Faisal & Ong** - Comprehensive mathematical foundations ([Free PDF](https://mml-book.github.io/book/mml-book.pdf))
- **"Deep Learning" by Ian Goodfellow, Yoshua Bengio & Aaron Courville** - The definitive deep learning textbook ([MIT Press](https://www.deeplearningbook.org/))
- [freeCodeCamp - Machine Learning for Everybody](https://www.youtube.com/watch?v=i_LwzRVP7bg) - Practical introduction to ML algorithms

**2. Neural Networks and Deep Learning**

Foundational Concepts:
- [3Blue1Brown - Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) - Intuitive explanation of neural networks
- [Fast.ai - Practical Deep Learning](https://course.fast.ai/) - Hands-on approach to deep learning
- [freeCodeCamp - Deep Learning Crash Course](https://www.youtube.com/watch?v=VyWAvY2CF9c) - Comprehensive introduction to deep learning concepts

PyTorch Implementation:
- [Patrick Loeber - PyTorch Tutorials](https://www.youtube.com/playlist?list=PLqnslRFeH2UrcDBWF5mfPGpqQDSta6VK4) - Beginner-friendly PyTorch programming
- [PyTorch Official Tutorials](https://pytorch.org/tutorials/) - Official documentation and examples


### 🔧 **Core LLM Concepts**

**3. Transformer Architecture**

Essential Papers:
- **"Attention Is All You Need" (2017)** - The foundational Transformer paper by Vaswani et al. ([arXiv](https://arxiv.org/abs/1706.03762))
- [Attention? Attention! by Lilian Weng](https://lilianweng.github.io/posts/2018-06-24-attention/) - Historical overview and introduction to attention mechanisms

Beginner-Friendly Explanations:
- [The Illustrated Transformer by Jay Alammar](http://jalammar.github.io/illustrated-transformer/) - Visual guide to Transformer architecture
- [How Transformers Work - DataCamp](https://www.datacamp.com/tutorial/how-transformers-work) - Detailed exploration of Transformer components
- [Transformers Explained Visually (3Blue1Brown)](https://www.youtube.com/watch?v=wjZofJX0v4M) - Visual introduction to Transformers and LLMs

Technical Implementation:
- [Building a Transformer with PyTorch - DataCamp](https://www.datacamp.com/tutorial/building-a-transformer-with-py-torch) - Complete implementation guide
- [Andrej Karpathy - Let's build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) - 2-hour tutorial on implementing GPT from scratch

**4. Embeddings**

Word Embeddings Fundamentals:
- [Understanding and Creating Word Embeddings - Programming Historian](https://programminghistorian.org/en/lessons/understanding-creating-word-embeddings) - Comprehensive tutorial on word embeddings
- [Word Embeddings: Encoding Lexical Semantics - PyTorch](https://pytorch.org/tutorials/beginner/nlp/word_embeddings_tutorial.html) - Practical implementation guide

Vector Embeddings:
- [What are Vector Embeddings? - Meilisearch](https://www.meilisearch.com/blog/what-are-vector-embeddings) - Complete guide to vector embeddings
- [Word Embeddings Tutorial - TensorFlow](https://www.tensorflow.org/text/guide/word_embeddings) - Introduction with sentiment classification example
- [BERT Word Embeddings Tutorial - Chris McCormick](https://mccormickml.com/2019/05/14/BERT-word-embeddings-tutorial/) - In-depth look at BERT embeddings

**5. Large Language Model Fundamentals**

Comprehensive Courses:
- **[Stanford CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/)** - Premier university course on NLP and LLMs
- [LLM Course by Maxime Labonne](https://github.com/mlabonne/llm-course) - Complete GitHub course covering LLM fundamentals through advanced topics

Beginner Guides:
- [Introduction to Large Language Models - Google](https://developers.google.com/machine-learning/resources/intro-llms) - Official Google ML documentation
- [What is an LLM? - DataCamp](https://www.datacamp.com/blog/what-is-an-llm-a-guide-on-large-language-models) - Comprehensive guide to LLM concepts
- [7 Steps to Mastering LLMs - KDnuggets](https://www.kdnuggets.com/7-steps-to-mastering-large-language-models-llms) - Structured learning path

Advanced Understanding:
- [The Beginner's Guide to LLMs - HiddenLayer](https://hiddenlayer.com/innovation-hub/the-beginners-guide-to-llms-and-generative-ai/) - Technical deep dive into LLM architecture
- [What is LLM? - AWS](https://aws.amazon.com/what-is/large-language-model/) - Enterprise perspective on LLMs


### 🛠 **Practical Applications**

**6. Prompt Engineering**

Official Guides:
- **[OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)** - Official best practices from OpenAI
- [Best Practices for Prompt Engineering - OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) - Comprehensive API-focused guide

**Advanced Techniques:**
- [10 Best Practices for Prompt Engineering - PromptHub](https://www.prompthub.us/blog/10-best-practices-for-prompt-engineering-with-any-model) - Universal prompt engineering principles
- [Prompt Engineering Techniques - K2view](https://www.k2view.com/blog/prompt-engineering-techniques/) - Top 5 techniques for 2025
- [12 Prompt Engineering Best Practices - TechTarget](https://www.techtarget.com/searchenterpriseai/tip/Prompt-engineering-tips-and-best-practices) - Professional development tips

**Hands-on Learning:**
- [Prompt Engineering Tutorial - Spiceworks](https://www.spiceworks.com/tech/artificial-intelligence/articles/what-is-prompt-engineering/) - Practical applications and examples

**7. Retrieval-Augmented Generation (RAG)**

**Foundational Understanding:**
- [What is RAG? - DataCamp](https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag) - Complete introduction to RAG concepts
- [RAG Architecture Deep Dive - LinkedIn](https://www.linkedin.com/pulse/rag-architecture-deep-dive-frank-denneman-4lple) - Comprehensive system architecture explanation

**Implementation Tutorials:**
- [Building RAG from Scratch - Learn by Building](https://learnbybuilding.ai/tutorial/rag-from-scratch/) - Beginner's step-by-step tutorial
- [RAG Implementation Strategy - Galileo AI](https://galileo.ai/blog/rag-implementation-strategy-step-step-process-ai-excellence) - Professional implementation guide
- [RAG in Azure AI Search - Microsoft](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) - Enterprise-grade RAG solutions

**Advanced RAG Concepts:**
- [RAG Tutorial & Best Practices - Nexla](https://nexla.com/ai-infrastructure/retrieval-augmented-generation/) - Comprehensive coverage with practical examples
- [What is RAG? - IBM](https://www.ibm.com/think/topics/retrieval-augmented-generation) - Enterprise perspective on RAG implementation

**8. Local LLMs**

**Getting Started:**
- [Run LLMs Locally: 7 Simple Methods - DataCamp](https://www.datacamp.com/tutorial/run-llms-locally-tutorial) - Comprehensive guide covering multiple tools
- [How to Run Local LLMs - Adventures in CRE](https://www.adventuresincre.com/how-to-install-llm-locally/) - Step-by-step installation guide

**Specific Tools and Platforms:**
- [Ollama Tutorial - KDnuggets](https://www.kdnuggets.com/ollama-tutorial-running-llms-locally-made-super-simple) - Simple local LLM deployment
- [6 Ways to Run LLMs Locally - Semaphore](https://semaphoreci.com/blog/local-llm) - Multiple implementation approaches
- [How to Run Local LLMs - n8n](https://blog.n8n.io/local-llm/) - Complete setup guide with automation

**Advanced Local Deployment:**
- [How to Run Your Own Local LLM - HackerNoon](https://hackernoon.com/how-to-run-your-own-local-llm-updated-for-2024) - Updated 2024 guide with multiple options
- [Run Models Locally - LangChain](https://python.langchain.com/docs/how_to/local_llms/) - Integration with LangChain framework



### 📖 **Additional Learning Resources**


**Online Courses**
- [CS224N Natural Language Processing - Stanford Online](https://online.stanford.edu/courses/cs224n-natural-language-processing-deep-learning) - Official Stanford course
- [AI Demystified: Introduction to LLMs - Stanford IT](https://uit.stanford.edu/service/techtraining/ai-demystified/llm) - Non-technical introduction

**Community Resources**
- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) - Reddit community for local LLM enthusiasts
- [r/PromptEngineering](https://www.reddit.com/r/PromptEngineering/) - Prompt engineering discussions and techniques
- [Hugging Face Transformers Documentation](https://huggingface.co/docs/transformers/) - Comprehensive library documentation

 

---

*Last updated: June 2025*
*This reading list covers foundational concepts through practical applications, providing a comprehensive learning path for LLM mastery.*