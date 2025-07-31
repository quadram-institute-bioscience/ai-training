---
title: Limitations of LLMs
---

## Limitations of LLMs

### A first clear example

While Large Language Models are powerful tools, they have significant limitations that users must understand to use them effectively and responsibly.

Consider this prompt and try to answer yourself:

![A prompt]({{ site.baseurl }}/{% link img/5-prompt.png %})


This is the answer that an old version of ChatGPT gave:

![A solution (wrong)]({{ site.baseurl }}/{% link img/5-gpt.png %})


**Why is that?**

Let's focus on a key aspect: LLMs are trained on a vast amount of text. Including this common HR riddle:

> Four people need to cross a rickety bridge at night. **They have only one flashlight and the bridge can only hold two people at a time.** 
The four people walk at different speeds: one can cross the bridge in 1 minute, another in 2 minutes, the third in 5 minutes, and the slowest in 10 minutes. When two people cross the bridge together, they must go at the slower person’s pace. The speed of two people crossing a bridge together is limited by the speed of the slower person.

:bulb: **training data effect:** imagine someone who has read a lot of puzzle books and is really good at remembering the answers. But if you slightly change the puzzle—or ask them to show their work—they might still give a “familiar” answer that doesn’t fit perfectly.

:construction: Work in progress