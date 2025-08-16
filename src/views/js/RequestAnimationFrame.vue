<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicExampleSnippet = `
// Место requestAnimationFrame в Event Loop
console.log('1. Синхронный код');

setTimeout(() => {
  console.log('4. Макрозадача (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Микрозадача (Promise)');
});

requestAnimationFrame(() => {
  console.log('3. requestAnimationFrame');
});

console.log('1.5. Синхронный код');

// Ожидаемый вывод:
// 1. Синхронный код
// 1.5. Синхронный код
// 2. Микрозадача (Promise)
// 3. requestAnimationFrame (перед рендерингом)
// 4. Макрозадача (setTimeout)

// ВАЖНО: requestAnimationFrame выполняется ПОСЛЕ микрозадач,
// но ДО рендеринга и ДО следующей макрозадачи
`

const renderingPipelineSnippet = `
// Полный цикл рендеринга браузера
console.log('=== Цикл Event Loop с рендерингом ===');

// 1. Синхронный код
console.log('1. Start');

// 2. Макрозадача
setTimeout(() => {
  console.log('6. Макрозадача');
}, 0);

// 3. Микрозадача
Promise.resolve().then(() => {
  console.log('2. Микрозадача');
});

// 4. requestAnimationFrame (перед рендерингом)
requestAnimationFrame(() => {
  console.log('3. rAF - готовимся к рендерингу');

  // Можем делать вычисления для анимации
  const element = document.getElementById('animated-element');
  if (element) {
    element.style.transform = \`translateX(\${Math.random() * 100}px)\`;
  }
});

// 5. requestIdleCallback (после рендеринга, в свободное время)
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    console.log('5. Idle callback - в свободное время');
  });
}

// Рендеринг браузера происходит здесь (между 3 и 4)
// 4. Style recalc, Layout, Paint, Composite

console.log('1.5. End sync code');

// Полная последовательность:
// 1. Start
// 1.5. End sync code
// 2. Микрозадача
// 3. rAF - готовимся к рендерингу
// [Рендеринг: Style → Layout → Paint → Composite]
// 5. Idle callback - в свободное время
// 6. Макрозадача
`

const animationExampleSnippet = `
// Практический пример анимации с requestAnimationFrame
class SmoothAnimation {
  constructor(element, duration = 1000) {
    this.element = element;
    this.duration = duration;
    this.startTime = null;
    this.isRunning = false;
  }

  // Правильное использование requestAnimationFrame
  animate(startPos = 0, endPos = 300) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = null;

    const step = (timestamp) => {
      // Первый вызов - запоминаем время старта
      if (!this.startTime) {
        this.startTime = timestamp;
      }

      // Вычисляем прогресс (0 к 1)
      const elapsed = timestamp - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Вычисляем текущую позицию
      const currentPos = startPos + (endPos - startPos) * easedProgress;

      // Применяем изменения ВНУТРИ rAF callback
      // Это гарантирует, что изменения будут применены перед рендерингом
      this.element.style.transform = \`translateX(\${currentPos}px)\`;

      // Продолжаем анимацию или завершаем
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.isRunning = false;
        console.log('Анимация завершена');
      }
    };

    // Запускаем первый кадр
    requestAnimationFrame(step);
  }

  // Отмена анимации
  cancel() {
    this.isRunning = false;
    // В реальном коде нужно сохранять ID от requestAnimationFrame
    // и использовать cancelAnimationFrame(id)
  }
}

// Использование
const element = document.createElement('div');
element.style.cssText = \`
  width: 50px;
  height: 50px;
  background: #4CAF50;
  position: absolute;
  top: 50px;
  left: 0;
  transition: none; /* Отключаем CSS transitions для плавности */
\`;
document.body.appendChild(element);

const animation = new SmoothAnimation(element, 2000);

// Запуск анимации по клику
element.addEventListener('click', () => {
  animation.animate(0, 300);
});
`

