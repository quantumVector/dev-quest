import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-intro-dockerfilesnippet.txt?raw'
import example2 from '../snippets/docker/docker-intro-commandssnippet.txt?raw'
import example3 from '../snippets/docker/docker-intro-dockercomposesnippet.txt?raw'

// Content copied verbatim from src/views/docker/Docker.vue.
export default {
  ...articleSummaries.dockerDocker,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Docker** — это платформа контейнеризации, которая позволяет упаковывать приложения со всеми их зависимостями в легковесные, переносимые контейнеры. Docker решает проблему *"у меня работает, а у вас не работает"* и обеспечивает консистентную среду выполнения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные понятия Docker',
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
                  text: 'Образ (Image)',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Шаблон** для создания контейнеров\n- **Неизменяемый** (immutable)\n- Содержит ОС, приложение, зависимости\n- Создается из Dockerfile\n- Может быть слоистым (layers)\n- Хранится в реестрах (Docker Hub)',
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
                  text: 'Контейнер (Container)',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Экземпляр** образа\n- **Изменяемый** (mutable)\n- Изолированная среда выполнения\n- Можно запускать, останавливать, удалять\n- Имеет свою файловую систему\n- Делит ядро ОС с хостом',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Аналогия: Образ vs Контейнер',
      blocks: [
        {
          id: 'table-9',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аналогия',
            },
            {
              id: 'column-2',
              label: 'Образ (Image)',
            },
            {
              id: 'column-3',
              label: 'Контейнер (Container)',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**Программирование**',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Класс (Class)',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Объект/Экземпляр (Instance)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**Кулинария**',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Рецепт блюда',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Готовое блюдо',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**Архитектура**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Чертеж здания',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Построенное здание',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Музыка**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Ноты композиции',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Исполнение композиции',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Что решает Docker?',
      blocks: [
        {
          id: 'cards-22',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'Консистентность',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: 'Одинаковое поведение на всех окружениях: dev, test, production',
                },
              ],
            },
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: 'Быстрое развертывание',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: 'Запуск приложения за секунды, а не минуты',
                },
              ],
            },
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: 'Изоляция',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Приложения не влияют друг на друга',
                },
              ],
            },
          ],
        },
        {
          id: 'cards-32',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-33',
              blocks: [
                {
                  id: 'heading-34',
                  type: 'heading',
                  level: 3,
                  text: 'Масштабируемость',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown: 'Легко создать несколько экземпляров приложения',
                },
              ],
            },
            {
              id: 'card-36',
              blocks: [
                {
                  id: 'heading-37',
                  type: 'heading',
                  level: 3,
                  text: 'Портативность',
                },
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown: 'Работает на любой системе с Docker',
                },
              ],
            },
            {
              id: 'card-39',
              blocks: [
                {
                  id: 'heading-40',
                  type: 'heading',
                  level: 3,
                  text: 'Эффективность',
                },
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown: 'Меньше ресурсов чем виртуальные машины',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Dockerfile - создание образа',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'docker',
          code: example1,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Основные команды Docker',
      blocks: [
        {
          id: 'code-43',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Docker Compose - многоконтейнерные приложения',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'yaml',
          code: example3,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Docker vs Виртуальные машины',
      blocks: [
        {
          id: 'table-45',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Docker контейнеры',
            },
            {
              id: 'column-3',
              label: 'Виртуальные машины',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**Ресурсы**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Легковесные (MB)',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Тяжелые (GB)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Запуск**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Секунды',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Минуты',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '**Изоляция**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Процессы',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Полная (гипервизор)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**ОС**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Общее ядро',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Отдельные ОС',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '**Плотность**',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Тысячи контейнеров',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Десятки VM',
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
      title: 'Архитектура Docker',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-62',
              title: 'Компоненты',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- **Docker Client:** CLI интерфейс\n- **Docker Daemon:** фоновый процесс\n- **Docker Registry:** хранилище образов\n- **Docker Objects:** образы, контейнеры, volumes',
                },
              ],
            },
            {
              id: 'card-64',
              title: 'Принцип работы',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    "1. Client отправляет команду Daemon'у\n2. Daemon управляет объектами Docker\n3. Registry хранит и распространяет образы\n4. Контейнеры запускаются из образов",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Жизненный цикл контейнера',
      blocks: [
        {
          id: 'steps-66',
          type: 'steps',
          mode: 'sequence',
          showTitle: false,
          items: [
            {
              id: 'step-67',
              title: 'Created',
              blocks: [],
            },
            {
              id: 'step-68',
              title: 'Running',
              blocks: [],
            },
            {
              id: 'step-69',
              title: 'Paused',
              blocks: [],
            },
            {
              id: 'step-70',
              title: 'Stopped',
              blocks: [],
            },
            {
              id: 'step-71',
              title: 'Deleted',
              blocks: [],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Основные концепции Docker',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-73',
              title: 'Слои (Layers)',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Образы состоят из слоев\n- Каждая инструкция в Dockerfile = слой\n- Слои кешируются и переиспользуются\n- Только верхний слой изменяемый',
                },
              ],
            },
            {
              id: 'card-75',
              title: 'Volumes',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Персистентное хранение данных\n- Разделение данных между контейнерами\n- Backup и восстановление\n- Привязка к хост\\-системе',
                },
              ],
            },
          ],
        },
        {
          id: 'cards-77',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-78',
              title: 'Networks',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Изоляция сетевого трафика\n- Связь между контейнерами\n- Bridge, Host, None, Overlay\n- DNS resolution между контейнерами',
                },
              ],
            },
            {
              id: 'card-80',
              title: 'Environment Variables',
              blocks: [
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Конфигурация приложений\n- Передача секретов\n- Разные настройки для окружений\n- Файлы .env и docker\\-compose',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-82',
          type: 'prose',
          markdown:
            '1. **В чем разница между образом и контейнером?**\n   \n   Образ — это неизменяемый шаблон (как класс в программировании), контейнер — это запущенный экземпляр образа (как объект класса). Из одного образа можно создать множество контейнеров.\n2. **Что такое слои в Docker?**\n   \n   Слои — это инкрементальные изменения образа. Каждая инструкция в Dockerfile создает новый слой. Слои кешируются и переиспользуются, что экономит место и время.\n3. **Как обеспечить персистентность данных?**\n   \n   Используя volumes — именованные хранилища данных, которые существуют независимо от жизненного цикла контейнера. Также можно использовать bind mounts.\n4. **В чем преимущества Docker перед VM?**\n   \n   Docker использует меньше ресурсов, быстрее запускается, обеспечивает большую плотность развертывания. VM обеспечивают лучшую изоляцию, но потребляют больше ресурсов.\n5. **Что такое Docker Compose?**\n   \n   Инструмент для определения и запуска многоконтейнерных приложений с помощью YAML файла. Позволяет описать сервисы, сети и volumes в одном конфигурационном файле.\n6. **Как контейнеры взаимодействуют между собой?**\n   \n   Через Docker networks. Контейнеры в одной сети могут обращаться друг к другу по именам контейнеров или сервисов, Docker обеспечивает DNS resolution.\n7. **Что такое multi\\-stage builds?**\n   \n   Возможность использовать несколько FROM инструкций в одном Dockerfile для создания промежуточных образов и копирования только нужных файлов в финальный образ.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики Docker',
      blocks: [
        {
          id: 'cards-83',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-84',
              blocks: [
                {
                  id: 'heading-85',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Использовать .dockerignore\n- Минимизировать количество слоев\n- Использовать alpine образы\n- Запускать как non\\-root user\n- Использовать multi\\-stage builds\n- Версионировать образы',
                },
              ],
            },
            {
              id: 'card-87',
              blocks: [
                {
                  id: 'heading-88',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- Хранить секреты в образах\n- Использовать latest в production\n- Большие образы с ненужными пакетами\n- Запуск под root\n- Хранение данных в контейнере\n- Один контейнер — много процессов',
                },
              ],
            },
            {
              id: 'card-90',
              blocks: [
                {
                  id: 'heading-91',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-92',
                  type: 'prose',
                  markdown:
                    '- Сетевая безопасность\n- Ограничения ресурсов\n- Логирование и мониторинг\n- Обновления базовых образов\n- Backup volumes\n- Healthcheck настройки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Использование в разработке',
      blocks: [
        {
          id: 'cards-93',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-94',
              title: 'Development',
              blocks: [
                {
                  id: 'text-95',
                  type: 'prose',
                  markdown:
                    '- Одинаковая среда у всех разработчиков\n- Быстрая настройка окружения\n- Изоляция проектов\n- Простое переключение между версиями',
                },
              ],
            },
            {
              id: 'card-96',
              title: 'Production',
              blocks: [
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Масштабирование приложений\n- Zero\\-downtime deployments\n- Микросервисная архитектура\n- Оркестрация с Kubernetes',
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
          id: 'text-98',
          type: 'prose',
          markdown:
            'Docker — это платформа контейнеризации, которая решает проблемы консистентности, развертывания и масштабирования приложений. **Образ** — это неизменяемый шаблон с приложением и его зависимостями, а **контейнер** — это запущенный экземпляр образа. Docker обеспечивает изоляцию, портативность и эффективное использование ресурсов, что делает его стандартом для современной разработки и развертывания приложений.',
        },
        {
          id: 'resources-99',
          type: 'resources',
          items: [
            {
              id: 'link-100',
              label: 'Docker Docs',
              url: 'https://docs.docker.com/',
            },
          ],
        },
        {
          id: 'resources-101',
          type: 'resources',
          items: [
            {
              id: 'link-102',
              label: 'Docker Hub',
              url: 'https://hub.docker.com/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
