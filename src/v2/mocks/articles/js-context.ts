import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-context-globalcontextsnippet.txt?raw'
import example2 from '../snippets/javascript/js-context-functioncontextsnippet.txt?raw'
import example3 from '../snippets/javascript/js-context-thiscontextsnippet.txt?raw'
import example4 from '../snippets/javascript/js-context-executionstacksnippet.txt?raw'
import example5 from '../snippets/javascript/js-context-hoistingcontextsnippet.txt?raw'
import example6 from '../snippets/javascript/js-context-bindcallapplysnippet.txt?raw'
import example7 from '../snippets/javascript/js-context-asynccontextsnippet.txt?raw'
import example8 from '../snippets/javascript/js-context-inline8.txt?raw'

// Content copied verbatim from src/views/js/JSContext.vue.
export default {
  ...articleSummaries.jsJSContext,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Контекст в JavaScript** — это окружение, в котором выполняется код. Включает в себя контекст выполнения (Execution Context), лексический контекст (Lexical Environment) и контекст `this`. Понимание контекста критически важно для работы с JavaScript.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Виды контекстов',
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
                  text: 'Глобальный',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Создается** при загрузке скрипта\n- **Содержит** глобальные переменные\n- **this** = Window (браузер) / global (Node.js)\n- **Живет** все время выполнения',
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
                  text: 'Функции',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Создается** при вызове функции\n- **Содержит** параметры и локальные переменные\n- **this** зависит от способа вызова\n- **Удаляется** после выполнения',
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
                  text: 'Блочный',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Создается** для блоков с let/const\n- **Содержит** блочные переменные\n- **this** наследуется от внешнего\n- **Ограничен** фигурными скобками',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Глобальный контекст',
      blocks: [
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Контекст функции и замыкания',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Контекст this (самый важный!)',
      blocks: [
        {
          id: 'callout-14',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-15',
              type: 'prose',
              markdown:
                '**Внимание:** Поведение `this` — самая частая тема на собеседованиях! Зависит от способа вызова функции.',
            },
          ],
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Стек выполнения и контексты',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Как работает стек контекстов',
      blocks: [
        {
          id: 'steps-18',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-19',
              title: 'Creation Phase',
              blocks: [
                {
                  id: 'cards-20',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-21',
                      blocks: [
                        {
                          id: 'heading-22',
                          type: 'heading',
                          level: 3,
                          text: '1. Фаза создания (Creation Phase)',
                        },
                        {
                          id: 'text-23',
                          type: 'prose',
                          markdown: 'Подготовка контекста выполнения',
                        },
                        {
                          id: 'text-24',
                          type: 'prose',
                          markdown:
                            'Создается новый **контекст выполнения**, определяется `this`, создается Variable Environment и Lexical Environment.',
                        },
                        {
                          id: 'text-25',
                          type: 'prose',
                          markdown: 'Определение `this`',
                        },
                        {
                          id: 'text-26',
                          type: 'prose',
                          markdown: 'Создание Variable Environment',
                        },
                        {
                          id: 'text-27',
                          type: 'prose',
                          markdown: 'Создание Lexical Environment',
                        },
                        {
                          id: 'callout-28',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-29',
                              type: 'prose',
                              markdown:
                                'На этом этапе код еще не выполняется, только подготавливается окружение',
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
              id: 'step-30',
              title: 'Hoisting',
              blocks: [
                {
                  id: 'cards-31',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-32',
                      blocks: [
                        {
                          id: 'heading-33',
                          type: 'heading',
                          level: 3,
                          text: '2. Поднятие (Hoisting)',
                        },
                        {
                          id: 'text-34',
                          type: 'prose',
                          markdown: 'Предварительная обработка объявлений',
                        },
                        {
                          id: 'text-35',
                          type: 'prose',
                          markdown:
                            '`var` и `function declarations` поднимаются вверх и инициализируются. `let` и `const` помещаются в TDZ (Temporal Dead Zone).',
                        },
                        {
                          id: 'cards-36',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-37',
                              title: '✅ Поднимаются и инициализируются',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-38',
                                  type: 'prose',
                                  markdown: '- `var` → undefined\n- `function` → полная функция',
                                },
                              ],
                            },
                            {
                              id: 'card-39',
                              title: '⚠️ Поднимаются, но в TDZ',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-40',
                                  type: 'prose',
                                  markdown: '- `let` → TDZ\n- `const` → TDZ',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'callout-41',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-42',
                              type: 'prose',
                              markdown:
                                'TDZ предотвращает использование переменных до их объявления',
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
              id: 'step-43',
              title: 'Execution',
              blocks: [
                {
                  id: 'cards-44',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-45',
                      blocks: [
                        {
                          id: 'heading-46',
                          type: 'heading',
                          level: 3,
                          text: '3. Выполнение (Execution)',
                        },
                        {
                          id: 'text-47',
                          type: 'prose',
                          markdown: 'Построчное выполнение кода',
                        },
                        {
                          id: 'text-48',
                          type: 'prose',
                          markdown:
                            'Код выполняется **построчно**. Переменные получают значения, вызываются функции, создаются новые контексты выполнения.',
                        },
                        {
                          id: 'timeline-49',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-50',
                              blocks: [
                                {
                                  id: 'text-51',
                                  type: 'prose',
                                  markdown: 'Строка 1',
                                },
                                {
                                  id: 'text-52',
                                  type: 'prose',
                                  markdown: 'Присвоение значений',
                                },
                                {
                                  id: 'text-53',
                                  type: 'prose',
                                  markdown: 'Переменные получают реальные значения',
                                },
                              ],
                            },
                            {
                              id: 'event-54',
                              blocks: [
                                {
                                  id: 'text-55',
                                  type: 'prose',
                                  markdown: 'Строка N',
                                },
                                {
                                  id: 'text-56',
                                  type: 'prose',
                                  markdown: 'Вызов функций',
                                },
                                {
                                  id: 'text-57',
                                  type: 'prose',
                                  markdown: 'Создание новых контекстов выполнения',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'callout-58',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-59',
                              type: 'prose',
                              markdown: 'На этом этапе происходит реальная работа программы',
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
              id: 'step-60',
              title: 'Cleanup',
              blocks: [
                {
                  id: 'cards-61',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-62',
                      blocks: [
                        {
                          id: 'heading-63',
                          type: 'heading',
                          level: 3,
                          text: '4. Очистка (Cleanup)',
                        },
                        {
                          id: 'text-64',
                          type: 'prose',
                          markdown: 'Удаление контекста из стека',
                        },
                        {
                          id: 'text-65',
                          type: 'prose',
                          markdown:
                            'Контекст **удаляется из стека**, память освобождается. Исключение — замыкания сохраняют доступ к внешним переменным.',
                        },
                        {
                          id: 'cards-66',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-67',
                              title: '✅ Обычное освобождение',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-68',
                                  type: 'prose',
                                  markdown:
                                    '- Контекст удаляется\n- Переменные освобождаются\n- Память очищается',
                                },
                              ],
                            },
                            {
                              id: 'card-69',
                              title: '💡 Замыкания',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-70',
                                  type: 'prose',
                                  markdown:
                                    '- Сохраняют ссылки\n- Переменные остаются\n- Доступ из внутренних функций',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'callout-71',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-72',
                              type: 'prose',
                              markdown: 'Цикл завершен! Следующий контекст может быть обработан',
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
      ],
    },
    {
      id: 'section-7',
      title: '5. Поднятие (Hoisting)',
      blocks: [
        {
          id: 'code-73',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: '6. Управление контекстом: call, apply, bind',
      blocks: [
        {
          id: 'code-74',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Различия call, apply, bind',
      blocks: [
        {
          id: 'table-75',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Вызов',
            },
            {
              id: 'column-3',
              label: 'Аргументы',
            },
            {
              id: 'column-4',
              label: 'Возврат',
            },
            {
              id: 'column-5',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '`call()`',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**Немедленно**',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'По отдельности',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Результат функции',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Разовый вызов с известными аргументами',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '`apply()`',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**Немедленно**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Массивом',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Результат функции',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Разовый вызов с динамическими аргументами',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '`bind()`',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '**Отложенно**',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'По отдельности',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Новую функцию',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Создание функции с фиксированным контекстом',
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
      title: '7. Контекст в асинхронном коде',
      blocks: [
        {
          id: 'code-91',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'list-92',
          type: 'list',
          ordered: true,
          items: [
            {
              id: 'item-93',
              blocks: [
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown: '**Что выведет этот код?**',
                },
                {
                  id: 'code-95',
                  type: 'code',
                  language: 'javascript',
                  code: example8,
                },
                {
                  id: 'text-96',
                  type: 'prose',
                  markdown:
                    '`undefined` — потому что функция вызывается как обычная функция, this не указывает на obj. Решение: `getName.call(obj)` или `obj.getName.bind(obj)()`',
                },
              ],
            },
            {
              id: 'item-97',
              blocks: [
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '**В чем разница между стрелочными и обычными функциями относительно this?**',
                },
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    'Стрелочные функции не имеют своего `this` — они наследуют его из лексического контекста. Обычные функции создают свой `this`, который зависит от способа вызова.',
                },
              ],
            },
            {
              id: 'item-100',
              blocks: [
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown: '**Что такое замыкание и как оно связано с контекстом?**',
                },
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    'Замыкание — это функция, которая имеет доступ к переменным внешней функции даже после её завершения. Создается благодаря лексическому контексту — функция "помнит" окружение, в котором была создана.',
                },
              ],
            },
            {
              id: 'item-103',
              blocks: [
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown: '**Как работает поднятие (hoisting)?**',
                },
                {
                  id: 'text-105',
                  type: 'prose',
                  markdown:
                    '`var` и `function declarations` поднимаются вверх контекста и инициализируются как undefined/функция. `let` и `const` тоже поднимаются, но остаются в TDZ до объявления.',
                },
              ],
            },
            {
              id: 'item-106',
              blocks: [
                {
                  id: 'text-107',
                  type: 'prose',
                  markdown: '**Когда использовать bind вместо call/apply?**',
                },
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    '`bind` — когда нужно создать новую функцию с фиксированным контекстом для многократного использования. `call/apply` — для одноразового вызова с другим контекстом.',
                },
              ],
            },
            {
              id: 'item-109',
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown: '**Что происходит с this в строгом режиме?**',
                },
                {
                  id: 'text-111',
                  type: 'prose',
                  markdown:
                    'В strict mode `this` не приводится к глобальному объекту. Если функция вызывается без контекста, `this` остается `undefined` вместо превращения в `Window/global`.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Способы определения this',
      blocks: [
        {
          id: 'cards-112',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-113',
              title: 'Правила определения this',
              blocks: [
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    '1. **Стрелочная функция:** наследует из внешнего контекста\n2. **new:** новый объект\n3. **call/apply/bind:** первый аргумент\n4. **Метод объекта:** объект перед точкой\n5. **Обычный вызов:** Window/global (не строгий) или undefined (строгий)',
                },
              ],
            },
            {
              id: 'card-115',
              title: 'Примеры',
              blocks: [
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- `() => {}` — лексический this\n- `new Func()` — новый объект\n- `func.call(obj)` — obj\n- `obj.method()` — obj\n- `func()` — Window/undefined',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики работы с контекстом',
      blocks: [
        {
          id: 'cards-117',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-118',
              blocks: [
                {
                  id: 'heading-119',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-120',
                  type: 'prose',
                  markdown:
                    '- Использовать стрелочные функции для сохранения контекста\n- Применять bind для постоянной привязки\n- Понимать разницу между var, let, const\n- Использовать strict mode\n- Тестировать поведение this',
                },
              ],
            },
            {
              id: 'card-121',
              blocks: [
                {
                  id: 'heading-122',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-123',
                  type: 'prose',
                  markdown:
                    '- Смешивания стрелочных функций с методами\n- Присвоения методов без привязки контекста\n- Использования var в современном коде\n- Игнорирования строгого режима\n- Неправильного использования this в коллбеках',
                },
              ],
            },
            {
              id: 'card-124',
              blocks: [
                {
                  id: 'heading-125',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-126',
                  type: 'prose',
                  markdown:
                    '- Изучайте поведение this на практике\n- Используйте console.log для отладки\n- Применяйте линтеры для проверки\n- Читайте MDN и спецификацию\n- Практикуйтесь на задачах',
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
          id: 'text-127',
          type: 'prose',
          markdown:
            '**Контекст в JavaScript** включает контекст выполнения (где выполняется код), лексический контекст (доступ к переменным) и контекст `this` (на что указывает this). Понимание этих концепций критически важно для работы с JavaScript и прохождения собеседований. Особое внимание уделите поведению `this` в разных ситуациях — это самая частая тема вопросов.',
        },
        {
          id: 'resources-128',
          type: 'resources',
          items: [
            {
              id: 'link-129',
              label: 'MDN: this',
              url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this',
            },
          ],
        },
        {
          id: 'resources-130',
          type: 'resources',
          items: [
            {
              id: 'link-131',
              label: 'Execution Context',
              url: 'https://developer.mozilla.org/ru/docs/Glossary/Execution_context',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
