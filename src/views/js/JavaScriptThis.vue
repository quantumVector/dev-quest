<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const globalThisSnippet = `
// Глобальный контекст
console.log(this); // Window (в браузере) или global (в Node.js)

function regularFunction() {
  console.log(this); // Window (не строгий режим) или undefined (строгий)
}

"use strict";
function strictFunction() {
  console.log(this); // undefined в строгом режиме
}

regularFunction();
strictFunction();
`

const objectMethodSnippet = `
const user = {
  name: 'Alice',
  age: 30,

  // Метод объекта - this ссылается на объект
  greet() {
    console.log(this); // { name: 'Alice', age: 30, greet: [Function] }
    console.log(\`Привет, я \${this.name}!\`); // "Привет, я Alice!"
  },

  // Стрелочная функция - this наследуется из окружения
  greetArrow: () => {
    console.log(this); // Window или undefined (глобальный контекст)
    // console.log(\`Привет, я \${this.name}!\`); // Ошибка!
  }
};

user.greet(); // this = user
user.greetArrow(); // this НЕ равен user!

// Потеря контекста
const greetFunc = user.greet;
greetFunc(); // this = undefined (строгий режим) или Window
`

const constructorSnippet = `
// Функция-конструктор
function Person(name, age) {
  this.name = name;    // this = новый создаваемый объект
  this.age = age;

  this.sayHi = function() {
    console.log(\`Привет, я \${this.name}\`);
  };
}

const person1 = new Person('Bob', 25);
const person2 = new Person('Carol', 28);

person1.sayHi(); // "Привет, я Bob" - this = person1
person2.sayHi(); // "Привет, я Carol" - this = person2

// Класс (ES6+)
class Animal {
  constructor(name) {
    this.name = name; // this = экземпляр класса
  }

  speak() {
    console.log(\`\${this.name} издает звук\`);
  }
}

const dog = new Animal('Рекс');
dog.speak(); // "Рекс издает звук" - this = dog
`

const bindCallApplySnippet = `
const person = {
  name: 'David',
  greet(greeting, punctuation = '.') {
    console.log(\`\${greeting}, я \${this.name}\${punctuation}\`);
  }
};

const anotherPerson = { name: 'Eva' };

// call() - вызов с явным this + аргументы через запятую
person.greet.call(anotherPerson, 'Привет', '!');
// "Привет, я Eva!"

// apply() - вызов с явным this + аргументы массивом
person.greet.apply(anotherPerson, ['Здравствуй', '?']);
// "Здравствуй, я Eva?"

// bind() - создание новой функции с привязанным this
const boundGreet = person.greet.bind(anotherPerson);
boundGreet('Добро пожаловать'); // "Добро пожаловать, я Eva."

// bind с частичным применением аргументов
const boundGreetHello = person.greet.bind(anotherPerson, 'Привет');
boundGreetHello('!!!'); // "Привет, я Eva!!!"
`

const arrowFunctionsSnippet = `
const obj = {
  name: 'Frank',

  // Обычный метод
  regularMethod() {
    console.log('Regular:', this.name); // "Regular: Frank"

    // Внутренняя обычная функция - теряет контекст
    function innerRegular() {
      console.log('Inner regular:', this.name); // undefined или ошибка
    }

    // Внутренняя стрелочная функция - наследует контекст
    const innerArrow = () => {
      console.log('Inner arrow:', this.name); // "Inner arrow: Frank"
    };

    innerRegular();
    innerArrow();
  },

  // Стрелочная функция как метод - НЕ привязывается к объекту
  arrowMethod: () => {
    console.log('Arrow method:', this.name); // undefined - this = глобальный
  }
};

obj.regularMethod();
obj.arrowMethod();

// Практический пример с таймером
const counter = {
  count: 0,

  start() {
    // ❌ Неправильно - потеря контекста
    // setTimeout(function() {
    //   this.count++; // this = Window, не counter
    // }, 1000);

    // ✅ Правильно - стрелочная функция наследует this
    setTimeout(() => {
      this.count++; // this = counter
      console.log('Count:', this.count);
    }, 1000);
  }
};

counter.start(); // Через секунду: "Count: 1"
`

const eventHandlersSnippet = `
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;

    // ❌ Проблема - потеря контекста в обработчике
    // this.element.addEventListener('click', this.handleClick);

    // ✅ Решение 1 - bind
    this.element.addEventListener('click', this.handleClick.bind(this));

    // ✅ Решение 2 - стрелочная функция
    this.element.addEventListener('click', (event) => {
      this.handleClickArrow(event);
    });
  }

  handleClick(event) {
    this.clickCount++; // this = Button instance (благодаря bind)
    console.log(\`Клик #\${this.clickCount}\`);
  }

  // ✅ Решение 3 - стрелочная функция как свойство класса
  handleClickArrow = (event) => {
    this.clickCount++;
    console.log(\`Arrow клик #\${this.clickCount}\`);
  }
}

// В HTML: <button id="myButton">Нажми меня</button>
// const button = new Button(document.getElementById('myButton'));
`

