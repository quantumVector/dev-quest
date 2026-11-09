import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-virtual-dom-realdomsnippet.txt?raw'
import example2 from '../snippets/react/react-virtual-dom-virtualdomconceptsnippet.txt?raw'
import example3 from '../snippets/react/react-virtual-dom-reactcreateelementsnippet.txt?raw'
import example4 from '../snippets/react/react-virtual-dom-diffingalgorithmsnippet.txt?raw'
import example5 from '../snippets/react/react-virtual-dom-reconciliationsnippet.txt?raw'
import example6 from '../snippets/react/react-virtual-dom-fiberarchitecturesnippet.txt?raw'
import example7 from '../snippets/react/react-virtual-dom-performancecomparisonsnippet.txt?raw'
import example8 from '../snippets/react/react-virtual-dom-batchingsnippet.txt?raw'
import example9 from '../snippets/react/react-virtual-dom-keysimportancesnippet.txt?raw'
import example10 from '../snippets/react/react-virtual-dom-limitationssnippet.txt?raw'
import example11 from '../snippets/react/react-virtual-dom-alternativessnippet.txt?raw'

// Content copied verbatim from src/views/react/VirtualDOM.vue.
export default {
  ...articleSummaries.reactVirtualDOM,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Virtual DOM (виртуальный DOM)** — это программная концепция, где идеальное, "виртуальное" представление пользовательского интерфейса хранится в памяти и синхронизируется с реальным DOM через процесс reconciliation. Это ключевая технология, позволяющая React эффективно обновлять UI без прямых манипуляций с DOM.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Проблема: медленный реальный DOM',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Основная проблема:** Прямые манипуляции с DOM медленны из\\-за reflow (пересчет layout) и repaint (перерисовка) операций. Каждое изменение может вызывать каскад дорогих операций.',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Что такое Virtual DOM?',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'Концепция',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **JavaScript объект** — легковесное представление\n- **Дерево компонентов** — иерархическая структура\n- **В памяти** — никаких DOM операций\n- **Быстрое создание** — обычные объекты JS\n- **Быстрое сравнение** — алгоритм diff',
                },
              ],
            },
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Батчинг обновлений** — одна операция вместо многих\n- **Минимальные изменения** — только что изменилось\n- **Декларативность** — описываем "что", не "как"\n- **Кроссплатформенность** — не только браузер\n- **Предсказуемость** — упрощает отладку',
                },
              ],
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Как React создает Virtual DOM',
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
      title: 'Процесс работы Virtual DOM в React',
      blocks: [
        {
          id: 'steps-14',
          type: 'steps',
          mode: 'sequence',
          showTitle: false,
          items: [
            {
              id: 'step-15',
              title: 'Render',
              blocks: [],
            },
            {
              id: 'step-16',
              title: 'Diffing',
              blocks: [],
            },
            {
              id: 'step-17',
              title: 'Reconciliation',
              blocks: [],
            },
            {
              id: 'step-18',
              title: 'Commit',
              blocks: [],
            },
          ],
        },
        {
          id: 'cards-19',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: '1. Render',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown: 'React вызывает функцию компонента и создает новое Virtual DOM дерево',
                },
              ],
            },
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: '2. Diffing',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: 'Сравнение нового Virtual DOM со старым деревом, поиск различий',
                },
              ],
            },
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: '3. Reconciliation',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: 'Вычисление минимального набора операций для обновления реального DOM',
                },
              ],
            },
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: '4. Commit',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Применение изменений к реальному DOM одним батчем',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Алгоритм Diffing — сердце Virtual DOM',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Правила Diffing алгоритма',
      blocks: [
        {
          id: 'table-33',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Правило',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Разные типы элементов**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Полная замена поддерева',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '&lt;div&gt; → &lt;span&gt; = полная пересборка',
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
                    markdown: '**Одинаковый тип**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Обновление только props',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '&lt;div className="old"&gt; → className="new"',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Сравнение children**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Рекурсивное сравнение детей',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Проход по массиву children',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**Key для списков**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Оптимизация через идентификаторы',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'key={item.id} вместо key={index}',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**Компоненты одного типа**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Обновление instance, новые props',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '&lt;Component x={1}/&gt; → &lt;Component x={2}/&gt;',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Разные компоненты**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Размонтирование и монтирование',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '&lt;ComponentA/&gt; → &lt;ComponentB/&gt;',
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
      title: 'Reconciliation — применение изменений',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'React Fiber — современная архитектура',
      blocks: [
        {
          id: 'callout-53',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-54',
              type: 'prose',
              markdown:
                '**React Fiber (React 16\\+):** Это переработанный алгоритм reconciliation, который позволяет разбивать рендеринг на части, приостанавливать работу и возобновлять её, приоритизировать задачи. Fiber делает React более отзывчивым.',
            },
          ],
        },
        {
          id: 'code-55',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Ключевые особенности Fiber',
      blocks: [
        {
          id: 'cards-56',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-57',
              blocks: [
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 3,
                  text: 'Прерываемый рендеринг',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    'Работа может быть приостановлена и возобновлена позже, освобождая главный поток',
                },
              ],
            },
            {
              id: 'card-60',
              blocks: [
                {
                  id: 'heading-61',
                  type: 'heading',
                  level: 3,
                  text: 'Приоритеты задач',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    'Высокоприоритетные обновления (клики) прерывают низкоприоритетные (аналитика)',
                },
              ],
            },
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: 'Time Slicing',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    'Разбиение работы на временные слоты (~5ms), чтобы браузер оставался отзывчивым',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение производительности',
      blocks: [
        {
          id: 'code-66',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Батчинг обновлений — ключевая оптимизация',
      blocks: [
        {
          id: 'code-67',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Важность key для производительности',
      blocks: [
        {
          id: 'code-68',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Оптимизации React для Virtual DOM',
      blocks: [
        {
          id: 'table-69',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Оптимизация',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Когда использовать',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '`React.memo()`',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Мемоизация компонента, skip рендера при неизменных props',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Дорогие компоненты с редко меняющимися props',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '`useMemo()`',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Мемоизация результата вычисления',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Дорогие вычисления с зависимостями',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '`useCallback()`',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Мемоизация функции',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Функции в deps других хуков или props',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '`key` prop',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Помогает React идентифицировать элементы',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Списки динамических элементов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '`React.lazy()`',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Ленивая загрузка компонентов',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Большие компоненты, используемые редко',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Virtualization',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Рендер только видимых элементов списка',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Большие списки (1000\\+ элементов)',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Code Splitting',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Разделение бандла на части',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Маршруты, модальные окна',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Ограничения и мифы о Virtual DOM',
      blocks: [
        {
          id: 'code-91',
          type: 'code',
          language: 'jsx',
          code: example10,
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Альтернативные подходы к Virtual DOM',
      blocks: [
        {
          id: 'code-92',
          type: 'code',
          language: 'jsx',
          code: example11,
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-93',
          type: 'prose',
          markdown:
            '1. **Что такое Virtual DOM и зачем он нужен?**\n   \n   Virtual DOM — это легковесное представление реального DOM в памяти JavaScript. Он нужен для оптимизации: React создает новое Virtual DOM дерево при изменении состояния, сравнивает его со старым (diffing), вычисляет минимальные изменения и применяет их к реальному DOM одним батчем. Это быстрее множественных прямых манипуляций с DOM.\n2. **Как работает алгоритм diffing в React?**\n   \n   React сравнивает два Virtual DOM дерева уровень за уровнем. Основные правила: 1) Элементы разных типов заменяются полностью, 2) Элементы одного типа обновляют только props, 3) Дети сравниваются рекурсивно, 4) Key помогает идентифицировать элементы в списках. Алгоритм имеет сложность O(n) вместо O(n³) у общих алгоритмов.\n3. **Что такое reconciliation в React?**\n   \n   Reconciliation — это процесс синхронизации Virtual DOM с реальным DOM. После diffing React знает, что изменилось, и reconciliation применяет эти изменения: создает, обновляет или удаляет DOM узлы. В React 16\\+ используется Fiber архитектура, которая делает reconciliation прерываемым и приоритизируемым.\n4. **Всегда ли Virtual DOM быстрее прямой работы с DOM?**\n   \n   Нет! Хорошо оптимизированный императивный код с точечными обновлениями DOM может быть быстрее. Virtual DOM — это компромисс между производительностью и удобством разработки. Он обеспечивает хорошую производительность в большинстве случаев при декларативном подходе к UI.\n5. **Что такое React Fiber и чем он отличается от старого reconciler?**\n   \n   Fiber — это полная переработка reconciliation алгоритма (React 16\\+). Ключевые отличия: 1) Прерываемый рендеринг (можно приостановить и возобновить), 2) Приоритеты задач (срочные обновления прерывают несрочные), 3) Time slicing (работа разбита на слоты), 4) Улучшенная обработка ошибок, 5) Поддержка Concurrent Mode и Suspense.\n6. **Зачем нужен key в списках и почему нельзя использовать index?**\n   \n   Key помогает React идентифицировать, какие элементы изменились, добавились или удалились. Index как key плох при динамических списках: при удалении/перестановке элементов index меняется, React думает, что изменились другие элементы, теряется состояние и фокус. Используйте стабильный уникальный ID из данных.\n7. **Что такое батчинг обновлений в React?**\n   \n   Батчинг — это группировка нескольких setState вызовов в один рендер. React автоматически батчит обновления в event handlers. В React 18 батчинг работает везде: в async функциях, setTimeout, промисах. Это уменьшает количество рендеров и обновлений DOM, улучшая производительность.\n8. **Когда стоит использовать React.memo(), useMemo() и useCallback()?**\n   \n   **React.memo()** — для дорогих компонентов с редко меняющимися props. **useMemo()** — для дорогих вычислений, зависящих от конкретных переменных. **useCallback()** — для функций, передаваемых в deps или props мемоизированных компонентов. Не оптимизируйте преждевременно — используйте React DevTools Profiler для поиска узких мест.',
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Лучшие практики работы с Virtual DOM',
      blocks: [
        {
          id: 'cards-94',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-95',
              blocks: [
                {
                  id: 'heading-96',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Использовать key для динамических списков\n- Мемоизировать дорогие компоненты (React.memo)\n- Избегать создания новых объектов в render\n- Использовать Production build\n- Профилировать с React DevTools\n- Виртуализировать большие списки',
                },
              ],
            },
            {
              id: 'card-98',
              blocks: [
                {
                  id: 'heading-99',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Index как key в динамических списках\n- Мутации state напрямую\n- Преждевременной оптимизации (memo везде)\n- Inline функций в JSX без необходимости\n- Глубокой вложенности компонентов\n- Больших компонентов без разделения',
                },
              ],
            },
            {
              id: 'card-101',
              blocks: [
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Изучите React DevTools Profiler\n- Понимайте когда происходит рендер\n- Используйте Code Splitting\n- Lazy загружайте тяжелые компоненты\n- Следите за размером бандла\n- Читайте официальную документацию',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Итог',
      blocks: [
        {
          id: 'text-104',
          type: 'prose',
          markdown:
            '**Virtual DOM** — это ключевая технология React, обеспечивающая баланс между производительностью и удобством разработки. Через процессы **render → diffing → reconciliation → commit** React минимизирует дорогие операции с реальным DOM. **React Fiber** делает этот процесс прерываемым и приоритизируемым, обеспечивая отзывчивость UI. Понимание Virtual DOM критично для оптимизации React приложений и успешного прохождения собеседований на позицию React разработчика.',
        },
        {
          id: 'resources-105',
          type: 'resources',
          items: [
            {
              id: 'link-106',
              label: 'React: Reconciliation',
              url: 'https://react.dev/learn/preserving-and-resetting-state',
            },
          ],
        },
        {
          id: 'resources-107',
          type: 'resources',
          items: [
            {
              id: 'link-108',
              label: 'Fiber Architecture',
              url: 'https://github.com/acdlite/react-fiber-architecture',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
