<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const iifeClosure = `
// IIFE (Immediately Invoked Function Expression) - модуль через замыкания (до ES6)

// Простой IIFE модуль
var MyModule = (function() {
  // Приватные переменные и функции
  var privateVar = 'Я скрыт!';
  var privateCounter = 0;

  function privateFunction() {
    console.log('Приватная функция');
  }

  // Публичный API
  return {
    publicVar: 'Я доступен!',

    increment: function() {
      privateCounter++;
      return privateCounter;
    },

    getCounter: function() {
      return privateCounter;
    },

    publicMethod: function() {
      privateFunction();
      return 'Результат: ' + privateVar;
    }
  };
})();

// Использование
console.log(MyModule.publicVar);        // "Я доступен!"
console.log(MyModule.increment());       // 1
console.log(MyModule.getCounter());      // 1
console.log(MyModule.privateVar);        // undefined - недоступна!

// Расширяемый IIFE модуль
var ExtendedModule = (function(module) {
  module.newMethod = function() {
    return 'Новый функционал!';
  };

  return module;
})(MyModule || {});

// Module Pattern с зависимостями
var DependentModule = (function($, _) {
  // Используем jQuery и Lodash
  function init() {
    $('.element').hide();
    console.log(_.shuffle([1, 2, 3]));
  }

  return {
    init: init
  };
})(jQuery, _);
`

const commonjsExample = `
// =======================================
// COMMONJS - Node.js модули
// =======================================

// math.js - экспорт функций
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const PI = 3.14159;

// Экспорт через module.exports
module.exports = {
  add,
  subtract,
  PI
};

// Альтернативный способ экспорта
exports.multiply = function(a, b) {
  return a * b;
};

exports.divide = function(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// calculator.js - импорт модулей
const math = require('./math');           // Импорт всего модуля
const { add, PI } = require('./math');    // Деструктуризация
const fs = require('fs');                 // Встроенный модуль Node.js
const _ = require('lodash');              // npm модуль

console.log(math.add(5, 3));             // 8
console.log(add(10, 2));                 // 12
console.log(PI);                         // 3.14159

// Условный импорт
if (process.env.NODE_ENV === 'development') {
  const devTools = require('./dev-tools');
  devTools.enableLogging();
}

// Кэширование модулей - модуль загружается один раз
console.log(require('./math') === require('./math')); // true

// Циклические зависимости
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');
`

const amdExample = `
// =======================================
// AMD (Asynchronous Module Definition)
// =======================================

// Определение модуля без зависимостей
define('myModule', function() {
  var privateVar = 'secret';

  return {
    publicMethod: function() {
      return 'Hello from AMD module!';
    },

    getPrivate: function() {
      return privateVar;
    }
  };
});

// Модуль с зависимостями
define('calculator', ['jquery', 'lodash'], function($, _) {
  function calculate(numbers) {
    const sum = _.sum(numbers);
    $('#result').text('Sum: ' + sum);
    return sum;
  }

  return {
    calculate: calculate,
    version: '1.0.0'
  };
});

// Анонимный модуль (обычно в отдельном файле)
define(['jquery', 'underscore'], function($, _) {
  // Логика модуля
  return {
    render: function(data) {
      const template = _.template($('#template').html());
      return template(data);
    }
  };
});

// RequireJS конфигурация
require.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app',
    jquery: 'jquery-3.6.0.min',
    underscore: 'underscore-min'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

// Использование AMD модулей
require(['app/calculator', 'jquery'], function(calc, $) {
  $(document).ready(function() {
    const result = calc.calculate([1, 2, 3, 4, 5]);
    console.log('Calculation result:', result);
  });
});

// Условная загрузка модулей
if (isMobile) {
  require(['app/mobile-ui'], function(mobileUI) {
    mobileUI.init();
  });
} else {
  require(['app/desktop-ui'], function(desktopUI) {
    desktopUI.init();
  });
}
`

