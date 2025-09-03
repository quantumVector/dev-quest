<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-bash.js'

const badExampleSnippet = `
// ❌ ПЛОХО - Изменение глобальных прототипов
Array.prototype.myCustomMethod = function() {
  return this.filter(x => x > 0);
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Object.prototype.isEmpty = function() {
  return Object.keys(this).length === 0;
}

// Проблемы начинаются здесь...
const arr = [1, -2, 3];
console.log(arr.myCustomMethod()); // [1, 3] - работает

const str = "hello";
console.log(str.capitalize()); // "Hello" - работает

const obj = {};
console.log(obj.isEmpty()); // true - работает, но...
`

const problemsExampleSnippet = `
// Проблема 1: Загрязнение глобального пространства
const obj = {name: "John", age: 30};

// isEmpty теперь появляется везде!
for (let key in obj) {
  console.log(key); // "name", "age", "isEmpty" <- лишний метод!
}

// Проблема 2: Конфликты с библиотеками
// Библиотека A добавляет метод
Array.prototype.remove = function(item) {
  const index = this.indexOf(item);
  if (index > -1) this.splice(index, 1);
  return this;
}

// Библиотека B добавляет другой метод с тем же именем
Array.prototype.remove = function(predicate) {
  return this.filter(x => !predicate(x));
}

// Какой метод будет использоваться? Конфликт!

// Проблема 3: Влияние на встроенные методы
const myArray = [1, 2, 3];
console.log(myArray.map); // function - встроенный метод

// Случайно перезаписали встроенный метод!
Array.prototype.map = function() {
  return "Oops! Broke everything!";
}

console.log(myArray.map(x => x * 2)); // "Oops! Broke everything!"
`

const securityExampleSnippet = `
// Проблема 4: Безопасность и непредсказуемость
Object.prototype.admin = true;

const user = JSON.parse('{"name": "John"}'); // Из API

// Неожиданное поведение!
if (user.admin) {
  console.log("User is admin!"); // Выполнится! Хотя в JSON нет admin
}

// Проблема 5: Влияние на hasOwnProperty
Object.prototype.hasOwnProperty = function() {
  return false; // Сломали проверку собственных свойств!
}

const test = {a: 1};
console.log(test.hasOwnProperty('a')); // false вместо true!

// Проблема 6: JSON.stringify ломается
Object.prototype.toJSON = function() {
  return "hacked!";
}

const data = {name: "John"};
console.log(JSON.stringify(data)); // "hacked!" вместо {"name":"John"}
`

const libraryConflictSnippet = `
// Реальный пример конфликта библиотек

// Lodash добавляет методы в прототипы (в старых версиях)
Array.prototype.first = function() {
  return this[0];
}

// Ваш код добавляет другой метод
Array.prototype.first = function(n = 1) {
  return this.slice(0, n);
}

const arr = [1, 2, 3, 4, 5];

// Какой результат ожидается?
console.log(arr.first());    // 1 или [1]?
console.log(arr.first(3));   // [1, 2, 3] или undefined?

// Использование в for...in сломается
const myArray = ['a', 'b', 'c'];
for (let key in myArray) {
  console.log(key); // "0", "1", "2", "first" <- нежелательное поведение!
}
`

const goodExampleSnippet = `
// ✅ ПРАВИЛЬНО - Альтернативы модификации прототипов

// 1. Утилитарные функции
const ArrayUtils = {
  filterPositive(arr) {
    return arr.filter(x => x > 0);
  },

  remove(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
    return arr;
  }
};

// 2. Расширение через классы
class ExtendedArray extends Array {
  filterPositive() {
    return this.filter(x => x > 0);
  }

  remove(item) {
    const index = this.indexOf(item);
    if (index > -1) this.splice(index, 1);
    return this;
  }
}

// 3. Композиция и миксины
function createArrayWithUtils(arr) {
  return Object.assign(arr, {
    filterPositive() {
      return this.filter(x => x > 0);
    }
  });
}

// 4. Symbol для уникальных свойств (если всё-таки нужно)
const FILTER_POSITIVE = Symbol('filterPositive');
Array.prototype[FILTER_POSITIVE] = function() {
  return this.filter(x => x > 0);
}
`

