import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-partial-bind-basicbindsnippet.txt?raw'
import example2 from '../snippets/javascript/js-partial-bind-partialapplicationsnippet.txt?raw'
import example3 from '../snippets/javascript/js-partial-bind-defaultargumentssnippet.txt?raw'
import example4 from '../snippets/javascript/js-partial-bind-practicalexamplessnippet.txt?raw'
import example5 from '../snippets/javascript/js-partial-bind-advancedtechniquessnippet.txt?raw'
import example6 from '../snippets/javascript/js-partial-bind-comparisonsnippet.txt?raw'
import example7 from '../snippets/javascript/js-partial-bind-interviewquestionssnippet.txt?raw'

// Content copied verbatim from src/views/js/PartialApplicationBind.vue.
export default {
  ...articleSummaries.jsPartialApplicationBind,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Частичное применение** (Partial Application) — это техника создания новой функции путем фиксации некоторых аргументов исходной функции. **func.bind(context, \\[arg1\\], \\[arg2\\], ...)** — основной способ частичного применения в JavaScript, который также позволяет привязать контекст выполнения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы bind() и частичное применение',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'bind()',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Привязка контекста** (this)\n- **Частичное применение** аргументов\n- **Возвращает новую функцию**\n- **Не вызывает** исходную функцию\n- **Создает замыкание**',
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
                  text: 'Частичное применение',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Фиксирует** часть аргументов\n- **Создает** специализированные функции\n- **Упрощает** повторные вызовы\n- **Улучшает** читаемость кода\n- **Способствует** переиспользованию',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Примеры частичного применения',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Дефолтные аргументы через bind',
      blocks: [
        {
          id: 'callout-11',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-12',
              type: 'prose',
              markdown:
                '**Внимание:** bind() не идеально подходит для создания дефолтных аргументов, так как фиксирует аргументы по позициям. Для гибкости лучше использовать обертки или ES6 дефолтные параметры.',
            },
          ],
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Практические примеры применения',
      blocks: [
        {
          id: 'code-14',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Продвинутые техники',
      blocks: [
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'code-16',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Когда использовать каждый подход?',
      blocks: [
        {
          id: 'cards-17',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: 'bind()',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Привязка контекста this\n- Создание event handlers\n- Частичное применение первых аргументов\n- Создание специализированных версий функций',
                },
              ],
            },
            {
              id: 'card-21',
              blocks: [
                {
                  id: 'heading-22',
                  type: 'heading',
                  level: 3,
                  text: 'ES6 дефолты',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown:
                    '- Простые дефолтные значения\n- Читаемость кода\n- Стандартный подход\n- Поддержка в современных браузерах',
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
                  text: 'Обертки',
                },
                {
                  id: 'text-26',
                  type: 'prose',
                  markdown:
                    '- Сложная логика дефолтов\n- Конфигурационные объекты\n- Фабрики функций\n- Максимальная гибкость',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Вопросы на собеседовании',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-28',
          type: 'prose',
          markdown:
            '1. **В чем разница между call, apply и bind?**\n   \n   **call** и **apply** вызывают функцию немедленно (разница только в передаче аргументов: отдельно vs массивом), а **bind** возвращает новую функцию с привязанным контекстом и/или аргументами.\n2. **Можно ли "развязать" bind?**\n   \n   Нет, bind создает новую функцию с привязанным контекстом. Повторный bind на уже привязанной функции не изменит первоначальную привязку.\n3. **Что произойдет при использовании new с bind-функцией?**\n   \n   При использовании new с bind-функцией, привязанный контекст игнорируется, но частично примененные аргументы сохраняются.\n4. **Как создать функцию с дефолтными аргументами в середине?**\n   \n   bind() фиксирует аргументы по позициям слева направо. Для гибкости лучше использовать обертки или конфигурационные объекты.\n5. **В чем разница между частичным применением и каррированием?**\n   \n   **Частичное применение** фиксирует некоторые аргументы и возвращает функцию, ожидающую остальные. **Каррирование** превращает функцию от n аргументов в цепочку функций от одного аргумента.\n6. **Какие есть альтернативы bind() для частичного применения?**\n   \n   Стрелочные функции, замыкания, библиотеки типа Lodash (\\_.partial), собственные реализации curry/partial функций.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-29',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-30',
              blocks: [
                {
                  id: 'heading-31',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- Использовать для привязки контекста\n- Создавать специализированные функции\n- Комбинировать с другими паттернами\n- Документировать частичное применение\n- Тестировать edge cases\n- Предпочитать ES6 дефолты для простых случаев',
                },
              ],
            },
            {
              id: 'card-33',
              blocks: [
                {
                  id: 'heading-34',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown:
                    '- Злоупотребления bind() для дефолтов\n- Сложных цепочек bind\n- bind() без необходимости\n- Потери читаемости кода\n- Игнорирования производительности\n- Смешивания подходов без системы',
                },
              ],
            },
            {
              id: 'card-36',
              blocks: [
                {
                  id: 'heading-37',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- Изучите альтернативы (currying, closures)\n- Используйте осмысленные имена функций\n- Учитывайте контекст и команду\n- Тестируйте различные сценарии\n- Мониторьте производительность\n- Изучайте функциональные библиотеки',
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
          id: 'text-39',
          type: 'prose',
          markdown:
            '**bind()** — мощный инструмент для частичного применения функций и привязки контекста. Хотя он не идеально подходит для всех сценариев дефолтных аргументов, понимание его работы критично для JavaScript разработчика. Комбинируйте bind() с другими техниками для создания гибких и читаемых решений.',
        },
        {
          id: 'resources-40',
          type: 'resources',
          items: [
            {
              id: 'link-41',
              label: 'MDN: Function.bind()',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind',
            },
          ],
        },
        {
          id: 'resources-42',
          type: 'resources',
          items: [
            {
              id: 'link-43',
              label: 'JavaScript.info: Binding',
              url: 'https://javascript.info/bind',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
