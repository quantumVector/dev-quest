<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const methodsOverviewSnippet = `
// =====================================
// ОБЗОР МЕТОДОВ ПОДДЕРЖАНИЯ СОЕДИНЕНИЯ
// =====================================

// 1. Short Polling (опрос) - устаревший метод
// Клиент регулярно отправляет запросы на сервер
setInterval(() => {
  fetch('/api/messages')
    .then(res => res.json())
    .then(data => console.log('New data:', data))
}, 5000) // Каждые 5 секунд

// ❌ Недостатки:
// - Много лишних запросов
// - Задержка получения данных (до интервала опроса)
// - Нагрузка на сервер
// - Неэффективное использование ресурсов

// 2. Long Polling - улучшенный опрос
async function longPoll() {
  try {
    const response = await fetch('/api/messages/long-poll')
    const data = await response.json()

    console.log('New data:', data)

    // Сразу делаем следующий запрос
    longPoll()
  } catch (error) {
    console.error('Error:', error)
    // Повтор через задержку при ошибке
    setTimeout(longPoll, 5000)
  }
}

longPoll()

// ✅ Преимущества:
// - Меньше лишних запросов
// - Данные приходят сразу
// ❌ Недостатки:
// - Все еще HTTP overhead
// - Сложнее масштабировать на сервере

// 3. Server-Sent Events (EventSource) - однонаправленная связь
const eventSource = new EventSource('/api/events')

eventSource.onmessage = (event) => {
  console.log('New message:', event.data)
}

eventSource.onerror = (error) => {
  console.error('EventSource error:', error)
}

// ✅ Преимущества:
// - Автоматическое переподключение
// - Простой API
// - Работает поверх HTTP
// ❌ Недостатки:
// - Только от сервера к клиенту
// - Ограничения на количество соединений

// 4. WebSockets - двусторонняя связь
const ws = new WebSocket('ws://localhost:3000')

ws.onopen = () => {
  console.log('Connected')
  ws.send('Hello Server!')
}

ws.onmessage = (event) => {
  console.log('Message from server:', event.data)
}

ws.onclose = () => {
  console.log('Disconnected')
}

// ✅ Преимущества:
// - Двусторонняя связь
// - Минимальный overhead
// - Реальное время
// - Лучшая производительность
// ❌ Недостатки:
// - Требует WebSocket сервер
// - Сложнее с proxy/firewall
// - Нужно управлять переподключением
`

const webSocketsBasicsSnippet = `
// =====================================
// WEBSOCKETS - ОСНОВЫ
// =====================================

// Создание WebSocket соединения
const ws = new WebSocket('ws://localhost:3000')
// Для защищенного соединения: wss://

// Состояния WebSocket
console.log(ws.readyState)
// 0 - CONNECTING (подключение)
// 1 - OPEN (открыто)
// 2 - CLOSING (закрывается)
// 3 - CLOSED (закрыто)

// События WebSocket
ws.onopen = (event) => {
  console.log('Соединение установлено')
  console.log('ReadyState:', ws.readyState) // 1 (OPEN)

  // Теперь можно отправлять сообщения
  ws.send('Hello Server!')
}

ws.onmessage = (event) => {
  console.log('Получено сообщение:', event.data)

  // Данные могут быть строкой, Blob или ArrayBuffer
  if (typeof event.data === 'string') {
    const message = JSON.parse(event.data)
    console.log('JSON message:', message)
  } else if (event.data instanceof Blob) {
    console.log('Binary data (Blob):', event.data)
  } else if (event.data instanceof ArrayBuffer) {
    console.log('Binary data (ArrayBuffer):', event.data)
  }
}

ws.onerror = (error) => {
  console.error('WebSocket ошибка:', error)
}

ws.onclose = (event) => {
  console.log('Соединение закрыто')
  console.log('Code:', event.code)     // Код закрытия
  console.log('Reason:', event.reason) // Причина закрытия
  console.log('Clean:', event.wasClean) // Корректное ли закрытие

  // Коды закрытия:
  // 1000 - Normal Closure
  // 1001 - Going Away
  // 1002 - Protocol Error
  // 1003 - Unsupported Data
  // 1006 - Abnormal Closure (нет close frame)
  // 1009 - Message Too Big
}

// Отправка различных типов данных

// 1. Текст (строка)
ws.send('Hello!')

// 2. JSON
ws.send(JSON.stringify({
  type: 'message',
  content: 'Hello!'
}))

// 3. Blob
const blob = new Blob(['Binary data'], { type: 'application/octet-stream' })
ws.send(blob)

// 4. ArrayBuffer
const buffer = new ArrayBuffer(8)
ws.send(buffer)

// 5. TypedArray
const bytes = new Uint8Array([1, 2, 3, 4, 5])
ws.send(bytes)

// Закрытие соединения
ws.close()                      // Нормальное закрытие
ws.close(1000, 'Normal close')  // С кодом и причиной

// Проверка состояния перед отправкой
function sendMessage(message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message)
  } else {
    console.error('WebSocket не готов. State:', ws.readyState)
  }
}
`

