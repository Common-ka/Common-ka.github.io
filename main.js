// ---------- Language and game showcase ----------
// Language: ?lang=ru|en in the URL, then the visitor's saved choice, then the browser's first language
// (Russian for ru, English for everything else). The cards are rebuilt from games.js on every switch.
(() => {
  const DICT = window.SITE_I18N || {};
  const LANGS = ['ru', 'en'];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let lang = 'ru';
  // a text field is either a plain string or { ru, en }
  const t = v => (v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.ru ?? '') : v);
  const tx = v => esc(t(v));

  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem('site-lang'); if (LANGS.includes(s)) return s; } catch (e) {}
    const first = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^ru\b/i.test(first) ? 'ru' : 'en';
  }

  /* ---------- Game cards ---------- */
  const tags = list => list && list.length ? `<ul class="tags">${list.map(x => `<li>${tx(x)}</li>`).join('')}</ul>` : '';
  const link = (l, primary) => `<a class="btn${primary ? ' btn--primary' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener"><span>${tx(l.label)}</span></a>`;
  const notes = (list, one) => list && list.length
    ? `<div class="how__grid${one ? ' how__grid--one' : ''}">${list.map(n => `<div class="info"><h4>${tx(n.title)}</h4><p>${tx(n.text)}</p></div>`).join('')}</div>` : '';
  const shots = list => list && list.length
    ? `<div class="shots${list.length === 2 ? ' shots--two' : ''}">${list.map(s => `<figure><img src="${esc(s.src)}" width="${s.w}" height="${s.h}" alt="${tx(s.alt)}" loading="lazy"><figcaption>${tx(s.caption)}</figcaption></figure>`).join('')}</div>` : '';

  function cover(g, i) {
    const c = g.cover || {};
    if (c.image) {
      const pos = c.position ? ` style="object-position: ${esc(c.position)}"` : '';
      return `<figure class="game__cover"><img src="${esc(c.image)}-1280.webp" srcset="${esc(c.image)}-640.webp 640w, ${esc(c.image)}-1280.webp 1280w" sizes="(max-width: 900px) 100vw, 640px" width="1280" height="720"${pos} alt="${tx(c.alt)}"${i ? ' loading="lazy"' : ''}></figure>`;
    }
    // no cover: a voxel heart (drawn below) or a plain sky panel
    return `<figure class="game__cover voxels" aria-hidden="true"><div class="voxels__grid"${c.placeholder === 'voxels' ? ' data-voxels' : ''}></div></figure>`;
  }

  function how(g) {
    const h = g.how;
    if (!h) return '';
    let body = tags(g.stack);
    if (h.extra) {
      const x = h.extra;
      body += notes(h.notes) + `<div class="sub"><div><h4>${tx(x.title)}</h4><p>${tx(x.text)}</p>`
        + (x.facts ? `<ul class="facts">${x.facts.map(f => `<li><b>${tx(f.value)}</b> — ${tx(f.text)}</li>`).join('')}</ul>` : '')
        + (x.link ? `<div class="game__cta game__cta--sub">${link(x.link, false)}</div>` : '')
        + `</div>${shots(x.shots)}</div>`;
    } else if (h.shots) {
      body += `<div class="sub sub--plain">${notes(h.notes, true)}${shots(h.shots)}</div>`;
    } else {
      body += notes(h.notes);
    }
    return `<details class="how"><summary>${esc(DICT[lang]['games.how'])}</summary><div class="how__body">${body}</div></details>`;
  }

  function card(g, i) {
    const cta = (g.links || []).map(l => link(l, l.primary)).join('')
      + (g.soon || []).map(s => `<span class="btn btn--soon" aria-disabled="true"><span>${tx(s)}</span></span>`).join('');
    return `<article class="game" id="game-${esc(g.id)}"><div class="game__main">${cover(g, i)}<div class="game__info">`
      + `<span class="label status status--${esc(g.status)}">${tx(g.statusText)}</span>`
      + `<h3>${tx(g.title)}</h3>`
      + (g.genre ? `<p class="game__genre">${tx(g.genre)}</p>` : '')
      + (g.hook ? `<p class="game__hook">${tx(g.hook)}</p>` : '')
      + (g.rating ? `<p class="label game__rating">${tx(g.rating)}</p>` : '')
      + (cta ? `<div class="game__cta">${cta}</div>` : '')
      + (!g.how ? tags(g.stack) : '')
      + `</div></div>${how(g)}</article>`;
  }

  /* Voxel heart for a card without a cover: its top-right edge is already chipped off */
  function voxelHeart() {
    const grid = document.querySelector('[data-voxels]');
    if (!grid) return;
    const M = [
      '..XXX...XXX..',
      '.XXXXX.XXXXX.',
      'XXXXXXXXXXXXX',
      'XXXXXXXXXXXXX',
      'XXXXXXXXXXXXX',
      '.XXXXXXXXXXX.',
      '..XXXXXXXXX..',
      '...XXXXXXX...',
      '....XXXXX....',
      '.....XXX.....',
      '......X......',
    ];
    let s = 21;
    const vr = () => (s = (s * 16807) % 2147483647) / 2147483647;
    let html = '';
    M.forEach((row, y) => [...row].forEach((ch, x) => {
      const broken = ch === 'X' && x + (10 - y) * 0.9 > 15.5 && vr() < 0.7;
      if (ch !== 'X') html += '<i></i>';
      else if (broken) html += vr() < 0.45
        ? `<i class="chip" style="--dx:${Math.round(8 + vr() * 26)}px;--dy:${Math.round(-10 - vr() * 30)}px;--r:${Math.round(vr() * 60 - 30)}deg"></i>`
        : '<i></i>';
      else html += `<i class="${vr() < 0.18 ? 'v2' : 'v'}"></i>`;
    }));
    grid.innerHTML = html;
  }

  function renderGames() {
    const data = window.SITE_GAMES;
    if (!data) return;
    // keep open "How it's made" panels open across a language switch
    const open = [...document.querySelectorAll('.game details[open]')].map(d => d.closest('.game').id);
    document.getElementById('now').innerHTML = (data.now || [])
      .map(n => `<li><span class="label">${tx(n.label)}</span><span>${tx(n.text)}</span></li>`).join('');
    document.getElementById('gameList').innerHTML = (data.games || []).map(card).join('');
    open.forEach(id => { const d = document.querySelector(`#${id} details`); if (d) d.open = true; });
    voxelHeart();
  }

  /* ---------- Applying a language ---------- */
  function setLang(next, remember) {
    lang = LANGS.includes(next) ? next : 'ru';
    const d = DICT[lang] || {};
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = d[el.dataset.i18n]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { const v = d[el.dataset.i18nAlt]; if (v != null) el.alt = v; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = d[el.dataset.i18nAria]; if (v != null) el.setAttribute('aria-label', v); });
    if (d['meta.title']) document.title = d['meta.title'];
    const desc = document.querySelector('meta[name="description"]');
    if (desc && d['meta.description']) desc.content = d['meta.description'];
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    if (remember) { try { localStorage.setItem('site-lang', lang); } catch (e) {} }
    renderGames();
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    setLang(b.dataset.lang, true);
    // keep a shared link pointing at the chosen language
    const u = new URL(location.href);
    if (u.searchParams.has('lang')) { u.searchParams.set('lang', lang); history.replaceState(null, '', u); }
  }));

  setLang(detect(), false);
})();

