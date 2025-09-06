import type { Question } from '@/types/question.ts'

export const jsHoistingQuestions: Question[] = [
  // Тема 1: Какие конструкции всплывают в JS
  {
    id: 1,
    question: "Что такое hoisting (всплытие) в JavaScript?",
    options: [
      "Перемещение всех переменных в глобальную область видимости",
      "Механизм, при котором объявления переменных и функций поднимаются в начало их области видимости",
      "Оптимизация кода JavaScript движком",
      "Способ создания замыканий"
    ],
    correctAnswer: 1,
    explanation: "Hoisting — это механизм JavaScript, при котором объявления переменных и функций концептуально поднимаются (всплывают) в начало их области видимости во время фазы компиляции.",
    topic: "Основы Hoisting"
  },
  {
    id: 2,
    question: "Какие конструкции подвержены hoisting в JavaScript?",
    options: [
      "Только переменные var",
      "Только function declarations",
      "var, function declarations, let, const (но по-разному)",
      "Все переменные одинаково"
    ],
    correctAnswer: 2,
    explanation: "Hoisting затрагивает var, function declarations, let и const, но поведение различается: var инициализируется как undefined, function declarations полностью всплывают, а let/const попадают в temporal dead zone.",
    topic: "Основы Hoisting"
  },
  {
    id: 3,
    question: "Что произойдет при выполнении этого кода?\n\nconsole.log(myVar);\nvar myVar = 5;",
    options: [
      "Выведет 5",
      "Выведет undefined",
      "Выдаст ReferenceError",
      "Выдаст TypeError"
    ],
    correctAnswer: 1,
    explanation: "Из-за hoisting объявление var myVar поднимается наверх и инициализируется как undefined. Присвоение значения 5 происходит на месте оригинального объявления.",
    topic: "Основы Hoisting"
  },
  {
    id: 4,
    question: "Как ведут себя function declarations при hoisting?",
    options: [
      "Только имя функции всплывает",
      "Функция полностью всплывает и доступна для вызова",
      "Функции не подвержены hoisting",
      "Функция всплывает как undefined"
    ],
    correctAnswer: 1,
    explanation: "Function declarations полностью всплывают, включая их определение. Это означает, что функцию можно вызвать до её объявления в коде.",
    topic: "Основы Hoisting"
  },
  {
    id: 5,
    question: "Что выведет этот код?\n\nsayHello();\n\nfunction sayHello() {\n  console.log('Hello!');\n}",
    options: [
      "ReferenceError",
      "TypeError",
      "Hello!",
      "undefined"
    ],
    correctAnswer: 2,
    explanation: "Function declaration полностью всплывает, поэтому функция sayHello доступна для вызова еще до ее объявления в коде.",
    topic: "Основы Hoisting"
  },
  {
    id: 6,
    question: "Что происходит с function expressions при hoisting?",
    options: [
      "Они полностью всплывают как function declarations",
      "Всплывает только переменная, функция остается undefined до присвоения",
      "Они не подвержены hoisting",
      "Они вызывают ошибку"
    ],
    correctAnswer: 1,
    explanation: "В function expressions всплывает только объявление переменной (var, let, const), а функция остается undefined до момента присвоения.",
    topic: "Основы Hoisting"
  },
  {
    id: 7,
    question: "Что выведет этот код?\n\nconsole.log(myFunc);\nmyFunc();\nvar myFunc = function() {\n  console.log('Hello');\n};",
    options: [
      "undefined, затем Hello",
      "Hello, затем undefined",
      "undefined, затем TypeError",
      "ReferenceError"
    ],
    correctAnswer: 2,
    explanation: "Переменная myFunc всплывает как undefined. Первый console.log выведет undefined, а попытка вызова myFunc() вызовет TypeError, так как undefined не является функцией.",
    topic: "Основы Hoisting"
  },
  {
    id: 8,
    question: "Как hoisting работает в области видимости функции?",
    options: [
      "Все переменные всплывают в глобальную область",
      "Переменные всплывают в начало функции, где они объявлены",
      "Hoisting не работает внутри функций",
      "Переменные всплывают только наружу функции"
    ],
    correctAnswer: 1,
    explanation: "Hoisting работает в пределах области видимости. Переменные и функции всплывают в начало той функции (или глобальной области), где они объявлены.",
    topic: "Основы Hoisting"
  },
  {
    id: 9,
    question: "Что произойдет в этом коде?\n\nfunction test() {\n  console.log(a);\n  var a = 1;\n  console.log(a);\n}\ntest();",
    options: [
      "undefined, 1",
      "1, 1",
      "ReferenceError",
      "1, undefined"
    ],
    correctAnswer: 0,
    explanation: "Объявление var a всплывает в начало функции и инициализируется как undefined. Первый console.log выведет undefined, после присвоения второй выведет 1.",
    topic: "Основы Hoisting"
  },
  {
    id: 10,
    question: "Какой из следующих вариантов НЕ подвержен hoisting?",
    options: [
      "var переменные",
      "function declarations",
      "let и const (технически всплывают, но в TDZ)",
      "Значения присваиваемые переменным"
    ],
    correctAnswer: 3,
    explanation: "Значения (инициализация) не всплывают, всплывают только объявления. Переменные инициализируются на месте присвоения, а не в начале области видимости.",
    topic: "Основы Hoisting"
  },

  // Тема 2: Можем ли мы обращаться к переменной var до её определения в коде, можем ли это сделать для const, let?
  {
    id: 11,
    question: "Можно ли обращаться к переменной var до её объявления в коде?",
    options: [
      "Нет, будет ReferenceError",
      "Да, но значение будет undefined",
      "Да, значение будет null",
      "Да, значение будет таким же, как после объявления"
    ],
    correctAnswer: 1,
    explanation: "К переменной var можно обращаться до её объявления благодаря hoisting, но значение будет undefined, поскольку всплывает только объявление, а не инициализация.",
    topic: "var vs let/const"
  },
  {
    id: 12,
    question: "Что произойдет при обращении к переменной let до её объявления?",
    options: [
      "Вернется undefined",
      "Вернется null",
      "Будет выброшен ReferenceError",
      "Вернется значение из глобальной области"
    ],
    correctAnswer: 2,
    explanation: "Переменные let технически всплывают, но попадают в Temporal Dead Zone (TDZ). Обращение к ним до объявления вызывает ReferenceError.",
    topic: "var vs let/const"
  },
  {
    id: 13,
    question: "Что такое Temporal Dead Zone (TDZ)?",
    options: [
      "Область памяти для хранения временных переменных",
      "Период между началом области видимости и объявлением let/const переменной",
      "Зона, где переменные автоматически удаляются",
      "Область видимости только для const переменных"
    ],
    correctAnswer: 1,
    explanation: "Temporal Dead Zone — это период от начала области видимости до места объявления переменной let/const, в течение которого обращение к переменной вызывает ReferenceError.",
    topic: "var vs let/const"
  },
  {
    id: 14,
    question: "Что выведет этот код?\n\nconsole.log(a);\nconsole.log(b);\nvar a = 1;\nlet b = 2;",
    options: [
      "undefined, undefined",
      "1, 2",
      "undefined, ReferenceError",
      "ReferenceError, ReferenceError"
    ],
    correctAnswer: 2,
    explanation: "Переменная a (var) всплывает и инициализируется как undefined. Переменная b (let) находится в TDZ до своего объявления, поэтому обращение к ней вызывает ReferenceError.",
    topic: "var vs let/const"
  },
  {
    id: 15,
    question: "Как ведет себя const при hoisting?",
    options: [
      "Точно так же, как var",
      "Точно так же, как let — попадает в TDZ",
      "const не подвержен hoisting",
      "const всплывает, но сразу получает свое значение"
    ],
    correctAnswer: 1,
    explanation: "const ведет себя так же, как let — технически всплывает, но попадает в Temporal Dead Zone до момента объявления и инициализации.",
    topic: "var vs let/const"
  },
  {
    id: 16,
    question: "Что произойдет в этом коде?\n\nfunction test() {\n  console.log(x);\n  let x = 5;\n}\ntest();",
    options: [
      "Выведет undefined",
      "Выведет 5",
      "Выдаст ReferenceError",
      "Выведет null"
    ],
    correctAnswer: 2,
    explanation: "Переменная x (let) находится в Temporal Dead Zone до своего объявления. Обращение к ней до объявления вызывает ReferenceError: Cannot access 'x' before initialization.",
    topic: "var vs let/const"
  },
  {
    id: 17,
    question: "В чем основное различие между hoisting var и let/const?",
    options: [
      "var не всплывает, let/const всплывают",
      "var всплывает и инициализируется undefined, let/const всплывают в TDZ",
      "let/const не всплывают вообще",
      "Различий нет"
    ],
    correctAnswer: 1,
    explanation: "Основное различие: var всплывает и сразу инициализируется как undefined, а let/const всплывают, но попадают в TDZ и недоступны до объявления.",
    topic: "var vs let/const"
  },
  {
    id: 18,
    question: "Что выведет этот код?\n\nvar x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();",
    options: [
      "1",
      "2",
      "undefined",
      "ReferenceError"
    ],
    correctAnswer: 2,
    explanation: "Локальная переменная var x всплывает в начало функции и затеняет глобальную переменную x. На момент console.log локальная x еще не инициализирована, поэтому выводится undefined.",
    topic: "var vs let/const"
  },
  {
    id: 19,
    question: "Что произойдет в этом коде?\n\nlet x = 1;\nfunction test() {\n  console.log(x);\n  let x = 2;\n}\ntest();",
    options: [
      "1",
      "2",
      "undefined",
      "ReferenceError"
    ],
    correctAnswer: 3,
    explanation: "Локальная переменная let x всплывает и создает TDZ, затеняя глобальную переменную. Обращение к x до её объявления вызывает ReferenceError.",
    topic: "var vs let/const"
  },
  {
    id: 20,
    question: "Можно ли повторно объявить переменную var в той же области видимости?",
    options: [
      "Нет, будет ошибка",
      "Да, и это не вызовет ошибку",
      "Да, но только в глобальной области",
      "Да, но только внутри функций"
    ],
    correctAnswer: 1,
    explanation: "Переменные var можно объявлять повторно в той же области видимости без ошибок. Это одно из отличий от let/const, которые вызывают SyntaxError при повторном объявлении.",
    topic: "var vs let/const"
  }
]
