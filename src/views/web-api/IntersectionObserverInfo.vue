<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicsSnippet = `
// =====================================
// INTERSECTION OBSERVER - ОСНОВЫ
// =====================================

// Что такое IntersectionObserver?
// API для асинхронного отслеживания пересечения элемента с viewport
// или с другим элементом-предком

// 1. Базовый пример
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Элемент виден в viewport!')
      console.log('Видимость:', entry.intersectionRatio) // 0.0 до 1.0
    } else {
      console.log('Элемент вне viewport')
    }
  })
})

// Начать наблюдение
const target = document.querySelector('.target')
observer.observe(target)

// Остановить наблюдение конкретного элемента
observer.unobserve(target)

// Остановить всё наблюдение
observer.disconnect()

// 2. Настройки (options)
const options = {
  // root - элемент-контейнер (по умолчанию viewport)
  root: null,

  // rootMargin - отступы от границ root (как CSS margin)
  rootMargin: '0px 0px 100px 0px', // top right bottom left

  // threshold - пороги срабатывания (0.0 до 1.0)
  threshold: [0, 0.25, 0.5, 0.75, 1.0]
  // Callback вызовется при каждом пороге
}

const advancedObserver = new IntersectionObserver(callback, options)

// 3. IntersectionObserverEntry - что приходит в callback
const callback = (entries) => {
  entries.forEach(entry => {
    // Основные свойства
    console.log(entry.isIntersecting)      // boolean - пересекается ли
    console.log(entry.intersectionRatio)   // 0.0-1.0 - сколько видно
    console.log(entry.target)              // сам элемент
    console.log(entry.time)                // timestamp

    // Геометрия
    console.log(entry.boundingClientRect)  // размеры элемента
    console.log(entry.intersectionRect)    // размеры пересечения
    console.log(entry.rootBounds)          // размеры root

    // Соотношения
    const visiblePixels = entry.intersectionRect.height
    const totalPixels = entry.boundingClientRect.height
    const percentVisible = (visiblePixels / totalPixels) * 100
  })
}
`

const infiniteScrollSnippet = `
// =====================================
// INFINITY SCROLL - РЕАЛИЗАЦИЯ
// =====================================

// ✅ ПРАВИЛЬНАЯ РЕАЛИЗАЦИЯ с IntersectionObserver

class InfiniteScroll {
  constructor(container, options = {}) {
    this.container = container
    this.page = 1
    this.loading = false
    this.hasMore = true

    // Создаем sentinel элемент (маркер для отслеживания)
    this.sentinel = document.createElement('div')
    this.sentinel.className = 'sentinel'
    this.container.appendChild(this.sentinel)

    // Настройки Observer
    const observerOptions = {
      root: options.root || null,
      rootMargin: options.rootMargin || '100px', // Загружаем заранее
      threshold: options.threshold || 0.1
    }

    // Создаем Observer
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      observerOptions
    )

    // Начинаем наблюдение
    this.observer.observe(this.sentinel)
  }

  async handleIntersection(entries) {
    const entry = entries[0]

    // Проверяем: виден ли sentinel, не загружаем ли уже, есть ли еще данные
    if (entry.isIntersecting && !this.loading && this.hasMore) {
      await this.loadMore()
    }
  }

  async loadMore() {
    this.loading = true
    this.showLoader()

    try {
      // Загружаем данные
      const data = await this.fetchData(this.page)

      if (data.length === 0) {
        this.hasMore = false
        this.observer.disconnect() // Останавливаем наблюдение
        this.removeSentinel()
        return
      }

      // Рендерим данные
      this.renderItems(data)
      this.page++

    } catch (error) {
      console.error('Ошибка загрузки:', error)
      this.showError()
    } finally {
      this.loading = false
      this.hideLoader()
    }
  }

  async fetchData(page) {
    const response = await fetch(\`/api/items?page=\${page}\`)
    return response.json()
  }

  renderItems(items) {
    const fragment = document.createDocumentFragment()

    items.forEach(item => {
      const element = this.createItemElement(item)
      fragment.appendChild(element)
    })

    // Вставляем перед sentinel
    this.container.insertBefore(fragment, this.sentinel)
  }

  createItemElement(item) {
    const div = document.createElement('div')
    div.className = 'item'
    div.textContent = item.title
    return div
  }

  showLoader() {
    this.sentinel.innerHTML = '<div class="loader">Загрузка...</div>'
  }

  hideLoader() {
    this.sentinel.innerHTML = ''
  }

  showError() {
    this.sentinel.innerHTML = '<div class="error">Ошибка загрузки</div>'
  }

  removeSentinel() {
    this.sentinel.remove()
  }

  destroy() {
    this.observer.disconnect()
    this.removeSentinel()
  }
}

// Использование
const container = document.querySelector('.items-container')
const infiniteScroll = new InfiniteScroll(container, {
  rootMargin: '200px', // Загружаем за 200px до конца
  threshold: 0.1
})

// Очистка при размонтировании
// infiniteScroll.destroy()
`

