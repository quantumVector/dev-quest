<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicExampleSnippet = `
// Основная проблема: промисы создаются и сразу запускаются
const promises = [
  fetch('/api/users'),      // Уже запущен!
  fetch('/api/posts'),      // Уже запущен!
  fetch('/api/comments')    // Уже запущен!
]

// Все три запроса выполняются параллельно
Promise.all(promises)
  .then(responses => {
    console.log('Все запросы завершены:', responses)
  })

// Vs. создание промисов в функциях (lazy)
const promiseFunctions = [
  () => fetch('/api/users'),
  () => fetch('/api/posts'),
  () => fetch('/api/comments')
]

// Теперь мы контролируем, когда запустить каждый промис
const lazyPromises = promiseFunctions.map(fn => fn())
Promise.all(lazyPromises)
  .then(responses => {
    console.log('Все запросы завершены:', responses)
  })
`

const promiseAllSnippet = `
// Promise.all - самый популярный способ
const urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3'
]

// Способ 1: Создание промисов напрямую
const promises = urls.map(url => fetch(url).then(res => res.json()))

Promise.all(promises)
  .then(users => {
    console.log('Все пользователи:', users)
  })
  .catch(error => {
    console.error('Ошибка в одном из запросов:', error)
  })

// Способ 2: Через функции (отложенное выполнение)
const promiseFunctions = urls.map(url => () => fetch(url).then(res => res.json()))

// Запускаем все сразу
const activePromises = promiseFunctions.map(fn => fn())
Promise.all(activePromises)
  .then(users => {
    console.log('Все пользователи:', users)
  })

// Способ 3: Используя async/await
async function fetchAllUsers() {
  try {
    const promises = urls.map(async (url) => {
      const response = await fetch(url)
      return response.json()
    })

    const users = await Promise.all(promises)
    console.log('Все пользователи:', users)
    return users
  } catch (error) {
    console.error('Ошибка:', error)
    throw error
  }
}

fetchAllUsers()
`

const promiseMethodsSnippet = `
// Различные методы для обработки коллекций промисов

const createPromises = () => [
  new Promise(resolve => setTimeout(() => resolve('Результат 1'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('Результат 2'), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка 3')), 1500))
]

// 1. Promise.all - все должны успеть, иначе общая ошибка
Promise.all(createPromises())
  .then(results => {
    console.log('Promise.all успех:', results) // Не выполнится из-за ошибки
  })
  .catch(error => {
    console.error('Promise.all ошибка:', error.message) // "Ошибка 3"
  })

// 2. Promise.allSettled - ждем все, получаем все результаты
Promise.allSettled(createPromises())
  .then(results => {
    console.log('Promise.allSettled:', results)
    // [
    //   { status: 'fulfilled', value: 'Результат 1' },
    //   { status: 'fulfilled', value: 'Результат 2' },
    //   { status: 'rejected', reason: Error('Ошибка 3') }
    // ]

    const successful = results.filter(r => r.status === 'fulfilled')
    const failed = results.filter(r => r.status === 'rejected')

    console.log('Успешных:', successful.length)
    console.log('Неудачных:', failed.length)
  })

// 3. Promise.race - первый завершенный (успех или ошибка)
Promise.race(createPromises())
  .then(result => {
    console.log('Promise.race успех:', result) // "Результат 1"
  })
  .catch(error => {
    console.error('Promise.race ошибка:', error.message)
  })

// 4. Promise.any - первый успешный (ES2021)
Promise.any(createPromises())
  .then(result => {
    console.log('Promise.any:', result) // "Результат 1"
  })
  .catch(error => {
    console.error('Promise.any - все провалились:', error)
  })
`

