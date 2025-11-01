<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicsSnippet = `
// =====================================
// RESIZEOBSERVER - Основы
// =====================================

// ResizeObserver отслеживает изменения размеров элементов
// В отличие от window.resize, работает с конкретными элементами

// 1. Создание базового observer
const resizeObserver = new ResizeObserver((entries) => {
  // entries - массив наблюдаемых элементов
  for (const entry of entries) {
    console.log('Element:', entry.target)
    console.log('New size:', entry.contentRect.width, 'x', entry.contentRect.height)
  }
})

// 2. Начало наблюдения за элементом
const box = document.querySelector('.box')
resizeObserver.observe(box)

// 3. Прекращение наблюдения
resizeObserver.unobserve(box)

// 4. Прекращение наблюдения за всеми элементами
resizeObserver.disconnect()

// 5. ResizeObserverEntry содержит подробную информацию
const resizeObserver2 = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // target - сам элемент
    console.log('Target:', entry.target)

    // contentRect - размеры контента (без padding/border)
    console.log('Content:', entry.contentRect)

    // contentBoxSize - размеры content-box
    console.log('Content Box:', entry.contentBoxSize)

    // borderBoxSize - размеры border-box
    console.log('Border Box:', entry.borderBoxSize)

    // devicePixelContentBoxSize - размеры в device pixels
    console.log('Device Pixels:', entry.devicePixelContentBoxSize)
  }
})
`

const multipleElementsSnippet = `
// =====================================
// ОТСЛЕЖИВАНИЕ НЕСКОЛЬКИХ ЭЛЕМЕНТОВ
// =====================================

// 1. Один observer для нескольких элементов
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const element = entry.target
    const width = entry.contentRect.width
    const height = entry.contentRect.height

    console.log(\`Element \${element.id}: \${width}x\${height}\`)

    // Разная логика для разных элементов
    if (element.classList.contains('sidebar')) {
      handleSidebarResize(width, height)
    } else if (element.classList.contains('main-content')) {
      handleMainContentResize(width, height)
    }
  })
})

// Наблюдение за несколькими элементами
const sidebar = document.querySelector('.sidebar')
const mainContent = document.querySelector('.main-content')
const footer = document.querySelector('.footer')

observer.observe(sidebar)
observer.observe(mainContent)
observer.observe(footer)

// 2. Map для хранения callback'ов для каждого элемента
const elementCallbacks = new Map()

const multiElementObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const callback = elementCallbacks.get(entry.target)
    if (callback) {
      callback(entry)
    }
  })
})

// Регистрация элементов с индивидуальными callback
function observeElement(element, callback) {
  elementCallbacks.set(element, callback)
  multiElementObserver.observe(element)
}

// Использование
observeElement(sidebar, (entry) => {
  console.log('Sidebar resized:', entry.contentRect.width)
})

observeElement(mainContent, (entry) => {
  console.log('Main content resized:', entry.contentRect.height)
})

// 3. Класс для управления наблюдением
class ElementResizeManager {
  constructor() {
    this.observer = new ResizeObserver(this.handleResize.bind(this))
    this.elements = new Map()
  }

  observe(element, callback, options = {}) {
    this.elements.set(element, { callback, options })
    this.observer.observe(element, options)
  }

  unobserve(element) {
    this.elements.delete(element)
    this.observer.unobserve(element)
  }

  handleResize(entries) {
    entries.forEach(entry => {
      const data = this.elements.get(entry.target)
      if (data && data.callback) {
        data.callback(entry, data.options)
      }
    })
  }

  disconnect() {
    this.observer.disconnect()
    this.elements.clear()
  }
}

// Использование класса
const resizeManager = new ElementResizeManager()

resizeManager.observe(sidebar, (entry) => {
  console.log('Sidebar:', entry.contentRect.width)
})

resizeManager.observe(mainContent, (entry) => {
  console.log('Main:', entry.contentRect.height)
}, { box: 'border-box' })
`