const umdExample = `
// =======================================
// UMD (Universal Module Definition)
// =======================================

// Полный UMD шаблон
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    // Браузер (глобальные переменные)
    root.MyLibrary = factory(root.jQuery, root._);
  }
}(typeof self !== 'undefined' ? self : this, function ($, _) {

  // Код библиотеки
  function MyLibrary(options) {
    this.options = _.defaults(options || {}, {
      selector: '.my-element',
      animation: true
    });
    this.init();
  }

  MyLibrary.prototype = {
    init: function() {
      this.$elements = $(this.options.selector);
      this.bindEvents();
    },

    bindEvents: function() {
      this.$elements.on('click', this.onClick.bind(this));
    },

    onClick: function(event) {
      if (this.options.animation) {
        $(event.target).fadeToggle();
      }
    },

    destroy: function() {
      this.$elements.off('click', this.onClick);
    }
  };

  // Статические методы
  MyLibrary.version = '1.0.0';

  MyLibrary.noConflict = (function(originalValue) {
    return function() {
      root.MyLibrary = originalValue;
      return MyLibrary;
    };
  })(root.MyLibrary);

  return MyLibrary;
}));

// Упрощенный UMD для простых случаев
(function(root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Браузер
    root.utils = factory();
  }
}(this, function() {

  return {
    formatDate: function(date) {
      return date.toLocaleDateString();
    },

    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };
}));
`

const es6ModulesExample = `
// =======================================
// ES6 MODULES (ESM) - современный стандарт
// =======================================

// math.js - различные способы экспорта
export const PI = 3.14159;
export let counter = 0;

// Именованный экспорт функций
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Экспорт класса
export class Calculator {
  constructor() {
    this.history = [];
  }

  calculate(operation, a, b) {
    let result;
    switch (operation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      default:
        throw new Error('Unknown operation');
    }

    this.history.push({ operation, a, b, result });
    return result;
  }
}

// Экспорт по умолчанию (default export)
export default function multiply(a, b) {
  return a * b;
}

// Альтернативный синтаксис экспорта в конце файла
const power = (base, exponent) => Math.pow(base, exponent);
const sqrt = (num) => Math.sqrt(num);

export { power, sqrt };

// Переименование при экспорте
const secretFunction = () => 'secret';
export { secretFunction as getSecret };

// =======================================

// app.js - различные способы импорта
import multiply from './math.js';           // Импорт default экспорта
import { add, subtract, PI } from './math.js';  // Именованный импорт
import { Calculator } from './math.js';     // Импорт класса

// Импорт с переименованием
import { getSecret as secret, power } from './math.js';

// Импорт всего модуля
import * as MathModule from './math.js';

// Смешанный импорт
import multiply, { add, Calculator } from './math.js';

// Динамический импорт (ES2020)
async function loadModule() {
  const { add, Calculator } = await import('./math.js');

  console.log(add(5, 3));

  const calc = new Calculator();
  const result = calc.calculate('add', 10, 5);
}

// Условный динамический импорт
if (condition) {
  import('./feature.js').then(module => {
    module.default.init();
  });
}

// Использование
console.log(multiply(4, 5));               // 20
console.log(add(10, 5));                   // 15
console.log(PI);                           // 3.14159

const calc = new Calculator();
console.log(calc.calculate('add', 8, 2));  // 10

console.log(MathModule.add(1, 1));         // 2
console.log(MathModule.default(3, 4));     // 12

// Re-export (перенаправление экспорта)
// utils.js
export { add, subtract } from './math.js';
export { default as multiply } from './math.js';

// Tree shaking - оптимизация при сборке
import { add } from './math.js';  // Только функция add попадет в bundle
`

