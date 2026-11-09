import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/tanstack-query/tanstack-query-ssr-next-snippetqueryclient.txt?raw'
import example2 from '../snippets/tanstack-query/tanstack-query-ssr-next-snippetapi.txt?raw'
import example3 from '../snippets/tanstack-query/tanstack-query-ssr-next-snippetprovider.txt?raw'
import example4 from '../snippets/tanstack-query/tanstack-query-ssr-next-snippetpage.txt?raw'
import example5 from '../snippets/tanstack-query/tanstack-query-ssr-next-snippetclient.txt?raw'

// Content copied verbatim from src/views/tanstack-query/TanStackSSRNext.vue.
export default {
  ...articleSummaries.tanstackQueryTanStackSSRNext,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'В Next.js App Router серверные компоненты умеют получить данные до отправки страницы в браузер. TanStack Query добавляет к этому свой клиентский кэш: сервер заранее наполняет его данными, сериализует состояние, а клиентские компоненты читают тот же результат через обычный `useQuery`. Поэтому пользователь видит готовый HTML, а приложение после гидратации не начинает всё с пустого loading\\-состояния.',
    },
    {
      id: 'cards-2',
      type: 'cards',
      columns: 1,
      items: [
        {
          id: 'card-3',
          blocks: [
            {
              id: 'text-4',
              type: 'prose',
              markdown:
                'Главный поток данных: **server prefetch** → **dehydrate** → **HTML/React payload** → **hydrate** → **useQuery читает кэш**.',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем отдельный QueryClient на сервере',
      blocks: [
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            '`QueryClient` хранит кэш запросов. На сервере это особенно важно: один HTTP запрос пользователя не должен видеть данные другого HTTP запроса. Поэтому в серверной странице создают новый `QueryClient` прямо внутри функции страницы. Он живёт только во время рендера конкретного запроса.',
        },
        {
          id: 'text-6',
          type: 'prose',
          markdown:
            'Если сделать глобальный серверный `QueryClient`, можно получить утечки данных, странные совпадения кэша между пользователями и трудноотлавливаемые баги с авторизацией. В браузере ситуация другая: там кэш должен жить между навигациями одного пользователя, поэтому клиентский экземпляр переиспользуют.',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Фабрика QueryClient',
      blocks: [
        {
          id: 'text-7',
          type: 'prose',
          markdown:
            'Обычно настройки выносят в фабрику. Так серверный и клиентский клиенты получают одинаковые дефолты: например, `staleTime` и отключение `refetchOnWindowFocus`.',
        },
        {
          id: 'code-8',
          type: 'code',
          language: 'tsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Query keys, типы и fetch-функции',
      blocks: [
        {
          id: 'text-9',
          type: 'prose',
          markdown:
            "`queryKey` — это адрес записи в кэше. Серверный `prefetchQuery` и клиентский `useQuery` должны использовать один и тот же ключ. Если на сервере был `['users']`, а на клиенте случайно `['user']` или `['users', page]`, TanStack Query увидит другой запрос и выполнит fetch заново.",
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'tsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Клиентский QueryClientProvider',
      blocks: [
        {
          id: 'text-11',
          type: 'prose',
          markdown:
            '`QueryClientProvider` нужен всем клиентским компонентам, которые вызывают `useQuery`. Он кладёт клиентский `QueryClient` в React context. Без него хук не знает, где находится кэш, подписки, настройки retry, staleTime и методы инвалидирования.',
        },
        {
          id: 'text-12',
          type: 'prose',
          markdown:
            'В App Router провайдер делают client component, потому что React context для TanStack Query используется на клиенте. Важно не создавать новый браузерный `QueryClient` на каждый рендер провайдера: иначе кэш будет сбрасываться.',
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'tsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Server prefetch и dehydrate',
      blocks: [
        {
          id: 'text-14',
          type: 'prose',
          markdown:
            'Серверная страница создаёт `QueryClient` и вызывает `prefetchQuery`. Это почти то же самое, что `fetchQuery`, но без возвращения данных в компонент: результат складывается в кэш клиента.',
        },
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            'После этого вызывается `dehydrate(queryClient)`. Он берёт содержимое кэша и превращает его в сериализуемое состояние, которое можно передать через React payload в браузер. Это не HTML\\-строка с данными, а снимок query\\-кэша: ключи, данные, timestamps, статус успешных запросов.',
        },
        {
          id: 'text-16',
          type: 'prose',
          markdown:
            '`HydrationBoundary` получает этот снимок и делает его доступным клиентской части дерева. Когда React гидратирует клиентский компонент, TanStack Query восстанавливает записи в браузерном `QueryClient`.',
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'tsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Почему useQuery сразу получает данные',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Клиентский компонент ничего особенного не делает. Он вызывает `useQuery` с тем же `queryKey` и `queryFn`. TanStack Query сначала смотрит в кэш. Если запись уже была гидратирована, хук синхронно отдаёт `data` и статус `success`. Поэтому компонент часто не показывает `isLoading` вообще.',
        },
        {
          id: 'text-19',
          type: 'prose',
          markdown:
            '`queryFn` всё равно нужен. Он будет использован для фонового refetch, ручного `refetch`, инвалидирования или следующего запроса, когда данные устареют.',
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'tsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Роль staleTime',
      blocks: [
        {
          id: 'text-21',
          type: 'prose',
          markdown:
            'По умолчанию данные в TanStack Query быстро считаются устаревшими. После гидратации это может привести к мгновенному повторному запросу в браузере: HTML уже пришёл с данными, но клиент сразу решает, что их нужно перепроверить.',
        },
        {
          id: 'text-22',
          type: 'prose',
          markdown:
            '`staleTime` задаёт окно свежести. Например, `60_000` означает: в течение минуты после серверного prefetch клиент считает данные свежими и не делает автоматический refetch при монтировании. Это не вечный кэш, а защита от лишнего запроса сразу после SSR.',
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Отличие от client-side fetching',
      blocks: [
        {
          id: 'table-23',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Что видит пользователь',
            },
            {
              id: 'column-3',
              label: 'Где первый запрос',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Client\\-side fetching',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Сначала shell/loading, потом данные',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'В браузере после загрузки JS',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'SSR \\+ hydration',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'HTML уже содержит состояние с данными',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'На сервере во время рендера страницы',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'SSR без dehydrate',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Сервер может отрендерить данные, но клиентский кэш пуст',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Сервер и затем повторно клиент',
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
      title: 'Как это связано с Next.js cache',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown:
            'TanStack Query кэширует данные для React\\-компонентов и управляет их свежестью на клиенте. Next.js `fetch`, `revalidate` и route cache управляют серверным кешированием и повторной генерацией. Это разные уровни.',
        },
        {
          id: 'text-34',
          type: 'prose',
          markdown:
            'Если fetch в серверной странице использует `next: { revalidate: 60 }`, Next.js может переиспользовать ответ на сервере. Но после передачи в браузер TanStack Query всё равно смотрит на свой `staleTime`. Хорошая настройка согласует оба слоя: сервер не делает лишнюю работу, а клиент не refetch\\-ит немедленно после гидратации.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые ошибки новичков',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown: 'Один глобальный QueryClient на сервере',
        },
        {
          id: 'text-36',
          type: 'prose',
          markdown: 'Риск утечки кэша между запросами и пользователями.',
        },
        {
          id: 'text-37',
          type: 'prose',
          markdown: 'Разные queryKey на сервере и клиенте',
        },
        {
          id: 'text-38',
          type: 'prose',
          markdown: 'Гидратация не совпадает, useQuery делает новый запрос.',
        },
        {
          id: 'text-39',
          type: 'prose',
          markdown: 'Нет HydrationBoundary',
        },
        {
          id: 'text-40',
          type: 'prose',
          markdown: 'Серверный prefetch был, но снимок кэша не попал в клиентское дерево.',
        },
        {
          id: 'text-41',
          type: 'prose',
          markdown: 'Нет QueryClientProvider',
        },
        {
          id: 'text-42',
          type: 'prose',
          markdown: 'Клиентские хуки TanStack Query не получают доступ к кэшу.',
        },
        {
          id: 'text-43',
          type: 'prose',
          markdown: 'staleTime равен 0 без понимания последствий',
        },
        {
          id: 'text-44',
          type: 'prose',
          markdown: 'После SSR может появиться мгновенный фоновый refetch.',
        },
        {
          id: 'text-45',
          type: 'prose',
          markdown: 'Нестабильные ключи с объектами',
        },
        {
          id: 'text-46',
          type: 'prose',
          markdown: 'Ключ должен стабильно описывать параметры запроса.',
        },
        {
          id: 'text-47',
          type: 'prose',
          markdown: 'Ожидание, что dehydrate передаст ошибки как обычные данные',
        },
        {
          id: 'text-48',
          type: 'prose',
          markdown:
            'По умолчанию дегидратируются успешные запросы; ошибки нужно обрабатывать отдельно.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Итог',
      blocks: [
        {
          id: 'cards-49',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    'SSR\\-гидратация TanStack Query — это не магия, а перенос серверного query\\-кэша в браузер. Сервер создаёт изолированный `QueryClient`, наполняет его через `prefetchQuery`, сериализует через `dehydrate`, а `HydrationBoundary` восстанавливает эти записи для клиентских `useQuery`. Если ключи совпадают и `staleTime` настроен разумно, клиент сразу читает готовые данные и не делает лишний первый запрос.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
