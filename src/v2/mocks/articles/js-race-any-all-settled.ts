import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-race-any-all-settled-promiseracesnippet.txt?raw'
import example2 from '../snippets/javascript/js-race-any-all-settled-promiseanysnippet.txt?raw'
import example3 from '../snippets/javascript/js-race-any-all-settled-promiseallsettledsnippet.txt?raw'
import example4 from '../snippets/javascript/js-race-any-all-settled-comparisonsnippet.txt?raw'
import example5 from '../snippets/javascript/js-race-any-all-settled-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/javascript/js-race-any-all-settled-inline6.txt?raw'
import example7 from '../snippets/javascript/js-race-any-all-settled-inline7.txt?raw'

// Content copied verbatim from src/views/js/PromiseRaceAnyAllSettled.vue.
export default {
  ...articleSummaries.jsPromiseRaceAnyAllSettled,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Promise.race**, **Promise.any** и **Promise.allSettled** — это методы для работы с несколькими Promise одновременно, каждый с уникальной логикой завершения. Понимание различий между ними критично для эффективной работы с асинхронным кодом.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Resolves когда',
            },
            {
              id: 'column-3',
              label: 'Rejects когда',
            },
            {
              id: 'column-4',
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
                    markdown: '`Promise.race`',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Первый resolve/reject',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Первый reject',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Значение первого',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '`Promise.any`',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Первый resolve',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Все reject',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Первое успешное значение',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '`Promise.allSettled`',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Все завершены',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Никогда',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Массив результатов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '`Promise.all`',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Все resolve',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Любой reject',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Массив значений',
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
      title: 'Promise.race — гонка на скорость',
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
                  text: 'Особенности',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- **Первый финиширует** — resolve или reject\n- **Игнорирует остальные** после первого результата\n- **Быстрое завершение** — хорошо и плохо\n- **Тип результата** зависит от победителя',
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
                  text: 'Применение',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    '- **Timeout для запросов**\n- **Выбор быстрейшего сервера**\n- **User race conditions**\n- **Первый доступный ресурс**',
                },
              ],
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Promise.any — первый успешный',
      blocks: [
        {
          id: 'cards-27',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-28',
              blocks: [
                {
                  id: 'heading-29',
                  type: 'heading',
                  level: 3,
                  text: 'Особенности',
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- **Первый успех** — игнорирует ошибки до того\n- **AggregateError** если все отклонены\n- **Оптимистичный** — ждет успеха\n- **ES2021 (ES12)** — относительно новый',
                },
              ],
            },
            {
              id: 'card-31',
              blocks: [
                {
                  id: 'heading-32',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    '- **Fallback стратегии**\n- **Множественные API**\n- **Резервные источники данных**\n- **Отказоустойчивость**',
                },
              ],
            },
          ],
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Promise.allSettled — дождаться всех',
      blocks: [
        {
          id: 'cards-35',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-36',
              blocks: [
                {
                  id: 'heading-37',
                  type: 'heading',
                  level: 3,
                  text: 'Особенности',
                },
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- **Никогда не reject** — всегда resolve\n- **Массив результатов** со статусами\n- **Полная информация** о всех операциях\n- **ES2020 (ES11)** — относительно новый',
                },
              ],
            },
            {
              id: 'card-39',
              blocks: [
                {
                  id: 'heading-40',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    '- **Batch операции**\n- **Сбор статистики**\n- **Независимые задачи**\n- **Логирование результатов**',
                },
              ],
            },
          ],
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение в действии',
      blocks: [
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-45',
          type: 'prose',
          markdown:
            '1. **В чем разница между Promise.race и Promise.any?**\n   \n   `Promise.race` возвращает результат первого завершившегося Promise (успех ИЛИ ошибка). `Promise.any` возвращает первый успешный результат, игнорируя предыдущие ошибки, и отклоняется только если ВСЕ Promise отклонены.\n2. **Когда использовать Promise.allSettled вместо Promise.all?**\n   \n   Используйте `Promise.allSettled`, когда нужно получить результаты всех операций, независимо от успеха или неудачи. `Promise.all` завершается неудачей при первой ошибке, а `allSettled` всегда дожидается завершения всех Promise.\n3. **Что такое AggregateError в Promise.any?**\n   \n   `AggregateError` — это специальный тип ошибки, который содержит массив всех ошибок от отклоненных Promise. Он возникает в `Promise.any` только когда ВСЕ Promise отклонены. У него есть свойство `errors` с массивом всех причин отклонения.\n4. **Как реализовать timeout с Promise.race?**\n   \n   Создайте Promise, который отклоняется через заданное время, и используйте `Promise.race` между основным Promise и таймаутом. Первый завершившийся определит результат — либо успешный ответ, либо таймаут-ошибка.\n5. **В каком порядке выполняются Promise в этих методах?**\n   \n   Все Promise начинают выполняться одновременно (параллельно), а не последовательно. Разница только в логике завершения метода — race ждет первого любого, any — первого успешного, allSettled — всех завершившихся.\n6. **Можно ли отменить остальные Promise после завершения race/any?**\n   \n   Нет, нельзя. Promise не имеют встроенного механизма отмены. После завершения `Promise.race` или `Promise.any` остальные Promise продолжают выполняться, просто их результаты игнорируются. Для отмены нужно использовать AbortController.',
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-46',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- Обрабатывать AggregateError в any\n- Использовать timeout в race\n- Проверять статус в allSettled\n- Логировать все результаты\n- Учитывать поддержку браузерами',
                },
              ],
            },
            {
              id: 'card-50',
              blocks: [
                {
                  id: 'heading-51',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Полагаться только на race без timeout\n- Игнорировать ошибки в allSettled\n- Забывать про AggregateError\n- Смешивать синхронные и асинхронные операции\n- Ожидать отмены остальных Promise',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- Комбинируйте методы для сложной логики\n- Добавляйте полифиллы для старых браузеров\n- Используйте AbortController для отмены\n- Мониторьте производительность\n- Тестируйте граничные случаи',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'table-56',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
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
              label: 'IE/Edge',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`Promise.race`',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '32+',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '29+',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '11+',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Edge 18+',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`Promise.any`',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '85+',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '79+',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '14+',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'Edge 85+',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '`Promise.allSettled`',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '76+',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '71+',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '13+',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Edge 76+',
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
      title: 'Полифиллы для старых браузеров',
      blocks: [
        {
          id: 'callout-72',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-73',
              type: 'prose',
              markdown:
                '**Внимание:** Promise.any и Promise.allSettled относительно новые методы. Для поддержки старых браузеров используйте полифиллы или библиотеки типа core-js.',
            },
          ],
        },
        {
          id: 'cards-74',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-75',
              title: 'Простой полифилл Promise.any',
              blocks: [
                {
                  id: 'code-76',
                  type: 'code',
                  language: 'javascript',
                  code: example6,
                },
              ],
            },
            {
              id: 'card-77',
              title: 'Полифилл Promise.allSettled',
              blocks: [
                {
                  id: 'code-78',
                  type: 'code',
                  language: 'javascript',
                  code: example7,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Производительность и memory leaks',
      blocks: [
        {
          id: 'callout-79',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-80',
              type: 'prose',
              markdown:
                '**Важно:** Promise после завершения race/any продолжают выполняться. Для длительных операций это может привести к утечкам памяти или ненужной нагрузке.',
            },
          ],
        },
        {
          id: 'cards-81',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-82',
              blocks: [
                {
                  id: 'heading-83',
                  type: 'heading',
                  level: 3,
                  text: 'Проблемы',
                },
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- **Неотменяемые операции** продолжают работу\n- **Memory leaks** при длительных задачах\n- **Лишняя нагрузка** на сервер/CPU\n- **Сложность отладки** параллельных процессов',
                },
              ],
            },
            {
              id: 'card-85',
              blocks: [
                {
                  id: 'heading-86',
                  type: 'heading',
                  level: 3,
                  text: 'Решения',
                },
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- **AbortController** для отмены запросов\n- **Timeout** для ограничения времени\n- **Cleanup функции** для освобождения ресурсов\n- **Мониторинг** активных операций',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Когда использовать каждый метод',
      blocks: [
        {
          id: 'cards-88',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-89',
              title: 'Promise.race',
              blocks: [
                {
                  id: 'text-90',
                  type: 'prose',
                  markdown:
                    '- Timeout для операций\n- Первый доступный ресурс\n- User interaction race conditions\n- Быстрые fail-fast сценарии',
                },
                {
                  id: 'tags-91',
                  type: 'tags',
                  items: ['Скорость важнее результата'],
                },
              ],
            },
            {
              id: 'card-92',
              title: 'Promise.any',
              blocks: [
                {
                  id: 'text-93',
                  type: 'prose',
                  markdown:
                    '- Fallback стратегии\n- Множественные источники данных\n- Отказоустойчивые системы\n- Первый успешный результат',
                },
                {
                  id: 'tags-94',
                  type: 'tags',
                  items: ['Надежность важнее скорости'],
                },
              ],
            },
          ],
        },
        {
          id: 'cards-95',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-96',
              title: 'Promise.allSettled',
              blocks: [
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- Batch обработка\n- Независимые операции\n- Сбор статистики/метрик\n- Анализ результатов',
                },
                {
                  id: 'tags-98',
                  type: 'tags',
                  items: ['Полнота данных важнее'],
                },
              ],
            },
            {
              id: 'card-99',
              title: 'Promise.all',
              blocks: [
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Все операции критичны\n- Зависимые данные\n- Атомарные операции\n- Fail-fast при любой ошибке',
                },
                {
                  id: 'tags-101',
                  type: 'tags',
                  items: ['Все или ничего'],
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
          id: 'text-102',
          type: 'prose',
          markdown:
            '**Promise.race** возвращает первый завершившийся результат (успех или ошибка). **Promise.any** возвращает первый успешный результат, игнорируя ошибки. **Promise.allSettled** дожидается завершения всех Promise и возвращает массив с результатами. Выбор метода зависит от бизнес-логики: нужна ли скорость, надежность или полнота данных.',
        },
        {
          id: 'resources-103',
          type: 'resources',
          items: [
            {
              id: 'link-104',
              label: 'MDN Promise Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            },
          ],
        },
        {
          id: 'resources-105',
          type: 'resources',
          items: [
            {
              id: 'link-106',
              label: 'ECMAScript Specification',
              url: 'https://tc39.es/ecma262/#sec-promise-objects',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
