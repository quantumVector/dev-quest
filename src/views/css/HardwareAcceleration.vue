<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* ОСНОВЫ аппаратного ускорения */

/* ❌ CPU анимации - медленные */
.cpu-animation {
  /* Эти свойства обрабатываются процессором */
  transition:
    left 0.3s ease,        /* Layout на CPU */
    top 0.3s ease,         /* Layout на CPU */
    width 0.3s ease,       /* Layout на CPU */
    background 0.3s ease;  /* Paint на CPU */
}

.cpu-animation:hover {
  left: 100px;
  top: 50px;
  width: 200px;
  background: blue;
}

/* ✅ GPU анимации - быстрые */
.gpu-animation {
  /* Принудительное создание композитного слоя */
  transform: translateZ(0);     /* 3D контекст для GPU */
  will-change: transform;       /* Подсказка браузеру */

  transition: transform 0.3s ease;
}

.gpu-animation:hover {
  /* Все трансформации обрабатываются GPU */
  transform:
    translateX(100px)
    translateY(50px)
    scale(1.2)
    rotate(45deg);
}

/* Создание композитного слоя разными способами */
.gpu-layer-methods {
  /* Любой из этих способов создает GPU слой */
  transform: translateZ(0);        /* hack с 3D контекстом */
  transform: translate3d(0,0,0);   /* явный 3D контекст */
  will-change: transform;          /* современный способ */
  opacity: 0.99;                   /* opacity < 1 */
  position: fixed;                 /* fixed позиционирование */
  backface-visibility: hidden;     /* старый webkit hack */
  filter: blur(0);                 /* filters создают слой */
}
`

const snippet2 = `
/* МЕХАНИЗМ работы аппаратного ускорения */

/* Этапы рендеринга без GPU ускорения */
.no-gpu-rendering {
  /* 1. Layout (Reflow) - пересчет позиций на CPU */
  /* 2. Paint - растеризация на CPU */
  /* 3. Composite - композиция слоев на CPU */

  transition: left 0.3s ease, background 0.3s ease;
}

/* Этапы рендеринга с GPU ускорением */
.gpu-rendering {
  /* 1. Layout - ПРОПУСКАЕТСЯ */
  /* 2. Paint - ПРОПУСКАЕТСЯ */
  /* 3. Composite - только на GPU */

  will-change: transform;
  transition: transform 0.3s ease;
}

/* Оптимальные свойства для GPU */
.gpu-optimized-properties {
  /* Эти свойства полностью обрабатываются GPU */
  transition:
    transform 0.3s ease,      /* позиция, размер, поворот */
    opacity 0.3s ease,        /* прозрачность */
    filter 0.3s ease,         /* визуальные эффекты */
    clip-path 0.3s ease,      /* обрезка */
    perspective 0.3s ease;    /* 3D перспектива */
}

/* Композитные слои и их влияние */
.composite-layer-example {
  /* Этот элемент создает новый композитный слой */
  transform: translateZ(0);

  /* Дочерние элементы наследуют оптимизации */
  contain: layout paint;
}

.composite-layer-example .child {
  /* Анимации дочерних элементов автоматически ускоряются */
  transition: transform 0.2s ease;
}

.composite-layer-example .child:hover {
  transform: translateY(-10px);
}
`

const snippet3 = `
/* ИНДИКАТОРЫ композитных слоев */

/* Способы принудительного создания GPU слоя */
.force-gpu-layer {
  /* Метод 1: 3D трансформации */
  transform: translateZ(0);        /* минимальный 3D контекст */
  transform: translate3d(0,0,0);   /* явный 3D */
  transform: rotateZ(0);           /* 3D поворот */

  /* Метод 2: will-change (предпочтительный) */
  will-change: transform;

  /* Метод 3: opacity */
  opacity: 0.999;                  /* почти непрозрачный */

  /* Метод 4: filters */
  filter: blur(0px);               /* фильтр без эффекта */

  /* Метод 5: position fixed */
  position: fixed;

  /* Метод 6: webkit hack */
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
}

/* Проверка создания слоя в DevTools */
.layer-debug {
  /* Добавьте временную рамку для визуализации */
  outline: 1px solid red;

  /* Используйте will-change для создания слоя */
  will-change: transform;

  /* Анимация для тестирования */
  transition: transform 0.3s ease;
}

.layer-debug:hover {
  transform: scale(1.1);
}

