import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-ssr-csrflowsnippet.txt?raw'
import example2 from '../snippets/web/web-ssr-ssrflowsnippet.txt?raw'
import example3 from '../snippets/web/web-ssr-nextjsexamplesnippet.txt?raw'
import example4 from '../snippets/web/web-ssr-nuxtexamplesnippet.txt?raw'
import example5 from '../snippets/web/web-ssr-hydrationsnippet.txt?raw'
import example6 from '../snippets/web/web-ssr-seocomparisonsnippet.txt?raw'
import example7 from '../snippets/web/web-ssr-performancesnippet.txt?raw'
import example8 from '../snippets/web/web-ssr-cachingstrategysnippet.txt?raw'
import example9 from '../snippets/web/web-ssr-challengessnippet.txt?raw'
import example10 from '../snippets/web/web-ssr-streamingsnippet.txt?raw'

// Content copied verbatim from src/views/web/SSR.vue.
export default {
  ...articleSummaries.webSSR,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Server\\-Side Rendering (SSR)** — это техника рендеринга веб\\-приложений, при которой HTML генерируется на сервере для каждого запроса, а не в браузере пользователя. Браузер получает готовую HTML\\-страницу с контентом, которая затем "оживляется" (hydration) JavaScript для добавления интерактивности.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основной принцип: CSR vs SSR',
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
                  text: 'CSR (Client-Side)',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '1. Сервер → пустой HTML\n2. Браузер → загрузка JS (500KB\\+)\n3. JS → рендеринг компонентов\n4. Запрос к API\n5. Отображение контента',
                },
                {
                  id: 'tags-6',
                  type: 'tags',
                  items: ['FCP: ~3-4s'],
                },
              ],
            },
            {
              id: 'card-7',
              blocks: [
                {
                  id: 'heading-8',
                  type: 'heading',
                  level: 3,
                  text: 'SSR (Server-Side)',
                },
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    '1. Запрос к API на сервере\n2. Рендеринг HTML с данными\n3. Сервер → готовый HTML\n4. Браузер → мгновенный контент\n5. JS → гидратация (интерактивность)',
                },
                {
                  id: 'tags-10',
                  type: 'tags',
                  items: ['FCP: ~0.8-1.2s'],
                },
              ],
            },
          ],
        },
        {
          id: 'heading-11',
          type: 'heading',
          level: 3,
          text: 'CSR — как это работает',
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-13',
          type: 'heading',
          level: 3,
          text: 'SSR — как это работает',
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Преимущества SSR над CSR',
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
                  text: 'Производительность',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- Быстрый **First Contentful Paint**\n- Лучший **LCP** (Core Web Vital)\n- Контент виден мгновенно\n- Меньше нагрузки на клиента',
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
                  text: 'SEO',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    '- Поисковики видят полный контент\n- Мета\\-теги генерируются динамически\n- Open Graph для соцсетей\n- Структурированные данные',
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
                  text: 'UX',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- Работает на медленных сетях\n- Доступно на слабых устройствах\n- Нет белого экрана загрузки\n- Лучше для мобильных',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Примеры реализации',
      blocks: [
        {
          id: 'heading-25',
          type: 'heading',
          level: 3,
          text: 'Next.js (React) - SSR и Server Components',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-27',
          type: 'heading',
          level: 3,
          text: 'Nuxt.js (Vue) - SSR',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Hydration — ключевая концепция SSR',
      blocks: [
        {
          id: 'callout-29',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-30',
              type: 'prose',
              markdown:
                '**Hydration (гидратация)** — процесс "оживления" статического HTML, при котором JavaScript прикрепляет обработчики событий и делает страницу интерактивной.',
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'SEO: CSR vs SSR',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Влияние на производительность',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Стратегии кэширования',
      blocks: [
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Проблемы и решения при использовании SSR',
      blocks: [
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'React 18+ Streaming SSR',
      blocks: [
        {
          id: 'callout-36',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-37',
              type: 'prose',
              markdown:
                '**Современный подход:** Streaming SSR позволяет отправлять HTML по частям, не дожидаясь всех данных. Пользователь видит контент моментально!',
            },
          ],
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
      id: 'section-10',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-39',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'CSR',
            },
            {
              id: 'column-3',
              label: 'SSR',
            },
            {
              id: 'column-4',
              label: 'SSG',
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
                    markdown: '**FCP (First Contentful Paint)**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '~3\\-4s',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '~0.8\\-1.2s',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '~0.5s',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**SEO**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Ограниченное',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Отличное',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Отличное',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '**TTFB (Time to First Byte)**',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '~200ms',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '~500ms',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '~100ms',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '**Нагрузка на сервер**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Динамический контент**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Отлично',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Отлично',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Ограниченно',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**Кэширование**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Простое (CDN)',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Сложное',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Простое (CDN)',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '**Стоимость хостинга**',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Интерактивность**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Мгновенная',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'После hydration',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'После hydration',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Когда использовать SSR?',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-73',
              title: '✅ SSR подходит для:',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- E\\-commerce сайтов (SEO критично)\n- Блогов и новостных порталов\n- Landing pages\n- Маркетинговых сайтов\n- Контента для соцсетей (Open Graph)\n- Приложений для медленных сетей\n- Когда важен First Contentful Paint',
                },
              ],
            },
            {
              id: 'card-75',
              title: '⚠️ CSR лучше для:',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Интранет приложений (SEO не важно)\n- Админ панелей\n- Дашбордов с real\\-time данными\n- Приложений за авторизацией\n- Интерактивных SaaS продуктов\n- Когда нужна мгновенная интерактивность\n- Когда сервер ресурсы ограничены',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-77',
          type: 'prose',
          markdown:
            '1. **В чем разница между SSR и SSG (Static Site Generation)?**\n   \n   **SSR** генерирует HTML для каждого запроса в runtime. **SSG** генерирует HTML в build time один раз. SSG быстрее и дешевле, но подходит только для статического контента. SSR позволяет работать с динамическими данными.\n2. **Что такое hydration mismatch и как его избежать?**\n   \n   Hydration mismatch — когда HTML на сервере отличается от HTML на клиенте. Возникает при использовании `Date.now()`, `Math.random()`, `window` и т.д. Решение: использовать одинаковые данные или `suppressHydrationWarning`.\n3. **Как SSR влияет на Core Web Vitals?**\n   \n   SSR значительно улучшает **LCP** (Largest Contentful Paint) и **FCP** (First Contentful Paint), так как контент виден мгновенно. Однако **TTI** (Time to Interactive) может быть хуже из\\-за гидратации. **CLS** (Cumulative Layout Shift) нужно контролировать.\n4. **Можно ли комбинировать SSR и CSR?**\n   \n   Да! Это называется **гибридный рендеринг**. Критичный контент рендерится на сервере (SSR), а интерактивные части загружаются динамически на клиенте (CSR). Next.js и Nuxt.js это поддерживают.\n5. **Как работает ISR (Incremental Static Regeneration)?**\n   \n   ISR — это компромисс между SSG и SSR. Страницы генерируются статически, но периодически обновляются в фоне. Первый запрос получает старую версию, затем страница регенерируется. Next.js: `revalidate: 60` — обновление каждые 60 секунд.\n6. **Почему TTFB в SSR выше, чем в CSR?**\n   \n   Потому что сервер должен выполнить рендеринг и API запросы перед отправкой HTML. В CSR сервер отдает пустой HTML мгновенно. Решение: кэширование, параллельные запросы, streaming SSR, edge rendering.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Современные фреймворки с SSR',
      blocks: [
        {
          id: 'table-78',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Фреймворк',
            },
            {
              id: 'column-2',
              label: 'Библиотека',
            },
            {
              id: 'column-3',
              label: 'Особенности',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '**Next.js**',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'React',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'SSR, SSG, ISR, Server Components, Streaming',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**Nuxt.js**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Vue',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'SSR, SSG, ISR, Auto imports, File\\-based routing',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**SvelteKit**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Svelte',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'SSR, SSG, Адаптеры для разных платформ',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '**Remix**',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'React',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Nested routing, Progressive enhancement',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '**Astro**',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Агностик',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Partial hydration, Islands architecture',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-94',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-95',
              blocks: [
                {
                  id: 'heading-96',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Кэшировать результаты SSR\n- Использовать ISR для контента\n- Оптимизировать API запросы\n- Применять Streaming SSR\n- Мониторить TTFB\n- Использовать CDN/Edge',
                },
              ],
            },
            {
              id: 'card-98',
              blocks: [
                {
                  id: 'heading-99',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Browser APIs на сервере\n- Разные данные сервер/клиент\n- Медленные API без кэша\n- Последовательные запросы\n- Memory leaks на сервере\n- Сложная логика в рендере',
                },
              ],
            },
            {
              id: 'card-101',
              blocks: [
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Используйте гибридный подход\n- Профилируйте SSR производительность\n- Тестируйте hydration\n- Настройте proper error boundaries\n- Изучите Server Components\n- Документируйте SSR особенности',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-104',
          type: 'prose',
          markdown:
            '**SSR (Server\\-Side Rendering)** — мощная техника, которая улучшает производительность, SEO и пользовательский опыт за счет генерации готового HTML на сервере. Современные фреймворки (Next.js, Nuxt.js) делают SSR доступным и эффективным. Ключевые концепции: **гидратация**, **streaming**, **ISR** и правильное **кэширование**. Выбор между CSR и SSR зависит от требований проекта: SEO, производительность, сложность инфраструктуры.',
        },
        {
          id: 'resources-105',
          type: 'resources',
          items: [
            {
              id: 'link-106',
              label: 'Next.js SSR Docs',
              url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components',
            },
          ],
        },
        {
          id: 'resources-107',
          type: 'resources',
          items: [
            {
              id: 'link-108',
              label: 'Nuxt.js SSR Docs',
              url: 'https://nuxt.com/docs/guide/concepts/rendering',
            },
          ],
        },
        {
          id: 'resources-109',
          type: 'resources',
          items: [
            {
              id: 'link-110',
              label: 'Web.dev: Rendering',
              url: 'https://web.dev/rendering-on-the-web/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
