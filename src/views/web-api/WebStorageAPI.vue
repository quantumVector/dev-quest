<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicsSnippet = `
// =====================================
// WEB STORAGE API - ОСНОВЫ
// =====================================

// localStorage - данные сохраняются навсегда (пока не удалены)
localStorage.setItem('username', 'John')
const username = localStorage.getItem('username')
console.log(username) // "John"

// sessionStorage - данные живут до закрытия вкладки
sessionStorage.setItem('tempToken', 'abc123')
const token = sessionStorage.getItem('tempToken')
console.log(token) // "abc123"

// Удаление конкретного ключа
localStorage.removeItem('username')
sessionStorage.removeItem('tempToken')

// Очистка всего хранилища
localStorage.clear()
sessionStorage.clear()

// Получение количества ключей
console.log(localStorage.length) // 0
console.log(sessionStorage.length) // 0

// Получение ключа по индексу
localStorage.setItem('key1', 'value1')
localStorage.setItem('key2', 'value2')
console.log(localStorage.key(0)) // "key1" или "key2" (порядок не гарантирован)
`

const differencesSnippet = `
// =====================================
// РАЗНИЦА МЕЖДУ localStorage И sessionStorage
// =====================================

// 1. ВРЕМЯ ЖИЗНИ ДАННЫХ

// localStorage - данные сохраняются навсегда
localStorage.setItem('permanent', 'Я останусь даже после перезагрузки браузера')

// Закрываем браузер → открываем снова
console.log(localStorage.getItem('permanent')) // Всё ещё "Я останусь..."

// sessionStorage - данные живут только в рамках сессии вкладки
sessionStorage.setItem('temporary', 'Я исчезну при закрытии вкладки')

// Закрываем вкладку → открываем новую
console.log(sessionStorage.getItem('temporary')) // null

// 2. ОБЛАСТЬ ВИДИМОСТИ

// localStorage - общий для всех вкладок одного origin
// Вкладка 1:
localStorage.setItem('shared', 'Доступен во всех вкладках')

// Вкладка 2 (тот же домен):
console.log(localStorage.getItem('shared')) // "Доступен во всех вкладках"

// sessionStorage - изолирован в рамках одной вкладки
// Вкладка 1:
sessionStorage.setItem('isolated', 'Только для этой вкладки')

// Вкладка 2 (тот же домен):
console.log(sessionStorage.getItem('isolated')) // null

// 3. СОБЫТИЯ storage

// localStorage - триггерит события в ДРУГИХ вкладках
// Вкладка 1:
window.addEventListener('storage', (e) => {
  console.log('Изменение в другой вкладке:', e.key, e.newValue)
})

// Вкладка 2:
localStorage.setItem('test', 'hello') // Вкладка 1 получит событие!

// sessionStorage - НЕ триггерит события (изолирован)

// 4. ДУБЛИРОВАНИЕ ВКЛАДОК

// При открытии новой вкладки через Ctrl+Click или window.open():
// localStorage - данные доступны сразу (общие)
// sessionStorage - данные КОПИРУЮТСЯ в новую вкладку

// Вкладка 1:
sessionStorage.setItem('original', 'Исходные данные')

// Открываем вкладку 2 через ссылку с этой же страницы:
console.log(sessionStorage.getItem('original')) // "Исходные данные"

// Изменяем в вкладке 2:
sessionStorage.setItem('original', 'Изменено во вкладке 2')

// Проверяем в вкладке 1:
console.log(sessionStorage.getItem('original')) // "Исходные данные" (не изменилось!)

// 5. ИСПОЛЬЗОВАНИЕ В iframe

// localStorage - общий для parent и iframe (если same-origin)
// Parent:
localStorage.setItem('parentData', 'Доступно в iframe')

// iframe (same origin):
console.log(localStorage.getItem('parentData')) // "Доступно в iframe"

// sessionStorage - разделен между parent и iframe
// Каждый iframe имеет свой sessionStorage!
`

