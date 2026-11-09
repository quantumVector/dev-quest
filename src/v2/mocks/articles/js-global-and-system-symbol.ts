import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-global-and-system-symbol-localsymbolssnippet.txt?raw'
import example2 from '../snippets/javascript/js-global-and-system-symbol-globalsymbolssnippet.txt?raw'
import example3 from '../snippets/javascript/js-global-and-system-symbol-practicalexamplesnippet.txt?raw'
import example4 from '../snippets/javascript/js-global-and-system-symbol-systemsymbolssnippet.txt?raw'
import example5 from '../snippets/javascript/js-global-and-system-symbol-asynciteratorsnippet.txt?raw'
import example6 from '../snippets/javascript/js-global-and-system-symbol-symbolspeciessnippet.txt?raw'
import example7 from '../snippets/javascript/js-global-and-system-symbol-toprimitivesnippet.txt?raw'
import example8 from '../snippets/javascript/js-global-and-system-symbol-proxysymbolssnippet.txt?raw'
import example9 from '../snippets/javascript/js-global-and-system-symbol-comparingsymbolssnippet.txt?raw'

// Content copied verbatim from src/views/js/GlobalAndSystemSymbols.vue.
export default {
  ...articleSummaries.jsGlobalAndSystemSymbols,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Как сделать два символа с одним именем?** В JavaScript есть несколько способов работы с символами: локальные символы (всегда уникальны), глобальные символы через `Symbol.for()` (могут быть одинаковыми) и системные символы (предопределенные).',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Локальные символы — всегда уникальны',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Важно:** Обычные символы `Symbol()` всегда создают уникальные значения, даже с одинаковым описанием!',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Глобальный реестр символов — Symbol.for()',
      blocks: [
        {
          id: 'callout-5',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-6',
              type: 'prose',
              markdown:
                '**Решение:** `Symbol.for(key)` создает глобальные символы, которые могут быть одинаковыми при одинаковом ключе!',
            },
          ],
        },
        {
          id: 'code-7',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Разница между типами символов',
      blocks: [
        {
          id: 'cards-8',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'Локальные Symbol()',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Всегда уникальны**\n- Существуют только в области видимости\n- Нет доступа из других модулей\n- Symbol.keyFor() → undefined\n- Идеальны для приватных свойств',
                },
              ],
            },
            {
              id: 'card-12',
              blocks: [
                {
                  id: 'heading-13',
                  type: 'heading',
                  level: 3,
                  text: 'Глобальные Symbol.for()',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown:
                    '- **Могут быть одинаковыми**\n- Доступны глобально\n- Переиспользуются между модулями\n- Symbol.keyFor() → ключ\n- Идеальны для межмодульного API',
                },
              ],
            },
            {
              id: 'card-15',
              blocks: [
                {
                  id: 'heading-16',
                  type: 'heading',
                  level: 3,
                  text: 'Системные Symbol.*',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown:
                    '- **Предопределены движком**\n- Управляют поведением языка\n- Доступны как Symbol.iterator\n- Symbol.keyFor() → undefined\n- Используются для метапрограммирования',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Практический пример: межмодульное взаимодействие',
      blocks: [
        {
          id: 'code-18',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Системные (Well-Known) символы',
      blocks: [
        {
          id: 'text-19',
          type: 'prose',
          markdown:
            'Системные символы — это предопределенные символы, которые JavaScript использует внутренне для управления поведением объектов. Они позволяют кастомизировать встроенные операции.',
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
      title: 'Symbol.asyncIterator — асинхронная итерация',
      blocks: [
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Symbol.species — контроль наследования',
      blocks: [
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Symbol.toPrimitive — кастомное преобразование',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Символы в метапрограммировании',
      blocks: [
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение всех типов символов',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Все системные символы',
      blocks: [
        {
          id: 'table-26',
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
                    id: 'text-27',
                    type: 'prose',
                    markdown: '`Symbol.iterator`',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Итерация (for...of)',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Делает объект итерируемым',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '`Symbol.asyncIterator`',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Асинхронная итерация',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'for await...of',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`Symbol.toStringTag`',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Object.prototype.toString()',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Кастомный тег объекта',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`Symbol.toPrimitive`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Преобразование к примитиву',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Контроль +, String(), Number()',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`Symbol.species`',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Конструктор производных объектов',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'map(), filter(), slice()',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`Symbol.hasInstance`',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'instanceof оператор',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'obj instanceof Constructor',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`Symbol.match`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'String.prototype.match()',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Кастомное поведение match',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '`Symbol.replace`',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'String.prototype.replace()',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Кастомное поведение replace',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '`Symbol.search`',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'String.prototype.search()',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Кастомное поведение search',
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`Symbol.split`',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'String.prototype.split()',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Кастомное поведение split',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-57',
          type: 'prose',
          markdown:
            '1. **В чем разница между Symbol() и Symbol.for()?**\n   \n   `Symbol()` всегда создает уникальный символ. `Symbol.for(key)` создает или возвращает существующий глобальный символ по ключу. Глобальные символы позволяют создать "два символа с одним именем" (одинаковые символы).\n2. **Как проверить, является ли символ глобальным?**\n   \n   Использовать `Symbol.keyFor(symbol)`. Если возвращается строка — символ глобальный. Если `undefined` — локальный или системный.\n3. **Зачем нужны системные символы?**\n   \n   Они позволяют кастомизировать встроенное поведение JavaScript: итерацию, преобразования типов, строковые операции. Это основа метапрограммирования в JS.\n4. **Можно ли создать свой системный символ?**\n   \n   Нет, системные символы предопределены движком. Но можно создать глобальный символ с соглашением об именовании (например, `Symbol.for(\'myLib.customBehavior\')`).\n5. **В чем польза Symbol.iterator?**\n   \n   Позволяет сделать любой объект итерируемым для `for...of`, деструктуризации, `Array.from()`, spread оператора. Объект определяет собственную логику итерации.\n6. **Как Symbol.toPrimitive влияет на производительность?**\n   \n   При частых преобразованиях типов кастомный `Symbol.toPrimitive` может быть быстрее стандартных методов `valueOf()` и `toString()`, так как вызывается напрямую без цепочки вызовов.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Использовать Symbol.for() для публичного API\n- Локальные Symbol() для приватности\n- Системные символы для кастомизации\n- Осмысленные ключи для глобальных символов\n- Документировать использование символов',
                },
              ],
            },
            {
              id: 'card-62',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Переопределения системных символов без нужды\n- Слишком много глобальных символов\n- Symbol() вместо Symbol.for() для общего API\n- Конфликтующие имена глобальных символов\n- Использования символов как строк',
                },
              ],
            },
            {
              id: 'card-65',
              blocks: [
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- Именуйте глобальные символы с префиксом\n- Кэшируйте часто используемые символы\n- Проверяйте поддержку символов в старых браузерах\n- Используйте TypeScript для типизации символов\n- Тестируйте поведение с системными символами',
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
          id: 'text-68',
          type: 'prose',
          markdown:
            '**Ответ на вопрос:** "Два символа с одним именем" создаются через **глобальный реестр Symbol.for(key)**. В отличие от локальных символов, глобальные символы с одинаковым ключом возвращают одинаковые значения. **Системные символы** позволяют кастомизировать встроенное поведение JavaScript, делая язык более гибким для метапрограммирования.',
        },
        {
          id: 'resources-69',
          type: 'resources',
          items: [
            {
              id: 'link-70',
              label: 'MDN Symbol',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
            },
          ],
        },
        {
          id: 'resources-71',
          type: 'resources',
          items: [
            {
              id: 'link-72',
              label: 'ECMAScript Spec',
              url: 'https://tc39.es/ecma262/#sec-symbol-objects',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
