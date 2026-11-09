import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-mvc-mvp-mvvm-mvcsnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-mvc-mvp-mvvm-mvpsnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-mvc-mvp-mvvm-mvvmsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-mvc-mvp-mvvm-reactmvvmsnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-mvc-mvp-mvvm-comparisonsnippet.txt?raw'

// Content copied verbatim from src/views/patterns/MvcMvpMvvm.vue.
export default {
  ...articleSummaries.patternsMvcMvpMvvm,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**MVC, MVP и MVVM** — это архитектурные паттерны разделения ответственности в пользовательских интерфейсах. Они определяют, как организована коммуникация между данными (Model), отображением (View) и логикой (Controller/Presenter/ViewModel). Выбор паттерна зависит от сложности приложения, используемого фреймворка и требований к тестируемости.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные различия',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'MVC',
            },
            {
              id: 'column-3',
              label: 'MVP',
            },
            {
              id: 'column-4',
              label: 'MVVM',
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
                    markdown: '**View знает о Model?**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Да, может читать',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Нет, полностью изолирован',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Нет, через ViewModel',
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
                    markdown: '**Связь View ↔ Logic**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'View → Controller',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'View ↔ Presenter (1:1)',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'View ⟷ ViewModel (data binding)',
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
                    markdown: '**Логика в View**',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Возможна',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Минимальна',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Отсутствует',
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
                    markdown: '**Тестируемость**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Сложность**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**Реактивность**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Ручная',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Ручная',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Автоматическая',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Типичные фреймворки**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Express, Ruby on Rails, Spring',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Android (legacy), WinForms',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Vue, React, Angular, Svelte',
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
      title: 'MVC — Model-View-Controller',
      blocks: [
        {
          id: 'cards-31',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-32',
              blocks: [
                {
                  id: 'heading-33',
                  type: 'heading',
                  level: 3,
                  text: 'Model',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Бизнес\\-логика\n- Данные приложения\n- Правила валидации\n- Работа с API/DB',
                },
              ],
            },
            {
              id: 'card-35',
              blocks: [
                {
                  id: 'heading-36',
                  type: 'heading',
                  level: 3,
                  text: 'View',
                },
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown:
                    '- Отображение данных\n- UI элементы\n- Может читать Model\n- Отправляет события Controller',
                },
              ],
            },
            {
              id: 'card-38',
              blocks: [
                {
                  id: 'heading-39',
                  type: 'heading',
                  level: 3,
                  text: 'Controller',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown:
                    '- Обработка событий\n- Обновление Model\n- Выбор View\n- Координация потока',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-41',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-42',
              type: 'prose',
              markdown:
                '**Ключевая особенность MVC:** View может напрямую читать данные из Model, а Controller координирует взаимодействие.',
            },
          ],
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'MVP — Model-View-Presenter',
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
                  text: 'Model',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- Чистые данные\n- Без UI логики\n- Не знает о View\n- Бизнес\\-правила',
                },
              ],
            },
            {
              id: 'card-48',
              blocks: [
                {
                  id: 'heading-49',
                  type: 'heading',
                  level: 3,
                  text: 'View',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- Пассивное отображение\n- Интерфейс для Presenter\n- НЕ знает о Model\n- Только UI',
                },
              ],
            },
            {
              id: 'card-51',
              blocks: [
                {
                  id: 'heading-52',
                  type: 'heading',
                  level: 3,
                  text: 'Presenter',
                },
                {
                  id: 'text-53',
                  type: 'prose',
                  markdown:
                    '- ВСЯ логика взаимодействия\n- 1:1 связь с View\n- Управляет Model и View\n- Легко тестируется',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-54',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-55',
              type: 'prose',
              markdown:
                '**Главное преимущество MVP:** Полная изоляция View от Model через Presenter. View становится максимально "тупым" — только отображение.',
            },
          ],
        },
        {
          id: 'code-56',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'MVVM — Model-View-ViewModel',
      blocks: [
        {
          id: 'cards-57',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: 'Model',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Данные \\+ логика\n- Независим от UI\n- Переиспользуемый\n- Бизнес\\-слой',
                },
              ],
            },
            {
              id: 'card-61',
              blocks: [
                {
                  id: 'heading-62',
                  type: 'heading',
                  level: 3,
                  text: 'View',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Декларативная разметка\n- Data binding\n- Без логики\n- Автообновление',
                },
              ],
            },
            {
              id: 'card-64',
              blocks: [
                {
                  id: 'heading-65',
                  type: 'heading',
                  level: 3,
                  text: 'ViewModel',
                },
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Состояние для View\n- Команды\n- Computed properties\n- Реактивность',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-67',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-68',
              type: 'prose',
              markdown:
                '**Суперсила MVVM:** Двусторонняя привязка данных (data binding) — изменения в ViewModel автоматически отражаются в View и наоборот.',
            },
          ],
        },
        {
          id: 'code-69',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'MVVM в современных фреймворках',
      blocks: [
        {
          id: 'code-70',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение на одном примере',
      blocks: [
        {
          id: 'code-71',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Как выбрать паттерн для проекта?',
      blocks: [
        {
          id: 'cards-72',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-73',
              title: 'Выбирайте MVC',
              blocks: [
                {
                  id: 'text-74',
                  type: 'prose',
                  markdown:
                    '- **Server\\-side rendering**\n- Простые CRUD приложения\n- Традиционные веб\\-приложения\n- Быстрый прототип\n- Малая команда\n- Ruby on Rails, Django, Laravel',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '**Когда избегать:** сложный UI, много взаимодействий, нужна высокая тестируемость',
                },
              ],
            },
            {
              id: 'card-76',
              title: 'Выбирайте MVP',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- **Максимальная тестируемость**\n- Сложная бизнес\\-логика\n- Desktop приложения\n- Android (без Jetpack)\n- Legacy системы\n- Четкое разделение ответственности',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '**Когда избегать:** нужна реактивность, много состояния, динамический UI',
                },
              ],
            },
            {
              id: 'card-79',
              title: 'Выбирайте MVVM',
              blocks: [
                {
                  id: 'text-80',
                  type: 'prose',
                  markdown:
                    '- **Реактивный UI**\n- SPA приложения\n- Сложное состояние\n- Real\\-time обновления\n- Vue, React, Angular, Svelte\n- Современные веб\\-приложения',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '**Когда избегать:** простые статичные страницы, SEO\\-критично без SSR',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Факторы выбора архитектуры',
      blocks: [
        {
          id: 'accordion-82',
          type: 'accordion',
          items: [
            {
              id: 'question-83',
              title: '**1. Сложность UI и взаимодействий**',
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- **Простой UI:** MVC достаточно (статичные страницы, формы)\n- **Средняя сложность:** MVP (много форм, валидация, бизнес\\-логика)\n- **Высокая сложность:** MVVM (real\\-time, много состояния, сложные взаимодействия)',
                },
              ],
            },
            {
              id: 'question-85',
              title: '**2. Требования к тестируемости**',
              blocks: [
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- **MVC:** View и Controller сложно тестировать отдельно\n- **MVP:** Presenter легко тестируется без UI (mock View)\n- **MVVM:** ViewModel легко тестируется без View\n- **Вывод:** Если критична тестируемость → MVP или MVVM',
                },
              ],
            },
            {
              id: 'question-87',
              title: '**3. Платформа и фреймворк**',
              blocks: [
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- **Web SPA:** MVVM (Vue, React, Angular, Svelte)\n- **Server\\-side rendering:** MVC (Rails, Django, Express)\n- **Android:** MVP (legacy) или MVVM (Jetpack Compose)\n- **iOS:** MVVM (SwiftUI) или MVP (UIKit)\n- **Desktop:** MVP или MVVM (WPF, Electron)',
                },
              ],
            },
            {
              id: 'question-89',
              title: '**4. Размер команды и опыт**',
              blocks: [
                {
                  id: 'text-90',
                  type: 'prose',
                  markdown:
                    '- **Малая команда/стартап:** MVC (быстрее старт)\n- **Средняя команда:** MVP или MVVM (лучше масштабируется)\n- **Большая команда:** MVVM (четкое разделение, параллельная работа)\n- **Junior\\-разработчики:** MVC (проще освоить)\n- **Senior\\-разработчики:** MVP/MVVM (больше контроля)',
                },
              ],
            },
            {
              id: 'question-91',
              title: '**5. Производительность и оптимизация**',
              blocks: [
                {
                  id: 'text-92',
                  type: 'prose',
                  markdown:
                    '- **MVC:** Меньше overhead, прямая связь View\\-Model\n- **MVP:** Дополнительный слой (Presenter), но изоляция\n- **MVVM:** Реактивность может быть дороже, но оптимизируемо\n- **Совет:** Для высоконагруженных UI оптимизируйте реактивность в MVVM',
                },
              ],
            },
            {
              id: 'question-93',
              title: '**6. Поддержка и развитие**',
              blocks: [
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- **Краткосрочный проект:** MVC (быстрее разработка)\n- **Долгосрочная поддержка:** MVP/MVVM (лучше структура)\n- **Частые изменения UI:** MVVM (легче изменять View)\n- **Стабильный UI:** MVP (надежная изоляция)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Практические рекомендации',
      blocks: [
        {
          id: 'table-95',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Рекомендуемый паттерн',
            },
            {
              id: 'column-3',
              label: 'Обоснование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: '**Админ\\-панель**',
                  },
                ],
                [
                  {
                    id: 'text-97',
                    type: 'prose',
                    markdown: 'MVVM',
                  },
                ],
                [
                  {
                    id: 'text-98',
                    type: 'prose',
                    markdown: 'Много форм, таблиц, фильтров — нужна реактивность',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-99',
                    type: 'prose',
                    markdown: '**Блог/Landing**',
                  },
                ],
                [
                  {
                    id: 'text-100',
                    type: 'prose',
                    markdown: 'MVC',
                  },
                ],
                [
                  {
                    id: 'text-101',
                    type: 'prose',
                    markdown: 'Простой UI, SSR для SEO',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-102',
                    type: 'prose',
                    markdown: '**E\\-commerce**',
                  },
                ],
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: 'MVVM',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: 'Корзина, фильтры, поиск — сложное состояние',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: '**Mobile приложение**',
                  },
                ],
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: 'MVP или MVVM',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: 'Зависит от платформы (Android/iOS)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: '**Real\\-time дашборд**',
                  },
                ],
                [
                  {
                    id: 'text-109',
                    type: 'prose',
                    markdown: 'MVVM',
                  },
                ],
                [
                  {
                    id: 'text-110',
                    type: 'prose',
                    markdown: 'Постоянные обновления данных',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-111',
                    type: 'prose',
                    markdown: '**Desktop приложение**',
                  },
                ],
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: 'MVP',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: 'Сложная бизнес\\-логика, тестируемость',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-114',
          type: 'prose',
          markdown:
            '1. **В чем главное отличие MVC от MVP?**\n   \n   В MVC View может напрямую читать данные из Model, а Controller координирует. В MVP View полностью изолирован от Model — все взаимодействие идет через Presenter, который явно управляет отображением данных в View.\n2. **Чем MVVM отличается от MVP?**\n   \n   В MVP связь View\\-Presenter 1:1 и явная (методы вызываются напрямую). В MVVM связь через data binding — View автоматически реагирует на изменения ViewModel через реактивную систему, без явных вызовов методов обновления.\n3. **Какой паттерн используют React, Vue, Angular?**\n   \n   Все три используют MVVM: компонент (View), состояние (ViewModel), логика/API (Model). React hooks = ViewModel, Vue data/computed = ViewModel, Angular component = View\\+ViewModel.\n4. **Как тестировать каждый паттерн?**\n   \n   **MVC:** сложно — Controller зависит от View. **MVP:** легко — mock View, тестируем Presenter. **MVVM:** легко — тестируем ViewModel без View.\n5. **Можно ли комбинировать паттерны?**\n   \n   Да! Например, MVC на бэкенде \\+ MVVM на фронтенде. Или гибридный подход: MVVM для UI компонентов \\+ централизованный State Management (Redux = Model layer).\n6. **Что такое data binding в MVVM?**\n   \n   Автоматическая синхронизация View и ViewModel: изменение данных в ViewModel автоматически обновляет View, а изменение в View (input) обновляет ViewModel. Реализуется через Proxy, Observables, или виртуальный DOM.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Плюсы и минусы каждого паттерна',
      blocks: [
        {
          id: 'cards-115',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-116',
              title: 'MVC',
              blocks: [
                {
                  id: 'text-117',
                  type: 'prose',
                  markdown: '**✅ Плюсы:**',
                },
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    '- Простота понимания\n- Быстрая разработка\n- Хорошо для SSR\n- Меньше кода',
                },
                {
                  id: 'text-119',
                  type: 'prose',
                  markdown: '**❌ Минусы:**',
                },
                {
                  id: 'text-120',
                  type: 'prose',
                  markdown:
                    '- View знает о Model\n- Сложно тестировать\n- Может стать "толстым" Controller\n- Нет четкой изоляции',
                },
              ],
            },
            {
              id: 'card-121',
              title: 'MVP',
              blocks: [
                {
                  id: 'text-122',
                  type: 'prose',
                  markdown: '**✅ Плюсы:**',
                },
                {
                  id: 'text-123',
                  type: 'prose',
                  markdown:
                    '- Полная изоляция View\n- Легко тестировать\n- Четкое разделение\n- Переиспользуемый Presenter',
                },
                {
                  id: 'text-124',
                  type: 'prose',
                  markdown: '**❌ Минусы:**',
                },
                {
                  id: 'text-125',
                  type: 'prose',
                  markdown:
                    '- Больше кода (boilerplate)\n- Ручное обновление View\n- 1:1 связь View\\-Presenter\n- Может быть избыточен',
                },
              ],
            },
            {
              id: 'card-126',
              title: 'MVVM',
              blocks: [
                {
                  id: 'text-127',
                  type: 'prose',
                  markdown: '**✅ Плюсы:**',
                },
                {
                  id: 'text-128',
                  type: 'prose',
                  markdown:
                    '- Автоматическая синхронизация\n- Реактивность\n- Легко тестировать ViewModel\n- Декларативный View',
                },
                {
                  id: 'text-129',
                  type: 'prose',
                  markdown: '**❌ Минусы:**',
                },
                {
                  id: 'text-130',
                  type: 'prose',
                  markdown:
                    '- Сложность (learning curve)\n- Overhead реактивности\n- Отладка binding может быть сложной\n- Требует фреймворк',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог: как принять решение?',
      blocks: [
        {
          id: 'cards-131',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-132',
              blocks: [
                {
                  id: 'heading-133',
                  type: 'heading',
                  level: 3,
                  text: 'Алгоритм выбора паттерна:',
                },
                {
                  id: 'text-134',
                  type: 'prose',
                  markdown:
                    '1. **Оцените сложность UI:** простой → MVC, средний → MVP, сложный → MVVM\n2. **Определите платформу:** Web SPA → MVVM, SSR → MVC, Desktop/Mobile → MVP/MVVM\n3. **Учтите тестируемость:** критична → MVP/MVVM, не критична → MVC\n4. **Проверьте требования:** реактивность нужна → MVVM, не нужна → MVC/MVP\n5. **Оцените команду:** большая → MVVM, малая → MVC, средняя → любой\n6. **Посмотрите на фреймворк:** React/Vue/Angular → MVVM по умолчанию',
                },
                {
                  id: 'text-135',
                  type: 'prose',
                  markdown: '**Главное правило:**',
                },
                {
                  id: 'text-136',
                  type: 'prose',
                  markdown:
                    'Выбирайте паттерн исходя из **конкретных требований проекта**, а не моды или личных предпочтений. Простое приложение не нуждается в сложной архитектуре, но сложное приложение развалится без правильной структуры.',
                },
              ],
            },
          ],
        },
        {
          id: 'resources-137',
          type: 'resources',
          items: [
            {
              id: 'link-138',
              label: 'Martin Fowler: GUI Architectures',
              url: 'https://martinfowler.com/eaaDev/uiArchs.html',
            },
          ],
        },
        {
          id: 'resources-139',
          type: 'resources',
          items: [
            {
              id: 'link-140',
              label: 'Microsoft: MVVM Pattern',
              url: 'https://learn.microsoft.com/en-us/dotnet/architecture/modernize-desktop/mvvm-pattern',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