const dataTypesSnippet = `
// =====================================
// ТИПЫ ДАННЫХ В WEB STORAGE
// =====================================

// ⚠️ ВАЖНО: Web Storage хранит ТОЛЬКО СТРОКИ!
// Все значения автоматически конвертируются в string

// 1. СТРОКИ - работают нативно
localStorage.setItem('string', 'Hello World')
console.log(localStorage.getItem('string')) // "Hello World"
console.log(typeof localStorage.getItem('string')) // "string"

// 2. ЧИСЛА - автоматически конвертируются в строки
localStorage.setItem('number', 42)
console.log(localStorage.getItem('number')) // "42" (строка!)
console.log(typeof localStorage.getItem('number')) // "string"

// Для использования нужно парсить обратно
const num = Number(localStorage.getItem('number'))
console.log(num) // 42 (число)
console.log(typeof num) // "number"

// 3. BOOLEAN - конвертируются в строки "true" / "false"
localStorage.setItem('bool', true)
console.log(localStorage.getItem('bool')) // "true" (строка!)

// ❌ ОШИБКА - прямая проверка всегда true!
if (localStorage.getItem('bool')) {
  console.log('Выполнится даже для false!') // Строка "false" === truthy
}

// ✅ ПРАВИЛЬНО - парсинг boolean
const isEnabled = localStorage.getItem('bool') === 'true'
console.log(isEnabled) // true (boolean)

// 4. ОБЪЕКТЫ - нужна сериализация через JSON
const user = {
  name: 'John',
  age: 30,
  roles: ['admin', 'user']
}

// ❌ ОШИБКА - прямое сохранение объекта
localStorage.setItem('user', user)
console.log(localStorage.getItem('user')) // "[object Object]" - бесполезно!

// ✅ ПРАВИЛЬНО - JSON.stringify / JSON.parse
localStorage.setItem('user', JSON.stringify(user))
const savedUser = JSON.parse(localStorage.getItem('user'))
console.log(savedUser) // { name: 'John', age: 30, roles: [...] }

// 5. МАССИВЫ - тоже через JSON
const colors = ['red', 'green', 'blue']

localStorage.setItem('colors', JSON.stringify(colors))
const savedColors = JSON.parse(localStorage.getItem('colors'))
console.log(savedColors) // ['red', 'green', 'blue']

// 6. DATE - особый случай
const now = new Date()

// ❌ ОШИБКА - прямое сохранение
localStorage.setItem('date', now)
console.log(localStorage.getItem('date')) // "Wed Nov 03 2025..." (строка)

// ✅ ПРАВИЛЬНО - через ISO строку или timestamp
localStorage.setItem('date', now.toISOString())
const savedDate = new Date(localStorage.getItem('date'))
console.log(savedDate) // Date object

// Или через timestamp
localStorage.setItem('timestamp', now.getTime().toString())
const restoredDate = new Date(Number(localStorage.getItem('timestamp')))

// 7. NULL и UNDEFINED
localStorage.setItem('nullValue', null)
console.log(localStorage.getItem('nullValue')) // "null" (строка!)

localStorage.setItem('undefinedValue', undefined)
console.log(localStorage.getItem('undefinedValue')) // "undefined" (строка!)

// Проверка на null
const value = localStorage.getItem('nonexistent')
console.log(value === null) // true - ключ не существует

// 8. MAP и SET - через Array.from()
const myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
])

// Сохранение Map
localStorage.setItem('map', JSON.stringify(Array.from(myMap.entries())))

// Восстановление Map
const savedMap = new Map(JSON.parse(localStorage.getItem('map')))
console.log(savedMap.get('key1')) // "value1"

// Set аналогично
const mySet = new Set([1, 2, 3])
localStorage.setItem('set', JSON.stringify(Array.from(mySet)))
const savedSet = new Set(JSON.parse(localStorage.getItem('set')))

// 9. ФУНКЦИИ - нельзя сохранить напрямую!
const myFunc = () => console.log('Hello')

// ❌ НЕ РАБОТАЕТ
localStorage.setItem('func', myFunc.toString())
const savedFunc = localStorage.getItem('func')
// savedFunc - это просто строка, не функция!

// Решение - использовать eval() (небезопасно!) или передавать данные

// 10. СИМВОЛЫ - конвертируются в пустую строку
const sym = Symbol('test')
localStorage.setItem('symbol', sym)
console.log(localStorage.getItem('symbol')) // "" (пустая строка)

// 11. BIGINT - нужна специальная обработка
const bigNum = 9007199254740991n

// ❌ JSON.stringify не работает с BigInt
// localStorage.setItem('big', JSON.stringify(bigNum)) // Ошибка!

// ✅ Конвертация в строку
localStorage.setItem('big', bigNum.toString())
const savedBig = BigInt(localStorage.getItem('big'))
console.log(savedBig) // 9007199254740991n
`

