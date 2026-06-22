/* ══════════════════════════════════════════
   the little library — theme engine
   Runs in <head>, applies theme before paint
   ══════════════════════════════════════════ */

const THEMES = {
  pink: {
    name: 'pink library',
    label: 'default',
    swatches: ['#26101e','#6b1838','#c03870','#e890aa','#fde8f0'],
    vars: {
      '--dark':'#1a0814','--dark2':'#26101e','--brown':'#6b1838',
      '--burgundy':'#c03870','--rust':'#d9607a','--gold':'#e890aa',
      '--gold-l':'#f5c0d4','--parchment':'#fde8f0','--cream':'#fff2f7',
      '--moss':'#b83878','--ink':'#22081a','--ink-mid':'#541830','--ink-l':'#a05878'
    },
    covers: {
      hotpink:'#e0306a', rose:'#c83878', blush:'#e87898', mauve:'#b85880',
      berry:'#9a1858', coral:'#e85878', magenta:'#cc2888', dusty:'#d480a0',
      ballet:'#e8a8c0', wine:'#8a1848'
    }
  },
  garden: {
    name: 'lily pond',
    label: 'garden',
    swatches: ['#0A3323','#195040','#839958','#D3968C','#F7F4D5'],
    vars: {
      '--dark':'#071f14','--dark2':'#0A3323','--brown':'#195040',
      '--burgundy':'#6a9840','--rust':'#D3968C','--gold':'#9ab870',
      '--gold-l':'#c8e0a8','--parchment':'#f2f0e2','--cream':'#F7F4D5',
      '--moss':'#508030','--ink':'#1a2a14','--ink-mid':'#2e4820','--ink-l':'#5a7838'
    },
    covers: {
      hotpink:'#2a6848', rose:'#1a4a2e', blush:'#5a9060', mauve:'#3a6040',
      berry:'#0d3020', coral:'#78c070', magenta:'#5a7820', dusty:'#9ab870',
      ballet:'#c8e0a8', wine:'#153a25'
    }
  },
  golden: {
    name: 'golden hour',
    label: 'golden',
    swatches: ['#2e2a10','#4C5641','#BC9031','#D4C58E','#F1EDBF'],
    vars: {
      '--dark':'#1e1e08','--dark2':'#4C5641','--brown':'#6a5820',
      '--burgundy':'#BC9031','--rust':'#c8a040','--gold':'#D4C58E',
      '--gold-l':'#e8dcb0','--parchment':'#F1EDBF','--cream':'#FDFBE3',
      '--moss':'#9a8030','--ink':'#1a1e08','--ink-mid':'#3a3820','--ink-l':'#6a6438'
    },
    covers: {
      hotpink:'#6a5820', rose:'#4e4a18', blush:'#9a8040', mauve:'#7a6830',
      berry:'#2a2808', coral:'#c09030', magenta:'#8a7428', dusty:'#c8b468',
      ballet:'#e0cfa0', wine:'#3a3018'
    }
  },
  scarlet: {
    name: 'scarlet study',
    label: 'scarlet',
    swatches: ['#200000','#670010','#960018','#cb4c46','#ff8478'],
    vars: {
      '--dark':'#180000','--dark2':'#3c0000','--brown':'#670010',
      '--burgundy':'#960018','--rust':'#cb4c46','--gold':'#e06858',
      '--gold-l':'#ff8478','--parchment':'#fff0ee','--cream':'#fff5f3',
      '--moss':'#b03030','--ink':'#1a0000','--ink-mid':'#4a0808','--ink-l':'#8a3030'
    },
    covers: {
      hotpink:'#960018', rose:'#670010', blush:'#cb4c46', mauve:'#800020',
      berry:'#3c0000', coral:'#e06858', magenta:'#a83030', dusty:'#d47068',
      ballet:'#ff8478', wine:'#200000'
    }
  },
  winter: {
    name: 'winter dawn',
    label: 'winter',
    swatches: ['#525871','#3c3a52','#a08899','#CD9FA0','#F2C1A3'],
    vars: {
      '--dark':'#2a2d38','--dark2':'#525871','--brown':'#3c3a52',
      '--burgundy':'#a08899','--rust':'#CD9FA0','--gold':'#b0a4c0',
      '--gold-l':'#F2C1A3','--parchment':'#fdf0e8','--cream':'#fff8f2',
      '--moss':'#9a88b0','--ink':'#2a2538','--ink-mid':'#524870','--ink-l':'#857C91'
    },
    covers: {
      hotpink:'#9878b0', rose:'#7060a0', blush:'#b0a0c8', mauve:'#607088',
      berry:'#464070', coral:'#c0b0d0', magenta:'#8868a8', dusty:'#c8b8d8',
      ballet:'#dcd0e8', wine:'#383660'
    }
  },
  autumn: {
    name: 'autumn harvest',
    label: 'autumn',
    swatches: ['#442D1C','#743014','#84592B','#9D9167','#E8D1A7'],
    vars: {
      '--dark':'#2a1c10','--dark2':'#442D1C','--brown':'#743014',
      '--burgundy':'#84592B','--rust':'#9a7040','--gold':'#b89060',
      '--gold-l':'#E8D1A7','--parchment':'#f8f0e0','--cream':'#fff8ec',
      '--moss':'#9D9167','--ink':'#2a1c10','--ink-mid':'#4a2c18','--ink-l':'#7a5830'
    },
    covers: {
      hotpink:'#b04020', rose:'#8a3010', blush:'#c86040', mauve:'#7a5030',
      berry:'#5a2810', coral:'#d47030', magenta:'#a05828', dusty:'#c89060',
      ballet:'#d8b878', wine:'#402010'
    }
  }
};

