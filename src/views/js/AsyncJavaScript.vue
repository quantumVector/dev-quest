<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const syncProblemSnippet = `
// Проблема синхронного кода - блокировка выполнения

// ❌ Синхронная операция блокирует поток
function fetchDataSync() {
  // Представим, что это запрос к API, который занимает 3 секунды
  const start = Date.now()
  while (Date.now() - start < 3000) {
    // Блокируем главный поток на 3 секунды
  }
  return { data: "Важные данные" }
}

console.log("Начало выполнения")
const result = fetchDataSync() // Блокировка на 3 секунды!
console.log("Данные получены:", result)
console.log("Конец выполнения")

// В течение этих 3 секунд:
// - UI заморожен
// - Пользователь не может взаимодействовать со страницей
// - Другие скрипты не выполняются
// - Браузер "висит"
`

const asyncSolutionSnippet = `
// ✅ Асинхронное решение - неблокирующее выполнение

// Promise
function fetchDataAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Важные данные" })
    }, 3000)
  })
}

// Async/Await
async function main() {
  console.log("Начало выполнения")

  // Запускаем асинхронную операцию
  const dataPromise = fetchDataAsync()

  // Можем выполнять другие задачи
  console.log("Делаем другие задачи...")
  updateUI()
  handleUserInput()

  // Ждем результат когда он нужен
  const result = await dataPromise
  console.log("Данные получены:", result)
  console.log("Конец выполнения")
}

function updateUI() {
  console.log("UI обновлен")
}

function handleUserInput() {
  console.log("Обработан пользовательский ввод")
}

main()
`

const eventLoopSnippet = `
// Демонстрация работы Event Loop

console.log("1 - Синхронный код") // Call Stack

setTimeout(() => {
  console.log("4 - Макрозадача (Timer)")
}, 0) // Web APIs → Task Queue

Promise.resolve().then(() => {
  console.log("3 - Микрозадача (Promise)")
}) // Microtask Queue

console.log("2 - Синхронный код") // Call Stack

// Порядок выполнения:
// 1. Call Stack: "1 - Синхронный код"
// 2. Call Stack: "2 - Синхронный код"
// 3. Microtask Queue: "3 - Микрозадача (Promise)"
// 4. Task Queue: "4 - Макрозадача (Timer)"

// Event Loop проверяет очереди в порядке приоритета:
// 1. Call Stack (должен быть пустым)
// 2. Microtask Queue (Promise, queueMicrotask)
// 3. Task Queue (setTimeout, setInterval, DOM события)
`

const realWorldExampleSnippet = `
// Реальные примеры использования асинхронности

// 1. Работа с API
async function loadUserData(userId) {
  try {
    // Параллельные запросы - не блокируем друг друга
    const [user, posts, followers] = await Promise.all([
      fetch(\`/api/users/\${userId}\`),
      fetch(\`/api/users/\${userId}/posts\`),
      fetch(\`/api/users/\${userId}/followers\`)
    ])

    return {
      user: await user.json(),
      posts: await posts.json(),
      followers: await followers.json()
    }
  } catch (error) {
    console.error("Ошибка загрузки данных:", error)
    throw error
  }
}

// 2. Обработка файлов
async function processFiles(files) {
  const results = []

  // Последовательная обработка
  for (const file of files) {
    const processed = await processFile(file)
    results.push(processed)
    updateProgressBar(results.length, files.length)
  }

  return results
}

// 3. Работа с базой данных
async function createUser(userData) {
  const transaction = await db.beginTransaction()

  try {
    const user = await db.users.create(userData)
    await db.profiles.create({ userId: user.id, ...userData.profile })
    await db.permissions.create({ userId: user.id, role: 'user' })

    await transaction.commit()
    return user
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// 4. Анимации и UI
async function smoothScroll(element, targetY, duration = 1000) {
  const startY = element.scrollTop
  const distance = targetY - startY
  let startTime = null

  return new Promise((resolve) => {
    function animate(currentTime) {
      if (!startTime) startTime = currentTime

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      element.scrollTop = startY + distance * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(animate)
  })
}
`

const patternsSnippet = `
// Паттерны работы с асинхронностью

// 1. Параллельное выполнение
async function parallelExecution() {
  const start = Date.now()

  // ❌ Последовательно - 6 секунд
  // const result1 = await slowOperation1() // 3 сек
  // const result2 = await slowOperation2() // 3 сек

  // ✅ Параллельно - 3 секунды
  const [result1, result2] = await Promise.all([
    slowOperation1(), // 3 сек
    slowOperation2()  // 3 сек
  ])

  console.log(\`Выполнено за \${Date.now() - start}мс\`)
  return { result1, result2 }
}

// 2. Retry с экспоненциальной задержкой
async function retryWithBackoff(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) throw error

      const delay = Math.pow(2, attempt - 1) * 1000 // 1s, 2s, 4s
      console.log(\`Попытка \${attempt} неудачна, повтор через \${delay}мс\`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// 3. Ограничение конкурентности
async function limitConcurrency(tasks, limit = 3) {
  const results = []
  const executing = new Set()

  for (const task of tasks) {
    const promise = task().then(result => {
      executing.delete(promise)
      return result
    })

    results.push(promise)
    executing.add(promise)

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}

// 4. Timeout для операций
function withTimeout(operation, timeoutMs) {
  return Promise.race([
    operation(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
    )
  ])
}

// 5. Debounce для пользовательского ввода
function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func.apply(this, args)
        resolve(result)
      }, delay)
    })
  }
}

// Использование debounce
const debouncedSearch = debounce(async (query) => {
  const response = await fetch(\`/search?q=\${query}\`)
  return response.json()
}, 300)
`

