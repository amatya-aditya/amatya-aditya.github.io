---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 2
cv_pdf: CV_Aditya_Amatya.pdf
description: 
---
<!--This is a description of the page. You can modify it in '_pages/cv.md'. You can also change or remove the top pdf download button. Use cv as layout for customized cv page and edit the cv.yml  -->

<!-- <embed src="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}" width="500" height="60075" type="application/pdf"> -->

<a
            href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}"
            target="_blank"
            rel="noopener noreferrer"
            class="float-right"
            ><i class="fa-solid fa-file-pdf"></i> Updated on March, 2024 </a>

<br>


<div class="resume-pdf">
    <object data="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}" width="100%" height="825" type="application/pdf"></object>
</div>

<!-- <iframe class="resume-pdf"  
    width="100%" 
    height="825" 
    src="{{ site.url }}{{ site.baseurl }}/assets/pdf/CV_Aditya_Amatya.pdf"> 
</iframe>  -->

