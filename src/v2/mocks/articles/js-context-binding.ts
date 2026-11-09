import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-context-binding-callexamplesnippet.txt?raw'
import example2 from '../snippets/javascript/js-context-binding-applyexamplesnippet.txt?raw'
import example3 from '../snippets/javascript/js-context-binding-bindexamplesnippet.txt?raw'
import example4 from '../snippets/javascript/js-context-binding-comparisonsnippet.txt?raw'
import example5 from '../snippets/javascript/js-context-binding-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/javascript/js-context-binding-arrowfunctionsnippet.txt?raw'
import example7 from '../snippets/javascript/js-context-binding-commonmistakessnippet.txt?raw'
import example8 from '../snippets/javascript/js-context-binding-inline8.txt?raw'
import example9 from '../snippets/javascript/js-context-binding-inline9.txt?raw'

// Content copied verbatim from src/views/js/ContextBinding.vue.
export default {
  ...articleSummaries.jsContextBinding,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Контекст (this)** в JavaScript определяется тем, как функция вызывается, а не где она объявлена. Методы `call`, `apply` и `bind` позволяют явно управлять контекстом выполнения функций. Это критически важно для понимания работы с объектами, событиями и колбэками.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы контекста',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'call()',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Вызывает функцию с указанным this. Аргументы передаются отдельно.',
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
                  text: 'apply()',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'То же что call, но аргументы передаются массивом.',
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
                  text: 'bind()',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Создает новую функцию с привязанным контекстом.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'call() — прямой вызов с контекстом',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Синтаксис:** `func.call(thisArg, arg1, arg2, ...)` — вызывает функцию немедленно с указанным this',
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
      id: 'section-3',
      title: 'apply() — вызов с массивом аргументов',
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
                '**Синтаксис:** `func.apply(thisArg, [argsArray])` — полезен когда аргументы уже в виде массива',
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'bind() — создание функции с привязанным контекстом',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Синтаксис:** `func.bind(thisArg, arg1, arg2, ...)` — возвращает новую функцию, не вызывает исходную',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение методов',
      blocks: [
        {
          id: 'table-21',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Выполнение',
            },
            {
              id: 'column-3',
              label: 'Аргументы',
            },
            {
              id: 'column-4',
              label: 'Возвращает',
            },
            {
              id: 'column-5',
              label: 'Использование',
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
                    markdown: '`call()`',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**Немедленно**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Отдельно',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Результат функции',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Одноразовый вызов',
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
                    markdown: '`apply()`',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Немедленно**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Массивом',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Результат функции',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Работа с массивами',
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
                    markdown: '`bind()`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Создает функцию**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Частичное применение',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Новую функцию',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Колбэки, события',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Стрелочные функции и контекст',
      blocks: [
        {
          id: 'callout-39',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-40',
              type: 'prose',
              markdown:
                '**Важно:** Стрелочные функции НЕ имеют собственного this! Методы call, apply, bind не влияют на их контекст.',
            },
          ],
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые ошибки и их решения',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда использовать каждый метод',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'heading-45',
                  type: 'heading',
                  level: 3,
                  text: 'call()',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- Одноразовый вызов с другим контекстом\n- Заимствование методов\n- Отладка и логирование\n- Вызов родительских конструкторов',
                },
              ],
            },
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: 'apply()',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- Аргументы уже в массиве\n- Math.max/min с массивом\n- Распространение аргументов\n- Работа с arguments',
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
                  text: 'bind()',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Обработчики событий\n- Колбэк-функции\n- Частичное применение\n- React компоненты',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Вопросы на собеседовании',
      blocks: [
        {
          id: 'text-53',
          type: 'prose',
          markdown:
            '1. **В чем разница между call и apply?**\n   \n   call передает аргументы отдельно: `func.call(obj, a, b, c)`, apply передает аргументы массивом: `func.apply(obj, [a, b, c])`. Оба вызывают функцию немедленно.\n2. **Когда использовать bind вместо call/apply?**\n   \n   bind используется когда нужно создать новую функцию с привязанным контекстом для последующих вызовов (события, колбэки). call/apply — для немедленного вызова.\n3. **Что происходит с this в стрелочных функциях?**\n   \n   Стрелочные функции не имеют собственного this, они наследуют контекст из окружающей области видимости. call, apply, bind не влияют на их контекст.\n4. **Как работает частичное применение с bind?**\n   \n   bind может "зафиксировать" не только контекст, но и первые аргументы: `const add5 = add.bind(null, 5)`. При вызове add5(3) получим add(5, 3).\n5. **Можно ли "переопределить" bind?**\n   \n   Нет, результат bind нельзя повторно "перебиндить". Однажды привязанный контекст остается неизменным. `boundFunc.bind(newContext)` не изменит контекст.\n6. **Как заимствовать методы массива?**\n   \n   Используем call/apply: `Array.prototype.slice.call(arrayLike)` превращает array-like объект в настоящий массив. Современная альтернатива: `Array.from()`.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Использовать bind для событий\n- Проверять наличие методов перед call/apply\n- Предпочитать стрелочные функции в колбэках\n- Понимать разницу между методами\n- Кэшировать результат bind\n- Использовать строгий режим',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Использовать bind в render методах React\n- Забывать про потерю контекста в колбэках\n- Путать call и apply местами\n- Использовать стрелочные функции как методы объектов\n- Игнорировать строгий режим\n- Создавать bind в циклах без необходимости',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'callout-61',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-62',
              type: 'prose',
              markdown:
                '**Производительность:** bind создает новую функцию при каждом вызове. В критичных местах (циклы, render) кэшируйте результат или используйте стрелочные функции.',
            },
          ],
        },
        {
          id: 'cards-63',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-64',
              title: 'Медленно ❌',
              blocks: [
                {
                  id: 'code-65',
                  type: 'code',
                  language: 'javascript',
                  code: example8,
                },
              ],
            },
            {
              id: 'card-66',
              title: 'Быстро ✅',
              blocks: [
                {
                  id: 'code-67',
                  type: 'code',
                  language: 'javascript',
                  code: example9,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Современные альтернативы',
      blocks: [
        {
          id: 'table-68',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Задача',
            },
            {
              id: 'column-2',
              label: 'Старый способ',
            },
            {
              id: 'column-3',
              label: 'Современный способ',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Spread аргументов',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '`Math.max.apply(null, arr)`',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '`Math.max(...arr)`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Array-like → Array',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '`Array.prototype.slice.call(nodeList)`',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '`Array.from(nodeList)`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Привязка контекста',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '`func.bind(this)`',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '`() => this.func()`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Частичное применение',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '`func.bind(null, arg1)`',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '`(...args) => func(arg1, ...args)`',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-81',
          type: 'prose',
          markdown:
            '**call** и **apply** вызывают функцию немедленно с заданным контекстом, различаясь способом передачи аргументов. **bind** создает новую функцию с привязанным контекстом для многократного использования. Понимание этих методов критически важно для работы с JavaScript, особенно при работе с событиями, колбэками и объектно-ориентированным программированием.',
        },
        {
          id: 'callout-82',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-83',
              type: 'prose',
              markdown:
                '**Помните:** В современном JavaScript стрелочные функции часто решают проблемы с контекстом проще, но понимание call, apply, bind остается необходимым для работы с legacy кодом и сложными сценариями.',
            },
          ],
        },
        {
          id: 'resources-84',
          type: 'resources',
          items: [
            {
              id: 'link-85',
              label: 'MDN: Function.call()',
              url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/call',
            },
          ],
        },
        {
          id: 'resources-86',
          type: 'resources',
          items: [
            {
              id: 'link-87',
              label: 'MDN: Function.bind()',
              url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
