<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* ОСНОВЫ оптимизации анимаций */

/* ❌ ПЛОХО - вызывает reflow и repaint */
.slow-animation {
  transition:
    left 0.3s ease,      /* Layout - пересчет позиций */
    top 0.3s ease,       /* Layout - пересчет позиций */
    width 0.3s ease,     /* Layout - пересчет размеров */
    height 0.3s ease,    /* Layout - пересчет размеров */
    background 0.3s ease; /* Paint - перерисовка */
}

.slow-animation:hover {
  left: 100px;
  top: 50px;
  width: 200px;
  height: 150px;
  background: red;
}

/* ✅ ХОРОШО - только композитные слои */
.fast-animation {
  /* Создание композитного слоя */
  will-change: transform, opacity;
  transform: translateZ(0); /* GPU слой */

  transition:
    transform 0.3s ease,  /* Композитный слой */
    opacity 0.3s ease;    /* Композитный слой */
}

.fast-animation:hover {
  transform: translate(100px, 50px) scale(1.2);
  opacity: 0.8;
}

/* Оптимальные свойства для анимации */
.gpu-optimized {
  /* Только эти свойства не вызывают reflow/repaint */
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    filter 0.3s ease;
}
`

const snippet2 = `
/* WILL-CHANGE оптимизация */

/* ✅ Правильное использование will-change */
.will-change-optimized {
  /* Сообщаем браузеру о будущих изменениях */
  will-change: transform;
}

.will-change-optimized:hover {
  transform: scale(1.1) rotate(5deg);
}

/* ❌ Неправильное использование */
.will-change-overused {
  /* Не указывайте will-change на все элементы! */
  will-change: auto; /* бесполезно */
  will-change: transform, opacity, filter, background; /* слишком много */
}

/* JavaScript управление will-change */
/*
const element = document.querySelector('.animated-element');

// Установка перед анимацией
element.style.willChange = 'transform';

// Анимация
element.style.transform = 'translateX(100px)';

// Удаление после завершения
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});
*/

/* Автоматическое управление will-change */
.smart-will-change {
  transition: transform 0.3s ease;
}

.smart-will-change:hover {
  will-change: transform;
  transform: translateX(50px);
}

.smart-will-change:not(:hover) {
  will-change: auto;
}
`

const snippet3 = `
/* GPU ускорение трансформаций */

/* ✅ Принудительное создание композитного слоя */
.gpu-layer {
  /* Методы создания GPU слоя */
  transform: translateZ(0);     /* hack для GPU */
  transform: translate3d(0,0,0); /* 3D контекст */
  will-change: transform;       /* современный способ */
  backface-visibility: hidden;  /* старый hack */
}

/* 3D контекст для всех дочерних элементов */
.preserve-3d-container {
  transform-style: preserve-3d;
}

.preserve-3d-container .child {
  /* Автоматически получает GPU слой */
  transform: translateZ(10px);
  transition: transform 0.3s ease;
}

/* Оптимизация для мобильных устройств */
@media (max-width: 768px) {
  .mobile-optimized {
    /* Более простые трансформации на мобильных */
    transition: transform 0.2s ease-out;
  }

  .mobile-optimized:hover {
    /* Избегаем сложных 3D трансформаций */
    transform: scale(1.05); /* вместо rotate3d */
  }
}

/* Батчинг трансформаций */
.batched-transform {
  /* Объединение всех трансформаций */
  transform:
    translateX(0)
    translateY(0)
    rotate(0deg)
    scale(1);

  transition: transform 0.3s ease;
}

.batched-transform:hover {
  /* Все изменения в одной операции */
  transform:
    translateX(100px)
    translateY(50px)
    rotate(45deg)
    scale(1.2);
}
`

const snippet4 = `
/* СОДЕРЖАНИЕ (containment) для оптимизации */

/* CSS Containment API */
.contained-animation {
  /* Изоляция изменений */
  contain: layout style paint;

  /* Или более агрессивная изоляция */
  contain: strict; /* layout + style + paint + size */
}

