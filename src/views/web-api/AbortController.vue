<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const abortBasicsSnippet = `
// =====================================
// ABORTCONTROLLER - основы
// =====================================

// 1. Создание AbortController
const controller = new AbortController()

// 2. Получение signal для передачи в запрос
const signal = controller.signal

console.log(signal.aborted)  // false - не отменен

// 3. Отмена запроса
controller.abort()

console.log(signal.aborted)  // true - отменен
console.log(signal.reason)   // undefined (по умолчанию)

// 4. Отмена с причиной
const controller2 = new AbortController()
controller2.abort('Пользователь отменил запрос')
console.log(controller2.signal.reason)  // "Пользователь отменил запрос"

// 5. Отмена с объектом ошибки
const controller3 = new AbortController()
controller3.abort(new Error('Timeout exceeded'))
console.log(controller3.signal.reason)  // Error: Timeout exceeded
`

const fetchAbortSnippet = `
// =====================================
// ОТМЕНА FETCH ЗАПРОСОВ
// =====================================

// 1. Простая отмена fetch
async function fetchWithAbort() {
  const controller = new AbortController()
  const signal = controller.signal

  try {
    const response = await fetch('https://api.example.com/data', {
      signal: signal  // Передаем signal в fetch
    })

    const data = await response.json()
    console.log('Данные получены:', data)

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Запрос был отменен')
    } else {
      console.error('Ошибка запроса:', error)
    }
  }

  // Отменяем запрос через 2 секунды
  setTimeout(() => {
    controller.abort()
    console.log('Запрос отменен по таймауту')
  }, 2000)
}

// 2. Отмена по кнопке
function setupCancellableRequest() {
  const controller = new AbortController()

  // Кнопка для отмены
  const cancelButton = document.getElementById('cancelButton')
  cancelButton.addEventListener('click', () => {
    controller.abort('Пользователь нажал отмену')
    cancelButton.disabled = true
  })

  // Выполняем запрос
  fetch('https://api.example.com/large-file', {
    signal: controller.signal
  })
    .then(response => response.blob())
    .then(blob => {
      console.log('Файл загружен:', blob.size, 'байт')
      cancelButton.disabled = true
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Загрузка отменена пользователем')
      } else {
        console.error('Ошибка загрузки:', error)
      }
    })
}

// 3. Автоматическая отмена по таймауту
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort(new Error(\`Timeout after \${timeoutMs}ms\`))
  }, timeoutMs)

  try {
    const response = await fetch(url, {
      signal: controller.signal
    })

    clearTimeout(timeoutId)  // Очищаем таймаут если запрос успешен

    return await response.json()

  } catch (error) {
    clearTimeout(timeoutId)

    if (error.name === 'AbortError') {
      console.error('Запрос превысил время ожидания')
      throw new Error(\`Request timeout after \${timeoutMs}ms\`)
    }

    throw error
  }
}

// Использование
try {
  const data = await fetchWithTimeout('https://api.example.com/slow', 3000)
  console.log(data)
} catch (error) {
  console.error('Ошибка:', error.message)
}

// 4. Повторный запрос после отмены
async function retryableRequest(url, maxRetries = 3) {
  let controller = null
  let retries = 0

  async function makeRequest() {
    controller = new AbortController()

    try {
      const response = await fetch(url, {
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
      }

      return await response.json()

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Запрос отменен, повтор не выполняется')
        throw error
      }

      if (retries < maxRetries) {
        retries++
        console.log(\`Повтор \${retries}/\${maxRetries}\`)
        await new Promise(resolve => setTimeout(resolve, 1000 * retries))
        return makeRequest()
      }

      throw error
    }
  }

  // Возвращаем объект с методом cancel
  return {
    promise: makeRequest(),
    cancel: () => controller?.abort('Отменено пользователем')
  }
}

// Использование
const request = retryableRequest('https://api.example.com/data')

// Можем отменить в любой момент
setTimeout(() => request.cancel(), 2000)

try {
  const data = await request.promise
  console.log(data)
} catch (error) {
  console.error('Запрос не удался:', error)
}
`

