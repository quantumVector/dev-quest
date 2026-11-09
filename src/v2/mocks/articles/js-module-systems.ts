import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-module-systems-iifeclosure.txt?raw'
import example2 from '../snippets/javascript/js-module-systems-commonjsexample.txt?raw'
import example3 from '../snippets/javascript/js-module-systems-amdexample.txt?raw'
import example4 from '../snippets/javascript/js-module-systems-umdexample.txt?raw'
import example5 from '../snippets/javascript/js-module-systems-es6modulesexample.txt?raw'
import example6 from '../snippets/javascript/js-module-systems-comparisontable.txt?raw'
import example7 from '../snippets/javascript/js-module-systems-modernpracticesexample.txt?raw'
import example8 from '../snippets/javascript/js-module-systems-migrationexample.txt?raw'

// Content copied verbatim from src/views/js/JavaScriptModuleSystems.vue.
export default {
  ...articleSummaries.jsJavaScriptModuleSystems,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Системы модулей** — способы организации и разделения кода на переиспользуемые части. В JavaScript существует несколько подходов: **IIFE/Closures**, **CommonJS**, **AMD**, **UMD** и современные **ES6 Modules**. Каждая система решает проблемы своего времени и имеет свои особенности.',
    },
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
              text: 'IIFE (Closures)',
            },
            {
              id: 'text-5',
              type: 'prose',
              markdown: '2003 • Браузер',
            },
            {
              id: 'tags-6',
              type: 'tags',
              items: ['Браузер'],
            },
          ],
        },
        {
          id: 'card-7',
          blocks: [
            {
              id: 'heading-8',
              type: 'heading',
              level: 3,
              text: 'CommonJS',
            },
            {
              id: 'text-9',
              type: 'prose',
              markdown: '2009 • Node.js',
            },
            {
              id: 'tags-10',
              type: 'tags',
              items: ['Node.js'],
            },
          ],
        },
        {
          id: 'card-11',
          blocks: [
            {
              id: 'heading-12',
              type: 'heading',
              level: 3,
              text: 'AMD',
            },
            {
              id: 'text-13',
              type: 'prose',
              markdown: '2009 • Браузер',
            },
            {
              id: 'tags-14',
              type: 'tags',
              items: ['Браузер'],
            },
          ],
        },
        {
          id: 'card-15',
          blocks: [
            {
              id: 'heading-16',
              type: 'heading',
              level: 3,
              text: 'UMD',
            },
            {
              id: 'text-17',
              type: 'prose',
              markdown: '2011 • Универсал',
            },
            {
              id: 'tags-18',
              type: 'tags',
              items: ['Универсал'],
            },
          ],
        },
        {
          id: 'card-19',
          blocks: [
            {
              id: 'heading-20',
              type: 'heading',
              level: 3,
              text: 'ES6 Modules',
            },
            {
              id: 'text-21',
              type: 'prose',
              markdown: '2015 • Браузер + Node.js',
            },
            {
              id: 'tags-22',
              type: 'tags',
              items: ['Браузер + Node.js'],
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Эволюция систем модулей',
      blocks: [
        {
          id: 'timeline-23',
          type: 'timeline',
          items: [
            {
              id: 'event-24',
              blocks: [
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: '2003',
                },
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 4,
                  text: 'IIFE (Closures)',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown: 'Браузер',
                },
              ],
            },
            {
              id: 'event-28',
              blocks: [
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown: '2009',
                },
                {
                  id: 'heading-30',
                  type: 'heading',
                  level: 4,
                  text: 'CommonJS',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Node.js',
                },
              ],
            },
            {
              id: 'event-32',
              blocks: [
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: '2009',
                },
                {
                  id: 'heading-34',
                  type: 'heading',
                  level: 4,
                  text: 'AMD',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown: 'Браузер',
                },
              ],
            },
            {
              id: 'event-36',
              blocks: [
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown: '2011',
                },
                {
                  id: 'heading-38',
                  type: 'heading',
                  level: 4,
                  text: 'UMD',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown: 'Универсал',
                },
              ],
            },
            {
              id: 'event-40',
              blocks: [
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown: '2015',
                },
                {
                  id: 'heading-42',
                  type: 'heading',
                  level: 4,
                  text: 'ES6 Modules',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: 'Браузер + Node.js',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. IIFE / Module Pattern (2003-2009)',
      blocks: [
        {
          id: 'callout-44',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-45',
              type: 'prose',
              markdown:
                '**IIFE (Immediately Invoked Function Expression)** — первый способ создания модулей через замыкания. Использовался до появления официальных систем модулей.',
            },
          ],
        },
        {
          id: 'cards-46',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-47',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- Работает везде (любой браузер)\n- Инкапсуляция через замыкания\n- Простота понимания\n- Контроль глобального namespace',
                },
              ],
            },
            {
              id: 'card-49',
              title: '❌ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Нет стандартизации\n- Ручное управление зависимостями\n- Загрязнение глобального scope\n- Сложность при масштабировании\n- Нет автоматической загрузки',
                },
              ],
            },
          ],
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. CommonJS (2009)',
      blocks: [
        {
          id: 'callout-52',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-53',
              type: 'prose',
              markdown:
                '**CommonJS** — система модулей Node.js. Использует `require()` для импорта и `module.exports` для экспорта. Синхронная загрузка модулей.',
            },
          ],
        },
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Стандарт де-факто для Node.js\n- Простой синтаксис\n- Автоматическое разрешение зависимостей\n- Кэширование модулей\n- Поддержка циклических зависимостей',
                },
              ],
            },
            {
              id: 'card-57',
              title: '❌ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Не работает в браузере нативно\n- Синхронная загрузка (блокирующая)\n- Динамическое разрешение зависимостей\n- Нет tree shaking\n- Загрузка всего модуля целиком',
                },
              ],
            },
          ],
        },
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. AMD - Asynchronous Module Definition (2009)',
      blocks: [
        {
          id: 'callout-60',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-61',
              type: 'prose',
              markdown:
                '**AMD** — система для асинхронной загрузки модулей в браузере. Популяризирована библиотекой RequireJS. Решает проблемы производительности в браузере.',
            },
          ],
        },
        {
          id: 'cards-62',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-63',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Асинхронная загрузка\n- Ленивая загрузка модулей\n- Оптимизация для браузера\n- Code splitting\n- Конфигурируемые пути к модулям',
                },
              ],
            },
            {
              id: 'card-65',
              title: '❌ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Verbose синтаксис\n- Необходимость дополнительной библиотеки\n- Сложная конфигурация\n- Не подходит для Node.js\n- Устаревший подход',
                },
              ],
            },
          ],
        },
        {
          id: 'code-67',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. UMD - Universal Module Definition (2011)',
      blocks: [
        {
          id: 'callout-68',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-69',
              type: 'prose',
              markdown:
                '**UMD** — универсальная система модулей, которая работает в любом окружении: браузер, Node.js, AMD. Комбинирует все подходы в одном файле.',
            },
          ],
        },
        {
          id: 'cards-70',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-71',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Универсальная совместимость\n- Один файл для всех окружений\n- Fallback на глобальные переменные\n- Подходит для библиотек\n- NoConflict режим',
                },
              ],
            },
            {
              id: 'card-73',
              title: '❌ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- Большой boilerplate код\n- Сложность в написании\n- Увеличенный размер файла\n- Сложность в отладке\n- Не решает основных проблем',
                },
              ],
            },
          ],
        },
        {
          id: 'code-75',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. ES6 Modules (ESM) - 2015',
      blocks: [
        {
          id: 'callout-76',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-77',
              type: 'prose',
              markdown:
                '**ES6 Modules** — официальный стандарт модулей в JavaScript. Поддерживает статический анализ, tree shaking и работает как в браузере, так и в Node.js.',
            },
          ],
        },
        {
          id: 'cards-78',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-79',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- Официальный стандарт\n- Статический анализ\n- Tree shaking\n- Top-level await\n- Динамические импорты\n- Чистый синтаксис',
                },
              ],
            },
            {
              id: 'card-81',
              title: '❌ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- Поздняя поддержка Node.js\n- Проблемы совместимости с CommonJS\n- Статические импорты только в top-level\n- Сложности с условными импортами',
                },
              ],
            },
          ],
        },
        {
          id: 'code-83',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнительная таблица',
      blocks: [
        {
          id: 'code-84',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Современные практики',
      blocks: [
        {
          id: 'callout-85',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-86',
              type: 'prose',
              markdown:
                'В современной разработке рекомендуется использовать **ES6 Modules** с инструментами сборки для обеспечения совместимости со старыми окружениями.',
            },
          ],
        },
        {
          id: 'code-87',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Стратегии миграции',
      blocks: [
        {
          id: 'callout-88',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-89',
              type: 'prose',
              markdown:
                'При переходе на ES6 модули важно понимать различия в поведении и использовать правильные инструменты для обеспечения совместимости.',
            },
          ],
        },
        {
          id: 'code-90',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Заключение и рекомендации',
      blocks: [
        {
          id: 'cards-91',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-92',
              title: '🎯 Для новых проектов',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-93',
                  type: 'prose',
                  markdown:
                    '- **ES6 Modules** — основной выбор\n- Webpack/Vite для сборки\n- Babel для транспиляции\n- TypeScript для типизации',
                },
              ],
            },
            {
              id: 'card-94',
              title: '🔧 Для legacy проектов',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-95',
                  type: 'prose',
                  markdown:
                    '- Постепенная миграция на ESM\n- Интероп между системами\n- Использование транспайлеров\n- Dual package для библиотек',
                },
              ],
            },
          ],
        },
        {
          id: 'cards-96',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-97',
              title: '📚 Ключевые моменты для собеседования',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- Понимание эволюции систем модулей\n- Различия в синтаксисе и поведении\n- Знание преимуществ и недостатков\n- Понимание совместимости',
                },
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    '- Современные инструменты сборки\n- Tree shaking и оптимизации\n- Стратегии миграции\n- Проблемы и их решения',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Типичные вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-100',
          type: 'accordion',
          items: [
            {
              id: 'question-101',
              title: '**1. В чём разница между CommonJS и ES6 модулями?**',
              blocks: [
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    '- **Синтаксис:** require/module.exports vs import/export\n- **Загрузка:** динамическая vs статическая\n- **Анализ:** runtime vs compile-time\n- **Tree shaking:** невозможен vs поддерживается\n- **Копирование vs ссылки:** CommonJS копирует значения, ESM создает ссылки',
                },
              ],
            },
            {
              id: 'question-103',
              title: '**2. Что такое tree shaking и почему он важен?**',
              blocks: [
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    "Tree shaking — это процесс удаления неиспользуемого кода при сборке. Возможен только с ES6 модулями благодаря статическому анализу импортов/экспортов. Значительно уменьшает размер bundle'а.",
                },
              ],
            },
            {
              id: 'question-105',
              title: '**3. Как решить проблему совместимости между CommonJS и ESM?**',
              blocks: [
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown:
                    '- Использование инструментов сборки (Webpack, Rollup)\n- Создание dual packages\n- Использование динамических импортов\n- Интероп слой для legacy кода',
                },
              ],
            },
            {
              id: 'question-107',
              title: '**4. Когда использовать динамические импорты?**',
              blocks: [
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    '- Ленивая загрузка компонентов\n- Условная загрузка модулей\n- Code splitting\n- Загрузка модулей по требованию\n- Работа с legacy CommonJS в ESM',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
