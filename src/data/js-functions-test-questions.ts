import type { Question } from '@/types/question.ts'

export const jsFunctionsQuestions: Question[] = [
  // Тема 1: Что такое функции?
  {
    id: 1,
    question: "Что такое функция в JavaScript?",
    options: [
      "Переменная для хранения данных",
      "Блок кода, который можно вызывать многократно",
      "Объект для создания классов",
      "Метод для работы с массивами"
    ],
    correctAnswer: 1,
    explanation: "Функция в JavaScript — это блок кода, который можно определить один раз и вызывать многократно. Функции позволяют организовать код, избежать повторений и создать переиспользуемые компоненты.",
    topic: "Основы функций"
  },
  {
    id: 2,
    question: "Какие из перечисленных характеристик НЕ относятся к функциям в JavaScript?",
    options: [
      "Функции являются объектами первого класса",
      "Функции могут возвращать другие функции",
      "Функции всегда должны возвращать значение",
      "Функции могут принимать другие функции как аргументы"
    ],
    correctAnswer: 2,
    explanation: "Функции в JavaScript НЕ обязаны возвращать значение. Если функция не содержит return или return без значения, она возвращает undefined. Все остальные характеристики верны для JavaScript функций.",
    topic: "Основы функций"
  },
  {
    id: 3,
    question: "Что означает фраза 'функции являются объектами первого класса' в JavaScript?",
    options: [
      "Функции можно создавать только в начале программы",
      "Функции можно присваивать переменным, передавать как аргументы и возвращать из других функций",
      "Функции имеют более высокий приоритет выполнения",
      "Функции могут наследоваться от других функций"
    ],
    correctAnswer: 1,
    explanation: "Объекты первого класса (first-class citizens) — это сущности, которые поддерживают все операции, доступные другим сущностям. Для функций это означает возможность присвоения переменным, передачи как аргументов, возврата из функций и создания во время выполнения.",
    topic: "Основы функций"
  },
  {
    id: 4,
    question: "Какая из следующих записей НЕ является функцией?",
    options: [
      "function myFunc() {}",
      "const myFunc = function() {}",
      "const myFunc = () => {}",
      "const myFunc = 'function'"
    ],
    correctAnswer: 3,
    explanation: "const myFunc = 'function' создает строковую переменную, а не функцию. Все остальные варианты создают функции: обычное объявление, функциональное выражение и стрелочная функция соответственно.",
    topic: "Основы функций"
  },

  // Тема 2: Какие функции есть в JS?
  {
    id: 5,
    question: "Какие основные типы функций существуют в JavaScript?",
    options: [
      "Только обычные функции",
      "Function Declaration, Function Expression, Arrow Function",
      "Синхронные и асинхронные функции",
      "Встроенные и пользовательские функции"
    ],
    correctAnswer: 1,
    explanation: "В JavaScript существуют три основных синтаксиса создания функций: Function Declaration (объявление функции), Function Expression (функциональное выражение) и Arrow Function (стрелочная функция).",
    topic: "Типы функций"
  },
  {
    id: 6,
    question: "Что такое Function Declaration?",
    options: [
      "Присвоение функции переменной",
      "Объявление функции с ключевым словом function и именем",
      "Создание функции с помощью стрелки =>",
      "Вызов уже существующей функции"
    ],
    correctAnswer: 1,
    explanation: "Function Declaration — это объявление функции с использованием ключевого слова function, за которым следует имя функции. Например: function myFunc() {}. Такие функции подвержены hoisting.",
    topic: "Типы функций"
  },
  {
    id: 7,
    question: "Что такое Function Expression?",
    options: [
      "Объявление функции в начале программы",
      "Создание функции и присвоение её переменной",
      "Функция, которая возвращает выражение",
      "Функция без параметров"
    ],
    correctAnswer: 1,
    explanation: "Function Expression — это создание функции как части выражения, обычно с присвоением переменной. Например: const myFunc = function() {}. Такие функции не подвержены hoisting переменной.",
    topic: "Типы функций"
  },
  {
    id: 8,
    question: "Какой синтаксис у Arrow Function (стрелочной функции)?",
    options: [
      "function() => {}",
      "() => {}",
      "=> function() {}",
      "function => () {}"
    ],
    correctAnswer: 1,
    explanation: "Arrow Function использует синтаксис () => {}, где () — параметры функции, => — стрелка, {} — тело функции. Например: const myFunc = () => {}.",
    topic: "Типы функций"
  },

  // Тема 3: Разница между типами функций
  {
    id: 9,
    question: "В чем главное отличие Arrow Function от обычных функций в контексте 'this'?",
    options: [
      "Arrow Function всегда имеет this равный window",
      "Arrow Function наследует this из внешнего контекста",
      "Arrow Function создает свой собственный this",
      "В Arrow Function нельзя использовать this"
    ],
    correctAnswer: 1,
    explanation: "Arrow Function не создает собственный контекст this, а наследует его из лексического окружения (внешнего контекста). Обычные функции создают свой собственный this.",
    topic: "Различия типов функций"
  },
  {
    id: 10,
    question: "Какие функции подвержены hoisting (всплытию)?",
    options: [
      "Только Arrow Function",
      "Только Function Declaration",
      "Function Declaration и Function Expression",
      "Все типы функций одинаково"
    ],
    correctAnswer: 1,
    explanation: "Только Function Declaration полностью подвержены hoisting — их можно вызывать до объявления в коде. Function Expression и Arrow Function не всплывают (hoisting применяется только к переменной, но не к функции).",
    topic: "Различия типов функций"
  },
  {
    id: 11,
    question: "Можно ли использовать arguments объект в Arrow Function?",
    options: [
      "Да, arguments доступен во всех функциях",
      "Нет, в Arrow Function нет собственного arguments",
      "Да, но только в строгом режиме",
      "Нет, arguments устарел"
    ],
    correctAnswer: 1,
    explanation: "Arrow Function не имеет собственного объекта arguments. Для получения аргументов в стрелочных функциях нужно использовать rest параметры: (...args) => {}.",
    topic: "Различия типов функций"
  },
  {
    id: 12,
    question: "Какой из примеров кода НЕ будет работать?",
    options: [
      "sayHello(); function sayHello() { console.log('Hello'); }",
      "const sayHello = function() { console.log('Hello'); }; sayHello();",
      "sayHello(); const sayHello = () => { console.log('Hello'); };",
      "const sayHello = () => { console.log('Hello'); }; sayHello();"
    ],
    correctAnswer: 2,
    explanation: "Третий пример не работает из-за temporal dead zone. Arrow Function присвоена переменной const, которая не инициализирована до выполнения строки присвоения, но мы пытаемся вызвать её раньше.",
    topic: "Различия типов функций"
  },
  {
    id: 13,
    question: "В каком случае стрелочная функция может НЕ иметь фигурные скобки?",
    options: [
      "Когда у неё нет параметров",
      "Когда она содержит только одно выражение",
      "Когда она не возвращает значение",
      "Никогда, скобки обязательны"
    ],
    correctAnswer: 1,
    explanation: "Стрелочная функция может не иметь фигурных скобок, если её тело состоит из одного выражения. В этом случае результат выражения автоматически возвращается: const add = (a, b) => a + b.",
    topic: "Различия типов функций"
  },
  {
    id: 14,
    question: "Что произойдет с этим кодом?\nconst obj = {\n  name: 'Test',\n  getName: () => this.name\n};\nconsole.log(obj.getName());",
    options: [
      "Выведет 'Test'",
      "Выведет undefined или значение из глобального контекста",
      "Выведет ошибку",
      "Выведет null"
    ],
    correctAnswer: 1,
    explanation: "Arrow Function наследует this из внешнего лексического контекста (в данном случае — глобального), а не от объекта obj. Поэтому this.name будет undefined или значение из глобального контекста.",
    topic: "Различия типов функций"
  },
  {
    id: 15,
    question: "Можно ли использовать Arrow Function как конструктор с new?",
    options: [
      "Да, как и обычные функции",
      "Нет, Arrow Function нельзя вызывать с new",
      "Да, но только в строгом режиме",
      "Да, но они не создают прототип"
    ],
    correctAnswer: 1,
    explanation: "Arrow Function нельзя использовать как конструктор с оператором new. При попытке вызова с new будет выброшена ошибка TypeError, так как у стрелочных функций нет внутреннего метода [[Construct]].",
    topic: "Различия типов функций"
  },
  {
    id: 16,
    question: "Какая функция создает собственную область видимости для var переменных?",
    options: [
      "Только Function Declaration",
      "Только Function Expression",
      "Только Arrow Function",
      "Все типы функций создают область видимости"
    ],
    correctAnswer: 3,
    explanation: "Все типы функций (Function Declaration, Function Expression, Arrow Function) создают собственную область видимости (function scope) для переменных, включая var.",
    topic: "Различия типов функций"
  },
  {
    id: 17,
    question: "Что выведет этот код?\nfunction test() {\n  console.log(typeof arguments);\n}\ntest();",
    options: [
      "'undefined'",
      "'object'",
      "'array'",
      "'function'"
    ],
    correctAnswer: 1,
    explanation: "Объект arguments в обычных функциях имеет тип 'object'. Это псевдомассив, который содержит все аргументы, переданные функции.",
    topic: "Различия типов функций"
  },
  {
    id: 18,
    question: "Какое поведение у return в Arrow Function без фигурных скобок?",
    options: [
      "Нужно явно писать return",
      "Результат выражения возвращается автоматически",
      "Функция всегда возвращает undefined",
      "Возвращает только числовые значения"
    ],
    correctAnswer: 1,
    explanation: "В Arrow Function без фигурных скобок результат выражения возвращается автоматически (неявный return). Например: const double = x => x * 2 эквивалентно const double = x => { return x * 2; }.",
    topic: "Различия типов функций"
  },
  {
    id: 19,
    question: "Можно ли дать имя Function Expression?",
    options: [
      "Нет, Function Expression всегда анонимные",
      "Да, можно создать именованное Function Expression",
      "Да, но только если присвоить переменной",
      "Имя можно дать только Arrow Function"
    ],
    correctAnswer: 1,
    explanation: "Можно создать именованное Function Expression: const myVar = function myName() {}. Имя функции будет доступно только внутри самой функции, что полезно для рекурсии и отладки.",
    topic: "Различия типов функций"
  },
  {
    id: 20,
    question: "Что произойдет при выполнении этого кода?\nconsole.log(foo);\nvar foo = function() { return 'Hello'; };",
    options: [
      "Выведет функцию",
      "Выведет undefined",
      "Выведет ошибку ReferenceError",
      "Выведет 'Hello'"
    ],
    correctAnswer: 1,
    explanation: "Переменная foo подвержена hoisting и инициализируется как undefined. Функция присваивается переменной только при выполнении строки присвоения, поэтому на момент console.log значение undefined.",
    topic: "Различия типов функций"
  }
]
