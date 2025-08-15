<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const functionHoistingSnippet = `
// ✅ РАБОТАЕТ - function declaration всплывает полностью
console.log(sayHello()); // "Hello!"

function sayHello() {
  return "Hello!";
}

// ❌ НЕ РАБОТАЕТ - function expression не всплывает
console.log(sayBye()); // TypeError: sayBye is not a function

var sayBye = function() {
  return "Bye!";
};
`

const varHoistingSnippet = `
// Код, который мы пишем:
console.log(x); // undefined (не ReferenceError!)
var x = 5;
console.log(x); // 5

// Как это интерпретирует движок:
var x; // объявление всплывает наверх
console.log(x); // undefined
x = 5; // присваивание остается на месте
console.log(x); // 5

// Сложный пример:
console.log(a); // undefined
console.log(b); // undefined
console.log(c); // ReferenceError: c is not defined

var a = 1;
var b = function() { return 2; };
// c не объявлена
`

const letConstHoistingSnippet = `
// let и const НЕ всплывают (технически всплывают, но в TDZ)
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
const y = 10;

// Temporal Dead Zone (TDZ)
function example() {
  console.log(a); // undefined (var)
  console.log(b); // ReferenceError (let в TDZ)

  var a = 1;
  let b = 2;
}

// Блочная область видимости
{
  console.log(z); // ReferenceError
  let z = 3;
}
`

const classHoistingSnippet = `
// ❌ НЕ РАБОТАЕТ - class declaration не всплывает
const obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {
  constructor() {
    this.name = "Test";
  }
}

// ❌ НЕ РАБОТАЕТ - class expression тоже не всплывает
const obj2 = new MyClassExpression(); // ReferenceError

const MyClassExpression = class {
  constructor() {
    this.name = "Test";
  }
};
`

const practicalExampleSnippet = `
// Практический пример: частые ошибки

// 1. Проблема с циклами и var
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3 (не 0, 1, 2!)
  }, 100);
}

// Решение с let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 100);
}

// 2. Проблема с условным объявлением
if (false) {
  var x = 1; // все равно всплывает!
}
console.log(x); // undefined (не ReferenceError)

if (false) {
  let y = 1; // не всплывает
}
console.log(y); // ReferenceError: y is not defined
`

const interviewExamplesSnippet = `
// Типичные вопросы на собеседовании

// Вопрос 1: Что выведет?
var a = 1;
function test() {
  console.log(a); // undefined (не 1!)
  var a = 2;
  console.log(a); // 2
}
test();

// Объяснение: локальный var a всплывает наверх функции

// Вопрос 2: Что выведет?
function foo() {
  console.log(bar); // function bar() {...}
  console.log(baz); // undefined

  function bar() {
    return "I'm bar";
  }

  var baz = function() {
    return "I'm baz";
  };
}
foo();

// Вопрос 3: Что выведет?
console.log(typeof foo); // "function"
console.log(typeof bar); // "undefined"

function foo() {}
var bar = function() {};
`

const scopingExampleSnippet = `
// Как hoisting взаимодействует с областями видимости

// Глобальная область
var globalVar = "global";

function outerFunction() {
  console.log(globalVar); // undefined (локальный var всплывает!)
  console.log(localVar);  // undefined

  if (true) {
    var localVar = "local";
    var globalVar = "shadowed"; // затеняет глобальную
  }

  console.log(localVar);  // "local"
  console.log(globalVar); // "shadowed"
}

outerFunction();
console.log(globalVar); // "global" (не изменилась)

// С let/const:
function modernFunction() {
  console.log(modernVar); // ReferenceError

  if (true) {
    let modernVar = "modern";
    console.log(modernVar); // "modern"
  }

  console.log(modernVar); // ReferenceError
}
`

