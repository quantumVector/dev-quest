<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicBindSnippet = `
// Базовый пример bind с контекстом
const person = {
  name: 'Alice',
  greet: function(greeting, punctuation) {
    return \`\${greeting}, \${this.name}\${punctuation}\`;
  }
};

// Привязка контекста
const greetAlice = person.greet.bind(person);
console.log(greetAlice('Hello', '!')); // "Hello, Alice!"

// Частичное применение - задаем первый аргумент
const sayHelloToAlice = person.greet.bind(person, 'Hello');
console.log(sayHelloToAlice('!')); // "Hello, Alice!"
console.log(sayHelloToAlice('?')); // "Hello, Alice?"

// Частичное применение - задаем оба аргумента
const defaultGreeting = person.greet.bind(person, 'Hi', '.');
console.log(defaultGreeting()); // "Hi, Alice."
`

const partialApplicationSnippet = `
// Функция для демонстрации частичного применения
function multiply(a, b, c) {
  return a * b * c;
}

// 1. Частичное применение первого аргумента
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 2 * 3 * 4 = 24

// 2. Частичное применение двух аргументов
const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 2 * 3 * 4 = 24

// 3. Полное применение всех аргументов
const multiply2x3x4 = multiply.bind(null, 2, 3, 4);
console.log(multiply2x3x4()); // 2 * 3 * 4 = 24

// 4. Создание специализированных функций
function createMultiplier(factor) {
  return multiply.bind(null, factor);
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5, 6)); // 2 * 5 * 6 = 60
console.log(triple(4, 7)); // 3 * 4 * 7 = 84
`

const defaultArgumentsSnippet = `
// СПОСОБ 1: Использование bind для дефолтных аргументов
function calculatePrice(basePrice, tax = 0.1, discount = 0) {
  return basePrice * (1 + tax) * (1 - discount);
}

// Создаем функцию с дефолтным налогом 20%
const calculateWithHighTax = calculatePrice.bind(null, undefined, 0.2);

// ❌ ПРОБЛЕМА: первый аргумент undefined
console.log(calculateWithHighTax(100)); // NaN, так как basePrice = undefined

// ✅ ПРАВИЛЬНЫЙ СПОСОБ: используем обертку
function createPriceCalculator(defaultTax = 0.1, defaultDiscount = 0) {
  return function(basePrice, tax = defaultTax, discount = defaultDiscount) {
    return basePrice * (1 + tax) * (1 - discount);
  };
}

const highTaxCalculator = createPriceCalculator(0.2, 0.05);
console.log(highTaxCalculator(100)); // 100 * 1.2 * 0.95 = 114

// СПОСОБ 2: Комбинирование bind с wrapper-функцией
function createCalculatorWithDefaults(tax, discount) {
  return function(basePrice) {
    return calculatePrice(basePrice, tax, discount);
  };
}

const standardCalculator = createCalculatorWithDefaults(0.15, 0.1);
console.log(standardCalculator(100)); // 100 * 1.15 * 0.9 = 103.5
`

const practicalExamplesSnippet = `
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ

// 1. Логирование с префиксом
function log(level, module, message) {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${level.toUpperCase()} [\${module}]: \${message}\`);
}

// Создаем специализированные логгеры
const errorLogger = log.bind(null, 'error');
const apiLogger = errorLogger.bind(null, 'API');

apiLogger('Failed to fetch user data');
// [2024-01-01T12:00:00.000Z] ERROR [API]: Failed to fetch user data

// 2. HTTP запросы с базовым URL
function makeRequest(method, baseUrl, endpoint, data) {
  return fetch(\`\${baseUrl}\${endpoint}\`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Создаем API-клиент для конкретного сервиса
const apiClient = makeRequest.bind(null, 'GET', 'https://api.example.com');
const postToApi = makeRequest.bind(null, 'POST', 'https://api.example.com');

// Использование
apiClient('/users/123'); // GET https://api.example.com/users/123
postToApi('/users', { name: 'John' }); // POST https://api.example.com/users

// 3. Валидация с предустановленными правилами
function validate(rules, required, value) {
  if (required && !value) {
    return { valid: false, error: 'Field is required' };
  }

  for (let rule of rules) {
    if (!rule(value)) {
      return { valid: false, error: 'Validation failed' };
    }
  }

  return { valid: true };
}

// Создаем валидаторы для email
const emailRules = [
  (val) => val && val.includes('@'),
  (val) => val && val.length > 5
];

const validateRequiredEmail = validate.bind(null, emailRules, true);
const validateOptionalEmail = validate.bind(null, emailRules, false);

console.log(validateRequiredEmail('user@example.com')); // { valid: true }
console.log(validateRequiredEmail('')); // { valid: false, error: 'Field is required' }
`

