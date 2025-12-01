<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const introSnippet = `
// Web Vitals - ключевые метрики производительности от Google

// Три основные (Core Web Vitals):
// 1. LCP (Largest Contentful Paint) - загрузка контента
// 2. FID (First Input Delay) → INP (Interaction to Next Paint) - интерактивность
// 3. CLS (Cumulative Layout Shift) - визуальная стабильность

// Дополнительные метрики:
// - FCP (First Contentful Paint) - первое отображение контента
// - TTFB (Time to First Byte) - время до первого байта
// - TBT (Total Blocking Time) - общее время блокировки
`

const lcpSnippet = `
// LCP - Largest Contentful Paint
// Измеряет время отрисовки самого большого контентного элемента

// Что считается LCP элементом:
// - <img> элементы
// - <image> внутри <svg>
// - <video> элементы (постер)
// - Элементы с background-image через CSS
// - Блочные элементы с текстом

// Хорошие значения:
// ✅ Отлично: < 2.5 секунд
// ⚠️  Требует улучшения: 2.5 - 4 секунды
// ❌ Плохо: > 4 секунд

// Как улучшить LCP:
// 1. Оптимизация изображений
<img
  src="hero.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Hero image"
  loading="eager"
  fetchpriority="high"
>

// 2. Предзагрузка критических ресурсов
<link rel="preload" as="image" href="hero.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.example.com">

// 3. Серверная оптимизация
// - Используйте CDN
// - Включите HTTP/2 или HTTP/3
// - Оптимизируйте TTFB
// - Используйте кэширование

// 4. Оптимизация CSS
// - Критичный CSS inline
// - Ленивая загрузка некритичного CSS
<style>
  /* Критичные стили inline */
  .hero { display: block; width: 100%; }
</style>
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">

// 5. Избегайте рендер-блокирующих ресурсов
<script src="app.js" defer><\/script>
<script src="analytics.js" async><\/script>
`

const inpSnippet = `
// INP - Interaction to Next Paint (заменил FID в 2024)
// Измеряет отзывчивость на взаимодействия пользователя

// FID (старая метрика):
// - Измерял только ПЕРВОЕ взаимодействие
// - Время от клика до начала обработки

// INP (новая метрика):
// - Измеряет ВСЕ взаимодействия
// - Время от взаимодействия до следующей отрисовки
// - Более полная картина интерактивности

// Хорошие значения:
// ✅ Отлично: < 200 мс
// ⚠️  Требует улучшения: 200 - 500 мс
// ❌ Плохо: > 500 мс

// Как улучшить INP:

// 1. Оптимизация обработчиков событий
// ❌ Плохо - тяжелая синхронная работа
button.addEventListener('click', () => {
// Блокирующая операция
const result = heavyComputation();
updateUI(result);
});

// ✅ Хорошо - разбиваем на части
button.addEventListener('click', async () => {
// Показываем индикатор загрузки сразу
showLoadingIndicator();

// Вычисления в следующем фрейме
await scheduler.postTask(() => {
const result = heavyComputation();
updateUI(result);
}, { priority: 'user-blocking' });

hideLoadingIndicator();
});

// 2. Используйте Web Workers для тяжелых вычислений
// worker.js
self.addEventListener('message', (e) => {
const result = performHeavyCalculation(e.data);
self.postMessage(result);
});

// main.js
const worker = new Worker('worker.js');
button.addEventListener('click', () => {
showLoadingIndicator();
worker.postMessage(data);
worker.onmessage = (e) => {
updateUI(e.data);
hideLoadingIndicator();
};
});

// 3. Дебаунсинг и троттлинг
// Дебаунсинг для поиска
let debounceTimer;
searchInput.addEventListener('input', (e) => {
clearTimeout(debounceTimer);
debounceTimer = setTimeout(() => {
performSearch(e.target.value);
}, 300);
});

// Троттлинг для скролла
let lastRun = 0;
const throttleDelay = 100;
window.addEventListener('scroll', () => {
const now = Date.now();
if (now - lastRun >= throttleDelay) {
updateScrollPosition();
lastRun = now;
}
});

// 4. Оптимизация рендеринга в React
import { memo, useMemo, useCallback } from 'react';

// Мемоизация компонентов
const ExpensiveComponent = memo(({ data }) => {
const processedData = useMemo(() =>
heavyProcessing(data),
[data]
);

const handleClick = useCallback(() => {
// обработка
}, []);

return <div onClick={handleClick}>{processedData}</div>;
});

// 5. Виртуализация длинных списков
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
return (
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
{({ index, style }) => (
<div style={style}>{items[index]}</div>
)}
</FixedSizeList>
);
}
`

