import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-interfaces-and-types-interfacebasicssnippet.txt?raw'
import example2 from '../snippets/typescript/ts-interfaces-and-types-interfaceextensionsnippet.txt?raw'
import example3 from '../snippets/typescript/ts-interfaces-and-types-typebasicssnippet.txt?raw'
import example4 from '../snippets/typescript/ts-interfaces-and-types-advancedtypessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-interfaces-and-types-interfacevstypesnippet.txt?raw'
import example6 from '../snippets/typescript/ts-interfaces-and-types-practicalexamplessnippet.txt?raw'
import example7 from '../snippets/typescript/ts-interfaces-and-types-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/ts/InterfacesAndTypes.vue.
export default {
  ...articleSummaries.tsInterfacesAndTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Interface** и **Type** — два основных способа описания типов в TypeScript. Interface используется для описания структуры объектов и контрактов, Type — более гибкий инструмент для создания псевдонимов типов, union, intersection и сложных типов. Понимание различий критично для эффективной работы с TypeScript.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые различия: Interface vs Type',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Возможность',
            },
            {
              id: 'column-2',
              label: 'Interface',
            },
            {
              id: 'column-3',
              label: 'Type',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-3',
                    type: 'prose',
                    markdown: '**Описание объектов**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '**Наследование (extends)**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '⚠️ Через &amp;',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Declaration Merging**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Union Types**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Примитивные типы**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Tuple Types**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '⚠️ Сложно',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Conditional Types**',
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
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Mapped Types**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
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
                    markdown: 'Быстрее',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Медленнее',
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Сообщения об ошибках**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Понятнее',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Развернутые',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Interface — основы',
      blocks: [
        {
          id: 'callout-33',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-34',
              type: 'prose',
              markdown:
                '**Interface** — декларация контракта для структуры объектов. Идеален для описания формы данных, классов и публичных API.',
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Расширение интерфейсов',
      blocks: [
        {
          id: 'callout-36',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-37',
              type: 'prose',
              markdown:
                '**Declaration Merging** — уникальная особенность Interface. Позволяет расширять существующие интерфейсы, включая глобальные типы.',
            },
          ],
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Type Alias — основы',
      blocks: [
        {
          id: 'callout-39',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-40',
              type: 'prose',
              markdown:
                '**Type** — псевдоним для любого типа. Более мощный и гибкий инструмент, чем Interface, поддерживает union, intersection, conditional и mapped types.',
            },
          ],
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Продвинутые возможности Type',
      blocks: [
        {
          id: 'cards-42',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-43',
              title: 'Conditional Types',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown: 'Типы с условной логикой: `T extends U ? X : Y`',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown: 'Позволяют создавать типы, зависящие от условий',
                },
              ],
            },
            {
              id: 'card-46',
              title: 'Mapped Types',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: 'Трансформация типов: `[P in keyof T]: ...`',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: 'Создание новых типов на основе существующих',
                },
              ],
            },
            {
              id: 'card-49',
              title: 'Template Literal Types',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown: 'Типы\\-шаблоны: `` \\`prefix\\${Type}\\` ``',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: 'Генерация строковых литеральных типов',
                },
              ],
            },
            {
              id: 'card-52',
              title: 'Utility Types',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: 'Встроенные хелперы: `Partial, Pick, Omit...`',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: 'Готовые типы для типичных трансформаций',
                },
              ],
            },
          ],
        },
        {
          id: 'code-55',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Interface vs Type — детальное сравнение',
      blocks: [
        {
          id: 'code-56',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-57',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'code-58',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Встроенные Utility Types',
      blocks: [
        {
          id: 'table-59',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Utility Type',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '`Partial<T>`',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Все свойства необязательные',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`Partial<User>`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '`Required<T>`',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Все свойства обязательные',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '`Required<User>`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '`Readonly<T>`',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Все свойства readonly',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '`Readonly<User>`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`Pick<T, K>`',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Выбрать определенные свойства',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: "`Pick<User, 'id' | 'name'>`",
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '`Omit<T, K>`',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Исключить определенные свойства',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: "`Omit<User, 'password'>`",
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`Record<K, T>`',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Объект с ключами K и значениями T',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '`Record<string, number>`',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '`Exclude<T, U>`',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Исключить типы из union',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '`Exclude<T, null>`',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '`Extract<T, U>`',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Извлечь типы из union',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '`Extract<T, string>`',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '`NonNullable<T>`',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Исключить null и undefined',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '`NonNullable<T>`',
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '`ReturnType<T>`',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Тип возвращаемого значения',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '`ReturnType<typeof fn>`',
                  },
                ],
              ],
            },
            {
              id: 'row-11',
              cells: [
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '`Parameters<T>`',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Tuple типов параметров функции',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '`Parameters<typeof fn>`',
                  },
                ],
              ],
            },
            {
              id: 'row-12',
              cells: [
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: '`Awaited<T>`',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Развернуть тип Promise',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '`Awaited<Promise<T>>`',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-96',
          type: 'prose',
          markdown:
            '1. **В чем основное различие между Interface и Type?**\n   \n   Interface предназначен для описания структуры объектов и поддерживает declaration merging. Type — более гибкий инструмент, поддерживает union, intersection, conditional и mapped types. Type может описывать примитивы и кортежи, Interface — нет.\n2. **Что такое Declaration Merging и когда это полезно?**\n   \n   Declaration Merging — возможность Interface объединять несколько деклараций с одинаковым именем. Полезно для расширения глобальных типов (например, Window), добавления методов в существующие интерфейсы библиотек, или модульного определения больших интерфейсов.\n3. **Когда использовать Interface, а когда Type?**\n   \n   Interface: для объектов, классов, публичных API библиотек, когда нужен extends или merging. Type: для union, tuple, conditional types, mapped types, примитивов, сложных трансформаций. Для простых объектов можно использовать любой вариант.\n4. **Что такое Utility Types и зачем они нужны?**\n   \n   Utility Types — встроенные generic типы для типичных трансформаций: Partial (все необязательные), Pick (выбрать свойства), Omit (исключить свойства), Record (создать объект) и другие. Упрощают работу и делают код более выразительным.\n5. **Как работают Conditional Types?**\n   \n   Conditional Types используют синтаксис `T extends U ? X : Y` для создания типов с условной логикой. С помощью `infer` можно извлекать типы из других типов. Используются для создания гибких generic типов, зависящих от входных типов.\n6. **Что такое Mapped Types?**\n   \n   Mapped Types позволяют трансформировать все свойства существующего типа через синтаксис `[P in keyof T]: ...`. Используются для создания производных типов, например, делая все свойства readonly, optional или изменяя их типы.\n7. **В чем разница между Type и Interface в производительности?**\n   \n   Interface компилируются быстрее, так как TypeScript кэширует их проверки. Type, особенно сложные с условиями и маппингом, могут компилироваться медленнее. На практике разница заметна только в очень больших проектах.\n8. **Как создать тип на основе ключей объекта?**\n   \n   Использовать `keyof` оператор: `type Keys = keyof MyType`. Для получения типа значений по ключам: `MyType[keyof MyType]`. Можно комбинировать с mapped types для сложных трансформаций.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Принятие решения: Interface или Type?',
      blocks: [
        {
          id: 'cards-97',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-98',
              blocks: [
                {
                  id: 'heading-99',
                  type: 'heading',
                  level: 3,
                  text: 'Используйте Interface',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Описание структуры объектов\n- Описание классов и их контрактов\n- Публичные API библиотек\n- Когда нужен extends\n- Когда нужно declaration merging\n- Расширение глобальных типов\n- React компоненты Props\n- Когда важна производительность компиляции',
                },
              ],
            },
            {
              id: 'card-101',
              blocks: [
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 3,
                  text: 'Используйте Type',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Union types (string | number)\n- Tuple types (\\[string, number\\])\n- Примитивные типы (type ID = number)\n- Conditional types (T extends U ? X : Y)\n- Mapped types (\\[P in keyof T\\])\n- Template literal types\n- Сложные трансформации типов\n- Когда нужна максимальная гибкость',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Распространенные ошибки',
      blocks: [
        {
          id: 'cards-104',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-105',
              blocks: [
                {
                  id: 'heading-106',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-107',
                  type: 'prose',
                  markdown:
                    '- Использование I/T префиксов\n- Дублирование типов\n- Глубокая вложенность\n- Использование any\n- Игнорирование Utility Types\n- Неосмысленные имена типов',
                },
              ],
            },
            {
              id: 'card-108',
              blocks: [
                {
                  id: 'heading-109',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    '- Осмысленные имена\n- Использование generics\n- DRY принцип для типов\n- Utility Types где возможно\n- Строгая типизация\n- Документирование сложных типов',
                },
              ],
            },
            {
              id: 'card-111',
              blocks: [
                {
                  id: 'heading-112',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-113',
                  type: 'prose',
                  markdown:
                    '- Используйте unknown вместо any\n- Readonly для неизменяемых данных\n- Type guards для проверок\n- Discriminated unions для state\n- Изучайте advanced types\n- Читайте исходники библиотек',
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
          id: 'text-114',
          type: 'prose',
          markdown:
            '**Interface** и **Type** — два мощных инструмента TypeScript для описания типов. **Interface** идеален для объектов, классов, публичных API и когда нужны extends или declaration merging. **Type** более гибкий: поддерживает union, tuple, conditional и mapped types, подходит для сложных трансформаций и примитивов. В современном TypeScript часто используются оба подхода: Interface для структур данных, Type для сложной типовой логики. Ключ к мастерству — понимание сильных сторон каждого подхода и применение правильного инструмента для конкретной задачи.',
        },
        {
          id: 'resources-115',
          type: 'resources',
          items: [
            {
              id: 'link-116',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
            },
          ],
        },
        {
          id: 'resources-117',
          type: 'resources',
          items: [
            {
              id: 'link-118',
              label: 'Object Types',
              url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
            },
          ],
        },
        {
          id: 'resources-119',
          type: 'resources',
          items: [
            {
              id: 'link-120',
              label: 'Utility Types',
              url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
