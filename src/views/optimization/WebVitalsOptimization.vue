<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const measuringSnippet = `
// ===================================================================
// ИЗМЕРЕНИЕ WEB VITALS
// ===================================================================

// 1. Web Vitals Library (Рекомендуемый способ)
import {onCLS, onFCP, onLCP, onTTFB, onINP} from 'web-vitals';

// Отправка метрик в аналитику
function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good', 'needs-improvement', 'poor'
    delta: metric.delta,
    id: metric.id,
  });

  // Используем sendBeacon для надежной отправки
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', {method: 'POST', body, keepalive: true});
  }
}

// Регистрация всех метрик
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
onINP(sendToAnalytics);

// ===================================================================

// 2. Performance Observer API (Нативный подход)

// Наблюдение за paint метриками (FCP, LCP)
const paintObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.startTime}ms\`);

    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
});
paintObserver.observe({entryTypes: ['paint']});

// Наблюдение за LCP
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
});
lcpObserver.observe({entryTypes: ['largest-contentful-paint']});

// Наблюдение за Layout Shifts (CLS)
let clsScore = 0;
const clsObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsScore += entry.value;
      console.log('Current CLS:', clsScore);
    }
  }
});
clsObserver.observe({entryTypes: ['layout-shift']});

// Наблюдение за Long Tasks (для TBT/INP)
const longTaskObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long task:', entry.duration);
  }
});
longTaskObserver.observe({entryTypes: ['longtask']});

// ===================================================================

// 3. Performance Navigation Timing
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];

  console.log('TTFB:', perfData.responseStart - perfData.requestStart);
  console.log('DOM Load:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
  console.log('Window Load:', perfData.loadEventEnd - perfData.loadEventStart);
});

// ===================================================================

// 4. Measurement в React/Next.js

// Next.js - встроенная поддержка
// pages/_app.js
export function reportWebVitals(metric) {
  console.log(metric);

  // Отправка в Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

// React - кастомный хук
import {useEffect} from 'react';
import {onCLS, onFCP, onLCP} from 'web-vitals';

function useWebVitals() {
  useEffect(() => {
    onCLS(console.log);
    onFCP(console.log);
    onLCP(console.log);
  }, []);
}
`

