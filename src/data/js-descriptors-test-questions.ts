import type { Question } from '@/types/question.ts'

export const jsDescriptorsQuestions: Question[] = [
  // Тема 1: Какие есть флаги у свойств объектов
  {
    id: 1,
    question: "Какие флаги (дескрипторы) есть у свойств объектов в JavaScript?",
    options: [
      "writable, enumerable, configurable",
      "readable, writable, deletable",
      "visible, editable, removable",
      "accessible, modifiable, enumerable"
    ],
    correctAnswer: 0,
    explanation: "У свойств объектов в JavaScript есть три основных флага: writable (можно ли изменять значение), enumerable (перечисляется ли в циклах), configurable (можно ли удалять и изменять дескрипторы).",
    topic: "Флаги свойств объектов"
  },
  {
    id: 2,
    question: "Какие значения по умолчанию имеют флаги свойств при обычном присвоении obj.prop = value?",
    options: [
      "writable: false, enumerable: false, configurable: false",
      "writable: true, enumerable: true, configurable: true",
      "writable: true, enumerable: false, configurable: true",
      "writable: false, enumerable: true, configurable: true"
    ],
    correctAnswer: 1,
    explanation: "При обычном присвоении свойства все флаги устанавливаются в true: свойство можно изменять, оно перечисляется в циклах и его можно удалить.",
    topic: "Флаги свойств объектов"
  },
  {
    id: 3,
    question: "Что произойдет, если попытаться изменить свойство с флагом writable: false?",
    options: [
      "Свойство изменится как обычно",
      "В нестрогом режиме операция будет проигнорирована, в строгом — выбросится ошибка",
      "Всегда выбрасывается ошибка",
      "Свойство удалится"
    ],
    correctAnswer: 1,
    explanation: "Если writable: false, то в нестрогом режиме попытка изменения будет проигнорирована без ошибки, а в строгом режиме (use strict) выбросится TypeError.",
    topic: "Флаги свойств объектов"
  },
  {
    id: 4,
    question: "За что отвечает флаг enumerable?",
    options: [
      "За возможность удаления свойства",
      "За возможность изменения значения свойства",
      "За то, будет ли свойство перечисляться в циклах for...in и Object.keys()",
      "За тип данных свойства"
    ],
    correctAnswer: 2,
    explanation: "Флаг enumerable определяет, будет ли свойство перечисляться в циклах for...in, Object.keys(), Object.entries() и других методах перечисления свойств.",
    topic: "Флаги свойств объектов"
  },
  {
    id: 5,
    question: "Что означает флаг configurable: false?",
    options: [
      "Свойство нельзя изменить",
      "Свойство нельзя удалить и нельзя изменить его дескрипторы",
      "Свойство не видно в циклах",
      "Свойство становится приватным"
    ],
    correctAnswer: 1,
    explanation: "Когда configurable: false, свойство нельзя удалить с помощью delete, и нельзя изменить его дескрипторы (кроме изменения value, если writable: true).",
    topic: "Флаги свойств объектов"
  },
  {
    id: 6,
    question: "Что выведет этот код?\n\nconst obj = {};\nObject.defineProperty(obj, 'prop', {\n  value: 42,\n  writable: false,\n  enumerable: false\n});\n\nfor (let key in obj) {\n  console.log(key);\n}\nconsole.log(Object.keys(obj));",
    options: [
      "prop и ['prop']",
      "Ничего не выведет и []",
      "Ошибка",
      "undefined и []"
    ],
    correctAnswer: 1,
    explanation: "Поскольку enumerable: false, свойство 'prop' не будет перечисляться в цикле for...in и не попадет в Object.keys(). Цикл ничего не выведет, а Object.keys() вернет пустой массив.",
    topic: "Флаги свойств объектов"
  },

  // Тема 2: Значение и поведение флагов
  {
    id: 7,
    question: "Что произойдет при попытке удалить свойство с configurable: false?",
    options: [
      "Свойство удалится как обычно",
      "В нестрогом режиме операция будет проигнорирована, в строгом — выбросится ошибка",
      "Свойство скроется, но останется в объекте",
      "Значение свойства станет undefined"
    ],
    correctAnswer: 1,
    explanation: "При configurable: false попытка удаления через delete в нестрогом режиме вернет false и ничего не произойдет, а в строгом режиме выбросится TypeError.",
    topic: "Поведение флагов"
  },
  {
    id: 8,
    question: "Можно ли изменить флаг writable с true на false, если configurable: false?",
    options: [
      "Да, всегда можно",
      "Нет, никогда нельзя",
      "Можно изменить только с true на false, но не наоборот",
      "Можно только в строгом режиме"
    ],
    correctAnswer: 2,
    explanation: "При configurable: false есть одно исключение: можно изменить writable с true на false, но не наоборот. Это единственное изменение дескриптора, которое разрешено.",
    topic: "Поведение флагов"
  },
  {
    id: 9,
    question: "Что выведет этот код?\n\nconst obj = { a: 1, b: 2 };\nObject.defineProperty(obj, 'c', {\n  value: 3,\n  enumerable: false\n});\n\nconsole.log(obj.c);\nconsole.log(Object.keys(obj));",
    options: [
      "3 и ['a', 'b', 'c']",
      "3 и ['a', 'b']",
      "undefined и ['a', 'b']",
      "3 и []"
    ],
    correctAnswer: 1,
    explanation: "Свойство 'c' доступно для чтения (obj.c === 3), но поскольку enumerable: false, оно не попадает в Object.keys(), который вернет только ['a', 'b'].",
    topic: "Поведение флагов"
  },
  {
    id: 10,
    question: "Какие флаги устанавливаются по умолчанию при использовании Object.defineProperty без их указания?",
    options: [
      "writable: true, enumerable: true, configurable: true",
      "writable: false, enumerable: false, configurable: false",
      "writable: true, enumerable: false, configurable: false",
      "writable: false, enumerable: true, configurable: true"
    ],
    correctAnswer: 1,
    explanation: "При использовании Object.defineProperty все флаги по умолчанию устанавливаются в false, в отличие от обычного присвоения, где они все true.",
    topic: "Поведение флагов"
  },
  {
    id: 11,
    question: "Что произойдет с этим кодом?\n\nconst obj = {};\nObject.defineProperty(obj, 'prop', {\n  value: 'test',\n  configurable: false\n});\n\nObject.defineProperty(obj, 'prop', {\n  enumerable: true\n});",
    options: [
      "Флаг enumerable изменится на true",
      "Выбросится TypeError",
      "Операция будет проигнорирована",
      "Свойство удалится"
    ],
    correctAnswer: 1,
    explanation: "Поскольку configurable: false, попытка изменить любой дескриптор (кроме value при writable: true и writable с true на false) приведет к TypeError.",
    topic: "Поведение флагов"
  },
  {
    id: 12,
    question: "Как проверить, перечисляется ли свойство в циклах?",
    options: [
      "obj.hasOwnProperty(prop)",
      "obj.propertyIsEnumerable(prop)",
      "prop in obj",
      "Object.hasProperty(obj, prop)"
    ],
    correctAnswer: 1,
    explanation: "Метод propertyIsEnumerable() возвращает true, если свойство существует у объекта и его флаг enumerable установлен в true.",
    topic: "Поведение флагов"
  },

  // Тема 3: Получение дескриптора Object.getOwnPropertyDescriptor
  {
    id: 13,
    question: "Какой метод используется для получения дескриптора свойства?",
    options: [
      "Object.getDescriptor(obj, prop)",
      "Object.getPropertyDescriptor(obj, prop)",
      "Object.getOwnPropertyDescriptor(obj, prop)",
      "obj.getDescriptor(prop)"
    ],
    correctAnswer: 2,
    explanation: "Object.getOwnPropertyDescriptor(obj, prop) возвращает дескриптор собственного свойства объекта (не наследованного по цепочке прототипов).",
    topic: "Получение дескриптора"
  },
  {
    id: 14,
    question: "Что вернет Object.getOwnPropertyDescriptor для несуществующего свойства?",
    options: [
      "null",
      "undefined",
      "{}",
      "Выбросит ошибку"
    ],
    correctAnswer: 1,
    explanation: "Object.getOwnPropertyDescriptor возвращает undefined, если свойство не существует у объекта или наследуется по цепочке прототипов.",
    topic: "Получение дескриптора"
  },
  {
    id: 15,
    question: "Что выведет этот код?\n\nconst obj = { name: 'John' };\nconst descriptor = Object.getOwnPropertyDescriptor(obj, 'name');\nconsole.log(descriptor);",
    options: [
      "{ value: 'John' }",
      "{ value: 'John', writable: true, enumerable: true, configurable: true }",
      "{ writable: true, enumerable: true, configurable: true }",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "Для обычного свойства Object.getOwnPropertyDescriptor возвращает полный дескриптор со значением и всеми флагами, установленными в true.",
    topic: "Получение дескриптора"
  },
  {
    id: 16,
    question: "Как получить дескриптор наследованного свойства?",
    options: [
      "Object.getOwnPropertyDescriptor работает и с наследованными свойствами",
      "Нужно искать свойство по цепочке прототипов самостоятельно",
      "Object.getPropertyDescriptor(obj, prop)",
      "Object.getInheritedDescriptor(obj, prop)"
    ],
    correctAnswer: 1,
    explanation: "Object.getOwnPropertyDescriptor работает только с собственными свойствами. Для наследованных нужно подниматься по цепочке прототипов с помощью Object.getPrototypeOf и проверять каждый уровень.",
    topic: "Получение дескриптора"
  },
  {
    id: 17,
    question: "Что вернет Object.getOwnPropertyDescriptor для свойства, созданного через Object.defineProperty без указания флагов?",
    options: [
      "{ value: ..., writable: true, enumerable: true, configurable: true }",
      "{ value: ..., writable: false, enumerable: false, configurable: false }",
      "{ value: ... }",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "При создании свойства через Object.defineProperty без указания флагов все они устанавливаются в false по умолчанию.",
    topic: "Получение дескриптора"
  },
  {
    id: 18,
    question: "Как получить дескрипторы всех собственных свойств объекта?",
    options: [
      "Object.getOwnPropertyDescriptors(obj)",
      "Object.getAllDescriptors(obj)",
      "Object.getOwnDescriptors(obj)",
      "Object.descriptors(obj)"
    ],
    correctAnswer: 0,
    explanation: "Object.getOwnPropertyDescriptors(obj) возвращает объект, содержащий все дескрипторы собственных свойств объекта.",
    topic: "Получение дескриптора"
  },

  // Тема 4: Изменение флагов Object.defineProperty
  {
    id: 19,
    question: "Какой метод используется для установки или изменения дескриптора свойства?",
    options: [
      "Object.setProperty(obj, prop, descriptor)",
      "Object.defineProperty(obj, prop, descriptor)",
      "Object.setDescriptor(obj, prop, descriptor)",
      "obj.defineProperty(prop, descriptor)"
    ],
    correctAnswer: 1,
    explanation: "Object.defineProperty(obj, propertyName, descriptor) используется для создания нового свойства или изменения существующего с указанными дескрипторами.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 20,
    question: "Что произойдет, если использовать Object.defineProperty с частичным дескриптором для существующего свойства?",
    options: [
      "Неуказанные флаги останутся прежними",
      "Неуказанные флаги станут false",
      "Неуказанные флаги станут true",
      "Выбросится ошибка"
    ],
    correctAnswer: 0,
    explanation: "При изменении существующего свойства через Object.defineProperty неуказанные в дескрипторе флаги остаются без изменений.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 21,
    question: "Что выведет этот код?\n\nconst obj = { x: 1 };\nObject.defineProperty(obj, 'x', {\n  writable: false\n});\nobj.x = 2;\nconsole.log(obj.x);",
    options: [
      "1",
      "2",
      "undefined",
      "Выбросится ошибка"
    ],
    correctAnswer: 0,
    explanation: "После установки writable: false свойство становится только для чтения. В нестрогом режиме присвоение игнорируется, значение остается 1.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 22,
    question: "Как создать несколько свойств с дескрипторами одновременно?",
    options: [
      "Object.defineProperties(obj, descriptors)",
      "Object.defineMultiple(obj, descriptors)",
      "Object.setProperties(obj, descriptors)",
      "Только через несколько вызовов Object.defineProperty"
    ],
    correctAnswer: 0,
    explanation: "Object.defineProperties(obj, descriptors) позволяет создать или изменить несколько свойств с их дескрипторами за один вызов.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 23,
    question: "Что произойдет с этим кодом?\n\nconst obj = {};\nObject.defineProperty(obj, 'prop', {\n  value: 42,\n  enumerable: true\n});\nobj.prop = 100;\nconsole.log(obj.prop);",
    options: [
      "42",
      "100",
      "undefined",
      "Выбросится ошибка"
    ],
    correctAnswer: 0,
    explanation: "Поскольку writable не указан, он устанавливается в false по умолчанию. Попытка изменения значения игнорируется, остается 42.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 24,
    question: "Какой метод позволяет 'заморозить' объект, сделав все его свойства неизменяемыми?",
    options: [
      "Object.freeze(obj)",
      "Object.seal(obj)",
      "Object.preventExtensions(obj)",
      "Object.lock(obj)"
    ],
    correctAnswer: 0,
    explanation: "Object.freeze(obj) делает объект неизменяемым: нельзя добавлять, удалять или изменять свойства. Это эквивалентно установке configurable: false и writable: false для всех свойств.",
    topic: "Изменение дескрипторов"
  },
  {
    id: 25,
    question: "В чем разница между Object.seal() и Object.freeze()?",
    options: [
      "Никакой разницы нет",
      "seal() запрещает добавление/удаление свойств, freeze() еще и запрещает изменение значений",
      "freeze() запрещает только добавление свойств",
      "seal() работает только с массивами"
    ],
    correctAnswer: 1,
    explanation: "Object.seal() устанавливает configurable: false для всех свойств (нельзя добавлять/удалять), но значения можно менять. Object.freeze() дополнительно устанавливает writable: false (нельзя менять значения).",
    topic: "Изменение дескрипторов"
  },
  {
    id: 26,
    question: "Что произойдет при попытке добавить новое свойство к объекту после Object.preventExtensions()?",
    options: [
      "Свойство добавится как обычно",
      "В нестрогом режиме операция будет проигнорирована, в строгом — выбросится ошибка",
      "Свойство добавится, но будет скрытым",
      "Объект станет null"
    ],
    correctAnswer: 1,
    explanation: "Object.preventExtensions() запрещает добавление новых свойств к объекту. В нестрогом режиме попытка добавления игнорируется, в строгом — выбрасывается TypeError.",
    topic: "Изменение дескрипторов"
  }
]
