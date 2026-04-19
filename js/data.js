const DECK_SIZE = { HA: 10, DE: 9, VW: 11, RG: 10 };



// ─── Character Data ───────────────────────────────────

const CHARS = {

  HA: {

    icon: '🪓', color: 'var(--col-ha)', bg: '#3a2010',

    nameRu: 'Тесак', nameDe: 'Axtwerfer', sub: 'Inox Hatchet · Brown',

    cards: buildCardList('HA', {

      'Tut.A': [2,3,4,5,6,7], 'Tut.B': [8,9],

      '1': [10,11,12,13,14,15,16,17,18,19], 'X': [20,21,22],

      '2': [23,24], '3': [25,26], '4': [27,28], '5': [30],

      '6': [31,32], '7': [33,34], '8': [35,36], '9': [37,38]

    })

  },

  DE: {

    icon: '💥', color: 'var(--col-de)', bg: '#2e1a08',

    nameRu: 'Подрывник', nameDe: 'Sprengmeisterin', sub: 'Quatryl Demolitionist · Orange',

    cards: buildCardList('DE', {

      'Tut.A': [74,75,76,77,78,79], 'Tut.B': [80,81],

      '1': [82,83,84,85,86,87,88,89,90], 'X': [91,92,93],

      '2': [94,95], '3': [96,97], '4': [98,99], '5': [101],

      '6': [102,103], '7': [104,105], '8': [106,107], '9': [108,109]

    })

  },

  VW: {

    icon: '🌀', color: 'var(--col-vw)', bg: '#0e1520',

    nameRu: 'Жрица Пустоты', nameDe: 'Leerehüterin', sub: 'Human Voidwarden · Grey',

    cards: buildCardList('VW', {

      'Tut.A': [143,144,145,146,147,148], 'Tut.B': [149,150],

      '1': [151,152,153,154,155,156,157,158,159,160,161], 'X': [162,163,164],

      '2': [165,166], '3': [167,168], '4': [169,170], '5': [172],

      '6': [173,174], '7': [175,176], '8': [177,178], '9': [179,180]

    })

  },

  RG: {

    icon: '🛡', color: 'var(--col-rg)', bg: '#200e0e',

    nameRu: 'Алый гвардеец', nameDe: 'Rotgardist', sub: 'Valrath Red Guard · Red',

    cards: buildCardList('RG', {

      'Tut.A': [216,217,218,219,220,221], 'Tut.B': [222,223],

      '1': [224,225,226,227,228,229,230,231,232,233], 'X': [234,235,236],

      '2': [237,238], '3': [239,240], '4': [241,242], '5': [244],

      '6': [245,246], '7': [247,248], '8': [249,250], '9': [251,252]

    })

  }



};
function buildCardList(code, levelMap) {

  const list = [];

  for (const [lvl, ids] of Object.entries(levelMap)) {

    for (const id of ids) {

      list.push({ id: String(id).padStart(3,'0'), code, level: lvl });

    }

  }

  return list;

}