const comparisonTable = `
// =======================================
// СРАВНЕНИЕ СИСТЕМ МОДУЛЕЙ
// =======================================

/*
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   Система   │    IIFE     │  CommonJS   │     AMD     │     UMD     │   ES6 ESM   │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Окружение   │   Браузер   │   Node.js   │   Браузер   │ Универсал   │ Браузер+Node│
│ Загрузка    │ Синхронная  │ Синхронная  │ Асинхронная │    Обе      │    Обе      │
│ Стандарт    │     Нет     │  De-facto   │     Нет     │     Нет     │ Официальный │
│ Tree shake  │     Нет     │     Нет     │     Нет     │     Нет     │     Да      │
│ Top-level   │     Да      │     Да      │     Да      │     Да      │  Только ES6 │
│ await       │             │             │             │             │             │
│ Статический │     Нет     │     Нет     │     Нет     │     Нет     │     Да      │
│ анализ      │             │             │             │             │             │
│ Год         │   ~2003     │    2009     │    2009     │    2011     │    2015     │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

Детальное сравнение характеристик:

1. СИНТАКСИС:
   IIFE:     var module = (function() { return {}; })();
   CommonJS: const module = require('./module'); module.exports = {};
   AMD:      define(['dep'], function(dep) { return {}; });
   UMD:      Комбинация всех подходов в одном файле
   ES6:      import module from './module'; export default {};

2. ЗАГРУЗКА МОДУЛЕЙ:
   IIFE:     Все сразу при загрузке страницы
   CommonJS: Синхронная, блокирующая
   AMD:      Асинхронная, не блокирующая
   UMD:      Адаптируется к окружению
   ES6:      Статическая + динамическая (import())

3. РАЗРЕШЕНИЕ ЗАВИСИМОСТЕЙ:
   IIFE:     Ручное управление порядком <script>
   CommonJS: Во время выполнения
   AMD:      До выполнения, асинхронно
   UMD:      Зависит от среды
   ES6:      На этапе компиляции

4. ОПТИМИЗАЦИИ:
   IIFE:     Минификация, конкатенация
   CommonJS: Bundling (Webpack, Browserify)
   AMD:      Ленивая загрузка, code splitting
   UMD:      Как в каждой конкретной среде
   ES6:      Tree shaking, scope hoisting

5. ПОДДЕРЖКА БРАУЗЕРАМИ:
   IIFE:     100% (любой JS движок)
   CommonJS: 0% (только с транспайлерами)
   AMD:      RequireJS/Almond
   UMD:      100% (fallback на глобальные)
   ES6:      ~95% современных браузеров
*/
`

const modernPracticesExample = `
// =======================================
// СОВРЕМЕННЫЕ ПРАКТИКИ И ИНСТРУМЕНТЫ
// =======================================

// package.json - настройка типа модулей
{
  "type": "module",  // Используем ES modules
  "main": "index.js",
  "exports": {
    ".": {
      "import": "./index.esm.js",
      "require": "./index.cjs.js"
    },
    "./utils": {
      "import": "./utils.esm.js",
      "require": "./utils.cjs.js"
    }
  }
}

// Поддержка CommonJS и ES modules в одном проекте
// index.cjs.js (CommonJS версия)
const { createServer } = require('http');
const utils = require('./utils.cjs.js');

module.exports = {
  startServer: () => {
    const server = createServer(utils.requestHandler);
    server.listen(3000);
  }
};

// index.esm.js (ES modules версия)
import { createServer } from 'http';
import { requestHandler } from './utils.esm.js';

export function startServer() {
  const server = createServer(requestHandler);
  server.listen(3000);
}

// Webpack конфигурация для совместимости
module.exports = {
  entry: './src/index.js',
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd',  // UMD для совместимости
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false  // Не транспайлим ES modules
              }]
            ]
          }
        }
      }
    ]
  }
};

// Rollup конфигурация для создания разных форматов
export default [
  // ES modules
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  },
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  },
  // UMD
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'MyLibrary'
    }
  }
];

// Современная структура пакета
my-package/
├── src/
│   ├── index.js      (исходники ES6)
│   └── utils.js
├── dist/
│   ├── index.esm.js  (ES modules)
│   ├── index.cjs.js  (CommonJS)
│   └── index.umd.js  (UMD)
├── package.json
└── README.md

// Условные экспорты в Node.js 12+
// package.json
{
  "exports": {
    ".": {
      "node": {
        "import": "./dist/index.node.esm.js",
        "require": "./dist/index.node.cjs.js"
      },
      "browser": {
        "import": "./dist/index.browser.esm.js",
        "require": "./dist/index.browser.cjs.js"
      },
      "default": "./dist/index.esm.js"
    }
  }
}

// Типы для TypeScript
// index.d.ts
export declare function myFunction(param: string): number;
export declare class MyClass {
  constructor(options?: Options);
}
export default MyClass;
`