const boxModelsSnippet = `
// =====================================
// BOX MODELS - разные режимы измерения
// =====================================

// ResizeObserver поддерживает 3 режима: content-box, border-box, device-pixel-content-box

const element = document.querySelector('.box')

// 1. content-box (по умолчанию) - размер контента без padding
const contentBoxObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // Размеры через contentRect
    console.log('ContentRect:', entry.contentRect.width)

    // Размеры через contentBoxSize (массив)
    if (entry.contentBoxSize) {
      // Поддержка старых и новых браузеров
      const size = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize

      console.log('Content Box Size:')
      console.log('  Width:', size.inlineSize)
      console.log('  Height:', size.blockSize)
    }
  }
})

contentBoxObserver.observe(element, { box: 'content-box' })

// 2. border-box - размер с padding и border
const borderBoxObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.borderBoxSize) {
      const size = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize

      console.log('Border Box Size:')
      console.log('  Width:', size.inlineSize)
      console.log('  Height:', size.blockSize)
    }
  }
})

borderBoxObserver.observe(element, { box: 'border-box' })

// 3. device-pixel-content-box - размеры в device pixels (для canvas, retina)
const devicePixelObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.devicePixelContentBoxSize) {
      const size = Array.isArray(entry.devicePixelContentBoxSize)
        ? entry.devicePixelContentBoxSize[0]
        : entry.devicePixelContentBoxSize

      console.log('Device Pixel Box Size:')
      console.log('  Width:', size.inlineSize)
      console.log('  Height:', size.blockSize)

      // Полезно для canvas с учетом devicePixelRatio
      const canvas = entry.target
      canvas.width = size.inlineSize
      canvas.height = size.blockSize
    }
  }
})

devicePixelObserver.observe(element, { box: 'device-pixel-content-box' })

// 4. Универсальная функция получения размеров
function getElementSize(entry, boxType = 'content-box') {
  let sizeArray

  switch (boxType) {
    case 'border-box':
      sizeArray = entry.borderBoxSize
      break
    case 'device-pixel-content-box':
      sizeArray = entry.devicePixelContentBoxSize
      break
    case 'content-box':
    default:
      sizeArray = entry.contentBoxSize
      break
  }

  // Поддержка разных форматов
  const size = Array.isArray(sizeArray) ? sizeArray[0] : sizeArray

  return {
    width: size.inlineSize,
    height: size.blockSize
  }
}
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Адаптивный размер шрифта
const responsiveText = document.querySelector('.responsive-text')

const textObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width

    // Адаптивный размер шрифта в зависимости от ширины
    let fontSize
    if (width < 300) {
      fontSize = '14px'
    } else if (width < 600) {
      fontSize = '16px'
    } else {
      fontSize = '20px'
    }

    entry.target.style.fontSize = fontSize
  }
})

textObserver.observe(responsiveText)

// 2. Адаптивная сетка с auto-layout
const grid = document.querySelector('.adaptive-grid')

const gridObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width

    // Вычисляем количество колонок
    const minColumnWidth = 200
    const columns = Math.max(1, Math.floor(width / minColumnWidth))

    entry.target.style.gridTemplateColumns = \`repeat(\${columns}, 1fr)\`
  }
})

gridObserver.observe(grid)

// 3. Canvas с правильным разрешением для Retina
const canvas = document.querySelector('canvas')

const canvasObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const devicePixelRatio = window.devicePixelRatio || 1

    // Используем device-pixel-content-box если доступен
    let width, height

    if (entry.devicePixelContentBoxSize) {
      const size = Array.isArray(entry.devicePixelContentBoxSize)
        ? entry.devicePixelContentBoxSize[0]
        : entry.devicePixelContentBoxSize

      width = size.inlineSize
      height = size.blockSize
    } else {
      // Fallback для старых браузеров
      width = entry.contentRect.width * devicePixelRatio
      height = entry.contentRect.height * devicePixelRatio
    }

    canvas.width = width
    canvas.height = height

    // CSS размеры остаются в CSS pixels
    canvas.style.width = entry.contentRect.width + 'px'
    canvas.style.height = entry.contentRect.height + 'px'

    // Перерисовка canvas
    redrawCanvas()
  }
})

canvasObserver.observe(canvas, { box: 'device-pixel-content-box' })

// 4. Debounce для производительности
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const expensiveOperation = debounce((entry) => {
  console.log('Expensive resize handler:', entry.contentRect.width)
  // Тяжелые вычисления...
}, 250)

const debouncedObserver = new ResizeObserver((entries) => {
  entries.forEach(expensiveOperation)
})

// 5. Tooltip позиционирование при resize
const tooltipTarget = document.querySelector('.tooltip-target')
const tooltip = document.querySelector('.tooltip')

const tooltipObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const rect = entry.target.getBoundingClientRect()

    // Позиционируем tooltip
    tooltip.style.left = rect.left + 'px'
    tooltip.style.top = (rect.bottom + 10) + 'px'

    // Проверяем, помещается ли tooltip
    const tooltipRect = tooltip.getBoundingClientRect()
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px'
    }
  }
})

tooltipObserver.observe(tooltipTarget)

// 6. Виртуализация списка с динамической высотой
class VirtualList {
  constructor(container, items) {
    this.container = container
    this.items = items
    this.itemHeights = new Map()
    this.observer = new ResizeObserver(this.handleResize.bind(this))
  }

  renderItem(item, index) {
    const element = document.createElement('div')
    element.className = 'list-item'
    element.textContent = item
    element.dataset.index = index

    // Наблюдаем за каждым элементом
    this.observer.observe(element)

    return element
  }

  handleResize(entries) {
    entries.forEach(entry => {
      const index = parseInt(entry.target.dataset.index)
      const height = entry.contentRect.height

      this.itemHeights.set(index, height)

      // Пересчитываем виртуальный скролл
      this.updateVirtualScroll()
    })
  }

  updateVirtualScroll() {
    // Логика виртуального скролла с учетом реальных высот
    console.log('Updated virtual scroll with real heights')
  }

  destroy() {
    this.observer.disconnect()
  }
}

// 7. Адаптивные media query на уровне компонента
const component = document.querySelector('.component')

const componentObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width

    // Применяем разные классы в зависимости от ширины компонента
    entry.target.classList.remove('small', 'medium', 'large')

    if (width < 400) {
      entry.target.classList.add('small')
    } else if (width < 800) {
      entry.target.classList.add('medium')
    } else {
      entry.target.classList.add('large')
    }
  }
})

componentObserver.observe(component)
`

