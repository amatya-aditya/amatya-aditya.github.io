---
layout: post 
title: Strain Transformation 1
img: assets/images/ansys-simulation/wheel-rim/1 b.png
pdf: FixedWinguav.pdf
description: 
date:  2024-12-19
categories:
  - Solid Mechanics
Category: Solid Mechanics
tags:
 - Strain
images:
  compare: true
  slider: true
subject: Solid Mechanics
chapter-index: 1
chapter-navigation: true
toc:
  sidebar: right
---

When an object is exposed to the bending load, it experiences both bending stress and transverse shear stress. In this article, we are discussing transverse shear stress in detail.

Contents:

1.  What is Transverse shear stress?
2.  Transverse shear stress formula:
3.  Derivation:
4.  Formulae for simple geometrical shapes:
    1.  1\] For rectangular cross-section:
    2.  2\] For circular section:-
5.  How to find Transverse shear stress?
6.  How to calculate maximum transverse shear stress?
7.  Transverse shear stress vs shear stress:
8.  Transverse shear stress examples:

**Transverse shear stress is the resistance force developed per unit cross-sectional area by an object to avoid transverse shear deformation (splitting of the layers). It arises due to the application of bending load over the object and acts along the longitudinal layers of the object.**

![slipping of the layers of the beam](https://mechcontent.com/wp-content/uploads/2023/02/slipping-of-the-layers-of-the-beam.webp?ezimgfmt=rs:313x283/rscb3/ng:webp/ngcb3)

As shown in figure A, consider a simply supported beam consisting of a number of layers.

As shown in figure B, if these layers are free to move over each other, then due to the application of bending load, the adjacent layers will move over each other.

This type of deformation is known as Transverse shear.

But in the actual situation, all the layers are bonded together and each layer tries to resist the slipping of its adjacent layer. Thus the object develops a resistance to avoid the transverse shear.

Therefore the transverse shear stress is the resistance developed by the object to resist the shearing (or splitting) of layers of an object due to bending.

![Transverse shear stress distribution over rectangular shape](https://mechcontent.com/wp-content/uploads/2023/02/transverse-shear-stress-distribution-over-rectangular-shape.webp?ezimgfmt=rs:396x230/rscb3/ng:webp/ngcb3)

The above figure shows an example of the distribution of transverse shear stress along the cross-section of an object. The value of transverse shear stress is minimum at the extreme fibers (Outermost fiber).

Transverse shear stress formula:
--------------------------------

The transverse shear stress at any layer of the cross-section (line xy in figure) can be given by,

τ\=FAy¯Ib

![centroid of shaded portion from NA](https://mechcontent.com/wp-content/uploads/2023/02/centroid-of-shaded-portion-from-na.webp?ezimgfmt=rs:367x200/rscb3/ng:webp/ngcb3)

Where,  
F = Shear force  
Aȳ = Moment of area of the area above XY line about Neutral axis  
b = Width of the layer where shear stress has to find  
I = Moment of inertia about the neutral axis

The formula can be also written as,

τ\=FQIb ——\[∵ Q = Ay¯\]

Derivation:
-----------

The below figure shows the simply supported beam subjected to the UDL (uniformly distributed load) and its bending moment diagram.

![BMD for beam with UDL](https://mechcontent.com/wp-content/uploads/2023/02/bmd-for-beam-with-udl.webp?ezimgfmt=rs:299x302/rscb3/ng:webp/ngcb3)

As shown in the figure, consider a smaller section of the beam 1-2 of length dx.

As shown in the bending moment diagram, over the length ‘dx’, the bending moment is increasing by a smaller extent dM.

Thus the bending moment acting on each section of a small element can be drawn as follows,

![forces on small length of beam](https://mechcontent.com/wp-content/uploads/2023/02/forces-on-small-length-of-beam.webp?ezimgfmt=rs:585x220/rscb3/ng:webp/ngcb3)

Consider an elemental cross-sectional area dA at a distance y from the neutral axis.

For the above figure, the bending stress acting on elemental cross-sectional area at a distance y from the neutral axis can be given by,

At section 1:-

σ1\=MyI

As section 2:-

σ2\=(M+dM)yI

Where I = Moment of inertia about Neutral axis.

Due to the bending stress, a force acting on the area dA at sections 1 and 2 can be given by,

![small length of beam](https://mechcontent.com/wp-content/uploads/2023/02/small-length-of-beam.webp?ezimgfmt=rs:584x228/rscb3/ng:webp/ngcb3)

At section 1,

F1\=σ1×dA\=MyI.dA

At section 2,

F2\=σ2×dA\=(M+dM)yI.dA

From the above equations, it can be concluded that, F<sub>2</sub> > F<sub>1</sub>

This difference between forces F<sub>1</sub> and F<sub>2</sub> acts as shear force acting on the elemental area dA.

![splitting of layers by transverse shear force](https://mechcontent.com/wp-content/uploads/2023/02/splitting-of-layers-by-transverse-shear-force.webp?ezimgfmt=rs:412x297/rscb3/ng:webp/ngcb3)

∴ Net shear force acting on portion dA is given by,

dFT. shear\=F2\-F1

dFT. shear\=\[(M+dM)yI.dA\]–\[MyI.dA\]

dFT. shear\=dMyI.dA

Total shear force is given by,

FT. shear\=∫dMyI.dA

FT. shear\=dMI∫y.dA

As ∫y.dA = Q = Moment of area of section above line XY. Thus the equation will become,

FT. shear\=dMQI

The resisting area for the transverse shear force is given by,

AT. shear\=l×b

Thus the shear stress developed in the object due to the shear force is given by,

τ\=FT. shearAT. shear

τ\=dM.QIl.b

τ\=dMl.QIb

As dMl = (Momentdistance) = F = shear force, thus the equation will become,

τ\=F.QIb

This is the equation of transverse shear stress at a distance y from the neutral axis.

As Q = A x y, the equation can also be written as,

τ\=FA.yIb

Formulae for simple geometrical shapes:
---------------------------------------

Here we have derived equations for the transverse shear stress for some simple shapes.

### 1\] For rectangular cross-section:
#### 1\] For rectangular cross-section:

![rectangle with stress distribution](https://mechcontent.com/wp-content/uploads/2023/02/rectangle-with-stress-distribution.webp?ezimgfmt=rs:535x228/rscb3/ng:webp/ngcb3)

For above cross-section, the transverse shear stress at layer xy can be given by,

τxy\=FA.y¯Ib

Where,  
A = Area above layer XY  
ȳ = Position of the centroid of the shaded area (A) from neutral axis  
I = Moment of inertia of rectangle about neutral axis = bd312

Thus the τxy becomes,

τxy\=12F(Ay¯)b2d3

**Maximum transverse shear stress:**

![half shaded rectangle](https://mechcontent.com/wp-content/uploads/2023/02/half-shaded-rectangle.webp?ezimgfmt=rs:393x222/rscb3/ng:webp/ngcb3)

For a rectangle, the maximum transverse shear stress is developed at the neutral axis,

The area above the neutral axis is given by,

A = b×d2\=bd2

The distance between the centroid of the shaded area from the neutral axis is given by,

y¯\=d4

Thus by putting these values, the equation for maximum transverse shear stress becomes,

τxy\=3F2bd

### 2\] For circular section:-

![circle with shaded portion](https://mechcontent.com/wp-content/uploads/2023/02/circle-with-shaded-portion.webp?ezimgfmt=rs:304x229/rscb3/ng:webp/ngcb3)

For the circular section, the moment of area (Aȳ) for the area above line XY can be calculated as,

Aȳ = 23(R2–y2)32

Where,  
y = Distance of layer from Neutral axis  
R = Radius of circle

Thus by putting Aȳ in the below equation, we can find the transverse shear stress at line XY.

τxy\=FAy¯Ib

**Maximum transverse shear stress:-**

![circle with half shaded portion](https://mechcontent.com/wp-content/uploads/2023/02/circle-with-half-shaded-portion.webp?ezimgfmt=rs:402x256/rscb3/ng:webp/ngcb3)

The maximum transverse shear stress is observed at the neutral axis.

The area above the neutral axis is given by,

A = πR22

The distance between the centroid of the shaded area from the neutral axis is given by,

ȳ = 4R3π

The moment of inertia about the neutral axis is given by,

I = π4R4

And the width at the neutral axis is given by,

b = 2R

Thus the maximum value of transverse shear stress at the Neutral axis is given by,

τmax\=FAy¯Ib

τmax\=F(πR22).(4R3π)(π4R4)×(2R)

τmax\=4F3πR2

How to find Transverse shear stress?
------------------------------------

The transverse shear stress at any location of the beam can be found by using the following steps:-

**Step 1\]** Find the amount of shear force (F) acting on beam at the location.

![triangular section with shaded portion](https://mechcontent.com/wp-content/uploads/2023/02/triangular-section-with-shaded-portion.webp?ezimgfmt=rs:382x234/rscb3/ng:webp/ngcb3)

**Step 2\]** Find the position of the neutral axis for the cross-section.

S**tep 3\]** Find the moment of inertia about the neutral axis (INA).

**Step 4\]** Find first moment of area of the area above the line about the neutral axis (Aȳ)

**Step 5\]** Find the width of a cross-section at a location where shear stress has to be found (b).

**Step 6\]** Find transverse shear stress by using the below formula.

τ\=FA.y¯INAb

How to calculate maximum transverse shear stress?
-------------------------------------------------

The maximum transverse shear stress mostly acts at the position of the neutral axis. The consideration becomes wrong for the beam with a triangular cross-section.

Except for cross-sections with triangles, use the following steps to find the maximum transverse shear stress on the beam with a homogeneous cross-section.

**Step 1\]** Find the maximum shear force (F) acting on the beam.

**Step 2\]** Find the position of the neutral axis of the beam.

**Step 3\]** Find the first moment of area (Aȳ) of the area above the neutral axis about the neutral axis.

![rectangle with half portion shaded](https://mechcontent.com/wp-content/uploads/2023/02/rectangle-with-half-portion-shaded.webp?ezimgfmt=rs:311x296/rscb3/ng:webp/ngcb3)

**Step 4\]** Find the moment of inertia of the cross-section about the Neutral axis (INA).

**Step 5\]** Find the width of the cross-section at the neutral axis.

**Step 6\]** Find maximum shear stress by using the below formula,

τmax\=FA.y¯INAb

**Note:**

In the case of the beam with a ‘+’ or ‘H’ shape cross-section, if the neutral axis lies at the portion of higher width, then we need to compare the transverse shear stress at the following two locations for getting the maximum value.

a\] At neutral axis  
b\] location near the neutral axis where the width of the beam decreases.

