import type { Question } from '@/types/question.ts'

export const jsContextQuestions: Question[] = [
  // Тема 1: Что такое контекст
  {
    id: 1,
    question: "Что такое контекст выполнения в JavaScript?",
    options: [
      "Место в коде, где объявлена функция",
      "Окружение, в котором выполняется код, включающее значение this и доступные переменные",
      "Порядок выполнения функций в программе",
      "Способ передачи аргументов в функцию"
    ],
    correctAnswer: 1,
    explanation: "Контекст выполнения (execution context) — это окружение, в котором выполняется JavaScript код. Он включает значение this, переменные, функции и лексическое окружение.",
    topic: "Основы контекста"
  },
  {
    id: 2,
    question: "Какие типы контекста выполнения существуют в JavaScript?",
    options: [
      "Только глобальный контекст",
      "Глобальный, функциональный и блочный контекст",
      "Глобальный, функциональный и eval контекст",
      "Локальный и глобальный контекст"
    ],
    correctAnswer: 2,
    explanation: "В JavaScript существуют три типа контекста выполнения: глобальный (Global), функциональный (Function) и eval контекст. Каждый имеет свои особенности создания и управления.",
    topic: "Основы контекста"
  },
  {
    id: 3,
    question: "Что происходит при создании контекста выполнения?",
    options: [
      "Создается только переменная this",
      "Создается this, Variable Object и Scope Chain",
      "Создается только Scope Chain",
      "Создается только Variable Object"
    ],
    correctAnswer: 1,
    explanation: "При создании контекста выполнения создаются три компонента: this binding (привязка this), Variable Object (объект переменных) и Scope Chain (цепочка областей видимости).",
    topic: "Основы контекста"
  },
  {
    id: 4,
    question: "Чем отличается лексическая область видимости от контекста выполнения?",
    options: [
      "Это одно и то же",
      "Лексическая область определяется местом объявления, контекст — способом вызова",
      "Лексическая область работает только с var, контекст — с let/const",
      "Контекст определяется местом объявления, лексическая область — способом вызова"
    ],
    correctAnswer: 1,
    explanation: "Лексическая область видимости определяется тем, где код написан (статически), а контекст выполнения зависит от того, как функция вызывается (динамически).",
    topic: "Основы контекста"
  },
  {
    id: 5,
    question: "Что такое Call Stack в контексте выполнения?",
    options: [
      "Список всех переменных в программе",
      "Стек контекстов выполнения, отслеживающий выполнение функций",
      "Способ вызова функций",
      "Механизм для создания замыканий"
    ],
    correctAnswer: 1,
    explanation: "Call Stack — это структура данных LIFO, которая отслеживает контексты выполнения. При вызове функции её контекст добавляется в стек, при завершении — удаляется.",
    topic: "Основы контекста"
  },

  // Тема 2: Ключевое слово this
  {
    id: 6,
    question: "От чего зависит значение this в JavaScript?",
    options: [
      "От места объявления функции",
      "От способа вызова функции",
      "От типа функции (обычная или стрелочная)",
      "От области видимости"
    ],
    correctAnswer: 1,
    explanation: "Значение this в JavaScript определяется тем, КАК функция вызывается, а не где она объявлена (за исключением стрелочных функций).",
    topic: "Ключевое слово this"
  },
  {
    id: 7,
    question: "Что такое this в глобальном контексте?",
    options: [
      "undefined",
      "null",
      "window (в браузере) или global (в Node.js)",
      "document"
    ],
    correctAnswer: 2,
    explanation: "В глобальном контексте this ссылается на глобальный объект: window в браузере или global в Node.js. В строгом режиме может быть undefined.",
    topic: "Ключевое слово this"
  },
  {
    id: 8,
    question: "Что выведет этот код?\n\nconst obj = {\n  name: 'Test',\n  getName: function() {\n    return this.name;\n  }\n};\n\nconst fn = obj.getName;\nconsole.log(fn());",
    options: [
      "'Test'",
      "undefined или ошибка",
      "null",
      "''"
    ],
    correctAnswer: 1,
    explanation: "При извлечении метода из объекта теряется контекст. Функция fn вызывается без контекста, поэтому this будет undefined (в строгом режиме) или глобальным объектом.",
    topic: "Ключевое слово this"
  },
  {
    id: 9,
    question: "Как ведет себя this в стрелочных функциях?",
    options: [
      "Определяется способом вызова",
      "Всегда равно window",
      "Берется из лексического окружения (не создает собственный this)",
      "Всегда равно undefined"
    ],
    correctAnswer: 2,
    explanation: "Стрелочные функции не создают собственный this, а наследуют его из лексического окружения (внешней области видимости).",
    topic: "Ключевое слово this"
  },
  {
    id: 10,
    question: "Что выведет этот код?\n\nconst obj = {\n  name: 'Test',\n  getName: () => this.name\n};\nconsole.log(obj.getName());",
    options: [
      "'Test'",
      "undefined",
      "Ошибка",
      "null"
    ],
    correctAnswer: 1,
    explanation: "Стрелочная функция берет this из внешнего лексического окружения (глобального), где this.name скорее всего undefined.",
    topic: "Ключевое слово this"
  },
  {
    id: 11,
    question: "Что произойдет с this при вызове функции как конструктора с new?",
    options: [
      "this будет undefined",
      "this будет ссылаться на новый созданный объект",
      "this будет равно глобальному объекту",
      "this будет равно самой функции"
    ],
    correctAnswer: 1,
    explanation: "При вызове функции с оператором new создается новый объект, и this внутри функции-конструктора ссылается на этот новый объект.",
    topic: "Ключевое слово this"
  },
  {
    id: 12,
    question: "В каком случае this в методе объекта будет ссылаться на сам объект?",
    options: [
      "Всегда",
      "Никогда",
      "Когда метод вызывается через точечную нотацию obj.method()",
      "Только если метод объявлен как стрелочная функция"
    ],
    correctAnswer: 2,
    explanation: "this в методе объекта ссылается на объект только при вызове через точечную нотацию (obj.method()) или скобочную нотацию (obj['method']()).",
    topic: "Ключевое слово this"
  },

  // Тема 3: Способы привязки контекста (call, bind, apply)
  {
    id: 13,
    question: "В чем разница между call и apply?",
    options: [
      "call принимает аргументы по отдельности, apply — массивом",
      "apply принимает аргументы по отдельности, call — массивом",
      "Никакой разницы нет",
      "call создает новую функцию, apply — нет"
    ],
    correctAnswer: 0,
    explanation: "call принимает аргументы по отдельности: func.call(context, arg1, arg2), а apply принимает массив аргументов: func.apply(context, [arg1, arg2]).",
    topic: "Привязка контекста"
  },
  {
    id: 14,
    question: "Что делает метод bind?",
    options: [
      "Немедленно вызывает функцию с указанным контекстом",
      "Создает новую функцию с привязанным контекстом",
      "Изменяет исходную функцию",
      "Копирует функцию"
    ],
    correctAnswer: 1,
    explanation: "bind создает новую функцию с жестко привязанным контекстом (и опционально предзаданными аргументами), но не вызывает её сразу.",
    topic: "Привязка контекста"
  },
  {
    id: 15,
    question: "Что выведет этот код?\n\nfunction greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\n\nconst person = { name: 'Alice' };\nconst result = greet.call(person, 'Hello', '!');\nconsole.log(result);",
    options: [
      "'Hello, Alice!'",
      "'Hello, undefined!'",
      "Ошибка",
      "'Hello, !'",
    ],
    correctAnswer: 0,
    explanation: "call устанавливает this как person, поэтому this.name равно 'Alice'. Аргументы 'Hello' и '!' передаются в функцию по порядку.",
    topic: "Привязка контекста"
  },
  {
    id: 16,
    question: "Какой результат даст этот код?\n\nfunction multiply(a, b) {\n  return a * b * this.factor;\n}\n\nconst obj = { factor: 2 };\nconst result = multiply.apply(obj, [3, 4]);\nconsole.log(result);",
    options: [
      "12",
      "24",
      "6",
      "8"
    ],
    correctAnswer: 1,
    explanation: "apply устанавливает this как obj, поэтому this.factor равно 2. Аргументы [3, 4] передаются как a=3, b=4. Результат: 3 * 4 * 2 = 24.",
    topic: "Привязка контекста"
  },
  {
    id: 17,
    question: "Можно ли изменить контекст функции, созданной с помощью bind?",
    options: [
      "Да, с помощью call или apply",
      "Нет, контекст привязан навсегда",
      "Да, но только с помощью другого bind",
      "Да, но только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "Функция, созданная с помощью bind, имеет жестко привязанный контекст, который нельзя изменить даже с помощью call, apply или повторного bind.",
    topic: "Привязка контекста"
  },
  {
    id: 18,
    question: "Что произойдет при использовании call/apply на стрелочной функции?",
    options: [
      "Контекст изменится как обычно",
      "Контекст не изменится, останется лексический",
      "Будет ошибка",
      "Стрелочная функция станет обычной"
    ],
    correctAnswer: 1,
    explanation: "Стрелочные функции игнорируют попытки изменить контекст через call, apply или bind, сохраняя лексический this.",
    topic: "Привязка контекста"
  },

  // Тема 4: Частичное применение func.bind(context, [arg1], [arg2], ...)
  {
    id: 19,
    question: "Что такое частичное применение функции (partial application)?",
    options: [
      "Вызов функции с неполным набором аргументов",
      "Создание новой функции с предзаданными аргументами",
      "Разделение функции на части",
      "Применение функции к массиву"
    ],
    correctAnswer: 1,
    explanation: "Частичное применение — это техника создания новой функции путем фиксации некоторых аргументов исходной функции. В JavaScript это можно сделать с помощью bind.",
    topic: "Частичное применение"
  },
  {
    id: 20,
    question: "Что выведет этот код?\n\nfunction add(a, b, c) {\n  return a + b + c;\n}\n\nconst addFive = add.bind(null, 5);\nconst result = addFive(3, 2);\nconsole.log(result);",
    options: [
      "5",
      "10",
      "8",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "bind создает новую функцию с предзаданным первым аргументом a=5. При вызове addFive(3, 2) получается add(5, 3, 2) = 10.",
    topic: "Частичное применение"
  },
  {
    id: 21,
    question: "Как с помощью bind задать дефолтный аргумент у новой функции?",
    options: [
      "Нельзя задать дефолтные аргументы через bind",
      "Передать дефолтное значение в bind после контекста",
      "Использовать специальный символ DEFAULT",
      "Bind автоматически создает дефолтные значения"
    ],
    correctAnswer: 1,
    explanation: "С помощью bind можно создать функцию с предзаданными (дефолтными) аргументами: func.bind(context, defaultArg1, defaultArg2). Эти аргументы будут переданы в начале списка параметров.",
    topic: "Частичное применение"
  },
  {
    id: 22,
    question: "Что произойдет в этом коде?\n\nfunction greet(greeting, name, punctuation) {\n  return `${greeting} ${name}${punctuation}`;\n}\n\nconst sayHello = greet.bind(null, 'Hello');\nconst sayHelloToJohn = sayHello.bind(null, 'John');\nconst result = sayHelloToJohn('!');\nconsole.log(result);",
    options: [
      "'Hello John!'",
      "'Hello John undefined'",
      "'John !'",
      "Ошибка"
    ],
    correctAnswer: 0,
    explanation: "Первый bind фиксирует greeting='Hello', второй bind фиксирует name='John'. При вызове с '!' получается greet('Hello', 'John', '!').",
    topic: "Частичное применение"
  },
  {
    id: 23,
    question: "Можно ли применить bind несколько раз к одной функции?",
    options: [
      "Нет, bind можно применить только один раз",
      "Да, каждый bind добавляет новые предзаданные аргументы",
      "Да, но только для изменения контекста",
      "Да, но предыдущие bind отменяются"
    ],
    correctAnswer: 1,
    explanation: "Bind можно применять несколько раз. Каждый последующий bind создает новую функцию с дополнительными предзаданными аргументами, добавляя их к уже существующим.",
    topic: "Частичное применение"
  },
  {
    id: 24,
    question: "Что выведет этот код?\n\nfunction calculate(operation, a, b) {\n  return operation === 'add' ? a + b : a * b;\n}\n\nconst multiply = calculate.bind(null, 'multiply');\nconst multiplyByTwo = multiply.bind(null, 2);\nconst result = multiplyByTwo(5);\nconsole.log(result);",
    options: [
      "7",
      "10",
      "25",
      "4"
    ],
    correctAnswer: 1,
    explanation: "Первый bind фиксирует operation='multiply', второй bind фиксирует a=2. При вызове с 5 получается calculate('multiply', 2, 5) = 2 * 5 = 10.",
    topic: "Частичное применение"
  }
]