const performanceSnippet = `
// =====================================
// ПРОИЗВОДИТЕЛЬНОСТЬ И ОПТИМИЗАЦИЯ
// =====================================

// 1. Throttling для частых изменений
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const throttledHandler = throttle((entry) => {
  console.log('Throttled resize:', entry.contentRect.width)
}, 100)

const throttledObserver = new ResizeObserver((entries) => {
  entries.forEach(throttledHandler)
})

// 2. requestAnimationFrame для плавности
let rafId = null

const rafObserver = new ResizeObserver((entries) => {
  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  rafId = requestAnimationFrame(() => {
    entries.forEach(entry => {
      console.log('RAF resize:', entry.contentRect.width)
      // Обновление DOM
    })
    rafId = null
  })
})

// 3. Батчинг обновлений
class BatchedResizeObserver {
  constructor(callback, delay = 16) {
    this.callback = callback
    this.delay = delay
    this.pending = new Map()
    this.timeoutId = null

    this.observer = new ResizeObserver(this.handleResize.bind(this))
  }

  observe(element) {
    this.observer.observe(element)
  }

  handleResize(entries) {
    // Собираем все изменения
    entries.forEach(entry => {
      this.pending.set(entry.target, entry)
    })

    // Откладываем обработку
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      // Обрабатываем все накопленные изменения
      const batchedEntries = Array.from(this.pending.values())
      this.callback(batchedEntries)
      this.pending.clear()
    }, this.delay)
  }
}

// Использование
const batchedObserver = new BatchedResizeObserver((entries) => {
  console.log('Batched resize for', entries.length, 'elements')
  // Единовременная обработка всех изменений
})

// 4. Условное наблюдение (только когда нужно)
class ConditionalResizeObserver {
  constructor(callback) {
    this.callback = callback
    this.observer = null
    this.elements = new Set()
    this.isActive = false
  }

  observe(element) {
    this.elements.add(element)
    if (this.isActive && this.observer) {
      this.observer.observe(element)
    }
  }

  start() {
    if (!this.observer) {
      this.observer = new ResizeObserver(this.callback)
    }

    this.isActive = true
    this.elements.forEach(el => this.observer.observe(el))
  }

  stop() {
    this.isActive = false
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

// Использование: активируем только когда sidebar открыт
const conditionalObserver = new ConditionalResizeObserver((entries) => {
  console.log('Conditional resize')
})

document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
  if (e.target.checked) {
    conditionalObserver.start()
  } else {
    conditionalObserver.stop()
  }
})

// 5. Мониторинг производительности
class PerformanceMonitoringObserver {
  constructor(callback) {
    this.callback = callback
    this.metrics = {
      totalCalls: 0,
      totalTime: 0,
      maxTime: 0,
      avgTime: 0
    }

    this.observer = new ResizeObserver(this.handleResize.bind(this))
  }

  observe(element) {
    this.observer.observe(element)
  }

  handleResize(entries) {
    const startTime = performance.now()

    this.callback(entries)

    const duration = performance.now() - startTime

    // Обновляем метрики
    this.metrics.totalCalls++
    this.metrics.totalTime += duration
    this.metrics.maxTime = Math.max(this.metrics.maxTime, duration)
    this.metrics.avgTime = this.metrics.totalTime / this.metrics.totalCalls

    // Предупреждение о медленных обработчиках
    if (duration > 16) {
      console.warn(\`Slow ResizeObserver callback: \${duration.toFixed(2)}ms\`)
    }
  }

  getMetrics() {
    return { ...this.metrics }
  }
}

// 6. Отложенная инициализация (lazy initialization)
class LazyResizeObserver {
  constructor(callback) {
    this.callback = callback
    this.observer = null
    this.pendingElements = []
  }

  observe(element) {
    if (!this.observer) {
      this.pendingElements.push(element)

      // Инициализируем при первом использовании
      requestIdleCallback(() => {
        this.init()
      })
    } else {
      this.observer.observe(element)
    }
  }

  init() {
    this.observer = new ResizeObserver(this.callback)

    // Наблюдаем за отложенными элементами
    this.pendingElements.forEach(el => {
      this.observer.observe(el)
    })

    this.pendingElements = []
  }
}
`