/* ── Apply theme immediately (before paint) ── */
const _savedTheme = localStorage.getItem('tll-theme') || 'pink';
(function applyImmediate(id) {
  const t = THEMES[id] || THEMES.pink;
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  Object.entries(t.covers).forEach(([cid, c]) => root.style.setProperty(`--cover-${cid}`, c));
})(_savedTheme);

/* ── Inject theme-aware visuals CSS (static — uses CSS vars, auto-updates) ── */
const _themeIllusStyle = document.createElement('style');
_themeIllusStyle.textContent = `
  /* ── Hero section backgrounds ── */
  .hp-hero,
  .read-hero, .reading-hero, .tbr-hero, .rec-hero, .top-panel {
    background: linear-gradient(160deg,
      var(--cream) 0%,
      var(--parchment) 55%,
      color-mix(in srgb, var(--gold) 7%, transparent) 100%) !important;
    border-bottom-color: color-mix(in srgb, var(--burgundy) 10%, transparent) !important;
  }
  /* ── Hero dot patterns ── */
  .hp-hero::before {
    background-image:
      radial-gradient(circle at 15% 25%,
        color-mix(in srgb, var(--gold) 20%, transparent) 0,
        color-mix(in srgb, var(--gold) 20%, transparent) 28px, transparent 28px),
      radial-gradient(circle at 85% 70%,
        color-mix(in srgb, var(--burgundy) 10%, transparent) 0,
        color-mix(in srgb, var(--burgundy) 10%, transparent) 18px, transparent 18px),
      radial-gradient(circle at 50% 90%,
        color-mix(in srgb, var(--gold-l) 14%, transparent) 0,
        color-mix(in srgb, var(--gold-l) 14%, transparent) 22px, transparent 22px) !important;
  }
  .read-hero::before, .reading-hero::before, .tbr-hero::before, .rec-hero::before {
    background-image:
      radial-gradient(circle at 8% 25%,
        color-mix(in srgb, var(--gold) 22%, transparent) 0,
        color-mix(in srgb, var(--gold) 22%, transparent) 20px, transparent 20px),
      radial-gradient(circle at 92% 20%,
        color-mix(in srgb, var(--burgundy) 8%, transparent) 0,
        color-mix(in srgb, var(--burgundy) 8%, transparent) 14px, transparent 14px),
      radial-gradient(circle at 55% 85%,
        color-mix(in srgb, var(--gold-l) 14%, transparent) 0,
        color-mix(in srgb, var(--gold-l) 14%, transparent) 18px, transparent 18px) !important;
  }

  /* ── Wishlist top-panel dot pattern ── */
  .top-panel::before {
    background-image:
      radial-gradient(circle at 8% 50%,
        color-mix(in srgb, var(--gold) 22%, transparent) 0,
        color-mix(in srgb, var(--gold) 22%, transparent) 16px, transparent 16px),
      radial-gradient(circle at 92% 30%,
        color-mix(in srgb, var(--burgundy) 7%, transparent) 0,
        color-mix(in srgb, var(--burgundy) 7%, transparent) 12px, transparent 12px) !important;
  }

  /* ── Wishlist star canvas ── */
  #star-canvas {
    background: radial-gradient(ellipse at 30% 40%,
      var(--cream) 0%, var(--parchment) 60%,
      color-mix(in srgb, var(--gold) 8%, transparent) 100%) !important;
  }
  #star-canvas::before {
    background-image: radial-gradient(circle,
      color-mix(in srgb, var(--burgundy) 5%, transparent) 1px, transparent 1px) !important;
  }

  /* ── TBR jar section ── */
  .jar-section {
    background: linear-gradient(180deg,
      transparent 0%,
      color-mix(in srgb, var(--burgundy) 8%, transparent) 25%,
      color-mix(in srgb, var(--gold) 12%, transparent) 100%) !important;
  }
  .jar-section::before {
    background: linear-gradient(90deg,
      transparent,
      color-mix(in srgb, var(--burgundy) 18%, transparent),
      transparent) !important;
  }

  /* ── TBR hero stacked books ── */
  .hero-stack-wrap rect[fill="#9a1858"] { fill: var(--dark2) !important; }
  .hero-stack-wrap rect[fill="#c83878"] { fill: var(--brown) !important; }
  .hero-stack-wrap rect[fill="#e05878"] { fill: var(--burgundy) !important; }
  .hero-stack-wrap rect[fill="#b83878"] { fill: var(--rust) !important; }
  .hero-stack-wrap rect[fill="#f5c0d4"],
  .hero-stack-wrap path[fill="#f5c0d4"] { fill: var(--gold-l) !important; }

  /* ── Reading hero open-book cover ── */
  .hero-book-wrap path[fill="#7a9a52"] { fill: var(--burgundy) !important; }
  .hero-book-wrap path[fill="#5c7a38"] { fill: var(--brown) !important; }

  /* ── Rec hero envelope ── */
  .hero-art rect[fill="#f5c0d4"] { fill: var(--gold-l) !important; }
  .hero-art path[fill="#f5c0d4"] { fill: var(--gold-l) !important; }
  .hero-art path[fill="#e890aa"] { fill: var(--gold) !important; }
  .hero-art path[fill="#e060a0"] { fill: var(--burgundy) !important; }

  /* ── Circle stickers (read.html + rec.html) ── */
  .stk svg circle[stroke="#c02858"] { stroke: var(--burgundy) !important; }
  .stk svg circle[stroke="#f090b0"] { stroke: var(--gold) !important; }
  .stk svg circle[fill="#fff5f8"]   { fill: var(--cream) !important; }
  .stk svg text[fill="#c02858"]     { fill: var(--burgundy) !important; }
  .stk svg text[fill="#22081a"]     { fill: var(--ink) !important; }

  /* ── Cutout letter stickers ── */
  .cutout { background: var(--burgundy) !important; color: var(--parchment) !important; }

  /* ── HP grid borders ── */
  .hp-grid {
    border-top-color:    color-mix(in srgb, var(--burgundy) 12%, transparent) !important;
    border-bottom-color: color-mix(in srgb, var(--burgundy) 12%, transparent) !important;
  }
  .hp-card {
    border-right-color: color-mix(in srgb, var(--burgundy) 10%, transparent) !important;
  }

  /* ── Emoji badge circles (.emoji-badge class added to inline-styled divs) ── */
  .emoji-badge {
    background: var(--cream) !important;
    border-color: color-mix(in srgb, var(--burgundy) 35%, transparent) !important;
  }

  /* ── Progress bars ── */
  .prog-fill, .cc-fill {
    background: linear-gradient(90deg, var(--burgundy), var(--gold)) !important;
  }

  /* ── Book spine strip ── */
  .bspine { background: linear-gradient(180deg, var(--burgundy), var(--moss)) !important; }

  /* ── Rec cards — stars ── */
  .si      { color: color-mix(in srgb, var(--burgundy) 20%, transparent) !important; }
  .si.lit  { color: var(--gold) !important; }
  .rec-star.lit, .modal-star.lit { color: var(--gold) !important; }
  .rec-star.dim, .modal-star.dim { color: color-mix(in srgb, var(--burgundy) 18%, transparent) !important; }

  /* ── Rec cards — quote marks ── */
  .rec-quote  { color: color-mix(in srgb, var(--burgundy) 12%, transparent) !important; }
  .modal-quote { color: color-mix(in srgb, var(--burgundy) 10%, transparent) !important; }

  /* ── Rec cards — genre badge ── */
  .rec-genre, .modal-genre {
    background: color-mix(in srgb, var(--burgundy) 9%, transparent) !important;
  }

  /* ── Rec cards — like button ── */
  .rec-like {
    border-color: color-mix(in srgb, var(--burgundy) 18%, transparent) !important;
  }
  .rec-like:hover, .rec-like.liked {
    background: color-mix(in srgb, var(--burgundy) 8%, transparent) !important;
    border-color: color-mix(in srgb, var(--burgundy) 35%, transparent) !important;
    color: var(--burgundy) !important;
  }

  /* ── Rec cards — card border & dividers ── */
  .rec-card {
    border-color: color-mix(in srgb, var(--gold) 12%, transparent) !important;
  }
  .rec-divider, .modal-divider {
    border-top-color: color-mix(in srgb, var(--gold) 15%, transparent) !important;
  }

  /* ── Feed header border ── */
  .feed-header {
    border-bottom-color: color-mix(in srgb, var(--burgundy) 9%, transparent) !important;
  }
`;
document.head.appendChild(_themeIllusStyle);

