import type { Question } from '@/types/question.ts'

export const jsPrototypeQuestions: Question[] = [
  // Тема 1: Что такое prototype
  {
    id: 1,
    question: "Что такое prototype в JavaScript?",
    options: [
      "Это свойство объекта, которое содержит ссылку на его конструктор",
      "Это свойство функции-конструктора, которое становится прототипом создаваемых объектов",
      "Это метод для создания копии объекта",
      "Это способ наследования от родительского класса"
    ],
    correctAnswer: 1,
    explanation: "prototype — это свойство функций-конструкторов, которое указывает на объект, становящийся прототипом для всех экземпляров, созданных с помощью этой функции-конструктора.",
    topic: "Основы prototype"
  },
  {
    id: 2,
    question: "Какой объект станет прототипом для экземпляра, созданного с помощью new?",
    options: [
      "Object.prototype",
      "Function.prototype",
      "Значение свойства prototype функции-конструктора",
      "Глобальный объект"
    ],
    correctAnswer: 2,
    explanation: "При создании объекта с помощью оператора new, его прототипом становится объект, на который ссылается свойство prototype функции-конструктора.",
    topic: "Основы prototype"
  },
  {
    id: 3,
    question: "Что произойдет в этом коде?\n\nfunction Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function() {\n  return 'Hello, ' + this.name;\n};\n\nconst john = new Person('John');\nconsole.log(john.greet());",
    options: [
      "Ошибка, метод greet не найден",
      "'Hello, John'",
      "'Hello, undefined'",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "Метод greet добавлен в прототип Person, поэтому все экземпляры Person имеют к нему доступ через цепочку прототипов. john.greet() вернет 'Hello, John'.",
    topic: "Основы prototype"
  },
  {
    id: 4,
    question: "Все ли функции в JavaScript имеют свойство prototype?",
    options: [
      "Да, все функции имеют prototype",
      "Нет, только функции-конструкторы",
      "Да, но стрелочные функции не имеют prototype",
      "Нет, только встроенные функции"
    ],
    correctAnswer: 2,
    explanation: "Обычные функции и функции-конструкторы имеют свойство prototype, но стрелочные функции не имеют prototype и не могут использоваться как конструкторы.",
    topic: "Основы prototype"
  },
  {
    id: 5,
    question: "Что содержит свойство constructor в prototype?",
    options: [
      "Ссылку на родительский прототип",
      "Ссылку на функцию-конструктор",
      "Список всех методов объекта",
      "Ссылку на Object.prototype"
    ],
    correctAnswer: 1,
    explanation: "Свойство constructor в объекте prototype содержит ссылку на саму функцию-конструктор, что позволяет определить, какой конструктор создал объект.",
    topic: "Основы prototype"
  },
  {
    id: 6,
    question: "Что выведет этот код?\n\nfunction Car() {}\nCar.prototype.brand = 'Unknown';\n\nconst car1 = new Car();\nconst car2 = new Car();\n\ncar1.brand = 'Toyota';\nconsole.log(car1.brand, car2.brand);",
    options: [
      "'Toyota', 'Toyota'",
      "'Unknown', 'Unknown'",
      "'Toyota', 'Unknown'",
      "Ошибка"
    ],
    correctAnswer: 2,
    explanation: "car1.brand = 'Toyota' создает собственное свойство объекта car1, которое затеняет свойство прототипа. car2 по-прежнему обращается к свойству прототипа.",
    topic: "Основы prototype"
  },
  {
    id: 7,
    question: "Как проверить, является ли свойство собственным свойством объекта, а не унаследованным?",
    options: [
      "obj.property !== undefined",
      "obj.hasOwnProperty('property')",
      "'property' in obj",
      "typeof obj.property"
    ],
    correctAnswer: 1,
    explanation: "Метод hasOwnProperty() возвращает true только для собственных свойств объекта, исключая унаследованные от прототипа.",
    topic: "Основы prototype"
  },
  {
    id: 8,
    question: "Можно ли изменить prototype функции-конструктора после создания экземпляров?",
    options: [
      "Нет, prototype неизменяем после создания экземпляров",
      "Да, и изменения повлияют на все существующие экземпляры",
      "Да, но изменения повлияют только на новые экземпляры",
      "Да, но нужно пересоздать все экземпляры"
    ],
    correctAnswer: 1,
    explanation: "Изменения в prototype отражаются на всех существующих экземплярах, поскольку они ссылаются на один и тот же объект прототипа.",
    topic: "Основы prototype"
  },

  // Тема 2: Разница между __proto__ и prototype
  {
    id: 9,
    question: "В чем основная разница между __proto__ и prototype?",
    options: [
      "__proto__ есть у функций, prototype — у объектов",
      "__proto__ есть у всех объектов и ссылается на прототип, prototype есть у функций",
      "Это одно и то же, разные названия",
      "prototype устарел, нужно использовать __proto__"
    ],
    correctAnswer: 1,
    explanation: "__proto__ — это свойство всех объектов, которое ссылается на их прототип. prototype — это свойство функций-конструкторов, которое станет прототипом для создаваемых объектов.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 10,
    question: "Что выведет этот код?\n\nfunction Animal() {}\nconst dog = new Animal();\n\nconsole.log(dog.__proto__ === Animal.prototype);",
    options: [
      "false",
      "true",
      "undefined",
      "Ошибка"
    ],
    correctAnswer: 1,
    explanation: "При создании объекта с new, его __proto__ устанавливается равным значению prototype функции-конструктора.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 11,
    question: "Какой современный способ рекомендуется вместо использования __proto__?",
    options: [
      "Использовать prototype",
      "Object.getPrototypeOf() и Object.setPrototypeOf()",
      "Использовать constructor",
      "Использовать instanceof"
    ],
    correctAnswer: 1,
    explanation: "__proto__ считается устаревшим. Рекомендуется использовать Object.getPrototypeOf() для получения прототипа и Object.setPrototypeOf() для его установки.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 12,
    question: "Что произойдет в этом коде?\n\nconst obj = {};\nconsole.log(obj.prototype);",
    options: [
      "Выведет Object.prototype",
      "Выведет undefined",
      "Выведет {}",
      "Ошибка"
    ],
    correctAnswer: 1,
    explanation: "Обычные объекты не имеют свойства prototype. Это свойство есть только у функций-конструкторов.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 13,
    question: "Что выведет этот код?\n\nfunction Func() {}\nconsole.log(Func.__proto__ === Function.prototype);",
    options: [
      "false",
      "true",
      "undefined",
      "Ошибка"
    ],
    correctAnswer: 1,
    explanation: "Функции в JavaScript тоже являются объектами, поэтому у них есть __proto__, который ссылается на Function.prototype.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 14,
    question: "Можно ли изменить __proto__ объекта?",
    options: [
      "Нет, __proto__ неизменяем",
      "Да, но это не рекомендуется из-за производительности",
      "Да, это безопасная операция",
      "Да, но только для функций"
    ],
    correctAnswer: 1,
    explanation: "Технически можно изменить __proto__, но это крайне не рекомендуется, так как может серьезно повлиять на производительность и нарушить оптимизации движка.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 15,
    question: "Что показывает цепочка прототипов для обычного объекта {}?",
    options: [
      "{} -> null",
      "{} -> Object.prototype -> null",
      "{} -> Function.prototype -> Object.prototype -> null",
      "{} -> Object.prototype -> Function.prototype -> null"
    ],
    correctAnswer: 1,
    explanation: "Обычный объект {} имеет прототип Object.prototype, который в свою очередь имеет прототип null.",
    topic: "Разница __proto__ и prototype"
  },
  {
    id: 16,
    question: "Что выведет этот код?\n\nfunction Parent() {}\nfunction Child() {}\n\nChild.prototype = new Parent();\nconst child = new Child();\n\nconsole.log(child.__proto__ === Child.prototype);",
    options: [
      "false",
      "true",
      "undefined",
      "Ошибка"
    ],
    correctAnswer: 1,
    explanation: "Несмотря на то, что Child.prototype был переопределен, правило остается: __proto__ экземпляра всегда равен prototype конструктора.",
    topic: "Разница __proto__ и prototype"
  },

  // Тема 3: Проблемы использования прототипов у глобальных объектов
  {
    id: 17,
    question: "Почему не рекомендуется изменять прототипы встроенных объектов (Array, Object, String)?",
    options: [
      "Это технически невозможно",
      "Может нарушить работу других скриптов и библиотек",
      "Это замедляет работу приложения",
      "Браузеры не поддерживают такие изменения"
    ],
    correctAnswer: 1,
    explanation: "Изменение прототипов встроенных объектов может конфликтовать с кодом других библиотек и скриптов, а также нарушать ожидаемое поведение стандартных методов.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 18,
    question: "Что может произойти при добавлении метода в Array.prototype?",
    options: [
      "Ничего, это безопасная операция",
      "Метод появится во всех массивах и может нарушить циклы for...in",
      "Метод будет доступен только в текущем файле",
      "Браузер заблокирует выполнение кода"
    ],
    correctAnswer: 1,
    explanation: "Добавление метода в Array.prototype сделает его доступным во всех массивах, что может нарушить работу циклов for...in и конфликтовать с другим кодом.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 19,
    question: "Что выведет этот код?\n\nArray.prototype.myMethod = function() { return 'custom'; };\nconst arr = [1, 2, 3];\n\nfor (let key in arr) {\n  console.log(key);\n}",
    options: [
      "0, 1, 2",
      "0, 1, 2, myMethod",
      "1, 2, 3",
      "1, 2, 3, myMethod"
    ],
    correctAnswer: 1,
    explanation: "Цикл for...in перебирает все перечисляемые свойства, включая унаследованные от прототипа. Метод myMethod будет включен в итерацию.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 20,
    question: "Как безопасно добавить метод, если нужно расширить функциональность встроенного объекта?",
    options: [
      "Всегда изменять прототип напрямую",
      "Проверить существование метода и добавить только если его нет",
      "Создать собственный класс-наследник",
      "Использовать только глобальные функции"
    ],
    correctAnswer: 2,
    explanation: "Лучший подход — создать собственный класс, наследующий от встроенного, или использовать композицию вместо изменения глобальных прототипов.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 21,
    question: "Что такое 'monkey patching' в контексте прототипов?",
    options: [
      "Создание новых объектов",
      "Изменение существующих объектов или их прототипов во время выполнения",
      "Отладка прототипной цепочки",
      "Создание множественного наследования"
    ],
    correctAnswer: 1,
    explanation: "Monkey patching — это практика изменения существующих объектов или классов во время выполнения, часто для добавления новой функциональности.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 22,
    question: "Какой подход лучше использовать вместо изменения String.prototype?",
    options: [
      "Изменять Object.prototype",
      "Создать утилитарную функцию или класс-обертку",
      "Использовать глобальные переменные",
      "Изменять Function.prototype"
    ],
    correctAnswer: 1,
    explanation: "Вместо изменения встроенных прототипов лучше создавать утилитарные функции, классы-обертки или использовать библиотеки типа lodash.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 23,
    question: "Что произойдет, если две библиотеки добавят метод с одинаковым именем в Object.prototype?",
    options: [
      "Методы объединятся",
      "Последний загруженный метод перезапишет предыдущий",
      "Будет ошибка конфликта",
      "Браузер выберет лучший метод"
    ],
    correctAnswer: 1,
    explanation: "Если две библиотеки добавляют методы с одинаковыми именами, последний метод перезапишет предыдущий, что может привести к неожиданному поведению.",
    topic: "Проблемы глобальных прототипов"
  },
  {
    id: 24,
    question: "Как избежать проблем с for...in при расширении прототипов?",
    options: [
      "Использовать только for...of",
      "Добавлять методы как неперечисляемые с помощью Object.defineProperty",
      "Никак, это неизбежная проблема",
      "Использовать только стрелочные функции"
    ],
    correctAnswer: 1,
    explanation: "Можно использовать Object.defineProperty() с enumerable: false, чтобы добавленные методы не появлялись в циклах for...in.",
    topic: "Проблемы глобальных прототипов"
  }
]
