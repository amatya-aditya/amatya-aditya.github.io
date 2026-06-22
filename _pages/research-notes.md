---
layout: page
title: Notes
permalink: /research-notes/
description: 
nav: true
nav_order: 3
display_categories: [Mathematics, Solid Mechanics, Computational Mechanics, Numerical Methods, Fracture Mechanics, Finite Element Methods]
---

<!-- pages/research-notes.md -->

<div class="notes-intro">
  <p class="notes-intro__lead">Personal summaries from the books and articles I read: key ideas, principles, derivations, formulas, and worked examples from my studies.</p>
</div>

{%- assign sorted_research = site.research-notes | sort: "importance" | reverse %}

{%- if sorted_research.size > 0 -%}
<div class="blog__categories">
  <div class="container">

  {%- if site.enable_project_categories and page.display_categories %}
    <div class="button-group filter-button-group note-filters">
      <a class="all-link note-filter active" href="#">All</a>
      {%- for category in page.display_categories %}
        <a class="category-link note-filter" data-category=".{{category | downcase}}" href="#">{{category | replace: "-", " "}}</a>
      {%- endfor %}
  </div>
</div>
  {%- endif -%}

  {% assign categories = "" %}
  {%- for category in page.display_categories %}
    {% assign categories = categories | append: category | append: " " %}
  {%- endfor %}

  <!-- Generate cards for each note -->
  {% include research_notes.liquid %}
</div>
{%- else -%}
<div class="stage-empty">
  <p>Work in progress — notes are being written and will appear here soon.</p>
</div>
{%- endif -%}