const performanceComparisonSnippet = `
// Сравнение производительности: setTimeout vs requestAnimationFrame

// ПЛОХО: анимация через setTimeout
function animateWithSetTimeout() {
  let position = 0;
  const target = 300;
  const duration = 1000;
  const fps = 60;
  const frameTime = 1000 / fps; // ~16.67ms
  const totalFrames = duration / frameTime;
  const step = target / totalFrames;

  function frame() {
    position += step;
    element.style.transform = \`translateX(\${position}px)\`;

    if (position < target) {
      setTimeout(frame, frameTime); // Проблема: не синхронизировано с рендерингом
    }
  }

  setTimeout(frame, frameTime);
}

// ХОРОШО: анимация через requestAnimationFrame
function animateWithRAF() {
  const startTime = performance.now();
  const startPos = 0;
  const endPos = 300;
  const duration = 1000;

  function frame(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentPos = startPos + (endPos - startPos) * progress;

    element.style.transform = \`translateX(\${currentPos}px)\`;

    if (progress < 1) {
      requestAnimationFrame(frame); // Синхронизировано с refresh rate дисплея
    }
  }

  requestAnimationFrame(frame);
}

// Мониторинг FPS
class FPSMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.updateInterval = 1000; // обновляем каждую секунду
  }

  update() {
    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= this.updateInterval) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      console.log(\`FPS: \${this.fps}\`);

      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(() => this.update());
  }

  start() {
    this.update();
  }
}

// Использование FPS монитора
const fpsMonitor = new FPSMonitor();
fpsMonitor.start();

// Проблемы с setTimeout для анимаций:
// 1. Не синхронизирован с refresh rate дисплея (60Hz, 120Hz, etc.)
// 2. Может выполняться когда страница не видна (тратит ресурсы)
// 3. Менее плавные анимации из-за рассинхронизации
// 4. Больше потребление батареи на мобильных устройствах

// Преимущества requestAnimationFrame:
// 1. Автоматическая синхронизация с refresh rate
// 2. Паузы когда вкладка неактивна (экономия ресурсов)
// 3. Оптимизации браузера для плавной анимации
// 4. Лучшая производительность и меньше потребление батареи
`

const complexEventLoopSnippet = `
// Сложный пример: полный цикл Event Loop с различными API
console.log('=== Сложный пример Event Loop ===');

// 1. Синхронный код
console.log('1. Sync start');

// 2. Макрозадачи (разные приоритеты)
setTimeout(() => console.log('8. setTimeout 0'), 0);
setTimeout(() => console.log('9. setTimeout 1'), 1);

// 3. I/O макрозадача (если доступна)
if (typeof setImmediate !== 'undefined') {
  setImmediate(() => console.log('10. setImmediate'));
}

// 4. Микрозадачи
Promise.resolve().then(() => {
  console.log('2. Promise 1');

  // Вложенная микрозадача
  return Promise.resolve();
}).then(() => {
  console.log('3. Promise 2 (chained)');
});

// 5. queueMicrotask - тоже микрозадача
queueMicrotask(() => {
  console.log('4. queueMicrotask');
});

// 6. requestAnimationFrame - перед рендерингом
requestAnimationFrame(() => {
  console.log('5. rAF callback');

  // Можем добавить микрозадачу ВНУТРИ rAF
  Promise.resolve().then(() => {
    console.log('6. Promise inside rAF');
  });
});

// 7. requestIdleCallback - в свободное время
if ('requestIdleCallback' in window) {
  requestIdleCallback((deadline) => {
    console.log(\`7. Idle callback (time remaining: \${deadline.timeRemaining().toFixed(2)}ms)\`);
  });
}

// 8. MutationObserver - микрозадача
const observer = new MutationObserver(() => {
  console.log('4.5. MutationObserver');
});

const testNode = document.createElement('div');
observer.observe(testNode, { childList: true });

// Вызовем мутацию
setTimeout(() => {
  testNode.appendChild(document.createTextNode('trigger'));
}, 5);

console.log('1.5. Sync end');

// Ожидаемый порядок:
// 1. Sync start
// 1.5. Sync end
// 2. Promise 1
// 3. Promise 2 (chained)
// 4. queueMicrotask
// 4.5. MutationObserver (через 5ms после мутации)
// 5. rAF callback
// 6. Promise inside rAF
// [РЕНДЕРИНГ ПРОИСХОДИТ ЗДЕСЬ]
// 7. Idle callback
// 8. setTimeout 0
// 9. setTimeout 1
// 10. setImmediate (если доступен)
`

