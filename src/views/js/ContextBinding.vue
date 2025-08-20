<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const callExampleSnippet = `
// call() - вызывает функцию с указанным this
const person1 = {
  name: 'Алиса',
  age: 25
}

const person2 = {
  name: 'Боб',
  age: 30
}

function introduce(greeting, punctuation) {
  return \`\${greeting}! Меня зовут \${this.name}, мне \${this.age} лет\${punctuation}\`
}

// Используем call для привязки контекста
console.log(introduce.call(person1, 'Привет', '!'))
// "Привет! Меня зовут Алиса, мне 25 лет!"

console.log(introduce.call(person2, 'Добро пожаловать', '.'))
// "Добро пожаловать! Меня зовут Боб, мне 30 лет."

// Без привязки контекста (this будет undefined в strict mode)
console.log(introduce('Привет', '!'))
// TypeError: Cannot read property 'name' of undefined
`

const applyExampleSnippet = `
// apply() - то же что call, но аргументы передаются массивом
const calculator = {
  result: 0,
  calculate(operation, numbers) {
    switch(operation) {
      case 'sum':
        this.result = numbers.reduce((a, b) => a + b, 0)
        break
      case 'multiply':
        this.result = numbers.reduce((a, b) => a * b, 1)
        break
    }
    return this.result
  }
}

const mathProcessor = {
  result: 100 // другое начальное значение
}

// call - аргументы по отдельности
calculator.calculate.call(mathProcessor, 'sum', [1, 2, 3, 4, 5])
console.log(mathProcessor.result) // 15

// apply - аргументы массивом
const args = ['multiply', [2, 3, 4]]
calculator.calculate.apply(mathProcessor, args)
console.log(mathProcessor.result) // 24

// Практический пример с Math.max
const numbers = [1, 5, 3, 9, 2, 8]

// Без apply - не работает с массивом
console.log(Math.max(numbers)) // NaN

// С apply - передаем массив как отдельные аргументы
console.log(Math.max.apply(null, numbers)) // 9

// Современная альтернатива с spread
console.log(Math.max(...numbers)) // 9
`

const bindExampleSnippet = `
// bind() - создает новую функцию с привязанным контекстом
const user = {
  firstName: 'Анна',
  lastName: 'Смирнова',
  getFullName() {
    return \`\${this.firstName} \${this.lastName}\`
  }
}

// Проблема: потеря контекста при передаче метода
const getName = user.getFullName
console.log(getName()) // undefined undefined

// Решение: привязка контекста через bind
const boundGetName = user.getFullName.bind(user)
console.log(boundGetName()) // "Анна Смирнова"

// Привязка аргументов (частичное применение)
function multiply(a, b, c) {
  return a * b * c
}

// Привязываем первый аргумент
const multiplyBy2 = multiply.bind(null, 2)
console.log(multiplyBy2(3, 4)) // 24 (2 * 3 * 4)

// Привязываем первые два аргумента
const multiplyBy2And3 = multiply.bind(null, 2, 3)
console.log(multiplyBy2And3(4)) // 24 (2 * 3 * 4)

// Практический пример с событиями
class EventHandler {
  constructor(name) {
    this.name = name
    this.count = 0
  }

  handleClick() {
    this.count++
    console.log(\`\${this.name} clicked \${this.count} times\`)
  }
}

const handler = new EventHandler('Button')

// Без bind - потеря контекста
// button.addEventListener('click', handler.handleClick) // ❌ this будет button

// С bind - сохранение контекста
// button.addEventListener('click', handler.handleClick.bind(handler)) // ✅
`

