// Player identity
let playerId = null;

let sessionCode = null;
let sessionRef = null;
let sessionPlayers = {}; // {playerId: {name, hero, joinedAt, deck, gold, items}}
let sessionShopStock = null; // null = no session, use local shop logic

// Session create / join / leave

function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function createSession() {
  const code = generateSessionCode();
  _connectSession(code);
}

function joinSessionFromInput() {
  const input = document.getElementById('sb-code-input');
  const code = (input ? input.value : '').toUpperCase().trim();
  if (code.length !== 4) return;
  _connectSession(code);
}

function _connectSession(code) {
  if (sessionRef) sessionRef.off();
  sessionCode = code;
  sessionRef = db.ref(`sessions/${code}`);
  lsSet('gh_session', code);

  const savedName = lsGet('gh_player_name', null);
  const defaultName = (lang === 'de' ? 'Spieler' : 'Игрок') + ' ' + (Object.keys(sessionPlayers).length + 1);

  sessionRef.child(`players/${playerId}`).update({
    name: savedName || defaultName,
    hero: null,
    joinedAt: Date.now()
  });
  sessionRef.child(`players/${playerId}/gold`).set(getMyGold());

  const myHero = lsGet('activeChar', null);
  if (myHero) syncDeckToFirebase(myHero);

  sessionRef.child(`players/${playerId}/items`).once('value').then(snap => {
    if (!snap.exists()) {
      const localItems = getInventory(playerId);
      sessionRef.child(`players/${playerId}/items`).set(localItems);
    }
  });

  sessionRef.child('players').on('value', snap => {
    sessionPlayers = snap.val() || {};

    Object.entries(sessionPlayers).forEach(([pid, p]) => {
      if (Array.isArray(p.items)) setInventory(pid, p.items);
    });

    updateSessionBar();
    updateCharCards();
    renderPartyTab();
    updateShopGoldBar();
    if (typeof renderItemsGrid === 'function') renderItemsGrid();
    if (typeof renderOwnedGrid === 'function') renderOwnedGrid();
  });

  sessionRef.child('goals').on('value', snap => {
    const data = snap.val();
    if (data && JSON.stringify(data) !== JSON.stringify(drawState)) {
      drawState = data;
      renderDrawResults();
    }
  });

  sessionRef.child('shop/stock').on('value', snap => {
    const stock = snap.val();
    if (!stock) {
      const initial = typeof getInitialStock === 'function' ? getInitialStock() : {};
      sessionRef.child('shop/stock').set(initial);
      sessionShopStock = initial;
    } else {
      sessionShopStock = stock;
    }
    updateShopGoldBar();
    if (typeof renderItemsGrid === 'function') renderItemsGrid();
    if (typeof renderOwnedGrid === 'function') renderOwnedGrid();
  });

  updateSessionBar();
  renderPartyTab();
  updateShopGoldBar();
}

function leaveSession() {
  const overlays = ['deck-view-overlay', 'shop-choice-overlay', 'item-transfer-overlay', 'rest-overlay'];
  overlays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  if (sessionRef) {
    sessionRef.child(`players/${playerId}/hero`).set(null);
    sessionRef.off();
    sessionRef = null;
  }
  sessionCode = null;
  sessionPlayers = {};
  sessionShopStock = null;
  lsSet('gh_session', null);
  updateSessionBar();
  updateCharCards();
  renderPartyTab();
  updateShopGoldBar();
  if (typeof renderItemsGrid === 'function') renderItemsGrid();
  if (typeof renderOwnedGrid === 'function') renderOwnedGrid();
}

// Hero claiming

function sessionClaimHero(heroCode) {
  if (!sessionRef) return;
  const prev = sessionPlayers[playerId]?.hero;
  if (prev === heroCode) return;

  const takenBy = Object.entries(sessionPlayers).find(
    ([pid, p]) => p.hero === heroCode && pid !== playerId
  );
  if (takenBy) return;

  sessionRef.child(`players/${playerId}/hero`).set(heroCode);
  syncDeckToFirebase(heroCode);
}

function getMyHero() {
  return sessionPlayers[playerId]?.hero || null;
}

function getHeroOwner(heroCode) {
  const entry = Object.entries(sessionPlayers).find(([, p]) => p.hero === heroCode);
  return entry ? { id: entry[0], ...entry[1] } : null;
}

