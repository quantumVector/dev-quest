<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicWorkerSnippet = `
// =====================================
// ОСНОВЫ WEB WORKERS
// =====================================

// main.js - основной поток
// 1. Создание Web Worker
const worker = new Worker('worker.js')

// 2. Отправка данных в Worker
worker.postMessage({
  type: 'calculate',
  data: [1, 2, 3, 4, 5]
})

// 3. Получение данных от Worker
worker.onmessage = (event) => {
  console.log('Результат от Worker:', event.data)
  // { type: 'result', value: 15 }
}

// 4. Обработка ошибок
worker.onerror = (error) => {
  console.error('Ошибка в Worker:', error.message)
  console.error('Файл:', error.filename)
  console.error('Строка:', error.lineno)
}

// 5. Завершение работы Worker
worker.terminate()  // Немедленная остановка

// =====================================
// worker.js - Worker поток
// =====================================

// Слушаем сообщения от основного потока
self.onmessage = (event) => {
  const { type, data } = event.data

  switch (type) {
    case 'calculate':
      // Выполняем вычисления
      const sum = data.reduce((acc, num) => acc + num, 0)

      // Отправляем результат обратно
      self.postMessage({
        type: 'result',
        value: sum
      })
      break

    case 'heavy-task':
      // Тяжелая операция
      const result = performHeavyCalculation(data)
      self.postMessage({ type: 'result', value: result })
      break

    case 'stop':
      // Завершаем работу Worker изнутри
      self.close()
      break
  }
}

// Функция с тяжелыми вычислениями
function performHeavyCalculation(data) {
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i) * data
  }
  return result
}

// Обработка ошибок в Worker
self.onerror = (error) => {
  console.error('Внутренняя ошибка Worker:', error)
}
`

const dataTransferSnippet = `
// =====================================
// ПЕРЕДАЧА ДАННЫХ МЕЖДУ ПОТОКАМИ
// =====================================

// 1. СТРУКТУРИРОВАННОЕ КЛОНИРОВАНИЕ (по умолчанию)
// Данные копируются - создается клон

// Основной поток
const data = {
  id: 1,
  name: 'John',
  scores: [90, 85, 92],
  date: new Date()
}

worker.postMessage(data)  // Создается копия

// После отправки можно изменять оригинал
data.name = 'Jane'  // Не влияет на данные в Worker

// Worker получает независимую копию
self.onmessage = (event) => {
  const receivedData = event.data
  console.log(receivedData.name)  // 'John' - оригинальное значение
}

// 2. TRANSFERABLE OBJECTS - передача владения
// Данные перемещаются, не копируются (zero-copy)

// Типы Transferable объектов:
// - ArrayBuffer
// - MessagePort
// - ImageBitmap
// - OffscreenCanvas
// - ReadableStream
// - WritableStream
// - TransformStream

// Пример с ArrayBuffer
const buffer = new ArrayBuffer(1024 * 1024)  // 1MB
const view = new Uint8Array(buffer)

// Заполняем данными
for (let i = 0; i < view.length; i++) {
  view[i] = i % 256
}

console.log(buffer.byteLength)  // 1048576

// Передаем владение Worker (transfer)
worker.postMessage({
  type: 'process',
  buffer: buffer
}, [buffer])  // Второй параметр - массив Transferable объектов

console.log(buffer.byteLength)  // 0 - буфер "опустел"
// buffer теперь detached, недоступен в основном потоке

// Worker получает владение
self.onmessage = (event) => {
  const { buffer } = event.data
  console.log(buffer.byteLength)  // 1048576 - полный размер

  const view = new Uint8Array(buffer)
  // Обрабатываем данные...

  // Возвращаем владение обратно
  self.postMessage({
    type: 'result',
    buffer: buffer
  }, [buffer])  // Transfer обратно
}

// 3. SHARED MEMORY - SharedArrayBuffer
// Разделяемая память между потоками (требует специальных заголовков)

// ВАЖНО: Требуются HTTP заголовки для безопасности
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp

// Создаем разделяемую память
const sharedBuffer = new SharedArrayBuffer(1024)
const sharedArray = new Int32Array(sharedBuffer)

// Инициализируем данные
sharedArray[0] = 42

// Отправляем в Worker (не transfer, а share)
worker.postMessage({
  type: 'shared',
  buffer: sharedBuffer
})

// SharedBuffer НЕ становится detached
console.log(sharedBuffer.byteLength)  // 1024 - доступен

// Оба потока могут читать и писать одновременно!
sharedArray[0] = 100  // Изменяем в основном потоке

// Worker видит те же изменения
self.onmessage = (event) => {
  const { buffer } = event.data
  const array = new Int32Array(buffer)

  console.log(array[0])  // Может быть 100 (race condition!)

  // Изменяем из Worker
  array[0] = 200

  // Основной поток увидит изменение
  self.postMessage({ type: 'done' })
}

// В основном потоке
worker.onmessage = () => {
  console.log(sharedArray[0])  // 200 - видим изменения от Worker
}

// 4. ATOMICS - атомарные операции для SharedArrayBuffer
// Безопасная работа с разделяемой памятью

const sharedBuffer = new SharedArrayBuffer(4)
const sharedArray = new Int32Array(sharedBuffer)

// Атомарные операции
Atomics.store(sharedArray, 0, 10)  // Атомарная запись
const value = Atomics.load(sharedArray, 0)  // Атомарное чтение

// Атомарное добавление
Atomics.add(sharedArray, 0, 5)  // sharedArray[0] += 5

// Compare-and-swap
const oldValue = 15
const newValue = 20
Atomics.compareExchange(sharedArray, 0, oldValue, newValue)
// Если значение == oldValue, устанавливает newValue

// Ожидание изменения (блокирующая операция в Worker!)
// В Worker потоке:
self.onmessage = (event) => {
  const { buffer } = event.data
  const array = new Int32Array(buffer)

  console.log('Worker ждет изменения...')

  // Ждет пока значение не станет !== 0
  const result = Atomics.wait(array, 0, 0)
  // 'ok' - проснулись по notify
  // 'not-equal' - значение уже изменилось
  // 'timed-out' - таймаут (если указан)

  console.log('Значение изменилось!', array[0])
}

// В основном потоке
sharedArray[0] = 100
Atomics.notify(sharedArray, 0, 1)  // Будит 1 ожидающий поток

// 5. СЛОЖНЫЕ ОБЪЕКТЫ - что можно/нельзя передавать

// ✅ МОЖНО передавать (структурированное клонирование):
worker.postMessage({
  // Примитивы
  number: 42,
  string: 'hello',
  boolean: true,
  null: null,
  undefined: undefined,

  // Объекты и массивы
  object: { a: 1, b: 2 },
  array: [1, 2, 3],

  // Типизированные массивы
  uint8: new Uint8Array([1, 2, 3]),

  // Даты
  date: new Date(),

  // RegExp
  regex: /test/gi,

  // Map и Set
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),

  // Blob и File
  blob: new Blob(['data'], { type: 'text/plain' }),

  // ImageData, ImageBitmap
})

// ❌ НЕЛЬЗЯ передавать:
worker.postMessage({
  // Функции
  // func: () => {},  // ❌ DataCloneError

  // DOM элементы
  // element: document.body,  // ❌

  // Объекты с символами
  // [Symbol('key')]: 'value',  // ❌

  // Объекты с геттерами/сеттерами
  // get value() { return 42 },  // ❌

  // Error объекты (но можно передать свойства)
  // error: new Error('test')  // ❌
})

// Обходное решение для функций - передача как строки
worker.postMessage({
  type: 'execute',
  funcString: \`
    function calculate(data) {
      return data.reduce((a, b) => a + b, 0)
    }
  \`,
  data: [1, 2, 3]
})

// Worker выполняет
self.onmessage = (event) => {
  const { funcString, data } = event.data

  // Создаем функцию из строки
  const func = new Function('data', funcString + '; return calculate(data)')
  const result = func(data)

  self.postMessage({ result })
}
`

