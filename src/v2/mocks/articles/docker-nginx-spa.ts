import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-nginx-spa-problemexamplesnippet.txt?raw'
import example2 from '../snippets/docker/docker-nginx-spa-reactrouterexample.txt?raw'
import example3 from '../snippets/docker/docker-nginx-spa-vuerouterexample.txt?raw'
import example4 from '../snippets/docker/docker-nginx-spa-solutionexplanationsnippet.txt?raw'
import example5 from '../snippets/docker/docker-nginx-spa-nginxconfigsnippet.txt?raw'
import example6 from '../snippets/docker/docker-nginx-spa-dockerfilesnippet.txt?raw'
import example7 from '../snippets/docker/docker-nginx-spa-alternativesolutionssnippet.txt?raw'
import example8 from '../snippets/docker/docker-nginx-spa-troubleshootingsnippet.txt?raw'

// Content copied verbatim from src/views/docker/NginxSPA.vue.
export default {
  ...articleSummaries.dockerNginxSPA,
  schemaVersion: 1,
  titleMarkdown: 'Nginx для SPA: зачем `try_files $uri /index.html;`',
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Single Page Application (SPA)** использует клиентский роутинг для навигации между страницами без перезагрузки. Но при прямом обращении к URL или обновлении страницы (F5) сервер пытается найти физический файл, которого не существует. `try_files` решает эту проблему.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Проблема: SPA роутинг vs HTTP запросы',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Суть проблемы:** SPA имеет только один физический файл (index.html), но URL выглядят как обычные страницы. При прямом запросе сервер ищет несуществующие файлы.',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'bash',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Как работает SPA роутинг',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              title: 'Клиентский роутинг',
              blocks: [
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown:
                    '1. Пользователь загружает `index.html`\n2. JavaScript загружает роутер (React Router, Vue Router)\n3. Роутер читает URL и показывает нужный компонент\n4. При клике по ссылкам URL меняется без перезагрузки\n5. History API управляет браузерной историей',
                },
              ],
            },
            {
              id: 'card-8',
              title: 'Проблема с прямыми запросами',
              blocks: [
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    '1. Пользователь вводит `/about` в адресную строку\n2. Браузер отправляет GET запрос на сервер\n3. Nginx ищет файл `/about` на диске\n4. Файл не найден → 404 Error\n5. JavaScript роутер даже не загружается!',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'React Router пример',
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
      title: 'Vue Router пример',
      blocks: [
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Решение: try_files в Nginx',
      blocks: [
        {
          id: 'code-12',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Полная конфигурация Nginx',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'nginx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Dockerfile с Nginx для SPA',
      blocks: [
        {
          id: 'code-14',
          type: 'code',
          language: 'docker',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Как работает try_files',
      blocks: [
        {
          id: 'cards-15',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-16',
              blocks: [
                {
                  id: 'heading-17',
                  type: 'heading',
                  level: 3,
                  text: '1. Ищет файл',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown: 'Сначала пытается найти точный файл по запрошенному пути',
                },
              ],
            },
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'heading-20',
                  type: 'heading',
                  level: 3,
                  text: '2. Ищет папку',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: 'Если файл не найден, пытается найти папку с таким именем',
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
                  text: '3. Fallback',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: 'Если ничего не найдено, отдает index.html',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Альтернативные решения',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Типичные проблемы и решения',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'bash',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown:
            '1. **Почему SPA падает при обновлении страницы (F5)?**\n   \n   При F5 браузер делает HTTP запрос на сервер за текущим URL. Если это клиентский роут (например, /about), сервер ищет физический файл /about, не находит его и возвращает 404. JavaScript роутер даже не загружается.\n2. **Что делает `try_files $uri $uri/ /index.html;`?**\n   \n   Последовательно пытается найти: 1) файл по точному пути, 2) папку с таким именем, 3) если ничего не найдено — отдает index.html, который содержит JavaScript роутер.\n3. **Чем отличается History API от Hash роутинга?**\n   \n   History API создает "красивые" URL (/about), но требует серверной настройки. Hash роутинг использует # (/#!/about), все после # обрабатывается только браузером, не требует настройки сервера.\n4. **Как правильно кешировать SPA?**\n   \n   index.html — не кешировать (no\\-cache), статические ресурсы (JS/CSS) — кешировать надолго с версионированием. Это позволяет получать обновления приложения, но кешировать неизменяемые ресурсы.\n5. **Что будет, если забыть try\\_files для API роутов?**\n   \n   API запросы (/api/users) будут перенаправлены на index.html вместо backend сервера. Поэтому location /api/ должен идти ПЕРЕД location / в конфигурации Nginx.\n6. **Как дебажить проблемы с роутингом?**\n   \n   Проверить: 1) порядок location блоков в nginx.conf, 2) наличие тега &lt;base href="/"&gt;, 3) настройки роутера (history mode), 4) логи Nginx, 5) Network tab в DevTools.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-28',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'URL вид',
            },
            {
              id: 'column-3',
              label: 'Настройка сервера',
            },
            {
              id: 'column-4',
              label: 'SEO',
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
                    id: 'text-29',
                    type: 'prose',
                    markdown: '**History API**',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '/about',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Требуется try\\_files',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '✅ Хорошо',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Production SPA',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Hash Router**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '/#/about',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Не требуется',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '❌ Плохо',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Простые приложения',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Server\\-side routing**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '/about',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Каждый роут = файл',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ Отлично',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Traditional MPA',
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
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-44',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Использовать try\\_files для SPA\n- Кешировать статические ресурсы\n- НЕ кешировать index.html\n- API роуты располагать первыми\n- Добавлять security заголовки\n- Gzip сжатие для текстовых файлов',
                },
              ],
            },
            {
              id: 'card-48',
              blocks: [
                {
                  id: 'heading-49',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Кеширования index.html\n- try\\_files для API роутов\n- Неправильного порядка location\n- Отсутствия base href\n- Жесткого кеширования SPA\n- Игнорирования MIME типов',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- Тестировать прямые URL\n- Мониторить 404 ошибки\n- Использовать CDN для статики\n- Настроить error pages\n- Логировать доступ и ошибки\n- Проверять mobile доступность',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-54',
          type: 'prose',
          markdown:
            '`try_files $uri $uri/ /index.html;` — это ключевая директива для работы SPA с Nginx. Она решает проблему клиентского роутинга, обеспечивая корректную работу при прямых запросах и обновлении страницы. Без неё пользователи получат 404 ошибки при попытке зайти на любую страницу SPA напрямую или при нажатии F5. Правильная настройка Nginx критична для production деплоя современных SPA приложений.',
        },
        {
          id: 'resources-55',
          type: 'resources',
          items: [
            {
              id: 'link-56',
              label: 'Nginx try_files',
              url: 'https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files',
            },
          ],
        },
        {
          id: 'resources-57',
          type: 'resources',
          items: [
            {
              id: 'link-58',
              label: 'Vue Router History',
              url: 'https://router.vuejs.org/guide/essentials/history-mode.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
