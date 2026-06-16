---
layout: page
title: Projects
permalink: /projects/
description:
nav: true
nav_order: 1
display_categories: [Solid Mechanics, Thermofluid Systems, Machine Elements, Mechanisms, Design]
horizontal: false
---

<!-- pages/projects.md -->

<div class="notes-intro">
    <!-- <p class="notes-intro__lead">Design, simulation, and engineering projects. My current PhD research is documented in <a href="{{ '/publications/' | relative_url }}">Publications</a> and <a href="{{ '/research-notes/' | relative_url }}">Notes</a>.</p> -->
</div>

{%- comment -%} Split projects: personal = `stage: personal`, everything else is treated as undergraduate {%- endcomment -%}
{%- assign personal_projects = site.projects | where_exp: "p", "p.stage == 'personal'" | sort: "importance" | reverse -%}
{%- assign undergrad_projects = site.projects | where_exp: "p", "p.stage != 'personal'" | sort: "importance" | reverse -%}

<!-- Personal projects -->
<section class="projects-stage">
  <header class="stage-head">
    <h2 class="stage-head__title">Personal Projects</h2>
    <p class="stage-head__note">Things I build out of personal interest — plugins, software, and computational-mechanics experiments.</p>
  </header>

  {%- if personal_projects.size > 0 -%}
    {%- assign sorted_projects = personal_projects -%}
    {% include projects.liquid %}
  {%- else -%}
    <div class="stage-empty">
      <p>New projects are on the way — check back soon.</p>
    </div>
  {%- endif -%}
</section>

<!-- Undergraduate projects -->
<section class="projects-stage">
  <header class="stage-head">
    <h2 class="stage-head__title">Undergraduate Projects <span class="stage-head__years">2015 – 2019</span></h2>
    <p class="stage-head__note">Design and simulation work from my bachelor's in Mechanical Engineering. Earlier projects, kept here for the record.</p>
  </header>

  {%- if site.enable_project_categories and page.display_categories %}
    <div class="blog__categories">
      <div class="container">
        <div class="button-group filter-button-group text-center" style="margin-bottom: 40px">
          <a class="all-link btn btn-sm btn-primary active" href="#">All</a>
          {%- for category in page.display_categories %}
            <a class="category-link btn btn-sm btn-primary" data-category=".{{ category | downcase }}" href="#">{{ category | replace: "-", " " }}</a>
          {%- endfor %}
        </div>
      </div>
    </div>
  {%- endif -%}

  {%- assign sorted_projects = undergrad_projects -%}
  {% include projects.liquid %}
</section>
