import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-dom-events-targetvscurrenttargetsnippet.txt?raw'
import example2 from '../snippets/javascript/js-dom-events-capturingexamplesnippet.txt?raw'
import example3 from '../snippets/javascript/js-dom-events-eventdelegationsnippet.txt?raw'
import example4 from '../snippets/javascript/js-dom-events-stoppropagationsnippet.txt?raw'
import example5 from '../snippets/javascript/js-dom-events-customeventssnippet.txt?raw'
import example6 from '../snippets/javascript/js-dom-events-performancesnippet.txt?raw'

// Content copied verbatim from src/views/js/DOMEvents.vue.
export default {
  ...articleSummaries.jsDOMEvents,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**События DOM** проходят через три фазы: **погружение (capturing)**, **цель (target)** и **всплытие (bubbling)**. Понимание этих фаз критически важно для эффективной работы с событиями, делегирования и оптимизации производительности.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Три фазы жизненного цикла событий',
      blocks: [
        {
          id: 'steps-2',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-3',
              title: 'Capturing',
              blocks: [
                {
                  id: 'cards-4',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-5',
                      blocks: [
                        {
                          id: 'heading-6',
                          type: 'heading',
                          level: 3,
                          text: '1. Фаза погружения (Capturing)',
                        },
                        {
                          id: 'text-7',
                          type: 'prose',
                          markdown: 'Событие идет от корня к цели',
                        },
                        {
                          id: 'text-8',
                          type: 'prose',
                          markdown:
                            'Событие начинает свой путь от **корня документа** и движется вниз по DOM-дереву к элементу, на котором произошло событие. На этой фазе срабатывают обработчики, зарегистрированные с флагом `useCapture: true`.',
                        },
                        {
                          id: 'callout-9',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-10',
                              type: 'prose',
                              markdown:
                                '**Ключевая особенность:** На фазе погружения event.eventPhase === 1 (CAPTURING\\_PHASE)',
                            },
                          ],
                        },
                        {
                          id: 'heading-11',
                          type: 'heading',
                          level: 4,
                          text: 'Путь события при клике на кнопку:',
                        },
                        {
                          id: 'timeline-12',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-13',
                              blocks: [
                                {
                                  id: 'text-14',
                                  type: 'prose',
                                  markdown: 'Document',
                                },
                              ],
                            },
                            {
                              id: 'event-15',
                              blocks: [
                                {
                                  id: 'text-16',
                                  type: 'prose',
                                  markdown: 'HTML',
                                },
                              ],
                            },
                            {
                              id: 'event-17',
                              blocks: [
                                {
                                  id: 'text-18',
                                  type: 'prose',
                                  markdown: 'Body',
                                },
                              ],
                            },
                            {
                              id: 'event-19',
                              blocks: [
                                {
                                  id: 'text-20',
                                  type: 'prose',
                                  markdown: 'Div (outer)',
                                },
                              ],
                            },
                            {
                              id: 'event-21',
                              blocks: [
                                {
                                  id: 'text-22',
                                  type: 'prose',
                                  markdown: 'Div (middle)',
                                },
                              ],
                            },
                            {
                              id: 'event-23',
                              blocks: [
                                {
                                  id: 'text-24',
                                  type: 'prose',
                                  markdown: 'Button (target) ⭐',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'text-25',
                          type: 'prose',
                          markdown: 'Практическое применение:',
                        },
                        {
                          id: 'text-26',
                          type: 'prose',
                          markdown: 'Глобальная аналитика событий',
                        },
                        {
                          id: 'text-27',
                          type: 'prose',
                          markdown: 'Контроль доступа к элементам',
                        },
                        {
                          id: 'text-28',
                          type: 'prose',
                          markdown: 'Предварительная обработка форм',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-29',
              title: 'Target',
              blocks: [
                {
                  id: 'cards-30',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-31',
                      blocks: [
                        {
                          id: 'heading-32',
                          type: 'heading',
                          level: 3,
                          text: '2. Фаза цели (Target)',
                        },
                        {
                          id: 'text-33',
                          type: 'prose',
                          markdown: 'Событие достигло цели',
                        },
                        {
                          id: 'text-34',
                          type: 'prose',
                          markdown:
                            'Событие достигло элемента, на котором произошло (**target**). На этой фазе `event.target === event.currentTarget`. Срабатывают обработчики, зарегистрированные на самом элементе.',
                        },
                        {
                          id: 'cards-35',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-36',
                              title: 'event.target',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-37',
                                  type: 'prose',
                                  markdown:
                                    'Элемент, где произошло событие (константа для всех фаз)',
                                },
                              ],
                            },
                            {
                              id: 'card-38',
                              title: 'event.currentTarget',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-39',
                                  type: 'prose',
                                  markdown:
                                    'Элемент, где обрабатывается событие (меняется на каждой фазе)',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-40',
                          type: 'heading',
                          level: 4,
                          text: 'На фазе цели:',
                        },
                        {
                          id: 'text-41',
                          type: 'prose',
                          markdown:
                            '- `event.target === event.currentTarget` (true)\n- `event.eventPhase === 2` (AT\\_TARGET)\n- Обработчики элемента-цели выполняются\n- Единственная фаза, где target и currentTarget совпадают',
                        },
                        {
                          id: 'callout-42',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-43',
                              type: 'prose',
                              markdown:
                                '**Важно:** На фазе цели обработчики выполняются в порядке их регистрации',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'step-44',
              title: 'Bubbling',
              blocks: [
                {
                  id: 'cards-45',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-46',
                      blocks: [
                        {
                          id: 'heading-47',
                          type: 'heading',
                          level: 3,
                          text: '3. Фаза всплытия (Bubbling)',
                        },
                        {
                          id: 'text-48',
                          type: 'prose',
                          markdown: 'Событие идет от цели к корню',
                        },
                        {
                          id: 'text-49',
                          type: 'prose',
                          markdown:
                            'После обработки на элементе-цели событие **"всплывает"** вверх по DOM-дереву к корню документа. На этой фазе срабатывают обработчики, зарегистрированные с `useCapture: false` (по умолчанию).',
                        },
                        {
                          id: 'callout-50',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-51',
                              type: 'prose',
                              markdown:
                                '**Особенность:** На фазе всплытия event.eventPhase === 3 (BUBBLING\\_PHASE)',
                            },
                          ],
                        },
                        {
                          id: 'heading-52',
                          type: 'heading',
                          level: 4,
                          text: 'Обратный путь события:',
                        },
                        {
                          id: 'timeline-53',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-54',
                              blocks: [
                                {
                                  id: 'text-55',
                                  type: 'prose',
                                  markdown: 'Button (target) — обработано',
                                },
                              ],
                            },
                            {
                              id: 'event-56',
                              blocks: [
                                {
                                  id: 'text-57',
                                  type: 'prose',
                                  markdown: 'Div (middle)',
                                },
                              ],
                            },
                            {
                              id: 'event-58',
                              blocks: [
                                {
                                  id: 'text-59',
                                  type: 'prose',
                                  markdown: 'Div (outer)',
                                },
                              ],
                            },
                            {
                              id: 'event-60',
                              blocks: [
                                {
                                  id: 'text-61',
                                  type: 'prose',
                                  markdown: 'Body',
                                },
                              ],
                            },
                            {
                              id: 'event-62',
                              blocks: [
                                {
                                  id: 'text-63',
                                  type: 'prose',
                                  markdown: 'HTML',
                                },
                              ],
                            },
                            {
                              id: 'event-64',
                              blocks: [
                                {
                                  id: 'text-65',
                                  type: 'prose',
                                  markdown: 'Document',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'text-66',
                          type: 'prose',
                          markdown: 'Применение всплытия:',
                        },
                        {
                          id: 'text-67',
                          type: 'prose',
                          markdown: 'Делегирование событий',
                        },
                        {
                          id: 'text-68',
                          type: 'prose',
                          markdown: 'Закрытие модальных окон',
                        },
                        {
                          id: 'text-69',
                          type: 'prose',
                          markdown: 'Обработка меню и списков',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'target vs currentTarget',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Отлов событий на фазе погружения',
      blocks: [
        {
          id: 'callout-71',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-72',
              type: 'prose',
              markdown:
                '**Capturing Phase:** Чтобы поймать событие на фазе погружения, передайте `true` как третий параметр в `addEventListener()` или используйте `{ capture: true }`.',
            },
          ],
        },
        {
          id: 'code-73',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Делегирование событий',
      blocks: [
        {
          id: 'code-74',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Управление распространением событий',
      blocks: [
        {
          id: 'cards-75',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: 'stopPropagation()',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown: 'Останавливает дальнейшее распространение события по DOM-дереву',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Не влияет на другие обработчики текущего элемента\n- Работает на любой фазе\n- Полезно для предотвращения нежелательных срабатываний',
                },
              ],
            },
            {
              id: 'card-80',
              blocks: [
                {
                  id: 'heading-81',
                  type: 'heading',
                  level: 3,
                  text: 'stopImmediatePropagation()',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown: 'Останавливает ВСЕ обработчики, включая текущий элемент',
                },
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Более радикальное решение\n- Останавливает выполнение всех последующих обработчиков\n- Используется в критических ситуациях',
                },
              ],
            },
          ],
        },
        {
          id: 'code-84',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Кастомные события',
      blocks: [
        {
          id: 'code-85',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'code-86',
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
          id: 'text-87',
          type: 'prose',
          markdown:
            '1. **Объясните три фазы жизненного цикла события DOM.**\n   \n   1\\) **Capturing (погружение)** — событие идет от корня к цели, 2) **Target (цель)** — событие достигло элемента-источника, 3) **Bubbling (всплытие)** — событие поднимается от цели к корню. Можно перехватить на любой фазе с помощью соответствующих обработчиков.\n2. **В чем разница между event.target и event.currentTarget?**\n   \n   **event.target** — элемент, на котором произошло событие (постоянное значение). **event.currentTarget** — элемент, на котором обрабатывается событие (меняется на каждой фазе). Они равны только на фазе Target.\n3. **Как отловить событие на фазе погружения?**\n   \n   Передать `true` как третий параметр в `addEventListener(event, handler, true)` или использовать объект опций `{ capture: true }`. По умолчанию события отлавливаются на фазе всплытия.\n4. **Что такое делегирование событий и его преимущества?**\n   \n   Техника, при которой один обработчик на родительском элементе обрабатывает события от всех дочерних элементов. Преимущества: меньше обработчиков, автоматическая работа с динамически добавленными элементами, лучшая производительность.\n5. **В чем разница между stopPropagation() и stopImmediatePropagation()?**\n   \n   `stopPropagation()` останавливает распространение события по DOM-дереву, но другие обработчики текущего элемента все еще выполняются. `stopImmediatePropagation()` останавливает все обработчики, включая остальные обработчики текущего элемента.\n6. **Когда использовать фазу погружения?**\n   \n   Для глобальной аналитики, контроля доступа, предварительной обработки форм, перехвата всех событий определенного типа, когда нужно обработать событие до стандартных обработчиков.\n7. **Как создать и отправить кастомное событие?**\n   \n   Использовать `new CustomEvent()` с опциями bubbles, cancelable, detail. Отправить через `element.dispatchEvent(customEvent)`. Кастомные события проходят тот же жизненный цикл, что и встроенные.\n8. **Какие есть способы оптимизации работы с событиями?**\n   \n   Throttling и debouncing для частых событий (scroll, resize), делегирование событий, пассивные обработчики ({ passive: true }), отмена обработчиков при необходимости, использование requestAnimationFrame для анимаций.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение фаз событий',
      blocks: [
        {
          id: 'table-88',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Capturing',
            },
            {
              id: 'column-3',
              label: 'Target',
            },
            {
              id: 'column-4',
              label: 'Bubbling',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '**Направление**',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Корень → Цель',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'На цели',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Цель → Корень',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: '**eventPhase**',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: '1 (CAPTURING\\_PHASE)',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '2 (AT\\_TARGET)',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: '3 (BUBBLING\\_PHASE)',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: '**target === currentTarget**',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: 'false',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: 'true',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: 'false',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: '**Как включить**',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: 'capture: true',
                  },
                ],
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: 'любой способ',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: 'по умолчанию',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: '**Частое применение**',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: 'Глобальный контроль',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: 'Прямая обработка',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: 'Делегирование',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Заключение',
      blocks: [
        {
          id: 'text-109',
          type: 'prose',
          markdown:
            'Понимание фаз жизненного цикла событий DOM — фундаментальная концепция для эффективной работы с JavaScript. **Capturing** позволяет перехватывать события до их обработки, **Target** фаза обрабатывает события на элементе-источнике, а **Bubbling** обеспечивает делегирование событий. Правильное использование `event.target` и `event.currentTarget` критично для создания эффективных и поддерживаемых интерфейсов.',
        },
        {
          id: 'resources-110',
          type: 'resources',
          items: [
            {
              id: 'link-111',
              label: 'MDN Event API',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Event',
            },
          ],
        },
        {
          id: 'resources-112',
          type: 'resources',
          items: [
            {
              id: 'link-113',
              label: 'Учебник JavaScript',
              url: 'https://learn.javascript.ru/bubbling-and-capturing',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