const errorHandlingSnippet = `
// Обработка ошибок в асинхронном коде

// 1. Try-catch с async/await
async function handleAsyncErrors() {
  try {
    const userData = await fetchUserData()
    const processedData = await processData(userData)
    return processedData
  } catch (error) {
    // Логирование ошибки
    console.error('Async operation failed:', error)

    // Разные типы ошибок
    if (error.name === 'NetworkError') {
      throw new Error('Проблемы с сетью, попробуйте позже')
    } else if (error.status === 404) {
      throw new Error('Пользователь не найден')
    } else {
      throw new Error('Произошла неожиданная ошибка')
    }
  }
}

// 2. Promise.catch()
function promiseErrorHandling() {
  return fetchUserData()
    .then(userData => processData(userData))
    .then(result => {
      console.log('Success:', result)
      return result
    })
    .catch(error => {
      console.error('Promise chain failed:', error)
      return { error: error.message }
    })
}

// 3. Множественные промисы
async function handleMultiplePromises() {
  try {
    // Promise.all - если один упадет, упадут все
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts()
    ])

    return { users, posts }
  } catch (error) {
    console.error('One of the requests failed:', error)
  }

  // Promise.allSettled - получаем все результаты
  const results = await Promise.allSettled([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ])

  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)

  const failed = results
    .filter(result => result.status === 'rejected')
    .map(result => result.reason)

  return { successful, failed }
}

// 4. Обработка ошибок в цепочке
async function chainErrorHandling() {
  return fetchUserData()
    .catch(error => {
      console.log('Fetching failed, using cache')
      return getCachedUserData()
    })
    .then(userData => processData(userData))
    .catch(error => {
      console.log('Processing failed, using defaults')
      return getDefaultData()
    })
}
`

const performanceSnippet = `
// Производительность и оптимизация асинхронного кода

// 1. Кеширование промисов
class DataCache {
  constructor() {
    this.cache = new Map()
    this.pendingRequests = new Map()
  }

  async getData(key) {
    // Возвращаем кешированные данные
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    // Избегаем дублирующихся запросов
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)
    }

    // Создаем новый запрос
    const request = this.fetchData(key)
      .then(data => {
        this.cache.set(key, data)
        this.pendingRequests.delete(key)
        return data
      })
      .catch(error => {
        this.pendingRequests.delete(key)
        throw error
      })

    this.pendingRequests.set(key, request)
    return request
  }

  async fetchData(key) {
    // Имитация API запроса
    const response = await fetch(\`/api/data/\${key}\`)
    return response.json()
  }
}

// 2. Lazy loading с асинхронностью
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.1 }
    )
  }

  async handleIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const element = entry.target
        this.observer.unobserve(element)

        try {
          await this.loadContent(element)
        } catch (error) {
          console.error('Failed to load content:', error)
        }
      }
    }
  }

  async loadContent(element) {
    const src = element.dataset.src
    if (!src) return

    // Показываем индикатор загрузки
    element.classList.add('loading')

    // Загружаем контент
    const response = await fetch(src)
    const content = await response.text()

    // Вставляем контент
    element.innerHTML = content
    element.classList.remove('loading')
    element.classList.add('loaded')
  }

  observe(element) {
    this.observer.observe(element)
  }
}

// 3. Batch операции
class BatchProcessor {
  constructor(batchSize = 10, delay = 100) {
    this.batchSize = batchSize
    this.delay = delay
    this.queue = []
    this.timeoutId = null
  }

  add(item) {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject })

      if (this.queue.length >= this.batchSize) {
        this.processBatch()
      } else {
        this.scheduleProcessing()
      }
    })
  }

  scheduleProcessing() {
    if (this.timeoutId) return

    this.timeoutId = setTimeout(() => {
      this.processBatch()
    }, this.delay)
  }

  async processBatch() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    if (this.queue.length === 0) return

    const batch = this.queue.splice(0, this.batchSize)

    try {
      const results = await this.processBatchItems(
        batch.map(b => b.item)
      )

      batch.forEach((b, index) => {
        b.resolve(results[index])
      })
    } catch (error) {
      batch.forEach(b => b.reject(error))
    }
  }

  async processBatchItems(items) {
    // Обработка пачки элементов
    const response = await fetch('/api/batch-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })

    return response.json()
  }
}
`

