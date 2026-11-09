import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-iterators-and-generators-iteratorsnippet.txt?raw'
import example2 from '../snippets/javascript/js-iterators-and-generators-generatorsnippet.txt?raw'
import example3 from '../snippets/javascript/js-iterators-and-generators-asynciteratorsnippet.txt?raw'
import example4 from '../snippets/javascript/js-iterators-and-generators-asyncgeneratorsnippet.txt?raw'
import example5 from '../snippets/javascript/js-iterators-and-generators-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/javascript/js-iterators-and-generators-performancesnippet.txt?raw'

// Content copied verbatim from src/views/js/IteratorsAndGenerators.vue.
export default {
  ...articleSummaries.jsIteratorsAndGenerators,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Итераторы** и **генераторы** — это мощные инструменты JavaScript для работы с последовательностями данных. **Итераторы** предоставляют унифицированный способ обхода коллекций, **генераторы** позволяют создавать итераторы проще, а **асинхронные версии** работают с асинхронными данными.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Iterator Protocol — основа итерации',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Важно:** Итератор — это объект с методом `next()`, который возвращает `{ value, done }`. Итерируемый объект имеет метод `Symbol.iterator`, возвращающий итератор.',
            },
          ],
        },
        {
          id: 'cards-4',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-5',
              blocks: [
                {
                  id: 'heading-6',
                  type: 'heading',
                  level: 3,
                  text: 'Iterator',
                },
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown: 'Объект с методом next(), возвращающим { value, done }',
                },
              ],
            },
            {
              id: 'card-8',
              blocks: [
                {
                  id: 'heading-9',
                  type: 'heading',
                  level: 3,
                  text: 'Iterable',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown: 'Объект с методом \\[Symbol.iterator\\], работает с for...of',
                },
              ],
            },
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: 'Protocol',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown: 'Стандартизированный интерфейс для обхода коллекций',
                },
              ],
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Generator Functions — упрощение создания итераторов',
      blocks: [
        {
          id: 'cards-15',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-16',
              blocks: [
                {
                  id: 'heading-17',
                  type: 'heading',
                  level: 3,
                  text: 'Что такое генератор?',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- **function\\*** — специальный синтаксис\n- **yield** — возврат значения и пауза\n- **return** — завершение с final value\n- **next()** — продолжение выполнения\n- **Ленивые вычисления** по требованию',
                },
              ],
            },
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'heading-20',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    '- **Память** — не хранят все данные сразу\n- **Производительность** — ленивые вычисления\n- **Бесконечные последовательности**\n- **Композиция** — легко комбинируются\n- **Двустороння связь** через next(value)',
                },
              ],
            },
          ],
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Async Iterator — работа с асинхронными данными',
      blocks: [
        {
          id: 'callout-23',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-24',
              type: 'prose',
              markdown:
                '**Отличия:** Асинхронные итераторы используют `Symbol.asyncIterator`, метод `next()` возвращает Promise, используются с `for await...of`.',
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Async Generators — асинхронные генераторы',
      blocks: [
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              title: 'Применение',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- **Потоковая обработка** данных\n- **Пагинация** API запросов\n- **Чтение больших файлов** по частям\n- **Real-time данные** (WebSocket, SSE)\n- **Обработка событий** асинхронно',
                },
              ],
            },
            {
              id: 'card-29',
              title: 'Синтаксис',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- `async function*` — объявление\n- `yield` — может быть async\n- `for await...of` — потребление\n- `await` внутри генератора\n- Возврат Promise из next()',
                },
              ],
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Array',
            },
            {
              id: 'column-3',
              label: 'Iterator',
            },
            {
              id: 'column-4',
              label: 'Generator',
            },
            {
              id: 'column-5',
              label: 'Async Generator',
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
                    markdown: '**Память**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '❌ Все в памяти',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '✅ По одному элементу',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '✅ По одному элементу',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '✅ По одному элементу',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Ленивость**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '❌ Вычисляет сразу все',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ По требованию',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '✅ По требованию',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '✅ По требованию',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**Бесконечность**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Композиция**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '⚠️ Создает копии',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '✅ Легкая',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '✅ Очень легкая',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '✅ С async/await',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Случайный доступ**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '✅ Быстрый O(1)',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '❌ Только последовательный',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '❌ Только последовательный',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '❌ Только последовательный',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Встроенные итерируемые объекты',
      blocks: [
        {
          id: 'cards-60',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-61',
              title: '✅ Итерируемые',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- `Array` — массивы\n- `String` — строки (по символам)\n- `Map` — ключ-значение пары\n- `Set` — уникальные значения\n- `NodeList` — DOM элементы\n- `Arguments` — аргументы функции\n- `TypedArray` — типизированные массивы',
                },
              ],
            },
            {
              id: 'card-63',
              title: '❌ Неитерируемые',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- `Object` — обычные объекты\n- `Number` — числа\n- `Boolean` — булевы значения\n- `Date` — даты\n- `RegExp` — регулярные выражения\n- `Function` — функции\n- `null/undefined`',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-65',
          type: 'accordion',
          items: [
            {
              id: 'question-66',
              title: '**1. Что такое Iterator Protocol и Iterable Protocol?**',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '**Iterator Protocol:** Объект должен иметь метод `next()`, возвращающий `{ value: any, done: boolean }`.',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '**Iterable Protocol:** Объект должен иметь метод `[Symbol.iterator]()`, который возвращает итератор.',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    'Эти протоколы позволяют использовать объекты в `for...of`, деструктуризации, `Array.from()` и других конструкциях.',
                },
              ],
            },
            {
              id: 'question-70',
              title: '**2. В чем разница между Generator и обычной функцией?**',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '**Генераторы:** Могут приостанавливать и возобновлять выполнение с помощью `yield`. Возвращают итератор, поддерживают ленивые вычисления.',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '**Обычные функции:** Выполняются полностью за один вызов, возвращают одно значение или undefined.',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    'Генераторы идеальны для создания последовательностей, обработки потоков данных и экономии памяти.',
                },
              ],
            },
            {
              id: 'question-74',
              title: '**3. Как работает двусторонняя связь в генераторах?**',
              blocks: [
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    'Метод `next(value)` может передавать значения в генератор. Переданное значение становится результатом выражения `yield`.',
                },
                {
                  id: 'inline-code-76',
                  type: 'inline-code',
                  lines: [
                    ' const input = yield "Отправил данные"',
                    ' console.log(input) // Получил данные от next(value) ',
                  ],
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    'Это позволяет создавать интерактивные генераторы и реализовывать корутины.',
                },
              ],
            },
            {
              id: 'question-78',
              title: '**4. Когда использовать async итераторы/генераторы?**',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- **API пагинация:** Последовательная загрузка страниц данных\n- **Файловая обработка:** Чтение больших файлов по частям\n- **Потоковые данные:** WebSocket, Server-Sent Events\n- **Rate limiting:** Контроль скорости обработки запросов\n- **Batch processing:** Обработка данных порциями',
                },
              ],
            },
            {
              id: 'question-80',
              title: '**5. Как остановить бесконечный генератор?**',
              blocks: [
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown: 'Несколько способов:',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- `break` в цикле `for...of`\n- Метод `return()` у итератора\n- Метод `throw()` для генерации исключения\n- Внешний флаг или условие в генераторе',
                },
                {
                  id: 'inline-code-83',
                  type: 'inline-code',
                  lines: [
                    ' const gen = infiniteGenerator()',
                    " gen.return('stopped') // Принудительно завершает ",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Распространенные ошибки',
      blocks: [
        {
          id: 'cards-84',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-85',
              title: '❌ Неправильно',
              blocks: [
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Путать итератор и итерируемый объект\n- Забывать про `done: true` в итераторе\n- Использовать `return` вместо `yield`\n- Не обрабатывать исключения в генераторах\n- Создавать новый итератор в `[Symbol.iterator]`\n- Блокировка в async генераторах',
                },
              ],
            },
            {
              id: 'card-87',
              title: '✅ Правильно',
              blocks: [
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Понимать разницу между протоколами\n- Всегда возвращать `{ value, done }`\n- Использовать `yield` для возврата значений\n- Оборачивать в `try/catch`\n- Кэшировать итератор при необходимости\n- Использовать `yield` с `await`',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Best Practices',
      blocks: [
        {
          id: 'callout-89',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-90',
              type: 'prose',
              markdown:
                '**Рекомендации:** Используйте генераторы для больших данных, async генераторы для I/O операций, кэшируйте результаты при необходимости, и всегда обрабатывайте ошибки.',
            },
          ],
        },
        {
          id: 'cards-91',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-92',
              blocks: [
                {
                  id: 'heading-93',
                  type: 'heading',
                  level: 3,
                  text: 'Память',
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- Используйте генераторы для больших данных\n- Избегайте накопления в массивах\n- Предпочитайте lazy evaluation\n- Контролируйте размер буферов',
                },
              ],
            },
            {
              id: 'card-95',
              blocks: [
                {
                  id: 'heading-96',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Кэшируйте результаты вычислений\n- Используйте async для I/O\n- Избегайте блокирующих операций\n- Мониторьте утечки памяти',
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
                  text: 'Надежность',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Обрабатывайте все ошибки\n- Предусматривайте отмену операций\n- Тестируйте граничные случаи\n- Документируйте поведение API',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-101',
          type: 'prose',
          markdown:
            '**Итераторы и генераторы** — мощные инструменты для работы с последовательностями данных в JavaScript. **Обычные итераторы** подходят для простых случаев, **генераторы** упрощают создание сложных итераторов, а **асинхронные версии** идеальны для работы с I/O операциями и потоковыми данными. Правильное использование этих конструкций позволяет создавать эффективные и элегантные решения для обработки больших объемов данных без блокировки интерфейса.',
        },
        {
          id: 'resources-102',
          type: 'resources',
          items: [
            {
              id: 'link-103',
              label: 'MDN Iterators',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators',
            },
          ],
        },
        {
          id: 'resources-104',
          type: 'resources',
          items: [
            {
              id: 'link-105',
              label: 'JavaScript.info',
              url: 'https://javascript.info/generators',
            },
          ],
        },
        {
          id: 'resources-106',
          type: 'resources',
          items: [
            {
              id: 'link-107',
              label: 'for await...of',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
