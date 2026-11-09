import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-sitemap-and-robots-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-sitemap-and-robots-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-sitemap-and-robots-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-sitemap-and-robots-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-sitemap-and-robots-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-sitemap-and-robots-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-sitemap-and-robots-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-sitemap-and-robots-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-sitemap-and-robots-snippet9.txt?raw'
import example10 from '../snippets/optimization/optimization-sitemap-and-robots-snippet10.txt?raw'

// Content copied verbatim from src/views/optimization/SitemapAndRobots.vue.
export default {
  ...articleSummaries.optimizationSitemapAndRobots,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**XML Sitemap и robots.txt** — два ключевых файла для управления тем, как поисковые системы сканируют и индексируют ваш сайт. Sitemap помогает поисковикам найти все важные страницы, а robots.txt контролирует, какие страницы можно сканировать.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Сравнение XML Sitemap и robots.txt',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'XML Sitemap',
            },
            {
              id: 'column-3',
              label: 'robots.txt',
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
                    markdown: '**Назначение**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Карта сайта для поисковиков',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Правила сканирования',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '**Формат**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'XML',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Текстовый файл',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Расположение**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '/sitemap.xml (гибкое)',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '/robots.txt (строго в корне)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Действие**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Помогает найти страницы',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Запрещает/разрешает сканирование',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Обязательность**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Рекомендуется',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Опционально, но важно',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Размер**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'До 50 МБ / 50,000 URL',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Неограничен (но обычно мал)',
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
      title: '1. Базовая структура XML Sitemap',
      blocks: [
        {
          id: 'text-21',
          type: 'prose',
          markdown:
            'XML Sitemap содержит список URL со метаданными о приоритете и частоте обновления:',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Индексный Sitemap для больших сайтов',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            'Если у вас больше 50,000 URL или размер превышает 50 МБ, используйте sitemap index:',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Специализированные Sitemap',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown: 'Для изображений, видео и новостей существуют расширенные форматы:',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'markup',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Базовый robots.txt',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown: 'Простой файл для управления доступом ботов к разделам сайта:',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Продвинутый robots.txt',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown: 'Детальные правила для разных поисковых ботов:',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'markup',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. robots.txt для разных окружений',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown: 'Важно блокировать индексацию staging и development окружений:',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Генерация Sitemap в Node.js',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown: 'Автоматическое создание sitemap с динамическим контентом:',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Next.js App Router: sitemap и robots',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown: 'Современный подход в Next.js 13\\+ с встроенной поддержкой:',
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Подключение в HTML',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown: 'Правильное указание sitemap и управление индексацией через meta\\-теги:',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'markup',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: '10. Специальные случаи и best practices',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown: 'Продвинутые техники для сложных сценариев:',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'markup',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Ключевые теги XML Sitemap',
      blocks: [
        {
          id: 'cards-41',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-42',
              title: '<loc>',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    'Обязательный. Полный URL страницы. Должен начинаться с протокола (http/https) и быть не длиннее 2048 символов.',
                },
              ],
            },
            {
              id: 'card-44',
              title: '<lastmod>',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    'Дата последнего изменения в формате ISO 8601. Помогает поисковикам определить, когда пересканировать страницу.',
                },
              ],
            },
            {
              id: 'card-46',
              title: '<changefreq>',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    'Частота изменений: always, hourly, daily, weekly, monthly, yearly, never. Это рекомендация, не гарантия.',
                },
              ],
            },
            {
              id: 'card-48',
              title: '<priority>',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    'Приоритет от 0.0 до 1.0. Относительная важность страницы на вашем сайте. Не влияет на рейтинг в поиске.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Директивы robots.txt',
      blocks: [
        {
          id: 'cards-50',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-51',
              title: 'User-agent',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- \\* — все боты\n- Googlebot — Google\n- Bingbot — Bing\n- Yandex — Яндекс',
                },
              ],
            },
            {
              id: 'card-53',
              title: 'Allow/Disallow',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- / — весь сайт\n- /admin/ — директория\n- \\*.pdf — по расширению\n- /\\*?param= — параметры',
                },
              ],
            },
            {
              id: 'card-55',
              title: 'Дополнительно',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Sitemap: URL карты\n- Crawl\\-delay: секунды\n- Host: основной домен',
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
          id: 'text-57',
          type: 'prose',
          markdown:
            '1. **Где должен находиться robots.txt?**\n   \n   Строго в корне домена: https://example.com/robots.txt. Поддомены должны иметь свой robots.txt. Путь /subfolder/robots.txt не будет работать.\n2. **Может ли robots.txt полностью скрыть страницу от индексации?**\n   \n   Нет! Disallow блокирует сканирование, но не индексацию. Если на страницу есть внешние ссылки, она может попасть в индекс без содержимого. Используйте meta robots="noindex" или X\\-Robots\\-Tag.\n3. **Нужен ли sitemap для маленького сайта?**\n   \n   Да, рекомендуется. Даже для 10\\-20 страниц sitemap помогает контролировать приоритеты, даты обновления и гарантирует, что поисковики найдут все страницы.\n4. **Как часто обновлять sitemap?**\n   \n   Для статических сайтов — при публикации нового контента. Для динамических — генерировать на лету или через cron. Google сам определяет, как часто проверять sitemap.\n5. **Можно ли в robots.txt блокировать JavaScript или CSS?**\n   \n   Технически можно, но не рекомендуется. Google использует JavaScript для рендеринга, а блокировка CSS/JS мешает правильной индексации. Исключение: реально служебные скрипты, которые не влияют на контент.\n6. **Влияет ли частота обновления sitemap на индексацию?**\n   \n   Нет прямой связи. Google сам решает, как часто проверять sitemap. Важнее правильно указывать lastmod и отправлять ping при значимых обновлениях через Search Console API.',
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Best Practices',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-59',
              title: 'XML Sitemap',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Включайте только канонические URL\n- Обновляйте lastmod при изменениях\n- Разделяйте на тематические части\n- Используйте сжатие (.xml.gz)\n- Добавьте в robots.txt и Search Console',
                },
              ],
            },
            {
              id: 'card-61',
              title: 'robots.txt',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Всегда тестируйте изменения\n- Блокируйте staging/dev окружения\n- Не блокируйте CSS/JS без причины\n- Указывайте все sitemap\n- Используйте комментарии для ясности',
                },
              ],
            },
            {
              id: 'card-63',
              title: 'Мониторинг',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Проверяйте Coverage в Search Console\n- Отслеживайте ошибки индексации\n- Валидируйте XML структуру\n- Тестируйте robots.txt в инструментах Google\n- Логируйте доступ ботов к sitemap',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Инструменты для работы',
      blocks: [
        {
          id: 'cards-65',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-66',
              title: 'Генерация',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- XML Sitemap Generator\n- Screaming Frog SEO Spider\n- Next.js sitemap.ts/xml\n- next\\-sitemap package',
                },
              ],
            },
            {
              id: 'card-68',
              title: 'Валидация',
              blocks: [
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Google Search Console\n- XML Sitemap Validator\n- robots.txt Tester\n- Bing Webmaster Tools',
                },
              ],
            },
            {
              id: 'card-70',
              title: 'Мониторинг',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Google Analytics\n- Log file analysis\n- Sitemap ping services\n- Custom monitoring scripts',
                },
              ],
            },
            {
              id: 'card-72',
              title: 'Автоматизация',
              blocks: [
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- CI/CD интеграция\n- Cron jobs для обновления\n- Webhook уведомления\n- API интеграции CMS',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Итог',
      blocks: [
        {
          id: 'text-74',
          type: 'prose',
          markdown:
            'XML Sitemap и robots.txt — фундаментальные инструменты для управления индексацией сайта. Sitemap помогает поисковым системам найти и приоритизировать страницы, а robots.txt контролирует доступ ботов к ресурсам. Правильная настройка обоих файлов критична для SEO, особенно на больших сайтах с динамическим контентом. Современные фреймворки вроде Next.js предоставляют встроенные инструменты для автоматической генерации этих файлов.',
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Google: Sitemap Documentation',
              url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
