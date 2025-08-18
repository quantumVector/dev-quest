<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const globalContextSnippet = `
// Глобальный контекст (Global Execution Context)
console.log(this); // В браузере: Window, в Node.js: global

var globalVar = 'Глобальная переменная';
let globalLet = 'Глобальный let';

function globalFunction() {
    console.log(this); // В строгом режиме: undefined, иначе: Window/global
    return 'Глобальная функция';
}

// this в глобальном контексте
console.log(this.globalVar); // 'Глобальная переменная'
console.log(this.globalLet); // undefined (let не создает свойство объекта)
`

const functionContextSnippet = `
// Контекст функции (Function Execution Context)
function outerFunction(x) {
    var outerVar = 'Внешняя переменная';

    function innerFunction(y) {
        var innerVar = 'Внутренняя переменная';

        // Доступ к переменным всех уровней
        console.log(innerVar);  // 'Внутренняя переменная'
        console.log(outerVar);  // 'Внешняя переменная' (замыкание)
        console.log(x);         // параметр внешней функции
        console.log(y);         // собственный параметр

        return innerVar + ' + ' + outerVar;
    }

    return innerFunction;
}

const closure = outerFunction('параметр');
closure('аргумент'); // Функция сохраняет доступ к внешнему контексту
`

const thisContextSnippet = `
// Контекст this - самая частая тема на собеседованиях
const obj = {
    name: 'Объект',

    // Обычная функция
    regularMethod: function() {
        console.log(this.name); // 'Объект'

        // Проблема с вложенными функциями
        function innerFunction() {
            console.log(this.name); // undefined (this = undefined/Window)
        }
        innerFunction();

        // Решение 1: сохранение контекста
        const self = this;
        function innerWithSelf() {
            console.log(self.name); // 'Объект'
        }
        innerWithSelf();

        // Решение 2: bind
        function innerWithBind() {
            console.log(this.name); // 'Объект'
        }
        innerWithBind.bind(this)();
    },

    // Стрелочная функция
    arrowMethod: () => {
        console.log(this.name); // undefined (наследует this из внешнего контекста)
    },

    // Стрелочная внутри обычной
    mixedMethod: function() {
        console.log(this.name); // 'Объект'

        const arrowInside = () => {
            console.log(this.name); // 'Объект' (наследует от mixedMethod)
        };
        arrowInside();
    }
};
`

const executionStackSnippet = `
// Стек выполнения (Call Stack) и контексты
function first() {
    console.log('1. Начало first()');
    second();
    console.log('5. Конец first()');
}

function second() {
    console.log('2. Начало second()');
    third();
    console.log('4. Конец second()');
}

function third() {
    console.log('3. Выполнение third()');
}

first();

// Стек выполнения:
// 1. Global Execution Context
// 2. first() Execution Context
// 3. second() Execution Context
// 4. third() Execution Context
// Затем контексты удаляются в обратном порядке
`

const hoistingContextSnippet = `
// Поднятие (Hoisting) и контекст
console.log(hoistedVar); // undefined (не ошибка!)
console.log(hoistedFunc()); // 'Работает!' (функция поднялась)

// console.log(letVar); // ReferenceError: Cannot access before initialization
// console.log(constVar); // ReferenceError: Cannot access before initialization

var hoistedVar = 'Переменная';

function hoistedFunc() {
    return 'Работает!';
}

let letVar = 'Let переменная';
const constVar = 'Const переменная';

// Как видит JavaScript (упрощенно):
/*
var hoistedVar; // undefined
function hoistedFunc() { return 'Работает!'; }

console.log(hoistedVar); // undefined
console.log(hoistedFunc()); // 'Работает!'

hoistedVar = 'Переменная';
let letVar = 'Let переменная';
const constVar = 'Const переменная';
*/
`

const bindCallApplySnippet = `
// Управление контекстом: call, apply, bind
const person1 = { name: 'Алексей' };
const person2 = { name: 'Мария' };

function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation;
}

// call - вызывает сразу, аргументы по отдельности
console.log(greet.call(person1, 'Привет', '!')); // 'Привет, Алексей!'
console.log(greet.call(person2, 'Здравствуй', '.')); // 'Здравствуй, Мария.'

// apply - вызывает сразу, аргументы массивом
console.log(greet.apply(person1, ['Добро пожаловать', '!!!'])); // 'Добро пожаловать, Алексей!!!'

// bind - возвращает новую функцию с привязанным контекстом
const greetAlexey = greet.bind(person1);
console.log(greetAlexey('Хай', '~')); // 'Хай, Алексей~'

// Partial application с bind
const sayHelloTo = greet.bind(null, 'Привет'); // this будет undefined/Window
console.log(sayHelloTo.call(person2, '!')); // 'Привет, Мария!'
`

