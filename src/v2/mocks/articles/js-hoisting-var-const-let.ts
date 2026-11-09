import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-hoisting-var-const-let-varhoistingexample.txt?raw'
import example2 from '../snippets/javascript/js-hoisting-var-const-let-letconsthoistingexample.txt?raw'
import example3 from '../snippets/javascript/js-hoisting-var-const-let-functionhoistingexample.txt?raw'
import example4 from '../snippets/javascript/js-hoisting-var-const-let-practicalexamples.txt?raw'
import example5 from '../snippets/javascript/js-hoisting-var-const-let-interviewquestions.txt?raw'
import example6 from '../snippets/javascript/js-hoisting-var-const-let-commonmistakes.txt?raw'
import example7 from '../snippets/javascript/js-hoisting-var-const-let-bestpractices.txt?raw'

// Content copied verbatim from src/views/js/HoistingVarConstLet.vue.
export default {
  ...articleSummaries.jsHoistingVarConstLet,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Hoisting** (поднятие) — это механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало их области видимости. Но поведение кардинально различается для `var`, `let` и `const`.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Краткий ответ на вопрос',
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
                  text: 'var',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: '✅ **Можно обратиться**  \nВозвращает `undefined`',
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
                  text: 'let',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: '❌ **Нельзя обратиться**  \n`ReferenceError`',
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
                  text: 'const',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: '❌ **Нельзя обратиться**  \n`ReferenceError`',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'var: Классическое поднятие',
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
                '**var поднятие:** Объявление переменной поднимается в начало функции или глобальной области, инициализируется как `undefined`. Присваивание остается на месте.',
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
      title: 'let и const: Temporal Dead Zone',
      blocks: [
        {
          id: 'callout-15',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '**Temporal Dead Zone:** let и const тоже поднимаются, но находятся в "мертвой зоне" от начала блока до строки инициализации. Обращение к ним вызывает ReferenceError.',
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
      title: 'Поднятие функций',
      blocks: [
        {
          id: 'code-18',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение типов объявлений',
      blocks: [
        {
          id: 'table-19',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Поднятие',
            },
            {
              id: 'column-3',
              label: 'Инициализация',
            },
            {
              id: 'column-4',
              label: 'Доступ до объявления',
            },
            {
              id: 'column-5',
              label: 'Область видимости',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '**var**',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'undefined',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '✅ undefined',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Функциональная',
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
                    markdown: '**let**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '✅ Да (TDZ)',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Не инициализируется',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '❌ ReferenceError',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Блочная',
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
                    markdown: '**const**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '✅ Да (TDZ)',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Не инициализируется',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '❌ ReferenceError',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Блочная',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '**function**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '✅ Полностью',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Функция',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '✅ Вызов работает',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Функциональная',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Вопросы с собеседований',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые ошибки и заблуждения',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Визуализация процесса',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-44',
              title: 'Фаза компиляции',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '1. Сканирует код\n2. Находит все объявления\n3. `var` → создает и инициализирует undefined\n4. `let/const` → создает, НЕ инициализирует\n5. `function` → создает и инициализирует функцией',
                },
              ],
            },
            {
              id: 'card-46',
              title: 'Фаза выполнения',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '1. Выполняет код построчно\n2. `var` → доступна (undefined)\n3. `let/const` → ReferenceError до инициализации\n4. `function` → полностью доступна\n5. При достижении строки: присваивает значение',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-49',
          type: 'prose',
          markdown:
            '1. **В чем принципиальная разница между hoisting у var и let/const?**\n   \n   var поднимается с инициализацией undefined, поэтому доступен до объявления. let/const поднимаются, но не инициализируются, находятся в Temporal Dead Zone до строки объявления.\n2. **Что такое Temporal Dead Zone?**\n   \n   Это период времени от начала блока (где объявлена let/const переменная) до строки с её инициализацией. В этой зоне переменная существует, но обращение к ней вызывает ReferenceError.\n3. **Почему function declaration поднимается полностью, а function expression - нет?**\n   \n   Function declaration — это отдельная синтаксическая конструкция, которая полностью обрабатывается на этапе компиляции. Function expression — это присваивание значения переменной, поэтому поведение зависит от типа переменной (var/let/const).\n4. **Можно ли обратиться к let переменной в том же блоке до её объявления?**\n   \n   Нет, это вызовет ReferenceError. TDZ действует внутри блока от его начала до строки объявления, независимо от вложенности или других конструкций.\n5. **Как hoisting влияет на производительность?**\n   \n   Современные JS движки оптимизируют hoisting на этапе компиляции. var создает больше неопределенности для оптимизатора, let/const позволяют лучше оптимизировать код благодаря четкой области видимости.\n6. **Что происходит с hoisting в модулях ES6?**\n   \n   В модулях ES6 import/export поднимаются на самый верх модуля. Переменные уровня модуля ведут себя так же, но их область видимости ограничена модулем, а не глобальным объектом.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Когда использовать каждый тип',
      blocks: [
        {
          id: 'cards-50',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-51',
              title: 'var',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: 'Избегать в современном коде:',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- Функциональная область видимости\n- Может создавать неожиданные баги\n- Поддержка legacy кода\n- Совместимость с IE',
                },
              ],
            },
            {
              id: 'card-54',
              title: 'let',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: 'Для изменяемых переменных:',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Блочная область видимости\n- Переменные циклов\n- Условные присваивания\n- Безопасность от hoisting багов',
                },
              ],
            },
            {
              id: 'card-57',
              title: 'const',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: 'По умолчанию для всего:',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- Константы и конфигурации\n- Объекты и массивы\n- Функции и классы\n- Максимальная безопасность',
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
          id: 'text-60',
          type: 'prose',
          markdown:
            '**Hoisting** существует для всех типов объявлений, но работает по-разному. `var` поднимается с инициализацией undefined, поэтому доступна до объявления. `let` и `const` поднимаются, но находятся в Temporal Dead Zone, поэтому вызывают ReferenceError при обращении до инициализации. Понимание этих различий критично для написания предсказуемого и безопасного JavaScript кода.',
        },
        {
          id: 'resources-61',
          type: 'resources',
          items: [
            {
              id: 'link-62',
              label: 'MDN Hoisting',
              url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
            },
          ],
        },
        {
          id: 'resources-63',
          type: 'resources',
          items: [
            {
              id: 'link-64',
              label: 'Temporal Dead Zone',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
