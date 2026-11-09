import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-infer-types-snippet1.txt?raw'
import example2 from '../snippets/typescript/ts-infer-types-snippet2.txt?raw'
import example3 from '../snippets/typescript/ts-infer-types-snippet3.txt?raw'
import example4 from '../snippets/typescript/ts-infer-types-snippet4.txt?raw'
import example5 from '../snippets/typescript/ts-infer-types-snippet5.txt?raw'
import example6 from '../snippets/typescript/ts-infer-types-snippet6.txt?raw'

// Content copied verbatim from src/views/ts/InferTypes.vue.
export default {
  ...articleSummaries.tsInferTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Infer Types** — это мощная возможность TypeScript для автоматического извлечения и вывода типов из других типов внутри условных типов (conditional types). Ключевое слово `infer` позволяет TypeScript "угадать" тип на основе структуры и автоматически его извлечь.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое Infer Types?',
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
                '**Важно:** `infer` используется ТОЛЬКО внутри условных типов (T extends Something ? TrueType : FalseType) и позволяет TypeScript автоматически определить и сохранить тип для дальнейшего использования.',
            },
          ],
        },
        {
          id: 'cards-4',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-5',
              title: 'Зачем нужен infer?',
              blocks: [
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown:
                    '- Извлечение типов из функций\n- Распаковка Promise и массивов\n- Получение типов параметров\n- Парсинг строковых литералов\n- Работа с дженериками\n- Создание утилитарных типов',
                },
              ],
            },
            {
              id: 'card-7',
              title: 'Когда использовать?',
              blocks: [
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Нужен тип возврата функции\n- Работа с неизвестными типами\n- Создание type\\-safe оберток\n- Построение сложных типов\n- Автоматизация вывода типов\n- Создание библиотечных типов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы работы с Infer',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Решение задачи из вопроса',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Задача:** Создать тип для функции, которая принимает другую функцию и возвращает ее результат, используя Infer Types для вывода типа возвращаемого значения.',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Практические примеры использования Infer',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Множественные Infer в одном типе',
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
      id: 'section-6',
      title: 'Сложные паттерны с Infer',
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
      id: 'section-7',
      title: 'Встроенные утилитарные типы TypeScript',
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
              label: 'Реализация с Infer',
            },
            {
              id: 'column-3',
              label: 'Описание',
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
                    markdown: '`ReturnType<T>`',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '`T extends (...args: any) => infer R`',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Возвращаемый тип функции',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '`Parameters<T>`',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '`T extends (...args: infer P) => any`',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Типы параметров функции',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '`ConstructorParameters<T>`',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '`T extends new (...args: infer P) => any`',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Типы параметров конструктора',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`InstanceType<T>`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '`T extends new (...args: any) => infer R`',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Тип экземпляра класса',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`Awaited<T>`',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '`T extends Promise<infer U>`',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Распаковка Promise',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Ограничения и Edge Cases',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Infer vs Альтернативные подходы',
      blocks: [
        {
          id: 'table-33',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Плюсы',
            },
            {
              id: 'column-3',
              label: 'Минусы',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Infer Types**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '- Автоматический вывод\n- Гибкость\n- Читаемость\n- Композируемость',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown:
                      '- Только в conditional types\n- Может быть сложным\n- Производительность компилятора',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Явные дженерики**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '- Простота\n- Прозрачность\n- Контроль',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '- Многословность\n- Ручное управление\n- Дублирование',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**typeof/keyof**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '- Простые случаи\n- Быстрота',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '- Ограниченные возможности\n- Нет автоматического вывода',
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
          id: 'text-43',
          type: 'prose',
          markdown:
            '1. **Что такое infer в TypeScript и где его можно использовать?**\n   \n   `infer` — это ключевое слово для автоматического вывода типов внутри условных типов. Используется ТОЛЬКО в выражениях `T extends Pattern ? TrueType : FalseType`. Позволяет TypeScript "угадать" и сохранить тип для дальнейшего использования.\n2. **Как извлечь тип возвращаемого значения функции?**\n   \n   Использовать встроенный тип `ReturnType<T>` или создать свой: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never`. Infer R автоматически выведет тип возвращаемого значения.\n3. **В чем разница между infer в позиции параметра и возврата?**\n   \n   Позиция параметра: контравариантность — если несколько типов, берется более общий. Позиция возврата: ковариантность — если несколько типов, создается union. Это связано с variance в системе типов TypeScript.\n4. **Можно ли использовать несколько infer в одном типе?**\n   \n   Да! Можно использовать множество `infer` для извлечения разных частей типа. Например: `T extends (a: infer A, b: infer B) => infer R` извлечет все три типа. Если одно имя используется дважды, TypeScript создаст union или intersection.\n5. **Как распаковать вложенные Promise?**\n   \n   Рекурсивно: `type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T`. Или использовать встроенный `Awaited<T>` (TypeScript 4.5\\+), который делает то же самое.\n6. **Как работает infer с generic типами?**\n   \n   Infer может извлекать типы из дженериков: `T extends Box<infer U> ? U : never`. Это позволяет "распаковывать" обертки типов и получать внутренний тип, что полезно для работы с контейнерными типами.\n7. **Какие есть ограничения у infer?**\n   \n   Работает только в conditional types, не может использоваться напрямую вне условий. При рекурсии может замедлять компилятор. С `any` теряет информацию о типе. С циклическими ссылками может вызвать проблемы производительности.\n8. **Как infer используется в Template Literal Types?**\n   \n   Infer отлично работает с template literals для парсинга строк: `` T extends \\`\\${infer Start}-\\${infer End}\\` `` извлечет части до и после дефиса. Это мощный инструмент для type\\-safe работы со строками.\n9. **Как создать type\\-safe wrapper функции с infer?**\n   \n   Использовать `Parameters<T>` и `ReturnType<T>`: `function wrap<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T>`. Это сохранит все типы исходной функции.\n10. **Что произойдет при infer с never?**\n    \n    `T extends infer U ? U : X` где T = never вернет never, а не X. Never "распространяется" через conditional types. Это важно учитывать при работе с union типами и фильтрацией.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-44',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Использовать встроенные утилиты\n- Давать понятные имена типам\n- Документировать сложные типы\n- Тестировать edge cases\n- Использовать для библиотек\n- Комбинировать с другими типами',
                },
              ],
            },
            {
              id: 'card-48',
              blocks: [
                {
                  id: 'heading-49',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Использования вне conditional types\n- Слишком глубокой рекурсии\n- Неоднозначных имен\n- Избыточной сложности\n- Игнорирования производительности\n- Повторного изобретения встроенных типов',
                },
              ],
            },
            {
              id: 'card-51',
              blocks: [
                {
                  id: 'heading-52',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- Начинать с простых примеров\n- Использовать TypeScript Playground\n- Изучать встроенные типы\n- Читать type definitions\n- Практиковаться на реальных задачах\n- Смотреть на популярные библиотеки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Применение в реальных проектах',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: 'Библиотеки',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- **React:** ComponentProps, ReactElement\n- **Redux:** ActionType, ThunkAction\n- **Express:** RequestHandler типы\n- **GraphQL:** Resolver types\n- **Prisma:** Model types\n- **tRPC:** Procedure types',
                },
              ],
            },
            {
              id: 'card-57',
              title: 'Частые паттерны',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Type\\-safe event emitters\n- API client типизация\n- State management типы\n- Routing типизация\n- Form validation\n- Data transformation pipelines',
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
          id: 'text-59',
          type: 'prose',
          markdown:
            '**Infer Types** — это мощный инструмент TypeScript для автоматического извлечения и вывода типов внутри условных типов. Ключевое слово `infer` позволяет создавать гибкие, переиспользуемые и type\\-safe утилитарные типы. Основные применения: извлечение типов из функций (`ReturnType`, `Parameters`), распаковка Promise и массивов, работа с дженериками, парсинг template literals. Важно помнить, что `infer` работает ТОЛЬКО внутри conditional types и требует понимания variance (ковариантности/контравариантности). Правильное использование infer делает код более безопасным, читаемым и maintainable, особенно при создании библиотек и сложных type\\-level операций.',
        },
        {
          id: 'resources-60',
          type: 'resources',
          items: [
            {
              id: 'link-61',
              label: 'TypeScript Handbook',
              url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types',
            },
          ],
        },
        {
          id: 'resources-62',
          type: 'resources',
          items: [
            {
              id: 'link-63',
              label: 'TypeScript Playground',
              url: 'https://www.typescriptlang.org/play',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
