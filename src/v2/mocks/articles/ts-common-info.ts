import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-common-info-snippet1.txt?raw'
import example2 from '../snippets/typescript/ts-common-info-snippet2.txt?raw'
import example3 from '../snippets/typescript/ts-common-info-snippet3.txt?raw'
import example4 from '../snippets/typescript/ts-common-info-snippet4.txt?raw'
import example5 from '../snippets/typescript/ts-common-info-snippet5.txt?raw'
import example6 from '../snippets/typescript/ts-common-info-snippet6.txt?raw'

// Content copied verbatim from src/views/ts/TypeScriptCommonInfo.vue.
export default {
  ...articleSummaries.tsTypeScriptCommonInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**TypeScript** — это надмножество JavaScript, добавляющее статическую типизацию. Он компилируется в чистый JavaScript и может использоваться везде, где работает JavaScript. TypeScript создан Microsoft и активно развивается с 2012 года.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Краткое сравнение',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'JavaScript',
            },
            {
              id: 'column-3',
              label: 'TypeScript',
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
                    markdown: '**Типизация**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Динамическая',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Статическая',
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
                    markdown: '**Ошибки**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Runtime',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Compile\\-time',
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
                    markdown: '**IDE поддержка**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Базовая',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Отличная',
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
                    markdown: '**Кривая обучения**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Пологая',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Крутая',
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
                    markdown: '**Размер проекта**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Меньше',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Больше',
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
                    markdown: '**Скорость разработки**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Быстрее вначале',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Быстрее в долгосрочной перспективе',
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
      title: 'ПЛЮСЫ TypeScript',
      blocks: [
        {
          id: 'heading-21',
          type: 'heading',
          level: 3,
          text: '1. Статическая типизация',
        },
        {
          id: 'text-22',
          type: 'prose',
          markdown:
            'Главное преимущество TypeScript — статическая типизация, которая позволяет находить ошибки на этапе разработки, а не в runtime.',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
        {
          id: 'heading-24',
          type: 'heading',
          level: 3,
          text: '2. Превосходное автодополнение',
        },
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            'TypeScript значительно улучшает опыт разработки благодаря IntelliSense и автодополнению.',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
        {
          id: 'heading-27',
          type: 'heading',
          level: 3,
          text: '3. Легкий рефакторинг и поддержка',
        },
        {
          id: 'text-28',
          type: 'prose',
          markdown:
            'TypeScript делает рефакторинг безопасным и помогает поддерживать большие кодовые базы.',
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Основные плюсы TypeScript',
      blocks: [
        {
          id: 'cards-30',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-31',
              blocks: [
                {
                  id: 'heading-32',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    '- **Раннее обнаружение ошибок** — до runtime\n- **Отличное автодополнение** в IDE\n- **Безопасный рефакторинг** больших проектов\n- **Документация кода** через типы\n- **Лучшая архитектура** благодаря интерфейсам\n- **Поддержка новых фич** JS заранее\n- **Улучшенная командная работа**\n- **Масштабируемость** проектов',
                },
              ],
            },
            {
              id: 'card-34',
              blocks: [
                {
                  id: 'heading-35',
                  type: 'heading',
                  level: 3,
                  text: 'Для разработчиков',
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- Повышает уверенность при изменениях\n- Снижает количество багов в production\n- Упрощает онбординг новых людей\n- Улучшает читаемость кода\n- Помогает при code review\n- Интеграция с популярными фреймворками\n- Активное коммьюнити и экосистема\n- Регулярные обновления',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'МИНУСЫ TypeScript',
      blocks: [
        {
          id: 'heading-37',
          type: 'heading',
          level: 3,
          text: '4. Проблемы и сложности',
        },
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            'Несмотря на все преимущества, TypeScript имеет свои недостатки и может создавать проблемы.',
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
      id: 'section-5',
      title: 'Основные минусы TypeScript',
      blocks: [
        {
          id: 'cards-40',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-41',
              blocks: [
                {
                  id: 'heading-42',
                  type: 'heading',
                  level: 3,
                  text: 'Недостатки',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- **Сложность для новичков** — крутая кривая обучения\n- **Дополнительное время** на написание типов\n- **Увеличение размера** проекта\n- **Проблемы с библиотеками** без типов\n- **Ложная безопасность** — типы не проверяются в runtime\n- **Сложная конфигурация** tsconfig.json\n- **Overhead для простых скриптов**\n- **Breaking changes** между версиями',
                },
              ],
            },
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'heading-45',
                  type: 'heading',
                  level: 3,
                  text: 'Подводные камни',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- any убивает типобезопасность\n- Type assertion может быть опасен\n- Нужна runtime валидация для API\n- Сложность с очень динамическим кодом\n- Миграция легаси проектов болезненна\n- Иногда типы слишком строгие\n- Дополнительный этап сборки\n- Не заменяет тестирование',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-47',
          type: 'heading',
          level: 3,
          text: '5. Когда использовать TypeScript',
        },
        {
          id: 'text-48',
          type: 'prose',
          markdown:
            'Понимание, когда TypeScript действительно полезен, помогает принять правильное решение для проекта.',
        },
        {
          id: 'code-49',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Матрица принятия решений',
      blocks: [
        {
          id: 'table-50',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Критерий',
            },
            {
              id: 'column-2',
              label: 'JavaScript',
            },
            {
              id: 'column-3',
              label: 'TypeScript',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**Размер проекта**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Маленький (&lt; 1000 строк)',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Большой (&gt; 10000 строк)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '**Команда**',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Один разработчик',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Несколько разработчиков',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Срок жизни**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Прототип / MVP',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Долгосрочный проект',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Простая логика',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Сложная бизнес\\-логика',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**Скорость старта**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Нужна быстрота',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Можно потратить время',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '**Библиотека/SDK**',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Не подходит',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Обязательно',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'heading-69',
          type: 'heading',
          level: 3,
          text: '6. Реальные примеры',
        },
        {
          id: 'text-70',
          type: 'prose',
          markdown: 'Практические кейсы использования TypeScript и типичные проблемы.',
        },
        {
          id: 'code-71',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-72',
          type: 'prose',
          markdown:
            '1. **Почему TypeScript стал популярным?**\n   \n   TypeScript решает проблемы масштабируемости JavaScript: раннее обнаружение ошибок, лучшее автодополнение, безопасный рефакторинг. Поддерживается крупными компаниями (Microsoft, Google), интегрирован в популярные фреймворки (Angular, Vue 3, React).\n2. **В чем главное отличие TypeScript от JavaScript?**\n   \n   TypeScript добавляет статическую типизацию к JavaScript. Ошибки типов находятся на этапе компиляции, а не runtime. TypeScript — это надмножество JavaScript, весь валидный JS код — валидный TS код.\n3. **Какие недостатки есть у TypeScript?**\n   \n   Крутая кривая обучения, дополнительное время на написание типов, увеличение размера проекта, сложная конфигурация, ложное чувство безопасности (типы не проверяются в runtime), проблемы с библиотеками без типов.\n4. **Нужен ли TypeScript для небольших проектов?**\n   \n   Для проектов &lt; 1000 строк overhead TypeScript может не оправдаться. JavaScript быстрее для прототипов и MVP. Но для библиотек и SDK TypeScript рекомендуется даже для небольших проектов.\n5. **Что такое any и почему это плохо?**\n   \n   any отключает проверку типов для переменной — убирает все преимущества TypeScript. Лучше использовать unknown с явной проверкой типов, или конкретные типы/интерфейсы. any — последнее средство, а не решение по умолчанию.\n6. **Как TypeScript помогает при рефакторинге?**\n   \n   При изменении интерфейса или типа, TypeScript показывает ВСЕ места использования, которые нужно обновить. Переименование полей, изменение структуры данных — безопасны с TypeScript, так как компилятор найдет все несоответствия.\n7. **Заменяет ли TypeScript тестирование?**\n   \n   Нет! TypeScript проверяет только типы на этапе компиляции. Он не проверяет бизнес\\-логику, корректность алгоритмов, edge cases. Unit\\-тесты, интеграционные тесты остаются обязательными. TypeScript дополняет, а не заменяет тестирование.\n8. **Что такое строгий режим (strict mode)?**\n   \n   strict: true включает все строгие проверки: strictNullChecks, strictFunctionTypes, noImplicitAny и др. Делает TypeScript более безопасным, но требует больше усилий. Рекомендуется для новых проектов, может быть сложен для миграции.\n9. **Как работать с внешними API в TypeScript?**\n   \n   TypeScript не проверяет runtime данные! Нужна дополнительная валидация через библиотеки как zod, yup, io\\-ts. Определяем интерфейсы для ожидаемых данных, валидируем реальный ответ, только потом приводим к типу.\n10. **Стоит ли мигрировать существующий проект на TypeScript?**\n    \n    Зависит от размера и сложности. Для больших проектов с активной разработкой — стоит, но миграция постепенная. Можно начать с allowJs, checkJs, использовать JSDoc комментарии. Для стабильных проектов без активного развития — может не стоить.\n11. **Что такое generics и зачем они нужны?**\n    \n    Generics — параметризация типов, позволяющая создавать переиспользуемый типобезопасный код. Например, Array&lt;T&gt; работает с любым типом, но сохраняет типобезопасность. Используется для функций, классов, интерфейсов.\n12. **В чем разница между interface и type?**\n    \n    Interface можно расширять (extends), объединять (declaration merging). Type более гибкий — union, intersection, mapped types, conditional types. Для объектов лучше interface, для сложных типов — type. Оба работают схожим образом.\n13. **Как TypeScript влияет на производительность?**\n    \n    TypeScript не влияет на runtime производительность — компилируется в обычный JavaScript. Влияет на время сборки (компиляция) и размер проекта (типы, конфигурация). Может замедлить IDE при очень сложных типах.\n14. **Что такое type assertion и когда его использовать?**\n    \n    Type assertion (as Type) — способ сказать компилятору "я знаю тип лучше тебя". Используется осторожно, только когда точно знаешь тип. Небезопасен — не проверяется в runtime. Лучше использовать type guards для безопасного сужения типов.\n15. **Какие альтернативы TypeScript существуют?**\n    \n    Flow (Facebook), JSDoc комментарии с IDE поддержкой, ReScript (бывший ReasonML), PureScript, Elm. TypeScript — самый популярный благодаря экосистеме, поддержке Microsoft, интеграции с фреймворками.\n16. **Нужно ли знать JavaScript перед изучением TypeScript?**\n    \n    Да, обязательно! TypeScript — надмножество JavaScript. Нужно понимать JS основы: замыкания, this, прототипы, async/await, ES6\\+ синтаксис. TypeScript добавляет типы поверх JS, но не заменяет знание языка.',
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Сравнение популярности',
      blocks: [
        {
          id: 'cards-73',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'heading-75',
                  type: 'heading',
                  level: 3,
                  text: 'Рост популярности',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    'TypeScript используют: Microsoft, Google, Airbnb, Slack, Shopify, Stripe',
                },
              ],
            },
            {
              id: 'card-77',
              blocks: [
                {
                  id: 'heading-78',
                  type: 'heading',
                  level: 3,
                  text: 'Open Source',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown: '90M\\+ еженедельных загрузок npm, топ\\-5 языков на GitHub',
                },
              ],
            },
            {
              id: 'card-80',
              blocks: [
                {
                  id: 'heading-81',
                  type: 'heading',
                  level: 3,
                  text: 'Рынок труда',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown: 'TypeScript — один из самых востребованных навыков в веб\\-разработке',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Рекомендации',
      blocks: [
        {
          id: 'cards-83',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-84',
              title: '✅ Используйте TypeScript',
              blocks: [
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Большие проекты (&gt; 10k строк)\n- Команда из нескольких разработчиков\n- Долгосрочная поддержка кода\n- Библиотеки и SDK\n- Сложная бизнес\\-логика\n- React/Vue/Angular приложения\n- Корпоративные проекты',
                },
              ],
            },
            {
              id: 'card-86',
              title: '❌ JavaScript достаточно',
              blocks: [
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- Быстрые прототипы\n- Скрипты и утилиты (&lt; 1k строк)\n- MVP с жесткими дедлайнами\n- Команда без опыта TypeScript\n- Очень динамичный код\n- Простые веб\\-сайты\n- Легаси проекты без активной разработки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Заключение',
      blocks: [
        {
          id: 'callout-88',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-89',
              type: 'prose',
              markdown: '**Итоговый вердикт:**',
            },
            {
              id: 'text-90',
              type: 'prose',
              markdown:
                '**TypeScript** — мощный инструмент для больших проектов и команд, значительно улучшающий опыт разработки, безопасность кода и масштабируемость. Однако он требует времени на обучение, добавляет сложность и не подходит для всех сценариев.',
            },
            {
              id: 'text-91',
              type: 'prose',
              markdown:
                'Выбор между TypeScript и JavaScript зависит от конкретного проекта: его размера, сложности, команды и долгосрочных целей. Для современной веб\\-разработки знание TypeScript становится практически обязательным навыком.',
            },
          ],
        },
        {
          id: 'resources-92',
          type: 'resources',
          items: [
            {
              id: 'link-93',
              label: 'TypeScript Docs',
              url: 'https://www.typescriptlang.org/docs/',
            },
          ],
        },
        {
          id: 'resources-94',
          type: 'resources',
          items: [
            {
              id: 'link-95',
              label: 'GitHub',
              url: 'https://github.com/microsoft/TypeScript',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