const thisRulesSnippet = `
// Правила определения this (в порядке приоритета)

// 1. new - this = новый объект
function Foo() {
  this.a = 'new binding';
}
const obj1 = new Foo(); // this = obj1

// 2. call, apply, bind - явное указание this
const obj2 = { a: 'explicit binding' };
Foo.call(obj2); // this = obj2

// 3. Метод объекта - this = объект-владелец
const obj3 = {
  a: 'implicit binding',
  foo: Foo
};
obj3.foo(); // this = obj3

// 4. По умолчанию - global object или undefined
Foo(); // this = Window/global или undefined (strict mode)

// Исключения:
// - Стрелочные функции игнорируют все правила и берут this из лексического окружения
// - setTimeout, setInterval - this обычно = Window
// - Event handlers - this = element (если не стрелочная функция)
`

const practicalExamplesSnippet = `
// Практические примеры и ловушки

// 1. Callback функции
const user = {
  name: 'Grace',
  greet() {
    console.log(\`Привет от \${this.name}\`);
  }
};

// ❌ Проблема
setTimeout(user.greet, 1000); // "Привет от undefined"

// ✅ Решения
setTimeout(() => user.greet(), 1000); // "Привет от Grace"
setTimeout(user.greet.bind(user), 1000); // "Привет от Grace"

// 2. Методы массивов
const calculator = {
  numbers: [1, 2, 3, 4, 5],
  multiplier: 2,

  // ❌ Неправильно
  multiplyWrong() {
    return this.numbers.map(function(num) {
      return num * this.multiplier; // this = undefined!
    });
  },

  // ✅ Правильно
  multiply() {
    return this.numbers.map(num => {
      return num * this.multiplier; // this = calculator
    });
  },

  // ✅ Альтернатива с thisArg
  multiplyWithThisArg() {
    return this.numbers.map(function(num) {
      return num * this.multiplier;
    }, this); // передаем this как второй аргумент
  }
};

console.log(calculator.multiply()); // [2, 4, 6, 8, 10]

// 3. Деструктуризация
const settings = {
  theme: 'dark',
  getTheme() {
    return this.theme;
  }
};

const { getTheme } = settings;
console.log(getTheme()); // undefined - потеря контекста!

// Решение
const boundGetTheme = settings.getTheme.bind(settings);
console.log(boundGetTheme()); // "dark"
`

const highlightedGlobalThis = ref('')
const highlightedObjectMethod = ref('')
const highlightedConstructor = ref('')
const highlightedBindCallApply = ref('')
const highlightedArrowFunctions = ref('')
const highlightedEventHandlers = ref('')
const highlightedThisRules = ref('')
const highlightedPracticalExamples = ref('')

