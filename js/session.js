// ─── Player identity ───────────────────────────────────
let playerId = null;

let sessionCode = null;
let sessionRef = null;
let sessionPlayers = {}; // {playerId: {name, hero, joinedAt}}

// ─── Session create / join / leave ─────────────────────

function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
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

  // Register this player
  sessionRef.child(`players/${playerId}`).update({
    name: savedName || defaultName,
    hero: null,
    joinedAt: Date.now()
  });

  // Listen to all players
  sessionRef.child('players').on('value', snap => {
    sessionPlayers = snap.val() || {};
    updateSessionBar();
    updateCharCards();
  });

  // Listen to goals
  sessionRef.child('goals').on('value', snap => {
    const data = snap.val();
    if (data && JSON.stringify(data) !== JSON.stringify(drawState)) {
      drawState = data;
      renderDrawResults();
    }
  });

  updateSessionBar();
}

function leaveSession() {
  if (sessionRef) {
    sessionRef.child(`players/${playerId}/hero`).set(null);
    sessionRef.off();
    sessionRef = null;
  }
  sessionCode = null;
  sessionPlayers = {};
  lsSet('gh_session', null);
  updateSessionBar();
  updateCharCards();
}

// ─── Hero claiming ─────────────────────────────────────

function sessionClaimHero(heroCode) {
  if (!sessionRef) return;
  // Release previous hero of this player
  const prev = sessionPlayers[playerId]?.hero;
  if (prev === heroCode) return; // already mine
  // Check if taken by someone else
  const takenBy = Object.entries(sessionPlayers).find(
    ([pid, p]) => p.hero === heroCode && pid !== playerId
  );
  if (takenBy) return; // blocked
  sessionRef.child(`players/${playerId}/hero`).set(heroCode);
}

function getMyHero() {
  return sessionPlayers[playerId]?.hero || null;
}

function getHeroOwner(heroCode) {
  const entry = Object.entries(sessionPlayers).find(([, p]) => p.hero === heroCode);
  return entry ? { id: entry[0], ...entry[1] } : null;
}

// ─── Sync draw state ───────────────────────────────────

function syncDrawState() {
  if (sessionRef && drawState !== null) {
    sessionRef.child('goals').set(drawState);
  }
}

// ─── Update char cards (taken / available) ─────────────

function updateCharCards() {
  ['HA', 'DE', 'VW', 'RG'].forEach(code => {
    const card = document.getElementById(`charcard-${code}`);
    if (!card) return;
    const owner = getHeroOwner(code);
    const isMine = owner && owner.id === playerId;
    const isTaken = owner && owner.id !== playerId;

    card.classList.toggle('char-taken', isTaken);
    card.classList.toggle('selected', isMine || (!sessionCode && activeChar === code));

    // Badge
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

// ─── Player name ───────────────────────────────────────

function updatePlayerName(name) {
  name = name.trim();
  if (!name) return;
  lsSet('gh_player_name', name);
  if (sessionRef) {
    sessionRef.child(`players/${playerId}/name`).set(name);
  }
}

// ─── Session bar UI ────────────────────────────────────

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

  // ── Desktop ──
  const dDisc = document.getElementById('sb-d-disconnected');
  const dConn = document.getElementById('sb-d-connected');
  if (dDisc) {
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
      const list = document.getElementById('sb-players-list');
      if (list) {
        list.innerHTML = '';
        Object.entries(sessionPlayers).forEach(([pid, p]) => {
          const chip = document.createElement('div');
          chip.className = 'sb-player-chip' + (pid === playerId ? ' sb-me' : '');
          chip.textContent = `${p.hero ? heroIcons[p.hero] : '❓'} ${p.name || '?'}`;
          list.appendChild(chip);
        });
      }
    } else {
      dDisc.classList.remove('hidden');
      dConn.classList.add('hidden');
    }
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