const asyncContextSnippet = `
// Контекст в асинхронном коде
const obj = {
    name: 'Асинхронный объект',

    // Проблема с setTimeout
    problemMethod: function() {
        console.log(this.name); // 'Асинхронный объект'

        setTimeout(function() {
            console.log(this.name); // undefined (this = Window/global)
        }, 100);
    },

    // Решение 1: стрелочная функция
    solutionArrow: function() {
        console.log(this.name); // 'Асинхронный объект'

        setTimeout(() => {
            console.log(this.name); // 'Асинхронный объект'
        }, 100);
    },

    // Решение 2: bind
    solutionBind: function() {
        console.log(this.name); // 'Асинхронный объект'

        setTimeout(function() {
            console.log(this.name); // 'Асинхронный объект'
        }.bind(this), 100);
    },

    // Promise и async/await
    asyncMethod: async function() {
        console.log(this.name); // 'Асинхронный объект'

        const result = await Promise.resolve('Данные');
        console.log(this.name); // 'Асинхронный объект' (сохраняется!)

        return result;
    }
};
`

const highlightedGlobal = ref('')
const highlightedFunction = ref('')
const highlightedThis = ref('')
const highlightedStack = ref('')
const highlightedHoisting = ref('')
const highlightedBind = ref('')
const highlightedAsync = ref('')

