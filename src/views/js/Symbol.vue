<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicSymbolSnippet = `
// Создание символов
const sym1 = Symbol();
const sym2 = Symbol("description");
const sym3 = Symbol("description");

// Каждый символ уникален!
console.log(sym1 === Symbol()); // false
console.log(sym2 === sym3);     // false - даже с одинаковым описанием

// Описание символа
console.log(sym2.toString());          // Symbol(description)
console.log(sym2.description);         // "description"
console.log(Symbol().description);     // undefined
`

const equalitySnippet = `
// ❌ Символы НИКОГДА не равны друг другу
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 == id2);   // false
console.log(id1 === id2);  // false

// ✅ Символы равны только самим себе
const mySymbol = Symbol("test");
console.log(mySymbol === mySymbol); // true

// ✅ Глобальные символы - исключение
const global1 = Symbol.for("key");
const global2 = Symbol.for("key");
console.log(global1 === global2); // true
`

const objectKeysSnippet = `
// Символы как ключи объектов
const SECRET_KEY = Symbol("secret");
const PUBLIC_KEY = "public";

const user = {
  name: "John",
  [PUBLIC_KEY]: "visible data",
  [SECRET_KEY]: "hidden data"
};

// Обычные методы не видят символьные ключи
console.log(Object.keys(user));           // ["name", "public"]
console.log(Object.getOwnPropertyNames(user)); // ["name", "public"]
console.log(JSON.stringify(user));        // {"name":"John","public":"visible data"}

// Специальные методы для символов
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(secret)]
console.log(Reflect.ownKeys(user));       // ["name", "public", Symbol(secret)]
`

const globalRegistrySnippet = `
// Глобальный реестр символов
const sym1 = Symbol.for("app.id");
const sym2 = Symbol.for("app.id");

console.log(sym1 === sym2); // true - один и тот же символ

// Получение ключа из глобального реестра
console.log(Symbol.keyFor(sym1)); // "app.id"

// Локальные символы не в глобальном реестре
const localSym = Symbol("local");
console.log(Symbol.keyFor(localSym)); // undefined
`

const wellKnownSnippet = `
// Well-known символы - встроенные символы для кастомизации поведения

// Symbol.iterator - делает объект итерируемым
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const item of myIterable) {
  console.log(item); // 1, 2, 3
}

// Symbol.toStringTag - кастомизация Object.prototype.toString
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

console.log(Object.prototype.toString.call(new MyClass())); // [object MyClass]

// Symbol.hasInstance - кастомизация instanceof
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray); // true
`

const practicalExamplesSnippet = `
// 1. Приватные свойства и методы
const _private = Symbol('private');

class User {
  constructor(name) {
    this.name = name;
    this[_private] = {
      password: 'secret',
      lastLogin: new Date()
    };
  }

  [_private + 'Method']() {
    return 'This is private!';
  }
}

// 2. Константы для состояний
const States = {
  LOADING: Symbol('loading'),
  SUCCESS: Symbol('success'),
  ERROR: Symbol('error')
};

function handleState(state) {
  switch (state) {
    case States.LOADING:
      return 'Loading...';
    case States.SUCCESS:
      return 'Success!';
    case States.ERROR:
      return 'Error occurred';
  }
}

// 3. Метаданные для объектов
const METADATA = Symbol('metadata');

function addMetadata(obj, data) {
  obj[METADATA] = data;
}

const product = { name: 'iPhone' };
addMetadata(product, { version: '1.0', author: 'Apple' });
`

const interviewQuestionsSnippet = `
// Частые вопросы на собеседовании:

// 1. Как проверить, что значение это символ?
const sym = Symbol('test');
console.log(typeof sym === 'symbol'); // true

// 2. Можно ли сконвертировать символ в строку?
console.log(String(sym));     // "Symbol(test)"
console.log(sym.toString());  // "Symbol(test)"
// console.log(sym + '');     // TypeError!

// 3. Можно ли использовать символы в качестве значений объекта?
const obj = {
  key: Symbol('value') // Да, символ как значение
};

// 4. Как получить все ключи объекта включая символьные?
const allKeys = [
  ...Object.keys(obj),
  ...Object.getOwnPropertySymbols(obj)
];

// 5. Символы в JSON
const objWithSymbol = {
  name: 'test',
  [Symbol('hidden')]: 'secret'
};

console.log(JSON.stringify(objWithSymbol)); // {"name":"test"} - символы игнорируются
`

