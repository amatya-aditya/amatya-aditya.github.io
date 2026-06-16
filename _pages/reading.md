---
layout: page
title: Reading
permalink: /reading/
description:
nav: true
nav_order: 4
---

<!-- pages/reading.md -->

<div class="notes-intro">
  <p class="notes-intro__lead">Books I'm reading, books I've finished, and what I want to read next — with my rating, a few notes, and the occasional full review.</p>
</div>

{%- comment -%} Collect the unique genres present, so chips update automatically as books are added {%- endcomment -%}
{%- assign genre_list = "" -%}
{%- for b in site.reading -%}
  {%- if b.genre and b.genre != "" -%}
    {%- unless genre_list contains b.genre -%}
      {%- assign genre_list = genre_list | append: b.genre | append: "||" -%}
    {%- endunless -%}
  {%- endif -%}
{%- endfor -%}
{%- assign genres = genre_list | split: "||" | sort -%}

<div class="reading-toolbar">
  <div class="button-group filter-button-group note-filters">
    <a class="all-link note-filter active" href="#">All</a>
    {%- for genre in genres %}
      <a class="category-link note-filter" href="#">{{ genre }}</a>
    {%- endfor %}
  </div>

  <details class="sort-menu">
    <summary class="sort-menu__btn">
      <i class="ti ti-arrows-sort" aria-hidden="true"></i>
      <span class="sort-menu__current">Sort by</span>
      <i class="ti ti-chevron-down sort-menu__caret" aria-hidden="true"></i>
    </summary>
    <div class="sort-menu__list">
      <button class="sort-option" data-sort="progress">In progress</button>
      <button class="sort-option" data-sort="completed">Completed</button>
      <button class="sort-option" data-sort="toread">To read</button>
      <button class="sort-option" data-sort="date-desc">Date read (newest)</button>
      <button class="sort-option" data-sort="date-asc">Date read (oldest)</button>
    </div>
  </details>
</div>

{%- assign sorted_books = site.reading | sort: "rating" | reverse %}
{% include reading_books.liquid %}

<script>
  (function () {
    var grid = document.getElementById("book-grid");
    if (!grid) return;
    var menu = document.querySelector(".sort-menu");

    function epoch(el) {
      var v = el.getAttribute("data-finished");
      return v ? parseInt(v, 10) : null;
    }
    function statusRank(el, order) {
      var s = el.getAttribute("data-status") || "read";
      var i = order.indexOf(s);
      return i === -1 ? order.length : i;
    }
    function byDate(dir) {
      return function (a, b) {
        var x = epoch(a), y = epoch(b);
        if (x === null && y === null) return 0;
        if (x === null) return 1; // undated sinks to the bottom
        if (y === null) return -1;
        return dir === "asc" ? x - y : y - x;
      };
    }

    var sorters = {
      progress: function (a, b) { return statusRank(a, ["reading", "want", "read"]) - statusRank(b, ["reading", "want", "read"]); },
      completed: function (a, b) { return statusRank(a, ["read", "reading", "want"]) - statusRank(b, ["read", "reading", "want"]); },
      toread: function (a, b) { return statusRank(a, ["want", "reading", "read"]) - statusRank(b, ["want", "reading", "read"]); },
      "date-desc": byDate("desc"),
      "date-asc": byDate("asc"),
    };

    function applySort(key) {
      var cards = Array.prototype.slice.call(grid.children);
      cards.sort(sorters[key]);
      cards.forEach(function (c) { grid.appendChild(c); });
    }

    document.querySelectorAll(".sort-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".sort-option").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        applySort(btn.getAttribute("data-sort"));
        var label = menu.querySelector(".sort-menu__current");
        if (label) label.textContent = btn.textContent;
        if (menu) menu.removeAttribute("open");
      });
    });

    // Close the dropdown on an outside click
    document.addEventListener("click", function (e) {
      if (menu && menu.hasAttribute("open") && !menu.contains(e.target)) {
        menu.removeAttribute("open");
      }
    });
  })();
</script>
