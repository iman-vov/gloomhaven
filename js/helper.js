// ── Helper Module (Quick Reference / Glossary / FAQ) ──

const CATEGORY_LABELS = {
  ru: {
    actions:     'Действия',
    board:       'Поле',
    campaign:    'Кампания',
    cards:       'Карты',
    combat:      'Бой',
    economy:     'Экономика',
    monster_ai:  'Монстры',
    movement:    'Движение',
    progression: 'Прогресс',
    round:       'Раунд',
    scenario:    'Сценарий',
    status:      'Состояния',
    targeting:   'Прицеливание'
  },
  de: {
    actions:     'Aktionen',
    board:       'Spielfeld',
    campaign:    'Kampagne',
    cards:       'Karten',
    combat:      'Kampf',
    economy:     'Wirtschaft',
    monster_ai:  'Monster',
    movement:    'Bewegung',
    progression: 'Fortschritt',
    round:       'Runde',
    scenario:    'Szenario',
    status:      'Zustände',
    targeting:   'Zielerfassung'
  }
};

let helperInnerTab = 'qr';
let glossarySearch = '';
let glossaryCatFilter = 'all';
let helperHeroCode = null;
let helperHeroSearch = '';
let helperHeroPreviewSrcs = [];
let helperHeroPreviewCards = [];
let helperHeroLevelFilter = 'all';
let helperHeroPreviewIdx = 0;

function initHelper() {
  renderHelperInnerTabs();
  if (helperInnerTab === 'qr')       renderQuickReference();
  else if (helperInnerTab === 'glo') renderGlossary();
  else if (helperInnerTab === 'faq') renderFAQ();
  else if (helperInnerTab === 'heroes') renderHelperHeroes();
}

function switchHelperInnerTab(tab) {
  helperInnerTab = tab;
  renderHelperInnerTabs();
  if (tab === 'qr')       renderQuickReference();
  else if (tab === 'glo') renderGlossary();
  else if (tab === 'faq') renderFAQ();
  else if (tab === 'heroes') renderHelperHeroes();
}

function renderHelperInnerTabs() {
  const tabs = [
    { id: 'qr',  ru: 'Быстрый справочник', de: 'Schnellreferenz' },
    { id: 'glo', ru: 'Глоссарий',          de: 'Glossar' },
    { id: 'faq', ru: 'FAQ',                de: 'FAQ' },
    { id: 'heroes', ru: '\u0413\u0435\u0440\u043e\u0438', de: 'Helden' }
  ];
  const bar = document.getElementById('helper-inner-tabs');
  if (!bar) return;
  bar.innerHTML = tabs.map(t =>
    `<button class="helper-tab-btn${helperInnerTab === t.id ? ' active' : ''}"
      onclick="switchHelperInnerTab('${t.id}')">${lang === 'de' ? t.de : t.ru}</button>`
  ).join('');
}

// ── Quick Reference ──────────────────────────────────────
function renderQuickReference() {
  const el = document.getElementById('helper-content');
  if (!el) return;
  const sections = [...HELPER_DATA.quick_reference.sections].sort((a, b) => {
    const ta = ((lang === 'de' && a.titleDe) ? a.titleDe : a.title).toLowerCase();
    const tb = ((lang === 'de' && b.titleDe) ? b.titleDe : b.title).toLowerCase();
    return ta.localeCompare(tb, lang === 'de' ? 'de' : 'ru');
  });
  el.innerHTML = sections.map((sec, i) => {
    const title = (lang === 'de' && sec.titleDe) ? sec.titleDe : sec.title;
    const items = (lang === 'de' && sec.itemsDe) ? sec.itemsDe : sec.items;
    return `
      <div class="qr-section">
        <button class="qr-header" onclick="toggleQR(${i})" id="qr-btn-${i}">
          <span>${title}</span><span class="qr-chevron" id="qr-chev-${i}">▶</span>
        </button>
        <ul class="qr-list" id="qr-list-${i}" style="display:none;">
          ${items.map(item => `<li>${escHtml(item)}</li>`).join('')}
        </ul>
      </div>`;
  }).join('');
}