const reactInfiniteScrollSnippet = `
// =====================================
// INFINITY SCROLL в REACT
// =====================================

import { useEffect, useRef, useState, useCallback } from 'react'

function InfiniteScrollList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Ref для sentinel элемента
  const sentinelRef = useRef(null)

  // Загрузка данных
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    try {
      const response = await fetch(\`/api/items?page=\${page}\`)
      const newItems = await response.json()

      if (newItems.length === 0) {
        setHasMore(false)
        return
      }

      setItems(prev => [...prev, ...newItems])
      setPage(prev => prev + 1)

    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  // Настройка IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    // Cleanup
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
    }
  }, [loadMore])

  return (
    <div className="infinite-scroll-container">
      <div className="items-list">
        {items.map((item, index) => (
          <div key={\`\${item.id}-\${index}\`} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Sentinel элемент */}
      {hasMore && (
        <div ref={sentinelRef} className="sentinel">
          {loading && <div className="loader">Загрузка...</div>}
        </div>
      )}

      {!hasMore && (
        <div className="end-message">Все данные загружены</div>
      )}
    </div>
  )
}

// Кастомный хук для переиспользования
function useInfiniteScroll(fetchFunction) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newItems = await fetchFunction(page)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setItems(prev => [...prev, ...newItems])
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [fetchFunction, page, loading, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '100px' }
    )

    const current = sentinelRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loadMore])

  return { items, loading, hasMore, sentinelRef }
}

// Использование кастомного хука
function MyComponent() {
  const fetchItems = async (page) => {
    const res = await fetch(\`/api/items?page=\${page}\`)
    return res.json()
  }

  const { items, loading, hasMore, sentinelRef } = useInfiniteScroll(fetchItems)

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      {hasMore && <div ref={sentinelRef}>{loading && 'Loading...'}</div>}
    </div>
  )
}
`

