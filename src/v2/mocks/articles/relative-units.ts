import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/relative-units-snippet1.css.txt?raw'
import example2 from '../snippets/css/relative-units-snippet2.css.txt?raw'
import example3 from '../snippets/css/relative-units-snippet3.css.txt?raw'
import example4 from '../snippets/css/relative-units-snippet4.css.txt?raw'
import example5 from '../snippets/css/relative-units-snippet5.css.txt?raw'
import example6 from '../snippets/css/relative-units-snippet6.css.txt?raw'
import example7 from '../snippets/css/relative-units-snippet7.css.txt?raw'
import example8 from '../snippets/css/relative-units-snippet8.css.txt?raw'
import example9 from '../snippets/css/relative-units-snippet9.css.txt?raw'
import example10 from '../snippets/css/relative-units-snippet10.css.txt?raw'
import example11 from '../snippets/css/relative-units-snippet11.css.txt?raw'
import example12 from '../snippets/css/relative-units-snippet12.css.txt?raw'

// Content copied verbatim from src/views/css/RelativeUnits.vue.
export default {
  ...articleSummaries.relativeUnits,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Относительные единицы измерения** — это система размеров, которые вычисляются относительно других значений (родительского элемента, размера шрифта, viewport). Они обеспечивают адаптивность, доступность и лучшую масштабируемость интерфейсов по сравнению с абсолютными единицами.',
    },
  ],
  sections: [
    {
      id: 'benefits',
      title: 'Основные преимущества',
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
              label: 'Пример использования',
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
                    markdown: '**Адаптивность**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Автоматическое масштабирование под разные экраны',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'vw, vh для полноэкранных элементов',
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
                    markdown: '**Доступность**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Уважение к настройкам пользователя',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'rem учитывает увеличенный шрифт',
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
                    markdown: '**Согласованность**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Пропорциональные отношения элементов',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'em для отступов внутри компонентов',
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
                    markdown: '**Меньше Media Queries**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Естественная адаптация без точек останова',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'clamp() для плавных переходов',
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
                    markdown: '**Типографика**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Контроль читаемости и пропорций',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'ch для оптимальной длины строки',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'absolute-units',
      title: 'Проблемы абсолютных единиц',
      blocks: [
        {
          id: 'code-18',
          type: 'code',
          language: 'css',
          code: example1,
        },
      ],
    },
    {
      id: 'relative-units',
      title: 'Решение с относительными единицами',
      blocks: [
        {
          id: 'code-19',
          type: 'code',
          language: 'css',
          code: example2,
        },
      ],
    },
    {
      id: 'unit-types',
      title: 'Основные типы относительных единиц',
      blocks: [
        {
          id: 'widget-20',
          type: 'widget',
          name: 'css-units',
          props: {
            compact: true,
          },
        },
        {
          id: 'resources-21',
          type: 'resources',
          items: [
            {
              id: 'link-22',
              label: 'Открыть лабораторию отдельно',
              url: '/apps/css-units',
            },
          ],
        },
        {
          id: 'heading-23',
          type: 'heading',
          level: 3,
          text: '1. em - относительно родительского font-size',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'css',
          code: example3,
        },
        {
          id: 'heading-25',
          type: 'heading',
          level: 3,
          text: '2. rem - относительно корневого font-size',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'css',
          code: example4,
        },
        {
          id: 'cards-27',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-28',
              title: 'Что значит «пользователь увеличил шрифт»?',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown:
                    'У пользователя есть несколько способов сделать текст крупнее. Самый привычный — изменить масштаб страницы сочетанием `Ctrl/Cmd + +`. В этом случае браузер увеличивает всю страницу целиком: и текст, и изображения, и размеры в `px`. Это полезно, но не объясняет главное преимущество `rem`.',
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    'Второй способ — изменить **размер шрифта по умолчанию** в настройках браузера. Например, в Chrome это находится в *Настройки → Внешний вид → Размер шрифта*, а более точное значение задается в разделе *Настроить шрифты*. Пользователь может выбрать не стандартные `16px`, а, например, `20px`. Также на размер интерфейса могут влиять системное масштабирование и специальные настройки доступности ОС.',
                },
                {
                  id: 'callout-31',
                  type: 'callout',
                  tone: 'info',
                  blocks: [
                    {
                      id: 'text-32',
                      type: 'prose',
                      markdown:
                        'Если сайт использует `html { font-size: 100%; }`, то `1rem` равен выбранному пользователем базовому размеру. При `16px` значение `1.5rem` даст `24px`, а при `20px` — уже `30px`.',
                    },
                  ],
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    'Поэтому не стоит без необходимости задавать `html { font-size: 16px; }`: такое правило фиксирует корневой размер и может помешать сайту учитывать браузерную настройку пользователя. Значение `100%` обычно сохраняет ожидаемое поведение.',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-34',
          type: 'heading',
          level: 3,
          text: '3. Viewport единицы (vw, vh, vmin, vmax)',
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'css',
          code: example5,
        },
        {
          id: 'heading-36',
          type: 'heading',
          level: 3,
          text: '4. Современные viewport единицы (dvh, svh, lvh)',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'css',
          code: example6,
        },
        {
          id: 'heading-38',
          type: 'heading',
          level: 3,
          text: '5. Процентные единицы (%)',
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'css',
          code: example7,
        },
        {
          id: 'heading-40',
          type: 'heading',
          level: 3,
          text: '6. Типографические единицы (ch, ex)',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'css',
          code: example8,
        },
      ],
    },
    {
      id: 'clamp',
      title: 'Как работает clamp()',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            '`clamp()` — это CSS-функция, которая выбирает значение внутри заданного диапазона. Она принимает три аргумента:',
        },
        {
          id: 'cards-43',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown: '`clamp(минимум, желаемое значение, максимум)`',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '1. Браузер сначала вычисляет **желаемое значение**.\n2. Если оно меньше минимума, используется **минимум**.\n3. Если оно находится между границами, используется само **желаемое значение**.\n4. Если оно больше максимума, используется **максимум**.',
                },
              ],
            },
          ],
        },
        {
          id: 'text-47',
          type: 'prose',
          markdown:
            'Разберем пример `font-size: clamp(1.5rem, 4vw, 3rem)`. Если корневой размер равен `16px`, границы составляют `24px` и `48px`. Среднее значение `4vw` равно четырем процентам ширины окна.',
        },
        {
          id: 'table-48',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Ширина окна',
            },
            {
              id: 'column-2',
              label: 'Вычисление 4vw',
            },
            {
              id: 'column-3',
              label: 'Результат clamp()',
            },
            {
              id: 'column-4',
              label: 'Почему',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '400px',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '16px',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**24px**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '16px меньше минимальных 24px',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '800px',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '32px',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**32px**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Значение находится между границами',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '1600px',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '64px',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**48px**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '64px больше максимальных 48px',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'callout-61',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-62',
              type: 'prose',
              markdown:
                'В итоге на узком экране заголовок не станет мельче `24px`, между контрольными точками будет плавно расти вместе с окном, а на широком экране остановится на `48px`. Для такого поведения не нужны отдельные media queries.',
            },
          ],
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Лучшие практики и комбинирование',
      blocks: [
        {
          id: 'code-63',
          type: 'code',
          language: 'css',
          code: example9,
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Частые ошибки и их решения',
      blocks: [
        {
          id: 'code-64',
          type: 'code',
          language: 'css',
          code: example10,
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Сравнение относительных единиц',
      blocks: [
        {
          id: 'cards-65',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-66',
              title: 'rem',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown: '**Плюсы:** Предсказуемость, accessibility, простота',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown: '**Минусы:** Менее гибкий для компонентов',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown: '**Использование:** Основные размеры шрифтов, отступы',
                },
              ],
            },
            {
              id: 'card-70',
              title: 'em',
              blocks: [
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown: '**Плюсы:** Пропорциональность, компонентность',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown: '**Минусы:** Каскадные эффекты в глубокой вложенности',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown: '**Использование:** Внутренние отступы компонентов',
                },
              ],
            },
            {
              id: 'card-74',
              title: 'Viewport (vw/vh)',
              blocks: [
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown: '**Плюсы:** Истинная адаптивность',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown: '**Минусы:** Экстремальные значения на разных экранах',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown: '**Использование:** Полноэкранные секции, hero-области',
                },
              ],
            },
            {
              id: 'card-78',
              title: 'Проценты (%)',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown: '**Плюсы:** Контекстуальная адаптивность',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown: '**Минусы:** Проблемы с height без определенного контекста',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown: '**Использование:** Ширина, флексбокс, грид',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility и пользовательские настройки',
      blocks: [
        {
          id: 'code-82',
          type: 'code',
          language: 'css',
          code: example11,
        },
      ],
    },
    {
      id: 'performance',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'code-83',
          type: 'code',
          language: 'css',
          code: example12,
        },
      ],
    },
    {
      id: 'limitations',
      title: 'Недостатки относительных единиц',
      blocks: [
        {
          id: 'table-84',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Недостаток',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Решение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**Сложность отладки**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Вычисляемые значения сложнее отследить',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'DevTools Computed tab, документирование',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '**Каскадные эффекты em**',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Непредсказуемые размеры в глубокой вложенности',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Использовать rem вместо em для размеров',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '**Производительность viewport**',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Пересчеты при изменении размера окна',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Ограничивать clamp(), избегать в анимациях',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: '**Экстремальные значения**',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: 'Слишком крупные/мелкие размеры на разных экранах',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: 'clamp() с разумными min/max значениями',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: '**Браузерная поддержка**',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: 'Новые единицы (dvh, container queries) не везде',
                  },
                ],
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: "Fallback'ы и прогрессивные улучшения",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'interview',
      title: 'Рекомендации для собеседования',
      blocks: [
        {
          id: 'cards-100',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-101',
              title: 'Что знать обязательно',
              blocks: [
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    '- Разница между em и rem\n- Когда использовать каждую единицу\n- Проблемы каскадного em\n- Viewport единицы и их применение\n- clamp() для адаптивности',
                },
              ],
            },
            {
              id: 'card-103',
              title: 'Частые вопросы',
              blocks: [
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '- "Чем отличается 1em от 1rem?"\n- "Когда viewport единицы неуместны?"\n- "Как сделать адаптивный шрифт?"\n- "Проблемы с процентной высотой?"\n- "Accessibility и относительные единицы"',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'examples',
      title: 'Практические примеры для демонстрации',
      blocks: [
        {
          id: 'table-105',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Лучший выбор',
            },
            {
              id: 'column-3',
              label: 'Обоснование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: 'Основной текст сайта',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: '1rem',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: 'Предсказуемость, accessibility',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-109',
                    type: 'prose',
                    markdown: 'Отступы внутри карточки',
                  },
                ],
                [
                  {
                    id: 'text-110',
                    type: 'prose',
                    markdown: '1em',
                  },
                ],
                [
                  {
                    id: 'text-111',
                    type: 'prose',
                    markdown: 'Пропорциональность размеру шрифта',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: 'Hero секция',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: '100vh или clamp()',
                  },
                ],
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: 'Полноэкранность или адаптивность',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: 'Читаемая строка текста',
                  },
                ],
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: '65ch',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: 'Оптимальная длина для чтения',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: 'Адаптивная сетка',
                  },
                ],
                [
                  {
                    id: 'text-119',
                    type: 'prose',
                    markdown: '% + rem',
                  },
                ],
                [
                  {
                    id: 'text-120',
                    type: 'prose',
                    markdown: 'Гибкость + предсказуемые отступы',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итоговые выводы',
      blocks: [
        {
          id: 'text-121',
          type: 'prose',
          markdown:
            'Относительные единицы измерения — основа современной адаптивной веб-разработки. Они решают проблемы accessibility, масштабируемости и кроссбраузерности, но требуют понимания контекста применения.',
        },
        {
          id: 'text-122',
          type: 'prose',
          markdown:
            '**Золотое правило:** используйте rem для размеров, которые должны быть предсказуемыми, em для элементов, которые должны масштабироваться пропорционально, и viewport единицы с ограничениями для истинно адаптивных интерфейсов.',
        },
        {
          id: 'callout-123',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-124',
              type: 'prose',
              markdown:
                '**Совет для собеседования:** Всегда приводите конкретные примеры использования и объясняйте, почему выбрали именно эту единицу измерения. Показывайте понимание проблем и способов их решения.',
            },
          ],
        },
        {
          id: 'resources-125',
          type: 'resources',
          items: [
            {
              id: 'link-126',
              label: 'MDN: CSS Units',
              url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
            },
          ],
        },
        {
          id: 'resources-127',
          type: 'resources',
          items: [
            {
              id: 'link-128',
              label: 'Web.dev Guide',
              url: 'https://web.dev/css-units/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
