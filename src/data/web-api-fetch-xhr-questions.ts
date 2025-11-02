import type { Question } from '@/types/question.ts'

export const fetchXhrQuestions: Question[] = [
  // Тема 1: Основы XMLHttpRequest
  {
    id: 1,
    question: "Что такое XMLHttpRequest?",
    options: [
      "Современный API для HTTP-запросов",
      "Устаревший API для асинхронных HTTP-запросов",
      "Библиотека для работы с XML",
      "Метод для парсинга XML-документов"
    ],
    correctAnswer: 1,
    explanation: "XMLHttpRequest — это устаревший (legacy) API для выполнения асинхронных HTTP-запросов, который существовал до появления Fetch API.",
    topic: "XMLHttpRequest"
  },
  {
    id: 2,
    question: "Как создать новый экземпляр XMLHttpRequest?",
    options: [
      "XMLHttpRequest.create()",
      "new XMLHttpRequest()",
      "XMLHttpRequest.new()",
      "createXMLHttpRequest()"
    ],
    correctAnswer: 1,
    explanation: "XMLHttpRequest создается с помощью конструктора: new XMLHttpRequest().",
    topic: "XMLHttpRequest"
  },
  {
    id: 3,
    question: "Какой метод используется для инициализации запроса в XMLHttpRequest?",
    options: [
      "init()",
      "start()",
      "open()",
      "begin()"
    ],
    correctAnswer: 2,
    explanation: "Метод open(method, url, async) используется для инициализации запроса, где указывается HTTP-метод, URL и флаг асинхронности.",
    topic: "XMLHttpRequest"
  },
  {
    id: 4,
    question: "Какой метод отправляет запрос в XMLHttpRequest?",
    options: [
      "execute()",
      "send()",
      "post()",
      "dispatch()"
    ],
    correctAnswer: 1,
    explanation: "Метод send(body) отправляет запрос на сервер. В параметре body можно передать тело запроса для POST/PUT запросов.",
    topic: "XMLHttpRequest"
  },
  {
    id: 5,
    question: "Какое свойство XMLHttpRequest содержит ответ сервера в виде текста?",
    options: [
      "response",
      "responseText",
      "data",
      "body"
    ],
    correctAnswer: 1,
    explanation: "Свойство responseText содержит ответ сервера в виде строки. Также есть свойство response, которое может содержать разные типы данных в зависимости от responseType.",
    topic: "XMLHttpRequest"
  },
  {
    id: 6,
    question: "Какие состояния readyState существуют в XMLHttpRequest?",
    options: [
      "0-UNSENT, 1-OPENED, 2-HEADERS_RECEIVED, 3-LOADING, 4-DONE",
      "0-INIT, 1-PENDING, 2-COMPLETE",
      "1-START, 2-PROGRESS, 3-END",
      "0-IDLE, 1-ACTIVE, 2-FINISHED"
    ],
    correctAnswer: 0,
    explanation: "XMLHttpRequest имеет 5 состояний: 0-UNSENT (создан), 1-OPENED (open вызван), 2-HEADERS_RECEIVED (заголовки получены), 3-LOADING (загрузка данных), 4-DONE (завершено).",
    topic: "XMLHttpRequest"
  },
  {
    id: 7,
    question: "Какое событие срабатывает при изменении readyState?",
    options: [
      "onload",
      "onchange",
      "onreadystatechange",
      "onstateupdate"
    ],
    correctAnswer: 2,
    explanation: "Событие onreadystatechange срабатывает каждый раз при изменении свойства readyState, что позволяет отслеживать прогресс запроса.",
    topic: "XMLHttpRequest"
  },
  {
    id: 8,
    question: "Что выведет этот код?\n\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/data');\nconsole.log(xhr.readyState);",
    options: [
      "0",
      "1",
      "2",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "После вызова метода open() состояние readyState становится равным 1 (OPENED).",
    topic: "XMLHttpRequest"
  },

  // Тема 2: Основы Fetch API
  {
    id: 9,
    question: "Что возвращает вызов fetch()?",
    options: [
      "Данные с сервера",
      "Promise, который разрешается в Response объект",
      "XMLHttpRequest объект",
      "Observable"
    ],
    correctAnswer: 1,
    explanation: "fetch() возвращает Promise, который разрешается в объект Response, содержащий информацию об ответе сервера.",
    topic: "Fetch API"
  },
  {
    id: 10,
    question: "Как получить JSON из Response объекта?",
    options: [
      "response.json",
      "response.json()",
      "response.toJSON()",
      "JSON.parse(response)"
    ],
    correctAnswer: 1,
    explanation: "Метод response.json() возвращает Promise, который разрешается в распарсенный JSON объект.",
    topic: "Fetch API"
  },
  {
    id: 11,
    question: "Является ли fetch() синхронным или асинхронным?",
    options: [
      "Синхронным",
      "Асинхронным",
      "Зависит от параметров",
      "Может быть и тем, и другим"
    ],
    correctAnswer: 1,
    explanation: "fetch() всегда асинхронный и возвращает Promise. В отличие от XMLHttpRequest, у fetch нет синхронного режима.",
    topic: "Fetch API"
  },
  {
    id: 12,
    question: "Какие методы Response объекта используются для чтения тела ответа?",
    options: [
      "text(), json(), blob(), arrayBuffer(), formData()",
      "read(), parse(), get(), load()",
      "toString(), toJSON(), toBlob()",
      "data(), body(), content()"
    ],
    correctAnswer: 0,
    explanation: "Response предоставляет методы: text() (текст), json() (JSON), blob() (Blob), arrayBuffer() (бинарные данные), formData() (FormData).",
    topic: "Fetch API"
  },
  {
    id: 13,
    question: "Что произойдет при вызове response.json() дважды?",
    options: [
      "Вернет тот же результат",
      "Выбросит ошибку TypeError",
      "Вернет undefined",
      "Сделает новый запрос"
    ],
    correctAnswer: 1,
    explanation: "Тело ответа можно прочитать только один раз. Повторный вызов методов чтения (json(), text() и т.д.) выбросит ошибку, так как поток уже использован.",
    topic: "Fetch API"
  },
  {
    id: 14,
    question: "Как отправить POST-запрос с помощью fetch?",
    options: [
      "fetch(url, { method: 'POST', body: data })",
      "fetch.post(url, data)",
      "fetch(url).post(data)",
      "fetch(url, 'POST', data)"
    ],
    correctAnswer: 0,
    explanation: "POST-запрос отправляется через второй параметр fetch: fetch(url, { method: 'POST', body: data, headers: {...} }).",
    topic: "Fetch API"
  },
  {
    id: 15,
    question: "Какой объект используется для настройки fetch-запроса?",
    options: [
      "FetchConfig",
      "RequestInit",
      "FetchOptions",
      "HttpConfig"
    ],
    correctAnswer: 1,
    explanation: "Второй параметр fetch принимает объект типа RequestInit, который содержит настройки запроса: method, headers, body, mode, credentials и др.",
    topic: "Fetch API"
  },

  // Тема 3: Различия между XMLHttpRequest и Fetch
  {
    id: 16,
    question: "В чем главное преимущество Fetch API над XMLHttpRequest?",
    options: [
      "Fetch быстрее выполняется",
      "Fetch использует Promise и более современный синтаксис",
      "Fetch поддерживает больше HTTP-методов",
      "Fetch работает только с JSON"
    ],
    correctAnswer: 1,
    explanation: "Главное преимущество Fetch — использование Promise и более чистый, современный API, что делает код проще и понятнее по сравнению с callback-based XMLHttpRequest.",
    topic: "Различия"
  },
  {
    id: 17,
    question: "Как отличается обработка ошибок HTTP в Fetch и XMLHttpRequest?",
    options: [
      "Одинаково обрабатывают",
      "Fetch отклоняет Promise только при сетевых ошибках, не при HTTP 4xx/5xx",
      "XMLHttpRequest не поддерживает обработку ошибок",
      "Fetch автоматически выбрасывает исключения для всех ошибок"
    ],
    correctAnswer: 1,
    explanation: "Fetch отклоняет Promise только при сетевых ошибках (нет сети, DNS ошибка). HTTP статусы 4xx и 5xx считаются успешными ответами, нужно проверять response.ok.",
    topic: "Различия"
  },
  {
    id: 18,
    question: "Поддерживает ли Fetch API отслеживание прогресса загрузки?",
    options: [
      "Да, через свойство progress",
      "Да, через Response.body.getReader() и ReadableStream",
      "Нет, это возможно только в XMLHttpRequest",
      "Да, через событие onprogress"
    ],
    correctAnswer: 1,
    explanation: "В Fetch можно отслеживать прогресс через ReadableStream: response.body.getReader(), но это сложнее, чем события progress в XMLHttpRequest.",
    topic: "Различия"
  },
  {
    id: 19,
    question: "Можно ли отменить fetch-запрос?",
    options: [
      "Нет, fetch-запросы нельзя отменить",
      "Да, с помощью AbortController",
      "Да, вызвав метод cancel()",
      "Да, через Promise.cancel()"
    ],
    correctAnswer: 1,
    explanation: "Fetch-запросы можно отменить с помощью AbortController: создать контроллер, передать его signal в fetch, и вызвать controller.abort().",
    topic: "Различия"
  },
  {
    id: 20,
    question: "Какой API поддерживает синхронные запросы?",
    options: [
      "Только Fetch API",
      "Только XMLHttpRequest",
      "Оба поддерживают",
      "Ни один не поддерживает"
    ],
    correctAnswer: 1,
    explanation: "Только XMLHttpRequest поддерживает синхронные запросы (third параметр open: false), но это считается плохой практикой. Fetch всегда асинхронный.",
    topic: "Различия"
  },
  {
    id: 21,
    question: "Как XMLHttpRequest обрабатывает cookies по умолчанию?",
    options: [
      "Не отправляет cookies",
      "Автоматически отправляет cookies для того же домена",
      "Требует явного указания withCredentials",
      "Cookies не поддерживаются"
    ],
    correctAnswer: 1,
    explanation: "XMLHttpRequest автоматически отправляет cookies для запросов на тот же домен. Для cross-origin запросов нужно установить withCredentials: true.",
    topic: "Различия"
  },
  {
    id: 22,
    question: "Как Fetch обрабатывает credentials (cookies) по умолчанию?",
    options: [
      "Автоматически отправляет для всех запросов",
      "Не отправляет cookies по умолчанию даже для same-origin",
      "Отправляет только для same-origin запросов",
      "Требует явного указания credentials: 'include' всегда"
    ],
    correctAnswer: 2,
    explanation: "По умолчанию Fetch использует credentials: 'same-origin', отправляя cookies только для запросов на тот же домен. Для cross-origin нужно указать credentials: 'include'.",
    topic: "Различия"
  },
  {
    id: 23,
    question: "Что произойдет с fetch при ответе сервера с кодом 404?",
    options: [
      "Promise будет отклонен (rejected)",
      "Promise будет выполнен (resolved) с response.ok = false",
      "Выбросится исключение",
      "Вернется null"
    ],
    correctAnswer: 1,
    explanation: "Fetch считает любой ответ сервера (включая 4xx и 5xx) успешным. Promise будет resolved, но response.ok будет false. Нужно проверять response.ok или response.status.",
    topic: "Различия"
  },

  // Тема 4: Работа с заголовками
  {
    id: 24,
    question: "Как установить заголовок в XMLHttpRequest?",
    options: [
      "xhr.headers.set('Content-Type', 'application/json')",
      "xhr.setRequestHeader('Content-Type', 'application/json')",
      "xhr.header('Content-Type', 'application/json')",
      "xhr.addHeader('Content-Type', 'application/json')"
    ],
    correctAnswer: 1,
    explanation: "В XMLHttpRequest заголовки устанавливаются методом setRequestHeader(name, value) после вызова open() и до send().",
    topic: "Заголовки"
  },
  {
    id: 25,
    question: "Как установить заголовки в fetch-запросе?",
    options: [
      "Через свойство headers в объекте настроек",
      "Через метод setHeader()",
      "Через метод header()",
      "Заголовки устанавливаются автоматически"
    ],
    correctAnswer: 0,
    explanation: "В fetch заголовки передаются через свойство headers в объекте настроек: fetch(url, { headers: { 'Content-Type': 'application/json' } }).",
    topic: "Заголовки"
  },
  {
    id: 26,
    question: "Какой объект используется для работы с заголовками в Fetch API?",
    options: [
      "HeaderMap",
      "Headers",
      "HeaderList",
      "HttpHeaders"
    ],
    correctAnswer: 1,
    explanation: "Fetch API использует объект Headers для работы с заголовками. Можно создать: new Headers() и использовать методы set(), get(), has(), delete().",
    topic: "Заголовки"
  },
  {
    id: 27,
    question: "Как получить значение заголовка ответа в XMLHttpRequest?",
    options: [
      "xhr.getResponseHeader('Content-Type')",
      "xhr.headers.get('Content-Type')",
      "xhr.header('Content-Type')",
      "xhr.responseHeaders['Content-Type']"
    ],
    correctAnswer: 0,
    explanation: "Метод getResponseHeader(name) возвращает значение указанного заголовка ответа. Также есть getAllResponseHeaders() для получения всех заголовков.",
    topic: "Заголовки"
  },
  {
    id: 28,
    question: "Как получить заголовки ответа в Fetch API?",
    options: [
      "response.headers.get('Content-Type')",
      "response.getHeader('Content-Type')",
      "response.header('Content-Type')",
      "response['Content-Type']"
    ],
    correctAnswer: 0,
    explanation: "Заголовки ответа доступны через объект response.headers (тип Headers) с методами get(), has(), entries(), keys(), values().",
    topic: "Заголовки"
  },

  // Тема 5: Продвинутые возможности
  {
    id: 29,
    question: "Как отслеживать прогресс загрузки в XMLHttpRequest?",
    options: [
      "Через событие onprogress",
      "Через свойство progress",
      "Через callback-функцию",
      "Это невозможно"
    ],
    correctAnswer: 0,
    explanation: "XMLHttpRequest поддерживает событие progress (xhr.onprogress), которое периодически срабатывает в процессе загрузки и предоставляет информацию о прогрессе (loaded, total).",
    topic: "Продвинутые возможности"
  },
  {
    id: 30,
    question: "Как отменить XMLHttpRequest?",
    options: [
      "xhr.cancel()",
      "xhr.abort()",
      "xhr.stop()",
      "xhr.terminate()"
    ],
    correctAnswer: 1,
    explanation: "Метод abort() отменяет выполняющийся запрос XMLHttpRequest и вызывает событие abort.",
    topic: "Продвинутые возможности"
  },
  {
    id: 31,
    question: "Что такое CORS и какой API лучше с ним работает?",
    options: [
      "CORS не связан с HTTP API",
      "CORS — механизм безопасности, оба API его поддерживают одинаково",
      "Только Fetch поддерживает CORS",
      "Только XMLHttpRequest поддерживает CORS"
    ],
    correctAnswer: 1,
    explanation: "CORS (Cross-Origin Resource Sharing) — механизм безопасности браузера. Оба API поддерживают CORS, но Fetch имеет дополнительные опции mode: 'cors', 'no-cors', 'same-origin'.",
    topic: "Продвинутые возможности"
  },
  {
    id: 32,
    question: "Какой параметр fetch контролирует поведение CORS?",
    options: [
      "cors",
      "mode",
      "crossOrigin",
      "origin"
    ],
    correctAnswer: 1,
    explanation: "Параметр mode контролирует CORS: 'cors' (разрешает cross-origin), 'no-cors' (ограниченные возможности), 'same-origin' (только тот же домен).",
    topic: "Продвинутые возможности"
  },
  {
    id: 33,
    question: "Что такое cache mode в Fetch API?",
    options: [
      "Режим кеширования localStorage",
      "Опция, контролирующая взаимодействие с HTTP-кешем браузера",
      "Метод для очистки кеша",
      "Кеширование JavaScript объектов"
    ],
    correctAnswer: 1,
    explanation: "Параметр cache в fetch контролирует взаимодействие с HTTP-кешем: 'default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached'.",
    topic: "Продвинутые возможности"
  },
  {
    id: 34,
    question: "Как загрузить файл с помощью XMLHttpRequest?",
    options: [
      "Установить xhr.responseType = 'blob'",
      "Использовать xhr.download()",
      "Вызвать xhr.uploadFile()",
      "Это невозможно"
    ],
    correctAnswer: 0,
    explanation: "Для загрузки файлов нужно установить xhr.responseType = 'blob', затем после получения ответа использовать xhr.response как Blob объект.",
    topic: "Продвинутые возможности"
  },
  {
    id: 35,
    question: "Какие типы responseType поддерживает XMLHttpRequest?",
    options: [
      "'text', 'json', 'blob', 'arraybuffer', 'document'",
      "Только 'text' и 'json'",
      "Только 'blob'",
      "'string', 'object', 'binary'"
    ],
    correctAnswer: 0,
    explanation: "XMLHttpRequest поддерживает responseType: '' (строка), 'text', 'json', 'blob', 'arraybuffer', 'document', определяющий формат ответа.",
    topic: "Продвинутые возможности"
  },
  {
    id: 36,
    question: "Поддерживает ли Fetch API загрузку файлов с отслеживанием прогресса?",
    options: [
      "Да, через onprogress",
      "Да, но требует использования ReadableStream",
      "Нет, только XMLHttpRequest поддерживает",
      "Да, через progress event"
    ],
    correctAnswer: 1,
    explanation: "Fetch не имеет встроенных событий прогресса, но можно отслеживать через ReadableStream API (response.body.getReader()), что сложнее, чем xhr.onprogress.",
    topic: "Продвинутые возможности"
  },
  {
    id: 37,
    question: "Что такое redirect mode в Fetch API?",
    options: [
      "Режим перенаправления страницы",
      "Опция, контролирующая обработку HTTP-редиректов",
      "Метод для ручного редиректа",
      "Режим работы маршрутизатора"
    ],
    correctAnswer: 1,
    explanation: "Параметр redirect контролирует обработку редиректов: 'follow' (следовать, по умолчанию), 'error' (ошибка при редиректе), 'manual' (ручная обработка).",
    topic: "Продвинутые возможности"
  },
  {
    id: 38,
    question: "Какой API лучше подходит для современной разработки?",
    options: [
      "XMLHttpRequest, так как он более мощный",
      "Fetch API, так как он современнее и использует Promise",
      "Оба одинаково хороши",
      "Зависит только от браузера"
    ],
    correctAnswer: 1,
    explanation: "Fetch API рекомендуется для новых проектов благодаря Promise-based API, более чистому синтаксису и лучшей интеграции с async/await. XMLHttpRequest используется в legacy-коде.",
    topic: "Продвинутые возможности"
  },
  {
    id: 39,
    question: "Когда стоит использовать XMLHttpRequest вместо Fetch?",
    options: [
      "Никогда",
      "Когда нужен простой прогресс загрузки или поддержка старых браузеров",
      "Всегда",
      "Только для загрузки XML"
    ],
    correctAnswer: 1,
    explanation: "XMLHttpRequest может быть полезен для отслеживания прогресса загрузки (проще, чем в Fetch), для поддержки очень старых браузеров, или в legacy-коде.",
    topic: "Продвинутые возможности"
  },
  {
    id: 40,
    question: "Можно ли использовать async/await с XMLHttpRequest?",
    options: [
      "Да, напрямую",
      "Да, обернув в Promise",
      "Нет, только с Fetch",
      "Да, через специальный метод"
    ],
    correctAnswer: 1,
    explanation: "XMLHttpRequest не возвращает Promise, но его можно обернуть в Promise вручную, чтобы использовать с async/await. Fetch изначально возвращает Promise.",
    topic: "Продвинутые возможности"
  }
]
