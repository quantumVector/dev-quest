import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-behavioral-patterns-observersnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-behavioral-patterns-strategysnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-behavioral-patterns-commandsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-behavioral-patterns-mediatorsnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-behavioral-patterns-statesnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-behavioral-patterns-chainofresponsibilitysnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-behavioral-patterns-templatemethodsnippet.txt?raw'
import example8 from '../snippets/patterns/patterns-behavioral-patterns-iteratorsnippet.txt?raw'
import example9 from '../snippets/patterns/patterns-behavioral-patterns-mementosnippet.txt?raw'

// Content copied verbatim from src/views/patterns/BehavioralPatterns.vue.
export default {
  ...articleSummaries.patternsBehavioralPatterns,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Поведенческие паттерны** определяют взаимодействие между объектами, распределение обязанностей и алгоритмы. Они помогают организовать эффективную коммуникацию и управление поведением объектов. В фронтенде эти паттерны особенно полезны для управления состоянием, событиями и пользовательским взаимодействием.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные поведенческие паттерны',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Паттерн',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Применение во фронтенде',
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
                    markdown: '**Observer**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Подписка на изменения объекта',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'React hooks, Vue reactivity, Event emitters',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '**Strategy**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Взаимозаменяемые алгоритмы',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Сортировка, валидация, форматирование',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Command**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Инкапсуляция действий',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Undo/Redo, макросы, отложенные операции',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Mediator**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Централизованное взаимодействие',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Формы, модальные окна, компоненты',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**State**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Изменение поведения по состоянию',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'UI состояния, конечные автоматы',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Chain of Responsibility**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Цепочка обработчиков',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Middleware, валидация, обработка событий',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Template Method**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Шаблон алгоритма с хуками',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Lifecycle hooks, базовые компоненты',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Iterator**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Последовательный доступ к элементам',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Обход коллекций, пагинация, виртуализация',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Memento**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Сохранение и восстановление состояния',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'История изменений, Undo/Redo, снимки',
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
      title: '1. Observer — Подписка на изменения',
      blocks: [
        {
          id: 'text-30',
          type: 'prose',
          markdown:
            'Определяет зависимость "один\\-ко\\-многим" между объектами: когда один объект изменяется, все зависимые объекты уведомляются автоматически. Основа реактивности в современных фреймворках.',
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Strategy — Взаимозаменяемые алгоритмы',
      blocks: [
        {
          id: 'text-32',
          type: 'prose',
          markdown:
            'Определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми. Позволяет изменять алгоритмы независимо от клиентов, которые их используют.',
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Command — Инкапсуляция действий',
      blocks: [
        {
          id: 'text-34',
          type: 'prose',
          markdown:
            'Превращает запросы в объекты, позволяя параметризовать клиентов с различными запросами, ставить запросы в очередь, логировать их и поддерживать отмену операций.',
        },
        {
          id: 'code-35',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Mediator — Централизованное взаимодействие',
      blocks: [
        {
          id: 'text-36',
          type: 'prose',
          markdown:
            'Определяет объект, инкапсулирующий взаимодействие множества объектов. Способствует слабой связанности, избавляя объекты от необходимости ссылаться друг на друга.',
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. State — Изменение поведения по состоянию',
      blocks: [
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            'Позволяет объекту изменять свое поведение в зависимости от внутреннего состояния. При этом создается впечатление, что изменился класс объекта.',
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Chain of Responsibility — Цепочка обработчиков',
      blocks: [
        {
          id: 'text-40',
          type: 'prose',
          markdown:
            'Позволяет избежать привязки отправителя запроса к его получателю, давая шанс обработать запрос нескольким объектам. Связывает объекты\\-получатели в цепочку и передает запрос по цепочке, пока какой\\-то объект его не обработает.',
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Template Method — Шаблон алгоритма',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            'Определяет скелет алгоритма в методе, оставляя некоторые шаги подклассам. Позволяет подклассам переопределять отдельные шаги алгоритма, не изменяя его структуру.',
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: '8. Iterator — Обход коллекции',
      blocks: [
        {
          id: 'text-44',
          type: 'prose',
          markdown:
            'Предоставляет способ последовательного доступа ко всем элементам составного объекта, не раскрывая его внутреннего представления. Особенно полезен для кастомных структур данных.',
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: '9. Memento — Сохранение состояния',
      blocks: [
        {
          id: 'text-46',
          type: 'prose',
          markdown:
            'Фиксирует и выносит за пределы объекта его внутреннее состояние так, чтобы позднее можно было восстановить объект в этом состоянии, не нарушая инкапсуляции.',
        },
        {
          id: 'code-47',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Сравнение паттернов',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-49',
              title: 'Управление состоянием',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- **Observer:** Уведомление об изменениях\n- **State:** Изменение поведения\n- **Memento:** Сохранение/восстановление\n- **Command:** История операций',
                },
              ],
            },
            {
              id: 'card-51',
              title: 'Организация логики',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- **Strategy:** Семейство алгоритмов\n- **Template Method:** Шаблон с хуками\n- **Chain:** Цепочка обработчиков\n- **Mediator:** Централизация взаимодействия',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Применение во фронтенд фреймворках',
      blocks: [
        {
          id: 'table-53',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Паттерн',
            },
            {
              id: 'column-2',
              label: 'React',
            },
            {
              id: 'column-3',
              label: 'Vue',
            },
            {
              id: 'column-4',
              label: 'Angular',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '**Observer**',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'useState, useEffect, Context',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'ref, reactive, watch',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'RxJS Observables',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '**Strategy**',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Props, Custom Hooks',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Composables, Props',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Services, Dependency Injection',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Command**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'useReducer actions',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Vuex/Pinia actions',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'NgRx actions',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '**Mediator**',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Context, State managers',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Provide/Inject',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Services',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '**State**',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'useState, useReducer',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'ref, reactive',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Component state',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '**Template Method**',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Lifecycle hooks',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Lifecycle hooks',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Lifecycle hooks',
                  },
                ],
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
          id: 'text-78',
          type: 'prose',
          markdown:
            '1. **В чем разница между Observer и Pub/Sub?**\n   \n   Observer \\- прямая связь между Subject и Observers (Subject знает о своих подписчиках). Pub/Sub \\- есть посредник (Event Bus), издатель и подписчик не знают друг о друге. React Context ближе к Observer, Redux \\- к Pub/Sub.\n2. **Когда использовать Strategy вместо if/else?**\n   \n   Когда у вас 3\\+ варианта поведения, они могут добавляться/изменяться независимо, требуется возможность переключения в runtime, или нужна тестируемость каждого алгоритма отдельно.\n3. **Как Command паттерн помогает с Undo/Redo?**\n   \n   Каждое действие инкапсулируется в команду с методами execute() и undo(). CommandManager хранит историю выполненных команд и может откатывать/повторять их. Это позволяет легко реализовать историю изменений в редакторах.\n4. **Зачем нужен Mediator, если есть Context API?**\n   \n   Mediator \\- более специализированный паттерн для управления сложным взаимодействием между компонентами (формы, валидация с зависимостями). Context API \\- для передачи данных. Mediator часто используется внутри логики, Context \\- для пропсов.\n5. **Чем State паттерн отличается от state в React?**\n   \n   State паттерн \\- объектно\\-ориентированный подход к изменению поведения через состояния. React state \\- данные компонента. State паттерн полезен для конечных автоматов (FSM), когда поведение сильно зависит от состояния (плеер, форма с этапами).\n6. **Как Chain of Responsibility используется в middleware?**\n   \n   В Redux, Express, Koa каждый middleware \\- обработчик в цепочке. Получает запрос, обрабатывает его часть (логирование, авторизация, валидация) и передает дальше через next(). Может прервать цепочку или изменить данные.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-79',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-80',
              blocks: [
                {
                  id: 'heading-81',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- Observer для реактивности\n- Strategy для алгоритмов\n- Command для Undo/Redo\n- Mediator для сложных форм\n- Chain для middleware\n- Iterator для кастомных коллекций',
                },
              ],
            },
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Overengineering для простых задач\n- State паттерн вместо простого useState\n- Command для каждого действия\n- Слишком длинные цепочки\n- Mediator в маленьких компонентах\n- Множество Observer на одно событие',
                },
              ],
            },
            {
              id: 'card-86',
              blocks: [
                {
                  id: 'heading-87',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Комбинируйте паттерны\n- Используйте встроенные механизмы фреймворков\n- Документируйте сложные паттерны\n- Тестируйте каждый паттерн отдельно\n- Следите за производительностью\n- Refactor по мере усложнения',
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
          id: 'text-89',
          type: 'prose',
          markdown:
            '**Поведенческие паттерны** критически важны для фронтенд\\-разработки. **Observer** лежит в основе реактивности React/Vue. **Strategy** помогает организовать алгоритмы (сортировка, валидация). **Command** необходим для Undo/Redo. **Mediator** упрощает сложные формы. **State** отлично подходит для конечных автоматов. **Chain of Responsibility** \\- основа middleware. Понимание этих паттернов делает код более гибким, тестируемым и масштабируемым.',
        },
        {
          id: 'resources-90',
          type: 'resources',
          items: [
            {
              id: 'link-91',
              label: 'Refactoring Guru',
              url: 'https://refactoring.guru/design-patterns/behavioral-patterns',
            },
          ],
        },
        {
          id: 'resources-92',
          type: 'resources',
          items: [
            {
              id: 'link-93',
              label: 'Patterns.dev',
              url: 'https://www.patterns.dev/posts',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
