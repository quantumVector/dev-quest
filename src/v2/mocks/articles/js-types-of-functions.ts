import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-types-of-functions-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-types-of-functions-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-types-of-functions-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-types-of-functions-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-types-of-functions-snippet5.txt?raw'

// Content copied verbatim from src/views/js/TypesOfFunctions.vue.
export default {
  ...articleSummaries.jsTypesOfFunctions,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'JavaScript предоставляет множество различных типов функций: от встроенных глобальных функций до пользовательских функций различных видов. Понимание всех типов функций критично для эффективной разработки на JavaScript.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Встроенные функции JavaScript',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Классификация встроенных функций',
      blocks: [
        {
          id: 'cards-3',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-4',
              title: 'Глобальные функции',
              blocks: [
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- `parseInt()`, `parseFloat()`\n- `isNaN()`, `isFinite()`\n- `encodeURI()`, `decodeURI()`\n- `eval()` (использовать осторожно)\n- `setTimeout()`, `setInterval()`',
                },
              ],
            },
            {
              id: 'card-6',
              title: 'Методы встроенных объектов',
              blocks: [
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown:
                    '- **Object:** keys, values, entries, assign\n- **Array:** map, filter, reduce, forEach\n- **String:** charAt, substring, split\n- **Math:** max, min, random, floor\n- **Date:** now, getFullYear, getTime',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Пользовательские функции',
      blocks: [
        {
          id: 'code-8',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Типы пользовательских функций',
      blocks: [
        {
          id: 'table-9',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип функции',
            },
            {
              id: 'column-2',
              label: 'Синтаксис',
            },
            {
              id: 'column-3',
              label: 'Hoisting',
            },
            {
              id: 'column-4',
              label: 'this',
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
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**Function Declaration**',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '`function name() {}`',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Основные функции',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Function Expression**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '`const f = function() {}`',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Условные объявления',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '**Arrow Function**',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '`const f = () => {}`',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Лексический',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: "Callback'и, короткие функции",
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Generator**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`function* name() {}`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Итераторы, ленивые вычисления',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Async Function**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`async function() {}`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Асинхронные операции',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '**Constructor**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`function Name() {}`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Новый объект',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Создание объектов',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Специальные типы функций',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Функции для работы с функциями',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Современные возможности функций',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Категории функций по назначению',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-44',
              title: 'По области применения',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- **Утилитарные:** обработка данных\n- **Обработчики событий:** onClick, onSubmit\n- **API функции:** fetch, save, delete\n- **Валидаторы:** проверка данных\n- **Форматеры:** преобразование данных',
                },
              ],
            },
            {
              id: 'card-46',
              title: 'По способу выполнения',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- **Синхронные:** обычные функции\n- **Асинхронные:** async/await, Promise\n- **Генераторы:** yield, итераторы\n- **Рекурсивные:** вызывают сами себя\n- **IIFE:** выполняются сразу',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Функциональные паттерны',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-49',
              title: 'Функции высшего порядка',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Принимают функции как аргументы\n- Возвращают функции\n- map, filter, reduce\n- Декораторы',
                },
              ],
            },
            {
              id: 'card-51',
              title: 'Функциональная композиция',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: '- Pipe и compose\n- Цепочки функций\n- Монады\n- Функторы',
                },
              ],
            },
            {
              id: 'card-53',
              title: 'Оптимизация',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Мемоизация\n- Throttling/Debouncing\n- Ленивые вычисления\n- Once функции',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Вопросы для собеседования',
      blocks: [
        {
          id: 'text-55',
          type: 'prose',
          markdown:
            "1. **В чем разница между Function Declaration и Function Expression?**\n   \n   Function Declaration поднимается (hoisting), можно вызывать до объявления. Function Expression не поднимается, создается только при выполнении кода.\n2. **Когда использовать стрелочные функции, а когда обычные?**\n   \n   Стрелочные — для коротких функций, callback'ов, когда нужен лексический this. Обычные — для методов объектов, конструкторов, когда нужен динамический this.\n3. **Что такое замыкание и как создать приватные переменные?**\n   \n   Замыкание — функция + лексическое окружение. Внутренняя функция имеет доступ к переменным внешней функции даже после её завершения.\n4. **В чем разница между call, apply и bind?**\n   \n   call/apply сразу вызывают функцию с заданным this. call принимает аргументы по отдельности, apply — массивом. bind создает новую функцию с привязанным this.\n5. **Что такое каррирование и частичное применение?**\n   \n   Каррирование — преобразование функции от многих аргументов в последовательность функций от одного аргумента. Частичное применение — фиксация части аргументов.\n6. **Как работают генераторы и для чего они нужны?**\n   \n   Генераторы приостанавливают выполнение функции (yield) и могут возобновлять его. Используются для итераторов, ленивых вычислений, управления асинхронным кодом.",
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'cards-56',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-57',
              title: 'В React/Vue',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Обработчики событий\n- Lifecycle методы\n- Custom hooks/composables\n- Render функции\n- Вычисляемые свойства',
                },
              ],
            },
            {
              id: 'card-59',
              title: 'В Node.js',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Middleware функции\n- Route handlers\n- Stream обработчики\n- Утилиты для работы с данными\n- API контроллеры',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-62',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Использовать чистые функции\n- Избегать глубокой вложенности\n- Применять деструктуризацию\n- Использовать осмысленные имена\n- Проверять типы аргументов',
                },
              ],
            },
            {
              id: 'card-65',
              blocks: [
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- Функции с побочными эффектами\n- Слишком длинные функции\n- Избыточное использование eval\n- Неконтролируемые замыкания\n- Игнорирование контекста this',
                },
              ],
            },
            {
              id: 'card-68',
              blocks: [
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Производительность рекурсии\n- Утечки памяти в замыканиях\n- this в стрелочных функциях\n- Hoisting особенности\n- Async/await ошибки',
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
          id: 'text-71',
          type: 'prose',
          markdown:
            'JavaScript предоставляет богатый набор функций: встроенные глобальные функции и методы объектов для повседневных задач, различные способы создания пользовательских функций (declaration, expression, arrow), специализированные функции (генераторы, async, конструкторы) и функциональные паттерны (HOF, замыкания, каррирование). Понимание всех типов функций и их особенностей критично для эффективной разработки на JavaScript.',
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'MDN Functions Guide',
              url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
