import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-resize-observer-basicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-resize-observer-multipleelementssnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-resize-observer-boxmodelssnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-resize-observer-practicalexamplessnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-resize-observer-performancesnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-resize-observer-reactexamplesnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-resize-observer-vueexamplesnippet.txt?raw'
import example8 from '../snippets/web-api/web-api-resize-observer-comparisonsnippet.txt?raw'

// Content copied verbatim from src/views/web-api/ResizeObserverInfo.vue.
export default {
  ...articleSummaries.webApiResizeObserverInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**ResizeObserver** — современный Web API для отслеживания изменений размеров DOM элементов. В отличие от `window.resize`, который отслеживает только размер окна браузера, ResizeObserver позволяет следить за изменениями размеров конкретных элементов, включая изменения из\\-за CSS, добавления контента, или изменения размеров родительских контейнеров.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые преимущества ResizeObserver',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'Что ResizeObserver может',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- Отслеживать размеры конкретных элементов\n- Реагировать на CSS изменения (transitions, animations)\n- Работать с динамическим контентом\n- Наблюдать за несколькими элементами одновременно\n- Эффективная батчинг\\-обработка изменений\n- Поддержка разных box models',
                },
              ],
            },
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'Чем отличается от window.resize',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **window.resize** — только размер окна\n- **ResizeObserver** — размер элементов\n- Не требует перерасчета getBoundingClientRect\n- Автоматический debounce браузером\n- Работает с элементами внутри скролла\n- Container Queries альтернатива в JS',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы работы с ResizeObserver',
      blocks: [
        {
          id: 'callout-9',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-10',
              type: 'prose',
              markdown:
                '**ResizeObserverEntry** содержит детальную информацию: `target` (элемент), `contentRect` (размеры), `borderBoxSize`, `contentBoxSize`, `devicePixelContentBoxSize`',
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Отслеживание нескольких элементов',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                "**Эффективность:** Один ResizeObserver может наблюдать за множеством элементов. Браузер оптимизирует вызовы callback'а, батчируя изменения.",
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Box Models — режимы измерения',
      blocks: [
        {
          id: 'cards-15',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-16',
              blocks: [
                {
                  id: 'heading-17',
                  type: 'heading',
                  level: 3,
                  text: 'content-box',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown: 'Размер контента без padding и border (по умолчанию)',
                },
              ],
            },
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'heading-20',
                  type: 'heading',
                  level: 3,
                  text: 'border-box',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: 'Размер включая padding и border',
                },
              ],
            },
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'device-pixel-content-box',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: 'Размер в device pixels (для Retina, canvas)',
                },
              ],
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'callout-27',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-28',
              type: 'prose',
              markdown:
                '**Важно:** ResizeObserver callback может вызываться очень часто. Используйте debounce, throttle или requestAnimationFrame для тяжелых операций.',
            },
          ],
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Интеграция с React',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Интеграция с Vue',
      blocks: [
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение с другими подходами',
      blocks: [
        {
          id: 'table-32',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Что отслеживает',
            },
            {
              id: 'column-3',
              label: 'Производительность',
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
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`window.resize`',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Только размер окна',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Адаптивность на уровне viewport',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`ResizeObserver`',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Размер конкретных элементов',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Container queries, компоненты',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '`MutationObserver`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Изменения DOM структуры',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Добавление/удаление элементов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`IntersectionObserver`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Видимость элементов',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Lazy loading, infinite scroll',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Polling (setInterval)',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Что угодно',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Плохая',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '❌ Не рекомендуется',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-53',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Поддержка браузеров',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: '✅ Поддерживается',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Chrome 64\\+ (2018)\n- Firefox 69\\+ (2019)\n- Safari 13.1\\+ (2020)\n- Edge 79\\+ (2020)\n- Opera 51\\+ (2018)',
                },
              ],
            },
            {
              id: 'card-57',
              title: '⚠️ Полифил',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: 'Для старых браузеров используйте полифил:',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: '`  npm install resize-observer-polyfill  `',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    'Современные браузеры имеют нативную поддержку, полифил автоматически не загружается если API доступен.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-61',
          type: 'prose',
          markdown:
            "1. **Что такое ResizeObserver и для чего он используется?**\n   \n   ResizeObserver — Web API для отслеживания изменений размеров DOM элементов. Используется для реализации адаптивных компонентов, container queries, динамических grid layouts, canvas с правильным разрешением для Retina, виртуализации списков и других задач, где нужно реагировать на изменение размеров элементов, а не только окна браузера.\n2. **Как отслеживать изменения размеров нескольких элементов?**\n   \n   Один ResizeObserver может наблюдать за множеством элементов. Вызовите `observe()` для каждого элемента. В callback придет массив всех изменившихся элементов. Для управления можно использовать Map для хранения индивидуальных callback'ов или классы\\-обертки.\n3. **В чем разница между contentRect и borderBoxSize?**\n   \n   `contentRect` — размеры content\\-box (без padding). `borderBoxSize` — размеры border\\-box (включая padding и border). `devicePixelContentBoxSize` — размеры в device pixels для canvas и Retina дисплеев. Выбор зависит от задачи.\n4. **Как оптимизировать производительность ResizeObserver?**\n   \n   Используйте debounce/throttle для тяжелых операций, requestAnimationFrame для обновлений DOM, батчинг изменений, условное наблюдение (активация только когда нужно), отложенную инициализацию через requestIdleCallback.\n5. **Когда использовать ResizeObserver вместо window.resize?**\n   \n   Используйте ResizeObserver когда нужно отслеживать размеры конкретных элементов (компоненты, контейнеры), а не всего viewport. ResizeObserver реагирует на CSS изменения, добавление контента, изменение размеров родителей — случаи, где window.resize не сработает.\n6. **Как интегрировать ResizeObserver с React/Vue?**\n   \n   В React — через хуки `useEffect` и `useRef`, создавая кастомные хуки типа `useResizeObserver` или `useElementSize`. В Vue — через composables с `onMounted`/`onUnmounted` или кастомные директивы вроде `v-resize`.\n7. **Есть ли альтернативы ResizeObserver?**\n   \n   CSS Container Queries (современный стандарт), polling через setInterval (неэффективно), matchMedia для viewport (только окно), getBoundingClientRect в RAF (вызывает reflow). ResizeObserver — лучший выбор для отслеживания размеров элементов.",
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Типичные сценарии использования',
      blocks: [
        {
          id: 'cards-62',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-63',
              title: 'Адаптивные компоненты',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Container Queries альтернатива\n- Адаптивные карточки\n- Responsive typography\n- Динамические grid layouts\n- Sidebar с изменяемой шириной',
                },
              ],
            },
            {
              id: 'card-65',
              title: 'Canvas и графика',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Canvas с правильным DPI для Retina\n- WebGL viewport обновление\n- SVG масштабирование\n- Графики и charts\n- Редакторы изображений',
                },
              ],
            },
            {
              id: 'card-67',
              title: 'UI/UX оптимизация',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Tooltip позиционирование\n- Dropdown меню\n- Modal dialogs\n- Виртуализация списков\n- Sticky headers',
                },
              ],
            },
            {
              id: 'card-69',
              title: 'Динамический контент',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Textarea с авто\\-высотой\n- WYSIWYG редакторы\n- Chat интерфейсы\n- Accordion компоненты\n- Tabs с динамическим контентом',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-71',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Освобождать observer через disconnect()\n- Использовать debounce для тяжелых операций\n- Один observer для нескольких элементов\n- Правильно выбирать box model\n- Тестировать на разных размерах\n- Мониторить производительность',
                },
              ],
            },
            {
              id: 'card-75',
              blocks: [
                {
                  id: 'heading-76',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Тяжелые синхронные операции в callback\n- Забывать disconnect() при размонтировании\n- Создавать observer для каждого элемента\n- Изменять размеры элементов в callback\n- Игнорировать производительность\n- Использовать для non\\-visual элементов',
                },
              ],
            },
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Callback может вызываться очень часто\n- Изменение размеров в callback → infinite loop\n- contentRect ≠ borderBoxSize\n- Не все box models доступны везде\n- Полифил для старых браузеров\n- Может не сработать для display:none',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-81',
          type: 'prose',
          markdown:
            '**ResizeObserver** — мощный инструмент для создания адаптивных интерфейсов на уровне компонентов. Он позволяет отслеживать изменения размеров конкретных элементов эффективнее, чем `window.resize` или polling. Один observer может наблюдать за множеством элементов, браузер автоматически оптимизирует вызовы через батчинг. Поддерживает разные box models для различных задач (content\\-box, border\\-box, device\\-pixel\\-content\\-box). Критически важен для реализации Container Queries, адаптивных компонентов, canvas с правильным DPI и виртуализации.',
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'MDN ResizeObserver',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver',
            },
          ],
        },
        {
          id: 'resources-84',
          type: 'resources',
          items: [
            {
              id: 'link-85',
              label: 'Web.dev Guide',
              url: 'https://web.dev/resize-observer/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