const CARD_DATA = {

  '002': { nameRu: 'Тормозящая сила', nameDe: 'Bremsende Kraft', initiative: 35, lost: false,
    descRu: 'Верх: Атака 3, Дальность 3. Один враг в пределах 3 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением).\nНиз: ПАРАЛИЧ (цель: один враг на соседней клетке). До конца своего следующего хода один враг на соседней клетке не может выполнять действия движения. Затем передвиньтесь по полю на 3 клетки или меньше.',
    descDe: 'Oben: Angriff 3, Reichweite 3. Ein Gegner innerhalb Reichweite 3 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: LÄHMUNG (Ziel: ein Gegner auf einem benachbarten Feld). Bis zum Ende seines nächsten Zuges kann ein Gegner auf einem benachbarten Feld keine Bewegungsaktionen ausführen. Bewege dich danach 3 Felder oder weniger.' },
  '003': { nameRu: 'Двойной бросок', nameDe: 'Doppelwurf', initiative: 64, lost: false,
    descRu: 'Верх: Атака 2, Дальность 3, Цели 2. Два врага или меньше в пределах 3 клеток получают по 2 урона (вытяните отдельную карту модификатора атаки для каждой цели; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Добавляйте +1 к атаке ко всем вашим атакам в этом раунде.',
    descDe: 'Oben: Angriff 2, Reichweite 3, Ziele 2. Bis zu zwei Gegner innerhalb Reichweite 3 erleiden je 2 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Füge allen deinen Angriffen in dieser Runde +1 Angriff hinzu.' },
  '004': { nameRu: 'Заградительный огонь', nameDe: 'Sperrfeuer', initiative: 51, lost: false,
    descRu: 'Верх: Атака 1, Дальность 3, Цели 3, СМЯТЕНИЕ. Три врага или меньше в пределах 3 клеток получают по 1 урону (вытяните отдельную карту модификатора атаки для каждой цели; по врагу на соседней клетке атака проводится с затруднением). До конца своего следующего хода эти враги проводят все свои атаки с затруднением.\nНиз: Движение 2. Передвиньтесь по полю на 2 клетки или меньше. Все враги на соседних клетках получают по 1 урону.',
    descDe: 'Oben: Angriff 1, Reichweite 3, Ziele 3, VERWIRRUNG. Bis zu drei Gegner innerhalb Reichweite 3 erleiden je 1 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt). Bis zum Ende ihres nächsten Zuges führen diese Gegner alle ihre Angriffe mit Nachteil aus.\nUnten: Bewegung 2. Bewege dich 2 Felder oder weniger. Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden.' },
  '005': { nameRu: 'Второе дыхание', nameDe: 'Zweiter Atem', initiative: 18, lost: false,

    descRu: 'Верх: Лечение 3 (на себя). Восстановите себе 3 очка здоровья.\nНиз: Движение 5. Передвиньтесь по полю на 5 клеток или меньше.',
    descDe: 'Oben: Heilung 3 (auf dich). Stelle 3 Lebenspunkte bei dir wieder her.\nUnten: Bewegung 5. Bewege dich 5 Felder oder weniger.' },

  '006': { nameRu: 'Центр масс', nameDe: 'Massenzentrum', initiative: 24, lost: false,

    descRu: 'Верх: Атака 3, Дальность 3. Один враг в пределах 3 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Движение 3. Передвиньтесь по полю на 3 клетки или меньше.',
    descDe: 'Oben: Angriff 3, Reichweite 3. Ein Gegner innerhalb Reichweite 3 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Bewegung 3. Bewege dich 3 Felder oder weniger.' },

  '007': { nameRu: 'Рубить сплеча', nameDe: 'Axtschlag', initiative: 25, lost: false,

    descRu: 'Верх: Атака 3. Один враг на соседней клетке получает 3 урона (примените эффект карты модификатора атаки).\nНиз: Движение 4. Передвиньтесь по полю на 4 клетки или меньше.',
    descDe: 'Oben: Angriff 3. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an).\nUnten: Bewegung 4. Bewege dich 4 Felder oder weniger.' },

  '008': { nameRu: 'Центр масс', nameDe: 'Massenzentrum', initiative: 24, lost: false,

    descRu: 'Верх: Атака 3, Дальность 3. Один враг в пределах 3 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Движение 3. ОТТОЛКНУТЬ 2 (цель: один враг на соседней клетке). Передвиньтесь по полю на 3 клетки или меньше. Затем один враг на соседней клетке передвигается на 2 клетки или меньше по направлению от вас.',
    descDe: 'Oben: Angriff 3, Reichweite 3. Ein Gegner innerhalb Reichweite 3 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Bewegung 3. STOẞEN 2 (Ziel: ein Gegner auf einem benachbarten Feld). Bewege dich 3 Felder oder weniger. Danach bewegt sich ein Gegner auf einem benachbarten Feld 2 Felder oder weniger von dir weg.' },

  '009': { nameRu: 'Рубить сплеча', nameDe: 'Axtschlag', initiative: 25, lost: true,

    descRu: 'Верх: Атака 3, целевая область. Все враги в целевой области получают по 3 урона (вытяните отдельную карту модификатора атаки для каждой цели).\nНиз: Движение 4. Добыча 1. Передвиньтесь по полю на 4 клетки или меньше. Затем подберите все монеты и жетоны сокровищ на вашей и соседних с вами клетках и положите эту карту в стопку «Потери».',
    descDe: 'Oben: Angriff 3, Zielfeld. Alle Gegner im Zielfeld erleiden je 3 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte).\nUnten: Bewegung 4. Plündern 1. Bewege dich 4 Felder oder weniger. Hebe danach alle Münzen und Schatzmarker auf deinem Feld und auf benachbarten Feldern auf und lege diese Karte auf den Ablagestapel für verlorene Karten.' },

  '010': { nameRu: 'Фаворит', nameDe: 'Favorit', initiative: 17, lost: false,

    descRu: 'Верх: Положите ваш жетон персонажа на эту карту, теперь это жетон «Фаворит». Вы можете добавить +3 к любой вашей дальней атаке. Для этого после вытягивания карты модификатора атаки переложите жетон с этой карты на цель. Когда этот враг умрёт, положите жетон на ту клетку, на которой он умер. Выполнив добычу на этой клетке, верните жетон на карту. Получите 2 опыта. (Потеря).\nНиз: РАНА (цель: один враг на соседней клетке). Движение 3. Прыжок.',
    descDe: 'Oben: Lege deinen Charaktermarker auf diese Karte; er ist nun der Marker „Favorit“. Du kannst zu einem beliebigen deiner Fernangriffe +3 Angriff hinzufügen. Lege dazu nach dem Ziehen einer Angriffsmodifikatorkarte den Marker von dieser Karte auf das Ziel. Wenn jener Gegner stirbt, lege den Marker auf das Feld, auf dem er gestorben ist. Wenn du auf diesem Feld plünderst, lege den Marker auf die Karte zurück. Erhalte 2 EP. (Verlust).\nUnten: WUNDE (Ziel: ein Gegner auf einem benachbarten Feld). Bewegung 3. Sprung.' },

  '011': { nameRu: 'Возврат', nameDe: 'Rückkehr', initiative: 46, lost: false,

    descRu: 'Верх: Атака 2. Если на цели лежит жетон «Фаворит», верните жетон на соответствующую карту.\nНиз: Движение 1. Добыча 1.',
    descDe: 'Oben: Angriff 2. Falls sich der Marker „Favorit“ auf dem Ziel befindet, lege den Marker auf die entsprechende Karte zurück.\nUnten: Bewegung 1. Plündern 1.' },

  '012': { nameRu: 'Рубить сплеча', nameDe: 'Axtschlag', initiative: 25, lost: false,

    descRu: 'Верх: Атака 3, целевая область. Получите 1 опыт.\nНиз: Атака 2. Движение 2.',
    descDe: 'Oben: Angriff 3, Zielfeld. Erhalte 1 EP.\nUnten: Angriff 2. Bewegung 2.' },

  '013': { nameRu: 'Центр масс', nameDe: 'Massenzentrum', initiative: 24, lost: false,

    descRu: 'Верх: Атака 3, Дальность 3.\nНиз: Движение 3. ОТТОЛКНУТЬ 2 (цель: один враг на соседней клетке).',
    descDe: 'Oben: Angriff 3, Reichweite 3.\nUnten: Bewegung 3. STOẞEN 2 (Ziel: ein Gegner auf einem benachbarten Feld).' },

  '014': { nameRu: 'Тормозящая сила', nameDe: 'Bremsende Kraft', initiative: 35, lost: true,

    descRu: 'Верх: Атака 3, Дальность 2. Воздух: +1 к дальности, ОТТОЛКНУТЬ 2. Получите 1 опыт. (Потеря)\nНиз: Движение 3. Прыжок. ПАРАЛИЧ (цели: все враги на клетках, соседних с клетками, через которые вы передвинулись этим действием). Воздух. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Angriff 3, Reichweite 2. Luft: +1 zu Reichweite, STOẞEN 2. Erhalte 1 EP. (Verlust)\nUnten: Bewegung 3. Sprung. LÄHMUNG (Ziele: alle Gegner auf Feldern, die zu den Feldern benachbart sind, über die du dich mit dieser Aktion bewegt hast). Luft. Erhalte 1 EP. (Verlust)' },

  '015': { nameRu: 'Двойной бросок', nameDe: 'Doppelwurf', initiative: 64, lost: true,

    descRu: 'Верх: Атака 3, Дальность 4, Цели 2. Воздух. Получите 2 опыта. (Потеря)\nНиз: Удвойте показатель вашей следующей атаки в этом раунде. Получите 1 опыт. Бонус раунда. (Потеря)',
    descDe: 'Oben: Angriff 3, Reichweite 4, Ziele 2. Luft. Erhalte 2 EP. (Verlust)\nUnten: Verdopple den Wert deines nächsten Angriffs in dieser Runde. Erhalte 1 EP. Rundenaktion. (Verlust)' },

  '016': { nameRu: 'Заградительный огонь', nameDe: 'Sperrfeuer', initiative: 51, lost: false,

    descRu: 'Верх: Атака 1, Дальность 3, Цели 3, СМЯТЕНИЕ.\nНиз: Движение 2. Все враги на соседних клетках получают по 1 урону. Получите 1 опыт. Движение 1. Все враги на соседних клетках получают по 2 урона. Движение 1. (Потеря)',
    descDe: 'Oben: Angriff 1, Reichweite 3, Ziele 3, VERWIRRUNG.\nUnten: Bewegung 2. Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden. Erhalte 1 EP. Bewegung 1. Alle Gegner auf benachbarten Feldern erleiden je 2 Schaden. Bewegung 1. (Verlust)' },

  '017': { nameRu: 'Прорыв', nameDe: 'Durchbruch', initiative: 60, lost: true,

    descRu: 'Верх: Атака 6, Дальность 3. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Воздух.',
    descDe: 'Oben: Angriff 6, Reichweite 3. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Luft.' },

  '018': { nameRu: 'Последний штрих', nameDe: 'Letzter Strich', initiative: 39, lost: false,

    descRu: 'Верх: Атака 2, Дальность 4. Добавьте +2 к атаке и получите 1 опыт, если на цели лежит жетон «Фаворит».\nНиз: Движение 2. ОТТОЛКНУТЬ 2 (цель: один враг на соседней клетке). Воздух: Движение 2.',
    descDe: 'Oben: Angriff 2, Reichweite 4. Füge +2 Angriff hinzu und erhalte 1 EP, falls sich der Marker „Favorit“ auf dem Ziel befindet.\nUnten: Bewegung 2. STOẞEN 2 (Ziel: ein Gegner auf einem benachbarten Feld). Luft: Bewegung 2.' },

  '019': { nameRu: 'Второе дыхание', nameDe: 'Zweiter Atem', initiative: 18, lost: true,

    descRu: 'Верх: Лечение 6 (на себя). Воздух. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Добавьте +2 к движению и получите 1 опыт, если вы убили врага в этом раунде.',
    descDe: 'Oben: Heilung 6 (auf dich). Luft. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Füge +2 zu Bewegung hinzu und erhalte 1 EP, falls du in dieser Runde einen Gegner getötet hast.' },

  '020': { nameRu: 'Скорая помощь', nameDe: 'Erste Hilfe', initiative: 30, lost: false,

    descRu: 'Верх: Атака 2, Дальность 3. Лечение 2 (цель: один союзник на соседней с целью атаки клетке).\nНиз: Движение 3. Лечение 1, Дальность 1. Земля.',
    descDe: 'Oben: Angriff 2, Reichweite 3. Heilung 2 (Ziel: ein Verbündeter auf einem zum Angriffsziel benachbarten Feld).\nUnten: Bewegung 3. Heilung 1, Reichweite 1. Erde.' },

  '021': { nameRu: 'Воспарить', nameDe: 'Aufsteigen', initiative: 21, lost: false,

    descRu: 'Верх: Атака 2, Дальность 3. Воздух: +1 к атаке, +2 к дальности. Получите 1 опыт.\nНиз: Движение 4. Воздух. В следующих 4 случаях, когда вы выполняете действие движения, добавляйте +2 к движению.',
    descDe: 'Oben: Angriff 2, Reichweite 3. Luft: +1 Angriff, +2 Reichweite. Erhalte 1 EP.\nUnten: Bewegung 4. Luft. In den nächsten 4 Fällen, wenn du eine Bewegungsaktion ausführst, füge +2 zu Bewegung hinzu.' },


  '022': { nameRu: 'Модная шляпа', nameDe: 'Modischer Hut', initiative: 12, lost: true,

    descRu: 'Верх: Движение 3. Щит 2. Тьма. Получите 1 опыт. Бонус раунда. (Потеря)\nНиз: В этом раунде добавляйте +1 к атаке ко всем вашим атакам. Бонус раунда.',
    descDe: 'Oben: Bewegung 3. Schild 2. Dunkelheit. Erhalte 1 EP. Rundenaktion. (Verlust)\nUnten: In dieser Runde erhalten alle deine Angriffe +1 Angriff. Rundenaktion.',
    descDe: 'Oben: Bewegung 3. Sprung. Schild 2. Dunkelheit. Erhalte 1 EP. Rundenaktion. (Verlust)\nUnten: In dieser Runde erhalten alle deine Angriffe +1 Angriff. Rundenaktion.' },

  '023': { nameRu: 'Повторный выстрел', nameDe: 'Wiederholungsschuss', initiative: 31, lost: true,

    descRu: 'Верх: Атака 3, Дальность 3. Добавьте +2 к атаке и получите 1 опыт, если на цели лежит жетон «Фаворит».\nНиз: Атака 5, Дальность 3. Воздух. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Angriff 3, Reichweite 3. Füge +2 Angriff hinzu und erhalte 1 EP, falls sich der Marker „Favorit“ auf dem Ziel befindet.\nUnten: Angriff 5, Reichweite 3. Luft. Erhalte 1 EP. (Verlust)' },

  '024': { nameRu: 'Рикошет', nameDe: 'Querschläger', initiative: 56, lost: true,

    descRu: 'Верх: Атака 2, Дальность 3. Затем Атака 2 по другому врагу в пределах Дальности 2 от цели предыдущей атаки.\nНиз: Во время ваших следующих 4 атак, когда это возможно, один враг на соседней с целью клетке получает 2 урона. (Потеря)',
    descDe: 'Oben: Angriff 2, Reichweite 3. Danach Angriff 2 gegen einen anderen Gegner innerhalb Reichweite 2 zum Ziel des vorherigen Angriffs.\nUnten: Während deiner nächsten 4 Angriffe erleidet, wenn möglich, ein Gegner auf einem zum Ziel benachbarten Feld 2 Schaden. (Verlust)' },

  '025': { nameRu: 'Заточенные лезвия', nameDe: 'Geschärfte Klingen', initiative: 44, lost: true,

    descRu: 'Верх: Во время ваших следующих 5 атак добавляйте +1 к атаке, РАНА. Огонь. (Потеря)\nНиз: Движение 4. Воздух: +2 к движению.',
    descDe: 'Oben: Während deiner nächsten 5 Angriffe füge +1 Angriff, WUNDE hinzu. Feuer. (Verlust)\nUnten: Bewegung 4. Luft: +2 Bewegung.' },

  '026': { nameRu: 'Пугающая эффективность', nameDe: 'Furchteinflößende Effizienz', initiative: 58, lost: true,

    descRu: 'Верх: Атака 6, Дальность 4. Если эта атака убила цель, один враг на соседней с убитой целью клетке получает X урона, где X — разница между нанесённым уроном и значением, необходимым для убийства цели атаки. Воздух. Получите 2 опыта. (Потеря)\nНиз: Атака 1, Дальность 3. Добавьте +2 к атаке и получите 1 опыт, если вы убили врага в этом раунде.',
    descDe: 'Oben: Angriff 6, Reichweite 4. Falls dieser Angriff das Ziel tötet, erleidet ein Gegner auf einem zum getöteten Ziel benachbarten Feld X Schaden, wobei X der Differenz zwischen dem zugefügten Schaden und dem zum Töten des Ziels erforderlichen Werts entspricht. Luft. Erhalte 2 EP. (Verlust)\nUnten: Angriff 1, Reichweite 3. Füge +2 Angriff hinzu und erhalte 1 EP, falls du in dieser Runde einen Gegner getötet hast.' },

  '027': { nameRu: 'Вырвать с мясом', nameDe: 'Mit Fleisch herausgerissen', initiative: 20, lost: false,

    descRu: 'Верх: Добыча 1. Если на враге на соседней клетке лежит жетон «Фаворит», вы можете вернуть жетон на соответствующую карту. Если вернули, этот враг получает 2 урона и состояние РАНА.\nНиз: Лечение 3, Дальность 2. Добавьте состояние УСИЛЕНИЕ и получите 1 опыт, если вы убили врага в этом раунде. Воздух.',
    descDe: 'Oben: Plündern 1. Falls sich der Marker „Favorit“ auf einem Gegner auf einem benachbarten Feld befindet, kannst du den Marker auf die entsprechende Karte zurücklegen. Falls du ihn zurücklegst, erleidet jener Gegner 2 Schaden und WUNDE.\nUnten: Heilung 3, Reichweite 2. Füge STÄRKUNG hinzu und erhalte 1 EP, falls du in dieser Runde einen Gegner getötet hast. Luft.' },

  '028': { nameRu: 'Наблюдатель', nameDe: 'Beobachter', initiative: 40, lost: true,

    descRu: 'Верх: Атака 3, Дальность 4. Воздух: +1 к атаке, +1 к дальности. Получите 1 опыт.\nНиз: В следующих 5 случаях, когда враг заканчивает действие движения на клетке в пределах дальности 5 от вас, выполните действие «Атака 2, Дальность 5», выбрав целью этого врага. (Потеря)',
    descDe: 'Oben: Angriff 3, Reichweite 4. Luft: +1 Angriff, +1 Reichweite. Erhalte 1 EP.\nUnten: In den nächsten 5 Fällen, in denen ein Gegner eine Bewegungsaktion auf einem Feld innerhalb Reichweite 5 zu dir beendet, führe „Angriff 2, Reichweite 5“ gegen jenen Gegner aus. (Verlust)' },

  '030': { nameRu: 'Новый фаворит', nameDe: 'Neuer Favorit', initiative: 15, lost: true,

    descRu: 'Верх: Положите жетон топора на эту карту, теперь это жетон «Фаворит». Вы можете добавить +3 к атаке, состояние РАНА и ОТТОЛКНУТЬ 1 к любой вашей дальней атаке. Для этого после вытягивания карты модификатора атаки переложите жетон с этой карты на цель. Когда этот враг умрёт, положите жетон на ту клетку, на которой он умер. Выполнив добычу на этой клетке, верните жетон на карту. Эта карта не может находиться в области действующих карт, если там есть карта «Фаворит». Получите 2 опыта. (Потеря)\nНиз: Атака 2. ПАРАЛИЧ. Движение 4. Воздух.',
    descDe: 'Oben: Lege den Beilmarker auf diese Karte; er ist nun der Marker „Favorit“. Du kannst zu einem beliebigen deiner Fernangriffe +3 Angriff, WUNDE und STOẞEN 1 hinzufügen. Lege dazu nach dem Ziehen einer Angriffsmodifikatorkarte den Marker von dieser Karte auf das Ziel. Wenn jener Gegner stirbt, lege den Marker auf das Feld, auf dem er gestorben ist. Wenn du auf diesem Feld plünderst, lege den Marker auf die Karte zurück. Diese Karte darf sich nicht im Bereich der aktiven Karten befinden, falls sich dort bereits die Karte „Favorit“ befindet. Erhalte 2 EP. (Verlust)\nUnten: Angriff 2. LÄHMUNG. Bewegung 4. Luft.' },

  '031': { nameRu: 'Бомбардировка', nameDe: 'Bombardierung', initiative: 54, lost: true,

    descRu: 'Верх: Атака 3, Дальность 3. Атака 3, Дальность 3. Атака 3, Дальность 3. Воздух. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Все враги на соседних клетках получают по 1 урону. ОТТОЛКНУТЬ 1 (цели: все враги на соседних клетках).',
    descDe: 'Oben: Angriff 3, Reichweite 3. Angriff 3, Reichweite 3. Angriff 3, Reichweite 3. Luft. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden. STOẞEN 1 (Ziele: alle Gegner auf benachbarten Feldern).' },

  '032': { nameRu: 'Вот это поворот', nameDe: 'Was für eine Wendung', initiative: 11, lost: false,

    descRu: 'Верх: Атака 4, Дальность 3, ОТТОЛКНУТЬ 2. Воздух: +1 к дальности, +2 к ОТТОЛКНУТЬ. Получите 1 опыт.\nНиз: Движение 3. Если жетон «Фаворит» находится на вашей или соседней с вами клетке, вы можете выполнить действие Добыча 1.',
    descDe: 'Oben: Angriff 4, Reichweite 3, STOẞEN 2. Luft: +1 Reichweite, +2 zu STOẞEN. Erhalte 1 EP.\nUnten: Bewegung 3. Falls sich der Marker „Favorit“ auf deinem Feld oder einem benachbarten Feld befindet, kannst du Plündern 1 ausführen.' },

  '033': { nameRu: 'Чёткий приказ', nameDe: 'Klare Anweisung', initiative: 47, lost: true,

    descRu: 'Верх: Во время ваших следующих 5 атак, нацеленных на врага, на котором лежит жетон «Фаворит», добавляйте +2 к атаке. (Потеря)\nНиз: Движение 3. Воздух: Атака 2, Дальность 2. Получите 1 опыт.',
    descDe: 'Oben: Während deiner nächsten 5 Angriffe gegen einen Gegner, auf dem der Marker „Favorit“ liegt, füge +2 Angriff hinzu. (Verlust)\nUnten: Bewegung 3. Luft: Angriff 2, Reichweite 2. Erhalte 1 EP.' },

  '034': { nameRu: 'Жестокость', nameDe: 'Grausamkeit', initiative: 22, lost: true,

    descRu: 'Верх: Атака 4. Добавьте +2 к атаке и получите 1 опыт, если на цели лежит жетон «Фаворит», затем верните жетон на соответствующую карту.\nНиз: Атака 5, Дальность 4, ОГЛУШЕНИЕ. Воздух. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Angriff 4. Füge +2 Angriff hinzu und erhalte 1 EP, falls sich der Marker „Favorit“ auf dem Ziel befindet, und lege den Marker dann auf die entsprechende Karte zurück.\nUnten: Angriff 5, Reichweite 4, BETÄUBUNG. Luft. Erhalte 1 EP. (Verlust)' },

  '035': { nameRu: 'Шрапнель', nameDe: 'Schrapnell', initiative: 37, lost: true,

    descRu: 'Верх: Атака 2, Дальность 3, Цели 2, РАНА. Огонь: +1 к целям. Получите 1 опыт.\nНиз: В следующих 5 случаях, когда вы убиваете врага, все враги на клетках, соседних с умершим, получают по 2 урона. (Потеря)',
    descDe: 'Oben: Angriff 2, Reichweite 3, Ziele 2, WUNDE. Feuer: +1 Ziel. Erhalte 1 EP.\nUnten: In den nächsten 5 Fällen, in denen du einen Gegner tötest, erleiden alle Gegner auf Feldern benachbart zum getöteten Gegner je 2 Schaden. (Verlust)' },

  '036': { nameRu: 'Побратимы', nameDe: 'Waffenbrüder', initiative: 75, lost: false,

    descRu: 'Верх: Лечение 3 (на себя). Лечение 3 (цель: один союзник на соседней клетке). Воздух.\nНиз: Движение 3. Если на соседней с вами клетке находится союзник, то добавьте +2 к вашей следующей атаке в этом раунде.',
    descDe: 'Oben: Heilung 3 (Selbst). Heilung 3 (Ziel: ein Verbündeter auf einem benachbarten Feld). Luft.\nUnten: Bewegung 3. Falls sich auf einem zu dir benachbarten Feld ein Verbündeter befindet, füge deinem nächsten Angriff in dieser Runde +2 Angriff hinzu.' },

  '037': { nameRu: 'Топор палача', nameDe: 'Beil des Henkers', initiative: 79, lost: true,

    descRu: 'Верх: Один обычный или мощный враг на соседней клетке получает 12 урона. Тьма. Получите 2 опыта. (Потеря)\nНиз: Если вы убили врага в этом раунде, то верните жетон «Фаворит» на соответствующую карту и получите 1 опыт.',
    descDe: 'Oben: Ein normaler oder Elite-Gegner auf einem benachbarten Feld erleidet 12 Schaden. Dunkelheit. Erhalte 2 EP. (Verlust)\nUnten: Falls du in dieser Runde einen Gegner getötet hast, lege den Marker „Favorit“ auf die entsprechende Karte zurück und erhalte 1 EP.' },

  '038': { nameRu: 'Сердцеед', nameDe: 'Herzensbrecher', initiative: 32, lost: true,

    descRu: 'Верх: Атака 4, Дальность 4, ОГЛУШЕНИЕ. Огонь: РАНА. Получите 1 опыт.\nНиз: В следующих 4 случаях, когда вы убиваете врага, выполняйте действие «Лечение 3, Дальность 2, БЛАГОСЛОВЕНИЕ». (Потеря)',
    descDe: 'Oben: Angriff 4, Reichweite 4, BETÄUBUNG. Feuer: WUNDE. Erhalte 1 EP.\nUnten: In den nächsten 4 Fällen, in denen du einen Gegner tötest, führe „Heilung 3, Reichweite 2, SEGEN“ aus. (Verlust)' },

  '074': { nameRu: 'Взорвать', nameDe: 'Sprengen', initiative: 88, lost: false,

    descRu: 'Верх: Атака 3, СМЯТЕНИЕ. Один враг на соседней клетке получает 3 урона. До конца своего следующего хода этот враг проводит все свои атаки с затруднением.\nНиз: Движение 2. Уничтожьте одно препятствие в пределах дальности 3. Передвиньтесь по полю на 2 клетки или меньше, затем положите жетон разрушения на одно препятствие в пределах 3 клеток. Теперь через эту клетку можно передвигаться по обычным правилам.',
    descDe: 'Oben: Angriff 3, VERWIRRUNG. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden. Bis zum Ende seines nächsten Zuges führt jener Gegner alle seine Angriffe mit Nachteil aus.\nUnten: Bewegung 2. Zerstöre ein Hindernis innerhalb Reichweite 3. Bewege dich 2 Felder oder weniger und lege dann einen Zerstörungsmarker auf ein Hindernis innerhalb Reichweite 3. Über dieses Feld kann nun nach den normalen Regeln gezogen werden.' },

  '075': { nameRu: 'Вывести из строя', nameDe: 'Außer Gefecht setzen', initiative: 20, lost: false,

    descRu: 'Верх: Атака 3. Один враг на соседней клетке получает 3 урона.\nНиз: Движение 2. Уничтожьте одно препятствие на соседней клетке. Если уничтожили, выполните УСИЛЕНИЕ (на себя). До конца вашего следующего хода все ваши атаки проводятся с преимуществом.',
    descDe: 'Oben: Angriff 3. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden.\nUnten: Bewegung 2. Zerstöre ein Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte STÄRKUNG (Selbst). Bis zum Ende deines nächsten Zuges werden alle deine Angriffe mit Vorteil ausgeführt.' },

  '076': { nameRu: 'Поршневой удар', nameDe: 'Kolbenschlag', initiative: 42, lost: false,

    descRu: 'Верх: Атака 3. Один враг на соседней клетке получает 3 урона.\nНиз: ОГЛУШЕНИЕ (цель: один враг на соседней клетке). До конца своего следующего хода один враг на соседней клетке не может выполнять никакие действия.',
    descDe: 'Oben: Angriff 3. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden.\nUnten: BETÄUBUNG (Ziel: ein Gegner auf einem benachbarten Feld). Bis zum Ende seines nächsten Zuges kann ein Gegner auf einem benachbarten Feld keine Aktionen ausführen.' },

  '077': { nameRu: 'Взрывной блицкриг', nameDe: 'Explosiver Blitzkrieg', initiative: 19, lost: false,

    descRu: 'Верх: Атака 2, Дальность 4. Один враг в пределах 4 клеток получает 2 урона; по врагу на соседней клетке атака проводится с затруднением.\nНиз: Движение 4. Передвиньтесь по полю на 4 клетки или меньше.',
    descDe: 'Oben: Angriff 2, Reichweite 4. Ein Gegner innerhalb Reichweite 4 erleidet 2 Schaden; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt.\nUnten: Bewegung 4. Bewege dich 4 Felder oder weniger.' },

  '078': { nameRu: 'Коронный', nameDe: 'Prunkstück', initiative: 37, lost: false,

    descRu: 'Верх: Атака 2, Дальность 2, Цели 2. Два врага или меньше в пределах 2 клеток получают по 2 урона (вытяните отдельную карту модификатора атаки для каждой цели; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Движение 3. Передвиньтесь по полю на 3 клетки или меньше.',
    descDe: 'Oben: Angriff 2, Reichweite 2, Ziele 2. Bis zu zwei Gegner innerhalb Reichweite 2 erleiden je 2 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Bewegung 3. Bewege dich 3 Felder oder weniger.' },

  '079': { nameRu: 'Атака на «раз-два»', nameDe: 'Angriff auf eins-zwei', initiative: 66, lost: false,

    descRu: 'Верх: Атака 2. Затем Атака 1. Один враг на соседней клетке получает 2 урона (примените эффект карты модификатора атаки), затем этот же или другой враг на соседней клетке получает 1 урон (примените эффект карты модификатора атаки).\nНиз: Атака 1. Один враг на соседней клетке получает 1 урон (примените эффект карты модификатора атаки).',
    descDe: 'Oben: Angriff 2. Danach Angriff 1. Ein Gegner auf einem benachbarten Feld erleidet 2 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an), danach erleidet derselbe oder ein anderer Gegner auf einem benachbarten Feld 1 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an).\nUnten: Angriff 1. Ein Gegner auf einem benachbarten Feld erleidet 1 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an).' },

  '080': { nameRu: 'Коронный', nameDe: 'Prunkstück', initiative: 37, lost: true,

    descRu: 'Верх: Атака 3, Дальность 2, целевая область. Все враги в целевой области получают по 3 урона (вытяните отдельную карту модификатора атаки для каждой цели). Затем положите эту карту в стопку «Потери».\nНиз: Движение 3. ОТТОЛКНУТЬ 1 (цель: один враг на соседней клетке). Передвиньтесь по полю на 3 клетки или меньше. Затем один враг на соседней клетке передвигается на 1 клетку по направлению от вас.',
    descDe: 'Oben: Angriff 3, Reichweite 2, Zielgebiet. Alle Gegner im Zielgebiet erleiden je 3 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte). Lege diese Karte dann auf den Ablagestapel „Verloren“.\nUnten: Bewegung 3. STOẞEN 1 (Ziel: ein Gegner auf einem benachbarten Feld). Bewege dich 3 Felder oder weniger. Danach bewegt sich ein Gegner auf einem benachbarten Feld 1 Feld von dir weg.' },

  '081': { nameRu: 'Атака на «раз-два»', nameDe: 'Angriff auf eins-zwei', initiative: 66, lost: true,

    descRu: 'Верх: Атака 2. Затем Атака 1. Добавьте эффект ОТТОЛКНУТЬ 2, СМЯТЕНИЕ, если цель второй атаки совпадает с целью первой атаки.\nНиз: Атака 1. Добыча 1. Один враг на соседней клетке получает 1 урон (примените эффект карты модификатора атаки). Затем подберите все монеты и жетоны сокровищ на вашей и соседних с вами клетках и положите эту карту в стопку «Потери».',
    descDe: 'Oben: Angriff 2. Danach Angriff 1. Füge STOẞEN 2 und VERWIRRUNG hinzu, falls das Ziel des zweiten Angriffs mit dem Ziel des ersten Angriffs übereinstimmt.\nUnten: Angriff 1. Plündern 1. Ein Gegner auf einem benachbarten Feld erleidet 1 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an). Hebe dann alle Münzen und Schatzmarker auf deinem Feld und auf benachbarten Feldern auf und lege diese Karte auf den Ablagestapel „Verloren“.' },

  '082': { nameRu: 'На взводе', nameDe: 'Aufgeladen', initiative: 77, lost: true,

    descRu: 'Верх: Во время ваших следующих 2 атак добавляйте +2 к атаке. Получите 1 опыт. Бонус раунда. (Потеря)\nНиз: Удвойте показатель вашего следующего действия движения. Бонус раунда.',
    descDe: 'Oben: Füge deinen nächsten 2 Angriffen +2 Angriff hinzu. Erhalte 1 EP. Rundenaktion. (Verlust)\nUnten: Verdopple den Wert deiner nächsten Bewegungsaktion. Rundenaktion.' },

  '083': { nameRu: 'Сокрушительный вес', nameDe: 'Zermalmendes Gewicht', initiative: 22, lost: false,

    descRu: 'Верх: Атака 3. Добавьте +2 к атаке и получите 1 опыт, если цель находится на соседней со стеной клетке.\nНиз: Движение 2. Один враг на клетке, соседней с вами и со стеной, получает 2 урона.',
    descDe: 'Oben: Angriff 3. Füge +2 Angriff hinzu und erhalte 1 EP, falls sich das Ziel auf einem an eine Wand angrenzenden Feld befindet.\nUnten: Bewegung 2. Ein Gegner auf einem Feld, das an dich und an eine Wand angrenzt, erleidet 2 Schaden.' },

  '084': { nameRu: 'Вывести из строя', nameDe: 'Außer Gefecht setzen', initiative: 20, lost: false,

    descRu: 'Верх: Атака 3. В этом раунде к цели не применяются эффекты всех действий лечения. Чтобы отметить этого врага, положите на него ваш жетон персонажа и уберите его в конце раунда. Земля. Бонус раунда.\nНиз: Движение 2. Уничтожьте 1 препятствие на соседней клетке. Если уничтожили, то получите 1 опыт и выполните УСИЛЕНИЕ (на себя).',
    descDe: 'Oben: Angriff 3. In dieser Runde können auf das Ziel keine Heilungseffekte angewendet werden. Um diesen Gegner zu markieren, lege deinen Charaktermarker auf ihn und entferne ihn am Ende der Runde. Erde. Rundenaktion.\nUnten: Bewegung 2. Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 1 EP und führe STÄRKUNG (Selbst) aus.' },

  '085': { nameRu: 'Подорвать', nameDe: 'Untergraben', initiative: 28, lost: true,

    descRu: 'Верх: Уничтожьте 1 препятствие на соседней клетке. Если уничтожили, то получите 2 опыта и выполните ОГЛУШЕНИЕ (цели: все враги, находящиеся на соседних с уничтоженным препятствием клетках). Каждая цель получает 2 урона. (Потеря)\nНиз: Движение 4. Огонь: +2 к движению.',
    descDe: 'Oben: Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 2 EP und führe BETÄUBUNG aus (Ziele: alle Gegner auf Feldern benachbart zum zerstörten Hindernis). Jedes Ziel erleidet 2 Schaden. (Verlust)\nUnten: Bewegung 4. Feuer: +2 Bewegung.' },

  '086': { nameRu: 'Взорвать', nameDe: 'Sprengen', initiative: 88, lost: false,

    descRu: 'Верх: Атака 3. Земля: +1 к атаке, СМЯТЕНИЕ. Получите 1 опыт.\nНиз: Движение 3. Уничтожьте 1 препятствие, находящееся в пределах дальности 3.',
    descDe: 'Oben: Angriff 3. Erde: +1 Angriff, VERWIRRUNG. Erhalte 1 EP.\nUnten: Bewegung 3. Zerstöre 1 Hindernis innerhalb Reichweite 3.' },

  '087': { nameRu: 'Поршневой удар', nameDe: 'Kolbenschlag', initiative: 42, lost: false,

    descRu: 'Верх: Атака 2, ОТТОЛКНУТЬ 2. Огонь: +1 к атаке, +1 к ОТТОЛКНУТЬ. Получите 1 опыт.\nНиз: ОГЛУШЕНИЕ (цель: один враг на соседней клетке). Земля: ОТРАВЛЕНИЕ.',
    descDe: 'Oben: Angriff 2, STOẞEN 2. Feuer: +1 Angriff, +1 zu STOẞEN. Erhalte 1 EP.\nUnten: BETÄUBUNG (Ziel: ein Gegner auf einem benachbarten Feld). Erde: GIFT.' },

  '088': { nameRu: 'Взрывной блицкриг', nameDe: 'Explosiver Blitzkrieg', initiative: 19, lost: true,

    descRu: 'Верх: Атака 2, Дальность 4. Огонь.\nНиз: Движение 3. Если вы открыли дверь во время этого движения, выполните ОГЛУШЕНИЕ (цели: все враги в пределах дальности 3), получите 1 опыт и положите эту карту в стопку «Потери».',
    descDe: 'Oben: Angriff 2, Reichweite 4. Feuer.\nUnten: Bewegung 3. Falls du während dieser Bewegung eine Tür geöffnet hast, führe BETÄUBUNG aus (Ziele: alle Gegner innerhalb Reichweite 3), erhalte 1 EP und lege diese Karte auf den Ablagestapel „Verloren“.' },

  '089': { nameRu: 'Коронный', nameDe: 'Prunkstück', initiative: 37, lost: true,

    descRu: 'Верх: Атака 3, Дальность 2, целевая область. Огонь. Земля. Получите 1 опыт. (Потеря)\nНиз: Движение 3. Уничтожьте 1 препятствие, находящееся на соседней клетке. Если уничтожили, то получите 1 опыт и выполните БЛАГОСЛОВЕНИЕ (на себя).',
    descDe: 'Oben: Angriff 3, Reichweite 2, Zielgebiet. Feuer. Erde. Erhalte 1 EP. (Verlust)\nUnten: Bewegung 3. Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 1 EP und führe SEGEN (Selbst) aus.' },

  '090': { nameRu: 'Атака на «раз-два»', nameDe: 'Angriff auf eins-zwei', initiative: 66, lost: false,

    descRu: 'Верх: Атака 2. Затем Атака 1. Добавьте эффект ОТТОЛКНУТЬ 2, СМЯТЕНИЕ и получите 1 опыт, если цель этой атаки совпадает с целью первой атаки.\nНиз: Атака 1. Добыча 1.',
    descDe: 'Oben: Angriff 2. Danach Angriff 1. Füge STOẞEN 2 und VERWIRRUNG hinzu und erhalte 1 EP, falls das Ziel dieses Angriffs mit dem Ziel des ersten Angriffs übereinstimmt.\nUnten: Angriff 1. Plündern 1.' },

  '091': { nameRu: 'Осколки', nameDe: 'Splitter', initiative: 55, lost: true,

    descRu: 'Верх: Выберите одну клетку в пределах дальности 3, на которой лежит жетон разрушения. Все союзники и враги на этой и соседних с ней клетках получают по 2 урона. Земля. Получите 1 опыт. (Потеря)\nНиз: Движение 2. Создайте 1 повреждающую ловушку (2 урона) на соседней пустой клетке, на которой лежит жетон разрушения.',
    descDe: 'Oben: Wähle ein Feld innerhalb Reichweite 3, auf dem ein Zerstörungsmarker liegt. Alle Verbündeten und Gegner auf diesem Feld und benachbarten Feldern erleiden je 2 Schaden. Erde. Erhalte 1 EP. (Verlust)\nUnten: Bewegung 2. Erzeuge 1 Schadensfalle (2 Schaden) auf einem benachbarten leeren Feld, auf dem ein Zerstörungsmarker liegt.' },

  '092': { nameRu: 'Нивелировать', nameDe: 'Einebnen', initiative: 61, lost: false,

    descRu: 'Верх: Атака 3. Добавьте +3 к атаке и получите 1 опыт, если цель является ключевым объектом.\nНиз: Добавляйте +1 к атаке ко всем вашим ближним атакам в этом раунде. Бонус раунда.',
    descDe: 'Oben: Angriff 3. Füge +3 Angriff hinzu und erhalte 1 EP, falls das Ziel ein Schlüsselobjekt ist.\nUnten: Füge in dieser Runde all deinen Nahkampfangriffen +1 Angriff hinzu. Rundenaktion.' },

  '093': { nameRu: 'Тяжкая ноша', nameDe: 'Schwere Last', initiative: 52, lost: true,

    descRu: 'Верх: Создайте 1 повреждающую ловушку (3 урона) с эффектом СМЯТЕНИЕ на пустой клетке в пределах дальности 3. Огонь. (Потеря)\nНиз: Движение 4. Выберите одного врага на соседней клетке. Если с каждой клеткой, на которую вы передвигались, вы оказывались ближе к этому врагу, то, выбрав этого врага целью, выполните действие Атака X, ОТТОЛКНУТЬ 2. Здесь X — количество клеток, через которые вы передвинулись. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Erzeuge 1 Schadensfalle (3 Schaden) mit VERWIRRUNG auf einem leeren Feld innerhalb Reichweite 3. Feuer. (Verlust)\nUnten: Bewegung 4. Wähle einen Gegner auf einem benachbarten Feld. Falls du mit jedem Feld, über das du dich bewegt hast, näher an diesen Gegner herangekommen bist, führe gegen jenen Gegner Angriff X, STOẞEN 2 aus. X entspricht der Anzahl der Felder, über die du dich bewegt hast. Erhalte 1 EP. (Verlust)' },

  '094': { nameRu: 'Механическое улучшение', nameDe: 'Mechanische Verbesserung', initiative: 33, lost: false,

    descRu: 'Верх: Атака 2, ОГЛУШЕНИЕ.\nНиз: Движение 4. Это действие движения игнорирует эффекты труднопроходимой местности.',
    descDe: 'Oben: Angriff 2, BETÄUBUNG.\nUnten: Bewegung 4. Diese Bewegungsaktion ignoriert die Effekte schwierigen Geländes.' },

  '095': { nameRu: 'Краш-тест', nameDe: 'Crashtest', initiative: 74, lost: true,

    descRu: 'Верх: Во время ваших следующих 4 атак, нацеленных на врагов, находящихся на соседних со стеной клетках, добавляйте +2 к атаке. (Потеря)\nНиз: Движение 3, Прыжок. Каждый раз, когда во время этого движения вы передвигаетесь на клетку с препятствием, уничтожайте его и добавляйте +1 к движению. Земля: все враги на клетках, через которые вы передвинулись во время этого движения, получают по 1 урону. Получите 1 опыт.',
    descDe: 'Oben: Während deiner nächsten 4 Angriffe gegen Gegner auf an Wände angrenzenden Feldern füge +2 Angriff hinzu. (Verlust)\nUnten: Bewegung 3, Sprung. Jedes Mal, wenn du dich während dieser Bewegung auf ein Feld mit einem Hindernis bewegst, zerstöre es und erhalte +1 Bewegung. Erde: Alle Gegner auf Feldern, über die du dich während dieser Bewegung bewegt hast, erleiden je 1 Schaden. Erhalte 1 EP.' },

  '096': { nameRu: 'Зажигательные бомбы', nameDe: 'Brandbomben', initiative: 24, lost: false,

    descRu: 'Верх: Атака 2, Дальность 4, Цели 2. Огонь.\nНиз: Движение 2. Уничтожьте 1 препятствие на соседней клетке. Если уничтожили, то получите 1 опыт и все враги на соседних с уничтоженным препятствием клетках получают по 2 урона.',
    descDe: 'Oben: Angriff 2, Reichweite 4, Ziele 2. Feuer.\nUnten: Bewegung 2. Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 1 EP und alle Gegner auf Feldern benachbart zum zerstörten Hindernis erleiden je 2 Schaden.' },

  '097': { nameRu: 'Некуда бежать', nameDe: 'Kein Entkommen', initiative: 39, lost: true,

    descRu: 'Верх: Атака 4. Добавляйте +1 к атаке за каждую соседнюю с целью клетку, содержащую: стену, препятствие, ключевой объект, фигурку или ловушку. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Передвиньте одну ловушку, находящуюся на соседней клетке, на соседнюю с вами пустую клетку. Земля.',
    descDe: 'Oben: Angriff 4. Füge +1 Angriff für jedes an das Ziel angrenzende Feld hinzu, das eine Wand, ein Hindernis, ein Schlüsselobjekt, eine Figur oder eine Falle enthält. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Bewege eine Falle auf einem benachbarten Feld auf ein leeres, zu dir benachbartes Feld. Erde.' },

  '098': { nameRu: 'Удалённая детонация', nameDe: 'Fernzündung', initiative: 63, lost: true,

    descRu: 'Верх: Уничтожьте 1 препятствие в пределах дальности 4. Если уничтожили, то выполните Атака 2 (цели: все враги на соседних с уничтоженным препятствием клетках). Огонь: +1 к атаке. Получите 1 опыт. (Потеря)\nНиз: Создайте 3 повреждающие ловушки (3 урона) на пустых клетках в пределах дальности 4. Получите 2 опыта. (Потеря)',
    descDe: 'Oben: Zerstöre 1 Hindernis innerhalb Reichweite 4. Falls du eines zerstört hast, führe Angriff 2 aus (Ziele: alle Gegner auf Feldern benachbart zum zerstörten Hindernis). Feuer: +1 Angriff. Erhalte 1 EP. (Verlust)\nUnten: Erzeuge 3 Schadensfallen (3 Schaden) auf leeren Feldern innerhalb Reichweite 4. Erhalte 2 EP. (Verlust)' },

  '099': { nameRu: 'Запас топлива', nameDe: 'Treibstoffreserve', initiative: 17, lost: false,

    descRu: 'Верх: Атака 3. Добавьте эффект +2 к атаке, РАНА и получите 1 опыт, если цель находится на соседней со стеной клетке. Огонь.\nНиз: Движение 5. Огонь: Атака 1.',
    descDe: 'Oben: Angriff 3. Füge +2 Angriff, WUNDE und erhalte 1 EP, falls sich das Ziel auf einem an eine Wand angrenzenden Feld befindet. Feuer.\nUnten: Bewegung 5. Feuer: Angriff 1.' },

  '101': { nameRu: 'Механическая броня', nameDe: 'Mechanische Rüstung', initiative: 80, lost: true,

    descRu: 'Верх: Ваше максимальное количество ОЗ увеличивается на 5. Лечение 10 (на себя). Щит 1. Получите 2 опыта. Бонус раунда. (Потеря)\nНиз: Движение 2. Добыча 1.',
    descDe: 'Oben: Deine maximale Anzahl an LP erhöht sich um 5. Heilung 10 (Selbst). Schild 1. Erhalte 2 EP. Rundenaktion. (Verlust)\nUnten: Bewegung 2. Plündern 1.' },

  '102': { nameRu: 'Пылевое облако', nameDe: 'Staubwolke', initiative: 15, lost: false,

    descRu: 'Верх: Атака 2 (цели: все враги на соседних клетках), ОТТОЛКНУТЬ 1, СМЯТЕНИЕ. Земля.\nНиз: Движение 2. Уничтожьте 1 препятствие на соседней клетке. Если уничтожили, то получите 1 опыт и свойство Щит 2. Бонус раунда.',
    descDe: 'Oben: Angriff 2 (Ziele: alle Gegner auf benachbarten Feldern), STOẞEN 1, VERWIRRUNG. Erde.\nUnten: Bewegung 2. Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 1 EP und Schild 2. Rundenaktion.' },

  '103': { nameRu: 'Буравчик', nameDe: 'Bohrer', initiative: 62, lost: false,

    descRu: 'Верх: Атака 1. Атака 1. Атака 2. Во время этой атаки игнорируйте показатель свойства «Щит» цели, добавьте ОТРАВЛЕНИЕ и получите 1 опыт, если целью всех трёх атак стал один и тот же враг.\nНиз: Движение 2. Положите ваш жетон персонажа на одного обычного или мощного врага, находящегося на соседней клетке. В этом раунде вы вместе со всеми союзниками можете игнорировать показатель свойства «Щит» этого врага. Бонус раунда.',
    descDe: 'Oben: Angriff 1. Angriff 1. Angriff 2. Während dieses Angriffs ignoriere den Schildwert des Ziels, füge GIFT hinzu und erhalte 1 EP, falls alle drei Angriffe denselben Gegner als Ziel hatten.\nUnten: Bewegung 2. Lege deinen Charaktermarker auf einen normalen oder Elite-Gegner auf einem benachbarten Feld. In dieser Runde dürfen du und alle Verbündeten den Schildwert dieses Gegners ignorieren. Rundenaktion.' },

  '104': { nameRu: 'Микроракеты', nameDe: 'Mikroraketen', initiative: 16, lost: false,

    descRu: 'Верх: Атака 2, Дальность 3, Цели 4.\nНиз: Движение 2. Все ключевые объекты в пределах дальности 3 получают по 3 урона. Земля.',
    descDe: 'Oben: Angriff 2, Reichweite 3, Ziele 4.\nUnten: Bewegung 2. Alle Schlüsselobjekte innerhalb Reichweite 3 erleiden je 3 Schaden. Erde.' },

  '105': { nameRu: 'Соль на рану', nameDe: 'Salz in die Wunde', initiative: 64, lost: true,

    descRu: 'Верх: Во время ваших следующих 3 атак, нацеленных на врагов, которых вы атаковали ранее в этом раунде, добавляйте +3 к атаке. (Потеря)\nНиз: Движение 4. В этом раунде добавляйте эффект ПАРАЛИЧ ко всем вашим атакам. Земля: также добавляйте эффект СМЯТЕНИЕ. Получите 1 опыт. Бонус раунда.',
    descDe: 'Oben: Füge deinen nächsten 3 Angriffen gegen Gegner, die du in dieser Runde bereits angegriffen hast, +3 Angriff hinzu. (Verlust)\nUnten: Bewegung 4. Füge in dieser Runde all deinen Angriffen LÄHMUNG hinzu. Erde: Füge außerdem VERWIRRUNG hinzu. Erhalte 1 EP. Rundenaktion.' },

  '106': { nameRu: 'Под дых', nameDe: 'Unter die Gürtellinie', initiative: 26, lost: false,

    descRu: 'Верх: Атака 5. Земля: +1 к атаке, ОТТОЛКНУТЬ 2. Получите 1 опыт. Огонь: +1 к атаке, ПАРАЛИЧ. Получите 1 опыт.\nНиз: Атака 3. ОГЛУШЕНИЕ.',
    descDe: 'Oben: Angriff 5. Erde: +1 Angriff, STOẞEN 2. Erhalte 1 EP. Feuer: +1 Angriff, LÄHMUNG. Erhalte 1 EP.\nUnten: Angriff 3, BETÄUBUNG.' },

  '107': { nameRu: 'Похоронный', nameDe: 'Begräbnis', initiative: 31, lost: true,

    descRu: 'Верх: Атака 4, Дальность 2, целевая область. Огонь. Земля. Получите 2 опыта. Уничтожьте все препятствия в целевой области. Все союзники в целевой области получают по 2 урона. (Потеря)\nНиз: Движение 3. Все враги, находящиеся на клетках, соседних с вами и со стеной, получают по 2 урона.',
    descDe: 'Oben: Angriff 4, Reichweite 2, Zielgebiet. Feuer. Erde. Erhalte 2 EP. Zerstöre alle Hindernisse im Zielgebiet. Alle Verbündeten im Zielgebiet erleiden je 2 Schaden. (Verlust)\nUnten: Bewegung 3. Alle Gegner auf Feldern, die an dich und an eine Wand angrenzen, erleiden je 2 Schaden.' },

  '108': { nameRu: 'Сопутствующий ущерб', nameDe: 'Kollateralschaden', initiative: 15, lost: false,

    descRu: 'Верх: Уничтожьте 1 препятствие или ключевой объект на соседней клетке. Если уничтожили, то выполните Атака 4, ОТТОЛКНУТЬ 2 (цели: все враги на соседних с уничтоженным препятствием или ключевым объектом клетках). Земля: +2 к атаке. Получите 1 опыт.\nНиз: Движение 2. Уничтожьте 1 препятствие на соседней клетке. Если уничтожили, то получите 1 опыт и все враги, находящиеся в одной комнате с уничтоженным препятствием, получают по 2 урона.',
    descDe: 'Oben: Zerstöre 1 Hindernis oder Schlüsselobjekt auf einem benachbarten Feld. Falls du eines zerstört hast, führe Angriff 4, STOẞEN 2 aus (Ziele: alle Gegner auf Feldern benachbart zum zerstörten Hindernis oder Schlüsselobjekt). Erde: +2 Angriff. Erhalte 1 EP.\nUnten: Bewegung 2. Zerstöre 1 Hindernis auf einem benachbarten Feld. Falls du eines zerstört hast, erhalte 1 EP und alle Gegner im selben Raum wie das zerstörte Hindernis erleiden je 2 Schaden.' },

  '109': { nameRu: 'Массовое уничтожение', nameDe: 'Massenvernichtung', initiative: 34, lost: true,

    descRu: 'Верх: Атака 2. Атака 2. Движение 2. Атака 3. Огонь: +1 к атаке, РАНА. (Потеря)\nНиз: Вы можете выполнить действие с уничтожением препятствия, как если бы на пустой клетке в пределах необходимой дальности находилось препятствие. Если выполнили, то не кладите жетон разрушения. Получите 2 опыта. Бонус раунда. (Потеря)',
    descDe: 'Oben: Angriff 2. Angriff 2. Bewegung 2. Angriff 3. Feuer: +1 Angriff, WUNDE. (Verlust)\nUnten: Du darfst eine Aktion zum Zerstören eines Hindernisses so ausführen, als befände sich auf einem leeren Feld innerhalb der erforderlichen Reichweite ein Hindernis. Falls du dies ausführst, lege keinen Zerstörungsmarker ab. Erhalte 2 EP. Rundenaktion. (Verlust)' },

  '151': { nameRu: 'Знаки Пустоты', nameDe: 'Zeichen der Leere', initiative: 15, lost: true,

    descRu: 'Верх: Один союзник в пределах дальности 3 может получить свойство Щит 1. Этот же союзник может выполнить действие Движение 2. Бонус раунда.\nНиз: В начале ваших следующих 5 ходов выполняйте действие «ПРОКЛЯТИЕ, дальность 2». (Потеря)',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 3 darf Schild 1 erhalten. Derselbe Verbündete darf Bewegung 2 ausführen. Rundenaktion.\nUnten: Führe zu Beginn deiner nächsten 5 Züge „FLUCH, Reichweite 2“ aus. (Verlust)' },

  '152': { nameRu: 'На краю бездны', nameDe: 'Am Rand des Abgrunds', initiative: 72, lost: false,

    descRu: 'Верх: Лечение 2, Дальность 2, Цели 2. Все союзники, которые снимают состояние ОТРАВЛЕНИЕ этим действием лечения, получают БЛАГОСЛОВЕНИЕ.\nНиз: Заставьте всех врагов в пределах дальности 3 выполнить под вашим управлением действие Движение 1.',
    descDe: 'Oben: Heilung 2, Reichweite 2, Ziele 2. Alle Verbündeten, bei denen durch diese Heilung GIFT entfernt wird, erhalten SEGEN.\nUnten: Lass alle Gegner innerhalb Reichweite 3 unter deiner Kontrolle Bewegung 1 ausführen.' },

  '153': { nameRu: 'Дар Пустоты', nameDe: 'Gabe der Leere', initiative: 89, lost: false,

    descRu: 'Верх: ОТРАВЛЕНИЕ. Тьма. Дальность 3. Один союзник на соседней клетке может выполнить действие Атака 3, Дальность 4, выбрав целью врага, к которому применили эффект ОТРАВЛЕНИЕ этой способности. Выполнив эту атаку, союзник получает 2 урона.\nНиз: Лечение 2, Дальность 3.',
    descDe: 'Oben: GIFT. Dunkelheit. Reichweite 3. Ein Verbündeter auf einem benachbarten Feld darf Angriff 3, Reichweite 4 gegen den Gegner ausführen, auf den durch diese Fähigkeit GIFT angewendet wurde. Führt der Verbündete diesen Angriff aus, erleidet er 2 Schaden.\nUnten: Heilung 2, Reichweite 3.' },

  '154': { nameRu: 'Чёрная милость', nameDe: 'Schwarze Gnade', initiative: 43, lost: false,
    descRu: 'Верх: Лечение 5, Дальность 3, ОТРАВЛЕНИЕ. Тьма.\nНиз: Движение 2. Один союзник в пределах дальности 3 может выполнить действие Движение 2.',
    descDe: 'Oben: Heilung 5, Reichweite 3, GIFT. Dunkelheit.\nUnten: Bewegung 2. Ein Verbündeter innerhalb Reichweite 3 darf Bewegung 2 ausführen.' },

  '143': { nameRu: 'Чёрная милость', nameDe: 'Schwarze Gnade', initiative: 43, lost: false,
    descRu: 'Верх: Лечение 3, Дальность 3. Вы или один ваш союзник в пределах 3 клеток восстанавливаете себе 3 очка здоровья.\nНиз: Движение 4. Передвиньтесь по полю на 4 клетки или меньше.',
    descDe: 'Oben: Heilung 3, Reichweite 3. Du oder ein Verbündeter innerhalb Reichweite 3 stellt 3 Lebenspunkte wieder her.\nUnten: Bewegung 4. Bewege dich 4 Felder oder weniger.' },

  '144': { nameRu: 'Погасить свет', nameDe: 'Das Licht löschen', initiative: 49, lost: false,
    descRu: 'Верх: Атака 3, Дальность 3. Один враг в пределах 3 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Заставьте одного врага в пределах дальности 3 выполнить под вашим управлением действие Атака 2 (цель: другой враг, находящийся на соседней с этим врагом клетке). Для этой атаки используется колода модификаторов атаки монстров.',
    descDe: 'Oben: Angriff 3, Reichweite 3. Ein Gegner innerhalb Reichweite 3 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Lass einen Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 2 ausführen (Ziel: ein anderer Gegner auf einem zu diesem Gegner benachbarten Feld). Für diesen Angriff wird das Angriffsmodifikatordeck der Monster verwendet.' },

  '145': { nameRu: 'Нечестивая царапина', nameDe: 'Unheiliger Kratzer', initiative: 68, lost: false,
    descRu: 'Верх: Один союзник в пределах дальности 2 может выполнить действие Атака 4. Для этой атаки используется колода модификаторов атаки союзника.\nНиз: Движение 2. УСИЛЕНИЕ, Дальность 3. Передвиньтесь по полю на 2 клетки или меньше. Затем до конца своего следующего хода вы или один ваш союзник в пределах 3 клеток проводите все свои атаки с преимуществом.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 2 darf Angriff 4 ausführen. Für diesen Angriff wird das Angriffsmodifikatordeck des Verbündeten verwendet.\nUnten: Bewegung 2. STÄRKUNG, Reichweite 3. Bewege dich 2 Felder oder weniger. Bis zum Ende deines nächsten Zuges werden alle Angriffe von dir oder einem Verbündeten innerhalb Reichweite 3 mit Vorteil ausgeführt.' },

  '146': { nameRu: 'Внушение', nameDe: 'Einflüsterung', initiative: 23, lost: false,
    descRu: 'Верх: Заставьте одного врага в пределах дальности 3 выполнить под вашим управлением действие Атака 3 (цель: другой враг, находящийся на соседней с этим врагом клетке). Для этой атаки используется колода модификаторов атаки монстров.\nНиз: Движение 3. СМЯТЕНИЕ, Дальность 3. Передвиньтесь по полю на 3 клетки или меньше. Затем до конца своего следующего хода один враг в пределах 3 клеток проводит все свои атаки с затруднением.',
    descDe: 'Oben: Lass einen Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 3 ausführen (Ziel: ein anderer Gegner auf einem zu diesem Gegner benachbarten Feld). Für diesen Angriff wird das Angriffsmodifikatordeck der Monster verwendet.\nUnten: Bewegung 3. VERWIRRUNG, Reichweite 3. Bewege dich 3 Felder oder weniger. Bis zum Ende deines nächsten Zuges führt ein Gegner innerhalb Reichweite 3 alle seine Angriffe mit Nachteil aus.' },

  '147': { nameRu: 'Дар Пустоты', nameDe: 'Gabe der Leere', initiative: 89, lost: false,
    descRu: 'Верх: Один союзник в пределах дальности 3 может выполнить действие Атака 2, Дальность 3. Для этой атаки используется колода модификаторов атаки союзника.\nНиз: Лечение 2, Дальность 3. Вы или один ваш союзник в пределах 3 клеток восстанавливаете себе 2 очка здоровья.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 2, Reichweite 3 ausführen. Für diesen Angriff wird das Angriffsmodifikatordeck des Verbündeten verwendet.\nUnten: Heilung 2, Reichweite 3. Du oder ein Verbündeter innerhalb Reichweite 3 stellt 2 Lebenspunkte wieder her.' },

  '148': { nameRu: 'Соблазн Пустоты', nameDe: 'Verlockung der Leere', initiative: 67, lost: false,
    descRu: 'Верх: ОГЛУШЕНИЕ, Дальность 3. До конца своего следующего хода один враг в пределах 3 клеток не может выполнять никакие действия.\nНиз: Один союзник в пределах дальности 3 может выполнить действие Атака 3. Если выполнил, он получает 1 урон. Для этой атаки используется колода модификаторов атаки союзника.',
    descDe: 'Oben: BETÄUBUNG, Reichweite 3. Bis zum Ende seines nächsten Zuges kann ein Gegner innerhalb Reichweite 3 keine Aktionen ausführen.\nUnten: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 3 ausführen. Falls er dies tut, erleidet er 1 Schaden. Für diesen Angriff wird das Angriffsmodifikatordeck des Verbündeten verwendet.' },

  '149': { nameRu: 'Соблазн Пустоты', nameDe: 'Verlockung der Leere', initiative: 67, lost: true,
    descRu: 'Верх: РАЗОРУЖЕНИЕ, Дальность 3. До конца своего следующего хода один враг в пределах 3 клеток не может выполнять действия атаки. Заставьте цель выполнить под вашим управлением действие Движение 2.\nНиз: Один союзник в пределах дальности 3 может выполнить действие Атака 6. Если выполнил, он получает 2 урона. Для этой атаки используется колода модификаторов атаки союзника. Затем положите эту карту в стопку «Потери».',
    descDe: 'Oben: ENTWAFFNUNG, Reichweite 3. Bis zum Ende seines nächsten Zuges kann ein Gegner innerhalb Reichweite 3 keine Angriffsaktionen ausführen. Lass das Ziel unter deiner Kontrolle Bewegung 2 ausführen.\nUnten: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 6 ausführen. Falls er dies tut, erleidet er 2 Schaden. Für diesen Angriff wird das Angriffsmodifikatordeck des Verbündeten verwendet. Lege diese Karte danach auf den Ablagestapel „Verloren“.' },

  '150': { nameRu: 'Нечестивая царапина', nameDe: 'Unheiliger Kratzer', initiative: 68, lost: false,
    descRu: 'Верх: Один союзник в пределах дальности 2 может выполнить действие Атака 4. Для этой атаки используется колода модификаторов атаки союзника.\nНиз: Добыча 1. УСИЛЕНИЕ, Дальность 3. Подберите все монеты и жетоны сокровищ на вашей и соседних с вами клетках. Затем до конца своего следующего хода вы или один ваш союзник в пределах 3 клеток проводите все свои атаки с преимуществом.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 2 darf Angriff 4 ausführen. Für diesen Angriff wird das Angriffsmodifikatordeck des Verbündeten verwendet.\nUnten: Plündern 1. STÄRKUNG, Reichweite 3. Hebe alle Münzen und Schatzmarker auf deinem Feld und auf benachbarten Feldern auf. Bis zum Ende deines nächsten Zuges werden alle Angriffe von dir oder einem Verbündeten innerhalb Reichweite 3 mit Vorteil ausgeführt.' },

  '155': { nameRu: 'Заморозить душу', nameDe: 'Seele einfrieren', initiative: 58, lost: false,
    descRu: 'Верх: Атака 3. ОТРАВЛЕНИЕ. Лёд: +1 к атаке, СМЯТЕНИЕ. Получите 1 опыт.\nНиз: ОГЛУШЕНИЕ, Дальность 3. Тьма. ПРОКЛЯТИЕ (на себя). Вместо этого игнорируйте ПРОКЛЯТИЕ.',
    descDe: 'Oben: Angriff 3. GIFT. Eis: +1 Angriff, VERWIRRUNG. Erhalte 1 EP.\nUnten: BETÄUBUNG, Reichweite 3. Dunkelheit. FLUCH (auf dich). Stattdessen ignoriere den FLUCH.' },

  '156': { nameRu: 'Нечестивая царапина', nameDe: 'Unheiliger Kratzer', initiative: 68, lost: false,
    descRu: 'Верх: Один союзник в пределах дальности 2 может выполнить действие Атака 3. Тьма. Получите 1 опыт.\nНиз: Добыча 1. УСИЛЕНИЕ, Дальность 3.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 2 darf Angriff 3 ausführen. Dunkelheit. Erhalte 1 EP.\nUnten: Plündern 1. STÄRKUNG, Reichweite 3.' },

  '157': { nameRu: 'Погасить свет', nameDe: 'Das Licht löschen', initiative: 49, lost: true,
    descRu: 'Верх: Атака 2, Дальность 3. Тьма: +1 к атаке, ПРОКЛЯТИЕ. Получите 1 опыт.\nНиз: Заставьте одного врага в пределах дальности 3 выполнить под вашим управлением действие Атака 3, Дальность 3. Управляемый враг получает урон, равный урону, полученному целью. Лёд. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Angriff 2, Reichweite 3. Dunkelheit: +1 Angriff, FLUCH. Erhalte 1 EP.\nUnten: Lass einen Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 3, Reichweite 3 ausführen. Der kontrollierte Gegner erleidet Schaden in Höhe des Schadens, den das Ziel erleidet. Eis. Erhalte 1 EP. (Verlust)' },

  '158': { nameRu: 'Соблазн Пустоты', nameDe: 'Verlockung der Leere', initiative: 67, lost: true,
    descRu: 'Верх: РАЗОРУЖЕНИЕ, Дальность 3. Заставьте цель выполнить под вашим управлением действие Движение 1. Тьма: +2 к движению. Получите 1 опыт.\nНиз: Один союзник в пределах дальности 3 может выполнить действие Атака 5. Тьма: +2 к атаке. Получите 1 опыт. Если выполнил, то вы получаете 1, а союзник получает 2 урона. (Потеря)',
    descDe: 'Oben: ENTWAFFNUNG, Reichweite 3. Lass das Ziel unter deiner Kontrolle Bewegung 1 ausführen. Dunkelheit: +2 Bewegung. Erhalte 1 EP.\nUnten: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 5 ausführen. Dunkelheit: +2 Angriff. Erhalte 1 EP. Falls er dies tut, erhältst du 1, und der Verbündete erleidet 2 Schaden. (Verlust)' },

  '159': { nameRu: 'Хватка судьбы', nameDe: 'Schicksalsgriff', initiative: 36, lost: true,
    descRu: 'Верх: Атака 2. ОТРАВЛЕНИЕ. РАНА. ПРОКЛЯТИЕ. ОГЛУШЕНИЕ. Лёд. Тьма. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Тьма: +2 к движению.',
    descDe: 'Oben: Angriff 2. GIFT. WUNDE. FLUCH. BETÄUBUNG. Eis. Dunkelheit. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Dunkelheit: +2 Bewegung.' },

  '160': { nameRu: 'Мастерское влияние', nameDe: 'Meisterlicher Einfluss', initiative: 83, lost: true,
    descRu: 'Верх: Первая атака каждой предоставляемой вами способности атаки получает преимущество. Вы можете использовать Свет, чтобы добавить +1 к этой атаке. Кроме того, когда вы предоставляете атаку монстрам, они используют вашу колоду модификаторов атаки. Получите 2 опыта. Бонус раунда. (Потеря)\nНиз: БЛАГОСЛОВЕНИЕ, Дальность 2. ОТРАВЛЕНИЕ, Дальность 2. Лёд.',
    descDe: 'Oben: Die erste Attacke jeder von dir gewährten Angriffsaktion erhält Vorteil. Du kannst Licht verwenden, um +1 zu diesem Angriff hinzuzufügen. Außerdem verwenden Monster, wenn du ihnen einen Angriff gewährst, dein Angriffsmodifikatordeck. Erhalte 2 EP. Rundenaktion. (Verlust)\nUnten: SEGEN, Reichweite 2. GIFT, Reichweite 2. Eis.' },

  '161': { nameRu: 'Внушение', nameDe: 'Einflüsterung', initiative: 23, lost: true,
    descRu: 'Верх: Заставьте одного врага в пределах дальности 4 выполнить под вашим управлением действия Движение 3, Атака 3 (цель: другой враг, находящийся на соседней с этим врагом клетке). Лёд: управляемый враг получает состояние ОГЛУШЕНИЕ. Получите 2 опыта. (Потеря)\nНиз: Движение 3. Тьма: ПРОКЛЯТИЕ, Дальность 3.',
    descDe: 'Oben: Lass einen Gegner innerhalb Reichweite 4 unter deiner Kontrolle Bewegung 3, Angriff 3 ausführen (Ziel: ein anderer Gegner auf einem zu diesem Gegner benachbarten Feld). Eis: Der kontrollierte Gegner erhält den Zustand BETÄUBUNG. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 3. Dunkelheit: FLUCH, Reichweite 3.' },

  '162': { nameRu: 'Ввести в ярость', nameDe: 'In Rage versetzen', initiative: 26, lost: true,
    descRu: 'Верх: Заставьте всех врагов в пределах дальности 3 выполнить под вашим управлением действие Атака 2 (цели: все враги на соседних с управляемыми врагами клетках). Получите 2 опыта. (Потеря)\nНиз: Движение 4. Тьма: -1 к движению. Получите 1 опыт. Атака 2.',
    descDe: 'Oben: Lass alle Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 2 ausführen (Ziel: alle Gegner auf Feldern, die an die kontrollierten Gegner angrenzen). Erhalte 2 EP. (Verlust)\nUnten: Bewegung 4. Dunkelheit: -1 Bewegung. Erhalte 1 EP. Angriff 2.' },

  '163': { nameRu: 'Ледяное объятие', nameDe: 'Eisige Umarmung', initiative: 71, lost: true,
    descRu: 'Верх: ПРОКЛЯТИЕ. Дальность 3. Цели 3. Тьма: +1 к дальности, +1 к целям. Получите 1 опыт. (Потеря)\nНиз: Лёд: Движение 3. Все союзники на соседних клетках получают по 1 урону. БЛАГОСЛОВЕНИЕ (на всех союзников на соседних клетках).',
    descDe: 'Oben: FLUCH. Reichweite 3. Ziele 3. Dunkelheit: +1 Reichweite, +1 Ziel. Erhalte 1 EP. (Verlust)\nUnten: Eis: Bewegung 3. Alle Verbündeten auf benachbarten Feldern erleiden je 1 Schaden. SEGEN (für alle Verbündeten auf benachbarten Feldern).' },

  '164': { nameRu: 'Тёплая живица', nameDe: 'Warmes Harz', initiative: 59, lost: true,
    descRu: 'Верх: ОТРАВЛЕНИЕ, Дальность 3. Тьма. В следующих 3 случаях, когда союзник атакует врага, находящегося в состоянии «ОТРАВЛЕНИЕ», этот союзник может выполнить действие «Лечение 1 (на себя)».\nНиз: Движение 2. Лечение 3 (на себя и всех союзников в пределах дальности 2). Лёд. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: GIFT, Reichweite 3. Dunkelheit. In den nächsten 3 Fällen, in denen ein Verbündeter einen Gegner angreift, der unter GIFT steht, darf dieser Verbündete die Aktion HEILUNG 1 (auf sich selbst) ausführen.\nUnten: Bewegung 2. Heilung 3 (auf dich und alle Verbündeten innerhalb Reichweite 2). Eis. Erhalte 1 EP. (Verlust)' },

  '165': { nameRu: 'Компромисс', nameDe: 'Kompromiss', initiative: 21, lost: true,
    descRu: 'Верх: ОТРАВЛЕНИЕ (на себя или одного союзника в пределах дальности 2). Тьма. БЛАГОСЛОВЕНИЕ. УСИЛЕНИЕ (цель: другой союзник в пределах дальности 3).\nНиз: Движение 4. Прыжок. ПРОКЛЯТИЕ (на всех врагов на клетках, через которые вы передвинулись). Огонь. Лёд. Получите 1 опыт. (Потеря)',
    descDe: 'Oben: GIFT (auf dich oder einen Verbündeten innerhalb Reichweite 2). Dunkelheit. SEGEN. STÄRKUNG (Ziel: ein anderer Verbündeter innerhalb Reichweite 3).\nUnten: Bewegung 4. Sprung. FLUCH (auf alle Gegner auf den Feldern, über die du dich bewegt hast). Feuer. Eis. Erhalte 1 EP. (Verlust)' },

  '166': { nameRu: 'Сокрушительный холод', nameDe: 'Zermalmende Kälte', initiative: 86, lost: true,
    descRu: 'Верх: Один союзник в пределах дальности 3 может выполнить действие Атака 4, Цели 2. Лёд: СМЯТЕНИЕ. Получите 1 опыт. (Потеря)\nНиз: Движение 3. СМЯТЕНИЕ, Дальность 3. Лёд.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 4, Ziele 2 ausführen. Eis: VERWIRRUNG. Erhalte 1 EP. (Verlust)\nUnten: Bewegung 3. VERWIRRUNG, Reichweite 3. Eis.' },

  '167': { nameRu: 'Насмешка судьбы', nameDe: 'Spott des Schicksals', initiative: 13, lost: false,
    descRu: 'Верх: Лечение 6, Дальность 2. Замешайте в колоду модификаторов атаки монстров одну карту «БЛАГОСЛОВЕНИЕ». Получите 1 опыт.\nНиз: В следующий раз, когда вы предоставляете способность атаки в этом раунде, добавляйте +1 к атакам этой способности. Лёд: вместо этого добавляйте +2 к атакам. В этом раунде все атаки, нацеленные на вас, добавляют +2 к атаке. Эта карта не может быть сброшена до конца этого раунда. Бонус раунда.',
    descDe: 'Oben: Heilung 6, Reichweite 2. Mische 1 Karte SEGEN in das Angriffsmodifikatordeck der Monster. Erhalte 1 EP.\nUnten: Wenn du in dieser Runde das nächste Mal eine Angriffsaktion gewährst, füge allen Angriffen dieser Aktion +1 Angriff hinzu. Eis: Füge stattdessen +2 Angriff hinzu. In dieser Runde erhalten alle auf dich zielenden Angriffe +2 Angriff. Diese Karte kann bis zum Ende dieser Runde nicht abgelegt werden. Rundenaktion.' },

  '168': { nameRu: 'Авторитет командира', nameDe: 'Befehlsgewalt', initiative: 75, lost: true,
    descRu: 'Верх: В начале ваших следующих 5 ходов один союзник в пределах дальности 3 может выполнить действие Атака 2. (Потеря)\nНиз: Движение 4. ПРОКЛЯТИЕ (на себя). Вместо этого игнорируйте ПРОКЛЯТИЕ. Один союзник в пределах дальности 3 может выполнить действие Движение 3.',
    descDe: 'Oben: Zu Beginn deiner nächsten 5 Züge darf ein Verbündeter innerhalb Reichweite 3 Angriff 2 ausführen. (Verlust)\nUnten: Bewegung 4. FLUCH (auf dich). Ignoriere stattdessen den FLUCH. Ein Verbündeter innerhalb Reichweite 3 darf Bewegung 3 ausführen.' },

  '169': { nameRu: 'Дикие инстинкты', nameDe: 'Wilde Instinkte', initiative: 51, lost: true,
    descRu: 'Верх: Заставьте одного врага в пределах дальности 3 выполнить под вашим управлением действие Атака 3 (цели: все другие враги, находящиеся на соседних с этим врагом клетках). Управляемый враг получает по 1 урону за каждого врага, ставшего его целью. Получите 2 опыта. (Потеря)\nНиз: Лечение 3, Дальность 3. УСИЛЕНИЕ. ОТРАВЛЕНИЕ. Лёд: БЛАГОСЛОВЕНИЕ.',
    descDe: 'Oben: Lass einen Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 3 ausführen (Ziele: alle anderen Gegner auf benachbarten Feldern zu diesem Gegner). Der kontrollierte Gegner erleidet 1 Schaden für jeden Gegner, der Ziel dieses Angriffs wurde. Erhalte 2 EP. (Verlust)\nUnten: Heilung 3, Reichweite 3. STÄRKUNG. GIFT. Eis: SEGEN.' },

  '170': { nameRu: 'В последний путь', nameDe: 'Auf den letzten Weg', initiative: 38, lost: true,
    descRu: 'Верх: Атака 4, Дальность 3. ПРОКЛЯТИЕ. Тьма.\nНиз: Движение 4. Заставьте одного врага на соседней клетке выполнить под вашим управлением действие Движение 3. Этот враг получает состояние «ПАРАЛИЧ».',
    descRu: 'Верх: Атака 4, Дальность 3. ПРОКЛЯТИЕ. Тьма.\nНиз: Движение 4. Заставьте одного врага на соседней клетке выполнить под вашим управлением действие Движение 3. Этот враг получает состояние «ПАРАЛИЧ». Получите 1 опыт. (Потеря)',
    descDe: 'Oben: Angriff 4, Reichweite 3. FLUCH. Dunkelheit.\nUnten: Bewegung 4. Lass einen Gegner auf einem benachbarten Feld unter deiner Kontrolle Bewegung 3 ausführen. Dieser Gegner erhält LÄHMUNG. Erhalte 1 EP. (Verlust)' },

  '172': { nameRu: 'Выстоять', nameDe: 'Standhalten', initiative: 90, lost: true,
    descRu: 'Верх: Положите оберег на соседнюю пустую клетку. Он считается препятствием. Все враги, которые передвигаются на соседнюю с оберегом клетку, получают состояние «ОТРАВЛЕНИЕ». Все враги в пределах дальности 3 от оберега проводят атаки с затруднением (кроме атак, предоставляемых вами). Земля. Получите 2 опыта. (Потеря)\nНиз: Один союзник в пределах дальности 3 может выполнить действие Атака 3, Дальность 3 (цель: враг по вашему выбору).',
    descDe: 'Oben: Lege einen Schutzzauber auf ein benachbartes leeres Feld. Er gilt als Hindernis. Alle Gegner, die sich auf ein zum Schutzzauber benachbartes Feld bewegen, erhalten GIFT. Alle Gegner innerhalb Reichweite 3 vom Schutzzauber führen ihre Angriffe mit Nachteil aus (außer von dir gewährte Angriffe). Erde. Erhalte 2 EP. (Verlust)\nUnten: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 3, Reichweite 3 ausführen (Ziel: ein Gegner deiner Wahl).' },

  '173': { nameRu: 'Иссушающий приговор', nameDe: 'Auszehrendes Urteil', initiative: 44, lost: true,
    descRu: 'Верх: Один или два союзника в пределах дальности 2 могут получить по 2 урона. Каждый союзник, который получил урон, может выполнить действие Атака 6, Дальность 3. Получите 2 опыта. (Потеря)\nНиз: ПРОКЛЯТИЕ (на себя). Тьма: вместо этого игнорируйте ПРОКЛЯТИЕ. ПРОКЛЯТИЕ, Дальность 4, Цели 2.',
    descDe: 'Oben: Ein oder zwei Verbündete innerhalb Reichweite 2 dürfen jeweils 2 Schaden erleiden. Jeder Verbündete, der Schaden erlitten hat, darf Angriff 6, Reichweite 3 ausführen. Erhalte 2 EP. (Verlust)\nUnten: FLUCH (auf dich). Dunkelheit: Ignoriere stattdessen den FLUCH. FLUCH, Reichweite 4, Ziele 2.' },

  '174': { nameRu: 'Поток энергии', nameDe: 'Energiestrom', initiative: 81, lost: true,
    descRu: 'Верх: Вылечите весь урон одного союзника в пределах дальности 3. Если вылечили, то этот союзник получает состояние «СМЯТЕНИЕ». Тьма. Получите 2 опыта. (Потеря)\nНиз: Каждый раз, когда вы или ваш союзник снимаете состояние «ОТРАВЛЕНИЕ», эта фигурка получает «УСИЛЕНИЕ». Получите 2 опыта. (Потеря)',
    descDe: 'Oben: Heile den gesamten Schaden eines Verbündeten innerhalb Reichweite 3. Falls du ihn geheilt hast, erhält dieser Verbündete VERWIRRUNG. Dunkelheit. Erhalte 2 EP. (Verlust)\nUnten: Jedes Mal, wenn du oder ein Verbündeter GIFT entfernt, erhält diese Figur STÄRKUNG. Erhalte 2 EP. (Verlust)' },

  '175': { nameRu: 'Взрыв ненависти', nameDe: 'Ausbruch des Hasses', initiative: 29, lost: true,
    descRu: 'Верх: Атака 5, Дальность 3. СМЯТЕНИЕ. Тьма: РАНА. Получите 1 опыт.\nНиз: Заставьте одного врага в пределах дальности 3 выполнить действие Атака 2, Дальность 2, РАНА. Тьма: +1 к дальности (цели: 3 врага по вашему выбору). Получите 2 опыта. (Потеря)',
    descDe: 'Oben: Angriff 5, Reichweite 3. VERWIRRUNG. Dunkelheit: WUNDE. Erhalte 1 EP.\nUnten: Lass einen Gegner innerhalb Reichweite 3 unter deiner Kontrolle Angriff 2, Reichweite 2, WUNDE ausführen. Dunkelheit: +1 Reichweite (Ziele: 3 Gegner deiner Wahl). Erhalte 2 EP. (Verlust)' },

  '176': { nameRu: 'Духовный голод', nameDe: 'Seelenhunger', initiative: 68, lost: true,
    descRu: 'Верх: Один союзник в пределах дальности 2 может выполнить действие Атака 5. Если выполнил, то этот союзник может выполнить ещё действие Лечение X. Здесь X — количество полученного целью атаки урона. Получите 2 опыта. (Потеря)\nНиз: Движение 4. Лечение 2, Дальность 2. Лёд: +1 к лечению, +1 к дальности.',
    descDe: 'Oben: Ein Verbündeter innerhalb Reichweite 2 darf Angriff 5 ausführen. Falls er dies tut, darf jener Verbündete zusätzlich Heilung X ausführen. X ist die Höhe des Schadens, den das Ziel des Angriffs erlitten hat. Erhalte 2 EP. (Verlust)\nUnten: Bewegung 4. Heilung 2, Reichweite 2. Eis: +1 Heilung, +1 Reichweite.' },

  '177': { nameRu: 'Затишье в забвении', nameDe: 'Stille im Vergessen', initiative: 11, lost: true,
    descRu: 'Верх: ОГЛУШЕНИЕ + ПРОКЛЯТИЕ, Дальность 3, Цели 2. Если эта карта сброшена до конца раунда или любая цель получила урон в этом раунде, обе цели снимают состояние ОГЛУШЕНИЕ. Тьма. Бонус раунда.\nНиз: Вы вместе со всеми союзниками в пределах дальности 2 можете выполнить действие Движение 3. Тьма: +1 к движению. Получите 1 опыт.',
    descDe: 'Oben: BETÄUBUNG + FLUCH, Reichweite 3, Ziele 2. Falls diese Karte vor Ende der Runde abgelegt wird oder eines der Ziele in dieser Runde Schaden erleidet, entfernen beide Ziele BETÄUBUNG. Dunkelheit. Rundenaktion.\nUnten: Du und alle Verbündeten innerhalb Reichweite 2 dürfen Bewegung 3 ausführen. Dunkelheit: +1 Bewegung. Erhalte 1 EP.' },

  '178': { nameRu: 'Обличающая связь', nameDe: 'Enthüllende Verbindung', initiative: 59, lost: true,
    descRu: 'Верх: Во время ваших следующих 3 действий лечения, когда это возможно, добавляйте целью одного дополнительного союзника. (Потеря)\nНиз: Движение 2. БЛАГОСЛОВЕНИЕ (на себя и всех союзников на соседних клетках). Лёд.',
    descDe: 'Oben: Füge deinen nächsten 3 Heilaktionen, wenn möglich, jeweils einen zusätzlichen Verbündeten als Ziel hinzu. (Verlust)\nUnten: Bewegung 2. SEGEN (auf dich und alle Verbündeten auf benachbarten Feldern). Eis.' },

  '179': { nameRu: 'Око Пустоты', nameDe: 'Auge der Leere', initiative: 19, lost: true,
    descRu: 'Верх: ОТРАВЛЕНИЕ, Дальность 4. Тьма. Заставьте всех других врагов в пределах дальности 3 выполнить действие Атака 2, Дальность 3 (цель: враг, к которому применили эффект «ОТРАВЛЕНИЕ» этой способности). Получите 2 опыта. (Потеря)\nНиз: Движение 2. Все союзники и враги в пределах дальности 3 получают по 1 урону. УСИЛЕНИЕ (цели: все союзники в пределах дальности 3).',
    descDe: 'Oben: GIFT, Reichweite 4. Dunkelheit. Lass alle anderen Gegner innerhalb Reichweite 3 Angriff 2, Reichweite 3 ausführen (Ziel: der Gegner, auf den durch diese Fähigkeit GIFT angewendet wurde). Erhalte 2 EP. (Verlust)\nUnten: Bewegung 2. Alle Verbündeten und Gegner innerhalb Reichweite 3 erleiden je 1 Schaden. STÄRKUNG (Ziele: alle Verbündeten innerhalb Reichweite 3).' },

  '180': { nameRu: 'Одержимость судьбой', nameDe: 'Besessenheit vom Schicksal', initiative: 66, lost: true,
    descRu: 'Верх: Атака 2, Дальность 2, Цели 3. ОТРАВЛЕНИЕ. РАНА. Тьма: ПРОКЛЯТИЕ. Получите 1 опыт.\nНиз: Один союзник в пределах дальности 3 может выполнить действие Атака 8, Дальность 3. Лёд: ОГЛУШЕНИЕ. Получите 1 опыт. Если выполнил, то вы получаете 1 урон, а этот союзник получает состояние «ОТРАВЛЕНИЕ». (Потеря)',
    descDe: 'Oben: Angriff 2, Reichweite 2, Ziele 3. GIFT. WUNDE. Dunkelheit: FLUCH. Erhalte 1 EP.\nUnten: Ein Verbündeter innerhalb Reichweite 3 darf Angriff 8, Reichweite 3 ausführen. Eis: BETÄUBUNG. Erhalte 1 EP. Falls er dies tut, erleidest du 1 Schaden und jener Verbündete erhält GIFT. (Verlust)' },

  '216': { nameRu: 'Пылающий серп', nameDe: 'Flammende Sichel', initiative: 63, lost: false,
    descRu: 'Верх: Атака 3, Дальность 2. Один враг в пределах 2 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением).\nНиз: Атака 2. Один враг на соседней клетке получает 2 урона (примените эффект карты модификатора атаки).',
    descDe: 'Oben: Angriff 3, Reichweite 2. Ein Gegner innerhalb Reichweite 2 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt).\nUnten: Angriff 2. Ein Gegner auf einem benachbarten Feld erleidet 2 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an).' },

  '217': { nameRu: 'Ослепляющий серп', nameDe: 'Blendende Sichel', initiative: 87, lost: false,
    descRu: 'Верх: Атака 2, Дальность 2. ПАРАЛИЧ. Один враг в пределах 2 клеток получает 2 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением). До конца своего следующего хода этот враг не может выполнять действия движения.\nНиз: Движение 4. Передвиньтесь по полю на 4 клетки или меньше.',
    descDe: 'Oben: Angriff 2, Reichweite 2. LÄHMUNG. Ein Gegner innerhalb Reichweite 2 erleidet 2 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt). Bis zum Ende seines nächsten Zuges kann jener Gegner keine Bewegungsaktionen ausführen.\nUnten: Bewegung 4. Bewege dich 4 Felder oder weniger.' },

  '218': { nameRu: 'Вихревые удары', nameDe: 'Wirbelnde Schläge', initiative: 38, lost: false,
    descRu: 'Верх: Атака 2 (цели: все враги на соседних клетках). Все враги на соседних клетках получают по 2 урона (вытяните отдельную карту модификатора атаки для каждой цели).\nНиз: Атака 2. Один враг на соседней клетке получает 2 урона (примените эффект карты модификатора атаки).',
    descDe: 'Oben: Angriff 2 (Ziele: alle Gegner auf benachbarten Feldern). Alle Gegner auf benachbarten Feldern erleiden je 2 Schaden (ziehe für jedes Ziel eine eigene Angriffsmodifikatorkarte).\nUnten: Angriff 2. Ein Gegner auf einem benachbarten Feld erleidet 2 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an).' },

  '219': { nameRu: 'Шокирующее наступление', nameDe: 'Schockierender Vorstoß', initiative: 14, lost: false,
    descRu: 'Верх: Атака 3. ПАРАЛИЧ. Один враг на соседней клетке получает 3 урона (примените эффект карты модификатора атаки). До конца своего следующего хода этот враг не может выполнять действия движения.\nНиз: Движение 3. Передвиньтесь по полю на 3 клетки или меньше.',
    descDe: 'Oben: Angriff 3, LÄHMUNG. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an). Bis zum Ende seines nächsten Zuges kann jener Gegner keine Bewegungsaktionen ausführen.\nUnten: Bewegung 3. Bewege dich 3 Felder oder weniger.' },

  '220': { nameRu: 'Пустынная ночь', nameDe: 'Wüstennacht', initiative: 90, lost: false,
    descRu: 'Верх: Атака 3. СМЯТЕНИЕ. Один враг на соседней клетке получает 3 урона (примените эффект карты модификатора атаки). До конца своего следующего хода этот враг проводит все свои атаки с затруднением.\nНиз: Движение 4. Передвиньтесь по полю на 4 клетки или меньше.',
    descDe: 'Oben: Angriff 3, VERWIRRUNG. Ein Gegner auf einem benachbarten Feld erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an). Bis zum Ende seines nächsten Zuges führt jener Gegner alle seine Angriffe mit Nachteil aus.\nUnten: Bewegung 4. Bewege dich 4 Felder oder weniger.' },

  '221': { nameRu: 'Шипованный щит', nameDe: 'Dornenwall', initiative: 41, lost: false,
    descRu: 'Верх: Один или два врага на соседних клетках получают по 2 урона. Для нанесения этого урона не вытягивайте карты модификаторов атаки.\nНиз: Лечение 2, Дальность 2. Вы или один ваш союзник в пределах 2 клеток восстанавливает себе 2 очка здоровья.',
    descDe: 'Oben: Ein oder zwei Gegner auf benachbarten Feldern erleiden je 2 Schaden. Für diesen Schaden ziehe keine Angriffsmodifikatorkarten.\nUnten: Heilung 2, Reichweite 2. Du oder ein Verbündeter innerhalb Reichweite 2 stellt 2 Lebenspunkte wieder her.' },

  '222': { nameRu: 'Пустынная ночь', nameDe: 'Wüstennacht', initiative: 90, lost: false,
    descRu: 'Верх: Атака 2 (цель: враг в пределах двух клеток от вас). РАЗОРУЖЕНИЕ. Один враг в пределах 2 клеток получает 2 урона (примените эффект карты модификатора атаки). До конца своего следующего хода этот враг не может выполнять действия атаки.\nНиз: Движение 6. Прыжок. Передвиньтесь по полю на 6 клеток или меньше. Затем положите эту карту в стопку «Потери».',
    descDe: 'Oben: Angriff 2 (Ziel: ein Gegner innerhalb Reichweite 2). ENTWAFFNUNG. Ein Gegner innerhalb Reichweite 2 erleidet 2 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an). Bis zum Ende seines nächsten Zuges kann jener Gegner keine Angriffsaktionen ausführen.\nUnten: Bewegung 6. Sprung. Bewege dich 6 Felder oder weniger. Lege diese Karte danach auf den Ablagestapel für verlorene Karten.' },

  '223': { nameRu: 'Пылающий серп', nameDe: 'Flammende Sichel', initiative: 63, lost: false,
    descRu: 'Верх: Атака 3, Дальность 2. ПРИТЯЖЕНИЕ 1. Один враг в пределах 2 клеток получает 3 урона (примените эффект карты модификатора атаки; по врагу на соседней клетке атака проводится с затруднением) и передвигается на 1 клетку по направлению к вам.\nНиз: Добыча 1. Подберите все монеты и жетоны сокровищ на вашей и соседних с вами клетках.',
    descDe: 'Oben: Angriff 3, Reichweite 2. ANZIEHEN 1. Ein Gegner innerhalb Reichweite 2 erleidet 3 Schaden (wende den Effekt einer Angriffsmodifikatorkarte an; gegen einen Gegner auf einem benachbarten Feld wird der Angriff mit Nachteil ausgeführt) und bewegt sich 1 Feld auf dich zu.\nUnten: Plündern 1. Hebe alle Münzen und Schatzmarker auf deinem Feld und auf benachbarten Feldern auf.' },

  '224': { nameRu: 'Сильный и ловкий', nameDe: 'Stark und wendig', initiative: 16, lost: false,
    descRu: 'Верх: Атака 2, Дальность 2, Цели 2. ПРИТЯЖЕНИЕ 1.\nНиз: Движение 2. Прыжок. Щит 1. Бонус раунда.',
    descDe: 'Oben: Angriff 2, Reichweite 2, Ziele 2. ANZIEHEN 1.\nUnten: Bewegung 2. Sprung. Schild 1. Rundenaktion.' },

  '225': { nameRu: 'Целебные пески', nameDe: 'Heilende Sande', initiative: 32, lost: false,
    descRu: 'Верх: Лечение 4 (на себя). Получите 1 опыт.\nНиз: Движение 3. В этом раунде все атаки, нацеленные на вас, проводятся с затруднением. Бонус раунда.',
    descDe: 'Oben: Heilung 4 (auf dich). Erhalte 1 EP.\nUnten: Bewegung 3. Alle auf dich gerichteten Angriffe in dieser Runde werden mit Nachteil ausgeführt. Rundenaktion.' },

  '226': { nameRu: 'Шипованный щит', nameDe: 'Dornenwall', initiative: 41, lost: false,
    descRu: 'Верх: Каждый раз, когда враг на соседней клетке атакует вас, он получает урон, равный вашему показателю свойства «Щит». Получите 2 опыта. (Потеря).\nНиз: Лечение 2, Дальность 2. Огонь.',
    descDe: 'Oben: Jedes Mal, wenn ein Gegner auf einem benachbarten Feld dich angreift, erleidet er Schaden in Höhe deines Schild-Werts. Erhalte 2 EP. (Verlust).\nUnten: Heilung 2, Reichweite 2. Feuer.' },

  '227': { nameRu: 'Пылающий серп', nameDe: 'Flammende Sichel', initiative: 63, lost: false,
    descRu: 'Верх: Атака 3, Дальность 2. ПРИТЯЖЕНИЕ 1. Огонь.\nНиз: Все враги на соседних клетках получают по 1 урону. Добыча 1. Огонь.',
    descDe: 'Oben: Angriff 3, Reichweite 2. ANZIEHEN 1. Feuer.\nUnten: Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden. Plündern 1. Feuer.' },

  '228': { nameRu: 'Ослепляющий серп', nameDe: 'Blendende Sichel', initiative: 87, lost: false,
    descRu: 'Верх: Атака 3, Дальность 2. ПАРАЛИЧ. Свет.\nНиз: Все враги на соседних клетках получают по 1 урону. Добыча 1. Свет.',
    descDe: 'Oben: Angriff 3, Reichweite 2. LÄHMUNG. Licht.\nUnten: Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden. Plündern 1. Licht.' },

  '229': { nameRu: 'Вихревые удары', nameDe: 'Wirbelnde Schläge', initiative: 38, lost: true,
    descRu: 'Верх: Атака 2 (цели: все враги на соседних клетках). Свет: +1 к атаке. Получите 1 опыт.\nНиз: Атака 2. Огонь: РАНА. Получите 1 опыт.',
    descDe: 'Oben: Angriff 2 (Ziele: alle Gegner auf benachbarten Feldern). Licht: +1 Angriff. Erhalte 1 EP.\nUnten: Angriff 2. Feuer: WUNDE. Erhalte 1 EP.' },

  '230': { nameRu: 'Покров пламени', nameDe: 'Feuermantel', initiative: 6, lost: false,
    descRu: 'Верх: В следующих 5 случаях, когда враг передвигается на соседнюю с вами клетку, он получает 2 урона. Огонь. (Потеря).\nНиз: Движение 4. Огонь: Щит 1. Получите 1 опыт. Бонус раунда.',
    descDe: 'Oben: In den nächsten 5 Fällen, wenn ein Gegner sich auf ein zu dir benachbartes Feld bewegt, erleidet er 2 Schaden. Feuer. (Verlust).\nUnten: Bewegung 4. Feuer: Schild 1. Erhalte 1 EP. Rundenaktion.' },

  '231': { nameRu: 'Шокирующее наступление', nameDe: 'Schockierender Vorstoß', initiative: 14, lost: true,
    descRu: 'Верх: Атака 3. ПАРАЛИЧ. Свет: Щит 1. Получите 1 опыт. Бонус раунда.\nНиз: Движение 3. Свет.',
    descDe: 'Oben: Angriff 3. LÄHMUNG. Licht: Schild 1. Erhalte 1 EP. Rundenaktion.\nUnten: Bewegung 3. Licht.' },

  '232': { nameRu: 'Щит пустыни', nameDe: 'Wüstenschild', initiative: 10, lost: false,
    descRu: 'Верх: Атака 3, целевая область. Свет: +1 к атаке, ОТТОЛКНУТЬ 1. Получите 1 опыт.\nНиз: Щит 3. Огонь. Свет. Получите 1 опыт. Бонус раунда. (Потеря).',
    descDe: 'Oben: Angriff 3, Zielfeld. Licht: +1 Angriff, STOẞEN 1. Erhalte 1 EP.\nUnten: Schild 3. Feuer. Licht. Erhalte 1 EP. Rundenaktion. (Verlust).' },

  '233': { nameRu: 'Пустынная ночь', nameDe: 'Wüstennacht', initiative: 90, lost: true,
    descRu: 'Верх: Атака 2 (цель: враг в пределах двух клеток от вас). РАЗОРУЖЕНИЕ. Лёд. Тьма.\nНиз: Движение 6. Прыжок. Получите 1 опыт. (Потеря).',
    descDe: 'Oben: Angriff 2 (Ziel: ein Gegner innerhalb Reichweite 2). ENTWAFFNUNG. Eis. Dunkelheit.\nUnten: Bewegung 6. Sprung. Erhalte 1 EP. (Verlust).' },

  '234': { nameRu: 'Солнечный воин', nameDe: 'Sonnenkrieger', initiative: 13, lost: false,
    descRu: 'Верх: Щит 1. ПАРАЛИЧ (цели: все враги на соседних клетках). Свет. Бонус раунда.\nНиз: Атака 2. Свет: +1 к атаке, СМЯТЕНИЕ. Получите 1 опыт.',
    descDe: 'Oben: Schild 1. LÄHMUNG (Ziele: alle Gegner auf benachbarten Feldern). Licht. Rundenaktion.\nUnten: Angriff 2. Licht: +1 Angriff, VERWIRRUNG. Erhalte 1 EP.' },

  '235': { nameRu: 'Танец клинка', nameDe: 'Klingentanz', initiative: 29, lost: false,
    descRu: 'Верх: Атака 1, Дальность 3. Огонь: +1 к атаке, ПРИТЯЖЕНИЕ 2. Получите 1 опыт. Движение 2. Атака 1, Дальность 3. Свет: +1 к атаке, ПРИТЯЖЕНИЕ 2. Получите 1 опыт.\nНиз: Движение 4. Прыжок. Все враги на клетках, через которые вы передвинулись, получают по 1 урону. Свет: вместо этого получают по 2 урона. Получите 1 опыт. (Потеря).',
    descDe: 'Oben: Angriff 1, Reichweite 3. Feuer: +1 Angriff, ANZIEHEN 2. Erhalte 1 EP. Bewegung 2. Angriff 1, Reichweite 3. Licht: +1 Angriff, ANZIEHEN 2. Erhalte 1 EP.\nUnten: Bewegung 4. Sprung. Alle Gegner auf Feldern, über die du dich bewegt hast, erleiden je 1 Schaden. Licht: Stattdessen erleiden sie je 2 Schaden. Erhalte 1 EP. (Verlust).' },

  '236': { nameRu: 'Точный удар', nameDe: 'Präzisionsschlag', initiative: 40, lost: false,
    descRu: 'Верх: Атака 4. Добавьте +3 к атаке, если у цели есть жетон отрицательного состояния. Огонь: Преимущество. Получите 1 опыт.\nНиз: Движение 2. ПРИТЯЖЕНИЕ 2, Дальность 3.',
    descDe: 'Oben: Angriff 4. Füge +3 Angriff hinzu, falls das Ziel einen negativen Statusmarker trägt. Feuer: Vorteil. Erhalte 1 EP.\nUnten: Bewegung 2. ANZIEHEN 2, Reichweite 3.' },

  '237': { nameRu: 'Жатва', nameDe: 'Ernte', initiative: 52, lost: false,
    descRu: 'Верх: Атака 4, Дальность 2. Воздух. Свет.\nНиз: Движение 5. Выполняйте действие «Добыча 1» на каждой клетке, на которую вы передвигаетесь этим действием. Получите 1 опыт.',
    descDe: 'Oben: Angriff 4, Reichweite 2. Luft. Licht.\nUnten: Bewegung 5. Führe auf jedem Feld, das du mit dieser Bewegung betrittst, „Plündern 1“ aus. Erhalte 1 EP.' },

  '238': { nameRu: 'Варварские инстинкты', nameDe: 'Barbarische Instinkte', initiative: 12, lost: false,
    descRu: 'Верх: Щит 1. ПРИТЯЖЕНИЕ 1, Дальность 2. Все враги на соседних клетках получают по 1 урону. Огонь. Бонус раунда.\nНиз: Свет: Движение 2. Получите 1 опыт. Атака 1. РАНА.',
    descDe: 'Oben: Schild 1. ANZIEHEN 1, Reichweite 2. Alle Gegner auf benachbarten Feldern erleiden je 1 Schaden. Feuer. Rundenaktion.\nUnten: Licht: Bewegung 2. Erhalte 1 EP. Angriff 1. WUNDE.' },

  '239': { nameRu: 'Солнечное тепло', nameDe: 'Sonnenwärme', initiative: 23, lost: false,
    descRu: 'Верх: Атака 3, целевая область. Свет: +1 к атаке, СМЯТЕНИЕ. Получите 1 опыт.\nНиз: Лечение 4, Дальность 1. Свет.',
    descDe: 'Oben: Angriff 3, Zielfeld. Licht: +1 Angriff, VERWIRRUNG. Erhalte 1 EP.\nUnten: Heilung 4, Reichweite 1. Licht.' },

  '240': { nameRu: 'Душащая цепь', nameDe: 'Würgekette', initiative: 19, lost: false,
    descRu: 'Верх: Атака 3. ПАРАЛИЧ. Каждый раз, когда цель будет атакована в этом раунде, она получает 1 урон. Чтобы отметить эту цель, положите на неё ваш жетон персонажа и уберите его в конце раунда. Огонь: вместо этого получает 2 урона. Получите 1 опыт. Бонус раунда.\nНиз: Движение 4. ПАРАЛИЧ (цели: все враги на соседних клетках).',
    descDe: 'Oben: Angriff 3. LÄHMUNG. Jedes Mal, wenn das Ziel in dieser Runde angegriffen wird, erleidet es 1 Schaden. Lege zur Markierung dieses Ziels deinen Charaktermarker darauf und entferne ihn am Ende der Runde. Feuer: Es erleidet stattdessen 2 Schaden. Erhalte 1 EP. Rundenaktion.\nUnten: Bewegung 4. LÄHMUNG (Ziele: alle Gegner auf benachbarten Feldern).' },

  '241': { nameRu: 'Сияющий серп', nameDe: 'Leuchtende Sichel', initiative: 79, lost: false,
    descRu: 'Верх: Атака 4, Дальность 2. Все враги на соседних с целью клетках получают по 1 урону. Свет.\nНиз: Движение 2. Лечение 2, Дальность 2.',
    descDe: 'Oben: Angriff 4, Reichweite 2. Alle Gegner auf zum Ziel benachbarten Feldern erleiden je 1 Schaden. Licht.\nUnten: Bewegung 2. Heilung 2, Reichweite 2.' },

  '242': { nameRu: 'Выжигающий тьму', nameDe: 'Dunkelheitsverbrenner', initiative: 31, lost: false,
    descRu: 'Верх: Атака 1 (цели: все враги в пределах двух клеток от вас). Огонь: РАНА. Получите 1 опыт.\nНиз: Движение 2. РАЗОРУЖЕНИЕ (цель: один враг на соседней клетке). Лёд. Огонь. Тьма: Свет.',
    descDe: 'Oben: Angriff 1 (Ziele: alle Gegner innerhalb Reichweite 2). Feuer: WUNDE. Erhalte 1 EP.\nUnten: Bewegung 2. ENTWAFFNUNG (Ziel: ein Gegner auf einem benachbarten Feld). Eis. Feuer. Dunkelheit: Licht.' },

  '244': { nameRu: 'Песчаный дьявол', nameDe: 'Sandteufel', initiative: 55, lost: false,
    descRu: 'Верх: Положите песчаного дьявола на соседнюю пустую клетку. Он считается ловушкой для выбора цели и движения монстров. В начале каждого вашего хода вы можете передвинуть песчаного дьявола на 2 или менее клетки, а также заставить передвигаться вместе с ним фигурку, находящуюся на нём. Каждый раз, когда фигурка передвигается на клетку с дьяволом или покидает её (не в случае совместного передвижения), эта фигурка получает 1 урон и состояние СМЯТЕНИЕ. Получите 2 опыта. (Потеря).\nНиз: Движение 5.',
    descDe: 'Oben: Lege den Sandteufel auf ein benachbartes leeres Feld. Er gilt für Zielauswahl und Monsterbewegung als Falle. Zu Beginn jedes deiner Züge kannst du den Sandteufel um 2 oder weniger Felder bewegen und auch eine Figur mitbewegen, die sich auf ihm befindet. Jedes Mal, wenn sich eine Figur auf ein Feld mit dem Teufel bewegt oder es verlässt (außer bei gemeinsamer Bewegung), erleidet sie 1 Schaden und erhält VERWIRRUNG. Erhalte 2 EP. (Verlust).\nUnten: Bewegung 5.' },

  '245': { nameRu: 'Нестерпимое сияние', nameDe: 'Unerträglicher Glanz', initiative: 22, lost: false,
    descRu: 'Верх: В следующих 4 случаях, когда враг передвигается на соседнюю с вами клетку, он получает состояние РАЗОРУЖЕНИЕ. Свет. (Потеря).\nНиз: Движение 2. Все враги на соседних клетках получают по 2 урона.',
    descDe: 'Oben: In den nächsten 4 Fällen, wenn ein Gegner sich auf ein zu dir benachbartes Feld bewegt, erhält er ENTWAFFNUNG. Licht. (Verlust).\nUnten: Bewegung 2. Alle Gegner auf benachbarten Feldern erleiden je 2 Schaden.' },

  '246': { nameRu: 'Летящий серп', nameDe: 'Fliegende Sichel', initiative: 91, lost: true,
    descRu: 'Верх: Атака 5, Дальность 4. ПРИТЯЖЕНИЕ 3. Воздух.\nНиз: Атака 2. Свет: Движение 2. Получите 1 опыт. Атака 2.',
    descDe: 'Oben: Angriff 5, Reichweite 4. ANZIEHEN 3. Luft.\nUnten: Angriff 2. Licht: Bewegung 2. Erhalte 1 EP. Angriff 2.' },

  '247': { nameRu: 'Свирепый танец', nameDe: 'Wilder Tanz', initiative: 26, lost: true,
    descRu: 'Верх: Атака 3. Огонь: один союзник на соседней клетке может выполнить действие «Атака 3». Получите 1 опыт. Свет: ещё один союзник на соседней клетке может выполнить действие «Атака 3». Получите 1 опыт.\nНиз: Один враг на соседней клетке получает 1 урон. Движение 2. Один враг на соседней клетке получает 1 урон. Движение 2. Один враг на соседней клетке получает 1 урон.',
    descDe: 'Oben: Angriff 3. Feuer: Ein Verbündeter auf einem benachbarten Feld darf „Angriff 3“ ausführen. Erhalte 1 EP. Licht: Ein weiterer Verbündeter auf einem benachbarten Feld darf „Angriff 3“ ausführen. Erhalte 1 EP.\nUnten: Ein Gegner auf einem benachbarten Feld erleidet 1 Schaden. Bewegung 2. Ein Gegner auf einem benachbarten Feld erleidet 1 Schaden. Bewegung 2. Ein Gegner auf einem benachbarten Feld erleidet 1 Schaden.' },

  '248': { nameRu: 'Рога зверя', nameDe: 'Hörner des Biestes', initiative: 8, lost: false,
    descRu: 'Верх: Атака 4, целевая область. ОТТОЛКНУТЬ 1. Огонь. Получите 1 опыт.\nНиз: Движение 2. Щит 3. Свет: +1 к свойству «Щит». Получите 1 опыт. Бонус раунда. (Потеря).',
    descDe: 'Oben: Angriff 4, Zielfeld. STOẞEN 1. Feuer. Erhalte 1 EP.\nUnten: Bewegung 2. Schild 3. Licht: +1 zu Schild. Erhalte 1 EP. Rundenaktion. (Verlust).' },

  '249': { nameRu: 'Радужный удар', nameDe: 'Regenbogenschlag', initiative: 70, lost: true,
    descRu: 'Верх: Атака 4, Дальность 3. Любая стихия. Любая стихия. Любая стихия.\nНиз: Добыча 2. Любая стихия.',
    descDe: 'Oben: Angriff 4, Reichweite 3. Beliebiges Element. Beliebiges Element. Beliebiges Element.\nUnten: Plündern 2. Beliebiges Element.' },

  '250': { nameRu: 'Бесстрашие', nameDe: 'Furchtlosigkeit', initiative: 56, lost: false,
    descRu: 'Верх: Каждый раз, когда вас атакуют в этом раунде, получайте свойство «Щит X» для каждой атаки, где X — количество врагов, находящихся во время атаки на соседних с вами клетках, но не более 3. Бонус раунда.\nНиз: В следующих 5 случаях, когда враг передвигается на соседнюю с вами клетку, выполните действие «Лечение 3 (на себя)». Свет. (Потеря).',
    descDe: 'Oben: Jedes Mal, wenn du in dieser Runde angegriffen wirst, erhalte für jeden Angriff Schild X, wobei X der Anzahl der Gegner entspricht, die sich während des Angriffs auf zu dir benachbarten Feldern befinden, jedoch maximal 3. Rundenaktion.\nUnten: In den nächsten 5 Fällen, wenn ein Gegner sich auf ein zu dir benachbartes Feld bewegt, führe „Heilung 3 (auf dich)“ aus. Licht. (Verlust).' },

  '251': { nameRu: 'Парящий щит', nameDe: 'Schwebender Schild', initiative: 11, lost: false,
    descRu: 'Верх: Движение 3. Прыжок. Атака 4 (цели: все враги на соседних клетках). ОГЛУШЕНИЕ. Огонь. Получите 1 опыт. (Потеря).\nНиз: Движение 3. Прыжок. Щит 2. Лёд: +1 к свойству «Щит». Получите 1 опыт. Бонус раунда.',
    descDe: 'Oben: Bewegung 3. Sprung. Angriff 4 (Ziele: alle Gegner auf benachbarten Feldern). BETÄUBUNG. Feuer. Erhalte 1 EP. (Verlust).\nUnten: Bewegung 3. Sprung. Schild 2. Eis: +1 zu Schild. Erhalte 1 EP. Rundenaktion.' },

  '252': { nameRu: 'Праведный гнев', nameDe: 'Gerechter Zorn', initiative: 89, lost: false,
    descRu: 'Верх: Атака 5, Дальность 2. Огонь: +1 к атаке, +2 к дальности, все враги на соседних с целью клетках получают по 1 урону. Свет: +1 к атаке, преимущество, СМЯТЕНИЕ.\nНиз: Свет: Движение 3. Получите 1 опыт. Все враги на соседних клетках получают по 3 урона.',
    descDe: 'Oben: Angriff 5, Reichweite 2. Feuer: +1 Angriff, +2 Reichweite, alle Gegner auf zum Ziel benachbarten Feldern erleiden je 1 Schaden. Licht: +1 Angriff, Vorteil, VERWIRRUNG.\nUnten: Licht: Bewegung 3. Erhalte 1 EP. Alle Gegner auf benachbarten Feldern erleiden je 3 Schaden.' },


};
function getCardData(id) {

  return CARD_DATA[String(id)] || CARD_DATA[String(id).padStart(3,'0')] || {};

}



// ─── City Events ──────────────────────────────────────

const EVENTS = {

  '01': {

    story: 'Как гласит поговорка, не шути со «Спящим львом» и не столкнёшься с «Оскалом». Сегодня один из тех дней, когда вы заработаете скидку на выпивку.\n\nВы стучитесь в дверь к Ксаину — орхиду, который уже перешёл от гарантий к отговоркам. Он открывает дверь, и вы сообщаете ему, что пора расплатиться по долгам.\n\n— Ой, да ладно, они прислали «Оскал»? Так, хорошо... Проблема в том, что вы пришли на день раньше. Завтра я получу кучу золота — сорву большой куш с нескольких ставок. Стопроцентные деньги.\n\nУ порога вы замечаете несколько упакованных сумок.\n\n— А, ерунда, — отмахивается Ксаин. — Просто план Б, ничего особенного. Больше он мне не нужен — я купаюсь в деньгах! Вернее, буду купаться — завтра. Чёрт возьми, я даже готов отстегнуть вам немного за отсрочку!',

    storyDe: 'Wie das Sprichwort sagt: Lege dich nicht mit dem „Schlafenden Löwen" an, und du wirst dem „Fletschenden" nicht begegnen. Heute ist einer jener Tage, an denen ihr einen Rabatt auf Getränke verdient.\n\nIhr klopft an Xains Tür — einem Orchid, der längst von Versprechen zu Ausreden übergegangen ist. Er öffnet, und ihr teilt ihm mit, dass es Zeit ist, seine Schulden zu begleichen.\n\n— Ach was, die haben den „Fletschenden" geschickt? Na gut... Das Problem ist, ihr seid einen Tag zu früh. Morgen bekomme ich einen Haufen Gold — ich werde bei mehreren Wetten groß absahnen. Todsichere Sache.\n\nAm Türrahmen bemerkt ihr einige gepackte Taschen.\n\n— Ach, Unsinn, — winkt Xain ab. — Nur Plan B, nichts Besonderes. Den brauche ich nicht mehr — ich schwimme in Gold! Oder werde es — morgen. Verdammt, ich bin sogar bereit, euch etwas für den Aufschub draufzulegen!',

    choiceA: 'вы не купитесь на это. Он заплатит сейчас.',

    choiceADe: 'Ihr lasst euch nicht täuschen. Er zahlt jetzt.',

    choiceB: 'немного доверия не повредит. Вы вернётесь завтра.',

    choiceBDe: 'Ein wenig Vertrauen schadet nicht. Ihr kommt morgen wieder.',

    resultA: 'Вы выбиваете из Ксаина всё до последней монеты. Он ноет, что у него нет золота, но вы собираете достаточно, чтобы покрыть бо́льшую часть долга. На выходе вы забираете побрякушку в счёт остатка. Возможно, она вам пригодится или вы просто заложите её, чтобы пропить вырученные деньги.\n\nОтряд получает 1 «Оберег Дуба» (предмет 26).',

    resultADe: 'Ihr treibt bei Xain jeden letzten Kupferpfennig ein. Er jammert, dass er kein Gold habe, aber ihr sammelt genug, um den Großteil der Schulden zu decken. Beim Gehen nehmt ihr noch einen Tand als Ausgleich für den Rest mit. Vielleicht ist er nützlich — oder ihr versetzt ihn, um das Geld zu vertrinken.\n\nDie Gruppe erhält 1 „Eichenamullett" (Gegenstand 26).',

    resultB: 'На следующий день вы входите в «Спящий лев», где вас уже ждёт Ксаин. Он щеголяет толстыми золотыми кольцами, а на шее красуется вычурное ожерелье, переливающееся на свету.\n\n— Друзья! Ха-ха! Добро пожаловать, выпивка за мой счёт! Говорил же, что всё получится! О, и небольшая благодарность вам за доверие…\n\nВы получаете суммарно 20 золотых.',

    resultBDe: 'Am nächsten Tag betretet ihr den „Schlafenden Löwen", wo Xain bereits wartet. Er protzt mit dicken Goldringen und einer aufwendigen Kette, die im Licht schimmert.\n\n— Freunde! Ha-ha! Willkommen, die Getränke gehen auf mich! Hab ich\'s nicht gesagt? Oh, und ein kleines Dankeschön für euer Vertrauen…\n\nIhr erhaltet zusammen 20 Gold.'

  },

  '02': {

    story: 'Долгое время вы относили одежду на стирку к саввасу, живущему у реки в Округе весов. Но после последней битвы с гигантскими гадюками саввас отказался обслуживать вас, опасаясь, что не сможет понять, где кончается кровь и начинается яд. Совсем недавно вы начали относить одежду к приземистому куатрилу, управляющему автоматизированной прачечной. Он принимает одежду в любом состоянии и не задаёт лишних вопросов.\n\n— И снова здравствуйте! — кричит он, широко улыбаясь, когда вы входите. Но заметив, что капающий с ваших доспехов яд смущает более утончённых клиентов, он добавляет: — Э-э-э, в первый раз. Чем могу помочь?',

    storyDe: 'Lange Zeit habt ihr eure Kleidung zum Waschen zu einem Savvas gebracht, der am Fluss im Viertel der Waagen lebt. Doch nach dem letzten Kampf gegen riesige Vipern weigerte er sich, euch zu bedienen, da er Blut nicht mehr von Gift unterscheiden konnte. Seit Kurzem bringt ihr eure Sachen zu einem untersetzten Quatryl, der eine automatisierte Wäscherei betreibt. Er nimmt Kleidung in jedem Zustand an und stellt keine Fragen.\n\n— Schön, euch wieder zu sehen! — ruft er mit breitem Lächeln, als ihr eintretet. Doch als er bemerkt, dass das von euren Rüstungen tropfende Gift die feineren Kunden verstört, fügt er hinzu: — Äh, zum ersten Mal hier. Womit kann ich helfen?',

    choiceA: 'выложить свою грязную одежду и доспехи для чистки и починки.',

    choiceADe: 'Eure schmutzige Kleidung und Rüstung zur Reinigung und Reparatur abgeben.',

    choiceB: 'понять намёк и вернуться позже.',

    choiceBDe: 'Den Wink verstehen und später wiederkommen.',

    resultA: 'Вы отдаёте свою одежду и доспехи. Машины приступают к работе: погружают ваши вещи в горячие котлы с мыльной водой, отжимают и обдают их струями пара. Куатрил отмечает дырки и прорехи и отправляет одежду к автоматическим швейным рукам для починки. В конце концов вещи оказываются у сложного прибора из проводов, который каким-то образом плотно упаковывает ваши вещи и сбрасывает их вам, удовлетворённо выпуская последнее облачко пара.\n\nВсе персонажи начинают сценарий в состоянии «БЛАГОСЛОВЕНИЕ».',

    resultADe: 'Ihr gebt eure Kleidung und Rüstung ab. Die Maschinen gehen an die Arbeit: Sie tauchen eure Sachen in heiße Seifenkessel, wringen sie aus und bestrahlen sie mit Dampfstrahlen. Der Quatryl markiert Löcher und Risse und schickt die Kleidung zu automatischen Nährarmen zur Reparatur. Schließlich landet alles bei einem komplizierten Drahtgerät, das eure Sachen irgendwie fest zusammenpackt und euch zuwirft, dabei zufrieden die letzte Dampfwolke ausstoßend.\n\nAlle Charaktere beginnen das Szenario im Zustand SEGEN.',

    resultB: 'Вы притворяетесь смущённым и потерянным, делая вид, что ищете оружейную, а через несколько часов возвращаетесь к куатрилу.\n\n— Модная одежда приносит деньги, но мастерство оттачивается на окровавленных доспехах.\n\nВ благодарность за ваше благоразумие он предлагает вам подарок: вещь от другого искателя приключений, который так и не вернулся за ней.\n\nВсе персонажи начинают сценарий в состоянии «БЛАГОСЛОВЕНИЕ».\nОтряд получает 1 «Кольчугу» (предмет 03).',

    resultBDe: 'Ihr tut so, als wärt ihr verloren und sucht die Waffenschmiede, und kehrt einige Stunden später zum Quatryl zurück.\n\n— Schicke Kleidung bringt Geld, aber das Können wird an blutigen Rüstungen geschärft.\n\nAls Dank für euer Einfühlungsvermögen bietet er euch ein Geschenk an: eine Sache von einem anderen Abenteurer, der nie zurückgekehrt ist, um sie abzuholen.\n\nAlle Charaktere beginnen das Szenario im Zustand SEGEN.\nDie Gruppe erhält 1 „Kettenhemd" (Gegenstand 03).'

  },

  '03': {

    story: '— Знай же, у меня есть выход на советника Седогрива! Его, безусловно, заинтересует то, сколько ты сдираешь за простейший пошив! Дикарь! Ты… тупоголовый варвар! — кричит бородатый коротышка, выходя от портного в Пёстром квартале.\n\n— Я сам подошью себе одежду. Это явно несложно, раз даже ты этим занимаешься! — с этими словами он разворачивается и спотыкается о полы длинной мантии. По булыжной мостовой рассыпаются книги в кожаных переплётах. Как минимум одна из них выглядит очень любопытно…',

    storyDe: '— Wisst ihr, ich habe Kontakte zu Berater Graubart! Den wird es sicher interessieren, was ihr für einfaches Nähen verlangt! Barbar! Ihr seid… stumpfsinnige Barbaren! — schreit ein bärtiger Halbwüchsiger, als er aus der Schneiderei im Bunten Viertel heraustritt.\n\n— Ich nähe meine Kleidung selbst. Das kann ja nicht so schwer sein, wenn sogar ihr es schafft! — Mit diesen Worten dreht er sich um und stolpert über den Saum seines langen Umhangs. Bücher in Lederbänden rollen über das Kopfsteinpflaster. Zumindest eines davon sieht äußerst interessant aus…',

    choiceA: 'помочь мужчине собрать разбросанные книги.',

    choiceADe: 'Dem Mann helfen, die verstreuten Bücher aufzusammeln.',

    choiceB: 'воспользоваться суматохой и схватить самый интересный томик.',

    choiceBDe: 'Die Verwirrung nutzen und den interessantesten Band an sich nehmen.',

    resultA: 'Вы протягиваете мужчине последнюю книгу, пока он отряхивается от пыли.\n\n— Уф! Ну что же, благодарю. А… «Оскал»! Доминик Скрим, приятно познакомиться. Хотелось бы, чтобы остальные наёмники были так же любезны, как и вы. Возможно, не все из вас плохие. В знак моей благодарности…\n\nВы получаете суммарно 5 золотых.',

    resultADe: 'Ihr reicht dem Mann das letzte Buch, während er sich den Staub abklopft.\n\n— Puh! Na gut, ich danke euch. Ah… der „Fletschende"! Dominik Schrim, angenehm. Ich wünschte, die anderen Söldner wären so höflich wie ihr. Vielleicht seid ihr nicht alle schlecht. Als Zeichen meiner Dankbarkeit…\n\nIhr erhaltet zusammen 5 Gold.',

    resultB: 'Вы хватаете изысканную книгу в чёрном кожаном переплёте и открываете на случайной странице: «…обезумевшие, разгромленные, забившиеся в тёмные пещеры — всё же уцелели. Огромная армия демонов, предвестников Переворота, преуспела в своём стремлении извести на корню великий и могучий народ…» Наверное, какой-нибудь фантастический роман. Вы выбрасываете книгу в подворотне и двигаетесь дальше.\n\nНичего не происходит.',

    resultBDe: 'Ihr greift nach einem edlen Buch in schwarzem Ledereinband und schlagt es auf einer beliebigen Seite auf: „…wahnsinnig geworden, vernichtet, in dunkle Höhlen zurückgedrängt — und dennoch überlebt. Eine riesige Armee von Dämonen, Vorboten des Umsturzes, hatte Erfolg in ihrem Bestreben, ein großes und mächtiges Volk von Grund auf auszulöschen…" Wahrscheinlich irgendein Fantasieroman. Ihr werft das Buch in eine Gasse und geht weiter.\n\nNichts passiert.'

  },

  '04': {

    story: 'Вы прогуливаетесь вдоль прилавков Тонущего рынка, когда один из них — с экзотическими фруктами — привлекает ваше внимание.\n\nХозяин рассказывает вам о нескольких товарах: зерновой вишне, кровавой дыне, даже об орехе, который нужно расколоть, чтобы добраться до сладкого молока. Вы со своими спутниками начинаете обсуждать, что же купить, и торговец переключается на других клиентов.\n\nКраем глаза вы замечаете, как девочка-вермлинг пытается стащить несколько красных ягод из корзины на прилавке.',

    storyDe: 'Ihr schlendert an den Ständen des Versinkenden Marktes entlang, als einer davon — mit exotischen Früchten — eure Aufmerksamkeit erregt.\n\nDer Händler erzählt euch von mehreren Waren: Kornkirschen, Blutmelonen und sogar einer Nuss, die man aufknacken muss, um an die süße Milch zu gelangen. Ihr diskutiert mit euren Gefährten, was ihr kaufen sollt, und der Händler wendet sich anderen Kunden zu.\n\nAus dem Augenwinkel bemerkt ihr, wie ein Vermling-Mädchen versucht, ein paar rote Beeren aus einem Korb am Stand zu stehlen.',

    choiceA: 'окликнуть торговца.',

    choiceADe: 'Den Händler rufen.',

    choiceB: 'не вмешиваться. Это не ваше дело.',

    choiceBDe: 'Euch nicht einmischen. Das ist nicht eure Angelegenheit.',

    resultA: 'Торговец бьёт по руке вермлинга.\n\n— Вот, держи это и проваливай. И чтобы я тебя неделю не видел! — он бросает девочке какую-то мягкую тыкву, и она быстро убегает. Торговец благодарит вас несколькими монетами.\n\nВы получаете суммарно 5 золотых.',

    resultADe: 'Der Händler schlägt dem Vermling auf die Hand.\n\n— Hier, nimm das und verschwinde. Und lass dich eine Woche lang nicht blicken! — Er wirft dem Mädchen einen weichen Kürbis zu, und sie rennt schnell davon. Der Händler bedankt sich bei euch mit ein paar Münzen.\n\nIhr erhaltet zusammen 5 Gold.',

    resultB: 'Вермлинг запихивает в рот пригоршню ягод, и по её подбородку течёт сок. Девочка бросается наутёк, но, пробежав лишь несколько шагов, она падает на землю, хватая ртом воздух. Торговец тут же соображает, что произошло.\n\n— Идиотка! Красные ягоды ядовиты! — он наклоняется и кладёт в рот вермлингу зелёную ягоду. — Это должно нейтрализовать яд.\n\nСпустя мгновение девочка приходит в себя и бросается в ближайший канализационный люк.\n\nНичего не происходит.',

    resultBDe: 'Das Vermling stopft sich eine Handvoll Beeren in den Mund, und Saft läuft an ihrem Kinn herunter. Das Mädchen rennt los, bricht aber nach wenigen Schritten zusammen und schnappt nach Luft. Der Händler begreift sofort, was passiert ist.\n\n— Idiotin! Die roten Beeren sind giftig! — Er beugt sich hinunter und legt dem Vermling eine grüne Beere in den Mund. — Das sollte das Gift neutralisieren.\n\nEinen Moment später kommt das Mädchen wieder zu sich und stürzt in den nächsten Kanaldeckel.\n\nNichts passiert.'

  },

  '05': {

    story: 'Вы идёте вдоль реки к казармам, когда из воды на противоположный берег выскакивает скрытень под два метра ростом. Он устрашающе щёлкает клешнями, и обезумевшие горожане в панике бегут в укрытия.\n\nВнезапно раздаётся боевой клич, и из соседнего здания выпрыгивает фигурка в мерцающей фиолетовой одежде. Сгруппировавшись, она делает кувырок и изящно останавливается в метре от источника неприятностей. Это валратка с распущенными волосами, лицо которой скрыто вуалью.\n\n— Тисс! Тиссс! — кричит она, маня зверя странным деревянным инструментом. — Тисс!\n\nСкрытень прекращает нападение и поворачивается к женщине. Ужасный монстр… сбит с толку?',

    storyDe: 'Ihr geht am Fluss entlang zur Kaserne, als ein fast zwei Meter großer Lurker aus dem Wasser ans andere Ufer springt. Er schnappt bedrohlich mit seinen Scheren, und die erschrockenen Bürger fliehen in Panik.\n\nPlötzlich ertönt ein Kampfschrei, und eine Gestalt in schimmernden violetten Kleidern springt aus dem Nachbargebäude. Sie rollt sich ab und bleibt elegant einen Meter vom Aufruhr entfernt stehen. Es ist eine Valrath-Frau mit offenem Haar, deren Gesicht von einem Schleier verborgen ist.\n\n— Tiss! Tissss! — ruft sie und lockt das Tier mit einem seltsamen hölzernen Instrument. — Tiss!\n\nDer Lurker stellt den Angriff ein und wendet sich der Frau zu. Das schreckliche Ungeheuer ist… verwirrt?',

    choiceA: 'воспользоваться моментом и напасть на скрытня. Возможно, это единственный шанс убить его.',

    choiceADe: 'Den Moment nutzen und den Lurker angreifen. Vielleicht ist das die einzige Chance, ihn zu töten.',

    choiceB: 'отогнать зевак и освободить женщине место.',

    choiceBDe: 'Die Schaulustigen wegscheuchen und der Frau Raum verschaffen.',

    resultA: 'Пока скрытень зачарован одетой в фиолетовое женщиной и её странными звуками, вы подскакиваете и убиваете водного зверя. Вы поворачиваетесь, чтобы поблагодарить валратку за то, что она отвлекла монстра, но на её лице читается смесь ужаса и ярости.\n\n— Зачем вы его убили?! — спрашивает она, и её глаза наполняются слезами. — Это был всего лишь ребёнок!\n\nВы быстро извиняетесь и продолжаете идти в казармы, оставив женщину рыдать над проломленным панцирем скрытня.\n\nВсе получают по 5 очков опыта.',

    resultADe: 'Während der Lurker von der violett gekleideten Frau und ihren seltsamen Lauten gebannt ist, springt ihr vor und tötet das Wasserungeheuer. Ihr dreht euch um, um der Valrath für die Ablenkung zu danken, doch ihr Gesicht zeigt eine Mischung aus Entsetzen und Wut.\n\n— Warum habt ihr ihn getötet?! — fragt sie, die Augen voller Tränen. — Er war doch noch ein Kind!\n\nIhr entschuldigt euch eilig und geht weiter zur Kaserne, während die Frau über dem zerbrochenen Panzer des Lurkers schluchzt.\n\nAlle erhalten je 5 Erfahrungspunkte.',

    resultB: 'Вы сдерживаете испуганную толпу, пока женщина ходит вокруг скрытня, мерно постукивая своим инструментом.\n\nНаблюдая за её работой, вы и сами едва не впадаете в транс. Монстр следит за её танцем. Постепенно пара приближается к воде, и с последним «Тисс» скрытень отступает. Толпа облегчённо выдыхает, и незваная гостья, благодарно кивнув, поворачивается и растворяется в толпе.\n\nВсе получают по 10 очков опыта.',

    resultBDe: 'Ihr haltet die erschrockene Menge zurück, während die Frau um den Lurker herumgeht und rhythmisch auf ihr Instrument schlägt.\n\nBeim Zusehen geratet ihr selbst fast in Trance. Das Monster verfolgt ihren Tanz. Allmählich nähert sich das Paar dem Wasser, und mit einem letzten „Tiss" zieht sich der Lurker zurück. Die Menge atmet erleichtert auf, und die ungebetene Gästin nickt dankbar, dreht sich um und verschwindet in der Menge.\n\nAlle erhalten je 10 Erfahrungspunkte.'

  },

  '06': {

    story: 'По всему городу развешены объявления о розыске кого-то очень похожего на одного из вашего отряда. Ему лишь нужно немного изменить форму носа и, наверное, набросить на голову капюшон. Тогда, возможно, вам удастся получить награду в пятнадцать золотых.\n\nНемного подурачившись, вы соглашаетесь, что это безумная идея. Даже если вы убедите стражей, что один из вашего отряда и есть этот проходимец, и получите награду, ему потом придётся бежать из тюрьмы. Конечно же, оно того не стоит. Просто сумасшедший разговор между хорошими друзьями. Ого! Не может быть, только не эти ребята. Они же тупые, как…',

    storyDe: 'In der ganzen Stadt hängen Steckbriefe von jemandem, der einem aus eurer Gruppe sehr ähnelt. Er müsste nur die Nasenform ein wenig verändern und vielleicht eine Kapuze aufsetzen. Dann könnte es klappen, die Belohnung von fünfzehn Gold einzustreichen.\n\nNach ein wenig Herumalbern seid ihr euch einig, dass das eine verrückte Idee ist. Selbst wenn ihr die Wachen davon überzeugt, dass einer von euch der Gauner ist, und die Belohnung kassiert, müsste er dann aus dem Gefängnis fliehen. Das ist es sicher nicht wert. Nur ein wahnsinniges Gespräch unter guten Freunden. Oh! Das kann nicht sein, nicht diese Burschen. Die sind doch so dumm wie…',

    choiceA: 'позвать стражей.',

    choiceADe: 'Die Wachen rufen.',

    choiceB: 'громко позвать стражей.',

    choiceBDe: 'Die Wachen laut rufen.',

    resultA: 'Вы зовёте стражей и пытаетесь подставить своего друга. К сожалению, вам не удаётся удержать серьёзное выражение лица достаточно долго, чтобы провернуть дельце. Стражи наказывают вас за то, что вы тратите их время, пока ваш друг держит повязку на своём кровоточащем носу.\n\nОдин персонаж из отряда начинает сценарий в состоянии «РАНА».\nВсе персонажи начинают сценарий в состоянии «ПРОКЛЯТИЕ».',

    resultADe: 'Ihr ruft die Wachen und versucht, euren Freund zu verraten. Leider könnt ihr das ernste Gesicht nicht lange genug halten, um die Sache durchzuziehen. Die Wachen bestrafen euch dafür, dass ihr ihre Zeit verschwendet, während euer Freund den Verband auf seiner blutenden Nase hält.\n\nEin Charakter der Gruppe beginnt das Szenario im Zustand WUNDE.\nAlle Charaktere beginnen das Szenario im Zustand FLUCH.',

    resultB: 'Несмотря на протесты вашего друга, стражи арестовывают его. Вы получаете вознаграждение и вынуждаете своего друга внести за себя залог. Вы ещё долго будете смеяться над своей шуткой. По крайней мере, большинство из вас.\n\nОдин персонаж теряет 5 золотых.\nВсе остальные персонажи получают суммарно 15 золотых.',

    resultBDe: 'Trotz der Proteste eures Freundes verhaften die Wachen ihn. Ihr kassiert die Belohnung und zwingt euren Freund, seine eigene Kaution zu zahlen. Ihr werdet noch lange über euren Scherz lachen. Zumindest die meisten von euch.\n\nEin Charakter verliert 5 Gold.\nAlle anderen Charaktere erhalten zusammen 15 Gold.'

  },

  '07': {

    story: 'Вы решаете провести вечер в трущобах в «Бурой двери» — пивнушке в Старых доках.\n\nУстроившись в дальней части комнаты, вы замечаете старика, склонившегося над россыпью стеклянных шариков. Он с удовольствием предлагает вам составить ему компанию. Старик сжимает несколько шариков в кулак, а остальные аккуратно кладёт в нагрудный карман.\n\n— Угадайте, сколько шариков у меня в руке? Угадаете, и я не останусь в долгу. Это сложнее, чем кажется!\n\nОн смеётся над понятной только ему шуткой, но прежде, чем вы успеваете предложить вариант, чей-то голос шепчет вам на ухо: «Их всегда три». Обернувшись, вы никого не видите.',

    storyDe: 'Ihr beschließt, den Abend in den Slums in der „Braunen Tür" zu verbringen — einer Spelunke in den Alten Docks.\n\nIn der hintersten Ecke des Raumes bemerkt ihr einen alten Mann, der über eine Ansammlung von Glasmurmeln gebeugt ist. Er lädt euch gerne ein, ihm Gesellschaft zu leisten. Der Alte schließt einige Murmeln in seiner Faust, die anderen legt er sorgfältig in seine Brusttasche.\n\n— Ratet, wie viele Murmeln ich in der Hand halte? Wenn ihr es erratet, werde ich euch nicht im Stich lassen. Das ist schwerer als es klingt!\n\nEr lacht über einen Witz, den nur er versteht, doch bevor ihr einen Vorschlag machen könnt, flüstert jemand in euer Ohr: „Es sind immer drei." Als ihr euch umseht, ist niemand da.',

    choiceA: 'назвать число от одного до пяти. (Произнесите это число вслух.)',

    choiceADe: 'Eine Zahl von eins bis fünf nennen. (Sagt diese Zahl laut aus.)',

    choiceB: 'отправиться на поиски голоса.',

    choiceBDe: 'Auf die Suche nach der Stimme gehen.',

    resultA: 'ЕСЛИ ВЫ СКАЗАЛИ 3: старик театрально разжимает свой кулак и улыбается: «Вы ведь тоже их слышите, правда? Сегодня вы первые». Он посмеивается про себя и, выплатив ваш выигрыш, погружается в выпивку.\n\nВы получаете суммарно 10 золотых.\n\nИНАЧЕ: старик раскрывает ладонь, на которой лежат три блестящих стеклянных шарика. Он хихикает, как будто это была шутка, которую вы должны были предвидеть.\n\nВы теряете суммарно 5 золотых.',

    resultADe: 'WENN IHR 3 GESAGT HABT: Der Alte öffnet theatralisch seine Faust und lächelt: „Ihr hört sie also auch, nicht wahr? Heute seid ihr die Ersten." Er kichert vor sich hin und zahlt euch euren Gewinn, bevor er sich wieder dem Trinken widmet.\n\nIhr erhaltet zusammen 10 Gold.\n\nSONST: Der Alte öffnet die Handfläche, auf der drei glänzende Glasmurmeln liegen. Er kichert, als wäre es ein Witz, den ihr hättet vorhersehen sollen.\n\nIhr verliert zusammen 5 Gold.',

    resultB: 'Вы слышите очень слабый шёпот, словно это рёв толпы, перекрывающий исполнителя на сцене. Вы идёте за голосом на улицу, вниз по улице и за склад. Над маленьким шаром склонились два эстера, которые вздрагивают, когда вы подходите.\n\n— О, простите. Вы их тоже слышите? — эстер легко стучит по стеклянному шарику. Затем он бормочет себе под нос: — Слишком сильно повернул алмаз… — и перестаёт вас узнавать.\n\nВы уходите, но теперь у вас больше вопросов, чем раньше.\n\nВсе персонажи начинают сценарий в состоянии «СМЯТЕНИЕ».',

    resultBDe: 'Ihr hört ein sehr schwaches Flüstern, wie das Rauschen einer Menge, das einen Darsteller auf der Bühne übertönt. Ihr folgt der Stimme nach draußen, eine Gasse hinunter und hinter ein Lagerhaus. Über einer kleinen Kugel beugen sich zwei Aesther, die zusammenzucken, als ihr näher kommt.\n\n— Oh, Entschuldigung. Hört ihr sie auch? — Der Aesther tippt leicht gegen die Glaskugel. Dann murmelt er vor sich hin: — Habe den Diamanten zu stark gedreht… — und hört auf, euch wahrzunehmen.\n\nIhr geht, habt aber jetzt mehr Fragen als zuvor.\n\nAlle Charaktere beginnen das Szenario im Zustand VERWIRRUNG.'

  },

  '08': {

    story: 'Над центром города поднимается чёрный столб дыма. Подойдя туда, вы обнаруживаете людей, собравшихся вдоль моста Безмолвия. Толпа ликует и оживлённо аплодирует. Пробравшись вперёд, вы видите миниатюрного куатрила, к спине которого прикреплены два огромных механических крыла бабочки.\n\n— Сегодня куатрилы покорят небо! — он нажимает на кнопку на груди. Крылья начинают хлопать, и вырывается ещё больше дыма. Крылья набирают скорость, обдавая зрителей порывами воздуха. Широко улыбаясь, куатрил поднимается всё выше и выше… и падает в реку с театральным всплеском.',

    storyDe: 'Über dem Stadtzentrum steigt eine schwarze Rauchsäule auf. Als ihr dort ankommt, findet ihr Menschen, die sich entlang der Brücke der Stille versammelt haben. Die Menge jubelt und klatscht lebhaft. Als ihr euch nach vorne drängt, seht ihr einen kleinen Quatryl, an dessen Rücken zwei riesige mechanische Schmetterlingsflügel befestigt sind.\n\n— Heute werden die Quatryls den Himmel erobern! — Er drückt auf einen Knopf an seiner Brust. Die Flügel beginnen zu schlagen und stoßen noch mehr Rauch aus. Die Flügel gewinnen an Fahrt und fächeln den Zuschauern Luftstöße zu. Breit lächelnd steigt der Quatryl immer höher… und fällt mit einem theatralischen Platschen in den Fluss.',

    choiceA: 'броситься в реку, чтобы помочь куатрилу.',

    choiceADe: 'In den Fluss springen, um dem Quatryl zu helfen.',

    choiceB: 'удержать толпу на тот случай, если взорвётся механизм.',

    choiceBDe: 'Die Menge zurückhalten, falls der Mechanismus explodiert.',

    resultA: 'Вы ныряете сквозь клубы дыма в ледяную воду. Конечности куатрила запутались в обломках крыльев, но вам всё же удаётся высвободить его и медленно потащить к берегу.\n\nКуатрил широко раскрывает глаза, когда понимает, кто его спас:\n\n— «Оскал»? Ох, ничего себе, я ваш большой поклонник!\n\nОн теряет сознание то ли от падения, то ли от встречи с вами. Тем не менее сегодня вы спасли ему жизнь.\n\nВсе получают по 10 очков опыта.',

    resultADe: 'Ihr taucht durch Rauchwolken in das eiskalte Wasser. Die Gliedmaßen des Quatryls haben sich in den Trümmern der Flügel verfangen, aber ihr schafft es, ihn zu befreien und langsam ans Ufer zu ziehen.\n\nDer Quatryl reißt die Augen auf, als er erkennt, wer ihn gerettet hat:\n\n— Der „Fletschende"? Oh, toll, ich bin ein großer Fan von euch!\n\nEr verliert das Bewusstsein — entweder vom Sturz oder von der Begegnung mit euch. Dennoch habt ihr ihm heute das Leben gerettet.\n\nAlle erhalten je 10 Erfahrungspunkte.',

    resultB: 'Пока обломки горят в реке, на берег выбрасывает обмякшее тело изобретателя. Обеспокоенная толпа молча наблюдает за происходящим, опасаясь худшего.\n\nВнезапно глаза куатрила широко раскрываются.\n\n— ЭТО СРАБОТАЛО! — кричит он. Куатрил садится и начинает возиться с частями механизма, всё ещё прикреплёнными к его груди. — Я точно знаю, как это исправить. Ещё несколько поправок, и я буду парить над Медными хребтами!\n\nНичего не происходит.',

    resultBDe: 'Während die Trümmer im Fluss brennen, wird der schlaffe Körper des Erfinders ans Ufer gespült. Die besorgte Menge schaut schweigend zu und befürchtet das Schlimmste.\n\nPlötzlich reißt der Quatryl die Augen weit auf.\n\n— ES HAT FUNKTIONIERT! — ruft er. Der Quatryl setzt sich auf und beginnt, an den Maschinenteilen herumzubasteln, die noch an seiner Brust befestigt sind. — Ich weiß genau, wie ich das repariere. Noch ein paar Anpassungen, und ich werde über den Kupfergipfeln gleiten!\n\nNichts passiert.'

  },

  '09': {

    story: 'Вы бродите по Тонущему рынку, когда натыкаетесь на суматоху внутри одной лавки. На земле лежит мёртвый вермлинг, убитый ударом по голове.\n\nПодозреваемый валрат говорит: «Это сделал орхид!»\nПодозреваемый вермлинг говорит: «Валрат говорит правду!»\nПодозреваемый инокс говорит: «Если валрат лжёт, то и вермлинг лжёт».\nПодозреваемый орхид говорит: «Это был не вермлинг».\n\nДвое стражей почёсывают в затылках, когда из открывшегося неподалёку портала выходит эстер в необычной шляпе. Он смотрит невидящим взглядом и произносит: «Только один из них говорит правду». Прежде чем вы успеваете расспросить эстера, он исчезает.\n\nКто убийца? (Ответьте прямо сейчас.)',

    storyDe: 'Ihr streift durch den Versinkenden Markt, als ihr auf Aufruhr in einem Laden stoßt. Auf dem Boden liegt ein toter Vermling, der durch einen Schlag auf den Kopf getötet wurde.\n\nDer verdächtige Valrath sagt: „Das hat der Orchid getan!"\nDer verdächtige Vermling sagt: „Der Valrath sagt die Wahrheit!"\nDer verdächtige Inox sagt: „Wenn der Valrath lügt, dann lügt auch der Vermling."\nDer verdächtige Orchid sagt: „Es war nicht der Vermling."\n\nZwei Wachen kratzen sich am Kopf, als aus einem sich in der Nähe öffnenden Portal ein Aesther in einem ungewöhnlichen Hut tritt. Er schaut mit leerem Blick und sagt: „Nur einer von ihnen sagt die Wahrheit." Bevor ihr den Aesther befragen könnt, verschwindet er.\n\nWer ist der Mörder? (Antwortet jetzt sofort.)',

    choiceA: 'Ответ «ВЕРМЛИНГ».',

    choiceADe: 'Antwort: „VERMLING".',

    choiceB: 'Любой другой ответ.',

    choiceBDe: 'Jede andere Antwort.',

    resultA: 'ЕСЛИ ВАШ ОТВЕТ «ВЕРМЛИНГ»: стражи уводят преступника — вермлинга, который убил своего брата ради страховки. Вы проследили, чтобы ложь валрата и инокса не осталась безнаказанной. За свою проницательность инокс получает от стражей немного больше, чем грубое «Спасибо», но он с радостью отдаёт вам вознаграждение.\n\nВы получаете суммарно 15 золотых.',

    resultADe: 'WENN EURE ANTWORT „VERMLING" WAR: Die Wachen führen den Täter ab — den Vermling, der seinen Bruder wegen der Versicherung getötet hat. Ihr habt dafür gesorgt, dass die Lügen des Valrath und des Inox nicht ungestraft bleiben. Für eure Scharfsinnigkeit erhalten die Wachen vom Inox etwas mehr als ein grobes „Danke", aber er gibt euch die Belohnung gerne.\n\nIhr erhaltet zusammen 15 Gold.',

    resultB: 'ЕСЛИ ВАШ ОТВЕТ НЕ «ВЕРМЛИНГ»: позже вы понимаете, что если валрат говорил правду, то и вермлинг говорил правду. Но правду мог сказать лишь один, значит, они оба лгали. Тогда правду говорил инокс, а это значит, что орхид лгал о том, что это не вермлинг. Кажется, вы дали неверный ответ, и убийца теперь на свободе.\n\nВсе персонажи начинают сценарий в состоянии «ПРОКЛЯТИЕ».',

    resultBDe: 'WENN EURE ANTWORT NICHT „VERMLING" WAR: Später erkennt ihr, dass wenn der Valrath die Wahrheit sagte, auch der Vermling die Wahrheit sagte. Aber nur einer konnte die Wahrheit sagen, also logen beide. Dann sagte der Inox die Wahrheit, was bedeutet, dass der Orchid log, dass es nicht der Vermling war. Es scheint, ihr habt die falsche Antwort gegeben, und der Mörder ist jetzt frei.\n\nAlle Charaktere beginnen das Szenario im Zustand FLUCH.'

  },

  '10': {

    story: '— Ведьма! — из угла «Спящего льва» доносится громкий и невнятный голос портового рабочего — инокса. — Она вышла из канализации и превратила бригадира в… ик… в рыбу!\n\nВы возвращаетесь к выпивке, но мужчина продолжает кричать.\n\n— Я заплачу трёхдневную плату любому, кто сможет её убить!\n\nВнезапно его бессвязная речь вас заинтересовала.\n\nВы следуете указаниям пьяницы и (как и следовало ожидать) безнадёжно теряетесь в канализационной сети под Мрачной гаванью. Вы уже хотите просто выбраться наружу, когда слышите позади себя скрежет. Вы обнажаете оружие и оборачиваетесь, готовые к бою. Перед вами стоит дряхлая валратка, сморщенная и согнувшаяся в три погибели от старости. На её шее висит верёвка с сушёной рыбой. Она не обращает внимания на ваше оружие и молча указывает скрюченным пальцем на ближайший тоннель, находящийся за вашей спиной.',

    storyDe: '— Eine Hexe! — dröhnt die laute und undeutliche Stimme eines Hafenarbeiters — eines Inox — aus der Ecke des „Schlafenden Löwen". — Sie kam aus der Kanalisation und verwandelte den Vorarbeiter in… hicks… in einen Fisch!\n\nIhr wendet euch wieder eurem Getränk zu, aber der Mann schreit weiter.\n\n— Ich zahle drei Tageslöhne, wer immer sie töten kann!\n\nPlötzlich findet ihr sein wirres Geschwätz interessant.\n\nIhr folgt den Anweisungen des Betrunkenen und verirrt euch (wie zu erwarten) hoffnungslos im Kanalnetz unter Düsterhaven. Ihr wollt gerade einfach nur wieder heraus, als ihr hinter euch ein Kratzen hört. Ihr zieht eure Waffen und dreht euch um, kampfbereit. Vor euch steht eine gebrechliche Valrath-Frau, runzlig und vom Alter gekrümmt. Um ihren Hals hängt ein Seil mit getrockneten Fischen. Sie achtet nicht auf eure Waffen und zeigt schweigend mit einem gekrümmten Finger auf den nächsten Tunnel hinter euch.',

    choiceA: 'вырубить её и потребовать награду.',

    choiceADe: 'Sie niederschlagen und die Belohnung fordern.',

    choiceB: 'она просто старая отшельница в канализации. Оставить её в покое и пойти туда, куда она указала.',

    choiceBDe: 'Sie ist nur eine alte Einsiedlerin in der Kanalisation. Sie in Ruhe lassen und dem Tunnel folgen, auf den sie zeigt.',

    resultA: 'Иногда портовые рабочие рассказывают небылицы. Но не в этот раз. Прежде чем вы успеваете пустить в ход своё оружие, ведьма набрасывается на вас, как демон, царапая и кусая. После долгой битвы вы одерживаете победу и хромаете обратно в таверну. Инокс опьянел ещё больше, но он выплачивает обещанную награду — вы напоминаете ему, что это была плата за четыре дня. Залечивая свои раны за кружкой пива, вы думаете, какой позор, что портовым рабочим так мало платят.\n\nВы получаете суммарно 4 золотых.\nВсе персонажи начинают сценарий в состоянии «ОТРАВЛЕНИЕ».',

    resultADe: 'Manchmal erzählen Hafenarbeiter Märchen. Aber nicht dieses Mal. Bevor ihr eure Waffen einsetzen könnt, fällt die Hexe über euch her wie ein Dämon, kratzt und beißt. Nach einem langen Kampf gewinnt ihr und hinkt zurück in die Taverne. Der Inox ist noch betrunkener, aber er zahlt die versprochene Belohnung — ihr erinnert ihn daran, dass es vier Tageslöhne waren. Während ihr eure Wunden bei einem Bier auskuriert, denkt ihr, wie schade es ist, dass Hafenarbeiter so schlecht bezahlt werden.\n\nIhr erhaltet zusammen 4 Gold.\nAlle Charaktere beginnen das Szenario im Zustand VERGIFTUNG.',

    resultB: 'Вы машете на прощание рукой и идёте по тоннелю, но старуха следует за вами по пятам. Она не указывала на выход, вместо этого она привела вас к маленькой лачуге, где над слабым костром кипит котёл. Валратка наливает каждому из вас по чашке вкуснейшего рыбного супа. Лакомясь в тишине, вы приятно проводите время, после чего уходите, чувствуя себя намного лучше. Вы удивляетесь, почему портовый рабочий так недобро отзывается о бедной канализационной отшельнице.\n\nВсе персонажи начинают сценарий в состоянии «БЛАГОСЛОВЕНИЕ».',

    resultBDe: 'Ihr winkt zum Abschied und geht den Tunnel entlang, aber die alte Frau folgt euch auf Schritt und Tritt. Sie zeigte nicht auf den Ausgang, sondern führte euch zu einer kleinen Hütte, wo über einem schwachen Feuer ein Kessel köchelt. Die Valrath schenkt jedem von euch eine Tasse köstlicher Fischsuppe ein. In der Stille schmausend verbringt ihr eine angenehme Zeit und geht dann, euch viel besser fühlend. Ihr wundert euch, warum der Hafenarbeiter so schlecht über die arme Kanalisations-Einsiedlerin spricht.\n\nAlle Charaktere beginnen das Szenario im Zustand SEGEN.'

  },

  '11': {

    story: '— Проверьте свою силу! Кто сильнее — вы или инокс? — кричит мужчина на углу улицы. Рядом с ним стоит силомер. Тут же для смельчаков приготовлен молот, которым нужно бить по основанию устройства достаточно сильно, чтобы наверху зазвонил колокол.\n\n— Фантастические призы для сильнейших, сокрушительное поражение для слабейших! Всего пять золотых за попытку!',

    storyDe: '— Testet eure Kraft! Wer ist stärker — ihr oder ein Inox? — schreit ein Mann an der Straßenecke. Neben ihm steht ein Kraftmesser. Daneben liegt für Mutige ein Hammer, mit dem man auf die Basis des Geräts schlagen muss, stark genug, damit oben die Glocke läutet.\n\n— Fantastische Preise für die Stärksten, vernichtende Niederlage für die Schwächsten! Nur fünf Gold pro Versuch!',

    choiceA: 'рискнуть.',

    choiceADe: 'Es riskieren.',

    choiceB: 'этот орхид не знает, кто вы такие? «Оскалу» ничего не нужно доказывать, эти игры для детей.',

    choiceBDe: 'Dieser Orchid weiß nicht, wer ihr seid? Der „Fletschende" muss nichts beweisen, diese Spiele sind für Kinder.',

    resultA: 'Каждый персонаж выполняет действие «Атака 3», вытянув одну карту модификатора атаки. Затем каждый персонаж, исходя из значения своего удара, читает свой результат:\n\n3 ИЛИ МЕНЬШЕ: «Слабак! Не перенапрягись». Вы теряете 5 золотых.\n\n4 ИЛИ 5: «Неплохо! Хороший удар». Вы получаете 5 золотых.\n\n6 ИЛИ БОЛЬШЕ: ДЗИН! «Невероятно! Вы сильнее, чем инокс!» Вы получаете 5 золотых и начинаете сценарий в состоянии «БЛАГОСЛОВЕНИЕ».',

    resultADe: 'Jeder Charakter führt die Aktion „Angriff 3" aus, indem er eine Angriffs-Modifikatorkarte zieht. Dann liest jeder Charakter basierend auf seinem Trefferwert sein Ergebnis:\n\n3 ODER WENIGER: „Schwächling! Überstrengt euch nicht." Ihr verliert 5 Gold.\n\n4 ODER 5: „Nicht schlecht! Guter Treffer." Ihr erhaltet 5 Gold.\n\n6 ODER MEHR: DING! „Unglaublich! Ihr seid stärker als ein Inox!" Ihr erhaltet 5 Gold und beginnt das Szenario im Zustand SEGEN.',

    resultB: 'Вы уходите, уверяя себя, что и так знаете, насколько сильны. Насмехающиеся над вами дети совсем не задевают ваших чувств.\n\nВсе персонажи начинают сценарий в состоянии «ПРОКЛЯТИЕ».',

    resultBDe: 'Ihr geht, euch versichernd, dass ihr bereits wisst, wie stark ihr seid. Die über euch spottenden Kinder verletzen eure Gefühle überhaupt nicht.\n\nAlle Charaktere beginnen das Szenario im Zustand FLUCH.'

  },

  '12': {

    story: 'Вы прогуливаетесь по Монетному кварталу, когда из ближайшего окна выпрыгивает одетая в зелёное женщина в очках с широкой оправой и сбивает вас с ног. Из кармана плутовки просыпаются монеты и дорогие безделушки. Женщина отряхивается и замечает двух показавшихся из переулка стражей, чьё внимание привлекла суматоха.\n\n— Ха-ха-ха! Отличная шутка! — она театрально смеётся и хлопает вас по спине, разыгрывая представление для стражей. Плутовка вздрагивает, когда кто-то из них кричит: «Вор!» Стражи бросаются к вам, и женщина тихо говорит: «Подыграйте, и тогда мы все отсюда выберемся. Иначе нас всех посадят в Призрачную крепость, поняли?»',

    storyDe: 'Ihr schlendert durch das Münzviertel, als eine grün gekleidete Frau mit einer breiten Brillenfassung aus dem nächsten Fenster springt und euch umwirft. Aus der Tasche der Gaunerin fallen Münzen und teure Nippes. Die Frau schüttelt sich ab und bemerkt zwei Wachen, die aus einer Gasse auftauchen und durch den Aufruhr aufmerksam werden.\n\n— Ha-ha-ha! Toller Scherz! — Sie lacht theatralisch und klopft euch auf den Rücken, eine Vorstellung für die Wachen veranstaltend. Die Gaunerin zuckt zusammen, als einer von ihnen ruft: „Dieb!" Die Wachen stürmen auf euch zu, und die Frau sagt leise: „Spielt mit, und wir kommen alle hier raus. Sonst sperren sie uns alle in die Geisterfestung, verstanden?"',

    choiceA: 'сдать её стражам.',

    choiceADe: 'Sie den Wachen ausliefern.',

    choiceB: 'позволить плутовке использовать свои чары.',

    choiceBDe: 'Der Gaunerin erlauben, ihre Überzeugungskraft einzusetzen.',

    resultA: 'Вы указываете на плутовку, но та опережает вас.\n\n— Это они! Они выпрыгнули из окна и чуть не затоптали меня насмерть! — она прижимает к шее украденный жемчуг. — Пожалуйста, стражи, арестуйте их!\n\nСтражи игнорируют ваши смущённые протесты и надевают на вас железные кандалы. Когда они оборачиваются, чтобы продолжить допрос свидетельницы, её и след простыл. Даже после этого вам приходится дать взятку, чтобы вас отпустили.\n\nВы теряете суммарно 5 золотых.',

    resultADe: 'Ihr zeigt auf die Gaunerin, aber sie ist schneller.\n\n— Das waren die! Sie sind aus dem Fenster gesprungen und hätten mich beinahe zu Tode getrampelt! — Sie drückt die gestohlenen Perlen an ihren Hals. — Bitte, Wachen, verhaftet sie!\n\nDie Wachen ignorieren eure verwirrten Proteste und legen euch Eisenfesseln an. Als sie sich umdrehen, um die Zeugin weiterzubefragen, ist sie spurlos verschwunden. Selbst danach müsst ihr noch Schmiergeld zahlen, um freigelassen zu werden.\n\nIhr verliert zusammen 5 Gold.',

    resultB: 'Когда стражи подходят ближе, одетая в зелёное женщина падает в обморок, указывая в тёмный переулок:\n\n— Они пошли в ту сторону! Пожалуйста, сделайте что-нибудь. Мне кажется, они кого-то убили!\n\nСтражи, переглянувшись, бросаются в переулок.\n\n— Видите? Это было не так уж и трудно, не так ли? — язвит плутовка, наклоняясь за упавшей драгоценностью. — Вот, держите за беспокойство. А теперь вам лучше убраться отсюда, пока они не вернулись.\n\nВы получаете суммарно 10 золотых.',

    resultBDe: 'Als die Wachen näher kommen, fällt die grün gekleidete Frau in Ohnmacht und zeigt in eine dunkle Gasse:\n\n— Die sind da entlanggegangen! Bitte, tut etwas. Ich glaube, sie haben jemanden getötet!\n\nDie Wachen tauschen Blicke und stürmen in die Gasse.\n\n— Seht ihr? Das war doch gar nicht so schwer, oder? — stichelt die Gaunerin, während sie sich nach dem gefallenen Schmuckstück bückt. — Hier, nehmt das für eure Mühe. Und jetzt solltet ihr besser verschwinden, bevor sie zurückkommen.\n\nIhr erhaltet zusammen 10 Gold.'

  },

  '13': {

    story: 'Вы входите в «Спящий лев», где у барной стойки видите своего старого приятеля Ксаина. Бармен изо всех сил старается не обращать на него внимания. Когда вы входите, лицо Ксаина светлеет.\n\n— «Оскал»! Приятели! Мои единственные настоящие друзья! — ликует Ксаин. — Полагаю, вы пришли сюда, чтобы выплатить мне вознаграждение за управление?\n\nВы с недоумением смотрите на него. Он говорит медленнее:\n\n— Моё вознаграждение. За управление репутацией «Оскала льва». Я знаю, вы не следите за тем, что о вас думают люди, но я слежу. Чёрт возьми, да это же я начал называть вас «Оскалом»! Брендинг, понимаете? Разумеется, это чего-то да стоит.',

    storyDe: 'Ihr betretet den „Schlafenden Löwen", wo ihr euren alten Kumpel Xain an der Theke seht. Der Wirt strengt sich sehr an, ihn zu ignorieren. Als ihr eintretet, erhellt sich Xains Gesicht.\n\n— Der „Fletschende"! Freunde! Meine einzigen wahren Freunde! — jubelt Xain. — Ich nehme an, ihr seid hier, um mir meine Verwaltungsvergütung zu zahlen?\n\nIhr schaut ihn verwirrt an. Er spricht langsamer:\n\n— Meine Vergütung. Für die Verwaltung des Rufs des „Fletschenden Löwen". Ich weiß, ihr kümmert euch nicht darum, was die Leute über euch denken, aber ich schon. Verdammt nochmal, ich war es, der angefangen hat, euch „den Fletschenden" zu nennen! Branding, versteht ihr? Das hat natürlich seinen Preis.',

    choiceA: 'заплатить Ксаину за продвижение вашей репутации по городу.',

    choiceADe: 'Xain für die Förderung eures Rufs in der Stadt bezahlen.',

    choiceB: 'отказаться платить Ксаину. Если бы ваша репутация была так важна, вы бы сами за ней следили.',

    choiceBDe: 'Die Zahlung an Xain verweigern. Wenn euer Ruf so wichtig wäre, würdet ihr selbst darauf achten.',

    resultA: 'Ксаин уверяет, что ваша репутация безупречна.\n\n— Я уже говорил, что вы пользуетесь большим успехом в городе. Торговцы даже готовы предоставить небольшую скидку, только бы вы посетили их лавки.\n\nВы теряете суммарно 5 золотых.\nДо начала следующего сценария вы можете приобрести предметы из магазина на 5 золотых меньше их стоимости.',

    resultADe: 'Xain versichert euch, dass euer Ruf makellos ist.\n\n— Ich habe schon gesagt, dass ihr in der Stadt sehr beliebt seid. Die Händler sind sogar bereit, einen kleinen Rabatt zu gewähren, nur damit ihr ihre Läden besucht.\n\nIhr verliert zusammen 5 Gold.\nBis zum Beginn des nächsten Szenarios könnt ihr Gegenstände aus dem Laden für 5 Gold weniger als ihren Preis kaufen.',

    resultB: 'Ксаин качает головой.\n\n— Ух ты, кто-то действительно хочет испортить себе репутацию. Я это запишу, — он делает пометку в своей записной книжке, затем, уходя, бормочет: — Вам это ещё аукнется.\n\nНичего не происходит.',

    resultBDe: 'Xain schüttelt den Kopf.\n\n— Wow, jemand will sich wirklich seinen Ruf ruinieren. Das werde ich notieren, — er macht eine Notiz in sein Notizbuch, dann murmelt er beim Gehen: — Das wird euch noch leid tun.\n\nNichts passiert.'

  },

  '14': {

    story: 'У входа в святилище Великого дуба стоит человек в белых одеждах. Зычным голосом он кричит собравшейся толпе:\n\n— Пришло время платить десятину Великому дубу! Пожертвуйте на сохранение его величия, и он благословит вас доселе невиданным процветанием!\n\nОн обходит людей в толпе с грубо высеченной деревянной чашей.',

    storyDe: 'Am Eingang des Heiligtums der Großen Eiche steht ein Mann in weißen Gewändern. Mit lauter Stimme ruft er der versammelten Menge zu:\n\n— Es ist Zeit, den Zehnten an die Große Eiche zu zahlen! Spendet für die Bewahrung ihrer Größe, und sie wird euch mit noch nie dagewesenem Wohlstand segnen!\n\nEr geht durch die Menge mit einer grob geschnitzten Holzschale.',

    choiceA: 'пожертвовать святилищу Великого дуба.',

    choiceADe: 'Dem Heiligtum der Großen Eiche spenden.',

    choiceB: 'много людей жертвуют. У святилища и без вас будет неплохая неделя.',

    choiceBDe: 'Viele Menschen spenden. Das Heiligtum wird auch ohne euch eine gute Woche haben.',

    resultA: 'Вы проталкиваетесь вперёд, стремясь подать пример остальным. Служитель Дуба одобрительно смотрит на вас, и многие следуют вашему примеру.\n\nВсе теряете по 5 золотых.\nВсе персонажи начинают сценарий в состоянии «БЛАГОСЛОВЕНИЕ».',

    resultADe: 'Ihr drängt euch nach vorne und bemüht euch, anderen ein Beispiel zu geben. Der Diener der Eiche schaut euch wohlwollend an, und viele folgen eurem Beispiel.\n\nAlle verlieren je 5 Gold.\nAlle Charaktere beginnen das Szenario im Zustand SEGEN.',

    resultB: 'Служитель Дуба видит, как вы пытаетесь незаметно скрыться в толпе. Он выглядит недовольным и что-то бормочет себе под нос.\n\nВсе персонажи начинают сценарий в состоянии «ПРОКЛЯТИЕ».',

    resultBDe: 'Der Diener der Eiche sieht, wie ihr versucht, euch unauffällig in der Menge zu verstecken. Er sieht unzufrieden aus und murmelt etwas vor sich hin.\n\nAlle Charaktere beginnen das Szenario im Zustand FLUCH.'

  },

  '15': {

    story: 'Вы входите в «Спящий лев» и видите Ксаина — местного завсегдатая, которому, кажется, вечно не везёт. Бармен только что отказался налить ему, пока тот не заплатит по счёту, но, завидев вас, Ксаин оживляется.\n\n— О, отлично, это «Оскал»! Похоже, пора вам выплатить должок и угостить меня выпивкой. Что скажете?\n\nВы не помните, что должны ему выпивку. На самом деле вы абсолютно уверены, что после того, как избавили сад Ксаина от беса, должок за ним.',

    storyDe: 'Ihr betretet den „Schlafenden Löwen" und seht Xain — den lokalen Stammgast, dem es offenbar nie gut geht. Der Wirt hat ihm gerade verweigert, einzuschenken, bis er seine Rechnung bezahlt, aber als er euch sieht, belebt sich Xain.\n\n— Oh, toll, der „Fletschende"! Es scheint, es ist Zeit für euch, die Schuld zu begleichen und mir einen Drink zu spendieren. Was sagt ihr?\n\nIhr erinnert euch nicht, ihm einen Drink zu schulden. Tatsächlich seid ihr absolut sicher, dass nach der Befreiung von Xains Garten von einem Teufel er derjenige ist, der schuldet.',

    choiceA: 'это всего лишь одна кружка, не стоит добивать парня.',

    choiceADe: 'Es ist nur ein Krug, es lohnt sich nicht, den Mann zu zermürben.',

    choiceB: 'напомнить Ксаину, кто на самом деле должен.',

    choiceBDe: 'Xain daran erinnern, wer wirklich schuldet.',

    resultA: 'За пару монет вы угощаете Ксаина, и облегчение отражается на его лице. После нескольких кружек вам уже так хорошо, что неважно, кто кому должен. Главный итог приключений — это друзья, которых вы приобрели.\n\nВы теряете суммарно 5 золотых.\nВсе получают по 5 очков опыта.',

    resultADe: 'Für ein paar Münzen spendiert ihr Xain einen Drink, und Erleichterung zeichnet sich auf seinem Gesicht ab. Nach ein paar Krügen ist es euch schon so gut, dass es egal ist, wer wem schuldet. Das wichtigste Ergebnis von Abenteuern sind die Freunde, die man gewinnt.\n\nIhr verliert zusammen 5 Gold.\nAlle erhalten je 5 Erfahrungspunkte.',

    resultB: 'Вы припоминаете всё то, почему не должны Ксаину: случай, когда вы сняли его с городской стены; случай, когда вы доставили его коробку с гадюками на верфь; случай, когда он случайно поймал демона пряжкой своего ремня; случай, когда вы остановили драку между ним и камнем, который он считал саввасом; случай, когда вам пришлось отучать его от зелья выносливости; случай, когда вам пришлось отучать его от большого зелья выносливости; и случай, когда вы уничтожили «улей жнеца» на его кухне, который в итоге оказался муравьями из упавшего пирога. Вы вздыхаете, а потом всё равно покупаете ему выпить.\n\nВы теряете суммарно 5 золотых.',

    resultBDe: 'Ihr erinnert euch an all die Gründe, warum ihr Xain nichts schuldet: den Fall, als ihr ihn von der Stadtmauer heruntergeholt habt; den Fall, als ihr seine Kiste mit Vipern zur Werft gebracht habt; den Fall, als er versehentlich einen Teufel mit seiner Gürtelschnalle gefangen hat; den Fall, als ihr den Kampf zwischen ihm und einem Stein gestoppt habt, den er für einen Savvas hielt; den Fall, als ihr ihn vom Ausdauertrank entwöhnen musstet; den Fall, als ihr ihn vom großen Ausdauertrank entwöhnen musstet; und den Fall, als ihr das „Schnitterbiest-Nest" in seiner Küche vernichtet habt, das sich letztendlich als Ameisen aus einem gefallenen Kuchen herausstellte. Ihr seufzt und kauft ihm trotzdem etwas zu trinken.\n\nIhr verliert zusammen 5 Gold.'

  },

  '16': {

    story: 'В «Спящий лев» в сопровождении двух иноксов-телохранителей входит валратка в красном плаще. Под взглядами посетителей она подходит к вашему столику и устраивается напротив. Два телохранителя стоят в метре от валратки, не спуская глаз с остальных посетителей.\n\n— Меня зовут Джексера. Приятно познакомиться, — она лениво проводит рукой, украшенной золотыми кольцами, по деревянному столу. — В город прибывает мой караван с ценным грузом. Мне бы хотелось, чтобы вы помогли доставить товар на склад… Мне нужны лучшие. Это же вы, не так ли? — на её губах играет улыбка.\n\nЧто-то в этом предложении кажется вам подозрительным. Что вы можете сделать такого, чего не могут эти огромные иноксы?',

    storyDe: 'In den „Schlafenden Löwen" tritt eine Valrath-Frau in einem roten Umhang, begleitet von zwei Inox-Leibwächtern. Unter den Blicken der Gäste nähert sie sich eurem Tisch und lässt sich gegenüber nieder. Die zwei Leibwächter stehen einen Meter von der Valrath entfernt und lassen die anderen Gäste nicht aus den Augen.\n\n— Mein Name ist Jekserah. Angenehm, — sie fährt lässig mit einer hand, die mit Goldringen geschmückt ist, über den Holztisch. — In die Stadt kommt meine Karawane mit einer wertvollen Fracht. Ich würde gerne, dass ihr hilft, die Ware ins Lager zu bringen… Ich brauche die Besten. Das seid ihr, nicht wahr? — auf ihren Lippen spielt ein Lächeln.\n\nEtwas an diesem Angebot erscheint euch verdächtig. Was könnt ihr tun, was diese riesigen Inox nicht können?',

    choiceA: 'согласиться помочь с выгрузкой товара.',

    choiceADe: 'Zustimmen, beim Entladen der Ware zu helfen.',

    choiceB: 'отказать женщине. Что-то здесь не так.',

    choiceBDe: 'Die Frau ablehnen. Irgendetwas stimmt hier nicht.',

    resultA: 'Вы подходите к Западным вратам, но каравана нигде нет. Джексера сердито кричит на своих телохранителей. Судя по всему, груз украли в пути, но вы всё равно спрашиваете об оплате.\n\n— Я не собираюсь платить вам за то, чего вы не делали!\n\nВы настаиваете на своём, поскольку выполнили свою часть сделки. В конце концов, она протягивает вам несколько монет, но даёт понять, что не хочет иметь с вами ничего общего. Это чувство взаимно.\n\nВы получаете суммарно 10 золотых.',

    resultADe: 'Ihr geht zum Westtor, aber von der Karawane ist nirgends eine Spur. Jekserah schreit wütend ihre Leibwächter an. Offenbar wurde die Fracht unterwegs gestohlen, aber ihr fragt trotzdem nach Bezahlung.\n\n— Ich habe nicht vor, euch für das zu bezahlen, was ihr nicht getan habt!\n\nIhr besteht darauf, da ihr euren Teil der Vereinbarung erfüllt habt. Schließlich reicht sie euch ein paar Münzen, gibt aber zu verstehen, dass sie nichts mehr mit euch zu tun haben will. Das Gefühl beruht auf Gegenseitigkeit.\n\nIhr erhaltet zusammen 10 Gold.',

    resultB: 'Валратке не понравился ваш ответ — похоже, ей редко отказывают. Она раздражённо встаёт из-за стола: «Вы думаете, что вы единственные наёмники в городе? Я найду других идиотов, которые выполнят мой заказ».\n\nНичего не происходит.',

    resultBDe: 'Der Valrath hat eure Antwort nicht gefallen — offenbar wird sie selten abgewiesen. Sie steht gereizt vom Tisch auf: „Ihr denkt, ihr seid die einzigen Söldner in der Stadt? Ich werde andere Idioten finden, die meinen Auftrag ausführen."\n\nNichts passiert.'

  },

  '17': {

    story: 'Вы занимаетесь своими делами в «Спящем льве», когда к вашему столу подбегает неопрятная женщина-инокс — капитан торгового судна.\n\n— Мне посоветовали обратиться к вам, если возникнут проблемы, — говорит она. — С моего корабля в Старых доках пропало немало товара. Я отследила воров до заброшенного склада, но, кажется, их слишком много и мне с ними не справиться.\n\nВы ещё раз смотрите на огромного инокса и почёсываете в затылке. Это может быть прибыльным делом, если вас не убьют.',

    storyDe: 'Ihr erledigt eure Geschäfte im „Schlafenden Löwen", als eine ungepflegte Inox-Frau — Kapitänin eines Handelsschiffs — zu eurem Tisch läuft.\n\n— Man hat mir geraten, mich an euch zu wenden, wenn es Probleme gibt, — sagt sie. — Von meinem Schiff in den Alten Docks ist eine Menge Ware verschwunden. Ich habe die Diebe bis zu einem verlassenen Lagerhaus verfolgt, aber es scheinen zu viele zu sein, als dass ich mit ihnen fertigwerden könnte.\n\nIhr schaut noch einmal auf die riesige Inox und kratzt euch am Kopf. Das könnte ein einträgliches Geschäft sein, wenn ihr nicht getötet werdet.',

    choiceA: 'потребовать предоплату.',

    choiceADe: 'Eine Vorauszahlung fordern.',

    choiceB: 'согласиться на предложение.',

    choiceBDe: 'Das Angebot annehmen.',

    resultA: '— Я разве похожа на мешок с деньгами? — недовольно кричит инокс. Вы невольно начинаете ёрзать на стуле. — Так вы беретёсь за работу или нет? Не тратьте моё время!\n\nСценарий «Потерянный товар» (20) становится доступным.',

    resultADe: '— Sehe ich aus wie ein Geldsack? — schreit der Inox unzufrieden. Ihr beginnt unwillkürlich, auf dem Stuhl herumzuzappeln. — Also, nehmt ihr die Arbeit an oder nicht? Verschwendet nicht meine Zeit!\n\nSzenario „Verlorene Ware" (20) wird verfügbar.',

    resultB: 'Инокс с облегчением вздыхает, затем на её лице появляется улыбка.\n\n— Приятно знать, что я могу на вас рассчитывать, — говорит она. — Мы, отверженные, должны держаться вместе, правда?\n\nВы уже хотите поспорить с данной иноксом оценкой, когда она в знак благодарности достаёт несколько монет.\n\nВы получаете суммарно 5 золотых.\nСценарий «Потерянный товар» (20) становится доступным.',

    resultBDe: 'Der Inox atmet erleichtert aus, dann erscheint ein Lächeln auf ihrem Gesicht.\n\n— Es ist schön zu wissen, dass ich mich auf euch verlassen kann, — sagt sie. — Wir Ausgestoßenen müssen zusammenhalten, nicht wahr?\n\nIhr wollt gerade der Einschätzung des Inox widersprechen, als sie als Dankeschön ein paar Münzen herausholt.\n\nIhr erhaltet zusammen 5 Gold.\nSzenario „Verlorene Ware" (20) wird verfügbar.'

  },

  '18': {

    story: 'В «Спящий лев» входит богато одетый торговец-валрат, который здесь выглядит совершенно неуместно. Он оглядывает помещение, морщась от отвращения при виде происходящего внутри. В конце концов валрат замечает ваш столик и подходит.\n\n— Мне нужны ваши услуги, наёмники, — говорит он сквозь надушенный носовой платок. Торговец утверждает, что в Новых доках происходят какие-то странные, необъяснимые события: товары перемещаются или исчезают совсем, раздаются жуткие звуки, а кто-то уверяет, что видел ужасных демонов.\n\n— Я надеюсь, вы сможете провести расследование и помешать силам, плетущим заговор против нас.',

    storyDe: 'In den „Schlafenden Löwen" tritt ein reich gekleideter Valrath-Händler, der hier völlig fehl am Platz wirkt. Er schaut sich um und verzieht das Gesicht vor Ekel angesichts dessen, was sich drinnen abspielt. Schließlich bemerkt der Valrath euren Tisch und nähert sich.\n\n— Ich brauche eure Dienste, Söldner, — sagt er durch ein parfümiertes Taschentuch. Der Händler behauptet, in den Neuen Docks ereignen sich seltsame, unerklärliche Dinge: Waren bewegen sich oder verschwinden ganz, unheimliche Geräusche ertönen, und jemand besteht darauf, schreckliche Dämonen gesehen zu haben.\n\n— Ich hoffe, ihr könnt eine Untersuchung durchführen und die Kräfte aufhalten, die eine Verschwörung gegen uns spinnen.',

    choiceA: 'потребовать предоплату.',

    choiceADe: 'Eine Vorauszahlung fordern.',

    choiceB: 'согласиться на предложение.',

    choiceBDe: 'Das Angebot annehmen.',

    resultA: 'Ваша напористость приводит в ужас валрата, но вскоре он сдаётся и швыряет в вашу сторону несколько монет.\n\n— Ладно, просто разберитесь с этим побыстрее! — требует он, выбегая из заведения.\n\nВы получаете суммарно 5 золотых.\nСценарий «Приспешники хаоса» (21) становится доступным.',

    resultADe: 'Eure Hartnäckigkeit erschreckt den Valrath, aber er gibt bald nach und wirft euch ein paar Münzen zu.\n\n— Na gut, erledigt das nur schnell! — fordert er, während er aus dem Lokal läuft.\n\nIhr erhaltet zusammen 5 Gold.\nSzenario „Schergen des Chaos" (21) wird verfügbar.',

    resultB: '— Великолепно! — говорит валрат сквозь носовой платок. — Кажется, в этом месте даже малые деньги могут открыть перед вами большие возможности.\n\n— Если только вам удастся справиться с этим запахом, — добавляет он, поворачиваясь и выходя за дверь.\n\nСценарий «Приспешники хаоса» (21) становится доступным.',

    resultBDe: '— Ausgezeichnet! — sagt der Valrath durch sein Taschentuch. — Es scheint, dass in diesem Ort sogar wenig Geld euch große Möglichkeiten eröffnen kann.\n\n— Wenn ihr nur mit diesem Geruch fertigwerdet, — fügt er hinzu, während er sich umdreht und zur Tür geht.\n\nSzenario „Schergen des Chaos" (21) wird verfügbar.'

  },

  '19': {

    story: 'Вы допиваете уже третью кружку в «Спящем льве», когда из холодной ночи в трактир входит посыльный. Вы немного ворчите, когда пронизывающий ветер из открытой двери достигает вашего стола.\n\nПосыльный выглядит слегка потерянным. Он явно кого-то ищет, но ему не очень везёт.\n\n— Алый гвардеец, — нерешительно бормочет он. — Здесь есть алый гвардеец?',

    storyDe: 'Ihr trinkt gerade euren dritten Krug im „Schlafenden Löwen" aus, als aus der kalten Nacht ein Bote in die Taverne tritt. Ihr murrt ein wenig, als der schneidende Wind durch die offene Tür euren Tisch erreicht.\n\nDer Bote wirkt etwas verloren. Er sucht offensichtlich jemanden, hat aber nicht viel Glück.\n\n— Rotgardist, — murmelt er zögerlich. — Gibt es hier einen Rotgardisten?',

    choiceA: 'выслушать посыльного (в отряде должен быть алый гвардеец).',

    choiceADe: 'Den Boten anhören (es muss einen Rotgardisten in der Gruppe geben).',

    choiceB: 'не обращать внимания на человека и ветер.',

    choiceBDe: 'Den Mann und den Wind ignorieren.',

    resultA: 'Посыльный протягивает письмо, и лицо алого гвардейца мрачнеет. На пергаменте нет ничего, кроме изображения змеи, обвившейся вокруг солнца. Однако алому гвардейцу требуется ещё несколько рюмок, прежде чем он начинает говорить. Он объясняет, что изгнание из Алого ордена в Джинде обычно означает смерть, но алый гвардеец сбежал в Мрачную гавань. Теперь же судьба настигла его. На обороте указано место. Алому гвардейцу нужно идти, иначе на него объявят охоту.\n\nСценарий «Недружественное послание» (22) становится доступным.',

    resultADe: 'Der Bote reicht einen Brief, und das Gesicht des Rotgardisten wird düster. Auf dem Pergament ist nichts außer dem Bild einer Schlange, die sich um eine Sonne windet. Jedoch braucht der Rotgardist noch ein paar Gläser, bevor er zu reden beginnt. Er erklärt, dass Verbannung aus dem Roten Orden in Jhinda üblicherweise den Tod bedeutet, aber der Rotgardist ist nach Düsterhaven geflohen. Jetzt hat ihn das Schicksal eingeholt. Auf der Rückseite steht ein Ort. Der Rotgardist muss gehen, sonst wird eine Jagd auf ihn ausgerufen.\n\nSzenario „Unfreundliche Botschaft" (22) wird verfügbar.',

    resultB: 'Посыльный в конце концов уходит, выглядя ещё более смущённым, чем когда он вошёл.\n\nРазыграйте ещё одну карту событий.',

    resultBDe: 'Der Bote geht schließlich, wirkt noch verwirrter als beim Eintreten.\n\nSpielt eine weitere Ereigniskarte aus.'

  },

  '20': {

    story: 'Вы наслаждаетесь закуской из мяса неизвестного происхождения, купленной у уличного торговца — куатрила на мосту Безмолвия. Вдруг ваше внимание привлекает любопытный плакат. Он рекламирует грандиозное соревнование бойцов, которое пройдёт через несколько дней на Площади Мрачной гавани.\n\nСначала вы считаете, что это пустая трата времени, но, возможно, кто-то из вас захочет проявить себя.',

    storyDe: 'Ihr genießt einen Imbiss aus Fleisch unbekannter Herkunft, der von einem Straßenhändler — einem Quatryl auf der Brücke der Stille — gekauft wurde. Plötzlich erregt ein merkwürdiges Plakat eure Aufmerksamkeit. Es bewirbt ein großartiges Kämpferturnier, das in ein paar Tagen auf dem Platz von Düsterhaven stattfinden soll.\n\nZuerst haltet ihr es für Zeitverschwendung, aber vielleicht möchte jemand von euch sich beweisen.',

    choiceA: 'записаться на соревнование (в отряде должен быть тесак).',

    choiceADe: 'Sich für das Turnier anmelden (es muss ein Axtwerfer in der Gruppe geben).',

    choiceB: 'игнорировать плакат и продолжать наслаждаться закуской.',

    choiceBDe: 'Das Plakat ignorieren und weiter den Imbiss genießen.',

    resultA: 'Тесак горит желанием принять участие в соревновании и доказать, что он самый лучший боец, так что вы помогаете ему. Но поскольку здесь каждый борется сам за себя, остальным придётся поддерживать с трибун.\n\nСценарий «Лучший из лучших» (23) становится доступным.',

    resultADe: 'Der Axtwerfer brennt darauf, am Turnier teilzunehmen und zu beweisen, dass er der beste Kämpfer ist, also helft ihr ihm dabei. Aber da hier jeder für sich kämpft, müssen die anderen von den Rängen aus anfeuern.\n\nSzenario „Der Beste der Besten" (23) wird verfügbar.',

    resultB: 'Мясо очень вкусное, хотя примерно через час у вас начинает болеть живот.\n\nРазыграйте ещё одну карту событий.',

    resultBDe: 'Das Fleisch ist sehr lecker, obwohl euch nach ungefähr einer Stunde der Bauch schmerzt.\n\nSpielt eine weitere Ereigniskarte aus.'

  },

  '21': {

    story: 'Ваши кошельки опустели после неудачной ночи азартных игр в «Спящем льве». Вы размышляете о том, как сжульничать, не попавшись, когда сильное негативное чувство накатывает на вас.\n\nЧувство вины? Возможно. Но кажется, это что-то более страшное. Вы пытаетесь сосредоточиться на игре, но нечто ужасное не даёт вам покоя.',

    storyDe: 'Eure Geldbeutel sind nach einer unglücklichen Spielnacht im „Schlafenden Löwen" leer. Ihr überlegt, wie ihr schummeln könntet, ohne erwischt zu werden, als ein starkes negatives Gefühl über euch hereinbricht.\n\nSchuldgefühle? Vielleicht. Aber es fühlt sich nach etwas Schlimmerem an. Ihr versucht, euch auf das Spiel zu konzentrieren, aber etwas Schreckliches lässt euch keine Ruhe.',

    choiceA: 'попытаться найти источник негативной энергии (в отряде должна быть жрица Пустоты).',

    choiceADe: 'Versuchen, die Quelle der negativen Energie zu finden (es muss eine Leerehüterin in der Gruppe geben).',

    choiceB: 'отогнать неприятное чувство и сосредоточиться на игре.',

    choiceBDe: 'Das unangenehme Gefühl abschütteln und sich auf das Spiel konzentrieren.',

    resultA: 'Жрица Пустоты выходит из «Спящего льва» и протягивает руку к небу. Очень скоро она в панике поворачивается к вам и сообщает, что с Пустотой что-то не так. То, что находится внутри неё, шевелится, и грядёт что-то ужасное.\n\nСценарий «Охраняя Пустоту» (24) становится доступным.',

    resultADe: 'Die Leerehüterin tritt aus dem „Schlafenden Löwen" und streckt die Hand zum Himmel aus. Sehr bald dreht sie sich in Panik zu euch und teilt mit, dass mit der Leere etwas nicht stimmt. Das, was sich in ihr befindet, bewegt sich, und etwas Schreckliches steht bevor.\n\nSzenario „Die Leere bewachen" (24) wird verfügbar.',

    resultB: 'В конце концов, удача поворачивается к вам лицом, и вы отыгрываетесь. Наверное, это чувство не было таким уж негативным.\n\nРазыграйте ещё одну карту событий.',

    resultBDe: 'Schließlich wendet sich das Glück euch zu, und ihr holt euch das Verlorene zurück. Wahrscheinlich war das Gefühl doch nicht so negativ.\n\nSpielt eine weitere Ereigniskarte aus.'

  },

  '22': {

    story: 'Вы прогуливаетесь по Новому рынку, разглядывая невероятно дорогие товары, которые вы никогда не сможете себе позволить, когда замечаете угрюмого мужчину, пробирающегося через толпу. Он явно не из местных.\n\nЕсли бы вас попросили угадать, кто это, вы бы сказали, что он плотник. Когда мужчина подходит ближе, у вас почему-то возникает чувство, будто вы знакомы.',

    storyDe: 'Ihr schlendert über den Neuen Markt und betrachtet unglaublich teure Waren, die ihr euch niemals leisten könntet, als ihr einen düsteren Mann bemerkt, der sich durch die Menge drängt. Er ist offensichtlich kein Einheimischer.\n\nWenn ihr gebeten würdet zu raten, wer er ist, würdet ihr sagen, er sei ein Zimmermann. Als der Mann näher kommt, habt ihr irgendwie das Gefühl, ihn zu kennen.',

    choiceA: 'поздороваться с мужчиной (в отряде должен быть подрывник).',

    choiceADe: 'Den Mann begrüßen (es muss eine Sprengmeisterin in der Gruppe geben).',

    choiceB: 'игнорировать возникшее чувство и продолжить заниматься своими делами.',

    choiceBDe: 'Das aufkommende Gefühl ignorieren und weiter den eigenen Geschäften nachgehen.',

    resultA: 'Лицо мужчины светится, когда вы подходите к нему. Вы узнаёте прежнего начальника подрывника. Он действительно рад встрече с вами, так как у него есть подходящая для вас работа — нужно снести здание в Монетном квартале. Богатый торговец выкупил эту собственность, чтобы расширить своё поместье. Беда в том, что, по слухам, предыдущий владелец в припадке ярости проклял это здание. Уничтожить его может быть непростой задачей.\n\nСценарий «Лучшая работа в мире» (25) становится доступным.',

    resultADe: 'Das Gesicht des Mannes strahlt, als ihr auf ihn zugeht. Ihr erkennt den früheren Vorgesetzten der Sprengmeisterin. Er freut sich wirklich, euch zu sehen, da er eine passende Arbeit für euch hat — ein Gebäude im Münzviertel muss abgerissen werden. Ein reicher Händler hat das Grundstück gekauft, um sein Anwesen zu erweitern. Das Problem ist, dass dem Vernehmen nach der Vorbesitzer das Gebäude in einem Wutanfall verflucht hat. Es zu zerstören könnte eine schwierige Aufgabe sein.\n\nSzenario „Der beste Job der Welt" (25) wird verfügbar.',

    resultB: 'Пройдя ещё немного, вы замечаете поистине удивительный гобелен, на котором вышита сцена из великой битвы между людьми и валратами. Говорят, этот гобелен извлекли из древнего хранилища в Демонических вратах. Он стоит больше денег, чем вы потратили за всю свою жизнь.\n\nРазыграйте ещё одну карту событий.',

    resultBDe: 'Etwas weiter bemerkt ihr einen wirklich erstaunlichen Wandteppich, auf dem eine Szene aus einer großen Schlacht zwischen Menschen und Valrath gestickt ist. Man sagt, dieser Wandteppich wurde aus einem alten Lager an den Dämonengattern geborgen. Er ist mehr wert als alles Geld, das ihr in eurem ganzen Leben ausgegeben habt.\n\nSpielt eine weitere Ereigniskarte aus.'

  }

};



// ─── Battle Goals

// ─── Battle Goals ─────────────────────────────────────

const GOALS = [

  {id:286,nameRu:'Акробат',nameDe:'Akrobat',

    conditionRu:'Положить карту в «Потери», чтобы предотвратить 5+ урона',

    conditionDe:'Eine Karte in den Verluststapel legen, um 5 oder mehr Schaden zu verhindern'},

  {id:287,nameRu:'Агорафоб',nameDe:'Agoraphob',

    conditionRu:'Каждый ход заканчивать рядом со стеной или препятствием',

    conditionDe:'Jeden Zug neben einer Wand oder einem Hindernis beenden'},

  {id:288,nameRu:'Альтруист',nameDe:'Altruist',

    conditionRu:'Добыть меньше монет, чем любой другой персонаж',

    conditionDe:'Weniger Münzen plündern als jeder andere Charakter'},

  {id:289,nameRu:'Ассистент',nameDe:'Gehilfe',

    conditionRu:'Убить монстра, уже атакованного союзником в этом раунде',

    conditionDe:'Einen Monster töten, der in dieser Runde bereits von einem Verbündeten angegriffen wurde'},

  {id:290,nameRu:'Крепыш',nameDe:'Standhalter',

    conditionRu:'Не передвигаться с клетки, соседней с монстром',

    conditionDe:'Kein Feld verlassen, das an einen Monster angrenzt'},

  {id:291,nameRu:'Добиватель',nameDe:'Vollstrecker',

    conditionRu:'Последним убить монстра',

    conditionDe:'Den letzten Treffer auf einen Monster landen'},

  {id:292,nameRu:'Хранитель',nameDe:'Bewahrer',

    conditionRu:'Не класть карты в «Потери» для отмены урона',

    conditionDe:'Keine Karten in den Verluststapel legen, um Schaden zu verhindern'},

  {id:293,nameRu:'Крепкий орешек',nameDe:'Zäher Brocken',

    conditionRu:'ОЗ не опускается ниже половины максимума',

    conditionDe:'Trefferpunkte sinken nie unter die Hälfte des Maximums'},

  {id:294,nameRu:'Эгоист',nameDe:'Egoist',

    conditionRu:'Добыть больше монет, чем любой другой персонаж',

    conditionDe:'Mehr Münzen plündern als jeder andere Charakter'},

  {id:295,nameRu:'Живучий',nameDe:'Unverwüstlich',

    conditionRu:'В конце сценария ОЗ = максимальному',

    conditionDe:'Am Ende des Szenarios volle Trefferpunkte haben'},

  {id:296,nameRu:'Азартный',nameDe:'Hasardeur',

    conditionRu:'Убить монстра атакой с затруднением',

    conditionDe:'Einen Monster mit einer Erschwernis-Attacke töten'},

  {id:297,nameRu:'Горячая голова',nameDe:'Hitzkopf',

    conditionRu:'Применить 2 способности «Потери» до первого отдыха',

    conditionDe:'2 Verlust-Fähigkeiten vor der ersten Rast einsetzen'},

  {id:298,nameRu:'Бессонница',nameDe:'Schlaflos',

    conditionRu:'Получить урон в раунде объявления долгого отдыха',

    conditionDe:'In der Runde, in der eine lange Rast angekündigt wird, Schaden erleiden'},

  {id:299,nameRu:'Мазохист',nameDe:'Masochist',

    conditionRu:'В конце сценария ОЗ не больше 3',

    conditionDe:'Am Ende des Szenarios 3 oder weniger Trefferpunkte haben'},

  {id:300,nameRu:'Грабитель',nameDe:'Räuber',

    conditionRu:'В один ход убить монстра и подобрать его монету',

    conditionDe:'In einem Zug einen Monster töten und seine Münze aufheben'},

  {id:301,nameRu:'Зачинщик',nameDe:'Vorreiter',

    conditionRu:'Первым убить любого монстра',

    conditionDe:'Als Erster irgendeinen Monster töten'},

  {id:302,nameRu:'Пацифист',nameDe:'Pazifist',

    conditionRu:'Убить не больше 3 монстров',

    conditionDe:'Nicht mehr als 3 Monster töten'},

  {id:303,nameRu:'Карманник',nameDe:'Taschendieb',

    conditionRu:'Рядом с 2+ монстрами добыть монету действием «Добыча»',

    conditionDe:'Eine Münze mit der Aktion „Plündern" aufheben, während 2 oder mehr Monster benachbart sind'},

  {id:304,nameRu:'Провокатор',nameDe:'Provokateur',

    conditionRu:'Стать целью 3+ монстров в одном раунде',

    conditionDe:'In einer Runde das Ziel von 3 oder mehr Monstern werden'},

  {id:305,nameRu:'Разборчивый',nameDe:'Wählerisch',

    conditionRu:'Не убивать мощных монстров и боссов',

    conditionDe:'Keine Elite-Monster oder Bosse töten'},

  {id:306,nameRu:'Трезвенник',nameDe:'Abstinenzler',

    conditionRu:'Не использовать зелья',

    conditionDe:'Keine Tränke verwenden'},

  {id:307,nameRu:'Разрушитель',nameDe:'Verwüster',

    conditionRu:'В один ход применить 2 способности «Потери»',

    conditionDe:'In einem Zug 2 Verlust-Fähigkeiten einsetzen'},

  {id:308,nameRu:'Отшельник',nameDe:'Einsiedler',

    conditionRu:'Не заканчивать ход рядом с союзником',

    conditionDe:'Keinen Zug neben einem Verbündeten beenden'},

  {id:309,nameRu:'Садист',nameDe:'Sadist',

    conditionRu:'Убить не менее 5 монстров',

    conditionDe:'Mindestens 5 Monster töten'},

  {id:310,nameRu:'Торопыга',nameDe:'Hasenfuß',

    conditionRu:'Не использовать долгий отдых',

    conditionDe:'Keine lange Rast machen'},

  {id:311,nameRu:'Тень',nameDe:'Schatten',

    conditionRu:'Каждый ход заканчивать рядом с союзником',

    conditionDe:'Jeden Zug neben einem Verbündeten beenden'},

  {id:312,nameRu:'Безумец',nameDe:'Wahnsinniger',

    conditionRu:'Рядом с монстром убить другого монстра не рядом с вами',

    conditionDe:'Einen Monster töten, der nicht an dich angrenzt, während du neben einem anderen Monster stehst'},

  {id:313,nameRu:'Специалист',nameDe:'Spezialist',

    conditionRu:'Не использовать стандартные способности',

    conditionDe:'Keine Standard-Fähigkeiten einsetzen'},

  {id:314,nameRu:'Копуша',nameDe:'Zauderer',

    conditionRu:'Не использовать передышку',

    conditionDe:'Keine kurze Rast machen'},

  {id:315,nameRu:'Первопроходец',nameDe:'Pionier',

    conditionRu:'В один ход открыть дверь и войти в открытую комнату',

    conditionDe:'In einem Zug eine Tür öffnen und den neu geöffneten Raum betreten'},

  {id:316,nameRu:'Заразный',nameDe:'Ansteckend',

    conditionRu:'В отрицательном состоянии наложить его на монстра',

    conditionDe:'Einen negativen Zustand, unter dem du leidest, auf einen Monster übertragen'},

  {id:317,nameRu:'Слабое звено',nameDe:'Schwaches Glied',

    conditionRu:'Стать первым изнурённым персонажем',

    conditionDe:'Als Erster erschöpft werden'},

];



// ─── Shop Items ───────────────────────────────────────

const ITEMS = typeof ITEMS_DATA !== 'undefined' ? ITEMS_DATA : [];


const LEVEL_ORDER = ['Tut.A','Tut.B','1','X','2','3','4','5','6','7','8','9'];
