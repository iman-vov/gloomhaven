// Player module: campaign progress, mission deck, rewards, and equipment.

// ─── Lightbox navigation for player cards ─────────────────
let _playerLbSrcs = [];
let _playerLbIdx  = 0;

function openPlayerCardLightbox(srcs, idx) {
  _playerLbSrcs = srcs;
  _playerLbIdx  = idx;
  const lb = document.getElementById('img-lightbox');
  document.getElementById('img-lightbox-img').src = srcs[idx];
  lb.classList.add('open');
  _updatePlayerLbNav();
}

function _updatePlayerLbNav() {
  const prev = document.getElementById('img-lb-prev');
  const next = document.getElementById('img-lb-next');
  if (prev) prev.style.display = _playerLbSrcs.length > 1 ? 'flex' : 'none';
  if (next) next.style.display = _playerLbSrcs.length > 1 ? 'flex' : 'none';
}

function playerLbNav(delta) {
  if (!_playerLbSrcs.length) return;
  _playerLbIdx = (_playerLbIdx + delta + _playerLbSrcs.length) % _playerLbSrcs.length;
  document.getElementById('img-lightbox-img').src = _playerLbSrcs[_playerLbIdx];
}

function getLocalPlayerData(heroCode) {
  const data = lsGet(`player_${heroCode}`, {});
  const missionCount = data.missionCount || 1;
  return {
    playerLevel: data.playerLevel || 1,
    playerXP: data.playerXP || 0,
    gold: Math.max(0, parseInt(data.gold, 10) || 0),
    missionCount,
    poolCards: Array.isArray(data.poolCards) && data.poolCards.length ? data.poolCards : computePool(heroCode, missionCount),
    missionItems: Array.isArray(data.missionItems) ? data.missionItems : [],
    items: getInventory(heroCode)
  };
}

function setLocalPlayerData(heroCode, updates) {
  if (!heroCode) return Promise.resolve();
  const current = getLocalPlayerData(heroCode);
  lsSet(`player_${heroCode}`, { ...current, ...updates });
  return Promise.resolve();
}

function renderLocalHeroPicker(empty) {
  empty.innerHTML = [
    '<div>' + (lang === 'de' ? 'W\u00e4hle einen Charakter.' : '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430.') + '</div>',
    '<div class="char-select-grid-modal player-local-hero-grid">',
    Object.entries(CHARS).map(([code, c]) => [
      '<button class="char-card-modal" type="button" data-player-hero="' + code + '">',
      '<img src="assets/heroes/' + code + '_face.png" alt="' + code + '" style="border-color:' + c.color + '">',
      '<div class="char-modal-name">' + escHtml(charName(code)) + '</div>',
      '</button>'
    ].join('')).join(''),
    '</div>'
  ].join('');
  empty.querySelectorAll('[data-player-hero]').forEach(btn => {
    btn.onclick = () => selectChar(btn.dataset.playerHero);
  });
  empty.classList.remove('hidden');
}

// ─── Confirm deck reset ────────────────────────────────────
function _confirmDeckReset(onConfirm) {
  const existing = document.getElementById('deck-reset-confirm');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'deck-reset-confirm';
  overlay.className = 'modal-overlay';
  overlay.style.cssText = 'z-index:2000;display:flex;align-items:center;justify-content:center;';

  const box = document.createElement('div');
  box.className = 'modal-box';
  box.style.cssText = 'max-width:320px;padding:24px;text-align:center;';
  box.onclick = e => e.stopPropagation();

  box.innerHTML = `
    <p style="margin:0 0 18px">${lang === 'de'
      ? 'Missionsdeck zurücksetzen?'
      : 'Сбросить колоду миссии?'}</p>
    <div style="display:flex;gap:10px;justify-content:center;">
      <button id="deck-reset-yes" style="flex:1;padding:10px;background:var(--gold2);color:#1a1209;border:none;border-radius:6px;font-weight:700;cursor:pointer;">${lang === 'de' ? 'Ja' : 'Да'}</button>
      <button id="deck-reset-no" style="flex:1;padding:10px;background:var(--bg3);color:var(--text);border:1px solid var(--border2);border-radius:6px;cursor:pointer;">${lang === 'de' ? 'Nein' : 'Нет'}</button>
    </div>`;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById('deck-reset-yes').onclick = () => { overlay.remove(); onConfirm(); };
  document.getElementById('deck-reset-no').onclick  = () => overlay.remove();
}