const webSocketsAdvancedSnippet = `
// =====================================
// WEBSOCKETS - ПРОДВИНУТОЕ ИСПОЛЬЗОВАНИЕ
// =====================================

// Класс-обертка для WebSocket с автопереподключением
class ReconnectingWebSocket {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      reconnectInterval: 1000,    // Начальная задержка
      maxReconnectInterval: 30000, // Максимальная задержка
      reconnectDecay: 1.5,         // Множитель задержки
      maxReconnectAttempts: null,  // null = бесконечно
      ...options
    }

    this.reconnectAttempts = 0
    this.messageQueue = []         // Очередь сообщений
    this.forcedClose = false
    this.timedOut = false

    this.onopen = null
    this.onclose = null
    this.onmessage = null
    this.onerror = null

    this.connect()
  }

  connect() {
    this.ws = new WebSocket(this.url)

    // Timeout для подключения
    const timeout = setTimeout(() => {
      this.timedOut = true
      this.ws.close()
    }, 5000)

    this.ws.onopen = (event) => {
      clearTimeout(timeout)
      console.log('WebSocket подключен')

      this.reconnectAttempts = 0
      this.timedOut = false

      // Отправляем накопленные сообщения
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift()
        this.ws.send(message)
      }

      if (this.onopen) this.onopen(event)
    }

    this.ws.onmessage = (event) => {
      if (this.onmessage) this.onmessage(event)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket ошибка:', error)
      if (this.onerror) this.onerror(error)
    }

    this.ws.onclose = (event) => {
      clearTimeout(timeout)

      if (this.forcedClose) {
        console.log('WebSocket закрыт вручную')
        if (this.onclose) this.onclose(event)
        return
      }

      console.log('WebSocket закрыт, переподключение...')

      // Проверяем лимит попыток
      if (
        this.options.maxReconnectAttempts &&
        this.reconnectAttempts >= this.options.maxReconnectAttempts
      ) {
        console.error('Достигнут лимит попыток переподключения')
        if (this.onclose) this.onclose(event)
        return
      }

      // Вычисляем задержку с экспоненциальным ростом
      const delay = Math.min(
        this.options.reconnectInterval *
        Math.pow(this.options.reconnectDecay, this.reconnectAttempts),
        this.options.maxReconnectInterval
      )

      this.reconnectAttempts++

      console.log(\`Попытка \${this.reconnectAttempts}, задержка \${delay}ms\`)

      setTimeout(() => this.connect(), delay)
    }
  }

  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      console.warn('WebSocket не готов, сообщение добавлено в очередь')
      this.messageQueue.push(message)
    }
  }

  close() {
    this.forcedClose = true
    this.ws.close()
  }

  get readyState() {
    return this.ws.readyState
  }
}

// Использование
const rws = new ReconnectingWebSocket('ws://localhost:3000', {
  reconnectInterval: 1000,
  maxReconnectAttempts: 10
})

rws.onopen = () => console.log('Подключено')
rws.onmessage = (event) => console.log('Сообщение:', event.data)
rws.onerror = (error) => console.error('Ошибка:', error)
rws.onclose = () => console.log('Закрыто')

// Отправка сообщений
rws.send(JSON.stringify({ type: 'ping' }))

// Система heartbeat (проверка соединения)
class WebSocketWithHeartbeat extends ReconnectingWebSocket {
  constructor(url, options = {}) {
    super(url, options)

    this.heartbeatInterval = options.heartbeatInterval || 30000 // 30 секунд
    this.heartbeatTimer = null
    this.pongTimeout = null

    const originalOnOpen = this.onopen
    this.onopen = (event) => {
      this.startHeartbeat()
      if (originalOnOpen) originalOnOpen(event)
    }

    const originalOnClose = this.onclose
    this.onclose = (event) => {
      this.stopHeartbeat()
      if (originalOnClose) originalOnClose(event)
    }

    const originalOnMessage = this.onmessage
    this.onmessage = (event) => {
      const data = JSON.parse(event.data)

      // Обработка pong ответа
      if (data.type === 'pong') {
        clearTimeout(this.pongTimeout)
        return
      }

      if (originalOnMessage) originalOnMessage(event)
    }
  }

  startHeartbeat() {
    this.stopHeartbeat()

    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.send(JSON.stringify({ type: 'ping' }))

        // Ожидаем pong в течение 5 секунд
        this.pongTimeout = setTimeout(() => {
          console.warn('Нет ответа на ping, переподключение...')
          this.ws.close()
        }, 5000)
      }
    }, this.heartbeatInterval)
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout)
      this.pongTimeout = null
    }
  }
}

// Использование с heartbeat
const wsWithHeartbeat = new WebSocketWithHeartbeat('ws://localhost:3000', {
  heartbeatInterval: 30000,
  reconnectInterval: 1000
})

// WebSocket с обработкой комнат и событий
class WebSocketClient {
  constructor(url) {
    this.ws = new ReconnectingWebSocket(url)
    this.eventHandlers = new Map()

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handleMessage(message)
    }
  }

  on(eventType, handler) {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, [])
    }
    this.eventHandlers.get(eventType).push(handler)
  }

  off(eventType, handler) {
    if (!this.eventHandlers.has(eventType)) return

    const handlers = this.eventHandlers.get(eventType)
    const index = handlers.indexOf(handler)

    if (index > -1) {
      handlers.splice(index, 1)
    }
  }

  handleMessage(message) {
    const { type, data } = message

    if (this.eventHandlers.has(type)) {
      this.eventHandlers.get(type).forEach(handler => {
        handler(data)
      })
    }
  }

  emit(eventType, data) {
    this.ws.send(JSON.stringify({
      type: eventType,
      data: data
    }))
  }

  joinRoom(roomId) {
    this.emit('join', { room: roomId })
  }

  leaveRoom(roomId) {
    this.emit('leave', { room: roomId })
  }

  close() {
    this.ws.close()
  }
}

// Использование
const client = new WebSocketClient('ws://localhost:3000')

// Подписка на события
client.on('message', (data) => {
  console.log('Новое сообщение:', data)
})

client.on('userJoined', (data) => {
  console.log('Пользователь присоединился:', data.username)
})

client.on('userLeft', (data) => {
  console.log('Пользователь вышел:', data.username)
})

// Отправка событий
client.emit('message', {
  text: 'Hello everyone!',
  timestamp: Date.now()
})

// Присоединение к комнате
client.joinRoom('chat-room-1')
`

const serverSentEventsSnippet = `
// =====================================
// SERVER-SENT EVENTS (EventSource)
// =====================================

// Создание EventSource
const eventSource = new EventSource('/api/events')

// Состояния EventSource
console.log(eventSource.readyState)
// 0 - CONNECTING (подключение)
// 1 - OPEN (открыто)
// 2 - CLOSED (закрыто)

// Обработка событий

// 1. Событие onopen - соединение установлено
eventSource.onopen = (event) => {
  console.log('Соединение установлено')
  console.log('ReadyState:', eventSource.readyState)
}

// 2. Событие onmessage - получено сообщение
eventSource.onmessage = (event) => {
  console.log('Новое сообщение:', event.data)

  // event.data - всегда строка
  // event.lastEventId - ID последнего события
  // event.origin - источник

  try {
    const data = JSON.parse(event.data)
    console.log('Parsed data:', data)
  } catch (e) {
    console.log('Plain text:', event.data)
  }
}

// 3. Событие onerror - ошибка соединения
eventSource.onerror = (error) => {
  console.error('EventSource ошибка:', error)

  // EventSource автоматически переподключается
  // Если хотите прекратить - закройте соединение
  if (eventSource.readyState === EventSource.CLOSED) {
    console.log('Соединение закрыто')
  }
}

// Обработка именованных событий
// Сервер может отправлять события с именами:
// event: userJoined
// data: {"username": "John"}

eventSource.addEventListener('userJoined', (event) => {
  const data = JSON.parse(event.data)
  console.log('Пользователь присоединился:', data.username)
})

eventSource.addEventListener('userLeft', (event) => {
  const data = JSON.parse(event.data)
  console.log('Пользователь вышел:', data.username)
})

eventSource.addEventListener('notification', (event) => {
  const notification = JSON.parse(event.data)
  showNotification(notification)
})

// Закрытие соединения
eventSource.close()

// EventSource с заголовками (через polyfill или библиотеку)
// Стандартный EventSource не поддерживает кастомные заголовки!

// Обертка для EventSource с переподключением
class ReconnectingEventSource {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      withCredentials: false,
      maxRetries: Infinity,
      retryDelay: 1000,
      ...options
    }

    this.retryCount = 0
    this.eventSource = null
    this.listeners = new Map()

    this.connect()
  }

  connect() {
    try {
      this.eventSource = new EventSource(this.url, {
        withCredentials: this.options.withCredentials
      })

      this.eventSource.onopen = (event) => {
        console.log('EventSource подключен')
        this.retryCount = 0

        if (this.onopen) this.onopen(event)
      }

      this.eventSource.onmessage = (event) => {
        if (this.onmessage) this.onmessage(event)
      }

      this.eventSource.onerror = (error) => {
        console.error('EventSource ошибка:', error)

        if (this.eventSource.readyState === EventSource.CLOSED) {
          this.reconnect()
        }

        if (this.onerror) this.onerror(error)
      }

      // Восстанавливаем все слушатели
      this.listeners.forEach((handlers, eventType) => {
        handlers.forEach(handler => {
          this.eventSource.addEventListener(eventType, handler)
        })
      })

    } catch (error) {
      console.error('Ошибка создания EventSource:', error)
      this.reconnect()
    }
  }

  reconnect() {
    if (this.retryCount >= this.options.maxRetries) {
      console.error('Достигнут лимит попыток переподключения')
      return
    }

    this.retryCount++

    const delay = this.options.retryDelay * Math.pow(2, this.retryCount - 1)

    console.log(\`Переподключение через \${delay}ms (попытка \${this.retryCount})\`)

    setTimeout(() => this.connect(), delay)
  }

  addEventListener(eventType, handler) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }

    this.listeners.get(eventType).push(handler)

    if (this.eventSource) {
      this.eventSource.addEventListener(eventType, handler)
    }
  }

  removeEventListener(eventType, handler) {
    if (!this.listeners.has(eventType)) return

    const handlers = this.listeners.get(eventType)
    const index = handlers.indexOf(handler)

    if (index > -1) {
      handlers.splice(index, 1)
    }

    if (this.eventSource) {
      this.eventSource.removeEventListener(eventType, handler)
    }
  }

  close() {
    this.retryCount = this.options.maxRetries
    if (this.eventSource) {
      this.eventSource.close()
    }
  }
}

// Использование
const res = new ReconnectingEventSource('/api/events', {
  maxRetries: 10,
  retryDelay: 1000
})

res.onopen = () => console.log('Подключено')
res.onmessage = (event) => console.log('Сообщение:', event.data)
res.onerror = (error) => console.error('Ошибка:', error)

res.addEventListener('notification', (event) => {
  const data = JSON.parse(event.data)
  console.log('Уведомление:', data)
})

// Закрытие
res.close()

// Формат сообщений от сервера (SSE):
/*
// Простое сообщение
data: Hello World!

// JSON сообщение
data: {"message": "Hello", "timestamp": 1234567890}

// Многострочное сообщение
data: First line
data: Second line
data: Third line

// Именованное событие
event: userJoined
data: {"username": "John"}

// С ID (для восстановления после разрыва)
id: 123
data: Message with ID

// С retry (интервал переподключения в мс)
retry: 10000
data: Message with custom retry
*/

// Обработка lastEventId для возобновления
class EventSourceWithResume {
  constructor(url) {
    this.url = url
    this.lastEventId = localStorage.getItem('lastEventId') || ''

    this.connect()
  }

  connect() {
    // Добавляем lastEventId в URL
    const urlWithId = this.lastEventId
      ? \`\${this.url}?lastEventId=\${this.lastEventId}\`
      : this.url

    this.eventSource = new EventSource(urlWithId)

    this.eventSource.onmessage = (event) => {
      // Сохраняем lastEventId
      if (event.lastEventId) {
        this.lastEventId = event.lastEventId
        localStorage.setItem('lastEventId', event.lastEventId)
      }

      console.log('Message:', event.data)
    }
  }
}
`