const clsSnippet = `
// CLS - Cumulative Layout Shift
// Измеряет визуальную стабильность страницы

// Хорошие значения:
// ✅ Отлично: < 0.1
// ⚠️  Требует улучшения: 0.1 - 0.25
// ❌ Плохо: > 0.25

// Расчет: Layout Shift Score = Impact Fraction × Distance Fraction
// Impact Fraction - % viewport, затронутого сдвигом
// Distance Fraction - расстояние сдвига / размер viewport

// Как улучшить CLS:

// 1. Резервируйте место для изображений и видео
// ❌ Плохо
<img src="image.jpg" alt="Image">

// ✅ Хорошо - указываем размеры
<img
  src="image.jpg"
  alt="Image"
  width="800"
  height="600"
  style="max-width: 100%; height: auto;"
>

// ✅ Еще лучше - aspect-ratio
<img
  src="image.jpg"
  alt="Image"
  style="aspect-ratio: 16/9; width: 100%;"
>

// 2. Резервируйте место для динамического контента
// ❌ Плохо - высота определяется контентом
.ad-container {
background: #f0f0f0;
}

// ✅ Хорошо - фиксированная высота или min-height
.ad-container {
min-height: 250px;
background: #f0f0f0;
}

// 3. Избегайте вставки контента над существующим
// ❌ Плохо - баннер вставляется сверху
<div class="banner">Важное объявление!</div>
<main>Контент страницы...</main>

// ✅ Хорошо - баннер с position: fixed
<div class="banner" style="position: fixed; top: 0; z-index: 1000;">
Важное объявление!
</div>
<main style="margin-top: 50px;">Контент страницы...</main>

// 4. Используйте transform вместо изменения размеров
// ❌ Плохо
.expanding-card {
transition: height 0.3s;
}
.expanding-card.open {
height: 400px;
}

// ✅ Хорошо - используем transform
.expanding-card {
height: 200px;
transform-origin: top;
transition: transform 0.3s;
}
.expanding-card.open {
transform: scaleY(2);
}

// 5. Предзагружайте шрифты и используйте font-display
<link
  rel="preload"
  href="fonts/custom-font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('fonts/custom-font.woff2') format('woff2');
  /* Избегаем FOIT (Flash of Invisible Text) */
  font-display: swap;
}
</style>

// 6. Скелетоны для загружаемого контента
function ArticleCard({ loading, data }) {
if (loading) {
return (
<div className="skeleton" style={{ height: '300px' }}>
<div className="skeleton-title"></div>
<div className="skeleton-text"></div>
<div className="skeleton-text"></div>
</div>
);
}

return <div className="article">{data}</div>;
}
`

