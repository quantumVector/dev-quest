import type { Question } from '@/types/question.ts'

export const react19Questions: Question[] = [
  // Тема 1: React Compiler (React Forget)
  {
    id: 1,
    question: "Что такое React Compiler (React Forget)?",
    options: [
      "Инструмент для компиляции JSX в JavaScript",
      "Автоматический компилятор для оптимизации React компонентов",
      "Библиотека для минификации React кода",
      "Плагин для TypeScript"
    ],
    correctAnswer: 1,
    explanation: "React Compiler (ранее React Forget) — это автоматический компилятор, который оптимизирует React компоненты на этапе сборки, автоматически мемоизируя компоненты и значения без необходимости использовать useMemo, useCallback и React.memo.",
    topic: "React Compiler"
  },
  {
    id: 2,
    question: "Какую основную проблему решает React Compiler?",
    options: [
      "Медленную загрузку приложения",
      "Необходимость вручную мемоизировать компоненты и значения",
      "Проблемы с типизацией",
      "Несовместимость с TypeScript"
    ],
    correctAnswer: 1,
    explanation: "React Compiler автоматизирует процесс оптимизации, устраняя необходимость вручную обертывать код в useMemo, useCallback и React.memo, делая оптимизацию производительности более простой и надежной.",
    topic: "React Compiler"
  },
  {
    id: 3,
    question: "Что происходит с кодом при использовании React Compiler?",
    options: [
      "Код остается неизменным",
      "Код автоматически оптимизируется на этапе сборки",
      "Код переписывается на TypeScript",
      "Код минифицируется"
    ],
    correctAnswer: 1,
    explanation: "React Compiler анализирует код во время сборки и автоматически добавляет оптимизации, такие как мемоизация компонентов и вычислений, без изменения исходного кода.",
    topic: "React Compiler"
  },
  {
    id: 4,
    question: "Нужно ли будет использовать useMemo и useCallback с React Compiler?",
    options: [
      "Да, они обязательны",
      "Нет, компилятор автоматически оптимизирует код",
      "Только для критичных участков",
      "Только в production режиме"
    ],
    correctAnswer: 1,
    explanation: "С React Compiler отпадает необходимость в ручной мемоизации через useMemo и useCallback, так как компилятор автоматически определяет, что нужно оптимизировать.",
    topic: "React Compiler"
  },
  {
    id: 5,
    question: "Когда React Compiler станет доступен?",
    options: [
      "Уже доступен в стабильной версии React 19",
      "Находится в экспериментальной стадии",
      "Отменен командой React",
      "Доступен только для Enterprise"
    ],
    correctAnswer: 1,
    explanation: "React Compiler находится в экспериментальной стадии разработки. Meta уже использует его в production на Instagram, но для широкой публики он пока в beta.",
    topic: "React Compiler"
  },

  // Тема 2: Actions и useActionState
  {
    id: 6,
    question: "Что такое Actions в React 19?",
    options: [
      "Новый способ обработки асинхронных операций в формах",
      "Замена Redux",
      "Новый lifecycle метод",
      "Альтернатива useEffect"
    ],
    correctAnswer: 0,
    explanation: "Actions — это новая концепция для обработки асинхронных операций, особенно в формах. Они интегрируют управление состоянием, обработку ошибок и оптимистичные обновления.",
    topic: "Actions"
  },
  {
    id: 7,
    question: "Что возвращает хук useActionState?",
    options: [
      "Только текущее состояние",
      "[state, action, isPending]",
      "[action, isPending]",
      "[state, isPending]"
    ],
    correctAnswer: 1,
    explanation: "useActionState возвращает массив из трех элементов: текущее состояние (state), функцию для выполнения действия (action) и флаг загрузки (isPending).",
    topic: "Actions"
  },
  {
    id: 8,
    question: "Как useActionState помогает с формами?",
    options: [
      "Автоматически валидирует формы",
      "Управляет состоянием формы и отслеживает статус отправки",
      "Создает HTML формы",
      "Стилизует формы"
    ],
    correctAnswer: 1,
    explanation: "useActionState упрощает работу с формами, предоставляя встроенное управление состоянием формы, отслеживание статуса отправки (isPending) и обработку результатов асинхронных операций.",
    topic: "Actions"
  },
  {
    id: 9,
    question: "Что произойдет при вызове action из useActionState?\n\nconst [state, submitAction, isPending] = useActionState(async (prevState, formData) => {\n  await fetch('/api', { body: formData })\n  return { success: true }\n}, { success: false })",
    options: [
      "isPending станет true, выполнится функция, state обновится результатом",
      "Только обновится state",
      "Форма отправится без JavaScript",
      "Произойдет ошибка"
    ],
    correctAnswer: 0,
    explanation: "При вызове action: isPending становится true, выполняется асинхронная функция, затем isPending становится false и state обновляется возвращенным значением функции.",
    topic: "Actions"
  },
  {
    id: 10,
    question: "Можно ли использовать Actions без форм?",
    options: [
      "Нет, только с формами",
      "Да, для любых асинхронных операций",
      "Только с кнопками",
      "Только в серверных компонентах"
    ],
    correctAnswer: 1,
    explanation: "Actions можно использовать для любых асинхронных операций, не только для форм. Они полезны везде, где нужно управление состоянием загрузки и обработкой результатов.",
    topic: "Actions"
  },

  // Тема 3: useOptimistic
  {
    id: 11,
    question: "Что такое оптимистичные обновления (Optimistic Updates)?",
    options: [
      "Обновления, которые всегда успешны",
      "Немедленное отображение изменений до получения ответа от сервера",
      "Автоматическая оптимизация рендеринга",
      "Позитивный UX дизайн"
    ],
    correctAnswer: 1,
    explanation: "Оптимистичные обновления — это паттерн UX, когда изменения отображаются в UI немедленно (оптимистично предполагая успех), а затем откатываются или подтверждаются в зависимости от ответа сервера.",
    topic: "useOptimistic"
  },
  {
    id: 12,
    question: "Для чего используется хук useOptimistic?",
    options: [
      "Для оптимизации производительности",
      "Для создания оптимистичных UI обновлений",
      "Для позитивных уведомлений",
      "Для автоматического кеширования"
    ],
    correctAnswer: 1,
    explanation: "useOptimistic позволяет создавать оптимистичные UI обновления, показывая пользователю немедленный feedback до завершения асинхронной операции.",
    topic: "useOptimistic"
  },
  {
    id: 13,
    question: "Что возвращает useOptimistic?",
    options: [
      "Только оптимистичное состояние",
      "[optimisticState, setOptimisticState]",
      "[state, isPending]",
      "Функцию обновления"
    ],
    correctAnswer: 1,
    explanation: "useOptimistic возвращает массив из двух элементов: оптимистичное состояние и функцию для установки оптимистичного значения.",
    topic: "useOptimistic"
  },
  {
    id: 14,
    question: "Что происходит с оптимистичным состоянием после завершения асинхронной операции?\n\nconst [optimisticMessages, addOptimisticMessage] = useOptimistic(\n  messages,\n  (state, newMessage) => [...state, newMessage]\n)",
    options: [
      "Остается неизменным",
      "Автоматически откатывается к реальному состоянию",
      "Удаляется",
      "Дублируется"
    ],
    correctAnswer: 1,
    explanation: "После завершения асинхронной операции оптимистичное состояние автоматически откатывается к реальному состоянию из первого аргумента useOptimistic (messages в примере).",
    topic: "useOptimistic"
  },
  {
    id: 15,
    question: "Когда полезно использовать useOptimistic?",
    options: [
      "Для всех состояний в приложении",
      "Для операций с немедленным UI feedback (лайки, комментарии)",
      "Только для форм",
      "Только для серверных запросов"
    ],
    correctAnswer: 1,
    explanation: "useOptimistic особенно полезен для операций, где важен немедленный UI feedback: лайки, отправка комментариев, добавление в корзину и другие действия, где пользователь ожидает мгновенного отклика.",
    topic: "useOptimistic"
  },

  // Тема 4: use() хук
  {
    id: 16,
    question: "Что такое хук use() в React 19?",
    options: [
      "Хук для подключения библиотек",
      "Универсальный хук для чтения промисов и контекста",
      "Замена useState",
      "Хук для side effects"
    ],
    correctAnswer: 1,
    explanation: "use() — это новый универсальный хук, который может читать значения из промисов и контекста. Это первый хук, который можно вызывать условно.",
    topic: "use() хук"
  },
  {
    id: 17,
    question: "Чем use() отличается от других хуков?",
    options: [
      "Работает быстрее",
      "Можно вызывать условно (в if, циклах)",
      "Не требует зависимостей",
      "Работает только на сервере"
    ],
    correctAnswer: 1,
    explanation: "use() — первый хук React, который можно вызывать условно внутри if, циклов и других условных конструкций, что невозможно с другими хуками.",
    topic: "use() хук"
  },
  {
    id: 18,
    question: "Как use() работает с промисами?\n\nconst data = use(fetchData())",
    options: [
      "Немедленно возвращает undefined",
      "Приостанавливает компонент до разрешения промиса (Suspense)",
      "Возвращает промис",
      "Вызывает ошибку"
    ],
    correctAnswer: 1,
    explanation: "Когда use() получает промис, он приостанавливает рендеринг компонента (используя Suspense механизм) до разрешения промиса, затем возвращает результат.",
    topic: "use() хук"
  },
  {
    id: 19,
    question: "Как use() работает с контекстом?\n\nconst theme = use(ThemeContext)",
    options: [
      "Точно так же как useContext",
      "Быстрее чем useContext",
      "Работает только в серверных компонентах",
      "Не работает с контекстом"
    ],
    correctAnswer: 0,
    explanation: "При использовании с контекстом, use() работает аналогично useContext, возвращая текущее значение контекста.",
    topic: "use() хук"
  },
  {
    id: 20,
    question: "Что произойдет если промис в use() отклонится (reject)?\n\nconst data = use(fetchData())",
    options: [
      "Компонент упадет с ошибкой",
      "Ошибка будет поймана ближайшим Error Boundary",
      "Вернет undefined",
      "Автоматически повторит запрос"
    ],
    correctAnswer: 1,
    explanation: "Если промис отклоняется, ошибка всплывает к ближайшему Error Boundary, который может обработать ошибку и показать fallback UI.",
    topic: "use() хук"
  },

  // Тема 5: ref как проп
  {
    id: 21,
    question: "Что изменилось с ref в React 19?",
    options: [
      "ref удалили",
      "ref теперь можно передавать как обычный проп",
      "ref работает только с forwardRef",
      "ref стал обязательным"
    ],
    correctAnswer: 1,
    explanation: "В React 19 ref можно передавать как обычный проп без использования forwardRef. forwardRef теперь не нужен для большинства случаев.",
    topic: "ref как проп"
  },
  {
    id: 22,
    question: "Нужен ли forwardRef в React 19?",
    options: [
      "Да, всегда обязателен",
      "Нет, можно использовать ref напрямую",
      "Только для классовых компонентов",
      "Только в TypeScript"
    ],
    correctAnswer: 1,
    explanation: "forwardRef больше не нужен в большинстве случаев. Функциональные компоненты теперь получают ref как обычный проп.",
    topic: "ref как проп"
  },
  {
    id: 23,
    question: "Как принять ref в функциональном компоненте в React 19?\n\nfunction MyInput({ ref, ...props }) {\n  return <input ref={ref} {...props} />\n}",
    options: [
      "Код работает корректно",
      "Нужно использовать forwardRef",
      "Нужно переименовать ref в inputRef",
      "Синтаксическая ошибка"
    ],
    correctAnswer: 0,
    explanation: "В React 19 этот код работает корректно. ref можно получить как обычный проп без forwardRef.",
    topic: "ref как проп"
  },
  {
    id: 24,
    question: "Когда может понадобиться forwardRef в React 19?",
    options: [
      "Всегда нужен",
      "Никогда не нужен",
      "Для обратной совместимости или библиотек",
      "Только для серверных компонентов"
    ],
    correctAnswer: 2,
    explanation: "forwardRef может понадобиться для обратной совместимости со старым кодом или в библиотеках, которые должны работать с разными версиями React.",
    topic: "ref как проп"
  },
  {
    id: 25,
    question: "Как это упрощает типизацию в TypeScript?",
    options: [
      "Не упрощает",
      "Не нужен сложный ForwardRefRenderFunction тип",
      "TypeScript больше не нужен",
      "Появились новые типы"
    ],
    correctAnswer: 1,
    explanation: "ref как обычный проп упрощает типизацию: не нужно использовать сложный ForwardRefRenderFunction тип, можно использовать обычные типы пропсов.",
    topic: "ref как проп"
  },

  // Тема 6: Улучшения в гидратации
  {
    id: 26,
    question: "Что улучшилось в гидратации в React 19?",
    options: [
      "Гидратация стала медленнее",
      "Лучшая обработка ошибок несоответствия (hydration mismatches)",
      "Гидратация удалена",
      "Только для Next.js"
    ],
    correctAnswer: 1,
    explanation: "React 19 улучшает обработку ошибок гидратации, предоставляя более детальные сообщения об ошибках и лучшее восстановление после несоответствий между сервером и клиентом.",
    topic: "Гидратация"
  },
  {
    id: 27,
    question: "Что такое hydration mismatch?",
    options: [
      "Ошибка в коде",
      "Несоответствие между серверным HTML и клиентским рендером",
      "Проблема с производительностью",
      "Ошибка сети"
    ],
    correctAnswer: 1,
    explanation: "Hydration mismatch происходит когда HTML, сгенерированный на сервере, не соответствует тому, что React ожидает увидеть при гидратации на клиенте.",
    topic: "Гидратация"
  },
  {
    id: 28,
    question: "Как React 19 помогает с hydration mismatches?",
    options: [
      "Автоматически исправляет все ошибки",
      "Предоставляет более точные ошибки и пытается восстановиться",
      "Игнорирует ошибки",
      "Падает с critical error"
    ],
    correctAnswer: 1,
    explanation: "React 19 показывает более понятные сообщения об ошибках гидратации с указанием конкретного места несоответствия и пытается восстановить корректное состояние.",
    topic: "Гидратация"
  },
  {
    id: 29,
    question: "Что может вызвать hydration mismatch?\n\nfunction Component() {\n  return <div>{new Date().toString()}</div>\n}",
    options: [
      "Этот код безопасен",
      "Время на сервере и клиенте будет разным",
      "Date не работает в React",
      "Нужно использовать useState"
    ],
    correctAnswer: 1,
    explanation: "Этот код вызовет mismatch, так как время создания Date на сервере и на клиенте будет разным. Для таких случаев нужно использовать useEffect или suppressHydrationWarning.",
    topic: "Гидратация"
  },
  {
    id: 30,
    question: "Что такое suppressHydrationWarning?",
    options: [
      "Отключает все предупреждения",
      "Подавляет предупреждения о hydration mismatch для элемента",
      "Ускоряет гидратацию",
      "Отключает гидратацию"
    ],
    correctAnswer: 1,
    explanation: "suppressHydrationWarning — это проп, который говорит React игнорировать предупреждения о несоответствии для конкретного элемента, когда различия ожидаемы (например, timestamp).",
    topic: "Гидратация"
  },

  // Тема 7: Document Metadata
  {
    id: 31,
    question: "Что нового с метаданными документа в React 19?",
    options: [
      "Метаданные удалены",
      "Можно рендерить <title>, <meta> прямо в компонентах",
      "Только через специальный хук",
      "Только в серверных компонентах"
    ],
    correctAnswer: 1,
    explanation: "React 19 позволяет рендерить теги <title>, <meta>, <link> прямо внутри компонентов. React автоматически поднимет их в <head> документа.",
    topic: "Document Metadata"
  },
  {
    id: 32,
    question: "Что произойдет с этим кодом в React 19?\n\nfunction BlogPost() {\n  return (\n    <article>\n      <title>My Blog Post</title>\n      <meta name='description' content='...' />\n      <h1>Post Title</h1>\n    </article>\n  )\n}",
    options: [
      "Ошибка",
      "<title> и <meta> автоматически переместятся в <head>",
      "Теги отрендерятся внутри <article>",
      "Теги будут игнорированы"
    ],
    correctAnswer: 1,
    explanation: "React 19 автоматически переместит <title> и <meta> в <head> документа, даже если они объявлены внутри компонента в любом месте дерева.",
    topic: "Document Metadata"
  },
  {
    id: 33,
    question: "Зачем это нужно?",
    options: [
      "Для красоты кода",
      "Для колокации метаданных с компонентами и лучшего SEO",
      "Для ускорения рендеринга",
      "Только для совместимости"
    ],
    correctAnswer: 1,
    explanation: "Это позволяет держать метаданные рядом с компонентом, которому они принадлежат, улучшая организацию кода и SEO, особенно при SSR.",
    topic: "Document Metadata"
  },
  {
    id: 34,
    question: "Работает ли это с клиентским рендерингом?",
    options: [
      "Нет, только SSR",
      "Да, работает везде",
      "Только в production",
      "Только с фреймворками"
    ],
    correctAnswer: 1,
    explanation: "Эта функция работает как при серверном, так и при клиентском рендеринге. React управляет <head> в обоих случаях.",
    topic: "Document Metadata"
  },
  {
    id: 35,
    question: "Что произойдет если несколько компонентов рендерят одинаковый <title>?",
    options: [
      "Ошибка",
      "Последний отрендеренный <title> побеждает",
      "Все title объединяются",
      "Используется первый"
    ],
    correctAnswer: 1,
    explanation: "React использует последний отрендеренный <title> (или другой тег метаданных). Это позволяет дочерним компонентам переопределять метаданные родителей.",
    topic: "Document Metadata"
  },

  // Тема 8: Улучшения в обработке ошибок
  {
    id: 36,
    question: "Что улучшилось в Error Boundaries в React 19?",
    options: [
      "Error Boundaries удалены",
      "Лучшие сообщения об ошибках и стек-трейсы",
      "Автоматическое исправление ошибок",
      "Работают только в dev режиме"
    ],
    correctAnswer: 1,
    explanation: "React 19 улучшает Error Boundaries, предоставляя более детальные и понятные сообщения об ошибках, лучшие стек-трейсы и дополнительный контекст.",
    topic: "Обработка ошибок"
  },
  {
    id: 37,
    question: "Появился ли хук для Error Boundaries в React 19?",
    options: [
      "Да, useErrorBoundary",
      "Нет, всё еще только классовые компоненты",
      "Да, useCatch",
      "Error Boundaries устарели"
    ],
    correctAnswer: 1,
    explanation: "В React 19 Error Boundaries всё еще требуют классовых компонентов. Хук для обработки ошибок пока не добавлен, но это обсуждается для будущих версий.",
    topic: "Обработка ошибок"
  },
  {
    id: 38,
    question: "Как Error Boundaries работают с Suspense в React 19?",
    options: [
      "Не работают вместе",
      "Error Boundary ловит ошибки из Suspense компонентов",
      "Suspense заменяет Error Boundaries",
      "Требуют специальную настройку"
    ],
    correctAnswer: 1,
    explanation: "Error Boundaries работают с Suspense: они могут ловить ошибки, которые происходят в приостановленных компонентах (например, при загрузке данных).",
    topic: "Обработка ошибок"
  },
  {
    id: 39,
    question: "Что такое Error Digest в React 19?",
    options: [
      "Новый тип ошибки",
      "Уникальный ID ошибки для логирования",
      "Метод Error Boundary",
      "Плагин для отладки"
    ],
    correctAnswer: 1,
    explanation: "Error Digest — это уникальный идентификатор ошибки, который React генерирует при SSR. Он помогает сопоставлять клиентские и серверные ошибки в логах.",
    topic: "Обработка ошибок"
  },
  {
    id: 40,
    question: "Как улучшилось логирование ошибок в консоли?",
    options: [
      "Ошибки больше не логируются",
      "Более четкие стек-трейсы и указание на компонент",
      "Только для production",
      "Требует дополнительную библиотеку"
    ],
    correctAnswer: 1,
    explanation: "React 19 улучшает вывод ошибок в консоль, показывая более понятные стек-трейсы, указывая на конкретный компонент, где произошла ошибка, и предоставляя больше контекста.",
    topic: "Обработка ошибок"
  },

  // Тема 9: Улучшения Context
  {
    id: 41,
    question: "Что изменилось с Context.Provider в React 19?",
    options: [
      "Provider удален",
      "Можно использовать Context напрямую как Provider",
      "Provider стал обязательным",
      "Появился новый синтаксис"
    ],
    correctAnswer: 1,
    explanation: "В React 19 можно использовать Context напрямую как Provider: <ThemeContext value={theme}> вместо <ThemeContext.Provider value={theme}>.",
    topic: "Context"
  },
  {
    id: 42,
    question: "Нужен ли .Provider в React 19?\n\n<ThemeContext value={theme}>\n  <App />\n</ThemeContext>",
    options: [
      "Да, обязательно",
      "Нет, можно использовать Context напрямую",
      "Только в TypeScript",
      "Только для кастомных контекстов"
    ],
    correctAnswer: 1,
    explanation: "Этот код корректен в React 19. Контекст можно использовать напрямую как Provider, что делает код чище и короче.",
    topic: "Context"
  },
  {
    id: 43,
    question: "Работает ли старый синтаксис с .Provider?",
    options: [
      "Нет, вызовет ошибку",
      "Да, для обратной совместимости",
      "Только в dev режиме",
      "Только в старых проектах"
    ],
    correctAnswer: 1,
    explanation: "Старый синтаксис с .Provider продолжает работать для обратной совместимости. Можно постепенно мигрировать на новый синтаксис.",
    topic: "Context"
  },
  {
    id: 44,
    question: "Как это влияет на производительность?",
    options: [
      "Значительно ускоряет",
      "Минимальное влияние, в основном DX улучшение",
      "Замедляет работу",
      "Никак"
    ],
    correctAnswer: 1,
    explanation: "Изменение в основном улучшает Developer Experience (DX), делая код проще. Влияние на производительность минимально.",
    topic: "Context"
  },
  {
    id: 45,
    question: "Изменилась ли работа useContext?",
    options: [
      "Да, полностью переписан",
      "Нет, работает так же",
      "Удален в пользу use()",
      "Требует новый синтаксис"
    ],
    correctAnswer: 1,
    explanation: "useContext работает абсолютно так же. Изменился только синтаксис Provider, сам хук useContext остался неизменным.",
    topic: "Context"
  },

  // Тема 10: Новые возможности и deprecations
  {
    id: 46,
    question: "Какой API помечен как устаревший в React 19?",
    options: [
      "useState",
      "ReactDOM.render (legacy root API)",
      "useEffect",
      "Context API"
    ],
    correctAnswer: 1,
    explanation: "ReactDOM.render и другие legacy root API окончательно помечены как deprecated в React 19. Следует использовать createRoot.",
    topic: "Deprecations"
  },
  {
    id: 47,
    question: "Что такое useDeferredValue в контексте React 19?",
    options: [
      "Новый хук в React 19",
      "Существующий хук из React 18, без изменений",
      "Удаленный хук",
      "Переименован в useOptimistic"
    ],
    correctAnswer: 1,
    explanation: "useDeferredValue существует с React 18 и продолжает работать в React 19 без изменений. Это не новая возможность React 19.",
    topic: "Хуки"
  },
  {
    id: 48,
    question: "Поддерживает ли React 19 Server Components?",
    options: [
      "Нет",
      "Да, через фреймворки как Next.js",
      "Да, из коробки",
      "Только в beta"
    ],
    correctAnswer: 1,
    explanation: "React 19 включает полную поддержку Server Components, но для их использования нужен фреймворк с поддержкой (Next.js 14+, Remix и др.).",
    topic: "Server Components"
  },
  {
    id: 49,
    question: "Что такое Server Actions в React 19?",
    options: [
      "Функции, выполняющиеся на сервере",
      "Замена API routes",
      "Новый тип компонентов",
      "Middleware для серверного рендеринга"
    ],
    correctAnswer: 0,
    explanation: "Server Actions — это функции, которые выполняются на сервере, но могут быть вызваны из клиентских компонентов. Они упрощают работу с формами и мутациями данных.",
    topic: "Server Components"
  },
  {
    id: 50,
    question: "Какая основная цель React 19?",
    options: [
      "Полная переработка React",
      "Улучшение DX и упрощение оптимизации",
      "Замена всех существующих паттернов",
      "Только новые фичи"
    ],
    correctAnswer: 1,
    explanation: "Основная цель React 19 — улучшить Developer Experience, упростить оптимизацию производительности (через Compiler) и сделать работу с формами и асинхронностью проще через Actions.",
    topic: "Общее"
  }
]
