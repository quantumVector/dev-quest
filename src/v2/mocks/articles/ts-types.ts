import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-types-basictypessnippet.txt?raw'
import example2 from '../snippets/typescript/ts-types-anyunknownneversnippet.txt?raw'
import example3 from '../snippets/typescript/ts-types-comparisonsnippet.txt?raw'
import example4 from '../snippets/typescript/ts-types-tuplessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-types-enumssnippet.txt?raw'
import example6 from '../snippets/typescript/ts-types-literaltypessnippet.txt?raw'
import example7 from '../snippets/typescript/ts-types-advancedtypessnippet.txt?raw'

// Content copied verbatim from src/views/ts/TypeScriptTypes.vue.
export default {
  ...articleSummaries.tsTypeScriptTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**TypeScript** расширяет JavaScript статической типизацией, добавляя богатую систему типов. Понимание базовых и продвинутых типов критически важно для эффективной работы и успешного прохождения собеседования.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Базовые типы данных',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              title: 'Примитивные типы',
              blocks: [
                {
                  id: 'text-4',
                  type: 'prose',
                  markdown:
                    '- `boolean` — true/false\n- `number` — числа (int, float)\n- `bigint` — большие целые числа\n- `string` — строки\n- `symbol` — уникальные идентификаторы\n- `null` и `undefined`',
                },
              ],
            },
            {
              id: 'card-5',
              title: 'Составные типы',
              blocks: [
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown:
                    '- `Array` — массивы\n- `Tuple` — кортежи\n- `object` — объекты\n- `enum` — перечисления\n- `void` — отсутствие значения',
                },
              ],
            },
          ],
        },
        {
          id: 'code-7',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Специальные типы: any, unknown, never',
      blocks: [
        {
          id: 'cards-8',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'any',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- Отключает проверку типов\n- Небезопасен\n- Избегайте когда возможно\n- Совместим со всеми типами\n- Используйте только для миграции',
                },
              ],
            },
            {
              id: 'card-12',
              blocks: [
                {
                  id: 'heading-13',
                  type: 'heading',
                  level: 3,
                  text: 'unknown',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown:
                    '- Безопасная альтернатива any\n- Требует проверки типа\n- Топ тип (top type)\n- Рекомендуется вместо any\n- Type\\-safe',
                },
              ],
            },
            {
              id: 'card-15',
              blocks: [
                {
                  id: 'heading-16',
                  type: 'heading',
                  level: 3,
                  text: 'never',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown:
                    '- Тип который никогда не возникает\n- Для функций с throw/infinite loop\n- Боттом тип (bottom type)\n- Exhaustiveness checks\n- Подтип всех типов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
        {
          id: 'heading-19',
          type: 'heading',
          level: 3,
          text: 'Детальное сравнение',
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Tuple — кортежи',
      blocks: [
        {
          id: 'callout-21',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-22',
              type: 'prose',
              markdown:
                '**Tuple** — массив фиксированной длины с известными типами для каждого элемента. В отличие от массива, каждая позиция имеет свой тип.',
            },
          ],
        },
        {
          id: 'table-23',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Array',
            },
            {
              id: 'column-3',
              label: 'Tuple',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Длина**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Динамическая',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Фиксированная',
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
                    markdown: '**Типы элементов**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Один тип для всех',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Разные типы для позиций',
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
                    markdown: '**Индексация**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`T[]` или `Array<T>`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`[T1, T2, T3]`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Методы**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Все методы массива',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Методы массива (с осторожностью)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Коллекции однотипных данных',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Структуры с фиксированными полями',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Enum — перечисления',
      blocks: [
        {
          id: 'cards-40',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-41',
              title: 'Числовые enum',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- По умолчанию начинаются с 0\n- Автоинкремент\n- Обратное отображение\n- Битовые флаги',
                },
              ],
            },
            {
              id: 'card-43',
              title: 'Строковые enum',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- Явные строковые значения\n- Лучше для сериализации\n- Без обратного отображения\n- Более читаемы',
                },
              ],
            },
            {
              id: 'card-45',
              title: 'Const enum',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- Полностью инлайнятся\n- Нет runtime кода\n- Оптимизация производительности\n- Нельзя использовать dynamically',
                },
              ],
            },
          ],
        },
        {
          id: 'code-47',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
        {
          id: 'heading-48',
          type: 'heading',
          level: 3,
          text: 'Enum vs Union Types',
        },
        {
          id: 'table-49',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Критерий',
            },
            {
              id: 'column-2',
              label: 'Enum',
            },
            {
              id: 'column-3',
              label: 'Union Types',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Синтаксис**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '`enum Status { ... }`',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '`type Status = "A" | "B"`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Runtime код**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Генерируется объект',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Нет runtime кода',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Автокомплит**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`Status.Active`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Просто строка `"Active"`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Обратное отображение**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Есть для числовых',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Рефакторинг**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Проще',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Сложнее (строковые литералы)',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**Bundle size**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Больше (без const enum)',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Меньше',
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
      title: 'Literal Types — литеральные типы',
      blocks: [
        {
          id: 'callout-68',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-69',
              type: 'prose',
              markdown:
                '**Литеральные типы** — точные значения вместо общих типов. Более строгая типизация для конкретных значений.',
            },
          ],
        },
        {
          id: 'cards-70',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-71',
              title: 'Преимущества',
              blocks: [
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Строгая типизация\n- Exhaustiveness checking\n- Лучший автокомплит\n- Нет runtime overhead\n- Самодокументируемый код',
                },
              ],
            },
            {
              id: 'card-73',
              title: 'Применение',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Константы конфигурации\n- HTTP методы и статусы\n- Состояния машины состояний\n- CSS значения\n- Дискриминированные union',
                },
              ],
            },
          ],
        },
        {
          id: 'code-75',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Продвинутые техники',
      blocks: [
        {
          id: 'code-76',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-77',
          type: 'prose',
          markdown:
            '1. **Какие базовые типы данных есть в TypeScript?**\n   \n   Примитивные: `boolean`, `number`, `bigint`, `string`, `symbol`, `null`, `undefined`. Составные: массивы, tuple, object, enum. Специальные: `any`, `unknown`, `never`, `void`.\n2. **Что такое tuple и чем отличается от массива?**\n   \n   Tuple — массив фиксированной длины с известными типами для каждой позиции. Массив имеет динамическую длину и один тип для всех элементов. Tuple: `[string, number]`, Array: `number[]`.\n3. **В чем разница между any, unknown и never?**\n   \n   `any` отключает проверку типов (небезопасно). `unknown` — безопасная альтернатива any, требует проверки типа. `never` — тип который никогда не возникает, для функций с throw или бесконечными циклами.\n4. **Как использовать enum и когда он нужен?**\n   \n   Enum создает именованный набор констант. Числовые enum поддерживают обратное отображение, строковые — более читаемы. Используйте для статусов, HTTP методов, ролей пользователей. Альтернатива — union types с литералами.\n5. **Что такое литеральные типы и где применяются?**\n   \n   Литеральные типы — точные значения вместо общих типов (`"GET" | "POST"`). Используются для строгой типизации: HTTP методы, CSS значения, состояния, дискриминированные union. Нет runtime overhead.\n6. **Когда использовать unknown вместо any?**\n   \n   Всегда когда тип заранее неизвестен: данные из API, пользовательский ввод, динамический контент. `unknown` безопаснее — требует проверки типа перед использованием. `any` только для legacy кода или миграции.\n7. **Как работает exhaustiveness checking с never?**\n   \n   В switch/if для всех вариантов union, в default присваиваем переменную типа `never`. Если мы забудем обработать вариант, TypeScript покажет ошибку — переменная не может быть присвоена never, так как есть необработанный случай.\n8. **В чем разница между tuple и readonly массивом?**\n   \n   Tuple имеет фиксированную длину и разные типы для позиций: `[string, number]`. Readonly массив запрещает мутации, но длина динамическая и тип один: `readonly number[]`. Можно комбинировать: `readonly [string, number]`.',
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-78',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-79',
              blocks: [
                {
                  id: 'heading-80',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Использовать `unknown` вместо `any`\n- Tuple для фиксированных структур\n- Literal types для константных значений\n- Строковые enum для читаемости\n- Exhaustiveness checking с `never`\n- `as const` для readonly литералов',
                },
              ],
            },
            {
              id: 'card-82',
              blocks: [
                {
                  id: 'heading-83',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- Использования `any` без необходимости\n- Гетерогенных enum (смешанных)\n- Мутации tuple через push/pop\n- Числовых enum без явных значений\n- Перегрузки union types\n- Игнорирования ошибок типов через `@ts-ignore`',
                },
              ],
            },
            {
              id: 'card-85',
              blocks: [
                {
                  id: 'heading-86',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- Union types часто лучше enum\n- Type guards для `unknown`\n- Template literal types для строгости\n- Branded types для ID\n- Именованные элементы tuple\n- Const enum для оптимизации',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итог',
      blocks: [
        {
          id: 'text-88',
          type: 'prose',
          markdown:
            'TypeScript предоставляет богатую систему типов: от базовых примитивов до продвинутых конструкций. **Tuple** — массивы с фиксированной структурой, отличаются от обычных массивов типами элементов. **any** отключает проверку (избегайте), **unknown** — безопасная альтернатива (требует проверки), **never** — для exhaustiveness checks. **Enum** создают именованные константы. **Литеральные типы** обеспечивают точную типизацию конкретных значений. Используйте правильные типы для конкретных задач — это основа type\\-safe кода.',
        },
        {
          id: 'resources-89',
          type: 'resources',
          items: [
            {
              id: 'link-90',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
            },
          ],
        },
        {
          id: 'resources-91',
          type: 'resources',
          items: [
            {
              id: 'link-92',
              label: 'TS Enums',
              url: 'https://www.typescriptlang.org/docs/handbook/enums.html',
            },
          ],
        },
        {
          id: 'resources-93',
          type: 'resources',
          items: [
            {
              id: 'link-94',
              label: 'Literal Types',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
