import type { Question } from '@/types/question.ts'

export const jsEventLoopQuestions: Question[] = [
  // Тема 1: Как работает Event Loop
  {
    id: 1,
    question: "Что такое Event Loop в JavaScript?",
    options: [
      "Механизм для обработки событий DOM",
      "Механизм координации выполнения синхронного и асинхронного кода",
      "Цикл для итерации по массивам",
      "Функция для создания событий"
    ],
    correctAnswer: 1,
    explanation: "Event Loop — это механизм в JavaScript, который координирует выполнение синхронного кода, асинхронных операций и обновление пользовательского интерфейса. Он обеспечивает неблокирующее выполнение кода в однопоточной среде.",
    topic: "Основы Event Loop"
  },
  {
    id: 2,
    question: "JavaScript является однопоточным языком. Как тогда возможна асинхронность?",
    options: [
      "Браузер создает дополнительные потоки для каждой асинхронной операции",
      "Event Loop и Web APIs позволяют выполнять операции вне основного потока",
      "JavaScript автоматически становится многопоточным при асинхронных операциях",
      "Асинхронность в JavaScript — это иллюзия"
    ],
    correctAnswer: 1,
    explanation: "Хотя JavaScript однопоточный, браузер предоставляет Web APIs (таймеры, HTTP запросы, DOM события), которые выполняются в отдельных потоках. Event Loop координирует возврат результатов этих операций в основной поток JavaScript.",
    topic: "Основы Event Loop"
  },
  {
    id: 3,
    question: "Какие основные компоненты входят в архитектуру Event Loop?",
    options: [
      "Call Stack, Heap, Queue",
      "Call Stack, Web APIs, Task Queue, Microtask Queue",
      "Memory, Processor, Cache",
      "Variables, Functions, Objects"
    ],
    correctAnswer: 1,
    explanation: "Основные компоненты Event Loop: Call Stack (стек вызовов), Web APIs (браузерные API), Task Queue (очередь макрозадач), Microtask Queue (очередь микрозадач). Event Loop координирует взаимодействие между ними.",
    topic: "Основы Event Loop"
  },
  {
    id: 4,
    question: "Что такое Call Stack?",
    options: [
      "Очередь для асинхронных операций",
      "Структура данных для отслеживания выполнения функций",
      "Память для хранения переменных",
      "Список всех функций в программе"
    ],
    correctAnswer: 1,
    explanation: "Call Stack — это структура данных LIFO (Last In, First Out), которая отслеживает выполнение функций. Когда функция вызывается, она добавляется в стек, когда завершается — удаляется из стека.",
    topic: "Основы Event Loop"
  },
  {
    id: 5,
    question: "Что произойдет, если Call Stack пуст?",
    options: [
      "Программа завершится",
      "Event Loop проверит очереди задач и переместит задачи в Call Stack",
      "Браузер закроется",
      "Начнется сборка мусора"
    ],
    correctAnswer: 1,
    explanation: "Когда Call Stack пуст, Event Loop проверяет очереди задач (сначала Microtask Queue, затем Task Queue) и перемещает готовые к выполнению задачи в Call Stack.",
    topic: "Основы Event Loop"
  },
  {
    id: 6,
    question: "В каком порядке Event Loop обрабатывает задачи?",
    options: [
      "Task Queue → Microtask Queue → Call Stack",
      "Call Stack → Microtask Queue → Task Queue",
      "Microtask Queue → Task Queue → Call Stack",
      "Все одновременно"
    ],
    correctAnswer: 1,
    explanation: "Event Loop сначала выполняет весь синхронный код в Call Stack, затем обрабатывает ВСЕ задачи из Microtask Queue, и только потом берет ОДНУ задачу из Task Queue. Этот цикл повторяется.",
    topic: "Основы Event Loop"
  },
  {
    id: 7,
    question: "Что выведет этот код?\n\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
    options: [
      "1, 2, 3, 4",
      "1, 4, 2, 3",
      "1, 4, 3, 2",
      "1, 3, 4, 2"
    ],
    correctAnswer: 2,
    explanation: "Сначала выполняется синхронный код (1, 4), затем микрозадачи (Promise - 3), затем макрозадачи (setTimeout - 2). Результат: 1, 4, 3, 2.",
    topic: "Основы Event Loop"
  },
  {
    id: 8,
    question: "Что такое Microtask Queue?",
    options: [
      "Очередь для setTimeout и setInterval",
      "Очередь для Promise callbacks, queueMicrotask, и MutationObserver",
      "Очередь для DOM событий",
      "Очередь для Ajax запросов"
    ],
    correctAnswer: 1,
    explanation: "Microtask Queue содержит микрозадачи: Promise callbacks (.then, .catch, .finally), queueMicrotask(), и MutationObserver callbacks. Они имеют более высокий приоритет, чем макрозадачи.",
    topic: "Основы Event Loop"
  },
  {
    id: 9,
    question: "Что такое Task Queue (Macrotask Queue)?",
    options: [
      "Очередь для Promise callbacks",
      "Очередь для setTimeout, setInterval, DOM события, Ajax callbacks",
      "Очередь только для DOM событий",
      "Очередь для синхронных операций"
    ],
    correctAnswer: 1,
    explanation: "Task Queue (или Macrotask Queue) содержит макрозадачи: setTimeout, setInterval, setImmediate (Node.js), DOM события, Ajax callbacks, и другие асинхронные браузерные API.",
    topic: "Основы Event Loop"
  },
  {
    id: 10,
    question: "Можете ли вы заблокировать Event Loop?",
    options: [
      "Нет, Event Loop нельзя заблокировать",
      "Да, с помощью длительных синхронных операций",
      "Да, но только с помощью промисов",
      "Да, но только в Node.js"
    ],
    correctAnswer: 1,
    explanation: "Event Loop можно заблокировать длительными синхронными операциями в Call Stack (например, тяжелые вычисления в цикле). Пока синхронный код выполняется, Event Loop не может обработать задачи из очередей.",
    topic: "Основы Event Loop"
  },
  {
    id: 11,
    question: "Что произойдет, если в microtask создать новую microtask?",
    options: [
      "Новая microtask будет проигнорирована",
      "Новая microtask будет добавлена в конец Microtask Queue и выполнена в том же цикле",
      "Новая microtask перейдет в Task Queue",
      "Это вызовет ошибку"
    ],
    correctAnswer: 1,
    explanation: "Если внутри микрозадачи создается новая микрозадача, она добавляется в конец Microtask Queue и будет выполнена в том же цикле Event Loop перед переходом к Task Queue.",
    topic: "Основы Event Loop"
  },
  {
    id: 12,
    question: "Что выведет этот код?\n\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => {\n  console.log('promise1');\n  return Promise.resolve();\n}).then(() => console.log('promise2'));",
    options: [
      "timeout, promise1, promise2",
      "promise1, promise2, timeout",
      "promise1, timeout, promise2",
      "timeout, promise1, promise2 (одновременно)"
    ],
    correctAnswer: 1,
    explanation: "Микрозадачи выполняются полностью перед макрозадачами. Сначала выполнятся оба промиса (promise1, promise2), затем timeout.",
    topic: "Основы Event Loop"
  },

  // Тема 2: requestAnimationFrame в Event Loop
  {
    id: 13,
    question: "Где в цикле Event Loop выполняется requestAnimationFrame?",
    options: [
      "В Microtask Queue",
      "В Task Queue",
      "В отдельной фазе между микрозадачами и макрозадачами",
      "В специальной Animation Queue после рендеринга"
    ],
    correctAnswer: 3,
    explanation: "requestAnimationFrame выполняется в специальной Animation Queue во время фазы рендеринга, после обработки микрозадач и перед следующим кадром. Это обеспечивает плавную анимацию с частотой обновления экрана.",
    topic: "requestAnimationFrame"
  },
  {
    id: 14,
    question: "С какой частотой выполняется requestAnimationFrame?",
    options: [
      "1000 раз в секунду",
      "60 раз в секунду (или с частотой обновления экрана)",
      "1 раз в секунду",
      "Зависит от производительности устройства"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame выполняется с частотой обновления экрана, обычно 60 FPS (60 раз в секунду), но может быть 120 FPS на современных устройствах. Это обеспечивает плавную анимацию.",
    topic: "requestAnimationFrame"
  },
  {
    id: 15,
    question: "В чем основное преимущество requestAnimationFrame перед setTimeout для анимаций?",
    options: [
      "requestAnimationFrame выполняется быстрее",
      "Синхронизация с частотой обновления экрана и автоматическая приостановка на неактивных вкладках",
      "requestAnimationFrame поддерживается во всех браузерах",
      "requestAnimationFrame использует меньше памяти"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame синхронизируется с частотой обновления экрана, предотвращает ненужные перерисовки, автоматически приостанавливается на неактивных вкладках, что делает анимации более плавными и энергоэффективными.",
    topic: "requestAnimationFrame"
  },
  {
    id: 16,
    question: "Что выведет этот код?\n\nconsole.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nrequestAnimationFrame(() => console.log('raf'));\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('end');",
    options: [
      "start, end, promise, timeout, raf",
      "start, end, promise, raf, timeout",
      "start, end, raf, promise, timeout",
      "start, promise, end, raf, timeout"
    ],
    correctAnswer: 1,
    explanation: "Порядок выполнения: синхронный код (start, end), микрозадачи (promise), requestAnimationFrame (raf), макрозадачи (timeout). requestAnimationFrame выполняется перед следующим кадром, после микрозадач.",
    topic: "requestAnimationFrame"
  },
  {
    id: 17,
    question: "Когда НЕ стоит использовать requestAnimationFrame?",
    options: [
      "Для анимации DOM элементов",
      "Для анимации Canvas",
      "Для периодических операций, не связанных с визуальными обновлениями",
      "Для игр и интерактивных приложений"
    ],
    correctAnswer: 2,
    explanation: "requestAnimationFrame предназначен для визуальных обновлений. Для операций, не связанных с рендерингом (например, обработка данных, сетевые запросы), лучше использовать setTimeout или setInterval.",
    topic: "requestAnimationFrame"
  },
  {
    id: 18,
    question: "Что происходит с requestAnimationFrame на неактивной вкладке браузера?",
    options: [
      "Продолжает выполняться с той же частотой",
      "Приостанавливается для экономии ресурсов",
      "Выполняется медленнее",
      "Переходит в Task Queue"
    ],
    correctAnswer: 1,
    explanation: "На неактивных вкладках requestAnimationFrame автоматически приостанавливается для экономии CPU и батареи. Это одно из его главных преимуществ перед setTimeout для анимаций.",
    topic: "requestAnimationFrame"
  },
  {
    id: 19,
    question: "Можно ли отменить запланированный requestAnimationFrame?",
    options: [
      "Нет, его нельзя отменить",
      "Да, с помощью cancelAnimationFrame()",
      "Да, с помощью clearTimeout()",
      "Да, но только до начала выполнения"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame возвращает ID, который можно передать в cancelAnimationFrame() для отмены запланированного кадра анимации.",
    topic: "requestAnimationFrame"
  },
  {
    id: 20,
    question: "В каком случае requestAnimationFrame может выполняться реже 60 FPS?",
    options: [
      "Никогда, частота всегда 60 FPS",
      "При высокой нагрузке на CPU или при более низкой частоте обновления экрана",
      "На мобильных устройствах",
      "В режиме разработчика"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame может выполняться реже 60 FPS при высокой нагрузке на систему, на экранах с меньшей частотой обновления, или когда браузер не успевает обработать кадр в отведенное время.",
    topic: "requestAnimationFrame"
  },
  {
    id: 21,
    question: "Как правильно создать плавную анимацию с requestAnimationFrame?",
    options: [
      "Вызвать requestAnimationFrame один раз",
      "Рекурсивно вызывать requestAnimationFrame внутри callback функции",
      "Использовать setInterval с requestAnimationFrame",
      "Создать несколько requestAnimationFrame одновременно"
    ],
    correctAnswer: 1,
    explanation: "Для создания плавной анимации нужно рекурсивно вызывать requestAnimationFrame внутри callback функции, создавая цикл анимации, который автоматически синхронизируется с частотой обновления экрана.",
    topic: "requestAnimationFrame"
  },
  {
    id: 22,
    question: "Что выведет этот код?\n\nrequestAnimationFrame(() => {\n  console.log('raf1');\n  requestAnimationFrame(() => console.log('raf2'));\n});\nsetTimeout(() => console.log('timeout'), 0);",
    options: [
      "raf1, raf2, timeout",
      "timeout, raf1, raf2",
      "raf1, timeout, raf2",
      "timeout, raf2, raf1"
    ],
    correctAnswer: 2,
    explanation: "В первом кадре выполнится raf1, затем setTimeout (timeout), во втором кадре выполнится raf2. requestAnimationFrame выполняется один раз за кадр, вложенные raf переносятся на следующий кадр.",
    topic: "requestAnimationFrame"
  },
  {
    id: 23,
    question: "Какая функция предоставляет timestamp (временную метку) в requestAnimationFrame?",
    options: [
      "Date.now()",
      "performance.now()",
      "Параметр callback функции requestAnimationFrame",
      "window.timestamp"
    ],
    correctAnswer: 2,
    explanation: "Callback функция requestAnimationFrame получает параметр DOMHighResTimeStamp, который содержит высокоточную временную метку начала кадра. Это полезно для создания анимаций независимых от частоты кадров.",
    topic: "requestAnimationFrame"
  },
  {
    id: 24,
    question: "Зачем нужен timestamp в requestAnimationFrame?",
    options: [
      "Для отладки производительности",
      "Для создания анимаций независимых от частоты кадров",
      "Для синхронизации с сервером",
      "Для логирования событий"
    ],
    correctAnswer: 1,
    explanation: "Timestamp позволяет создавать анимации основанные на времени, а не на количестве кадров. Это делает анимации одинаковыми по скорости независимо от частоты обновления экрана (60 FPS, 120 FPS и т.д.).",
    topic: "requestAnimationFrame"
  }
]
