import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-mapped-types-mappedtypesbasicssnippet.txt?raw'
import example2 from '../snippets/typescript/ts-mapped-types-custompickomitsnippet.txt?raw'
import example3 from '../snippets/typescript/ts-mapped-types-advancedmappedtypessnippet.txt?raw'
import example4 from '../snippets/typescript/ts-mapped-types-conditionalmappedtypessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-mapped-types-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/typescript/ts-mapped-types-comparebuiltinsnippet.txt?raw'
import example7 from '../snippets/typescript/ts-mapped-types-interviewquestionssnippet.txt?raw'

// Content copied verbatim from src/views/ts/TypeScriptMappedTypes.vue.
export default {
  ...articleSummaries.tsTypeScriptMappedTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Mapped Types** — это мощный механизм TypeScript для создания новых типов путем трансформации существующих. Позволяют итерироваться по ключам типа и применять преобразования к каждому свойству. Основа всех встроенных Utility Types (Partial, Pick, Omit, Readonly и др.).',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Синтаксис Mapped Types',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown: '**Базовый синтаксис:** `[P in keyof T]: T[P]`',
            },
            {
              id: 'break-4',
              type: 'line-break',
            },
            {
              id: 'text-5',
              type: 'prose',
              markdown: '• `P in keyof T` — итерация по всем ключам типа T',
            },
            {
              id: 'break-6',
              type: 'line-break',
            },
            {
              id: 'text-7',
              type: 'prose',
              markdown: '• `T[P]` — получение типа значения по ключу P',
            },
            {
              id: 'break-8',
              type: 'line-break',
            },
            {
              id: 'text-9',
              type: 'prose',
              markdown: '• Можно добавлять модификаторы: `readonly`, `?`, `-readonly`, `-?`',
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы Mapped Types',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Реализация собственных Pick и Omit',
      blocks: [
        {
          id: 'callout-11',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-12',
              type: 'prose',
              markdown:
                '**Собеседование:** Вас могут попросить написать свою реализацию Pick и Omit с нуля. Это покажет понимание механизма Mapped Types.',
            },
          ],
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Pick vs Omit — когда что использовать',
      blocks: [
        {
          id: 'table-14',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Pick',
            },
            {
              id: 'column-3',
              label: 'Omit',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Нужно несколько свойств**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Проще',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '⚠️ Сложнее',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Нужно исключить 1\\-2 свойства**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '⚠️ Сложнее',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '✅ Проще',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**API Response (без password)**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Pick 10 свойств',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '✅ Omit 1 свойство',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Preview (только id, name)**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '✅ Pick 2 свойства',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Omit 8 свойств',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Одинаково',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Одинаково',
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
      title: 'Продвинутые Mapped Types',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Conditional Mapped Types',
      blocks: [
        {
          id: 'code-31',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Модификаторы в Mapped Types',
      blocks: [
        {
          id: 'cards-32',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-33',
              title: 'Добавление модификаторов',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- `readonly [P in keyof T]` — добавить readonly\n- `[P in keyof T]?` — сделать опциональным\n- `readonly [P in keyof T]?` — оба модификатора',
                },
              ],
            },
            {
              id: 'card-35',
              title: 'Удаление модификаторов',
              blocks: [
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- `-readonly [P in keyof T]` — убрать readonly\n- `[P in keyof T]-?` — убрать опциональность\n- `-readonly [P in keyof T]-?` — убрать оба',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические примеры из реальных проектов',
      blocks: [
        {
          id: 'code-37',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение с встроенными Utility Types',
      blocks: [
        {
          id: 'callout-38',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-39',
              type: 'prose',
              markdown:
                '**Важно:** Используйте встроенные Utility Types когда возможно — они оптимизированы и компилируются быстрее. Кастомные типы нужны для специфических задач.',
            },
          ],
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Типичные задачи на собеседовании',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            '1. **Что такое Mapped Types и как они работают?**\n   \n   Mapped Types — механизм для создания новых типов путем трансформации существующих. Синтаксис `[P in keyof T]: T[P]` итерируется по всем ключам типа T и применяет преобразования к каждому свойству. Основа всех Utility Types.\n2. **Напишите свою реализацию Pick**\n   \n   `type MyPick<T, K extends keyof T> = { [P in K]: T[P] }`  \n    Итерируемся только по выбранным ключам K и создаем новый тип с этими свойствами.\n3. **Напишите свою реализацию Omit**\n   \n   `type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }`  \n    Используем Exclude для получения ключей без K, затем итерируемся по оставшимся.\n4. **В чем разница между Pick и Omit?**\n   \n   Pick выбирает указанные свойства (whitelist), Omit исключает указанные свойства (blacklist). Pick проще когда нужно несколько свойств, Omit — когда нужно исключить 1\\-2 свойства.\n5. **Что делают модификаторы \\-readonly и \\-? ?**\n   \n   `-readonly` удаляет модификатор readonly из свойства, `-?` удаляет опциональность. Без минуса модификаторы добавляются. Это позволяет делать свойства изменяемыми и обязательными.\n6. **Как работает синтаксис \\[K in keyof T as ...\\]?**\n   \n   `as` позволяет переименовывать ключи во время маппинга. Например, ``[K in keyof T as \\`get\\${Capitalize<K>}\\`]`` добавит префикс "get" ко всем ключам. Можно использовать template literal types и conditional types.\n7. **Как отфильтровать свойства по типу значения?**\n   \n   Использовать conditional type в as: `[K in keyof T as T[K] extends U ? K : never]`. Если тип значения не соответствует U, ключ становится never и исключается из результата.\n8. **Можно ли сделать рекурсивный Mapped Type?**\n   \n   Да, например DeepReadonly: `type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] }`. Рекурсивно применяет readonly ко всем вложенным объектам.\n9. **Когда использовать кастомные Mapped Types вместо встроенных?**\n   \n   Когда встроенных недостаточно для задачи: нужна трансформация ключей, фильтрация по типу, комбинация нескольких трансформаций, domain\\-specific типы (геттеры, валидаторы, API типы). Для стандартных операций используйте встроенные — они быстрее.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Паттерны использования Mapped Types',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-44',
              title: 'Когда использовать',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- Трансформация API типов\n- Создание форм состояния\n- Генерация геттеров/сеттеров\n- Валидационные схемы\n- Event handlers типизация\n- Конвертация naming conventions\n- Создание immutable типов\n- Query builders типизация',
                },
              ],
            },
            {
              id: 'card-46',
              title: 'Альтернативы',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- **Встроенные Utility Types:** для стандартных операций\n- **Intersection Types:** для объединения типов\n- **Conditional Types:** для выбора типа по условию\n- **Template Literal Types:** для работы со строками\n- **Index Signatures:** для динамических ключей',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Использовать встроенные Utility Types\n- Давать осмысленные имена типам\n- Комбинировать с conditional types\n- Документировать сложные типы\n- Тестировать типы через присвоение\n- Использовать as для переименования',
                },
              ],
            },
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Переизобретения встроенных типов\n- Слишком сложных трансформаций\n- Глубокой рекурсии (медленно)\n- Неосмысленных имен типов\n- Mapped Types вместо простых типов\n- Игнорирования производительности',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Изучайте исходники библиотек\n- Практикуйтесь на задачах\n- Используйте TypeScript Playground\n- Читайте официальную документацию\n- Комбинируйте с другими фичами TS\n- Следите за новыми версиями TS',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Производительность компиляции',
      blocks: [
        {
          id: 'table-58',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип операции',
            },
            {
              id: 'column-2',
              label: 'Производительность',
            },
            {
              id: 'column-3',
              label: 'Рекомендация',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Встроенные Utility Types**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '⚡⚡⚡ Очень быстро',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Используйте когда возможно',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Простые Mapped Types**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '⚡⚡ Быстро',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Хорошо для большинства задач',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**Conditional Mapped Types**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '⚡ Средне',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Используйте когда нужно',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Рекурсивные типы (1\\-2 уровня)**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '⚡ Средне',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Допустимо',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '**Глубокая рекурсия (&gt;3 уровней)**',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '🐌 Медленно',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Избегайте или оптимизируйте',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '**Union с Mapped Types**',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '🐌 Медленно',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Кешируйте результат',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-77',
          type: 'prose',
          markdown:
            '**Mapped Types** — это мощнейший инструмент TypeScript для трансформации типов. Синтаксис `[P in keyof T]: T[P]` позволяет итерироваться по ключам и применять преобразования. Реализация **Pick** и **Omit** — частый вопрос на собеседованиях, показывающий понимание механики. **Pick** выбирает свойства (whitelist), **Omit** исключает (blacklist). Модификаторы `readonly`, `?`, `-readonly`, `-?` позволяют добавлять/удалять свойства. Продвинутые техники включают: переименование ключей через `as`, фильтрацию по типу, рекурсивные типы, template literal types. Встроенные Utility Types оптимизированы и компилируются быстрее — используйте их когда возможно. Кастомные Mapped Types нужны для специфических задач: генерация геттеров, валидаторов, API типов, трансформация naming conventions.',
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
            },
          ],
        },
        {
          id: 'resources-80',
          type: 'resources',
          items: [
            {
              id: 'link-81',
              label: 'Utility Types',
              url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
            },
          ],
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'TypeScript Playground',
              url: 'https://www.typescriptlang.org/play',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
