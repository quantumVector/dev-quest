import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-cookie-cookiebasicssnippet.txt?raw'
import example2 from '../snippets/web/web-cookie-clientsidesnippet.txt?raw'
import example3 from '../snippets/web/web-cookie-readdeletecookiesnippet.txt?raw'
import example4 from '../snippets/web/web-cookie-serversidesnippet.txt?raw'
import example5 from '../snippets/web/web-cookie-serversideheaderssnippet.txt?raw'
import example6 from '../snippets/web/web-cookie-cookieattributessnippet.txt?raw'
import example7 from '../snippets/web/web-cookie-samesiteexamplessnippet.txt?raw'
import example8 from '../snippets/web/web-cookie-securitysnippet.txt?raw'
import example9 from '../snippets/web/web-cookie-cookiehelpersnippet.txt?raw'
import example10 from '../snippets/web/web-cookie-gdprsnippet.txt?raw'

// Content copied verbatim from src/views/web/CookieInfo.vue.
export default {
  ...articleSummaries.webCookieInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Cookie (куки)** — это небольшие фрагменты текстовых данных (до 4KB), которые веб\\-сервер отправляет браузеру, а браузер сохраняет на компьютере пользователя и автоматически отправляет обратно серверу с каждым последующим HTTP\\-запросом. Cookies позволяют серверу "запоминать" состояние между запросами, несмотря на то, что HTTP протокол не сохраняет состояние.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое Cookie и зачем они нужны?',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основные характеристики Cookie',
      blocks: [
        {
          id: 'cards-3',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-4',
              blocks: [
                {
                  id: 'heading-5',
                  type: 'heading',
                  level: 3,
                  text: 'Хранение',
                },
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown:
                    '- **До 4096 байт** на cookie\n- **~20 cookies** на домен\n- **~300 cookies** всего\n- Хранятся в браузере\n- Могут иметь срок истечения',
                },
              ],
            },
            {
              id: 'card-7',
              blocks: [
                {
                  id: 'heading-8',
                  type: 'heading',
                  level: 3,
                  text: 'Передача',
                },
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    '- **Автоматически** с каждым запросом\n- В HTTP заголовке `Cookie:`\n- Только на тот же домен\n- Можно ограничить по пути\n- HTTPS через `Secure`',
                },
              ],
            },
            {
              id: 'card-10',
              blocks: [
                {
                  id: 'heading-11',
                  type: 'heading',
                  level: 3,
                  text: 'Безопасность',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    '- `HttpOnly` \\- защита от XSS\n- `Secure` \\- только HTTPS\n- `SameSite` \\- защита от CSRF\n- Подписанные cookies\n- Шифрование данных',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Что можно и нельзя хранить в Cookie',
      blocks: [
        {
          id: 'table-13',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип данных',
            },
            {
              id: 'column-2',
              label: 'Можно ли хранить?',
            },
            {
              id: 'column-3',
              label: 'Примеры',
            },
            {
              id: 'column-4',
              label: 'Рекомендации',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '**Session ID**',
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
                    markdown: 'random\\-token\\-abc123',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'С HttpOnly \\+ Secure \\+ SameSite',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**JWT токены**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'eyJhbGc...',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'С HttpOnly \\+ Secure \\+ SameSite=Strict',
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
                    markdown: '**Настройки UI**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'theme=dark, lang=ru',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Некритичные данные, без Secure',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '**Analytics ID**',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '\\_ga=GA1.2.123',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'С SameSite=None для third\\-party',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Пароли**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '❌ Никогда!',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Используйте серверные сессии',
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
                    markdown: '**Платежные данные**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '❌ Никогда!',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'PCI DSS запрещает',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '**Персональные данные**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '❌ Крайне не рекомендуется',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'SSN, паспорт',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'GDPR нарушения',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Большие данные**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '&gt;4KB',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Используйте localStorage или сервер',
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
      title: 'Создание Cookie на стороне клиента',
      blocks: [
        {
          id: 'code-46',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'heading-47',
          type: 'heading',
          level: 3,
          text: 'Чтение и удаление Cookie',
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Создание Cookie на стороне сервера',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
        {
          id: 'heading-50',
          type: 'heading',
          level: 3,
          text: 'Set-Cookie заголовок (разные платформы)',
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Атрибуты Cookie и их влияние',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Таблица атрибутов Cookie',
      blocks: [
        {
          id: 'table-53',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Атрибут',
            },
            {
              id: 'column-2',
              label: 'Значения',
            },
            {
              id: 'column-3',
              label: 'Назначение',
            },
            {
              id: 'column-4',
              label: 'Обязательность',
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
                    markdown: '`expires`',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Дата UTC',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Дата истечения cookie',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Опционально (session cookie без него)',
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
                    markdown: '`Max-Age`',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Секунды',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Время жизни в секундах',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Опционально (приоритет над expires)',
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
                    markdown: '`Path`',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '/path',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'URL путь доступности',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'По умолчанию: текущий путь',
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
                    markdown: '`Domain`',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '.example.com',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Домен доступности',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'По умолчанию: текущий хост',
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
                    markdown: '`Secure`',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Флаг',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Только HTTPS',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Обязательно для токенов!**',
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
                    markdown: '`HttpOnly`',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Флаг',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Недоступна из JS',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**Обязательно для auth!**',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '`SameSite`',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Strict/Lax/None',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'CSRF защита',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '**Рекомендуется всегда!**',
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
      title: 'SameSite: детальное объяснение',
      blocks: [
        {
          id: 'code-82',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
        {
          id: 'heading-83',
          type: 'heading',
          level: 3,
          text: 'Сравнение SameSite режимов',
        },
        {
          id: 'table-84',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Strict',
            },
            {
              id: 'column-3',
              label: 'Lax (по умолчанию)',
            },
            {
              id: 'column-4',
              label: 'None',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Переход по ссылке (GET)',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-88',
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
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Форма POST с другого сайта',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'AJAX/Fetch запрос',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: 'Iframe с другого сайта',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: 'Навигация внутри сайта',
                  },
                ],
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: 'Требует Secure',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: 'Рекомендуется',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: 'Рекомендуется',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: '**Обязательно!**',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Безопасность Cookie',
      blocks: [
        {
          id: 'code-109',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Полезный класс для работы с Cookie',
      blocks: [
        {
          id: 'code-110',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'GDPR и Cookie Consent',
      blocks: [
        {
          id: 'code-111',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-112',
          type: 'prose',
          markdown:
            '1. **В чем разница между Cookie и LocalStorage?**\n   \n   Cookie автоматически отправляются с каждым HTTP\\-запросом, имеют размер до 4KB и срок истечения. LocalStorage не отправляется автоматически, имеет размер до 5\\-10MB, не имеет срока истечения, но доступен только из JavaScript. Cookie лучше для аутентификации, LocalStorage для локальных данных.\n2. **Зачем нужен атрибут HttpOnly?**\n   \n   HttpOnly делает cookie недоступной из JavaScript (document.cookie), что защищает от XSS\\-атак. Злоумышленник не сможет украсть токен через `document.cookie`, даже если внедрит свой скрипт. Обязательно для auth токенов и session ID!\n3. **Как работает SameSite=Lax против CSRF?**\n   \n   SameSite=Lax блокирует отправку cookie с POST\\-запросами с других сайтов, но разрешает при обычной навигации (GET по ссылке). Это предотвращает CSRF атаки через формы, но позволяет пользователю оставаться авторизованным при переходе по ссылкам.\n4. **Почему SameSite=None требует Secure?**\n   \n   Браузеры требуют Secure (HTTPS) для SameSite=None, чтобы предотвратить отправку cookies через незащищенное соединение при cross\\-site запросах. Это дополнительная мера безопасности для третьесторонних cookies (реклама, аналитика).\n5. **Как правильно хранить JWT в cookies?**\n   \n   JWT должен храниться с флагами: `HttpOnly` (защита от XSS), `Secure` (только HTTPS), `SameSite=Strict или Lax` (защита от CSRF). На сервере проверять подпись JWT и регенерировать токен после логина для защиты от Session Fixation.\n6. **В чем разница между expires и Max\\-Age?**\n   \n   `expires` указывает абсолютную дату истечения (может быть проблемой при разных часовых поясах). `Max-Age` указывает относительное время в секундах (более надежный подход). Max\\-Age имеет приоритет, если указаны оба атрибута.\n7. **Что такое signed cookies и зачем они нужны?**\n   \n   Signed cookies содержат криптографическую подпись на основе секретного ключа, что позволяет серверу проверить, что cookie не была изменена на клиенте. Это защищает от подделки данных (tampering), но НЕ шифрует содержимое cookie.\n8. **Какие категории cookies требуют согласия по GDPR?**\n   \n   Необходимые cookies (аутентификация, CSRF токены) НЕ требуют согласия. Функциональные, аналитические и рекламные cookies ТРЕБУЮТ явного согласия пользователя. Нужно показывать баннер согласия и позволять управлять категориями.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики безопасности',
      blocks: [
        {
          id: 'cards-113',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-114',
              blocks: [
                {
                  id: 'heading-115',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- HttpOnly \\+ Secure для auth\n- SameSite=Strict для критичных cookies\n- SameSite=Lax по умолчанию\n- Max\\-Age вместо expires\n- Регенерация session после login\n- Signed cookies для проверки целостности\n- HTTPS везде',
                },
              ],
            },
            {
              id: 'card-117',
              blocks: [
                {
                  id: 'heading-118',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-119',
                  type: 'prose',
                  markdown:
                    '- Хранение паролей в cookies\n- Персональные данные без шифрования\n- Большие объемы данных (&gt;4KB)\n- Cookies без Secure на production\n- Отсутствие HttpOnly для auth\n- SameSite=None без необходимости\n- Cookies на HTTP (незащищенном)',
                },
              ],
            },
            {
              id: 'card-120',
              blocks: [
                {
                  id: 'heading-121',
                  type: 'heading',
                  level: 3,
                  text: '💡 Рекомендации',
                },
                {
                  id: 'text-122',
                  type: 'prose',
                  markdown:
                    '- Минимизируйте размер cookies\n- Используйте Path для изоляции\n- Мониторьте истечение токенов\n- Реализуйте GDPR consent\n- Тестируйте SameSite поведение\n- Документируйте политику cookies\n- Регулярный аудит безопасности',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Cookie vs LocalStorage vs SessionStorage',
      blocks: [
        {
          id: 'table-123',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Cookie',
            },
            {
              id: 'column-3',
              label: 'LocalStorage',
            },
            {
              id: 'column-4',
              label: 'SessionStorage',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '**Размер**',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: '~4KB',
                  },
                ],
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: '5\\-10MB',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown: '5\\-10MB',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-128',
                    type: 'prose',
                    markdown: '**Время жизни**',
                  },
                ],
                [
                  {
                    id: 'text-129',
                    type: 'prose',
                    markdown: 'Настраиваемое (expires/Max\\-Age)',
                  },
                ],
                [
                  {
                    id: 'text-130',
                    type: 'prose',
                    markdown: 'Бессрочно',
                  },
                ],
                [
                  {
                    id: 'text-131',
                    type: 'prose',
                    markdown: 'До закрытия вкладки',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-132',
                    type: 'prose',
                    markdown: '**Отправка на сервер**',
                  },
                ],
                [
                  {
                    id: 'text-133',
                    type: 'prose',
                    markdown: '✅ Автоматически',
                  },
                ],
                [
                  {
                    id: 'text-134',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-135',
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
                    id: 'text-136',
                    type: 'prose',
                    markdown: '**Доступ из JS**',
                  },
                ],
                [
                  {
                    id: 'text-137',
                    type: 'prose',
                    markdown: 'Да (кроме HttpOnly)',
                  },
                ],
                [
                  {
                    id: 'text-138',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-139',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-140',
                    type: 'prose',
                    markdown: '**Защита XSS**',
                  },
                ],
                [
                  {
                    id: 'text-141',
                    type: 'prose',
                    markdown: 'HttpOnly флаг',
                  },
                ],
                [
                  {
                    id: 'text-142',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-143',
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
                    id: 'text-144',
                    type: 'prose',
                    markdown: '**Защита CSRF**',
                  },
                ],
                [
                  {
                    id: 'text-145',
                    type: 'prose',
                    markdown: 'SameSite флаг',
                  },
                ],
                [
                  {
                    id: 'text-146',
                    type: 'prose',
                    markdown: '✅ Не нужна',
                  },
                ],
                [
                  {
                    id: 'text-147',
                    type: 'prose',
                    markdown: '✅ Не нужна',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-148',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-149',
                    type: 'prose',
                    markdown: 'Auth, sessions, tracking',
                  },
                ],
                [
                  {
                    id: 'text-150',
                    type: 'prose',
                    markdown: 'Настройки, кэш',
                  },
                ],
                [
                  {
                    id: 'text-151',
                    type: 'prose',
                    markdown: 'Временные данные формы',
                  },
                ],
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
          id: 'text-152',
          type: 'prose',
          markdown:
            '**Cookie** — фундаментальный механизм веб\\-разработки для сохранения состояния между HTTP\\-запросами. Правильное использование атрибутов (`HttpOnly`, `Secure`, `SameSite`) критически важно для безопасности. **HttpOnly** защищает от XSS, **Secure** обеспечивает передачу только по HTTPS, **SameSite** предотвращает CSRF атаки. Для auth токенов всегда используйте комбинацию всех трех флагов. Помните о GDPR требованиях для аналитических и рекламных cookies.',
        },
        {
          id: 'resources-153',
          type: 'resources',
          items: [
            {
              id: 'link-154',
              label: 'MDN: HTTP Cookies',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
            },
          ],
        },
        {
          id: 'resources-155',
          type: 'resources',
          items: [
            {
              id: 'link-156',
              label: 'SameSite Cookies Explained',
              url: 'https://web.dev/samesite-cookies-explained/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
