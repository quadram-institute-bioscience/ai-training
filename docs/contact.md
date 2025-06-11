---
layout: page
title: Contact
permalink: /contact/
---

Feel free to reach out if you have any questions or comments.

## Ways to connect

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [github.com/username](https://github.com/username)
- **Twitter**: [@username](https://twitter.com/username)

Or use the form below:

<div class="contact-form">
  <form action="#" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <div class="form-group">
      <button type="submit">Send Message</button>
    </div>
  </form>
</div>

<style>
  .contact-form {
    margin-top: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #b1b4b6;
    font-size: 1rem;
    font-family: inherit;
  }
  
  input:focus, textarea:focus {
    outline: 3px solid #ffdd00;
    box-shadow: 0 0 0 3px #ffdd00;
  }
  
  button {
    background-color: #1d70b8;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #003078;
  }
  
  button:focus {
    outline: 3px solid #ffdd00;
    box-shadow: 0 0 0 3px #ffdd00;
  }
</style>

**Note**: The contact form above is for demonstration purposes. To make it functional, you'll need to add backend processing.