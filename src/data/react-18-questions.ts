import type { Question } from '@/types/question.ts'

export const react18Questions: Question[] = [
  // Тема 1: Automatic Batching
  {
    id: 1,
    question: "Что такое Automatic Batching в React 18?",
    options: [
      "Автоматическое группирование компонентов",
      "Автоматическое объединение нескольких обновлений состояния в один ре-рендер",
      "Автоматическая оптимизация производительности",
      "Автоматическое разделение кода"
    ],
    correctAnswer: 1,
    explanation: "Automatic Batching — это возможность React 18 автоматически группировать множественные обновления состояния в один ре-рендер, даже если они происходят в асинхронных функциях, промисах или таймаутах.",
    topic: "Automatic Batching"
  },
  {
    id: 2,
    question: "В чем отличие batching в React 17 от React 18?",
    options: [
      "В React 17 batching работал только в событиях браузера",
      "В React 18 batching отключен",
      "Никакой разницы нет",
      "В React 17 batching работал быстрее"
    ],
    correctAnswer: 0,
    explanation: "В React 17 batching работал только внутри синхронных обработчиков событий браузера. В React 18 batching работает везде: в промисах, setTimeout, нативных событиях и т.д.",
    topic: "Automatic Batching"
  },
  {
    id: 3,
    question: "Сколько ре-рендеров произойдет в этом коде в React 18?\n\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 1000);",
    options: [
      "2 ре-рендера",
      "1 ре-рендер",
      "3 ре-рендера",
      "0 ре-рендеров"
    ],
    correctAnswer: 1,
    explanation: "В React 18 благодаря Automatic Batching оба обновления состояния будут сгруппированы в один ре-рендер, даже внутри setTimeout.",
    topic: "Automatic Batching"
  },
  {
    id: 4,
    question: "Как отключить Automatic Batching для конкретного обновления?",
    options: [
      "Использовать флаг { batch: false }",
      "Использовать ReactDOM.flushSync()",
      "Использовать useState с вторым параметром",
      "Невозможно отключить"
    ],
    correctAnswer: 1,
    explanation: "Для принудительного немедленного обновления без batching нужно обернуть обновление в ReactDOM.flushSync(). Это заставит React применить обновления синхронно.",
    topic: "Automatic Batching"
  },
  {
    id: 5,
    question: "Что произойдет в этом коде в React 18?\n\nfetch('/api').then(() => {\n  setData(newData);\n  setLoading(false);\n});",
    options: [
      "Два отдельных ре-рендера",
      "Один ре-рендер благодаря batching",
      "Ошибка",
      "Ре-рендер не произойдет"
    ],
    correctAnswer: 1,
    explanation: "В React 18 обновления состояния внутри промисов автоматически группируются в один ре-рендер благодаря Automatic Batching.",
    topic: "Automatic Batching"
  },

  // Тема 2: Concurrent Features
  {
    id: 6,
    question: "Что такое Concurrent Rendering в React 18?",
    options: [
      "Одновременный рендеринг всех компонентов",
      "Возможность прерывать, приостанавливать и возобновлять рендеринг",
      "Параллельное выполнение нескольких рендеров",
      "Рендеринг на нескольких потоках"
    ],
    correctAnswer: 1,
    explanation: "Concurrent Rendering позволяет React прерывать работу по рендерингу, чтобы обработать более приоритетные обновления, а затем возобновлять прерванную работу. Это делает UI более отзывчивым.",
    topic: "Concurrent Features"
  },
  {
    id: 7,
    question: "Как включить Concurrent Features в React 18?",
    options: [
      "Использовать ReactDOM.render()",
      "Использовать createRoot() вместо render()",
      "Добавить флаг в package.json",
      "Concurrent Features включены по умолчанию"
    ],
    correctAnswer: 1,
    explanation: "Для использования Concurrent Features нужно использовать новый API createRoot() вместо устаревшего ReactDOM.render(). Это включает новый concurrent renderer.",
    topic: "Concurrent Features"
  },
  {
    id: 8,
    question: "Что такое Transitions в React 18?",
    options: [
      "CSS анимации",
      "Способ пометить обновления как неприоритетные",
      "Переходы между страницами",
      "Анимации компонентов"
    ],
    correctAnswer: 1,
    explanation: "Transitions позволяют пометить определенные обновления состояния как неприоритетные (transition updates). React может прервать их рендеринг для обработки более срочных обновлений.",
    topic: "Concurrent Features"
  },
  {
    id: 9,
    question: "Какой хук используется для создания transitions?",
    options: [
      "useTransition()",
      "useDeferredValue()",
      "useConcurrent()",
      "useAsync()"
    ],
    correctAnswer: 0,
    explanation: "Хук useTransition() возвращает функцию startTransition и флаг isPending, позволяя обернуть неприоритетные обновления и показать индикатор загрузки.",
    topic: "Concurrent Features"
  },
  {
    id: 10,
    question: "В чем разница между useTransition и useDeferredValue?",
    options: [
      "useTransition для состояния, useDeferredValue для пропсов",
      "useTransition оборачивает обновление, useDeferredValue откладывает значение",
      "Никакой разницы нет",
      "useDeferredValue устарел в React 18"
    ],
    correctAnswer: 1,
    explanation: "useTransition оборачивает функцию обновления состояния, а useDeferredValue откладывает само значение. useTransition используется когда есть контроль над setState, useDeferredValue — когда работаешь с пропсами.",
    topic: "Concurrent Features"
  },
  {
    id: 11,
    question: "Что вернет useTransition()?",
    options: [
      "[isPending, startTransition]",
      "[startTransition, isPending]",
      "{ isPending, startTransition }",
      "startTransition"
    ],
    correctAnswer: 0,
    explanation: "useTransition() возвращает массив из двух элементов: булево значение isPending и функцию startTransition для оборачивания неприоритетных обновлений.",
    topic: "Concurrent Features"
  },
  {
    id: 12,
    question: "Когда следует использовать startTransition?",
    options: [
      "Для всех обновлений состояния",
      "Для срочных обновлений UI",
      "Для медленных, неприоритетных обновлений",
      "Для асинхронных операций"
    ],
    correctAnswer: 2,
    explanation: "startTransition следует использовать для медленных, неприоритетных обновлений (например, фильтрация большого списка), чтобы не блокировать более важные обновления (например, ввод текста).",
    topic: "Concurrent Features"
  },
  {
    id: 13,
    question: "Что делает useDeferredValue?",
    options: [
      "Задерживает выполнение функции",
      "Возвращает отложенную версию значения",
      "Кэширует значение",
      "Мемоизирует компонент"
    ],
    correctAnswer: 1,
    explanation: "useDeferredValue возвращает отложенную версию значения, которая может 'отставать' от актуального значения. React обновит отложенное значение в фоне после приоритетных обновлений.",
    topic: "Concurrent Features"
  },

  // Тема 3: Suspense улучшения
  {
    id: 14,
    question: "Что нового в Suspense в React 18?",
    options: [
      "Suspense был добавлен в React 18",
      "Поддержка Suspense на сервере (SSR)",
      "Suspense теперь работает только на клиенте",
      "Suspense был удален"
    ],
    correctAnswer: 1,
    explanation: "В React 18 Suspense получил полную поддержку на сервере (SSR), включая Streaming SSR и Selective Hydration. Это одно из главных улучшений.",
    topic: "Suspense"
  },
  {
    id: 15,
    question: "Что такое Streaming SSR в React 18?",
    options: [
      "Потоковая передача видео",
      "Постепенная отправка HTML на клиент по мере готовности",
      "Стриминг данных с сервера",
      "Параллельный рендеринг на сервере"
    ],
    correctAnswer: 1,
    explanation: "Streaming SSR позволяет отправлять HTML клиенту частями по мере готовности компонентов, не дожидаясь рендеринга всей страницы. Suspense boundaries определяют границы стриминга.",
    topic: "Suspense"
  },
  {
    id: 16,
    question: "Что такое Selective Hydration?",
    options: [
      "Выборочная загрузка данных",
      "Приоритетная гидратация интерактивных компонентов",
      "Частичный рендеринг компонентов",
      "Оптимизация памяти"
    ],
    correctAnswer: 1,
    explanation: "Selective Hydration позволяет React начать гидратацию до завершения загрузки всего JavaScript кода и приоритизировать гидратацию компонентов, с которыми взаимодействует пользователь.",
    topic: "Suspense"
  },
  {
    id: 17,
    question: "Можно ли использовать Suspense для data fetching в React 18?",
    options: [
      "Нет, только для code splitting",
      "Да, но только с определенными библиотеками",
      "Да, с любым асинхронным кодом",
      "Suspense не поддерживает асинхронность"
    ],
    correctAnswer: 1,
    explanation: "В React 18 Suspense можно использовать для data fetching, но требуется Suspense-совместимая библиотека (например, Relay, SWR с Suspense mode) или фреймворк с встроенной поддержкой (Next.js, Remix).",
    topic: "Suspense"
  },
  {
    id: 18,
    question: "Что происходит когда компонент внутри Suspense boundary приостанавливается?",
    options: [
      "Приложение падает с ошибкой",
      "Показывается fallback UI",
      "Компонент рендерится пустым",
      "React пропускает этот компонент"
    ],
    correctAnswer: 1,
    explanation: "Когда компонент приостанавливается (suspend), React показывает ближайший Suspense fallback до завершения асинхронной операции.",
    topic: "Suspense"
  },

  // Тема 4: New Hooks
  {
    id: 19,
    question: "Какой новый хук появился в React 18 для работы с уникальными ID?",
    options: [
      "useId()",
      "useUniqueId()",
      "useGenerateId()",
      "useIdentifier()"
    ],
    correctAnswer: 0,
    explanation: "useId() — новый хук в React 18, генерирующий уникальные ID, стабильные между сервером и клиентом. Полезен для accessibility атрибутов (aria-describedby и т.д.).",
    topic: "New Hooks"
  },
  {
    id: 20,
    question: "Зачем нужен useId если можно использовать Math.random()?",
    options: [
      "useId быстрее работает",
      "useId генерирует одинаковые ID на сервере и клиенте",
      "Math.random() не работает в React",
      "useId создает более короткие ID"
    ],
    correctAnswer: 1,
    explanation: "useId генерирует стабильные ID, которые совпадают между серверным рендерингом и гидратацией на клиенте, предотвращая hydration mismatches. Math.random() создаст разные ID.",
    topic: "New Hooks"
  },
  {
    id: 21,
    question: "Можно ли использовать useId для генерации ключей в списках?",
    options: [
      "Да, это основное назначение useId",
      "Нет, useId не подходит для keys",
      "Да, но только для статических списков",
      "useId создан специально для keys"
    ],
    correctAnswer: 1,
    explanation: "useId НЕ предназначен для генерации ключей в списках. Ключи должны быть основаны на данных. useId для accessibility атрибутов и связывания элементов форм.",
    topic: "New Hooks"
  },
  {
    id: 22,
    question: "Что такое useSyncExternalStore?",
    options: [
      "Хук для работы с внешними базами данных",
      "Хук для подписки на внешние источники данных с поддержкой concurrent features",
      "Хук для синхронизации состояния между компонентами",
      "Хук для работы с localStorage"
    ],
    correctAnswer: 1,
    explanation: "useSyncExternalStore позволяет подписываться на внешние источники данных (store) с поддержкой concurrent rendering, обеспечивая консистентность данных.",
    topic: "New Hooks"
  },
  {
    id: 23,
    question: "Для чего в основном используется useSyncExternalStore?",
    options: [
      "Для приложений на React",
      "Для библиотек управления состоянием и интеграций с внешними store",
      "Для оптимизации производительности",
      "Для работы с формами"
    ],
    correctAnswer: 1,
    explanation: "useSyncExternalStore в основном используется авторами библиотек (Redux, Zustand и т.д.) для корректной интеграции с concurrent features React 18.",
    topic: "New Hooks"
  },
  {
    id: 24,
    question: "Что делает useInsertionEffect?",
    options: [
      "Вставляет элементы в DOM",
      "Запускается перед всеми DOM мутациями для вставки стилей",
      "Добавляет компоненты в дерево",
      "Создает порталы"
    ],
    correctAnswer: 1,
    explanation: "useInsertionEffect запускается синхронно перед всеми DOM мутациями. Используется CSS-in-JS библиотеками для динамической вставки стилей до измерения layout.",
    topic: "New Hooks"
  },
  {
    id: 25,
    question: "Должны ли обычные приложения использовать useInsertionEffect?",
    options: [
      "Да, для всех побочных эффектов",
      "Нет, только CSS-in-JS библиотеки должны использовать его",
      "Да, для оптимизации производительности",
      "Нет, хук устарел"
    ],
    correctAnswer: 1,
    explanation: "useInsertionEffect предназначен исключительно для авторов CSS-in-JS библиотек. Обычные приложения должны использовать useEffect или useLayoutEffect.",
    topic: "New Hooks"
  },

  // Тема 5: Strict Mode изменения
  {
    id: 26,
    question: "Что изменилось в Strict Mode в React 18?",
    options: [
      "Strict Mode был удален",
      "Effects вызываются дважды в dev mode для проверки cleanup",
      "Strict Mode теперь работает только в production",
      "Добавлена проверка TypeScript"
    ],
    correctAnswer: 1,
    explanation: "В React 18 Strict Mode в dev mode монтирует, размонтирует и повторно монтирует компонент, вызывая effects дважды. Это помогает найти проблемы с cleanup функциями.",
    topic: "Strict Mode"
  },
  {
    id: 27,
    question: "Зачем React 18 размонтирует и монтирует компоненты в Strict Mode?",
    options: [
      "Для проверки производительности",
      "Для подготовки к будущим features (Offscreen API)",
      "Это баг React",
      "Для оптимизации памяти"
    ],
    correctAnswer: 1,
    explanation: "Двойной mount/unmount готовит разработчиков к будущим функциям как Offscreen API, где React может размонтировать компоненты для экономии ресурсов, а затем восстановить их состояние.",
    topic: "Strict Mode"
  },
  {
    id: 28,
    question: "Влияет ли поведение Strict Mode на production build?",
    options: [
      "Да, effects вызываются дважды в production",
      "Нет, это поведение только для dev mode",
      "Да, но можно отключить",
      "Strict Mode не работает в production"
    ],
    correctAnswer: 1,
    explanation: "Поведение Strict Mode (двойной вызов effects) работает только в dev mode. В production builds React работает как обычно, без дополнительных проверок.",
    topic: "Strict Mode"
  },
  {
    id: 29,
    question: "Как правильно написать cleanup функцию для совместимости с Strict Mode?",
    options: [
      "Не использовать cleanup функции",
      "Убедиться что cleanup отменяет все side effects",
      "Добавить проверку на dev mode",
      "Обернуть в try-catch"
    ],
    correctAnswer: 1,
    explanation: "Cleanup функция должна отменять или откатывать все side effects, созданные в effect. Это гарантирует корректную работу при повторных вызовах в Strict Mode и будущих features.",
    topic: "Strict Mode"
  },
  {
    id: 30,
    question: "Что произойдет с таким effect в Strict Mode dev mode?\n\nuseEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n}, []);",
    options: [
      "Создастся один таймер",
      "Создастся два таймера (утечка памяти)",
      "Ошибка",
      "Таймер не создастся"
    ],
    correctAnswer: 1,
    explanation: "В Strict Mode dev mode effect вызовется дважды без cleanup, создав два setInterval. Это утечка памяти, которую Strict Mode помогает обнаружить. Нужно добавить cleanup с clearInterval.",
    topic: "Strict Mode"
  },

  // Тема 6: Server Components (подготовка)
  {
    id: 31,
    question: "Поддерживает ли React 18 Server Components из коробки?",
    options: [
      "Да, полностью поддерживает",
      "Нет, но подготовлена инфраструктура для фреймворков",
      "Server Components удалены из React 18",
      "Да, но только в alpha версии"
    ],
    correctAnswer: 1,
    explanation: "React 18 не включает Server Components напрямую, но содержит необходимую инфраструктуру. Полная поддержка доступна через фреймворки как Next.js 13+ с App Router.",
    topic: "Server Components"
  },
  {
    id: 32,
    question: "Какие компоненты могут использовать хуки в архитектуре Server Components?",
    options: [
      "Любые компоненты",
      "Только Client Components",
      "Только Server Components",
      "И Server, и Client Components"
    ],
    correctAnswer: 1,
    explanation: "Хуки (useState, useEffect и т.д.) могут использоваться только в Client Components. Server Components не имеют интерактивности и рендерятся только на сервере.",
    topic: "Server Components"
  },
  {
    id: 33,
    question: "Как в архитектуре Server Components пометить компонент как клиентский?",
    options: [
      "Добавить 'use client' directive",
      "Экспортировать с пометкой client",
      "Использовать ClientComponent wrapper",
      "Компоненты клиентские по умолчанию"
    ],
    correctAnswer: 0,
    explanation: "Для обозначения Client Component в файле добавляется директива 'use client' в начале файла. Без этой директивы компонент считается Server Component.",
    topic: "Server Components"
  },

  // Тема 7: Миграция и обратная совместимость
  {
    id: 34,
    question: "Совместим ли React 18 с предыдущими версиями?",
    options: [
      "Полностью обратно совместим",
      "Требует изменения всего кода",
      "Работает только с новыми проектами",
      "Несовместим с React 17"
    ],
    correctAnswer: 0,
    explanation: "React 18 максимально обратно совместим. Существующий код на React 17 будет работать без изменений. Новые features опциональны и включаются постепенно.",
    topic: "Миграция"
  },
  {
    id: 35,
    question: "Что нужно изменить минимально для обновления на React 18?",
    options: [
      "Переписать все компоненты",
      "Заменить ReactDOM.render на createRoot",
      "Обновить только package.json",
      "Ничего не нужно менять"
    ],
    correctAnswer: 1,
    explanation: "Минимальное изменение — замена ReactDOM.render() на createRoot().render(). Это включает новый concurrent renderer. Остальной код работает без изменений.",
    topic: "Миграция"
  },
  {
    id: 36,
    question: "Что произойдет если продолжить использовать ReactDOM.render в React 18?",
    options: [
      "Ошибка приложения",
      "Приложение работает в legacy mode без новых features",
      "Автоматическое обновление на createRoot",
      "Снижение производительности"
    ],
    correctAnswer: 1,
    explanation: "ReactDOM.render продолжит работать в React 18 в legacy mode без concurrent features. Появится warning в консоли с рекомендацией перейти на createRoot.",
    topic: "Миграция"
  },
  {
    id: 37,
    question: "Какие breaking changes есть в React 18?",
    options: [
      "Множество breaking changes",
      "Очень мало, в основном edge cases",
      "Полная несовместимость",
      "Breaking changes только для TypeScript"
    ],
    correctAnswer: 1,
    explanation: "React 18 имеет минимум breaking changes, в основном edge cases: удаление IE support, изменения в серверном рендеринге, изменения в некоторых редко используемых API.",
    topic: "Миграция"
  },

  // Тема 8: Performance и оптимизации
  {
    id: 38,
    question: "Как Automatic Batching влияет на производительность?",
    options: [
      "Ухудшает производительность",
      "Уменьшает количество ре-рендеров",
      "Не влияет на производительность",
      "Увеличивает потребление памяти"
    ],
    correctAnswer: 1,
    explanation: "Automatic Batching значительно улучшает производительность, группируя множественные обновления состояния в один ре-рендер, уменьшая количество работы для React и браузера.",
    topic: "Performance"
  },
  {
    id: 39,
    question: "Улучшает ли React 18 производительность SSR?",
    options: [
      "Нет, SSR производительность не изменилась",
      "Да, благодаря Streaming SSR и Selective Hydration",
      "SSR стал медленнее",
      "SSR удален в React 18"
    ],
    correctAnswer: 1,
    explanation: "React 18 значительно улучшает SSR производительность через Streaming SSR (быстрее Time to First Byte) и Selective Hydration (быстрее Time to Interactive).",
    topic: "Performance"
  },
  {
    id: 40,
    question: "Как Transitions помогают с производительностью?",
    options: [
      "Ускоряют все обновления",
      "Позволяют приоритизировать срочные обновления над медленными",
      "Кэшируют результаты рендеринга",
      "Оптимизируют bundle size"
    ],
    correctAnswer: 1,
    explanation: "Transitions позволяют пометить медленные обновления как неприоритетные, чтобы React мог прервать их для обработки срочных обновлений (например, ввода пользователя), сохраняя отзывчивость UI.",
    topic: "Performance"
  }
]
