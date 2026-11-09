import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-bff-traditionalapproachsnippet.txt?raw'
import example2 from '../snippets/web/web-bff-bffapproachsnippet.txt?raw'
import example3 from '../snippets/web/web-bff-bffserversnippet.txt?raw'
import example4 from '../snippets/web/web-bff-overfetchingsnippet.txt?raw'
import example5 from '../snippets/web/web-bff-underfetchingsnippet.txt?raw'
import example6 from '../snippets/web/web-bff-multiplebffsnippet.txt?raw'
import example7 from '../snippets/web/web-bff-graphqlbffsnippet.txt?raw'
import example8 from '../snippets/web/web-bff-cachingsnippet.txt?raw'
import example9 from '../snippets/web/web-bff-authsnippet.txt?raw'
import example10 from '../snippets/web/web-bff-errorhandlingsnippet.txt?raw'

// Content copied verbatim from src/views/web/BFFInfo.vue.
export default {
  ...articleSummaries.webBFFInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**BFF (Backend For Frontend)** — это архитектурный паттерн, при котором создается специализированный backend слой для каждого типа клиентского приложения (веб, мобильное, desktop). BFF действует как посредник между фронтендом и микросервисами, агрегируя данные и оптимизируя API под конкретные потребности клиента.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Традиционный подход vs BFF',
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
                  text: 'Традиционный подход',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Множество запросов** к разным микросервисам\n- **Сложная логика** на клиенте\n- **Over\\-fetching** — избыточные данные\n- **Under\\-fetching** — недостаток данных\n- **Проблемы с CORS**\n- **Сложное версионирование**',
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
                  text: 'BFF подход',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Один запрос** для всех данных\n- **Простая логика** на клиенте\n- **Точные данные** — только нужное\n- **Агрегация** на сервере\n- **Нет CORS** проблем\n- **Версионирование** на BFF',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-9',
          type: 'heading',
          level: 3,
          text: '❌ Проблемы традиционного подхода',
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-11',
          type: 'heading',
          level: 3,
          text: '✅ Решение с BFF',
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Реализация BFF сервера',
      blocks: [
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            'BFF сервер агрегирует данные из нескольких микросервисов и возвращает оптимизированный ответ:',
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Решение проблемы Over-Fetching',
      blocks: [
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            '**Over\\-fetching** — это получение избыточных данных, которые не используются в UI. BFF позволяет запрашивать только необходимые поля:',
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Решение проблемы Under-Fetching',
      blocks: [
        {
          id: 'text-17',
          type: 'prose',
          markdown:
            '**Under\\-fetching** — это недостаток данных, требующий дополнительных запросов (N\\+1 проблема). BFF решает это через агрегацию:',
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Преимущества BFF',
      blocks: [
        {
          id: 'cards-19',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- Меньше HTTP запросов\n- Параллельные запросы к сервисам\n- Кэширование на уровне BFF\n- Оптимизация размера данных\n- Сжатие и батчинг',
                },
              ],
            },
            {
              id: 'card-23',
              blocks: [
                {
                  id: 'heading-24',
                  type: 'heading',
                  level: 3,
                  text: 'Архитектура',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- Разделение ответственности\n- Специализация под клиента\n- Независимое развертывание\n- Изоляция изменений\n- Простая поддержка',
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
                  text: 'Безопасность',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- Единая точка аутентификации\n- Скрытие внутренних API\n- Контроль доступа\n- Нет прямого доступа к микросервисам\n- Валидация на сервере',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Несколько BFF для разных клиентов',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown:
            'Каждый тип клиента может иметь свой BFF, оптимизированный под специфичные потребности:',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'BFF с GraphQL',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'GraphQL идеально подходит для BFF, решая проблемы over\\-fetching и under\\-fetching на уровне языка запросов:',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Кэширование в BFF',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown: 'BFF может кэшировать агрегированные данные для ускорения ответов:',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Аутентификация и авторизация',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown: 'BFF может быть единой точкой для аутентификации и управления токенами:',
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Обработка ошибок и отказоустойчивость',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown: 'BFF должен gracefully обрабатывать сбои микросервисов:',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Проблемы и решения при использовании BFF',
      blocks: [
        {
          id: 'table-39',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Проблема',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Решение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Дублирование кода**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Логика повторяется между BFF',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Shared библиотеки, общие утилиты',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**Увеличение латентности**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Дополнительный hop',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Кэширование, параллельные запросы',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**Сложность развертывания**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Больше сервисов для поддержки',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Контейнеризация, CI/CD автоматизация',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Согласованность данных**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Кэш может устаревать',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Event\\-driven инвалидация, TTL',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '**Ответственность BFF команды**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Нужна поддержка от фронтенда',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Совместное владение, единая команда',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Точка отказа**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'BFF может стать bottleneck',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Горизонтальное масштабирование, Circuit Breaker',
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
      title: 'Протоколы и форматы данных',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-59',
              title: 'Протоколы',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- **HTTP/HTTPS** — основной протокол\n- **WebSocket** — для real\\-time данных\n- **gRPC** — между BFF и микросервисами\n- **Server\\-Sent Events** — для уведомлений',
                },
              ],
            },
            {
              id: 'card-61',
              title: 'Форматы данных',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- **JSON** — стандартный формат\n- **GraphQL** — гибкие запросы\n- **Protocol Buffers** — эффективная сериализация\n- **MessagePack** — компактный бинарный формат',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Архитектурные паттерны',
      blocks: [
        {
          id: 'cards-63',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: 'Один BFF на клиент',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown: 'Отдельный BFF для веб, iOS, Android',
                },
                {
                  id: 'tags-67',
                  type: 'tags',
                  items: ['Оптимизация'],
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
                  text: 'Универсальный BFF',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown: 'Один BFF для всех клиентов с адаптацией',
                },
                {
                  id: 'tags-71',
                  type: 'tags',
                  items: ['Простота'],
                },
              ],
            },
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: 'GraphQL Gateway',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown: 'BFF как GraphQL федерация',
                },
                {
                  id: 'tags-75',
                  type: 'tags',
                  items: ['Гибкость'],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-76',
          type: 'prose',
          markdown:
            '1. **Что такое BFF и зачем он нужен?**\n   \n   BFF (Backend For Frontend) — это специализированный backend слой для конкретного типа клиента. Он решает проблемы over/under\\-fetching, агрегирует данные из микросервисов, оптимизирует API под нужды клиента и упрощает логику на фронтенде.\n2. **Чем BFF отличается от API Gateway?**\n   \n   API Gateway — это единая точка входа для всех клиентов, занимается маршрутизацией, аутентификацией, rate limiting. BFF — специализирован под конкретный клиент, агрегирует данные и трансформирует их под нужды UI. Может быть несколько BFF за одним Gateway.\n3. **Как BFF решает проблему over\\-fetching?**\n   \n   BFF запрашивает полные данные из микросервисов, но возвращает клиенту только необходимые поля, уменьшая размер payload и экономя трафик. Клиент получает ровно те данные, которые нужны для UI.\n4. **Как BFF решает проблему under\\-fetching?**\n   \n   BFF агрегирует данные из нескольких микросервисов в один запрос, решая N\\+1 проблему. Вместо множества последовательных запросов клиент делает один, а BFF параллельно запрашивает все необходимые данные.\n5. **Какие проблемы возникают при использовании BFF?**\n   \n   Основные проблемы: дублирование кода между BFF, увеличение латентности (дополнительный hop), сложность развертывания, проблемы с согласованностью кэша, BFF может стать bottleneck. Решения: shared библиотеки, кэширование, горизонтальное масштабирование.\n6. **Сколько BFF нужно создавать?**\n   \n   Зависит от требований: можно создать один BFF на каждый тип клиента (Web, iOS, Android), один универсальный BFF с адаптацией, или комбинированный подход. Важно балансировать между оптимизацией и сложностью поддержки.',
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-77',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Кэширование агрегированных данных\n- Параллельные запросы к сервисам\n- Circuit Breaker для отказоустойчивости\n- Graceful degradation при ошибках\n- Мониторинг и логирование\n- Версионирование API',
                },
              ],
            },
            {
              id: 'card-81',
              blocks: [
                {
                  id: 'heading-82',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Бизнес\\-логика в BFF\n- Последовательные запросы\n- Отсутствие обработки ошибок\n- Игнорирование таймаутов\n- Дублирование кода без shared libs\n- Прямой доступ к БД из BFF',
                },
              ],
            },
            {
              id: 'card-84',
              blocks: [
                {
                  id: 'heading-85',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Используйте TypeScript для типизации\n- Внедряйте метрики и трейсинг\n- Автоматизируйте тестирование\n- Документируйте API (OpenAPI/Swagger)\n- Настройте CI/CD пайплайны\n- Применяйте GraphQL для гибкости',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Итог',
      blocks: [
        {
          id: 'text-87',
          type: 'prose',
          markdown:
            '**BFF (Backend For Frontend)** — это архитектурный паттерн, который создает специализированный backend слой между клиентом и микросервисами. BFF решает проблемы over\\-fetching и under\\-fetching, агрегирует данные, оптимизирует API под нужды конкретного клиента и упрощает фронтенд логику. Несмотря на дополнительную сложность, BFF значительно улучшает производительность, архитектуру и developer experience в микросервисных приложениях.',
        },
        {
          id: 'resources-88',
          type: 'resources',
          items: [
            {
              id: 'link-89',
              label: 'Sam Newman: BFF Pattern',
              url: 'https://samnewman.io/patterns/architectural/bff/',
            },
          ],
        },
        {
          id: 'resources-90',
          type: 'resources',
          items: [
            {
              id: 'link-91',
              label: 'Phil Calçado: BFF',
              url: 'https://philcalcado.com/2015/09/18/the_back_end_for_front_end_pattern_bff.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