const dynamicCreationSnippet = `
// Динамическое создание коллекций промисов

// 1. Из массива данных
const userIds = [1, 2, 3, 4, 5]

const fetchUsers = async (ids) => {
  const promises = ids.map(id =>
    fetch(\`/api/users/\${id}\`)
      .then(res => res.json())
      .catch(error => ({ error: error.message, id }))
  )

  return Promise.all(promises)
}

// 2. Из объекта с разными операциями
const operations = {
  users: () => fetch('/api/users').then(res => res.json()),
  posts: () => fetch('/api/posts').then(res => res.json()),
  comments: () => fetch('/api/comments').then(res => res.json()),
  analytics: () => fetch('/api/analytics').then(res => res.json())
}

// Выполняем все операции параллельно
const executeAll = async () => {
  const promises = Object.entries(operations).map(async ([key, operation]) => {
    try {
      const result = await operation()
      return { [key]: result }
    } catch (error) {
      return { [key]: null, error: error.message }
    }
  })

  const results = await Promise.all(promises)

  // Объединяем результаты в один объект
  return results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

executeAll().then(data => {
  console.log('Все данные загружены:', data)
})

// 3. Генерация промисов в цикле
const batchProcess = async (items, batchSize = 3) => {
  const results = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)

    // Обрабатываем batch параллельно
    const batchPromises = batch.map(item => processItem(item))
    const batchResults = await Promise.all(batchPromises)

    results.push(...batchResults)

    console.log(\`Обработан batch \${Math.floor(i / batchSize) + 1}\`)
  }

  return results
}

async function processItem(item) {
  // Имитация асинхронной операции
  return new Promise(resolve => {
    setTimeout(() => resolve(\`Обработан: \${item}\`), Math.random() * 1000)
  })
}
`

const errorHandlingSnippet = `
// Продвинутая обработка ошибок в коллекциях промисов

// 1. Retry логика для отдельных промисов
const createRetryPromise = (fn, maxRetries = 3, delay = 1000) => {
  return new Promise(async (resolve, reject) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await fn()
        resolve(result)
        return
      } catch (error) {
        console.log(\`Попытка \${attempt} провалилась:, error.message\`)

        if (attempt === maxRetries) {
          reject(error)
          return
        }

        // Ждем перед следующей попыткой
        await new Promise(r => setTimeout(r, delay * attempt))
      }
    }
  })
}

// Использование retry в коллекции
const urls = [
  'https://api.example.com/unstable-endpoint-1',
  'https://api.example.com/unstable-endpoint-2',
  'https://api.example.com/unstable-endpoint-3'
]

const resilientFetch = urls.map(url =>
  createRetryPromise(() => fetch(url).then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    return res.json()
  }))
)

Promise.allSettled(resilientFetch)
  .then(results => {
    const successful = results.filter(r => r.status === 'fulfilled')
    const failed = results.filter(r => r.status === 'rejected')

    console.log(\`Успешно: \${successful.length}/\${results.length}\`)
    console.log('Успешные результаты:', successful.map(r => r.value))
    console.log('Ошибки:', failed.map(r => r.reason.message))
  })

// 2. Circuit Breaker pattern для коллекций
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureThreshold = threshold
    this.timeout = timeout
    this.failureCount = 0
    this.lastFailureTime = null
    this.state = 'CLOSED' // CLOSED, OPEN, HALF_OPEN
  }

  async execute(promise) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN')
      }
      this.state = 'HALF_OPEN'
    }

    try {
      const result = await promise
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  onSuccess() {
    this.failureCount = 0
    this.state = 'CLOSED'
  }

  onFailure() {
    this.failureCount++
    this.lastFailureTime = Date.now()

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN'
    }
  }
}

// Использование Circuit Breaker
const circuitBreaker = new CircuitBreaker()

const protectedPromises = urls.map(url =>
  circuitBreaker.execute(fetch(url).then(res => res.json()))
)

Promise.allSettled(protectedPromises)
  .then(results => {
    console.log('Результаты с Circuit Breaker:', results)
  })
`