/* Оптимизация для разных устройств */
@media (max-width: 768px) {
  .mobile-gpu-optimization {
    /* На мобильных устройствах GPU память ограничена */
    will-change: auto; /* отключаем по умолчанию */
  }

  .mobile-gpu-optimization:hover,
  .mobile-gpu-optimization:focus,
  .mobile-gpu-optimization.animating {
    /* Включаем только при необходимости */
    will-change: transform;
  }
}

@media (min-width: 1200px) {
  .desktop-gpu-optimization {
    /* На десктопах можем использовать больше GPU слоев */
    will-change: transform;
    transform: translateZ(0);
  }
}
`

const snippet4 = `
/* ПРОИЗВОДИТЕЛЬНОСТЬ и memory usage */

/* ❌ Плохо - создание лишних GPU слоев */
.memory-waste {
  /* НЕ делайте так - каждый элемент создает слой */
  * {
    will-change: transform;
    transform: translateZ(0);
  }
}

/* ✅ Хорошо - селективное создание слоев */
.memory-efficient {
  /* Создаем слои только для анимируемых элементов */
  transition: transform 0.3s ease;
}

.memory-efficient:hover,
.memory-efficient.is-animating {
  will-change: transform;
}

.memory-efficient:not(:hover):not(.is-animating) {
  will-change: auto; /* очищаем после анимации */
}

/* Управление GPU памятью */
.gpu-memory-management {
  /* Группировка связанных анимаций */
  transform-style: preserve-3d;
}

.gpu-memory-management .group-item {
  /* Элементы группы разделяют 3D контекст */
  transform: translateZ(var(--z-offset, 0));
  transition: transform 0.2s ease;
}

/* Батчинг GPU операций */
.batched-gpu-operations {
  /* Объединяем все трансформации в одну операцию */
  transform:
    translateX(var(--x, 0))
    translateY(var(--y, 0))
    translateZ(var(--z, 0))
    scale(var(--scale, 1))
    rotate(var(--rotation, 0deg));

  transition: transform 0.3s ease;
}

/* Оптимизация для списков */
.gpu-list-optimization {
  /* Контейнер создает один общий контекст */
  transform-style: preserve-3d;
  contain: layout paint;
}

.gpu-list-optimization .list-item {
  /* Элементы используют общий GPU контекст */
  transform: translateZ(0);
  contain: layout;
  transition: transform 0.15s ease;
}

.gpu-list-optimization .list-item:hover {
  transform: translateZ(10px) scale(1.02);
}
`

const snippet5 = `
/* СОВМЕСТИМОСТЬ браузеров и fallbacks */

/* Прогрессивное улучшение с GPU ускорением */
.progressive-gpu-enhancement {
  /* Базовая анимация без GPU */
  transition: opacity 0.3s ease;
}

