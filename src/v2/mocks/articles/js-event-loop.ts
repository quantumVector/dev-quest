import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-event-loop-basicexamplesnippet.txt?raw'
import example2 from '../snippets/javascript/js-event-loop-callstacksnippet.txt?raw'
import example3 from '../snippets/javascript/js-event-loop-macromicrotaskssnippet.txt?raw'
import example4 from '../snippets/javascript/js-event-loop-inline4.txt?raw'
import example5 from '../snippets/javascript/js-event-loop-inline5.txt?raw'
import example6 from '../snippets/javascript/js-event-loop-inline6.txt?raw'
import example7 from '../snippets/javascript/js-event-loop-inline7.txt?raw'
import example8 from '../snippets/javascript/js-event-loop-complexexamplesnippet.txt?raw'
import example9 from '../snippets/javascript/js-event-loop-asyncawaitsnippet.txt?raw'
import example10 from '../snippets/javascript/js-event-loop-browsereventloopsnippet.txt?raw'
import example11 from '../snippets/javascript/js-event-loop-nodeeventloopsnippet.txt?raw'
import example12 from '../snippets/javascript/js-event-loop-performancesnippet.txt?raw'
import example13 from '../snippets/javascript/js-event-loop-inline13.txt?raw'
import example14 from '../snippets/javascript/js-event-loop-inline14.txt?raw'
import example15 from '../snippets/javascript/js-event-loop-inline15.txt?raw'
import example16 from '../snippets/javascript/js-event-loop-inline16.txt?raw'
import example17 from '../snippets/javascript/js-event-loop-inline17.txt?raw'
import example18 from '../snippets/javascript/js-event-loop-inline18.txt?raw'