const comparisonSnippet = `
// =====================================
// СРАВНЕНИЕ: WebSockets vs Server-Sent Events
// =====================================

// WEBSOCKETS
// ===========

const ws = new WebSocket('ws://localhost:3000')

// ✅ Преимущества WebSockets:
// 1. Двусторонняя связь (full-duplex)
ws.send('Message from client')  // Клиент → Сервер
ws.onmessage = (e) => {          // Сервер → Клиент
  console.log(e.data)
}

// 2. Минимальный overhead
// Заголовок кадра: 2-14 байт
// vs HTTP заголовки: сотни байт

// 3. Поддержка бинарных данных
ws.send(new Uint8Array([1, 2, 3]))
ws.send(new Blob(['data']))

// 4. Низкая задержка
// Нет overhead HTTP запроса/ответа
// Идеально для игр, чатов, трейдинга

// 5. Лучше для частых обновлений
// Отправка 100 сообщений в секунду - норма

// ❌ Недостатки WebSockets:
// 1. Требует WebSocket сервер
// Нужна специальная имплементация на сервере

// 2. Сложности с proxy и firewall
// Некоторые корпоративные сети блокируют

// 3. Нет автоматического переподключения
// Нужно реализовывать самостоятельно

// 4. Проблемы с load balancing
// Sticky sessions или специальная настройка

// 5. Нет встроенного fallback
// Если WebSocket не поддерживается - нужна альтернатива

// SERVER-SENT EVENTS (EventSource)
// =================================

const eventSource = new EventSource('/api/events')

// ✅ Преимущества EventSource:
// 1. Простой API
eventSource.onmessage = (e) => {
  console.log(e.data)
}

// 2. Автоматическое переподключение
// Браузер сам переподключается при обрыве

// 3. Работает поверх HTTP
// Проще с proxy, firewall, load balancers

// 4. Поддержка lastEventId
// Автоматическое возобновление с последнего события
eventSource.onmessage = (e) => {
  console.log('Last ID:', e.lastEventId)
}

// 5. Именованные события
eventSource.addEventListener('notification', (e) => {
  console.log('Notification:', e.data)
})

// 6. Встроен в браузер
// Не нужны библиотеки для базового функционала

// ❌ Недостатки EventSource:
// 1. Только от сервера к клиенту
// Нельзя отправить данные с клиента (только GET запросы)

// 2. Только текстовые данные
// Нет поддержки бинарных данных

// 3. Ограничение соединений
// HTTP/1.1: 6 соединений на домен
// HTTP/2: лучше, но все равно ограничено

// 4. Нельзя добавить заголовки
// Стандартный EventSource не поддерживает кастомные заголовки

// 5. Больший overhead чем WebSocket
// HTTP заголовки в каждом сообщении

// КОГДА ИСПОЛЬЗОВАТЬ ЧТО:
// =======================

// Используйте WEBSOCKETS когда:
const webSocketUseCases = {
  // 1. Нужна двусторонняя связь
  chat: () => {
    ws.send(JSON.stringify({ message: 'Hello' }))  // Отправка
    ws.onmessage = (e) => { /* Получение */ }       // Получение
  },

  // 2. Высокая частота обновлений
  liveTrading: () => {
    // 100+ сообщений в секунду
    ws.onmessage = (e) => {
      updatePriceChart(JSON.parse(e.data))
    }
  },

  // 3. Нужны бинарные данные
  videoStreaming: () => {
    ws.binaryType = 'arraybuffer'
    ws.onmessage = (e) => {
      processVideoFrame(e.data)
    }
  },

  // 4. Многопользовательские игры
  multiplayer: () => {
    ws.send(JSON.stringify({
      type: 'move',
      x: 10,
      y: 20
    }))
  },

  // 5. Коллаборативное редактирование
  collaborative: () => {
    ws.send(JSON.stringify({
      type: 'edit',
      position: 42,
      text: 'new'
    }))
  }
}

// Используйте EVENTSOURCE когда:
const eventSourceUseCases = {
  // 1. Только от сервера к клиенту
  notifications: () => {
    eventSource.addEventListener('notification', (e) => {
      showNotification(JSON.parse(e.data))
    })
  },

  // 2. Обновления новостной ленты
  newsFeed: () => {
    eventSource.onmessage = (e) => {
      const article = JSON.parse(e.data)
      addArticleToFeed(article)
    }
  },

  // 3. Мониторинг и дашборды
  monitoring: () => {
    eventSource.addEventListener('metric', (e) => {
      updateDashboard(JSON.parse(e.data))
    })
  },

  // 4. Прогресс длительных операций
  progressTracking: () => {
    eventSource.addEventListener('progress', (e) => {
      const { percent, status } = JSON.parse(e.data)
      updateProgressBar(percent, status)
    })
  },

  // 5. Автоматическое обновление контента
  liveScores: () => {
    eventSource.onmessage = (e) => {
      const score = JSON.parse(e.data)
      updateScoreboard(score)
    }
  }
}

// Сравнение характеристик
const comparison = {
  characteristic: {
    direction: {
      websocket: 'Двусторонняя (full-duplex)',
      eventSource: 'Односторонняя (сервер → клиент)'
    },
    dataTypes: {
      websocket: 'Текст + Бинарные данные',
      eventSource: 'Только текст (строки)'
    },
    reconnection: {
      websocket: 'Вручную (нужно реализовать)',
      eventSource: 'Автоматическое (встроено)'
    },
    overhead: {
      websocket: 'Минимальный (2-14 байт)',
      eventSource: 'HTTP заголовки (больше)'
    },
    protocol: {
      websocket: 'ws:// или wss://',
      eventSource: 'HTTP/HTTPS'
    },
    complexity: {
      websocket: 'Сложнее (сервер + клиент)',
      eventSource: 'Проще (стандартный HTTP)'
    },
    browserSupport: {
      websocket: 'Все современные браузеры',
      eventSource: 'Все кроме IE (полифилл есть)'
    }
  }
}
`