const measurementSnippet = `
// Измерение Web Vitals в приложении

// 1. Используя библиотеку web-vitals от Google
npm install web-vitals

import { onCLS, onFID, onLCP, onINP, onFCP, onTTFB } from 'web-vitals';

// Простая отправка метрик
function sendToAnalytics(metric) {
const body = JSON.stringify(metric);

// Используем sendBeacon для надежной отправки
if (navigator.sendBeacon) {
navigator.sendBeacon('/analytics', body);
} else {
fetch('/analytics', {
body,
method: 'POST',
keepalive: true
});
}
}

// Подписываемся на все метрики
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// 2. Расширенная аналитика с контекстом
function sendToAnalytics(metric) {
const data = {
...metric,
// Добавляем контекст
url: window.location.href,
userAgent: navigator.userAgent,
connectionType: navigator.connection?.effectiveType,
deviceMemory: navigator.deviceMemory,
timestamp: Date.now(),

// Для отладки в разработке
debug: process.env.NODE_ENV === 'development'
};

console.log('Web Vital:', data);

// Отправка в аналитику
if (window.gtag) {
window.gtag('event', metric.name, {
value: Math.round(metric.value),
metric_id: metric.id,
metric_rating: metric.rating
});
}
}

// 3. React Hook для мониторинга
import { useEffect } from 'react';
import { onCLS, onINP, onLCP } from 'web-vitals';

function useWebVitals(callback) {
useEffect(() => {
onCLS(callback);
onINP(callback);
onLCP(callback);
}, [callback]);
}

// Использование
function App() {
useWebVitals((metric) => {
console.log(metric.name, metric.value);

// Отправка в аналитику
if (metric.rating === 'poor') {
reportPoorPerformance(metric);
}
});

return <div>App</div>;
}

// 4. Attribution для детальной диагностики
import { onLCP } from 'web-vitals/attribution';

onLCP((metric) => {
console.log('LCP:', metric.value);
console.log('Element:', metric.attribution.element);
console.log('URL:', metric.attribution.url);
console.log('Time to first byte:', metric.attribution.timeToFirstByte);
console.log('Resource load delay:', metric.attribution.resourceLoadDelay);
console.log('Resource load time:', metric.attribution.resourceLoadTime);
console.log('Element render delay:', metric.attribution.elementRenderDelay);
});

// 5. Performance Observer API (низкоуровневый подход)
const observer = new PerformanceObserver((list) => {
for (const entry of list.getEntries()) {
// LCP
if (entry.entryType === 'largest-contentful-paint') {
console.log('LCP:', entry.startTime, entry.element);
}

// FID/INP
if (entry.entryType === 'first-input') {
console.log('FID:', entry.processingStart - entry.startTime);
}

// CLS
if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
console.log('Layout shift:', entry.value);
}
}
});

observer.observe({
entryTypes: [
'largest-contentful-paint',
'first-input',
'layout-shift'
]
});

// 6. Мониторинг в Next.js
// pages/_app.js
export function reportWebVitals(metric) {
switch (metric.name) {
case 'LCP':
console.log('LCP:', metric.value);
break;
case 'INP':
console.log('INP:', metric.value);
break;
case 'CLS':
console.log('CLS:', metric.value);
break;
}

// Отправка в аналитику
if (window.gtag) {
window.gtag('event', metric.name, {
value: Math.round(metric.value),
event_category: 'Web Vitals',
non_interaction: true
});
}
}
`

const toolsSnippet = `
// Инструменты для измерения Web Vitals

// 1. Chrome DevTools
// - Открыть DevTools (F12)
// - Performance tab → Record
// - Lighthouse tab → Generate report
// - Performance Insights (новый инструмент)

// 2. PageSpeed Insights (онлайн)
// https://pagespeed.web.dev/
// - Реальные данные (Field Data) из Chrome UX Report
// - Лабораторные данные (Lab Data) с рекомендациями

// 3. Chrome UX Report (CrUX)
// - Реальные данные пользователей Chrome
// - Доступ через BigQuery, API, или PageSpeed Insights
// - Данные за последние 28 дней

// Пример запроса CrUX API:
const API_KEY = 'your-api-key';
const url = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=' + API_KEY;

fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
url: 'https://example.com',
formFactor: 'PHONE', // или DESKTOP, TABLET
metrics: ['largest_contentful_paint', 'cumulative_layout_shift', 'interaction_to_next_paint']
})
})
.then(res => res.json())
.then(data => console.log(data));

// 4. Lighthouse CI для автоматизации
// .lighthouserc.js
module.exports = {
ci: {
collect: {
numberOfRuns: 5,
url: ['http://localhost:3000']
},
assert: {
assertions: {
'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
'total-blocking-time': ['error', { maxNumericValue: 200 }]
}
},
upload: {
target: 'temporary-public-storage'
}
}
};

// 5. Real User Monitoring (RUM) сервисы
// - Google Analytics 4 (встроенные Web Vitals)
// - Sentry Performance Monitoring
// - New Relic Browser
// - Datadog RUM
// - Vercel Analytics

// Интеграция с Google Analytics 4:
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"><\/script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

// Web Vitals автоматически отправляются в GA4
<\/script>

// 6. Web Vitals Extension для Chrome
// - Устанавливается из Chrome Web Store
// - Показывает метрики в реальном времени
// - HUD (Heads-Up Display) overlay на странице
`

