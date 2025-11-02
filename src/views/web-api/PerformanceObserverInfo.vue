<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicsSnippet = `
// =====================================
// PERFORMANCEOBSERVER - основы
// =====================================

// 1. Создание PerformanceObserver
const observer = new PerformanceObserver((list, obs) => {
  // list - PerformanceObserverEntryList
  // obs - сам observer

  // Получаем все записи
  const entries = list.getEntries()

  entries.forEach(entry => {
    console.log('Тип:', entry.entryType)
    console.log('Имя:', entry.name)
    console.log('Длительность:', entry.duration)
    console.log('Время начала:', entry.startTime)
  })
})

// 2. Подписка на типы метрик
observer.observe({
  entryTypes: ['navigation', 'resource', 'measure']
})

// 3. Отписка от наблюдения
observer.disconnect()

// 4. Получение буфера (накопленные метрики до подписки)
observer.observe({
  type: 'resource',
  buffered: true  // Получить все предыдущие записи
})

// 5. Проверка поддержки типов
const supportedTypes = PerformanceObserver.supportedEntryTypes
console.log('Поддерживаемые типы:', supportedTypes)
// ['navigation', 'resource', 'mark', 'measure', 'paint', ...]
`

const entryTypesSnippet = `
// =====================================
// ТИПЫ PERFORMANCE ENTRIES
// =====================================

// 1. Navigation - загрузка страницы
const navObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('=== NAVIGATION ===')
    console.log('DNS:', entry.domainLookupEnd - entry.domainLookupStart)
    console.log('TCP:', entry.connectEnd - entry.connectStart)
    console.log('Request:', entry.responseStart - entry.requestStart)
    console.log('Response:', entry.responseEnd - entry.responseStart)
    console.log('DOM Interactive:', entry.domInteractive)
    console.log('DOM Complete:', entry.domComplete)
    console.log('Load Event:', entry.loadEventEnd - entry.loadEventStart)

    // Типы навигации
    const navType = entry.type
    // 'navigate' - обычная загрузка
    // 'reload' - перезагрузка
    // 'back_forward' - навигация вперед/назад
    // 'prerender' - предварительный рендеринг
    console.log('Navigation type:', navType)
  })
})

navObserver.observe({ type: 'navigation', buffered: true })

// 2. Resource - загрузка ресурсов (JS, CSS, images, fonts)
const resourceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('=== RESOURCE ===')
    console.log('URL:', entry.name)
    console.log('Тип:', entry.initiatorType) // script, css, img, fetch, etc
    console.log('Размер:', entry.transferSize, 'bytes')
    console.log('Размер закодированный:', entry.encodedBodySize)
    console.log('Размер декодированный:', entry.decodedBodySize)
    console.log('Длительность:', entry.duration, 'ms')

    // Проверка кэширования
    if (entry.transferSize === 0) {
      console.log('Загружено из кэша')
    }

    // Детальный тайминг
    console.log('DNS Lookup:', entry.domainLookupEnd - entry.domainLookupStart)
    console.log('TCP Connect:', entry.connectEnd - entry.connectStart)
    console.log('Request + Response:', entry.duration)
  })
})

resourceObserver.observe({ type: 'resource', buffered: true })

// 3. Paint - метрики рендеринга
const paintObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('=== PAINT ===')
    console.log('Метрика:', entry.name)
    console.log('Время:', entry.startTime, 'ms')

    if (entry.name === 'first-paint') {
      console.log('First Paint (FP):', entry.startTime)
    }

    if (entry.name === 'first-contentful-paint') {
      console.log('First Contentful Paint (FCP):', entry.startTime)
    }
  })
})

paintObserver.observe({ type: 'paint', buffered: true })

// 4. Largest Contentful Paint (LCP) - Core Web Vital
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const lastEntry = entries[entries.length - 1]

  console.log('=== LCP ===')
  console.log('Время:', lastEntry.startTime)
  console.log('Размер:', lastEntry.size)
  console.log('Элемент:', lastEntry.element)
  console.log('URL:', lastEntry.url)

  // LCP может обновляться несколько раз
  // Берем последнее значение
  if (lastEntry.startTime < 2500) {
    console.log('✅ Отличный LCP!')
  } else if (lastEntry.startTime < 4000) {
    console.log('⚠️ Требует улучшения')
  } else {
    console.log('❌ Плохой LCP')
  }
})

lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

// 5. First Input Delay (FID) - Core Web Vital
const fidObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('=== FID ===')
    console.log('Задержка:', entry.processingStart - entry.startTime, 'ms')
    console.log('Длительность обработки:', entry.duration, 'ms')
    console.log('Тип события:', entry.name)

    const fid = entry.processingStart - entry.startTime

    if (fid < 100) {
      console.log('✅ Отличный FID!')
    } else if (fid < 300) {
      console.log('⚠️ Требует улучшения')
    } else {
      console.log('❌ Плохой FID')
    }
  })
})

fidObserver.observe({ type: 'first-input', buffered: true })

// 6. Layout Shift - CLS (Cumulative Layout Shift)
const clsObserver = new PerformanceObserver((list) => {
  let clsScore = 0

  list.getEntries().forEach(entry => {
    // Только неожиданные сдвиги (без пользовательского взаимодействия)
    if (!entry.hadRecentInput) {
      clsScore += entry.value
      console.log('=== LAYOUT SHIFT ===')
      console.log('Значение:', entry.value)
      console.log('Накопленный CLS:', clsScore)
      console.log('Источники:', entry.sources)
    }
  })

  if (clsScore < 0.1) {
    console.log('✅ Отличный CLS!')
  } else if (clsScore < 0.25) {
    console.log('⚠️ Требует улучшения')
  } else {
    console.log('❌ Плохой CLS')
  }
})

clsObserver.observe({ type: 'layout-shift', buffered: true })

// 7. Long Tasks - долгие задачи (>50ms)
const longTaskObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('=== LONG TASK ===')
    console.log('Длительность:', entry.duration, 'ms')
    console.log('Время начала:', entry.startTime)
    console.log('Attribution:', entry.attribution)

    if (entry.duration > 50) {
      console.warn('⚠️ Задача блокирует главный поток!')
    }
  })
})

longTaskObserver.observe({ type: 'longtask', buffered: true })

// 8. User Timing - кастомные метрики (mark/measure)
const userTimingObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.entryType === 'mark') {
      console.log('=== MARK ===')
      console.log('Имя:', entry.name)
      console.log('Время:', entry.startTime)
    }

    if (entry.entryType === 'measure') {
      console.log('=== MEASURE ===')
      console.log('Имя:', entry.name)
      console.log('Длительность:', entry.duration)
      console.log('От:', entry.startTime)
    }
  })
})

userTimingObserver.observe({ entryTypes: ['mark', 'measure'] })

// Создаем метки и измерения
performance.mark('start-fetch')
await fetch('https://api.example.com/data')
performance.mark('end-fetch')
performance.measure('fetch-duration', 'start-fetch', 'end-fetch')
`