/* ── Inject picker CSS ── */
const _tpStyle = document.createElement('style');
_tpStyle.textContent = `
  #nav-user {
    cursor: pointer !important;
    user-select: none;
    transition: color .18s !important;
  }
  #nav-user:hover { color: rgba(245,232,204,.65) !important; }
  #nav-user::after {
    content: ' ✦';
    font-size: .6rem;
    opacity: .4;
    margin-left: .2rem;
  }

  /* ── picker panel ── */
  #theme-picker {
    position: fixed;
    z-index: 99999;
    background: var(--dark2, #26101e);
    border: 1px solid rgba(196,154,74,.22);
    border-radius: 7px;
    padding: .75rem .7rem .65rem;
    min-width: 230px;
    box-shadow: 0 16px 44px rgba(0,0,0,.42), 0 4px 12px rgba(0,0,0,.22);
    animation: tpSlideIn .2s cubic-bezier(.34,1.3,.64,1) both;
  }
  @keyframes tpSlideIn {
    from { opacity:0; transform:translateY(-10px) scale(.95) }
    to   { opacity:1; transform:none }
  }
  .tp-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: .55rem; padding-bottom: .45rem;
    border-bottom: 1px solid rgba(196,154,74,.13);
  }
  .tp-head-title {
    font-family: 'IM Fell English', serif; font-style: italic;
    font-size: .76rem; color: rgba(245,232,204,.45); letter-spacing: .08em;
  }
  .tp-head-close {
    background: none; border: none; color: rgba(245,232,204,.22);
    cursor: pointer; font-size: .85rem; padding: 2px; line-height: 1;
    transition: color .15s;
  }
  .tp-head-close:hover { color: rgba(245,232,204,.7); }

  .tp-item {
    display: flex; align-items: center; gap: .6rem;
    padding: .42rem .45rem; border-radius: 4px; cursor: pointer;
    transition: background .15s; position: relative;
    border: 1px solid transparent;
  }
  .tp-item:hover { background: rgba(255,255,255,.055); }
  .tp-item.tp-active {
    background: rgba(196,154,74,.1);
    border-color: rgba(196,154,74,.22);
  }
  .tp-swatches { display: flex; gap: 3px; flex-shrink: 0; }
  .tp-dot {
    width: 14px; height: 14px; border-radius: 50%; display: inline-block;
    box-shadow: 0 1px 4px rgba(0,0,0,.35);
    flex-shrink: 0;
  }
  .tp-name {
    font-family: 'IM Fell English', serif; font-style: italic;
    font-size: .78rem; color: rgba(245,232,204,.5); flex: 1;
    white-space: nowrap;
  }
  .tp-item.tp-active .tp-name { color: rgba(245,232,204,.92); }
  .tp-check { font-size: .68rem; color: rgba(196,154,74,.8); opacity: 0; transition: opacity .15s; flex-shrink:0; }
  .tp-item.tp-active .tp-check { opacity: 1; }
`;
document.head.appendChild(_tpStyle);

