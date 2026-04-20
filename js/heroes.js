function updateMissionUI() {

  document.getElementById('mission-num-display').textContent = currentScenario;

}



function changeMission(delta) {

  currentScenario = Math.max(1, Math.min(25, currentScenario + delta));

  localStorage.setItem('gh_scenario', currentScenario);

  updateMissionUI();

  renderDeckCounter();

  renderCardsGrid();

  if (cardsView === 'deck') renderDeckGrid();

}



// ─── Hero Cards ───────────────────────────────────────

function getDeckMax(code) {

  if (currentScenario <= 2) return 6;

  if (currentScenario === 3) return 8;

  return DECK_SIZE[code] || 10;

}



function selectChar(code) {

  activeChar = code;

  lsSet('activeChar', code);

  document.getElementById('char-select-prompt').classList.add('hidden');

  document.getElementById('char-view').classList.add('visible');

  const c = CHARS[code];

  document.getElementById('active-char-icon').textContent = c.icon;

  document.getElementById('active-char-icon').style.background = c.bg;

  document.getElementById('active-char-icon').style.borderColor = c.color;

  document.getElementById('active-char-name').textContent = charName(code);

  document.getElementById('active-char-sub').textContent = c.sub;

  document.querySelectorAll('.char-card').forEach(el => el.classList.remove('selected'));

  document.getElementById(`charcard-${code}`).classList.add('selected');

  activeCardFilter = new Set();

  cardsView = 'all';

  setCardsView('all');

  renderLevelFilter();

  renderCardsGrid();

  renderDeckCounter();

}



function backToCharSelect() {

  activeChar = null;

  document.getElementById('char-select-prompt').classList.remove('hidden');

  document.getElementById('char-view').classList.remove('visible');

  document.querySelectorAll('.char-card').forEach(el => el.classList.remove('selected'));

}



function setCardsView(v) {

  cardsView = v;

  document.getElementById('vtab-all').classList.toggle('active', v === 'all');

  document.getElementById('vtab-deck').classList.toggle('active', v === 'deck');

  document.getElementById('all-cards-view').style.display = v === 'all' ? 'block' : 'none';

  const deckView = document.getElementById('my-deck-view');

  if (v === 'deck') {

    deckView.classList.add('visible');

    renderDeckGrid();

  } else {

    deckView.classList.remove('visible');

  }

}



function renderLevelFilter() {
  if (!activeChar) return;

  const levels = new Set(CHARS[activeChar].cards.map(c => c.level));

  const div = document.getElementById('level-filter');

  div.innerHTML = '';

  const resetBtn = document.createElement('button');

  resetBtn.className = 'lvl-btn lvl-btn-reset' + (activeCardFilter.size === 0 ? ' active' : '');

  resetBtn.textContent = lang === 'de' ? 'Alle' : 'Все';

  resetBtn.onclick = () => { activeCardFilter = new Set(); renderLevelFilter(); renderCardsGrid(); };

  div.appendChild(resetBtn);

  LEVEL_ORDER.filter(l => levels.has(l)).forEach(lvl => {

    const btn = document.createElement('button');

    btn.className = 'lvl-btn' + (activeCardFilter.has(lvl) ? ' active' : '');

    btn.textContent = lvl === '1' ? (lang==='de'?'Lvl.1':'Ур.1') : lvl;

    btn.onclick = () => {
      if (activeCardFilter.has(lvl)) activeCardFilter.delete(lvl);
      else activeCardFilter.add(lvl);
      renderLevelFilter();
      renderCardsGrid();
    };

    div.appendChild(btn);

  });

}



function getFilteredCards() {

  if (!activeChar) return [];

  const cards = CHARS[activeChar].cards;

  return activeCardFilter.size === 0 ? cards : cards.filter(c => activeCardFilter.has(c.level));

}



function cardName(card) {

  const d = getCardData(card.id);

  return lang === 'de' ? (d.nameDe || `Karte ${card.id}`) : (d.nameRu || `Карта ${card.id}`);

}