const multipleAbortSnippet = `
// =====================================
// ОТМЕНА НЕСКОЛЬКИХ ЗАПРОСОВ
// =====================================

// 1. Один контроллер для нескольких запросов
async function fetchMultipleWithAbort() {
  const controller = new AbortController()
  const signal = controller.signal

  try {
    // Все запросы используют один signal
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users', { signal }),
      fetch('https://api.example.com/posts', { signal }),
      fetch('https://api.example.com/comments', { signal })
    ])

    return {
      users: await users.json(),
      posts: await posts.json(),
      comments: await comments.json()
    }

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Все запросы отменены')
    }
    throw error
  }
}

// Отменяем все запросы одновременно
const controller = new AbortController()
const dataPromise = fetchMultipleWithAbort()

// Отменяем все через 3 секунды
setTimeout(() => {
  controller.abort()
}, 3000)

// 2. Отдельные контроллеры для каждого запроса
class RequestManager {
  constructor() {
    this.controllers = new Map()
  }

  async fetch(id, url, options = {}) {
    // Создаем новый контроллер для каждого запроса
    const controller = new AbortController()
    this.controllers.set(id, controller)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      this.controllers.delete(id)
      return await response.json()

    } catch (error) {
      this.controllers.delete(id)
      throw error
    }
  }

  // Отмена конкретного запроса
  abort(id) {
    const controller = this.controllers.get(id)
    if (controller) {
      controller.abort()
      this.controllers.delete(id)
    }
  }

  // Отмена всех активных запросов
  abortAll() {
    this.controllers.forEach(controller => controller.abort())
    this.controllers.clear()
  }

  // Получение количества активных запросов
  getActiveCount() {
    return this.controllers.size
  }
}

// Использование
const manager = new RequestManager()

// Запускаем несколько запросов
manager.fetch('users', 'https://api.example.com/users')
manager.fetch('posts', 'https://api.example.com/posts')
manager.fetch('comments', 'https://api.example.com/comments')

console.log('Активных запросов:', manager.getActiveCount())  // 3

// Отменяем конкретный запрос
manager.abort('posts')

console.log('Активных запросов:', manager.getActiveCount())  // 2

// Отменяем все
manager.abortAll()

console.log('Активных запросов:', manager.getActiveCount())  // 0

// 3. Promise.race с отменой
async function fetchWithRace(urls) {
  const controllers = urls.map(() => new AbortController())

  try {
    // Создаем промисы для всех URL
    const promises = urls.map((url, index) =>
      fetch(url, { signal: controllers[index].signal })
        .then(response => ({ index, response }))
    )

    // Ждем первый успешный ответ
    const { index, response } = await Promise.race(promises)

    // Отменяем все остальные запросы
    controllers.forEach((controller, i) => {
      if (i !== index) {
        controller.abort()
      }
    })

    return await response.json()

  } catch (error) {
    // Отменяем все при ошибке
    controllers.forEach(controller => controller.abort())
    throw error
  }
}

// Использование - берем ответ от самого быстрого сервера
const mirrors = [
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
]

const data = await fetchWithRace(mirrors)
console.log('Получены данные от первого ответившего сервера:', data)
`

const reactExamplesSnippet = `
// =====================================
// ABORTCONTROLLER В REACT
// =====================================

// 1. Базовое использование в useEffect
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Создаем контроллер для каждого эффекта
    const controller = new AbortController()

    async function fetchUser() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          \`https://api.example.com/users/\${userId}\`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        setUser(data)

      } catch (err) {
        // Игнорируем ошибки отмены
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        // Не обновляем loading если запрос был отменен
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    // Cleanup - отменяем запрос при размонтировании или изменении userId
    return () => {
      controller.abort()
    }
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// 2. Кастомный хук для fetch с отменой
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`)
        }

        const result = await response.json()

        // Проверяем, не был ли запрос отменен
        if (!controller.signal.aborted) {
          setData(result)
        }

      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, JSON.stringify(options)])

  return { data, loading, error }
}

