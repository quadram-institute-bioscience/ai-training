---
layout: page
title: Blog Archive
permalink: /blog/
---

<div class="post-list">
  {% for post in site.posts %}
    <article class="post-preview">
      <h2 class="heading-m">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      
      <p class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %-d, %Y" }}
        </time>
        {% if post.categories.size > 0 %}
          • 
          {% for category in post.categories %}
            <span class="post-category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        {% endif %}
      </p>
      
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>
      
      <p>
        <a href="{{ post.url | relative_url }}">Continue reading</a>
      </p>
    </article>
  {% endfor %}
</div>