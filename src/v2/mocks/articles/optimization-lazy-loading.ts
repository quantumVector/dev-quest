import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/optimization/optimization-lazy-loading-snippet1.txt?raw'
import example2 from '../snippets/optimization/optimization-lazy-loading-snippet2.txt?raw'
import example3 from '../snippets/optimization/optimization-lazy-loading-snippet3.txt?raw'
import example4 from '../snippets/optimization/optimization-lazy-loading-snippet4.txt?raw'
import example5 from '../snippets/optimization/optimization-lazy-loading-snippet5.txt?raw'
import example6 from '../snippets/optimization/optimization-lazy-loading-snippet6.txt?raw'
import example7 from '../snippets/optimization/optimization-lazy-loading-snippet7.txt?raw'
import example8 from '../snippets/optimization/optimization-lazy-loading-snippet8.txt?raw'
import example9 from '../snippets/optimization/optimization-lazy-loading-snippet9.txt?raw'
import example10 from '../snippets/optimization/optimization-lazy-loading-snippet10.txt?raw'

// Content copied verbatim from src/views/optimization/LazyLoading.vue.
export default {
  ...articleSummaries.optimizationLazyLoading,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Lazy loading** — техника отложенной загрузки ресурсов (изображений, iframe), которая загружает контент только когда он действительно нужен пользователю. Это критическая оптимизация для улучшения начальной загрузки страницы и экономии трафика.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужен lazy loading',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Проблема',
            },
            {
              id: 'column-2',
              label: 'Без lazy loading',
            },
            {
              id: 'column-3',
              label: 'С lazy loading',
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
                    markdown: '**Трафик**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '5 MB загружается сразу',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '1.5 MB (только видимое)',
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
                    markdown: '**Начальная загрузка**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'LCP: 4.5s ❌',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'LCP: 2.0s ✅',
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
                    markdown: '**HTTP запросы**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '30\\-40 запросов',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '5\\-8 запросов',
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
                    markdown: '**YouTube iframe**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '~500KB × количество видео',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Загружается при скролле',
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
                    markdown: '**Google Maps**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '~1\\-2 MB сразу',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Загружается когда нужно',
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
      title: '1. Базовый lazy loading (Native API)',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown: 'Современные браузеры поддерживают атрибут `loading`:',
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Lazy loading для iframe',
      blocks: [
        {
          id: 'text-20',
          type: 'prose',
          markdown: 'Критически важно для YouTube, Google Maps и других встраиваемых сервисов:',
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Продвинутая техника с IntersectionObserver',
      blocks: [
        {
          id: 'text-22',
          type: 'prose',
          markdown: 'Для старых браузеров и более тонкого контроля:',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'markup',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Placeholder с эффектом загрузки',
      blocks: [
        {
          id: 'text-24',
          type: 'prose',
          markdown: 'Улучшаем UX с помощью размытого placeholder:',
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. React реализация',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Vue реализация',
      blocks: [
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
      title: '7. Lazy loading с современными форматами',
      blocks: [
        {
          id: 'text-28',
          type: 'prose',
          markdown: 'Комбинирование lazy loading и WebP/AVIF:',
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'markup',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Facade Pattern для iframe',
      blocks: [
        {
          id: 'text-30',
          type: 'prose',
          markdown:
            'Оптимальная техника для YouTube: показываем легкий placeholder вместо тяжелого iframe:',
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'markup',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Next.js автоматическая оптимизация',
      blocks: [
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
      title: '10. Измерение эффективности',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Стратегии применения',
      blocks: [
        {
          id: 'cards-34',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-35',
              title: 'loading="eager"',
              blocks: [
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown: 'Использовать для:',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- Hero\\-изображений\n- Логотипов\n- LCP элементов\n- Above\\-the\\-fold контента',
                },
              ],
            },
            {
              id: 'card-38',
              title: 'loading="lazy"',
              blocks: [
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown: 'Использовать для:',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- Галерей изображений\n- Контента в футере\n- Всех iframe (YouTube, Maps)\n- Below\\-the\\-fold изображений',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Влияние на Web Vitals',
      blocks: [
        {
          id: 'cards-41',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-42',
              title: 'LCP',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: '**Без lazy:** 4.5s ❌',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown: '**С lazy:** 2.0s ✅',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown: 'Критический контент загружается быстрее',
                },
              ],
            },
            {
              id: 'card-46',
              title: 'TBT',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: '**Без lazy:** 800ms ❌',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown: '**С lazy:** 150ms ✅',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown: 'Меньше блокировок main thread',
                },
              ],
            },
            {
              id: 'card-50',
              title: 'CLS',
              blocks: [
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: '**Важно:** Указывать размеры',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown: 'width/height предотвращают layout shift',
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
          id: 'text-53',
          type: 'prose',
          markdown:
            '1. **В чем разница между loading="lazy" и IntersectionObserver?**\n   \n   `loading="lazy"` — нативное API браузера, работает автоматически, но с меньшим контролем. `IntersectionObserver` — программный API с полным контролем над порогом видимости, анимациями и callback\'ами. IntersectionObserver также работает в старых браузерах.\n2. **Когда НЕ использовать lazy loading?**\n   \n   Не используйте для LCP\\-элементов (largest contentful paint), критических изображений выше сгиба, логотипов и первого экрана. Это замедлит начальную отрисовку страницы.\n3. **Зачем lazy loading для iframe?**\n   \n   YouTube iframe загружает ~500KB (API, скрипты, превью), Google Maps ~1\\-2MB (тайлы, интерактив). Без lazy loading все это загружается сразу, даже если пользователь не доскроллит до iframe.\n4. **Что такое Facade Pattern для iframe?**\n   \n   Вместо тяжелого YouTube iframe показываем легкий placeholder с превью. При клике заменяем на настоящий iframe. Экономия ~500KB на каждое видео до взаимодействия пользователя.\n5. **Как предотвратить CLS при lazy loading?**\n   \n   Всегда указывайте `width` и `height` атрибуты или используйте CSS `aspect-ratio`. Браузер зарезервирует место до загрузки изображения, предотвращая layout shift.\n6. **Как тестировать lazy loading?**\n   \n   DevTools → Network → фильтр Img. Включите Throttling (Fast 3G) и прокручивайте страницу. Смотрите когда появляются новые запросы. Используйте Lighthouse для проверки метрик.',
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: 'loading="lazy"',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Chrome 77\\+ ✅\n- Firefox 75\\+ ✅\n- Safari 15.4\\+ ✅\n- Edge 79\\+ ✅',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '~95% глобальной поддержки',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'IntersectionObserver',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- Chrome 51\\+ ✅\n- Firefox 55\\+ ✅\n- Safari 12.1\\+ ✅\n- Edge 15\\+ ✅',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '~97% глобальной поддержки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'callout-61',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-62',
              type: 'prose',
              markdown:
                '- Всегда указывайте `width` и `height` для предотвращения CLS\n- Используйте `loading="eager"` для LCP\\-изображений\n- Добавляйте `fetchpriority="high"` для критических изображений\n- Комбинируйте с современными форматами (WebP, AVIF)\n- Для iframe используйте Facade Pattern (особенно YouTube)\n- Тестируйте на медленном соединении (Fast 3G throttling)\n- Измеряйте эффект через Lighthouse и Core Web Vitals',
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
          id: 'text-63',
          type: 'prose',
          markdown:
            'Lazy loading — мощная техника оптимизации, которая критически важна для современного веба. Используйте нативное `loading="lazy"` для большинства случаев, IntersectionObserver для точного контроля, и Facade Pattern для тяжелых iframe. Правильное применение lazy loading значительно улучшает начальную загрузку страницы, экономит трафик пользователей и положительно влияет на все Core Web Vitals метрики.',
        },
        {
          id: 'resources-64',
          type: 'resources',
          items: [
            {
              id: 'link-65',
              label: 'Web.dev: Native Lazy Loading',
              url: 'https://web.dev/browser-level-image-lazy-loading/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
