import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-oauth-info-basicflowsnippet.txt?raw'
import example2 from '../snippets/web/web-oauth-info-componentssnippet.txt?raw'
import example3 from '../snippets/web/web-oauth-info-granttypessnippet.txt?raw'
import example4 from '../snippets/web/web-oauth-info-tokentypessnippet.txt?raw'
import example5 from '../snippets/web/web-oauth-info-implementationsnippet.txt?raw'
import example6 from '../snippets/web/web-oauth-info-securitysnippet.txt?raw'
import example7 from '../snippets/web/web-oauth-info-uxsnippet.txt?raw'

// Content copied verbatim from src/views/web/OAuthInfo.vue.
export default {
  ...articleSummaries.webOAuthInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**OAuth 2.0** — это отраслевой стандарт протокола авторизации, который позволяет приложениям получать ограниченный доступ к ресурсам пользователя на другом сервисе без передачи пароля. Это основа для "Войти через Google/GitHub/Facebook" и многих современных API.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое OAuth и для чего он нужен?',
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
                  text: 'Основное назначение',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Делегирование доступа** без передачи пароля\n- **Single Sign\\-On (SSO)** — один вход на все сервисы\n- **Безопасный API доступ** через токены\n- **Ограниченные разрешения** (scopes)',
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
                    '- **Безопасность:** пароли не передаются\n- **Удобство:** быстрая регистрация/вход\n- **Контроль:** пользователь управляет доступом\n- **Стандартизация:** единый протокол',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Базовый процесс OAuth 2.0',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Архитектура OAuth: компоненты и взаимодействие',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Схема взаимодействия компонентов',
      blocks: [
        {
          id: 'cards-11',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-12',
              blocks: [
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown: 'Resource Owner',
                },
                {
                  id: 'break-14',
                  type: 'line-break',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: '(Пользователь)',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: 'Client',
                },
                {
                  id: 'break-17',
                  type: 'line-break',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown: '(Ваше приложение)',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Authorization Server',
                },
                {
                  id: 'break-20',
                  type: 'line-break',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: '(OAuth провайдер)',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown: 'Resource Server',
                },
                {
                  id: 'break-23',
                  type: 'line-break',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: '(API с данными)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Типы грантов (Grant Types)',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение Grant Types',
      blocks: [
        {
          id: 'table-26',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Grant Type',
            },
            {
              id: 'column-2',
              label: 'Использование',
            },
            {
              id: 'column-3',
              label: 'Безопасность',
            },
            {
              id: 'column-4',
              label: 'Client Secret',
            },
            {
              id: 'column-5',
              label: 'Рекомендация',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Authorization Code**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Web приложения с backend',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '✅ Рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**Auth Code \\+ PKCE**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'SPA, мобильные приложения',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '✅ Рекомендуется для SPA',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Implicit**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '⭐',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '❌ Deprecated',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Client Credentials**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Server\\-to\\-server',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '✅ Для сервисов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Password**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Legacy / first\\-party only',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Да',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '⚠️ Не рекомендуется',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Типы токенов',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Инструменты и библиотеки для реализации',
      blocks: [
        {
          id: 'code-53',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Популярные библиотеки и сервисы',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: 'Managed сервисы (Рекомендуется)',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- **Auth0** — enterprise, много фич\n- **Supabase Auth** — open source, простой\n- **Firebase Auth** — Google ecosystem\n- **Clerk** — современный UX\n- **AWS Cognito** — AWS интеграция',
                },
              ],
            },
            {
              id: 'card-57',
              title: 'Self-hosted библиотеки',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- **NextAuth.js** — для Next.js\n- **Passport.js** — Node.js\n- **SimpleLogin** — Python/Flask\n- **Keycloak** — Java, enterprise\n- **ORY** — Go, cloud\\-native',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Безопасность OAuth',
      blocks: [
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Чек-лист безопасности',
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
                  text: '✅ Обязательно',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Используйте HTTPS везде\n- Валидируйте redirect\\_uri\n- Используйте state для CSRF\n- PKCE для SPA\n- httpOnly cookies для токенов\n- Короткий lifetime для access\\_token',
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
                  text: '❌ Никогда',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- localStorage для токенов\n- Токены в URL\n- Client secret в frontend\n- Implicit flow\n- Игнорирование state\n- Вечные токены',
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
                  text: '💡 Дополнительно',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Refresh token rotation\n- Token introspection\n- Rate limiting\n- Anomaly detection\n- Audit logging\n- MFA опционально',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Влияние OAuth на пользовательский опыт',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '1. **В чем разница между OAuth и OpenID Connect?**\n   \n   OAuth 2.0 — это протокол **авторизации** (получение доступа к ресурсам). OpenID Connect (OIDC) — это слой **аутентификации** поверх OAuth 2.0, который добавляет ID Token с информацией о пользователе. OIDC = OAuth 2.0 \\+ идентификация пользователя.\n2. **Почему нельзя хранить access\\_token в localStorage?**\n   \n   localStorage доступен из JavaScript, что делает его уязвимым к XSS атакам. Злоумышленник может внедрить скрипт и украсть токен. Используйте httpOnly cookies или memory storage.\n3. **Что такое PKCE и зачем он нужен?**\n   \n   PKCE (Proof Key for Code Exchange) защищает от перехвата authorization code. Обязателен для SPA и мобильных приложений, где нельзя безопасно хранить client\\_secret. Работает через code\\_verifier и code\\_challenge.\n4. **Как работает refresh token rotation?**\n   \n   При каждом использовании refresh\\_token сервер выдает новый refresh\\_token и инвалидирует старый. Это позволяет обнаружить кражу токена: если украденный токен используется после настоящего, оба токена инвалидируются и пользователь выходит из системы.\n5. **Какой grant type использовать для React SPA?**\n   \n   **Authorization Code Flow \\+ PKCE**. Это самый безопасный вариант для SPA. Implicit Flow deprecated и небезопасен. PKCE заменяет необходимость в client\\_secret.\n6. **Как реализовать OAuth без готовых библиотек?**\n   \n   Не рекомендуется для production. OAuth сложен, легко допустить ошибки безопасности. Используйте проверенные библиотеки (Auth0, Supabase, NextAuth.js). Для обучения можно реализовать базовый flow, но помните о всех нюансах безопасности.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-72',
          type: 'prose',
          markdown:
            '**OAuth 2.0** — это современный стандарт безопасной авторизации, который позволяет приложениям получать доступ к ресурсам пользователя без передачи паролей. Ключевые компоненты: Resource Owner, Client, Authorization Server, Resource Server. Для SPA используйте **Authorization Code \\+ PKCE**, для backend — **Authorization Code Flow**. Токены храните в **httpOnly cookies или memory**, никогда в localStorage. Используйте готовые решения (Auth0, Supabase) для упрощения реализации и повышения безопасности.',
        },
        {
          id: 'resources-73',
          type: 'resources',
          items: [
            {
              id: 'link-74',
              label: 'OAuth 2.0 Spec',
              url: 'https://oauth.net/2/',
            },
          ],
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Auth0 Guide',
              url: 'https://auth0.com/docs/get-started/authentication-and-authorization-flow',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