onMounted(() => {
  highlightedGlobal.value = Prism.highlight(globalContextSnippet, Prism.languages.javascript, 'javascript')
  highlightedFunction.value = Prism.highlight(functionContextSnippet, Prism.languages.javascript, 'javascript')
  highlightedThis.value = Prism.highlight(thisContextSnippet, Prism.languages.javascript, 'javascript')
  highlightedStack.value = Prism.highlight(executionStackSnippet, Prism.languages.javascript, 'javascript')
  highlightedHoisting.value = Prism.highlight(hoistingContextSnippet, Prism.languages.javascript, 'javascript')
  highlightedBind.value = Prism.highlight(bindCallApplySnippet, Prism.languages.javascript, 'javascript')
  highlightedAsync.value = Prism.highlight(asyncContextSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Контекст в JavaScript: полное руководство
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Контекст в JavaScript</b> — это окружение, в котором выполняется код. Включает в себя
              контекст выполнения (Execution Context), лексический контекст (Lexical Environment) и контекст <code>this</code>.
              Понимание контекста критически важно для работы с JavaScript.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Виды контекстов</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-earth</v-icon>
                    <h3 class="text-h6 font-weight-bold">Глобальный</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Создается</strong> при загрузке скрипта</li>
                    <li><strong>Содержит</strong> глобальные переменные</li>
                    <li><strong>this</strong> = Window (браузер) / global (Node.js)</li>
                    <li><strong>Живет</strong> все время выполнения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-function</v-icon>
                    <h3 class="text-h6 font-weight-bold">Функции</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Создается</strong> при вызове функции</li>
                    <li><strong>Содержит</strong> параметры и локальные переменные</li>
                    <li><strong>this</strong> зависит от способа вызова</li>
                    <li><strong>Удаляется</strong> после выполнения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-code-braces</v-icon>
                    <h3 class="text-h6 font-weight-bold">Блочный</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Создается</strong> для блоков с let/const</li>
                    <li><strong>Содержит</strong> блочные переменные</li>
                    <li><strong>this</strong> наследуется от внешнего</li>
                    <li><strong>Ограничен</strong> фигурными скобками</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Глобальный контекст</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGlobal"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Контекст функции и замыкания</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFunction"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Контекст this (самый важный!)</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Внимание:</strong> Поведение <code>this</code> — самая частая тема на собеседованиях! Зависит от способа вызова функции.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedThis"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Стек выполнения и контексты</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStack"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает стек контекстов</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Creation Phase" value="1" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-plus</v-icon>
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
                <v-divider></v-divider>
                <v-stepper-item title="Cleanup" value="4" color="warning">
                  <template v-slot:icon>
                    <v-icon>mdi-delete</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3>1. Фаза создания</h3>
                    <p>Создается новый контекст выполнения, определяется this, создается Variable Environment</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3>2. Поднятие (Hoisting)</h3>
                    <p>var и function declarations поднимаются вверх, let/const в TDZ (Temporal Dead Zone)</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3>3. Выполнение</h3>
                    <p>Код выполняется построчно, переменные получают значения, вызываются функции</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="4">
                  <div class="pa-4">
                    <h3>4. Очистка</h3>
                    <p>Контекст удаляется из стека, память освобождается (кроме замыканий)</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">5. Поднятие (Hoisting)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHoisting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Управление контекстом: call, apply, bind</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBind"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Различия call, apply, bind</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Вызов</th>
                <th class="text-left font-weight-bold">Аргументы</th>
                <th class="text-left font-weight-bold">Возврат</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>call()</code></td>
                <td><b class="text-success">Немедленно</b></td>
                <td>По отдельности</td>
                <td>Результат функции</td>
                <td>Разовый вызов с известными аргументами</td>
              </tr>
              <tr>
                <td><code>apply()</code></td>
                <td><b class="text-success">Немедленно</b></td>
                <td>Массивом</td>
                <td>Результат функции</td>
                <td>Разовый вызов с динамическими аргументами</td>
              </tr>
              <tr>
                <td><code>bind()</code></td>
                <td><b class="text-warning">Отложенно</b></td>
                <td>По отдельности</td>
                <td>Новую функцию</td>
                <td>Создание функции с фиксированным контекстом</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">7. Контекст в асинхронном коде</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsync"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что выведет этот код?</p>
                <pre class="pa-3 bg-grey-lighten-4 rounded">
const obj = {
  name: 'Test',
  getName: function() { return this.name; }
};
const getName = obj.getName;
console.log(getName()); // ?
                </pre>
                <p class="font-weight-regular ma-0">
                  <code>undefined</code> — потому что функция вызывается как обычная функция,
                  this не указывает на obj. Решение: <code>getName.call(obj)</code> или <code>obj.getName.bind(obj)()</code>
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между стрелочными и обычными функциями относительно this?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции не имеют своего <code>this</code> — они наследуют его из лексического контекста.
                  Обычные функции создают свой <code>this</code>, который зависит от способа вызова.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое замыкание и как оно связано с контекстом?</p>
                <p class="font-weight-regular ma-0">
                  Замыкание — это функция, которая имеет доступ к переменным внешней функции даже после её завершения.
                  Создается благодаря лексическому контексту — функция "помнит" окружение, в котором была создана.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает поднятие (hoisting)?</p>
                <p class="font-weight-regular ma-0">
                  <code>var</code> и <code>function declarations</code> поднимаются вверх контекста и инициализируются как undefined/функция.
                  <code>let</code> и <code>const</code> тоже поднимаются, но остаются в TDZ до объявления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать bind вместо call/apply?</p>
                <p class="font-weight-regular ma-0">
                  <code>bind</code> — когда нужно создать новую функцию с фиксированным контекстом для многократного использования.
                  <code>call/apply</code> — для одноразового вызова с другим контекстом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с this в строгом режиме?</p>
                <p class="font-weight-regular ma-0">
                  В strict mode <code>this</code> не приводится к глобальному объекту. Если функция вызывается без контекста,
                  <code>this</code> остается <code>undefined</code> вместо превращения в <code>Window/global</code>.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Способы определения this</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Правила определения this</h3>
                  <ol class="pl-4">
                    <li><strong>Стрелочная функция:</strong> наследует из внешнего контекста</li>
                    <li><strong>new:</strong> новый объект</li>
                    <li><strong>call/apply/bind:</strong> первый аргумент</li>
                    <li><strong>Метод объекта:</strong> объект перед точкой</li>
                    <li><strong>Обычный вызов:</strong> Window/global (не строгий) или undefined (строгий)</li>
                  </ol>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Примеры</h3>
                  <ul class="pl-4">
                    <li><code>() => {}</code> — лексический this</li>
                    <li><code>new Func()</code> — новый объект</li>
                    <li><code>func.call(obj)</code> — obj</li>
                    <li><code>obj.method()</code> — obj</li>
                    <li><code>func()</code> — Window/undefined</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики работы с контекстом</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать стрелочные функции для сохранения контекста</li>
                    <li>Применять bind для постоянной привязки</li>
                    <li>Понимать разницу между var, let, const</li>
                    <li>Использовать strict mode</li>
                    <li>Тестировать поведение this</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Смешивания стрелочных функций с методами</li>
                    <li>Присвоения методов без привязки контекста</li>
                    <li>Использования var в современном коде</li>
                    <li>Игнорирования строгого режима</li>
                    <li>Неправильного использования this в коллбеках</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучайте поведение this на практике</li>
                    <li>Используйте console.log для отладки</li>
                    <li>Применяйте линтеры для проверки</li>
                    <li>Читайте MDN и спецификацию</li>
                    <li>Практикуйтесь на задачах</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Контекст в JavaScript</b> включает контекст выполнения (где выполняется код),
              лексический контекст (доступ к переменным) и контекст <code>this</code> (на что указывает this).
              Понимание этих концепций критически важно для работы с JavaScript и прохождения собеседований.
              Особое внимание уделите поведению <code>this</code> в разных ситуациях — это самая частая тема вопросов.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this"
                target="_blank"
                class="mr-2">
                MDN: this
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/ru/docs/Glossary/Execution_context"
                target="_blank">
                Execution Context
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
