import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-run-cmd-entrypoint-runexamplesnippet.txt?raw'
import example2 from '../snippets/docker/docker-run-cmd-entrypoint-cmdexamplesnippet.txt?raw'
import example3 from '../snippets/docker/docker-run-cmd-entrypoint-entrypointexamplesnippet.txt?raw'
import example4 from '../snippets/docker/docker-run-cmd-entrypoint-combinationexamplesnippet.txt?raw'
import example5 from '../snippets/docker/docker-run-cmd-entrypoint-practicalexamplesnippet.txt?raw'
import example6 from '../snippets/docker/docker-run-cmd-entrypoint-comparisonsnippet.txt?raw'

// Content copied verbatim from src/views/docker/RunCmdEntrypoint.vue.
export default {
  ...articleSummaries.dockerRunCmdEntrypoint,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**RUN**, **CMD** и **ENTRYPOINT** — три ключевые инструкции Docker для выполнения команд. Они работают на разных этапах жизненного цикла контейнера и имеют разное поведение. Понимание их различий критически важно для эффективной работы с Docker.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Краткое сравнение',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Инструкция',
            },
            {
              id: 'column-2',
              label: 'Когда выполняется',
            },
            {
              id: 'column-3',
              label: 'Назначение',
            },
            {
              id: 'column-4',
              label: 'Переопределение',
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
                    markdown: '`RUN`',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Сборка образа',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Установка пакетов, настройка',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '❌ Невозможно',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '`CMD`',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Запуск контейнера',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Команда по умолчанию',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '✅ Полностью заменяется',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '`ENTRYPOINT`',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Запуск контейнера',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Главный процесс',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '⚠️ Только параметры',
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
      title: 'RUN — команды сборки',
      blocks: [
        {
          id: 'cards-15',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-16',
              blocks: [
                {
                  id: 'heading-17',
                  type: 'heading',
                  level: 3,
                  text: 'Характеристики RUN',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    "- **Время выполнения:** сборка образа\n- **Создает слой** в образе\n- **Кешируется** Docker'ом\n- **Необратимые изменения** образа\n- **Множественное использование**",
                },
              ],
            },
            {
              id: 'card-19',
              title: 'Типичные задачи',
              blocks: [
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Установка пакетов\n- Создание директорий\n- Компиляция кода\n- Настройка системы\n- Загрузка зависимостей',
                },
              ],
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'docker',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'CMD — команда по умолчанию',
      blocks: [
        {
          id: 'cards-22',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'Характеристики CMD',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- **Время выполнения:** запуск контейнера\n- **Только последняя** CMD учитывается\n- **Полностью переопределяется** аргументами\n- **Гибкость** при запуске\n- **Опциональность** выполнения',
                },
              ],
            },
            {
              id: 'card-26',
              title: 'Форматы CMD',
              blocks: [
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- `CMD ["exec", "param"]` — exec форма\n- `CMD command param` — shell форма\n- `CMD ["param1", "param2"]` — для ENTRYPOINT',
                },
              ],
            },
          ],
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'docker',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'ENTRYPOINT — главный процесс',
      blocks: [
        {
          id: 'cards-29',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-30',
              blocks: [
                {
                  id: 'heading-31',
                  type: 'heading',
                  level: 3,
                  text: 'Характеристики ENTRYPOINT',
                },
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- **Всегда выполняется** при запуске\n- **Не переопределяется** аргументами\n- **Аргументы добавляются** к команде\n- **Главный процесс** контейнера\n- **Фиксированное поведение**',
                },
              ],
            },
            {
              id: 'card-33',
              title: 'Когда использовать',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Контейнер как исполняемый файл\n- Фиксированный процесс (nginx, postgres)\n- Обработка параметров запуска\n- Инициализационные скрипты',
                },
              ],
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'docker',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Комбинирование ENTRYPOINT + CMD',
      blocks: [
        {
          id: 'callout-36',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-37',
              type: 'prose',
              markdown:
                '**Совет:** Комбинация ENTRYPOINT \\+ CMD — мощный паттерн. ENTRYPOINT определяет неизменную часть команды, а CMD предоставляет параметры по умолчанию, которые можно переопределить.',
            },
          ],
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'docker',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практический пример',
      blocks: [
        {
          id: 'code-39',
          type: 'code',
          language: 'docker',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Поведенческие различия',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'docker',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Exec vs Shell форма',
      blocks: [
        {
          id: 'cards-41',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-42',
              title: 'Exec форма (рекомендуется)',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: '`CMD ["npm", "start"]`',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- ✅ Прямое выполнение (PID 1)\n- ✅ Правильная обработка сигналов\n- ✅ Нет промежуточного shell\n- ✅ Переменные не раскрываются\n- ✅ Более эффективно',
                },
              ],
            },
            {
              id: 'card-45',
              title: 'Shell форма',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '`CMD npm start`',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- ⚠️ Выполняется через /bin/sh\n- ⚠️ Shell получает PID 1\n- ⚠️ Проблемы с сигналами\n- ✅ Раскрытие переменных\n- ✅ Shell операторы (&amp;&amp;, ||, |)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-48',
          type: 'prose',
          markdown:
            '1. **В чем главная разница между RUN и CMD?**\n   \n   RUN выполняется во время **сборки образа** и создает слои, а CMD выполняется при **запуске контейнера** и может быть переопределена аргументами командной строки.\n2. **Что произойдет, если в Dockerfile есть несколько CMD?**\n   \n   Только последняя CMD инструкция будет учтена. Предыдущие CMD игнорируются. Это отличается от RUN, где выполняются все инструкции.\n3. **Как ENTRYPOINT взаимодействует с аргументами docker run?**\n   \n   Аргументы docker run добавляются к ENTRYPOINT команде, но не заменяют её. Например: ENTRYPOINT \\["echo"\\] \\+ docker run image "hello" = echo hello\n4. **Когда использовать ENTRYPOINT вместо CMD?**\n   \n   ENTRYPOINT используется когда контейнер должен работать как исполняемый файл с фиксированной командой. CMD подходит для команд по умолчанию, которые пользователь может переопределить.\n5. **В чем разница между exec и shell формой?**\n   \n   Exec форма (\\["cmd", "param"\\]) выполняется напрямую без shell, получает PID 1 и правильно обрабатывает сигналы. Shell форма (cmd param) выполняется через /bin/sh, что может вызывать проблемы с сигналами.\n6. **Как передать переменные окружения в exec форме?**\n   \n   В exec форме переменные не раскрываются автоматически. Нужно использовать shell: CMD \\["sh", "\\-c", "echo $VARIABLE"\\] вместо CMD \\["echo", "$VARIABLE"\\]\n7. **Можно ли переопределить ENTRYPOINT?**\n   \n   Да, но только через флаг \\-\\-entrypoint при запуске: docker run \\-\\-entrypoint="" image new\\-command. Это требует явного указания и не является обычным поведением.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Паттерны использования',
      blocks: [
        {
          id: 'cards-49',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-50',
              title: 'Веб-приложение',
              blocks: [
                {
                  id: 'inline-code-51',
                  type: 'inline-code',
                  lines: ['RUN npm install'],
                },
                {
                  id: 'inline-code-52',
                  type: 'inline-code',
                  lines: ['CMD ["npm", "start"]'],
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: 'Гибкий запуск с возможностью переопределения команды для тестирования',
                },
              ],
            },
            {
              id: 'card-54',
              title: 'Утилита/CLI',
              blocks: [
                {
                  id: 'inline-code-55',
                  type: 'inline-code',
                  lines: ['ENTRYPOINT ["./cli-tool"]'],
                },
                {
                  id: 'inline-code-56',
                  type: 'inline-code',
                  lines: ['CMD ["--help"]'],
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: 'Контейнер как исполняемый файл с параметрами по умолчанию',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'Система/Сервис',
              blocks: [
                {
                  id: 'inline-code-59',
                  type: 'inline-code',
                  lines: ['RUN setup-service'],
                },
                {
                  id: 'inline-code-60',
                  type: 'inline-code',
                  lines: ['ENTRYPOINT ["service"]'],
                },
                {
                  id: 'inline-code-61',
                  type: 'inline-code',
                  lines: ['CMD ["start"]'],
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: 'Системный сервис с фиксированным поведением',
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
          id: 'cards-63',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Использовать exec форму для CMD/ENTRYPOINT\n- Объединять RUN команды для уменьшения слоев\n- Использовать ENTRYPOINT для фиксированного поведения\n- CMD для параметров по умолчанию\n- Тестировать переопределение команд\n- Обрабатывать сигналы правильно',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Множественные RUN для связанных операций\n- Shell форму без необходимости\n- Сложную логику в CMD/ENTRYPOINT\n- Игнорирование сигналов завершения\n- Хардкод путей в командах\n- Смешивание логики сборки и запуска',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Отладка команд',
      blocks: [
        {
          id: 'callout-70',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-71',
              type: 'prose',
              markdown:
                '**Отладка:** Используйте docker run \\-\\-entrypoint="" image sh для отладки проблем с командами запуска. Это позволит войти в контейнер и протестировать команды вручную.',
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
          id: 'text-72',
          type: 'prose',
          markdown:
            '**RUN** выполняется во время сборки и создает слои образа. **CMD** предоставляет команду по умолчанию, которую можно переопределить. **ENTRYPOINT** определяет главный процесс контейнера, который всегда выполняется. Комбинация ENTRYPOINT \\+ CMD дает максимальную гибкость: фиксированную команду с настраиваемыми параметрами. Понимание этих различий критически важно для создания правильных и предсказуемых Docker образов.',
        },
        {
          id: 'resources-73',
          type: 'resources',
          items: [
            {
              id: 'link-74',
              label: 'Dockerfile Reference',
              url: 'https://docs.docker.com/engine/reference/builder/',
            },
          ],
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Best Practices',
              url: 'https://docs.docker.com/develop/dev-best-practices/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
