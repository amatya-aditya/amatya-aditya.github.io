---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 2
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---
<div class="post">

<link rel="stylesheet" href="{{site.baseurl}}/assets/blog-css/blog.css">

<!-- Blog Header -->
{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}
<div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h5>{{ site.blog_description }}</h5>
</div>
{% endif %}

<!-- Categories and Tags -->


{% if site.display_tags or site.display_categories %}

  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts">
{% assign is_even = featured_posts.size | modulo: 2 %}
<div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
{% for post in featured_posts %}
<div class="card-item col">
<a href="{{ post.url | relative_url }}">
<div class="card hoverable">
<div class="row g-0">
<div class="col-md-12">
<div class="card-body">
<div class="float-right">
<i class="fa-solid fa-thumbtack fa-xs"></i>
</div>
<h3 class="card-title text-lowercase">{{ post.title }}</h3>
<p class="card-text">{{ post.description }}</p>
            <!-- Read Time -->
	                {% if post.external_source == blank %}
	                	{% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
  	                {% else %}
	                	{% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
  	                {% endif %}
  	                {% assign year = post.date | date: "%Y" %}

                        <p class="post-meta">
                        {{ read_time }} min read &nbsp; &middot; &nbsp;
                        <i class="ti-solid ti ti-calendar"></i> {{ post.date | date: '%B %d, %Y' }}
                        {% if post.external_source %}
                        &nbsp; &middot; &nbsp; {{ post.external_source }}
                        {% endif %}


                          {% if categories != "" %}
                          &nbsp; &middot; &nbsp; 
                            {% for category in post.categories %}
                            <a href="{{ category | slugify | prepend: '/blog/category/' | prepend: site.baseurl}}">
                               <i class="fa-solid fa-hashtag fa-sm"></i> {{ category }}</a> &nbsp;
                              {% endfor %}
                          {% endif %}
	                    </p>

                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
      </div>
    </div>
    <hr>

{% endif %}

<!-- Latest Featured Posts -->

{% if paginator.page == 1 %}

<div class="row pt-4">
    {% assign latest_post = site.posts[0] %}
    <div class="col-md-6">
        <div class="border-0 mb-4 box-shadow">
            <a href="{{site.baseurl}}{{latest_post.url}}">
                <div class="topfirstimage" style="background-image: url({% if latest_post.image contains "://" %}{{ latest_post.image }}{% else %} {{site.baseurl}}/{{ latest_post.image }}{% endif %}); height: 45vh; background-size: cover; background-repeat: no-repeat;"></div>
            </a>
            <div class="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 class="h4 font-weight-bold">
                    <a class="text-dark" href="{{site.baseurl}}{{latest_post.url}}">{{ latest_post.title }}</a>
                </h2>
                <p class="excerpt">
                    {{ latest_post.excerpt | strip_html | strip_newlines | truncate: 136 }}
                </p>
                    <!-- Read Time -->
	                        {% if latest_post.external_source == blank %}
	                        	{% assign read_time = latest_post.content | number_of_words | divided_by: 180 | plus: 1 %}
  	                        {% else %}
	                        	{% assign read_time = latest_post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
  	                        {% endif %}
  	                        {% assign year = latest_post.date | date: "%Y" %}
	                <p class="post-meta">
                        {{ read_time }} min read &nbsp; &middot; &nbsp;
                        <i class="ti-solid ti ti-calendar"></i> {{ latest_post.date | date: '%B %d, %Y' }}
                        {% if latest_post.external_source %}
                        &nbsp; &middot; &nbsp; {{ latest_post.external_source }}
                        {% endif %}
                          {% if categories != "" %}
                          &nbsp; &middot; &nbsp; 
                            {% for category in latest_post.categories %}
                            <a href="{{ category | slugify | prepend: '/blog/category/' | prepend: site.baseurl}}">
                               <i class="fa-solid fa-hashtag fa-sm"></i> {{ category }}</a> &nbsp;
                              {% endfor %}
                          {% endif %}
	                </p>
                
            </div>
        </div>
    </div>

<!-- Loop through the next three posts -->
<div class="col-md-6">
        {% for post in site.posts offset: 1 limit: 3 %}
        <div class="mb-3 d-flex align-items-center">
            {% if post.image %}
            <div class="col-md-4">
                <a href="{{site.baseurl}}{{post.url}}">
                    <img class="w-100" src="{% if post.image contains "://" %}{{ post.image }}{% else %}{{site.baseurl}}/{{ post.image }}{% endif %}" alt="{{ post.title }}">
                </a>
            </div>
            {% endif %}
            <div>
                <h2 class="mb-2 h6 font-weight-bold">
                    <a class="text-dark" href="{{site.baseurl}}{{post.url}}">{{ post.title }}</a>
                </h2>
                <p class="post-meta">
                    {{ read_time }} min read &nbsp; &middot; &nbsp;
                    <i class="ti-solid ti ti-calendar"></i> {{ post.date | date: '%B %d, %Y' }}
                    {% if post.external_source %}
                    &nbsp; &middot; &nbsp; {{ post.external_source }}
                    {% endif %}
                </p>
                <p class="post-tags">

                      {% if categories != "" %}
                        {% for category in post.categories %}
                        <a href="{{ category | slugify | prepend: '/blog/category/' | prepend: site.baseurl}}">
                           <i class="fa-solid fa-hashtag fa-sm"></i> {{ category }}</a> &nbsp;
                          {% endfor %}
                      {% endif %}
	            </p>
                
            </div>
        </div>
        {% endfor %}
    </div>
</div>
<hr>
{% endif %}


<!-- All Posts -->
<div class="row mt-3">
    <div class="col-md-8 main-loop">
        <h4 class="font-weight-bold spanborder"><span>All Stories</span></h4>
        {% if page.pagination.enabled %}
            {% assign postlist = paginator.posts %}
        {% else %}
            {% assign postlist = site.posts %}
        {% endif %}
        {% for post in postlist %}
            {% include blog-includes/main-loop-card.html %}
        {% endfor %}
    </div>
    <div class="col-md-4">
        {% include blog-includes/sidebar-featured.html %}
    </div>
</div>

<hr>

<!-- Pagination -->
{% if page.pagination.enabled %}
    {% include pagination.liquid %}
{% endif %}

</div>
