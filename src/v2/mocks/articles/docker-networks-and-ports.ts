import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-networks-and-ports-exposesnippet.txt?raw'
import example2 from '../snippets/docker/docker-networks-and-ports-runcommandssnippet.txt?raw'
import example3 from '../snippets/docker/docker-networks-and-ports-networktypessnippet.txt?raw'
import example4 from '../snippets/docker/docker-networks-and-ports-networkexamplessnippet.txt?raw'
import example5 from '../snippets/docker/docker-networks-and-ports-composenetworksnippet.txt?raw'

// Content copied verbatim from src/views/docker/DockerNetworksAndPorts.vue.
export default {
  ...articleSummaries.dockerDockerNetworksAndPorts,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Понимание разницы между **EXPOSE** и **\\-p** критически важно для работы с Docker. **EXPOSE** — это только документация, а **\\-p** реально открывает порты. **Bridge** изолирует контейнеры, **host** использует сеть хоста напрямую.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'EXPOSE — только документация!',
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
                '**Важно:** EXPOSE в Dockerfile НЕ открывает порт наружу! Это только документация для других разработчиков и для команды `docker run -P`.',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'docker',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'EXPOSE vs -p — ключевые различия',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'EXPOSE',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Только документация**\n- **В Dockerfile** — статично\n- **Не открывает** порт наружу\n- **Используется** с \\-P флагом\n- **Информирует** о портах приложения\n- **Метаданные** образа',
                },
              ],
            },
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: '-p (--publish)',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Реальное** открытие порта\n- **При запуске** — динамично\n- **Пробрасывает** трафик\n- **host:container** маппинг\n- **Доступ снаружи** контейнера\n- **Runtime** конфигурация',
                },
              ],
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Типы сетей в Docker',
      blocks: [
        {
          id: 'cards-13',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: 'Bridge (по умолчанию)',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    '- **Изолированная** сеть\n- **Docker0** интерфейс\n- **NAT** для доступа наружу\n- **Нужен \\-p** для портов\n- **172.17.0.0/16** подсеть',
                },
              ],
            },
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'Host',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    '- **Сеть хоста** напрямую\n- **Нет изоляции** портов\n- **Максимальная** производительность\n- **Не нужен \\-p**\n- **Конфликты** портов',
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
                  text: 'None',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- **Без сети**\n- **Только loopback**\n- **Максимальная** изоляция\n- **Нет доступа** в интернет\n- **Для безопасности**',
                },
              ],
            },
          ],
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'bash',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Bridge vs Host — детальное сравнение',
      blocks: [
        {
          id: 'table-24',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Bridge',
            },
            {
              id: 'column-3',
              label: 'Host',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Изоляция**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '✅ Полная изоляция портов',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '❌ Нет изоляции',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '⚠️ Небольшие накладные расходы',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '✅ Максимальная',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '**Безопасность**',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '✅ Лучше (изоляция)',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '⚠️ Хуже (прямой доступ)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Порты**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Нужен \\-p для доступа',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Автоматически доступны',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**IP адрес**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Внутренний (172.17.x.x)',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'IP хоста',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Обычные приложения',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Мониторинг, сетевые утилиты',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Docker Compose и сети',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'yaml',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практические сценарии',
      blocks: [
        {
          id: 'cards-45',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-46',
              blocks: [
                {
                  id: 'heading-47',
                  type: 'heading',
                  level: 3,
                  text: 'Web приложение',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: '✅ Bridge \\+ \\-p',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown: '`docker run -p 80:3000 myapp`  \n Изоляция \\+ контролируемый доступ',
                },
              ],
            },
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 3,
                  text: 'Мониторинг',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: '✅ Host сеть',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: '`docker run --net host prometheus`  \n Доступ ко всем портам хоста',
                },
              ],
            },
            {
              id: 'card-54',
              blocks: [
                {
                  id: 'heading-55',
                  type: 'heading',
                  level: 3,
                  text: 'База данных',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown: '✅ Bridge без \\-p',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '`docker run postgres`  \n Только внутренний доступ',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            '1. **В чем разница между EXPOSE и \\-p?**\n   \n   EXPOSE — только документация в Dockerfile, не открывает порт наружу. \\-p (\\-\\-publish) реально пробрасывает порт с хоста в контейнер, обеспечивая доступ снаружи.\n2. **Когда использовать host сеть вместо bridge?**\n   \n   Host сеть используется для мониторинга, сетевых утилит, когда нужна максимальная производительность или доступ ко всем портам хоста. Bridge — для обычных приложений, где важна изоляция.\n3. **Что происходит с портами в host сети?**\n   \n   В host сети контейнер использует сеть хоста напрямую. Все порты контейнера автоматически доступны на хосте. Флаг \\-p не нужен и игнорируется.\n4. **Как контейнеры общаются в bridge сети?**\n   \n   В bridge сети контейнеры получают внутренние IP (172.17.x.x) и могут общаться между собой по IP или через \\-\\-link. В пользовательских сетях — по именам контейнеров (DNS).\n5. **Что делает команда docker run \\-P?**\n   \n   \\-P (заглавная P) автоматически публикует ВСЕ порты из EXPOSE на случайные порты хоста. Например, EXPOSE 3000 → хост:32768:контейнер:3000\n6. **Можно ли изменить сеть запущенного контейнера?**\n   \n   Можно подключить контейнер к дополнительным сетям: `docker network connect network_name container_name`. Но нельзя изменить основную сеть без пересоздания.',
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Диагностика сетевых проблем',
      blocks: [
        {
          id: 'cards-59',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-60',
              title: 'Отладка подключений',
              blocks: [
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- `docker port container_name` — порты контейнера\n- `docker network inspect bridge` — детали сети\n- `docker exec -it container sh` — войти в контейнер\n- `netstat -tlnp` — открытые порты в контейнере',
                },
              ],
            },
            {
              id: 'card-62',
              title: 'Частые проблемы',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- **Порт недоступен** — забыли \\-p флаг\n- **Address already in use** — порт занят\n- **Connection refused** — приложение не слушает\n- **No route to host** — проблемы с сетью',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-64',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-65',
              blocks: [
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- Всегда использовать EXPOSE в Dockerfile\n- Использовать bridge для изоляции\n- Создавать пользовательские сети\n- Минимизировать открытые порты\n- Документировать сетевую архитектуру\n- Тестировать доступность портов',
                },
              ],
            },
            {
              id: 'card-68',
              blocks: [
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Host сеть в production без причины\n- Открывать все порты \\-P\n- Хардкодить IP адреса\n- Использовать \\-\\-link (deprecated)\n- Игнорировать сетевую безопасность\n- Забывать про firewall',
                },
              ],
            },
            {
              id: 'card-71',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Используйте Docker Compose для сложных сетей\n- Настраивайте health checks\n- Мониторьте сетевой трафик\n- Изучите iptables правила Docker\n- Тестируйте в изолированных средах\n- Изучайте logs при проблемах',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Итог',
      blocks: [
        {
          id: 'text-74',
          type: 'prose',
          markdown:
            '**EXPOSE** — это документация в Dockerfile, **\\-p** — реальное открытие портов при запуске. **Bridge сеть** обеспечивает изоляцию и безопасность, **host сеть** — максимальную производительность без изоляции. Понимание этих концепций критично для правильной настройки Docker приложений и успешного прохождения собеседования.',
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Docker Networking',
              url: 'https://docs.docker.com/config/containers/container-networking/',
            },
          ],
        },
        {
          id: 'resources-77',
          type: 'resources',
          items: [
            {
              id: 'link-78',
              label: 'Network Settings',
              url: 'https://docs.docker.com/engine/reference/run/#network-settings',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