const sharedWorkerSnippet = `
// =====================================
// SHARED WORKER - общий Worker для вкладок
// =====================================

// shared-worker.js - Worker разделяемый между вкладками

self.onconnect = (event) => {
  const port = event.ports[0]

  console.log('Новое подключение к Shared Worker')

  port.onmessage = (e) => {
    const { type, data } = e.data

    switch (type) {
      case 'increment':
        // Общий счетчик для всех вкладок
        if (!self.counter) self.counter = 0
        self.counter++

        port.postMessage({
          type: 'counter',
          value: self.counter
        })
        break

      case 'broadcast':
        // Отправляем всем подключенным портам
        // (нужно хранить список портов)
        self.ports.forEach(p => {
          p.postMessage({
            type: 'message',
            data: data
          })
        })
        break
    }
  }

  port.start()

  // Сохраняем порт для broadcast
  if (!self.ports) self.ports = []
  self.ports.push(port)
}

// Использование в разных вкладках
// tab1.html
const worker = new SharedWorker('shared-worker.js')

worker.port.onmessage = (event) => {
  console.log('Получено:', event.data)
}

worker.port.start()

worker.port.postMessage({
  type: 'increment'
})

// tab2.html - тот же код
const worker = new SharedWorker('shared-worker.js')
// Подключается к тому же экземпляру Worker!

worker.port.postMessage({
  type: 'increment'
})
// Счетчик общий для обеих вкладок
`

const useCasesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ СЦЕНАРИИ ИСПОЛЬЗОВАНИЯ
// =====================================

// 1. ОБРАБОТКА БОЛЬШИХ ДАННЫХ
// Парсинг CSV, JSON, обработка массивов

// main.js
const fileInput = document.querySelector('input[type="file"]')

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  const worker = new Worker('csv-parser-worker.js')

  // Читаем файл
  const text = await file.text()

  // Показываем loader
  showLoader('Обработка данных...')

  worker.postMessage({
    type: 'parse',
    data: text
  })

  worker.onmessage = (event) => {
    const { rows, stats } = event.data

    hideLoader()
    displayData(rows)
    console.log('Обработано строк:', stats.total)

    worker.terminate()
  }
})

// csv-parser-worker.js
self.onmessage = (event) => {
  const { data } = event.data

  const rows = data.split('\\n').map(line => {
    return line.split(',').map(cell => cell.trim())
  })

  // Статистика
  const stats = {
    total: rows.length,
    columns: rows[0]?.length || 0
  }

  self.postMessage({ rows, stats })
}

// 2. СЛОЖНЫЕ ВЫЧИСЛЕНИЯ
// Криптография, хеширование, математические операции

// main.js
async function hashPassword(password) {
  const worker = new Worker('crypto-worker.js')

  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      resolve(event.data.hash)
      worker.terminate()
    }

    worker.onerror = reject

    worker.postMessage({
      type: 'hash',
      password: password,
      algorithm: 'SHA-256'
    })
  })
}

// crypto-worker.js
self.onmessage = async (event) => {
  const { password, algorithm } = event.data

  // Конвертируем строку в байты
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  // Хешируем
  const hashBuffer = await crypto.subtle.digest(algorithm, data)

  // Конвертируем в hex
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  self.postMessage({ hash })
}

// 3. ОБРАБОТКА ИЗОБРАЖЕНИЙ
// Фильтры, преобразования, анализ

// main.js
async function applyFilter(imageData, filter) {
  const worker = new Worker('image-worker.js')

  return new Promise((resolve) => {
    worker.onmessage = (event) => {
      resolve(event.data.imageData)
      worker.terminate()
    }

    // Transfer ImageData buffer для производительности
    worker.postMessage({
      type: 'filter',
      imageData: imageData,
      filter: filter
    })
  })
}

// image-worker.js
self.onmessage = (event) => {
  const { imageData, filter } = event.data
  const pixels = imageData.data

  switch (filter) {
    case 'grayscale':
      for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
        pixels[i] = avg     // R
        pixels[i + 1] = avg // G
        pixels[i + 2] = avg // B
        // pixels[i + 3] - Alpha остается
      }
      break

    case 'invert':
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i]         // R
        pixels[i + 1] = 255 - pixels[i + 1] // G
        pixels[i + 2] = 255 - pixels[i + 2] // B
      }
      break

    case 'brightness':
      const amount = 50
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = Math.min(255, pixels[i] + amount)
        pixels[i + 1] = Math.min(255, pixels[i + 1] + amount)
        pixels[i + 2] = Math.min(255, pixels[i + 2] + amount)
      }
      break
  }

  self.postMessage({ imageData })
}

