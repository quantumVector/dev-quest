import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-chrome-dev-tools-performancesnippet.txt?raw'
import example2 from '../snippets/web/web-chrome-dev-tools-memoryleaksnippet.txt?raw'
import example3 from '../snippets/web/web-chrome-dev-tools-networksnippet.txt?raw'
import example4 from '../snippets/web/web-chrome-dev-tools-consolesnippet.txt?raw'
import example5 from '../snippets/web/web-chrome-dev-tools-storagesnippet.txt?raw'
import example6 from '../snippets/web/web-chrome-dev-tools-a11ysnippet.txt?raw'
import example7 from '../snippets/web/web-chrome-dev-tools-debuggingsnippet.txt?raw'
import example8 from '../snippets/web/web-chrome-dev-tools-coveragesnippet.txt?raw'

// Content copied verbatim from src/views/web/ChromeDevTools.vue.
export default {
  ...articleSummaries.webChromeDevTools,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Chrome DevTools** — это набор инструментов разработчика, встроенных в браузер Chrome. Понимание продвинутых возможностей DevTools критически важно для эффективной отладки, оптимизации производительности и обеспечения доступности веб\\-приложений.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные инструменты и частота использования',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Инструмент',
            },
            {
              id: 'column-2',
              label: 'Частота использования',
            },
            {
              id: 'column-3',
              label: 'Основное применение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-3',
                    type: 'prose',
                    markdown: '**Elements**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '**Ежедневно**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Инспектирование DOM, правка CSS в реальном времени',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '**Console**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '**Ежедневно**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Отладка JavaScript, логирование, выполнение кода',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Sources**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**Ежедневно**',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Debugging, breakpoints, исходники',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Network**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**Ежедневно**',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Анализ запросов, производительность загрузки',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Performance (Profiler)**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**Еженедельно**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Профилирование, поиск bottlenecks, FPS анализ',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Memory**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**По необходимости**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Поиск утечек памяти, heap snapshots',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Application (Storage)**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**Регулярно**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'localStorage, cookies, IndexedDB, Service Workers',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Lighthouse**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Перед релизом**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Аудит производительности, доступности, SEO',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Coverage**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**При оптимизации**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Анализ неиспользуемого кода',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Performance (Profiler) — профилирование приложения',
      blocks: [
        {
          id: 'text-30',
          type: 'prose',
          markdown:
            'Performance Profiler помогает находить узкие места в производительности: медленные функции, длительные рендеры, проблемы с FPS и layout thrashing.',
        },
        {
          id: 'cards-31',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: 'Когда использовать',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- **Медленный рендеринг** — долгая отрисовка\n- **Проблемы с FPS** — анимации тормозят\n- **Долгие задачи** — blocking main thread\n- **Layout thrashing** — множественные reflow\n- **Профилирование функций** — что медленное?',
                },
              ],
            },
            {
              id: 'card-35',
              blocks: [
                {
                  id: 'heading-36',
                  type: 'heading',
                  level: 3,
                  text: 'Основные метрики',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- **FPS** — frames per second (60 FPS цель)\n- **CPU** — нагрузка на процессор\n- **NET** — сетевая активность\n- **Main** — flame chart главного потока\n- **Timings** — FCP, LCP, DCL',
                },
              ],
            },
          ],
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-39',
          type: 'heading',
          level: 3,
          text: 'Практический пример использования Performance',
        },
        {
          id: 'steps-40',
          type: 'steps',
          showTitle: false,
          restartLabel: 'Начать заново',
          items: [
            {
              id: 'step-41',
              title: 'Запись',
              blocks: [
                {
                  id: 'cards-42',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-43',
                      blocks: [
                        {
                          id: 'heading-44',
                          type: 'heading',
                          level: 4,
                          text: '1. Начать запись профилирования',
                        },
                        {
                          id: 'text-45',
                          type: 'prose',
                          markdown: 'DevTools → Performance → Record → Выполнить действие → Stop',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-46',
              title: 'Анализ',
              blocks: [
                {
                  id: 'cards-47',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-48',
                      blocks: [
                        {
                          id: 'heading-49',
                          type: 'heading',
                          level: 4,
                          text: '2. Анализ Flame Chart',
                        },
                        {
                          id: 'text-50',
                          type: 'prose',
                          markdown:
                            'Найти длинные задачи (&gt;50ms), bottlenecks, layout thrashing',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-51',
              title: 'Оптимизация',
              blocks: [
                {
                  id: 'cards-52',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-53',
                      blocks: [
                        {
                          id: 'heading-54',
                          type: 'heading',
                          level: 4,
                          text: '3. Оптимизация',
                        },
                        {
                          id: 'text-55',
                          type: 'prose',
                          markdown: 'Дебаунсинг, виртуализация, Web Workers, мемоизация',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Memory — поиск утечек памяти',
      blocks: [
        {
          id: 'text-56',
          type: 'prose',
          markdown:
            'Memory Profiler помогает находить утечки памяти через heap snapshots, allocation timelines и allocation sampling. Критически важен для SPA с длительным временем жизни.',
        },
        {
          id: 'cards-57',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: 'Heap Snapshot',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    'Снимок всех объектов в памяти. Сравнение снимков показывает, что не очищается.',
                },
              ],
            },
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: 'Allocation Timeline',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    'Показывает выделение памяти в реальном времени. Полезно для поиска постоянного роста.',
                },
              ],
            },
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: 'Allocation Sampling',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    'Профилирование выделения памяти функциями. Меньше нагрузка, чем heap snapshot.',
                },
              ],
            },
          ],
        },
        {
          id: 'code-67',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'heading-68',
          type: 'heading',
          level: 3,
          text: 'Типичные причины утечек памяти',
        },
        {
          id: 'cards-69',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-70',
              title: 'Частые утечки',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Event listeners не удаляются\n- Таймеры setInterval не очищаются\n- Глобальные переменные растут\n- Циклические ссылки в замыканиях\n- Detached DOM nodes\n- Кэши без ограничений',
                },
              ],
            },
            {
              id: 'card-72',
              title: 'Решения',
              blocks: [
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- removeEventListener в cleanup\n- clearInterval/clearTimeout\n- WeakMap/WeakSet для кэшей\n- Обнуление ссылок в destroy()\n- Удаление DOM элементов полностью\n- LRU cache с лимитом',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Network — анализ сетевых запросов',
      blocks: [
        {
          id: 'text-74',
          type: 'prose',
          markdown:
            'Network панель критически важна для оптимизации загрузки, анализа API запросов, проверки заголовков и отладки CORS проблем.',
        },
        {
          id: 'code-75',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-76',
          type: 'heading',
          level: 3,
          text: 'Ключевые возможности Network',
        },
        {
          id: 'table-77',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Функция',
            },
            {
              id: 'column-2',
              label: 'Применение',
            },
            {
              id: 'column-3',
              label: 'Горячие клавиши',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '**Throttling**',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Симуляция медленного соединения',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Slow 3G, Fast 3G, Offline',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '**Disable cache**',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Тестирование без кэша',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Checkbox в Network',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '**Block request URL**',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Тестирование без конкретных ресурсов',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'ПКМ → Block request URL',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '**Copy as cURL**',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Повторить запрос вне браузера',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'ПКМ → Copy → Copy as cURL',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '**Waterfall**',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Визуализация последовательности загрузки',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Timing tab',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Console — продвинутые техники',
      blocks: [
        {
          id: 'text-93',
          type: 'prose',
          markdown:
            'Console — это не только console.log. Есть множество мощных методов для структурирования логов, профилирования и отладки.',
        },
        {
          id: 'code-94',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Application (Storage) — работа с хранилищами',
      blocks: [
        {
          id: 'text-95',
          type: 'prose',
          markdown:
            'Application панель предоставляет доступ ко всем видам хранилищ: LocalStorage, SessionStorage, IndexedDB, Cookies, Cache Storage и Service Workers.',
        },
        {
          id: 'code-96',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-97',
          type: 'heading',
          level: 3,
          text: 'Сравнение типов хранилищ',
        },
        {
          id: 'table-98',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Размер',
            },
            {
              id: 'column-3',
              label: 'Время жизни',
            },
            {
              id: 'column-4',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: '**LocalStorage**',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: '~5\\-10 MB',
                  },
                ],
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: 'Постоянно',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: 'Настройки, токены (не чувствительные)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: '**SessionStorage**',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: '~5\\-10 MB',
                  },
                ],
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: 'До закрытия вкладки',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: 'Временные данные сессии',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: '**IndexedDB**',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: '~50 MB\\+',
                  },
                ],
                [
                  {
                    id: 'text-109',
                    type: 'prose',
                    markdown: 'Постоянно',
                  },
                ],
                [
                  {
                    id: 'text-110',
                    type: 'prose',
                    markdown: 'Большие объемы структурированных данных',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-111',
                    type: 'prose',
                    markdown: '**Cookies**',
                  },
                ],
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: '~4 KB',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: 'Настраиваемо',
                  },
                ],
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: 'Аутентификация, tracking',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: '**Cache API**',
                  },
                ],
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: 'Зависит от квоты',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: 'Постоянно',
                  },
                ],
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: 'Service Worker кэширование',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Accessibility (A11y) Tree — дерево доступности',
      blocks: [
        {
          id: 'text-119',
          type: 'prose',
          markdown:
            '**Accessibility Tree** — это параллельная структура DOM, которую используют assistive technologies (скринридеры, браузерные расширения). Понимание A11y Tree критически важно для создания доступных интерфейсов.',
        },
        {
          id: 'callout-120',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-121',
              type: 'prose',
              markdown:
                '**Важно:** Accessibility Tree строится на основе семантики HTML и ARIA атрибутов. Неправильная семантика приводит к проблемам с доступностью, которые сложно обнаружить без DevTools.',
            },
          ],
        },
        {
          id: 'code-122',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
        {
          id: 'heading-123',
          type: 'heading',
          level: 3,
          text: 'Использование Accessibility панели',
        },
        {
          id: 'cards-124',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-125',
              blocks: [
                {
                  id: 'heading-126',
                  type: 'heading',
                  level: 3,
                  text: 'A11y Tree',
                },
                {
                  id: 'text-127',
                  type: 'prose',
                  markdown:
                    'Elements → Accessibility tab. Показывает, как assistive technologies видят страницу.',
                },
              ],
            },
            {
              id: 'card-128',
              blocks: [
                {
                  id: 'heading-129',
                  type: 'heading',
                  level: 3,
                  text: 'Contrast Ratio',
                },
                {
                  id: 'text-130',
                  type: 'prose',
                  markdown: 'Проверка контрастности текста. Показывает соответствие WCAG AA/AAA.',
                },
              ],
            },
            {
              id: 'card-131',
              blocks: [
                {
                  id: 'heading-132',
                  type: 'heading',
                  level: 3,
                  text: 'Issues',
                },
                {
                  id: 'text-133',
                  type: 'prose',
                  markdown:
                    'DevTools автоматически находит проблемы доступности и предлагает решения.',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-134',
          type: 'heading',
          level: 3,
          text: 'Частые проблемы доступности',
        },
        {
          id: 'table-135',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Проблема',
            },
            {
              id: 'column-2',
              label: 'Как обнаружить',
            },
            {
              id: 'column-3',
              label: 'Решение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-136',
                    type: 'prose',
                    markdown: 'Отсутствие alt у изображений',
                  },
                ],
                [
                  {
                    id: 'text-137',
                    type: 'prose',
                    markdown: 'Lighthouse → Accessibility',
                  },
                ],
                [
                  {
                    id: 'text-138',
                    type: 'prose',
                    markdown: 'Добавить alt с описанием',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-139',
                    type: 'prose',
                    markdown: 'Низкий контраст текста',
                  },
                ],
                [
                  {
                    id: 'text-140',
                    type: 'prose',
                    markdown: 'Elements → Contrast ratio',
                  },
                ],
                [
                  {
                    id: 'text-141',
                    type: 'prose',
                    markdown: 'Увеличить контраст (4.5:1 минимум)',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-142',
                    type: 'prose',
                    markdown: 'Кнопки без label',
                  },
                ],
                [
                  {
                    id: 'text-143',
                    type: 'prose',
                    markdown: 'A11y Tree → проверить name',
                  },
                ],
                [
                  {
                    id: 'text-144',
                    type: 'prose',
                    markdown: 'Добавить aria\\-label или текст',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-145',
                    type: 'prose',
                    markdown: 'Пропущены heading уровни',
                  },
                ],
                [
                  {
                    id: 'text-146',
                    type: 'prose',
                    markdown: 'A11y Tree → структура заголовков',
                  },
                ],
                [
                  {
                    id: 'text-147',
                    type: 'prose',
                    markdown: 'Использовать h1→h2→h3 последовательно',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-148',
                    type: 'prose',
                    markdown: 'Формы без label',
                  },
                ],
                [
                  {
                    id: 'text-149',
                    type: 'prose',
                    markdown: 'Issues → Accessibility issues',
                  },
                ],
                [
                  {
                    id: 'text-150',
                    type: 'prose',
                    markdown: 'Связать label с input через for/id',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Продвинутые техники отладки',
      blocks: [
        {
          id: 'code-151',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Coverage — анализ неиспользуемого кода',
      blocks: [
        {
          id: 'text-152',
          type: 'prose',
          markdown:
            'Coverage Tool показывает, какой процент загруженного CSS и JavaScript кода реально используется на странице. Критически важен для оптимизации bundle size.',
        },
        {
          id: 'code-153',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-154',
          type: 'prose',
          markdown:
            '1. **Как найти утечку памяти в приложении?**\n   \n   1\\. Открыть Memory → Heap snapshot → Сделать снимок. 2. Выполнить действие, которое может вызвать утечку. 3. Сделать второй снимок. 4. Сравнить снимки (Comparison view). 5. Искать объекты, которые не были освобождены, особенно detached DOM nodes и event listeners.\n2. **Что показывает Flame Chart в Performance?**\n   \n   Flame Chart показывает стек вызовов функций во времени. Ширина блока — время выполнения, вложенность — стек вызовов. Ищите длинные блоки (&gt;50ms) и повторяющиеся паттерны (layout thrashing) — это узкие места производительности.\n3. **Для чего нужен Accessibility Tree?**\n   \n   A11y Tree показывает, как assistive technologies (скринридеры) интерпретируют страницу. Это параллельная DOM структура, построенная на семантике HTML и ARIA атрибутах. Помогает находить проблемы доступности: отсутствие labels, неправильные роли, проблемы навигации.\n4. **Как использовать Coverage для оптимизации?**\n   \n   Coverage показывает неиспользуемый код. Открыть Coverage → Start → Взаимодействовать с сайтом → Stop. Красные области — неиспользуемый код. Решения: code splitting, tree\\-shaking, динамические импорты, удаление неиспользуемых библиотек.\n5. **Что такое Layout Thrashing и как его найти?**\n   \n   Layout Thrashing — множественные принудительные reflow из\\-за чередования чтения и записи layout properties (offsetHeight, scrollTop). В Performance видно как чередующиеся фиолетовые (Layout) блоки. Решение: батчить чтения и записи, использовать requestAnimationFrame.\n6. **Как отладить CORS ошибки?**\n   \n   Network → выбрать failed запрос → Headers tab. Проверить: 1) Access\\-Control\\-Allow\\-Origin в response headers, 2) Preflight OPTIONS запрос (для non\\-simple requests), 3) Credentials mode и Access\\-Control\\-Allow\\-Credentials. Console покажет точную причину CORS ошибки.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Горячие клавиши DevTools',
      blocks: [
        {
          id: 'table-155',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Действие',
            },
            {
              id: 'column-2',
              label: 'Windows/Linux',
            },
            {
              id: 'column-3',
              label: 'Mac',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-156',
                    type: 'prose',
                    markdown: 'Открыть DevTools',
                  },
                ],
                [
                  {
                    id: 'text-157',
                    type: 'prose',
                    markdown: '<kbd>F12</kbd> или <kbd>Ctrl\\+Shift\\+I</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-158',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+Option\\+I</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-159',
                    type: 'prose',
                    markdown: 'Command Menu',
                  },
                ],
                [
                  {
                    id: 'text-160',
                    type: 'prose',
                    markdown: '<kbd>Ctrl\\+Shift\\+P</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-161',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+Shift\\+P</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-162',
                    type: 'prose',
                    markdown: 'Inspect Element',
                  },
                ],
                [
                  {
                    id: 'text-163',
                    type: 'prose',
                    markdown: '<kbd>Ctrl\\+Shift\\+C</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-164',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+Shift\\+C</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-165',
                    type: 'prose',
                    markdown: 'Console',
                  },
                ],
                [
                  {
                    id: 'text-166',
                    type: 'prose',
                    markdown: '<kbd>Ctrl\\+Shift\\+J</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-167',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+Option\\+J</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-168',
                    type: 'prose',
                    markdown: 'Поиск по файлам',
                  },
                ],
                [
                  {
                    id: 'text-169',
                    type: 'prose',
                    markdown: '<kbd>Ctrl\\+P</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-170',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+P</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-171',
                    type: 'prose',
                    markdown: 'Поиск в файле',
                  },
                ],
                [
                  {
                    id: 'text-172',
                    type: 'prose',
                    markdown: '<kbd>Ctrl\\+F</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-173',
                    type: 'prose',
                    markdown: '<kbd>Cmd\\+F</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-174',
                    type: 'prose',
                    markdown: 'Следующий breakpoint',
                  },
                ],
                [
                  {
                    id: 'text-175',
                    type: 'prose',
                    markdown: '<kbd>F8</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-176',
                    type: 'prose',
                    markdown: '<kbd>F8</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-177',
                    type: 'prose',
                    markdown: 'Step over',
                  },
                ],
                [
                  {
                    id: 'text-178',
                    type: 'prose',
                    markdown: '<kbd>F10</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-179',
                    type: 'prose',
                    markdown: '<kbd>F10</kbd>',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-180',
                    type: 'prose',
                    markdown: 'Step into',
                  },
                ],
                [
                  {
                    id: 'text-181',
                    type: 'prose',
                    markdown: '<kbd>F11</kbd>',
                  },
                ],
                [
                  {
                    id: 'text-182',
                    type: 'prose',
                    markdown: '<kbd>F11</kbd>',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-183',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-184',
              blocks: [
                {
                  id: 'heading-185',
                  type: 'heading',
                  level: 3,
                  text: '✅ Регулярно',
                },
                {
                  id: 'text-186',
                  type: 'prose',
                  markdown:
                    '- Проверять Network waterfall\n- Использовать Console для отладки\n- Инспектировать A11y Tree\n- Проверять Lighthouse перед релизом\n- Мониторить размер bundle\n- Тестировать на медленных сетях',
                },
              ],
            },
            {
              id: 'card-187',
              blocks: [
                {
                  id: 'heading-188',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ По необходимости',
                },
                {
                  id: 'text-189',
                  type: 'prose',
                  markdown:
                    '- Performance профилирование\n- Memory heap snapshots\n- Coverage анализ\n- Advanced breakpoints\n- Local overrides для тестов\n- Request blocking',
                },
              ],
            },
            {
              id: 'card-190',
              blocks: [
                {
                  id: 'heading-191',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-192',
                  type: 'prose',
                  markdown:
                    '- Создавайте Snippets для частых задач\n- Используйте Command Menu (Cmd\\+Shift\\+P)\n- Blackbox сторонние библиотеки\n- Сохраняйте полезные console методы\n- Изучите горячие клавиши\n- Экспериментируйте с новыми панелями',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-193',
          type: 'prose',
          markdown:
            '**Chrome DevTools** — это мощный набор инструментов, который выходит далеко за пределы простого console.log. **Performance Profiler** критичен для поиска узких мест производительности, **Memory** панель незаменима для обнаружения утечек памяти, **Application (Storage)** необходима для работы с различными типами хранилищ, а **Accessibility Tree** помогает создавать доступные интерфейсы. Понимание и эффективное использование этих инструментов — признак опытного фронтенд\\-разработчика.',
        },
        {
          id: 'resources-194',
          type: 'resources',
          items: [
            {
              id: 'link-195',
              label: 'Chrome DevTools Docs',
              url: 'https://developer.chrome.com/docs/devtools/',
            },
          ],
        },
        {
          id: 'resources-196',
          type: 'resources',
          items: [
            {
              id: 'link-197',
              label: 'web.dev: DevTools',
              url: 'https://web.dev/learn/#devtools',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
