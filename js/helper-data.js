const HELPER_DATA = {
  "meta": {
    "project": "Gloomhaven: Jaws of the Lion / Челюсти Льва",
    "language": "ru+de",
    "version": "3.0",
    "intended_use": "offline_browser_helper",
    "format_notes": [
      "Большой офлайн-справочник для браузерного хелпера.",
      "Содержит быстрый референс, глоссарий терминов и FAQ.",
      "Тексты адаптированы под удобное чтение в интерфейсе и не являются дословной копией PDF."
    ],
    "source_files": [
      "Gloomhaven_Chelyusti_Lva_Rules.pdf",
      "Gloomhaven_Chelyusti_Lva_Spravochnik.pdf",
      "RULES_QUICK_REFERENCE_FOR_AI.md"
    ],
    "counts": {
      "quick_reference_sections": 18,
      "glossary_entries": 95,
      "faq_entries": 25
    },
    "projectDe": "Gloomhaven: Die Pranken des Löwen / Cheljusti Lva"
  },
  "quick_reference": {
    "title": "Быстрый референс",
    "sections": [
      {
        "id": "round_flow",
        "title": "Ход раунда",
        "items": [
          "1. Все игроки скрытно выбирают 2 карты.",
          "2. Определите инициативу: у персонажа — по ведущей карте, у монстров — по карте способности типа монстра.",
          "3. Все фигуры совершают ходы от меньшей инициативы к большей.",
          "4. В конце раунда обновите колоды с символом перемешивания, стихии и эффекты."
        ],
        "titleDe": "Rundenablauf",
        "itemsDe": [
          "1. Alle Spieler wählen verdeckt 2 Karten.",
          "2. Bestimmt die Initiative: bei Charakteren über die Leitkarte, bei Monstern über die Fähigkeitskarte des Monstertyps.",
          "3. Alle Figuren fuehren ihre Züge in aufsteigender Initiativereihenfolge aus.",
          "4. Am Ende der Runde werden Decks mit Neumischen-Symbol, Elemente und Effekte aktualisiert."
        ]
      },
      {
        "id": "basic_card_rules",
        "title": "Карты способностей",
        "items": [
          "В свой ход примените верх одной карты и низ другой.",
          "Вместо половины карты можно использовать стандартное действие: Атака 2 сверху или Движение 2 снизу.",
          "Пунктир внутри половины карты разделяет отдельные действия, которые выполняются по порядку.",
          "Нельзя использовать две верхние или две нижние половины."
        ],
        "titleDe": "Fähigkeitskarten",
        "itemsDe": [
          "In deinem Zug spielst du die obere Hälfte einer Karte und die untere Hälfte einer anderen.",
          "Anstelle einer Kartenhälfte kannst du eine Standardaktion verwenden: Angriff 2 oben oder Bewegung 2 unten.",
          "Eine gestrichelte Linie innerhalb einer Kartenhälfte trennt einzelne Aktionen, die in Reihenfolge ausgeführt werden.",
          "Du darfst nicht zwei obere oder zwei untere Hälften verwenden."
        ]
      },
      {
        "id": "movement",
        "title": "Движение и позиция",
        "items": [
          "Обычное движение не проходит через врагов, препятствия, особые объекты и стены.",
          "Через союзников проходить можно, но закончить ход на занятой клетке нельзя.",
          "Прыжок игнорирует фигуры, препятствия, особые объекты и эффекты местности во время движения, но не стены и не запрет на занятую конечную клетку.",
          "Труднопроходимая местность стоит 2 очка движения за вход.",
          "Ловушка срабатывает при входе обычным или вынужденным движением."
        ],
        "titleDe": "Bewegung und Position",
        "itemsDe": [
          "Normale Bewegung führt nicht durch Gegner, Hindernisse, besondere Geländefelder oder Wände.",
          "Durch Verbündete darfst du hindurchziehen, aber du darfst deinen Zug nicht auf einem besetzten Feld beenden.",
          "Sprung ignoriert während der Bewegung Figuren, Hindernisse, besondere Geländefelder und Geländeeffekte, aber keine Wände und nicht das Verbot, auf einem besetzten Zielfeld zu enden.",
          "Schwieriges Gelände kostet beim Betreten 2 Bewegungspunkte.",
          "Eine Falle wird ausgelöst, wenn sie durch normale oder erzwungene Bewegung betreten wird."
        ]
      },
      {
        "id": "attack",
        "title": "Атака",
        "items": [
          "Атака X наносит базовый урон X до модификаторов.",
          "Для каждой цели вытягивается отдельная карта модификатора атаки.",
          "Дальняя атака по соседней клетке проводится с затруднением.",
          "Состояния от атаки применяются даже если итоговый урон стал 0, если цель не умерла раньше от самого урона.",
          "Один и тот же враг не может стать целью нескольких атак одной и той же способности."
        ],
        "titleDe": "Angriff",
        "itemsDe": [
          "Angriff X verursacht vor Modifikatoren X Grundschaden.",
          "Für jedes Ziel wird eine eigene Angriffmodifikatorkarte gezogen.",
          "Ein Fernangriff gegen ein benachbartes Feld wird mit Nachteil ausgeführt.",
          "Zustände eines Angriffs werden auch dann angewendet, wenn der endgültige Schaden 0 wird, sofern das Ziel nicht bereits durch den Schaden selbst besiegt wurde.",
          "Derselbe Gegner kann durch dieselbe Fähigkeit nicht Ziel mehrerer Angriffe werden."
        ]
      },
      {
        "id": "adv_disadv",
        "title": "Преимущество и затруднение",
        "items": [
          "При преимуществе вытяните 2 карты модификатора и примените лучшую.",
          "При затруднении вытяните 2 карты и примените худшую.",
          "Несколько источников преимущества не складываются; то же для затруднения.",
          "Если есть и преимущество, и затруднение — они взаимно отменяются."
        ],
        "titleDe": "Vorteil und Nachteil",
        "itemsDe": [
          "Bei Vorteil ziehst du 2 Modifikatorkarten und verwendest die bessere.",
          "Bei Nachteil ziehst du 2 Karten und verwendest die schlechtere.",
          "Mehrere Quellen von Vorteil addieren sich nicht; dasselbe gilt für Nachteil.",
          "Wenn sowohl Vorteil als auch Nachteil vorliegen, heben sie sich gegenseitig auf."
        ]
      },
      {
        "id": "modifier_deck",
        "title": "Колода модификаторов атаки",
        "items": [
          "У каждого персонажа своя колода модификаторов; у монстров — общая по всем монстрам.",
          "×2 удваивает атаку, 0 означает промах.",
          "Карты с символом перемешивания требуют замешать сброс в конце раунда.",
          "Благословение добавляет карту ×2, Проклятие — карту промаха; после вытягивания они убираются из колоды."
        ],
        "titleDe": "Angriffmodifikator-Deck",
        "itemsDe": [
          "Jeder Charakter hat ein eigenes Modifikatordeck; Monster teilen sich ein gemeinsames Deck.",
          "x2 verdoppelt den Angriff, 0 bedeutet Fehlschlag.",
          "Karten mit Neumischen-Symbol verlangen, dass der Ablagestapel am Ende der Runde neu gemischt wird.",
          "Segen fuegt eine x2-Karte hinzu, Fluch eine Fehlschlag-Karte; nach dem Ziehen werden sie aus dem Deck entfernt."
        ]
      },
      {
        "id": "statuses",
        "title": "Состояния",
        "items": [
          "ОГЛУШЕНИЕ: фигура не выполняет никаких действий в свой ход.",
          "ПАРАЛИЧ: фигура не выполняет действия движения.",
          "РАЗОРУЖЕНИЕ: фигура не выполняет действия атаки.",
          "СМЯТЕНИЕ: все атаки фигуры проводятся с затруднением.",
          "УСИЛЕНИЕ: все атаки фигуры проводятся с преимуществом.",
          "ОТРАВЛЕНИЕ: все входящие атаки по цели получают +1; снимается лечением.",
          "РАНА: 1 урон в начале каждого своего хода; снимается лечением.",
          "БЛАГОСЛОВЕНИЕ и ПРОКЛЯТИЕ работают через замешивание специальных карт в колоду модификаторов."
        ],
        "titleDe": "Zustände",
        "itemsDe": [
          "BETÄUBUNG: Die Figur führt in ihrem Zug keine Aktionen aus.",
          "ENTWAFFNEN: Die Figur führt keine Angriffsaktionen aus.",
          "IMMOBILISIERUNG: Die Figur führt keine Bewegungsaktionen aus.",
          "VERWIRRUNG: Alle Angriffe der Figur werden mit Nachteil ausgeführt.",
          "STÄRKUNG: Alle Angriffe der Figur werden mit Vorteil ausgeführt.",
          "GIFT: Alle eingehenden Angriffe gegen das Ziel erhalten +1; wird durch Heilen entfernt.",
          "WUNDE: 1 Schaden zu Beginn jedes eigenen Zuges; wird durch Heilen entfernt.",
          "SEGEN und FLUCH funktionieren, indem spezielle Karten in das Modifikatordeck gemischt werden."
        ]
      },
      {
        "id": "healing",
        "title": "Лечение и урон",
        "items": [
          "Лечение X восстанавливает до X ОЗ цели.",
          "Лечение требует линию видимости и дальность, если лечится не сам источник.",
          "Лечение снимает Отравление и Рану по их специальным правилам.",
          "Урон без атаки не использует модификаторы атаки и обычно не требует линии видимости."
        ],
        "titleDe": "Heilung und Schaden",
        "itemsDe": [
          "Heilen X stellt bis zu X Trefferpunkte des Ziels wieder her.",
          "Heilen erfordert Sichtlinie und Reichweite, wenn nicht die Quelle selbst geheilt wird.",
          "Heilen entfernt Gift und Wunde nach deren Sonderregeln.",
          "Schaden ohne Angriff verwendet keine Angriffmodifikatoren und erfordert normalerweise keine Sichtlinie."
        ]
      },
      {
        "id": "loot_gold",
        "title": "Добыча, монеты, сокровища",
        "items": [
          "Добыча X подбирает все монеты и жетоны сокровищ на своей клетке и в пределах дальности X.",
          "В конце хода персонаж автоматически подбирает монеты и сокровища на своей клетке.",
          "После смерти монстра на его клетку кладётся монета.",
          "Содержимое жетона сокровища берётся по его номеру из списка сокровищ."
        ],
        "titleDe": "Beute, Münzen, Schätze",
        "itemsDe": [
          "Beute X sammelt alle Münzen und Schatzmarker auf dem eigenen Feld und innerhalb von Reichweite X ein.",
          "Am Ende des Zuges sammelt ein Charakter automatisch Münzen und Schätze auf seinem Feld ein.",
          "Wenn ein Monster stirbt, wird auf sein Feld eine Münze gelegt.",
          "Der Inhalt eines Schatzmarkers wird über seine Nummer aus der Schatzliste bestimmt."
        ]
      },
      {
        "id": "resting",
        "title": "Отдых",
        "items": [
          "Короткий отдых: в конце раунда случайная карта из сброса уходит в потери, остальные возвращаются в руку.",
          "Один раз за короткий отдых можно получить 1 урон и перевытянуть карту потери.",
          "Долгий отдых объявляется вместо выбора карт; инициатива 99.",
          "При долгом отдыхе выберите 1 карту из сброса в потери, верните остальные в руку, вылечите 2 и поверните назад повернутые предметы."
        ],
        "titleDe": "Rasten",
        "itemsDe": [
          "Kurze Rast: Am Ende der Runde geht eine zufaellige Karte aus dem Ablagestapel in den Verloren-Stapel, die übrigen kommen auf die Hand zurueck.",
          "Einmal pro Kurzer Rast darfst du 1 Schaden nehmen und die verlorene Karte neu bestimmen.",
          "Lange Rast wird anstelle der Kartenwahl angesagt; Initiative 99.",
          "Bei einer Langen Rast wählst du 1 Karte aus dem Ablagestapel, die verloren geht, nimmst die übrigen auf die Hand zurueck, heilst 2 und richtest verbrauchte Gegenstände wieder auf."
        ]
      },
      {
        "id": "exhaustion",
        "title": "Изнурение",
        "items": [
          "Персонаж изнуряется, если его ОЗ падают ниже 1.",
          "Персонаж также изнуряется, если в начале раунда не может разыграть 2 карты и не может отдыхать.",
          "Изнурённый персонаж убирается с поля и больше не участвует в сценарии.",
          "Если изнурились все персонажи, сценарий проигран."
        ],
        "titleDe": "Erschöpfung",
        "itemsDe": [
          "Ein Charakter wird erschöpft, wenn seine Trefferpunkte unter 1 fallen.",
          "Ein Charakter wird ebenfalls erschöpft, wenn er zu Beginn der Runde nicht 2 Karten spielen kann und auch nicht rasten kann.",
          "Ein erschöpfter Charakter wird vom Spielplan entfernt und nimmt nicht weiter am Szenario teil.",
          "Wenn alle Charaktere erschöpft sind, ist das Szenario verloren."
        ]
      },
      {
        "id": "monster_ai",
        "title": "Монстры: кратко",
        "items": [
          "Каждый тип монстра открывает 1 карту способности на раунд.",
          "Мощные монстры ходят раньше обычных того же типа.",
          "Монстр выбирает цель, которую сможет атаковать, двигаясь по наиболее выгодному пути.",
          "Если несколько вариантов одинаково допустимы, выбор делают игроки.",
          "Монстры стараются избегать ловушек, если есть другой способ достичь выгодной клетки."
        ],
        "titleDe": "Monster: kurz gefasst",
        "itemsDe": [
          "Jeder Monstertyp deckt für die Runde 1 Fähigkeitskarte auf.",
          "Elite-Monster handeln vor normalen Monstern desselben Typs.",
          "Ein Monster wählt ein Ziel, das es über den günstigsten Weg angreifen kann.",
          "Wenn mehrere Optionen gleich zulaessig sind, entscheiden die Spieler.",
          "Monster versuchen Fallen zu vermeiden, wenn es einen anderen Weg zu einem günstigen Feld gibt."
        ]
      },
      {
        "id": "doors_rooms",
        "title": "Двери и комнаты",
        "items": [
          "Когда персонаж входит на клетку закрытой двери, дверь немедленно открывается.",
          "Положите жетон активации, выставьте монстров и компоненты новой комнаты по схеме сценария.",
          "Монстры в новой комнате всегда могут ходить в том же раунде.",
          "Персонаж, открывший дверь, продолжает своё движение, если у него остались очки движения."
        ],
        "titleDe": "Türen und Räume",
        "itemsDe": [
          "Wenn ein Charakter ein Feld mit einer geschlossenen Tür betritt, wird die Tür sofort geöffnet.",
          "Lege einen Aktivierungsmarker aus und stelle Monster sowie Komponenten des neuen Raums gemaess Szenarioaufbau auf.",
          "Monster in einem neu aufgedeckten Raum können in derselben Runde handeln.",
          "Ein Charakter, der eine Tür geöffnet hat, setzt seine Bewegung fort, wenn ihm noch Bewegungspunkte bleiben."
        ]
      },
      {
        "id": "line_of_sight",
        "title": "Линия видимости",
        "items": [
          "Линия видимости есть, если из любой части клетки источника можно провести линию в любую часть клетки цели, не касаясь стены.",
          "Только стены блокируют линию видимости.",
          "Препятствия, особые объекты и фигуры линию видимости не блокируют."
        ],
        "titleDe": "Sichtlinie",
        "itemsDe": [
          "Eine Sichtlinie besteht, wenn von irgendeinem Punkt des Quellfeldes zu irgendeinem Punkt des Zielfeldes eine Linie gezogen werden kann, ohne eine Wand zu beruehren.",
          "Nur Wände blockieren die Sichtlinie.",
          "Hindernisse, besondere Geländefelder und Figuren blockieren die Sichtlinie nicht."
        ]
      },
      {
        "id": "push_pull",
        "title": "Оттолкнуть и Притянуть",
        "items": [
          "Оттолкнуть X — цель вынужденно движется дальше от источника до X клеток.",
          "Притянуть X — цель вынужденно движется ближе к источнику до X клеток.",
          "Вынужденное движение не проходит через стены, врагов и препятствия, но может идти через союзников цели.",
          "Если цель попадает на ловушку, ловушка срабатывает.",
          "На вынужденное движение не влияет труднопроходимая местность."
        ],
        "titleDe": "Stoß und Zug",
        "itemsDe": [
          "Stoß X: Das Ziel wird bis zu X Felder weiter von der Quelle weg bewegt.",
          "Zug X: Das Ziel wird bis zu X Felder näher zur Quelle gezogen.",
          "Erzwungene Bewegung führt nicht durch Wände, Gegner oder Hindernisse, kann aber durch Verbündete des Ziels fuehren.",
          "Wenn das Ziel auf eine Falle geraet, wird die Falle ausgelöst.",
          "Schwieriges Gelände beeinflusst erzwungene Bewegung nicht."
        ]
      },
      {
        "id": "elements",
        "title": "Стихии",
        "items": [
          "В игре 6 стихий: огонь, лёд, воздух, земля, свет, тьма.",
          "Обычный символ стихии создаёт стихию.",
          "Перечёркнутый символ тратит сильную стихию ради бонуса.",
          "В конце раунда сильная стихия становится слабой, слабая — исчезает."
        ],
        "titleDe": "Elemente",
        "itemsDe": [
          "Im Spiel gibt es 6 Elemente: Feuer, Eis, Luft, Erde, Licht und Dunkelheit.",
          "Ein normales Elementsymbol erzeugt das Element.",
          "Ein durchgestrichenes Symbol verbraucht ein starkes Element für einen Bonus.",
          "Am Ende der Runde wird ein starkes Element schwach und ein schwaches verschwindet."
        ]
      },
      {
        "id": "items",
        "title": "Предметы",
        "items": [
          "Предметы усиливают персонажа и могут использоваться вдобавок к картам способностей.",
          "Тип предмета определяет слот снаряжения.",
          "Одни предметы тратятся на сценарий, другие поворачиваются и восстанавливаются долгим отдыхом.",
          "Между сценариями предметы можно покупать, продавать и обменивать."
        ],
        "titleDe": "Gegenstände",
        "itemsDe": [
          "Gegenstände verstärken einen Charakter und können zusaetzlich zu Fähigkeitskarten benutzt werden.",
          "Der Gegenstandstyp bestimmt den Ausruestungsplatz.",
          "Manche Gegenstände werden für das Szenario verbraucht, andere werden getappt und durch eine Lange Rast wieder aufgefrischt.",
          "Zwischen Szenarien können Gegenstände gekauft, verkauft und getauscht werden."
        ]
      },
      {
        "id": "campaign",
        "title": "Кампания и сохранение",
        "items": [
          "Кампания состоит из серии сценариев с прогрессом персонажей и мира.",
          "Новые сценарии открываются наклейками на поле кампании.",
          "Опыт, золото, навыки и предметы записываются в бланк персонажа.",
          "Между партиями компоненты персонажей удобно хранить в его коробке."
        ],
        "titleDe": "Kampagne und Spielstand",
        "itemsDe": [
          "Die Kampagne besteht aus einer Folge von Szenarien mit Fortschritt für Charaktere und Welt.",
          "Neue Szenarien werden über Aufkleber auf dem Kampagnenplan freigeschaltet.",
          "Erfahrung, Gold, Fähigkeiten und Gegenstände werden im Charakterbogen eingetragen.",
          "Zwischen den Partien lassen sich die Komponenten eines Charakters bequem in seiner Schachtel aufbewahren."
        ]
      }
    ],
    "titleDe": "Schnellreferenz"
  },
  "glossary": [
    {
      "id": "ataka",
      "term": "Атака",
      "category": "actions",
      "summary": "Наносит базовый урон цели в пределах дальности, затем применяются модификаторы атаки и защита цели.",
      "keywords": [
        "damage",
        "attack",
        "range",
        "modifier",
        "shield"
      ],
      "termDe": "Angriff",
      "summaryDe": "Fügt einem Ziel innerhalb der Reichweite Grundschaden zu; danach werden Angriffmodifikatoren und der Schutz des Ziels angewendet."
    },
    {
      "id": "blizhnyaya-ataka",
      "term": "Ближняя атака",
      "category": "actions",
      "summary": "Атака без указанной дальности; по умолчанию имеет дальность 1 и бьёт по соседним врагам.",
      "keywords": [
        "melee",
        "adjacent",
        "range"
      ],
      "termDe": "Nahkampfangriff",
      "summaryDe": "Ein Angriff ohne angegebene Reichweite; standardmäßig hat er Reichweite 1 und trifft benachbarte Gegner."
    },
    {
      "id": "dalnyaya-ataka",
      "term": "Дальняя атака",
      "category": "actions",
      "summary": "Атака с показателем дальности; требует линию видимости и получает затруднение при стрельбе по соседней клетке.",
      "keywords": [
        "ranged",
        "los",
        "disadvantage"
      ],
      "termDe": "Fernkampfangriff",
      "summaryDe": "Ein Angriff mit Reichweitenwert; erfordert Sichtlinie und wird mit Nachteil ausgeführt, wenn auf ein benachbartes Feld geschossen wird."
    },
    {
      "id": "dvizhenie",
      "term": "Движение",
      "category": "movement",
      "summary": "Позволяет переместиться на X клеток или меньше, тратя очки движения.",
      "keywords": [
        "move",
        "movement"
      ],
      "termDe": "Bewegung",
      "summaryDe": "Erlaubt es, sich um X oder weniger Felder zu bewegen, indem Bewegungspunkte ausgegeben werden."
    },
    {
      "id": "pryzhok",
      "term": "Прыжок",
      "category": "movement",
      "summary": "Особый вид движения, игнорирующий фигуры, препятствия, особые объекты и эффекты местности во время движения.",
      "keywords": [
        "jump",
        "movement",
        "trap",
        "obstacle"
      ],
      "termDe": "Sprung",
      "summaryDe": "Eine besondere Form der Bewegung, die während der Bewegung Figuren, Hindernisse, besondere Geländefelder und Geländeeffekte ignoriert."
    },
    {
      "id": "dalnost",
      "term": "Дальность",
      "category": "targeting",
      "summary": "Максимальная дальность способности в клетках. Обычно нужна для дальней атаки, лечения и других целевых эффектов.",
      "keywords": [
        "range",
        "targeting"
      ],
      "termDe": "Reichweite",
      "summaryDe": "Die maximale Reichweite einer Fähigkeit in Feldern. Wird meist für Fernangriffe, Heilung und andere zielgerichtete Effekte benötigt."
    },
    {
      "id": "celi",
      "term": "Цели",
      "category": "targeting",
      "summary": "Показывает, сколько разных врагов или других разрешённых целей может выбрать способность.",
      "keywords": [
        "targets",
        "multiattack"
      ],
      "termDe": "Ziele",
      "summaryDe": "Zeigt an, wie viele verschiedene Gegner oder andere erlaubte Ziele eine Fähigkeit wählen darf."
    },
    {
      "id": "liniya-vidimosti",
      "term": "Линия видимости",
      "category": "targeting",
      "summary": "Нужна для большинства способностей, направленных на другую фигуру; стены блокируют её, другие объекты — нет.",
      "keywords": [
        "los",
        "walls",
        "targeting"
      ],
      "termDe": "Sichtlinie",
      "summaryDe": "Wird für die meisten Fähigkeiten benötigt, die auf eine andere Figur zielen; Wände blockieren sie, andere Objekte nicht."
    },
    {
      "id": "sosednyaya-kletka",
      "term": "Соседняя клетка",
      "category": "board",
      "summary": "Клетки считаются соседними, если имеют общую границу и между ними нет стены.",
      "keywords": [
        "adjacent",
        "hex"
      ],
      "termDe": "Benachbartes Feld",
      "summaryDe": "Felder gelten als benachbart, wenn sie eine gemeinsame Kante haben und keine Wand zwischen ihnen liegt."
    },
    {
      "id": "stena",
      "term": "Стена",
      "category": "board",
      "summary": "Через стены нельзя двигаться, они блокируют линию видимости.",
      "keywords": [
        "wall",
        "los",
        "movement"
      ],
      "termDe": "Wand",
      "summaryDe": "Wände können nicht durchquert werden und blockieren die Sichtlinie."
    },
    {
      "id": "kletka",
      "term": "Клетка",
      "category": "board",
      "summary": "Базовая единица поля; фигура занимает одну клетку.",
      "keywords": [
        "hex",
        "tile"
      ],
      "termDe": "Feld",
      "summaryDe": "Die Grundeinheit des Spielfelds; eine Figur besetzt genau ein Feld."
    },
    {
      "id": "zanyataya-kletka",
      "term": "Занятая клетка",
      "category": "board",
      "summary": "Клетка с фигурой. На одной клетке не могут стоять две фигуры.",
      "keywords": [
        "occupied"
      ],
      "termDe": "Besetztes Feld",
      "summaryDe": "Ein Feld mit einer Figur. Auf einem Feld können nicht zwei Figuren gleichzeitig stehen."
    },
    {
      "id": "pustaya-kletka",
      "term": "Пустая клетка",
      "category": "board",
      "summary": "Клетка без фигур, препятствий, ловушек и особых объектов. Открытая дверь и уничтоженный объект обычно делают клетку пустой.",
      "keywords": [
        "empty",
        "tile"
      ],
      "termDe": "Leeres Feld",
      "summaryDe": "Ein Feld ohne Figuren, Hindernisse, Fallen oder besondere Objekte. Eine offene Tür und ein zerstörtes Objekt machen ein Feld gewöhnlich leer."
    },
    {
      "id": "prepyatstvie",
      "term": "Препятствие",
      "category": "board",
      "summary": "Клетки с зелёной обводкой; обычным движением через них нельзя проходить.",
      "keywords": [
        "obstacle"
      ],
      "termDe": "Hindernis",
      "summaryDe": "Felder mit grünem Rand; mit normaler Bewegung kann man sie nicht durchqueren."
    },
    {
      "id": "osobyj-obekt",
      "term": "Особый объект",
      "category": "board",
      "summary": "Важный для сценария объект с ОЗ; не считается препятствием, но обычно пройти через него можно только прыжком.",
      "keywords": [
        "objective",
        "object"
      ],
      "termDe": "Besonderes Objekt",
      "summaryDe": "Ein für das Szenario wichtiges Objekt mit Trefferpunkten; es gilt nicht als Hindernis, kann aber normalerweise nur mit Sprung überquert werden."
    },
    {
      "id": "lovushka",
      "term": "Ловушка",
      "category": "board",
      "summary": "Срабатывает при входе на клетку обычным или вынужденным движением, затем обычно убирается.",
      "keywords": [
        "trap",
        "damage",
        "status"
      ],
      "termDe": "Falle",
      "summaryDe": "Wird ausgelöst, wenn ihr Feld durch normale oder erzwungene Bewegung betreten wird, und wird danach gewöhnlich entfernt."
    },
    {
      "id": "trudnoprohodimaya-mestnost",
      "term": "Труднопроходимая местность",
      "category": "board",
      "summary": "Вход на такую клетку стоит 2 очка движения.",
      "keywords": [
        "difficult",
        "terrain"
      ],
      "termDe": "Schwieriges Gelände",
      "summaryDe": "Das Betreten eines solchen Feldes kostet 2 Bewegungspunkte."
    },
    {
      "id": "dver",
      "term": "Дверь",
      "category": "board",
      "summary": "Разделяет комнаты; при открытии раскрывает новую комнату и её содержимое.",
      "keywords": [
        "door",
        "room",
        "reveal"
      ],
      "termDe": "Tür",
      "summaryDe": "Trennt Räume; beim Öffnen werden ein neuer Raum und sein Inhalt aufgedeckt."
    },
    {
      "id": "komnata",
      "term": "Комната",
      "category": "board",
      "summary": "Отдельная часть поля, отделённая дверями и стенами. Монстры в ней выставляются, когда её открывают.",
      "keywords": [
        "room"
      ],
      "termDe": "Raum",
      "summaryDe": "Ein abgegrenzter Teil des Spielfelds, getrennt durch Türen und Wände. Monster darin werden aufgestellt, wenn der Raum geöffnet wird."
    },
    {
      "id": "otkrytie-komnaty",
      "term": "Открытие комнаты",
      "category": "scenario",
      "summary": "Процесс раскрытия новой комнаты: жетон активации, выставление монстров и их возможный ход в этом раунде.",
      "keywords": [
        "open",
        "room",
        "reveal",
        "spawn"
      ],
      "termDe": "Raum aufdecken",
      "summaryDe": "Der Vorgang, einen neuen Raum aufzudecken: Aktivierungsmarker legen, Monster aufstellen und ihnen gegebenenfalls noch in dieser Runde einen Zug ermöglichen."
    },
    {
      "id": "iniciativa",
      "term": "Инициатива",
      "category": "round",
      "summary": "Определяет порядок хода фигурок: меньшее число ходит раньше.",
      "keywords": [
        "initiative",
        "round",
        "order"
      ],
      "termDe": "Initiative",
      "summaryDe": "Bestimmt die Reihenfolge der Züge von Figuren: Die niedrigere Zahl handelt zuerst."
    },
    {
      "id": "vybor-kart",
      "term": "Выбор карт",
      "category": "round",
      "summary": "Первый этап раунда: игрок скрытно выбирает 2 карты или объявляет долгий отдых.",
      "keywords": [
        "select",
        "cards"
      ],
      "termDe": "Kartenwahl",
      "summaryDe": "Die erste Phase der Runde: Spieler wählen verdeckt 2 Karten oder sagen eine Lange Rast an."
    },
    {
      "id": "opredelenie-iniciativy",
      "term": "Определение инициативы",
      "category": "round",
      "summary": "Второй этап раунда: раскрытие карт игроков и карт способностей монстров, затем расстановка жетонов инициативы.",
      "keywords": [
        "initiative",
        "reveal"
      ],
      "termDe": "Initiative bestimmen",
      "summaryDe": "Die zweite Phase der Runde: Aufdecken der Spielerkarten und Monsterfähigkeitskarten, danach werden die Initiativemarker gelegt."
    },
    {
      "id": "konec-raunda",
      "term": "Конец раунда",
      "category": "round",
      "summary": "Фаза обновления: перемешивание колод с нужным символом, ослабление стихий и возможность короткого отдыха.",
      "keywords": [
        "end",
        "round",
        "refresh"
      ],
      "termDe": "Rundenende",
      "summaryDe": "Die Aktualisierungsphase: Decks mit entsprechendem Symbol neu mischen, Elemente abschwächen und eine Kurze Rast ermöglichen."
    },
    {
      "id": "raund",
      "term": "Раунд",
      "category": "round",
      "summary": "Полный цикл игры: выбор карт, инициатива, ходы фигур, конец раунда.",
      "keywords": [
        "round",
        "flow"
      ],
      "termDe": "Runde",
      "summaryDe": "Ein vollständiger Spielzyklus: Kartenwahl, Initiative, Züge aller Figuren und Rundenende."
    },
    {
      "id": "karty-sposobnostej-personazhej",
      "term": "Карты способностей персонажей",
      "category": "cards",
      "summary": "Основные карты действий персонажа; в ход используется верх одной и низ другой.",
      "keywords": [
        "ability",
        "cards"
      ],
      "termDe": "Charakter-Fähigkeitskarten",
      "summaryDe": "Die zentralen Aktionskarten eines Charakters; in einem Zug wird die obere Hälfte der einen und die untere Hälfte einer anderen benutzt."
    },
    {
      "id": "standartnaya-sposobnost",
      "term": "Стандартная способность",
      "category": "cards",
      "summary": "Вместо половины карты можно выполнить Атаку 2 сверху или Движение 2 снизу.",
      "keywords": [
        "basic",
        "action"
      ],
      "termDe": "Standardfähigkeit",
      "summaryDe": "Anstelle einer Kartenhälfte kann Angriff 2 oben oder Bewegung 2 unten ausgeführt werden."
    },
    {
      "id": "poteri",
      "term": "Потери",
      "category": "cards",
      "summary": "Стопка карт, недоступных до конца сценария; туда уходят потерянные карты и карты для отмены урона/отдыха.",
      "keywords": [
        "loss",
        "pile"
      ],
      "termDe": "Verloren-Stapel",
      "summaryDe": "Ein Stapel mit Karten, die bis zum Ende des Szenarios nicht mehr verfügbar sind; hierhin kommen verlorene Karten und Karten, die zum Verhindern von Schaden oder beim Rasten abgegeben werden."
    },
    {
      "id": "sbros",
      "term": "Сброс",
      "category": "cards",
      "summary": "Стопка сыгранных карт, которые можно вернуть в руку отдыхом.",
      "keywords": [
        "discard",
        "pile"
      ],
      "termDe": "Ablagestapel",
      "summaryDe": "Der Stapel gespielter Karten, die durch Rasten wieder auf die Hand genommen werden können."
    },
    {
      "id": "dejstvuyuschie-karty",
      "term": "Действующие карты",
      "category": "cards",
      "summary": "Область активных постоянных или раундовых эффектов над планшетом персонажа.",
      "keywords": [
        "active",
        "area"
      ],
      "termDe": "Aktive Karten",
      "summaryDe": "Der Bereich über dem Charaktertableau für dauerhafte Effekte oder Rundeneffekte."
    },
    {
      "id": "punktirnaya-liniya",
      "term": "Пунктирная линия",
      "category": "cards",
      "summary": "Разделяет отдельные действия внутри одной половины карты; они выполняются по порядку.",
      "keywords": [
        "dotted",
        "line",
        "sequence"
      ],
      "termDe": "Gestrichelte Linie",
      "summaryDe": "Trennt einzelne Aktionen innerhalb einer Kartenhälfte; sie werden der Reihenfolge nach ausgeführt."
    },
    {
      "id": "prodolzhitelnyj-effekt",
      "term": "Продолжительный эффект",
      "category": "cards",
      "summary": "Эффект, который действует некоторое время: до конца раунда, до конца сценария или ограниченное число срабатываний.",
      "keywords": [
        "persistent",
        "effect"
      ],
      "termDe": "Anhaltender Effekt",
      "summaryDe": "Ein Effekt, der eine Zeit lang anhält: bis zum Ende der Runde, bis zum Ende des Szenarios oder für eine begrenzte Anzahl von Auslösungen."
    },
    {
      "id": "karty-modifikatorov-ataki",
      "term": "Карты модификаторов атаки",
      "category": "cards",
      "summary": "Колода, из которой тянут карту для каждой цели атаки.",
      "keywords": [
        "modifier",
        "deck"
      ],
      "termDe": "Angriffmodifikatorkarten",
      "summaryDe": "Das Deck, aus dem für jedes Angriffsziel eine Karte gezogen wird."
    },
    {
      "id": "karty-sposobnostej-monstrov",
      "term": "Карты способностей монстров",
      "category": "cards",
      "summary": "Колода, определяющая инициативу и действия данного типа монстра в раунде.",
      "keywords": [
        "monster",
        "ability",
        "deck"
      ],
      "termDe": "Monster-Fähigkeitskarten",
      "summaryDe": "Das Deck, das Initiative und Aktionen eines bestimmten Monstertyps in einer Runde bestimmt."
    },
    {
      "id": "karty-harakteristik-monstrov",
      "term": "Карты характеристик монстров",
      "category": "cards",
      "summary": "Содержат базовые показатели обычных и мощных монстров данного типа.",
      "keywords": [
        "monster",
        "stat",
        "card"
      ],
      "termDe": "Monsterwertkarten",
      "summaryDe": "Enthalten die Grundwerte der normalen und Elite-Monster eines Typs."
    },
    {
      "id": "konvert-harakteristik",
      "term": "Конверт характеристик",
      "category": "cards",
      "summary": "Используется для карты монстра и размещения урона/состояний по номерам фишек.",
      "keywords": [
        "monster",
        "sleeve"
      ],
      "termDe": "Wertehülle",
      "summaryDe": "Wird für die Monsterkarte sowie für das Platzieren von Schaden und Zuständen nach Standee-Nummern verwendet."
    },
    {
      "id": "blagoslovenie",
      "term": "Благословение",
      "category": "status",
      "summary": "Положительное состояние: в колоду модификаторов замешивается карта ×2; после вытягивания убирается.",
      "keywords": [
        "bless",
        "x2"
      ],
      "termDe": "Segen",
      "summaryDe": "Ein positiver Zustand: Eine x2-Karte wird in das Modifikatordeck gemischt und nach dem Ziehen wieder entfernt."
    },
    {
      "id": "proklyatie",
      "term": "Проклятие",
      "category": "status",
      "summary": "Отрицательное состояние: в колоду замешивается карта промаха; после вытягивания убирается.",
      "keywords": [
        "curse",
        "null"
      ],
      "termDe": "Fluch",
      "summaryDe": "Ein negativer Zustand: Eine Fehlschlag-Karte wird in das Deck gemischt und nach dem Ziehen wieder entfernt."
    },
    {
      "id": "oglushenie",
      "term": "Оглушение",
      "category": "status",
      "summary": "Фигура не выполняет никаких действий до конца своего следующего хода.",
      "keywords": [
        "stun"
      ],
      "termDe": "Betäubung",
      "summaryDe": "Die Figur führt bis zum Ende ihres nächsten Zuges keine Aktionen aus."
    },
    {
      "id": "paralich",
      "term": "Паралич",
      "category": "status",
      "summary": "Фигура не выполняет действия движения до конца своего следующего хода.",
      "keywords": [
        "immobilize"
      ],
      "termDe": "Immobilisierung",
      "summaryDe": "Die Figur führt bis zum Ende ihres nächsten Zuges keine Bewegungsaktionen aus."
    },
    {
      "id": "razoruzhenie",
      "term": "Разоружение",
      "category": "status",
      "summary": "Фигура не выполняет действия атаки до конца своего следующего хода.",
      "keywords": [
        "disarm"
      ],
      "termDe": "Entwaffnen",
      "summaryDe": "Die Figur führt bis zum Ende ihres nächsten Zuges keine Angriffsaktionen aus."
    },
    {
      "id": "smyatenie",
      "term": "Смятение",
      "category": "status",
      "summary": "Все атаки фигуры проводятся с затруднением до конца её следующего хода.",
      "keywords": [
        "muddle",
        "disadvantage"
      ],
      "termDe": "Verwirrung",
      "summaryDe": "Alle Angriffe der Figur werden bis zum Ende ihres nächsten Zuges mit Nachteil ausgeführt."
    },
    {
      "id": "usilenie",
      "term": "Усиление",
      "category": "status",
      "summary": "Все атаки фигуры проводятся с преимуществом до конца её следующего хода.",
      "keywords": [
        "strengthen",
        "advantage"
      ],
      "termDe": "Stärkung",
      "summaryDe": "Alle Angriffe der Figur werden bis zum Ende ihres nächsten Zuges mit Vorteil ausgeführt."
    },
    {
      "id": "otravlenie",
      "term": "Отравление",
      "category": "status",
      "summary": "Все атаки по цели получают +1; снимается лечением, которое тогда больше ничего не восстанавливает.",
      "keywords": [
        "poison"
      ],
      "termDe": "Gift",
      "summaryDe": "Alle Angriffe gegen das Ziel erhalten +1; wird durch Heilen entfernt, wobei das Heilen dann keine weiteren Trefferpunkte wiederherstellt."
    },
    {
      "id": "rana",
      "term": "Рана",
      "category": "status",
      "summary": "Фигура получает 1 урон в начале каждого своего хода; снимается лечением.",
      "keywords": [
        "wound"
      ],
      "termDe": "Wunde",
      "summaryDe": "Die Figur erleidet zu Beginn jedes eigenen Zuges 1 Schaden; wird durch Heilen entfernt."
    },
    {
      "id": "sostoyanie",
      "term": "Состояние",
      "category": "status",
      "summary": "Общее название временных эффектов, накладываемых на фигуры или через колоду модификаторов.",
      "keywords": [
        "condition"
      ],
      "termDe": "Zustand",
      "summaryDe": "Ein Sammelbegriff für vorübergehende Effekte, die Figuren direkt betreffen oder über das Modifikatordeck wirken."
    },
    {
      "id": "lechenie",
      "term": "Лечение",
      "category": "actions",
      "summary": "Восстанавливает ОЗ цели; обычно требует дальность и линию видимости.",
      "keywords": [
        "heal"
      ],
      "termDe": "Heilen",
      "summaryDe": "Stellt Trefferpunkte eines Ziels wieder her; erfordert normalerweise Reichweite und Sichtlinie."
    },
    {
      "id": "na-sebya",
      "term": "На себя",
      "category": "actions",
      "summary": "Эффект может быть применён только к фигуре, которая выполняет способность.",
      "keywords": [
        "self"
      ],
      "termDe": "Selbst",
      "summaryDe": "Der Effekt kann nur auf die Figur angewendet werden, die die Fähigkeit ausführt."
    },
    {
      "id": "uron-bez-ataki",
      "term": "Урон без атаки",
      "category": "actions",
      "summary": "Наносит урон без вытягивания модификатора атаки и обычно без проверки линии видимости.",
      "keywords": [
        "direct",
        "damage"
      ],
      "termDe": "Schaden ohne Angriff",
      "summaryDe": "Fügt Schaden zu, ohne eine Angriffmodifikatorkarte zu ziehen, und meist ohne Prüfung der Sichtlinie."
    },
    {
      "id": "schit",
      "term": "Щит",
      "category": "actions",
      "summary": "Уменьшает входящий урон от атак на указанное значение.",
      "keywords": [
        "shield"
      ],
      "termDe": "Schild",
      "summaryDe": "Verringert den eingehenden Schaden aus Angriffen um den angegebenen Wert."
    },
    {
      "id": "bonusy-ataki",
      "term": "Бонусы атаки",
      "category": "actions",
      "summary": "Добавки и штрафы к базовой атаке из способностей, предметов и других источников.",
      "keywords": [
        "attack",
        "bonuses"
      ],
      "termDe": "Angriffsboni",
      "summaryDe": "Zuschläge und Abzüge zum Grundangriff aus Fähigkeiten, Gegenständen und anderen Quellen."
    },
    {
      "id": "predostavlenie-dejstvij",
      "term": "Предоставление действий",
      "category": "actions",
      "summary": "Одна фигура заставляет врага или позволяет союзнику выполнить действие в её ход.",
      "keywords": [
        "grant",
        "action",
        "command"
      ],
      "termDe": "Aktionen gewähren",
      "summaryDe": "Eine Figur zwingt einen Gegner oder erlaubt einem Verbündeten, in ihrem Zug eine Aktion auszuführen."
    },
    {
      "id": "ottolknut",
      "term": "Оттолкнуть",
      "category": "actions",
      "summary": "Вынужденное движение цели дальше от источника.",
      "keywords": [
        "push"
      ],
      "termDe": "Stoß",
      "summaryDe": "Erzwungene Bewegung eines Ziels weiter von der Quelle weg."
    },
    {
      "id": "prityanut",
      "term": "Притянуть",
      "category": "actions",
      "summary": "Вынужденное движение цели ближе к источнику.",
      "keywords": [
        "pull"
      ],
      "termDe": "Zug",
      "summaryDe": "Erzwungene Bewegung eines Ziels näher zur Quelle hin."
    },
    {
      "id": "dobycha",
      "term": "Добыча",
      "category": "actions",
      "summary": "Подбирает монеты и сокровища на своей клетке и в пределах указанной дальности.",
      "keywords": [
        "loot"
      ],
      "termDe": "Beute",
      "summaryDe": "Sammelt Münzen und Schätze auf dem eigenen Feld und innerhalb der angegebenen Reichweite ein."
    },
    {
      "id": "dobycha-v-konce-hoda",
      "term": "Добыча в конце хода",
      "category": "actions",
      "summary": "Персонаж автоматически подбирает монеты и сокровища на клетке, где закончил ход.",
      "keywords": [
        "end",
        "of",
        "turn",
        "loot"
      ],
      "termDe": "Beute am Ende des Zuges",
      "summaryDe": "Ein Charakter sammelt automatisch Münzen und Schätze auf dem Feld ein, auf dem er seinen Zug beendet."
    },
    {
      "id": "preimuschestvo",
      "term": "Преимущество",
      "category": "combat",
      "summary": "При атаке тянут 2 карты модификатора и выбирают лучшую.",
      "keywords": [
        "advantage"
      ],
      "termDe": "Vorteil",
      "summaryDe": "Bei einem Angriff werden 2 Modifikatorkarten gezogen und die bessere gewählt."
    },
    {
      "id": "zatrudnenie",
      "term": "Затруднение",
      "category": "combat",
      "summary": "При атаке тянут 2 карты модификатора и выбирают худшую.",
      "keywords": [
        "disadvantage"
      ],
      "termDe": "Nachteil",
      "summaryDe": "Bei einem Angriff werden 2 Modifikatorkarten gezogen und die schlechtere gewählt."
    },
    {
      "id": "vybor-monstrami-celej",
      "term": "Выбор монстрами целей",
      "category": "monster_ai",
      "summary": "Монстр выбирает врага, которого может атаковать, двигаясь наиболее выгодным способом.",
      "keywords": [
        "monster",
        "focus"
      ],
      "termDe": "Zielwahl von Monstern",
      "summaryDe": "Ein Monster wählt den Gegner, den es auf die günstigste Weise angreifen kann."
    },
    {
      "id": "dvizhenie-monstra",
      "term": "Движение монстра",
      "category": "monster_ai",
      "summary": "Монстр двигается так, чтобы занять лучшую клетку для атаки цели и доп. целей, избегая ловушек если возможно.",
      "keywords": [
        "monster",
        "move"
      ],
      "termDe": "Monsterbewegung",
      "summaryDe": "Ein Monster bewegt sich so, dass es das beste Feld für einen Angriff auf sein Ziel und mögliche weitere Ziele erreicht und dabei nach Möglichkeit Fallen vermeidet."
    },
    {
      "id": "hod-monstra",
      "term": "Ход монстра",
      "category": "monster_ai",
      "summary": "Монстр выполняет карту способности своего типа в момент своей инициативы.",
      "keywords": [
        "monster",
        "turn"
      ],
      "termDe": "Monsterzug",
      "summaryDe": "Ein Monster führt zum Zeitpunkt seiner Initiative die Fähigkeitskarte seines Typs aus."
    },
    {
      "id": "moschnyj-monstr",
      "term": "Мощный монстр",
      "category": "monster_ai",
      "summary": "Усиленная версия монстра, отмеченная жёлтой подставкой.",
      "keywords": [
        "elite"
      ],
      "termDe": "Elite-Monster",
      "summaryDe": "Die stärkere Version eines Monsters, gekennzeichnet durch einen gelben Standee."
    },
    {
      "id": "obychnyj-monstr",
      "term": "Обычный монстр",
      "category": "monster_ai",
      "summary": "Стандартная версия монстра, отмеченная белой подставкой.",
      "keywords": [
        "normal"
      ],
      "termDe": "Normales Monster",
      "summaryDe": "Die Standardversion eines Monsters, gekennzeichnet durch einen weißen Standee."
    },
    {
      "id": "boss",
      "term": "Босс",
      "category": "monster_ai",
      "summary": "Особый сильный монстр с отдельной картой характеристик и колодой способностей босса.",
      "keywords": [
        "boss"
      ],
      "termDe": "Boss",
      "summaryDe": "Ein besonderes starkes Monster mit eigener Wertekarte und eigenem Boss-Fähigkeitsdeck."
    },
    {
      "id": "neopredelennost",
      "term": "Неопределённость",
      "category": "monster_ai",
      "summary": "Если правила допускают несколько равноправных вариантов, игроки совместно выбирают один из них.",
      "keywords": [
        "ambiguity",
        "rule"
      ],
      "termDe": "Unklarheit",
      "summaryDe": "Wenn die Regeln mehrere gleichwertige Möglichkeiten zulassen, wählen die Spieler gemeinsam eine davon."
    },
    {
      "id": "moneta",
      "term": "Монета",
      "category": "economy",
      "summary": "Жетон, который собирается в сценарии и затем превращается в золото.",
      "keywords": [
        "coin"
      ],
      "termDe": "Münze",
      "summaryDe": "Ein Marker, der im Szenario eingesammelt und danach in Gold umgewandelt wird."
    },
    {
      "id": "zolotye",
      "term": "Золотые",
      "category": "economy",
      "summary": "Валюта для покупки предметов между сценариями.",
      "keywords": [
        "gold"
      ],
      "termDe": "Gold",
      "summaryDe": "Die Währung, mit der zwischen Szenarien Gegenstände gekauft werden."
    },
    {
      "id": "magazin",
      "term": "Магазин",
      "category": "economy",
      "summary": "Колода доступных для покупки предметов между сценариями.",
      "keywords": [
        "shop"
      ],
      "termDe": "Laden",
      "summaryDe": "Das Deck der Gegenstände, die zwischen Szenarien gekauft werden können."
    },
    {
      "id": "karty-predmetov",
      "term": "Карты предметов",
      "category": "economy",
      "summary": "Предметы усиливают персонажа, занимают слоты и имеют правила использования.",
      "keywords": [
        "items"
      ],
      "termDe": "Gegenstandskarten",
      "summaryDe": "Gegenstände verstärken Charaktere, belegen Ausrüstungsslots und haben eigene Nutzungsregeln."
    },
    {
      "id": "opyt",
      "term": "Опыт",
      "category": "progression",
      "summary": "Получается за некоторые способности, эффекты и награды сценариев.",
      "keywords": [
        "xp"
      ],
      "termDe": "Erfahrung",
      "summaryDe": "Wird durch bestimmte Fähigkeiten, Effekte und Szenariobelohnungen erhalten."
    },
    {
      "id": "navyk",
      "term": "Навык",
      "category": "progression",
      "summary": "Постоянное улучшение колоды модификаторов, получаемое за галочки и уровни.",
      "keywords": [
        "perk"
      ],
      "termDe": "Perk",
      "summaryDe": "Eine dauerhafte Verbesserung des Modifikatordecks, die durch Häkchen und Stufenaufstiege erhalten wird."
    },
    {
      "id": "galochka",
      "term": "Галочка",
      "category": "progression",
      "summary": "Отметка за боевое задание или награды; каждые 3 дают навык.",
      "keywords": [
        "checkmark"
      ],
      "termDe": "Häkchen",
      "summaryDe": "Eine Markierung für Kampfziele oder Belohnungen; je 3 Häkchen geben einen Perk."
    },
    {
      "id": "boevoe-zadanie",
      "term": "Боевое задание",
      "category": "progression",
      "summary": "Секретная цель на сценарий, дающая галочку при успехе и победе в сценарии.",
      "keywords": [
        "battle",
        "goal"
      ],
      "termDe": "Kampfziel",
      "summaryDe": "Ein geheimes Ziel für das Szenario, das bei Erfolg und Szenariosieg ein Häkchen gibt."
    },
    {
      "id": "personazh",
      "term": "Персонаж",
      "category": "progression",
      "summary": "Игровой герой с уникальными картами, планшетом и колодой модификаторов.",
      "keywords": [
        "character"
      ],
      "termDe": "Charakter",
      "summaryDe": "Ein spielbarer Held mit eigenen Karten, Tableau und Modifikatordeck."
    },
    {
      "id": "planshet-personazha",
      "term": "Планшет персонажа",
      "category": "progression",
      "summary": "Показывает предел карт на руке, ОЗ по уровням и зоны для карт/состояний.",
      "keywords": [
        "character",
        "mat"
      ],
      "termDe": "Charaktertableau",
      "summaryDe": "Zeigt Handkartenlimit, Trefferpunkte pro Stufe und Bereiche für Karten und Zustände an."
    },
    {
      "id": "karty-na-ruke",
      "term": "Карты на руке",
      "category": "progression",
      "summary": "Карты, доступные игроку в текущем сценарии.",
      "keywords": [
        "hand"
      ],
      "termDe": "Handkarten",
      "summaryDe": "Die Karten, die dem Spieler im aktuellen Szenario zur Verfügung stehen."
    },
    {
      "id": "iznurenie",
      "term": "Изнурение",
      "category": "progression",
      "summary": "Состояние, при котором персонаж выбывает из текущего сценария.",
      "keywords": [
        "exhaustion"
      ],
      "termDe": "Erschöpfung",
      "summaryDe": "Ein Zustand, bei dem ein Charakter aus dem laufenden Szenario ausscheidet."
    },
    {
      "id": "otdyh",
      "term": "Отдых",
      "category": "progression",
      "summary": "Способ вернуть карты из сброса в руку ценой потери одной карты.",
      "keywords": [
        "rest"
      ],
      "termDe": "Rasten",
      "summaryDe": "Eine Möglichkeit, Karten aus dem Ablagestapel auf die Hand zurückzuholen, indem eine Karte verloren geht."
    },
    {
      "id": "korotkij-otdyh",
      "term": "Короткий отдых",
      "category": "progression",
      "summary": "Отдых в конце раунда со случайной потерей карты из сброса.",
      "keywords": [
        "short",
        "rest"
      ],
      "termDe": "Kurze Rast",
      "summaryDe": "Eine Rast am Ende der Runde mit zufälligem Verlust einer Karte aus dem Ablagestapel."
    },
    {
      "id": "dolgij-otdyh",
      "term": "Долгий отдых",
      "category": "progression",
      "summary": "Отдых на весь ход: потеря выбранной карты, лечение 2 и восстановление повернутых предметов.",
      "keywords": [
        "long",
        "rest"
      ],
      "termDe": "Lange Rast",
      "summaryDe": "Eine Rast für den gesamten Zug: eine gewählte Karte verlieren, 2 heilen und verbrauchte Gegenstände auffrischen."
    },
    {
      "id": "kampaniya",
      "term": "Кампания",
      "category": "campaign",
      "summary": "Серия связанных сценариев с прогрессом мира и персонажей.",
      "keywords": [
        "campaign"
      ],
      "termDe": "Kampagne",
      "summaryDe": "Eine Reihe zusammenhängender Szenarien mit Fortschritt für Welt und Charaktere."
    },
    {
      "id": "pole-kampanii",
      "term": "Поле кампании",
      "category": "campaign",
      "summary": "Карта мира, на которой отмечаются доступные и завершённые сценарии.",
      "keywords": [
        "campaign",
        "board"
      ],
      "termDe": "Kampagnenplan",
      "summaryDe": "Die Weltkarte, auf der verfügbare und abgeschlossene Szenarien markiert werden."
    },
    {
      "id": "naklejka",
      "term": "Наклейка",
      "category": "campaign",
      "summary": "Маркер сценария на поле кампании.",
      "keywords": [
        "sticker"
      ],
      "termDe": "Aufkleber",
      "summaryDe": "Ein Szenariomarker auf dem Kampagnenplan."
    },
    {
      "id": "nagrada",
      "term": "Награда",
      "category": "campaign",
      "summary": "Получаемый после сценария бонус: золото, опыт, предмет, новая локация и т. п.",
      "keywords": [
        "reward"
      ],
      "termDe": "Belohnung",
      "summaryDe": "Ein Bonus nach einem Szenario: Gold, Erfahrung, Gegenstand, neuer Ort und Ähnliches."
    },
    {
      "id": "sohranenie",
      "term": "Сохранение",
      "category": "campaign",
      "summary": "Правила хранения прогресса и компонентов между партиями.",
      "keywords": [
        "save"
      ],
      "termDe": "Spielstand",
      "summaryDe": "Regeln zum Aufbewahren von Fortschritt und Komponenten zwischen den Partien."
    },
    {
      "id": "zadacha",
      "term": "Задача",
      "category": "scenario",
      "summary": "Условие победы сценария.",
      "keywords": [
        "objective"
      ],
      "termDe": "Aufgabe",
      "summaryDe": "Die Siegbedingung eines Szenarios."
    },
    {
      "id": "zaklyuchenie",
      "term": "Заключение",
      "category": "scenario",
      "summary": "Финальный текст сценария после победы.",
      "keywords": [
        "conclusion"
      ],
      "termDe": "Abschluss",
      "summaryDe": "Der abschließende Szenariotext nach dem Sieg."
    },
    {
      "id": "vstuplenie",
      "term": "Вступление",
      "category": "scenario",
      "summary": "Художественный текст перед сценарием.",
      "keywords": [
        "introduction"
      ],
      "termDe": "Einleitung",
      "summaryDe": "Der erzählerische Text vor dem Szenario."
    },
    {
      "id": "osobye-pravila",
      "term": "Особые правила",
      "category": "scenario",
      "summary": "Дополнительные условия конкретного сценария.",
      "keywords": [
        "special",
        "rules"
      ],
      "termDe": "Sonderregeln",
      "summaryDe": "Zusätzliche Bedingungen eines bestimmten Szenarios."
    },
    {
      "id": "komponenty-scenariya",
      "term": "Компоненты сценария",
      "category": "scenario",
      "summary": "Список монстров и жетонов, которые нужно выставить в сценарии.",
      "keywords": [
        "scenario",
        "components"
      ],
      "termDe": "Szenariokomponenten",
      "summaryDe": "Die Liste der Monster und Marker, die im Szenario aufgebaut werden müßen."
    },
    {
      "id": "poyavlenie-monstrov",
      "term": "Появление монстров",
      "category": "scenario",
      "summary": "Постановка новых монстров в ходе сценария по особым правилам.",
      "keywords": [
        "spawn"
      ],
      "termDe": "Erscheinen von Monstern",
      "summaryDe": "Das Aufstellen neuer Monster im Verlauf eines Szenarios nach besonderen Regeln."
    },
    {
      "id": "uroven-scenariya",
      "term": "Уровень сценария",
      "category": "scenario",
      "summary": "Параметр сложности, влияющий на монстров, ловушки, золото за монету и бонусный опыт.",
      "keywords": [
        "scenario",
        "level"
      ],
      "termDe": "Szenariostufe",
      "summaryDe": "Ein Schwierigkeitswert, der Monster, Fallen, Gold pro Münze und Bonus-Erfahrung beeinflusst."
    },
    {
      "id": "slozhnost",
      "term": "Сложность",
      "category": "scenario",
      "summary": "Рекомендуемый уровень сценария и его изменения вверх/вниз.",
      "keywords": [
        "difficulty"
      ],
      "termDe": "Schwierigkeit",
      "summaryDe": "Die empfohlene Szenariostufe und ihre Anpassung nach oben oder unten."
    },
    {
      "id": "dopolnitelnaya-kniga-scenariev",
      "term": "Дополнительная книга сценариев",
      "category": "scenario",
      "summary": "Используется, если поле или текст сценария не помещаются на основном развороте.",
      "keywords": [
        "supplemental",
        "scenario",
        "book"
      ],
      "termDe": "Zusätzliches Szenariobuch",
      "summaryDe": "Wird verwendet, wenn Spielfeld oder Szenariotext nicht auf die Hauptdoppelseite passen."
    },
    {
      "id": "razdel",
      "term": "Раздел",
      "category": "scenario",
      "summary": "Дополнительный блок текста/правил, который читается при выполнении условия или открытии двери с номером.",
      "keywords": [
        "section"
      ],
      "termDe": "Abschnitt",
      "summaryDe": "Ein zusätzlicher Text- oder Regelblock, der gelesen wird, wenn eine Bedingung erfüllt ist oder eine Tür mit Nummer geöffnet wird."
    }
  ],
  "faq": [
    {
      "id": "faq-001",
      "question": "Можно ли использовать две верхние половины карт в один ход?",
      "answer_short": "Нет.",
      "answer_long": "В обычный ход вы всегда используете верх одной карты и низ другой. Две верхние или две нижние половины использовать нельзя.",
      "category": "cards",
      "questionDe": "Kann man in einem Zug zwei obere Kartenhälften verwenden?",
      "answer_shortDe": "Nein.",
      "answer_longDe": "In einem normalen Zug verwendest du immer die obere Hälfte einer Karte und die untere Hälfte einer anderen. Zwei obere oder zwei untere Hälften dürfen nicht verwendet werden."
    },
    {
      "id": "faq-002",
      "question": "Можно ли вместо половины карты сделать базовое действие?",
      "answer_short": "Да.",
      "answer_long": "Вместо любой верхней половины можно сделать Атаку 2, вместо любой нижней — Движение 2.",
      "category": "cards",
      "questionDe": "Kann man anstelle einer Kartenhälfte eine Grundaktion ausführen?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Anstelle einer beliebigen oberen Hälfte kannst du Angriff 2 ausführen, anstelle einer beliebigen unteren Hälfte Bewegung 2."
    },
    {
      "id": "faq-003",
      "question": "Нужна ли линия видимости для урона без атаки?",
      "answer_short": "Обычно нет.",
      "answer_long": "Урон без атаки не использует обычные правила атаки и, согласно кратким правилам, линия видимости для него не требуется, если карта прямо не говорит обратного.",
      "category": "actions",
      "questionDe": "Braucht man für Schaden ohne Angriff eine Sichtlinie?",
      "answer_shortDe": "Normalerweise nein.",
      "answer_longDe": "Schaden ohne Angriff verwendet nicht die üblichen Angriffsregeln und benötigt laut Kurzregeln keine Sichtlinie, sofern die Karte nicht ausdrücklich etwas anderes sagt."
    },
    {
      "id": "faq-004",
      "question": "Применяется ли состояние, если атака нанесла 0 урона?",
      "answer_short": "Да.",
      "answer_long": "Если цель пережила атаку, состояния и другие эффекты атаки всё равно применяются, даже когда итоговый урон стал 0.",
      "category": "combat",
      "questionDe": "Wird ein Zustand angewendet, wenn ein Angriff 0 Schaden verursacht hat?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Wenn das Ziel den Angriff überlebt hat, werden Zustände und andere Angriffseffekte trotzdem angewendet, auch wenn der endgültige Schaden 0 geworden ist."
    },
    {
      "id": "faq-005",
      "question": "Что происходит, если дальняя атака проводится по соседней клетке?",
      "answer_short": "Атака идёт с затруднением.",
      "answer_long": "Это правило действует и для персонажей, и для монстров.",
      "category": "combat",
      "questionDe": "Was passiert, wenn ein Fernangriff gegen ein benachbartes Feld ausgeführt wird?",
      "answer_shortDe": "Der Angriff wird mit Nachteil ausgeführt.",
      "answer_longDe": "Diese Regel gilt sowohl für Charaktere als auch für Monster."
    },
    {
      "id": "faq-006",
      "question": "Можно ли пройти через союзника?",
      "answer_short": "Да, но нельзя закончить ход на его клетке.",
      "answer_long": "Обычное движение позволяет проходить через союзников своей стороны.",
      "category": "movement",
      "questionDe": "Kann man sich durch einen Verbündeten bewegen?",
      "answer_shortDe": "Ja, aber man darf den Zug nicht auf seinem Feld beenden.",
      "answer_longDe": "Normale Bewegung erlaubt es, sich durch Verbündete der eigenen Seite hindurch zu bewegen."
    },
    {
      "id": "faq-007",
      "question": "Можно ли пройти через врага?",
      "answer_short": "Нет.",
      "answer_long": "Без прыжка через врагов проходить нельзя.",
      "category": "movement",
      "questionDe": "Kann man sich durch einen Gegner bewegen?",
      "answer_shortDe": "Nein.",
      "answer_longDe": "Ohne Sprung darf man sich nicht durch Gegner hindurch bewegen."
    },
    {
      "id": "faq-008",
      "question": "Прыжок игнорирует ловушки полностью?",
      "answer_short": "Не полностью.",
      "answer_long": "Во время прыжка ловушки игнорируются, но если вы заканчиваете движение на клетке с ловушкой, она срабатывает.",
      "category": "movement",
      "questionDe": "Ignoriert Sprung Fallen vollständig?",
      "answer_shortDe": "Nicht vollständig.",
      "answer_longDe": "Während eines Sprungs werden Fallen ignoriert, aber wenn du deine Bewegung auf einem Feld mit einer Falle beendest, wird sie ausgelöst."
    },
    {
      "id": "faq-009",
      "question": "Лечение снимает Отравление и Рану?",
      "answer_short": "Да.",
      "answer_long": "Отравление снимается лечением и при этом лечение больше ничего не восстанавливает; Рана также снимается лечением.",
      "category": "status",
      "questionDe": "Entfernt Heilen Gift und Wunde?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Gift wird durch Heilen entfernt; in diesem Fall stellt das Heilen keine weiteren Trefferpunkte wieder her. Wunde wird ebenfalls durch Heilen entfernt."
    },
    {
      "id": "faq-010",
      "question": "Что делает ОГЛУШЕНИЕ?",
      "answer_short": "Фигура не выполняет никаких действий.",
      "answer_long": "Стан длится до конца следующего хода фигуры.",
      "category": "status",
      "questionDe": "Was bewirkt BETÄUBUNG?",
      "answer_shortDe": "Die Figur führt keine Aktionen aus.",
      "answer_longDe": "Der Zustand dauert bis zum Ende des nächsten Zuges der Figur."
    },
    {
      "id": "faq-011",
      "question": "Когда снимаются обычные состояния?",
      "answer_short": "В конце следующего хода фигуры.",
      "answer_long": "Это касается большинства состояний с жетонами: Оглушение, Паралич, Разоружение, Смятение, Усиление.",
      "category": "status",
      "questionDe": "Wann werden normale Zustände entfernt?",
      "answer_shortDe": "Am Ende des nächsten Zuges der Figur.",
      "answer_longDe": "Das gilt für die meisten Zustände mit Markern: Betäubung, Immobilisierung, Entwaffnen, Verwirrung und Stärkung."
    },
    {
      "id": "faq-012",
      "question": "Когда снимаются Благословение и Проклятие?",
      "answer_short": "Когда соответствующая карта вытянута.",
      "answer_long": "После этого карта убирается из колоды, а не идёт в сброс.",
      "category": "status",
      "questionDe": "Wann werden Segen und Fluch entfernt?",
      "answer_shortDe": "Wenn die entsprechende Karte gezogen wird.",
      "answer_longDe": "Danach wird die Karte aus dem Deck entfernt und nicht auf den Ablagestapel gelegt."
    },
    {
      "id": "faq-013",
      "question": "Когда монстр выбирает цель, учитывает ли он нехватку движения в этом раунде?",
      "answer_short": "Нет.",
      "answer_long": "Для выбора цели монстр предполагает, что движение не ограничено, и выбирает того, кого в принципе атаковал бы быстрее всего.",
      "category": "monster_ai",
      "questionDe": "Berücksichtigt ein Monster bei der Zielwahl, dass ihm in dieser Runde vielleicht Bewegung fehlt?",
      "answer_shortDe": "Nein.",
      "answer_longDe": "Für die Zielwahl geht ein Monster davon aus, dass seine Bewegung nicht begrenzt ist, und wählt den Gegner, den es grundsätzlich am schnellsten angreifen könnte."
    },
    {
      "id": "faq-014",
      "question": "Монстры избегают ловушек?",
      "answer_short": "Да, если могут.",
      "answer_long": "Они считают ловушки препятствиями, если существует другой способ добраться до выгодной клетки для атаки.",
      "category": "monster_ai",
      "questionDe": "Vermeiden Monster Fallen?",
      "answer_shortDe": "Ja, wenn sie können.",
      "answer_longDe": "Monster behandeln Fallen wie Hindernisse, wenn es einen anderen Weg zu einem günstigen Feld für einen Angriff gibt."
    },
    {
      "id": "faq-015",
      "question": "Кто решает, если у монстра несколько одинаково хороших вариантов?",
      "answer_short": "Игроки.",
      "answer_long": "Это общее правило неопределённости: при нескольких равноправных вариантах решение принимают игроки совместно.",
      "category": "monster_ai",
      "questionDe": "Wer entscheidet, wenn ein Monster mehrere gleich gute Optionen hat?",
      "answer_shortDe": "Die Spieler.",
      "answer_longDe": "Das ist die allgemeine Regel für Unklarheiten: Wenn mehrere Möglichkeiten gleichwertig sind, entscheiden die Spieler gemeinsam."
    },
    {
      "id": "faq-016",
      "question": "Когда монстры из новой комнаты ходят после открытия двери?",
      "answer_short": "В этом же раунде.",
      "answer_long": "Если их инициатива уже прошла, они ходят сразу после персонажа, который открыл дверь.",
      "category": "scenario",
      "questionDe": "Wann handeln Monster aus einem neuen Raum nach dem Öffnen einer Tür?",
      "answer_shortDe": "In derselben Runde.",
      "answer_longDe": "Wenn ihre Initiative bereits vorbei ist, handeln sie sofort nach dem Charakter, der die Tür geöffnet hat."
    },
    {
      "id": "faq-017",
      "question": "Персонаж продолжает движение после открытия двери?",
      "answer_short": "Да.",
      "answer_long": "Если очки движения ещё остались, персонаж продолжает текущее действие движения.",
      "category": "scenario",
      "questionDe": "Setzt ein Charakter seine Bewegung nach dem Öffnen einer Tür fort?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Wenn noch Bewegungspunkte übrig sind, setzt der Charakter die laufende Bewegungsaktion fort."
    },
    {
      "id": "faq-018",
      "question": "Когда кладётся монета после смерти монстра?",
      "answer_short": "Сразу.",
      "answer_long": "Монета кладётся на клетку, где монстр умер.",
      "category": "economy",
      "questionDe": "Wann wird nach dem Tod eines Monsters eine Münze gelegt?",
      "answer_shortDe": "Sofort.",
      "answer_longDe": "Die Münze wird auf das Feld gelegt, auf dem das Monster gestorben ist."
    },
    {
      "id": "faq-019",
      "question": "Можно ли подобрать монеты просто встав на клетку?",
      "answer_short": "Да, в конце своего хода.",
      "answer_long": "Это правило добычи в конце хода.",
      "category": "economy",
      "questionDe": "Kann man Münzen einfach aufsammeln, indem man sich auf das Feld stellt?",
      "answer_shortDe": "Ja, am Ende des eigenen Zuges.",
      "answer_longDe": "Das ist die Regel für Beute am Ende des Zuges."
    },
    {
      "id": "faq-020",
      "question": "Можно ли отменить урон картами?",
      "answer_short": "Да.",
      "answer_long": "Чтобы отменить весь урон из одного источника, можно потерять 1 карту с руки или 2 карты из сброса.",
      "category": "progression",
      "questionDe": "Kann man Schaden mit Karten negieren?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Um den gesamten Schaden aus einer Quelle zu negieren, kann man 1 Karte von der Hand oder 2 Karten aus dem Ablagestapel verlieren."
    },
    {
      "id": "faq-021",
      "question": "Можно ли отменить урон двумя уже разыгранными в начале раунда картами?",
      "answer_short": "Нет.",
      "answer_long": "Они не находятся ни в руке, ни в сбросе, поэтому для отмены урона не подходят.",
      "category": "progression",
      "questionDe": "Kann man Schaden mit zwei Karten negieren, die zu Beginn der Runde bereits ausgespielt wurden?",
      "answer_shortDe": "Nein.",
      "answer_longDe": "Diese Karten befinden sich weder auf der Hand noch im Ablagestapel und eignen sich daher nicht, um Schaden zu negieren."
    },
    {
      "id": "faq-022",
      "question": "Когда персонаж изнуряется из-за карт?",
      "answer_short": "Когда в начале раунда не может разыграть 2 карты и не может отдыхать.",
      "answer_long": "То есть если нет нужных карт на руке и в сбросе недостаточно карт для отдыха.",
      "category": "progression",
      "questionDe": "Wann wird ein Charakter wegen seiner Karten erschöpft?",
      "answer_shortDe": "Wenn er zu Beginn der Runde keine 2 Karten spielen kann und nicht rasten kann.",
      "answer_longDe": "Das heißt: wenn nicht die nötigen Karten auf der Hand sind und sich auch nicht genug Karten im Ablagestapel für eine Rast befinden."
    },
    {
      "id": "faq-023",
      "question": "Что даёт долгий отдых кроме возврата карт?",
      "answer_short": "Лечение 2 и восстановление повернутых предметов.",
      "answer_long": "Кроме того, при долгом отдыхе вы сами выбираете карту, которая уйдёт в потери.",
      "category": "progression",
      "questionDe": "Was bringt eine Lange Rast außer dem Zurückholen von Karten?",
      "answer_shortDe": "Heilen 2 und Auffrischen verbrauchter Gegenstände.",
      "answer_longDe": "Außerdem wählst du bei einer Langen Rast selbst die Karte, die verloren geht."
    },
    {
      "id": "faq-024",
      "question": "Сколько карт предметов можно нести?",
      "answer_short": "По слотам.",
      "answer_long": "Ограничения задаются типом предмета; маленьких предметов можно брать половину уровня персонажа с округлением вверх.",
      "category": "economy",
      "questionDe": "Wie viele Gegenstandskarten darf man tragen?",
      "answer_shortDe": "Nach Ausrüstungsslots.",
      "answer_longDe": "Die Beschränkungen hängen vom Gegenstandstyp ab; kleine Gegenstände darf man in Anzahl der halben Charakterstufe, aufgerundet, mitnehmen."
    },
    {
      "id": "faq-025",
      "question": "Влияет ли уровень сценария на игру?",
      "answer_short": "Да.",
      "answer_long": "Он задаёт уровень монстров, урон ловушек, золото за монету и дополнительный опыт за успех.",
      "category": "scenario",
      "questionDe": "Beeinflusst die Szenariostufe das Spiel?",
      "answer_shortDe": "Ja.",
      "answer_longDe": "Sie bestimmt die Monsterstufe, den Schaden von Fallen, das Gold pro Münze und die zusätzliche Erfahrung für den Erfolg."
    }
  ]
}

;
