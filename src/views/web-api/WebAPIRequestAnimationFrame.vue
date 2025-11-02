<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicExampleSnippet = `
// =====================================
// REQUESTANIMATIONFRAME - ОСНОВЫ
// =====================================

// 1. Простая анимация через setTimeout (ПЛОХО)
function animateWithSetTimeout() {
  let position = 0

  function animate() {
    position += 2
    element.style.left = position + 'px'

    if (position < 500) {
      setTimeout(animate, 16) // ~60fps, но неточно!
    }
  }

  animate()
}

// Проблемы setTimeout:
// - Не синхронизирован с частотой обновления монитора
// - Может выполняться когда вкладка неактивна
// - Тратит CPU/батарею впустую
// - Нет автоматической оптимизации

// 2. Правильная анимация через requestAnimationFrame (ХОРОШО)
function animateWithRAF() {
  let position = 0

  function animate() {
    position += 2
    element.style.left = position + 'px'

    if (position < 500) {
      requestAnimationFrame(animate) // Синхронизировано с браузером!
    }
  }

  requestAnimationFrame(animate)
}

// Преимущества requestAnimationFrame:
// ✅ Синхронизирован с частотой обновления экрана (60Hz/120Hz/144Hz)
// ✅ Автоматически останавливается при неактивной вкладке
// ✅ Оптимизирован браузером для плавных анимаций
// ✅ Батчинг: все RAF коллбэки выполняются в одном фрейме
// ✅ Экономит батарею и CPU

// 3. Отмена requestAnimationFrame
let animationId

function startAnimation() {
  let position = 0

  function animate() {
    position += 2
    element.style.left = position + 'px'

    if (position < 500) {
      animationId = requestAnimationFrame(animate)
    }
  }

  animationId = requestAnimationFrame(animate)
}

function stopAnimation() {
  cancelAnimationFrame(animationId) // Отменяем анимацию
}

// Использование
startAnimation()

// Остановка через 2 секунды
setTimeout(stopAnimation, 2000)

// 4. Получение timestamp
function animate(timestamp) {
  // timestamp - время в миллисекундах с момента navigation start
  console.log('Current timestamp:', timestamp)

  // Можно использовать для расчета delta time
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
`

const performanceComparisonSnippet = `
// =====================================
// СРАВНЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ
// =====================================

// 1. setInterval - фиксированная частота (НЕОПТИМАЛЬНО)
let intervalPosition = 0

const intervalId = setInterval(() => {
  intervalPosition += 2
  element.style.left = intervalPosition + 'px'

  // Проблемы:
  // - Не учитывает реальную частоту обновления монитора
  // - Может пропускать фреймы или дублировать
  // - Работает даже когда вкладка неактивна
  // - Нет синхронизации с рендерингом браузера

  if (intervalPosition >= 500) {
    clearInterval(intervalId)
  }
}, 16) // 16ms ≈ 60fps, но это приблизительно

// 2. setTimeout - рекурсивный (ЛУЧШЕ, НО ВСЁ ЕЩЁ НЕОПТИМАЛЬНО)
let timeoutPosition = 0

function animateTimeout() {
  timeoutPosition += 2
  element.style.left = timeoutPosition + 'px'

  if (timeoutPosition < 500) {
    setTimeout(animateTimeout, 16)
  }

  // Лучше чем setInterval, но:
  // - Всё ещё не синхронизирован с монитором
  // - Может вызывать layout thrashing
  // - Нет автоматической оптимизации
}

setTimeout(animateTimeout, 16)

// 3. requestAnimationFrame - ОПТИМАЛЬНЫЙ ПОДХОД
let rafPosition = 0
let rafId

function animateRAF(timestamp) {
  rafPosition += 2
  element.style.left = rafPosition + 'px'

  if (rafPosition < 500) {
    rafId = requestAnimationFrame(animateRAF)
  }

  // Преимущества:
  // ✅ Автоматически адаптируется к частоте монитора (60Hz/120Hz/144Hz)
  // ✅ Выполняется перед следующим рендерингом
  // ✅ Батчинг всех RAF коллбэков
  // ✅ Автопауза на неактивных вкладках
  // ✅ Нет layout thrashing
}

rafId = requestAnimationFrame(animateRAF)

// 4. Сравнение CPU использования
// setTimeout/setInterval: 100% загрузка даже на неактивных вкладках
// requestAnimationFrame: ~5% на неактивных вкладках (автоматическая пауза)

// 5. Пример с измерением FPS
let frameCount = 0
let lastTime = performance.now()
let fps = 0

function measureFPS(timestamp) {
  frameCount++

  if (timestamp - lastTime >= 1000) { // Каждую секунду
    fps = Math.round((frameCount * 1000) / (timestamp - lastTime))
    console.log(\`Current FPS: \${fps}\`)

    frameCount = 0
    lastTime = timestamp
  }

  requestAnimationFrame(measureFPS)
}

requestAnimationFrame(measureFPS)

// requestAnimationFrame обеспечивает стабильные 60 FPS
// setTimeout/setInterval дают нестабильные 45-60 FPS с просадками
`

