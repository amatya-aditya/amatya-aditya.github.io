---
layout: page
title: Projects
permalink: /projects/
description: A growing collection of my projects.
nav: true
nav_order: 1
display_categories: [Undergraduate, Python, Mini]
horizontal: false
---

<!-- pages/projects.md -->


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
  {%- assign sorted_projects = site.projects | sort: "importance" | reverse %}
  <!-- Generate cards for each project -->
    
      {% include projects.liquid %}
</div>