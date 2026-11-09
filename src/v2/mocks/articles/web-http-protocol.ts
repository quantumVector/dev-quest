import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-http-protocol-httpbasicssnippet.txt?raw'
import example2 from '../snippets/web/web-http-protocol-httpmethodssnippet.txt?raw'
import example3 from '../snippets/web/web-http-protocol-httpheaderssnippet.txt?raw'
import example4 from '../snippets/web/web-http-protocol-statuscodessnippet.txt?raw'
import example5 from '../snippets/web/web-http-protocol-redirectssnippet.txt?raw'
import example6 from '../snippets/web/web-http-protocol-httpssnippet.txt?raw'
import example7 from '../snippets/web/web-http-protocol-corssnippet.txt?raw'

// Content copied verbatim from src/views/web/HTTPProtocol.vue.
export default {
  ...articleSummaries.webHTTPProtocol,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**HTTP (HyperText Transfer Protocol)** — это протокол прикладного уровня для передачи гипертекстовых документов. Он является основой обмена данными в Web и работает по модели клиент\\-сервер: клиент отправляет запрос, сервер возвращает ответ.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы HTTP протокола',
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
                  text: 'Клиент-Сервер',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Запрос\\-ответ:** синхронная модель\n- **Stateless:** без состояния между запросами\n- **Текстовый протокол:** человекочитаемый\n- **Порт по умолчанию:** 80 (HTTP), 443 (HTTPS)',
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
                  text: 'Структура',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Стартовая строка:** метод, URL, версия\n- **Заголовки:** метаданные запроса/ответа\n- **Пустая строка:** разделитель\n- **Тело (опционально):** данные',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'http',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'HTTP Методы (HTTP Methods)',
      blocks: [
        {
          id: 'text-10',
          type: 'prose',
          markdown:
            'HTTP методы определяют действие, которое клиент хочет выполнить с ресурсом на сервере. Основные методы следуют принципам REST API.',
        },
        {
          id: 'table-11',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Идемпотентный',
            },
            {
              id: 'column-4',
              label: 'Безопасный',
            },
            {
              id: 'column-5',
              label: 'Кэшируемый',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**GET**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Получить ресурс',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '**POST**',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Создать ресурс',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '⚠️ Редко',
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
                    markdown: '**PUT**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Обновить полностью',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**PATCH**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Обновить частично',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-31',
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
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**DELETE**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Удалить ресурс',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '✅ Да',
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
                    markdown: '❌ Нет',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**HEAD**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Получить заголовки',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**OPTIONS**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Узнать методы',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-47',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'HTTP Заголовки (Headers)',
      blocks: [
        {
          id: 'text-48',
          type: 'prose',
          markdown:
            'Заголовки HTTP передают дополнительную информацию о запросе или ответе: тип контента, авторизацию, кэширование, CORS, безопасность и многое другое.',
        },
        {
          id: 'cards-49',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 3,
                  text: 'Request Headers',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Host, User\\-Agent\n- Accept, Accept\\-Language\n- Authorization, Cookie\n- Content\\-Type, Content\\-Length\n- Cache\\-Control, If\\-None\\-Match',
                },
              ],
            },
            {
              id: 'card-53',
              blocks: [
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 3,
                  text: 'Response Headers',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- Content\\-Type, Content\\-Length\n- Cache\\-Control, ETag\n- Set\\-Cookie\n- Access\\-Control\\-Allow\\-\\*\n- Location (redirects)',
                },
              ],
            },
            {
              id: 'card-56',
              blocks: [
                {
                  id: 'heading-57',
                  type: 'heading',
                  level: 3,
                  text: 'Security Headers',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Strict\\-Transport\\-Security\n- X\\-Content\\-Type\\-Options\n- X\\-Frame\\-Options\n- Content\\-Security\\-Policy\n- X\\-XSS\\-Protection',
                },
              ],
            },
          ],
        },
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'HTTP Статус-коды (Status Codes)',
      blocks: [
        {
          id: 'text-60',
          type: 'prose',
          markdown:
            'Статус\\-коды HTTP указывают результат выполнения запроса. Они делятся на 5 категорий по первой цифре.',
        },
        {
          id: 'cards-61',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-62',
              title: '1xx - Информационные',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: '- 100 Continue\n- 101 Switching Protocols\n- 103 Early Hints',
                },
              ],
            },
            {
              id: 'card-64',
              title: '2xx - Успешные',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown: '- 200 OK\n- 201 Created\n- 204 No Content\n- 206 Partial Content',
                },
              ],
            },
            {
              id: 'card-66',
              title: '3xx - Перенаправления',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- 301 Moved Permanently\n- 302 Found\n- 304 Not Modified\n- 307/308 Redirect',
                },
              ],
            },
            {
              id: 'card-68',
              title: '4xx - Ошибки клиента',
              blocks: [
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- 400 Bad Request\n- 401 Unauthorized\n- 403 Forbidden\n- 404 Not Found\n- 405 Method Not Allowed\n- 429 Too Many Requests',
                },
              ],
            },
            {
              id: 'card-70',
              title: '5xx - Ошибки сервера',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- 500 Internal Server Error\n- 501 Not Implemented\n- 502 Bad Gateway\n- 503 Service Unavailable\n- 504 Gateway Timeout',
                },
              ],
            },
          ],
        },
        {
          id: 'code-72',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'HTTP Перенаправления (Redirects)',
      blocks: [
        {
          id: 'text-73',
          type: 'prose',
          markdown:
            'Перенаправления позволяют серверу сообщить клиенту, что ресурс находится по другому URL. Разные коды перенаправления имеют разное поведение.',
        },
        {
          id: 'table-74',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Код',
            },
            {
              id: 'column-2',
              label: 'Тип',
            },
            {
              id: 'column-3',
              label: 'Сохраняет метод',
            },
            {
              id: 'column-4',
              label: 'Кэширование',
            },
            {
              id: 'column-5',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '**301**',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Постоянный',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '❌ Нет (→GET)',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Смена URL навсегда',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '**302**',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Временный',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '❌ Нет (→GET)',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Временное перемещение',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**303**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'See Other',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '❌ Нет (→GET)',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Post\\-Redirect\\-Get',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '**307**',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Временный',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Временно, метод важен',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '**308**',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: 'Постоянный',
                  },
                ],
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: 'Постоянно, метод важен',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-100',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'HTTPS — Защищенное соединение',
      blocks: [
        {
          id: 'text-101',
          type: 'prose',
          markdown:
            '**HTTPS (HTTP Secure)** — это HTTP с шифрованием через TLS/SSL. Это стандарт безопасности для современного веба, обеспечивающий конфиденциальность, целостность и аутентификацию.',
        },
        {
          id: 'cards-102',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-103',
              title: '❌ HTTP (незащищенный)',
              blocks: [
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '- **Порт:** 80\n- **Шифрование:** Нет\n- **Данные:** В открытом виде\n- **Сертификат:** Не нужен\n- **SEO:** Понижение рейтинга\n- **Безопасность:** Уязвим к атакам',
                },
              ],
            },
            {
              id: 'card-105',
              title: '✅ HTTPS (защищенный)',
              blocks: [
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown:
                    '- **Порт:** 443\n- **Шифрование:** TLS/SSL\n- **Данные:** Зашифрованы\n- **Сертификат:** Обязателен\n- **SEO:** Повышение рейтинга\n- **Безопасность:** Защита от MITM',
                },
              ],
            },
          ],
        },
        {
          id: 'code-107',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'CORS — Cross-Origin Resource Sharing',
      blocks: [
        {
          id: 'text-108',
          type: 'prose',
          markdown:
            'CORS решает проблему Same\\-Origin Policy, позволяя серверу разрешить запросы с других доменов. Это критически важно для работы современных веб\\-приложений с API.',
        },
        {
          id: 'code-109',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-110',
          type: 'prose',
          markdown:
            '1. **В чем разница между GET и POST?**\n   \n   GET получает данные (идемпотентный, безопасный, кэшируемый, параметры в URL). POST создает ресурсы (НЕ идемпотентный, НЕ безопасный, данные в теле запроса). GET для чтения, POST для изменения состояния сервера.\n2. **Что означает идемпотентность HTTP методов?**\n   \n   Идемпотентность означает, что повторное выполнение одного и того же запроса дает одинаковый результат. GET, PUT, DELETE идемпотентны. POST и PATCH — нет. Идемпотентность важна для безопасности повторных запросов.\n3. **В чем разница между PUT и PATCH?**\n   \n   PUT заменяет ресурс полностью (нужны все поля). PATCH обновляет частично (только измененные поля). PUT идемпотентен, PATCH обычно нет. PUT для полного обновления, PATCH для частичного.\n4. **Что такое preflight запрос в CORS?**\n   \n   Preflight — это OPTIONS запрос перед основным запросом. Браузер спрашивает сервер: "Можно ли выполнить этот запрос?". Сервер отвечает разрешенными методами и заголовками. Нужен для сложных запросов (PUT, DELETE, кастомные заголовки).\n5. **В чем разница между 301 и 302 редиректами?**\n   \n   301 — постоянное перенаправление (браузеры кэшируют, SEO обновляет индекс). 302 — временное перенаправление (не кэшируется агрессивно, SEO сохраняет старый URL). 301 для смены домена/URL навсегда, 302 для временных изменений.\n6. **Почему HTTPS важнее HTTP?**\n   \n   HTTPS шифрует данные (защита от перехвата), аутентифицирует сервер (защита от подмены), обеспечивает целостность (защита от изменения). Обязателен для: паролей, платежей, личных данных. Поисковики повышают HTTPS в рейтинге. Современные браузеры требуют HTTPS для многих API.\n7. **Что такое статус 304 Not Modified?**\n   \n   304 означает, что ресурс не изменился с момента последнего запроса. Используется для условных запросов с заголовками If\\-None\\-Match (ETag) или If\\-Modified\\-Since. Браузер использует закэшированную версию. Экономит трафик и ускоряет загрузку.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'HTTP версии',
      blocks: [
        {
          id: 'table-111',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Версия',
            },
            {
              id: 'column-2',
              label: 'Год',
            },
            {
              id: 'column-3',
              label: 'Особенности',
            },
            {
              id: 'column-4',
              label: 'Состояние',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: '**HTTP/0.9**',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: '1991',
                  },
                ],
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: 'Только GET, HTML',
                  },
                ],
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: 'Устарел',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: '**HTTP/1.0**',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: '1996',
                  },
                ],
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: 'Заголовки, методы, коды',
                  },
                ],
                [
                  {
                    id: 'text-119',
                    type: 'prose',
                    markdown: 'Устарел',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-120',
                    type: 'prose',
                    markdown: '**HTTP/1.1**',
                  },
                ],
                [
                  {
                    id: 'text-121',
                    type: 'prose',
                    markdown: '1997',
                  },
                ],
                [
                  {
                    id: 'text-122',
                    type: 'prose',
                    markdown: 'Keep\\-Alive, chunked, cache',
                  },
                ],
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown: 'Используется',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '**HTTP/2**',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: '2015',
                  },
                ],
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: 'Multiplexing, binary, HPACK',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown: 'Рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-128',
                    type: 'prose',
                    markdown: '**HTTP/3**',
                  },
                ],
                [
                  {
                    id: 'text-129',
                    type: 'prose',
                    markdown: '2022',
                  },
                ],
                [
                  {
                    id: 'text-130',
                    type: 'prose',
                    markdown: 'QUIC (UDP), 0\\-RTT',
                  },
                ],
                [
                  {
                    id: 'text-131',
                    type: 'prose',
                    markdown: 'Современный',
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
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-132',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-133',
              blocks: [
                {
                  id: 'heading-134',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-135',
                  type: 'prose',
                  markdown:
                    '- Используйте HTTPS везде\n- Правильные HTTP методы (REST)\n- Осмысленные статус\\-коды\n- Настройте CORS корректно\n- Используйте кэширование\n- Добавьте Security Headers',
                },
              ],
            },
            {
              id: 'card-136',
              blocks: [
                {
                  id: 'heading-137',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-138',
                  type: 'prose',
                  markdown:
                    '- HTTP для чувствительных данных\n- GET для изменения данных\n- Игнорирование статус\\-кодов\n- Access\\-Control\\-Allow\\-Origin: \\*\n- Большие данные в URL\n- Mixed Content (HTTP \\+ HTTPS)',
                },
              ],
            },
            {
              id: 'card-139',
              blocks: [
                {
                  id: 'heading-140',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-141',
                  type: 'prose',
                  markdown:
                    '- Используйте HTTP/2 или HTTP/3\n- Настройте HSTS\n- Мониторьте статус\\-коды\n- Логируйте запросы\n- Тестируйте CORS\n- Изучите DevTools Network',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Итог',
      blocks: [
        {
          id: 'text-142',
          type: 'prose',
          markdown:
            '**HTTP** — основа веб\\-коммуникации. Понимание методов (GET, POST, PUT, DELETE), заголовков (Content\\-Type, Authorization, CORS), статус\\-кодов (200, 404, 500), перенаправлений (301, 302, 307) и разницы между HTTP/HTTPS критически важно для веб\\-разработчика. HTTPS обязателен для безопасности. CORS решает проблему межсайтовых запросов. HTTP/2 и HTTP/3 улучшают производительность.',
        },
        {
          id: 'resources-143',
          type: 'resources',
          items: [
            {
              id: 'link-144',
              label: 'MDN HTTP',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
            },
          ],
        },
        {
          id: 'resources-145',
          type: 'resources',
          items: [
            {
              id: 'link-146',
              label: 'HTTP Status Codes',
              url: 'https://httpstatuses.com/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
