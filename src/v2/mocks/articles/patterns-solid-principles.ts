import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-solid-principles-srpbadsnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-solid-principles-srpgoodsnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-solid-principles-ocpbadsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-solid-principles-ocpgoodsnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-solid-principles-lspbadsnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-solid-principles-lspgoodsnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-solid-principles-lspreactsnippet.txt?raw'
import example8 from '../snippets/patterns/patterns-solid-principles-ispbadsnippet.txt?raw'
import example9 from '../snippets/patterns/patterns-solid-principles-ispgoodsnippet.txt?raw'
import example10 from '../snippets/patterns/patterns-solid-principles-ispreactsnippet.txt?raw'
import example11 from '../snippets/patterns/patterns-solid-principles-dipbadsnippet.txt?raw'
import example12 from '../snippets/patterns/patterns-solid-principles-dipgoodsnippet.txt?raw'
import example13 from '../snippets/patterns/patterns-solid-principles-dipreactsnippet.txt?raw'
import example14 from '../snippets/patterns/patterns-solid-principles-solidsummarysnippet.txt?raw'

// Content copied verbatim from src/views/patterns/SolidPrinciples.vue.
export default {
  ...articleSummaries.patternsSolidPrinciples,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**SOLID** — это пять принципов объектно\\-ориентированного программирования и проектирования, сформулированных Робертом Мартином. Эти принципы помогают создавать гибкий, масштабируемый и поддерживаемый код. На фронтенде SOLID применяется к компонентам, хукам, сервисам и архитектуре приложения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Обзор принципов SOLID',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Принцип',
            },
            {
              id: 'column-2',
              label: 'Название',
            },
            {
              id: 'column-3',
              label: 'Суть',
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
                    markdown: '**S**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Single Responsibility',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Одна причина для изменения',
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
                    markdown: '**O**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Open/Closed',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Открыт для расширения, закрыт для модификации',
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
                    markdown: '**L**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Liskov Substitution',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Подтипы заменяют базовые типы',
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
                    markdown: '**I**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Interface Segregation',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Клиенты не зависят от ненужных методов',
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
                    markdown: '**D**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Dependency Inversion',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Зависимость от абстракций, а не реализаций',
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
      title: 'S — Single Responsibility Principle (SRP)',
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
                '**Принцип единственной ответственности:** Каждый модуль (компонент, класс, функция) должен иметь только одну причину для изменения.',
            },
          ],
        },
        {
          id: 'heading-20',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение SRP',
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-22',
          type: 'heading',
          level: 3,
          text: '✅ Соблюдение SRP',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'O — Open/Closed Principle (OCP)',
      blocks: [
        {
          id: 'callout-24',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-25',
              type: 'prose',
              markdown:
                '**Принцип открытости/закрытости:** Модули должны быть открыты для расширения, но закрыты для модификации.',
            },
          ],
        },
        {
          id: 'heading-26',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение OCP',
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-28',
          type: 'heading',
          level: 3,
          text: '✅ Соблюдение OCP',
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'L — Liskov Substitution Principle (LSP)',
      blocks: [
        {
          id: 'callout-30',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-31',
              type: 'prose',
              markdown:
                '**Принцип подстановки Барбары Лисков:** Объекты подклассов должны заменять объекты базового класса без нарушения работы программы.',
            },
          ],
        },
        {
          id: 'heading-32',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение LSP',
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
        {
          id: 'heading-34',
          type: 'heading',
          level: 3,
          text: '✅ Соблюдение LSP',
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
        {
          id: 'heading-36',
          type: 'heading',
          level: 3,
          text: 'LSP в React компонентах',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'I — Interface Segregation Principle (ISP)',
      blocks: [
        {
          id: 'callout-38',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-39',
              type: 'prose',
              markdown:
                '**Принцип разделения интерфейса:** Клиенты не должны зависеть от методов, которые они не используют.',
            },
          ],
        },
        {
          id: 'heading-40',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение ISP',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
        {
          id: 'heading-42',
          type: 'heading',
          level: 3,
          text: '✅ Соблюдение ISP',
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'typescript',
          code: example9,
        },
        {
          id: 'heading-44',
          type: 'heading',
          level: 3,
          text: 'ISP в React компонентах',
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'typescript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'D — Dependency Inversion Principle (DIP)',
      blocks: [
        {
          id: 'callout-46',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-47',
              type: 'prose',
              markdown:
                '**Принцип инверсии зависимостей:** Модули верхнего уровня не должны зависеть от модулей нижнего уровня. Оба должны зависеть от абстракций.',
            },
          ],
        },
        {
          id: 'heading-48',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение DIP',
        },
        {
          id: 'code-49',
          type: 'code',
          language: 'typescript',
          code: example11,
        },
        {
          id: 'heading-50',
          type: 'heading',
          level: 3,
          text: '✅ Соблюдение DIP',
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'typescript',
          code: example12,
        },
        {
          id: 'heading-52',
          type: 'heading',
          level: 3,
          text: 'DIP в React через Dependency Injection',
        },
        {
          id: 'code-53',
          type: 'code',
          language: 'typescript',
          code: example13,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'SOLID на фронтенде: сводная таблица',
      blocks: [
        {
          id: 'table-54',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Принцип',
            },
            {
              id: 'column-2',
              label: 'Применение на фронтенде',
            },
            {
              id: 'column-3',
              label: 'Инструменты',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**SRP**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Разделение логики по хукам, компонентам, сервисам',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Custom hooks, модули, утилиты',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '**OCP**',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Расширение через пропсы, композицию, конфигурацию',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Props, HOC, Render Props, Slots',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**LSP**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Совместимые интерфейсы компонентов',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'TypeScript interfaces, Props types',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '**ISP**',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Минимальные, целевые пропсы компонентов',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Props segregation, композиция',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '**DIP**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Dependency Injection через Context, пропсы',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Context API, Props, IoC контейнеры',
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
      title: 'Комплексный пример SOLID',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'typescript',
          code: example14,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Преимущества применения SOLID',
      blocks: [
        {
          id: 'cards-71',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: 'Поддерживаемость',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Понятная структура кода\n- Легкая навигация\n- Быстрые изменения\n- Меньше багов при рефакторинге',
                },
              ],
            },
            {
              id: 'card-75',
              blocks: [
                {
                  id: 'heading-76',
                  type: 'heading',
                  level: 3,
                  text: 'Тестируемость',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Изолированные юнит\\-тесты\n- Легкое моканье зависимостей\n- Высокое покрытие тестами\n- Стабильные интеграционные тесты',
                },
              ],
            },
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: 'Масштабируемость',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Расширение без изменений\n- Добавление фич безопасно\n- Переиспользование кода\n- Гибкая архитектура',
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
          id: 'text-81',
          type: 'prose',
          markdown:
            '1. **Что такое принцип единственной ответственности?**\n   \n   Каждый модуль должен иметь одну причину для изменения. На фронтенде это означает разделение логики на отдельные хуки (useUserApi, useUserValidation), компоненты (UserDisplay, UserForm) и сервисы (UserService, CacheService).\n2. **Как применяется Open/Closed на фронтенде?**\n   \n   Через конфигурацию (варианты стилей), композицию (slots, children), расширение компонентов (HOC, wrapper components). Компонент должен расширяться новыми возможностями через пропсы, а не изменением внутреннего кода.\n3. **Что означает принцип подстановки Лисков для React?**\n   \n   Компоненты\\-потомки должны быть взаимозаменяемы с родительскими без нарушения работы. Например, если компонент принимает BaseInputProps, все его вариации (TextInput, EmailInput) должны работать с теми же пропсами без требования дополнительных.\n4. **Зачем разделять интерфейсы (ISP)?**\n   \n   Чтобы компоненты не зависели от ненужных им пропсов. Вместо одного "толстого" компонента с 20 пропсами лучше создать несколько специализированных с минимальным набором пропсов. Это упрощает использование и тестирование.\n5. **Как реализовать инверсию зависимостей в React?**\n   \n   Через Context API (провайдеры с абстракциями), пропсы (передача зависимостей извне), кастомные хуки (useStorage вместо прямого localStorage). Компонент не создает зависимости, а получает их снаружи.\n6. **Всегда ли нужно следовать SOLID на 100%?**\n   \n   Нет, SOLID — это руководство, а не догма. В простых компонентах допустимо нарушение принципов для читаемости. Главное — понимать компромиссы и применять принципы там, где они дают реальную пользу (сложные компоненты, переиспользуемые библиотеки).',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Практические советы по применению',
      blocks: [
        {
          id: 'cards-82',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Разделять ответственность компонентов\n- Использовать композицию\n- Создавать минимальные интерфейсы\n- Применять Dependency Injection\n- Писать тесты для проверки SOLID\n- Рефакторить при росте сложности',
                },
              ],
            },
            {
              id: 'card-86',
              blocks: [
                {
                  id: 'heading-87',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- "God components" — всё в одном\n- Жесткие зависимости\n- Изменение кода вместо расширения\n- "Толстые" интерфейсы с лишними пропсами\n- Прямое создание зависимостей\n- Игнорирование принципов в сложных модулях',
                },
              ],
            },
            {
              id: 'card-89',
              blocks: [
                {
                  id: 'heading-90',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- Начинайте с SRP\n- Используйте TypeScript для интерфейсов\n- Применяйте code review на SOLID\n- Изучайте паттерны проектирования\n- Рефакторьте постепенно\n- Баланс между принципами и простотой',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-92',
          type: 'prose',
          markdown:
            '**SOLID принципы** применимы на фронтенде и помогают создавать качественный код. **SRP** разделяет ответственность, **OCP** позволяет расширять без изменений, **LSP** обеспечивает совместимость, **ISP** минимизирует зависимости, **DIP** инвертирует зависимости через абстракции. Эти принципы делают код поддерживаемым, тестируемым и масштабируемым, что критично для современных фронтенд\\-приложений.',
        },
        {
          id: 'resources-93',
          type: 'resources',
          items: [
            {
              id: 'link-94',
              label: 'Wikipedia: SOLID',
              url: 'https://en.wikipedia.org/wiki/SOLID',
            },
          ],
        },
        {
          id: 'resources-95',
          type: 'resources',
          items: [
            {
              id: 'link-96',
              label: 'SOLID in TypeScript',
              url: 'https://khalilstemmler.com/articles/solid-principles/solid-typescript/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