const optimizationSnippet = `
// Комплексная стратегия оптимизации Web Vitals

// 1. Аудит текущего состояния
// - Запустить Lighthouse в DevTools
// - Проверить PageSpeed Insights
// - Собрать данные RUM за неделю
// - Определить проблемные страницы

// 2. Приоритизация проблем
const priorities = {
critical: [
'LCP > 4s',
'CLS > 0.25',
'INP > 500ms'
],
high: [
'LCP 2.5-4s',
'CLS 0.1-0.25',
'INP 200-500ms'
],
medium: [
'TTFB > 800ms',
'FCP > 3s',
'TBT > 300ms'
]
};

// 3. Quick wins для LCP
// a) Оптимизация изображений
// - Используйте AVIF/WebP с fallback
// - Правильные размеры и srcset
// - loading="eager" для LCP изображения
// - fetchpriority="high" для критичных ресурсов

// b) Preload критичных ресурсов
<head>
<link rel="preload" as="image" href="/hero.jpg" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com">
</head>

// c) Оптимизация шрифтов
<link
  rel="preload"
  href="/fonts/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
<style>
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/font.woff2') format('woff2');
  font-display: swap; /* Или optional для LCP текста */
}
</style>

// 4. Quick wins для CLS
// a) Размеры для всех медиа
<img src="image.jpg" width="800" height="600" alt="Image">
<video width="640" height="360" poster="poster.jpg">
<source src="video.mp4" type="video/mp4">
</video>

// b) Резервирование пространства
.ad-slot {
min-height: 250px;
background: #f0f0f0;
}

.skeleton-loader {
height: 300px;
background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
animation: shimmer 1.5s infinite;
}

// c) Избегайте динамических баннеров
.cookie-banner {
position: fixed;
bottom: 0;
left: 0;
right: 0;
/* Не сдвигает контент */
}

// 5. Quick wins для INP
// a) Разделение длинных задач
async function processLargeDataset(data) {
const chunkSize = 100;

for (let i = 0; i < data.length; i += chunkSize) {
const chunk = data.slice(i, i + chunkSize);
await processChunk(chunk);

// Отдаем управление браузеру
await new Promise(resolve => setTimeout(resolve, 0));
}
}

// b) Дебаунс и троттлинг
import { debounce, throttle } from 'lodash';

const handleSearch = debounce((query) => {
performSearch(query);
}, 300);

const handleScroll = throttle(() => {
updateScrollPosition();
}, 100);

// c) Code splitting
// Ленивая загрузка компонентов
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Динамический импорт
button.addEventListener('click', async () => {
const module = await import('./heavy-module.js');
module.doSomething();
});

// 6. Мониторинг и алерты
class WebVitalsMonitor {
constructor() {
this.thresholds = {
lcp: { good: 2500, poor: 4000 },
inp: { good: 200, poor: 500 },
cls: { good: 0.1, poor: 0.25 }
};
}

check(metric) {
const threshold = this.thresholds[metric.name.toLowerCase()];

if (metric.value > threshold.poor) {
this.alert('critical', metric);
} else if (metric.value > threshold.good) {
this.alert('warning', metric);
}
}

alert(level, metric) {
// Отправка в систему мониторинга
console.error(\`[\${level.toUpperCase()}] \${metric.name}: \${metric.value}\`);

// Можно интегрировать с Sentry, Datadog и т.д.
if (window.Sentry) {
Sentry.captureMessage(\`Poor \${metric.name}\`, {
level: level,
extra: metric
});
}
}
}

const monitor = new WebVitalsMonitor();
onLCP((metric) => monitor.check(metric));
onINP((metric) => monitor.check(metric));
onCLS((metric) => monitor.check(metric));

// 7. A/B тестирование оптимизаций
function trackExperiment(metric) {
const variant = getExperimentVariant(); // 'control' или 'test'

sendToAnalytics({
...metric,
experiment: 'image-optimization',
variant: variant
});
}
`

