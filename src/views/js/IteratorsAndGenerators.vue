<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const iteratorSnippet = `
// Итератор - объект с методом next()
const customIterator = {
  current: 0,
  last: 5,

  // Протокол Iterator
  next() {
    if (this.current <= this.last) {
      return {
        value: this.current++,
        done: false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }
  }
}

// Использование итератора
let result = customIterator.next()
while (!result.done) {
  console.log(result.value) // 0, 1, 2, 3, 4, 5
  result = customIterator.next()
}

// Итерируемый объект (Iterable)
const iterable = {
  data: [1, 2, 3, 4, 5],

  // Метод Symbol.iterator делает объект итерируемым
  [Symbol.iterator]() {
    let index = 0
    const data = this.data

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false }
        } else {
          return { value: undefined, done: true }
        }
      }
    }
  }
}

// Можно использовать в for...of
for (const value of iterable) {
  console.log(value) // 1, 2, 3, 4, 5
}

// Или деструктурировать
const [first, second, ...rest] = iterable
console.log(first, second, rest) // 1, 2, [3, 4, 5]
`

const generatorSnippet = `
// Generator Function - создает генератор
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
  return 'done'
}

// Генератор - это итератор
const gen = simpleGenerator()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: 'done', done: true }

// Генератор можно использовать в циклах
for (const value of simpleGenerator()) {
  console.log(value) // 1, 2, 3 (return не выводится)
}

// Генератор с параметрами и бесконечностью
function* fibonacci() {
  let a = 0, b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

// Можно взять первые N значений
function takeN(iterable, n) {
  const result = []
  let count = 0
  for (const value of iterable) {
    if (count >= n) break
    result.push(value)
    count++
  }
  return result
}

console.log(takeN(fibonacci(), 10)) // [0,1,1,2,3,5,8,13,21,34]

// Генератор с двусторонней связью
function* generatorWithInput() {
  let input = yield 'Первое значение'
  console.log('Получил:', input)

  input = yield 'Второе значение'
  console.log('Получил:', input)

  return 'Конец'
}

const interactive = generatorWithInput()
console.log(interactive.next())           // { value: 'Первое значение', done: false }
console.log(interactive.next('Hello'))    // Получил: Hello, { value: 'Второе значение', done: false }
console.log(interactive.next('World'))    // Получил: World, { value: 'Конец', done: true }
`

const asyncIteratorSnippet = `
// Асинхронный итератор
const asyncIterable = {
  data: ['a', 'b', 'c'],

  // Symbol.asyncIterator для асинхронной итерации
  [Symbol.asyncIterator]() {
    let index = 0
    const data = this.data

    return {
      // next() возвращает Promise
      async next() {
        // Имитируем асинхронную операцию
        await new Promise(resolve => setTimeout(resolve, 100))

        if (index < data.length) {
          return { value: data[index++], done: false }
        } else {
          return { value: undefined, done: true }
        }
      }
    }
  }
}

// Использование с for await...of
async function consumeAsyncIterable() {
  for await (const value of asyncIterable) {
    console.log(value) // 'a', 'b', 'c' с задержкой
  }
}

// Или вручную
async function manualAsyncIteration() {
  const iterator = asyncIterable[Symbol.asyncIterator]()
  let result = await iterator.next()

  while (!result.done) {
    console.log(result.value)
    result = await iterator.next()
  }
}

// Асинхронный итератор для API запросов
class APIIterator {
  constructor(url, pageSize = 10) {
    this.url = url
    this.pageSize = pageSize
    this.page = 0
  }

  [Symbol.asyncIterator]() {
    return this
  }

  async next() {
    try {
      const response = await fetch(\`\${this.url}?page=\${this.page}&size=\${this.pageSize}\`)
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        this.page++
        return { value: data.items, done: false }
      } else {
        return { value: undefined, done: true }
      }
    } catch (error) {
      return { value: undefined, done: true }
    }
  }
}

// Использование
async function fetchAllPages() {
  const api = new APIIterator('/api/users')

  for await (const page of api) {
    console.log('Страница данных:', page)
  }
}
`

