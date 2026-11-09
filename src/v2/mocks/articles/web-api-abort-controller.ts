import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-abort-controller-abortbasicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-abort-controller-fetchabortsnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-abort-controller-multipleabortsnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-abort-controller-reactexamplessnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-abort-controller-advancedexamplessnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-abort-controller-polyfillssnippet.txt?raw'

// Content copied verbatim from src/views/web-api/AbortController.vue.
export default {
  ...articleSummaries.webApiAbortController,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**AbortController** — это Web API для прерывания асинхронных операций, таких как fetch запросы, загрузка файлов, потоковые операции. Состоит из двух частей: **AbortController** (управление) и **AbortSignal** (сигнал для передачи в API).',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основная концепция',
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
                  text: 'AbortController',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- Создает `signal`\n- Метод `abort()` для отмены\n- Можно передать причину отмены\n- Одноразовый (нельзя переиспользовать)\n- Может отменить множество операций',
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
                  text: 'AbortSignal',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    "- Передается в асинхронные API\n- Свойство `aborted` (boolean)\n- Свойство `reason` (причина отмены)\n- Событие `'abort'`\n- Только для чтения (readonly)",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы работы с AbortController',
      blocks: [
        {
          id: 'callout-9',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-10',
              type: 'prose',
              markdown:
                '**Паттерн:** Создать контроллер → Получить signal → Передать в API → Вызвать abort() для отмены',
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Отмена fetch запросов',
      blocks: [
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Отмена нескольких запросов',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Использование в React',
      blocks: [
        {
          id: 'callout-14',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-15',
              type: 'prose',
              markdown: '**Best Practice:** Всегда отменяйте запросы в cleanup функции useEffect',
            },
          ],
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Продвинутые техники',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'API поддерживающие AbortSignal',
      blocks: [
        {
          id: 'table-18',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'API',
            },
            {
              id: 'column-2',
              label: 'Поддержка',
            },
            {
              id: 'column-3',
              label: 'Примечание',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '`fetch()`',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '✅ Полная',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Стандартная поддержка',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '`addEventListener()`',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '✅ Полная',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Автоматическое удаление слушателя',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '`setTimeout()` / `setInterval()`',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '⚠️ Частичная',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Через обертку',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Streams API',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '✅ Полная',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'ReadableStream, WritableStream',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'FileReader',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Использовать метод abort()',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'XMLHttpRequest',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Использовать метод abort()',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'WebSocket',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Использовать метод close()',
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
      title: 'Совместимость и полифиллы',
      blocks: [
        {
          id: 'cards-40',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-41',
              title: 'Поддержка браузерами',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- **Chrome:** 66\\+ ✅\n- **Firefox:** 57\\+ ✅\n- **Safari:** 12.1\\+ ✅\n- **Edge:** 79\\+ ✅\n- **IE:** ❌ Не поддерживается\n- **Node.js:** 15\\+ ✅',
                },
              ],
            },
            {
              id: 'card-43',
              title: 'Новые методы',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- `AbortSignal.timeout(ms)` \\- ES2023\n- `AbortSignal.any(signals)` \\- ES2024\n- `AbortSignal.throwIfAborted()` \\- ES2024\n- Проверяйте поддержку перед использованием\n- Используйте полифиллы при необходимости',
                },
              ],
            },
          ],
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-46',
          type: 'prose',
          markdown:
            "1. **Как работает AbortController?**\n   \n   AbortController создает AbortSignal, который передается в асинхронные API (fetch, addEventListener). При вызове `controller.abort()` signal переходит в состояние \"aborted\" и триггерит событие 'abort', что позволяет API прервать операцию.\n2. **Можно ли переиспользовать AbortController?**\n   \n   Нет, AbortController одноразовый. После вызова `abort()` нельзя \"сбросить\" состояние. Для новой операции нужно создать новый экземпляр. Однако один контроллер может отменить множество операций, использующих его signal.\n3. **Как отменить несколько fetch запросов одновременно?**\n   \n   Создать один AbortController и передать его signal во все запросы. При вызове `abort()` все запросы с этим signal будут отменены одновременно. Для независимой отмены нужны отдельные контроллеры для каждого запроса.\n4. **Как реализовать таймаут для fetch?**\n   \n   Два способа: 1) Создать AbortController, установить setTimeout для вызова `abort()`. 2) Использовать `AbortSignal.timeout(ms)` (ES2023) — более короткий и чистый вариант.\n5. **Почему важно отменять запросы в React useEffect?**\n   \n   При размонтировании компонента или изменении зависимостей запрос может завершиться после размонтирования, вызывая setState на несуществующем компоненте (memory leak, warning). Отмена запроса в cleanup функции предотвращает эти проблемы.\n6. **Что происходит при вызове abort() после завершения запроса?**\n   \n   Ничего плохого не произойдет. Если запрос уже завершен, вызов `abort()` безопасен и не вызовет ошибок. Signal просто перейдет в состояние aborted, но это не повлияет на уже полученный результат.\n7. **Как обработать отмену в catch блоке?**\n   \n   Проверять `error.name === 'AbortError'`. При отмене fetch выбрасывает DOMException с именем 'AbortError'. Важно отличать отмену от реальных ошибок сети для правильной обработки и логирования.\n8. **Как комбинировать несколько AbortSignal?**\n   \n   Использовать `AbortSignal.any([signal1, signal2, ...])` (ES2024) или создать собственный класс, который слушает все signals и отменяется при первой отмене любого из них. Полезно для комбинирования таймаута и пользовательской отмены.",
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение подходов к отмене',
      blocks: [
        {
          id: 'table-47',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Плюсы',
            },
            {
              id: 'column-3',
              label: 'Минусы',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '**AbortController**',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown:
                      '- Стандартный API\n- Поддержка fetch\n- Декларативный\n- Композируемый',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '- Относительно новый\n- Нужен полифилл для старых браузеров',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**Флаги (let cancelled = false)**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '- Простота\n- Работает везде\n- Нет зависимостей',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown:
                      '- Не отменяет сетевые запросы\n- Только проверка в коде\n- Не композируется',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '**Promise.race()**',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '- Простая логика\n- Работает с любыми промисами',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '- Не отменяет запрос\n- Игнорирует результат\n- Утечка ресурсов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Axios CancelToken**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '- Встроено в Axios\n- Хорошая документация',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '- Только для Axios\n- Deprecated (используйте AbortController)',
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
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-60',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    "- Всегда отменять в React cleanup\n- Проверять `error.name === 'AbortError'`\n- Создавать новый контроллер для каждой операции\n- Использовать `AbortSignal.timeout()` для таймаутов\n- Передавать причину отмены\n- Обрабатывать отмену gracefully",
                },
              ],
            },
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Переиспользования контроллера\n- Игнорирования AbortError\n- Обновления state после abort\n- Забывать отменять в cleanup\n- Использовать Promise.race вместо abort\n- Полагаться только на флаги',
                },
              ],
            },
            {
              id: 'card-67',
              blocks: [
                {
                  id: 'heading-68',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Используйте менеджер запросов\n- Комбинируйте signals для сложных сценариев\n- Логируйте причины отмены\n- Показывайте feedback пользователю\n- Тестируйте отмену запросов\n- Документируйте поведение при отмене',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Типичные паттерны использования',
      blocks: [
        {
          id: 'cards-70',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-71',
              title: 'Когда использовать',
              blocks: [
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Отмена fetch запросов\n- Таймауты для операций\n- Поиск с debounce\n- Навигация между страницами\n- Размонтирование React компонентов\n- Отмена загрузки больших файлов\n- Множественные параллельные запросы\n- WebSocket/SSE подключения',
                },
              ],
            },
            {
              id: 'card-73',
              title: 'Альтернативы',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- **Флаги:** для синхронных операций\n- **Debounce:** для уменьшения запросов\n- **Throttle:** для ограничения частоты\n- **Memoization:** для кеширования\n- **SWR/React Query:** для управления данными\n- **Очередь запросов:** для последовательности',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-75',
          type: 'prose',
          markdown:
            '**AbortController** — это стандартный современный способ прерывания асинхронных операций в JavaScript. Он позволяет отменять fetch запросы, загрузку ресурсов, слушатели событий и другие операции через единый API. Ключевые компоненты: **AbortController** (управление), **AbortSignal** (сигнал), метод `abort()` (отмена) и обработка **AbortError**. Критически важно использовать в React для предотвращения утечек памяти и обновлений размонтированных компонентов. Современные методы `AbortSignal.timeout()` и `AbortSignal.any()` упрощают работу с таймаутами и комбинированием сигналов.',
        },
        {
          id: 'resources-76',
          type: 'resources',
          items: [
            {
              id: 'link-77',
              label: 'MDN AbortController',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
            },
          ],
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'MDN AbortSignal',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal',
            },
          ],
        },
        {
          id: 'resources-80',
          type: 'resources',
          items: [
            {
              id: 'link-81',
              label: 'Chrome Developers Guide',
              url: 'https://developer.chrome.com/blog/abortable-fetch',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
