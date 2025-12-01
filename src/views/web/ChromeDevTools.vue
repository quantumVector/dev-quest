<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-css.js'

const performanceSnippet = `
// Измерение производительности функции
console.time('myFunction');
myFunction();
console.timeEnd('myFunction');

// Performance API для точных измерений
const startTime = performance.now();
await heavyOperation();
const endTime = performance.now();
console.log(\`Execution time: \${endTime - startTime}ms\`);

// Маркеры для Performance Timeline
performance.mark('task-start');
doSomething();
performance.mark('task-end');
performance.measure('task-duration', 'task-start', 'task-end');

const measures = performance.getEntriesByType('measure');
console.log(measures);
`

const memoryLeakSnippet = `
// Типичная утечка памяти - забытый слушатель
class Component {
  constructor() {
    this.data = new Array(1000000).fill('leak');

    // ❌ ПЛОХО - слушатель не удаляется
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    console.log('Resized');
  }

  // Метод destroy не вызывается
}

// ✅ ПРАВИЛЬНО - удаление слушателя
class SafeComponent {
  constructor() {
    this.data = new Array(1000000).fill('data');
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    console.log('Resized');
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.data = null;
  }
}

// Проверка утечек через WeakMap
const cache = new WeakMap(); // Автоматическая сборка мусора

function processData(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, expensiveOperation(obj));
  }
  return cache.get(obj);
}
`

const networkSnippet = `
// Throttling для тестирования медленных соединений
// DevTools → Network → Throttling → Slow 3G

// Проверка размера ресурсов
fetch('/api/data')
  .then(response => {
    console.log('Size:', response.headers.get('content-length'));
    return response.json();
  });

// Service Worker для отладки кэширования
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Cache hit:', event.request.url);
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Проверка CORS
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors' // 'no-cors', 'same-origin'
})
.then(response => response.json())
.catch(error => console.error('CORS Error:', error));
`

const consoleSnippet = `
// Продвинутые техники Console

// 1. Console.table для структурированных данных
const users = [
  {id: 1, name: 'John', age: 30},
  {id: 2, name: 'Jane', age: 25},
  {id: 3, name: 'Bob', age: 35}
];
console.table(users);
console.table(users, ['name', 'age']); // Только определенные колонки

// 2. Console.group для структурирования логов
console.group('User Details');
console.log('Name:', 'John Doe');
console.log('Age:', 30);
console.log('Email:', 'john@example.com');
console.groupEnd();

// 3. Console.assert для проверок
function divide(a, b) {
  console.assert(b !== 0, 'Division by zero!', {a, b});
  return a / b;
}

// 4. Console.count для подсчета вызовов
function trackClicks(button) {
  console.count(\`Button \${button} clicked\`);
}

// 5. Console.trace для стека вызовов
function deepFunction() {
  console.trace('How did we get here?');
}

// 6. Кастомные стили
console.log(
  '%cSuccess!%c Operation completed',
  'color: green; font-size: 20px; font-weight: bold;',
  'color: blue;'
);

// 7. Console.dir для детального вывода объектов
console.dir(document.body, {depth: 3});
`

const storageSnippet = `
// Работа с Storage в DevTools

// LocalStorage - синхронное API
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'John',
  preferences: {theme: 'dark'}
}));

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

// SessionStorage - очищается при закрытии вкладки
sessionStorage.setItem('tempData', 'session-specific');

// IndexedDB - асинхронная база данных
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDatabase', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', {keyPath: 'id', autoIncrement: true});
      }
    };
  });
}

async function saveToIndexedDB(data) {
  const db = await openDatabase();
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');

  return new Promise((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Cookies с флагами безопасности
document.cookie = "session=abc123; SameSite=Strict; Secure; HttpOnly";

// Cache API для Service Workers
async function cacheResources() {
  const cache = await caches.open('v1');
  await cache.addAll([
    '/',
    '/styles.css',
    '/script.js',
    '/image.png'
  ]);
}
`

