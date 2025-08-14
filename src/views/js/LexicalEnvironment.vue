<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Основы лексического окружения
console.log("=== Глобальное лексическое окружение ===");

var globalVar = "Я глобальная переменная";
let globalLet = "Я тоже глобальная, но в другом месте";
const globalConst = "И я глобальная константа";

function outerFunction() {
  console.log("Внешняя функция:");
  console.log("- globalVar доступна:", globalVar);
  console.log("- globalLet доступна:", globalLet);

  var outerVar = "Переменная внешней функции";
  let outerLet = "Let внешней функции";

  function innerFunction() {
    console.log("\\nВнутренняя функция:");
    console.log("- globalVar:", globalVar);        // ✅ Доступна
    console.log("- outerVar:", outerVar);          // ✅ Доступна
    console.log("- outerLet:", outerLet);          // ✅ Доступна

    var innerVar = "Переменная внутренней функции";
    console.log("- innerVar:", innerVar);          // ✅ Доступна
  }

  innerFunction();

  // console.log(innerVar); // ❌ ReferenceError: innerVar не доступна
}

outerFunction();

/*
Структура лексических окружений:

Global Lexical Environment:
├── globalVar: "Я глобальная переменная"
├── globalLet: "Я тоже глобальная"
├── globalConst: "И я глобальная константа"
└── outerFunction: function

outerFunction Lexical Environment:
├── Parent: Global Lexical Environment
├── outerVar: "Переменная внешней функции"
├── outerLet: "Let внешней функции"
└── innerFunction: function

innerFunction Lexical Environment:
├── Parent: outerFunction Lexical Environment
└── innerVar: "Переменная внутренней функции"
*/
`

const snippet2 = `
// Создание и инициализация лексического окружения
console.log("=== Фазы создания переменных ===");

// Фаза 1: Creation Phase (Hoisting)
console.log("До объявления:", typeof hoistedVar);     // "undefined"
console.log("До объявления:", typeof hoistedFunc);    // "function"
// console.log("До объявления:", hoistedLet);          // ❌ ReferenceError (TDZ)
// console.log("До объявления:", hoistedConst);        // ❌ ReferenceError (TDZ)

var hoistedVar = "Я была поднята";
let hoistedLet = "Я в TDZ до этой строки";
const hoistedConst = "И я тоже в TDZ";

function hoistedFunc() {
  return "Я полностью поднята";
}

// Фаза 2: Execution Phase
console.log("После объявления:", hoistedVar);         // "Я была поднята"
console.log("После объявления:", hoistedLet);         // "Я в TDZ до этой строки"
console.log("После объявления:", hoistedConst);       // "И я тоже в TDZ"
console.log("После объявления:", hoistedFunc());      // "Я полностью поднята"

// Демонстрация Temporal Dead Zone (TDZ)
function demonstrateTDZ() {
  console.log("\\n=== Temporal Dead Zone ===");

  // console.log(x); // ❌ ReferenceError: x is not defined
  // console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization

  var x = 1;    // undefined -> 1
  let y = 2;    // TDZ -> 2
  const z = 3;  // TDZ -> 3

  console.log("x после инициализации:", x);
  console.log("y после инициализации:", y);
  console.log("z после инициализации:", z);
}

demonstrateTDZ();

// Различия в поведении var, let, const
function variableDeclarations() {
  console.log("\\n=== Различия var, let, const ===");

  // var: функциональная область видимости
  if (true) {
    var varInBlock = "var видна за пределами блока";
  }
  console.log("varInBlock:", varInBlock); // ✅ Доступна

  // let/const: блочная область видимости
  if (true) {
    let letInBlock = "let видна только в блоке";
    const constInBlock = "const тоже только в блоке";
    console.log("Внутри блока - letInBlock:", letInBlock);
    console.log("Внутри блока - constInBlock:", constInBlock);
  }
  // console.log(letInBlock);   // ❌ ReferenceError
  // console.log(constInBlock); // ❌ ReferenceError
}

variableDeclarations();
`

const snippet3 = `
// Практический пример: замыкания и лексическое окружение
console.log("=== Замыкания и лексическое окружение ===");

