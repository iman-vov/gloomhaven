function initMissionSelect() {
  const sel = document.getElementById('mission-select');
  if (!sel || typeof MISSIONS === 'undefined') return;
  const curVal = sel.value;
  sel.innerHTML = `<option value="">${lang === 'de' ? '— Szenario wählen —' : '— Выбрать миссию —'}</option>`;
  MISSIONS.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.id}. ${lang === 'de' ? m.nameDe : m.nameRu}`;
    sel.appendChild(opt);
  });
  if (curVal) {
    sel.value = curVal;
    renderMissionTab();
  }
}

function renderMissionTab() {
  const sel = document.getElementById('mission-select');
  if (!sel || typeof MISSIONS === 'undefined') return;
  const id = parseInt(sel.value);
  const m = MISSIONS.find(x => x.id === id);
  const content = document.getElementById('mission-content');
  if (!m) {
    content.classList.add('hidden');
    return;
  }
  content.classList.remove('hidden');

  const de = lang === 'de';

  document.getElementById('mission-task').textContent = de ? m.taskDe : m.taskRu;
  document.getElementById('mission-intro').textContent = de ? m.introDe : m.introRu;

  const rulesBlock = document.getElementById('mission-rules-block');
  const rulesText = de ? m.specialRulesDe : m.specialRulesRu;
  if (rulesText && rulesText.trim()) {
    document.getElementById('mission-rules').textContent = rulesText;
    rulesBlock.classList.remove('hidden');
  } else {
    rulesBlock.classList.add('hidden');
  }

  const triggersBlock = document.getElementById('mission-triggers-block');
  const list = document.getElementById('mission-triggers-list');
  list.innerHTML = '';
  if (m.triggers && m.triggers.length > 0) {
    m.triggers.forEach(t => {
      const text = de ? (t.textDe || t.textRu) : t.textRu;
      if (!text || !text.trim()) return;
      const div = document.createElement('div');
      div.className = 'mission-trigger';
      div.innerHTML = `<div class="mission-trigger-num">⚠️ ${de ? 'Lies' : 'Читать'} ${t.num} <span class="mission-trigger-arrow">▶</span></div><div class="mission-trigger-text hidden">${escHtml(text)}</div>`;
      div.querySelector('.mission-trigger-num').addEventListener('click', () => {
        const body = div.querySelector('.mission-trigger-text');
        const arrow = div.querySelector('.mission-trigger-arrow');
        body.classList.toggle('hidden');
        arrow.textContent = body.classList.contains('hidden') ? '▶' : '▼';
      });
      list.appendChild(div);
    });
    triggersBlock.classList.toggle('hidden', list.children.length === 0);
  } else {
    triggersBlock.classList.add('hidden');
  }

  document.getElementById('mission-conclusion').textContent = de ? m.conclusionDe : m.conclusionRu;
  document.getElementById('mission-reward').textContent = de ? m.rewardDe : m.rewardRu;

  const labels = de
    ? { task: 'Aufgabe', intro: 'Einleitung', rules: 'Sonderregeln', triggers: 'Auslöser', conclusion: 'Abschluss', reward: 'Belohnung' }
    : { task: 'Задача', intro: 'Вступление', rules: 'Особые правила', triggers: 'Тригеры', conclusion: 'Развязка', reward: 'Награда' };
  document.getElementById('mission-task-label').textContent = labels.task;
  document.getElementById('mission-intro-label').textContent = labels.intro;
  document.getElementById('mission-rules-label').textContent = labels.rules;
  document.getElementById('mission-triggers-label').textContent = labels.triggers;
  document.getElementById('mission-conclusion-label').textContent = labels.conclusion;
  document.getElementById('mission-reward-label').textContent = labels.reward;
}
