import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-functions-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-functions-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-functions-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-functions-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-functions-snippet5.txt?raw'
import example6 from '../snippets/javascript/js-functions-snippet6.txt?raw'
import example7 from '../snippets/javascript/js-functions-snippet7.txt?raw'
import example8 from '../snippets/javascript/js-functions-snippet8.txt?raw'
import example9 from '../snippets/javascript/js-functions-snippet9.txt?raw'
import example10 from '../snippets/javascript/js-functions-snippet10.txt?raw'

// Content copied verbatim from src/views/js/Functions.vue.
export default {
  ...articleSummaries.jsFunctions,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Функции** — это блоки кода, которые выполняют определенную задачу и могут быть вызваны многократно. Функции являются объектами первого класса в JavaScript, что означает, что их можно присваивать переменным, передавать как аргументы и возвращать из других функций.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Способы объявления функций',
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
      title: 'Сравнение способов объявления',
      blocks: [
        {
          id: 'table-3',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Способ',
            },
            {
              id: 'column-2',
              label: 'Hoisting',
            },
            {
              id: 'column-3',
              label: 'this',
            },
            {
              id: 'column-4',
              label: 'arguments',
            },
            {
              id: 'column-5',
              label: 'Конструктор',
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
                    markdown: '**Function Declaration**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '✅ Динамический',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '✅ Есть',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '✅ Можно',
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
                    markdown: '**Function Expression**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '✅ Динамический',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '✅ Есть',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '✅ Можно',
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
                    markdown: '**Arrow Functions**',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '❌ Лексический',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '❌ Нельзя',
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
      title: 'Параметры функций',
      blocks: [
        {
          id: 'code-19',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Замыкания (Closures)',
      blocks: [
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Контекст выполнения и this',
      blocks: [
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Функции высшего порядка',
      blocks: [
        {
          id: 'code-22',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Рекурсия',
      blocks: [
        {
          id: 'code-23',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Асинхронные функции',
      blocks: [
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Продвинутые концепции',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Генераторы и итераторы',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Ошибки и антипаттерны',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Основные концепции функций',
      blocks: [
        {
          id: 'cards-28',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-29',
              title: 'Чистые функции',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- Одинаковый результат для одинаковых входных данных\n- Без побочных эффектов\n- Предсказуемое поведение\n- Легче тестировать',
                },
              ],
            },
            {
              id: 'card-31',
              title: 'Область видимости',
              blocks: [
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- Глобальная область\n- Функциональная область\n- Блочная область (let/const)\n- Цепочка областей видимости',
                },
              ],
            },
            {
              id: 'card-33',
              title: 'Производительность',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Мемоизация\n- Throttling и Debouncing\n- Ленивые вычисления\n- Оптимизация хвостовой рекурсии',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Вопросы для собеседования',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            '1. **В чем разница между Function Declaration и Function Expression?**\n   \n   Function Declaration поднимается (hoisting) и может быть вызвана до объявления. Function Expression не поднимается и создается только при выполнении кода. Function Declaration создает именованную функцию в области видимости.\n2. **Объясните, что такое замыкание и приведите примеры использования.**\n   \n   Замыкание — это функция, которая имеет доступ к переменным из внешней области видимости даже после завершения выполнения внешней функции. Используется для создания приватных переменных, модулей, декораторов, каррирования.\n3. **Как работает this в различных контекстах?**\n   \n   В обычных функциях this определяется способом вызова. В стрелочных функциях this наследуется от окружающего контекста. В методах объекта this указывает на объект. В конструкторах this указывает на создаваемый экземпляр. call, apply, bind позволяют явно установить значение this.\n4. **Что такое функции высшего порядка?**\n   \n   Функции высшего порядка — это функции, которые принимают другие функции в качестве аргументов или возвращают функции. Примеры: map, filter, reduce, forEach. Позволяют создавать более абстрактный и переиспользуемый код. Основа функционального программирования.\n5. **В чем отличие между call, apply и bind?**\n   \n   call вызывает функцию с заданным this и аргументами по отдельности. apply вызывает функцию с заданным this и массивом аргументов. bind создает новую функцию с привязанным this, но не вызывает ее сразу. Все методы позволяют явно управлять контекстом выполнения.\n6. **Объясните разницу между стрелочными и обычными функциями.**\n   \n   Стрелочные функции имеют лексический this, не имеют своего arguments, не могут быть конструкторами, не поднимаются, имеют более краткий синтаксис. Обычные функции имеют динамический this, свой объект arguments, могут использоваться как конструкторы.\n7. **Что такое каррирование (currying)?**\n   \n   Каррирование — это преобразование функции с множественными аргументами в последовательность функций, каждая из которых принимает один аргумент. Позволяет создавать специализированные функции, упрощает частичное применение и композицию функций.\n8. **Что такое мемоизация и когда ее использовать?**\n   \n   Мемоизация — это техника кеширования результатов выполнения функций для избежания повторных вычислений. Используется для оптимизации чистых функций с дорогими вычислениями. Особенно эффективна для рекурсивных функций как fibonacci, факториал.\n9. **Объясните разницу между throttling и debouncing.**\n   \n   Throttling ограничивает частоту выполнения функции до определенного интервала. Debouncing откладывает выполнение функции до тех пор, пока не пройдет определенное время без новых вызовов. Throttling для scroll/resize событий, debouncing для поиска и валидации форм.\n10. **Что такое IIFE и зачем она нужна?**\n    \n    IIFE (Immediately Invoked Function Expression) — функция, которая выполняется сразу после объявления. Используется для создания изолированной области видимости, инициализации модулей, избежания загрязнения глобальной области видимости.\n11. **Как работают генераторы в JavaScript?**\n    \n    Генераторы — функции, которые можно приостанавливать и возобновлять с помощью yield. Возвращают итератор, позволяющий получать значения по требованию. Используются для создания итераторов, асинхронных операций, ленивых вычислений.\n12. **Что такое рекурсия и когда ее использовать?**\n    \n    Рекурсия — функция, которая вызывает саму себя. Должна иметь базовый случай для остановки. Используется для обработки древовидных структур, математических вычислений, задач типа "разделяй и властвуй". Может привести к переполнению стека при больших глубинах.\n13. **Объясните async/await и их отношение к промисам.**\n    \n    async/await — синтаксический сахар над промисами для более читаемого асинхронного кода. async функция всегда возвращает промис. await приостанавливает выполнение до разрешения промиса. Упрощает обработку ошибок с try/catch, избегает callback hell.\n14. **Что такое чистые функции и почему они важны?**\n    \n    Чистые функции возвращают одинаковый результат для одинаковых аргументов и не имеют побочных эффектов. Легче тестировать, отлаживать и оптимизировать. Предсказуемое поведение, возможность мемоизации, основа функционального программирования.\n15. **Как избежать создания слишком много глобальных переменных?**\n    \n    Использование модульных паттернов (IIFE, CommonJS, ES6 modules), namespace объектов, замыканий для создания приватной области видимости. Применение строгого режима (use strict), линтеров для контроля глобальных переменных.\n16. **Что такое композиция функций?**\n    \n    Композиция — объединение простых функций для создания более сложной функции. Результат одной функции становится аргументом другой. Способствует переиспользованию кода, модульности и функциональному программированию. Pipe и compose — основные операторы композиции.\n17. **Объясните hoisting для функций.**\n    \n    Function Declarations полностью поднимаются — можно вызывать до объявления. Function Expressions поднимается только объявление переменной, но не присвоение функции. let/const с функциями находятся в Temporal Dead Zone до инициализации.\n18. **Какие есть способы обработки ошибок в функциях?**\n    \n    try/catch для синхронного кода, .catch() для промисов, try/catch с async/await. Throw для создания собственных ошибок. Finally для кода, который должен выполниться в любом случае. Error boundary в React для обработки ошибок в компонентах.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Современные тенденции',
      blocks: [
        {
          id: 'cards-36',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-37',
              title: 'Функциональное программирование',
              blocks: [
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- Иммутабельность\n- Чистые функции\n- Композиция функций\n- Монады и функторы',
                },
              ],
            },
            {
              id: 'card-39',
              title: 'Современный синтаксис',
              blocks: [
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- Optional chaining (?.)\n- Nullish coalescing (??)\n- Pipeline operator (|&gt;)\n- Pattern matching',
                },
              ],
            },
            {
              id: 'card-41',
              title: 'Библиотеки и фреймворки',
              blocks: [
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown: '- Lodash/FP\n- Ramda\n- RxJS\n- Functional utilities',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Заключение',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown:
            'Функции в JavaScript — это мощный инструмент для создания модульного, переиспользуемого и поддерживаемого кода. Понимание различных способов объявления, областей видимости, замыканий, контекста выполнения и продвинутых концепций как мемоизация, каррирование и композиция критически важно для разработки качественных приложений. Современный JavaScript предлагает множество возможностей для работы с функциями — от стрелочных функций до генераторов и async/await.',
        },
        {
          id: 'resources-44',
          type: 'resources',
          items: [
            {
              id: 'link-45',
              label: 'MDN Functions Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
