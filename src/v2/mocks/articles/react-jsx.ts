import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-jsx-whatisjsxsnippet.txt?raw'
import example2 from '../snippets/react/react-jsx-jsxvscreateelementsnippet.txt?raw'
import example3 from '../snippets/react/react-jsx-jsxfeaturessnippet.txt?raw'
import example4 from '../snippets/react/react-jsx-jsxcomponentssnippet.txt?raw'
import example5 from '../snippets/react/react-jsx-jsxtoolssnippet.txt?raw'
import example6 from '../snippets/react/react-jsx-modernjsxtransformsnippet.txt?raw'
import example7 from '../snippets/react/react-jsx-jsxadvancedsnippet.txt?raw'
import example8 from '../snippets/react/react-jsx-jsxlimitationssnippet.txt?raw'
import example9 from '../snippets/react/react-jsx-jsxperformancesnippet.txt?raw'

// Content copied verbatim from src/views/react/JSXSyntax.vue.
export default {
  ...articleSummaries.reactJSXSyntax,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**JSX (JavaScript XML)** — это синтаксическое расширение JavaScript, которое позволяет писать HTML\\-подобный код в JavaScript файлах. JSX компилируется в обычные вызовы `React.createElement()` и не является обязательным, но делает код React более читаемым и интуитивным.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое JSX?',
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
                  text: 'Определение',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Синтаксический сахар** над React.createElement()\n- **Не HTML!** — это JavaScript\n- **Требует компиляции** перед выполнением\n- **Статически типизируем** (с TypeScript)\n- **Необязательный** — можно использовать чистый JS',
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
                  text: 'Преимущества',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Читаемость** — похож на HTML\n- **Поддержка IDE** — автодополнение, подсветка\n- **Типобезопасность** — ошибки при компиляции\n- **Оптимизация** — на этапе сборки\n- **Стандарт** — принят сообществом',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Во что компилируется JSX?',
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
                '**Важно:** JSX — это просто синтаксический сахар! Каждый JSX тег компилируется в вызов `React.createElement(type, props, ...children)`',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Возможности JSX',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'JSX с компонентами',
      blocks: [
        {
          id: 'callout-14',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-15',
              type: 'prose',
              markdown:
                '**Важное правило:** Пользовательские компоненты в JSX должны начинаться с заглавной буквы! React использует это для различия между HTML тегами и компонентами.',
            },
          ],
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Инструменты для поддержки JSX',
      blocks: [
        {
          id: 'cards-17',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: 'Babel',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: 'Стандартный транспилятор JSX   \n`@babel/preset-react`',
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
                  text: 'TypeScript',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: 'Нативная поддержка JSX/TSX   \n`jsx: "react-jsx"`',
                },
              ],
            },
            {
              id: 'card-24',
              blocks: [
                {
                  id: 'heading-25',
                  type: 'heading',
                  level: 3,
                  text: 'SWC',
                },
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown: 'Быстрая альтернатива Babel   \nНаписан на Rust',
                },
              ],
            },
            {
              id: 'card-27',
              blocks: [
                {
                  id: 'heading-28',
                  type: 'heading',
                  level: 3,
                  text: 'esbuild',
                },
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown: 'Очень быстрый сборщик   \nВстроенная поддержка JSX',
                },
              ],
            },
          ],
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Новый JSX Transform (React 17+)',
      blocks: [
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown:
                '**Современный подход:** С React 17 появился новый JSX transform, который не требует импорта React в каждом файле и генерирует более оптимизированный код.',
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнение старого и нового transform',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'Старый Transform',
            },
            {
              id: 'column-3',
              label: 'Новый Transform (React 17+)',
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
                    markdown: '**Импорт React**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Обязателен в каждом файле',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Не требуется',
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
                    markdown: '**Функция компиляции**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'React.createElement()',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '\\_jsx() из react/jsx\\-runtime',
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
                    markdown: '**Размер бандла**',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Больше',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Меньше (небольшая оптимизация)',
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
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Лучше',
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
                    markdown: '**Настройка Babel**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'runtime: "classic"',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'runtime: "automatic"',
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
                    markdown: '**Настройка TypeScript**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'jsx: "react"',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'jsx: "react\\-jsx"',
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
      title: 'Продвинутые техники JSX',
      blocks: [
        {
          id: 'code-53',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Ограничения и особенности JSX',
      blocks: [
        {
          id: 'code-54',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Различия JSX и HTML',
      blocks: [
        {
          id: 'table-55',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'HTML',
            },
            {
              id: 'column-2',
              label: 'JSX',
            },
            {
              id: 'column-3',
              label: 'Причина',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '`class="..."`',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`className="..."`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'class — зарезервированное слово в JS',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '`for="..."`',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '`htmlFor="..."`',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'for — зарезервированное слово в JS',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`style="color: red"`',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: "`style={\\\\{ color: 'red' }}`",
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Стили как JS объекты',
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
                    markdown: '`onclick="..."`',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '`onClick={...}`',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'camelCase для событий',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '`<img src="...">`',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`<img src="..." />`',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Самозакрывающиеся теги обязательны',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '`tabindex="1"`',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '`tabIndex={1}`',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'camelCase для атрибутов',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '`maxlength="10"`',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`maxLength={10}`',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'camelCase для атрибутов',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '`<!-- comment -->`',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '`{/* comment */}`',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Комментарии как JS выражения',
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
      title: 'JSX и производительность',
      blocks: [
        {
          id: 'code-80',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-81',
          type: 'prose',
          markdown:
            "1. **Что такое JSX и обязательно ли его использовать?**\n   \n   JSX — это синтаксическое расширение JavaScript, позволяющее писать HTML\\-подобный код. Он компилируется в вызовы `React.createElement()`. JSX не обязателен — можно писать на чистом JavaScript, но JSX делает код более читаемым и является стандартом в React\\-сообществе.\n2. **Во что компилируется JSX?**\n   \n   JSX компилируется в вызовы функций. В старом transform — это `React.createElement(type, props, ...children)`. В новом transform (React 17\\+) — это `_jsx(type, props)` из `react/jsx-runtime`.\n3. **Какие инструменты поддерживают JSX?**\n   \n   Основные инструменты: **Babel** (@babel/preset\\-react), **TypeScript** (нативная поддержка), **SWC** (быстрая альтернатива Babel), **esbuild** (очень быстрый сборщик), **Vite** (с @vitejs/plugin\\-react). Все современные сборщики имеют встроенную или простую поддержку JSX.\n4. **Почему class стал className в JSX?**\n   \n   Потому что `class` — это зарезервированное слово в JavaScript (для объявления классов ES6). JSX — это JavaScript, поэтому используется `className`. Аналогично `for` → `htmlFor`.\n5. **В чем разница между старым и новым JSX transform?**\n   \n   Старый transform (до React 17) требовал импорт React в каждом файле и использовал `React.createElement()`. Новый transform (React 17\\+) автоматически импортирует функции из `react/jsx-runtime`, не требует явного импорта React, генерирует более оптимизированный код и немного уменьшает размер бандла.\n6. **Почему компоненты должны начинаться с заглавной буквы?**\n   \n   React использует это соглашение для различия между HTML\\-тегами и пользовательскими компонентами. Элементы с маленькой буквы (`<div>`) компилируются в строки ('div'), а с заглавной (`<Component>`) — в переменные/компоненты.\n7. **Как работают стили в JSX?**\n   \n   Стили в JSX задаются как JavaScript объекты с camelCase свойствами: `style={\\{ backgroundColor: 'blue', fontSize: '16px' }}`. Это отличается от HTML, где стили — строка. Числовые значения автоматически получают 'px', кроме unitless свойств (zIndex, opacity и др).\n8. **Что такое JSX Fragment и зачем он нужен?**\n   \n   Fragment (`<>...</>` или `<React.Fragment>`) — это способ группировки нескольких элементов без добавления дополнительного узла в DOM. React компоненты должны возвращать один корневой элемент, Fragment решает эту проблему без создания лишних div'ов.",
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики JSX',
      blocks: [
        {
          id: 'cards-82',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Использовать новый JSX transform\n- Группировать элементы в Fragment\n- Использовать key для списков\n- Выносить сложную логику в функции\n- Использовать автоформатирование (Prettier)\n- Следовать соглашениям именования',
                },
              ],
            },
            {
              id: 'card-86',
              blocks: [
                {
                  id: 'heading-87',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Создания объектов/функций в JSX\n- Index как key в динамических списках\n- Слишком вложенных структур\n- Встраивания сложной логики в JSX\n- Использования dangerouslySetInnerHTML\n- Забывать про заглавные буквы',
                },
              ],
            },
            {
              id: 'card-89',
              blocks: [
                {
                  id: 'heading-90',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- Изучите TypeScript для типизации\n- Используйте ESLint с react плагином\n- Настройте Prettier для JSX\n- Изучите продвинутые паттерны\n- Практикуйте рефакторинг JSX\n- Читайте официальную документацию',
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
          id: 'text-92',
          type: 'prose',
          markdown:
            '**JSX** — это синтаксическое расширение JavaScript, которое делает код React более читаемым и интуитивным. JSX компилируется в вызовы `React.createElement()` (старый transform) или `_jsx()` (новый transform). **Основные инструменты поддержки JSX:** Babel, TypeScript, SWC, esbuild. JSX не обязателен, но является стандартом в React\\-сообществе. Понимание того, во что компилируется JSX, критически важно для отладки и оптимизации React приложений.',
        },
        {
          id: 'resources-93',
          type: 'resources',
          items: [
            {
              id: 'link-94',
              label: 'React Docs: JSX',
              url: 'https://react.dev/learn/writing-markup-with-jsx',
            },
          ],
        },
        {
          id: 'resources-95',
          type: 'resources',
          items: [
            {
              id: 'link-96',
              label: 'Babel React Preset',
              url: 'https://babeljs.io/docs/babel-preset-react',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