const optimizationsSnippet = `
// =====================================
// ОПТИМИЗАЦИИ INFINITY SCROLL
// =====================================

// 1. ВИРТУАЛИЗАЦИЯ списка (для больших списков)
class VirtualizedInfiniteScroll {
  constructor(container, itemHeight, visibleCount) {
    this.container = container
    this.itemHeight = itemHeight
    this.visibleCount = visibleCount
    this.allItems = []
    this.scrollTop = 0

    this.setupVirtualization()
    this.setupInfiniteScroll()
  }

  setupVirtualization() {
    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop
      this.render()
    })
  }

  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight)
    const endIndex = startIndex + this.visibleCount

    const visibleItems = this.allItems.slice(startIndex, endIndex)

    // Рендерим только видимые элементы
    this.container.innerHTML = ''
    this.container.style.height = \`\${this.allItems.length * this.itemHeight}px\`

    const offset = startIndex * this.itemHeight
    const fragment = document.createDocumentFragment()

    visibleItems.forEach((item, index) => {
      const element = this.createItemElement(item)
      element.style.position = 'absolute'
      element.style.top = \`\${offset + index * this.itemHeight}px\`
      fragment.appendChild(element)
    })

    this.container.appendChild(fragment)
  }

  addItems(newItems) {
    this.allItems.push(...newItems)
    this.render()
  }
}

// 2. ДЕБАУНС для частых пересечений
class DebouncedInfiniteScroll {
  constructor(container, delay = 300) {
    this.container = container
    this.delay = delay
    this.timeoutId = null

    const observer = new IntersectionObserver(
      this.debouncedCallback.bind(this),
      { rootMargin: '100px' }
    )

    observer.observe(this.sentinel)
  }

  debouncedCallback(entries) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      if (entries[0].isIntersecting) {
        this.loadMore()
      }
    }, this.delay)
  }
}

// 3. БАТЧИНГ запросов (загрузка нескольких страниц)
class BatchedInfiniteScroll {
  async loadMore() {
    this.loading = true

    try {
      // Загружаем сразу 3 страницы
      const promises = [
        this.fetchData(this.page),
        this.fetchData(this.page + 1),
        this.fetchData(this.page + 2)
      ]

      const results = await Promise.all(promises)
      const allItems = results.flat()

      if (allItems.length === 0) {
        this.hasMore = false
        return
      }

      this.renderItems(allItems)
      this.page += 3

    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}

// 4. ПРЕДЗАГРУЗКА данных (prefetching)
class PrefetchingInfiniteScroll {
  constructor(container) {
    this.container = container
    this.page = 1
    this.cache = new Map()

    // Предзагружаем следующую страницу
    this.prefetchNext()

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '200px' }
    )

    observer.observe(this.sentinel)
  }

  async prefetchNext() {
    if (!this.cache.has(this.page + 1)) {
      const data = await this.fetchData(this.page + 1)
      this.cache.set(this.page + 1, data)
    }
  }

  async loadMore() {
    // Используем закэшированные данные
    let data = this.cache.get(this.page)

    if (!data) {
      data = await this.fetchData(this.page)
    }

    this.renderItems(data)
    this.cache.delete(this.page)
    this.page++

    // Предзагружаем следующую
    this.prefetchNext()
  }
}

// 5. ЛЕНИВАЯ ЗАГРУЗКА изображений внутри элементов
class LazyImageInfiniteScroll {
  constructor(container) {
    this.container = container

    // Observer для самого скролла
    this.scrollObserver = new IntersectionObserver(
      this.handleScroll.bind(this),
      { rootMargin: '100px' }
    )

    // Отдельный Observer для изображений
    this.imageObserver = new IntersectionObserver(
      this.handleImageIntersection.bind(this),
      { rootMargin: '50px' }
    )

    this.scrollObserver.observe(this.sentinel)
  }

  renderItems(items) {
    items.forEach(item => {
      const element = this.createItemElement(item)
      const img = element.querySelector('img')

      if (img) {
        // Сохраняем реальный src в data-атрибуте
        img.dataset.src = img.src
        img.src = 'placeholder.jpg'

        // Наблюдаем за изображением
        this.imageObserver.observe(img)
      }

      this.container.insertBefore(element, this.sentinel)
    })
  }

  handleImageIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src

        // Прекращаем наблюдение за загруженным изображением
        this.imageObserver.unobserve(img)
      }
    })
  }
}

// 6. ОТМЕНА запросов при быстром скролле
class CancellableInfiniteScroll {
  constructor(container) {
    this.container = container
    this.abortController = null

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '100px' }
    )

    observer.observe(this.sentinel)
  }

  async loadMore() {
    // Отменяем предыдущий запрос
    if (this.abortController) {
      this.abortController.abort()
    }

    this.abortController = new AbortController()

    try {
      const response = await fetch(
        \`/api/items?page=\${this.page}\`,
        { signal: this.abortController.signal }
      )

      const data = await response.json()
      this.renderItems(data)
      this.page++

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled')
      } else {
        console.error(error)
      }
    }
  }
}

// 7. СКЕЛЕТОН-ЗАГРУЗЧИКИ для лучшего UX
class SkeletonInfiniteScroll {
  showLoader() {
    const skeletons = Array.from({ length: 5 }, () =>
      this.createSkeletonElement()
    )

    skeletons.forEach(skeleton => {
      this.container.insertBefore(skeleton, this.sentinel)
    })
  }

  createSkeletonElement() {
    const div = document.createElement('div')
    div.className = 'skeleton-item'
    div.innerHTML = \`
      <div class="skeleton-avatar"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    \`
    return div
  }

  hideLoader() {
    const skeletons = this.container.querySelectorAll('.skeleton-item')
    skeletons.forEach(skeleton => skeleton.remove())
  }
}
`

