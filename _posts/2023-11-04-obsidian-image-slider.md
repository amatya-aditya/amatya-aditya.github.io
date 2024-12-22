---
title: A Cool way to handle Images in your Research Notes.
thumbnail: assets/images/obsidian-image-slider.png
description: Make your research notes fun and efficient in obsidian.
date: 2023-11-04
author: Aditya A
layout: post
categories:
    - coding
tags:
    - obsidian-plugin

permalink: /obsidian-image-slider/

---




Make your research notes fun and efficient in obsidian. With this plugin, you can create beautiful image sliders in your Obsidian notes.

This plugin allows to display multiple images in a single space, and swipe through them horizontally. This way, you can group similar images together, save space, and make your notes more organized and attractive.



You can find the GitHub repository for this plugin [Obsidian-image-slider-releases](https://github.com/amatya-aditya/obsidian-image-slider/releases).



<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0"  style="text-align: center;" >
        <iframe width="560" height="315" src="https://www.youtube.com/embed/4K93y2C2Mbo?si=WY-fDtpeqv0H-_YE&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
</div>

## Installation
To use this plugin, you need to install it manually, as it is not available in the Obsidian community plugins list yet. Here are the steps to install and use this plugin:

I. Using BRAT Plugin Find more about BRAT Plugin

1. Install BRAT from the Community Plugins in Obsidian
2. Get the link to the GitHub repository you want to test. The plugin developer can provide you with this link. It will look something like: (https://github.com/amatya-aditya/obsidian-image-slider/releases)
3. Open the command palette and run the command BRAT: Add a beta plugin for testing (If you want the plugin version to be frozen, use the command BRAT: Add a beta plugin with frozen version based on a release tag.)
4. Using the link from step 2, copy that into the modal that opens up
5. Click on Add Plugin -- wait a few seconds and BRAT will tell you what is going on
6. After BRAT confirms the installation, in Settings go to the Community plugins tab.
7. Refresh the list of plugins
8. Find the beta plugin you just installed and Enable it.

II. Manual process

1. Navigate to the releases tab Obsidian Image Slider
2. Download the main.js, mainfest.ts and styles.css of the latest releases.
3. Navigate to the directory of obsidian plugin inside your vault. It should look like this: .obsidian/plugins
4. Create a new folder and rename it as obsidian-image-slider inside the plugin folder and move those three files into that folder.
5. Refresh the list of plugins, find the Image slider in that list, and finally enable it.


## Usuage

It can be used for both local as well as for images from internet. 

For local images, you can use it as follows:

```image-slider-8
![[Pasted image 20231103120023.png]]
![[Pasted image 20231103120114.png]]
![[Pasted image 20231103120044.png]]
![[Pasted image 20231103170316.png]]
![[Pasted image 20231103120114.png]]
![[Pasted image 20231104163420.png]]
![[Pasted image 20231104163429.png]]
![[Pasted image 20231104163453.png]]
```
For images from the internet, you can use it as follows:

```image-slider-5
![](https://picsum.photos/id/1/200/300)
![](https://picsum.photos/id/2/200/300)
![](https://picsum.photos/id/3/200/300)
![](https://picsum.photos/id/4/200/300)
![](https://picsum.photos/id/5/200/300)
```

The number '5' means it can show 5 images. You can put 20 images at most in single code-block.

## Roadmap:

- Using next and previous button to navigate in between the images
- Using dot like slide-controllers for jumping to exact images you're looking for.
- Image captions
- Overlay text on images
- Try it out and let me know what you think!



