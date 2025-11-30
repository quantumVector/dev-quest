<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-http.js'
import 'prismjs/components/prism-javascript.js'

const httpBasicsSnippet = `
// HTTP - HyperText Transfer Protocol
// Протокол прикладного уровня для передачи гипертекста

// Простой HTTP запрос (концептуально)
GET /api/users HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: application/json

// HTTP ответ
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 82

{"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]}
`

const httpMethodsSnippet = `
// =====================================
// ОСНОВНЫЕ HTTP МЕТОДЫ
// =====================================

// 1. GET - получение данных
// Безопасный, идемпотентный, кэшируемый
GET /api/users/123 HTTP/1.1
Host: api.example.com

// JavaScript fetch
fetch('https://api.example.com/users/123')
  .then(response => response.json())
  .then(data => console.log(data))

// 2. POST - создание нового ресурса
// НЕ идемпотентный, НЕ кэшируемый
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name": "John Doe", "email": "john@example.com"}

// JavaScript fetch
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})

// 3. PUT - полное обновление ресурса
// Идемпотентный, НЕ кэшируемый
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"id": 123, "name": "John Smith", "email": "john.smith@example.com"}

// JavaScript fetch
fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    id: 123,
    name: 'John Smith',
    email: 'john.smith@example.com'
  })
})

// 4. PATCH - частичное обновление ресурса
// НЕ идемпотентный, НЕ кэшируемый
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"email": "newemail@example.com"}

// JavaScript fetch
fetch('https://api.example.com/users/123', {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'newemail@example.com'})
})

// 5. DELETE - удаление ресурса
// Идемпотентный, НЕ кэшируемый
DELETE /api/users/123 HTTP/1.1
Host: api.example.com

// JavaScript fetch
fetch('https://api.example.com/users/123', {
  method: 'DELETE'
})

// 6. HEAD - метаданные без тела ответа
// Используется для проверки существования ресурса
HEAD /api/users/123 HTTP/1.1
Host: api.example.com

// JavaScript fetch
fetch('https://api.example.com/users/123', {
  method: 'HEAD'
}).then(response => {
  console.log('Exists:', response.ok)
  console.log('Content-Type:', response.headers.get('Content-Type'))
})

// 7. OPTIONS - доступные методы для ресурса
// Используется в CORS preflight запросах
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com

// Ответ:
HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Origin: https://myapp.com
`

const httpHeadersSnippet = `
// =====================================
// HTTP ЗАГОЛОВКИ (HEADERS)
// =====================================

// ЗАГОЛОВКИ ЗАПРОСА (Request Headers)

// 1. Общие заголовки
Host: api.example.com              // Обязательный в HTTP/1.1
User-Agent: Mozilla/5.0...         // Информация о клиенте
Accept: application/json           // Ожидаемый формат ответа
Accept-Language: en-US,ru;q=0.9    // Предпочитаемый язык
Accept-Encoding: gzip, deflate, br // Поддерживаемые сжатия

// 2. Авторизация
Authorization: Bearer eyJhbGci...  // JWT токен
Authorization: Basic dXNlcjpwYXNz // Basic auth (base64)
Cookie: session_id=abc123          // Куки сессии

// 3. Контент
Content-Type: application/json     // Тип отправляемых данных
Content-Length: 348                // Размер тела в байтах
Content-Encoding: gzip             // Сжатие контента

// 4. Кэширование
Cache-Control: no-cache            // Не использовать кэш
If-None-Match: "686897696a7c..."  // ETag для условного запроса
If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT

// 5. CORS
Origin: https://myapp.com          // Источник запроса
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

// 6. Дополнительные
Referer: https://previous-page.com // Откуда пришел пользователь
X-Requested-With: XMLHttpRequest   // AJAX запрос
X-Forwarded-For: 203.0.113.195    // Реальный IP клиента

// ЗАГОЛОВКИ ОТВЕТА (Response Headers)

// 1. Контент
Content-Type: application/json; charset=utf-8
Content-Length: 1234
Content-Encoding: gzip
Content-Language: en

// 2. Кэширование
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Expires: Wed, 21 Oct 2024 07:28:00 GMT
Last-Modified: Wed, 21 Oct 2024 06:00:00 GMT

// 3. CORS
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400

// 4. Безопасность
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'

// 5. Куки
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

// 6. Перенаправления
Location: https://example.com/new-location

// Пример в JavaScript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token',
    'Accept': 'application/json',
    'Accept-Language': 'ru-RU',
    'X-Custom-Header': 'custom-value'
  },
  body: JSON.stringify({name: 'John'})
}).then(response => {
  // Чтение заголовков ответа
  console.log('Content-Type:', response.headers.get('Content-Type'))
  console.log('Cache-Control:', response.headers.get('Cache-Control'))
  console.log('All headers:', [...response.headers.entries()])
})
`

