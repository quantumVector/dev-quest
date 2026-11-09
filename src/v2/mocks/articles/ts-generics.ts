import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-generics-inline1.txt?raw'
import example2 from '../snippets/typescript/ts-generics-inline2.txt?raw'
import example3 from '../snippets/typescript/ts-generics-inline3.txt?raw'
import example4 from '../snippets/typescript/ts-generics-genericsbasicssnippet.txt?raw'
import example5 from '../snippets/typescript/ts-generics-generictypessnippet.txt?raw'
import example6 from '../snippets/typescript/ts-generics-genericclassessnippet.txt?raw'
import example7 from '../snippets/typescript/ts-generics-genericconstraintssnippet.txt?raw'
import example8 from '../snippets/typescript/ts-generics-advancedgenericssnippet.txt?raw'
import example9 from '../snippets/typescript/ts-generics-practicalexamplessnippet.txt?raw'
import example10 from '../snippets/typescript/ts-generics-inline10.txt?raw'
import example11 from '../snippets/typescript/ts-generics-inline11.txt?raw'
import example12 from '../snippets/typescript/ts-generics-inline12.txt?raw'
import example13 from '../snippets/typescript/ts-generics-inline13.txt?raw'
import example14 from '../snippets/typescript/ts-generics-inline14.txt?raw'
import example15 from '../snippets/typescript/ts-generics-inline15.txt?raw'

