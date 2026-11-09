import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-async-js-syncproblemsnippet.txt?raw'
import example2 from '../snippets/javascript/js-async-js-asyncsolutionsnippet.txt?raw'
import example3 from '../snippets/javascript/js-async-js-eventloopsnippet.txt?raw'
import example4 from '../snippets/javascript/js-async-js-realworldexamplesnippet.txt?raw'
import example5 from '../snippets/javascript/js-async-js-patternssnippet.txt?raw'
import example6 from '../snippets/javascript/js-async-js-errorhandlingsnippet.txt?raw'
import example7 from '../snippets/javascript/js-async-js-performancesnippet.txt?raw'

// Content copied verbatim from src/views/js/AsyncJavaScript.vue.
export default {
  ...articleSummaries.jsAsyncJavaScript,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Асинхронность** в JavaScript позволяет выполнять операции, не блокируя главный поток выполнения. Это критически важно для создания отзывчивых пользовательских интерфейсов и эффективной работы с внешними ресурсами (API, файлы, базы данных). JavaScript является однопоточным языком, поэтому без асинхронности любая длительная операция заморозила бы весь интерфейс.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные причины использования асинхронности',
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
                  text: 'Пользовательский опыт',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Отзывчивый UI** — интерфейс не зависает\n- **Плавные анимации** — 60 FPS без блокировок\n- **Быстрая реакция** — мгновенный отклик на действия\n- **Фоновые операции** — загрузка не мешает работе',
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
                  text: 'Производительность',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Параллельные запросы** — множество операций сразу\n- **Эффективное I/O** — не блокируем ожидание ответа\n- **Оптимальное использование ресурсов** — CPU всегда занят\n- **Масштабируемость** — обработка тысяч соединений',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Проблема синхронного кода',
      blocks: [
        {
          id: 'callout-9',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-10',
              type: 'prose',
              markdown:
                '**Проблема:** В однопоточном JavaScript любая длительная операция блокирует весь поток выполнения, включая обновление UI и обработку пользовательских действий.',
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Решение через асинхронность',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Решение:** Асинхронные операции позволяют выполнять длительные задачи в фоне, не блокируя главный поток. Пользователь может продолжать взаимодействие с интерфейсом.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Event Loop — как это работает',
      blocks: [
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
      title: 'Основные сценарии использования',
      blocks: [
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
                  text: 'Сетевые запросы',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    'HTTP запросы к API, загрузка данных с сервера, отправка форм без перезагрузки страницы',
                },
              ],
            },
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: 'Работа с файлами',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    'Чтение, загрузка и обработка файлов, работа с FileReader API, upload файлов',
                },
              ],
            },
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'Базы данных',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    'IndexedDB, WebSQL, работа с локальным хранилищем, синхронизация данных',
                },
              ],
            },
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: 'Таймеры',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: 'setTimeout, setInterval, анимации, отложенное выполнение задач',
                },
              ],
            },
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: 'События UI',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Обработка кликов, скролла, ввода текста, drag &amp; drop операций',
                },
              ],
            },
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: 'Вычисления',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown: 'Web Workers для тяжелых вычислений, обработка больших массивов данных',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Реальные примеры использования',
      blocks: [
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Паттерны асинхронного программирования',
      blocks: [
        {
          id: 'code-36',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Обработка ошибок',
      blocks: [
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-39',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'Синхронный код',
            },
            {
              id: 'column-3',
              label: 'Асинхронный код',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Блокировка потока**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '❌ Блокирует',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ Не блокирует',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**UI отзывчивость**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '❌ Зависает',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '✅ Остается отзывчивым',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**Параллельные операции**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '❌ Последовательно',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '✅ Параллельно',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Простота кода**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '✅ Простой',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '⚠️ Сложнее',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '**Обработка ошибок**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '✅ try/catch',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '⚠️ Сложнее',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '❌ Низкая',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '✅ Высокая',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            '1. **Зачем нужна асинхронность в JavaScript?**\n   \n   JavaScript однопоточный, поэтому любая длительная операция блокирует главный поток, включая обновление UI. Асинхронность позволяет выполнять операции в фоне, сохраняя отзывчивость интерфейса и эффективно используя ресурсы.\n2. **Что такое Event Loop и как он работает?**\n   \n   Event Loop — механизм, который управляет выполнением кода в JavaScript. Он проверяет Call Stack, и если он пустой, берет задачи из очередей: сначала Microtask Queue (Promise), затем Task Queue (setTimeout, события).\n3. **В чем разница между Promise.all() и Promise.allSettled()?**\n   \n   Promise.all() завершается с ошибкой, если хотя бы один промис отклонен. Promise.allSettled() ждет завершения всех промисов независимо от результата и возвращает массив объектов с статусом и значением каждого промиса.\n4. **Как избежать "callback hell"?**\n   \n   Использовать Promise для цепочек .then(), async/await для линейного кода, разбивать код на отдельные функции, применять библиотеки типа async.js. Современный подход — async/await, который делает асинхронный код читаемым как синхронный.\n5. **Когда использовать async/await, а когда Promise?**\n   \n   async/await — для линейного кода и последовательных операций. Promise.then() — для функциональных цепочек и композиции. Promise.all() — для параллельных операций. Выбор зависит от читаемости и сложности логики.\n6. **Что произойдет, если не обработать отклоненный Promise?**\n   \n   Произойдет "unhandled promise rejection", что может привести к завершению процесса в Node.js или ошибке в консоли браузера. Всегда нужно обрабатывать ошибки через .catch() или try-catch с async/await.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-59',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-60',
              blocks: [
                {
                  id: 'heading-61',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Всегда обрабатывать ошибки\n- Использовать Promise.all() для параллельности\n- Применять async/await для читаемости\n- Избегать блокирующих операций\n- Кешировать промисы при необходимости\n- Использовать timeout для запросов',
                },
              ],
            },
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Синхронных операций в UI\n- Необработанных промисов\n- Глубокой вложенности колбэков\n- Блокирующих циклов\n- Игнорирования ошибок\n- Смешивания промисов и колбэков',
                },
              ],
            },
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Профилируйте производительность\n- Используйте Web Workers для вычислений\n- Применяйте debounce/throttle\n- Мониторьте память при длительных операциях\n- Тестируйте асинхронный код правильно\n- Документируйте асинхронное поведение',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '**Асинхронность** — фундаментальная концепция JavaScript, необходимая для создания отзывчивых и производительных приложений. Она решает проблему блокировки однопоточного движка JavaScript, позволяя эффективно работать с сетевыми запросами, файлами, пользовательскими событиями и другими операциями ввода-вывода. Правильное понимание и использование асинхронности — ключевой навык современного JavaScript разработчика.',
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'MDN Асинхронность',
              url: 'https://developer.mozilla.org/docs/Learn/JavaScript/Asynchronous',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'JavaScript.info',
              url: 'https://javascript.info/async',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
