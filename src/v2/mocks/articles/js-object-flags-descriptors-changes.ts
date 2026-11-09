import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-object-flags-descriptors-changes-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-object-flags-descriptors-changes-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-object-flags-descriptors-changes-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-object-flags-descriptors-changes-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-object-flags-descriptors-changes-snippet5.txt?raw'

// Content copied verbatim from src/views/js/ObjectPropertyFlagsChanges.vue.
export default {
  ...articleSummaries.jsObjectPropertyFlagsChanges,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Дескрипторы свойств** — это объекты, которые описывают свойства других объектов в JavaScript. Каждое свойство объекта имеет дескриптор, который определяет его поведение: можно ли изменять значение, видимо ли оно при перечислении, можно ли удалить и т.д.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Типы дескрипторов',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Свойства',
            },
            {
              id: 'column-3',
              label: 'Описание',
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
                    markdown: '**Data descriptor**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'value, writable',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Обычные свойства с значением',
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
                    markdown: '**Accessor descriptor**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'get, set',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Свойства с геттерами и сеттерами',
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
                    markdown: '**Общие свойства**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'enumerable, configurable',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Есть у обоих типов',
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
      title: 'Флаги дескрипторов',
      blocks: [
        {
          id: 'cards-12',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-13',
              title: 'writable',
              blocks: [
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown: 'Можно ли изменять значение свойства',
                },
                {
                  id: 'tags-15',
                  type: 'tags',
                  items: ['true'],
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: 'можно изменять',
                },
                {
                  id: 'break-17',
                  type: 'line-break',
                },
                {
                  id: 'tags-18',
                  type: 'tags',
                  items: ['false'],
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'только чтение',
                },
              ],
            },
            {
              id: 'card-20',
              title: 'enumerable',
              blocks: [
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: 'Видно ли свойство при перечислении',
                },
                {
                  id: 'tags-22',
                  type: 'tags',
                  items: ['true'],
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: 'видно в for..in, Object.keys()',
                },
                {
                  id: 'break-24',
                  type: 'line-break',
                },
                {
                  id: 'tags-25',
                  type: 'tags',
                  items: ['false'],
                },
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown: 'скрыто при перечислении',
                },
              ],
            },
            {
              id: 'card-27',
              title: 'configurable',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: 'Можно ли удалить свойство или изменить дескриптор',
                },
                {
                  id: 'tags-29',
                  type: 'tags',
                  items: ['true'],
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown: 'можно удалить/настроить',
                },
                {
                  id: 'break-31',
                  type: 'line-break',
                },
                {
                  id: 'tags-32',
                  type: 'tags',
                  items: ['false'],
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: 'неизменяемый дескриптор',
                },
              ],
            },
            {
              id: 'card-34',
              title: 'value',
              blocks: [
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown: 'Значение свойства (для data descriptor)',
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown: 'Может быть любым JavaScript значением',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: '1. Получение дескриптора',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown:
            '`Object.getOwnPropertyDescriptor()` возвращает дескриптор конкретного свойства:',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: '2. Изменение флагов свойства',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown: '`Object.defineProperty()` создает новое свойство или изменяет существующее:',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: '3. Геттеры и сеттеры',
      blocks: [
        {
          id: 'text-41',
          type: 'prose',
          markdown: 'Accessor descriptors позволяют создавать вычисляемые свойства:',
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: '4. Практическое применение',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown: 'Создание скрытых и неизменяемых свойств:',
        },
        {
          id: 'code-44',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: '5. Паттерн: Контролируемые свойства',
      blocks: [
        {
          id: 'text-45',
          type: 'prose',
          markdown: 'Создание объектов с валидацией и неизменяемыми свойствами:',
        },
        {
          id: 'code-46',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Связанные методы',
      blocks: [
        {
          id: 'cards-47',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-48',
              title: 'Получение дескрипторов',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- `Object.getOwnPropertyDescriptor()`\n- `Object.getOwnPropertyDescriptors()`',
                },
              ],
            },
            {
              id: 'card-50',
              title: 'Определение свойств',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: '- `Object.defineProperty()`\n- `Object.defineProperties()`',
                },
              ],
            },
            {
              id: 'card-52',
              title: 'Блокировка объектов',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- `Object.preventExtensions()`\n- `Object.seal()`\n- `Object.freeze()`',
                },
              ],
            },
            {
              id: 'card-54',
              title: 'Проверка состояния',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- `Object.isExtensible()`\n- `Object.isSealed()`\n- `Object.isFrozen()`',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-56',
          type: 'prose',
          markdown:
            "1. **Какие флаги по умолчанию у обычных свойств?**\n   \n   У свойств, созданных через присвоение (`obj.prop = value`), все флаги `true`. У свойств, созданных через `defineProperty` без явного указания флагов — все `false`.\n2. **В чем разница между writable: false и Object.freeze()?**\n   \n   `writable: false` блокирует только изменение конкретного свойства. `Object.freeze()` блокирует изменение всех свойств объекта и запрещает добавление новых.\n3. **Можно ли изменить флаги, если configurable: false?**\n   \n   Нет, если `configurable: false`, то нельзя изменить дескриптор или удалить свойство. Исключение: можно изменить `writable` с `true` на `false`, но не наоборот.\n4. **Что происходит при попытке записи в writable: false?**\n   \n   В нестрогом режиме операция тихо игнорируется. В строгом режиме (`'use strict'`) выбрасывается `TypeError`.\n5. **Как создать действительно приватные свойства?**\n   \n   Дескрипторы не делают свойства приватными — они остаются доступными напрямую. Для приватности используйте замыкания, WeakMap, или современный синтаксис приватных полей `#privateField`.",
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Итог',
      blocks: [
        {
          id: 'text-57',
          type: 'prose',
          markdown:
            'Дескрипторы свойств позволяют тонко настраивать поведение свойств объектов в JavaScript. `Object.getOwnPropertyDescriptor()` получает информацию о свойстве, а `Object.defineProperty()` создает или изменяет свойства с нужными флагами. Это основа для создания неизменяемых объектов, валидации данных и реализации геттеров/сеттеров.',
        },
        {
          id: 'resources-58',
          type: 'resources',
          items: [
            {
              id: 'link-59',
              label: 'MDN: Object.defineProperty()',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