const helperFunctionsSnippet = `
// =====================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =====================================

// Универсальная обёртка для работы с типами
class StorageHelper {
  constructor(storage = localStorage) {
    this.storage = storage
  }

  // Универсальное сохранение с автоматической сериализацией
  set(key, value) {
    try {
      // Определяем тип и сохраняем с метаданными
      const data = {
        value: value,
        type: typeof value,
        timestamp: Date.now()
      }

      // Обработка специальных типов
      if (value instanceof Date) {
        data.type = 'date'
        data.value = value.toISOString()
      } else if (value instanceof Map) {
        data.type = 'map'
        data.value = Array.from(value.entries())
      } else if (value instanceof Set) {
        data.type = 'set'
        data.value = Array.from(value)
      } else if (typeof value === 'object' && value !== null) {
        data.type = 'object'
        data.value = value
      }

      this.storage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  // Универсальное получение с автоматической десериализацией
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key)
      if (item === null) return defaultValue

      const data = JSON.parse(item)

      // Восстановление по типу
      switch (data.type) {
        case 'date':
          return new Date(data.value)
        case 'map':
          return new Map(data.value)
        case 'set':
          return new Set(data.value)
        case 'number':
          return Number(data.value)
        case 'boolean':
          return data.value === true || data.value === 'true'
        case 'object':
          return data.value
        case 'string':
          return String(data.value)
        default:
          return data.value
      }
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  // Удаление
  remove(key) {
    this.storage.removeItem(key)
  }

  // Очистка
  clear() {
    this.storage.clear()
  }

  // Проверка существования
  has(key) {
    return this.storage.getItem(key) !== null
  }

  // Получение всех ключей
  keys() {
    return Object.keys(this.storage)
  }

  // Получение всех значений
  values() {
    return this.keys().map(key => this.get(key))
  }

  // Получение всех пар ключ-значение
  entries() {
    return this.keys().map(key => [key, this.get(key)])
  }

  // Итератор для for...of
  *[Symbol.iterator]() {
    for (const key of this.keys()) {
      yield [key, this.get(key)]
    }
  }

  // Размер в байтах (приблизительно)
  size() {
    let total = 0
    for (const key of this.keys()) {
      const value = this.storage.getItem(key)
      total += key.length + (value?.length || 0)
    }
    return total
  }

  // Проверка на переполнение
  canStore(key, value) {
    const testData = JSON.stringify({ value, type: typeof value })
    const size = key.length + testData.length

    // Проверяем текущий размер + новые данные
    const currentSize = this.size()
    const limit = 5 * 1024 * 1024 // 5MB примерно

    return (currentSize + size) < limit
  }
}

// Использование
const storage = new StorageHelper(localStorage)

// Автоматическая работа с разными типами
storage.set('user', { name: 'John', age: 30 })
storage.set('count', 42)
storage.set('active', true)
storage.set('created', new Date())
storage.set('tags', new Set(['js', 'vue', 'react']))

// Получение с правильными типами
const user = storage.get('user')           // Object
const count = storage.get('count')         // Number
const active = storage.get('active')       // Boolean
const created = storage.get('created')     // Date
const tags = storage.get('tags')           // Set

console.log(typeof count)     // "number"
console.log(typeof active)    // "boolean"
console.log(created instanceof Date)  // true
console.log(tags instanceof Set)      // true

// Работа с коллекцией
for (const [key, value] of storage) {
  console.log(key, value)
}

// Проверка размера
console.log(\`Storage size: \${storage.size()} bytes\`)

// Проверка возможности сохранения
const bigData = new Array(10000).fill('data')
if (storage.canStore('bigData', bigData)) {
  storage.set('bigData', bigData)
} else {
  console.warn('Not enough space!')
}
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. СОХРАНЕНИЕ НАСТРОЕК ПОЛЬЗОВАТЕЛЯ
class UserSettings {
  constructor() {
    this.storage = new StorageHelper(localStorage)
    this.defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    }
  }

  get(key) {
    return this.storage.get(\`settings.\${key}\`, this.defaults[key])
  }

  set(key, value) {
    return this.storage.set(\`settings.\${key}\`, value)
  }

  getAll() {
    const settings = {}
    for (const key in this.defaults) {
      settings[key] = this.get(key)
    }
    return settings
  }

  setAll(settings) {
    for (const [key, value] of Object.entries(settings)) {
      this.set(key, value)
    }
  }

  reset() {
    for (const key in this.defaults) {
      this.storage.remove(\`settings.\${key}\`)
    }
  }
}

// Использование
const settings = new UserSettings()
settings.set('theme', 'dark')
settings.set('fontSize', 18)
console.log(settings.getAll()) // { theme: 'dark', language: 'en', ... }

// 2. КОРЗИНА ПОКУПОК
class ShoppingCart {
  constructor() {
    this.storage = new StorageHelper(localStorage)
    this.key = 'shopping-cart'
  }

  getItems() {
    return this.storage.get(this.key, [])
  }

  addItem(product) {
    const items = this.getItems()
    const existing = items.find(item => item.id === product.id)

    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      items.push({ ...product, quantity: product.quantity || 1 })
    }

    this.storage.set(this.key, items)
    return items
  }

  removeItem(productId) {
    const items = this.getItems().filter(item => item.id !== productId)
    this.storage.set(this.key, items)
    return items
  }

  updateQuantity(productId, quantity) {
    const items = this.getItems()
    const item = items.find(item => item.id === productId)

    if (item) {
      item.quantity = quantity
      if (quantity <= 0) {
        return this.removeItem(productId)
      }
    }

    this.storage.set(this.key, items)
    return items
  }

  getTotal() {
    return this.getItems().reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  }

  clear() {
    this.storage.remove(this.key)
  }

  getItemsCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0)
  }
}

// Использование
const cart = new ShoppingCart()
cart.addItem({ id: 1, name: 'Product A', price: 10 })
cart.addItem({ id: 2, name: 'Product B', price: 20, quantity: 2 })
console.log(\`Total: $\${cart.getTotal()}\`) // Total: $50
console.log(\`Items: \${cart.getItemsCount()}\`) // Items: 3

// 3. КЭШИРОВАНИЕ API ОТВЕТОВ С TTL
class CacheStorage {
  constructor(ttl = 3600000) { // 1 час по умолчанию
    this.storage = new StorageHelper(localStorage)
    this.ttl = ttl
  }

  set(key, value, customTTL) {
    const ttl = customTTL || this.ttl
    const expiry = Date.now() + ttl

    this.storage.set(\`cache.\${key}\`, {
      value: value,
      expiry: expiry
    })
  }

  get(key) {
    const cached = this.storage.get(\`cache.\${key}\`)

    if (!cached) return null

    // Проверяем срок действия
    if (Date.now() > cached.expiry) {
      this.remove(key)
      return null
    }

    return cached.value
  }

  remove(key) {
    this.storage.remove(\`cache.\${key}\`)
  }

  // Очистка просроченных записей
  cleanup() {
    const keys = this.storage.keys()
      .filter(key => key.startsWith('cache.'))

    for (const key of keys) {
      const value = this.storage.get(key)
      if (value && Date.now() > value.expiry) {
        this.storage.remove(key)
      }
    }
  }

  // Обёртка для fetch с кэшированием
  async fetchWithCache(url, options = {}, ttl) {
    const cacheKey = \`fetch:\${url}\`
    const cached = this.get(cacheKey)

    if (cached) {
      console.log('Returning cached data for:', url)
      return cached
    }

    console.log('Fetching fresh data for:', url)
    const response = await fetch(url, options)
    const data = await response.json()

    this.set(cacheKey, data, ttl)
    return data
  }
}

// Использование
const cache = new CacheStorage(60000) // 1 минута

// Кэширование на 5 минут
cache.set('user:123', { name: 'John' }, 300000)

// Получение с проверкой TTL
const user = cache.get('user:123')
console.log(user) // { name: 'John' } или null если истёк

// Fetch с кэшированием
const data = await cache.fetchWithCache(
  'https://api.example.com/data',
  {},
  300000 // 5 минут
)

// Периодическая очистка
setInterval(() => cache.cleanup(), 60000)

// 4. ИСТОРИЯ ДЕЙСТВИЙ (UNDO/REDO)
class HistoryManager {
  constructor(maxSize = 50) {
    this.storage = new StorageHelper(sessionStorage)
    this.maxSize = maxSize
    this.key = 'history'
  }

  getHistory() {
    return this.storage.get(this.key, {
      past: [],
      present: null,
      future: []
    })
  }

  saveState(state) {
    const history = this.getHistory()

    // Добавляем текущее состояние в прошлое
    if (history.present !== null) {
      history.past.push(history.present)

      // Ограничиваем размер истории
      if (history.past.length > this.maxSize) {
        history.past.shift()
      }
    }

    history.present = state
    history.future = [] // Очищаем будущее

    this.storage.set(this.key, history)
  }

  undo() {
    const history = this.getHistory()

    if (history.past.length === 0) {
      return null
    }

    const previous = history.past.pop()
    history.future.unshift(history.present)
    history.present = previous

    this.storage.set(this.key, history)
    return previous
  }

  redo() {
    const history = this.getHistory()

    if (history.future.length === 0) {
      return null
    }

    const next = history.future.shift()
    history.past.push(history.present)
    history.present = next

    this.storage.set(this.key, history)
    return next
  }

  canUndo() {
    return this.getHistory().past.length > 0
  }

  canRedo() {
    return this.getHistory().future.length > 0
  }

  clear() {
    this.storage.remove(this.key)
  }
}

// Использование в текстовом редакторе
const history = new HistoryManager()

let content = ''

function updateContent(newContent) {
  history.saveState(content)
  content = newContent
}

function undo() {
  const previous = history.undo()
  if (previous !== null) {
    content = previous
  }
}

function redo() {
  const next = history.redo()
  if (next !== null) {
    content = next
  }
}

// 5. СИНХРОНИЗАЦИЯ МЕЖДУ ВКЛАДКАМИ (localStorage)
class TabSync {
  constructor(channel) {
    this.channel = channel
    this.listeners = new Map()

    // Слушаем события storage
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith(\`sync:\${this.channel}:\`)) {
        const eventName = e.key.replace(\`sync:\${this.channel}:\`, '')
        const data = JSON.parse(e.newValue)

        const handlers = this.listeners.get(eventName) || []
        handlers.forEach(handler => handler(data))
      }
    })
  }

  // Отправить событие в другие вкладки
  emit(eventName, data) {
    const key = \`sync:\${this.channel}:\${eventName}\`
    localStorage.setItem(key, JSON.stringify(data))

    // Удаляем сразу, чтобы можно было отправить снова
    setTimeout(() => localStorage.removeItem(key), 100)
  }

  // Подписаться на событие
  on(eventName, handler) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, [])
    }
    this.listeners.get(eventName).push(handler)
  }

  // Отписаться
  off(eventName, handler) {
    const handlers = this.listeners.get(eventName)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }
}

// Использование
const sync = new TabSync('app')

// Вкладка 1
sync.on('user-logged-in', (user) => {
  console.log('User logged in another tab:', user)
  // Обновляем UI
})

// Вкладка 2
sync.emit('user-logged-in', { id: 1, name: 'John' })
// Вкладка 1 получит событие!
`