const asyncGeneratorSnippet = `
// Асинхронный генератор
async function* asyncGenerator() {
  let i = 0
  while (i < 5) {
    // Асинхронная операция
    await new Promise(resolve => setTimeout(resolve, 200))
    yield \`Item \${++i}\`
  }
  return 'Асинхронный генератор завершен'
}

// Использование
async function useAsyncGenerator() {
  for await (const item of asyncGenerator()) {
    console.log(item) // Item 1, Item 2, ... с задержками
  }
}

// Генератор для чтения файлов по частям
async function* readFileChunks(file, chunkSize = 1024) {
  const reader = new FileReader()
  let offset = 0

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize)

    // Читаем chunk асинхронно
    const result = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsArrayBuffer(chunk)
    })

    yield result
    offset += chunkSize
  }
}

// Использование для больших файлов
async function processLargeFile(file) {
  for await (const chunk of readFileChunks(file)) {
    // Обрабатываем каждый chunk
    console.log('Обработан chunk размером:', chunk.byteLength)
  }
}

// Комбинирование асинхронных генераторов
async function* merge(...asyncIterables) {
  const iterators = asyncIterables.map(iterable => iterable[Symbol.asyncIterator]())
  const promises = iterators.map(iterator => iterator.next())

  while (promises.length > 0) {
    const { value, index } = await Promise.race(
      promises.map((promise, index) => promise.then(result => ({ ...result, index })))
    )

    if (!value.done) {
      yield value.value
      // Получаем следующее значение из того же итератора
      promises[index] = iterators[index].next()
    } else {
      // Удаляем завершенный итератор
      promises.splice(index, 1)
      iterators.splice(index, 1)
    }
  }
}

// Пример использования merge
async function* source1() {
  yield 'A1'; await new Promise(r => setTimeout(r, 100))
  yield 'A2'; await new Promise(r => setTimeout(r, 100))
}

async function* source2() {
  yield 'B1'; await new Promise(r => setTimeout(r, 50))
  yield 'B2'; await new Promise(r => setTimeout(r, 150))
}

async function demo() {
  for await (const value of merge(source1(), source2())) {
    console.log(value) // Порядок зависит от скорости источников
  }
}
`

const practicalExamplesSnippet = `
// Пагинация с генераторами
function* paginate(array, pageSize) {
  for (let i = 0; i < array.length; i += pageSize) {
    yield array.slice(i, i + pageSize)
  }
}

const data = Array.from({ length: 23 }, (_, i) => \`item-\${i}\`)
for (const page of paginate(data, 5)) {
  console.log('Страница:', page)
}

// Ленивая фильтрация
function* lazyFilter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}

function* lazyMap(iterable, mapper) {
  for (const item of iterable) {
    yield mapper(item)
  }
}

// Цепочка операций без создания промежуточных массивов
const numbers = function* () {
  for (let i = 1; i <= 1000000; i++) {
    yield i
  }
}

const result = lazyMap(
  lazyFilter(numbers(), x => x % 2 === 0),
  x => x * x
)

// Берем первые 5 результатов
const firstFive = takeN(result, 5)
console.log(firstFive) // [4, 16, 36, 64, 100]

// Обработка событий с генераторами
class EventProcessor {
  constructor() {
    this.events = []
  }

  *processEvents() {
    while (true) {
      if (this.events.length === 0) {
        // Ждем события
        yield null
      } else {
        const event = this.events.shift()
        yield this.handleEvent(event)
      }
    }
  }

  handleEvent(event) {
    return \`Обработано: \${event.type} в \${new Date(event.timestamp)}\`
  }

  addEvent(type, data = {}) {
    this.events.push({
      type,
      data,
      timestamp: Date.now()
    })
  }
}

const processor = new EventProcessor()
const eventGenerator = processor.processEvents()

processor.addEvent('click', { x: 100, y: 200 })
processor.addEvent('keydown', { key: 'Enter' })

console.log(eventGenerator.next().value) // Обработано: click...
console.log(eventGenerator.next().value) // Обработано: keydown...
console.log(eventGenerator.next().value) // null (нет событий)

// Retry механизм с генераторами
async function* retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let attempt = 0

  while (attempt < maxRetries) {
    try {
      const result = await fn()
      yield { success: true, result, attempt }
      return
    } catch (error) {
      attempt++
      const delay = baseDelay * Math.pow(2, attempt - 1)

      yield {
        success: false,
        error: error.message,
        attempt,
        nextRetryIn: delay
      }

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  yield { success: false, error: 'Max retries exceeded', attempt }
}

// Использование retry
async function unreliableAPI() {
  if (Math.random() < 0.7) {
    throw new Error('API временно недоступен')
  }
  return { data: 'Успешный ответ' }
}

async function testRetry() {
  for await (const result of retryWithBackoff(unreliableAPI, 3, 500)) {
    if (result.success) {
      console.log('Успех:', result.result)
      break
    } else {
      console.log(\`Попытка \${result.attempt}: \${result.error}\`)
    }
  }
}
`

