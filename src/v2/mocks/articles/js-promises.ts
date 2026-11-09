import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-promises-callbackhellsnippet.txt?raw'
import example2 from '../snippets/javascript/js-promises-eventssnippet.txt?raw'
import example3 from '../snippets/javascript/js-promises-promisebasicssnippet.txt?raw'
import example4 from '../snippets/javascript/js-promises-promisestatessnippet.txt?raw'
import example5 from '../snippets/javascript/js-promises-promisechainingsnippet.txt?raw'
import example6 from '../snippets/javascript/js-promises-promisemethodssnippet.txt?raw'
import example7 from '../snippets/javascript/js-promises-asyncawaitsnippet.txt?raw'
import example8 from '../snippets/javascript/js-promises-realworldexamplesnippet.txt?raw'

// Content copied verbatim from src/views/js/Promises.vue.
export default {
  ...articleSummaries.jsPromises,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Промисы** появились в ES6 (2015) для решения проблем с асинхронным кодом. До их введения использовались **колбэки (callbacks)** и **события (events)**. Промисы имеют **три состояния**: pending, fulfilled и rejected.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Как работали до промисов?',
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
                  text: 'Проблемы колбэков',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Callback Hell** — глубокая вложенность\n- **Сложность чтения** кода\n- **Дублирование** обработки ошибок\n- **Отсутствие композиции**\n- **Сложность отладки**\n- **Inversion of Control**',
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
                  text: 'Преимущества промисов',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Линейные цепочки** .then()\n- **Единая обработка** ошибок\n- **Композиция** через методы\n- **Читаемый код**\n- **Контроль выполнения**\n- **Стандартизация**',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-9',
          type: 'heading',
          level: 3,
          text: '1. Callback Hell - пирамида doom',
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-11',
          type: 'heading',
          level: 3,
          text: '2. Event-driven подход',
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы промисов',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Три состояния промисов',
      blocks: [
        {
          id: 'callout-14',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-15',
              type: 'prose',
              markdown:
                '**Важно:** Промис может находиться только в одном из трех состояний, и состояние может измениться только один раз (immutable).',
            },
          ],
        },
        {
          id: 'cards-16',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'PENDING',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Начальное состояние',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Промис создан\n- Операция выполняется\n- Результат неизвестен\n- Может перейти в fulfilled или rejected',
                },
              ],
            },
            {
              id: 'card-21',
              blocks: [
                {
                  id: 'heading-22',
                  type: 'heading',
                  level: 3,
                  text: 'FULFILLED',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: 'Успешно выполнен',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- resolve() был вызван\n- Операция завершена успешно\n- Есть результат (value)\n- Состояние неизменно',
                },
              ],
            },
            {
              id: 'card-25',
              blocks: [
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 3,
                  text: 'REJECTED',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown: 'Отклонен',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- reject() был вызван\n- Произошла ошибка\n- Есть причина (reason)\n- Состояние неизменно',
                },
              ],
            },
          ],
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Цепочки промисов (Promise Chaining)',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Статические методы Promise',
      blocks: [
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение методов Promise',
      blocks: [
        {
          id: 'table-32',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Поведение',
            },
            {
              id: 'column-3',
              label: 'Результат',
            },
            {
              id: 'column-4',
              label: 'Когда использовать',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`Promise.all`',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Ждет все, отклоняется при первой ошибке',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Массив результатов',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Все операции критичны',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`Promise.race`',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Возвращает первый завершенный',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Результат первого',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Таймауты, race conditions',
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
                    markdown: '`Promise.allSettled`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Ждет все, не отклоняется',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Массив со статусами',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Нужны все результаты',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`Promise.any`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Первый успешный',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Результат первого успешного',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Fallback стратегии',
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
      title: 'Эволюция: async/await',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Реальный пример: API запросы',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Временная шкала развития',
      blocks: [
        {
          id: 'timeline-51',
          type: 'timeline',
          items: [
            {
              id: 'event-52',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: '1995-2010',
                },
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 3,
                  text: 'Эра колбэков',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: 'XMLHttpRequest, setTimeout, addEventListener - все на колбэках',
                },
              ],
            },
            {
              id: 'event-56',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '2012',
                },
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 3,
                  text: 'Появление библиотек',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: 'jQuery Deferred, Q, Bluebird - первые попытки решить проблему',
                },
              ],
            },
            {
              id: 'event-60',
              blocks: [
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown: '2015',
                },
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: 'ES6 Promises',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: 'Нативная поддержка промисов в JavaScript',
                },
              ],
            },
            {
              id: 'event-64',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown: '2017',
                },
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 3,
                  text: 'ES2017 async/await',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown: 'Синтаксический сахар для промисов',
                },
              ],
            },
            {
              id: 'event-68',
              blocks: [
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown: '2020-2021',
                },
                {
                  id: 'heading-70',
                  type: 'heading',
                  level: 3,
                  text: 'Новые методы',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown: 'Promise.allSettled (ES2020), Promise.any (ES2021)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-72',
          type: 'prose',
          markdown:
            "1. **Какие проблемы решают промисы?**\n   \n   **Callback Hell** (пирамида doom), сложность обработки ошибок, отсутствие композиции, проблема Inversion of Control - когда мы передаем контроль выполнения внешней функции.\n2. **Назовите три состояния промиса**\n   \n   **Pending** (ожидание) - начальное состояние, **Fulfilled** (выполнен) - успешное завершение, **Rejected** (отклонен) - завершение с ошибкой. Состояние может измениться только один раз.\n3. **В чем разница между .then() и .catch()?**\n   \n   `.then()` обрабатывает успешное выполнение (fulfilled), `.catch()` - ошибки (rejected). .catch() - это сокращение для .then(undefined, errorHandler). .then() может принимать два аргумента.\n4. **Что возвращает .then()?**\n   \n   .then() всегда возвращает новый промис. Если колбэк возвращает значение - промис resolved с этим значением. Если возвращает промис - возвращается этот промис. Это позволяет строить цепочки.\n5. **Разница между Promise.all и Promise.allSettled?**\n   \n   `Promise.all` отклоняется при первой ошибке и возвращает массив результатов. `Promise.allSettled` ждет все промисы и возвращает массив объектов с полями status ('fulfilled'/'rejected') и value/reason.\n6. **Что такое microtask queue?**\n   \n   Промисы выполняются в microtask queue, которая имеет более высокий приоритет чем обычная task queue (setTimeout, setInterval). Микрозадачи выполняются после текущего кода, но до макрозадач.\n7. **Можно ли отменить промис?**\n   \n   Нет, нативные промисы нельзя отменить. Но можно использовать AbortController для отмены операций (fetch) или создавать cancelable promises через библиотеки или собственную реализацию с флагами отмены.",
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Паттерны и антипаттерны',
      blocks: [
        {
          id: 'cards-73',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'heading-75',
                  type: 'heading',
                  level: 3,
                  text: '✅ Хорошие практики',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Всегда обрабатывать ошибки (.catch)\n- Возвращать промисы из .then()\n- Использовать Promise.all для параллельности\n- async/await для читаемости\n- Избегать вложенных .then()\n- Использовать finally для очистки',
                },
              ],
            },
            {
              id: 'card-77',
              blocks: [
                {
                  id: 'heading-78',
                  type: 'heading',
                  level: 3,
                  text: '❌ Антипаттерны',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Promise constructor antipattern\n- Забывать return в .then()\n- Смешивать промисы и колбэки\n- Неправильная обработка ошибок\n- Создание ненужных промисов\n- try/catch без await',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Производительность и память',
      blocks: [
        {
          id: 'callout-80',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-81',
              type: 'prose',
              markdown:
                '**Оптимизация:** Промисы создают замыкания и могут вызывать утечки памяти при неправильном использовании. Избегайте создания промисов в циклах без необходимости.',
            },
          ],
        },
        {
          id: 'cards-82',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: 'Память',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Промисы держат ссылки\n- Замыкания в .then()\n- Утечки через цепочки\n- Очистка в .finally()',
                },
              ],
            },
            {
              id: 'card-86',
              blocks: [
                {
                  id: 'heading-87',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Микрозадачи быстрее\n- Параллельность с .all()\n- Избегать await в циклах\n- Переиспользование промисов',
                },
              ],
            },
            {
              id: 'card-89',
              blocks: [
                {
                  id: 'heading-90',
                  type: 'heading',
                  level: 3,
                  text: 'Отладка',
                },
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- Используйте .catch() везде\n- Логирование в .then()\n- Именованные функции\n- DevTools Promise tab',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итоги и выводы',
      blocks: [
        {
          id: 'text-92',
          type: 'prose',
          markdown:
            '**Промисы** кардинально изменили подход к асинхронному программированию в JavaScript:',
        },
        {
          id: 'text-93',
          type: 'prose',
          markdown:
            '- Решили проблему **Callback Hell** через линейные цепочки\n- Унифицировали обработку ошибок через `.catch()`\n- Предоставили мощные методы композиции: `Promise.all`, `Promise.race`\n- Стали основой для `async/await` синтаксиса\n- Позволили создавать переиспользуемый асинхронный код\n- Улучшили читаемость и поддерживаемость кода',
        },
        {
          id: 'text-94',
          type: 'prose',
          markdown:
            'Понимание эволюции от колбэков к промисам помогает лучше понимать современные асинхронные паттерны и делает вас более эффективным JavaScript разработчиком.',
        },
        {
          id: 'resources-95',
          type: 'resources',
          items: [
            {
              id: 'link-96',
              label: 'MDN Promise Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            },
          ],
        },
        {
          id: 'resources-97',
          type: 'resources',
          items: [
            {
              id: 'link-98',
              label: 'JavaScript.info Async',
              url: 'https://javascript.info/async',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
