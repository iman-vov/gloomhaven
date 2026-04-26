// Player identity
let playerId = null;

let sessionCode = null;
let sessionRef = null;
let sessionPlayers = {}; // {playerId: {name, hero, joinedAt, deck, gold, items}}
let sessionShopStock = null; // null = no session, use local shop logic
let missionGoalDrafts = {};
let missionGoalMission = null;
let usedMissionGoalIds = [];
let partyItemsExpanded = {};
let partyItemsFullView = {};
let partyGoalExpanded = false;

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
  const defaultName = (lang === 'de' ? 'Spieler' : '\u0418\u0433\u0440\u043e\u043a') + ' ' + (Object.keys(sessionPlayers).length + 1);

  sessionRef.child(`players/${playerId}`).update({
    name: savedName || defaultName,
    hero: null,
    joinedAt: Date.now()
  });
  activeChar = null;

  const myHero = lsGet('activeChar', null);
  if (myHero) syncDeckToFirebase(myHero);

  let shouldOpenHeroModal = true;
  sessionRef.child('players').on('value', snap => {
    sessionPlayers = snap.val() || {};

    Object.entries(sessionPlayers).forEach(([pid, p]) => {
      setInventory(pid, Array.isArray(p.items) ? p.items : []);
    });

    updateSessionBar();
    updateCharCards();
    renderPartyTab();
    if (typeof renderPlayerTab === 'function') renderPlayerTab();
    updateShopGoldBar();
    if (typeof renderItemsGrid === 'function') renderItemsGrid();
    if (typeof renderOwnedGrid === 'function') renderOwnedGrid();
    if (shouldOpenHeroModal && typeof openHeroSelectModal === 'function') {
      shouldOpenHeroModal = false;
      openHeroSelectModal();
    }
  });

  sessionRef.child('goals').on('value', snap => {
    const data = snap.val();
    if (data && JSON.stringify(data) !== JSON.stringify(drawState)) {
      drawState = data;
      renderDrawResults();
    }
  });

  sessionRef.child('missionGoalDrafts').on('value', snap => {
    missionGoalDrafts = snap.val() || {};
    renderPartyTab();
  });

  sessionRef.child('missionGoalMission').on('value', snap => {
    missionGoalMission = snap.val();
    renderPartyTab();
  });

  sessionRef.child('usedMissionGoalIds').on('value', snap => {
    usedMissionGoalIds = snap.val() || [];
    renderPartyTab();
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
  missionGoalDrafts = {};
  missionGoalMission = null;
  usedMissionGoalIds = [];
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

  const updates = { hero: heroCode };
  if (prev && prev !== heroCode) {
    updates.items = [];
    updates.missionItems = [];
    setInventory(playerId, []);
  }
  sessionRef.child(`players/${playerId}`).update(updates);
  syncDeckToFirebase(heroCode);
}

function getMyHero() {
  return sessionPlayers[playerId]?.hero || null;
}

function getHeroOwner(heroCode) {
  const entry = Object.entries(sessionPlayers).find(([, p]) => p.hero === heroCode);
  return entry ? { id: entry[0], ...entry[1] } : null;
}

function openHeroSelectModal() {
  if (!sessionCode) return;
  const modal = document.getElementById('hero-select-modal');
  if (!modal) return;
  modal.style.display = 'flex';

  const savedHero = lsGet('activeChar', null);
  const owner = savedHero ? getHeroOwner(savedHero) : null;
  const isMine = owner && owner.id === playerId;
  const isFreeOrMine = !owner || isMine;

  if (savedHero && CHARS[savedHero] && isFreeOrMine) {
    heroModalShowResume(savedHero);
  } else {
    heroModalShowPicker();
  }
}

function heroModalShowResume(heroCode) {
  document.getElementById('hero-modal-resume').style.display = '';
  document.getElementById('hero-modal-picker').style.display = 'none';

  const c = CHARS[heroCode];
  const img = document.getElementById('hero-modal-resume-img');
  img.src = 'assets/heroes/' + heroCode + '_face.png';
  img.style.borderColor = c.color;
  document.getElementById('hero-modal-resume-name').textContent = charName(heroCode);
}

function heroModalShowPicker() {
  document.getElementById('hero-modal-resume').style.display = 'none';
  document.getElementById('hero-modal-picker').style.display = '';

  const grid = document.getElementById('hero-modal-grid');
  grid.innerHTML = '';

  Object.entries(CHARS).forEach(([code, c]) => {
    const owner = getHeroOwner(code);
    const taken = owner && owner.id !== playerId;
    const takenName = taken ? (owner.name || owner.hero || code) : '';
    const card = document.createElement('div');
    card.className = 'char-card-modal' + (taken ? ' taken' : '');
    card.innerHTML = [
      '<img src="assets/heroes/' + code + '_face.png" alt="' + code + '" style="border-color:' + c.color + '">',
      '<div class="char-modal-name">' + escHtml(charName(code)) + '</div>',
      taken ? '<div class="char-modal-taken-label">' + escHtml(takenName) + '</div>' : ''
    ].join('');
    if (!taken) card.onclick = () => heroModalSelect(code);
    grid.appendChild(card);
  });
}

function heroModalResume() {
  const savedHero = lsGet('activeChar', null);
  if (savedHero) heroModalSelect(savedHero);
}

function heroModalSelect(code) {
  const modal = document.getElementById('hero-select-modal');
  if (modal) modal.style.display = 'none';
  selectChar(code);
  ensurePlayerDefaults(code).then(() => {
    if (typeof renderPlayerTab === 'function') renderPlayerTab();
  });
}

// Gold + shop stock sync

function syncGoldToFirebase(amount) {
  if (!sessionRef) return;
  sessionRef.child(`players/${playerId}/gold`).set(amount);
}

function getMyGold() {
  if (sessionCode && playerId) {
    return Math.max(0, parseInt(sessionPlayers[playerId]?.gold, 10) || 0);
  }
  if (activeChar && typeof getLocalPlayerData === 'function') {
    return getLocalPlayerData(activeChar).gold || 0;
  }
  return 0;
}

function setMyGold(amount) {
  const safeAmount = Math.max(0, parseInt(amount, 10) || 0);
  if (sessionCode && playerId) {
    if (sessionPlayers[playerId]) sessionPlayers[playerId].gold = safeAmount;
    syncGoldToFirebase(safeAmount);
  } else if (activeChar && typeof setLocalPlayerData === 'function') {
    setLocalPlayerData(activeChar, { gold: safeAmount });
  }
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

function getGoalById(goalId) {
  const id = parseInt(goalId, 10);
  return typeof GOALS !== 'undefined' ? GOALS.find(g => g.id === id) : null;
}

function getMissionGoalText(goal) {
  if (!goal) return { name: '', condition: '' };
  return {
    name: lang === 'de' && goal.nameDe ? goal.nameDe : goal.nameRu,
    condition: lang === 'de' && goal.conditionDe ? goal.conditionDe : goal.conditionRu
  };
}

function getMissionGoalImgSrc(goalId) {
  return lang === 'de'
    ? `./assets/goals/deu/${goalId}.png`
    : `./assets/goals/rus/${goalId}.png`;
}

function getMissionGoalFallbackSrc(goalId) {
  return `./assets/goals/rus/${goalId}.png`;
}

function missionHasBattleGoals(mission) {
  return Math.max(1, parseInt(mission, 10) || 1) > 3;
}

function missionHasCityEventReward(mission) {
  return Math.max(1, parseInt(mission, 10) || 1) >= 3;
}

function toggleMyMissionGoalDetails() {
  partyGoalExpanded = !partyGoalExpanded;
  renderPartyTab();
}

async function drawMyMissionGoals() {
  if (!sessionRef || !playerId) return;
  const currentMission = sessionPlayers[playerId]?.missionCount || 1;
  if (!missionHasBattleGoals(currentMission)) return;

  if (missionGoalMission !== currentMission) {
    await resetMissionGoalsForMission(currentMission);
  }

  const currentDraft = Array.isArray(missionGoalDrafts[playerId]) ? missionGoalDrafts[playerId] : [];
  if (currentDraft.length) return;

  const snap = await sessionRef.once('value');
  const data = snap.val() || {};
  const drafts = data.missionGoalDrafts || {};
  const used = Array.isArray(data.usedMissionGoalIds) ? data.usedMissionGoalIds : [];
  const alreadyUsed = new Set(used.map(id => parseInt(id, 10)));

  const pool = (typeof GOALS !== 'undefined' ? GOALS : []).filter(g => !alreadyUsed.has(g.id));
  if (pool.length < 2) return;

  const firstIdx = Math.floor(Math.random() * pool.length);
  const first = pool.splice(firstIdx, 1)[0].id;
  const secondIdx = Math.floor(Math.random() * pool.length);
  const second = pool.splice(secondIdx, 1)[0].id;
  const draft = [first, second];

  const updates = {};
  updates[`missionGoalDrafts/${playerId}`] = draft;
  updates.usedMissionGoalIds = [...used, ...draft];
  updates.missionGoalMission = currentMission;
  await sessionRef.update(updates);

  missionGoalDrafts = { ...drafts, [playerId]: draft };
  usedMissionGoalIds = updates.usedMissionGoalIds;
  missionGoalMission = currentMission;
  renderPartyTab();
}

function chooseMyMissionGoal(goalId) {
  if (!sessionRef || !playerId) return;
  const id = parseInt(goalId, 10);
  const draft = Array.isArray(missionGoalDrafts[playerId]) ? missionGoalDrafts[playerId].map(x => parseInt(x, 10)) : [];
  if (!draft.includes(id)) return;
  sessionRef.child(`players/${playerId}/activeMissionGoal`).set(id);
}

async function setManualMissionGoal(goalId) {
  if (!sessionRef || !playerId) return;
  if (!missionHasBattleGoals(sessionPlayers[playerId]?.missionCount || 1)) return;
  const id = parseInt(goalId, 10);
  if (!getGoalById(id)) return;
  const used = Array.isArray(usedMissionGoalIds) ? usedMissionGoalIds : [];
  const updates = {};
  updates[`missionGoalDrafts/${playerId}`] = [id];
  updates[`players/${playerId}/activeMissionGoal`] = id;
  updates.missionGoalMission = sessionPlayers[playerId]?.missionCount || 1;
  if (!used.map(x => parseInt(x, 10)).includes(id)) {
    updates.usedMissionGoalIds = [...used, id];
  }
  await sessionRef.update(updates);
  partyGoalExpanded = false;
}

function getPartyHeroMaxHp(heroCode, level) {
  const lvl = Math.max(1, Math.min(9, parseInt(level, 10) || 1));
  return typeof HERO_HP !== 'undefined' && HERO_HP[heroCode] ? HERO_HP[heroCode][lvl - 1] : 0;
}

function getPartyCounterValue(p, field) {
  if (field === 'currentHp') {
    const maxHp = getPartyHeroMaxHp(p.hero, p.playerLevel || 1);
    const raw = p.currentHp;
    return raw === undefined || raw === null ? maxHp : Math.max(0, parseInt(raw, 10) || 0);
  }
  if (field === 'missionXp') {
    return Math.max(0, parseInt(p.missionXp, 10) || 0);
  }
  return 0;
}

function changeMyPartyCounter(field, delta) {
  if (!sessionRef || !playerId) return;
  const p = sessionPlayers[playerId] || {};
  const current = getPartyCounterValue(p, field);
  let next = current + delta;
  if (field === 'currentHp') {
    const maxHp = getPartyHeroMaxHp(p.hero, p.playerLevel || 1);
    next = Math.max(0, maxHp ? Math.min(maxHp, next) : next);
  } else {
    next = Math.max(0, next);
  }
  sessionRef.child(`players/${playerId}/${field}`).set(next);
}

async function resetMissionGoalsForMission(nextMission, force = false) {
  if (!sessionRef) return;
  if (!force && missionGoalMission === nextMission) return;
  const updates = {
    missionGoalDrafts: null,
    missionGoalMission: null,
    usedMissionGoalIds: null
  };
  Object.keys(sessionPlayers || {}).forEach(pid => {
    updates[`players/${pid}/activeMissionGoal`] = null;
  });
  missionGoalDrafts = {};
  missionGoalMission = null;
  usedMissionGoalIds = [];
  await sessionRef.update(updates);
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

const RENEWABLE_ITEMS = new Set(['001','003','004','005','006','007','009','010','015','016','019','021','022','023','025','029','035','036']);
const PERMANENT_ITEMS = new Set(['002','017','028']);

function getMyUsedItems() {
  const p = sessionPlayers[playerId] || {};
  return Array.isArray(p.usedItems) ? p.usedItems : [];
}

function toggleItemUsed(itemId) {
  if (!sessionRef || !playerId) return;
  const used = getMyUsedItems();
  const newUsed = used.includes(itemId) ? used.filter(x => x !== itemId) : [...used, itemId];
  sessionRef.child(`players/${playerId}/usedItems`).set(newUsed);
}

function doRest() {
  if (!sessionRef || !playerId) return;
  _showRestTypeOverlay();
}

function _doShortRest() {
  const states = getMyCardStates();
  const deck = getMyMissionDeck();
  const playedCards = deck.filter(id => states[id] === 'played');

  if (playedCards.length === 0) {
    const reset = {};
    deck.forEach(id => { reset[id] = states[id] === 'lost' ? 'lost' : 'hand'; });
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

function _doLongRest() {
  const states = getMyCardStates();
  const deck = getMyMissionDeck();
  const playedCards = deck.filter(id => states[id] === 'played');

  const finalize = (lostCardId) => {
    const updates = {};
    deck.forEach(id => {
      if (states[id] === 'lost') updates[id] = 'lost';
      else if (id === lostCardId) updates[id] = 'lost';
      else updates[id] = 'hand';
    });
    sessionRef.child(`players/${playerId}/cardStates`).update(updates);

    const used = getMyUsedItems();
    const stillUsed = used.filter(id => !RENEWABLE_ITEMS.has(id));
    sessionRef.child(`players/${playerId}/usedItems`).set(stillUsed);

    _showLongRestHpReminder();
  };

  if (playedCards.length === 0) { finalize(null); return; }
  _showRestOverlay(playedCards, lostCardId => finalize(lostCardId));
}

function _showRestTypeOverlay() {
  const existing = document.getElementById('rest-type-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'rest-type-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? 'Art der Rast?' : '\u0412\u0438\u0434 \u043e\u0442\u0434\u044b\u0445\u0430?';
  box.appendChild(title);

  const btnShort = document.createElement('button');
  btnShort.type = 'button';
  btnShort.className = 'btn-primary';
  btnShort.style.cssText = 'flex:1;padding:10px;margin:6px 0;width:100%';
  btnShort.textContent = lang === 'de' ? 'Kurze Rast' : '\u041a\u043e\u0440\u043e\u0442\u043a\u0438\u0439 \u043e\u0442\u0434\u044b\u0445';
  btnShort.onclick = () => { overlay.remove(); _doShortRest(); };
  box.appendChild(btnShort);

  const btnLong = document.createElement('button');
  btnLong.type = 'button';
  btnLong.className = 'btn-primary';
  btnLong.style.cssText = 'flex:1;padding:10px;margin:6px 0;width:100%';
  btnLong.textContent = lang === 'de' ? 'Lange Rast' : '\u0414\u043e\u043b\u0433\u0438\u0439 \u043e\u0442\u0434\u044b\u0445';
  btnLong.onclick = () => { overlay.remove(); _doLongRest(); };
  box.appendChild(btnLong);

  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function _showLongRestHpReminder() {
  const existing = document.getElementById('long-rest-hp-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'long-rest-hp-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box';
  box.addEventListener('click', e => e.stopPropagation());

  const msg = document.createElement('p');
  msg.style.cssText = 'margin:0 0 14px;font-size:1.05rem;';
  msg.textContent = lang === 'de' ? 'Vergiss nicht, 2 HP wiederherzustellen!' : '\u041d\u0435 \u0437\u0430\u0431\u0443\u0434\u044c\u0442\u0435 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c 2 HP!';
  box.appendChild(msg);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-primary';
  btn.style.cssText = 'width:100%;padding:10px';
  btn.textContent = lang === 'de' ? 'OK' : '\u041f\u043e\u043d\u044f\u0442\u043d\u043e';
  btn.onclick = () => overlay.remove();
  box.appendChild(btn);

  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function _showEndMissionOverlay() {
  const existing = document.getElementById('end-mission-overlay');
  if (existing) existing.remove();

  const p = (sessionCode && playerId) ? (sessionPlayers[playerId] || {}) : {};
  const earnedXp = Math.max(0, parseInt(p.missionXp, 10) || 0);
  const localMission = activeChar && typeof getLocalPlayerData === 'function'
    ? getLocalPlayerData(activeChar).missionCount
    : 1;
  const currentMission = Math.max(1, parseInt(sessionCode ? p.missionCount : localMission, 10) || 1);

  const overlay = document.createElement('div');
  overlay.id = 'end-mission-overlay';
  overlay.onclick = () => overlay.remove();

  const box = document.createElement('div');
  box.className = 'deck-view-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? 'Missionsergebnis?' : 'Результат миссии?';
  box.appendChild(title);

  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:10px;margin-bottom:14px;';

  const btnVictory = document.createElement('button');
  btnVictory.type = 'button';
  btnVictory.className = 'btn-primary';
  btnVictory.style.cssText = 'flex:1;padding:12px;';
  btnVictory.textContent = lang === 'de' ? '🏆 Sieg' : '🏆 Победа';

  const btnDefeat = document.createElement('button');
  btnDefeat.type = 'button';
  btnDefeat.className = 'btn-primary';
  btnDefeat.style.cssText = 'flex:1;padding:12px;background:rgba(180,60,60,0.15);';
  btnDefeat.textContent = lang === 'de' ? '💀 Niederlage' : '💀 Поражение';

  btnRow.appendChild(btnVictory);
  btnRow.appendChild(btnDefeat);
  box.appendChild(btnRow);

  const formDiv = document.createElement('div');
  box.appendChild(formDiv);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function showForm(victory) {
    btnVictory.style.opacity = victory ? '1' : '0.4';
    btnDefeat.style.opacity = !victory ? '1' : '0.4';
    btnVictory.onclick = null;
    btnDefeat.onclick = null;

    const reminderText = lang === 'de'
      ? '💰 Gold und Truheninhalt gehören euch bereits — vergesst nicht, sie im Laden zu vermerken.'
      : '💰 Золото и содержимое сундуков уже ваше — не забудьте добавить в магазин.';
    const goalReminderText = lang === 'de'
      ? '\u2713 Wenn deine persönliche Aufgabe erfüllt ist, markiere sie auf deinem Charakterbogen.'
      : '\u2713 Если личное задание выполнено, отметьте его галочкой на листе персонажа.';
    const cityEventReminderText = lang === 'de'
      ? '\ud83c\udfd9 Nimm jetzt eine Stadt-Ereigniskarte.'
      : '\ud83c\udfd9 \u0412\u043e\u0437\u044c\u043c\u0438\u0442\u0435 \u043a\u0430\u0440\u0442\u0443 \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0433\u043e \u0441\u043e\u0431\u044b\u0442\u0438\u044f.';
    const xpLabel = lang === 'de' ? 'XP in der Mission verdient' : 'XP заработано за миссию';
    const bonusLabel = lang === 'de' ? 'Доп. XP (награда миссии)' : 'Доп. XP (награда миссии)';
    const goldLabel = lang === 'de' ? 'Gold gefunden (Truhen/Beute)' : 'Золото найдено (сундуки/добыча)';
    const confirmLabel = victory
      ? (lang === 'de' ? '✓ Sieg bestätigen' : '✓ Подтвердить победу')
      : (lang === 'de' ? '✓ Niederlage bestätigen' : '✓ Подтвердить поражение');

    formDiv.innerHTML = `
      <div style="font-size:0.9rem;margin-bottom:10px;color:var(--text)">
        ✴ ${xpLabel}: <strong>${earnedXp}</strong>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;">
        ${victory ? `<label style="font-size:0.85rem;color:var(--text);">✴ ${bonusLabel}:
          <input type="number" id="em-bonus-xp" min="0" max="200" value="0"
            style="width:64px;margin-left:6px;">
        </label>` : ''}
        <label style="font-size:0.85rem;color:var(--text);">🪙 ${goldLabel}:
          <input type="number" id="em-found-gold" min="0" max="999" value="0"
            style="width:64px;margin-left:6px;">
        </label>
      </div>
      <div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:8px;line-height:1.4;">${reminderText}</div>
      ${victory ? `<div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:14px;line-height:1.4;">${goalReminderText}</div>` : ''}
      ${victory && missionHasCityEventReward(currentMission) ? `<div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:14px;line-height:1.4;">${cityEventReminderText}</div>` : ''}
      <button class="btn-primary" type="button" id="btn-confirm-end-mission" style="width:100%;padding:10px;">
        ${confirmLabel}
      </button>`;

    document.getElementById('btn-confirm-end-mission').onclick = () => {
      const bonusInput = document.getElementById('em-bonus-xp');
      const bonusXp = victory && bonusInput ? Math.max(0, parseInt(bonusInput.value, 10) || 0) : 0;
      const foundGold = Math.max(0, parseInt(document.getElementById('em-found-gold').value, 10) || 0);
      overlay.remove();
      applyEndMission(victory, earnedXp, bonusXp, foundGold);
    };
  }

  btnVictory.onclick = () => showForm(true);
  btnDefeat.onclick = () => showForm(false);
}

async function applyEndMission(victory, earnedXp, bonusXp, foundGold) {
  const totalXp = earnedXp + bonusXp;
  const currentMission = sessionCode && playerId
    ? Math.max(1, parseInt(sessionPlayers[playerId]?.missionCount, 10) || 1)
    : Math.max(1, parseInt(activeChar && typeof getLocalPlayerData === 'function' ? getLocalPlayerData(activeChar).missionCount : 1, 10) || 1);
  const goToCityEvent = victory && missionHasCityEventReward(currentMission);

  if (foundGold > 0 && typeof setMyGold === 'function') {
    setMyGold((typeof getMyGold === 'function' ? getMyGold() : 0) + foundGold);
  }

  if (sessionRef && playerId) {
    sessionRef.child(`players/${playerId}/missionXp`).set(0);
  }

  if (totalXp > 0 && typeof updatePlayerData === 'function') {
    let pd = {};
    if (sessionCode && playerId) {
      const snap = await firebase.database()
        .ref(`sessions/${sessionCode}/players/${playerId}`).once('value');
      pd = snap.val() || {};
    } else if (activeChar && typeof getLocalPlayerData === 'function') {
      pd = getLocalPlayerData(activeChar);
    }
    const nextXP = Math.min(500, (pd.playerXP || 0) + totalXp);
    await updatePlayerData({ playerXP: nextXP });
  }

  if (victory && typeof completeMission === 'function') {
    await completeMission();
  } else if (!victory && sessionCode && typeof resetMissionGoalsForMission === 'function') {
    const currentMission = Math.max(1, parseInt(sessionPlayers[playerId]?.missionCount, 10) || 1);
    await resetMissionGoalsForMission(currentMission, true);
    if (typeof renderPartyTab === 'function') renderPartyTab();
    if (typeof renderPlayerTab === 'function') renderPlayerTab();
  } else if (typeof renderPlayerTab === 'function') {
    renderPlayerTab();
  }

  if (typeof switchTab === 'function') switchTab(goToCityEvent ? 'events' : 'player');
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
  title.textContent = lang === 'de' ? 'W\u00e4hle 1 Karte zum Ablegen' : '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0440\u0442\u0443 \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430';
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
  title.textContent = lang === 'de' ? 'Karte verlieren?' : '\u041f\u043e\u0442\u0435\u0440\u044f\u0442\u044c \u043a\u0430\u0440\u0442\u0443?';

  const cardLabel = document.createElement('div');
  cardLabel.className = 'lose-confirm-card-name';
  cardLabel.textContent = `${cardId} - ${name}`;

  const btnRow = document.createElement('div');
  btnRow.className = 'lose-confirm-btns';

  const btnConfirm = document.createElement('button');
  btnConfirm.type = 'button';
  btnConfirm.className = 'lose-confirm-yes';
  btnConfirm.textContent = lang === 'de' ? 'Verlieren' : '\u041f\u043e\u0442\u0435\u0440\u044f\u0442\u044c';
  btnConfirm.onclick = () => {
    overlay.remove();
    callback();
  };

  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.className = 'lose-confirm-no';
  btnCancel.textContent = lang === 'de' ? 'Abbrechen' : '\u041e\u0442\u043c\u0435\u043d\u0430';
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
  title.textContent = `${lang === 'de' ? 'Deck' : '\u041a\u043e\u043b\u043e\u0434\u0430'}: ${p.name || '?'} (${p.hero || '?'})`;

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
    empty.textContent = lang === 'de' ? 'Deck ist leer' : '\u041a\u043e\u043b\u043e\u0434\u0430 \u043f\u0443\u0441\u0442\u0430';
    list.appendChild(empty);
  }

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'deck-view-close';
  closeBtn.textContent = lang === 'de' ? 'Schlie\u00dfen' : '\u0417\u0430\u043a\u0440\u044b\u0442\u044c';
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

function updateSessionTabVisibility() {
  const goalsBtn = document.getElementById('tabbtn-goals');
  const goalsPanel = document.getElementById('tab-goals');
  if (goalsBtn) goalsBtn.classList.toggle('hidden', !!sessionCode);
  if (goalsPanel && sessionCode && goalsPanel.classList.contains('active')) {
    switchTab('party');
  }
  const activeBtn = document.querySelector('.tab-btn.active');
  const navLabel = document.getElementById('nav-current-label');
  if (activeBtn && navLabel) navLabel.textContent = activeBtn.textContent.trim();
}

function renderPartyTab() {
  const content = document.getElementById('party-content');
  if (!content) return;

  const heroFaceImg = code => code
    ? `<img src="assets/heroes/${code}_face.png" alt="${code}" class="party-hero-face">`
    : '?';
  const stateLabels = lang === 'de'
    ? { hand: 'Auf der Hand', played: 'Gespielt', lost: 'Verloren' }
    : { hand: '\u041d\u0430 \u0440\u0443\u043a\u0435', played: '\u0421\u044b\u0433\u0440\u0430\u043d\u044b', lost: '\u041f\u043e\u0442\u0440\u0430\u0447\u0435\u043d\u044b' };

  function attachPartyPreviewNavigation(root) {
    root.querySelectorAll('[data-card-preview]').forEach(img => {
      img.addEventListener('click', () => {
        const scope = img.closest('.party-player-body') || root;
        const srcs = Array.from(scope.querySelectorAll('[data-card-preview]')).map(el => el.dataset.cardPreview);
        const idx = srcs.indexOf(img.dataset.cardPreview);
        if (typeof openPlayerCardLightbox === 'function' && idx !== -1) {
          openPlayerCardLightbox(srcs, idx);
        } else if (typeof openImgLightbox === 'function') {
          openImgLightbox(img.dataset.cardPreview);
        }
      });
    });

    root.querySelectorAll('[data-item-preview]').forEach(img => {
      img.addEventListener('click', () => {
        const scope = img.closest('.party-mission-section') || img.closest('.party-player-body') || root;
        const srcs = Array.from(scope.querySelectorAll('[data-item-preview]')).map(el => el.dataset.itemPreview);
        const idx = srcs.indexOf(img.dataset.itemPreview);
        if (typeof openPlayerCardLightbox === 'function' && idx !== -1) {
          openPlayerCardLightbox(srcs, idx);
        } else if (typeof openImgLightbox === 'function') {
          openImgLightbox(img.dataset.itemPreview);
        }
      });
    });

    root.querySelectorAll('[data-goal-preview]').forEach(img => {
      img.addEventListener('click', () => {
        if (typeof openImgLightbox === 'function') openImgLightbox(img.currentSrc || img.src || img.dataset.goalPreview);
      });
    });
  }

  if (!sessionCode) {
    if (!activeChar) {
      content.innerHTML = `<div class="party-empty">${lang === 'de'
        ? 'Keine aktive Sitzung. W\u00e4hle lokal einen Charakter.'
        : '\u041d\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0439 \u0441\u0435\u0441\u0441\u0438\u0438. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430.'}</div>`;
      return;
    }

    const localPlayer = {
      hero: activeChar,
      missionDeck: getDeck(activeChar),
      cardStates: {},
      missionItems: typeof getLocalPlayerData === 'function'
        ? getLocalPlayerData(activeChar).missionItems
        : []
    };

    const localItemsHtml = renderMissionItems(localPlayer, false);
    const localDeckHtml = renderMissionDeck(localPlayer, false);

    content.innerHTML = `
      <div class="party-me-layout">
        <div class="party-player-card party-summary-card">
          <div class="party-player-summary">
            <div class="party-player-header">${heroFaceImg(activeChar)} <span>${charName(activeChar)}</span></div>
          </div>
        </div>
        ${localItemsHtml ? `<div class="party-player-card party-items-card">${localItemsHtml}</div>` : ''}
        <div class="party-player-card party-deck-card">
        <div class="party-player-body">
          ${localDeckHtml}
        </div>
        </div>
      </div>`;

    attachPartyPreviewNavigation(content);
    return;
  }

  function renderMissionCard(cardId, state, isMe, heroCode) {
    const normalizedCardId = String(cardId).padStart(3, '0');
    const imgSrc = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/${heroCode}/${normalizedCardId}.png`;
    const actions = isMe && state !== 'lost'
      ? `<div class="mission-card-actions">
          ${state === 'hand' ? `<button class="btn-card-play" type="button" data-card-play="${cardId}">${lang === 'de' ? 'Spielen' : '\u0421\u044b\u0433\u0440\u0430\u0442\u044c'}</button>` : ''}
          ${state === 'played' ? `<button class="btn-card-return" type="button" data-card-return="${cardId}">${lang === 'de' ? 'Zur\u00fcck' : '\u0412\u0435\u0440\u043d\u0443\u0442\u044c'}</button>` : ''}
          <button class="btn-card-lose" type="button" data-card-lose="${cardId}">${lang === 'de' ? 'Verlieren' : '\u041f\u043e\u0442\u0435\u0440\u044f\u0442\u044c'}</button>
        </div>`
      : '';

    return `<div class="mission-card-item">
      <img class="mission-card-img state-${state}" src="${imgSrc}" alt="${normalizedCardId}" data-card-preview="${imgSrc}">
      ${actions}
    </div>`;
  }

  function renderMissionItems(p, isMe, pid) {
    const itemIds = Array.isArray(p.missionItems) ? p.missionItems : [];
    if (!itemIds.length) return '';
    const usedItems = Array.isArray(p.usedItems) ? p.usedItems : [];
    const key = pid || 'local';
    const expanded = !!partyItemsExpanded[key];
    const sectionLabel = lang === 'de' ? 'Items f\u00fcr Mission' : '\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u044b \u043d\u0430 \u043c\u0438\u0441\u0441\u0438\u044e';

    const toggleBtn = `<button class="party-items-toggle${expanded ? ' expanded' : ''}" type="button" data-items-toggle="${escHtml(key)}">
      ${expanded ? '\u2212' : '+'} ${sectionLabel} (${itemIds.length})
    </button>`;

    if (!expanded) {
      return `<div class="party-mission-section">${toggleBtn}</div>`;
    }

    const fullView = !!partyItemsFullView[key];

    const chips = itemIds.map(id => {
      const item = typeof ITEMS !== 'undefined' ? ITEMS.find(x => x.id === id) : null;
      const name = item ? (lang === 'de' ? item.nameDe : item.nameRu) : id;
      const desc = item ? (lang === 'de' ? (item.descDe || '') : (item.descRu || '')) : '';
      const used = usedItems.includes(id);
      const isPermanent = PERMANENT_ITEMS.has(id);
      const useBtn = (isMe && !isPermanent)
        ? `<button class="item-chip-use-btn${used ? ' used' : ''}" type="button" data-item-use="${id}">
            ${used ? (lang === 'de' ? '&#8617; Zur\u00fcck' : '&#8617; \u0412\u0435\u0440\u043d\u0443\u0442\u044c') : (lang === 'de' ? 'Benutzen' : '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c')}
          </button>` : '';
      return `<div class="item-collapsed-chip${used ? ' item-used' : ''}${isPermanent ? ' passive' : ''}">
        <div class="item-chip-name">${escHtml(name)}</div>
        ${desc ? `<div class="item-chip-desc">${escHtml(desc)}</div>` : ''}
        ${useBtn}
      </div>`;
    }).join('');

    function renderItemFull(id) {
      const item = typeof ITEMS !== 'undefined' ? ITEMS.find(x => x.id === id) : null;
      const name = item ? (lang === 'de' ? item.nameDe : item.nameRu) : id;
      const imgSrc = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${id}.png`;
      const used = usedItems.includes(id);
      const isPermanent = PERMANENT_ITEMS.has(id);
      const useBtn = (isMe && !isPermanent)
        ? `<button class="btn-item-use${used ? ' used' : ''}" type="button" data-item-use="${id}">
            ${used ? (lang === 'de' ? '&#8617; Zur\u00fcck' : '&#8617; \u0412\u0435\u0440\u043d\u0443\u0442\u044c') : (lang === 'de' ? 'Benutzen' : '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c')}
          </button>`
        : (isPermanent ? `<span class="item-permanent-label">${lang === 'de' ? 'Passiv' : '\u041f\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0439'}</span>` : '');
      return `<div class="party-mission-item${used ? ' item-used' : ''}" title="${escHtml(name)}">
        <img src="${imgSrc}" alt="${id}" data-item-preview="${imgSrc}">
        <span>${escHtml(name)}</span>
        ${useBtn}
      </div>`;
    }

    const slotEntries = typeof ITEM_SLOTS !== 'undefined' ? Object.entries(ITEM_SLOTS) : [];
    const slotsHtml = slotEntries.map(([slot, config]) => {
      const slotIds = itemIds.filter(id => config.ids.includes(id));
      const label = typeof getSlotLabel === 'function' ? getSlotLabel(slot) : slot;
      const extraClass = (slot === 'hand' && slotIds.length >= 2) ? ' slot-hand-2'
        : (slot === 'small' && slotIds.length >= 3) ? ' slot-small-many' : '';
      return `<div class="party-item-slot-block slot-${slot}${extraClass}">
        <div class="party-item-slot-title">${escHtml(label)}</div>
        <div class="party-item-slot-items">
          ${slotIds.length ? slotIds.map(renderItemFull).join('') : '<span class="party-item-slot-empty">\u2014</span>'}
        </div>
      </div>`;
    }).join('');

    const fullViewToggle = `<button class="party-items-fullview-toggle" type="button" data-items-fullview="${escHtml(key)}">
      ${fullView ? '&#9650;' : '&#9660;'} ${fullView
        ? (lang === 'de' ? 'Karten verbergen' : '\u0421\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u0440\u0442\u044b')
        : (lang === 'de' ? 'Karten anzeigen' : '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u044b')}
    </button>`;

    return `<div class="party-mission-section">
      ${toggleBtn}
      ${fullView
        ? `<div class="party-items-slots-list">${slotsHtml}</div>`
        : `<div class="party-items-collapsed-actions">${chips}</div>`}
      ${fullViewToggle}
    </div>`;
  }

  function renderMissionGoalBlock(p, isMe) {
    if (!isMe || !sessionCode) return '';
    if (!missionHasBattleGoals(p.missionCount || 1)) return '';

    const activeGoalId = p.activeMissionGoal;
    const draft = Array.isArray(missionGoalDrafts[playerId]) ? missionGoalDrafts[playerId] : [];

    if (activeGoalId) {
      const goal = getGoalById(activeGoalId);
      if (!goal) return '';
      const text = getMissionGoalText(goal);
      const imgSrc = getMissionGoalImgSrc(goal.id);
      const fallbackSrc = getMissionGoalFallbackSrc(goal.id);
      if (!partyGoalExpanded) {
        return `
          <div class="party-mission-section party-goal-section">
            <button class="party-goal-toggle" type="button" data-goal-toggle="1">
              <span>${lang === 'de' ? 'Meine Aufgabe' : '\u041c\u043e\u0451 \u0437\u0430\u0434\u0430\u043d\u0438\u0435'}: #${goal.id} ${escHtml(text.name)}</span>
              <span>&#9654;</span>
            </button>
          </div>`;
      }
      return `
        <div class="party-mission-section party-goal-section">
          <button class="party-goal-toggle expanded" type="button" data-goal-toggle="1">
            <span>${lang === 'de' ? 'Meine Aufgabe' : '\u041c\u043e\u0451 \u0437\u0430\u0434\u0430\u043d\u0438\u0435'}: #${goal.id} ${escHtml(text.name)}</span>
            <span>&#9660;</span>
          </button>
          <div class="party-goal-active">
            <img src="${imgSrc}" alt="${goal.id}" data-goal-preview="${imgSrc}" data-fallback-src="${fallbackSrc}" onerror="if(this.dataset.fallbackSrc&&this.src.indexOf(this.dataset.fallbackSrc)===-1)this.src=this.dataset.fallbackSrc">
            <div class="party-goal-text">
              <div class="party-goal-name">#${goal.id} ${escHtml(text.name)}</div>
              <div class="party-goal-condition">${escHtml(text.condition)}</div>
            </div>
          </div>
        </div>`;
    }

    if (draft.length) {
      return `
        <div class="party-mission-section party-goal-section">
          <div class="party-section-label">${lang === 'de' ? 'Aufgabe w\u00e4hlen' : '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435'}</div>
          <div class="party-goal-draft-list">
            ${draft.map(goalId => {
              const goal = getGoalById(goalId);
              if (!goal) return '';
              const text = getMissionGoalText(goal);
              const imgSrc = getMissionGoalImgSrc(goal.id);
              const fallbackSrc = getMissionGoalFallbackSrc(goal.id);
              return `<div class="party-goal-draft-card">
                <img src="${imgSrc}" alt="${goal.id}" data-goal-preview="${imgSrc}" data-fallback-src="${fallbackSrc}" onerror="if(this.dataset.fallbackSrc&&this.src.indexOf(this.dataset.fallbackSrc)===-1)this.src=this.dataset.fallbackSrc">
                <div class="party-goal-name">#${goal.id} ${escHtml(text.name)}</div>
                <div class="party-goal-condition">${escHtml(text.condition)}</div>
                <button class="btn-goal-choose" type="button" data-goal-choose="${goal.id}">${lang === 'de' ? 'W\u00e4hlen' : '\u0412\u044b\u0431\u0440\u0430\u0442\u044c'}</button>
              </div>`;
            }).join('')}
          </div>
        </div>`;
    }

    return `
      <div class="party-mission-section party-goal-section">
        <div class="party-goal-actions">
          <button class="btn-goal-draw" type="button" data-goal-draw="1">${lang === 'de' ? 'Aufgabe ziehen' : '\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u043d\u0438\u0435'}</button>
          <label class="party-goal-manual">
            <span>#</span>
            <input type="number" min="286" max="317" data-goal-manual-input placeholder="286">
            <button type="button" data-goal-manual-set>${lang === 'de' ? 'Setzen' : '\u0412\u0432\u0435\u0441\u0442\u0438'}</button>
          </label>
        </div>
      </div>`;
  }

  function renderMissionDeck(p, isMe) {
    const deck = Array.isArray(p.missionDeck) ? p.missionDeck : [];
    const states = p.cardStates || {};

    if (!deck.length) {
      return `<div class="party-no-items">${lang === 'de' ? 'Noch kein Deck gew\u00e4hlt' : '\u041a\u043e\u043b\u043e\u0434\u0430 \u0435\u0449\u0451 \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u0430'}</div>`;
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
            : `<span class="party-no-items">${lang === 'de' ? 'keine' : '\u043d\u0435\u0442'}</span>`}
        </div>
      </div>`).join('');

    const restBtn = isMe
      ? `<button class="btn-rest" type="button" data-party-rest="1">${lang === 'de' ? 'Rast' : '\u041e\u0442\u0434\u044b\u0445'}</button>`
      : '';

    return `${sections}${restBtn}`;
  }

  const playerEntries = Object.entries(sessionPlayers).sort(([pidA], [pidB]) => {
    if (pidA === playerId) return -1;
    if (pidB === playerId) return 1;
    return 0;
  });

  function renderPartyCounters(p) {
    const hp = getPartyCounterValue(p, 'currentHp');
    const maxHp = getPartyHeroMaxHp(p.hero, p.playerLevel || 1);
    const xp = getPartyCounterValue(p, 'missionXp');
    return `
      <div class="party-counter-row">
        <div class="party-counter">
          <button type="button" data-counter-dec="currentHp">-</button>
          <span title="HP">&#10084;&#65039; HP ${hp}${maxHp ? '/' + maxHp : ''}</span>
          <button type="button" data-counter-inc="currentHp">+</button>
        </div>
        <div class="party-counter">
          <button type="button" data-counter-dec="missionXp">-</button>
          <span title="XP">&#10036; XP ${xp}</span>
          <button type="button" data-counter-inc="missionXp">+</button>
        </div>
      </div>`;
  }

  function renderMyPartySummary(p, heroLabel) {
    return `
      <div class="party-player-summary">
        <div class="party-player-header">${heroFaceImg(p.hero)} <span>${heroLabel}</span></div>
        ${renderPartyCounters(p)}
      </div>`;
  }

  const cardsHtml = playerEntries.map(([pid, p]) => {
    const isMe = pid === playerId;
    const heroLabel = p.hero ? charName(p.hero) : '---';
    const bodyId = `party-player-body-${pid}`;

    if (isMe) {
      const goalHtml = renderMissionGoalBlock(p, true);
      const itemsHtml = renderMissionItems(p, true, pid);
      const deckHtml = renderMissionDeck(p, true);
      return `
        <div class="party-me-layout">
          <div class="party-player-top">
            <div class="party-player-card party-summary-card">${renderMyPartySummary(p, heroLabel)}</div>
            ${goalHtml ? `<div class="party-player-card party-goal-card">${goalHtml}</div>` : ''}
          </div>
          ${itemsHtml ? `<div id="${bodyId}-items" class="party-player-card party-items-card">${itemsHtml}</div>` : ''}
          <div id="${bodyId}" class="party-player-card party-deck-card party-player-body">${deckHtml}</div>
        </div>`;
    }

    return `
      <div class="party-player-card${isMe ? ' party-me' : ''}">
        ${isMe
          ? `<div class="party-player-header">${heroFaceImg(p.hero)} ${heroLabel}</div>`
          : `<button class="party-player-header party-player-toggle" type="button" data-party-toggle="${bodyId}">
              <span>${heroFaceImg(p.hero)} ${heroLabel}</span>
              <span class="party-player-arrow">&#9654;</span>
            </button>`}
        <div id="${bodyId}" class="party-player-body${isMe ? '' : ' hidden'}">
          ${renderMissionGoalBlock(p, isMe)}
          ${renderMissionItems(p, isMe, pid)}
          ${renderMissionDeck(p, isMe)}
        </div>
      </div>`;
  }).join('');

  content.innerHTML = cardsHtml;

  const myHero = sessionCode ? (sessionPlayers[playerId]?.hero) : activeChar;
  const endBtnContainer = document.getElementById('party-end-btn-container');
  if (endBtnContainer) {
    if (myHero) {
      endBtnContainer.innerHTML = `<button class="btn-end-mission" type="button" id="btn-end-mission">
        🏁 ${lang === 'de' ? 'Mission beenden' : 'Завершить миссию'}
      </button>`;
      document.getElementById('btn-end-mission').addEventListener('click', () => _showEndMissionOverlay());
    } else {
      endBtnContainer.innerHTML = '';
    }
  }

  content.querySelectorAll('[data-end-mission]').forEach(btn => {
    btn.addEventListener('click', () => _showEndMissionOverlay());
  });

  content.querySelectorAll('[data-counter-inc]').forEach(btn => {
    btn.addEventListener('click', () => changeMyPartyCounter(btn.dataset.counterInc, 1));
  });

  content.querySelectorAll('[data-counter-dec]').forEach(btn => {
    btn.addEventListener('click', () => changeMyPartyCounter(btn.dataset.counterDec, -1));
  });

  content.querySelectorAll('[data-party-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = document.getElementById(btn.dataset.partyToggle);
      const arrow = btn.querySelector('.party-player-arrow');
      if (!body) return;
      body.classList.toggle('hidden');
      if (arrow) arrow.innerHTML = body.classList.contains('hidden') ? '&#9654;' : '&#9660;';
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

  attachPartyPreviewNavigation(content);

  content.querySelectorAll('[data-item-use]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleItemUsed(btn.dataset.itemUse);
    });
  });

  content.querySelectorAll('[data-items-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.itemsToggle;
      partyItemsExpanded[key] = !partyItemsExpanded[key];
      renderPartyTab();
    });
  });

  content.querySelectorAll('[data-items-fullview]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.itemsFullview;
      partyItemsFullView[key] = !partyItemsFullView[key];
      renderPartyTab();
    });
  });

  content.querySelectorAll('[data-goal-draw]').forEach(btn => {
    btn.addEventListener('click', () => drawMyMissionGoals());
  });

  content.querySelectorAll('[data-goal-toggle]').forEach(btn => {
    btn.addEventListener('click', () => toggleMyMissionGoalDetails());
  });

  content.querySelectorAll('[data-goal-choose]').forEach(btn => {
    btn.addEventListener('click', () => chooseMyMissionGoal(btn.dataset.goalChoose));
  });

  content.querySelectorAll('[data-goal-manual-set]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.party-goal-manual')?.querySelector('[data-goal-manual-input]');
      if (input) setManualMissionGoal(input.value);
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
  if (joinBtn) joinBtn.textContent = de ? 'Beitreten' : '\u0412\u043e\u0439\u0442\u0438';
  if (createBtn) createBtn.textContent = de ? '+ Neu' : '+ \u041d\u043e\u0432\u0430\u044f';
  if (codeInput) codeInput.placeholder = de ? 'Code' : '\u041a\u043e\u0434';
  if (leaveBtn) leaveBtn.title = de ? 'Verlassen' : '\u0412\u044b\u0439\u0442\u0438';

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
  updateSessionTabVisibility();
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
