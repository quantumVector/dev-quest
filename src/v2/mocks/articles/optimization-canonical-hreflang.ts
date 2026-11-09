import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-canonical-hreflang-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-canonical-hreflang-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-canonical-hreflang-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-canonical-hreflang-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-canonical-hreflang-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-canonical-hreflang-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-canonical-hreflang-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-canonical-hreflang-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-canonical-hreflang-snippet9.txt?raw'
import example10 from '../snippets/optimization/optimization-canonical-hreflang-snippet10.txt?raw'
import example11 from '../snippets/optimization/optimization-canonical-hreflang-snippet11.txt?raw'
import example12 from '../snippets/optimization/optimization-canonical-hreflang-snippet12.txt?raw'

// Content copied verbatim from src/views/optimization/CanonicalHreflang.vue.
export default {
  ...articleSummaries.optimizationCanonicalHreflang,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Canonical URL** и **hreflang** — критически важные метатеги для мультиязычных сайтов, которые помогают поисковым системам правильно индексировать контент, избегать дублирования и показывать пользователям релевантную языковую версию страницы.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое Canonical URL?',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'text-4',
                  type: 'prose',
                  markdown:
                    '**Canonical URL** — это тег `<link rel="canonical">`, который указывает поисковым системам на основную (каноническую) версию страницы, когда существуют дубликаты или похожие версии контента.',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Цель:** Избежать проблем с дублированием контента\n- **Применение:** Страницы с параметрами, пагинация, версии для печати\n- **Важно:** Каждая языковая версия имеет свой canonical на себя',
                },
              ],
            },
          ],
        },
        {
          id: 'code-6',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Что такое hreflang?',
      blocks: [
        {
          id: 'cards-7',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-8',
              blocks: [
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    '**hreflang** — это атрибут `<link rel="alternate" hreflang="...">`, который указывает поисковым системам на альтернативные языковые и региональные версии страницы.',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown:
                    '- **Цель:** Показывать пользователям правильную языковую версию\n- **Применение:** Мультиязычные и мультирегиональные сайты\n- **Важно:** Все языковые версии должны ссылаться друг на друга',
                },
              ],
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Полный пример для мультиязычного сайта',
      blocks: [
        {
          id: 'code-12',
          type: 'code',
          language: 'markup',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Стратегии URL для мультиязычных сайтов',
      blocks: [
        {
          id: 'table-13',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Стратегия',
            },
            {
              id: 'column-2',
              label: 'Пример',
            },
            {
              id: 'column-3',
              label: 'Плюсы',
            },
            {
              id: 'column-4',
              label: 'Минусы',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '**Подпапки**',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '/ru/, /en/, /de/',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Простота, общий SEO\\-вес',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Все на одном сервере',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Поддомены**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'ru., en., de.',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Независимость, масштабируемость',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Разделение SEO\\-веса',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**ccTLD**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '.ru, .com, .de',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Сильный региональный сигнал',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Дорого, сложное управление',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '**Параметры**',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '?lang=ru',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Простая реализация',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Плохо для SEO',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Параметры**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '?lang=ru',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Простая реализация',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Плохо для SEO, сложная индексация',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Правильные языковые коды',
      blocks: [
        {
          id: 'code-35',
          type: 'code',
          language: 'markup',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Распространенные ошибки и их исправления',
      blocks: [
        {
          id: 'code-36',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Реализация через HTTP-заголовки',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown:
            'Для файлов, которые не являются HTML (PDF, изображения), используйте HTTP\\-заголовки:',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'markup',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'XML Sitemap с hreflang',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown: 'Альтернативный способ указания языковых версий через sitemap:',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'markup',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Next.js - автоматическая генерация',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'React + React Helmet',
      blocks: [
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Утилита для генерации hreflang',
      blocks: [
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Тестирование и валидация',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'markup',
          code: example12,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-45',
          type: 'accordion',
          items: [
            {
              id: 'question-46',
              title: '**В чем разница между canonical и hreflang?**',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '**Canonical** указывает на основную версию страницы при дублировании контента. **hreflang** указывает на языковые/региональные версии одного контента. Canonical предотвращает дублирование, hreflang помогает показать правильную языковую версию.',
                },
              ],
            },
            {
              id: 'question-48',
              title: '**Должна ли каждая языковая версия иметь свой canonical?**',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    'Да! Каждая языковая версия должна иметь canonical на себя. Например, страница /ru/products должна иметь canonical на /ru/products, а не на /en/products.',
                },
              ],
            },
            {
              id: 'question-50',
              title: '**Что такое x\\-default в hreflang?**',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    'x\\-default указывает версию по умолчанию для пользователей, чей язык/регион не указан в hreflang. Обычно это английская или основная версия сайта.',
                },
              ],
            },
            {
              id: 'question-52',
              title: '**Нужны ли hreflang теги на каждой странице?**',
              blocks: [
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    'Да, если страница имеет языковые версии. Каждая страница должна ссылаться на все свои языковые варианты, включая саму себя. Это должно быть двунаправленно \\- если страница A ссылается на B, то B должна ссылаться на A.',
                },
              ],
            },
            {
              id: 'question-54',
              title: '**Какую стратегию URL лучше использовать для мультиязычных сайтов?**',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    'Подпапки (subdirectories) \\- наиболее рекомендуемый подход: /en/, /ru/, /de/. Это просто в управлении, SEO\\-вес остается на одном домене, легко масштабировать. ccTLD (.ru, .de) дают сильный региональный сигнал, но дороги и сложны в управлении.',
                },
              ],
            },
            {
              id: 'question-56',
              title: '**Как проверить правильность hreflang реализации?**',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    'Используйте Google Search Console (Международное таргетирование), онлайн валидаторы (technicalseo.com, aleydasolis.com), Screaming Frog для массовой проверки, и проверяйте двунаправленность ссылок между языковыми версиями.',
                },
              ],
            },
            {
              id: 'question-58',
              title: '**Можно ли использовать относительные URL в hreflang?**',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    'Нет! Всегда используйте абсолютные URL с протоколом (https://example.com/ru/products). Относительные URL могут работать некорректно и не рекомендуются спецификацией.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Ключевые выводы',
      blocks: [
        {
          id: 'cards-60',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: 'Основные принципы:',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Каждая языковая версия должна иметь canonical на себя\n- Все языковые версии должны ссылаться друг на друга через hreflang\n- Используйте правильные языковые коды (ISO 639\\-1 \\+ ISO 3166\\-1)\n- Включайте самоссылку (страница должна ссылаться на себя в hreflang)\n- Всегда используйте абсолютные URL\n- Добавляйте x\\-default для версии по умолчанию',
                },
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: 'Лучшие практики:',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Предпочитайте подпапки (subdirectories) для структуры URL\n- Используйте автоматическую генерацию в Next.js/React\n- Регулярно проверяйте через Search Console и валидаторы\n- Убедитесь в двунаправленности всех hreflang связей\n- Тестируйте на разных устройствах и в разных регионах',
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
          id: 'text-66',
          type: 'prose',
          markdown:
            'Canonical URL и hreflang \\- критически важные элементы для мультиязычных сайтов. Canonical предотвращает дублирование контента, указывая на основную версию страницы. hreflang помогает поисковым системам показывать пользователям правильную языковую/региональную версию. Правильная реализация улучшает SEO, предотвращает проблемы с индексацией и обеспечивает лучший пользовательский опыт для международной аудитории.',
        },
        {
          id: 'resources-67',
          type: 'resources',
          items: [
            {
              id: 'link-68',
              label: 'Google: International SEO',
              url: 'https://developers.google.com/search/docs/specialty/international/localized-versions',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