const longPollingSnippet = `
// =====================================
// LONG POLLING - АЛЬТЕРНАТИВА
// =====================================

// Long Polling - техника, где клиент отправляет запрос,
// а сервер держит соединение открытым до появления данных

// Базовая реализация Long Polling
class LongPolling {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      timeout: 30000,           // Timeout запроса
      reconnectDelay: 1000,     // Задержка между запросами
      maxRetries: Infinity,     // Максимум попыток
      ...options
    }

    this.isPolling = false
    this.retryCount = 0
    this.controller = null

    this.onmessage = null
    this.onerror = null
  }

  start() {
    if (this.isPolling) return

    this.isPolling = true
    this.retryCount = 0
    this.poll()
  }

  async poll() {
    if (!this.isPolling) return

    try {
      this.controller = new AbortController()

      // Timeout для запроса
      const timeoutId = setTimeout(
        () => this.controller.abort(),
        this.options.timeout
      )

      const response = await fetch(this.url, {
        signal: this.controller.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
      }

      const data = await response.json()

      // Сбрасываем счетчик ошибок
      this.retryCount = 0

      // Обрабатываем данные
      if (this.onmessage) {
        this.onmessage(data)
      }

      // Сразу делаем следующий запрос
      if (this.isPolling) {
        setTimeout(() => this.poll(), 0)
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Long polling timeout, повтор...')
      } else {
        console.error('Long polling error:', error)

        if (this.onerror) {
          this.onerror(error)
        }

        this.retryCount++

        // Проверяем лимит попыток
        if (this.retryCount >= this.options.maxRetries) {
          console.error('Достигнут лимит попыток')
          this.stop()
          return
        }
      }

      // Повторяем с задержкой
      if (this.isPolling) {
        const delay = this.options.reconnectDelay *
                      Math.min(this.retryCount, 10)

        setTimeout(() => this.poll(), delay)
      }
    }
  }

  stop() {
    this.isPolling = false

    if (this.controller) {
      this.controller.abort()
      this.controller = null
    }
  }

  send(data) {
    // Long Polling обычно только принимает данные
    // Для отправки используйте отдельные POST запросы
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

// Использование
const longPolling = new LongPolling('/api/long-poll', {
  timeout: 30000,
  reconnectDelay: 1000
})

longPolling.onmessage = (data) => {
  console.log('Получены данные:', data)

  // Обработка данных
  if (data.type === 'notification') {
    showNotification(data.content)
  }
}

longPolling.onerror = (error) => {
  console.error('Ошибка long polling:', error)
}

// Старт
longPolling.start()

// Остановка
longPolling.stop()

// Отправка данных
await longPolling.send({
  message: 'Hello Server'
})

// Long Polling с комнатами и событиями
class LongPollingClient {
  constructor(url) {
    this.longPolling = new LongPolling(url)
    this.eventHandlers = new Map()

    this.longPolling.onmessage = (data) => {
      this.handleMessage(data)
    }
  }

  handleMessage(message) {
    const { type, data } = message

    if (this.eventHandlers.has(type)) {
      this.eventHandlers.get(type).forEach(handler => {
        handler(data)
      })
    }
  }

  on(eventType, handler) {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, [])
    }
    this.eventHandlers.get(eventType).push(handler)
  }

  async emit(eventType, data) {
    await this.longPolling.send({
      type: eventType,
      data: data
    })
  }

  start() {
    this.longPolling.start()
  }

  stop() {
    this.longPolling.stop()
  }
}

// Использование
const client = new LongPollingClient('/api/long-poll')

client.on('message', (data) => {
  console.log('Новое сообщение:', data)
})

client.on('userJoined', (data) => {
  console.log('Пользователь присоединился:', data.username)
})

client.start()

// Отправка сообщения
await client.emit('message', {
  text: 'Hello!',
  timestamp: Date.now()
})

// Сравнение Long Polling с другими методами
const longPollingComparison = {
  advantages: [
    'Работает везде (HTTP)',
    'Не требует специального сервера',
    'Проще чем WebSockets',
    'Хорошо с proxy/firewall',
    'Можно использовать существующую инфраструктуру'
  ],

  disadvantages: [
    'Больше overhead чем WebSocket',
    'Задержка (latency) выше',
    'Больше нагрузка на сервер',
    'Сложнее масштабировать',
    'Каждый запрос = новое соединение'
  ],

  useCases: [
    'Fallback для WebSocket',
    'Корпоративные сети (строгий firewall)',
    'Нечастые обновления (каждые 5-30 сек)',
    'Простые чаты',
    'Уведомления (не критично к latency)'
  ]
}
`

