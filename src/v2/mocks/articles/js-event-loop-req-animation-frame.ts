import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-event-loop-req-animation-frame-basicexamplesnippet.txt?raw'
import example2 from '../snippets/javascript/js-event-loop-req-animation-frame-inline2.txt?raw'
import example3 from '../snippets/javascript/js-event-loop-req-animation-frame-inline3.txt?raw'
import example4 from '../snippets/javascript/js-event-loop-req-animation-frame-inline4.txt?raw'
import example5 from '../snippets/javascript/js-event-loop-req-animation-frame-inline5.txt?raw'
import example6 from '../snippets/javascript/js-event-loop-req-animation-frame-renderingpipelinesnippet.txt?raw'
import example7 from '../snippets/javascript/js-event-loop-req-animation-frame-animationexamplesnippet.txt?raw'
import example8 from '../snippets/javascript/js-event-loop-req-animation-frame-performancecomparisonsnippet.txt?raw'
import example9 from '../snippets/javascript/js-event-loop-req-animation-frame-complexeventloopsnippet.txt?raw'
import example10 from '../snippets/javascript/js-event-loop-req-animation-frame-rafpolyfillsnippet.txt?raw'
import example11 from '../snippets/javascript/js-event-loop-req-animation-frame-debuggingsnippet.txt?raw'

