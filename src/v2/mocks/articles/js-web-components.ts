import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-web-components-templateexample.txt?raw'
import example2 from '../snippets/javascript/js-web-components-shadowdomexample.txt?raw'
import example3 from '../snippets/javascript/js-web-components-customelementexample.txt?raw'

// Content copied verbatim from src/views/js/WebComponents.vue.
export default {
  ...articleSummaries.jsWebComponents,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Components** — это набор веб-стандартов для создания переиспользуемых компонентов: **Custom Elements**, **Shadow DOM**, **HTML Templates** и **ES Modules**. Они позволяют инкапсулировать функциональность и стили без фреймворков.',
    },
    {
      id: 'cards-2',
      type: 'cards',
      columns: 3,
      items: [
        {
          id: 'card-3',
          blocks: [
            {
              id: 'heading-4',
              type: 'heading',
              level: 3,
              text: 'Templates',
            },
            {
              id: 'text-5',
              type: 'prose',
              markdown: 'Шаблоны HTML для клонирования',
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
              text: 'Shadow DOM',
            },
            {
              id: 'text-8',
              type: 'prose',
              markdown: 'Изоляция DOM и стилей',
            },
          ],
        },
        {
          id: 'card-9',
          blocks: [
            {
              id: 'heading-10',
              type: 'heading',
              level: 3,
              text: 'Custom Elements',
            },
            {
              id: 'text-11',
              type: 'prose',
              markdown: 'Пользовательские HTML элементы',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'HTML Templates',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Template** — элемент `<template>` содержит HTML разметку, которая не отображается до клонирования и вставки в DOM.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Shadow DOM',
      blocks: [
        {
          id: 'callout-15',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '**Shadow DOM** создает изолированную область внутри элемента. CSS и DOM не пересекаются с внешним документом.',
            },
          ],
        },
        {
          id: 'cards-17',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-18',
              title: 'Режимы Shadow DOM',
              blocks: [
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    '- `open` — доступ через element.shadowRoot\n- `closed` — element.shadowRoot === null',
                },
              ],
            },
            {
              id: 'card-20',
              title: 'Специальные селекторы',
              blocks: [
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    '- `:host` — стили для host элемента\n- `:host(.class)` — условные стили\n- `::slotted()` — стили для slotted контента',
                },
              ],
            },
          ],
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Custom Elements',
      blocks: [
        {
          id: 'cards-23',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-24',
              title: 'Lifecycle методы',
              blocks: [
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- `connectedCallback()` — добавление в DOM\n- `disconnectedCallback()` — удаление из DOM\n- `attributeChangedCallback()` — изменение атрибутов\n- `adoptedCallback()` — перемещение в документ',
                },
              ],
            },
            {
              id: 'card-26',
              title: 'Ключевые особенности',
              blocks: [
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- `observedAttributes` — отслеживаемые атрибуты\n- `<slot>` — композиция контента\n- Custom Events для коммуникации\n- Extends HTMLElement',
                },
              ],
            },
          ],
        },
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
      title: 'Ключевые вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-29',
          type: 'accordion',
          items: [
            {
              id: 'question-30',
              title: 'Что такое Web Components?',
              blocks: [
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown:
                    'Набор веб-стандартов: Custom Elements (пользовательские HTML элементы), Shadow DOM (инкапсуляция), HTML Templates (шаблоны), ES Modules. Позволяют создавать переиспользуемые компоненты без фреймворков.',
                },
              ],
            },
            {
              id: 'question-32',
              title: 'Разница между open и closed Shadow DOM?',
              blocks: [
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: '**Open:** доступен через element.shadowRoot',
                },
                {
                  id: 'break-34',
                  type: 'line-break',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown: '**Closed:** element.shadowRoot возвращает null',
                },
                {
                  id: 'break-36',
                  type: 'line-break',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    'Open используется чаще, closed обеспечивает максимальную инкапсуляцию.',
                },
              ],
            },
            {
              id: 'question-38',
              title: 'Как работают slots?',
              blocks: [
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    'Slots создают "дырки" в Shadow DOM для внешнего контента. `<slot name="header">` + `<div slot="header">` позволяют точно контролировать размещение контента.',
                },
              ],
            },
            {
              id: 'question-40',
              title: 'Как стили изолированы в Shadow DOM?',
              blocks: [
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    'Shadow DOM создает границу стилей. Внешние CSS не влияют на внутренние элементы, внутренние не вытекают наружу. Исключения: наследуемые свойства (color, font) и стили через ::slotted().',
                },
              ],
            },
            {
              id: 'question-42',
              title: 'Web Components vs React/Vue?',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: '**Web Components:** нативные, без зависимостей, работают везде',
                },
                {
                  id: 'break-44',
                  type: 'line-break',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown: '**Фреймворки:** богатая экосистема, dev tools, но vendor lock-in',
                },
                {
                  id: 'break-46',
                  type: 'line-break',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    'Выбор зависит от задач: библиотеки компонентов — WC, сложные приложения — фреймворки.',
                },
              ],
            },
          ],
        },
        {
          id: 'cards-48',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Нативная поддержка браузеров\n- Независимость от фреймворков\n- Истинная инкапсуляция\n- Переиспользуемость между проектами\n- Долговечность (стандарты)',
                },
              ],
            },
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: 'Ограничения',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Больше boilerplate кода\n- Ограниченная экосистема\n- Сложности с SSR\n- Нет встроенного state management\n- Менее развитые dev tools',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практическое применение',
      blocks: [
        {
          id: 'cards-55',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-56',
              blocks: [
                {
                  id: 'heading-57',
                  type: 'heading',
                  level: 3,
                  text: 'Design Systems',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: 'Библиотеки UI компонентов',
                },
              ],
            },
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: 'Микрофронтенды',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown: 'Изолированные компоненты',
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
                  text: 'Виджеты',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown: 'Встраиваемые компоненты',
                },
              ],
            },
          ],
        },
        {
          id: 'resources-65',
          type: 'resources',
          items: [
            {
              id: 'link-66',
              label: 'MDN Web Components',
              url: 'https://developer.mozilla.org/en-US/docs/Web/Web_Components',
            },
          ],
        },
        {
          id: 'resources-67',
          type: 'resources',
          items: [
            {
              id: 'link-68',
              label: 'Lit Library',
              url: 'https://lit.dev/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