const statusCodesSnippet = `
// =====================================
// HTTP STATUS CODES (Коды состояния)
// =====================================

// 1xx - Информационные
100 Continue              // Продолжайте отправку
101 Switching Protocols   // Переключение протоколов (WebSocket)
103 Early Hints           // Ранние подсказки для предзагрузки

// 2xx - Успешные
200 OK                    // Успешный запрос
201 Created               // Ресурс создан (POST)
202 Accepted              // Принято в обработку (асинхронно)
204 No Content            // Успешно, но нет контента (DELETE)
206 Partial Content       // Частичный контент (Range запросы)

// 3xx - Перенаправления
301 Moved Permanently     // Постоянное перенаправление
302 Found                 // Временное перенаправление
304 Not Modified          // Не изменено (кэш валиден)
307 Temporary Redirect    // Временное перенаправление (метод сохраняется)
308 Permanent Redirect    // Постоянное перенаправление (метод сохраняется)

// 4xx - Ошибки клиента
400 Bad Request           // Неверный синтаксис запроса
401 Unauthorized          // Требуется аутентификация
403 Forbidden             // Доступ запрещен
404 Not Found             // Ресурс не найден
405 Method Not Allowed    // Метод не поддерживается
408 Request Timeout       // Таймаут запроса
409 Conflict              // Конфликт (например, версий)
410 Gone                  // Ресурс удален навсегда
413 Payload Too Large     // Слишком большое тело запроса
415 Unsupported Media Type // Неподдерживаемый тип контента
422 Unprocessable Entity  // Невалидные данные
429 Too Many Requests     // Слишком много запросов (rate limit)

// 5xx - Ошибки сервера
500 Internal Server Error // Внутренняя ошибка сервера
501 Not Implemented       // Метод не реализован
502 Bad Gateway           // Ошибка шлюза (proxy)
503 Service Unavailable   // Сервис недоступен
504 Gateway Timeout       // Таймаут шлюза
507 Insufficient Storage  // Недостаточно места

// Обработка в JavaScript
fetch('https://api.example.com/users')
  .then(response => {
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('OK:', response.ok) // true для 200-299

    if (response.status === 200) {
      return response.json()
    } else if (response.status === 404) {
      throw new Error('User not found')
    } else if (response.status === 401) {
      // Перенаправление на логин
      window.location.href = '/login'
    } else if (response.status >= 500) {
      throw new Error('Server error')
    }
  })
  .catch(error => console.error('Error:', error))

// Правильная обработка всех кодов
async function makeRequest(url) {
  try {
    const response = await fetch(url)

    // 2xx - успех
    if (response.ok) {
      return await response.json()
    }

    // 4xx - ошибки клиента
    if (response.status >= 400 && response.status < 500) {
      const error = await response.json()
      throw new Error(error.message || 'Client error')
    }

    // 5xx - ошибки сервера
    if (response.status >= 500) {
      throw new Error('Server error, please try again later')
    }

    // 3xx обычно обрабатываются браузером автоматически
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}
`