// Content copied verbatim from src/views/ts/TypeScriptGenerics.vue.
export default {
  ...articleSummaries.tsTypeScriptGenerics,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Generics (обобщения)** — это механизм TypeScript, позволяющий создавать переиспользуемый код, работающий с различными типами данных, сохраняя при этом типобезопасность. Generics позволяют писать гибкий код без потери информации о типах.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевая концепция',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Основная идея:** Generics позволяют определить "тип\\-переменную", которая будет заменена на конкретный тип при использовании. Это как параметры функции, но для типов.',
            },
          ],
        },
        {
          id: 'cards-4',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-5',
              blocks: [
                {
                  id: 'heading-6',
                  type: 'heading',
                  level: 3,
                  text: '❌ Без Generics',
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
              id: 'card-8',
              blocks: [
                {
                  id: 'heading-9',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Дублирование',
                },
                {
                  id: 'code-10',
                  type: 'code',
                  language: 'typescript',
                  code: example2,
                },
              ],
            },
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: '✅ С Generics',
                },
                {
                  id: 'code-13',
                  type: 'code',
                  language: 'typescript',
                  code: example3,
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
          id: 'code-14',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Generic Types и Interfaces',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Generic Classes',
      blocks: [
        {
          id: 'callout-16',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-17',
              type: 'prose',
              markdown:
                '**Паттерн:** Generic классы особенно полезны для структур данных: Stack, Queue, Tree, List и других контейнеров.',
            },
          ],
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Generic Constraints (Ограничения)',
      blocks: [
        {
          id: 'callout-19',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-20',
              type: 'prose',
              markdown:
                '**Важно:** Constraints позволяют ограничить набор типов, которые можно использовать с generic, обеспечивая дополнительную типобезопасность.',
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Преимущества Generics',
      blocks: [
        {
          id: 'cards-22',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'Ключевые преимущества',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- **Типобезопасность:** Проверка типов на этапе компиляции\n- **Переиспользование:** Один код для разных типов\n- **Читаемость:** Явные типы вместо any\n- **Рефакторинг:** Безопасное изменение типов\n- **Автодополнение:** IDE знает о типах\n- **Документация:** Типы как часть API',
                },
              ],
            },
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: 'Практическая польза',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- **Избежание any:** Нет потери типов\n- **DRY принцип:** Меньше дублирования\n- **Композиция:** Легко комбинировать типы\n- **Эволюция кода:** Легко добавлять новые типы\n- **Ошибки раньше:** На компиляции, а не в runtime\n- **Уверенность:** Код работает как ожидается',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Продвинутые техники',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'typescript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда использовать Generics?',
      blocks: [
        {
          id: 'cards-31',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: '✅ Используйте',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Структуры данных (Stack, Queue, List)\n- Утилитарные функции (map, filter, reduce)\n- API обертки (fetch, axios)\n- React компоненты и хуки\n- Event emitters и observers\n- Repository и DAO паттерны\n- State management (Redux, MobX)\n- Валидация и парсинг данных',
                },
              ],
            },
            {
              id: 'card-35',
              blocks: [
                {
                  id: 'heading-36',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегайте',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- Простые функции с фиксированными типами\n- Когда типы всегда одинаковые\n- Overcomplicated abstractions\n- Когда any действительно нужен\n- Слишком много generic параметров (&gt;3)\n- Без четкого понимания зачем\n- Преждевременная абстракция\n- Когда union type достаточно',
                },
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
          id: 'text-38',
          type: 'prose',
          markdown:
            '1. **Что такое Generics и зачем они нужны?**\n   \n   Generics — это механизм создания переиспользуемого кода, работающего с разными типами, сохраняя типобезопасность. Они позволяют избежать дублирования кода и использования any, при этом TypeScript точно знает с какими типами работает код.\n2. **Как объявить generic функцию?**\n   \n   Используя угловые скобки после имени функции: `function name<T>(param: T): T`. T — это параметр типа, который будет заменен на конкретный тип при вызове. Можно использовать несколько параметров: `<T, U, V>`.\n3. **В чем разница между any и Generics?**\n   \n   `any` отключает проверку типов — TypeScript не знает какой тип на самом деле. Generics сохраняют информацию о типе — TypeScript точно знает с чем работает и может проверять корректность операций. Generics = типобезопасный any.\n4. **Что такое generic constraints?**\n   \n   Constraints (ограничения) позволяют ограничить набор типов для generic параметра через `extends`. Например, `<T extends string>` — только string типы, `<T extends { length: number }>` — только типы с свойством length.\n5. **Как работает type inference с Generics?**\n   \n   TypeScript автоматически выводит типы из аргументов функции. Если вызвать `identity(42)`, TypeScript выведет `identity<number>(42)`. Явное указание типа нужно только когда TypeScript не может вывести его автоматически.\n6. **Можно ли задать значение по умолчанию для generic?**\n   \n   Да, используя `<T = DefaultType>`. Например, `function create<T = string>(): T`. Если тип не указан явно и не выведен, будет использован тип по умолчанию.\n7. **Как создать generic class?**\n   \n   Указать параметры типа после имени класса: `class Box<T> { value: T }`. При создании экземпляра указывается конкретный тип: `new Box<number>()`. Методы класса могут использовать эти типы без повторного объявления.\n8. **Что такое keyof с Generics?**\n   \n   `keyof` создает union всех ключей типа. С generics позволяет типобезопасно работать с ключами объекта: `<T, K extends keyof T>` гарантирует, что K — это действительно ключ объекта типа T.\n9. **Как работают Conditional Types с Generics?**\n   \n   Conditional Types используют `T extends U ? X : Y` для создания типов с условной логикой. С `infer` можно извлекать типы: `T extends Array<infer U> ? U : T` извлекает тип элементов массива.\n10. **Сколько generic параметров можно использовать?**\n    \n    Технически неограниченно, но практически больше 3\\-4 редко нужно. Много параметров усложняет понимание кода. Лучше разбить на несколько типов или использовать объекты для группировки. Обычно хватает 1\\-2 параметров.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-39',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Типобезопасность',
            },
            {
              id: 'column-3',
              label: 'Переиспользование',
            },
            {
              id: 'column-4',
              label: 'Читаемость',
            },
            {
              id: 'column-5',
              label: 'Когда использовать',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '`any`',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '⚠️ Плохая',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Избегать, только для миграции',
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
                    markdown: '`unknown`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '⚠️ Ограничено',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '⚠️ Средняя',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Когда тип действительно неизвестен',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Generics**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '✅ Полная',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '✅ Отличное',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '✅ Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Переиспользуемый типобезопасный код',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Union Types**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '⚠️ Среднее',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '✅ Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Фиксированный набор типов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**Overloads**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '❌ Дублирование',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '⚠️ Средняя',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Разное поведение для разных типов',
                  },
                ],
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
          id: 'cards-65',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Использовать осмысленные имена (T, K, V)\n- Добавлять constraints когда нужно\n- Позволять type inference работать\n- Документировать generic параметры\n- Использовать defaults для удобства\n- Тестировать с разными типами',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Слишком много параметров (&gt;3)\n- Generics вместо конкретных типов\n- Overcomplicated constraints\n- Использования any внутри generic\n- Преждевременной абстракции\n- Нечитаемых имен (T1, T2, T3)',
                },
              ],
            },
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Начинайте с простого\n- Рефакторьте в generics по мере роста\n- Используйте Utility Types\n- Изучайте исходники библиотек\n- Практикуйтесь на реальных задачах\n- Читайте TypeScript handbook',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Распространенные ошибки',
      blocks: [
        {
          id: 'cards-75',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-76',
              title: '❌ Неправильно',
              blocks: [
                {
                  id: 'code-77',
                  type: 'code',
                  language: 'typescript',
                  code: example10,
                },
                {
                  id: 'code-78',
                  type: 'code',
                  language: 'typescript',
                  code: example11,
                },
                {
                  id: 'code-79',
                  type: 'code',
                  language: 'typescript',
                  code: example12,
                },
              ],
            },
            {
              id: 'card-80',
              title: '✅ Правильно',
              blocks: [
                {
                  id: 'code-81',
                  type: 'code',
                  language: 'typescript',
                  code: example13,
                },
                {
                  id: 'code-82',
                  type: 'code',
                  language: 'typescript',
                  code: example14,
                },
                {
                  id: 'code-83',
                  type: 'code',
                  language: 'typescript',
                  code: example15,
                },
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
          id: 'text-84',
          type: 'prose',
          markdown:
            '**Generics** — это фундаментальная возможность TypeScript для создания переиспользуемого типобезопасного кода. Они позволяют писать функции, классы и типы, работающие с различными типами данных без потери информации о типах. **Ключевые преимущества:** типобезопасность, переиспользование кода, избежание any, лучшее автодополнение IDE. **Используйте:** для структур данных, утилит, API оберток, React компонентов. **Избегайте:** overcomplicated abstractions, слишком много параметров, преждевременной абстракции. Мастерство в Generics приходит с практикой — начинайте с простых примеров и постепенно усложняйте.',
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'TypeScript Handbook: Generics',
              url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
            },
          ],
        },
        {
          id: 'resources-87',
          type: 'resources',
          items: [
            {
              id: 'link-88',
              label: 'Everyday Types',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
            },
          ],
        },
        {
          id: 'resources-89',
          type: 'resources',
          items: [
            {
              id: 'link-90',
              label: 'TypeScript Playground',
              url: 'https://www.typescriptlang.org/play',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