const bestPracticesSnippet = `
// Лучшие практики для избежания проблем с hoisting

// ✅ Хорошо: используйте let/const
function goodExample() {
  // Объявляйте переменные в начале области видимости
  let userName = "";
  let isActive = false;
  const MAX_USERS = 100;

  // Функции можно объявлять где угодно (function declaration)
  function processUser(user) {
    return user.name.toUpperCase();
  }

  // Остальной код...
}

// ❌ Плохо: var может привести к неожиданному поведению
function badExample() {
  console.log(userName); // undefined

  if (condition) {
    var userName = "John"; // всплывает наверх функции
  }

  for (var i = 0; i < 5; i++) {
    // i доступна за пределами цикла
  }
  console.log(i); // 5
}

// ✅ Современный подход: блочная область видимости
function modernExample() {
  if (condition) {
    let userName = "John"; // только внутри блока
    const userId = 123;   // только внутри блока
  }

  for (let i = 0; i < 5; i++) {
    // i доступна только внутри цикла
  }
  // console.log(i); // ReferenceError
}
`

const highlightedFunctionHoisting = ref('')
const highlightedVarHoisting = ref('')
const highlightedLetConstHoisting = ref('')
const highlightedClassHoisting = ref('')
const highlightedPracticalExample = ref('')
const highlightedInterviewExamples = ref('')
const highlightedScopingExample = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedFunctionHoisting.value = Prism.highlight(functionHoistingSnippet, Prism.languages.javascript, 'javascript')
  highlightedVarHoisting.value = Prism.highlight(varHoistingSnippet, Prism.languages.javascript, 'javascript')
  highlightedLetConstHoisting.value = Prism.highlight(letConstHoistingSnippet, Prism.languages.javascript, 'javascript')
  highlightedClassHoisting.value = Prism.highlight(classHoistingSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExample.value = Prism.highlight(practicalExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedInterviewExamples.value = Prism.highlight(interviewExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedScopingExample.value = Prism.highlight(scopingExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedBestPractices.value = Prism.highlight(bestPracticesSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript Hoisting: что всплывает и как это работает
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Hoisting (всплытие)</b> — это механизм JavaScript, при котором объявления переменных и функций
              "поднимаются" в начало их области видимости во время компиляции.
              Важно понимать: всплывают только <b>объявления</b>, но не <b>инициализации</b>!
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что всплывает в JavaScript?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-arrow-up-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-success">✅ Всплывает</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>var</strong> объявления (с undefined)</li>
                    <li><strong>function</strong> declarations (полностью)</li>
                    <li><strong>let/const</strong> (но в TDZ)</li>
                    <li><strong>class</strong> declarations (но в TDZ)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-arrow-down-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-error">❌ Не всплывает</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Инициализации</strong> переменных</li>
                    <li><strong>Function expressions</strong></li>
                    <li><strong>Arrow functions</strong></li>
                    <li><strong>Class expressions</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Function Declaration vs Function Expression</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевое отличие:</strong> Function declarations всплывают полностью и доступны во всей области видимости,
              function expressions ведут себя как обычные переменные.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFunctionHoisting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. var - всплывает с undefined</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Особенность var:</strong> Объявление всплывает, но инициализация остается на месте.
              До инициализации переменная имеет значение undefined.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVarHoisting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. let и const - Temporal Dead Zone (TDZ)</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-clock-alert</v-icon>
              <strong>TDZ (Temporal Dead Zone):</strong> let и const технически всплывают, но находятся в "мертвой зоне"
              до момента объявления. Обращение к ним вызывает ReferenceError.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLetConstHoisting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Class Declaration - тоже в TDZ</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-school</v-icon>
              <strong>Классы:</strong> И class declarations, и class expressions не доступны до их объявления
              из-за TDZ, в отличие от function declarations.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedClassHoisting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Этапы выполнения кода JavaScript</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Compilation" value="1" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-cogs</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Hoisting" value="2" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-arrow-up</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Execution" value="3" color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-play</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3>1. Фаза компиляции</h3>
                    <p>JavaScript движок сканирует код и находит все объявления переменных и функций</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3>2. Hoisting</h3>
                    <p>Объявления "поднимаются" наверх их области видимости, создаются в памяти</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3>3. Выполнение</h3>
                    <p>Код выполняется построчно, происходят присваивания и вызовы функций</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры: частые ловушки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры с собеседований</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterviewExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Взаимодействие с областями видимости</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedScopingExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое hoisting в JavaScript?</p>
                <p class="font-weight-regular ma-0">
                  Механизм, при котором объявления переменных и функций поднимаются в начало их области видимости
                  во время компиляции. Важно: всплывают объявления, не инициализации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается hoisting для var, let и const?</p>
                <p class="font-weight-regular ma-0">
                  var всплывает и инициализируется как undefined. let/const всплывают, но остаются в TDZ
                  (Temporal Dead Zone) до момента объявления, обращение к ним вызывает ReferenceError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Temporal Dead Zone (TDZ)?</p>
                <p class="font-weight-regular ma-0">
                  Время между началом области видимости и моментом объявления let/const переменной,
                  когда переменная существует, но недоступна для использования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Всплывают ли function expressions и arrow functions?</p>
                <p class="font-weight-regular ma-0">
                  Нет, они ведут себя как обычные переменные. Всплывает только объявление переменной (с undefined),
                  но не функция. Function declarations всплывают полностью.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как hoisting работает с классами?</p>
                <p class="font-weight-regular ma-0">
                  Class declarations технически всплывают, но находятся в TDZ, как let/const.
                  Использование до объявления вызывает ReferenceError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему важно понимать hoisting?</p>
                <p class="font-weight-regular ma-0">
                  Помогает избежать багов, понимать порядок выполнения кода, объясняет поведение var в циклах,
                  и критично для понимания работы JavaScript движка.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Всплывает?</th>
                <th class="text-left font-weight-bold">Инициализация</th>
                <th class="text-left font-weight-bold">TDZ</th>
                <th class="text-left font-weight-bold">До объявления</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>var</code></td>
                <td class="text-success">✅ Да</td>
                <td>undefined</td>
                <td class="text-success">❌ Нет</td>
                <td>undefined</td>
              </tr>
              <tr>
                <td><code>let</code></td>
                <td class="text-warning">⚠️ Да (в TDZ)</td>
                <td>не инициализируется</td>
                <td class="text-error">✅ Да</td>
                <td>ReferenceError</td>
              </tr>
              <tr>
                <td><code>const</code></td>
                <td class="text-warning">⚠️ Да (в TDZ)</td>
                <td>не инициализируется</td>
                <td class="text-error">✅ Да</td>
                <td>ReferenceError</td>
              </tr>
              <tr>
                <td><code>function</code> declaration</td>
                <td class="text-success">✅ Да</td>
                <td>полностью</td>
                <td class="text-success">❌ Нет</td>
                <td>работает</td>
              </tr>
              <tr>
                <td><code>function</code> expression</td>
                <td class="text-warning">⚠️ Как var</td>
                <td>undefined</td>
                <td class="text-success">❌ Нет</td>
                <td>TypeError</td>
              </tr>
              <tr>
                <td><code>class</code> declaration</td>
                <td class="text-warning">⚠️ Да (в TDZ)</td>
                <td>не инициализируется</td>
                <td class="text-error">✅ Да</td>
                <td>ReferenceError</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации для современного JavaScript</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Используйте</h3>
                  <ul class="text-left pl-4">
                    <li>const для констант</li>
                    <li>let для переменных</li>
                    <li>function declarations</li>
                    <li>Объявления в начале области</li>
                    <li>ESLint правила</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегайте</h3>
                  <ul class="text-left pl-4">
                    <li>var (legacy код)</li>
                    <li>Использование до объявления</li>
                    <li>Полагание на hoisting</li>
                    <li>Объявления в середине блоков</li>
                    <li>Сложные области видимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Настройте strict mode</li>
                    <li>Используйте линтеры</li>
                    <li>Изучите TDZ</li>
                    <li>Практикуйтесь на примерах</li>
                    <li>Читайте чужой код</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Hoisting</b> — фундаментальный механизм JavaScript, который влияет на поведение переменных и функций.
              <b>var</b> и <b>function declarations</b> всплывают и доступны сразу, <b>let/const/class</b> всплывают, но остаются в TDZ.
              Понимание hoisting критично для написания предсказуемого кода и прохождения технических собеседований.
              Современная практика: используйте <b>let/const</b> вместо <b>var</b> и объявляйте переменные в начале области видимости.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
                target="_blank"
                class="mr-2">
                MDN Hoisting
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz"
                target="_blank">
                TDZ Reference
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
