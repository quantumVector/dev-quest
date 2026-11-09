import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-global-prototypes-problems-badexamplesnippet.txt?raw'
import example2 from '../snippets/javascript/js-global-prototypes-problems-problemsexamplesnippet.txt?raw'
import example3 from '../snippets/javascript/js-global-prototypes-problems-securityexamplesnippet.txt?raw'
import example4 from '../snippets/javascript/js-global-prototypes-problems-libraryconflictsnippet.txt?raw'
import example5 from '../snippets/javascript/js-global-prototypes-problems-goodexamplesnippet.txt?raw'
import example6 from '../snippets/javascript/js-global-prototypes-problems-usageexamplesnippet.txt?raw'
import example7 from '../snippets/javascript/js-global-prototypes-problems-detectionexamplesnippet.txt?raw'
import example8 from '../snippets/javascript/js-global-prototypes-problems-eslintconfigsnippet.txt?raw'

// Content copied verbatim from src/views/js/GlobalPrototypesProblems.vue.
export default {
  ...articleSummaries.jsGlobalPrototypesProblems,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Модификация встроенных прототипов** (Array.prototype, Object.prototype, String.prototype) считается плохой практикой в JavaScript. Это может привести к конфликтам, непредсказуемому поведению и проблемам с совместимостью. Разберем основные проблемы и альтернативные решения.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: '❌ Проблематичный подход',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Опасно:** Модификация глобальных прототипов влияет на все объекты данного типа во всем приложении!',
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
      title: 'Основные проблемы',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'Глобальное загрязнение',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Методы появляются во всех объектах\n- Ломается цикл `for...in`\n- Нарушается принцип изоляции\n- Влияние на сторонние библиотеки',
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
                  text: 'Конфликты',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- Несовместимость библиотек\n- Перезапись существующих методов\n- Непредсказуемое поведение\n- Сложность отладки',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-12',
          type: 'heading',
          level: 3,
          text: 'Проблема 1: Загрязнение и циклы',
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'heading-14',
          type: 'heading',
          level: 3,
          text: 'Проблема 2: Безопасность и встроенные методы',
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-16',
          type: 'heading',
          level: 3,
          text: 'Проблема 3: Конфликты библиотек',
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-3',
      title: '✅ Правильные альтернативы',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Рекомендуется:** Используйте утилитарные функции, классы или композицию вместо модификации прототипов',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-21',
          type: 'heading',
          level: 3,
          text: 'Примеры использования альтернатив',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Обнаружение и защита',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
        {
          id: 'heading-24',
          type: 'heading',
          level: 3,
          text: 'Настройка линтеров для предотвращения',
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'table-26',
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
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Модификация прототипов**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Удобный синтаксис',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Глобальные конфликты, небезопасно',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '❌ Не рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '**Утилитарные функции**',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Безопасно, предсказуемо',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Менее удобный синтаксис',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '✅ Рекомендуется',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '**Расширение классов**',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'OOP подход, типизация',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Больше кода',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '✅ Хорошо для новых классов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Композиция**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Гибкость, инкапсуляция',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Сложнее понимание',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '✅ Для сложных случаев',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '**Symbol методы**',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Уникальность, нет конфликтов',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Менее читаемо',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '🔄 В особых случаях',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-47',
          type: 'prose',
          markdown:
            '1. **Почему нельзя модифицировать Object.prototype?**\n   \n   Потому что Object.prototype находится в цепочке прототипов всех объектов в JavaScript. Любые добавленные свойства появятся во всех объектах и будут видны в циклах for...in, что может сломать логику приложения и сторонних библиотек.\n2. **Что произойдет, если две библиотеки добавят метод с одинаковым именем?**\n   \n   Возникнет конфликт — последняя загруженная библиотека перезапишет метод первой. Это приведет к неожиданному поведению и ошибкам, которые сложно отладить. Поэтому лучше использовать пространства имен и утилитарные функции.\n3. **Как проверить, не была ли модифицирована цепочка прототипов?**\n   \n   Можно сохранить ссылки на оригинальные методы при загрузке и сравнивать с текущими: `originalHasOwnProperty === Object.prototype.hasOwnProperty`. Также можно использовать Object.getOwnPropertyNames() для проверки лишних свойств.\n4. **В каких случаях модификация прототипов может быть оправдана?**\n   \n   В очень редких случаях: полифиллы для старых браузеров (например, Array.prototype.includes), внутренние фреймворки с полным контролем окружения. Но даже тогда лучше использовать проверку на существование метода и Symbol для уникальности.\n5. **Чем Symbol помогает при работе с прототипами?**\n   \n   Symbol создает уникальный ключ, который не конфликтует с строковыми свойствами и не появляется в циклах for...in или Object.keys(). Это делает расширение прототипов более безопасным, но менее читаемым.\n6. **Как создать объект без прототипа?**\n   \n   Используйте `Object.create(null)` — это создает объект без цепочки прототипов. У такого объекта не будет методов toString(), hasOwnProperty() и других встроенных методов, что полезно для создания чистых словарей или мапов.',
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Утилитарные функции/модули\n- Расширение через классы\n- Композиция объектов\n- Использование TypeScript\n- Настройка ESLint правил\n- Object.create(null) для словарей',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Модификация Object.prototype\n- Изменение встроенных методов\n- Добавление методов в Array.prototype\n- Переопределение hasOwnProperty\n- Изменение String.prototype\n- Monkey patching без необходимости',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '💡 Исключения',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Полифиллы с проверкой существования\n- Symbol методы для фреймворков\n- Внутренние API с полным контролем\n- Миграция legacy кода\n- Специфичные библиотечные нужды\n- Временные решения с планом рефакторинга',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Итог',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            '**Модификация глобальных прототипов** — это антипаттерн, который может привести к непредсказуемому поведению, конфликтам библиотек и проблемам безопасности. Современный JavaScript предлагает множество безопасных альтернатив: утилитарные функции, классы, композицию и модули. Использование этих подходов делает код более предсказуемым, безопасным и совместимым.',
        },
        {
          id: 'resources-59',
          type: 'resources',
          items: [
            {
              id: 'link-60',
              label: 'MDN: Prototype Chain',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
            },
          ],
        },
        {
          id: 'resources-61',
          type: 'resources',
          items: [
            {
              id: 'link-62',
              label: 'ESLint: no-extend-native',
              url: 'https://eslint.org/docs/rules/no-extend-native',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
