import type { Question } from '@/types/question.ts'

export const jsSymbolQuestions: Question[] = [
  // Тема 1: Что такое Symbol?
  {
    id: 1,
    question: "Что такое Symbol в JavaScript?",
    options: [
      "Новый примитивный тип данных для создания уникальных идентификаторов",
      "Функция для создания строк",
      "Метод для создания объектов",
      "Способ создания числовых идентификаторов"
    ],
    correctAnswer: 0,
    explanation: "Symbol — это примитивный тип данных, введенный в ES6, который создает уникальные идентификаторы. Каждый созданный Symbol уникален, даже если у них одинаковое описание.",
    topic: "Основы Symbol"
  },
  {
    id: 2,
    question: "Какое основное назначение Symbol в JavaScript?",
    options: [
      "Ускорение работы с объектами",
      "Создание уникальных ключей свойств объектов",
      "Замена строк в коде",
      "Упрощение работы с массивами"
    ],
    correctAnswer: 1,
    explanation: "Основное назначение Symbol — создание уникальных ключей для свойств объектов, которые не будут конфликтовать с другими свойствами и не будут перечислены в обычных циклах.",
    topic: "Основы Symbol"
  },
  {
    id: 3,
    question: "Как правильно создать Symbol?",
    options: [
      "new Symbol('description')",
      "Symbol('description')",
      "symbol('description')",
      "createSymbol('description')"
    ],
    correctAnswer: 1,
    explanation: "Symbol создается вызовом функции Symbol() с необязательным описанием. Важно: Symbol НЕ является конструктором, поэтому new Symbol() вызовет ошибку.",
    topic: "Основы Symbol"
  },
  {
    id: 4,
    question: "Что произойдет при выполнении этого кода?\n\nconst sym = new Symbol('test');",
    options: [
      "Создастся новый Symbol",
      "Будет выброшена ошибка TypeError",
      "Вернется undefined",
      "Создастся обычная строка"
    ],
    correctAnswer: 1,
    explanation: "Symbol не является конструктором, поэтому использование оператора new с Symbol() вызывает TypeError. Symbol должен вызываться как обычная функция.",
    topic: "Основы Symbol"
  },
  {
    id: 5,
    question: "Что вернет typeof для Symbol?",
    options: [
      "'object'",
      "'symbol'",
      "'string'",
      "'function'"
    ],
    correctAnswer: 1,
    explanation: "typeof для Symbol возвращает 'symbol' — это отдельный примитивный тип данных в JavaScript.",
    topic: "Основы Symbol"
  },
  {
    id: 6,
    question: "Можно ли преобразовать Symbol в строку с помощью String()?",
    options: [
      "Да, всегда можно",
      "Нет, это вызовет ошибку",
      "Да, String() и toString() работают, но неявное преобразование запрещено",
      "Только в строгом режиме"
    ],
    correctAnswer: 2,
    explanation: "Symbol можно явно преобразовать в строку с помощью String(symbol) или symbol.toString(), но неявное преобразование (например, symbol + '') вызовет TypeError.",
    topic: "Основы Symbol"
  },

  // Тема 2: Равны ли два символа Symbol("id") == Symbol("id")?
  {
    id: 7,
    question: "Равны ли два символа Symbol('id') === Symbol('id')?",
    options: [
      "true",
      "false",
      "Зависит от браузера",
      "true только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "Каждый вызов Symbol() создает уникальный символ, даже если описания одинаковые. Symbol('id') === Symbol('id') всегда false.",
    topic: "Уникальность Symbol"
  },
  {
    id: 8,
    question: "Что выведет этот код?\n\nconst sym1 = Symbol('test');\nconst sym2 = Symbol('test');\nconsole.log(sym1 == sym2);\nconsole.log(sym1 === sym2);",
    options: [
      "true, true",
      "false, false",
      "true, false",
      "false, true"
    ],
    correctAnswer: 1,
    explanation: "Оба сравнения вернут false, так как каждый Symbol уникален, независимо от описания. Операторы == и === работают одинаково для Symbol.",
    topic: "Уникальность Symbol"
  },
  {
    id: 9,
    question: "В каком случае два Symbol будут равны?",
    options: [
      "Если у них одинаковое описание",
      "Если они созданы в одном модуле",
      "Только если это один и тот же Symbol (одна ссылка)",
      "Symbol никогда не равны"
    ],
    correctAnswer: 2,
    explanation: "Два Symbol равны только если это один и тот же Symbol (одна ссылка на один объект). Единственное исключение — Symbol из глобального реестра.",
    topic: "Уникальность Symbol"
  },
  {
    id: 10,
    question: "Что произойдет в этом коде?\n\nconst sym = Symbol('key');\nconst obj = {};\nobj[sym] = 'value1';\nobj[Symbol('key')] = 'value2';\nconsole.log(Object.keys(obj).length);",
    options: [
      "0",
      "1",
      "2",
      "undefined"
    ],
    correctAnswer: 0,
    explanation: "Object.keys() не возвращает Symbol-ключи, поэтому длина будет 0. У объекта есть два свойства с Symbol-ключами, но Object.keys() их не видит.",
    topic: "Уникальность Symbol"
  },

  // Тема 3: Примеры использования символов
  {
    id: 11,
    question: "Какое основное преимущество использования Symbol в качестве ключей объекта?",
    options: [
      "Быстрее работают чем строки",
      "Скрытые свойства, которые не появляются в for...in и Object.keys()",
      "Занимают меньше памяти",
      "Лучше читаются в коде"
    ],
    correctAnswer: 1,
    explanation: "Symbol-ключи создают 'скрытые' свойства, которые не перечисляются в for...in, Object.keys(), Object.getOwnPropertyNames() и JSON.stringify().",
    topic: "Использование Symbol"
  },
  {
    id: 12,
    question: "Как получить все Symbol-ключи объекта?",
    options: [
      "Object.keys(obj)",
      "Object.getOwnPropertyNames(obj)",
      "Object.getOwnPropertySymbols(obj)",
      "for...in цикл"
    ],
    correctAnswer: 2,
    explanation: "Object.getOwnPropertySymbols() возвращает массив всех Symbol-ключей объекта. Это единственный способ получить Symbol-свойства объекта.",
    topic: "Использование Symbol"
  },
  {
    id: 13,
    question: "Что выведет этот код?\n\nconst sym = Symbol('hidden');\nconst obj = { name: 'test', [sym]: 'secret' };\nconsole.log(JSON.stringify(obj));",
    options: [
      "{\"name\":\"test\",\"Symbol(hidden)\":\"secret\"}",
      "{\"name\":\"test\"}",
      "Error",
      "{\"name\":\"test\",\"hidden\":\"secret\"}"
    ],
    correctAnswer: 1,
    explanation: "JSON.stringify() игнорирует Symbol-ключи, поэтому в результате будет только обычное свойство name.",
    topic: "Использование Symbol"
  },
  {
    id: 14,
    question: "Какой из примеров демонстрирует правильное использование Symbol для создания 'приватных' свойств?",
    options: [
      "const _private = '_private'; obj[_private] = 'value';",
      "const PRIVATE = Symbol('private'); obj[PRIVATE] = 'value';",
      "obj.private = 'value';",
      "const private = 'private'; obj[private] = 'value';"
    ],
    correctAnswer: 1,
    explanation: "Symbol создает уникальный ключ, который нельзя случайно переопределить или получить без доступа к самому Symbol. Это лучший способ создания 'приватных' свойств.",
    topic: "Использование Symbol"
  },
  {
    id: 15,
    question: "Будут ли Symbol-свойства скопированы при использовании Object.assign()?",
    options: [
      "Да, все Symbol-свойства будут скопированы",
      "Нет, Symbol-свойства игнорируются",
      "Только перечислимые Symbol-свойства",
      "Зависит от настроек браузера"
    ],
    correctAnswer: 0,
    explanation: "Object.assign() копирует все собственные перечислимые свойства, включая Symbol-ключи. Это одно из немногих исключений, где Symbol-свойства обрабатываются.",
    topic: "Использование Symbol"
  },

  // Тема 4: Как сделать два символа с одним именем? Глобальный реестр символов
  {
    id: 16,
    question: "Как создать два одинаковых Symbol с одним именем?",
    options: [
      "Symbol('name') дважды",
      "Symbol.for('name') дважды",
      "Symbol.global('name')",
      "Невозможно создать одинаковые Symbol"
    ],
    correctAnswer: 1,
    explanation: "Symbol.for() использует глобальный реестр символов. Если Symbol с таким ключом уже существует, возвращается существующий, иначе создается новый.",
    topic: "Глобальный реестр Symbol"
  },
  {
    id: 17,
    question: "Что выведет этот код?\n\nconst sym1 = Symbol.for('shared');\nconst sym2 = Symbol.for('shared');\nconsole.log(sym1 === sym2);",
    options: [
      "false",
      "true",
      "undefined",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "Symbol.for() возвращает одинаковый Symbol для одинакового ключа из глобального реестра, поэтому sym1 === sym2 будет true.",
    topic: "Глобальный реестр Symbol"
  },
  {
    id: 18,
    question: "В чем разница между Symbol() и Symbol.for()?",
    options: [
      "Symbol.for() быстрее работает",
      "Symbol() создает уникальный символ, Symbol.for() использует глобальный реестр",
      "Symbol.for() может принимать только строки",
      "Никакой разницы нет"
    ],
    correctAnswer: 1,
    explanation: "Symbol() всегда создает новый уникальный символ, а Symbol.for() проверяет глобальный реестр и возвращает существующий символ или создает новый с регистрацией в реестре.",
    topic: "Глобальный реестр Symbol"
  },
  {
    id: 19,
    question: "Как получить ключ Symbol из глобального реестра?",
    options: [
      "Symbol.key(symbol)",
      "Symbol.keyFor(symbol)",
      "symbol.key",
      "Symbol.getKey(symbol)"
    ],
    correctAnswer: 1,
    explanation: "Symbol.keyFor() возвращает ключ для Symbol из глобального реестра. Если Symbol не из глобального реестра, возвращает undefined.",
    topic: "Глобальный реестр Symbol"
  },
  {
    id: 20,
    question: "Что вернет Symbol.keyFor() для Symbol, созданного через Symbol()?",
    options: [
      "Описание символа",
      "undefined",
      "null",
      "Ошибку"
    ],
    correctAnswer: 1,
    explanation: "Symbol.keyFor() возвращает undefined для Symbol, созданного обычным способом (не через Symbol.for()), так как такие символы не регистрируются в глобальном реестре.",
    topic: "Глобальный реестр Symbol"
  },

  // Тема 5: Системные символы
  {
    id: 21,
    question: "Что такое well-known symbols (системные символы)?",
    options: [
      "Символы, созданные пользователем",
      "Предопределенные символы в JavaScript для настройки поведения объектов",
      "Символы из глобального реестра",
      "Символы с популярными именами"
    ],
    correctAnswer: 1,
    explanation: "Well-known symbols — это предопределенные символы в JavaScript (например, Symbol.iterator, Symbol.toStringTag), которые используются для настройки встроенного поведения объектов.",
    topic: "Системные Symbol"
  },
  {
    id: 22,
    question: "Для чего используется Symbol.iterator?",
    options: [
      "Для создания циклов",
      "Для определения метода итерации объекта",
      "Для сортировки массивов",
      "Для преобразования в строку"
    ],
    correctAnswer: 1,
    explanation: "Symbol.iterator используется для определения метода итерации объекта. Объекты с этим символом могут использоваться в for...of циклах и других итерационных контекстах.",
    topic: "Системные Symbol"
  },
  {
    id: 23,
    question: "Что делает Symbol.toStringTag?",
    options: [
      "Преобразует символ в строку",
      "Определяет результат Object.prototype.toString.call()",
      "Создает тег для HTML",
      "Форматирует вывод console.log"
    ],
    correctAnswer: 1,
    explanation: "Symbol.toStringTag позволяет настроить результат Object.prototype.toString.call() для объекта, определяя строку, которая появится в [object XXX].",
    topic: "Системные Symbol"
  },
  {
    id: 24,
    question: "Какие из перечисленных являются системными символами?",
    options: [
      "Symbol.iterator, Symbol.for, Symbol.keyFor",
      "Symbol.iterator, Symbol.toStringTag, Symbol.hasInstance",
      "Symbol.create, Symbol.delete, Symbol.update",
      "Symbol.global, Symbol.local, Symbol.shared"
    ],
    correctAnswer: 1,
    explanation: "Symbol.iterator, Symbol.toStringTag, Symbol.hasInstance — это well-known symbols. Symbol.for и Symbol.keyFor — это методы для работы с глобальным реестром, а не системные символы.",
    topic: "Системные Symbol"
  },
  {
    id: 25,
    question: "Что произойдет в этом коде?\n\nconst obj = {\n  [Symbol.toStringTag]: 'MyObject'\n};\nconsole.log(Object.prototype.toString.call(obj));",
    options: [
      "[object Object]",
      "[object MyObject]",
      "MyObject",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "Symbol.toStringTag позволяет настроить результат Object.prototype.toString.call(), поэтому вместо стандартного [object Object] выведется [object MyObject].",
    topic: "Системные Symbol"
  },
  {
    id: 26,
    question: "Как сделать объект итерируемым с помощью Symbol?",
    options: [
      "Добавить метод iterate()",
      "Добавить свойство [Symbol.iterator] с функцией-генератором или методом, возвращающим итератор",
      "Наследовать от Array",
      "Использовать Symbol.for('iterator')"
    ],
    correctAnswer: 1,
    explanation: "Чтобы сделать объект итерируемым, нужно добавить метод с ключом Symbol.iterator, который возвращает итератор (объект с методом next() или генератор).",
    topic: "Системные Symbol"
  }
]