const a11ySnippet = `
// Accessibility Tree - параллельная DOM структура для assistive technologies

// Правильная семантика
<button onclick="handleClick()">
  Click me
</button>

// ❌ ПЛОХО - div без семантики
<div onclick="handleClick()">
  Click me
</div>

// ✅ ПРАВИЛЬНО с ARIA
<div role="button" tabindex="0"
     onclick="handleClick()"
     onkeypress="handleKeyPress(event)">
  Click me
</div>

// ARIA атрибуты для сложных виджетов
<div role="tablist" aria-label="Product tabs">
  <button role="tab"
          aria-selected="true"
          aria-controls="panel-1"
          id="tab-1">
    Overview
  </button>
  <button role="tab"
          aria-selected="false"
          aria-controls="panel-2"
          id="tab-2">
    Specs
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <!-- Content -->
</div>

// Live regions для динамического контента
<div role="status" aria-live="polite" aria-atomic="true">
  Loading...
</div>

// Проверка контрастности программно
function checkContrast(foreground, background) {
  // Упрощенная формула относительной яркости
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g).map(Number);
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    passAA: ratio >= 4.5,
    passAAA: ratio >= 7
  };
}
`

const debuggingSnippet = `
// Продвинутые техники отладки

// 1. Conditional Breakpoints
// В DevTools: ПКМ на строке → Add conditional breakpoint
// Условие: i === 50 || user.name === 'John'

// 2. Logpoints вместо console.log
// ПКМ на строке → Add logpoint
// Выражение: 'User:', user.name, 'Age:', user.age

// 3. XHR/Fetch Breakpoints
// DevTools → Sources → XHR/fetch Breakpoints
// Добавить: /api/users

// 4. Event Listener Breakpoints
// DevTools → Sources → Event Listener Breakpoints
// Выбрать: Mouse → click

// 5. Blackboxing для игнорирования библиотек
// Settings → Blackboxing → Add pattern
// Pattern: node_modules

// 6. Local Overrides для тестирования изменений
// DevTools → Sources → Overrides → Enable Local Overrides
// Изменить файл → Сохранить → Перезагрузка сохраняет изменения

// 7. Snippets для повторяющихся задач
// DevTools → Sources → Snippets → New snippet
// Пример: очистка всех cookies
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "")
    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});

// 8. Copy() для копирования данных
// В консоли: copy(largeObject)
// Объект копируется в буфер обмена как JSON
`

const coverageSnippet = `
// Coverage Tool для анализа неиспользуемого кода

// Открыть Coverage: Cmd/Ctrl + Shift + P → Show Coverage
// Начать запись → Взаимодействовать с сайтом → Остановить

// Типичные находки:
// 1. Неиспользуемые CSS правила
// 2. Мертвый JavaScript код
// 3. Неиспользуемые библиотеки

// Оптимизация: Tree-shaking в Webpack/Vite
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // Tree-shaking
    minimize: true
  }
};

// Dynamic imports для code-splitting
async function loadComponent() {
  const module = await import('./HeavyComponent.js');
  return module.default;
}

// CSS-in-JS помогает избежать неиспользуемых стилей
import styled from 'styled-components';

const Button = styled.button\`
  color: \${props => props.primary ? 'white' : 'black'};
  background: \${props => props.primary ? 'blue' : 'transparent'};
\`;
`
const performanceStep = ref(1)

const highlightedPerformance = ref('')
const highlightedMemoryLeak = ref('')
const highlightedNetwork = ref('')
const highlightedConsole = ref('')
const highlightedStorage = ref('')
const highlightedA11y = ref('')
const highlightedDebugging = ref('')
const highlightedCoverage = ref('')

