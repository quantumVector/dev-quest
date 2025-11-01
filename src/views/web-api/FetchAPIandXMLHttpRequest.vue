<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const fetchBasicsSnippet = `
// =====================================
// FETCH API - современный подход
// =====================================

// 1. Простой GET запрос
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))

// 2. Async/await версия
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users')

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`)
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

// 3. POST запрос с JSON
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })

  return response.json()
}

// 4. Загрузка файла
async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData  // НЕТ Content-Type - браузер установит сам!
  })

  return response.json()
}

// 5. Обработка разных типов ответов
async function handleResponse(url) {
  const response = await fetch(url)

  // Проверяем Content-Type
  const contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')) {
    return response.json()
  } else if (contentType.includes('text/')) {
    return response.text()
  } else if (contentType.includes('image/')) {
    return response.blob()
  } else {
    return response.arrayBuffer()
  }
}

// 6. Отмена запроса через AbortController
const controller = new AbortController()

fetch('https://api.example.com/data', {
  signal: controller.signal
})
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Запрос отменен')
    }
  })

// Отменить через 5 секунд
setTimeout(() => controller.abort(), 5000)

// 7. Timeout через AbortController
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
`

const fetchLimitationsSnippet = `
// =====================================
// ОГРАНИЧЕНИЯ FETCH API
// =====================================

// ❌ 1. НЕТ прогресса загрузки (upload progress)
async function uploadWithFetch(file) {
  const response = await fetch('/upload', {
    method: 'POST',
    body: file
  })

  // ❌ Невозможно отследить прогресс ОТПРАВКИ
  // Fetch не предоставляет событий для прогресса upload

  return response.json()
}

