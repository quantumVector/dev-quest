import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-layers-and-cache-layerexamplesnippet.txt?raw'
import example2 from '../snippets/docker/docker-layers-and-cache-baddockerfilesnippet.txt?raw'
import example3 from '../snippets/docker/docker-layers-and-cache-gooddockerfilesnippet.txt?raw'
import example4 from '../snippets/docker/docker-layers-and-cache-cachescenariosnippet.txt?raw'
import example5 from '../snippets/docker/docker-layers-and-cache-commandssnippet.txt?raw'
import example6 from '../snippets/docker/docker-layers-and-cache-optimizationsnippet.txt?raw'

// Content copied verbatim from src/views/docker/DockerLayersAndCache.vue.
export default {
  ...articleSummaries.dockerDockerLayersAndCache,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Ключевой принцип Docker:** каждая инструкция в Dockerfile создает новый слой. Понимание работы слоев и кэширования критически важно для эффективной сборки образов. Почему мы копируем `package.json` перед `npm install`, а исходный код — в последнюю очередь?',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы: что такое слои Docker?',
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
                  text: 'Слой (Layer)',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Неизменяемая** файловая система\n- **Результат** выполнения инструкции\n- **Кэшируется** по содержимому\n- **Переиспользуется** между образами\n- **Накладывается** поверх предыдущих',
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
                  text: 'Кэш',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Проверяется** перед каждой инструкцией\n- **Инвалидируется** при изменениях\n- **Ускоряет** повторные сборки\n- **Зависит** от порядка инструкций\n- **Общий** для всех образов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Каждая инструкция = новый слой',
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
      title: '❌ Неправильный подход',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Проблема:** При любом изменении кода зависимости устанавливаются заново, даже если package.json не изменился!',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'docker',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '✅ Правильный подход',
      blocks: [
        {
          id: 'callout-13',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-14',
              type: 'prose',
              markdown:
                '**Преимущество:** Зависимости кэшируются отдельно от исходного кода. При изменении кода npm ci не выполняется!',
            },
          ],
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'docker',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Как работает кэширование слоев',
      blocks: [
        {
          id: 'steps-16',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-17',
              title: 'Проверка кэша',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: '1. Проверка кэша',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Docker проверяет, есть ли уже готовый слой для данной инструкции',
                },
              ],
            },
            {
              id: 'step-20',
              title: 'Сравнение',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: '2. Сравнение',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    'Сравнивается контрольная сумма (checksum) файлов и содержимого команды',
                },
              ],
            },
            {
              id: 'step-23',
              title: 'Cache HIT',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: '3. Cache HIT',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    'Если найден идентичный слой — используется готовый, инструкция пропускается',
                },
              ],
            },
            {
              id: 'step-26',
              title: 'Cache MISS',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: '4. Cache MISS',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    'Если слой не найден — выполняется инструкция, все последующие слои инвалидируются',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сценарии кэширования',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Почему именно такой порядок?',
      blocks: [
        {
          id: 'cards-30',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-31',
              blocks: [
                {
                  id: 'heading-32',
                  type: 'heading',
                  level: 3,
                  text: 'package.json первым',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    'Зависимости изменяются редко. Копируем файлы зависимостей в отдельный слой',
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
                  text: 'npm ci после',
                },
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    'Установка зависимостей в отдельном слое. Кэшируется, пока package.json не изменится',
                },
              ],
            },
            {
              id: 'card-37',
              blocks: [
                {
                  id: 'heading-38',
                  type: 'heading',
                  level: 3,
                  text: 'Исходники в конце',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    'Код изменяется часто. Копируем последним, чтобы не инвалидировать кэш зависимостей',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические команды',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'bash',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Продвинутые техники оптимизации',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'docker',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            '1. **Что происходит при изменении одного слоя?**\n   \n   Инвалидируются все последующие слои. Если изменился слой 3, то слои 4, 5, 6... будут пересобраны, даже если их инструкции не изменились. Поэтому порядок критически важен.\n2. **Почему COPY package.json делают отдельно от COPY . ?**\n   \n   Чтобы разделить зависимости и исходный код в разные слои. При изменении исходников слой с зависимостями остается в кэше, и npm install не выполняется повторно.\n3. **Как Docker определяет, что слой изменился?**\n   \n   По контрольной сумме (checksum) файлов для COPY/ADD инструкций и по тексту команды для RUN. Если хэш отличается от кэшированного — слой пересобирается.\n4. **Что такое cache busting?**\n   \n   Намеренная инвалидация кэша, например, добавление случайного числа в команду: RUN apt\\-get update &amp;&amp; echo "Cache bust: $(date)". Используется редко.\n5. **Влияет ли порядок файлов в COPY на кэш?**\n   \n   Да! COPY src/ dest/ и COPY public/ src/ dest/ создают разные слои с разными хэшами. Изменение любого файла в копируемой папке инвалидирует весь слой.\n6. **Зачем группировать RUN команды?**\n   \n   Каждый RUN создает слой. Группировка (RUN cmd1 &amp;&amp; cmd2 &amp;&amp; cmd3) создает один слой вместо трех, уменьшая размер образа и количество слоев.\n7. **Что такое dangling layers?**\n   \n   "Висячие" слои — промежуточные слои, не связанные ни с одним образом. Появляются при пересборке и занимают место. Очищаются через docker image prune.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Оптимизация по частоте изменений',
      blocks: [
        {
          id: 'table-43',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Компонент',
            },
            {
              id: 'column-2',
              label: 'Частота изменений',
            },
            {
              id: 'column-3',
              label: 'Порядок в Dockerfile',
            },
            {
              id: 'column-4',
              label: 'Обоснование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**Базовый образ**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**Очень редко**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '1\\. FROM',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Основа для всех слоев',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '**Системные пакеты**',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Редко**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '2\\. RUN apt\\-get install',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Стабильная инфраструктура',
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
                    markdown: '**package.json**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Иногда**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '3\\. COPY package\\*.json',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Зависимости изменяются реже кода',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Установка зависимостей**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Иногда**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '4\\. RUN npm ci',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Только при изменении package.json',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**Исходный код**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Часто**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '5\\. COPY src/',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Изменяется при каждом коммите',
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
      title: 'Измерение эффективности кэша',
      blocks: [
        {
          id: 'cards-64',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-65',
              title: 'Без оптимизации',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- **Время сборки:** 5\\-10 минут\n- **npm install:** каждая сборка\n- **Сетевой трафик:** скачивание пакетов\n- **CPU нагрузка:** высокая\n- **Размер слоев:** дублирование',
                },
              ],
            },
            {
              id: 'card-67',
              title: 'С оптимизацией',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- **Время сборки:** 30\\-60 секунд\n- **npm install:** только при изменении deps\n- **Сетевой трафик:** минимальный\n- **CPU нагрузка:** низкая\n- **Размер слоев:** переиспользование',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики кэширования',
      blocks: [
        {
          id: 'cards-69',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-70',
              blocks: [
                {
                  id: 'heading-71',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Копировать зависимости первыми\n- Группировать похожие команды\n- Использовать .dockerignore\n- Мониторить размер слоев\n- Применять multi\\-stage builds\n- Минимизировать изменения в начальных слоях',
                },
              ],
            },
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- COPY . . в начале Dockerfile\n- Частое использование \\-\\-no\\-cache\n- Изменение порядка инструкций без причины\n- Множество мелких RUN команд\n- Игнорирование размера контекста\n- Копирование ненужных файлов',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Анализируйте docker history\n- Тестируйте разные варианты\n- Используйте BuildKit\n- Настройте CI/CD кэширование\n- Документируйте оптимизации\n- Обучайте команду принципам',
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
          id: 'text-79',
          type: 'prose',
          markdown:
            '**Порядок инструкций в Dockerfile критически важен** для эффективного кэширования. Принцип **"от редко изменяемого к часто изменяемому"** позволяет максимально использовать кэш. Копирование `package.json` → `npm ci` → `COPY исходников` обеспечивает, что зависимости переустанавливаются только при их реальном изменении, а не при каждом изменении кода.',
        },
        {
          id: 'resources-80',
          type: 'resources',
          items: [
            {
              id: 'link-81',
              label: 'Best Practices',
              url: 'https://docs.docker.com/develop/dev-best-practices/',
            },
          ],
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'Build Cache',
              url: 'https://docs.docker.com/build/cache/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
