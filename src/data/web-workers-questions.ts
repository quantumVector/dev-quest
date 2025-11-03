import type { Question } from '@/types/question.ts'

export const webWorkersQuestions: Question[] = [
  // Тема 1: Основы Web Workers
  {
    id: 1,
    question: "Что такое Web Worker в JavaScript?",
    options: [
      "Библиотека для работы с HTTP запросами",
      "Механизм для выполнения JavaScript в фоновом потоке",
      "Инструмент для оптимизации DOM",
      "Встроенный менеджер состояния приложения"
    ],
    correctAnswer: 1,
    explanation: "Web Worker — это механизм для выполнения JavaScript кода в фоновом потоке, отдельном от основного потока выполнения веб-страницы. Это позволяет выполнять тяжелые вычисления без блокировки UI.",
    topic: "Основы Web Workers"
  },
  {
    id: 2,
    question: "Как создать экземпляр Web Worker?",
    options: [
      "worker.create('worker.js')",
      "new Worker('worker.js')",
      "Worker.start('worker.js')",
      "createWorker('worker.js')"
    ],
    correctAnswer: 1,
    explanation: "Web Worker создается через конструктор: new Worker('worker.js'), где в качестве параметра передается путь к файлу JavaScript, который будет выполняться в фоновом потоке.",
    topic: "Основы Web Workers"
  },
  {
    id: 3,
    question: "Как отправить данные в Web Worker из основного потока?",
    options: [
      "worker.send(data)",
      "worker.postMessage(data)",
      "worker.emit(data)",
      "worker.dispatch(data)"
    ],
    correctAnswer: 1,
    explanation: "Для отправки данных в Worker используется метод postMessage(): worker.postMessage(data). Данные будут структурно клонированы (по умолчанию) или переданы через transfer.",
    topic: "Основы Web Workers"
  },
  {
    id: 4,
    question: "Как получить сообщение от Worker в основном потоке?",
    options: [
      "worker.addEventListener('message', handler)",
      "worker.onmessage = handler",
      "Оба варианта верны",
      "worker.receive(handler)"
    ],
    correctAnswer: 2,
    explanation: "Для получения сообщений от Worker можно использовать worker.onmessage = handler или worker.addEventListener('message', handler). Оба способа корректны.",
    topic: "Основы Web Workers"
  },
  {
    id: 5,
    question: "Имеет ли Web Worker доступ к DOM?",
    options: [
      "Да, полный доступ",
      "Да, но только для чтения",
      "Нет, DOM недоступен в Worker",
      "Да, через специальный API"
    ],
    correctAnswer: 2,
    explanation: "Web Worker не имеет доступа к DOM, window объекту и родительским объектам. Worker выполняется в изолированном глобальном контексте с использованием self вместо window.",
    topic: "Основы Web Workers"
  },
  {
    id: 6,
    question: "Как завершить работу Worker из основного потока?",
    options: [
      "worker.stop()",
      "worker.terminate()",
      "worker.close()",
      "worker.kill()"
    ],
    correctAnswer: 1,
    explanation: "Метод terminate() немедленно завершает работу Worker из основного потока. После вызова terminate() Worker полностью удаляется без возможности восстановления.",
    topic: "Основы Web Workers"
  },
  {
    id: 7,
    question: "Как Worker может завершить свою работу изнутри?",
    options: [
      "self.terminate()",
      "self.close()",
      "self.exit()",
      "self.stop()"
    ],
    correctAnswer: 1,
    explanation: "Изнутри Worker может завершить свою работу с помощью self.close(). Это корректный способ самозавершения Worker.",
    topic: "Основы Web Workers"
  },
  {
    id: 8,
    question: "Какой объект используется вместо window в Worker?",
    options: [
      "global",
      "worker",
      "self",
      "this"
    ],
    correctAnswer: 2,
    explanation: "В Web Worker используется self для доступа к глобальному контексту вместо window. self.postMessage(), self.onmessage и т.д.",
    topic: "Основы Web Workers"
  },
  {
    id: 9,
    question: "Что произойдет при ошибке в Worker?",
    options: [
      "Worker автоматически перезапустится",
      "Сработает обработчик worker.onerror",
      "Ошибка проигнорируется",
      "Приложение закроется"
    ],
    correctAnswer: 1,
    explanation: "При возникновении ошибки в Worker сработает обработчик worker.onerror в основном потоке, позволяя обработать ошибку и получить информацию о ней (message, filename, lineno).",
    topic: "Основы Web Workers"
  },
  {
    id: 10,
    question: "Может ли Worker создать другой Worker?",
    options: [
      "Нет, Workers могут создаваться только из основного потока",
      "Да, Workers могут создавать вложенные Workers",
      "Да, но только один уровень вложенности",
      "Да, но требуются специальные разрешения"
    ],
    correctAnswer: 1,
    explanation: "Web Workers могут создавать другие Workers (subworkers). Это позволяет строить иерархические структуры для распределения задач между несколькими потоками.",
    topic: "Основы Web Workers"
  },

  // Тема 2: Передача данных
  {
    id: 11,
    question: "Какой метод передачи данных используется по умолчанию в postMessage?",
    options: [
      "Передача по ссылке",
      "Структурированное клонирование (Structured Cloning)",
      "Transferable Objects",
      "Сериализация в JSON"
    ],
    correctAnswer: 1,
    explanation: "По умолчанию postMessage использует алгоритм структурированного клонирования, который создает глубокую копию данных. Оригинал остается доступным в исходном потоке.",
    topic: "Передача данных"
  },
  {
    id: 12,
    question: "Что такое Transferable Objects в контексте Web Workers?",
    options: [
      "Объекты, которые можно передавать между Workers",
      "Объекты, владение которыми передается без копирования (zero-copy)",
      "Объекты, сериализуемые в JSON",
      "Объекты с методом transfer()"
    ],
    correctAnswer: 1,
    explanation: "Transferable Objects — это специальные объекты (ArrayBuffer, MessagePort, ImageBitmap и др.), которые можно передавать между потоками без копирования, передавая владение. После transfer оригинал становится недоступен (detached).",
    topic: "Передача данных"
  },
  {
    id: 13,
    question: "Как использовать Transferable Objects с postMessage?",
    options: [
      "postMessage(data, { transfer: true })",
      "postMessage(data, [transferableObjects])",
      "postMessage(data).transfer(objects)",
      "transferMessage(data, objects)"
    ],
    correctAnswer: 1,
    explanation: "Для использования Transferable Objects нужно передать массив этих объектов вторым параметром: worker.postMessage({buffer: arrayBuffer}, [arrayBuffer]). Владение будет передано без копирования.",
    topic: "Передача данных"
  },
  {
    id: 14,
    question: "Что происходит с ArrayBuffer после transfer?",
    options: [
      "Остается доступным в обоих потоках",
      "Становится detached (опустошается) в исходном потоке",
      "Удаляется из памяти",
      "Копируется в новый поток"
    ],
    correctAnswer: 1,
    explanation: "После transfer ArrayBuffer становится detached в исходном потоке: его byteLength становится 0, и он больше недоступен. Владение полностью передается в целевой поток.",
    topic: "Передача данных"
  },
  {
    id: 15,
    question: "Какие типы объектов можно передавать через Transferable Objects?",
    options: [
      "Любые объекты JavaScript",
      "Только примитивные типы",
      "ArrayBuffer, MessagePort, ImageBitmap, OffscreenCanvas и подобные",
      "Только ArrayBuffer"
    ],
    correctAnswer: 2,
    explanation: "Transferable Objects включают: ArrayBuffer, MessagePort, ImageBitmap, OffscreenCanvas, ReadableStream, WritableStream, TransformStream. Эти объекты поддерживают передачу владения без копирования.",
    topic: "Передача данных"
  },
  {
    id: 16,
    question: "Что такое SharedArrayBuffer?",
    options: [
      "Обычный массив, разделяемый между функциями",
      "Разделяемая память, доступная нескольким потокам одновременно",
      "ArrayBuffer с увеличенным размером",
      "Буфер для обмена данными через localStorage"
    ],
    correctAnswer: 1,
    explanation: "SharedArrayBuffer — это разделяемая память между потоками. Оба потока могут читать и писать в одну и ту же область памяти одновременно, что требует использования Atomics API для синхронизации.",
    topic: "Передача данных"
  },
  {
    id: 17,
    question: "Какие HTTP заголовки требуются для использования SharedArrayBuffer?",
    options: [
      "Access-Control-Allow-Origin",
      "Cross-Origin-Opener-Policy и Cross-Origin-Embedder-Policy",
      "Content-Security-Policy",
      "X-Frame-Options"
    ],
    correctAnswer: 1,
    explanation: "Для использования SharedArrayBuffer требуются заголовки: Cross-Origin-Opener-Policy: same-origin и Cross-Origin-Embedder-Policy: require-corp. Это меры безопасности против Spectre атак.",
    topic: "Передача данных"
  },
  {
    id: 18,
    question: "Что такое Atomics API?",
    options: [
      "API для работы с атомами в химии",
      "API для атомарных операций с разделяемой памятью",
      "API для создания неделимых блоков кода",
      "API для оптимизации производительности"
    ],
    correctAnswer: 1,
    explanation: "Atomics API предоставляет атомарные операции для работы с SharedArrayBuffer: load, store, add, compareExchange, wait, notify. Это обеспечивает безопасную работу с разделяемой памятью без race conditions.",
    topic: "Передача данных"
  },
  {
    id: 19,
    question: "Можно ли передать функцию через postMessage?",
    options: [
      "Да, функции передаются как есть",
      "Нет, функции нельзя передавать",
      "Да, но нужно использовать специальный API",
      "Только стрелочные функции"
    ],
    correctAnswer: 1,
    explanation: "Функции нельзя передавать через postMessage напрямую — будет ошибка DataCloneError. Обходное решение: передать функцию как строку и выполнить через new Function() или eval() в Worker.",
    topic: "Передача данных"
  },
  {
    id: 20,
    question: "Какие типы данных поддерживает структурированное клонирование?",
    options: [
      "Только примитивы и простые объекты",
      "Примитивы, объекты, массивы, Date, RegExp, Map, Set, Blob, File",
      "Все типы JavaScript включая функции",
      "Только JSON-совместимые типы"
    ],
    correctAnswer: 1,
    explanation: "Структурированное клонирование поддерживает: примитивы, объекты, массивы, типизированные массивы, Date, RegExp, Map, Set, Blob, File, ImageData. НЕ поддерживает: функции, DOM элементы, символы как ключи, геттеры/сеттеры.",
    topic: "Передача данных"
  },

  // Тема 3: Типы Workers
  {
    id: 21,
    question: "В чем разница между Dedicated Worker и Shared Worker?",
    options: [
      "Dedicated быстрее работает",
      "Dedicated привязан к одному скрипту, Shared разделяется между вкладками",
      "Shared имеет доступ к DOM",
      "Нет разницы, это синонимы"
    ],
    correctAnswer: 1,
    explanation: "Dedicated Worker привязан к одному скрипту/странице, Shared Worker может использоваться несколькими вкладками/окнами одного origin одновременно. Shared использует систему портов для коммуникации.",
    topic: "Типы Workers"
  },
  {
    id: 22,
    question: "Как создать Shared Worker?",
    options: [
      "new Worker('worker.js', { shared: true })",
      "new SharedWorker('worker.js')",
      "Worker.shared('worker.js')",
      "createSharedWorker('worker.js')"
    ],
    correctAnswer: 1,
    explanation: "Shared Worker создается через конструктор SharedWorker: new SharedWorker('worker.js'). Для коммуникации используется worker.port.postMessage() и worker.port.onmessage.",
    topic: "Типы Workers"
  },
  {
    id: 23,
    question: "Какое событие срабатывает в Shared Worker при подключении новой вкладки?",
    options: [
      "onconnection",
      "onconnect",
      "onjoin",
      "onattach"
    ],
    correctAnswer: 1,
    explanation: "При подключении новой вкладки к Shared Worker срабатывает событие onconnect. В обработчике можно получить port для коммуникации с этой вкладкой: event.ports[0].",
    topic: "Типы Workers"
  },
  {
    id: 24,
    question: "Как Shared Worker взаимодействует с несколькими вкладками?",
    options: [
      "Через глобальный объект",
      "Через систему портов (MessagePort)",
      "Через localStorage",
      "Через прямые вызовы функций"
    ],
    correctAnswer: 1,
    explanation: "Shared Worker использует систему портов (MessagePort) для коммуникации. Каждая подключенная вкладка получает свой порт через событие onconnect, и Worker может отправлять сообщения на конкретные порты.",
    topic: "Типы Workers"
  },
  {
    id: 25,
    question: "Что такое Service Worker?",
    options: [
      "Синоним Web Worker",
      "Worker для фоновой обработки данных",
      "Программируемый сетевой прокси для кеширования и offline режима",
      "Worker для обработки UI событий"
    ],
    correctAnswer: 2,
    explanation: "Service Worker — это программируемый сетевой прокси, работающий между веб-приложением и сетью. Используется для кеширования ресурсов, работы offline, push уведомлений и фоновой синхронизации.",
    topic: "Типы Workers"
  },
  {
    id: 26,
    question: "Можно ли использовать Module Workers (type: 'module')?",
    options: [
      "Нет, Workers не поддерживают модули",
      "Да, с помощью опции { type: 'module' }",
      "Да, но только в Node.js",
      "Да, но требуется полифилл"
    ],
    correctAnswer: 1,
    explanation: "Module Workers создаются с опцией type: 'module': new Worker('worker.js', { type: 'module' }). Это позволяет использовать import/export внутри Worker.",
    topic: "Типы Workers"
  },
  {
    id: 27,
    question: "Сколько вкладок может подключиться к одному Shared Worker?",
    options: [
      "Только одна",
      "Не более 10",
      "Неограниченное количество (в рамках одного origin)",
      "Зависит от браузера, обычно 2-3"
    ],
    correctAnswer: 2,
    explanation: "К одному Shared Worker может подключиться неограниченное количество вкладок одного origin. Worker управляет портами всех подключенных вкладок и может рассылать сообщения.",
    topic: "Типы Workers"
  },

  // Тема 4: Практическое применение
  {
    id: 28,
    question: "Для каких задач НЕ подходят Web Workers?",
    options: [
      "Криптография и хеширование",
      "Обработка больших массивов данных",
      "Манипуляции с DOM элементами",
      "Парсинг CSV файлов"
    ],
    correctAnswer: 2,
    explanation: "Web Workers НЕ имеют доступа к DOM и не подходят для манипуляций с UI элементами. Они отлично подходят для вычислений, обработки данных, криптографии — всего, что не требует DOM.",
    topic: "Практическое применение"
  },
  {
    id: 29,
    question: "Какое оптимальное количество Workers создавать для параллельной обработки?",
    options: [
      "Всегда создавать максимум Workers",
      "Примерно равное navigator.hardwareConcurrency",
      "Не более 2 Workers",
      "По одному Worker на задачу"
    ],
    correctAnswer: 1,
    explanation: "Оптимальное количество Workers обычно равно navigator.hardwareConcurrency (количество логических процессоров) или чуть меньше. Слишком много Workers создадут overhead и конкуренцию за ресурсы.",
    topic: "Практическое применение"
  },
  {
    id: 30,
    question: "Что такое Worker Pool?",
    options: [
      "Хранилище данных для Workers",
      "Пул переиспользуемых Workers для распределения задач",
      "Система кеширования в Workers",
      "Группа Workers с общей памятью"
    ],
    correctAnswer: 1,
    explanation: "Worker Pool — это паттерн, где создается фиксированное количество Workers, которые переиспользуются для выполнения множества задач. Задачи добавляются в очередь и распределяются по свободным Workers.",
    topic: "Практическое применение"
  },
  {
    id: 31,
    question: "Когда стоит использовать Web Workers вместо requestIdleCallback?",
    options: [
      "Для всех асинхронных задач",
      "Когда задача требует значительных вычислений и может заблокировать UI",
      "Только для работы с сетью",
      "Никогда, requestIdleCallback всегда лучше"
    ],
    correctAnswer: 1,
    explanation: "Web Workers используйте для тяжелых вычислений, которые могут заблокировать UI на > 50ms. requestIdleCallback подходит для некритичных задач, выполняемых в свободное время браузера.",
    topic: "Практическое применение"
  },
  {
    id: 32,
    question: "Как отслеживать прогресс выполнения задачи в Worker?",
    options: [
      "Worker автоматически отправляет прогресс",
      "Worker периодически отправляет postMessage с процентом выполнения",
      "Через worker.progress",
      "Невозможно отслеживать прогресс"
    ],
    correctAnswer: 1,
    explanation: "Для отслеживания прогресса Worker периодически отправляет сообщения с информацией о прогрессе через postMessage({ type: 'progress', percent: 50 }). Основной поток получает и отображает прогресс.",
    topic: "Практическое применение"
  },
  {
    id: 33,
    question: "Можно ли использовать fetch внутри Web Worker?",
    options: [
      "Нет, fetch доступен только в основном потоке",
      "Да, fetch полностью доступен в Workers",
      "Да, но только для GET запросов",
      "Да, но требуется специальная настройка"
    ],
    correctAnswer: 1,
    explanation: "Fetch API полностью доступен внутри Web Workers. Можно делать HTTP запросы, работать с Promise, использовать async/await — все, что не связано с DOM.",
    topic: "Практическое применение"
  },
  {
    id: 34,
    question: "Как обработать большой файл в Worker без блокировки UI?",
    options: [
      "Передать файл целиком в Worker",
      "Разбить файл на chunks и обрабатывать по частям",
      "Использовать несколько Workers параллельно",
      "Все варианты верны"
    ],
    correctAnswer: 3,
    explanation: "Для обработки больших файлов можно: 1) передать файл целиком в Worker через ArrayBuffer + transfer, 2) разбить на chunks и обрабатывать последовательно, 3) распределить chunks между несколькими Workers. Выбор зависит от задачи.",
    topic: "Практическое применение"
  },
  {
    id: 35,
    question: "Доступен ли IndexedDB внутри Web Worker?",
    options: [
      "Нет, IndexedDB только в основном потоке",
      "Да, IndexedDB полностью доступен в Workers",
      "Да, но только для чтения",
      "Да, через специальный API"
    ],
    correctAnswer: 1,
    explanation: "IndexedDB полностью доступен в Web Workers. Можно выполнять все операции: открывать базу, читать, писать, создавать индексы. Это полезно для фоновой обработки данных.",
    topic: "Практическое применение"
  },

  // Тема 5: Ограничения и особенности
  {
    id: 36,
    question: "Что из перечисленного НЕДОСТУПНО в Web Worker?",
    options: [
      "console.log",
      "document.querySelector",
      "setTimeout",
      "fetch"
    ],
    correctAnswer: 1,
    explanation: "В Web Worker недоступны: document, window, parent, DOM API, localStorage, sessionStorage. Доступны: console, таймеры, fetch, WebSocket, IndexedDB, Crypto API.",
    topic: "Ограничения"
  },
  {
    id: 37,
    question: "Что произойдет при попытке доступа к localStorage в Worker?",
    options: [
      "Все будет работать нормально",
      "localStorage будет undefined или выбросит ошибку",
      "localStorage доступен только для чтения",
      "localStorage автоматически синхронизируется"
    ],
    correctAnswer: 1,
    explanation: "localStorage и sessionStorage недоступны в Web Workers. При попытке доступа получите undefined или ReferenceError. Для хранения данных используйте IndexedDB или Cache API.",
    topic: "Ограничения"
  },
  {
    id: 38,
    question: "Можно ли импортировать внешние скрипты в Worker?",
    options: [
      "Нет, Workers изолированы",
      "Да, через importScripts()",
      "Да, через import если type: 'module'",
      "Оба варианта верны"
    ],
    correctAnswer: 3,
    explanation: "В Workers можно импортировать скрипты двумя способами: 1) importScripts('lib.js') — синхронная загрузка, 2) import для Module Workers (type: 'module').",
    topic: "Ограничения"
  },
  {
    id: 39,
    question: "Применяется ли Same-Origin Policy к Web Workers?",
    options: [
      "Нет, Workers могут загружаться откуда угодно",
      "Да, Worker должен быть с того же origin",
      "Зависит от настроек браузера",
      "Только для Shared Workers"
    ],
    correctAnswer: 1,
    explanation: "Same-Origin Policy применяется к Workers. Worker должен быть загружен с того же origin (protocol + domain + port). Обходное решение: создание Worker из Blob URL.",
    topic: "Ограничения"
  },
  {
    id: 40,
    question: "Какие проблемы могут возникнуть при создании слишком многих Workers?",
    options: [
      "Никаких проблем, чем больше тем лучше",
      "Overhead создания потоков и конкуренция за CPU",
      "Браузер не позволит создать больше 2 Workers",
      "Workers станут медленнее работать"
    ],
    correctAnswer: 1,
    explanation: "Создание слишком многих Workers приводит к: 1) overhead создания и управления потоками, 2) конкуренции за CPU, 3) увеличению использования памяти. Оптимально создавать ~navigator.hardwareConcurrency Workers.",
    topic: "Ограничения"
  },

  // Тема 6: Продвинутые темы
  {
    id: 41,
    question: "Что такое Broadcast Channel в контексте Workers?",
    options: [
      "Канал для отправки сообщений всем подписчикам одного origin",
      "Канал для видео трансляций",
      "Альтернатива postMessage",
      "Канал для отладки Workers"
    ],
    correctAnswer: 0,
    explanation: "Broadcast Channel API позволяет отправлять сообщения всем контекстам (вкладкам, Workers) одного origin. Используется для синхронизации между вкладками и Workers без прямой связи.",
    topic: "Продвинутые темы"
  },
  {
    id: 42,
    question: "Как создать Worker из строки кода без отдельного файла?",
    options: [
      "Невозможно, нужен файл",
      "Создать Blob с кодом и использовать URL.createObjectURL",
      "Использовать eval() для создания Worker",
      "Передать код в конструктор Worker"
    ],
    correctAnswer: 1,
    explanation: "Worker можно создать из строки: const blob = new Blob([code], {type: 'application/javascript'}); const url = URL.createObjectURL(blob); const worker = new Worker(url);",
    topic: "Продвинутые темы"
  },
  {
    id: 43,
    question: "Что такое Map-Reduce паттерн с Workers?",
    options: [
      "Паттерн для работы с Map и Set",
      "Распределение данных между Workers (Map) и объединение результатов (Reduce)",
      "Способ уменьшения размера данных",
      "Алгоритм сортировки в Workers"
    ],
    correctAnswer: 1,
    explanation: "Map-Reduce с Workers: данные делятся на chunks и распределяются между Workers для параллельной обработки (Map фаза), затем результаты объединяются (Reduce фаза). Эффективен для больших вычислений.",
    topic: "Продвинутые темы"
  },
  {
    id: 44,
    question: "Как отлаживать Web Workers в Chrome DevTools?",
    options: [
      "Workers нельзя отлаживать",
      "Использовать console.log и смотреть в основной консоли",
      "Sources → Threads, выбрать Worker",
      "Только через alert в Worker"
    ],
    correctAnswer: 2,
    explanation: "В Chrome DevTools: Sources → Threads → выбрать нужный Worker. Можно ставить breakpoints, смотреть переменные, использовать step debugging как для обычного кода.",
    topic: "Продвинутые темы"
  },
  {
    id: 45,
    question: "Что такое OffscreenCanvas в контексте Workers?",
    options: [
      "Canvas, который не отображается на экране",
      "Canvas, который можно передать в Worker для рендеринга",
      "Оптимизированная версия Canvas",
      "Canvas для фоновых процессов"
    ],
    correctAnswer: 1,
    explanation: "OffscreenCanvas — это Canvas, который можно передать в Worker через Transferable Objects. Позволяет выполнять рендеринг в фоновом потоке без блокировки UI.",
    topic: "Продвинутые темы"
  },
  {
    id: 46,
    question: "Можно ли использовать WebGL в Web Worker?",
    options: [
      "Нет, WebGL требует DOM",
      "Да, через OffscreenCanvas",
      "Да, но только 2D контекст",
      "Да, напрямую"
    ],
    correctAnswer: 1,
    explanation: "WebGL можно использовать в Worker через OffscreenCanvas. Это позволяет выполнять 3D рендеринг в фоновом потоке, освобождая основной поток для UI.",
    topic: "Продвинутые темы"
  },
  {
    id: 47,
    question: "Как работает динамическое масштабирование Worker Pool?",
    options: [
      "Автоматически, браузер управляет Workers",
      "Отслеживание нагрузки и добавление/удаление Workers по необходимости",
      "Workers всегда создаются в максимальном количестве",
      "Невозможно масштабировать Workers"
    ],
    correctAnswer: 1,
    explanation: "Динамическое масштабирование: отслеживаем длину очереди задач и утилизацию Workers, добавляем Workers при высокой нагрузке, удаляем при простое. Автоматически подстраивается под текущую нагрузку.",
    topic: "Продвинутые темы"
  },
  {
    id: 48,
    question: "Что такое Pipeline паттерн с Workers?",
    options: [
      "Последовательная обработка данных через цепочку Workers",
      "Параллельная обработка в разных Workers",
      "Способ отладки Workers",
      "Система кеширования"
    ],
    correctAnswer: 0,
    explanation: "Pipeline паттерн: данные последовательно проходят через несколько Workers, каждый выполняет свою стадию обработки (валидация → трансформация → агрегация). Выход одного Worker — вход следующего.",
    topic: "Продвинутые темы"
  },
  {
    id: 49,
    question: "Как измерить производительность Worker?",
    options: [
      "Workers не поддерживают измерение производительности",
      "Использовать performance.now() в Worker",
      "Только через Chrome DevTools Performance",
      "С помощью Date.now()"
    ],
    correctAnswer: 1,
    explanation: "Performance API доступен в Workers. Используйте performance.now() для точных измерений времени выполнения задач. performance.mark() и performance.measure() также работают.",
    topic: "Продвинутые темы"
  },
  {
    id: 50,
    question: "Какой паттерн лучше использовать в React для Web Workers?",
    options: [
      "Создавать Worker в render",
      "Использовать useEffect с cleanup и useRef для хранения",
      "Глобальный Worker вне компонента",
      "Не использовать Workers в React"
    ],
    correctAnswer: 1,
    explanation: "В React: создавайте Worker в useEffect, храните в useRef (не в state!), обязательно вызывайте terminate() в cleanup функции. Это предотвращает утечки памяти и множественное создание Workers при ре-рендерах.",
    topic: "Продвинутые темы"
  }
]
