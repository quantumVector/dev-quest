import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-mutation-observer-basicexamplesnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-mutation-observer-mutationtypessnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-mutation-observer-configoptionssnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-mutation-observer-practicalexamplessnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-mutation-observer-realworldexamplessnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-mutation-observer-performancesnippet.txt?raw'

// Content copied verbatim from src/views/web-api/MutationObserverInfo.vue.
export default {
  ...articleSummaries.webApiMutationObserverInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**MutationObserver** — это Web API для отслеживания изменений в DOM\\-дереве. Он асинхронно наблюдает за добавлением/удалением элементов, изменением атрибутов и текстового содержимого, предоставляя мощный механизм реагирования на DOM\\-мутации.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные концепции',
      blocks: [
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
                  text: 'Наблюдатель',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Объект MutationObserver следит за изменениями в указанном узле DOM',
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
                  text: 'Конфигурация',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Настройка определяет какие типы изменений отслеживать',
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
                  text: 'Callback',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Функция вызывается асинхронно при обнаружении изменений',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Базовый пример использования',
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
                '**Важно:** MutationObserver работает асинхронно \\- callback вызывается в микрозадаче после завершения текущего кода.',
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
      id: 'section-3',
      title: 'Типы мутаций и их особенности',
      blocks: [
        {
          id: 'table-15',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип мутации',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Свойства MutationRecord',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '`childList`',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Добавление/удаление дочерних элементов',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '`addedNodes`, `removedNodes`, `previousSibling`, `nextSibling`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '`attributes`',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Изменение атрибутов элемента',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '`attributeName`, `oldValue`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '`characterData`',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Изменение текстового содержимого',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '`oldValue`, `target.data`',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Опции конфигурации',
      blocks: [
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              title: 'Основные опции',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- `childList` — отслеживать дочерние элементы\n- `attributes` — отслеживать атрибуты\n- `characterData` — отслеживать текст\n- `subtree` — применять ко всему поддереву',
                },
              ],
            },
            {
              id: 'card-29',
              title: 'Дополнительные опции',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- `attributeOldValue` — сохранять старые значения\n- `characterDataOldValue` — сохранять старый текст\n- `attributeFilter` — фильтр атрибутов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'callout-32',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-33',
              type: 'prose',
              markdown:
                '**Совет:** MutationObserver идеален для реакции на изменения DOM, которые вы не контролируете (сторонние библиотеки, расширения браузера, динамический контент).',
            },
          ],
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
      title: 'Реальные сценарии из практики',
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
      title: 'Типичные сценарии применения',
      blocks: [
        {
          id: 'cards-36',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-37',
              blocks: [
                {
                  id: 'heading-38',
                  type: 'heading',
                  level: 3,
                  text: 'Мониторинг и аналитика',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '- Отслеживание изменений на странице для аналитики\n- Мониторинг производительности рендеринга\n- Обнаружение изменений контента страницы\n- Трекинг пользовательских действий через DOM',
                },
              ],
            },
            {
              id: 'card-40',
              blocks: [
                {
                  id: 'heading-41',
                  type: 'heading',
                  level: 3,
                  text: 'Автоматизация и реакция',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- Автосохранение при редактировании контента\n- Анимация появления новых элементов\n- Ленивая загрузка изображений при появлении в DOM\n- Синхронизация между элементами интерфейса',
                },
              ],
            },
            {
              id: 'card-43',
              blocks: [
                {
                  id: 'heading-44',
                  type: 'heading',
                  level: 3,
                  text: 'Безопасность',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- Обнаружение инъекции вредоносных скриптов\n- Мониторинг несанкционированных изменений\n- Защита от XSS через контроль DOM\n- Обнаружение подозрительной активности расширений',
                },
              ],
            },
            {
              id: 'card-46',
              blocks: [
                {
                  id: 'heading-47',
                  type: 'heading',
                  level: 3,
                  text: 'Интеграция',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- Адаптация к изменениям сторонних библиотек\n- Интеграция с legacy кодом\n- Обработка динамически загружаемого контента\n- Работа с SPA\\-фреймворками без прямого доступа',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'callout-49',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-50',
              type: 'prose',
              markdown:
                '**Важно для производительности:** MutationObserver может вызываться очень часто. Используйте debounce/throttle, batch\\-обработку и отключайте наблюдение когда оно не нужно.',
            },
          ],
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'MutationObserver vs другие подходы',
      blocks: [
        {
          id: 'table-52',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Преимущества',
            },
            {
              id: 'column-3',
              label: 'Недостатки',
            },
            {
              id: 'column-4',
              label: 'Когда использовать',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**MutationObserver**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown:
                      'Асинхронный, эффективный, batch обработка, поддержка всех типов изменений',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Сложнее в использовании, требует понимания конфигурации',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Отслеживание изменений DOM, которые вы не контролируете',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**DOM Events**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Простые, синхронные, встроенная поддержка',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown:
                      'Только для определенных событий, не все изменения генерируют события',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Пользовательские взаимодействия (click, input, change)',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**setInterval**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Очень простой',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Неэффективный, может пропускать изменения или вызываться зря',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Только для прототипирования, не для продакшена',
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
                    markdown: '**Proxy**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Контроль изменений на уровне данных',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Не работает с DOM напрямую, требует обертывания',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Реактивность данных (Vue, MobX)',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            "1. **Что такое MutationObserver и зачем он нужен?**\n   \n   MutationObserver — это Web API для асинхронного наблюдения за изменениями в DOM\\-дереве. Позволяет реагировать на добавление/удаление элементов, изменение атрибутов и текста. Используется для мониторинга, автоматизации, безопасности и интеграции.\n2. **Чем MutationObserver лучше setInterval для отслеживания DOM?**\n   \n   MutationObserver асинхронный, срабатывает только при реальных изменениях (не вхолостую), использует batch\\-обработку (эффективнее), предоставляет детальную информацию о мутациях. setInterval работает постоянно даже без изменений, синхронный, менее эффективный.\n3. **Какие типы изменений может отслеживать MutationObserver?**\n   \n   Три основных типа: `childList` (добавление/удаление элементов), `attributes` (изменение атрибутов), `characterData` (изменение текста). Также поддерживает `subtree` для наблюдения за всем поддеревом.\n4. **Как оптимизировать производительность MutationObserver?**\n   \n   Использовать debounce/throttle, batch DOM операции (DocumentFragment), отключать observer при неактивности страницы, использовать `attributeFilter` для конкретных атрибутов, избегать тяжелых операций в callback.\n5. **В чем разница между disconnect() и takeRecords()?**\n   \n   `disconnect()` останавливает наблюдение и очищает очередь мутаций. `takeRecords()` возвращает накопленные мутации без вызова callback и очищает очередь, но НЕ останавливает наблюдение. Полезно для синхронной обработки.\n6. **Когда НЕ стоит использовать MutationObserver?**\n   \n   Не используйте для пользовательских событий (click, input) — есть DOM events. Не используйте для контроля собственного кода — лучше структурировать логику. Не используйте для реактивности данных — есть Proxy, Vue, React hooks.\n7. **Как MutationObserver работает с Shadow DOM?**\n   \n   MutationObserver наблюдает только за деревом, на котором вызван `observe()`. Для Shadow DOM нужно создать отдельный observer на shadowRoot. Изменения внутри Shadow DOM не видны observer'у, подключенному к light DOM.",
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-70',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-71',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Отключать observer когда не нужен\n- Использовать attributeFilter для конкретных атрибутов\n- Batch DOM операции (DocumentFragment)\n- Debounce/throttle частые изменения\n- Проверять nodeType перед обработкой\n- Использовать WeakSet для отслеженных элементов',
                },
              ],
            },
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'heading-75',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Тяжелых операций в callback\n- Модификации DOM внутри callback (цикл)\n- Наблюдения без необходимости (subtree: true)\n- Забывать вызывать disconnect()\n- Использовать для событий (click, input)\n- Блокирующих операций',
                },
              ],
            },
            {
              id: 'card-77',
              blocks: [
                {
                  id: 'heading-78',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Асинхронность callback (микрозадача)\n- Производительность при частых мутациях\n- Shadow DOM требует отдельный observer\n- Утечки памяти при незакрытых observers\n- Порядок обработки мутаций\n- Совместимость (IE не поддерживает)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-80',
          type: 'prose',
          markdown:
            '**MutationObserver** — мощный инструмент для отслеживания изменений в DOM. Он асинхронный, эффективный и предоставляет детальную информацию о мутациях. Основные применения: мониторинг, автоматизация, безопасность, интеграция со сторонним кодом. Ключевые моменты: правильная конфигурация, оптимизация производительности (debounce, batch), управление жизненным циклом (disconnect). Не заменяет DOM events для пользовательских взаимодействий и не подходит для реактивности данных (лучше использовать Proxy или фреймворки).',
        },
        {
          id: 'resources-81',
          type: 'resources',
          items: [
            {
              id: 'link-82',
              label: 'MDN MutationObserver',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver',
            },
          ],
        },
        {
          id: 'resources-83',
          type: 'resources',
          items: [
            {
              id: 'link-84',
              label: 'JavaScript.info',
              url: 'https://javascript.info/mutation-observer',
            },
          ],
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'Спецификация WHATWG',
              url: 'https://dom.spec.whatwg.org/#mutation-observers',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
