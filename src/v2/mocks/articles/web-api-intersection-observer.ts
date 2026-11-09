import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-intersection-observer-basicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-intersection-observer-infinitescrollsnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-intersection-observer-reactinfinitescrollsnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-intersection-observer-optimizationssnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-intersection-observer-multipleelementssnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-intersection-observer-practicalexamplessnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-intersection-observer-performancesnippet.txt?raw'

// Content copied verbatim from src/views/web-api/IntersectionObserverInfo.vue.
export default {
  ...articleSummaries.webApiIntersectionObserverInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**IntersectionObserver API** — современный способ отслеживания видимости элементов на странице. Позволяет асинхронно наблюдать за пересечением элемента с viewport или другим элементом\\-предком. Идеален для реализации lazy loading, infinite scroll, аналитики просмотров и анимаций.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'IntersectionObserver — основы',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Преимущества:** Не блокирует main thread, работает асинхронно, высокая производительность',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Ключевые концепции',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              title: 'IntersectionObserverEntry',
              blocks: [
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown:
                    '- `isIntersecting` — boolean\n- `intersectionRatio` — 0.0 до 1.0\n- `target` — наблюдаемый элемент\n- `boundingClientRect` — размеры элемента\n- `intersectionRect` — область пересечения\n- `rootBounds` — размеры root',
                },
              ],
            },
            {
              id: 'card-8',
              title: 'Опции Observer',
              blocks: [
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    "- `root` — контейнер (null = viewport)\n- `rootMargin` — отступы ('0px')\n- `threshold` — пороги срабатывания",
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown: '**threshold примеры:**',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- `0` — любое пересечение\n- `0.5` — 50% видимости\n- `[0, 0.5, 1]` — несколько порогов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Реализация Infinity Scroll',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Правильный подход:** Использовать sentinel элемент в конце списка для отслеживания',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Infinity Scroll в React',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Оптимизации Infinity Scroll',
      blocks: [
        {
          id: 'cards-16',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'Виртуализация',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Рендерить только видимые элементы. Для списков &gt;1000 элементов',
                },
              ],
            },
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: 'Батчинг',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown: 'Загружать несколько страниц за раз. Уменьшает количество запросов',
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
                  text: 'Предзагрузка',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: 'Prefetching следующей страницы. Улучшает воспринимаемую скорость',
                },
              ],
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Наблюдение за несколькими элементами',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Производительность и лучшие практики',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Типичные сценарии использования',
      blocks: [
        {
          id: 'cards-30',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-31',
              title: '🖼️ Оптимизация загрузки',
              blocks: [
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- Lazy loading изображений\n- Отложенная загрузка видео\n- Ленивая инициализация компонентов\n- Динамический импорт модулей',
                },
              ],
            },
            {
              id: 'card-33',
              title: '📜 Infinite Scroll',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Бесконечная лента новостей\n- Галереи изображений\n- Список товаров в e\\-commerce\n- Комментарии и отзывы',
                },
              ],
            },
            {
              id: 'card-35',
              title: '🎬 Анимации',
              blocks: [
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- Fade\\-in при появлении\n- Slide\\-in эффекты\n- Параллакс скроллинг\n- Прогрессивное появление элементов',
                },
              ],
            },
            {
              id: 'card-37',
              title: '📊 Аналитика',
              blocks: [
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- Отслеживание просмотров\n- Impressions для рекламы\n- Время нахождения элемента на экране\n- A/B тестирование видимости',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            "1. **Как реализовать InfinityScroll с IntersectionObserver?**\n   \n   Создать sentinel элемент в конце списка, наблюдать за ним через IntersectionObserver. Когда sentinel становится видимым (isIntersecting === true), загружать следующую порцию данных. Важно: добавить проверки на loading состояние и hasMore флаг.\n2. **Как оптимизировать InfinityScroll?**\n   \n   1\\) Виртуализация списка для больших данных; 2) Батчинг \\- загрузка нескольких страниц; 3) Prefetching \\- предзагрузка следующей страницы; 4) Дебаунс callback'ов; 5) Отмена предыдущих запросов через AbortController; 6) Lazy loading изображений внутри элементов; 7) Использование скелетон\\-загрузчиков для UX.\n3. **В чем разница между IntersectionObserver и scroll event?**\n   \n   IntersectionObserver работает асинхронно, не блокирует main thread, вычисления происходят в отдельном потоке. Scroll event синхронный, запускается постоянно, требует throttle/debounce, может вызвать layout thrashing. IntersectionObserver производительнее и проще в использовании.\n4. **Что такое threshold и rootMargin?**\n   \n   `threshold` определяет, при какой видимости элемента (0.0\\-1.0) срабатывает callback. Можно задать массив порогов \\[0, 0.5, 1.0\\]. `rootMargin` — отступы от границ root (как CSS margin), позволяет загружать контент заранее, например '100px' загрузит за 100px до края.\n5. **Как обрабатывать несколько элементов с разной логикой?**\n   \n   Использовать один IntersectionObserver и Map для хранения обработчиков для каждого элемента. В callback получать handler из Map по entry.target и вызывать его. Это эффективнее, чем создавать отдельный Observer для каждого элемента.\n6. **Как правильно очищать IntersectionObserver?**\n   \n   Вызывать `observer.disconnect()` при размонтировании компонента. В React использовать cleanup функцию в useEffect. Также можно использовать `observer.unobserve(element)` для прекращения наблюдения за конкретным элементом (например, после загрузки изображения).\n7. **Что такое sentinel элемент в контексте InfinityScroll?**\n   \n   Sentinel — это маркерный элемент в конце списка, за которым наблюдает IntersectionObserver. Когда он становится видимым, загружается новая порция данных. Это более надежно, чем отслеживать последний элемент данных, так как sentinel всегда остается в конце.",
        },
      ],
    },
    {
      id: 'section-11',
      title: 'IntersectionObserver vs Scroll Event',
      blocks: [
        {
          id: 'table-40',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'IntersectionObserver',
            },
            {
              id: 'column-3',
              label: 'Scroll Event',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ Отличная (асинхронный)',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '⚠️ Требует оптимизации',
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
                    markdown: '**Main Thread**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '✅ Не блокирует',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '❌ Блокирует',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Точность**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '✅ Точное пересечение',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '⚠️ Ручные вычисления',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '✅ Простой API',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '⚠️ Нужен throttle/debounce',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Поддержка**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '✅ Все современные браузеры',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '✅ Универсальная',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Use Case**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Lazy loading, infinite scroll, аналитика',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Кастомная логика, старые браузеры',
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
      title: 'Лучшие практики',
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
                  text: '✅ Делать',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Переиспользовать один Observer\n- Вызывать disconnect() при unmount\n- Использовать rootMargin для preloading\n- Добавлять loading состояния\n- Обрабатывать ошибки загрузки\n- Показывать индикаторы загрузки',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Создавать Observer для каждого элемента\n- Забывать про cleanup\n- Слишком много threshold порогов\n- Тяжелые операции в callback\n- Игнорировать loading состояние\n- Загружать без проверки hasMore',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Использовать sentinel элемент\n- Батчить запросы когда возможно\n- Предзагружать следующие данные\n- Виртуализация для больших списков\n- Отменять старые запросы (AbortController)\n- Мониторить производительность',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            "**IntersectionObserver** — мощный и производительный API для отслеживания видимости элементов. Идеален для реализации **Infinity Scroll** через sentinel элемент в конце списка. **Оптимизации:** виртуализация списка, батчинг запросов, prefetching, дебаунс callback'ов, lazy loading изображений. **Преимущества:** асинхронность, не блокирует main thread, простой API, высокая производительность. Правильное использование значительно улучшает UX и производительность веб\\-приложений.",
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'MDN IntersectionObserver',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'Web.dev Guide',
              url: 'https://web.dev/intersectionobserver/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