function createCounter(initialValue = 0) {
  // Лексическое окружение createCounter:
  // { initialValue: параметр, count: будет создана }

  let count = initialValue;

  // Каждая возвращаемая функция создает замыкание
  // и сохраняет ссылку на лексическое окружение createCounter
  return {
    increment: function() {
      // Лексическое окружение increment:
      // { Parent: createCounter Lexical Environment }
      count++;
      return count;
    },

    decrement: function() {
      // Лексическое окружение decrement:
      // { Parent: createCounter Lexical Environment }
      count--;
      return count;
    },

    getValue: function() {
      // Лексическое окружение getValue:
      // { Parent: createCounter Lexical Environment }
      return count;
    }
  };
}

const counter1 = createCounter(5);
const counter2 = createCounter(10);

console.log("counter1.getValue():", counter1.getValue()); // 5
console.log("counter1.increment():", counter1.increment()); // 6
console.log("counter1.increment():", counter1.increment()); // 7

console.log("counter2.getValue():", counter2.getValue()); // 10
console.log("counter2.decrement():", counter2.decrement()); // 9

// Каждый счетчик имеет свое независимое лексическое окружение!
console.log("counter1 финальное значение:", counter1.getValue()); // 7
console.log("counter2 финальное значение:", counter2.getValue()); // 9

// Демонстрация цепочки областей видимости
function demonstrateScopeChain() {
  console.log("\\n=== Цепочка областей видимости ===");

  var level1 = "Уровень 1";

  function level2Function() {
    var level2 = "Уровень 2";
    console.log("level2Function видит:", level1, level2); // ✅ Оба доступны

    function level3Function() {
      var level3 = "Уровень 3";
      console.log("level3Function видит:", level1, level2, level3); // ✅ Все доступны

      // Поиск переменной идет по цепочке:
      // 1. level3Function Lexical Environment
      // 2. level2Function Lexical Environment
      // 3. Global Lexical Environment

      return function level4Function() {
        var level4 = "Уровень 4";
        console.log("level4Function видит:", level1, level2, level3, level4);
        // ✅ Все переменные доступны благодаря замыканию!
      };
    }

    return level3Function();
  }

  const level4Func = level2Function();
  level4Func();
}

demonstrateScopeChain();
`

const snippet4 = `
// Лексическое окружение в различных контекстах
console.log("=== Лексическое окружение в разных контекстах ===");

// 1. Глобальный контекст
var globalVar = "Глобальная";
console.log("Глобальный this:", this === globalThis); // true в браузере

// 2. Контекст функции
function regularFunction() {
  var functionVar = "Функциональная";
  console.log("Обычная функция this:", this === globalThis); // true (в строгом режиме undefined)

  // Вложенная функция
  function nested() {
    console.log("Вложенная функция видит:", globalVar, functionVar);
    console.log("Вложенная функция this:", this === globalThis);
  }

  nested();
}

regularFunction();

// 3. Стрелочные функции - наследуют лексическое окружение
const arrowFunction = () => {
  console.log("\\nСтрелочная функция:");
  console.log("- this наследуется:", this === globalThis);

  const nestedArrow = () => {
    console.log("- вложенная стрелочная this:", this === globalThis);
  };

  nestedArrow();
};

arrowFunction();

// 4. Методы объектов
const obj = {
  name: "MyObject",

  regularMethod: function() {
    console.log("\\nОбычный метод:");
    console.log("- this.name:", this.name);
    console.log("- globalVar доступна:", globalVar);

    // Вложенная обычная функция теряет this
    function innerFunction() {
      console.log("- вложенная функция this.name:", this.name); // undefined
    }

    // Стрелочная функция сохраняет this
    const innerArrow = () => {
      console.log("- вложенная стрелочная this.name:", this.name); // "MyObject"
    };

    innerFunction();
    innerArrow();
  },

  arrowMethod: () => {
    console.log("\\nСтрелочный метод:");
    console.log("- this.name:", this.name); // undefined (this = globalThis)
    console.log("- globalVar доступна:", globalVar);
  }
};

obj.regularMethod();
obj.arrowMethod();

// 5. Конструктор и лексическое окружение
function Constructor(name) {
  // Лексическое окружение конструктора
  this.name = name;
  var privateVar = "Приватная переменная";

  // Метод с доступом к privateVar через замыкание
  this.getPrivate = function() {
    return privateVar; // Доступ к лексическому окружению Constructor
  };

  // Метод без доступа к privateVar
  Constructor.prototype.getPrivateProto = function() {
    // return privateVar; // ❌ ReferenceError: privateVar is not defined
    return "Нет доступа к privateVar из прототипа";
  };
}

