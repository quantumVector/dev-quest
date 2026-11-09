import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-web-vitals-measuringsnippet.txt?raw'

// Content copied verbatim from src/views/optimization/WebVitalsOptimization.vue.
export default {
  ...articleSummaries.optimizationWebVitalsOptimization,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Vitals** — набор метрик от Google для измерения реального пользовательского опыта. Влияют на SEO и критически важны для конверсии. **Core Web Vitals** — три основные метрики: **LCP**, **INP**, **CLS**.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Core Web Vitals',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'LCP',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: '**&lt; 2.5s**',
                },
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown: 'Largest Contentful Paint  \nЗагрузка основного контента',
                },
              ],
            },
            {
              id: 'card-7',
              blocks: [
                {
                  id: 'heading-8',
                  type: 'heading',
                  level: 3,
                  text: 'INP',
                },
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown: '**&lt; 200ms**',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown: 'Interaction to Next Paint  \nОтклик на действия',
                },
              ],
            },
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: 'CLS',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown: '**&lt; 0.1**',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown: 'Cumulative Layout Shift  \nВизуальная стабильность',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Все метрики',
      blocks: [
        {
          id: 'table-15',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метрика',
            },
            {
              id: 'column-2',
              label: 'Что измеряет',
            },
            {
              id: 'column-3',
              label: 'Good',
            },
            {
              id: 'column-4',
              label: 'Poor',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**LCP**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Время загрузки самого большого элемента',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '&lt; 2.5s',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '&gt; 4.0s',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '**INP**',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Время реакции на взаимодействие',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '&lt; 200ms',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '&gt; 500ms',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**CLS**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Сдвиг макета во время загрузки',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '&lt; 0.1',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '&gt; 0.25',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**FCP**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Первый рендер контента',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '&lt; 1.8s',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '&gt; 3.0s',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**TTFB**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Время до первого байта от сервера',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '&lt; 800ms',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '&gt; 1.8s',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**TBT**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Время блокировки главного потока',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '&lt; 200ms',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '&gt; 600ms',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'callout-40',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-41',
              type: 'prose',
              markdown:
                'С марта 2024 **FID заменен на INP**. INP точнее отражает отзывчивость на все взаимодействия.',
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Как измерять',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Способы оптимизации',
      blocks: [
        {
          id: 'accordion-43',
          type: 'accordion',
          items: [
            {
              id: 'question-44',
              title: '**LCP — Largest Contentful Paint (&lt; 2.5s)**',
              blocks: [
                {
                  id: 'heading-45',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация изображений',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- **Современные форматы:** WebP (на 25\\-35% меньше JPG), AVIF (на 50% меньше JPG) с fallback на JPG для старых браузеров через &lt;picture&gt; элемент. AVIF даёт лучшее качество при меньшем размере, но поддержка хуже чем у WebP.\n- **Responsive images:** Используйте srcset с размерами 320w, 640w, 1024w, 1920w для разных экранов. Браузер автоматически выберет оптимальный размер. Добавьте sizes="(max\\-width: 768px) 100vw, 50vw" для указания желаемого размера отображения.\n- **fetchpriority="high":** Явно указывает браузеру загрузить hero\\-изображение с максимальным приоритетом, до скриптов и стилей. Применяйте только к самому важному изображению above\\-the\\-fold (обычно 1\\-2 изображения на страницу).\n- **loading="eager":** Отключает ленивую загрузку для критичного контента в видимой области. По умолчанию браузер может откладывать загрузку, что увеличивает LCP. Используйте для первых 2\\-3 изображений на странице.\n- **Правильные размеры:** Загружайте изображения в нужном разрешении, а не 4K картинку с масштабированием в CSS. Изображение 1920x1080 для контейнера 960x540 — это 4x больше данных чем нужно. Используйте автоматическую оптимизацию (Next.js Image, Cloudinary, imgix).\n- **Компрессия:** ImageOptim, Squoosh, или Sharp для сжатия без потери визуального качества. Для JPG используйте качество 80\\-85%, для WebP — 75\\-80%. Автоматизируйте через build pipeline или CDN.',
                },
                {
                  id: 'heading-47',
                  type: 'heading',
                  level: 4,
                  text: 'Preload критических ресурсов',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- **Preload hero\\-изображения:** &lt;link rel="preload" as="image" href="hero.webp" type="image/webp"&gt; в &lt;head&gt; заставляет браузер начать загрузку до парсинга HTML. Экономит 100\\-500ms на LCP. Не злоупотребляйте — максимум 2\\-3 ресурса.\n- **Preload шрифтов:** &lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt; предотвращает FOIT/FOUT (мерцание текста). Атрибут crossorigin обязателен даже для same\\-origin шрифтов из\\-за CORS политики браузеров.\n- **Preconnect к важным доменам:** &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt; устанавливает TCP/TLS соединение заранее, экономя 100\\-300ms на DNS lookup, TCP handshake, TLS negotiation. Используйте для CDN, API, шрифтов.\n- **DNS\\-prefetch:** &lt;link rel="dns\\-prefetch" href="https://analytics.example.com"&gt; только резолвит DNS без установки соединения. Менее агрессивен чем preconnect, используйте для второстепенных доменов (аналитика, виджеты).',
                },
                {
                  id: 'heading-49',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация сервера',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- **CDN для статики:** Cloudflare, AWS CloudFront, Fastly кэшируют контент в edge locations близко к пользователям. Сокращают latency с 200\\-500ms до 10\\-50ms. Настройте aggressive caching для immutable ресурсов (с hash в имени файла). Используйте Brotli compression на CDN уровне.\n- **HTTP/2 или HTTP/3:** Multiplexing позволяет параллельно загружать множество ресурсов по одному соединению вместо 6 параллельных в HTTP/1.1. HTTP/3 (QUIC) дополнительно уменьшает latency за счёт 0\\-RTT handshake. Включается в настройках сервера (Nginx, Cloudflare).\n- **Server\\-side caching:** Redis или Memcached для кэширования результатов DB запросов, API ответов, рендеринга страниц. Сокращает время генерации страницы с 500ms до 5\\-10ms. Настройте TTL стратегии и cache invalidation при обновлениях.\n- **Database query optimization:** Добавьте индексы на часто запрашиваемые поля. Используйте EXPLAIN для анализа медленных запросов. Избегайте N\\+1 проблемы через eager loading или DataLoader паттерн. Денормализуйте данные где нужна скорость чтения.\n- **Edge computing:** Cloudflare Workers, Vercel Edge Functions, Deno Deploy выполняют код максимально близко к пользователю. Идеально для API routes, A/B тестов, персонализации, геолокационного контента. Латентность 10\\-50ms вместо 200\\-500ms к origin серверу.\n- **Gzip/Brotli компрессия:** Brotli на 15\\-20% эффективнее Gzip. Для текстовых ресурсов (HTML, CSS, JS, JSON) сжатие даёт уменьшение в 3\\-5 раз. Используйте уровень компрессии 4\\-6 (баланс между размером и CPU). Настраивается в Nginx, Apache, CloudFront.',
                },
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 4,
                  text: 'Удаление render-blocking ресурсов',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- **Critical CSS inline:** Извлеките стили для контента above\\-the\\-fold (первый экран) и встройте в &lt;style&gt; в &lt;head&gt;. Остальные стили загружайте асинхронно через loadCSS. Инструменты: Critical, Critters (для Angular/React). Размер inline CSS должен быть &lt;14KB (один TCP пакет).\n- **Defer/async для скриптов:** defer загружает параллельно и выполняет после парсинга HTML в порядке объявления. async загружает параллельно и выполняет сразу (порядок не гарантирован). Используйте defer для app скриптов, async для независимых (аналитика, ads). Современные бандлеры (Vite, Next.js) добавляют это автоматически.\n- **Отложенная загрузка CSS:** &lt;link rel="preload" as="style" href="non\\-critical.css" onload="this.rel=\'stylesheet\'"&gt; загружает CSS без блокировки рендера. Добавьте &lt;noscript&gt; fallback для браузеров без JS. Полезно для шрифтов, иконок, стилей ниже fold.',
                },
              ],
            },
            {
              id: 'question-53',
              title: '**INP — Interaction to Next Paint (&lt; 200ms)**',
              blocks: [
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 4,
                  text: 'Разбивка тяжелых задач',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    "- **Long Tasks разбивка:** Задачи &gt;50ms блокируют главный поток и вызывают lag. Разбивайте на chunks по 20\\-30ms через setTimeout(() =&gt; {...}, 0) или async/await с Promise. Например, обработку 1000 элементов списка делайте батчами по 50 элементов с паузами. Chrome DevTools Performance покажет Long Tasks красными полосами.\n- **requestIdleCallback:** Выполняет код когда браузер не занят (idle time между фреймами). Идеально для аналитики, предзагрузки данных, некритичных обновлений UI. Добавьте timeout для гарантии выполнения: requestIdleCallback(task, {timeout: 2000}).\n- **Yield to main thread:** После каждой тяжелой операции отдавайте контроль браузеру для обработки user input. Паттерн: await new Promise(resolve =&gt; setTimeout(resolve, 0)). Это позволяет браузеру обработать клики/скроллы между вашими задачами.\n- **Scheduler API:** scheduler.yield() (новый API) или scheduler.postTask() с приоритетами (user\\-blocking, user\\-visible, background). Более гибкий чем setTimeout. scheduler.postTask(() =&gt; {...}, {priority: 'background'}) откладывает низкоприоритетные задачи. Поддержка пока экспериментальная (Chrome 94\\+).",
                },
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация JavaScript',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    "- **Code splitting:** Разбивайте бандл на chunks по роутам или функциональности. React.lazy(), Vue defineAsyncComponent(), динамические import(). Вместо бандла 2MB загружайте 200KB для текущего роута \\+ 100KB vendor bundle. Webpack/Vite делают это автоматически при правильной настройке.\n- **Tree shaking:** Удаляет неиспользуемый код при сборке. Работает с ES modules. import { debounce } from 'lodash\\-es' включит только debounce, а не всю библиотеку. Используйте sideEffects: false в package.json. Vite/Rollup делают агрессивный tree shaking. Проверяйте через Bundle Analyzer что unused код действительно удалён.\n- **Lazy loading компонентов:** Загружайте компоненты только когда они нужны. Модалки, табы, аккордеоны, тяжелые виджеты (графики, карты) — всё через lazy import. React: const Modal = lazy(() =&gt; import('./Modal')). Экономия: initial bundle 500KB вместо 1.2MB.\n- **Web Workers:** Переносите тяжелые вычисления (обработка больших данных, сложная математика, парсинг) в отдельный поток. Worker не блокирует главный поток. Используйте Comlink для упрощения взаимодействия. Примеры: обработка изображений, data processing, криптография. Ограничения: нет доступа к DOM.\n- **Минификация и компрессия:** Terser для JS, cssnano для CSS удаляют пробелы, комментарии, сокращают имена переменных. Экономия 20\\-30%. Далее Gzip/Brotli даёт ещё 3\\-5x. Итого: 1MB исходника → 700KB после минификации → 150KB после Brotli. Production builds делают это автоматически.",
                },
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 4,
                  text: 'Event Handlers',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    "- **Debouncing:** Откладывает выполнение функции пока events перестают приходить. Для input, search, resize, scroll. Lodash \\_.debounce(fn, 300) выполнит функцию через 300ms после последнего события. Без debounce onChange может вызываться 50\\+ раз в секунду, с debounce — 3\\-4 раза. Критично для API запросов при поиске.\n- **Throttling:** Ограничивает выполнение функции до N раз в период. Для scroll, mousemove, resize когда нужны периодические обновления. \\_.throttle(fn, 100) выполнит максимум раз в 100ms независимо от количества событий. Используйте для tracking позиции scroll, infinite scroll, drag&amp;drop.\n- **Passive event listeners:** {passive: true} сообщает браузеру что вы не будете вызывать preventDefault(). Браузер может начать scroll сразу, не дожидаясь выполнения обработчика. Критично для touchstart, touchmove, wheel, scroll событий. Добавляет ~10\\-20% плавности скролла. addEventListener('touchstart', handler, {passive: true}).\n- **Делегирование событий:** Вместо 1000 обработчиков на каждый элемент списка, один обработчик на родителе с проверкой event.target. Экономит память и улучшает производительность при добавлении/удалении элементов. Особенно важно для динамических списков, таблиц, tree views. React делает это автоматически на уровне root.",
                },
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация рендеринга',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- **React.memo / useMemo / useCallback:** React.memo предотвращает re\\-render компонента если props не изменились. useMemo кэширует результат вычислений. useCallback кэширует функции для предотвращения re\\-render дочерних компонентов. Не используйте везде — только для тяжелых компонентов и вычислений. Профилируйте через React DevTools Profiler.\n- **Virtual scrolling:** Для списков 1000\\+ элементов рендерите только видимые ~20\\-30 элементов \\+ buffer. React: react\\-window, react\\-virtuoso. Vue: vue\\-virtual\\-scroller. Вместо 10000 DOM элементов → 50 элементов. Scroll остаётся плавным. Критично для таблиц, feeds, логов. Экономия памяти: 500MB → 10MB.\n- **requestAnimationFrame:** Синхронизирует обновления с refresh rate монитора (обычно 60fps = каждые 16.67ms). Используйте для анимаций, визуальных обновлений, smooth scroll. requestAnimationFrame(() =&gt; element.style.transform = ...). Браузер оптимизирует и группирует изменения. Не используйте для логики — только для визуала.\n- **Избегать forced reflow:** Чтение layout свойств (offsetHeight, scrollTop) после изменения DOM вызывает synchronous reflow (layout thrashing). Паттерн: сначала все чтения, потом все записи. Batch обновления через DocumentFragment. Используйте CSS transforms вместо left/top для анимаций — они не вызывают reflow. FastDOM библиотека помогает группировать read/write операции.',
                },
              ],
            },
            {
              id: 'question-62',
              title: '**CLS — Cumulative Layout Shift (&lt; 0.1)**',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 4,
                  text: 'Резервирование места',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- **Явные width/height:** Всегда указывайте размеры изображений в HTML атрибутах или CSS. &lt;img width="800" height="600"&gt; позволяет браузеру зарезервировать место до загрузки изображения. Без этого изображение "прыгает" при загрузке, сдвигая контент вниз. Это основная причина высокого CLS на 90% сайтов.\n- **aspect\\-ratio в CSS:** Для responsive изображений используйте aspect\\-ratio: 16 / 9; чтобы сохранить пропорции при любой ширине. Браузер автоматически вычислит height. Работает с width: 100%. Альтернатива padding\\-bottom: 56.25% hack\'у. Поддержка: все современные браузеры (2021\\+).\n- **min\\-height для динамического контента:** Реклама, виджеты, embeds часто загружаются async. Установите min\\-height: 250px для блока рекламы до её загрузки. Когда реклама загрузится, она заполнит зарезервированное место без layout shift. То же для YouTube embeds, Twitter карточек, комментариев.\n- **Skeleton loaders:** Показывайте placeholder\'ы с серыми блоками вместо пустого пространства. Визуально приятнее и резервирует место под контент. Используйте реальные размеры будущего контента. React: react\\-content\\-loader. CSS: background с linear\\-gradient \\+ animation для shimmer эффекта.\n- **Placeholder для iframe:** iframe (YouTube, Google Maps) без размеров вызывают большой layout shift. Всегда устанавливайте width/height или aspect\\-ratio. Используйте facade pattern: показывайте preview изображение и загружайте iframe только по клику. Экономия: 500KB iframe → 50KB превью \\+ улучшение CLS.',
                },
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 4,
                  text: 'Web Fonts',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- **font\\-display: optional:** Если шрифт не загрузился за 100ms, браузер использует системный шрифт и не меняет его. Предотвращает FOUT (Flash of Unstyled Text) и layout shift. Альтернатива: font\\-display: swap показывает системный шрифт сразу, но меняет его после загрузки (может вызвать CLS). Для критичных шрифтов используйте optional, для брендинга — swap с size\\-adjust.\n- **Preload критических шрифтов:** &lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt; в &lt;head&gt; начинает загрузку до CSS. Сокращает время до отображения текста на 300\\-500ms. Preload только 1\\-2 самых важных шрифта (обычно regular и bold), остальные загрузятся по мере надобности.\n- **Fallback с похожими метриками:** Используйте @font\\-face size\\-adjust, ascent\\-override, descent\\-override чтобы системный fallback шрифт занимал такое же пространство как веб\\-шрифт. Предотвращает layout shift при смене шрифтов. Инструмент: Fallback Font Generator. Пример: Arial настроенный под Roboto.\n- **WOFF2 формат:** На 30% меньше чем WOFF, на 50% меньше чем TTF. Поддержка: все современные браузеры (2016\\+). Используйте только WOFF2, старые форматы не нужны. Google Fonts возвращает WOFF2 по умолчанию. Self\\-hosting: конвертируйте через FontSquirrel или cloudconvert.',
                },
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 4,
                  text: 'Анимации',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    "- **transform/opacity:** Эти свойства обрабатываются на GPU compositor layer, не вызывают layout или paint. Используйте transform: translateX() вместо left, transform: scale() вместо width/height. 60fps анимации гарантированы. Любое изменение left/top/width/height вызывает reflow всей страницы — это медленно и вызывает jank.\n- **will\\-change:** Подсказывает браузеру что элемент будет анимироваться, создаётся отдельный layer. will\\-change: transform создаст layer до начала анимации. НЕ злоупотребляйте — каждый layer занимает память. Применяйте только к элементам которые реально анимируются. Удаляйте after animation: element.style.willChange = 'auto'.\n- **CSS animations:** Предпочтительнее JavaScript для простых анимаций. @keyframes обрабатываются на отдельном потоке, не блокируются Long Tasks. Для сложных — Web Animations API или GSAP. Избегайте setInterval для анимаций — используйте requestAnimationFrame или CSS.",
                },
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 4,
                  text: 'Чего избегать',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- **Контент над существующим:** Cookie banners, announcement bars, notification toasts появляющиеся после загрузки сдвигают весь контент вниз. Решения: резервируйте место сразу, используйте position: fixed/sticky, показывайте overlay вместо inline insertion, загружайте до first paint через SSR.\n- **Изображения без размеров:** Главная причина CLS. Браузер не знает сколько места зарезервировать, контент "прыгает" когда изображение загрузится. Всегда указывайте width/height или aspect\\-ratio. Используйте автоматические инструменты (Next.js Image) которые добавляют размеры.\n- **Динамический контент без резервирования:** Загрузка комментариев, related posts, рекомендаций после рендера страницы. Решение: показывайте skeleton с правильным размером, загружайте контент на сервере (SSR), используйте min\\-height для контейнеров.\n- **Поздняя загрузка шрифтов:** Если шрифт грузится 2 секунды, текст сначала отображается системным шрифтом (Arial), потом меняется на веб\\-шрифт (Roboto) с другими размерами — layout shift. Решения: preload шрифтов, font\\-display: optional, fallback с size\\-adjust, inline base64 для критичных шрифтов (только малые размеры).',
                },
              ],
            },
            {
              id: 'question-71',
              title: '**FCP — First Contentful Paint (&lt; 1.8s)**',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 4,
                  text: 'Critical CSS',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- **Inline критических стилей:** Извлеките CSS для контента above\\-the\\-fold (header, hero section, первый экран) и встройте в &lt;style&gt; тег в &lt;head&gt;. Браузер отрендерит первый экран сразу, не дожидаясь загрузки всего CSS файла. Размер inline CSS: 10\\-14KB (один TCP segment). Инструменты: Critical, Penthouse, Critters.\n- **Отложенная загрузка остального CSS:** После inline critical CSS, загружайте полный CSS асинхронно через &lt;link rel="preload" as="style"&gt; с onload fallback. Или через loadCSS library. Контент below\\-the\\-fold получит стили чуть позже, но FCP улучшится на 0.5\\-1 секунду.\n- **Удаление неиспользуемых стилей:** PurgeCSS, UnCSS анализируют HTML и удаляют CSS селекторы которые нигде не используются. Особенно эффективно для Bootstrap, Tailwind, Material UI где используется 10\\-20% стилей. Результат: 500KB CSS → 50KB. Интеграция в Webpack, Vite, PostCSS. ВАЖНО: whitelist динамических классов.\n- **Минификация CSS:** cssnano удаляет пробелы, комментарии, объединяет правила, сокращает цвета (#ffffff → #fff), оптимизирует calc(). Экономия 15\\-25%. \\+ Gzip/Brotli даёт ещё 3\\-4x. Все modern bundlers делают это автоматически в production.',
                },
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 4,
                  text: 'JavaScript',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- **defer для скриптов:** &lt;script defer src="app.js"&gt; загружает скрипт параллельно с HTML парсингом, но выполняет только после полного парсинга DOM. Гарантирует порядок выполнения скриптов. Не блокирует FCP, так как парсер HTML продолжает работу. Идеально для app bundle и библиотек с зависимостями. Все современные фреймворки (React, Vue, Angular) работают с defer.\n- **async для независимых скриптов:** &lt;script async&gt; загружает параллельно и выполняет сразу после загрузки, не дожидаясь парсинга. Порядок выполнения не гарантирован. Используйте для независимых скриптов: Google Analytics, рекламные сети, A/B тестирование, chat виджеты. НЕ используйте для критичных скриптов с зависимостями.\n- **Минимизация render\\-blocking:** Перенесите все некритичные скрипты в конец &lt;body&gt; или используйте defer/async. Только critical inline JS должен быть в &lt;head&gt;. Каждый blocking скрипт добавляет 50\\-200ms к FCP. Используйте Coverage tool в Chrome DevTools чтобы найти неиспользуемый JS на первом экране.\n- **Удаление неиспользуемого JavaScript:** UnusedCSS, PurgeJS анализируют код и удаляют dead code. Особенно эффективно после рефакторинга когда остались legacy модули. Webpack/Vite производят tree shaking автоматически при правильной настройке sideEffects. Проверяйте bundle через Bundle Analyzer — часто находятся неожиданные зависимости.',
                },
                {
                  id: 'heading-76',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация бандлов',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- **Code splitting по роутам:** Загружайте код для каждого роута отдельно. React Router \\+ lazy(), Vue Router \\+ component: () =&gt; import(). Пользователь на /home не должен загружать код для /admin. Initial bundle уменьшается с 500KB до 100KB. Каждый роут подгружается on\\-demand за 50\\-100ms. Настраивается автоматически в Next.js, Nuxt.\n- **Vendor bundles отдельно:** React, Vue, lodash редко меняются — выносите в отдельный vendor.js с долгим кэшем (1 год). При обновлении app кода пользователь не перекачивает vendor bundle. Webpack: optimization.splitChunks, Vite делает это автоматически. Экономия трафика: при каждом deploy пользователь качает 50KB app вместо 500KB полного бандла.\n- **Dynamic imports для тяжелых библиотек:** Подгружайте тяжелые библиотеки (chart.js 200KB, moment.js 300KB, PDF readers) только когда они нужны. const Chart = await import(\'chart.js\') при клике на график. Не нагружайте initial bundle кодом который может никогда не понадобиться. Альтернатива: ищите легкие замены (date\\-fns вместо moment, recharts вместо chart.js).\n- **Module/nomodule pattern:** Современные браузеры (95%\\+ пользователей) поддерживают ES modules и не нуждаются в полифиллах. &lt;script type="module"&gt; для современного кода без Babel трансформаций, &lt;script nomodule&gt; для legacy с полифиллами. Modern bundle на 20\\-30% легче. Vite, Next.js поддерживают это из коробки. Старые браузеры игнорируют type="module", новые игнорируют nomodule.',
                },
              ],
            },
            {
              id: 'question-78',
              title: '**TTFB — Time to First Byte (&lt; 800ms)**',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация инфраструктуры',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- **CDN близко к пользователям:** Cloudflare, AWS CloudFront, Fastly кэшируют контент в 200\\+ локациях по миру. Latency из Москвы до московского edge: 10\\-20ms, до origin сервера в США: 150\\-250ms. Разница 10x в скорости. Настройте Cache\\-Control headers правильно: immutable ресурсы (с hash) кэшируйте на год, HTML на 5 минут с stale\\-while\\-revalidate. Проверяйте X\\-Cache header что контент отдаётся из edge, а не origin.\n- **Edge computing для динамики:** Cloudflare Workers, Vercel Edge Functions, Deno Deploy выполняют код на edge серверах. Вместо запроса в США (200ms) \\+ DB query (100ms) \\+ рендер (50ms) = 350ms получаете edge execution (20ms) \\+ cached DB (10ms) = 30ms. Используйте для: API endpoints, A/B тесты, персонализация, геолокация, JWT верификация. Ограничения: холодный старт, лимиты CPU time, нет доступа к файловой системе.\n- **HTTP/2 или HTTP/3:** HTTP/2 multiplexing загружает 100\\+ ресурсов параллельно по одному TCP соединению. HTTP/1.1 ограничен 6 параллельными соединениями. HTTP/3 (QUIC) работает поверх UDP вместо TCP — устойчив к потере пакетов, 0\\-RTT connection для repeat visitors. Настройка: Nginx add\\_header Alt\\-Svc \'h3=":443"\', Cloudflare включает автоматически. Проверка: Chrome DevTools Network → Protocol column.\n- **Качественный хостинг:** Shared hosting (5\\-10$ месяц) даёт TTFB 500\\-1500ms. VPS/Dedicated (20\\-100$ месяц) даёт 100\\-300ms. Cloud providers (AWS, GCP, DO) с правильной настройкой дают 50\\-150ms. Измеряйте TTFB из разных регионов через WebPageTest. Факторы: CPU/RAM, network bandwidth, расстояние до users, DB latency.\n- **Географически распределённые серверы:** Если 30% пользователей из Европы, 30% из Азии, 40% из США — разместите серверы в каждом регионе. AWS Regions, GCP Zones, DigitalOcean Datacenters. Route 53, Cloudflare Load Balancing автоматически направляют пользователей к ближайшему серверу. Альтернатива: один origin \\+ aggressive CDN caching. Сложность: синхронизация данных между регионами.',
                },
                {
                  id: 'heading-81',
                  type: 'heading',
                  level: 4,
                  text: 'Стратегии кэширования',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    "- **Server\\-side кэш (Redis/Memcached):** Кэшируйте результаты тяжелых DB запросов, API ответов, рендеринга страниц. DB query 200ms → Redis lookup 2ms. Пример: список продуктов с фильтрами — генерируйте раз в минуту, остальные запросы из кэша. TTL стратегии: статичные данные 1 час, пользовательский контент 5 минут, real\\-time данные без кэша. Cache invalidation при обновлениях. Redis Cluster для high availability.\n- **Static Site Generation (SSG):** Рендерите страницы в HTML на build time. Next.js getStaticProps, Nuxt generate, Gatsby. TTFB = время отдачи файла из CDN = 10\\-50ms. Идеально для блогов, документации, маркетинговых страниц. Ограничение: нужен rebuild при изменении контента. Решение: Incremental Static Regeneration (ISR) — обновление страниц по расписанию без полного rebuild.\n- **HTTP cache headers:** Cache\\-Control: max\\-age=31536000, immutable для JS/CSS с hash в имени файла. Браузер не делает запрос вообще. Cache\\-Control: max\\-age=300, must\\-revalidate для HTML. ETag для проверки изменений — сервер вернёт 304 Not Modified если контент не изменился. stale\\-while\\-revalidate=86400 отдаёт старый кэш моментально и обновляет в фоне. CDN настройки важнее браузерных для публичного контента.\n- **Service Worker кэширование:** Программируемый proxy между браузером и сетью. Cache\\-First стратегия: пытаемся отдать из кэша, при промахе — network. Network\\-First: пытаемся из сети, при офлайне — из кэша. Stale\\-While\\-Revalidate: отдаём кэш моментально и обновляем в фоне. Workbox library упрощает работу. Критично для PWA, offline functionality, instant navigation. Размер кэша: 50\\-100MB безопасно.\n- **Stale\\-while\\-revalidate паттерн:** Комбинация быстрого ответа и актуальности. Сервер отдаёт кэшированный контент моментально (stale) и одновременно обновляет кэш в фоне. Следующий запрос получит свежие данные. Cache\\-Control: max\\-age=3600, stale\\-while\\-revalidate=86400. Пользователь видит контент за 10ms вместо 200ms, но данные не старше часа. Идеально для API, feed'ов, списков продуктов.",
                },
                {
                  id: 'heading-83',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация бэкенда',
                },
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    "- **Database индексы:** Создавайте индексы на поля используемые в WHERE, JOIN, ORDER BY. Query без индекса: full table scan 500ms для 100K записей. С индексом: B\\-tree lookup 5ms. Но избыток индексов замедляет INSERT/UPDATE. CREATE INDEX idx\\_user\\_email ON users(email). Composite индексы для частых комбинаций: (user\\_id, created\\_at). Мониторьте slow query log. EXPLAIN ANALYZE покажет используются ли индексы.\n- **Query optimization и N\\+1 проблема:** N\\+1: загружаете 100 постов за 1 запрос, потом для каждого поста автора — ещё 100 запросов = 101 query. Решение: JOIN или eager loading. GraphQL DataLoader батчит запросы. Sequelize: include, Django: select\\_related, Rails: includes. Избегайте SELECT \\* — выбирайте только нужные поля. Pagination для больших списков. Агрегация на DB уровне вместо в коде.\n- **Connection pooling:** Создание нового DB connection: 50\\-200ms (TCP handshake, auth, session init). Connection pool держит 10\\-50 открытых соединений, переиспользует их. Latency запроса: 2\\-5ms вместо 50\\-200ms. PgBouncer для PostgreSQL, ProxySQL для MySQL. Настройки: min 10 connections, max 50, idle timeout 5 минут. Мониторьте pool exhaustion — симптом slow queries или нехватки connections.\n- **Асинхронная обработка:** Тяжёлые операции (отправка email, обработка изображений, генерация отчётов, external API calls) делайте в background jobs. Пользователь получает instant ответ (50ms), job обрабатывается отдельно. Redis Queue, Bull, Celery, Sidekiq. Pattern: API создаёт task, возвращает task\\_id, клиент poll'ит статус или WebSocket notification. Retry механизм для failed jobs. Dead letter queue для debugging.\n- **Профилирование медленных эндпоинтов:** APM tools (New Relic, Datadog, Sentry) показывают где тратится время: DB queries 60%, external API 25%, CPU 10%, rendering 5%. Flask\\-Profiler, Django Debug Toolbar, Express middleware для детального breakdown. Оптимизируйте узкие места: кэшируйте, добавляйте индексы, переносите в background, используйте faster algorithms. Мониторьте p95/p99 latency, не только average.",
                },
              ],
            },
            {
              id: 'question-85',
              title: '**TBT — Total Blocking Time (&lt; 200ms)**',
              blocks: [
                {
                  id: 'heading-86',
                  type: 'heading',
                  level: 4,
                  text: 'Оптимизация JavaScript бандлов',
                },
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- **Code splitting по функциональности:** Разбивайте не только по роутам, но и по фичам. Admin panel, dashboard widgets, map components — всё в отдельных chunks. React.lazy() с Suspense, Vue defineAsyncComponent(). Webpack magic comments: import(/\\* webpackChunkName: "admin" \\*/ \'./Admin\') для именованных chunks. Приоритет загрузки: critical first, nice\\-to\\-have lazy. Preload для предсказуемых chunks.\n- **Tree shaking максимизация:** Работает только с ES modules. CommonJS (require/module.exports) не позволяет tree shaking. Используйте lodash\\-es вместо lodash, date\\-fns вместо moment. package.json: "sideEffects": false разрешает агрессивное удаление. "sideEffects": \\["\\*.css"\\] сохраняет только CSS импорты. Избегайте import \\* as — импортирует весь модуль. Проверяйте через Bundle Analyzer что unused exports действительно удалены.\n- **Lazy loading компонентов стратегически:** Модалки, табы, dropdown меню, tooltips, charts, maps — всё это должно быть lazy. НО не lazy loading above\\-the\\-fold контента — это ухудшит LCP. React: const Modal = lazy(() =&gt; import(\'./Modal\')), Vue: defineAsyncComponent(() =&gt; import(\'./Modal.vue\')). Intersection Observer для lazy load при scroll в viewport. Приоритет: загружайте visible content сразу, below\\-fold ленивозагружайте.\n- **Import только необходимого:** import {debounce} from \'lodash\' импортирует всю библиотеку (70KB). import debounce from \'lodash/debounce\' — только функцию (2KB). Babel плагины: babel\\-plugin\\-lodash, babel\\-plugin\\-import для автоматической оптимизации. Webpack resolve.alias для замены тяжелых библиотек легкими (moment → dayjs экономит 250KB). Проверяйте import statements в code review.\n- **Удаление polyfills для современных браузеров:** core\\-js, regenerator\\-runtime добавляют 50\\-100KB для старых браузеров. Используйте browserslist: "&gt; 0.5%, last 2 versions, not dead" чтобы не поддерживать IE11. Babel preset\\-env с targets автоматически добавляет только нужные polyfills. Differential serving: modern bundle без polyfills для 95% пользователей, legacy с polyfills для старых браузеров. Экономия: 200KB modern bundle vs 350KB legacy.',
                },
                {
                  id: 'heading-88',
                  type: 'heading',
                  level: 4,
                  text: 'Мониторинг и контроль бандлов',
                },
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- **Bundle analyzers для визуализации:** Webpack Bundle Analyzer показывает treemap всех модулей в бандле с размерами. Находите неожиданные зависимости (случайно импортировали всю библиотеку), дубликаты (одна либа в разных версиях), тяжелые модули (moment.js 300KB). Vite: rollup\\-plugin\\-visualizer. npm run build \\-\\- \\-\\-analyze. Регулярно проверяйте после добавления новых зависимостей. Цель: каждый chunk &lt; 200KB gzipped.\n- **Lighthouse CI в CI/CD pipeline:** Автоматический запуск Lighthouse на каждый PR. Блокируйте merge если метрики регрессировали. GitHub Actions: @treosh/lighthouse\\-ci\\-action, GitLab CI с Docker. Конфиг: минимальные пороги (LCP &lt; 2.5s, TBT &lt; 300ms, CLS &lt; 0.1). Временные графики показывают тренды. Комментарий в PR с результатами и comparison с main branch.\n- **Performance budgets:** Жёсткие лимиты на размеры: total JS &lt; 500KB, total CSS &lt; 100KB, images &lt; 2MB, fonts &lt; 200KB. webpack\\-bundle\\-size\\-analyzer, size\\-limit с pre\\-commit hook. Нарушение бюджета = failed build. Prevent bloat до того как он попадёт в production. Настройка в webpack.config.js performance.maxAssetSize. Мониторинг через Bundlephobia перед установкой новых пакетов.\n- **Coverage tool в Chrome DevTools:** Показывает какой процент загруженного JS/CSS реально используется на странице. Часто 60\\-70% кода не выполняется на first load. Coverage → Record → Reload page → Stop. Красным выделен unused код. Находите кандидатов для code splitting и lazy loading. Особенно полезно для legacy кодбейз с накопленным техдолгом. Цель: &gt;80% utilization rate.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Инструменты',
      blocks: [
        {
          id: 'cards-90',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-91',
              title: '📊 Анализ (Lab Data)',
              blocks: [
                {
                  id: 'text-92',
                  type: 'prose',
                  markdown:
                    '- Lighthouse (Chrome DevTools / CLI)\n- PageSpeed Insights\n- WebPageTest\n- Chrome DevTools Performance',
                },
              ],
            },
            {
              id: 'card-93',
              title: '👥 Real User Monitoring',
              blocks: [
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- Chrome UX Report (CrUX)\n- web\\-vitals библиотека\n- Google Analytics 4\n- Sentry Performance\n- New Relic, Datadog',
                },
              ],
            },
            {
              id: 'card-95',
              title: '📦 Bundle Analysis',
              blocks: [
                {
                  id: 'text-96',
                  type: 'prose',
                  markdown:
                    '- Webpack Bundle Analyzer\n- Vite Bundle Visualizer\n- source\\-map\\-explorer\n- size\\-limit',
                },
              ],
            },
            {
              id: 'card-97',
              title: '🔄 CI/CD Integration',
              blocks: [
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- Lighthouse CI\n- Performance budgets\n- Chromatic для визуальной регрессии\n- Bundle size checks',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практический чеклист',
      blocks: [
        {
          id: 'cards-99',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-100',
              title: '🚀 Быстрые wins',
              blocks: [
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown:
                    '- Сжатие изображений (WebP/AVIF)\n- Defer/async для скриптов\n- Width/height для изображений\n- CDN для статики\n- Минификация CSS/JS\n- Gzip/Brotli сжатие',
                },
              ],
            },
            {
              id: 'card-102',
              title: '🔧 Средней сложности',
              blocks: [
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Code splitting\n- Lazy loading\n- Critical CSS inline\n- Preload ключевых ресурсов\n- Resource hints\n- Service Worker caching',
                },
              ],
            },
            {
              id: 'card-104',
              title: '⚙️ Требует усилий',
              blocks: [
                {
                  id: 'text-105',
                  type: 'prose',
                  markdown:
                    '- Рефакторинг Long Tasks\n- Web Workers\n- SSR/SSG оптимизация\n- Database optimization\n- Edge computing\n- HTTP/3 migration',
                },
              ],
            },
            {
              id: 'card-106',
              title: '📊 Мониторинг',
              blocks: [
                {
                  id: 'text-107',
                  type: 'prose',
                  markdown:
                    '- RUM с web\\-vitals\n- Lighthouse CI\n- Performance budgets\n- Alerting на регрессии\n- A/B тесты оптимизаций\n- CrUX данные',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы',
      blocks: [
        {
          id: 'accordion-108',
          type: 'accordion',
          items: [
            {
              id: 'question-109',
              title: '**Что такое Core Web Vitals и почему они важны?**',
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    'Core Web Vitals — три ключевые метрики UX: LCP (скорость загрузки), INP (интерактивность), CLS (стабильность). Важны потому что: влияют на SEO ранжирование Google, напрямую коррелируют с конверсией, являются измеримыми показателями пользовательского опыта.',
                },
              ],
            },
            {
              id: 'question-111',
              title: '**В чем разница между FID и INP?**',
              blocks: [
                {
                  id: 'text-112',
                  type: 'prose',
                  markdown:
                    'FID (First Input Delay) измерял только первое взаимодействие. INP (Interaction to Next Paint) измеряет все взаимодействия и берет наихудший показатель. INP лучше отражает реальную отзывчивость. С марта 2024 INP заменил FID.',
                },
              ],
            },
            {
              id: 'question-113',
              title: '**Как оптимизировать LCP для страницы с большим hero\\-изображением?**',
              blocks: [
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    'Современные форматы (WebP, AVIF), адаптивные изображения (srcset), preload изображения, fetchpriority="high", loading="eager", CDN для доставки, правильные размеры без масштабирования в CSS.',
                },
              ],
            },
            {
              id: 'question-115',
              title: '**Почему CLS 0.15 — плохой показатель?**',
              blocks: [
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    'CLS &gt; 0.1 попадает в "Needs Improvement". Означает заметные сдвиги контента, которые раздражают пользователей. Причины: изображения без размеров, динамический контент без резервирования места, проблемы с шрифтами, реклама без min\\-height.',
                },
              ],
            },
            {
              id: 'question-117',
              title: '**Что такое Long Tasks и как они влияют на INP?**',
              blocks: [
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    'Long Tasks — задачи JavaScript &gt;50ms, блокирующие главный поток. Напрямую влияют на INP, так как браузер не может обработать взаимодействия. Решения: разбивка на мелкие задачи, Web Workers, requestIdleCallback, code splitting.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Связь метрик с бизнес-целями',
      blocks: [
        {
          id: 'callout-119',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-120',
              type: 'prose',
              markdown:
                '**Важно:** Улучшение Web Vitals напрямую влияет на бизнес\\-метрики. Исследования показывают, что улучшение LCP на 100ms увеличивает конверсию на 0.5\\-1%.',
            },
          ],
        },
        {
          id: 'table-121',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метрика',
            },
            {
              id: 'column-2',
              label: 'Влияние на бизнес',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-122',
                    type: 'prose',
                    markdown: '**LCP**',
                  },
                ],
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown:
                      'Каждые 100ms задержки снижают конверсию на ~0.7%. Пользователи покидают медленные сайты. Особенно критично для e\\-commerce.',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '**INP**',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown:
                      'Медленный отклик разочаровывает пользователей. Падает engagement и повторные визиты. Критично для интерактивных приложений.',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: '**CLS**',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown:
                      'Непредвиденные сдвиги раздражают пользователей, могут привести к случайным кликам по рекламе. Снижает trust и credibility.',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-128',
                    type: 'prose',
                    markdown: '**SEO**',
                  },
                ],
                [
                  {
                    id: 'text-129',
                    type: 'prose',
                    markdown:
                      'Core Web Vitals — официальный ranking фактор Google с 2021 года. Плохие показатели снижают позиции в поиске.',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'resources-130',
          type: 'resources',
          items: [
            {
              id: 'link-131',
              label: 'Web Vitals Guide',
              url: 'https://web.dev/vitals/',
            },
          ],
        },
        {
          id: 'resources-132',
          type: 'resources',
          items: [
            {
              id: 'link-133',
              label: 'web-vitals Library',
              url: 'https://github.com/GoogleChrome/web-vitals',
            },
          ],
        },
        {
          id: 'resources-134',
          type: 'resources',
          items: [
            {
              id: 'link-135',
              label: 'PageSpeed Insights',
              url: 'https://pagespeed.web.dev/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