const eventLoopIntegrationSnippet = `
// =====================================
// RAF И EVENT LOOP
// =====================================

// Порядок выполнения в Event Loop:
// 1. Microtasks (Promise.then, queueMicrotask)
// 2. Macrotasks (setTimeout, setInterval)
// 3. requestAnimationFrame callbacks
// 4. Layout/Paint
// 5. requestIdleCallback (если есть время)

// Пример взаимодействия с Event Loop
console.log('1. Синхронный код')

setTimeout(() => {
  console.log('4. setTimeout (macrotask)')
}, 0)

Promise.resolve().then(() => {
  console.log('2. Promise (microtask)')
})

requestAnimationFrame(() => {
  console.log('5. requestAnimationFrame')
})

queueMicrotask(() => {
  console.log('3. queueMicrotask')
})

console.log('1. Синхронный код (конец)')

// Вывод:
// 1. Синхронный код
// 1. Синхронный код (конец)
// 2. Promise (microtask)
// 3. queueMicrotask
// 4. setTimeout (macrotask)
// 5. requestAnimationFrame (перед рендерингом)

// =====================================
// ДЕТАЛЬНЫЙ ЦИКЛ РЕНДЕРИНГА БРАУЗЕРА
// =====================================

/*
Один цикл рендеринга (один фрейм):

1️⃣ MACROTASK QUEUE
   └─ setTimeout, setInterval, I/O callbacks

2️⃣ MICROTASK QUEUE
   └─ Promise.then, queueMicrotask, MutationObserver
   └─ Очищается полностью перед переходом к следующему этапу

3️⃣ STYLE CALCULATION
   └─ Пересчёт CSS стилей (если были изменения)

4️⃣ LAYOUT (REFLOW)
   └─ Вычисление позиций и размеров элементов

5️⃣ requestAnimationFrame CALLBACKS
   └─ Все зарегистрированные RAF коллбэки выполняются здесь
   └─ Идеальное место для обновления анимаций

6️⃣ PAINT
   └─ Растеризация: отрисовка пикселей

7️⃣ COMPOSITE
   └─ Композиция слоёв на GPU

8️⃣ requestIdleCallback (если есть свободное время)

Затем цикл повторяется (обычно 60 раз в секунду = 60 FPS)
*/

// Пример с полным циклом
function demonstrateRenderCycle() {
  console.log('Start')

  // Macrotask - выполнится в следующей итерации event loop
  setTimeout(() => {
    console.log('setTimeout (macrotask)')
  }, 0)

  // Microtask - выполнится сразу после текущего кода
  Promise.resolve().then(() => {
    console.log('Promise (microtask)')
  })

  // RAF - выполнится перед следующим рендерингом
  requestAnimationFrame(() => {
    console.log('requestAnimationFrame (before paint)')

    // Этот Promise выполнится до следующего RAF
    Promise.resolve().then(() => {
      console.log('Promise inside RAF (microtask)')
    })
  })

  // Изменение DOM вызовет reflow/repaint в следующем фрейме
  document.body.style.backgroundColor = 'red'

  console.log('End')
}

// Вывод:
// Start
// End
// Promise (microtask)
// setTimeout (macrotask)
// requestAnimationFrame (before paint)
// Promise inside RAF (microtask)
// [затем происходит Paint/Composite с красным фоном]

// =====================================
// ОПТИМИЗАЦИЯ С RAF
// =====================================

// ❌ ПЛОХО - Layout Thrashing
function badAnimation() {
  requestAnimationFrame(() => {
    // Чтение вызывает layout
    const height = element.offsetHeight

    // Запись вызывает новый layout
    element.style.height = height + 10 + 'px'

    // Снова чтение - ещё один layout!
    const width = element.offsetWidth

    // Снова запись - и ещё layout!
    element.style.width = width + 10 + 'px'

    // 4 layout операции в одном фрейме - ОЧЕНЬ МЕДЛЕННО
  })
}

// ✅ ХОРОШО - Батчинг операций
function goodAnimation() {
  requestAnimationFrame(() => {
    // Сначала все чтения (1 layout)
    const height = element.offsetHeight
    const width = element.offsetWidth

    // Потом все записи (будут применены вместе)
    element.style.height = height + 10 + 'px'
    element.style.width = width + 10 + 'px'

    // Только 1 layout операция - БЫСТРО
  })
}

// ✅ ЕЩЁ ЛУЧШЕ - Использование transform (GPU)
function bestAnimation() {
  let position = 0

  function animate() {
    position += 2

    // transform не вызывает layout - работает на GPU!
    element.style.transform = \`translateX(\${position}px)\`

    if (position < 500) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}
`