const instance = new Constructor("Test");
console.log("\\nКонструктор:");
console.log("- instance.name:", instance.name);
console.log("- instance.getPrivate():", instance.getPrivate());
console.log("- instance.getPrivateProto():", instance.getPrivateProto());
`

const snippet5 = `
// Отладка лексического окружения
console.log("=== Отладка лексического окружения ===");

// Инструменты для отладки
function debugLexicalEnvironment() {
  var debugVar = "Переменная для отладки";
  let debugLet = "Let для отладки";
  const debugConst = "Const для отладки";

  function innerDebug() {
    var innerVar = "Внутренняя переменная";

    // 1. Использование debugger для остановки выполнения
    debugger; // Откроет инструменты разработчика

    // 2. Анализ области видимости в консоли
    console.log("=== Доступные переменные ===");
    console.log("debugVar:", debugVar);
    console.log("debugLet:", debugLet);
    console.log("debugConst:", debugConst);
    console.log("innerVar:", innerVar);

    // 3. Использование console.trace() для трассировки
    console.trace("Трассировка вызовов функций");

    return function() {
      // 4. Замыкание сохраняет доступ ко всем переменным
      console.log("\\n=== В замыкании доступны ===");
      console.log("debugVar:", debugVar);
      console.log("debugLet:", debugLet);
      console.log("debugConst:", debugConst);
      console.log("innerVar:", innerVar);

      // 5. Проверка существования переменных
      console.log("\\n=== Проверка существования ===");
      console.log("typeof debugVar:", typeof debugVar);
      console.log("typeof innerVar:", typeof innerVar);
      console.log("typeof nonExistent:", typeof nonExistent);
    };
  }

  return innerDebug();
}

const closureFunction = debugLexicalEnvironment();
closureFunction();

// Анализ производительности и памяти
function memoryLeakExample() {
  console.log("\\n=== Пример утечки памяти ===");

  function createLeakyFunction() {
    // Большой объект, который может вызвать утечку памяти
    const largeObject = new Array(1000000).fill("memory leak");
    const smallValue = "важная информация";

    // ❌ Плохо: замыкание держит ссылку на весь largeObject
    const badClosure = function() {
      console.log("smallValue:", smallValue);
      // largeObject остается в памяти, хотя не используется!
    };

    // ✅ Хорошо: извлекаем только нужные данные
    const necessaryData = largeObject.length; // Только размер
    const goodClosure = function() {
      console.log("smallValue:", smallValue);
      console.log("array length was:", necessaryData);
      // largeObject может быть собран сборщиком мусора
    };

    return goodClosure; // Возвращаем оптимизированное замыкание
  }

  const optimizedFunction = createLeakyFunction();
  optimizedFunction();
}

memoryLeakExample();

