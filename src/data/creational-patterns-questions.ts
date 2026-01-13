import type { Question } from '@/types/question.ts'

export const creationalPatternsQuestions: Question[] = [
  // Singleton
  {
    id: 1,
    question: "Какая основная цель паттерна Singleton?",
    options: [
      "Создание множества экземпляров класса",
      "Гарантия существования только одного экземпляра класса",
      "Упрощение создания объектов",
      "Клонирование объектов"
    ],
    correctAnswer: 1,
    explanation: "Singleton гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к нему. Это полезно для управления общими ресурсами.",
    topic: "Singleton"
  },
  {
    id: 2,
    question: "Какой из примеров НЕ является хорошим кандидатом для использования Singleton в frontend?",
    options: [
      "Store управления состоянием (Redux, Vuex)",
      "Сервис для работы с localStorage",
      "Компонент кнопки в React",
      "Logger для логирования ошибок"
    ],
    correctAnswer: 2,
    explanation: "Компонент кнопки должен создаваться множество раз в приложении. Singleton подходит для сервисов, которые должны существовать в единственном экземпляре.",
    topic: "Singleton"
  },
  {
    id: 3,
    question: "Как правильно реализовать Singleton в современном JavaScript?",
    options: [
      "Использовать глобальную переменную",
      "Экспортировать единственный экземпляр из модуля ES6",
      "Создать класс без конструктора",
      "Использовать множественное наследование"
    ],
    correctAnswer: 1,
    explanation: "В ES6 модули по умолчанию являются синглтонами. Экспорт единственного экземпляра из модуля - это идиоматичный способ реализации паттерна в современном JavaScript.",
    topic: "Singleton"
  },
  {
    id: 4,
    question: "Какая проблема может возникнуть при использовании Singleton?",
    options: [
      "Слишком много памяти",
      "Сложность тестирования из-за глобального состояния",
      "Медленная работа приложения",
      "Невозможность использования TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Singleton создает глобальное состояние, что усложняет тестирование: тесты могут влиять друг на друга через общий экземпляр. Также нарушается принцип инверсии зависимостей.",
    topic: "Singleton"
  },
  {
    id: 5,
    question: "Как Redux Store реализует паттерн Singleton?",
    options: [
      "Создает новый store при каждом вызове createStore",
      "Экспортирует единственный экземпляр store из модуля",
      "Использует статические методы класса",
      "Клонирует существующий store"
    ],
    correctAnswer: 1,
    explanation: "Redux Store обычно создается один раз с помощью createStore() и экспортируется как единственный экземпляр из модуля, что обеспечивает единое хранилище состояния для всего приложения.",
    topic: "Singleton"
  },

  // Factory
  {
    id: 6,
    question: "Какую проблему решает паттерн Factory?",
    options: [
      "Ускорение создания объектов",
      "Инкапсуляция логики создания объектов",
      "Уменьшение размера кода",
      "Упрощение наследования"
    ],
    correctAnswer: 1,
    explanation: "Factory инкапсулирует логику создания объектов, позволяя создавать объекты без указания их конкретных классов. Это особенно полезно когда логика создания сложная или зависит от условий.",
    topic: "Factory"
  },
  {
    id: 7,
    question: "Какой пример использования Factory в React?",
    options: [
      "useState hook",
      "useEffect hook",
      "React.createElement",
      "componentDidMount"
    ],
    correctAnswer: 2,
    explanation: "React.createElement - это factory метод, который создает React элементы. JSX транспилируется именно в вызовы React.createElement.",
    topic: "Factory"
  },
  {
    id: 8,
    question: "В чем разница между Factory Method и Abstract Factory?",
    options: [
      "Factory Method создает один объект, Abstract Factory - семейство связанных объектов",
      "Нет разницы, это синонимы",
      "Abstract Factory быстрее работает",
      "Factory Method используется только в ООП"
    ],
    correctAnswer: 0,
    explanation: "Factory Method предоставляет интерфейс для создания одного объекта, а Abstract Factory создает семейства связанных или взаимозависимых объектов без указания их конкретных классов.",
    topic: "Factory"
  },
  {
    id: 9,
    question: "Какой код демонстрирует паттерн Factory для создания компонентов уведомлений?",
    options: [
      "const notification = new Notification()",
      "function createNotification(type) { return type === 'success' ? new SuccessNotification() : new ErrorNotification() }",
      "class Notification extends Component {}",
      "const notification = { type: 'success' }"
    ],
    correctAnswer: 1,
    explanation: "Factory функция инкапсулирует логику выбора конкретного типа уведомления на основе переданного параметра, скрывая детали создания от клиентского кода.",
    topic: "Factory"
  },
  {
    id: 10,
    question: "Когда стоит использовать Factory вместо прямого создания объектов?",
    options: [
      "Всегда, это лучшая практика",
      "Когда логика создания сложная или зависит от условий",
      "Никогда, это устаревший паттерн",
      "Только в больших проектах"
    ],
    correctAnswer: 1,
    explanation: "Factory оправдан когда: логика создания сложная, тип создаваемого объекта определяется в runtime, нужно скрыть детали создания, или создается семейство связанных объектов.",
    topic: "Factory"
  },

  // Builder
  {
    id: 11,
    question: "Какую проблему решает паттерн Builder?",
    options: [
      "Создание объектов с большим количеством опциональных параметров",
      "Ускорение работы приложения",
      "Упрощение наследования",
      "Управление памятью"
    ],
    correctAnswer: 0,
    explanation: "Builder позволяет пошагово создавать сложные объекты, избегая конструкторов с множеством параметров (телескопический антипаттерн) и делая код более читаемым.",
    topic: "Builder"
  },
  {
    id: 12,
    question: "Какая библиотека в React экосистеме использует Builder-подобный паттерн?",
    options: [
      "Redux Toolkit (createSlice)",
      "React Router",
      "Axios",
      "Lodash"
    ],
    correctAnswer: 0,
    explanation: "Redux Toolkit's createSlice использует builder-подобный API для конфигурации slice: можно постепенно добавлять reducers, extraReducers, используя методы builder'а.",
    topic: "Builder"
  },
  {
    id: 13,
    question: "Какое преимущество дает Builder при создании HTTP запросов?",
    options: [
      "Быстрее отправляет запросы",
      "Позволяет пошагово настраивать параметры запроса",
      "Автоматически кеширует ответы",
      "Уменьшает размер payload"
    ],
    correctAnswer: 1,
    explanation: "Builder позволяет цепочкой вызовов настраивать запрос: .setUrl().setMethod().setHeaders().setBody(), что делает код более читаемым и гибким.",
    topic: "Builder"
  },
  {
    id: 14,
    question: "В чем отличие Builder от Factory?",
    options: [
      "Builder создает объект пошагово, Factory - одним вызовом",
      "Нет отличий",
      "Builder используется только для UI компонентов",
      "Factory более современный паттерн"
    ],
    correctAnswer: 0,
    explanation: "Factory создает и возвращает готовый объект одним вызовом, в то время как Builder позволяет пошагово конфигурировать объект перед его финальным созданием.",
    topic: "Builder"
  },
  {
    id: 15,
    question: "Какой пример демонстрирует Builder для создания Form конфигурации?",
    options: [
      "const form = { fields: [] }",
      "const form = new FormBuilder().addField('name').addField('email').setValidation().build()",
      "const form = createForm(['name', 'email'])",
      "class Form { constructor(fields) {} }"
    ],
    correctAnswer: 1,
    explanation: "Builder с цепочкой методов (fluent interface) позволяет пошагово добавлять поля, валидацию, правила и другие настройки формы, делая код декларативным и читаемым.",
    topic: "Builder"
  },

  // Prototype
  {
    id: 16,
    question: "Какая основная идея паттерна Prototype?",
    options: [
      "Наследование через прототипы",
      "Создание объектов путем клонирования существующих",
      "Создание новых классов",
      "Оптимизация памяти"
    ],
    correctAnswer: 1,
    explanation: "Prototype позволяет создавать новые объекты путем копирования (клонирования) существующего объекта-прототипа, вместо создания через конструктор.",
    topic: "Prototype"
  },
  {
    id: 17,
    question: "Какой JavaScript метод реализует паттерн Prototype?",
    options: [
      "Object.assign()",
      "Object.create()",
      "Object.freeze()",
      "Object.seal()"
    ],
    correctAnswer: 1,
    explanation: "Object.create(proto) создает новый объект с указанным прототипом, что является прямой реализацией паттерна Prototype в JavaScript.",
    topic: "Prototype"
  },
  {
    id: 18,
    question: "В чем проблема поверхностного копирования (shallow copy) в Prototype?",
    options: [
      "Медленная работа",
      "Вложенные объекты копируются по ссылке",
      "Большой размер памяти",
      "Невозможность клонирования функций"
    ],
    correctAnswer: 1,
    explanation: "При поверхностном копировании вложенные объекты и массивы копируются по ссылке, а не создаются новые. Изменение вложенного объекта в клоне повлияет на оригинал.",
    topic: "Prototype"
  },
  {
    id: 19,
    question: "Как выполнить глубокое клонирование объекта в JavaScript?",
    options: [
      "Object.assign()",
      "Spread оператор {...obj}",
      "structuredClone() или JSON.parse(JSON.stringify())",
      "Object.create()"
    ],
    correctAnswer: 2,
    explanation: "structuredClone() - современный способ глубокого клонирования. JSON.parse(JSON.stringify()) работает, но теряет функции, Date, RegExp и т.д. Spread и Object.assign делают только поверхностное копирование.",
    topic: "Prototype"
  },
  {
    id: 20,
    question: "Где в frontend разработке полезен паттерн Prototype?",
    options: [
      "Создание роутинга",
      "Клонирование сложных конфигурационных объектов",
      "Управление событиями",
      "Рендеринг компонентов"
    ],
    correctAnswer: 1,
    explanation: "Prototype полезен для клонирования сложных объектов конфигурации, состояний форм, настроек компонентов, когда нужно создать похожий объект с небольшими изменениями.",
    topic: "Prototype"
  },

  // Сравнение и комбинации
  {
    id: 21,
    question: "Можно ли комбинировать Singleton и Factory паттерны?",
    options: [
      "Нет, они взаимоисключающие",
      "Да, Factory может возвращать Singleton экземпляры",
      "Только в TypeScript",
      "Только для UI компонентов"
    ],
    correctAnswer: 1,
    explanation: "Factory метод может возвращать Singleton экземпляры. Например, createStore() в Redux - это factory, который создает единственный store (singleton).",
    topic: "Комбинации паттернов"
  },
  {
    id: 22,
    question: "Какой паттерн лучше для создания API клиента с множеством опций?",
    options: [
      "Singleton",
      "Builder",
      "Prototype",
      "Factory Method"
    ],
    correctAnswer: 1,
    explanation: "Builder идеален для API клиента: можно пошагово настраивать baseURL, headers, timeout, interceptors и т.д., делая конфигурацию понятной и гибкой.",
    topic: "Выбор паттерна"
  },
  {
    id: 23,
    question: "В чем основное преимущество порождающих паттернов?",
    options: [
      "Ускорение выполнения кода",
      "Отделение логики создания объектов от их использования",
      "Уменьшение размера бандла",
      "Автоматическое тестирование"
    ],
    correctAnswer: 1,
    explanation: "Порождающие паттерны инкапсулируют знание о том, какие конкретные классы использует система, отделяя создание объектов от их использования, что повышает гибкость и модульность.",
    topic: "Общие принципы"
  },
  {
    id: 24,
    question: "Какая проблема возникает при злоупотреблении Singleton в frontend?",
    options: [
      "Медленная загрузка страницы",
      "Глобальное состояние и сложность тестирования",
      "Большой размер бандла",
      "Проблемы с SEO"
    ],
    correctAnswer: 1,
    explanation: "Множество Singleton создают глобальное состояние, что затрудняет тестирование (невозможно изолировать тесты), отладку и понимание потока данных в приложении.",
    topic: "Антипаттерны"
  },
  {
    id: 25,
    question: "Как React Context API связан с порождающими паттернами?",
    options: [
      "Использует Singleton для хранения контекста",
      "Реализует Factory для создания провайдеров",
      "Комбинирует Provider (Factory) и Consumer для доступа к единому контексту",
      "Не связан с паттернами"
    ],
    correctAnswer: 2,
    explanation: "React.createContext() - это factory, создающий пару Provider/Consumer. Provider создает единый контекст (singleton-подобное поведение) для всех Consumer в поддереве.",
    topic: "Паттерны в React"
  },

  // Практическое применение
  {
    id: 26,
    question: "Какой паттерн использует Axios для создания экземпляров?",
    options: [
      "Singleton",
      "Factory (axios.create())",
      "Prototype",
      "Builder"
    ],
    correctAnswer: 1,
    explanation: "axios.create() - это factory метод, создающий новый экземпляр axios с заданной конфигурацией. Можно создать несколько экземпляров для разных API.",
    topic: "Практические примеры"
  },
  {
    id: 27,
    question: "Какой паттерн подходит для системы создания различных типов уведомлений (success, error, warning)?",
    options: [
      "Singleton",
      "Factory",
      "Builder",
      "Prototype"
    ],
    correctAnswer: 1,
    explanation: "Factory идеален для создания разных типов уведомлений: одна функция определяет какой конкретный класс создать на основе типа, скрывая детали создания.",
    topic: "Практические примеры"
  },
  {
    id: 28,
    question: "Как реализовать Registry паттерн для управления множественными Singleton?",
    options: [
      "Использовать глобальный объект",
      "Map/WeakMap для хранения экземпляров по ключу",
      "Массив экземпляров",
      "localStorage"
    ],
    correctAnswer: 1,
    explanation: "Registry использует Map для хранения Singleton экземпляров по ключу, позволяя получать нужный экземпляр через Registry.get(key), что полезно для управления несколькими сервисами.",
    topic: "Продвинутые техники"
  },
  {
    id: 29,
    question: "В чем преимущество использования Factory для создания React компонентов динамически?",
    options: [
      "Быстрее рендерятся",
      "Позволяет выбирать компонент на основе данных в runtime",
      "Меньше кода",
      "Лучше для SEO"
    ],
    correctAnswer: 1,
    explanation: "Factory позволяет динамически выбирать компонент для рендера на основе данных: const Component = componentFactory(data.type); return <Component />. Полезно для динамических форм, виджетов.",
    topic: "Динамическое создание"
  },
  {
    id: 30,
    question: "Какой паттерн использует lodash _.cloneDeep()?",
    options: [
      "Singleton",
      "Factory",
      "Prototype (глубокое клонирование)",
      "Builder"
    ],
    correctAnswer: 2,
    explanation: "_.cloneDeep() реализует паттерн Prototype с глубоким копированием: создает новый объект со всеми вложенными структурами, полностью независимый от оригинала.",
    topic: "Библиотечные реализации"
  },

  // Современные подходы
  {
    id: 31,
    question: "Как модули ES6 влияют на использование Singleton?",
    options: [
      "Делают Singleton устаревшим",
      "Модули сами по себе являются синглтонами",
      "Усложняют реализацию Singleton",
      "Не влияют никак"
    ],
    correctAnswer: 1,
    explanation: "ES6 модули кешируются после первого импорта, поэтому экспорт экземпляра из модуля автоматически создает Singleton без дополнительного кода проверки существования.",
    topic: "Современный JavaScript"
  },
  {
    id: 32,
    question: "Какой TypeScript паттерн заменяет классические Factory методы?",
    options: [
      "Generics",
      "Conditional Types",
      "Discriminated Unions с функциями создания",
      "Decorators"
    ],
    correctAnswer: 2,
    explanation: "TypeScript Discriminated Unions в сочетании с типизированными factory функциями обеспечивают type-safe создание объектов с автокомплитом и проверкой типов.",
    topic: "TypeScript паттерны"
  },
  {
    id: 33,
    question: "Как React Hooks изменили использование порождающих паттернов?",
    options: [
      "Сделали их ненужными",
      "Hooks сами являются factories для state и effects",
      "Усложнили реализацию паттернов",
      "Не повлияли"
    ],
    correctAnswer: 1,
    explanation: "Hooks как useState, useContext - это factory функции, создающие state и эффекты. Custom hooks - это переиспользуемые factories для логики с состоянием.",
    topic: "React Hooks"
  },
  {
    id: 34,
    question: "Что такое Object Pool паттерн и когда он полезен во frontend?",
    options: [
      "Хранение объектов в localStorage",
      "Переиспользование дорогих в создании объектов",
      "Группировка объектов по типу",
      "Удаление неиспользуемых объектов"
    ],
    correctAnswer: 1,
    explanation: "Object Pool переиспользует объекты вместо создания новых. Полезно для Canvas элементов, WebGL объектов, particle систем - когда создание объекта дорого, а нужно много экземпляров.",
    topic: "Оптимизация производительности"
  },
  {
    id: 35,
    question: "Как Dependency Injection связан с порождающими паттернами?",
    options: [
      "Не связан",
      "DI контейнер использует Factory для создания и Singleton для управления зависимостями",
      "DI заменяет все порождающие паттерны",
      "Работает только с Prototype"
    ],
    correctAnswer: 1,
    explanation: "DI контейнеры (InversifyJS, tsyringe) используют Factory для создания экземпляров и Singleton для управления жизненным циклом зависимостей, автоматизируя создание объектов.",
    topic: "Dependency Injection"
  },

  // Антипаттерны и ошибки
  {
    id: 36,
    question: "Какая ошибка часто встречается при реализации Singleton?",
    options: [
      "Слишком быстрое выполнение",
      "Создание нескольких экземпляров в многопоточной среде",
      "Невозможность использования наследования",
      "Большой размер памяти"
    ],
    correctAnswer: 1,
    explanation: "В многопоточных средах (Web Workers) без синхронизации можно создать несколько экземпляров. В JavaScript основного потока это не проблема, но нужно учитывать при работе с Workers.",
    topic: "Распространенные ошибки"
  },
  {
    id: 37,
    question: "Когда НЕ стоит использовать Factory?",
    options: [
      "Для простых объектов с прямым созданием",
      "Для сложных объектов",
      "В больших проектах",
      "С TypeScript"
    ],
    correctAnswer: 0,
    explanation: "Для простых объектов с очевидным созданием (new User()) Factory добавляет ненужную сложность. Используйте Factory когда логика создания нетривиальна или зависит от условий.",
    topic: "Когда не использовать"
  },
  {
    id: 38,
    question: "В чем проблема God Object Singleton?",
    options: [
      "Слишком быстро работает",
      "Singleton с слишком большой ответственностью, нарушение SRP",
      "Невозможность расширения",
      "Проблемы с памятью"
    ],
    correctAnswer: 1,
    explanation: "God Object - Singleton, который делает слишком много: управляет состоянием, логикой, API вызовами, UI. Это нарушает Single Responsibility Principle и затрудняет поддержку.",
    topic: "Антипаттерны"
  },
  {
    id: 39,
    question: "Почему Service Locator считается антипаттерном?",
    options: [
      "Медленно работает",
      "Скрывает зависимости, усложняет тестирование",
      "Сложен в реализации",
      "Не работает с TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Service Locator (централизованный registry Singleton для доступа к сервисам) скрывает явные зависимости класса, делая код менее понятным и тестируемым. Предпочтительнее Dependency Injection.",
    topic: "Антипаттерны"
  },
  {
    id: 40,
    question: "Какой подход лучше для современного frontend: Singleton или Dependency Injection?",
    options: [
      "Всегда Singleton",
      "Всегда DI",
      "DI для тестируемости, Singleton для простых случаев (stores, loggers)",
      "Использовать глобальные переменные"
    ],
    correctAnswer: 2,
    explanation: "DI обеспечивает лучшую тестируемость и модульность, но добавляет сложность. Singleton приемлем для stores, loggers, конфигурации. В React/Vue используйте Context/provide-inject как легковесную альтернативу DI.",
    topic: "Лучшие практики"
  }
]
