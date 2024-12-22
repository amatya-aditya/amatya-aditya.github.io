---
layout: post
title: 2D Mohr's Circle
description: Mohr's Circle is a valuable tool in material mechanics that visualizes stress components in a material subjected to loads.
img: assets/images/python/2dmohrscircle.png
importance: 1
category: Mathematics, computational mechanics, programming
related_publications: true
tags:
 - Solid Mechanics
date:  2022-02-18
images:
  compare: true
  slider: true
---

Understanding stress and strain in materials is crucial in various engineering disciplines. Mohr's Circle, a graphical representation, helps visualize stress components within materials. 

<div>
<object data="{{ site.url }}{{ site.baseurl }}/images/python/2d-mohrs-circle.gif" width="100%" height="100%" type="image/gif"></object>
</div>

```python

import PySimpleGUI as sg
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np

def create_mohrs_circle(sigma_x, sigma_y, tau_xy):
    center = (sigma_x + sigma_y) / 2
    radius = np.sqrt(((sigma_x - sigma_y) / 2) ** 2 + tau_xy ** 2)
    

    angle = np.linspace(0, 2 * np.pi, 200)
    x = center + radius * np.cos(angle)
    y = radius * np.sin(angle)

    return x, y, center, radius

layout = [
    [sg.Text('Sigma X'), sg.Slider((-100, 100), default_value=50, orientation='h', size=(20, 10), key='-SIGMAX-'),
     sg.Text('Sigma Y'), sg.Slider((-100, 100), default_value=20, orientation='h', size=(20, 10), key='-SIGMAY-'),
     sg.Text('Tau XY'), sg.Slider((-100, 100), default_value=10, orientation='h', size=(20, 10), key='-TAUXY-')],
    [sg.Canvas(key='-CANVAS-', size=(400, 400), background_color='#40516c'),
     sg.Table(values=[['', '', '', '']], headings=['Important Results ', 'Values'], auto_size_columns=True,
              num_rows=7, justification='center', key='-TABLE-', background_color='#40516c')],
    
]

window = sg.Window('Mohr\'s Circle', layout, finalize=True)

sigma_x = 50
sigma_y = 20
tau_xy = 10
x, y, center, radius = create_mohrs_circle(sigma_x, sigma_y, tau_xy)
sigma_1 = center + radius  
sigma_2 = center - radius  

fig, ax = plt.subplots(figsize=(4, 4), facecolor='#40516c')
ax.set_xlim(center - 60, center + 60)
ax.set_ylim(-radius - 10, radius + 10)
ax.grid(True)

fig_canvas_agg = FigureCanvasTkAgg(fig, window['-CANVAS-'].TKCanvas)
fig_canvas_agg.draw()
fig_canvas_agg.get_tk_widget().pack(side='top', fill='both', expand=1)

while True:
    event, values = window.read(timeout=100)

    if event == sg.WIN_CLOSED:
        break

    sigma_x = values['-SIGMAX-']
    sigma_y = values['-SIGMAY-']
    tau_xy = values['-TAUXY-']

    x, y, center, radius = create_mohrs_circle(sigma_x, sigma_y, tau_xy)

    ax.clear()
    ax.plot(x, y, color='black')
    ax.plot([sigma_x, sigma_y], [-tau_xy, tau_xy], 'ko')  
    ax.plot(center, 0, 'ko')  
    ax.plot([sigma_1, sigma_2], [0, 0], 'ko')   
    ax.plot([center, center], [radius, -radius], 'ko')  
    ax.text(sigma_x, -tau_xy, 'σx, -τxy', ha='right', va='bottom', color='black', fontsize=9)  
    ax.text(sigma_y, tau_xy, 'σy, τxy', ha='right', va='top', color='black', fontsize=9)  
    ax.text(sigma_1, 0, f" σ1 = {sigma_1:.2f}", ha='right', va='bottom', color='black', fontsize=9)  
    ax.text(sigma_2, 0, f" σ2 = {sigma_2:.2f}", ha='left', va='top', color='black', fontsize=9)  
    ax.text(center, radius, f" τmax = {radius:.2f}", ha='right', va='bottom', color='black', fontsize=9)  
    ax.text(center, -radius, f" τmin = {-radius:.2f}", ha='right', va='bottom', color='black', fontsize=9)  
    ax.text(center, 0, f" C ({center:.2f}, 0)", ha='left', va='top', color='black', fontsize=9)  #

   
    ax.fill_between([sigma_x, sigma_y, center], [-tau_xy, tau_xy, 0], color='lightgreen', alpha=0.5)
    ax.fill_between([sigma_y, sigma_x, center], [tau_xy, -tau_xy, 0], color='lightgreen', alpha=0.5)

    
    ax.plot([sigma_x, sigma_x], [-tau_xy, 0], 'k-')
    ax.plot([sigma_y, sigma_y], [tau_xy, 0], 'k-')
    ax.plot([center, center], [0, 0], 'k--')
    ax.plot([sigma_1, sigma_2], [0, 0], 'k-')
    ax.plot([center, center], [radius, -radius], 'k-')
    ax.plot([sigma_x, sigma_y], [-tau_xy, tau_xy], 'k-')


    angle_rad = (np.arctan((2 * tau_xy) / (sigma_x - sigma_y)))/2
    angle_deg = np.degrees(angle_rad)
    ax.text(center - 8, 2, f'θₚ₂: {angle_deg:.2f}°', color='black')

    ax.set_title("Mohr's Circle")
    ax.set_xlabel("Normal Stress", fontsize=9)
    ax.set_ylabel("Shear Stress", fontsize=9)
    ax.grid(True, linestyle='--', color='black')  
    ax.set_facecolor('#40516c')
    
    plt.tight_layout()
    sigma_1 = center + radius
    sigma_2 = center - radius
    max_shear_stress = (sigma_1 - sigma_2) / 2
    
    
    table_data = [['Max. Principal Stress', f"{sigma_1:.2f}"],
                  ['Min. Principal Stress', f"{sigma_2:.2f}"],
                  ['Max. Shear Stress', f"{max_shear_stress:.2f}"],
                  ['Min. Shear Stress', f"{-max_shear_stress:.2f}"],
                  ['σ_avg', f"{center:.2f}"]
                  ]
    window['-TABLE-'].update(values=table_data)

   
    fig_canvas_agg.draw_idle()

window.close()

```
