import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-meta-tags-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-meta-tags-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-meta-tags-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-meta-tags-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-meta-tags-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-meta-tags-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-meta-tags-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-meta-tags-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-meta-tags-snippet9.txt?raw'

// Content copied verbatim from src/views/optimization/MetaTags.vue.
export default {
  ...articleSummaries.optimizationMetaTags,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Meta\\-теги** — это HTML\\-элементы, которые предоставляют метаданные о веб\\-странице поисковым системам, браузерам и социальным сетям. Три основных тега (title, description, keywords) исторически были основой SEO, хотя их значимость со временем изменилась.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные meta-теги',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тег',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Актуальность',
            },
            {
              id: 'column-4',
              label: 'Длина',
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
                    markdown: '**&lt;title&gt;**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Заголовок страницы в поиске и вкладке',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Критически важен',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '50\\-60 символов',
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
                    markdown: '**description**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Краткое описание содержимого',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Очень важен',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '120\\-160 символов',
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
                    markdown: '**keywords**',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Ключевые слова страницы',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Устарел (игнорируется)',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Не ограничена',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**robots**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Инструкции для поисковых роботов',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Важен',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'N/A',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**viewport**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Настройка отображения на мобильных',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Обязателен',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'N/A',
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
      title: '1. Базовая структура meta-тегов',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Title: оптимальная структура',
      blocks: [
        {
          id: 'text-24',
          type: 'prose',
          markdown:
            'Title — самый важный элемент для SEO. Отображается в поисковой выдаче, вкладке браузера и социальных сетях.',
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'markup',
          code: example2,
        },
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              title: 'Лучшие практики',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- 50\\-60 символов (Google обрезает длиннее)\n- Главное ключевое слово в начале\n- Уникальный для каждой страницы\n- Читаемый и привлекательный\n- Включайте бренд в конце',
                },
              ],
            },
            {
              id: 'card-29',
              title: 'Избегайте',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- Переспам ключевых слов\n- Общие фразы типа "Главная"\n- Дублирование на разных страницах\n- Слишком длинные заголовки (&gt;70)\n- CAPSLOCK и избыток символов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Description: правила создания',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'Description показывается в поисковой выдаче под заголовком. Не влияет на ранжирование напрямую, но влияет на CTR (кликабельность).',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'markup',
          code: example3,
        },
        {
          id: 'cards-33',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-34',
              title: 'Правила написания',
              blocks: [
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown:
                    '- 120\\-160 символов оптимально\n- Призыв к действию (CTA)\n- Конкретные преимущества\n- Естественное использование ключевых слов\n- Уникальный для каждой страницы',
                },
              ],
            },
            {
              id: 'card-36',
              title: 'Что включить',
              blocks: [
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- Основное ключевое слово\n- Уникальное торговое предложение (УТП)\n- Конкретные цифры/факты\n- Ответ на вопрос пользователя\n- Призыв к действию',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Keywords: история и современность',
      blocks: [
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            'Meta keywords устарел и игнорируется основными поисковыми системами с 2009 года. Его использование не вредит, но и не помогает SEO.',
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Robots: управление индексацией',
      blocks: [
        {
          id: 'text-40',
          type: 'prose',
          markdown:
            'Контролирует, как поисковые роботы индексируют страницу и переходят по ссылкам.',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'markup',
          code: example5,
        },
        {
          id: 'cards-42',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-43',
              title: 'Основные директивы',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- `index` \\- индексировать\n- `noindex` \\- не индексировать\n- `follow` \\- переходить по ссылкам\n- `nofollow` \\- игнорировать ссылки',
                },
              ],
            },
            {
              id: 'card-45',
              title: 'Дополнительные',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- `noarchive` \\- не кэшировать\n- `nosnippet` \\- не показывать сниппет\n- `max-snippet` \\- размер сниппета\n- `max-image-preview` \\- размер превью',
                },
              ],
            },
            {
              id: 'card-47',
              title: 'Когда использовать',
              blocks: [
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- Страницы поиска/фильтрации\n- Дубли контента\n- Технические страницы\n- Личные кабинеты',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Полный набор meta-тегов',
      blocks: [
        {
          id: 'text-49',
          type: 'prose',
          markdown:
            'Современная страница включает не только базовые meta\\-теги, но и Open Graph, Twitter Cards:',
        },
        {
          id: 'code-50',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. React/Next.js: динамические meta-теги',
      blocks: [
        {
          id: 'code-51',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Vue.js: управление meta-тегами',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Валидация и проверка',
      blocks: [
        {
          id: 'code-53',
          type: 'code',
          language: 'markup',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Влияние на SEO',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-55',
              title: 'Прямое влияние',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- **Title** — сильное влияние на ранжирование\n- **Robots** — контроль индексации\n- **Canonical** — устранение дублей',
                },
              ],
            },
            {
              id: 'card-57',
              title: 'Косвенное влияние',
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- **Description** — влияет на CTR\n- **OG\\-теги** — социальный трафик\n- **Viewport** — мобильный опыт',
                },
              ],
            },
            {
              id: 'card-59',
              title: 'Не влияют',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- **Keywords** — игнорируется с 2009\n- **Author** — справочная информация\n- **Copyright** — юридическая информация',
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
          id: 'text-61',
          type: 'prose',
          markdown:
            '1. **Почему meta keywords больше не используется?**\n   \n   Google перестал учитывать keywords в 2009 из\\-за спама. Вебмастера злоупотребляли этим тегом, добавляя нерелевантные ключевые слова. Современные алгоритмы анализируют контент страницы напрямую, без необходимости в keywords.\n2. **Какая оптимальная длина title и description?**\n   \n   Title: 50\\-60 символов (Google показывает ~600px, ~60 символов). Description: 120\\-160 символов для десктопа, 120 для мобильных. Превышение приводит к обрезанию многоточием.\n3. **Может ли Google переписать title или description?**\n   \n   Да, Google может генерировать свои заголовки и описания, если считает ваши неподходящими. Часто происходит это регулярно. Google будет использовать ваши теги, если они качественные и релевантные.\n4. **Какие ошибки в meta\\-тегах критичны для SEO?**\n   \n   Дубли title/description на разных страницах, слишком короткие/длинные теги, переспам ключевых слов, отсутствие title, неправильный canonical, отсутствие viewport для мобильных устройств.\n5. **Как часто нужно обновлять meta\\-теги?**\n   \n   При изменении контента страницы, смене позиционирования, A/B тестировании заголовков, обновлении продуктов/услуг. Для блогов \\- при публикации новых статей обязательно создавайте уникальные meta\\-теги.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики 2024-2025',
      blocks: [
        {
          id: 'cards-62',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-63',
              title: 'Title',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- 50\\-60 символов\n- Ключевые слова в начале\n- Уникальный для каждой страницы\n- Бренд в конце через |\n- Призыв к действию',
                },
              ],
            },
            {
              id: 'card-65',
              title: 'Description',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- 120\\-160 символов\n- Конкретные преимущества\n- Естественные ключевые слова\n- Призыв к действию\n- Уникальный контент',
                },
              ],
            },
            {
              id: 'card-67',
              title: 'Дополнительно',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Open Graph теги\n- Twitter Cards\n- Canonical URL\n- Structured Data\n- Favicon всех размеров',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Чеклист для проверки meta-тегов',
      blocks: [
        {
          id: 'callout-69',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-70',
              type: 'prose',
              markdown: '**Перед релизом проверьте:**',
            },
            {
              id: 'text-71',
              type: 'prose',
              markdown:
                '- ✓ Title уникален и 50\\-60 символов\n- ✓ Description уникален и 120\\-160 символов\n- ✓ Viewport meta для мобильных\n- ✓ Canonical URL указан корректно\n- ✓ Open Graph теги для соцсетей\n- ✓ Robots meta для правильной индексации\n- ✓ Нет дублей на других страницах\n- ✓ Favicon добавлен\n- ✓ Язык страницы указан (lang="ru")\n- ✓ Проверено в валидаторах',
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Инструменты для работы',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-73',
              title: 'Тестирование',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Google Search Console\n- Yandex Вебмастер\n- Meta Tags \\- metatags.io\n- Open Graph Check\n- Twitter Card Validator',
                },
              ],
            },
            {
              id: 'card-75',
              title: 'Разработка',
              blocks: [
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Next.js Metadata API\n- React Helmet / React Helmet Async\n- VueUse \\- useHead\n- Lighthouse (Chrome DevTools)\n- Browser extensions (SEO Peek)',
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
          id: 'text-77',
          type: 'prose',
          markdown:
            'Дефолтные meta\\-теги остаются критически важными для SEO и социальных сетей. Title и Description напрямую влияют на CTR в поисковой выдаче, а Keywords устарел и игнорируется. Современный подход — динамическая генерация уникальных meta\\-тегов для каждой страницы, использование Open Graph и Twitter Cards, правильная настройка robots и canonical. Регулярный аудит и A/B тестирование meta\\-тегов помогают оптимизировать конверсию из поиска.',
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'Google: Управление сниппетами',
              url: 'https://developers.google.com/search/docs/appearance/snippet',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