const securitySnippet = `
// =====================================
// БЕЗОПАСНОСТЬ И ОГРАНИЧЕНИЯ
// =====================================

// 1. ОГРАНИЧЕНИЕ РАЗМЕРА ХРАНИЛИЩА
// localStorage и sessionStorage обычно имеют лимит 5-10MB

function checkStorageQuota() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length
    }
  }

  const mb = (total / 1024 / 1024).toFixed(2)
  console.log(\`Used: \${mb} MB\`)

  return total
}

// Обработка ошибки переполнения
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded!')

      // Стратегии решения:
      // 1. Очистка старых данных
      // 2. Сжатие данных
      // 3. Использование IndexedDB для больших объёмов

      return false
    }
    throw e
  }
}

// 2. XSS АТАКИ - не храните чувствительные данные!

// ❌ ОПАСНО - токены и пароли в localStorage
localStorage.setItem('authToken', 'secret-token-123')
localStorage.setItem('password', 'user-password') // Никогда!

// JavaScript на странице может прочитать:
const stolenToken = localStorage.getItem('authToken')
// Отправить злоумышленнику...

// ✅ БЕЗОПАСНЕЕ - использовать httpOnly cookies для токенов
// Cookie с флагом httpOnly недоступен из JavaScript

// Если всё-таки нужно в localStorage:
// - Шифруйте чувствительные данные
// - Используйте короткий TTL
// - Регулярно ротируйте токены

// 3. ШИФРОВАНИЕ ДАННЫХ
class EncryptedStorage {
  constructor(storage, secretKey) {
    this.storage = storage
    this.key = secretKey
  }

  // Простое XOR шифрование (для демонстрации, используйте crypto в продакшене!)
  encrypt(text) {
    return Array.from(text)
      .map((char, i) =>
        String.fromCharCode(
          char.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length)
        )
      )
      .join('')
  }

  decrypt(encrypted) {
    return this.encrypt(encrypted) // XOR обратим
  }

  setItem(key, value) {
    const encrypted = this.encrypt(JSON.stringify(value))
    this.storage.setItem(key, encrypted)
  }

  getItem(key) {
    const encrypted = this.storage.getItem(key)
    if (!encrypted) return null

    try {
      const decrypted = this.decrypt(encrypted)
      return JSON.parse(decrypted)
    } catch (e) {
      console.error('Decryption failed:', e)
      return null
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }
}

// Использование с шифрованием
const secureStorage = new EncryptedStorage(localStorage, 'my-secret-key')
secureStorage.setItem('sensitiveData', { token: 'abc123' })

// В localStorage будет храниться зашифрованная строка
console.log(localStorage.getItem('sensitiveData')) // Нечитаемая строка

// Расшифровка при получении
const data = secureStorage.getItem('sensitiveData')
console.log(data) // { token: 'abc123' }

// 4. ЗАЩИТА ОТ PROTOTYPE POLLUTION

// ❌ ОПАСНО - использование ключей из пользовательского ввода
const userKey = '__proto__' // Вредоносный ввод
localStorage.setItem(userKey, 'hacked')

// ✅ БЕЗОПАСНО - валидация ключей
function safeStorageKey(key) {
  const forbidden = ['__proto__', 'constructor', 'prototype']
  if (forbidden.includes(key)) {
    throw new Error(\`Forbidden key: \${key}\`)
  }
  return key
}

function safeSetItemWithValidation(key, value) {
  const validKey = safeStorageKey(key)
  localStorage.setItem(validKey, value)
}

// 5. CSP (Content Security Policy) И STORAGE

// CSP не блокирует доступ к Storage напрямую,
// но может ограничить выполнение inline scripts

// Meta tag:
// <meta http-equiv="Content-Security-Policy"
//       content="default-src 'self'; script-src 'self'">

// Это предотвратит выполнение вредоносных inline скриптов,
// которые могли бы читать localStorage

// 6. ПРИВАТНЫЙ РЕЖИМ БРАУЗЕРА

// В приватном режиме localStorage работает, но:
// - Данные удаляются после закрытия окна
// - Квота может быть меньше

function isPrivateMode() {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    return false
  } catch (e) {
    return true
  }
}

if (isPrivateMode()) {
  console.warn('Private mode detected, storage may be limited')
}

// 7. SAME-ORIGIN POLICY

// Storage доступен только для того же origin (protocol + domain + port)

// https://example.com:443 ✅ может читать
// https://example.com:443 ✅

// http://example.com ❌ не может читать https://example.com
// https://subdomain.example.com ❌ не может читать https://example.com
// https://example.com:8080 ❌ не может читать https://example.com:443

// 8. ОЧИСТКА ПРИ LOGOUT

class AuthManager {
  login(user, token) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('loginTime', Date.now().toString())
  }

  logout() {
    // Удаляем все auth-related данные
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('loginTime')

    // Или можно очистить всё (осторожно!)
    // localStorage.clear()

    // Опционально - отправить событие в другие вкладки
    window.dispatchEvent(new Event('user-logged-out'))
  }

  isAuthenticated() {
    const token = localStorage.getItem('token')
    if (!token) return false

    // Проверяем срок действия
    const loginTime = parseInt(localStorage.getItem('loginTime'))
    const maxAge = 24 * 60 * 60 * 1000 // 24 часа

    if (Date.now() - loginTime > maxAge) {
      this.logout()
      return false
    }

    return true
  }
}
`

