import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-hoisting-functionhoistingsnippet.txt?raw'
import example2 from '../snippets/javascript/js-hoisting-varhoistingsnippet.txt?raw'
import example3 from '../snippets/javascript/js-hoisting-letconsthoistingsnippet.txt?raw'
import example4 from '../snippets/javascript/js-hoisting-classhoistingsnippet.txt?raw'
import example5 from '../snippets/javascript/js-hoisting-inline5.txt?raw'
import example6 from '../snippets/javascript/js-hoisting-inline6.txt?raw'
import example7 from '../snippets/javascript/js-hoisting-inline7.txt?raw'
import example8 from '../snippets/javascript/js-hoisting-practicalexamplesnippet.txt?raw'
import example9 from '../snippets/javascript/js-hoisting-interviewexamplessnippet.txt?raw'
import example10 from '../snippets/javascript/js-hoisting-scopingexamplesnippet.txt?raw'
import example11 from '../snippets/javascript/js-hoisting-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/js/Hoisting.vue.
export default {
  ...articleSummaries.jsHoisting,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Hoisting (всплытие)** — это механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало их области видимости во время компиляции. Важно понимать: всплывают только **объявления**, но не **инициализации**!',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что всплывает в JavaScript?',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: '✅ Всплывает',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **var** объявления (с undefined)\n- **function** declarations (полностью)\n- **let/const** (но в TDZ)\n- **class** declarations (но в TDZ)',
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
                  text: '❌ Не всплывает',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Инициализации** переменных\n- **Function expressions**\n- **Arrow functions**\n- **Class expressions**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Function Declaration vs Function Expression',
      blocks: [
        {
          id: 'callout-9',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-10',
              type: 'prose',
              markdown:
                '**Ключевое отличие:** Function declarations всплывают полностью и доступны во всей области видимости, function expressions ведут себя как обычные переменные.',
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. var - всплывает с undefined',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Особенность var:** Объявление всплывает, но инициализация остается на месте. До инициализации переменная имеет значение undefined.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. let и const - Temporal Dead Zone (TDZ)',
      blocks: [
        {
          id: 'callout-15',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '**TDZ (Temporal Dead Zone):** let и const технически всплывают, но находятся в "мертвой зоне" до момента объявления. Обращение к ним вызывает ReferenceError.',
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Class Declaration - тоже в TDZ',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Классы:** И class declarations, и class expressions не доступны до их объявления из-за TDZ, в отличие от function declarations.',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Этапы выполнения кода JavaScript',
      blocks: [
        {
          id: 'steps-21',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-22',
              title: 'Compilation',
              blocks: [
                {
                  id: 'cards-23',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-24',
                      blocks: [
                        {
                          id: 'heading-25',
                          type: 'heading',
                          level: 3,
                          text: '1. Фаза компиляции (Compilation Phase)',
                        },
                        {
                          id: 'text-26',
                          type: 'prose',
                          markdown: 'JavaScript движок анализирует код перед выполнением',
                        },
                        {
                          id: 'text-27',
                          type: 'prose',
                          markdown:
                            'На этапе компиляции JavaScript движок **сканирует весь код** и создает **лексическое окружение** (Lexical Environment). Во время этого процесса движок находит все объявления переменных и функций.',
                        },
                        {
                          id: 'timeline-28',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-29',
                              blocks: [
                                {
                                  id: 'text-30',
                                  type: 'prose',
                                  markdown: 'Сканирование кода',
                                },
                                {
                                  id: 'text-31',
                                  type: 'prose',
                                  markdown: 'Движок читает весь код построчно, не выполняя его',
                                },
                              ],
                            },
                            {
                              id: 'event-32',
                              blocks: [
                                {
                                  id: 'text-33',
                                  type: 'prose',
                                  markdown: 'Поиск объявлений',
                                },
                                {
                                  id: 'text-34',
                                  type: 'prose',
                                  markdown: 'Находит var, let, const, function, class объявления',
                                },
                              ],
                            },
                            {
                              id: 'event-35',
                              blocks: [
                                {
                                  id: 'text-36',
                                  type: 'prose',
                                  markdown: 'Создание контекста',
                                },
                                {
                                  id: 'text-37',
                                  type: 'prose',
                                  markdown: 'Создает контекст выполнения и лексическое окружение',
                                },
                              ],
                            },
                            {
                              id: 'event-38',
                              blocks: [
                                {
                                  id: 'text-39',
                                  type: 'prose',
                                  markdown: 'Проверка синтаксиса',
                                },
                                {
                                  id: 'text-40',
                                  type: 'prose',
                                  markdown: 'Обнаруживает синтаксические ошибки',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-41',
                          type: 'heading',
                          level: 4,
                          text: 'Что происходит:',
                        },
                        {
                          id: 'code-42',
                          type: 'code',
                          language: 'javascript',
                          code: example5,
                        },
                        {
                          id: 'callout-43',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-44',
                              type: 'prose',
                              markdown:
                                '**Важно:** На этом этапе код еще НЕ выполняется, только анализируется',
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
              id: 'step-45',
              title: 'Hoisting',
              blocks: [
                {
                  id: 'cards-46',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-47',
                      blocks: [
                        {
                          id: 'heading-48',
                          type: 'heading',
                          level: 3,
                          text: '2. Фаза всплытия (Hoisting Phase)',
                        },
                        {
                          id: 'text-49',
                          type: 'prose',
                          markdown: 'Объявления "поднимаются" в начало области видимости',
                        },
                        {
                          id: 'text-50',
                          type: 'prose',
                          markdown:
                            'Найденные объявления **"всплывают"** в начало их области видимости и регистрируются в лексическом окружении. Разные типы объявлений обрабатываются по-разному.',
                        },
                        {
                          id: 'cards-51',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-52',
                              title: '✅ Доступны сразу',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-53',
                                  type: 'prose',
                                  markdown:
                                    '- **var:** undefined\n- **function declarations:** полностью',
                                },
                              ],
                            },
                            {
                              id: 'card-54',
                              title: '⚠️ В TDZ (недоступны)',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-55',
                                  type: 'prose',
                                  markdown: '- **let/const:** TDZ\n- **class:** TDZ',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-56',
                          type: 'heading',
                          level: 4,
                          text: 'Преобразование кода:',
                        },
                        {
                          id: 'code-57',
                          type: 'code',
                          language: 'javascript',
                          code: example6,
                        },
                        {
                          id: 'text-58',
                          type: 'prose',
                          markdown: 'Результат hoisting:',
                        },
                        {
                          id: 'text-59',
                          type: 'prose',
                          markdown: 'Переменные и функции зарегистрированы',
                        },
                        {
                          id: 'text-60',
                          type: 'prose',
                          markdown: 'TDZ создана для let/const/class',
                        },
                        {
                          id: 'text-61',
                          type: 'prose',
                          markdown: 'var инициализированы как undefined',
                        },
                        {
                          id: 'callout-62',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-63',
                              type: 'prose',
                              markdown:
                                '**TDZ (Temporal Dead Zone):** Период между всплытием и объявлением let/const',
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
              id: 'step-64',
              title: 'Execution',
              blocks: [
                {
                  id: 'cards-65',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-66',
                      blocks: [
                        {
                          id: 'heading-67',
                          type: 'heading',
                          level: 3,
                          text: '3. Фаза выполнения (Execution Phase)',
                        },
                        {
                          id: 'text-68',
                          type: 'prose',
                          markdown: 'Код выполняется построчно с учетом hoisting',
                        },
                        {
                          id: 'text-69',
                          type: 'prose',
                          markdown:
                            'Теперь JavaScript движок **выполняет код построчно**. На этом этапе происходят присваивания значений переменным, вызовы функций, и освобождение переменных из TDZ.',
                        },
                        {
                          id: 'timeline-70',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-71',
                              blocks: [
                                {
                                  id: 'text-72',
                                  type: 'prose',
                                  markdown: 'Выполнение выражений',
                                },
                                {
                                  id: 'text-73',
                                  type: 'prose',
                                  markdown: 'console.log, арифметические операции, вызовы функций',
                                },
                              ],
                            },
                            {
                              id: 'event-74',
                              blocks: [
                                {
                                  id: 'text-75',
                                  type: 'prose',
                                  markdown: 'Присваивание значений',
                                },
                                {
                                  id: 'text-76',
                                  type: 'prose',
                                  markdown: 'var x = 5, let y = 10, const z = 15',
                                },
                              ],
                            },
                            {
                              id: 'event-77',
                              blocks: [
                                {
                                  id: 'text-78',
                                  type: 'prose',
                                  markdown: 'Освобождение из TDZ',
                                },
                                {
                                  id: 'text-79',
                                  type: 'prose',
                                  markdown: 'let/const становятся доступными после объявления',
                                },
                              ],
                            },
                            {
                              id: 'event-80',
                              blocks: [
                                {
                                  id: 'text-81',
                                  type: 'prose',
                                  markdown: 'Создание новых контекстов',
                                },
                                {
                                  id: 'text-82',
                                  type: 'prose',
                                  markdown:
                                    'При вызове функций создаются новые контексты выполнения',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-83',
                          type: 'heading',
                          level: 4,
                          text: 'Пример выполнения:',
                        },
                        {
                          id: 'code-84',
                          type: 'code',
                          language: 'javascript',
                          code: example7,
                        },
                        {
                          id: 'cards-85',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-86',
                              title: '✅ Успешно выполняется',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-87',
                                  type: 'prose',
                                  markdown:
                                    '- Обращение к var (undefined)\n- Вызов function declaration\n- Присваивания значений\n- let/const после объявления',
                                },
                              ],
                            },
                            {
                              id: 'card-88',
                              title: '❌ Вызывает ошибки',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-89',
                                  type: 'prose',
                                  markdown:
                                    '- let/const до объявления (TDZ)\n- function expression как функция\n- Неинициализированный const\n- Необъявленные переменные',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'callout-90',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-91',
                              type: 'prose',
                              markdown:
                                '**Результат:** Код выполнен с учетом всех правил hoisting и областей видимости',
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
      title: 'Практические примеры: частые ловушки',
      blocks: [
        {
          id: 'code-92',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Примеры с собеседований',
      blocks: [
        {
          id: 'code-93',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Взаимодействие с областями видимости',
      blocks: [
        {
          id: 'code-94',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'code-95',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-96',
          type: 'prose',
          markdown:
            '1. **Что такое hoisting в JavaScript?**\n   \n   Механизм, при котором объявления переменных и функций поднимаются в начало их области видимости во время компиляции. Важно: всплывают объявления, не инициализации.\n2. **Чем отличается hoisting для var, let и const?**\n   \n   var всплывает и инициализируется как undefined. let/const всплывают, но остаются в TDZ (Temporal Dead Zone) до момента объявления, обращение к ним вызывает ReferenceError.\n3. **Что такое Temporal Dead Zone (TDZ)?**\n   \n   Время между началом области видимости и моментом объявления let/const переменной, когда переменная существует, но недоступна для использования.\n4. **Всплывают ли function expressions и arrow functions?**\n   \n   Нет, они ведут себя как обычные переменные. Всплывает только объявление переменной (с undefined), но не функция. Function declarations всплывают полностью.\n5. **Как hoisting работает с классами?**\n   \n   Class declarations технически всплывают, но находятся в TDZ, как let/const. Использование до объявления вызывает ReferenceError.\n6. **Почему важно понимать hoisting?**\n   \n   Помогает избежать багов, понимать порядок выполнения кода, объясняет поведение var в циклах, и критично для понимания работы JavaScript движка.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-97',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Всплывает?',
            },
            {
              id: 'column-3',
              label: 'Инициализация',
            },
            {
              id: 'column-4',
              label: 'TDZ',
            },
            {
              id: 'column-5',
              label: 'До объявления',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: '`var`',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: 'undefined',
                  },
                ],
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: 'undefined',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: '`let`',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: '⚠️ Да (в TDZ)',
                  },
                ],
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: 'не инициализируется',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: 'ReferenceError',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: '`const`',
                  },
                ],
                [
                  {
                    id: 'text-109',
                    type: 'prose',
                    markdown: '⚠️ Да (в TDZ)',
                  },
                ],
                [
                  {
                    id: 'text-110',
                    type: 'prose',
                    markdown: 'не инициализируется',
                  },
                ],
                [
                  {
                    id: 'text-111',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: 'ReferenceError',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: '`function` declaration',
                  },
                ],
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: 'полностью',
                  },
                ],
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: 'работает',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: '`function` expression',
                  },
                ],
                [
                  {
                    id: 'text-119',
                    type: 'prose',
                    markdown: '⚠️ Как var',
                  },
                ],
                [
                  {
                    id: 'text-120',
                    type: 'prose',
                    markdown: 'undefined',
                  },
                ],
                [
                  {
                    id: 'text-121',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-122',
                    type: 'prose',
                    markdown: 'TypeError',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown: '`class` declaration',
                  },
                ],
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '⚠️ Да (в TDZ)',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: 'не инициализируется',
                  },
                ],
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown: 'ReferenceError',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Рекомендации для современного JavaScript',
      blocks: [
        {
          id: 'cards-128',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-129',
              blocks: [
                {
                  id: 'heading-130',
                  type: 'heading',
                  level: 3,
                  text: '✅ Используйте',
                },
                {
                  id: 'text-131',
                  type: 'prose',
                  markdown:
                    '- const для констант\n- let для переменных\n- function declarations\n- Объявления в начале области\n- ESLint правила',
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
                  text: '❌ Избегайте',
                },
                {
                  id: 'text-134',
                  type: 'prose',
                  markdown:
                    '- var (legacy код)\n- Использование до объявления\n- Полагание на hoisting\n- Объявления в середине блоков\n- Сложные области видимости',
                },
              ],
            },
            {
              id: 'card-135',
              blocks: [
                {
                  id: 'heading-136',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-137',
                  type: 'prose',
                  markdown:
                    '- Настройте strict mode\n- Используйте линтеры\n- Изучите TDZ\n- Практикуйтесь на примерах\n- Читайте чужой код',
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
          id: 'text-138',
          type: 'prose',
          markdown:
            '**Hoisting** — фундаментальный механизм JavaScript, который влияет на поведение переменных и функций. **var** и **function declarations** всплывают и доступны сразу, **let/const/class** всплывают, но остаются в TDZ. Понимание hoisting критично для написания предсказуемого кода и прохождения технических собеседований. Современная практика: используйте **let/const** вместо **var** и объявляйте переменные в начале области видимости.',
        },
        {
          id: 'resources-139',
          type: 'resources',
          items: [
            {
              id: 'link-140',
              label: 'MDN Hoisting',
              url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
            },
          ],
        },
        {
          id: 'resources-141',
          type: 'resources',
          items: [
            {
              id: 'link-142',
              label: 'TDZ Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