const deltaTimeSnippet = `
// =====================================
// РАБОТА С DELTA TIME
// =====================================

// Проблема: разные мониторы = разная частота обновления
// 60Hz = ~16.67ms между фреймами
// 120Hz = ~8.33ms между фреймами
// 144Hz = ~6.94ms между фреймами

// ❌ ПЛОХО - без учета delta time
function animateWithoutDelta() {
  let position = 0

  function animate() {
    position += 2 // Одинаковое приращение независимо от FPS
    element.style.left = position + 'px'

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  // Результат:
  // 60 FPS: 120 пикселей/секунду
  // 120 FPS: 240 пикселей/секунду (в 2 раза быстрее!)
  // Анимация идёт с разной скоростью на разных мониторах!
}

// ✅ ХОРОШО - с учетом delta time
function animateWithDelta() {
  let position = 0
  let lastTimestamp = 0
  const speed = 120 // пикселей в секунду

  function animate(timestamp) {
    // Вычисляем время с последнего фрейма
    const deltaTime = timestamp - lastTimestamp
    lastTimestamp = timestamp

    // Приращение зависит от времени, не от FPS
    const delta = (speed * deltaTime) / 1000 // делим на 1000 (мс -> секунды)
    position += delta

    element.style.left = position + 'px'

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  // Результат:
  // 60 FPS: 120 пикселей/секунду ✅
  // 120 FPS: 120 пикселей/секунду ✅
  // Анимация идёт с одинаковой скоростью везде!
}

// Продвинутый пример с интерполяцией
class Animation {
  constructor(element) {
    this.element = element
    this.position = 0
    this.velocity = 0
    this.acceleration = 0
    this.lastTimestamp = 0
    this.isRunning = false
    this.animationId = null
  }

  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.lastTimestamp = performance.now()
    this.animate(this.lastTimestamp)
  }

  stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }

  animate = (timestamp) => {
    if (!this.isRunning) return

    // Delta time в секундах
    const deltaTime = (timestamp - this.lastTimestamp) / 1000
    this.lastTimestamp = timestamp

    // Физика движения с учетом времени
    this.velocity += this.acceleration * deltaTime
    this.position += this.velocity * deltaTime

    // Применяем позицию
    this.element.style.transform = \`translateX(\${this.position}px)\`

    // Продолжаем анимацию
    this.animationId = requestAnimationFrame(this.animate)
  }

  applyForce(force) {
    this.acceleration = force
  }
}

// Использование
const ball = new Animation(document.getElementById('ball'))
ball.applyForce(100) // ускорение 100 пикселей/сек²
ball.start()

// Остановка через 3 секунды
setTimeout(() => ball.stop(), 3000)

// =====================================
// СГЛАЖИВАНИЕ DELTA TIME
// =====================================

// Проблема: нестабильный FPS дает скачки delta time
// Решение: усреднение delta time

class SmoothedAnimation {
  constructor() {
    this.deltaHistory = []
    this.historySize = 10
    this.lastTimestamp = 0
  }

  getSmoothedDelta(timestamp) {
    const rawDelta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    // Добавляем в историю
    this.deltaHistory.push(rawDelta)

    // Ограничиваем размер истории
    if (this.deltaHistory.length > this.historySize) {
      this.deltaHistory.shift()
    }

    // Вычисляем среднее
    const sum = this.deltaHistory.reduce((a, b) => a + b, 0)
    return sum / this.deltaHistory.length
  }

  animate = (timestamp) => {
    const smoothDelta = this.getSmoothedDelta(timestamp)

    // Используем сглаженную дельту
    console.log(\`Smooth delta: \${smoothDelta.toFixed(2)}ms\`)

    requestAnimationFrame(this.animate)
  }
}

const smoothAnimation = new SmoothedAnimation()
requestAnimationFrame(smoothAnimation.animate)
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Плавная прокрутка (Smooth Scroll)
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.pageYOffset
  const difference = targetY - startY
  const startTime = performance.now()

  function scroll(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing функция (ease-in-out)
    const easing = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2

    window.scrollTo(0, startY + difference * easing)

    if (progress < 1) {
      requestAnimationFrame(scroll)
    }
  }

  requestAnimationFrame(scroll)
}

// Использование
smoothScrollTo(1000) // Плавно прокрутить к 1000px

// 2. Параллакс эффект
class ParallaxEffect {
  constructor() {
    this.layers = document.querySelectorAll('.parallax-layer')
    this.ticking = false

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.update()
          this.ticking = false
        })

        this.ticking = true
      }
    })
  }

  update() {
    const scrollY = window.pageYOffset

    this.layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.3
      const yPos = -(scrollY * speed)

      layer.style.transform = \`translate3d(0, \${yPos}px, 0)\`
    })
  }
}

new ParallaxEffect()

// 3. Счетчик с анимацией
function animateCounter(element, target, duration = 2000) {
  const start = parseInt(element.textContent) || 0
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic
    const easing = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + (target - start) * easing)

    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target // Точное финальное значение
    }
  }

  requestAnimationFrame(update)
}

// Использование
const counter = document.getElementById('counter')
animateCounter(counter, 1000, 2000) // От 0 до 1000 за 2 секунды

// 4. Отслеживание перемещения мыши (плавное следование)
class SmoothFollower {
  constructor(element) {
    this.element = element
    this.targetX = 0
    this.targetY = 0
    this.currentX = 0
    this.currentY = 0
    this.ease = 0.1 // Коэффициент сглаживания

    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX
      this.targetY = e.clientY
    })

    this.animate()
  }

  animate = () => {
    // Плавная интерполяция к целевой позиции
    this.currentX += (this.targetX - this.currentX) * this.ease
    this.currentY += (this.targetY - this.currentY) * this.ease

    this.element.style.transform =
      \`translate(\${this.currentX}px, \${this.currentY}px)\`

    requestAnimationFrame(this.animate)
  }
}

const follower = new SmoothFollower(document.getElementById('follower'))

// 5. Загрузочный прогресс бар
class ProgressBar {
  constructor(element) {
    this.element = element
    this.current = 0
    this.target = 0
    this.animating = false
  }

  setProgress(value) {
    this.target = Math.max(0, Math.min(100, value))

    if (!this.animating) {
      this.animating = true
      this.animate()
    }
  }

  animate = () => {
    const diff = this.target - this.current

    if (Math.abs(diff) < 0.1) {
      this.current = this.target
      this.animating = false
    } else {
      this.current += diff * 0.1
      requestAnimationFrame(this.animate)
    }

    this.element.style.width = this.current + '%'
  }
}

const progressBar = new ProgressBar(document.getElementById('progress'))

// Симуляция загрузки
let progress = 0
const interval = setInterval(() => {
  progress += Math.random() * 10
  progressBar.setProgress(progress)

  if (progress >= 100) {
    clearInterval(interval)
  }
}, 200)

// 6. Скроллджек (ScrollJacking) с RAF
class ScrollJacker {
  constructor() {
    this.sections = document.querySelectorAll('.section')
    this.currentSection = 0
    this.isScrolling = false

    window.addEventListener('wheel', (e) => {
      e.preventDefault()

      if (this.isScrolling) return

      if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
        this.currentSection++
        this.scrollToSection()
      } else if (e.deltaY < 0 && this.currentSection > 0) {
        this.currentSection--
        this.scrollToSection()
      }
    }, { passive: false })
  }

  scrollToSection() {
    this.isScrolling = true

    const targetY = this.sections[this.currentSection].offsetTop
    const startY = window.pageYOffset
    const difference = targetY - startY
    const startTime = performance.now()
    const duration = 800

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easing = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      window.scrollTo(0, startY + difference * easing)

      if (progress < 1) {
        requestAnimationFrame(scroll)
      } else {
        this.isScrolling = false
      }
    }

    requestAnimationFrame(scroll)
  }
}

new ScrollJacker()

// 7. Игровой цикл (Game Loop)
class GameLoop {
  constructor() {
    this.entities = []
    this.lastTimestamp = 0
    this.running = false
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  start() {
    if (this.running) return

    this.running = true
    this.lastTimestamp = performance.now()
    this.loop(this.lastTimestamp)
  }

  stop() {
    this.running = false
  }

  loop = (timestamp) => {
    if (!this.running) return

    const deltaTime = (timestamp - this.lastTimestamp) / 1000
    this.lastTimestamp = timestamp

    // Update всех сущностей
    this.entities.forEach(entity => {
      entity.update(deltaTime)
    })

    // Render всех сущностей
    this.entities.forEach(entity => {
      entity.render()
    })

    requestAnimationFrame(this.loop)
  }
}

// Пример сущности
class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.velocityX = 0
    this.velocityY = 0
  }

  update(deltaTime) {
    this.x += this.velocityX * deltaTime
    this.y += this.velocityY * deltaTime
  }

  render() {
    // Отрисовка игрока
    ctx.fillRect(this.x, this.y, 50, 50)
  }
}

const game = new GameLoop()
game.addEntity(new Player(100, 100))
game.start()
`

