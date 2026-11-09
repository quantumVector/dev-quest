import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-render-optimization-advanced-problemsnippet.txt?raw'
import example2 from '../snippets/react/react-render-optimization-advanced-memobasicssnippet.txt?raw'
import example3 from '../snippets/react/react-render-optimization-advanced-memocustomcomparesnippet.txt?raw'
import example4 from '../snippets/react/react-render-optimization-advanced-usememobasicssnippet.txt?raw'
import example5 from '../snippets/react/react-render-optimization-advanced-usecallbackbasicssnippet.txt?raw'
import example6 from '../snippets/react/react-render-optimization-advanced-usememovsusecallbacksnippet.txt?raw'
import example7 from '../snippets/react/react-render-optimization-advanced-complexexamplesnippet.txt?raw'
import example8 from '../snippets/react/react-render-optimization-advanced-commonmistakessnippet.txt?raw'
import example9 from '../snippets/react/react-render-optimization-advanced-performancetoolssnippet.txt?raw'
import example10 from '../snippets/react/react-render-optimization-advanced-virtuallistsnippet.txt?raw'
import example11 from '../snippets/react/react-render-optimization-advanced-codespllittingsnippet.txt?raw'

// Content copied verbatim from src/views/react/RenderOptimizationAdvanced.vue.
export default {
  ...articleSummaries.reactRenderOptimizationAdvanced,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Оптимизация рендеринга** — критически важный навык в React\\-разработке. React по умолчанию ре\\-рендерит компоненты при изменении состояния или пропсов родителя. Понимание **React.memo**, **useMemo** и **useCallback** помогает избежать избыточных рендеров и улучшить производительность приложения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Проблема: Избыточные рендеры',
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
                '**Проблема:** React ре\\-рендерит все дочерние компоненты при изменении состояния родителя, даже если их пропсы не изменились!',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Инструменты оптимизации',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'React.memo',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    'Мемоизирует компонент целиком. Пропускает рендер, если пропсы не изменились',
                },
                {
                  id: 'tags-9',
                  type: 'tags',
                  items: ['Компоненты'],
                },
              ],
            },
            {
              id: 'card-10',
              blocks: [
                {
                  id: 'heading-11',
                  type: 'heading',
                  level: 3,
                  text: 'useMemo',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    'Мемоизирует результат вычислений. Пересчитывает только при изменении зависимостей',
                },
                {
                  id: 'tags-13',
                  type: 'tags',
                  items: ['Значения'],
                },
              ],
            },
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: 'useCallback',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    'Мемоизирует функции. Возвращает ту же ссылку, если зависимости не изменились',
                },
                {
                  id: 'tags-17',
                  type: 'tags',
                  items: ['Функции'],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: '1. React.memo — мемоизация компонентов',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            '`React.memo` — это HOC (Higher\\-Order Component), который оборачивает компонент и предотвращает его рендер, если пропсы не изменились (shallow comparison).',
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
        {
          id: 'heading-20',
          type: 'heading',
          level: 3,
          text: 'Кастомная функция сравнения',
        },
        {
          id: 'text-21',
          type: 'prose',
          markdown: 'Можно передать вторым аргументом функцию для кастомного сравнения пропсов:',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: '2. useMemo — мемоизация вычислений',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            '`useMemo` кэширует результат дорогостоящих вычислений и пересчитывает только при изменении зависимостей.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: '3. useCallback — мемоизация функций',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            '`useCallback` сохраняет ссылку на функцию между рендерами. Критически важно для передачи коллбэков в мемоизированные дочерние компоненты.',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'useMemo vs useCallback',
      blocks: [
        {
          id: 'table-27',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'useMemo',
            },
            {
              id: 'column-3',
              label: 'useCallback',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Что мемоизирует**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Результат вычислений',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Саму функцию',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '**Возвращает**',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Любое значение',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Функцию',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Тяжелые вычисления, объекты, массивы',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Коллбэки для дочерних компонентов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Эквивалентность**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'useCallback(fn, deps) === useMemo(() =&gt; fn, deps)',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Комплексный пример',
      blocks: [
        {
          id: 'text-41',
          type: 'prose',
          markdown:
            'Реальный пример приложения с правильным использованием всех техник оптимизации:',
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: '❌ Частые ошибки',
      blocks: [
        {
          id: 'callout-43',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-44',
              type: 'prose',
              markdown:
                '**Внимание:** Неправильное использование мемоизации может не дать эффекта или даже ухудшить производительность!',
            },
          ],
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда использовать оптимизации?',
      blocks: [
        {
          id: 'cards-46',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: '✅ Использовать',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- Тяжелые вычисления в useMemo\n- Большие списки с memo\n- Коллбэки для мемоизированных компонентов\n- Объекты/массивы в зависимостях useEffect\n- Компоненты, которые рендерятся часто\n- Данные для графиков и визуализаций',
                },
              ],
            },
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 3,
                  text: '❌ Не использовать',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Простые вычисления (сложение, конкатенация)\n- Маленькие компоненты без детей\n- Компоненты, которые рендерятся редко\n- Преждевременная оптимизация\n- Везде "на всякий случай"\n- Без измерения производительности',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Инструменты профилирования',
      blocks: [
        {
          id: 'code-53',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Виртуализация списков',
      blocks: [
        {
          id: 'text-54',
          type: 'prose',
          markdown:
            'Для работы с большими списками (1000\\+ элементов) используйте виртуализацию — рендер только видимых элементов:',
        },
        {
          id: 'code-55',
          type: 'code',
          language: 'jsx',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Code Splitting и Lazy Loading',
      blocks: [
        {
          id: 'text-56',
          type: 'prose',
          markdown: 'Разделение кода и отложенная загрузка компонентов уменьшают начальный bundle:',
        },
        {
          id: 'code-57',
          type: 'code',
          language: 'jsx',
          code: example11,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Правило оптимизации',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-59',
              title: 'Порядок действий:',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '1. **Измерить** — используйте React DevTools Profiler\n2. **Найти bottleneck** — определите медленные компоненты\n3. **Оптимизировать** — примените memo/useMemo/useCallback\n4. **Проверить** — убедитесь, что стало быстрее\n5. **Не переоптимизировать** — помните о trade\\-offs',
                },
                {
                  id: 'callout-61',
                  type: 'callout',
                  tone: 'warning',
                  blocks: [
                    {
                      id: 'text-62',
                      type: 'prose',
                      markdown:
                        '**Premature optimization is the root of all evil!** — Donald Knuth',
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
      id: 'section-14',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-63',
          type: 'prose',
          markdown:
            '1. **В чем разница между React.memo и useMemo?**\n   \n   `React.memo` мемоизирует весь компонент (пропускает рендер). `useMemo` мемоизирует результат вычислений внутри компонента. React.memo — для компонентов, useMemo — для значений.\n2. **Почему useCallback важен для React.memo?**\n   \n   Без useCallback функция создается заново при каждом рендере. React.memo видит новую ссылку и считает, что пропс изменился → ре\\-рендер. useCallback сохраняет ссылку → memo работает корректно.\n3. **Когда НЕ нужно использовать memo?**\n   \n   Для простых компонентов без детей, компонентов которые всегда получают новые пропсы, листовых компонентов без логики. Memo добавляет overhead на сравнение пропсов.\n4. **Что такое referential equality в контексте React?**\n   \n   React сравнивает пропсы по ссылке (===), а не по значению. Объекты {a:1} и {a:1} — разные ссылки. Поэтому нужны useMemo/useCallback для стабильных ссылок.\n5. **Как работает shallow comparison в React.memo?**\n   \n   React.memo сравнивает пропсы поверхностно: для примитивов по значению, для объектов/массивов/функций по ссылке. Если нужно глубокое сравнение — передать кастомную функцию вторым аргументом.\n6. **В чем разница между useMemo и простой переменной?**\n   \n   Переменная пересчитывается при каждом рендере. useMemo — только при изменении зависимостей. Для дорогих вычислений useMemo экономит время, для простых — добавляет overhead.',
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Чек-лист оптимизации',
      blocks: [
        {
          id: 'cards-64',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-65',
              title: '🎯 Компоненты',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- React.memo для медленных компонентов\n- Проверить, что пропсы стабильны\n- Разделить большие компоненты\n- Использовать key правильно\n- Lazy loading для роутов',
                },
              ],
            },
            {
              id: 'card-67',
              title: '💾 Данные',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- useMemo для тяжелых вычислений\n- Виртуализация больших списков\n- Нормализация данных в Redux\n- Правильные зависимости\n- Избегать глубокого вложения',
                },
              ],
            },
            {
              id: 'card-69',
              title: '🔧 Функции',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- useCallback для коллбэков\n- Функциональные обновления setState\n- Избегать inline функций в JSX\n- Стабильные ссылки на объекты\n- Debounce/throttle для событий',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Итог',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '**Оптимизация рендеринга в React** основывается на трех китах: **React.memo** (мемоизация компонентов), **useMemo** (мемоизация вычислений) и **useCallback** (мемоизация функций). Ключевые принципы: измерять перед оптимизацией, понимать referential equality, использовать стабильные ссылки, применять виртуализацию для больших списков и code splitting для уменьшения bundle size. Помните: преждевременная оптимизация — корень всех зол. Сначала профилируйте, затем оптимизируйте!',
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'React.memo',
              url: 'https://react.dev/reference/react/memo',
            },
          ],
        },
        {
          id: 'resources-74',
          type: 'resources',
          items: [
            {
              id: 'link-75',
              label: 'useMemo',
              url: 'https://react.dev/reference/react/useMemo',
            },
          ],
        },
        {
          id: 'resources-76',
          type: 'resources',
          items: [
            {
              id: 'link-77',
              label: 'useCallback',
              url: 'https://react.dev/reference/react/useCallback',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
