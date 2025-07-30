---
title: Prompt Engineering
---

## Prompt Engineering

Prompt engineering is the practice of designing and optimizing input prompts to get the best possible outputs from Large Language Models.

### What is Prompt Engineering?

Prompt engineering involves:
- **Crafting Instructions**: Writing clear, specific directions
- **Providing Context**: Including relevant background information
- **Structuring Input**: Organizing information effectively
- **Iterating and Refining**: Improving prompts based on results

:bulb: we saw how the **transformer** allows to "soak" the context. Therefore, the more relevant and specific context we provide, the better the results.

:arrow_right: Read more about this topic from [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) or the   [Best Practices for OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) 
### Core Principles

#### Clarity and Specificity

Since the transformers "soaks" context, the more the better. Consider this examples:
* ❌ Poor: "Write about dogs"
* ✅ Better: "Write a 300-word informative article about golden retriever training techniques for new dog owners"

You can add more context like:
* What to focus on
* The style


#### Context Provision
* ❌ Poor: "Translate this"
* ✅ Better: "Translate this marketing email from English to Spanish, maintaining a professional but friendly tone"


#### Task Decomposition

* ❌ Poor: "Analyze this data and give recommendations"
* ✅ Good: "First, summarize the key trends in this sales data. Then, identify the top 3 performance issues. Finally, suggest specific action items for each issue."


### Essential Techniques

#### :one: Role Playing
Assign the AI a specific role or persona:

```
"You are an experienced software engineer.
Review this code and suggest improvements for performance and readability."

"Act as a patient teacher explaining quantum physics to a high school student."
```

#### :two: Few-Shot Learning
Provide examples of desired input-output pairs:

```
Classify these emails as spam or not spam:

Email: "Congratulations! You've won $1,000,000!"
Classification: Spam

Email: "Meeting moved to 3 PM tomorrow"
Classification: Not Spam

Email: "Click here for amazing weight loss secrets!"
Classification: ?
```

#### :three: Chain of Thought
Guide the model through step-by-step reasoning:

```
"Solve this math problem step by step:
What is 15% of 240?

Step 1: Convert percentage to decimal
Step 2: Multiply the number by the decimal
Step 3: Show the final answer"
```

#### :four: Output Formatting
Specify exactly how you want the response structured:

```
"Analyze this product review and provide:
1. Overall sentiment (Positive/Negative/Neutral)
2. Key themes (max 3)
3. Specific issues mentioned
4. Recommended actions

Format as JSON with these exact keys."
```

### More Techniques

#### Tree of Thoughts
Explore multiple reasoning paths:

```
"Consider three different approaches to solve this problem:
Approach 1: [method]
Approach 2: [method]
Approach 3: [method]

Evaluate each approach and recommend the best one."
```

#### Constitutional AI Prompting
Include principles and values:

```
"Provide advice on this ethical dilemma. Consider:
- Respect for individual autonomy
- Minimizing harm to all parties
- Fairness and justice
- Long-term consequences
..."
```

#### Negative Prompting
Explicitly state what to avoid:

```
"Write a product description that:
- Highlights key features
- Uses simple language
- Avoids technical jargon
- Does not make exaggerated claims
- Is under 100 words"
```

### Prompt Structure Templates

Example of structured prompt:

```
[ROLE] You are a [specific role]
[CONTEXT] Given this context: [background information]
[TASK] Your task is to: [specific instruction]
[FORMAT] Provide the output in this format: [format specification]
[CONSTRAINTS] Requirements: [limitations and guidelines]
```

A template for an analysis:

```
"Analyze the following [content type]:

[CONTENT]

Provide:
1. Summary (2-3 sentences)
2. Key insights (3-5 bullet points)
3. Recommendations (specific actions)
4. Potential concerns or limitations

Focus on [specific aspect] and consider [context]."
```

An example of **creative** writing:

```
"Write a [content type] that:
- Genre: [specify genre]
- Audience: [target audience]
- Tone: [desired tone]
- Length: [word count]
- Key elements to include: [list]
- Style: [writing style preference]"
```
 
### Domain-Specific Prompting

* Code Generation

```
"Write a Python function that:
- Function name: calculate_compound_interest
- Parameters: principal, rate, time, compound_frequency
- Returns: final amount
- Include: type hints, docstring, error handling
- Style: Follow PEP 8 conventions"
```

* Data Analysis

```
"Analyze this dataset:
[DATA]

1. Identify data types and structure
2. Find patterns and trends
3. Detect outliers or anomalies
4. Suggest visualization approaches
5. Recommend next analysis steps"
``` 