/* ── Public functions ── */
function applyTheme(id) {
  const t = THEMES[id] || THEMES.pink;
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  Object.entries(t.covers).forEach(([cid, c]) => root.style.setProperty(`--cover-${cid}`, c));
  localStorage.setItem('tll-theme', id);
  document.querySelectorAll('.tp-item').forEach(el =>
    el.classList.toggle('tp-active', el.dataset.theme === id)
  );
}

function buildThemePicker() {
  const existing = document.getElementById('theme-picker');
  if (existing) { existing.remove(); return; }

  const current = localStorage.getItem('tll-theme') || 'pink';

  const panel = document.createElement('div');
  panel.id = 'theme-picker';
  panel.innerHTML = `
    <div class="tp-head">
      <span class="tp-head-title">✦ &nbsp;customize</span>
      <button class="tp-head-close" onclick="document.getElementById('theme-picker').remove()">✕</button>
    </div>
    ${Object.entries(THEMES).map(([id, t]) => `
      <div class="tp-item${id === current ? ' tp-active' : ''}" data-theme="${id}" onclick="applyTheme('${id}')">
        <div class="tp-swatches">
          ${t.swatches.map(c => `<span class="tp-dot" style="background:${c}"></span>`).join('')}
        </div>
        <span class="tp-name">${t.name}</span>
        <span class="tp-check">✓</span>
      </div>
    `).join('')}
  `;

  /* position below nav-user */
  const trigger = document.getElementById('nav-user');
  if (trigger) {
    const r = trigger.getBoundingClientRect();
    panel.style.top  = (r.bottom + 6) + 'px';
    panel.style.right = (window.innerWidth - r.right) + 'px';
  } else {
    panel.style.top = '56px'; panel.style.right = '12px';
  }

  document.body.appendChild(panel);

  /* close on outside click */
  setTimeout(() => {
    function outside(e) {
      if (!panel.contains(e.target) && e.target.id !== 'nav-user' && !e.target.closest('#nav-user')) {
        panel.remove();
        document.removeEventListener('click', outside);
      }
    }
    document.addEventListener('click', outside);
  }, 10);
}

/* ── Wire up nav-user after DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  const nu = document.getElementById('nav-user');
  if (!nu) return;
  nu.title = 'customize';
  nu.addEventListener('click', buildThemePicker);
});
