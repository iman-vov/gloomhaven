let goalMode = 'manual';
let drawPlayerCount = 1;
let drawState = null; // [{options:[id,id], picked:id|null}]

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
  drawState = players;
  lsSet('gh_draw_state', drawState);
  renderDrawResults();
}

function pickGoal(playerIdx, goalId) {
  if (!drawState || drawState[playerIdx].picked !== null) return;
  drawState[playerIdx].picked = goalId;
  lsSet('gh_draw_state', drawState);
  renderDrawResults();
}

function resetGoalDraw() {
  drawState = null;
  lsSet('gh_draw_state', null);
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

  if (!drawState || drawState.length === 0) {
    container.innerHTML = '';
    resetBtn.classList.add('hidden');
    setupDiv.classList.remove('hidden');
    return;
  }

  setupDiv.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  container.innerHTML = '';

  drawState.forEach((player, idx) => {
    const section = document.createElement('div');
    section.className = 'draw-player-section';

    const header = document.createElement('div');
    header.className = 'draw-player-header';
    header.textContent = de ? `Spieler ${idx + 1}` : `Гравець ${idx + 1}`;
    section.appendChild(header);

    if (player.picked !== null) {
      const pickedGoal = GOALS.find(g => g.id === player.picked);
      const wrap = document.createElement('div');
      wrap.className = 'draw-goal-picked';
      wrap.innerHTML = `
        <div class="draw-goal-check">✓</div>
        <div class="draw-goal-info">
          <div class="draw-goal-num">#${pickedGoal.id}</div>
          <div class="draw-goal-name">${de && pickedGoal.nameDe ? pickedGoal.nameDe : pickedGoal.nameRu}</div>
          <div class="draw-goal-cond">${de && pickedGoal.conditionDe ? pickedGoal.conditionDe : pickedGoal.conditionRu}</div>
        </div>`;
      section.appendChild(wrap);
    } else {
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
          <button class="btn-primary draw-pick-btn">${de ? 'Wählen' : 'Обрати'}</button>`;
        card.querySelector('.draw-pick-btn').onclick = () => pickGoal(idx, gid);
        opts.appendChild(card);
      });
      section.appendChild(opts);
    }

    container.appendChild(section);
  });
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
