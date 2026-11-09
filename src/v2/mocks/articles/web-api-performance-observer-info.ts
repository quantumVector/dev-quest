import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-performance-observer-info-basicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-performance-observer-info-entrytypessnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-performance-observer-info-webvitalssnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-performance-observer-info-practicalexamplessnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-performance-observer-info-debuggingsnippet.txt?raw'

// Content copied verbatim from src/views/web-api/PerformanceObserverInfo.vue.
export default {
  ...articleSummaries.webApiPerformanceObserverInfo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**PerformanceObserver** — это Web API для асинхронного мониторинга метрик производительности. Позволяет отслеживать загрузку страницы, ресурсов, Core Web Vitals (LCP, FID, CLS), долгие задачи и создавать кастомные метрики. Более эффективен, чем периодический опрос `performance.getEntries()`, так как работает на основе событий.',
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
                  text: 'Observer Pattern',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Асинхронное наблюдение за метриками производительности через callback',
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
                  text: 'Performance Entries',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    'Различные типы метрик: navigation, resource, paint, web vitals и другие',
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
                  text: 'Real-time Monitoring',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Получение метрик в реальном времени без постоянного опроса',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основы работы с PerformanceObserver',
      blocks: [
        {
          id: 'callout-12',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-13',
              type: 'prose',
              markdown:
                '**Паттерн:** Создать observer → Определить callback → Подписаться на типы метрик → Обрабатывать данные',
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
      title: 'Типы Performance Entries',
      blocks: [
        {
          id: 'table-15',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Основные метрики',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '`navigation`',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Загрузка документа',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'DNS, TCP, Request, Response, DOM timing',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '`resource`',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Загрузка ресурсов',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'URL, type, duration, size, cache',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '`paint`',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Метрики рендеринга',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'First Paint (FP), First Contentful Paint (FCP)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '`largest-contentful-paint`',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'LCP (Core Web Vital)',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Время, размер, элемент',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '`first-input`',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'FID (Core Web Vital)',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Задержка обработки первого взаимодействия',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`layout-shift`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'CLS (Core Web Vital)',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Значение сдвига, затронутые элементы',
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
                    markdown: '`longtask`',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Долгие задачи (&gt;50ms)',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Длительность, блокировка потока',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`mark`',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Пользовательские метки',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'performance.mark()',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '`measure`',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Пользовательские измерения',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'performance.measure()',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Core Web Vitals — полный мониторинг',
      blocks: [
        {
          id: 'cards-44',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-45',
              blocks: [
                {
                  id: 'heading-46',
                  type: 'heading',
                  level: 3,
                  text: 'LCP',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: '**Largest Contentful Paint**',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- ✅ Хорошо: &lt; 2.5s\n- ⚠️ Требует улучшения: 2.5s \\- 4s\n- ❌ Плохо: &gt; 4s',
                },
              ],
            },
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: 'FID',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown: '**First Input Delay**',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- ✅ Хорошо: &lt; 100ms\n- ⚠️ Требует улучшения: 100ms \\- 300ms\n- ❌ Плохо: &gt; 300ms',
                },
              ],
            },
            {
              id: 'card-53',
              blocks: [
                {
                  id: 'heading-54',
                  type: 'heading',
                  level: 3,
                  text: 'CLS',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: '**Cumulative Layout Shift**',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- ✅ Хорошо: &lt; 0.1\n- ⚠️ Требует улучшения: 0.1 \\- 0.25\n- ❌ Плохо: &gt; 0.25',
                },
              ],
            },
          ],
        },
        {
          id: 'code-57',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-58',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Отладка и диагностика',
      blocks: [
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
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'table-60',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Браузер',
            },
            {
              id: 'column-2',
              label: 'PerformanceObserver',
            },
            {
              id: 'column-3',
              label: 'Web Vitals',
            },
            {
              id: 'column-4',
              label: 'Long Tasks',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Chrome**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '52\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '77\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '58\\+ ✅',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**Firefox**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '57\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '122\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '**Safari**',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '11\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Частично ⚠️',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Edge**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '79\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '79\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '79\\+ ✅',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**Node.js**',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '16\\+ ✅',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '❌',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-81',
          type: 'prose',
          markdown:
            "1. **Что такое PerformanceObserver и зачем он нужен?**\n   \n   PerformanceObserver — это API для асинхронного мониторинга метрик производительности. Работает по принципу observer pattern — подписывается на типы метрик и вызывает callback при появлении новых данных. Более эффективен, чем polling через `performance.getEntries()`, так как не блокирует главный поток и не требует постоянных проверок.\n2. **Какие основные типы метрик можно отслеживать?**\n   \n   Основные: `navigation` (загрузка страницы), `resource` (загрузка ресурсов), `paint` (FP, FCP), `largest-contentful-paint` (LCP), `first-input` (FID), `layout-shift` (CLS), `longtask`, `mark`/`measure` (кастомные метрики). Полный список зависит от браузера и доступен через `PerformanceObserver.supportedEntryTypes`.\n3. **Что такое Core Web Vitals и как их измерить?**\n   \n   Core Web Vitals — три ключевые метрики пользовательского опыта от Google: **LCP** (скорость загрузки контента), **FID** (интерактивность), **CLS** (визуальная стабильность). Измеряются через PerformanceObserver с типами 'largest\\-contentful\\-paint', 'first\\-input', 'layout\\-shift'. Влияют на SEO и ранжирование в поиске.\n4. **В чем разница между entryTypes и type в observe()?**\n   \n   `entryTypes: ['type1', 'type2']` — подписка на несколько типов одновременно (старый API). `type: 'type1'` — подписка на один тип с возможностью использовать опцию `buffered: true` для получения накопленных метрик до подписки. Рекомендуется использовать `type` для каждого типа отдельно с buffered.\n5. **Что такое buffered: true и когда его использовать?**\n   \n   `buffered: true` позволяет получить метрики, которые были записаны до создания observer. Полезно для получения FCP, LCP и других ранних метрик, если observer создается после загрузки. Работает только с опцией `type`, не с `entryTypes`.\n6. **Как отследить медленные ресурсы на странице?**\n   \n   Создать PerformanceObserver для типа 'resource', фильтровать entries по `duration > threshold` (например, &gt;1000ms). Анализировать `initiatorType` (script, css, img), `transferSize` (размер) и `transferSize === 0` (загружено из кэша). Можно отправлять данные в аналитику для мониторинга.\n7. **Что такое Long Tasks и как их детектировать?**\n   \n   Long Tasks — задачи JavaScript, выполняющиеся дольше 50ms и блокирующие главный поток. Детектируются через `observe({ type: 'longtask' })`. Поддерживаются в Chrome/Edge. Важны для оптимизации интерактивности. Total Blocking Time (TBT) = сумма времени блокировки всех long tasks.\n8. **Как интегрировать PerformanceObserver в React?**\n   \n   Создать кастомный хук `usePerformanceObserver`, который создает observer в `useEffect` и отписывается в cleanup функции. Использовать `useRef` для хранения observer. Передавать callback и настройки через параметры хука. Проверять поддержку API перед созданием.\n9. **Как отправлять метрики в аналитику?**\n   \n   Использовать `navigator.sendBeacon()` для надежной отправки при закрытии страницы, или `fetch()` с `keepalive: true`. Собирать метрики в батчи для уменьшения количества запросов. Отправлять при `beforeunload` или по достижении порога количества метрик. Для Google Analytics использовать `gtag('event')`.\n10. **Влияет ли PerformanceObserver на производительность?**\n    \n    Минимально. PerformanceObserver работает асинхронно и не блокирует главный поток. Callback вызывается когда браузер готов, обычно в idle time. Однако тяжелые вычисления в callback могут повлиять на производительность. Рекомендуется делать callback легкими или использовать `requestIdleCallback` для обработки данных.",
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение подходов к мониторингу',
      blocks: [
        {
          id: 'table-82',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Плюсы',
            },
            {
              id: 'column-3',
              label: 'Минусы',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '**PerformanceObserver**',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown:
                      '- Асинхронный, не блокирует\n- Event\\-driven подход\n- Buffered entries\n- Низкое влияние на производительность',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '- Разная поддержка в браузерах\n- Сложнее в использовании',
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
                    markdown: '**performance.getEntries()**',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '- Простой API\n- Синхронный доступ\n- Хорошая поддержка',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '- Требует polling\n- Блокирует главный поток\n- Пропуск событий',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '**web\\-vitals library**',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '- Готовое решение\n- Полифиллы\n- Best practices',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '- Дополнительная зависимость\n- Только Web Vitals',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '**RUM (Real User Monitoring)**',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown:
                      '- Полная картина\n- Автоматическая аналитика\n- Dashboard из коробки',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: '- Стоимость сервиса\n- Внешняя зависимость\n- Privacy concerns',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-95',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-96',
              blocks: [
                {
                  id: 'heading-97',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- Использовать buffered: true\n- Отписываться через disconnect()\n- Проверять поддержку типов\n- Отправлять метрики батчами\n- Использовать sendBeacon()\n- Мониторить Core Web Vitals\n- Легкие callbacks',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown:
                    '- Тяжелых вычислений в callback\n- Синхронных запросов в callback\n- Забывать disconnect()\n- Игнорировать проверку поддержки\n- Отправлять каждую метрику отдельно\n- Блокировать главный поток',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '- Используйте web\\-vitals library\n- Визуализируйте метрики в DevTools\n- A/B тестирование производительности\n- Мониторинг в production\n- Алерты на критичные метрики\n- Документируйте пороговые значения',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Типичные паттерны использования',
      blocks: [
        {
          id: 'cards-105',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-106',
              title: 'Когда использовать',
              blocks: [
                {
                  id: 'text-107',
                  type: 'prose',
                  markdown:
                    '- Мониторинг Core Web Vitals\n- Отслеживание медленных ресурсов\n- Детекция долгих задач\n- Измерение custom метрик\n- Real User Monitoring (RUM)\n- A/B тесты производительности\n- Отладка проблем с производительностью\n- Автоматическая отправка в аналитику',
                },
              ],
            },
            {
              id: 'card-108',
              title: 'Интеграция с',
              blocks: [
                {
                  id: 'text-109',
                  type: 'prose',
                  markdown:
                    "- **Google Analytics:** gtag('event')\n- **Sentry:** Performance monitoring\n- **New Relic:** Browser monitoring\n- **DataDog:** RUM\n- **Lighthouse CI:** Автоматизация\n- **web\\-vitals:** Готовая библиотека\n- **React/Vue:** Кастомные хуки\n- **Node.js:** Performance hooks",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-110',
          type: 'prose',
          markdown:
            '**PerformanceObserver** — это мощный инструмент для асинхронного мониторинга производительности веб\\-приложений. Позволяет отслеживать различные метрики: загрузку страницы и ресурсов, Core Web Vitals (LCP, FID, CLS), долгие задачи и создавать кастомные метрики. Работает по принципу observer pattern, что делает его более эффективным, чем периодический polling. Критически важен для мониторинга пользовательского опыта в production, оптимизации производительности и улучшения SEO. Поддерживается всеми современными браузерами с некоторыми различиями в доступных типах метрик.',
        },
        {
          id: 'resources-111',
          type: 'resources',
          items: [
            {
              id: 'link-112',
              label: 'MDN PerformanceObserver',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver',
            },
          ],
        },
        {
          id: 'resources-113',
          type: 'resources',
          items: [
            {
              id: 'link-114',
              label: 'Web Vitals Guide',
              url: 'https://web.dev/vitals/',
            },
          ],
        },
        {
          id: 'resources-115',
          type: 'resources',
          items: [
            {
              id: 'link-116',
              label: 'web-vitals Library',
              url: 'https://github.com/GoogleChrome/web-vitals',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
