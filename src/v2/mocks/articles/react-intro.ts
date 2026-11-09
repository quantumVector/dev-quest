import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-intro-basiccomponentsnippet.txt?raw'
import example2 from '../snippets/react/react-intro-virtualdomsnippet.txt?raw'
import example3 from '../snippets/react/react-intro-componenttypesnippet.txt?raw'
import example4 from '../snippets/react/react-intro-hookssnippet.txt?raw'
import example5 from '../snippets/react/react-intro-contextsnippet.txt?raw'
import example6 from '../snippets/react/react-intro-jsxsnippet.txt?raw'
import example7 from '../snippets/react/react-intro-performancesnippet.txt?raw'
import example8 from '../snippets/react/react-intro-ecosystemsnippet.txt?raw'

// Content copied verbatim from src/views/react/ReactIntro.vue.
export default {
  ...articleSummaries.reactIntro,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**React** — это JavaScript библиотека для создания пользовательских интерфейсов, разработанная компанией Meta (Facebook). React использует компонентный подход, декларативный стиль программирования и эффективный механизм обновления DOM через Virtual DOM. Это один из самых популярных инструментов для фронтенд\\-разработки в 2025 году.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое React?',
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
                  text: 'Основные факты',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Библиотека, не фреймворк** — фокус на View слое\n- **Создана Meta** в 2013 году\n- **Open Source** — MIT лицензия\n- **Используется** в Facebook, Instagram, Netflix, Airbnb\n- **Огромная экосистема** библиотек и инструментов',
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
                  text: 'Ключевые концепции',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Компоненты** — переиспользуемые UI блоки\n- **Virtual DOM** — эффективное обновление\n- **JSX** — синтаксис для описания UI\n- **Однонаправленный поток данных**\n- **Hooks** — функциональный подход к состоянию',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Простой пример React компонента',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Основные преимущества React',
      blocks: [
        {
          id: 'cards-10',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: '1. Производительность',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown:
                    'Virtual DOM минимизирует количество операций с реальным DOM, что делает обновления быстрыми и эффективными',
                },
              ],
            },
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: '2. Компонентность',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    'Разделение UI на независимые, переиспользуемые компоненты упрощает разработку и поддержку сложных приложений',
                },
              ],
            },
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: '3. Декларативность',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    'Описываете "что" должно быть на экране, а не "как" этого достичь. React сам обновляет UI при изменении данных',
                },
              ],
            },
            {
              id: 'card-20',
              blocks: [
                {
                  id: 'heading-21',
                  type: 'heading',
                  level: 3,
                  text: '4. JavaScript everywhere',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    'Вся логика на JavaScript, никаких специальных шаблонных языков. JSX — это просто синтаксический сахар',
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
                  text: '5. Огромное сообщество',
                },
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown:
                    'Миллионы разработчиков, тысячи библиотек, множество ресурсов для обучения и решения проблем',
                },
              ],
            },
            {
              id: 'card-26',
              blocks: [
                {
                  id: 'heading-27',
                  type: 'heading',
                  level: 3,
                  text: '6. Кроссплатформенность',
                },
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    'React Native позволяет использовать те же навыки для создания мобильных приложений на iOS и Android',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Virtual DOM — ключевая особенность',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown:
            '**Virtual DOM** — это облегченное представление реального DOM в памяти JavaScript. React создает виртуальное дерево, сравнивает его с предыдущей версией (diffing) и применяет только минимально необходимые изменения к реальному DOM (reconciliation).',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Типы компонентов',
      blocks: [
        {
          id: 'code-31',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'React Hooks — современный подход',
      blocks: [
        {
          id: 'text-32',
          type: 'prose',
          markdown:
            '**Hooks** (хуки) — это функции, которые позволяют "подключаться" к состоянию и жизненному циклу React из функциональных компонентов. Введены в React 16.8 (2019).',
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Основные хуки React',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Хук',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`useState`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Локальное состояние компонента',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'const \\[state, setState\\] = useState(initial)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`useEffect`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Побочные эффекты (API, подписки)',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'useEffect(() =&gt; { /\\* эффект \\*/ }, \\[deps\\])',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '`useContext`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Доступ к контексту',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'const value = useContext(Context)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '`useRef`',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Мутабельная ссылка, DOM элементы',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'const ref = useRef(initialValue)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '`useMemo`',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Мемоизация вычислений',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'const value = useMemo(() =&gt; compute(), \\[deps\\])',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '`useCallback`',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Мемоизация функций',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'const fn = useCallback(() =&gt; {}, \\[deps\\])',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '`useReducer`',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Сложное состояние (альтернатива useState)',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'const \\[state, dispatch\\] = useReducer(reducer, init)',
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
      title: 'Context API — управление глобальным состоянием',
      blocks: [
        {
          id: 'code-56',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'JSX — JavaScript XML',
      blocks: [
        {
          id: 'code-57',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Оптимизация производительности',
      blocks: [
        {
          id: 'code-58',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'React экосистема',
      blocks: [
        {
          id: 'code-59',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Сравнение React с другими решениями',
      blocks: [
        {
          id: 'table-60',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
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
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Тип**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Библиотека (View)',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Прогрессивный фреймворк',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Полноценный фреймворк',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '**Размер**',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '~42 KB (gzipped)',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '~34 KB',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '~167 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '**Кривая обучения**',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Средняя (JSX, концепции)',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Низкая (проще старт)',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Высокая (много концепций)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Производительность**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Высокая (Virtual DOM)',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Высокая (реактивность)',
                  },
                ],
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: 'Хорошая (change detection)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '**Экосистема**',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Огромная',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Большая',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Встроенная',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '**TypeScript**',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Отличная поддержка',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Хорошая поддержка',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Нативная поддержка',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '**Мобильная разработка**',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'React Native',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Capacitor, NativeScript',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Ionic, NativeScript',
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
          id: 'text-89',
          type: 'prose',
          markdown:
            '1. **Что такое Virtual DOM и как он работает?**\n   \n   Virtual DOM — это представление реального DOM в JavaScript объектах. React создает виртуальное дерево, при обновлении состояния сравнивает новое дерево со старым (diffing), вычисляет минимальный набор изменений и применяет их к реальному DOM (reconciliation). Это быстрее прямых манипуляций с DOM.\n2. **В чем разница между state и props?**\n   \n   **Props** (properties) — это данные, передаваемые от родителя к ребенку. Они иммутабельны внутри компонента. **State** — это внутреннее изменяемое состояние компонента. При изменении state компонент перерендеривается.\n3. **Что такое JSX и обязательно ли его использовать?**\n   \n   JSX — это синтаксическое расширение JavaScript, позволяющее писать HTML\\-подобный код в JavaScript. Он не обязателен — можно использовать React.createElement(), но JSX делает код более читаемым и поддерживается всеми современными инструментами сборки.\n4. **Что такое React Hooks и зачем они нужны?**\n   \n   Hooks — это функции, позволяющие использовать состояние и другие возможности React в функциональных компонентах. Они решают проблемы классовых компонентов: сложная логика жизненного цикла, проблемы с this, сложность переиспользования логики.\n5. **Как работает reconciliation в React?**\n   \n   Reconciliation — это процесс, при котором React определяет, какие части UI нужно обновить. React использует алгоритм diff, сравнивая новое и старое дерево компонентов. Ключевые оптимизации: сравнение по типу элемента, использование key для списков, предположение о стабильности дерева.\n6. **В чем разница между controlled и uncontrolled компонентами?**\n   \n   **Controlled** компоненты — состояние формы контролируется React через state. **Uncontrolled** — DOM сам управляет состоянием, React получает значения через refs. Controlled предпочтительнее для валидации, динамического поведения и единого источника правды.\n7. **Что такое keys в React и почему они важны?**\n   \n   Keys помогают React идентифицировать, какие элементы изменились, были добавлены или удалены в списках. Без keys React может неправильно обновлять компоненты или терять состояние. Keys должны быть стабильными, уникальными и не меняться между рендерами.\n8. **Как работает useEffect и чем он отличается от componentDidMount?**\n   \n   useEffect выполняется после рендера компонента. С пустым массивом зависимостей \\[\\] он похож на componentDidMount, но выполняется асинхронно. useEffect может возвращать cleanup функцию (аналог componentWillUnmount) и перезапускаться при изменении зависимостей.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Когда использовать React?',
      blocks: [
        {
          id: 'cards-90',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-91',
              blocks: [
                {
                  id: 'heading-92',
                  type: 'heading',
                  level: 3,
                  text: '✅ Подходит для',
                },
                {
                  id: 'text-93',
                  type: 'prose',
                  markdown:
                    '- SPA (Single Page Applications)\n- Сложные интерактивные интерфейсы\n- Приложения с частыми обновлениями UI\n- Проекты с большой командой\n- Кроссплатформенные приложения (React Native)\n- Прогрессивные веб\\-приложения (PWA)',
                },
              ],
            },
            {
              id: 'card-94',
              blocks: [
                {
                  id: 'heading-95',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Возможны альтернативы',
                },
                {
                  id: 'text-96',
                  type: 'prose',
                  markdown:
                    '- Простые статические сайты (используйте SSG)\n- Проекты с жесткими требованиями к SEO (Next.js)\n- Маленькие команды/проекты (Vue проще)\n- Корпоративные приложения (Angular лучше)\n- Строгая типизация критична (Angular \\+ TypeScript)\n- Минимальный bundle size (Preact, Svelte)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Современные тренды React (2025)',
      blocks: [
        {
          id: 'cards-97',
          type: 'cards',
          columns: 4,
          items: [
            {
              id: 'card-98',
              blocks: [
                {
                  id: 'heading-99',
                  type: 'heading',
                  level: 3,
                  text: 'Server Components',
                },
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown: 'Компоненты, рендерящиеся на сервере в Next.js 13\\+',
                },
              ],
            },
            {
              id: 'card-101',
              blocks: [
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 3,
                  text: 'Concurrent Mode',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown: 'Прерываемый рендеринг для улучшения отзывчивости',
                },
              ],
            },
            {
              id: 'card-104',
              blocks: [
                {
                  id: 'heading-105',
                  type: 'heading',
                  level: 3,
                  text: 'Suspense',
                },
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown: 'Декларативная загрузка данных и code splitting',
                },
              ],
            },
            {
              id: 'card-107',
              blocks: [
                {
                  id: 'heading-108',
                  type: 'heading',
                  level: 3,
                  text: 'React Compiler',
                },
                {
                  id: 'text-109',
                  type: 'prose',
                  markdown: 'Автоматическая оптимизация без memo/useCallback',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-110',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-111',
              blocks: [
                {
                  id: 'heading-112',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-113',
                  type: 'prose',
                  markdown:
                    '- Использовать функциональные компоненты и хуки\n- Разделять компоненты по ответственности\n- Использовать TypeScript для типобезопасности\n- Мемоизировать дорогие вычисления (useMemo)\n- Использовать key для списков\n- Следовать принципам SOLID',
                },
              ],
            },
            {
              id: 'card-114',
              blocks: [
                {
                  id: 'heading-115',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- Прямых манипуляций с DOM (используйте ref)\n- Мутирования state напрямую\n- Слишком больших компонентов\n- Излишней оптимизации (memo везде)\n- Index как key в динамических списках\n- Prop drilling (используйте Context/Redux)',
                },
              ],
            },
            {
              id: 'card-117',
              blocks: [
                {
                  id: 'heading-118',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-119',
                  type: 'prose',
                  markdown:
                    '- Используйте React DevTools для отладки\n- Изучите паттерны (Compound, HOC, Render Props)\n- Автоматизируйте тестирование (Jest, RTL)\n- Изучите Next.js для production приложений\n- Следите за обновлениями React\n- Читайте официальную документацию',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Итог',
      blocks: [
        {
          id: 'text-120',
          type: 'prose',
          markdown:
            '**React** — это мощная, гибкая и популярная библиотека для создания пользовательских интерфейсов. Основные преимущества: **производительность** через Virtual DOM, **компонентная архитектура**, **декларативный подход**, **огромная экосистема** и **активное сообщество**. React подходит для большинства современных веб\\-приложений, от небольших SPA до крупных enterprise решений. Знание React — обязательный навык для фронтенд\\-разработчика в 2025 году.',
        },
        {
          id: 'resources-121',
          type: 'resources',
          items: [
            {
              id: 'link-122',
              label: 'React Documentation',
              url: 'https://react.dev/',
            },
          ],
        },
        {
          id: 'resources-123',
          type: 'resources',
          items: [
            {
              id: 'link-124',
              label: 'React GitHub',
              url: 'https://github.com/facebook/react',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
