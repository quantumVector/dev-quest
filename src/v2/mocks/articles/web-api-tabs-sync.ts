import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-tabs-sync-localstoragesnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-tabs-sync-broadcastchannelsnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-tabs-sync-sharedworkersnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-tabs-sync-reactexamplesnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-tabs-sync-conflictresolutionsnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-tabs-sync-performancesnippet.txt?raw'

// Content copied verbatim from src/views/web-api/BrowserTabsSync.vue.
export default {
  ...articleSummaries.webApiBrowserTabsSync,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Синхронизация состояний между вкладками** — это паттерн, позволяющий поддерживать одинаковое состояние приложения (например, корзины покупок) во всех открытых вкладках браузера. Существует несколько подходов с разными уровнями сложности и надежности.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Сложность',
            },
            {
              id: 'column-3',
              label: 'Поддержка',
            },
            {
              id: 'column-4',
              label: 'Производительность',
            },
            {
              id: 'column-5',
              label: 'Использование',
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
                    markdown: '**localStorage \\+ storage event**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '✅ Простая',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '✅ Отличная',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '✅ Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Базовая синхронизация',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '**BroadcastChannel API**',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '✅ Простая',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '⚠️ Хорошая (не IE)',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '✅ Отличная',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Рекомендуемый подход',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**SharedWorker**',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '❌ Сложная',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '⚠️ Средняя (не Safari)',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Отличная',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Сложные сценарии',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Service Worker**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '❌ Сложная',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '✅ Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '✅ Хорошая',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'PWA, offline',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**WebSocket**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '⚠️ Средняя',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '✅ Отличная',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '⚠️ Средняя',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Серверная синхронизация',
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
      title: '1. localStorage + storage event (базовый подход)',
      blocks: [
        {
          id: 'cards-28',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: 'Плюсы',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown:
                    '- Очень простая реализация\n- Отличная поддержка браузерами\n- Автоматическая персистентность\n- Не требует дополнительных API\n- Работает даже в старых браузерах',
                },
              ],
            },
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: 'Минусы',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- storage event не срабатывает в текущей вкладке\n- Ограничение размера (~5\\-10MB)\n- Только строки (нужна сериализация)\n- Синхронные операции блокируют поток\n- Нет встроенного разрешения конфликтов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. BroadcastChannel API (рекомендуемый)',
      blocks: [
        {
          id: 'callout-36',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-37',
              type: 'prose',
              markdown:
                '**Рекомендация:** Используйте BroadcastChannel для современных браузеров — это самый простой и эффективный способ синхронизации',
            },
          ],
        },
        {
          id: 'cards-38',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-39',
              blocks: [
                {
                  id: 'heading-40',
                  type: 'heading',
                  level: 3,
                  text: 'Плюсы',
                },
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    '- Простой и чистый API\n- Работает между всеми вкладками\n- Не зависит от localStorage\n- Может передавать любые структуры данных\n- Асинхронная коммуникация\n- Легко реализовать разные типы сообщений',
                },
              ],
            },
            {
              id: 'card-42',
              blocks: [
                {
                  id: 'heading-43',
                  type: 'heading',
                  level: 3,
                  text: 'Минусы',
                },
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- Не поддерживается в IE\n- Нет автоматической персистентности\n- Сообщения не сохраняются\n- Новая вкладка не получает текущее состояние автоматически\n- Требуется дополнительная логика для синхронизации',
                },
              ],
            },
          ],
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. SharedWorker (продвинутый подход)',
      blocks: [
        {
          id: 'callout-46',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-47',
              type: 'prose',
              markdown:
                '**Использование:** SharedWorker подходит для сложных сценариев с централизованной логикой и работой с IndexedDB',
            },
          ],
        },
        {
          id: 'cards-48',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: 'Плюсы',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Централизованная бизнес\\-логика\n- Единый источник истины\n- Может работать с IndexedDB\n- Эффективная память (один инстанс)\n- Сложные операции без блокировки UI',
                },
              ],
            },
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: 'Минусы',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Сложная реализация и отладка\n- Не поддерживается в Safari\n- Требуется отдельный файл worker\n- Сложности с bundlers (Webpack, Vite)\n- Ограниченный доступ к Web APIs',
                },
              ],
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
      id: 'section-5',
      title: 'Интеграция с React',
      blocks: [
        {
          id: 'code-56',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Разрешение конфликтов',
      blocks: [
        {
          id: 'callout-57',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-58',
              type: 'prose',
              markdown:
                '**Важно:** При одновременном изменении корзины в разных вкладках нужна стратегия разрешения конфликтов',
            },
          ],
        },
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'code-60',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'table-61',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'API',
            },
            {
              id: 'column-2',
              label: 'Chrome',
            },
            {
              id: 'column-3',
              label: 'Firefox',
            },
            {
              id: 'column-4',
              label: 'Safari',
            },
            {
              id: 'column-5',
              label: 'Edge',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**localStorage**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '✅ 4\\+',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '✅ 3.5\\+',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '✅ 4\\+',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '✅ 8\\+',
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
                    markdown: '**storage event**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '✅ 4\\+',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '✅ 45\\+',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '✅ 4\\+',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '✅ 15\\+',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**BroadcastChannel**',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '✅ 54\\+',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '✅ 38\\+',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '✅ 15.4\\+',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '✅ 79\\+',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**SharedWorker**',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '✅ 4\\+',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '✅ 29\\+',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '✅ 79\\+',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '**IndexedDB**',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '✅ 24\\+',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '✅ 16\\+',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '✅ 10\\+',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '✅ 12\\+',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-87',
          type: 'prose',
          markdown:
            '1. **Как синхронизировать корзину между вкладками браузера?**\n   \n   Три основных подхода: 1) **localStorage \\+ storage event** — простой, но event не срабатывает в текущей вкладке. 2) **BroadcastChannel** — рекомендуемый, простой API для всех вкладок. 3) **SharedWorker** — сложный, но централизованная логика. Выбор зависит от требований к поддержке браузеров и сложности логики.\n2. **Почему storage event не срабатывает в текущей вкладке?**\n   \n   По спецификации storage event срабатывает только в других вкладках того же origin. Это сделано намеренно, чтобы избежать циклических обновлений. Для текущей вкладки нужно вызывать callback вручную после сохранения в localStorage.\n3. **Что делать при конфликте изменений из разных вкладок?**\n   \n   Существует несколько стратегий: 1) **Last\\-Write\\-Wins** — побеждает последнее изменение по timestamp. 2) **Merge** — объединение изменений (например, максимальное количество). 3) **CRDT** — conflict\\-free replicated data types для автоматического разрешения. Выбор зависит от бизнес\\-логики приложения.\n4. **Как узнать, что пользователь открыл новую вкладку?**\n   \n   При загрузке страницы можно отправить сообщение через BroadcastChannel с типом REQUEST\\_SYNC, на которое другие вкладки ответят текущим состоянием. Или при создании SharedWorker автоматически получить текущее состояние от worker.\n5. **В чем разница между BroadcastChannel и localStorage events?**\n   \n   **BroadcastChannel:** специально для межвкладочной коммуникации, работает во всех вкладках включая текущую, может передавать объекты без сериализации. **Storage event:** побочный эффект изменения localStorage, не срабатывает в текущей вкладке, только строки, зависит от персистентности.\n6. **Как оптимизировать синхронизацию для частых изменений?**\n   \n   Используйте: 1) **Debounce** — откладывайте сохранение на 300ms. 2) **Batching** — группируйте изменения и отправляйте батчами. 3) **Incremental updates** — отправляйте только изменения, а не всю корзину. 4) **Compression** — сжимайте данные для больших корзин.\n7. **Что такое CRDT и зачем он нужен для корзины?**\n   \n   **CRDT (Conflict\\-free Replicated Data Type)** — структура данных, которая автоматически разрешает конфликты при параллельных изменениях. Для корзины это полезно при одновременном изменении количества товара в разных вкладках — CRDT гарантирует консистентность без явной логики разрешения конфликтов.\n8. **Как тестировать синхронизацию между вкладками?**\n   \n   1\\) Вручную открывать несколько вкладок. 2) Использовать Playwright/Puppeteer для автоматизированных тестов с несколькими контекстами браузера. 3) Эмулировать события в юнит\\-тестах через mock localStorage/BroadcastChannel. 4) Проверять логи и network tab для отладки.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-88',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-89',
              blocks: [
                {
                  id: 'heading-90',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- Использовать BroadcastChannel для новых проектов\n- Сохранять в localStorage для персистентности\n- Реализовать стратегию разрешения конфликтов\n- Debounce для частых изменений\n- Валидировать данные перед применением\n- Показывать feedback пользователю',
                },
              ],
            },
            {
              id: 'card-92',
              blocks: [
                {
                  id: 'heading-93',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- Полагаться только на storage event\n- Отправлять весь state при каждом изменении\n- Игнорировать конфликты при одновременных изменениях\n- Забывать про cleanup (close channels)\n- Хранить сенситивные данные без шифрования\n- Синхронные блокирующие операции',
                },
              ],
            },
            {
              id: 'card-95',
              blocks: [
                {
                  id: 'heading-96',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Комбинировать BroadcastChannel \\+ localStorage\n- Версионировать формат данных\n- Логировать все синхронизации\n- Тестировать edge cases (offline, медленная сеть)\n- Использовать TypeScript для типизации\n- Мониторить размер данных',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Итог',
      blocks: [
        {
          id: 'text-98',
          type: 'prose',
          markdown:
            '**Синхронизация состояний между вкладками** — важная функция для веб\\-приложений, особенно для корзины покупок. **BroadcastChannel API** — рекомендуемый современный подход с простым API и хорошей поддержкой. **localStorage \\+ storage event** — fallback для старых браузеров. **SharedWorker** — для сложных сценариев с централизованной логикой. Важно реализовать стратегию разрешения конфликтов и оптимизировать производительность через debounce, batching или incremental updates. Комбинирование BroadcastChannel для коммуникации и localStorage для персистентности дает лучший результат.',
        },
        {
          id: 'resources-99',
          type: 'resources',
          items: [
            {
              id: 'link-100',
              label: 'MDN BroadcastChannel',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API',
            },
          ],
        },
        {
          id: 'resources-101',
          type: 'resources',
          items: [
            {
              id: 'link-102',
              label: 'MDN Storage Event',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event',
            },
          ],
        },
        {
          id: 'resources-103',
          type: 'resources',
          items: [
            {
              id: 'link-104',
              label: 'MDN SharedWorker',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
