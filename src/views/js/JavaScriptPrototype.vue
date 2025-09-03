<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicPrototypeSnippet = `
// Каждая функция в JavaScript имеет свойство prototype
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Добавляем метод в прототип
Person.prototype.greet = function() {
  return \`Привет, меня зовут \${this.name}\`;
};

Person.prototype.getAge = function() {
  return this.age;
};

// Создаем экземпляры
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.greet()); // "Привет, меня зовут John"
console.log(jane.getAge()); // 25

// Методы находятся в прототипе, а не в каждом экземпляре
console.log(john.hasOwnProperty('greet')); // false
console.log(john.__proto__.hasOwnProperty('greet')); // true
`

const prototypeChainSnippet = `
// Цепочка прототипов (Prototype Chain)

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return \`\${this.name} ест\`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Вызываем родительский конструктор
  this.breed = breed;
}

// Наследование: связываем прототипы
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Добавляем уникальный метод для Dog
Dog.prototype.bark = function() {
  return \`\${this.name} лает\`;
};

const dog = new Dog('Бобик', 'Овчарка');

console.log(dog.eat());  // "Бобик ест" (из Animal.prototype)
console.log(dog.bark()); // "Бобик лает" (из Dog.prototype)
console.log(dog.name);   // "Бобик" (собственное свойство)

// Цепочка поиска:
// dog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
`

const objectPrototypeSnippet = `
// Работа с Object.prototype и __proto__

const obj = {
  name: 'Test'
};

// Все объекты наследуют от Object.prototype
console.log(obj.toString()); // "[object Object]" - метод из Object.prototype
console.log(obj.hasOwnProperty('name')); // true - метод из Object.prototype

// __proto__ - ссылка на прототип объекта (не стандарт, но широко поддерживается)
console.log(obj.__proto__ === Object.prototype); // true

// Современные способы работы с прототипами
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// Создание объекта с определенным прототипом
const prototypeObj = {
  greet() {
    return 'Привет!';
  }
};

const newObj = Object.create(prototypeObj);
newObj.name = 'Test';

console.log(newObj.greet()); // "Привет!" - из прототипа
console.log(newObj.hasOwnProperty('name')); // true
console.log(newObj.hasOwnProperty('greet')); // false
`

const modernSyntaxSnippet = `
// Современный синтаксис классов (ES6+) - это синтаксический сахар над прототипами

class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return \`\${this.name} ест\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Вызов родительского конструктора
    this.breed = breed;
  }

  bark() {
    return \`\${this.name} лает\`;
  }
}

const dog = new Dog('Рекс', 'Лабрадор');

// Под капотом это всё те же прототипы!
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(Dog.prototype.isPrototypeOf(dog)); // true
console.log(Animal.prototype.isPrototypeOf(dog)); // true

// Методы находятся в прототипах
console.log(dog.hasOwnProperty('bark')); // false
console.log(Dog.prototype.hasOwnProperty('bark')); // true
`

const prototypePollutionSnippet = `
// Осторожно! Изменение встроенных прототипов (Prototype Pollution)

// ❌ ПЛОХО - изменение Object.prototype влияет на ВСЕ объекты
Object.prototype.customMethod = function() {
  return 'Я везде!';
};

const obj1 = {};
const obj2 = { name: 'test' };

console.log(obj1.customMethod()); // "Я везде!"
console.log(obj2.customMethod()); // "Я везде!"

// Удаляем для безопасности
delete Object.prototype.customMethod;

// ✅ ХОРОШО - создание собственных прототипов
const MyPrototype = {
  customMethod() {
    return 'Только где нужно';
  }
};

const safeObj = Object.create(MyPrototype);
console.log(safeObj.customMethod()); // "Только где нужно"
`

const practicalExampleSnippet = `
// Практический пример: система событий

function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
  return this; // Для chaining
};

EventEmitter.prototype.emit = function(event, ...args) {
  if (this.events[event]) {
    this.events[event].forEach(listener => {
      listener.apply(this, args);
    });
  }
  return this;
};

EventEmitter.prototype.off = function(event, listener) {
  if (this.events[event]) {
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
  return this;
};

// Использование
const emitter = new EventEmitter();

const handler = (data) => console.log('Получен:', data);

emitter
  .on('test', handler)
  .on('test', (data) => console.log('Второй обработчик:', data))
  .emit('test', 'Hello World!');

// Все экземпляры EventEmitter получают эти методы через прототип
// но имеют свое собственное состояние (this.events)
`

const highlightedBasicPrototype = ref('')
const highlightedPrototypeChain = ref('')
const highlightedObjectPrototype = ref('')
const highlightedModernSyntax = ref('')
const highlightedPrototypePollution = ref('')
const highlightedPracticalExample = ref('')

