import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/css-in-js-snippetbasicexample.js.txt?raw'
import example2 from '../snippets/css/css-in-js-snippetvanillaextract.js.txt?raw'
import example3 from '../snippets/css/css-in-js-snippethybrid.js.txt?raw'

// Content copied verbatim from src/views/css/CSSInJS.vue.
export default {
  ...articleSummaries.cssInJs,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'CSS-in-JS — подход, при котором стили описываются непосредственно в JavaScript-коде. Стили могут генерироваться динамически во время выполнения или компилироваться в статические CSS-файлы на этапе сборки. В этой статье разберём, что такое CSS-in-JS, какие библиотеки существуют, чем они отличаются и как выбрать правильный инструмент.',
    },
  ],
  sections: [
    {
      id: 'definition',
      title: 'Что такое CSS-in-JS и зачем это нужно',
      blocks: [
        {
          id: 'text-2',
          type: 'prose',
          markdown:
            'Традиционный CSS глобален по своей природе: любой класс, объявленный в одном месте, может случайно перекрыть стили в другом. В больших командах это превращается в нескончаемую борьбу с именами классов, специфичностью и «мёртвыми» стилями, которые никто не решается удалить.',
        },
        {
          id: 'text-3',
          type: 'prose',
          markdown:
            'CSS-in-JS решает эту проблему, привязывая стили к конкретному компоненту. Библиотека автоматически генерирует уникальные хэшированные имена классов, устраняя конфликты. Кроме того, стили становятся реактивными: они могут меняться в зависимости от пропсов, состояния или темы без единой строчки ручной манипуляции с DOM.',
        },
        {
          id: 'text-4',
          type: 'prose',
          markdown:
            'Важно понимать, что CSS-in-JS — это не один инструмент, а целый класс решений с разными компромиссами. Одни библиотеки генерируют CSS прямо в браузере (runtime), другие извлекают его на этапе сборки (pre-compile). Выбор между ними определяет производительность, гибкость и сложность проекта.',
        },
      ],
    },
    {
      id: 'libraries',
      title: 'Основные библиотеки',
      blocks: [
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            'Экосистема CSS-in-JS достаточно разнообразна. Ниже — ключевые игроки с их характеристиками:',
        },
        {
          id: 'table-6',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Библиотека',
            },
            {
              id: 'column-2',
              label: 'Синтаксис',
            },
            {
              id: 'column-3',
              label: 'Runtime',
            },
            {
              id: 'column-4',
              label: 'Bundle',
            },
            {
              id: 'column-5',
              label: 'TypeScript',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '**Styled Components**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Template literals',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '~40kb',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Средний',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Emotion**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Objects + strings',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '~20kb',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Отличный',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '**JSS**',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'JS-объекты',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '~25kb',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Хороший',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**Stitches**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Система вариантов',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Минимальный',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '~10kb',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Отличный',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Vanilla Extract**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'TS-объекты',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '~2kb',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Отличный',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**Linaria**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Template literals',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '~0kb',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Средний',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Goober**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Template literals',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '~1kb',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Средний',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            '**Styled Components** — самая популярная библиотека с огромным сообществом. **Emotion** — быстрее и гибче, поддерживает как объектный, так и строковый синтаксис. **JSS** отличается плагинной архитектурой и чистым JS-объектным подходом. **Stitches** предлагает систему вариантов и минимальный runtime. **Vanilla Extract** и **Linaria** — zero-runtime решения, извлекающие CSS на этапе сборки. **Goober** — ультралёгкая альтернатива для небольших проектов.',
        },
      ],
    },
    {
      id: 'example',
      title: 'Как выглядит CSS-in-JS на практике',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown:
            'Ниже — типичный пример runtime CSS-in-JS (Styled Components): стили вычисляются прямо в браузере на основе пропсов и темы.',
        },
        {
          id: 'code-44',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'benefits',
      title: 'Преимущества CSS-in-JS',
      blocks: [
        {
          id: 'cards-45',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-46',
              title: '🎯 Изоляция стилей',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    'Автоматически генерируются уникальные имена классов — никаких конфликтов между компонентами. Стиль живёт рядом с компонентом и удаляется вместе с ним, исключая «мёртвый» CSS.',
                },
              ],
            },
            {
              id: 'card-48',
              title: '⚡ Динамичность',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    'Стили реагируют на пропсы, состояние и тему в реальном времени. Условная логика любой сложности — прямо в CSS, без манипуляций с классами вручную.',
                },
              ],
            },
            {
              id: 'card-50',
              title: '🎨 Тематизация',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    'ThemeProvider передаёт тему через контекст. Переключение светлой и тёмной темы, брендовые вариации — всё это без дополнительных CSS-классов или data-атрибутов.',
                },
              ],
            },
            {
              id: 'card-52',
              title: '🔧 Developer Experience',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    'TypeScript-поддержка, автокомплит CSS-свойств, отладка в DevTools с понятными именами компонентов. Один язык для логики и стилей снижает переключение контекста.',
                },
              ],
            },
            {
              id: 'card-54',
              title: '🚀 SSR и критические стили',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    'Стили собираются на сервере и вставляются в HTML как критические — страница отображается корректно сразу, без «вспышки» нестилизованного контента (FOUC).',
                },
              ],
            },
            {
              id: 'card-56',
              title: '📦 Компонентный подход',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    'Стиль, логика и разметка компонента хранятся вместе. Это упрощает переиспользование, рефакторинг и понимание кода — особенно в больших командах.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'drawbacks',
      title: 'Недостатки CSS-in-JS',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-59',
              title: '🐌 Runtime-накладные расходы',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    'Runtime-библиотеки вычисляют и инжектируют CSS при каждом рендере. Это добавляет 5–15ms на рендер, увеличивает размер JS-бандла на 12–40kb и может вызывать лишние перерисовки при изменении пропсов.',
                },
              ],
            },
            {
              id: 'card-61',
              title: '📈 Кривая обучения',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    'CSS-разработчикам и дизайнерам, незнакомым с JavaScript, будет непросто. Разные библиотеки предлагают разные API, что усложняет переход между проектами и создаёт зависимость от конкретного инструмента.',
                },
              ],
            },
            {
              id: 'card-63',
              title: '🔒 Технические ограничения',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    'Сгенерированные стили не кэшируются браузером как статические CSS-файлы. Некоторые функции CSS поддерживаются ограниченно. Строгие CSP-политики (Content Security Policy) могут блокировать inline-стили.',
                },
              ],
            },
            {
              id: 'card-65',
              title: '🔧 Инструментарий',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    'Поддержка IDE и линтеров остаётся слабее, чем у обычного CSS. Отсутствие единого стандарта приводит к фрагментации экосистемы, а миграция между библиотеками требует значительных усилий.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'runtime-vs-build',
      title: 'Runtime против Pre-compile: ключевое различие',
      blocks: [
        {
          id: 'text-67',
          type: 'prose',
          markdown:
            'Это одно из самых важных архитектурных решений при выборе CSS-in-JS. Два подхода дают принципиально разные компромиссы между гибкостью и производительностью.',
        },
        {
          id: 'cards-68',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-69',
              title: '🔄 Runtime',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    'CSS генерируется прямо в браузере при каждом рендере. Библиотека вычисляет стили на основе текущих пропсов и состояния, создаёт уникальный класс и инжектирует его в &lt;head&gt;.',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown: '**Библиотеки:** Styled Components, Emotion, JSS, Goober',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '**Главное преимущество:** неограниченная динамичность — любые вычисления, любые данные из API или состояния',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '**Главный недостаток:** накладные расходы в runtime, увеличенный бандл',
                },
              ],
            },
            {
              id: 'card-74',
              title: '⚡ Pre-compile',
              blocks: [
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    'CSS извлекается в статические файлы на этапе сборки. В браузер попадает уже готовый CSS-файл, а компонент лишь выбирает нужный класс из предопределённого набора.',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown: '**Библиотеки:** Vanilla Extract, Linaria, Compiled',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '**Главное преимущество:** нулевой runtime-overhead, браузерное кэширование статического CSS',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '**Главный недостаток:** ограниченная динамичность — все варианты стилей должны быть известны заранее',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Детальное сравнение характеристик',
      blocks: [
        {
          id: 'table-79',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Runtime',
            },
            {
              id: 'column-3',
              label: 'Pre-compile',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '**Bundle Size**',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '12–40kb',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '~2kb',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '**Overhead на рендер**',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '5–15ms',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '~1ms',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '**Кэширование CSS**',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Да (статический файл)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '**Динамические стили**',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Любые',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Только предопределённые варианты',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '**TypeScript**',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Ограниченный',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Полная типизация',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '**SSR-производительность**',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: '**Hot Reload**',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: 'Мгновенный',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: 'Требует пересборки',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: '**Порог входа**',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: 'Низкий',
                  },
                ],
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: 'Выше',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'text-104',
          type: 'prose',
          markdown:
            'Пример pre-compile подхода с Vanilla Extract: все варианты объявляются статически, CSS генерируется при сборке, в браузере — только выбор класса.',
        },
        {
          id: 'code-105',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'hybrid',
      title: 'Гибридный подход: лучшее из двух миров',
      blocks: [
        {
          id: 'text-106',
          type: 'prose',
          markdown:
            'На практике часто оптимальным решением является комбинация: pre-compile для базовых компонентов дизайн-системы и runtime-логика только там, где она действительно нужна. Ключевым мостом между подходами служат CSS-переменные: статический класс задаёт структуру, а inline-стиль через CSS custom properties передаёт динамическое значение без пересчёта CSS.',
        },
        {
          id: 'code-107',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'cards-108',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-109',
              title: 'Pre-compile покрывает',
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    '- Базовые компоненты дизайн-системы\n- Layout и типографику\n- Предопределённые варианты кнопок, карточек, форм',
                },
              ],
            },
            {
              id: 'card-111',
              title: 'Runtime — только для',
              blocks: [
                {
                  id: 'text-112',
                  type: 'prose',
                  markdown:
                    '- Пользовательских тем и брендовых цветов\n- Анимаций на основе live-данных\n- A/B-тестирования стилей',
                },
              ],
            },
            {
              id: 'card-113',
              title: 'CSS-переменные как мост',
              blocks: [
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    '- Динамические значения без пересчёта CSS\n- Кэшируемый статический класс\n- Нативная поддержка всех браузеров',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'alternatives',
      title: 'CSS-in-JS vs CSS Modules vs обычный CSS',
      blocks: [
        {
          id: 'table-115',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Критерий',
            },
            {
              id: 'column-2',
              label: 'CSS-in-JS',
            },
            {
              id: 'column-3',
              label: 'CSS Modules',
            },
            {
              id: 'column-4',
              label: 'Обычный CSS',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: '**Изоляция**',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: 'Автоматическая',
                  },
                ],
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: 'Автоматическая',
                  },
                ],
                [
                  {
                    id: 'text-119',
                    type: 'prose',
                    markdown: 'Ручная',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-120',
                    type: 'prose',
                    markdown: '**Динамичность**',
                  },
                ],
                [
                  {
                    id: 'text-121',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-122',
                    type: 'prose',
                    markdown: 'Ограниченная',
                  },
                ],
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: 'Runtime overhead',
                  },
                ],
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown: 'Лучшая',
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
                    markdown: '**Кэширование**',
                  },
                ],
                [
                  {
                    id: 'text-129',
                    type: 'prose',
                    markdown: 'Нет (runtime)',
                  },
                ],
                [
                  {
                    id: 'text-130',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-131',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-132',
                    type: 'prose',
                    markdown: '**TypeScript**',
                  },
                ],
                [
                  {
                    id: 'text-133',
                    type: 'prose',
                    markdown: 'Отличный',
                  },
                ],
                [
                  {
                    id: 'text-134',
                    type: 'prose',
                    markdown: 'Ограниченный',
                  },
                ],
                [
                  {
                    id: 'text-135',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-136',
                    type: 'prose',
                    markdown: '**Удобство разработки**',
                  },
                ],
                [
                  {
                    id: 'text-137',
                    type: 'prose',
                    markdown: 'Высокое',
                  },
                ],
                [
                  {
                    id: 'text-138',
                    type: 'prose',
                    markdown: 'Хорошее',
                  },
                ],
                [
                  {
                    id: 'text-139',
                    type: 'prose',
                    markdown: 'Среднее',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'use-cases',
      title: 'Где стоит использовать CSS-in-JS',
      blocks: [
        {
          id: 'cards-140',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-141',
              title: '✅ Идеально подходит',
              blocks: [
                {
                  id: 'text-142',
                  type: 'prose',
                  markdown:
                    '- **React/Vue-приложения** с компонентной архитектурой\n- **Дизайн-системы** с множеством вариантов компонентов\n- **Приложения с темами** — светлая/тёмная, мультибрендовость\n- **Библиотеки компонентов** для переиспользования\n- **Динамические стили** на основе пользовательских данных\n- **Микрофронтенды** — полная изоляция стилей между командами',
                },
              ],
            },
            {
              id: 'card-143',
              title: '❌ Не рекомендуется',
              blocks: [
                {
                  id: 'text-144',
                  type: 'prose',
                  markdown:
                    '- **Статические сайты** без интерактивности\n- **Email-шаблоны** — ограниченная поддержка\n- **Проекты с жёсткими CSP** — inline-стили могут быть заблокированы\n- **Небольшие проекты** с простой стилизацией\n- **Команды без опыта JS** — слишком высокий порог входа\n- **Критичная производительность** на слабых устройствах',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'library-choice',
      title: 'Как выбрать конкретную библиотеку',
      blocks: [
        {
          id: 'text-145',
          type: 'prose',
          markdown:
            'Нет универсального ответа — выбор зависит от требований проекта, опыта команды и долгосрочных планов. Вот практические рекомендации:',
        },
        {
          id: 'cards-146',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-147',
              title: 'Styled Components',
              blocks: [
                {
                  id: 'text-148',
                  type: 'prose',
                  markdown:
                    'Выбирайте, если команда привыкла к CSS-синтаксису, нужна максимальная гибкость и большое сообщество с готовыми решениями. Хорош для React-экосистемы с активной тематизацией. Избегайте, если критична производительность или нужен строгий TypeScript.',
                },
              ],
            },
            {
              id: 'card-149',
              title: 'Emotion',
              blocks: [
                {
                  id: 'text-150',
                  type: 'prose',
                  markdown:
                    'Лучший баланс гибкости и производительности среди runtime-решений. Поддерживает оба синтаксиса, отличная TypeScript-интеграция, используется в MUI. Хороший выбор для больших приложений, где важен DX.',
                },
              ],
            },
            {
              id: 'card-151',
              title: 'Stitches',
              blocks: [
                {
                  id: 'text-152',
                  type: 'prose',
                  markdown:
                    'Идеален для дизайн-систем с предсказуемыми вариантами стилей. Система вариантов + compound variants даёт отличную типизацию и читаемость. Менее подходит, если много произвольных runtime-вычислений.',
                },
              ],
            },
            {
              id: 'card-153',
              title: 'Vanilla Extract',
              blocks: [
                {
                  id: 'text-154',
                  type: 'prose',
                  markdown:
                    'Выбор для проектов, где производительность критична: zero-runtime, статический CSS, полная TypeScript-типизация включая токены темы. Требует предопределить все варианты заранее — не подойдёт для сильно динамичных интерфейсов.',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-155',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-156',
              type: 'prose',
              markdown: '**Практическое правило для новых проектов (2024–2025):**',
            },
            {
              id: 'text-157',
              type: 'prose',
              markdown:
                '- Небольшой проект — Goober или встроенные решения фреймворка\n- Средний проект с динамикой — Emotion или Stitches\n- Большой проект / дизайн-система — Vanilla Extract + TypeScript\n- Начать с CSS Modules и переходить на CSS-in-JS только по мере роста сложности',
            },
          ],
        },
      ],
    },
    {
      id: 'optimization',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'text-158',
          type: 'prose',
          markdown:
            'Если вы выбрали runtime CSS-in-JS и столкнулись с проблемами производительности, есть несколько эффективных техник:',
        },
        {
          id: 'cards-159',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-160',
              title: '🚀 Техники оптимизации',
              blocks: [
                {
                  id: 'text-161',
                  type: 'prose',
                  markdown:
                    '- **Мемоизация стилей** через useMemo — вычисляйте объект стилей только при изменении зависимостей, а не при каждом рендере\n- **Статическая экстракция** через babel-плагины — часть стилей вычисляется при сборке\n- **CSS-переменные** вместо динамических интерполяций — сокращают количество генерируемых классов\n- **SSR с критическими стилями** — вставляйте только нужные стили в HTML, остальное загружайте асинхронно',
                },
              ],
            },
            {
              id: 'card-162',
              title: '⚡ Измерение производительности',
              blocks: [
                {
                  id: 'text-163',
                  type: 'prose',
                  markdown:
                    '- **Bundle Analyzer** — оцените реальный размер CSS-in-JS библиотеки в бандле\n- **React DevTools Profiler** — найдите компоненты с лишними пересчётами стилей\n- **Chrome DevTools / Rendering** — отслеживайте paint и layout, вызванные динамическими стилями\n- **Web Vitals / CLS** — динамические стили могут вызывать layout shift при SSR',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'migration',
      title: 'Миграция на CSS-in-JS и между библиотеками',
      blocks: [
        {
          id: 'text-164',
          type: 'prose',
          markdown:
            'Миграция не должна быть всё-или-ничего. Правильная стратегия — постепенный переход, компонент за компонентом. Обе системы могут сосуществовать в одном проекте: старые компоненты на CSS Modules, новые на CSS-in-JS. Так снижается риск и упрощается code review.',
        },
        {
          id: 'table-165',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Откуда → Куда',
            },
            {
              id: 'column-2',
              label: 'Сложность',
            },
            {
              id: 'column-3',
              label: 'Основные изменения',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-166',
                    type: 'prose',
                    markdown: 'CSS → Styled Components / Emotion',
                  },
                ],
                [
                  {
                    id: 'text-167',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-168',
                    type: 'prose',
                    markdown: 'Перенос стилей в компоненты, замена классов на styled',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-169',
                    type: 'prose',
                    markdown: 'CSS Modules → CSS-in-JS',
                  },
                ],
                [
                  {
                    id: 'text-170',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-171',
                    type: 'prose',
                    markdown: 'Упразднение .module.css файлов, логика в компонентах',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-172',
                    type: 'prose',
                    markdown: 'Styled Components → Emotion',
                  },
                ],
                [
                  {
                    id: 'text-173',
                    type: 'prose',
                    markdown: 'Лёгкая',
                  },
                ],
                [
                  {
                    id: 'text-174',
                    type: 'prose',
                    markdown: 'Замена импортов, небольшие API-отличия',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-175',
                    type: 'prose',
                    markdown: 'Runtime → Vanilla Extract',
                  },
                ],
                [
                  {
                    id: 'text-176',
                    type: 'prose',
                    markdown: 'Сложная',
                  },
                ],
                [
                  {
                    id: 'text-177',
                    type: 'prose',
                    markdown: 'Новая архитектура, статические варианты вместо динамики',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'trends',
      title: 'Современные тренды',
      blocks: [
        {
          id: 'cards-178',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-179',
              title: '🔄 Zero-runtime',
              blocks: [
                {
                  id: 'text-180',
                  type: 'prose',
                  markdown:
                    'Главный тренд последних лет — отказ от runtime-вычислений в пользу compile-time. Vanilla Extract, Linaria, Compiled от Facebook, Tamagui для React Native — все они извлекают CSS на этапе сборки.',
                },
              ],
            },
            {
              id: 'card-181',
              title: '🎯 TypeScript-first',
              blocks: [
                {
                  id: 'text-182',
                  type: 'prose',
                  markdown:
                    'Полная типизация CSS-свойств и значений токенов темы становится стандартом. Vanilla Extract генерирует типы из конфигурации темы, исключая случайные опечатки в именах переменных и значениях.',
                },
              ],
            },
            {
              id: 'card-183',
              title: '⚡ Новые CSS-стандарты',
              blocks: [
                {
                  id: 'text-184',
                  type: 'prose',
                  markdown:
                    'CSS Houdini, Container Queries, CSS Layers и нативные CSS-переменные постепенно закрывают задачи, для которых раньше был нужен CSS-in-JS. Это меняет соотношение сил в пользу более простых решений.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-185',
          type: 'prose',
          markdown:
            '1. **В чём главное преимущество CSS-in-JS перед обычным CSS?**\n   \n   Автоматическая изоляция стилей и реактивность. Стили вычисляются на основе состояния компонента, не конфликтуют с другими компонентами и удаляются вместе с ним.\n2. **В чём разница между runtime и zero-runtime подходами?**\n   \n   Runtime (Styled Components, Emotion) генерируют CSS в браузере — гибко, но с накладными расходами. Zero-runtime (Vanilla Extract, Linaria) извлекают CSS при сборке — быстрее и меньше бандл, но все варианты стилей должны быть известны заранее.\n3. **Чем Styled Components отличается от Emotion?**\n   \n   Оба runtime, но Emotion легче (~20kb против ~40kb), поддерживает объектный синтаксис наряду со строковым, имеет лучшую TypeScript-интеграцию. Styled Components популярнее, больше сообщество и экосистема плагинов.\n4. **Как работает SSR с CSS-in-JS?**\n   \n   Стили собираются на сервере (например, ServerStyleSheet в Styled Components), вставляются в HTML как критические &lt;style&gt;-теги, затем гидратируются на клиенте. Это предотвращает FOUC и улучшает LCP.\n5. **Как оптимизировать производительность runtime CSS-in-JS?**\n   \n   Мемоизировать объекты стилей через useMemo, использовать CSS-переменные вместо динамических интерполяций, применять babel-плагины для статической экстракции, рассмотреть миграцию на zero-runtime если проблемы системные.\n6. **Когда не стоит использовать CSS-in-JS?**\n   \n   Для статических сайтов, email-шаблонов, проектов с жёсткими CSP, при критичной производительности на слабых устройствах или в командах без опыта JavaScript. В этих случаях CSS Modules или Tailwind — лучший выбор.',
        },
      ],
    },
    {
      id: 'summary',
      title: 'Заключение',
      blocks: [
        {
          id: 'text-186',
          type: 'prose',
          markdown:
            'CSS-in-JS — мощный инструмент, хорошо решающий реальные проблемы больших компонентных приложений: изоляцию стилей, тематизацию, динамичность и коллокацию кода. Но он не является серебряной пулей.',
        },
        {
          id: 'text-187',
          type: 'prose',
          markdown:
            'Ключевое решение — runtime против pre-compile — определяет большинство характеристик проекта. Runtime даёт свободу и скорость разработки, pre-compile — производительность и типизацию. Гибридный подход с CSS-переменными часто оказывается оптимальным компромиссом. Для статических сайтов и простых проектов традиционные подходы по-прежнему предпочтительнее.',
        },
        {
          id: 'resources-188',
          type: 'resources',
          items: [
            {
              id: 'link-189',
              label: 'Styled Components',
              url: 'https://styled-components.com/',
            },
          ],
        },
        {
          id: 'resources-190',
          type: 'resources',
          items: [
            {
              id: 'link-191',
              label: 'Emotion',
              url: 'https://emotion.sh/',
            },
          ],
        },
        {
          id: 'resources-192',
          type: 'resources',
          items: [
            {
              id: 'link-193',
              label: 'Stitches',
              url: 'https://stitches.dev/',
            },
          ],
        },
        {
          id: 'resources-194',
          type: 'resources',
          items: [
            {
              id: 'link-195',
              label: 'Vanilla Extract',
              url: 'https://vanilla-extract.style/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