const performanceSnippet = `
// Сравнение производительности: массив vs генератор

// Обычный подход - создает весь массив в памяти
function createLargeArray(size) {
  const result = []
  for (let i = 0; i < size; i++) {
    result.push(i * i)
  }
  return result
}

// Генератор - вычисляет значения по требованию
function* createLargeSequence(size) {
  for (let i = 0; i < size; i++) {
    yield i * i
  }
}

// Тест производительности
function performanceTest() {
  const size = 1000000

  console.time('Array creation')
  const array = createLargeArray(size)
  console.timeEnd('Array creation')

  console.time('Generator creation')
  const generator = createLargeSequence(size)
  console.timeEnd('Generator creation') // Практически мгновенно

  // Потребление памяти
  console.log('Array memory:', JSON.stringify(array).length, 'bytes')
  // Генератор не хранит данные в памяти

  // Но доступ к элементу в массиве быстрее
  console.time('Array access')
  console.log(array[999999])
  console.timeEnd('Array access')

  console.time('Generator iteration')
  let count = 0
  for (const value of createLargeSequence(size)) {
    if (count === 999999) {
      console.log(value)
      break
    }
    count++
  }
  console.timeEnd('Generator iteration')
}

// Композиция генераторов для сложной обработки
function* pipeline(...generators) {
  for (const generator of generators) {
    yield* generator
  }
}

function* numbers(max) {
  for (let i = 1; i <= max; i++) {
    yield i
  }
}

function* squares(iterable) {
  for (const n of iterable) {
    yield n * n
  }
}

function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}

// Создаем pipeline без промежуточных массивов
const evenSquares = filter(
  squares(numbers(100)),
  x => x % 2 === 0
)

console.log([...takeN(evenSquares, 5)]) // [4, 16, 36, 64, 100]

// Мониторинг производительности генераторов
function* monitoredGenerator(iterable, name) {
  let count = 0
  const start = performance.now()

  for (const item of iterable) {
    count++
    yield item

    if (count % 1000 === 0) {
      const elapsed = performance.now() - start
      console.log(\`\${name}: обработано \${count} элементов за \${elapsed.toFixed(2)}ms\`)
    }
  }

  const total = performance.now() - start
  console.log(\`\${name}: завершено. Всего: \${count} элементов за \${total.toFixed(2)}ms\`)
}

// Использование
const monitored = monitoredGenerator(numbers(10000), 'NumberGenerator')
const processed = [...monitored] // Обработает все с мониторингом
`

