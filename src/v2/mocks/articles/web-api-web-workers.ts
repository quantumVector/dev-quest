import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-web-workers-basicworkersnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-web-workers-datatransfersnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-web-workers-sharedworkersnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-web-workers-usecasessnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-web-workers-multipleworkerssnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-web-workers-reactexamplesnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-web-workers-limitationssnippet.txt?raw'

// Content copied verbatim from src/views/web-api/WebWorkers.vue.
export default {
  ...articleSummaries.webApiWebWorkers,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Worker** — это механизм для выполнения JavaScript кода в фоновом потоке, отдельном от основного потока выполнения веб\\-страницы. Workers позволяют выполнять тяжелые вычисления без блокировки UI, обеспечивая плавную работу интерфейса.',
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
                  text: 'Main Thread',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    'Основной поток  \n DOM, события, рендеринг  \n UI должен оставаться отзывчивым',
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
                  text: 'Web Worker',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    'Фоновый поток  \n Вычисления, обработка данных  \n Не блокирует основной поток',
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
                  text: 'Communication',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    'postMessage / onmessage  \n Передача данных между потоками  \n Event\\-driven модель',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Когда использовать Web Workers',
      blocks: [
        {
          id: 'cards-12',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: '✅ Подходит для',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- **Тяжелые вычисления:** криптография, хеширование\n- **Обработка больших данных:** парсинг CSV/JSON\n- **Обработка изображений:** фильтры, преобразования\n- **Поиск и фильтрация:** в больших массивах\n- **Фоновая синхронизация:** с сервером\n- **Компрессия/декомпрессия:** данных',
                },
              ],
            },
            {
              id: 'card-16',
              blocks: [
                {
                  id: 'heading-17',
                  type: 'heading',
                  level: 3,
                  text: '❌ Не подходит для',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- **Манипуляции DOM:** недоступен в Workers\n- **Быстрые операции:** overhead постMessage\n- **Работа с UI:** события, анимации\n- **Маленькие задачи:** лучше в main thread\n- **Синхронный код:** требующий DOM',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Основы работы с Web Workers',
      blocks: [
        {
          id: 'callout-19',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-20',
              type: 'prose',
              markdown:
                '**Важно:** Web Worker выполняется в отдельном глобальном контексте, где нет доступа к DOM и window объекту. Используйте `self` вместо `window`.',
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Передача данных между потоками',
      blocks: [
        {
          id: 'callout-22',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-23',
              type: 'prose',
              markdown:
                '**SharedArrayBuffer:** Для использования разделяемой памяти требуются специальные HTTP заголовки: `Cross-Origin-Opener-Policy: same-origin` и `Cross-Origin-Embedder-Policy: require-corp`',
            },
          ],
        },
        {
          id: 'table-24',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Производительность',
            },
            {
              id: 'column-4',
              label: 'Использование',
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
                    markdown: '**Structured Cloning**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Копирование данных (по умолчанию)',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Средняя (копирование)',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Простые объекты, небольшие данные',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '**Transferable Objects**',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Передача владения (zero\\-copy)',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Отличная (без копирования)',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'ArrayBuffer, большие бинарные данные',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**SharedArrayBuffer**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Разделяемая память между потоками',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Отличная (общая память)',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Требует синхронизации, Atomics API',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'SharedMemory между потоками',
      blocks: [
        {
          id: 'cards-38',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-39',
              title: 'Как это работает',
              blocks: [
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- `SharedArrayBuffer` создает общую память\n- Оба потока видят одни и те же данные\n- Изменения видны мгновенно без постMessage\n- Требует `Atomics` для безопасности\n- Нужны специальные HTTP заголовки',
                },
              ],
            },
            {
              id: 'card-41',
              title: 'Проблемы и решения',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- **Race conditions:** используйте Atomics\n- **Синхронизация:** wait/notify паттерн\n- **Безопасность:** требует COOP/COEP\n- **Сложность:** низкоуровневое API\n- **Поддержка:** проверяйте доступность',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Shared Worker - общий Worker для вкладок',
      blocks: [
        {
          id: 'callout-43',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-44',
              type: 'prose',
              markdown:
                '**Shared Worker** — специальный тип Worker, который может использоваться несколькими вкладками/окнами одного origin одновременно.',
            },
          ],
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические сценарии использования',
      blocks: [
        {
          id: 'code-46',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Множественные Workers - распределение задач',
      blocks: [
        {
          id: 'callout-47',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-48',
              type: 'prose',
              markdown:
                '**Оптимальное количество Workers:** Используйте `navigator.hardwareConcurrency` для определения количества логических процессоров. Обычно создают столько же Workers или чуть меньше.',
            },
          ],
        },
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Интеграция с React',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Ограничения и особенности',
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
      id: 'section-11',
      title: 'Типы Web Workers',
      blocks: [
        {
          id: 'table-52',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Создание',
            },
            {
              id: 'column-3',
              label: 'Область видимости',
            },
            {
              id: 'column-4',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Dedicated Worker**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: "`new Worker('worker.js')`",
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Одна страница/скрипт',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Изолированные задачи для одной страницы',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**Shared Worker**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: "`new SharedWorker('worker.js')`",
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Несколько вкладок одного origin',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Общее состояние между вкладками',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Service Worker**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`navigator.serviceWorker.register()`',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Все вкладки origin',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Кеширование, offline, push уведомления',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-65',
          type: 'prose',
          markdown:
            '1. **Что такое Web Worker и для чего он используется?**\n   \n   Web Worker — это механизм для выполнения JavaScript в фоновом потоке, отдельном от основного потока страницы. Используется для тяжелых вычислений, обработки больших данных, чтобы не блокировать UI и сохранить отзывчивость интерфейса.\n2. **Как Web Worker взаимодействует с основным потоком?**\n   \n   Через систему сообщений: `postMessage()` для отправки и `onmessage` для получения. Workers не имеют прямого доступа к DOM или переменным основного потока, вся коммуникация происходит через сообщения.\n3. **Существует ли SharedMemory между потоками?**\n   \n   Да, через `SharedArrayBuffer`. Это разделяемая память, доступная обоим потокам одновременно. Для безопасной работы требуются `Atomics` API и специальные HTTP заголовки (COOP/COEP). Изменения видны без postMessage.\n4. **Можно ли прочитать данные Worker из основного потока напрямую?**\n   \n   Нет, только через SharedArrayBuffer или postMessage. У Workers отдельная область видимости и изолированная память. Для обычных переменных нужно использовать систему сообщений. SharedArrayBuffer позволяет читать общую память напрямую.\n5. **Как передавать данные между потоками?**\n   \n   Три способа: 1) Structured Cloning (копирование по умолчанию), 2) Transferable Objects (передача владения для ArrayBuffer, zero\\-copy), 3) SharedArrayBuffer (разделяемая память). Для больших данных используйте transfer или shared memory.\n6. **Как использовать несколько Workers для распределения задач?**\n   \n   Создайте Worker Pool: массив Workers, очередь задач, распределение по свободным Workers. Оптимальное количество ~ `navigator.hardwareConcurrency`. Используйте паттерны Map\\-Reduce, Pipeline или динамическое масштабирование для эффективного распределения.\n7. **В чем разница между Dedicated и Shared Worker?**\n   \n   Dedicated Worker привязан к одному скрипту/странице, Shared Worker разделяется между несколькими вкладками одного origin. Shared использует `port.postMessage()` и событие `onconnect` для каждой новой вкладки.\n8. **Какие ограничения есть у Web Workers?**\n   \n   Нет доступа к DOM, window, parent, localStorage. Нельзя манипулировать UI напрямую. Доступны: fetch, WebSocket, IndexedDB, Crypto, таймеры. Workers должны быть с того же origin (Same\\-Origin Policy).',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'cards-66',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-67',
              title: 'Dedicated Worker',
              blocks: [
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- **Chrome:** 4\\+ ✅\n- **Firefox:** 3.5\\+ ✅\n- **Safari:** 4\\+ ✅\n- **Edge:** 12\\+ ✅\n- **IE:** 10\\+ ✅\n- **Mobile:** Полная поддержка ✅',
                },
              ],
            },
            {
              id: 'card-69',
              title: 'Advanced Features',
              blocks: [
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- **SharedArrayBuffer:** Chrome 68\\+, требует COOP/COEP\n- **Shared Worker:** Chrome 5\\+, Firefox 29\\+\n- **Module Workers:** Chrome 80\\+, современные браузеры\n- **Transferable Objects:** Широкая поддержка',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-71',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-72',
              blocks: [
                {
                  id: 'heading-73',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Использовать для тяжелых операций\n- Transfer для больших ArrayBuffer\n- Переиспользовать Workers (пул)\n- Terminate после завершения\n- Обрабатывать ошибки\n- Проверять поддержку браузером\n- Использовать Atomics с SharedArrayBuffer',
                },
              ],
            },
            {
              id: 'card-75',
              blocks: [
                {
                  id: 'heading-76',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Использования для быстрых операций\n- Создания слишком многих Workers\n- Передачи огромных объектов постоянно\n- Забывать terminate Workers\n- Обращения к DOM из Worker\n- Использовать для простых задач\n- SharedArrayBuffer без Atomics',
                },
              ],
            },
            {
              id: 'card-78',
              blocks: [
                {
                  id: 'heading-79',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Профилируйте перед оптимизацией\n- Используйте Worker Pool паттерн\n- Комбинируйте с requestIdleCallback\n- Кешируйте Workers в React\n- Мониторьте utilization пула\n- Документируйте communication API\n- Тестируйте с реальными данными',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Альтернативы Web Workers',
      blocks: [
        {
          id: 'table-81',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Когда использовать',
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
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**Web Workers**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Тяжелые вычисления, обработка данных',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Настоящий параллелизм, не блокирует UI',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Overhead создания, нет доступа к DOM',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '**requestIdleCallback**',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Некритичные задачи в фоне',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Простота, низкий overhead',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Прерывается при активности, медленнее',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '**setTimeout/setInterval**',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Разбиение задач на части',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Простота реализации',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Блокирует UI при выполнении',
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
                    markdown: '**WASM Threads**',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: 'Максимальная производительность',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: 'Очень быстрый, SharedArrayBuffer',
                  },
                ],
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: 'Сложность, требует компиляции',
                  },
                ],
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
          id: 'text-98',
          type: 'prose',
          markdown:
            '**Web Workers** — это мощный инструмент для реализации многопоточности в веб\\-приложениях. Они позволяют выполнять тяжелые вычисления в фоновых потоках, не блокируя UI. Ключевые аспекты: изолированный контекст выполнения, коммуникация через `postMessage`, три способа передачи данных (cloning, transfer, shared memory). Для эффективного использования создавайте Worker Pool, используйте Transferable Objects для больших данных и `SharedArrayBuffer` с `Atomics` для разделяемой памяти. Всегда профилируйте производительность — Workers имеют overhead создания и коммуникации.',
        },
        {
          id: 'resources-99',
          type: 'resources',
          items: [
            {
              id: 'link-100',
              label: 'MDN Web Workers',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
            },
          ],
        },
        {
          id: 'resources-101',
          type: 'resources',
          items: [
            {
              id: 'link-102',
              label: 'WHATWG Spec',
              url: 'https://html.spec.whatwg.org/multipage/workers.html',
            },
          ],
        },
        {
          id: 'resources-103',
          type: 'resources',
          items: [
            {
              id: 'link-104',
              label: 'Google Web.dev Guide',
              url: 'https://web.dev/off-main-thread/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
