import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-promise-collections-basicexamplesnippet.txt?raw'
import example2 from '../snippets/javascript/js-promise-collections-promiseallsnippet.txt?raw'
import example3 from '../snippets/javascript/js-promise-collections-promisemethodssnippet.txt?raw'
import example4 from '../snippets/javascript/js-promise-collections-dynamiccreationsnippet.txt?raw'
import example5 from '../snippets/javascript/js-promise-collections-errorhandlingsnippet.txt?raw'
import example6 from '../snippets/javascript/js-promise-collections-performancesnippet.txt?raw'
import example7 from '../snippets/javascript/js-promise-collections-practicalexamplessnippet.txt?raw'

// Content copied verbatim from src/views/js/PromiseCollections.vue.
export default {
  ...articleSummaries.jsPromiseCollections,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Итерируемая коллекция промисов** — это массив или другая структура данных, содержащая промисы, которые нужно выполнить одновременно. В JavaScript есть несколько способов запустить все промисы из коллекции сразу и обработать их результаты.',
    },
    {
      id: 'callout-2',
      type: 'callout',
      tone: 'info',
      blocks: [
        {
          id: 'text-3',
          type: 'prose',
          markdown:
            '**Важно понимать:** Промисы начинают выполняться сразу при создании! Если вы создали массив промисов, они уже запущены параллельно.',
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные концепции',
      blocks: [
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
      title: 'Promise.all - классический подход',
      blocks: [
        {
          id: 'code-5',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Сравнение методов Promise',
      blocks: [
        {
          id: 'cards-6',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-7',
              blocks: [
                {
                  id: 'heading-8',
                  type: 'heading',
                  level: 3,
                  text: 'Promise.all',
                },
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown:
                    '- **Поведение:** Ждет все промисы\n- **Ошибки:** Отклоняется при первой ошибке\n- **Результат:** Массив всех результатов\n- **Когда:** Все операции критичны',
                },
              ],
            },
            {
              id: 'card-10',
              blocks: [
                {
                  id: 'heading-11',
                  type: 'heading',
                  level: 3,
                  text: 'Promise.allSettled',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    '- **Поведение:** Ждет все промисы\n- **Ошибки:** Никогда не отклоняется\n- **Результат:** Массив со статусами\n- **Когда:** Нужны все результаты',
                },
              ],
            },
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: 'Promise.race',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- **Поведение:** Первый завершенный\n- **Ошибки:** Первая ошибка отклоняет\n- **Результат:** Результат первого\n- **Когда:** Таймауты, гонки',
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
                  text: 'Promise.any',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- **Поведение:** Первый успешный\n- **Ошибки:** Отклоняется если все провалились\n- **Результат:** Первый успешный результат\n- **Когда:** Fallback стратегии',
                },
              ],
            },
          ],
        },
        {
          id: 'code-19',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Динамическое создание коллекций',
      blocks: [
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Обработка ошибок',
      blocks: [
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-24',
          type: 'prose',
          markdown:
            '1. **Когда промисы в массиве начинают выполняться?**\n   \n   Промисы начинают выполняться **сразу при создании**, а не при вызове Promise.all(). Promise.all() только ожидает их завершения. Если нужно отложенное выполнение, создавайте массив функций, возвращающих промисы.\n2. **В чем разница между Promise.all и Promise.allSettled?**\n   \n   **Promise.all** отклоняется при первой ошибке и возвращает только успешные результаты. **Promise.allSettled** ждет все промисы и возвращает массив объектов со статусами (fulfilled/rejected) и результатами/причинами.\n3. **Как ограничить количество параллельных промисов?**\n   \n   Используйте паттерн с ограничением конкурентности - создавайте пул активных промисов и ждите освобождения слота перед запуском нового. Можно использовать семафоры или библиотеки типа p-limit.\n4. **Что произойдет, если передать пустой массив в Promise.all?**\n   \n   Promise.all(\\[\\]) немедленно resolve\'ится с пустым массивом \\[\\]. Это согласуется с математическим определением "все элементы пустого множества удовлетворяют условию".\n5. **Можно ли отменить выполнение коллекции промисов?**\n   \n   Промисы нельзя отменить встроенными средствами, но можно использовать AbortController для fetch запросов или создать обертку с флагом отмены. Promise.race с timeout\'ом также может имитировать отмену.\n6. **Как обработать ошибки в отдельных промисах при использовании Promise.all?**\n   \n   Оберните каждый промис в .catch() и верните объект с результатом и ошибкой, либо используйте Promise.allSettled(), который всегда возвращает информацию о статусе каждого промиса.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-25',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- Обрабатывайте ошибки в каждом промисе\n- Используйте Promise.allSettled для критичных операций\n- Ограничивайте параллелизм для тяжелых операций\n- Добавляйте таймауты для сетевых запросов\n- Логируйте прогресс выполнения\n- Кешируйте результаты где возможно',
                },
              ],
            },
            {
              id: 'card-29',
              blocks: [
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown:
                    '- Создания промисов в циклах без контроля\n- Игнорирования ошибок в коллекциях\n- Блокировки UI длительными операциями\n- Запуска слишком много параллельных запросов\n- Забывания про обработку пустых массивов\n- Использования Promise.all без fallback',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Измеряйте производительность операций\n- Используйте batch обработку\n- Показывайте прогресс пользователю\n- Предусматривайте retry логику\n- Тестируйте граничные случаи\n- Документируйте поведение при ошибках',
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
          id: 'text-35',
          type: 'prose',
          markdown:
            '**Итерируемые коллекции промисов** — мощный инструмент для параллельного выполнения асинхронных операций. Выбор правильного метода (Promise.all, Promise.allSettled, Promise.race, Promise.any) зависит от ваших требований к обработке ошибок и результатов. Помните про ограничение параллелизма, правильную обработку ошибок и оптимизацию производительности для создания надежных приложений.',
        },
        {
          id: 'resources-36',
          type: 'resources',
          items: [
            {
              id: 'link-37',
              label: 'MDN Promise.all',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
            },
          ],
        },
        {
          id: 'resources-38',
          type: 'resources',
          items: [
            {
              id: 'link-39',
              label: 'MDN Promise.allSettled',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
