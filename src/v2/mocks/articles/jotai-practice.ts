import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/jotai/jotai-practice-snippetcounter.txt?raw'
import example2 from '../snippets/jotai/jotai-practice-snippetderived.txt?raw'
import example3 from '../snippets/jotai/jotai-practice-snippetcart.txt?raw'
import example4 from '../snippets/jotai/jotai-practice-snippetwritable.txt?raw'
import example5 from '../snippets/jotai/jotai-practice-snippetstorage.txt?raw'
import example6 from '../snippets/jotai/jotai-practice-snippetasync.txt?raw'
import example7 from '../snippets/jotai/jotai-practice-snippetshop.txt?raw'

// Content copied verbatim from src/views/jotai/JotaiPractice.vue.
export default {
  ...articleSummaries.jotaiJotaiPractice,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Jotai часто воспринимают как "ещё один глобальный стор", но это не самая точная модель. В Redux обычно думают о едином store, actions, reducers и централизованном потоке изменений. В Jotai базовая единица — **atom**: маленький независимый кусочек состояния или вычисления. Приложение получается не одним большим объектом, а графом атомов.',
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
                'Главная мысль: Jotai не про "положить всё в глобальный стор", а про маленькие независимые атомы, из которых собирается состояние приложения.',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужен Jotai',
      blocks: [
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            '`useState` прекрасен для локального состояния: открыт ли dropdown, что введено в input, какой tab выбран внутри компонента. Проблема начинается, когда это состояние нужно нескольким удалённым компонентам. Его приходится поднимать выше, прокидывать props или создавать Context.',
        },
        {
          id: 'text-6',
          type: 'prose',
          markdown:
            'Context решает проблему доступа, но часто приводит к разрастанию провайдеров и лишним перерендерам, если в один context сложили много разных значений. Redux Toolkit даёт строгую архитектуру, devtools и предсказуемость, но для небольшого и среднего UI\\-состояния иногда ощущается тяжеловесно.',
        },
        {
          id: 'text-7',
          type: 'prose',
          markdown:
            'Jotai хорош там, где состояние хочется разбить на независимые кусочки и собирать из них производные значения: фильтры, корзина, тема, модалки, настройки, selected ids, локальные draft\\-данные. Компонент подписывается только на те атомы, которые читает, поэтому обновления получаются точечными.',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Первый atom: глобальный useState',
      blocks: [
        {
          id: 'text-8',
          type: 'prose',
          markdown:
            'Самый простой atom похож на `useState`, вынесенный из компонента. Важно: `atom(0)` описывает единицу состояния, а значение хранится в Jotai store во время работы приложения.',
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'tsx',
          code: example1,
        },
        {
          id: 'text-10',
          type: 'prose',
          markdown:
            '`useAtom(countAtom)` возвращает пару `[value, setter]`. Тот же atom можно использовать в разных компонентах, и они будут видеть одно и то же состояние внутри одного store. Это удобно, но если остановиться только на таком использовании, Jotai и правда будет казаться просто "глобальным useState". Самое интересное начинается с derived atoms.',
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Derived atoms: состояние из состояния',
      blocks: [
        {
          id: 'text-11',
          type: 'prose',
          markdown:
            'Derived atom не обязан хранить своё значение отдельно. Он может вычисляться из других атомов через функцию `get`. Если зависимость меняется, производный atom пересчитывается, а подписанные компоненты получают новое значение.',
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'tsx',
          code: example2,
        },
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            'В этом примере `totalAtom` не хранит отдельное число, которое нужно вручную синхронизировать. Он читает `priceAtom` и `quantityAtom`. Это снижает риск рассинхронизации: нет отдельного reducer case "обновить total".',
        },
        {
          id: 'text-14',
          type: 'prose',
          markdown:
            'Практичный пример — корзина. Список товаров хранится в одном atom, а итоговая сумма и количество считаются из него.',
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'tsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Writable derived atom: бизнес-операции внутри atom',
      blocks: [
        {
          id: 'text-16',
          type: 'prose',
          markdown:
            'Atom может быть не только read\\-only. У него может быть write\\-функция: `atom(read, write)`. Это удобно для бизнес\\-операций: компонент не обязан знать, как именно обновлять корзину, искать существующий товар и увеличивать quantity.',
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'tsx',
          code: example4,
        },
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Такой atom не хранит UI сам по себе. Он описывает действие над графом состояния. Компонент вызывает setter, передаёт product, а детали обновления остаются рядом с атомами корзины. Это похоже на маленький command API без actions/reducers/dispatch\\-шаблона.',
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Persisted state через atomWithStorage',
      blocks: [
        {
          id: 'text-19',
          type: 'prose',
          markdown:
            'Для пользовательских настроек часто нужно пережить перезагрузку страницы: тема, язык, плотность таблицы, скрытые подсказки. Для этого в `jotai/utils` есть `atomWithStorage`.',
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'tsx',
          code: example5,
        },
        {
          id: 'text-21',
          type: 'prose',
          markdown:
            'Важная осторожность с SSR: `localStorage` существует только в браузере. На сервере его нет, поэтому initial render может использовать дефолтное значение, а клиент после маунта прочитает сохранённое. Для тем и визуальных настроек нужно заранее подумать, как избежать мигания интерфейса или mismatch.',
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Async atoms: загрузка данных',
      blocks: [
        {
          id: 'text-22',
          type: 'prose',
          markdown:
            'Atom может вернуть promise. Тогда Jotai умеет работать с async\\-состоянием через React Suspense. Это удобно для небольших запросов, завязанных на UI\\-состояние: например, выбранный userId определяет, какого пользователя загрузить.',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'tsx',
          code: example6,
        },
        {
          id: 'text-24',
          type: 'prose',
          markdown:
            'Если `userIdAtom` изменится, `userAtom` снова выполнит async\\-read. Ошибки из async atom должны обрабатываться Error Boundary. Для полноценного серверного состояния с кешированием, retry, invalidation, pagination и background refetch чаще лучше использовать TanStack Query, а Jotai оставить для UI\\-состояния и композиции.',
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сквозной пример: мини-магазин',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            'В одном небольшом примере видно почти всё: `cartAtom` хранит корзину, `totalPriceAtom` и `totalCountAtom` считаются из неё, `addToCartAtom` инкапсулирует операцию добавления, `themeAtom` сохраняется в storage, `productsAtom` загружает товары, а `filteredProductsAtom` соединяет async\\-данные и поиск.',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'tsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Когда Jotai подходит, а когда нет',
      blocks: [
        {
          id: 'table-27',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Хорошо подходит',
            },
            {
              id: 'column-2',
              label: 'Не всегда лучший выбор',
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
                    markdown: 'Shared UI state: фильтры, тема, модалки, корзина',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Строгая event\\-driven архитектура с audit log всех действий',
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
                    markdown: 'Derived state, который хочется считать из маленьких частей',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Команда уже эффективно работает на Redux Toolkit',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Небольшие и средние приложения без лишнего boilerplate',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Сложное серверное состояние, где лучше TanStack Query',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Точечные подписки компонентов на независимые атомы',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Требование держать все изменения в одном централизованном reducer',
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
          id: 'cards-36',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-37',
              blocks: [
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    'Jotai стоит понимать как граф атомов. Одни атомы хранят значения, другие вычисляются из них, третьи описывают операции записи, четвёртые читают async\\-данные. В результате состояние приложения можно собирать из маленьких независимых частей и обновлять именно тот участок UI, который зависит от изменившегося atom.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