const reactExampleSnippet = `
// =====================================
// ИНТЕГРАЦИЯ С REACT
// =====================================

import { useEffect, useRef, useState } from 'react'

// 1. Хук useResizeObserver
function useResizeObserver(callback, options = {}) {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new ResizeObserver(callback)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback])

  const observe = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element, options)
    }
  }

  const unobserve = (element) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }

  return { observe, unobserve }
}

// Использование
function MyComponent() {
  const divRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const { observe } = useResizeObserver((entries) => {
    for (const entry of entries) {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      })
    }
  })

  useEffect(() => {
    if (divRef.current) {
      observe(divRef.current)
    }
  }, [observe])

  return (
    <div ref={divRef}>
      Size: {size.width} x {size.height}
    </div>
  )
}

// 2. Хук с ref
function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return [elementRef, size]
}

// Использование
function ResponsiveComponent() {
  const [ref, size] = useElementSize()

  return (
    <div ref={ref}>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </div>
  )
}

// 3. Хук для нескольких элементов
function useMultipleResizeObserver() {
  const [sizes, setSizes] = useState(new Map())
  const observerRef = useRef(null)
  const elementsRef = useRef(new Map())

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const newSizes = new Map(sizes)

      entries.forEach(entry => {
        newSizes.set(entry.target, {
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      })

      setSizes(newSizes)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const observe = (element, key) => {
    if (element && observerRef.current) {
      elementsRef.current.set(key, element)
      observerRef.current.observe(element)
    }
  }

  const getSize = (key) => {
    const element = elementsRef.current.get(key)
    return sizes.get(element) || { width: 0, height: 0 }
  }

  return { observe, getSize }
}

// 4. Компонент с адаптивным поведением
function AdaptiveCard() {
  const [layout, setLayout] = useState('large')
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width

      if (width < 300) {
        setLayout('small')
      } else if (width < 600) {
        setLayout('medium')
      } else {
        setLayout('large')
      }
    })

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={cardRef} className={\`card card--\${layout}\`}>
      <h2>Adaptive Card</h2>
      <p>Layout: {layout}</p>
    </div>
  )
}
`

