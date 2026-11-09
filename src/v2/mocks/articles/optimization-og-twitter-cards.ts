import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-og-twitter-cards-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-og-twitter-cards-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-og-twitter-cards-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-og-twitter-cards-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-og-twitter-cards-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-og-twitter-cards-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-og-twitter-cards-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-og-twitter-cards-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-og-twitter-cards-snippet9.txt?raw'
import example10 from '../snippets/optimization/optimization-og-twitter-cards-snippet10.txt?raw'

// Content copied verbatim from src/views/optimization/OpenGraphAndTwitterCards.vue.
export default {
  ...articleSummaries.optimizationOpenGraphAndTwitterCards,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Open Graph** и **Twitter Cards** — это протоколы метаданных, которые контролируют, как ваш контент отображается при публикации в социальных сетях. Правильная настройка этих мета\\-тегов критически важна для улучшения кликабельности, вовлеченности и распространения контента в соцсетях.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужны Open Graph и Twitter Cards',
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
              label: 'Влияние',
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
                    markdown: '**Контроль превью**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Вы определяете заголовок, описание и изображение',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '↑ Кликабельность на 2\\-3x',
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
                    markdown: '**Брендинг**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Единообразное представление во всех соцсетях',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '↑ Узнаваемость бренда',
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
                    markdown: '**SEO косвенно**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Больше шеров → больше трафика → лучше ранжирование',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '↑ Органический трафик',
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
                    markdown: '**Аналитика**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Отслеживание распространения контента',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '↑ Понимание аудитории',
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
      title: '1. Базовые Open Graph теги',
      blocks: [
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            'Минимальный набор обязательных OG\\-тегов для Facebook, LinkedIn и других платформ:',
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Open Graph для разных типов контента',
      blocks: [
        {
          id: 'text-17',
          type: 'prose',
          markdown: 'Специфичные теги для статей, видео, музыки и продуктов:',
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Twitter Cards',
      blocks: [
        {
          id: 'text-19',
          type: 'prose',
          markdown: 'Twitter использует свои собственные мета\\-теги с fallback на Open Graph:',
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
      title: '4. Полный набор мета-тегов',
      blocks: [
        {
          id: 'text-21',
          type: 'prose',
          markdown: 'Комплексный пример с поддержкой всех платформ:',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. React компонент для SEO',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown: 'Динамическая генерация мета\\-тегов в React приложении:',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Next.js Metadata API',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown: 'Современный подход к метаданным в Next.js App Router:',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Vue.js с useHead',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown: 'Управление мета\\-тегами в Vue.js через @vueuse/head:',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'markup',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Валидация и тестирование',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown: 'Автоматическая проверка Open Graph тегов:',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Динамическая генерация OG изображений',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown: 'Создание уникальных превью для каждой страницы:',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: '10. Best Practices и чек-лист',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown: 'Рекомендации, частые ошибки и полезные инструменты:',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Требования к изображениям',
      blocks: [
        {
          id: 'table-35',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Платформа',
            },
            {
              id: 'column-2',
              label: 'Рекомендуемый размер',
            },
            {
              id: 'column-3',
              label: 'Соотношение',
            },
            {
              id: 'column-4',
              label: 'Формат',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Facebook/LinkedIn**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '1200 × 630px',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '1.91:1',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'JPG, PNG (до 8MB)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Twitter Summary**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '120 × 120px',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '1:1',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'JPG, PNG, WebP, GIF',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**Twitter Large Image**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '1200 × 628px',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '1.91:1',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'JPG, PNG, WebP (до 5MB)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '**Instagram (квадрат)**',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '1080 × 1080px',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '1:1',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'JPG, PNG',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые ошибки',
      blocks: [
        {
          id: 'cards-52',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-53',
              title: '❌ Не делайте',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Относительные URL для изображений\n- HTTP вместо HTTPS\n- Слишком длинные заголовки (&gt;60 символов)\n- Отсутствие og:image:alt\n- Маленькие изображения (&lt;600x315px)\n- Забыть протестировать в дебаггерах',
                },
              ],
            },
            {
              id: 'card-55',
              title: '✅ Делайте',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Абсолютные HTTPS URL\n- Оптимизируйте заголовки для соцсетей\n- Добавляйте alt\\-текст к изображениям\n- Используйте размер 1200x630px\n- Тестируйте через валидаторы\n- Добавляйте альтернативные изображения',
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
          id: 'cards-57',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-58',
              title: 'Facebook',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: 'Sharing Debugger',
                },
                {
                  id: 'tags-60',
                  type: 'tags',
                  items: ['Очистка кеша', 'Превью карточки'],
                },
              ],
            },
            {
              id: 'card-61',
              title: 'Twitter',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: 'Card Validator',
                },
                {
                  id: 'tags-63',
                  type: 'tags',
                  items: ['Типы карточек', 'Превью'],
                },
              ],
            },
            {
              id: 'card-64',
              title: 'LinkedIn',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown: 'Post Inspector',
                },
                {
                  id: 'tags-66',
                  type: 'tags',
                  items: ['Валидация', 'Обновление кеша'],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Часто задаваемые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-67',
          type: 'prose',
          markdown:
            '1. **В чем разница между Open Graph и Twitter Cards?**\n   \n   Open Graph — универсальный протокол (Facebook, LinkedIn, Discord). Twitter Cards — специфичны для Twitter, но Twitter также поддерживает OG как fallback. Для полной поддержки используйте оба.\n2. **Какие теги обязательны для Open Graph?**\n   \n   Обязательны 4 тега: `og:title`, `og:type`, `og:image`, `og:url`. Рекомендуется также добавить `og:description`, `og:site_name` и размеры изображения.\n3. **Почему изображение не обновляется в Facebook?**\n   \n   Facebook кеширует OG\\-данные. Используйте Facebook Sharing Debugger для принудительной очистки кеша. Также убедитесь, что используете абсолютный HTTPS URL.\n4. **Как динамически генерировать OG изображения?**\n   \n   В Next.js используйте `ImageResponse` API или Vercel OG. Для других фреймворков — node\\-canvas, Puppeteer или сервисы типа Cloudinary Dynamic Images.\n5. **Нужны ли отдельные изображения для каждой соцсети?**\n   \n   Идеально — да (1.91:1 для Facebook, 1:1 для Instagram). Но минимум — одно изображение 1200×630px работает везде. Используйте `<picture>` для альтернатив.\n6. **Влияют ли OG теги на SEO напрямую?**\n   \n   Напрямую нет — Google не использует их для ранжирования. Но косвенно да: больше кликов из соцсетей → больше трафика → лучше поведенческие факторы → выше позиции.',
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Рекомендации по тексту',
      blocks: [
        {
          id: 'table-68',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Элемент',
            },
            {
              id: 'column-2',
              label: 'Оптимальная длина',
            },
            {
              id: 'column-3',
              label: 'Максимум',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '**og:title**',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '40\\-60 символов',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '60 символов',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**og:description**',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '150\\-200 символов',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '200 символов',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '**twitter:title**',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '50\\-70 символов',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '70 символов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '**twitter:description**',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '100\\-200 символов',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '200 символов',
                  },
                ],
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
          id: 'text-81',
          type: 'prose',
          markdown:
            'Open Graph и Twitter Cards критически важны для представления контента в социальных сетях. Минимальный набор включает `og:title`, `og:type`, `og:image` и `og:url`. Используйте изображения 1200×630px, тестируйте через официальные валидаторы, добавляйте альтернативные форматы и размеры. Для динамических приложений генерируйте мета\\-теги на сервере или используйте SSR/SSG фреймворки.',
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'Open Graph Protocol',
              url: 'https://ogp.me/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
