import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-proto-vs-prototype-prototypesnippet.txt?raw'
import example2 from '../snippets/javascript/js-proto-vs-prototype-protosnippet.txt?raw'
import example3 from '../snippets/javascript/js-proto-vs-prototype-chainsnippet.txt?raw'
import example4 from '../snippets/javascript/js-proto-vs-prototype-modernsyntaxsnippet.txt?raw'
import example5 from '../snippets/javascript/js-proto-vs-prototype-gettersettersnippet.txt?raw'
import example6 from '../snippets/javascript/js-proto-vs-prototype-practicalexamplesnippet.txt?raw'

// Content copied verbatim from src/views/js/ProtoVsPrototype.vue.
export default {
  ...articleSummaries.jsProtoVsPrototype,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Главное различие:** `prototype` — свойство функций-конструкторов, `__proto__` — свойство экземпляров объектов. Это один из самых частых вопросов на собеседованиях по JavaScript, особенно в контексте наследования и ООП.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые различия',
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
                  text: 'prototype',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Есть только у функций**\n- **Шаблон для объектов**\n- **Используется при new**\n- **Содержит методы класса**\n- **Можно модифицировать**',
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
                  text: '__proto__',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Есть у всех объектов**\n- **Ссылка на прототип**\n- **Реальная связь наследования**\n- **Часть цепочки прототипов**\n- **Устаревшее свойство**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'prototype — свойство функций',
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
                '**prototype** существует только у функций-конструкторов и содержит методы и свойства, которые будут доступны всем экземплярам.',
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
      title: '__proto__ — свойство экземпляров',
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
                '**\\_\\_proto\\_\\_** есть у всех объектов и указывает на prototype их конструктора. Это устаревшее свойство, используйте Object.getPrototypeOf().',
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
      title: 'Цепочка прототипов в действии',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Современный синтаксис классов',
      blocks: [
        {
          id: 'code-16',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Современные способы работы с прототипами',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Как это работает под капотом',
      blocks: [
        {
          id: 'cards-18',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'tabs-20',
                  type: 'tabs',
                  items: [
                    {
                      id: 'tab-21',
                      title: 'new Constructor()',
                      blocks: [
                        {
                          id: 'heading-22',
                          type: 'heading',
                          level: 3,
                          text: 'Шаг 1: Вызов new Constructor()',
                        },
                        {
                          id: 'text-23',
                          type: 'prose',
                          markdown: 'Начало процесса создания объекта',
                        },
                        {
                          id: 'text-24',
                          type: 'prose',
                          markdown:
                            'JavaScript видит ключевое слово `new` перед вызовом функции и запускает **специальный алгоритм создания объекта**.',
                        },
                        {
                          id: 'callout-25',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-26',
                              type: 'prose',
                              markdown: '**Пример вызова:**',
                            },
                            {
                              id: 'text-27',
                              type: 'prose',
                              markdown: "`const john = new Person('John', 30)`",
                            },
                          ],
                        },
                        {
                          id: 'text-28',
                          type: 'prose',
                          markdown:
                            '**Важно:** Без `new` функция выполнится как обычная функция, и `this` будет указывать на глобальный объект или `undefined` в strict mode.',
                        },
                        {
                          id: 'cards-29',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-30',
                              blocks: [
                                {
                                  id: 'heading-31',
                                  type: 'heading',
                                  level: 4,
                                  text: 'Статус',
                                },
                                {
                                  id: 'text-32',
                                  type: 'prose',
                                  markdown: 'Запуск алгоритма new',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'tab-33',
                      title: 'Создание',
                      blocks: [
                        {
                          id: 'heading-34',
                          type: 'heading',
                          level: 3,
                          text: 'Шаг 2: Создание пустого объекта',
                        },
                        {
                          id: 'text-35',
                          type: 'prose',
                          markdown: 'Выделение памяти под новый объект',
                        },
                        {
                          id: 'text-36',
                          type: 'prose',
                          markdown:
                            'Создается новый **пустой объект**, который станет результатом операции `new`. Этот объект пока не имеет собственных свойств, но уже существует в памяти.',
                        },
                        {
                          id: 'callout-37',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-38',
                              type: 'prose',
                              markdown: '**Псевдокод:**',
                            },
                            {
                              id: 'text-39',
                              type: 'prose',
                              markdown: '`const newInstance = {}`',
                            },
                          ],
                        },
                        {
                          id: 'text-40',
                          type: 'prose',
                          markdown: 'Объект создан и готов для дальнейшей настройки',
                        },
                        {
                          id: 'cards-41',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-42',
                              blocks: [
                                {
                                  id: 'heading-43',
                                  type: 'heading',
                                  level: 4,
                                  text: 'Статус',
                                },
                                {
                                  id: 'text-44',
                                  type: 'prose',
                                  markdown: 'Объект создан',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'tab-45',
                      title: 'Связывание',
                      blocks: [
                        {
                          id: 'heading-46',
                          type: 'heading',
                          level: 3,
                          text: 'Шаг 3: Установка __proto__',
                        },
                        {
                          id: 'text-47',
                          type: 'prose',
                          markdown: 'Связывание с прототипом конструктора',
                        },
                        {
                          id: 'text-48',
                          type: 'prose',
                          markdown:
                            '`__proto__` нового объекта устанавливается равным `Constructor.prototype`. Это создает **связь наследования** между объектом и прототипом.',
                        },
                        {
                          id: 'callout-49',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-50',
                              type: 'prose',
                              markdown: '**Связывание:**',
                            },
                            {
                              id: 'text-51',
                              type: 'prose',
                              markdown: '`newInstance.__proto__ = Constructor.prototype`',
                            },
                          ],
                        },
                        {
                          id: 'text-52',
                          type: 'prose',
                          markdown:
                            'Теперь объект **наследует все методы** из прототипа конструктора',
                        },
                        {
                          id: 'cards-53',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-54',
                              blocks: [
                                {
                                  id: 'heading-55',
                                  type: 'heading',
                                  level: 4,
                                  text: 'Статус',
                                },
                                {
                                  id: 'text-56',
                                  type: 'prose',
                                  markdown: 'Прототип связан',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'tab-57',
                      title: 'Инициализация',
                      blocks: [
                        {
                          id: 'heading-58',
                          type: 'heading',
                          level: 3,
                          text: 'Шаг 4: Выполнение конструктора',
                        },
                        {
                          id: 'text-59',
                          type: 'prose',
                          markdown: 'Инициализация объекта собственными свойствами',
                        },
                        {
                          id: 'text-60',
                          type: 'prose',
                          markdown:
                            'Функция-конструктор выполняется с `this = newInstance`. В этот момент объект получает свои **собственные свойства**.',
                        },
                        {
                          id: 'callout-61',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-62',
                              type: 'prose',
                              markdown: '**Выполнение:**',
                            },
                            {
                              id: 'text-63',
                              type: 'prose',
                              markdown: '`Constructor.call(newInstance, ...args)`',
                            },
                          ],
                        },
                        {
                          id: 'text-64',
                          type: 'prose',
                          markdown: 'Объект получает собственные свойства (name, age и т.д.)',
                        },
                        {
                          id: 'text-65',
                          type: 'prose',
                          markdown: 'Возвращается готовый объект со всеми свойствами и методами',
                        },
                        {
                          id: 'cards-66',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-67',
                              blocks: [
                                {
                                  id: 'heading-68',
                                  type: 'heading',
                                  level: 4,
                                  text: 'Готово!',
                                },
                                {
                                  id: 'text-69',
                                  type: 'prose',
                                  markdown: 'Объект создан',
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
      ],
    },
    {
      id: 'section-8',
      title: 'Практический пример',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '1. **В чем разница между \\_\\_proto\\_\\_ и prototype?**\n   \n   `prototype` — свойство функций-конструкторов, шаблон для создаваемых объектов. `__proto__` — свойство экземпляров, ссылка на prototype конструктора.\n2. **Что такое цепочка прототипов?**\n   \n   Механизм наследования в JavaScript. Если свойство не найдено в объекте, поиск продолжается по \\_\\_proto\\_\\_ до Object.prototype, затем null.\n3. **Как создать объект без прототипа?**\n   \n   `const obj = Object.create(null)` — создает объект без \\_\\_proto\\_\\_, полностью "чистый" объект без наследования от Object.prototype.\n4. **Почему \\_\\_proto\\_\\_ считается устаревшим?**\n   \n   Это не стандартизованное свойство, хотя поддерживается браузерами. Используйте Object.getPrototypeOf() и Object.setPrototypeOf().\n5. **Что происходит при obj.method()?**\n   \n   Поиск метода: сначала в obj, затем в obj.\\_\\_proto\\_\\_, затем в obj.\\_\\_proto\\_\\_.\\_\\_proto\\_\\_ и так далее по цепочке до null.\n6. **Можно ли изменить prototype после создания объектов?**\n   \n   Да! Изменения в Constructor.prototype влияют на все существующие и будущие экземпляры. Но изменение \\_\\_proto\\_\\_ конкретного объекта влияет только на него.\n7. **Как проверить наследование?**\n   \n   `instanceof` — проверяет цепочку прототипов: `obj instanceof Constructor`. Также: `Constructor.prototype.isPrototypeOf(obj)`',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-72',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Свойство',
            },
            {
              id: 'column-2',
              label: 'prototype',
            },
            {
              id: 'column-3',
              label: '__proto__',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Где существует**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Только у функций',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'У всех объектов',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '**Тип**',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Объект с методами класса',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Ссылка на прототип',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '**Назначение**',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Шаблон для экземпляров',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Связь в цепочке наследования',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**Изменяемость**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Да, влияет на все экземпляры',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Да, влияет на конкретный объект',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**Стандартность**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Стандартное свойство',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Устаревшее, используйте Object.getPrototypeOf()',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Определение методов класса',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Навигация по цепочке прототипов',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Примеры проверки на собеседовании',
      blocks: [
        {
          id: 'cards-91',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-92',
              blocks: [
                {
                  id: 'heading-93',
                  type: 'heading',
                  level: 3,
                  text: 'Код на доске',
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    'Что выведет console.log?  \n Объяснить цепочку поиска  \n Нарисовать диаграмму связей',
                },
              ],
            },
            {
              id: 'card-95',
              blocks: [
                {
                  id: 'heading-96',
                  type: 'heading',
                  level: 3,
                  text: 'Теоретические вопросы',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    'Различия в наследовании  \n Производительность поиска  \n Альтернативы \\_\\_proto\\_\\_',
                },
              ],
            },
            {
              id: 'card-98',
              blocks: [
                {
                  id: 'heading-99',
                  type: 'heading',
                  level: 3,
                  text: 'Практические задачи',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown: 'Реализовать наследование  \n Создать полифил  \n Оптимизировать поиск',
                },
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
          id: 'cards-101',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-102',
              blocks: [
                {
                  id: 'heading-103',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '- Используйте классы ES6+ для ООП\n- Object.getPrototypeOf() вместо \\_\\_proto\\_\\_\n- Object.create() для создания объектов\n- instanceof для проверки типов\n- hasOwnProperty() для собственных свойств',
                },
              ],
            },
            {
              id: 'card-105',
              blocks: [
                {
                  id: 'heading-106',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегайте',
                },
                {
                  id: 'text-107',
                  type: 'prose',
                  markdown:
                    '- Прямое использование \\_\\_proto\\_\\_\n- Модификация Object.prototype\n- Частое изменение prototype\n- Object.setPrototypeOf() в hot path\n- Глубокие цепочки наследования',
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
          id: 'text-108',
          type: 'prose',
          markdown:
            '**prototype** — это свойство функций-конструкторов, содержащее методы для будущих экземпляров. **\\_\\_proto\\_\\_** — это свойство экземпляров, ссылающееся на prototype конструктора. Понимание этого различия критично для понимания наследования в JavaScript и часто проверяется на собеседованиях. Используйте современные методы Object.getPrototypeOf() и классы ES6+.',
        },
        {
          id: 'resources-109',
          type: 'resources',
          items: [
            {
              id: 'link-110',
              label: 'MDN: Prototype Chain',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
            },
          ],
        },
        {
          id: 'resources-111',
          type: 'resources',
          items: [
            {
              id: 'link-112',
              label: 'JavaScript.info',
              url: 'https://javascript.info/prototype-inheritance',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
