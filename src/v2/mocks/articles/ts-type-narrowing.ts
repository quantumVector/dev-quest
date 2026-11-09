import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-type-narrowing-typeguardssnippet.txt?raw'
import example2 from '../snippets/typescript/ts-type-narrowing-customtypeguardssnippet.txt?raw'
import example3 from '../snippets/typescript/ts-type-narrowing-discriminatedunionssnippet.txt?raw'
import example4 from '../snippets/typescript/ts-type-narrowing-assertionssnippet.txt?raw'
import example5 from '../snippets/typescript/ts-type-narrowing-controlflowsnippet.txt?raw'
import example6 from '../snippets/typescript/ts-type-narrowing-advancednarrowingsnippet.txt?raw'
import example7 from '../snippets/typescript/ts-type-narrowing-commonmistakessnippet.txt?raw'
import example8 from '../snippets/typescript/ts-type-narrowing-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/ts/TypeNarrowing.vue.
export default {
  ...articleSummaries.tsTypeNarrowing,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Сужение типов (Type Narrowing)** — это процесс, при котором TypeScript автоматически уточняет (сужает) тип переменной в определенном контексте кода на основе проверок во время выполнения. Это позволяет безопасно работать с union типами и делает код более type\\-safe без явных приведений типов.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные механизмы сужения',
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
                  text: 'typeof',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    'Проверка примитивных типов: string, number, boolean, symbol, bigint, undefined',
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
                  text: 'instanceof',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Проверка принадлежности объекта к классу через прототипную цепочку',
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
                  text: 'in',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Проверка наличия свойства в объекте для сужения типов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Type Guards - встроенные механизмы',
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
                '**Type Guard** — это выражение, которое проверяет тип во время выполнения и сообщает TypeScript, что в определенной области видимости тип сужен.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Пользовательские Type Guards',
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
                '**Type Predicate:** Функция с возвращаемым типом `value is Type` сообщает TypeScript о сужении типа.',
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Discriminated Unions (Размеченные объединения)',
      blocks: [
        {
          id: 'cards-18',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-19',
              title: 'Что это?',
              blocks: [
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Union типов с общим свойством\\-дискриминантом\n- Дискриминант — обычно строковый литерал\n- TypeScript автоматически сужает по дискриминанту\n- Лучшая практика для union типов\n- Exhaustiveness checking "из коробки"',
                },
              ],
            },
            {
              id: 'card-21',
              title: 'Преимущества',
              blocks: [
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- Автоматическое сужение типов\n- Защита от забытых случаев (never)\n- Читаемый и предсказуемый код\n- Работает с switch и if\n- Идеально для state machines',
                },
              ],
            },
          ],
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Assertion Functions (Функции утверждения)',
      blocks: [
        {
          id: 'callout-24',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-25',
              type: 'prose',
              markdown:
                '**Важно:** Assertion функции с `asserts` выбрасывают ошибку если проверка не пройдена, после чего TypeScript знает, что тип точно соответствует утверждению.',
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Control Flow Analysis (Анализ потока управления)',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown:
            'TypeScript анализирует поток выполнения кода и автоматически сужает типы на основе условий, return, throw, break, continue и других операторов управления потоком.',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Продвинутые техники сужения',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Сравнение методов сужения',
      blocks: [
        {
          id: 'table-30',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Когда использовать',
            },
            {
              id: 'column-3',
              label: 'Плюсы',
            },
            {
              id: 'column-4',
              label: 'Минусы',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`typeof`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Примитивные типы',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Простота, встроенный',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Только для примитивов',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`instanceof`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Экземпляры классов',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Проверка цепочки прототипов',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Не работает с интерфейсами',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`in`',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Проверка свойств',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Работает с объектами',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Не проверяет тип значения',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Type Predicate',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Сложная логика проверки',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Максимальная гибкость',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Нужно писать вручную',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Discriminated Union',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'State machines, события',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Автоматическое сужение',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Требует дискриминант',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Assertion Function',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Валидация входных данных',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Явные ошибки',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Throw вместо boolean',
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
      title: 'Частые ошибки и как их избежать',
      blocks: [
        {
          id: 'code-55',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'code-56',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-57',
          type: 'prose',
          markdown:
            '1. **Что такое Type Narrowing и зачем он нужен?**\n   \n   Type Narrowing — это механизм TypeScript, который автоматически уточняет (сужает) тип переменной на основе проверок во время выполнения. Это позволяет безопасно работать с union типами без явных приведений, делая код более type\\-safe и читаемым.\n2. **В чем разница между Type Guard и Type Predicate?**\n   \n   Type Guard — это любое выражение, которое сужает тип (typeof, instanceof, in). Type Predicate — это специальная функция с возвращаемым типом `value is Type`, которая явно сообщает TypeScript о сужении типа.\n3. **Что такое Discriminated Union и почему это best practice?**\n   \n   Discriminated Union — это union типов с общим свойством\\-дискриминантом (обычно строковый литерал). TypeScript автоматически сужает тип по дискриминанту, что делает код более безопасным и поддерживает exhaustiveness checking через never тип.\n4. **Как работает Control Flow Analysis?**\n   \n   TypeScript анализирует поток выполнения кода и отслеживает изменения типов через условные операторы (if/else, switch), операторы управления потоком (return, throw, break) и проверки truthiness. Это позволяет автоматически сужать типы без явных type guards.\n5. **В чем разница между Type Guard и Assertion Function?**\n   \n   Type Guard возвращает boolean и используется в условиях. Assertion Function использует `asserts` ключевое слово и выбрасывает ошибку при несоответствии типа, после чего TypeScript знает, что тип точно соответствует утверждению во всем последующем коде.\n6. **Когда следует использовать unknown вместо any?**\n   \n   Всегда! unknown требует явной проверки типа перед использованием (type narrowing), в то время как any отключает проверку типов. unknown — это type\\-safe альтернатива any для работы с неизвестными данными (например, из API).\n7. **Что такое exhaustiveness checking и как его реализовать?**\n   \n   Exhaustiveness checking — это проверка того, что все варианты union типа обработаны. Реализуется через default case с типом never: если забыть обработать какой\\-то вариант, TypeScript выдаст ошибку при попытке присвоить необработанное значение в never.\n8. **Как сужение типов работает с generic типами?**\n   \n   С generic типами сужение работает так же, но требует осторожности: если T — union тип, сужение применяется ко всему union. Для более точного контроля используйте overloads, conditional types или проверяйте конкретные типы внутри generic функции.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Производительность и советы',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Использовать discriminated unions\n- Создавать переиспользуемые type guards\n- Документировать сложные проверки\n- Применять exhaustiveness checking\n- Предпочитать unknown вместо any\n- Использовать assertion functions для валидации',
                },
              ],
            },
            {
              id: 'card-62',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Использования any без крайней необходимости\n- Type guards без type predicate\n- Игнорирования null/undefined\n- Неполных проверок объектов\n- ! (non\\-null assertion) без проверки\n- Реассигнации после сужения',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- strictNullChecks обязателен\n- Централизуйте validation логику\n- Используйте branded types\n- Применяйте builder pattern\n- Тестируйте type guards\n- Изучайте conditional types',
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
          id: 'text-68',
          type: 'prose',
          markdown:
            '**Type Narrowing** — это фундаментальный механизм TypeScript для работы с union типами и обеспечения type safety. Основные инструменты: встроенные type guards (typeof, instanceof, in), пользовательские type predicates, discriminated unions, assertion functions и control flow analysis. **Discriminated unions** считаются best practice для сложных union типов благодаря автоматическому сужению и exhaustiveness checking. Правильное использование type narrowing делает код безопаснее, читаемее и предотвращает runtime ошибки на этапе компиляции.',
        },
        {
          id: 'resources-69',
          type: 'resources',
          items: [
            {
              id: 'link-70',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
            },
          ],
        },
        {
          id: 'resources-71',
          type: 'resources',
          items: [
            {
              id: 'link-72',
              label: 'Typeof Type Operator',
              url: 'https://www.typescriptlang.org/docs/handbook/2/typeof-types.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
