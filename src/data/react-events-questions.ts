import type { Question } from '@/types/question.ts'

export const reactEventsQuestions: Question[] = [
  // Тема 1: Основы обработки событий в React
  {
    id: 1,
    question: "Как React обрабатывает события?",
    options: [
      "Использует нативные DOM события напрямую",
      "Использует систему SyntheticEvent с делегированием событий",
      "Создает отдельный обработчик для каждого элемента",
      "Полностью игнорирует нативные события браузера"
    ],
    correctAnswer: 1,
    explanation: "React использует систему SyntheticEvent — кроссбраузерную обёртку над нативными событиями браузера. В React 16 и ниже события делегировались на уровень document, в React 17+ — на корневой контейнер приложения.",
    topic: "Основы событий"
  },
  {
    id: 2,
    question: "Что такое SyntheticEvent в React?",
    options: [
      "Нативное браузерное событие",
      "Кроссбраузерная обёртка над нативным событием",
      "Событие, созданное пользователем",
      "Асинхронное событие"
    ],
    correctAnswer: 1,
    explanation: "SyntheticEvent — это кроссбраузерная обёртка React над нативным событием браузера. Она обеспечивает одинаковый API для всех браузеров и включает дополнительную оптимизацию через пулинг (pooling) событий.",
    topic: "Основы событий"
  },
  {
    id: 3,
    question: "Как правильно привязать обработчик события в JSX?",
    options: [
      "onclick=\"handleClick()\"",
      "onClick={handleClick()}",
      "onClick={handleClick}",
      "onClick=\"handleClick\""
    ],
    correctAnswer: 2,
    explanation: "В React используется camelCase нотация (onClick) и передается ссылка на функцию без вызова: onClick={handleClick}. Если написать onClick={handleClick()}, функция вызовется сразу при рендере.",
    topic: "Основы событий"
  },
  {
    id: 4,
    question: "В чём основное отличие naming convention событий React от HTML?",
    options: [
      "В React используется snake_case",
      "В React используется camelCase вместо lowercase",
      "В React используется PascalCase",
      "Никакой разницы нет"
    ],
    correctAnswer: 1,
    explanation: "В HTML события пишутся в lowercase (onclick, onchange), а в React используется camelCase (onClick, onChange). Это соответствует общепринятому стилю JavaScript.",
    topic: "Основы событий"
  },
  {
    id: 5,
    question: "Что произойдёт в этом коде?\n\n<button onClick={console.log('clicked')}>Click</button>",
    options: [
      "'clicked' выведется при клике",
      "'clicked' выведется при каждом рендере",
      "Ошибка компиляции",
      "Ничего не произойдёт"
    ],
    correctAnswer: 1,
    explanation: "console.log('clicked') вызывается сразу при рендере, а не при клике. Результат этого вызова (undefined) присваивается onClick. Правильно: onClick={() => console.log('clicked')}",
    topic: "Основы событий"
  },

  // Тема 2: SyntheticEvent vs Native Event
  {
    id: 6,
    question: "Какое главное преимущество SyntheticEvent над нативными событиями?",
    options: [
      "Быстрее выполняется",
      "Кроссбраузерная совместимость",
      "Занимает меньше памяти",
      "Автоматическая отмена события"
    ],
    correctAnswer: 1,
    explanation: "SyntheticEvent обеспечивает одинаковый API во всех браузерах, нормализуя различия в реализации событий между браузерами. Это избавляет от необходимости писать кроссбраузерный код.",
    topic: "SyntheticEvent vs Native"
  },
  {
    id: 7,
    question: "Как получить доступ к нативному событию из SyntheticEvent?",
    options: [
      "event.native",
      "event.nativeEvent",
      "event.originalEvent",
      "event.browser"
    ],
    correctAnswer: 1,
    explanation: "Нативное событие доступно через свойство nativeEvent объекта SyntheticEvent: const nativeEvent = event.nativeEvent. Это полезно для доступа к специфичным свойствам браузера.",
    topic: "SyntheticEvent vs Native"
  },
  {
    id: 8,
    question: "Что такое event pooling в React?",
    options: [
      "Группировка событий для пакетной обработки",
      "Переиспользование объектов событий для оптимизации памяти",
      "Делегирование событий на родительский элемент",
      "Кэширование обработчиков событий"
    ],
    correctAnswer: 1,
    explanation: "Event pooling (до React 17) — это переиспользование объектов SyntheticEvent. После вызова обработчика свойства события обнулялись, и объект возвращался в пул. В React 17+ event pooling удалён.",
    topic: "SyntheticEvent vs Native"
  },
  {
    id: 9,
    question: "Почему в React 16 и ниже event.persist() был важен для асинхронного доступа к событию?",
    options: [
      "Для сохранения события в localStorage",
      "Для предотвращения сброса свойств события из-за pooling",
      "Для остановки всплытия события",
      "Для клонирования события"
    ],
    correctAnswer: 1,
    explanation: "event.persist() удалял событие из пула, предотвращая обнуление его свойств после обработчика. Это позволяло безопасно использовать событие в асинхронном коде. В React 17+ это не нужно.",
    topic: "SyntheticEvent vs Native"
  },
  {
    id: 10,
    question: "Что изменилось в обработке событий в React 17?",
    options: [
      "События делегируются на корневой контейнер вместо document",
      "Добавлена поддержка новых событий",
      "Убрана поддержка SyntheticEvent",
      "Изменён синтаксис обработчиков"
    ],
    correctAnswer: 0,
    explanation: "В React 17 события делегируются на корневой контейнер приложения (root) вместо document. Это упрощает интеграцию нескольких версий React на одной странице и улучшает совместимость с другими библиотеками.",
    topic: "SyntheticEvent vs Native"
  },

  // Тема 3: Методы обработки событий
  {
    id: 11,
    question: "Как правильно передать аргументы в обработчик события?",
    options: [
      "onClick={handleClick(id)}",
      "onClick={() => handleClick(id)}",
      "onClick={handleClick.bind(this, id)}",
      "Варианты B и C корректны"
    ],
    correctAnswer: 3,
    explanation: "Оба варианта корректны: onClick={() => handleClick(id)} создаёт новую функцию при каждом рендере, onClick={handleClick.bind(this, id)} тоже создаёт новую функцию, но может быть полезен для частичного применения.",
    topic: "Методы обработки"
  },
  {
    id: 12,
    question: "В чём проблема этого кода?\n\nclass MyComponent extends React.Component {\n  handleClick() {\n    console.log(this.state);\n  }\n  render() {\n    return <button onClick={this.handleClick}>Click</button>;\n  }\n}",
    options: [
      "this будет undefined в handleClick",
      "state не существует",
      "Неправильный синтаксис onClick",
      "Проблем нет"
    ],
    correctAnswer: 0,
    explanation: "В методе handleClick this будет undefined, потому что контекст теряется при передаче метода как callback. Решение: привязать контекст через bind в constructor или использовать стрелочную функцию.",
    topic: "Методы обработки"
  },
  {
    id: 13,
    question: "Какой способ привязки контекста НЕ создаёт новую функцию при каждом рендере?",
    options: [
      "onClick={() => this.handleClick()}",
      "onClick={this.handleClick.bind(this)}",
      "handleClick = () => {} (class field)",
      "Все создают новую функцию"
    ],
    correctAnswer: 2,
    explanation: "Стрелочная функция как class field (handleClick = () => {}) создаётся один раз при создании экземпляра класса. Другие варианты создают новую функцию при каждом рендере.",
    topic: "Методы обработки"
  },
  {
    id: 14,
    question: "Как предотвратить всплытие события в React?",
    options: [
      "event.stopPropagation()",
      "event.preventDefault()",
      "event.stopImmediatePropagation()",
      "return false"
    ],
    correctAnswer: 0,
    explanation: "event.stopPropagation() останавливает всплытие события по DOM дереву. preventDefault() предотвращает действие по умолчанию (например, переход по ссылке), но не останавливает всплытие.",
    topic: "Методы обработки"
  },
  {
    id: 15,
    question: "Что делает event.preventDefault() в React?",
    options: [
      "Останавливает всплытие события",
      "Предотвращает действие по умолчанию",
      "Отменяет обработчик события",
      "Удаляет событие из очереди"
    ],
    correctAnswer: 1,
    explanation: "event.preventDefault() предотвращает стандартное действие браузера для события (например, отправку формы, переход по ссылке, открытие контекстного меню). Работает так же, как в нативных событиях.",
    topic: "Методы обработки"
  },

  // Тема 4: Event Delegation
  {
    id: 16,
    question: "Что такое делегирование событий (event delegation)?",
    options: [
      "Передача события другому компоненту",
      "Привязка обработчика к родительскому элементу для обработки событий потомков",
      "Асинхронная обработка событий",
      "Клонирование события"
    ],
    correctAnswer: 1,
    explanation: "Event delegation — это паттерн, когда один обработчик на родительском элементе обрабатывает события от всех дочерних элементов. React автоматически использует этот паттерн для оптимизации.",
    topic: "Event Delegation"
  },
  {
    id: 17,
    question: "Где React делегирует события в версии 17+?",
    options: [
      "На каждый элемент отдельно",
      "На document",
      "На корневой контейнер приложения (root)",
      "На body"
    ],
    correctAnswer: 2,
    explanation: "В React 17+ события делегируются на корневой контейнер, переданный в ReactDOM.render() или createRoot(). В React 16 и ниже делегирование было на document.",
    topic: "Event Delegation"
  },
  {
    id: 18,
    question: "Какое преимущество даёт делегирование событий на корневой контейнер (React 17+)?",
    options: [
      "Быстрее выполняется",
      "Улучшает совместимость при использовании нескольких версий React",
      "Уменьшает размер бандла",
      "Автоматическая очистка обработчиков"
    ],
    correctAnswer: 1,
    explanation: "Делегирование на root позволяет безопасно использовать несколько версий React на одной странице, так как каждая версия слушает события на своём корневом элементе, а не на глобальном document.",
    topic: "Event Delegation"
  },
  {
    id: 19,
    question: "Как React определяет, какой компонент должен обработать событие при делегировании?",
    options: [
      "По event.target",
      "По пути всплытия (event path) и внутренним указателям на компоненты",
      "По className элемента",
      "По порядку рендеринга"
    ],
    correctAnswer: 1,
    explanation: "React отслеживает путь всплытия события и использует внутренние указатели (fiber nodes) для определения, какие компоненты должны получить событие в правильном порядке.",
    topic: "Event Delegation"
  },
  {
    id: 20,
    question: "Можно ли смешивать React обработчики с addEventListener?",
    options: [
      "Нет, это вызовет ошибку",
      "Да, но нужно учитывать порядок выполнения и фазы событий",
      "Да, они полностью независимы",
      "Только в React 17+"
    ],
    correctAnswer: 1,
    explanation: "Можно смешивать, но важно понимать порядок: нативные обработчики на элементах выполнятся раньше React обработчиков (из-за делегирования). Также нужно учитывать capturing и bubbling фазы.",
    topic: "Event Delegation"
  },

  // Тема 5: Типы событий в React
  {
    id: 21,
    question: "Какие категории событий поддерживает React?",
    options: [
      "Только клики и ввод текста",
      "Clipboard, Keyboard, Focus, Form, Mouse, Touch, UI, Wheel, Media и другие",
      "Только стандартные HTML события",
      "Только синтетические события"
    ],
    correctAnswer: 1,
    explanation: "React поддерживает широкий спектр событий, организованных в категории: Clipboard Events, Keyboard Events, Focus Events, Form Events, Mouse Events, Touch Events, UI Events, Wheel Events, Media Events и другие.",
    topic: "Типы событий"
  },
  {
    id: 22,
    question: "Как обработать событие клавиатуры в React?",
    options: [
      "onKeyPress",
      "onKeyDown, onKeyUp",
      "onKeyboard",
      "onKey"
    ],
    correctAnswer: 1,
    explanation: "React поддерживает onKeyDown и onKeyUp для обработки событий клавиатуры. onKeyPress устарел и не рекомендуется к использованию. События доступны на элементах, которые могут получить фокус.",
    topic: "Типы событий"
  },
  {
    id: 23,
    question: "Какое событие используется для отслеживания изменений в input?",
    options: [
      "onUpdate",
      "onChange",
      "onInput",
      "onModify"
    ],
    correctAnswer: 1,
    explanation: "onChange в React работает иначе, чем нативное change event — оно срабатывает при каждом изменении значения (как onInput в нативном DOM), обеспечивая контролируемые компоненты.",
    topic: "Типы событий"
  },
  {
    id: 24,
    question: "Как отличаются onMouseEnter/onMouseLeave от onMouseOver/onMouseOut?",
    options: [
      "Никакой разницы",
      "Enter/Leave не всплывают, Over/Out всплывают",
      "Enter/Leave быстрее работают",
      "Over/Out устарели"
    ],
    correctAnswer: 1,
    explanation: "onMouseEnter/onMouseLeave не всплывают и срабатывают только при входе/выходе из элемента. onMouseOver/onMouseOut всплывают и срабатывают также при входе/выходе из дочерних элементов.",
    topic: "Типы событий"
  },
  {
    id: 25,
    question: "Какое событие использовать для обработки touch-жестов?",
    options: [
      "onClick",
      "onTouch",
      "onTouchStart, onTouchMove, onTouchEnd",
      "onGesture"
    ],
    correctAnswer: 2,
    explanation: "React предоставляет Touch Events: onTouchStart, onTouchMove, onTouchEnd, onTouchCancel для обработки touch-взаимодействий на мобильных устройствах.",
    topic: "Типы событий"
  },

  // Тема 6: Особенности работы с формами
  {
    id: 26,
    question: "Что такое контролируемый компонент (controlled component)?",
    options: [
      "Компонент с проверкой типов",
      "Компонент, значение которого контролируется React state",
      "Компонент с валидацией",
      "Компонент внутри формы"
    ],
    correctAnswer: 1,
    explanation: "Контролируемый компонент — это input элемент, значение которого контролируется React state через value prop. Изменения обрабатываются через onChange и обновляют state, создавая single source of truth.",
    topic: "Работа с формами"
  },
  {
    id: 27,
    question: "В чём разница между контролируемым и неконтролируемым компонентом?",
    options: [
      "Контролируемый использует state, неконтролируемый использует DOM",
      "Контролируемый быстрее работает",
      "Неконтролируемый не поддерживает события",
      "Никакой разницы"
    ],
    correctAnswer: 0,
    explanation: "В контролируемом компоненте значение хранится в React state, в неконтролируемом — в DOM. Для неконтролируемых компонентов используют refs для доступа к значениям.",
    topic: "Работа с формами"
  },
  {
    id: 28,
    question: "Как правильно обработать отправку формы в React?",
    options: [
      "<form action=\"/submit\">",
      "<form onSubmit={handleSubmit}>",
      "<form submit={handleSubmit}>",
      "<form onFormSubmit={handleSubmit}>"
    ],
    correctAnswer: 1,
    explanation: "Используется onSubmit на элементе <form>. Внутри обработчика обычно вызывают event.preventDefault() для предотвращения перезагрузки страницы и обрабатывают данные формы в JavaScript.",
    topic: "Работа с формами"
  },
  {
    id: 29,
    question: "Почему в React onChange работает не так, как нативное change event?",
    options: [
      "Это ошибка в React",
      "React нормализует поведение для удобства контролируемых компонентов",
      "onChange быстрее работает",
      "В React нет нативных событий"
    ],
    correctAnswer: 1,
    explanation: "React onChange срабатывает при каждом изменении значения (как onInput), а не только при потере фокуса. Это сделано для удобства работы с контролируемыми компонентами и обеспечения реактивности.",
    topic: "Работа с формами"
  },
  {
    id: 30,
    question: "Как обработать несколько input в одном обработчике?",
    options: [
      "Использовать отдельный обработчик для каждого input",
      "Использовать event.target.name для идентификации input",
      "Это невозможно",
      "Использовать event.target.id"
    ],
    correctAnswer: 1,
    explanation: "Можно использовать один обработчик с event.target.name или event.target.id для идентификации поля и динамического обновления соответствующего значения в state: setState({ [event.target.name]: event.target.value })",
    topic: "Работа с формами"
  },

  // Тема 7: Производительность и оптимизация
  {
    id: 31,
    question: "Почему создание новой функции в onClick может вызвать проблемы с производительностью?",
    options: [
      "Функция выполняется медленнее",
      "При каждом рендере создаётся новая функция, что может вызвать лишние ре-рендеры дочерних компонентов",
      "React не поддерживает inline функции",
      "Это безопасно и не вызывает проблем"
    ],
    correctAnswer: 1,
    explanation: "Создание новой функции при каждом рендере (onClick={() => {}}) приводит к изменению props, что может вызвать ре-рендер дочерних компонентов, даже если они обёрнуты в React.memo.",
    topic: "Производительность"
  },
  {
    id: 32,
    question: "Как оптимизировать обработчики событий с передачей параметров?",
    options: [
      "Использовать useCallback с зависимостями",
      "Использовать data-атрибуты и event.target.dataset",
      "Создать отдельный компонент",
      "Все варианты могут быть применимы"
    ],
    correctAnswer: 3,
    explanation: "Есть несколько подходов: useCallback для мемоизации, data-атрибуты для передачи данных через DOM, выделение в отдельный компонент. Выбор зависит от конкретной ситуации.",
    topic: "Производительность"
  },
  {
    id: 33,
    question: "Когда стоит использовать useCallback для обработчиков событий?",
    options: [
      "Всегда",
      "Когда обработчик передаётся в дочерний компонент, обёрнутый в memo",
      "Никогда",
      "Только в классовых компонентах"
    ],
    correctAnswer: 1,
    explanation: "useCallback полезен, когда мемоизированная функция передаётся в дочерний компонент, обёрнутый в React.memo, или используется в зависимостях других хуков. В остальных случаях может быть излишним.",
    topic: "Производительность"
  },
  {
    id: 34,
    question: "Влияет ли event pooling на производительность в современном React?",
    options: [
      "Да, значительно ускоряет",
      "Нет, event pooling удалён в React 17+",
      "Только в production режиме",
      "Только для touch событий"
    ],
    correctAnswer: 1,
    explanation: "Event pooling был удалён в React 17, так как современные JavaScript движки достаточно эффективно работают с объектами, и оптимизация через пулинг больше не нужна.",
    topic: "Производительность"
  },
  {
    id: 35,
    question: "Как избежать создания новой функции при каждом рендере в классовых компонентах?",
    options: [
      "Привязать this в constructor через bind",
      "Использовать стрелочные функции как class fields",
      "Использовать декораторы",
      "Варианты A и B корректны"
    ],
    correctAnswer: 3,
    explanation: "Оба подхода корректны: bind в constructor создаёт функцию один раз при создании экземпляра, стрелочные функции как class fields тоже создаются один раз. Оба избегают создания новой функции при рендере.",
    topic: "Производительность"
  },

  // Тема 8: Практические сценарии
  {
    id: 36,
    question: "Как обработать клик вне компонента (click outside)?",
    options: [
      "Повесить обработчик на document через useEffect",
      "Использовать onClickOutside prop",
      "Это невозможно в React",
      "Использовать Portal"
    ],
    correctAnswer: 0,
    explanation: "Добавить обработчик на document через useEffect, проверять event.target и удалять обработчик при размонтировании: useEffect(() => { const handler = (e) => {...}; document.addEventListener('click', handler); return () => document.removeEventListener('click', handler); })",
    topic: "Практические сценарии"
  },
  {
    id: 37,
    question: "Как предотвратить двойной вызов обработчика при быстрых кликах?",
    options: [
      "Использовать debounce",
      "Использовать throttle",
      "Добавить флаг состояния обработки",
      "Все варианты применимы"
    ],
    correctAnswer: 3,
    explanation: "Можно использовать debounce (задержка после последнего вызова), throttle (ограничение частоты), или флаг isProcessing в state. Выбор зависит от требований к UX.",
    topic: "Практические сценарии"
  },
  {
    id: 38,
    question: "Как обработать событие только один раз?",
    options: [
      "Удалить обработчик после первого вызова",
      "Использовать флаг в state",
      "Использовать useRef для отслеживания",
      "Все варианты применимы"
    ],
    correctAnswer: 3,
    explanation: "Можно: 1) удалить обработчик после вызова, 2) проверять флаг в state, 3) использовать useRef для отслеживания без ре-рендера. Выбор зависит от нужно ли ре-рендерить компонент.",
    topic: "Практические сценарии"
  },
  {
    id: 39,
    question: "Как передать событие в родительский компонент?",
    options: [
      "Через callback prop",
      "Через Context API",
      "Через event.emit",
      "Это невозможно"
    ],
    correctAnswer: 0,
    explanation: "Стандартный паттерн — передать callback функцию через props: <Child onClick={handleClick} />. В дочернем компоненте вызвать: props.onClick(data). Это обеспечивает односторонний поток данных.",
    topic: "Практические сценарии"
  },
  {
    id: 40,
    question: "Как обработать разные события на одном элементе?",
    options: [
      "Использовать несколько prop: onClick, onMouseEnter и т.д.",
      "Использовать один обработчик для всех событий",
      "Это невозможно",
      "Только через addEventListener"
    ],
    correctAnswer: 0,
    explanation: "На одном элементе можно использовать множество event props: <div onClick={...} onMouseEnter={...} onFocus={...} />. Каждый обработчик вызывается независимо при соответствующем событии.",
    topic: "Практические сценарии"
  }
]
