import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-fetchbasicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-fetchlimitationssnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-xmlhttprequestbasicssnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-uploadprogresssnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-beforeunloadsnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-comparisonsnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-whentousesnippet.txt?raw'
import example8 from '../snippets/web-api/web-api-fetch-api-and-xml-http-request-practicalexamplessnippet.txt?raw'

// Content copied verbatim from src/views/web-api/FetchAPIandXMLHttpRequest.vue.
export default {
  ...articleSummaries.webApiFetchAPIandXMLHttpRequest,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Fetch API** — современный способ выполнения HTTP\\-запросов с Promise\\-based интерфейсом. **XMLHttpRequest** — классический API, который всё ещё необходим для специфических задач: получения прогресса отправки файлов и работы в событиях unload/beforeunload.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые различия',
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
              label: 'Fetch API',
            },
            {
              id: 'column-3',
              label: 'XMLHttpRequest',
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
                    markdown: 'Promise\\-based, async/await',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Callback\\-based, события',
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
                    markdown: '**Прогресс отправки**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '✅ Есть (upload.onprogress)',
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
                    markdown: '**Прогресс скачивания**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '✅ Через ReadableStream',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '✅ Через onprogress',
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
                    markdown: '**Синхронные запросы**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '❌ Только асинхронные',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '✅ Есть (deprecated)',
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
                    markdown: '**Работа в unload**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '❌ Может не успеть',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '✅ Синхронный запрос работает',
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
                    markdown: '**Timeout**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Через AbortController',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Встроенное свойство timeout',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Отмена запроса**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'AbortController',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'xhr.abort()',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Поддержка браузеров**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Современные браузеры',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Все браузеры (IE10\\+)',
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
      title: 'Fetch API - современный подход',
      blocks: [
        {
          id: 'callout-27',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-28',
              type: 'prose',
              markdown:
                '**Рекомендуется:** Используйте Fetch API для большинства HTTP\\-запросов в новом коде.',
            },
          ],
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Ограничения Fetch API',
      blocks: [
        {
          id: 'callout-30',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-31',
              type: 'prose',
              markdown: '**Важно:** Fetch не может отследить прогресс ОТПРАВКИ данных на сервер!',
            },
          ],
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'XMLHttpRequest - классический API',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '⭐ Прогресс загрузки файла (upload.onprogress)',
      blocks: [
        {
          id: 'callout-34',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-35',
              type: 'prose',
              markdown:
                '**Ключевое преимущество XHR:** Это единственный способ отследить прогресс ОТПРАВКИ данных на сервер!',
            },
          ],
        },
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
                  text: 'Fetch API',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '- **❌ НЕТ upload.onprogress**\n- Невозможно отследить прогресс отправки\n- Можно только прогресс скачивания (ReadableStream)\n- Пользователь не видит процесс загрузки файла',
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
                  text: 'XMLHttpRequest',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- **✅ ЕСТЬ upload.onprogress**\n- Отслеживание процента загрузки\n- Количество загруженных байт\n- Отображение progress bar для пользователя',
                },
              ],
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '⭐ Использование в событиях unload/beforeunload',
      blocks: [
        {
          id: 'callout-44',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-45',
              type: 'prose',
              markdown:
                '**Проблема:** При закрытии страницы Fetch может не успеть отправить данные!',
            },
          ],
        },
        {
          id: 'cards-46',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: 'Лучшее решение',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown: '`navigator.sendBeacon()`',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Гарантирует отправку данных\n- Не блокирует закрытие страницы\n- Простой API\n- Поддерживается везде',
                },
              ],
            },
            {
              id: 'card-51',
              blocks: [
                {
                  id: 'heading-52',
                  type: 'heading',
                  level: 3,
                  text: 'Альтернатива',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: 'Fetch с `keepalive: true`',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Современное решение\n- Promise\\-based\n- Хорошая поддержка\n- Похож на обычный Fetch',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: 'Fallback',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: 'XHR синхронный',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Работает везде\n- Гарантирует отправку\n- ❌ Блокирует UI\n- ❌ Deprecated',
                },
              ],
            },
          ],
        },
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Прямое сравнение синтаксиса',
      blocks: [
        {
          id: 'code-60',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Когда использовать Fetch, а когда XMLHttpRequest',
      blocks: [
        {
          id: 'code-61',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Продвинутые практические примеры',
      blocks: [
        {
          id: 'code-62',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Типичные сценарии использования',
      blocks: [
        {
          id: 'cards-63',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: 'Используйте Fetch',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Обычные API запросы (GET, POST)\n- RESTful взаимодействие\n- Загрузка JSON данных\n- Современный асинхронный код\n- Работа с промисами\n- Прогресс скачивания файлов\n- Streaming данных',
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
                  text: 'Используйте XMLHttpRequest',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- **Прогресс загрузки файлов**\n- **События unload/beforeunload**\n- Поддержка старых браузеров\n- Полный контроль над событиями\n- Синхронные запросы (крайний случай)\n- Встроенный timeout\n- Legacy код',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-70',
          type: 'prose',
          markdown:
            '1. **В чем главное преимущество Fetch перед XMLHttpRequest?**\n   \n   Fetch предоставляет более чистый Promise\\-based API, лучше интегрируется с async/await, имеет более простой синтаксис. Однако XMLHttpRequest всё ещё необходим для прогресса загрузки файлов (upload.onprogress) и надежной отправки данных в событиях unload.\n2. **Как отследить прогресс загрузки файла на сервер?**\n   \n   Только через XMLHttpRequest с использованием `xhr.upload.onprogress`. Fetch API не предоставляет возможности отслеживать прогресс отправки данных. Можно отслеживать только прогресс скачивания через ReadableStream.\n3. **Как надежно отправить данные при закрытии страницы?**\n   \n   Лучший способ — `navigator.sendBeacon()`. Альтернатива — Fetch с `keepalive: true`. Fallback — синхронный XMLHttpRequest (deprecated, блокирует UI). Обычный Fetch может не успеть выполниться при закрытии страницы.\n4. **Можно ли отменить Fetch запрос?**\n   \n   Да, через `AbortController`. Создаете controller, передаете его signal в fetch, затем вызываете `controller.abort()`. В XMLHttpRequest отмена проще — просто `xhr.abort()`.\n5. **Как установить timeout для Fetch?**\n   \n   Fetch не имеет встроенного timeout. Нужно использовать AbortController с setTimeout: создать controller, установить таймер на abort, передать signal в fetch. XMLHttpRequest имеет встроенное свойство `xhr.timeout`.\n6. **Почему Fetch не выбрасывает ошибку для HTTP 404 или 500?**\n   \n   Fetch считает любой полученный HTTP\\-ответ успешным, даже с кодом ошибки. Promise отклоняется только при сетевых ошибках. Нужно вручную проверять `response.ok` или `response.status`. XMLHttpRequest также требует проверки status.\n7. **В каких случаях всё ещё нужен XMLHttpRequest?**\n   \n   1\\) Прогресс загрузки файлов на сервер (upload.onprogress), 2) Отправка аналитики в событиях beforeunload/unload (синхронный запрос), 3) Поддержка старых браузеров, 4) Legacy код, требующий обратной совместимости.\n8. **Что такое navigator.sendBeacon и когда его использовать?**\n   \n   sendBeacon — метод для надежной отправки небольших данных (обычно аналитики) при закрытии страницы. Гарантирует отправку без блокировки UI. Идеален для событий beforeunload/unload. Ограничен размером данных (обычно ~64KB).',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-71',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Используйте Fetch для новых проектов\n- XHR для прогресса загрузки файлов\n- sendBeacon для аналитики при закрытии\n- Обрабатывайте ошибки правильно\n- Проверяйте response.ok в Fetch\n- Используйте AbortController для отмены\n- Показывайте прогресс пользователю',
                },
              ],
            },
            {
              id: 'card-75',
              blocks: [
                {
                  id: 'heading-76',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Синхронных XHR запросов\n- Fetch в событиях unload\n- Игнорирования статус кодов\n- Загрузки больших файлов без прогресса\n- XHR для обычных API запросов\n- Отсутствия timeout для запросов\n- Утечек памяти через незавершенные запросы',
                },
              ],
            },
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Используйте универсальные обертки\n- Реализуйте retry механизм\n- Кешируйте повторяющиеся запросы\n- Применяйте debounce для поиска\n- Отменяйте устаревшие запросы\n- Логируйте сетевые ошибки\n- Тестируйте оффлайн режим',
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
          id: 'text-81',
          type: 'prose',
          markdown:
            '**Fetch API** — современный стандарт для HTTP\\-запросов с чистым Promise\\-based API. Используйте его для большинства задач. **XMLHttpRequest** всё ещё необходим в двух ключевых случаях: **1)** Получение прогресса загрузки файлов на сервер через `xhr.upload.onprogress` (Fetch это не может), **2)** Отправка данных в событиях `beforeunload/unload` (хотя `navigator.sendBeacon()` предпочтительнее). Понимание различий и правильный выбор инструмента критично для создания эффективных веб\\-приложений.',
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'MDN Fetch API',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
            },
          ],
        },
        {
          id: 'resources-84',
          type: 'resources',
          items: [
            {
              id: 'link-85',
              label: 'MDN XMLHttpRequest',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
            },
          ],
        },
        {
          id: 'resources-86',
          type: 'resources',
          items: [
            {
              id: 'link-87',
              label: 'MDN sendBeacon',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
