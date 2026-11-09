import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-symbol-basicsymbolsnippet.txt?raw'
import example2 from '../snippets/javascript/js-symbol-equalitysnippet.txt?raw'
import example3 from '../snippets/javascript/js-symbol-objectkeyssnippet.txt?raw'
import example4 from '../snippets/javascript/js-symbol-globalregistrysnippet.txt?raw'
import example5 from '../snippets/javascript/js-symbol-wellknownsnippet.txt?raw'
import example6 from '../snippets/javascript/js-symbol-practicalexamplessnippet.txt?raw'
import example7 from '../snippets/javascript/js-symbol-interviewquestionssnippet.txt?raw'

// Content copied verbatim from src/views/js/Symbol.vue.
export default {
  ...articleSummaries.jsSymbol,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Symbol** — это примитивный тип данных, введенный в ES6 (ES2015). Каждый символ уникален и неизменяем, что делает его идеальным для создания уникальных идентификаторов и "скрытых" свойств объектов.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы работы с Symbol',
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
                  text: 'Характеристики',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    "- **Уникальность** — каждый символ уникален\n- **Неизменяемость** — нельзя изменить\n- **Примитивный тип** — typeof возвращает 'symbol'\n- **Не автоматически конвертируется** в строки\n- **Невидим для JSON.stringify**",
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
                  text: 'Применение',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Ключи объектов** — скрытые свойства\n- **Константы** — уникальные значения\n- **Well-known символы** — кастомизация поведения\n- **Метаданные** — дополнительная информация\n- **Приватность** — имитация приватных полей',
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
      title: '❌ Равенство символов — главное заблуждение',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Важно:** Symbol("id") == Symbol("id") всегда возвращает `false`! Каждый вызов Symbol() создает новый уникальный символ, даже с одинаковым описанием.',
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
      title: 'Символы как ключи объектов',
      blocks: [
        {
          id: 'callout-13',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-14',
              type: 'prose',
              markdown:
                '**Особенность:** Символьные ключи "невидимы" для большинства методов перебора объектов, что делает их идеальными для создания "скрытых" свойств.',
            },
          ],
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Глобальный реестр символов',
      blocks: [
        {
          id: 'cards-16',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-17',
              title: 'Symbol()',
              blocks: [
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- **Локальный** символ\n- **Уникальный** каждый раз\n- **Не переиспользуется**\n- Используется для приватности',
                },
              ],
            },
            {
              id: 'card-19',
              title: 'Symbol.for()',
              blocks: [
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- **Глобальный** символ\n- **Переиспользуется** по ключу\n- **Один экземпляр** на ключ\n- Используется для интеграции',
                },
              ],
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Well-known символы',
      blocks: [
        {
          id: 'callout-22',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-23',
              type: 'prose',
              markdown:
                '**Well-known символы** — это встроенные символы, которые используются JavaScript для кастомизации поведения объектов. Они позволяют переопределить стандартные операции.',
            },
          ],
        },
        {
          id: 'table-24',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Символ',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '`Symbol.iterator`',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Итерация объекта',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'for...of, spread operator',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '`Symbol.toStringTag`',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Кастомный toString',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Object.prototype.toString',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`Symbol.hasInstance`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Кастомный instanceof',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Оператор instanceof',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '`Symbol.toPrimitive`',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Преобразование типа',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Автоматическое приведение',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`Symbol.asyncIterator`',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Асинхронная итерация',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'for await...of',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Топовые вопросы интервью',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown:
            '1. **Symbol("id") == Symbol("id") — что вернет?**\n   \n   `false`. Каждый вызов Symbol() создает новый уникальный символ, даже если описание одинаковое. Символы уникальны по определению.\n2. **Как получить все ключи объекта, включая символьные?**\n   \n   Использовать `Reflect.ownKeys(obj)` или объединить `Object.keys(obj)` с `Object.getOwnPropertySymbols(obj)`.\n3. **Можно ли использовать символ в JSON?**\n   \n   Нет! JSON.stringify игнорирует символьные ключи и значения. Символы "исчезают" при сериализации в JSON.\n4. **В чем разница между Symbol() и Symbol.for()?**\n   \n   Symbol() создает уникальный локальный символ. Symbol.for(key) ищет символ в глобальном реестре или создает новый, если не найден.\n5. **Можно ли преобразовать символ в строку?**\n   \n   Явно — да: `String(symbol)` или `symbol.toString()`. Неявно — нет: `symbol + ""` вызовет TypeError.\n6. **Зачем нужны Well-known символы?**\n   \n   Для кастомизации стандартного поведения JavaScript: итерации, преобразования типов, instanceof и других встроенных операций без изменения прототипов.\n7. **Как создать "приватные" свойства через символы?**\n   \n   Создать символ в замыкании или модуле, использовать как ключ. Свойство не будет видно в Object.keys(), но не является истинно приватным.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Производительность и ограничения',
      blocks: [
        {
          id: 'cards-44',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Быстрое создание\n- Эффективное сравнение\n- Не влияет на перебор объекта\n- Память — минимальные накладные расходы',
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
                  text: 'Ограничения',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Не сериализуется в JSON\n- Нет автоматического преобразования\n- Не итерируется в for...in\n- Недоступен в старых браузерах',
                },
              ],
            },
            {
              id: 'card-51',
              blocks: [
                {
                  id: 'heading-52',
                  type: 'heading',
                  level: 3,
                  text: 'Когда использовать',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- Уникальные константы\n- Метаданные объектов\n- Кастомизация поведения\n- "Скрытые" свойства',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение с другими подходами',
      blocks: [
        {
          id: 'table-54',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Уникальность',
            },
            {
              id: 'column-3',
              label: 'Производительность',
            },
            {
              id: 'column-4',
              label: 'Приватность',
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
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Symbol**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Гарантированная**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Высокая**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '**Частичная**',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Уникальные идентификаторы',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**UUID/GUID**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Вероятная**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Средняя**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**Нет**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Строковые идентификаторы',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**WeakMap**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '**Полная**',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '**Высокая**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Полная**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Истинно приватные данные',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '**Closure**',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '**Полная**',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**Средняя**',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Полная**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Приватные методы/данные',
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
      title: 'Итог',
      blocks: [
        {
          id: 'text-75',
          type: 'prose',
          markdown:
            '**Symbol** — это уникальные неизменяемые идентификаторы в JavaScript. **Два символа никогда не равны**, даже с одинаковым описанием: `Symbol("id") !== Symbol("id")`. Символы идеально подходят для создания уникальных ключей объектов, констант состояний и кастомизации поведения через Well-known символы. Они "невидимы" для большинства методов перебора, что делает их полезными для метаданных и "скрытых" свойств.',
        },
        {
          id: 'resources-76',
          type: 'resources',
          items: [
            {
              id: 'link-77',
              label: 'MDN Symbol',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
            },
          ],
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'ECMAScript Spec',
              url: 'https://tc39.es/ecma262/#sec-symbol-objects',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