const reactExamplesSnippet = `
// =====================================
// REQUESTANIMATIONFRAME В REACT
// =====================================

// 1. Базовый хук useAnimationFrame
import { useEffect, useRef } from 'react'

function useAnimationFrame(callback) {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [callback])
}

// Использование
function AnimatedComponent() {
  const [position, setPosition] = useState(0)

  useAnimationFrame((deltaTime) => {
    setPosition(prev => prev + (deltaTime * 0.1))
  })

  return (
    <div style={{ transform: \`translateX(\${position}px)\` }}>
      Animated Element
    </div>
  )
}

// 2. Продвинутый хук с контролем
function useControllableAnimation(callback, isPlaying = true) {
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const animate = (time) => {
      if (isPlayingRef.current) {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current
          callback(deltaTime)
        }
        previousTimeRef.current = time
      } else {
        previousTimeRef.current = undefined
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [callback])
}

// Использование с контролем
function ControllableAnimation() {
  const [position, setPosition] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useControllableAnimation((deltaTime) => {
    setPosition(prev => (prev + deltaTime * 0.1) % 500)
  }, isPlaying)

  return (
    <div>
      <div style={{ transform: \`translateX(\${position}px)\` }}>
        Animated Element
      </div>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

// 3. Хук для плавного скролла
function useSmoothScroll() {
  const scrollTo = useCallback((targetY, duration = 1000) => {
    const startY = window.pageYOffset
    const difference = targetY - startY
    const startTime = performance.now()

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easing = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      window.scrollTo(0, startY + difference * easing)

      if (progress < 1) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }, [])

  return scrollTo
}

// Использование
function ScrollButton() {
  const scrollTo = useSmoothScroll()

  return (
    <button onClick={() => scrollTo(1000)}>
      Scroll to 1000px
    </button>
  )
}

// 4. Анимация счетчика
function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const rafRef = useRef()

  useEffect(() => {
    const startTime = performance.now()
    const startValue = count

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easing = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (target - startValue) * easing)

      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return count
}

// Использование
function Counter({ target }) {
  const count = useAnimatedCounter(target)

  return <div className="counter">{count}</div>
}

// 5. Параллакс эффект в React
function useParallax() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef()
  const tickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.pageYOffset)
          tickingRef.current = false
        })

        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return scrollY
}

function ParallaxLayer({ speed, children }) {
  const scrollY = useParallax()
  const offset = scrollY * speed

  return (
    <div style={{ transform: \`translate3d(0, \${offset}px, 0)\` }}>
      {children}
    </div>
  )
}

// 6. Canvas анимация в React
function useCanvas(draw, options = {}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    let animationFrameId
    let previousTime = 0

    const render = (time) => {
      const deltaTime = time - previousTime
      previousTime = time

      draw(context, deltaTime, time)
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return canvasRef
}

// Использование
function AnimatedCanvas() {
  const draw = useCallback((ctx, deltaTime, time) => {
    // Очистка canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Анимация
    const x = (Math.sin(time * 0.001) * 200) + 250
    const y = (Math.cos(time * 0.001) * 200) + 250

    ctx.beginPath()
    ctx.arc(x, y, 50, 0, 2 * Math.PI)
    ctx.fillStyle = 'blue'
    ctx.fill()
  }, [])

  const canvasRef = useCanvas(draw)

  return <canvas ref={canvasRef} width={500} height={500} />
}

// 7. Производительность - оптимизация setState
function useThrottledAnimationFrame(callback, throttleMs = 16) {
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const throttleRef = useRef(0)

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        throttleRef.current += deltaTime

        // Вызываем callback только раз в throttleMs миллисекунд
        if (throttleRef.current >= throttleMs) {
          callback(throttleRef.current)
          throttleRef.current = 0
        }
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [callback, throttleMs])
}

// Использование для оптимизации
function OptimizedAnimation() {
  const [position, setPosition] = useState(0)

  // Обновляем state максимум раз в 32ms (~30 FPS)
  // Вместо 60 FPS - снижаем нагрузку на React
  useThrottledAnimationFrame((deltaTime) => {
    setPosition(prev => prev + deltaTime * 0.05)
  }, 32)

  return (
    <div style={{ transform: \`translateX(\${position}px)\` }}>
      Optimized Animation
    </div>
  )
}
`