const usageExampleSnippet = `
// Использование безопасных альтернатив

// Утилитарные функции
const numbers = [1, -2, 3, -4, 5];
const positive = ArrayUtils.filterPositive(numbers);
console.log(positive); // [1, 3, 5]

// Расширенные классы
const extArr = new ExtendedArray(1, -2, 3, -4, 5);
const positiveExt = extArr.filterPositive();
console.log(positiveExt); // [1, 3, 5]

// Композиция
const arrWithUtils = createArrayWithUtils([1, -2, 3, -4, 5]);
const positiveComp = arrWithUtils.filterPositive();
console.log(positiveComp); // [1, 3, 5]

// Symbol методы (если критически важно)
const arr = [1, -2, 3, -4, 5];
const positiveSymbol = arr[FILTER_POSITIVE]();
console.log(positiveSymbol); // [1, 3, 5]

// for...in работает корректно
for (let key in numbers) {
  console.log(key); // только "0", "1", "2", "3", "4"
}
`

const detectionExampleSnippet = `
// Методы обнаружения модификаций прототипов

// 1. Проверка собственных свойств
function hasSafePrototype(obj) {
  const proto = Object.getPrototypeOf(obj);
  const expectedKeys = Object.getOwnPropertyNames(proto);
  const actualKeys = Object.getOwnPropertyNames(Object.getPrototypeOf({}));

  return expectedKeys.length === actualKeys.length;
}

// 2. Сохранение оригинальных методов
const originalMethods = {
  hasOwnProperty: Object.prototype.hasOwnProperty,
  toString: Object.prototype.toString,
  push: Array.prototype.push,
  map: Array.prototype.map
};

// 3. Восстановление при необходимости
function restoreOriginalMethods() {
  Object.prototype.hasOwnProperty = originalMethods.hasOwnProperty;
  Object.prototype.toString = originalMethods.toString;
  Array.prototype.push = originalMethods.push;
  Array.prototype.map = originalMethods.map;
}

// 4. Создание чистых объектов
const cleanObject = Object.create(null); // Без прототипа
cleanObject.name = "John";
console.log(cleanObject.toString); // undefined - нет прототипа
`

const eslintConfigSnippet = `
// .eslintrc.js - правила для предотвращения модификации прототипов
module.exports = {
  rules: {
    // Запретить расширение встроенных объектов
    'no-extend-native': 'error',

    // Запретить изменение прототипов
    'no-proto': 'error',

    // Предупреждать о модификации Object.prototype
    'no-prototype-builtins': 'warn'
  }
};

// TypeScript - строгие типы помогают избежать проблем
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
`

const highlightedBadExample = ref('')
const highlightedProblemsExample = ref('')
const highlightedSecurityExample = ref('')
const highlightedLibraryConflict = ref('')
const highlightedGoodExample = ref('')
const highlightedUsageExample = ref('')
const highlightedDetectionExample = ref('')
const highlightedEslintConfig = ref('')

