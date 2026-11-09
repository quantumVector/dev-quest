import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-functions-types-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-functions-types-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-functions-types-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-functions-types-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-functions-types-snippet5.txt?raw'

// Content copied verbatim from src/views/js/FunctionTypes.vue.
export default {
  ...articleSummaries.jsFunctionTypes,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'В JavaScript существует несколько способов создания функций, каждый из которых имеет свои особенности. Понимание различий между `Function Declaration`, `Function Expression` и `Arrow Function` критично для написания качественного кода и успешного прохождения собеседований.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Краткое сравнение',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Function Declaration',
            },
            {
              id: 'column-3',
              label: 'Function Expression',
            },
            {
              id: 'column-4',
              label: 'Arrow Function',
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
                    markdown: '**Синтаксис**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '`function name() {}`',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '`const name = function() {}`',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '`const name = () => {}`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '**Hoisting**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '✅ Полное поднятие',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '❌ Только переменная',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '❌ Только переменная',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '**this**',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Динамический',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Лексический',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**arguments**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Есть',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '✅ Есть',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Конструктор**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '✅ Можно',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '✅ Можно',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '❌ Нельзя',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**Краткость**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Обычная',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Обычная',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Очень краткая',
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
      title: '1. Function Declaration',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown:
            'Классический способ объявления функций. Функция поднимается (hoisting) и доступна в любом месте области видимости, даже до её объявления.',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Function Expression',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown:
            'Функция создается как выражение и присваивается переменной. Не поднимается, доступна только после объявления. Может быть анонимной или именованной.',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Arrow Function (ES6+)',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            "Современный синтаксис для создания функций. Не имеет собственного `this`, `arguments`, не может быть конструктором. Идеальна для коротких функций и callback'ов.",
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Практическое сравнение',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown:
            'Рассмотрим ключевые различия на практических примерах, включая hoisting, контекст this, arguments и использование в качестве конструкторов.',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Когда что использовать?',
      blocks: [
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Ключевые различия',
      blocks: [
        {
          id: 'cards-36',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-37',
              title: '🔄 Hoisting',
              blocks: [
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown: '**Function Declaration:** Полностью поднимается',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown: '**Function Expression:** Только переменная',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown: '**Arrow Function:** Только переменная',
                },
              ],
            },
            {
              id: 'card-41',
              title: '🎯 this Context',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown: '**Function Declaration:** Динамический this',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: '**Function Expression:** Динамический this',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown: '**Arrow Function:** Лексический this',
                },
              ],
            },
            {
              id: 'card-45',
              title: '🏗️ Конструктор',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '**Function Declaration:** ✅ Можно использовать',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: '**Function Expression:** ✅ Можно использовать',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: '**Arrow Function:** ❌ Нельзя использовать',
                },
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
          id: 'text-49',
          type: 'prose',
          markdown:
            '1. **Что произойдет, если вызвать функцию до её объявления?**\n   \n   **Function Declaration:** Работает благодаря hoisting.  \n   **Function Expression/Arrow:** ReferenceError или TypeError.\n2. **Чем отличается `this` в arrow function?**\n   \n   Arrow function не имеет собственного `this` и берет его из внешней области видимости (лексический контекст). Обычные функции имеют динамический `this`, зависящий от способа вызова.\n3. **Почему arrow function нельзя использовать как конструктор?**\n   \n   У arrow function нет внутреннего метода \\[\\[Construct\\]\\] и собственного `this`. При вызове с `new` получим TypeError.\n4. **Как получить аргументы в arrow function?**\n   \n   Arrow function не имеет объекта `arguments`. Используйте rest параметры: `(...args) => {}`\n5. **Когда использовать какой тип функций?**\n   \n   **Function Declaration:** основные функции, когда нужен hoisting.  \n   **Function Expression:** условное создание, методы объектов.  \n   **Arrow Function:** короткие функции, callbacks, когда не нужен собственный контекст.\n6. **Что такое IIFE и зачем она нужна?**\n   \n   Immediately Invoked Function Expression - функция, которая выполняется сразу после создания. Используется для создания изолированной области видимости: `(function(){ /* код */ })();`',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-50',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-51',
              title: '✅ Что делать',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Используйте Arrow Functions для коротких функций и callbacks\n- Function Declaration для основных функций приложения\n- Function Expression для условного создания функций\n- Предпочитайте const для Function Expression\n- Используйте деструктуризацию и rest параметры',
                },
              ],
            },
            {
              id: 'card-53',
              title: '❌ Чего избегать',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Arrow Functions как методы объектов\n- Arrow Functions как конструкторы\n- Function Declaration внутри блоков\n- Слишком сложные arrow functions\n- Злоупотребление hoisting',
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
          id: 'text-55',
          type: 'prose',
          markdown:
            'Выбор между Function Declaration, Function Expression и Arrow Function зависит от контекста использования. **Function Declaration** подходит для основных функций с hoisting, **Function Expression** — для динамического создания функций, **Arrow Function** — для коротких функций без собственного контекста. Понимание особенностей каждого типа критично для написания качественного JavaScript кода.',
        },
        {
          id: 'resources-56',
          type: 'resources',
          items: [
            {
              id: 'link-57',
              label: 'MDN: JavaScript Functions',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