const alternativesSnippet = `
// =====================================
// АЛЬТЕРНАТИВЫ И FALLBACK СТРАТЕГИИ
// =====================================

// 1. Универсальный клиент с автоматическим fallback
class UniversalRealtimeClient {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
    this.connection = null
    this.connectionType = null

    this.onmessage = null
    this.onerror = null
    this.onopen = null
    this.onclose = null

    this.connect()
  }

  async connect() {
    // Пробуем методы по приоритету
    const methods = [
      { type: 'websocket', test: () => this.tryWebSocket() },
      { type: 'eventsource', test: () => this.tryEventSource() },
      { type: 'longpolling', test: () => this.tryLongPolling() }
    ]

    for (const method of methods) {
      try {
        console.log(\`Пробуем \${method.type}...\`)
        await method.test()
        this.connectionType = method.type
        console.log(\`Подключено через \${method.type}\`)
        return
      } catch (error) {
        console.error(\`\${method.type} не удался:\`, error)
      }
    }

    throw new Error('Все методы подключения не удались')
  }

  tryWebSocket() {
    return new Promise((resolve, reject) => {
      const wsUrl = this.url.replace(/^http/, 'ws')
      const ws = new WebSocket(wsUrl)

      const timeout = setTimeout(() => {
        ws.close()
        reject(new Error('WebSocket timeout'))
      }, 5000)

      ws.onopen = () => {
        clearTimeout(timeout)
        this.connection = ws

        ws.onmessage = (event) => {
          if (this.onmessage) {
            this.onmessage(JSON.parse(event.data))
          }
        }

        ws.onerror = (error) => {
          if (this.onerror) this.onerror(error)
        }

        ws.onclose = () => {
          if (this.onclose) this.onclose()
        }

        if (this.onopen) this.onopen()
        resolve()
      }

      ws.onerror = (error) => {
        clearTimeout(timeout)
        reject(error)
      }
    })
  }

  tryEventSource() {
    return new Promise((resolve, reject) => {
      const eventSource = new EventSource(this.url)

      const timeout = setTimeout(() => {
        eventSource.close()
        reject(new Error('EventSource timeout'))
      }, 5000)

      eventSource.onopen = () => {
        clearTimeout(timeout)
        this.connection = eventSource

        eventSource.onmessage = (event) => {
          if (this.onmessage) {
            this.onmessage(JSON.parse(event.data))
          }
        }

        eventSource.onerror = (error) => {
          if (this.onerror) this.onerror(error)
        }

        if (this.onopen) this.onopen()
        resolve()
      }

      eventSource.onerror = (error) => {
        clearTimeout(timeout)
        eventSource.close()
        reject(error)
      }
    })
  }

  tryLongPolling() {
    return new Promise((resolve) => {
      this.connection = new LongPolling(this.url)

      this.connection.onmessage = (data) => {
        if (this.onmessage) {
          this.onmessage(data)
        }
      }

      this.connection.onerror = (error) => {
        if (this.onerror) this.onerror(error)
      }

      this.connection.start()

      if (this.onopen) this.onopen()
      resolve()
    })
  }

  send(data) {
    if (this.connectionType === 'websocket') {
      this.connection.send(JSON.stringify(data))
    } else if (this.connectionType === 'longpolling') {
      return this.connection.send(data)
    } else {
      // EventSource не поддерживает отправку
      // Используем обычный HTTP POST
      return fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
  }

  close() {
    if (this.connection) {
      if (this.connectionType === 'websocket') {
        this.connection.close()
      } else if (this.connectionType === 'eventsource') {
        this.connection.close()
      } else if (this.connectionType === 'longpolling') {
        this.connection.stop()
      }
    }
  }
}

// Использование
const client = new UniversalRealtimeClient('/api/realtime')

client.onopen = () => {
  console.log('Подключено')
  console.log('Тип соединения:', client.connectionType)
}

client.onmessage = (data) => {
  console.log('Сообщение:', data)
}

client.onerror = (error) => {
  console.error('Ошибка:', error)
}

// Отправка
client.send({ message: 'Hello!' })

// 2. Polling как самый базовый fallback
class SimplePolling {
  constructor(url, interval = 5000) {
    this.url = url
    this.interval = interval
    this.timer = null
    this.lastData = null

    this.onmessage = null
  }

  start() {
    this.poll() // Первый запрос сразу

    this.timer = setInterval(() => {
      this.poll()
    }, this.interval)
  }

  async poll() {
    try {
      const response = await fetch(this.url)
      const data = await response.json()

      // Проверяем, изменились ли данные
      const dataStr = JSON.stringify(data)
      if (dataStr !== this.lastData) {
        this.lastData = dataStr

        if (this.onmessage) {
          this.onmessage(data)
        }
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

// 3. Библиотеки для автоматического fallback
// Socket.IO - популярная библиотека с автоматическим fallback
/*
import io from 'socket.io-client'

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'], // Попробует WebSocket, fallback на polling
  upgrade: true,                        // Апгрейд с polling на WebSocket если возможно
  reconnection: true,                   // Автопереподключение
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity
})

socket.on('connect', () => {
  console.log('Connected via', socket.io.engine.transport.name)
})

socket.on('message', (data) => {
  console.log('Message:', data)
})

socket.emit('message', { text: 'Hello!' })
*/

// 4. Проверка поддержки технологий
const checkSupport = {
  webSocket: () => {
    return 'WebSocket' in window
  },

  eventSource: () => {
    return 'EventSource' in window
  },

  fetch: () => {
    return 'fetch' in window
  },

  all: () => {
    return {
      webSocket: checkSupport.webSocket(),
      eventSource: checkSupport.eventSource(),
      fetch: checkSupport.fetch()
    }
  }
}

// Использование
const support = checkSupport.all()
console.log('Browser support:', support)

if (support.webSocket) {
  // Используем WebSocket
} else if (support.eventSource) {
  // Используем EventSource
} else {
  // Fallback на polling
}

// 5. Graceful degradation стратегия
class GracefulRealtimeConnection {
  constructor(url) {
    this.url = url
    this.connection = null
    this.setupConnection()
  }

  setupConnection() {
    if ('WebSocket' in window) {
      console.log('Используем WebSocket')
      this.connection = this.setupWebSocket()
    } else if ('EventSource' in window) {
      console.log('Используем EventSource')
      this.connection = this.setupEventSource()
    } else if ('fetch' in window) {
      console.log('Используем Long Polling')
      this.connection = this.setupLongPolling()
    } else {
      console.log('Используем Simple Polling')
      this.connection = this.setupSimplePolling()
    }
  }

  setupWebSocket() {
    const ws = new WebSocket(this.url.replace(/^http/, 'ws'))
    ws.onmessage = (e) => this.handleMessage(JSON.parse(e.data))
    return ws
  }

  setupEventSource() {
    const es = new EventSource(this.url)
    es.onmessage = (e) => this.handleMessage(JSON.parse(e.data))
    return es
  }

  setupLongPolling() {
    const lp = new LongPolling(this.url)
    lp.onmessage = (data) => this.handleMessage(data)
    lp.start()
    return lp
  }

  setupSimplePolling() {
    const sp = new SimplePolling(this.url, 5000)
    sp.onmessage = (data) => this.handleMessage(data)
    sp.start()
    return sp
  }

  handleMessage(data) {
    console.log('Message received:', data)
    // Обработка сообщения одинаково для всех методов
  }
}
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Чат-приложение с WebSocket
class ChatClient {
  constructor(url) {
    this.ws = new WebSocket(url)
    this.messageHandlers = []

    this.ws.onopen = () => {
      console.log('Подключено к чату')
      this.authenticate()
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handleMessage(message)
    }

    this.ws.onclose = () => {
      console.log('Отключено от чата')
      this.reconnect()
    }
  }

  authenticate() {
    this.send({
      type: 'auth',
      token: localStorage.getItem('authToken')
    })
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  sendMessage(text, roomId) {
    this.send({
      type: 'message',
      roomId: roomId,
      text: text,
      timestamp: Date.now()
    })
  }

  joinRoom(roomId) {
    this.send({
      type: 'join',
      roomId: roomId
    })
  }

  leaveRoom(roomId) {
    this.send({
      type: 'leave',
      roomId: roomId
    })
  }

  handleMessage(message) {
    switch (message.type) {
      case 'message':
        this.displayMessage(message)
        break
      case 'userJoined':
        this.showUserJoined(message.username)
        break
      case 'userLeft':
        this.showUserLeft(message.username)
        break
      case 'typing':
        this.showTypingIndicator(message.username)
        break
    }

    this.messageHandlers.forEach(handler => handler(message))
  }

  onMessage(handler) {
    this.messageHandlers.push(handler)
  }

  displayMessage(message) {
    const div = document.createElement('div')
    div.className = 'message'
    div.innerHTML = \`
      <span class="username">\${message.username}</span>
      <span class="text">\${message.text}</span>
      <span class="time">\${new Date(message.timestamp).toLocaleTimeString()}</span>
    \`
    document.getElementById('messages').appendChild(div)
  }

  showUserJoined(username) {
    console.log(\`\${username} присоединился\`)
  }

  showUserLeft(username) {
    console.log(\`\${username} вышел\`)
  }

  showTypingIndicator(username) {
    console.log(\`\${username} печатает...\`)
  }

  reconnect() {
    setTimeout(() => {
      console.log('Переподключение...')
      this.ws = new WebSocket(this.ws.url)
    }, 3000)
  }
}

// Использование
const chat = new ChatClient('ws://localhost:3000/chat')

chat.onMessage((message) => {
  console.log('Новое сообщение:', message)
})

chat.joinRoom('general')
chat.sendMessage('Hello everyone!', 'general')

// 2. Уведомления в реальном времени (EventSource)
class NotificationClient {
  constructor(url) {
    this.eventSource = new EventSource(url)
    this.notifications = []

    this.eventSource.addEventListener('notification', (event) => {
      const notification = JSON.parse(event.data)
      this.handleNotification(notification)
    })

    this.eventSource.addEventListener('badge', (event) => {
      const badge = JSON.parse(event.data)
      this.updateBadge(badge.count)
    })
  }

  handleNotification(notification) {
    this.notifications.push(notification)
    this.showNotification(notification)
    this.playSound()
  }

  showNotification(notification) {
    // Browser Notification API
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: notification.icon,
        badge: notification.badge
      })
    }

    // UI уведомление
    const div = document.createElement('div')
    div.className = 'notification toast'
    div.innerHTML = \`
      <div class="notification-title">\${notification.title}</div>
      <div class="notification-message">\${notification.message}</div>
    \`
    document.body.appendChild(div)

    setTimeout(() => div.remove(), 5000)
  }

  updateBadge(count) {
    const badge = document.getElementById('notification-badge')
    if (badge) {
      badge.textContent = count
      badge.style.display = count > 0 ? 'block' : 'none'
    }
  }

  playSound() {
    const audio = new Audio('/sounds/notification.mp3')
    audio.play().catch(err => console.log('Audio play failed:', err))
  }

  markAsRead(notificationId) {
    fetch(\`/api/notifications/\${notificationId}/read\`, {
      method: 'POST'
    })
  }

  close() {
    this.eventSource.close()
  }
}

// Использование
const notificationClient = new NotificationClient('/api/notifications/stream')

// 3. Live Dashboard (мониторинг метрик)
class DashboardClient {
  constructor(url) {
    this.eventSource = new EventSource(url)
    this.charts = new Map()

    this.eventSource.addEventListener('metric', (event) => {
      const metric = JSON.parse(event.data)
      this.updateMetric(metric)
    })

    this.eventSource.addEventListener('alert', (event) => {
      const alert = JSON.parse(event.data)
      this.showAlert(alert)
    })
  }

  updateMetric(metric) {
    const { name, value, timestamp } = metric

    // Обновляем график
    if (this.charts.has(name)) {
      const chart = this.charts.get(name)
      chart.addDataPoint(value, timestamp)
    }

    // Обновляем значение в UI
    const element = document.getElementById(\`metric-\${name}\`)
    if (element) {
      element.textContent = value

      // Добавляем анимацию при изменении
      element.classList.add('updated')
      setTimeout(() => element.classList.remove('updated'), 300)
    }
  }

  showAlert(alert) {
    const severity = alert.severity // 'info', 'warning', 'error'

    const div = document.createElement('div')
    div.className = \`alert alert-\${severity}\`
    div.innerHTML = \`
      <div class="alert-title">\${alert.title}</div>
      <div class="alert-message">\${alert.message}</div>
      <div class="alert-time">\${new Date(alert.timestamp).toLocaleString()}</div>
    \`

    document.getElementById('alerts').prepend(div)

    // Звук для критических алертов
    if (severity === 'error') {
      this.playAlertSound()
    }
  }

  playAlertSound() {
    const audio = new Audio('/sounds/alert.mp3')
    audio.play()
  }
}

// 4. Collaborative editing (совместное редактирование)
class CollaborativeEditor {
  constructor(documentId, wsUrl) {
    this.documentId = documentId
    this.ws = new WebSocket(wsUrl)
    this.editor = document.getElementById('editor')
    this.isTyping = false
    this.typingTimeout = null

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        type: 'join',
        documentId: this.documentId
      }))
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handleMessage(message)
    }

    // Отслеживаем изменения в редакторе
    this.editor.addEventListener('input', (e) => {
      this.handleInput(e)
    })
  }

  handleInput(e) {
    const change = {
      type: 'edit',
      documentId: this.documentId,
      position: this.getCaretPosition(),
      text: e.target.value,
      timestamp: Date.now()
    }

    this.ws.send(JSON.stringify(change))

    // Индикатор печати
    if (!this.isTyping) {
      this.isTyping = true
      this.ws.send(JSON.stringify({
        type: 'startTyping',
        documentId: this.documentId
      }))
    }

    clearTimeout(this.typingTimeout)
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false
      this.ws.send(JSON.stringify({
        type: 'stopTyping',
        documentId: this.documentId
      }))
    }, 1000)
  }

  handleMessage(message) {
    switch (message.type) {
      case 'edit':
        this.applyEdit(message)
        break
      case 'userJoined':
        this.showUserJoined(message.user)
        break
      case 'userLeft':
        this.showUserLeft(message.user)
        break
      case 'startTyping':
        this.showTyping(message.user)
        break
      case 'stopTyping':
        this.hideTyping(message.user)
        break
    }
  }

  applyEdit(edit) {
    // Применяем изменения от другого пользователя
    // Сохраняем позицию курсора
    const currentPosition = this.getCaretPosition()

    this.editor.value = edit.text

    // Восстанавливаем позицию курсора
    this.setCaretPosition(currentPosition)
  }

  getCaretPosition() {
    return this.editor.selectionStart
  }

  setCaretPosition(position) {
    this.editor.setSelectionRange(position, position)
  }

  showUserJoined(user) {
    console.log(\`\${user.name} присоединился к редактированию\`)
  }

  showUserLeft(user) {
    console.log(\`\${user.name} покинул редактирование\`)
  }

  showTyping(user) {
    const indicator = document.getElementById('typing-indicator')
    indicator.textContent = \`\${user.name} печатает...\`
    indicator.style.display = 'block'
  }

  hideTyping(user) {
    const indicator = document.getElementById('typing-indicator')
    indicator.style.display = 'none'
  }
}

// 5. Прогресс длительной операции (EventSource)
class ProgressTracker {
  constructor(taskId, url) {
    this.taskId = taskId
    this.eventSource = new EventSource(\`\${url}?taskId=\${taskId}\`)

    this.eventSource.addEventListener('progress', (event) => {
      const progress = JSON.parse(event.data)
      this.updateProgress(progress)
    })

    this.eventSource.addEventListener('complete', (event) => {
      const result = JSON.parse(event.data)
      this.handleComplete(result)
    })

    this.eventSource.addEventListener('error', (event) => {
      const error = JSON.parse(event.data)
      this.handleError(error)
    })
  }

  updateProgress(progress) {
    const { percent, status, currentStep, totalSteps } = progress

    // Обновляем progress bar
    const progressBar = document.getElementById('progress-bar')
    progressBar.style.width = \`\${percent}%\`
    progressBar.textContent = \`\${Math.round(percent)}%\`

    // Обновляем статус
    const statusEl = document.getElementById('status')
    statusEl.textContent = status

    // Обновляем шаги
    const stepsEl = document.getElementById('steps')
    stepsEl.textContent = \`Шаг \${currentStep} из \${totalSteps}\`
  }

  handleComplete(result) {
    console.log('Задача завершена:', result)

    // Показываем успех
    const progressBar = document.getElementById('progress-bar')
    progressBar.classList.add('complete')

    const statusEl = document.getElementById('status')
    statusEl.textContent = 'Завершено!'

    // Закрываем соединение
    this.eventSource.close()
  }

  handleError(error) {
    console.error('Ошибка выполнения:', error)

    const progressBar = document.getElementById('progress-bar')
    progressBar.classList.add('error')

    const statusEl = document.getElementById('status')
    statusEl.textContent = \`Ошибка: \${error.message}\`

    this.eventSource.close()
  }
}

// Использование
// Запуск задачи
fetch('/api/tasks', {
  method: 'POST',
  body: JSON.stringify({ type: 'process-video' })
})
  .then(res => res.json())
  .then(data => {
    // Отслеживаем прогресс
    new ProgressTracker(data.taskId, '/api/tasks/progress')
  })
`

