import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-schema-org-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-schema-org-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-schema-org-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-schema-org-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-schema-org-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-schema-org-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-schema-org-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-schema-org-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-schema-org-snippet9.txt?raw'
import example10 from '../snippets/optimization/optimization-schema-org-snippet10.txt?raw'
import example11 from '../snippets/optimization/optimization-schema-org-snippet11.txt?raw'

// Content copied verbatim from src/views/optimization/SchemaOrg.vue.
export default {
  ...articleSummaries.optimizationSchemaOrg,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Schema.org** — это словарь структурированных данных, который помогает поисковым системам лучше понимать содержимое веб\\-страниц. Разметка Schema.org позволяет создавать rich snippets (расширенные сниппеты) в результатах поиска, улучшая CTR и видимость сайта.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужна Schema.org разметка',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Преимущество',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Влияние на SEO',
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
                    markdown: '**Rich Snippets**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Расширенные сниппеты с рейтингами, ценами, датами',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Увеличение CTR на 20\\-30%',
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
                    markdown: '**Knowledge Graph**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Информационные панели Google',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Повышение авторитетности',
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
                    markdown: '**Voice Search**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Оптимизация для голосовых помощников',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Лучшее ранжирование в голосовом поиске',
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
                    markdown: '**Понимание контекста**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Поисковики лучше понимают содержание',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Более точное ранжирование',
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
                    markdown: '**Структурированность**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Четкая семантическая структура контента',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Улучшение индексации',
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
      title: 'Форматы Schema.org разметки',
      blocks: [
        {
          id: 'cards-18',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-19',
              title: 'JSON-LD',
              blocks: [
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: '**Рекомендуется Google**',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    '- Отделен от HTML\n- Легко генерировать программно\n- Не влияет на вёрстку\n- Проще поддерживать',
                },
                {
                  id: 'tags-22',
                  type: 'tags',
                  items: ['Лучший выбор'],
                },
              ],
            },
            {
              id: 'card-23',
              title: 'Microdata',
              blocks: [
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: '**Встроен в HTML**',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- Интегрирован в разметку\n- Сложнее поддерживать\n- Может влиять на вёрстку\n- Устаревает',
                },
                {
                  id: 'tags-26',
                  type: 'tags',
                  items: ['Устаревает'],
                },
              ],
            },
            {
              id: 'card-27',
              title: 'RDFa',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown: '**Альтернатива Microdata**',
                },
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown:
                    '- Более гибкий синтаксис\n- Сложнее в использовании\n- Реже применяется\n- Избыточен для большинства случаев',
                },
                {
                  id: 'tags-30',
                  type: 'tags',
                  items: ['Не рекомендуется'],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: '1. Article — разметка статей',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'Используется для статей, новостей, блог\\-постов. Помогает Google показывать статьи в новостной ленте, Google Discover и создавать rich snippets с датами, авторами и изображениями.',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'markup',
          code: example1,
        },
        {
          id: 'heading-33',
          type: 'heading',
          level: 3,
          text: 'Microdata вариант (для сравнения)',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '2. Product — разметка товаров',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            'Для товаров в интернет\\-магазинах. Отображает цену, наличие, рейтинг и отзывы прямо в результатах поиска. Критично для e\\-commerce проектов.',
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'markup',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '3. Breadcrumb — хлебные крошки',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown:
            'Навигационная цепочка, показывающая путь пользователя на сайте. Google использует для отображения структуры сайта в результатах поиска вместо URL.',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '4. Organization — информация об организации',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            'Базовая информация о компании, логотип, контакты. Используется для Knowledge Graph и контактной информации.',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'markup',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '5. WebSite — разметка сайта с поиском',
      blocks: [
        {
          id: 'text-41',
          type: 'prose',
          markdown: 'Добавляет поисковую строку прямо в результатах Google (sitelinks searchbox).',
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '6. FAQPage — страница с вопросами и ответами',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown:
            'Позволяет отображать FAQ прямо в результатах поиска с возможностью разворачивания ответов.',
        },
        {
          id: 'code-44',
          type: 'code',
          language: 'markup',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '7. Event — разметка мероприятий',
      blocks: [
        {
          id: 'text-45',
          type: 'prose',
          markdown:
            'Для событий, конференций, вебинаров. Позволяет добавлять события в Google Calendar прямо из поиска.',
        },
        {
          id: 'code-46',
          type: 'code',
          language: 'markup',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Реализация в React приложениях',
      blocks: [
        {
          id: 'code-47',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Next.js и Schema.org',
      blocks: [
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'TypeScript типизация',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Обязательные и рекомендуемые поля',
      blocks: [
        {
          id: 'cards-50',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-51',
              title: 'Article',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: '**Обязательные:**',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown: '- headline\n- datePublished\n- author\n- publisher\n- image',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown: '**Рекомендуемые:**',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: '- dateModified\n- description\n- mainEntityOfPage',
                },
              ],
            },
            {
              id: 'card-56',
              title: 'Product',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '**Обязательные:**',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown: '- name\n- image\n- offers (price, availability)',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: '**Рекомендуемые:**',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '- description\n- brand\n- sku\n- aggregateRating\n- review',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Инструменты для проверки',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-62',
              title: 'Google Rich Results Test',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: 'Официальный инструмент Google для проверки структурированных данных',
                },
                {
                  id: 'resources-64',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-65',
                      label: 'Открыть',
                      url: 'https://search.google.com/test/rich-results',
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-66',
              title: 'Schema.org Validator',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown: 'Проверка синтаксиса и валидности разметки Schema.org',
                },
                {
                  id: 'resources-68',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-69',
                      label: 'Открыть',
                      url: 'https://validator.schema.org/',
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-70',
              title: 'Structured Data Linter',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown: 'Детальный анализ JSON\\-LD разметки с подсветкой ошибок',
                },
                {
                  id: 'resources-72',
                  type: 'resources',
                  items: [
                    {
                      id: 'link-73',
                      label: 'Открыть',
                      url: 'https://linter.structured-data.org/',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Частые ошибки при реализации',
      blocks: [
        {
          id: 'cards-74',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-75',
              title: '❌ Неправильно',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Отсутствие обязательных полей\n- Некорректный формат дат (нужен ISO 8601)\n- Дублирование разметки на странице\n- Несоответствие разметки видимому контенту\n- Невалидный JSON (забыли запятую, кавычки)',
                },
              ],
            },
            {
              id: 'card-77',
              title: '✅ Правильно',
              blocks: [
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Все обязательные поля заполнены\n- Даты в ISO формате: 2025\\-02\\-04T08:00:00\\+00:00\n- Одна разметка одного типа на страницу\n- Разметка совпадает с контентом\n- JSON валиден и проверен инструментами',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-79',
          type: 'prose',
          markdown:
            '1. **Что такое Schema.org и зачем оно нужно?**\n   \n   Schema.org — это словарь структурированных данных, который помогает поисковым системам понимать содержимое страниц. Позволяет создавать rich snippets в поисковой выдаче, что увеличивает CTR и видимость сайта.\n2. **Какой формат разметки лучше использовать: JSON\\-LD, Microdata или RDFa?**\n   \n   Google рекомендует JSON\\-LD, так как он отделен от HTML, легко генерируется программно и не влияет на вёрстку. Microdata встроен в HTML, но сложнее поддерживать. RDFa избыточен для большинства задач.\n3. **Как проверить правильность Schema.org разметки?**\n   \n   Используйте Google Rich Results Test для проверки поддержки rich snippets, Schema.org Validator для валидации синтаксиса, и Structured Data Linter для детального анализа JSON\\-LD.\n4. **Какие обязательные поля для Article разметки?**\n   \n   Обязательные: headline, datePublished, author (с полем name), publisher (с полями name и logo), image. Рекомендуемые: dateModified, description, mainEntityOfPage.\n5. **В чем разница между Article, NewsArticle и BlogPosting?**\n   \n   Article — базовый тип для любых статей. NewsArticle — для новостных статей с актуальностью. BlogPosting — для блог\\-постов. NewsArticle и BlogPosting наследуют от Article и добавляют специфичные поля.\n6. **Как динамически генерировать Schema.org в React/Next.js?**\n   \n   В React используйте react\\-helmet для вставки JSON\\-LD в head. В Next.js используйте встроенную поддержку через next/head или библиотеку next\\-seo с компонентами типа ArticleJsonLd.\n7. **Гарантирует ли Schema.org появление rich snippets?**\n   \n   Нет. Schema.org — это рекомендация для поисковиков, но они сами решают, показывать ли rich snippets. Зависит от качества контента, релевантности запроса и других факторов ранжирования.',
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Best Practices',
      blocks: [
        {
          id: 'callout-80',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-81',
              type: 'prose',
              markdown: '**Рекомендации по внедрению Schema.org:**',
            },
            {
              id: 'text-82',
              type: 'prose',
              markdown:
                '- Используйте JSON\\-LD формат для новых проектов\n- Добавляйте разметку только для контента, который действительно есть на странице\n- Проверяйте разметку перед деплоем через Google Rich Results Test\n- Используйте TypeScript типы из пакета schema\\-dts для безопасности\n- Генерируйте разметку программно, а не хардкодьте\n- Обновляйте dateModified при изменении контента\n- Следите за обновлениями документации Schema.org',
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Влияние на SEO метрики',
      blocks: [
        {
          id: 'table-83',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метрика',
            },
            {
              id: 'column-2',
              label: 'Влияние Schema.org',
            },
            {
              id: 'column-3',
              label: 'Примерное улучшение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '**CTR**',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Rich snippets привлекают больше кликов',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '\\+20\\-30%',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '**Видимость**',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Появление в специальных блоках (карусели, карточки)',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '\\+15\\-25%',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '**Позиции**',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Косвенное улучшение через поведенческие факторы',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '\\+5\\-10%',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: '**Индексация**',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Лучшее понимание контента роботами',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: 'Качественное',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: '**Voice Search**',
                  },
                ],
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: 'Оптимизация для голосовых помощников',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: 'Значительное',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-19',
      title: 'Итог',
      blocks: [
        {
          id: 'text-99',
          type: 'prose',
          markdown:
            'Schema.org разметка — это мощный инструмент для улучшения видимости сайта в поисковых системах. Article, Product и Breadcrumb — наиболее важные типы разметки для контентных и коммерческих сайтов. JSON\\-LD формат является рекомендуемым способом реализации. Правильное внедрение Schema.org увеличивает CTR на 20\\-30% и улучшает индексацию контента. Обязательно проверяйте разметку через Google Rich Results Test перед публикацией.',
        },
        {
          id: 'resources-100',
          type: 'resources',
          items: [
            {
              id: 'link-101',
              label: 'Schema.org Documentation',
              url: 'https://schema.org/',
            },
          ],
        },
        {
          id: 'resources-102',
          type: 'resources',
          items: [
            {
              id: 'link-103',
              label: 'Google Structured Data Guide',
              url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
