<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// =====================================
// 1. FUNCTION DECLARATION
// =====================================

// Синтаксис Function Declaration
function greet(name) {
  return "Привет, " + name + "!";
}

// Можно вызывать ДО объявления благодаря hoisting
console.log(sayHello("Мир")); // "Hello, Мир!" - работает!

function sayHello(name) {
  return "Hello, " + name + "!";
}

// Условные объявления (работают, но не рекомендуются)
if (true) {
  function conditionalFunc() {
    return "Я объявлена в блоке";
  }
}

// Hoisting - функция "поднимается" наверх области видимости
console.log(hoistedFunction()); // "Я поднялась!"

function hoistedFunction() {
  return "Я поднялась!";
}

// Могут быть переопределены
function canBeRedefined() {
  return "Первая версия";
}

function canBeRedefined() {
  return "Вторая версия"; // Перезапишет первую
}

console.log(canBeRedefined()); // "Вторая версия"
`

const snippet2 = `
// =====================================
// 2. FUNCTION EXPRESSION
// =====================================

// Анонимное функциональное выражение
const greet = function(name) {
  return "Привет, " + name + "!";
};

// Именованное функциональное выражение
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

// НЕ работает hoisting
console.log(typeof notHoisted); // undefined
// console.log(notHoisted()); // TypeError: notHoisted is not a function

const notHoisted = function() {
  return "Я не поднимусь!";
};

// Теперь можно вызывать
console.log(notHoisted()); // "Я не поднимусь!"

// Условное создание функций
let condition = true;
let conditionalFunc;

if (condition) {
  conditionalFunc = function() {
    return "Создана по условию";
  };
} else {
  conditionalFunc = function() {
    return "Альтернативная функция";
  };
}

// Функции как значения переменных
const functions = {
  add: function(a, b) {
    return a + b;
  },
  multiply: function(a, b) {
    return a * b;
  }
};

// Передача функции как аргумента
function executeOperation(operation, a, b) {
  return operation(a, b);
}

const add = function(x, y) {
  return x + y;
};

console.log(executeOperation(add, 5, 3)); // 8

// IIFE (Immediately Invoked Function Expression)
(function(name) {
  console.log("IIFE: Привет, " + name + "!");
})("Мир");

// Функциональное выражение в переменной
let currentFunction = function version1() {
  return "Версия 1";
};

// Можно переназначить
currentFunction = function version2() {
  return "Версия 2";
};

console.log(currentFunction()); // "Версия 2"
`

const snippet3 = `
// =====================================
// 3. ARROW FUNCTION (ES6+)
// =====================================

// Базовый синтаксис
const greet = (name) => {
  return "Привет, " + name + "!";
};

// Краткий синтаксис для одного выражения
const greetShort = name => \`Привет, \${name}!\`;

// Без параметров
const sayHello = () => "Привет!";

// Один параметр (скобки необязательны)
const double = x => x * 2;

// Несколько параметров
const add = (a, b) => a + b;

// Возврат объекта (нужны скобки)
const createUser = (name, age) => ({ name, age });

// Более сложная логика
const processData = (data) => {
  const filtered = data.filter(item => item > 0);
  const doubled = filtered.map(item => item * 2);
  return doubled;
};

// НЕТ собственного this
const obj = {
  name: "Объект",

  // Обычная функция - this ссылается на obj
  regularMethod: function() {
    console.log("Regular this:", this.name); // "Объект"

    // Стрелочная функция внутри - наследует this
    const arrowInside = () => {
      console.log("Arrow inside this:", this.name); // "Объект"
    };
    arrowInside();
  },

  // Стрелочная функция как метод - this ссылается на window/undefined
  arrowMethod: () => {
    console.log("Arrow method this:", this.name); // undefined
  }
};

obj.regularMethod();
obj.arrowMethod();

// НЕТ arguments объекта
const regularFunc = function() {
  console.log("Regular arguments:", arguments); // Есть arguments
};

const arrowFunc = (...args) => {
  console.log("Arrow args:", args); // Используем rest параметры
};

regularFunc(1, 2, 3);
arrowFunc(1, 2, 3);

// НЕ можут быть конструкторами
const RegularConstructor = function(name) {
  this.name = name;
};

const ArrowConstructor = (name) => {
  this.name = name;
};

const regular = new RegularConstructor("Работает"); // ✅
// const arrow = new ArrowConstructor("Ошибка"); // ❌ TypeError

// Полезны для callback'ов
const numbers = [1, 2, 3, 4, 5];

// Длинный способ
const doubled1 = numbers.map(function(num) {
  return num * 2;
});

// Короткий способ со стрелочными функциями
const doubled2 = numbers.map(num => num * 2);

console.log(doubled1); // [2, 4, 6, 8, 10]
console.log(doubled2); // [2, 4, 6, 8, 10]

// Цепочки методов с arrow functions
const result = [1, 2, 3, 4, 5]
  .filter(x => x > 2)
  .map(x => x * 2)
  .reduce((acc, x) => acc + x, 0);

console.log(result); // 18

// Async arrow functions
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
`