const TUT_A = {
  HA: ['002', '003', '004', '005', '006', '007'],
  DE: ['074', '075', '076', '077', '078', '079'],
  VW: ['143', '144', '145', '146', '147', '148'],
  RG: ['216', '217', '218', '219', '220', '221']
};

const TUT_B_PAIRS = {
  HA: [['006', '008'], ['007', '009']],
  DE: [['078', '080'], ['079', '081']],
  VW: [['145', '150'], ['148', '149']],
  RG: [['216', '223'], ['220', '222']]
};

const MISSION3_LV1 = {
  HA: ['010', '011'],
  DE: ['082', '083'],
  VW: ['151', '152'],
  RG: ['224', '225']
};

const XP_THRESHOLDS = [0, 45, 95, 150, 210, 275, 345, 420, 500];

const HERO_HP = {
  HA: [8, 9, 11, 12, 14, 15, 17, 18, 20],
  DE: [8, 9, 11, 12, 14, 15, 17, 18, 20],
  VW: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  RG: [10, 12, 14, 16, 18, 20, 22, 24, 26]
};

const ITEM_SLOTS = {
  head:  { ids: ['001', '002', '015', '021'], max: 1 },
  body:  { ids: ['003', '004', '016', '022', '028', '035'], max: 1 },
  legs:  { ids: ['005', '006', '017', '023', '036'], max: 1 },
  hand:  { ids: ['007', '008', '009', '010', '018', '019', '024', '025', '029', '034'], max: 2 },
  small: {
    ids: ['011', '012', '013', '014', '020', '026', '027', '030', '031', '032', '033'],
    maxFn: level => Math.ceil(level / 2)
  }
};

let playerCachedPool = [];
let playerCachedLevel = 1;

function computePool(hero, missionCount) {
  if (!hero || !TUT_A[hero]) return [];
  const mc = missionCount || 1;

  if (mc === 1) return [...TUT_A[hero]];

  if (mc === 2) {
    const pool = [...TUT_A[hero]];
    TUT_B_PAIRS[hero].forEach(([from, to]) => {
      const idx = pool.indexOf(from);
      if (idx !== -1) pool[idx] = to;
    });
    return pool;
  }

  if (mc === 3) {
    const pool = computePool(hero, 2);
    MISSION3_LV1[hero].forEach(id => pool.push(id));
    return pool;
  }

  const cards = CHARS[hero] ? CHARS[hero].cards : [];
  if (mc === 4) return cards.filter(c => c.level === '1').map(c => c.id);
  return cards.filter(c => c.level === '1' || c.level === 'X').map(c => c.id);
}

function setPlayerData(field, value) {
  if (!sessionCode) return setLocalPlayerData(activeChar, { [field]: value });
  if (!playerId) return Promise.resolve();
  return firebase.database()
    .ref('sessions/' + sessionCode + '/players/' + playerId + '/' + field)
    .set(value);
}

function updatePlayerData(updates) {
  if (!sessionCode) return setLocalPlayerData(activeChar, updates);
  if (!playerId) return Promise.resolve();
  return firebase.database()
    .ref('sessions/' + sessionCode + '/players/' + playerId)
    .update(updates);
}

function ensurePlayerDefaults(heroCode) {
  if (!heroCode) return Promise.resolve();
  if (!sessionCode) return setLocalPlayerData(heroCode, getLocalPlayerData(heroCode));
  if (!playerId) return Promise.resolve();
  return firebase.database()
    .ref('sessions/' + sessionCode + '/players/' + playerId)
    .once('value')
    .then(snap => {
      const pd = snap.val() || {};
      const updates = {};
      if (!pd.playerLevel) updates.playerLevel = 1;
      if (!pd.playerXP) updates.playerXP = 0;
      if (pd.gold === undefined || pd.gold === null) updates.gold = 0;
      if (!pd.missionCount) updates.missionCount = 1;
      if (!Array.isArray(pd.poolCards) || !pd.poolCards.length) {
        updates.poolCards = computePool(heroCode, pd.missionCount || 1);
      }
      if (Object.keys(updates).length) return updatePlayerData(updates);
      return Promise.resolve();
    });
}

