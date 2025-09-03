<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const prototypeSnippet = `
// Свойство prototype есть только у функций-конструкторов
function Person(name) {
  this.name = name;
}

// Добавляем метод в prototype
Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

// Проверяем наличие prototype
console.log(Person.prototype); // { greet: function, constructor: Person }
console.log(typeof Person.prototype); // "object"

// У обычных объектов нет prototype
const obj = {};
console.log(obj.prototype); // undefined
`

const protoSnippet = `
// __proto__ есть у всех объектов (экземпляров)
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

const john = new Person("John");

// __proto__ указывает на prototype конструктора
console.log(john.__proto__ === Person.prototype); // true
console.log(john.__proto__.greet); // function
console.log(john.greet()); // "Hello, I'm John"

// У любого объекта есть __proto__
const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype); // true

const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
`

const chainSnippet = `
// Цепочка прототипов в действии
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return \`\${this.name} is eating\`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Устанавливаем наследование
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return \`\${this.name} is barking\`;
};

const rex = new Dog("Rex", "German Shepherd");

console.log(rex.name); // "Rex"
console.log(rex.bark()); // "Rex is barking"
console.log(rex.eat()); // "Rex is eating"

// Цепочка прототипов:
console.log(rex.__proto__ === Dog.prototype); // true
console.log(rex.__proto__.__proto__ === Animal.prototype); // true
console.log(rex.__proto__.__proto__.__proto__ === Object.prototype); // true
console.log(rex.__proto__.__proto__.__proto__.__proto__ === null); // true
`

const modernSyntaxSnippet = `
// Современный синтаксис ES6+ классов
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return \`\${this.name} is eating\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    return \`\${this.name} is barking\`;
  }
}

const rex = new Dog("Rex", "German Shepherd");

// Под капотом все тот же prototype механизм
console.log(rex.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.constructor === Animal); // true
`

const getterSetterSnippet = `
// Object.getPrototypeOf и Object.setPrototypeOf
const animal = {
  type: 'animal',
  speak() {
    return 'Some sound';
  }
};

const dog = Object.create(animal);
dog.name = 'Rex';

// Получение прототипа (современный способ)
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(dog.__proto__ === animal); // true (устаревший)

// Установка прототипа (осторожно!)
const cat = { name: 'Whiskers' };
Object.setPrototypeOf(cat, animal);
console.log(cat.speak()); // "Some sound"

// Проверка наследования
console.log(dog.isPrototypeOf === undefined); // true (у экземпляров нет)
console.log(animal.isPrototypeOf(dog)); // true
console.log(Animal.prototype.isPrototypeOf(rex)); // true
`

const practicalExampleSnippet = `
// Практический пример: добавление методов к встроенным типам
// ⚠️ Осторожно в реальных проектах!

// Добавляем метод к Array.prototype
Array.prototype.last = function() {
  return this[this.length - 1];
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.last()); // 5

// У всех массивов теперь есть метод last
const colors = ['red', 'green', 'blue'];
console.log(colors.last()); // 'blue'

// Проверяем цепочку
console.log(numbers.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

// Полифил для старых браузеров
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}
`

const highlightedPrototype = ref('')
const highlightedProto = ref('')
const highlightedChain = ref('')
const highlightedModern = ref('')
const highlightedGetterSetter = ref('')
const highlightedPractical = ref('')

