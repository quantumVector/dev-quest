import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-creational-patterns-singletonsnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-creational-patterns-factorysnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-creational-patterns-buildersnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-creational-patterns-prototypesnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-creational-patterns-abstractfactorysnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-creational-patterns-realworldexamplessnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-creational-patterns-antipatternssnippet.txt?raw'

// Content copied verbatim from src/views/patterns/CreationalPatterns.vue.
export default {
  ...articleSummaries.patternsCreationalPatterns,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Порождающие (Creational) паттерны** — это паттерны проектирования, которые решают проблемы создания объектов. Они отвечают на вопрос "Как создавать объекты?" и предоставляют гибкие механизмы создания объектов, скрывая логику создания и делая систему независимой от способа создания объектов.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Обзор порождающих паттернов',
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
                  text: 'Singleton',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Единственный экземпляр класса с глобальной точкой доступа',
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
                  text: 'Factory',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Создание объектов без указания их конкретных классов',
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
                  text: 'Builder',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Пошаговое конструирование сложных объектов',
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
                  text: 'Prototype',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown: 'Создание объектов клонированием существующих',
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
                  text: 'Abstract Factory',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: 'Создание семейств связанных объектов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Singleton — единственный экземпляр',
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
                '**Когда использовать:** Когда нужен ровно один экземпляр класса (глобальный state, кэш, логгер, connection pool)',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Factory — фабрика объектов',
      blocks: [
        {
          id: 'callout-21',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-22',
              type: 'prose',
              markdown:
                '**Когда использовать:** Когда тип создаваемого объекта определяется во время выполнения (UI компоненты, notifications, валидаторы)',
            },
          ],
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Builder — построитель',
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
                '**Когда использовать:** Для пошагового создания сложных объектов с множеством опциональных параметров (HTTP запросы, формы, SQL queries)',
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Prototype — прототип',
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
                '**Когда использовать:** Когда нужно создавать копии объектов без привязки к их классам (клонирование React элементов, дублирование конфигураций)',
            },
          ],
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Abstract Factory — абстрактная фабрика',
      blocks: [
        {
          id: 'callout-30',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-31',
              type: 'prose',
              markdown:
                '**Когда использовать:** Для создания семейств связанных объектов (темы UI, платформозависимые компоненты, разные наборы виджетов)',
            },
          ],
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Реальные примеры во фронтенде',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Сравнение паттернов',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Паттерн',
            },
            {
              id: 'column-2',
              label: 'Проблема',
            },
            {
              id: 'column-3',
              label: 'Решение',
            },
            {
              id: 'column-4',
              label: 'Примеры во фронтенде',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '**Singleton**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Нужен один экземпляр',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Приватный конструктор, статический метод',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Redux store, Router, Config',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Factory**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Тип объекта определяется во runtime',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Метод создания вместо конструктора',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'React.createElement, notifications',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**Builder**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Много опциональных параметров',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Цепочка методов для настройки',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'HTTP requests, Query builders',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Prototype**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Создание копий сложных объектов',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Метод clone() или structuredClone',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'React.cloneElement, templates',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**Abstract Factory**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Создание семейств объектов',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Интерфейс для создания группы',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'UI themes, MUI ThemeProvider',
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
      title: 'Антипаттерны и ошибки',
      blocks: [
        {
          id: 'code-55',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-56',
          type: 'prose',
          markdown:
            '1. **В чем разница между Factory и Abstract Factory?**\n   \n   **Factory** создает один тип объектов (например, разные виды уведомлений). **Abstract Factory** создает семейства связанных объектов (например, кнопки, инпуты и модалки в едином стиле темы). Factory — один продукт, Abstract Factory — набор продуктов.\n2. **Почему Singleton считается антипаттерном?**\n   \n   Singleton создает глобальное состояние, что усложняет тестирование (нельзя изолировать), нарушает Single Responsibility Principle (класс отвечает и за логику, и за управление экземпляром), и скрывает зависимости. В React лучше использовать Context или DI контейнеры.\n3. **Когда Builder лучше, чем просто объект конфигурации?**\n   \n   Builder полезен когда: (1) много опциональных параметров с дефолтными значениями, (2) нужна валидация на этапе построения, (3) пошаговое создание с побочными эффектами, (4) читаемость важнее — цепочка методов самодокументируется.\n4. **В чем разница между поверхностным и глубоким клонированием?**\n   \n   **Поверхностное** (`{...obj}`) копирует только первый уровень — вложенные объекты остаются ссылками. **Глубокое** (`structuredClone()`) рекурсивно копирует всю структуру. React.cloneElement делает поверхностное клонирование пропсов.\n5. **Какие порождающие паттерны используются в React?**\n   \n   **Factory:** React.createElement, **Prototype:** React.cloneElement, **Builder:** хуки с опциями (useQuery), **Singleton:** Context \\+ Provider, **Abstract Factory:** ThemeProvider создает семейства компонентов в едином стиле.\n6. **Как тестировать Singleton?**\n   \n   Проблема: глобальное состояние переживает тесты. Решения: (1) метод reset() для очистки, (2) DI контейнер вместо Singleton, (3) мокать getInstance(), (4) использовать модули ES6, которые можно переимпортировать в тестах.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-57',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Использовать ES модули для Singleton\n- Регистрировать фабрики в Map/Record\n- Валидировать в Builder перед build()\n- Глубокое клонирование для вложенных структур\n- DI контейнеры вместо глобальных Singleton\n- TypeScript для типобезопасности',
                },
              ],
            },
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Singleton для всего подряд\n- Огромные switch в Factory\n- Builder без валидации\n- Поверхностное clone вложенных объектов\n- Жесткая привязка в Abstract Factory\n- Игнорирование тестируемости',
                },
              ],
            },
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Комбинируйте паттерны (Builder \\+ Factory)\n- Документируйте, какой паттерн используется\n- Рефакторьте к паттернам постепенно\n- Тестируйте каждый паттерн изолированно\n- Изучайте реализации в библиотеках\n- Помните: паттерны — инструмент, а не цель',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Когда какой паттерн использовать',
      blocks: [
        {
          id: 'cards-67',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-68',
              title: 'Выбор паттерна по задаче',
              blocks: [
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- **Нужен один экземпляр?** → Singleton (или ES модуль)\n- **Тип известен во runtime?** → Factory\n- **Много опций настройки?** → Builder\n- **Нужно клонировать?** → Prototype\n- **Семейство объектов?** → Abstract Factory',
                },
              ],
            },
            {
              id: 'card-70',
              title: 'Признаки неправильного выбора',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Множество Singleton → используйте DI\n- Огромный Factory → разбейте на несколько\n- Builder для 2\\-3 параметров → перебор\n- Clone вместо new → возможно, лишнее\n- Abstract Factory для одного типа → Factory достаточно',
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
          id: 'text-72',
          type: 'prose',
          markdown:
            '**Порождающие паттерны** решают проблемы создания объектов, делая код более гибким и поддерживаемым. Во фронтенде они встречаются повсеместно: Redux store (Singleton), React.createElement (Factory), Axios builder (Builder), React.cloneElement (Prototype), MUI ThemeProvider (Abstract Factory). Понимание этих паттернов помогает не только на собеседованиях, но и в ежедневной разработке — вы будете лучше понимать архитектуру библиотек и писать более качественный код.',
        },
        {
          id: 'resources-73',
          type: 'resources',
          items: [
            {
              id: 'link-74',
              label: 'Refactoring Guru',
              url: 'https://refactoring.guru/design-patterns/creational-patterns',
            },
          ],
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Patterns.dev',
              url: 'https://www.patterns.dev/posts/classic-design-patterns',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
