import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-use-callback-badexamplesnippet.txt?raw'
import example2 from '../snippets/react/react-use-callback-goodexamplesnippet.txt?raw'
import example3 from '../snippets/react/react-use-callback-basicusagesnippet.txt?raw'
import example4 from '../snippets/react/react-use-callback-dependenciessnippet.txt?raw'
import example5 from '../snippets/react/react-use-callback-eventhandlerssnippet.txt?raw'
import example6 from '../snippets/react/react-use-callback-childcomponentssnippet.txt?raw'
import example7 from '../snippets/react/react-use-callback-effectssnippet.txt?raw'
import example8 from '../snippets/react/react-use-callback-debouncesnippet.txt?raw'
import example9 from '../snippets/react/react-use-callback-whentousesnippet.txt?raw'
import example10 from '../snippets/react/react-use-callback-performancesnippet.txt?raw'
import example11 from '../snippets/react/react-use-callback-commonmistakessnippet.txt?raw'

// Content copied verbatim from src/views/react/UseCallback.vue.
export default {
  ...articleSummaries.reactUseCallback,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**useCallback** — это React хук, который возвращает мемоизированную версию функции, которая изменяется только при изменении зависимостей. Основное назначение — предотвращение ненужных перерендеров дочерних компонентов и оптимизация производительности при работе с обработчиками событий.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Проблема: функции пересоздаются каждый рендер',
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
                '**Проблема:** При каждом рендере компонента создается новая функция с новой ссылкой, что ломает мемоизацию через React.memo!',
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
      title: '✅ Решение: useCallback сохраняет ссылку',
      blocks: [
        {
          id: 'callout-5',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-6',
              type: 'prose',
              markdown:
                '**Решение:** useCallback создает функцию один раз и возвращает ту же ссылку между рендерами, пока не изменятся зависимости.',
            },
          ],
        },
        {
          id: 'code-7',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Синтаксис и базовое использование',
      blocks: [
        {
          id: 'cards-8',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'Синтаксис',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: '`const memoizedCallback = useCallback(fn, deps)`',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    '- **fn** — функция для мемоизации\n- **deps** — массив зависимостей\n- **возвращает** — мемоизированную функцию',
                },
              ],
            },
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: 'Принцип работы',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- Сохраняет функцию между рендерами\n- Пересоздает только при изменении deps\n- Возвращает одну и ту же ссылку\n- Работает с React.memo',
                },
              ],
            },
          ],
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Зависимости в useCallback',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'useCallback с обработчиками событий',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Самый распространенный случай использования — обработчики событий в формах и интерактивных элементах.',
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'useCallback для дочерних компонентов',
      blocks: [
        {
          id: 'code-20',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'useCallback с useEffect',
      blocks: [
        {
          id: 'callout-21',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-22',
              type: 'prose',
              markdown:
                '**Важно:** Без useCallback функция в useEffect будет пересоздаваться каждый рендер, вызывая бесконечный цикл!',
            },
          ],
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'useCallback с debounce/throttle',
      blocks: [
        {
          id: 'code-24',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда использовать useCallback',
      blocks: [
        {
          id: 'cards-25',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-26',
              title: '✅ Нужен useCallback',
              blocks: [
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- Передача в React.memo компоненты\n- Зависимость в useEffect/useLayoutEffect\n- Зависимость в других хуках\n- Передача в сторонние библиотеки\n- Контекст для множества компонентов\n- Debounce/throttle функции\n- Оптимизация больших списков',
                },
              ],
            },
            {
              id: 'card-28',
              title: '❌ НЕ нужен useCallback',
              blocks: [
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown:
                    '- Простые обработчики событий\n- Функции без зависимостей в deps\n- Компоненты без мемоизации\n- Инлайн функции в JSX\n- Функции внутри useEffect\n- Однократно вызываемые функции\n- Преждевременная оптимизация',
                },
              ],
            },
          ],
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Влияние на производительность',
      blocks: [
        {
          id: 'code-31',
          type: 'code',
          language: 'jsx',
          code: example10,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые ошибки',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'jsx',
          code: example11,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'useCallback vs useMemo vs обычные функции',
      blocks: [
        {
          id: 'table-33',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Обычная функция',
            },
            {
              id: 'column-3',
              label: 'useCallback',
            },
            {
              id: 'column-4',
              label: 'useMemo',
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
                    markdown: '**Что возвращает**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Новую функцию каждый раз',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Мемоизированную функцию',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Мемоизированное значение',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '**Когда пересоздается**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Каждый рендер',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'При изменении deps',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'При изменении deps',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Простые обработчики',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Обработчики для memo',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Дорогие вычисления',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Быстрое создание',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Overhead мемоизации',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Overhead мемоизации',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Средняя (deps)',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Средняя (deps)',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-54',
          type: 'prose',
          markdown:
            '1. **Что такое useCallback и зачем он нужен?**\n   \n   useCallback — хук для мемоизации функций. Он возвращает одну и ту же ссылку на функцию между рендерами, пока не изменятся зависимости. Нужен для оптимизации: предотвращает ненужные перерендеры дочерних компонентов, обернутых в React.memo, и позволяет стабильно использовать функции в зависимостях useEffect.\n2. **В чем разница между useCallback и useMemo?**\n   \n   useCallback мемоизирует саму функцию: `useCallback(fn, deps)` ≈ `useMemo(() => fn, deps)`. useMemo мемоизирует результат вызова функции. useCallback для обработчиков событий, useMemo для дорогих вычислений.\n3. **Что будет, если забыть зависимости в useCallback?**\n   \n   Функция будет замкнута на старые значения переменных из замыкания. Например, если в зависимостях нет count, функция всегда будет видеть count как 0 (значение при первом рендере). ESLint правило react\\-hooks/exhaustive\\-deps предупреждает об этом.\n4. **Когда НЕ нужно использовать useCallback?**\n   \n   Когда функция не передается в мемоизированные компоненты или не используется в зависимостях других хуков. Для простых обработчиков событий в JSX обычная функция или инлайн стрелка работают отлично. useCallback имеет свой overhead — не стоит использовать его везде.\n5. **Как useCallback работает с React.memo?**\n   \n   React.memo сравнивает пропсы по ссылке. Без useCallback каждый рендер создает новую функцию → новая ссылка → React.memo считает, что пропс изменился → компонент перерендеривается. С useCallback функция стабильна → React.memo предотвращает рендер.\n6. **Можно ли использовать useCallback без зависимостей?**\n   \n   Да, пустой массив \\[\\] означает, что функция создается один раз и никогда не пересоздается. Но функция должна использовать только стабильные значения или функциональные обновления setState. Иначе она будет замкнута на начальные значения.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-55',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-56',
              blocks: [
                {
                  id: 'heading-57',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Использовать с React.memo компонентами\n- Включать все зависимости\n- Функциональные обновления setState\n- ESLint exhaustive\\-deps правило\n- Профилировать перед оптимизацией\n- Документировать сложные deps',
                },
              ],
            },
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Преждевременной оптимизации\n- useCallback без React.memo\n- Игнорирования ESLint предупреждений\n- Создания функций внутри useCallback\n- Объектов в зависимостях\n- useCallback везде "на всякий случай"',
                },
              ],
            },
            {
              id: 'card-62',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Измеряйте производительность\n- Используйте React DevTools Profiler\n- Комбинируйте с useMemo\n- Создавайте кастомные хуки\n- Изучайте паттерны оптимизации\n- Читайте документацию React',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-65',
          type: 'prose',
          markdown:
            '**useCallback** — инструмент оптимизации, который мемоизирует функции и сохраняет их ссылку между рендерами. Критически важен при работе с React.memo компонентами и зависимостями в хуках. Основные случаи использования: обработчики событий для мемоизированных компонентов, функции в зависимостях useEffect, debounce/throttle функции. Не стоит использовать везде — измеряйте производительность и оптимизируйте только узкие места.',
        },
        {
          id: 'resources-66',
          type: 'resources',
          items: [
            {
              id: 'link-67',
              label: 'React Docs',
              url: 'https://react.dev/reference/react/useCallback',
            },
          ],
        },
        {
          id: 'resources-68',
          type: 'resources',
          items: [
            {
              id: 'link-69',
              label: 'When to useMemo/useCallback',
              url: 'https://kentcdodds.com/blog/usememo-and-usecallback',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