.contained-animation .animated-child {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

/* Изоляция для списков с анимацией */
.animated-list {
  contain: layout paint;
}

.animated-list-item {
  contain: layout;
  transition: transform 0.2s ease;
}

.animated-list-item:hover {
  transform: translateY(-5px);
}

/* Оптимизация для больших списков */
.virtual-list-item {
  /* Изоляция каждого элемента */
  contain: strict;
  will-change: transform;

  /* Оптимизированная анимация */
  transition: transform 0.15s ease-out;
}

/* Содержание для модальных окон */
.modal-overlay {
  contain: layout style paint;
  backdrop-filter: blur(5px);
  transition: backdrop-filter 0.2s ease;
}

.modal-content {
  contain: layout paint;
  transform: scale(0.9) translateY(50px);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content.active {
  transform: scale(1) translateY(0);
}
`

const snippet5 = `
/* КОМПОЗИТНЫЕ слои и z-index */

/* Управление композитными слоями */
.layer-optimization {
  /* Создание нового слоя */
  transform: translateZ(0);
  z-index: 1;

  /* Изоляция стека */
  isolation: isolate;
}

/* Избегание лишних композитных слоев */
.avoid-layers {
  /* ❌ Не создавайте слои без необходимости */
  /* transform: translateZ(0); */

  /* ✅ Создавайте только при анимации */
  transition: transform 0.3s ease;
}

.avoid-layers:hover {
  will-change: transform;
  transform: translateY(-10px);
}

/* Оптимизация наложенных элементов */
.stacked-elements {
  position: relative;
  z-index: 0; /* создает новый контекст стека */
}

.stacked-elements .floating-element {
  position: absolute;
  transform: translateZ(0); /* композитный слой */
  transition: transform 0.2s ease;
}

/* Групповая оптимизация */
.group-container {
  /* Создание общего контекста для группы */
  transform-style: preserve-3d;
  will-change: transform;
}

.group-container .group-item {
  /* Наследуют 3D контекст */
  transform: translateZ(0);
  transition: transform 0.2s ease;
}

.group-container .group-item:nth-child(1) { transform: translateZ(10px); }
.group-container .group-item:nth-child(2) { transform: translateZ(20px); }
.group-container .group-item:nth-child(3) { transform: translateZ(30px); }
`

const snippet6 = `
/* ПРОИЗВОДИТЕЛЬНОСТЬ keyframe анимаций */

/* ✅ Оптимизированные keyframes */
@keyframes optimized-bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
    animation-timing-function: ease-out;
  }

  50% {
    transform: translateY(-20px) scale(1.05);
    animation-timing-function: ease-in;
  }
}

.optimized-bounce {
  will-change: transform;
  animation: optimized-bounce 0.6s ease-in-out;
}

/* ❌ Неоптимизированные keyframes */
@keyframes slow-bounce {
  0% { top: 0; left: 0; width: 100px; height: 100px; }
  50% { top: -20px; left: 10px; width: 110px; height: 110px; }
  100% { top: 0; left: 0; width: 100px; height: 100px; }
}

/* Оптимизация сложных анимаций */
@keyframes complex-optimized {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }

  25% {
    transform: translate3d(100px, -50px, 0) rotate(90deg) scale(1.1);
    opacity: 0.8;
  }

  75% {
    transform: translate3d(50px, 30px, 0) rotate(270deg) scale(0.9);
    opacity: 0.9;
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(360deg) scale(1);
    opacity: 1;
  }
}

.complex-animation {
  will-change: transform, opacity;
  animation: complex-optimized 2s ease-in-out infinite;
}