const webVitalsSnippet = `
// =====================================
// CORE WEB VITALS - полный мониторинг
// =====================================

class WebVitalsMonitor {
  constructor() {
    this.metrics = {
      lcp: null,
      fid: null,
      cls: 0,
      fcp: null,
      ttfb: null
    }

    this.observers = []
    this.initObservers()
  }

  initObservers() {
    // 1. Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]

        this.metrics.lcp = {
          value: lastEntry.startTime,
          rating: this.getRating('lcp', lastEntry.startTime),
          element: lastEntry.element,
          url: lastEntry.url
        }

        this.reportMetric('LCP', this.metrics.lcp)
      })

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      this.observers.push(lcpObserver)
    }

    // 2. First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime

        this.metrics.fid = {
          value: fid,
          rating: this.getRating('fid', fid),
          eventType: entry.name
        }

        this.reportMetric('FID', this.metrics.fid)
      })
    })

    fidObserver.observe({ type: 'first-input', buffered: true })
    this.observers.push(fidObserver)

    // 3. Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value

          this.metrics.cls = {
            value: clsValue,
            rating: this.getRating('cls', clsValue),
            sources: entry.sources
          }

          this.reportMetric('CLS', this.metrics.cls)
        }
      })
    })

    clsObserver.observe({ type: 'layout-shift', buffered: true })
    this.observers.push(clsObserver)

    // 4. First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = {
            value: entry.startTime,
            rating: this.getRating('fcp', entry.startTime)
          }

          this.reportMetric('FCP', this.metrics.fcp)
        }
      })
    })

    fcpObserver.observe({ type: 'paint', buffered: true })
    this.observers.push(fcpObserver)

    // 5. Time to First Byte (TTFB)
    const navObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        const ttfb = entry.responseStart - entry.requestStart

        this.metrics.ttfb = {
          value: ttfb,
          rating: this.getRating('ttfb', ttfb)
        }

        this.reportMetric('TTFB', this.metrics.ttfb)
      })
    })

    navObserver.observe({ type: 'navigation', buffered: true })
    this.observers.push(navObserver)
  }

  getRating(metric, value) {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[metric]

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  reportMetric(name, data) {
    console.log(\`\${name}:\`, data)

    // Отправка в аналитику
    this.sendToAnalytics(name, data)
  }

  sendToAnalytics(name, data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: Math.round(data.value),
        metric_rating: data.rating,
        event_category: 'Web Vitals'
      })
    }

    // Собственная аналитика
    if (navigator.sendBeacon) {
      const blob = new Blob(
        [JSON.stringify({ metric: name, ...data })],
        { type: 'application/json' }
      )
      navigator.sendBeacon('/api/metrics', blob)
    }
  }

  getMetrics() {
    return this.metrics
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Использование
const monitor = new WebVitalsMonitor()

// Получение метрик в любой момент
console.log('Current metrics:', monitor.getMetrics())

// Отключение мониторинга
// monitor.disconnect()
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Мониторинг производительности ресурсов
class ResourcePerformanceMonitor {
  constructor() {
    this.slowResources = []
    this.cacheHits = 0
    this.cacheMisses = 0

    this.init()
  }

  init() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        // Проверка медленных ресурсов (>1s)
        if (entry.duration > 1000) {
          this.slowResources.push({
            url: entry.name,
            duration: entry.duration,
            type: entry.initiatorType,
            size: entry.transferSize
          })

          console.warn('Медленный ресурс:', {
            url: entry.name,
            duration: \`\${entry.duration.toFixed(2)}ms\`,
            type: entry.initiatorType
          })
        }

        // Статистика кэширования
        if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
          this.cacheHits++
        } else {
          this.cacheMisses++
        }
      })
    })

    observer.observe({ type: 'resource', buffered: true })
  }

  getReport() {
    const cacheRate = (this.cacheHits / (this.cacheHits + this.cacheMisses)) * 100

    return {
      slowResources: this.slowResources,
      cacheHitRate: \`\${cacheRate.toFixed(2)}%\`,
      totalResources: this.cacheHits + this.cacheMisses
    }
  }
}

// Использование
const resourceMonitor = new ResourcePerformanceMonitor()

// Через некоторое время получаем отчет
setTimeout(() => {
  console.log('Resource Performance Report:', resourceMonitor.getReport())
}, 5000)

// 2. Детектор долгих задач (Long Tasks)
class LongTaskDetector {
  constructor(threshold = 50) {
    this.threshold = threshold
    this.longTasks = []
    this.totalBlockingTime = 0

    this.init()
  }

  init() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        const blockingTime = entry.duration - this.threshold

        if (blockingTime > 0) {
          this.longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime,
            blockingTime: blockingTime,
            attribution: entry.attribution
          })

          this.totalBlockingTime += blockingTime

          console.warn('Long Task detected:', {
            duration: \`\${entry.duration.toFixed(2)}ms\`,
            blocking: \`\${blockingTime.toFixed(2)}ms\`
          })

          // Можно добавить trace для отладки
          if (entry.duration > 200) {
            console.trace('Very long task - investigate!')
          }
        }
      })
    })

    try {
      observer.observe({ type: 'longtask', buffered: true })
    } catch (e) {
      console.warn('Long Tasks API not supported')
    }
  }

  getTBI() {
    // Total Blocking Time
    return this.totalBlockingTime
  }

  getWorstTasks(n = 5) {
    return [...this.longTasks]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, n)
  }
}

// Использование
const taskDetector = new LongTaskDetector()

setTimeout(() => {
  console.log('Total Blocking Time:', taskDetector.getTBI())
  console.log('Top 5 worst tasks:', taskDetector.getWorstTasks())
}, 10000)

// 3. Мониторинг Layout Shift с деталями
class LayoutShiftTracker {
  constructor() {
    this.shifts = []
    this.totalCLS = 0

    this.init()
  }

  init() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          this.totalCLS += entry.value

          const shiftData = {
            value: entry.value,
            time: entry.startTime,
            sources: entry.sources?.map(source => ({
              node: source.node,
              previousRect: source.previousRect,
              currentRect: source.currentRect
            }))
          }

          this.shifts.push(shiftData)

          // Выводим детали сдвига
          console.warn('Layout Shift detected:', {
            value: entry.value.toFixed(4),
            totalCLS: this.totalCLS.toFixed(4),
            affectedElements: entry.sources?.length || 0
          })

          // Подсветка элементов, вызвавших сдвиг (для разработки)
          if (process.env.NODE_ENV === 'development') {
            entry.sources?.forEach(source => {
              if (source.node) {
                source.node.style.outline = '2px solid red'
                setTimeout(() => {
                  source.node.style.outline = ''
                }, 2000)
              }
            })
          }
        }
      })
    })

    observer.observe({ type: 'layout-shift', buffered: true })
  }

  getCLS() {
    return this.totalCLS
  }

  getShiftDetails() {
    return this.shifts
  }
}

// Использование
const shiftTracker = new LayoutShiftTracker()

// 4. Измерение времени выполнения функций
class FunctionTimer {
  static measure(name, fn, ...args) {
    performance.mark(\`\${name}-start\`)

    const result = fn(...args)

    // Поддержка async функций
    if (result instanceof Promise) {
      return result.finally(() => {
        performance.mark(\`\${name}-end\`)
        performance.measure(name, \`\${name}-start\`, \`\${name}-end\`)
      })
    }

    performance.mark(\`\${name}-end\`)
    performance.measure(name, \`\${name}-start\`, \`\${name}-end\`)

    return result
  }

  static observe(callback) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'measure') {
          callback({
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime
          })
        }
      })
    })

    observer.observe({ entryTypes: ['measure'] })

    return observer
  }
}

// Использование
const observer = FunctionTimer.observe((measurement) => {
  console.log(\`Function "\${measurement.name}" took \${measurement.duration.toFixed(2)}ms\`)
})

// Синхронная функция
FunctionTimer.measure('calculateSum', (a, b) => {
  return a + b
}, 5, 10)

// Асинхронная функция
await FunctionTimer.measure('fetchData', async () => {
  const response = await fetch('https://api.example.com/data')
  return await response.json()
})

// 5. React интеграция
import { useEffect, useRef } from 'react'

function usePerformanceObserver(options) {
  const observerRef = useRef(null)

  useEffect(() => {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported')
      return
    }

    observerRef.current = new PerformanceObserver(options.callback)

    try {
      observerRef.current.observe(options.observerOptions)
    } catch (error) {
      console.error('Failed to observe:', error)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return observerRef
}

// Использование в компоненте
function PerformanceMonitor() {
  usePerformanceObserver({
    callback: (list) => {
      list.getEntries().forEach(entry => {
        console.log('Performance entry:', entry)
      })
    },
    observerOptions: {
      entryTypes: ['navigation', 'resource', 'paint']
    }
  })

  return null
}

// 6. Автоматическая отправка метрик
class MetricsReporter {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.queue = []
    this.observers = new Map()

    this.initObservers()
  }

  initObservers() {
    const types = ['navigation', 'resource', 'paint', 'largest-contentful-paint']

    types.forEach(type => {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            this.queue.push({
              type: entry.entryType,
              name: entry.name,
              startTime: entry.startTime,
              duration: entry.duration,
              timestamp: Date.now()
            })
          })

          // Отправляем батчем
          if (this.queue.length >= 10) {
            this.flush()
          }
        })

        observer.observe({ type, buffered: true })
        this.observers.set(type, observer)
      } catch (e) {
        console.warn(\`Type \${type} not supported\`)
      }
    })

    // Отправка при закрытии страницы
    window.addEventListener('beforeunload', () => this.flush())
  }

  flush() {
    if (this.queue.length === 0) return

    const data = JSON.stringify(this.queue)

    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.endpoint, data)
    } else {
      fetch(this.endpoint, {
        method: 'POST',
        body: data,
        keepalive: true
      }).catch(console.error)
    }

    this.queue = []
  }

  disconnect() {
    this.flush()
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }
}

// Использование
const reporter = new MetricsReporter('/api/performance-metrics')
`