const highlightedIterator = ref('')
const highlightedGenerator = ref('')
const highlightedAsyncIterator = ref('')
const highlightedAsyncGenerator = ref('')
const highlightedPractical = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedIterator.value = Prism.highlight(iteratorSnippet, Prism.languages.javascript, 'javascript')
  highlightedGenerator.value = Prism.highlight(generatorSnippet, Prism.languages.javascript, 'javascript')
  highlightedAsyncIterator.value = Prism.highlight(asyncIteratorSnippet, Prism.languages.javascript, 'javascript')
  highlightedAsyncGenerator.value = Prism.highlight(asyncGeneratorSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Итерируемые конструкции: Iterators, Generators, Async Iterators/Generators
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Итераторы</b> и <b>генераторы</b> — это мощные инструменты JavaScript для работы с последовательностями данных.
              <b>Итераторы</b> предоставляют унифицированный способ обхода коллекций, <b>генераторы</b> позволяют создавать
              итераторы проще, а <b>асинхронные версии</b> работают с асинхронными данными.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Iterator Protocol — основа итерации</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Итератор — это объект с методом <code>next()</code>, который возвращает
              <code>{ value, done }</code>. Итерируемый объект имеет метод <code>Symbol.iterator</code>,
              возвращающий итератор.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-repeat</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Iterator</h3>
                  <p class="text-body-2">Объект с методом next(), возвращающим { value, done }</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-sync</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Iterable</h3>
                  <p class="text-body-2">Объект с методом [Symbol.iterator], работает с for...of</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-protocol</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Protocol</h3>
                  <p class="text-body-2">Стандартизированный интерфейс для обхода коллекций</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedIterator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Generator Functions — упрощение создания итераторов</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-function</v-icon>
                    <h3 class="text-h6 font-weight-bold">Что такое генератор?</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>function*</strong> — специальный синтаксис</li>
                    <li><strong>yield</strong> — возврат значения и пауза</li>
                    <li><strong>return</strong> — завершение с final value</li>
                    <li><strong>next()</strong> — продолжение выполнения</li>
                    <li><strong>Ленивые вычисления</strong> по требованию</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-lightning-bolt</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Память</strong> — не хранят все данные сразу</li>
                    <li><strong>Производительность</strong> — ленивые вычисления</li>
                    <li><strong>Бесконечные последовательности</strong></li>
                    <li><strong>Композиция</strong> — легко комбинируются</li>
                    <li><strong>Двустороння связь</strong> через next(value)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenerator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Async Iterator — работа с асинхронными данными</h2>

            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Отличия:</strong> Асинхронные итераторы используют <code>Symbol.asyncIterator</code>,
              метод <code>next()</code> возвращает Promise, используются с <code>for await...of</code>.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsyncIterator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Async Generators — асинхронные генераторы</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Применение</h3>
                  <ul class="pl-4">
                    <li><strong>Потоковая обработка</strong> данных</li>
                    <li><strong>Пагинация</strong> API запросов</li>
                    <li><strong>Чтение больших файлов</strong> по частям</li>
                    <li><strong>Real-time данные</strong> (WebSocket, SSE)</li>
                    <li><strong>Обработка событий</strong> асинхронно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Синтаксис</h3>
                  <ul class="pl-4">
                    <li><code>async function*</code> — объявление</li>
                    <li><code>yield</code> — может быть async</li>
                    <li><code>for await...of</code> — потребление</li>
                    <li><code>await</code> внутри генератора</li>
                    <li>Возврат Promise из next()</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsyncGenerator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Array</th>
                <th class="text-left font-weight-bold">Iterator</th>
                <th class="text-left font-weight-bold">Generator</th>
                <th class="text-left font-weight-bold">Async Generator</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Память</b></td>
                <td class="pt-2 pb-2">❌ Все в памяти</td>
                <td class="pt-2 pb-2">✅ По одному элементу</td>
                <td class="pt-2 pb-2">✅ По одному элементу</td>
                <td class="pt-2 pb-2">✅ По одному элементу</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Ленивость</b></td>
                <td class="pt-2 pb-2">❌ Вычисляет сразу все</td>
                <td class="pt-2 pb-2">✅ По требованию</td>
                <td class="pt-2 pb-2">✅ По требованию</td>
                <td class="pt-2 pb-2">✅ По требованию</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Бесконечность</b></td>
                <td class="pt-2 pb-2">❌ Нет</td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">✅ Да</td>
                <td class="pt-2 pb-2">✅ Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Композиция</b></td>
                <td class="pt-2 pb-2">⚠️ Создает копии</td>
                <td class="pt-2 pb-2">✅ Легкая</td>
                <td class="pt-2 pb-2">✅ Очень легкая</td>
                <td class="pt-2 pb-2">✅ С async/await</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Случайный доступ</b></td>
                <td class="pt-2 pb-2">✅ Быстрый O(1)</td>
                <td class="pt-2 pb-2">❌ Только последовательный</td>
                <td class="pt-2 pb-2">❌ Только последовательный</td>
                <td class="pt-2 pb-2">❌ Только последовательный</td>
              </tr>
              <tr>
