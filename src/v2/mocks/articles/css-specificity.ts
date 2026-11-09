import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/css-specificity-snippet1.css.txt?raw'
import example2 from '../snippets/css/css-specificity-snippet2.css.txt?raw'
import example3 from '../snippets/css/css-specificity-snippet3.css.txt?raw'
import example4 from '../snippets/css/css-specificity-snippet4.css.txt?raw'
import example5 from '../snippets/css/css-specificity-snippet5.css.txt?raw'

// Content copied verbatim from src/views/css/Specificity.vue.
export default {
  ...articleSummaries.specificity,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Специфичность (Specificity)** — это система приоритетов в CSS, которая определяет, какое правило будет применено к элементу, когда несколько селекторов указывают на один и тот же элемент. Чем выше специфичность, тем выше приоритет правила.',
    },
  ],
  sections: [
    {
      id: 'rules',
      title: 'Система подсчета специфичности',
      blocks: [
        {
          id: 'text-2',
          type: 'prose',
          markdown: 'Специфичность записывается в виде четырех чисел: `a,b,c,d`',
        },
        {
          id: 'table-3',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Позиция',
            },
            {
              id: 'column-2',
              label: 'Что считается',
            },
            {
              id: 'column-3',
              label: 'Примеры',
            },
            {
              id: 'column-4',
              label: 'Вес',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '**a**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '!important',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'color: red !important',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '1000',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '**b**',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'ID селекторы',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '#header, #main',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '100',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**c**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Классы, атрибуты, псевдоклассы',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '.nav, \\[href\\], :hover',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '10',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**d**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Элементы и псевдоэлементы',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'div, p, ::before',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '1',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'selector-types',
      title: 'Как различать похожие селекторы',
      blocks: [
        {
          id: 'text-20',
          type: 'prose',
          markdown:
            'При подсчете важно смотреть не на смысл селектора, а на его синтаксис. Атрибуты и псевдоклассы попадают в группу `c`, а элементы и псевдоэлементы — в группу `d`.',
        },
        {
          id: 'table-21',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Как выглядит',
            },
            {
              id: 'column-3',
              label: 'Примеры',
            },
            {
              id: 'column-4',
              label: 'Куда считается',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**Атрибуты**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Квадратные скобки `[]`',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown:
                      '`[href]`, `[type="button"]`, `[data-state="open"]`, `[class~="primary"]`, `[href^="https"]`, `[href$=".pdf"]`',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '`c` — как класс',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '**Псевдоклассы**',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Одно двоеточие `:`',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown:
                      '`:hover`, `:focus`, `:checked`, `:disabled`, `:first-child`, `:nth-child()`, `:not()`, `:is()`, `:has()`, `:where()`',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`c` — как класс',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Элементы**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Имя HTML-тега',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`div`, `p`, `a`, `button`, `input`, `h1`, `ul`, `li`, `section`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`d` — как элемент',
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
                    markdown: '**Псевдоэлементы**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Два двоеточия `::`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown:
                      '`::before`, `::after`, `::first-line`, `::first-letter`, `::selection`, `::marker`, `::placeholder`, `::backdrop`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`d` — как элемент',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            '- `:hover` — псевдокласс: описывает состояние существующего элемента.\n- `::before` — псевдоэлемент: выбирает создаваемую или отдельную часть элемента.\n- `[disabled]` — атрибут: выбирает элемент по наличию атрибута, а `:disabled` — псевдокласс, который выбирает элемент по состоянию.\n- `:not()`, `:is()` и `:has()` сами не добавляют вес как обычный псевдокласс: считается самый специфичный селектор внутри. `:where()` всегда дает `0`.',
        },
      ],
    },
    {
      id: 'example',
      title: 'Базовые примеры',
      blocks: [
        {
          id: 'code-39',
          type: 'code',
          language: 'css',
          code: example1,
        },
      ],
    },
    {
      id: 'practice',
      title: 'Практика расчета специфичности',
      blocks: [
        {
          id: 'widget-40',
          type: 'widget',
          name: 'css-specificity',
          props: {
            compact: true,
          },
        },
      ],
    },
    {
      id: 'combined-selectors',
      title: 'Комбинированные селекторы',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'css',
          code: example2,
        },
      ],
    },
    {
      id: 'calculations',
      title: 'Примеры расчета',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'css',
          code: example3,
        },
      ],
    },
    {
      id: 'priority',
      title: 'Правила приоритета',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-44',
              title: '1. Сравнение слева направо',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown: "Сначала сравнивается позиция 'a', потом 'b', потом 'c', потом 'd'",
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '`0,1,0,0` побеждает `0,0,999,999`',
                },
              ],
            },
            {
              id: 'card-47',
              title: '2. Порядок в коде',
              blocks: [
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: 'При одинаковой специфичности побеждает последнее правило',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown: 'Важно для правил с одинаковым весом',
                },
              ],
            },
            {
              id: 'card-50',
              title: '3. Inline стили',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: 'style="color: red" имеет специфичность `1,0,0,0`',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: 'Побеждает все CSS-правила без !important',
                },
              ],
            },
            {
              id: 'card-53',
              title: '4. Универсальный селектор',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: '\\*, :not(), :where() не добавляют специфичность',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: 'Комбинаторы (+, &gt;, ~) тоже не считаются',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'conflicts',
      title: 'Практические конфликты',
      blocks: [
        {
          id: 'code-56',
          type: 'code',
          language: 'css',
          code: example4,
        },
      ],
    },
    {
      id: 'management',
      title: 'Управление специфичностью',
      blocks: [
        {
          id: 'code-57',
          type: 'code',
          language: 'css',
          code: example5,
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            '1. **Какая специфичность у селектора `#nav .menu li a:hover`?**\n   \n   `0,1,2,2` — один ID (#nav), два класса/псевдокласса (.menu, :hover), два элемента (li, a).\n2. **Почему `div.class` имеет бо́льшую специфичность, чем `.class`?**\n   \n   `div.class` = `0,0,1,1`, `.class` = `0,0,1,0`. Добавление элемента увеличивает специфичность.\n3. **Как работает `:not()` со специфичностью?**\n   \n   `:not()` сам не добавляет специфичность, но его содержимое считается. `:not(.class)` = `0,0,1,0`.\n4. **В чем разница между `:where()` и `:is()`?**\n   \n   `:where()` всегда имеет специфичность 0. `:is()` принимает специфичность самого специфичного селектора из своего списка.\n5. **Как избежать войны специфичности?**\n   \n   BEM методология, CSS-модули, CSS-in-JS, использование одинакового уровня специфичности, избегание глубокой вложенности селекторов.\n6. **Когда использовать `!important`?**\n   \n   Только для utility-классов (.hidden, .sr-only) или переопределения стилей из библиотек. В обычном коде это антипаттерн.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-59',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-60',
              title: 'Держите специфичность низкой',
              blocks: [
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Используйте классы, не ID\n- Избегайте глубокой вложенности\n- Один-два уровня достаточно',
                },
              ],
            },
            {
              id: 'card-62',
              title: 'Структурируйте CSS',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: '- BEM или другая методология\n- CSS-модули\n- Utility-first подход',
                },
              ],
            },
            {
              id: 'card-64',
              title: 'Инструменты',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Specificity Calculator\n- DevTools показывают перечеркнутые стили\n- CSS-линтеры',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итог',
      blocks: [
        {
          id: 'text-66',
          type: 'prose',
          markdown:
            'Специфичность CSS — это система `a,b,c,d`, где a=!important, b=ID, c=классы/атрибуты/псевдоклассы, d=элементы/псевдоэлементы. Понимание специфичности критично для написания поддерживаемого CSS и решения конфликтов стилей. Главный принцип: держите специфичность низкой и используйте структурированные подходы.',
        },
        {
          id: 'resources-67',
          type: 'resources',
          items: [
            {
              id: 'link-68',
              label: 'MDN: CSS Specificity',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