// ✅ Прогресс СКАЧИВАНИЯ есть (через ReadableStream)
async function downloadWithProgress(url) {
  const response = await fetch(url)
  const reader = response.body.getReader()
  const contentLength = +response.headers.get('Content-Length')

  let receivedLength = 0
  const chunks = []

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    chunks.push(value)
    receivedLength += value.length

    const progress = (receivedLength / contentLength) * 100
    console.log(\`Downloaded: \${progress.toFixed(2)}%\`)
  }

  return new Blob(chunks)
}

// ❌ 2. НЕТ синхронных запросов
// Fetch всегда асинхронный!
// const response = fetch(url)  // ❌ Вернет Promise, а не данные

// ❌ 3. НЕТ событий onprogress, onload, onerror
// Только then/catch или async/await

// ❌ 4. НЕТ возможности отправить запрос в событии unload
window.addEventListener('beforeunload', (e) => {
  // ❌ Fetch может не успеть выполниться
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({ event: 'page_close' })
  })
  // Браузер может прервать запрос при закрытии страницы
})

// ✅ Для unload используйте navigator.sendBeacon
window.addEventListener('beforeunload', () => {
  navigator.sendBeacon('/analytics', JSON.stringify({ event: 'page_close' }))
})

// ❌ 5. Невозможно получить прогресс загрузки файла на сервер
// (только прогресс скачивания с сервера)
`

const xmlHttpRequestBasicsSnippet = `
// =====================================
// XMLHTTPREQUEST - классический подход
// =====================================

// 1. Простой GET запрос
const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://api.example.com/users')

xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText)
    console.log(data)
  } else {
    console.error('Error:', xhr.status)
  }
}

xhr.onerror = function() {
  console.error('Network error')
}

xhr.send()

// 2. POST запрос с JSON
const xhr = new XMLHttpRequest()

xhr.open('POST', 'https://api.example.com/users')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.onload = function() {
  if (xhr.status === 201) {
    const result = JSON.parse(xhr.responseText)
    console.log('User created:', result)
  }
}

xhr.send(JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com'
}))

// 3. Все события XMLHttpRequest
const xhr = new XMLHttpRequest()

xhr.onloadstart = () => console.log('Запрос начат')
xhr.onprogress = (e) => {
  if (e.lengthComputable) {
    const percent = (e.loaded / e.total) * 100
    console.log(\`Загружено: \${percent}%\`)
  }
}
xhr.onload = () => console.log('Запрос завершен')
xhr.onloadend = () => console.log('Завершение (всегда вызывается)')
xhr.onerror = () => console.error('Ошибка сети')
xhr.onabort = () => console.log('Запрос отменен')
xhr.ontimeout = () => console.error('Timeout')

xhr.open('GET', '/large-file.json')
xhr.timeout = 5000  // 5 секунд
xhr.send()

// 4. Отмена запроса
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data')
xhr.send()

// Отменить запрос
setTimeout(() => xhr.abort(), 1000)

// 5. Синхронный запрос (НЕ РЕКОМЕНДУЕТСЯ!)
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data', false)  // false = синхронный
xhr.send()

// Код блокируется до получения ответа
console.log('Response:', xhr.responseText)

// 6. Получение различных типов данных
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data')

// Тип ответа
xhr.responseType = 'json'  // 'text', 'blob', 'arraybuffer', 'document'

xhr.onload = () => {
  console.log(xhr.response)  // Уже распарсен как JSON
}

xhr.send()
`

const uploadProgressSnippet = `
// =====================================
// ПРОГРЕСС ЗАГРУЗКИ ФАЙЛА (upload.onprogress)
// =====================================

// ✅ XMLHttpRequest - ЕДИНСТВЕННЫЙ способ отследить прогресс ОТПРАВКИ

function uploadFileWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    // ⭐ КЛЮЧЕВОЕ: xhr.upload.onprogress
    // Отслеживает прогресс ОТПРАВКИ на сервер
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        onProgress(percentComplete, event.loaded, event.total)
      }
    }

    // Другие события upload
    xhr.upload.onloadstart = () => {
      console.log('Начало отправки')
    }

    xhr.upload.onload = () => {
      console.log('Файл отправлен на сервер')
    }

    xhr.upload.onerror = () => {
      console.error('Ошибка при отправке')
    }

    xhr.upload.onabort = () => {
      console.log('Отправка отменена')
    }

    // Обработка ответа сервера
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(\`Upload failed: \${xhr.status}\`))
      }
    }

    xhr.onerror = () => reject(new Error('Network error'))

    xhr.open('POST', '/upload')
    xhr.send(formData)
  })
}

// Использование
const fileInput = document.querySelector('#fileInput')

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0]

  try {
    const result = await uploadFileWithProgress(
      file,
      (percent, loaded, total) => {
        console.log(\`Загружено \${percent.toFixed(2)}%\`)
        console.log(\`\${loaded} из \${total} байт\`)

        // Обновление UI
        const progressBar = document.querySelector('#progressBar')
        progressBar.style.width = percent + '%'
        progressBar.textContent = \`\${Math.round(percent)}%\`
      }
    )

    console.log('Успех:', result)
  } catch (error) {
    console.error('Ошибка:', error)
  }
})

// Полный пример с интерфейсом
function createUploadUI() {
  const container = document.createElement('div')

  container.innerHTML = \`
    <input type="file" id="fileInput">
    <div class="progress-container">
      <div class="progress-bar" id="progressBar">0%</div>
    </div>
    <div id="status"></div>
  \`

  const input = container.querySelector('#fileInput')
  const progressBar = container.querySelector('#progressBar')
  const status = container.querySelector('#status')

  input.addEventListener('change', async (e) => {
    const file = e.target.files[0]

    if (!file) return

    status.textContent = 'Загрузка...'

    try {
      await uploadFileWithProgress(
        file,
        (percent, loaded, total) => {
          progressBar.style.width = percent + '%'
          progressBar.textContent = \`\${Math.round(percent)}%\`

          const loadedMB = (loaded / 1024 / 1024).toFixed(2)
          const totalMB = (total / 1024 / 1024).toFixed(2)
          status.textContent = \`Загружено \${loadedMB} MB из \${totalMB} MB\`
        }
      )

      status.textContent = 'Загрузка завершена!'
      progressBar.style.backgroundColor = '#4caf50'
    } catch (error) {
      status.textContent = 'Ошибка: ' + error.message
      progressBar.style.backgroundColor = '#f44336'
    }
  })

  return container
}

// Отмена загрузки
let uploadXHR = null

function uploadFileWithCancel(file, onProgress) {
  return new Promise((resolve, reject) => {
    uploadXHR = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    uploadXHR.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100
        onProgress(percent)
      }
    }

    uploadXHR.onload = () => {
      if (uploadXHR.status >= 200 && uploadXHR.status < 300) {
        resolve(JSON.parse(uploadXHR.responseText))
      } else {
        reject(new Error(\`Upload failed: \${uploadXHR.status}\`))
      }
      uploadXHR = null
    }

    uploadXHR.onerror = () => {
      reject(new Error('Network error'))
      uploadXHR = null
    }

    uploadXHR.upload.onabort = () => {
      reject(new Error('Upload cancelled'))
      uploadXHR = null
    }

    uploadXHR.open('POST', '/upload')
    uploadXHR.send(formData)
  })
}

function cancelUpload() {
  if (uploadXHR) {
    uploadXHR.abort()
    uploadXHR = null
  }
}
`

const beforeUnloadSnippet = `
// =====================================
// ИСПОЛЬЗОВАНИЕ В СОБЫТИЯХ UNLOAD/BEFOREUNLOAD
// =====================================

// ❌ ПРОБЛЕМА: Fetch может не успеть выполниться
window.addEventListener('beforeunload', (e) => {
  // Fetch запрос может быть прерван браузером
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({
      event: 'page_close',
      timestamp: Date.now()
    })
  })
  // ⚠️ НЕ ГАРАНТИРОВАНО, что запрос дойдет до сервера
})

// ✅ РЕШЕНИЕ 1: navigator.sendBeacon (ЛУЧШИЙ СПОСОБ)
window.addEventListener('beforeunload', () => {
  const data = JSON.stringify({
    event: 'page_close',
    timestamp: Date.now(),
    url: window.location.href
  })

  // sendBeacon гарантирует отправку данных
  navigator.sendBeacon('/analytics', data)

  // Альтернатива с Blob для JSON
  const blob = new Blob([data], { type: 'application/json' })
  navigator.sendBeacon('/analytics', blob)
})

// ✅ РЕШЕНИЕ 2: XMLHttpRequest синхронный (НЕ РЕКОМЕНДУЕТСЯ)
window.addEventListener('beforeunload', () => {
  const xhr = new XMLHttpRequest()

  // ВАЖНО: третий параметр false = синхронный запрос
  xhr.open('POST', '/analytics', false)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send(JSON.stringify({
    event: 'page_close',
    timestamp: Date.now()
  }))

  // ⚠️ БЛОКИРУЕТ закрытие страницы до завершения запроса
  // ⚠️ Deprecated в большинстве браузеров
  // ⚠️ Ухудшает UX
})

// ✅ РЕШЕНИЕ 3: Fetch с keepalive (современное решение)
window.addEventListener('beforeunload', () => {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({
      event: 'page_close',
      timestamp: Date.now()
    }),
    // keepalive гарантирует завершение запроса
    keepalive: true
  })
})

// Сравнение методов для beforeunload/unload
const analyticsStrategies = {
  // 1. sendBeacon - лучший выбор
  sendBeacon: () => {
    window.addEventListener('beforeunload', () => {
      const data = collectAnalytics()
      navigator.sendBeacon('/analytics', JSON.stringify(data))
    })
  },

  // 2. Fetch с keepalive - хорошая альтернатива
  fetchKeepAlive: () => {
    window.addEventListener('beforeunload', () => {
      fetch('/analytics', {
        method: 'POST',
        body: JSON.stringify(collectAnalytics()),
        keepalive: true
      })
    })
  },

  // 3. XHR синхронный - устарело, но работает везде
  xhrSync: () => {
    window.addEventListener('beforeunload', () => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/analytics', false)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(collectAnalytics()))
    })
  }
}

function collectAnalytics() {
  return {
    url: window.location.href,
    timeOnPage: Date.now() - window.performance.timing.navigationStart,
    scrollDepth: window.scrollY / document.body.scrollHeight,
    interactions: getInteractions(),
    timestamp: Date.now()
  }
}

// Практический пример: отслеживание времени на странице
class PageTimeTracker {
  constructor() {
    this.startTime = Date.now()
    this.setupUnloadHandler()
  }

  setupUnloadHandler() {
    // Используем visibilitychange + beforeunload

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendTimeData()
      }
    })

    window.addEventListener('beforeunload', () => {
      this.sendTimeData()
    })
  }

  sendTimeData() {
    const timeOnPage = Date.now() - this.startTime

    const data = {
      url: window.location.href,
      timeOnPage,
      timestamp: Date.now()
    }

    // Используем sendBeacon для надежности
    navigator.sendBeacon(
      '/analytics/time',
      JSON.stringify(data)
    )
  }
}

// Использование
const tracker = new PageTimeTracker()

// Универсальная функция для отправки данных при закрытии
function sendOnUnload(url, data) {
  // Проверяем поддержку методов
  if (navigator.sendBeacon) {
    // Лучший способ
    return navigator.sendBeacon(url, JSON.stringify(data))
  } else if ('keepalive' in Request.prototype) {
    // Fetch с keepalive
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      keepalive: true
    })
  } else {
    // Fallback на синхронный XHR
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
    return xhr.status >= 200 && xhr.status < 300
  }
}

// Использование в beforeunload
window.addEventListener('beforeunload', () => {
  sendOnUnload('/analytics', {
    event: 'page_close',
    data: collectAnalytics()
  })
})
`

const comparisonSnippet = `
// =====================================
// СРАВНЕНИЕ FETCH VS XMLHTTPREQUEST
// =====================================

// Одна и та же задача разными способами

// 1. Простой GET запрос
// --- Fetch ---
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))

// --- XMLHttpRequest ---
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/users')
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText))
  }
}
xhr.onerror = () => console.error('Error')
xhr.send()

// 2. POST запрос с JSON
// --- Fetch ---
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})
  .then(response => response.json())

// --- XMLHttpRequest ---
const xhr = new XMLHttpRequest()
xhr.open('POST', '/api/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.onload = () => console.log(JSON.parse(xhr.responseText))
xhr.send(JSON.stringify({ name: 'John' }))

// 3. Загрузка файла с прогрессом
// --- Fetch (НЕТ upload progress) ---
fetch('/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
// ❌ Невозможно отследить прогресс отправки

// --- XMLHttpRequest (ЕСТЬ upload progress) ---
const xhr = new XMLHttpRequest()
xhr.upload.onprogress = (e) => {
  const percent = (e.loaded / e.total) * 100
  console.log(\`Загружено: \${percent}%\`)
}
xhr.open('POST', '/upload')
xhr.send(formData)

// 4. Отмена запроса
// --- Fetch ---
const controller = new AbortController()
fetch('/data', { signal: controller.signal })
controller.abort()  // Отмена

// --- XMLHttpRequest ---
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data')
xhr.send()
xhr.abort()  // Отмена

// 5. Timeout
// --- Fetch ---
const controller = new AbortController()
setTimeout(() => controller.abort(), 5000)
fetch('/data', { signal: controller.signal })

// --- XMLHttpRequest ---
const xhr = new XMLHttpRequest()
xhr.timeout = 5000
xhr.ontimeout = () => console.log('Timeout')
xhr.open('GET', '/data')
xhr.send()

// 6. Прогресс скачивания
// --- Fetch ---
const response = await fetch('/large-file')
const reader = response.body.getReader()
const contentLength = +response.headers.get('Content-Length')

let receivedLength = 0
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  receivedLength += value.length
  console.log(\`Downloaded: \${(receivedLength / contentLength * 100).toFixed(2)}%\`)
}

// --- XMLHttpRequest ---
const xhr = new XMLHttpRequest()
xhr.onprogress = (e) => {
  if (e.lengthComputable) {
    const percent = (e.loaded / e.total) * 100
    console.log(\`Downloaded: \${percent.toFixed(2)}%\`)
  }
}
xhr.open('GET', '/large-file')
xhr.send()
`

const whenToUseSnippet = `
// =====================================
// КОГДА ИСПОЛЬЗОВАТЬ ЧТО
// =====================================

// ✅ ИСПОЛЬЗУЙТЕ FETCH КОГДА:

// 1. Обычные API запросы
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()
}

// 2. Современный асинхронный код
async function loadUser(id) {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}

// 3. Работа с промисами и async/await
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(([users, posts, comments]) => {
    console.log({ users, posts, comments })
  })

// 4. Streaming данных (прогресс скачивания)
async function downloadWithProgress(url) {
  const response = await fetch(url)
  const reader = response.body.getReader()
  // ... обработка потока
}

// ✅ ИСПОЛЬЗУЙТЕ XMLHTTPREQUEST КОГДА:

// 1. Нужен прогресс ОТПРАВКИ файла
function uploadWithProgress(file) {
  const xhr = new XMLHttpRequest()

  xhr.upload.onprogress = (e) => {
    const percent = (e.loaded / e.total) * 100
    updateProgressBar(percent)
  }

  xhr.open('POST', '/upload')
  xhr.send(file)
}

// 2. Работа в событиях unload/beforeunload (с синхронным запросом)
window.addEventListener('beforeunload', () => {
  // Вариант 1: sendBeacon (ЛУЧШЕ)
  navigator.sendBeacon('/analytics', data)

  // Вариант 2: XHR синхронный (если sendBeacon недоступен)
  if (!navigator.sendBeacon) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/analytics', false)  // синхронный
    xhr.send(data)
  }
})

// 3. Нужна поддержка старых браузеров (IE10+)
function legacyRequest(url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = () => callback(JSON.parse(xhr.responseText))
  xhr.send()
}

// 4. Нужен полный контроль над событиями
function requestWithEvents(url) {
  const xhr = new XMLHttpRequest()

  xhr.onloadstart = () => console.log('Start')
  xhr.onprogress = (e) => console.log('Progress:', e.loaded)
  xhr.onload = () => console.log('Load')
  xhr.onloadend = () => console.log('End')
  xhr.onerror = () => console.error('Error')
  xhr.onabort = () => console.log('Abort')
  xhr.ontimeout = () => console.log('Timeout')

  xhr.open('GET', url)
  xhr.timeout = 5000
  xhr.send()
}

// 5. Синхронные запросы (НЕ РЕКОМЕНДУЕТСЯ, но иногда нужно)
function syncRequest(url) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, false)  // false = синхронный
  xhr.send()
  return JSON.parse(xhr.responseText)
}

// ❌ НЕ ИСПОЛЬЗУЙТЕ FETCH КОГДА:
// - Нужен прогресс отправки файла
// - Работа в beforeunload/unload (используйте sendBeacon)
// - Нужна поддержка IE10 (хотя есть полифиллы)

// ❌ НЕ ИСПОЛЬЗУЙТЕ XMLHTTPREQUEST КОГДА:
// - Пишете новый код (используйте Fetch)
// - Не нужны специфичные возможности XHR
// - Хотите более чистый и читаемый код
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Загрузка множества файлов с общим прогрессом
class MultiFileUploader {
  constructor(files, url) {
    this.files = Array.from(files)
    this.url = url
    this.totalSize = this.files.reduce((sum, file) => sum + file.size, 0)
    this.uploadedSize = 0
  }

  async upload(onProgress) {
    const results = []

    for (const file of this.files) {
      const result = await this.uploadSingleFile(file, onProgress)
      results.push(result)
    }

    return results
  }

  uploadSingleFile(file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      formData.append('file', file)

      let lastLoaded = 0

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          // Обновляем общий прогресс
          this.uploadedSize += (e.loaded - lastLoaded)
          lastLoaded = e.loaded

          const totalPercent = (this.uploadedSize / this.totalSize) * 100
          onProgress(totalPercent, this.uploadedSize, this.totalSize)
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(\`Upload failed: \${xhr.status}\`))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))

      xhr.open('POST', this.url)
      xhr.send(formData)
    })
  }
}

// Использование
const fileInput = document.querySelector('#fileInput')
fileInput.addEventListener('change', async (e) => {
  const uploader = new MultiFileUploader(e.target.files, '/upload')

  try {
    const results = await uploader.upload((percent, loaded, total) => {
      console.log(\`Общий прогресс: \${percent.toFixed(2)}%\`)
      console.log(\`Загружено: \${(loaded / 1024 / 1024).toFixed(2)} MB\`)
      console.log(\`Всего: \${(total / 1024 / 1024).toFixed(2)} MB\`)
    })

    console.log('Все файлы загружены:', results)
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  }
})

// 2. Chunked upload большого файла
class ChunkedFileUploader {
  constructor(file, chunkSize = 1024 * 1024) {  // 1MB chunks
    this.file = file
    this.chunkSize = chunkSize
    this.totalChunks = Math.ceil(file.size / chunkSize)
  }

  async upload(url, onProgress) {
    for (let i = 0; i < this.totalChunks; i++) {
      await this.uploadChunk(url, i, onProgress)
    }
  }

  uploadChunk(url, chunkIndex, onProgress) {
    return new Promise((resolve, reject) => {
      const start = chunkIndex * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      const chunk = this.file.slice(start, end)

      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      formData.append('chunk', chunk)
      formData.append('chunkIndex', chunkIndex.toString())
      formData.append('totalChunks', this.totalChunks.toString())
      formData.append('filename', this.file.name)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const chunkProgress = (e.loaded / e.total) * 100
          const totalProgress = ((chunkIndex + chunkProgress / 100) / this.totalChunks) * 100

          onProgress({
            totalPercent: totalProgress,
            currentChunk: chunkIndex + 1,
            totalChunks: this.totalChunks,
            chunkPercent: chunkProgress
          })
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(\`Chunk \${chunkIndex} upload failed\`))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))

      xhr.open('POST', url)
      xhr.send(formData)
    })
  }
}

// Использование
const largeFile = document.querySelector('#fileInput').files[0]
const uploader = new ChunkedFileUploader(largeFile)

await uploader.upload('/upload-chunk', (progress) => {
  console.log(\`Общий прогресс: \${progress.totalPercent.toFixed(2)}%\`)
  console.log(\`Chunk \${progress.currentChunk}/\${progress.totalChunks}\`)
})

// 3. Retry механизм для XHR
function xhrWithRetry(url, options = {}, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    let attempt = 0

    function tryRequest() {
      const xhr = new XMLHttpRequest()

      xhr.open(options.method || 'GET', url)

      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value)
        })
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText)
        } else if (attempt < maxRetries) {
          attempt++
          console.log(\`Retry \${attempt}/\${maxRetries}\`)
          setTimeout(tryRequest, 1000 * attempt)  // Exponential backoff
        } else {
          reject(new Error(\`Failed after \${maxRetries} retries\`))
        }
      }

      xhr.onerror = () => {
        if (attempt < maxRetries) {
          attempt++
          console.log(\`Retry \${attempt}/\${maxRetries}\`)
          setTimeout(tryRequest, 1000 * attempt)
        } else {
          reject(new Error('Network error'))
        }
      }

      xhr.send(options.body)
    }

    tryRequest()
  })
}

// 4. Универсальная функция с выбором метода
async function universalRequest(url, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    uploadProgress,
    downloadProgress,
    timeout = 0
  } = options

  // Если нужен upload progress - используем XHR
  if (uploadProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          uploadProgress((e.loaded / e.total) * 100)
        }
      }

      if (downloadProgress) {
        xhr.onprogress = (e) => {
          if (e.lengthComputable) {
            downloadProgress((e.loaded / e.total) * 100)
          }
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(\`Request failed: \${xhr.status}\`))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))

      if (timeout) {
        xhr.timeout = timeout
        xhr.ontimeout = () => reject(new Error('Timeout'))
      }

      xhr.open(method, url)

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.send(body)
    })
  }

  // Иначе используем Fetch
  const controller = new AbortController()

  if (timeout) {
    setTimeout(() => controller.abort(), timeout)
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
    signal: controller.signal
  })

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`)
  }

  return response.json()
}