// 4. ФОНОВАЯ СИНХРОНИЗАЦИЯ
// Периодические задачи, синхронизация с сервером

// sync-worker.js
let syncInterval = null

self.onmessage = (event) => {
  const { type, interval } = event.data

  switch (type) {
    case 'start':
      syncInterval = setInterval(async () => {
        try {
          // Получаем данные для синхронизации
          const data = await fetchDataToSync()

          // Отправляем на сервер
          await syncWithServer(data)

          self.postMessage({
            type: 'sync-success',
            timestamp: Date.now()
          })
        } catch (error) {
          self.postMessage({
            type: 'sync-error',
            error: error.message
          })
        }
      }, interval)
      break

    case 'stop':
      if (syncInterval) {
        clearInterval(syncInterval)
        syncInterval = null
      }
      break
  }
}

async function syncWithServer(data) {
  const response = await fetch('/api/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return response.json()
}

// 5. REAL-TIME МОНИТОРИНГ
// Анализ данных в реальном времени

// monitoring-worker.js
class MetricsCollector {
  constructor() {
    this.metrics = []
    this.startTime = Date.now()
  }

  addMetric(metric) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    })

    // Анализируем каждые 100 метрик
    if (this.metrics.length >= 100) {
      this.analyze()
      this.metrics = []
    }
  }

  analyze() {
    const avgResponseTime = this.metrics.reduce((sum, m) =>
      sum + m.responseTime, 0) / this.metrics.length

    const errorRate = this.metrics.filter(m =>
      m.error).length / this.metrics.length

    self.postMessage({
      type: 'analysis',
      data: {
        avgResponseTime,
        errorRate,
        total: this.metrics.length,
        period: Date.now() - this.startTime
      }
    })
  }
}

const collector = new MetricsCollector()

self.onmessage = (event) => {
  const { type, metric } = event.data

  if (type === 'metric') {
    collector.addMetric(metric)
  }
}

// 6. ПРЕДВАРИТЕЛЬНАЯ ОБРАБОТКА
// Подготовка данных для отображения

// data-processor-worker.js
self.onmessage = async (event) => {
  const { type, data } = event.data

  switch (type) {
    case 'preprocess':
      // Фильтрация
      const filtered = data.filter(item => item.active)

      // Сортировка
      const sorted = filtered.sort((a, b) =>
        b.priority - a.priority)

      // Группировка
      const grouped = sorted.reduce((acc, item) => {
        const key = item.category
        if (!acc[key]) acc[key] = []
        acc[key].push(item)
        return acc
      }, {})

      // Вычисление статистики
      const stats = Object.entries(grouped).map(([category, items]) => ({
        category,
        count: items.length,
        totalValue: items.reduce((sum, item) => sum + item.value, 0)
      }))

      self.postMessage({
        type: 'result',
        grouped,
        stats
      })
      break
  }
}
`

const multipleWorkersSnippet = `
// =====================================
// МНОЖЕСТВЕННЫЕ WORKERS - распределение задач
// =====================================

// 1. WORKER POOL - пул воркеров

class WorkerPool {
  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    this.workers = []
    this.taskQueue = []
    this.busyWorkers = new Set()