const multipleElementsSnippet = `
// =====================================
// НАБЛЮДЕНИЕ ЗА НЕСКОЛЬКИМИ ЭЛЕМЕНТАМИ
// =====================================

// 1. Базовый пример - все элементы с одинаковой логикой
const elements = document.querySelectorAll('.observe-me')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      console.log(\`Element \${entry.target.id} is visible\`)
    } else {
      entry.target.classList.remove('visible')
    }
  })
})

// Наблюдаем за всеми элементами
elements.forEach(element => observer.observe(element))

// 2. Разная логика для разных элементов
class MultiElementObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: [0, 0.5, 1.0],
        rootMargin: '0px'
      }
    )

    this.handlers = new Map()
  }

  observe(element, handler) {
    // Сохраняем handler для каждого элемента
    this.handlers.set(element, handler)
    this.observer.observe(element)
  }

  unobserve(element) {
    this.handlers.delete(element)
    this.observer.unobserve(element)
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const handler = this.handlers.get(entry.target)
      if (handler) {
        handler(entry)
      }
    })
  }

  disconnect() {
    this.observer.disconnect()
    this.handlers.clear()
  }
}

// Использование
const multiObserver = new MultiElementObserver()

// Разные обработчики для разных элементов
multiObserver.observe(
  document.querySelector('.header'),
  (entry) => {
    if (entry.isIntersecting) {
      console.log('Header is visible')
      document.body.classList.add('header-visible')
    }
  }
)

multiObserver.observe(
  document.querySelector('.sidebar'),
  (entry) => {
    if (entry.intersectionRatio > 0.5) {
      console.log('Sidebar is half visible')
      entry.target.classList.add('sticky')
    }
  }
)

// 3. Анимации при появлении элементов
class AnimatedElementsObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    this.animatedElements = document.querySelectorAll('[data-animate]')
    this.animatedElements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationType = entry.target.dataset.animate
        const delay = entry.target.dataset.delay || 0

        setTimeout(() => {
          entry.target.classList.add(\`animate-\${animationType}\`)
        }, delay)

        // Останавливаем наблюдение после анимации
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// HTML:
// <div data-animate="fade-in" data-delay="100">Content</div>
// <div data-animate="slide-up" data-delay="200">Content</div>

// 4. Отслеживание видимости секций для навигации
class SectionNavigationObserver {
  constructor(sections, nav) {
    this.sections = sections
    this.nav = nav
    this.currentSection = null

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.5, // Секция считается видимой, если видно 50%
        rootMargin: '-100px 0px -100px 0px'
      }
    )

    this.sections.forEach(section => this.observer.observe(section))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.currentSection = entry.target.id
        this.updateNavigation()
      }
    })
  }

  updateNavigation() {
    // Убираем active со всех ссылок
    const navLinks = this.nav.querySelectorAll('a')
    navLinks.forEach(link => link.classList.remove('active'))

    // Добавляем active к текущей секции
    const currentLink = this.nav.querySelector(\`a[href="#\${this.currentSection}"]\`)
    if (currentLink) {
      currentLink.classList.add('active')
    }
  }
}

// Использование
const sections = document.querySelectorAll('section')
const nav = document.querySelector('nav')
const sectionObserver = new SectionNavigationObserver(sections, nav)

// 5. Счетчик видимых элементов
class VisibilityCounter {
  constructor(elements) {
    this.elements = elements
    this.visibleCount = 0
    this.visibleElements = new Set()

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.5 }
    )

    this.elements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.visibleElements.add(entry.target)
      } else {
        this.visibleElements.delete(entry.target)
      }
    })

    this.visibleCount = this.visibleElements.size
    this.updateCounter()
  }

  updateCounter() {
    console.log(\`Visible: \${this.visibleCount}/\${this.elements.length}\`)
    document.querySelector('.counter').textContent =
      \`\${this.visibleCount}/\${this.elements.length}\`
  }
}

// 6. Приоритизация загрузки контента
class PriorityContentLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0,
        rootMargin: '200px' // Загружаем заранее
      }
    )

    this.loadQueue = new Map()
    this.loadingInProgress = new Set()
  }

  observe(element, priority, loadFunction) {
    this.loadQueue.set(element, { priority, loadFunction })
    this.observer.observe(element)
  }

  async handleIntersection(entries) {
    // Сортируем по приоритету
    const visibleEntries = entries
      .filter(e => e.isIntersecting)
      .map(e => ({
        entry: e,
        ...this.loadQueue.get(e.target)
      }))
      .sort((a, b) => b.priority - a.priority)

    // Загружаем по порядку приоритета
    for (const { entry, loadFunction } of visibleEntries) {
      const element = entry.target

      if (!this.loadingInProgress.has(element)) {
        this.loadingInProgress.add(element)

        try {
          await loadFunction(element)
        } catch (error) {
          console.error('Loading failed:', error)
        } finally {
          this.loadingInProgress.delete(element)
          this.observer.unobserve(element)
        }
      }
    }
  }
}

// Использование
const loader = new PriorityContentLoader()

document.querySelectorAll('[data-load-priority]').forEach(element => {
  const priority = parseInt(element.dataset.loadPriority)
  const url = element.dataset.url

  loader.observe(element, priority, async (el) => {
    const response = await fetch(url)
    const content = await response.text()
    el.innerHTML = content
  })
})
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Ленивая загрузка изображений
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    this.images = document.querySelectorAll('img[data-src]')
    this.images.forEach(img => this.observer.observe(img))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target

        // Загружаем изображение
        img.src = img.dataset.src

        // Опционально: srcset для responsive
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset
        }

        // Добавляем класс для fade-in анимации
        img.classList.add('loaded')

        // Удаляем placeholder после загрузки
        img.onload = () => {
          img.classList.remove('loading')
        }

        // Прекращаем наблюдение
        this.observer.unobserve(img)
      }
    })
  }
}

// HTML: <img data-src="image.jpg" data-srcset="image-2x.jpg 2x" class="loading">

// 2. Автовоспроизведение видео
class VideoAutoplay {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.5 // Играть, когда видно 50% видео
      }
    )

    this.videos = document.querySelectorAll('video[data-autoplay]')
    this.videos.forEach(video => this.observer.observe(video))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const video = entry.target

      if (entry.isIntersecting) {
        video.play().catch(err => {
          console.log('Autoplay prevented:', err)
        })
      } else {
        video.pause()
      }
    })
  }
}

// 3. Аналитика - отслеживание просмотров
class ViewTracking {
  constructor() {
    this.tracked = new Set()

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.5, // Считаем просмотренным при 50% видимости
        rootMargin: '0px'
      }
    )

    this.trackableElements = document.querySelectorAll('[data-track-view]')
    this.trackableElements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        const trackId = element.dataset.trackView

        // Отслеживаем только один раз
        if (!this.tracked.has(trackId)) {
          this.tracked.add(trackId)
          this.sendAnalytics(trackId, entry)

          // Прекращаем наблюдение
          this.observer.unobserve(element)
        }
      }
    })
  }

  sendAnalytics(trackId, entry) {
    const data = {
      id: trackId,
      timestamp: Date.now(),
      visibilityRatio: entry.intersectionRatio,
      elementPosition: {
        top: entry.boundingClientRect.top,
        bottom: entry.boundingClientRect.bottom
      }
    }

    // Отправляем данные
    navigator.sendBeacon('/analytics/view', JSON.stringify(data))
    console.log('View tracked:', trackId)
  }
}

// HTML: <div data-track-view="article-123">Content</div>

// 4. "Read more" для длинных статей
class ReadMoreObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0,
        rootMargin: '0px 0px -80% 0px' // Триггер в нижней части viewport
      }
    )

    this.articles = document.querySelectorAll('article[data-read-more]')
    this.articles.forEach(article => {
      // Создаем маркер в конце статьи
      const marker = document.createElement('div')
      marker.className = 'read-more-marker'
      article.appendChild(marker)

      this.observer.observe(marker)
    })
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const article = entry.target.closest('article')
        this.loadMoreContent(article)

        // Останавливаем наблюдение
        this.observer.unobserve(entry.target)
      }
    })
  }

  async loadMoreContent(article) {
    const nextUrl = article.dataset.readMore

    try {
      const response = await fetch(nextUrl)
      const html = await response.text()

      // Вставляем новый контент
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html

      article.appendChild(tempDiv.firstElementChild)

    } catch (error) {
      console.error('Failed to load more content:', error)
    }
  }
}

// 5. Параллакс эффект на скролле
class ParallaxObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    )

    this.parallaxElements = document.querySelectorAll('[data-parallax]')
    this.parallaxElements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        const speed = parseFloat(element.dataset.parallax) || 0.5

        // Рассчитываем смещение на основе видимости
        const offset = (1 - entry.intersectionRatio) * 100 * speed

        element.style.transform = \`translateY(\${offset}px)\`
      }
    })
  }
}

// HTML: <div data-parallax="0.5">Content</div>

// 6. Sticky header с изменением стилей
class StickyHeaderObserver {
  constructor() {
    this.header = document.querySelector('header')

    // Создаем sentinel элемент
    this.sentinel = document.createElement('div')
    this.sentinel.style.height = '1px'
    this.sentinel.style.position = 'absolute'
    this.sentinel.style.top = '0'
    document.body.prepend(this.sentinel)

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: [0, 1],
        rootMargin: '0px'
      }
    )

    this.observer.observe(this.sentinel)
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Пользователь проскроллил вниз
        this.header.classList.add('sticky')
        this.header.classList.add('scrolled')
      } else {
        // Вернулись наверх
        this.header.classList.remove('scrolled')
      }
    })
  }
}

// 7. Предзагрузка контента следующей страницы
class NextPagePrefetch {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '500px', // Загружаем за 500px
        threshold: 0
      }
    )

    this.nextPageLink = document.querySelector('a[rel="next"]')
    if (this.nextPageLink) {
      this.observer.observe(this.nextPageLink)
    }
  }

  async handleIntersection(entries) {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const url = entry.target.href

        // Предзагружаем HTML
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = url
        document.head.appendChild(link)

        // Или загружаем и кэшируем
        try {
          const response = await fetch(url)
          const html = await response.text()
          sessionStorage.setItem(url, html)
          console.log('Next page prefetched')
        } catch (error) {
          console.error('Prefetch failed:', error)
        }

        // Останавливаем наблюдение
        this.observer.unobserve(entry.target)
      }
    })
  }
}
`