const comparisonSnippet = `
// Сравнение call, apply, bind

const obj = { value: 42 }

function testFunction(a, b, c) {
  console.log(\`this.value: \${this.value}\`)
  console.log(\`arguments: \${a}, \${b}, \${c}\`)
  return this.value + a + b + c
}

// call - вызывает сразу, аргументы отдельно
console.log('=== CALL ===')
const result1 = testFunction.call(obj, 1, 2, 3)
console.log(\`Result: \${result1}\`) // 48

// apply - вызывает сразу, аргументы массивом
console.log('=== APPLY ===')
const result2 = testFunction.apply(obj, [1, 2, 3])
console.log(\`Result: \${result2}\`) // 48

// bind - возвращает новую функцию
console.log('=== BIND ===')
const boundFunction = testFunction.bind(obj, 1, 2)
const result3 = boundFunction(3) // передаем оставшиеся аргументы
console.log(\`Result: \${result3}\`) // 48

// bind с полной привязкой аргументов
const fullyBound = testFunction.bind(obj, 1, 2, 3)
const result4 = fullyBound()
console.log(\`Result: \${result4}\`) // 48
`

const practicalExamplesSnippet = `
// Практические примеры использования

// 1. Заимствование методов массива
const arrayLikeObject = {
  0: 'first',
  1: 'second',
  2: 'third',
  length: 3
}

// Превращаем в настоящий массив
const realArray = Array.prototype.slice.call(arrayLikeObject)
console.log(realArray) // ['first', 'second', 'third']

// Используем методы массива на NodeList
const divs = document.querySelectorAll('div')
Array.prototype.forEach.call(divs, (div, index) => {
  console.log(\`Div \${index}:\`, div)
})

// 2. Функция debounce с правильным контекстом
function debounce(func, delay) {
  let timeoutId
  return function(...args) {
    const context = this
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

class SearchBox {
  constructor() {
    this.query = ''
  }

  search(value) {
    this.query = value
    console.log(\`Searching for: \${this.query}\`)
  }
}

const searchBox = new SearchBox()
const debouncedSearch = debounce(searchBox.search, 300)

// Привязываем контекст для правильной работы
const boundDebouncedSearch = debouncedSearch.bind(searchBox)

// 3. Цепочка вызовов с разными контекстами
const logger = {
  prefix: '[LOG]',
  log(message) {
    console.log(\`\${this.prefix} \${message}\`)
  }
}

const errorLogger = {
  prefix: '[ERROR]'
}

const warnLogger = {
  prefix: '[WARN]'
}

// Используем один метод с разными контекстами
logger.log.call(errorLogger, 'Something went wrong')  // [ERROR] Something went wrong
logger.log.call(warnLogger, 'This is a warning')     // [WARN] This is a warning

// 4. Полифилл для bind (упрощенная версия)
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context, ...args) {
    const fn = this
    return function(...newArgs) {
      return fn.apply(context, [...args, ...newArgs])
    }
  }
}
`

const arrowFunctionSnippet = `
// Стрелочные функции и контекст

// Обычная функция - контекст определяется при вызове
function regularFunction() {
  console.log('Regular:', this)
}

// Стрелочная функция - контекст берется из окружения
const arrowFunction = () => {
  console.log('Arrow:', this)
}

const obj = {
  name: 'Test Object',

  regularMethod() {
    console.log('Regular method:', this.name) // "Test Object"

    // Проблема с колбэками
    setTimeout(function() {
      console.log('Callback regular:', this.name) // undefined (this = window/global)
    }, 100)

    // Решение 1: стрелочная функция (наследует контекст)
    setTimeout(() => {
      console.log('Callback arrow:', this.name) // "Test Object"
    }, 100)

    // Решение 2: bind
    setTimeout(function() {
      console.log('Callback bound:', this.name) // "Test Object"
    }.bind(this), 100)

    // Решение 3: сохранение контекста в переменной
    const self = this
    setTimeout(function() {
      console.log('Callback self:', self.name) // "Test Object"
    }, 100)
  },

  // Стрелочная функция как метод - НЕ привязывает контекст объекта
  arrowMethod: () => {
    console.log('Arrow method:', this.name) // undefined (this = window/global)
  }
}

// Демонстрация
obj.regularMethod() // работает
obj.arrowMethod()   // this не указывает на obj

// call/apply/bind НЕ работают со стрелочными функциями
const arrowFunc = () => console.log(this)
arrowFunc.call({test: 'value'}) // this остается прежним, не меняется на {test: 'value'}
`