const performanceSnippet = `
// Оптимизация производительности коллекций промисов

// 1. Ограничение количества параллельных операций
const limitConcurrency = async (promises, limit = 3) => {
  const results = []
  const executing = []

  for (const promise of promises) {
    const p = Promise.resolve().then(() => promise())
    results.push(p)

    if (promises.length >= limit) {
      executing.push(p.then(() => executing.splice(executing.indexOf(p), 1)))
    }

    if (executing.length >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}

// Пример использования
const heavyOperations = Array.from({ length: 20 }, (_, i) =>
  () => new Promise(resolve => {
    console.log(\`Запуск операции \${i + 1}\`)
    setTimeout(() => resolve(\`Результат \${i + 1}\`), 1000)
  })
)

limitConcurrency(heavyOperations, 3)
  .then(results => {
    console.log('Все операции завершены:', results.length)
  })

// 2. Batch обработка с контролем нагрузки
const processBatches = async (items, batchSize = 5, delayBetweenBatches = 100) => {
  const results = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const startTime = Date.now()

    // Обрабатываем batch
    const batchPromises = batch.map(item => processItem(item))
    const batchResults = await Promise.all(batchPromises)

    results.push(...batchResults)

    const duration = Date.now() - startTime
    console.log(\`Batch \${Math.floor(i / batchSize) + 1} завершен за \${duration}ms\`)

    // Пауза между батчами для снижения нагрузки
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
    }
  }

  return results
}

// 3. Кэширование результатов промисов
const promiseCache = new Map()

const cachedFetch = (url) => {
  if (promiseCache.has(url)) {
    console.log(\`Используем кэш для: \${url}\`)
    return promiseCache.get(url)
  }

  const promise = fetch(url)
    .then(res => res.json())
    .catch(error => {
      // Удаляем из кэша при ошибке
      promiseCache.delete(url)
      throw error
    })

  promiseCache.set(url, promise)
  return promise
}

// Множественные вызовы одного URL будут использовать кэш
const duplicateUrls = [
  'https://api.example.com/data',
  'https://api.example.com/data',  // Из кэша
  'https://api.example.com/other',
  'https://api.example.com/data'   // Из кэша
]

const cachedPromises = duplicateUrls.map(url => cachedFetch(url))
Promise.all(cachedPromises)
  .then(results => {
    console.log('Результаты (с кэшированием):', results)
  })
`

const practicalExamplesSnippet = `
// Практические примеры из реальных проектов

// 1. Загрузка данных для дашборда
class DashboardLoader {
  constructor() {
    this.endpoints = {
      users: '/api/users/stats',
      sales: '/api/sales/today',
      analytics: '/api/analytics/summary',
      notifications: '/api/notifications/unread',
      performance: '/api/system/performance'
    }
  }

  async loadDashboard() {
    const startTime = Date.now()

    // Создаем промисы для всех эндпоинтов
    const promises = Object.entries(this.endpoints).map(async ([key, url]) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(\`\${key}: HTTP \${response.status}\`)
        }
        const data = await response.json()
        return { [key]: data, error: null }
      } catch (error) {
        console.error(\`Ошибка загрузки \${key}:, error.message\`)
        return { [key]: null, error: error.message }
      }
    })

    // Ждем все запросы (даже с ошибками)
    const results = await Promise.all(promises)
    const dashboardData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {})

    const loadTime = Date.now() - startTime
    console.log(\`Дашборд загружен за \${loadTime}ms\`)

    return {
      data: dashboardData,
      loadTime,
      hasErrors: results.some(r => r.error !== null)
    }
  }
}

// Использование
const dashboard = new DashboardLoader()
dashboard.loadDashboard()
  .then(result => {
    console.log('Дашборд готов:', result)

    if (result.hasErrors) {
      console.warn('Некоторые данные загружены с ошибками')
    }
  })

// 2. Массовая обработка файлов
const processFiles = async (files) => {
  const processes = files.map(async (file, index) => {
    try {
      // Симуляция обработки файла
      console.log(\`Начинаем обработку файла \${index + 1}: \${file.name}\`)

      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          // Симуляция обработки
          setTimeout(() => {
            resolve({
              name: file.name,
              size: file.size,
              processed: true,
              data: e.target.result
            })
          }, Math.random() * 2000)
        }

        reader.onerror = () => reject(new Error(\`Ошибка чтения файла \${file.name}\`))

        reader.readAsText(file)
      })

      console.log(\`Файл \${file.name} обработан успешно\`)
      return result

    } catch (error) {
      console.error(\`Ошибка обработки файла \${file.name}:, error.message\`)
      return {
        name: file.name,
        processed: false,
        error: error.message
      }
    }
  })

  return Promise.all(processes)
}

// 3. Валидация данных с множественными проверками
const validateUserData = async (userData) => {
  const validations = [
    // Проверка email
    async () => {
      const response = await fetch(\`/api/validate/email/\${userData.email}\`)
      const result = await response.json()
      return { field: 'email', valid: result.valid, message: result.message }
    },

    // Проверка username
    async () => {
      const response = await fetch(\`/api/validate/username/\${userData.username}\`)
      const result = await response.json()
      return { field: 'username', valid: result.valid, message: result.message }
    },

    // Проверка пароля
    async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          const valid = userData.password.length >= 8
          resolve({
            field: 'password',
            valid,
            message: valid ? 'OK' : 'Пароль слишком короткий'
          })
        }, 500)
      })
    }
  ]

  // Выполняем все проверки параллельно
  const results = await Promise.all(validations.map(v => v()))

  const isValid = results.every(r => r.valid)
  const errors = results.filter(r => !r.valid)

  return {
    valid: isValid,
    errors: errors.reduce((acc, curr) => ({
      ...acc,
      [curr.field]: curr.message
    }), {})
  }
}

// Использование валидации
const userData = {
  email: 'user@example.com',
  username: 'newuser',
  password: '12345'  // Короткий пароль
}

validateUserData(userData)
  .then(validation => {
    if (validation.valid) {
      console.log('Все данные валидны')
    } else {
      console.log('Ошибки валидации:', validation.errors)
    }
  })
`