const debuggingSnippet = `
// =====================================
// ОТЛАДКА И ДИАГНОСТИКА
// =====================================

// 1. Визуализация метрик в консоли
class PerformanceDebugger {
  constructor() {
    this.metrics = {
      navigation: [],
      resources: [],
      paints: [],
      webVitals: {}
    }

    this.init()
  }

  init() {
    // Все типы метрик
    const allTypes = PerformanceObserver.supportedEntryTypes || []

    allTypes.forEach(type => {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            this.processEntry(entry)
          })
        })

        observer.observe({ type, buffered: true })
      } catch (e) {
        // Игнорируем неподдерживаемые типы
      }
    })
  }

  processEntry(entry) {
    // Группировка по типам
    switch (entry.entryType) {
      case 'navigation':
        this.metrics.navigation.push(entry)
        this.printNavigation(entry)
        break

      case 'resource':
        this.metrics.resources.push(entry)
        if (entry.duration > 500) {
          this.printSlowResource(entry)
        }
        break

      case 'paint':
        this.metrics.paints.push(entry)
        this.printPaint(entry)
        break

      case 'largest-contentful-paint':
        this.metrics.webVitals.lcp = entry
        this.printLCP(entry)
        break

      case 'first-input':
        this.metrics.webVitals.fid = entry
        this.printFID(entry)
        break

      case 'layout-shift':
        if (!entry.hadRecentInput) {
          this.printCLS(entry)
        }
        break
    }
  }

  printNavigation(entry) {
    console.group('📊 Navigation Performance')
    console.table({
      'DNS Lookup': \`\${(entry.domainLookupEnd - entry.domainLookupStart).toFixed(2)}ms\`,
      'TCP Connection': \`\${(entry.connectEnd - entry.connectStart).toFixed(2)}ms\`,
      'Request Time': \`\${(entry.responseStart - entry.requestStart).toFixed(2)}ms\`,
      'Response Time': \`\${(entry.responseEnd - entry.responseStart).toFixed(2)}ms\`,
      'DOM Interactive': \`\${entry.domInteractive.toFixed(2)}ms\`,
      'DOM Complete': \`\${entry.domComplete.toFixed(2)}ms\`,
      'Load Event': \`\${(entry.loadEventEnd - entry.loadEventStart).toFixed(2)}ms\`,
      'Total Load Time': \`\${entry.loadEventEnd.toFixed(2)}ms\`
    })
    console.groupEnd()
  }

  printSlowResource(entry) {
    console.warn('🐌 Slow Resource Detected')
    console.table({
      'URL': entry.name,
      'Type': entry.initiatorType,
      'Duration': \`\${entry.duration.toFixed(2)}ms\`,
      'Size': \`\${(entry.transferSize / 1024).toFixed(2)} KB\`,
      'Cached': entry.transferSize === 0 ? 'Yes' : 'No'
    })
  }

  printPaint(entry) {
    const icon = entry.name === 'first-paint' ? '🎨' : '🖼️'
    console.log(\`\${icon} \${entry.name}: \${entry.startTime.toFixed(2)}ms\`)
  }

  printLCP(entry) {
    const rating = entry.startTime < 2500 ? '✅' : entry.startTime < 4000 ? '⚠️' : '❌'
    console.log(\`\${rating} LCP: \${entry.startTime.toFixed(2)}ms\`)
    if (entry.element) {
      console.log('Element:', entry.element)
    }
  }

  printFID(entry) {
    const fid = entry.processingStart - entry.startTime
    const rating = fid < 100 ? '✅' : fid < 300 ? '⚠️' : '❌'
    console.log(\`\${rating} FID: \${fid.toFixed(2)}ms\`)
  }

  printCLS(entry) {
    const rating = entry.value < 0.1 ? '✅' : entry.value < 0.25 ? '⚠️' : '❌'
    console.log(\`\${rating} CLS: \${entry.value.toFixed(4)}\`)
  }

  getSummary() {
    return {
      totalResources: this.metrics.resources.length,
      slowResources: this.metrics.resources.filter(r => r.duration > 500).length,
      cacheHitRate: this.calculateCacheHitRate(),
      webVitals: this.metrics.webVitals
    }
  }

  calculateCacheHitRate() {
    const cached = this.metrics.resources.filter(r => r.transferSize === 0).length
    const total = this.metrics.resources.length
    return total > 0 ? (cached / total * 100).toFixed(2) + '%' : 'N/A'
  }
}

// Использование
const debugger = new PerformanceDebugger()

// Через некоторое время выводим сводку
setTimeout(() => {
  console.log('Performance Summary:', debugger.getSummary())
}, 10000)

// 2. DevTools интеграция
class PerformanceDevTools {
  static async captureProfile(duration = 5000) {
    console.log('Starting performance capture...')

    const entries = []

    const observer = new PerformanceObserver((list) => {
      entries.push(...list.getEntries())
    })

    // Наблюдаем за всеми поддерживаемыми типами
    const types = PerformanceObserver.supportedEntryTypes
    types.forEach(type => {
      try {
        observer.observe({ type, buffered: true })
      } catch (e) {
        // Игнорируем
      }
    })

    await new Promise(resolve => setTimeout(resolve, duration))

    observer.disconnect()

    console.log(\`Captured \${entries.length} performance entries\`)

    return this.generateReport(entries)
  }

  static generateReport(entries) {
    const report = {
      summary: {
        totalEntries: entries.length,
        byType: {}
      },
      timeline: [],
      recommendations: []
    }

    // Группировка по типам
    entries.forEach(entry => {
      if (!report.summary.byType[entry.entryType]) {
        report.summary.byType[entry.entryType] = 0
      }
      report.summary.byType[entry.entryType]++

      report.timeline.push({
        type: entry.entryType,
        name: entry.name,
        start: entry.startTime,
        duration: entry.duration
      })
    })

    // Анализ и рекомендации
    const slowResources = entries.filter(
      e => e.entryType === 'resource' && e.duration > 1000
    )

    if (slowResources.length > 0) {
      report.recommendations.push({
        issue: 'Slow Resources',
        count: slowResources.length,
        suggestion: 'Optimize or lazy-load large resources'
      })
    }

    return report
  }

  static exportReport(report) {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = \`performance-report-\${Date.now()}.json\`
    a.click()

    URL.revokeObjectURL(url)
  }
}

// Использование
// PerformanceDevTools.captureProfile(10000).then(report => {
//   console.log('Performance Report:', report)
//   PerformanceDevTools.exportReport(report)
// })

// 3. A/B тестирование производительности
class PerformanceABTest {
  constructor(variant) {
    this.variant = variant // 'A' or 'B'
    this.metrics = {}

    this.init()
  }

  init() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        // Сохраняем метрики для варианта
        if (!this.metrics[entry.entryType]) {
          this.metrics[entry.entryType] = []
        }

        this.metrics[entry.entryType].push({
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
          variant: this.variant
        })
      })
    })

    try {
      observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] })
    } catch (e) {
      console.error('Failed to start AB test observer:', e)
    }
  }

  sendResults() {
    // Отправка результатов A/B теста
    fetch('/api/ab-test/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant: this.variant,
        metrics: this.metrics,
        timestamp: Date.now()
      })
    })
  }
}

// Использование
const variant = Math.random() < 0.5 ? 'A' : 'B'
const abTest = new PerformanceABTest(variant)

window.addEventListener('beforeunload', () => {
  abTest.sendResults()
})
`

