/*******************************************************************************
 * Hero FEM field — a self-contained <canvas> animation for the about-page
 * banner. Three layers, all coloured from an animated scalar field through a
 * viridis-style colormap so the whole thing reads like an FEM stress-contour
 * plot:
 *   1. a drifting node network (nodes + proximity links),
 *   2. discrete finite elements of mixed shape — triangles, quads, polygons —
 *      with translucent contour fill, and
 *   3. a DOM layer of governing equations of mechanics & mathematics, in mixed
 *      sizes (some mirrored) that float and dodge the cursor.
 *
 * The cursor acts as a force ("pretext"-style): nodes/elements part around it
 * and nearby equations spring away and settle back.
 *
 * No external dependencies. Respects prefers-reduced-motion, pauses off-screen
 * and when the tab is hidden, and degrades to a static frame / svg fallback.
 ******************************************************************************/

(function () {
  'use strict';

  const banner = document.querySelector('.hero-banner');
  if (!banner) return;
  const canvas = banner.querySelector('.hero-fem');
  const eqLayer = banner.querySelector('.hero-eqns');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');

  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Layer toggles — flip any of these to compare looks.
  //   particles : the node dots
  //   glow      : the soft colour halo around each node
  //   links     : the proximity links (the connected-particle mesh)
  //   elements  : the contour-filled finite-element cells (tria/quad/polygon)
  // e.g. elements:true + particles:false → a pure contour-mesh look.
  const SHOW = {
    particles: true,
    glow: false,
    links: true,
    elements: false,
  };
  const NEEDS_NODES = SHOW.particles || SHOW.glow || SHOW.links || SHOW.elements;

  // --- Contour colormap ------------------------------------------------------
  // Built at runtime from the site accent (CSS var --hero-grad-mid) so the
  // particle/contour colours track $accent. Falls back to teal if unreadable.
  let STOPS = [
    [0.0, [19, 78, 74]],
    [0.22, [15, 118, 110]],
    [0.45, [20, 184, 166]],
    [0.65, [52, 211, 153]],
    [0.82, [163, 230, 53]],
    [1.0, [251, 191, 36]],
  ];

  function parseColor(str) {
    if (!str) return null;
    str = str.trim();
    if (str[0] === '#') {
      let h = str.slice(1);
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      const n = parseInt(h, 16);
      if (isNaN(n)) return null;
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    const m = str.match(/[\d.]+/g);
    return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : null;
  }
  function mixRGB(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }
  // Tonal ramp from the accent: dark accent → accent → light accent.
  function buildAccentStops() {
    const cs = getComputedStyle(banner);
    const acc =
      parseColor(cs.getPropertyValue('--hero-particle-color')) ||
      parseColor(cs.getPropertyValue('--hero-grad-mid')) ||
      parseColor(cs.getPropertyValue('--global-theme-color'));
    if (!acc) return; // keep the teal fallback
    const black = [10, 13, 16];
    const white = [255, 249, 240];
    STOPS = [
      [0.0, mixRGB(acc, black, 0.6)],
      [0.3, mixRGB(acc, black, 0.22)],
      [0.55, acc],
      [0.78, mixRGB(acc, white, 0.32)],
      [1.0, mixRGB(acc, white, 0.62)],
    ];
  }

  function colormap(t) {
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    for (let i = 1; i < STOPS.length; i++) {
      if (t <= STOPS[i][0]) {
        const a = STOPS[i - 1];
        const b = STOPS[i];
        const u = (t - a[0]) / (b[0] - a[0]);
        return [
          Math.round(a[1][0] + (b[1][0] - a[1][0]) * u),
          Math.round(a[1][1] + (b[1][1] - a[1][1]) * u),
          Math.round(a[1][2] + (b[1][2] - a[1][2]) * u),
        ];
      }
    }
    return STOPS[STOPS.length - 1][1];
  }

  // Animated scalar field in [0,1] — a few drifting harmonics blended together.
  function field(x, y, t) {
    const a = Math.sin(x * 0.0065 + t * 0.0004);
    const b = Math.cos(y * 0.009 - t * 0.00031);
    const c = Math.sin((x + y) * 0.004 + t * 0.00022);
    let v = a * 0.5 + b * 0.32 + c * 0.42;
    v = (v + 1.24) / 2.48; // ~normalise to 0..1
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  // --- Equations -------------------------------------------------------------
  // PRIORITY: famous equations always shown and rendered prominently.
  const PRIORITY = [
    'e<sup>iπ</sup> + 1 = 0', // Euler's identity
    'G<sub>μν</sub> + Λg<sub>μν</sub> = (8πG/c⁴) T<sub>μν</sub>', // general relativity
    '(iγ<sup>μ</sup>∂<sub>μ</sub> − m)ψ = 0', // Dirac equation
    'ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v + f', // Navier–Stokes
    '∫<sub>a</sub><sup>b</sup> f′(x) dx = f(b) − f(a)', // fundamental theorem of calculus
    'd/dt(∂L/∂q̇) − ∂L/∂q = 0', // Euler–Lagrange
    'e<sup>a d/dx</sup> f(x) = f(x+a)', // shift operator
    '∬<sub>M</sub> K dA + ∮<sub>∂M</sub> k<sub>g</sub> ds = 2πχ(M)', // Gauss–Bonnet
    '∫<sub>M</sub> dω = ∮<sub>∂M</sub> ω', // generalized Stokes
    '1 = 0.99999999999999', // the fun one
  ];

  // POOL: supporting relations of advanced mechanics & maths (smaller, random).
  const POOL = [
    'σ = Eε',
    'τ = Gγ',
    't = σ·n',
    'q = −k∇T',
    'J = −D∇c',
    'σ = σᵀ',
    '∇²u = 0',
    'ε = Bu',
    'u = Na',
    'Ku = F',
    'p = ρRT',
    '∇⁴φ = 0',
    'σ = ℂ : ε',
    '∇·σ + f = ρü',
    'ε = ½(∇u + ∇uᵀ)',
    'σ<sub>ij</sub> = λε<sub>kk</sub>δ<sub>ij</sub> + 2με<sub>ij</sub>',
    'μ∇²u + (λ+μ)∇(∇·u) + f = 0',
    'σ<sub>vM</sub> = √(½[(σ₁−σ₂)² + (σ₂−σ₃)² + (σ₃−σ₁)²])',
    'K<sub>I</sub> = σ√(πa)',
    'G = K<sub>I</sub>²/E′',
    'σ<sub>f</sub> = √(2Eγ<sub>s</sub>/πa)',
    'da/dN = C(ΔK)<sup>m</sup>',
    'σ<sub>a</sub> = σ′<sub>f</sub>(2N<sub>f</sub>)<sup>b</sup>',
    'Δε<sub>p</sub>/2 = ε′<sub>f</sub>(2N<sub>f</sub>)<sup>c</sup>',
    'J = ∮<sub>Γ</sub>(W n₁ − tᵢ ∂uᵢ/∂x₁) ds',
    'M ü + C u̇ + K u = F(t)',
    '(K − ω²M)φ = 0',
    'K<sup>e</sup> = ∫<sub>Ωe</sub> Bᵀ D B dΩ',
    'M<sup>e</sup> = ∫<sub>Ωe</sub> ρ Nᵀ N dΩ',
    'EI d⁴w/dx⁴ = q(x)',
    'D∇⁴w = q',
    '∫<sub>Ω</sub> σ:δε dΩ = ∫<sub>Ω</sub> b·δu dΩ + ∫<sub>Γ</sub> t·δu dΓ',
    'Π = ½∫<sub>Ω</sub> ε:ℂ:ε dΩ − ∫<sub>Γ</sub> t·u dΓ',
    '∂c/∂t = ∇·(D∇c)',
    'ρc ∂T/∂t = ∇·(k∇T) + Q',
    '∂ρ/∂t + ∇·(ρv) = 0',
    'k = A e<sup>−E<sub>a</sub>/RT</sup>',
    'σ = Eε + ηε̇',
    '∮<sub>∂Ω</sub> F·n dS = ∫<sub>Ω</sub> ∇·F dΩ',
    'd/dt ∫<sub>Ω</sub> φ dV = ∫<sub>Ω</sub> ∂φ/∂t dV + ∮<sub>Γ</sub> φv·n dA',
  ];

  // ---------------------------------------------------------------------------
  let W = 0,
    H = 0,
    dpr = 1;
  let nodes = [];
  let elements = [];
  let eqs = [];
  let linkDist = 130;
  let elemMaxR = 86;
  let elemTimer = 0;
  const mouse = { x: 0, y: 0, active: false };

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Layer 1 — free node network.
  function buildNodes() {
    const target = Math.round((W * H) / 5600);
    const count = Math.max(80, Math.min(150, target));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: rand(-6, 6),
        vy: rand(-6, 6),
        r: rand(1.1, 2.2),
        f: 0,
      });
    }
    linkDist = Math.min(118, Math.max(66, Math.hypot(W, H) / 11));
  }

  // Layer 2 — finite elements built FROM the particles. Each element is a small
  // cluster of neighbouring nodes (3 = triangle, 4 = quad, 5/6 = polygon) whose
  // vertices ARE the drifting particles, so the cells deform with the network
  // like a real mesh instead of being independent shapes.
  function buildElements() {
    const target = Math.round((W * H) / 9000);
    const count = Math.max(10, Math.min(64, target));
    // Weighted toward triangles & quads, with the odd pentagon / hexagon.
    const sidesPool = [3, 3, 3, 4, 4, 4, 4, 5, 6];
    // Cap how large a cell may be so elements stay local & tidy.
    elemMaxR = Math.max(54, Math.min(86, Math.min(W, H) * 0.38));
    const maxR2 = elemMaxR * elemMaxR;
    elements = [];
    if (nodes.length < 3) return;
    for (let i = 0; i < count; i++) {
      const sides = Math.min(pick(sidesPool), nodes.length);
      const seed = (Math.random() * nodes.length) | 0;
      const sx = nodes[seed].x;
      const sy = nodes[seed].y;
      // Nearest nodes to the seed, but only those within the size cap.
      const idx = nodes
        .map((n, j) => {
          const dx = n.x - sx;
          const dy = n.y - sy;
          return { j, d: dx * dx + dy * dy };
        })
        .filter((o) => o.d <= maxR2)
        .sort((a, b) => a.d - b.d)
        .slice(0, sides)
        .map((o) => o.j);
      if (idx.length >= 3) elements.push({ idx });
    }
  }

  // Layer 3 — the equation wall. Each equation is measured at its real pixel
  // size, then packed big-first with best-candidate sampling so the band is
  // filled evenly with no overlaps. The lower-left (avatar) corner is excluded.
  function buildEquations() {
    if (!eqLayer || W < 1) return;
    eqLayer.innerHTML = '';
    eqs = [];

    // Candidate set: every PRIORITY equation (prominent) + a random slice of the
    // POOL (small filler). The first priority equation is the hero size.
    const fillerCount = W < 560 ? 5 : W < 900 ? 11 : 17;
    const candidates = [];
    PRIORITY.forEach((html, i) => {
      candidates.push({ html, size: i === 0 ? rand(25, 30) : rand(15.5, 21) });
    });
    shuffle(POOL)
      .slice(0, fillerCount)
      .forEach((html) => candidates.push({ html, size: rand(11, 15) }));

    // Render once to measure each equation's real box, then pack big-first.
    candidates.forEach((c) => {
      const el = document.createElement('span');
      el.className = 'hero-eqn';
      el.innerHTML = c.html;
      el.style.fontSize = c.size.toFixed(1) + 'px';
      el.style.opacity = '0';
      eqLayer.appendChild(el);
      c.el = el;
      c.w = el.offsetWidth;
      c.h = el.offsetHeight;
    });
    candidates.sort((a, b) => b.w * b.h - a.w * a.h);

    const avW = Math.min(195, W * 0.22); // avatar exclusion (lower-left)
    const avH = Math.min(120, H * 0.55);
    const GAP = 13;
    const PAD = 8;
    const boxes = [];

    function fits(x, y, w, h) {
      if (x < PAD || y < PAD || x + w > W - PAD || y + h > H - PAD) return false;
      if (x < avW && y + h > H - avH) return false; // avatar corner
      for (let i = 0; i < boxes.length; i++) {
        const p = boxes[i];
        if (x < p.x + p.w + GAP && x + w + GAP > p.x && y < p.y + p.h + GAP && y + h + GAP > p.y)
          return false;
      }
      return true;
    }
    // Distance² from a candidate centre to the nearest placed centre.
    function spread(cx, cy) {
      let m = Infinity;
      for (let i = 0; i < boxes.length; i++) {
        const dx = cx - (boxes[i].x + boxes[i].w / 2);
        const dy = cy - (boxes[i].y + boxes[i].h / 2);
        const d = dx * dx + dy * dy;
        if (d < m) m = d;
      }
      return m;
    }

    candidates.forEach((c) => {
      let best = null;
      let bestScore = -1;
      for (let k = 0; k < 60; k++) {
        const x = rand(PAD, Math.max(PAD, W - c.w - PAD));
        const y = rand(PAD, Math.max(PAD, H - c.h - PAD));
        if (!fits(x, y, c.w, c.h)) continue;
        // Best-candidate sampling → even coverage of the banner.
        const score = boxes.length ? spread(x + c.w / 2, y + c.h / 2) : Math.random();
        if (score > bestScore) {
          bestScore = score;
          best = { x, y };
        }
      }
      if (!best) {
        c.el.remove(); // could not fit — drop it
        return;
      }
      boxes.push({ x: best.x, y: best.y, w: c.w, h: c.h });
      const op = Math.max(0.1, Math.min(0.24, 0.27 - c.size * 0.004)); // bigger = fainter
      c.el.style.opacity = op.toFixed(3);
      c.el.style.transform = 'translate(' + best.x.toFixed(1) + 'px,' + best.y.toFixed(1) + 'px)';
      eqs.push({
        el: c.el,
        homeX: best.x,
        homeY: best.y,
        hw: c.w / 2,
        hh: c.h / 2,
        // Float amplitude stays below the packing gap so cells never collide.
        ax: rand(1.5, 3.5),
        ay: rand(1.2, 2.8),
        sx: rand(0.00012, 0.00024),
        sy: rand(0.00014, 0.00028),
        px: rand(0, Math.PI * 2),
        py: rand(0, Math.PI * 2),
        dx: 0,
        dy: 0,
        vdx: 0,
        vdy: 0,
      });
    });
  }

  function resize() {
    const rect = banner.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (NEEDS_NODES) buildNodes();
    if (SHOW.elements) buildElements();
    buildEquations();
  }

  // Push a drifting node away from the cursor.
  function repel(n, radius, strength) {
    if (!mouse.active) return;
    const dx = n.x - mouse.x;
    const dy = n.y - mouse.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < radius * radius && d2 > 0.01) {
      const d = Math.sqrt(d2);
      const f = (1 - d / radius) * strength;
      n.x += (dx / d) * f;
      n.y += (dy / d) * f;
    }
  }

  // --- Frame -----------------------------------------------------------------
  function step(dt, t) {
    // Layer 1: nodes (only when a node-based layer is visible).
    if (NEEDS_NODES) for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0) {
        n.x = 0;
        n.vx = -n.vx;
      } else if (n.x > W) {
        n.x = W;
        n.vx = -n.vx;
      }
      if (n.y < 0) {
        n.y = 0;
        n.vy = -n.vy;
      } else if (n.y > H) {
        n.y = H;
        n.vy = -n.vy;
      }
      repel(n, 95, 6);
      n.f = field(n.x, n.y, t);
    }

    // Layer 2 (elements): vertices are the nodes above, so cells deform as the
    // particles drift. Re-seed them periodically so they stay compact & local
    // instead of slowly stretching across the banner.
    if (SHOW.elements) {
      elemTimer += dt;
      if (elemTimer > 6) {
        elemTimer = 0;
        buildElements();
      }
    }

    // Layer 3: equations — gentle float + soft spring away from the cursor.
    const eqR = 120;
    for (let i = 0; i < eqs.length; i++) {
      const e = eqs[i];
      const baseX = e.homeX + Math.sin(t * e.sx + e.px) * e.ax;
      const baseY = e.homeY + Math.cos(t * e.sy + e.py) * e.ay;
      const k = 0.014;
      const damp = 0.84;
      let fx = -k * e.dx;
      let fy = -k * e.dy;
      if (mouse.active) {
        const dx = baseX + e.dx + e.hw - mouse.x;
        const dy = baseY + e.dy + e.hh - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < eqR && d > 0.01) {
          const push = (1 - d / eqR) * 0.5;
          fx += (dx / d) * push;
          fy += (dy / d) * push;
        }
      }
      e.vdx = (e.vdx + fx) * damp;
      e.vdy = (e.vdy + fy) * damp;
      e.dx += e.vdx;
      e.dy += e.vdy;
      e.el.style.transform =
        'translate(' + (baseX + e.dx).toFixed(1) + 'px,' + (baseY + e.dy).toFixed(1) + 'px)';
    }
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    // Layer 2 first (behind the network): contour-filled finite elements whose
    // vertices are particles. Order vertices by angle around the centroid each
    // frame so the polygon stays simple (non-self-intersecting) as nodes drift.
    if (SHOW.elements) for (let i = 0; i < elements.length; i++) {
      const idx = elements[i].idx;
      if (idx.length < 3) continue;
      let cx = 0,
        cy = 0,
        fSum = 0;
      for (let k = 0; k < idx.length; k++) {
        const n = nodes[idx[k]];
        cx += n.x;
        cy += n.y;
        fSum += n.f;
      }
      cx /= idx.length;
      cy /= idx.length;
      // Safety: if drift has stretched this cell past the size cap, skip it
      // (it will be re-seeded compactly on the next tick).
      let maxR2 = 0;
      for (let k = 0; k < idx.length; k++) {
        const n = nodes[idx[k]];
        const dx = n.x - cx;
        const dy = n.y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 > maxR2) maxR2 = d2;
      }
      if (maxR2 > elemMaxR * elemMaxR * 1.6) continue;
      const verts = idx
        .map((j) => nodes[j])
        .sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
      const c = colormap(fSum / idx.length);
      const rgb = c[0] + ',' + c[1] + ',' + c[2];
      ctx.beginPath();
      ctx.moveTo(verts[0].x, verts[0].y);
      for (let k = 1; k < verts.length; k++) ctx.lineTo(verts[k].x, verts[k].y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(' + rgb + ',0.06)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(' + rgb + ',0.3)';
      ctx.stroke();
    }

    // Layer 1: proximity links — coloured by mean field, faded by distance.
    ctx.lineWidth = 0.5;
    if (SHOW.links) for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          const c = colormap((a.f + b.f) * 0.5);
          const alpha = (1 - d / linkDist) * 0.26;
          ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Layer 1 nodes: soft glow halo + crisp core (each independently togglable).
    if (SHOW.glow || SHOW.particles) {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const c = colormap(n.f);
        const rgb = c[0] + ',' + c[1] + ',' + c[2];
        if (SHOW.glow) {
          ctx.fillStyle = 'rgba(' + rgb + ',0.07)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        if (SHOW.particles) {
          ctx.fillStyle = 'rgba(' + rgb + ',0.6)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // --- Loop / lifecycle ------------------------------------------------------
  let raf = 0;
  let last = 0;
  let running = false;

  function frame(now) {
    if (!running) return;
    let dt = (now - last) / 1000;
    last = now;
    if (dt > 0.05) dt = 0.05; // clamp after tab switch
    step(dt, now);
    render();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }

  // Pointer forces (relative to the banner box).
  if (!reduceMotion) {
    banner.addEventListener(
      'pointermove',
      (ev) => {
        const rect = banner.getBoundingClientRect();
        mouse.x = ev.clientX - rect.left;
        mouse.y = ev.clientY - rect.top;
        mouse.active = true;
      },
      { passive: true }
    );
    banner.addEventListener('pointerleave', () => {
      mouse.active = false;
    });
  }

  // Pause when off-screen or tab hidden.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : stop()));
      },
      { threshold: 0.05 }
    ).observe(banner);
  } else {
    start();
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  // Debounced resize.
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) {
        step(0, performance.now());
        render();
      }
    }, 180);
  });

  // Init.
  buildAccentStops();
  resize();
  if (reduceMotion) {
    step(0, 0);
    render();
  }
})();