function toggleQR(i) {
  const list = document.getElementById(`qr-list-${i}`);
  const chev = document.getElementById(`qr-chev-${i}`);
  if (!list) return;
  const open = list.style.display !== 'none';
  list.style.display = open ? 'none' : 'block';
  chev.textContent = open ? '▶' : '▼';
}

// ── Glossary ─────────────────────────────────────────────
function renderGlossary() {
  const el = document.getElementById('helper-content');
  if (!el) return;

  const allCats = ['all', ...Object.keys(CATEGORY_LABELS.ru)];
  const catLabels = CATEGORY_LABELS[lang] || CATEGORY_LABELS.ru;
  const allLabel = lang === 'de' ? 'Alle' : 'Все';

  const filtered = HELPER_DATA.glossary.filter(entry => {
    const term = (lang === 'de' && entry.termDe) ? entry.termDe : entry.term;
    const summary = (lang === 'de' && entry.summaryDe) ? entry.summaryDe : entry.summary;
    const matchSearch = !glossarySearch ||
      term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      summary.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchCat = glossaryCatFilter === 'all' || entry.category === glossaryCatFilter;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    const ta = ((lang === 'de' && a.termDe) ? a.termDe : a.term).toLowerCase();
    const tb = ((lang === 'de' && b.termDe) ? b.termDe : b.term).toLowerCase();
    return ta.localeCompare(tb, lang === 'de' ? 'de' : 'ru');
  });

  el.innerHTML = `
    <div class="glo-controls">
      <input class="glo-search" id="glo-search-input" type="text"
        placeholder="${lang === 'de' ? 'Suchen…' : 'Поиск…'}"
        value="${escHtml(glossarySearch)}"
        oninput="onGlossarySearch(this.value)">
      <div class="glo-cat-filter">
        ${allCats.map(cat => {
          const label = cat === 'all' ? allLabel : (catLabels[cat] || cat);
          const active = glossaryCatFilter === cat;
          return `<button class="cat-btn${active ? ' active' : ''}"
            onclick="setGlossaryCat('${cat}')">${label}</button>`;
        }).join('')}
      </div>
    </div>
    <div class="glo-count">${lang === 'de' ? 'Einträge' : 'Записей'}: ${filtered.length}</div>
    <div class="glo-list">
      ${filtered.length === 0
        ? `<div class="glo-empty">${lang === 'de' ? 'Keine Treffer.' : 'Ничего не найдено.'}</div>`
        : filtered.map((entry, i) => renderGlossaryCard(entry, i)).join('')}
    </div>`;
}

function renderGlossaryCard(entry, i) {
  const term = (lang === 'de' && entry.termDe) ? entry.termDe : entry.term;
  const summary = (lang === 'de' && entry.summaryDe) ? entry.summaryDe : entry.summary;
  const catLabel = (CATEGORY_LABELS[lang] || CATEGORY_LABELS.ru)[entry.category] || entry.category;
  const hasKeywords = entry.keywords && entry.keywords.length > 0;
  const uid = `glo-card-${entry.id}`;
  return `
    <div class="glo-card" id="${uid}">
      <div class="glo-card-header" onclick="toggleGloCard('${uid}')">
        <div class="glo-card-left">
          <span class="glo-term">${escHtml(term)}</span>
          <span class="cat-badge cat-${entry.category}">${escHtml(catLabel)}</span>
        </div>
        <span class="glo-chevron">▶</span>
      </div>
      <div class="glo-card-body" style="display:none;">
        <p class="glo-summary">${escHtml(summary)}</p>
        ${hasKeywords ? `<p class="glo-keywords">${entry.keywords.map(k => `<span>${escHtml(k)}</span>`).join('')}</p>` : ''}
      </div>
    </div>`;
}