/* Оптимизация для 60fps */
@keyframes sixty-fps {
  /* Используем transform и opacity */
  from {
    transform: translateX(-100px) scale(0.5);
    opacity: 0;
  }

  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

.sixty-fps-animation {
  animation: sixty-fps 0.3s ease-out forwards;
  will-change: transform, opacity;
}
`

const snippet7 = `
/* REQUESTANIMATIONFRAME оптимизация */

// Оптимизированная анимация с RAF
class OptimizedAnimator {
  constructor(element) {
    this.element = element;
    this.isAnimating = false;
    this.animationId = null;
  }

  // Throttled animation updates
  updateTransform(x, y, scale, rotation) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animationId = requestAnimationFrame(() => {
        this.element.style.transform =
          \`translate3d(\${x}px, \${y}px, 0) scale(\${scale}) rotate(\${rotation}deg)\`;
        this.isAnimating = false;
      });
    }
  }

  // Batch multiple property changes
  batchUpdate(properties) {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.animationId = requestAnimationFrame(() => {
      const { x = 0, y = 0, scale = 1, rotation = 0, opacity = 1 } = properties;

      this.element.style.transform =
        \`translate3d(\${x}px, \${y}px, 0) scale(\${scale}) rotate(\${rotation}deg)\`;
      this.element.style.opacity = opacity;
    });
  }

  // Cleanup
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Оптимизированный параллакс
class OptimizedParallax {
  constructor() {
    this.elements = [];
    this.isScrolling = false;
  }

  addElement(element, speed) {
    this.elements.push({ element, speed });
  }

  handleScroll() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;

        this.elements.forEach(({ element, speed }) => {
          const yPos = scrollY * speed;
          element.style.transform = \`translate3d(0, \${yPos}px, 0)\`;
        });

        this.isScrolling = false;
      });
    }
  }
}

// Оптимизированная анимация по path
function optimizedPathAnimation(element, path, duration) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    // Get point on path
    const point = getPointOnPath(path, easeProgress);

    // Batch transform update
    element.style.transform =
      \`translate3d(\${point.x}px, \${point.y}px, 0) rotate(\${point.angle}deg)\`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
`

const snippet8 = `
/* INTERSECTION OBSERVER для ленивых анимаций */

// Оптимизация анимаций с Intersection Observer
class LazyAnimationManager {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }

  observe(element) {
    // Подготовка элемента
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';
    element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';

    this.observer.observe(element);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Запуск анимации
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';

        // Очистка will-change после анимации
        entry.target.addEventListener('transitionend', () => {
          entry.target.style.willChange = 'auto';
        }, { once: true });

        // Прекращаем наблюдение
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Использование
const animationManager = new LazyAnimationManager();
document.querySelectorAll('.lazy-animate').forEach(el => {
  animationManager.observe(el);
});

// Оптимизация для больших списков
class VirtualizedAnimationList {
  constructor(container, itemHeight) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.visibleItems = new Map();

    this.observer = new IntersectionObserver(
      this.handleVisibility.bind(this),
      { threshold: 0 }
    );
  }

  addItem(element, index) {
    // Виртуализация позиции
    element.style.position = 'absolute';
    element.style.top = \`\${index * this.itemHeight}px\`;
    element.style.transform = 'translateZ(0)'; // GPU слой
    element.style.contain = 'layout paint';

    this.observer.observe(element);
  }

  handleVisibility(entries) {
    entries.forEach(entry => {
      const element = entry.target;

      if (entry.isIntersecting) {
        // Включаем анимации для видимых элементов
        element.style.willChange = 'transform';
        this.visibleItems.set(element, true);
      } else {
        // Отключаем анимации для невидимых элементов
        element.style.willChange = 'auto';
        this.visibleItems.delete(element);
      }
    });
  }
}
`

const snippet9 = `
/* ПАМЯТЬ и утечки в анимациях */

// Менеджер анимаций с очисткой ресурсов
class AnimationResourceManager {
  constructor() {
    this.activeAnimations = new Set();
    this.observers = new Set();
    this.eventListeners = new Map();
  }

  // Регистрация анимации
  registerAnimation(element, animationConfig) {
    const animation = {
      element,
      config: animationConfig,
      cleanup: () => {
        element.style.willChange = 'auto';
        element.style.transform = '';
        element.style.transition = '';
      }
    };

    this.activeAnimations.add(animation);
    return animation;
  }

  // Безопасное удаление анимации
  removeAnimation(animation) {
    if (this.activeAnimations.has(animation)) {
      animation.cleanup();
      this.activeAnimations.delete(animation);
    }
  }

  // Очистка при размонтировании компонента
  cleanup() {
    // Очистка анимаций
    this.activeAnimations.forEach(animation => {
      this.removeAnimation(animation);
    });

    // Очистка observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });

    // Очистка event listeners
    this.eventListeners.forEach((listener, element) => {
      element.removeEventListener(listener.event, listener.handler);
    });

    this.activeAnimations.clear();
    this.observers.clear();
    this.eventListeners.clear();
  }

  // Добавление слушателя с автоочисткой
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.set(element, { event, handler });
  }
}

// React Hook для оптимизированных анимаций
function useOptimizedAnimation() {
  const managerRef = useRef(null);

  useEffect(() => {
    managerRef.current = new AnimationResourceManager();

    return () => {
      managerRef.current?.cleanup();
    };
  }, []);

  const animate = useCallback((element, config) => {
    return managerRef.current?.registerAnimation(element, config);
  }, []);

  return { animate };
}

// Пул объектов для анимаций
class TransformPool {
  constructor(size = 100) {
    this.pool = [];
    this.index = 0;

    // Предсоздание объектов
    for (let i = 0; i < size; i++) {
      this.pool.push({
        x: 0, y: 0, z: 0,
        scaleX: 1, scaleY: 1, scaleZ: 1,
        rotateX: 0, rotateY: 0, rotateZ: 0
      });
    }
  }

  get() {
    const obj = this.pool[this.index];
    this.index = (this.index + 1) % this.pool.length;
    return obj;
  }

  // Сброс объекта для повторного использования
  reset(obj) {
    obj.x = obj.y = obj.z = 0;
    obj.scaleX = obj.scaleY = obj.scaleZ = 1;
    obj.rotateX = obj.rotateY = obj.rotateZ = 0;
  }
}

const transformPool = new TransformPool();
`

const snippet10 = `
/* ПРОФИЛИРОВАНИЕ и мониторинг производительности */

// Класс для мониторинга производительности анимаций
class AnimationPerformanceMonitor {
  constructor() {
    this.frameStart = 0;
    this.frameCount = 0;
    this.fps = 0;
    this.lastTime = performance.now();
    this.isMonitoring = false;
  }

  start() {
    this.isMonitoring = true;
    this.monitor();
  }

  monitor() {
    if (!this.isMonitoring) return;

    this.frameStart = performance.now();

    requestAnimationFrame(() => {
      const currentTime = performance.now();
      const delta = currentTime - this.lastTime;

      this.frameCount++;

      if (delta >= 1000) { // Каждую секунду
        this.fps = Math.round((this.frameCount * 1000) / delta);
        console.log(\`FPS: \${this.fps}\`);

        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      this.monitor();
    });
  }

  stop() {
    this.isMonitoring = false;
  }
}

// Функция для тестирования производительности анимации
function benchmarkAnimation(animationFunction, iterations = 1000) {
  const startTime = performance.now();

  for (let i = 0; i < iterations; i++) {
    animationFunction();
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(\`Animation benchmark: \${duration.toFixed(2)}ms for \${iterations} iterations\`);
  console.log(\`Average per iteration: \${(duration / iterations).toFixed(4)}ms\`);

  return duration;
}

// Performance Observer для анимаций
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    entries.forEach(entry => {
      if (entry.entryType === 'measure') {
        console.log(\`Animation measure: \${entry.name} took \${entry.duration.toFixed(2)}ms\`);
      }
    });
  });

  observer.observe({ entryTypes: ['measure'] });
}

// Функция для профилирования анимации
function profileAnimation(name, animationFunction) {
  performance.mark(\`\${name}-start\`);

  return new Promise((resolve) => {
    animationFunction(() => {
      performance.mark(\`\${name}-end\`);
      performance.measure(name, \`\${name}-start\`, \`\${name}-end\`);
      resolve();
    });
  });
}

// Автоматическое определение лучшей стратегии анимации
class AdaptiveAnimationStrategy {
  constructor() {
    this.deviceCapabilities = this.detectDeviceCapabilities();
  }

  detectDeviceCapabilities() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    return {
      hasWebGL: !!gl,
      isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent),
      hasRAF: 'requestAnimationFrame' in window,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      devicePixelRatio: window.devicePixelRatio || 1
    };
  }

  getOptimalAnimationConfig() {
    const { hasWebGL, isMobile, hardwareConcurrency } = this.deviceCapabilities;

    if (isMobile) {
      return {
        duration: 200,  // Короче на мобильных
        easing: 'ease-out',
        useGPU: true,
        complexTransforms: false
      };
    }

    if (hasWebGL && hardwareConcurrency > 4) {
      return {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        useGPU: true,
        complexTransforms: true
      };
    }

    return {
      duration: 250,
      easing: 'ease',
      useGPU: false,
      complexTransforms: false
    };
  }
}
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')
const highlightedSnippet8 = ref('')
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.css, 'css')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.css, 'css')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Как оптимизировать анимации с трансформациями для улучшения производительности?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Оптимизация анимаций с трансформациями</b> — критически важная тема для фронтенд-разработчиков.
              Правильная оптимизация позволяет достичь плавных 60fps анимаций, снизить нагрузку на CPU/GPU
              и улучшить пользовательский опыт, особенно на слабых устройствах.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы оптимизации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Медленные свойства</h3>
                  <ul class="pl-4">
                    <li>left, top, right, bottom</li>
                    <li>width, height</li>
                    <li>margin, padding</li>
                    <li>border-width</li>
                    <li>background-position</li>
                  </ul>
                  <p class="mt-2 text-caption">Вызывают Layout + Paint</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">⚠️ Средние свойства</h3>
                  <ul class="pl-4">
                    <li>background-color</li>
                    <li>color</li>
                    <li>border-color</li>
                    <li>box-shadow</li>
                    <li>outline</li>
                  </ul>
                  <p class="mt-2 text-caption">Вызывают Paint</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Быстрые свойства</h3>
                  <ul class="pl-4">
                    <li>transform</li>
                    <li>opacity</li>
                    <li>filter</li>
                    <li>clip-path</li>
                    <li>perspective</li>
                  </ul>
                  <p class="mt-2 text-caption">Только Composite</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Will-change оптимизация</h2>
            <p class="font-weight-regular mb-4">
              Свойство <code>will-change</code> сообщает браузеру о планируемых изменениях элемента,
              позволяя заранее подготовить оптимизации:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">GPU ускорение</h2>
            <p class="font-weight-regular mb-4">
              Принудительное создание композитных слоев для переноса вычислений на GPU:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CSS Containment для изоляции</h2>
            <p class="font-weight-regular mb-4">
              Свойство <code>contain</code> изолирует изменения элемента от остальной страницы:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Композитные слои и z-index</h2>
            <p class="font-weight-regular mb-4">
              Правильное управление слоями для минимизации reflow и repaint:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация keyframe анимаций</h2>
            <p class="font-weight-regular mb-4">
              Создание плавных 60fps анимаций с помощью оптимизированных keyframes:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">JavaScript оптимизации</h2>
            <p class="font-weight-regular mb-4">
              Использование requestAnimationFrame и батчинг обновлений:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Intersection Observer для ленивых анимаций</h2>
            <p class="font-weight-regular mb-4">
              Запуск анимаций только когда элементы видимы пользователю:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Управление памятью</h2>
            <p class="font-weight-regular mb-4">
              Предотвращение утечек памяти и оптимизация ресурсов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Профилирование и мониторинг</h2>
            <p class="font-weight-regular mb-4">
              Инструменты для измерения и оптимизации производительности анимаций:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов к оптимизации</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Техника</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Сложность</th>
                <th class="text-left font-weight-bold">Поддержка</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Transform + opacity</b></td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">Отлично</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">Низкая</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">100%</v-chip>
                </td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Will-change</b></td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">Отлично</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="warning">Средняя</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">95%</v-chip>
                </td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Containment</b></td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">Отлично</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="warning">Средняя</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="warning">85%</v-chip>
                </td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>RequestAnimationFrame</b></td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">Отлично</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="error">Высокая</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">100%</v-chip>
                </td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Intersection Observer</b></td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="warning">Хорошо</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="warning">Средняя</v-chip>
                </td>
                <td class="pt-2 pb-2">
                  <v-chip size="small" color="success">95%</v-chip>
                </td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему transform быстрее чем изменение left/top?</p>
                <p class="font-weight-regular ma-0">
                  Transform работает на композитном слое (только Composite), а left/top требуют
                  полного пересчета layout → paint → composite. Композитный слой обрабатывается GPU.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между will-change и translateZ(0)?</p>
                <p class="font-weight-regular ma-0">
                  will-change - современный стандартный способ, translateZ(0) - хак для создания 3D контекста.
                  will-change более семантичен и позволяет браузеру лучше оптимизировать.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  Для JavaScript анимаций, параллакс эффектов, сложной интерактивности.
                  Синхронизирует обновления с refresh rate монитора (обычно 60fps).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое композитный слой и как он создается?</p>
                <p class="font-weight-regular ma-0">
                  Отдельный слой на GPU для независимой обработки. Создается через 3D transforms,
                  will-change, opacity < 1, filters, position: fixed и другие свойства.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как измерить производительность анимаций?</p>
                <p class="font-weight-regular ma-0">
                  Chrome DevTools (Performance tab), FPS meter, Performance API,
                  frame timing в консоли. Целевой показатель - стабильные 60fps.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем проблема слишком многих композитных слоев?</p>
                <p class="font-weight-regular ma-0">
                  Каждый слой потребляет GPU память. Много слоев может вызвать memory pressure
                  и замедлить анимации. Используйте will-change осторожно.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Checklist оптимизации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Лучшие практики</h3>
                  <ul class="pl-4">
                    <li>Используйте только transform и opacity</li>
                    <li>Добавляйте will-change перед анимацией</li>
                    <li>Убирайте will-change после завершения</li>
                    <li>Группируйте изменения в одном transform</li>
                    <li>Используйте CSS transitions для простых случаев</li>
                    <li>Применяйте contain для изоляции</li>
                    <li>Тестируйте на слабых устройствах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Чего избегать</h3>
                  <ul class="pl-4">
                    <li>Анимация layout свойств (width, height, top, left)</li>
                    <li>Анимация paint свойств (background, color)</li>
                    <li>Постоянный will-change на всех элементах</li>
                    <li>Синхронное чтение computed styles в цикле</li>
                    <li>Сложные селекторы в анимированных элементах</li>
                    <li>Много параллельных анимаций</li>
                    <li>Игнорирование очистки event listeners</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные возможности</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Web Animations API</h3>
                  <p class="text-body-2 mb-2">
                    Современная замена CSS анимаций и jQuery animate()
                  </p>
                  <v-chip size="small" class="ma-1">element.animate()</v-chip>
                  <v-chip size="small" class="ma-1">KeyframeEffect</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">CSS Houdini</h3>
                  <p class="text-body-2 mb-2">
                    Низкоуровневый доступ к CSS рендерингу
                  </p>
                  <v-chip size="small" class="ma-1">Paint API</v-chip>
                  <v-chip size="small" class="ma-1">Animation Worklet</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">OffscreenCanvas</h3>
                  <p class="text-body-2 mb-2">
                    Canvas анимации в Web Workers
                  </p>
                  <v-chip size="small" class="ma-1">Worker threads</v-chip>
                  <v-chip size="small" class="ma-1">Non-blocking</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Оптимизация анимаций с трансформациями - ключевой навык для создания плавного UX.
              Основные принципы: использование композитных слоев (transform, opacity), правильное
              применение will-change, изоляция через contain, батчинг обновлений и профилирование
              производительности. Цель - стабильные 60fps на всех устройствах.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://web.dev/animations-guide/"
                target="_blank">
                Web.dev Animation Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
