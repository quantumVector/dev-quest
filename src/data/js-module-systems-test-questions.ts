import type { Question } from '@/types/question.ts'

export const jsModuleSystemsQuestions: Question[] = [
  // Тема 1: Какие системы модулей в JS известны?
  {
    id: 1,
    question: "Какие основные системы модулей существуют в JavaScript?",
    options: [
      "Только ES Modules (ESM)",
      "CommonJS, AMD, UMD, ES Modules",
      "Только CommonJS и ES Modules",
      "RequireJS и SystemJS"
    ],
    correctAnswer: 1,
    explanation: "В JavaScript существуют несколько систем модулей: CommonJS (Node.js), AMD (Asynchronous Module Definition), UMD (Universal Module Definition), и ES Modules (стандарт ECMAScript).",
    topic: "Системы модулей"
  },
  {
    id: 2,
    question: "Какая система модулей используется по умолчанию в Node.js?",
    options: [
      "ES Modules",
      "AMD",
      "CommonJS",
      "UMD"
    ],
    correctAnswer: 2,
    explanation: "Node.js по умолчанию использует систему модулей CommonJS. ES Modules поддерживаются, но требуют дополнительной настройки.",
    topic: "Системы модулей"
  },
  {
    id: 3,
    question: "Что означает аббревиатура AMD в контексте модульных систем?",
    options: [
      "Advanced Module Definition",
      "Asynchronous Module Definition",
      "Automatic Module Detection",
      "Application Module Design"
    ],
    correctAnswer: 1,
    explanation: "AMD расшифровывается как Asynchronous Module Definition — система модулей, разработанная для асинхронной загрузки модулей в браузере.",
    topic: "Системы модулей"
  },
  {
    id: 4,
    question: "Какая библиотека является наиболее известной реализацией AMD?",
    options: [
      "Browserify",
      "Webpack",
      "RequireJS",
      "SystemJS"
    ],
    correctAnswer: 2,
    explanation: "RequireJS — это наиболее известная и популярная библиотека, реализующая спецификацию AMD для асинхронной загрузки модулей в браузере.",
    topic: "Системы модулей"
  },
  {
    id: 5,
    question: "Что такое UMD (Universal Module Definition)?",
    options: [
      "Новая система модулей, заменяющая CommonJS",
      "Паттерн, позволяющий модулю работать в разных средах (CommonJS, AMD, глобальные переменные)",
      "Система модулей только для браузера",
      "Компилятор модулей"
    ],
    correctAnswer: 1,
    explanation: "UMD — это паттерн, который позволяет модулю работать в различных средах: как CommonJS модуль в Node.js, как AMD модуль в браузере с RequireJS, или как глобальная переменная.",
    topic: "Системы модулей"
  },
  {
    id: 6,
    question: "Когда ES Modules были официально добавлены в стандарт JavaScript?",
    options: [
      "ES5 (2009)",
      "ES6/ES2015 (2015)",
      "ES2017 (2017)",
      "ES2020 (2020)"
    ],
    correctAnswer: 1,
    explanation: "ES Modules были официально добавлены в стандарт JavaScript в ES6 (ES2015), предоставив нативную систему модулей для языка.",
    topic: "Системы модулей"
  },
  {
    id: 7,
    question: "Какая система модулей является стандартом ECMAScript?",
    options: [
      "CommonJS",
      "AMD",
      "ES Modules",
      "UMD"
    ],
    correctAnswer: 2,
    explanation: "ES Modules (ESM) — это официальный стандарт модульной системы в ECMAScript, введенный в ES2015.",
    topic: "Системы модулей"
  },
  {
    id: 8,
    question: "Какой инструмент НЕ является загрузчиком модулей?",
    options: [
      "RequireJS",
      "SystemJS",
      "Babel",
      "Webpack"
    ],
    correctAnswer: 2,
    explanation: "Babel — это транспайлер JavaScript, а не загрузчик модулей. RequireJS, SystemJS и Webpack могут загружать и обрабатывать модули.",
    topic: "Системы модулей"
  },

  // Тема 2: В чём между ними разница?
  {
    id: 9,
    question: "В чем основное различие между CommonJS и ES Modules в плане загрузки?",
    options: [
      "CommonJS загружает модули асинхронно, ES Modules — синхронно",
      "CommonJS загружает модули синхронно, ES Modules — асинхронно",
      "Оба загружают модули одинаково",
      "ES Modules не поддерживают загрузку модулей"
    ],
    correctAnswer: 1,
    explanation: "CommonJS загружает модули синхронно (блокирующе), что подходит для серверной среды. ES Modules загружаются асинхронно, что лучше для браузера.",
    topic: "Различия систем модулей"
  },
  {
    id: 10,
    question: "Какой синтаксис используется для импорта в CommonJS?",
    options: [
      "import module from 'module'",
      "const module = require('module')",
      "define(['module'], function(module) {})",
      "System.import('module')"
    ],
    correctAnswer: 1,
    explanation: "В CommonJS используется функция require() для импорта модулей: const module = require('module').",
    topic: "Различия систем модулей"
  },
  {
    id: 11,
    question: "Как экспортируется модуль в CommonJS?",
    options: [
      "export default value",
      "module.exports = value или exports.prop = value",
      "return value",
      "define(value)"
    ],
    correctAnswer: 1,
    explanation: "В CommonJS экспорт осуществляется через module.exports = value для экспорта по умолчанию или exports.prop = value для именованного экспорта.",
    topic: "Различия систем модулей"
  },
  {
    id: 12,
    question: "Какой синтаксис используется для импорта в ES Modules?",
    options: [
      "const module = require('module')",
      "import module from 'module' или import { named } from 'module'",
      "define(['module'], function(module) {})",
      "module = load('module')"
    ],
    correctAnswer: 1,
    explanation: "ES Modules используют ключевое слово import: import module from 'module' для импорта по умолчанию или import { named } from 'module' для именованного импорта.",
    topic: "Различия систем модулей"
  },
  {
    id: 13,
    question: "В чем преимущество статического анализа ES Modules?",
    options: [
      "Быстрее выполняется код",
      "Возможность tree-shaking и оптимизации во время сборки",
      "Меньше размер файлов",
      "Лучшая совместимость с браузерами"
    ],
    correctAnswer: 1,
    explanation: "Статическая структура ES Modules позволяет инструментам сборки проводить tree-shaking (удаление неиспользуемого кода) и другие оптимизации на этапе сборки.",
    topic: "Различия систем модулей"
  },
  {
    id: 14,
    question: "Что выведет этот код CommonJS?\n\nconsole.log('A start');\nexports.done = false;\nconst B = require('./b');\nconsole.log('in A, B.done =', B.done);\nexports.done = true;\nconsole.log('A done');\n\n// b.js:\nconsole.log('B start');\nexports.done = false;\nconst A = require('./a');\nconsole.log('in B, A.done =', A.done);\nexports.done = true;\nconsole.log('B done');",
    options: [
      "Будет ошибка циклической зависимости",
      "A start, B start, in B, A.done = false, B done, in A, B.done = true, A done",
      "A start, B start, B done, A done",
      "Код не выполнится"
    ],
    correctAnswer: 1,
    explanation: "CommonJS поддерживает циклические зависимости, возвращая частично инициализированный модуль. Модуль A будет иметь done = false в момент обращения из B.",
    topic: "Различия систем модулей"
  },
  {
    id: 15,
    question: "Могут ли ES Modules импортироваться условно?",
    options: [
      "Да, всегда",
      "Нет, импорты должны быть на верхнем уровне",
      "Да, но только с использованием dynamic import()",
      "Только в Node.js"
    ],
    correctAnswer: 2,
    explanation: "Статические импорты ES Modules должны быть на верхнем уровне. Условный импорт возможен только с динамическим import(), который возвращает Promise.",
    topic: "Различия систем модулей"
  },
  {
    id: 16,
    question: "В чем разница между live binding в ES Modules и копированием в CommonJS?",
    options: [
      "Никакой разницы нет",
      "ES Modules создают живую связь с экспортируемым значением, CommonJS копирует значение",
      "CommonJS создает живую связь, ES Modules копируют",
      "Оба создают копии"
    ],
    correctAnswer: 1,
    explanation: "ES Modules создают живую связь (live binding) с экспортируемыми значениями — изменения в экспортирующем модуле видны в импортирующем. CommonJS копирует значения при импорте.",
    topic: "Различия систем модулей"
  },
  {
    id: 17,
    question: "Как определить AMD модуль?",
    options: [
      "module.exports = ...",
      "export default ...",
      "define(['dep1', 'dep2'], function(dep1, dep2) { return module; })",
      "require(['dep1'], function(dep1) {})"
    ],
    correctAnswer: 2,
    explanation: "AMD модули определяются с помощью функции define(), которая принимает массив зависимостей и фабричную функцию, возвращающую модуль.",
    topic: "Различия систем модулей"
  },
  {
    id: 18,
    question: "Какая система модулей поддерживает top-level await?",
    options: [
      "CommonJS",
      "AMD",
      "ES Modules",
      "UMD"
    ],
    correctAnswer: 2,
    explanation: "Top-level await поддерживается только в ES Modules, позволяя использовать await на верхнем уровне модуля без необходимости оборачивать код в async функцию.",
    topic: "Различия систем модулей"
  },
  {
    id: 19,
    question: "Что произойдет при попытке изменить импортированное значение в ES Modules?",
    options: [
      "Значение изменится успешно",
      "Будет выброшена ошибка TypeError",
      "Изменение будет проигнорировано",
      "Изменится только локальная копия"
    ],
    correctAnswer: 1,
    explanation: "В ES Modules импортированные значения доступны только для чтения. Попытка изменить их приведет к TypeError в строгом режиме.",
    topic: "Различия систем модулей"
  },
  {
    id: 20,
    question: "Как включить поддержку ES Modules в Node.js?",
    options: [
      "Использовать флаг --experimental-modules",
      "Добавить \"type\": \"module\" в package.json или использовать расширение .mjs",
      "Установить дополнительный пакет",
      "ES Modules не поддерживаются в Node.js"
    ],
    correctAnswer: 1,
    explanation: "В современных версиях Node.js ES Modules можно включить, добавив \"type\": \"module\" в package.json или используя расширение .mjs для файлов.",
    topic: "Различия систем модулей"
  },
  {
    id: 21,
    question: "Какая система модулей лучше подходит для браузера без инструментов сборки?",
    options: [
      "CommonJS",
      "ES Modules (с поддержкой современных браузеров)",
      "AMD с RequireJS",
      "UMD"
    ],
    correctAnswer: 2,
    explanation: "Для браузера без инструментов сборки лучше подходит AMD с RequireJS, так как он специально разработан для асинхронной загрузки модулей в браузере. ES Modules также поддерживаются современными браузерами.",
    topic: "Различия систем модулей"
  },
  {
    id: 22,
    question: "Что такое hoisting в контексте ES Modules?",
    options: [
      "ES Modules не поддерживают hoisting",
      "Импорты поднимаются наверх и выполняются до любого другого кода в модуле",
      "Только экспорты поднимаются наверх",
      "Hoisting работает только с function declarations"
    ],
    correctAnswer: 1,
    explanation: "В ES Modules импорты обрабатываются во время фазы связывания и поднимаются наверх, что означает, что они доступны в любом месте модуля, даже до их объявления.",
    topic: "Различия систем модулей"
  },
  {
    id: 23,
    question: "Можно ли смешивать CommonJS и ES Modules в одном проекте?",
    options: [
      "Нет, это невозможно",
      "Да, но с определенными ограничениями и инструментами",
      "Да, без каких-либо ограничений",
      "Только в браузере"
    ],
    correctAnswer: 1,
    explanation: "Смешивание CommonJS и ES Modules возможно с помощью инструментов сборки (Webpack, Rollup) или специальных настроек Node.js, но требует осторожности из-за различий в их работе.",
    topic: "Различия систем модулей"
  },
  {
    id: 24,
    question: "Какое ключевое слово используется для динамического импорта?",
    options: [
      "require()",
      "import()",
      "load()",
      "fetch()"
    ],
    correctAnswer: 1,
    explanation: "Динамический импорт в ES Modules выполняется с помощью import(), который возвращает Promise и может использоваться в любом месте кода, включая условные блоки.",
    topic: "Различия систем модулей"
  }
]
