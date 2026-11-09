import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-events-basiceventssnippet.txt?raw'
import example2 from '../snippets/react/react-events-syntheticeventsnippet.txt?raw'
import example3 from '../snippets/react/react-events-syntheticvsnativesnippet.txt?raw'
import example4 from '../snippets/react/react-events-eventdelegationsnippet.txt?raw'
import example5 from '../snippets/react/react-events-eventhandlingpatternssnippet.txt?raw'
import example6 from '../snippets/react/react-events-performancesnippet.txt?raw'

// Content copied verbatim from src/views/react/ReactEvents.vue.
export default {
  ...articleSummaries.reactEvents,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**React использует собственную систему событий**, построенную поверх нативных DOM событий. Вместо прямой работы с нативными событиями, React предоставляет **SyntheticEvent** — кроссбраузерную обертку, которая нормализует API событий и использует делегирование для оптимизации производительности.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы обработки событий в React',
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
                  text: 'Синтаксис',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **camelCase** — onClick, onChange, onSubmit\n- **Функции**, а не строки\n- **preventDefault()** — явно\n- **stopPropagation()** — явно\n- **Параметры** — через arrow function',
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
                  text: 'Особенности',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **SyntheticEvent** — не нативные события\n- **Делегирование** — на корневом элементе\n- **Пулинг** — в React &lt; 17\n- **Кроссбраузерность** — единый API\n- **Производительность** — оптимизация',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Что такое SyntheticEvent?',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**SyntheticEvent** — это кроссбраузерная обертка React вокруг нативного события. Она имеет тот же интерфейс, что и нативное событие (stopPropagation(), preventDefault()), но работает одинаково во всех браузерах.',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'SyntheticEvent vs Native Event — ключевые различия',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-14',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'SyntheticEvent (React)',
            },
            {
              id: 'column-3',
              label: 'Native Event (DOM)',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Кроссбраузерность**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Единый API для всех браузеров',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '❌ Различия между браузерами',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '✅ Делегирование, меньше слушателей',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '⚠️ Слушатель на каждом элементе',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Пулинг событий**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'React &lt; 17: Да, React 17\\+: Нет',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '✅ Нет пулинга',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Асинхронное использование**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'React &lt; 17: persist(), React 17\\+: ✅',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '✅ Всегда работает',
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
                    markdown: '**Место делегирования**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'React &lt; 17: document, React 17\\+: root',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'На самом элементе',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Доступ к нативному**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'event.nativeEvent',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Само событие',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Capturing фаза**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'onClickCapture',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'addEventListener(..., true)',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Bubbling фаза**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'onClick (по умолчанию)',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'addEventListener(..., false)',
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
      title: 'Делегирование событий в React',
      blocks: [
        {
          id: 'callout-39',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-40',
              type: 'prose',
              markdown:
                '**Производительность:** React использует делегирование событий — вместо добавления слушателей на каждый элемент, React добавляет ОДИН слушатель на корневой элемент и обрабатывает все события там.',
            },
          ],
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Изменения в React 17',
      blocks: [
        {
          id: 'cards-42',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-43',
              blocks: [
                {
                  id: 'heading-44',
                  type: 'heading',
                  level: 3,
                  text: 'React < 17',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- **Пулинг событий** — нужен persist()\n- **Делегирование на document**\n- **Проблемы** с множественными React apps\n- **Асинхронное использование** — сложности',
                },
              ],
            },
            {
              id: 'card-46',
              blocks: [
                {
                  id: 'heading-47',
                  type: 'heading',
                  level: 3,
                  text: 'React 17+',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- **Без пулинга** — проще использовать\n- **Делегирование на root** контейнер\n- **Множественные apps** работают корректно\n- **Асинхронное использование** — без проблем',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Паттерны обработки событий',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Производительность обработки событий',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Типы событий в React',
      blocks: [
        {
          id: 'cards-51',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-52',
              title: 'Мышь и указатель',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- onClick\n- onDoubleClick\n- onMouseDown/Up\n- onMouseEnter/Leave\n- onMouseMove\n- onContextMenu\n- onPointerDown/Up/Move',
                },
              ],
            },
            {
              id: 'card-54',
              title: 'Клавиатура и фокус',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: '- onKeyDown/Up/Press\n- onFocus\n- onBlur\n- onFocusIn/Out',
                },
              ],
            },
            {
              id: 'card-56',
              title: 'Формы',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '- onChange\n- onInput\n- onSubmit\n- onReset\n- onInvalid',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'Сенсорные экраны',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: '- onTouchStart\n- onTouchMove\n- onTouchEnd\n- onTouchCancel',
                },
              ],
            },
            {
              id: 'card-60',
              title: 'UI события',
              blocks: [
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown: '- onScroll\n- onWheel\n- onResize\n- onLoad\n- onError',
                },
              ],
            },
            {
              id: 'card-62',
              title: 'Drag & Drop',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- onDrag\n- onDragStart/End\n- onDragEnter/Leave\n- onDragOver\n- onDrop',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-64',
          type: 'prose',
          markdown:
            '1. **В чем разница между SyntheticEvent и нативным событием?**\n   \n   **SyntheticEvent** — это кроссбраузерная обертка React вокруг нативного события. Она нормализует API, обеспечивая одинаковое поведение во всех браузерах, использует делегирование для производительности и в React &lt; 17 использовала пулинг событий. **Нативное событие** доступно через `event.nativeEvent`.\n2. **Как работает делегирование событий в React?**\n   \n   React не добавляет слушатели событий на каждый элемент. Вместо этого React добавляет ОДИН слушатель на корневой элемент (document в React &lt; 17, root контейнер в React 17\\+) и обрабатывает все события там, используя фазу всплытия. Это значительно улучшает производительность при большом количестве элементов.\n3. **Что такое event pooling и почему его убрали?**\n   \n   В React &lt; 17 объекты SyntheticEvent переиспользовались (pooling) для производительности. После вызова обработчика, все свойства события обнулялись. Это ломало асинхронное использование событий (setTimeout, промисы). Решение — `event.persist()`. В React 17\\+ пулинг убрали — события работают асинхронно без проблем.\n4. **Почему обработчики событий пишутся в camelCase?**\n   \n   Это соглашение React для согласованности с JavaScript. В HTML события в lowercase (onclick), но в React это JavaScript свойства, поэтому используется camelCase (onClick, onChange, onSubmit). Это делает код более предсказуемым и согласованным.\n5. **Как передать параметры в обработчик события?**\n   \n   Два основных способа: **1)** Arrow function: `onClick={(e) => handler(id, e)}` — создает новую функцию при каждом рендере. **2)** Bind: `onClick={handler.bind(null, id)}` — тоже создает новую функцию. Для оптимизации используйте useCallback с функциональным обновлением состояния.\n6. **Что изменилось в делегировании событий в React 17?**\n   \n   В React &lt; 17 события делегировались на `document`, что создавало проблемы при использовании нескольких React приложений на одной странице. В React 17\\+ события делегируются на корневой DOM контейнер (`ReactDOM.createRoot()`), что решает проблему изоляции между приложениями.\n7. **Как работает onClickCapture?**\n   \n   `onClickCapture` — это capturing фаза события (погружение от корня к цели). Обычный `onClick` работает в bubbling фазе (всплытие от цели к корню). Суффикс `Capture` можно добавить к любому событию. Порядок вызова: Capture обработчики → Target обработчики → Bubble обработчики.\n8. **Когда использовать useCallback для обработчиков?**\n   \n   useCallback нужен когда: **1)** Передаете обработчик в React.memo компонент — без useCallback компонент будет перерендериваться. **2)** Обработчик в зависимостях useEffect/useMemo. **3)** Оптимизация производительности в больших списках. Для простых случаев useCallback может быть избыточным.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-65',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Использовать camelCase для событий\n- Выносить обработчики из JSX\n- Использовать useCallback для оптимизации\n- Явно вызывать preventDefault()\n- Очищать слушатели в useEffect\n- Делегировать события для списков',
                },
              ],
            },
            {
              id: 'card-69',
              blocks: [
                {
                  id: 'heading-70',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Inline функции в map() без необходимости\n- Забывать про event.persist() (React &lt; 17)\n- Множество слушателей на window/document\n- Смешивание React и нативных событий\n- Забывать очищать слушатели\n- Использовать string вместо функций',
                },
              ],
            },
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Изучите типы событий в TypeScript\n- Используйте React DevTools для отладки\n- Профилируйте обработчики событий\n- Понимайте разницу версий React\n- Используйте пассивные слушатели\n- Тестируйте асинхронные обработчики',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-75',
          type: 'prose',
          markdown:
            '**React использует SyntheticEvent** — кроссбраузерную обертку вокруг нативных событий, которая обеспечивает единый API и оптимизирует производительность через делегирование. **Ключевые отличия от нативных событий:** кроссбраузерность, делегирование на корневом элементе, пулинг в React &lt; 17 (убран в 17\\+), изменение места делегирования с document на root контейнер в React 17\\+. Понимание этих концепций критически важно для эффективной работы с событиями в React и успешного прохождения собеседования.',
        },
        {
          id: 'resources-76',
          type: 'resources',
          items: [
            {
              id: 'link-77',
              label: 'React Docs: Events',
              url: 'https://react.dev/learn/responding-to-events',
            },
          ],
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'SyntheticEvent Reference',
              url: 'https://legacy.reactjs.org/docs/events.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
