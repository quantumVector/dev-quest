<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Проверка дескрипторов свойства
const obj = { name: "John" };

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
// { value: "John", writable: true, enumerable: true, configurable: true }

// Создание свойства с конкретными флагами
Object.defineProperty(obj, 'age', {
  value: 30,
  writable: false,    // нельзя изменить
  enumerable: false,  // не появляется в циклах
  configurable: false // нельзя удалить или изменить дескриптор
});

console.log(obj.age); // 30
obj.age = 25; // игнорируется (в strict mode - ошибка)
console.log(obj.age); // всё ещё 30
`

const snippet2 = `
const user = {};

// writable: false - свойство только для чтения
Object.defineProperty(user, 'name', {
  value: "Alice",
  writable: false,
  enumerable: true,
  configurable: true
});

user.name = "Bob"; // игнорируется
console.log(user.name); // "Alice"

// В строгом режиме будет TypeError
"use strict";
user.name = "Bob"; // TypeError: Cannot assign to read only property
`

const snippet3 = `
const product = {
  id: 1,
  name: "Laptop"
};

// enumerable: false - свойство скрыто от перечисления
Object.defineProperty(product, 'secret', {
  value: "classified",
  writable: true,
  enumerable: false, // не видно в циклах
  configurable: true
});

console.log(product.secret); // "classified" - можно получить напрямую

// Но не видно в перечислении
for (let key in product) {
  console.log(key); // только "id" и "name"
}

console.log(Object.keys(product)); // ["id", "name"]
console.log(JSON.stringify(product)); // {"id":1,"name":"Laptop"}
`

const snippet4 = `
const config = { theme: "dark" };

// configurable: false - свойство нельзя удалить или изменить дескриптор
Object.defineProperty(config, 'version', {
  value: "1.0",
  writable: true,
  enumerable: true,
  configurable: false // заблокировали конфигурацию
});

// Нельзя удалить
delete config.version; // false (в strict mode - TypeError)
console.log(config.version); // "1.0" - всё ещё есть

// Нельзя изменить дескриптор
Object.defineProperty(config, 'version', {
  enumerable: false // TypeError: Cannot redefine property
});

// Но можно изменить значение, если writable: true
config.version = "2.0"; // работает
console.log(config.version); // "2.0"
`

const snippet5 = `
// Object.defineProperties для множественного определения
const car = {};

Object.defineProperties(car, {
  brand: {
    value: "Toyota",
    writable: false,
    enumerable: true,
    configurable: false
  },
  model: {
    value: "Camry",
    writable: true,
    enumerable: true,
    configurable: true
  },
  vin: {
    value: "ABC123456789",
    writable: false,
    enumerable: false, // скрытый VIN
    configurable: false
  }
});

// Полезные методы для работы с дескрипторами
console.log(Object.getOwnPropertyDescriptors(car));
// Получить все дескрипторы объекта

console.log(Object.getOwnPropertyNames(car));
// ["brand", "model", "vin"] - все свойства, включая неперечисляемые

console.log(Object.keys(car));
// ["brand", "model"] - только перечисляемые
`

const snippet6 = `
// Практические применения

// 1. Создание констант
const API = {};
Object.defineProperty(API, 'BASE_URL', {
  value: "https://api.example.com",
  writable: false,
  enumerable: true,
  configurable: false
});

// 2. Метаданные объекта
function createUser(name, email) {
  const user = { name, email };

  Object.defineProperty(user, '_created', {
    value: new Date(),
    writable: false,
    enumerable: false, // скрываем от JSON.stringify
    configurable: false
  });

  return user;
}

// 3. Геттеры и сеттеры с ограничениями
const account = { _balance: 1000 };