const rafPolyfillSnippet = `
// Полифилл requestAnimationFrame для понимания работы
(function() {
  let lastTime = 0;
  const vendors = ['webkit', 'moz'];

  // Проверяем нативную поддержку
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  // Полифилл если нет нативной поддержки
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime)); // ~60fps

      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

// Современная альтернатива - scheduler.postTask API
if ('scheduler' in window && 'postTask' in scheduler) {
  // Новый API для более точного контроля задач

  function modernAnimationFrame(callback) {
    return scheduler.postTask(callback, {
      priority: 'user-blocking' // Высокий приоритет для анимаций
    });
  }

  // Использование
  modernAnimationFrame(() => {
    console.log('Modern animation frame with scheduler API');
  });
}

// Адаптивный FPS для разных дисплеев
class AdaptiveAnimation {
  constructor() {
    // Определяем refresh rate дисплея
    this.refreshRate = this.detectRefreshRate();
    this.targetFPS = Math.min(60, this.refreshRate);
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;
  }

  detectRefreshRate() {
    // Простое определение через requestAnimationFrame
    return new Promise((resolve) => {
      let frameCount = 0;
      const startTime = performance.now();

      const countFrames = () => {
        frameCount++;
        if (frameCount < 60) { // считаем 60 кадров
          requestAnimationFrame(countFrames);
        } else {
          const endTime = performance.now();
          const fps = Math.round(60000 / (endTime - startTime));
          resolve(fps);
        }
      };

      requestAnimationFrame(countFrames);
    });
  }

  animate(callback) {
    const animate = (currentTime) => {
      // Пропускаем кадры если FPS слишком высокий
      if (currentTime - this.lastFrameTime >= this.frameInterval) {
        callback(currentTime);
        this.lastFrameTime = currentTime;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

// Использование адаптивной анимации
const adaptiveAnim = new AdaptiveAnimation();
adaptiveAnim.animate((timestamp) => {
  // Анимация, которая адаптируется к refresh rate дисплея
  console.log(\`Frame at \${timestamp.toFixed(2)}ms\`);
});
`

