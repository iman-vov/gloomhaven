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