async function renderPlayerTab() {
  if (!activeChar) {
    hidePlayerSections();
    const empty = document.getElementById('player-empty');
    if (empty) {
      if (sessionCode) {
        empty.textContent = lang === 'de'
          ? 'W\u00e4hle deinen Charakter im Auswahlfenster.'
          : '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 \u0432 \u043e\u043a\u043d\u0435 \u0432\u044b\u0431\u043e\u0440\u0430.';
        empty.classList.remove('hidden');
        return;
      }

      renderLocalHeroPicker(empty);
    }
    return;
  }

  const empty = document.getElementById('player-empty');
  if (empty) {
    if (sessionCode) {
      empty.classList.add('hidden');
      empty.innerHTML = '';
    } else {
      renderLocalHeroPicker(empty);
    }
  }

  await ensurePlayerDefaults(activeChar);
  let pd;
  if (sessionCode && playerId) {
    const snap = await firebase.database()
      .ref('sessions/' + sessionCode + '/players/' + playerId)
      .once('value');
    pd = snap.val() || {};
  } else {
    pd = getLocalPlayerData(activeChar);
  }

  const level = pd.playerLevel || 1;
  const xp = pd.playerXP || 0;
  const missionCount = pd.missionCount || 1;
  const pool = Array.isArray(pd.poolCards) && pd.poolCards.length
    ? pd.poolCards
    : computePool(activeChar, missionCount);
  const deck = getDeck(activeChar);

  playerCachedPool = [...pool];
  playerCachedLevel = level;

  const portrait = document.getElementById('player-hero-portrait');
  portrait.src = 'assets/heroes/' + activeChar + '.png';
  portrait.alt = activeChar;
  document.getElementById('player-hero-name').textContent = charName(activeChar);
  document.getElementById('player-level-display').textContent = level;
  const hp = HERO_HP[activeChar] ? HERO_HP[activeChar][level - 1] : null;
  const hpEl = document.getElementById('player-hp-display');
  if (hpEl && hpEl.parentElement) {
    const hpLabel = hpEl.parentElement.querySelector('[data-ru]');
    if (hpLabel) {
      hpLabel.dataset.ru = '❤️ HP';
      hpLabel.dataset.de = '❤️ HP';
      hpLabel.textContent = '❤️ HP';
    }
  }
  if (hpEl) hpEl.textContent = hp || '—';
  document.getElementById('player-xp-display').textContent = xp;
  document.getElementById('player-xp-threshold').textContent =
    level < 9 ? ' / ' + XP_THRESHOLDS[level] : (lang === 'de' ? ' (max.)' : ' (макс.)');
  document.getElementById('player-gold-display').textContent = getMyGold();
  document.getElementById('player-mission-count').value = missionCount;

  document.getElementById('player-hero-header').classList.remove('hidden');
  document.getElementById('player-reward-section').classList.remove('hidden');
  document.getElementById('player-mission-section').classList.remove('hidden');
  document.getElementById('player-pool-section').classList.remove('hidden');
  document.getElementById('player-deck-section').classList.remove('hidden');
  document.getElementById('player-items-section').classList.remove('hidden');

  renderPoolGrid(pool, deck, activeChar);
  renderPlayerDeckGrid(deck, activeChar, level);
  renderItemsSlots(pd.missionItems || [], level, pd.items);
  checkLevelUp(xp, level, activeChar);
}

