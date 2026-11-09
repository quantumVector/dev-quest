import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-multi-stage-reactspadockerfile.txt?raw'
import example2 from '../snippets/docker/docker-multi-stage-nginxconfig.txt?raw'
import example3 from '../snippets/docker/docker-multi-stage-nextjsdockerfile.txt?raw'
import example4 from '../snippets/docker/docker-multi-stage-comparisonexample.txt?raw'
import example5 from '../snippets/docker/docker-multi-stage-dockercomposeexample.txt?raw'

// Content copied verbatim from src/views/docker/MultiStage.vue.
export default {
  ...articleSummaries.dockerMultiStage,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Multi\\-stage builds** — это возможность использовать несколько `FROM` инструкций в одном Dockerfile для создания промежуточных образов и копирования только нужных файлов в финальный образ. Это кардинально различается для **React SPA** (статические файлы) и **Next.js SSR** (серверное приложение).',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужны Multi-stage builds?',
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
                  text: 'Размер образа',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Уменьшение с 1.2GB до 50MB за счет исключения build инструментов',
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
                  text: 'Безопасность',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Исключение исходного кода, dev зависимостей и build инструментов',
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
                  text: 'Производительность',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Быстрый запуск, меньше сетевого трафика, оптимальный рантайм',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'React SPA: Билд в Node → Рантайм в Nginx',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Концепция:** React SPA компилируется в статические файлы (HTML, CSS, JS), которые можно отдавать через любой веб\\-сервер. Node.js нужен только для сборки!',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'docker',
          code: example1,
        },
        {
          id: 'heading-15',
          type: 'heading',
          level: 3,
          text: 'Конфигурация Nginx для SPA',
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Next.js SSR: Серверное приложение',
      blocks: [
        {
          id: 'callout-17',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-18',
              type: 'prose',
              markdown:
                '**Отличие:** Next.js с SSR требует Node.js сервера в рантайме для генерации HTML на сервере и обработки API маршрутов. Это не статические файлы!',
            },
          ],
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'docker',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Ключевые различия: SPA vs SSR',
      blocks: [
        {
          id: 'table-20',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'React SPA',
            },
            {
              id: 'column-3',
              label: 'Next.js SSR',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Рантайм сервер**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Nginx (статические файлы)',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Node.js (серверное приложение)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Размер образа**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '~50MB (Nginx \\+ статика)',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '~200MB (Node \\+ приложение)',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Время старта**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Мгновенно',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '2\\-5 секунд (Bootstrap Node.js)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Масштабирование**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'CDN \\+ статические файлы',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Горизонтальное масштабирование серверов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Ресурсы**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Минимальные (только память)',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'CPU \\+ память для обработки запросов',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Безопасность**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Статические файлы \\+ Nginx',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Node.js сервер \\+ API уязвимости',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Кеширование**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Browser \\+ CDN кеш',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'ISR, SSG, динамическое кеширование',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение размеров образов',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'docker',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Docker Compose для разных стратегий',
      blocks: [
        {
          id: 'code-43',
          type: 'code',
          language: 'yaml',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Архитектурные различия',
      blocks: [
        {
          id: 'cards-44',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-45',
              title: 'React SPA',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: 'Статические файлы',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- **Build:** Node.js компилирует в HTML/CSS/JS\n- **Runtime:** Nginx отдает статические файлы\n- **Роутинг:** Client\\-side (React Router)\n- **Гидратация:** Полная на клиенте\n- **SEO:** Проблемы без SSG/Prerendering',
                },
              ],
            },
            {
              id: 'card-48',
              title: 'Next.js SSR',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown: 'Серверное приложение',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- **Build:** Next.js компилирует серверный код\n- **Runtime:** Node.js сервер\n- **Роутинг:** Server\\-side \\+ Client\\-side\n- **Рендеринг:** Server → Client гидратация\n- **SEO:** Отличная поддержка',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-51',
          type: 'prose',
          markdown:
            '1. **Почему для React SPA используется Nginx, а не Node.js в production?**\n   \n   React SPA компилируется в статические файлы, которым не нужен JavaScript runtime. Nginx оптимизирован для отдачи статики: меньше ресурсов, выше производительность, лучшее кеширование и gzip сжатие из коробки.\n2. **Чем Next.js SSR кардинально отличается от SPA в контексте Docker?**\n   \n   Next.js SSR требует Node.js сервера в рантайме для server\\-side рендеринга и API routes. SPA нужен Node.js только для сборки, в рантайме работает статика через веб\\-сервер.\n3. **Как multi\\-stage builds экономят место?**\n   \n   Build стадия включает TypeScript, Webpack, dev зависимости (~1GB). Production стадия копирует только результат сборки. Для SPA — статические файлы (~50MB), для SSR — скомпилированное приложение (~200MB).\n4. **Можно ли использовать одинаковый подход для SPA и SSR?**\n   \n   Нет! SPA можно отдавать через CDN как статику, SSR требует серверной инфраструктуры. Разные стратегии кеширования, масштабирования и deployment.\n5. **Какие проблемы решает разделение на стадии?**\n   \n   Безопасность (нет исходного кода), размер образа (95% экономия для SPA), быстрый старт контейнеров, оптимизированный рантайм без лишних зависимостей.\n6. **Как обеспечить client\\-side роутинг в SPA через Nginx?**\n   \n   Директива `try_files $uri $uri/ /index.html` перенаправляет все несуществующие маршруты на index.html, позволяя React Router обрабатывать роутинг на клиенте.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда использовать каждый подход?',
      blocks: [
        {
          id: 'cards-52',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-53',
              title: 'React SPA + Nginx',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: 'Используйте когда:',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- Статическое содержимое\n- CSR (Client\\-Side Rendering)\n- Максимальная производительность\n- CDN distribution\n- Простота deployment\n- Минимальные ресурсы сервера',
                },
              ],
            },
            {
              id: 'card-56',
              title: 'Next.js SSR + Node',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: 'Используйте когда:',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- SEO критичен\n- Server\\-Side Rendering\n- API routes в том же приложении\n- Динамический контент\n- ISR (Incremental Static Regeneration)\n- Сложная серверная логика',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики Multi-stage builds',
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
                  text: '✅ Общие практики',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Используйте alpine образы\n- Кешируйте зависимости отдельно\n- Именуйте стадии (AS builder)\n- Минимизируйте слои\n- Используйте .dockerignore\n- Создавайте non\\-root пользователей',
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
                  text: '📁 SPA специфика',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Копируйте только /build папку\n- Настройте gzip в Nginx\n- Включите кеширование статики\n- Обеспечьте SPA роутинг\n- Добавьте security headers\n- Оптимизируйте для CDN',
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
                  text: '⚡ SSR специфика',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Копируйте .next/standalone\n- Настройте health checks\n- Ограничьте память/CPU\n- Используйте graceful shutdown\n- Настройте логирование\n- Подготовьте к масштабированию',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Итог',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '**Multi\\-stage builds** кардинально различаются для SPA и SSR приложений. **React SPA** компилируется в статические файлы и отдается через Nginx (экономия 95% места), **Next.js SSR** требует Node.js сервера в рантайме для server\\-side рендеринга. Выбор подхода зависит от архитектурных требований: статика vs динамический контент, SEO требования, и стратегии масштабирования.',
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'Docker Multi-stage',
              url: 'https://docs.docker.com/build/building/multi-stage/',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'Next.js Docker Guide',
              url: 'https://nextjs.org/docs/deployment#docker-image',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