const highlightedBasics = ref('')
const highlightedEntryTypes = ref('')
const highlightedWebVitals = ref('')
const highlightedPracticalExamples = ref('')
const highlightedDebugging = ref('')

onMounted(() => {
  highlightedBasics.value = Prism.highlight(basicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedEntryTypes.value = Prism.highlight(entryTypesSnippet, Prism.languages.javascript, 'javascript')
  highlightedWebVitals.value = Prism.highlight(webVitalsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedDebugging.value = Prism.highlight(debuggingSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              PerformanceObserver: мониторинг производительности веб-приложений
            </h1>

            <p class="font-weight-regular mb-6">
              <b>PerformanceObserver</b> — это Web API для асинхронного мониторинга метрик производительности.
              Позволяет отслеживать загрузку страницы, ресурсов, Core Web Vitals (LCP, FID, CLS),
              долгие задачи и создавать кастомные метрики. Более эффективен, чем периодический опрос
              <code>performance.getEntries()</code>, так как работает на основе событий.
            </p>

            <!-- Основная концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Основная концепция</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-eye</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Observer Pattern</h3>
                  <p class="text-body-2">
                    Асинхронное наблюдение за метриками производительности через callback
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Performance Entries</h3>
                  <p class="text-body-2">
                    Различные типы метрик: navigation, resource, paint, web vitals и другие
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-chart-timeline-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Real-time Monitoring</h3>
                  <p class="text-body-2">
                    Получение метрик в реальном времени без постоянного опроса
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с PerformanceObserver</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Паттерн:</strong> Создать observer → Определить callback → Подписаться на типы метрик → Обрабатывать данные
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasics"></code></pre>

            <!-- Типы метрик -->
            <h2 class="text-h5 font-weight-bold mb-3">Типы Performance Entries</h2>
            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Основные метрики</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>navigation</code></td>
                <td>Загрузка документа</td>
                <td>DNS, TCP, Request, Response, DOM timing</td>
              </tr>
              <tr>
                <td><code>resource</code></td>
                <td>Загрузка ресурсов</td>
                <td>URL, type, duration, size, cache</td>
              </tr>
              <tr>
                <td><code>paint</code></td>
                <td>Метрики рендеринга</td>
                <td>First Paint (FP), First Contentful Paint (FCP)</td>
              </tr>
              <tr>
                <td><code>largest-contentful-paint</code></td>
                <td>LCP (Core Web Vital)</td>
                <td>Время, размер, элемент</td>
              </tr>
              <tr>
                <td><code>first-input</code></td>
                <td>FID (Core Web Vital)</td>
                <td>Задержка обработки первого взаимодействия</td>
              </tr>
              <tr>
                <td><code>layout-shift</code></td>
                <td>CLS (Core Web Vital)</td>
                <td>Значение сдвига, затронутые элементы</td>
              </tr>
              <tr>
                <td><code>longtask</code></td>
                <td>Долгие задачи (>50ms)</td>
                <td>Длительность, блокировка потока</td>
              </tr>
              <tr>
                <td><code>mark</code></td>
                <td>Пользовательские метки</td>
                <td>performance.mark()</td>
              </tr>
              <tr>
                <td><code>measure</code></td>
                <td>Пользовательские измерения</td>
                <td>performance.measure()</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEntryTypes"></code></pre>

            <!-- Core Web Vitals -->
            <h2 class="text-h5 font-weight-bold mb-3">Core Web Vitals — полный мониторинг</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-timer-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">LCP</h3>
                  </div>
                  <p class="mb-2"><strong>Largest Contentful Paint</strong></p>
                  <ul class="pl-4">
                    <li>✅ Хорошо: < 2.5s</li>
                    <li>⚠️ Требует улучшения: 2.5s - 4s</li>
                    <li>❌ Плохо: > 4s</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-cursor-default-click</v-icon>
                    <h3 class="text-h6 font-weight-bold">FID</h3>
                  </div>
                  <p class="mb-2"><strong>First Input Delay</strong></p>
                  <ul class="pl-4">
                    <li>✅ Хорошо: < 100ms</li>
                    <li>⚠️ Требует улучшения: 100ms - 300ms</li>
                    <li>❌ Плохо: > 300ms</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-arrow-expand-all</v-icon>
                    <h3 class="text-h6 font-weight-bold">CLS</h3>
                  </div>
                  <p class="mb-2"><strong>Cumulative Layout Shift</strong></p>
                  <ul class="pl-4">
                    <li>✅ Хорошо: < 0.1</li>
                    <li>⚠️ Требует улучшения: 0.1 - 0.25</li>
                    <li>❌ Плохо: > 0.25</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWebVitals"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Отладка -->
            <h2 class="text-h5 font-weight-bold mb-3">Отладка и диагностика</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebugging"></code></pre>

            <!-- Поддержка браузерами -->
            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Браузер</th>
                <th class="text-left font-weight-bold">PerformanceObserver</th>
                <th class="text-left font-weight-bold">Web Vitals</th>
                <th class="text-left font-weight-bold">Long Tasks</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Chrome</strong></td>
                <td class="text-success">52+ ✅</td>
                <td class="text-success">77+ ✅</td>
                <td class="text-success">58+ ✅</td>
              </tr>
              <tr>
                <td><strong>Firefox</strong></td>
                <td class="text-success">57+ ✅</td>
                <td class="text-success">122+ ✅</td>
                <td class="text-error">❌</td>
              </tr>
              <tr>
                <td><strong>Safari</strong></td>
                <td class="text-success">11+ ✅</td>
                <td class="text-warning">Частично ⚠️</td>
                <td class="text-error">❌</td>
              </tr>
              <tr>
                <td><strong>Edge</strong></td>
                <td class="text-success">79+ ✅</td>
                <td class="text-success">79+ ✅</td>
                <td class="text-success">79+ ✅</td>
              </tr>
              <tr>
                <td><strong>Node.js</strong></td>
                <td class="text-success">16+ ✅</td>
                <td class="text-error">❌</td>
                <td class="text-error">❌</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое PerformanceObserver и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  PerformanceObserver — это API для асинхронного мониторинга метрик производительности.
                  Работает по принципу observer pattern — подписывается на типы метрик и вызывает callback
                  при появлении новых данных. Более эффективен, чем polling через <code>performance.getEntries()</code>,
                  так как не блокирует главный поток и не требует постоянных проверок.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие основные типы метрик можно отслеживать?</p>
                <p class="font-weight-regular ma-0">
                  Основные: <code>navigation</code> (загрузка страницы), <code>resource</code> (загрузка ресурсов),
                  <code>paint</code> (FP, FCP), <code>largest-contentful-paint</code> (LCP),
                  <code>first-input</code> (FID), <code>layout-shift</code> (CLS), <code>longtask</code>,
                  <code>mark</code>/<code>measure</code> (кастомные метрики). Полный список зависит от браузера
                  и доступен через <code>PerformanceObserver.supportedEntryTypes</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Core Web Vitals и как их измерить?</p>
                <p class="font-weight-regular ma-0">
                  Core Web Vitals — три ключевые метрики пользовательского опыта от Google:
                  <b>LCP</b> (скорость загрузки контента), <b>FID</b> (интерактивность),
                  <b>CLS</b> (визуальная стабильность). Измеряются через PerformanceObserver с типами
                  'largest-contentful-paint', 'first-input', 'layout-shift'. Влияют на SEO и ранжирование в поиске.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между entryTypes и type в observe()?</p>
                <p class="font-weight-regular ma-0">
                  <code>entryTypes: ['type1', 'type2']</code> — подписка на несколько типов одновременно (старый API).
                  <code>type: 'type1'</code> — подписка на один тип с возможностью использовать опцию
                  <code>buffered: true</code> для получения накопленных метрик до подписки. Рекомендуется
                  использовать <code>type</code> для каждого типа отдельно с buffered.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое buffered: true и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  <code>buffered: true</code> позволяет получить метрики, которые были записаны до создания observer.
                  Полезно для получения FCP, LCP и других ранних метрик, если observer создается после загрузки.
                  Работает только с опцией <code>type</code>, не с <code>entryTypes</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отследить медленные ресурсы на странице?</p>
                <p class="font-weight-regular ma-0">
                  Создать PerformanceObserver для типа 'resource', фильтровать entries по <code>duration > threshold</code>
                  (например, >1000ms). Анализировать <code>initiatorType</code> (script, css, img),
                  <code>transferSize</code> (размер) и <code>transferSize === 0</code> (загружено из кэша).
                  Можно отправлять данные в аналитику для мониторинга.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Long Tasks и как их детектировать?</p>
                <p class="font-weight-regular ma-0">
                  Long Tasks — задачи JavaScript, выполняющиеся дольше 50ms и блокирующие главный поток.
                  Детектируются через <code>observe({ type: 'longtask' })</code>. Поддерживаются в Chrome/Edge.
                  Важны для оптимизации интерактивности. Total Blocking Time (TBT) = сумма времени
                  блокировки всех long tasks.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как интегрировать PerformanceObserver в React?</p>
                <p class="font-weight-regular ma-0">
                  Создать кастомный хук <code>usePerformanceObserver</code>, который создает observer в <code>useEffect</code>
                  и отписывается в cleanup функции. Использовать <code>useRef</code> для хранения observer.
                  Передавать callback и настройки через параметры хука. Проверять поддержку API перед созданием.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отправлять метрики в аналитику?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>navigator.sendBeacon()</code> для надежной отправки при закрытии страницы,
                  или <code>fetch()</code> с <code>keepalive: true</code>. Собирать метрики в батчи для
                  уменьшения количества запросов. Отправлять при <code>beforeunload</code> или по достижении
                  порога количества метрик. Для Google Analytics использовать <code>gtag('event')</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли PerformanceObserver на производительность?</p>
                <p class="font-weight-regular ma-0">
                  Минимально. PerformanceObserver работает асинхронно и не блокирует главный поток.
                  Callback вызывается когда браузер готов, обычно в idle time. Однако тяжелые вычисления
                  в callback могут повлиять на производительность. Рекомендуется делать callback легкими
                  или использовать <code>requestIdleCallback</code> для обработки данных.
                </p>
              </li>
            </ol>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов к мониторингу</h2>
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
                <td><strong>PerformanceObserver</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Асинхронный, не блокирует</li>
                    <li>Event-driven подход</li>
                    <li>Buffered entries</li>
                    <li>Низкое влияние на производительность</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Разная поддержка в браузерах</li>
                    <li>Сложнее в использовании</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>performance.getEntries()</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Простой API</li>
                    <li>Синхронный доступ</li>
                    <li>Хорошая поддержка</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Требует polling</li>
                    <li>Блокирует главный поток</li>
                    <li>Пропуск событий</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>web-vitals library</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Готовое решение</li>
                    <li>Полифиллы</li>
                    <li>Best practices</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Дополнительная зависимость</li>
                    <li>Только Web Vitals</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>RUM (Real User Monitoring)</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Полная картина</li>
                    <li>Автоматическая аналитика</li>
                    <li>Dashboard из коробки</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Стоимость сервиса</li>
                    <li>Внешняя зависимость</li>
                    <li>Privacy concerns</li>
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
                    <li>Использовать buffered: true</li>
                    <li>Отписываться через disconnect()</li>
                    <li>Проверять поддержку типов</li>
                    <li>Отправлять метрики батчами</li>
                    <li>Использовать sendBeacon()</li>
                    <li>Мониторить Core Web Vitals</li>
                    <li>Легкие callbacks</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Тяжелых вычислений в callback</li>
                    <li>Синхронных запросов в callback</li>
                    <li>Забывать disconnect()</li>
                    <li>Игнорировать проверку поддержки</li>
                    <li>Отправлять каждую метрику отдельно</li>
                    <li>Блокировать главный поток</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте web-vitals library</li>
                    <li>Визуализируйте метрики в DevTools</li>
                    <li>A/B тестирование производительности</li>
                    <li>Мониторинг в production</li>
                    <li>Алерты на критичные метрики</li>
                    <li>Документируйте пороговые значения</li>
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
                    <li>Мониторинг Core Web Vitals</li>
                    <li>Отслеживание медленных ресурсов</li>
                    <li>Детекция долгих задач</li>
                    <li>Измерение custom метрик</li>
                    <li>Real User Monitoring (RUM)</li>
                    <li>A/B тесты производительности</li>
                    <li>Отладка проблем с производительностью</li>
                    <li>Автоматическая отправка в аналитику</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Интеграция с</h3>
                  <ul class="pl-4">
                    <li><strong>Google Analytics:</strong> gtag('event')</li>
                    <li><strong>Sentry:</strong> Performance monitoring</li>
                    <li><strong>New Relic:</strong> Browser monitoring</li>
                    <li><strong>DataDog:</strong> RUM</li>
                    <li><strong>Lighthouse CI:</strong> Автоматизация</li>
                    <li><strong>web-vitals:</strong> Готовая библиотека</li>
                    <li><strong>React/Vue:</strong> Кастомные хуки</li>
                    <li><strong>Node.js:</strong> Performance hooks</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>PerformanceObserver</b> — это мощный инструмент для асинхронного мониторинга производительности
              веб-приложений. Позволяет отслеживать различные метрики: загрузку страницы и ресурсов, Core Web Vitals
              (LCP, FID, CLS), долгие задачи и создавать кастомные метрики. Работает по принципу observer pattern,
              что делает его более эффективным, чем периодический polling. Критически важен для мониторинга
              пользовательского опыта в production, оптимизации производительности и улучшения SEO.
              Поддерживается всеми современными браузерами с некоторыми различиями в доступных типах метрик.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver"
                target="_blank"
                class="mr-2">
                MDN PerformanceObserver
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/vitals/"
                target="_blank"
                class="mr-2">
                Web Vitals Guide
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://github.com/GoogleChrome/web-vitals"
                target="_blank">
                web-vitals Library
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