// Использование
// С upload progress (используется XHR)
await universalRequest('/upload', {
  method: 'POST',
  body: formData,
  uploadProgress: (percent) => console.log(\`Upload: \${percent}%\`),
  timeout: 30000
})

// Без upload progress (используется Fetch)
await universalRequest('/api/users', {
  method: 'GET',
  timeout: 5000
})
`

const highlightedFetchBasics = ref('')
const highlightedFetchLimitations = ref('')
const highlightedXHRBasics = ref('')
const highlightedUploadProgress = ref('')
const highlightedBeforeUnload = ref('')
const highlightedComparison = ref('')
const highlightedWhenToUse = ref('')
const highlightedPracticalExamples = ref('')

onMounted(() => {
  highlightedFetchBasics.value = Prism.highlight(fetchBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedFetchLimitations.value = Prism.highlight(fetchLimitationsSnippet, Prism.languages.javascript, 'javascript')
  highlightedXHRBasics.value = Prism.highlight(xmlHttpRequestBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedUploadProgress.value = Prism.highlight(uploadProgressSnippet, Prism.languages.javascript, 'javascript')
  highlightedBeforeUnload.value = Prism.highlight(beforeUnloadSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedWhenToUse.value = Prism.highlight(whenToUseSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Fetch API vs XMLHttpRequest
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Fetch API</b> — современный способ выполнения HTTP-запросов с Promise-based интерфейсом.
              <b>XMLHttpRequest</b> — классический API, который всё ещё необходим для специфических задач:
              получения прогресса отправки файлов и работы в событиях unload/beforeunload.
            </p>

            <!-- Ключевые различия -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Fetch API</th>
                <th class="text-left font-weight-bold">XMLHttpRequest</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Синтаксис</strong></td>
                <td>Promise-based, async/await</td>
                <td>Callback-based, события</td>
              </tr>
              <tr>
                <td><strong>Прогресс отправки</strong></td>
                <td>❌ Нет</td>
                <td>✅ Есть (upload.onprogress)</td>
              </tr>
              <tr>
                <td><strong>Прогресс скачивания</strong></td>
                <td>✅ Через ReadableStream</td>
                <td>✅ Через onprogress</td>
              </tr>
              <tr>
                <td><strong>Синхронные запросы</strong></td>
                <td>❌ Только асинхронные</td>
                <td>✅ Есть (deprecated)</td>
              </tr>
              <tr>
                <td><strong>Работа в unload</strong></td>
                <td>❌ Может не успеть</td>
                <td>✅ Синхронный запрос работает</td>
              </tr>
              <tr>
                <td><strong>Timeout</strong></td>
                <td>Через AbortController</td>
                <td>Встроенное свойство timeout</td>
              </tr>
              <tr>
                <td><strong>Отмена запроса</strong></td>
                <td>AbortController</td>
                <td>xhr.abort()</td>
              </tr>
              <tr>
                <td><strong>Поддержка браузеров</strong></td>
                <td>Современные браузеры</td>
                <td>Все браузеры (IE10+)</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Fetch основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Fetch API - современный подход</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Рекомендуется:</strong> Используйте Fetch API для большинства HTTP-запросов в новом коде.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFetchBasics"></code></pre>

            <!-- Ограничения Fetch -->
            <h2 class="text-h5 font-weight-bold mb-3">Ограничения Fetch API</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Fetch не может отследить прогресс ОТПРАВКИ данных на сервер!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFetchLimitations"></code></pre>

            <!-- XMLHttpRequest основы -->
            <h2 class="text-h5 font-weight-bold mb-3">XMLHttpRequest - классический API</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedXHRBasics"></code></pre>

            <!-- ГЛАВНАЯ ТЕМА: Upload Progress -->
            <h2 class="text-h5 font-weight-bold mb-3">⭐ Прогресс загрузки файла (upload.onprogress)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевое преимущество XHR:</strong> Это единственный способ отследить прогресс ОТПРАВКИ данных на сервер!
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Fetch API</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>❌ НЕТ upload.onprogress</strong></li>
                    <li>Невозможно отследить прогресс отправки</li>
                    <li>Можно только прогресс скачивания (ReadableStream)</li>
                    <li>Пользователь не видит процесс загрузки файла</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">XMLHttpRequest</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>✅ ЕСТЬ upload.onprogress</strong></li>
                    <li>Отслеживание процента загрузки</li>
                    <li>Количество загруженных байт</li>
                    <li>Отображение progress bar для пользователя</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUploadProgress"></code></pre>

            <!-- ВТОРАЯ ГЛАВНАЯ ТЕМА: beforeunload/unload -->
            <h2 class="text-h5 font-weight-bold mb-3">⭐ Использование в событиях unload/beforeunload</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Проблема:</strong> При закрытии страницы Fetch может не успеть отправить данные!
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-star</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Лучшее решение</h3>
                  <p class="text-body-2"><code>navigator.sendBeacon()</code></p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Гарантирует отправку данных</li>
                    <li>Не блокирует закрытие страницы</li>
                    <li>Простой API</li>
                    <li>Поддерживается везде</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Альтернатива</h3>
                  <p class="text-body-2">Fetch с <code>keepalive: true</code></p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Современное решение</li>
                    <li>Promise-based</li>
                    <li>Хорошая поддержка</li>
                    <li>Похож на обычный Fetch</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Fallback</h3>
                  <p class="text-body-2">XHR синхронный</p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Работает везде</li>
                    <li>Гарантирует отправку</li>
                    <li>❌ Блокирует UI</li>
                    <li>❌ Deprecated</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBeforeUnload"></code></pre>

            <!-- Сравнение -->
            <h2 class="text-h5 font-weight-bold mb-3">Прямое сравнение синтаксиса</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <!-- Когда использовать что -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Fetch, а когда XMLHttpRequest</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWhenToUse"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Сценарии использования -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные сценарии использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте Fetch</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Обычные API запросы (GET, POST)</li>
                    <li>RESTful взаимодействие</li>
                    <li>Загрузка JSON данных</li>
                    <li>Современный асинхронный код</li>
                    <li>Работа с промисами</li>
                    <li>Прогресс скачивания файлов</li>
                    <li>Streaming данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-star-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте XMLHttpRequest</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Прогресс загрузки файлов</strong></li>
                    <li><strong>События unload/beforeunload</strong></li>
                    <li>Поддержка старых браузеров</li>
                    <li>Полный контроль над событиями</li>
                    <li>Синхронные запросы (крайний случай)</li>
                    <li>Встроенный timeout</li>
                    <li>Legacy код</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное преимущество Fetch перед XMLHttpRequest?</p>
                <p class="font-weight-regular ma-0">
                  Fetch предоставляет более чистый Promise-based API, лучше интегрируется с async/await,
                  имеет более простой синтаксис. Однако XMLHttpRequest всё ещё необходим для прогресса
                  загрузки файлов (upload.onprogress) и надежной отправки данных в событиях unload.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отследить прогресс загрузки файла на сервер?</p>
                <p class="font-weight-regular ma-0">
                  Только через XMLHttpRequest с использованием <code>xhr.upload.onprogress</code>.
                  Fetch API не предоставляет возможности отслеживать прогресс отправки данных.
                  Можно отслеживать только прогресс скачивания через ReadableStream.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как надежно отправить данные при закрытии страницы?</p>
                <p class="font-weight-regular ma-0">
                  Лучший способ — <code>navigator.sendBeacon()</code>. Альтернатива — Fetch с
                  <code>keepalive: true</code>. Fallback — синхронный XMLHttpRequest (deprecated, блокирует UI).
                  Обычный Fetch может не успеть выполниться при закрытии страницы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли отменить Fetch запрос?</p>
                <p class="font-weight-regular ma-0">
                  Да, через <code>AbortController</code>. Создаете controller, передаете его signal в fetch,
                  затем вызываете <code>controller.abort()</code>. В XMLHttpRequest отмена проще — просто
                  <code>xhr.abort()</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как установить timeout для Fetch?</p>
                <p class="font-weight-regular ma-0">
                  Fetch не имеет встроенного timeout. Нужно использовать AbortController с setTimeout:
                  создать controller, установить таймер на abort, передать signal в fetch.
                  XMLHttpRequest имеет встроенное свойство <code>xhr.timeout</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему Fetch не выбрасывает ошибку для HTTP 404 или 500?</p>
                <p class="font-weight-regular ma-0">
                  Fetch считает любой полученный HTTP-ответ успешным, даже с кодом ошибки. Promise
                  отклоняется только при сетевых ошибках. Нужно вручную проверять <code>response.ok</code>
                  или <code>response.status</code>. XMLHttpRequest также требует проверки status.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В каких случаях всё ещё нужен XMLHttpRequest?</p>
                <p class="font-weight-regular ma-0">
                  1) Прогресс загрузки файлов на сервер (upload.onprogress), 2) Отправка аналитики в
                  событиях beforeunload/unload (синхронный запрос), 3) Поддержка старых браузеров,
                  4) Legacy код, требующий обратной совместимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое navigator.sendBeacon и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  sendBeacon — метод для надежной отправки небольших данных (обычно аналитики) при закрытии
                  страницы. Гарантирует отправку без блокировки UI. Идеален для событий beforeunload/unload.
                  Ограничен размером данных (обычно ~64KB).
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте Fetch для новых проектов</li>
                    <li>XHR для прогресса загрузки файлов</li>
                    <li>sendBeacon для аналитики при закрытии</li>
                    <li>Обрабатывайте ошибки правильно</li>
                    <li>Проверяйте response.ok в Fetch</li>
                    <li>Используйте AbortController для отмены</li>
                    <li>Показывайте прогресс пользователю</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Синхронных XHR запросов</li>
                    <li>Fetch в событиях unload</li>
                    <li>Игнорирования статус кодов</li>
                    <li>Загрузки больших файлов без прогресса</li>
                    <li>XHR для обычных API запросов</li>
                    <li>Отсутствия timeout для запросов</li>
                    <li>Утечек памяти через незавершенные запросы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте универсальные обертки</li>
                    <li>Реализуйте retry механизм</li>
                    <li>Кешируйте повторяющиеся запросы</li>
                    <li>Применяйте debounce для поиска</li>
                    <li>Отменяйте устаревшие запросы</li>
                    <li>Логируйте сетевые ошибки</li>
                    <li>Тестируйте оффлайн режим</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Fetch API</b> — современный стандарт для HTTP-запросов с чистым Promise-based API.
              Используйте его для большинства задач. <b>XMLHttpRequest</b> всё ещё необходим в двух
              ключевых случаях: <b>1)</b> Получение прогресса загрузки файлов на сервер через
              <code>xhr.upload.onprogress</code> (Fetch это не может), <b>2)</b> Отправка данных
              в событиях <code>beforeunload/unload</code> (хотя <code>navigator.sendBeacon()</code>
              предпочтительнее). Понимание различий и правильный выбор инструмента критично для
              создания эффективных веб-приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
                target="_blank"
                class="mr-2">
                MDN Fetch API
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest"
                target="_blank"
                class="mr-2">
                MDN XMLHttpRequest
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon"
                target="_blank">
                MDN sendBeacon
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
