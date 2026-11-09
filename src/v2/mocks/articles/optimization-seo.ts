import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-seo-metatagssnippet.txt?raw'
import example2 from '../snippets/optimization/optimization-seo-opengraphsnippet.txt?raw'
import example3 from '../snippets/optimization/optimization-seo-schemaorgsnippet.txt?raw'
import example4 from '../snippets/optimization/optimization-seo-robotstxtsnippet.txt?raw'
import example5 from '../snippets/optimization/optimization-seo-sitemapxmlsnippet.txt?raw'
import example6 from '../snippets/optimization/optimization-seo-lazyloadingsnippet.txt?raw'
import example7 from '../snippets/optimization/optimization-seo-lighthouseoptimizationsnippet.txt?raw'
import example8 from '../snippets/optimization/optimization-seo-googlesearchconsolesnippet.txt?raw'
import example9 from '../snippets/optimization/optimization-seo-seochecklistsnippet.txt?raw'

// Content copied verbatim from src/views/optimization/SEO.vue.
export default {
  ...articleSummaries.optimizationSEO,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**SEO (Search Engine Optimization)** — комплекс мер по оптимизации сайта для поисковых систем. Для фронтенд\\-разработчика это включает правильную HTML\\-разметку, мета\\-теги, структурированные данные, оптимизацию производительности и многое другое.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Обзор SEO компонентов',
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
                  text: 'Meta-теги',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: '- Title и Description\n- Open Graph\n- Twitter Cards\n- Canonical URL',
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
                  text: 'Производительность',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Core Web Vitals\n- Lighthouse аудит\n- Lazy Loading\n- Code Splitting',
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
                  text: 'Структура',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: '- Schema.org разметка\n- XML Sitemap\n- robots.txt\n- Search Console',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Базовые Meta-теги',
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
                '**Важно:** Meta\\-теги — первое, что видят поисковые системы. Title и description влияют на CTR в поисковой выдаче.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Open Graph и Twitter Cards',
      blocks: [
        {
          id: 'callout-15',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '**Open Graph:** Управляет внешним видом ссылок в социальных сетях (Facebook, LinkedIn, VK). Twitter Cards — специфичная разметка для Twitter.',
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Schema.org — структурированные данные',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Schema.org:** JSON\\-LD разметка помогает поисковикам понять содержимое страницы. Влияет на rich snippets в Google (звездочки рейтинга, цены, хлебные крошки).',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'markup',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. robots.txt — управление индексацией',
      blocks: [
        {
          id: 'text-21',
          type: 'prose',
          markdown:
            'Файл `robots.txt` находится в корне сайта и указывает поисковым роботам, какие страницы можно индексировать.',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. XML Sitemap — карта сайта',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown: 'XML Sitemap помогает поисковым системам найти все страницы сайта.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'markup',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Lazy Loading — отложенная загрузка',
      blocks: [
        {
          id: 'callout-25',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-26',
              type: 'prose',
              markdown:
                '**Lazy Loading:** Загружает изображения и iframe только когда они появляются в области видимости. Улучшает LCP и общую производительность.',
            },
          ],
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Lighthouse и Core Web Vitals',
      blocks: [
        {
          id: 'cards-28',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-29',
              title: 'TTFB',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown: 'Time to First Byte  \nЦель: &lt; 600ms',
                },
              ],
            },
            {
              id: 'card-31',
              title: 'LCP',
              blocks: [
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown: 'Largest Contentful Paint  \nЦель: &lt; 2.5s',
                },
              ],
            },
            {
              id: 'card-33',
              title: 'FCP',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown: 'First Contentful Paint  \nЦель: &lt; 1.8s',
                },
              ],
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Google Search Console',
      blocks: [
        {
          id: 'text-36',
          type: 'prose',
          markdown:
            'Google Search Console — инструмент для мониторинга индексации, ошибок и производительности в поиске.',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'markup',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Таблица приоритетов SEO',
      blocks: [
        {
          id: 'table-38',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Приоритет',
            },
            {
              id: 'column-2',
              label: 'Элемент',
            },
            {
              id: 'column-3',
              label: 'Влияние',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'tags-39',
                    type: 'tags',
                    items: ['Критично'],
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Title, Description, H1',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Прямое влияние на ранжирование и CTR',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'tags-42',
                    type: 'tags',
                    items: ['Критично'],
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Core Web Vitals (LCP, FCP, CLS)',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Ranking factor с 2021 года',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'tags-45',
                    type: 'tags',
                    items: ['Важно'],
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Schema.org разметка',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Rich snippets, лучший CTR',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'tags-48',
                    type: 'tags',
                    items: ['Важно'],
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Mobile\\-friendly',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Mobile\\-first индексация',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'tags-51',
                    type: 'tags',
                    items: ['Полезно'],
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Open Graph, Twitter Cards',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Соцсети, но не прямое влияние на SEO',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'tags-54',
                    type: 'tags',
                    items: ['Полезно'],
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Canonical, hreflang',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Избежание дублей контента',
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
      title: 'SEO Checklist',
      blocks: [
        {
          id: 'code-57',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые ошибки SEO',
      blocks: [
        {
          id: 'accordion-58',
          type: 'accordion',
          items: [
            {
              id: 'question-59',
              title: '**1. Дублирование title/description**',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '**Проблема:** Одинаковые title/description на разных страницах.',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown: '**Решение:** Каждая страница должна иметь уникальные meta\\-теги.',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: '**Проверка:** Search Console → Performance → Pages',
                },
              ],
            },
            {
              id: 'question-63',
              title: '**2. Отсутствие canonical URL**',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '**Проблема:** Одна страница доступна по разным URL (с/без www, http/https).',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown: '**Решение:** Всегда указывать canonical URL на основную версию.',
                },
                {
                  id: 'inline-code-66',
                  type: 'inline-code',
                  lines: ['<link rel="canonical" href="https://example.com/page">'],
                },
              ],
            },
            {
              id: 'question-67',
              title: '**3. Медленная загрузка (плохой LCP)**',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown: '**Проблема:** Неоптимизированные изображения, нет lazy loading.',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown: '**Решение:**',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Использовать WebP/AVIF\n- Lazy loading для изображений ниже fold\n- CDN для статики\n- Preload критических ресурсов',
                },
              ],
            },
            {
              id: 'question-71',
              title: '**4. Отсутствие alt у изображений**',
              blocks: [
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown: '**Проблема:** Поисковики не понимают содержимое изображения.',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown: '**Решение:** Всегда добавлять описательный alt текст.',
                },
                {
                  id: 'inline-code-74',
                  type: 'inline-code',
                  lines: ['<img src="product.jpg" alt="Красные кроссовки Nike Air Max 90">'],
                },
              ],
            },
            {
              id: 'question-75',
              title: '**5. Неправильный robots.txt**',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown: '**Проблема:** Случайно заблокированы важные страницы.',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '**Решение:** Проверить robots.txt в Search Console → robots.txt Tester',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown: '**Частая ошибка:** `Disallow: /` блокирует весь сайт',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Инструменты для SEO',
      blocks: [
        {
          id: 'cards-79',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-80',
              title: 'Анализ и аудит',
              blocks: [
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- **Lighthouse** — встроен в Chrome DevTools\n- **PageSpeed Insights** — от Google\n- **GTmetrix** — детальный анализ\n- **WebPageTest** — продвинутое тестирование',
                },
              ],
            },
            {
              id: 'card-82',
              title: 'Мониторинг',
              blocks: [
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- **Google Search Console** — обязательно\n- **Google Analytics** — поведение пользователей\n- **Bing Webmaster Tools** — для Bing\n- **Yandex Webmaster** — для Яндекса',
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
          id: 'text-84',
          type: 'prose',
          markdown:
            '**SEO для фронтенда** включает: правильные meta\\-теги (title, description, OG), Schema.org разметку, оптимизацию производительности (Core Web Vitals), lazy loading, XML sitemap, robots.txt и интеграцию с Google Search Console. Регулярный аудит через Lighthouse и мониторинг в Search Console — обязательная часть работы фронтенд\\-разработчика.',
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'Google SEO Docs',
              url: 'https://developers.google.com/search/docs',
            },
          ],
        },
        {
          id: 'resources-87',
          type: 'resources',
          items: [
            {
              id: 'link-88',
              label: 'Web Vitals',
              url: 'https://web.dev/learn-core-web-vitals/',
            },
          ],
        },
        {
          id: 'resources-89',
          type: 'resources',
          items: [
            {
              id: 'link-90',
              label: 'Schema.org',
              url: 'https://schema.org/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