Below is an example of shear stress distribution for a beam with a ‘+’ or ‘H’ shape cross-section.

![Transverse shear stress distribution for H and + shaped cross-section beams](https://mechcontent.com/wp-content/uploads/2023/02/transverse-shear-stress-distribution-for-h-and-shaped-cross-section-beams.webp?ezimgfmt=rs:697x260/rscb3/ng:webp/ngcb3)

Transverse shear stress vs shear stress:
----------------------------------------

| Sr. No. | Transverse shear stress | Shear stress |
| --- | --- | --- |
| 1 | It results due to the bending load. | It arises due to the direct load. |
| 2 | The force is perpendicular to the shear area. | The force is parallel to the shear area. |
| 3 | The stress value varies across the cross-section. | The stress value is the same across the cross-section. |

Transverse shear stress examples:
---------------------------------

The beam with a T-section is subjected to the maximum shear force of 6 KN. Find the maximum transverse shear stress acting on the beam.

![T section with dimensions](https://mechcontent.com/wp-content/uploads/2023/02/t-section-with-dimensions.webp?ezimgfmt=rs:316x291/rscb3/ng:webp/ngcb3)

**Solution:-**

**Step 1\] Maximum shear force:**

F = 6 KN = 6000 N

**Step 2\] Position of neutral axis:-**

