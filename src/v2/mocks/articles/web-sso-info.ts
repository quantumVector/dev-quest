import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-sso-info-ssobasicsnippet.txt?raw'
import example2 from '../snippets/web/web-sso-info-samlflowsnippet.txt?raw'
import example3 from '../snippets/web/web-sso-info-oidcflowsnippet.txt?raw'
import example4 from '../snippets/web/web-sso-info-casflowsnippet.txt?raw'
import example5 from '../snippets/web/web-sso-info-practicalexamplesnippet.txt?raw'
import example6 from '../snippets/web/web-sso-info-securitysnippet.txt?raw'

// Content copied verbatim from src/views/web/SSOInfo.vue.
export default {
  ...articleSummaries.webSSOInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Single Sign\\-On (SSO)** — это механизм аутентификации, который позволяет пользователю войти в систему один раз и автоматически получить доступ к множеству связанных приложений без повторного ввода учетных данных. SSO упрощает управление доступом и улучшает пользовательский опыт.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое SSO?',
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
                  text: 'Основная идея',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Один вход** для всех приложений\n- **Централизованная** аутентификация\n- **Единая точка** управления доступом\n- **Автоматическая** авторизация\n- **Общая сессия** между приложениями',
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
                  text: 'Компоненты системы',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Identity Provider (IdP)** — сервер аутентификации\n- **Service Provider (SP)** — приложения\n- **User Agent** — браузер пользователя\n- **Trust Relationship** — доверие между IdP и SP\n- **Assertions/Tokens** — доказательства аутентификации',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Как работает SSO: Базовый процесс',
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
      title: 'Схема работы SSO',
      blocks: [
        {
          id: 'steps-10',
          type: 'steps',
          mode: 'sequence',
          showTitle: false,
          items: [
            {
              id: 'step-11',
              title: 'Попытка доступа',
              blocks: [],
            },
            {
              id: 'step-12',
              title: 'Проверка сессии',
              blocks: [],
            },
            {
              id: 'step-13',
              title: 'Аутентификация',
              blocks: [],
            },
            {
              id: 'step-14',
              title: 'Выдача токена',
              blocks: [],
            },
            {
              id: 'step-15',
              title: 'Авторизация',
              blocks: [],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Популярные протоколы SSO',
      blocks: [
        {
          id: 'cards-16',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'SAML 2.0',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    '- **XML\\-based** протокол\n- **Enterprise** стандарт\n- **Сложная** настройка\n- **Assertions** для передачи данных\n- **Популярен** в корпоративном секторе',
                },
              ],
            },
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: 'OpenID Connect',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- **JSON/REST** протокол\n- **Современный** стандарт\n- **Простая** интеграция\n- **JWT токены**\n- **Поверх OAuth 2.0**',
                },
              ],
            },
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'CAS',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- **Ticket\\-based** система\n- **Простой** протокол\n- **Легкая** настройка\n- **Популярен** в образовании\n- **Open source** решения',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'SAML 2.0 — Enterprise протокол',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'OpenID Connect — Современный подход',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'CAS — Простой и эффективный',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практический пример: React с OIDC',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Преимущества SSO',
      blocks: [
        {
          id: 'cards-30',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-31',
              blocks: [
                {
                  id: 'heading-32',
                  type: 'heading',
                  level: 3,
                  text: 'Для пользователей',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    '- **Один пароль** вместо десятков\n- **Быстрый доступ** к приложениям\n- **Меньше забытых паролей**\n- **Удобство** использования\n- **Единый профиль** пользователя\n- **Seamless experience** между приложениями',
                },
              ],
            },
            {
              id: 'card-34',
              blocks: [
                {
                  id: 'heading-35',
                  type: 'heading',
                  level: 3,
                  text: 'Для владельцев',
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- **Централизованное** управление доступом\n- **Снижение нагрузки** на поддержку\n- **Улучшенная безопасность**\n- **Единая точка** аудита\n- **Соответствие** compliance требованиям\n- **Быстрое отключение** доступа при увольнении',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Безопасность в SSO',
      blocks: [
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Сравнение протоколов SSO',
      blocks: [
        {
          id: 'table-38',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'SAML 2.0',
            },
            {
              id: 'column-3',
              label: 'OpenID Connect',
            },
            {
              id: 'column-4',
              label: 'CAS',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Формат данных**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'XML',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'JSON/JWT',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Tickets (простой текст)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Мобильные приложения**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Плохо подходит',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Отлично',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Средне',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**API доступ**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Не подходит',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Отлично (OAuth 2.0)',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Ограничено',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Популярность**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Enterprise',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Современные приложения',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Образование, университеты',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Поддержка браузеров**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Отличная',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-63',
          type: 'prose',
          markdown:
            '1. **В чем разница между аутентификацией и авторизацией в SSO?**\n   \n   **Аутентификация** — проверка личности пользователя (кто вы?). Выполняется один раз на Identity Provider. **Авторизация** — проверка прав доступа (что вам разрешено?). Выполняется каждым приложением на основе токена/assertion от IdP.\n2. **Как SSO влияет на безопасность?**\n   \n   SSO улучшает безопасность через централизованное управление, MFA, единую точку аудита. Но создает single point of failure — компрометация SSO аккаунта дает доступ ко всем приложениям. Важны: сильная аутентификация, мониторинг, своевременное отзыв доступа.\n3. **Что такое SLO (Single Logout)?**\n   \n   Single Logout — выход из всех приложений одновременно. Когда пользователь выходит из одного приложения, IdP отправляет запросы на выход всем остальным Service Providers. Это сложнее реализовать, чем SSO, так как требует обратной связи со всеми приложениями.\n4. **Чем OpenID Connect отличается от OAuth 2.0?**\n   \n   OAuth 2.0 — протокол авторизации (делегирование доступа). OpenID Connect — слой аутентификации поверх OAuth 2.0. OIDC добавляет ID Token (JWT) с информацией о пользователе, стандартизированные endpoints для получения данных профиля, и фреймворк для SSO.\n5. **Что такое PKCE и зачем он нужен?**\n   \n   PKCE (Proof Key for Code Exchange) — расширение OAuth 2.0 для защиты публичных клиентов (SPA, мобильные приложения) от перехвата authorization code. Клиент генерирует случайный code\\_verifier, отправляет его хэш (code\\_challenge) при авторизации, и сам verifier при обмене code на токен. Защищает даже если code перехвачен.\n6. **Как реализовать SSO между приложениями на разных доменах?**\n   \n   Используются протоколы SSO (SAML, OIDC, CAS), которые работают через редиректы и не зависят от домена. IdP может быть на своем домене, приложения — на разных. Токены/assertions передаются через URL parameters или POST requests. Cookies IdP работают только для его домена, но токены валидны для всех доверенных приложений.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Популярные SSO решения',
      blocks: [
        {
          id: 'cards-64',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-65',
              title: 'Enterprise',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- **Okta** — облачный IdP\n- **Azure AD** — Microsoft\n- **Auth0** — developer\\-friendly\n- **OneLogin** — enterprise SSO\n- **Ping Identity** — enterprise',
                },
              ],
            },
            {
              id: 'card-67',
              title: 'Open Source',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- **Keycloak** — Red Hat\n- **Apereo CAS** — CAS протокол\n- **Shibboleth** — SAML IdP\n- **Gluu** — enterprise IdP\n- **WSO2 Identity Server**',
                },
              ],
            },
            {
              id: 'card-69',
              title: 'Social Login',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- **Google Identity** — OIDC\n- **Facebook Login** — OAuth\n- **GitHub OAuth**\n- **Apple Sign In**\n- **LinkedIn OAuth**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
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
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Использовать HTTPS везде\n- Включить MFA (2FA)\n- Валидировать все токены\n- Использовать PKCE для SPA\n- Короткий срок жизни токенов\n- Логировать все аутентификации\n- Регулярно ротировать ключи',
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
                    '- Хранение токенов в localStorage (для чувствительных данных)\n- Долгоживущие access tokens\n- Игнорирование валидации state\n- Отсутствие CSRF защиты\n- Передача токенов в URL\n- Самописные crypto алгоритмы',
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
                    '- Используйте готовые библиотеки\n- Тестируйте SLO процесс\n- Мониторьте подозрительную активность\n- Документируйте интеграции\n- Настройте автоматическое обновление токенов\n- Планируйте отзыв доступа',
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
          id: 'text-81',
          type: 'prose',
          markdown:
            '**SSO (Single Sign\\-On)** — это механизм централизованной аутентификации, позволяющий пользователю войти один раз и получить доступ к множеству приложений. Основные протоколы: **SAML 2.0** (enterprise, XML\\-based), **OpenID Connect** (современный, JSON/JWT), **CAS** (простой, ticket\\-based). SSO улучшает UX и безопасность, но требует тщательной реализации защитных механизмов (PKCE, state validation, token security). Процесс включает: редирект на IdP → аутентификацию → получение токена → валидацию → авторизацию.',
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'OpenID Connect',
              url: 'https://openid.net/connect/',
            },
          ],
        },
        {
          id: 'resources-84',
          type: 'resources',
          items: [
            {
              id: 'link-85',
              label: 'SAML 2.0',
              url: 'http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
