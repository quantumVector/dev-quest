import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-web-components-second-basicexample.txt?raw'
import example2 from '../snippets/javascript/js-web-components-second-eventsexample.txt?raw'
import example3 from '../snippets/javascript/js-web-components-second-communicationexample.txt?raw'

// Content copied verbatim from src/views/js/WebComponentsSecond.vue.
export default {
  ...articleSummaries.jsWebComponentsSecond,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Components** — нативная браузерная технология для создания переиспользуемых компонентов. **Custom Elements** позволяют создавать собственные HTML теги, **Custom Events** обеспечивают коммуникацию между ними.',
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
              text: 'Custom Elements',
            },
            {
              id: 'text-5',
              type: 'prose',
              markdown: 'Собственные HTML теги с инкапсулированной логикой',
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
              markdown: 'Изоляция стилей и разметки',
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
              text: 'Custom Events',
            },
            {
              id: 'text-11',
              type: 'prose',
              markdown: 'Коммуникация между компонентами',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: '1. Основы Custom Elements',
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
      id: 'section-2',
      title: '2. Custom Events для коммуникации',
      blocks: [
        {
          id: 'callout-13',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-14',
              type: 'prose',
              markdown: '**Ключевые свойства:**',
            },
            {
              id: 'break-15',
              type: 'line-break',
            },
            {
              id: 'text-16',
              type: 'prose',
              markdown: '• `bubbles: true` — событие всплывает по DOM дереву',
            },
            {
              id: 'break-17',
              type: 'line-break',
            },
            {
              id: 'text-18',
              type: 'prose',
              markdown: '• `composed: true` — пересекает границы Shadow DOM',
            },
            {
              id: 'break-19',
              type: 'line-break',
            },
            {
              id: 'text-20',
              type: 'prose',
              markdown: '• `cancelable: true` — можно отменить через preventDefault()',
            },
            {
              id: 'break-21',
              type: 'line-break',
            },
            {
              id: 'text-22',
              type: 'prose',
              markdown: '• `detail` — данные для передачи',
            },
          ],
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: '3. Коммуникация через EventBus',
      blocks: [
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: '4. Жизненный цикл',
      blocks: [
        {
          id: 'table-25',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Когда вызывается',
            },
            {
              id: 'column-3',
              label: 'Назначение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`constructor()`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'При создании элемента',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Инициализация Shadow DOM',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`connectedCallback()`',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Добавление в DOM',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Подписка на события',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`disconnectedCallback()`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Удаление из DOM',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Очистка ресурсов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`attributeChangedCallback()`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Изменение атрибута',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Реакция на изменения',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: '5. Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-38',
          type: 'accordion',
          items: [
            {
              id: 'question-39',
              title: 'Отличия от React/Vue компонентов?',
              blocks: [
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown: '• **Нативность:** работают без фреймворков',
                },
                {
                  id: 'break-41',
                  type: 'line-break',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown: '• **Универсальность:** можно использовать в любых проектах',
                },
                {
                  id: 'break-43',
                  type: 'line-break',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown: '• **Изоляция:** истинная инкапсуляция через Shadow DOM',
                },
                {
                  id: 'break-45',
                  type: 'line-break',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '• **Стандарты:** часть веб-платформы',
                },
              ],
            },
            {
              id: 'question-47',
              title: 'Что такое Shadow DOM?',
              blocks: [
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: 'Изолированное DOM поддерево, где:',
                },
                {
                  id: 'break-49',
                  type: 'line-break',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown: '• Стили не влияют на внешнюю страницу',
                },
                {
                  id: 'break-51',
                  type: 'line-break',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: '• Внешние стили не влияют на компонент',
                },
                {
                  id: 'break-53',
                  type: 'line-break',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: '• JavaScript селекторы не пересекают границы',
                },
                {
                  id: 'break-55',
                  type: 'line-break',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown: '• Обеспечивает истинную инкапсуляцию',
                },
              ],
            },
            {
              id: 'question-57',
              title: 'Как работает коммуникация компонентов?',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: '**1. Custom Events:** dispatchEvent() + addEventListener()',
                },
                {
                  id: 'break-59',
                  type: 'line-break',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '**2. Атрибуты:** для передачи данных в компонент',
                },
                {
                  id: 'break-61',
                  type: 'line-break',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: '**3. Slots:** для передачи содержимого',
                },
                {
                  id: 'break-63',
                  type: 'line-break',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown: '**4. EventBus:** для глобальной коммуникации',
                },
                {
                  id: 'break-65',
                  type: 'line-break',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown: '**5. Прямые вызовы:** публичные методы компонентов',
                },
              ],
            },
            {
              id: 'question-67',
              title: 'Поддержка браузерами?',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown: '• **Современные браузеры:** полная поддержка',
                },
                {
                  id: 'break-69',
                  type: 'line-break',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown: '• **IE:** требуются полифиллы',
                },
                {
                  id: 'break-71',
                  type: 'line-break',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown: '• **Can I Use:** ~95% поддержка globally',
                },
                {
                  id: 'break-73',
                  type: 'line-break',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown: '• **Полифиллы:** @webcomponents/webcomponentsjs',
                },
              ],
            },
          ],
        },
        {
          id: 'cards-75',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-76',
              title: '✅ Преимущества',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Нативность и универсальность\n- Истинная инкапсуляция\n- Долговечность (стандарты)\n- Производительность\n- Интероперабельность',
                },
              ],
            },
            {
              id: 'card-78',
              title: '❌ Недостатки',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Менее развитая экосистема\n- Нужны полифиллы для IE\n- Низкоуровневый API\n- Нет встроенного state management\n- Ограниченный тулинг',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: '6. Когда использовать?',
      blocks: [
        {
          id: 'cards-80',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-81',
              title: '👍 Подходят для:',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- Библиотек компонентов\n- Виджетов для встраивания\n- Legacy проектов\n- Микрофронтендов\n- Дизайн-систем',
                },
              ],
            },
            {
              id: 'card-83',
              title: '👎 Не подходят для:',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- Крупных SPA приложений\n- Проектов с активной разработкой\n- Когда нужен богатый ecosystem\n- Команд без опыта\n- Tight deadlines',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-85',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-86',
              type: 'prose',
              markdown: '**Практические советы:**',
            },
            {
              id: 'break-87',
              type: 'line-break',
            },
            {
              id: 'text-88',
              type: 'prose',
              markdown: '• Всегда очищайте ресурсы в `disconnectedCallback()`',
            },
            {
              id: 'break-89',
              type: 'line-break',
            },
            {
              id: 'text-90',
              type: 'prose',
              markdown: '• Используйте `composed: true` для событий между компонентами',
            },
            {
              id: 'break-91',
              type: 'line-break',
            },
            {
              id: 'text-92',
              type: 'prose',
              markdown: '• Валидируйте атрибуты в `attributeChangedCallback()`',
            },
            {
              id: 'break-93',
              type: 'line-break',
            },
            {
              id: 'text-94',
              type: 'prose',
              markdown: '• Рассмотрите библиотеки типа LitElement для упрощения разработки',
            },
          ],
        },
        {
          id: 'resources-95',
          type: 'resources',
          items: [
            {
              id: 'link-96',
              label: 'MDN Web Components',
              url: 'https://developer.mozilla.org/en-US/docs/Web/Web_Components',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