// Gold + shop stock sync

function syncGoldToFirebase(amount) {
  if (!sessionRef) return;
  sessionRef.child(`players/${playerId}/gold`).set(amount);
}

function getMyGold() {
  return parseInt(lsGet('gh_gold', '0'), 10) || 0;
}

function setMyGold(amount) {
  const safeAmount = Math.max(0, parseInt(amount, 10) || 0);
  lsSet('gh_gold', String(safeAmount));
  syncGoldToFirebase(safeAmount);
  updateShopGoldBar();
  renderPartyTab();
}

function syncShopStockToFirebase(stock) {
  if (!sessionRef) return;
  sessionRef.child('shop/stock').set(stock);
}

function getItemStock(itemId) {
  if (!sessionShopStock) return 99;
  return sessionShopStock[itemId] ?? 1;
}

// Session items

function getSessionPlayerItems(pid) {
  const remote = sessionPlayers[pid]?.items;
  if (Array.isArray(remote)) return [...remote];
  if (pid === playerId) return [...getInventory(playerId)];
  return [];
}

function setSessionPlayerItems(pid, items) {
  const normalized = Array.isArray(items) ? items : [];
  setInventory(pid, normalized);
  if (!sessionRef || !pid) return;
  sessionRef.child(`players/${pid}/items`).set(normalized);
}

function getTransferTargets() {
  return Object.entries(sessionPlayers).filter(([pid, p]) => pid !== playerId && p.hero);
}

function transferItemToPlayer(itemId, targetId) {
  if (!sessionRef || !itemId || !targetId || targetId === playerId) return;

  const myItems = getSessionPlayerItems(playerId).filter(id => id !== itemId);
  const targetItems = getSessionPlayerItems(targetId);
  if (!targetItems.includes(itemId)) targetItems.push(itemId);

  setSessionPlayerItems(playerId, myItems);
  setSessionPlayerItems(targetId, targetItems);
}

// Sync draw state

function syncDrawState() {
  if (sessionRef && drawState !== null) {
    sessionRef.child('goals').set(drawState);
  }
}

function syncDeckToFirebase(heroCode) {
  if (!sessionRef || !heroCode) return;
  const deck = getDeck(heroCode);
  sessionRef.child(`players/${playerId}/deck`).set(deck);
}

function startMissionWithDeck() {
  if (!sessionRef || !playerId) return;
  const heroCode = (typeof getMyHero === 'function' ? getMyHero() : null) || activeChar;
  if (!heroCode) return;

  const deck = getDeck(heroCode);
  if (!deck || deck.length === 0) return;

  const initialStates = {};
  deck.forEach(id => { initialStates[id] = 'hand'; });

  sessionRef.child(`players/${playerId}/missionDeck`).set(deck);
  sessionRef.child(`players/${playerId}/cardStates`).set(initialStates);
}

function setCardState(cardId, state) {
  if (!sessionRef || !playerId || !cardId) return;
  sessionRef.child(`players/${playerId}/cardStates/${cardId}`).set(state);
}

function getMyCardStates() {
  const p = sessionPlayers[playerId] || {};
  return p.cardStates || {};
}

function getMyMissionDeck() {
  const p = sessionPlayers[playerId] || {};
  return Array.isArray(p.missionDeck) ? p.missionDeck : [];
}

function getMissionCardName(cardId) {
  const data = typeof getCardData === 'function' ? getCardData(cardId) : null;
  if (!data) return cardId;
  return lang === 'de' ? (data.nameDe || cardId) : (data.nameRu || cardId);
}

function doRest() {
  if (!sessionRef || !playerId) return;
  const states = getMyCardStates();
  const deck = getMyMissionDeck();
  const playedCards = deck.filter(id => states[id] === 'played');

  if (playedCards.length === 0) {
    const reset = {};
    deck.forEach(id => {
      reset[id] = states[id] === 'lost' ? 'lost' : 'hand';
    });
    sessionRef.child(`players/${playerId}/cardStates`).update(reset);
    return;
  }

  _showRestOverlay(playedCards, lostCardId => {
    const updates = {};
    deck.forEach(id => {
      if (states[id] === 'lost') updates[id] = 'lost';
      else if (id === lostCardId) updates[id] = 'lost';
      else updates[id] = 'hand';
    });
    sessionRef.child(`players/${playerId}/cardStates`).update(updates);
  });
}

