import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-cors-info-whatiscorssnippet.txt?raw'
import example2 from '../snippets/web/web-cors-info-sameoriginpolicysnippet.txt?raw'
import example3 from '../snippets/web/web-cors-info-howcorsworkssnippet.txt?raw'
import example4 from '../snippets/web/web-cors-info-corsheaderssnippet.txt?raw'
import example5 from '../snippets/web/web-cors-info-simplerequestsnippet.txt?raw'
import example6 from '../snippets/web/web-cors-info-preflightrequestsnippet.txt?raw'
import example7 from '../snippets/web/web-cors-info-serverexamplenodesnippet.txt?raw'
import example8 from '../snippets/web/web-cors-info-credentialsexamplesnippet.txt?raw'
import example9 from '../snippets/web/web-cors-info-securityissuessnippet.txt?raw'
import example10 from '../snippets/web/web-cors-info-debuggingcorssnippet.txt?raw'
import example11 from '../snippets/web/web-cors-info-alternativessnippet.txt?raw'

// Content copied verbatim from src/views/web/CorsInfo.vue.
export default {
  ...articleSummaries.webCorsInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**CORS (Cross\\-Origin Resource Sharing)** — это механизм безопасности браузера, который контролирует, какие веб\\-сайты могут получать доступ к ресурсам с другого домена. CORS является расширением политики **Same\\-Origin Policy** и использует HTTP заголовки для разрешения или запрета cross\\-origin запросов.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое CORS и зачем он нужен?',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Безопасность:** CORS защищает пользователей от атак типа CSRF (Cross\\-Site Request Forgery) и предотвращает кражу данных злонамеренными сайтами.',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Same-Origin Policy (SOP)',
      blocks: [
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            '**Same\\-Origin Policy** — фундаментальная политика безопасности браузера, которая запрещает веб\\-страницам делать запросы к другим доменам без явного разрешения.',
        },
        {
          id: 'code-6',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Origin — что это?',
      blocks: [
        {
          id: 'table-7',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'URL',
            },
            {
              id: 'column-2',
              label: 'Origin',
            },
            {
              id: 'column-3',
              label: 'Совпадает с https://example.com?',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'https://example.com/page',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'https://example.com',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**✅ Да (same\\-origin)**',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'https://example.com:443/api',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'https://example.com:443',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**✅ Да (443 \\- порт по умолчанию для HTTPS)**',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'http://example.com',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'http://example.com',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**❌ Нет (другой протокол)**',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'https://api.example.com',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'https://api.example.com',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**❌ Нет (другой поддомен)**',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'https://example.com:8080',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'https://example.com:8080',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**❌ Нет (другой порт)**',
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
                    markdown: 'https://example.org',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'https://example.org',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**❌ Нет (другой домен)**',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Как работает CORS?',
      blocks: [
        {
          id: 'steps-26',
          type: 'steps',
          mode: 'sequence',
          showTitle: false,
          items: [
            {
              id: 'step-27',
              title: 'Браузер определяет cross-origin',
              blocks: [],
            },
            {
              id: 'step-28',
              title: 'Отправка с Origin',
              blocks: [],
            },
            {
              id: 'step-29',
              title: 'Сервер проверяет',
              blocks: [],
            },
            {
              id: 'step-30',
              title: 'Браузер проверяет ответ',
              blocks: [],
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
      title: 'CORS HTTP заголовки',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Типы CORS запросов',
      blocks: [
        {
          id: 'cards-33',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-34',
              blocks: [
                {
                  id: 'heading-35',
                  type: 'heading',
                  level: 3,
                  text: 'Простые запросы (Simple)',
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- **Методы:** GET, HEAD, POST\n- **Заголовки:** только безопасные\n- **Content\\-Type:** form\\-data, form\\-urlencoded, text/plain\n- **Preflight:** НЕ требуется\n- **Отправка:** сразу',
                },
              ],
            },
            {
              id: 'card-37',
              blocks: [
                {
                  id: 'heading-38',
                  type: 'heading',
                  level: 3,
                  text: 'Preflight запросы',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '- **Методы:** PUT, DELETE, PATCH, и др.\n- **Заголовки:** кастомные (Authorization, и др.)\n- **Content\\-Type:** application/json, и др.\n- **Preflight:** ТРЕБУЕТСЯ (OPTIONS)\n- **Отправка:** после успешного preflight',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-40',
          type: 'heading',
          level: 3,
          text: 'Простые запросы (Simple Requests)',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-42',
          type: 'heading',
          level: 3,
          text: 'Preflight запросы',
        },
        {
          id: 'callout-43',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-44',
              type: 'prose',
              markdown:
                '**Важно:** Preflight запрос (OPTIONS) отправляется автоматически браузером для проверки разрешений перед отправкой основного запроса. Сервер должен корректно обрабатывать OPTIONS.',
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
      id: 'section-7',
      title: 'Настройка CORS на сервере',
      blocks: [
        {
          id: 'code-46',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Работа с Credentials (Cookies)',
      blocks: [
        {
          id: 'callout-47',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-48',
              type: 'prose',
              markdown:
                "**Критично:** При использовании `credentials: 'include'` нельзя использовать `Access-Control-Allow-Origin: *`. Нужно указывать конкретный origin!",
            },
          ],
        },
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Проблемы безопасности',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Отладка CORS',
      blocks: [
        {
          id: 'code-51',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Обходы и альтернативы CORS',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-53',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Тип запроса',
            },
            {
              id: 'column-3',
              label: 'Preflight?',
            },
            {
              id: 'column-4',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'GET запрос без заголовков',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Simple**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Загрузка публичного API',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'POST с form\\-data',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Simple**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Отправка формы',
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
                    markdown: 'POST с JSON',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**Preflight**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'REST API запрос',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'DELETE запрос',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '**Preflight**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Удаление ресурса',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'GET с Authorization',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '**Preflight**',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Приватные данные',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'PUT запрос',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '**Preflight**',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Обновление ресурса',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-78',
          type: 'prose',
          markdown:
            '1. **Что такое CORS и зачем он нужен?**\n   \n   CORS — это механизм безопасности браузера, который контролирует cross\\-origin запросы через HTTP заголовки. Он расширяет Same\\-Origin Policy, позволяя серверам явно разрешать доступ с определенных доменов, защищая пользователей от атак типа CSRF и кражи данных.\n2. **В чем разница между Simple и Preflight запросами?**\n   \n   Simple запросы (GET, HEAD, POST с безопасными заголовками) отправляются сразу. Preflight запросы (PUT, DELETE, кастомные заголовки, JSON) требуют предварительного OPTIONS запроса для проверки разрешений перед отправкой основного запроса.\n3. **Какие HTTP заголовки используются в CORS?**\n   \n   Основные: `Access-Control-Allow-Origin` (разрешенные origins), `Access-Control-Allow-Methods` (методы), `Access-Control-Allow-Headers` (заголовки), `Access-Control-Allow-Credentials` (cookies), `Access-Control-Max-Age` (кэш preflight).\n4. **Почему нельзя использовать \\* с credentials?**\n   \n   Из соображений безопасности: если разрешить любому origin (`*`) отправлять cookies, злонамеренный сайт сможет украсть приватные данные пользователя. При `credentials: true` нужно указывать конкретный origin.\n5. **Что такое Preflight кэширование?**\n   \n   `Access-Control-Max-Age` указывает, сколько секунд браузер может кэшировать результат preflight запроса. Это оптимизирует производительность, избегая лишних OPTIONS запросов. Рекомендуется 24 часа (86400 секунд).\n6. **Как отладить CORS ошибки?**\n   \n   В DevTools проверить: (1) Console — текст ошибки CORS, (2) Network → найти preflight OPTIONS, (3) проверить Request Headers (Origin, Access\\-Control\\-Request\\-\\*), (4) проверить Response Headers (Access\\-Control\\-Allow\\-\\*). Частые проблемы: отсутствие заголовков, несовпадение origin, неправильный credentials.\n7. **Какие есть обходы CORS?**\n   \n   (1) Proxy сервер — запросы идут через свой бэкенд, (2) JSONP (устарело), (3) Browser extensions (только для разработки), (4) CORS Anywhere (прототипирование). Правильное решение — настроить CORS на целевом сервере.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-79',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-80',
              blocks: [
                {
                  id: 'heading-81',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- Whitelist конкретных origins\n- Минимизировать Max\\-Age (24 часа)\n- Проверять Origin на сервере\n- Логировать CORS ошибки\n- Использовать HTTPS\n- Тестировать с реальными origins',
                },
              ],
            },
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Access\\-Control\\-Allow\\-Origin: \\*\n- \\* с credentials\n- Отражение Origin без проверки\n- Слишком длинный Max\\-Age\n- Игнорирование preflight\n- Забывать про OPTIONS',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Использовать CORS middleware\n- Настроить разные origins для сред\n- Мониторить CORS ошибки в продакшене\n- Документировать CORS политику\n- Тестировать в разных браузерах\n- Учитывать мобильные приложения',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-89',
          type: 'prose',
          markdown:
            '**CORS** — критически важный механизм безопасности, который защищает пользователей от атак через контроль cross\\-origin запросов. Понимание разницы между Simple и Preflight запросами, правильная настройка CORS заголовков на сервере и знание проблем безопасности необходимы каждому фронтенд\\-разработчику. Правильная конфигурация CORS балансирует между безопасностью и функциональностью приложения.',
        },
        {
          id: 'resources-90',
          type: 'resources',
          items: [
            {
              id: 'link-91',
              label: 'MDN: CORS',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
            },
          ],
        },
        {
          id: 'resources-92',
          type: 'resources',
          items: [
            {
              id: 'link-93',
              label: 'CORS Spec',
              url: 'https://fetch.spec.whatwg.org/#http-cors-protocol',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