const advancedTechniquesSnippet = `
// ПРОДВИНУТЫЕ ТЕХНИКИ

// 1. Частичное применение справа (правостороннее)
function rightBind(fn, ...rightArgs) {
  return function(...leftArgs) {
    return fn.apply(this, [...leftArgs, ...rightArgs]);
  };
}

function divide(a, b, precision = 2) {
  return (a / b).toFixed(precision);
}

const divideWithPrecision3 = rightBind(divide, 3);
console.log(divideWithPrecision3(10, 3)); // "3.333"

// 2. Каррирование (currying)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

const add5 = curriedAdd(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 5 + 3 + 2 = 10

// 3. Мемоизация с bind
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function expensiveOperation(a, b) {
  console.log('Computing...');
  return a * b + Math.random(); // Имитируем сложные вычисления
}

const memoizedOp = memoize(expensiveOperation);
const boundMemoizedOp = memoizedOp.bind(null, 5); // Частично применяем первый аргумент

console.log(boundMemoizedOp(3)); // Computing... 15.xyz
console.log(boundMemoizedOp(3)); // Cache hit! 15.xyz
`

const comparisonSnippet = `
// СРАВНЕНИЕ ПОДХОДОВ К ДЕФОЛТНЫМ АРГУМЕНТАМ

// 1. ES6 дефолтные параметры (рекомендуется)
function greet(name = 'Guest', greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('Alice')); // "Hello, Alice!"
console.log(greet('Bob', 'Hi')); // "Hi, Bob!"

// 2. bind с частичным применением
const greetGuest = greet.bind(null, 'Guest');
console.log(greetGuest()); // "Hello, Guest!"
console.log(greetGuest('Hi')); // "Hi, Guest!"

// 3. Обертка для гибкости
function createGreeter(defaultName = 'Guest', defaultGreeting = 'Hello') {
  return function(name = defaultName, greeting = defaultGreeting) {
    return \`\${greeting}, \${name}!\`;
  };
}

const politeGreeter = createGreeter('Sir', 'Good day');
console.log(politeGreeter()); // "Good day, Sir!"
console.log(politeGreeter('Madam')); // "Good day, Madam!"

// 4. Конфигурационный объект (для множества параметров)
function processData(data, options = {}) {
  const config = {
    format: 'json',
    timeout: 5000,
    retries: 3,
    ...options
  };

  return \`Processing \${data} with \${JSON.stringify(config)}\`;
}

const quickProcess = processData.bind(null, undefined, { timeout: 1000 });
// ❌ Проблема: первый аргумент undefined

// ✅ Лучше использовать обертку:
function createProcessor(defaultOptions = {}) {
  return function(data, options = {}) {
    return processData(data, { ...defaultOptions, ...options });
  };
}

const fastProcessor = createProcessor({ timeout: 1000, retries: 1 });
console.log(fastProcessor('user-data'));
// Processing user-data with {"format":"json","timeout":1000,"retries":1}
`

const interviewQuestionsSnippet = `
// ТИПИЧНЫЕ ВОПРОСЫ НА СОБЕСЕДОВАНИИ

// Вопрос 1: В чем разница между call, apply и bind?
const obj = { value: 42 };

function getValue(multiplier) {
  return this.value * multiplier;
}

// call - вызывает сразу, аргументы отдельно
console.log(getValue.call(obj, 2)); // 84

// apply - вызывает сразу, аргументы массивом
console.log(getValue.apply(obj, [2])); // 84

// bind - возвращает новую функцию
const boundGetValue = getValue.bind(obj, 2);
console.log(boundGetValue()); // 84

// Вопрос 2: Что выведет этот код?
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined (в строгом режиме) или значение из глобального контекста

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42

// Вопрос 3: Создайте функцию, которая принимает функцию и возвращает ее версию с задержкой
function delay(fn, ms) {
  return function(...args) {
    return new Promise(resolve => {
      setTimeout(() => resolve(fn.apply(this, args)), ms);
    });
  };
}

function sayHello(name) {
  return \`Hello, \${name}!\`;
}

const delayedHello = delay(sayHello, 1000);
delayedHello('Alice').then(console.log); // "Hello, Alice!" через 1 секунду

// Можно комбинировать с bind для частичного применения
const delayedGreetAlice = delay(sayHello.bind(null, 'Alice'), 500);
delayedGreetAlice().then(console.log); // "Hello, Alice!" через 0.5 секунды
`

const highlightedBasicBind = ref('')
const highlightedPartialApplication = ref('')
const highlightedDefaultArguments = ref('')
const highlightedPracticalExamples = ref('')
const highlightedAdvancedTechniques = ref('')
const highlightedComparison = ref('')
const highlightedInterviewQuestions = ref('')