const snippet4 = `
// =====================================
// 4. СРАВНЕНИЕ И ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. HOISTING - Поднятие функций
console.log("=== HOISTING ===");

// Function Declaration - поднимается полностью
console.log(declaredFunc()); // "Я поднялась!" - работает

function declaredFunc() {
  return "Я поднялась!";
}

// Function Expression - поднимается только переменная
console.log(typeof expressedFunc); // undefined
// console.log(expressedFunc()); // TypeError

var expressedFunc = function() {
  return "Я не поднялась!";
};

// Arrow Function - также как Function Expression
console.log(typeof arrowFunc); // undefined
// console.log(arrowFunc()); // TypeError

var arrowFunc = () => "Я тоже не поднялась!";

// 2. THIS CONTEXT
console.log("=== THIS CONTEXT ===");

const contextObj = {
  name: "Тестовый объект",

  // Function Declaration/Expression - динамический this
  regularMethod: function() {
    console.log("Regular method this:", this.name);

    // Вложенная обычная функция теряет контекст
    function nested() {
      console.log("Nested function this:", this.name); // undefined
    }
    nested();

    // Стрелочная функция наследует контекст
    const nestedArrow = () => {
      console.log("Nested arrow this:", this.name); // "Тестовый объект"
    };
    nestedArrow();
  },

  // Arrow Function - лексический this (от внешней области)
  arrowMethod: () => {
    console.log("Arrow method this:", this.name); // undefined
  }
};

contextObj.regularMethod();
contextObj.arrowMethod();

// 3. ARGUMENTS OBJECT
console.log("=== ARGUMENTS ===");

function regularWithArgs() {
  console.log("Regular arguments:", arguments);
  console.log("Первый аргумент:", arguments[0]);
}

const arrowWithArgs = (...args) => {
  console.log("Arrow rest params:", args);
  console.log("Первый аргумент:", args[0]);
};

regularWithArgs(1, 2, 3);
arrowWithArgs(1, 2, 3);

// 4. КОНСТРУКТОРЫ
console.log("=== CONSTRUCTORS ===");

// Function Declaration/Expression могут быть конструкторами
function PersonRegular(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return \`Меня зовут \${this.name}, мне \${this.age} лет\`;
  };
}

const FunctionExprConstructor = function(name, age) {
  this.name = name;
  this.age = age;
};

// Arrow Functions НЕ могут быть конструкторами
const ArrowConstructor = (name, age) => {
  this.name = name;
  this.age = age;
};

const person1 = new PersonRegular("Анна", 25);
const person2 = new FunctionExprConstructor("Иван", 30);
// const person3 = new ArrowConstructor("Ошибка", 35); // TypeError

console.log(person1.greet());

// 5. МЕТОДЫ ОБЪЕКТОВ
console.log("=== METHODS ===");

const calculator = {
  value: 0,

  // Обычный метод - правильный this
  add: function(num) {
    this.value += num;
    return this;
  },

  // Стрелочный метод - неправильный this
  subtract: (num) => {
    // this.value не определен!
    console.log("Arrow method this:", this);
    return this;
  },

  // ES6 краткий синтаксис метода
  multiply(num) {
    this.value *= num;
    return this;
  },

  // Геттер
  get result() {
    return this.value;
  }
};

calculator.add(10).multiply(2);
console.log(calculator.result); // 20

// 6. EVENT HANDLERS
console.log("=== EVENT HANDLERS ===");

class ButtonHandler {
  constructor() {
    this.clickCount = 0;
  }

  // Обычный метод - теряет контекст в event handler
  regularHandler() {
    this.clickCount++;
    console.log("Клики:", this.clickCount);
  }

  // Стрелочный метод - сохраняет контекст
  arrowHandler = () => {
    this.clickCount++;
    console.log("Клики:", this.clickCount);
  }

  // Метод с bind
  boundHandler() {
    this.clickCount++;
    console.log("Клики:", this.clickCount);
  }
}

const handler = new ButtonHandler();

// Симуляция event listeners
// button.addEventListener('click', handler.regularHandler); // this будет button
// button.addEventListener('click', handler.arrowHandler); // this остается handler
// button.addEventListener('click', handler.boundHandler.bind(handler)); // bind this

// 7. CALLBACK FUNCTIONS
console.log("=== CALLBACKS ===");

const users = [
  { name: "Анна", age: 25 },
  { name: "Иван", age: 30 },
  { name: "Петр", age: 35 }
];

// Function Expression в качестве callback
const adults1 = users.filter(function(user) {
  return user.age >= 30;
});

// Arrow Function в качестве callback (предпочтительнее)
const adults2 = users.filter(user => user.age >= 30);

console.log("Adults 1:", adults1);
console.log("Adults 2:", adults2);

// 8. PERFORMANCE
console.log("=== PERFORMANCE ===");

// Function Declaration - создается один раз
function performanceTest1() {
  return "Declaration";
}

// Function Expression - создается при каждом выполнении (если в цикле)
for (let i = 0; i < 1000000; i++) {
  // Медленно - создается новая функция каждый раз
  const slowFunc = function() {
    return "Expression";
  };
}

// Лучше вынести из цикла
const fastFunc = function() {
  return "Expression";
};

for (let i = 0; i < 1000000; i++) {
  // Быстро - используется существующая функция
  fastFunc();
}
`