const seoSnippet = `
// Web Vitals и SEO: влияние на ранжирование в Google

// 1. Page Experience сигналы ранжирования (с 2021)
const pageExperienceSignals = {
coreWebVitals: {
lcp: 'Largest Contentful Paint',
inp: 'Interaction to Next Paint',
cls: 'Cumulative Layout Shift'
},
mobileFriendly: 'Mobile-friendliness',
safeeBrowsing: 'No intrusive interstitials',
https: 'HTTPS security',
noIntrusiveInterstitials: 'No popups blocking content'
};

// 2. Как Google использует Web Vitals для ранжирования
/*
Факторы влияния:
- Core Web Vitals - прямой фактор ранжирования
- Данные берутся из Chrome UX Report (реальные пользователи)
- Оценка на уровне URL, не всего сайта
- Используются 75-й перцентиль метрик
- Мобильная и десктопная версии оцениваются отдельно

Важно:
- Качество контента остается основным фактором
- Web Vitals - tie-breaker между схожими по контенту страницами
- Плохие метрики могут снизить позиции
*/

// 3. Проверка статуса в Google Search Console
/*
Search Console → Core Web Vitals report:
- Показывает URL с проблемами
- Разделение на Mobile и Desktop
- Группировка по типам проблем
- Исторические данные

Категории:
✅ Good URLs - все метрики в норме
⚠️  Needs Improvement - некоторые метрики требуют улучшения
❌ Poor URLs - критические проблемы
*/

// 4. Structured Data для богатых результатов
// Web Vitals важны для показа rich snippets
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#main-content", ".article-body"]
  }
}
<\/script>

// 5. Мониторинг влияния на позиции
class SEOPerformanceTracker {
async trackRankings(url) {
// Получаем Web Vitals
const vitals = await this.getWebVitals(url);

// Получаем позиции в поиске
const rankings = await this.getSearchRankings(url);

// Корреляционный анализ
return {
url,
vitals,
rankings,
correlation: this.calculateCorrelation(vitals, rankings)
};
}

calculateCorrelation(vitals, rankings) {
// Упрощенный пример
const vitalsScore = (
(vitals.lcp < 2500 ? 1 : 0) +
(vitals.inp < 200 ? 1 : 0) +
(vitals.cls < 0.1 ? 1 : 0)
) / 3;

return {
vitalsScore,
averagePosition: rankings.averagePosition,
trend: rankings.trend
};
}
}

// 6. Рекомендации для SEO
const seoOptimizationChecklist = {
technical: [
'✅ Все Core Web Vitals в зеленой зоне',
'✅ HTTPS включен',
'✅ Mobile-friendly дизайн',
'✅ Нет intrusive interstitials',
'✅ Safe browsing (без malware)'
],

content: [
'✅ Качественный, уникальный контент',
'✅ Правильная структура заголовков (H1-H6)',
'✅ Оптимизированные meta теги',
'✅ Structured data разметка',
'✅ Внутренняя перелинковка'
],

monitoring: [
'✅ Google Search Console настроен',
'✅ Регулярный мониторинг Web Vitals',
'✅ Отслеживание позиций',
'✅ Анализ конкурентов',
'✅ A/B тестирование оптимизаций'
]
};

// 7. Приоритеты для максимального SEO эффекта
/*
Высокий приоритет:
1. LCP < 2.5s - самый важный для пользовательского опыта
2. CLS < 0.1 - критичен для мобильных устройств
3. INP < 200ms - важен для интерактивных страниц

Средний приоритет:
4. FCP < 1.8s - первое впечатление
5. TTFB < 800ms - серверная производительность

Низкий приоритет (но желательно):
6. TBT < 200ms
7. Speed Index < 3.4s
*/

// 8. Кейс: улучшение ранжирования через Web Vitals
/*
Пример результатов оптимизации:

До оптимизации:
- LCP: 4.2s
- INP: 450ms
- CLS: 0.18
- Средняя позиция: 12

После оптимизации:
- LCP: 2.1s (-50%)
- INP: 150ms (-67%)
- CLS: 0.05 (-72%)
- Средняя позиция: 7 (+5 позиций)

Действия:
1. Оптимизация изображений (LCP)
2. Code splitting (INP)
3. Резервирование пространства (CLS)
4. CDN и кэширование (TTFB)

Результат через 3 месяца:
- Органический трафик +35%
- Время на сайте +22%
- Bounce rate -15%
*/
`

const highlightedIntro = ref('')
const highlightedLCP = ref('')
const highlightedINP = ref('')
const highlightedCLS = ref('')
const highlightedMeasurement = ref('')
const highlightedTools = ref('')
const highlightedOptimization = ref('')
const highlightedSEO = ref('')