const debuggingSnippet = `
// Инструменты для отладки и мониторинга requestAnimationFrame

// 1. Счетчик кадров в секунду
class FrameRateCounter {
  constructor() {
    this.frames = 0;
    this.lastTime = performance.now();
    this.fps = 0;
    this.element = null;

    this.createDisplay();
    this.start();
  }

  createDisplay() {
    this.element = document.createElement('div');
    this.element.style.cssText = \`
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      font-family: monospace;
      font-size: 14px;
      z-index: 9999;
      border-radius: 4px;
    \`;
    document.body.appendChild(this.element);
  }

  update() {
    const currentTime = performance.now();
    this.frames++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;

      // Цветовая индикация производительности
      let color = '#4CAF50'; // зеленый
      if (this.fps < 60) color = '#FF9800'; // оранжевый
      if (this.fps < 30) color = '#F44336'; // красный

      this.element.innerHTML = \`
        <div style="color: \${color}">FPS: \${this.fps}</div>
        <div style="color: #999; font-size: 12px;">Target: 60</div>
      \`;
    }

    requestAnimationFrame(() => this.update());
  }

  start() {
    this.update();
  }
}

// 2. Мониторинг длительности кадров
class FrameTimeMonitor {
  constructor() {
    this.frameTimings = [];
    this.maxSamples = 60; // храним последние 60 кадров
  }

  monitor() {
    let lastTime = performance.now();

    const measureFrame = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastTime;

      this.frameTimings.push(frameTime);

      // Ограничиваем размер массива
      if (this.frameTimings.length > this.maxSamples) {
        this.frameTimings.shift();
      }

      // Вычисляем статистику
      const avgFrameTime = this.frameTimings.reduce((a, b) => a + b) / this.frameTimings.length;
      const maxFrameTime = Math.max(...this.frameTimings);
      const minFrameTime = Math.min(...this.frameTimings);

      // Логируем проблемные кадры
      if (frameTime > 20) { // больше 20ms = меньше 50 FPS
        console.warn(\`Slow frame: \${frameTime.toFixed(2)}ms\`);
      }

      // Периодически выводим статистику
      if (this.frameTimings.length === this.maxSamples) {
        console.log(\`Frame stats - Avg: \${avgFrameTime.toFixed(2)}ms, Min: \${minFrameTime.toFixed(2)}ms, Max: \${maxFrameTime.toFixed(2)}ms\`);
        this.frameTimings = []; // сброс для новой выборки
      }

      lastTime = currentTime;
      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
  }
}

// 3. Детектор пропущенных кадров
class DroppedFrameDetector {
  constructor() {
    this.expectedFrameTime = 16.67; // 60 FPS
    this.tolerance = 5; // допуск в мс
    this.droppedFrames = 0;
    this.totalFrames = 0;
  }

  detect() {
    let lastTime = performance.now();

    const checkFrame = () => {
      const currentTime = performance.now();
      const actualFrameTime = currentTime - lastTime;
      const expectedFrames = Math.round(actualFrameTime / this.expectedFrameTime);

      this.totalFrames += expectedFrames;

      if (expectedFrames > 1) {
        const dropped = expectedFrames - 1;
        this.droppedFrames += dropped;
        console.warn(\`Dropped \${dropped} frame(s). Actual time: \${actualFrameTime.toFixed(2)}ms\`);
      }

      // Периодическая статистика
      if (this.totalFrames % 600 === 0) { // каждые 10 секунд при 60 FPS
        const dropRate = (this.droppedFrames / this.totalFrames * 100).toFixed(2);
        console.log(\`Frame drop rate: \${dropRate}% (\${this.droppedFrames}/\${this.totalFrames})\`);
      }

      lastTime = currentTime;
      requestAnimationFrame(checkFrame);
    };

    requestAnimationFrame(checkFrame);
  }
}

// 4. Профилировщик производительности анимаций
class AnimationProfiler {
  constructor() {
    this.profiles = new Map();
  }

  profile(name, animationFn) {
    const startTime = performance.now();
    let frameCount = 0;
    let totalCpuTime = 0;

    const profiledAnimation = (timestamp) => {
      const frameStart = performance.now();

      // Выполняем анимацию
      const continueAnimation = animationFn(timestamp, frameCount);

      const frameEnd = performance.now();
      const frameCpuTime = frameEnd - frameStart;

      frameCount++;
      totalCpuTime += frameCpuTime;

      // Предупреждение о тяжелых кадрах
      if (frameCpuTime > 10) {
        console.warn(\`Heavy frame in \${name}: \${frameCpuTime.toFixed(2)}ms\`);
      }

      if (continueAnimation !== false) {
        requestAnimationFrame(profiledAnimation);
      } else {
        // Анимация завершена, выводим статистику
        const totalTime = performance.now() - startTime;
        const avgCpuPerFrame = totalCpuTime / frameCount;

        console.log(\`Animation "\${name}" profile:\`);
        console.log(\`  Total time: \${totalTime.toFixed(2)}ms\`);
        console.log(\`  Total frames: \${frameCount}\`);
        console.log(\`  Avg CPU per frame: \${avgCpuPerFrame.toFixed(2)}ms\`);
        console.log(\`  CPU usage: \${(totalCpuTime / totalTime * 100).toFixed(2)}%\`);
      }
    };

    requestAnimationFrame(profiledAnimation);
  }
}

// Использование инструментов отладки
const fpsCounter = new FrameRateCounter();
const frameMonitor = new FrameTimeMonitor();
const dropDetector = new DroppedFrameDetector();
const profiler = new AnimationProfiler();

frameMonitor.monitor();
dropDetector.detect();

// Пример профилирования анимации
profiler.profile('slideAnimation', (timestamp, frameCount) => {
  // Симуляция анимации
  const element = document.querySelector('#animated-element');
  if (element) {
    element.style.transform = \`translateX(\${Math.sin(timestamp * 0.001) * 100}px)\`;
  }

  // Анимация длится 5 секунд (300 кадров при 60 FPS)
  return frameCount < 300;
});
`