const highlightedBasicExample = ref('')
const highlightedPerformanceComparison = ref('')
const highlightedEventLoopIntegration = ref('')
const highlightedDeltaTime = ref('')
const highlightedPracticalExamples = ref('')
const highlightedReactExamples = ref('')

onMounted(() => {
  highlightedBasicExample.value = Prism.highlight(basicExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformanceComparison.value = Prism.highlight(performanceComparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedEventLoopIntegration.value = Prism.highlight(eventLoopIntegrationSnippet, Prism.languages.javascript, 'javascript')
  highlightedDeltaTime.value = Prism.highlight(deltaTimeSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactExamples.value = Prism.highlight(reactExamplesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              RequestAnimationFrame: оптимальный способ анимаций в браузере
            </h1>

            <p class="font-weight-regular mb-6">
              <b>requestAnimationFrame (RAF)</b> — это Web API для создания плавных анимаций,
              синхронизированных с частотой обновления экрана браузера. В отличие от setTimeout/setInterval,
              RAF автоматически оптимизирован браузером, экономит батарею и обеспечивает стабильные 60 FPS.
            </p>

            <!-- Основная концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Основная концепция</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-timer-sand</v-icon>
                    <h3 class="text-h6 font-weight-bold">setTimeout/setInterval</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Фиксированный интервал (~16ms)</li>
                    <li>Не синхронизирован с монитором</li>
                    <li>Работает на неактивных вкладках</li>
                    <li>Может пропускать/дублировать фреймы</li>
                    <li>Нет автооптимизации</li>
                    <li class="text-error"><strong>Тратит батарею</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-animation</v-icon>
                    <h3 class="text-h6 font-weight-bold">requestAnimationFrame</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Адаптируется к частоте монитора</li>
                    <li>60Hz/120Hz/144Hz автоматически</li>
                    <li>Пауза на неактивных вкладках</li>
                    <li>Батчинг всех RAF коллбэков</li>
                    <li>Выполняется перед paint</li>
                    <li class="text-success"><strong>Экономит батарею</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-speedometer</v-icon>
                    <h3 class="text-h6 font-weight-bold">Производительность</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>setTimeout:</strong> 45-60 FPS (нестабильно)</li>
                    <li><strong>RAF:</strong> стабильные 60 FPS</li>
                    <li>CPU на неактивной вкладке:</li>
                    <li>setTimeout: ~100%</li>
                    <li>RAF: ~5%</li>
                    <li class="text-success"><strong>В 20 раз эффективнее!</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы requestAnimationFrame</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Ключевое преимущество:</strong> RAF синхронизирован с циклом рендеринга браузера
              и выполняется ровно перед следующим paint, обеспечивая идеальную плавность анимаций.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicExample"></code></pre>

            <!-- Сравнение производительности -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformanceComparison"></code></pre>

            <!-- Таблица сравнения -->
            <h2 class="text-h5 font-weight-bold mb-3">Детальное сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">setInterval</th>
                <th class="text-left font-weight-bold">setTimeout (рекурсивный)</th>
                <th class="text-left font-weight-bold">requestAnimationFrame</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Частота вызова</strong></td>
                <td>Фиксированная (~16ms)</td>
                <td>Фиксированная (~16ms)</td>
                <td class="text-success">Адаптивная (монитор)</td>
              </tr>
              <tr>
                <td><strong>Синхронизация с рендерингом</strong></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><strong>Пауза на неактивных вкладках</strong></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Автоматическая</td>
              </tr>
              <tr>
                <td><strong>Батчинг коллбэков</strong></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><strong>Layout thrashing</strong></td>
                <td class="text-warning">⚠️ Возможен</td>
                <td class="text-warning">⚠️ Возможен</td>
                <td class="text-success">✅ Минимизирован</td>
              </tr>
              <tr>
                <td><strong>Timestamp параметр</strong></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да (DOMHighResTimeStamp)</td>
              </tr>
              <tr>
                <td><strong>Энергопотребление</strong></td>
                <td class="text-error">Высокое</td>
                <td class="text-error">Высокое</td>
                <td class="text-success">Низкое</td>
              </tr>
              <tr>
                <td><strong>FPS стабильность</strong></td>
                <td class="text-error">45-60 (скачки)</td>
                <td class="text-warning">50-60 (нестабильно)</td>
                <td class="text-success">Стабильные 60</td>
              </tr>
              <tr>
                <td><strong>Поддержка 120Hz/144Hz</strong></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Автоматически</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Event Loop -->
            <h2 class="text-h5 font-weight-bold mb-3">Взаимодействие с Event Loop браузера</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> requestAnimationFrame выполняется <u>после microtasks</u>, но
              <u>перед paint/composite</u> — это идеальное место для обновления визуальных изменений!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventLoopIntegration"></code></pre>

            <!-- Схема Event Loop -->
            <h2 class="text-h5 font-weight-bold mb-3">Место RAF в цикле рендеринга</h2>
            <v-card class="pa-4 mb-8" color="grey-lighten-4">
              <h3 class="text-h6 font-weight-bold mb-3">Один фрейм браузера (~16.67ms @ 60Hz)</h3>
              <v-stepper alt-labels>
                <v-stepper-header>
                  <v-stepper-item title="Script Execution" value="1" complete></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="Microtasks" value="2" complete></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="Style Calc" value="3" complete></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="Layout" value="4" complete></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="RAF Callbacks" value="5" complete color="success"></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="Paint" value="6" complete></v-stepper-item>
                  <v-divider></v-divider>
                  <v-stepper-item title="Composite" value="7" complete></v-stepper-item>
                </v-stepper-header>
              </v-stepper>
              <v-alert color="success" variant="tonal" class="mt-4">
                RAF выполняется между Layout и Paint — это гарантирует, что все изменения
                будут отрисованы в текущем фрейме без дополнительного reflow!
              </v-alert>
            </v-card>

            <!-- Delta Time -->
            <h2 class="text-h5 font-weight-bold mb-3">Работа с Delta Time для плавных анимаций</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Проблема:</strong> Без учета delta time анимации идут с разной скоростью на
              60Hz (16.67ms), 120Hz (8.33ms) и 144Hz (6.94ms) мониторах!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDeltaTime"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры применения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- React примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Использование в React</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-react</v-icon>
              <strong>Best Practice:</strong> Всегда отменяйте RAF в cleanup функции useEffect
              для предотвращения утечек памяти!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactExamples"></code></pre>

            <!-- Когда использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый подход?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">✅ requestAnimationFrame</h3>
                  <p class="text-h7 font-weight-medium mb-2">Используйте для:</p>
                  <ul class="pl-4">
                    <li>Визуальных анимаций</li>
                    <li>Плавных переходов</li>
                    <li>Скролл-эффектов</li>
                    <li>Canvas/WebGL рендеринга</li>
                    <li>Игровых циклов</li>
                    <li>Перемещения элементов</li>
                    <li>Параллакс эффектов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">⚠️ setTimeout</h3>
                  <p class="text-h7 font-weight-medium mb-2">Используйте для:</p>
                  <ul class="pl-4">
                    <li>Задержек выполнения</li>
                    <li>Debounce/Throttle</li>
                    <li>Таймеров обратного отсчета</li>
                    <li>Отложенной логики</li>
                    <li>API polling (с большими интервалами)</li>
                    <li>Неявных действий фона</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-error">❌ setInterval</h3>
                  <p class="text-h7 font-weight-medium mb-2">Избегайте для анимаций!</p>
                  <ul class="pl-4">
                    <li>Можно для: часов реального времени</li>
                    <li>Периодических проверок</li>
                    <li>Но для визуальных эффектов:</li>
                    <li class="text-error">❌ Нестабильный FPS</li>
                    <li class="text-error">❌ Тратит батарею</li>
                    <li class="text-error">❌ Не оптимизирован</li>
                    <li class="text-success"><strong>Используйте RAF!</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему requestAnimationFrame лучше setTimeout для анимаций?</p>
                <p class="font-weight-regular ma-0">
                  RAF синхронизирован с частотой обновления монитора (60/120/144 Hz), автоматически
                  останавливается на неактивных вкладках, батчит все коллбэки в один фрейм и выполняется
                  перед paint — это обеспечивает стабильные 60 FPS и экономию батареи. setTimeout
                  работает с фиксированной задержкой, не синхронизирован с рендерингом и тратит ресурсы впустую.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Где в Event Loop выполняется requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  RAF выполняется после microtasks и Layout, но перед Paint/Composite. Порядок:
                  Macrotask → Microtasks → Style Calc → Layout → <strong>RAF callbacks</strong> → Paint → Composite.
                  Это идеальное место для обновления анимаций — все изменения будут отрисованы в текущем фрейме.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое delta time и зачем его учитывать?</p>
                <p class="font-weight-regular ma-0">
                  Delta time — это время между фреймами в миллисекундах. Без его учета анимации идут
                  с разной скоростью на мониторах с разной частотой (60Hz vs 120Hz vs 144Hz).
                  Приращение должно зависеть от времени: <code>position += speed * (deltaTime / 1000)</code>,
                  а не от количества фреймов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отменить requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  RAF возвращает ID, который можно передать в <code>cancelAnimationFrame(id)</code>.
                  В React важно отменять RAF в cleanup функции useEffect, иначе анимация продолжит
                  работать после размонтирования компонента, вызывая утечки памяти.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с RAF на неактивных вкладках?</p>
                <p class="font-weight-regular ma-0">
                  Браузер автоматически приостанавливает RAF на неактивных вкладках, снижая частоту
                  вызовов до ~1 FPS (вместо 60 FPS). Это экономит CPU и батарею. setTimeout/setInterval
                  продолжают работать с полной частотой, тратя ресурсы впустую.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как RAF помогает избежать layout thrashing?</p>
                <p class="font-weight-regular ma-0">
                  Все RAF коллбэки выполняются батчем между Layout и Paint. Если правильно группировать
                  чтения (offsetHeight, getBoundingClientRect) перед записями (style.height), браузер
                  выполнит только один Layout вместо множественных пересчетов. setTimeout может вызывать
                  layout в любой момент, приводя к thrashing.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать RAF для серверного рендеринга?</p>
                <p class="font-weight-regular ma-0">
                  Нет, RAF — это браузерный API. В Node.js его нет. Для SSR нужно проверять окружение:
                  <code>typeof requestAnimationFrame !== 'undefined'</code> и использовать полифилл
                  или пропускать анимации на сервере.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать React компоненты с RAF?</p>
                <p class="font-weight-regular ma-0">
                  Не вызывать setState на каждом фрейме (60 раз в секунду) — это перегружает React.
                  Лучше throttle обновления до 30 FPS или использовать refs для изменения DOM напрямую
                  через <code>element.style.transform</code>, обновляя state только для критичных данных.
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
                    <li>Всегда учитывать delta time</li>
                    <li>Отменять RAF в cleanup (React)</li>
                    <li>Использовать transform вместо left/top</li>
                    <li>Батчить чтения и записи DOM</li>
                    <li>Использовать will-change для GPU</li>
                    <li>Throttle setState в React</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>setTimeout/setInterval для анимаций</li>
                    <li>Забывать cancelAnimationFrame</li>
                    <li>Игнорировать delta time</li>
                    <li>Layout thrashing (чтение/запись)</li>
                    <li>setState на каждом фрейме в React</li>
                    <li>Анимации без оптимизации GPU</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте DevTools Performance</li>
                    <li>Мониторьте FPS в production</li>
                    <li>Тестируйте на 120Hz/144Hz мониторах</li>
                    <li>Сглаживайте delta time</li>
                    <li>Используйте Web Workers для тяжелых вычислений</li>
                    <li>Профилируйте анимации</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение энергопотребления</h2>
            <v-card class="pa-4 mb-8">
              <h3 class="text-h6 font-weight-bold mb-3">CPU использование на неактивных вкладках</h3>
              <v-row>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="60" color="error" class="mb-2">mdi-battery-alert</v-icon>
                    <h4 class="font-weight-bold">setInterval</h4>
                    <v-progress-linear
                      :model-value="100"
                      color="error"
                      height="25"
                      class="mb-2"
                    >
                      <strong>100% CPU</strong>
                    </v-progress-linear>
                    <p class="text-body-2">Постоянно работает в фоне</p>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="60" color="warning" class="mb-2">mdi-battery-medium</v-icon>
                    <h4 class="font-weight-bold">setTimeout</h4>
                    <v-progress-linear
                      :model-value="95"
                      color="warning"
                      height="25"
                      class="mb-2"
                    >
                      <strong>95% CPU</strong>
                    </v-progress-linear>
                    <p class="text-body-2">Немного лучше, но всё равно тратит</p>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="60" color="success" class="mb-2">mdi-battery-high</v-icon>
                    <h4 class="font-weight-bold">requestAnimationFrame</h4>
                    <v-progress-linear
                      :model-value="5"
                      color="success"
                      height="25"
                      class="mb-2"
                    >
                      <strong>5% CPU</strong>
                    </v-progress-linear>
                    <p class="text-body-2">Автоматическая пауза</p>
                  </div>
                </v-col>
              </v-row>
              <v-alert color="success" variant="tonal" class="mt-4">
                RAF экономит <strong>95% CPU/батареи</strong> на неактивных вкладках по сравнению с setTimeout!
              </v-alert>
            </v-card>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>requestAnimationFrame</b> — это стандартный оптимальный способ создания плавных анимаций
              в браузере. Ключевые преимущества перед setTimeout/setInterval: синхронизация с частотой
              обновления монитора (60/120/144 Hz), автоматическая пауза на неактивных вкладках, батчинг
              всех коллбэков перед paint, отсутствие layout thrashing и экономия до 95% CPU/батареи.
              В Event Loop RAF выполняется между Layout и Paint — идеальное место для обновления визуальных
              изменений. Критически важно учитывать delta time для одинаковой скорости анимаций на разных
              мониторах и всегда отменять RAF в React cleanup для предотвращения утечек памяти.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame"
                target="_blank"
                class="mr-2">
                MDN requestAnimationFrame
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/animations-guide/"
                target="_blank"
                class="mr-2">
                Web.dev Animation Guide
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://developer.chrome.com/blog/renderingng/#requestanimationframe-callbacks"
                target="_blank">
                Chrome RenderingNG
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