const optimizationSnippet = `
// ===================================================================
// ОПТИМИЗАЦИЯ WEB VITALS
// ===================================================================

// ============ 1. LCP (Largest Contentful Paint) ============
// Цель: < 2.5s (Good), < 4.0s (Needs Improvement)

// 1.1. Оптимизация изображений
// ❌ Плохо
<img src="hero.jpg" alt="Hero">

// ✅ Хорошо
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  loading="eager"
  fetchpriority="high"
  alt="Hero"
>

// 1.2. Preload критических ресурсов
<link rel="preload" as="image" href="hero.jpg" fetchpriority="high">
<link rel="preload" as="font" href="/fonts/main.woff2" crossorigin>

// 1.3. Современные форматы изображений
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero">
</picture>

// 1.4. Оптимизация серверного времени (TTFB)
// - CDN для статики
// - HTTP/2 или HTTP/3
// - Server-side caching (Redis)
// - Database query optimization

// 1.5. Resource Hints
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">

// ============ 2. CLS (Cumulative Layout Shift) ============
// Цель: < 0.1 (Good), < 0.25 (Needs Improvement)

// 2.1. Резервирование места для изображений
// ❌ Плохо
<img src="photo.jpg" alt="Photo">

// ✅ Хорошо - явные размеры
<img src="photo.jpg" width="800" height="600" alt="Photo">

// ✅ Хорошо - aspect-ratio
<img src="photo.jpg" style="aspect-ratio: 16/9; width: 100%;" alt="Photo">

// 2.2. Резервирование места для динамического контента
// CSS
.ad-slot {
  min-height: 250px; /* Минимальная высота для рекламы */
}

.skeleton {
  height: 200px; /* Placeholder для контента */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}

// 2.3. Избегайте вставки контента над существующим
// ❌ Плохо - баннер появляется сверху
<div id="banner"></div>
<main>Content</main>

// ✅ Хорошо - резервируем место
<div id="banner" style="min-height: 60px;"></div>
<main>Content</main>

// 2.4. Web Fonts без layout shift
// CSS
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: optional; /* Или swap с size-adjust */
}

// Fallback с похожими метриками
body {
  font-family: 'CustomFont', Arial, sans-serif;
}

// 2.5. Transforms вместо top/left для анимаций
// ❌ Плохо - вызывает layout
.element {
  transition: top 0.3s;
}
.element:hover {
  top: 10px;
}

// ✅ Хорошо - не вызывает layout
.element {
  transition: transform 0.3s;
}
.element:hover {
  transform: translateY(10px);
}

// ============ 3. INP (Interaction to Next Paint) ============
// Цель: < 200ms (Good), < 500ms (Needs Improvement)

// 3.1. Оптимизация JavaScript
// Разбивка тяжелых задач
function processLargeDataset(data) {
  const chunkSize = 100;
  let index = 0;

  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);

    // Обработка chunk
    chunk.forEach(item => {
      // Обработка
    });

    index += chunkSize;

    if (index < data.length) {
      // Уступаем место браузеру для отрисовки
      setTimeout(processChunk, 0);
    }
  }

  processChunk();
}

// 3.2. Debouncing и Throttling
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const handleSearch = debounce((query) => {
  // Выполняем поиск
}, 300);

// 3.3. Web Workers для тяжелых вычислений
// main.js
const worker = new Worker('worker.js');

worker.postMessage({data: largeDataset});

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = processData(e.data);
  self.postMessage(result);
};

// 3.4. Passive Event Listeners
// ❌ Плохо - блокирует скролл
element.addEventListener('touchstart', handler);

// ✅ Хорошо
element.addEventListener('touchstart', handler, {passive: true});

// 3.5. requestIdleCallback для неважных задач
requestIdleCallback(() => {
  // Аналитика, логирование
  sendAnalytics();
});

// ============ 4. FCP (First Contentful Paint) ============
// Цель: < 1.8s (Good), < 3.0s (Needs Improvement)

// 4.1. Critical CSS inline
<style>
  /* Критические стили для above-the-fold */
  body { margin: 0; font-family: sans-serif; }
  .header { background: #000; color: #fff; }
</style>

// 4.2. Отложенная загрузка некритичного CSS
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">

// 4.3. Defer/Async для скриптов
// Defer - выполнится после парсинга HTML
<script defer src="app.js"><\/script>

// Async - выполнится как загрузится
<script async src="analytics.js"><\/script>

// 4.4. Минимизация блокирующих ресурсов
// Webpack/Vite configuration
{
optimization: {
splitChunks: {
chunks: 'all',
cacheGroups: {
vendor: {
test: /[\\\\/]node_modules[\\\\/]/,
priority: -10
}
}
}
}
}

// ============ 5. TTFB (Time to First Byte) ============
// Цель: < 800ms (Good), < 1800ms (Needs Improvement)

// 5.1. CDN
// Используйте Cloudflare, AWS CloudFront, Fastly

// 5.2. Edge Computing
// Cloudflare Workers, Vercel Edge Functions
export default async function handler(request) {
// Обработка на edge
return new Response('Hello from Edge!');
}

// 5.3. Кэширование
// HTTP Headers
Cache-Control: public, max-age=31536000, immutable

// Service Worker
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});

// 5.4. HTTP/2 Server Push (осторожно!)
// Только для критических ресурсов
Link: </style.css>; rel=preload; as=style

// ============ 6. TBT (Total Blocking Time) ============
// Цель: < 200ms (Good), < 600ms (Needs Improvement)

// 6.1. Code Splitting
// React lazy loading
import {lazy, Suspense} from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
return (
<Suspense fallback={<div>Loading...</div>}>
<HeavyComponent />
</Suspense>
);
}

// 6.2. Tree Shaking
// Import только нужное
// ❌ Плохо
import _ from 'lodash';

// ✅ Хорошо
import debounce from 'lodash/debounce';

// 6.3. Удаление неиспользуемого кода
// Vite/Webpack автоматически при production build

// 6.4. Lighthouse CI для мониторинга
// .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
run: |
npm install -g @lhci/cli
lhci autorun
`

