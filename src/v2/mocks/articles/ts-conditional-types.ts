import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-conditional-types-basicconditionalsnippet.txt?raw'
import example2 from '../snippets/typescript/ts-conditional-types-flattenexamplesnippet.txt?raw'
import example3 from '../snippets/typescript/ts-conditional-types-inferkeywordsnippet.txt?raw'
import example4 from '../snippets/typescript/ts-conditional-types-inline4.txt?raw'
import example5 from '../snippets/typescript/ts-conditional-types-inline5.txt?raw'
import example6 from '../snippets/typescript/ts-conditional-types-distributiveconditionalsnippet.txt?raw'
import example7 from '../snippets/typescript/ts-conditional-types-practicalexamplessnippet.txt?raw'
import example8 from '../snippets/typescript/ts-conditional-types-advancedpatternssnippet.txt?raw'
import example9 from '../snippets/typescript/ts-conditional-types-interviewquestionssnippet.txt?raw'

// Content copied verbatim from src/views/ts/ConditionalTypes.vue.
export default {
  ...articleSummaries.tsConditionalTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Conditional Types** — это мощная возможность TypeScript для создания типов на основе условий. Синтаксис `T extends U ? X : Y` позволяет выбирать один из двух типов в зависимости от того, совместим ли тип T с типом U. Это основа для создания гибких, переиспользуемых типов и Utility Types.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основной синтаксис',
      blocks: [
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
                  markdown: 'T extends U ? X : Y',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: '**T extends U** — проверка, совместим ли тип T с типом U',
                },
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown: '**X** — возвращаемый тип, если условие истинно',
                },
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown: '**Y** — возвращаемый тип, если условие ложно',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Ключевые концепции',
      blocks: [
        {
          id: 'cards-8',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'extends',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Проверка совместимости типов:',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    "- `string extends any` → true\n- `number extends string` → false\n- `'hello' extends string` → true\n- `{ a: 1 } extends object` → true",
                },
              ],
            },
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: 'infer',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: 'Извлечение типа из другого типа:',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    '- Работает только в условных типах\n- Создает "переменную типа"\n- Используется для pattern matching\n- Основа для Utility Types',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Базовые примеры Conditional Types',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Разбор примера: Flatten<T>',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Flatten&lt;T&gt;** — классический пример условного типа, который "разворачивает" массивы, возвращая тип элемента, но оставляет примитивы без изменений.',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Ключевое слово infer',
      blocks: [
        {
          id: 'cards-21',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-22',
              title: 'Что делает infer',
              blocks: [
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown:
                    '- Извлекает тип из сложного типа\n- Создает "временную переменную типа"\n- Работает только в true ветке условия\n- Может извлекать несколько типов\n- Основа для декомпозиции типов',
                },
              ],
            },
            {
              id: 'card-24',
              title: 'Типичные применения',
              blocks: [
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- Получение return type функции\n- Получение параметров функции\n- Распаковка Promise\n- Извлечение элемента массива\n- Получение типа из generic',
                },
              ],
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Дистрибутивные условные типы',
      blocks: [
        {
          id: 'callout-27',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-28',
              type: 'prose',
              markdown:
                '**Важно:** Условные типы дистрибутивны для "голых" (naked) типов\\-параметров. Это значит, что union типы автоматически распределяются по условию.',
            },
          ],
        },
        {
          id: 'cards-29',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-30',
              title: '✅ Дистрибутивный',
              blocks: [
                {
                  id: 'code-31',
                  type: 'code',
                  language: 'typescript',
                  code: example4,
                },
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown: 'X — голый тип параметр',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: '`T<A | B>` → `T<A> | T<B>`',
                },
              ],
            },
            {
              id: 'card-34',
              title: '❌ Не дистрибутивный',
              blocks: [
                {
                  id: 'code-35',
                  type: 'code',
                  language: 'typescript',
                  code: example5,
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown: '\\[X\\] — обернутый тип',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown: '`T<A | B>` → работает с union как единым типом',
                },
              ],
            },
          ],
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-39',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Продвинутые паттерны',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Встроенные Utility Types на основе Conditional Types',
      blocks: [
        {
          id: 'table-41',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Utility Type',
            },
            {
              id: 'column-2',
              label: 'Реализация',
            },
            {
              id: 'column-3',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`Exclude<T, U>`',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '`T extends U ? never : T`',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Исключить типы из union',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`Extract<T, U>`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '`T extends U ? T : never`',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Извлечь типы из union',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '`NonNullable<T>`',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '`T extends null | undefined ? never : T`',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Исключить null/undefined',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '`ReturnType<T>`',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '`T extends (...args: any) => infer R ? R : never`',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Тип возврата функции',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`Parameters<T>`',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '`T extends (...args: infer P) => any ? P : never`',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Типы параметров функции',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`Awaited<T>`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '`T extends Promise<infer U> ? U : T`',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Развернуть Promise',
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
      title: 'Задачи и вопросы на собеседовании',
      blocks: [
        {
          id: 'code-60',
          type: 'code',
          language: 'typescript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-61',
          type: 'prose',
          markdown:
            '1. **Что такое Conditional Types?**\n   \n   Conditional Types — это типы, которые выбираются на основе условия. Синтаксис: `T extends U ? X : Y`. Если тип T совместим с U (может быть присвоен U), то результирующий тип X, иначе Y. Это основа для создания гибких, переиспользуемых типов.\n2. **Как работает type Flatten&lt;T&gt; = T extends any\\[\\] ? T\\[number\\] : T?**\n   \n   Flatten проверяет, является ли T массивом. Если да (T extends any\\[\\]), возвращает тип элемента через `T[number]` (indexed access type). Если нет — возвращает T без изменений. Пример: `Flatten<string[]>` = string, `Flatten<number>` = number.\n3. **Что делает ключевое слово infer?**\n   \n   `infer` позволяет "извлекать" (infer) тип из другого типа внутри условных типов. Создает временную "переменную типа", которую можно использовать в true\\-ветке условия. Пример: `T extends (infer R)[] ? R : never` извлекает тип элемента массива.\n4. **Что такое дистрибутивность условных типов?**\n   \n   Когда условный тип применяется к union типу с "голым" (naked) параметром типа, условие применяется к каждому члену union независимо. `T<A | B>` → `T<A> | T<B>`. Чтобы отключить дистрибутивность, нужно обернуть тип: `[T] extends [U]`.\n5. **Как получить тип возвращаемого значения функции?**\n   \n   Использовать `ReturnType<T>` или создать свой: `type MyReturnType<T> = T extends (...args: any) => infer R ? R : never`. Infer R извлекает тип возврата из сигнатуры функции.\n6. **Как создать тип, который извлекает тип элемента массива?**\n   \n   Два способа: 1) `T[number]` — indexed access type. 2) `T extends (infer E)[] ? E : never` — через infer. Первый способ проще, второй более гибкий и работает с условиями.\n7. **Как развернуть (unwrap) Promise&lt;Promise&lt;T&gt;&gt;?**\n   \n   Рекурсивный условный тип: `type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T`. Проверяет, является ли T промисом, извлекает внутренний тип и рекурсивно применяет снова, пока не дойдет до не\\-промиса.\n8. **В чем разница между Exclude и Omit?**\n   \n   `Exclude<T, U>` работает с union типами, удаляя типы. `Omit<T, K>` работает с типами объектов, удаляя свойства. Exclude — условный тип (`T extends U ? never : T`), Omit использует Pick и Exclude: `Pick<T, Exclude<keyof T, K>>`.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-62',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Использовать для гибких типов\n- Комбинировать с infer\n- Переиспользовать встроенные Utility Types\n- Документировать сложную логику\n- Тестировать с разными типами\n- Использовать never для невозможных кейсов',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Чрезмерной вложенности условий\n- Непонятных имен типов\n- Дублирования встроенных типов\n- Игнорирования дистрибутивности\n- Слишком сложной логики\n- Отсутствия fallback (never)',
                },
              ],
            },
            {
              id: 'card-69',
              blocks: [
                {
                  id: 'heading-70',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Изучите встроенные Utility Types\n- Практикуйтесь на type\\-challenges\n- Используйте type aliases для читаемости\n- Проверяйте дистрибутивность\n- Комбинируйте с Mapped Types\n- Читайте код TypeScript библиотек',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Когда использовать Conditional Types',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-73',
              title: 'Идеально для',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Создания гибких Utility Types\n- Извлечения типов из сложных структур\n- Фильтрации union типов\n- Работы с generic типами\n- Трансформации типов функций\n- Создания type guards на уровне типов\n- Работы с библиотеками и API',
                },
              ],
            },
            {
              id: 'card-75',
              title: 'Альтернативы',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- **Mapped Types:** для трансформации всех свойств\n- **Template Literal Types:** для строк\n- **Union Types:** для простых вариантов\n- **Overloads:** для разных сигнатур функций\n- **Type Guards:** для runtime проверок',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Ресурсы для практики',
      blocks: [
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
                  text: 'Type Challenges',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown: 'Коллекция практических задач на TypeScript типы',
                },
                {
                  id: 'resources-81',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-82',
                      label: 'GitHub',
                      url: 'https://github.com/type-challenges/type-challenges',
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: 'TypeScript Handbook',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown: 'Официальная документация по Conditional Types',
                },
                {
                  id: 'resources-86',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-87',
                      label: 'Docs',
                      url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-88',
              blocks: [
                {
                  id: 'heading-89',
                  type: 'heading',
                  level: 3,
                  text: 'TypeScript Playground',
                },
                {
                  id: 'text-90',
                  type: 'prose',
                  markdown: 'Онлайн редактор для экспериментов с типами',
                },
                {
                  id: 'resources-91',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-92',
                      label: 'Playground',
                      url: 'https://www.typescriptlang.org/play',
                    },
                  ],
                },
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
          id: 'text-93',
          type: 'prose',
          markdown:
            '**Conditional Types** — это фундаментальная возможность TypeScript для создания гибких, переиспользуемых типов на основе условий. Синтаксис `T extends U ? X : Y` вместе с ключевым словом `infer` позволяет извлекать типы, трансформировать их и создавать сложную типовую логику. Тип `Flatten<T> = T extends any[] ? T[number] : T` — классический пример, демонстрирующий, как один тип может обрабатывать и массивы (возвращая тип элемента), и примитивы (возвращая их без изменений). Дистрибутивность условных типов автоматически распределяет union типы, что важно учитывать при проектировании. Понимание Conditional Types критически важно для работы с продвинутыми TypeScript паттернами и успешного прохождения технических собеседований.',
        },
        {
          id: 'resources-94',
          type: 'resources',
          items: [
            {
              id: 'link-95',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
            },
          ],
        },
        {
          id: 'resources-96',
          type: 'resources',
          items: [
            {
              id: 'link-97',
              label: 'Type Challenges',
              url: 'https://github.com/type-challenges/type-challenges',
            },
          ],
        },
        {
          id: 'resources-98',
          type: 'resources',
          items: [
            {
              id: 'link-99',
              label: 'TypeScript Playground',
              url: 'https://www.typescriptlang.org/play',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
