import type { ArticleCatalog, ArticleSummary } from '../types/article'

export const articleSummaries = {
  htmlIntro: {
    id: 'what-is-html',
    categoryId: 'html',
    title: '1. Что такое HTML и для чего нужен?',
    description:
      'HTML — это язык гипертекстовой разметки, который задаёт структуру и семантику веб-страницы. Он описывает, какие элементы содержатся на странице (заголовки, списки, изображения, ссылки), чтобы браузер мог построить DOM и отобразить контент. Оформление задаётся CSS, а поведение — JavaScript; HTML служит фундаментом, на который они накладываются.',
    tags: ['HTML'],
    legacyPath: '/html/what-is-html',
  },
  semanticHtml: {
    id: 'semantic-html',
    categoryId: 'html',
    title: '2. Что такое семантическая вёрстка?',
    description:
      'Семантическая вёрстка — это подход к HTML-разметке, при котором теги подбираются так, чтобы отражать смысл и структуру содержимого страницы, а не лишь то, как оно будет выглядеть в браузере.',
    tags: ['HTML', 'Семантика', 'Доступность'],
    legacyPath: '/html/semantic-html',
  },
  accessibility: {
    id: 'accessibility',
    categoryId: 'html',
    title: '3. Доступность в Web',
    description:
      'Веб-доступность (Web Accessibility, a11y) — это практика создания веб-сайтов и приложений, которые могут использовать все люди, включая пользователей с различными нарушениями и ограничениями. Цель — обеспечить равный доступ к информации и функциональности для всех.',
    tags: ['HTML', 'Доступность'],
    legacyPath: '/html/accessibility',
  },
  responsiveImage: {
    id: 'responsive-image',
    categoryId: 'html',
    title: '4. Как эффективно сделать адаптивное изображение в HTML?',
    description:
      'Адаптивные изображения — это техника, которая позволяет загружать и отображать изображения, оптимизированные для конкретного устройства пользователя: размера экрана, плотности пикселей, пропускной способности сети и формата поддержки браузера.',
    tags: ['HTML', 'Изображения'],
    legacyPath: '/html/responsive-image',
  },
  specificity: {
    id: 'css-specificity',
    categoryId: 'css',
    title: '1. Специфичность селекторов в CSS',
    description:
      'Специфичность (Specificity) — это система приоритетов в CSS, которая определяет, какое правило будет применено к элементу, когда несколько селекторов указывают на один и тот же элемент. Чем выше специфичность, тем выше приоритет правила.',
    tags: ['CSS', 'Селекторы', 'Практика'],
    legacyPath: '/css/specificity',
  },
  isolation: {
    id: 'isolation-css',
    categoryId: 'css',
    title: 'Изоляция стилей в CSS',
    description:
      'CSS глобален по природе — любой класс может случайно перебить другой. Изоляция стилей решает эту проблему, делая стили компонента локальными: они не вытекают наружу и не получают нежелательных влияний извне. Это фундамент компонентной архитектуры.',
    tags: ['CSS', 'Изоляция'],
    legacyPath: '/css/isolation-css',
  },
  relativeUnits: {
    id: 'relative-units',
    categoryId: 'css',
    title: 'Зачем нужны относительные единицы измерения в CSS?',
    description:
      'Относительные единицы измерения — это система размеров, которые вычисляются относительно других значений (родительского элемента, размера шрифта, viewport). Они обеспечивают адаптивность, доступность и лучшую масштабируемость интерфейсов по сравнению с абсолютными единицами.',
    tags: ['CSS', 'Единицы измерения', 'Практика'],
    legacyPath: '/css/relative-units',
  },
  flexGrid: {
    id: 'flex-vs-grid',
    categoryId: 'css',
    title: 'Flexbox vs Grid: когда использовать и когда они незаменяемы',
    description:
      'Flexbox и Grid — это две системы макетирования CSS, которые решают разные задачи. Flexbox идеален для одномерных макетов (строка ИЛИ столбец), Grid — для двумерных (строки И столбцы). Понимание их различий критично для эффективной верстки.',
    tags: ['CSS', 'Flexbox', 'Grid'],
    legacyPath: '/css/flex-vs-grid',
  },
  transformations: {
    id: 'transformations',
    categoryId: 'css',
    title: 'CSS трансформации: виды, анимируемость, GPU-ускорение и оптимизация',
    description:
      'CSS-трансформации — один из ключевых инструментов современного фронтенда. Они позволяют перемещать, вращать, масштабировать и искажать элементы без влияния на поток документа, а при правильном применении обеспечивают плавные 60fps-анимации даже на слабых устройствах. В этой статье разберём всё: от видов трансформаций до тонкостей GPU-ускорения и доступности.',
    tags: ['CSS', 'Трансформации'],
    legacyPath: '/css/transformations',
  },
  cssInJs: {
    id: 'css-in-js',
    categoryId: 'css',
    title: 'CSS-in-JS: полное руководство',
    description:
      'CSS-in-JS — подход, при котором стили описываются непосредственно в JavaScript-коде. Стили могут генерироваться динамически во время выполнения или компилироваться в статические CSS-файлы на этапе сборки. В этой статье разберём, что такое CSS-in-JS, какие библиотеки существуют, чем они отличаются и как выбрать правильный инструмент.',
    tags: ['CSS', 'CSS-in-JS'],
    legacyPath: '/css/css-in-js',
  },
  jsFunctions: {
    id: 'js-functions',
    categoryId: 'javascript',
    title: 'Функции в JavaScript',
    description:
      'Функции — это блоки кода, которые выполняют определенную задачу и могут быть вызваны многократно. Функции являются объектами первого класса в JavaScript, что означает, что их можно присваивать переменным, передавать как аргументы и возвращать из других функций.',
    tags: ['JavaScript'],
    legacyPath: '/js/functions',
  },
  jsTypesOfFunctions: {
    id: 'js-types-of-functions',
    categoryId: 'javascript',
    title: 'Какие функции есть в JavaScript?',
    description:
      'JavaScript предоставляет множество различных типов функций: от встроенных глобальных функций до пользовательских функций различных видов. Понимание всех типов функций критично для эффективной разработки на JavaScript.',
    tags: ['JavaScript'],
    legacyPath: '/js/types-of-functions',
  },
  jsFunctionTypes: {
    id: 'js-functions-types',
    categoryId: 'javascript',
    title: 'Разница между Function Declaration, Function Expression и Arrow Function',
    description:
      'В JavaScript существует несколько способов создания функций, каждый из которых имеет свои особенности. Понимание различий между Function Declaration, Function Expression и Arrow Function критично для написания качественного кода и успешного прохождения собеседований.',
    tags: ['JavaScript'],
    legacyPath: '/js/functions-types',
  },
  jsClosures: {
    id: 'js-closures',
    categoryId: 'javascript',
    title: 'Замыкания (Closures) в JavaScript',
    description: '',
    tags: ['JavaScript'],
    legacyPath: '/js/closures',
  },
  jsLexicalEnvironment: {
    id: 'js-lexical-environment',
    categoryId: 'javascript',
    title: 'Лексическое окружение (Lexical Environment)',
    description: '',
    tags: ['JavaScript'],
    legacyPath: '/js/lexical-environment',
  },
  jsLexicalEnvironmentMoment: {
    id: 'js-lexical-environment-moment',
    categoryId: 'javascript',
    title: 'В какой момент создается лексическое окружение?',
    description: '',
    tags: ['JavaScript'],
    legacyPath: '/js/lexical-environment-moment',
  },
  jsHoisting: {
    id: 'js-hoisting',
    categoryId: 'javascript',
    title: 'JavaScript Hoisting: что всплывает и как это работает',
    description:
      'Hoisting (всплытие) — это механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало их области видимости во время компиляции. Важно понимать: всплывают только объявления, но не инициализации!',
    tags: ['JavaScript'],
    legacyPath: '/js/hoisting',
  },
  jsHoistingVarConstLet: {
    id: 'js-hoisting-var-const-let',
    categoryId: 'javascript',
    title: 'JavaScript Hoisting: var, let, const',
    description:
      'Hoisting (поднятие) — это механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало их области видимости. Но поведение кардинально различается для var, let и const.',
    tags: ['JavaScript'],
    legacyPath: '/js/hoisting-var-const-let',
  },
  jsAsyncJavaScript: {
    id: 'js-async-js',
    categoryId: 'javascript',
    title: 'Для чего нам нужна асинхронность в JavaScript?',
    description:
      'Асинхронность в JavaScript позволяет выполнять операции, не блокируя главный поток выполнения. Это критически важно для создания отзывчивых пользовательских интерфейсов и эффективной работы с внешними ресурсами (API, файлы, базы данных). JavaScript является однопоточным языком, поэтому без асинхронности любая длительная операция заморозила бы весь интерфейс.',
    tags: ['JavaScript'],
    legacyPath: '/async/async-js',
  },
  jsPromises: {
    id: 'js-promises',
    categoryId: 'javascript',
    title: 'JavaScript Promises: До промисов и состояния',
    description:
      'Промисы появились в ES6 (2015) для решения проблем с асинхронным кодом. До их введения использовались колбэки (callbacks) и события (events). Промисы имеют три состояния: pending, fulfilled и rejected.',
    tags: ['JavaScript'],
    legacyPath: '/async/promises',
  },
  jsPromiseCollections: {
    id: 'js-promise-collections',
    categoryId: 'javascript',
    title: 'Выполнение итерируемых коллекций промисов',
    description:
      'Итерируемая коллекция промисов — это массив или другая структура данных, содержащая промисы, которые нужно выполнить одновременно. В JavaScript есть несколько способов запустить все промисы из коллекции сразу и обработать их результаты.',
    tags: ['JavaScript'],
    legacyPath: '/async/promise-collections',
  },
  jsPromiseRaceAnyAllSettled: {
    id: 'js-race-any-all-settled',
    categoryId: 'javascript',
    title: 'Promise.race, Promise.any и Promise.allSettled',
    description:
      'Promise.race, Promise.any и Promise.allSettled — это методы для работы с несколькими Promise одновременно, каждый с уникальной логикой завершения. Понимание различий между ними критично для эффективной работы с асинхронным кодом.',
    tags: ['JavaScript'],
    legacyPath: '/async/race-any-all-settled',
  },
  jsEventLoop: {
    id: 'js-event-loop',
    categoryId: 'javascript',
    title: 'Как работает Event Loop в JavaScript?',
    description:
      'Event Loop — это механизм, который позволяет JavaScript выполнять неблокирующие асинхронные операции в однопоточной среде. Он управляет порядком выполнения кода, обработкой событий и выполнением callback-функций.',
    tags: ['JavaScript'],
    legacyPath: '/event-loop/event-loop',
  },
  jsRequestAnimationFrame: {
    id: 'js-event-loop-req-animation-frame',
    categoryId: 'javascript',
    title: 'requestAnimationFrame и Event Loop',
    description:
      'requestAnimationFrame (rAF) — это специальный API браузера, который планирует выполнение callback-функции перед следующим перерисовыванием страницы. Он занимает особое место в Event Loop, выполняясь ПОСЛЕ микрозадач, но ДО рендеринга и ДО макрозадач.',
    tags: ['JavaScript'],
    legacyPath: '/event-loop/event-loop-req-animation-frame',
  },
  jsJSContext: {
    id: 'js-context',
    categoryId: 'javascript',
    title: 'Контекст в JavaScript: полное руководство',
    description:
      'Контекст в JavaScript — это окружение, в котором выполняется код. Включает в себя контекст выполнения (Execution Context), лексический контекст (Lexical Environment) и контекст this. Понимание контекста критически важно для работы с JavaScript.',
    tags: ['JavaScript'],
    legacyPath: '/context/context',
  },
  jsJavaScriptThis: {
    id: 'js-this',
    categoryId: 'javascript',
    title: 'Ключевое слово this в JavaScript',
    description:
      'this — одна из самых сложных концепций JavaScript. Значение this определяется тем, как вызывается функция, а не где она определена. Понимание правил привязки this критически важно для работы с JavaScript.',
    tags: ['JavaScript'],
    legacyPath: '/context/this',
  },
  jsContextBinding: {
    id: 'js-context-binding',
    categoryId: 'javascript',
    title: 'Способы привязки контекста: call, bind, apply',
    description:
      'Контекст (this) в JavaScript определяется тем, как функция вызывается, а не где она объявлена. Методы call, apply и bind позволяют явно управлять контекстом выполнения функций. Это критически важно для понимания работы с объектами, событиями и колбэками.',
    tags: ['JavaScript'],
    legacyPath: '/context/context-binding',
  },
  jsPartialApplicationBind: {
    id: 'js-partial-bind',
    categoryId: 'javascript',
    title: 'JavaScript: Частичное применение и bind()',
    description:
      'Частичное применение (Partial Application) — это техника создания новой функции путем фиксации некоторых аргументов исходной функции. func.bind(context, [arg1], [arg2], ...) — основной способ частичного применения в JavaScript, который также позволяет привязать контекст выполнения.',
    tags: ['JavaScript'],
    legacyPath: '/context/partial-bind',
  },
  jsJavaScriptPrototype: {
    id: 'js-prototype',
    categoryId: 'javascript',
    title: 'JavaScript: Что такое prototype?',
    description:
      'Prototype (прототип) — это фундаментальный механизм JavaScript для наследования и переиспользования кода. Каждый объект в JavaScript имеет скрытую ссылку на другой объект, называемый его прототипом. Когда свойство или метод не найдены в объекте, JavaScript ищет их в цепочке прототипов.',
    tags: ['JavaScript'],
    legacyPath: '/prototype/prototype',
  },
  jsProtoVsPrototype: {
    id: 'js-proto-vs-prototype',
    categoryId: 'javascript',
    title: 'JavaScript: __proto__ vs prototype',
    description:
      'Главное различие: prototype — свойство функций-конструкторов, __proto__ — свойство экземпляров объектов. Это один из самых частых вопросов на собеседованиях по JavaScript, особенно в контексте наследования и ООП.',
    tags: ['JavaScript'],
    legacyPath: '/prototype/proto-vs-prototype',
  },
  jsGlobalPrototypesProblems: {
    id: 'js-global-prototypes-problems',
    categoryId: 'javascript',
    title: 'Проблемы использования прототипов у глобальных объектов',
    description:
      'Модификация встроенных прототипов (Array.prototype, Object.prototype, String.prototype) считается плохой практикой в JavaScript. Это может привести к конфликтам, непредсказуемому поведению и проблемам с совместимостью. Разберем основные проблемы и альтернативные решения.',
    tags: ['JavaScript'],
    legacyPath: '/prototype/global-prototypes-problems',
  },
  jsSymbol: {
    id: 'js-symbol',
    categoryId: 'javascript',
    title: 'JavaScript Symbol: уникальные идентификаторы',
    description:
      'Symbol — это примитивный тип данных, введенный в ES6 (ES2015). Каждый символ уникален и неизменяем, что делает его идеальным для создания уникальных идентификаторов и "скрытых" свойств объектов.',
    tags: ['JavaScript'],
    legacyPath: '/symbol/symbol',
  },
  jsGlobalAndSystemSymbols: {
    id: 'js-global-and-system-symbol',
    categoryId: 'javascript',
    title: 'Глобальный реестр символов и системные символы',
    description:
      'Как сделать два символа с одним именем? В JavaScript есть несколько способов работы с символами: локальные символы (всегда уникальны), глобальные символы через Symbol.for() (могут быть одинаковыми) и системные символы (предопределенные).',
    tags: ['JavaScript'],
    legacyPath: '/symbol/global-and-system-symbol',
  },
  jsObjectPropertyFlags: {
    id: 'js-object-flags-descriptors',
    categoryId: 'javascript',
    title: 'Флаги свойств объектов в JavaScript',
    description:
      'В JavaScript каждое свойство объекта имеет не только значение, но и три специальных флага, которые контролируют поведение этого свойства: writable, enumerable и configurable. Эти флаги называются дескрипторами свойств и позволяют точно настроить, как свойство ведёт себя при различных операциях.',
    tags: ['JavaScript'],
    legacyPath: '/descriptor/object-flags-descriptors',
  },
  jsObjectPropertyFlagsChanges: {
    id: 'js-object-flags-descriptors-changes',
    categoryId: 'javascript',
    title: 'Дескрипторы свойств в JavaScript',
    description:
      'Дескрипторы свойств — это объекты, которые описывают свойства других объектов в JavaScript. Каждое свойство объекта имеет дескриптор, который определяет его поведение: можно ли изменять значение, видимо ли оно при перечислении, можно ли удалить и т.д.',
    tags: ['JavaScript'],
    legacyPath: '/descriptor/object-flags-descriptors-changes',
  },
  jsIteratorsAndGenerators: {
    id: 'js-iterators-and-generators',
    categoryId: 'javascript',
    title: 'Итерируемые конструкции: Iterators, Generators, Async Iterators/Generators',
    description:
      'Итераторы и генераторы — это мощные инструменты JavaScript для работы с последовательностями данных. Итераторы предоставляют унифицированный способ обхода коллекций, генераторы позволяют создавать итераторы проще, а асинхронные версии работают с асинхронными данными.',
    tags: ['JavaScript'],
    legacyPath: '/iterators-and-generators/iterators-and-generators',
  },
  jsWebComponents: {
    id: 'js-web-components',
    categoryId: 'javascript',
    title: 'Web Components: Templates, Shadow DOM, Custom Elements',
    description:
      'Web Components — это набор веб-стандартов для создания переиспользуемых компонентов: Custom Elements, Shadow DOM, HTML Templates и ES Modules. Они позволяют инкапсулировать функциональность и стили без фреймворков.',
    tags: ['JavaScript'],
    legacyPath: '/web-components/web-components',
  },
  jsWebComponentsSecond: {
    id: 'js-web-components-second',
    categoryId: 'javascript',
    title: 'Web Components: Custom Elements & Custom Events',
    description:
      'Web Components — нативная браузерная технология для создания переиспользуемых компонентов. Custom Elements позволяют создавать собственные HTML теги, Custom Events обеспечивают коммуникацию между ними.',
    tags: ['JavaScript'],
    legacyPath: '/web-components/web-components-second',
  },
  jsJavaScriptModuleSystems: {
    id: 'js-module-systems',
    categoryId: 'javascript',
    title: 'Системы модулей в JavaScript',
    description:
      'Системы модулей — способы организации и разделения кода на переиспользуемые части. В JavaScript существует несколько подходов: IIFE/Closures, CommonJS, AMD, UMD и современные ES6 Modules. Каждая система решает проблемы своего времени и имеет свои особенности.',
    tags: ['JavaScript'],
    legacyPath: '/module-systems/module-systems',
  },
  jsRegExp: {
    id: 'js-regexp',
    categoryId: 'javascript',
    title: 'Регулярные выражения (RegExp) в JavaScript',
    description:
      'Регулярные выражения (RegExp) — это мощный инструмент для поиска, проверки и замены текстовых шаблонов. В JavaScript регулярные выражения представлены объектом RegExp и предоставляют гибкие возможности для работы со строками через паттерны.',
    tags: ['JavaScript'],
    legacyPath: '/regexp/regexp',
  },
  jsDOMEvents: {
    id: 'js-dom-events',
    categoryId: 'javascript',
    title: 'События DOM: жизненный цикл и обработка',
    description:
      'События DOM проходят через три фазы: погружение (capturing), цель (target) и всплытие (bubbling). Понимание этих фаз критически важно для эффективной работы с событиями, делегирования и оптимизации производительности.',
    tags: ['JavaScript'],
    legacyPath: '/dom-events/dom-events',
  },
  webApiBlobAndFile: {
    id: 'web-api-blob-and-file',
    categoryId: 'web-api',
    title: 'Blob и File API в JavaScript',
    description:
      'Blob (Binary Large Object) — объект для работы с бинарными данными. File — расширение Blob для работы с файлами, добавляет метаданные (имя, дата изменения). Эти API позволяют читать, создавать, изменять и загружать файлы в браузере.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/blob-and-file',
  },
  webApiFetchAPIandXMLHttpRequest: {
    id: 'web-api-fetch-api-and-xml-http-request',
    categoryId: 'web-api',
    title: 'Fetch API vs XMLHttpRequest',
    description:
      'Fetch API — современный способ выполнения HTTP-запросов с Promise-based интерфейсом. XMLHttpRequest — классический API, который всё ещё необходим для специфических задач: получения прогресса отправки файлов и работы в событиях unload/beforeunload.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/fetch-api-and-xml-http-request',
  },
  webApiMaintainingConnectionServer: {
    id: 'web-api-maintaining-connection-server',
    categoryId: 'web-api',
    title: 'Поддержание соединения с сервером в JavaScript',
    description:
      'Существует несколько методов поддержания постоянного соединения с сервером: WebSockets для двусторонней связи, Server-Sent Events (EventSource) для односторонней передачи от сервера к клиенту, Long Polling и классический Polling как fallback решения.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/maintaining-connection-server',
  },
  webApiIntersectionObserverInfo: {
    id: 'web-api-intersection-observer',
    categoryId: 'web-api',
    title: 'IntersectionObserver и InfinityScroll',
    description:
      'IntersectionObserver API — современный способ отслеживания видимости элементов на странице. Позволяет асинхронно наблюдать за пересечением элемента с viewport или другим элементом-предком. Идеален для реализации lazy loading, infinite scroll, аналитики просмотров и анимаций.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/intersection-observer',
  },
  webApiResizeObserverInfo: {
    id: 'web-api-resize-observer',
    categoryId: 'web-api',
    title: 'ResizeObserver API в JavaScript',
    description:
      'ResizeObserver — современный Web API для отслеживания изменений размеров DOM элементов. В отличие от window.resize, который отслеживает только размер окна браузера, ResizeObserver позволяет следить за изменениями размеров конкретных элементов, включая изменения из-за CSS, добавления контента, или изменения размеров родительских контейнеров.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/resize-observer',
  },
  webApiMutationObserverInfo: {
    id: 'web-api-mutation-observer',
    categoryId: 'web-api',
    title: 'MutationObserver в JavaScript',
    description:
      'MutationObserver — это Web API для отслеживания изменений в DOM-дереве. Он асинхронно наблюдает за добавлением/удалением элементов, изменением атрибутов и текстового содержимого, предоставляя мощный механизм реагирования на DOM-мутации.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/mutation-observer',
  },
  webApiAbortController: {
    id: 'web-api-abort-controller',
    categoryId: 'web-api',
    title: 'AbortController: прерывание запросов и загрузки ресурсов',
    description:
      'AbortController — это Web API для прерывания асинхронных операций, таких как fetch запросы, загрузка файлов, потоковые операции. Состоит из двух частей: AbortController (управление) и AbortSignal (сигнал для передачи в API).',
    tags: ['WebAPI'],
    legacyPath: '/web-api/abort-controller',
  },
  webApiBrowserTabsSync: {
    id: 'web-api-tabs-sync',
    categoryId: 'web-api',
    title: 'Синхронизация состояний между вкладками браузера (на примере корзины)',
    description:
      'Синхронизация состояний между вкладками — это паттерн, позволяющий поддерживать одинаковое состояние приложения (например, корзины покупок) во всех открытых вкладках браузера. Существует несколько подходов с разными уровнями сложности и надежности.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/tabs-sync',
  },
  webApiWebStorageAPI: {
    id: 'web-api-web-storage-api',
    categoryId: 'web-api',
    title: 'Web Storage API: localStorage и sessionStorage',
    description:
      'Web Storage API предоставляет механизмы для хранения пар ключ-значение в браузере. Состоит из двух объектов: localStorage (постоянное хранилище) и sessionStorage (хранилище сессии). Оба хранят данные только в виде строк.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/web-storage-api',
  },
  webApiWebAPIRequestAnimationFrame: {
    id: 'web-api-request-animation-frame',
    categoryId: 'web-api',
    title: 'RequestAnimationFrame: оптимальный способ анимаций в браузере',
    description:
      'requestAnimationFrame (RAF) — это Web API для создания плавных анимаций, синхронизированных с частотой обновления экрана браузера. В отличие от setTimeout/setInterval, RAF автоматически оптимизирован браузером, экономит батарею и обеспечивает стабильные 60 FPS.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/request-animation-frame',
  },
  webApiPerformanceObserverInfo: {
    id: 'web-api-performance-observer-info',
    categoryId: 'web-api',
    title: 'PerformanceObserver: мониторинг производительности веб-приложений',
    description:
      'PerformanceObserver — это Web API для асинхронного мониторинга метрик производительности. Позволяет отслеживать загрузку страницы, ресурсов, Core Web Vitals (LCP, FID, CLS), долгие задачи и создавать кастомные метрики. Более эффективен, чем периодический опрос performance.getEntries(), так как работает на основе событий.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/performance-observer-info',
  },
  webApiWebWorkers: {
    id: 'web-api-web-workers',
    categoryId: 'web-api',
    title: 'Web Workers: многопоточность в JavaScript',
    description:
      'Web Worker — это механизм для выполнения JavaScript кода в фоновом потоке, отдельном от основного потока выполнения веб-страницы. Workers позволяют выполнять тяжелые вычисления без блокировки UI, обеспечивая плавную работу интерфейса.',
    tags: ['WebAPI'],
    legacyPath: '/web-api/web-workers',
  },
  tsTypeScriptCommonInfo: {
    id: 'ts-common-info',
    categoryId: 'typescript',
    title: 'Плюсы и минусы TypeScript',
    description:
      'TypeScript — это надмножество JavaScript, добавляющее статическую типизацию. Он компилируется в чистый JavaScript и может использоваться везде, где работает JavaScript. TypeScript создан Microsoft и активно развивается с 2012 года.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/common-info',
  },
  tsTypeScriptTypes: {
    id: 'ts-types',
    categoryId: 'typescript',
    title: 'Типы данных в TypeScript',
    description:
      'TypeScript расширяет JavaScript статической типизацией, добавляя богатую систему типов. Понимание базовых и продвинутых типов критически важно для эффективной работы и успешного прохождения собеседования.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/typescript-types',
  },
  tsInterfacesAndTypes: {
    id: 'ts-interfaces-and-types',
    categoryId: 'typescript',
    title: 'Interfaces и Types в TypeScript',
    description:
      'Interface и Type — два основных способа описания типов в TypeScript. Interface используется для описания структуры объектов и контрактов, Type — более гибкий инструмент для создания псевдонимов типов, union, intersection и сложных типов. Понимание различий критично для эффективной работы с TypeScript.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/interfaces-and-types',
  },
  tsInterfacesVsTypes: {
    id: 'ts-interfaces-vs-types',
    categoryId: 'typescript',
    title: 'Interfaces vs Types: Углубленное сравнение',
    description:
      'Дополнительный материал к основному файлу. Фокус на работе с классами, производительности, миграции между подходами, качестве сообщений об ошибках и продвинутых техниках использования.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/interfaces-vs-types',
  },
  tsTypeNarrowing: {
    id: 'ts-type-narrowing',
    categoryId: 'typescript',
    title: 'Сужение типов (Type Narrowing) в TypeScript',
    description:
      'Сужение типов (Type Narrowing) — это процесс, при котором TypeScript автоматически уточняет (сужает) тип переменной в определенном контексте кода на основе проверок во время выполнения. Это позволяет безопасно работать с union типами и делает код более type-safe без явных приведений типов.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/type-narrowing',
  },
  tsTypeScriptGenerics: {
    id: 'ts-generics',
    categoryId: 'typescript',
    title: 'Generics в TypeScript: Обобщенное программирование',
    description:
      'Generics (обобщения) — это механизм TypeScript, позволяющий создавать переиспользуемый код, работающий с различными типами данных, сохраняя при этом типобезопасность. Generics позволяют писать гибкий код без потери информации о типах.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/typescript-generics',
  },
  tsTypeScriptGenerics2: {
    id: 'ts-generics-2',
    categoryId: 'typescript',
    title: 'Generics в TypeScript',
    description:
      'Generics (обобщения) — это мощная функция TypeScript, позволяющая создавать переиспользуемые компоненты, которые работают с различными типами данных, сохраняя при этом type safety. Generics позволяют писать функции, классы и интерфейсы, которые работают с типами как с параметрами.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/typescript-generics2',
  },
  tsTypeScriptMappedTypes: {
    id: 'ts-mapped-types',
    categoryId: 'typescript',
    title: 'Mapped Types в TypeScript: создание и трансформация типов',
    description:
      'Mapped Types — это мощный механизм TypeScript для создания новых типов путем трансформации существующих. Позволяют итерироваться по ключам типа и применять преобразования к каждому свойству. Основа всех встроенных Utility Types (Partial, Pick, Omit, Readonly и др.).',
    tags: ['TypeScript'],
    legacyPath: '/typescript/mapped-types',
  },
  tsConditionalTypes: {
    id: 'ts-conditional-types',
    categoryId: 'typescript',
    title: 'Conditional Types: условные типы в TypeScript',
    description:
      'Conditional Types — это мощная возможность TypeScript для создания типов на основе условий. Синтаксис T extends U ? X : Y позволяет выбирать один из двух типов в зависимости от того, совместим ли тип T с типом U. Это основа для создания гибких, переиспользуемых типов и Utility Types.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/conditional-types',
  },
  tsInferTypes: {
    id: 'ts-infer-types',
    categoryId: 'typescript',
    title: 'Infer Types в TypeScript: автоматический вывод типов',
    description:
      'Infer Types — это мощная возможность TypeScript для автоматического извлечения и вывода типов из других типов внутри условных типов (conditional types). Ключевое слово infer позволяет TypeScript "угадать" тип на основе структуры и автоматически его извлечь.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/infer-types',
  },
  tsClassesAndDecorators: {
    id: 'ts-classes-and-decorators',
    categoryId: 'typescript',
    title: 'Classes и Decorators в TypeScript',
    description:
      'Классы в TypeScript — это синтаксический сахар над прототипным наследованием JavaScript с добавлением строгой типизации и модификаторов доступа. Декораторы — это специальные функции, которые позволяют аннотировать и модифицировать классы, методы, свойства и параметры на этапе объявления. Это мощный инструмент метапрограммирования.',
    tags: ['TypeScript'],
    legacyPath: '/typescript/classes-and-decorators',
  },
  reactIntro: {
    id: 'react-intro',
    categoryId: 'react',
    title: 'Что такое React.js и какие основные преимущества он предоставляет?',
    description:
      'React — это JavaScript библиотека для создания пользовательских интерфейсов, разработанная компанией Meta (Facebook). React использует компонентный подход, декларативный стиль программирования и эффективный механизм обновления DOM через Virtual DOM. Это один из самых популярных инструментов для фронтенд-разработки в 2025 году.',
    tags: ['React'],
    legacyPath: '/react/react-intro',
  },
  reactVirtualDOM: {
    id: 'react-virtual-dom',
    categoryId: 'react',
    title: 'Virtual DOM: Как React оптимизирует производительность',
    description:
      'Virtual DOM (виртуальный DOM) — это программная концепция, где идеальное, "виртуальное" представление пользовательского интерфейса хранится в памяти и синхронизируется с реальным DOM через процесс reconciliation. Это ключевая технология, позволяющая React эффективно обновлять UI без прямых манипуляций с DOM.',
    tags: ['React'],
    legacyPath: '/react/virtual-dom',
  },
  reactJSXSyntax: {
    id: 'react-jsx',
    categoryId: 'react',
    title: 'JSX: JavaScript XML синтаксис',
    description:
      'JSX (JavaScript XML) — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код в JavaScript файлах. JSX компилируется в обычные вызовы React.createElement() и не является обязательным, но делает код React более читаемым и интуитивным.',
    tags: ['React'],
    legacyPath: '/react/jsx',
  },
  reactEvents: {
    id: 'react-events',
    categoryId: 'react',
    title: 'События (Events) в React: SyntheticEvent vs Native Events',
    description:
      'React использует собственную систему событий, построенную поверх нативных DOM событий. Вместо прямой работы с нативными событиями, React предоставляет SyntheticEvent — кроссбраузерную обертку, которая нормализует API событий и использует делегирование для оптимизации производительности.',
    tags: ['React'],
    legacyPath: '/react/events',
  },
  reactRefAndForwardRef: {
    id: 'react-ref-forward-ref',
    categoryId: 'react',
    title: 'Ref и ForwardRef в React',
    description:
      'useRef — это хук React для создания изменяемых значений, которые сохраняются между рендерами и не вызывают ререндер при изменении. forwardRef позволяет пробрасывать refs через компоненты. Понимание управляемых и неконтролируемых компонентов критично для работы с формами и DOM.',
    tags: ['React'],
    legacyPath: '/react/ref-forward-ref',
  },
  reactUseMemo: {
    id: 'react-use-memo',
    categoryId: 'react',
    title: 'useMemo в React',
    description:
      'useMemo — это React Hook для мемоизации (кэширования) результатов вычислений. Он запоминает результат выполнения функции и возвращает закэшированное значение, пока зависимости не изменились. Это оптимизирует производительность, избегая повторных дорогих вычислений при каждом рендере.',
    tags: ['React'],
    legacyPath: '/react/use-memo',
  },
  reactUseCallback: {
    id: 'react-use-callback',
    categoryId: 'react',
    title: 'useCallback в React: мемоизация функций',
    description:
      'useCallback — это React хук, который возвращает мемоизированную версию функции, которая изменяется только при изменении зависимостей. Основное назначение — предотвращение ненужных перерендеров дочерних компонентов и оптимизация производительности при работе с обработчиками событий.',
    tags: ['React'],
    legacyPath: '/react/use-callback',
  },
  reactUseEffectFlow: {
    id: 'react-use-effect-flow',
    categoryId: 'react',
    title: 'useEffect Flow: различия с жизненным циклом и cleanup',
    description:
      'useEffect — это хук, который объединяет три метода жизненного цикла классовых компонентов: componentDidMount, componentDidUpdate и componentWillUnmount. Понимание flow выполнения и момента вызова cleanup критически важно для правильной работы с побочными эффектами в React.',
    tags: ['React'],
    legacyPath: '/react/use-effect-flow',
  },
  reactRenderOptimization: {
    id: 'react-render-optimization',
    categoryId: 'react',
    title: 'Отслеживание лишних рендеров в React',
    description:
      'Лишние ререндеры — одна из главных причин проблем с производительностью в React приложениях. Понимание причин ререндера, умение их обнаруживать и оптимизировать — критически важные навыки для React-разработчика.',
    tags: ['React'],
    legacyPath: '/react/render-optimization',
  },
  reactRenderOptimizationAdvanced: {
    id: 'react-render-optimization-advanced',
    categoryId: 'react',
    title: 'Оптимизация рендеринга в React',
    description:
      'Оптимизация рендеринга — критически важный навык в React-разработке. React по умолчанию ре-рендерит компоненты при изменении состояния или пропсов родителя. Понимание React.memo, useMemo и useCallback помогает избежать избыточных рендеров и улучшить производительность приложения.',
    tags: ['React'],
    legacyPath: '/react/render-optimization-advanced',
  },
  react18: {
    id: 'react-18',
    categoryId: 'react',
    title: 'React 18: Конкурентный рендеринг и новые возможности',
    description:
      'React 18 — это крупное обновление, которое вводит конкурентный рендеринг (Concurrent Rendering) как основу для новых возможностей. Ключевые изменения: автоматический батчинг, новые хуки (useTransition, useDeferredValue, useId), улучшенный Suspense, стриминговый SSR и новый Root API.',
    tags: ['React'],
    legacyPath: '/react/react-18',
  },
  react19: {
    id: 'react-19',
    categoryId: 'react',
    title: 'React 19: Новые возможности и изменения',
    description:
      'React 19 — крупное обновление, которое упрощает работу с формами, асинхронными операциями, метаданными документа и вводит стабильную поддержку React Server Components. Основной фокус — на улучшении developer experience и производительности без breaking changes.',
    tags: ['React'],
    legacyPath: '/react/react-19',
  },
  webHTTPProtocol: {
    id: 'web-http-protocol',
    categoryId: 'web',
    title: 'HTTP Protocol: Полное руководство для веб-разработчика',
    description:
      'HTTP (HyperText Transfer Protocol) — это протокол прикладного уровня для передачи гипертекстовых документов. Он является основой обмена данными в Web и работает по модели клиент-сервер: клиент отправляет запрос, сервер возвращает ответ.',
    tags: ['Web'],
    legacyPath: '/web/http-protocol',
  },
  webCookieInfo: {
    id: 'web-cookie',
    categoryId: 'web',
    title: 'Cookie: Полное руководство для веб-разработчика',
    description:
      'Cookie (куки) — это небольшие фрагменты текстовых данных (до 4KB), которые веб-сервер отправляет браузеру, а браузер сохраняет на компьютере пользователя и автоматически отправляет обратно серверу с каждым последующим HTTP-запросом. Cookies позволяют серверу "запоминать" состояние между запросами, несмотря на то, что HTTP протокол не сохраняет состояние.',
    tags: ['Web'],
    legacyPath: '/web/cookie',
  },
  webCorsInfo: {
    id: 'web-cors-info',
    categoryId: 'web',
    title: 'CORS (Cross-Origin Resource Sharing)',
    description:
      'CORS (Cross-Origin Resource Sharing) — это механизм безопасности браузера, который контролирует, какие веб-сайты могут получать доступ к ресурсам с другого домена. CORS является расширением политики Same-Origin Policy и использует HTTP заголовки для разрешения или запрета cross-origin запросов.',
    tags: ['Web'],
    legacyPath: '/web/cors-info',
  },
  webXSSAndCSRF: {
    id: 'web-xss-csrf',
    categoryId: 'web',
    title: 'XSS и CSRF: Угрозы и защита веб-приложений',
    description:
      'XSS (Cross-Site Scripting) и CSRF (Cross-Site Request Forgery) — две наиболее распространенные уязвимости веб-приложений. XSS позволяет внедрить вредоносный код на страницу, а CSRF — выполнить действия от имени пользователя без его ведома. Понимание различий и методов защиты критически важно для безопасности приложений.',
    tags: ['Web'],
    legacyPath: '/web/xss-csrf',
  },
  webJWTInfo: {
    id: 'web-jwt-info',
    categoryId: 'web',
    title: 'JWT (JSON Web Token): аутентификация и безопасность',
    description:
      'JWT (JSON Web Token) — это открытый стандарт (RFC 7519) для безопасной передачи информации между сторонами в виде JSON-объекта. JWT используется для аутентификации и авторизации, позволяя передавать подписанные данные, которые можно проверить на достоверность.',
    tags: ['Web'],
    legacyPath: '/web/jwt-info',
  },
  webOAuthInfo: {
    id: 'web-oauth-info',
    categoryId: 'web',
    title: 'OAuth 2.0: Авторизация в современных веб-приложениях',
    description:
      'OAuth 2.0 — это отраслевой стандарт протокола авторизации, который позволяет приложениям получать ограниченный доступ к ресурсам пользователя на другом сервисе без передачи пароля. Это основа для "Войти через Google/GitHub/Facebook" и многих современных API.',
    tags: ['Web'],
    legacyPath: '/web/oauth-info',
  },
  webSSOInfo: {
    id: 'web-sso-info',
    categoryId: 'web',
    title: 'SSO (Single Sign-On): Принципы и Реализация',
    description:
      'Single Sign-On (SSO) — это механизм аутентификации, который позволяет пользователю войти в систему один раз и автоматически получить доступ к множеству связанных приложений без повторного ввода учетных данных. SSO упрощает управление доступом и улучшает пользовательский опыт.',
    tags: ['Web'],
    legacyPath: '/web/sso-info',
  },
  webWebVitals: {
    id: 'web-vitals',
    categoryId: 'web',
    title: 'Web Vitals: метрики производительности и пользовательского опыта',
    description:
      'Web Vitals — это набор метрик от Google для измерения реального пользовательского опыта на веб-сайтах. Три основные метрики (Core Web Vitals) являются факторами ранжирования в Google Search с 2021 года. Понимание и оптимизация этих метрик критически важны для современной веб-разработки.',
    tags: ['Web'],
    legacyPath: '/web/web-vitals',
  },
  webChromeDevTools: {
    id: 'web-chrome-dev-tools',
    categoryId: 'web',
    title: 'Chrome DevTools: Инструменты и практическое применение',
    description:
      'Chrome DevTools — это набор инструментов разработчика, встроенных в браузер Chrome. Понимание продвинутых возможностей DevTools критически важно для эффективной отладки, оптимизации производительности и обеспечения доступности веб-приложений.',
    tags: ['Web'],
    legacyPath: '/web/chrome-dev-tools',
  },
  webSSR: {
    id: 'web-ssr',
    categoryId: 'web',
    title: 'Server-Side Rendering (SSR): Полное руководство',
    description:
      'Server-Side Rendering (SSR) — это техника рендеринга веб-приложений, при которой HTML генерируется на сервере для каждого запроса, а не в браузере пользователя. Браузер получает готовую HTML-страницу с контентом, которая затем "оживляется" (hydration) JavaScript для добавления интерактивности.',
    tags: ['Web'],
    legacyPath: '/web/ssr',
  },
  webBFFInfo: {
    id: 'web-bff',
    categoryId: 'web',
    title: 'BFF (Backend For Frontend)',
    description:
      'BFF (Backend For Frontend) — это архитектурный паттерн, при котором создается специализированный backend слой для каждого типа клиентского приложения (веб, мобильное, desktop). BFF действует как посредник между фронтендом и микросервисами, агрегируя данные и оптимизируя API под конкретные потребности клиента.',
    tags: ['Web'],
    legacyPath: '/web/bff',
  },
  testingTestingIntro: {
    id: 'testing-intro',
    categoryId: 'testing',
    title: 'Тестирование: что это и зачем нужно?',
    description:
      'Тестирование — это процесс проверки программного обеспечения на соответствие требованиям, обнаружения ошибок и подтверждения качества кода. Автоматизированное тестирование позволяет быстро проверять работоспособность приложения после изменений и предотвращать регрессии.',
    tags: ['Testing'],
    legacyPath: '/testing/intro',
  },
  testingTestingPyramid: {
    id: 'testing-pyramid',
    categoryId: 'testing',
    title: 'Пирамида тестирования: концепция и применение',
    description:
      'Пирамида тестирования — это концепция распределения автоматизированных тестов по уровням, где основание составляют быстрые и дешевые unit-тесты, середина — integration-тесты средней сложности, а вершина — медленные и дорогие E2E-тесты. Цель: максимальное покрытие при минимальных затратах времени.',
    tags: ['Testing'],
    legacyPath: '/testing/pyramid',
  },
  patternsBasicFP: {
    id: 'patterns-basic-fp',
    categoryId: 'patterns',
    title: 'Basic FP: Основы функционального программирования',
    description:
      'Функциональное программирование (FP) — это парадигма программирования, которая рассматривает вычисления как применение математических функций и избегает изменения состояния и мутабельных данных. В JavaScript FP широко используется благодаря поддержке функций первого класса.',
    tags: ['Patterns'],
    legacyPath: '/patterns/basic-fp',
  },
  patternsDryKissYagni: {
    id: 'patterns-dry-kiss-yagni',
    categoryId: 'patterns',
    title: 'DRY / KISS / YAGNI: Фундаментальные принципы чистого кода',
    description:
      'DRY, KISS и YAGNI — три ключевых принципа программирования, которые помогают писать поддерживаемый, понятный и эффективный код. Понимание этих принципов и умение их применять — важный навык для любого разработчика.',
    tags: ['Patterns'],
    legacyPath: '/patterns/dry-kiss-yagni',
  },
  patternsFluxArchitecture: {
    id: 'patterns-flux-architecture',
    categoryId: 'patterns',
    title: 'Flux: архитектура однонаправленного потока данных',
    description:
      'Flux — это архитектурный паттерн, разработанный Facebook для построения клиентских веб-приложений. Главная идея: однонаправленный поток данных (unidirectional data flow), который делает приложение более предсказуемым и легким в отладке.',
    tags: ['Patterns'],
    legacyPath: '/patterns/flux-architecture',
  },
  patternsMvcMvpMvvm: {
    id: 'patterns-mvc-mvp-mvvm',
    categoryId: 'patterns',
    title: 'MVC, MVP, MVVM: архитектурные паттерны для UI',
    description:
      'MVC, MVP и MVVM — это архитектурные паттерны разделения ответственности в пользовательских интерфейсах. Они определяют, как организована коммуникация между данными (Model), отображением (View) и логикой (Controller/Presenter/ViewModel). Выбор паттерна зависит от сложности приложения, используемого фреймворка и требований к тестируемости.',
    tags: ['Patterns'],
    legacyPath: '/patterns/mvc-mvp-mvvm',
  },
  patternsSolidPrinciples: {
    id: 'patterns-solid-principles',
    categoryId: 'patterns',
    title: 'SOLID: Принципы проектирования и их применение на фронтенде',
    description:
      'SOLID — это пять принципов объектно-ориентированного программирования и проектирования, сформулированных Робертом Мартином. Эти принципы помогают создавать гибкий, масштабируемый и поддерживаемый код. На фронтенде SOLID применяется к компонентам, хукам, сервисам и архитектуре приложения.',
    tags: ['Patterns'],
    legacyPath: '/patterns/solid-principles',
  },
  patternsStructuralPatterns: {
    id: 'patterns-structural-patterns',
    categoryId: 'patterns',
    title: 'Структурные паттерны проектирования',
    description:
      'Структурные паттерны описывают способы компоновки объектов и классов в более крупные структуры, сохраняя при этом гибкость и эффективность. Они помогают организовать связи между компонентами системы. Рассмотрим 7 основных структурных паттернов с примерами для фронтенд-разработки.',
    tags: ['Patterns'],
    legacyPath: '/patterns/structural-patterns',
  },
  patternsBehavioralPatterns: {
    id: 'patterns-behavioral-patterns',
    categoryId: 'patterns',
    title: 'Поведенческие паттерны проектирования',
    description:
      'Поведенческие паттерны определяют взаимодействие между объектами, распределение обязанностей и алгоритмы. Они помогают организовать эффективную коммуникацию и управление поведением объектов. В фронтенде эти паттерны особенно полезны для управления состоянием, событиями и пользовательским взаимодействием.',
    tags: ['Patterns'],
    legacyPath: '/patterns/behavioral-patterns',
  },
  patternsCreationalPatterns: {
    id: 'patterns-creational-patterns',
    categoryId: 'patterns',
    title: 'Порождающие паттерны проектирования',
    description:
      'Порождающие (Creational) паттерны — это паттерны проектирования, которые решают проблемы создания объектов. Они отвечают на вопрос "Как создавать объекты?" и предоставляют гибкие механизмы создания объектов, скрывая логику создания и делая систему независимой от способа создания объектов.',
    tags: ['Patterns'],
    legacyPath: '/patterns/creational-patterns',
  },
  dockerDocker: {
    id: 'docker-intro',
    categoryId: 'docker',
    title: 'Что такое Docker? Образы и контейнеры',
    description:
      'Docker — это платформа контейнеризации, которая позволяет упаковывать приложения со всеми их зависимостями в легковесные, переносимые контейнеры. Docker решает проблему "у меня работает, а у вас не работает" и обеспечивает консистентную среду выполнения.',
    tags: ['Docker'],
    legacyPath: '/docker/docker',
  },
  dockerDockerfileBuildContext: {
    id: 'docker-dockerfile',
    categoryId: 'docker',
    title: 'Что такое Dockerfile, контекст сборки и .dockerignore?',
    description:
      "Dockerfile — это текстовый файл с инструкциями для автоматической сборки Docker образа. Контекст сборки — это набор файлов, которые Docker отправляет daemon'у для использования во время сборки. .dockerignore — это файл для исключения ненужных файлов из контекста сборки.",
    tags: ['Docker'],
    legacyPath: '/docker/dockerfile',
  },
  dockerDockerLayersAndCache: {
    id: 'docker-layers-and-cache',
    categoryId: 'docker',
    title: 'Docker: Слои, кэш и оптимизация сборки',
    description:
      'Ключевой принцип Docker: каждая инструкция в Dockerfile создает новый слой. Понимание работы слоев и кэширования критически важно для эффективной сборки образов. Почему мы копируем package.json перед npm install, а исходный код — в последнюю очередь?',
    tags: ['Docker'],
    legacyPath: '/docker/layers-and-cache',
  },
  dockerRunCmdEntrypoint: {
    id: 'docker-run-cmd-entrypoint',
    categoryId: 'docker',
    title: 'RUN vs CMD vs ENTRYPOINT в Docker',
    description:
      'RUN, CMD и ENTRYPOINT — три ключевые инструкции Docker для выполнения команд. Они работают на разных этапах жизненного цикла контейнера и имеют разное поведение. Понимание их различий критически важно для эффективной работы с Docker.',
    tags: ['Docker'],
    legacyPath: '/docker/run-cmd-entrypoint',
  },
  dockerMultiStage: {
    id: 'docker-multi-stage',
    categoryId: 'docker',
    title: 'Multi-stage Docker builds: React SPA vs Next.js SSR',
    description:
      'Multi-stage builds — это возможность использовать несколько FROM инструкций в одном Dockerfile для создания промежуточных образов и копирования только нужных файлов в финальный образ. Это кардинально различается для React SPA (статические файлы) и Next.js SSR (серверное приложение).',
    tags: ['Docker'],
    legacyPath: '/docker/multi-stage',
  },
  dockerEnvVsArg: {
    id: 'docker-env-arg',
    categoryId: 'docker',
    title: 'ENV vs ARG в Docker и переменные в React',
    description:
      'ARG — переменные времени сборки (build-time), доступны только при создании образа. ENV — переменные времени выполнения (runtime), доступны в запущенном контейнере. В React приложениях используются префиксы VITE_ или REACT_APP_ для доступа к переменным окружения на frontend.',
    tags: ['Docker'],
    legacyPath: '/docker/env-arg',
  },
  dockerDockerNetworksAndPorts: {
    id: 'docker-networks-and-ports',
    categoryId: 'docker',
    title: 'EXPOSE vs -p, типы сетей Docker: bridge, host',
    description:
      'Понимание разницы между EXPOSE и -p критически важно для работы с Docker. EXPOSE — это только документация, а -p реально открывает порты. Bridge изолирует контейнеры, host использует сеть хоста напрямую.',
    tags: ['Docker'],
    legacyPath: '/docker/networks-and-ports',
  },
  dockerVolumesVsBindMounts: {
    id: 'docker-volumes-vs-bind-mounts',
    categoryId: 'docker',
    title: 'Docker Volume vs Bind Mount + Hot Reload в разработке',
    description:
      'Volumes и bind mounts — это два способа сохранения данных в Docker. Volume — это управляемое Docker хранилище, bind mount — привязка к файловой системе хоста. Для разработки с hot reload чаще используются bind mounts для синхронизации исходного кода.',
    tags: ['Docker'],
    legacyPath: '/docker/volumes-vs-bind-mounts',
  },
  dockerNginxSPA: {
    id: 'docker-nginx-spa',
    categoryId: 'docker',
    title: 'Nginx для SPA: зачем try_files $uri /index.html;',
    description:
      'Single Page Application (SPA) использует клиентский роутинг для навигации между страницами без перезагрузки. Но при прямом обращении к URL или обновлении страницы (F5) сервер пытается найти физический файл, которого не существует. try_files решает эту проблему.',
    tags: ['Docker'],
    legacyPath: '/docker/nginx-spa',
  },
  dockerDockerDebugging: {
    id: 'docker-debugging',
    categoryId: 'docker',
    title: 'Отладка Docker: логи, exec и healthcheck',
    description:
      'Отладка контейнеров — важный навык для разработчика. Основные инструменты: docker logs для просмотра логов, docker exec для интерактивной работы, и healthcheck для мониторинга здоровья приложения.',
    tags: ['Docker'],
    legacyPath: '/docker/debugging',
  },
  opsOpsCommands: {
    id: 'ops-commands',
    categoryId: 'ops',
    title: 'pwd, echo, cat, ls, pipes — основные команды Linux/Unix',
    description:
      'Базовые команды терминала — это фундамент для работы с Linux/Unix системами, Docker, CI/CD и DevOps. Понимание pwd, echo, cat, ls и pipes критически важно для эффективной разработки и деплоя приложений.',
    tags: ['Ops'],
    legacyPath: '/ops/ops-commands',
  },
  opsShellScripts: {
    id: 'ops-shell-scripts',
    categoryId: 'ops',
    title: 'Shell-скрипты: синтаксис, переменные, циклы, аргументы',
    description:
      'Shell-скрипты — это программы для автоматизации задач в Unix/Linux системах. Bash (Bourne Again Shell) — самый популярный shell для написания скриптов. Понимание переменных, условий, циклов и функций критично для DevOps, CI/CD и автоматизации.',
    tags: ['Ops'],
    legacyPath: '/ops/shell-scripts',
  },
  opsGrepAwkTail: {
    id: 'ops-grep-awk-tail',
    categoryId: 'ops',
    title: 'grep, awk, tail — мощные инструменты обработки текста и логов',
    description:
      'grep, awk и tail — это три фундаментальных команды Unix/Linux для работы с текстовыми данными. grep ищет паттерны, awk обрабатывает структурированный текст по колонкам, tail показывает последние строки и следит за файлами в реальном времени. Их комбинация — основа эффективного анализа логов и отладки.',
    tags: ['Ops'],
    legacyPath: '/ops/grep-awk-tail',
  },
  opsSedTutorial: {
    id: 'ops-sed',
    categoryId: 'ops',
    title: 'sed — мощный редактор потоков для модификации текста',
    description:
      'sed (Stream EDitor) — это утилита Unix для редактирования текста в потоке. Основное применение: замена текста, удаление строк, вставка содержимого, трансформация данных. sed обрабатывает файлы построчно, что делает его идеальным для автоматизации изменений в конфигурационных файлах, логах и исходном коде.',
    tags: ['Ops'],
    legacyPath: '/ops/sed',
  },
  optimizationWebVitalsOptimization: {
    id: 'optimization-web-vitals',
    categoryId: 'optimization',
    title: 'Web Vitals — ключевые метрики производительности',
    description:
      'Web Vitals — набор метрик от Google для измерения реального пользовательского опыта. Влияют на SEO и критически важны для конверсии. Core Web Vitals — три основные метрики: LCP, INP, CLS.',
    tags: ['Optimization'],
    legacyPath: '/optimization/web-vitals',
  },
  optimizationSEO: {
    id: 'optimization-seo',
    categoryId: 'optimization',
    title: 'SEO: Полное руководство по поисковой оптимизации для фронтенд-разработчиков',
    description:
      'SEO (Search Engine Optimization) — комплекс мер по оптимизации сайта для поисковых систем. Для фронтенд-разработчика это включает правильную HTML-разметку, мета-теги, структурированные данные, оптимизацию производительности и многое другое.',
    tags: ['Optimization'],
    legacyPath: '/optimization/seo',
  },
  optimizationOpenGraphAndTwitterCards: {
    id: 'optimization-og-twitter-cards',
    categoryId: 'optimization',
    title: 'Open Graph и Twitter Cards для соцсетей',
    description:
      'Open Graph и Twitter Cards — это протоколы метаданных, которые контролируют, как ваш контент отображается при публикации в социальных сетях. Правильная настройка этих мета-тегов критически важна для улучшения кликабельности, вовлеченности и распространения контента в соцсетях.',
    tags: ['Optimization'],
    legacyPath: '/optimization/og-twitter-cards',
  },
  optimizationSchemaOrg: {
    id: 'optimization-schema-org',
    categoryId: 'optimization',
    title: 'Schema.org разметка: Article, Product, Breadcrumb',
    description:
      'Schema.org — это словарь структурированных данных, который помогает поисковым системам лучше понимать содержимое веб-страниц. Разметка Schema.org позволяет создавать rich snippets (расширенные сниппеты) в результатах поиска, улучшая CTR и видимость сайта.',
    tags: ['Optimization'],
    legacyPath: '/optimization/schema-org',
  },
  optimizationSitemapAndRobots: {
    id: 'optimization-sitemap-and-robots',
    categoryId: 'optimization',
    title: 'XML Sitemap и robots.txt: управление индексацией сайта',
    description:
      'XML Sitemap и robots.txt — два ключевых файла для управления тем, как поисковые системы сканируют и индексируют ваш сайт. Sitemap помогает поисковикам найти все важные страницы, а robots.txt контролирует, какие страницы можно сканировать.',
    tags: ['Optimization'],
    legacyPath: '/optimization/sitemap-and-robots',
  },
  optimizationLazyLoading: {
    id: 'optimization-lazy-loading',
    categoryId: 'optimization',
    title: 'Lazy Loading для изображений и iframe',
    description:
      'Lazy loading — техника отложенной загрузки ресурсов (изображений, iframe), которая загружает контент только когда он действительно нужен пользователю. Это критическая оптимизация для улучшения начальной загрузки страницы и экономии трафика.',
    tags: ['Optimization'],
    legacyPath: '/optimization/lazy-loading',
  },
  optimizationMetaTags: {
    id: 'optimization-meta-tags',
    categoryId: 'optimization',
    title: 'Дефолтные meta-теги: title, description, keywords',
    description:
      'Meta-теги — это HTML-элементы, которые предоставляют метаданные о веб-странице поисковым системам, браузерам и социальным сетям. Три основных тега (title, description, keywords) исторически были основой SEO, хотя их значимость со временем изменилась.',
    tags: ['Optimization'],
    legacyPath: '/optimization/meta-tags',
  },
  optimizationCanonicalHreflang: {
    id: 'optimization-canonical-hreflang',
    categoryId: 'optimization',
    title: 'Canonical URL и hreflang для мультиязычных сайтов',
    description:
      'Canonical URL и hreflang — критически важные метатеги для мультиязычных сайтов, которые помогают поисковым системам правильно индексировать контент, избегать дублирования и показывать пользователям релевантную языковую версию страницы.',
    tags: ['Optimization'],
    legacyPath: '/optimization/canonical-hreflang',
  },
  tanstackQueryCustomTanStackQuery: {
    id: 'tanstack-query-custom',
    categoryId: 'tanstack-query',
    title: 'Реализуем свой React Query',
    description:
      'Прежде чем изучать TanStack Query, полезно собрать его уменьшенную копию вручную. Это закрепляет три фундаментальные темы React: пользовательские хуки, React Context API и управление асинхронным состоянием. Статья построена так, чтобы после её прочтения вы могли выполнить все шесть практических заданий.',
    tags: ['TanStack Query'],
    legacyPath: '/tanstack-query/custom-tanstack-query',
  },
  tanstackQueryTanStackSSRNext: {
    id: 'tanstack-query-ssr-next',
    categoryId: 'tanstack-query',
    title: 'SSR-гидратация TanStack Query в Next.js App Router',
    description:
      'В Next.js App Router серверные компоненты умеют получить данные до отправки страницы в браузер. TanStack Query добавляет к этому свой клиентский кэш: сервер заранее наполняет его данными, сериализует состояние, а клиентские компоненты читают тот же результат через обычный useQuery. Поэтому пользователь видит готовый HTML, а приложение после гидратации не начинает всё с пустого loading-состояния.',
    tags: ['TanStack Query'],
    legacyPath: '/tanstack-query/ssr-next',
  },
  jotaiJotaiPractice: {
    id: 'jotai-practice',
    categoryId: 'jotai',
    title: 'Jotai на практике: атомы, derived state и async-состояние без Redux-шаблонов',
    description:
      'Jotai часто воспринимают как "ещё один глобальный стор", но это не самая точная модель. В Redux обычно думают о едином store, actions, reducers и централизованном потоке изменений. В Jotai базовая единица — atom: маленький независимый кусочек состояния или вычисления. Приложение получается не одним большим объектом, а графом атомов.',
    tags: ['Jotai'],
    legacyPath: '/jotai/practice',
  },
  jotaiJotaiCookbook: {
    id: 'jotai-cookbook',
    categoryId: 'jotai',
    title: 'Jotai: книга рецептов для реального приложения',
    description:
      'В предыдущей статье Jotai был разобран через базовую идею: приложение как граф маленьких атомов. Теперь посмотрим на практические рецепты: изоляция состояния через Provider, управление store вне React, async-атомы, интеграция с TanStack Query, SSR-гидрация, UI-сценарии и утилиты из jotai/utils.',
    tags: ['Jotai'],
    legacyPath: '/jotai/cookbook',
  },
  llmIntroduction: {
    id: 'llm-introduction',
    categoryId: 'ai-basics',
    title: 'Вступление: как устроены LLM',
    description:
      'От промпта и токенов до весов, обучения и локального запуска: понятное введение в большие языковые модели без формул и магии.',
    tags: ['Основы ИИ', 'LLM', 'Локальное использование'],
  },
  showcase: {
    id: 'block-showcase',
    categoryId: 'preview',
    title: 'Витрина контентных блоков',
    description:
      'Все варианты оформления в одной статье: от текста и таблиц до вкладок, шагов и виджетов.',
    tags: ['Компоненты', 'Демонстрация'],
  },
} satisfies Record<string, ArticleSummary>

