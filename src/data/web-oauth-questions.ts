import type { Question } from '@/types/question.ts'

export const webOAuthQuestions: Question[] = [
  // Тема 1: Основы OAuth
  {
    id: 1,
    question: "Что такое OAuth?",
    options: [
      "Протокол шифрования данных",
      "Открытый стандарт делегированной авторизации",
      "Метод аутентификации пользователей",
      "Библиотека для работы с токенами"
    ],
    correctAnswer: 1,
    explanation: "OAuth (Open Authorization) — это открытый стандарт делегированной авторизации, который позволяет приложениям получать ограниченный доступ к ресурсам пользователя на другом сервисе без передачи пароля.",
    topic: "Основы OAuth"
  },
  {
    id: 2,
    question: "Для чего используется OAuth в веб-приложениях?",
    options: [
      "Для хеширования паролей",
      "Для предоставления доступа к ресурсам без передачи учетных данных",
      "Для создания сессий пользователей",
      "Для валидации форм"
    ],
    correctAnswer: 1,
    explanation: "OAuth используется для делегированного доступа: приложение получает доступ к ресурсам пользователя (например, Google Drive, GitHub) без необходимости знать его пароль. Это безопаснее и удобнее для пользователя.",
    topic: "Основы OAuth"
  },
  {
    id: 3,
    question: "В чем разница между OAuth и OpenID Connect?",
    options: [
      "OAuth для авторизации, OpenID Connect для аутентификации",
      "OAuth для аутентификации, OpenID Connect для авторизации",
      "Это синонимы одного протокола",
      "OpenID Connect устарел и заменен на OAuth"
    ],
    correctAnswer: 0,
    explanation: "OAuth 2.0 — это протокол авторизации (предоставление доступа к ресурсам). OpenID Connect (OIDC) — это надстройка над OAuth 2.0, добавляющая аутентификацию (проверку личности пользователя) через ID токены.",
    topic: "Основы OAuth"
  },
  {
    id: 4,
    question: "Какая версия OAuth используется в современных приложениях?",
    options: [
      "OAuth 1.0",
      "OAuth 1.5",
      "OAuth 2.0",
      "OAuth 3.0"
    ],
    correctAnswer: 2,
    explanation: "OAuth 2.0 является текущим стандартом и используется в большинстве современных приложений. OAuth 1.0 устарел и имел более сложную реализацию. OAuth 2.1 находится в разработке.",
    topic: "Основы OAuth"
  },

  // Тема 2: Компоненты OAuth
  {
    id: 5,
    question: "Какие основные компоненты входят в архитектуру OAuth 2.0?",
    options: [
      "Client, Server, Database",
      "Resource Owner, Client, Authorization Server, Resource Server",
      "User, Application, API",
      "Frontend, Backend, Gateway"
    ],
    correctAnswer: 1,
    explanation: "OAuth 2.0 включает четыре роли: Resource Owner (владелец ресурса/пользователь), Client (приложение), Authorization Server (сервер авторизации), Resource Server (сервер ресурсов).",
    topic: "Компоненты OAuth"
  },
  {
    id: 6,
    question: "Что такое Resource Owner в контексте OAuth?",
    options: [
      "Сервер, хранящий данные",
      "Пользователь, владеющий защищенными ресурсами",
      "Приложение, запрашивающее доступ",
      "API endpoint"
    ],
    correctAnswer: 1,
    explanation: "Resource Owner (владелец ресурса) — это пользователь, который владеет защищенными ресурсами и может предоставить к ним доступ. Обычно это конечный пользователь веб-приложения.",
    topic: "Компоненты OAuth"
  },
  {
    id: 7,
    question: "Какова роль Authorization Server в OAuth?",
    options: [
      "Хранит пользовательские данные",
      "Выдает токены доступа после аутентификации",
      "Обрабатывает бизнес-логику приложения",
      "Кеширует ответы API"
    ],
    correctAnswer: 1,
    explanation: "Authorization Server — это сервер, который аутентифицирует Resource Owner и выдает access tokens клиентскому приложению после получения разрешения от пользователя.",
    topic: "Компоненты OAuth"
  },
  {
    id: 8,
    question: "Что такое Client в архитектуре OAuth?",
    options: [
      "Браузер пользователя",
      "Приложение, запрашивающее доступ к защищенным ресурсам",
      "Мобильное устройство",
      "База данных"
    ],
    correctAnswer: 1,
    explanation: "Client (клиент) — это приложение (веб, мобильное, desktop), которое запрашивает доступ к защищенным ресурсам от имени Resource Owner и с его разрешения.",
    topic: "Компоненты OAuth"
  },
  {
    id: 9,
    question: "Чем Resource Server отличается от Authorization Server?",
    options: [
      "Resource Server хранит данные, Authorization Server выдает токены",
      "Это одно и то же",
      "Resource Server выдает токены, Authorization Server хранит данные",
      "Resource Server только для OAuth 1.0"
    ],
    correctAnswer: 0,
    explanation: "Resource Server хранит защищенные ресурсы пользователя (API с данными). Authorization Server выдает токены доступа. В реальности они могут быть одним сервером, но концептуально это разные роли.",
    topic: "Компоненты OAuth"
  },

  // Тема 3: OAuth Flow
  {
    id: 10,
    question: "Какой самый распространенный OAuth 2.0 flow для веб-приложений?",
    options: [
      "Implicit Flow",
      "Client Credentials Flow",
      "Authorization Code Flow",
      "Password Grant Flow"
    ],
    correctAnswer: 2,
    explanation: "Authorization Code Flow — это наиболее безопасный и рекомендуемый flow для веб-приложений с backend. Он включает обмен authorization code на access token на backend, что защищает токены от утечки.",
    topic: "OAuth Flow"
  },
  {
    id: 11,
    question: "Что происходит на первом шаге Authorization Code Flow?",
    options: [
      "Приложение получает access token",
      "Пользователь перенаправляется на Authorization Server для входа",
      "Приложение отправляет пароль на сервер",
      "Создается сессия в приложении"
    ],
    correctAnswer: 1,
    explanation: "На первом шаге приложение перенаправляет пользователя на Authorization Server (например, Google, GitHub) с указанием client_id, redirect_uri, scope. Пользователь там авторизуется и дает разрешение.",
    topic: "OAuth Flow"
  },
  {
    id: 12,
    question: "Что такое Authorization Code в OAuth?",
    options: [
      "Access token для API",
      "Временный код, который обменивается на access token",
      "Пароль пользователя",
      "Client secret"
    ],
    correctAnswer: 1,
    explanation: "Authorization Code — это временный одноразовый код, который Authorization Server отправляет клиенту после успешной авторизации пользователя. Клиент обменивает его на access token на backend.",
    topic: "OAuth Flow"
  },
  {
    id: 13,
    question: "Зачем нужен client_secret в Authorization Code Flow?",
    options: [
      "Для шифрования данных",
      "Для аутентификации клиентского приложения при обмене кода на токен",
      "Для хранения пользовательских данных",
      "Для создания JWT токенов"
    ],
    correctAnswer: 1,
    explanation: "client_secret используется для аутентификации клиентского приложения при обмене authorization code на access token. Это гарантирует, что токен получит именно зарегистрированное приложение, а не злоумышленник.",
    topic: "OAuth Flow"
  },
  {
    id: 14,
    question: "Что такое redirect_uri в OAuth?",
    options: [
      "URL Authorization Server",
      "URL, куда Authorization Server перенаправляет пользователя с кодом",
      "URL для обновления токена",
      "URL для выхода из системы"
    ],
    correctAnswer: 1,
    explanation: "redirect_uri — это URL вашего приложения, куда Authorization Server перенаправит пользователя после авторизации, добавив authorization code в query параметры. Этот URI должен быть предварительно зарегистрирован.",
    topic: "OAuth Flow"
  },
  {
    id: 15,
    question: "Что такое scope в OAuth?",
    options: [
      "Время жизни токена",
      "Набор прав доступа, которые запрашивает приложение",
      "ID пользователя",
      "Версия OAuth протокола"
    ],
    correctAnswer: 1,
    explanation: "Scope определяет набор прав доступа, которые приложение запрашивает (например, 'read:user', 'write:repo'). Пользователь видит запрашиваемые права и решает, предоставить ли их.",
    topic: "OAuth Flow"
  },

  // Тема 4: Токены OAuth
  {
    id: 16,
    question: "Что такое Access Token в OAuth?",
    options: [
      "Пароль пользователя",
      "Токен для доступа к защищенным ресурсам",
      "ID пользователя",
      "Ключ шифрования"
    ],
    correctAnswer: 1,
    explanation: "Access Token — это токен (обычно JWT или opaque token), который клиент использует для доступа к защищенным ресурсам на Resource Server. Он имеет ограниченное время жизни и определенный scope.",
    topic: "Токены OAuth"
  },
  {
    id: 17,
    question: "Зачем нужен Refresh Token?",
    options: [
      "Для первичной авторизации",
      "Для получения нового access token без повторной авторизации пользователя",
      "Для отзыва доступа",
      "Для шифрования данных"
    ],
    correctAnswer: 1,
    explanation: "Refresh Token — это долгоживущий токен, который используется для получения нового access token, когда старый истекает, без необходимости повторной авторизации пользователя.",
    topic: "Токены OAuth"
  },
  {
    id: 18,
    question: "Где следует хранить access token в веб-приложении?",
    options: [
      "В localStorage",
      "В cookie с httpOnly флагом или в памяти",
      "В sessionStorage",
      "В URL параметрах"
    ],
    correctAnswer: 1,
    explanation: "Access token лучше хранить в httpOnly cookie (защита от XSS) или в памяти приложения. localStorage и sessionStorage доступны для JavaScript, что создает риск XSS атак.",
    topic: "Токены OAuth"
  },
  {
    id: 19,
    question: "Какое типичное время жизни access token?",
    options: [
      "1-2 часа",
      "15 минут - 1 час",
      "24 часа",
      "Неограниченное"
    ],
    correctAnswer: 1,
    explanation: "Access token обычно имеет короткое время жизни (15 минут - 1 час) для минимизации ущерба в случае компрометации. Refresh token живет дольше (дни/недели) для обновления access token.",
    topic: "Токены OAuth"
  },
  {
    id: 20,
    question: "Что происходит, когда access token истекает?",
    options: [
      "Пользователь должен снова авторизоваться",
      "Приложение автоматически получает новый токен",
      "Приложение использует refresh token для получения нового access token",
      "Доступ блокируется навсегда"
    ],
    correctAnswer: 2,
    explanation: "Когда access token истекает, приложение отправляет refresh token на Authorization Server для получения нового access token без повторной авторизации пользователя.",
    topic: "Токены OAuth"
  },

  // Тема 5: OAuth Flows
  {
    id: 21,
    question: "Когда используется Implicit Flow?",
    options: [
      "Для серверных приложений",
      "Для SPA (Single Page Applications) без backend (устаревший подход)",
      "Для мобильных приложений",
      "Для machine-to-machine взаимодействия"
    ],
    correctAnswer: 1,
    explanation: "Implicit Flow ранее использовался для SPA, где токен сразу возвращался в URL. Сейчас он считается небезопасным и заменен на Authorization Code Flow + PKCE для SPA.",
    topic: "OAuth Flows"
  },
  {
    id: 22,
    question: "Что такое PKCE и зачем он нужен?",
    options: [
      "Новый протокол авторизации",
      "Расширение OAuth для защиты от атак перехвата authorization code",
      "Библиотека для работы с токенами",
      "Метод шифрования"
    ],
    correctAnswer: 1,
    explanation: "PKCE (Proof Key for Code Exchange) — это расширение OAuth 2.0, которое защищает от атак перехвата authorization code в публичных клиентах (SPA, мобильные приложения). Использует code_verifier и code_challenge.",
    topic: "OAuth Flows"
  },
  {
    id: 23,
    question: "Когда используется Client Credentials Flow?",
    options: [
      "Для авторизации пользователей",
      "Для machine-to-machine взаимодействия без участия пользователя",
      "Для мобильных приложений",
      "Для SPA"
    ],
    correctAnswer: 1,
    explanation: "Client Credentials Flow используется для взаимодействия между сервисами (machine-to-machine), когда не требуется авторизация от имени конкретного пользователя. Приложение аутентифицируется с помощью client_id и client_secret.",
    topic: "OAuth Flows"
  },
  {
    id: 24,
    question: "Почему Password Grant Flow не рекомендуется?",
    options: [
      "Слишком медленный",
      "Требует передачи пароля пользователя приложению, нарушая принципы OAuth",
      "Не поддерживается современными серверами",
      "Сложен в реализации"
    ],
    correctAnswer: 1,
    explanation: "Password Grant Flow требует, чтобы пользователь передал свой пароль приложению, что противоречит основной идее OAuth (делегированный доступ без передачи учетных данных). Используйте его только для миграции legacy систем.",
    topic: "OAuth Flows"
  },
  {
    id: 25,
    question: "Какой flow рекомендуется для современных SPA?",
    options: [
      "Implicit Flow",
      "Authorization Code Flow + PKCE",
      "Password Grant Flow",
      "Device Flow"
    ],
    correctAnswer: 1,
    explanation: "Для современных SPA рекомендуется Authorization Code Flow с PKCE расширением. Это обеспечивает безопасность без необходимости client_secret (который нельзя безопасно хранить в браузере).",
    topic: "OAuth Flows"
  },

  // Тема 6: Безопасность OAuth
  {
    id: 26,
    question: "Что такое state parameter в OAuth?",
    options: [
      "Статус авторизации",
      "Случайное значение для защиты от CSRF атак",
      "ID сессии пользователя",
      "Версия протокола"
    ],
    correctAnswer: 1,
    explanation: "State parameter — это случайное значение, которое клиент генерирует перед перенаправлением на Authorization Server и проверяет при возврате. Это защищает от CSRF атак (подмены redirect_uri).",
    topic: "Безопасность OAuth"
  },
  {
    id: 27,
    question: "Почему важно валидировать redirect_uri?",
    options: [
      "Для улучшения производительности",
      "Для предотвращения атак перенаправления токенов на вредоносные сайты",
      "Для совместимости с разными браузерами",
      "Для кеширования"
    ],
    correctAnswer: 1,
    explanation: "Валидация redirect_uri критична для безопасности: Authorization Server должен проверять, что URI соответствует зарегистрированному при создании приложения. Иначе злоумышленник может перехватить authorization code.",
    topic: "Безопасность OAuth"
  },
  {
    id: 28,
    question: "Что такое Token Introspection?",
    options: [
      "Создание нового токена",
      "Проверка валидности и получение метаданных токена",
      "Отзыв токена",
      "Шифрование токена"
    ],
    correctAnswer: 1,
    explanation: "Token Introspection — это endpoint на Authorization Server, который позволяет проверить валидность токена и получить его метаданные (scope, время истечения, пользователь). Полезно для Resource Server с opaque tokens.",
    topic: "Безопасность OAuth"
  },
  {
    id: 29,
    question: "Что такое Token Revocation?",
    options: [
      "Автоматическое обновление токена",
      "Принудительный отзыв токена до истечения срока действия",
      "Создание backup токена",
      "Шифрование токена"
    ],
    correctAnswer: 1,
    explanation: "Token Revocation — это механизм для принудительного отзыва access или refresh token до истечения срока действия (например, при выходе пользователя или компрометации токена).",
    topic: "Безопасность OAuth"
  },
  {
    id: 30,
    question: "Почему нельзя хранить токены в localStorage для чувствительных данных?",
    options: [
      "localStorage слишком медленный",
      "localStorage доступен для JavaScript, что создает риск XSS атак",
      "localStorage имеет ограничение по размеру",
      "localStorage не поддерживается в старых браузерах"
    ],
    correctAnswer: 1,
    explanation: "localStorage доступен для любого JavaScript кода на странице, включая вредоносные скрипты (XSS). Для чувствительных токенов используйте httpOnly cookies или храните в памяти приложения.",
    topic: "Безопасность OAuth"
  },

  // Тема 7: UX и интеграция
  {
    id: 31,
    question: "Как OAuth улучшает пользовательский опыт?",
    options: [
      "Ускоряет загрузку страниц",
      "Позволяет входить через существующие аккаунты без создания новых паролей",
      "Улучшает дизайн интерфейса",
      "Оптимизирует производительность"
    ],
    correctAnswer: 1,
    explanation: "OAuth позволяет пользователям входить через существующие аккаунты (Google, GitHub, Facebook) без необходимости создавать и запоминать новые пароли. Это упрощает регистрацию и вход.",
    topic: "UX и интеграция"
  },
  {
    id: 32,
    question: "Что такое 'Sign in with Google/GitHub/Facebook'?",
    options: [
      "Прямая передача пароля",
      "Использование OAuth для делегированной авторизации",
      "API для синхронизации данных",
      "Новый протокол аутентификации"
    ],
    correctAnswer: 1,
    explanation: "Кнопки 'Sign in with...' используют OAuth (часто с OpenID Connect) для делегированной авторизации: пользователь авторизуется на знакомом сервисе, и приложение получает токен доступа и/или информацию о пользователе.",
    topic: "UX и интеграция"
  },
  {
    id: 33,
    question: "Какой недостаток OAuth может повлиять на UX?",
    options: [
      "Слишком быстрая авторизация",
      "Необходимость перенаправления на внешний сайт для авторизации",
      "Отсутствие безопасности",
      "Сложность в понимании для разработчиков"
    ],
    correctAnswer: 1,
    explanation: "Основной UX недостаток — необходимость перенаправления пользователя на Authorization Server (выход из контекста приложения). Однако это же обеспечивает безопасность (приложение не видит пароль).",
    topic: "UX и интеграция"
  },
  {
    id: 34,
    question: "Как обрабатывать ошибки OAuth в пользовательском интерфейсе?",
    options: [
      "Показывать технические детали ошибки",
      "Предоставлять понятные сообщения и возможность повторить попытку",
      "Игнорировать ошибки",
      "Автоматически перезагружать страницу"
    ],
    correctAnswer: 1,
    explanation: "При ошибках OAuth важно показывать пользователю понятные сообщения (не технические коды), объяснять что пошло не так (отказ в доступе, недоступность сервиса) и предлагать действия (повторить, войти другим способом).",
    topic: "UX и интеграция"
  },

  // Тема 8: Библиотеки и инструменты
  {
    id: 35,
    question: "Какая популярная библиотека для OAuth в Node.js?",
    options: [
      "passport.js с OAuth strategies",
      "express-oauth",
      "oauth-node",
      "node-auth"
    ],
    correctAnswer: 0,
    explanation: "Passport.js — самая популярная библиотека аутентификации для Node.js. Она поддерживает множество OAuth провайдеров через strategies (passport-google-oauth20, passport-github2 и т.д.).",
    topic: "Библиотеки и инструменты"
  },
  {
    id: 36,
    question: "Какая библиотека рекомендуется для OAuth в React приложениях?",
    options: [
      "react-oauth2",
      "react-oauth/google, Auth0 SDK, или использование серверного OAuth",
      "oauth-react",
      "react-auth-library"
    ],
    correctAnswer: 1,
    explanation: "Для React: @react-oauth/google для Google Sign-In, Auth0 SDK (@auth0/auth0-react), или реализация OAuth на backend с передачей токенов в React. Избегайте полной реализации OAuth flow в браузере.",
    topic: "Библиотеки и инструменты"
  },
  {
    id: 37,
    question: "Что такое Auth0?",
    options: [
      "Протокол авторизации",
      "Платформа Identity as a Service с готовой реализацией OAuth",
      "Библиотека для Node.js",
      "Расширение браузера"
    ],
    correctAnswer: 1,
    explanation: "Auth0 — это платформа Identity as a Service (IDaaS), предоставляющая готовую реализацию OAuth, OpenID Connect, многофакторной аутентификации и управления пользователями, что упрощает внедрение авторизации.",
    topic: "Библиотеки и инструменты"
  },
  {
    id: 38,
    question: "Какие еще IDaaS платформы популярны кроме Auth0?",
    options: [
      "Okta, Firebase Auth, AWS Cognito, Azure AD B2C",
      "MongoDB, PostgreSQL, Redis",
      "React, Vue, Angular",
      "Docker, Kubernetes, AWS"
    ],
    correctAnswer: 0,
    explanation: "Популярные IDaaS платформы: Okta (enterprise), Firebase Authentication (Google), AWS Cognito, Azure AD B2C, Keycloak (open-source). Они предоставляют готовую инфраструктуру для OAuth и аутентификации.",
    topic: "Библиотеки и инструменты"
  },
  {
    id: 39,
    question: "Что такое OAuth playground?",
    options: [
      "Игровая платформа с OAuth",
      "Инструмент для тестирования и изучения OAuth flows",
      "Библиотека для разработки",
      "API для игровых приложений"
    ],
    correctAnswer: 1,
    explanation: "OAuth Playground (например, Google OAuth 2.0 Playground) — это инструмент для интерактивного тестирования OAuth flows, просмотра запросов/ответов и изучения протокола без написания кода.",
    topic: "Библиотеки и инструменты"
  },
  {
    id: 40,
    question: "Какой инструмент можно использовать для создания собственного Authorization Server?",
    options: [
      "Keycloak, Ory Hydra, AuthLib",
      "Express.js, Fastify",
      "MongoDB, PostgreSQL",
      "Nginx, Apache"
    ],
    correctAnswer: 0,
    explanation: "Для создания собственного Authorization Server: Keycloak (Java, open-source), Ory Hydra (Go, open-source), AuthLib (Python), node-oauth2-server (Node.js). Они реализуют OAuth 2.0 спецификацию.",
    topic: "Библиотеки и инструменты"
  },

  // Тема 9: Практические сценарии
  {
    id: 41,
    question: "Как реализовать 'Sign in with Google' в веб-приложении?",
    options: [
      "Создать форму для ввода Google пароля",
      "Зарегистрировать OAuth клиента, перенаправить на Google, обработать callback с кодом",
      "Использовать Google API напрямую",
      "Скопировать токен из Google"
    ],
    correctAnswer: 1,
    explanation: "Для Google Sign-In: (1) Зарегистрировать OAuth client в Google Cloud Console, (2) Перенаправить пользователя на Google с client_id и scopes, (3) Обработать callback с authorization code, (4) Обменять код на токены.",
    topic: "Практические сценарии"
  },
  {
    id: 42,
    question: "Как получить email пользователя через OAuth?",
    options: [
      "Email передается автоматически",
      "Запросить scope 'email' или 'profile' при авторизации",
      "Email нельзя получить через OAuth",
      "Нужно использовать отдельный API"
    ],
    correctAnswer: 1,
    explanation: "Для получения email через OAuth нужно запросить соответствующий scope при авторизации (например, 'email' для Google, 'user:email' для GitHub). Пользователь увидит этот запрос и может одобрить или отклонить.",
    topic: "Практические сценарии"
  },
  {
    id: 43,
    question: "Как обновить истекший access token без повторной авторизации?",
    options: [
      "Попросить пользователя войти снова",
      "Использовать refresh token для получения нового access token",
      "Создать новый токен на клиенте",
      "Невозможно обновить токен"
    ],
    correctAnswer: 1,
    explanation: "Для обновления access token отправьте POST запрос на token endpoint с grant_type=refresh_token и refresh token. Authorization Server вернет новый access token (и возможно новый refresh token).",
    topic: "Практические сценарии"
  },
  {
    id: 44,
    question: "Как реализовать logout при использовании OAuth?",
    options: [
      "Просто удалить токен на клиенте",
      "Удалить токен на клиенте и опционально отозвать его на сервере",
      "Перезагрузить страницу",
      "Очистить cookies"
    ],
    correctAnswer: 1,
    explanation: "Для logout: (1) Удалить access и refresh токены на клиенте, (2) Отозвать токены через revocation endpoint если нужно, (3) Опционально перенаправить на logout endpoint провайдера OAuth для выхода оттуда.",
    topic: "Практические сценарии"
  },
  {
    id: 45,
    question: "Как связать OAuth аккаунт с существующим аккаунтом в приложении?",
    options: [
      "Создать новый аккаунт всегда",
      "Проверить email из OAuth, если совпадает — связать аккаунты",
      "Это невозможно",
      "Использовать только OAuth"
    ],
    correctAnswer: 1,
    explanation: "Для связывания: (1) Получить email через OAuth, (2) Проверить существует ли пользователь с таким email, (3) Если да — связать OAuth аккаунт с существующим (после подтверждения), (4) Если нет — создать новый аккаунт.",
    topic: "Практические сценарии"
  },

  // Тема 10: Отладка и troubleshooting
  {
    id: 46,
    question: "Что означает ошибка 'invalid_grant' при обмене кода на токен?",
    options: [
      "Неверный client_secret",
      "Authorization code истек или уже использован",
      "Пользователь отменил авторизацию",
      "Сервер недоступен"
    ],
    correctAnswer: 1,
    explanation: "Ошибка 'invalid_grant' обычно означает, что authorization code истек (обычно живет 1-10 минут), уже был использован, или был выдан для другого client_id.",
    topic: "Отладка"
  },
  {
    id: 47,
    question: "Как отладить OAuth flow?",
    options: [
      "Использовать console.log",
      "Проверить Network tab в DevTools, логировать запросы/ответы, использовать OAuth playground",
      "Перезапустить сервер",
      "Очистить кеш браузера"
    ],
    correctAnswer: 1,
    explanation: "Для отладки OAuth: (1) Проверить Network tab в DevTools (перенаправления, параметры), (2) Логировать все запросы/ответы на backend, (3) Использовать OAuth Playground для тестирования, (4) Проверить правильность настроек в консоли провайдера.",
    topic: "Отладка"
  },
  {
    id: 48,
    question: "Что делать, если redirect_uri mismatch error?",
    options: [
      "Изменить URL приложения",
      "Проверить, что redirect_uri точно совпадает с зарегистрированным в OAuth клиенте",
      "Удалить redirect_uri параметр",
      "Использовать другой flow"
    ],
    correctAnswer: 1,
    explanation: "Ошибка redirect_uri mismatch означает, что redirect_uri в запросе не совпадает с зарегистрированным. Проверьте точное совпадение включая протокол (http/https), порт, путь. Зарегистрируйте правильный URI в консоли провайдера.",
    topic: "Отладка"
  },
  {
    id: 49,
    question: "Как тестировать OAuth локально?",
    options: [
      "Только в production",
      "Использовать localhost как redirect_uri (поддерживается многими провайдерами)",
      "OAuth нельзя тестировать локально",
      "Только через VPN"
    ],
    correctAnswer: 1,
    explanation: "Многие OAuth провайдеры (Google, GitHub) разрешают использовать http://localhost:PORT как redirect_uri для разработки. Зарегистрируйте его в консоли провайдера для тестирования локально.",
    topic: "Отладка"
  },
  {
    id: 50,
    question: "Что проверить первым при проблемах с OAuth?",
    options: [
      "Версию браузера",
      "Правильность client_id, client_secret, redirect_uri, scopes",
      "Скорость интернета",
      "Версию операционной системы"
    ],
    correctAnswer: 1,
    explanation: "Первым делом проверьте основные параметры: правильность client_id, client_secret (для confidential clients), точное совпадение redirect_uri, корректность запрашиваемых scopes, и что клиент активен в консоли провайдера.",
    topic: "Отладка"
  }
]
