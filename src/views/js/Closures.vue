<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Простой пример замыкания
function outerFunction(x) {
  // Переменная во внешней функции
  let outerVariable = x;

  // Внутренняя функция имеет доступ к переменным внешней функции
  function innerFunction(y) {
    return outerVariable + y; // Использует outerVariable из внешней области
  }

  return innerFunction; // Возвращаем внутреннюю функцию
}

const myClosure = outerFunction(10); // outerFunction завершилась, но...
console.log(myClosure(5)); // 15 - innerFunction всё ещё помнит outerVariable!

// Что происходит:
// 1. outerFunction создает переменную outerVariable
// 2. innerFunction создается и "захватывает" ссылку на outerVariable
// 3. outerFunction возвращает innerFunction и завершается
// 4. innerFunction сохраняет доступ к outerVariable (это и есть замыкание)
`

const snippet2 = `
// Классический пример: счетчики
function createCounter() {
  let count = 0; // Приватная переменная

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 (независимый счетчик)

// count недоступна извне - инкапсуляция!
console.log(counter1.count); // undefined
`

const snippet3 = `
// Замыкания в циклах - частая ошибка
console.log("=== Проблема ===");
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("var i:", i); // Выведет 3, 3, 3 (не то что ожидалось!)
  }, 100);
}

console.log("=== Решение с let ===");
for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("let j:", j); // Выведет 0, 1, 2 (как ожидалось)
  }, 200);
}

console.log("=== Решение с замыканием ===");
for (var k = 0; k < 3; k++) {
  (function(index) {
    setTimeout(function() {
      console.log("closure index:", index); // Выведет 0, 1, 2
    }, 300);
  })(k);
}

