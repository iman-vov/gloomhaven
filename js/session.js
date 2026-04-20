let sessionCode = null;
let sessionRef = null;

function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function createSession() {
  const code = generateSessionCode();
  _connectSession(code, true);
}

function joinSessionFromInput() {
  const input = document.getElementById('session-code-input');
  const code = (input.value || '').toUpperCase().trim();
  if (code.length !== 4) return;
  _connectSession(code, false);
}

function _connectSession(code, isNew) {
  if (sessionRef) sessionRef.off();
  sessionCode = code;
  sessionRef = db.ref(`sessions/${code}`);
  lsSet('gh_session', code);

  if (isNew) {
    sessionRef.set({ createdAt: Date.now(), goals: null });
  }

  sessionRef.child('goals').on('value', snap => {
    const data = snap.val();
    if (data && JSON.stringify(data) !== JSON.stringify(drawState)) {
      drawState = data;
      renderDrawResults();
    }
  });

  updateSessionUI();
}

function leaveSession() {
  if (sessionRef) { sessionRef.off(); sessionRef = null; }
  sessionCode = null;
  lsSet('gh_session', null);
  updateSessionUI();
}

function syncDrawState() {
  if (sessionRef && drawState !== null) {
    sessionRef.child('goals').set(drawState);
  }
}

function updateSessionUI() {
  const de = lang === 'de';
  const connected = document.getElementById('session-connected');
  const disconnected = document.getElementById('session-disconnected');
  if (!connected) return;

  const createBtn = document.getElementById('session-create-btn');
  const joinBtn = document.getElementById('session-join-btn');
  const input = document.getElementById('session-code-input');
  const leaveBtn = document.getElementById('session-leave-btn');
  if (createBtn) createBtn.textContent = de ? '+ Sitzung erstellen' : '+ Создать сессию';
  if (joinBtn) joinBtn.textContent = de ? 'Beitreten' : 'Войти';
  if (input) input.placeholder = de ? 'Code' : 'Код';
  if (leaveBtn) leaveBtn.textContent = de ? 'Verlassen' : 'Выйти';

  if (sessionCode) {
    connected.classList.remove('hidden');
    disconnected.classList.add('hidden');
    document.getElementById('session-code-display').textContent = sessionCode;
  } else {
    connected.classList.add('hidden');
    disconnected.classList.remove('hidden');
  }
}

function initSession() {
  const saved = lsGet('gh_session', null);
  if (saved) _connectSession(saved, false);
  else updateSessionUI();
}