onMounted(() => {
  highlightedBasicBind.value = Prism.highlight(basicBindSnippet, Prism.languages.javascript, 'javascript')
  highlightedPartialApplication.value = Prism.highlight(partialApplicationSnippet, Prism.languages.javascript, 'javascript')
  highlightedDefaultArguments.value = Prism.highlight(defaultArgumentsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedAdvancedTechniques.value = Prism.highlight(advancedTechniquesSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedInterviewQuestions.value = Prism.highlight(interviewQuestionsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript: Частичное применение и bind()
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Частичное применение</b> (Partial Application) — это техника создания новой функции путем фиксации некоторых аргументов исходной функции.
              <b>func.bind(context, [arg1], [arg2], ...)</b> — основной способ частичного применения в JavaScript, который также позволяет привязать контекст выполнения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы bind() и частичное применение</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-link</v-icon>
                    <h3 class="text-h6 font-weight-bold">bind()</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Привязка контекста</strong> (this)</li>
                    <li><strong>Частичное применение</strong> аргументов</li>
                    <li><strong>Возвращает новую функцию</strong></li>
                    <li><strong>Не вызывает</strong> исходную функцию</li>
                    <li><strong>Создает замыкание</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-function</v-icon>
                    <h3 class="text-h6 font-weight-bold">Частичное применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Фиксирует</strong> часть аргументов</li>
                    <li><strong>Создает</strong> специализированные функции</li>
                    <li><strong>Упрощает</strong> повторные вызовы</li>
                    <li><strong>Улучшает</strong> читаемость кода</li>
                    <li><strong>Способствует</strong> переиспользованию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicBind"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры частичного применения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPartialApplication"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Дефолтные аргументы через bind</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Внимание:</strong> bind() не идеально подходит для создания дефолтных аргументов, так как фиксирует аргументы по позициям. Для гибкости лучше использовать обертки или ES6 дефолтные параметры.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDefaultArguments"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры применения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedTechniques"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый подход?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-link</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">bind()</h3>
                  <ul class="text-left pl-4">
                    <li>Привязка контекста this</li>
                    <li>Создание event handlers</li>
                    <li>Частичное применение первых аргументов</li>
                    <li>Создание специализированных версий функций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-code-braces</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">ES6 дефолты</h3>
                  <ul class="text-left pl-4">
                    <li>Простые дефолтные значения</li>
                    <li>Читаемость кода</li>
                    <li>Стандартный подход</li>
                    <li>Поддержка в современных браузерах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-wrench</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Обертки</h3>
                  <ul class="text-left pl-4">
                    <li>Сложная логика дефолтов</li>
                    <li>Конфигурационные объекты</li>
                    <li>Фабрики функций</li>
                    <li>Максимальная гибкость</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterviewQuestions"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между call, apply и bind?</p>
                <p class="font-weight-regular ma-0">
                  <strong>call</strong> и <strong>apply</strong> вызывают функцию немедленно (разница только в передаче аргументов: отдельно vs массивом),
                  а <strong>bind</strong> возвращает новую функцию с привязанным контекстом и/или аргументами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли "развязать" bind?</p>
                <p class="font-weight-regular ma-0">
                  Нет, bind создает новую функцию с привязанным контекстом. Повторный bind на уже привязанной функции не изменит первоначальную привязку.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет при использовании new с bind-функцией?</p>
                <p class="font-weight-regular ma-0">
                  При использовании new с bind-функцией, привязанный контекст игнорируется, но частично примененные аргументы сохраняются.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать функцию с дефолтными аргументами в середине?</p>
                <p class="font-weight-regular ma-0">
                  bind() фиксирует аргументы по позициям слева направо. Для гибкости лучше использовать обертки или конфигурационные объекты.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между частичным применением и каррированием?</p>
                <p class="font-weight-regular ma-0">
                  <strong>Частичное применение</strong> фиксирует некоторые аргументы и возвращает функцию, ожидающую остальные.
                  <strong>Каррирование</strong> превращает функцию от n аргументов в цепочку функций от одного аргумента.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть альтернативы bind() для частичного применения?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции, замыкания, библиотеки типа Lodash (_.partial), собственные реализации curry/partial функций.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать для привязки контекста</li>
                    <li>Создавать специализированные функции</li>
                    <li>Комбинировать с другими паттернами</li>
                    <li>Документировать частичное применение</li>
                    <li>Тестировать edge cases</li>
                    <li>Предпочитать ES6 дефолты для простых случаев</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Злоупотребления bind() для дефолтов</li>
                    <li>Сложных цепочек bind</li>
                    <li>bind() без необходимости</li>
                    <li>Потери читаемости кода</li>
                    <li>Игнорирования производительности</li>
                    <li>Смешивания подходов без системы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите альтернативы (currying, closures)</li>
                    <li>Используйте осмысленные имена функций</li>
                    <li>Учитывайте контекст и команду</li>
                    <li>Тестируйте различные сценарии</li>
                    <li>Мониторьте производительность</li>
                    <li>Изучайте функциональные библиотеки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>bind()</b> — мощный инструмент для частичного применения функций и привязки контекста.
              Хотя он не идеально подходит для всех сценариев дефолтных аргументов, понимание его работы критично для JavaScript разработчика.
              Комбинируйте bind() с другими техниками для создания гибких и читаемых решений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind"
                target="_blank"
                class="mr-2">
                MDN: Function.bind()
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://javascript.info/bind"
                target="_blank">
                JavaScript.info: Binding
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
