import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-debugging-dockerlogssnippet.txt?raw'
import example2 from '../snippets/docker/docker-debugging-dockerexecsnippet.txt?raw'
import example3 from '../snippets/docker/docker-debugging-healthcheckdockerfilesnippet.txt?raw'
import example4 from '../snippets/docker/docker-debugging-healthcheckscriptsnippet.txt?raw'
import example5 from '../snippets/docker/docker-debugging-healthcheckexpresssnippet.txt?raw'
import example6 from '../snippets/docker/docker-debugging-dockercomposehealthsnippet.txt?raw'
import example7 from '../snippets/docker/docker-debugging-debuggingcommandssnippet.txt?raw'

// Content copied verbatim from src/views/docker/DockerDebugging.vue.
export default {
  ...articleSummaries.dockerDockerDebugging,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Отладка контейнеров — важный навык для разработчика. Основные инструменты: **docker logs** для просмотра логов, **docker exec** для интерактивной работы, и **healthcheck** для мониторинга здоровья приложения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Docker Logs — просмотр логов контейнера',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'Что это?',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Команда для просмотра stdout и stderr вывода контейнера',
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
                  text: 'Реальное время',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Возможность следить за логами в реальном времени с флагом \\-f',
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
                  text: 'Фильтрация',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Фильтр по времени, количеству строк и поиск по содержимому',
                },
              ],
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'bash',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Docker Exec — интерактивное подключение',
      blocks: [
        {
          id: 'cards-13',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-14',
              title: 'Интерактивный режим',
              blocks: [
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- `-i` — интерактивный режим (STDIN)\n- `-t` — псевдо\\-TTY (терминал)\n- `-it` — комбинация для полноценного терминала\n- Работает только с запущенными контейнерами',
                },
              ],
            },
            {
              id: 'card-16',
              title: 'Отладочные возможности',
              blocks: [
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown:
                    '- Проверка файловой системы\n- Запуск команд внутри контейнера\n- Проверка сетевых подключений\n- Анализ процессов и ресурсов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Healthcheck — мониторинг здоровья',
      blocks: [
        {
          id: 'callout-19',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-20',
              type: 'prose',
              markdown:
                '**Важно:** Healthcheck позволяет Docker автоматически определять, здоров ли контейнер. Это критически важно для production окружений и оркестрации.',
            },
          ],
        },
        {
          id: 'cards-21',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'Здоровье',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: 'Автоматическая проверка работоспособности приложения',
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
                  text: 'Перезапуск',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown: 'Автоматический перезапуск нездоровых контейнеров',
                },
              ],
            },
            {
              id: 'card-28',
              blocks: [
                {
                  id: 'heading-29',
                  type: 'heading',
                  level: 3,
                  text: 'Мониторинг',
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown: 'Интеграция с системами мониторинга и оркестрации',
                },
              ],
            },
            {
              id: 'card-31',
              blocks: [
                {
                  id: 'heading-32',
                  type: 'heading',
                  level: 3,
                  text: 'Load Balancer',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: 'Исключение нездоровых контейнеров из балансировки',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-34',
          type: 'heading',
          level: 3,
          text: 'Параметры HEALTHCHECK',
        },
        {
          id: 'table-35',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Параметр',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'По умолчанию',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`--interval`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Интервал между проверками',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '30s',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`--timeout`',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Таймаут одной проверки',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '30s',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`--start-period`',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Период инициализации приложения',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '0s',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`--retries`',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Количество попыток до признания нездоровым',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '3',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'heading-48',
          type: 'heading',
          level: 3,
          text: 'Статусы Healthcheck',
        },
        {
          id: 'cards-49',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 4,
                  text: 'starting',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: 'Период инициализации',
                },
              ],
            },
            {
              id: 'card-53',
              blocks: [
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 4,
                  text: 'healthy',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: 'Контейнер здоров',
                },
              ],
            },
            {
              id: 'card-56',
              blocks: [
                {
                  id: 'heading-57',
                  type: 'heading',
                  level: 4,
                  text: 'unhealthy',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: 'Проверка провалилась',
                },
              ],
            },
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 4,
                  text: 'none',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown: 'Healthcheck не настроен',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-62',
          type: 'heading',
          level: 3,
          text: 'HEALTHCHECK в Dockerfile',
        },
        {
          id: 'code-63',
          type: 'code',
          language: 'docker',
          code: example3,
        },
        {
          id: 'heading-64',
          type: 'heading',
          level: 3,
          text: 'Кастомный healthcheck скрипт',
        },
        {
          id: 'code-65',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
        {
          id: 'heading-66',
          type: 'heading',
          level: 3,
          text: 'Health endpoint в Express.js',
        },
        {
          id: 'code-67',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-68',
          type: 'heading',
          level: 3,
          text: 'Healthcheck в Docker Compose',
        },
        {
          id: 'code-69',
          type: 'code',
          language: 'yaml',
          code: example6,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Комплексная отладка контейнера',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '1. **Как посмотреть логи контейнера, который постоянно перезапускается?**\n   \n   Использовать `docker logs container_name` даже если контейнер перезапущен — логи сохраняются. Для автоматического перезапуска: `docker logs -f --since 5m container_name` покажет последние логи.\n2. **Контейнер запускается, но приложение не отвечает. Как отладить?**\n   \n   1\\) `docker exec -it container_name sh` — подключиться к контейнеру 2) `ps aux` — проверить запущенные процессы 3) `netstat -tlnp` — проверить открытые порты 4) `curl localhost:port` — проверить приложение изнутри\n3. **Зачем нужен HEALTHCHECK и как он работает?**\n   \n   HEALTHCHECK позволяет Docker определять работоспособность приложения, не полагаясь только на статус процесса. Выполняется периодически, возвращает exit code 0 (здоров) или 1 (нездоров). Используется оркестраторами для перезапуска.\n4. **Чем отличается docker exec от docker run?**\n   \n   `docker run` создает новый контейнер из образа, `docker exec` выполняет команду в уже запущенном контейнере. exec не создает новый контейнер, а использует namespace и окружение существующего.\n5. **Как проверить, почему контейнер считается unhealthy?**\n   \n   `docker inspect container_name` покажет последние результаты healthcheck в разделе State.Health. Также можно запустить healthcheck команду вручную через `docker exec` для отладки.\n6. **Как ограничить размер логов контейнера?**\n   \n   При запуске: `docker run --log-opt max-size=10m --log-opt max-file=3` В compose: logging.options.max\\-size: "10m". Логи ротируются автоматически при достижении лимита.\n7. **Что делать, если exec не работает (контейнер без bash/sh)?**\n   \n   Проверить доступные исполнимые файлы: `docker exec container_name ls /bin` Попробовать другие shell: `/bin/ash`, `/usr/bin/sh` Использовать `docker cp` для копирования файлов отладки.',
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Лучшие практики отладки',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '✅ Логирование',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Структурированные логи (JSON)\n- Разные уровни логирования\n- Ротация логов\n- Централизованное логирование\n- Контекстная информация',
                },
              ],
            },
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: '✅ Healthcheck',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Всегда настраивать healthcheck\n- Проверять зависимости\n- Быстрые проверки (\\\\&lt;5s)\n- Graceful degradation\n- Детальная информация',
                },
              ],
            },
            {
              id: 'card-79',
              blocks: [
                {
                  id: 'heading-80',
                  type: 'heading',
                  level: 3,
                  text: '✅ Инструменты',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Мониторинг ресурсов\n- Профилирование производительности\n- Трейсинг запросов\n- Интеграция с APM системами\n- Автоматизированные проверки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические сценарии отладки',
      blocks: [
        {
          id: 'cards-82',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-83',
              title: 'Сценарий 1: Контейнер не запускается',
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '1. `docker ps -a` — проверить статус\n2. `docker logs container_name` — посмотреть ошибки\n3. `docker inspect container_name` — детали конфигурации\n4. Проверить Dockerfile и переменные окружения',
                },
              ],
            },
            {
              id: 'card-85',
              title: 'Сценарий 2: Приложение не отвечает',
              blocks: [
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '1. `docker exec -it container_name sh`\n2. `ps aux` — проверить процессы\n3. `netstat -tlnp` — открытые порты\n4. `curl localhost:port/health` — тест изнутри',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Мониторинг в production',
      blocks: [
        {
          id: 'callout-87',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-88',
              type: 'prose',
              markdown:
                '**Production:** В производственной среде обязательно настройте централизованное логирование (ELK, Fluentd), мониторинг (Prometheus, Grafana) и алерты на основе healthcheck статуса.',
            },
          ],
        },
        {
          id: 'cards-89',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-90',
              blocks: [
                {
                  id: 'heading-91',
                  type: 'heading',
                  level: 3,
                  text: 'Логи',
                },
                {
                  id: 'text-92',
                  type: 'prose',
                  markdown:
                    '- Централизованный сбор\n- Структурированный формат\n- Ротация и архивирование\n- Поиск и фильтрация',
                },
              ],
            },
            {
              id: 'card-93',
              blocks: [
                {
                  id: 'heading-94',
                  type: 'heading',
                  level: 3,
                  text: 'Метрики',
                },
                {
                  id: 'text-95',
                  type: 'prose',
                  markdown:
                    '- CPU, память, диск\n- Сетевой трафик\n- Время отклика\n- Количество ошибок',
                },
              ],
            },
            {
              id: 'card-96',
              blocks: [
                {
                  id: 'heading-97',
                  type: 'heading',
                  level: 3,
                  text: 'Алерты',
                },
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- Unhealthy контейнеры\n- Высокое использование ресурсов\n- Частые ошибки в логах\n- Недоступность сервисов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итог',
      blocks: [
        {
          id: 'text-99',
          type: 'prose',
          markdown:
            'Эффективная отладка Docker контейнеров требует комплексного подхода: **docker logs** для анализа вывода, **docker exec** для интерактивного исследования, и **healthcheck** для проактивного мониторинга. Комбинирование этих инструментов с правильным логированием и мониторингом обеспечивает надежную работу приложений в контейнерах как в разработке, так и в production.',
        },
        {
          id: 'resources-100',
          type: 'resources',
          items: [
            {
              id: 'link-101',
              label: 'Docker Logs Docs',
              url: 'https://docs.docker.com/engine/reference/commandline/logs/',
            },
          ],
        },
        {
          id: 'resources-102',
          type: 'resources',
          items: [
            {
              id: 'link-103',
              label: 'Healthcheck Reference',
              url: 'https://docs.docker.com/engine/reference/builder/#healthcheck',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
