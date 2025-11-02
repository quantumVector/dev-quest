import type { Question } from '@/types/question.ts'

export const serverConnectionQuestions: Question[] = [
  // Тема 1: WebSockets - Основы
  {
    id: 1,
    question: "Что такое WebSocket?",
    options: [
      "HTTP-библиотека для работы с сокетами",
      "Протокол для двусторонней связи между клиентом и сервером через единственное TCP-соединение",
      "Метод для длительных HTTP-запросов",
      "Технология для работы с UDP-соединениями"
    ],
    correctAnswer: 1,
    explanation: "WebSocket — это протокол, обеспечивающий полнодуплексную (двустороннюю) связь между клиентом и сервером через единственное TCP-соединение.",
    topic: "WebSockets - Основы"
  },
  {
    id: 2,
    question: "Как создать WebSocket-соединение в JavaScript?",
    options: [
      "new Socket('ws://example.com')",
      "new WebSocket('ws://example.com')",
      "WebSocket.connect('ws://example.com')",
      "createWebSocket('ws://example.com')"
    ],
    correctAnswer: 1,
    explanation: "WebSocket создается через конструктор: new WebSocket('ws://example.com') для незащищенного или 'wss://example.com' для защищенного соединения.",
    topic: "WebSockets - Основы"
  },
  {
    id: 3,
    question: "Какие протоколы используются для WebSocket?",
    options: [
      "http:// и https://",
      "ws:// и wss://",
      "socket:// и ssocket://",
      "tcp:// и udp://"
    ],
    correctAnswer: 1,
    explanation: "WebSocket использует протоколы ws:// (незащищенный) и wss:// (защищенный через TLS/SSL), аналогично http:// и https://.",
    topic: "WebSockets - Основы"
  },
  {
    id: 4,
    question: "Какие состояния readyState существуют у WebSocket?",
    options: [
      "0-CONNECTING, 1-OPEN, 2-CLOSING, 3-CLOSED",
      "0-INIT, 1-READY, 2-DONE",
      "0-PENDING, 1-ACTIVE, 2-FINISHED",
      "0-START, 1-CONNECTED, 2-END"
    ],
    correctAnswer: 0,
    explanation: "WebSocket имеет 4 состояния: 0-CONNECTING (устанавливается), 1-OPEN (открыто), 2-CLOSING (закрывается), 3-CLOSED (закрыто).",
    topic: "WebSockets - Основы"
  },
  {
    id: 5,
    question: "Какое событие срабатывает при успешном открытии WebSocket-соединения?",
    options: [
      "onconnect",
      "onopen",
      "onready",
      "onstart"
    ],
    correctAnswer: 1,
    explanation: "Событие onopen срабатывает, когда WebSocket-соединение успешно установлено и готово к передаче данных.",
    topic: "WebSockets - Основы"
  },
  {
    id: 6,
    question: "Как отправить данные через WebSocket?",
    options: [
      "ws.send(data)",
      "ws.write(data)",
      "ws.post(data)",
      "ws.emit(data)"
    ],
    correctAnswer: 0,
    explanation: "Метод send(data) используется для отправки данных через WebSocket. Данные могут быть строкой, Blob, ArrayBuffer или ArrayBufferView.",
    topic: "WebSockets - Основы"
  },
  {
    id: 7,
    question: "Какое событие срабатывает при получении сообщения от сервера?",
    options: [
      "ondata",
      "onreceive",
      "onmessage",
      "oninput"
    ],
    correctAnswer: 2,
    explanation: "Событие onmessage срабатывает при получении данных от сервера. Данные доступны в event.data.",
    topic: "WebSockets - Основы"
  },
  {
    id: 8,
    question: "Как правильно закрыть WebSocket-соединение?",
    options: [
      "ws.close()",
      "ws.disconnect()",
      "ws.end()",
      "ws.terminate()"
    ],
    correctAnswer: 0,
    explanation: "Метод close(code, reason) закрывает WebSocket-соединение. Можно передать код закрытия (например, 1000 для нормального закрытия) и причину.",
    topic: "WebSockets - Основы"
  },

  // Тема 2: WebSockets - События и обработка ошибок
  {
    id: 9,
    question: "Какое событие срабатывает при закрытии WebSocket-соединения?",
    options: [
      "ondisconnect",
      "onclose",
      "onend",
      "onterminate"
    ],
    correctAnswer: 1,
    explanation: "Событие onclose срабатывает при закрытии соединения. В объекте события доступны code (код закрытия), reason (причина) и wasClean (чистое ли закрытие).",
    topic: "WebSockets - События"
  },
  {
    id: 10,
    question: "Какое событие срабатывает при ошибке WebSocket?",
    options: [
      "onfail",
      "onerror",
      "onexception",
      "onfault"
    ],
    correctAnswer: 1,
    explanation: "Событие onerror срабатывает при возникновении ошибки в WebSocket-соединении, например, при проблемах с сетью или отказе сервера.",
    topic: "WebSockets - События"
  },
  {
    id: 11,
    question: "Что содержит event.data в обработчике onmessage?",
    options: [
      "Только строки",
      "Только JSON объекты",
      "Строки, Blob или ArrayBuffer в зависимости от типа данных",
      "Только бинарные данные"
    ],
    correctAnswer: 2,
    explanation: "event.data может содержать строку (текстовые данные), Blob или ArrayBuffer (бинарные данные) в зависимости от того, что отправил сервер и настройки binaryType.",
    topic: "WebSockets - События"
  },
  {
    id: 12,
    question: "Как настроить формат получения бинарных данных в WebSocket?",
    options: [
      "Через свойство dataFormat",
      "Через свойство binaryType ('blob' или 'arraybuffer')",
      "Через метод setBinaryFormat()",
      "Это настраивается автоматически"
    ],
    correctAnswer: 1,
    explanation: "Свойство ws.binaryType определяет формат бинарных данных: 'blob' (по умолчанию) или 'arraybuffer'.",
    topic: "WebSockets - События"
  },

  // Тема 3: Server-Sent Events (SSE)
  {
    id: 13,
    question: "Что такое Server-Sent Events (SSE)?",
    options: [
      "Двусторонний протокол связи",
      "Технология для односторонней передачи данных от сервера к клиенту через HTTP",
      "Замена WebSocket",
      "Метод для отправки событий на сервер"
    ],
    correctAnswer: 1,
    explanation: "SSE — это технология для односторонней передачи данных от сервера к клиенту через обычное HTTP-соединение. Клиент может только получать данные, но не отправлять.",
    topic: "Server-Sent Events"
  },
  {
    id: 14,
    question: "Как создать SSE-соединение?",
    options: [
      "new SSE('/events')",
      "new EventSource('/events')",
      "new ServerEvents('/events')",
      "EventSource.connect('/events')"
    ],
    correctAnswer: 1,
    explanation: "SSE-соединение создается через конструктор EventSource: new EventSource('/events').",
    topic: "Server-Sent Events"
  },
  {
    id: 15,
    question: "Какое событие по умолчанию срабатывает при получении данных в EventSource?",
    options: [
      "ondata",
      "onmessage",
      "onreceive",
      "onevent"
    ],
    correctAnswer: 1,
    explanation: "По умолчанию событие onmessage срабатывает при получении данных от сервера. Также можно создавать кастомные события.",
    topic: "Server-Sent Events"
  },
  {
    id: 16,
    question: "Какой Content-Type должен возвращать сервер для SSE?",
    options: [
      "application/json",
      "text/event-stream",
      "text/plain",
      "application/octet-stream"
    ],
    correctAnswer: 1,
    explanation: "Сервер должен отправлять ответ с Content-Type: text/event-stream для работы Server-Sent Events.",
    topic: "Server-Sent Events"
  },
  {
    id: 17,
    question: "Поддерживает ли EventSource автоматическое переподключение?",
    options: [
      "Нет, нужно реализовывать вручную",
      "Да, автоматически переподключается при разрыве соединения",
      "Только если указать reconnect: true",
      "Только для ошибок сети"
    ],
    correctAnswer: 1,
    explanation: "EventSource автоматически пытается переподключиться при разрыве соединения. Можно настроить задержку переподключения через поле retry в серверном ответе.",
    topic: "Server-Sent Events"
  },
  {
    id: 18,
    question: "Как закрыть SSE-соединение?",
    options: [
      "eventSource.close()",
      "eventSource.disconnect()",
      "eventSource.stop()",
      "eventSource.end()"
    ],
    correctAnswer: 0,
    explanation: "Метод close() закрывает EventSource-соединение и предотвращает автоматическое переподключение.",
    topic: "Server-Sent Events"
  },
  {
    id: 19,
    question: "Можно ли отправлять данные на сервер через EventSource?",
    options: [
      "Да, через метод send()",
      "Нет, SSE поддерживает только получение данных",
      "Да, но только строки",
      "Да, через метод post()"
    ],
    correctAnswer: 1,
    explanation: "EventSource поддерживает только односторонний поток данных от сервера к клиенту. Для отправки данных на сервер нужно использовать fetch или WebSocket.",
    topic: "Server-Sent Events"
  },
  {
    id: 20,
    question: "Какие состояния readyState существуют у EventSource?",
    options: [
      "0-CONNECTING, 1-OPEN, 2-CLOSED",
      "0-INIT, 1-READY, 2-DONE",
      "0-PENDING, 1-ACTIVE, 2-FINISHED",
      "Только OPEN и CLOSED"
    ],
    correctAnswer: 0,
    explanation: "EventSource имеет 3 состояния: 0-CONNECTING (устанавливается), 1-OPEN (открыто), 2-CLOSED (закрыто).",
    topic: "Server-Sent Events"
  },

  // Тема 4: Long Polling
  {
    id: 21,
    question: "Что такое Long Polling?",
    options: [
      "Техника многократных быстрых HTTP-запросов",
      "Техника, где клиент отправляет запрос, а сервер удерживает его до появления данных",
      "Альтернативное название WebSocket",
      "Метод отправки больших файлов"
    ],
    correctAnswer: 1,
    explanation: "Long Polling — техника, где клиент отправляет HTTP-запрос, а сервер удерживает его открытым до появления новых данных или таймаута, после чего клиент сразу отправляет новый запрос.",
    topic: "Long Polling"
  },
  {
    id: 22,
    question: "Как реализуется Long Polling на клиенте?",
    options: [
      "Через специальный API LongPolling",
      "Через рекурсивные вызовы fetch/XMLHttpRequest",
      "Через WebSocket с особой настройкой",
      "Через setInterval"
    ],
    correctAnswer: 1,
    explanation: "Long Polling реализуется через обычные HTTP-запросы (fetch или XMLHttpRequest), которые вызываются рекурсивно после получения ответа от сервера.",
    topic: "Long Polling"
  },
  {
    id: 23,
    question: "В чем главное отличие Long Polling от Regular Polling?",
    options: [
      "Long Polling использует WebSocket",
      "В Long Polling сервер держит соединение открытым до появления данных",
      "Long Polling быстрее",
      "Long Polling не использует HTTP"
    ],
    correctAnswer: 1,
    explanation: "В Regular Polling клиент периодически опрашивает сервер через фиксированные интервалы. В Long Polling сервер удерживает запрос до появления новых данных или таймаута.",
    topic: "Long Polling"
  },
  {
    id: 24,
    question: "Какой главный недостаток Long Polling по сравнению с WebSocket?",
    options: [
      "Не работает в старых браузерах",
      "Больше накладных расходов из-за повторного создания HTTP-соединений",
      "Не поддерживает JSON",
      "Работает только с текстовыми данными"
    ],
    correctAnswer: 1,
    explanation: "Long Polling требует постоянного пересоздания HTTP-соединений и отправки HTTP-заголовков, что создает большие накладные расходы по сравнению с постоянным WebSocket-соединением.",
    topic: "Long Polling"
  },

  // Тема 5: Сравнение технологий
  {
    id: 25,
    question: "Какая технология поддерживает двустороннюю связь в реальном времени?",
    options: [
      "Только WebSocket",
      "WebSocket и Long Polling",
      "WebSocket и SSE",
      "Все три технологии"
    ],
    correctAnswer: 0,
    explanation: "Только WebSocket поддерживает полноценную двустороннюю (full-duplex) связь. SSE и Long Polling поддерживают только получение данных от сервера.",
    topic: "Сравнение технологий"
  },
  {
    id: 26,
    question: "Какая технология имеет наименьшие накладные расходы?",
    options: [
      "Long Polling",
      "Server-Sent Events",
      "WebSocket",
      "Все одинаковые"
    ],
    correctAnswer: 2,
    explanation: "WebSocket имеет наименьшие накладные расходы, так как использует одно постоянное соединение без повторной отправки HTTP-заголовков.",
    topic: "Сравнение технологий"
  },
  {
    id: 27,
    question: "Какая технология лучше всего подходит для чата?",
    options: [
      "Server-Sent Events",
      "Long Polling",
      "WebSocket",
      "Regular Polling"
    ],
    correctAnswer: 2,
    explanation: "WebSocket идеально подходит для чата, так как поддерживает двустороннюю связь с низкой задержкой и минимальными накладными расходами.",
    topic: "Сравнение технологий"
  },
  {
    id: 28,
    question: "Какая технология лучше для получения обновлений новостей (только чтение)?",
    options: [
      "WebSocket",
      "Server-Sent Events",
      "Long Polling",
      "Fetch с интервалом"
    ],
    correctAnswer: 1,
    explanation: "Server-Sent Events оптимально для односторонней передачи данных от сервера (новости, уведомления), так как проще в реализации и автоматически переподключается.",
    topic: "Сравнение технологий"
  },
  {
    id: 29,
    question: "Поддерживают ли WebSocket и SSE работу через прокси и файрволы?",
    options: [
      "WebSocket и SSE работают везде одинаково хорошо",
      "SSE работает лучше, так как использует обычный HTTP",
      "WebSocket работает лучше",
      "Обе технологии не работают через прокси"
    ],
    correctAnswer: 1,
    explanation: "SSE использует обычный HTTP, поэтому лучше работает через корпоративные прокси и файрволы. WebSocket может блокироваться некоторыми прокси-серверами.",
    topic: "Сравнение технологий"
  },
  {
    id: 30,
    question: "Какая технология имеет лучшую поддержку в старых браузерах?",
    options: [
      "WebSocket",
      "Server-Sent Events",
      "Long Polling",
      "Все поддерживаются одинаково"
    ],
    correctAnswer: 2,
    explanation: "Long Polling работает везде, где есть XMLHttpRequest/fetch, включая очень старые браузеры. WebSocket и SSE появились позже и не поддерживаются в IE9 и ниже.",
    topic: "Сравнение технологий"
  },

  // Тема 6: Практические аспекты
  {
    id: 31,
    question: "Как обработать переподключение WebSocket при разрыве соединения?",
    options: [
      "WebSocket автоматически переподключается",
      "Нужно вручную создавать новый WebSocket в обработчике onclose",
      "Использовать метод reconnect()",
      "Это невозможно"
    ],
    correctAnswer: 1,
    explanation: "WebSocket не имеет автоматического переподключения. Нужно самостоятельно обрабатывать событие onclose и создавать новое соединение, возможно с экспоненциальной задержкой.",
    topic: "Практические аспекты"
  },
  {
    id: 32,
    question: "Что такое heartbeat (пинг-понг) в контексте WebSocket?",
    options: [
      "Метод шифрования данных",
      "Механизм проверки активности соединения через периодическую отправку сообщений",
      "Способ увеличить скорость передачи",
      "Событие WebSocket"
    ],
    correctAnswer: 1,
    explanation: "Heartbeat (ping-pong) — это механизм проверки жизнеспособности соединения, где клиент и сервер периодически обмениваются специальными сообщениями.",
    topic: "Практические аспекты"
  },
  {
    id: 33,
    question: "Сколько одновременных SSE-соединений может иметь браузер к одному домену?",
    options: [
      "Неограниченно",
      "Обычно ограничено (около 6 для HTTP/1.1)",
      "Только одно",
      "100 соединений"
    ],
    correctAnswer: 1,
    explanation: "Браузеры ограничивают количество одновременных HTTP-соединений к одному домену (обычно около 6 для HTTP/1.1). Это важно учитывать при использовании SSE.",
    topic: "Практические аспекты"
  },
  {
    id: 34,
    question: "Поддерживают ли WebSocket и SSE кросс-доменные запросы (CORS)?",
    options: [
      "Только WebSocket",
      "Только SSE",
      "Оба поддерживают с правильными CORS-заголовками",
      "Ни один не поддерживает"
    ],
    correctAnswer: 2,
    explanation: "И WebSocket, и SSE поддерживают кросс-доменные соединения, если сервер правильно настроил CORS-заголовки (для SSE) или обрабатывает WebSocket-handshake.",
    topic: "Практические аспекты"
  },
  {
    id: 35,
    question: "Какой формат данных обычно используется для передачи структурированных данных через WebSocket?",
    options: [
      "XML",
      "JSON",
      "CSV",
      "Plain text"
    ],
    correctAnswer: 1,
    explanation: "JSON — наиболее распространенный формат для передачи структурированных данных через WebSocket благодаря простоте парсинга и компактности.",
    topic: "Практические аспекты"
  },
  {
    id: 36,
    question: "Что произойдет, если отправить данные через WebSocket до открытия соединения?",
    options: [
      "Данные будут поставлены в очередь",
      "Выбросится исключение (InvalidStateError)",
      "Данные будут отправлены после открытия",
      "Ничего не произойдет"
    ],
    correctAnswer: 1,
    explanation: "Попытка вызвать send() до того, как WebSocket перейдет в состояние OPEN, приведет к исключению InvalidStateError. Нужно дождаться события onopen.",
    topic: "Практические аспекты"
  },
  {
    id: 37,
    question: "Можно ли использовать EventSource с POST-запросами?",
    options: [
      "Да, через настройку method: 'POST'",
      "Нет, EventSource всегда использует GET",
      "Да, но только для аутентификации",
      "Да, через headers"
    ],
    correctAnswer: 1,
    explanation: "EventSource всегда использует GET-запросы. Для отправки данных нужно использовать обычный fetch или WebSocket.",
    topic: "Практические аспекты"
  },
  {
    id: 38,
    question: "Как передать токен аутентификации при создании WebSocket-соединения?",
    options: [
      "Через HTTP-заголовки в конструкторе",
      "Через параметры URL или протокол (второй параметр конструктора)",
      "Через метод authenticate()",
      "WebSocket не поддерживает аутентификацию"
    ],
    correctAnswer: 1,
    explanation: "WebSocket API не позволяет устанавливать произвольные заголовки. Токен можно передать через URL (?token=...) или через протокол во втором параметре конструктора.",
    topic: "Практические аспекты"
  },
  {
    id: 39,
    question: "Какая технология лучше подходит для потоковой передачи логов с сервера?",
    options: [
      "WebSocket",
      "Server-Sent Events",
      "Long Polling",
      "Regular Polling"
    ],
    correctAnswer: 1,
    explanation: "SSE идеально подходит для потоковой передачи логов, так как это односторонняя передача данных от сервера с автоматическим переподключением.",
    topic: "Практические аспекты"
  },
  {
    id: 40,
    question: "Что такое backpressure в контексте WebSocket?",
    options: [
      "Метод сжатия данных",
      "Проблема, когда отправитель передает данные быстрее, чем получатель может обработать",
      "Способ шифрования",
      "Тип ошибки соединения"
    ],
    correctAnswer: 1,
    explanation: "Backpressure — ситуация, когда данные отправляются быстрее, чем их можно обработать. В WebSocket можно проверять bufferedAmount, чтобы контролировать скорость отправки.",
    topic: "Практические аспекты"
  }
]