const redirectsSnippet = `
// =====================================
// HTTP REDIRECTS (Перенаправления)
// =====================================

// 301 - Permanent Redirect (Постоянное)
// SEO: поисковики обновят индекс
// Браузеры кэшируют перенаправление
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-page

// Пример: смена домена
http://old-domain.com → https://new-domain.com (301)

// 302 - Temporary Redirect (Временное)
// SEO: поисковики сохраняют старый URL
// Не кэшируется агрессивно
HTTP/1.1 302 Found
Location: https://example.com/temporary-page

// Пример: временная страница обслуживания
https://example.com → https://example.com/maintenance (302)

// 303 - See Other
// Меняет метод на GET (после POST)
HTTP/1.1 303 See Other
Location: https://example.com/success

// Пример: Post-Redirect-Get паттерн
POST /form → 303 → GET /success

// 307 - Temporary Redirect (сохраняет метод)
// Гарантирует, что метод не изменится
HTTP/1.1 307 Temporary Redirect
Location: https://example.com/new-endpoint

// Пример: временное изменение API endpoint
POST /api/v1/users → 307 → POST /api/v2/users

// 308 - Permanent Redirect (сохраняет метод)
// Постоянное перенаправление с сохранением метода
HTTP/1.1 308 Permanent Redirect
Location: https://example.com/new-endpoint

// Пример: постоянное изменение API endpoint
POST /api/old → 308 → POST /api/new

// JavaScript обработка редиректов
fetch('https://example.com/old-page', {
  redirect: 'follow' // по умолчанию - следовать редиректам
  // redirect: 'error' // выбросить ошибку при редиректе
  // redirect: 'manual' // вручную обрабатывать редиректы
}).then(response => {
  console.log('Final URL:', response.url)
  console.log('Redirected:', response.redirected)
  console.log('Type:', response.type)
})

// Ручная обработка редиректов
async function fetchWithRedirectInfo(url) {
  const response = await fetch(url, {redirect: 'manual'})

  if (response.type === 'opaqueredirect') {
    console.log('Redirect detected')
    const location = response.headers.get('Location')
    console.log('Redirect to:', location)
    // Ручное перенаправление
    return fetch(location)
  }

  return response
}

// Server-side редиректы (Node.js/Express)
// 301 - Постоянный редирект
app.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page')
})

// 302 - Временный редирект
app.get('/temporary', (req, res) => {
  res.redirect(302, '/maintenance')
})

// Post-Redirect-Get паттерн
app.post('/form', (req, res) => {
  // Обработка формы
  processForm(req.body)
  // Редирект на success page (303 или 302)
  res.redirect(303, '/success')
})
`

const httpsSnippet = `
// =====================================
// HTTPS - HTTP Secure
// =====================================

// HTTP - незащищенное соединение
┌─────────┐                           ┌─────────┐
│ Browser │──── Plain Text (HTTP) ────│ Server  │
└─────────┘      Видно всем!          └─────────┘
    ↑                                       ↑
    └───────── Перехват данных ─────────────┘
           (Man-in-the-Middle Attack)

// HTTPS - защищенное соединение
┌─────────┐                           ┌─────────┐
│ Browser │──── Encrypted (HTTPS) ────│ Server  │
└─────────┘      TLS/SSL шифрование   └─────────┘
                 Защищено! 🔒

// Основные отличия HTTP vs HTTPS

// 1. Порты
HTTP:  порт 80
HTTPS: порт 443

// 2. URL схемы
http://example.com   // Незащищенный
https://example.com  // Защищенный

// 3. Безопасность
HTTP:  Нет шифрования, данные в открытом виде
HTTPS: TLS/SSL шифрование, защита от перехвата

// 4. Сертификаты
HTTP:  Не требуются
HTTPS: Требуется SSL/TLS сертификат

// 5. Производительность
HTTP:  Быстрее (нет шифрования)
HTTPS: Чуть медленнее (overhead шифрования)
       Но HTTP/2 + HTTPS часто быстрее HTTP/1.1

// 6. SEO
HTTP:  Поисковики понижают в рейтинге
HTTPS: Поисковики повышают в рейтинге

// Процесс HTTPS соединения (TLS Handshake)

// 1. Client Hello
Client → Server: "Я хочу HTTPS, вот мои алгоритмы шифрования"

// 2. Server Hello + Certificate
Server → Client: "Вот мой сертификат и выбранный алгоритм"

// 3. Certificate Verification
Client: Проверяет сертификат через Certificate Authority (CA)

// 4. Key Exchange
Client → Server: Генерация общего секретного ключа

// 5. Encrypted Communication
Client ↔ Server: Обмен данными с шифрованием

// Проверка HTTPS в JavaScript
const url = new URL('https://example.com')
console.log('Protocol:', url.protocol) // "https:"
console.log('Is Secure:', url.protocol === 'https:')

// Проверка Mixed Content
if (window.location.protocol === 'https:') {
  console.log('Page is secure')

  // ❌ ПЛОХО - Mixed Content
  // const img = '<img src="http://example.com/image.jpg">'

  // ✅ ХОРОШО - Все ресурсы через HTTPS
  const img = '<img src="https://example.com/image.jpg">'
}

// Принудительное использование HTTPS
// 1. HSTS заголовок (сервер)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// 2. Редирект с HTTP на HTTPS
// Server-side (Node.js/Express)
app.use((req, res, next) => {
  if (req.protocol !== 'https') {
    return res.redirect(301, 'https://' + req.headers.host + req.url)
  }
  next()
})

// 3. Content Security Policy
Content-Security-Policy: upgrade-insecure-requests

// Проблемы Mixed Content
// HTTPS страница загружает HTTP ресурс = БЛОКИРОВКА

// ❌ Заблокируется браузером
<script src="http://example.com/script.js"><\/script>
<iframe src="http://example.com/frame.html"></iframe>

// ⚠️ Предупреждение в консоли
<img src="http://example.com/image.jpg">

// ✅ Правильно - все через HTTPS
<script src="https://example.com/script.js"><\/script>
<img src="https://example.com/image.jpg">

// Проверка сертификата в fetch
fetch('https://example.com', {
// credentials: 'include' // отправка cookies через HTTPS
}).then(response => {
// Проверка безопасности соединения
if (response.url.startsWith('https://')) {
console.log('Secure connection')
}
})

// Типы SSL/TLS сертификатов
// 1. Domain Validation (DV) - базовая проверка домена
// 2. Organization Validation (OV) - проверка организации
// 3. Extended Validation (EV) - расширенная проверка (зеленая адресная строка)

// Let's Encrypt - бесплатные SSL сертификаты
// Автоматическое обновление, поддержка всех браузеров
`

