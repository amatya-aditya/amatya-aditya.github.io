---
layout: page
title: Research Notes
permalink: /research-notes/
description: 
nav: true
nav_order: 3
display_categories: [Mathematics, Solid Mechanics, Computational Mechanics, Numerical Methods, Fracture Mechanics, Finite Element Methods]
---

<!-- pages/projects.md -->

<h4 style = "font-weight:500;text-align:center;padding-bottom:8px;"> Engineering Insights: Study Notes and Conceptual Summaries </h4>

<p style = "text-align:center;padding-bottom:8px;"> These research notes are like my personal summaries from different books and articles I've read. They cover important ideas, explanations, basic principles, derivations, formulas and examples from my studies. </p>


<div class="blog__categories">
  <div class="container">

  {%- if site.enable_project_categories and page.display_categories %}
    <div class="button-group filter-button-group text-center" style="margin-bottom: 40px">
      {%- for category in page.display_categories %}
        <a class="category-link btn btn-sm btn-primary" data-category=".{{category | downcase}}" href="#">{{category | replace: "-", " "}}</a>
      {%- endfor %}
      <a class=" all-link btn btn-sm btn-primary active" href="#">All</a> 
  </div>
</div>
  {%- endif -%}



  {% assign categories = "" %}
  {%- for category in page.display_categories %}
    {% assign categories = categories | append: category | append: " " %}
  {%- endfor %}

  <!-- Display categorized projects -->
  {%- assign sorted_research = site.research-notes | sort: "importance" | reverse %}
  <!-- Generate cards for each project -->
    
      {% include research_notes.liquid %}
</div>