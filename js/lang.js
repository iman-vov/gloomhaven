function setLang(l) {
  lang = l;
  lsSet('lang', l);
  document.documentElement.lang = l;
  document.getElementById('btn-lang-ru').classList.toggle('active', l === 'ru');
  document.getElementById('btn-lang-de').classList.toggle('active', l === 'de');

  const labels = {
    ru: ['🃏 Герои', '📖 Миссии', '⚔ Задания', '🏙 События', '🛒 Магазин', '📚 Справочник', '📋 Правила'],
    de: ['🃏 Helden', '📖 Szenarien', '⚔ Aufgaben', '🏙 Ereignisse', '🛒 Laden', '📚 Handbuch', '📋 Regeln']
  };
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.textContent = labels[l][i]);

  const charNames = {
    HA: { ru: CHARS.HA.nameRu, de: CHARS.HA.nameDe },
    DE: { ru: CHARS.DE.nameRu, de: CHARS.DE.nameDe },
    VW: { ru: CHARS.VW.nameRu, de: CHARS.VW.nameDe },
    RG: { ru: CHARS.RG.nameRu, de: CHARS.RG.nameDe }
  };
  const charColors = {
    HA: 'var(--col-ha)',
    DE: 'var(--col-de)',
    VW: 'var(--col-vw)',
    RG: 'var(--col-rg)'
  };
  const charSubs = {
    HA: { ru: 'Коричневый', de: 'Braun' },
    DE: { ru: 'Оранжевый', de: 'Orange' },
    VW: { ru: 'Серый',     de: 'Grau'  },
    RG: { ru: 'Красный',   de: 'Rot'   }
  };
  ['HA', 'DE', 'VW', 'RG'].forEach(code => {
    const nameEl = document.getElementById(`cc-name-${code}`);
    if (nameEl) nameEl.textContent = charNames[code][l];
    const subEl = document.getElementById(`cc-sub-${code}`);
    if (subEl) { subEl.style.color = charColors[code]; subEl.textContent = charSubs[code][l]; }
  });

  const hint = document.getElementById('char-select-hint');
  if (hint) hint.textContent = l === 'de' ? 'Wähle einen Charakter, um Karten anzusehen' : 'Выберите героя, чтобы открыть карты';

  if (activeChar) {
    document.getElementById('active-char-name').textContent = charName(activeChar);
    renderLevelFilter();
    renderCardsGrid();
    renderDeckCounter();
    if (cardsView === 'deck') renderDeckGrid();
  }

  renderItemsGrid();
  if (shopView === 'owned') renderOwnedGrid();

  const svAll = document.getElementById('shop-vtab-all');
  const svOwned = document.getElementById('shop-vtab-owned');
  if (svAll) svAll.textContent = l === 'de' ? 'Alle Waren' : 'Все товары';
  if (svOwned) svOwned.textContent = l === 'de' ? 'Meine Käufe' : 'Мои покупки';

  const titleEl = document.getElementById('game-title');
  if (titleEl) titleEl.textContent = l === 'de' ? 'Gloomhaven. Die Pranken des Löwen' : 'Мрачная гавань. Челюсти Льва';
  document.title = l === 'de' ? 'Gloomhaven: Die Pranken des Löwen' : 'Gloomhaven: Челюсти Льва';

  const sectionTitles = {
    ru: { heroes: '🃏 Карты Героев', events: '🏙 Городские события', goals: '⚔ Боевые задания', shop: '🛒 Магазин', rules: '📋 Памятка по правилам', missions: '📖 Миссии', helper: '📚 Справочник' },
    de: { heroes: '🃏 Heldenkarten', events: '🏙 Stadtereignisse', goals: '⚔ Kampfaufgaben', shop: '🛒 Laden', rules: '📋 Regelübersicht', missions: '📖 Szenarien', helper: '📚 Handbuch' }
  };
  const t = sectionTitles[l];
  const heroesT = document.getElementById('heroes-title');
  const eventsT = document.getElementById('events-title');
  const goalsT = document.getElementById('goals-title');
  const shopT = document.getElementById('shop-title');
  const rulesT = document.getElementById('rules-title');
  const missionsT = document.getElementById('missions-title');
  const helperT = document.getElementById('helper-title');
  if (heroesT) heroesT.textContent = t.heroes;
  if (eventsT) eventsT.textContent = t.events;
  if (goalsT) goalsT.textContent = t.goals;
  if (shopT) shopT.textContent = t.shop;
  if (rulesT) rulesT.textContent = t.rules;
  if (missionsT) missionsT.textContent = t.missions;
  if (helperT) helperT.textContent = t.helper;

  document.querySelectorAll('[data-ru]:not(#tab-rules [data-ru])').forEach(el => {
    el.textContent = l === 'de' ? el.dataset.de : el.dataset.ru;
  });

  document.querySelectorAll('[data-placeholder-ru]').forEach(el => {
    el.placeholder = l === 'de' ? el.dataset.placeholderDe : el.dataset.placeholderRu;
  });

  const btnA = document.getElementById('btn-choice-a');
  const btnB = document.getElementById('btn-choice-b');
  if (btnA) btnA.textContent = l === 'de' ? 'A wählen' : 'Выбрать A';
  if (btnB) btnB.textContent = l === 'de' ? 'B wählen' : 'Выбрать B';

  const btnEventShow = document.getElementById('btn-event-show');
  if (btnEventShow) btnEventShow.textContent = l === 'de' ? 'Anzeigen' : 'Показать';
  const shopUnlockLabel = document.getElementById('shop-unlock-label');
  if (shopUnlockLabel) shopUnlockLabel.textContent = l === 'de' ? 'Öffnen:' : 'Открыть:';
  const btnUnlockAdd = document.getElementById('btn-unlock-add');
  if (btnUnlockAdd) btnUnlockAdd.textContent = l === 'de' ? '+ Hinzufügen' : '+ Добавить';
  const btnShopReset = document.getElementById('btn-shop-reset');
  if (btnShopReset) btnShopReset.title = l === 'de' ? 'Laden zurücksetzen' : 'Сбросить магазин';

  initEventSelect();
  const evSel = document.getElementById('event-select');
  if (evSel && evSel.value) displayEvent(evSel.value);

  initGoalSelect();
  renderGoalsList();
  const goalSel = document.getElementById('goal-select');
  if (goalSel && goalSel.value) displayGoal(parseInt(goalSel.value));

  const goalModeBtnManual = document.getElementById('goal-mode-btn-manual');
  if (goalModeBtnManual) goalModeBtnManual.textContent = l === 'de' ? '📖 Manuell' : '📖 Вручную';
  const goalModeBtnDraw = document.getElementById('goal-mode-btn-draw');
  if (goalModeBtnDraw) goalModeBtnDraw.textContent = l === 'de' ? '🎲 Auslosung' : '🎲 Жеребьёвка';
  const drawStartBtn = document.getElementById('draw-start-btn');
  if (drawStartBtn) drawStartBtn.textContent = l === 'de' ? '🎲 Auslosen' : '🎲 Разыграть';
  const drawResetBtn = document.getElementById('draw-reset-btn');
  if (drawResetBtn) drawResetBtn.textContent = l === 'de' ? '↺ Neue Runde' : '↺ Новый сеанс';
  const drawPlayersLabel = document.getElementById('draw-players-label');
  if (drawPlayersLabel) drawPlayersLabel.textContent = l === 'de' ? 'Spieler:' : 'Игроков:';
  if (drawState) renderDrawResults();

  updateSessionBar();

  updateRulesLang(l);
  updateHelperLang();
  document.querySelectorAll('.pdf-lang-ru').forEach(el => el.classList.toggle('hidden', l === 'de'));
  document.querySelectorAll('.pdf-lang-de').forEach(el => el.classList.toggle('hidden', l !== 'de'));
  initMissionSelect();
  renderMissionTab();
  updateDrawBtn();
}

function charName(code) {
  return lang === 'de' ? CHARS[code].nameDe : CHARS[code].nameRu;
}
