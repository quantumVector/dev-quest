<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// 1. Function Declaration (Объявление функции)
function greet(name) {
  return "Привет, " + name + "!";
}

// Особенности:
// - Поднимается (hoisting)
// - Можно вызвать до объявления
console.log(sayHello("Мир")); // Работает!

function sayHello(name) {
  return "Hello, " + name;
}

// 2. Function Expression (Функциональное выражение)
const greetExpression = function(name) {
  return "Привет, " + name + "!";
};

// Особенности:
// - НЕ поднимается
// - Можно вызвать только после объявления
// console.log(laterFunction("test")); // ReferenceError!
const laterFunction = function(x) {
  return x * 2;
};

// 3. Arrow Functions (Стрелочные функции)
const greetArrow = (name) => {
  return "Привет, " + name + "!";
};

// Краткая запись для одного выражения
const greetShort = name => "Привет, " + name + "!";
const multiply = (a, b) => a * b;
const square = x => x * x;

// 4. Anonymous Functions (Анонимные функции)
setTimeout(function() {
  console.log("Анонимная функция");
}, 1000);

// Стрелочная анонимная
setTimeout(() => {
  console.log("Анонимная стрелочная");
}, 1000);

// 5. IIFE (Immediately Invoked Function Expression)
(function() {
  console.log("IIFE выполнилась сразу");
})();

// Со стрелочной функцией
(() => {
  console.log("Стрелочная IIFE");
})();

// 6. Named Function Expression
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
`

const snippet2 = `
// Параметры по умолчанию (ES6)
function greet(name = "Друг", greeting = "Привет") {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet()); // "Привет, Друг!"
console.log(greet("Анна")); // "Привет, Анна!"
console.log(greet("Боб", "Здравствуй")); // "Здравствуй, Боб!"

// Rest параметры (остаточные параметры)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

