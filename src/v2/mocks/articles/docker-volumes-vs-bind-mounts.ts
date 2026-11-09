import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-volumes-vs-bind-mounts-volumecommandssnippet.txt?raw'
import example2 from '../snippets/docker/docker-volumes-vs-bind-mounts-bindmountcommandssnippet.txt?raw'
import example3 from '../snippets/docker/docker-volumes-vs-bind-mounts-hotreloaddockerfilesnippet.txt?raw'
import example4 from '../snippets/docker/docker-volumes-vs-bind-mounts-packagejsonsnippet.txt?raw'
import example5 from '../snippets/docker/docker-volumes-vs-bind-mounts-dockercomposedevsnippet.txt?raw'
import example6 from '../snippets/docker/docker-volumes-vs-bind-mounts-frontendhotreloadsnippet.txt?raw'
import example7 from '../snippets/docker/docker-volumes-vs-bind-mounts-troubleshootingsnippet.txt?raw'

// Content copied verbatim from src/views/docker/VolumesVsBindMounts.vue.
export default {
  ...articleSummaries.dockerVolumesVsBindMounts,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Volumes** и **bind mounts** — это два способа сохранения данных в Docker. **Volume** — это управляемое Docker хранилище, **bind mount** — привязка к файловой системе хоста. Для разработки с hot reload чаще используются bind mounts для синхронизации исходного кода.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Volume vs Bind Mount — сравнение',
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
              label: 'Volume (именованный)',
            },
            {
              id: 'column-3',
              label: 'Bind Mount',
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
                    markdown: '**Управление**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Docker управляет полностью',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Пользователь управляет',
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
                    markdown: '**Расположение**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '/var/lib/docker/volumes/',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Любая папка на хосте',
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
                    markdown: '**Портативность**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Высокая (между контейнерами)',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Низкая (зависит от хоста)',
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
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Оптимальная',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Зависит от файловой системы',
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
                    markdown: '**Backup**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'docker volume команды',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Стандартные средства ОС',
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
                    markdown: '**Разработка**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Данные, конфиги',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Исходный код, hot reload',
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
      title: 'Когда использовать Volume vs Bind Mount',
      blocks: [
        {
          id: 'cards-21',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'Volume — для данных',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- **База данных:** PostgreSQL, MySQL\n- **Логи приложений**\n- **Кеш:** Redis, Memcached\n- **Пользовательские данные**\n- **Конфигурации** (production)\n- **Между контейнерами**',
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
                  text: 'Bind Mount — для разработки',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- **Исходный код:** hot reload\n- **Конфигурации** (development)\n- **Статические файлы**\n- **Скрипты сборки**\n- **Документация**\n- **Доступ к хост\\-файлам**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Docker Volumes — команды',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'bash',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Bind Mounts — команды',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Hot Reload — настройка для разработки',
      blocks: [
        {
          id: 'callout-30',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-31',
              type: 'prose',
              markdown:
                '**Hot Reload** позволяет автоматически перезагружать приложение при изменении исходного кода, не требуя пересборки образа. Для этого используются bind mounts и специальные инструменты мониторинга файлов.',
            },
          ],
        },
        {
          id: 'heading-32',
          type: 'heading',
          level: 3,
          text: '1. Dockerfile для разработки',
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'docker',
          code: example3,
        },
        {
          id: 'heading-34',
          type: 'heading',
          level: 3,
          text: '2. Package.json с dev скриптами',
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'json',
          code: example4,
        },
        {
          id: 'heading-36',
          type: 'heading',
          level: 3,
          text: '3. Docker Compose для разработки',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'yaml',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Frontend Hot Reload (React/Vue/Angular)',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'yaml',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Типы монтирования в Docker',
      blocks: [
        {
          id: 'cards-39',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-40',
              blocks: [
                {
                  id: 'heading-41',
                  type: 'heading',
                  level: 3,
                  text: 'Named Volume',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown: '`volume_name:/path`',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- Управляется Docker\n- Персистентность\n- Оптимальная производительность\n- Переносимость',
                },
              ],
            },
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'heading-45',
                  type: 'heading',
                  level: 3,
                  text: 'Bind Mount',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '`/host/path:/container/path`',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Прямая привязка к хосту\n- Hot reload\n- Прямое редактирование\n- Зависимость от хоста',
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
                  text: 'Anonymous Volume',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown: '`/container/path`',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Автоматическое создание\n- Временные данные\n- Защита от bind mount\n- Удаляется с контейнером',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Решение проблем Hot Reload',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-53',
          type: 'prose',
          markdown:
            "1. **В чем разница между volume и bind mount?**\n   \n   **Volume** управляется Docker, хранится в /var/lib/docker/volumes/, обеспечивает лучшую производительность и портативность. **Bind mount** привязывает конкретную папку хоста, удобен для разработки и hot reload.\n2. **Как настроить hot reload в Docker для разработки?**\n   \n   Используйте bind mount для исходного кода (`-v $(pwd):/app`), anonymous volume для node\\_modules (`-v /app/node_modules`), и инструменты мониторинга файлов (nodemon, webpack\\-dev\\-server) с polling для совместимости файловых систем.\n3. **Почему hot reload не работает на Windows/macOS?**\n   \n   Проблемы с file system events между хостом и контейнером. Решение: включить polling через `CHOKIDAR_USEPOLLING=true`, `WATCHPACK_POLLING=true` или настройки инструментов сборки.\n4. **Когда использовать anonymous volume?**\n   \n   Для защиты папок от перезаписи bind mount'ом. Например, `-v /app/node_modules` не даст bind mount'у `-v $(pwd):/app` затереть установленные в образе зависимости.\n5. **Как обеспечить персистентность данных БД в контейнере?**\n   \n   Использовать named volume: `docker run -v postgres_data:/var/lib/postgresql/data postgres`. Volume будет сохраняться между пересозданиями контейнера и может быть подключен к другим контейнерам.\n6. **Как организовать разные окружения (dev/prod) с volumes?**\n   \n   Разные docker\\-compose файлы: в dev — bind mounts для кода, в prod — volumes для данных и COPY для кода. Используйте `docker-compose -f docker-compose.dev.yml` для разработки.\n7. **Можно ли разделить volume между несколькими контейнерами?**\n   \n   Да! Named volume можно подключить к нескольким контейнерам одновременно. Это полезно для разделения данных, логов или конфигураций между сервисами.",
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Практические сценарии',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: '🛠️ Development Setup',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- **Bind mount:** исходный код\n- **Anonymous volume:** node\\_modules\n- **Named volume:** база данных\n- **Bind mount:** конфигурации',
                },
              ],
            },
            {
              id: 'card-57',
              title: '🚀 Production Setup',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- **Named volume:** база данных\n- **Named volume:** логи\n- **Named volume:** пользовательские файлы\n- **No bind mounts:** безопасность',
                },
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
          id: 'cards-59',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-60',
              blocks: [
                {
                  id: 'heading-61',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Named volumes для данных\n- Bind mounts для dev hot reload\n- Anonymous volumes для защиты папок\n- Polling для cross\\-platform\n- Backup критичных volumes\n- Разные setup для dev/prod',
                },
              ],
            },
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Bind mounts в production\n- Хранение секретов в volumes\n- Большие bind mounts\n- Прямое редактирование volume данных\n- Отсутствие backup стратегии\n- Игнорирование прав доступа',
                },
              ],
            },
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Производительность на Windows/macOS\n- Синхронизация времени файлов\n- Права доступа пользователей\n- Размер и очистка volumes\n- Сетевое хранилище проблемы\n- Concurrent access к данным',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '**Volumes** — это управляемое Docker хранилище для персистентных данных, идеально для production. **Bind mounts** — привязка к файловой системе хоста, незаменимы для разработки с hot reload. **Anonymous volumes** используются для защиты критичных папок от перезаписи. Правильное сочетание всех типов монтирования обеспечивает эффективную разработку и надежную работу в production.',
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'Docker Storage',
              url: 'https://docs.docker.com/storage/',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'Volumes Guide',
              url: 'https://docs.docker.com/storage/volumes/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