const commonMistakesSnippet = `
// Частые ошибки и их решения

// 1. Потеря контекста при передаче методов
class Component {
  constructor(name) {
    this.name = name
  }

  render() {
    return \`Rendering \${this.name}\`
  }
}

const comp = new Component('MyComponent')

// ❌ Неправильно - потеря контекста
const renderer = comp.render
console.log(renderer()) // TypeError: Cannot read property 'name' of undefined

// ✅ Правильно - привязка контекста
const boundRenderer = comp.render.bind(comp)
console.log(boundRenderer()) // "Rendering MyComponent"

// 2. Неправильное использование в циклах
const buttons = ['Save', 'Cancel', 'Delete']
const handlers = []

// ❌ Неправильно - все функции будут иметь одинаковый контекст
for (let i = 0; i < buttons.length; i++) {
  handlers.push(function() {
    console.log(\`Clicked \${buttons[i]}\`) // i будет undefined
  })
}

// ✅ Правильно - привязка с помощью bind
for (let i = 0; i < buttons.length; i++) {
  handlers.push(function(index) {
    console.log(\`Clicked \${buttons[index]}\`)
  }.bind(null, i))
}

// 3. Проблемы с async/await и контекстом
class ApiClient {
  constructor() {
    this.baseUrl = 'https://api.example.com'
  }

  async fetchData(endpoint) {
    const response = await fetch(\`\${this.baseUrl}/\${endpoint}\`)
    return response.json()
  }

  async processData() {
    // ❌ Потеря контекста при передаче метода
    const promises = ['users', 'posts'].map(this.fetchData)
    // TypeError: Cannot read property 'baseUrl' of undefined

    // ✅ Правильно - привязка контекста
    const promises2 = ['users', 'posts'].map(this.fetchData.bind(this))

    // ✅ Альтернатива - стрелочная функция
    const promises3 = ['users', 'posts'].map(endpoint => this.fetchData(endpoint))

    return Promise.all(promises3)
  }
}

// 4. Неправильное понимание работы call/apply с примитивами
function showType() {
  console.log(typeof this)
  console.log(this)
}

// В строгом режиме
showType.call(5)        // "number", Number {5}
showType.call("hello")  // "string", String {"hello"}
showType.call(true)     // "boolean", Boolean {true}
showType.call(null)     // "object", null
showType.call(undefined) // "undefined", undefined

// В нестрогом режие примитивы оборачиваются в объекты
// null и undefined заменяются на глобальный объект (window)
`

const highlightedCall = ref('')
const highlightedApply = ref('')
const highlightedBind = ref('')
const highlightedComparison = ref('')
const highlightedPractical = ref('')
const highlightedArrow = ref('')
const highlightedMistakes = ref('')

