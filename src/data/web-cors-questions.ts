import type { Question } from '@/types/question.ts'

export const webCorsQuestions: Question[] = [
  // Тема 1: Основы CORS
  {
    id: 1,
    question: "Что такое CORS (Cross-Origin Resource Sharing)?",
    options: [
      "Протокол шифрования данных",
      "Механизм безопасности браузера для контроля кросс-доменных HTTP запросов",
      "Библиотека для работы с API",
      "Метод аутентификации пользователей"
    ],
    correctAnswer: 1,
    explanation: "CORS — это механизм безопасности, реализованный в браузерах, который использует HTTP заголовки для контроля доступа веб-приложений к ресурсам с других доменов (origins).",
    topic: "Основы CORS"
  },
  {
    id: 2,
    question: "Почему CORS важен для безопасности веб-приложений?",
    options: [
      "Он шифрует все данные",
      "Он предотвращает несанкционированные кросс-доменные запросы из браузера",
      "Он защищает от SQL инъекций",
      "Он ускоряет загрузку страниц"
    ],
    correctAnswer: 1,
    explanation: "CORS защищает пользователей от атак, при которых вредоносный сайт пытается выполнить запросы к другому сайту от имени пользователя. Без CORS любой сайт мог бы читать данные с других сайтов в контексте браузера пользователя.",
    topic: "Основы CORS"
  },
  {
    id: 3,
    question: "Что такое Origin (источник) в контексте CORS?",
    options: [
      "Только доменное имя",
      "Комбинация протокола, домена и порта",
      "IP адрес сервера",
      "Путь к ресурсу на сервере"
    ],
    correctAnswer: 1,
    explanation: "Origin состоит из трех компонентов: протокол (http/https), доменное имя и порт. Например, https://example.com:443 и http://example.com:80 — это разные origins.",
    topic: "Основы CORS"
  },
  {
    id: 4,
    question: "Какие из этих пар являются разными origins?\n\nhttps://example.com и http://example.com",
    options: [
      "Это одинаковые origins",
      "Это разные origins (разные протоколы)",
      "Зависит от браузера",
      "Разные только в Safari"
    ],
    correctAnswer: 1,
    explanation: "Это разные origins, потому что они используют разные протоколы (https vs http). Протокол является частью определения origin.",
    topic: "Основы CORS"
  },
  {
    id: 5,
    question: "Когда браузер применяет политику CORS?",
    options: [
      "Для всех HTTP запросов",
      "Только для XMLHttpRequest и Fetch API запросов к другим origins",
      "Только для POST запросов",
      "Только для запросов с куками"
    ],
    correctAnswer: 1,
    explanation: "Браузер применяет CORS только для XMLHttpRequest и Fetch API запросов к другим origins. Обычная навигация (переход по ссылкам), загрузка изображений, скриптов и стилей не подпадают под CORS.",
    topic: "Основы CORS"
  },
  {
    id: 6,
    question: "Что произойдет, если сервер не установит CORS заголовки для кросс-доменного запроса?",
    options: [
      "Запрос выполнится успешно",
      "Браузер заблокирует ответ и выдаст ошибку CORS",
      "Браузер перенаправит на другой сервер",
      "Запрос не будет отправлен"
    ],
    correctAnswer: 1,
    explanation: "Браузер отправит запрос на сервер, но заблокирует доступ JavaScript к ответу и выдаст ошибку CORS в консоли. Сервер получит и обработает запрос, но браузер не даст прочитать ответ.",
    topic: "Основы CORS"
  },

  // Тема 2: HTTP заголовки CORS
  {
    id: 7,
    question: "Какой заголовок сервер должен установить, чтобы разрешить доступ с определенного origin?",
    options: [
      "Access-Control-Allow-Origin",
      "Allow-Origin",
      "Cross-Origin-Access",
      "CORS-Allow-Origin"
    ],
    correctAnswer: 0,
    explanation: "Заголовок Access-Control-Allow-Origin указывает, какому origin разрешен доступ к ресурсу. Например: Access-Control-Allow-Origin: https://example.com",
    topic: "HTTP заголовки"
  },
  {
    id: 8,
    question: "Что означает Access-Control-Allow-Origin: *?",
    options: [
      "Запретить все origins",
      "Разрешить доступ с любого origin",
      "Разрешить только текущий origin",
      "Это неверный синтаксис"
    ],
    correctAnswer: 1,
    explanation: "Звездочка (*) означает, что доступ разрешен с любого origin. Однако это нельзя использовать с credentials (cookies).",
    topic: "HTTP заголовки"
  },
  {
    id: 9,
    question: "Можно ли указать несколько origins в Access-Control-Allow-Origin?",
    options: [
      "Да, через запятую",
      "Да, через пробел",
      "Нет, только один origin или *",
      "Да, в отдельных заголовках"
    ],
    correctAnswer: 2,
    explanation: "Access-Control-Allow-Origin может содержать только один конкретный origin или *. Для поддержки нескольких origins сервер должен динамически устанавливать заголовок на основе Origin в запросе.",
    topic: "HTTP заголовки"
  },
  {
    id: 10,
    question: "Какой заголовок разрешает отправку credentials (cookies, HTTP auth)?",
    options: [
      "Access-Control-Allow-Credentials: true",
      "Access-Control-Allow-Cookies: true",
      "Allow-Credentials: true",
      "CORS-Credentials: enabled"
    ],
    correctAnswer: 0,
    explanation: "Access-Control-Allow-Credentials: true разрешает браузеру отправлять credentials. При этом Access-Control-Allow-Origin не может быть *, должен быть конкретный origin.",
    topic: "HTTP заголовки"
  },
  {
    id: 11,
    question: "Какой заголовок клиент отправляет серверу, чтобы указать свой origin?",
    options: [
      "Request-Origin",
      "Origin",
      "From-Origin",
      "Client-Origin"
    ],
    correctAnswer: 1,
    explanation: "Браузер автоматически добавляет заголовок Origin к кросс-доменным запросам, указывая origin страницы, с которой выполняется запрос.",
    topic: "HTTP заголовки"
  },
  {
    id: 12,
    question: "Что делает заголовок Access-Control-Allow-Methods?",
    options: [
      "Указывает методы, которые сервер поддерживает",
      "Указывает HTTP методы, разрешенные для кросс-доменных запросов",
      "Устанавливает методы авторизации",
      "Определяет методы кэширования"
    ],
    correctAnswer: 1,
    explanation: "Access-Control-Allow-Methods указывает, какие HTTP методы (GET, POST, PUT, DELETE и т.д.) разрешены для кросс-доменных запросов к данному ресурсу.",
    topic: "HTTP заголовки"
  },
  {
    id: 13,
    question: "Для чего используется Access-Control-Allow-Headers?",
    options: [
      "Для указания заголовков в ответе",
      "Для перечисления заголовков, которые клиент может отправить в запросе",
      "Для установки заголовков кэширования",
      "Для определения типа контента"
    ],
    correctAnswer: 1,
    explanation: "Access-Control-Allow-Headers перечисляет заголовки, которые разрешено отправлять в кросс-доменных запросах. Например: Access-Control-Allow-Headers: Content-Type, Authorization",
    topic: "HTTP заголовки"
  },
  {
    id: 14,
    question: "Что делает заголовок Access-Control-Expose-Headers?",
    options: [
      "Скрывает заголовки от клиента",
      "Указывает заголовки ответа, доступные для чтения JavaScript",
      "Устанавливает заголовки безопасности",
      "Определяет заголовки для кэширования"
    ],
    correctAnswer: 1,
    explanation: "По умолчанию JavaScript может читать только базовые заголовки ответа. Access-Control-Expose-Headers разрешает доступ к дополнительным заголовкам, например: Access-Control-Expose-Headers: X-Custom-Header",
    topic: "HTTP заголовки"
  },
  {
    id: 15,
    question: "Какой заголовок определяет время кэширования preflight запроса?",
    options: [
      "Cache-Control",
      "Access-Control-Max-Age",
      "Max-Age",
      "Preflight-Cache"
    ],
    correctAnswer: 1,
    explanation: "Access-Control-Max-Age указывает в секундах, как долго результат preflight запроса может быть закэширован браузером, чтобы избежать повторных preflight запросов.",
    topic: "HTTP заголовки"
  },

  // Тема 3: Простые и сложные запросы
  {
    id: 16,
    question: "Что такое 'простой запрос' (simple request) в контексте CORS?",
    options: [
      "Любой GET запрос",
      "Запрос, который не требует preflight проверки",
      "Запрос без заголовков",
      "Запрос только к тому же origin"
    ],
    correctAnswer: 1,
    explanation: "Простой запрос — это запрос, который соответствует определенным критериям и не требует preflight проверки. Браузер сразу отправляет такой запрос на сервер.",
    topic: "Типы запросов"
  },
  {
    id: 17,
    question: "Какие HTTP методы считаются простыми для CORS?",
    options: [
      "GET, POST, PUT",
      "GET, POST, HEAD",
      "GET, POST, DELETE",
      "Только GET"
    ],
    correctAnswer: 1,
    explanation: "Простыми методами считаются GET, POST и HEAD. Использование других методов (PUT, DELETE, PATCH и т.д.) делает запрос сложным и требует preflight.",
    topic: "Типы запросов"
  },
  {
    id: 18,
    question: "Какие Content-Type разрешены для простых POST запросов?",
    options: [
      "Любые Content-Type",
      "application/json, text/plain, multipart/form-data",
      "application/x-www-form-urlencoded, multipart/form-data, text/plain",
      "Только application/json"
    ],
    correctAnswer: 2,
    explanation: "Для простых POST запросов Content-Type должен быть один из: application/x-www-form-urlencoded, multipart/form-data или text/plain. application/json делает запрос сложным.",
    topic: "Типы запросов"
  },
  {
    id: 19,
    question: "Что сделает запрос сложным (требующим preflight)?",
    options: [
      "Использование метода GET",
      "Добавление кастомного заголовка типа X-Custom-Header",
      "Запрос к тому же origin",
      "Использование HTTP вместо HTTPS"
    ],
    correctAnswer: 1,
    explanation: "Кастомные заголовки (кроме базовых: Accept, Accept-Language, Content-Language, Content-Type) делают запрос сложным и требуют preflight проверки.",
    topic: "Типы запросов"
  },
  {
    id: 20,
    question: "Какой Content-Type НЕ требует preflight запроса?",
    options: [
      "application/json",
      "application/xml",
      "text/plain",
      "application/octet-stream"
    ],
    correctAnswer: 2,
    explanation: "text/plain является одним из трех разрешенных Content-Type для простых запросов (вместе с application/x-www-form-urlencoded и multipart/form-data).",
    topic: "Типы запросов"
  },
  {
    id: 21,
    question: "Требует ли этот запрос preflight?\n\nfetch('https://api.example.com/data', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'John' })\n})",
    options: [
      "Нет, это простой запрос",
      "Да, из-за Content-Type: application/json",
      "Да, из-за метода POST",
      "Нет, если сервер поддерживает CORS"
    ],
    correctAnswer: 1,
    explanation: "application/json не входит в список разрешенных Content-Type для простых запросов, поэтому браузер сначала отправит OPTIONS preflight запрос.",
    topic: "Типы запросов"
  },
  {
    id: 22,
    question: "Требует ли этот запрос preflight?\n\nfetch('https://api.example.com/data', {\n  method: 'GET',\n  headers: { 'Authorization': 'Bearer token123' }\n})",
    options: [
      "Нет, GET всегда простой",
      "Да, из-за заголовка Authorization",
      "Нет, Authorization разрешен",
      "Зависит от сервера"
    ],
    correctAnswer: 1,
    explanation: "Заголовок Authorization не входит в список разрешенных заголовков для простых запросов, поэтому требуется preflight, даже для GET запроса.",
    topic: "Типы запросов"
  },

  // Тема 4: Preflight запросы
  {
    id: 23,
    question: "Что такое preflight запрос?",
    options: [
      "Первый запрос к серверу при загрузке страницы",
      "OPTIONS запрос для проверки разрешений CORS перед основным запросом",
      "Запрос для получения конфигурации CORS",
      "Тестовый запрос для проверки доступности сервера"
    ],
    correctAnswer: 1,
    explanation: "Preflight — это автоматический OPTIONS запрос, который браузер отправляет перед сложным кросс-доменным запросом, чтобы узнать, разрешен ли такой запрос сервером.",
    topic: "Preflight"
  },
  {
    id: 24,
    question: "Какой HTTP метод используется для preflight запроса?",
    options: [
      "GET",
      "POST",
      "OPTIONS",
      "HEAD"
    ],
    correctAnswer: 2,
    explanation: "Браузер всегда использует метод OPTIONS для preflight запроса. Этот метод безопасен и не изменяет данные на сервере.",
    topic: "Preflight"
  },
  {
    id: 25,
    question: "Какие заголовки браузер отправляет в preflight запросе?",
    options: [
      "Только Origin",
      "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Content-Type и Authorization",
      "Все заголовки основного запроса"
    ],
    correctAnswer: 1,
    explanation: "В preflight запросе браузер отправляет: Origin (источник), Access-Control-Request-Method (метод основного запроса), Access-Control-Request-Headers (список заголовков основного запроса).",
    topic: "Preflight"
  },
  {
    id: 26,
    question: "Что произойдет, если preflight запрос не пройдет проверку?",
    options: [
      "Основной запрос все равно отправится",
      "Браузер заблокирует основной запрос и выдаст ошибку CORS",
      "Браузер повторит preflight",
      "Пользователь увидит предупреждение"
    ],
    correctAnswer: 1,
    explanation: "Если сервер не вернет правильные CORS заголовки в ответ на preflight, браузер не отправит основной запрос и выдаст ошибку CORS в консоли.",
    topic: "Preflight"
  },
  {
    id: 27,
    question: "Как сервер должен ответить на успешный preflight запрос?",
    options: [
      "Статус 200 с данными",
      "Статус 204 No Content или 200 с CORS заголовками",
      "Статус 301 Redirect",
      "Статус 403 Forbidden"
    ],
    correctAnswer: 1,
    explanation: "Сервер должен ответить статусом 204 (или 200) с необходимыми CORS заголовками (Access-Control-Allow-Origin, Access-Control-Allow-Methods и т.д.). Тело ответа обычно пустое.",
    topic: "Preflight"
  },
  {
    id: 28,
    question: "Можно ли избежать preflight запросов?",
    options: [
      "Нет, они всегда обязательны",
      "Да, используя только простые запросы",
      "Да, отключив CORS",
      "Да, используя прокси"
    ],
    correctAnswer: 1,
    explanation: "Preflight можно избежать, используя только простые запросы: методы GET/POST/HEAD, разрешенные Content-Type и без кастомных заголовков.",
    topic: "Preflight"
  },
  {
    id: 29,
    question: "Как часто браузер отправляет preflight запросы?",
    options: [
      "Перед каждым запросом",
      "Один раз за сессию",
      "Кэширует результат на время, указанное в Access-Control-Max-Age",
      "Только при первой загрузке страницы"
    ],
    correctAnswer: 2,
    explanation: "Браузер кэширует результат preflight на время, указанное в заголовке Access-Control-Max-Age. По истечении этого времени отправляется новый preflight.",
    topic: "Preflight"
  },
  {
    id: 30,
    question: "Что содержит заголовок Access-Control-Request-Method в preflight?",
    options: [
      "Метод preflight запроса (OPTIONS)",
      "Метод основного запроса, который будет выполнен после preflight",
      "Список всех поддерживаемых методов",
      "Метод предыдущего запроса"
    ],
    correctAnswer: 1,
    explanation: "Access-Control-Request-Method указывает HTTP метод (GET, POST, PUT и т.д.), который будет использован в основном запросе после успешного preflight.",
    topic: "Preflight"
  },

  // Тема 5: CORS и credentials
  {
    id: 31,
    question: "Что означает 'credentials' в контексте CORS?",
    options: [
      "Логин и пароль",
      "Cookies, HTTP authentication и клиентские SSL сертификаты",
      "API ключи",
      "JWT токены"
    ],
    correctAnswer: 1,
    explanation: "Credentials включают cookies, HTTP authentication заголовки и клиентские SSL сертификаты — все, что позволяет идентифицировать пользователя.",
    topic: "Credentials"
  },
  {
    id: 32,
    question: "Как включить отправку credentials в Fetch API?",
    options: [
      "fetch(url, { withCredentials: true })",
      "fetch(url, { credentials: 'include' })",
      "fetch(url, { cookies: true })",
      "fetch(url, { auth: true })"
    ],
    correctAnswer: 1,
    explanation: "В Fetch API нужно установить credentials: 'include' чтобы браузер отправлял cookies и другие credentials. По умолчанию credentials: 'same-origin'.",
    topic: "Credentials"
  },
  {
    id: 33,
    question: "Можно ли использовать Access-Control-Allow-Origin: * с credentials?",
    options: [
      "Да, всегда",
      "Нет, нужно указать конкретный origin",
      "Да, но только для GET запросов",
      "Да, если установить Access-Control-Allow-Credentials: false"
    ],
    correctAnswer: 1,
    explanation: "Когда запрос включает credentials, Access-Control-Allow-Origin должен содержать конкретный origin, а не *. Это требование безопасности.",
    topic: "Credentials"
  },
  {
    id: 34,
    question: "Что произойдет с этим запросом?\n\nfetch('https://api.example.com', {\n  credentials: 'include'\n})\n\n// Сервер отвечает:\n// Access-Control-Allow-Origin: *\n// Access-Control-Allow-Credentials: true",
    options: [
      "Запрос выполнится успешно",
      "Браузер заблокирует ответ из-за конфликта * и credentials",
      "Cookies не будут отправлены",
      "Потребуется preflight"
    ],
    correctAnswer: 1,
    explanation: "Браузер заблокирует ответ и выдаст ошибку CORS, так как нельзя использовать Access-Control-Allow-Origin: * вместе с credentials. Нужен конкретный origin.",
    topic: "Credentials"
  },
  {
    id: 35,
    question: "Какое значение credentials используется по умолчанию в Fetch API?",
    options: [
      "'omit'",
      "'same-origin'",
      "'include'",
      "'auto'"
    ],
    correctAnswer: 1,
    explanation: "По умолчанию credentials: 'same-origin', что означает отправку credentials только для запросов к тому же origin. Для кросс-доменных нужно явно указать 'include'.",
    topic: "Credentials"
  },

  // Тема 6: Практические сценарии и отладка
  {
    id: 36,
    question: "Что означает эта ошибка в консоли?\n\n'Access to fetch at 'https://api.example.com' from origin 'https://myapp.com' has been blocked by CORS policy'",
    options: [
      "Сервер недоступен",
      "Сервер не установил правильные CORS заголовки",
      "Неправильный URL",
      "Проблема с сетью"
    ],
    correctAnswer: 1,
    explanation: "Эта ошибка означает, что сервер не вернул необходимые CORS заголовки (например, Access-Control-Allow-Origin) или вернул неправильные значения.",
    topic: "Отладка"
  },
  {
    id: 37,
    question: "Как обойти CORS ограничения в разработке?",
    options: [
      "Отключить CORS в браузере",
      "Использовать прокси сервер или CORS плагин для разработки",
      "Изменить настройки DNS",
      "Использовать VPN"
    ],
    correctAnswer: 1,
    explanation: "В разработке можно использовать прокси сервер (например, в webpack/vite), который перенаправляет запросы, или браузерные расширения для разработки. Отключать CORS в браузере небезопасно.",
    topic: "Отладка"
  },
  {
    id: 38,
    question: "Почему OPTIONS запрос показывает статус 200, но основной запрос все равно блокируется?",
    options: [
      "Это баг браузера",
      "Preflight прошел, но основной запрос не соответствует разрешенным параметрам",
      "Сервер медленно отвечает",
      "Проблема с сетью"
    ],
    correctAnswer: 1,
    explanation: "Preflight может пройти успешно, но если основной запрос использует заголовки или методы, не разрешенные в preflight ответе, браузер заблокирует его.",
    topic: "Отладка"
  },
  {
    id: 39,
    question: "Как настроить CORS для нескольких доменов на сервере?",
    options: [
      "Указать все домены через запятую в Access-Control-Allow-Origin",
      "Динамически устанавливать Access-Control-Allow-Origin на основе Origin из запроса",
      "Использовать только *",
      "Создать отдельный сервер для каждого домена"
    ],
    correctAnswer: 1,
    explanation: "Сервер должен проверить заголовок Origin в запросе и, если он в списке разрешенных, установить Access-Control-Allow-Origin с этим значением. Нельзя указать несколько origins в одном заголовке.",
    topic: "Практика"
  },
  {
    id: 40,
    question: "Что будет с CORS при использовании HTTPS → HTTP запроса?",
    options: [
      "CORS не применяется",
      "Браузер может заблокировать такой запрос по mixed content политике",
      "Запрос всегда разрешен",
      "Требуется двойной preflight"
    ],
    correctAnswer: 1,
    explanation: "Современные браузеры блокируют запросы с HTTPS страниц к HTTP ресурсам по политике mixed content еще до проверки CORS, так как это небезопасно.",
    topic: "Практика"
  }
]