const vueExampleSnippet = `
// =====================================
// ИНТЕГРАЦИЯ С VUE
// =====================================

import { ref, onMounted, onUnmounted, watch } from 'vue'

// 1. Composable useResizeObserver
export function useResizeObserver(callback, options = {}) {
  const observer = ref(null)

  const observe = (element) => {
    if (!element) return

    if (!observer.value) {
      observer.value = new ResizeObserver(callback)
    }

    observer.value.observe(element, options)
  }

  const unobserve = (element) => {
    if (element && observer.value) {
      observer.value.unobserve(element)
    }
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return { observe, unobserve, disconnect }
}

// Использование в компоненте
// <script setup>
const boxRef = ref(null)
const size = ref({ width: 0, height: 0 })

const { observe } = useResizeObserver((entries) => {
  for (const entry of entries) {
    size.value = {
      width: entry.contentRect.width,
      height: entry.contentRect.height
    }
  }
})

onMounted(() => {
  if (boxRef.value) {
    observe(boxRef.value)
  }
})
// <\/script>

// <template>
  //   <div ref="boxRef">
  //     Size: {{ size.width }} x {{ size.height }}
  //   </div>
  // </template>

// 2. Composable для размеров элемента
export function useElementSize(elementRef, options = {}) {
const width = ref(0)
const height = ref(0)
const observer = ref(null)

onMounted(() => {
if (!elementRef.value) return

observer.value = new ResizeObserver((entries) => {
const entry = entries[0]
if (entry) {
width.value = entry.contentRect.width
height.value = entry.contentRect.height
}
})

observer.value.observe(elementRef.value, options)
})

onUnmounted(() => {
observer.value?.disconnect()
})

return { width, height }
}

// Использование
// <script setup>
const containerRef = ref(null)
const { width, height } = useElementSize(containerRef)

const isSmall = computed(() => width.value < 400)
const isMedium = computed(() => width.value >= 400 && width.value < 800)
const isLarge = computed(() => width.value >= 800)
// <\/script>

// 3. Директива v-resize
export const vResize = {
mounted(el, binding) {
const callback = binding.value

if (typeof callback !== 'function') {
console.warn('v-resize expects a function')
return
}

el._resizeObserver = new ResizeObserver((entries) => {
callback(entries[0])
})

el._resizeObserver.observe(el, binding.modifiers)
},

unmounted(el) {
el._resizeObserver?.disconnect()
delete el._resizeObserver
}
}

// Использование директивы
// <template>
  //   <div v-resize="handleResize">
  //     Content
  //   </div>
  // </template>

// <script setup>
function handleResize(entry) {
  console.log('Resized:', entry.contentRect.width)
}
// <\/script>

// 4. Адаптивный компонент
// <script setup>
const cardRef = ref(null)
const layout = ref('large')

const { observe } = useResizeObserver((entries) => {
  const width = entries[0].contentRect.width

  if (width < 300) {
    layout.value = 'small'
  } else if (width < 600) {
    layout.value = 'medium'
  } else {
    layout.value = 'large'
  }
})

onMounted(() => {
  if (cardRef.value) {
    observe(cardRef.value)
  }
})
// <\/script>

// <template>
  //   <div ref="cardRef" :class="['card', \`card--\${layout}\`]">
  //     <h2>Adaptive Card</h2>
  //     <p>Layout: {{ layout }}</p>
  //   </div>
  // </template>
`