onMounted(() => {
  highlightedCall.value = Prism.highlight(callExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedApply.value = Prism.highlight(applyExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedBind.value = Prism.highlight(bindExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedArrow.value = Prism.highlight(arrowFunctionSnippet, Prism.languages.javascript, 'javascript')
  highlightedMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Способы привязки контекста: call, bind, apply
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Контекст (this)</b> в JavaScript определяется тем, как функция вызывается, а не где она объявлена.
              Методы <code>call</code>, <code>apply</code> и <code>bind</code> позволяют явно управлять контекстом выполнения функций.
              Это критически важно для понимания работы с объектами, событиями и колбэками.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы контекста</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-function-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">call()</h3>
                  <p class="text-body-2">Вызывает функцию с указанным this. Аргументы передаются отдельно.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-application-array</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">apply()</h3>
                  <p class="text-body-2">То же что call, но аргументы передаются массивом.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-link-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">bind()</h3>
                  <p class="text-body-2">Создает новую функцию с привязанным контекстом.</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">call() — прямой вызов с контекстом</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Синтаксис:</strong> <code>func.call(thisArg, arg1, arg2, ...)</code>
              — вызывает функцию немедленно с указанным this
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCall"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">apply() — вызов с массивом аргументов</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Синтаксис:</strong> <code>func.apply(thisArg, [argsArray])</code>
              — полезен когда аргументы уже в виде массива
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedApply"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">bind() — создание функции с привязанным контекстом</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Синтаксис:</strong> <code>func.bind(thisArg, arg1, arg2, ...)</code>
              — возвращает новую функцию, не вызывает исходную
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBind"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов</h2>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Выполнение</th>
                <th class="text-left font-weight-bold">Аргументы</th>
                <th class="text-left font-weight-bold">Возвращает</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>call()</code></td>
                <td class="text-success"><b>Немедленно</b></td>
                <td>Отдельно</td>
                <td>Результат функции</td>
                <td>Одноразовый вызов</td>
              </tr>
              <tr>
                <td><code>apply()</code></td>
                <td class="text-success"><b>Немедленно</b></td>
                <td>Массивом</td>
                <td>Результат функции</td>
                <td>Работа с массивами</td>
              </tr>
              <tr>
                <td><code>bind()</code></td>
                <td class="text-warning"><b>Создает функцию</b></td>
                <td>Частичное применение</td>
                <td>Новую функцию</td>
                <td>Колбэки, события</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Стрелочные функции и контекст</h2>

            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Важно:</strong> Стрелочные функции НЕ имеют собственного this!
              Методы call, apply, bind не влияют на их контекст.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedArrow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки и их решения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый метод</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-primary">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-function-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">call()</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Одноразовый вызов с другим контекстом</li>
                    <li>Заимствование методов</li>
                    <li>Отладка и логирование</li>
                    <li>Вызов родительских конструкторов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-application-array</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">apply()</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Аргументы уже в массиве</li>
                    <li>Math.max/min с массивом</li>
                    <li>Распространение аргументов</li>
                    <li>Работа с arguments</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-link-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">bind()</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Обработчики событий</li>
                    <li>Колбэк-функции</li>
                    <li>Частичное применение</li>
                    <li>React компоненты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между call и apply?</p>
                <p class="font-weight-regular ma-0">
                  call передает аргументы отдельно: <code>func.call(obj, a, b, c)</code>,
                  apply передает аргументы массивом: <code>func.apply(obj, [a, b, c])</code>.
                  Оба вызывают функцию немедленно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать bind вместо call/apply?</p>
                <p class="font-weight-regular ma-0">
                  bind используется когда нужно создать новую функцию с привязанным контекстом
                  для последующих вызовов (события, колбэки). call/apply — для немедленного вызова.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с this в стрелочных функциях?</p>
                <p class="font-weight-regular ma-0">
                  Стрелочные функции не имеют собственного this, они наследуют контекст из
                  окружающей области видимости. call, apply, bind не влияют на их контекст.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает частичное применение с bind?</p>
                <p class="font-weight-regular ma-0">
                  bind может "зафиксировать" не только контекст, но и первые аргументы:
                  <code>const add5 = add.bind(null, 5)</code>. При вызове add5(3) получим add(5, 3).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли "переопределить" bind?</p>
                <p class="font-weight-regular ma-0">
                  Нет, результат bind нельзя повторно "перебиндить". Однажды привязанный контекст
                  остается неизменным. <code>boundFunc.bind(newContext)</code> не изменит контекст.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как заимствовать методы массива?</p>
                <p class="font-weight-regular ma-0">
                  Используем call/apply: <code>Array.prototype.slice.call(arrayLike)</code>
                  превращает array-like объект в настоящий массив. Современная альтернатива: <code>Array.from()</code>.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">✅ Делать</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Использовать bind для событий</li>
                    <li>Проверять наличие методов перед call/apply</li>
                    <li>Предпочитать стрелочные функции в колбэках</li>
                    <li>Понимать разницу между методами</li>
                    <li>Кэшировать результат bind</li>
                    <li>Использовать строгий режим</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">
