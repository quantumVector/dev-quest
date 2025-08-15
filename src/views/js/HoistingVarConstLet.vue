<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const varHoistingExample = `
// ========================================
// VAR HOISTING - Поднятие переменных
// ========================================

// Что видим мы:
console.log(myVar); // undefined (не ошибка!)
var myVar = 'Hello World';
console.log(myVar); // 'Hello World'

// Как это работает для движка JS:
var myVar; // undefined
console.log(myVar); // undefined
myVar = 'Hello World';
console.log(myVar); // 'Hello World'

// Пример с функцией
function example() {
    console.log(x); // undefined
    var x = 5;
    console.log(x); // 5
}

// Интерпретируется как:
function example() {
    var x; // undefined
    console.log(x); // undefined
    x = 5;
    console.log(x); // 5
}
`

const letConstHoistingExample = `
// ========================================
// LET/CONST HOISTING - Временная мертвая зона
// ========================================

// LET - ReferenceError
console.log(myLet); // ❌ ReferenceError: Cannot access 'myLet' before initialization
let myLet = 'Hello';

// CONST - ReferenceError
console.log(myConst); // ❌ ReferenceError: Cannot access 'myConst' before initialization
const myConst = 'World';

// Функция с let/const
function example() {
    console.log(y); // ❌ ReferenceError
    let y = 10;
}

// Temporal Dead Zone (TDZ)
function showTDZ() {
    // TDZ начинается здесь для переменной 'temp'
    console.log(temp); // ❌ ReferenceError
    let temp = 'test'; // TDZ заканчивается здесь
    console.log(temp); // ✅ 'test'
}
`

const functionHoistingExample = `
// ========================================
// FUNCTION HOISTING - Поднятие функций
// ========================================

// Function Declaration - поднимается полностью
sayHello(); // ✅ 'Hello!' - работает!

function sayHello() {
    console.log('Hello!');
}

// Function Expression с var - поднимается только объявление
sayBye(); // ❌ TypeError: sayBye is not a function

var sayBye = function() {
    console.log('Bye!');
};

// Function Expression с let/const
sayHi(); // ❌ ReferenceError: Cannot access 'sayHi' before initialization

const sayHi = function() {
    console.log('Hi!');
};

// Arrow Functions - ведут себя как переменные
myArrow(); // ❌ TypeError or ReferenceError

var myArrow = () => {
    console.log('Arrow!');
};
`

const practicalExamples = `
// ========================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ ДЛЯ СОБЕСЕДОВАНИЯ
// ========================================

// Пример 1: Цикл с var
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 3, 3, 3 (не 0, 1, 2!)
    }, 100);
}

// Решение с let
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log(j); // 0, 1, 2
    }, 100);
}

// Пример 2: Переопределение функций
console.log(typeof myFunc); // 'function'

var myFunc = 'not a function';
console.log(typeof myFunc); // 'string'

function myFunc() {
    return 'I am function';
}

// Интерпретируется как:
function myFunc() {
    return 'I am function';
}
var myFunc; // undefined (но function уже объявлена)
console.log(typeof myFunc); // 'function'
myFunc = 'not a function';
console.log(typeof myFunc); // 'string'

// Пример 3: Вложенные области видимости
function outer() {
    console.log(inner); // ❌ ReferenceError с let
    // console.log(inner); // undefined с var

    if (true) {
        let inner = 'let value';
        // var inner = 'var value';
    }
}
`

const interviewQuestions = `
// ========================================
// ВОПРОСЫ С СОБЕСЕДОВАНИЙ
// ========================================

// Вопрос 1: Что выведет этот код?
var a = 1;
function test() {
    console.log(a); // ???
    var a = 2;
    console.log(a); // ???
}
test();

// Ответ: undefined, 2
// Объяснение: var a внутри функции поднимается вверх

// Вопрос 2: В чем разница?
// Вариант A
if (true) {
    var x = 1;
}
console.log(x); // ???

// Вариант B
if (true) {
    let y = 1;
}
console.log(y); // ???

// Ответ A: 1 (var не имеет блочной области видимости)
// Ответ B: ReferenceError (let имеет блочную область)

// Вопрос 3: Temporal Dead Zone
let name = 'outer';
function example() {
    console.log(name); // ???
    let name = 'inner';
}
example();

// Ответ: ReferenceError
// let name поднимается, но находится в TDZ
`

