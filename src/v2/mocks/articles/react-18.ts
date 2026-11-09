import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-18-concurrentrenderingsnippet.txt?raw'
import example2 from '../snippets/react/react-18-automaticbatchingsnippet.txt?raw'
import example3 from '../snippets/react/react-18-usetransitionsnippet.txt?raw'
import example4 from '../snippets/react/react-18-usedeferredvaluesnippet.txt?raw'
import example5 from '../snippets/react/react-18-suspensesnippet.txt?raw'
import example6 from '../snippets/react/react-18-newrootapisnippet.txt?raw'
import example7 from '../snippets/react/react-18-useidsnippet.txt?raw'
import example8 from '../snippets/react/react-18-usesyncexternalstoresnippet.txt?raw'
import example9 from '../snippets/react/react-18-useinsertioneffectsnippet.txt?raw'
import example10 from '../snippets/react/react-18-strictmodesnippet.txt?raw'
import example11 from '../snippets/react/react-18-migrationguidesnippet.txt?raw'

// Content copied verbatim from src/views/react/React18.vue.
export default {
  ...articleSummaries.react18,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**React 18** — это крупное обновление, которое вводит **конкурентный рендеринг** (Concurrent Rendering) как основу для новых возможностей. Ключевые изменения: автоматический батчинг, новые хуки (useTransition, useDeferredValue, useId), улучшенный Suspense, стриминговый SSR и новый Root API.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что нового в React 18',
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
                  text: 'Ключевые возможности',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Concurrent Rendering** — прерываемый рендеринг\n- **Automatic Batching** — везде\n- **useTransition** — приоритет обновлений\n- **useDeferredValue** — отложенные значения\n- **Suspense** — для данных и SSR\n- **Streaming SSR** — по частям',
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
                  text: 'Новые API',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **createRoot** — новый Root API\n- **useId** — уникальные ID для SSR\n- **useSyncExternalStore** — внешние хранилища\n- **useInsertionEffect** — для CSS\\-in\\-JS\n- **Strict Mode** — улучшенный\n- **hydrateRoot** — SSR гидратация',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Конкурентный рендеринг (Concurrent Rendering)',
      blocks: [
        {
          id: 'text-9',
          type: 'prose',
          markdown:
            '**Главное изменение React 18** — способность прерывать рендеринг и возобновлять его позже. React может начать обновление, прервать его при более важном событии, и вернуться к нему потом.',
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Автоматический батчинг (Automatic Batching)',
      blocks: [
        {
          id: 'callout-11',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-12',
              type: 'prose',
              markdown:
                '**Улучшение производительности:** React 18 группирует все обновления состояния в один ре\\-рендер, даже в промисах, таймаутах и native event handlers!',
            },
          ],
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. useTransition — управление приоритетами',
      blocks: [
        {
          id: 'text-14',
          type: 'prose',
          markdown:
            '`useTransition` позволяет помечать обновления как неотложные (urgent) или переходные (transitions). Переходные обновления могут быть прерваны более важными.',
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. useDeferredValue — отложенные значения',
      blocks: [
        {
          id: 'text-16',
          type: 'prose',
          markdown:
            '`useDeferredValue` возвращает отложенную версию значения, которая обновляется с низким приоритетом. Похож на debounce, но адаптивный.',
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-18',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Когда использовать',
            },
            {
              id: 'column-3',
              label: 'Преимущества',
            },
            {
              id: 'column-4',
              label: 'Недостатки',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**useTransition**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Контролируете setState',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Полный контроль, индикатор isPending',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Требует оборачивания setState',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**useDeferredValue**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Значение из props/контекста',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Проще использовать',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Нет прямого isPending',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**debounce/throttle**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Старые браузеры, фиксированная задержка',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Простота, предсказуемость',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Фиксированная задержка, искусственная',
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
      title: '5. Улучшенный Suspense',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'В React 18 Suspense теперь работает не только для code splitting, но и для данных (с библиотеками), а также поддерживает SSR streaming.',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: '6. Новый Root API — createRoot',
      blocks: [
        {
          id: 'callout-33',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-34',
              type: 'prose',
              markdown:
                '**Важно:** Для использования новых возможностей React 18 необходимо перейти с `ReactDOM.render` на `createRoot`!',
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: '7. useId — уникальные ID для SSR',
      blocks: [
        {
          id: 'text-36',
          type: 'prose',
          markdown:
            '`useId` генерирует стабильные уникальные ID, которые совпадают между сервером и клиентом при SSR гидратации.',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: '8. useSyncExternalStore — внешние хранилища',
      blocks: [
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            '`useSyncExternalStore` позволяет подписываться на внешние хранилища (Redux, MobX, browser API) с гарантией консистентности в Concurrent Mode.',
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: '9. useInsertionEffect — для CSS-in-JS',
      blocks: [
        {
          id: 'text-40',
          type: 'prose',
          markdown:
            '`useInsertionEffect` предназначен для авторов CSS\\-in\\-JS библиотек. Выполняется перед всеми DOM мутациями.',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: '10. Улучшенный Strict Mode',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            'Strict Mode в React 18 помогает подготовиться к будущим возможностям, таким как Offscreen Components, проверяя корректную очистку эффектов.',
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Миграция на React 18',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-45',
          type: 'prose',
          markdown:
            '1. **Что такое Concurrent Rendering и зачем он нужен?**\n   \n   Concurrent Rendering позволяет React прерывать рендеринг для обработки более важных обновлений (например, пользовательского ввода), а затем возвращаться к прерванной работе. Это делает UI более отзывчивым, особенно при тяжёлых вычислениях.\n2. **В чём разница между useTransition и useDeferredValue?**\n   \n   `useTransition` используется когда вы контролируете setState и хотите пометить обновление как переходное. `useDeferredValue` используется когда значение приходит извне (props, контекст) и вы хотите получить его отложенную версию.\n3. **Что изменилось в автоматическом батчинге?**\n   \n   В React 17 батчинг работал только в event handlers. В React 18 батчинг автоматический везде: в промисах, setTimeout, native event handlers. Это уменьшает количество ре\\-рендеров и улучшает производительность.\n4. **Обязательно ли переходить на createRoot?**\n   \n   Не обязательно для базовой работы, но для использования новых возможностей React 18 (Concurrent Features) необходим `createRoot`. Старый `ReactDOM.render` работает в Legacy Mode без конкурентных возможностей.\n5. **Как useId помогает с SSR?**\n   \n   `useId` генерирует ID, которые гарантированно совпадают между сервером и клиентом, что предотвращает гидратацию mismatch. Раньше приходилось использовать глобальные счётчики или UUID, которые могли не совпадать.\n6. **Зачем нужен useSyncExternalStore?**\n   \n   В Concurrent Mode обычные подписки на внешние хранилища могут приводить к tearing (несогласованности UI). `useSyncExternalStore` гарантирует консистентность даже при конкурентном рендеринге.\n7. **Почему Strict Mode вызывает эффекты дважды?**\n   \n   Это подготовка к Offscreen Components — будущей возможности React, где компоненты могут монтироваться/размонтироваться при сохранении состояния (background tabs, modals). Двойной вызов проверяет правильность cleanup функций.',
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Лучшие практики React 18',
      blocks: [
        {
          id: 'cards-46',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- Использовать createRoot для новых проектов\n- Применять useTransition для тяжёлых обновлений\n- Использовать Suspense для code splitting\n- Включать Strict Mode в разработке\n- Полагаться на автоматический батчинг\n- useId для accessibility',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Использование ReactDOM.render в новом коде\n- Излишнее использование flushSync\n- Игнорирование Strict Mode warnings\n- Ручная генерация ID без useId\n- Подписка на внешние store без useSyncExternalStore\n- useInsertionEffect в пользовательском коде',
                },
              ],
            },
            {
              id: 'card-53',
              blocks: [
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- Профилируйте с React DevTools\n- Начинайте с useTransition для input\n- Комбинируйте Suspense границы\n- Мигрируйте постепенно\n- Тестируйте с Concurrent Features\n- Следите за React Working Group',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Сравнение с React 17',
      blocks: [
        {
          id: 'table-56',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Возможность',
            },
            {
              id: 'column-2',
              label: 'React 17',
            },
            {
              id: 'column-3',
              label: 'React 18',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Рендеринг**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Синхронный, блокирующий',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Конкурентный, прерываемый',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**Батчинг**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Только в event handlers',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Автоматически везде',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**Root API**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'ReactDOM.render',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'createRoot, hydrateRoot',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '**Suspense**',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Только code splitting',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '\\+ данные, SSR streaming',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '**Приоритеты**',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Нет встроенных',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'useTransition, useDeferredValue',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**SSR**',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'renderToString (блокирующий)',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'renderToPipeableStream (потоковый)',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Итог',
      blocks: [
        {
          id: 'text-75',
          type: 'prose',
          markdown:
            '**React 18** — это фундаментальное обновление, которое вводит конкурентный рендеринг как основу для будущих возможностей. Ключевые изменения: автоматический батчинг везде, новые хуки для управления приоритетами (useTransition, useDeferredValue), улучшенный Suspense, стриминговый SSR и новый Root API. Миграция проста для большинства приложений, но открывает множество возможностей для оптимизации производительности и UX.',
        },
        {
          id: 'resources-76',
          type: 'resources',
          items: [
            {
              id: 'link-77',
              label: 'React 18 Release',
              url: 'https://react.dev/blog/2022/03/29/react-v18',
            },
          ],
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'React 18 Working Group',
              url: 'https://github.com/reactwg/react-18/discussions',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