![location of NA on T-section](https://mechcontent.com/wp-content/uploads/2023/02/location-of-na-on-t-section.webp?ezimgfmt=rs:382x241/rscb3/ng:webp/ngcb3)

Divide the cross-section in simple shapes.

The area of each shape is given by,

A<sub>1</sub> = 80 x 20 = 1600 mm²

A<sub>2</sub> = 100 x 20 = 2000 mm²

Position of centroid of each shape is given by,

y1\=802 = 40 mm  
y2\=80+202 = 90 mm

Position of the neutral axis from bottom is given by,

y¯\=A1y1+A2y2A1+A2

y¯\=1600×40+2000×901600+2000

**ȳ = 67.77 mm**

**Step 3\] First moment of area about neutral axis of the area above neutral axis:**

![T section shaded above neutral axis](https://mechcontent.com/wp-content/uploads/2023/02/t-section-shaded-above-neutral-axis.webp)

The moment of area about neutral axis is given by,

Q = Aȳ = \[(20 x 12.23) x 6.11\] + \[(100 x 20) x 22.23\]

**Aȳ = 45954.506 mm³**

Step 4\] Moment of inertia about neutral axis (INA)**:**

![T beam cross-section with numbers](https://mechcontent.com/wp-content/uploads/2023/02/t-beam-cross-section-with-numbers.webp)

Moment of inertia of section 1 about a neutral axis is given by,

I1NA\=I1+A1(y1\-y¯)2

I1NA\=20×80312+1600(40\-67.77)2

I1NA **= 2087210 mm⁴**

Moment of inertia of section 2 about a neutral axis is given by,

I2NA\=I2+A2(y2\-y¯)2

I2NA\=100×20312+2000(90\-67.77)2

I2NA **\= 1055012.46 mm⁴**

Total moment of inertia about a neutral axis is given by,

INA\=I1NA+I2NA

INA = 2087210 + 1055012.46

INA **= 3142222.46 mm⁴**

**Step 5\] Width at the neutral axis,**

**b = 20 mm**

**Step 6\] Maximum transverse shear stress,**

τmax\=FAy¯INAb

τmax\=6000×45954.5063142222.46×20

τmax = 4.38 N/mm<sup>2</sup>

**This is the maximum value of shear stress into the beam.**

**FAQs:**

1.  **Why transverse shear stresses are generated?**
    
    Transverse shear stress causes because of the bending load acting on the object.
    
2.  **Where is the maximum transverse shear stress found?**
    
    For most of the cross-sections, the maximum transverse shear stress acts at the neutral axis. (except triangular cross-section, it has a maximum value at mid of height).
    
3.  **How transverse shear stress differs** from **shear stress?**
    
    In transverse shear stress, the deformation occurs perpendicular to the direction of the applied force while in shear stress, the deformation occurs parallel to the direction of the applied force.
