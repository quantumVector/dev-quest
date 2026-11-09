import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-regexp-basicsyntaxsnippet.txt?raw'
import example2 from '../snippets/javascript/js-regexp-characterclassessnippet.txt?raw'
import example3 from '../snippets/javascript/js-regexp-anchorsgroupssnippet.txt?raw'
import example4 from '../snippets/javascript/js-regexp-lookaheadlookbehindsnippet.txt?raw'
import example5 from '../snippets/javascript/js-regexp-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/javascript/js-regexp-commonmistakessnippet.txt?raw'

// Content copied verbatim from src/views/js/RegExp.vue.
export default {
  ...articleSummaries.jsRegExp,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Регулярные выражения (RegExp)** — это мощный инструмент для поиска, проверки и замены текстовых шаблонов. В JavaScript регулярные выражения представлены объектом RegExp и предоставляют гибкие возможности для работы со строками через паттерны.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основной синтаксис и флаги',
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
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
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
                    markdown: '**g**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Глобальный поиск (все совпадения)',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '`/abc/g`',
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
                    markdown: '**i**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Игнорировать регистр',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '`/abc/i`',
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
                    markdown: '**m**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Многострочный режим',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '`/^abc/m`',
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
                    markdown: '**s**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Точка включает переносы строк',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '`/a.c/s`',
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
                    markdown: '**u**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Unicode режим',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '`/\\\\u{1F600}/u`',
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
                    markdown: '**y**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Поиск с текущей позиции',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '`/abc/y`',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Символьные классы и квантификаторы',
      blocks: [
        {
          id: 'cards-22',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-23',
              title: 'Готовые классы',
              blocks: [
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- `\\\\d` — цифры \\[0-9\\]\n- `\\\\w` — буквы, цифры, \\_\n- `\\\\s` — пробельные символы\n- `\\\\D` — не цифры\n- `\\\\W` — не буквы/цифры\n- `\\\\S` — не пробелы',
                },
              ],
            },
            {
              id: 'card-25',
              title: 'Квантификаторы',
              blocks: [
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown:
                    '- `+` — 1 или больше\n- `*` — 0 или больше\n- `?` — 0 или 1\n- `{n}` — ровно n\n- `{n,m}` — от n до m\n- `{n,}` — минимум n',
                },
              ],
            },
          ],
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Якоря и группы',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Опережающие и ретроспективные проверки',
      blocks: [
        {
          id: 'callout-29',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-30',
              type: 'prose',
              markdown:
                '**Lookahead и Lookbehind** позволяют проверить, что идет до или после паттерна, не включая это в результат.',
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Распространенные ошибки',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Методы для работы с RegExp',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Возвращает',
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
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`regex.test(str)`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'boolean',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Проверяет наличие совпадения',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`regex.exec(str)`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Array | null',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Возвращает детали первого совпадения',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '`str.match(regex)`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Array | null',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Находит совпадения в строке',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '`str.search(regex)`',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'number',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Позиция первого совпадения',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '`str.replace(regex, replacement)`',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'string',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Заменяет совпадения',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '`str.split(regex)`',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Array',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Разбивает строку по паттерну',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-53',
          type: 'prose',
          markdown:
            '1. **В чем разница между /pattern/ и new RegExp(\'pattern\')?**\n   \n   Литеральная запись /pattern/ компилируется во время разбора кода и более производительна. new RegExp() позволяет создавать регулярные выражения из строк динамически, но требует двойного экранирования спецсимволов.\n2. **Что такое жадные и ленивые квантификаторы?**\n   \n   Жадные квантификаторы (+, \\*, {n,}) захватывают максимально возможное количество символов. Ленивые квантификаторы (+?, \\*?, {n,}?) захватывают минимально возможное количество. Это критично при работе с HTML тегами или строками в кавычках.\n3. **Как работает глобальный флаг /g?**\n   \n   Флаг /g заставляет регулярное выражение искать все совпадения, а не только первое. Важно: regex.test() с флагом /g сохраняет состояние в lastIndex, что может привести к неожиданному поведению при повторных вызовах.\n4. **Что такое обратные ссылки в регулярных выражениях?**\n   \n   Обратные ссылки (\\\\\\\\1, \\\\\\\\2) позволяют ссылаться на ранее захваченные группы в том же паттерне. Например, /(\\[\'"\\])(.\\*?)\\\\\\\\1/ найдет строки в одинаковых кавычках. Полезно для поиска повторяющихся элементов или парных тегов.\n5. **В чем разница между \\\\\\\\b и \\\\\\\\B?**\n   \n   \\\\\\\\b — граница слова (переход между \\\\\\\\w и \\\\\\\\W символами или началом/концом строки). \\\\\\\\B — НЕ граница слова (внутри слова или между не-словесными символами). /\\\\\\\\bcat\\\\\\\\b/ найдет "cat" как отдельное слово, но не в "concatenate".\n6. **Как правильно экранировать пользовательский ввод в RegExp?**\n   \n   Используйте функцию экранирования: str.replace(/\\[.\\*+?^${}()|\\[\\\\\\\\\\]\\\\\\\\\\\\\\\\\\]/g, \'\\\\\\\\\\\\\\\\$&amp;\'). Это заэкранирует все специальные символы регулярных выражений в пользовательском вводе, предотвращая ошибки и потенциальные уязвимости.\n7. **Что такое Unicode флаг /u и когда его использовать?**\n   \n   Флаг /u включает полную поддержку Unicode, включая символы вне BMP (emoji, символы других языков). Без него \\\\\\\\u{1F600} не работает, нужно использовать суррогатные пары. Обязателен для корректной работы с современными Unicode символами.\n8. **В чем отличие match() от exec()?**\n   \n   str.match(regex) — метод строки, с флагом /g возвращает все совпадения без деталей групп. regex.exec(str) — метод регулярного выражения, всегда возвращает детали первого совпадения с информацией о группах. Для получения всех совпадений exec() нужно вызывать в цикле.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Экранировать спецсимволы в пользовательском вводе\n- Использовать именованные группы для читаемости\n- Тестировать регулярки на граничных случаях\n- Использовать ленивые квантификаторы при необходимости\n- Документировать сложные паттерны',
                },
              ],
            },
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Сложных паттернов без комментариев\n- Повторного использования глобальных регулярок\n- Игнорирования производительности\n- Парсинга HTML регулярными выражениями\n- Чрезмерно жадных квантификаторов',
                },
              ],
            },
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Используйте online-тестеры для отладки\n- Изучайте готовые паттерны для валидации\n- Понимайте ограничения регулярных выражений\n- Измеряйте производительность на больших данных\n- Комбинируйте с обычными строковыми методами',
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
          id: 'text-64',
          type: 'prose',
          markdown:
            '**Регулярные выражения** — мощный инструмент для работы с текстом, но требующий понимания синтаксиса и особенностей. Ключевые концепции: символьные классы, квантификаторы, группы, якоря и lookahead/lookbehind. Правильное использование флагов и методов критично для эффективной работы. Помните про экранирование пользовательского ввода и тестирование на граничных случаях.',
        },
        {
          id: 'resources-65',
          type: 'resources',
          items: [
            {
              id: 'link-66',
              label: 'MDN RegExp Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions',
            },
          ],
        },
        {
          id: 'resources-67',
          type: 'resources',
          items: [
            {
              id: 'link-68',
              label: 'Regex101 Tester',
              url: 'https://regex101.com',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