function renderCardsGrid() {

  const grid = document.getElementById('cards-grid');

  grid.innerHTML = '';

  const deck = getDeck(activeChar);

  const cards = getFilteredCards();

  if (!cards.length) {

    grid.innerHTML = `<div class="empty-msg" style="grid-column:1/-1;">${lang==='de'?'Keine Karten.':'Карты отсутствуют.'}</div>`;

    return;

  }

  cards.forEach(card => {

    const inDeck = deck.includes(card.id);

    const d = getCardData(card.id);

    const name = cardName(card);

    const el = document.createElement('div');

    el.className = 'card-thumb' + (inDeck ? ' in-deck' : '');

    el.onclick = () => openCardModal(card);

    el.innerHTML = `

      <img src="./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${card.code}/${card.id}.png" alt="${card.id}"

        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

      <div class="img-placeholder" style="display:none"><div class="ph-num">${card.id}</div>${name}</div>

      <div class="card-thumb-info">

        <div class="card-thumb-name">${name}</div>

        <div class="card-thumb-init">${d.initiative ? '⚡ '+d.initiative : ''}</div>

        ${d.lost ? `<div class="card-thumb-lost">⚠ ${lang==='de'?'VERLUST':'ПОТЕРЯ'}</div>` : ''}

      </div>

      <button class="card-add-btn${inDeck ? ' in-deck' : ''}" aria-label="${inDeck ? 'Remove from deck' : 'Add to deck'}">${inDeck ? '✓' : '+'}</button>`;

    const addBtn = el.querySelector('.card-add-btn');

    addBtn.addEventListener('click', e => {

      e.stopPropagation();

      toggleDeckFromThumb(card);

    });

    addBtn.addEventListener('touchend', e => { e.stopPropagation(); });

    grid.appendChild(el);

  });

}



function renderDeckGrid() {

  if (!activeChar) return;

  const deck = getDeck(activeChar);

  const grid = document.getElementById('deck-grid');

  const empty = document.getElementById('deck-empty');

  grid.innerHTML = '';

  if (!deck.length) { empty.classList.remove('hidden'); return; }

  empty.classList.add('hidden');

  deck.forEach(id => {

    const card = CHARS[activeChar].cards.find(c => c.id === id);

    if (!card) return;

    const d = getCardData(id);

    const name = cardName(card);

    const el = document.createElement('div');

    el.className = 'card-thumb in-deck';

    el.onclick = () => openCardModal(card);

    el.innerHTML = `

      <img src="./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${card.code}/${card.id}.png" alt="${id}"

        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

      <div class="img-placeholder" style="display:none"><div class="ph-num">${id}</div>${name}</div>

      <div class="card-thumb-info">

        <div class="card-thumb-name">${name}</div>

        ${d.lost ? `<div class="card-thumb-lost">⚠ ${lang==='de'?'VERLUST':'ПОТЕРЯ'}</div>` : ''}

      </div>`;

    grid.appendChild(el);

  });

}



function renderDeckCounter() {

  if (!activeChar) return;

  const deck = getDeck(activeChar);

  const max = getDeckMax(activeChar);

  const el = document.getElementById('deck-counter-num');

  el.textContent = `${deck.length} / ${max}`;

  el.classList.toggle('full', deck.length >= max);

}



