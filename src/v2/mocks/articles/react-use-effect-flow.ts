import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-use-effect-flow-lifecycleclasssnippet.txt?raw'
import example2 from '../snippets/react/react-use-effect-flow-useeffectbasicsnippet.txt?raw'
import example3 from '../snippets/react/react-use-effect-flow-effectflowsnippet.txt?raw'
import example4 from '../snippets/react/react-use-effect-flow-cleanuptimingsnippet.txt?raw'
import example5 from '../snippets/react/react-use-effect-flow-dependenciessnippet.txt?raw'
import example6 from '../snippets/react/react-use-effect-flow-cleanupexamplessnippet.txt?raw'
import example7 from '../snippets/react/react-use-effect-flow-closuretrapsnippet.txt?raw'
import example8 from '../snippets/react/react-use-effect-flow-vslifecyclesnippet.txt?raw'
import example9 from '../snippets/react/react-use-effect-flow-executionordersnippet.txt?raw'
import example10 from '../snippets/react/react-use-effect-flow-commonmistakessnippet.txt?raw'

// Content copied verbatim from src/views/react/UseEffectFlow.vue.
export default {
  ...articleSummaries.reactUseEffectFlow,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**useEffect** — это хук, который объединяет три метода жизненного цикла классовых компонентов: componentDidMount, componentDidUpdate и componentWillUnmount. Понимание flow выполнения и момента вызова cleanup критически важно для правильной работы с побочными эффектами в React.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Классовые компоненты: методы жизненного цикла',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Функциональные компоненты: useEffect',
      blocks: [
        {
          id: 'code-3',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Flow выполнения useEffect',
      blocks: [
        {
          id: 'callout-4',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-5',
              type: 'prose',
              markdown:
                '**Ключевой момент:** Эффекты выполняются ПОСЛЕ отрисовки DOM в браузере, не блокируя UI.',
            },
          ],
        },
        {
          id: 'code-6',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Когда вызывается cleanup?',
      blocks: [
        {
          id: 'callout-7',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-8',
              type: 'prose',
              markdown:
                '**Важно:** Cleanup вызывается ПОСЛЕ отрисовки нового DOM, но ПЕРЕД выполнением нового эффекта!',
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Три момента вызова cleanup',
      blocks: [
        {
          id: 'cards-10',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: '1. Перед повторным эффектом',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown:
                    'Когда зависимости изменились, cleanup вызывается ПЕРЕД запуском нового эффекта. Это предотвращает утечки памяти.',
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
                  text: '2. При размонтировании',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    'Когда компонент удаляется из DOM, cleanup вызывается для финальной очистки ресурсов.',
                },
              ],
            },
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: '3. В Strict Mode (дважды)',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    'В режиме разработки React вызывает setup → cleanup → setup дважды для выявления проблем.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Массив зависимостей',
      blocks: [
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические примеры cleanup',
      blocks: [
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Проблема замыкания в cleanup',
      blocks: [
        {
          id: 'callout-22',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-23',
              type: 'prose',
              markdown:
                '**Частая ошибка:** Cleanup "видит" значения из момента создания эффекта (замыкание)!',
            },
          ],
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'useEffect vs Методы жизненного цикла',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-26',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'Методы жизненного цикла',
            },
            {
              id: 'column-3',
              label: 'useEffect',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Подход**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Императивный (что делать)',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Декларативный (какой результат)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Группировка**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'По фазам (mount, update, unmount)',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'По логике (вся логика в одном месте)',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Timing**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Синхронно (блокирует отрисовку)',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Асинхронно (не блокирует UI)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Cleanup**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'componentWillUnmount',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'return функция',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Условная логика**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'if внутри методов',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Массив зависимостей',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Переиспользование**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'HOC, Render Props',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Кастомные хуки',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Высокая (логика размазана)',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Низкая (логика в одном месте)',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Порядок выполнения нескольких эффектов',
      blocks: [
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые ошибки',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Вопросы на собеседовании',
      blocks: [
        {
          id: 'text-50',
          type: 'prose',
          markdown:
            '1. **В какой момент вызывается cleanup функция?**\n   \n   Cleanup вызывается в трех случаях: (1) Перед повторным запуском эффекта при изменении зависимостей, (2) При размонтировании компонента, (3) Дважды в Strict Mode в разработке. Критически важно: cleanup вызывается ПОСЛЕ отрисовки DOM, но ПЕРЕД новым эффектом.\n2. **Чем useEffect отличается от componentDidMount?**\n   \n   componentDidMount выполняется синхронно и блокирует отрисовку браузера. useEffect выполняется асинхронно после отрисовки, не блокируя UI. Для синхронного поведения используется useLayoutEffect.\n3. **Что произойдет если не указать зависимости?**\n   \n   Без массива зависимостей эффект будет запускаться после каждого рендера. Пустой массив \\[\\] означает запуск только при монтировании. С зависимостями — запуск при их изменении. ESLint предупредит о забытых зависимостях.\n4. **Почему нельзя использовать async функцию в useEffect напрямую?**\n   \n   useEffect ожидает либо undefined, либо cleanup функцию. Async функция возвращает Promise, что вызовет ошибку. Решение: создать async функцию внутри эффекта и вызвать её.\n5. **Как избежать проблемы замыкания в cleanup?**\n   \n   Cleanup "видит" значения из момента создания эффекта. Решения: (1) Функциональное обновление setState(prev =&gt; prev \\+ 1), (2) Добавить значение в зависимости, (3) Использовать useRef для хранения актуального значения.\n6. **В каком порядке выполняются несколько useEffect?**\n   \n   Эффекты выполняются в порядке их объявления в коде. Cleanup также выполняются в том же порядке. При обновлении сначала все cleanup, потом все новые setup в порядке объявления.\n7. **Когда использовать useEffect vs useLayoutEffect?**\n   \n   useEffect для большинства случаев (не блокирует UI). useLayoutEffect когда нужно измерить DOM или синхронно обновить стили перед отрисовкой (редко). useLayoutEffect эквивалент componentDidMount/Update по timing.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-51',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Всегда возвращать cleanup функцию\n- Указывать все зависимости\n- Разделять логику на несколько эффектов\n- Использовать ESLint правила\n- Тестировать cleanup логику\n- Выносить в кастомные хуки',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Забывать cleanup функцию\n- Игнорировать предупреждения ESLint\n- async функции напрямую\n- Объекты в зависимостях\n- Условные вызовы хуков\n- Изменение state в рендере',
                },
              ],
            },
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Используйте AbortController для fetch\n- useRef для актуальных значений\n- Функциональное обновление setState\n- React DevTools для отладки\n- Strict Mode в разработке\n- Документируйте сложные эффекты',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Диаграмма жизненного цикла',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-62',
              title: 'Полный Flow useEffect',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: '**Монтирование:**',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown: 'Render → Commit to DOM → Browser Paint → Effect Setup',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown: '**Обновление:**',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown: 'Render → Commit to DOM → Browser Paint → Old Cleanup → New Setup',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown: '**Размонтирование:**',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown: 'Final Cleanup',
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
          id: 'text-69',
          type: 'prose',
          markdown:
            '**useEffect** объединяет три метода жизненного цикла классовых компонентов, но работает декларативно и асинхронно. **Cleanup функция** вызывается в трех случаях: перед повторным эффектом, при размонтировании и дважды в Strict Mode. Ключевое отличие от методов жизненного цикла — группировка логики по назначению, а не по фазам, и асинхронное выполнение, не блокирующее UI. Понимание этих концепций критически важно для правильной работы с побочными эффектами в React.',
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'React Docs: useEffect',
              url: 'https://react.dev/reference/react/useEffect',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'Synchronizing with Effects',
              url: 'https://react.dev/learn/synchronizing-with-effects',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