export default {
  schemaVersion: 1,
  categories: [
    { id: 'html', title: 'HTML', description: 'Структура, смысл и доступность веб-страниц.' },
    { id: 'css', title: 'CSS', description: 'Стили, селекторы и интерактивная практика.' },
    {
      id: 'javascript',
      title: 'JavaScript',
      description: 'Функции, асинхронность, объекты и возможности языка.',
    },
    {
      id: 'web-api',
      title: 'WebAPI',
      description: 'Возможности браузера: файлы, сеть, наблюдатели, хранилища и фоновые задачи.',
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Система типов, интерфейсы, Generics, классы и декораторы.',
    },
    { id: 'react', title: 'React', description: 'Компоненты, JSX, хуки, рендеринг и оптимизация.' },
    {
      id: 'web',
      title: 'Web',
      description:
        'Протоколы, безопасность, авторизация, производительность и архитектура веб-приложений.',
    },
    {
      id: 'testing',
      title: 'Testing',
      description: 'Виды тестирования, пирамида тестов и автоматизация проверок.',
    },
    {
      id: 'patterns',
      title: 'Patterns',
      description: 'Принципы проектирования, архитектура и паттерны программирования.',
    },
    {
      id: 'docker',
      title: 'Docker',
      description: 'Контейнеры, сборка образов, сети, хранилища и отладка.',
    },
    {
      id: 'ops',
      title: 'Ops',
      description: 'Команды терминала, shell-скрипты и обработка текста.',
    },
    {
      id: 'optimization',
      title: 'Optimization',
      description: 'Производительность, SEO, метаданные и загрузка ресурсов.',
    },
    {
      id: 'tanstack-query',
      title: 'TanStack Query',
      description: 'Устройство кэша запросов и серверный рендеринг.',
    },
    {
      id: 'jotai',
      title: 'Jotai',
      description: 'Атомы, производное состояние и практические примеры.',
    },
    {
      id: 'ai-basics',
      title: 'Основы ИИ и локальное использование',
      description:
        'Как устроены языковые модели, как их выбирать и использовать на своём компьютере.',
    },
    {
      id: 'preview',
      title: 'Возможности v2',
      description: 'Пример, на котором можно проверить все виды блоков.',
    },
  ],
  articles: Object.values(articleSummaries),
} satisfies ArticleCatalog