// Content copied verbatim from src/views/js/RequestAnimationFrame.vue.
export default {
  ...articleSummaries.jsRequestAnimationFrame,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**requestAnimationFrame (rAF)** — это специальный API браузера, который планирует выполнение callback-функции перед следующим перерисовыванием страницы. Он занимает особое место в Event Loop, выполняясь ПОСЛЕ микрозадач, но ДО рендеринга и ДО макрозадач.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Место в Event Loop',
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
                '**Важно:** requestAnimationFrame выполняется в специальной фазе Event Loop — между микрозадачами и рендерингом, но перед макрозадачами следующей итерации.',
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
      title: 'Полный цикл рендеринга браузера',
      blocks: [
        {
          id: 'steps-5',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-6',
              title: 'Call Stack',
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
                          id: 'heading-9',
                          type: 'heading',
                          level: 3,
                          text: '1. Call Stack (синхронный код)',
                        },
                        {
                          id: 'text-10',
                          type: 'prose',
                          markdown: 'Выполняется весь синхронный JavaScript код',
                        },
                        {
                          id: 'text-11',
                          type: 'prose',
                          markdown:
                            'На первом этапе выполняется весь **синхронный код** в текущем стеке вызовов. JavaScript однопоточен, поэтому этот код выполняется последовательно и блокирует все остальное.',
                        },
                        {
                          id: 'text-12',
                          type: 'prose',
                          markdown: 'Примеры синхронного кода:',
                        },
                        {
                          id: 'text-13',
                          type: 'prose',
                          markdown: '`console.log()`',
                        },
                        {
                          id: 'text-14',
                          type: 'prose',
                          markdown: 'Вызовы функций',
                        },
                        {
                          id: 'text-15',
                          type: 'prose',
                          markdown: 'Циклы for/while',
                        },
                        {
                          id: 'text-16',
                          type: 'prose',
                          markdown: 'Присваивания переменных',
                        },
                        {
                          id: 'heading-17',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-18',
                          type: 'code',
                          language: 'javascript',
                          code: example2,
                        },
                        {
                          id: 'callout-19',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-20',
                              type: 'prose',
                              markdown:
                                '**Внимание:** Долгий синхронный код блокирует Event Loop и зависает UI!',
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
              id: 'step-21',
              title: 'Microtasks',
              blocks: [
                {
                  id: 'cards-22',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-23',
                      blocks: [
                        {
                          id: 'heading-24',
                          type: 'heading',
                          level: 3,
                          text: '2. Все микрозадачи (Microtasks)',
                        },
                        {
                          id: 'text-25',
                          type: 'prose',
                          markdown: 'Выполняются ВСЕ микрозадачи до полного опустошения очереди',
                        },
                        {
                          id: 'text-26',
                          type: 'prose',
                          markdown:
                            'После завершения синхронного кода Event Loop выполняет **все микрозадачи подряд**. Микрозадачи имеют наивысший приоритет среди асинхронных задач.',
                        },
                        {
                          id: 'cards-27',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-28',
                              title: '🎯 Источники микрозадач:',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'tags-29',
                                  type: 'tags',
                                  items: [
                                    'Promise.then()',
                                    'async/await',
                                    'queueMicrotask()',
                                    'MutationObserver',
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-30',
                          type: 'heading',
                          level: 4,
                          text: 'Особенность:',
                        },
                        {
                          id: 'text-31',
                          type: 'prose',
                          markdown:
                            'Если микрозадача создает новую микрозадачу, она тоже выполнится в этой же итерации Event Loop!',
                        },
                        {
                          id: 'heading-32',
                          type: 'heading',
                          level: 4,
                          text: 'Пример выполнения:',
                        },
                        {
                          id: 'code-33',
                          type: 'code',
                          language: 'javascript',
                          code: example3,
                        },
                        {
                          id: 'callout-34',
                          type: 'callout',
                          tone: 'error',
                          blocks: [
                            {
                              id: 'text-35',
                              type: 'prose',
                              markdown:
                                '**Опасность:** Бесконечные микрозадачи могут заблокировать рендеринг!',
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
              id: 'step-36',
              title: 'rAF Callbacks',
              blocks: [
                {
                  id: 'cards-37',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-38',
                      blocks: [
                        {
                          id: 'heading-39',
                          type: 'heading',
                          level: 3,
                          text: '3. requestAnimationFrame callbacks',
                        },
                        {
                          id: 'text-40',
                          type: 'prose',
                          markdown: 'Выполняются все rAF колбэки для подготовки к рендерингу',
                        },
                        {
                          id: 'text-41',
                          type: 'prose',
                          markdown:
                            'На этом этапе выполняются все колбэки `requestAnimationFrame`. Это идеальное место для **подготовки изменений DOM** перед рендерингом.',
                        },
                        {
                          id: 'timeline-42',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-43',
                              blocks: [
                                {
                                  id: 'text-44',
                                  type: 'prose',
                                  markdown: 'Вычисление анимации',
                                },
                                {
                                  id: 'text-45',
                                  type: 'prose',
                                  markdown: 'Расчет новых позиций, размеров, цветов',
                                },
                              ],
                            },
                            {
                              id: 'event-46',
                              blocks: [
                                {
                                  id: 'text-47',
                                  type: 'prose',
                                  markdown: 'Обновление DOM',
                                },
                                {
                                  id: 'text-48',
                                  type: 'prose',
                                  markdown: 'Изменение style, классов, атрибутов',
                                },
                              ],
                            },
                            {
                              id: 'event-49',
                              blocks: [
                                {
                                  id: 'text-50',
                                  type: 'prose',
                                  markdown: 'Подготовка к рендерингу',
                                },
                                {
                                  id: 'text-51',
                                  type: 'prose',
                                  markdown: 'Все изменения готовы для следующего кадра',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-52',
                          type: 'heading',
                          level: 4,
                          text: 'Типичный rAF колбэк:',
                        },
                        {
                          id: 'code-53',
                          type: 'code',
                          language: 'javascript',
                          code: example4,
                        },
                        {
                          id: 'callout-54',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-55',
                              type: 'prose',
                              markdown:
                                '**Производительность:** Колбэк должен выполняться быстро (&lt;16ms для 60fps)',
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
              id: 'step-56',
              title: 'Rendering',
              blocks: [
                {
                  id: 'cards-57',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-58',
                      blocks: [
                        {
                          id: 'heading-59',
                          type: 'heading',
                          level: 3,
                          text: '4. Rendering Pipeline',
                        },
                        {
                          id: 'text-60',
                          type: 'prose',
                          markdown:
                            'Браузер выполняет рендеринг: Style → Layout → Paint → Composite',
                        },
                        {
                          id: 'text-61',
                          type: 'prose',
                          markdown:
                            'Самый важный этап! Браузер обрабатывает все изменения DOM, сделанные в rAF колбэках, и **обновляет визуальное представление страницы**.',
                        },
                        {
                          id: 'timeline-62',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-63',
                              blocks: [
                                {
                                  id: 'text-64',
                                  type: 'prose',
                                  markdown: 'Style Recalculation',
                                },
                                {
                                  id: 'text-65',
                                  type: 'prose',
                                  markdown: 'Пересчет CSS стилей для измененных элементов',
                                },
                              ],
                            },
                            {
                              id: 'event-66',
                              blocks: [
                                {
                                  id: 'text-67',
                                  type: 'prose',
                                  markdown: 'Layout (Reflow)',
                                },
                                {
                                  id: 'text-68',
                                  type: 'prose',
                                  markdown: 'Вычисление позиций и размеров элементов',
                                },
                              ],
                            },
                            {
                              id: 'event-69',
                              blocks: [
                                {
                                  id: 'text-70',
                                  type: 'prose',
                                  markdown: 'Paint',
                                },
                                {
                                  id: 'text-71',
                                  type: 'prose',
                                  markdown: 'Растеризация элементов в пиксели',
                                },
                              ],
                            },
                            {
                              id: 'event-72',
                              blocks: [
                                {
                                  id: 'text-73',
                                  type: 'prose',
                                  markdown: 'Composite',
                                },
                                {
                                  id: 'text-74',
                                  type: 'prose',
                                  markdown: 'Композиция слоев и вывод на экран',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'cards-75',
                          type: 'cards',
                          columns: 1,
                          items: [
                            {
                              id: 'card-76',
                              title: '⚡ Оптимизации:',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-77',
                                  type: 'prose',
                                  markdown:
                                    '- **Transform/Opacity:** только Composite\n- **Color/Background:** Paint + Composite\n- **Width/Height:** Layout + Paint + Composite\n- **will-change:** создает слой заранее',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'callout-78',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-79',
                              type: 'prose',
                              markdown: '**Цель:** 60 FPS = рендеринг каждые ~16.67 миллисекунд',
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
              id: 'step-80',
              title: 'Idle/Macrotasks',
              blocks: [
                {
                  id: 'cards-81',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-82',
                      blocks: [
                        {
                          id: 'heading-83',
                          type: 'heading',
                          level: 3,
                          text: '5. Idle callbacks / Macrotasks',
                        },
                        {
                          id: 'text-84',
                          type: 'prose',
                          markdown: 'В свободное время или следующая макрозадача',
                        },
                        {
                          id: 'text-85',
                          type: 'prose',
                          markdown:
                            'После рендеринга браузер может выполнить задачи с **низким приоритетом**: idle callbacks в свободное время или одну макрозадачу для начала следующей итерации Event Loop.',
                        },
                        {
                          id: 'cards-86',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-87',
                              title: '🌙 Idle Callbacks',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'tags-88',
                                  type: 'tags',
                                  items: [
                                    'requestIdleCallback()',
                                    'Фоновые задачи',
                                    'Неприоритетная работа',
                                  ],
                                },
                              ],
                            },
                            {
                              id: 'card-89',
                              title: '⏰ Macrotasks',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'tags-90',
                                  type: 'tags',
                                  items: ['setTimeout()', 'setInterval()', 'DOM Events'],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-91',
                          type: 'heading',
                          level: 4,
                          text: 'Пример использования:',
                        },
                        {
                          id: 'code-92',
                          type: 'code',
                          language: 'javascript',
                          code: example5,
                        },
                        {
                          id: 'callout-93',
                          type: 'callout',
                          tone: 'success',
                          blocks: [
                            {
                              id: 'text-94',
                              type: 'prose',
                              markdown: '**Цикл завершен!** Начинается новая итерация Event Loop',
                            },
                          ],
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
          id: 'code-95',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Практический пример анимации',
      blocks: [
        {
          id: 'text-96',
          type: 'prose',
          markdown:
            'Правильное использование requestAnimationFrame для плавных анимаций с привязкой к refresh rate дисплея:',
        },
        {
          id: 'code-97',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Сравнение производительности',
      blocks: [
        {
          id: 'cards-98',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-99',
              blocks: [
                {
                  id: 'heading-100',
                  type: 'heading',
                  level: 3,
                  text: 'setTimeout для анимаций',
                },
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown:
                    '- **Не синхронизирован** с refresh rate\n- **Неточная частота** (~16.67ms ≠ реальный refresh rate)\n- **Работает в фоне** (тратит ресурсы)\n- **Рывки и пропуски** кадров\n- **Больше энергопотребления**',
                },
              ],
            },
            {
              id: 'card-102',
              blocks: [
                {
                  id: 'heading-103',
                  type: 'heading',
                  level: 3,
                  text: 'requestAnimationFrame',
                },
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '- **Синхронизация** с refresh rate\n- **Автоматическая пауза** в неактивных вкладках\n- **Оптимизации браузера**\n- **Плавные анимации**\n- **Экономия батареи**',
                },
              ],
            },
          ],
        },
        {
          id: 'code-105',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сложный пример Event Loop',
      blocks: [
        {
          id: 'text-106',
          type: 'prose',
          markdown: 'Полный пример взаимодействия всех видов задач в Event Loop:',
        },
        {
          id: 'code-107',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Полифилл и альтернативы',
      blocks: [
        {
          id: 'text-108',
          type: 'prose',
          markdown:
            'Понимание работы requestAnimationFrame через полифилл и современные альтернативы:',
        },
        {
          id: 'code-109',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Отладка и мониторинг',
      blocks: [
        {
          id: 'text-110',
          type: 'prose',
          markdown: 'Инструменты для анализа производительности анимаций:',
        },
        {
          id: 'code-111',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-112',
          type: 'prose',
          markdown:
            '1. **Какое место в Event Loop занимает requestAnimationFrame?**\n   \n   requestAnimationFrame выполняется ПОСЛЕ всех микрозадач (Promise, queueMicrotask), но ДО рендеринга и ДО следующих макрозадач (setTimeout, setInterval). Это позволяет подготовить изменения DOM перед рендерингом.\n2. **Почему requestAnimationFrame лучше setTimeout для анимаций?**\n   \n   1\\) Синхронизация с refresh rate дисплея (60Hz, 120Hz и т.д.) 2) Автоматическая пауза когда вкладка неактивна 3) Оптимизации браузера для плавности 4) Меньшее энергопотребление\n3. **Что происходит, если колбэк requestAnimationFrame выполняется долго?**\n   \n   Задержится рендеринг страницы, что приведет к пропуску кадров (frame drops). Колбэк должен выполняться быстро (&lt;16ms для 60fps), тяжелые операции нужно разбивать или переносить в Web Workers.\n4. **Можно ли добавить микрозадачи внутри requestAnimationFrame?**\n   \n   Да, но они выполнятся в следующей итерации Event Loop, после рендеринга. Микрозадачи из rAF колбэка не блокируют текущий рендеринг.\n5. **Как отменить запланированный requestAnimationFrame?**\n   \n   Используйте cancelAnimationFrame(id), где id возвращается из requestAnimationFrame(). Это важно для предотвращения утечек памяти при размонтировании компонентов.\n6. **Что такое timestamp в колбэке requestAnimationFrame?**\n   \n   Это время в миллисекундах (DOMHighResTimeStamp), когда начался текущий кадр. Используется для вычисления прогресса анимации и обеспечения плавности независимо от частоты обновления.\n7. **Работает ли requestAnimationFrame в Web Workers?**\n   \n   Нет, requestAnimationFrame недоступен в Web Workers, так как они не имеют доступа к DOM и рендерингу. Для анимаций в Workers используйте postMessage для связи с main thread.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-113',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-114',
              blocks: [
                {
                  id: 'heading-115',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- Используйте для всех анимаций\n- Сохраняйте ID для отмены\n- Вычисляйте по timestamp\n- Проверяйте performance\n- Группируйте DOM-операции\n- Используйте will-change CSS',
                },
              ],
            },
            {
              id: 'card-117',
              blocks: [
                {
                  id: 'heading-118',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-119',
                  type: 'prose',
                  markdown:
                    '- setTimeout для анимаций\n- Тяжелые вычисления в колбэке\n- Множественные DOM queries\n- Синхронные AJAX в колбэке\n- Забывать cancelAnimationFrame\n- Игнорировать timestamp',
                },
              ],
            },
            {
              id: 'card-120',
              blocks: [
                {
                  id: 'heading-121',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-122',
                  type: 'prose',
                  markdown:
                    '- Используйте easing функции\n- Предрассчитывайте значения\n- Кешируйте DOM элементы\n- Мониторьте FPS\n- Тестируйте на слабых устройствах\n- Используйте CSS transform',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Итог',
      blocks: [
        {
          id: 'text-123',
          type: 'prose',
          markdown:
            '**requestAnimationFrame** занимает специальное место в Event Loop между микрозадачами и рендерингом. Это делает его идеальным инструментом для создания плавных анимаций, синхронизированных с частотой обновления дисплея. Понимание его места в Event Loop критически важно для создания производительных веб-приложений.',
        },
        {
          id: 'resources-124',
          type: 'resources',
          items: [
            {
              id: 'link-125',
              label: 'MDN Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame',
            },
          ],
        },
        {
          id: 'resources-126',
          type: 'resources',
          items: [
            {
              id: 'link-127',
              label: 'Performance Guide',
              url: 'https://web.dev/optimize-javascript-execution/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