const comparisonSnippet = `
// =====================================
// СРАВНЕНИЕ STORAGE РЕШЕНИЙ
// =====================================

// localStorage vs sessionStorage vs Cookies vs IndexedDB

/*
┌─────────────────┬──────────────┬────────────────┬──────────────┬──────────────┐
│   Характеристика │ localStorage │ sessionStorage │   Cookies    │  IndexedDB   │
├─────────────────┼──────────────┼────────────────┼──────────────┼──────────────┤
│ Размер          │ ~5-10MB      │ ~5-10MB        │ ~4KB         │ Сотни MB     │
│ Время жизни     │ Навсегда     │ До закрытия    │ Настраивается│ Навсегда     │
│ Отправка на     │ Нет          │ Нет            │ Да           │ Нет          │
│   сервер        │              │                │              │              │
│ Синхронный API  │ Да           │ Да             │ Да           │ Нет          │
│ Доступность     │ Все вкладки  │ Одна вкладка   │ Все вкладки  │ Все вкладки  │
│ События         │ storage      │ Нет            │ Нет          │ Да           │
│ Типы данных     │ Строки       │ Строки         │ Строки       │ Любые        │
│ Индексация      │ Нет          │ Нет            │ Нет          │ Да           │
│ Транзакции      │ Нет          │ Нет            │ Нет          │ Да           │
│ Поддержка       │ IE8+         │ IE8+           │ Все          │ IE10+        │
└─────────────────┴──────────────┴────────────────┴──────────────┴──────────────┘
*/

// КОГДА ИСПОЛЬЗОВАТЬ ЧТО:

// 1. localStorage - долгосрочное хранение на клиенте
// ✅ Настройки пользователя
// ✅ Кэш данных
// ✅ Черновики
// ✅ История действий
// ❌ Чувствительные данные (токены, пароли)
// ❌ Большие объёмы данных (>5MB)

// 2. sessionStorage - временное хранение в рамках сессии
// ✅ Данные формы (многошаговые формы)
// ✅ Временные фильтры/сортировки
// ✅ Состояние UI в рамках одной вкладки
// ✅ Wizard/step navigation
// ❌ Данные, которые нужны между вкладками
// ❌ Долгосрочное хранение

// 3. Cookies - небольшие данные, отправляемые на сервер
// ✅ Токены аутентификации (httpOnly, secure)
// ✅ Session ID
// ✅ Tracking
// ✅ A/B тесты
// ❌ Большие данные (лимит 4KB)
// ❌ Данные, не нужные на сервере

// 4. IndexedDB - большие объёмы структурированных данных
// ✅ Офлайн-приложения
// ✅ Большие коллекции данных
// ✅ Сложные запросы с индексами
// ✅ Файлы и Blob
// ❌ Простые key-value данные (localStorage проще)
// ❌ Синхронная работа (API асинхронный)

// ПРОИЗВОДИТЕЛЬНОСТЬ

// localStorage/sessionStorage - синхронные, блокируют главный поток
console.time('localStorage write')
for (let i = 0; i < 1000; i++) {
  localStorage.setItem(\`key\${i}\`, 'value')
}
console.timeEnd('localStorage write') // ~10-50ms

// IndexedDB - асинхронный, не блокирует
async function indexedDBWrite() {
  console.time('IndexedDB write')
  const db = await openDatabase()
  const tx = db.transaction('store', 'readwrite')
  const store = tx.objectStore('store')

  for (let i = 0; i < 1000; i++) {
    store.put({ key: \`key\${i}\`, value: 'value' })
  }

  await tx.complete
  console.timeEnd('IndexedDB write') // ~5-20ms (не блокирует UI)
}

// РЕКОМЕНДАЦИИ

class StorageManager {
  // Выбор хранилища в зависимости от размера данных
  static selectStorage(dataSize, persistent = true) {
    if (dataSize < 4096) {
      // До 4KB - можно использовать cookies (если нужна отправка на сервер)
      return 'cookies'
    } else if (dataSize < 5 * 1024 * 1024) {
      // До 5MB - localStorage или sessionStorage
      return persistent ? 'localStorage' : 'sessionStorage'
    } else {
      // Больше 5MB - только IndexedDB
      return 'indexedDB'
    }
  }

  // Универсальная установка значения
  static async set(key, value, options = {}) {
    const { persistent = true, ttl = null } = options
    const dataSize = JSON.stringify(value).length
    const storage = this.selectStorage(dataSize, persistent)

    switch (storage) {
      case 'localStorage':
        localStorage.setItem(key, JSON.stringify({
          value,
          expiry: ttl ? Date.now() + ttl : null
        }))
        break

      case 'sessionStorage':
        sessionStorage.setItem(key, JSON.stringify(value))
        break

      case 'indexedDB':
        await this.setIndexedDB(key, value, ttl)
        break
    }
  }

  // Универсальное получение значения
  static async get(key) {
    // Пробуем localStorage
    let item = localStorage.getItem(key)
    if (item) {
      const data = JSON.parse(item)
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return data.value
    }

    // Пробуем sessionStorage
    item = sessionStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }

    // Пробуем IndexedDB
    return await this.getIndexedDB(key)
  }

  static async setIndexedDB(key, value, ttl) {
    // Упрощенная реализация
    // В реальности нужна полноценная работа с IndexedDB
  }

  static async getIndexedDB(key) {
    // Упрощенная реализация
  }
}

// Использование
await StorageManager.set('smallData', { x: 1 }, { persistent: true })
await StorageManager.set('bigData', largeArray, { persistent: true })
await StorageManager.set('tempData', { x: 2 }, { persistent: false })

const data = await StorageManager.get('smallData')
`

