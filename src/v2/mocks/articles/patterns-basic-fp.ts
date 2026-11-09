import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-basic-fp-imperativesnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-basic-fp-declarativesnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-basic-fp-purefunctionssnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-basic-fp-immutabilitysnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-basic-fp-higherordersnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-basic-fp-compositionsnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-basic-fp-curryingsnippet.txt?raw'
import example8 from '../snippets/patterns/patterns-basic-fp-practicalexamplesnippet.txt?raw'
import example9 from '../snippets/patterns/patterns-basic-fp-functorsmonadssnippet.txt?raw'

// Content copied verbatim from src/views/patterns/BasicFP.vue.
export default {
  ...articleSummaries.patternsBasicFP,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Функциональное программирование (FP)** — это парадигма программирования, которая рассматривает вычисления как применение математических функций и избегает изменения состояния и мутабельных данных. В JavaScript FP широко используется благодаря поддержке функций первого класса.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные принципы FP',
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
                  text: 'Чистые функции',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Одинаковый вход → одинаковый выход. Нет побочных эффектов.',
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
                  text: 'Иммутабельность',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Данные не изменяются после создания. Создаются новые копии.',
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
                  text: 'Декларативность',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Описываем ЧТО делать, а не КАК это делать.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Императивный vs Декларативный подход',
      blocks: [
        {
          id: 'cards-12',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-13',
              title: '❌ Императивный (КАК)',
              blocks: [
                {
                  id: 'code-14',
                  type: 'code',
                  language: 'javascript',
                  code: example1,
                },
              ],
            },
            {
              id: 'card-15',
              title: '✅ Декларативный (ЧТО)',
              blocks: [
                {
                  id: 'code-16',
                  type: 'code',
                  language: 'javascript',
                  code: example2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: '1. Чистые функции (Pure Functions)',
      blocks: [
        {
          id: 'callout-17',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-18',
              type: 'prose',
              markdown:
                '**Чистая функция:** Детерминированная (одинаковый вход → одинаковый выход) и не имеет побочных эффектов',
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
      title: '2. Иммутабельность (Immutability)',
      blocks: [
        {
          id: 'callout-20',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-21',
              type: 'prose',
              markdown:
                '**Принцип:** Вместо изменения существующих данных создавайте новые структуры',
            },
          ],
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: '3. Функции высшего порядка (Higher-Order Functions)',
      blocks: [
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            'Функции, которые принимают другие функции как аргументы или возвращают функции как результат.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: '4. Композиция функций (Function Composition)',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown: 'Создание сложных функций путем комбинирования простых функций.',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: '5. Каррирование (Currying)',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown:
            'Преобразование функции с множеством аргументов в последовательность функций с одним аргументом.',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практический пример: Обработка данных',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: '6. Функторы и монады (упрощенно)',
      blocks: [
        {
          id: 'text-30',
          type: 'prose',
          markdown: 'Продвинутые концепции FP для работы с контекстами и обработки ошибок.',
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Преимущества FP',
      blocks: [
        {
          id: 'table-32',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Преимущество',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Предсказуемость**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Чистые функции всегда дают одинаковый результат',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Легче тестировать и отлаживать',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Переиспользуемость**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Маленькие функции легко комбинировать',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Композиция и pipe',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Читаемость**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Декларативный код описывает намерения',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'map/filter вместо циклов',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Параллелизм**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Иммутабельные данные безопасны для многопоточности',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Нет race conditions',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '**Отладка**',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Нет побочных эффектов = проще найти баги',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Функции можно тестировать изолированно',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Недостатки и ограничения',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-49',
              title: '⚠️ Сложности',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Высокий порог входа\n- Производительность при глубоком копировании\n- Больше памяти для иммутабельных структур\n- Не всё подходит под FP парадигму',
                },
              ],
            },
            {
              id: 'card-51',
              title: '💡 Решения',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- Постепенное внедрение концепций\n- Structural sharing (Immutable.js)\n- Оптимизации компилятора\n- Гибридный подход (FP \\+ OOP)',
                },
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
          id: 'text-53',
          type: 'prose',
          markdown:
            '1. **Что делает функцию чистой?**\n   \n   Чистая функция: (1) детерминированная \\- одинаковый вход дает одинаковый выход, (2) без побочных эффектов \\- не изменяет внешнее состояние, не взаимодействует с внешним миром.\n2. **В чем разница между map и forEach?**\n   \n   map \\- чистая функция, возвращает новый массив, не мутирует оригинал. forEach \\- для побочных эффектов, не возвращает значение, императивный подход.\n3. **Зачем нужна иммутабельность?**\n   \n   Предсказуемость, безопасность при многопоточности, упрощение отладки, возможность использования time\\-travel debugging, оптимизации в React (shallow comparison).\n4. **Что такое каррирование и зачем оно нужно?**\n   \n   Каррирование \\- преобразование функции с несколькими аргументами в последовательность функций с одним аргументом. Полезно для частичного применения и создания специализированных функций.\n5. **Чем отличается compose от pipe?**\n   \n   compose выполняет функции справа налево (как в математике), pipe \\- слева направо (как Unix pipes). Результат одинаковый, разница в порядке чтения.\n6. **Можно ли использовать FP в production?**\n   \n   Да! Библиотеки как Ramda, Lodash/FP, React (hooks), Redux \\- все используют FP принципы. Важно найти баланс между FP и практичностью для конкретной задачи.',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Библиотеки для FP в JavaScript',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-55',
              title: 'Ramda',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown: 'Функциональная библиотека с автоматическим каррированием',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '- Чистые функции\n- Иммутабельность\n- Композиция',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'Lodash/FP',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: 'FP версия популярной утилитарной библиотеки',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown: '- Каррирование\n- Иммутабельные операции\n- Композиция',
                },
              ],
            },
            {
              id: 'card-61',
              title: 'Immutable.js',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: 'Персистентные иммутабельные структуры данных',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown: '- Structural sharing\n- Производительность\n- Typed Records',
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
          id: 'cards-64',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-65',
              blocks: [
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- Писать чистые функции\n- Избегать мутаций\n- Использовать map/filter/reduce\n- Применять композицию\n- Предпочитать const\n- Делать функции маленькими',
                },
              ],
            },
            {
              id: 'card-68',
              blocks: [
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Побочных эффектов без причины\n- Изменения аргументов\n- Глобальных переменных\n- Императивных циклов для трансформаций\n- Длинных функций\n- Смешивания логики и эффектов',
                },
              ],
            },
            {
              id: 'card-71',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Начинайте с простых концепций\n- Используйте TypeScript для типизации\n- Тестируйте чистые функции\n- Изучайте паттерны (Maybe, Either)\n- Читайте код библиотек\n- Балансируйте прагматизм и чистоту',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-74',
          type: 'prose',
          markdown:
            '**Функциональное программирование** в JavaScript \\- это набор принципов и техник: чистые функции, иммутабельность, композиция, функции высшего порядка. FP делает код более предсказуемым, тестируемым и масштабируемым. Современный JavaScript (особенно React и Redux) активно использует FP концепции. Главное \\- находить баланс между функциональной чистотой и практичностью решения задач.',
        },
        {
          id: 'resources-75',
          type: 'resources',
          items: [
            {
              id: 'link-76',
              label: 'Mostly Adequate Guide to FP',
              url: 'https://mostly-adequate.gitbook.io/mostly-adequate-guide',
            },
          ],
        },
        {
          id: 'resources-77',
          type: 'resources',
          items: [
            {
              id: 'link-78',
              label: 'Ramda.js',
              url: 'https://ramdajs.com/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
