<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// =====================================
// 1. ВСТРОЕННЫЕ ФУНКЦИИ JAVASCRIPT
// =====================================

// Глобальные функции
console.log(parseInt("123"));        // 123
console.log(parseFloat("123.45"));   // 123.45
console.log(isNaN("abc"));           // true
console.log(isFinite(100));          // true
console.log(encodeURI("привет мир")); // "%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82%20%D0%BC%D0%B8%D1%80"
console.log(decodeURI("%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82%20%D0%BC%D0%B8%D1%80")); // "привет мир"

// eval (использовать осторожно!)
console.log(eval("2 + 3")); // 5

// setTimeout и setInterval
const timerId = setTimeout(() => {
  console.log("Выполнено через 1 секунду");
}, 1000);

const intervalId = setInterval(() => {
  console.log("Каждые 2 секунды");
}, 2000);

// clearTimeout и clearInterval
clearTimeout(timerId);
clearInterval(intervalId);

// =====================================
// 2. ФУНКЦИИ ОБЪЕКТОВ
// =====================================

// Функции Object
const obj = { name: "Иван", age: 30 };

console.log(Object.keys(obj));           // ["name", "age"]
console.log(Object.values(obj));         // ["Иван", 30]
console.log(Object.entries(obj));        // [["name", "Иван"], ["age", 30]]
console.log(Object.hasOwnProperty.call(obj, 'name')); // true

const cloned = Object.assign({}, obj);
const frozen = Object.freeze({ x: 1 });
const sealed = Object.seal({ y: 2 });

// Функции Array
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.map(x => x * 2));     // [2, 4, 6, 8, 10]
console.log(numbers.filter(x => x > 3));  // [4, 5]
console.log(numbers.reduce((acc, x) => acc + x, 0)); // 15
console.log(numbers.find(x => x > 3));    // 4
console.log(numbers.includes(3));         // true
console.log(numbers.indexOf(3));          // 2

numbers.forEach(x => console.log(x));
numbers.push(6);
const last = numbers.pop();

// Функции String
const text = "Hello World";

console.log(text.charAt(0));              // "H"
console.log(text.substring(0, 5));        // "Hello"
console.log(text.toLowerCase());          // "hello world"
console.log(text.split(" "));             // ["Hello", "World"]
console.log(text.replace("World", "JS")); // "Hello JS"
console.log(text.indexOf("o"));           // 4
console.log(text.match(/l/g));            // ["l", "l", "l"]

// Функции Number
console.log(Number.isInteger(42));        // true
console.log(Number.parseFloat("3.14"));   // 3.14
console.log((3.14159).toFixed(2));        // "3.14"
console.log((1234.5).toExponential());    // "1.2345e+3"

// Функции Math
console.log(Math.max(1, 2, 3));           // 3
console.log(Math.min(1, 2, 3));           // 1
console.log(Math.round(3.7));             // 4
console.log(Math.floor(3.7));             // 3
console.log(Math.ceil(3.2));              // 4
console.log(Math.random());               // случайное число от 0 до 1
console.log(Math.pow(2, 3));              // 8
console.log(Math.sqrt(16));               // 4

// Функции Date
const now = new Date();
console.log(now.getFullYear());           // текущий год
console.log(now.getMonth());              // месяц (0-11)
console.log(now.getDate());               // день месяца
console.log(now.getTime());               // timestamp
console.log(Date.now());                  // текущий timestamp
`

const snippet2 = `
// =====================================
// 3. ПОЛЬЗОВАТЕЛЬСКИЕ ФУНКЦИИ
// =====================================

// Function Declaration (Объявление функции)
function greet(name) {
  return "Привет, " + name + "!";
}

// Function Expression (Функциональное выражение)
const greetExpression = function(name) {
  return "Привет, " + name + "!";
};

// Arrow Function (Стрелочная функция)
const greetArrow = (name) => {
  return "Привет, " + name + "!";
};