function toggleGloCard(uid) {
  const card = document.getElementById(uid);
  if (!card) return;
  const body = card.querySelector('.glo-card-body');
  const chev = card.querySelector('.glo-chevron');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  chev.textContent = open ? '▶' : '▼';
}

function onGlossarySearch(val) {
  glossarySearch = val;
  renderGlossary();
  const inp = document.getElementById('glo-search-input');
  if (inp) { inp.focus(); inp.setSelectionRange(val.length, val.length); }
}

function setGlossaryCat(cat) {
  glossaryCatFilter = cat;
  renderGlossary();
}

// ── FAQ ──────────────────────────────────────────────────
// Hero card reference. This is read-only and never changes activeChar/player data.
function renderHelperHeroes() {
  const el = document.getElementById('helper-content');
  if (!el) return;
  const heroCodes = typeof CHARS !== 'undefined' ? Object.keys(CHARS) : [];
  if (!heroCodes.length) {
    el.innerHTML = `<div class="empty-msg">${lang === 'de' ? 'Keine Helden gefunden.' : '\u0413\u0435\u0440\u043e\u0438 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b.'}</div>`;
    return;
  }
  if (!helperHeroCode || !CHARS[helperHeroCode]) helperHeroCode = heroCodes[0];

  const hero = CHARS[helperHeroCode];
  const query = helperHeroSearch.trim().toLowerCase();
  const levels = LEVEL_ORDER.filter(level => hero.cards.some(card => card.level === level));
  const cards = hero.cards
    .filter(card => helperHeroLevelFilter === 'all' || card.level === helperHeroLevelFilter)
    .filter(card => !query || card.id.includes(query))
    .sort((a, b) => {
      const la = LEVEL_ORDER.indexOf(a.level);
      const lb = LEVEL_ORDER.indexOf(b.level);
      if (la !== lb) return la - lb;
      return a.id.localeCompare(b.id);
    });
  helperHeroPreviewSrcs = cards.map(card => helperHeroCardSrc(card));
  helperHeroPreviewCards = cards;

  el.innerHTML = `
    <div class="helper-heroes">
      <div class="helper-hero-picker">
        ${heroCodes.map(code => {
          const c = CHARS[code];
          return `<button class="helper-hero-btn${helperHeroCode === code ? ' active' : ''}" type="button" onclick="setHelperHero('${code}')">
            <img src="assets/heroes/${code}_face.png" alt="${code}" style="border-color:${c.color}">
            <span>${escHtml(helperHeroName(code))}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="helper-hero-tools">
        <div class="helper-hero-current">
          <img src="assets/heroes/${helperHeroCode}_face.png" alt="${helperHeroCode}" style="border-color:${hero.color}">
          <div>
            <div class="helper-hero-name">${escHtml(helperHeroName(helperHeroCode))}</div>
            <div class="helper-hero-sub">${escHtml(hero.sub || '')}</div>
          </div>
        </div>
        <input class="glo-search helper-hero-search" id="helper-hero-search" type="text"
          placeholder="${lang === 'de' ? 'Karten-ID...' : 'ID \u043a\u0430\u0440\u0442\u044b...'}"
          value="${escHtml(helperHeroSearch)}"
          oninput="setHelperHeroSearch(this.value)">
      </div>
      <div class="helper-hero-levels">
        <button class="helper-hero-level-btn${helperHeroLevelFilter === 'all' ? ' active' : ''}" type="button" onclick="setHelperHeroLevel('all')">${lang === 'de' ? 'Alle' : '\u0412\u0441\u0435'}</button>
        ${levels.map(level => `<button class="helper-hero-level-btn${helperHeroLevelFilter === level ? ' active' : ''}" type="button" onclick="setHelperHeroLevel('${level}')">${escHtml(level)}</button>`).join('')}
      </div>
      <div class="helper-hero-card-count">${lang === 'de' ? 'Karten' : '\u041a\u0430\u0440\u0442'}: ${cards.length}</div>
      <div class="helper-hero-card-grid">
        ${cards.length
          ? cards.map((card, idx) => renderHelperHeroCard(card, idx)).join('')
          : `<div class="empty-msg">${lang === 'de' ? 'Keine Karten.' : '\u041a\u0430\u0440\u0442\u044b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b.'}</div>`}
      </div>
    </div>`;
}

function helperHeroName(code) {
  const c = CHARS[code];
  if (!c) return code;
  return lang === 'de' ? (c.nameDe || code) : (c.nameRu || code);
}

function helperHeroCardName(card) {
  const d = typeof getCardData === 'function' ? getCardData(card.id) : {};
  return lang === 'de' ? (d.nameDe || `Karte ${card.id}`) : (d.nameRu || `\u041a\u0430\u0440\u0442\u0430 ${card.id}`);
}

function helperHeroCardSrc(card) {
  return `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${card.code}/${card.id}.png`;
}

function renderHelperHeroCard(card, idx) {
  const d = typeof getCardData === 'function' ? getCardData(card.id) : {};
  const name = helperHeroCardName(card);
  const src = helperHeroCardSrc(card);
  const init = d.initiative ? `<div class="card-thumb-init">${d.initiative}</div>` : '';
  const lost = d.lost ? `<div class="card-thumb-lost">${lang === 'de' ? 'VERLUST' : '\u041f\u041e\u0422\u0415\u0420\u042f'}</div>` : '';
  return `
    <div class="card-thumb helper-hero-card" onclick="openHelperHeroPreview(${idx})">
      <img src="${src}" alt="${card.id}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-placeholder" style="display:none"><div class="ph-num">${card.id}</div>${escHtml(name)}</div>
      <div class="card-thumb-info">
        <div class="card-thumb-name">${escHtml(name)}</div>
        <div class="helper-hero-card-meta">${lang === 'de' ? 'Stufe' : '\u0423\u0440.'} ${escHtml(card.level)} - ID ${card.id}</div>
        ${init}
        ${lost}
      </div>
    </div>`;
}

function setHelperHero(code) {
  if (!CHARS[code]) return;
  helperHeroCode = code;
  helperHeroSearch = '';
  helperHeroLevelFilter = 'all';
  renderHelperHeroes();
}

function setHelperHeroLevel(level) {
  helperHeroLevelFilter = level;
  renderHelperHeroes();
}

function setHelperHeroSearch(value) {
  helperHeroSearch = value;
  renderHelperHeroes();
  const input = document.getElementById('helper-hero-search');
  if (input) {
    input.focus();
    input.setSelectionRange(value.length, value.length);
  }
}

function openHelperHeroPreview(idx) {
  if (!helperHeroPreviewCards[idx]) return;
  helperHeroPreviewIdx = idx;
  let overlay = document.getElementById('helper-hero-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'helper-hero-modal';
    overlay.onclick = closeHelperHeroPreview;
    overlay.innerHTML = `
      <div class="helper-hero-modal-inner" onclick="event.stopPropagation()">
        <button class="btn-close-modal" type="button" onclick="closeHelperHeroPreview()">\u2715</button>
        <button class="modal-nav-btn helper-hero-modal-prev" type="button" onclick="event.stopPropagation(); navigateHelperHeroPreview(-1)">&#8249;</button>
        <div class="helper-hero-modal-img-wrap">
          <img id="helper-hero-modal-img" src="" alt="">
        </div>
        <div class="helper-hero-modal-body">
          <div id="helper-hero-modal-title"></div>
          <div id="helper-hero-modal-meta"></div>
          <div id="helper-hero-modal-lost" class="hidden"></div>
          <div id="helper-hero-modal-desc"></div>
        </div>
        <button class="modal-nav-btn helper-hero-modal-next" type="button" onclick="event.stopPropagation(); navigateHelperHeroPreview(1)">&#8250;</button>
      </div>`;
    document.body.appendChild(overlay);
  }
  renderHelperHeroPreview();
  overlay.classList.add('open');
}

function renderHelperHeroPreview() {
  const card = helperHeroPreviewCards[helperHeroPreviewIdx];
  if (!card) return;
  const d = typeof getCardData === 'function' ? getCardData(card.id) : {};
  const img = document.getElementById('helper-hero-modal-img');
  const title = document.getElementById('helper-hero-modal-title');
  const meta = document.getElementById('helper-hero-modal-meta');
  const lost = document.getElementById('helper-hero-modal-lost');
  const desc = document.getElementById('helper-hero-modal-desc');
  const prev = document.querySelector('.helper-hero-modal-prev');
  const next = document.querySelector('.helper-hero-modal-next');
  const name = helperHeroCardName(card);

  if (img) img.src = helperHeroCardSrc(card);
  if (title) title.textContent = name;
  if (meta) meta.textContent = `${helperHeroName(card.code)} - ${lang === 'de' ? 'Stufe' : '\u0423\u0440.'}: ${card.level} - ID: ${card.id}${d.initiative ? ' - ' + (lang === 'de' ? 'Initiative' : '\u0418\u043d\u0438\u0446\u0438\u0430\u0442\u0438\u0432\u0430') + ': ' + d.initiative : ''}`;
  if (lost) {
    lost.textContent = lang === 'de' ? 'VERLUST' : '\u041f\u041e\u0422\u0415\u0420\u042f';
    lost.classList.toggle('hidden', !d.lost);
  }
  if (desc) {
    const text = lang === 'de' ? (d.descDe || '') : (d.descRu || '');
    desc.textContent = text || (lang === 'de' ? 'Keine Beschreibung.' : '\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0435\u0442.');
  }
  if (prev) prev.disabled = helperHeroPreviewIdx <= 0;
  if (next) next.disabled = helperHeroPreviewIdx >= helperHeroPreviewCards.length - 1;
}

function navigateHelperHeroPreview(delta) {
  const nextIdx = helperHeroPreviewIdx + delta;
  if (nextIdx < 0 || nextIdx >= helperHeroPreviewCards.length) return;
  helperHeroPreviewIdx = nextIdx;
  renderHelperHeroPreview();
}

function closeHelperHeroPreview() {
  const overlay = document.getElementById('helper-hero-modal');
  if (overlay) overlay.classList.remove('open');
}

function renderFAQ() {
  const el = document.getElementById('helper-content');
  if (!el) return;
  el.innerHTML = HELPER_DATA.faq.map(entry => {
    const q = (lang === 'de' && entry.questionDe) ? entry.questionDe : entry.question;
    const short = (lang === 'de' && entry.answer_shortDe) ? entry.answer_shortDe : entry.answer_short;
    const long = (lang === 'de' && entry.answer_longDe) ? entry.answer_longDe : entry.answer_long;
    return `
      <div class="faq-item" id="faq-${entry.id}">
        <div class="faq-header" onclick="toggleFAQ('faq-${entry.id}')">
          <div class="faq-q-wrap">
            <span class="faq-q">${escHtml(q)}</span>
            <span class="faq-short">${escHtml(short)}</span>
          </div>
          <span class="faq-chevron">▶</span>
        </div>
        <div class="faq-body" style="display:none;">
          <p>${escHtml(long)}</p>
        </div>
      </div>`;
  }).join('');
}

function toggleFAQ(uid) {
  const item = document.getElementById(uid);
  if (!item) return;
  const body = item.querySelector('.faq-body');
  const chev = item.querySelector('.faq-chevron');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  chev.textContent = open ? '▶' : '▼';
}

// ── Called from setLang() ────────────────────────────────
function updateHelperLang() {
  renderHelperInnerTabs();
  if (helperInnerTab === 'qr')       renderQuickReference();
  else if (helperInnerTab === 'glo') renderGlossary();
  else if (helperInnerTab === 'faq') renderFAQ();
  else if (helperInnerTab === 'heroes') renderHelperHeroes();
}