const highlightedSyncProblem = ref('')
const highlightedAsyncSolution = ref('')
const highlightedEventLoop = ref('')
const highlightedRealWorld = ref('')
const highlightedPatterns = ref('')
const highlightedErrorHandling = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedSyncProblem.value = Prism.highlight(syncProblemSnippet, Prism.languages.javascript, 'javascript')
  highlightedAsyncSolution.value = Prism.highlight(asyncSolutionSnippet, Prism.languages.javascript, 'javascript')
  highlightedEventLoop.value = Prism.highlight(eventLoopSnippet, Prism.languages.javascript, 'javascript')
  highlightedRealWorld.value = Prism.highlight(realWorldExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedPatterns.value = Prism.highlight(patternsSnippet, Prism.languages.javascript, 'javascript')
  highlightedErrorHandling.value = Prism.highlight(errorHandlingSnippet, Prism.languages.javascript, 'javascript')
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
              Для чего нам нужна асинхронность в JavaScript?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Асинхронность</b> в JavaScript позволяет выполнять операции, не блокируя главный поток выполнения.
              Это критически важно для создания отзывчивых пользовательских интерфейсов и эффективной работы с
              внешними ресурсами (API, файлы, базы данных). JavaScript является однопоточным языком,
              поэтому без асинхронности любая длительная операция заморозила бы весь интерфейс.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные причины использования асинхронности</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-account-heart</v-icon>
                    <h3 class="text-h6 font-weight-bold">Пользовательский опыт</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Отзывчивый UI</strong> — интерфейс не зависает</li>
                    <li><strong>Плавные анимации</strong> — 60 FPS без блокировок</li>
                    <li><strong>Быстрая реакция</strong> — мгновенный отклик на действия</li>
                    <li><strong>Фоновые операции</strong> — загрузка не мешает работе</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-flash</v-icon>
                    <h3 class="text-h6 font-weight-bold">Производительность</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Параллельные запросы</strong> — множество операций сразу</li>
                    <li><strong>Эффективное I/O</strong> — не блокируем ожидание ответа</li>
                    <li><strong>Оптимальное использование ресурсов</strong> — CPU всегда занят</li>
                    <li><strong>Масштабируемость</strong> — обработка тысяч соединений</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема синхронного кода</h2>

            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> В однопоточном JavaScript любая длительная операция блокирует
              весь поток выполнения, включая обновление UI и обработку пользовательских действий.
            </v-alert>

            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSyncProblem"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение через асинхронность</h2>

            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> Асинхронные операции позволяют выполнять длительные задачи
              в фоне, не блокируя главный поток. Пользователь может продолжать взаимодействие с интерфейсом.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsyncSolution"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Event Loop — как это работает</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventLoop"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные сценарии использования</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="blue" class="mb-2">mdi-api</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Сетевые запросы</h3>
                  <p class="text-body-2">
                    HTTP запросы к API, загрузка данных с сервера,
                    отправка форм без перезагрузки страницы
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="green" class="mb-2">mdi-file-document</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Работа с файлами</h3>
                  <p class="text-body-2">
                    Чтение, загрузка и обработка файлов,
                    работа с FileReader API, upload файлов
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="orange" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Базы данных</h3>
                  <p class="text-body-2">
                    IndexedDB, WebSQL, работа с локальным хранилищем,
                    синхронизация данных
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="purple" class="mb-2">mdi-timer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Таймеры</h3>
                  <p class="text-body-2">
                    setTimeout, setInterval, анимации,
                    отложенное выполнение задач
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="red" class="mb-2">mdi-mouse</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">События UI</h3>
                  <p class="text-body-2">
                    Обработка кликов, скролла, ввода текста,
                    drag & drop операций
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="cyan" class="mb-2">mdi-cog</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Вычисления</h3>
                  <p class="text-body-2">
                    Web Workers для тяжелых вычислений,
                    обработка больших массивов данных
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Реальные примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorld"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Паттерны асинхронного программирования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Обработка ошибок</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedErrorHandling"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">Синхронный код</th>
                <th class="text-left font-weight-bold">Асинхронный код</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Блокировка потока</b></td>
                <td class="pt-2 pb-2 text-red">❌ Блокирует</td>
                <td class="pt-2 pb-2 text-green">✅ Не блокирует</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>UI отзывчивость</b></td>
                <td class="pt-2 pb-2 text-red">❌ Зависает</td>
                <td class="pt-2 pb-2 text-green">✅ Остается отзывчивым</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Параллельные операции</b></td>
                <td class="pt-2 pb-2 text-red">❌ Последовательно</td>
                <td class="pt-2 pb-2 text-green">✅ Параллельно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Простота кода</b></td>
                <td class="pt-2 pb-2 text-green">✅ Простой</td>
                <td class="pt-2 pb-2 text-orange">⚠️ Сложнее</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Обработка ошибок</b></td>
                <td class="pt-2 pb-2 text-green">✅ try/catch</td>
                <td class="pt-2 pb-2 text-orange">⚠️ Сложнее</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность</b></td>
                <td class="pt-2 pb-2 text-red">❌ Низкая</td>
                <td class="pt-2 pb-2 text-green">✅ Высокая</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1