const commonMistakes = `
// ========================================
// ЧАСТЫЕ ОШИБКИ И ЗАБЛУЖДЕНИЯ
// ========================================

// Ошибка 1: "let и const не поднимаются"
// НЕПРАВДА! Они поднимаются, но находятся в TDZ

// Ошибка 2: Путаница с typeof
console.log(typeof undeclaredVar); // 'undefined'
console.log(typeof letVar); // ❌ ReferenceError
let letVar = 5;

// Ошибка 3: Переопределение параметров
function confusing(x) {
    console.log(x); // undefined (не значение параметра!)
    var x = 'redefined';
    console.log(x); // 'redefined'
}
confusing('parameter');

// Правильная интерпретация:
function confusing(x) {
    var x; // параметр перезатирается var объявлением
    console.log(x); // undefined
    x = 'redefined';
    console.log(x); // 'redefined'
}

// Ошибка 4: Class hoisting
console.log(MyClass); // ❌ ReferenceError
class MyClass {}

// Classes ведут себя как let/const, не как function declarations
`

const bestPractices = `
// ========================================
// ЛУЧШИЕ ПРАКТИКИ
// ========================================

// 1. Избегайте var в современном JS
// ❌ Плохо
var name = 'John';
if (true) {
    var age = 30; // доступна за пределами блока
}

// ✅ Хорошо
let name = 'John';
if (true) {
    let age = 30; // блочная область видимости
}

// 2. Объявляйте переменные перед использованием
// ❌ Плохо
console.log(user); // undefined
var user = 'Alice';

// ✅ Хорошо
let user = 'Alice';
console.log(user); // 'Alice'

// 3. Используйте const по умолчанию
// ✅ Хорошо
const API_URL = 'https://api.example.com';
const users = []; // можно мутировать содержимое

// 4. Function declarations vs expressions
// ✅ Хорошо для utility функций
function utils() {
    return 'helper';
}

// ✅ Хорошо для условных функций
let handler;
if (condition) {
    handler = function() {
        // implementation
    };
}
`

const highlightedVar = ref('')
const highlightedLetConst = ref('')
const highlightedFunction = ref('')
const highlightedPractical = ref('')
const highlightedInterview = ref('')
const highlightedMistakes = ref('')
const highlightedBest = ref('')

