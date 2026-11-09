import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-object-flags-descriptors-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-object-flags-descriptors-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-object-flags-descriptors-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-object-flags-descriptors-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-object-flags-descriptors-snippet5.txt?raw'
import example6 from '../snippets/javascript/js-object-flags-descriptors-snippet6.txt?raw'

// Content copied verbatim from src/views/js/ObjectPropertyFlags.vue.
export default {
  ...articleSummaries.jsObjectPropertyFlags,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'В JavaScript каждое свойство объекта имеет не только значение, но и три специальных флага, которые контролируют поведение этого свойства: **writable**, **enumerable** и **configurable**. Эти флаги называются **дескрипторами свойств** и позволяют точно настроить, как свойство ведёт себя при различных операциях.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы дескрипторов свойств',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Флаг',
            },
            {
              id: 'column-2',
              label: 'Значение по умолчанию',
            },
            {
              id: 'column-3',
              label: 'Что контролирует',
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
                    markdown: '**writable**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'true (для обычных свойств)',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Можно ли изменить значение свойства',
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
                    markdown: '**enumerable**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'true (для обычных свойств)',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Появляется ли свойство в циклах for...in и Object.keys()',
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
                    markdown: '**configurable**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'true (для обычных свойств)',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Можно ли удалить свойство или изменить его дескрипторы',
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
      title: 'Получение и установка дескрипторов',
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
      title: '1. Флаг writable - возможность изменения',
      blocks: [
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            'Когда `writable: false`, свойство становится доступным только для чтения. Попытки изменить его значение игнорируются в обычном режиме или вызывают ошибку в строгом режиме.',
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
      title: '2. Флаг enumerable - видимость в перечислении',
      blocks: [
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            'Когда `enumerable: false`, свойство не появляется в циклах `for...in`, `Object.keys()`, `Object.values()` и `JSON.stringify()`.',
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
      title: '3. Флаг configurable - возможность конфигурирования',
      blocks: [
        {
          id: 'text-17',
          type: 'prose',
          markdown:
            'Когда `configurable: false`, свойство нельзя удалить и нельзя изменить его дескрипторы. Это самый "жёсткий" флаг - если он false, то обратно его уже не изменить.',
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Работа с множественными свойствами',
      blocks: [
        {
          id: 'code-19',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические применения',
      blocks: [
        {
          id: 'code-20',
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
          id: 'text-21',
          type: 'prose',
          markdown:
            '1. **Какие значения по умолчанию у флагов при создании через Object.defineProperty?**\n   \n   При использовании `Object.defineProperty` все флаги по умолчанию равны `false`. При создании свойства через обычное присвоение (`obj.prop = value`) все флаги равны `true`.\n2. **Можно ли изменить configurable с false на true?**\n   \n   Нет, это единственное исключение. Если `configurable: false`, то изменить этот флаг обратно на `true` уже нельзя. Можно только изменить `writable` с `true` на `false`.\n3. **В чём разница между enumerable: false и Symbol-свойствами?**\n   \n   Свойства с `enumerable: false` всё ещё доступны через `Object.getOwnPropertyNames()`. Symbol-свойства не перечисляются вообще и доступны только через `Object.getOwnPropertySymbols()`.\n4. **Как это связано с наследованием и prototype?**\n   \n   Флаги действуют только на собственные свойства объекта. Унаследованные свойства имеют свои дескрипторы. `for...in` перечисляет enumerable-свойства всей цепочки прототипов.\n5. **Что происходит при Object.freeze() и Object.seal()?**\n   \n   `Object.freeze()` делает все свойства `writable: false` и `configurable: false`. `Object.seal()` делает все свойства `configurable: false`, но оставляет `writable: true`.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Связанные методы Object',
      blocks: [
        {
          id: 'cards-22',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-23',
              title: 'Получение дескрипторов',
              blocks: [
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- `Object.getOwnPropertyDescriptor()`\n- `Object.getOwnPropertyDescriptors()`\n- `Object.getOwnPropertyNames()`',
                },
              ],
            },
            {
              id: 'card-25',
              title: 'Установка дескрипторов',
              blocks: [
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown:
                    '- `Object.defineProperty()`\n- `Object.defineProperties()`\n- `Object.create()`',
                },
              ],
            },
            {
              id: 'card-27',
              title: 'Управление объектом',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- `Object.freeze()`\n- `Object.seal()`\n- `Object.preventExtensions()`',
                },
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
          id: 'text-29',
          type: 'prose',
          markdown:
            'Флаги свойств объектов (`writable`, `enumerable`, `configurable`) предоставляют точный контроль над поведением свойств. `writable` контролирует изменяемость, `enumerable` - видимость в перечислениях, `configurable` - возможность удаления и изменения дескрипторов. Понимание этих механизмов критично для создания надёжных библиотек и фреймворков, а также для работы с мета-программированием в JavaScript.',
        },
        {
          id: 'resources-30',
          type: 'resources',
          items: [
            {
              id: 'link-31',
              label: 'MDN: Object.defineProperty',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