onMounted(() => {
  highlightedBadExample.value = Prism.highlight(badExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedProblemsExample.value = Prism.highlight(problemsExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurityExample.value = Prism.highlight(securityExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedLibraryConflict.value = Prism.highlight(libraryConflictSnippet, Prism.languages.javascript, 'javascript')
  highlightedGoodExample.value = Prism.highlight(goodExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedUsageExample.value = Prism.highlight(usageExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedDetectionExample.value = Prism.highlight(detectionExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedEslintConfig.value = Prism.highlight(eslintConfigSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Проблемы использования прототипов у глобальных объектов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Модификация встроенных прототипов</b> (Array.prototype, Object.prototype, String.prototype) считается
              плохой практикой в JavaScript. Это может привести к конфликтам, непредсказуемому поведению и проблемам
              с совместимостью. Разберем основные проблемы и альтернативные решения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Проблематичный подход</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Опасно:</strong> Модификация глобальных прототипов влияет на все объекты данного типа во всем приложении!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBadExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные проблемы</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-earth-off</v-icon>
                    <h3 class="text-h6 font-weight-bold">Глобальное загрязнение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Методы появляются во всех объектах</li>
                    <li>Ломается цикл <code>for...in</code></li>
                    <li>Нарушается принцип изоляции</li>
                    <li>Влияние на сторонние библиотеки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-alert-triangle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Конфликты</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Несовместимость библиотек</li>
                    <li>Перезапись существующих методов</li>
                    <li>Непредсказуемое поведение</li>
                    <li>Сложность отладки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Проблема 1: Загрязнение и циклы</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedProblemsExample"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Проблема 2: Безопасность и встроенные методы</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurityExample"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Проблема 3: Конфликты библиотек</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLibraryConflict"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">✅ Правильные альтернативы</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Рекомендуется:</strong> Используйте утилитарные функции, классы или композицию вместо модификации прототипов
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedGoodExample"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Примеры использования альтернатив</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUsageExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Обнаружение и защита</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedDetectionExample"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Настройка линтеров для предотвращения</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEslintConfig"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Модификация прототипов</b></td>
                <td class="text-success">Удобный синтаксис</td>
                <td class="text-error">Глобальные конфликты, небезопасно</td>
                <td class="text-error">❌ Не рекомендуется</td>
              </tr>
              <tr>
                <td><b>Утилитарные функции</b></td>
                <td class="text-success">Безопасно, предсказуемо</td>
                <td class="text-warning">Менее удобный синтаксис</td>
                <td class="text-success">✅ Рекомендуется</td>
              </tr>
              <tr>
                <td><b>Расширение классов</b></td>
                <td class="text-success">OOP подход, типизация</td>
                <td class="text-warning">Больше кода</td>
                <td class="text-success">✅ Хорошо для новых классов</td>
              </tr>
              <tr>
                <td><b>Композиция</b></td>
                <td class="text-success">Гибкость, инкапсуляция</td>
                <td class="text-warning">Сложнее понимание</td>
                <td class="text-success">✅ Для сложных случаев</td>
              </tr>
              <tr>
                <td><b>Symbol методы</b></td>
                <td class="text-success">Уникальность, нет конфликтов</td>
                <td class="text-warning">Менее читаемо</td>
                <td class="text-info">🔄 В особых случаях</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя модифицировать Object.prototype?</p>
                <p class="font-weight-regular ma-0">
                  Потому что Object.prototype находится в цепочке прототипов всех объектов в JavaScript.
                  Любые добавленные свойства появятся во всех объектах и будут видны в циклах for...in,
                  что может сломать логику приложения и сторонних библиотек.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет, если две библиотеки добавят метод с одинаковым именем?</p>
                <p class="font-weight-regular ma-0">
                  Возникнет конфликт — последняя загруженная библиотека перезапишет метод первой.
                  Это приведет к неожиданному поведению и ошибкам, которые сложно отладить.
                  Поэтому лучше использовать пространства имен и утилитарные функции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить, не была ли модифицирована цепочка прототипов?</p>
                <p class="font-weight-regular ma-0">
                  Можно сохранить ссылки на оригинальные методы при загрузке и сравнивать с текущими:
                  <code>originalHasOwnProperty === Object.prototype.hasOwnProperty</code>.
                  Также можно использовать Object.getOwnPropertyNames() для проверки лишних свойств.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В каких случаях модификация прототипов может быть оправдана?</p>
                <p class="font-weight-regular ma-0">
                  В очень редких случаях: полифиллы для старых браузеров (например, Array.prototype.includes),
                  внутренние фреймворки с полным контролем окружения. Но даже тогда лучше использовать
                  проверку на существование метода и Symbol для уникальности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем Symbol помогает при работе с прототипами?</p>
                <p class="font-weight-regular ma-0">
                  Symbol создает уникальный ключ, который не конфликтует с строковыми свойствами
                  и не появляется в циклах for...in или Object.keys(). Это делает расширение
                  прототипов более безопасным, но менее читаемым.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать объект без прототипа?</p>
                <p class="font-weight-regular ma-0">
                  Используйте <code>Object.create(null)</code> — это создает объект без цепочки прототипов.
                  У такого объекта не будет методов toString(), hasOwnProperty() и других встроенных методов,
                  что полезно для создания чистых словарей или мапов.
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
                    <li>Утилитарные функции/модули</li>
                    <li>Расширение через классы</li>
                    <li>Композиция объектов</li>
                    <li>Использование TypeScript</li>
                    <li>Настройка ESLint правил</li>
                    <li>Object.create(null) для словарей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Модификация Object.prototype</li>
                    <li>Изменение встроенных методов</li>
                    <li>Добавление методов в Array.prototype</li>
                    <li>Переопределение hasOwnProperty</li>
                    <li>Изменение String.prototype</li>
                    <li>Monkey patching без необходимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Исключения</h3>
                  <ul class="text-left pl-4">
                    <li>Полифиллы с проверкой существования</li>
                    <li>Symbol методы для фреймворков</li>
                    <li>Внутренние API с полным контролем</li>
                    <li>Миграция legacy кода</li>
                    <li>Специфичные библиотечные нужды</li>
                    <li>Временные решения с планом рефакторинга</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Модификация глобальных прототипов</b> — это антипаттерн, который может привести к непредсказуемому
              поведению, конфликтам библиотек и проблемам безопасности. Современный JavaScript предлагает множество
              безопасных альтернатив: утилитарные функции, классы, композицию и модули. Использование этих подходов
              делает код более предсказуемым, безопасным и совместимым.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
                target="_blank"
                class="mr-2">
                MDN: Prototype Chain
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://eslint.org/docs/rules/no-extend-native"
                target="_blank">
                ESLint: no-extend-native
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