onMounted(() => {
  highlightedVar.value = Prism.highlight(varHoistingExample, Prism.languages.javascript, 'javascript')
  highlightedLetConst.value = Prism.highlight(letConstHoistingExample, Prism.languages.javascript, 'javascript')
  highlightedFunction.value = Prism.highlight(functionHoistingExample, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExamples, Prism.languages.javascript, 'javascript')
  highlightedInterview.value = Prism.highlight(interviewQuestions, Prism.languages.javascript, 'javascript')
  highlightedMistakes.value = Prism.highlight(commonMistakes, Prism.languages.javascript, 'javascript')
  highlightedBest.value = Prism.highlight(bestPractices, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript Hoisting: var, let, const
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Hoisting</b> (поднятие) — это механизм JavaScript, при котором объявления переменных и функций
              "поднимаются" в начало их области видимости. Но поведение кардинально различается для
              <code>var</code>, <code>let</code> и <code>const</code>.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Краткий ответ на вопрос</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">var</h3>
                  <p class="text-body-2 mb-0">✅ <b>Можно обратиться</b><br>Возвращает <code>undefined</code></p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">let</h3>
                  <p class="text-body-2 mb-0">❌ <b>Нельзя обратиться</b><br><code>ReferenceError</code></p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">const</h3>
                  <p class="text-body-2 mb-0">❌ <b>Нельзя обратиться</b><br><code>ReferenceError</code></p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">var: Классическое поднятие</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>var поднятие:</strong> Объявление переменной поднимается в начало функции или глобальной области,
              инициализируется как <code>undefined</code>. Присваивание остается на месте.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVar"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">let и const: Temporal Dead Zone</h2>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Temporal Dead Zone:</strong> let и const тоже поднимаются, но находятся в "мертвой зоне"
              от начала блока до строки инициализации. Обращение к ним вызывает ReferenceError.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLetConst"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Поднятие функций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFunction"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение типов объявлений</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Поднятие</th>
                <th class="text-left font-weight-bold">Инициализация</th>
                <th class="text-left font-weight-bold">Доступ до объявления</th>
                <th class="text-left font-weight-bold">Область видимости</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-3 pb-3"><b>var</b></td>
                <td class="pt-3 pb-3">✅ Да</td>
                <td class="pt-3 pb-3">undefined</td>
                <td class="pt-3 pb-3">✅ undefined</td>
                <td class="pt-3 pb-3">Функциональная</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>let</b></td>
                <td class="pt-3 pb-3">✅ Да (TDZ)</td>
                <td class="pt-3 pb-3">Не инициализируется</td>
                <td class="pt-3 pb-3">❌ ReferenceError</td>
                <td class="pt-3 pb-3">Блочная</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>const</b></td>
                <td class="pt-3 pb-3">✅ Да (TDZ)</td>
                <td class="pt-3 pb-3">Не инициализируется</td>
                <td class="pt-3 pb-3">❌ ReferenceError</td>
                <td class="pt-3 pb-3">Блочная</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>function</b></td>
                <td class="pt-3 pb-3">✅ Полностью</td>
                <td class="pt-3 pb-3">Функция</td>
                <td class="pt-3 pb-3">✅ Вызов работает</td>
                <td class="pt-3 pb-3">Функциональная</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы с собеседований</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterview"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки и заблуждения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Визуализация процесса</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-center">Фаза компиляции</h3>
                  <div class="text-center mb-3">
                    <v-icon size="large" color="primary">mdi-cog</v-icon>
                  </div>
                  <ol class="pl-4">
                    <li>Сканирует код</li>
                    <li>Находит все объявления</li>
                    <li><code>var</code> → создает и инициализирует undefined</li>
                    <li><code>let/const</code> → создает, НЕ инициализирует</li>
                    <li><code>function</code> → создает и инициализирует функцией</li>
                  </ol>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-center">Фаза выполнения</h3>
                  <div class="text-center mb-3">
                    <v-icon size="large" color="success">mdi-play</v-icon>
                  </div>
                  <ol class="pl-4">
                    <li>Выполняет код построчно</li>
                    <li><code>var</code> → доступна (undefined)</li>
                    <li><code>let/const</code> → ReferenceError до инициализации</li>
                    <li><code>function</code> → полностью доступна</li>
                    <li>При достижении строки: присваивает значение</li>
                  </ol>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBest"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем принципиальная разница между hoisting у var и let/const?</p>
                <p class="font-weight-regular ma-0">
                  var поднимается с инициализацией undefined, поэтому доступен до объявления.
                  let/const поднимаются, но не инициализируются, находятся в Temporal Dead Zone до строки объявления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Temporal Dead Zone?</p>
                <p class="font-weight-regular ma-0">
                  Это период времени от начала блока (где объявлена let/const переменная) до строки с её инициализацией.
                  В этой зоне переменная существует, но обращение к ней вызывает ReferenceError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему function declaration поднимается полностью, а function expression - нет?</p>
                <p class="font-weight-regular ma-0">
                  Function declaration — это отдельная синтаксическая конструкция, которая полностью обрабатывается на этапе компиляции.
                  Function expression — это присваивание значения переменной, поэтому поведение зависит от типа переменной (var/let/const).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли обратиться к let переменной в том же блоке до её объявления?</p>
                <p class="font-weight-regular ma-0">
                  Нет, это вызовет ReferenceError. TDZ действует внутри блока от его начала до строки объявления,
                  независимо от вложенности или других конструкций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как hoisting влияет на производительность?</p>
                <p class="font-weight-regular ma-0">
                  Современные JS движки оптимизируют hoisting на этапе компиляции. var создает больше неопределенности для оптимизатора,
                  let/const позволяют лучше оптимизировать код благодаря четкой области видимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с hoisting в модулях ES6?</p>
                <p class="font-weight-regular ma-0">
                  В модулях ES6 import/export поднимаются на самый верх модуля. Переменные уровня модуля ведут себя так же,
                  но их область видимости ограничена модулем, а не глобальным объектом.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый тип</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">var</h3>
                  <p class="text-h7 font-weight-medium mb-2">Избегать в современном коде:</p>
                  <ul class="pl-4">
                    <li>Функциональная область видимости</li>
                    <li>Может создавать неожиданные баги</li>
                    <li>Поддержка legacy кода</li>
                    <li>Совместимость с IE</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-info">let</h3>
                  <p class="text-h7 font-weight-medium mb-2">Для изменяемых переменных:</p>
                  <ul class="pl-4">
                    <li>Блочная область видимости</li>
                    <li>Переменные циклов</li>
                    <li>Условные присваивания</li>
                    <li>Безопасность от hoisting багов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">const</h3>
                  <p class="text-h7 font-weight-medium mb-2">По умолчанию для всего:</p>
                  <ul class="pl-4">
                    <li>Константы и конфигурации</li>
                    <li>Объекты и массивы</li>
                    <li>Функции и классы</li>
                    <li>Максимальная безопасность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Hoisting</b> существует для всех типов объявлений, но работает по-разному. <code>var</code> поднимается с инициализацией undefined,
              поэтому доступна до объявления. <code>let</code> и <code>const</code> поднимаются, но находятся в Temporal Dead Zone,
              поэтому вызывают ReferenceError при обращении до инициализации. Понимание этих различий критично для написания
              предсказуемого и безопасного JavaScript кода.
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
                Temporal Dead Zone
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
