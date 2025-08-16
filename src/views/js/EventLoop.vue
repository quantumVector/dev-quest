<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicExampleSnippet = `
// Базовый пример Event Loop
console.log('1'); // Синхронный код

setTimeout(() => {
  console.log('2'); // Макрозадача (Timer API)
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Микрозадача (Promise)
});

console.log('4'); // Синхронный код

// Вывод: 1, 4, 3, 2
// Объяснение:
// 1. Выполняется синхронный код: 1, 4
// 2. Затем микрозадачи: 3
// 3. Затем макрозадачи: 2
`

const callStackSnippet = `
// Демонстрация Call Stack
function first() {
  console.log('First function start');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function start');
  third();
  console.log('Second function end');
}

function third() {
  console.log('Third function');
}

console.log('Global start');
first();
console.log('Global end');

// Call Stack в процессе выполнения:
// 1. [global]
// 2. [global, first]
// 3. [global, first, second]
// 4. [global, first, second, third]
// 5. [global, first, second] (third завершен)
// 6. [global, first] (second завершен)
// 7. [global] (first завершен)
// 8. [] (global завершен)
`

const macroMicroTasksSnippet = `
// Макрозадачи vs Микрозадачи
console.log('=== Start ===');

// Макрозадачи
setTimeout(() => console.log('setTimeout 1'), 0);
setInterval(() => {
  console.log('setInterval');
  clearInterval(this); // остановим после первого вызова
}, 0);

// Микрозадачи
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => {
  console.log('Promise 2');
  return Promise.resolve();
}).then(() => console.log('Promise 3'));

// queueMicrotask (современный способ добавить микрозадачу)
queueMicrotask(() => console.log('queueMicrotask'));

// MutationObserver (тоже микрозадача)
const observer = new MutationObserver(() => {
  console.log('MutationObserver');
});
const node = document.createElement('div');
observer.observe(node, { childList: true });
node.appendChild(document.createTextNode(''));

setTimeout(() => console.log('setTimeout 2'), 0);

console.log('=== End ===');

// Вывод:
// === Start ===
// === End ===
// Promise 1
// Promise 2
// queueMicrotask
// MutationObserver
// Promise 3
// setTimeout 1
// setInterval
// setTimeout 2
`

const complexExampleSnippet = `
// Сложный пример с вложенными задачами
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('Promise in setTimeout 1');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    setTimeout(() => {
      console.log('setTimeout in Promise 1');
    }, 0);
  })
  .then(() => {
    console.log('Promise 2');
  });

setTimeout(() => {
  console.log('setTimeout 2');
  Promise.resolve().then(() => {
    console.log('Promise in setTimeout 2');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 3');
});

console.log('Script end');

// Пошаговое выполнение:
// 1. Script start (синхронный)
// 2. Script end (синхронный)
// 3. Promise 1 (микрозадача)
// 4. Promise 2 (микрозадача)
// 5. Promise 3 (микрозадача)
// 6. setTimeout 1 (макрозадача)
// 7. Promise in setTimeout 1 (микрозадача от макрозадачи)
// 8. setTimeout 2 (макрозадача)
// 9. Promise in setTimeout 2 (микрозадача от макрозадачи)
// 10. setTimeout in Promise 1 (макрозадача от микрозадачи)
`

const asyncAwaitSnippet = `
// async/await и Event Loop
async function asyncFunction() {
  console.log('Async function start');

  const result = await Promise.resolve('Async result');
  console.log(result);

  console.log('Async function end');
}

console.log('Script start');

asyncFunction();

Promise.resolve().then(() => {
  console.log('Promise then');
});

console.log('Script end');

// Вывод:
// Script start
// Async function start
// Script end
// Async result
// Promise then
// Async function end

// Объяснение:
// 1. asyncFunction() начинается синхронно до первого await
// 2. await создает микрозадачу и приостанавливает функцию
// 3. Выполняется остальной синхронный код
// 4. Выполняются микрозадачи в порядке создания
`

const browserEventLoopSnippet = `
// Event Loop в браузере с DOM событиями
const button = document.createElement('button');
button.textContent = 'Click me';
document.body.appendChild(button);

button.addEventListener('click', () => {
  console.log('Click handler start');

  setTimeout(() => {
    console.log('setTimeout in click');
  }, 0);

  Promise.resolve().then(() => {
    console.log('Promise in click');
  });

  console.log('Click handler end');
});

// Симуляция клика
setTimeout(() => {
  console.log('Before click');
  button.click();
  console.log('After click');
}, 100);

// При клике:
// Before click
// Click handler start
// Click handler end
// After click
// Promise in click
// setTimeout in click

// Рендеринг происходит между макрозадачами
// Браузер может рендерить DOM изменения перед выполнением следующей макрозадачи
`

