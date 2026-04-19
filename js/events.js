function initEventSelect() {
  const sel = document.getElementById('event-select');
  const titlesRu = {
    '01':'Долг Ксаина','02':'Прачечная','03':'Книги на мостовой',
    '04':'Рынок фруктов','05':'Скрытень у реки','06':'Объявление о розыске',
    '07':'Стеклянные шарики','08':'Летающий куатрил','09':'Убийство в лавке',
    '10':'Ведьма в канализации','11':'Силомер','12':'Плутовка в зелёном',
    '13':'Ксаин и репутация','14':'Десятина Великому дубу','15':'Долг за выпивку',
    '16':'Предложение Джексеры','17':'Капитан торгового судна','18':'Демоны в доках',
    '19':'Письмо для Алого стража','20':'Соревнование бойцов',
    '21':'Тревога Пустоты','22':'Незнакомец на рынке'
  };
  const titlesDe = {
    '01':'Xains Schulden','02':'Die Wäscherei','03':'Bücher auf dem Pflaster',
    '04':'Der Früchtemarkt','05':'Der Lurker am Fluss','06':'Der Steckbrief',
    '07':'Die Glasmurmeln','08':'Der fliegende Quatryl','09':'Mord im Laden',
    '10':'Die Hexe in der Kanalisation','11':'Der Kraftmesser','12':'Die Gaunerin in Grün',
    '13':'Xain und der Ruf','14':'Der Zehnte für die Große Eiche','15':'Die Schuld für den Drink',
    '16':'Jekserahs Angebot','17':'Die Kapitänin','18':'Dämonen in den Docks',
    '19':'Brief für den Roten Wächter','20':'Das Kämpferturnier',
    '21':'Das Erwachen der Leere','22':'Der Fremde auf dem Markt'
  };
  const curVal = sel.value;
  sel.innerHTML = `<option value="">${lang === 'de' ? '— Ereignis wählen —' : '— Выбрать событие —'}</option>`;
  const titles = lang === 'de' ? titlesDe : titlesRu;
  const played = lsGet('events_played', []);
  for (let i = 1; i <= 22; i++) {
    const num = String(i).padStart(2,'0');
    const opt = document.createElement('option');
    opt.value = num;
    const isPlayed = played.includes(num);
    opt.textContent = `${isPlayed ? '✓ ' : ''}${num} — ${titles[num]}`;
    if (isPlayed) { opt.disabled = true; opt.style.color = 'var(--text-dim)'; }
    sel.appendChild(opt);
  }
  if (curVal) sel.value = curVal;
}

function loadEventFromSelect() {
  const v = document.getElementById('event-select').value;
  if (v) displayEvent(v);
}

function loadEvent() {
  const v = document.getElementById('event-select').value;
  if (v) displayEvent(v);
}

function displayEvent(num) {
  const ev = EVENTS[num];
  if (!ev) return;
  const de = lang === 'de';
  document.getElementById('event-empty').classList.add('hidden');
  document.getElementById('event-display-wrap').classList.remove('hidden');
  document.getElementById('event-num-badge').textContent = de ? `STADTEREIGNIS · ${num}` : `ГОРОД · ${num}`;
  document.getElementById('event-story-text').textContent = de && ev.storyDe ? ev.storyDe : ev.story;
  const choiceAText = de && ev.choiceADe ? ev.choiceADe : ev.choiceA;
  const choiceBText = de && ev.choiceBDe ? ev.choiceBDe : ev.choiceB;
  document.getElementById('event-choice-a-label').textContent = (de ? `Option A: ` : `Вариант А: `) + choiceAText;
  document.getElementById('event-choice-b-label').textContent = (de ? `Option B: ` : `Вариант Б: `) + choiceBText;
  document.getElementById('event-result-box').classList.add('hidden');
  const btnA = document.getElementById('btn-choice-a');
  const btnB = document.getElementById('btn-choice-b');
  btnA.disabled = false; btnA.dataset.num = num;
  btnB.disabled = false; btnB.dataset.num = num;
}

function showEventChoice(choice) {
  const num = document.getElementById(`btn-choice-${choice}`).dataset.num;
  const ev = EVENTS[num];
  if (!ev) return;
  const de = lang === 'de';
  const choiceAText = de && ev.choiceADe ? ev.choiceADe : ev.choiceA;
  const choiceBText = de && ev.choiceBDe ? ev.choiceBDe : ev.choiceB;
  const resultAText = de && ev.resultADe ? ev.resultADe : ev.resultA;
  const resultBText = de && ev.resultBDe ? ev.resultBDe : (ev.resultBRu || ev.resultB);
  document.getElementById('event-result-header').textContent =
    choice === 'a' ? (de ? `Option A: ` : `Вариант А: `) + choiceAText
                   : (de ? `Option B: ` : `Вариант Б: `) + choiceBText;
  document.getElementById('event-result-text').textContent =
    choice === 'a' ? resultAText : resultBText;
  const box = document.getElementById('event-result-box');
  box.classList.remove('hidden');
  box.scrollIntoView({ behavior:'smooth', block:'start' });
  document.getElementById(choice === 'a' ? 'btn-choice-b' : 'btn-choice-a').disabled = true;
  // Mark as played
  const played = lsGet('events_played', []);
  if (!played.includes(num)) {
    played.push(num);
    lsSet('events_played', played);
  }
  initEventSelect();
  updateDrawBtn();
}

function resetPlayedEvents() {
  lsSet('events_played', []);
  const wrap = document.getElementById('event-display-wrap');
  const empty = document.getElementById('event-empty');
  if (wrap) wrap.classList.add('hidden');
  if (empty) empty.classList.remove('hidden');
  initEventSelect();
  updateDrawBtn();
}

function drawEventCard() {
  const played = lsGet('events_played', []);
  const available = [];
  for (let i = 1; i <= 22; i++) {
    const num = String(i).padStart(2,'0');
    if (!played.includes(num)) available.push(num);
  }
  if (available.length === 0) return;
  const num = available[Math.floor(Math.random() * available.length)];
  const sel = document.getElementById('event-select');
  sel.value = num;
  displayEvent(num);
}

function updateDrawBtn() {
  const played = lsGet('events_played', []);
  const remaining = 22 - played.length;
  const btn = document.getElementById('btn-draw-event');
  if (!btn) return;
  const de = lang === 'de';
  btn.disabled = remaining === 0;
  btn.textContent = remaining === 0
    ? (de ? '🎴 Колода пуста' : '🎴 Колода пуста')
    : `🎴 ${de ? 'Karte ziehen' : 'Взять карту'} (${remaining})`;
}