const highlightedBasic = ref('')
const highlightedEquality = ref('')
const highlightedObjectKeys = ref('')
const highlightedGlobal = ref('')
const highlightedWellKnown = ref('')
const highlightedPractical = ref('')
const highlightedInterview = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(basicSymbolSnippet, Prism.languages.javascript, 'javascript')
  highlightedEquality.value = Prism.highlight(equalitySnippet, Prism.languages.javascript, 'javascript')
  highlightedObjectKeys.value = Prism.highlight(objectKeysSnippet, Prism.languages.javascript, 'javascript')
  highlightedGlobal.value = Prism.highlight(globalRegistrySnippet, Prism.languages.javascript, 'javascript')
  highlightedWellKnown.value = Prism.highlight(wellKnownSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedInterview.value = Prism.highlight(interviewQuestionsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript Symbol: уникальные идентификаторы
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Symbol</b> — это примитивный тип данных, введенный в ES6 (ES2015).
              Каждый символ уникален и неизменяем, что делает его идеальным для создания
              уникальных идентификаторов и "скрытых" свойств объектов.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с Symbol</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-key</v-icon>
                    <h3 class="text-h6 font-weight-bold">Характеристики</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Уникальность</strong> — каждый символ уникален</li>
                    <li><strong>Неизменяемость</strong> — нельзя изменить</li>
                    <li><strong>Примитивный тип</strong> — typeof возвращает 'symbol'</li>
                    <li><strong>Не автоматически конвертируется</strong> в строки</li>
                    <li><strong>Невидим для JSON.stringify</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-lightbulb</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Ключи объектов</strong> — скрытые свойства</li>
                    <li><strong>Константы</strong> — уникальные значения</li>
                    <li><strong>Well-known символы</strong> — кастомизация поведения</li>
                    <li><strong>Метаданные</strong> — дополнительная информация</li>
                    <li><strong>Приватность</strong> — имитация приватных полей</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Равенство символов — главное заблуждение</h2>

            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Важно:</strong> Symbol("id") == Symbol("id") всегда возвращает <code>false</code>!
              Каждый вызов Symbol() создает новый уникальный символ, даже с одинаковым описанием.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEquality"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Символы как ключи объектов</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Особенность:</strong> Символьные ключи "невидимы" для большинства методов перебора объектов,
              что делает их идеальными для создания "скрытых" свойств.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedObjectKeys"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Глобальный реестр символов</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-primary">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Symbol()</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Локальный</strong> символ</li>
                    <li><strong>Уникальный</strong> каждый раз</li>
                    <li><strong>Не переиспользуется</strong></li>
                    <li>Используется для приватности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Symbol.for()</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Глобальный</strong> символ</li>
                    <li><strong>Переиспользуется</strong> по ключу</li>
                    <li><strong>Один экземпляр</strong> на ключ</li>
                    <li>Используется для интеграции</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGlobal"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Well-known символы</h2>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-star</v-icon>
              <strong>Well-known символы</strong> — это встроенные символы, которые используются JavaScript
              для кастомизации поведения объектов. Они позволяют переопределить стандартные операции.
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Символ</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>Symbol.iterator</code></td>
                <td>Итерация объекта</td>
                <td>for...of, spread operator</td>
              </tr>
              <tr>
                <td><code>Symbol.toStringTag</code></td>
                <td>Кастомный toString</td>
                <td>Object.prototype.toString</td>
              </tr>
              <tr>
                <td><code>Symbol.hasInstance</code></td>
                <td>Кастомный instanceof</td>
                <td>Оператор instanceof</td>
              </tr>
              <tr>
                <td><code>Symbol.toPrimitive</code></td>
                <td>Преобразование типа</td>
                <td>Автоматическое приведение</td>
              </tr>
              <tr>
                <td><code>Symbol.asyncIterator</code></td>
                <td>Асинхронная итерация</td>
                <td>for await...of</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWellKnown"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterview"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Топовые вопросы интервью</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Symbol("id") == Symbol("id") — что вернет?</p>
                <p class="font-weight-regular ma-0">
                  <code>false</code>. Каждый вызов Symbol() создает новый уникальный символ,
                  даже если описание одинаковое. Символы уникальны по определению.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как получить все ключи объекта, включая символьные?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>Reflect.ownKeys(obj)</code> или объединить
                  <code>Object.keys(obj)</code> с <code>Object.getOwnPropertySymbols(obj)</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать символ в JSON?</p>
                <p class="font-weight-regular ma-0">
                  Нет! JSON.stringify игнорирует символьные ключи и значения.
                  Символы "исчезают" при сериализации в JSON.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Symbol() и Symbol.for()?</p>
                <p class="font-weight-regular ma-0">
                  Symbol() создает уникальный локальный символ. Symbol.for(key) ищет символ
                  в глобальном реестре или создает новый, если не найден.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли преобразовать символ в строку?</p>
                <p class="font-weight-regular ma-0">
                  Явно — да: <code>String(symbol)</code> или <code>symbol.toString()</code>.
                  Неявно — нет: <code>symbol + ""</code> вызовет TypeError.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужны Well-known символы?</p>
                <p class="font-weight-regular ma-0">
                  Для кастомизации стандартного поведения JavaScript: итерации, преобразования типов,
                  instanceof и других встроенных операций без изменения прототипов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать "приватные" свойства через символы?</p>
                <p class="font-weight-regular ma-0">
                  Создать символ в замыкании или модуле, использовать как ключ.
                  Свойство не будет видно в Object.keys(), но не является истинно приватным.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и ограничения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Производительность</h3>
                  <ul class="text-white text-left pl-4">
                    <li>Быстрое создание</li>
                    <li>Эффективное сравнение</li>
                    <li>Не влияет на перебор объекта</li>
                    <li>Память — минимальные накладные расходы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-warning">
                  <v-icon size="large" color="white" class="mb-2">mdi-alert-triangle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Ограничения</h3>
                  <ul class="text-white text-left pl-4">
                    <li>Не сериализуется в JSON</li>
                    <li>Нет автоматического преобразования</li>
                    <li>Не итерируется в for...in</li>
                    <li>Недоступен в старых браузерах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="large" color="white" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Когда использовать</h3>
                  <ul class="text-white text-left pl-4">
                    <li>Уникальные константы</li>
                    <li>Метаданные объектов</li>
                    <li>Кастомизация поведения</li>
                    <li>"Скрытые" свойства</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение с другими подходами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Уникальность</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Приватность</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Symbol</b></td>
                <td class="text-success"><b>Гарантированная</b></td>
                <td class="text-success"><b>Высокая</b></td>
                <td class="text-warning"><b>Частичная</b></td>
                <td>Уникальные идентификаторы</td>
              </tr>
              <tr>
                <td><b>UUID/GUID</b></td>
                <td class="text-warning"><b>Вероятная</b></td>
                <td class="text-warning"><b>Средняя</b></td>
                <td class="text-error"><b>Нет</b></td>
                <td>Строковые идентификаторы</td>
              </tr>
              <tr>
                <td><b>WeakMap</b></td>
                <td class="text-success"><b>Полная</b></td>
                <td class="text-success"><b>Высокая</b></td>
                <td class="text-success"><b>Полная</b></td>
                <td>Истинно приватные данные</td>
              </tr>
              <tr>
                <td><b>Closure</b></td>
                <td class="text-success"><b>Полная</b></td>
                <td class="text-warning"><b>Средняя</b></td>
                <td class="text-success"><b>Полная</b></td>
                <td>Приватные методы/данные</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Symbol</b> — это уникальные неизменяемые идентификаторы в JavaScript.
              <b>Два символа никогда не равны</b>, даже с одинаковым описанием: <code>Symbol("id") !== Symbol("id")</code>.
              Символы идеально подходят для создания уникальных ключей объектов, констант состояний
              и кастомизации поведения через Well-known символы. Они "невидимы" для большинства
              методов перебора, что делает их полезными для метаданных и "скрытых" свойств.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol"
                target="_blank"
                class="mr-2">
                MDN Symbol
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://tc39.es/ecma262/#sec-symbol-objects"
                target="_blank">
                ECMAScript Spec
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
