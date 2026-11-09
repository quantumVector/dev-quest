import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/html/responsive-image-snippet1.html.txt?raw'
import example2 from '../snippets/html/responsive-image-snippet2.html.txt?raw'
import example3 from '../snippets/html/responsive-image-snippet3.html.txt?raw'
import example4 from '../snippets/html/responsive-image-snippet6.html.txt?raw'
import example5 from '../snippets/html/responsive-image-snippet7.html.txt?raw'
import example6 from '../snippets/html/responsive-image-snippet8.html.txt?raw'
import example7 from '../snippets/html/responsive-image-snippet9.html.txt?raw'
import example8 from '../snippets/html/responsive-image-snippet4.html.txt?raw'
import example9 from '../snippets/html/responsive-image-snippet5.html.txt?raw'
import example10 from '../snippets/html/responsive-image-snippet10.html.txt?raw'

// Content copied verbatim from src/views/html/ResponsiveImage.vue.
export default {
  ...articleSummaries.responsiveImage,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Адаптивные изображения** — это техника, которая позволяет загружать и отображать изображения, оптимизированные для конкретного устройства пользователя: размера экрана, плотности пикселей, пропускной способности сети и формата поддержки браузера.',
    },
  ],
  sections: [
    {
      id: 'goals',
      title: 'Основные задачи адаптивных изображений',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Задача',
            },
            {
              id: 'column-2',
              label: 'Решение',
            },
            {
              id: 'column-3',
              label: 'Результат',
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
                    markdown: '**Масштабирование**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'CSS: max-width: 100%, height: auto',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Изображение не выходит за границы контейнера',
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
                    markdown: '**Разные размеры экрана**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'srcset + sizes или &lt;picture&gt;',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Подходящий размер для каждого устройства',
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
                    markdown: '**Retina-дисплеи**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'srcset с дескрипторами плотности (1x, 2x)',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Чёткость на экранах высокой плотности',
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
                    markdown: '**Современные форматы**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '&lt;picture&gt; с &lt;source type="image/webp"&gt;',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Меньший размер файлов при поддержке',
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
                    markdown: '**Art Direction**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '&lt;picture&gt; с media queries',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Разные кадрировки для разных экранов',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'css',
      title: '1. Базовая адаптивность через CSS',
      blocks: [
        {
          id: 'text-18',
          type: 'prose',
          markdown:
            'Самый простой способ — сделать изображение масштабируемым через CSS. Размер изображения в layout всегда определяется CSS, а не атрибутами `sizes` или `srcset`.',
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
      id: 'picture',
      title: '2. Элемент <picture> для разных экранов',
      blocks: [
        {
          id: 'text-20',
          type: 'prose',
          markdown:
            'Для подачи разных изображений на разных устройствах. Медиа-запросы в `<picture>` пишутся в атрибуте `media` тега `<source>` — это механизм **art direction**.',
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
      id: 'srcset',
      title: '3. Атрибут srcset: дескрипторы w и x',
      blocks: [
        {
          id: 'text-22',
          type: 'prose',
          markdown:
            'В `srcset` пишутся только файлы с дескрипторами. Медиа-запросы сюда **не пишутся** — только `w` (ширина ресурса) или `x` (плотность пикселей). Нельзя использовать `px` и нельзя миксовать `w` и `x` в одном атрибуте.',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'markup',
          code: example3,
        },
        {
          id: 'table-24',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Дескриптор',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Адаптив + разные ширины',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`w` + `sizes`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '`photo-400.jpg 400w`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Фиксированный размер, только Retina',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`x`',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '`photo@2x.jpg 2x`',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'syntax',
      title: '4. Синтаксис srcset и sizes: что куда писать',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            'Разделение ответственности: `srcset` — список файлов, `sizes` — медиа-условия и размер места под картинку. Браузер знает только то, что вы описали в `sizes`, и выбирает файл из `srcset` на основе этого.',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'markup',
          code: example4,
        },
      ],
    },
    {
      id: 'selection',
      title: '5. Как браузер выбирает файл из srcset',
      blocks: [
        {
          id: 'text-33',
          type: 'prose',
          markdown:
            'Алгоритм выбора происходит в три шага ещё **до** загрузки CSS и применения стилей:',
        },
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Шаг',
            },
            {
              id: 'column-2',
              label: 'Что происходит',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '1\\. Вычисление из sizes',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Браузер применяет медиа-условия и берёт подходящее значение',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'viewport 1000px → `50vw` → 500 CSS px',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '2\\. Учёт DPR',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'CSS px умножается на Device Pixel Ratio',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '500 × 2 (Retina) = 1000 физических px',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '3\\. Выбор из srcset',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Браузер выбирает ближайший подходящий файл',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Нужно ~1000px → выбирается `1200w`',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-44',
          type: 'code',
          language: 'markup',
          code: example5,
        },
        {
          id: 'callout-45',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-46',
              type: 'prose',
              markdown:
                'Если `sizes` не указан, браузер предполагает `100vw` и может загрузить слишком большое изображение.',
            },
          ],
        },
      ],
    },
    {
      id: 'layout',
      title: '6. sizes не задаёт размер в layout',
      blocks: [
        {
          id: 'text-47',
          type: 'prose',
          markdown:
            'Распространённое заблуждение: если написать `sizes="50vw"`, картинка станет 50vw на странице. Это неверно. `sizes` — это только подсказка браузеру для выбора файла. Реальный размер всегда определяется **CSS**.',
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'markup',
          code: example6,
        },
      ],
    },
    {
      id: 'sizes-values',
      title: '7. Что можно и нельзя писать в sizes',
      blocks: [
        {
          id: 'text-49',
          type: 'prose',
          markdown:
            'Браузер вычисляет `sizes` до layout, поэтому допустимы только значения, зависящие от viewport. Относительные единицы вроде `%`, `em`, `rem` запрещены — браузер не знает размер родителя в этот момент.',
        },
        {
          id: 'code-50',
          type: 'code',
          language: 'markup',
          code: example7,
        },
        {
          id: 'table-51',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Атрибут',
            },
            {
              id: 'column-2',
              label: 'Допустимо',
            },
            {
              id: 'column-3',
              label: 'Недопустимо',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '`srcset`',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '`400w`, `2x`',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`400px`, медиа-запросы, `w` и `x` вместе',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '`sizes`',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '`px`, `vw`, `calc()`, медиа-условия',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`%`, `em`, `rem`, `vh`, `auto`',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'formats',
      title: '8. Современные форматы и Art Direction',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            '`<picture>` позволяет два разных сценария: поддержку современных форматов (WebP, AVIF) через `type` и art direction через `media`. Это нельзя сделать одним `srcset` на `<img>`.',
        },
        {
          id: 'code-59',
          type: 'code',
          language: 'markup',
          code: example8,
        },
      ],
    },
    {
      id: 'complete-example',
      title: '9. Комплексный пример',
      blocks: [
        {
          id: 'text-60',
          type: 'prose',
          markdown: 'Реальный пример с учётом всех техник:',
        },
        {
          id: 'code-61',
          type: 'code',
          language: 'markup',
          code: example9,
        },
      ],
    },
    {
      id: 'nextjs',
      title: '10. Next.js Image: WebP и content negotiation',
      blocks: [
        {
          id: 'text-62',
          type: 'prose',
          markdown:
            'Next.js конвертирует изображения в WebP **не на диске**, а динамически при запросе. Оригинальный файл остаётся неизменным. Процесс: браузер отправляет заголовок `Accept: image/webp`, Next.js проверяет его и через библиотеку **sharp** конвертирует изображение на лету, кэшируя результат.',
        },
        {
          id: 'code-63',
          type: 'code',
          language: 'markup',
          code: example10,
        },
        {
          id: 'table-64',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Браузер поддерживает WebP',
            },
            {
              id: 'column-2',
              label: 'Next.js отдаёт',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Да (Chrome, Edge, Firefox, Safari 14+)',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'WebP, оптимизированный через sharp',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Нет (старые Safari)',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Исходный формат (JPEG/PNG)',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'attributes',
      title: 'Ключевые атрибуты и их значения',
      blocks: [
        {
          id: 'cards-69',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-70',
              title: 'srcset',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown: 'Список изображений с дескрипторами:',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- `1x, 2x` — плотность пикселей (нельзя с w)\n- `400w, 800w` — реальная ширина файла (нельзя px)',
                },
              ],
            },
            {
              id: 'card-73',
              title: 'sizes',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown: 'Подсказка браузеру о размере картинки:',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- `100vw` — на всю ширину viewport\n- `50vw` — половина viewport\n- `calc(100vw - 32px)` — с учётом паддингов\n- `320px` — фиксированный размер',
                },
              ],
            },
            {
              id: 'card-76',
              title: 'loading',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown: 'Стратегия загрузки:',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- `lazy` — при приближении к viewport\n- `eager` — немедленно (по умолчанию)',
                },
              ],
            },
            {
              id: 'card-79',
              title: 'decoding',
              blocks: [
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown: 'Приоритет декодирования:',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- `async` — асинхронно\n- `sync` — синхронно\n- `auto` — браузер решает',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-82',
          type: 'prose',
          markdown:
            '1. **В чём разница между srcset и &lt;picture&gt;?**\n   \n   `srcset` — для разных размеров одного изображения, браузер сам выбирает. `<picture>` — для art direction (разные кадрировки) и поддержки форматов. В `<source>` можно писать медиа-запросы, в `srcset` — нельзя.\n2. **Как работает алгоритм выбора файла из srcset?**\n   \n   Браузер вычисляет размер из `sizes` (в CSS px), умножает на DPR устройства и выбирает ближайший подходящий файл из `srcset`. Этот расчёт происходит до загрузки CSS — поэтому в `sizes` нельзя использовать `em` или `%`.\n3. **Задаёт ли sizes размер изображения в layout?**\n   \n   Нет. `sizes` — только подсказка браузеру для выбора файла. Реальный размер определяется исключительно CSS. Если не задать CSS, картинка отобразится в своём intrinsic size (реальный размер файла).\n4. **Можно ли писать px в srcset?**\n   \n   Нет. В `srcset` допустимы только `w` (ширина файла) и `x` (плотность пикселей). `400px` — невалидный синтаксис, браузер проигнорирует. Нельзя также миксовать `w` и `x` в одном `srcset`.\n5. **Когда использовать loading="lazy"?**\n   \n   Для изображений ниже первого экрана. Не используйте для LCP-изображений (largest contentful paint) — это замедлит загрузку критического контента.\n6. **Как Next.js конвертирует изображения в WebP?**\n   \n   Через Image Optimization API (`/_next/image?url=…&w=800&q=75`). Браузер отправляет заголовок `Accept: image/webp`. Next.js через библиотеку sharp конвертирует файл в память и отдаёт результат — оригинал на диске не меняется. Результат кэшируется для повторных запросов.\n7. **Какие форматы изображений поддерживать?**\n   \n   Современные: AVIF (лучшее сжатие), WebP (широкая поддержка). Fallback: JPEG/PNG. В `<picture>` всегда начинайте с самого современного формата — браузер возьмёт первый поддерживаемый.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Инструменты и сервисы',
      blocks: [
        {
          id: 'cards-83',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-84',
              title: 'Оптимизация на стороне сервера',
              blocks: [
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Next.js Image (sharp под капотом)\n- Gatsby Image\n- Webpack loaders\n- Vite plugins',
                },
              ],
            },
            {
              id: 'card-86',
              title: 'CDN сервисы',
              blocks: [
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- Cloudflare Images\n- AWS CloudFront\n- ImageKit\n- Fastly\n- Cloudinary',
                },
              ],
            },
            {
              id: 'card-88',
              title: 'Инструменты анализа',
              blocks: [
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- Chrome DevTools → Network → Img\n- Lighthouse (Core Web Vitals)\n- Squoosh (сравнение форматов)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итог',
      blocks: [
        {
          id: 'text-90',
          type: 'prose',
          markdown:
            'Эффективные адаптивные изображения строятся на чётком разделении ответственности: `srcset` описывает доступные файлы (`w` или `x`), `sizes` сообщает браузеру о месте под картинку (только `px`, `vw`, `calc()`), а **CSS** реально управляет размером в layout. Браузер применяет трёхшаговый алгоритм (sizes → × DPR → выбор из srcset) до загрузки CSS. `<picture>` используется для art direction и поддержки форматов. В Next.js оптимизация происходит автоматически через content negotiation и sharp.',
        },
        {
          id: 'resources-91',
          type: 'resources',
          items: [
            {
              id: 'link-92',
              label: 'MDN: Responsive Images',
              url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