function hidePlayerSections() {
  [
    'player-empty',
    'player-hero-header',
    'player-reward-section',
    'player-mission-section',
    'player-pool-section',
    'player-deck-section',
    'player-items-section',
    'levelup-section'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
}

function renderPoolGrid(pool, deck, hero) {
  const grid = document.getElementById('player-pool-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const base = './assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/' + hero + '/';
  const srcs = pool.map(id => base + id + '.png');

  pool.forEach((id, idx) => {
    const card = CHARS[hero] && CHARS[hero].cards.find(c => c.id === id);
    const name = card ? cardName(card) : id;
    const inDeck = deck.includes(id);
    const el = document.createElement('div');
    el.className = 'card-mini' + (inDeck ? ' in-deck' : '');
    el.innerHTML = [
      '<img src="' + srcs[idx] + '" alt="' + id + '"',
      ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">',
      '<div class="img-placeholder" style="display:none"><div class="ph-num">' + id + '</div>' + escHtml(name) + '</div>',
      '<button class="card-mini-btn" type="button" aria-label="' + (inDeck ? 'Remove' : 'Add') + '">' + (inDeck ? '✓' : '+') + '</button>'
    ].join('');
    el.querySelector('img').onclick = () => openPlayerCardLightbox(srcs, idx);
    el.querySelector('.card-mini-btn').onclick = () => togglePlayerDeck(id, hero);
    grid.appendChild(el);
  });
}

function renderPlayerDeckGrid(deck, hero, level) {
  const grid = document.getElementById('player-deck-grid');
  if (!grid) return;
  const max = Math.min(DECK_SIZE[hero] || 10, playerCachedPool.length || DECK_SIZE[hero] || 10);
  grid.innerHTML = '';
  document.getElementById('player-deck-counter').textContent = deck.length + '/' + max;

  const btn = document.getElementById('btn-take-to-mission');
  const actionRow = document.getElementById('player-mission-action-row');
  if (btn) {
    btn.dataset.ru = '▶ Взять выбранное в миссию';
    btn.dataset.de = '▶ Auswahl mitnehmen';
    btn.textContent = lang === 'de' ? btn.dataset.de : btn.dataset.ru;
  }
  if (actionRow) actionRow.classList.toggle('hidden', deck.length === 0);

  const base2 = './assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/' + hero + '/';
  const deckSrcs = deck.map(id => base2 + id + '.png');

  deck.forEach((id, idx) => {
    const card = CHARS[hero] && CHARS[hero].cards.find(c => c.id === id);
    const name = card ? cardName(card) : id;
    const el = document.createElement('div');
    el.className = 'card-mini in-deck';
    el.innerHTML = [
      '<img src="' + deckSrcs[idx] + '" alt="' + id + '"',
      ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">',
      '<div class="img-placeholder" style="display:none"><div class="ph-num">' + id + '</div>' + escHtml(name) + '</div>',
      '<button class="card-mini-btn remove" type="button" aria-label="Remove">−</button>'
    ].join('');
    el.querySelector('img').onclick = () => openPlayerCardLightbox(deckSrcs, idx);
    el.querySelector('.card-mini-btn').onclick = () => togglePlayerDeck(id, hero);
    grid.appendChild(el);
  });
}

function togglePlayerDeck(cardId, hero) {
  const max = DECK_SIZE[hero] || 10;
  let deck = getDeck(hero);

  if (deck.includes(cardId)) {
    deck = deck.filter(id => id !== cardId);
  } else {
    if (deck.length >= max) {
      alert(lang === 'de' ? 'Deck voll (' + max + ')!' : 'Колода полная (' + max + ' карт)!');
      return;
    }
    deck.push(cardId);
  }

  setDeck(hero, deck);
  if (typeof syncDeckToFirebase === 'function') syncDeckToFirebase(hero);
  renderPoolGrid(playerCachedPool, deck, hero);
  renderPlayerDeckGrid(deck, hero, playerCachedLevel);
}

function renderItemsSlots(selectedItems, level, availableItems) {
  const container = document.getElementById('player-items-slots');
  if (!container) return;
  container.innerHTML = '';

  const inventory = Array.isArray(availableItems)
    ? availableItems
    : (sessionCode && typeof getSessionPlayerItems === 'function' ? getSessionPlayerItems(playerId) : getInventory(activeChar));
  const selected = Array.isArray(selectedItems) ? selectedItems : [];
  const itemPreviewSrcs = inventory.map(id => './assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/items/' + id + '.png');

  Object.entries(ITEM_SLOTS).forEach(([slot, config]) => {
    const max = config.maxFn ? config.maxFn(level) : config.max;
    const owned = inventory.filter(id => config.ids.includes(id));
    const picked = selected.filter(id => config.ids.includes(id));
    const box = document.createElement('div');
    box.className = 'item-slot-box';

    const title = document.createElement('div');
    title.className = 'item-slot-title';
    title.textContent = getSlotLabel(slot) + ' ' + picked.length + '/' + max;
    box.appendChild(title);

    if (!owned.length) {
      const empty = document.createElement('div');
      empty.className = 'item-slot-empty';
      empty.textContent = lang === 'de' ? 'Keine Items' : 'Нет предметов';
      box.appendChild(empty);
    } else {
      owned.forEach(id => {
        const item = ITEMS.find(x => x.id === id);
        const checked = selected.includes(id);
        const disabled = !checked && picked.length >= max;
        const row = document.createElement('div');
        row.className = 'item-slot-choice' + (disabled ? ' disabled' : '');
        row.innerHTML = [
          '<input type="checkbox" value="' + id + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>',
          '<img src="./assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/items/' + id + '.png" alt="' + id + '">',
          '<span>' + escHtml(item ? (lang === 'de' ? item.nameDe : item.nameRu) : id) + '</span>'
        ].join('');
        const input = row.querySelector('input');
        input.onchange = () => toggleMissionItem(id);
        input.onclick = e => e.stopPropagation();
        if (item && typeof openImgLightbox === 'function') {
          row.onclick = () => {
            const src = './assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/items/' + id + '.png';
            const idx = itemPreviewSrcs.indexOf(src);
            if (typeof openPlayerCardLightbox === 'function' && idx !== -1) {
              openPlayerCardLightbox(itemPreviewSrcs, idx);
            } else {
              openImgLightbox(src);
            }
          };
        }
        box.appendChild(row);
      });
    }

    container.appendChild(box);
  });
}

function getSlotLabel(slot) {
  const labels = lang === 'de'
    ? { head: 'Kopf', body: 'Körper', legs: 'Beine', hand: 'Hand', small: 'Klein' }
    : { head: 'Голова', body: 'Тело', legs: 'Ноги', hand: 'Руки', small: 'Малые' };
  return labels[slot] || slot;
}

async function toggleMissionItem(itemId) {
  if (!activeChar) return;
  let pd;
  if (sessionCode && playerId) {
    const snap = await firebase.database()
      .ref('sessions/' + sessionCode + '/players/' + playerId)
      .once('value');
    pd = snap.val() || {};
  } else {
    pd = getLocalPlayerData(activeChar);
  }
  const level = pd.playerLevel || 1;
  let selected = Array.isArray(pd.missionItems) ? pd.missionItems : [];

  if (selected.includes(itemId)) {
    selected = selected.filter(id => id !== itemId);
  } else {
    const slotEntry = Object.entries(ITEM_SLOTS).find(([, config]) => config.ids.includes(itemId));
    if (!slotEntry) return;
    const [slot, config] = slotEntry;
    const max = config.maxFn ? config.maxFn(level) : config.max;
    const current = selected.filter(id => config.ids.includes(id));
    if (current.length >= max) return;
    selected = [...selected, itemId];
  }

  await setPlayerData('missionItems', selected);
  renderItemsSlots(selected, level);
}

function applyMissionReward() {
  if (!activeChar) return;
  const xpInput = Math.max(0, parseInt(document.getElementById('reward-xp-input').value, 10) || 0);
  const goldInput = Math.max(0, parseInt(document.getElementById('reward-gold-input').value, 10) || 0);

  const readData = sessionCode && playerId
    ? firebase.database().ref('sessions/' + sessionCode + '/players/' + playerId).once('value').then(snap => snap.val() || {})
    : Promise.resolve(getLocalPlayerData(activeChar));

  readData.then(pd => {
    const nextXP = Math.min(500, (pd.playerXP || 0) + xpInput);
    setMyGold(getMyGold() + goldInput);
    document.getElementById('reward-xp-input').value = 0;
    document.getElementById('reward-gold-input').value = 0;
    return updatePlayerData({ playerXP: nextXP });
  }).then(() => renderPlayerTab());
}

async function completeMission() {
  if (!activeChar) return;
  let pd;
  if (sessionCode && playerId) {
    const snap = await firebase.database()
      .ref('sessions/' + sessionCode + '/players/' + playerId)
      .once('value');
    pd = snap.val() || {};
  } else {
    pd = getLocalPlayerData(activeChar);
  }
  const nextMission = (pd.missionCount || 1) + 1;
  const nextPool = computePool(activeChar, nextMission);
  const hasDeck = getDeck(activeChar).length > 0;
  const nextHp = typeof getPartyHeroMaxHp === 'function' ? getPartyHeroMaxHp(activeChar, pd.playerLevel || 1) : null;

  const updates = { missionCount: nextMission, poolCards: nextPool, missionItems: [] };
  if (sessionCode && nextHp) updates.currentHp = nextHp;
  await updatePlayerData(updates);
  if (sessionCode && typeof resetMissionGoalsForMission === 'function') {
    await resetMissionGoalsForMission(nextMission);
  }
  await renderPlayerTab();

  if (hasDeck) {
    _confirmDeckReset(() => {
      setDeck(activeChar, []);
      if (typeof syncDeckToFirebase === 'function') syncDeckToFirebase(activeChar);
      renderPlayerTab();
    });
  }
}

async function setMissionCountManual(val) {
  const mc = Math.max(1, parseInt(val, 10) || 1);
  if (!activeChar) return;
  const newPool = computePool(activeChar, mc);
  const readData = sessionCode && playerId
    ? firebase.database().ref('sessions/' + sessionCode + '/players/' + playerId).once('value').then(snap => snap.val() || {})
    : Promise.resolve(getLocalPlayerData(activeChar));
  const pd = await readData;
  const nextHp = typeof getPartyHeroMaxHp === 'function' ? getPartyHeroMaxHp(activeChar, pd.playerLevel || 1) : null;
  const updates = { missionCount: mc, poolCards: newPool };
  if (sessionCode && nextHp) updates.currentHp = nextHp;
  await updatePlayerData(updates);
  if (sessionCode && typeof resetMissionGoalsForMission === 'function') {
    await resetMissionGoalsForMission(mc);
  }
  await renderPlayerTab();
  if (getDeck(activeChar).length > 0) {
    _confirmDeckReset(() => {
      setDeck(activeChar, []);
      if (typeof syncDeckToFirebase === 'function') syncDeckToFirebase(activeChar);
      renderPlayerTab();
    });
  }
}

function checkLevelUp(xp, level, hero) {
  const section = document.getElementById('levelup-section');
  if (!section) return;
  if (level >= 9 || xp < XP_THRESHOLDS[level]) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  document.getElementById('levelup-prompt').textContent = lang === 'de'
    ? 'Wähle eine Karte für Stufe ' + (level + 1) + '.'
    : 'Выберите карту уровня ' + (level + 1) + '.';
  renderLevelUpCards(hero, level + 1);
}

function renderLevelUpCards(hero, newLevel) {
  const grid = document.getElementById('levelup-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const candidates = (CHARS[hero] ? CHARS[hero].cards : [])
    .filter(card => parseInt(card.level, 10) === newLevel || (parseInt(card.level, 10) < newLevel && !playerCachedPool.includes(card.id)));

  candidates.forEach(card => {
    const name = cardName(card);
    const el = document.createElement('div');
    el.className = 'card-mini';
    el.innerHTML = [
      '<img src="./assets/cards/' + (lang === 'de' ? 'deu' : 'ru') + '/' + hero + '/' + card.id + '.png" alt="' + card.id + '" onclick="openImgLightbox(this.src)"',
      ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">',
      '<div class="img-placeholder" style="display:none"><div class="ph-num">' + card.id + '</div>' + escHtml(name) + '</div>',
      '<button class="card-mini-btn" type="button">+</button>'
    ].join('');
    el.querySelector('.card-mini-btn').onclick = () => chooseLevelUpCard(card.id, newLevel);
    grid.appendChild(el);
  });
}

async function chooseLevelUpCard(cardId, newLevel) {
  if (!activeChar) return;
  const pool = playerCachedPool.includes(cardId) ? playerCachedPool : [...playerCachedPool, cardId];
  await updatePlayerData({ playerLevel: newLevel, poolCards: pool });
  await renderPlayerTab();
}

function takeToMission() {
  if (typeof startMissionWithDeck === 'function') startMissionWithDeck();
  if (typeof renderPartyTab === 'function') renderPartyTab();
}