const comparisonSnippet = `
// =====================================
// СРАВНЕНИЕ С ДРУГИМИ ПОДХОДАМИ
// =====================================

// 1. ResizeObserver vs window.resize
// ❌ window.resize - только размер окна
window.addEventListener('resize', () => {
const width = element.offsetWidth
console.log('Window resized, element width:', width)
})

// ✅ ResizeObserver - размер конкретного элемента
const resizeObserver = new ResizeObserver((entries) => {
const width = entries[0].contentRect.width
console.log('Element resized:', width)
})
resizeObserver.observe(element)

// 2. ResizeObserver vs MutationObserver
// MutationObserver НЕ отслеживает изменения размеров
const mutationObserver = new MutationObserver((mutations) => {
// Не сработает при изменении размера!
console.log('DOM changed, but size?')
})

mutationObserver.observe(element, {
attributes: true,
childList: true,
subtree: true
})

// 3. ResizeObserver vs polling
// ❌ Polling - неэффективно
setInterval(() => {
const newWidth = element.offsetWidth
if (newWidth !== lastWidth) {
console.log('Size changed via polling')
lastWidth = newWidth
}
}, 100) // Каждые 100ms!

// ✅ ResizeObserver - эффективно, срабатывает только при изменении
const efficientObserver = new ResizeObserver((entries) => {
console.log('Size actually changed!')
})

// 4. ResizeObserver vs matchMedia (для viewport)
// matchMedia - только для viewport размеров
const mediaQuery = window.matchMedia('(min-width: 768px)')

mediaQuery.addEventListener('change', (e) => {
if (e.matches) {
console.log('Viewport >= 768px')
}
})

// ResizeObserver - для элементов (Container Queries в CSS)
const containerObserver = new ResizeObserver((entries) => {
const width = entries[0].contentRect.width
if (width >= 768) {
console.log('Element >= 768px')
}
})

// 5. Производительность: ResizeObserver vs getBoundingClientRect
// ❌ Постоянный getBoundingClientRect вызывает reflow
function checkSize() {
const rect = element.getBoundingClientRect() // Reflow!
console.log('Size:', rect.width, rect.height)
requestAnimationFrame(checkSize)
}

// ✅ ResizeObserver оптимизирован браузером
const optimizedObserver = new ResizeObserver((entries) => {
// Батчится браузером, без лишних reflow
console.log('Size:', entries[0].contentRect.width)
})
`

const highlightedBasics = ref('')
const highlightedMultipleElements = ref('')
const highlightedBoxModels = ref('')
const highlightedPracticalExamples = ref('')
const highlightedPerformance = ref('')
const highlightedReactExample = ref('')
const highlightedVueExample = ref('')
const highlightedComparison = ref('')

