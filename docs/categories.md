---
layout: page
title: Categories
permalink: /categories/
---

<div class="category-list">
  {% assign categories = site.categories | sort %}
  {% for category in categories %}
    <h2 id="{{ category[0] | slugify }}">{{ category[0] }}</h2>
    <ul class="post-list">
      {% for post in category[1] %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <small class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</small>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>