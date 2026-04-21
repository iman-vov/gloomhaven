// Player identity
let playerId = null;

let sessionCode = null;
let sessionRef = null;
let sessionPlayers = {}; // {playerId: {name, hero, joinedAt, deck, gold}}
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

  sessionRef.child('players').on('value', snap => {
    sessionPlayers = snap.val() || {};
    updateSessionBar();
    updateCharCards();
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
    if (typeof renderItemsGrid === 'function') renderItemsGrid();
    if (typeof renderOwnedGrid === 'function') renderOwnedGrid();
  });

  updateSessionBar();
}

function leaveSession() {
  const deckOverlay = document.getElementById('deck-view-overlay');
  if (deckOverlay) deckOverlay.remove();
  const shopOverlay = document.getElementById('shop-choice-overlay');
  if (shopOverlay) shopOverlay.remove();

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
  const goldInput = document.getElementById('sb-gold-input');
  if (goldInput) goldInput.value = safeAmount;
  updateSessionBar();
}

function syncShopStockToFirebase(stock) {
  if (!sessionRef) return;
  sessionRef.child('shop/stock').set(stock);
}

function getItemStock(itemId) {
  if (!sessionShopStock) return 99;
  return sessionShopStock[itemId] ?? 1;
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
      img.src = `assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${p.hero}/${cardId}.png`;
      img.alt = cardId;
      img.onerror = () => { img.style.display = 'none'; item.dataset.id = cardId; item.textContent = cardId; };
      item.appendChild(img);
      list.appendChild(item);
    });
  } else {
    const empty = document.createElement('div');
    empty.className = 'deck-view-card deck-view-empty';
    empty.textContent = lang === 'de' ? 'Leer' : 'Пусто';
    list.appendChild(empty);
  }

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'deck-view-close';
  closeBtn.textContent = 'Закрыть';
  closeBtn.onclick = () => overlay.remove();

  box.appendChild(title);
  box.appendChild(list);
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
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
  const heroIcons = { HA: '🪓', DE: '💥', VW: '🌀', RG: '🛡' };

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
    document.getElementById('sb-code-display').textContent = sessionCode;
    _initNameInput(document.getElementById('sb-name-input'));

    const goldInput = document.getElementById('sb-gold-input');
    if (goldInput) {
      goldInput.value = getMyGold();
      if (!goldInput.dataset.initialized) {
        goldInput.dataset.initialized = '1';
        goldInput.addEventListener('change', () => setMyGold(goldInput.value));
      }
    }

    const list = document.getElementById('sb-players-list');
    if (list) {
      list.innerHTML = '';
      Object.entries(sessionPlayers).forEach(([pid, p]) => {
        const chip = document.createElement('div');
        chip.className = 'sb-player-chip' + (pid === playerId ? ' sb-me' : '');

        const label = document.createElement('span');
        label.textContent = `${p.hero ? heroIcons[p.hero] : '❓'} ${p.name || '?'}`;
        chip.appendChild(label);

        if (pid !== playerId && p.hero) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'sb-deck-view-btn';
          btn.textContent = '👁';
          btn.onclick = () => showPlayerDeck(pid);
          chip.appendChild(btn);
        }

        list.appendChild(chip);
      });
    }
  } else {
    dDisc.classList.remove('hidden');
    dConn.classList.add('hidden');
  }
}

function initSession() {
  playerId = lsGet('gh_player_id', null);
  if (!playerId) {
    playerId = Math.random().toString(36).substr(2, 9);
    lsSet('gh_player_id', playerId);
  }
  const saved = lsGet('gh_session', null);
  if (saved) _connectSession(saved);
  else updateSessionBar();
}