const snippet5 = `
// =====================================
// 5. КОГДА ЧТО ИСПОЛЬЗОВАТЬ?
// =====================================

// FUNCTION DECLARATION - используйте когда:
// ✅ Нужна функция доступная до объявления (hoisting)
// ✅ Главные функции модуля
// ✅ Утилитарные функции общего назначения
// ✅ Когда важна читаемость и структура кода

function calculateTax(amount, rate) {
  return amount * rate;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// FUNCTION EXPRESSION - используйте когда:
// ✅ Условное создание функций
// ✅ Функции как значения переменных
// ✅ Callback функции с контекстом
// ✅ Методы объектов

const mathOperations = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; }
};

// Условное создание
const isProduction = process.env.NODE_ENV === 'production';
const logger = isProduction
  ? function() { /* no logging */ }
  : function(message) { console.log(message); };

// ARROW FUNCTION - используйте когда:
// ✅ Короткие функции (особенно одно выражение)
// ✅ Callback функции в массивах
// ✅ Функции без собственного контекста
// ✅ React компоненты и хуки
// ✅ Promise chains

// Обработка массивов
const numbers = [1, 2, 3, 4, 5];
const processedNumbers = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);

// React компоненты
const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
);

// Promise chains
const fetchUserData = (userId) =>
  fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(data => data.user)
    .catch(error => console.error('Error:', error));

// Async/await
const getUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error:', error);
  }
};

// =====================================
// АНТИ-ПАТТЕРНЫ И ОШИБКИ
// =====================================

// ❌ Стрелочные функции как методы объекта
const badObject = {
  name: "Плохой объект",
  greet: () => {
    console.log(\`Привет от \${this.name}\`); // this = undefined
  }
};

// ✅ Правильно
const goodObject = {
  name: "Хороший объект",
  greet() {
    console.log(\`Привет от \${this.name}\`); // this = goodObject
  }
};

// ❌ Стрелочные функции как конструкторы
const BadConstructor = (name) => {
  this.name = name; // TypeError при использовании new
};

// ✅ Правильно
function GoodConstructor(name) {
  this.name = name;
}

// ❌ Переопределение Function Declaration в блоках
if (condition) {
  function badFunction() {
    return "Плохо";
  }
}

// ✅ Правильно - используйте Function Expression
let goodFunction;
if (condition) {
  goodFunction = function() {
    return "Хорошо";
  };
}

// ❌ Слишком сложные стрелочные функции
const complexArrow = (data) => {
  // Много строк кода...
  const processed = data.map(item => {
    // Еще больше кода...
    return item.value > 0 ? item.value * 2 : 0;
  });

  const filtered = processed.filter(value => {
    // И еще код...
    return value !== 0;
  });

  return filtered.reduce((sum, value) => sum + value, 0);
};

// ✅ Правильно - разбейте на части или используйте обычную функцию
function processComplexData(data) {
  const processed = data
    .map(item => item.value > 0 ? item.value * 2 : 0)
    .filter(value => value !== 0);

  return processed.reduce((sum, value) => sum + value, 0);
}

// =====================================
// СОВРЕМЕННЫЕ ПАТТЕРНЫ
// =====================================

// Комбинирование разных типов функций
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  // Обычный метод для сложной логики
  processData() {
    return this.data
      .filter(this.isValid) // Обычный метод
      .map(item => this.transform(item)) // Обычный метод
      .sort((a, b) => a.priority - b.priority); // Arrow для простого сравнения
  }

  // Стрелочная функция сохраняет контекст
  isValid = (item) => {
    return item.value > 0 && item.status === 'active';
  }

  // Обычный метод для читаемости
  transform(item) {
    return {
      ...item,
      processedAt: new Date(),
      processed: true
    };
  }
}

// Functional programming с arrow functions
const pipe = (...functions) => (value) =>
  functions.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = pipe(addOne, double, square);
console.log(transform(3)); // ((3 + 1) * 2)² = 64

// Higher-order functions
const withLogging = (fn) => (...args) => {
  console.log(\`Calling \${fn.name} with\`, args);
  const result = fn(...args);
  console.log(\`Result:\`, result);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Логирует вызов и результат
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Разница между Function Declaration, Function Expression и Arrow Function
            </h1>

            <p class="font-weight-regular mb-6">
              В JavaScript существует несколько способов создания функций, каждый из которых имеет свои особенности.
              Понимание различий между <code>Function Declaration</code>, <code>Function Expression</code> и
              <code>Arrow Function</code> критично для написания качественного кода и успешного прохождения собеседований.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Краткое сравнение</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Function Declaration</th>
                <th class="text-left font-weight-bold">Function Expression</th>
                <th class="text-left font-weight-bold">Arrow Function</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><strong>Синтаксис</strong></td>
                <td class="pt-2 pb-2"><code>function name() {}</code></td>
                <td class="pt-2 pb-2"><code>const name = function() {}</code></td>
                <td class="pt-2 pb-2"><code>const name = () => {}</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Hoisting</strong></td>
                <td class="pt-2 pb-2">✅ Полное поднятие</td>
                <td class="pt-2 pb-2">❌ Только переменная</td>
                <td class="pt-2 pb-2">❌ Только переменная</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>this</strong></td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Лексический</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>arguments</strong></td>
                <td class="pt-2 pb-2">✅ Есть</td>
                <td class="pt-2 pb-2">✅ Есть</td>
                <td class="pt-2 pb-2">❌ Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Конструктор</strong></td>
                <td class="pt-2 pb-2">✅ Можно</td>
                <td class="pt-2 pb-2">✅ Можно</td>
                <td class="pt-2 pb-2">❌ Нельзя</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Краткость</strong></td>
                <td class="pt-2 pb-2">Обычная</td>
                <td class="pt-2 pb-2">Обычная</td>
                <td class="pt-2 pb-2">Очень краткая</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Function Declaration</h2>
            <p class="font-weight-regular mb-3">
              Классический способ объявления функций. Функция поднимается (hoisting) и доступна в любом месте
              области видимости, даже до её объявления.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Function Expression</h2>
            <p class="font-weight-regular mb-3">
              Функция создается как выражение и присваивается переменной. Не поднимается, доступна только
              после объявления. Может быть анонимной или именованной.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Arrow Function (ES6+)</h2>
            <p class="font-weight-regular mb-3">
              Современный синтаксис для создания функций. Не имеет собственного <code>this</code>,
              <code>arguments</code>, не может быть конструктором. Идеальна для коротких функций и callback'ов.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Практическое сравнение</h2>
            <p class="font-weight-regular mb-3">
              Рассмотрим ключевые различия на практических примерах, включая hoisting, контекст this,
              arguments и использование в качестве конструкторов.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Когда что использовать?</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">🔄 Hoisting</h3>
                  <p class="mb-2"><strong>Function Declaration:</strong> Полностью поднимается</p>
                  <p class="mb-2"><strong>Function Expression:</strong> Только переменная</p>
                  <p class="mb-0"><strong>Arrow Function:</strong> Только переменная</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">🎯 this Context</h3>
                  <p class="mb-2"><strong>Function Declaration:</strong> Динамический this</p>
                  <p class="mb-2"><strong>Function Expression:</strong> Динамический this</p>
                  <p class="mb-0"><strong>Arrow Function:</strong> Лексический this</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">🏗️ Конструктор</h3>
                  <p class="mb-2"><strong>Function Declaration:</strong> ✅ Можно использовать</p>
                  <p class="mb-2"><strong>Function Expression:</strong> ✅ Можно использовать</p>
                  <p class="mb-0"><strong>Arrow Function:</strong> ❌ Нельзя использовать</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет, если вызвать функцию до её объявления?</p>
                <p class="font-weight-regular ma-0">
                  <strong>Function Declaration:</strong> Работает благодаря hoisting.<br>
                  <strong>Function Expression/Arrow:</strong> ReferenceError или TypeError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается <code>this</code> в arrow function?</p>
                <p class="font-weight-regular ma-0">
                  Arrow function не имеет собственного <code>this</code> и берет его из внешней области видимости (лексический контекст).
                  Обычные функции имеют динамический <code>this</code>, зависящий от способа вызова.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему arrow function нельзя использовать как конструктор?</p>
                <p class="font-weight-regular ma-0">
                  У arrow function нет внутреннего метода [[Construct]] и собственного <code>this</code>.
                  При вызове с <code>new</code> получим TypeError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как получить аргументы в arrow function?</p>
                <p class="font-weight-regular ma-0">
                  Arrow function не имеет объекта <code>arguments</code>. Используйте rest параметры: <code>(...args) => {}</code>
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать какой тип функций?</p>
                <p class="font-weight-regular ma-0">
                  <strong>Function Declaration:</strong> основные функции, когда нужен hoisting.<br>
                  <strong>Function Expression:</strong> условное создание, методы объектов.<br>
                  <strong>Arrow Function:</strong> короткие функции, callbacks, когда не нужен собственный контекст.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое IIFE и зачем она нужна?</p>
                <p class="font-weight-regular ma-0">
                  Immediately Invoked Function Expression - функция, которая выполняется сразу после создания.
                  Используется для создания изолированной области видимости: <code>(function(){ /* код */ })();</code>
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Что делать</h3>
                  <ul class="pl-4">
                    <li>Используйте Arrow Functions для коротких функций и callbacks</li>
                    <li>Function Declaration для основных функций приложения</li>
                    <li>Function Expression для условного создания функций</li>
                    <li>Предпочитайте const для Function Expression</li>
                    <li>Используйте деструктуризацию и rest параметры</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Чего избегать</h3>
                  <ul class="pl-4">
                    <li>Arrow Functions как методы объектов</li>
                    <li>Arrow Functions как конструкторы</li>
                    <li>Function Declaration внутри блоков</li>
                    <li>Слишком сложные arrow functions</li>
                    <li>Злоупотребление hoisting</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Выбор между Function Declaration, Function Expression и Arrow Function зависит от контекста использования.
              <strong>Function Declaration</strong> подходит для основных функций с hoisting,
              <strong>Function Expression</strong> — для динамического создания функций,
              <strong>Arrow Function</strong> — для коротких функций без собственного контекста.
              Понимание особенностей каждого типа критично для написания качественного JavaScript кода.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
                target="_blank">
                MDN: JavaScript Functions
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