console.log("=== Решение с bind ===");
for (var m = 0; m < 3; m++) {
  setTimeout(function(index) {
    console.log("bind index:", index); // Выведет 0, 1, 2
  }.bind(null, m), 400);
}
`

const snippet4 = `
// Модульный паттерн с замыканием
const Calculator = (function() {
  // Приватные переменные и методы
  let result = 0;
  let history = [];

  function log(operation, value) {
    history.push(\`\${operation}: \${value} = \${result}\`);
  }

  function validateNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Недопустимое число');
    }
  }

  // Публичные методы (замыкания)
  return {
    add: function(num) {
      validateNumber(num);
      result += num;
      log('ADD', num);
      return this; // Для цепочки вызовов
    },

    subtract: function(num) {
      validateNumber(num);
      result -= num;
      log('SUBTRACT', num);
      return this;
    },

    multiply: function(num) {
      validateNumber(num);
      result *= num;
      log('MULTIPLY', num);
      return this;
    },

    divide: function(num) {
      validateNumber(num);
      if (num === 0) throw new Error('Деление на ноль');
      result /= num;
      log('DIVIDE', num);
      return this;
    },

    getResult: function() {
      return result;
    },

    getHistory: function() {
      return history.slice(); // Возвращаем копию
    },

    clear: function() {
      result = 0;
      history = [];
      return this;
    }
  };
})();

// Использование
Calculator
  .add(10)
  .multiply(2)
  .subtract(5);

console.log(Calculator.getResult()); // 15
console.log(Calculator.getHistory()); // История операций

// result и history недоступны напрямую
console.log(Calculator.result); // undefined
`

const snippet5 = `
// Замыкания для создания функций-фабрик
function createValidator(pattern, message) {
  return function(value) {
    if (!pattern.test(value)) {
      return {
        valid: false,
        message: message
      };
    }
    return { valid: true };
  };
}

const emailValidator = createValidator(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'Некорректный email адрес'
);

const phoneValidator = createValidator(
  /^\+?[\d\s\-\(\)]{10,}$/,
  'Некорректный номер телефона'
);

console.log(emailValidator('test@mail.com')); // { valid: true }
console.log(emailValidator('invalid-email')); // { valid: false, message: '...' }

// Создание конфигурируемых функций
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(tenTimes(5)); // 50

// Каждая функция "помнит" свой factor
`

const snippet6 = `
// Мемоизация с замыканием
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Из кеша:', key);
      return cache.get(key);
    }

    console.log('Вычисляем:', key);
    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

// Дорогая функция для вычисления факториала
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const memoizedFactorial = memoize(factorial);

console.log(memoizedFactorial(5)); // Вычисляем: [5], результат: 120
console.log(memoizedFactorial(5)); // Из кеша: [5], результат: 120

// Мемоизация Fibonacci
const memoizedFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10)); // Эффективное вычисление
`

const snippet7 = `
// Практический пример: система событий с замыканиями
function createEventSystem() {
  const listeners = {};

  return {
    // Подписка на событие
    on: function(event, callback) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);

      // Возвращаем функцию для отписки (замыкание!)
      return function unsubscribe() {
        const index = listeners[event].indexOf(callback);
        if (index > -1) {
          listeners[event].splice(index, 1);
        }
      };
    },

    // Единоразовая подписка
    once: function(event, callback) {
      const unsubscribe = this.on(event, function(...args) {
        callback(...args);
        unsubscribe(); // Автоматическая отписка
      });
      return unsubscribe;
    },

    // Генерация события
    emit: function(event, ...args) {
      if (listeners[event]) {
        listeners[event].forEach(callback => callback(...args));
      }
    },

    // Получение количества слушателей (для отладки)
    getListenerCount: function(event) {
      return listeners[event] ? listeners[event].length : 0;
    }
  };
}

const events = createEventSystem();

// Использование
const unsubscribeLogin = events.on('user:login', function(user) {
  console.log('Пользователь вошел:', user.name);
});

const unsubscribeOnce = events.once('app:ready', function() {
  console.log('Приложение готово!');
});

events.emit('user:login', { name: 'Анна' });
events.emit('app:ready'); // Выполнится только один раз

// Отписка
unsubscribeLogin();

// listeners недоступен извне благодаря замыканию
console.log(events.listeners); // undefined
`

const snippet8 = `
// Частичное применение (partial application) с замыканием
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name, punctuation) {
  return \`\${greeting}, \${name}\${punctuation}\`;
}

const sayHello = partial(greet, 'Привет');
const sayHelloAnna = partial(greet, 'Привет', 'Анна');

console.log(sayHello('Иван', '!')); // "Привет, Иван!"
console.log(sayHelloAnna('.')); // "Привет, Анна."

// Каррирование с замыканием
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

const curriedSum = curry((a, b, c) => a + b + c);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// Композиция функций с замыканием
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
`

const snippet9 = `
// Распространенные ошибки с замыканиями

// ❌ Ошибка: все функции используют одну переменную
function createBrokenFunctions() {
  const functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return i; // Все функции будут возвращать 3!
    });
  }

  return functions;
}

const broken = createBrokenFunctions();
console.log(broken[0]()); // 3 (не 0!)
console.log(broken[1]()); // 3 (не 1!)

// ✅ Исправление: создаем отдельное замыкание для каждой итерации
function createCorrectFunctions() {
  const functions = [];

  for (let i = 0; i < 3; i++) { // let создает новую переменную в каждой итерации
    functions.push(function() {
      return i;
    });
  }

  return functions;
}

const correct = createCorrectFunctions();
console.log(correct[0]()); // 0
console.log(correct[1]()); // 1

// ✅ Альтернативное решение с IIFE
function createCorrectFunctionsIIFE() {
  const functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push((function(index) {
      return function() {
        return index;
      };
    })(i));
  }

  return functions;
}

// ❌ Память: избегайте избыточных замыканий
function createHeavyClosures(data) {
  const heavyData = new Array(1000000).fill(data); // Большой массив

  // Плохо: все функции держат ссылку на heavyData
  return {
    getLength: function() {
      return heavyData.length; // Весь массив остается в памяти
    },
    getFirst: function() {
      return heavyData[0]; // Весь массив остается в памяти
    }
  };
}

// ✅ Лучше: извлекаем только нужные данные
function createLightClosures(data) {
  const heavyData = new Array(1000000).fill(data);
  const length = heavyData.length;
  const first = heavyData[0];

  // heavyData может быть собран сборщиком мусора

  return {
    getLength: function() {
      return length; // Только число
    },
    getFirst: function() {
      return first; // Только первый элемент
    }
  };
}
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
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Замыкания (Closures) в JavaScript
            </h1>

            <div class="mb-6 pa-4 rounded-lg" style="background-color: #e3f2fd;">
              <h2 class="text-h6 font-weight-bold mb-2">Краткий ответ для собеседования:</h2>
              <p class="font-weight-regular mb-2">
                <strong>Замыкание</strong> — это функция, которая имеет доступ к переменным из своей внешней (лексической) области видимости
                даже после того, как внешняя функция завершила выполнение. Замыкание "захватывает" переменные и сохраняет к ним доступ.
              </p>
              <p class="font-weight-regular ma-0">
                <strong>Ключевые особенности:</strong> инкапсуляция данных, создание приватных переменных, сохранение состояния между вызовами,
                основа для модульного паттерна, каррирования и мемоизации.
              </p>
            </div>

            <h2 class="text-h5 font-weight-bold mb-3">Базовый пример замыкания</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практическое применение: счетчики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Замыкания в циклах</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Модульный паттерн</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функции-фабрики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Мемоизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Система событий</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функциональное программирование</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Распространенные ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые концепции замыканий</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Лексическая область</h3>
                  <ul class="pl-4">
                    <li>Доступ к переменным определяется местом объявления</li>
                    <li>Не зависит от места вызова функции</li>
                    <li>Цепочка областей видимости</li>
                    <li>Статическое связывание</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Жизненный цикл</h3>
                  <ul class="pl-4">
                    <li>Создается при объявлении функции</li>
                    <li>Захватывает переменные из внешней области</li>
                    <li>Сохраняется пока есть ссылки на функцию</li>
                    <li>Освобождается сборщиком мусора</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Применения</h3>
                  <ul class="pl-4">
                    <li>Инкапсуляция данных</li>
                    <li>Создание приватных переменных</li>
                    <li>Модульные паттерны</li>
                    <li>Функциональное программирование</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы для собеседования</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое замыкание? Приведите простой пример.</p>
                <p class="font-weight-regular ma-0">
                  Замыкание — это функция, которая имеет доступ к переменным из внешней области видимости
                  даже после завершения выполнения внешней функции. Пример: функция-счетчик, которая
                  сохраняет состояние между вызовами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как замыкания помогают создавать приватные переменные?</p>
                <p class="font-weight-regular ma-0">
                  Замыкания позволяют создавать переменные, недоступные извне, но доступные внутренним функциям.
                  Это обеспечивает инкапсуляцию и защиту данных от прямого доступа и изменения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем проблема с замыканиями в циклах? Как ее решить?</p>
                <p class="font-weight-regular ma-0">
                  При использовании var в цикле все функции захватывают одну переменную. Решения:
                  использовать let, создать IIFE для каждой итерации, или использовать bind
                  для привязки значения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое модульный паттерн и как он связан с замыканиями?</p>
                <p class="font-weight-regular ma-0">
                  Модульный паттерн использует IIFE и замыкания для создания приватной области видимости
                  и экспорта только публичных методов. Это позволяет создавать модули с инкапсулированным
                  состоянием и контролируемым API.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как замыкания влияют на производительность и память?</p>
                <p class="font-weight-regular ma-0">
                  Замыкания могут приводить к утечкам памяти, если захватывают большие объекты.
                  Переменные в замыкании не освобождаются сборщиком мусора пока существует
                  ссылка на функцию. Нужно избегать избыточных замыканий.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните разницу между лексической и динамической областью видимости.</p>
                <p class="font-weight-regular ma-0">
                  Лексическая область видимости определяется местом объявления переменной в коде
                  (где написана). Динамическая — местом вызова функции (где выполняется).
                  JavaScript использует лексическую область видимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое каррирование и как оно связано с замыканиями?</p>
                <p class="font-weight-regular ma-0">
                  Каррирование преобразует функцию с несколькими аргументами в цепочку функций
                  с одним аргументом. Каждая функция в цепочке использует замыкание для
                  сохранения ранее переданных аргументов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать мемоизацию с помощью замыканий?</p>
                <p class="font-weight-regular ma-0">
                  Мемоизация создает кеш внутри замыкания. Функция проверяет кеш перед вычислением
                  и сохраняет результат для последующих вызовов с теми же аргументами.
                  Замыкание обеспечивает приватность кеша.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем отличие между замыканием и обычной функцией?</p>
                <p class="font-weight-regular ma-0">
                  Обычная функция имеет доступ только к своим параметрам и глобальным переменным.
                  Замыкание дополнительно сохраняет доступ к переменным из внешней области
                  видимости, даже когда внешняя функция завершилась.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можете ли вы привести пример использования замыканий в реальных проектах?</p>
                <p class="font-weight-regular ma-0">
                  Event listeners, debounce/throttle функции, модули и библиотеки (jQuery, Lodash),
                  системы состояния (Redux), React hooks, валидаторы форм, конфигурируемые
                  компоненты и API клиенты.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как избежать утечек памяти при работе с замыканиями?</p>
                <p class="font-weight-regular ma-0">
                  Избегать захвата больших объектов, обнулять ссылки когда они не нужны,
                  использовать WeakMap для хранения данных, правильно очищать event listeners,
                  избегать циклических ссылок между замыканиями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с переменными в замыкании при изменении их значения?</p>
                <p class="font-weight-regular ma-0">
                  Замыкание сохраняет ссылку на переменную, а не ее значение. Если переменная
                  изменяется, все функции в замыкании видят новое значение. Для сохранения
                  конкретного значения нужно создать его копию.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как замыкания работают со стрелочными функциями?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции создают замыкания точно так же, как обычные функции.
                  Основное отличие в том, что стрелочные функции наследуют this из
                  лексического контекста, что также является формой замыкания.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Объясните, как работает цепочка областей видимости в замыканиях.</p>
                <p class="font-weight-regular ma-0">
                  JavaScript создает цепочку областей видимости, где каждая функция может обращаться
                  к переменным своей области, затем к внешней области, затем к глобальной.
                  Замыкание сохраняет всю эту цепочку доступной даже после завершения внешних функций.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Производительность</h3>
                  <ul class="pl-4">
                    <li>Избегайте создания функций в циклах</li>
                    <li>Не захватывайте большие объекты без необходимости</li>
                    <li>Очищайте ссылки когда они не нужны</li>
                    <li>Используйте WeakMap для кеширования</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🛡️ Безопасность</h3>
                  <ul class="pl-4">
                    <li>Валидируйте входные данные</li>
                    <li>Не полагайтесь только на замыкания для безопасности</li>
                    <li>Используйте Object.freeze() для константных данных</li>
                    <li>Избегайте eval() в замыканиях</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <div class="mb-6 pa-4 rounded-lg" style="background-color: #f3e5f5;">
              <h2 class="text-h6 font-weight-bold mb-2">💡 Резюме:</h2>
              <p class="font-weight-regular mb-2">
                Замыкания — это мощный механизм JavaScript, позволяющий создавать приватные переменные,
                модули, конфигурируемые функции и сложные паттерны программирования.
              </p>
              <p class="font-weight-regular ma-0">
                <strong>Ключевое правило:</strong> функция + ссылка на лексическое окружение = замыкание.
                Используйте их для инкапсуляции, но помните о влиянии на память и производительность.
              </p>
            </div>

            <div class="d-flex justify-space-between">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
                target="_blank">
                MDN: Closures
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="outlined"
                href="https://javascript.info/closure"
                target="_blank">
                JavaScript.info
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