// Краткая стрелочная функция
const greetShort = name => \`Привет, \${name}!\`;

// Named Function Expression (Именованное функциональное выражение)
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

// Anonymous Function (Анонимная функция)
setTimeout(function() {
  console.log("Анонимная функция");
}, 1000);

// IIFE (Immediately Invoked Function Expression)
(function(name) {
  console.log(\`IIFE: Привет, \${name}!\`);
})("Мир");

// Generator Function (Функция-генератор)
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = numberGenerator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1

// Async Function (Асинхронная функция)
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Async Generator Function
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield new Promise(resolve =>
      setTimeout(() => resolve(i++), 1000)
    );
  }
}

// Constructor Function (Функция-конструктор)
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return \`Меня зовут \${this.name}, мне \${this.age} лет\`;
  };
}

const person1 = new Person("Анна", 25);

// Method (Метод объекта)
const calculator = {
  add: function(a, b) {
    return a + b;
  },

  // Краткий синтаксис метода (ES6)
  subtract(a, b) {
    return a - b;
  },

  // Стрелочная функция как метод (осторожно с this!)
  multiply: (a, b) => a * b
};
`

const snippet3 = `
// =====================================
// 4. СПЕЦИАЛЬНЫЕ ТИПЫ ФУНКЦИЙ
// =====================================

// Higher-Order Function (Функция высшего порядка)
function withLogging(fn) {
  return function(...args) {
    console.log(\`Вызов функции с аргументами: \${args}\`);
    const result = fn.apply(this, args);
    console.log(\`Результат: \${result}\`);
    return result;
  };
}

const loggedAdd = withLogging((a, b) => a + b);
console.log(loggedAdd(2, 3)); // Логи + 5

// Callback Function (Функция обратного вызова)
function processData(data, callback) {
  const processed = data.map(x => x * 2);
  callback(processed);
}

processData([1, 2, 3], result => {
  console.log("Обработанные данные:", result);
});

// Closure Function (Функция-замыкание)
function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getValue());  // 1

// Curried Function (Каррированная функция)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const multiply = curry((a, b, c) => a * b * c);
console.log(multiply(2)(3)(4)); // 24
console.log(multiply(2, 3)(4)); // 24

// Memoized Function (Мемоизированная функция)
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const memoizedFib = memoize(function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// Pure Function (Чистая функция)
function pureAdd(a, b) {
  return a + b; // Нет побочных эффектов, детерминированная
}

// Impure Function (Нечистая функция)
let globalCounter = 0;
function impureIncrement() {
  globalCounter++; // Побочный эффект
  return globalCounter;
}

// Recursive Function (Рекурсивная функция)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Tail Recursive Function (Хвостовая рекурсия)
function tailFactorial(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFactorial(n - 1, n * acc);
}
`

const snippet4 = `
// =====================================
// 5. ФУНКЦИИ ДЛЯ РАБОТЫ С ФУНКЦИЯМИ
// =====================================

// Function.prototype.call()
function introduce(greeting, punctuation) {
  return \`\${greeting}, я \${this.name}\${punctuation}\`;
}

const person = { name: "Иван" };
console.log(introduce.call(person, "Привет", "!")); // "Привет, я Иван!"

// Function.prototype.apply()
const numbers = [1, 5, 3, 9, 2];
console.log(Math.max.apply(null, numbers)); // 9

// Function.prototype.bind()
const boundIntroduce = introduce.bind(person, "Здравствуй");
console.log(boundIntroduce(".")); // "Здравствуй, я Иван."

// Function constructor (редко используется)
const dynamicFunction = new Function('a', 'b', 'return a + b');
console.log(dynamicFunction(2, 3)); // 5

// =====================================
// 6. МЕТОДЫ ФУНКЦИЙ
// =====================================

function testFunction(a, b, c) {
  console.log("arguments:", arguments);
  console.log("this:", this);
  return a + b + c;
}

// Получение информации о функции
console.log(testFunction.name);     // "testFunction"
console.log(testFunction.length);   // 3 (количество параметров)

// toString() - получить код функции
console.log(testFunction.toString());

// =====================================
// 7. ФУНКЦИИ ES6+ ВОЗМОЖНОСТИ
// =====================================

// Деструктуризация в параметрах
function greetUser({name, age = 18}) {
  return \`Привет, \${name}! Тебе \${age} лет.\`;
}

console.log(greetUser({name: "Мария"})); // "Привет, Мария! Тебе 18 лет."

// Rest параметры
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Spread в вызове
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

// Default параметры с функциями
function createUser(name, getId = () => Math.random().toString(36)) {
  return {
    name,
    id: getId()
  };
}

// Template literals в функциях
function html(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || '');
  }, '');
}

const name = "Анна";
const age = 25;
const template = html\`<p>Имя: \${name}, Возраст: \${age}</p>\`;

// Async/Await
async function getData() {
  const data = await fetch('/api/users');
  return data.json();
}

// Promise-based функции
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Использование с async/await
async function example() {
  console.log("Начало");
  await delay(1000);
  console.log("Через секунду");
}
`