const monitoringSnippet = `
// ===================================================================
// МОНИТОРИНГ WEB VITALS
// ===================================================================

// 1. Google Analytics 4
function sendToGoogleAnalytics({name, value, id, rating}) {
gtag('event', name, {
event_category: 'Web Vitals',
event_label: id,
value: Math.round(name === 'CLS' ? value * 1000 : value),
metric_rating: rating,
non_interaction: true,
});
}

import {onCLS, onFCP, onLCP, onTTFB, onINP} from 'web-vitals';

onCLS(sendToGoogleAnalytics);
onFCP(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
onTTFB(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);

// ===================================================================

// 2. Sentry Performance Monitoring
import * as Sentry from '@sentry/browser';
import {BrowserTracing} from '@sentry/tracing';

Sentry.init({
dsn: 'YOUR_SENTRY_DSN',
integrations: [new BrowserTracing()],
tracesSampleRate: 0.1, // 10% transactions
});

// ===================================================================

// 3. Custom Analytics Backend
class PerformanceMonitor {
constructor(endpoint) {
this.endpoint = endpoint;
this.metrics = new Map();
}

recordMetric(name, value, context = {}) {
this.metrics.set(name, {
value,
timestamp: Date.now(),
context
});
}

async flush() {
const data = Array.from(this.metrics.entries()).map(([name, data]) => ({
name,
...data
}));

try {
await fetch(this.endpoint, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({
metrics: data,
page: window.location.pathname,
userAgent: navigator.userAgent,
connection: navigator.connection?.effectiveType
}),
keepalive: true
});

this.metrics.clear();
} catch (error) {
console.error('Failed to send metrics:', error);
}
}
}

const monitor = new PerformanceMonitor('/api/metrics');

// Использование с web-vitals
onLCP((metric) => {
monitor.recordMetric('LCP', metric.value, {
rating: metric.rating,
element: metric.entries[0]?.element?.tagName
});
monitor.flush();
});

// ===================================================================

// 4. Real User Monitoring (RUM)
class RUMCollector {
constructor() {
this.sessionId = this.generateSessionId();
this.pageViewId = this.generatePageViewId();

this.collectDeviceInfo();
this.startCollecting();
}

collectDeviceInfo() {
this.deviceInfo = {
screen: \`\${screen.width}x\${screen.height}\`,
viewport: \`\${window.innerWidth}x\${window.innerHeight}\`,
deviceMemory: navigator.deviceMemory,
hardwareConcurrency: navigator.hardwareConcurrency,
connection: navigator.connection?.effectiveType,
saveData: navigator.connection?.saveData
};
}

startCollecting() {
// Web Vitals
onLCP(metric => this.send('LCP', metric));
onFCP(metric => this.send('FCP', metric));
onCLS(metric => this.send('CLS', metric));
onTTFB(metric => this.send('TTFB', metric));
onINP(metric => this.send('INP', metric));

// Custom metrics
this.collectResourceTiming();
this.collectLongTasks();
this.collectErrors();
}

collectResourceTiming() {
const observer = new PerformanceObserver((list) => {
for (const entry of list.getEntries()) {
if (entry.duration > 1000) { // Медленные ресурсы
this.send('slow-resource', {
name: entry.name,
duration: entry.duration,
type: entry.initiatorType
});
}
}
});
observer.observe({entryTypes: ['resource']});
}

collectLongTasks() {
const observer = new PerformanceObserver((list) => {
for (const entry of list.getEntries()) {
this.send('long-task', {
duration: entry.duration,
startTime: entry.startTime
});
}
});
observer.observe({entryTypes: ['longtask']});
}

collectErrors() {
window.addEventListener('error', (event) => {
this.send('js-error', {
message: event.message,
filename: event.filename,
lineno: event.lineno,
colno: event.colno
});
});

window.addEventListener('unhandledrejection', (event) => {
this.send('unhandled-rejection', {
reason: event.reason?.message || String(event.reason)
});
});
}

send(metricName, data) {
const payload = {
sessionId: this.sessionId,
pageViewId: this.pageViewId,
metricName,
data,
deviceInfo: this.deviceInfo,
page: window.location.pathname,
timestamp: Date.now()
};

navigator.sendBeacon('/api/rum', JSON.stringify(payload));
}

generateSessionId() {
return \`session_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
}

generatePageViewId() {
return \`page_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
}
}

// Инициализация
const rum = new RUMCollector();

// ===================================================================

// 5. Performance Budget Monitoring
class PerformanceBudget {
constructor(budgets) {
this.budgets = budgets;
this.violations = [];
}

check(metric, value) {
const budget = this.budgets[metric];

if (!budget) return;

if (value > budget.max) {
this.violations.push({
metric,
value,
budget: budget.max,
severity: value > budget.max * 1.5 ? 'critical' : 'warning'
});
}
}

report() {
if (this.violations.length === 0) {
console.log('✅ All performance budgets met!');
return;
}

console.warn('⚠️ Performance budget violations:');
this.violations.forEach(v => {
console.warn(\`\${v.metric}: \${v.value}ms (budget: \${v.budget}ms) - \${v.severity}\`);
});

// Отправка в мониторинг
fetch('/api/budget-violations', {
method: 'POST',
body: JSON.stringify(this.violations),
keepalive: true
});
}
}

const budget = new PerformanceBudget({
LCP: {max: 2500},
FCP: {max: 1800},
CLS: {max: 0.1},
INP: {max: 200},
TTFB: {max: 800}
});

onLCP(metric => budget.check('LCP', metric.value));
onFCP(metric => budget.check('FCP', metric.value));
onCLS(metric => budget.check('CLS', metric.value));
onINP(metric => budget.check('INP', metric.value));
onTTFB(metric => budget.check('TTFB', metric.value));

window.addEventListener('load', () => {
setTimeout(() => budget.report(), 1000);
});
`

