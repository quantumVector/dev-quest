import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-env-arg-argexamplesnippet.txt?raw'
import example2 from '../snippets/docker/docker-env-arg-envexamplesnippet.txt?raw'
import example3 from '../snippets/docker/docker-env-arg-buildcommandssnippet.txt?raw'
import example4 from '../snippets/docker/docker-env-arg-reactenvsnippet.txt?raw'
import example5 from '../snippets/docker/docker-env-arg-reactusagesnippet.txt?raw'
import example6 from '../snippets/docker/docker-env-arg-dockerfilereactsnippet.txt?raw'
import example7 from '../snippets/docker/docker-env-arg-dockercomposesnippet.txt?raw'

// Content copied verbatim from src/views/docker/EnvVsArg.vue.
export default {
  ...articleSummaries.dockerEnvVsArg,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**ARG** — переменные времени сборки (build\\-time), доступны только при создании образа. **ENV** — переменные времени выполнения (runtime), доступны в запущенном контейнере. В React приложениях используются префиксы `VITE_` или `REACT_APP_` для доступа к переменным окружения на frontend.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Ключевые различия ARG vs ENV',
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
                  text: 'ARG (Build-time)',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Время сборки** — только при docker build\n- **Передача** — через \\-\\-build\\-arg\n- **Область** — недоступны в контейнере\n- **Кеширование** — влияют на кеш слоев\n- **Безопасность** — могут попасть в историю\n- **По умолчанию** — можно задать значение',
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
                  text: 'ENV (Runtime)',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Время выполнения** — в запущенном контейнере\n- **Передача** — через \\-e или \\-\\-env\\-file\n- **Область** — доступны в процессах контейнера\n- **Переопределение** — при запуске контейнера\n- **Наследование** — дочерние процессы видят\n- **Гибкость** — можно изменить без пересборки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Примеры использования ARG',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'docker',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Примеры использования ENV',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'docker',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Команды для передачи переменных',
      blocks: [
        {
          id: 'code-11',
          type: 'code',
          language: 'bash',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Когда использовать ARG vs ENV?',
      blocks: [
        {
          id: 'table-12',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'ARG',
            },
            {
              id: 'column-3',
              label: 'ENV',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**Версия приложения при сборке**',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '❌',
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
                    markdown: '**API URL для frontend**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Database URL для backend**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**Секреты и пароли**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '⚠️',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Настройки для разных окружений**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '✅',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Порты и хосты**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '✅',
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
      title: 'Переменные окружения в React',
      blocks: [
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown:
                '**Важно:** React переменные с префиксами `VITE_` или `REACT_APP_` встраиваются в bundle на этапе сборки (build\\-time), а не runtime! Они видны всем пользователям.',
            },
          ],
        },
        {
          id: 'cards-33',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-34',
              title: 'Vite (современный)',
              blocks: [
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown:
                    '- `VITE_*` — префикс для переменных\n- `import.meta.env.VITE_API_URL`\n- Быстрая сборка с HMR\n- TypeScript из коробки\n- ES modules',
                },
              ],
            },
            {
              id: 'card-36',
              title: 'Create React App',
              blocks: [
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- `REACT_APP_*` — префикс для переменных\n- `process.env.REACT_APP_API_URL`\n- Webpack под капотом\n- Встроенные оптимизации\n- Zero config setup',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-38',
          type: 'heading',
          level: 3,
          text: 'Файлы переменных окружения',
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'bash',
          code: example4,
        },
        {
          id: 'heading-40',
          type: 'heading',
          level: 3,
          text: 'Использование в React коде',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Dockerfile для React приложения',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'docker',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Docker Compose с переменными',
      blocks: [
        {
          id: 'code-43',
          type: 'code',
          language: 'yaml',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Приоритет переменных окружения',
      blocks: [
        {
          id: 'steps-44',
          type: 'steps',
          mode: 'sequence',
          showTitle: false,
          items: [
            {
              id: 'step-45',
              title: 'ARG в Dockerfile',
              blocks: [],
            },
            {
              id: 'step-46',
              title: 'ENV в Dockerfile',
              blocks: [],
            },
            {
              id: 'step-47',
              title: 'docker-compose.yml',
              blocks: [],
            },
            {
              id: 'step-48',
              title: 'Файл .env',
              blocks: [],
            },
            {
              id: 'step-49',
              title: 'Системные переменные',
              blocks: [],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-50',
          type: 'prose',
          markdown:
            '1. **В чем основная разница между ARG и ENV?**\n   \n   ARG доступны только во время сборки образа (docker build), ENV — в запущенном контейнере. ARG передаются через \\-\\-build\\-arg, ENV через \\-e или \\-\\-env\\-file при запуске.\n2. **Как передать переменные в React приложение в Docker?**\n   \n   Через ARG в Dockerfile, которые передаются в ENV с префиксом VITE\\_ или REACT\\_APP\\_. Важно: эти переменные встраиваются в bundle на этапе сборки, не runtime.\n3. **Почему нельзя передать секреты через ARG?**\n   \n   ARG сохраняются в истории образа и могут быть видны через docker history. Для секретов используйте ENV при запуске, secrets в docker\\-compose или внешние системы управления секретами.\n4. **Как изменить переменные без пересборки образа?**\n   \n   Если переменные определены как ENV в Dockerfile, их можно переопределить при запуске контейнера через \\-e VAR=value или \\-\\-env\\-file. ARG нельзя переопределить без пересборки.\n5. **Как работают REACT\\_APP\\_ и VITE\\_ переменные?**\n   \n   Эти переменные подставляются в код на этапе сборки (build\\-time), а не выполнения. Webpack/Vite заменяют process.env.REACT\\_APP\\_\\* или import.meta.env.VITE\\_\\* на их значения в bundle.\n6. **Можно ли использовать ARG в CMD или ENTRYPOINT?**\n   \n   Нет, ARG недоступны в CMD/ENTRYPOINT. Нужно сначала передать ARG в ENV: `ENV MY_VAR=$ARG_VAR`, затем использовать ENV в CMD.\n7. **Как обеспечить разные настройки для dev/staging/prod?**\n   \n   Используйте разные .env файлы, передавайте ARG при сборке для разных окружений, или используйте docker\\-compose с разными конфигурациями и переменными ENV.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-51',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- ARG для параметров сборки\n- ENV для runtime переменных\n- Значения по умолчанию для ARG\n- Префиксы VITE\\_/REACT\\_APP\\_\n- Использовать .env файлы\n- Документировать переменные',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Секреты в ARG\n- Хардкод значений\n- ARG в CMD/ENTRYPOINT\n- Переменные без префиксов в React\n- Большое количество ARG\n- ENV для build\\-time данных',
                },
              ],
            },
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- React переменные в bundle\n- ARG влияют на кеш\n- Порядок объявления важен\n- Чувствительные данные\n- Валидация значений\n- Совместимость окружений',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Схема работы переменных',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-62',
              title: 'Жизненный цикл переменных',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 4,
                  text: 'Build Time',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    'ARG передаются через \\-\\-build\\-arg  \n React переменные встраиваются в bundle  \n ENV устанавливаются в образ',
                },
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 4,
                  text: 'Container Start',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    'ENV могут быть переопределены  \n Загрузка файлов .env  \n Настройка окружения',
                },
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 4,
                  text: 'Runtime',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    'ENV доступны процессам  \n React переменные уже в коде  \n Можно изменить через docker exec',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '**ARG** используются для настройки процесса сборки (build\\-time), **ENV** — для конфигурации запущенного контейнера (runtime). В React приложениях переменные с префиксами `VITE_` или `REACT_APP_` встраиваются в bundle на этапе сборки через webpack/vite. Правильный выбор между ARG и ENV зависит от того, когда переменная нужна — при сборке образа или при выполнении контейнера.',
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'Docker ARG Docs',
              url: 'https://docs.docker.com/engine/reference/builder/#arg',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'Vite Env Guide',
              url: 'https://vitejs.dev/guide/env-and-mode.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