function introduce(name, age, ...hobbies) {
  console.log(\`Меня зовут \${name}, мне \${age} лет\`);
  console.log("Мои хобби:", hobbies.join(", "));
}

introduce("Анна", 25, "чтение", "плавание", "кулинария");

// Деструктуризация параметров
function createUser({name, age, email = "не указан"}) {
  return {
    name,
    age,
    email,
    created: new Date()
  };
}

const user = createUser({
  name: "Иван",
  age: 30
});

// Деструктуризация массивов в параметрах
function processCoordinates([x, y, z = 0]) {
  return {x, y, z};
}

console.log(processCoordinates([10, 20])); // {x: 10, y: 20, z: 0}
`

const snippet3 = `
// Замыкания (Closures)
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (независимый счетчик)

// Практический пример: приватные переменные
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Недостаточно средств";
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(200)); // 1300
// console.log(account.balance); // undefined - приватная переменная

// Замыкание с модулем
const calculator = (function() {
  let result = 0;

  return {
    add: (x) => result += x,
    subtract: (x) => result -= x,
    multiply: (x) => result *= x,
    divide: (x) => result /= x,
    clear: () => result = 0,
    getResult: () => result
  };
})();

calculator.add(10);
calculator.multiply(2);
console.log(calculator.getResult()); // 20
`

const snippet4 = `
// Контекст выполнения и this

// 1. В обычных функциях this зависит от способа вызова
const person = {
  name: "Анна",
  greet: function() {
    console.log(\`Привет, я \${this.name}\`);
  },

  greetArrow: () => {
    // Стрелочная функция наследует this из окружающего контекста
    console.log(\`Привет, я \${this.name}\`); // undefined в строгом режиме
  }
};

person.greet(); // "Привет, я Анна"
person.greetArrow(); // "Привет, я undefined"

// 2. call, apply, bind
function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, я \${this.name}\${punctuation}\`);
}

const user = { name: "Иван" };

// call - передаем аргументы отдельно
introduce.call(user, "Привет", "!");

// apply - передаем аргументы массивом
introduce.apply(user, ["Здравствуй", "."]);

// bind - создает новую функцию с привязанным this
const boundIntroduce = introduce.bind(user);
boundIntroduce("Добро пожаловать", "!!!");

// 3. this в стрелочных функциях
const obj = {
  name: "Объект",

  regularMethod: function() {
    console.log("Regular:", this.name);

    // Вложенная обычная функция теряет контекст
    setTimeout(function() {
      console.log("Nested regular:", this.name); // undefined
    }, 100);

    // Стрелочная функция сохраняет контекст
    setTimeout(() => {
      console.log("Nested arrow:", this.name); // "Объект"
    }, 200);
  }
};

// 4. this в классах
class MyClass {
  constructor(name) {
    this.name = name;
  }

  regularMethod() {
    return \`Regular: \${this.name}\`;
  }

  arrowMethod = () => {
    return \`Arrow: \${this.name}\`;
  }
}

const instance = new MyClass("Тест");
const detached = instance.regularMethod;
const detachedArrow = instance.arrowMethod;

// console.log(detached()); // Error: this is undefined
console.log(detachedArrow()); // "Arrow: Тест"
`

const snippet5 = `
// Функции высшего порядка (Higher-Order Functions)

// Функция, которая принимает другую функцию как параметр
function processArray(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Функция, которая возвращает другую функцию
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Композиция функций
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;

const addThenMultiply = (x, y, z) => multiply(z)(add(x)(y));
console.log(addThenMultiply(2, 3, 4)); // (2 + 3) * 4 = 20

// Функция compose
function compose(...functions) {
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const transform = compose(square, multiplyByTwo, addOne);
console.log(transform(3)); // ((3 + 1) * 2)² = 64

// Практические примеры высших порядков
const users = [
  { name: "Анна", age: 25, active: true },
  { name: "Боб", age: 30, active: false },
  { name: "Карл", age: 35, active: true }
];

// Цепочка функций высшего порядка
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort();

console.log(activeUserNames); // ["Анна", "Карл"]

// Кастомная функция map
Array.prototype.customMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
`

const snippet6 = `
// Рекурсия

// Классический пример: факториал
function factorial(n) {
  // Базовый случай
  if (n <= 1) {
    return 1;
  }
  // Рекурсивный случай
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120

// Числа Фибоначчи
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Оптимизированная версия с мемоизацией
function fibonacciMemo() {
  const cache = {};

  return function fib(n) {
    if (n in cache) {
      return cache[n];
    }

    if (n <= 1) {
      return n;
    }

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fastFib = fibonacciMemo();
console.log(fastFib(40)); // Быстро вычисляется

// Обход дерева объектов
function flattenObject(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? \`\${prefix}.\${key}\` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

const nested = {
  user: {
    name: "Анна",
    address: {
      city: "Москва",
      zip: "123456"
    }
  },
  active: true
};

console.log(flattenObject(nested));
// { 'user.name': 'Анна', 'user.address.city': 'Москва', 'user.address.zip': '123456', active: true }

// Поиск в глубину (DFS)
function deepSearch(obj, target) {
  if (obj === target) {
    return true;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (deepSearch(obj[key], target)) {
        return true;
      }
    }
  }

  return false;
}
`

const snippet7 = `
// Асинхронные функции и промисы

// Callback функции
function loadData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Данные" };
    callback(null, data);
  }, 1000);
}

loadData((error, data) => {
  if (error) {
    console.error("Ошибка:", error);
  } else {
    console.log("Данные:", data);
  }
});

// Promise-based функции
function loadDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        resolve({ id: 1, name: "Данные" });
      } else {
        reject(new Error("Не удалось загрузить данные"));
      }
    }, 1000);
  });
}

// Использование с .then()
loadDataPromise()
  .then(data => {
    console.log("Успех:", data);
    return data.id;
  })
  .then(id => {
    console.log("ID:", id);
  })
  .catch(error => {
    console.error("Ошибка:", error.message);
  });

// Async/Await функции
async function loadUserData(userId) {
  try {
    const user = await loadDataPromise();
    console.log("Пользователь загружен:", user);

    // Можно делать последовательные вызовы
    const profile = await loadDataPromise();
    console.log("Профиль загружен:", profile);

    return { user, profile };
  } catch (error) {
    console.error("Ошибка загрузки:", error.message);
    throw error;
  }
}

// Параллельные асинхронные операции
async function loadMultipleData() {
  try {
    const [user, posts, comments] = await Promise.all([
      loadDataPromise(),
      loadDataPromise(),
      loadDataPromise()
    ]);

    return { user, posts, comments };
  } catch (error) {
    console.error("Одна из операций завершилась ошибкой:", error);
  }
}

// Генератор функции для асинхронных итераций
async function* dataGenerator() {
  let page = 1;

  while (page <= 3) {
    const data = await loadDataPromise();
    yield { page, data };
    page++;
  }
}

// Использование генератора
async function processData() {
  for await (const item of dataGenerator()) {
    console.log(\`Страница \${item.page}:\`, item.data);
  }
}
`

const snippet8 = `
// Продвинутые концепции

// 1. Мемоизация
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Из кэша:", key);
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveOperation = memoize((n) => {
  console.log("Вычисляем для:", n);
  return n * n * n;
});

console.log(expensiveOperation(5)); // Вычисляем для: 5, результат: 125
console.log(expensiveOperation(5)); // Из кэша: [5], результат: 125

// 2. Throttle и Debounce
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

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Использование
const throttledScroll = throttle(() => {
  console.log("Scroll event throttled");
}, 100);

const debouncedSearch = debounce((query) => {
  console.log("Поиск:", query);
}, 300);

// 3. Partial Application (Частичное применение)
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const double = partial(multiply, 2);
const quadruple = partial(multiply, 2, 2);

console.log(double(3, 4)); // 2 * 3 * 4 = 24
console.log(quadruple(5)); // 2 * 2 * 5 = 20

// 4. Currying (Каррирование)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curriedMultiply = curry((a, b, c) => a * b * c);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24

// 5. Function Pipe
function pipe(...functions) {
  return function(value) {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

const processNumber = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
);

console.log(processNumber(5)); // ((5 + 1) * 2) - 3 = 9
`

const snippet9 = `
// Генераторы и итераторы

// Простой генератор
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3

// Генератор с бесконечной последовательностью
function* fibonacci() {
  let a = 0, b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibGen = fibonacci();
console.log(fibGen.next().value); // 0
console.log(fibGen.next().value); // 1
console.log(fibGen.next().value); // 1
console.log(fibGen.next().value); // 2

// Генератор для обхода дерева
function* traverseTree(node) {
  yield node.value;

  if (node.children) {
    for (const child of node.children) {
      yield* traverseTree(child);
    }
  }
}

const tree = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }] }
  ]
};

for (const value of traverseTree(tree)) {
  console.log(value); // 1, 2, 4, 5, 3, 6
}

// Кастомный итератор
function createRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

for (const num of createRange(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Генератор с обработкой входящих данных
function* interactive() {
  const x = yield "Введите первое число:";
  console.log("Получено:", x);

  const y = yield "Введите второе число:";
  console.log("Получено:", y);

  return x + y;
}

const interactiveGen = interactive();
console.log(interactiveGen.next().value); // "Введите первое число:"
console.log(interactiveGen.next(10).value); // "Введите второе число:"
console.log(interactiveGen.next(20).value); // 30
`

const snippet10 = `
// Распространенные ошибки и антипаттерны

// ❌ ПЛОХО: Изменение глобальной области видимости
var globalVar = "Я глобальная";

function badFunction() {
  // Создает глобальную переменную
  implicitGlobal = "Тоже глобальная!";

  // Изменяет глобальную переменную
  globalVar = "Изменена!";
}

// ✅ ХОРОШО: Использование модульности
const myModule = (function() {
  let privateVar = "Приватная";

  return {
    getPrivateVar() {
      return privateVar;
    },
    setPrivateVar(value) {
      privateVar = value;
    }
  };
})();

// ❌ ПЛОХО: Слишком много параметров
function createUser(name, age, email, phone, address, city, country, zipCode) {
  // Трудно запомнить порядок параметров
}

// ✅ ХОРОШО: Использование объекта параметров
function createUser({name, age, email, phone, address, city, country, zipCode}) {
  return { name, age, email, phone, address, city, country, zipCode };
}

// ❌ ПЛОХО: Функция делает слишком много
function processUserData(userData) {
  // Валидация
  if (!userData.email) throw new Error("Email required");

  // Форматирование
  userData.email = userData.email.toLowerCase();

  // Сохранение в базу
  database.save(userData);

  // Отправка email
  emailService.send(userData.email, "Welcome!");

  // Логирование
  console.log("User created:", userData.name);

  return userData;
}

// ✅ ХОРОШО: Разделение ответственности
function validateUserData(userData) {
  if (!userData.email) throw new Error("Email required");
  return userData;
}

function formatUserData(userData) {
  return {
    ...userData,
    email: userData.email.toLowerCase()
  };
}

function saveUser(userData) {
  return database.save(userData);
}

function sendWelcomeEmail(email) {
  return emailService.send(email, "Welcome!");
}

function processUser(userData) {
  const validated = validateUserData(userData);
  const formatted = formatUserData(validated);
  const saved = saveUser(formatted);

  sendWelcomeEmail(saved.email);
  console.log("User created:", saved.name);

  return saved;
}

// ❌ ПЛОХО: Побочные эффекты в функциях
let counter = 0;

function incrementAndLog(value) {
  counter++; // Побочный эффект!
  console.log(value); // Побочный эффект!
  return value + counter;
}

// ✅ ХОРОШО: Чистые функции
function increment(value, currentCounter) {
  return {
    result: value + currentCounter + 1,
    newCounter: currentCounter + 1
  };
}

function logValue(value) {
  console.log(value);
  return value; // Возвращаем для цепочки
}

// Использование
let state = { counter: 0 };
const { result, newCounter } = increment(5, state.counter);
state = { counter: newCounter };
logValue(result);
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')
const highlightedSnippet8 = ref('')
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Функции в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Функции</b> — это блоки кода, которые выполняют определенную задачу и могут быть
              вызваны многократно. Функции являются объектами первого класса в JavaScript, что означает,
              что их можно присваивать переменным, передавать как аргументы и возвращать из других функций.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Способы объявления функций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение способов объявления</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Способ</th>
                <th class="text-left font-weight-bold">Hoisting</th>
                <th class="text-left font-weight-bold">this</th>
                <th class="text-left font-weight-bold">arguments</th>
                <th class="text-left font-weight-bold">Конструктор</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Function Declaration</b></td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">✅ Динамический</td>
                <td class="pt-2 pb-2">✅ Есть</td>
                <td class="pt-2 pb-2">✅ Можно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Function Expression</b></td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">✅ Динамический</td>
                <td class="pt-2 pb-2">✅ Есть</td>
                <td class="pt-2 pb-2">✅ Можно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Arrow Functions</b></td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">❌ Лексический</td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">❌ Нельзя</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Параметры функций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Замыкания (Closures)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Контекст выполнения и this</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функции высшего порядка</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Рекурсия</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Асинхронные функции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые концепции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Генераторы и итераторы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ошибки и антипаттерны</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные концепции функций</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Чистые функции</h3>
                  <ul class="pl-4">
                    <li>Одинаковый результат для одинаковых входных данных</li>
                    <li>Без побочных эффектов</li>
                    <li>Предсказуемое поведение</li>
                    <li>Легче тестировать</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Область видимости</h3>
                  <ul class="pl-4">
                    <li>Глобальная область</li>
                    <li>Функциональная область</li>
                    <li>Блочная область (let/const)</li>
                    <li>Цепочка областей видимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="pl-4">
                    <li>Мемоизация</li>
                    <li>Throttling и Debouncing</li>
                    <li>Ленивые вычисления</li>
                    <li>Оптимизация хвостовой рекурсии</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы для собеседования</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Function Declaration и Function Expression?</p>
                <p class="font-weight-regular ma-0">
                  Function Declaration поднимается (hoisting) и может быть вызвана до объявления.
                  Function Expression не поднимается и создается только при выполнении кода.
                  Function Declaration создает именованную функцию в области видимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните, что такое замыкание и приведите примеры использования.</p>
                <p class="font-weight-regular ma-0">
                  Замыкание — это функция, которая имеет доступ к переменным из внешней области видимости даже после завершения выполнения внешней функции.
                  Используется для создания приватных переменных, модулей, декораторов, каррирования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает this в различных контекстах?</p>
                <p class="font-weight-regular ma-0">
                  В обычных функциях this определяется способом вызова. В стрелочных функциях this наследуется от окружающего контекста.
                  В методах объекта this указывает на объект. В конструкторах this указывает на создаваемый экземпляр.
                  call, apply, bind позволяют явно установить значение this.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое функции высшего порядка?</p>
                <p class="font-weight-regular ma-0">
                  Функции высшего порядка — это функции, которые принимают другие функции в качестве аргументов или возвращают функции.
                  Примеры: map, filter, reduce, forEach. Позволяют создавать более абстрактный и переиспользуемый код.
                  Основа функционального программирования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем отличие между call, apply и bind?</p>
                <p class="font-weight-regular ma-0">
                  call вызывает функцию с заданным this и аргументами по отдельности.
                  apply вызывает функцию с заданным this и массивом аргументов.
                  bind создает новую функцию с привязанным this, но не вызывает ее сразу.
                  Все методы позволяют явно управлять контекстом выполнения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните разницу между стрелочными и обычными функциями.</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции имеют лексический this, не имеют своего arguments, не могут быть конструкторами,
                  не поднимаются, имеют более краткий синтаксис. Обычные функции имеют динамический this,
                  свой объект arguments, могут использоваться как конструкторы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое каррирование (currying)?</p>
                <p class="font-weight-regular ma-0">
                  Каррирование — это преобразование функции с множественными аргументами в последовательность функций,
                  каждая из которых принимает один аргумент. Позволяет создавать специализированные функции,
                  упрощает частичное применение и композицию функций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое мемоизация и когда ее использовать?</p>
                <p class="font-weight-regular ma-0">
                  Мемоизация — это техника кеширования результатов выполнения функций для избежания повторных вычислений.
                  Используется для оптимизации чистых функций с дорогими вычислениями.
                  Особенно эффективна для рекурсивных функций как fibonacci, факториал.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните разницу между throttling и debouncing.</p>
                <p class="font-weight-regular ma-0">
                  Throttling ограничивает частоту выполнения функции до определенного интервала.
                  Debouncing откладывает выполнение функции до тех пор, пока не пройдет определенное время без новых вызовов.
                  Throttling для scroll/resize событий, debouncing для поиска и валидации форм.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое IIFE и зачем она нужна?</p>
                <p class="font-weight-regular ma-0">
                  IIFE (Immediately Invoked Function Expression) — функция, которая выполняется сразу после объявления.
                  Используется для создания изолированной области видимости, инициализации модулей,
                  избежания загрязнения глобальной области видимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают генераторы в JavaScript?</p>
                <p class="font-weight-regular ma-0">
                  Генераторы — функции, которые можно приостанавливать и возобновлять с помощью yield.
                  Возвращают итератор, позволяющий получать значения по требованию.
                  Используются для создания итераторов, асинхронных операций, ленивых вычислений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое рекурсия и когда ее использовать?</p>
                <p class="font-weight-regular ma-0">
                  Рекурсия — функция, которая вызывает саму себя. Должна иметь базовый случай для остановки.
                  Используется для обработки древовидных структур, математических вычислений,
                  задач типа "разделяй и властвуй". Может привести к переполнению стека при больших глубинах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните async/await и их отношение к промисам.</p>
                <p class="font-weight-regular ma-0">
                  async/await — синтаксический сахар над промисами для более читаемого асинхронного кода.
                  async функция всегда возвращает промис. await приостанавливает выполнение до разрешения промиса.
                  Упрощает обработку ошибок с try/catch, избегает callback hell.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое чистые функции и почему они важны?</p>
                <p class="font-weight-regular ma-0">
                  Чистые функции возвращают одинаковый результат для одинаковых аргументов и не имеют побочных эффектов.
                  Легче тестировать, отлаживать и оптимизировать. Предсказуемое поведение, возможность мемоизации,
                  основа функционального программирования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как избежать создания слишком много глобальных переменных?</p>
                <p class="font-weight-regular ma-0">
                  Использование модульных паттернов (IIFE, CommonJS, ES6 modules), namespace объектов,
                  замыканий для создания приватной области видимости. Применение строгого режима (use strict),
                  линтеров для контроля глобальных переменных.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое композиция функций?</p>
                <p class="font-weight-regular ma-0">
                  Композиция — объединение простых функций для создания более сложной функции.
                  Результат одной функции становится аргументом другой. Способствует переиспользованию кода,
                  модульности и функциональному программированию. Pipe и compose — основные операторы композиции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните hoisting для функций.</p>
                <p class="font-weight-regular ma-0">
                  Function Declarations полностью поднимаются — можно вызывать до объявления.
                  Function Expressions поднимается только объявление переменной, но не присвоение функции.
                  let/const с функциями находятся в Temporal Dead Zone до инициализации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть способы обработки ошибок в функциях?</p>
                <p class="font-weight-regular ma-0">
                  try/catch для синхронного кода, .catch() для промисов, try/catch с async/await.
                  Throw для создания собственных ошибок. Finally для кода, который должен выполниться в любом случае.
                  Error boundary в React для обработки ошибок в компонентах.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Современные тенденции</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Функциональное программирование</h3>
                  <ul class="pl-4">
                    <li>Иммутабельность</li>
                    <li>Чистые функции</li>
                    <li>Композиция функций</li>
                    <li>Монады и функторы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Современный синтаксис</h3>
                  <ul class="pl-4">
                    <li>Optional chaining (?.)</li>
                    <li>Nullish coalescing (??)</li>
                    <li>Pipeline operator (|>)</li>
                    <li>Pattern matching</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Библиотеки и фреймворки</h3>
                  <ul class="pl-4">
                    <li>Lodash/FP</li>
                    <li>Ramda</li>
                    <li>RxJS</li>
                    <li>Functional utilities</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-6">
              Функции в JavaScript — это мощный инструмент для создания модульного, переиспользуемого и поддерживаемого кода.
              Понимание различных способов объявления, областей видимости, замыканий, контекста выполнения и продвинутых концепций
              как мемоизация, каррирование и композиция критически важно для разработки качественных приложений.
              Современный JavaScript предлагает множество возможностей для работы с функциями — от стрелочных функций до
              генераторов и async/await.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
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