// Content copied verbatim from src/views/js/EventLoop.vue.
export default {
  ...articleSummaries.jsEventLoop,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Event Loop** — это механизм, который позволяет JavaScript выполнять неблокирующие асинхронные операции в однопоточной среде. Он управляет порядком выполнения кода, обработкой событий и выполнением callback-функций.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Архитектура JavaScript Runtime',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'Call Stack',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Стек вызовов для выполнения синхронного кода',
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
                  text: 'Heap',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Память для хранения объектов и переменных',
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
                  text: 'Task Queue',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Очереди для макро и микрозадач',
                },
              ],
            },
            {
              id: 'card-12',
              blocks: [
                {
                  id: 'heading-13',
                  type: 'heading',
                  level: 3,
                  text: 'Event Loop',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown: 'Координирует выполнение задач между компонентами',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Базовый пример',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Call Stack (Стек вызовов)',
      blocks: [
        {
          id: 'callout-16',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-17',
              type: 'prose',
              markdown:
                '**Call Stack** — это структура данных LIFO (Last In, First Out), которая отслеживает текущее выполнение функций. JavaScript выполняет код последовательно, одну функцию за раз.',
            },
          ],
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Макрозадачи vs Микрозадачи',
      blocks: [
        {
          id: 'cards-19',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: 'Макрозадачи (Tasks)',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- `setTimeout`, `setInterval`\n- `setImmediate` (Node.js)\n- I/O операции\n- UI события (click, scroll)\n- Parsing HTML',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: '**Выполняются:** по одной за итерацию Event Loop',
                },
              ],
            },
            {
              id: 'card-24',
              blocks: [
                {
                  id: 'heading-25',
                  type: 'heading',
                  level: 3,
                  text: 'Микрозадачи (Microtasks)',
                },
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown:
                    '- `Promise.then/catch/finally`\n- `async/await`\n- `queueMicrotask()`\n- `MutationObserver`\n- `process.nextTick` (Node.js)',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown: '**Выполняются:** все подряд до опустошения очереди',
                },
              ],
            },
          ],
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Приоритет выполнения',
      blocks: [
        {
          id: 'steps-29',
          type: 'steps',
          showTitle: false,
          items: [
            {
              id: 'step-30',
              title: 'Call Stack',
              blocks: [
                {
                  id: 'cards-31',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-32',
                      blocks: [
                        {
                          id: 'heading-33',
                          type: 'heading',
                          level: 3,
                          text: '1. Синхронный код (Call Stack)',
                        },
                        {
                          id: 'text-34',
                          type: 'prose',
                          markdown: 'Наивысший приоритет - выполняется немедленно',
                        },
                        {
                          id: 'text-35',
                          type: 'prose',
                          markdown:
                            'Весь **синхронный код** выполняется в Call Stack первым. JavaScript является однопоточным, поэтому синхронный код блокирует выполнение всего остального до завершения.',
                        },
                        {
                          id: 'heading-36',
                          type: 'heading',
                          level: 4,
                          text: 'Примеры синхронного кода:',
                        },
                        {
                          id: 'code-37',
                          type: 'code',
                          language: 'javascript',
                          code: example4,
                        },
                        {
                          id: 'text-38',
                          type: 'prose',
                          markdown: 'Вызовы функций',
                        },
                        {
                          id: 'text-39',
                          type: 'prose',
                          markdown: 'Математические операции',
                        },
                        {
                          id: 'text-40',
                          type: 'prose',
                          markdown: 'Присваивания переменных',
                        },
                        {
                          id: 'callout-41',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-42',
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
              id: 'step-43',
              title: 'Microtasks',
              blocks: [
                {
                  id: 'cards-44',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-45',
                      blocks: [
                        {
                          id: 'heading-46',
                          type: 'heading',
                          level: 3,
                          text: '2. Все микрозадачи (Microtasks)',
                        },
                        {
                          id: 'text-47',
                          type: 'prose',
                          markdown: 'Выполняются ВСЕ подряд до опустошения очереди',
                        },
                        {
                          id: 'text-48',
                          type: 'prose',
                          markdown:
                            'После завершения синхронного кода Event Loop выполняет **все микрозадачи** без исключения. Если микрозадача создает новую микрозадачу, она тоже будет выполнена в этой же итерации.',
                        },
                        {
                          id: 'cards-49',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-50',
                              title: '🚀 Источники микрозадач',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-51',
                                  type: 'prose',
                                  markdown:
                                    '- `Promise.then/catch/finally`\n- `async/await`\n- `queueMicrotask()`\n- `MutationObserver`',
                                },
                              ],
                            },
                            {
                              id: 'card-52',
                              title: '⚡ Особенности',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-53',
                                  type: 'prose',
                                  markdown:
                                    '- Высокий приоритет\n- Выполняются все подряд\n- Могут создавать новые микрозадачи\n- Блокируют рендеринг',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-54',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-55',
                          type: 'code',
                          language: 'javascript',
                          code: example5,
                        },
                        {
                          id: 'callout-56',
                          type: 'callout',
                          tone: 'error',
                          blocks: [
                            {
                              id: 'text-57',
                              type: 'prose',
                              markdown:
                                '**Осторожно:** Бесконечные микрозадачи могут заблокировать Event Loop!',
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
              id: 'step-58',
              title: 'Render',
              blocks: [
                {
                  id: 'cards-59',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-60',
                      blocks: [
                        {
                          id: 'heading-61',
                          type: 'heading',
                          level: 3,
                          text: '3. Рендеринг (только браузер)',
                        },
                        {
                          id: 'text-62',
                          type: 'prose',
                          markdown: 'Обновление DOM и перерисовка страницы',
                        },
                        {
                          id: 'text-63',
                          type: 'prose',
                          markdown:
                            'После выполнения всех микрозадач браузер может выполнить **рендеринг** - обновить DOM, пересчитать стили, выполнить layout и перерисовать страницу. Это происходит не в каждой итерации, а по необходимости.',
                        },
                        {
                          id: 'timeline-64',
                          type: 'timeline',
                          items: [
                            {
                              id: 'event-65',
                              blocks: [
                                {
                                  id: 'text-66',
                                  type: 'prose',
                                  markdown: 'Style calculation',
                                },
                                {
                                  id: 'text-67',
                                  type: 'prose',
                                  markdown: 'Вычисление CSS стилей',
                                },
                              ],
                            },
                            {
                              id: 'event-68',
                              blocks: [
                                {
                                  id: 'text-69',
                                  type: 'prose',
                                  markdown: 'Layout (Reflow)',
                                },
                                {
                                  id: 'text-70',
                                  type: 'prose',
                                  markdown: 'Расчет позиций элементов',
                                },
                              ],
                            },
                            {
                              id: 'event-71',
                              blocks: [
                                {
                                  id: 'text-72',
                                  type: 'prose',
                                  markdown: 'Paint',
                                },
                                {
                                  id: 'text-73',
                                  type: 'prose',
                                  markdown: 'Растеризация элементов',
                                },
                              ],
                            },
                            {
                              id: 'event-74',
                              blocks: [
                                {
                                  id: 'text-75',
                                  type: 'prose',
                                  markdown: 'Composite',
                                },
                                {
                                  id: 'text-76',
                                  type: 'prose',
                                  markdown: 'Композиция слоев',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-77',
                          type: 'heading',
                          level: 4,
                          text: 'Управление рендерингом:',
                        },
                        {
                          id: 'code-78',
                          type: 'code',
                          language: 'javascript',
                          code: example6,
                        },
                        {
                          id: 'callout-79',
                          type: 'callout',
                          tone: 'warning',
                          blocks: [
                            {
                              id: 'text-80',
                              type: 'prose',
                              markdown:
                                'Цель браузера: 60 FPS, то есть рендеринг каждые ~16.67 миллисекунд',
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
              id: 'step-81',
              title: 'Macrotasks',
              blocks: [
                {
                  id: 'cards-82',
                  type: 'cards',
                  columns: 1,
                  items: [
                    {
                      id: 'card-83',
                      blocks: [
                        {
                          id: 'heading-84',
                          type: 'heading',
                          level: 3,
                          text: '4. Одна макрозадача (Macrotask)',
                        },
                        {
                          id: 'text-85',
                          type: 'prose',
                          markdown: 'Самый низкий приоритет - по одной за итерацию',
                        },
                        {
                          id: 'text-86',
                          type: 'prose',
                          markdown:
                            'В конце итерации Event Loop берет **только одну макрозадачу** из очереди и выполняет её. После этого цикл повторяется с начала: синхронный код → микрозадачи → рендеринг → следующая макрозадача.',
                        },
                        {
                          id: 'cards-87',
                          type: 'cards',
                          columns: 2,
                          items: [
                            {
                              id: 'card-88',
                              title: '📋 Источники макрозадач',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-89',
                                  type: 'prose',
                                  markdown:
                                    '- `setTimeout` / `setInterval`\n- `setImmediate` (Node.js)\n- DOM события (click, scroll)\n- I/O операции',
                                },
                              ],
                            },
                            {
                              id: 'card-90',
                              title: '⏱️ Особенности',
                              headingLevel: 4,
                              blocks: [
                                {
                                  id: 'text-91',
                                  type: 'prose',
                                  markdown:
                                    '- Низкий приоритет\n- По одной за итерацию\n- Между ними - микрозадачи\n- Могут быть отложены рендерингом',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'heading-92',
                          type: 'heading',
                          level: 4,
                          text: 'Пример:',
                        },
                        {
                          id: 'code-93',
                          type: 'code',
                          language: 'javascript',
                          code: example7,
                        },
                        {
                          id: 'callout-94',
                          type: 'callout',
                          tone: 'info',
                          blocks: [
                            {
                              id: 'text-95',
                              type: 'prose',
                              markdown:
                                '**setTimeout(fn, 0)** не означает "немедленно" - минимальная задержка ~4мс в браузере',
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
      ],
    },
    {
      id: 'section-6',
      title: 'Сложный пример с вложенными задачами',
      blocks: [
        {
          id: 'code-96',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'async/await и Event Loop',
      blocks: [
        {
          id: 'callout-97',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-98',
              type: 'prose',
              markdown:
                '**Важно:** `async/await` — это синтаксический сахар над Promise. Код до первого `await` выполняется синхронно, а после — как микрозадача.',
            },
          ],
        },
        {
          id: 'code-99',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Event Loop в браузере',
      blocks: [
        {
          id: 'code-100',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Event Loop в Node.js',
      blocks: [
        {
          id: 'callout-101',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-102',
              type: 'prose',
              markdown:
                '**Node.js Event Loop** отличается от браузерного! Он имеет 6 фаз и обрабатывает разные типы операций в определенном порядке.',
            },
          ],
        },
        {
          id: 'code-103',
          type: 'code',
          language: 'javascript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Влияние на производительность',
      blocks: [
        {
          id: 'code-104',
          type: 'code',
          language: 'javascript',
          code: example12,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-105',
          type: 'prose',
          markdown:
            '1. **Что выведет этот код и почему?**\n   \n   Классический вопрос с примером кода включающего `console.log`, `setTimeout` и `Promise.resolve().then()`. Важно объяснить порядок: синхронный код → микрозадачи → макрозадачи.\n2. **В чем разница между макро и микрозадачами?**\n   \n   Микрозадачи имеют более высокий приоритет и выполняются ВСЕ подряд до опустошения очереди. Макрозадачи выполняются по одной за итерацию Event Loop, между ними могут выполняться микрозадачи и рендеринг.\n3. **Что такое блокировка Event Loop?**\n   \n   Это ситуация, когда синхронный код выполняется слишком долго, блокируя Call Stack. В результате не могут выполняться другие задачи, UI зависает, события не обрабатываются.\n4. **Как работает setTimeout(fn, 0)?**\n   \n   Это не означает "выполнить немедленно". Функция попадает в очередь макрозадач и будет выполнена после завершения текущего синхронного кода и всех микрозадач. Минимальная задержка обычно 4мс.\n5. **Чем отличается Event Loop в браузере от Node.js?**\n   \n   В браузере более простая модель: макрозадача → все микрозадачи → рендеринг → повтор. В Node.js Event Loop имеет 6 фаз с разными типами операций, а `process.nextTick` имеет наивысший приоритет.\n6. **Как оптимизировать работу с Event Loop?**\n   \n   Избегать блокирующих операций, разбивать тяжелые вычисления на части с `setTimeout`, использовать Web Workers, оптимизировать количество DOM операций, использовать `requestAnimationFrame` для анимаций.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Визуализация Event Loop',
      blocks: [
        {
          id: 'cards-106',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-107',
              title: '🔄 Цикл Event Loop',
              blocks: [
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    '1. Выполнить код из Call Stack\n2. Выполнить все микрозадачи\n3. Рендеринг (если нужно)\n4. Взять одну макрозадачу\n5. Повторить с шага 1',
                },
              ],
            },
            {
              id: 'card-109',
              title: '⏱️ Тайминги',
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    '- **setTimeout минимум:** 4мс (браузер)\n- **Рендеринг:** ~16.67мс (60 FPS)\n- **Idle callback:** в свободное время\n- **Animation frame:** перед рендерингом',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-111',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-112',
              blocks: [
                {
                  id: 'heading-113',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    '- Разбивать тяжелые задачи на части\n- Использовать Web Workers\n- Предпочитать микрозадачи для быстрых операций\n- Мониторить производительность\n- Использовать requestAnimationFrame',
                },
              ],
            },
            {
              id: 'card-115',
              blocks: [
                {
                  id: 'heading-116',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-117',
                  type: 'prose',
                  markdown:
                    '- Блокирующих циклов while\n- Тяжелых синхронных вычислений\n- Множественных вложенных setTimeout\n- Частых DOM манипуляций\n- Бесконечных микрозадач',
                },
              ],
            },
            {
              id: 'card-118',
              blocks: [
                {
                  id: 'heading-119',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-120',
                  type: 'prose',
                  markdown:
                    '- Изучайте DevTools Performance\n- Используйте Chrome Task Manager\n- Тестируйте на слабых устройствах\n- Профилируйте память\n- Используйте лейзи загрузку\n- Оптимизируйте критический путь',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Инструменты для отладки',
      blocks: [
        {
          id: 'cards-121',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-122',
              blocks: [
                {
                  id: 'heading-123',
                  type: 'heading',
                  level: 3,
                  text: 'Chrome DevTools',
                },
                {
                  id: 'text-124',
                  type: 'prose',
                  markdown:
                    '- **Performance tab:** профилирование Event Loop\n- **Sources → Call Stack:** текущий стек\n- **Console:** trace асинхронных операций\n- **Task Manager:** мониторинг процессов',
                },
              ],
            },
            {
              id: 'card-125',
              blocks: [
                {
                  id: 'heading-126',
                  type: 'heading',
                  level: 3,
                  text: 'Node.js',
                },
                {
                  id: 'text-127',
                  type: 'prose',
                  markdown:
                    '- **--inspect:** подключение DevTools\n- **process.hrtime():** точные измерения\n- **perf\\_hooks:** API для производительности\n- **clinic.js:** профилирование Node.js',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Практические примеры проблем',
      blocks: [
        {
          id: 'accordion-128',
          type: 'accordion',
          items: [
            {
              id: 'question-129',
              title: '🐛 Бесконечная микрозадача',
              blocks: [
                {
                  id: 'code-130',
                  type: 'code',
                  language: 'javascript',
                  code: example13,
                },
              ],
            },
            {
              id: 'question-131',
              title: '⚡ Медленный рендеринг',
              blocks: [
                {
                  id: 'code-132',
                  type: 'code',
                  language: 'javascript',
                  code: example14,
                },
              ],
            },
            {
              id: 'question-133',
              title: '🔄 Неправильное использование таймеров',
              blocks: [
                {
                  id: 'code-134',
                  type: 'code',
                  language: 'javascript',
                  code: example15,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Современные API для управления задачами',
      blocks: [
        {
          id: 'cards-135',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-136',
              title: 'requestIdleCallback',
              blocks: [
                {
                  id: 'text-137',
                  type: 'prose',
                  markdown: 'Выполнение в свободное время браузера',
                },
                {
                  id: 'code-138',
                  type: 'code',
                  language: 'javascript',
                  code: example16,
                },
              ],
            },
            {
              id: 'card-139',
              title: 'scheduler.postTask',
              blocks: [
                {
                  id: 'text-140',
                  type: 'prose',
                  markdown: 'Новый API для планирования задач',
                },
                {
                  id: 'code-141',
                  type: 'code',
                  language: 'javascript',
                  code: example17,
                },
              ],
            },
            {
              id: 'card-142',
              title: 'MessageChannel',
              blocks: [
                {
                  id: 'text-143',
                  type: 'prose',
                  markdown: 'Альтернатива setTimeout(0)',
                },
                {
                  id: 'code-144',
                  type: 'code',
                  language: 'javascript',
                  code: example18,
                },
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
          id: 'text-145',
          type: 'prose',
          markdown:
            '**Event Loop** — это основа асинхронности в JavaScript. Понимание его работы критически важно для написания производительных приложений. Ключевые моменты: Call Stack выполняется первым, затем ВСЕ микрозадачи, потом рендеринг, и только после этого ОДНА макрозадача. Правильное использование этих знаний поможет избежать блокировок UI и создать отзывчивые приложения.',
        },
        {
          id: 'callout-146',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-147',
              type: 'prose',
              markdown:
                '**Совет для собеседования:** Всегда объясняйте примеры пошагово, демонстрируя понимание приоритетов выполнения. Упоминайте различия между браузером и Node.js, а также влияние на производительность и пользовательский опыт.',
            },
          ],
        },
        {
          id: 'resources-148',
          type: 'resources',
          items: [
            {
              id: 'link-149',
              label: 'MDN Event Loop',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
            },
          ],
        },
        {
          id: 'resources-150',
          type: 'resources',
          items: [
            {
              id: 'link-151',
              label: 'Node.js Event Loop',
              url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/',
            },
          ],
        },
        {
          id: 'resources-152',
          type: 'resources',
          items: [
            {
              id: 'link-153',
              label: 'Event Loop Visualizer',
              url: 'http://latentflip.com/loupe/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