// ---------- Hero: faceted sky, lithographic texture, click-to-shatter ----------
(() => {
  const canvas = document.getElementById('facets');
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const textEl = document.getElementById('heroText');
  // ?still renders one static frame, same as "reduce motion"
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || location.search.includes('still');

  const BG = [236, 231, 216];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const TIERS = {
    bright: ['#e4bb69', '#ebe4bf', '#f7f4ea', '#d9c08a', '#c9a24e', '#efd59a'].map(hex),
    mid:    ['#d0d2c9', '#b7b6b4', '#979ba5', '#c3c8d0', '#a9b0bf'].map(hex),
    dark:   ['#71819e', '#59657b', '#8392ad', '#4a5468', '#66758f'].map(hex),
    hill:   ['#6b7a3a', '#5a6a2e', '#7d8a45', '#4d5a26', '#8c8a3c', '#b8a63e'].map(hex),
  };

  // seeded random: the composition is the same on every visit
  const mkRand = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  let rand = mkRand(7);
  const pick = arr => arr[Math.floor(rand() * arr.length)];
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

  let W = 0, H = 0, dpr = 1, pts = [], tris = [], stipple = null, textRect = null;
  let pointer = { x: -9999, y: -9999 }, scrollRot = 0, raySway = 0;
  let burst = null;
  let running = false, visible = true, raf = 0;

  /* ---------- Texture: lithography ----------
     Halftone dots, like 1930s poster printing. Drawn over the hero (k = 1)
     and as a 256×256 tile over the bands below (k = 0.42, tile = true). */
  function paintLitho(s, w, h, k, tile) {
    const step = 8, period = tile ? w : 420;
    const offs = tile ? [-w, 0, w] : [0];
    // softer modulation on the tile so its repeat does not show as stripes
    const depth = tile ? 0.22 : 0.45;
    s.fillStyle = `rgba(22,24,21,${0.1 * k})`;
    for (let j = 0; j * step < h + step; j++) {
      for (let i = 0; i * step < w + step; i++) {
        const x = i * step + (j % 2 ? step / 2 : 0), y = j * step;
        const tone = 1 - depth + depth * Math.sin((2 * Math.PI * x) / period * 2) * Math.cos((2 * Math.PI * y) / period);
        const rad = step * 0.36 * tone;
        if (rad < 0.4) continue;
        for (const ox of offs) for (const oy of offs) {
          s.beginPath(); s.arc(x + ox, y + oy, rad, 0, Math.PI * 2); s.fill();
        }
      }
    }
  }

  function buildStipple() {
    stipple = document.createElement('canvas');
    stipple.width = canvas.width; stipple.height = canvas.height;
    const s = stipple.getContext('2d');
    s.scale(dpr, dpr);
    paintLitho(s, W, H, 1, false);
    // no halftone under the text (brand book rule)
    s.clearRect(textRect.x, textRect.y, textRect.w, textRect.h);
  }

  function buildGrain() {
    const g = document.createElement('canvas');
    g.width = g.height = 512;
    const s = g.getContext('2d');
    s.scale(2, 2);
    paintLitho(s, 256, 256, 0.42, true);
    document.documentElement.style.setProperty('--grain', `url(${g.toDataURL('image/png')})`);
  }

  /* ---------- Facets ---------- */
  function build() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const tr = textEl.getBoundingClientRect();
    textRect = { x: tr.left - r.left - 24, y: tr.top - r.top - 24, w: tr.width + 48, h: tr.height + 48 };

    rand = mkRand(7);
    const cell = W < 720 ? 64 : 92;
    const rows = Math.ceil(H / (cell * 0.86)) + 3, cols = Math.ceil(W / cell) + 3;
    pts = [];
    for (let i = 0; i < rows; i++) {
      pts[i] = [];
      for (let j = 0; j < cols; j++) {
        const edge = i === 0 || j === 0 || i === rows - 1 || j === cols - 1;
        const jit = edge ? 0 : 0.42;
        pts[i][j] = {
          bx: (j - 1) * cell + (i % 2 ? cell / 2 : 0) + (rand() - 0.5) * cell * jit,
          by: (i - 1) * cell * 0.86 + (rand() - 0.5) * cell * jit,
          ph: rand() * Math.PI * 2, amp: edge ? 0 : 4 + rand() * 7, x: 0, y: 0,
        };
      }
    }
    tris = [];
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < cols - 1; j++) {
        const a = pts[i][j], b = pts[i][j + 1], c = pts[i + 1][j], d = pts[i + 1][j + 1];
        const pair = rand() < 0.5 ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
        for (const v of pair) tris.push(makeTri(v));
      }
    }
    buildStipple();
  }

  function makeTri(v) {
    const cx = (v[0].bx + v[1].bx + v[2].bx) / 3, cy = (v[0].by + v[1].by + v[2].by) / 3;
    const u = cx / W, t = cy / H;
    let col;
    const hillLine = 0.74 + 0.07 * Math.sin(u * 5.2 + 0.6) - 0.1 * u;
    if (t > hillLine) {
      col = pick(TIERS.hill);
    } else {
      // the main wedge of light runs diagonally from bottom-left to top-right
      const d = u * 0.9 + t - 1.05;
      const band = Math.exp(-(d * d) / 0.045) + (rand() - 0.5) * 0.5;
      col = band > 0.72 ? pick(TIERS.bright) : band > 0.28 ? pick(TIERS.mid) : pick(TIERS.dark);
    }
    col = mix(col, BG, muteAt(cx, cy));
    return { v, cx, cy, fill: `rgb(${col})`, rot: (rand() - 0.5) * 1.6, kick: 0.6 + rand() * 0.8, ox: 0, oy: 0 };
  }

  function muteAt(x, y) {
    const r = textRect;
    const dx = Math.max(r.x - x, 0, x - (r.x + r.w));
    const dy = Math.max(r.y - y, 0, y - (r.y + r.h));
    const dist = Math.hypot(dx, dy);
    // the strip under the header is muted too, so the nav stays readable
    const nav = 0.55 * Math.max(0, 1 - Math.max(0, y - 40) / 110);
    return Math.max(0.68 * Math.max(0, 1 - dist / 260), nav);
  }

  function frame(now) {
    const t = now * 0.001;
    for (const row of pts) for (const p of row) {
      p.x = p.bx + Math.sin(t * 0.35 + p.ph) * p.amp;
      p.y = p.by + Math.cos(t * 0.28 + p.ph) * p.amp * 0.7;
    }

    // shatter: a wave from the click point, 900 ms out and back
    let bp = 0;
    if (burst) {
      const e = (now - burst.t0) / 900;
      if (e >= 1) burst = null; else bp = Math.sin(e * Math.PI);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = `rgb(${BG})`;
    ctx.fillRect(0, 0, W, H);
    ctx.lineJoin = 'round';

    for (const tr of tris) {
      // the pointer pushes nearby facets away; not during a shatter, so the two motions don't fight
      const dx = tr.cx - pointer.x, dy = tr.cy - pointer.y;
      const dist = Math.hypot(dx, dy);
      const push = !burst && dist < 170 ? (1 - dist / 170) ** 2 * 26 : 0;
      const tx = push ? (dx / dist) * push : 0, ty = push ? (dy / dist) * push : 0;
      tr.ox += (tx - tr.ox) * 0.12; tr.oy += (ty - tr.oy) * 0.12;

      let bx = 0, by = 0, rot = 0;
      if (bp && burst) {
        const ddx = tr.cx - burst.x, ddy = tr.cy - burst.y;
        const dd = Math.hypot(ddx, ddy) || 1;
        const fall = Math.max(0, 1 - dd / (Math.max(W, H) * 0.9));
        const f = bp * fall * 140 * tr.kick;
        bx = (ddx / dd) * f; by = (ddy / dd) * f - bp * fall * 30;
        rot = tr.rot * bp * fall;
      }

      const [a, b, c] = tr.v;
      const ox = tr.ox + bx, oy = tr.oy + by;
      ctx.save();
      if (rot) { ctx.translate(tr.cx + ox, tr.cy + oy); ctx.rotate(rot); ctx.translate(-tr.cx, -tr.cy); }
      else ctx.translate(ox, oy);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.closePath();
      ctx.fillStyle = tr.fill; ctx.fill();
      if (!bp) { ctx.strokeStyle = tr.fill; ctx.lineWidth = 1; ctx.stroke(); }
      ctx.restore();
    }

    // rays from one point beyond the bottom-left corner; their tilt follows scrolling only
    const origin = { x: -W * 0.18, y: H * 1.22 };
    raySway += (scrollRot - raySway) * 0.08;
    const sway = raySway + Math.sin(t * 0.15) * 0.015;
    const rays = [[-0.62, 0.035], [-0.5, 0.018], [-0.41, 0.05], [-0.3, 0.012], [-0.22, 0.028]];
    ctx.fillStyle = 'rgba(247,244,234,0.26)';
    const R = Math.hypot(W, H) * 1.6;
    for (const [ang, wid] of rays) {
      const a0 = ang + sway, a1 = a0 + wid;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(origin.x + Math.cos(a0) * R, origin.y + Math.sin(a0) * R);
      ctx.lineTo(origin.x + Math.cos(a1) * R, origin.y + Math.sin(a1) * R);
      ctx.closePath(); ctx.fill();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(stipple, 0, 0);

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduce || !visible || document.hidden) return;
    running = true; raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function still() { requestAnimationFrame(frame); }
  function relayout() { stop(); build(); still(); start(); }

  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayout, 150); });
  // the hero text changes size with the language, so the cut-out under it is recomputed
  document.addEventListener('langchange', relayout);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(hero);

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  hero.addEventListener('pointerleave', () => { pointer = { x: -9999, y: -9999 }; });
  addEventListener('scroll', () => { scrollRot = Math.min(scrollY / H, 1) * 0.12; }, { passive: true });

  canvas.addEventListener('pointerdown', e => {
    // ignore new clicks until the current shatter has finished
    if (reduce || burst) return;
    const r = hero.getBoundingClientRect();
    burst = { x: e.clientX - r.left, y: e.clientY - r.top, t0: performance.now() };
  });
  document.getElementById('toGames').addEventListener('click', e => {
    if (reduce) return;
    e.preventDefault();
    if (!burst) burst = { x: W * 0.72, y: H * 0.4, t0: performance.now() };
    setTimeout(() => document.getElementById('games').scrollIntoView({ behavior: 'smooth' }), 450);
  });

  buildGrain();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(relayout);
  relayout();
})();