onMounted(() => {
  highlightedPrototype.value = Prism.highlight(
    prototypeSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedProto.value = Prism.highlight(protoSnippet, Prism.languages.javascript, 'javascript')
  highlightedChain.value = Prism.highlight(chainSnippet, Prism.languages.javascript, 'javascript')
  highlightedModern.value = Prism.highlight(
    modernSyntaxSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedGetterSetter.value = Prism.highlight(
    getterSetterSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedPractical.value = Prism.highlight(
    practicalExampleSnippet,
    Prism.languages.javascript,
    'javascript',
  )
})

const activeConstructorStep = ref('step1')
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">JavaScript: __proto__ vs prototype</h1>

            <p class="font-weight-regular mb-6">
              <b>Главное различие:</b> <code>prototype</code> — свойство функций-конструкторов,
              <code>__proto__</code> — свойство экземпляров объектов. Это один из самых частых
              вопросов на собеседованиях по JavaScript, особенно в контексте наследования и ООП.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-primary">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-function-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">prototype</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Есть только у функций</strong></li>
                    <li><strong>Шаблон для объектов</strong></li>
                    <li><strong>Используется при new</strong></li>
                    <li><strong>Содержит методы класса</strong></li>
                    <li><strong>Можно модифицировать</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-link-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">__proto__</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Есть у всех объектов</strong></li>
                    <li><strong>Ссылка на прототип</strong></li>
                    <li><strong>Реальная связь наследования</strong></li>
                    <li><strong>Часть цепочки прототипов</strong></li>
                    <li><strong>Устаревшее свойство</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">prototype — свойство функций</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>prototype</strong> существует только у функций-конструкторов и содержит методы
              и свойства, которые будут доступны всем экземплярам.
            </v-alert>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPrototype"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">__proto__ — свойство экземпляров</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>__proto__</strong> есть у всех объектов и указывает на prototype их
              конструктора. Это устаревшее свойство, используйте Object.getPrototypeOf().
            </v-alert>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedProto"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Цепочка прототипов в действии</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedChain"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Современный синтаксис классов</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedModern"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Современные способы работы с прототипами</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedGetterSetter"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как это работает под капотом</h2>

            <v-card class="mb-8">
              <v-tabs v-model="activeConstructorStep" bg-color="primary" grow>
                <v-tab value="step1" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-plus-circle</v-icon>
                  new Constructor()
                </v-tab>
                <v-tab value="step2" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-cube-outline</v-icon>
                  Создание
                </v-tab>
                <v-tab value="step3" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-link-variant</v-icon>
                  Связывание
                </v-tab>
                <v-tab value="step4" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-play-circle</v-icon>
                  Инициализация
                </v-tab>
              </v-tabs>

              <v-window v-model="activeConstructorStep">
                <v-window-item value="step1">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-icon size="48" color="primary" class="mr-4">mdi-rocket-launch</v-icon>
                      <div>
                        <h3 class="text-h5 font-weight-bold mb-1">Шаг 1: Вызов new Constructor()</h3>
                        <p class="text-body-1 text-grey-600 ma-0">Начало процесса создания объекта</p>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="8">
                        <p class="text-body-1 mb-4">
                          JavaScript видит ключевое слово <code>new</code> перед вызовом функции и запускает
                          <strong>специальный алгоритм создания объекта</strong>.
                        </p>

                        <v-alert color="primary" variant="outlined" class="mb-4">
                          <template v-slot:prepend>
                            <v-icon>mdi-code-tags</v-icon>
                          </template>
                          <div>
                            <p class="font-weight-bold mb-1">Пример вызова:</p>
                            <code class="text-h6">const john = new Person('John', 30)</code>
                          </div>
                        </v-alert>

                        <div class="bg-grey-lighten-4 pa-3 rounded mb-3">
                          <p class="text-body-2 ma-0">
                            <v-icon color="info" size="small" class="mr-1">mdi-lightbulb</v-icon>
                            <strong>Важно:</strong> Без <code>new</code> функция выполнится как обычная функция,
                            и <code>this</code> будет указывать на глобальный объект или <code>undefined</code> в strict mode.
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card color="primary" variant="tonal" class="pa-4 text-center">
                          <v-icon size="64" color="primary" class="mb-2">mdi-play-box</v-icon>
                          <h4 class="font-weight-bold">Статус</h4>
                          <p class="ma-0">Запуск алгоритма new</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-window-item>

                <v-window-item value="step2">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-icon size="48" color="success" class="mr-4">mdi-cube-send</v-icon>
                      <div>
                        <h3 class="text-h5 font-weight-bold mb-1">Шаг 2: Создание пустого объекта</h3>
                        <p class="text-body-1 text-grey-600 ma-0">Выделение памяти под новый объект</p>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="8">
                        <p class="text-body-1 mb-4">
                          Создается новый <strong>пустой объект</strong>, который станет результатом операции <code>new</code>.
                          Этот объект пока не имеет собственных свойств, но уже существует в памяти.
                        </p>

                        <v-alert color="success" variant="outlined" class="mb-4">
                          <template v-slot:prepend>
                            <v-icon>mdi-cube-outline</v-icon>
                          </template>
                          <div>
                            <p class="font-weight-bold mb-1">Псевдокод:</p>
                            <code class="text-h6">const newInstance = {}</code>
                          </div>
                        </v-alert>

                        <div class="bg-success-lighten-4 pa-3 rounded mb-3">
                          <p class="text-body-2 ma-0">
                            <v-icon color="success" size="small" class="mr-1">mdi-check-circle</v-icon>
                            Объект создан и готов для дальнейшей настройки
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card color="success" variant="tonal" class="pa-4 text-center">
                          <v-icon size="64" color="success" class="mb-2">mdi-checkbox-marked</v-icon>
                          <h4 class="font-weight-bold">Статус</h4>
                          <p class="ma-0">Объект создан</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-window-item>

                <v-window-item value="step3">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-icon size="48" color="info" class="mr-4">mdi-link-variant</v-icon>
                      <div>
                        <h3 class="text-h5 font-weight-bold mb-1">Шаг 3: Установка __proto__</h3>
                        <p class="text-body-1 text-grey-600 ma-0">Связывание с прототипом конструктора</p>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="8">
                        <p class="text-body-1 mb-4">
                          <code>__proto__</code> нового объекта устанавливается равным <code>Constructor.prototype</code>.
                          Это создает <strong>связь наследования</strong> между объектом и прототипом.
                        </p>

                        <v-alert color="info" variant="outlined" class="mb-4">
                          <template v-slot:prepend>
                            <v-icon>mdi-link</v-icon>
                          </template>
                          <div>
                            <p class="font-weight-bold mb-1">Связывание:</p>
                            <code class="text-h6">newInstance.__proto__ = Constructor.prototype</code>
                          </div>
                        </v-alert>

                        <div class="bg-info-lighten-4 pa-3 rounded mb-3">
                          <p class="text-body-2 ma-0">
                            <v-icon color="info" size="small" class="mr-1">mdi-star</v-icon>
                            Теперь объект <strong>наследует все методы</strong> из прототипа конструктора
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card color="info" variant="tonal" class="pa-4 text-center">
                          <v-icon size="64" color="info" class="mb-2">mdi-connection</v-icon>
                          <h4 class="font-weight-bold">Статус</h4>
                          <p class="ma-0">Прототип связан</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-window-item>

                <v-window-item value="step4">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-icon size="48" color="warning" class="mr-4">mdi-cog</v-icon>
                      <div>
                        <h3 class="text-h5 font-weight-bold mb-1">Шаг 4: Выполнение конструктора</h3>
                        <p class="text-body-1 text-grey-600 ma-0">Инициализация объекта собственными свойствами</p>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="8">
                        <p class="text-body-1 mb-4">
                          Функция-конструктор выполняется с <code>this = newInstance</code>.
                          В этот момент объект получает свои <strong>собственные свойства</strong>.
                        </p>

                        <v-alert color="warning" variant="outlined" class="mb-4">
                          <template v-slot:prepend>
                            <v-icon>mdi-play-circle</v-icon>
                          </template>
                          <div>
                            <p class="font-weight-bold mb-1">Выполнение:</p>
                            <code class="text-h6">Constructor.call(newInstance, ...args)</code>
                          </div>
                        </v-alert>

                        <v-list class="bg-grey-lighten-5 rounded">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon color="success">mdi-check-circle</v-icon>
                            </template>
                            <v-list-item-title>Объект получает собственные свойства (name, age и т.д.)</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon color="info">mdi-arrow-right-circle</v-icon>
                            </template>
                            <v-list-item-title>Возвращается готовый объект со всеми свойствами и методами</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card color="success" class="pa-4 text-center text-white">
                          <v-icon size="64" color="white" class="mb-2">mdi-check-all</v-icon>
                          <h4 class="font-weight-bold">Готово!</h4>
                          <p class="ma-0">Объект создан</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-window-item>
              </v-window>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между __proto__ и prototype?</p>
                <p class="font-weight-regular ma-0">
                  <code>prototype</code> — свойство функций-конструкторов, шаблон для создаваемых
                  объектов. <code>__proto__</code> — свойство экземпляров, ссылка на prototype
                  конструктора.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое цепочка прототипов?</p>
                <p class="font-weight-regular ma-0">
                  Механизм наследования в JavaScript. Если свойство не найдено в объекте, поиск
                  продолжается по __proto__ до Object.prototype, затем null.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать объект без прототипа?</p>
                <p class="font-weight-regular ma-0">
                  <code>const obj = Object.create(null)</code> — создает объект без __proto__,
                  полностью "чистый" объект без наследования от Object.prototype.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему __proto__ считается устаревшим?</p>
                <p class="font-weight-regular ma-0">
                  Это не стандартизованное свойство, хотя поддерживается браузерами. Используйте
                  Object.getPrototypeOf() и Object.setPrototypeOf().
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при obj.method()?</p>
                <p class="font-weight-regular ma-0">
                  Поиск метода: сначала в obj, затем в obj.__proto__, затем в
                  obj.__proto__.__proto__ и так далее по цепочке до null.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Можно ли изменить prototype после создания объектов?
                </p>
                <p class="font-weight-regular ma-0">
                  Да! Изменения в Constructor.prototype влияют на все существующие и будущие
                  экземпляры. Но изменение __proto__ конкретного объекта влияет только на него.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить наследование?</p>
                <p class="font-weight-regular ma-0">
                  <code>instanceof</code> — проверяет цепочку прототипов:
                  <code>obj instanceof Constructor</code>. Также:
                  <code>Constructor.prototype.isPrototypeOf(obj)</code>
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Свойство</th>
                  <th class="text-left font-weight-bold">prototype</th>
                  <th class="text-left font-weight-bold">__proto__</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Где существует</b></td>
                  <td>Только у функций</td>
                  <td>У всех объектов</td>
                </tr>
                <tr>
                  <td><b>Тип</b></td>
                  <td>Объект с методами класса</td>
                  <td>Ссылка на прототип</td>
                </tr>
                <tr>
                  <td><b>Назначение</b></td>
                  <td>Шаблон для экземпляров</td>
                  <td>Связь в цепочке наследования</td>
                </tr>
                <tr>
                  <td><b>Изменяемость</b></td>
                  <td>Да, влияет на все экземпляры</td>
                  <td>Да, влияет на конкретный объект</td>
                </tr>
                <tr>
                  <td><b>Стандартность</b></td>
                  <td>Стандартное свойство</td>
                  <td>Устаревшее, используйте Object.getPrototypeOf()</td>
                </tr>
                <tr>
                  <td><b>Использование</b></td>
                  <td>Определение методов класса</td>
                  <td>Навигация по цепочке прототипов</td>
                </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры проверки на собеседовании</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-code-braces</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Код на доске</h3>
                  <p class="text-body-2">
                    Что выведет console.log?<br />
                    Объяснить цепочку поиска<br />
                    Нарисовать диаграмму связей
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-account-question</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Теоретические вопросы</h3>
                  <p class="text-body-2">
                    Различия в наследовании<br />
                    Производительность поиска<br />
                    Альтернативы __proto__
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-puzzle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Практические задачи</h3>
                  <p class="text-body-2">
                    Реализовать наследование<br />
                    Создать полифил<br />
                    Оптимизировать поиск
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">✅ Рекомендуется</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Используйте классы ES6+ для ООП</li>
                    <li>Object.getPrototypeOf() вместо __proto__</li>
                    <li>Object.create() для создания объектов</li>
                    <li>instanceof для проверки типов</li>
                    <li>hasOwnProperty() для собственных свойств</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">❌ Избегайте</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Прямое использование __proto__</li>
                    <li>Модификация Object.prototype</li>
                    <li>Частое изменение prototype</li>
                    <li>Object.setPrototypeOf() в hot path</li>
                    <li>Глубокие цепочки наследования</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>prototype</b> — это свойство функций-конструкторов, содержащее методы для будущих
              экземпляров. <b>__proto__</b> — это свойство экземпляров, ссылающееся на prototype
              конструктора. Понимание этого различия критично для понимания наследования в
              JavaScript и часто проверяется на собеседованиях. Используйте современные методы
              Object.getPrototypeOf() и классы ES6+.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
                target="_blank"
                class="mr-2"
              >
                MDN: Prototype Chain
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://javascript.info/prototype-inheritance"
                target="_blank"
              >
                JavaScript.info
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
