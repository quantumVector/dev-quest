import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-generics-2-genericsbasicssnippet.txt?raw'
import example2 from '../snippets/typescript/ts-generics-2-extendskeywordsnippet.txt?raw'
import example3 from '../snippets/typescript/ts-generics-2-keyofoperatorsnippet.txt?raw'
import example4 from '../snippets/typescript/ts-generics-2-practicalexamplessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-generics-2-genericsvsexplicitsnippet.txt?raw'
import example6 from '../snippets/typescript/ts-generics-2-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/ts/TypeScriptGenerics2.vue.
export default {
  ...articleSummaries.tsTypeScriptGenerics2,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Generics (обобщения)** — это мощная функция TypeScript, позволяющая создавать переиспользуемые компоненты, которые работают с различными типами данных, сохраняя при этом type safety. Generics позволяют писать функции, классы и интерфейсы, которые работают с типами как с параметрами.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые концепции',
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
                  text: 'Generics',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Параметры типов для создания переиспользуемого кода',
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
                  text: 'Extends',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Ограничения типов и условная логика',
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
                  text: 'Keyof',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Получение ключей типа для type\\-safe операций',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы Generics',
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
                '**Зачем Generics?** Без generics пришлось бы дублировать код для каждого типа или использовать any, теряя type safety.',
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
      title: 'Extends — ограничения и условные типы',
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
                '**Extends** — ключевое слово для ограничения типов и создания условной типовой логики. Два основных применения: constraints (ограничения) и conditional types (условные типы).',
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
      title: 'Keyof — безопасная работа с ключами',
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
                '**Keyof** — оператор, возвращающий union всех ключей типа. Обеспечивает type\\-safe доступ к свойствам объектов.',
            },
          ],
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
      id: 'section-5',
      title: 'Сравнение Extends и Keyof',
      blocks: [
        {
          id: 'table-21',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Возможность',
            },
            {
              id: 'column-2',
              label: 'Extends',
            },
            {
              id: 'column-3',
              label: 'Keyof',
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
                    markdown: '**Основное назначение**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Ограничение типов, условная логика',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Получение ключей типа',
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
                    markdown: '**Применение**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Constraints, conditional types',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Type\\-safe доступ к свойствам',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Результат**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Новый тип или boolean',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Union литеральных типов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '**С generics**',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`<T extends U>`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`<K extends keyof T>`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Комбинация**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-36',
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
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Пример**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`T extends string ? X : Y`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: "`keyof User` → 'id' | 'name'",
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
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Когда использовать Generics, а когда явные типы?',
      blocks: [
        {
          id: 'cards-41',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-42',
              blocks: [
                {
                  id: 'heading-43',
                  type: 'heading',
                  level: 3,
                  text: 'Используйте Generics',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- Переиспользуемые функции/классы\n- Тип "течет" через функцию\n- Работа с коллекциями\n- API клиенты и обертки\n- HOC и utility функции\n- Типизация библиотек\n- State management\n- Форм билдеры и валидаторы',
                },
              ],
            },
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: 'Используйте явные типы',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Специфичная бизнес\\-логика\n- Простые функции\n- UI компоненты с фиксированными props\n- Конфигурационные объекты\n- Доменные модели\n- Константы и enum\n- Единичные use\\-case\n- Когда generic усложняет код',
                },
              ],
            },
          ],
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Критерии выбора подхода',
      blocks: [
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
              label: 'Generics',
            },
            {
              id: 'column-3',
              label: 'Явные типы',
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
                    markdown: '**Переиспользование**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '✅ Отлично',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '⚠️ Дублирование',
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
                    markdown: '**Читаемость**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '⚠️ Может быть сложно',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '✅ Понятно',
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
                    markdown: '**Type Safety**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '✅ Максимальная',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '✅ Хорошая',
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
                    markdown: '**Гибкость**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '✅ Высокая',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '⚠️ Ограничена',
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
                    markdown: '**Простота отладки**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '⚠️ Сложнее',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '✅ Проще',
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
                    markdown: '**Документация**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '⚠️ Требует больше',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '✅ Самодокументируется',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Производительность компиляции**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '⚠️ Медленнее',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '✅ Быстрее',
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
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'code-71',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые ошибки при работе с Generics',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Излишняя абстракция\n- Generic там где не нужен\n- Непонятные имена (X, Y, Z)\n- Отсутствие constraints\n- Чрезмерная вложенность\n- Игнорирование Utility Types\n- any в generics\n- Недокументированные сложные типы',
                },
              ],
            },
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Осмысленные имена типов\n- Использовать extends для ограничений\n- Документировать сложные типы\n- Тестировать generic типы\n- Предпочитать композицию\n- Использовать Utility Types\n- Держать типы простыми\n- Следовать принципу DRY',
                },
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
          id: 'text-79',
          type: 'prose',
          markdown:
            '1. **Что такое Generics и зачем они нужны?**\n   \n   Generics — это параметры типов, позволяющие создавать переиспользуемый код, работающий с различными типами данных при сохранении type safety. Они решают проблему дублирования кода для разных типов и избавляют от необходимости использовать any.\n2. **В чем разница между &lt;T extends U&gt; и &lt;T, U&gt;?**\n   \n   `<T extends U>` — ограничение (constraint): T должен быть подтипом U. `<T, U>` — два независимых параметра типа без ограничений. Extends обеспечивает type safety, гарантируя что T имеет определенные свойства или методы.\n3. **Как работает keyof и зачем он нужен?**\n   \n   `keyof T` возвращает union всех ключей типа T в виде литеральных типов. Используется для type\\-safe доступа к свойствам объектов, создания mapped types и обеспечения того, что ключи существуют в типе.\n4. **Что такое conditional types и как они работают?**\n   \n   Conditional types используют синтаксис `T extends U ? X : Y` для создания типов с условной логикой. Если T расширяет (extends) U, результат X, иначе Y. Используются для извлечения типов, фильтрации и создания utility types.\n5. **Когда следует использовать Generics, а когда явные типы?**\n   \n   Generics — когда код переиспользуется с разными типами, тип "течет" через функцию, создаются библиотеки/утилиты. Явные типы — для специфичной бизнес\\-логики, простых функций, UI компонентов. Правило: если тип используется только внутри функции — явный тип проще.\n6. **Как создать Generic React компонент?**\n   \n   Определить интерфейс props с generic параметром: `interface Props<T>`, использовать в компоненте: `function Component<T>(props: Props<T>)`. Пример: универсальный List, Table, Form. TypeScript выведет тип автоматически при использовании.\n7. **Что такое infer и как его использовать?**\n   \n   `infer` используется в conditional types для извлечения типов. Синтаксис: `T extends Array<infer U> ? U : never`. TypeScript "выводит" тип U из T. Применяется для создания utility types вроде ReturnType, Parameters, Awaited.\n8. **Какие есть встроенные Generic Utility Types?**\n   \n   Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited и другие. Они решают типичные задачи трансформации типов и избавляют от необходимости писать собственные утилиты.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Алгоритм принятия решения',
      blocks: [
        {
          id: 'callout-80',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-81',
              type: 'prose',
              markdown: '**Когда писать код, спросите себя:**',
            },
            {
              id: 'text-82',
              type: 'prose',
              markdown:
                '1. Будет ли этот код использоваться с разными типами? **→ Generic**\n2. Типы известны и фиксированы? **→ Явный тип**\n3. Тип передается через функцию и используется в результате? **→ Generic**\n4. Код специфичен для одного use\\-case? **→ Явный тип**\n5. Создается библиотека/утилита? **→ Generic**\n6. Generic усложнит понимание? **→ Явный тип**\n7. Нужна максимальная type safety при переиспользовании? **→ Generic**',
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
          id: 'text-83',
          type: 'prose',
          markdown:
            '**Generics** — мощный инструмент TypeScript для создания переиспользуемого type\\-safe кода. **Extends** позволяет ограничивать типы и создавать условную типовую логику, **keyof** — безопасно работать с ключами объектов. Выбор между generics и явными типами зависит от контекста: generics для переиспользуемых компонентов и библиотек, явные типы для специфичной бизнес\\-логики. Ключ к успеху — найти баланс между гибкостью и простотой, избегая избыточной абстракции. Следуйте принципу: **"Используйте generics когда тип течет через код, явные типы когда структура данных фиксирована"**.',
        },
        {
          id: 'resources-84',
          type: 'resources',
          items: [
            {
              id: 'link-85',
              label: 'TypeScript Generics',
              url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
            },
          ],
        },
        {
          id: 'resources-86',
          type: 'resources',
          items: [
            {
              id: 'link-87',
              label: 'Keyof Operator',
              url: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
            },
          ],
        },
        {
          id: 'resources-88',
          type: 'resources',
          items: [
            {
              id: 'link-89',
              label: 'Conditional Types',
              url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
