import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-xss-csrf-xssexamplesnippet.txt?raw'
import example2 from '../snippets/web/web-xss-csrf-xsspreventionsnippet.txt?raw'
import example3 from '../snippets/web/web-xss-csrf-csrfexamplesnippet.txt?raw'
import example4 from '../snippets/web/web-xss-csrf-csrfpreventionsnippet.txt?raw'
import example5 from '../snippets/web/web-xss-csrf-securityheaderssnippet.txt?raw'
import example6 from '../snippets/web/web-xss-csrf-detectiontoolssnippet.txt?raw'
import example7 from '../snippets/web/web-xss-csrf-realworldexamplesnippet.txt?raw'

// Content copied verbatim from src/views/web/XSSAndCSRF.vue.
export default {
  ...articleSummaries.webXSSAndCSRF,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**XSS (Cross\\-Site Scripting)** и **CSRF (Cross\\-Site Request Forgery)** — две наиболее распространенные уязвимости веб\\-приложений. XSS позволяет внедрить вредоносный код на страницу, а CSRF — выполнить действия от имени пользователя без его ведома. Понимание различий и методов защиты критически важно для безопасности приложений.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые различия XSS и CSRF',
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
              label: 'XSS',
            },
            {
              id: 'column-3',
              label: 'CSRF',
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
                    markdown: '**Цель атаки**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Внедрение вредоносного кода',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Выполнение действий от имени пользователя',
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
                    markdown: '**Атакуемая сторона**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Клиент (браузер пользователя)',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Сервер (через браузер пользователя)',
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
                    markdown: '**Требуется авторизация**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Да (использует активную сессию)',
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
                    markdown: '**Метод атаки**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'JavaScript инъекция',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Подделка HTTP запроса',
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
                    markdown: '**Защита**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Санитизация, CSP, экранирование',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'CSRF токены, SameSite cookies',
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
      title: 'XSS (Cross-Site Scripting)',
      blocks: [
        {
          id: 'cards-18',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'heading-20',
                  type: 'heading',
                  level: 3,
                  text: 'Reflected XSS',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    'Вредоносный код в URL параметрах немедленно отражается на странице. Требует перехода по специальной ссылке.',
                },
              ],
            },
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'Stored XSS',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    'Вредоносный код сохраняется в БД и выполняется у всех пользователей, просматривающих зараженный контент.',
                },
              ],
            },
            {
              id: 'card-25',
              blocks: [
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 3,
                  text: 'DOM-based XSS',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    'Уязвимость в клиентском JavaScript коде, манипулирующем DOM. Серверная сторона не задействована.',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-28',
          type: 'heading',
          level: 3,
          text: '❌ Примеры XSS уязвимостей',
        },
        {
          id: 'callout-29',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-30',
              type: 'prose',
              markdown:
                '**Опасно:** Никогда не вставляйте пользовательский ввод напрямую в HTML без санитизации!',
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-32',
          type: 'heading',
          level: 3,
          text: '✅ Защита от XSS атак',
        },
        {
          id: 'callout-33',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-34',
              type: 'prose',
              markdown:
                '**Правильно:** Всегда экранируйте пользовательский ввод и используйте CSP заголовки',
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'CSRF (Cross-Site Request Forgery)',
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
                  text: 'Как работает CSRF',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '1. Пользователь авторизован на сайте bank.com\n2. Пользователь посещает вредоносный сайт attacker.com\n3. Attacker.com отправляет запрос на bank.com\n4. Браузер автоматически добавляет cookies\n5. Сервер выполняет действие от имени пользователя',
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
                  text: 'Угрозы CSRF',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- Перевод денег\n- Изменение пароля/email\n- Удаление аккаунта\n- Изменение настроек\n- Публикация контента\n- Подписка на рассылки',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-43',
          type: 'heading',
          level: 3,
          text: '❌ Примеры CSRF атак',
        },
        {
          id: 'callout-44',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-45',
              type: 'prose',
              markdown: '**Опасно:** Важные действия без проверки origin запроса уязвимы для CSRF!',
            },
          ],
        },
        {
          id: 'code-46',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-47',
          type: 'heading',
          level: 3,
          text: '✅ Защита от CSRF атак',
        },
        {
          id: 'callout-48',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-49',
              type: 'prose',
              markdown: '**Правильно:** Используйте CSRF токены и SameSite cookie атрибут',
            },
          ],
        },
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Безопасные HTTP заголовки',
      blocks: [
        {
          id: 'text-51',
          type: 'prose',
          markdown:
            'Правильная настройка HTTP заголовков критична для защиты от XSS, CSRF и других атак.',
        },
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение безопасных заголовков',
      blocks: [
        {
          id: 'table-53',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Заголовок',
            },
            {
              id: 'column-2',
              label: 'Защита от',
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
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`Content-Security-Policy`',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'XSS',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Контролирует источники загрузки ресурсов',
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
                    markdown: '`X-Frame-Options`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Clickjacking, некоторые CSRF',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Запрещает отображение сайта во фреймах',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '`X-Content-Type-Options`',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'XSS',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Запрещает MIME\\-sniffing',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '`Referrer-Policy`',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Утечка данных',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Контролирует передачу Referer заголовка',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '`Strict-Transport-Security`',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'MITM атаки',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Принудительное использование HTTPS',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`Permissions-Policy`',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Различные угрозы',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Контроль доступа к browser API',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Инструменты обнаружения и предотвращения',
      blocks: [
        {
          id: 'code-72',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнение инструментов',
      blocks: [
        {
          id: 'cards-73',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-74',
              title: 'Статический анализ',
              blocks: [
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- **ESLint** — анализ кода\n- **SonarQube** — комплексный анализ\n- **Semgrep** — поиск паттернов\n- **CodeQL** — GitHub анализ',
                },
              ],
            },
            {
              id: 'card-76',
              title: 'Динамическое тестирование',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- **OWASP ZAP** — сканер уязвимостей\n- **Burp Suite** — пентест платформа\n- **Acunetix** — веб\\-сканер\n- **Netsparker** — автоматизация',
                },
              ],
            },
            {
              id: 'card-78',
              title: 'Runtime защита',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- **DOMPurify** — санитизация HTML\n- **helmet.js** — безопасные заголовки\n- **csurf** — CSRF токены\n- **express\\-validator** — валидация',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Полный пример защищенного приложения',
      blocks: [
        {
          id: 'code-80',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-81',
          type: 'prose',
          markdown:
            '1. **В чем главное отличие XSS от CSRF?**\n   \n   XSS внедряет вредоносный код, который выполняется в браузере пользователя, атакуя клиента. CSRF подделывает запросы от имени авторизованного пользователя, атакуя сервер через браузер. XSS не требует авторизации, CSRF — требует активную сессию.\n2. **Какие типы XSS существуют и чем они отличаются?**\n   \n   **Reflected XSS** — код в URL, выполняется сразу. **Stored XSS** — код в БД, выполняется у всех пользователей. **DOM\\-based XSS** — уязвимость в клиентском JS, серверная сторона не задействована. Stored наиболее опасен из\\-за масштаба.\n3. **Как Content Security Policy защищает от XSS?**\n   \n   CSP контролирует источники, откуда можно загружать скрипты, стили и другие ресурсы. Это блокирует выполнение inline скриптов и загрузку с недоверенных доменов. Использование nonce или hash для разрешения конкретных скриптов.\n4. **Почему CSRF токены должны быть уникальными для каждой сессии?**\n   \n   Если токен предсказуем или одинаков для всех пользователей, атакующий может его узнать и использовать. Уникальность на сессию и непредсказуемость (криптографическая случайность) делают токен невозможным для подделки.\n5. **Что такое SameSite cookie и как это защищает от CSRF?**\n   \n   SameSite атрибут контролирует отправку cookies в cross\\-site запросах. `Strict` — cookies не отправляются вообще при переходе с других сайтов. `Lax` — отправляются только для безопасных методов (GET) при навигации. Это блокирует CSRF атаки автоматически.\n6. **Почему React и Vue защищают от XSS, но не на 100%?**\n   \n   Фреймворки автоматически экранируют вывод в шаблонах. Но `dangerouslySetInnerHTML` в React или `v-html` в Vue обходят защиту. Также уязвимы атрибуты `href="javascript:"` и некоторые event handlers.\n7. **Как тестировать приложение на XSS и CSRF?**\n   \n   **XSS:** OWASP ZAP, Burp Suite, ручные payload в формах/URL. Проверка CSP через DevTools. **CSRF:** попытка отправить запрос с другого домена без токена, проверка SameSite cookies. Автоматизация через Playwright/Cypress.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Чек-лист безопасности',
      blocks: [
        {
          id: 'cards-82',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-83',
              title: '✅ Защита от XSS',
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- ☑ Экранирование всего пользовательского ввода\n- ☑ Использование textContent вместо innerHTML\n- ☑ Настройка Content Security Policy\n- ☑ Санитизация HTML с DOMPurify\n- ☑ Валидация данных на сервере\n- ☑ X\\-Content\\-Type\\-Options: nosniff\n- ☑ Запрет dangerouslySetInnerHTML в React\n- ☑ Регулярное тестирование на XSS',
                },
              ],
            },
            {
              id: 'card-85',
              title: '✅ Защита от CSRF',
              blocks: [
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- ☑ CSRF токены для state\\-changing операций\n- ☑ SameSite=Strict/Lax для cookies\n- ☑ Проверка Origin/Referer заголовков\n- ☑ Custom headers для API запросов\n- ☑ Double Submit Cookie Pattern\n- ☑ Re\\-authentication для критичных действий\n- ☑ X\\-Frame\\-Options для защиты от clickjacking\n- ☑ Регулярное тестирование на CSRF',
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
          id: 'text-87',
          type: 'prose',
          markdown:
            '**XSS и CSRF** — критические уязвимости веб\\-приложений. XSS внедряет вредоносный код через недостаточную санитизацию ввода, а CSRF выполняет действия от имени пользователя через подделку запросов. Защита требует комплексного подхода: экранирование и CSP для XSS, CSRF токены и SameSite cookies для CSRF, безопасные HTTP заголовки, регулярное тестирование и использование проверенных библиотек санитизации.',
        },
        {
          id: 'resources-88',
          type: 'resources',
          items: [
            {
              id: 'link-89',
              label: 'OWASP XSS',
              url: 'https://owasp.org/www-community/attacks/xss/',
            },
          ],
        },
        {
          id: 'resources-90',
          type: 'resources',
          items: [
            {
              id: 'link-91',
              label: 'OWASP CSRF',
              url: 'https://owasp.org/www-community/attacks/csrf',
            },
          ],
        },
        {
          id: 'resources-92',
          type: 'resources',
          items: [
            {
              id: 'link-93',
              label: 'OWASP Cheat Sheets',
              url: 'https://cheatsheetseries.owasp.org/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