function _showRestOverlay(playedCards, callback) {
  const existing = document.getElementById('rest-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'rest-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? 'Wähle 1 Karte zum Ablegen' : 'Выберите карту для сброса';
  box.appendChild(title);

  playedCards.forEach(cardId => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rest-card-btn';
    btn.innerHTML = `<span class="rest-card-id">${cardId}</span><span class="rest-card-name">${getMissionCardName(cardId)}</span>`;
    btn.onclick = () => {
      overlay.remove();
      callback(cardId);
    };
    box.appendChild(btn);
  });

  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function _showLoseConfirmOverlay(cardId, callback) {
  const existing = document.getElementById('lose-confirm-overlay');
  if (existing) existing.remove();

  const name = getMissionCardName(cardId);

  const overlay = document.createElement('div');
  overlay.id = 'lose-confirm-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box lose-confirm-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? 'Karte verlieren?' : 'Потерять карту?';

  const cardLabel = document.createElement('div');
  cardLabel.className = 'lose-confirm-card-name';
  cardLabel.textContent = `${cardId} — ${name}`;

  const btnRow = document.createElement('div');
  btnRow.className = 'lose-confirm-btns';

  const btnConfirm = document.createElement('button');
  btnConfirm.type = 'button';
  btnConfirm.className = 'lose-confirm-yes';
  btnConfirm.textContent = lang === 'de' ? 'Verlieren' : 'Потерять';
  btnConfirm.onclick = () => {
    overlay.remove();
    callback();
  };

  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.className = 'lose-confirm-no';
  btnCancel.textContent = lang === 'de' ? 'Abbrechen' : 'Отмена';
  btnCancel.onclick = () => overlay.remove();

  btnRow.appendChild(btnConfirm);
  btnRow.appendChild(btnCancel);
  box.appendChild(title);
  box.appendChild(cardLabel);
  box.appendChild(btnRow);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// Update char cards (taken / available)

function updateCharCards() {
  ['HA', 'DE', 'VW', 'RG'].forEach(code => {
    const card = document.getElementById(`charcard-${code}`);
    if (!card) return;
    const owner = getHeroOwner(code);
    const isMine = owner && owner.id === playerId;
    const isTaken = owner && owner.id !== playerId;

    card.classList.toggle('char-taken', isTaken);
    card.classList.toggle('selected', isMine || (!sessionCode && activeChar === code));

    let badge = card.querySelector('.char-session-badge');
    if (isTaken) {
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'char-session-badge';
        card.appendChild(badge);
      }
      badge.textContent = owner.name || '?';
    } else if (badge) {
      badge.remove();
    }
  });
}

// Player name

function updatePlayerName(name) {
  name = name.trim();
  if (!name) return;
  lsSet('gh_player_name', name);
  if (sessionRef) {
    sessionRef.child(`players/${playerId}/name`).set(name);
  }
}

function showPlayerDeck(pid) {
  const p = sessionPlayers[pid];
  if (!p) return;

  const existing = document.getElementById('deck-view-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'deck-view-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = `Колода: ${p.name || '?'} (${p.hero || '?'})`;

  const list = document.createElement('div');
  list.className = 'deck-view-list';

  const deck = Array.isArray(p.deck) ? p.deck : [];
  if (deck.length) {
    deck.forEach(cardId => {
      const item = document.createElement('div');
      item.className = 'deck-view-card';
      const img = document.createElement('img');
      img.src = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${p.hero}/${cardId}.png`;
      img.alt = cardId;
      img.onerror = () => {
        item.innerHTML = `<div class="deck-view-empty">${cardId}</div>`;
      };
      item.appendChild(img);
      list.appendChild(item);
    });
  } else {
    const empty = document.createElement('div');
    empty.className = 'deck-view-empty';
    empty.textContent = lang === 'de' ? 'Deck ist leer' : 'Колода пуста';
    list.appendChild(empty);
  }

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'deck-view-close';
  closeBtn.textContent = lang === 'de' ? 'Schließen' : 'Закрыть';
  closeBtn.onclick = () => overlay.remove();

  box.appendChild(title);
  box.appendChild(list);
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function updateShopGoldBar() {
  const bar = document.getElementById('shop-gold-bar');
  if (!bar) return;
  bar.style.display = sessionCode ? 'flex' : 'none';

  const input = document.getElementById('shop-gold-input');
  if (input && !input.dataset.initialized) {
    input.dataset.initialized = '1';
    input.addEventListener('change', () => setMyGold(parseInt(input.value, 10) || 0));
  }
  if (input) input.value = getMyGold();
}

function renderPartyTab() {
  const content = document.getElementById('party-content');
  if (!content) return;

  if (!sessionCode) {
    content.innerHTML = `<div class="party-empty">${lang === 'de'
      ? 'Keine aktive Sitzung. Bitte im Header beitreten oder eine Sitzung erstellen.'
      : 'Нет активной сессии. Подключитесь или создайте сессию в хедере.'}</div>`;
    return;
  }

  const heroFaceImg = code => code
    ? `<img src="assets/heroes/${code}_face.png" alt="${code}" class="party-hero-face">`
    : '❓';
  const stateLabels = lang === 'de'
    ? { hand: 'Auf der Hand', played: 'Gespielt', lost: 'Verloren' }
    : { hand: 'На руке', played: 'Сыграны', lost: 'Потрачены' };

  function renderMissionCard(cardId, state, isMe, heroCode) {
    const imgSrc = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${heroCode}/${cardId}.png`;
    const actions = isMe && state !== 'lost'
      ? `<div class="mission-card-actions">
          ${state === 'hand' ? `<button class="btn-card-play" type="button" data-card-play="${cardId}">${lang === 'de' ? 'Spielen' : 'Сыграть'}</button>` : ''}
          ${state === 'played' ? `<button class="btn-card-return" type="button" data-card-return="${cardId}">${lang === 'de' ? 'Zurück' : 'Вернуть'}</button>` : ''}
          <button class="btn-card-lose" type="button" data-card-lose="${cardId}">${lang === 'de' ? 'Verlieren' : 'Потерять'}</button>
        </div>`
      : '';

    return `<div class="mission-card-item">
      <img class="mission-card-img state-${state}" src="${imgSrc}" alt="${cardId}" data-card-preview="${imgSrc}">
      ${actions}
    </div>`;
  }

  function renderMissionDeck(p, isMe) {
    const deck = Array.isArray(p.missionDeck) ? p.missionDeck : [];
    const states = p.cardStates || {};

    if (!deck.length) {
      return `<div class="party-no-items">${lang === 'de' ? 'Noch kein Deck gewählt' : 'Колода ещё не выбрана'}</div>`;
    }

    const groups = { hand: [], played: [], lost: [] };
    deck.forEach(cardId => {
      const state = states[cardId] || 'hand';
      if (groups[state]) groups[state].push(cardId);
      else groups.hand.push(cardId);
    });

    const sections = ['hand', 'played', 'lost'].map(state => `
      <div class="party-mission-section">
        <div class="party-section-label">${stateLabels[state]} (${groups[state].length})</div>
        <div class="mission-card-list">
          ${groups[state].length
            ? groups[state].map(cardId => renderMissionCard(cardId, state, isMe, p.hero || '')).join('')
            : `<span class="party-no-items">${lang === 'de' ? 'keine' : 'нет'}</span>`}
        </div>
      </div>`).join('');

    const restBtn = isMe
      ? `<button class="btn-rest" type="button" data-party-rest="1">${lang === 'de' ? '🌙 Rast' : '🌙 Отдых'}</button>`
      : '';

    return `${sections}${restBtn}`;
  }

  const playerEntries = Object.entries(sessionPlayers).sort(([pidA], [pidB]) => {
    if (pidA === playerId) return -1;
    if (pidB === playerId) return 1;
    return 0;
  });

  const cardsHtml = playerEntries.map(([pid, p]) => {
    const isMe = pid === playerId;
    const heroLabel = p.hero ? charName(p.hero) : '---';
    const bodyId = `party-player-body-${pid}`;

    const goldBlock = isMe
      ? `<div class="party-gold-row"><span>🪙</span><input class="party-gold-input" type="number" min="0" max="999" value="${p.gold ?? 0}" data-party-gold="${pid}"></div>`
      : `<div class="party-gold-row"><span>🪙 ${p.gold ?? 0}</span></div>`;

    return `
      <div class="party-player-card${isMe ? ' party-me' : ''}">
        ${isMe
          ? `<div class="party-player-header">${heroFaceImg(p.hero)} ${heroLabel}</div>`
          : `<button class="party-player-header party-player-toggle" type="button" data-party-toggle="${bodyId}">
              <span>${heroFaceImg(p.hero)} ${heroLabel}</span>
              <span class="party-player-arrow">▶</span>
            </button>`}
        <div id="${bodyId}" class="party-player-body${isMe ? '' : ' hidden'}">
          ${goldBlock}
          ${renderMissionDeck(p, isMe)}
        </div>
      </div>`;
  }).join('');

  content.innerHTML = cardsHtml;

  content.querySelectorAll('[data-party-gold]').forEach(input => {
    if (input.dataset.initialized) return;
    input.dataset.initialized = '1';
    input.addEventListener('change', () => setMyGold(parseInt(input.value, 10) || 0));
  });

  content.querySelectorAll('[data-party-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = document.getElementById(btn.dataset.partyToggle);
      const arrow = btn.querySelector('.party-player-arrow');
      if (!body) return;
      body.classList.toggle('hidden');
      if (arrow) arrow.textContent = body.classList.contains('hidden') ? '▶' : '▼';
    });
  });

  content.querySelectorAll('[data-card-play]').forEach(btn => {
    btn.addEventListener('click', () => setCardState(btn.dataset.cardPlay, 'played'));
  });

  content.querySelectorAll('[data-card-lose]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.dataset.cardLose;
      _showLoseConfirmOverlay(cardId, () => setCardState(cardId, 'lost'));
    });
  });

  content.querySelectorAll('[data-card-return]').forEach(btn => {
    btn.addEventListener('click', () => setCardState(btn.dataset.cardReturn, 'hand'));
  });

  content.querySelectorAll('[data-card-preview]').forEach(img => {
    img.addEventListener('click', () => {
      if (typeof openImgLightbox === 'function') openImgLightbox(img.dataset.cardPreview);
    });
  });

  content.querySelectorAll('[data-party-rest]').forEach(btn => {
    btn.addEventListener('click', () => doRest());
  });
}