const highlightedBasic = ref('')
const highlightedRenderingPipeline = ref('')
const highlightedAnimation = ref('')
const highlightedPerformance = ref('')
const highlightedComplexEventLoop = ref('')
const highlightedPolyfill = ref('')
const highlightedDebugging = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(basicExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedRenderingPipeline.value = Prism.highlight(renderingPipelineSnippet, Prism.languages.javascript, 'javascript')
  highlightedAnimation.value = Prism.highlight(animationExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceComparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedComplexEventLoop.value = Prism.highlight(complexEventLoopSnippet, Prism.languages.javascript, 'javascript')
  highlightedPolyfill.value = Prism.highlight(rafPolyfillSnippet, Prism.languages.javascript, 'javascript')
  highlightedDebugging.value = Prism.highlight(debuggingSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              requestAnimationFrame и Event Loop
            </h1>

            <p class="font-weight-regular mb-6">
              <b>requestAnimationFrame (rAF)</b> — это специальный API браузера, который планирует выполнение
              callback-функции перед следующим перерисовыванием страницы. Он занимает особое место в Event Loop,
              выполняясь ПОСЛЕ микрозадач, но ДО рендеринга и ДО макрозадач.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Место в Event Loop</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> requestAnimationFrame выполняется в специальной фазе Event Loop —
              между микрозадачами и рендерингом, но перед макрозадачами следующей итерации.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Полный цикл рендеринга браузера</h2>
            <v-stepper alt-labels class="mb-8">
              <v-stepper-header>
                <v-stepper-item title="Call Stack" value="1" />
                <v-divider />
                <v-stepper-item title="Microtasks" value="2" />
                <v-divider />
                <v-stepper-item title="rAF Callbacks" value="3" />
                <v-divider />
                <v-stepper-item title="Rendering" value="4" />
                <v-divider />
                <v-stepper-item title="Idle/Macrotasks" value="5" />
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">1. Call Stack (синхронный код)</h3>
                    <p>Выполняется весь синхронный JavaScript код</p>
                    <v-chip size="small" color="primary">console.log()</v-chip>
                    <v-chip size="small" color="primary">функции</v-chip>
                    <v-chip size="small" color="primary">циклы</v-chip>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">2. Все микрозадачи</h3>
                    <p>Выполняются ВСЕ микрозадачи до полного опустошения очереди</p>
                    <v-chip size="small" color="success">Promise.then()</v-chip>
                    <v-chip size="small" color="success">queueMicrotask()</v-chip>
                    <v-chip size="small" color="success">MutationObserver</v-chip>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">3. requestAnimationFrame callbacks</h3>
                    <p>Выполняются все rAF колбэки для подготовки к рендерингу</p>
                    <v-chip size="small" color="warning">requestAnimationFrame()</v-chip>
                    <v-chip size="small" color="warning">анимации</v-chip>
                    <v-chip size="small" color="warning">обновление DOM</v-chip>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="4">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">4. Rendering Pipeline</h3>
                    <p>Браузер выполняет рендеринг: Style → Layout → Paint → Composite</p>
                    <v-chip size="small" color="info">Style Recalc</v-chip>
                    <v-chip size="small" color="info">Layout</v-chip>
                    <v-chip size="small" color="info">Paint</v-chip>
                    <v-chip size="small" color="info">Composite</v-chip>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="5">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">5. Idle callbacks / Macrotasks</h3>
                    <p>В свободное время или следующая макрозадача</p>
                    <v-chip size="small" color="error">setTimeout()</v-chip>
                    <v-chip size="small" color="error">setInterval()</v-chip>
                    <v-chip size="small" color="secondary">requestIdleCallback()</v-chip>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRenderingPipeline"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример анимации</h2>
            <p class="font-weight-regular mb-4">
              Правильное использование requestAnimationFrame для плавных анимаций с привязкой к refresh rate дисплея:
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAnimation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение производительности</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-timer-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">setTimeout для анимаций</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Не синхронизирован</strong> с refresh rate</li>
                    <li><strong>Неточная частота</strong> (~16.67ms ≠ реальный refresh rate)</li>
                    <li><strong>Работает в фоне</strong> (тратит ресурсы)</li>
                    <li><strong>Рывки и пропуски</strong> кадров</li>
                    <li><strong>Больше энергопотребления</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-speedometer</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">requestAnimationFrame</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Синхронизация</strong> с refresh rate</li>
                    <li><strong>Автоматическая пауза</strong> в неактивных вкладках</li>
                    <li><strong>Оптимизации браузера</strong></li>
                    <li><strong>Плавные анимации</strong></li>
                    <li><strong>Экономия батареи</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сложный пример Event Loop</h2>
            <p class="font-weight-regular mb-4">
              Полный пример взаимодействия всех видов задач в Event Loop:
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComplexEventLoop"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Полифилл и альтернативы</h2>
            <p class="font-weight-regular mb-4">
              Понимание работы requestAnimationFrame через полифилл и современные альтернативы:
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPolyfill"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка и мониторинг</h2>
            <p class="font-weight-regular mb-4">
              Инструменты для анализа производительности анимаций:
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebugging"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какое место в Event Loop занимает requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  requestAnimationFrame выполняется ПОСЛЕ всех микрозадач (Promise, queueMicrotask),
                  но ДО рендеринга и ДО следующих макрозадач (setTimeout, setInterval).
                  Это позволяет подготовить изменения DOM перед рендерингом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему requestAnimationFrame лучше setTimeout для анимаций?</p>
                <p class="font-weight-regular ma-0">
                  1) Синхронизация с refresh rate дисплея (60Hz, 120Hz и т.д.)
                  2) Автоматическая пауза когда вкладка неактивна
                  3) Оптимизации браузера для плавности
                  4) Меньшее энергопотребление
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит, если колбэк requestAnimationFrame выполняется долго?</p>
                <p class="font-weight-regular ma-0">
                  Задержится рендеринг страницы, что приведет к пропуску кадров (frame drops).
                  Колбэк должен выполняться быстро (&lt;16ms для 60fps), тяжелые операции нужно
                  разбивать или переносить в Web Workers.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли добавить микрозадачи внутри requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  Да, но они выполнятся в следующей итерации Event Loop, после рендеринга.
                  Микрозадачи из rAF колбэка не блокируют текущий рендеринг.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отменить запланированный requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  Используйте cancelAnimationFrame(id), где id возвращается из requestAnimationFrame().
                  Это важно для предотвращения утечек памяти при размонтировании компонентов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое timestamp в колбэке requestAnimationFrame?</p>
                <p class="font-weight-regular ma-0">
                  Это время в миллисекундах (DOMHighResTimeStamp), когда начался текущий кадр.
                  Используется для вычисления прогресса анимации и обеспечения плавности
                  независимо от частоты обновления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Работает ли requestAnimationFrame в Web Workers?</p>
                <p class="font-weight-regular ma-0">
                  Нет, requestAnimationFrame недоступен в Web Workers, так как они не имеют
                  доступа к DOM и рендерингу. Для анимаций в Workers используйте
                  postMessage для связи с main thread.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте для всех анимаций</li>
                    <li>Сохраняйте ID для отмены</li>
                    <li>Вычисляйте по timestamp</li>
                    <li>Проверяйте performance</li>
                    <li>Группируйте DOM-операции</li>
                    <li>Используйте will-change CSS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>setTimeout для анимаций</li>
                    <li>Тяжелые вычисления в колбэке</li>
                    <li>Множественные DOM queries</li>
                    <li>Синхронные AJAX в колбэке</li>
                    <li>Забывать cancelAnimationFrame</li>
                    <li>Игнорировать timestamp</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте easing функции</li>
                    <li>Предрассчитывайте значения</li>
                    <li>Кешируйте DOM элементы</li>
                    <li>Мониторьте FPS</li>
                    <li>Тестируйте на слабых устройствах</li>
                    <li>Используйте CSS transform</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>requestAnimationFrame</b> занимает специальное место в Event Loop между микрозадачами и рендерингом.
              Это делает его идеальным инструментом для создания плавных анимаций, синхронизированных с частотой
              обновления дисплея. Понимание его места в Event Loop критически важно для создания
              производительных веб-приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame"
                target="_blank"
                class="mr-2">
                MDN Reference
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/optimize-javascript-execution/"
                target="_blank">
                Performance Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