const performanceSnippet = `
// =====================================
// ПРОИЗВОДИТЕЛЬНОСТЬ И ЛУЧШИЕ ПРАКТИКИ
// =====================================

// 1. Переиспользование Observer
// ❌ ПЛОХО - создаем много Observer
document.querySelectorAll('.item').forEach(item => {
  const observer = new IntersectionObserver(callback) // Создается для каждого!
  observer.observe(item)
})

// ✅ ХОРОШО - один Observer для всех
const observer = new IntersectionObserver(callback)
document.querySelectorAll('.item').forEach(item => {
  observer.observe(item)
})

// 2. Очистка ресурсов
class ProperCleanupObserver {
  constructor() {
    this.observer = new IntersectionObserver(this.callback.bind(this))
    this.elements = []
  }

  observe(element) {
    this.elements.push(element)
    this.observer.observe(element)
  }

  destroy() {
    // Останавливаем все наблюдения
    this.observer.disconnect()

    // Очищаем ссылки
    this.elements = []

    console.log('Observer cleaned up')
  }
}

// В React/Vue компонентах
useEffect(() => {
  const observer = new IntersectionObserver(callback)
  observer.observe(element)

  // ВАЖНО: cleanup функция
  return () => {
    observer.disconnect()
  }
}, [])

// 3. Оптимизация threshold
// ❌ ПЛОХО - слишком много порогов
const badObserver = new IntersectionObserver(callback, {
  threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0, 0.01, 0.02, ..., 1.0
})

// ✅ ХОРОШО - только нужные пороги
const goodObserver = new IntersectionObserver(callback, {
  threshold: [0, 0.25, 0.5, 0.75, 1.0] // Только ключевые точки
})

// Или для большинства случаев достаточно одного порога
const simpleObserver = new IntersectionObserver(callback, {
  threshold: 0.1 // Считаем видимым при 10%
})

// 4. Throttle для частых событий
class ThrottledObserver {
  constructor(delay = 100) {
    this.delay = delay
    this.lastCall = 0

    this.observer = new IntersectionObserver(
      this.throttledCallback.bind(this)
    )
  }

  throttledCallback(entries) {
    const now = Date.now()

    if (now - this.lastCall >= this.delay) {
      this.lastCall = now
      this.handleIntersection(entries)
    }
  }

  handleIntersection(entries) {
    // Основная логика
  }
}

// 5. Измерение производительности
class PerformanceMonitoredObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      this.measuredCallback.bind(this)
    )

    this.metrics = {
      callCount: 0,
      totalTime: 0,
      maxTime: 0
    }
  }

  measuredCallback(entries) {
    const start = performance.now()

    // Основная логика
    this.handleIntersection(entries)

    const end = performance.now()
    const duration = end - start

    // Собираем метрики
    this.metrics.callCount++
    this.metrics.totalTime += duration
    this.metrics.maxTime = Math.max(this.metrics.maxTime, duration)

    // Предупреждаем о медленных callback
    if (duration > 16.67) { // Больше одного фрейма (60fps)
      console.warn(\`Slow intersection callback: \${duration.toFixed(2)}ms\`)
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      avgTime: this.metrics.totalTime / this.metrics.callCount
    }
  }
}

// 6. Проверка поддержки браузера
function isIntersectionObserverSupported() {
  return 'IntersectionObserver' in window &&
         'IntersectionObserverEntry' in window &&
         'intersectionRatio' in window.IntersectionObserverEntry.prototype
}

// Полифилл или fallback
if (!isIntersectionObserverSupported()) {
  // Загружаем полифилл
  import('intersection-observer').then(() => {
    console.log('IntersectionObserver polyfill loaded')
  })

  // Или используем fallback
  // window.IntersectionObserver = IntersectionObserverPolyfill
}

// 7. Избегание лишних пересчетов layout
class LayoutOptimizedObserver {
  constructor() {
    this.pendingUpdates = []
    this.rafId = null

    this.observer = new IntersectionObserver(
      this.scheduleUpdate.bind(this)
    )
  }

  scheduleUpdate(entries) {
    this.pendingUpdates.push(...entries)

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.processBatch.bind(this))
    }
  }

  processBatch() {
    // Читаем все размеры сразу (read phase)
    const data = this.pendingUpdates.map(entry => ({
      element: entry.target,
      isIntersecting: entry.isIntersecting,
      ratio: entry.intersectionRatio
    }))

    // Применяем все изменения сразу (write phase)
    data.forEach(({ element, isIntersecting, ratio }) => {
      if (isIntersecting) {
        element.classList.add('visible')
        element.style.opacity = ratio
      }
    })

    this.pendingUpdates = []
    this.rafId = null
  }
}

// 8. Управление памятью при большом количестве элементов
class MemoryEfficientObserver {
  constructor(maxObservedElements = 100) {
    this.maxObservedElements = maxObservedElements
    this.observedElements = new Map()

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this)
    )
  }

  observe(element, data) {
    // Если достигли лимита, удаляем старые элементы
    if (this.observedElements.size >= this.maxObservedElements) {
      const firstElement = this.observedElements.keys().next().value
      this.unobserve(firstElement)
    }

    this.observedElements.set(element, data)
    this.observer.observe(element)
  }

  unobserve(element) {
    this.observer.unobserve(element)
    this.observedElements.delete(element)
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const data = this.observedElements.get(entry.target)

      if (entry.isIntersecting && data) {
        // Обрабатываем и сразу прекращаем наблюдение
        this.processElement(entry.target, data)
        this.unobserve(entry.target)
      }
    })
  }
}
`