const nodeEventLoopSnippet = `
// Event Loop в Node.js (отличается от браузера!)
const fs = require('fs');

console.log('Start');

// Timer phase
setTimeout(() => console.log('Timer 1'), 0);
setImmediate(() => console.log('Immediate 1'));

// I/O phase
fs.readFile(__filename, () => {
  console.log('I/O callback');

  setTimeout(() => console.log('Timer in I/O'), 0);
  setImmediate(() => console.log('Immediate in I/O'));

  process.nextTick(() => console.log('nextTick in I/O'));
});

// Microtasks
Promise.resolve().then(() => console.log('Promise 1'));
process.nextTick(() => console.log('nextTick 1'));

console.log('End');

// Node.js phases:
// 1. Timer phase (setTimeout, setInterval)
// 2. Pending callbacks phase
// 3. Idle, prepare phase
// 4. Poll phase (I/O)
// 5. Check phase (setImmediate)
// 6. Close callbacks phase

// process.nextTick и Promise имеют приоритет между фазами
`

const performanceSnippet = `
// Влияние на производительность
// ПЛОХО: блокировка Event Loop
function heavyTask() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // Блокируем Event Loop на 1 секунду
    // UI зависнет, события не обработаются
  }
  console.log('Heavy task done');
}

// ХОРОШО: разбиение на части
function heavyTaskOptimized() {
  let i = 0;
  const total = 1000000;

  function chunk() {
    const start = Date.now();

    // Обрабатываем небольшими порциями
    while (i < total && Date.now() - start < 10) {
      // какая-то работа
      i++;
    }

    if (i < total) {
      setTimeout(chunk, 0); // Отдаем контроль Event Loop
    } else {
      console.log('Heavy task done optimized');
    }
  }

  chunk();
}

// СОВРЕМЕННО: использование Web Workers
if (typeof Worker !== 'undefined') {
  const worker = new Worker('heavy-task-worker.js');
  worker.postMessage({ task: 'process', data: bigArray });
  worker.onmessage = (e) => {
    console.log('Result from worker:', e.data);
  };
}

// Мониторинг Event Loop
let lastTime = performance.now();
function monitorEventLoop() {
  const currentTime = performance.now();
  const delay = currentTime - lastTime - 16; // ожидаем ~16ms для 60fps

  if (delay > 5) {
    console.warn(\`Event Loop delay: \${delay.toFixed(2)}ms\`);
  }

  lastTime = currentTime;
  requestAnimationFrame(monitorEventLoop);
}
monitorEventLoop();
`

