import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-this-globalthissnippet.txt?raw'
import example2 from '../snippets/javascript/js-this-objectmethodsnippet.txt?raw'
import example3 from '../snippets/javascript/js-this-constructorsnippet.txt?raw'
import example4 from '../snippets/javascript/js-this-bindcallapplysnippet.txt?raw'
import example5 from '../snippets/javascript/js-this-arrowfunctionssnippet.txt?raw'
import example6 from '../snippets/javascript/js-this-eventhandlerssnippet.txt?raw'
import example7 from '../snippets/javascript/js-this-inline7.txt?raw'
import example8 from '../snippets/javascript/js-this-inline8.txt?raw'
import example9 from '../snippets/javascript/js-this-inline9.txt?raw'
import example10 from '../snippets/javascript/js-this-inline10.txt?raw'
import example11 from '../snippets/javascript/js-this-inline11.txt?raw'
import example12 from '../snippets/javascript/js-this-thisrulessnippet.txt?raw'
import example13 from '../snippets/javascript/js-this-practicalexamplessnippet.txt?raw'

// Content copied verbatim from src/views/js/JavaScriptThis.vue.
export default {
  ...articleSummaries.jsJavaScriptThis,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**this** — одна из самых сложных концепций JavaScript. Значение `this` определяется **тем, как вызывается функция**, а не где она определена. Понимание правил привязки `this` критически важно для работы с JavaScript.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое this?',
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
                  text: 'this — это ссылка',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Контекст выполнения** функции\n- **Объект**, в контексте которого вызвана функция\n- **Неявный параметр** каждой функции\n- **Определяется во время вызова**, не объявления',
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
                  text: 'Распространенные ошибки',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    "- **Потеря контекста** в callback'ах\n- **Неправильное понимание** стрелочных функций\n- **Путаница с методами** объектов\n- **Проблемы с обработчиками** событий",
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
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Методы объектов',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Важно:** При вызове метода объекта `obj.method()` — this равен obj. При присваивании метода переменной контекст теряется!',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Конструкторы и классы',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. call, apply, bind — явная привязка',
      blocks: [
        {
          id: 'cards-14',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-15',
              blocks: [
                {
                  id: 'heading-16',
                  type: 'heading',
                  level: 3,
                  text: 'call()',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: 'Вызывает функцию с указанным this и аргументами через запятую',
                },
              ],
            },
            {
              id: 'card-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: 'apply()',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: 'Вызывает функцию с указанным this и аргументами в виде массива',
                },
              ],
            },
            {
              id: 'card-21',
              blocks: [
                {
                  id: 'heading-22',
                  type: 'heading',
                  level: 3,
                  text: 'bind()',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: 'Создает новую функцию с привязанным this (не вызывает сразу)',
                },
              ],
            },
          ],
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Стрелочные функции',
      blocks: [
        {
          id: 'callout-25',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-26',
              type: 'prose',
              markdown:
                '**Ключевая особенность:** Стрелочные функции НЕ имеют собственного this. Они наследуют this из лексического окружения (где были определены).',
            },
          ],
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Обработчики событий',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Правила определения this',
      blocks: [
        {
          id: 'steps-29',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-30',
              title: 'new',
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
                          text: '1. new (наивысший приоритет)',
                        },
                        {
                          id: 'text-34',
                          type: 'prose',
                          markdown: 'Создание нового объекта',
                        },
                        {
                          id: 'text-35',
                          type: 'prose',
                          markdown:
                            'При вызове функции с оператором `new` создается новый объект, и **this** автоматически ссылается на этот новый объект.',
                        },
                        {
                          id: 'callout-36',
                          type: 'callout',
                          tone: 'error',
                          blocks: [
                            {
                              id: 'text-37',
                              type: 'prose',
                              markdown:
                                '**Наивысший приоритет!** Правило new переопределяет все остальные правила привязки this.',
                            },
                          ],
                        },
                        {
                          id: 'heading-38',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-39',
                          type: 'code',
                          language: 'javascript',
                          code: example7,
                        },
                        {
                          id: 'text-40',
                          type: 'prose',
                          markdown: 'Работает с функциями-конструкторами',
                        },
                        {
                          id: 'text-41',
                          type: 'prose',
                          markdown: 'Работает с классами (ES6+)',
                        },
                        {
                          id: 'text-42',
                          type: 'prose',
                          markdown: 'НЕ работает со стрелочными функциями',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-43',
              title: 'call/apply/bind',
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
                          text: '2. Явная привязка',
                        },
                        {
                          id: 'text-47',
                          type: 'prose',
                          markdown: 'call, apply, bind',
                        },
                        {
                          id: 'text-48',
                          type: 'prose',
                          markdown:
                            'Методы `call()`, `apply()` и `bind()` позволяют **явно указать** значение this при вызове функции.',
                        },
                        {
                          id: 'cards-49',
                          type: 'cards',
                          columns: 3,
                          items: [
                            {
                              id: 'card-50',
                              title: 'call()',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-51',
                                  type: 'prose',
                                  markdown: 'Вызов с this + аргументы через запятую',
                                },
                              ],
                            },
                            {
                              id: 'card-52',
                              title: 'apply()',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-53',
                                  type: 'prose',
                                  markdown: 'Вызов с this + аргументы массивом',
                                },
                              ],
                            },
                            {
                              id: 'card-54',
                              title: 'bind()',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-55',
                                  type: 'prose',
                                  markdown: 'Создает новую функцию с привязанным this',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-56',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-57',
                          type: 'code',
                          language: 'javascript',
                          code: example8,
                        },
                        {
                          id: 'callout-58',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-59',
                              type: 'prose',
                              markdown: 'Приоритет выше неявной привязки, но ниже new',
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
              title: 'obj.method()',
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
                          text: '3. Неявная привязка',
                        },
                        {
                          id: 'text-64',
                          type: 'prose',
                          markdown: 'obj.method()',
                        },
                        {
                          id: 'text-65',
                          type: 'prose',
                          markdown:
                            'При вызове метода объекта `obj.method()` значение **this** автоматически устанавливается равным объекту, который стоит **перед точкой**.',
                        },
                        {
                          id: 'heading-66',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-67',
                          type: 'code',
                          language: 'javascript',
                          code: example9,
                        },
                        {
                          id: 'callout-68',
                          type: 'callout',
                          tone: 'error',
                          blocks: [
                            {
                              id: 'text-69',
                              type: 'prose',
                              markdown:
                                '**Внимание!** При присваивании метода переменной контекст теряется',
                            },
                          ],
                        },
                        {
                          id: 'heading-70',
                          type: 'heading',
                          level: 4,
                          text: 'Ловушка:',
                        },
                        {
                          id: 'code-71',
                          type: 'code',
                          language: 'javascript',
                          code: example10,
                        },
                        {
                          id: 'text-72',
                          type: 'prose',
                          markdown: 'obj.method() — this = obj',
                        },
                        {
                          id: 'text-73',
                          type: 'prose',
                          markdown: 'const func = obj.method; func() — this ≠ obj',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-74',
              title: 'по умолчанию',
              blocks: [
                {
                  id: 'cards-75',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-76',
                      blocks: [
                        {
                          id: 'heading-77',
                          type: 'heading',
                          level: 3,
                          text: '4. Привязка по умолчанию',
                        },
                        {
                          id: 'text-78',
                          type: 'prose',
                          markdown: 'Последний вариант',
                        },
                        {
                          id: 'text-79',
                          type: 'prose',
                          markdown:
                            'Если ни одно из предыдущих правил не применяется, используется **привязка по умолчанию**. Значение this зависит от режима выполнения кода.',
                        },
                        {
                          id: 'cards-80',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-81',
                              title: 'Не строгий режим',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-82',
                                  type: 'prose',
                                  markdown: 'this = Window (браузер) или global (Node.js)',
                                },
                              ],
                            },
                            {
                              id: 'card-83',
                              title: 'Строгий режим',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-84',
                                  type: 'prose',
                                  markdown: 'this = undefined',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-85',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-86',
                          type: 'code',
                          language: 'javascript',
                          code: example11,
                        },
                        {
                          id: 'callout-87',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-88',
                              type: 'prose',
                              markdown:
                                '**Рекомендация:** Всегда используйте строгий режим для предсказуемого поведения this',
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
          id: 'code-89',
          type: 'code',
          language: 'javascript',
          code: example12,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Практические примеры и ловушки',
      blocks: [
        {
          id: 'code-90',
          type: 'code',
          language: 'javascript',
          code: example13,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-91',
          type: 'prose',
          markdown:
            '1. **Чем отличается this в стрелочных функциях?**\n   \n   Стрелочные функции НЕ имеют собственного this. Они наследуют его из лексического окружения. Поэтому call, apply, bind не влияют на this в стрелочных функциях.\n2. **Что происходит с this при потере контекста?**\n   \n   При присваивании метода переменной или передаче в callback this становится undefined (строгий режим) или глобальным объектом. Решение: bind, стрелочные функции или замыкания.\n3. **В чем разница между call, apply и bind?**\n   \n   call и apply сразу вызывают функцию с указанным this (разница в передаче аргументов). bind создает новую функцию с привязанным this, но не вызывает её.\n4. **Как this работает в классах?**\n   \n   В конструкторе this = создаваемый экземпляр. В методах класса this = экземпляр, который вызвал метод. Стрелочные функции как свойства класса привязывают this к экземпляру.\n5. **Почему в обработчиках событий this = элемент?**\n   \n   Браузер автоматически устанавливает this равным элементу, на котором произошло событие. Это удобно для доступа к свойствам элемента, но может вызывать путаницу.\n6. **Как запомнить правила определения this?**\n   \n   Мнемоника: "Новый Явный Неявный По-умолчанию" (new → call/apply/bind → obj.method() → global/undefined). Стрелочные функции игнорируют все правила и берут this из лексической области.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Сравнение подходов решения проблем с this',
      blocks: [
        {
          id: 'table-92',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Проблема',
            },
            {
              id: 'column-2',
              label: 'bind()',
            },
            {
              id: 'column-3',
              label: 'Стрелочная функция',
            },
            {
              id: 'column-4',
              label: 'call/apply',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: '**Callback функции**',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: '✅ Создает новую функцию',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '✅ Наследует this',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: '⚡ Только для разового вызова',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: '**Event handlers**',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: '✅ Сохраняет контекст класса',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: '✅ Автопривязка в классах',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: '❌ Не подходит',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: '**Методы массивов**',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: '⚡ Дополнительная функция',
                  },
                ],
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: '✅ Лаконично',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: '💡 thisArg параметр',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: '⚡ Создание функции',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: '✅ Оптимально',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: '✅ Прямой вызов',
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
          id: 'cards-109',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-110',
              blocks: [
                {
                  id: 'heading-111',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-112',
                  type: 'prose',
                  markdown:
                    '- Использовать стрелочные функции для callbacks\n- Применять bind для методов в конструкторах\n- Понимать контекст перед использованием this\n- Использовать строгий режим\n- Проверять this в отладчике',
                },
              ],
            },
            {
              id: 'card-113',
              blocks: [
                {
                  id: 'heading-114',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-115',
                  type: 'prose',
                  markdown:
                    '- Путать лексическое и динамическое this\n- Забывать про потерю контекста\n- Использовать стрелочные функции как методы\n- Полагаться на глобальный this\n- Игнорировать строгий режим',
                },
              ],
            },
            {
              id: 'card-116',
              blocks: [
                {
                  id: 'heading-117',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    '- Используйте console.log(this) для отладки\n- Изучите паттерн "that = this"\n- Практикуйтесь с разными контекстами\n- Читайте код других разработчиков\n- Используйте ESLint правила',
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
          id: 'text-119',
          type: 'prose',
          markdown:
            '**this** — это ссылка на контекст выполнения функции, которая определяется способом её вызова. Понимание правил привязки this (new → явная → неявная → по умолчанию) и особенностей стрелочных функций критически важно для эффективной работы с JavaScript. Используйте стрелочные функции для callbacks и bind для сохранения контекста в методах.',
        },
        {
          id: 'resources-120',
          type: 'resources',
          items: [
            {
              id: 'link-121',
              label: 'MDN: this',
              url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this',
            },
          ],
        },
        {
          id: 'resources-122',
          type: 'resources',
          items: [
            {
              id: 'link-123',
              label: 'Учебник JavaScript',
              url: 'https://learn.javascript.ru/object-methods',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