// Session bar UI

function _initNameInput(el) {
  if (!el || el.dataset.initialized) return;
  el.dataset.initialized = '1';
  el.value = lsGet('gh_player_name', '') || '';
  el.addEventListener('change', () => updatePlayerName(el.value));
  el.addEventListener('blur', () => updatePlayerName(el.value));
}

function updateSessionBar() {
  const de = lang === 'de';

  const dDisc = document.getElementById('sb-d-disconnected');
  const dConn = document.getElementById('sb-d-connected');
  if (!dDisc) return;

  const joinBtn = document.getElementById('sb-join-btn');
  const createBtn = document.getElementById('sb-create-btn');
  const codeInput = document.getElementById('sb-code-input');
  const leaveBtn = document.getElementById('sb-leave-btn');
  if (joinBtn) joinBtn.textContent = de ? 'Beitreten' : 'Войти';
  if (createBtn) createBtn.textContent = de ? '+ Neu' : '+ Новая';
  if (codeInput) codeInput.placeholder = de ? 'Code' : 'Код';
  if (leaveBtn) leaveBtn.title = de ? 'Verlassen' : 'Выйти';

  if (sessionCode) {
    dDisc.classList.add('hidden');
    dConn.classList.remove('hidden');
    const codeDisplay = document.getElementById('sb-code-display');
    if (codeDisplay) codeDisplay.textContent = sessionCode;
    _initNameInput(document.getElementById('sb-name-input'));
  } else {
    dDisc.classList.remove('hidden');
    dConn.classList.add('hidden');
  }

  updateShopGoldBar();
}

function initSession() {
  playerId = lsGet('gh_player_id', null);
  if (!playerId) {
    playerId = Math.random().toString(36).substr(2, 9);
    lsSet('gh_player_id', playerId);
  }
  const saved = lsGet('gh_session', null);
  if (saved) _connectSession(saved);
  else {
    updateSessionBar();
    renderPartyTab();
    updateShopGoldBar();
  }
}
