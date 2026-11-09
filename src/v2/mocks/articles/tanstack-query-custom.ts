import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/tanstack-query/tanstack-query-custom-snippetcontext.txt?raw'
import example2 from '../snippets/tanstack-query/tanstack-query-custom-snippethook.txt?raw'
import example3 from '../snippets/tanstack-query/tanstack-query-custom-snippetdedup.txt?raw'
import example4 from '../snippets/tanstack-query/tanstack-query-custom-snippetstaletime.txt?raw'
import example5 from '../snippets/tanstack-query/tanstack-query-custom-snippetapp.txt?raw'

// Content copied verbatim from src/views/tanstack-query/CustomTanStackQuery.vue.
export default {
  ...articleSummaries.tanstackQueryCustomTanStackQuery,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Прежде чем изучать TanStack Query, полезно собрать его уменьшенную копию вручную. Это закрепляет три фундаментальные темы React: пользовательские хуки, React Context API и управление асинхронным состоянием. Статья построена так, чтобы после её прочтения вы могли выполнить все шесть практических заданий.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Из чего состоит React Query',
      blocks: [
        {
          id: 'text-2',
          type: 'prose',
          markdown:
            'На высоком уровне любая query\\-библиотека — это три вещи, работающие вместе: **глобальное хранилище кэша**, **хук для подписки на запрос** и **механизм оповещения** компонентов об изменениях.',
        },
        {
          id: 'table-3',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Слой',
            },
            {
              id: 'column-2',
              label: 'Инструмент React',
            },
            {
              id: 'column-3',
              label: 'Что делает',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '**Хранилище кэша**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Context \\+ useRef',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Хранит данные всех запросов глобально',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '**Подписка**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'useEffect \\+ Set',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Компонент регистрируется как наблюдатель кэша',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**Публичный API**',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Кастомный хук',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'data / isLoading / isError / refetch',
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
      title: '1. CacheContext — глобальное хранилище',
      blocks: [
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            'Центральная идея: кэш должен быть **глобальным** и **единым**. Если два компонента запрашивают данные по одному ключу, они должны работать с одним и тем же объектом в памяти, а не хранить каждый свою копию.',
        },
        {
          id: 'text-14',
          type: 'prose',
          markdown:
            'React Context — стандартный способ сделать любое значение доступным во всём дереве без prop drilling. Мы кладём в него не данные напрямую, а **методы управления кэшем**: `getEntry`, `setEntry` и `subscribe`.',
        },
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            'Почему `useRef`, а не `useState` для хранения самого кэша? Потому что изменение кэша не должно вызывать ре\\-рендер **провайдера** — только тех компонентов, которые подписались на конкретный ключ. Это важно для производительности.',
        },
        {
          id: 'cards-16',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '**Паттерн Observer:** каждый вызов `useCustomQuery` — это подписчик. При изменении записи в кэше `setEntry` обходит Set подписчиков и вызывает каждую notify\\-функцию, которая форсирует ре\\-рендер именно того компонента, которому нужны новые данные.',
                },
              ],
            },
          ],
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. queryKey — идентификатор запроса',
      blocks: [
        {
          id: 'text-20',
          type: 'prose',
          markdown:
            '**queryKey** — это массив, который однозначно описывает запрос. Ключ сериализуется в строку и становится ключом в объекте кэша. Массив используется намеренно: он позволяет строить иерархические ключи и инвалидировать целые группы.',
        },
        {
          id: 'table-21',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'queryKey',
            },
            {
              id: 'column-2',
              label: 'Строковый ключ',
            },
            {
              id: 'column-3',
              label: 'Когда используется',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: "`['users']`",
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: "`'users'`",
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Список всех пользователей',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: "`['users', 42]`",
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: "`'users|42'`",
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Конкретный пользователь',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: "`['users', 42, 'posts']`",
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: "`'users|42|posts'`",
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Посты конкретного пользователя',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. useCustomQuery — хук для компонентов',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'Хук — единственная точка контакта компонента с кэшем. Компонент ничего не знает о Context внутри хука — он просто получает `{ data, isLoading, isError, refetch }`.',
        },
        {
          id: 'text-32',
          type: 'prose',
          markdown:
            'Внутри хука происходит три вещи при монтировании: подписка на изменения кэша, запуск `fetchData` и возврат текущего состояния из кэша. При размонтировании — отписка, чтобы не было утечек памяти.',
        },
        {
          id: 'text-33',
          type: 'prose',
          markdown:
            'Локальный `useState` (`forceUpdate`) здесь используется исключительно как **триггер ре\\-рендера**. Само состояние хранится в кэше, а не в компоненте — именно поэтому два компонента с одним ключом всегда синхронны.',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Дедупликация запросов',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            "Представьте: два компонента монтируются одновременно с одним `queryKey`. Без дополнительной защиты оба вызовут `queryFn` и уйдут на сервер. Это избыточно и в нашей реализации уже частично решено: проверка `status === 'loading'` в `fetchData` останавливает дублирующий вызов.",
        },
        {
          id: 'text-36',
          type: 'prose',
          markdown:
            'Более надёжный способ — хранить сам Promise в отдельном Map. Тогда второй вызов получает ссылку на уже существующий Promise и просто ждёт его завершения. Ниже показана минимальная реализация `QueryClient` с этим паттерном — именно так устроен настоящий TanStack Query.',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. staleTime и ревалидация',
      blocks: [
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            'Кэш полезен только когда данные актуальны. `staleTime` отвечает на вопрос: *«через сколько миллисекунд данные считать устаревшими?»*.',
        },
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            'Ревалидация — это автоматический повторный запрос при наступлении условия. Самое простое условие — возврат фокуса на вкладку. Пользователь ушёл на другую вкладку, вернулся — данные могли устареть, пора обновить.',
        },
        {
          id: 'cards-40',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-41',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '**Важно различать два таймера:** `staleTime` определяет, когда данные *устарели* (но остаются в кэше и показываются пользователю пока идёт фоновый запрос). `gcTime` (в TanStack Query) — через сколько после последней отписки данные *удаляются* из кэша полностью. В нашей реализации gcTime мы не делаем — для понимания принципов достаточно staleTime.',
                },
              ],
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Полная сборка',
      blocks: [
        {
          id: 'text-44',
          type: 'prose',
          markdown:
            "Ниже — весь код, который нужен для выполнения заданий: контекст, хук и два компонента с одним `queryKey`. HTTP\\-запрос уходит один раз — `UserCount` монтируется первым и запускает fetch, `UserList` монтируется следом и находит `status: 'loading'` в кэше, поэтому ждёт уже идущего запроса. После завершения оба компонента получают уведомление через подписку и ре\\-рендерятся.",
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Как это соотносится с TanStack Query',
      blocks: [
        {
          id: 'table-46',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Концепция',
            },
            {
              id: 'column-2',
              label: 'Наша реализация',
            },
            {
              id: 'column-3',
              label: 'TanStack Query',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Хранилище кэша',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'useRef в CacheProvider',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'QueryClient',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Передача клиента',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'CacheContext.Provider',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'QueryClientProvider',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Хук для компонентов',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'useCustomQuery',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'useQuery',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Ключ запроса',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: "queryKey.join('|')",
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Стабильная сериализация (JSON)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Оповещение',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Set \\+ forceUpdate',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'useSyncExternalStore',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Дедупликация',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Проверка status loading',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Promise Map в QueryCache',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Устаревание данных',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'staleTime \\+ updatedAt',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'staleTime \\+ dataUpdatedAt',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итог',
      blocks: [
        {
          id: 'cards-68',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-69',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    'Самодельный React Query — это Context с useRef для хранилища, паттерн Observer для оповещения подписчиков и кастомный хук как публичный API. Ключевые принципы: данные живут в одном месте (кэш), компоненты лишь подписываются, дедупликация происходит через проверку статуса, а staleTime управляет тем, когда считать данные устаревшими. Именно эти механизмы составляют ядро TanStack Query — библиотека добавляет к ним надёжную сериализацию ключей, garbage collection, optimistic updates и десятки других опций.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