onMounted(() => {
  highlightedGlobalThis.value = Prism.highlight(globalThisSnippet, Prism.languages.javascript, 'javascript')
  highlightedObjectMethod.value = Prism.highlight(objectMethodSnippet, Prism.languages.javascript, 'javascript')
  highlightedConstructor.value = Prism.highlight(constructorSnippet, Prism.languages.javascript, 'javascript')
  highlightedBindCallApply.value = Prism.highlight(bindCallApplySnippet, Prism.languages.javascript, 'javascript')
  highlightedArrowFunctions.value = Prism.highlight(arrowFunctionsSnippet, Prism.languages.javascript, 'javascript')
  highlightedEventHandlers.value = Prism.highlight(eventHandlersSnippet, Prism.languages.javascript, 'javascript')
  highlightedThisRules.value = Prism.highlight(thisRulesSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Ключевое слово this в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>this</b> — одна из самых сложных концепций JavaScript. Значение <code>this</code> определяется
              <b>тем, как вызывается функция</b>, а не где она определена. Понимание правил привязки <code>this</code>
              критически важно для работы с JavaScript.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое this?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-target</v-icon>
                    <h3 class="text-h6 font-weight-bold">this — это ссылка</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Контекст выполнения</strong> функции</li>
                    <li><strong>Объект</strong>, в контексте которого вызвана функция</li>
                    <li><strong>Неявный параметр</strong> каждой функции</li>
                    <li><strong>Определяется во время вызова</strong>, не объявления</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold">Распространенные ошибки</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Потеря контекста</strong> в callback'ах</li>
                    <li><strong>Неправильное понимание</strong> стрелочных функций</li>
                    <li><strong>Путаница с методами</strong> объектов</li>
                    <li><strong>Проблемы с обработчиками</strong> событий</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Глобальный контекст</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGlobalThis"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Методы объектов</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Важно:</strong> При вызове метода объекта <code>obj.method()</code> — this равен obj. При присваивании метода переменной контекст теряется!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedObjectMethod"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Конструкторы и классы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConstructor"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. call, apply, bind — явная привязка</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-phone</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">call()</h3>
                  <p class="text-body-2">Вызывает функцию с указанным this и аргументами через запятую</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-application</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">apply()</h3>
                  <p class="text-body-2">Вызывает функцию с указанным this и аргументами в виде массива</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-link</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">bind()</h3>
                  <p class="text-body-2">Создает новую функцию с привязанным this (не вызывает сразу)</p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBindCallApply"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Стрелочные функции</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-arrow-right</v-icon>
              <strong>Ключевая особенность:</strong> Стрелочные функции НЕ имеют собственного this. Они наследуют this из лексического окружения (где были определены).
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedArrowFunctions"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Обработчики событий</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventHandlers"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правила определения this</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="new" value="1" complete color="error">
                  <template v-slot:icon>
                    <v-icon>mdi-numeric-1</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="call/apply/bind" value="2" complete color="warning">
                  <template v-slot:icon>
                    <v-icon>mdi-numeric-2</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="obj.method()" value="3" complete color="info">
                  <template v-slot:icon>
                    <v-icon>mdi-numeric-3</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="по умолчанию" value="4" color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-numeric-4</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3>1. new (наивысший приоритет)</h3>
                    <p>При вызове с <code>new</code> — this = новый создаваемый объект</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3>2. Явная привязка</h3>
                    <p>call, apply, bind — явно указывают значение this</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3>3. Неявная привязка</h3>
                    <p>obj.method() — this = объект перед точкой</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="4">
                  <div class="pa-4">
                    <h3>4. По умолчанию</h3>
                    <p>Глобальный объект или undefined (строгий режим)</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedThisRules"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры и ловушки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается this в стрелочных функциях?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции НЕ имеют собственного this. Они наследуют его из лексического окружения.
                  Поэтому call, apply, bind не влияют на this в стрелочных функциях.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с this при потере контекста?</p>
                <p class="font-weight-regular ma-0">
                  При присваивании метода переменной или передаче в callback this становится undefined
                  (строгий режим) или глобальным объектом. Решение: bind, стрелочные функции или замыкания.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между call, apply и bind?</p>
                <p class="font-weight-regular ma-0">
                  call и apply сразу вызывают функцию с указанным this (разница в передаче аргументов).
                  bind создает новую функцию с привязанным this, но не вызывает её.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как this работает в классах?</p>
                <p class="font-weight-regular ma-0">
                  В конструкторе this = создаваемый экземпляр. В методах класса this = экземпляр, который
                  вызвал метод. Стрелочные функции как свойства класса привязывают this к экземпляру.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему в обработчиках событий this = элемент?</p>
                <p class="font-weight-regular ma-0">
                  Браузер автоматически устанавливает this равным элементу, на котором произошло событие.
                  Это удобно для доступа к свойствам элемента, но может вызывать путаницу.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как запомнить правила определения this?</p>
                <p class="font-weight-regular ma-0">
                  Мнемоника: "Новый Явный Неявный По-умолчанию" (new → call/apply/bind → obj.method() → global/undefined).
                  Стрелочные функции игнорируют все правила и берут this из лексической области.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов решения проблем с this</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">bind()</th>
                <th class="text-left font-weight-bold">Стрелочная функция</th>
                <th class="text-left font-weight-bold">call/apply</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Callback функции</b></td>
                <td class="text-success">✅ Создает новую функцию</td>
                <td class="text-success">✅ Наследует this</td>
                <td class="text-warning">⚡ Только для разового вызова</td>
              </tr>
              <tr>
                <td><b>Event handlers</b></td>
                <td class="text-success">✅ Сохраняет контекст класса</td>
                <td class="text-success">✅ Автопривязка в классах</td>
                <td class="text-error">❌ Не подходит</td>
              </tr>
              <tr>
                <td><b>Методы массивов</b></td>
                <td class="text-warning">⚡ Дополнительная функция</td>
                <td class="text-success">✅ Лаконично</td>
                <td class="text-info">💡 thisArg параметр</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td class="text-warning">⚡ Создание функции</td>
                <td class="text-success">✅ Оптимально</td>
                <td class="text-success">✅ Прямой вызов</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать стрелочные функции для callbacks</li>
                    <li>Применять bind для методов в конструкторах</li>
                    <li>Понимать контекст перед использованием this</li>
                    <li>Использовать строгий режим</li>
                    <li>Проверять this в отладчике</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Путать лексическое и динамическое this</li>
                    <li>Забывать про потерю контекста</li>
                    <li>Использовать стрелочные функции как методы</li>
                    <li>Полагаться на глобальный this</li>
                    <li>Игнорировать строгий режим</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте console.log(this) для отладки</li>
                    <li>Изучите паттерн "that = this"</li>
                    <li>Практикуйтесь с разными контекстами</li>
                    <li>Читайте код других разработчиков</li>
                    <li>Используйте ESLint правила</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>this</b> — это ссылка на контекст выполнения функции, которая определяется способом её вызова.
              Понимание правил привязки this (new → явная → неявная → по умолчанию) и особенностей стрелочных
              функций критически важно для эффективной работы с JavaScript. Используйте стрелочные функции
              для callbacks и bind для сохранения контекста в методах.
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
                href="https://learn.javascript.ru/object-methods"
                target="_blank">
                Учебник JavaScript
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