const highlightedBasic = ref('')
const highlightedCallStack = ref('')
const highlightedMacroMicro = ref('')
const highlightedComplex = ref('')
const highlightedAsyncAwait = ref('')
const highlightedBrowser = ref('')
const highlightedNode = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(basicExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedCallStack.value = Prism.highlight(callStackSnippet, Prism.languages.javascript, 'javascript')
  highlightedMacroMicro.value = Prism.highlight(macroMicroTasksSnippet, Prism.languages.javascript, 'javascript')
  highlightedComplex.value = Prism.highlight(complexExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedAsyncAwait.value = Prism.highlight(asyncAwaitSnippet, Prism.languages.javascript, 'javascript')
  highlightedBrowser.value = Prism.highlight(browserEventLoopSnippet, Prism.languages.javascript, 'javascript')
  highlightedNode.value = Prism.highlight(nodeEventLoopSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Как работает Event Loop в JavaScript?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Event Loop</b> — это механизм, который позволяет JavaScript выполнять неблокирующие
              асинхронные операции в однопоточной среде. Он управляет порядком выполнения кода,
              обработкой событий и выполнением callback-функций.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Архитектура JavaScript Runtime</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-stack-overflow</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Call Stack</h3>
                  <p class="text-body-2">Стек вызовов для выполнения синхронного кода</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Heap</h3>
                  <p class="text-body-2">Память для хранения объектов и переменных</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-queue-first-in-last-out</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Task Queue</h3>
                  <p class="text-body-2">Очереди для макро и микрозадач</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-sync</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Event Loop</h3>
                  <p class="text-body-2">Координирует выполнение задач между компонентами</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Базовый пример</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Call Stack (Стек вызовов)</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Call Stack</strong> — это структура данных LIFO (Last In, First Out), которая отслеживает
              текущее выполнение функций. JavaScript выполняет код последовательно, одну функцию за раз.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCallStack"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Макрозадачи vs Микрозадачи</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-timer</v-icon>
                    <h3 class="text-h6 font-weight-bold">Макрозадачи (Tasks)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>setTimeout</code>, <code>setInterval</code></li>
                    <li><code>setImmediate</code> (Node.js)</li>
                    <li>I/O операции</li>
                    <li>UI события (click, scroll)</li>
                    <li>Parsing HTML</li>
                  </ul>
                  <p class="text-body-2 mt-2"><strong>Выполняются:</strong> по одной за итерацию Event Loop</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-flash</v-icon>
                    <h3 class="text-h6 font-weight-bold">Микрозадачи (Microtasks)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>Promise.then/catch/finally</code></li>
                    <li><code>async/await</code></li>
                    <li><code>queueMicrotask()</code></li>
                    <li><code>MutationObserver</code></li>
                    <li><code>process.nextTick</code> (Node.js)</li>
                  </ul>
                  <p class="text-body-2 mt-2"><strong>Выполняются:</strong> все подряд до опустошения очереди</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMacroMicro"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Приоритет выполнения</h2>
            <v-stepper alt-labels class="mb-8">
              <v-stepper-header>
                <v-stepper-item title="Call Stack" value="1" />
                <v-divider />
                <v-stepper-item title="Microtasks" value="2" />
                <v-divider />
                <v-stepper-item title="Render" value="3" />
                <v-divider />
                <v-stepper-item title="Macrotasks" value="4" />
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">1. Синхронный код (Call Stack)</h3>
                    <p>Выполняется весь синхронный код в текущем стеке вызовов</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">2. Все микрозадачи</h3>
                    <p>Выполняются ВСЕ микрозадачи до полного опустошения очереди</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">3. Рендеринг (браузер)</h3>
                    <p>Браузер может обновить DOM и перерисовать страницу</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="4">
                  <div class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">4. Одна макрозадача</h3>
                    <p>Выполняется только ОДНА макрозадача, затем цикл повторяется</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Сложный пример с вложенными задачами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComplex"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">async/await и Event Loop</h2>
            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> <code>async/await</code> — это синтаксический сахар над Promise.
              Код до первого <code>await</code> выполняется синхронно, а после — как микрозадача.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsyncAwait"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Event Loop в браузере</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBrowser"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Event Loop в Node.js</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Node.js Event Loop</strong> отличается от браузерного! Он имеет 6 фаз и обрабатывает
              разные типы операций в определенном порядке.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNode"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на производительность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что выведет этот код и почему?</p>
                <p class="font-weight-regular ma-0">
                  Классический вопрос с примером кода включающего <code>console.log</code>,
                  <code>setTimeout</code> и <code>Promise.resolve().then()</code>. Важно объяснить порядок:
                  синхронный код → микрозадачи → макрозадачи.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между макро и микрозадачами?</p>
                <p class="font-weight-regular ma-0">
                  Микрозадачи имеют более высокий приоритет и выполняются ВСЕ подряд до опустошения очереди.
                  Макрозадачи выполняются по одной за итерацию Event Loop, между ними могут выполняться микрозадачи и рендеринг.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое блокировка Event Loop?</p>
                <p class="font-weight-regular ma-0">
                  Это ситуация, когда синхронный код выполняется слишком долго, блокируя Call Stack.
                  В результате не могут выполняться другие задачи, UI зависает, события не обрабатываются.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает setTimeout(fn, 0)?</p>
                <p class="font-weight-regular ma-0">
                  Это не означает "выполнить немедленно". Функция попадает в очередь макрозадач и будет выполнена
                  после завершения текущего синхронного кода и всех микрозадач. Минимальная задержка обычно 4мс.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается Event Loop в браузере от Node.js?</p>
                <p class="font-weight-regular ma-0">
                  В браузере более простая модель: макрозадача → все микрозадачи → рендеринг → повтор.
                  В Node.js Event Loop имеет 6 фаз с разными типами операций, а <code>process.nextTick</code>
                  имеет наивысший приоритет.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать работу с Event Loop?</p>
                <p class="font-weight-regular ma-0">
                  Избегать блокирующих операций, разбивать тяжелые вычисления на части с <code>setTimeout</code>,
                  использовать Web Workers, оптимизировать количество DOM операций, использовать
                  <code>requestAnimationFrame</code> для анимаций.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Визуализация Event Loop</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔄 Цикл Event Loop</h3>
                  <ol class="pl-4">
                    <li>Выполнить код из Call Stack</li>
                    <li>Выполнить все микрозадачи</li>
                    <li>Рендеринг (если нужно)</li>
                    <li>Взять одну макрозадачу</li>
                    <li>Повторить с шага 1</li>
                  </ol>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⏱️ Тайминги</h3>
                  <ul class="pl-4">
                    <li><strong>setTimeout минимум:</strong> 4мс (браузер)</li>
                    <li><strong>Рендеринг:</strong> ~16.67мс (60 FPS)</li>
                    <li><strong>Idle callback:</strong> в свободное время</li>
                    <li><strong>Animation frame:</strong> перед рендерингом</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Разбивать тяжелые задачи на части</li>
                    <li>Использовать Web Workers</li>
                    <li>Предпочитать микрозадачи для быстрых операций</li>
                    <li>Мониторить производительность</li>
                    <li>Использовать requestAnimationFrame</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Блокирующих циклов while</li>
                    <li>Тяжелых синхронных вычислений</li>
                    <li>Множественных вложенных setTimeout</li>
                    <li>Частых DOM манипуляций</li>
                    <li>Бесконечных микрозадач</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучайте DevTools Performance</li>
                    <li>Используйте Chrome Task Manager</li>
                    <li>Тестируйте на слабых устройствах</li>
                    <li>Профилируйте память</li>
                    <li>Используйте лейзи загрузку</li>
                    <li>Оптимизируйте критический путь</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для отладки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-google-chrome</v-icon>
                    <h3 class="text-h6 font-weight-bold">Chrome DevTools</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Performance tab:</strong> профилирование Event Loop</li>
                    <li><strong>Sources → Call Stack:</strong> текущий стек</li>
                    <li><strong>Console:</strong> trace асинхронных операций</li>
                    <li><strong>Task Manager:</strong> мониторинг процессов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-nodejs</v-icon>
                    <h3 class="text-h6 font-weight-bold">Node.js</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>--inspect:</strong> подключение DevTools</li>
                    <li><strong>process.hrtime():</strong> точные измерения</li>
                    <li><strong>perf_hooks:</strong> API для производительности</li>
                    <li><strong>clinic.js:</strong> профилирование Node.js</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры проблем</h2>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel title="🐛 Бесконечная микрозадача">
                <v-expansion-panel-text>
                  <pre class="pa-4 rounded-lg custom-code"><code>// ПРОБЛЕМА: блокирует Event Loop
function infiniteMicrotask() {
  Promise.resolve().then(infiniteMicrotask);
}
infiniteMicrotask(); // UI зависнет!

// РЕШЕНИЕ: добавить условие выхода
let counter = 0;
function safeMicrotask() {
  if (counter++ < 1000) {
    Promise.resolve().then(safeMicrotask);
  }
}
safeMicrotask();</code></pre>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel title="⚡ Медленный рендеринг">
                <v-expansion-panel-text>
                  <pre class="pa-4 rounded-lg custom-code"><code>// ПРОБЛЕМА: множественные DOM операции
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(document.createElement('div'));
  // Каждая операция может вызвать reflow
}

// РЕШЕНИЕ: batch DOM операции
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(document.createElement('div'));
}
document.body.appendChild(fragment); // Один reflow</code></pre>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel title="🔄 Неправильное использование таймеров">
                <v-expansion-panel-text>
                  <pre class="pa-4 rounded-lg custom-code"><code>// ПРОБЛЕМА: накопление таймеров
setInterval(() => {
  if (heavyCondition()) {
    // Долгая операция может привести к накоплению
    processHeavyTask();
  }
}, 100);

// РЕШЕНИЕ: самовызывающийся setTimeout
function smartInterval() {
  if (heavyCondition()) {
    processHeavyTask();
  }
  setTimeout(smartInterval, 100); // Запланируется после завершения
}</code></pre>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Современные API для управления задачами</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">requestIdleCallback</h3>
                  <p class="text-body-2 mb-2">Выполнение в свободное время браузера</p>
                  <pre class="text-caption"><code>requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    doWork();
  }
});</code></pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">scheduler.postTask</h3>
                  <p class="text-body-2 mb-2">Новый API для планирования задач</p>
                  <pre class="text-caption"><code>scheduler.postTask(() => {
  // Задача с приоритетом
}, { priority: 'user-blocking' });</code></pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">MessageChannel</h3>
                  <p class="text-body-2 mb-2">Альтернатива setTimeout(0)</p>
                  <pre class="text-caption"><code>const channel = new MessageChannel();
channel.port2.onmessage = () => {
  // Быстрая макрозадача
};
channel.port1.postMessage(null);</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Event Loop</b> — это основа асинхронности в JavaScript. Понимание его работы критически важно
              для написания производительных приложений. Ключевые моменты: Call Stack выполняется первым,
              затем ВСЕ микрозадачи, потом рендеринг, и только после этого ОДНА макрозадача.
              Правильное использование этих знаний поможет избежать блокировок UI и создать
              отзывчивые приложения.
            </p>

            <v-alert color="success" class="mb-6">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Совет для собеседования:</strong> Всегда объясняйте примеры пошагово,
              демонстрируя понимание приоритетов выполнения. Упоминайте различия между браузером и Node.js,
              а также влияние на производительность и пользовательский опыт.
            </v-alert>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"
                target="_blank"
                class="mr-2">
                MDN Event Loop
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/"
                target="_blank"
                class="mr-2">
                Node.js Event Loop
              </v-btn>
              <v-btn
                color="info"
                size="small"
                variant="elevated"
                href="http://latentflip.com/loupe/"
                target="_blank">
                Event Loop Visualizer
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