const highlightedBasics = ref('')
const highlightedInfiniteScroll = ref('')
const highlightedReactInfiniteScroll = ref('')
const highlightedOptimizations = ref('')
const highlightedMultipleElements = ref('')
const highlightedPracticalExamples = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedBasics.value = Prism.highlight(basicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedInfiniteScroll.value = Prism.highlight(infiniteScrollSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactInfiniteScroll.value = Prism.highlight(reactInfiniteScrollSnippet, Prism.languages.javascript, 'javascript')
  highlightedOptimizations.value = Prism.highlight(optimizationsSnippet, Prism.languages.javascript, 'javascript')
  highlightedMultipleElements.value = Prism.highlight(multipleElementsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              IntersectionObserver и InfinityScroll
            </h1>

            <p class="font-weight-regular mb-6">
              <b>IntersectionObserver API</b> — современный способ отслеживания видимости элементов на странице.
              Позволяет асинхронно наблюдать за пересечением элемента с viewport или другим элементом-предком.
              Идеален для реализации lazy loading, infinite scroll, аналитики просмотров и анимаций.
            </p>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">IntersectionObserver — основы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Преимущества:</strong> Не блокирует main thread, работает асинхронно, высокая производительность
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasics"></code></pre>

            <!-- Ключевые концепции -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые концепции</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">IntersectionObserverEntry</h3>
                  <ul class="pl-4">
                    <li><code>isIntersecting</code> — boolean</li>
                    <li><code>intersectionRatio</code> — 0.0 до 1.0</li>
                    <li><code>target</code> — наблюдаемый элемент</li>
                    <li><code>boundingClientRect</code> — размеры элемента</li>
                    <li><code>intersectionRect</code> — область пересечения</li>
                    <li><code>rootBounds</code> — размеры root</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Опции Observer</h3>
                  <ul class="pl-4">
                    <li><code>root</code> — контейнер (null = viewport)</li>
                    <li><code>rootMargin</code> — отступы ('0px')</li>
                    <li><code>threshold</code> — пороги срабатывания</li>
                  </ul>
                  <div class="mt-2">
                    <strong>threshold примеры:</strong>
                    <ul class="pl-4 text-body-2">
                      <li><code>0</code> — любое пересечение</li>
                      <li><code>0.5</code> — 50% видимости</li>
                      <li><code>[0, 0.5, 1]</code> — несколько порогов</li>
                    </ul>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <!-- Infinity Scroll -->
            <h2 class="text-h5 font-weight-bold mb-3">Реализация Infinity Scroll</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Правильный подход:</strong> Использовать sentinel элемент в конце списка для отслеживания
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInfiniteScroll"></code></pre>

            <!-- React Infinity Scroll -->
            <h2 class="text-h5 font-weight-bold mb-3">Infinity Scroll в React</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactInfiniteScroll"></code></pre>

            <!-- Оптимизации -->
            <h2 class="text-h5 font-weight-bold mb-3">Оптимизации Infinity Scroll</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-view-stream</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Виртуализация</h3>
                  <p class="text-body-2">Рендерить только видимые элементы. Для списков >1000 элементов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-package-down</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Батчинг</h3>
                  <p class="text-body-2">Загружать несколько страниц за раз. Уменьшает количество запросов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-cached</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Предзагрузка</h3>
                  <p class="text-body-2">Prefetching следующей страницы. Улучшает воспринимаемую скорость</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOptimizations"></code></pre>

            <!-- Несколько элементов -->
            <h2 class="text-h5 font-weight-bold mb-3">Наблюдение за несколькими элементами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleElements"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Производительность и лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <!-- Use Cases -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные сценарии использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🖼️ Оптимизация загрузки</h3>
                  <ul class="pl-4">
                    <li>Lazy loading изображений</li>
                    <li>Отложенная загрузка видео</li>
                    <li>Ленивая инициализация компонентов</li>
                    <li>Динамический импорт модулей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📜 Infinite Scroll</h3>
                  <ul class="pl-4">
                    <li>Бесконечная лента новостей</li>
                    <li>Галереи изображений</li>
                    <li>Список товаров в e-commerce</li>
                    <li>Комментарии и отзывы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎬 Анимации</h3>
                  <ul class="pl-4">
                    <li>Fade-in при появлении</li>
                    <li>Slide-in эффекты</li>
                    <li>Параллакс скроллинг</li>
                    <li>Прогрессивное появление элементов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📊 Аналитика</h3>
                  <ul class="pl-4">
                    <li>Отслеживание просмотров</li>
                    <li>Impressions для рекламы</li>
                    <li>Время нахождения элемента на экране</li>
                    <li>A/B тестирование видимости</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать InfinityScroll с IntersectionObserver?</p>
                <p class="font-weight-regular ma-0">
                  Создать sentinel элемент в конце списка, наблюдать за ним через IntersectionObserver.
                  Когда sentinel становится видимым (isIntersecting === true), загружать следующую порцию данных.
                  Важно: добавить проверки на loading состояние и hasMore флаг.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать InfinityScroll?</p>
                <p class="font-weight-regular ma-0">
                  1) Виртуализация списка для больших данных; 2) Батчинг - загрузка нескольких страниц;
                  3) Prefetching - предзагрузка следующей страницы; 4) Дебаунс callback'ов;
                  5) Отмена предыдущих запросов через AbortController; 6) Lazy loading изображений внутри элементов;
                  7) Использование скелетон-загрузчиков для UX.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между IntersectionObserver и scroll event?</p>
                <p class="font-weight-regular ma-0">
                  IntersectionObserver работает асинхронно, не блокирует main thread, вычисления происходят
                  в отдельном потоке. Scroll event синхронный, запускается постоянно, требует throttle/debounce,
                  может вызвать layout thrashing. IntersectionObserver производительнее и проще в использовании.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое threshold и rootMargin?</p>
                <p class="font-weight-regular ma-0">
                  <code>threshold</code> определяет, при какой видимости элемента (0.0-1.0) срабатывает callback.
                  Можно задать массив порогов [0, 0.5, 1.0]. <code>rootMargin</code> — отступы от границ root
                  (как CSS margin), позволяет загружать контент заранее, например '100px' загрузит за 100px до края.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обрабатывать несколько элементов с разной логикой?</p>
                <p class="font-weight-regular ma-0">
                  Использовать один IntersectionObserver и Map для хранения обработчиков для каждого элемента.
                  В callback получать handler из Map по entry.target и вызывать его. Это эффективнее,
                  чем создавать отдельный Observer для каждого элемента.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как правильно очищать IntersectionObserver?</p>
                <p class="font-weight-regular ma-0">
                  Вызывать <code>observer.disconnect()</code> при размонтировании компонента.
                  В React использовать cleanup функцию в useEffect. Также можно использовать
                  <code>observer.unobserve(element)</code> для прекращения наблюдения за конкретным элементом
                  (например, после загрузки изображения).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое sentinel элемент в контексте InfinityScroll?</p>
                <p class="font-weight-regular ma-0">
                  Sentinel — это маркерный элемент в конце списка, за которым наблюдает IntersectionObserver.
                  Когда он становится видимым, загружается новая порция данных. Это более надежно,
                  чем отслеживать последний элемент данных, так как sentinel всегда остается в конце.
                </p>
              </li>
            </ol>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">IntersectionObserver vs Scroll Event</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">IntersectionObserver</th>
                <th class="text-left font-weight-bold">Scroll Event</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Производительность</b></td>
                <td class="text-success">✅ Отличная (асинхронный)</td>
                <td class="text-error">⚠️ Требует оптимизации</td>
              </tr>
              <tr>
                <td><b>Main Thread</b></td>
                <td class="text-success">✅ Не блокирует</td>
                <td class="text-error">❌ Блокирует</td>
              </tr>
              <tr>
                <td><b>Точность</b></td>
                <td class="text-success">✅ Точное пересечение</td>
                <td class="text-warning">⚠️ Ручные вычисления</td>
              </tr>
              <tr>
                <td><b>Сложность</b></td>
                <td class="text-success">✅ Простой API</td>
                <td class="text-error">⚠️ Нужен throttle/debounce</td>
              </tr>
              <tr>
                <td><b>Поддержка</b></td>
                <td class="text-success">✅ Все современные браузеры</td>
                <td class="text-success">✅ Универсальная</td>
              </tr>
              <tr>
                <td><b>Use Case</b></td>
                <td>Lazy loading, infinite scroll, аналитика</td>
                <td>Кастомная логика, старые браузеры</td>
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
                    <li>Переиспользовать один Observer</li>
                    <li>Вызывать disconnect() при unmount</li>
                    <li>Использовать rootMargin для preloading</li>
                    <li>Добавлять loading состояния</li>
                    <li>Обрабатывать ошибки загрузки</li>
                    <li>Показывать индикаторы загрузки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Создавать Observer для каждого элемента</li>
                    <li>Забывать про cleanup</li>
                    <li>Слишком много threshold порогов</li>
                    <li>Тяжелые операции в callback</li>
                    <li>Игнорировать loading состояние</li>
                    <li>Загружать без проверки hasMore</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать sentinel элемент</li>
                    <li>Батчить запросы когда возможно</li>
                    <li>Предзагружать следующие данные</li>
                    <li>Виртуализация для больших списков</li>
                    <li>Отменять старые запросы (AbortController)</li>
                    <li>Мониторить производительность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>IntersectionObserver</b> — мощный и производительный API для отслеживания видимости элементов.
              Идеален для реализации <b>Infinity Scroll</b> через sentinel элемент в конце списка.
              <b>Оптимизации:</b> виртуализация списка, батчинг запросов, prefetching, дебаунс callback'ов,
              lazy loading изображений. <b>Преимущества:</b> асинхронность, не блокирует main thread,
              простой API, высокая производительность. Правильное использование значительно улучшает UX
              и производительность веб-приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
                target="_blank"
                class="mr-2">
                MDN IntersectionObserver
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/intersectionobserver/"
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
