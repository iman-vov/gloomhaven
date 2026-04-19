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

function initHelper() {
  renderHelperInnerTabs();
  renderQuickReference();
}

function switchHelperInnerTab(tab) {
  helperInnerTab = tab;
  renderHelperInnerTabs();
  if (tab === 'qr')       renderQuickReference();
  else if (tab === 'glo') renderGlossary();
  else if (tab === 'faq') renderFAQ();
}

function renderHelperInnerTabs() {
  const tabs = [
    { id: 'qr',  ru: 'Быстрый справочник', de: 'Schnellreferenz' },
    { id: 'glo', ru: 'Глоссарий',          de: 'Glossar' },
    { id: 'faq', ru: 'FAQ',                de: 'FAQ' }
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
}