const snippet5 = `
// =====================================
// 8. ФУНКЦИИ В МОДУЛЯХ (ES6 MODULES)
// =====================================

// Экспорт функций
export function namedExport() {
  return "Named export";
}

export default function defaultExport() {
  return "Default export";
}

// Экспорт всех функций сразу
export {
  namedExport,
  defaultExport as default
};

// =====================================
// 9. ФУНКЦИИ В КЛАССАХ
// =====================================

class Calculator {
  constructor() {
    this.result = 0;
  }

  // Обычный метод
  add(value) {
    this.result += value;
    return this;
  }

  // Статический метод
  static createCalculator() {
    return new Calculator();
  }

  // Getter
  get value() {
    return this.result;
  }

  // Setter
  set value(newValue) {
    this.result = newValue;
  }

  // Приватный метод (ES2022)
  #privateMethod() {
    return "Приватный метод";
  }

  // Стрелочная функция как метод (связанный this)
  reset = () => {
    this.result = 0;
    return this;
  }
}

const calc = Calculator.createCalculator();
calc.add(5).add(3);
console.log(calc.value); // 8

// =====================================
// 10. СПЕЦИАЛИЗИРОВАННЫЕ ФУНКЦИИ
// =====================================

// Throttle функция
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce функция
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Once функция (выполняется только один раз)
function once(func) {
  let called = false;
  let result;

  return function(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log("Инициализация выполнена!");
  return "initialized";
});

initialize(); // "Инициализация выполнена!"
initialize(); // ничего не выводит

// Compose функция
function compose(...functions) {
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = compose(square, double, addOne);
console.log(transform(3)); // ((3 + 1) * 2)² = 64

// Pipe функция
function pipe(...functions) {
  return function(value) {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

const transform2 = pipe(addOne, double, square);
console.log(transform2(3)); // ((3 + 1) * 2)² = 64
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
              Какие функции есть в JavaScript?
            </h1>

            <p class="font-weight-regular mb-6">
              JavaScript предоставляет множество различных типов функций: от встроенных глобальных функций
              до пользовательских функций различных видов. Понимание всех типов функций критично для
              эффективной разработки на JavaScript.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Встроенные функции JavaScript</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Классификация встроенных функций</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Глобальные функции</h3>
                  <ul class="pl-4">
                    <li><code>parseInt()</code>, <code>parseFloat()</code></li>
                    <li><code>isNaN()</code>, <code>isFinite()</code></li>
                    <li><code>encodeURI()</code>, <code>decodeURI()</code></li>
                    <li><code>eval()</code> (использовать осторожно)</li>
                    <li><code>setTimeout()</code>, <code>setInterval()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Методы встроенных объектов</h3>
                  <ul class="pl-4">
                    <li><strong>Object:</strong> keys, values, entries, assign</li>
                    <li><strong>Array:</strong> map, filter, reduce, forEach</li>
                    <li><strong>String:</strong> charAt, substring, split</li>
                    <li><strong>Math:</strong> max, min, random, floor</li>
                    <li><strong>Date:</strong> now, getFullYear, getTime</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Пользовательские функции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы пользовательских функций</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип функции</th>
                <th class="text-left font-weight-bold">Синтаксис</th>
                <th class="text-left font-weight-bold">Hoisting</th>
                <th class="text-left font-weight-bold">this</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><strong>Function Declaration</strong></td>
                <td class="pt-2 pb-2"><code>function name() {}</code></td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Основные функции</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Function Expression</strong></td>
                <td class="pt-2 pb-2"><code>const f = function() {}</code></td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Условные объявления</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Arrow Function</strong></td>
                <td class="pt-2 pb-2"><code>const f = () => {}</code></td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">Лексический</td>
                <td class="pt-2 pb-2">Callback'и, короткие функции</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Generator</strong></td>
                <td class="pt-2 pb-2"><code>function* name() {}</code></td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Итераторы, ленивые вычисления</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Async Function</strong></td>
                <td class="pt-2 pb-2"><code>async function() {}</code></td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Асинхронные операции</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><strong>Constructor</strong></td>
                <td class="pt-2 pb-2"><code>function Name() {}</code></td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">Новый объект</td>
                <td class="pt-2 pb-2">Создание объектов</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Специальные типы функций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функции для работы с функциями</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Современные возможности функций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Категории функций по назначению</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">По области применения</h3>
                  <ul class="pl-4">
                    <li><strong>Утилитарные:</strong> обработка данных</li>
                    <li><strong>Обработчики событий:</strong> onClick, onSubmit</li>
                    <li><strong>API функции:</strong> fetch, save, delete</li>
                    <li><strong>Валидаторы:</strong> проверка данных</li>
                    <li><strong>Форматеры:</strong> преобразование данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">По способу выполнения</h3>
                  <ul class="pl-4">
                    <li><strong>Синхронные:</strong> обычные функции</li>
                    <li><strong>Асинхронные:</strong> async/await, Promise</li>
                    <li><strong>Генераторы:</strong> yield, итераторы</li>
                    <li><strong>Рекурсивные:</strong> вызывают сами себя</li>
                    <li><strong>IIFE:</strong> выполняются сразу</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Функциональные паттерны</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Функции высшего порядка</h3>
                  <ul class="pl-4">
                    <li>Принимают функции как аргументы</li>
                    <li>Возвращают функции</li>
                    <li>map, filter, reduce</li>
                    <li>Декораторы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Функциональная композиция</h3>
                  <ul class="pl-4">
                    <li>Pipe и compose</li>
                    <li>Цепочки функций</li>
                    <li>Монады</li>
                    <li>Функторы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Оптимизация</h3>
                  <ul class="pl-4">
                    <li>Мемоизация</li>
                    <li>Throttling/Debouncing</li>
                    <li>Ленивые вычисления</li>
                    <li>Once функции</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы для собеседования</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Function Declaration и Function Expression?</p>
                <p class="font-weight-regular ma-0">
                  Function Declaration поднимается (hoisting), можно вызывать до объявления.
                  Function Expression не поднимается, создается только при выполнении кода.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать стрелочные функции, а когда обычные?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные — для коротких функций, callback'ов, когда нужен лексический this.
                  Обычные — для методов объектов, конструкторов, когда нужен динамический this.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое замыкание и как создать приватные переменные?</p>
                <p class="font-weight-regular ma-0">
                  Замыкание — функция + лексическое окружение. Внутренняя функция имеет доступ
                  к переменным внешней функции даже после её завершения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между call, apply и bind?</p>
                <p class="font-weight-regular ma-0">
                  call/apply сразу вызывают функцию с заданным this. call принимает аргументы по отдельности,
                  apply — массивом. bind создает новую функцию с привязанным this.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое каррирование и частичное применение?</p>
                <p class="font-weight-regular ma-0">
                  Каррирование — преобразование функции от многих аргументов в последовательность функций
                  от одного аргумента. Частичное применение — фиксация части аргументов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают генераторы и для чего они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Генераторы приостанавливают выполнение функции (yield) и могут возобновлять его.
                  Используются для итераторов, ленивых вычислений, управления асинхронным кодом.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">В React/Vue</h3>
                  <ul class="pl-4">
                    <li>Обработчики событий</li>
                    <li>Lifecycle методы</li>
                    <li>Custom hooks/composables</li>
                    <li>Render функции</li>
                    <li>Вычисляемые свойства</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">В Node.js</h3>
                  <ul class="pl-4">
                    <li>Middleware функции</li>
                    <li>Route handlers</li>
                    <li>Stream обработчики</li>
                    <li>Утилиты для работы с данными</li>
                    <li>API контроллеры</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать чистые функции</li>
                    <li>Избегать глубокой вложенности</li>
                    <li>Применять деструктуризацию</li>
                    <li>Использовать осмысленные имена</li>
                    <li>Проверять типы аргументов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Функции с побочными эффектами</li>
                    <li>Слишком длинные функции</li>
                    <li>Избыточное использование eval</li>
                    <li>Неконтролируемые замыкания</li>
                    <li>Игнорирование контекста this</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Производительность рекурсии</li>
                    <li>Утечки памяти в замыканиях</li>
                    <li>this в стрелочных функциях</li>
                    <li>Hoisting особенности</li>
                    <li>Async/await ошибки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              JavaScript предоставляет богатый набор функций: встроенные глобальные функции и методы объектов
              для повседневных задач, различные способы создания пользовательских функций (declaration, expression, arrow),
              специализированные функции (генераторы, async, конструкторы) и функциональные паттерны (HOF, замыкания, каррирование).
              Понимание всех типов функций и их особенностей критично для эффективной разработки на JavaScript.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions"
                target="_blank">
                MDN Functions Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
