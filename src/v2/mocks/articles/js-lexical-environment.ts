import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-lexical-environment-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-lexical-environment-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-lexical-environment-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-lexical-environment-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-lexical-environment-snippet5.txt?raw'
import example6 from '../snippets/javascript/js-lexical-environment-snippet6.txt?raw'

// Content copied verbatim from src/views/js/LexicalEnvironment.vue.
export default {
  ...articleSummaries.jsLexicalEnvironment,
  schemaVersion: 1,
  intro: [],
  sections: [
    {
      id: 'section-1',
      title: 'Краткий ответ для собеседования:',
      blocks: [
        {
          id: 'text-1',
          type: 'prose',
          markdown:
            '**Лексическое окружение** — это структура данных, которая содержит переменные, функции и ссылку на внешнее лексическое окружение. Создается при вызове функции или входе в блок кода.',
        },
        {
          id: 'text-2',
          type: 'prose',
          markdown:
            '**Состоит из:** Environment Record (запись окружения с переменными) + Reference to Outer Environment (ссылка на внешнее окружение). Основа для замыканий и области видимости.',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы лексического окружения',
      blocks: [
        {
          id: 'code-3',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Создание и инициализация',
      blocks: [
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Замыкания и лексическое окружение',
      blocks: [
        {
          id: 'code-5',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Контексты выполнения',
      blocks: [
        {
          id: 'code-6',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Отладка лексического окружения',
      blocks: [
        {
          id: 'code-7',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Продвинутые примеры',
      blocks: [
        {
          id: 'code-8',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Структура лексического окружения',
      blocks: [
        {
          id: 'cards-9',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-10',
              title: 'Environment Record',
              blocks: [
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Declarative Record:** переменные, функции\n- **Object Record:** глобальные объекты\n- **Function Record:** параметры, arguments\n- **Module Record:** импорты/экспорты',
                },
              ],
            },
            {
              id: 'card-12',
              title: 'Outer Reference',
              blocks: [
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown:
                    '- Ссылка на внешнее окружение\n- Создает цепочку областей видимости\n- null для глобального окружения\n- Определяется при создании функции',
                },
              ],
            },
            {
              id: 'card-14',
              title: 'Этапы жизни',
              blocks: [
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- **Creation:** создание записи\n- **Initialization:** инициализация переменных\n- **Execution:** выполнение кода\n- **Cleanup:** сборка мусора',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Типы областей видимости',
      blocks: [
        {
          id: 'table-16',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Создается',
            },
            {
              id: 'column-3',
              label: 'Переменные',
            },
            {
              id: 'column-4',
              label: 'Особенности',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '**Global**',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'При запуске скрипта',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'var, let, const, function',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Корневое окружение',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Function**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'При вызове функции',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Параметры, var, function, arguments',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Функциональная область',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Block**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'При входе в блок',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'let, const',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Блочная область видимости',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '**Module**',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'При загрузке модуля',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'import, export, let, const',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Модульная область',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Eval**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'При выполнении eval',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Зависит от режима',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Динамическое создание',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Hoisting и TDZ',
      blocks: [
        {
          id: 'cards-37',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-38',
              blocks: [
                {
                  id: 'heading-39',
                  type: 'heading',
                  level: 3,
                  text: 'Hoisting (Поднятие)',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- **var:** поднимается и инициализируется как undefined\n- **function:** поднимается полностью\n- **let/const:** поднимаются, но не инициализируются\n- **class:** поднимается, но не инициализируется',
                },
              ],
            },
            {
              id: 'card-41',
              blocks: [
                {
                  id: 'heading-42',
                  type: 'heading',
                  level: 3,
                  text: 'Temporal Dead Zone',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- **Период:** от создания до инициализации\n- **let/const:** находятся в TDZ\n- **Ошибка:** ReferenceError при обращении\n- **Защита:** от использования до объявления',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-44',
          type: 'accordion',
          items: [
            {
              id: 'question-45',
              title: '1. Что такое лексическое окружение?',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Лексическое окружение — это внутренняя структура данных JavaScript, которая связывает идентификаторы переменных с их значениями и содержит ссылку на внешнее лексическое окружение.',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: '**Компоненты:**',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- **Environment Record** — хранит переменные и функции\n- **Outer Environment Reference** — ссылка на внешнее окружение',
                },
              ],
            },
            {
              id: 'question-49',
              title: '2. Как работает цепочка областей видимости?',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '**Ответ:** При поиске переменной JavaScript движется по цепочке от текущего лексического окружения к внешнему, пока не найдет переменную или не достигнет глобального окружения.',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: '**Порядок поиска:**',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '1. Текущее лексическое окружение\n2. Родительское лексическое окружение\n3. ...продолжается до глобального\n4. Если не найдено — ReferenceError',
                },
              ],
            },
            {
              id: 'question-53',
              title: '3. В чем разница между лексической и динамической областью видимости?',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: '**Лексическая область видимости (JavaScript):**',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- Определяется местом объявления в коде\n- Статическая — не изменяется во время выполнения\n- Основа для замыканий',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown: '**Динамическая область видимости:**',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Определяется порядком вызова функций\n- Изменяется во время выполнения\n- Используется в некоторых языках (например, в некоторых диалектах Lisp)',
                },
              ],
            },
            {
              id: 'question-58',
              title: '4. Что такое замыкание и как оно связано с лексическим окружением?',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Замыкание — это функция, которая имеет доступ к переменным из внешней области видимости даже после того, как внешняя функция завершила выполнение.',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '**Механизм:**',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Функция сохраняет ссылку на свое лексическое окружение\n- Лексическое окружение остается в памяти\n- Внутренняя функция может обращаться к внешним переменным',
                },
              ],
            },
            {
              id: 'question-62',
              title: '5. Объясните hoisting в контексте лексического окружения',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Hoisting — это поведение, при котором объявления переменных и функций "поднимаются" в начало их области видимости.',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown: '**На уровне лексического окружения:**',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- **Creation Phase:** создаются привязки для всех объявлений\n- **var:** инициализируется как undefined\n- **let/const:** остаются в TDZ (Temporal Dead Zone)\n- **function:** полностью инициализируется',
                },
              ],
            },
            {
              id: 'question-66',
              title: '6. Как стрелочные функции влияют на лексическое окружение?',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Стрелочные функции не создают собственного контекста this, arguments и не имеют собственного лексического окружения для этих значений.',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown: '**Особенности:**',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- **this:** наследуется из внешнего контекста\n- **arguments:** наследуется или недоступно\n- **super:** наследуется из внешнего контекста\n- **new.target:** наследуется из внешнего контекста',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Практические применения',
      blocks: [
        {
          id: 'cards-70',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-71',
              title: '✅ Правильное использование',
              blocks: [
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- **Модульный паттерн:** приватные переменные\n- **Замыкания:** сохранение состояния\n- **Каррирование:** частичное применение функций\n- **Event handlers:** сохранение контекста\n- **IIFE:** изоляция области видимости',
                },
              ],
            },
            {
              id: 'card-73',
              title: '❌ Частые ошибки',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- **Утечки памяти:** ненужные замыкания\n- **Циклы и замыкания:** проблемы с var\n- **TDZ ошибки:** использование до объявления\n- **Путаница с this:** в стрелочных функциях\n- **Глобальные переменные:** загрязнение глобальной области',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'callout-75',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-76',
              type: 'prose',
              markdown:
                '**Важно:** Понимание лексического окружения помогает писать более эффективный код и избегать утечек памяти.',
            },
          ],
        },
        {
          id: 'cards-77',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: 'Управление памятью',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Избегайте ненужных замыканий\n- Обнуляйте ссылки на большие объекты\n- Используйте WeakMap для слабых ссылок',
                },
              ],
            },
            {
              id: 'card-81',
              blocks: [
                {
                  id: 'heading-82',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Минимизируйте глубину вложенности\n- Используйте let/const вместо var\n- Оптимизируйте поиск переменных',
                },
              ],
            },
            {
              id: 'card-84',
              blocks: [
                {
                  id: 'heading-85',
                  type: 'heading',
                  level: 3,
                  text: 'Отладка',
                },
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Используйте debugger; для остановки\n- Анализируйте Scope в DevTools\n- Проверяйте цепочку областей',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Заключение',
      blocks: [
        {
          id: 'text-87',
          type: 'prose',
          markdown:
            '**Лексическое окружение** — это фундаментальная концепция JavaScript, которая определяет, как работают переменные, области видимости и замыкания. Глубокое понимание этой темы позволяет:',
        },
        {
          id: 'text-88',
          type: 'prose',
          markdown:
            '- Писать более предсказуемый и безопасный код\n- Эффективно использовать замыкания и области видимости\n- Избегать типичных ошибок с hoisting и TDZ\n- Оптимизировать производительность приложений\n- Лучше понимать работу современных JavaScript движков',
        },
        {
          id: 'resources-89',
          type: 'resources',
          items: [
            {
              id: 'link-90',
              label: 'ECMAScript Specification',
              url: 'https://tc39.es/ecma262/#sec-lexical-environments',
            },
          ],
        },
        {
          id: 'resources-91',
          type: 'resources',
          items: [
            {
              id: 'link-92',
              label: 'MDN: Closures',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
