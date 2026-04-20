let goalMode = 'manual';
let drawPlayerCount = 1;
let drawState = null; // {players:[{options:[id,id], picked:id|null}], activePlayer:0, revealed:bool}

function setGoalMode(mode) {
  goalMode = mode;
  document.getElementById('goals-manual-section').classList.toggle('hidden', mode !== 'manual');
  document.getElementById('goals-draw-section').classList.toggle('hidden', mode !== 'draw');
  document.getElementById('goal-mode-btn-manual').classList.toggle('active', mode === 'manual');
  document.getElementById('goal-mode-btn-draw').classList.toggle('active', mode === 'draw');
  if (mode === 'draw') restoreDrawState();
}

function setDrawPlayerCount(n) {
  drawPlayerCount = n;
  document.querySelectorAll('.draw-count-btn').forEach((b, i) => b.classList.toggle('active', i + 1 === n));
}

function startGoalDraw() {
  const taken = new Set();
  const players = [];
  for (let i = 0; i < drawPlayerCount; i++) {
    const pool = GOALS.filter(g => !taken.has(g.id));
    if (pool.length < 2) break;
    const a = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const b = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    taken.add(a.id); taken.add(b.id);
    players.push({ options: [a.id, b.id], picked: null });
  }
  drawState = { players, activePlayer: 0, revealed: false };
  lsSet('gh_draw_state', drawState);
  syncDrawState();
  renderDrawResults();
}

function revealCurrentPlayer() {
  if (!drawState) return;
  drawState.revealed = true;
  lsSet('gh_draw_state', drawState);
  syncDrawState();
  renderDrawResults();
}

function pickGoal(goalId) {
  if (!drawState || !drawState.revealed) return;
  const idx = drawState.activePlayer;
  if (drawState.players[idx].picked !== null) return;
  drawState.players[idx].picked = goalId;
  drawState.revealed = false;
  // advance to next player who hasn't picked yet
  let next = idx + 1;
  while (next < drawState.players.length && drawState.players[next].picked !== null) next++;
  drawState.activePlayer = next;
  lsSet('gh_draw_state', drawState);
  syncDrawState();
  renderDrawResults();
}

function resetGoalDraw() {
  drawState = null;
  lsSet('gh_draw_state', null);
  syncDrawState();
  renderDrawResults();
}

function restoreDrawState() {
  const saved = lsGet('gh_draw_state', null);
  drawState = saved;
  renderDrawResults();
}

function renderDrawResults() {
  const container = document.getElementById('goals-draw-results');
  const resetBtn = document.getElementById('draw-reset-btn');
  const setupDiv = document.getElementById('goals-draw-setup');
  const de = lang === 'de';

  if (!drawState || drawState.players.length === 0) {
    container.innerHTML = '';
    resetBtn.classList.add('hidden');
    setupDiv.classList.remove('hidden');
    return;
  }

  setupDiv.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  container.innerHTML = '';

  const { players, activePlayer, revealed } = drawState;
  const allDone = players.every(p => p.picked !== null);

  if (allDone) {
    // Show summary of all picks
    players.forEach((player, idx) => {
      const g = GOALS.find(x => x.id === player.picked);
      const section = document.createElement('div');
      section.className = 'draw-player-section';
      section.innerHTML = `
        <div class="draw-player-header">${de ? `Spieler ${idx+1}` : `Игрок ${idx+1}`}</div>
        <div class="draw-goal-picked">
          <div class="draw-goal-check">✓</div>
          <div class="draw-goal-info">
            <div class="draw-goal-num">#${g.id}</div>
            <div class="draw-goal-name">${de && g.nameDe ? g.nameDe : g.nameRu}</div>
            <div class="draw-goal-cond">${de && g.conditionDe ? g.conditionDe : g.conditionRu}</div>
          </div>
        </div>`;
      container.appendChild(section);
    });
    return;
  }

  if (!revealed) {
    // Handoff screen — nothing from previous players shown
    const handoff = document.createElement('div');
    handoff.className = 'draw-handoff';

    handoff.innerHTML = `
      <div class="draw-handoff-icon">🎲</div>
      <div class="draw-handoff-text">${de ? `Gerät an Spieler ${activePlayer+1} übergeben` : `Передайте пристрій Игроку ${activePlayer+1}`}</div>
      <button class="btn-primary draw-reveal-btn" onclick="revealCurrentPlayer()">
        ${de ? '👁 Meine Aufgaben anzeigen' : '👁 Показать мои задания'}
      </button>`;
    container.appendChild(handoff);
  } else {
    // Show current player's options
    const player = players[activePlayer];

    const section = document.createElement('div');
    section.className = 'draw-player-section draw-player-active';

    const header = document.createElement('div');
    header.className = 'draw-player-header';
    header.textContent = de ? `Spieler ${activePlayer+1} — wähle deine Aufgabe` : `Игрок ${activePlayer+1} — выбери своё задание`;
    section.appendChild(header);

    const opts = document.createElement('div');
    opts.className = 'draw-goal-options';
    player.options.forEach(gid => {
      const g = GOALS.find(x => x.id === gid);
      const card = document.createElement('div');
      card.className = 'draw-goal-card';
      card.innerHTML = `
        <div class="draw-goal-num">#${g.id}</div>
        <div class="draw-goal-name">${de && g.nameDe ? g.nameDe : g.nameRu}</div>
        <div class="draw-goal-cond">${de && g.conditionDe ? g.conditionDe : g.conditionRu}</div>
        <button class="btn-primary draw-pick-btn">${de ? 'Wählen' : 'Выбрать'}</button>`;
      card.querySelector('.draw-pick-btn').onclick = () => pickGoal(gid);
      opts.appendChild(card);
    });
    section.appendChild(opts);
    container.appendChild(section);
  }
}

// ─── Manual mode ───────────────────────────────────────

function initGoalSelect() {
  const sel = document.getElementById('goal-select');
  sel.innerHTML = '<option value="">—</option>';
  GOALS.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id;
    const name = lang === 'de' && g.nameDe ? g.nameDe : g.nameRu;
    opt.textContent = `${g.id} — ${name}`;
    sel.appendChild(opt);
  });
}

function renderGoalsList() {
  const list = document.getElementById('goals-all-list');
  if (!list) return;
  list.innerHTML = '';
  GOALS.forEach(g => {
    const el = document.createElement('div');
    el.className = 'goal-list-item';
    const name = lang === 'de' && g.nameDe ? g.nameDe : g.nameRu;
    el.innerHTML = `<div class="goal-list-num">#${g.id}</div><div class="goal-list-name">${name}</div>`;
    el.onclick = () => displayGoal(g.id);
    list.appendChild(el);
  });
}

function loadGoalFromSelect() {
  const v = document.getElementById('goal-select').value;
  if (v) displayGoal(parseInt(v));
}

function loadGoal() {
  const v = document.getElementById('goal-select').value;
  if (v) displayGoal(parseInt(v));
  else alert(lang === 'de' ? 'Bitte Aufgabe wählen' : 'Выберите задание из списка');
}

function displayGoal(id) {
  const g = GOALS.find(x => x.id === id);
  if (!g) return;
  const de = lang === 'de';
  document.getElementById('goal-select').value = id;
  document.getElementById('goal-display-wrap').classList.remove('hidden');
  document.getElementById('goal-num').textContent = `#${g.id}`;
  document.getElementById('goal-name').textContent = de && g.nameDe ? g.nameDe : g.nameRu;
  document.getElementById('goal-condition').textContent = de && g.conditionDe ? g.conditionDe : g.conditionRu;
  document.getElementById('goal-display-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
