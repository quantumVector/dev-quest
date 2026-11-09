import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-interfaces-vs-types-classeswithinterfacessnippet.txt?raw'
import example2 from '../snippets/typescript/ts-interfaces-vs-types-migrationsnippet.txt?raw'
import example3 from '../snippets/typescript/ts-interfaces-vs-types-performancesnippet.txt?raw'
import example4 from '../snippets/typescript/ts-interfaces-vs-types-errormessagessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-interfaces-vs-types-realworldpatternssnippet.txt?raw'
import example6 from '../snippets/typescript/ts-interfaces-vs-types-advancedtechniquessnippet.txt?raw'

// Content copied verbatim from src/views/ts/InterfacesVsTypes.vue.
export default {
  ...articleSummaries.tsInterfacesVsTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Дополнительный материал к основному файлу. Фокус на работе с классами, производительности, миграции между подходами, качестве сообщений об ошибках и продвинутых техниках использования.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Interfaces с классами: ключевые преимущества',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Главное преимущество:** Interface создает явный контракт для классов через `implements`, обеспечивая строгую проверку реализации всех методов и свойств.',
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
              title: '✅ Interface может',
              blocks: [
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown:
                    '- `implements` — класс реализует интерфейс\n- Множественная реализация\n- Extends для иерархии интерфейсов\n- Declaration merging\n- Используется в DI (Dependency Injection)\n- Четкие контракты для методов',
                },
              ],
            },
            {
              id: 'card-7',
              title: '❌ Type не может',
              blocks: [
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- `implements` напрямую не работает\n- Нет declaration merging\n- Сложнее для OOP паттернов\n- Менее подходит для публичных API\n- Intersection вместо extends\n- Хуже для строгих контрактов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Миграция между Interface и Type',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Когда мигрировать:** Interface → Type при необходимости union/mapped types. Type → Interface для публичных API и лучших сообщений об ошибках.',
            },
          ],
        },
        {
          id: 'table-12',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Направление',
            },
            {
              id: 'column-3',
              label: 'Причина',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Нужны union types',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Interface → Type',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Interface не поддерживает union',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Публичный API библиотеки',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Type → Interface',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Declaration merging, лучше DX',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Работа с классами',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Type → Interface',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Поддержка implements',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Сложные трансформации',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Interface → Type',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Mapped/conditional types',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Производительность критична',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Type → Interface',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Быстрее компилируется',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Производительность компиляции',
      blocks: [
        {
          id: 'callout-29',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-30',
              type: 'prose',
              markdown:
                '**Критично для больших проектов:** Interface компилируются в 2\\-5 раз быстрее сложных Type с conditional/mapped types. В проектах 100k\\+ строк разница ощутима.',
            },
          ],
        },
        {
          id: 'cards-31',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: 'Быстро',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Interface (кэшируются)\n- Простые Type aliases\n- Enum\n- Const assertions',
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
                  text: 'Средне',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- Union types (до 10 вариантов)\n- Intersection types\n- Простые Mapped types\n- Utility types (Pick, Omit)',
                },
              ],
            },
            {
              id: 'card-38',
              blocks: [
                {
                  id: 'heading-39',
                  type: 'heading',
                  level: 3,
                  text: 'Медленно',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- Conditional types\n- Recursive types\n- Deep mapped types\n- Large union (100\\+ вариантов)',
                },
              ],
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
      id: 'section-4',
      title: 'Качество сообщений об ошибках',
      blocks: [
        {
          id: 'callout-42',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-43',
              type: 'prose',
              markdown:
                '**Developer Experience:** Interface дает более читаемые ошибки, показывая имя интерфейса. Type часто показывает полный развернутый тип, что усложняет отладку.',
            },
          ],
        },
        {
          id: 'cards-44',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: 'Interface ошибки',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Показывает имя интерфейса\n- Краткие сообщения\n- Четко указывает источник\n- Легко читать и понимать\n- Ссылается на конкретный контракт',
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
                  text: 'Type ошибки',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Развернутая структура типа\n- Многословные сообщения\n- Сложно найти корень проблемы\n- Особенно плохо для mapped types\n- Показывает все intersection/union',
                },
              ],
            },
          ],
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Реальные паттерны проектирования',
      blocks: [
        {
          id: 'callout-52',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-53',
              type: 'prose',
              markdown:
                '**Best Practice:** Комбинируйте Interface и Type — используйте каждый для того, для чего он лучше подходит. Interface для структур и классов, Type для union и трансформаций.',
            },
          ],
        },
        {
          id: 'table-54',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Паттерн',
            },
            {
              id: 'column-2',
              label: 'Инструмент',
            },
            {
              id: 'column-3',
              label: 'Причина выбора',
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
                    markdown: 'Domain Models',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Interface**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Структура данных, используется с классами',
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
                    markdown: 'API Responses',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Type Union**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Success/Error states',
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
                    markdown: 'State Management',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Discriminated Union**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Type narrowing для разных состояний',
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
                    markdown: 'Repository Pattern',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**Interface**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Контракт для реализации в классах',
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
                    markdown: 'Utility Types',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Type**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Mapped/conditional трансформации',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Builder Pattern',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '**Interface**',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Fluent API с методами, возвращающими this',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Event System',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '**Type Union**',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Разные типы событий',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Strategy Pattern',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**Interface**',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Взаимозаменяемые алгоритмы',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-79',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Продвинутые техники использования',
      blocks: [
        {
          id: 'cards-80',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-81',
              title: 'Interface Advanced',
              blocks: [
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- **Mixins** — композиция функциональности\n- **Declaration Merging** — расширение библиотек\n- **Namespace Augmentation** — модули\n- **Fluent Interfaces** — method chaining\n- **Recursive Interfaces** — деревья, графы',
                },
              ],
            },
            {
              id: 'card-83',
              title: 'Type Advanced',
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- **Phantom Types** — compile\\-time safety\n- **Branded Types** — domain primitives\n- **Template Literals** — type\\-level строки\n- **Variance Annotations** — in/out\n- **Higher\\-Order Types** — типы типов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-85',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Чек-лист: Interface или Type?',
      blocks: [
        {
          id: 'cards-86',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-87',
              blocks: [
                {
                  id: 'heading-88',
                  type: 'heading',
                  level: 3,
                  text: 'Выбирайте Interface если:',
                },
                {
                  id: 'list-89',
                  type: 'list',
                  items: [
                    {
                      id: 'item-90',
                      blocks: [
                        {
                          id: 'text-91',
                          type: 'prose',
                          markdown: '☑️ Описываете объект или структуру данных',
                        },
                      ],
                    },
                    {
                      id: 'item-92',
                      blocks: [
                        {
                          id: 'text-93',
                          type: 'prose',
                          markdown: '☑️ Работаете с классами (нужен implements)',
                        },
                      ],
                    },
                    {
                      id: 'item-94',
                      blocks: [
                        {
                          id: 'text-95',
                          type: 'prose',
                          markdown: '☑️ Создаете публичный API библиотеки',
                        },
                      ],
                    },
                    {
                      id: 'item-96',
                      blocks: [
                        {
                          id: 'text-97',
                          type: 'prose',
                          markdown: '☑️ Нужна возможность расширения (declaration merging)',
                        },
                      ],
                    },
                    {
                      id: 'item-98',
                      blocks: [
                        {
                          id: 'text-99',
                          type: 'prose',
                          markdown: '☑️ Важна производительность компиляции',
                        },
                      ],
                    },
                    {
                      id: 'item-100',
                      blocks: [
                        {
                          id: 'text-101',
                          type: 'prose',
                          markdown: '☑️ Хотите четкие сообщения об ошибках',
                        },
                      ],
                    },
                    {
                      id: 'item-102',
                      blocks: [
                        {
                          id: 'text-103',
                          type: 'prose',
                          markdown: '☑️ Используете OOP паттерны',
                        },
                      ],
                    },
                    {
                      id: 'item-104',
                      blocks: [
                        {
                          id: 'text-105',
                          type: 'prose',
                          markdown: '☑️ Описываете контракты для dependency injection',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-106',
              blocks: [
                {
                  id: 'heading-107',
                  type: 'heading',
                  level: 3,
                  text: 'Выбирайте Type если:',
                },
                {
                  id: 'list-108',
                  type: 'list',
                  items: [
                    {
                      id: 'item-109',
                      blocks: [
                        {
                          id: 'text-110',
                          type: 'prose',
                          markdown: '☑️ Нужны union types (A | B | C)',
                        },
                      ],
                    },
                    {
                      id: 'item-111',
                      blocks: [
                        {
                          id: 'text-112',
                          type: 'prose',
                          markdown: '☑️ Работаете с примитивами (type ID = number)',
                        },
                      ],
                    },
                    {
                      id: 'item-113',
                      blocks: [
                        {
                          id: 'text-114',
                          type: 'prose',
                          markdown: '☑️ Используете tuple types (\\[string, number\\])',
                        },
                      ],
                    },
                    {
                      id: 'item-115',
                      blocks: [
                        {
                          id: 'text-116',
                          type: 'prose',
                          markdown: '☑️ Нужны mapped types',
                        },
                      ],
                    },
                    {
                      id: 'item-117',
                      blocks: [
                        {
                          id: 'text-118',
                          type: 'prose',
                          markdown: '☑️ Нужны conditional types (T extends U ? X : Y)',
                        },
                      ],
                    },
                    {
                      id: 'item-119',
                      blocks: [
                        {
                          id: 'text-120',
                          type: 'prose',
                          markdown: '☑️ Создаете utility types',
                        },
                      ],
                    },
                    {
                      id: 'item-121',
                      blocks: [
                        {
                          id: 'text-122',
                          type: 'prose',
                          markdown: '☑️ Используете template literal types',
                        },
                      ],
                    },
                    {
                      id: 'item-123',
                      blocks: [
                        {
                          id: 'text-124',
                          type: 'prose',
                          markdown: '☑️ Нужны branded/phantom types для безопасности',
                        },
                      ],
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
      id: 'section-8',
      title: 'Частые ошибки и как их избежать',
      blocks: [
        {
          id: 'cards-125',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-126',
              blocks: [
                {
                  id: 'heading-127',
                  type: 'heading',
                  level: 3,
                  text: '❌ Типичные ошибки',
                },
                {
                  id: 'text-128',
                  type: 'prose',
                  markdown:
                    '- Использование Type вместо Interface для классов\n- Сложные nested mapped types в публичном API\n- Игнорирование declaration merging возможностей\n- Смешивание стилей без причины\n- Избыточное использование conditional types\n- Забывание о производительности',
                },
              ],
            },
            {
              id: 'card-129',
              blocks: [
                {
                  id: 'heading-130',
                  type: 'heading',
                  level: 3,
                  text: '✅ Правильный подход',
                },
                {
                  id: 'text-131',
                  type: 'prose',
                  markdown:
                    '- Interface для всех структур данных\n- Type для union и трансформаций\n- Консистентность в проекте\n- Документирование выбора\n- Использование ESLint правил\n- Профилирование компиляции',
                },
              ],
            },
            {
              id: 'card-132',
              blocks: [
                {
                  id: 'heading-133',
                  type: 'heading',
                  level: 3,
                  text: '💡 Рекомендации',
                },
                {
                  id: 'text-134',
                  type: 'prose',
                  markdown:
                    '- Начинайте с Interface по умолчанию\n- Переходите на Type только при необходимости\n- Изучайте code style команды\n- Используйте prettier для форматирования\n- Регулярно ревьюйте типы в PR\n- Следите за обновлениями TypeScript',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итоговая сравнительная таблица',
      blocks: [
        {
          id: 'table-135',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Критерий',
            },
            {
              id: 'column-2',
              label: 'Interface',
            },
            {
              id: 'column-3',
              label: 'Type',
            },
            {
              id: 'column-4',
              label: 'Победитель',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-136',
                    type: 'prose',
                    markdown: '**Работа с классами**',
                  },
                ],
                [
                  {
                    id: 'text-137',
                    type: 'prose',
                    markdown: '✅ Отлично (implements)',
                  },
                ],
                [
                  {
                    id: 'text-138',
                    type: 'prose',
                    markdown: '❌ Не поддерживает',
                  },
                ],
                [
                  {
                    id: 'text-139',
                    type: 'prose',
                    markdown: 'Interface',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-140',
                    type: 'prose',
                    markdown: '**Union types**',
                  },
                ],
                [
                  {
                    id: 'text-141',
                    type: 'prose',
                    markdown: '❌ Не поддерживает',
                  },
                ],
                [
                  {
                    id: 'text-142',
                    type: 'prose',
                    markdown: '✅ Отлично',
                  },
                ],
                [
                  {
                    id: 'text-143',
                    type: 'prose',
                    markdown: 'Type',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-144',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-145',
                    type: 'prose',
                    markdown: '✅ Быстро',
                  },
                ],
                [
                  {
                    id: 'text-146',
                    type: 'prose',
                    markdown: '⚠️ Медленнее',
                  },
                ],
                [
                  {
                    id: 'text-147',
                    type: 'prose',
                    markdown: 'Interface',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-148',
                    type: 'prose',
                    markdown: '**Сообщения об ошибках**',
                  },
                ],
                [
                  {
                    id: 'text-149',
                    type: 'prose',
                    markdown: '✅ Четкие',
                  },
                ],
                [
                  {
                    id: 'text-150',
                    type: 'prose',
                    markdown: '⚠️ Развернутые',
                  },
                ],
                [
                  {
                    id: 'text-151',
                    type: 'prose',
                    markdown: 'Interface',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-152',
                    type: 'prose',
                    markdown: '**Declaration merging**',
                  },
                ],
                [
                  {
                    id: 'text-153',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-154',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-155',
                    type: 'prose',
                    markdown: 'Interface',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-156',
                    type: 'prose',
                    markdown: '**Mapped types**',
                  },
                ],
                [
                  {
                    id: 'text-157',
                    type: 'prose',
                    markdown: '❌ Не поддерживает',
                  },
                ],
                [
                  {
                    id: 'text-158',
                    type: 'prose',
                    markdown: '✅ Отлично',
                  },
                ],
                [
                  {
                    id: 'text-159',
                    type: 'prose',
                    markdown: 'Type',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-160',
                    type: 'prose',
                    markdown: '**Conditional types**',
                  },
                ],
                [
                  {
                    id: 'text-161',
                    type: 'prose',
                    markdown: '❌ Не поддерживает',
                  },
                ],
                [
                  {
                    id: 'text-162',
                    type: 'prose',
                    markdown: '✅ Отлично',
                  },
                ],
                [
                  {
                    id: 'text-163',
                    type: 'prose',
                    markdown: 'Type',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-164',
                    type: 'prose',
                    markdown: '**Публичный API**',
                  },
                ],
                [
                  {
                    id: 'text-165',
                    type: 'prose',
                    markdown: '✅ Рекомендуется',
                  },
                ],
                [
                  {
                    id: 'text-166',
                    type: 'prose',
                    markdown: '⚠️ Допустимо',
                  },
                ],
                [
                  {
                    id: 'text-167',
                    type: 'prose',
                    markdown: 'Interface',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-168',
                    type: 'prose',
                    markdown: '**Tuple types**',
                  },
                ],
                [
                  {
                    id: 'text-169',
                    type: 'prose',
                    markdown: '⚠️ Сложно',
                  },
                ],
                [
                  {
                    id: 'text-170',
                    type: 'prose',
                    markdown: '✅ Легко',
                  },
                ],
                [
                  {
                    id: 'text-171',
                    type: 'prose',
                    markdown: 'Type',
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-172',
                    type: 'prose',
                    markdown: '**Примитивы**',
                  },
                ],
                [
                  {
                    id: 'text-173',
                    type: 'prose',
                    markdown: '❌ Только объекты',
                  },
                ],
                [
                  {
                    id: 'text-174',
                    type: 'prose',
                    markdown: '✅ Любые типы',
                  },
                ],
                [
                  {
                    id: 'text-175',
                    type: 'prose',
                    markdown: 'Type',
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
      title: 'Итог',
      blocks: [
        {
          id: 'text-176',
          type: 'prose',
          markdown:
            '**Главный вывод:** Нет однозначного победителя — Interface и Type дополняют друг друга. **Interface** идеален для структур данных, классов, публичных API и когда важна производительность. **Type** незаменим для union, tuple, mapped и conditional types. В реальных проектах используйте оба инструмента, выбирая подходящий для конкретной задачи. Начинайте с Interface по умолчанию и переходите на Type, когда его возможности критически необходимы.',
        },
        {
          id: 'callout-177',
          type: 'callout',
          tone: 'success',
          label: 'Золотое правило',
          blocks: [
            {
              id: 'text-178',
              type: 'prose',
              markdown:
                '**Interface** для структуры и контрактов. **Type** для трансформаций и union. Комбинируйте их для максимальной выразительности и производительности TypeScript кода.',
            },
          ],
        },
        {
          id: 'resources-179',
          type: 'resources',
          items: [
            {
              id: 'link-180',
              label: 'TypeScript Interfaces',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces',
            },
          ],
        },
        {
          id: 'resources-181',
          type: 'resources',
          items: [
            {
              id: 'link-182',
              label: 'TypeScript Type Aliases',
              url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases',
            },
          ],
        },
        {
          id: 'resources-183',
          type: 'resources',
          items: [
            {
              id: 'link-184',
              label: 'Classes',
              url: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
