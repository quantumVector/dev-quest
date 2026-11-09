import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-jwt-info-jwtstructuresnippet.txt?raw'
import example2 from '../snippets/web/web-jwt-info-standardclaimssnippet.txt?raw'
import example3 from '../snippets/web/web-jwt-info-creatingjwtsnippet.txt?raw'
import example4 from '../snippets/web/web-jwt-info-verifyingjwtsnippet.txt?raw'
import example5 from '../snippets/web/web-jwt-info-clientsidesnippet.txt?raw'
import example6 from '../snippets/web/web-jwt-info-securitysnippet.txt?raw'
import example7 from '../snippets/web/web-jwt-info-algorithmssnippet.txt?raw'
import example8 from '../snippets/web/web-jwt-info-jwtvssessionsnippet.txt?raw'
import example9 from '../snippets/web/web-jwt-info-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/web/JWTInfo.vue.
export default {
  ...articleSummaries.webJWTInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**JWT (JSON Web Token)** — это открытый стандарт (RFC 7519) для безопасной передачи информации между сторонами в виде JSON\\-объекта. JWT используется для аутентификации и авторизации, позволяя передавать подписанные данные, которые можно проверить на достоверность.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое JWT и зачем он нужен?',
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
                  text: 'Основные цели',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Аутентификация** — подтверждение личности пользователя\n- **Авторизация** — предоставление доступа к ресурсам\n- **Обмен данными** — безопасная передача информации\n- **Stateless** — сервер не хранит состояние сессии',
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
                    '- **Компактный** — передается в URL, заголовках\n- **Самодостаточный** — содержит все данные\n- **Кроссплатформенный** — работает везде\n- **Масштабируемый** — не требует серверной памяти',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Структура JWT токена',
      blocks: [
        {
          id: 'text-9',
          type: 'prose',
          markdown: 'JWT состоит из трех частей, разделенных точками: `HEADER.PAYLOAD.SIGNATURE`',
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Компоненты JWT',
      blocks: [
        {
          id: 'table-11',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Компонент',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Формат',
            },
            {
              id: 'column-4',
              label: 'Назначение',
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
                    markdown: '**Header**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Метаданные о токене',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Base64Url(JSON)',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Алгоритм подписи, тип токена',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**Payload**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Данные пользователя (claims)',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Base64Url(JSON)',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'ID пользователя, роли, время истечения',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '**Signature**',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Криптографическая подпись',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Base64Url(hash)',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Проверка подлинности и целостности',
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
      title: 'Стандартные claims (заявления)',
      blocks: [
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Механизм работы JWT аутентификации',
      blocks: [
        {
          id: 'cards-25',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: '1. Логин',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: 'Пользователь отправляет логин и пароль на сервер (POST /auth/login)',
                },
              ],
            },
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: '2. Генерация токена',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Сервер проверяет данные и генерирует JWT с подписью секретным ключом',
                },
              ],
            },
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: '3. Сохранение',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown: 'Клиент сохраняет токен (в памяти, localStorage или HttpOnly cookie)',
                },
              ],
            },
            {
              id: 'card-35',
              blocks: [
                {
                  id: 'heading-36',
                  type: 'heading',
                  level: 3,
                  text: '4. Использование',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    'Токен отправляется с каждым запросом в заголовке Authorization: Bearer TOKEN',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Создание JWT на сервере',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Проверка JWT на сервере',
      blocks: [
        {
          id: 'code-39',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Работа с JWT на клиенте',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Безопасное хранение и передача JWT',
      blocks: [
        {
          id: 'callout-41',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-42',
              type: 'prose',
              markdown:
                '**Критически важно:** Выбор способа хранения токенов влияет на безопасность всего приложения!',
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Сравнение способов хранения',
      blocks: [
        {
          id: 'table-44',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Способ',
            },
            {
              id: 'column-2',
              label: 'XSS атаки',
            },
            {
              id: 'column-3',
              label: 'CSRF атаки',
            },
            {
              id: 'column-4',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**localStorage**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '❌ Уязвим',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '✅ Защищен',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Не рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**sessionStorage**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '❌ Уязвим',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '✅ Защищен',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Не рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**HttpOnly Cookie**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '✅ Защищен',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '⚠️ Требует CSRF защиты',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Рекомендуется',
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
                    markdown: '**Memory (переменная)**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '✅ Защищен',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '✅ Защищен',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Лучший вариант',
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
      title: 'Алгоритмы подписи JWT',
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
      id: 'section-12',
      title: 'Сравнение алгоритмов',
      blocks: [
        {
          id: 'table-62',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Алгоритм',
            },
            {
              id: 'column-2',
              label: 'Тип',
            },
            {
              id: 'column-3',
              label: 'Безопасность',
            },
            {
              id: 'column-4',
              label: 'Скорость',
            },
            {
              id: 'column-5',
              label: 'Применение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**HS256**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Симметричный',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Быстрый',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Монолитные приложения',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**HS512**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Симметричный',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Быстрый',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Повышенная безопасность',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**RS256**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Асимметричный',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Медленный',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Микросервисы, OAuth',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '**ES256**',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Асимметричный',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Быстрый',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Современные приложения',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '**none**',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Без подписи',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Отсутствует',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Мгновенный',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '❌ Никогда не используйте!',
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
      title: 'JWT vs Session-based аутентификация',
      blocks: [
        {
          id: 'code-88',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Когда использовать JWT vs Sessions',
      blocks: [
        {
          id: 'cards-89',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-90',
              title: '✅ JWT лучше для:',
              blocks: [
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- **Микросервисов** — stateless архитектура\n- **API** — RESTful сервисы\n- **Мобильных app** — нет cookies\n- **SPA** — Single Page Applications\n- **OAuth/SSO** — федеративная аутентификация\n- **Масштабирования** — нет серверного состояния',
                },
              ],
            },
            {
              id: 'card-92',
              title: '✅ Sessions лучше для:',
              blocks: [
                {
                  id: 'text-93',
                  type: 'prose',
                  markdown:
                    '- **Традиционных web\\-app** — server\\-side rendering\n- **Мгновенной инвалидации** — нужен logout\n- **Чувствительных данных** — финансы, здравоохранение\n- **Длительных сессий** — недели/месяцы\n- **Простоты** — меньше кода на клиенте\n- **Централизованного контроля** — все на сервере',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Лучшие практики JWT',
      blocks: [
        {
          id: 'code-94',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-95',
          type: 'prose',
          markdown:
            '1. **Что такое JWT и из каких частей он состоит?**\n   \n   JWT (JSON Web Token) — стандарт передачи данных в формате JSON. Состоит из трех частей: **Header** (алгоритм и тип), **Payload** (данные пользователя/claims), **Signature** (криптографическая подпись для проверки целостности). Части разделяются точками и кодируются в Base64Url.\n2. **Как работает механизм аутентификации с JWT?**\n   \n   1\\) Пользователь отправляет credentials на сервер. 2) Сервер проверяет данные и генерирует JWT с подписью. 3) Клиент сохраняет токен. 4) При каждом запросе токен отправляется в заголовке Authorization. 5) Сервер проверяет подпись и извлекает данные из payload.\n3. **Чем JWT отличается от session\\-based аутентификации?**\n   \n   **JWT:** stateless (данные в токене), масштабируется легко, но сложнее отозвать. **Sessions:** stateful (данные на сервере), легко инвалидировать, но требует общее хранилище (Redis) для масштабирования. JWT лучше для API и микросервисов, sessions — для традиционных web\\-приложений.\n4. **Где безопаснее хранить JWT на клиенте?**\n   \n   **Лучший вариант:** Access token в памяти (переменная), refresh token в HttpOnly cookie с SameSite=strict. **Избегать:** localStorage/sessionStorage (уязвимы к XSS). **Альтернатива:** оба токена в HttpOnly cookies с CSRF защитой.\n5. **Какую роль играют алгоритмы подписи в JWT?**\n   \n   Алгоритмы обеспечивают целостность и подлинность токена. **Симметричные** (HS256): один секретный ключ, быстрые, для монолитов. **Асимметричные** (RS256, ES256): приватный ключ для подписи, публичный для проверки, для микросервисов. Всегда явно указывайте алгоритм при проверке!\n6. **Как обеспечить безопасность JWT?**\n   \n   1\\) Короткий срок жизни access token (15 мин). 2) Refresh token для обновления. 3) HTTPS только. 4) HttpOnly cookies или память. 5) Проверка алгоритма подписи. 6) Минимальный payload. 7) Blacklist для отзыва. 8) Сильные секретные ключи. 9) Rate limiting на login/refresh endpoints.\n7. **Как отозвать JWT токен?**\n   \n   JWT нельзя отозвать напрямую (stateless). Решения: 1) **Blacklist** в Redis — храним отозванные токены до истечения. 2) **Короткий срок жизни** — токен истекает быстро. 3) **Версионирование** — добавляем версию в payload, инкрементируем при logout. 4) **Whitelist refresh токенов** — храним только валидные refresh токены.',
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Распространенные уязвимости и защита',
      blocks: [
        {
          id: 'cards-96',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-97',
              blocks: [
                {
                  id: 'heading-98',
                  type: 'heading',
                  level: 3,
                  text: 'Уязвимости',
                },
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    '- **XSS** — кража токена из localStorage\n- **CSRF** — подделка запросов с cookies\n- **Algorithm confusion** — подмена алгоритма\n- **Weak secrets** — слабые ключи\n- **Token replay** — повторное использование\n- **JWT in URL** — утечка в логах',
                },
              ],
            },
            {
              id: 'card-100',
              blocks: [
                {
                  id: 'heading-101',
                  type: 'heading',
                  level: 3,
                  text: 'Защита',
                },
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    '- HttpOnly cookies или memory storage\n- SameSite=strict для cookies\n- Явная проверка алгоритма\n- Криптографически стойкие ключи 256\\+ бит\n- Короткий срок жизни \\+ blacklist\n- Только в заголовках, не в URL',
                },
              ],
            },
            {
              id: 'card-103',
              blocks: [
                {
                  id: 'heading-104',
                  type: 'heading',
                  level: 3,
                  text: 'Мониторинг',
                },
                {
                  id: 'text-105',
                  type: 'prose',
                  markdown:
                    '- Логирование неудачных попыток\n- Rate limiting на auth endpoints\n- Аномалии в использовании токенов\n- Геолокация и IP проверка\n- Автоматическая блокировка при атаках\n- Регулярный аудит безопасности',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Итог',
      blocks: [
        {
          id: 'text-106',
          type: 'prose',
          markdown:
            '**JWT** — это мощный инструмент для stateless аутентификации, идеально подходящий для современных API и микросервисов. Токен состоит из Header, Payload и Signature, обеспечивающей целостность. **Ключевые принципы безопасности:** короткий срок жизни access токена, безопасное хранение (HttpOnly cookies или память), использование refresh токенов, HTTPS, явная проверка алгоритма подписи. JWT отличается от sessions отсутствием серверного состояния, что упрощает масштабирование, но усложняет отзыв токенов. Правильная реализация JWT требует понимания всех аспектов безопасности и выбора подходящих алгоритмов подписи для конкретного сценария.',
        },
        {
          id: 'resources-107',
          type: 'resources',
          items: [
            {
              id: 'link-108',
              label: 'JWT.io Debugger',
              url: 'https://jwt.io/',
            },
          ],
        },
        {
          id: 'resources-109',
          type: 'resources',
          items: [
            {
              id: 'link-110',
              label: 'RFC 7519 Spec',
              url: 'https://datatracker.ietf.org/doc/html/rfc7519',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