function openCardModal(card) {

  openCardId = card.id;

  const d = getCardData(card.id);

  const deck = getDeck(activeChar);

  const inDeck = deck.includes(card.id);

  const max = getDeckMax(activeChar);

  const name = cardName(card);



  document.getElementById('card-modal-img').src = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${card.code}/${card.id}.png`;

  document.getElementById('card-modal-frame').style.backgroundImage = `url('./assets/ui/card-bg-${card.code.toLowerCase()}.png')`;

  document.getElementById('card-modal-title').textContent = name;

  const lvlLabel = lang==='de'?'Stufe':'Уровень';

  const initLabel = lang==='de'?'Initiative':'Инициатива';

  document.getElementById('card-modal-meta').textContent =

    `${lvlLabel}: ${card.level} · ID: ${card.id}${d.initiative?' · '+initLabel+': '+d.initiative:''}`;



  const lostWarn = document.getElementById('card-modal-lost-warn');

  if (d.lost) {

    lostWarn.textContent = lang==='de' ? '⚠ VERLUST — Karte wird abgelegt!' : '⚠ ПОТЕРЯ — карта уничтожается после использования!';

    lostWarn.classList.remove('hidden');

  } else { lostWarn.classList.add('hidden'); }



  const desc = lang==='de' ? (d.descDe||'') : (d.descRu||'');

  const descEl = document.getElementById('card-modal-desc');

  descEl.textContent = desc;

  descEl.style.display = desc ? '' : 'none';



  const btn = document.getElementById('card-modal-deck-btn');

  if (inDeck) {

    btn.textContent = lang==='de' ? '− Aus Deck entfernen' : '− Убрать из колоды';

    btn.className = 'btn-primary remove';

    btn.disabled = false; btn.style.opacity = '';

  } else {

    btn.textContent = lang==='de' ? '+ Zum Deck' : '+ В колоду';

    btn.className = 'btn-primary';

    btn.disabled = deck.length >= max;

    btn.style.opacity = deck.length >= max ? '0.5' : '';

  }

  document.getElementById('card-modal').classList.add('open');

  const cards = getFilteredCards();
  const idx = cards.findIndex(c => c.id === card.id);
  document.getElementById('card-nav-prev').disabled = idx <= 0;
  document.getElementById('card-nav-next').disabled = idx >= cards.length - 1;

}

function navigateCardModal(delta) {
  const cards = getFilteredCards();
  const idx = cards.findIndex(c => c.id === openCardId);
  const next = cards[idx + delta];
  if (next) openCardModal(next);
}

function closeCardModal(e) { if (e.target===document.getElementById('card-modal')) closeCardModalDirect(); }

function closeCardModalDirect() { document.getElementById('card-modal').classList.remove('open'); }

function searchCardById() {
  const input = document.getElementById('card-search-input');
  const raw = input.value.trim();
  if (!raw) return;
  const id = String(Number(raw)).padStart(3, '0');

  for (const charCode of Object.keys(CHARS)) {
    const card = CHARS[charCode].cards.find(c => c.id === id);
    if (card) {
      if (activeChar !== charCode) selectChar(charCode);
      openCardModal(card);
      input.value = '';
      return;
    }
  }

  input.classList.add('search-not-found');
  setTimeout(() => input.classList.remove('search-not-found'), 700);
}



function toggleCardInDeck() {

  if (!activeChar || !openCardId) return;

  const max = getDeckMax(activeChar);

  let deck = getDeck(activeChar);

  if (deck.includes(openCardId)) deck = deck.filter(id => id !== openCardId);

  else { if (deck.length >= max) return; deck.push(openCardId); }

  setDeck(activeChar, deck);

  renderDeckCounter(); renderCardsGrid();

  if (cardsView === 'deck') renderDeckGrid();

  const card = CHARS[activeChar].cards.find(c => c.id === openCardId);

  if (card) openCardModal(card);

}



function toggleDeckFromThumb(card) {

  if (!activeChar) return;

  const max = getDeckMax(activeChar);

  let deck = getDeck(activeChar);

  if (deck.includes(card.id)) deck = deck.filter(id => id !== card.id);

  else {

    if (deck.length >= max) { alert(lang==='de'?`Deck voll (${max})!`:`Колода полна (${max} карт)!`); return; }

    deck.push(card.id);

  }

  setDeck(activeChar, deck);

  renderDeckCounter(); renderCardsGrid();

  if (cardsView === 'deck') renderDeckGrid();

}



function clearDeck() {
  if (!activeChar) return;
  setDeck(activeChar, []);
  renderDeckCounter();
  renderCardsGrid();
  if (cardsView === 'deck') renderDeckGrid();
}