// Использование хука
function UsersList() {
  const { data: users, loading, error } = useFetch(
    'https://api.example.com/users'
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// 3. Поисковая строка с debounce и отменой
function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef(null)

  useEffect(() => {
    // Отменяем предыдущий запрос
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    if (!query.trim()) {
      setResults([])
      return
    }

    // Debounce
    const timeoutId = setTimeout(async () => {
      controllerRef.current = new AbortController()
      setLoading(true)

      try {
        const response = await fetch(
          \`https://api.example.com/search?q=\${encodeURIComponent(query)}\`,
          { signal: controllerRef.current.signal }
        )

        const data = await response.json()

        if (!controllerRef.current.signal.aborted) {
          setResults(data)
          setLoading(false)
        }

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search error:', error)
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      clearTimeout(timeoutId)
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [query])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Searching...</div>}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

// 4. Пагинация с отменой предыдущих запросов
function PaginatedList() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef(null)

  useEffect(() => {
    // Отменяем предыдущий запрос страницы
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    controllerRef.current = new AbortController()
    setLoading(true)

    fetch(\`https://api.example.com/items?page=\${page}\`, {
      signal: controllerRef.current.signal
    })
      .then(response => response.json())
      .then(newData => {
        if (!controllerRef.current.signal.aborted) {
          setData(newData)
          setLoading(false)
        }
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error loading page:', error)
          setLoading(false)
        }
      })

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [page])

  return (
    <div>
      {loading && <div>Loading page {page}...</div>}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  )
}
`

const advancedExamplesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТЕХНИКИ
// =====================================

// 1. Создание derived signal из нескольких источников
class CombinedAbortSignal {
  constructor(...signals) {
    this.controller = new AbortController()

    // Отменяем если хотя бы один signal отменен
    for (const signal of signals) {
      if (signal.aborted) {
        this.controller.abort(signal.reason)
        break
      }

      signal.addEventListener('abort', () => {
        this.controller.abort(signal.reason)
      }, { once: true })
    }
  }

  get signal() {
    return this.controller.signal
  }
}

// Использование
const timeoutController = new AbortController()
const userController = new AbortController()

setTimeout(() => timeoutController.abort('Timeout'), 5000)

const combined = new CombinedAbortSignal(
  timeoutController.signal,
  userController.signal
)

fetch('https://api.example.com/data', {
  signal: combined.signal
}).catch(error => {
  console.log('Отменено:', error.name)
})

// Пользователь может отменить вручную
userController.abort('User cancelled')

// 2. AbortSignal.timeout() - встроенный метод (ES2023)
// Автоматическая отмена по таймауту без создания контроллера
try {
  const response = await fetch('https://api.example.com/data', {
    signal: AbortSignal.timeout(5000)  // 5 секунд
  })
  const data = await response.json()
  console.log(data)
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.error('Запрос превысил 5 секунд')
  }
}

// 3. AbortSignal.any() - комбинирование сигналов (ES2024)
// Отмена при первом сработавшем signal
const userController = new AbortController()
const timeoutSignal = AbortSignal.timeout(10000)

try {
  const response = await fetch('https://api.example.com/data', {
    signal: AbortSignal.any([
      userController.signal,
      timeoutSignal
    ])
  })
  const data = await response.json()
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Отменено пользователем или таймаутом')
  }
}

// 4. Отмена EventSource (Server-Sent Events)
function createSSEConnection(url) {
  const controller = new AbortController()
  const eventSource = new EventSource(url)

  controller.signal.addEventListener('abort', () => {
    eventSource.close()
    console.log('SSE connection closed')
  })

  eventSource.onmessage = (event) => {
    console.log('New message:', event.data)
  }

  return {
    eventSource,
    abort: () => controller.abort()
  }
}

// Использование
const connection = createSSEConnection('https://api.example.com/stream')

// Закрываем через 30 секунд
setTimeout(() => connection.abort(), 30000)

// 5. Отмена WebSocket соединения
class AbortableWebSocket {
  constructor(url) {
    this.controller = new AbortController()
    this.ws = new WebSocket(url)

    this.controller.signal.addEventListener('abort', () => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close(1000, 'Aborted by controller')
      }
    })
  }

  send(data) {
    if (!this.controller.signal.aborted) {
      this.ws.send(data)
    }
  }

  abort(reason) {
    this.controller.abort(reason)
  }

  get signal() {
    return this.controller.signal
  }
}

// Использование
const ws = new AbortableWebSocket('wss://api.example.com/ws')

ws.ws.onmessage = (event) => {
  console.log('Message:', event.data)
}

// Отменяем через 1 минуту
setTimeout(() => ws.abort('Session timeout'), 60000)

// 6. Отмена потоковой загрузки с прогрессом
async function downloadWithProgress(url, onProgress) {
  const controller = new AbortController()

  try {
    const response = await fetch(url, {
      signal: controller.signal
    })

    const contentLength = response.headers.get('content-length')
    const total = parseInt(contentLength, 10)
    let loaded = 0

    const reader = response.body.getReader()
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      chunks.push(value)
      loaded += value.length

      onProgress({
        loaded,
        total,
        percentage: (loaded / total) * 100
      })

      // Проверяем отмену в процессе чтения
      if (controller.signal.aborted) {
        reader.cancel()
        break
      }
    }

    return new Blob(chunks)

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Download cancelled')
    }
    throw error
  }
}

// Использование
const download = downloadWithProgress(
  'https://example.com/large-file.zip',
  ({ loaded, total, percentage }) => {
    console.log(\`Downloaded: \${percentage.toFixed(2)}%\`)
  }
)

// Отмена через кнопку
cancelButton.onclick = () => controller.abort()

// 7. Интеграция с Axios
import axios from 'axios'

// Отмена Axios запроса
const controller = new AbortController()

axios.get('https://api.example.com/data', {
  signal: controller.signal
})
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message)
    } else {
      console.error('Error:', error)
    }
  })

// Отменяем
controller.abort('Operation canceled by user')

// 8. Очередь запросов с отменой
class RequestQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency
    this.queue = []
    this.active = 0
    this.controllers = new Map()
  }

  async add(id, fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ id, fn, resolve, reject })
      this.process()
    })
  }

  async process() {
    if (this.active >= this.concurrency || this.queue.length === 0) {
      return
    }

    this.active++
    const { id, fn, resolve, reject } = this.queue.shift()

    const controller = new AbortController()
    this.controllers.set(id, controller)

    try {
      const result = await fn(controller.signal)
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.active--
      this.controllers.delete(id)
      this.process()
    }
  }

  abort(id) {
    const controller = this.controllers.get(id)
    if (controller) {
      controller.abort()
    }
  }

  abortAll() {
    this.controllers.forEach(controller => controller.abort())
    this.controllers.clear()
    this.queue = []
  }
}

// Использование
const queue = new RequestQueue(2)

// Добавляем запросы в очередь
queue.add('req1', (signal) =>
  fetch('https://api.example.com/data1', { signal })
    .then(r => r.json())
)

queue.add('req2', (signal) =>
  fetch('https://api.example.com/data2', { signal })
    .then(r => r.json())
)

// Отменяем конкретный запрос
queue.abort('req1')

// Отменяем все
queue.abortAll()
`

const polyfillsSnippet = `
// =====================================
// ПОЛИФИЛЛЫ И СОВМЕСТИМОСТЬ
// =====================================

// 1. Проверка поддержки
function checkAbortControllerSupport() {
  return typeof AbortController !== 'undefined'
}

if (!checkAbortControllerSupport()) {
  console.warn('AbortController not supported')
}

// 2. Простой полифилл для AbortController
if (typeof AbortController === 'undefined') {
  class AbortSignal extends EventTarget {
    constructor() {
      super()
      this.aborted = false
      this.reason = undefined
    }
  }

  class AbortController {
    constructor() {
      this.signal = new AbortSignal()
    }

    abort(reason) {
      if (this.signal.aborted) return

      this.signal.aborted = true
      this.signal.reason = reason

      this.signal.dispatchEvent(new Event('abort'))
    }
  }

  window.AbortController = AbortController
  window.AbortSignal = AbortSignal
}

// 3. Полифилл для AbortSignal.timeout()
if (!AbortSignal.timeout) {
  AbortSignal.timeout = function(ms) {
    const controller = new AbortController()

    setTimeout(() => {
      const error = new DOMException(
        'The operation was aborted due to timeout',
        'TimeoutError'
      )
      controller.abort(error)
    }, ms)

    return controller.signal
  }
}

// 4. Полифилл для AbortSignal.any()
if (!AbortSignal.any) {
  AbortSignal.any = function(signals) {
    const controller = new AbortController()

    for (const signal of signals) {
      if (signal.aborted) {
        controller.abort(signal.reason)
        return controller.signal
      }

      signal.addEventListener('abort', () => {
        controller.abort(signal.reason)
      }, { once: true })
    }

    return controller.signal
  }
}

// 5. Обертка для старых браузеров
function createAbortableFetch() {
  // Проверяем поддержку signal в fetch
  const supportsSignal = 'signal' in new Request('')

  if (supportsSignal) {
    return fetch
  }

  // Полифилл для старых браузеров
  return function abortableFetch(url, options = {}) {
    const { signal, ...fetchOptions } = options

    if (!signal) {
      return fetch(url, fetchOptions)
    }

    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }

      const xhr = new XMLHttpRequest()

      xhr.open(fetchOptions.method || 'GET', url)

      // Устанавливаем заголовки
      if (fetchOptions.headers) {
        Object.entries(fetchOptions.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value)
        })
      }

      xhr.onload = () => {
        resolve(new Response(xhr.responseText, {
          status: xhr.status,
          statusText: xhr.statusText
        }))
      }

      xhr.onerror = () => {
        reject(new TypeError('Network request failed'))
      }

      // Подписываемся на abort
      signal.addEventListener('abort', () => {
        xhr.abort()
        reject(new DOMException('Aborted', 'AbortError'))
      })

      xhr.send(fetchOptions.body)
    })
  }
}

// Использование полифилла
const safeFetch = createAbortableFetch()

const controller = new AbortController()

safeFetch('https://api.example.com/data', {
  signal: controller.signal
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request aborted')
    }
  })

// 6. Graceful degradation
function fetchWithAbortSupport(url, options = {}) {
  const { signal, ...fetchOptions } = options

  // Проверяем поддержку
  const supportsAbort = 'signal' in new Request('')

  if (supportsAbort && signal) {
    return fetch(url, { ...fetchOptions, signal })
  }

  // Fallback без поддержки отмены
  console.warn('AbortController not supported, request cannot be cancelled')
  return fetch(url, fetchOptions)
}
`

const highlightedAbortBasics = ref('')
const highlightedFetchAbort = ref('')
const highlightedMultipleAbort = ref('')
const highlightedReactExamples = ref('')
const highlightedAdvancedExamples = ref('')
const highlightedPolyfills = ref('')

onMounted(() => {
  highlightedAbortBasics.value = Prism.highlight(abortBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedFetchAbort.value = Prism.highlight(fetchAbortSnippet, Prism.languages.javascript, 'javascript')
  highlightedMultipleAbort.value = Prism.highlight(multipleAbortSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactExamples.value = Prism.highlight(reactExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedAdvancedExamples.value = Prism.highlight(advancedExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedPolyfills.value = Prism.highlight(polyfillsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              AbortController: прерывание запросов и загрузки ресурсов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>AbortController</b> — это Web API для прерывания асинхронных операций, таких как fetch запросы,
              загрузка файлов, потоковые операции. Состоит из двух частей: <b>AbortController</b> (управление) и
              <b>AbortSignal</b> (сигнал для передачи в API).
            </p>

            <!-- Основная концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Основная концепция</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-controller</v-icon>
                    <h3 class="text-h6 font-weight-bold">AbortController</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Создает <code>signal</code></li>
                    <li>Метод <code>abort()</code> для отмены</li>
                    <li>Можно передать причину отмены</li>
                    <li>Одноразовый (нельзя переиспользовать)</li>
                    <li>Может отменить множество операций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-signal</v-icon>
                    <h3 class="text-h6 font-weight-bold">AbortSignal</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Передается в асинхронные API</li>
                    <li>Свойство <code>aborted</code> (boolean)</li>
                    <li>Свойство <code>reason</code> (причина отмены)</li>
                    <li>Событие <code>'abort'</code></li>
                    <li>Только для чтения (readonly)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с AbortController</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Паттерн:</strong> Создать контроллер → Получить signal → Передать в API → Вызвать abort() для отмены
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAbortBasics"></code></pre>

            <!-- Отмена fetch -->
            <h2 class="text-h5 font-weight-bold mb-3">Отмена fetch запросов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFetchAbort"></code></pre>

            <!-- Множественные запросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Отмена нескольких запросов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleAbort"></code></pre>

            <!-- React примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Использование в React</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-react</v-icon>
              <strong>Best Practice:</strong> Всегда отменяйте запросы в cleanup функции useEffect
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactExamples"></code></pre>

            <!-- Продвинутые техники -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedExamples"></code></pre>

            <!-- Поддержка API -->
            <h2 class="text-h5 font-weight-bold mb-3">API поддерживающие AbortSignal</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">API</th>
                <th class="text-left font-weight-bold">Поддержка</th>
                <th class="text-left font-weight-bold">Примечание</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>fetch()</code></td>
                <td class="text-success">✅ Полная</td>
                <td>Стандартная поддержка</td>
              </tr>
              <tr>
                <td><code>addEventListener()</code></td>
                <td class="text-success">✅ Полная</td>
                <td>Автоматическое удаление слушателя</td>
              </tr>
              <tr>
                <td><code>setTimeout()</code> / <code>setInterval()</code></td>
                <td class="text-warning">⚠️ Частичная</td>
                <td>Через обертку</td>
              </tr>
              <tr>
                <td>Streams API</td>
                <td class="text-success">✅ Полная</td>
                <td>ReadableStream, WritableStream</td>
              </tr>
              <tr>
                <td>FileReader</td>
                <td class="text-warning">❌ Нет</td>
                <td>Использовать метод abort()</td>
              </tr>
              <tr>
                <td>XMLHttpRequest</td>
                <td class="text-warning">❌ Нет</td>
                <td>Использовать метод abort()</td>
              </tr>
              <tr>
                <td>WebSocket</td>
                <td class="text-warning">❌ Нет</td>
                <td>Использовать метод close()</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Совместимость -->
            <h2 class="text-h5 font-weight-bold mb-3">Совместимость и полифиллы</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Поддержка браузерами</h3>
                  <ul class="pl-4">
                    <li><strong>Chrome:</strong> 66+ ✅</li>
                    <li><strong>Firefox:</strong> 57+ ✅</li>
                    <li><strong>Safari:</strong> 12.1+ ✅</li>
                    <li><strong>Edge:</strong> 79+ ✅</li>
                    <li><strong>IE:</strong> ❌ Не поддерживается</li>
                    <li><strong>Node.js:</strong> 15+ ✅</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Новые методы</h3>
                  <ul class="pl-4">
                    <li><code>AbortSignal.timeout(ms)</code> - ES2023</li>
                    <li><code>AbortSignal.any(signals)</code> - ES2024</li>
                    <li><code>AbortSignal.throwIfAborted()</code> - ES2024</li>
                    <li>Проверяйте поддержку перед использованием</li>
                    <li>Используйте полифиллы при необходимости</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPolyfills"></code></pre>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает AbortController?</p>
                <p class="font-weight-regular ma-0">
                  AbortController создает AbortSignal, который передается в асинхронные API (fetch, addEventListener).
                  При вызове <code>controller.abort()</code> signal переходит в состояние "aborted" и триггерит
                  событие 'abort', что позволяет API прервать операцию.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли переиспользовать AbortController?</p>
                <p class="font-weight-regular ma-0">
                  Нет, AbortController одноразовый. После вызова <code>abort()</code> нельзя "сбросить" состояние.
                  Для новой операции нужно создать новый экземпляр. Однако один контроллер может отменить
                  множество операций, использующих его signal.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отменить несколько fetch запросов одновременно?</p>
                <p class="font-weight-regular ma-0">
                  Создать один AbortController и передать его signal во все запросы. При вызове <code>abort()</code>
                  все запросы с этим signal будут отменены одновременно. Для независимой отмены нужны
                  отдельные контроллеры для каждого запроса.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать таймаут для fetch?</p>
                <p class="font-weight-regular ma-0">
                  Два способа: 1) Создать AbortController, установить setTimeout для вызова <code>abort()</code>.
                  2) Использовать <code>AbortSignal.timeout(ms)</code> (ES2023) — более короткий и чистый вариант.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему важно отменять запросы в React useEffect?</p>
                <p class="font-weight-regular ma-0">
                  При размонтировании компонента или изменении зависимостей запрос может завершиться после
                  размонтирования, вызывая setState на несуществующем компоненте (memory leak, warning).
                  Отмена запроса в cleanup функции предотвращает эти проблемы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при вызове abort() после завершения запроса?</p>
                <p class="font-weight-regular ma-0">
                  Ничего плохого не произойдет. Если запрос уже завершен, вызов <code>abort()</code> безопасен
                  и не вызовет ошибок. Signal просто перейдет в состояние aborted, но это не повлияет на
                  уже полученный результат.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обработать отмену в catch блоке?</p>
                <p class="font-weight-regular ma-0">
                  Проверять <code>error.name === 'AbortError'</code>. При отмене fetch выбрасывает DOMException
                  с именем 'AbortError'. Важно отличать отмену от реальных ошибок сети для правильной
                  обработки и логирования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как комбинировать несколько AbortSignal?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>AbortSignal.any([signal1, signal2, ...])</code> (ES2024) или создать
                  собственный класс, который слушает все signals и отменяется при первой отмене любого из них.
                  Полезно для комбинирования таймаута и пользовательской отмены.
                </p>
              </li>
            </ol>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов к отмене</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>AbortController</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Стандартный API</li>
                    <li>Поддержка fetch</li>
                    <li>Декларативный</li>
                    <li>Композируемый</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Относительно новый</li>
                    <li>Нужен полифилл для старых браузеров</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Флаги (let cancelled = false)</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Простота</li>
                    <li>Работает везде</li>
                    <li>Нет зависимостей</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Не отменяет сетевые запросы</li>
                    <li>Только проверка в коде</li>
                    <li>Не композируется</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Promise.race()</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Простая логика</li>
                    <li>Работает с любыми промисами</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Не отменяет запрос</li>
                    <li>Игнорирует результат</li>
                    <li>Утечка ресурсов</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Axios CancelToken</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Встроено в Axios</li>
                    <li>Хорошая документация</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Только для Axios</li>
                    <li>Deprecated (используйте AbortController)</li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </v-table>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Всегда отменять в React cleanup</li>
                    <li>Проверять <code>error.name === 'AbortError'</code></li>
                    <li>Создавать новый контроллер для каждой операции</li>
                    <li>Использовать <code>AbortSignal.timeout()</code> для таймаутов</li>
                    <li>Передавать причину отмены</li>
                    <li>Обрабатывать отмену gracefully</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Переиспользования контроллера</li>
                    <li>Игнорирования AbortError</li>
                    <li>Обновления state после abort</li>
                    <li>Забывать отменять в cleanup</li>
                    <li>Использовать Promise.race вместо abort</li>
                    <li>Полагаться только на флаги</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте менеджер запросов</li>
                    <li>Комбинируйте signals для сложных сценариев</li>
                    <li>Логируйте причины отмены</li>
                    <li>Показывайте feedback пользователю</li>
                    <li>Тестируйте отмену запросов</li>
                    <li>Документируйте поведение при отмене</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Паттерны использования -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные паттерны использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Когда использовать</h3>
                  <ul class="pl-4">
                    <li>Отмена fetch запросов</li>
                    <li>Таймауты для операций</li>
                    <li>Поиск с debounce</li>
                    <li>Навигация между страницами</li>
                    <li>Размонтирование React компонентов</li>
                    <li>Отмена загрузки больших файлов</li>
                    <li>Множественные параллельные запросы</li>
                    <li>WebSocket/SSE подключения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Альтернативы</h3>
                  <ul class="pl-4">
                    <li><strong>Флаги:</strong> для синхронных операций</li>
                    <li><strong>Debounce:</strong> для уменьшения запросов</li>
                    <li><strong>Throttle:</strong> для ограничения частоты</li>
                    <li><strong>Memoization:</strong> для кеширования</li>
                    <li><strong>SWR/React Query:</strong> для управления данными</li>
                    <li><strong>Очередь запросов:</strong> для последовательности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>AbortController</b> — это стандартный современный способ прерывания асинхронных операций в JavaScript.
              Он позволяет отменять fetch запросы, загрузку ресурсов, слушатели событий и другие операции через
              единый API. Ключевые компоненты: <b>AbortController</b> (управление), <b>AbortSignal</b> (сигнал),
              метод <code>abort()</code> (отмена) и обработка <b>AbortError</b>. Критически важно использовать
              в React для предотвращения утечек памяти и обновлений размонтированных компонентов. Современные
              методы <code>AbortSignal.timeout()</code> и <code>AbortSignal.any()</code> упрощают работу с таймаутами
              и комбинированием сигналов.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController"
                target="_blank"
                class="mr-2">
                MDN AbortController
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal"
                target="_blank"
                class="mr-2">
                MDN AbortSignal
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://developer.chrome.com/blog/abortable-fetch"
                target="_blank">
                Chrome Developers Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
