import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-request-animation-frame-basicexamplesnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-request-animation-frame-performancecomparisonsnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-request-animation-frame-eventloopintegrationsnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-request-animation-frame-deltatimesnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-request-animation-frame-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-request-animation-frame-reactexamplessnippet.txt?raw'

// Content copied verbatim from src/views/web-api/WebAPIRequestAnimationFrame.vue.
export default {
  ...articleSummaries.webApiWebAPIRequestAnimationFrame,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**requestAnimationFrame (RAF)** — это Web API для создания плавных анимаций, синхронизированных с частотой обновления экрана браузера. В отличие от setTimeout/setInterval, RAF автоматически оптимизирован браузером, экономит батарею и обеспечивает стабильные 60 FPS.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основная концепция',
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
                  text: 'setTimeout/setInterval',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- Фиксированный интервал (~16ms)\n- Не синхронизирован с монитором\n- Работает на неактивных вкладках\n- Может пропускать/дублировать фреймы\n- Нет автооптимизации\n- **Тратит батарею**',
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
                  text: 'requestAnimationFrame',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Адаптируется к частоте монитора\n- 60Hz/120Hz/144Hz автоматически\n- Пауза на неактивных вкладках\n- Батчинг всех RAF коллбэков\n- Выполняется перед paint\n- **Экономит батарею**',
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
                  text: 'Производительность',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **setTimeout:** 45\\-60 FPS (нестабильно)\n- **RAF:** стабильные 60 FPS\n- CPU на неактивной вкладке:\n- setTimeout: ~100%\n- RAF: ~5%\n- **В 20 раз эффективнее!**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы requestAnimationFrame',
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
                '**Ключевое преимущество:** RAF синхронизирован с циклом рендеринга браузера и выполняется ровно перед следующим paint, обеспечивая идеальную плавность анимаций.',
            },
          ],
        },
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Сравнение производительности',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Детальное сравнение подходов',
      blocks: [
        {
          id: 'table-16',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'setInterval',
            },
            {
              id: 'column-3',
              label: 'setTimeout (рекурсивный)',
            },
            {
              id: 'column-4',
              label: 'requestAnimationFrame',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '**Частота вызова**',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Фиксированная (~16ms)',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Фиксированная (~16ms)',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Адаптивная (монитор)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Синхронизация с рендерингом**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Пауза на неактивных вкладках**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '✅ Автоматическая',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '**Батчинг коллбэков**',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Layout thrashing**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '⚠️ Возможен',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '⚠️ Возможен',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '✅ Минимизирован',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '**Timestamp параметр**',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '✅ Да (DOMHighResTimeStamp)',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '**Энергопотребление**',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Высокое',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Высокое',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Низкое',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**FPS стабильность**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '45\\-60 (скачки)',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '50\\-60 (нестабильно)',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Стабильные 60',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '**Поддержка 120Hz/144Hz**',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '✅ Автоматически',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Взаимодействие с Event Loop браузера',
      blocks: [
        {
          id: 'callout-53',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-54',
              type: 'prose',
              markdown:
                '**Важно:** requestAnimationFrame выполняется <u>после microtasks</u>, но <u>перед paint/composite</u> — это идеальное место для обновления визуальных изменений!',
            },
          ],
        },
        {
          id: 'code-55',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Место RAF в цикле рендеринга',
      blocks: [
        {
          id: 'cards-56',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-57',
              title: 'Один фрейм браузера (~16.67ms @ 60Hz)',
              blocks: [
                {
                  id: 'steps-58',
                  type: 'steps',
                  mode: 'sequence',
                  showTitle: false,
                  items: [
                    {
                      id: 'step-59',
                      title: 'Script Execution',
                      blocks: [],
                    },
                    {
                      id: 'step-60',
                      title: 'Microtasks',
                      blocks: [],
                    },
                    {
                      id: 'step-61',
                      title: 'Style Calc',
                      blocks: [],
                    },
                    {
                      id: 'step-62',
                      title: 'Layout',
                      blocks: [],
                    },
                    {
                      id: 'step-63',
                      title: 'RAF Callbacks',
                      blocks: [],
                    },
                    {
                      id: 'step-64',
                      title: 'Paint',
                      blocks: [],
                    },
                    {
                      id: 'step-65',
                      title: 'Composite',
                      blocks: [],
                    },
                  ],
                },
                {
                  id: 'callout-66',
                  type: 'callout',
                  tone: 'success',
                  blocks: [
                    {
                      id: 'text-67',
                      type: 'prose',
                      markdown:
                        'RAF выполняется между Layout и Paint — это гарантирует, что все изменения будут отрисованы в текущем фрейме без дополнительного reflow!',
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
      id: 'section-7',
      title: 'Работа с Delta Time для плавных анимаций',
      blocks: [
        {
          id: 'callout-68',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-69',
              type: 'prose',
              markdown:
                '**Проблема:** Без учета delta time анимации идут с разной скоростью на 60Hz (16.67ms), 120Hz (8.33ms) и 144Hz (6.94ms) мониторах!',
            },
          ],
        },
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические примеры применения',
      blocks: [
        {
          id: 'code-71',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Использование в React',
      blocks: [
        {
          id: 'callout-72',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-73',
              type: 'prose',
              markdown:
                '**Best Practice:** Всегда отменяйте RAF в cleanup функции useEffect для предотвращения утечек памяти!',
            },
          ],
        },
        {
          id: 'code-74',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Когда использовать каждый подход?',
      blocks: [
        {
          id: 'cards-75',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-76',
              title: '✅ requestAnimationFrame',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown: 'Используйте для:',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Визуальных анимаций\n- Плавных переходов\n- Скролл\\-эффектов\n- Canvas/WebGL рендеринга\n- Игровых циклов\n- Перемещения элементов\n- Параллакс эффектов',
                },
              ],
            },
            {
              id: 'card-79',
              title: '⚠️ setTimeout',
              blocks: [
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown: 'Используйте для:',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Задержек выполнения\n- Debounce/Throttle\n- Таймеров обратного отсчета\n- Отложенной логики\n- API polling (с большими интервалами)\n- Неявных действий фона',
                },
              ],
            },
            {
              id: 'card-82',
              title: '❌ setInterval',
              blocks: [
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown: 'Избегайте для анимаций!',
                },
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- Можно для: часов реального времени\n- Периодических проверок\n- Но для визуальных эффектов:\n- ❌ Нестабильный FPS\n- ❌ Тратит батарею\n- ❌ Не оптимизирован\n- **Используйте RAF!**',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-85',
          type: 'prose',
          markdown:
            "1. **Почему requestAnimationFrame лучше setTimeout для анимаций?**\n   \n   RAF синхронизирован с частотой обновления монитора (60/120/144 Hz), автоматически останавливается на неактивных вкладках, батчит все коллбэки в один фрейм и выполняется перед paint — это обеспечивает стабильные 60 FPS и экономию батареи. setTimeout работает с фиксированной задержкой, не синхронизирован с рендерингом и тратит ресурсы впустую.\n2. **Где в Event Loop выполняется requestAnimationFrame?**\n   \n   RAF выполняется после microtasks и Layout, но перед Paint/Composite. Порядок: Macrotask → Microtasks → Style Calc → Layout → **RAF callbacks** → Paint → Composite. Это идеальное место для обновления анимаций — все изменения будут отрисованы в текущем фрейме.\n3. **Что такое delta time и зачем его учитывать?**\n   \n   Delta time — это время между фреймами в миллисекундах. Без его учета анимации идут с разной скоростью на мониторах с разной частотой (60Hz vs 120Hz vs 144Hz). Приращение должно зависеть от времени: `position += speed * (deltaTime / 1000)`, а не от количества фреймов.\n4. **Как отменить requestAnimationFrame?**\n   \n   RAF возвращает ID, который можно передать в `cancelAnimationFrame(id)`. В React важно отменять RAF в cleanup функции useEffect, иначе анимация продолжит работать после размонтирования компонента, вызывая утечки памяти.\n5. **Что происходит с RAF на неактивных вкладках?**\n   \n   Браузер автоматически приостанавливает RAF на неактивных вкладках, снижая частоту вызовов до ~1 FPS (вместо 60 FPS). Это экономит CPU и батарею. setTimeout/setInterval продолжают работать с полной частотой, тратя ресурсы впустую.\n6. **Как RAF помогает избежать layout thrashing?**\n   \n   Все RAF коллбэки выполняются батчем между Layout и Paint. Если правильно группировать чтения (offsetHeight, getBoundingClientRect) перед записями (style.height), браузер выполнит только один Layout вместо множественных пересчетов. setTimeout может вызывать layout в любой момент, приводя к thrashing.\n7. **Можно ли использовать RAF для серверного рендеринга?**\n   \n   Нет, RAF — это браузерный API. В Node.js его нет. Для SSR нужно проверять окружение: `typeof requestAnimationFrame !== 'undefined'` и использовать полифилл или пропускать анимации на сервере.\n8. **Как оптимизировать React компоненты с RAF?**\n   \n   Не вызывать setState на каждом фрейме (60 раз в секунду) — это перегружает React. Лучше throttle обновления до 30 FPS или использовать refs для изменения DOM напрямую через `element.style.transform`, обновляя state только для критичных данных.",
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-86',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-87',
              blocks: [
                {
                  id: 'heading-88',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- Всегда учитывать delta time\n- Отменять RAF в cleanup (React)\n- Использовать transform вместо left/top\n- Батчить чтения и записи DOM\n- Использовать will\\-change для GPU\n- Throttle setState в React',
                },
              ],
            },
            {
              id: 'card-90',
              blocks: [
                {
                  id: 'heading-91',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-92',
                  type: 'prose',
                  markdown:
                    '- setTimeout/setInterval для анимаций\n- Забывать cancelAnimationFrame\n- Игнорировать delta time\n- Layout thrashing (чтение/запись)\n- setState на каждом фрейме в React\n- Анимации без оптимизации GPU',
                },
              ],
            },
            {
              id: 'card-93',
              blocks: [
                {
                  id: 'heading-94',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-95',
                  type: 'prose',
                  markdown:
                    '- Используйте DevTools Performance\n- Мониторьте FPS в production\n- Тестируйте на 120Hz/144Hz мониторах\n- Сглаживайте delta time\n- Используйте Web Workers для тяжелых вычислений\n- Профилируйте анимации',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Сравнение энергопотребления',
      blocks: [
        {
          id: 'cards-96',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-97',
              title: 'CPU использование на неактивных вкладках',
              blocks: [
                {
                  id: 'heading-98',
                  type: 'heading',
                  level: 4,
                  text: 'setInterval',
                },
                {
                  id: 'progress-99',
                  type: 'progress',
                  value: 100,
                  label: '**100% CPU**',
                  tone: 'error',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown: 'Постоянно работает в фоне',
                },
                {
                  id: 'heading-101',
                  type: 'heading',
                  level: 4,
                  text: 'setTimeout',
                },
                {
                  id: 'progress-102',
                  type: 'progress',
                  value: 95,
                  label: '**95% CPU**',
                  tone: 'warning',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown: 'Немного лучше, но всё равно тратит',
                },
                {
                  id: 'heading-104',
                  type: 'heading',
                  level: 4,
                  text: 'requestAnimationFrame',
                },
                {
                  id: 'progress-105',
                  type: 'progress',
                  value: 5,
                  label: '**5% CPU**',
                  tone: 'success',
                },
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown: 'Автоматическая пауза',
                },
                {
                  id: 'callout-107',
                  type: 'callout',
                  tone: 'success',
                  blocks: [
                    {
                      id: 'text-108',
                      type: 'prose',
                      markdown:
                        'RAF экономит **95% CPU/батареи** на неактивных вкладках по сравнению с setTimeout!',
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
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-109',
          type: 'prose',
          markdown:
            '**requestAnimationFrame** — это стандартный оптимальный способ создания плавных анимаций в браузере. Ключевые преимущества перед setTimeout/setInterval: синхронизация с частотой обновления монитора (60/120/144 Hz), автоматическая пауза на неактивных вкладках, батчинг всех коллбэков перед paint, отсутствие layout thrashing и экономия до 95% CPU/батареи. В Event Loop RAF выполняется между Layout и Paint — идеальное место для обновления визуальных изменений. Критически важно учитывать delta time для одинаковой скорости анимаций на разных мониторах и всегда отменять RAF в React cleanup для предотвращения утечек памяти.',
        },
        {
          id: 'resources-110',
          type: 'resources',
          items: [
            {
              id: 'link-111',
              label: 'MDN requestAnimationFrame',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame',
            },
          ],
        },
        {
          id: 'resources-112',
          type: 'resources',
          items: [
            {
              id: 'link-113',
              label: 'Web.dev Animation Guide',
              url: 'https://web.dev/animations-guide/',
            },
          ],
        },
        {
          id: 'resources-114',
          type: 'resources',
          items: [
            {
              id: 'link-115',
              label: 'Chrome RenderingNG',
              url: 'https://developer.chrome.com/blog/renderingng/#requestanimationframe-callbacks',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