/* Проверка поддержки 3D трансформаций */
@supports (transform: translateZ(0)) {
  .progressive-gpu-enhancement {
    /* Включаем GPU ускорение если поддерживается */
    will-change: transform, opacity;
    transform: translateZ(0);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

/* Проверка поддержки will-change */
@supports (will-change: transform) {
  .modern-gpu-support {
    will-change: transform;
  }
}

@supports not (will-change: transform) {
  .fallback-gpu-support {
    /* Fallback для старых браузеров */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

/* Vendor prefixes для максимальной совместимости */
.cross-browser-gpu {
  /* WebKit (Safari, старый Chrome) */
  -webkit-transform: translateZ(0);
  -webkit-transition: -webkit-transform 0.3s ease;
  -webkit-backface-visibility: hidden;

  /* Mozilla (Firefox) */
  -moz-transform: translateZ(0);
  -moz-transition: -moz-transform 0.3s ease;

  /* Standard */
  transform: translateZ(0);
  transition: transform 0.3s ease;
  backface-visibility: hidden;
}

/* Обнаружение GPU поддержки через JavaScript */
/*
// Проверка поддержки WebGL (индикатор GPU возможностей)
function hasGPUSupport() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') ||
             canvas.getContext('experimental-webgl');
  return !!gl;
}

// Условное применение GPU оптимизаций
if (hasGPUSupport()) {
  document.body.classList.add('gpu-enabled');
} else {
  document.body.classList.add('gpu-disabled');
}
*/

.gpu-enabled .enhanced-animation {
  will-change: transform;
  transform: translateZ(0);
}

.gpu-disabled .enhanced-animation {
  /* Более простые анимации для устройств без GPU */
  transition: opacity 0.3s ease;
}
`

const snippet6 = `
/* МОНИТОРИНГ GPU производительности */

// Класс для мониторинга GPU нагрузки
class GPUPerformanceMonitor {
  constructor() {
    this.layerCount = 0;
    this.memoryUsage = 0;
    this.performanceObserver = null;
    this.isMonitoring = false;
  }

  // Подсчет композитных слоев
  countCompositeLayers() {
    const elements = document.querySelectorAll('*');
    let layerCount = 0;

    elements.forEach(el => {
      const style = getComputedStyle(el);
      const hasLayer =
        style.transform !== 'none' ||
        style.willChange !== 'auto' ||
        style.opacity !== '1' ||
        style.filter !== 'none' ||
        style.position === 'fixed';

      if (hasLayer) layerCount++;
    });

    this.layerCount = layerCount;
    return layerCount;
  }

  // Мониторинг frame rate
  startFPSMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log(\`GPU FPS: \${fps}, Layers: \${this.layerCount}\`);

        frameCount = 0;
        lastTime = currentTime;
      }

      if (this.isMonitoring) {
        requestAnimationFrame(measureFPS);
      }
    };

    this.isMonitoring = true;
    requestAnimationFrame(measureFPS);
  }

  // Обнаружение GPU throttling
  detectGPUThrottling() {
    const startTime = performance.now();
    let frameCount = 0;

    const testFrames = () => {
      frameCount++;
      const elapsed = performance.now() - startTime;

      if (elapsed >= 1000) {
        const fps = frameCount;

        if (fps < 30) {
          console.warn('GPU throttling detected - low frame rate');
          this.optimizeForLowGPU();
        } else if (fps < 45) {
          console.log('Moderate GPU performance detected');
          this.optimizeForMediumGPU();
        } else {
          console.log('Good GPU performance detected');
        }

        return;
      }

      requestAnimationFrame(testFrames);
    };

    requestAnimationFrame(testFrames);
  }

  // Оптимизация для слабого GPU
  optimizeForLowGPU() {
    document.body.classList.add('low-gpu-mode');

    // Отключаем сложные анимации
    const complexElements = document.querySelectorAll('.gpu-intensive');
    complexElements.forEach(el => {
      el.style.willChange = 'auto';
      el.style.transform = 'none';
    });
  }

  // Оптимизация для среднего GPU
  optimizeForMediumGPU() {
    document.body.classList.add('medium-gpu-mode');

    // Упрощаем анимации
    const elements = document.querySelectorAll('[will-change="transform"]');
    elements.forEach(el => {
      if (!el.matches(':hover')) {
        el.style.willChange = 'auto';
      }
    });
  }

  stopMonitoring() {
    this.isMonitoring = false;
  }
}

// Автоматическая оптимизация GPU использования
class AdaptiveGPUManager {
  constructor() {
    this.activeAnimations = new Set();
    this.gpuBudget = this.calculateGPUBudget();
  }

  calculateGPUBudget() {
    // Примерная оценка GPU возможностей
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) return 0;

    const renderer = gl.getParameter(gl.RENDERER);
    const vendor = gl.getParameter(gl.VENDOR);

    // Простая эвристика для определения GPU мощности
    if (renderer.includes('Intel')) return 10;      // встроенная графика
    if (renderer.includes('NVIDIA') || renderer.includes('AMD')) return 50; // дискретная

    return 20; // по умолчанию
  }

  requestGPUAnimation(element, priority = 1) {
    if (this.activeAnimations.size >= this.gpuBudget) {
      // Отклоняем анимацию если превышен бюджет
      console.warn('GPU budget exceeded, falling back to CPU animation');
      return false;
    }

    element.style.willChange = 'transform';
    this.activeAnimations.add(element);

    return true;
  }

  releaseGPUAnimation(element) {
    element.style.willChange = 'auto';
    this.activeAnimations.delete(element);
  }
}
`

const snippet7 = `
/* ПРАКТИЧЕСКИЕ примеры оптимизации */

/* Оптимизированный слайдер */
.gpu-slider {
  /* Контейнер создает GPU контекст */
  transform: translateZ(0);
  contain: layout paint;
  overflow: hidden;
}

.gpu-slider-track {
  /* Трек слайдера на GPU */
  will-change: transform;
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Аппаратное ускорение для плавности */
  backface-visibility: hidden;
  perspective: 1000px;
}

.gpu-slider-item {
  /* Элементы слайдера */
  transform: translateZ(0);
  contain: layout;
}

/* Оптимизированный параллакс */
.gpu-parallax-container {
  /* 3D контекст для всех параллакс элементов */
  transform-style: preserve-3d;
  perspective: 1000px;
}

.gpu-parallax-layer {
  /* Каждый слой на GPU с разной скоростью */
  transform: translateZ(calc(var(--layer-index) * -100px))
             scale(calc(1 + var(--layer-index) * 0.1));

  /* Плавное обновление через CSS переменные */
  transition: transform 0.1s linear;
}

/* GPU анимированные карточки */
.gpu-card-grid {
  display: grid;
  gap: 20px;
  contain: layout paint;
}

.gpu-card {
  /* Подготовка к анимации */
  transform: translateZ(0) scale(1);
  transition: transform 0.2s ease;
  will-change: auto; /* по умолчанию выключено */

  /* Оптимизация для тач-устройств */
  touch-action: manipulation;
}

.gpu-card:hover {
  /* Включаем GPU только при взаимодействии */
  will-change: transform;
  transform: translateZ(10px) scale(1.05);
}

.gpu-card:not(:hover) {
  /* Выключаем GPU когда не нужно */
  will-change: auto;
}

/* Оптимизированные модальные окна */
.gpu-modal-overlay {
  /* Фон модального окна */
  transform: translateZ(0);
  backdrop-filter: blur(5px);
  transition: opacity 0.2s ease, backdrop-filter 0.2s ease;
}

.gpu-modal-content {
  /* Контент модального окна */
  will-change: transform, opacity;
  transform: translateZ(0) scale(0.9) translateY(50px);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gpu-modal-content.active {
  transform: translateZ(0) scale(1) translateY(0);
}

/* Оптимизированные загрузчики */
.gpu-loader {
  /* Спиннер с GPU ускорением */
  will-change: transform;
  transform: translateZ(0);
  animation: gpu-spin 1s linear infinite;
}

@keyframes gpu-spin {
  from { transform: translateZ(0) rotate(0deg); }
  to   { transform: translateZ(0) rotate(360deg); }
}

/* Прогресс бар на GPU */
.gpu-progress-bar {
  transform: translateZ(0);
  contain: layout paint;
}

.gpu-progress-fill {
  will-change: transform;
  transform: translateX(-100%) translateZ(0);
  transition: transform 0.3s ease;
}

.gpu-progress-fill.progress-50 {
  transform: translateX(-50%) translateZ(0);
}

.gpu-progress-fill.progress-100 {
  transform: translateX(0) translateZ(0);
}
`

const snippet8 = `
/* ОТЛАДКА GPU производительности */

/* CSS для визуализации композитных слоев */
.debug-composite-layers {
  /* Временные стили для отладки */
  outline: 2px solid red !important;
  outline-offset: 2px;
}

.debug-composite-layers::after {
  content: "GPU Layer";
  position: absolute;
  top: -20px;
  left: 0;
  background: red;
  color: white;
  padding: 2px 6px;
  font-size: 10px;
  pointer-events: none;
}

/* JavaScript для отладки GPU */
// Утилиты для анализа GPU использования
class GPUDebugger {
  constructor() {
    this.originalLog = console.log;
    this.layerCount = 0;
    this.debugMode = false;
  }

  enableDebugMode() {
    this.debugMode = true;
    this.addLayerVisualization();
    this.monitorWillChange();
  }

  // Визуализация всех композитных слоев
  addLayerVisualization() {
    const style = document.createElement('style');
    style.textContent = \`
      [data-gpu-layer="true"] {
        outline: 2px solid rgba(255, 0, 0, 0.5) !important;
        outline-offset: 2px;
      }

      [data-gpu-layer="true"]::before {
        content: "GPU";
        position: absolute;
        top: -15px;
        left: 0;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 1px 4px;
        font-size: 9px;
        z-index: 10000;
        pointer-events: none;
      }
    \`;
    document.head.appendChild(style);

    this.updateLayerVisualization();
  }

  // Обновление визуализации слоев
  updateLayerVisualization() {
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
      const style = getComputedStyle(el);
      const hasGPULayer =
        style.transform !== 'none' ||
        style.willChange !== 'auto' ||
        style.opacity !== '1' ||
        style.filter !== 'none' ||
        style.position === 'fixed';

      el.dataset.gpuLayer = hasGPULayer;
    });

    // Подсчет слоев
    const gpuLayers = document.querySelectorAll('[data-gpu-layer="true"]');
    console.log(\`Total GPU layers: \${gpuLayers.length}\`);
  }

  // Мониторинг изменений will-change
  monitorWillChange() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' &&
            (mutation.attributeName === 'style' ||
             mutation.attributeName === 'class')) {
          this.updateLayerVisualization();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style', 'class']
    });
  }

  // Анализ GPU памяти
  analyzeGPUMemory() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    if (gl) {
      const memInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (memInfo) {
        const renderer = gl.getParameter(memInfo.UNMASKED_RENDERER_WEBGL);
        const vendor = gl.getParameter(memInfo.UNMASKED_VENDOR_WEBGL);

        console.log('GPU Info:', { renderer, vendor });
      }

      // Примерная оценка доступной GPU памяти
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      const maxViewport = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

      console.log('GPU Capabilities:', {
        maxTextureSize,
        maxViewport,
        estimatedMemory: (maxTextureSize * maxTextureSize * 4) / (1024 * 1024) + 'MB'
      });
    }
  }

  // Профилирование анимаций
  profileAnimation(name, element, duration = 1000) {
    const startTime = performance.now();
    let frameCount = 0;
    let minFrameTime = Infinity;
    let maxFrameTime = 0;
    let lastFrameTime = startTime;

    const measureFrame = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastFrameTime;

      if (frameTime > 0) {
        frameCount++;
        minFrameTime = Math.min(minFrameTime, frameTime);
        maxFrameTime = Math.max(maxFrameTime, frameTime);
      }

      lastFrameTime = currentTime;

      if (currentTime - startTime < duration) {
        requestAnimationFrame(measureFrame);
      } else {
        const avgFrameTime = (currentTime - startTime) / frameCount;
        const fps = 1000 / avgFrameTime;

        console.log(\`Animation Profile [\${name}]:\`, {
          averageFPS: fps.toFixed(1),
          minFrameTime: minFrameTime.toFixed(2) + 'ms',
          maxFrameTime: maxFrameTime.toFixed(2) + 'ms',
          totalFrames: frameCount,
          jankFrames: frameCount - Math.floor(fps * duration / 1000)
        });
      }
    };

    requestAnimationFrame(measureFrame);
  }
}

// Использование отладчика
const gpuDebugger = new GPUDebugger();

// В development режиме
if (process.env.NODE_ENV === 'development') {
  gpuDebugger.enableDebugMode();

  // Глобальный доступ для консоли
  window.gpuDebugger = gpuDebugger;
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

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.css, 'css')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.css, 'css')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Как использование аппаратного ускорения (hardware acceleration) может влиять на анимации с помощью трансформаций?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Аппаратное ускорение</b> — это технология, которая переносит вычисления анимаций
              с центрального процессора (CPU) на графический процессор (GPU). Это кардинально
              улучшает производительность анимаций, особенно трансформаций, позволяя достичь
              плавных 60fps даже на слабых устройствах.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы аппаратного ускорения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ CPU анимации</h3>
                  <ul class="pl-4">
                    <li><strong>Layout</strong> - пересчет позиций</li>
                    <li><strong>Paint</strong> - растеризация на CPU</li>
                    <li><strong>Composite</strong> - композиция на CPU</li>
                    <li>Блокируют основной поток</li>
                    <li>Ограничены скоростью CPU</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ GPU анимации</h3>
                  <ul class="pl-4">
                    <li><strong>Composite</strong> - только на GPU</li>
                    <li>Пропускают Layout и Paint</li>
                    <li>Параллельная обработка</li>
                    <li>Не блокируют основной поток</li>
                    <li>60fps+ производительность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Создание композитных слоев</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Механизм работы GPU ускорения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Способы создания GPU слоев</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Управление GPU памятью</h2>
            <v-alert type="warning" class="mb-4">
              <strong>Важно:</strong> Каждый композитный слой потребляет GPU память.
              Создавайте их только для активных анимаций!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Совместимость и fallbacks</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Мониторинг производительности GPU</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры оптимизации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка GPU производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимальные свойства для GPU</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Свойство</th>
                <th class="text-left font-weight-bold">GPU ускорение</th>
                <th class="text-left font-weight-bold">Производительность</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>transform</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полная</v-chip></td>
                <td class="pt-2 pb-2">Отличная - только Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>opacity</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полная</v-chip></td>
                <td class="pt-2 pb-2">Отличная - только Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>filter</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полная</v-chip></td>
                <td class="pt-2 pb-2">Хорошая - может требовать Paint</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>clip-path</code></td>
                <td class="pt-2 pb-2"><v-chip color="warning" size="small">⚠️ Частичная</v-chip></td>
                <td class="pt-2 pb-2">Средняя - зависит от сложности</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>left/top</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Плохая - Layout + Paint + Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>width/height</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Плохая - Layout + Paint + Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>background</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Средняя - Paint + Composite</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Часто задаваемые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как заставить браузер использовать GPU для анимации?</p>
                <p class="font-weight-regular ma-0">
                  Создать композитный слой через <code>will-change: transform</code>, <code>transform: translateZ(0)</code>
                  или <code>transform: translate3d(0,0,0)</code>. Использовать только GPU-оптимизированные свойства.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между transform и изменением left/top?</p>
                <p class="font-weight-regular ma-0">
                  <code>transform</code> работает на GPU (только Composite этап), <code>left/top</code>
                  запускают Layout → Paint → Composite на CPU. Transform в 10-100 раз быстрее.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое композитный слой?</p>
                <p class="font-weight-regular ma-0">
                  Отдельный слой рендеринга, который обрабатывается GPU независимо от других слоев.
                  Позволяет анимировать элементы без пересчета остальной страницы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ стоит использовать GPU ускорение?</p>
                <p class="font-weight-regular ma-0">
                  На слабых мобильных устройствах с ограниченной GPU памятью, для статических элементов,
                  когда создается слишком много композитных слоев (layer explosion).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить использование GPU в DevTools?</p>
                <p class="font-weight-regular ma-0">
                  Chrome DevTools → Rendering → Layer borders/Composited layer borders.
                  Performance tab → записать анимацию → проверить GPU activity и Frames.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое "layer explosion"?</p>
                <p class="font-weight-regular ma-0">
                  Создание слишком большого количества композитных слоев, что приводит к исчерпанию
                  GPU памяти и падению производительности. Решается селективным использованием will-change.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Делайте</h3>
                  <ul class="pl-4">
                    <li>Используйте <code>will-change: transform</code></li>
                    <li>Анимируйте только transform и opacity</li>
                    <li>Очищайте will-change после анимации</li>
                    <li>Группируйте анимации в общие слои</li>
                    <li>Тестируйте на слабых устройствах</li>
                    <li>Мониторьте количество слоев</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Не делайте</h3>
                  <ul class="pl-4">
                    <li>Анимируйте left/top/width/height</li>
                    <li>Оставляйте will-change навсегда</li>
                    <li>Создавайте слои для каждого элемента</li>
                    <li>Игнорируйте memory usage</li>
                    <li>Используйте сложные clip-path</li>
                    <li>Анимируйте box-shadow напрямую</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные тенденции</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">CSS Houdini</h3>
                  <p class="mb-2">Низкоуровневый доступ к рендерингу через Web APIs</p>
                  <v-chip size="small" class="ma-1">Paint API</v-chip>
                  <v-chip size="small" class="ma-1">Animation Worklet</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Web Animations API</h3>
                  <p class="mb-2">Нативные высокопроизводительные анимации</p>
                  <v-chip size="small" class="ma-1">KeyframeEffect</v-chip>
                  <v-chip size="small" class="ma-1">Animation</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Container Queries</h3>
                  <p class="mb-2">Изоляция анимаций на уровне контейнера</p>
                  <v-chip size="small" class="ma-1">@container</v-chip>
                  <v-chip size="small" class="ma-1">containment</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Аппаратное ускорение кардинально улучшает производительность анимаций, перенося
              вычисления с CPU на GPU. Ключевые принципы: создание композитных слоев через
              <code>will-change</code> или 3D контекст, анимация только GPU-оптимизированных
              свойств (transform, opacity), управление количеством слоев для экономии памяти.
              Правильное использование GPU ускорения обеспечивает плавные 60fps анимации даже
              на слабых устройствах.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/"
                target="_blank">
                GPU Performance Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