const corsSnippet = `
// =====================================
// CORS - Cross-Origin Resource Sharing
// =====================================

// Проблема Same-Origin Policy
// Браузер блокирует запросы между разными источниками

// Origin = protocol + domain + port
https://example.com:443  ← Origin 1
https://api.example.com  ← Origin 2 (другой поддомен)
http://example.com       ← Origin 3 (другой протокол)
https://example.com:8080 ← Origin 4 (другой порт)

// Простой CORS запрос (Simple Request)
// GET, HEAD, POST с простыми заголовками
fetch('https://api.example.com/data', {
method: 'GET',
headers: {
'Accept': 'application/json' // Простой заголовок
}
})

// Server ДОЛЖЕН ответить с заголовками CORS
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true

// Preflight запрос (OPTIONS)
// Для сложных запросов: PUT, DELETE, кастомные заголовки

// 1. Browser отправляет OPTIONS (preflight)
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 2. Server отвечает разрешениями
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400  // Кэш preflight на 24 часа

// 3. Browser отправляет основной запрос
POST /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Content-Type: application/json
Authorization: Bearer token

// Server-side CORS (Node.js/Express)
const cors = require('cors')

// Разрешить все источники (НЕ для production!)
app.use(cors())

// Настроенный CORS
app.use(cors({
origin: 'https://myapp.com', // Конкретный источник
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization'],
credentials: true, // Разрешить cookies
maxAge: 86400 // Кэш preflight
}))

// Динамический CORS
app.use(cors({
origin: function (origin, callback) {
const allowedOrigins = [
'https://app1.com',
'https://app2.com'
]
if (allowedOrigins.includes(origin) || !origin) {
callback(null, true)
} else {
callback(new Error('Not allowed by CORS'))
}
}
}))

// Обработка CORS ошибок в JavaScript
fetch('https://api.example.com/data')
.then(response => response.json())
.catch(error => {
if (error.message.includes('CORS')) {
console.error('CORS error - server not allowing origin')
}
})
`

const highlightedHttpBasics = ref('')
const highlightedHttpMethods = ref('')
const highlightedHttpHeaders = ref('')
const highlightedStatusCodes = ref('')
const highlightedRedirects = ref('')
const highlightedHttps = ref('')
const highlightedCors = ref('')

