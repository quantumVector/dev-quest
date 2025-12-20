import type { Question } from '@/types/question.ts'

export const patternsStructuralQuestions: Question[] = [
  // Тема 1: Adapter (Адаптер)
  {
    id: 1,
    question: "Какую основную проблему решает паттерн Adapter во фронтенде?",
    options: [
      "Оптимизацию производительности приложения",
      "Совместимость несовместимых интерфейсов компонентов или библиотек",
      "Управление состоянием приложения",
      "Кэширование данных"
    ],
    correctAnswer: 1,
    explanation: "Adapter позволяет объектам с несовместимыми интерфейсами работать вместе. Во фронтенде часто используется для интеграции сторонних библиотек, API с разными форматами данных или миграции между версиями библиотек.",
    topic: "Adapter"
  },
  {
    id: 2,
    question: "В каком случае целесообразно использовать Adapter во фронтенд-приложении?",
    options: [
      "Когда нужно добавить новую функциональность к компоненту",
      "Когда API возвращает данные в формате, отличном от ожидаемого приложением",
      "Когда нужно управлять глобальным состоянием",
      "Когда нужно оптимизировать рендеринг списков"
    ],
    correctAnswer: 1,
    explanation: "Adapter идеален для преобразования данных между разными форматами. Например, когда REST API возвращает snake_case, а приложение использует camelCase, или когда нужно адаптировать GraphQL response к существующим интерфейсам компонентов.",
    topic: "Adapter"
  },
  {
    id: 3,
    question: "Какой пример лучше всего демонстрирует Adapter pattern для интеграции сторонней библиотеки?",
    options: [
      "Создание wrapper компонента вокруг сторонней библиотеки с собственным API",
      "Прямое использование сторонней библиотеки в компонентах",
      "Копирование кода библиотеки в проект",
      "Создание глобального state manager"
    ],
    correctAnswer: 0,
    explanation: "Создание wrapper компонента - классический пример Adapter. Например, обернуть moment.js в адаптер для date-fns API, чтобы в будущем легко мигрировать без изменения всего кода приложения.",
    topic: "Adapter"
  },
  {
    id: 4,
    question: "Как Adapter помогает при миграции между разными версиями библиотек?",
    options: [
      "Автоматически обновляет код",
      "Создает промежуточный слой, изолирующий изменения API от остального кода",
      "Удаляет deprecated функции",
      "Оптимизирует bundle size"
    ],
    correctAnswer: 1,
    explanation: "Adapter создает абстракцию над библиотекой. При миграции с React Class Components на Hooks можно создать адаптер, предоставляющий единый API, изменяя только его реализацию без рефакторинга всех компонентов.",
    topic: "Adapter"
  },
  {
    id: 5,
    question: "Какой недостаток может возникнуть при избыточном использовании Adapter паттерна?",
    options: [
      "Улучшение производительности",
      "Дополнительный слой абстракции, усложняющий отладку и увеличивающий overhead",
      "Упрощение кода",
      "Автоматическое тестирование"
    ],
    correctAnswer: 1,
    explanation: "Каждый Adapter добавляет слой абстракции, что может усложнить stack trace при ошибках и добавить незначительный performance overhead. Важно использовать паттерн только там, где он действительно нужен.",
    topic: "Adapter"
  },
  {
    id: 6,
    question: "Как реализовать Adapter для преобразования данных из REST API в формат компонента?",
    options: [
      "Изменить backend API",
      "Создать функцию-адаптер, трансформирующую response перед передачей в компонент",
      "Использовать inline преобразования в каждом компоненте",
      "Не использовать данные от API"
    ],
    correctAnswer: 1,
    explanation: "Функция-адаптер (например, adaptUserResponse) централизует логику преобразования: const adaptUserResponse = (apiData) => ({ userId: apiData.user_id, userName: apiData.user_name }). Это делает код чище и упрощает изменения формата.",
    topic: "Adapter"
  },

  // Тема 2: Decorator (Декоратор)
  {
    id: 7,
    question: "Какую основную задачу решает паттерн Decorator во фронтенде?",
    options: [
      "Управление маршрутизацией",
      "Динамическое добавление функциональности к объектам/компонентам без изменения их кода",
      "Валидация форм",
      "Оптимизация изображений"
    ],
    correctAnswer: 1,
    explanation: "Decorator позволяет добавлять новое поведение объектам, оборачивая их в специальные wrapper-объекты. Во фронтенде часто используется через HOC (Higher-Order Components) или TypeScript decorators для добавления логики без модификации оригинального компонента.",
    topic: "Decorator"
  },
  {
    id: 8,
    question: "Какой пример лучше всего демонстрирует Decorator pattern в React?",
    options: [
      "Использование useState хука",
      "Higher-Order Component (HOC), добавляющий логику аутентификации",
      "Создание нового компонента с нуля",
      "Использование CSS модулей"
    ],
    correctAnswer: 1,
    explanation: "HOC - это классический Decorator в React. Например, withAuth(Component) возвращает новый компонент с проверкой авторизации, не изменяя оригинальный Component. Это позволяет переиспользовать логику аутентификации.",
    topic: "Decorator"
  },
  {
    id: 9,
    question: "В чем отличие Decorator от наследования при расширении функциональности?",
    options: [
      "Decorator быстрее работает",
      "Decorator использует композицию вместо наследования, позволяя динамически комбинировать поведение",
      "Decorator работает только с классами",
      "Отличий нет"
    ],
    correctAnswer: 1,
    explanation: "Decorator использует композицию (обертывание), а не наследование. Это позволяет динамически комбинировать декораторы: withAuth(withLoading(withErrorBoundary(Component))). С наследованием пришлось бы создавать множество классов для каждой комбинации.",
    topic: "Decorator"
  },
  {
    id: 10,
    question: "Как TypeScript decorators помогают в организации кода компонентов?",
    options: [
      "Автоматически генерируют тесты",
      "Позволяют декларативно добавлять метаданные и модифицировать классы/методы",
      "Компилируют TypeScript в JavaScript",
      "Удаляют неиспользуемый код"
    ],
    correctAnswer: 1,
    explanation: "TypeScript decorators (например, @Component, @Input в Angular) позволяют декларативно добавлять поведение. Например, @Memoize может автоматически кэшировать результаты метода, @Debounce - добавлять debouncing к обработчикам событий.",
    topic: "Decorator"
  },
  {
    id: 11,
    question: "Какой недостаток может возникнуть при чрезмерном использовании декораторов?",
    options: [
      "Улучшение читаемости кода",
      "Сложность отладки из-за множественных слоев обертки и неявного поведения",
      "Ускорение разработки",
      "Автоматическая оптимизация"
    ],
    correctAnswer: 1,
    explanation: "Множественные декораторы создают глубокую вложенность, усложняя понимание того, что происходит с компонентом. Stack trace становится длиннее, а поведение менее очевидным. Важен баланс между переиспользованием и читаемостью.",
    topic: "Decorator"
  },
  {
    id: 12,
    question: "Как React Hooks (например, useEffect, useMemo) связаны с паттерном Decorator?",
    options: [
      "Hooks заменяют Decorator pattern",
      "Hooks - это современная альтернатива HOC, реализующая композицию поведения",
      "Hooks не связаны с Decorator",
      "Hooks медленнее Decorator"
    ],
    correctAnswer: 1,
    explanation: "Hooks предоставляют более простой способ композиции поведения по сравнению с HOC. Вместо withWindowSize(withTheme(Component)) можно использовать useWindowSize() и useTheme() внутри компонента, избегая 'wrapper hell'.",
    topic: "Decorator"
  },

  // Тема 3: Proxy (Заместитель)
  {
    id: 13,
    question: "Какую основную функцию выполняет паттерн Proxy во фронтенде?",
    options: [
      "Управление CSS стилями",
      "Контроль доступа к объекту через промежуточный объект-заместитель",
      "Компиляция кода",
      "Роутинг приложения"
    ],
    correctAnswer: 1,
    explanation: "Proxy предоставляет объект-заместитель, контролирующий доступ к другому объекту. Во фронтенде используется для ленивой загрузки, валидации, логирования, реактивности (Vue 3). JavaScript Proxy API позволяет перехватывать операции с объектами.",
    topic: "Proxy"
  },
  {
    id: 14,
    question: "Как JavaScript Proxy API используется для создания реактивной системы?",
    options: [
      "Proxy не используется для реактивности",
      "Proxy перехватывает get/set операции, отслеживая изменения и триггеря обновления",
      "Proxy только для валидации данных",
      "Proxy работает только с примитивами"
    ],
    correctAnswer: 1,
    explanation: "Vue 3 использует Proxy для реактивности: при get собирает зависимости, при set триггерит обновления. const reactive = new Proxy(obj, { get(target, key) { track(key); return target[key]; }, set(target, key, value) { target[key] = value; trigger(key); } })",
    topic: "Proxy"
  },
  {
    id: 15,
    question: "В каком случае Proxy паттерн полезен для оптимизации загрузки модулей?",
    options: [
      "Proxy не влияет на загрузку",
      "Virtual Proxy позволяет отложить создание тяжелого объекта до первого обращения",
      "Proxy ускоряет сеть",
      "Proxy сжимает модули"
    ],
    correctAnswer: 1,
    explanation: "Virtual Proxy откладывает инициализацию. Например, можно создать proxy для тяжелой библиотеки, который загрузит ее только при первом вызове метода: const chartProxy = new Proxy({}, { get: (_, prop) => { if (!chart) chart = await import('chart.js'); return chart[prop]; } })",
    topic: "Proxy"
  },
  {
    id: 16,
    question: "Как Protection Proxy может использоваться для контроля доступа к данным?",
    options: [
      "Шифрует данные",
      "Проверяет права доступа перед выполнением операций с объектом",
      "Удаляет данные",
      "Копирует данные"
    ],
    correctAnswer: 1,
    explanation: "Protection Proxy проверяет разрешения: const userProxy = new Proxy(user, { get(target, prop) { if (!hasPermission(prop)) throw new Error('Access denied'); return target[prop]; }, set(target, prop, value) { if (!canModify(prop)) throw new Error('Read-only'); target[prop] = value; } })",
    topic: "Proxy"
  },
  {
    id: 17,
    question: "Какое преимущество дает использование Proxy для валидации данных в формах?",
    options: [
      "Автоматическая отправка формы",
      "Централизованная валидация при изменении любого поля через set trap",
      "Визуализация ошибок",
      "Стилизация полей"
    ],
    correctAnswer: 1,
    explanation: "Proxy позволяет перехватывать все изменения: const form = new Proxy(data, { set(target, key, value) { if (!validate(key, value)) throw new Error('Invalid'); target[key] = value; notifyListeners(key); return true; } }). Вся валидация в одном месте.",
    topic: "Proxy"
  },
  {
    id: 18,
    question: "Какой недостаток имеет Proxy API в контексте производительности?",
    options: [
      "Proxy всегда быстрее прямого доступа",
      "Перехват операций добавляет overhead, который может быть заметен при частых обращениях",
      "Proxy не работает в браузерах",
      "Proxy увеличивает размер кода"
    ],
    correctAnswer: 1,
    explanation: "Каждая операция через Proxy вызывает trap функцию, что медленнее прямого доступа. В циклах с миллионами итераций это заметно. Vue 3 оптимизирует это, отслеживая только используемые свойства и используя shallow reactive для вложенных объектов.",
    topic: "Proxy"
  },

  // Тема 4: Facade (Фасад)
  {
    id: 19,
    question: "Какую проблему решает паттерн Facade во фронтенд-приложениях?",
    options: [
      "Оптимизацию изображений",
      "Упрощение сложного API или набора интерфейсов через единый простой интерфейс",
      "Управление памятью",
      "Валидацию типов"
    ],
    correctAnswer: 1,
    explanation: "Facade предоставляет простой интерфейс к сложной подсистеме. Например, вместо работы с fetch, обработкой ошибок, парсингом JSON, можно создать API facade: api.getUsers(), который скрывает всю сложность.",
    topic: "Facade"
  },
  {
    id: 20,
    question: "Какой пример лучше демонстрирует Facade для работы с LocalStorage?",
    options: [
      "Прямое использование localStorage.getItem/setItem в компонентах",
      "Создание Storage service с методами save/load/clear, скрывающими JSON.parse/stringify и error handling",
      "Использование глобальных переменных",
      "Отказ от localStorage"
    ],
    correctAnswer: 1,
    explanation: "Storage Facade инкапсулирует сложность: class Storage { save(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) { handleQuotaExceeded(e); } } load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } } }",
    topic: "Facade"
  },
  {
    id: 21,
    question: "Как Facade помогает при работе со сложными библиотеками, например, D3.js?",
    options: [
      "Facade не применим к библиотекам визуализации",
      "Создание wrapper с высокоуровневыми методами (createChart, updateData), скрывающими low-level D3 API",
      "Полная замена библиотеки",
      "Автоматическая генерация графиков"
    ],
    correctAnswer: 1,
    explanation: "D3 Facade может выглядеть так: class ChartFacade { createBarChart(container, data, options) { /* сложная D3 логика setup, scales, axes, transitions */ } update(data) { /* D3 update pattern */ } }. Компоненты используют простой API, не зная детали D3.",
    topic: "Facade"
  },
  {
    id: 22,
    question: "В чем преимущество Facade при интеграции нескольких API сервисов?",
    options: [
      "Ускоряет сетевые запросы",
      "Единая точка входа, скрывающая различия между API и упрощающая их использование",
      "Автоматически кэширует данные",
      "Удаляет дублирующиеся запросы"
    ],
    correctAnswer: 1,
    explanation: "API Facade объединяет разные сервисы: class APIFacade { async getUser(id) { const [profile, settings, posts] = await Promise.all([profileAPI.get(id), settingsAPI.fetch(id), postsAPI.list(id)]); return combineUserData(profile, settings, posts); } }. Компоненты работают с одним методом.",
    topic: "Facade"
  },
  {
    id: 23,
    question: "Какой риск несет создание слишком 'толстого' Facade?",
    options: [
      "Улучшение производительности",
      "Facade становится God Object с избыточной ответственностью, нарушая Single Responsibility",
      "Упрощение тестирования",
      "Автоматическая документация"
    ],
    correctAnswer: 1,
    explanation: "Слишком большой Facade нарушает SRP и становится трудным для поддержки. Лучше создавать несколько специализированных фасадов: UserFacade, PaymentFacade, NotificationFacade вместо одного AppFacade со всей логикой.",
    topic: "Facade"
  },
  {
    id: 24,
    question: "Как Facade упрощает миграцию между различными реализациями?",
    options: [
      "Автоматически мигрирует код",
      "Изоляция деталей реализации позволяет менять их без изменения клиентского кода",
      "Удаляет старый код",
      "Генерирует новую реализацию"
    ],
    correctAnswer: 1,
    explanation: "При смене хранилища с localStorage на IndexedDB меняется только реализация StorageFacade, а все компоненты продолжают использовать те же методы save/load. Фасад скрывает изменения в подсистеме от остального приложения.",
    topic: "Facade"
  },

  // Тема 5: Composite (Компоновщик)
  {
    id: 25,
    question: "Какую задачу решает паттерн Composite во фронтенде?",
    options: [
      "Управление состоянием",
      "Работу с древовидными структурами объектов как с единым объектом",
      "Валидацию данных",
      "Оптимизацию запросов"
    ],
    correctAnswer: 1,
    explanation: "Composite позволяет строить дерево объектов и работать с ними единообразно. Во фронтенде это естественно для React component tree, где любой компонент может быть листом или контейнером с children, но API одинаковый.",
    topic: "Composite"
  },
  {
    id: 26,
    question: "Как React компоненты демонстрируют паттерн Composite?",
    options: [
      "React не использует Composite",
      "Компоненты могут содержать children, формируя дерево, где каждый узел обрабатывается одинаково",
      "Composite работает только с HTML",
      "Composite только для styled-components"
    ],
    correctAnswer: 1,
    explanation: "React компоненты - это Composite: <Layout><Header/><Content><Article/></Content><Footer/></Layout>. Layout не знает, что внутри - примитив или композит. Все компоненты имеют props.children и одинаковый lifecycle.",
    topic: "Composite"
  },
  {
    id: 27,
    question: "В каком случае Composite паттерн особенно полезен для UI компонентов?",
    options: [
      "При работе с формами",
      "При построении меню, деревьев файлов, комментариев с вложенностью",
      "При валидации полей",
      "При работе с таблицами"
    ],
    correctAnswer: 1,
    explanation: "Composite идеален для рекурсивных структур: const MenuItem = ({item}) => <li>{item.label} {item.children && <ul>{item.children.map(child => <MenuItem item={child}/>)}</ul>}</li>. Одинаковая обработка узлов любого уровня вложенности.",
    topic: "Composite"
  },
  {
    id: 28,
    question: "Как Composite помогает при валидации форм с вложенными полями?",
    options: [
      "Composite не применим к формам",
      "Форма и группы полей могут иметь единый интерфейс validate(), рекурсивно проверяя все уровни",
      "Автоматически исправляет ошибки",
      "Отключает валидацию"
    ],
    correctAnswer: 1,
    explanation: "Form Composite: class Form { validate() { return this.fields.every(f => f.validate()); } } class FieldGroup { validate() { return this.fields.every(f => f.validate()); } } class Field { validate() { return this.isValid; } }. Вызов form.validate() проверяет всё дерево.",
    topic: "Composite"
  },
  {
    id: 29,
    question: "Какое преимущество дает Composite при работе с permission системой в UI?",
    options: [
      "Автоматически выдает права",
      "Разрешения могут проверяться рекурсивно: если у контейнера нет доступа, все дети скрыты",
      "Шифрует данные",
      "Логирует действия"
    ],
    correctAnswer: 1,
    explanation: "Permission Composite: const ProtectedSection = ({permission, children}) => { if (!hasPermission(permission)) return null; return <>{children}</>; }. Вложенные секции автоматически наследуют ограничения родителя через композицию.",
    topic: "Composite"
  },
  {
    id: 30,
    question: "Какой недостаток может возникнуть при глубокой вложенности в Composite?",
    options: [
      "Упрощение кода",
      "Проблемы с производительностью при рендеринге и сложность отладки глубоких деревьев",
      "Автоматическая оптимизация",
      "Улучшение читаемости"
    ],
    correctAnswer: 1,
    explanation: "Глубокие деревья замедляют React reconciliation и усложняют DevTools. Stack trace становится огромным. Решения: виртуализация списков, мемоизация, flatten структур где возможно, использование React.memo на ветках дерева.",
    topic: "Composite"
  },

  // Тема 6: Bridge (Мост)
  {
    id: 31,
    question: "Какую проблему решает паттерн Bridge во фронтенде?",
    options: [
      "Управление роутингом",
      "Отделение абстракции от реализации, позволяя им изменяться независимо",
      "Кэширование данных",
      "Валидация форм"
    ],
    correctAnswer: 1,
    explanation: "Bridge разделяет абстракцию (что делать) и реализацию (как делать). Например, UI компонент (абстракция) и способ рендеринга (Canvas/SVG/WebGL - реализация) могут меняться независимо через общий интерфейс.",
    topic: "Bridge"
  },
  {
    id: 32,
    question: "Как Bridge помогает при создании кроссплатформенных компонентов?",
    options: [
      "Автоматически адаптирует под платформы",
      "Компонент использует абстрактный интерфейс, а конкретная реализация (web/mobile) подключается через bridge",
      "Компилирует код для разных платформ",
      "Удаляет платформо-специфичный код"
    ],
    correctAnswer: 1,
    explanation: "React Native Bridge: компонент <Button> использует абстракцию, а реализация подменяется: Web -> <button>, iOS -> UIButton, Android -> android.widget.Button. Логика компонента не зависит от платформы.",
    topic: "Bridge"
  },
  {
    id: 33,
    question: "В каком случае Bridge полезен для темизации приложения?",
    options: [
      "Bridge не связан с темами",
      "Theme abstraction отделена от конкретных implementation (CSS, styled-components, emotion)",
      "Автоматически генерирует темы",
      "Удаляет неиспользуемые стили"
    ],
    correctAnswer: 1,
    explanation: "Theme Bridge: const theme = useTheme(); // абстракция. Реализация может быть через CSS variables, styled-components ThemeProvider, или Tailwind. Компоненты используют theme.colors.primary, не зная как это реализовано.",
    topic: "Bridge"
  },
  {
    id: 34,
    question: "Как Bridge применяется при работе с различными state management решениями?",
    options: [
      "Bridge заменяет state management",
      "Создается абстрактный слой над state, позволяющий менять реализацию (Redux/MobX/Zustand)",
      "Объединяет все state managers",
      "Удаляет состояние"
    ],
    correctAnswer: 1,
    explanation: "State Bridge: интерфейс useAppState() - абстракция. Реализация может быть через Redux (useSelector), Zustand (useStore), или Context. Компоненты не зависят от конкретного state manager, упрощая миграцию.",
    topic: "Bridge"
  },
  {
    id: 35,
    question: "Какое преимущество дает Bridge при работе с разными API транспортами?",
    options: [
      "Ускоряет запросы",
      "API client (абстракция) работает с любым транспортом (REST/GraphQL/WebSocket) через единый интерфейс",
      "Автоматически кэширует данные",
      "Удаляет дублирующиеся запросы"
    ],
    correctAnswer: 1,
    explanation: "API Bridge: class APIClient { constructor(transport) { this.transport = transport; } getUser(id) { return this.transport.request('/users/' + id); } }. Transport может быть RestTransport, GraphQLTransport, MockTransport для тестов.",
    topic: "Bridge"
  },
  {
    id: 36,
    question: "Какой риск несет чрезмерное использование Bridge паттерна?",
    options: [
      "Упрощение архитектуры",
      "Over-engineering: излишняя абстракция для случаев, где реализация вряд ли изменится",
      "Автоматическая оптимизация",
      "Улучшение производительности"
    ],
    correctAnswer: 1,
    explanation: "Не стоит создавать Bridge для каждого компонента 'на всякий случай'. Если вероятность смены реализации низка, абстракция добавляет сложности без пользы. Используйте YAGNI: добавляйте Bridge когда действительно нужна гибкость.",
    topic: "Bridge"
  },

  // Тема 7: Flyweight (Приспособленец)
  {
    id: 37,
    question: "Какую проблему решает паттерн Flyweight во фронтенде?",
    options: [
      "Управление маршрутизацией",
      "Экономия памяти через разделение общего состояния между множеством объектов",
      "Валидация данных",
      "Обработка событий"
    ],
    correctAnswer: 1,
    explanation: "Flyweight экономит память, разделяя общие данные (intrinsic state) между объектами и храня уникальные данные (extrinsic state) отдельно. Во фронтенде применяется для оптимизации списков, канваса, 3D сцен с тысячами объектов.",
    topic: "Flyweight"
  },
  {
    id: 38,
    question: "Как Flyweight помогает при рендеринге больших списков однотипных элементов?",
    options: [
      "Удаляет элементы",
      "Переиспользует DOM узлы и компоненты, храня только уникальные данные для каждого элемента",
      "Автоматически виртуализирует список",
      "Сжимает данные"
    ],
    correctAnswer: 1,
    explanation: "React virtualization (react-window) использует Flyweight: создается пул компонентов (flyweights), которые переиспользуются с разными данными. Вместо 10000 DOM узлов - только видимые (~20), с подменой данных при скролле.",
    topic: "Flyweight"
  },
  {
    id: 39,
    question: "В каком случае Flyweight особенно эффективен для Canvas/WebGL приложений?",
    options: [
      "При отрисовке одного объекта",
      "При рендеринге тысяч схожих объектов (частицы, спрайты, тайлы)",
      "При работе с текстом",
      "Flyweight не применим к canvas"
    ],
    correctAnswer: 1,
    explanation: "Particle System Flyweight: один ParticleRenderer (intrinsic - текстура, shader) используется для всех частиц, а position, velocity, color (extrinsic) хранятся в массиве. Вместо 1000 объектов с текстурой - одна текстура + 1000 позиций.",
    topic: "Flyweight"
  },
  {
    id: 40,
    question: "Как Flyweight применяется при работе с иконками в приложении?",
    options: [
      "Каждая иконка - отдельный компонент",
      "SVG спрайты или icon font - flyweight, id/className - extrinsic state",
      "Иконки хранятся как base64",
      "Иконки генерируются динамически"
    ],
    correctAnswer: 1,
    explanation: "Icon Flyweight: <use xlinkHref='#icon-star'/> ссылается на общее определение в <symbol id='icon-star'>. Один SVG path переиспользуется для всех звезд, меняется только позиция, цвет, размер (extrinsic state).",
    topic: "Flyweight"
  },
  {
    id: 41,
    question: "Какое преимущество Flyweight при работе с таблицами с тысячами ячеек?",
    options: [
      "Автоматическая сортировка",
      "Ячейки одного типа переиспользуют форматтеры, валидаторы, рендереры (intrinsic)",
      "Фильтрация данных",
      "Экспорт в Excel"
    ],
    correctAnswer: 1,
    explanation: "Table Flyweight: CellRenderer для типа 'number' создается один раз (intrinsic). Тысячи числовых ячеек используют этот же рендерер, передавая только значение и координаты (extrinsic). Экономия памяти на повторяющейся логике.",
    topic: "Flyweight"
  },
  {
    id: 42,
    question: "Какой недостаток может возникнуть при использовании Flyweight?",
    options: [
      "Улучшение читаемости",
      "Усложнение кода из-за разделения состояния на intrinsic/extrinsic части",
      "Автоматическая оптимизация",
      "Упрощение архитектуры"
    ],
    correctAnswer: 1,
    explanation: "Flyweight требует тщательного проектирования: что intrinsic (общее), что extrinsic (уникальное). Это усложняет код и может быть излишним для небольших наборов данных. Оптимизация имеет смысл для тысяч+ объектов.",
    topic: "Flyweight"
  },

  // Дополнительные вопросы на применение паттернов
  {
    id: 43,
    question: "Какая комбинация паттернов эффективна для создания расширяемой системы плагинов в редакторе?",
    options: [
      "Только Singleton",
      "Composite для структуры плагинов + Decorator для расширения функциональности",
      "Только Factory",
      "Prototype + Observer"
    ],
    correctAnswer: 1,
    explanation: "Composite позволяет строить дерево плагинов (категории, подплагины), а Decorator - добавлять функциональность (логирование, права доступа) без изменения кода плагина. Например, LoggingDecorator(AuthDecorator(EditorPlugin)).",
    topic: "Применение паттернов"
  },
  {
    id: 44,
    question: "Как сочетание Facade и Adapter помогает при интеграции legacy кода?",
    options: [
      "Эти паттерны несовместимы",
      "Adapter адаптирует legacy API, Facade упрощает работу с адаптированным кодом",
      "Только Facade достаточно",
      "Только Adapter достаточно"
    ],
    correctAnswer: 1,
    explanation: "Adapter преобразует legacy интерфейс к современному: OldAPI -> Adapter -> ModernInterface. Facade затем предоставляет простой API: новый код использует FacadeAPI.doSomething(), который внутри работает через Adapter с legacy системой.",
    topic: "Применение паттернов"
  },
  {
    id: 45,
    question: "Какой паттерн лучше использовать для оптимизации рендеринга карты с тысячами маркеров?",
    options: [
      "Singleton",
      "Flyweight для разделения общего состояния маркеров + виртуализация",
      "Observer",
      "Factory"
    ],
    correctAnswer: 1,
    explanation: "Flyweight: MarkerRenderer (intrinsic - иконка, стили) общий для всех маркеров типа 'restaurant'. Position, label (extrinsic) уникальны. + Виртуализация: рендерить только маркеры в видимой области viewport.",
    topic: "Применение паттернов"
  },
  {
    id: 46,
    question: "Когда стоит использовать Proxy вместо простого wrapper объекта?",
    options: [
      "Всегда использовать Proxy",
      "Когда нужен перехват всех операций (get/set/has/delete) динамически",
      "Никогда не использовать Proxy",
      "Только для примитивов"
    ],
    correctAnswer: 1,
    explanation: "Proxy полезен когда операций много или они неизвестны заранее (например, перехват любого свойства). Для простых случаев (пара методов) достаточно wrapper класса. Proxy имеет overhead, используйте с умом.",
    topic: "Применение паттернов"
  },
  {
    id: 47,
    question: "Как Bridge помогает при создании дизайн-системы с multiple frameworks?",
    options: [
      "Bridge не применим к дизайн-системам",
      "Компоненты определяют абстракцию, а реализация под React/Vue/Angular подключается через bridge",
      "Требуется полное дублирование кода",
      "Автоматическая конвертация между фреймворками"
    ],
    correctAnswer: 1,
    explanation: "Design System Bridge: ButtonAbstraction определяет props и поведение. ReactButtonImpl, VueButtonImpl, AngularButtonImpl - конкретные реализации. Документация и API едины, реализация под фреймворк.",
    topic: "Применение паттернов"
  },
  {
    id: 48,
    question: "Какой структурный паттерн наиболее естественен для архитектуры React приложения?",
    options: [
      "Proxy",
      "Composite - вся структура компонентов это дерево композитов",
      "Flyweight",
      "Bridge"
    ],
    correctAnswer: 1,
    explanation: "React inherently Composite: любой компонент может быть листом (<Button/>) или композитом (<Form><Input/><Button/></Form>). Props, lifecycle, reconciliation работают единообразно независимо от вложенности.",
    topic: "Применение паттернов"
  },
  {
    id: 49,
    question: "Какая ошибка часто возникает при применении Decorator паттерна?",
    options: [
      "Decorator всегда корректен",
      "Wrapper hell - слишком много слоев декораторов, усложняющих понимание и отладку",
      "Decorator ускоряет код",
      "Автоматическое тестирование"
    ],
    correctAnswer: 1,
    explanation: "withAuth(withLoading(withErrorBoundary(withTheme(withRouter(Component))))) - wrapper hell. Решения: Hooks (useAuth, useLoading), Render Props, или ограничение количества декораторов. Баланс между переиспользованием и читаемостью.",
    topic: "Применение паттернов"
  },
  {
    id: 50,
    question: "В чем ключевое отличие Adapter от Facade?",
    options: [
      "Отличий нет",
      "Adapter делает один интерфейс совместимым с другим, Facade упрощает сложный интерфейс",
      "Adapter только для классов",
      "Facade только для функций"
    ],
    correctAnswer: 1,
    explanation: "Adapter: преобразование интерфейса (OldAPI -> NewAPI compatible). Facade: упрощение (ComplexSubsystem -> SimplifiedAPI). Пример: Adapter адаптирует moment.js к date-fns API. Facade создает простой api.getUsers() скрывая fetch+headers+parsing.",
    topic: "Применение паттернов"
  }
]
