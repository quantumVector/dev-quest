import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/jotai/jotai-cookbook-snippetstoreprovider.txt?raw'
import example2 from '../snippets/jotai/jotai-cookbook-snippetoutsidereact.txt?raw'
import example3 from '../snippets/jotai/jotai-cookbook-snippetwritable.txt?raw'
import example4 from '../snippets/jotai/jotai-cookbook-snippetasync.txt?raw'
import example5 from '../snippets/jotai/jotai-cookbook-snippetquery.txt?raw'
import example6 from '../snippets/jotai/jotai-cookbook-snippetssr.txt?raw'
import example7 from '../snippets/jotai/jotai-cookbook-snippetui.txt?raw'
import example8 from '../snippets/jotai/jotai-cookbook-snippetutils.txt?raw'
import example9 from '../snippets/jotai/jotai-cookbook-snippettesting.txt?raw'

// Content copied verbatim from src/views/jotai/JotaiCookbook.vue.
export default {
  ...articleSummaries.jotaiJotaiCookbook,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'В предыдущей статье Jotai был разобран через базовую идею: приложение как граф маленьких атомов. Теперь посмотрим на практические рецепты: изоляция состояния через `Provider`, управление store вне React, async\\-атомы, интеграция с TanStack Query, SSR\\-гидрация, UI\\-сценарии и утилиты из `jotai/utils`.',
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
                'Если переносить опыт Effector, не ищите прямую замену каждому `createEvent`, `sample` и `fork`. В Jotai чаще проектируют atom как минимальную единицу данных или операции, а связи выражают через `get`, `set` и отдельный store.',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: '1. Provider и createStore: изолированные экземпляры модели',
      blocks: [
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            'По умолчанию Jotai использует общий store из ближайшего React\\-дерева. Но можно создать store вручную через `createStore` и передать его в `Provider`. Это полезно для виджетов, микрофронтендов, тестов, storybook\\-историй и случаев, когда на одной странице нужно несколько независимых экземпляров одной модели.',
        },
        {
          id: 'code-6',
          type: 'code',
          language: 'tsx',
          code: example1,
        },
        {
          id: 'text-7',
          type: 'prose',
          markdown:
            'Важно не перепутать: два `Provider` с одним и тем же объектом store разделяют состояние. Два разных store дают два независимых состояния для тех же atom configs.',
        },
      ],
    },
    {
      id: 'section-2',
      title: '2. Store вне React',
      blocks: [
        {
          id: 'text-8',
          type: 'prose',
          markdown:
            'Store можно читать и менять вне компонентов. Это похоже на инфраструктурный слой: bootstrap приложения, адаптер внешнего события, тест или bridge к legacy\\-коду. API простой: `store.get(atom)`, `store.set(atom, value)` и `store.sub(atom, callback)`.',
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'tsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: '3. Writable atom вместо event + reducer',
      blocks: [
        {
          id: 'text-10',
          type: 'prose',
          markdown:
            'В Effector состояние часто обновляют через событие и `sample`. В Jotai похожий сценарий обычно выражается writable atom: read\\-функция возвращает значение, write\\-функция получает аргумент команды и обновляет базовый atom.',
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'tsx',
          code: example3,
        },
        {
          id: 'text-12',
          type: 'prose',
          markdown:
            'Такой atom удобно читать как команду с текущим состоянием. Компонент вызывает `increment(5)`, а знание о том, где лежит `countAtom`, остаётся в модели.',
        },
      ],
    },
    {
      id: 'section-4',
      title: '4. Async atoms: Suspense, loadable и refresh',
      blocks: [
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            'Async atom может вернуть Promise. Если читать его напрямую, React Suspense возьмёт на себя pending\\-состояние, а ошибка уйдёт в Error Boundary. Но иногда нужен более явный UI: loading/error/data в одном компоненте. Для этого есть `loadable`.',
        },
        {
          id: 'text-14',
          type: 'prose',
          markdown:
            'Ещё один частый рецепт — refresh\\-atom. Async atom кешируется до смены зависимостей, поэтому можно завести версию и читать её внутри async atom. Изменили версию — запрос выполняется заново.',
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'tsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: '5. Интеграция с TanStack Query',
      blocks: [
        {
          id: 'text-16',
          type: 'prose',
          markdown:
            'Jotai умеет async atoms, но это не делает его полной заменой TanStack Query. Если нужны query keys, staleTime, retry, invalidation, cache hydration и background refetch, лучше использовать TanStack Query. А если хочется читать query как atom, есть расширение `jotai-tanstack-query`.',
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'tsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: '6. SSR и useHydrateAtoms',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Для SSR в Jotai обычно не сериализуют весь store. На сервере получают JSON\\-данные, а на клиенте точечно гидрируют нужные atoms через `useHydrateAtoms`. Это хорошо сочетается с идеей атомов: каждая страница сама решает, какие atom values ей нужны на старте.',
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'tsx',
          code: example6,
        },
        {
          id: 'text-20',
          type: 'prose',
          markdown:
            'На практике важно не класть в initial data функции, классы, Date без нормализации и другие несериализуемые значения. Сервер должен вернуть простые данные, а клиент — разложить их по atoms.',
        },
      ],
    },
    {
      id: 'section-7',
      title: '7. UI-состояние: модалки, выбранные элементы и derived flags',
      blocks: [
        {
          id: 'text-21',
          type: 'prose',
          markdown:
            'Jotai особенно хорошо подходит для UI\\-состояния. Например, открытие модалки можно вывести из выбранного id: если `selectedUserIdAtom` не равен `null`, модалка открыта. Закрытие — отдельный writable atom, который сбрасывает id.',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'tsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: '8. Утилиты: persist, reset и atom families',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            'В `jotai/utils` есть готовые атомные кирпичики. `atomWithStorage` сохраняет значение в browser storage, `atomWithReset` добавляет сброс к начальному значению, `RESET` можно прокидывать через writable derived atom, а `atomFamily` создаёт atom по параметру.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'tsx',
          code: example8,
        },
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            'Для debounce в базовых утилитах нет одного универсального atom, потому что debounce всегда зависит от сценария: нужно ли хранить текущее значение, debounced значение, состояние таймера и возможность очистки. Поэтому его обычно оформляют отдельным рецептом вокруг нескольких atoms.',
        },
      ],
    },
    {
      id: 'section-9',
      title: '9. Тестирование атомов',
      blocks: [
        {
          id: 'text-26',
          type: 'prose',
          markdown:
            'Атомы удобно тестировать без React\\-компонентов. Создаём изолированный store, вызываем `store.set` для writable atom и проверяем базовые или derived values через `store.get`.',
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'tsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: '10. Шпаргалка: Effector → Jotai',
      blocks: [
        {
          id: 'table-28',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Effector',
            },
            {
              id: 'column-2',
              label: 'Jotai',
            },
            {
              id: 'column-3',
              label: 'Комментарий',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`createStore`',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '`atom(initialValue)`',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Базовая единица состояния',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`store.map`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`atom((get) => ...)`',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Derived state через чтение зависимостей',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`createEvent + sample`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`atom(null, write)`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Операция записи рядом с atom\\-моделью',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`fork`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`createStore + Provider`',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Изоляция экземпляра состояния',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '`serialize(scope)`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`useHydrateAtoms`',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Точечная гидрация нужных atoms',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '`patronum/reset`',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`atomWithReset`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Сброс к начальному значению',
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
      title: 'Итог',
      blocks: [
        {
          id: 'cards-47',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-48',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    'Практический Jotai — это не только `atom(0)` и `useAtom`. В реальном приложении важны изолированные stores, writable atoms как операции, async atoms с управляемым состоянием, SSR\\-гидрация через `useHydrateAtoms`, интеграция с TanStack Query и утилиты для persist/reset/family\\-сценариев. Чем меньше atom отвечает за чужую работу, тем проще поддерживать весь граф состояния.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