const toolsSnippet = `
// ===================================================================
// ИНСТРУМЕНТЫ ДЛЯ МОНИТОРИНГА И ОПТИМИЗАЦИИ
// ===================================================================

// 1. Chrome DevTools Performance
// - Performance tab → Record → Analyze
// - Показывает FPS, Main thread activity, Network
// - Web Vitals в Experience section

// 2. Lighthouse
// - Chrome DevTools → Lighthouse tab
// - CLI: npm install -g lighthouse
lighthouse https://example.com --view

// 3. PageSpeed Insights
// - https://pagespeed.web.dev/
// - Real user data (CrUX) + Lab data (Lighthouse)

// 4. WebPageTest
// - https://www.webpagetest.org/
// - Multiple locations, devices, connections
// - Filmstrip view, waterfall charts

// 5. Chrome User Experience Report (CrUX)
// - Real user data from Chrome browsers
// - BigQuery: https://web.dev/chrome-ux-report-bigquery/
SELECT
origin,
ROUND(p75_lcp / 1000, 2) AS lcp_p75
FROM
\`chrome-ux-report.all.202401\`
WHERE
origin = 'https://example.com'

// 6. Lighthouse CI для CI/CD
// lighthouserc.js
module.exports = {
ci: {
collect: {
url: ['http://localhost:3000/'],
numberOfRuns: 3,
},
assert: {
assertions: {
'categories:performance': ['error', {minScore: 0.9}],
'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
'total-blocking-time': ['error', {maxNumericValue: 200}],
},
},
upload: {
target: 'temporary-public-storage',
},
},
};

// GitHub Actions
- name: Run Lighthouse CI
run: |
npm install -g @lhci/cli
lhci autorun

// 7. Monitoring Services
// - Sentry Performance
// - New Relic Browser
// - Datadog RUM
// - SpeedCurve
// - Calibre
// - DebugBear

// 8. Bundle Analyzers
// Webpack Bundle Analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
plugins: [
new BundleAnalyzerPlugin()
]
};

// Vite Bundle Visualizer
import {visualizer} from 'rollup-plugin-visualizer';

export default {
plugins: [
visualizer({
open: true,
gzipSize: true,
brotliSize: true,
})
]
};

// 9. Performance Budgets
// package.json
{
"scripts": {
"check-size": "size-limit"
},
"size-limit": [
{
"path": "dist/bundle.js",
"limit": "170 KB"
},
{
"path": "dist/vendor.js",
"limit": "100 KB"
}
]
}

// 10. Web Vitals Extension
// Chrome Extension: Web Vitals
// Показывает метрики прямо в браузере в реальном времени
`