// Инструменты для отладки области видимости
function debugScope(param) {
  var scopeVar = "scope variable";

  function printScopeInfo(functionName) {
    console.log(\`\\n=== Информация об области видимости: \${functionName} ===\`);

    // Список всех доступных переменных (кроме this)
    const availableVars = [];

    try { console.log("param:", param); availableVars.push("param"); } catch(e) {}
    try { console.log("scopeVar:", scopeVar); availableVars.push("scopeVar"); } catch(e) {}
    try { console.log("arguments:", typeof arguments !== 'undefined' ? "available" : "not available"); } catch(e) {}

    console.log("Доступные переменные:", availableVars.join(", "));

    // Информация о this
    console.log("this ===",
      this === globalThis ? "globalThis" :
      this === undefined ? "undefined" :
      typeof this
    );
  }

  return {
    analyze: () => printScopeInfo("analyze method"),
    nested: function() {
      var nestedVar = "nested variable";
      return () => {
        printScopeInfo("nested arrow function");
        console.log("nestedVar:", nestedVar);
      };
    }
  };
}

const debugger1 = debugScope("test parameter");
debugger1.analyze();

const nestedDebugger = debugger1.nested();
nestedDebugger();
`

const snippet6 = `
// Продвинутые примеры лексического окружения
console.log("=== Продвинутые примеры ===");

// 1. Модульный паттерн с приватными переменными
const Module = (function() {
  // Приватное лексическое окружение модуля
  let privateCounter = 0;
  const privateArray = [];

  function privateFunction() {
    return "Приватная функция";
  }

  // Публичный API
  return {
    increment: function() {
      privateCounter++;
      return privateCounter;
    },

    addToArray: function(item) {
      privateArray.push(item);
      return privateArray.length;
    },

    getArrayLength: function() {
      return privateArray.length;
    },

    callPrivateFunction: function() {
      return privateFunction(); // Доступ к приватной функции
    },

    // Метод для отладки (не используйте в продакшене!)
    debug: function() {
      return {
        privateCounter,
        privateArrayLength: privateArray.length,
        privateFunction: privateFunction()
      };
    }
  };
})();

console.log("Module.increment():", Module.increment()); // 1
console.log("Module.addToArray('item1'):", Module.addToArray('item1')); // 1
console.log("Module.callPrivateFunction():", Module.callPrivateFunction());
console.log("Module.debug():", Module.debug());

// Приватные переменные недоступны извне
console.log("Module.privateCounter:", Module.privateCounter); // undefined

// 2. Фабрика функций с конфигурируемым поведением
function createValidator(config) {
  // Лексическое окружение сохраняет конфигурацию
  const rules = config.rules || [];
  const errorMessages = config.errorMessages || {};

  return function validate(value) {
    const errors = [];

    // Каждое правило имеет доступ к config через замыкание
    rules.forEach(rule => {
      if (!rule.test(value)) {
        errors.push(errorMessages[rule.name] || \`Ошибка валидации: \${rule.name}\`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors,
      value: value
    };
  };
}

const emailValidator = createValidator({
  rules: [
    { name: 'required', test: v => v && v.length > 0 },
    { name: 'email', test: v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) },
    { name: 'length', test: v => v.length <= 100 }
  ],
  errorMessages: {
    required: 'Email обязателен',
    email: 'Неверный формат email',
    length: 'Email слишком длинный'
  }
});

console.log("\\nВалидация email:");
console.log("Valid email:", emailValidator('test@example.com'));
console.log("Invalid email:", emailValidator('invalid-email'));

// 3. Система событий с лексическим окружением
function createEventEmitter() {
  const events = new Map(); // Приватное хранилище событий

  return {
    on(eventName, callback) {
      if (!events.has(eventName)) {
        events.set(eventName, []);
      }
      events.get(eventName).push(callback);

      // Возвращаем функцию отписки (замыкание!)
      return function unsubscribe() {
        const callbacks = events.get(eventName);
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      };
    },

    emit(eventName, ...args) {
      const callbacks = events.get(eventName) || [];
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(\`Ошибка в обработчике события \${eventName}:\`, error);
        }
      });
    },

    getEventNames() {
      return Array.from(events.keys());
    },

    getListenerCount(eventName) {
      return events.has(eventName) ? events.get(eventName).length : 0;
    }
  };
}

const emitter = createEventEmitter();

const unsubscribe1 = emitter.on('test', (data) => {
  console.log('Обработчик 1:', data);
});

const unsubscribe2 = emitter.on('test', (data) => {
  console.log('Обработчик 2:', data);
});

console.log("\\nСистема событий:");
console.log("Количество обработчиков:", emitter.getListenerCount('test')); // 2

emitter.emit('test', 'Привет!');

unsubscribe1(); // Отписываемся от первого обработчика

console.log("После отписки:", emitter.getListenerCount('test')); // 1
emitter.emit('test', 'Пока!');
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Лексическое окружение (Lexical Environment)
            </h1>

            <div class="mb-6 pa-4 rounded-lg" style="background-color: #e3f2fd;">
              <h2 class="text-h6 font-weight-bold mb-2">Краткий ответ для собеседования:</h2>
              <p class="font-weight-regular mb-2">
                <strong>Лексическое окружение</strong> — это структура данных, которая содержит переменные, функции
                и ссылку на внешнее лексическое окружение. Создается при вызове функции или входе в блок кода.
              </p>
              <p class="font-weight-regular ma-0">
                <strong>Состоит из:</strong> Environment Record (запись окружения с переменными) +
                Reference to Outer Environment (ссылка на внешнее окружение). Основа для замыканий и области видимости.
              </p>
            </div>

            <h2 class="text-h5 font-weight-bold mb-3">Основы лексического окружения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Создание и инициализация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Замыкания и лексическое окружение</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Контексты выполнения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка лексического окружения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Структура лексического окружения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Environment Record</h3>
                  <ul class="pl-4">
                    <li><strong>Declarative Record:</strong> переменные, функции</li>
                    <li><strong>Object Record:</strong> глобальные объекты</li>
                    <li><strong>Function Record:</strong> параметры, arguments</li>
                    <li><strong>Module Record:</strong> импорты/экспорты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Outer Reference</h3>
                  <ul class="pl-4">
                    <li>Ссылка на внешнее окружение</li>
                    <li>Создает цепочку областей видимости</li>
                    <li>null для глобального окружения</li>
                    <li>Определяется при создании функции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Этапы жизни</h3>
                  <ul class="pl-4">
                    <li><strong>Creation:</strong> создание записи</li>
                    <li><strong>Initialization:</strong> инициализация переменных</li>
                    <li><strong>Execution:</strong> выполнение кода</li>
                    <li><strong>Cleanup:</strong> сборка мусора</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Типы областей видимости</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Создается</th>
                <th class="text-left font-weight-bold">Переменные</th>
                <th class="text-left font-weight-bold">Особенности</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Global</b></td>
                <td class="pt-2 pb-2">При запуске скрипта</td>
                <td class="pt-2 pb-2">var, let, const, function</td>
                <td class="pt-2 pb-2">Корневое окружение</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Function</b></td>
                <td class="pt-2 pb-2">При вызове функции</td>
                <td class="pt-2 pb-2">Параметры, var, function, arguments</td>
                <td class="pt-2 pb-2">Функциональная область</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Block</b></td>
                <td class="pt-2 pb-2">При входе в блок</td>
                <td class="pt-2 pb-2">let, const</td>
                <td class="pt-2 pb-2">Блочная область видимости</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Module</b></td>
                <td class="pt-2 pb-2">При загрузке модуля</td>
                <td class="pt-2 pb-2">import, export, let, const</td>
                <td class="pt-2 pb-2">Модульная область</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Eval</b></td>
                <td class="pt-2 pb-2">При выполнении eval</td>
                <td class="pt-2 pb-2">Зависит от режима</td>
                <td class="pt-2 pb-2">Динамическое создание</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Hoisting и TDZ</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-arrow-up-bold</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Hoisting (Поднятие)</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>var:</strong> поднимается и инициализируется как undefined</li>
                    <li><strong>function:</strong> поднимается полностью</li>
                    <li><strong>let/const:</strong> поднимаются, но не инициализируются</li>
                    <li><strong>class:</strong> поднимается, но не инициализируется</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-clock-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Temporal Dead Zone</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Период:</strong> от создания до инициализации</li>
                    <li><strong>let/const:</strong> находятся в TDZ</li>
                    <li><strong>Ошибка:</strong> ReferenceError при обращении</li>
                    <li><strong>Защита:</strong> от использования до объявления</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы на собеседовании</h2>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">1. Что такое лексическое окружение?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Лексическое окружение — это внутренняя структура данных JavaScript, которая связывает идентификаторы переменных с их значениями и содержит ссылку на внешнее лексическое окружение.</p>
                  <p><strong>Компоненты:</strong></p>
                  <ul>
                    <li><strong>Environment Record</strong> — хранит переменные и функции</li>
                    <li><strong>Outer Environment Reference</strong> — ссылка на внешнее окружение</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">2. Как работает цепочка областей видимости?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> При поиске переменной JavaScript движется по цепочке от текущего лексического окружения к внешнему, пока не найдет переменную или не достигнет глобального окружения.</p>
                  <p><strong>Порядок поиска:</strong></p>
                  <ol>
                    <li>Текущее лексическое окружение</li>
                    <li>Родительское лексическое окружение</li>
                    <li>...продолжается до глобального</li>
                    <li>Если не найдено — ReferenceError</li>
                  </ol>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">3. В чем разница между лексической и динамической областью видимости?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Лексическая область видимости (JavaScript):</strong></p>
                  <ul>
                    <li>Определяется местом объявления в коде</li>
                    <li>Статическая — не изменяется во время выполнения</li>
                    <li>Основа для замыканий</li>
                  </ul>
                  <p><strong>Динамическая область видимости:</strong></p>
                  <ul>
                    <li>Определяется порядком вызова функций</li>
                    <li>Изменяется во время выполнения</li>
                    <li>Используется в некоторых языках (например, в некоторых диалектах Lisp)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">4. Что такое замыкание и как оно связано с лексическим окружением?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Замыкание — это функция, которая имеет доступ к переменным из внешней области видимости даже после того, как внешняя функция завершила выполнение.</p>
                  <p><strong>Механизм:</strong></p>
                  <ul>
                    <li>Функция сохраняет ссылку на свое лексическое окружение</li>
                    <li>Лексическое окружение остается в памяти</li>
                    <li>Внутренняя функция может обращаться к внешним переменным</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">5. Объясните hoisting в контексте лексического окружения</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Hoisting — это поведение, при котором объявления переменных и функций "поднимаются" в начало их области видимости.</p>
                  <p><strong>На уровне лексического окружения:</strong></p>
                  <ul>
                    <li><strong>Creation Phase:</strong> создаются привязки для всех объявлений</li>
                    <li><strong>var:</strong> инициализируется как undefined</li>
                    <li><strong>let/const:</strong> остаются в TDZ (Temporal Dead Zone)</li>
                    <li><strong>function:</strong> полностью инициализируется</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">6. Как стрелочные функции влияют на лексическое окружение?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Стрелочные функции не создают собственного контекста this, arguments и не имеют собственного лексического окружения для этих значений.</p>
                  <p><strong>Особенности:</strong></p>
                  <ul>
                    <li><strong>this:</strong> наследуется из внешнего контекста</li>
                    <li><strong>arguments:</strong> наследуется или недоступно</li>
                    <li><strong>super:</strong> наследуется из внешнего контекста</li>
                    <li><strong>new.target:</strong> наследуется из внешнего контекста</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Практические применения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Правильное использование</h3>
                  <ul class="pl-4">
                    <li><strong>Модульный паттерн:</strong> приватные переменные</li>
                    <li><strong>Замыкания:</strong> сохранение состояния</li>
                    <li><strong>Каррирование:</strong> частичное применение функций</li>
                    <li><strong>Event handlers:</strong> сохранение контекста</li>
                    <li><strong>IIFE:</strong> изоляция области видимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Частые ошибки</h3>
                  <ul class="pl-4">
                    <li><strong>Утечки памяти:</strong> ненужные замыкания</li>
                    <li><strong>Циклы и замыкания:</strong> проблемы с var</li>
                    <li><strong>TDZ ошибки:</strong> использование до объявления</li>
                    <li><strong>Путаница с this:</strong> в стрелочных функциях</li>
                    <li><strong>Глобальные переменные:</strong> загрязнение глобальной области</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Понимание лексического окружения помогает писать более эффективный код и избегать утечек памяти.
            </v-alert>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Управление памятью</h3>
                  <ul class="text-left pl-4">
                    <li>Избегайте ненужных замыканий</li>
                    <li>Обнуляйте ссылки на большие объекты</li>
                    <li>Используйте WeakMap для слабых ссылок</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="text-left pl-4">
                    <li>Минимизируйте глубину вложенности</li>
                    <li>Используйте let/const вместо var</li>
                    <li>Оптимизируйте поиск переменных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-bug</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Отладка</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте debugger; для остановки</li>
                    <li>Анализируйте Scope в DevTools</li>
                    <li>Проверяйте цепочку областей</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-6">
              <strong>Лексическое окружение</strong> — это фундаментальная концепция JavaScript, которая определяет,
              как работают переменные, области видимости и замыкания. Глубокое понимание этой темы позволяет:
            </p>
            <ul class="mb-6">
              <li>Писать более предсказуемый и безопасный код</li>
              <li>Эффективно использовать замыкания и области видимости</li>
              <li>Избегать типичных ошибок с hoisting и TDZ</li>
              <li>Оптимизировать производительность приложений</li>
              <li>Лучше понимать работу современных JavaScript движков</li>
            </ul>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://tc39.es/ecma262/#sec-lexical-environments"
                target="_blank"
                class="mr-2">
                ECMAScript Specification
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
                target="_blank">
                MDN: Closures
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
