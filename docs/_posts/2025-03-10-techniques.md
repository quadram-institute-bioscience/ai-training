---
layout: post
title: "Prompt engineering examples"
date: 2025-03-01 14:30:00 +0000
categories: links
author: Andrea Telatin
toc:
  - id: topic
    title: Our example
  - id: basic
    title: Basic Prompt
  - id: cot
    title: Chain of Thought
  - id: role
    title: Role based
  - id: fs
    title: Few-shots prompting
  - id: structured
    title: Structured Prompting
 ---
 
## Base Topic: Planning a One-Day Trip in Norfolk, UK

Here are six different ways to approach the same prompt, demonstrating various prompting techniques:

---

## **Example 1: Basic Prompt** {#basic}
```
Plan a one-day trip in Norfolk.
```

**Expected Result:** Generic, brief suggestions without much detail or personalization.

---

## **Example 2: Chain of Thought Prompting** {#cot}
```
I want to plan a one-day trip in Norfolk, UK. Let me think through this step by step:

First, help me consider what time of year I'm visiting and what that means for activities. Then, think about different types of attractions Norfolk offers. Next, consider practical logistics like travel time between locations. Finally, create a realistic itinerary that maximizes the experience while being feasible in one day.

Walk me through your reasoning for each recommendation.
```

**Expected Result:** Detailed reasoning process, consideration of multiple factors, logical flow between decisions.

---

## **Example 3: Role-Based Prompting** {#role}
```
You are an experienced local tour guide who has lived in Norfolk for 20 years and specializes in creating memorable day trips for visitors. A couple in their 30s who enjoy history, good food, and scenic walks has asked you to plan their perfect day in Norfolk. 

What would you recommend, and why? Share your local insights and hidden gems that only someone with your experience would know.
```

**Expected Result:** More personalized, insider knowledge, specific local recommendations with expert reasoning.

---

## **Example 4: Few-Shot Prompting with Examples** {#fs}
```
Here are examples of great one-day trip plans for other UK regions:

**Lake District Day Trip:**
- 9:00 AM: Arrive Windermere, lakeside breakfast
- 10:30 AM: Steam boat cruise (1 hour)
- 12:00 PM: Beatrix Potter Gallery, Near Sawrey
- 2:00 PM: Pub lunch at traditional inn
- 3:30 PM: Easy fell walk with lake views
- 5:00 PM: Afternoon tea in Ambleside

**Cotswolds Day Trip:**
- 9:30 AM: Chipping Campden morning walk
- 11:00 AM: Broadway Tower and views
- 1:00 PM: Lunch in Stow-on-the-Wold
- 2:30 PM: Bourton-on-the-Water village exploration
- 4:00 PM: Antique shopping in Tetbury
- 5:30 PM: Sunset drinks at country pub

Now create a similarly detailed and well-paced one-day itinerary for Norfolk, following this same format and level of detail.
```

**Expected Result:** Structured itinerary matching the example format, with similar pacing and detail level.

---

## **Example 5: Structured Prompting with Specific Output Format** {#structured}
```
Create a one-day Norfolk trip plan using this exact format:

**TRIP OVERVIEW:**
- Theme: [main focus of the day]
- Best season: [when to visit and why]
- Transportation needed: [driving/public transport requirements]

**DETAILED ITINERARY:**
For each stop, provide:
- Time: [arrival time]
- Location: [specific place name and postcode]
- Duration: [how long to spend]
- Activity: [what to do there]
- Why it's special: [unique selling point]
- Practical tip: [insider advice]

**BUDGET ESTIMATE:**
- Admission fees: £[amount]
- Food and drink: £[amount]
- Transport: £[amount]
- Total: £[amount]

**BACKUP PLAN:**
- Alternative indoor activities if weather is poor
```

**Expected Result:** Highly organized, comprehensive information in the requested format, easy to follow and use.

---

## **Example 6: Persona and Constraint-Based Prompting**
```
I'm a photography enthusiast visiting Norfolk for the first time. I have exactly 8 hours (9 AM - 5 PM), a rental car, and a budget of £60. I'm particularly interested in:
- Coastal landscapes and wildlife
- Historic architecture
- Local food experiences
- Avoiding crowds

Create a realistic itinerary that maximizes photo opportunities while respecting my time, budget, and interests. For each location, explain:
1. Why it's photogenic
2. Best time of day for lighting
3. Any photography restrictions
4. Estimated costs

Also suggest what camera equipment would be most useful for the day.
```

**Expected Result:** Highly personalized recommendations with photography-specific advice, budget considerations, and practical equipment suggestions.

---

## **Workshop Instructions for Trainers:**

**Setup (2 minutes):**
- Divide participants into pairs
- Each pair tests 2-3 different prompt styles
- Give everyone the same AI tool (ChatGPT or Claude)

**Experiment Phase (10 minutes):**
- Pairs spend 3-4 minutes on each prompt style
- Have them copy/paste the exact prompts provided
- Ask them to note differences in response quality, length, and usefulness

**Debrief Discussion (3 minutes):**
- "Which prompt gave you the most useful response?"
- "What specific differences did you notice?"
- "Which technique would you use for your own work projects?"

**Key Learning Points to Highlight:**
- Specificity and context dramatically improve results
- Role-based prompting taps into AI's training on expert knowledge
- Structure and examples guide AI toward desired output format
- Constraints help focus responses on what actually matters

This hands-on comparison makes the power of prompt engineering immediately tangible for participants.