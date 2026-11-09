import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-19-useactionstatesnippet.txt?raw'
import example2 from '../snippets/react/react-19-useoptimisticsnippet.txt?raw'
import example3 from '../snippets/react/react-19-usehooksnippet.txt?raw'
import example4 from '../snippets/react/react-19-actionssnippet.txt?raw'
import example5 from '../snippets/react/react-19-refcallbacksnippet.txt?raw'
import example6 from '../snippets/react/react-19-documentmetadatasnippet.txt?raw'
import example7 from '../snippets/react/react-19-asyncscriptssnippet.txt?raw'
import example8 from '../snippets/react/react-19-stylesheetsupportsnippet.txt?raw'
import example9 from '../snippets/react/react-19-preloadsnippet.txt?raw'
import example10 from '../snippets/react/react-19-servercomponentssnippet.txt?raw'
import example11 from '../snippets/react/react-19-serveractionssnippet.txt?raw'
import example12 from '../snippets/react/react-19-migrationguidesnippet.txt?raw'

// Content copied verbatim from src/views/react/React19.vue.
export default {
  ...articleSummaries.react19,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**React 19** — крупное обновление, которое упрощает работу с формами, асинхронными операциями, метаданными документа и вводит стабильную поддержку React Server Components. Основной фокус — на улучшении developer experience и производительности без breaking changes.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Главные нововведения',
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
                  text: 'Actions & Forms',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- `useActionState` — управление формами\n- `useOptimistic` — оптимистичные обновления\n- `action` пропс для форм\n- Автоматический pending state\n- Встроенная обработка ошибок',
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
                  text: 'Новые хуки',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- `use()` — чтение промисов и контекста\n- Условное использование хуков\n- Упрощенная работа с async данными\n- Ref callbacks с cleanup\n- Улучшенная типизация',
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
                  text: 'Document Metadata',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- Встроенная поддержка `<title>`\n- Meta теги в компонентах\n- Приоритизация ресурсов\n- Замена react\\-helmet\n- SSR\\-friendly',
                },
              ],
            },
            {
              id: 'card-12',
              blocks: [
                {
                  id: 'heading-13',
                  type: 'heading',
                  level: 3,
                  text: 'Server Components',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown:
                    '- Стабильная поддержка RSC\n- Server Actions\n- Прямой доступ к БД\n- Zero\\-bundle размер\n- SEO оптимизация',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. useActionState — управление формами',
      blocks: [
        {
          id: 'callout-15',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '**Основное улучшение:** Автоматическое управление состоянием формы без useState и useEffect',
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. useOptimistic — оптимистичные обновления',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Мгновенное обновление UI при отправке данных, автоматический откат при ошибке:',
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. use() — универсальный хук',
      blocks: [
        {
          id: 'callout-20',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-21',
              type: 'prose',
              markdown: '**Революционно:** `use()` можно вызывать условно, нарушая правила хуков!',
            },
          ],
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
      id: 'section-5',
      title: '4. Actions — автоматическое управление состоянием',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Ref callbacks с cleanup функцией',
      blocks: [
        {
          id: 'callout-24',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-25',
              type: 'prose',
              markdown: '**Упрощение:** Теперь не нужен useEffect для cleanup при работе с DOM',
            },
          ],
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
      id: 'section-7',
      title: '6. Встроенная поддержка метаданных',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Улучшенная поддержка скриптов',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Приоритизация стилей',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Preloading ресурсов',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: '10. Server Components (стабильные)',
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
      id: 'section-12',
      title: '11. Server Actions',
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
      id: 'section-13',
      title: 'Миграция с React 18 на React 19',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'jsx',
          code: example12,
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Сравнение: React 18 vs React 19',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Функция',
            },
            {
              id: 'column-2',
              label: 'React 18',
            },
            {
              id: 'column-3',
              label: 'React 19',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '**Формы**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'useState \\+ useEffect \\+ onSubmit',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'useActionState \\+ action prop',
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
                    markdown: '**Async данные**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'useEffect \\+ fetch \\+ loading state',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'use(promise) \\+ Suspense',
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
                    markdown: '**Оптимистичные обновления**',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Ручное управление состоянием',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'useOptimistic',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**Метаданные**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'react\\-helmet / next/head',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Встроенная поддержка',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Ref cleanup**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'useEffect для cleanup',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Ref callback с return',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Server Components**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Экспериментальные',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Стабильные',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Условные хуки**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Запрещены',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'use() позволяет',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Preloading**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Вручную через link rel="preload"',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'preload() и preinit() API',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-59',
          type: 'prose',
          markdown:
            "1. **В чем главное преимущество useActionState над useState?**\n   \n   `useActionState` автоматически управляет pending состоянием, обработкой ошибок и интегрируется с формами через `action` проп. Не нужно вручную управлять loading/error состояниями и вызовами preventDefault.\n2. **Как use() может нарушать правила хуков?**\n   \n   `use()` можно вызывать условно (в if, циклах), в отличие от других хуков. Это возможно потому, что `use()` не хранит состояние между рендерами — он просто читает промис или контекст в момент вызова.\n3. **Когда использовать useOptimistic?**\n   \n   Для мгновенного UI\\-отклика при операциях, которые с большой вероятностью успешны (лайки, добавление в корзину, простые CRUD). React автоматически откатит оптимистичное обновление при ошибке.\n4. **Заменяет ли React 19 react\\-helmet полностью?**\n   \n   Да, для базовых случаев. React 19 поддерживает `<title>`, `<meta>`, `<link>` прямо в компонентах. Но для сложной логики (например, вложенных роутов с приоритетами) могут потребоваться дополнительные решения.\n5. **В чем разница между preload() и preinit()?**\n   \n   `preload()` только загружает ресурс (шрифты, изображения). `preinit()` загружает И выполняет/применяет (скрипты, стили). Используйте `preinit` для критичных ресурсов, которые нужны сразу.\n6. **Что такое Server Actions и зачем они нужны?**\n   \n   Server Actions — это функции, помеченные `'use server'`, которые выполняются на сервере. Позволяют напрямую работать с БД, файловой системой из компонентов, обеспечивая безопасность и уменьшая bundle size клиента.\n7. **Обратно совместим ли React 19 с React 18?**\n   \n   Почти полностью. Удалены устаревшие API (legacy context, string refs), но основной код работает без изменений. Миграция в основном заключается в замене устаревших паттернов на новые, более удобные.",
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Breaking Changes в React 19',
      blocks: [
        {
          id: 'cards-60',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-61',
              title: '❌ Удалено',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Legacy Context API\n- String refs (`ref="myRef"`)\n- Module pattern factories\n- createFactory\n- defaultProps для function компонентов\n- PropTypes (перенесены в отдельный пакет)',
                },
              ],
            },
            {
              id: 'card-63',
              title: '✅ Альтернативы',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Context API (новый)\n- useRef() \\+ callback refs\n- Function components\n- JSX transform\n- Default параметры ES6\n- TypeScript / JSDoc',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Лучшие практики React 19',
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
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Использовать useActionState для форм\n- use() вместо useEffect для async\n- useOptimistic для UX\n- Server Components где возможно\n- Встроенные метаданные вместо helmet\n- preload() для критичных ресурсов',
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
                    '- String refs\n- Legacy Context\n- defaultProps в функциях\n- Избыточный useState для форм\n- useEffect для fetch без причины\n- react\\-helmet (заменен)',
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
                    '- Постепенная миграция\n- Читайте changelog\n- Обновите TypeScript типы\n- Тестируйте Server Components\n- Изучайте новые паттерны\n- Следите за performance',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Производительность в React 19',
      blocks: [
        {
          id: 'table-75',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Оптимизация',
            },
            {
              id: 'column-2',
              label: 'Механизм',
            },
            {
              id: 'column-3',
              label: 'Выгода',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '**Server Components**',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Zero\\-bundle JS на клиенте',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Меньше JavaScript, быстрее загрузка',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '**Automatic Batching**',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Группировка обновлений',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Меньше рендеров',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**Приоритизация ресурсов**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'precedence атрибут',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Критичные стили загружаются первыми',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**Preloading**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'preload() / preinit()',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Параллельная загрузка ресурсов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '**Оптимистичные обновления**',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'useOptimistic',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Мгновенный UI отклик',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '**Дедупликация скриптов**',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Автоматическая',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Нет повторных загрузок',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-19',
      title: 'Итог',
      blocks: [
        {
          id: 'text-94',
          type: 'prose',
          markdown:
            '**React 19** значительно упрощает разработку благодаря новым хукам (`useActionState`, `useOptimistic`, `use`), встроенной поддержке метаданных, стабильным Server Components и улучшенной работе с формами. Миграция с React 18 обычно простая, основные изменения касаются удаления устаревших API. Новые возможности делают код чище, производительность выше, а developer experience лучше.',
        },
        {
          id: 'resources-95',
          type: 'resources',
          items: [
            {
              id: 'link-96',
              label: 'React 19 Blog',
              url: 'https://react.dev/blog/2024/04/25/react-19',
            },
          ],
        },
        {
          id: 'resources-97',
          type: 'resources',
          items: [
            {
              id: 'link-98',
              label: 'Upgrade Guide',
              url: 'https://react.dev/blog/2024/04/25/react-19-upgrade-guide',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
