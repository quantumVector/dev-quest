import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-maintaining-connection-server-methodsoverviewsnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-maintaining-connection-server-websocketsbasicssnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-maintaining-connection-server-websocketsadvancedsnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-maintaining-connection-server-serversenteventssnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-maintaining-connection-server-comparisonsnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-maintaining-connection-server-longpollingsnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-maintaining-connection-server-alternativessnippet.txt?raw'
import example8 from '../snippets/web-api/web-api-maintaining-connection-server-practicalexamplessnippet.txt?raw'
import example9 from '../snippets/web-api/web-api-maintaining-connection-server-inline9.txt?raw'
import example10 from '../snippets/web-api/web-api-maintaining-connection-server-inline10.txt?raw'
import example11 from '../snippets/web-api/web-api-maintaining-connection-server-inline11.txt?raw'

// Content copied verbatim from src/views/web-api/MaintainingConnectionServer.vue.
export default {
  ...articleSummaries.webApiMaintainingConnectionServer,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'Существует несколько методов поддержания постоянного соединения с сервером: **WebSockets** для двусторонней связи, **Server\\-Sent Events (EventSource)** для односторонней передачи от сервера к клиенту, **Long Polling** и классический **Polling** как fallback решения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Обзор методов поддержания соединения',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Сравнительная таблица методов',
      blocks: [
        {
          id: 'table-3',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'WebSocket',
            },
            {
              id: 'column-3',
              label: 'Server-Sent Events',
            },
            {
              id: 'column-4',
              label: 'Long Polling',
            },
            {
              id: 'column-5',
              label: 'Short Polling',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '**Направление**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Двустороннее ⇄',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Сервер → Клиент',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Запрос/Ответ',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Запрос/Ответ',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Протокол**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'ws:// / wss://',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'HTTP/HTTPS',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'HTTP/HTTPS',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'HTTP/HTTPS',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '**Overhead**',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Минимальный (2\\-14 байт)',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'HTTP заголовки',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'HTTP заголовки',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Максимальный',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Latency**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Очень низкая',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Переподключение**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Вручную',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Автоматическое',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Вручную',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Не требуется',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '**Поддержка браузеров**',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Все современные',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Все кроме IE',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Везде',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Везде',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Данные**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Текст \\+ Бинарные',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Только текст',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Любые',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Любые',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'WebSockets - основы',
      blocks: [
        {
          id: 'callout-39',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-40',
              type: 'prose',
              markdown: '**WebSocket** — лучший выбор для двусторонней связи в реальном времени',
            },
          ],
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Преимущества WebSockets',
      blocks: [
        {
          id: 'cards-42',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-43',
              blocks: [
                {
                  id: 'heading-44',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- **Двусторонняя связь** — клиент и сервер могут отправлять данные\n- **Низкая latency** — нет overhead HTTP запросов\n- **Минимальный трафик** — заголовок 2\\-14 байт vs сотни в HTTP\n- **Высокая частота** — 100\\+ сообщений в секунду\n- **Бинарные данные** — ArrayBuffer, Blob\n- **Масштабируемость** — меньше нагрузка на сервер',
                },
              ],
            },
            {
              id: 'card-46',
              blocks: [
                {
                  id: 'heading-47',
                  type: 'heading',
                  level: 3,
                  text: 'Недостатки',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- **Требует специальный сервер** — не работает с обычным HTTP сервером\n- **Проблемы с proxy/firewall** — могут блокировать ws://\n- **Нет автопереподключения** — нужно реализовывать\n- **Сложнее с load balancing** — нужны sticky sessions\n- **Нет встроенного fallback** — нужна альтернатива',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'WebSockets - продвинутое использование',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Server-Sent Events (EventSource)',
      blocks: [
        {
          id: 'callout-50',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-51',
              type: 'prose',
              markdown:
                '**EventSource** — идеален для односторонней передачи данных от сервера к клиенту',
            },
          ],
        },
        {
          id: 'code-52',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Server-Sent Events vs WebSockets',
      blocks: [
        {
          id: 'cards-53',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-54',
              blocks: [
                {
                  id: 'heading-55',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества SSE',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- **Простой API** — легче использовать\n- **Автопереподключение** — встроено\n- **Работает через HTTP** — нет проблем с proxy\n- **Поддержка lastEventId** — восстановление после разрыва\n- **Именованные события** — удобная обработка\n- **Не требует специального сервера** — обычный HTTP',
                },
              ],
            },
            {
              id: 'card-57',
              blocks: [
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 3,
                  text: 'Ограничения SSE',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- **Только от сервера** — нельзя отправить с клиента\n- **Только текст** — нет бинарных данных\n- **Ограничения соединений** — 6 на домен (HTTP/1.1)\n- **Нет кастомных заголовков** — только GET запрос\n- **Больший overhead** — HTTP заголовки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Детальное сравнение WebSockets и EventSource',
      blocks: [
        {
          id: 'code-60',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Long Polling - альтернативный метод',
      blocks: [
        {
          id: 'callout-61',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-62',
              type: 'prose',
              markdown:
                '**Long Polling** — используйте как fallback если WebSocket/EventSource недоступны',
            },
          ],
        },
        {
          id: 'code-63',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Альтернативы и Fallback стратегии',
      blocks: [
        {
          id: 'code-64',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-65',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Когда использовать каждый метод',
      blocks: [
        {
          id: 'cards-66',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-67',
              blocks: [
                {
                  id: 'heading-68',
                  type: 'heading',
                  level: 3,
                  text: 'WebSockets',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Чаты и мессенджеры\n- Многопользовательские игры\n- Совместное редактирование\n- Трейдинг и биржевые котировки\n- IoT и real\\-time мониторинг\n- Video/Audio streaming\n- Когда нужна двусторонняя связь',
                },
              ],
            },
            {
              id: 'card-70',
              blocks: [
                {
                  id: 'heading-71',
                  type: 'heading',
                  level: 3,
                  text: 'Server-Sent Events',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Уведомления и алерты\n- Новостные ленты\n- Обновления статуса\n- Прогресс длительных операций\n- Live scores и спортивные результаты\n- Мониторинг метрик\n- Когда связь только от сервера',
                },
              ],
            },
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: 'Long Polling',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Fallback для WebSocket\n- Корпоративные сети (firewall)\n- Старые браузеры\n- Простые уведомления\n- Нечастые обновления\n- Когда WebSocket/SSE недоступны',
                },
              ],
            },
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: 'Simple Polling',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Последний fallback\n- Очень старые браузеры\n- Очень редкие обновления (&gt;1 мин)\n- Простейшая реализация\n- Не критично к latency\n- Минимальная инфраструктура',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-79',
          type: 'prose',
          markdown:
            '1. **Что такое WebSockets и как они работают?**\n   \n   WebSocket — это протокол для двусторонней связи между клиентом и сервером через единое TCP соединение. Работает через HTTP Upgrade: клиент отправляет запрос с заголовком Upgrade: websocket, сервер соглашается, и соединение переключается на ws:// протокол. Позволяет клиенту и серверу отправлять данные в любое время без повторного установления соединения.\n2. **В чем главные преимущества WebSockets?**\n   \n   1\\) Двусторонняя связь (full\\-duplex), 2) Минимальный overhead (2\\-14 байт vs сотни в HTTP), 3) Низкая latency, 4) Поддержка бинарных данных, 5) Высокая частота обновлений (100\\+ сообщений/сек), 6) Эффективное использование ресурсов сервера.\n3. **Что такое Server\\-Sent Events (EventSource)?**\n   \n   Server\\-Sent Events — это технология для односторонней передачи данных от сервера к клиенту через HTTP. Работает через стандартный HTTP запрос с Content\\-Type: text/event\\-stream. Браузер автоматически переподключается при обрыве связи. Поддерживает именованные события и lastEventId для возобновления.\n4. **В чем отличие EventSource от WebSockets?**\n   \n   EventSource: только от сервера к клиенту, только текст, работает через HTTP, автоматическое переподключение, проще в использовании. WebSocket: двусторонняя связь, текст \\+ бинарные данные, отдельный протокол (ws://), нужна ручная реализация переподключения, минимальный overhead.\n5. **Когда использовать WebSockets, а когда EventSource?**\n   \n   WebSockets: когда нужна двусторонняя связь (чаты, игры, collaborative editing), высокая частота обновлений, бинарные данные. EventSource: когда данные только от сервера (уведомления, новостные ленты, мониторинг), нужно автопереподключение, работа через HTTP важнее производительности.\n6. **Что такое Long Polling и когда его использовать?**\n   \n   Long Polling — техника, где клиент делает HTTP запрос, а сервер держит соединение открытым до появления новых данных. Используется как fallback когда WebSocket/EventSource недоступны (старые браузеры, строгие firewall), для нечастых обновлений, в корпоративных сетях.\n7. **Какие альтернативы есть если WebSocket не поддерживается?**\n   \n   1\\) Server\\-Sent Events (EventSource) — если только от сервера, 2) Long Polling — универсальный fallback, 3) Simple Polling — последняя опция, 4) Библиотеки с автоматическим fallback (Socket.IO, SignalR), 5) WebRTC DataChannel для P2P.\n8. **Как реализовать автоматическое переподключение для WebSocket?**\n   \n   Создать обертку: отслеживать событие onclose, проверять что закрытие не было принудительным (forcedClose флаг), реализовать экспоненциальную задержку (reconnectDelay \\* Math.pow(decay, attempts)), ограничить количество попыток, сохранять очередь сообщений для отправки после переподключения.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-80',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-81',
              blocks: [
                {
                  id: 'heading-82',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Реализовывать автопереподключение\n- Использовать heartbeat/ping\\-pong\n- Валидировать данные на клиенте и сервере\n- Обрабатывать ошибки gracefully\n- Использовать wss:// (безопасное соединение)\n- Реализовывать fallback стратегию\n- Тестировать на плохом соединении',
                },
              ],
            },
            {
              id: 'card-84',
              blocks: [
                {
                  id: 'heading-85',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- Отправки чувствительных данных без шифрования\n- Отсутствия обработки разрыва соединения\n- Игнорирования ошибок подключения\n- Бесконечных попыток переподключения\n- Отправки больших данных без chunking\n- Забывания про mobile (батарея, сеть)\n- Игнорирования CORS политик',
                },
              ],
            },
            {
              id: 'card-87',
              blocks: [
                {
                  id: 'heading-88',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- Мониторьте качество соединения\n- Используйте сжатие данных (gzip)\n- Реализуйте очередь сообщений\n- Логируйте события соединения\n- Тестируйте на разных устройствах\n- Используйте библиотеки (Socket.IO)\n- Документируйте протокол обмена',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Популярные библиотеки',
      blocks: [
        {
          id: 'cards-90',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-91',
              blocks: [
                {
                  id: 'heading-92',
                  type: 'heading',
                  level: 3,
                  text: 'Socket.IO',
                },
                {
                  id: 'text-93',
                  type: 'prose',
                  markdown: 'Самая популярная библиотека для real\\-time коммуникации',
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- Автоматический fallback (WebSocket → Polling)\n- Автопереподключение\n- Комнаты и namespace\n- Бинарные данные\n- Broadcast и группы',
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
                  text: 'ws (Node.js)',
                },
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown: 'Простая и быстрая WebSocket библиотека',
                },
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- Минимальные зависимости\n- Высокая производительность\n- WebSocket Server для Node.js\n- Поддержка перфоманс тестов\n- Простой API',
                },
              ],
            },
            {
              id: 'card-99',
              blocks: [
                {
                  id: 'heading-100',
                  type: 'heading',
                  level: 3,
                  text: 'SockJS',
                },
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown: 'WebSocket эмуляция для старых браузеров',
                },
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    '- WebSocket\\-like API\n- Множество транспортов\n- Работает везде\n- Прозрачный fallback\n- CORS поддержка',
                },
              ],
            },
            {
              id: 'card-103',
              blocks: [
                {
                  id: 'heading-104',
                  type: 'heading',
                  level: 3,
                  text: 'Firebase Realtime',
                },
                {
                  id: 'text-105',
                  type: 'prose',
                  markdown: 'Backend\\-as\\-a\\-Service с real\\-time синхронизацией',
                },
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown:
                    '- Автоматическая синхронизация\n- Offline поддержка\n- Не нужен свой сервер\n- Аутентификация встроена\n- Масштабируемость',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Серверная часть (примеры)',
      blocks: [
        {
          id: 'accordion-107',
          type: 'accordion',
          items: [
            {
              id: 'question-108',
              title: 'Node.js \\+ ws (WebSocket)',
              blocks: [
                {
                  id: 'code-109',
                  type: 'code',
                  language: 'javascript',
                  code: example9,
                },
              ],
            },
            {
              id: 'question-110',
              title: 'Node.js \\+ Express (Server\\-Sent Events)',
              blocks: [
                {
                  id: 'code-111',
                  type: 'code',
                  language: 'javascript',
                  code: example10,
                },
              ],
            },
            {
              id: 'question-112',
              title: 'Node.js \\+ Socket.IO',
              blocks: [
                {
                  id: 'code-113',
                  type: 'code',
                  language: 'javascript',
                  code: example11,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Безопасность',
      blocks: [
        {
          id: 'cards-114',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-115',
              title: '🔒 Шифрование',
              blocks: [
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- Используйте wss:// (WSS over TLS)\n- Валидируйте SSL сертификаты\n- Не передавайте sensitive данные без шифрования\n- Используйте HTTPS для EventSource',
                },
              ],
            },
            {
              id: 'card-117',
              title: '🛡️ Аутентификация',
              blocks: [
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    '- Проверяйте токены при подключении\n- Используйте JWT или session\n- Реализуйте rate limiting\n- Проверяйте origin запросов',
                },
              ],
            },
            {
              id: 'card-119',
              title: '⚠️ Валидация',
              blocks: [
                {
                  id: 'text-120',
                  type: 'prose',
                  markdown:
                    '- Валидируйте все входящие данные\n- Санитизируйте пользовательский ввод\n- Ограничивайте размер сообщений\n- Защищайтесь от DoS атак',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'cards-121',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-122',
              title: 'Клиентская оптимизация',
              blocks: [
                {
                  id: 'text-123',
                  type: 'prose',
                  markdown:
                    '- **Throttling:** Ограничивайте частоту отправки\n- **Batching:** Группируйте сообщения\n- **Compression:** Сжимайте JSON данные\n- **Binary:** Используйте бинарные форматы\n- **Lazy:** Ленивая инициализация соединений',
                },
              ],
            },
            {
              id: 'card-124',
              title: 'Серверная оптимизация',
              blocks: [
                {
                  id: 'text-125',
                  type: 'prose',
                  markdown:
                    '- **Scaling:** Горизонтальное масштабирование\n- **Load Balancing:** Распределение нагрузки\n- **Redis:** Для pub/sub между серверами\n- **Clustering:** Node.js кластеризация\n- **Monitoring:** Мониторинг соединений',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-19',
      title: 'Итог',
      blocks: [
        {
          id: 'text-126',
          type: 'prose',
          markdown:
            '**WebSockets** — лучший выбор для двусторонней real\\-time связи (чаты, игры, collaborative editing). **Server\\-Sent Events** — отлично подходит для односторонней передачи от сервера (уведомления, live обновления). **Long Polling** — надежный fallback для старых браузеров и строгих firewall. **Simple Polling** — последняя опция для максимальной совместимости. Выбор метода зависит от требований проекта: нужна ли двусторонняя связь, частота обновлений, поддержка браузеров и инфраструктурные ограничения. Для production рекомендуется реализовать graceful degradation с автоматическим fallback на менее эффективные, но более совместимые методы.',
        },
        {
          id: 'callout-127',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-128',
              type: 'prose',
              markdown:
                '**Совет для собеседования:** Подчеркните понимание trade\\-offs между методами, знание автопереподключения, heartbeat механизмов, fallback стратегий и практического опыта с конкретными use cases (чат, уведомления, мониторинг). Упомяните Socket.IO как production\\-ready решение с автоматическим fallback.',
            },
          ],
        },
        {
          id: 'resources-129',
          type: 'resources',
          items: [
            {
              id: 'link-130',
              label: 'MDN WebSocket',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
            },
          ],
        },
        {
          id: 'resources-131',
          type: 'resources',
          items: [
            {
              id: 'link-132',
              label: 'MDN EventSource',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventSource',
            },
          ],
        },
        {
          id: 'resources-133',
          type: 'resources',
          items: [
            {
              id: 'link-134',
              label: 'Socket.IO Docs',
              url: 'https://socket.io/docs/v4/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