const migrationExample = `
// =======================================
// МИГРАЦИЯ МЕЖДУ СИСТЕМАМИ МОДУЛЕЙ
// =======================================

// 1. IIFE → ES6 Modules
// Было (IIFE):
var UserManager = (function() {
  var users = [];

  return {
    addUser: function(user) { users.push(user); },
    getUsers: function() { return users.slice(); }
  };
})();

// Стало (ES6):
let users = [];

export function addUser(user) {
  users.push(user);
}

export function getUsers() {
  return users.slice();
}

// 2. CommonJS → ES6 Modules
// Было (CommonJS):
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = {
  loadConfig: async function(configPath) {
    const fullPath = path.resolve(configPath);
    const data = await readFile(fullPath, 'utf8');
    return JSON.parse(data);
  }
};

// Стало (ES6):
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function loadConfig(configPath) {
  const fullPath = resolve(configPath);
  const data = await readFile(fullPath, 'utf8');
  return JSON.parse(data);
}

// 3. AMD → ES6 Modules
// Было (AMD):
define(['jquery', 'lodash'], function($, _) {
  function DataTable(selector, options) {
    this.$element = $(selector);
    this.options = _.defaults(options, {
      sortable: true,
      paginate: false
    });
  }

  DataTable.prototype.render = function(data) {
    // рендеринг таблицы
  };

  return DataTable;
});

// Стало (ES6):
import $ from 'jquery';
import { defaults } from 'lodash';

export default class DataTable {
  constructor(selector, options) {
    this.$element = $(selector);
    this.options = defaults(options, {
      sortable: true,
      paginate: false
    });
  }

  render(data) {
    // рендеринг таблицы
  }
}

// 4. Градуальная миграция с интеропом
// esm-wrapper.js - обертка для legacy кода
import legacyModule from './legacy-commonjs-module.cjs';

// Оборачиваем CommonJS экспорт в ES6
export const { method1, method2 } = legacyModule;
export default legacyModule;

// commonjs-wrapper.cjs - для использования ES6 в CommonJS
const esmModule = await import('./modern-es6-module.js');

module.exports = {
  // Re-export ES6 модуля
  modernFunction: esmModule.modernFunction,
  ModernClass: esmModule.default
};

// Babel конфигурация для постепенной миграции
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: 'auto',  // Автоопределение формата модулей
      targets: {
        node: '14',
        browsers: ['> 1%', 'last 2 versions']
      }
    }]
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',  // Для Node.js
    '@babel/plugin-syntax-dynamic-import'        // Для динамических импортов
  ]
};
`

const highlightedIIFE = ref('')
const highlightedCommonJS = ref('')
const highlightedAMD = ref('')
const highlightedUMD = ref('')
const highlightedES6 = ref('')
const highlightedComparison = ref('')
const highlightedModern = ref('')
const highlightedMigration = ref('')

onMounted(() => {
  highlightedIIFE.value = Prism.highlight(iifeClosure, Prism.languages.javascript, 'javascript')
  highlightedCommonJS.value = Prism.highlight(commonjsExample, Prism.languages.javascript, 'javascript')
  highlightedAMD.value = Prism.highlight(amdExample, Prism.languages.javascript, 'javascript')
  highlightedUMD.value = Prism.highlight(umdExample, Prism.languages.javascript, 'javascript')
  highlightedES6.value = Prism.highlight(es6ModulesExample, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonTable, Prism.languages.javascript, 'javascript')
  highlightedModern.value = Prism.highlight(modernPracticesExample, Prism.languages.javascript, 'javascript')
  highlightedMigration.value = Prism.highlight(migrationExample, Prism.languages.javascript, 'javascript')
})