onMounted(() => {
highlightedHttpBasics.value = Prism.highlight(httpBasicsSnippet, Prism.languages.http, 'http')
highlightedHttpMethods.value = Prism.highlight(httpMethodsSnippet, Prism.languages.javascript, 'javascript')
highlightedHttpHeaders.value = Prism.highlight(httpHeadersSnippet, Prism.languages.javascript, 'javascript')
highlightedStatusCodes.value = Prism.highlight(statusCodesSnippet, Prism.languages.javascript, 'javascript')
highlightedRedirects.value = Prism.highlight(redirectsSnippet, Prism.languages.javascript, 'javascript')
highlightedHttps.value = Prism.highlight(httpsSnippet, Prism.languages.javascript, 'javascript')
highlightedCors.value = Prism.highlight(corsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              HTTP Protocol: Полное руководство для веб-разработчика
            </h1>

            <p class="font-weight-regular mb-6">
              <b>HTTP (HyperText Transfer Protocol)</b> — это протокол прикладного уровня для передачи
              гипертекстовых документов. Он является основой обмена данными в Web и работает по модели
              клиент-сервер: клиент отправляет запрос, сервер возвращает ответ.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы HTTP протокола</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-swap-horizontal</v-icon>
                    <h3 class="text-h6 font-weight-bold">Клиент-Сервер</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Запрос-ответ:</strong> синхронная модель</li>
                    <li><strong>Stateless:</strong> без состояния между запросами</li>
                    <li><strong>Текстовый протокол:</strong> человекочитаемый</li>
                    <li><strong>Порт по умолчанию:</strong> 80 (HTTP), 443 (HTTPS)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-layers-triple</v-icon>
                    <h3 class="text-h6 font-weight-bold">Структура</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Стартовая строка:</strong> метод, URL, версия</li>
                    <li><strong>Заголовки:</strong> метаданные запроса/ответа</li>
                    <li><strong>Пустая строка:</strong> разделитель</li>
                    <li><strong>Тело (опционально):</strong> данные</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHttpBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">HTTP Методы (HTTP Methods)</h2>
            <p class="font-weight-regular mb-4">
              HTTP методы определяют действие, которое клиент хочет выполнить с ресурсом на сервере.
              Основные методы следуют принципам REST API.
            </p>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Идемпотентный</th>
                <th class="text-left font-weight-bold">Безопасный</th>
                <th class="text-left font-weight-bold">Кэшируемый</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>GET</b></td>
                <td>Получить ресурс</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>POST</b></td>
                <td>Создать ресурс</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-warning">⚠️ Редко</td>
              </tr>
              <tr>
                <td><b>PUT</b></td>
                <td>Обновить полностью</td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>PATCH</b></td>
                <td>Обновить частично</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>DELETE</b></td>
                <td>Удалить ресурс</td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>HEAD</b></td>
                <td>Получить заголовки</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>OPTIONS</b></td>
                <td>Узнать методы</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHttpMethods"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">HTTP Заголовки (Headers)</h2>
            <p class="font-weight-regular mb-4">
              Заголовки HTTP передают дополнительную информацию о запросе или ответе: тип контента,
              авторизацию, кэширование, CORS, безопасность и многое другое.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-upload</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Request Headers</h3>
                  <ul class="text-left pl-4">
                    <li>Host, User-Agent</li>
                    <li>Accept, Accept-Language</li>
                    <li>Authorization, Cookie</li>
                    <li>Content-Type, Content-Length</li>
                    <li>Cache-Control, If-None-Match</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-download</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Response Headers</h3>
                  <ul class="text-left pl-4">
                    <li>Content-Type, Content-Length</li>
                    <li>Cache-Control, ETag</li>
                    <li>Set-Cookie</li>
                    <li>Access-Control-Allow-*</li>
                    <li>Location (redirects)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-shield-lock</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Security Headers</h3>
                  <ul class="text-left pl-4">
                    <li>Strict-Transport-Security</li>
                    <li>X-Content-Type-Options</li>
                    <li>X-Frame-Options</li>
                    <li>Content-Security-Policy</li>
                    <li>X-XSS-Protection</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHttpHeaders"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">HTTP Статус-коды (Status Codes)</h2>
            <p class="font-weight-regular mb-4">
              Статус-коды HTTP указывают результат выполнения запроса. Они делятся на 5 категорий по первой цифре.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-info">1xx - Информационные</h3>
                  <ul class="pl-4">
                    <li>100 Continue</li>
                    <li>101 Switching Protocols</li>
                    <li>103 Early Hints</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">2xx - Успешные</h3>
                  <ul class="pl-4">
                    <li>200 OK</li>
                    <li>201 Created</li>
                    <li>204 No Content</li>
                    <li>206 Partial Content</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-primary">3xx - Перенаправления</h3>
                  <ul class="pl-4">
                    <li>301 Moved Permanently</li>
                    <li>302 Found</li>
                    <li>304 Not Modified</li>
                    <li>307/308 Redirect</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">4xx - Ошибки клиента</h3>
                  <ul class="pl-4">
                    <li>400 Bad Request</li>
                    <li>401 Unauthorized</li>
                    <li>403 Forbidden</li>
                    <li>404 Not Found</li>
                    <li>405 Method Not Allowed</li>
                    <li>429 Too Many Requests</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-error">5xx - Ошибки сервера</h3>
                  <ul class="pl-4">
                    <li>500 Internal Server Error</li>
                    <li>501 Not Implemented</li>
                    <li>502 Bad Gateway</li>
                    <li>503 Service Unavailable</li>
                    <li>504 Gateway Timeout</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStatusCodes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">HTTP Перенаправления (Redirects)</h2>
            <p class="font-weight-regular mb-4">
              Перенаправления позволяют серверу сообщить клиенту, что ресурс находится по другому URL.
              Разные коды перенаправления имеют разное поведение.
            </p>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Код</th>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Сохраняет метод</th>
                <th class="text-left font-weight-bold">Кэширование</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>301</b></td>
                <td>Постоянный</td>
                <td class="text-error">❌ Нет (→GET)</td>
                <td class="text-success">✅ Да</td>
                <td>Смена URL навсегда</td>
              </tr>
              <tr>
                <td><b>302</b></td>
                <td>Временный</td>
                <td class="text-error">❌ Нет (→GET)</td>
                <td class="text-error">❌ Нет</td>
                <td>Временное перемещение</td>
              </tr>
              <tr>
                <td><b>303</b></td>
                <td>See Other</td>
                <td class="text-error">❌ Нет (→GET)</td>
                <td class="text-error">❌ Нет</td>
                <td>Post-Redirect-Get</td>
              </tr>
              <tr>
                <td><b>307</b></td>
                <td>Временный</td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
                <td>Временно, метод важен</td>
              </tr>
              <tr>
                <td><b>308</b></td>
                <td>Постоянный</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
                <td>Постоянно, метод важен</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRedirects"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">HTTPS — Защищенное соединение</h2>
            <p class="font-weight-regular mb-4">
              <b>HTTPS (HTTP Secure)</b> — это HTTP с шифрованием через TLS/SSL. Это стандарт безопасности
              для современного веба, обеспечивающий конфиденциальность, целостность и аутентификацию.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ HTTP (незащищенный)</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Порт:</strong> 80</li>
                    <li><strong>Шифрование:</strong> Нет</li>
                    <li><strong>Данные:</strong> В открытом виде</li>
                    <li><strong>Сертификат:</strong> Не нужен</li>
                    <li><strong>SEO:</strong> Понижение рейтинга</li>
                    <li><strong>Безопасность:</strong> Уязвим к атакам</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ HTTPS (защищенный)</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Порт:</strong> 443</li>
                    <li><strong>Шифрование:</strong> TLS/SSL</li>
                    <li><strong>Данные:</strong> Зашифрованы</li>
                    <li><strong>Сертификат:</strong> Обязателен</li>
                    <li><strong>SEO:</strong> Повышение рейтинга</li>
                    <li><strong>Безопасность:</strong> Защита от MITM</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHttps"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CORS — Cross-Origin Resource Sharing</h2>
            <p class="font-weight-regular mb-4">
              CORS решает проблему Same-Origin Policy, позволяя серверу разрешить запросы с других доменов.
              Это критически важно для работы современных веб-приложений с API.
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCors"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между GET и POST?</p>
                <p class="font-weight-regular ma-0">
                  GET получает данные (идемпотентный, безопасный, кэшируемый, параметры в URL).
                  POST создает ресурсы (НЕ идемпотентный, НЕ безопасный, данные в теле запроса).
                  GET для чтения, POST для изменения состояния сервера.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что означает идемпотентность HTTP методов?</p>
                <p class="font-weight-regular ma-0">
                  Идемпотентность означает, что повторное выполнение одного и того же запроса дает
                  одинаковый результат. GET, PUT, DELETE идемпотентны. POST и PATCH — нет.
                  Идемпотентность важна для безопасности повторных запросов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между PUT и PATCH?</p>
                <p class="font-weight-regular ma-0">
                  PUT заменяет ресурс полностью (нужны все поля). PATCH обновляет частично (только
                  измененные поля). PUT идемпотентен, PATCH обычно нет. PUT для полного обновления,
                  PATCH для частичного.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое preflight запрос в CORS?</p>
                <p class="font-weight-regular ma-0">
                  Preflight — это OPTIONS запрос перед основным запросом. Браузер спрашивает сервер:
                  "Можно ли выполнить этот запрос?". Сервер отвечает разрешенными методами и заголовками.
                  Нужен для сложных запросов (PUT, DELETE, кастомные заголовки).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между 301 и 302 редиректами?</p>
                <p class="font-weight-regular ma-0">
                  301 — постоянное перенаправление (браузеры кэшируют, SEO обновляет индекс).
                  302 — временное перенаправление (не кэшируется агрессивно, SEO сохраняет старый URL).
                  301 для смены домена/URL навсегда, 302 для временных изменений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему HTTPS важнее HTTP?</p>
                <p class="font-weight-regular ma-0">
                  HTTPS шифрует данные (защита от перехвата), аутентифицирует сервер (защита от подмены),
                  обеспечивает целостность (защита от изменения). Обязателен для: паролей, платежей,
                  личных данных. Поисковики повышают HTTPS в рейтинге. Современные браузеры требуют HTTPS
                  для многих API.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое статус 304 Not Modified?</p>
                <p class="font-weight-regular ma-0">
                  304 означает, что ресурс не изменился с момента последнего запроса. Используется для
                  условных запросов с заголовками If-None-Match (ETag) или If-Modified-Since. Браузер
                  использует закэшированную версию. Экономит трафик и ускоряет загрузку.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">HTTP версии</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Версия</th>
                <th class="text-left font-weight-bold">Год</th>
                <th class="text-left font-weight-bold">Особенности</th>
                <th class="text-left font-weight-bold">Состояние</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>HTTP/0.9</b></td>
                <td>1991</td>
                <td>Только GET, HTML</td>
                <td class="text-error">Устарел</td>
              </tr>
              <tr>
                <td><b>HTTP/1.0</b></td>
                <td>1996</td>
                <td>Заголовки, методы, коды</td>
                <td class="text-error">Устарел</td>
              </tr>
              <tr>
                <td><b>HTTP/1.1</b></td>
                <td>1997</td>
                <td>Keep-Alive, chunked, cache</td>
                <td class="text-warning">Используется</td>
              </tr>
              <tr>
                <td><b>HTTP/2</b></td>
                <td>2015</td>
                <td>Multiplexing, binary, HPACK</td>
                <td class="text-success">Рекомендуется</td>
              </tr>
              <tr>
                <td><b>HTTP/3</b></td>
                <td>2022</td>
                <td>QUIC (UDP), 0-RTT</td>
                <td class="text-info">Современный</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте HTTPS везде</li>
                    <li>Правильные HTTP методы (REST)</li>
                    <li>Осмысленные статус-коды</li>
                    <li>Настройте CORS корректно</li>
                    <li>Используйте кэширование</li>
                    <li>Добавьте Security Headers</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>HTTP для чувствительных данных</li>
                    <li>GET для изменения данных</li>
                    <li>Игнорирование статус-кодов</li>
                    <li>Access-Control-Allow-Origin: *</li>
                    <li>Большие данные в URL</li>
                    <li>Mixed Content (HTTP + HTTPS)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте HTTP/2 или HTTP/3</li>
                    <li>Настройте HSTS</li>
                    <li>Мониторьте статус-коды</li>
                    <li>Логируйте запросы</li>
                    <li>Тестируйте CORS</li>
                    <li>Изучите DevTools Network</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>HTTP</b> — основа веб-коммуникации. Понимание методов (GET, POST, PUT, DELETE),
              заголовков (Content-Type, Authorization, CORS), статус-кодов (200, 404, 500),
              перенаправлений (301, 302, 307) и разницы между HTTP/HTTPS критически важно для
              веб-разработчика. HTTPS обязателен для безопасности. CORS решает проблему
              межсайтовых запросов. HTTP/2 и HTTP/3 улучшают производительность.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP"
                target="_blank"
                class="mr-2">
                MDN HTTP
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://httpstatuses.com/"
                target="_blank">
                HTTP Status Codes
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