onMounted(() => {
highlightedIntro.value = Prism.highlight(introSnippet, Prism.languages.javascript, 'javascript')
highlightedLCP.value = Prism.highlight(lcpSnippet, Prism.languages.javascript, 'javascript')
highlightedINP.value = Prism.highlight(inpSnippet, Prism.languages.javascript, 'javascript')
highlightedCLS.value = Prism.highlight(clsSnippet, Prism.languages.javascript, 'javascript')
highlightedMeasurement.value = Prism.highlight(measurementSnippet, Prism.languages.javascript, 'javascript')
highlightedTools.value = Prism.highlight(toolsSnippet, Prism.languages.javascript, 'javascript')
highlightedOptimization.value = Prism.highlight(optimizationSnippet, Prism.languages.javascript, 'javascript')
highlightedSEO.value = Prism.highlight(seoSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Vitals: метрики производительности и пользовательского опыта
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Vitals</b> — это набор метрик от Google для измерения реального пользовательского опыта на веб-сайтах.
              Три основные метрики (Core Web Vitals) являются факторами ранжирования в Google Search с 2021 года.
              Понимание и оптимизация этих метрик критически важны для современной веб-разработки.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Введение в Web Vitals</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedIntro"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Core Web Vitals: основные метрики</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-image-multiple</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">LCP</h3>
                  <p class="text-body-2 mb-2"><b>Largest Contentful Paint</b></p>
                  <p class="text-body-2 mb-3">Время загрузки самого большого контентного элемента</p>
                  <div class="text-caption">
                    <div class="text-success mb-1">✅ Отлично: &lt; 2.5с</div>
                    <div class="text-warning mb-1">⚠️ Улучшить: 2.5-4с</div>
                    <div class="text-error">❌ Плохо: &gt; 4с</div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-cursor-default-click</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">INP</h3>
                  <p class="text-body-2 mb-2"><b>Interaction to Next Paint</b></p>
                  <p class="text-body-2 mb-3">Отзывчивость на взаимодействия пользователя</p>
                  <div class="text-caption">
                    <div class="text-success mb-1">✅ Отлично: &lt; 200мс</div>
                    <div class="text-warning mb-1">⚠️ Улучшить: 200-500мс</div>
                    <div class="text-error">❌ Плохо: &gt; 500мс</div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-motion</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">CLS</h3>
                  <p class="text-body-2 mb-2"><b>Cumulative Layout Shift</b></p>
                  <p class="text-body-2 mb-3">Визуальная стабильность страницы</p>
                  <div class="text-caption">
                    <div class="text-success mb-1">✅ Отлично: &lt; 0.1</div>
                    <div class="text-warning mb-1">⚠️ Улучшить: 0.1-0.25</div>
                    <div class="text-error">❌ Плохо: &gt; 0.25</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">LCP - Largest Contentful Paint</h2>
            <p class="font-weight-regular mb-4">
              LCP измеряет производительность загрузки, фиксируя время отрисовки самого большого
              элемента контента в viewport. Это наиболее важная метрика воспринимаемой скорости загрузки.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLCP"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">INP - Interaction to Next Paint</h2>
            <p class="font-weight-regular mb-4">
              INP заменил FID в 2024 году как основную метрику интерактивности. Измеряет задержку
              между взаимодействием пользователя и визуальным откликом для ВСЕХ взаимодействий на странице.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedINP"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CLS - Cumulative Layout Shift</h2>
            <p class="font-weight-regular mb-4">
              CLS измеряет визуальную стабильность — сколько неожиданных сдвигов макета происходит
              во время загрузки страницы. Важен для предотвращения случайных кликов.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCLS"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Дополнительные метрики</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метрика</th>
                <th class="text-left font-weight-bold">Что измеряет</th>
                <th class="text-left font-weight-bold">Хорошее значение</th>
                <th class="text-left font-weight-bold">Важность</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>FCP</b></td>
                <td>First Contentful Paint - первый элемент контента</td>
                <td>&lt; 1.8с</td>
                <td>Высокая</td>
              </tr>
              <tr>
                <td><b>TTFB</b></td>
                <td>Time to First Byte - время ответа сервера</td>
                <td>&lt; 800мс</td>
                <td>Средняя</td>
              </tr>
              <tr>
                <td><b>TBT</b></td>
                <td>Total Blocking Time - время блокировки главного потока</td>
                <td>&lt; 200мс</td>
                <td>Средняя</td>
              </tr>
              <tr>
                <td><b>SI</b></td>
                <td>Speed Index - скорость визуального заполнения</td>
                <td>&lt; 3.4с</td>
                <td>Низкая</td>
              </tr>
              <tr>
                <td><b>TTI</b></td>
                <td>Time to Interactive - время до интерактивности</td>
                <td>&lt; 3.8с</td>
                <td>Низкая</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Измерение Web Vitals</h2>
            <p class="font-weight-regular mb-4">
              Существует два типа данных: <b>Field Data</b> (реальные пользователи) и <b>Lab Data</b>
              (синтетические тесты). Для объективной оценки нужны оба типа.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMeasurement"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для мониторинга</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Field Data (RUM)</h3>
                  <p class="text-body-2 mb-2">Реальные пользователи:</p>
                  <ul class="pl-4 text-body-2">
                    <li>Chrome UX Report</li>
                    <li>Google Analytics 4</li>
                    <li>web-vitals библиотека</li>
                    <li>Vercel Analytics</li>
                    <li>Sentry Performance</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Lab Data</h3>
                  <p class="text-body-2 mb-2">Синтетические тесты:</p>
                  <ul class="pl-4 text-body-2">
                    <li>Chrome DevTools Lighthouse</li>
                    <li>PageSpeed Insights</li>
                    <li>WebPageTest</li>
                    <li>Lighthouse CI</li>
                    <li>Calibre</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <p class="text-body-2 mb-2">Continuous monitoring:</p>
                  <ul class="pl-4 text-body-2">
                    <li>Google Search Console</li>
                    <li>CrUX Dashboard</li>
                    <li>SpeedCurve</li>
                    <li>Datadog RUM</li>
                    <li>New Relic Browser</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTools"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Стратегия оптимизации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOptimization"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Web Vitals и SEO</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно для SEO:</strong> С июня 2021 Core Web Vitals являются прямым фактором
              ранжирования в Google Search. Страницы с хорошими показателями получают преимущество.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSEO"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Core Web Vitals и почему они важны?</p>
                <p class="font-weight-regular ma-0">
                  Core Web Vitals — три ключевые метрики от Google: LCP (загрузка), INP (интерактивность),
                  CLS (стабильность). Они важны, потому что измеряют реальный UX и с 2021 года являются
                  фактором ранжирования в Google Search.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между FID и INP?</p>
                <p class="font-weight-regular ma-0">
                  FID измерял только ПЕРВОЕ взаимодействие пользователя. INP (с марта 2024)
                  измеряет ВСЕ взаимодействия на странице и берет 98-й перцентиль, давая более
                  полную картину отзывчивости интерфейса.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как измерить Web Vitals в production?</p>
                <p class="font-weight-regular ma-0">
                  Используйте библиотеку web-vitals от Google или RUM-сервисы (Google Analytics 4,
                  Sentry, Datadog). Данные отправляются через sendBeacon API. Важно собирать данные
                  от реальных пользователей (Field Data), а не только лабораторные тесты.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать LCP?</p>
                <p class="font-weight-regular ma-0">
                  Основные методы: оптимизация изображений (WebP/AVIF, srcset, sizes),
                  preload критичных ресурсов, оптимизация TTFB, избегание render-blocking CSS/JS,
                  использование CDN, приоритизация загрузки (fetchpriority="high").
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как предотвратить Layout Shift (CLS)?</p>
                <p class="font-weight-regular ma-0">
                  Всегда указывайте размеры изображений и видео, резервируйте пространство для
                  динамического контента (min-height), избегайте вставки контента над существующим,
                  используйте font-display: swap для шрифтов, применяйте скелетоны для загрузки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Web Vitals влияют на ранжирование в Google?</p>
                <p class="font-weight-regular ma-0">
                  Core Web Vitals — прямой фактор ранжирования с 2021 года, часть Page Experience.
                  Используются данные из Chrome UX Report (75-й перцентиль за 28 дней). Хорошие
                  метрики дают преимущество между страницами с похожим контентом. Плохие метрики
                  могут снизить позиции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Field Data и Lab Data?</p>
                <p class="font-weight-regular ma-0">
                  Field Data — реальные данные от пользователей (Chrome UX Report, RUM).
                  Lab Data — синтетические тесты в контролируемых условиях (Lighthouse).
                  Field Data точнее отражает UX, Lab Data лучше для отладки и воспроизводимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как настроить мониторинг Web Vitals в CI/CD?</p>
                <p class="font-weight-regular ma-0">
                  Используйте Lighthouse CI с конфигурацией пороговых значений. Интегрируйте в
                  GitHub Actions или GitLab CI. Блокируйте deploy при критических регрессиях.
                  Храните исторические данные для трендов. Пример: .lighthouserc.js с assertions.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Обязательно</h3>
                  <ul class="text-left pl-4">
                    <li>Измеряйте реальных пользователей (RUM)</li>
                    <li>Оптимизируйте LCP первым</li>
                    <li>Резервируйте место для контента</li>
                    <li>Используйте современные форматы</li>
                    <li>Настройте мониторинг и алерты</li>
                    <li>Тестируйте на реальных устройствах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Игнорировать Field Data</li>
                    <li>Оптимизировать только для Lighthouse</li>
                    <li>Динамические баннеры без резервирования</li>
                    <li>Большие изображения без оптимизации</li>
                    <li>Тяжелые синхронные операции</li>
                    <li>Изменение размеров после загрузки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Performance budget в CI/CD</li>
                    <li>A/B тестирование оптимизаций</li>
                    <li>Регулярный аудит конкурентов</li>
                    <li>Документирование оптимизаций</li>
                    <li>Обучение команды метрикам</li>
                    <li>Интеграция с аналитикой</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Чек-лист оптимизации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-3">Для LCP</h3>
                  <ul class="pl-4">
                    <li>☐ Оптимизированы изображения (WebP/AVIF)</li>
                    <li>☐ Настроен srcset и sizes</li>
                    <li>☐ Используется preload для критичных ресурсов</li>
                    <li>☐ Минимизирован TTFB (&lt; 800ms)</li>
                    <li>☐ Убраны render-blocking ресурсы</li>
                    <li>☐ Используется CDN</li>
                    <li>☐ Включено сжатие (Brotli/Gzip)</li>
                    <li>☐ Настроено кэширование</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-3">Для INP</h3>
                  <ul class="pl-4">
                    <li>☐ Разбиты длинные задачи</li>
                    <li>☐ Используется дебаунс/троттлинг</li>
                    <li>☐ Применен code splitting</li>
                    <li>☐ Тяжелые операции в Web Workers</li>
                    <li>☐ Оптимизированы обработчики событий</li>
                    <li>☐ Используется виртуализация списков</li>
                    <li>☐ Применена мемоизация в React</li>
                    <li>☐ Минимизирован JavaScript</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-3">Для CLS</h3>
                  <ul class="pl-4">
                    <li>☐ Указаны размеры всех изображений</li>
                    <li>☐ Зарезервировано место для рекламы</li>
                    <li>☐ Используется font-display: swap</li>
                    <li>☐ Предзагружены критичные шрифты</li>
                    <li>☐ Скелетоны для динамического контента</li>
                    <li>☐ Баннеры используют position: fixed</li>
                    <li>☐ Анимации через transform</li>
                    <li>☐ Минимизированы динамические вставки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-3">Мониторинг</h3>
                  <ul class="pl-4">
                    <li>☐ Настроен Google Search Console</li>
                    <li>☐ Интегрирована web-vitals библиотека</li>
                    <li>☐ Включен RUM мониторинг</li>
                    <li>☐ Настроены алерты на регрессии</li>
                    <li>☐ Lighthouse CI в pipeline</li>
                    <li>☐ Регулярный аудит (еженедельно)</li>
                    <li>☐ Отслеживание трендов</li>
                    <li>☐ Анализ конкурентов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Web Vitals</b> — критически важные метрики для современного веба. Core Web Vitals
              (LCP, INP, CLS) измеряют реальный пользовательский опыт и напрямую влияют на ранжирование
              в Google. Оптимизация требует комплексного подхода: измерение реальных пользователей,
              технические улучшения, мониторинг и постоянное тестирование. Хорошие показатели улучшают
              не только SEO, но и конверсию, время на сайте и лояльность пользователей.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://web.dev/vitals/"
                target="_blank"
                class="mr-2">
                web.dev/vitals
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/GoogleChrome/web-vitals"
                target="_blank"
                class="mr-2">
                web-vitals библиотека
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