const currentStep = ref(1)
const selectedSystem = ref('es6')

const moduleSystems = [
  {
    id: 'iife',
    name: 'IIFE (Closures)',
    year: '2003',
    environment: 'Браузер',
    color: 'grey',
    icon: 'mdi-function'
  },
  {
    id: 'commonjs',
    name: 'CommonJS',
    year: '2009',
    environment: 'Node.js',
    color: 'green',
    icon: 'mdi-nodejs'
  },
  {
    id: 'amd',
    name: 'AMD',
    year: '2009',
    environment: 'Браузер',
    color: 'blue',
    icon: 'mdi-web'
  },
  {
    id: 'umd',
    name: 'UMD',
    year: '2011',
    environment: 'Универсал',
    color: 'purple',
    icon: 'mdi-earth'
  },
  {
    id: 'es6',
    name: 'ES6 Modules',
    year: '2015',
    environment: 'Браузер + Node.js',
    color: 'orange',
    icon: 'mdi-language-javascript'
  }
]
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Системы модулей в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Системы модулей</b> — способы организации и разделения кода на переиспользуемые части.
              В JavaScript существует несколько подходов: <b>IIFE/Closures</b>, <b>CommonJS</b>,
              <b>AMD</b>, <b>UMD</b> и современные <b>ES6 Modules</b>. Каждая система решает проблемы
              своего времени и имеет свои особенности.
            </p>

            <!-- Обзор систем модулей -->
            <v-row class="mb-6">
              <v-col
                v-for="system in moduleSystems"
                :key="system.id"
                cols="12"
                sm="6"
                lg="4"
              >
                <v-card
                  class="pa-4 h-100 cursor-pointer"
                  :class="{ 'v-card--outlined': selectedSystem === system.id }"
                  @click="selectedSystem = system.id"
                >
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      size="large"
                      :color="system.color"
                      class="mr-3"
                    >
                      {{ system.icon }}
                    </v-icon>
                    <div>
                      <h3 class="text-h6 font-weight-bold">{{ system.name }}</h3>
                      <p class="text-caption text-grey-600 ma-0">{{ system.year }} • {{ system.environment }}</p>
                    </div>
                  </div>
                  <v-chip
                    size="small"
                    :color="system.color"
                    variant="tonal"
                  >
                    {{ system.environment }}
                  </v-chip>
                </v-card>
              </v-col>
            </v-row>

            <!-- Временная шкала развития -->
            <h2 class="text-h5 font-weight-bold mb-3">Эволюция систем модулей</h2>
            <v-timeline direction="horizontal" class="mb-8">
              <v-timeline-item
                v-for="system in moduleSystems"
                :key="system.id"
                :dot-color="system.color"
                size="small"
              >
                <template v-slot:opposite>
                  <span class="text-h6 font-weight-bold">{{ system.year }}</span>
                </template>
                <div class="text-center">
                  <h4 class="font-weight-bold">{{ system.name }}</h4>
                  <p class="text-caption">{{ system.environment }}</p>
                </div>
              </v-timeline-item>
            </v-timeline>

            <!-- IIFE / Closures -->
            <h2 class="text-h5 font-weight-bold mb-3">1. IIFE / Module Pattern (2003-2009)</h2>
            <v-alert color="info" class="mb-4">
              <strong>IIFE (Immediately Invoked Function Expression)</strong> — первый способ создания модулей
              через замыкания. Использовался до появления официальных систем модулей.
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h4 class="font-weight-bold mb-2">✅ Преимущества</h4>
                  <ul class="pl-4">
                    <li>Работает везде (любой браузер)</li>
                    <li>Инкапсуляция через замыкания</li>
                    <li>Простота понимания</li>
                    <li>Контроль глобального namespace</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h4 class="font-weight-bold mb-2">❌ Недостатки</h4>