const highlightedMethodsOverview = ref('')
const highlightedWebSocketsBasics = ref('')
const highlightedWebSocketsAdvanced = ref('')
const highlightedServerSentEvents = ref('')
const highlightedComparison = ref('')
const highlightedLongPolling = ref('')
const highlightedAlternatives = ref('')
const highlightedPracticalExamples = ref('')

onMounted(() => {
  highlightedMethodsOverview.value = Prism.highlight(methodsOverviewSnippet, Prism.languages.javascript, 'javascript')
  highlightedWebSocketsBasics.value = Prism.highlight(webSocketsBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedWebSocketsAdvanced.value = Prism.highlight(webSocketsAdvancedSnippet, Prism.languages.javascript, 'javascript')
  highlightedServerSentEvents.value = Prism.highlight(serverSentEventsSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedLongPolling.value = Prism.highlight(longPollingSnippet, Prism.languages.javascript, 'javascript')
  highlightedAlternatives.value = Prism.highlight(alternativesSnippet, Prism.languages.javascript, 'javascript')
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
              Поддержание соединения с сервером в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              Существует несколько методов поддержания постоянного соединения с сервером:
              <b>WebSockets</b> для двусторонней связи, <b>Server-Sent Events (EventSource)</b>
              для односторонней передачи от сервера к клиенту, <b>Long Polling</b> и
              классический <b>Polling</b> как fallback решения.
            </p>

            <!-- Обзор методов -->
            <h2 class="text-h5 font-weight-bold mb-3">Обзор методов поддержания соединения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMethodsOverview"></code></pre>

            <!-- Сравнительная таблица -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица методов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">WebSocket</th>
                <th class="text-left font-weight-bold">Server-Sent Events</th>
                <th class="text-left font-weight-bold">Long Polling</th>
                <th class="text-left font-weight-bold">Short Polling</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Направление</strong></td>
                <td>Двустороннее ⇄</td>
                <td>Сервер → Клиент</td>
                <td>Запрос/Ответ</td>
                <td>Запрос/Ответ</td>
              </tr>
              <tr>
                <td><strong>Протокол</strong></td>
                <td>ws:// / wss://</td>
                <td>HTTP/HTTPS</td>
                <td>HTTP/HTTPS</td>
                <td>HTTP/HTTPS</td>
              </tr>
              <tr>
                <td><strong>Overhead</strong></td>
                <td>Минимальный (2-14 байт)</td>
                <td>HTTP заголовки</td>
                <td>HTTP заголовки</td>
                <td>Максимальный</td>
              </tr>
              <tr>
                <td><strong>Latency</strong></td>
                <td>Очень низкая</td>
                <td>Низкая</td>
                <td>Средняя</td>
                <td>Высокая</td>
              </tr>
              <tr>
                <td><strong>Переподключение</strong></td>
                <td>Вручную</td>
                <td>Автоматическое</td>
                <td>Вручную</td>
                <td>Не требуется</td>
              </tr>
              <tr>
                <td><strong>Поддержка браузеров</strong></td>
                <td>Все современные</td>
                <td>Все кроме IE</td>
                <td>Везде</td>
                <td>Везде</td>
              </tr>
              <tr>
                <td><strong>Данные</strong></td>
                <td>Текст + Бинарные</td>
                <td>Только текст</td>
                <td>Любые</td>
                <td>Любые</td>
              </tr>
              </tbody>
            </v-table>

            <!-- WebSockets основы -->
            <h2 class="text-h5 font-weight-bold mb-3">WebSockets - основы</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>WebSocket</strong> — лучший выбор для двусторонней связи в реальном времени
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWebSocketsBasics"></code></pre>

            <!-- WebSockets преимущества -->
            <h2 class="text-h5 font-weight-bold mb-3">Преимущества WebSockets</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Двусторонняя связь</strong> — клиент и сервер могут отправлять данные</li>
                    <li><strong>Низкая latency</strong> — нет overhead HTTP запросов</li>
                    <li><strong>Минимальный трафик</strong> — заголовок 2-14 байт vs сотни в HTTP</li>
                    <li><strong>Высокая частота</strong> — 100+ сообщений в секунду</li>
                    <li><strong>Бинарные данные</strong> — ArrayBuffer, Blob</li>
                    <li><strong>Масштабируемость</strong> — меньше нагрузка на сервер</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold">Недостатки</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Требует специальный сервер</strong> — не работает с обычным HTTP сервером</li>
                    <li><strong>Проблемы с proxy/firewall</strong> — могут блокировать ws://</li>
                    <li><strong>Нет автопереподключения</strong> — нужно реализовывать</li>
                    <li><strong>Сложнее с load balancing</strong> — нужны sticky sessions</li>
                    <li><strong>Нет встроенного fallback</strong> — нужна альтернатива</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- WebSockets продвинутое -->
            <h2 class="text-h5 font-weight-bold mb-3">WebSockets - продвинутое использование</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWebSocketsAdvanced"></code></pre>

            <!-- Server-Sent Events -->
            <h2 class="text-h5 font-weight-bold mb-3">Server-Sent Events (EventSource)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>EventSource</strong> — идеален для односторонней передачи данных от сервера к клиенту
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedServerSentEvents"></code></pre>

            <!-- Отличия SSE от WebSocket -->
            <h2 class="text-h5 font-weight-bold mb-3">Server-Sent Events vs WebSockets</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества SSE</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Простой API</strong> — легче использовать</li>
                    <li><strong>Автопереподключение</strong> — встроено</li>
                    <li><strong>Работает через HTTP</strong> — нет проблем с proxy</li>
                    <li><strong>Поддержка lastEventId</strong> — восстановление после разрыва</li>
                    <li><strong>Именованные события</strong> — удобная обработка</li>
                    <li><strong>Не требует специального сервера</strong> — обычный HTTP</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Ограничения SSE</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Только от сервера</strong> — нельзя отправить с клиента</li>
                    <li><strong>Только текст</strong> — нет бинарных данных</li>
                    <li><strong>Ограничения соединений</strong> — 6 на домен (HTTP/1.1)</li>
                    <li><strong>Нет кастомных заголовков</strong> — только GET запрос</li>
                    <li><strong>Больший overhead</strong> — HTTP заголовки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Детальное сравнение -->
            <h2 class="text-h5 font-weight-bold mb-3">Детальное сравнение WebSockets и EventSource</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <!-- Long Polling -->
            <h2 class="text-h5 font-weight-bold mb-3">Long Polling - альтернативный метод</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Long Polling</strong> — используйте как fallback если WebSocket/EventSource недоступны
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLongPolling"></code></pre>

            <!-- Альтернативы и Fallback -->
            <h2 class="text-h5 font-weight-bold mb-3">Альтернативы и Fallback стратегии</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAlternatives"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Сценарии использования -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый метод</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-web</v-icon>
                    <h3 class="text-h6 font-weight-bold">WebSockets</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Чаты и мессенджеры</li>
                    <li>Многопользовательские игры</li>
                    <li>Совместное редактирование</li>
                    <li>Трейдинг и биржевые котировки</li>
                    <li>IoT и real-time мониторинг</li>
                    <li>Video/Audio streaming</li>
                    <li>Когда нужна двусторонняя связь</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-rss</v-icon>
                    <h3 class="text-h6 font-weight-bold">Server-Sent Events</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Уведомления и алерты</li>
                    <li>Новостные ленты</li>
                    <li>Обновления статуса</li>
                    <li>Прогресс длительных операций</li>
                    <li>Live scores и спортивные результаты</li>
                    <li>Мониторинг метрик</li>
                    <li>Когда связь только от сервера</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-clock</v-icon>
                    <h3 class="text-h6 font-weight-bold">Long Polling</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Fallback для WebSocket</li>
                    <li>Корпоративные сети (firewall)</li>
                    <li>Старые браузеры</li>
                    <li>Простые уведомления</li>
                    <li>Нечастые обновления</li>
                    <li>Когда WebSocket/SSE недоступны</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="grey" class="mr-2">mdi-sync</v-icon>
                    <h3 class="text-h6 font-weight-bold">Simple Polling</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Последний fallback</li>
                    <li>Очень старые браузеры</li>
                    <li>Очень редкие обновления (>1 мин)</li>
                    <li>Простейшая реализация</li>
                    <li>Не критично к latency</li>
                    <li>Минимальная инфраструктура</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое WebSockets и как они работают?</p>
                <p class="font-weight-regular ma-0">
                  WebSocket — это протокол для двусторонней связи между клиентом и сервером через
                  единое TCP соединение. Работает через HTTP Upgrade: клиент отправляет запрос с
                  заголовком Upgrade: websocket, сервер соглашается, и соединение переключается на
                  ws:// протокол. Позволяет клиенту и серверу отправлять данные в любое время без
                  повторного установления соединения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главные преимущества WebSockets?</p>
                <p class="font-weight-regular ma-0">
                  1) Двусторонняя связь (full-duplex), 2) Минимальный overhead (2-14 байт vs сотни
                  в HTTP), 3) Низкая latency, 4) Поддержка бинарных данных, 5) Высокая частота
                  обновлений (100+ сообщений/сек), 6) Эффективное использование ресурсов сервера.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Server-Sent Events (EventSource)?</p>
                <p class="font-weight-regular ma-0">
                  Server-Sent Events — это технология для односторонней передачи данных от сервера
                  к клиенту через HTTP. Работает через стандартный HTTP запрос с Content-Type: text/event-stream.
                  Браузер автоматически переподключается при обрыве связи. Поддерживает именованные
                  события и lastEventId для возобновления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем отличие EventSource от WebSockets?</p>
                <p class="font-weight-regular ma-0">
                  EventSource: только от сервера к клиенту, только текст, работает через HTTP,
                  автоматическое переподключение, проще в использовании. WebSocket: двусторонняя
                  связь, текст + бинарные данные, отдельный протокол (ws://), нужна ручная реализация
                  переподключения, минимальный overhead.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать WebSockets, а когда EventSource?</p>
                <p class="font-weight-regular ma-0">
                  WebSockets: когда нужна двусторонняя связь (чаты, игры, collaborative editing),
                  высокая частота обновлений, бинарные данные. EventSource: когда данные только
                  от сервера (уведомления, новостные ленты, мониторинг), нужно автопереподключение,
                  работа через HTTP важнее производительности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Long Polling и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  Long Polling — техника, где клиент делает HTTP запрос, а сервер держит соединение
                  открытым до появления новых данных. Используется как fallback когда WebSocket/EventSource
                  недоступны (старые браузеры, строгие firewall), для нечастых обновлений, в корпоративных
                  сетях.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие альтернативы есть если WebSocket не поддерживается?</p>
                <p class="font-weight-regular ma-0">
                  1) Server-Sent Events (EventSource) — если только от сервера, 2) Long Polling —
                  универсальный fallback, 3) Simple Polling — последняя опция, 4) Библиотеки с
                  автоматическим fallback (Socket.IO, SignalR), 5) WebRTC DataChannel для P2P.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать автоматическое переподключение для WebSocket?</p>
                <p class="font-weight-regular ma-0">
                  Создать обертку: отслеживать событие onclose, проверять что закрытие не было
                  принудительным (forcedClose флаг), реализовать экспоненциальную задержку
                  (reconnectDelay * Math.pow(decay, attempts)), ограничить количество попыток,
                  сохранять очередь сообщений для отправки после переподключения.
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
                    <li>Реализовывать автопереподключение</li>
                    <li>Использовать heartbeat/ping-pong</li>
                    <li>Валидировать данные на клиенте и сервере</li>
                    <li>Обрабатывать ошибки gracefully</li>
                    <li>Использовать wss:// (безопасное соединение)</li>
                    <li>Реализовывать fallback стратегию</li>
                    <li>Тестировать на плохом соединении</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Отправки чувствительных данных без шифрования</li>
                    <li>Отсутствия обработки разрыва соединения</li>
                    <li>Игнорирования ошибок подключения</li>
                    <li>Бесконечных попыток переподключения</li>
                    <li>Отправки больших данных без chunking</li>
                    <li>Забывания про mobile (батарея, сеть)</li>
                    <li>Игнорирования CORS политик</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">
