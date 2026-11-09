import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-prototype-basicprototypesnippet.txt?raw'
import example2 from '../snippets/javascript/js-prototype-prototypechainsnippet.txt?raw'
import example3 from '../snippets/javascript/js-prototype-objectprototypesnippet.txt?raw'
import example4 from '../snippets/javascript/js-prototype-modernsyntaxsnippet.txt?raw'
import example5 from '../snippets/javascript/js-prototype-prototypepollutionsnippet.txt?raw'
import example6 from '../snippets/javascript/js-prototype-practicalexamplesnippet.txt?raw'

// Content copied verbatim from src/views/js/JavaScriptPrototype.vue.
export default {
  ...articleSummaries.jsJavaScriptPrototype,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Prototype (прототип)** — это фундаментальный механизм JavaScript для наследования и переиспользования кода. Каждый объект в JavaScript имеет скрытую ссылку на другой объект, называемый его прототипом. Когда свойство или метод не найдены в объекте, JavaScript ищет их в цепочке прототипов.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы: функции-конструкторы и prototype',
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
                  text: 'Function.prototype',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- Каждая **функция** имеет свойство prototype\n- **Объект**, который станет прототипом экземпляров\n- **Методы** добавляются в prototype\n- **Переиспользование** между экземплярами\n- **Экономия памяти** — один метод для всех',
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
                  text: '[[Prototype]]',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Каждый **объект** имеет внутреннюю ссылку \\[\\[Prototype\\]\\]\n- **Доступ** через \\_\\_proto\\_\\_ или Object.getPrototypeOf()\n- **Цепочка поиска** свойств и методов\n- **Наследование** свойств от прототипа\n- **Автоматическое** связывание при new',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Цепочка прототипов (Prototype Chain)',
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
                '**Ключевой принцип:** Когда JavaScript не находит свойство в объекте, он ищет его в прототипе объекта, затем в прототипе прототипа, и так далее до Object.prototype.',
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
      id: 'section-3',
      title: 'Как работает поиск свойств',
      blocks: [
        {
          id: 'cards-13',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'tabs-15',
                  type: 'tabs',
                  items: [
                    {
                      id: 'tab-16',
                      title: 'Объект',
                      blocks: [
                        {
                          id: 'heading-17',
                          type: 'heading',
                          level: 3,
                          text: 'Поиск в самом объекте',
                        },
                        {
                          id: 'text-18',
                          type: 'prose',
                          markdown: 'Первый этап поиска свойства',
                        },
                        {
                          id: 'text-19',
                          type: 'prose',
                          markdown:
                            'Сначала JavaScript ищет свойство в **собственных свойствах** объекта.',
                        },
                        {
                          id: 'callout-20',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-21',
                              type: 'prose',
                              markdown: "`obj.hasOwnProperty('property')`",
                            },
                          ],
                        },
                        {
                          id: 'text-22',
                          type: 'prose',
                          markdown: 'Если свойство найдено здесь, поиск **завершается успешно**',
                        },
                        {
                          id: 'text-23',
                          type: 'prose',
                          markdown: 'Если нет — переходим к следующему шагу',
                        },
                      ],
                    },
                    {
                      id: 'tab-24',
                      title: 'Прототип',
                      blocks: [
                        {
                          id: 'heading-25',
                          type: 'heading',
                          level: 3,
                          text: 'Поиск в прототипе',
                        },
                        {
                          id: 'text-26',
                          type: 'prose',
                          markdown: 'Второй этап — поиск в \\[\\[Prototype\\]\\]',
                        },
                        {
                          id: 'text-27',
                          type: 'prose',
                          markdown:
                            'Если не найдено, ищет в объекте, на который ссылается **\\[\\[Prototype\\]\\]**.',
                        },
                        {
                          id: 'callout-28',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-29',
                              type: 'prose',
                              markdown: '`obj.__proto__` или `Object.getPrototypeOf(obj)`',
                            },
                          ],
                        },
                        {
                          id: 'text-30',
                          type: 'prose',
                          markdown:
                            'Например, методы из `Constructor.prototype` будут найдены на этом шаге',
                        },
                      ],
                    },
                    {
                      id: 'tab-31',
                      title: 'Прототип прототипа',
                      blocks: [
                        {
                          id: 'heading-32',
                          type: 'heading',
                          level: 3,
                          text: 'Поиск выше по цепочке',
                        },
                        {
                          id: 'text-33',
                          type: 'prose',
                          markdown: 'Рекурсивный поиск по всей цепочке',
                        },
                        {
                          id: 'text-34',
                          type: 'prose',
                          markdown:
                            'Процесс повторяется **рекурсивно** по всей цепочке прототипов.',
                        },
                        {
                          id: 'callout-35',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-36',
                              type: 'prose',
                              markdown: '`obj → Constructor.prototype → Object.prototype`',
                            },
                          ],
                        },
                        {
                          id: 'text-37',
                          type: 'prose',
                          markdown:
                            'Здесь будут найдены встроенные методы: `toString()`, `hasOwnProperty()` и др.',
                        },
                      ],
                    },
                    {
                      id: 'tab-38',
                      title: 'null',
                      blocks: [
                        {
                          id: 'heading-39',
                          type: 'heading',
                          level: 3,
                          text: 'Конец цепочки',
                        },
                        {
                          id: 'text-40',
                          type: 'prose',
                          markdown: 'Финальный этап поиска',
                        },
                        {
                          id: 'text-41',
                          type: 'prose',
                          markdown: 'Если дошли до **null** (конец цепочки), свойство не найдено.',
                        },
                        {
                          id: 'callout-42',
                          type: 'callout',
                          tone: 'error',
                          blocks: [
                            {
                              id: 'text-43',
                              type: 'prose',
                              markdown: '`Object.prototype.__proto__ === null`',
                            },
                          ],
                        },
                        {
                          id: 'text-44',
                          type: 'prose',
                          markdown:
                            'Возвращается `undefined` при обращении к несуществующему свойству',
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
      id: 'section-4',
      title: 'Object.prototype и встроенные методы',
      blocks: [
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Классы ES6+ — синтаксический сахар',
      blocks: [
        {
          id: 'callout-46',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-47',
              type: 'prose',
              markdown:
                '**Важно:** Классы в JavaScript — это синтаксический сахар над прототипами. Под капотом всё работает через прототипы!',
            },
          ],
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '⚠️ Prototype Pollution — угроза безопасности',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практический пример: EventEmitter',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-51',
          type: 'prose',
          markdown:
            "1. **В чем разница между \\_\\_proto\\_\\_ и prototype?**\n   \n   `prototype` — это свойство функций-конструкторов, объект, который станет прототипом для экземпляров. `__proto__` — это ссылка на прототип конкретного объекта. У каждого объекта есть \\_\\_proto\\_\\_, но prototype только у функций.\n2. **Что происходит при вызове new Constructor()?**\n   \n   1\\. Создается новый объект; 2. Его \\[\\[Prototype\\]\\] устанавливается на Constructor.prototype; 3. Constructor вызывается с this = новый объект; 4. Возвращается объект (если конструктор не вернул свой объект).\n3. **Как реализовать наследование через прототипы?**\n   \n   Использовать `Object.create()`: Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child; Или современный синтаксис: class Child extends Parent.\n4. **Чем отличается hasOwnProperty от обычной проверки свойства?**\n   \n   `obj.hasOwnProperty('prop')` проверяет только собственные свойства объекта. `'prop' in obj` или `obj.prop` ищут по всей цепочке прототипов.\n5. **Как создать объект без прототипа?**\n   \n   `Object.create(null)` создает объект без прототипа. У такого объекта нет встроенных методов как toString(), но он идеален для словарей/хеш-таблиц, чтобы избежать конфликтов с ключами.\n6. **Что такое Prototype Pollution атака?**\n   \n   Уязвимость, когда злоумышленник может изменить Object.prototype, добавив вредоносные свойства, которые наследуются всеми объектами. Защита: валидация входных данных, Object.create(null), Object.freeze().\n7. **Можно ли изменить прототип существующего объекта?**\n   \n   Да, через Object.setPrototypeOf(obj, newProto) или obj.\\_\\_proto\\_\\_ = newProto (deprecated). Но это медленная операция, лучше устанавливать прототип при создании через Object.create().",
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Методы работы с прототипами',
      blocks: [
        {
          id: 'table-52',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
            {
              id: 'column-4',
              label: 'Рекомендация',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '`Object.create(proto)`',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Создает объект с указанным прототипом',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '`Object.create(Animal.prototype)`',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**✅ Использовать**',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`Object.getPrototypeOf(obj)`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Получает прототип объекта',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '`Object.getPrototypeOf(dog)`',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**✅ Использовать**',
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
                    markdown: '`Object.setPrototypeOf(obj, proto)`',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Изменяет прототип объекта',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '`Object.setPrototypeOf(obj, proto)`',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '**⚠️ Осторожно**',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '`obj.__proto__`',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Доступ к прототипу (legacy)',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '`obj.__proto__.method`',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**❌ Deprecated**',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`obj.isPrototypeOf(other)`',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Проверяет, является ли объект прототипом',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '`Animal.prototype.isPrototypeOf(dog)`',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**✅ Использовать**',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '`obj instanceof Constructor`',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Проверяет принадлежность к конструктору',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`dog instanceof Animal`',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '**✅ Использовать**',
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
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-77',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Использовать классы ES6+ для наследования\n- Применять Object.create() для прототипов\n- Добавлять методы в prototype, а не в конструктор\n- Использовать hasOwnProperty() для проверки\n- Понимать цепочку прототипов\n- Проверять instanceof для типов',
                },
              ],
            },
            {
              id: 'card-81',
              blocks: [
                {
                  id: 'heading-82',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Изменения Object.prototype\n- Использования \\_\\_proto\\_\\_ в продакшене\n- Забывания про prototype.constructor\n- Создания слишком длинных цепочек\n- Частого использования setPrototypeOf\n- Смешивания функций и стрелочных функций',
                },
              ],
            },
            {
              id: 'card-84',
              blocks: [
                {
                  id: 'heading-85',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Изучите встроенные прототипы (Array, Object)\n- Используйте полифиллы для понимания\n- Практикуйтесь с наследованием\n- Изучите паттерны JavaScript\n- Понимайте производительность\n- Осторожно с безопасностью',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Визуализация цепочки прототипов',
      blocks: [
        {
          id: 'cards-87',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-88',
              blocks: [
                {
                  id: 'tags-89',
                  type: 'tags',
                  items: ['dog'],
                },
                {
                  id: 'tags-90',
                  type: 'tags',
                  items: ['Dog.prototype'],
                },
                {
                  id: 'tags-91',
                  type: 'tags',
                  items: ['Animal.prototype'],
                },
                {
                  id: 'tags-92',
                  type: 'tags',
                  items: ['Object.prototype'],
                },
                {
                  id: 'tags-93',
                  type: 'tags',
                  items: ['null'],
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown: 'При поиске свойства JavaScript проходит по этой цепочке слева направо',
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
          id: 'text-95',
          type: 'prose',
          markdown:
            '**Prototype** — это основа ООП в JavaScript. Он позволяет объектам наследовать свойства и методы друг от друга через цепочку прототипов. Понимание прототипов критически важно для эффективной работы с JavaScript, написания качественного кода и прохождения собеседований. Современные классы ES6+ — это удобный синтаксис, но под капотом всё равно работают прототипы.',
        },
        {
          id: 'resources-96',
          type: 'resources',
          items: [
            {
              id: 'link-97',
              label: 'MDN Prototype Chain',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
            },
          ],
        },
        {
          id: 'resources-98',
          type: 'resources',
          items: [
            {
              id: 'link-99',
              label: 'JavaScript.info',
              url: 'https://javascript.info/prototypes',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