const highlightedBasicExample = ref('')
const highlightedPromiseAll = ref('')
const highlightedPromiseMethods = ref('')
const highlightedDynamicCreation = ref('')
const highlightedErrorHandling = ref('')
const highlightedPerformance = ref('')
const highlightedPracticalExamples = ref('')

onMounted(() => {
  highlightedBasicExample.value = Prism.highlight(basicExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedPromiseAll.value = Prism.highlight(promiseAllSnippet, Prism.languages.javascript, 'javascript')
  highlightedPromiseMethods.value = Prism.highlight(promiseMethodsSnippet, Prism.languages.javascript, 'javascript')
  highlightedDynamicCreation.value = Prism.highlight(dynamicCreationSnippet, Prism.languages.javascript, 'javascript')
  highlightedErrorHandling.value = Prism.highlight(errorHandlingSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
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
              Выполнение итерируемых коллекций промисов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Итерируемая коллекция промисов</b> — это массив или другая структура данных, содержащая промисы,
              которые нужно выполнить одновременно. В JavaScript есть несколько способов запустить все промисы
              из коллекции сразу и обработать их результаты.
            </p>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Важно понимать:</strong> Промисы начинают выполняться сразу при создании!
              Если вы создали массив промисов, они уже запущены параллельно.
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Основные концепции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Promise.all - классический подход</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPromiseAll"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов Promise</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="blue-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="blue" class="mr-2">mdi-check-all</v-icon>
                    <h3 class="text-h6 font-weight-bold">Promise.all</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Поведение:</strong> Ждет все промисы</li>
                    <li><strong>Ошибки:</strong> Отклоняется при первой ошибке</li>
                    <li><strong>Результат:</strong> Массив всех результатов</li>
                    <li><strong>Когда:</strong> Все операции критичны</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="green-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="green" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Promise.allSettled</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Поведение:</strong> Ждет все промисы</li>
                    <li><strong>Ошибки:</strong> Никогда не отклоняется</li>
                    <li><strong>Результат:</strong> Массив со статусами</li>
                    <li><strong>Когда:</strong> Нужны все результаты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="orange-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="orange" class="mr-2">mdi-timer</v-icon>
                    <h3 class="text-h6 font-weight-bold">Promise.race</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Поведение:</strong> Первый завершенный</li>
                    <li><strong>Ошибки:</strong> Первая ошибка отклоняет</li>
                    <li><strong>Результат:</strong> Результат первого</li>
                    <li><strong>Когда:</strong> Таймауты, гонки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="purple-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="purple" class="mr-2">mdi-trophy</v-icon>
                    <h3 class="text-h6 font-weight-bold">Promise.any</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Поведение:</strong> Первый успешный</li>
                    <li><strong>Ошибки:</strong> Отклоняется если все провалились</li>
                    <li><strong>Результат:</strong> Первый успешный результат</li>
                    <li><strong>Когда:</strong> Fallback стратегии</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPromiseMethods"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Динамическое создание коллекций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDynamicCreation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Обработка ошибок</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedErrorHandling"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда промисы в массиве начинают выполняться?</p>
                <p class="font-weight-regular ma-0">
                  Промисы начинают выполняться <b>сразу при создании</b>, а не при вызове Promise.all().
                  Promise.all() только ожидает их завершения. Если нужно отложенное выполнение,
                  создавайте массив функций, возвращающих промисы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Promise.all и Promise.allSettled?</p>
                <p class="font-weight-regular ma-0">
                  <b>Promise.all</b> отклоняется при первой ошибке и возвращает только успешные результаты.
                  <b>Promise.allSettled</b> ждет все промисы и возвращает массив объектов со статусами
                  (fulfilled/rejected) и результатами/причинами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-
