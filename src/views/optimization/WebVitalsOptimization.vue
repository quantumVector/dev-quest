<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const measuringSnippet = `
// Измерение Web Vitals

// 1. Библиотека web-vitals (рекомендуется)
import {onCLS, onFCP, onLCP, onTTFB, onINP} from 'web-vitals';
onLCP(metric => console.log('LCP:', metric.value));

// 2. Performance Observer API (нативный способ)
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => console.log(entry));
});
observer.observe({entryTypes: ['largest-contentful-paint']});

// 3. Инструменты:
// • Chrome DevTools → Lighthouse
// • PageSpeed Insights (https://pagespeed.web.dev/)
// • WebPageTest (https://www.webpagetest.org/)
`

const highlightedMeasuring = ref('')

onMounted(() => {
  highlightedMeasuring.value = Prism.highlight(measuringSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Vitals — ключевые метрики производительности
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Vitals</b> — набор метрик от Google для измерения реального пользовательского опыта.
              Влияют на SEO и критически важны для конверсии. <b>Core Web Vitals</b> — три основные метрики:
              <b>LCP</b>, <b>INP</b>, <b>CLS</b>.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Core Web Vitals</h2>

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
                  <p class="text-body-2 ma-0">Interaction to Next Paint<br>Отклик на действия</p>
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

            <h2 class="text-h5 font-weight-bold mb-3">Все метрики</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метрика</th>
                <th class="text-left font-weight-bold">Что измеряет</th>
                <th class="text-left font-weight-bold">Good</th>
                <th class="text-left font-weight-bold">Poor</th>
              </tr>
              </thead>
              <tbody>
              <tr class="bg-primary-lighten-5">
                <td><b>LCP</b></td>
                <td>Время загрузки самого большого элемента</td>
                <td class="text-success">&lt; 2.5s</td>
                <td class="text-error">&gt; 4.0s</td>
              </tr>
              <tr class="bg-success-lighten-5">
                <td><b>INP</b></td>
                <td>Время реакции на взаимодействие</td>
                <td class="text-success">&lt; 200ms</td>
                <td class="text-error">&gt; 500ms</td>
              </tr>
              <tr class="bg-warning-lighten-5">
                <td><b>CLS</b></td>
                <td>Сдвиг макета во время загрузки</td>
                <td class="text-success">&lt; 0.1</td>
                <td class="text-error">&gt; 0.25</td>
              </tr>
              <tr>
                <td><b>FCP</b></td>
                <td>Первый рендер контента</td>
                <td class="text-success">&lt; 1.8s</td>
                <td class="text-error">&gt; 3.0s</td>
              </tr>
              <tr>
                <td><b>TTFB</b></td>
                <td>Время до первого байта от сервера</td>
                <td class="text-success">&lt; 800ms</td>
                <td class="text-error">&gt; 1.8s</td>
              </tr>
              <tr>
                <td><b>TBT</b></td>
                <td>Время блокировки главного потока</td>
                <td class="text-success">&lt; 200ms</td>
                <td class="text-error">&gt; 600ms</td>
              </tr>
              </tbody>
            </v-table>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              С марта 2024 <b>FID заменен на INP</b>. INP точнее отражает отзывчивость на все взаимодействия.
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Как измерять</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMeasuring"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Способы оптимизации</h2>

            <v-expansion-panels variant="accordion" class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>LCP — Largest Contentful Paint (< 2.5s)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Оптимизация изображений</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Современные форматы:</strong> WebP (на 25-35% меньше JPG), AVIF (на 50% меньше JPG)
                      с fallback на JPG для старых браузеров через &lt;picture&gt; элемент.
                      AVIF даёт лучшее качество при меньшем размере, но поддержка хуже чем у WebP.
                    </li>
                    <li>
                      <strong>Responsive images:</strong> Используйте srcset с размерами 320w, 640w, 1024w, 1920w
                      для разных экранов. Браузер автоматически выберет оптимальный размер.
                      Добавьте sizes="(max-width: 768px) 100vw, 50vw" для указания желаемого размера отображения.
                    </li>
                    <li>
                      <strong>fetchpriority="high":</strong> Явно указывает браузеру загрузить hero-изображение
                      с максимальным приоритетом, до скриптов и стилей. Применяйте только к самому важному изображению
                      above-the-fold (обычно 1-2 изображения на страницу).
                    </li>
                    <li>
                      <strong>loading="eager":</strong> Отключает ленивую загрузку для критичного контента
                      в видимой области. По умолчанию браузер может откладывать загрузку, что увеличивает LCP.
                      Используйте для первых 2-3 изображений на странице.
                    </li>
                    <li>
                      <strong>Правильные размеры:</strong> Загружайте изображения в нужном разрешении, а не 4K
                      картинку с масштабированием в CSS. Изображение 1920x1080 для контейнера 960x540 —
                      это 4x больше данных чем нужно. Используйте автоматическую оптимизацию (Next.js Image,
                      Cloudinary, imgix).
                    </li>
                    <li>
                      <strong>Компрессия:</strong> ImageOptim, Squoosh, или Sharp для сжатия без потери визуального
                      качества. Для JPG используйте качество 80-85%, для WebP — 75-80%. Автоматизируйте через
                      build pipeline или CDN.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Preload критических ресурсов</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Preload hero-изображения:</strong>
                      &lt;link rel="preload" as="image" href="hero.webp" type="image/webp"&gt;
                      в &lt;head&gt; заставляет браузер начать загрузку до парсинга HTML.
                      Экономит 100-500ms на LCP. Не злоупотребляйте — максимум 2-3 ресурса.
                    </li>
                    <li>
                      <strong>Preload шрифтов:</strong>
                      &lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt;
                      предотвращает FOIT/FOUT (мерцание текста). Атрибут crossorigin обязателен даже для
                      same-origin шрифтов из-за CORS политики браузеров.
                    </li>
                    <li>
                      <strong>Preconnect к важным доменам:</strong>
                      &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt; устанавливает
                      TCP/TLS соединение заранее, экономя 100-300ms на DNS lookup, TCP handshake, TLS negotiation.
                      Используйте для CDN, API, шрифтов.
                    </li>
                    <li>
                      <strong>DNS-prefetch:</strong>
                      &lt;link rel="dns-prefetch" href="https://analytics.example.com"&gt;
                      только резолвит DNS без установки соединения. Менее агрессивен чем preconnect,
                      используйте для второстепенных доменов (аналитика, виджеты).
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Оптимизация сервера</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>CDN для статики:</strong> Cloudflare, AWS CloudFront, Fastly кэшируют контент
                      в edge locations близко к пользователям. Сокращают latency с 200-500ms до 10-50ms.
                      Настройте aggressive caching для immutable ресурсов (с hash в имени файла).
                      Используйте Brotli compression на CDN уровне.
                    </li>
                    <li>
                      <strong>HTTP/2 или HTTP/3:</strong> Multiplexing позволяет параллельно загружать множество
                      ресурсов по одному соединению вместо 6 параллельных в HTTP/1.1. HTTP/3 (QUIC) дополнительно
                      уменьшает latency за счёт 0-RTT handshake. Включается в настройках сервера (Nginx, Cloudflare).
                    </li>
                    <li>
                      <strong>Server-side caching:</strong> Redis или Memcached для кэширования результатов
                      DB запросов, API ответов, рендеринга страниц. Сокращает время генерации страницы
                      с 500ms до 5-10ms. Настройте TTL стратегии и cache invalidation при обновлениях.
                    </li>
                    <li>
                      <strong>Database query optimization:</strong> Добавьте индексы на часто запрашиваемые поля.
                      Используйте EXPLAIN для анализа медленных запросов. Избегайте N+1 проблемы через
                      eager loading или DataLoader паттерн. Денормализуйте данные где нужна скорость чтения.
                    </li>
                    <li>
                      <strong>Edge computing:</strong> Cloudflare Workers, Vercel Edge Functions, Deno Deploy
                      выполняют код максимально близко к пользователю. Идеально для API routes, A/B тестов,
                      персонализации, геолокационного контента. Латентность 10-50ms вместо 200-500ms к origin серверу.
                    </li>
                    <li>
                      <strong>Gzip/Brotli компрессия:</strong> Brotli на 15-20% эффективнее Gzip.
                      Для текстовых ресурсов (HTML, CSS, JS, JSON) сжатие даёт уменьшение в 3-5 раз.
                      Используйте уровень компрессии 4-6 (баланс между размером и CPU).
                      Настраивается в Nginx, Apache, CloudFront.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Удаление render-blocking ресурсов</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Critical CSS inline:</strong> Извлеките стили для контента above-the-fold
                      (первый экран) и встройте в &lt;style&gt; в &lt;head&gt;. Остальные стили загружайте
                      асинхронно через loadCSS. Инструменты: Critical, Critters (для Angular/React).
                      Размер inline CSS должен быть &lt;14KB (один TCP пакет).
                    </li>
                    <li>
                      <strong>Defer/async для скриптов:</strong> defer загружает параллельно и выполняет после
                      парсинга HTML в порядке объявления. async загружает параллельно и выполняет сразу
                      (порядок не гарантирован). Используйте defer для app скриптов, async для независимых
                      (аналитика, ads). Современные бандлеры (Vite, Next.js) добавляют это автоматически.
                    </li>
                    <li>
                      <strong>Отложенная загрузка CSS:</strong>
                      &lt;link rel="preload" as="style" href="non-critical.css" onload="this.rel='stylesheet'"&gt;
                      загружает CSS без блокировки рендера. Добавьте &lt;noscript&gt; fallback для браузеров без JS.
                      Полезно для шрифтов, иконок, стилей ниже fold.
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>INP — Interaction to Next Paint (< 200ms)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Разбивка тяжелых задач</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Long Tasks разбивка:</strong> Задачи >50ms блокируют главный поток и вызывают lag.
                      Разбивайте на chunks по 20-30ms через setTimeout(() => {...}, 0) или async/await с Promise.
                      Например, обработку 1000 элементов списка делайте батчами по 50 элементов с паузами.
                      Chrome DevTools Performance покажет Long Tasks красными полосами.
                    </li>
                    <li>
                      <strong>requestIdleCallback:</strong> Выполняет код когда браузер не занят (idle time
                      между фреймами). Идеально для аналитики, предзагрузки данных, некритичных обновлений UI.
                      Добавьте timeout для гарантии выполнения: requestIdleCallback(task, {timeout: 2000}).
                    </li>
                    <li>
                      <strong>Yield to main thread:</strong> После каждой тяжелой операции отдавайте контроль
                      браузеру для обработки user input. Паттерн:
                      await new Promise(resolve => setTimeout(resolve, 0)).
                      Это позволяет браузеру обработать клики/скроллы между вашими задачами.
                    </li>
                    <li>
                      <strong>Scheduler API:</strong> scheduler.yield() (новый API) или scheduler.postTask()
                      с приоритетами (user-blocking, user-visible, background). Более гибкий чем setTimeout.
                      scheduler.postTask(() => {...}, {priority: 'background'}) откладывает низкоприоритетные
                      задачи. Поддержка пока экспериментальная (Chrome 94+).
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Оптимизация JavaScript</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Code splitting:</strong> Разбивайте бандл на chunks по роутам или функциональности.
                      React.lazy(), Vue defineAsyncComponent(), динамические import().
                      Вместо бандла 2MB загружайте 200KB для текущего роута + 100KB vendor bundle.
                      Webpack/Vite делают это автоматически при правильной настройке.
                    </li>
                    <li>
                      <strong>Tree shaking:</strong> Удаляет неиспользуемый код при сборке. Работает с ES modules.
                      import { debounce } from 'lodash-es' включит только debounce, а не всю библиотеку.
                      Используйте sideEffects: false в package.json. Vite/Rollup делают агрессивный tree shaking.
                      Проверяйте через Bundle Analyzer что unused код действительно удалён.
                    </li>
                    <li>
                      <strong>Lazy loading компонентов:</strong> Загружайте компоненты только когда они нужны.
                      Модалки, табы, аккордеоны, тяжелые виджеты (графики, карты) — всё через lazy import.
                      React: const Modal = lazy(() => import('./Modal')).
                      Экономия: initial bundle 500KB вместо 1.2MB.
                    </li>
                    <li>
                      <strong>Web Workers:</strong> Переносите тяжелые вычисления (обработка больших данных,
                      сложная математика, парсинг) в отдельный поток. Worker не блокирует главный поток.
                      Используйте Comlink для упрощения взаимодействия. Примеры: обработка изображений,
                      data processing, криптография. Ограничения: нет доступа к DOM.
                    </li>
                    <li>
                      <strong>Минификация и компрессия:</strong> Terser для JS, cssnano для CSS удаляют пробелы,
                      комментарии, сокращают имена переменных. Экономия 20-30%. Далее Gzip/Brotli даёт ещё 3-5x.
                      Итого: 1MB исходника → 700KB после минификации → 150KB после Brotli.
                      Production builds делают это автоматически.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Event Handlers</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Debouncing:</strong> Откладывает выполнение функции пока events перестают приходить.
                      Для input, search, resize, scroll. Lodash _.debounce(fn, 300) выполнит функцию через 300ms
                      после последнего события. Без debounce onChange может вызываться 50+ раз в секунду,
                      с debounce — 3-4 раза. Критично для API запросов при поиске.
                    </li>
                    <li>
                      <strong>Throttling:</strong> Ограничивает выполнение функции до N раз в период.
                      Для scroll, mousemove, resize когда нужны периодические обновления.
                      _.throttle(fn, 100) выполнит максимум раз в 100ms независимо от количества событий.
                      Используйте для tracking позиции scroll, infinite scroll, drag&drop.
                    </li>
                    <li>
                      <strong>Passive event listeners:</strong> {passive: true} сообщает браузеру что вы не будете
                      вызывать preventDefault(). Браузер может начать scroll сразу, не дожидаясь выполнения обработчика.
                      Критично для touchstart, touchmove, wheel, scroll событий. Добавляет ~10-20% плавности скролла.
                      addEventListener('touchstart', handler, {passive: true}).
                    </li>
                    <li>
                      <strong>Делегирование событий:</strong> Вместо 1000 обработчиков на каждый элемент списка,
                      один обработчик на родителе с проверкой event.target. Экономит память и улучшает производительность
                      при добавлении/удалении элементов. Особенно важно для динамических списков, таблиц, tree views.
                      React делает это автоматически на уровне root.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Оптимизация рендеринга</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>React.memo / useMemo / useCallback:</strong> React.memo предотвращает re-render
                      компонента если props не изменились. useMemo кэширует результат вычислений.
                      useCallback кэширует функции для предотвращения re-render дочерних компонентов.
                      Не используйте везде — только для тяжелых компонентов и вычислений.
                      Профилируйте через React DevTools Profiler.
                    </li>
                    <li>
                      <strong>Virtual scrolling:</strong> Для списков 1000+ элементов рендерите только видимые
                      ~20-30 элементов + buffer. React: react-window, react-virtuoso. Vue: vue-virtual-scroller.
                      Вместо 10000 DOM элементов → 50 элементов. Scroll остаётся плавным. Критично для таблиц,
                      feeds, логов. Экономия памяти: 500MB → 10MB.
                    </li>
                    <li>
                      <strong>requestAnimationFrame:</strong> Синхронизирует обновления с refresh rate монитора
                      (обычно 60fps = каждые 16.67ms). Используйте для анимаций, визуальных обновлений,
                      smooth scroll. requestAnimationFrame(() => element.style.transform = ...).
                      Браузер оптимизирует и группирует изменения. Не используйте для логики — только для визуала.
                    </li>
                    <li>
                      <strong>Избегать forced reflow:</strong> Чтение layout свойств (offsetHeight, scrollTop)
                      после изменения DOM вызывает synchronous reflow (layout thrashing).
                      Паттерн: сначала все чтения, потом все записи. Batch обновления через DocumentFragment.
                      Используйте CSS transforms вместо left/top для анимаций — они не вызывают reflow.
                      FastDOM библиотека помогает группировать read/write операции.
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>CLS — Cumulative Layout Shift (< 0.1)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Резервирование места</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Явные width/height:</strong> Всегда указывайте размеры изображений в HTML атрибутах
                      или CSS. &lt;img width="800" height="600"&gt; позволяет браузеру зарезервировать место
                      до загрузки изображения. Без этого изображение "прыгает" при загрузке, сдвигая контент вниз.
                      Это основная причина высокого CLS на 90% сайтов.
                    </li>
                    <li>
                      <strong>aspect-ratio в CSS:</strong> Для responsive изображений используйте
                      aspect-ratio: 16 / 9; чтобы сохранить пропорции при любой ширине. Браузер автоматически
                      вычислит height. Работает с width: 100%. Альтернатива padding-bottom: 56.25% hack'у.
                      Поддержка: все современные браузеры (2021+).
                    </li>
                    <li>
                      <strong>min-height для динамического контента:</strong> Реклама, виджеты, embeds часто
                      загружаются async. Установите min-height: 250px для блока рекламы до её загрузки.
                      Когда реклама загрузится, она заполнит зарезервированное место без layout shift.
                      То же для YouTube embeds, Twitter карточек, комментариев.
                    </li>
                    <li>
                      <strong>Skeleton loaders:</strong> Показывайте placeholder'ы с серыми блоками вместо
                      пустого пространства. Визуально приятнее и резервирует место под контент.
                      Используйте реальные размеры будущего контента. React: react-content-loader.
                      CSS: background с linear-gradient + animation для shimmer эффекта.
                    </li>
                    <li>
                      <strong>Placeholder для iframe:</strong> iframe (YouTube, Google Maps) без размеров
                      вызывают большой layout shift. Всегда устанавливайте width/height или aspect-ratio.
                      Используйте facade pattern: показывайте preview изображение и загружайте iframe только
                      по клику. Экономия: 500KB iframe → 50KB превью + улучшение CLS.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Web Fonts</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>font-display: optional:</strong> Если шрифт не загрузился за 100ms, браузер использует
                      системный шрифт и не меняет его. Предотвращает FOUT (Flash of Unstyled Text) и layout shift.
                      Альтернатива: font-display: swap показывает системный шрифт сразу, но меняет его после загрузки
                      (может вызвать CLS). Для критичных шрифтов используйте optional, для брендинга — swap с size-adjust.
                    </li>
                    <li>
                      <strong>Preload критических шрифтов:</strong>
                      &lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt;
                      в &lt;head&gt; начинает загрузку до CSS. Сокращает время до отображения текста на 300-500ms.
                      Preload только 1-2 самых важных шрифта (обычно regular и bold), остальные загрузятся по мере надобности.
                    </li>
                    <li>
                      <strong>Fallback с похожими метриками:</strong> Используйте @font-face size-adjust,
                      ascent-override, descent-override чтобы системный fallback шрифт занимал такое же пространство
                      как веб-шрифт. Предотвращает layout shift при смене шрифтов.
                      Инструмент: Fallback Font Generator. Пример: Arial настроенный под Roboto.
                    </li>
                    <li>
                      <strong>WOFF2 формат:</strong> На 30% меньше чем WOFF, на 50% меньше чем TTF.
                      Поддержка: все современные браузеры (2016+). Используйте только WOFF2, старые форматы не нужны.
                      Google Fonts возвращает WOFF2 по умолчанию. Self-hosting: конвертируйте через FontSquirrel
                      или cloudconvert.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Анимации</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>transform/opacity:</strong> Эти свойства обрабатываются на GPU compositor layer,
                      не вызывают layout или paint. Используйте transform: translateX() вместо left,
                      transform: scale() вместо width/height. 60fps анимации гарантированы.
                      Любое изменение left/top/width/height вызывает reflow всей страницы — это медленно и вызывает jank.
                    </li>
                    <li>
                      <strong>will-change:</strong> Подсказывает браузеру что элемент будет анимироваться,
                      создаётся отдельный layer. will-change: transform создаст layer до начала анимации.
                      НЕ злоупотребляйте — каждый layer занимает память. Применяйте только к элементам которые
                      реально анимируются. Удаляйте after animation: element.style.willChange = 'auto'.
                    </li>
                    <li>
                      <strong>CSS animations:</strong> Предпочтительнее JavaScript для простых анимаций.
                      @keyframes обрабатываются на отдельном потоке, не блокируются Long Tasks.
                      Для сложных — Web Animations API или GSAP. Избегайте setInterval для анимаций —
                      используйте requestAnimationFrame или CSS.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Чего избегать</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Контент над существующим:</strong> Cookie banners, announcement bars, notification toasts
                      появляющиеся после загрузки сдвигают весь контент вниз. Решения: резервируйте место сразу,
                      используйте position: fixed/sticky, показывайте overlay вместо inline insertion,
                      загружайте до first paint через SSR.
                    </li>
                    <li>
                      <strong>Изображения без размеров:</strong> Главная причина CLS. Браузер не знает сколько места
                      зарезервировать, контент "прыгает" когда изображение загрузится. Всегда указывайте width/height
                      или aspect-ratio. Используйте автоматические инструменты (Next.js Image) которые добавляют размеры.
                    </li>
                    <li>
                      <strong>Динамический контент без резервирования:</strong> Загрузка комментариев, related posts,
                      рекомендаций после рендера страницы. Решение: показывайте skeleton с правильным размером,
                      загружайте контент на сервере (SSR), используйте min-height для контейнеров.
                    </li>
                    <li>
                      <strong>Поздняя загрузка шрифтов:</strong> Если шрифт грузится 2 секунды, текст сначала
                      отображается системным шрифтом (Arial), потом меняется на веб-шрифт (Roboto) с другими размерами —
                      layout shift. Решения: preload шрифтов, font-display: optional, fallback с size-adjust,
                      inline base64 для критичных шрифтов (только малые размеры).
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>FCP — First Contentful Paint (< 1.8s)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Critical CSS</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Inline критических стилей:</strong> Извлеките CSS для контента above-the-fold
                      (header, hero section, первый экран) и встройте в &lt;style&gt; тег в &lt;head&gt;.
                      Браузер отрендерит первый экран сразу, не дожидаясь загрузки всего CSS файла.
                      Размер inline CSS: 10-14KB (один TCP segment). Инструменты: Critical, Penthouse, Critters.
                    </li>
                    <li>
                      <strong>Отложенная загрузка остального CSS:</strong> После inline critical CSS, загружайте
                      полный CSS асинхронно через &lt;link rel="preload" as="style"&gt; с onload fallback.
                      Или через loadCSS library. Контент below-the-fold получит стили чуть позже, но FCP улучшится
                      на 0.5-1 секунду.
                    </li>
                    <li>
                      <strong>Удаление неиспользуемых стилей:</strong> PurgeCSS, UnCSS анализируют HTML и удаляют
                      CSS селекторы которые нигде не используются. Особенно эффективно для Bootstrap, Tailwind,
                      Material UI где используется 10-20% стилей. Результат: 500KB CSS → 50KB. Интеграция в Webpack,
                      Vite, PostCSS. ВАЖНО: whitelist динамических классов.
                    </li>
                    <li>
                      <strong>Минификация CSS:</strong> cssnano удаляет пробелы, комментарии, объединяет правила,
                      сокращает цвета (#ffffff → #fff), оптимизирует calc(). Экономия 15-25%.
                      + Gzip/Brotli даёт ещё 3-4x. Все modern bundlers делают это автоматически в production.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">JavaScript</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>defer для скриптов:</strong> &lt;script defer src="app.js"&gt; загружает скрипт
                      параллельно с HTML парсингом, но выполняет только после полного парсинга DOM.
                      Гарантирует порядок выполнения скриптов. Не блокирует FCP, так как парсер HTML
                      продолжает работу. Идеально для app bundle и библиотек с зависимостями.
                      Все современные фреймворки (React, Vue, Angular) работают с defer.
                    </li>
                    <li>
                      <strong>async для независимых скриптов:</strong> &lt;script async&gt; загружает
                      параллельно и выполняет сразу после загрузки, не дожидаясь парсинга. Порядок выполнения
                      не гарантирован. Используйте для независимых скриптов: Google Analytics, рекламные сети,
                      A/B тестирование, chat виджеты. НЕ используйте для критичных скриптов с зависимостями.
                    </li>
                    <li>
                      <strong>Минимизация render-blocking:</strong> Перенесите все некритичные скрипты
                      в конец &lt;body&gt; или используйте defer/async. Только critical inline JS должен быть
                      в &lt;head&gt;. Каждый blocking скрипт добавляет 50-200ms к FCP. Используйте
                      Coverage tool в Chrome DevTools чтобы найти неиспользуемый JS на первом экране.
                    </li>
                    <li>
                      <strong>Удаление неиспользуемого JavaScript:</strong> UnusedCSS, PurgeJS анализируют код
                      и удаляют dead code. Особенно эффективно после рефакторинга когда остались legacy модули.
                      Webpack/Vite производят tree shaking автоматически при правильной настройке sideEffects.
                      Проверяйте bundle через Bundle Analyzer — часто находятся неожиданные зависимости.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Оптимизация бандлов</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Code splitting по роутам:</strong> Загружайте код для каждого роута отдельно.
                      React Router + lazy(), Vue Router + component: () => import(). Пользователь на /home
                      не должен загружать код для /admin. Initial bundle уменьшается с 500KB до 100KB.
                      Каждый роут подгружается on-demand за 50-100ms. Настраивается автоматически в Next.js, Nuxt.
                    </li>
                    <li>
                      <strong>Vendor bundles отдельно:</strong> React, Vue, lodash редко меняются — выносите
                      в отдельный vendor.js с долгим кэшем (1 год). При обновлении app кода пользователь
                      не перекачивает vendor bundle. Webpack: optimization.splitChunks, Vite делает это автоматически.
                      Экономия трафика: при каждом deploy пользователь качает 50KB app вместо 500KB полного бандла.
                    </li>
                    <li>
                      <strong>Dynamic imports для тяжелых библиотек:</strong> Подгружайте тяжелые библиотеки
                      (chart.js 200KB, moment.js 300KB, PDF readers) только когда они нужны.
                      const Chart = await import('chart.js') при клике на график. Не нагружайте initial bundle
                      кодом который может никогда не понадобиться. Альтернатива: ищите легкие замены
                      (date-fns вместо moment, recharts вместо chart.js).
                    </li>
                    <li>
                      <strong>Module/nomodule pattern:</strong> Современные браузеры (95%+ пользователей)
                      поддерживают ES modules и не нуждаются в полифиллах. &lt;script type="module"&gt; для
                      современного кода без Babel трансформаций, &lt;script nomodule&gt; для legacy с полифиллами.
                      Modern bundle на 20-30% легче. Vite, Next.js поддерживают это из коробки.
                      Старые браузеры игнорируют type="module", новые игнорируют nomodule.
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>TTFB — Time to First Byte (< 800ms)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Оптимизация инфраструктуры</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>CDN близко к пользователям:</strong> Cloudflare, AWS CloudFront, Fastly кэшируют
                      контент в 200+ локациях по миру. Latency из Москвы до московского edge: 10-20ms, до origin
                      сервера в США: 150-250ms. Разница 10x в скорости. Настройте Cache-Control headers правильно:
                      immutable ресурсы (с hash) кэшируйте на год, HTML на 5 минут с stale-while-revalidate.
                      Проверяйте X-Cache header что контент отдаётся из edge, а не origin.
                    </li>
                    <li>
                      <strong>Edge computing для динамики:</strong> Cloudflare Workers, Vercel Edge Functions,
                      Deno Deploy выполняют код на edge серверах. Вместо запроса в США (200ms) + DB query (100ms) +
                      рендер (50ms) = 350ms получаете edge execution (20ms) + cached DB (10ms) = 30ms.
                      Используйте для: API endpoints, A/B тесты, персонализация, геолокация, JWT верификация.
                      Ограничения: холодный старт, лимиты CPU time, нет доступа к файловой системе.
                    </li>
                    <li>
                      <strong>HTTP/2 или HTTP/3:</strong> HTTP/2 multiplexing загружает 100+ ресурсов параллельно
                      по одному TCP соединению. HTTP/1.1 ограничен 6 параллельными соединениями. HTTP/3 (QUIC)
                      работает поверх UDP вместо TCP — устойчив к потере пакетов, 0-RTT connection для repeat visitors.
                      Настройка: Nginx add_header Alt-Svc 'h3=":443"', Cloudflare включает автоматически.
                      Проверка: Chrome DevTools Network → Protocol column.
                    </li>
                    <li>
                      <strong>Качественный хостинг:</strong> Shared hosting (5-10$ месяц) даёт TTFB 500-1500ms.
                      VPS/Dedicated (20-100$ месяц) даёт 100-300ms. Cloud providers (AWS, GCP, DO) с правильной
                      настройкой дают 50-150ms. Измеряйте TTFB из разных регионов через WebPageTest.
                      Факторы: CPU/RAM, network bandwidth, расстояние до users, DB latency.
                    </li>
                    <li>
                      <strong>Географически распределённые серверы:</strong> Если 30% пользователей из Европы,
                      30% из Азии, 40% из США — разместите серверы в каждом регионе. AWS Regions, GCP Zones,
                      DigitalOcean Datacenters. Route 53, Cloudflare Load Balancing автоматически направляют
                      пользователей к ближайшему серверу. Альтернатива: один origin + aggressive CDN caching.
                      Сложность: синхронизация данных между регионами.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Стратегии кэширования</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Server-side кэш (Redis/Memcached):</strong> Кэшируйте результаты тяжелых DB запросов,
                      API ответов, рендеринга страниц. DB query 200ms → Redis lookup 2ms. Пример: список продуктов
                      с фильтрами — генерируйте раз в минуту, остальные запросы из кэша. TTL стратегии:
                      статичные данные 1 час, пользовательский контент 5 минут, real-time данные без кэша.
                      Cache invalidation при обновлениях. Redis Cluster для high availability.
                    </li>
                    <li>
                      <strong>Static Site Generation (SSG):</strong> Рендерите страницы в HTML на build time.
                      Next.js getStaticProps, Nuxt generate, Gatsby. TTFB = время отдачи файла из CDN = 10-50ms.
                      Идеально для блогов, документации, маркетинговых страниц. Ограничение: нужен rebuild при
                      изменении контента. Решение: Incremental Static Regeneration (ISR) — обновление страниц
                      по расписанию без полного rebuild.
                    </li>
                    <li>
                      <strong>HTTP cache headers:</strong> Cache-Control: max-age=31536000, immutable для JS/CSS
                      с hash в имени файла. Браузер не делает запрос вообще. Cache-Control: max-age=300,
                      must-revalidate для HTML. ETag для проверки изменений — сервер вернёт 304 Not Modified
                      если контент не изменился. stale-while-revalidate=86400 отдаёт старый кэш моментально
                      и обновляет в фоне. CDN настройки важнее браузерных для публичного контента.
                    </li>
                    <li>
                      <strong>Service Worker кэширование:</strong> Программируемый proxy между браузером и сетью.
                      Cache-First стратегия: пытаемся отдать из кэша, при промахе — network. Network-First:
                      пытаемся из сети, при офлайне — из кэша. Stale-While-Revalidate: отдаём кэш моментально
                      и обновляем в фоне. Workbox library упрощает работу. Критично для PWA, offline functionality,
                      instant navigation. Размер кэша: 50-100MB безопасно.
                    </li>
                    <li>
                      <strong>Stale-while-revalidate паттерн:</strong> Комбинация быстрого ответа и актуальности.
                      Сервер отдаёт кэшированный контент моментально (stale) и одновременно обновляет кэш в фоне.
                      Следующий запрос получит свежие данные. Cache-Control: max-age=3600, stale-while-revalidate=86400.
                      Пользователь видит контент за 10ms вместо 200ms, но данные не старше часа.
                      Идеально для API, feed'ов, списков продуктов.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Оптимизация бэкенда</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Database индексы:</strong> Создавайте индексы на поля используемые в WHERE, JOIN,
                      ORDER BY. Query без индекса: full table scan 500ms для 100K записей. С индексом:
                      B-tree lookup 5ms. Но избыток индексов замедляет INSERT/UPDATE. CREATE INDEX idx_user_email
                      ON users(email). Composite индексы для частых комбинаций: (user_id, created_at).
                      Мониторьте slow query log. EXPLAIN ANALYZE покажет используются ли индексы.
                    </li>
                    <li>
                      <strong>Query optimization и N+1 проблема:</strong> N+1: загружаете 100 постов за 1 запрос,
                      потом для каждого поста автора — ещё 100 запросов = 101 query. Решение: JOIN или eager loading.
                      GraphQL DataLoader батчит запросы. Sequelize: include, Django: select_related, Rails: includes.
                      Избегайте SELECT * — выбирайте только нужные поля. Pagination для больших списков.
                      Агрегация на DB уровне вместо в коде.
                    </li>
                    <li>
                      <strong>Connection pooling:</strong> Создание нового DB connection: 50-200ms (TCP handshake,
                      auth, session init). Connection pool держит 10-50 открытых соединений, переиспользует их.
                      Latency запроса: 2-5ms вместо 50-200ms. PgBouncer для PostgreSQL, ProxySQL для MySQL.
                      Настройки: min 10 connections, max 50, idle timeout 5 минут. Мониторьте pool exhaustion —
                      симптом slow queries или нехватки connections.
                    </li>
                    <li>
                      <strong>Асинхронная обработка:</strong> Тяжёлые операции (отправка email, обработка изображений,
                      генерация отчётов, external API calls) делайте в background jobs. Пользователь получает
                      instant ответ (50ms), job обрабатывается отдельно. Redis Queue, Bull, Celery, Sidekiq.
                      Pattern: API создаёт task, возвращает task_id, клиент poll'ит статус или WebSocket notification.
                      Retry механизм для failed jobs. Dead letter queue для debugging.
                    </li>
                    <li>
                      <strong>Профилирование медленных эндпоинтов:</strong> APM tools (New Relic, Datadog, Sentry)
                      показывают где тратится время: DB queries 60%, external API 25%, CPU 10%, rendering 5%.
                      Flask-Profiler, Django Debug Toolbar, Express middleware для детального breakdown.
                      Оптимизируйте узкие места: кэшируйте, добавляйте индексы, переносите в background,
                      используйте faster algorithms. Мониторьте p95/p99 latency, не только average.
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="text-h6">
                  <strong>TBT — Total Blocking Time (< 200ms)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mt-2 mb-2">Оптимизация JavaScript бандлов</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Code splitting по функциональности:</strong> Разбивайте не только по роутам,
                      но и по фичам. Admin panel, dashboard widgets, map components — всё в отдельных chunks.
                      React.lazy() с Suspense, Vue defineAsyncComponent(). Webpack magic comments:
                      import(/* webpackChunkName: "admin" */ './Admin') для именованных chunks.
                      Приоритет загрузки: critical first, nice-to-have lazy. Preload для предсказуемых chunks.
                    </li>
                    <li>
                      <strong>Tree shaking максимизация:</strong> Работает только с ES modules.
                      CommonJS (require/module.exports) не позволяет tree shaking. Используйте
                      lodash-es вместо lodash, date-fns вместо moment. package.json: "sideEffects": false
                      разрешает агрессивное удаление. "sideEffects": ["*.css"] сохраняет только CSS импорты.
                      Избегайте import * as — импортирует весь модуль. Проверяйте через Bundle Analyzer
                      что unused exports действительно удалены.
                    </li>
                    <li>
                      <strong>Lazy loading компонентов стратегически:</strong> Модалки, табы, dropdown меню,
                      tooltips, charts, maps — всё это должно быть lazy. НО не lazy loading above-the-fold контента —
                      это ухудшит LCP. React: const Modal = lazy(() => import('./Modal')), Vue:
                      defineAsyncComponent(() => import('./Modal.vue')). Intersection Observer для lazy load
                      при scroll в viewport. Приоритет: загружайте visible content сразу, below-fold ленивозагружайте.
                    </li>
                    <li>
                      <strong>Import только необходимого:</strong> import {debounce} from 'lodash' импортирует
                      всю библиотеку (70KB). import debounce from 'lodash/debounce' — только функцию (2KB).
                      Babel плагины: babel-plugin-lodash, babel-plugin-import для автоматической оптимизации.
                      Webpack resolve.alias для замены тяжелых библиотек легкими (moment → dayjs экономит 250KB).
                      Проверяйте import statements в code review.
                    </li>
                    <li>
                      <strong>Удаление polyfills для современных браузеров:</strong> core-js, regenerator-runtime
                      добавляют 50-100KB для старых браузеров. Используйте browserslist: "> 0.5%, last 2 versions,
                      not dead" чтобы не поддерживать IE11. Babel preset-env с targets автоматически добавляет
                      только нужные polyfills. Differential serving: modern bundle без polyfills для 95% пользователей,
                      legacy с polyfills для старых браузеров. Экономия: 200KB modern bundle vs 350KB legacy.
                    </li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">Мониторинг и контроль бандлов</h4>
                  <ul class="pl-4 mb-3">
                    <li>
                      <strong>Bundle analyzers для визуализации:</strong> Webpack Bundle Analyzer показывает treemap
                      всех модулей в бандле с размерами. Находите неожиданные зависимости (случайно импортировали
                      всю библиотеку), дубликаты (одна либа в разных версиях), тяжелые модули (moment.js 300KB).
                      Vite: rollup-plugin-visualizer. npm run build -- --analyze. Регулярно проверяйте после
                      добавления новых зависимостей. Цель: каждый chunk < 200KB gzipped.
                    </li>
                    <li>
                      <strong>Lighthouse CI в CI/CD pipeline:</strong> Автоматический запуск Lighthouse на каждый PR.
                      Блокируйте merge если метрики регрессировали. GitHub Actions:
                      @treosh/lighthouse-ci-action, GitLab CI с Docker. Конфиг: минимальные пороги
                      (LCP < 2.5s, TBT < 300ms, CLS < 0.1). Временные графики показывают тренды.
                      Комментарий в PR с результатами и comparison с main branch.
                    </li>
                    <li>
                      <strong>Performance budgets:</strong> Жёсткие лимиты на размеры: total JS < 500KB,
                      total CSS < 100KB, images < 2MB, fonts < 200KB. webpack-bundle-size-analyzer,
                      size-limit с pre-commit hook. Нарушение бюджета = failed build. Prevent bloat до того
                      как он попадёт в production. Настройка в webpack.config.js performance.maxAssetSize.
                      Мониторинг через Bundlephobia перед установкой новых пакетов.
                    </li>
                    <li>
                      <strong>Coverage tool в Chrome DevTools:</strong> Показывает какой процент загруженного JS/CSS
                      реально используется на странице. Часто 60-70% кода не выполняется на first load.
                      Coverage → Record → Reload page → Stop. Красным выделен unused код. Находите кандидатов для
                      code splitting и lazy loading. Особенно полезно для legacy кодбейз с накопленным техдолгом.
                      Цель: >80% utilization rate.
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="primary" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">📊 Анализ (Lab Data)</h3>
                  <ul class="pl-4">
                    <li>Lighthouse (Chrome DevTools / CLI)</li>
                    <li>PageSpeed Insights</li>
                    <li>WebPageTest</li>
                    <li>Chrome DevTools Performance</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">👥 Real User Monitoring</h3>
                  <ul class="pl-4">
                    <li>Chrome UX Report (CrUX)</li>
                    <li>web-vitals библиотека</li>
                    <li>Google Analytics 4</li>
                    <li>Sentry Performance</li>
                    <li>New Relic, Datadog</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">📦 Bundle Analysis</h3>
                  <ul class="pl-4">
                    <li>Webpack Bundle Analyzer</li>
                    <li>Vite Bundle Visualizer</li>
                    <li>source-map-explorer</li>
                    <li>size-limit</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">🔄 CI/CD Integration</h3>
                  <ul class="pl-4">
                    <li>Lighthouse CI</li>
                    <li>Performance budgets</li>
                    <li>Chromatic для визуальной регрессии</li>
                    <li>Bundle size checks</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практический чеклист</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">🚀 Быстрые wins</h3>
                  <ul class="pl-4">
                    <li>Сжатие изображений (WebP/AVIF)</li>
                    <li>Defer/async для скриптов</li>
                    <li>Width/height для изображений</li>
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
                    <li>Lazy loading</li>
                    <li>Critical CSS inline</li>
                    <li>Preload ключевых ресурсов</li>
                    <li>Resource hints</li>
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

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы</h2>

            <v-expansion-panels variant="accordion" class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Что такое Core Web Vitals и почему они важны?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Core Web Vitals — три ключевые метрики UX: LCP (скорость загрузки), INP (интерактивность),
                  CLS (стабильность). Важны потому что: влияют на SEO ранжирование Google, напрямую коррелируют
                  с конверсией, являются измеримыми показателями пользовательского опыта.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>В чем разница между FID и INP?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  FID (First Input Delay) измерял только первое взаимодействие. INP (Interaction to Next Paint)
                  измеряет все взаимодействия и берет наихудший показатель. INP лучше отражает реальную отзывчивость.
                  С марта 2024 INP заменил FID.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Как оптимизировать LCP для страницы с большим hero-изображением?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Современные форматы (WebP, AVIF), адаптивные изображения (srcset), preload изображения,
                  fetchpriority="high", loading="eager", CDN для доставки, правильные размеры без масштабирования в CSS.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Почему CLS 0.15 — плохой показатель?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  CLS > 0.1 попадает в "Needs Improvement". Означает заметные сдвиги контента, которые раздражают
                  пользователей. Причины: изображения без размеров, динамический контент без резервирования места,
                  проблемы с шрифтами, реклама без min-height.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Что такое Long Tasks и как они влияют на INP?</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Long Tasks — задачи JavaScript >50ms, блокирующие главный поток. Напрямую влияют на INP,
                  так как браузер не может обработать взаимодействия. Решения: разбивка на мелкие задачи,
                  Web Workers, requestIdleCallback, code splitting.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Связь метрик с бизнес-целями</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-chart-line</v-icon>
              <strong>Важно:</strong> Улучшение Web Vitals напрямую влияет на бизнес-метрики.
              Исследования показывают, что улучшение LCP на 100ms увеличивает конверсию на 0.5-1%.
            </v-alert>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метрика</th>
                <th class="text-left font-weight-bold">Влияние на бизнес</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>LCP</b></td>
                <td>
                  Каждые 100ms задержки снижают конверсию на ~0.7%. Пользователи покидают медленные сайты.
                  Особенно критично для e-commerce.
                </td>
              </tr>
              <tr>
                <td><b>INP</b></td>
                <td>
                  Медленный отклик разочаровывает пользователей. Падает engagement и повторные визиты.
                  Критично для интерактивных приложений.
                </td>
              </tr>
              <tr>
                <td><b>CLS</b></td>
                <td>
                  Непредвиденные сдвиги раздражают пользователей, могут привести к случайным кликам по рекламе.
                  Снижает trust и credibility.
                </td>
              </tr>
              <tr>
                <td><b>SEO</b></td>
                <td>
                  Core Web Vitals — официальный ranking фактор Google с 2021 года. Плохие показатели снижают
                  позиции в поиске.
                </td>
              </tr>
              </tbody>
            </v-table>

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

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  overflow-x: auto;
}

.custom-code code {
  color: #ccc;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
