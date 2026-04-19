/**
 * ITEMS DATA — Gloomhaven: Jaws of the Lion
 *
 * Заповни поля nameRu, nameDe, descRu, descDe, price для кожного предмета.
 * price — число (золоті монети).
 *
 * ЛОГІКА ВІДКРИТТЯ В МАГАЗИНІ:
 *   01–13  → доступні з початку гри
 *   14     → після місії 3 (нагорода)
 *   15–20  → кнопка «Відкрити» в магазині після місії 9
 *   21–28  → кнопка «Відкрити» в магазині після місії 15
 *   29+    → окремі нагороди за місії / події / скрині
 *            (відкриваються вручну через поле в магазині)
 */

const ITEMS_DATA = [
  { id: '001', nameRu: 'Очки орлиного взора', nameDe: 'Adleraugenbrille', descRu: 'Во время вашей атаки получите преимущество для всех атак текущей способности.', descDe: 'Während deines Angriffs erhalten alle Angriffe der aktuellen Fähigkeit Vorteil.', price: 30 },
  { id: '002', nameRu: 'Железный шлем', nameDe: 'Eisenhelm', descRu: 'Когда вас атакуют, считайте вытянутые врагами карты модификаторов атаки x2 картами +0.', descDe: 'Wenn du angegriffen wirst, werden von Gegnern gezogene x2-Angriffsmodifikatorkarten als +0-Karten behandelt.', price: 20 },
  { id: '003', nameRu: 'Кольчуга', nameDe: 'Kettenrüstung', descRu: 'В ваш ход получите свойство «Щит 1» до конца раунда.', descDe: 'In deinem Zug erhältst du bis zum Ende der Runde „Schild 1“.', price: 30 },
  { id: '004', nameRu: 'Клёпаная броня', nameDe: 'Nietenrüstung', descRu: 'Когда вас атакуют (перед вытягиванием модификатора атаки), эта атака проводится с затруднением, а вы получаете свойство «Щит 1» для этой атаки.', descDe: 'Wenn du angegriffen wirst, vor dem Ziehen eines Angriffsmodifikators, wird dieser Angriff mit Nachteil ausgeführt, und du erhältst für diesen Angriff „Schild 1“.', price: 25 },
  { id: '005', nameRu: 'Ношеные сапоги', nameDe: 'Abgetragene Stiefel', descRu: 'Во время вашего движения добавьте +1 к одному действию движения.', descDe: 'Während deiner Bewegung erhält eine Bewegungsaktion +1.', price: 15 },
  { id: '006', nameRu: 'Крылатые ботинки', nameDe: 'Flügelschuhe', descRu: 'Во время вашего движения добавьте эффект «Прыжок» ко всем действиям движения текущей способности.', descDe: 'Während deiner Bewegung erhalten alle Bewegungsaktionen der aktuellen Fähigkeit „Sprung“.', price: 15 },
  { id: '007', nameRu: 'Треугольный щит', nameDe: 'Dreiecksschild', descRu: 'Когда вы получаете урон от атаки, получите свойство «Щит 1» для этой атаки.', descDe: 'Wenn du Schaden durch einen Angriff erleidest, erhalte für diesen Angriff „Schild 1“.', price: 20 },
  { id: '008', nameRu: 'Метательный молот', nameDe: 'Wurfhammer', descRu: 'Во время вашей дальней атаки добавьте эффект «Оглушение» к одной атаке.', descDe: 'Während deines Fernangriffs erhält ein Angriff „Betäubung“.', price: 30 },
  { id: '009', nameRu: 'Отравленный кинжал', nameDe: 'Giftdolch', descRu: 'Во время вашей ближней атаки добавьте эффект «Отравление» к одной атаке.', descDe: 'Während deines Nahkampfangriffs erhält ein Angriff „Gift“.', price: 20 },
  { id: '010', nameRu: 'Железное копьё', nameDe: 'Eisenspeer', descRu: 'Во время вашего действия ближней атаки, нацеленного на одного врага, вы можете атаковать любого одного врага в пределах двух клеток.', descDe: 'Während deiner Nahkampfangriffsaktion, die einen einzelnen Gegner zum Ziel hat, kannst du stattdessen einen beliebigen einzelnen Gegner innerhalb von Reichweite 2 angreifen.', price: 20 },
  { id: '011', nameRu: 'Лечебное зелье', nameDe: 'Heiltrank', descRu: 'В ваш ход выполните действие «Лечение 3 (на себя)».', descDe: 'Führe in deinem Zug „Heilung 3 (Selbst)“ aus.', price: 10 },
  { id: '012', nameRu: 'Зелье выносливости', nameDe: 'Ausdauertrank', descRu: 'В ваш ход верните на руку 1 карту из вашей стопки «Сброс».', descDe: 'Nimm in deinem Zug 1 Karte von deinem Ablagestapel auf die Hand zurück.', price: 10 },
  { id: '013', nameRu: 'Зелье силы', nameDe: 'Krafttrank', descRu: 'Во время вашей атаки добавьте +1 ко всем атакам текущей способности.', descDe: 'Während deines Angriffs erhalten alle Angriffe der aktuellen Fähigkeit +1.', price: 10 },

  { id: '014', nameRu: 'Зелье маны', nameDe: 'Manatrank', descRu: 'В ваш ход повысьте заряд любой стихии.', descDe: 'Stärke in deinem Zug ein beliebiges Element.', price: 10 },

  { id: '015', nameRu: 'Амулет жизни', nameDe: 'Amulett des Lebens', descRu: 'В ваш ход выполните действие «Лечение 1 (на себя)».', descDe: 'Führe in deinem Zug „Heilung 1 (Selbst)“ aus.', price: 20 },
  { id: '016', nameRu: 'Мантия воплощения', nameDe: 'Mantel der Verkörperung', descRu: 'Во время вашей атаки используйте любую стихию, чтобы добавить +1 ко всем атакам текущей способности.', descDe: 'Während deines Angriffs kannst du ein beliebiges Element verbrauchen. Falls du das tust, erhalten alle Angriffe der aktuellen Fähigkeit +1.', price: 40 },
  { id: '017', nameRu: 'Удобные башмаки', nameDe: 'Bequeme Stiefel', descRu: 'Каждый раз, когда вы применяете нижнюю способность карты как стандартную, выполняйте действие «Движение 3» вместо действия «Движение 2».', descDe: 'Jedes Mal, wenn du die untere Kartenhälfte als Standardfähigkeit verwendest, führe statt „Bewegung 2“ „Bewegung 3“ aus.', price: 30 },
  { id: '018', nameRu: 'Боевой топор', nameDe: 'Kampfaxt', descRu: 'Во время вашего действия ближней атаки, нацеленного на одного врага, вместо этого выполните его в следующей целевой области.', descDe: 'Während deiner Nahkampfangriffsaktion, die einen einzelnen Gegner zum Ziel hat, führe sie stattdessen im angegebenen Wirkungsbereich aus.', price: 25 },
  { id: '019', nameRu: 'Чёрная свеча', nameDe: 'Schwarze Kerze', descRu: 'Во время вашей дальней атаки добавьте эффект «Проклятие» к одной атаке.', descDe: 'Während deines Fernangriffs erhält ein Angriff „Fluch“.', price: 40 },
  { id: '020', nameRu: 'Ослепляющая пыль', nameDe: 'Blendstaub', descRu: 'Во время вашей атаки добавьте эффект «Оглушение» к одной атаке.', descDe: 'Während deines Angriffs erhält ein Angriff „Betäubung“.', price: 20 },

  { id: '021', nameRu: 'Шлем ястреба', nameDe: 'Habichtshelm', descRu: 'Во время вашей дальней атаки добавьте +1 к дальности всех атак текущей способности.', descDe: 'Während deines Fernangriffs erhalten alle Angriffe der aktuellen Fähigkeit +1 Reichweite.', price: 20 },
  { id: '022', nameRu: 'Доспех лезвий', nameDe: 'Klingenrüstung', descRu: 'В случае получения урона от атаки получите свойство «Щит 2» для этой атаки. Атакующий получает 2 урона.', descDe: 'Wenn du Schaden durch einen Angriff erleidest, erhalte für diesen Angriff „Schild 2“. Der Angreifer erleidet 2 Schaden.', price: 45 },
  { id: '023', nameRu: 'Сапоги большого шага', nameDe: 'Stiefel des großen Schritts', descRu: 'Во время вашего движения добавьте +2 к одному действию движения.', descDe: 'Während deiner Bewegung erhält eine Bewegungsaktion +2.', price: 30 },
  { id: '024', nameRu: 'Зажигательная бомба', nameDe: 'Brandbombe', descRu: 'Во время вашего действия дальней атаки, нацеленного на одного врага, вместо этого выполните его в следующей целевой области.', descDe: 'Während deiner Fernangriffsaktion, die einen einzelnen Gegner zum Ziel hat, führe sie stattdessen im angegebenen Wirkungsbereich aus.', price: 40 },
  { id: '025', nameRu: 'Цепь с крюком', nameDe: 'Hakenkette', descRu: 'Во время вашей дальней атаки добавьте эффект «Притянуть 2» к одной атаке.', descDe: 'Während deines Fernangriffs erhält ein Angriff „Heranziehen 2“.', price: 30 },
  { id: '026', nameRu: 'Оберег Дуба', nameDe: 'Eichenamulett', descRu: 'В ваш ход выполните действие «Благословение, дальность 5».', descDe: 'Führe in deinem Zug „Segen, Reichweite 5“ aus.', price: 30 },
  { id: '027', nameRu: 'Компас обречения', nameDe: 'Kompass des Verderbens', descRu: 'В ваш ход заставьте врага в пределах дальности 3 выполнить под вашим управлением действие «Движение 2».', descDe: 'In deinem Zug kannst du einen Gegner innerhalb von Reichweite 3 zwingen, unter deiner Kontrolle „Bewegung 2“ auszuführen.', price: 25 },
  { id: '028', nameRu: 'Изъеденная молью шаль', nameDe: 'Mottenzerfressener Schal', descRu: 'При выборе врагами цели ваша инициатива считается равной 99.', descDe: 'Bei der Wahl eines Ziels durch Gegner gilt deine Initiative als 99.', price: 10 },

  { id: '029', nameRu: 'Осадный щит', nameDe: 'Belagerungsschild', descRu: 'Когда вы получаете урон от атаки, получите свойство «Щит 2» для этой атаки.', descDe: 'Wenn du Schaden durch einen Angriff erleidest, erhalte für diesen Angriff „Schild 2“.', price: 40 },
  { id: '030', nameRu: 'Кольцо спешки', nameDe: 'Ring der Eile', descRu: 'В конце вашего хода разыграйте 1 карту с вашей руки и немедленно примените её нижнюю способность.', descDe: 'Spiele am Ende deines Zuges 1 Karte von deiner Hand aus und wende sofort ihre untere Fähigkeit an.', price: 40 },
  { id: '031', nameRu: 'Кольцо силы', nameDe: 'Ring der Kraft', descRu: 'В ваш ход получите свойство «Усиление».', descDe: 'In deinem Zug erhalte den Zustand „Stärkung“.', price: 40 },
  { id: '032', nameRu: 'Кольцо восстановления', nameDe: 'Ring der Wiederherstellung', descRu: 'В ваш ход выполните действие «Лечение 3, дальность 5».', descDe: 'Führe in deinem Zug „Heilung 3, Reichweite 5“ aus.', price: 40 },
  { id: '033', nameRu: 'Стальное кольцо', nameDe: 'Stahlring', descRu: 'Когда вы получаете урон от атаки, нацеленной на вас, получите свойство «Щит 4» для этой атаки.', descDe: 'Wenn du Schaden durch einen auf dich gerichteten Angriff erleidest, erhalte für diesen Angriff „Schild 4“.', price: 30 },
  { id: '034', nameRu: 'Зазубренный топор', nameDe: 'Gezackte Axt', descRu: 'Во время вашей атаки добавьте эффект «Рана» ко всем атакам текущей способности.', descDe: 'Während deines Angriffs erhalten alle Angriffe der aktuellen Fähigkeit „Wunde“.', price: 40 },
  { id: '035', nameRu: 'Мантия призыва', nameDe: 'Robe der Beschwörung', descRu: 'В ваш ход один союзник на соседней клетке может выполнить действие «Атака 2».', descDe: 'In deinem Zug kann ein Verbündeter auf einem benachbarten Feld „Angriff 2“ ausführen.', price: 40 },
  { id: '036', nameRu: 'Реактивные сапоги', nameDe: 'Raketenstiefel', descRu: 'Во время вашего движения добавьте +1 и эффект «Прыжок» к одному действию движения.', descDe: 'Während deiner Bewegung füge einer Bewegungsaktion +1 und „Sprung“ hinzu.', price: 30 },
];