onMounted(() => {
  highlightedBasicPrototype.value = Prism.highlight(basicPrototypeSnippet, Prism.languages.javascript, 'javascript')
  highlightedPrototypeChain.value = Prism.highlight(prototypeChainSnippet, Prism.languages.javascript, 'javascript')
  highlightedObjectPrototype.value = Prism.highlight(objectPrototypeSnippet, Prism.languages.javascript, 'javascript')
  highlightedModernSyntax.value = Prism.highlight(modernSyntaxSnippet, Prism.languages.javascript, 'javascript')
  highlightedPrototypePollution.value = Prism.highlight(prototypePollutionSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExample.value = Prism.highlight(practicalExampleSnippet, Prism.languages.javascript, 'javascript')
})

const activeTab = ref('step1')

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript: Что такое prototype?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Prototype (прототип)</b> — это фундаментальный механизм JavaScript для наследования и переиспользования кода.
              Каждый объект в JavaScript имеет скрытую ссылку на другой объект, называемый его прототипом.
              Когда свойство или метод не найдены в объекте, JavaScript ищет их в цепочке прототипов.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы: функции-конструкторы и prototype</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-function-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold">Function.prototype</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Каждая <strong>функция</strong> имеет свойство prototype</li>
                    <li><strong>Объект</strong>, который станет прототипом экземпляров</li>
                    <li><strong>Методы</strong> добавляются в prototype</li>
                    <li><strong>Переиспользование</strong> между экземплярами</li>
                    <li><strong>Экономия памяти</strong> — один метод для всех</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-link-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold">[[Prototype]]</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Каждый <strong>объект</strong> имеет внутреннюю ссылку [[Prototype]]</li>
                    <li><strong>Доступ</strong> через __proto__ или Object.getPrototypeOf()</li>
                    <li><strong>Цепочка поиска</strong> свойств и методов</li>
                    <li><strong>Наследование</strong> свойств от прототипа</li>
                    <li><strong>Автоматическое</strong> связывание при new</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicPrototype"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Цепочка прототипов (Prototype Chain)</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевой принцип:</strong> Когда JavaScript не находит свойство в объекте, он ищет его в прототипе объекта, затем в прототипе прототипа, и так далее до Object.prototype.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPrototypeChain"></code></pre>

            <!-- Альтернативный вариант с табами -->
            <h2 class="text-h5 font-weight-bold mb-3">Как работает поиск свойств</h2>

            <v-card class="mb-8">
              <v-tabs v-model="activeTab" bg-color="primary" grow>
                <v-tab value="step1" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-numeric-1-circle</v-icon>
                  Объект
                </v-tab>
                <v-tab value="step2" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-numeric-2-circle</v-icon>
                  Прототип
                </v-tab>
                <v-tab value="step3" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-numeric-3-circle</v-icon>
                  Прототип прототипа
                </v-tab>
                <v-tab value="step4" class="font-weight-bold">
                  <v-icon class="mr-2">mdi-stop-circle</v-icon>
                  null
                </v-tab>
              </v-tabs>

              <v-window v-model="activeTab">
                <v-window-item value="step1">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="primary" size="large" class="mr-4">
                        <v-icon size="large" color="white">mdi-numeric-1</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h6 font-weight-bold">Поиск в самом объекте</h3>
                        <p class="text-body-2 text-grey-600 ma-0">Первый этап поиска свойства</p>
                      </div>
                    </div>

                    <p class="text-body-1 mb-3">
                      Сначала JavaScript ищет свойство в <strong>собственных свойствах</strong> объекта.
                    </p>

                    <v-alert color="primary" variant="tonal" class="mb-3">
                      <template v-slot:prepend>
                        <v-icon>mdi-code-tags</v-icon>
                      </template>
                      <code>obj.hasOwnProperty('property')</code>
                    </v-alert>

                    <p class="text-body-2">
                      <v-icon color="success" class="mr-1">mdi-check-circle</v-icon>
                      Если свойство найдено здесь, поиск <strong>завершается успешно</strong>
                    </p>
                    <p class="text-body-2">
                      <v-icon color="info" class="mr-1">mdi-arrow-right-circle</v-icon>
                      Если нет — переходим к следующему шагу
                    </p>
                  </div>
                </v-window-item>

                <v-window-item value="step2">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="success" size="large" class="mr-4">
                        <v-icon size="large" color="white">mdi-numeric-2</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h6 font-weight-bold">Поиск в прототипе</h3>
                        <p class="text-body-2 text-grey-600 ma-0">Второй этап — поиск в [[Prototype]]</p>
                      </div>
                    </div>

                    <p class="text-body-1 mb-3">
                      Если не найдено, ищет в объекте, на который ссылается <strong>[[Prototype]]</strong>.
                    </p>

                    <v-alert color="success" variant="tonal" class="mb-3">
                      <template v-slot:prepend>
                        <v-icon>mdi-link-variant</v-icon>
                      </template>
                      <code>obj.__proto__</code> или <code>Object.getPrototypeOf(obj)</code>
                    </v-alert>

                    <p class="text-body-2">
                      <v-icon color="info" class="mr-1">mdi-information</v-icon>
                      Например, методы из <code>Constructor.prototype</code> будут найдены на этом шаге
                    </p>
                  </div>
                </v-window-item>

                <v-window-item value="step3">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="info" size="large" class="mr-4">
                        <v-icon size="large" color="white">mdi-numeric-3</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h6 font-weight-bold">Поиск выше по цепочке</h3>
                        <p class="text-body-2 text-grey-600 ma-0">Рекурсивный поиск по всей цепочке</p>
                      </div>
                    </div>

                    <p class="text-body-1 mb-3">
                      Процесс повторяется <strong>рекурсивно</strong> по всей цепочке прототипов.
                    </p>

                    <v-alert color="info" variant="tonal" class="mb-3">
                      <template v-slot:prepend>
                        <v-icon>mdi-sitemap</v-icon>
                      </template>
                      <code>obj → Constructor.prototype → Object.prototype</code>
                    </v-alert>

                    <p class="text-body-2">
                      <v-icon color="warning" class="mr-1">mdi-star</v-icon>
                      Здесь будут найдены встроенные методы: <code>toString()</code>, <code>hasOwnProperty()</code> и др.
                    </p>
                  </div>
                </v-window-item>

                <v-window-item value="step4">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="error" size="large" class="mr-4">
                        <v-icon size="large" color="white">mdi-stop</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h6 font-weight-bold">Конец цепочки</h3>
                        <p class="text-body-2 text-grey-600 ma-0">Финальный этап поиска</p>
                      </div>
                    </div>

                    <p class="text-body-1 mb-3">
                      Если дошли до <strong>null</strong> (конец цепочки), свойство не найдено.
                    </p>

                    <v-alert color="error" variant="tonal" class="mb-3">
                      <template v-slot:prepend>
                        <v-icon>mdi-null</v-icon>
                      </template>
                      <code>Object.prototype.__proto__ === null</code>
                    </v-alert>

                    <p class="text-body-2">
                      <v-icon color="error" class="mr-1">mdi-close-circle</v-icon>
                      Возвращается <code>undefined</code> при обращении к несуществующему свойству
                    </p>
                  </div>
                </v-window-item>
              </v-window>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Object.prototype и встроенные методы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedObjectPrototype"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Классы ES6+ — синтаксический сахар</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Классы в JavaScript — это синтаксический сахар над прототипами. Под капотом всё работает через прототипы!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedModernSyntax"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">⚠️ Prototype Pollution — угроза безопасности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPrototypePollution"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример: EventEmitter</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между __proto__ и prototype?</p>
                <p class="font-weight-regular ma-0">
                  <code>prototype</code> — это свойство функций-конструкторов, объект, который станет прототипом для экземпляров.
                  <code>__proto__</code> — это ссылка на прототип конкретного объекта. У каждого объекта есть __proto__, но prototype только у функций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при вызове new Constructor()?</p>
                <p class="font-weight-regular ma-0">
                  1. Создается новый объект; 2. Его [[Prototype]] устанавливается на Constructor.prototype;
                  3. Constructor вызывается с this = новый объект; 4. Возвращается объект (если конструктор не вернул свой объект).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать наследование через прототипы?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>Object.create()</code>: Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child;
                  Или современный синтаксис: class Child extends Parent.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается hasOwnProperty от обычной проверки свойства?</p>
                <p class="font-weight-regular ma-0">
                  <code>obj.hasOwnProperty('prop')</code> проверяет только собственные свойства объекта.
                  <code>'prop' in obj</code> или <code>obj.prop</code> ищут по всей цепочке прототипов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать объект без прототипа?</p>
                <p class="font-weight-regular ma-0">
                  <code>Object.create(null)</code> создает объект без прототипа. У такого объекта нет встроенных методов
                  как toString(), но он идеален для словарей/хеш-таблиц, чтобы избежать конфликтов с ключами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Prototype Pollution атака?</p>
                <p class="font-weight-regular ma-0">
                  Уязвимость, когда злоумышленник может изменить Object.prototype, добавив вредоносные свойства,
                  которые наследуются всеми объектами. Защита: валидация входных данных, Object.create(null), Object.freeze().
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли изменить прототип существующего объекта?</p>
                <p class="font-weight-regular ma-0">
                  Да, через Object.setPrototypeOf(obj, newProto) или obj.__proto__ = newProto (deprecated).
                  Но это медленная операция, лучше устанавливать прототип при создании через Object.create().
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Методы работы с прототипами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
                <th class="text-left font-weight-bold">Рекомендация</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>Object.create(proto)</code></td>
                <td>Создает объект с указанным прототипом</td>
                <td><code>Object.create(Animal.prototype)</code></td>
                <td class="text-success"><b>✅ Использовать</b></td>
              </tr>
              <tr>
                <td><code>Object.getPrototypeOf(obj)</code></td>
                <td>Получает прототип объекта</td>
                <td><code>Object.getPrototypeOf(dog)</code></td>
                <td class="text-success"><b>✅ Использовать</b></td>
              </tr>
              <tr>
                <td><code>Object.setPrototypeOf(obj, proto)</code></td>
                <td>Изменяет прототип объекта</td>
                <td><code>Object.setPrototypeOf(obj, proto)</code></td>
                <td class="text-warning"><b>⚠️ Осторожно</b></td>
              </tr>
              <tr>
                <td><code>obj.__proto__</code></td>
                <td>Доступ к прототипу (legacy)</td>
                <td><code>obj.__proto__.method</code></td>
                <td class="text-error"><b>❌ Deprecated</b></td>
              </tr>
              <tr>
                <td><code>obj.isPrototypeOf(other)</code></td>
                <td>Проверяет, является ли объект прототипом</td>
                <td><code>Animal.prototype.isPrototypeOf(dog)</code></td>
                <td class="text-success"><b>✅ Использовать</b></td>
              </tr>
              <tr>
                <td><code>obj instanceof Constructor</code></td>
                <td>Проверяет принадлежность к конструктору</td>
                <td><code>dog instanceof Animal</code></td>
                <td class="text-success"><b>✅ Использовать</b></td>
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
                    <li>Использовать классы ES6+ для наследования</li>
                    <li>Применять Object.create() для прототипов</li>
                    <li>Добавлять методы в prototype, а не в конструктор</li>
                    <li>Использовать hasOwnProperty() для проверки</li>
                    <li>Понимать цепочку прототипов</li>
                    <li>Проверять instanceof для типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Изменения Object.prototype</li>
                    <li>Использования __proto__ в продакшене</li>
                    <li>Забывания про prototype.constructor</li>
                    <li>Создания слишком длинных цепочек</li>
                    <li>Частого использования setPrototypeOf</li>
                    <li>Смешивания функций и стрелочных функций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите встроенные прототипы (Array, Object)</li>
                    <li>Используйте полифиллы для понимания</li>
                    <li>Практикуйтесь с наследованием</li>
                    <li>Изучите паттерны JavaScript</li>
                    <li>Понимайте производительность</li>
                    <li>Осторожно с безопасностью</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Визуализация цепочки прототипов</h2>
            <v-row class="mb-8">
              <v-col cols="12">
                <v-card class="pa-4">
                  <div class="text-center">
                    <div class="d-flex justify-center align-center mb-4">
                      <v-chip color="primary" class="mr-2">dog</v-chip>
                      <v-icon>mdi-arrow-right</v-icon>
                      <v-chip color="success" class="mx-2">Dog.prototype</v-chip>
                      <v-icon>mdi-arrow-right</v-icon>
                      <v-chip color="info" class="mx-2">Animal.prototype</v-chip>
                      <v-icon>mdi-arrow-right</v-icon>
                      <v-chip color="warning" class="mx-2">Object.prototype</v-chip>
                      <v-icon>mdi-arrow-right</v-icon>
                      <v-chip color="error" class="ml-2">null</v-chip>
                    </div>
                    <p class="text-body-2 text-grey-600">
                      При поиске свойства JavaScript проходит по этой цепочке слева направо
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Prototype</b> — это основа ООП в JavaScript. Он позволяет объектам наследовать свойства и методы
              друг от друга через цепочку прототипов. Понимание прототипов критически важно для эффективной
              работы с JavaScript, написания качественного кода и прохождения собеседований.
              Современные классы ES6+ — это удобный синтаксис, но под капотом всё равно работают прототипы.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
                target="_blank"
                class="mr-2">
                MDN Prototype Chain
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://javascript.info/prototypes"
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
