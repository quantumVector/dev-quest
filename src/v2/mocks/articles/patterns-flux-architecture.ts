import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-flux-architecture-problemsnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-flux-architecture-fluxbasicssnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-flux-architecture-dataflowsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-flux-architecture-actioncreatorssnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-flux-architecture-multiplestoressnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-flux-architecture-reactintegrationsnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-flux-architecture-modernalternativessnippet.txt?raw'

// Content copied verbatim from src/views/patterns/FluxArchitecture.vue.
export default {
  ...articleSummaries.patternsFluxArchitecture,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Flux** — это архитектурный паттерн, разработанный Facebook для построения клиентских веб\\-приложений. Главная идея: **однонаправленный поток данных** (unidirectional data flow), который делает приложение более предсказуемым и легким в отладке.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Какую проблему решает Flux?',
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
                '**Проблема:** В традиционном MVC двунаправленный поток данных приводит к каскадным обновлениям и непредсказуемому поведению при росте приложения.',
            },
          ],
        },
        {
          id: 'cards-4',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-5',
              blocks: [
                {
                  id: 'heading-6',
                  type: 'heading',
                  level: 3,
                  text: 'Проблемы MVC',
                },
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown:
                    '- **Двунаправленный поток** — Model ↔ View\n- **Множественные источники правды**\n- **Каскадные обновления** — трудно отследить\n- **Сложная отладка** — откуда пришло изменение?\n- **Непредсказуемость** при масштабировании',
                },
              ],
            },
            {
              id: 'card-8',
              blocks: [
                {
                  id: 'heading-9',
                  type: 'heading',
                  level: 3,
                  text: 'Решение Flux',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown:
                    '- **Однонаправленный поток** — Action → Store → View\n- **Единственный источник правды** — Store\n- **Предсказуемые обновления**\n- **Простая отладка** — четкая цепочка событий\n- **Масштабируемость** — добавление функций проще',
                },
              ],
            },
          ],
        },
        {
          id: 'code-11',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основные компоненты Flux',
      blocks: [
        {
          id: 'cards-12',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: 'Action',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: 'Описывает ЧТО произошло. Простой объект с `type` и `payload`.',
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
                  text: 'Dispatcher',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown: 'Центральный хаб. Рассылает все действия всем Store.',
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
                  text: 'Store',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: 'Хранит состояние и бизнес\\-логику. Единственный источник правды.',
                },
              ],
            },
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'View',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: 'Отображает данные. Создает действия в ответ на пользовательский ввод.',
                },
              ],
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Однонаправленный поток данных',
      blocks: [
        {
          id: 'callout-26',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-27',
              type: 'prose',
              markdown:
                '**Ключевая особенность:** Данные движутся только в одном направлении: Action → Dispatcher → Store → View → Action (по кругу)',
            },
          ],
        },
        {
          id: 'cards-28',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-29',
              title: 'Схема потока данных в Flux',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown: 'User Action',
                },
                {
                  id: 'text-31',
                  type: 'prose',
                  markdown: 'Action Creator',
                },
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown: 'Dispatcher',
                },
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown: 'Store(s)',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown: 'View (React)',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown: 'Цикл повторяется при новых действиях пользователя',
                },
              ],
            },
          ],
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Action Creators',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown:
            'Action Creators — это функции\\-помощники, которые создают объекты действий. Они инкапсулируют создание действий и делают код более читаемым.',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Множественные Store и зависимости',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            'В Flux может быть несколько Store, каждый отвечает за свою часть состояния. Метод `waitFor()` позволяет координировать обновления между Store.',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Интеграция с React',
      blocks: [
        {
          id: 'text-41',
          type: 'prose',
          markdown:
            'Flux отлично работает с React. Container компоненты подключаются к Store, Presentational компоненты отвечают только за отображение.',
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Flux vs MVC — ключевые отличия',
      blocks: [
        {
          id: 'table-43',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'MVC',
            },
            {
              id: 'column-3',
              label: 'Flux',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**Поток данных**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Двунаправленный (Model ↔ View)',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Однонаправленный (Action → Store → View)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Источник правды**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Множественные Model',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Store — единственный источник',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Изменение состояния**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Model и View могут менять друг друга',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Только через Action и Store',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Предсказуемость**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Сложно при росте приложения',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Высокая благодаря четкому потоку',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Отладка**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Сложно отследить источник изменения',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Легко через лог действий',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Тестирование**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Требует моков для взаимосвязей',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Store легко тестируются изолированно',
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
      title: 'Преимущества и недостатки Flux',
      blocks: [
        {
          id: 'cards-62',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: 'Преимущества',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- **Предсказуемость** — четкий поток данных\n- **Отладка** — легко отследить изменения\n- **Масштабируемость** — легко добавлять функции\n- **Тестируемость** — изолированные Store\n- **Time\\-travel** — возможность "отмотать" состояние\n- **Единственный источник правды**',
                },
              ],
            },
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: 'Недостатки',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- **Многословность** — много кода для простых операций\n- **Boilerplate** — повторяющийся код\n- **Сложность** — для новичков может быть сложно\n- **Оверинжениринг** — для маленьких приложений\n- **Синхронность** — нужны дополнительные паттерны для async\n- **Dispatcher** — дополнительный слой абстракции',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Современные альтернативы',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            'Flux вдохновил создание множества библиотек управления состоянием. Многие из них упрощают концепции Flux или добавляют новые возможности.',
        },
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            "1. **Что такое Flux и какую проблему он решает?**\n   \n   Flux — это архитектурный паттерн с однонаправленным потоком данных, разработанный Facebook. Он решает проблему непредсказуемого поведения в приложениях с двунаправленным потоком данных (MVC), делая изменения состояния предсказуемыми и легко отслеживаемыми.\n2. **Как осуществляется передача данных в Flux?**\n   \n   Данные движутся по кругу: View создает Action → Action отправляется в Dispatcher → Dispatcher рассылает Action всем Store → Store обновляют состояние → Store уведомляют View → View перерисовывается. Это однонаправленный цикл.\n3. **Что такое Dispatcher и зачем он нужен?**\n   \n   Dispatcher — центральный хаб для всех действий в приложении. Он регистрирует Store, рассылает все действия всем Store и управляет порядком выполнения через `waitFor()`. Это обеспечивает предсказуемость и координацию между Store.\n4. **В чем разница между Flux и Redux?**\n   \n   Redux упрощает Flux: один Store вместо множества, reducer'ы вместо Dispatcher, иммутабельные обновления, middleware для async операций. Redux более функциональный и менее многословный.\n5. **Как обрабатывать асинхронные операции в Flux?**\n   \n   В чистом Flux — через Action Creators, которые отправляют несколько действий (START, SUCCESS, ERROR). Можно использовать Promise\\-based или thunk\\-подобные паттерны. Также существуют middleware решения.\n6. **Когда НЕ стоит использовать Flux?**\n   \n   Для маленьких приложений с простым состоянием, прототипов, статических сайтов, простых форм. Flux добавляет сложность, которая оправдана только в средних и больших приложениях со сложным состоянием и множественными источниками обновлений.",
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Держать Store неизменяемыми\n- Использовать Action Constants\n- Создавать Action Creators для каждого действия\n- Разделять Container и Presentational компоненты\n- Логировать все действия для отладки\n- Тестировать Store изолированно',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Мутации состояния напрямую в Store\n- Обращение к Store напрямую из View\n- Логику в Action Creators\n- Множество мелких действий (группировать)\n- Циклических зависимостей между Store\n- Игнорирование waitFor() при зависимостях',
                },
              ],
            },
            {
              id: 'card-79',
              blocks: [
                {
                  id: 'heading-80',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Используйте Redux DevTools для отладки\n- Рассмотрите Redux вместо чистого Flux\n- Применяйте TypeScript для типизации действий\n- Документируйте структуру Store\n- Начинайте с простого, усложняйте по необходимости\n- Изучайте современные альтернативы (Zustand, Jotai)',
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
          id: 'text-82',
          type: 'prose',
          markdown:
            '**Flux** — это архитектурный паттерн с **однонаправленным потоком данных**, который решает проблему непредсказуемости в приложениях с двунаправленным потоком (MVC). Основные компоненты: **Action** (что произошло), **Dispatcher** (центральный хаб), **Store** (состояние и логика), **View** (отображение). Поток данных: Action → Dispatcher → Store → View → Action. Flux вдохновил создание Redux, MobX и других современных решений для управления состоянием.',
        },
        {
          id: 'resources-83',
          type: 'resources',
          items: [
            {
              id: 'link-84',
              label: 'Официальная документация Flux',
              url: 'https://facebook.github.io/flux/',
            },
          ],
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'GitHub Flux',
              url: 'https://github.com/facebook/flux',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