onMounted(() => {
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
  highlightedMemoryLeak.value = Prism.highlight(memoryLeakSnippet, Prism.languages.javascript, 'javascript')
  highlightedNetwork.value = Prism.highlight(networkSnippet, Prism.languages.javascript, 'javascript')
  highlightedConsole.value = Prism.highlight(consoleSnippet, Prism.languages.javascript, 'javascript')
  highlightedStorage.value = Prism.highlight(storageSnippet, Prism.languages.javascript, 'javascript')
  highlightedA11y.value = Prism.highlight(a11ySnippet, Prism.languages.javascript, 'javascript')
  highlightedDebugging.value = Prism.highlight(debuggingSnippet, Prism.languages.javascript, 'javascript')
  highlightedCoverage.value = Prism.highlight(coverageSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Chrome DevTools: Инструменты и практическое применение
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Chrome DevTools</b> — это набор инструментов разработчика, встроенных в браузер Chrome.
              Понимание продвинутых возможностей DevTools критически важно для эффективной отладки,
              оптимизации производительности и обеспечения доступности веб-приложений.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные инструменты и частота использования</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Инструмент</th>
                <th class="text-left font-weight-bold">Частота использования</th>
                <th class="text-left font-weight-bold">Основное применение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Elements</b></td>
                <td class="pt-2 pb-2 text-success"><b>Ежедневно</b></td>
                <td class="pt-2 pb-2">Инспектирование DOM, правка CSS в реальном времени</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Console</b></td>
                <td class="pt-2 pb-2 text-success"><b>Ежедневно</b></td>
                <td class="pt-2 pb-2">Отладка JavaScript, логирование, выполнение кода</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Sources</b></td>
                <td class="pt-2 pb-2 text-success"><b>Ежедневно</b></td>
                <td class="pt-2 pb-2">Debugging, breakpoints, исходники</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Network</b></td>
                <td class="pt-2 pb-2 text-success"><b>Ежедневно</b></td>
                <td class="pt-2 pb-2">Анализ запросов, производительность загрузки</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Performance (Profiler)</b></td>
                <td class="pt-2 pb-2 text-warning"><b>Еженедельно</b></td>
                <td class="pt-2 pb-2">Профилирование, поиск bottlenecks, FPS анализ</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Memory</b></td>
                <td class="pt-2 pb-2 text-warning"><b>По необходимости</b></td>
                <td class="pt-2 pb-2">Поиск утечек памяти, heap snapshots</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Application (Storage)</b></td>
                <td class="pt-2 pb-2 text-info"><b>Регулярно</b></td>
                <td class="pt-2 pb-2">localStorage, cookies, IndexedDB, Service Workers</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Lighthouse</b></td>
                <td class="pt-2 pb-2 text-info"><b>Перед релизом</b></td>
                <td class="pt-2 pb-2">Аудит производительности, доступности, SEO</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Coverage</b></td>
                <td class="pt-2 pb-2 text-info"><b>При оптимизации</b></td>
                <td class="pt-2 pb-2">Анализ неиспользуемого кода</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Performance (Profiler) — профилирование приложения</h2>
            <p class="font-weight-regular mb-4">
              Performance Profiler помогает находить узкие места в производительности: медленные функции,
              длительные рендеры, проблемы с FPS и layout thrashing.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-chart-line</v-icon>
                    <h3 class="text-h6 font-weight-bold">Когда использовать</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Медленный рендеринг</strong> — долгая отрисовка</li>
                    <li><strong>Проблемы с FPS</strong> — анимации тормозят</li>
                    <li><strong>Долгие задачи</strong> — blocking main thread</li>
                    <li><strong>Layout thrashing</strong> — множественные reflow</li>
                    <li><strong>Профилирование функций</strong> — что медленное?</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-tools</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные метрики</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>FPS</strong> — frames per second (60 FPS цель)</li>
                    <li><strong>CPU</strong> — нагрузка на процессор</li>
                    <li><strong>NET</strong> — сетевая активность</li>
                    <li><strong>Main</strong> — flame chart главного потока</li>
                    <li><strong>Timings</strong> — FCP, LCP, DCL</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Практический пример использования Performance</h3>
            <v-stepper v-model="performanceStep" class="mb-8">
              <v-stepper-header>
                <v-stepper-item
                  :complete="performanceStep > 1"
                  :value="1"
                  title="Запись">
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item
                  :complete="performanceStep > 2"
                  :value="2"
                  title="Анализ">
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item
                  :complete="performanceStep > 3"
                  :value="3"
                  title="Оптимизация">
                </v-stepper-item>
              </v-stepper-header>

              <v-stepper-window v-model="performanceStep">
                <v-stepper-window-item :value="1">
                  <v-card flat>
                    <v-card-text>
                      <h4 class="text-h6 font-weight-bold mb-2">1. Начать запись профилирования</h4>
                      <p class="mb-4">DevTools → Performance → Record → Выполнить действие → Stop</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="performanceStep = 2">Далее</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-window-item>

                <v-stepper-window-item :value="2">
                  <v-card flat>
                    <v-card-text>
                      <h4 class="text-h6 font-weight-bold mb-2">2. Анализ Flame Chart</h4>
                      <p class="mb-4">Найти длинные задачи (>50ms), bottlenecks, layout thrashing</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="performanceStep = 1">Назад</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="performanceStep = 3">Далее</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-window-item>

                <v-stepper-window-item :value="3">
                  <v-card flat>
                    <v-card-text>
                      <h4 class="text-h6 font-weight-bold mb-2">3. Оптимизация</h4>
                      <p class="mb-4">Дебаунсинг, виртуализация, Web Workers, мемоизация</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="performanceStep = 2">Назад</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="success" @click="performanceStep = 1">Начать заново</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Memory — поиск утечек памяти</h2>
            <p class="font-weight-regular mb-4">
              Memory Profiler помогает находить утечки памяти через heap snapshots, allocation timelines
              и allocation sampling. Критически важен для SPA с длительным временем жизни.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Heap Snapshot</h3>
                  <p class="text-body-2">
                    Снимок всех объектов в памяти. Сравнение снимков показывает, что не очищается.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-chart-timeline-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Allocation Timeline</h3>
                  <p class="text-body-2">
                    Показывает выделение памяти в реальном времени. Полезно для поиска постоянного роста.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-clipboard-check-multiple</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Allocation Sampling</h3>
                  <p class="text-body-2">
                    Профилирование выделения памяти функциями. Меньше нагрузка, чем heap snapshot.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMemoryLeak"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Типичные причины утечек памяти</h3>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Частые утечки</h3>
                  <ul class="pl-4">
                    <li>Event listeners не удаляются</li>
                    <li>Таймеры setInterval не очищаются</li>
                    <li>Глобальные переменные растут</li>
                    <li>Циклические ссылки в замыканиях</li>
                    <li>Detached DOM nodes</li>
                    <li>Кэши без ограничений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Решения</h3>
                  <ul class="pl-4">
                    <li>removeEventListener в cleanup</li>
                    <li>clearInterval/clearTimeout</li>
                    <li>WeakMap/WeakSet для кэшей</li>
                    <li>Обнуление ссылок в destroy()</li>
                    <li>Удаление DOM элементов полностью</li>
                    <li>LRU cache с лимитом</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Network — анализ сетевых запросов</h2>
            <p class="font-weight-regular mb-4">
              Network панель критически важна для оптимизации загрузки, анализа API запросов,
              проверки заголовков и отладки CORS проблем.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNetwork"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Ключевые возможности Network</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Функция</th>
                <th class="text-left font-weight-bold">Применение</th>
                <th class="text-left font-weight-bold">Горячие клавиши</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Throttling</b></td>
                <td>Симуляция медленного соединения</td>
                <td>Slow 3G, Fast 3G, Offline</td>
              </tr>
              <tr>
                <td><b>Disable cache</b></td>
                <td>Тестирование без кэша</td>
                <td>Checkbox в Network</td>
              </tr>
              <tr>
                <td><b>Block request URL</b></td>
                <td>Тестирование без конкретных ресурсов</td>
                <td>ПКМ → Block request URL</td>
              </tr>
              <tr>
                <td><b>Copy as cURL</b></td>
                <td>Повторить запрос вне браузера</td>
                <td>ПКМ → Copy → Copy as cURL</td>
              </tr>
              <tr>
                <td><b>Waterfall</b></td>
                <td>Визуализация последовательности загрузки</td>
                <td>Timing tab</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Console — продвинутые техники</h2>
            <p class="font-weight-regular mb-4">
              Console — это не только console.log. Есть множество мощных методов для структурирования
              логов, профилирования и отладки.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConsole"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Application (Storage) — работа с хранилищами</h2>
            <p class="font-weight-regular mb-4">
              Application панель предоставляет доступ ко всем видам хранилищ: LocalStorage, SessionStorage,
              IndexedDB, Cookies, Cache Storage и Service Workers.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStorage"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Сравнение типов хранилищ</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Размер</th>
                <th class="text-left font-weight-bold">Время жизни</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>LocalStorage</b></td>
                <td>~5-10 MB</td>
                <td>Постоянно</td>
                <td>Настройки, токены (не чувствительные)</td>
              </tr>
              <tr>
                <td><b>SessionStorage</b></td>
                <td>~5-10 MB</td>
                <td>До закрытия вкладки</td>
                <td>Временные данные сессии</td>
              </tr>
              <tr>
                <td><b>IndexedDB</b></td>
                <td>~50 MB+</td>
                <td>Постоянно</td>
                <td>Большие объемы структурированных данных</td>
              </tr>
              <tr>
                <td><b>Cookies</b></td>
                <td>~4 KB</td>
                <td>Настраиваемо</td>
                <td>Аутентификация, tracking</td>
              </tr>
              <tr>
                <td><b>Cache API</b></td>
                <td>Зависит от квоты</td>
                <td>Постоянно</td>
                <td>Service Worker кэширование</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Accessibility (A11y) Tree — дерево доступности</h2>
            <p class="font-weight-regular mb-4">
              <b>Accessibility Tree</b> — это параллельная структура DOM, которую используют assistive technologies
              (скринридеры, браузерные расширения). Понимание A11y Tree критически важно для создания
              доступных интерфейсов.
            </p>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Accessibility Tree строится на основе семантики HTML и ARIA атрибутов.
              Неправильная семантика приводит к проблемам с доступностью, которые сложно обнаружить без DevTools.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedA11y"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Использование Accessibility панели</h3>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-tree</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">A11y Tree</h3>
                  <p class="text-body-2">
                    Elements → Accessibility tab. Показывает, как assistive technologies видят страницу.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-contrast-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Contrast Ratio</h3>
                  <p class="text-body-2">
                    Проверка контрастности текста. Показывает соответствие WCAG AA/AAA.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Issues</h3>
                  <p class="text-body-2">
                    DevTools автоматически находит проблемы доступности и предлагает решения.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Частые проблемы доступности</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">Как обнаружить</th>
                <th class="text-left font-weight-bold">Решение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Отсутствие alt у изображений</td>
                <td>Lighthouse → Accessibility</td>
                <td>Добавить alt с описанием</td>
              </tr>
              <tr>
                <td>Низкий контраст текста</td>
                <td>Elements → Contrast ratio</td>
                <td>Увеличить контраст (4.5:1 минимум)</td>
              </tr>
              <tr>
                <td>Кнопки без label</td>
                <td>A11y Tree → проверить name</td>
                <td>Добавить aria-label или текст</td>
              </tr>
              <tr>
                <td>Пропущены heading уровни</td>
                <td>A11y Tree → структура заголовков</td>
                <td>Использовать h1→h2→h3 последовательно</td>
              </tr>
              <tr>
                <td>Формы без label</td>
                <td>Issues → Accessibility issues</td>
                <td>Связать label с input через for/id</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники отладки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebugging"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Coverage — анализ неиспользуемого кода</h2>
            <p class="font-weight-regular mb-4">
              Coverage Tool показывает, какой процент загруженного CSS и JavaScript кода реально используется
              на странице. Критически важен для оптимизации bundle size.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCoverage"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как найти утечку памяти в приложении?</p>
                <p class="font-weight-regular ma-0">
                  1. Открыть Memory → Heap snapshot → Сделать снимок. 2. Выполнить действие, которое
                  может вызвать утечку. 3. Сделать второй снимок. 4. Сравнить снимки (Comparison view).
                  5. Искать объекты, которые не были освобождены, особенно detached DOM nodes и event listeners.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что показывает Flame Chart в Performance?</p>
                <p class="font-weight-regular ma-0">
                  Flame Chart показывает стек вызовов функций во времени. Ширина блока — время выполнения,
                  вложенность — стек вызовов. Ищите длинные блоки (>50ms) и повторяющиеся паттерны
                  (layout thrashing) — это узкие места производительности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Для чего нужен Accessibility Tree?</p>
                <p class="font-weight-regular ma-0">
                  A11y Tree показывает, как assistive technologies (скринридеры) интерпретируют страницу.
                  Это параллельная DOM структура, построенная на семантике HTML и ARIA атрибутах.
                  Помогает находить проблемы доступности: отсутствие labels, неправильные роли, проблемы навигации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как использовать Coverage для оптимизации?</p>
                <p class="font-weight-regular ma-0">
                  Coverage показывает неиспользуемый код. Открыть Coverage → Start → Взаимодействовать с сайтом
                  → Stop. Красные области — неиспользуемый код. Решения: code splitting, tree-shaking,
                  динамические импорты, удаление неиспользуемых библиотек.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Layout Thrashing и как его найти?</p>
                <p class="font-weight-regular ma-0">
                  Layout Thrashing — множественные принудительные reflow из-за чередования чтения и записи
                  layout properties (offsetHeight, scrollTop). В Performance видно как чередующиеся фиолетовые
                  (Layout) блоки. Решение: батчить чтения и записи, использовать requestAnimationFrame.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отладить CORS ошибки?</p>
                <p class="font-weight-regular ma-0">
                  Network → выбрать failed запрос → Headers tab. Проверить: 1) Access-Control-Allow-Origin
                  в response headers, 2) Preflight OPTIONS запрос (для non-simple requests), 3) Credentials
                  mode и Access-Control-Allow-Credentials. Console покажет точную причину CORS ошибки.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Горячие клавиши DevTools</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Действие</th>
                <th class="text-left font-weight-bold">Windows/Linux</th>
                <th class="text-left font-weight-bold">Mac</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Открыть DevTools</td>
                <td><kbd>F12</kbd> или <kbd>Ctrl+Shift+I</kbd></td>
                <td><kbd>Cmd+Option+I</kbd></td>
              </tr>
              <tr>
                <td>Command Menu</td>
                <td><kbd>Ctrl+Shift+P</kbd></td>
                <td><kbd>Cmd+Shift+P</kbd></td>
              </tr>
              <tr>
                <td>Inspect Element</td>
                <td><kbd>Ctrl+Shift+C</kbd></td>
                <td><kbd>Cmd+Shift+C</kbd></td>
              </tr>
              <tr>
                <td>Console</td>
                <td><kbd>Ctrl+Shift+J</kbd></td>
                <td><kbd>Cmd+Option+J</kbd></td>
              </tr>
              <tr>
                <td>Поиск по файлам</td>
                <td><kbd>Ctrl+P</kbd></td>
                <td><kbd>Cmd+P</kbd></td>
              </tr>
              <tr>
                <td>Поиск в файле</td>
                <td><kbd>Ctrl+F</kbd></td>
                <td><kbd>Cmd+F</kbd></td>
              </tr>
              <tr>
                <td>Следующий breakpoint</td>
                <td><kbd>F8</kbd></td>
                <td><kbd>F8</kbd></td>
              </tr>
              <tr>
                <td>Step over</td>
                <td><kbd>F10</kbd></td>
                <td><kbd>F10</kbd></td>
              </tr>
              <tr>
                <td>Step into</td>
                <td><kbd>F11</kbd></td>
                <td><kbd>F11</kbd></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Регулярно</h3>
                  <ul class="text-left pl-4">
                    <li>Проверять Network waterfall</li>
                    <li>Использовать Console для отладки</li>
                    <li>Инспектировать A11y Tree</li>
                    <li>Проверять Lighthouse перед релизом</li>
                    <li>Мониторить размер bundle</li>
                    <li>Тестировать на медленных сетях</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ По необходимости</h3>
                  <ul class="text-left pl-4">
                    <li>Performance профилирование</li>
                    <li>Memory heap snapshots</li>
                    <li>Coverage анализ</li>
                    <li>Advanced breakpoints</li>
                    <li>Local overrides для тестов</li>
                    <li>Request blocking</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Создавайте Snippets для частых задач</li>
                    <li>Используйте Command Menu (Cmd+Shift+P)</li>
                    <li>Blackbox сторонние библиотеки</li>
                    <li>Сохраняйте полезные console методы</li>
                    <li>Изучите горячие клавиши</li>
                    <li>Экспериментируйте с новыми панелями</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Chrome DevTools</b> — это мощный набор инструментов, который выходит далеко за пределы
              простого console.log. <b>Performance Profiler</b> критичен для поиска узких мест производительности,
              <b>Memory</b> панель незаменима для обнаружения утечек памяти, <b>Application (Storage)</b>
              необходима для работы с различными типами хранилищ, а <b>Accessibility Tree</b> помогает
              создавать доступные интерфейсы. Понимание и эффективное использование этих инструментов —
              признак опытного фронтенд-разработчика.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.chrome.com/docs/devtools/"
                target="_blank"
                class="mr-2">
                Chrome DevTools Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/learn/#devtools"
                target="_blank">
                web.dev: DevTools
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