const highlightedMeasuring = ref('')
const highlightedOptimization = ref('')
const highlightedMonitoring = ref('')
const highlightedTools = ref('')

onMounted(() => {
highlightedMeasuring.value = Prism.highlight(measuringSnippet, Prism.languages.javascript, 'javascript')
highlightedOptimization.value = Prism.highlight(optimizationSnippet, Prism.languages.javascript, 'javascript')
highlightedMonitoring.value = Prism.highlight(monitoringSnippet, Prism.languages.javascript, 'javascript')
highlightedTools.value = Prism.highlight(toolsSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Vitals — ключевые метрики производительности веб-приложений
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Vitals</b> — это набор метрик от Google, которые измеряют реальный пользовательский опыт.
              Они влияют на SEO ранжирование и критически важны для конверсии. <b>Core Web Vitals</b> — три
              основные метрики: <b>LCP</b> (скорость загрузки), <b>INP</b> (интерактивность),
              <b>CLS</b> (визуальная стабильность).
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Core Web Vitals — ключевые метрики</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="primary" variant="tonal">
                  <v-icon size="large" color="primary" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">LCP</h3>
                  <p class="text-h5 font-weight-bold text-primary mb-1">&lt; 2.5s</p>
                  <p class="text-body-2 ma-0">Largest Contentful Paint<br>Загрузка основного контента</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="success" variant="tonal">
                  <v-icon size="large" color="success" class="mb-2">mdi-cursor-default-click</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">INP</h3>
                  <p class="text-h5 font-weight-bold text-success mb-1">&lt; 200ms</p>
                  <p class="text-body-2 ma-0">Interaction to Next Paint<br>Время отклика на действия</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="warning" variant="tonal">
                  <v-icon size="large" color="warning" class="mb-2">mdi-image-broken-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">CLS</h3>
                  <p class="text-h5 font-weight-bold text-warning mb-1">&lt; 0.1</p>
                  <p class="text-body-2 ma-0">Cumulative Layout Shift<br>Визуальная стабильность</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Все Web Vitals метрики</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метрика</th>
                <th class="text-left font-weight-bold">Что измеряет</th>
                <th class="text-left font-weight-bold">Good</th>
                <th class="text-left font-weight-bold">Needs Improvement</th>
                <th class="text-left font-weight-bold">Poor</th>
              </tr>
              </thead>
              <tbody>
              <tr class="bg-primary-lighten-5">
                <td><b>LCP</b></td>
                <td>Время загрузки самого большого элемента</td>
                <td class="text-success">&lt; 2.5s</td>
                <td class="text-warning">2.5s - 4.0s</td>
                <td class="text-error">&gt; 4.0s</td>
              </tr>
              <tr class="bg-success-lighten-5">
                <td><b>INP</b></td>
                <td>Время реакции на взаимодействие</td>
                <td class="text-success">&lt; 200ms</td>
                <td class="text-warning">200ms - 500ms</td>
                <td class="text-error">&gt; 500ms</td>
              </tr>
              <tr class="bg-warning-lighten-5">
                <td><b>CLS</b></td>
                <td>Сдвиг макета во время загрузки</td>
                <td class="text-success">&lt; 0.1</td>
                <td class="text-warning">0.1 - 0.25</td>
                <td class="text-error">&gt; 0.25</td>
              </tr>
              <tr>
                <td><b>FCP</b></td>
                <td>Первый рендер контента</td>
                <td class="text-success">&lt; 1.8s</td>
                <td class="text-warning">1.8s - 3.0s</td>
                <td class="text-error">&gt; 3.0s</td>
              </tr>
              <tr>
                <td><b>TTFB</b></td>
                <td>Время до первого байта от сервера</td>
                <td class="text-success">&lt; 800ms</td>
                <td class="text-warning">800ms - 1.8s</td>
                <td class="text-error">&gt; 1.8s</td>
              </tr>
              <tr>
                <td><b>TBT</b></td>
                <td>Время блокировки главного потока</td>
                <td class="text-success">&lt; 200ms</td>
                <td class="text-warning">200ms - 600ms</td>
                <td class="text-error">&gt; 600ms</td>
              </tr>
              <tr>
                <td><b>FID</b> (устарел)</td>
                <td>Задержка первого взаимодействия</td>
                <td class="text-success">&lt; 100ms</td>
                <td class="text-warning">100ms - 300ms</td>
                <td class="text-error">&gt; 300ms</td>
              </tr>
              </tbody>
            </v-table>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> С марта 2024 <b>FID заменен на INP</b>. INP более точно отражает отзывчивость
              на все взаимодействия пользователя, а не только на первое.
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Как измерять Web Vitals</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMeasuring"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Способы оптимизации каждой метрики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOptimization"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Мониторинг в Production</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMonitoring"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для анализа</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTools"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Краткая сводка оптимизаций</h2>

            <v-expansion-panels variant="accordion" class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>LCP — Largest Contentful Paint</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Оптимизация изображений (WebP, AVIF, srcset)</li>
                    <li>Preload критических ресурсов</li>
                    <li>CDN для статики</li>
                    <li>Уменьшение TTFB (кэширование, edge computing)</li>
                    <li>Удаление render-blocking ресурсов</li>
                    <li>fetchpriority="high" для LCP элемента</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>INP — Interaction to Next Paint</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Разбивка длинных задач</li>
                    <li>Web Workers для вычислений</li>
                    <li>Debounce/throttle для событий</li>
                    <li>Code splitting и lazy loading</li>
                    <li>Passive event listeners</li>
                    <li>requestIdleCallback для второстепенных задач</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>CLS — Cumulative Layout Shift</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Явные размеры изображений (width/height)</li>
                    <li>Резервирование места для динамического контента</li>
                    <li>font-display: optional для шрифтов</li>
                    <li>Transform вместо top/left для анимаций</li>
                    <li>Избегайте вставки контента сверху</li>
                    <li>Минимальная высота для рекламных слотов</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>FCP — First Contentful Paint</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Critical CSS inline</li>
                    <li>Defer/async для скриптов</li>
                    <li>Preconnect для важных доменов</li>
                    <li>Минификация HTML/CSS/JS</li>
                    <li>HTTP/2 или HTTP/3</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>TTFB — Time to First Byte</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>CDN близко к пользователям</li>
                    <li>Server-side caching (Redis, Memcached)</li>
                    <li>Database optimization</li>
                    <li>Edge computing</li>
                    <li>HTTP/2 Server Push (осторожно)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>TBT — Total Blocking Time</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Code splitting</li>
                    <li>Tree shaking</li>
                    <li>Удаление неиспользуемого кода</li>
                    <li>Lazy loading компонентов</li>
                    <li>Import только необходимого</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>

            <v-expansion-panels variant="accordion" class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>1. Что такое Core Web Vitals и почему они важны?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Core Web Vitals — три ключевые метрики пользовательского опыта: <b>LCP</b> (скорость загрузки),
                  <b>INP</b> (интерактивность), <b>CLS</b> (визуальная стабильность). Они важны потому что:
                  влияют на SEO ранжирование в Google, напрямую коррелируют с конверсией (медленные сайты теряют
                  пользователей), и являются измеримыми показателями UX.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>2. В чем разница между FID и INP?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <b>FID</b> (First Input Delay) измерял только первое взаимодействие пользователя.
                  <b>INP</b> (Interaction to Next Paint) измеряет все взаимодействия на странице и берет
                  наихудший показатель (с исключением выбросов). INP лучше отражает реальную отзывчивость.
                  С марта 2024 INP заменил FID в Core Web Vitals.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>3. Как оптимизировать LCP для страницы с большим hero-изображением?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li>Современные форматы (WebP, AVIF) с fallback</li>
                    <li>Адаптивные изображения через srcset и sizes</li>
                    <li>Preload изображения: <code>&lt;link rel="preload" as="image" href="hero.jpg"&gt;</code></li>
                    <li>fetchpriority="high" на img теге</li>
                    <li>CDN для доставки</li>
                    <li>loading="eager" (не lazy!)</li>
                    <li>Правильные размеры (не масштабирование в CSS)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>4. Почему CLS 0.15 считается плохим показателем?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  CLS > 0.1 попадает в категорию "Needs Improvement". Это означает заметные сдвиги контента,
                  которые раздражают пользователей. Причины: изображения без размеров, динамический контент
                  без резервирования места, web fonts с FOUT/FOIT, реклама без min-height. Пороги:
                  Good < 0.1, Needs Improvement 0.1-0.25, Poor > 0.25.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>5. Как измерить Web Vitals в production?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Используйте библиотеку <code>web-vitals</code> от Google + отправка в аналитику
                  (Google Analytics, Sentry, кастомный бэкенд). Real User Monitoring (RUM) дает реальные
                  данные, в отличие от синтетических тестов (Lighthouse). Важно собирать данные от реальных
                  пользователей, так как лабораторные условия не отражают разнообразие устройств и сетей.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>6. Что такое Long Tasks и как они влияют на INP?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Long Tasks — задачи JavaScript, которые блокируют главный поток более чем на 50ms.
                  Они напрямую влияют на INP, так как браузер не может обработать взаимодействия пользователя
                  во время их выполнения. Решения: разбивка на более мелкие задачи, Web Workers,
                  <code>requestIdleCallback</code>, code splitting.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>7. Какие инструменты использовать для анализа Web Vitals?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><b>Lab data</b>: Lighthouse (DevTools/CLI), PageSpeed Insights, WebPageTest</li>
                    <li><b>Field data (RUM)</b>: Chrome UX Report (CrUX), web-vitals library, Sentry Performance</li>
                    <li><b>CI/CD</b>: Lighthouse CI, Performance budgets</li>
                    <li><b>Monitoring</b>: Google Analytics 4, New Relic, Datadog</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>8. Что делать, если TTFB медленный?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  TTFB > 800ms указывает на проблемы сервера:
                  <ul class="pl-4">
                    <li>Медленные database queries (добавить индексы, кэширование)</li>
                    <li>Большая географическая дистанция (использовать CDN)</li>
                    <li>Нет server-side кэширования (Redis, Memcached)</li>
                    <li>Slow network (HTTP/2, HTTP/3)</li>
                    <li>Не используется edge computing</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Практический чеклист оптимизации</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">🚀 Быстрые wins</h3>
                  <ul class="pl-4">
                    <li>Сжатие изображений (WebP/AVIF)</li>
                    <li>Defer/async для скриптов</li>
                    <li>Width/height для img</li>
                    <li>CDN для статики</li>
                    <li>Минификация CSS/JS</li>
                    <li>Gzip/Brotli сжатие</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="primary" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">🔧 Средней сложности</h3>
                  <ul class="pl-4">
                    <li>Code splitting</li>
                    <li>Lazy loading компонентов</li>
                    <li>Critical CSS inline</li>
                    <li>Preload ключевых ресурсов</li>
                    <li>Resource hints (preconnect)</li>
                    <li>Service Worker caching</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">⚙️ Требует усилий</h3>
                  <ul class="pl-4">
                    <li>Рефакторинг Long Tasks</li>
                    <li>Web Workers</li>
                    <li>SSR/SSG оптимизация</li>
                    <li>Database optimization</li>
                    <li>Edge computing</li>
                    <li>HTTP/3 migration</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">📊 Мониторинг</h3>
                  <ul class="pl-4">
                    <li>RUM с web-vitals</li>
                    <li>Lighthouse CI</li>
                    <li>Performance budgets</li>
                    <li>Alerting на регрессии</li>
                    <li>A/B тесты оптимизаций</li>
                    <li>CrUX данные</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Web Vitals</b> — это объективные метрики пользовательского опыта, влияющие на SEO и конверсию.
              <b>Core Web Vitals</b> (LCP, INP, CLS) — минимальный набор, который должен быть в норме.
              Измерение через <code>web-vitals</code> библиотеку + RUM, оптимизация через комплекс техник
              (изображения, код, инфраструктура), мониторинг через Lighthouse CI и production analytics.
              Ключ к успеху — систематический подход: измерение → оптимизация → валидация → мониторинг.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://web.dev/vitals/"
                target="_blank"
                class="mr-2">
                Web Vitals Guide
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/GoogleChrome/web-vitals"
                target="_blank"
                class="mr-2">
                web-vitals Library
              </v-btn>
              <v-btn
                color="info"
                size="small"
                variant="elevated"
                href="https://pagespeed.web.dev/"
                target="_blank">
                PageSpeed Insights
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