    // Создаем пул
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript)
      worker.id = i

      worker.onmessage = (event) => {
        this.handleWorkerMessage(worker, event)
      }

      worker.onerror = (error) => {
        console.error(\`Worker \${worker.id} error:\`, error)
        this.busyWorkers.delete(worker)
        this.processQueue()
      }

      this.workers.push(worker)
    }
  }

  // Выполнение задачи
  async execute(data) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({
        data,
        resolve,
        reject,
        timestamp: Date.now()
      })

      this.processQueue()
    })
  }

  // Обработка очереди
  processQueue() {
    if (this.taskQueue.length === 0) return

    // Ищем свободный Worker
    const freeWorker = this.workers.find(w => !this.busyWorkers.has(w))

    if (!freeWorker) return // Все заняты

    const task = this.taskQueue.shift()
    this.busyWorkers.add(freeWorker)

    // Сохраняем информацию о задаче
    freeWorker.currentTask = task

    // Отправляем задачу
    freeWorker.postMessage(task.data)
  }

  // Обработка ответа от Worker
  handleWorkerMessage(worker, event) {
    const task = worker.currentTask

    if (task) {
      task.resolve(event.data)
      worker.currentTask = null
    }

    this.busyWorkers.delete(worker)
    this.processQueue()
  }

  // Статистика
  getStats() {
    return {
      totalWorkers: this.workers.length,
      busyWorkers: this.busyWorkers.size,
      queueLength: this.taskQueue.length,
      utilization: (this.busyWorkers.size / this.workers.length * 100).toFixed(2) + '%'
    }
  }

  // Завершение всех Workers
  terminate() {
    this.workers.forEach(worker => worker.terminate())
    this.workers = []
    this.taskQueue = []
    this.busyWorkers.clear()
  }
}

// Использование Worker Pool
const pool = new WorkerPool('task-worker.js', 4)

// Обрабатываем множество задач параллельно
async function processLargeDataset(items) {
  const results = await Promise.all(
    items.map(item => pool.execute({
      type: 'process',
      data: item
    }))
  )

  console.log('Статистика пула:', pool.getStats())

  return results
}

// Пример с большим количеством задач
const items = Array.from({ length: 1000 }, (_, i) => i)
const results = await processLargeDataset(items)

// 2. MAP-REDUCE паттерн с Workers

class MapReduceWorkerPool {
  constructor(poolSize = 4) {
    this.pool = new WorkerPool('map-reduce-worker.js', poolSize)
  }

  async mapReduce(data, mapFunc, reduceFunc) {
    // MAP фаза - распределяем данные по Workers
    const chunkSize = Math.ceil(data.length / this.pool.workers.length)
    const chunks = []

    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize))
    }

    // Отправляем на обработку
    const mapResults = await Promise.all(
      chunks.map(chunk => this.pool.execute({
        type: 'map',
        data: chunk,
        mapFunc: mapFunc.toString()
      }))
    )

    // REDUCE фаза - объединяем результаты
    const flatResults = mapResults.flat()

    return this.pool.execute({
      type: 'reduce',
      data: flatResults,
      reduceFunc: reduceFunc.toString()
    })
  }
}

// map-reduce-worker.js
self.onmessage = (event) => {
  const { type, data, mapFunc, reduceFunc } = event.data

  switch (type) {
    case 'map':
      // Выполняем map функцию на chunk данных
      const map = new Function('return ' + mapFunc)()
      const mappedResults = data.map(map)
      self.postMessage(mappedResults)
      break

    case 'reduce':
      // Выполняем reduce функцию
      const reduce = new Function('return ' + reduceFunc)()
      const result = data.reduce(reduce)
      self.postMessage(result)
      break
  }
}

// Использование
const mapReduce = new MapReduceWorkerPool(4)

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1)

// Считаем сумму квадратов
const result = await mapReduce.mapReduce(
  numbers,
  // Map: возводим в квадрат
  (x) => x * x,
  // Reduce: суммируем
  (acc, x) => acc + x
)

console.log('Сумма квадратов:', result)

// 3. DYNAMIC WORKER SPAWNING - динамическое создание Workers

class AdaptiveWorkerPool {
  constructor(workerScript) {
    this.workerScript = workerScript
    this.workers = []
    this.taskQueue = []
    this.minWorkers = 2
    this.maxWorkers = navigator.hardwareConcurrency || 8

    // Создаем минимальное количество
    this.scale(this.minWorkers)

    // Автомасштабирование каждые 5 секунд
    setInterval(() => this.autoScale(), 5000)
  }

  scale(targetCount) {
    const current = this.workers.length

    if (targetCount > current) {
      // Добавляем Workers
      for (let i = 0; i < targetCount - current; i++) {
        this.addWorker()
      }
    } else if (targetCount < current) {
      // Удаляем Workers
      for (let i = 0; i < current - targetCount; i++) {
        this.removeWorker()
      }
    }
  }

  addWorker() {
    if (this.workers.length >= this.maxWorkers) return

    const worker = new Worker(this.workerScript)
    worker.id = this.workers.length
    worker.taskCount = 0

    worker.onmessage = (event) => {
      worker.taskCount++
      this.handleMessage(worker, event)
    }

    this.workers.push(worker)
    console.log(\`Added worker \${worker.id}. Total: \${this.workers.length}\`)
  }

  removeWorker() {
    if (this.workers.length <= this.minWorkers) return

    // Удаляем Worker с наименьшей нагрузкой
    const worker = this.workers.reduce((min, w) =>
      w.taskCount < min.taskCount ? w : min
    )

    worker.terminate()
    this.workers = this.workers.filter(w => w !== worker)
    console.log(\`Removed worker \${worker.id}. Total: \${this.workers.length}\`)
  }

  autoScale() {
    const queueLength = this.taskQueue.length
    const workerCount = this.workers.length

    // Если очередь растет - добавляем Workers
    if (queueLength > workerCount * 2) {
      this.scale(Math.min(workerCount + 1, this.maxWorkers))
    }
    // Если очередь пустая - уменьшаем
    else if (queueLength === 0 && workerCount > this.minWorkers) {
      this.scale(Math.max(workerCount - 1, this.minWorkers))
    }

    console.log(\`Auto-scale: \${workerCount} workers, \${queueLength} tasks queued\`)
  }

  async execute(data) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ data, resolve, reject })
      this.processQueue()
    })
  }

  processQueue() {
    if (this.taskQueue.length === 0) return

    // Находим наименее загруженный Worker
    const worker = this.workers.reduce((min, w) =>
      w.taskCount < min.taskCount ? w : min
    )

    const task = this.taskQueue.shift()
    worker.currentTask = task
    worker.postMessage(task.data)
  }

  handleMessage(worker, event) {
    if (worker.currentTask) {
      worker.currentTask.resolve(event.data)
      worker.currentTask = null
    }
    this.processQueue()
  }
}

// 4. РАБОТА С БОЛЬШИМИ ФАЙЛАМИ - чтение по частям

async function processLargeFile(file) {
  const pool = new WorkerPool('file-processor-worker.js', 4)
  const chunkSize = 1024 * 1024 // 1MB chunks
  const chunks = Math.ceil(file.size / chunkSize)

  console.log(\`Processing \${file.size} bytes in \${chunks} chunks\`)

  const results = []

  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    // Читаем chunk как ArrayBuffer
    const buffer = await chunk.arrayBuffer()

    // Обрабатываем в Worker (с transfer)
    const result = await pool.execute({
      type: 'process-chunk',
      buffer: buffer,
      chunkIndex: i
    })

    results.push(result)

    // Прогресс
    const progress = ((i + 1) / chunks * 100).toFixed(2)
    console.log(\`Progress: \${progress}%\`)
  }

  // Объединяем результаты
  const finalResult = results.reduce((acc, r) => ({
    ...acc,
    count: acc.count + r.count,
    checksum: acc.checksum ^ r.checksum
  }), { count: 0, checksum: 0 })

  pool.terminate()
  return finalResult
}

// 5. ПАЙПЛАЙН ОБРАБОТКИ - цепочка Workers

class WorkerPipeline {
  constructor(stages) {
    this.stages = stages.map((script, index) => ({
      worker: new Worker(script),
      index: index,
      next: null
    }))

    // Связываем стадии
    for (let i = 0; i < this.stages.length - 1; i++) {
      this.stages[i].next = this.stages[i + 1]
    }

    // Настраиваем обработчики
    this.stages.forEach((stage, index) => {
      stage.worker.onmessage = (event) => {
        if (stage.next) {
          // Передаем следующей стадии
          stage.next.worker.postMessage(event.data)
        } else {
          // Последняя стадия - отправляем результат
          this.onComplete(event.data)
        }
      }
    })
  }

  process(data) {
    return new Promise((resolve) => {
      this.onComplete = resolve
      // Начинаем с первой стадии
      this.stages[0].worker.postMessage(data)
    })
  }

  terminate() {
    this.stages.forEach(stage => stage.worker.terminate())
  }
}

// Использование pipeline
const pipeline = new WorkerPipeline([
  'stage1-validate.js',   // Валидация
  'stage2-transform.js',  // Трансформация
  'stage3-aggregate.js'   // Агрегация
])

const result = await pipeline.process({
  type: 'data',
  items: [/* ... */]
})

console.log('Pipeline result:', result)
pipeline.terminate()
`

const reactExampleSnippet = `
// =====================================
// REACT INTEGRATION - использование в React
// =====================================

// 1. Кастомный хук для Web Worker
import { useEffect, useRef, useState, useCallback } from 'react'

function useWebWorker(workerFunction) {
  const workerRef = useRef(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Создаем Worker из функции
    const code = workerFunction.toString()
    const blob = new Blob([\`(\${code})()\`], { type: 'application/javascript' })
    const workerUrl = URL.createObjectURL(blob)

    workerRef.current = new Worker(workerUrl)

    workerRef.current.onmessage = (event) => {
      setResult(event.data)
      setLoading(false)
    }

    workerRef.current.onerror = (err) => {
      setError(err.message)
      setLoading(false)
    }

    return () => {
      workerRef.current?.terminate()
      URL.revokeObjectURL(workerUrl)
    }
  }, [workerFunction])

  const execute = useCallback((data) => {
    setLoading(true)
    setError(null)
    workerRef.current?.postMessage(data)
  }, [])

  return { result, error, loading, execute }
}

// 2. Компонент для тяжелых вычислений
function HeavyCalculationComponent() {
  const workerFunction = () => {
    self.onmessage = (e) => {
      const { numbers } = e.data

      // Тяжелые вычисления
      let result = 0
      for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < 10000; j++) {
          result += Math.sqrt(numbers[i]) * Math.sin(j)
        }
      }

      self.postMessage({ result })
    }
  }

  const { result, loading, execute } = useWebWorker(workerFunction)

  const handleCalculate = () => {
    const numbers = Array.from({ length: 1000 }, (_, i) => i)
    execute({ numbers })
  }

  return (
    <div>
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Вычисление...' : 'Начать вычисление'}
      </button>
      {result && <div>Результат: {result.result}</div>}
    </div>
  )
}

// 3. Обработка изображений с прогрессом
function ImageProcessor() {
  const [progress, setProgress] = useState(0)
  const [processedImage, setProcessedImage] = useState(null)
  const workerRef = useRef(null)

  useEffect(() => {
    const worker = new Worker('image-worker.js')

    worker.onmessage = (event) => {
      const { type, data } = event.data

      if (type === 'progress') {
        setProgress(data.progress)
      } else if (type === 'complete') {
        setProcessedImage(data.imageData)
        setProgress(100)
      }
    }

    workerRef.current = worker

    return () => worker.terminate()
  }, [])

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Отправляем в Worker
    workerRef.current.postMessage({
      type: 'process',
      imageData: imageData,
      filter: 'grayscale'
    })
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      {progress > 0 && progress < 100 && (
        <div>Обработка: {progress}%</div>
      )}
      {processedImage && (
        <canvas ref={canvas => {
          if (canvas) {
            canvas.width = processedImage.width
            canvas.height = processedImage.height
            canvas.getContext('2d').putImageData(processedImage, 0, 0)
          }
        }} />
      )}
    </div>
  )
}

// 4. Real-time поиск с Worker
function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchTime, setSearchTime] = useState(0)
  const workerRef = useRef(null)

  useEffect(() => {
    const worker = new Worker('search-worker.js')

    // Загружаем большой датасет в Worker
    fetch('/api/large-dataset')
      .then(r => r.json())
      .then(data => {
        worker.postMessage({
          type: 'init',
          data: data
        })
      })

    worker.onmessage = (event) => {
      const { results, time } = event.data
      setResults(results)
      setSearchTime(time)
    }

    workerRef.current = worker

    return () => worker.terminate()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // Debounce
    const timeoutId = setTimeout(() => {
      workerRef.current?.postMessage({
        type: 'search',
        query: query
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      {searchTime > 0 && (
        <div>Найдено за {searchTime}ms</div>
      )}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

// search-worker.js
let dataset = []

self.onmessage = (event) => {
  const { type, data, query } = event.data

  switch (type) {
    case 'init':
      dataset = data
      console.log('Dataset loaded:', dataset.length, 'items')
      break

    case 'search':
      const startTime = performance.now()

      const results = dataset.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) ||
               item.description.toLowerCase().includes(query.toLowerCase())
      }).slice(0, 50) // Первые 50 результатов

      const endTime = performance.now()

      self.postMessage({
        results,
        time: (endTime - startTime).toFixed(2)
      })
      break
  }
}

// 5. Worker Pool хук
function useWorkerPool(workerScript, poolSize = 4) {
  const poolRef = useRef(null)

  useEffect(() => {
    poolRef.current = new WorkerPool(workerScript, poolSize)

    return () => {
      poolRef.current?.terminate()
    }
  }, [workerScript, poolSize])

  const execute = useCallback(async (data) => {
    if (!poolRef.current) throw new Error('Worker pool not initialized')
    return poolRef.current.execute(data)
  }, [])

  const getStats = useCallback(() => {
    return poolRef.current?.getStats() || null
  }, [])

  return { execute, getStats }
}

// Использование pool хука
function DataProcessor() {
  const [items, setItems] = useState([])
  const [processing, setProcessing] = useState(false)
  const [stats, setStats] = useState(null)

  const { execute, getStats } = useWorkerPool('processor-worker.js', 4)

  const processItems = async () => {
    setProcessing(true)

    try {
      const results = await Promise.all(
        items.map(item => execute({
          type: 'process',
          data: item
        }))
      )

      console.log('Обработано:', results.length)
      setStats(getStats())
    } catch (error) {
      console.error('Ошибка обработки:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <button onClick={processItems} disabled={processing}>
        {processing ? 'Обработка...' : 'Обработать данные'}
      </button>
      {stats && (
        <div>
          <div>Workers: {stats.totalWorkers}</div>
          <div>Busy: {stats.busyWorkers}</div>
          <div>Queue: {stats.queueLength}</div>
          <div>Utilization: {stats.utilization}</div>
        </div>
      )}
    </div>
  )
}
`

const limitationsSnippet = `
// =====================================
// ОГРАНИЧЕНИЯ И ОСОБЕННОСТИ WEB WORKERS
// =====================================

// ❌ ЧТО НЕДОСТУПНО В WEB WORKERS:

// 1. DOM и Window объект
// self.document  // ❌ undefined
// self.window    // ❌ undefined
// self.alert()   // ❌ не существует

// 2. Родительские объекты
// self.parent    // ❌ undefined
// self.frameElement  // ❌ undefined

// 3. Некоторые Web APIs
// localStorage   // ❌ недоступен
// sessionStorage // ❌ недоступен
// document.cookie // ❌ недоступен

// ✅ ЧТО ДОСТУПНО В WEB WORKERS:

// 1. Базовые объекты JavaScript
console.log('Logging from worker')
const obj = { a: 1 }
const arr = [1, 2, 3]
const date = new Date()
const regex = /test/

// 2. Таймеры
setTimeout(() => {
  console.log('Delayed')
}, 1000)

setInterval(() => {
  console.log('Periodic')
}, 5000)

// 3. Fetch API
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => {
    self.postMessage({ data })
  })

// 4. WebSocket
const ws = new WebSocket('wss://example.com/socket')

ws.onmessage = (event) => {
  self.postMessage({ type: 'ws-message', data: event.data })
}

// 5. IndexedDB
const request = indexedDB.open('MyDatabase', 1)

request.onsuccess = (event) => {
  const db = event.target.result
  // Работа с БД...
}

// 6. Cache API
caches.open('my-cache').then(cache => {
  cache.add('/api/data')
})

// 7. Crypto API
crypto.subtle.digest('SHA-256', data)
  .then(hash => {
    self.postMessage({ hash })
  })

// 8. XMLHttpRequest
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/data')
xhr.send()

// 9. importScripts - загрузка скриптов
importScripts('lib1.js', 'lib2.js')
// Скрипты выполняются синхронно

// 10. Broadcast Channel - общение между Workers
const channel = new BroadcastChannel('worker-channel')

channel.onmessage = (event) => {
  console.log('Message from another worker:', event.data)
}

channel.postMessage('Hello from worker!')

// 11. Performance API
const startTime = performance.now()
// ... операции
const endTime = performance.now()
console.log('Время выполнения:', endTime - startTime, 'ms')

// ВАЖНЫЕ ОСОБЕННОСТИ:

// 1. Same-Origin Policy
// Worker должен быть с того же origin
// ❌ new Worker('https://other-domain.com/worker.js')
// ✅ new Worker('/worker.js')
// ✅ new Worker('worker.js')

// Обход: Blob URL
const code = \`
  self.onmessage = (e) => {
    self.postMessage('Hello from blob worker!')
  }
\`
const blob = new Blob([code], { type: 'application/javascript' })
const url = URL.createObjectURL(blob)
const worker = new Worker(url)

// 2. Module Workers (type: 'module')
const worker = new Worker('worker.js', { type: 'module' })

// В worker.js можно использовать import
// import { helper } from './helper.js'

// 3. Credentials для fetch в Worker
// По умолчанию credentials не включаются
fetch('/api/data', {
  credentials: 'include'  // Включаем cookies
})

// 4. Ошибки и debugging
// Используйте Chrome DevTools -> Sources -> Threads
// Или добавьте логирование
self.onerror = (error) => {
  console.error('Worker error:', error)

  // Отправляем ошибку в main thread
  self.postMessage({
    type: 'error',
    error: {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno
    }
  })
}

// 5. Memory management
// Workers не освобождаются автоматически
// Всегда вызывайте terminate()

// ❌ Плохо - утечка памяти
function createWorker() {
  const worker = new Worker('worker.js')
  // Worker не удаляется после выхода из функции
}

// ✅ Хорошо
function createWorker() {
  const worker = new Worker('worker.js')

  // Работа с worker...

  // Очистка
  worker.terminate()
}

// 6. Максимальное количество Workers
// Браузеры ограничивают количество одновременных Workers
// Chrome/Firefox: ~20 Workers на origin
console.log('Hardware concurrency:', navigator.hardwareConcurrency)
// Используйте это значение для определения оптимального количества

// 7. Размер передаваемых данных
// Большие объекты могут замедлить постMessage
// Используйте Transferable Objects для больших данных

// ❌ Медленно - копирование 100MB
const largeArray = new Uint8Array(100 * 1024 * 1024)
worker.postMessage({ data: largeArray })

// ✅ Быстро - transfer (zero-copy)
const largeArray = new Uint8Array(100 * 1024 * 1024)
worker.postMessage({ data: largeArray.buffer }, [largeArray.buffer])

// 8. SharedArrayBuffer требования
// Для использования SharedArrayBuffer нужны HTTP заголовки:
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp

// Проверка поддержки
if (typeof SharedArrayBuffer !== 'undefined') {
  console.log('SharedArrayBuffer supported')
} else {
  console.log('SharedArrayBuffer not available - check COOP/COEP headers')
}
`

const highlightedBasicWorker = ref('')
const highlightedDataTransfer = ref('')
const highlightedSharedWorker = ref('')
const highlightedUseCases = ref('')
const highlightedMultipleWorkers = ref('')
const highlightedReactExample = ref('')
const highlightedLimitations = ref('')

onMounted(() => {
  highlightedBasicWorker.value = Prism.highlight(basicWorkerSnippet, Prism.languages.javascript, 'javascript')
  highlightedDataTransfer.value = Prism.highlight(dataTransferSnippet, Prism.languages.javascript, 'javascript')
  highlightedSharedWorker.value = Prism.highlight(sharedWorkerSnippet, Prism.languages.javascript, 'javascript')
  highlightedUseCases.value = Prism.highlight(useCasesSnippet, Prism.languages.javascript, 'javascript')
  highlightedMultipleWorkers.value = Prism.highlight(multipleWorkersSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactExample.value = Prism.highlight(reactExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedLimitations.value = Prism.highlight(limitationsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Workers: многопоточность в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Worker</b> — это механизм для выполнения JavaScript кода в фоновом потоке, отдельном от основного
              потока выполнения веб-страницы. Workers позволяют выполнять тяжелые вычисления без блокировки UI,
              обеспечивая плавную работу интерфейса.
            </p>

            <!-- Основная концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Основная концепция</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-application-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Main Thread</h3>
                  <p class="text-body-2">
                    Основной поток<br>
                    DOM, события, рендеринг<br>
                    UI должен оставаться отзывчивым
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-worker</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Web Worker</h3>
                  <p class="text-body-2">
                    Фоновый поток<br>
                    Вычисления, обработка данных<br>
                    Не блокирует основной поток
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-message-arrow-left-right</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Communication</h3>
                  <p class="text-body-2">
                    postMessage / onmessage<br>
                    Передача данных между потоками<br>
                    Event-driven модель
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Когда использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Web Workers</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">✅ Подходит для</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Тяжелые вычисления:</strong> криптография, хеширование</li>
                    <li><strong>Обработка больших данных:</strong> парсинг CSV/JSON</li>
                    <li><strong>Обработка изображений:</strong> фильтры, преобразования</li>
                    <li><strong>Поиск и фильтрация:</strong> в больших массивах</li>
                    <li><strong>Фоновая синхронизация:</strong> с сервером</li>
                    <li><strong>Компрессия/декомпрессия:</strong> данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">❌ Не подходит для</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Манипуляции DOM:</strong> недоступен в Workers</li>
                    <li><strong>Быстрые операции:</strong> overhead постMessage</li>
                    <li><strong>Работа с UI:</strong> события, анимации</li>
                    <li><strong>Маленькие задачи:</strong> лучше в main thread</li>
                    <li><strong>Синхронный код:</strong> требующий DOM</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с Web Workers</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Web Worker выполняется в отдельном глобальном контексте,
              где нет доступа к DOM и window объекту. Используйте <code>self</code> вместо <code>window</code>.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicWorker"></code></pre>

            <!-- Передача данных -->
            <h2 class="text-h5 font-weight-bold mb-3">Передача данных между потоками</h2>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>SharedArrayBuffer:</strong> Для использования разделяемой памяти требуются специальные
              HTTP заголовки: <code>Cross-Origin-Opener-Policy: same-origin</code> и
              <code>Cross-Origin-Embedder-Policy: require-corp</code>
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Structured Cloning</strong></td>
                <td>Копирование данных (по умолчанию)</td>
                <td class="text-warning">Средняя (копирование)</td>
                <td>Простые объекты, небольшие данные</td>
              </tr>
              <tr>
                <td><strong>Transferable Objects</strong></td>
                <td>Передача владения (zero-copy)</td>
                <td class="text-success">Отличная (без копирования)</td>
                <td>ArrayBuffer, большие бинарные данные</td>
              </tr>
              <tr>
                <td><strong>SharedArrayBuffer</strong></td>
                <td>Разделяемая память между потоками</td>
                <td class="text-success">Отличная (общая память)</td>
                <td>Требует синхронизации, Atomics API</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDataTransfer"></code></pre>

            <!-- Shared Memory -->
            <h2 class="text-h5 font-weight-bold mb-3">SharedMemory между потоками</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Как это работает</h3>
                  <ul class="pl-4">
                    <li><code>SharedArrayBuffer</code> создает общую память</li>
                    <li>Оба потока видят одни и те же данные</li>
                    <li>Изменения видны мгновенно без постMessage</li>
                    <li>Требует <code>Atomics</code> для безопасности</li>
                    <li>Нужны специальные HTTP заголовки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Проблемы и решения</h3>
                  <ul class="pl-4">
                    <li><strong>Race conditions:</strong> используйте Atomics</li>
                    <li><strong>Синхронизация:</strong> wait/notify паттерн</li>
                    <li><strong>Безопасность:</strong> требует COOP/COEP</li>
                    <li><strong>Сложность:</strong> низкоуровневое API</li>
                    <li><strong>Поддержка:</strong> проверяйте доступность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Shared Worker -->
            <h2 class="text-h5 font-weight-bold mb-3">Shared Worker - общий Worker для вкладок</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Shared Worker</strong> — специальный тип Worker, который может использоваться
              несколькими вкладками/окнами одного origin одновременно.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSharedWorker"></code></pre>

            <!-- Практические сценарии -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические сценарии использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseCases"></code></pre>

            <!-- Множественные Workers -->
            <h2 class="text-h5 font-weight-bold mb-3">Множественные Workers - распределение задач</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Оптимальное количество Workers:</strong> Используйте <code>navigator.hardwareConcurrency</code>
              для определения количества логических процессоров. Обычно создают столько же Workers или чуть меньше.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleWorkers"></code></pre>

            <!-- React интеграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Интеграция с React</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactExample"></code></pre>

            <!-- Ограничения -->
            <h2 class="text-h5 font-weight-bold mb-3">Ограничения и особенности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLimitations"></code></pre>

            <!-- Типы Workers -->
            <h2 class="text-h5 font-weight-bold mb-3">Типы Web Workers</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Создание</th>
                <th class="text-left font-weight-bold">Область видимости</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Dedicated Worker</strong></td>
                <td><code>new Worker('worker.js')</code></td>
                <td>Одна страница/скрипт</td>
                <td>Изолированные задачи для одной страницы</td>
              </tr>
              <tr>
                <td><strong>Shared Worker</strong></td>
                <td><code>new SharedWorker('worker.js')</code></td>
                <td>Несколько вкладок одного origin</td>
                <td>Общее состояние между вкладками</td>
              </tr>
              <tr>
                <td><strong>Service Worker</strong></td>
                <td><code>navigator.serviceWorker.register()</code></td>
                <td>Все вкладки origin</td>
                <td>Кеширование, offline, push уведомления</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Web Worker и для чего он используется?</p>
                <p class="font-weight-regular ma-0">
                  Web Worker — это механизм для выполнения JavaScript в фоновом потоке, отдельном от основного
                  потока страницы. Используется для тяжелых вычислений, обработки больших данных, чтобы
                  не блокировать UI и сохранить отзывчивость интерфейса.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Web Worker взаимодействует с основным потоком?</p>
                <p class="font-weight-regular ma-0">
                  Через систему сообщений: <code>postMessage()</code> для отправки и <code>onmessage</code>
                  для получения. Workers не имеют прямого доступа к DOM или переменным основного потока,
                  вся коммуникация происходит через сообщения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Существует ли SharedMemory между потоками?</p>
                <p class="font-weight-regular ma-0">
                  Да, через <code>SharedArrayBuffer</code>. Это разделяемая память, доступная обоим потокам
                  одновременно. Для безопасной работы требуются <code>Atomics</code> API и специальные HTTP
                  заголовки (COOP/COEP). Изменения видны без postMessage.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли прочитать данные Worker из основного потока напрямую?</p>
                <p class="font-weight-regular ma-0">
                  Нет, только через SharedArrayBuffer или postMessage. У Workers отдельная область видимости
                  и изолированная память. Для обычных переменных нужно использовать систему сообщений.
                  SharedArrayBuffer позволяет читать общую память напрямую.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как передавать данные между потоками?</p>
                <p class="font-weight-regular ma-0">
                  Три способа: 1) Structured Cloning (копирование по умолчанию), 2) Transferable Objects
                  (передача владения для ArrayBuffer, zero-copy), 3) SharedArrayBuffer (разделяемая память).
                  Для больших данных используйте transfer или shared memory.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как использовать несколько Workers для распределения задач?</p>
                <p class="font-weight-regular ma-0">
                  Создайте Worker Pool: массив Workers, очередь задач, распределение по свободным Workers.
                  Оптимальное количество ~ <code>navigator.hardwareConcurrency</code>. Используйте паттерны
                  Map-Reduce, Pipeline или динамическое масштабирование для эффективного распределения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Dedicated и Shared Worker?</p>
                <p class="font-weight-regular ma-0">
                  Dedicated Worker привязан к одному скрипту/странице, Shared Worker разделяется между
                  несколькими вкладками одного origin. Shared использует <code>port.postMessage()</code>
                  и событие <code>onconnect</code> для каждой новой вкладки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие ограничения есть у Web Workers?</p>
                <p class="font-weight-regular ma-0">
                  Нет доступа к DOM, window, parent, localStorage. Нельзя манипулировать UI напрямую.
                  Доступны: fetch, WebSocket, IndexedDB, Crypto, таймеры. Workers должны быть с того же
                  origin (Same-Origin Policy).
                </p>
              </li>
            </ol>

            <!-- Поддержка браузерами -->
            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Dedicated Worker</h3>
                  <ul class="pl-4">
                    <li><strong>Chrome:</strong> 4+ ✅</li>
                    <li><strong>Firefox:</strong> 3.5+ ✅</li>
                    <li><strong>Safari:</strong> 4+ ✅</li>
                    <li><strong>Edge:</strong> 12+ ✅</li>
                    <li><strong>IE:</strong> 10+ ✅</li>
                    <li><strong>Mobile:</strong> Полная поддержка ✅</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Advanced Features</h3>
                  <ul class="pl-4">
                    <li><strong>SharedArrayBuffer:</strong> Chrome 68+, требует COOP/COEP</li>
                    <li><strong>Shared Worker:</strong> Chrome 5+, Firefox 29+</li>
                    <li><strong>Module Workers:</strong> Chrome 80+, современные браузеры</li>
                    <li><strong>Transferable Objects:</strong> Широкая поддержка</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать для тяжелых операций</li>
                    <li>Transfer для больших ArrayBuffer</li>
                    <li>Переиспользовать Workers (пул)</li>
                    <li>Terminate после завершения</li>
                    <li>Обрабатывать ошибки</li>
                    <li>Проверять поддержку браузером</li>
                    <li>Использовать Atomics с SharedArrayBuffer</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использования для быстрых операций</li>
                    <li>Создания слишком многих Workers</li>
                    <li>Передачи огромных объектов постоянно</li>
                    <li>Забывать terminate Workers</li>
                    <li>Обращения к DOM из Worker</li>
                    <li>Использовать для простых задач</li>
                    <li>SharedArrayBuffer без Atomics</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Профилируйте перед оптимизацией</li>
                    <li>Используйте Worker Pool паттерн</li>
                    <li>Комбинируйте с requestIdleCallback</li>
                    <li>Кешируйте Workers в React</li>
                    <li>Мониторьте utilization пула</li>
                    <li>Документируйте communication API</li>
                    <li>Тестируйте с реальными данными</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Альтернативы Web Workers</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Web Workers</strong></td>
                <td>Тяжелые вычисления, обработка данных</td>
                <td>Настоящий параллелизм, не блокирует UI</td>
                <td>Overhead создания, нет доступа к DOM</td>
              </tr>
              <tr>
                <td><strong>requestIdleCallback</strong></td>
                <td>Некритичные задачи в фоне</td>
                <td>Простота, низкий overhead</td>
                <td>Прерывается при активности, медленнее</td>
              </tr>
              <tr>
                <td><strong>setTimeout/setInterval</strong></td>
                <td>Разбиение задач на части</td>
                <td>Простота реализации</td>
                <td>Блокирует UI при выполнении</td>
              </tr>
              <tr>
                <td><strong>WASM Threads</strong></td>
                <td>Максимальная производительность</td>
                <td>Очень быстрый, SharedArrayBuffer</td>
                <td>Сложность, требует компиляции</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Web Workers</b> — это мощный инструмент для реализации многопоточности в веб-приложениях.
              Они позволяют выполнять тяжелые вычисления в фоновых потоках, не блокируя UI. Ключевые аспекты:
              изолированный контекст выполнения, коммуникация через <code>postMessage</code>, три способа
              передачи данных (cloning, transfer, shared memory). Для эффективного использования создавайте
              Worker Pool, используйте Transferable Objects для больших данных и <code>SharedArrayBuffer</code>
              с <code>Atomics</code> для разделяемой памяти. Всегда профилируйте производительность —
              Workers имеют overhead создания и коммуникации.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
                target="_blank"
                class="mr-2">
                MDN Web Workers
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://html.spec.whatwg.org/multipage/workers.html"
                target="_blank"
                class="mr-2">
                WHATWG Spec
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://web.dev/off-main-thread/"
                target="_blank">
                Google Web.dev Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