Object.defineProperty(account, 'balance', {
  get() { return this._balance; },
  set(value) {
    if (value < 0) throw new Error("Balance cannot be negative");
    this._balance = value;
  },
  enumerable: true,
  configurable: false
});
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Флаги свойств объектов в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              В JavaScript каждое свойство объекта имеет не только значение, но и три специальных флага,
              которые контролируют поведение этого свойства: <b>writable</b>, <b>enumerable</b> и <b>configurable</b>.
              Эти флаги называются <b>дескрипторами свойств</b> и позволяют точно настроить, как свойство ведёт себя при различных операциях.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы дескрипторов свойств</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Флаг</th>
                <th class="text-left font-weight-bold">Значение по умолчанию</th>
                <th class="text-left font-weight-bold">Что контролирует</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>writable</b></td>
                <td class="pt-2 pb-2">true (для обычных свойств)</td>
                <td class="pt-2 pb-2">Можно ли изменить значение свойства</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>enumerable</b></td>
                <td class="pt-2 pb-2">true (для обычных свойств)</td>
                <td class="pt-2 pb-2">Появляется ли свойство в циклах for...in и Object.keys()</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>configurable</b></td>
                <td class="pt-2 pb-2">true (для обычных свойств)</td>
                <td class="pt-2 pb-2">Можно ли удалить свойство или изменить его дескрипторы</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Получение и установка дескрипторов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">1. Флаг writable - возможность изменения</h2>
            <p class="font-weight-regular mb-4">
              Когда <code>writable: false</code>, свойство становится доступным только для чтения.
              Попытки изменить его значение игнорируются в обычном режиме или вызывают ошибку в строгом режиме.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Флаг enumerable - видимость в перечислении</h2>
            <p class="font-weight-regular mb-4">
              Когда <code>enumerable: false</code>, свойство не появляется в циклах <code>for...in</code>,
              <code>Object.keys()</code>, <code>Object.values()</code> и <code>JSON.stringify()</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Флаг configurable - возможность конфигурирования</h2>
            <p class="font-weight-regular mb-4">
              Когда <code>configurable: false</code>, свойство нельзя удалить и нельзя изменить его дескрипторы.
              Это самый "жёсткий" флаг - если он false, то обратно его уже не изменить.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Работа с множественными свойствами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические применения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие значения по умолчанию у флагов при создании через Object.defineProperty?</p>
                <p class="font-weight-regular ma-0">
                  При использовании <code>Object.defineProperty</code> все флаги по умолчанию равны <code>false</code>.
                  При создании свойства через обычное присвоение (<code>obj.prop = value</code>) все флаги равны <code>true</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли изменить configurable с false на true?</p>
                <p class="font-weight-regular ma-0">
                  Нет, это единственное исключение. Если <code>configurable: false</code>, то изменить этот флаг
                  обратно на <code>true</code> уже нельзя. Можно только изменить <code>writable</code> с <code>true</code> на <code>false</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между enumerable: false и Symbol-свойствами?</p>
                <p class="font-weight-regular ma-0">
                  Свойства с <code>enumerable: false</code> всё ещё доступны через <code>Object.getOwnPropertyNames()</code>.
                  Symbol-свойства не перечисляются вообще и доступны только через <code>Object.getOwnPropertySymbols()</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как это связано с наследованием и prototype?</p>
                <p class="font-weight-regular ma-0">
                  Флаги действуют только на собственные свойства объекта. Унаследованные свойства имеют свои дескрипторы.
                  <code>for...in</code> перечисляет enumerable-свойства всей цепочки прототипов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при Object.freeze() и Object.seal()?</p>
                <p class="font-weight-regular ma-0">
                  <code>Object.freeze()</code> делает все свойства <code>writable: false</code> и <code>configurable: false</code>.
                  <code>Object.seal()</code> делает все свойства <code>configurable: false</code>, но оставляет <code>writable: true</code>.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Связанные методы Object</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Получение дескрипторов</h3>
                  <ul class="pl-4">
                    <li><code>Object.getOwnPropertyDescriptor()</code></li>
                    <li><code>Object.getOwnPropertyDescriptors()</code></li>
                    <li><code>Object.getOwnPropertyNames()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Установка дескрипторов</h3>
                  <ul class="pl-4">
                    <li><code>Object.defineProperty()</code></li>
                    <li><code>Object.defineProperties()</code></li>
                    <li><code>Object.create()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Управление объектом</h3>
                  <ul class="pl-4">
                    <li><code>Object.freeze()</code></li>
                    <li><code>Object.seal()</code></li>
                    <li><code>Object.preventExtensions()</code></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Флаги свойств объектов (<code>writable</code>, <code>enumerable</code>, <code>configurable</code>)
              предоставляют точный контроль над поведением свойств. <code>writable</code> контролирует изменяемость,
              <code>enumerable</code> - видимость в перечислениях, <code>configurable</code> - возможность
              удаления и изменения дескрипторов. Понимание этих механизмов критично для создания надёжных
              библиотек и фреймворков, а также для работы с мета-программированием в JavaScript.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty"
                target="_blank">
                MDN: Object.defineProperty
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