onMounted(() => {
highlightedBasics.value = Prism.highlight(basicsSnippet, Prism.languages.javascript, 'javascript')
highlightedMultipleElements.value = Prism.highlight(multipleElementsSnippet, Prism.languages.javascript, 'javascript')
highlightedBoxModels.value = Prism.highlight(boxModelsSnippet, Prism.languages.javascript, 'javascript')
highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
highlightedReactExample.value = Prism.highlight(reactExampleSnippet, Prism.languages.javascript, 'javascript')
highlightedVueExample.value = Prism.highlight(vueExampleSnippet, Prism.languages.javascript, 'javascript')
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
              ResizeObserver API в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>ResizeObserver</b> — современный Web API для отслеживания изменений размеров DOM элементов.
              В отличие от <code>window.resize</code>, который отслеживает только размер окна браузера,
              ResizeObserver позволяет следить за изменениями размеров конкретных элементов, включая
              изменения из-за CSS, добавления контента, или изменения размеров родительских контейнеров.
            </p>

            <!-- Основные преимущества -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые преимущества ResizeObserver</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Что ResizeObserver может</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Отслеживать размеры конкретных элементов</li>
                    <li>Реагировать на CSS изменения (transitions, animations)</li>
                    <li>Работать с динамическим контентом</li>
                    <li>Наблюдать за несколькими элементами одновременно</li>
                    <li>Эффективная батчинг-обработка изменений</li>
                    <li>Поддержка разных box models</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-information</v-icon>
                    <h3 class="text-h6 font-weight-bold">Чем отличается от window.resize</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>window.resize</strong> — только размер окна</li>
                    <li><strong>ResizeObserver</strong> — размер элементов</li>
                    <li>Не требует перерасчета getBoundingClientRect</li>
                    <li>Автоматический debounce браузером</li>
                    <li>Работает с элементами внутри скролла</li>
                    <li>Container Queries альтернатива в JS</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с ResizeObserver</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>ResizeObserverEntry</strong> содержит детальную информацию: <code>target</code> (элемент),
              <code>contentRect</code> (размеры), <code>borderBoxSize</code>, <code>contentBoxSize</code>,
              <code>devicePixelContentBoxSize</code>
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasics"></code></pre>

            <!-- Несколько элементов -->
            <h2 class="text-h5 font-weight-bold mb-3">Отслеживание нескольких элементов</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Эффективность:</strong> Один ResizeObserver может наблюдать за множеством элементов.
              Браузер оптимизирует вызовы callback'а, батчируя изменения.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleElements"></code></pre>

            <!-- Box Models -->
            <h2 class="text-h5 font-weight-bold mb-3">Box Models — режимы измерения</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-border-inside</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">content-box</h3>
                  <p class="text-body-2">Размер контента без padding и border (по умолчанию)</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-border-outside</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">border-box</h3>
                  <p class="text-body-2">Размер включая padding и border</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-monitor-screenshot</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">device-pixel-content-box</h3>
                  <p class="text-body-2">Размер в device pixels (для Retina, canvas)</p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBoxModels"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> ResizeObserver callback может вызываться очень часто.
              Используйте debounce, throttle или requestAnimationFrame для тяжелых операций.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <!-- React интеграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Интеграция с React</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactExample"></code></pre>

            <!-- Vue интеграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Интеграция с Vue</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVueExample"></code></pre>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение с другими подходами</h2>
            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Что отслеживает</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>window.resize</code></td>
                <td>Только размер окна</td>
                <td class="text-warning">Средняя</td>
                <td>Адаптивность на уровне viewport</td>
              </tr>
              <tr>
                <td><code>ResizeObserver</code></td>
                <td>Размер конкретных элементов</td>
                <td class="text-success">Отличная</td>
                <td>Container queries, компоненты</td>
              </tr>
              <tr>
                <td><code>MutationObserver</code></td>
                <td>Изменения DOM структуры</td>
                <td class="text-success">Хорошая</td>
                <td>Добавление/удаление элементов</td>
              </tr>
              <tr>
                <td><code>IntersectionObserver</code></td>
                <td>Видимость элементов</td>
                <td class="text-success">Отличная</td>
                <td>Lazy loading, infinite scroll</td>
              </tr>
              <tr>
                <td>Polling (setInterval)</td>
                <td>Что угодно</td>
                <td class="text-error">Плохая</td>
                <td>❌ Не рекомендуется</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <!-- Поддержка браузеров -->
            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузеров</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Поддерживается</h3>
                  <ul class="pl-4">
                    <li>Chrome 64+ (2018)</li>
                    <li>Firefox 69+ (2019)</li>
                    <li>Safari 13.1+ (2020)</li>
                    <li>Edge 79+ (2020)</li>
                    <li>Opera 51+ (2018)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Полифил</h3>
                  <p class="mb-2">Для старых браузеров используйте полифил:</p>
                  <code class="text-body-2">
                    npm install resize-observer-polyfill
                  </code>
                  <p class="mt-2 mb-0 text-body-2">
                    Современные браузеры имеют нативную поддержку,
                    полифил автоматически не загружается если API доступен.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Частые вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое ResizeObserver и для чего он используется?</p>
                <p class="font-weight-regular ma-0">
                  ResizeObserver — Web API для отслеживания изменений размеров DOM элементов. Используется для
                  реализации адаптивных компонентов, container queries, динамических grid layouts, canvas
                  с правильным разрешением для Retina, виртуализации списков и других задач, где нужно
                  реагировать на изменение размеров элементов, а не только окна браузера.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отслеживать изменения размеров нескольких элементов?</p>
                <p class="font-weight-regular ma-0">
                  Один ResizeObserver может наблюдать за множеством элементов. Вызовите <code>observe()</code>
                  для каждого элемента. В callback придет массив всех изменившихся элементов. Для управления
                  можно использовать Map для хранения индивидуальных callback'ов или классы-обертки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между contentRect и borderBoxSize?</p>
                <p class="font-weight-regular ma-0">
                  <code>contentRect</code> — размеры content-box (без padding). <code>borderBoxSize</code> —
                  размеры border-box (включая padding и border). <code>devicePixelContentBoxSize</code> —
                  размеры в device pixels для canvas и Retina дисплеев. Выбор зависит от задачи.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать производительность ResizeObserver?</p>
                <p class="font-weight-regular ma-0">
                  Используйте debounce/throttle для тяжелых операций, requestAnimationFrame для обновлений DOM,
                  батчинг изменений, условное наблюдение (активация только когда нужно), отложенную
                  инициализацию через requestIdleCallback.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать ResizeObserver вместо window.resize?</p>
                <p class="font-weight-regular ma-0">
                  Используйте ResizeObserver когда нужно отслеживать размеры конкретных элементов (компоненты,
                  контейнеры), а не всего viewport. ResizeObserver реагирует на CSS изменения, добавление
                  контента, изменение размеров родителей — случаи, где window.resize не сработает.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как интегрировать ResizeObserver с React/Vue?</p>
                <p class="font-weight-regular ma-0">
                  В React — через хуки <code>useEffect</code> и <code>useRef</code>, создавая кастомные хуки
                  типа <code>useResizeObserver</code> или <code>useElementSize</code>. В Vue — через
                  composables с <code>onMounted</code>/<code>onUnmounted</code> или кастомные директивы
                  вроде <code>v-resize</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Есть ли альтернативы ResizeObserver?</p>
                <p class="font-weight-regular ma-0">
                  CSS Container Queries (современный стандарт), polling через setInterval (неэффективно),
                  matchMedia для viewport (только окно), getBoundingClientRect в RAF (вызывает reflow).
                  ResizeObserver — лучший выбор для отслеживания размеров элементов.
                </p>
              </li>
            </ol>

            <!-- Use cases -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные сценарии использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Адаптивные компоненты</h3>
                  <ul class="pl-4">
                    <li>Container Queries альтернатива</li>
                    <li>Адаптивные карточки</li>
                    <li>Responsive typography</li>
                    <li>Динамические grid layouts</li>
                    <li>Sidebar с изменяемой шириной</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Canvas и графика</h3>
                  <ul class="pl-4">
                    <li>Canvas с правильным DPI для Retina</li>
                    <li>WebGL viewport обновление</li>
                    <li>SVG масштабирование</li>
                    <li>Графики и charts</li>
                    <li>Редакторы изображений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">UI/UX оптимизация</h3>
                  <ul class="pl-4">
                    <li>Tooltip позиционирование</li>
                    <li>Dropdown меню</li>
                    <li>Modal dialogs</li>
                    <li>Виртуализация списков</li>
                    <li>Sticky headers</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Динамический контент</h3>
                  <ul class="pl-4">
                    <li>Textarea с авто-высотой</li>
                    <li>WYSIWYG редакторы</li>
                    <li>Chat интерфейсы</li>
                    <li>Accordion компоненты</li>
                    <li>Tabs с динамическим контентом</li>
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
                    <li>Освобождать observer через disconnect()</li>
                    <li>Использовать debounce для тяжелых операций</li>
                    <li>Один observer для нескольких элементов</li>
                    <li>Правильно выбирать box model</li>
                    <li>Тестировать на разных размерах</li>
                    <li>Мониторить производительность</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Тяжелые синхронные операции в callback</li>
                    <li>Забывать disconnect() при размонтировании</li>
                    <li>Создавать observer для каждого элемента</li>
                    <li>Изменять размеры элементов в callback</li>
                    <li>Игнорировать производительность</li>
                    <li>Использовать для non-visual элементов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Callback может вызываться очень часто</li>
                    <li>Изменение размеров в callback → infinite loop</li>
                    <li>contentRect ≠ borderBoxSize</li>
                    <li>Не все box models доступны везде</li>
                    <li>Полифил для старых браузеров</li>
                    <li>Может не сработать для display:none</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>ResizeObserver</b> — мощный инструмент для создания адаптивных интерфейсов на уровне компонентов.
              Он позволяет отслеживать изменения размеров конкретных элементов эффективнее, чем
              <code>window.resize</code> или polling. Один observer может наблюдать за множеством элементов,
              браузер автоматически оптимизирует вызовы через батчинг. Поддерживает разные box models для
              различных задач (content-box, border-box, device-pixel-content-box). Критически важен для
              реализации Container Queries, адаптивных компонентов, canvas с правильным DPI и виртуализации.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver"
                target="_blank"
                class="mr-2">
                MDN ResizeObserver
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/resize-observer/"
                target="_blank">
                Web.dev Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