const highlightedBasics = ref('')
const highlightedDifferences = ref('')
const highlightedDataTypes = ref('')
const highlightedHelperFunctions = ref('')
const highlightedPracticalExamples = ref('')
const highlightedSecurity = ref('')
const highlightedComparison = ref('')

onMounted(() => {
  highlightedBasics.value = Prism.highlight(basicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedDifferences.value = Prism.highlight(differencesSnippet, Prism.languages.javascript, 'javascript')
  highlightedDataTypes.value = Prism.highlight(dataTypesSnippet, Prism.languages.javascript, 'javascript')
  highlightedHelperFunctions.value = Prism.highlight(helperFunctionsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurity.value = Prism.highlight(securitySnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Storage API: localStorage и sessionStorage
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Storage API</b> предоставляет механизмы для хранения пар ключ-значение в браузере.
              Состоит из двух объектов: <b>localStorage</b> (постоянное хранилище) и <b>sessionStorage</b>
              (хранилище сессии). Оба хранят данные только в виде строк.
            </p>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с Web Storage</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Оба API идентичны по методам, различаются только временем жизни и областью видимости данных
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasics"></code></pre>

            <!-- Ключевые различия -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия localStorage и sessionStorage</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-harddisk</v-icon>
                    <h3 class="text-h6 font-weight-bold">localStorage</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время жизни:</strong> Навсегда (пока не удалено)</li>
                    <li><strong>Область:</strong> Все вкладки одного origin</li>
                    <li><strong>События:</strong> Триггерит <code>storage</code> в других вкладках</li>
                    <li><strong>Размер:</strong> ~5-10MB</li>
                    <li><strong>Использование:</strong> Настройки, кэш, черновики</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-clock-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">sessionStorage</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время жизни:</strong> До закрытия вкладки</li>
                    <li><strong>Область:</strong> Только текущая вкладка</li>
                    <li><strong>События:</strong> Не триггерит события</li>
                    <li><strong>Размер:</strong> ~5-10MB</li>
                    <li><strong>Использование:</strong> Формы, временные фильтры</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDifferences"></code></pre>

            <!-- Типы данных -->
            <h2 class="text-h5 font-weight-bold mb-3">Типы данных в Web Storage</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Критично:</strong> Web Storage хранит ТОЛЬКО строки! Все остальные типы автоматически конвертируются в string
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип данных</th>
                <th class="text-left font-weight-bold">Прямое хранение</th>
                <th class="text-left font-weight-bold">Способ хранения</th>
                <th class="text-left font-weight-bold">Восстановление</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>String</code></td>
                <td class="text-success">✅ Да</td>
                <td>Нативно</td>
                <td>Без преобразования</td>
              </tr>
              <tr>
                <td><code>Number</code></td>
                <td class="text-warning">⚠️ Конвертируется</td>
                <td>toString()</td>
                <td>Number() или parseInt()</td>
              </tr>
              <tr>
                <td><code>Boolean</code></td>
                <td class="text-warning">⚠️ Конвертируется</td>
                <td>"true" / "false"</td>
                <td>=== 'true'</td>
              </tr>
              <tr>
                <td><code>Object</code></td>
                <td class="text-error">❌ Нет</td>
                <td>JSON.stringify()</td>
                <td>JSON.parse()</td>
              </tr>
              <tr>
                <td><code>Array</code></td>
                <td class="text-error">❌ Нет</td>
                <td>JSON.stringify()</td>
                <td>JSON.parse()</td>
              </tr>
              <tr>
                <td><code>Date</code></td>
                <td class="text-error">❌ Нет</td>
                <td>toISOString()</td>
                <td>new Date()</td>
              </tr>
              <tr>
                <td><code>Map / Set</code></td>
                <td class="text-error">❌ Нет</td>
                <td>Array.from() + JSON</td>
                <td>new Map() / new Set()</td>
              </tr>
              <tr>
                <td><code>Function</code></td>
                <td class="text-error">❌ Невозможно</td>
                <td>-</td>
                <td>-</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDataTypes"></code></pre>

            <!-- Вспомогательные функции -->
            <h2 class="text-h5 font-weight-bold mb-3">Универсальная обёртка для работы с типами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHelperFunctions"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Безопасность -->
            <h2 class="text-h5 font-weight-bold mb-3">Безопасность и ограничения</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-shield-alert</v-icon>
              <strong>Безопасность:</strong> НЕ храните пароли, токены и другие чувствительные данные в Web Storage! Они доступны из JavaScript и уязвимы к XSS атакам
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Уязвимости</h3>
                  <ul class="pl-4">
                    <li><strong>XSS атаки:</strong> JavaScript может читать Storage</li>
                    <li><strong>Переполнение:</strong> QuotaExceededError при >5MB</li>
                    <li><strong>Same-origin only:</strong> Но подвержено XSS</li>
                    <li><strong>Нет шифрования:</strong> Данные в открытом виде</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Защита</h3>
                  <ul class="pl-4">
                    <li><strong>httpOnly cookies</strong> для токенов</li>
                    <li><strong>CSP</strong> против inline скриптов</li>
                    <li><strong>Шифрование</strong> чувствительных данных</li>
                    <li><strong>Валидация ключей</strong> (prototype pollution)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <!-- Сравнение -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение Storage решений</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <!-- События storage -->
            <h2 class="text-h5 font-weight-bold mb-3">События storage</h2>
            <v-row class="mb-8">
              <v-col cols="12">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-3">Событие storage триггерится только для localStorage</h3>
                  <ul class="pl-4 mb-3">
                    <li>Событие срабатывает в <strong>других</strong> вкладках того же origin</li>
                    <li>НЕ срабатывает в вкладке, где произошло изменение</li>
                    <li>Содержит информацию: <code>key</code>, <code>oldValue</code>, <code>newValue</code>, <code>url</code>, <code>storageArea</code></li>
                    <li>sessionStorage НЕ триггерит события (изолирован)</li>
                  </ul>
                  <v-alert color="info" variant="tonal" class="ma-0">
                    <strong>Использование:</strong> Синхронизация состояния между вкладками, уведомления о logout/login, обновление UI
                  </v-alert>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между localStorage и sessionStorage?</p>
                <p class="font-weight-regular ma-0">
                  <b>Время жизни:</b> localStorage хранит данные навсегда (пока не удалены), sessionStorage —
                  до закрытия вкладки. <b>Область видимости:</b> localStorage доступен во всех вкладках одного origin,
                  sessionStorage изолирован в рамках одной вкладки. <b>События:</b> localStorage триггерит события
                  в других вкладках, sessionStorage — нет.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие типы данных можно хранить в Storage?</p>
                <p class="font-weight-regular ma-0">
                  Только строки! Все остальные типы автоматически конвертируются в string. Для объектов и массивов
                  нужно использовать <code>JSON.stringify()</code> при сохранении и <code>JSON.parse()</code> при
                  получении. Числа и boolean конвертируются автоматически, но требуют парсинга обратно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Безопасно ли хранить токены в localStorage?</p>
                <p class="font-weight-regular ma-0">
                  Нет, это небезопасно! localStorage доступен из JavaScript, что делает его уязвимым к XSS атакам.
                  Если злоумышленник внедрит скрипт на страницу, он сможет прочитать все данные из Storage.
                  Для токенов лучше использовать httpOnly cookies, недоступные из JavaScript.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой размер данных можно хранить в Web Storage?</p>
                <p class="font-weight-regular ma-0">
                  Обычно 5-10MB в зависимости от браузера. При превышении лимита выбрасывается
                  <code>QuotaExceededError</code>. Для больших объёмов данных лучше использовать IndexedDB,
                  который поддерживает сотни мегабайт.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как синхронизировать данные между вкладками?</p>
                <p class="font-weight-regular ma-0">
                  Использовать событие <code>storage</code> для localStorage. Это событие автоматически
                  срабатывает в других вкладках при изменении данных. Можно создать pub-sub систему для
                  обмена сообщениями между вкладками. sessionStorage для этого не подходит (изолирован).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с sessionStorage при открытии новой вкладки?</p>
                <p class="font-weight-regular ma-0">
                  При открытии новой вкладки через ссылку (Ctrl+Click) или <code>window.open()</code> данные
                  sessionStorage <b>копируются</b> в новую вкладку. Но после этого вкладки имеют независимые
                  хранилища — изменения в одной не влияют на другую.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обработать переполнение Storage?</p>
                <p class="font-weight-regular ma-0">
                  Оборачивать <code>setItem()</code> в try-catch и ловить <code>QuotaExceededError</code>.
                  Стратегии: очистка старых данных, сжатие, использование LRU кеша, миграция на IndexedDB.
                  Можно предварительно проверять размер данных перед сохранением.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать localStorage, а когда sessionStorage?</p>
                <p class="font-weight-regular ma-0">
                  <b>localStorage:</b> настройки пользователя, кэш данных, черновики, история — всё, что должно
                  сохраняться между сессиями. <b>sessionStorage:</b> временные данные форм, фильтры, состояние
                  UI, wizard navigation — всё, что актуально только в рамках текущей сессии вкладки.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать JSON для объектов</li>
                    <li>Обрабатывать QuotaExceededError</li>
                    <li>Валидировать данные при чтении</li>
                    <li>Создавать обёртки для типов</li>
                    <li>Очищать при logout</li>
                    <li>Использовать префиксы для ключей</li>
                    <li>Документировать схему данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Хранения паролей и токенов</li>
                    <li>Сохранения функций</li>
                    <li>Прямого хранения объектов</li>
                    <li>Использования eval()</li>
                    <li>Игнорирования ошибок</li>
                    <li>Хранения PII без шифрования</li>
                    <li>Превышения лимита 5MB</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте TypeScript для типизации</li>
                    <li>Добавляйте TTL к данным</li>
                    <li>Мониторьте размер хранилища</li>
                    <li>Шифруйте чувствительные данные</li>
                    <li>Используйте namespacing</li>
                    <li>Тестируйте приватный режим</li>
                    <li>Миграция на IndexedDB для >5MB</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Поддержка браузерами -->
            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-row class="mb-8">
              <v-col cols="12">
                <v-card class="pa-4">
                  <v-row>
                    <v-col cols="12" md="6">
                      <h3 class="text-h6 font-weight-bold mb-2">Поддержка</h3>
                      <ul class="pl-4">
                        <li><strong>Chrome:</strong> 4+ ✅</li>
                        <li><strong>Firefox:</strong> 3.5+ ✅</li>
                        <li><strong>Safari:</strong> 4+ ✅</li>
                        <li><strong>Edge:</strong> Все версии ✅</li>
                        <li><strong>IE:</strong> 8+ ✅</li>
                        <li><strong>Opera:</strong> 10.5+ ✅</li>
                      </ul>
                    </v-col>
                    <v-col cols="12" md="6">
                      <h3 class="text-h6 font-weight-bold mb-2">Особенности</h3>
                      <ul class="pl-4">
                        <li>Размер варьируется: 5-10MB</li>
                        <li>В приватном режиме может не работать</li>
                        <li>iOS Safari: ограничения в Private Browsing</li>
                        <li>Квота может быть меньше на мобильных</li>
                        <li>Node.js: нет нативной поддержки (нужны полифиллы)</li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Web Storage API</b> предоставляет простой способ хранения данных на стороне клиента.
              <b>localStorage</b> сохраняет данные навсегда и доступен во всех вкладках, <b>sessionStorage</b> —
              до закрытия вкладки и изолирован. Оба хранят только строки, поэтому для сложных типов нужна
              сериализация через JSON. Критически важно: НЕ храните чувствительные данные (токены, пароли) —
              они уязвимы к XSS атакам. Размер ограничен ~5-10MB. Для больших данных используйте IndexedDB,
              для токенов — httpOnly cookies.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
                target="_blank"
                class="mr-2">
                MDN Web Storage API
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://html.spec.whatwg.org/multipage/webstorage.html"
                target="_blank"
                class="mr-2">
                WHATWG Spec
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://caniuse.com/namevalue-storage"
                target="_blank">
                Can I Use
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
