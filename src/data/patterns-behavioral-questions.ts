import type { Question } from '@/types/question.ts'

export const patternsBehavioralQuestions: Question[] = [
  // Strategy Pattern
  {
    id: 1,
    question: "Какую проблему решает паттерн Strategy во фронтенд-разработке?",
    options: [
      "Управление глобальным состоянием приложения",
      "Возможность менять алгоритмы валидации, сортировки или обработки данных без изменения кода компонента",
      "Создание единственного экземпляра класса",
      "Упрощение создания сложных объектов"
    ],
    correctAnswer: 1,
    explanation: "Strategy позволяет инкапсулировать различные алгоритмы в отдельные классы/функции и делать их взаимозаменяемыми. Это полезно для валидаторов форм, стратегий сортировки, форматирования данных.",
    topic: "Strategy"
  },
  {
    id: 2,
    question: "Какой из примеров демонстрирует паттерн Strategy в React?",
    options: [
      "const [state, setState] = useState(0)",
      "const validator = validators[type]; validator.validate(data)",
      "useEffect(() => { fetchData() }, [])",
      "const Component = memo(() => <div />)"
    ],
    correctAnswer: 1,
    explanation: "Выбор валидатора из объекта validators по типу и вызов его метода validate - классический пример Strategy. Алгоритм валидации выбирается динамически.",
    topic: "Strategy"
  },
  {
    id: 3,
    question: "Как Strategy помогает при работе с разными форматами данных (JSON, XML, CSV)?",
    options: [
      "Автоматически конвертирует форматы",
      "Позволяет иметь отдельные парсеры для каждого формата и выбирать нужный",
      "Кеширует результаты парсинга",
      "Сжимает данные перед отправкой"
    ],
    correctAnswer: 1,
    explanation: "Strategy позволяет создать парсеры для разных форматов (JSONParser, XMLParser, CSVParser) и динамически выбирать нужный парсер в зависимости от типа входных данных.",
    topic: "Strategy"
  },
  {
    id: 4,
    question: "В чем преимущество Strategy для валидации форм?",
    options: [
      "Увеличивает скорость валидации",
      "Позволяет легко добавлять новые правила валидации без изменения существующего кода",
      "Автоматически исправляет ошибки в данных",
      "Уменьшает размер бандла"
    ],
    correctAnswer: 1,
    explanation: "Strategy следует принципу Open/Closed: можно добавлять новые стратегии валидации (EmailValidator, PhoneValidator) без модификации существующего кода. Каждая стратегия независима.",
    topic: "Strategy"
  },
  {
    id: 5,
    question: "Какой хук React хорошо сочетается с паттерном Strategy?",
    options: [
      "useState для хранения текущей стратегии",
      "useEffect для смены стратегий",
      "useRef для кеширования стратегий",
      "useContext для глобальных стратегий"
    ],
    correctAnswer: 0,
    explanation: "useState идеально подходит для хранения текущей выбранной стратегии: const [sortStrategy, setSortStrategy] = useState('byDate'). Это позволяет переключаться между стратегиями динамически.",
    topic: "Strategy"
  },

  // Observer Pattern
  {
    id: 6,
    question: "Что представляет собой паттерн Observer во фронтенде?",
    options: [
      "Функция для наблюдения за изменениями DOM",
      "Механизм подписки на события, где объекты могут уведомлять подписчиков об изменениях",
      "Метод оптимизации рендеринга",
      "Способ создания глобальных переменных"
    ],
    correctAnswer: 1,
    explanation: "Observer - это поведенческий паттерн, где Subject (издатель) уведомляет всех Observers (подписчиков) об изменениях своего состояния. Во фронтенде это EventEmitter, RxJS, Redux subscriptions.",
    topic: "Observer"
  },
  {
    id: 7,
    question: "Какой встроенный браузерный API реализует паттерн Observer?",
    options: [
      "fetch API",
      "localStorage",
      "IntersectionObserver, MutationObserver, ResizeObserver",
      "requestAnimationFrame"
    ],
    correctAnswer: 2,
    explanation: "IntersectionObserver, MutationObserver и ResizeObserver - это реализации паттерна Observer. Они наблюдают за изменениями (пересечения, мутации DOM, изменения размеров) и уведомляют подписчиков.",
    topic: "Observer"
  },
  {
    id: 8,
    question: "Как паттерн Observer используется в Redux?",
    options: [
      "Redux не использует Observer",
      "store.subscribe() позволяет компонентам подписаться на изменения состояния",
      "Observer используется только для middleware",
      "Observer применяется для роутинга"
    ],
    correctAnswer: 1,
    explanation: "Redux Store - это Subject, а компоненты - Observers. store.subscribe(listener) регистрирует подписчиков, которые получают уведомления при каждом dispatch action.",
    topic: "Observer"
  },
  {
    id: 9,
    question: "Какая проблема возникает при неправильном использовании Observer?",
    options: [
      "Низкая производительность",
      "Утечки памяти из-за незавершенных подписок",
      "Невозможность тестирования",
      "Конфликты версий библиотек"
    ],
    correctAnswer: 1,
    explanation: "Если не отписываться от событий (unsubscribe), подписчики остаются в памяти даже после уничтожения компонента. В React важно делать cleanup в useEffect: return () => unsubscribe().",
    topic: "Observer"
  },
  {
    id: 10,
    question: "Что такое EventEmitter и как он связан с Observer?",
    options: [
      "Библиотека для анимаций",
      "Реализация паттерна Observer для создания кастомных событий (on, emit, off)",
      "Инструмент для отладки",
      "Альтернатива Redux"
    ],
    correctAnswer: 1,
    explanation: "EventEmitter - это классическая реализация Observer: методы on/addEventListener (подписка), emit/dispatch (уведомление), off/removeEventListener (отписка). Используется в Node.js и фронтенде.",
    topic: "Observer"
  },

  // Command Pattern
  {
    id: 11,
    question: "Какую задачу решает паттерн Command в контексте UI?",
    options: [
      "Оптимизацию рендеринга компонентов",
      "Инкапсуляцию действий (undo/redo, макрокоманды, отложенное выполнение)",
      "Управление стилями компонентов",
      "Валидацию форм"
    ],
    correctAnswer: 1,
    explanation: "Command инкапсулирует действие в объект с методами execute() и undo(). Это позволяет реализовать undo/redo, историю действий, макрокоманды, отложенное выполнение команд.",
    topic: "Command"
  },
  {
    id: 12,
    question: "Как Command используется для реализации undo/redo в текстовом редакторе?",
    options: [
      "Сохраняет весь документ после каждого изменения",
      "Каждое действие (insert, delete) - это Command с execute() и undo(), хранящиеся в стеке",
      "Использует localStorage для хранения истории",
      "Блокирует возможность отмены действий"
    ],
    correctAnswer: 1,
    explanation: "Каждая операция редактирования становится Command объектом. При execute() команда применяется и добавляется в history stack. Undo вызывает undo() последней команды. Redo - повторный execute().",
    topic: "Command"
  },
  {
    id: 13,
    question: "Какой пример из React/Redux демонстрирует паттерн Command?",
    options: [
      "React компоненты",
      "Actions в Redux - это Commands, dispatch - invoker",
      "Props передаваемые в компоненты",
      "CSS-in-JS стили"
    ],
    correctAnswer: 1,
    explanation: "Redux actions - это реализация Command: каждый action инкапсулирует команду (type, payload). dispatch - это invoker, который выполняет команду через reducers. Middleware может логировать, откладывать команды.",
    topic: "Command"
  },
  {
    id: 14,
    question: "Как Command помогает в реализации макрокоманд?",
    options: [
      "Command не поддерживает макрокоманды",
      "Можно создать CompositeCommand, который выполняет последовательность команд",
      "Макрокоманды требуют отдельного паттерна",
      "Макрокоманды работают только на сервере"
    ],
    correctAnswer: 1,
    explanation: "MacroCommand/CompositeCommand содержит массив команд и выполняет их последовательно в execute(). Undo() выполняет undo всех команд в обратном порядке. Полезно для batch операций.",
    topic: "Command"
  },
  {
    id: 15,
    question: "В чем преимущество Command для отложенного выполнения операций?",
    options: [
      "Команды выполняются быстрее",
      "Команды можно помещать в очередь, планировать, отменять до выполнения",
      "Команды не требуют памяти",
      "Команды всегда синхронны"
    ],
    correctAnswer: 1,
    explanation: "Command можно сохранить, передать, поместить в очередь и выполнить позже. Это полезно для: batch updates, scheduling, debouncing, queueing API requests, transactional operations.",
    topic: "Command"
  },

  // Iterator Pattern
  {
    id: 16,
    question: "Что такое паттерн Iterator в JavaScript?",
    options: [
      "Функция для циклов",
      "Интерфейс для последовательного доступа к элементам коллекции без раскрытия структуры",
      "Метод массивов для фильтрации",
      "Способ создания компонентов"
    ],
    correctAnswer: 1,
    explanation: "Iterator предоставляет унифицированный способ обхода коллекций через методы next(), done, value. В JS это протокол итерации (Symbol.iterator), используемый в for...of, spread, destructuring.",
    topic: "Iterator"
  },
  {
    id: 17,
    question: "Какие встроенные типы данных в JavaScript реализуют Iterator?",
    options: [
      "Только массивы",
      "Array, String, Map, Set, NodeList, arguments",
      "Только объекты",
      "Только примитивы"
    ],
    correctAnswer: 1,
    explanation: "Все эти типы имеют встроенный Symbol.iterator: массивы, строки, Map, Set, NodeList, arguments. Это позволяет использовать их в for...of и других конструкциях, работающих с итераторами.",
    topic: "Iterator"
  },
  {
    id: 18,
    question: "Как создать кастомный итератор для объекта?",
    options: [
      "Объекты всегда итерируемы",
      "Определить метод [Symbol.iterator]() { return { next() {...} } }",
      "Использовать Object.keys()",
      "Объекты нельзя сделать итерируемыми"
    ],
    correctAnswer: 1,
    explanation: "Чтобы сделать объект итерируемым, нужно определить метод [Symbol.iterator], возвращающий объект с методом next(), который возвращает {value, done}. После этого объект можно использовать в for...of.",
    topic: "Iterator"
  },
  {
    id: 19,
    question: "Как Generator упрощает создание Iterator?",
    options: [
      "Generator не связан с Iterator",
      "function* автоматически создает iterator, yield возвращает значения",
      "Generator работает только с промисами",
      "Generator медленнее обычных итераторов"
    ],
    correctAnswer: 1,
    explanation: "Generator функции (function*) автоматически создают iterator. yield приостанавливает выполнение и возвращает значение. Это упрощает создание итераторов по сравнению с ручной реализацией next().",
    topic: "Iterator"
  },
  {
    id: 20,
    question: "Где паттерн Iterator полезен во фронтенде?",
    options: [
      "Только для работы с массивами",
      "Пагинация данных, ленивая загрузка, обход древовидных структур (DOM, AST)",
      "Управление стилями",
      "Валидация форм"
    ],
    correctAnswer: 1,
    explanation: "Iterator полезен для: пагинации (получение порций данных по требованию), infinite scroll, обхода древовидных структур (DOM tree walker), lazy evaluation больших датасетов, streaming данных.",
    topic: "Iterator"
  },

  // Mediator Pattern
  {
    id: 21,
    question: "Какую проблему решает паттерн Mediator?",
    options: [
      "Оптимизацию памяти",
      "Уменьшение связанности компонентов, которые не общаются напрямую, а через посредника",
      "Ускорение рендеринга",
      "Управление роутингом"
    ],
    correctAnswer: 1,
    explanation: "Mediator инкапсулирует взаимодействие между объектами. Компоненты не ссылаются друг на друга напрямую, а общаются через mediator. Это уменьшает связанность и упрощает изменение логики взаимодействия.",
    topic: "Mediator"
  },
  {
    id: 22,
    question: "Какой инструмент React является примером Mediator?",
    options: [
      "useState",
      "Context API - mediator между провайдером и потребителями",
      "useEffect",
      "props"
    ],
    correctAnswer: 1,
    explanation: "Context API действует как Mediator: Provider предоставляет данные, Context - посредник, consumers получают данные через useContext. Компоненты не связаны напрямую, взаимодействие идет через Context.",
    topic: "Mediator"
  },
  {
    id: 23,
    question: "Как Event Bus реализует паттерн Mediator?",
    options: [
      "Event Bus не связан с Mediator",
      "Event Bus - централизованный посредник для pub/sub коммуникации между компонентами",
      "Event Bus только для обработки кликов",
      "Event Bus работает только в Node.js"
    ],
    correctAnswer: 1,
    explanation: "Event Bus - это Mediator для событийной коммуникации. Компоненты публикуют события в bus, другие подписываются. Компоненты не знают друг о друге, общение идет через централизованный bus.",
    topic: "Mediator"
  },
  {
    id: 24,
    question: "В чем отличие Mediator от Observer?",
    options: [
      "Нет отличий, это одно и то же",
      "Mediator координирует взаимодействие между объектами, Observer - односторонняя подписка на изменения",
      "Mediator работает только на клиенте",
      "Observer быстрее Mediator"
    ],
    correctAnswer: 1,
    explanation: "Observer: один источник (Subject) → много подписчиков (Observers), односторонняя связь. Mediator: централизованный координатор для двусторонней коммуникации между множеством объектов, которые могут не знать друг о друге.",
    topic: "Mediator"
  },
  {
    id: 25,
    question: "Когда использовать Mediator во фронтенде?",
    options: [
      "Всегда вместо прямого общения компонентов",
      "Когда много компонентов сложно взаимодействуют между собой",
      "Только для работы с формами",
      "Никогда, это устаревший паттерн"
    ],
    correctAnswer: 1,
    explanation: "Mediator полезен, когда: много компонентов взаимодействуют в сложных сценариях, нужно централизовать логику взаимодействия, компоненты не должны знать друг о друге. Примеры: чаты, collaborative editors, dashboards.",
    topic: "Mediator"
  },

  // Chain of Responsibility
  {
    id: 26,
    question: "Что представляет собой паттерн Chain of Responsibility?",
    options: [
      "Связь компонентов через props",
      "Цепочка обработчиков, где запрос передается по цепи, пока не будет обработан",
      "Метод оптимизации производительности",
      "Способ создания иерархии компонентов"
    ],
    correctAnswer: 1,
    explanation: "Chain of Responsibility - цепочка объектов-обработчиков. Запрос передается по цепи, каждый обработчик решает: обработать самому, передать дальше или остановить. Обработчики слабо связаны.",
    topic: "Chain of Responsibility"
  },
  {
    id: 27,
    question: "Где используется Chain of Responsibility в браузере?",
    options: [
      "В localStorage",
      "Event bubbling/capturing в DOM - события всплывают по цепочке родителей",
      "В fetch API",
      "В CSS селекторах"
    ],
    correctAnswer: 1,
    explanation: "Event bubbling/capturing - классический пример Chain of Responsibility. Событие распространяется по дереву DOM, каждый элемент может обработать событие или пропустить дальше. stopPropagation() останавливает цепочку.",
    topic: "Chain of Responsibility"
  },
  {
    id: 28,
    question: "Как Chain of Responsibility применяется для валидации форм?",
    options: [
      "Валидация не использует этот паттерн",
      "Цепочка валидаторов: required → format → custom, каждый может остановить или продолжить",
      "Вся валидация в одной функции",
      "Валидация только на сервере"
    ],
    correctAnswer: 1,
    explanation: "Можно создать цепочку валидаторов: RequiredValidator → EmailFormatValidator → UniqueEmailValidator. Каждый проверяет свое условие и либо передает дальше, либо возвращает ошибку, прерывая цепочку.",
    topic: "Chain of Responsibility"
  },
  {
    id: 29,
    question: "Как реализовать Chain of Responsibility для middleware?",
    options: [
      "Middleware не использует этот паттерн",
      "Каждый middleware вызывает next() для передачи управления следующему в цепи",
      "Middleware выполняются параллельно",
      "Middleware работает только на сервере"
    ],
    correctAnswer: 1,
    explanation: "Express/Redux middleware - это Chain of Responsibility: middleware1 → middleware2 → middleware3. Каждый вызывает next() для продолжения цепи или не вызывает для остановки. Порядок имеет значение.",
    topic: "Chain of Responsibility"
  },
  {
    id: 30,
    question: "В чем преимущество Chain of Responsibility?",
    options: [
      "Увеличивает скорость выполнения",
      "Гибкость: легко добавлять/удалять/переупорядочивать обработчики без изменения клиентского кода",
      "Уменьшает размер кода",
      "Упрощает отладку"
    ],
    correctAnswer: 1,
    explanation: "Chain of Responsibility следует Open/Closed: можно добавлять новые обработчики, менять порядок, убирать без модификации существующего кода. Single Responsibility: каждый обработчик отвечает за одну задачу.",
    topic: "Chain of Responsibility"
  },

  // Template Method
  {
    id: 31,
    question: "Что такое паттерн Template Method?",
    options: [
      "Шаблоны HTML разметки",
      "Базовый класс определяет скелет алгоритма, подклассы переопределяют отдельные шаги",
      "Способ создания React компонентов",
      "Библиотека шаблонизации"
    ],
    correctAnswer: 1,
    explanation: "Template Method определяет структуру алгоритма в базовом классе, оставляя реализацию некоторых шагов подклассам. Инверсия управления: базовый класс вызывает методы подклассов.",
    topic: "Template Method"
  },
  {
    id: 32,
    question: "Как Template Method используется в React lifecycle?",
    options: [
      "React не использует этот паттерн",
      "React.Component - template, методы componentDidMount, render - шаги, переопределяемые в подклассах",
      "Template Method только для функциональных компонентов",
      "Template Method устарел в React"
    ],
    correctAnswer: 1,
    explanation: "React.Component реализует Template Method: базовый класс определяет lifecycle flow (mounting → updating → unmounting), разработчики переопределяют хуки (componentDidMount, shouldComponentUpdate, render).",
    topic: "Template Method"
  },
  {
    id: 33,
    question: "Какой паттерн в hooks аналогичен Template Method?",
    options: [
      "Hooks не поддерживают Template Method",
      "Кастомные хуки, определяющие общую логику с параметризованными частями",
      "useState",
      "useEffect"
    ],
    correctAnswer: 1,
    explanation: "Custom hooks - функциональный аналог Template Method: useDataFetching(url) инкапсулирует общую логику (loading, error, fetch), параметры (url, transform) кастомизируют поведение для конкретных случаев.",
    topic: "Template Method"
  },
  {
    id: 34,
    question: "Как Template Method помогает при создании форм?",
    options: [
      "Формы не используют Template Method",
      "BaseForm определяет структуру (validate → submit → handle response), конкретные формы переопределяют validation/submit",
      "Формы всегда одинаковые",
      "Template Method работает только с таблицами"
    ],
    correctAnswer: 1,
    explanation: "Можно создать базовый FormComponent с методами: render(), validate(), submit(), handleSuccess(), handleError(). Конкретные формы (LoginForm, RegisterForm) наследуют и переопределяют специфичные методы.",
    topic: "Template Method"
  },
  {
    id: 35,
    question: "В чем преимущество Template Method?",
    options: [
      "Увеличивает скорость рендеринга",
      "Переиспользование кода: общая структура в одном месте, вариативность через переопределение",
      "Уменьшает размер bundle",
      "Упрощает тестирование"
    ],
    correctAnswer: 1,
    explanation: "Template Method избегает дублирования: общая логика (структура алгоритма) в базовом классе, специфичные детали в подклассах. DRY принцип: изменение алгоритма в одном месте влияет на все реализации.",
    topic: "Template Method"
  },

  // State Pattern
  {
    id: 36,
    question: "Какую проблему решает паттерн State?",
    options: [
      "Управление глобальным состоянием",
      "Изменение поведения объекта в зависимости от внутреннего состояния",
      "Кеширование данных",
      "Валидация форм"
    ],
    correctAnswer: 1,
    explanation: "State инкапсулирует состояния в отдельные классы. Объект делегирует поведение текущему состоянию. Вместо множества if/switch по состояниям, каждое состояние - отдельный объект с методами.",
    topic: "State"
  },
  {
    id: 37,
    question: "Пример State паттерна в UI компоненте?",
    options: [
      "Кнопка с состояниями: idle, loading, success, error - каждое со своим поведением и UI",
      "Простая кнопка без состояний",
      "Статический текст",
      "CSS анимация"
    ],
    correctAnswer: 0,
    explanation: "Button может быть в состояниях: IdleState (доступна), LoadingState (показывает спиннер, disabled), SuccessState (зеленая галочка), ErrorState (красный крестик). Каждое состояние имеет методы render(), handleClick().",
    topic: "State"
  },
  {
    id: 38,
    question: "Как State паттерн связан с конечными автоматами (FSM)?",
    options: [
      "Не связан",
      "State паттерн - OOP реализация FSM, каждое состояние - объект, переходы инкапсулированы",
      "FSM быстрее State паттерна",
      "FSM устарел"
    ],
    correctAnswer: 1,
    explanation: "Finite State Machine (FSM) - формальная модель, State паттерн - её реализация в ООП. В FSM есть состояния, переходы, события. State паттерн инкапсулирует каждое состояние в класс с методами перехода.",
    topic: "State"
  },
  {
    id: 39,
    question: "Библиотека XState использует какой паттерн?",
    options: [
      "Observer",
      "State - реализует hierarchical state machines для React/Vue",
      "Singleton",
      "Factory"
    ],
    correctAnswer: 1,
    explanation: "XState - библиотека для state machines в JS. Реализует State паттерн с расширениями: вложенные состояния, параллельные состояния, guards, actions. Визуализация переходов упрощает сложные UI флоу.",
    topic: "State"
  },
  {
    id: 40,
    question: "Когда использовать State паттерн вместо простых boolean флагов?",
    options: [
      "Всегда",
      "Когда много взаимозависимых состояний и сложная логика переходов",
      "Никогда",
      "Только для серверных приложений"
    ],
    correctAnswer: 1,
    explanation: "Для простых случаев (показать/скрыть) достаточно boolean. State паттерн нужен для: сложных флоу (checkout процесс, wizard), множества состояний с правилами переходов, когда логика в if/switch становится неуправляемой.",
    topic: "State"
  },

  // Memento Pattern
  {
    id: 41,
    question: "Что делает паттерн Memento?",
    options: [
      "Оптимизирует память",
      "Сохраняет и восстанавливает предыдущие состояния объекта (undo/redo, history)",
      "Кеширует HTTP запросы",
      "Управляет роутингом"
    ],
    correctAnswer: 1,
    explanation: "Memento сохраняет снимок состояния объекта (memento) во внешнем хранилище (caretaker), не нарушая инкапсуляцию. Позволяет откатываться к предыдущим состояниям. Ключ для undo/redo, time travel debugging.",
    topic: "Memento"
  },
  {
    id: 42,
    question: "Как Memento используется в Redux DevTools?",
    options: [
      "DevTools не использует Memento",
      "Каждое состояние после action сохраняется как memento, можно jump к любому",
      "DevTools использует только логи",
      "DevTools работает без сохранения состояний"
    ],
    correctAnswer: 1,
    explanation: "Redux DevTools сохраняет каждое состояние после dispatch action как memento. Time travel: можно перематывать вперед/назад по истории, jump to action. Это классический Memento для debugging.",
    topic: "Memento"
  },
  {
    id: 43,
    question: "Как реализовать Memento для текстового редактора?",
    options: [
      "Сохранять весь текст после каждого символа",
      "Сохранять snapshots состояния (текст, курсор) в history array, undo/redo перемещают по array",
      "Использовать localStorage",
      "Memento не подходит для редакторов"
    ],
    correctAnswer: 1,
    explanation: "При каждом значимом изменении создавать memento: { content, cursorPosition, timestamp }. Сохранять в history stack. Undo: восстанавливать предыдущий memento. Можно оптимизировать: хранить дельты вместо full snapshots.",
    topic: "Memento"
  },
  {
    id: 44,
    question: "Какая проблема может возникнуть при использовании Memento?",
    options: [
      "Невозможность восстановить состояние",
      "Большое потребление памяти при хранении всех состояний",
      "Медленный рендеринг",
      "Конфликты с другими паттернами"
    ],
    correctAnswer: 1,
    explanation: "Хранение полных копий состояния требует много памяти. Решения: лимит истории (последние N), сжатие старых snapshots, хранение дельт (diff) вместо полных копий, periodic cleanup, использование immutable структур.",
    topic: "Memento"
  },
  {
    id: 45,
    question: "Как Memento помогает в работе с формами?",
    options: [
      "Формы не используют Memento",
      "Сохранение черновиков, восстановление после перезагрузки страницы, multi-step wizard history",
      "Только для валидации",
      "Memento работает только с текстом"
    ],
    correctAnswer: 1,
    explanation: "Memento полезен для: автосохранение черновиков форм в localStorage, восстановление данных после случайного закрытия вкладки, история заполнения multi-step wizard для возврата к предыдущим шагам.",
    topic: "Memento"
  },

  // Visitor Pattern
  {
    id: 46,
    question: "Что представляет собой паттерн Visitor?",
    options: [
      "Счетчик посетителей сайта",
      "Добавление новых операций к структуре объектов без изменения классов объектов",
      "Паттерн для роутинга",
      "Способ кеширования"
    ],
    correctAnswer: 1,
    explanation: "Visitor позволяет добавлять операции к семейству классов без изменения самих классов. Операции инкапсулированы в visitor объектах. Объекты принимают visitor через метод accept(visitor).",
    topic: "Visitor"
  },
  {
    id: 47,
    question: "Где Visitor используется во фронтенде?",
    options: [
      "Visitor устарел для фронтенда",
      "Обход и трансформация AST (Abstract Syntax Tree) в Babel/ESLint",
      "Только для работы с формами",
      "Visitor работает только на сервере"
    ],
    correctAnswer: 1,
    explanation: "Babel и ESLint используют Visitor для обхода AST. Каждый узел дерева (Node, Expression, Statement) принимает visitor, который может трансформировать, валидировать или собирать информацию о коде.",
    topic: "Visitor"
  },
  {
    id: 48,
    question: "Как Visitor помогает при работе с DOM деревом?",
    options: [
      "DOM автоматически использует Visitor",
      "Можно создать DOMVisitor для обхода дерева и применения операций (сбор данных, трансформация, валидация)",
      "Visitor не работает с DOM",
      "DOM не поддерживает паттерны"
    ],
    correctAnswer: 1,
    explanation: "Можно создать visitor для обхода DOM: CollectLinksVisitor (собирает все ссылки), ValidateFormsVisitor (проверяет формы), TrackingVisitor (добавляет аналитику). TreeWalker API упрощает реализацию.",
    topic: "Visitor"
  },
  {
    id: 49,
    question: "В чем преимущество Visitor перед добавлением методов в классы?",
    options: [
      "Visitor быстрее выполняется",
      "Open/Closed: новые операции без модификации существующих классов, Single Responsibility",
      "Visitor проще в реализации",
      "Visitor уменьшает размер кода"
    ],
    correctAnswer: 1,
    explanation: "Вместо добавления методов в классы (нарушает Open/Closed при каждой новой операции), Visitor инкапсулирует операции отдельно. Классы стабильны, операции легко добавляются/изменяются/удаляются.",
    topic: "Visitor"
  },
  {
    id: 50,
    question: "Когда НЕ стоит использовать Visitor?",
    options: [
      "Visitor всегда лучше альтернатив",
      "Когда структура объектов часто меняется (новые типы), а операции стабильны",
      "Visitor подходит для всех случаев",
      "Когда нужна высокая производительность"
    ],
    correctAnswer: 1,
    explanation: "Visitor усложняется при добавлении новых типов в иерархию (нужно обновлять все visitors). Лучше для стабильной структуры с множеством операций. Если структура меняется часто - лучше добавлять методы в классы.",
    topic: "Visitor"
  }
]
