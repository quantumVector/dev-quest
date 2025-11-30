<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-http.js'

const whatIsCorsSnippet = `
// ❌ Без CORS - браузер блокирует запрос
// Сайт https://myapp.com пытается сделать запрос на https://api.example.com

fetch('https://api.example.com/users')
  .then(response => response.json())
  .catch(error => {
    // CORS error: No 'Access-Control-Allow-Origin' header
    console.error('Blocked by CORS:', error)
  })

// Браузер блокирует, потому что:
// - Разные домены: myapp.com ≠ api.example.com
// - Нет разрешающих CORS заголовков от сервера
// - Политика Same-Origin Policy (SOP) защищает пользователя
`

const sameOriginPolicySnippet = `
// Same-Origin Policy (SOP) - базовая политика безопасности браузера

// Origin состоит из трех частей:
// 1. Протокол (scheme)
// 2. Домен (host)
// 3. Порт (port)

// Примеры ОДИНАКОВОГО origin:
const origin1 = 'https://example.com:443'
const origin2 = 'https://example.com/path'
const origin3 = 'https://example.com/another/path'
// Все три - ОДИНАКОВЫЙ origin (протокол + домен + порт)

// Примеры РАЗНЫХ origins (Cross-Origin):
const different1 = 'http://example.com'     // ❌ Другой протокол
const different2 = 'https://api.example.com' // ❌ Другой поддомен
const different3 = 'https://example.com:8080' // ❌ Другой порт
const different4 = 'https://example.org'     // ❌ Другой домен

// SOP блокирует:
// - Чтение данных из другого origin
// - Доступ к DOM другого origin
// - Отправку cookies другому origin (по умолчанию)
`

const howCorsWorksSnippet = `
// Механизм CORS - как браузер проверяет разрешения

// Шаг 1: Браузер определяет, что запрос cross-origin
const response = await fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Шаг 2: Браузер отправляет запрос с заголовком Origin
// Request Headers:
// Origin: https://myapp.com
// (браузер автоматически добавляет этот заголовок)

// Шаг 3: Сервер проверяет Origin и отвечает с CORS заголовками
// Response Headers:
// Access-Control-Allow-Origin: https://myapp.com
// Access-Control-Allow-Credentials: true

// Шаг 4: Браузер проверяет ответ
// ✅ Если Access-Control-Allow-Origin совпадает - разрешает доступ
// ❌ Если нет - блокирует и выдает ошибку CORS
`

const corsHeadersSnippet = `
// Основные CORS заголовки

// 1. Access-Control-Allow-Origin - какие origins могут делать запросы
// Конкретный origin
'Access-Control-Allow-Origin': 'https://myapp.com'

// Любой origin (⚠️ небезопасно для приватных данных)
'Access-Control-Allow-Origin': '*'

// 2. Access-Control-Allow-Methods - разрешенные HTTP методы
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

// 3. Access-Control-Allow-Headers - разрешенные кастомные заголовки
'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Custom-Header'

// 4. Access-Control-Allow-Credentials - разрешить отправку cookies
'Access-Control-Allow-Credentials': 'true'
// ⚠️ При использовании credentials нельзя использовать '*' в Allow-Origin!

// 5. Access-Control-Max-Age - время кэширования preflight ответа
'Access-Control-Max-Age': '86400' // 24 часа в секундах

// 6. Access-Control-Expose-Headers - какие заголовки ответа доступны JS
'Access-Control-Expose-Headers': 'X-Custom-Response-Header, X-Total-Count'
`

const simpleRequestSnippet = `
// ПРОСТЫЕ ЗАПРОСЫ (Simple Requests) - без preflight

// Условия для простого запроса:
// 1. Методы: GET, HEAD, POST
// 2. Только безопасные заголовки:
//    - Accept
//    - Accept-Language
//    - Content-Language
//    - Content-Type (только определенные значения)
// 3. Content-Type только:
//    - application/x-www-form-urlencoded
//    - multipart/form-data
//    - text/plain

// Пример простого запроса:
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})

// Браузер отправляет запрос СРАЗУ:
// GET /users HTTP/1.1
// Host: api.example.com
// Origin: https://myapp.com
// Accept: application/json

// Сервер отвечает:
// HTTP/1.1 200 OK
// Access-Control-Allow-Origin: https://myapp.com
// Content-Type: application/json
// ...data...
`

const preflightRequestSnippet = `
// PREFLIGHT ЗАПРОСЫ - с предварительной проверкой

// Preflight нужен когда:
// 1. Методы: PUT, DELETE, PATCH, или любые кроме GET/HEAD/POST
// 2. Кастомные заголовки (Authorization, X-Custom-Header)
// 3. Content-Type: application/json (не в списке простых)

// Пример запроса, требующего preflight:
fetch('https://api.example.com/users', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer token123',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id: 1 })
})

// ШАГ 1: Браузер отправляет OPTIONS запрос (preflight)
// OPTIONS /users HTTP/1.1
// Host: api.example.com
// Origin: https://myapp.com
// Access-Control-Request-Method: DELETE
// Access-Control-Request-Headers: authorization, content-type

// ШАГ 2: Сервер отвечает на preflight
// HTTP/1.1 204 No Content
// Access-Control-Allow-Origin: https://myapp.com
// Access-Control-Allow-Methods: DELETE, GET, POST, PUT
// Access-Control-Allow-Headers: authorization, content-type
// Access-Control-Max-Age: 86400

// ШАГ 3: Если preflight успешен, браузер отправляет основной запрос
// DELETE /users HTTP/1.1
// Host: api.example.com
// Origin: https://myapp.com
// Authorization: Bearer token123
// Content-Type: application/json
// {"id": 1}
`

const serverExampleNodeSnippet = `
// Настройка CORS на сервере (Node.js + Express)

const express = require('express')
const cors = require('cors')
const app = express()

// 1. Простая настройка - разрешить все origins
app.use(cors())

// 2. Настройка для конкретного origin
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true
}))

// 3. Множественные origins
const allowedOrigins = [
  'https://myapp.com',
  'https://admin.myapp.com',
  'http://localhost:3000'
]

app.use(cors({
  origin: function(origin, callback) {
    // Разрешить запросы без origin (мобильные приложения, Postman)
    if (!origin) return callback(null, true)

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false)
    }
    return callback(null, true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Number'],
  maxAge: 86400 // 24 часа
}))

// 4. Ручная настройка для специфичных роутов
app.options('/api/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://myapp.com')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Max-Age', '86400')
  res.sendStatus(204)
})

app.get('/api/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://myapp.com')
  res.json({ users: [] })
})
`

const credentialsExampleSnippet = `
// Работа с credentials (cookies, HTTP auth)

// Клиент (браузер):
fetch('https://api.example.com/profile', {
  method: 'GET',
  credentials: 'include', // ⚠️ Отправляет cookies!
  headers: {
    'Content-Type': 'application/json'
  }
})

// Сервер ДОЛЖЕН ответить:
// Access-Control-Allow-Origin: https://myapp.com (НЕ '*'!)
// Access-Control-Allow-Credentials: true

// ❌ НЕПРАВИЛЬНО - не работает с credentials:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Credentials: true
// Браузер заблокирует!

// ✅ ПРАВИЛЬНО:
// Access-Control-Allow-Origin: https://myapp.com
// Access-Control-Allow-Credentials: true

// Режимы credentials в fetch:
// 'omit' - никогда не отправлять (по умолчанию для cross-origin)
// 'same-origin' - только для same-origin запросов
// 'include' - всегда отправлять
`

const securityIssuesSnippet = `
// Проблемы безопасности при неправильной настройке CORS

// ❌ ОПАСНО: Разрешить все origins с credentials
app.use(cors({
  origin: '*',
  credentials: true
}))
// Проблема: Любой сайт может читать приватные данные пользователя!

// ❌ ОПАСНО: Отражение Origin без проверки
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
// Проблема: Атакующий сайт может украсть данные!

// ❌ ОПАСНО: Слишком длинный Max-Age
app.use(cors({
  maxAge: 31536000 // 1 год
}))
// Проблема: Если настройки изменятся, браузеры будут кэшировать старые

// ✅ БЕЗОПАСНО: Явный whitelist origins
const ALLOWED_ORIGINS = [
  'https://myapp.com',
  'https://admin.myapp.com'
]

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', 'true')
  }

  next()
})

// ✅ БЕЗОПАСНО: Валидация на основе regex
const ORIGIN_PATTERN = /^https:\/\/([\w-]+\.)?myapp\.com$/

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (ORIGIN_PATTERN.test(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  next()
})
`

const debuggingCorsSnippet = `
// Отладка CORS проблем

// 1. Проверка в DevTools
// - Открыть Console
// - Искать ошибки типа:
// "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

// 2. Проверка в Network tab
// - Найти preflight запрос (OPTIONS)
// - Проверить Request Headers:
//   - Origin
//   - Access-Control-Request-Method
//   - Access-Control-Request-Headers
// - Проверить Response Headers:
//   - Access-Control-Allow-Origin
//   - Access-Control-Allow-Methods
//   - Access-Control-Allow-Headers

// 3. Частые проблемы и решения:

// Проблема: "The request client is not a secure context"
// Решение: Использовать HTTPS вместо HTTP

// Проблема: "Credentials flag is 'true', but Access-Control-Allow-Origin is '*'"
// Решение: Указать конкретный origin вместо '*'

// Проблема: "Method DELETE is not allowed by Access-Control-Allow-Methods"
// Решение: Добавить DELETE в Access-Control-Allow-Methods

// Проблема: "Header Authorization is not allowed"
// Решение: Добавить Authorization в Access-Control-Allow-Headers

// 4. Инструменты для отладки:
console.log('Request Origin:', window.location.origin)

// Проверка доступных заголовков ответа:
fetch('https://api.example.com/users')
  .then(response => {
    console.log('Response Headers:')
    for (let [key, value] of response.headers.entries()) {
      console.log(\`  \${key}: \${value}\`)
    }
  })

// Тест preflight вручную:
fetch('https://api.example.com/users', {
  method: 'OPTIONS',
  headers: {
    'Access-Control-Request-Method': 'DELETE',
    'Access-Control-Request-Headers': 'authorization'
  }
}).then(r => console.log('Preflight response:', r))
`

const alternativesSnippet = `
// Альтернативы и обходы CORS (когда нет доступа к серверу)

// 1. JSONP (устаревший, только для GET)
function jsonp(url, callback) {
  const script = document.createElement('script')
  script.src = \`\${url}?callback=\${callback}\`
  document.head.appendChild(script)
}
// ⚠️ Не рекомендуется: проблемы безопасности

// 2. Proxy сервер (разработка)
// package.json в Create React App:
{
  "proxy": "https://api.example.com"
}

// fetch('/api/users') → проксируется на https://api.example.com/api/users

// 3. Browser extension (только для разработки!)
// CORS Unblock, Allow CORS
// ⚠️ Только для локальной разработки!

// 4. Server-side proxy
// Создать собственный эндпоинт, который делает запрос от имени клиента
// GET /api/proxy?url=https://external-api.com/data

// 5. Использование CORS Anywhere (для разработки)
fetch('https://cors-anywhere.herokuapp.com/https://api.example.com/data')
// ⚠️ Только для прототипирования!

// ✅ ПРАВИЛЬНОЕ решение:
// Настроить CORS на целевом сервере
`

const highlightedWhatIsCors = ref('')
const highlightedSameOrigin = ref('')
const highlightedHowCorsWorks = ref('')
const highlightedCorsHeaders = ref('')
const highlightedSimpleRequest = ref('')
const highlightedPreflightRequest = ref('')
const highlightedServerExample = ref('')
const highlightedCredentials = ref('')
const highlightedSecurity = ref('')
const highlightedDebugging = ref('')
const highlightedAlternatives = ref('')

onMounted(() => {
  highlightedWhatIsCors.value = Prism.highlight(whatIsCorsSnippet, Prism.languages.javascript, 'javascript')
  highlightedSameOrigin.value = Prism.highlight(sameOriginPolicySnippet, Prism.languages.javascript, 'javascript')
  highlightedHowCorsWorks.value = Prism.highlight(howCorsWorksSnippet, Prism.languages.javascript, 'javascript')
  highlightedCorsHeaders.value = Prism.highlight(corsHeadersSnippet, Prism.languages.javascript, 'javascript')
  highlightedSimpleRequest.value = Prism.highlight(simpleRequestSnippet, Prism.languages.javascript, 'javascript')
  highlightedPreflightRequest.value = Prism.highlight(preflightRequestSnippet, Prism.languages.javascript, 'javascript')
  highlightedServerExample.value = Prism.highlight(serverExampleNodeSnippet, Prism.languages.javascript, 'javascript')
  highlightedCredentials.value = Prism.highlight(credentialsExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurity.value = Prism.highlight(securityIssuesSnippet, Prism.languages.javascript, 'javascript')
  highlightedDebugging.value = Prism.highlight(debuggingCorsSnippet, Prism.languages.javascript, 'javascript')
  highlightedAlternatives.value = Prism.highlight(alternativesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              CORS (Cross-Origin Resource Sharing)
            </h1>

            <p class="font-weight-regular mb-6">
              <b>CORS (Cross-Origin Resource Sharing)</b> — это механизм безопасности браузера, который контролирует,
              какие веб-сайты могут получать доступ к ресурсам с другого домена. CORS является расширением политики
              <b>Same-Origin Policy</b> и использует HTTP заголовки для разрешения или запрета cross-origin запросов.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое CORS и зачем он нужен?</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-shield-check</v-icon>
              <strong>Безопасность:</strong> CORS защищает пользователей от атак типа CSRF (Cross-Site Request Forgery)
              и предотвращает кражу данных злонамеренными сайтами.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWhatIsCors"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Same-Origin Policy (SOP)</h2>
            <p class="font-weight-regular mb-4">
              <b>Same-Origin Policy</b> — фундаментальная политика безопасности браузера, которая запрещает
              веб-страницам делать запросы к другим доменам без явного разрешения.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSameOrigin"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Origin — что это?</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">URL</th>
                <th class="text-left font-weight-bold">Origin</th>
                <th class="text-left font-weight-bold">Совпадает с https://example.com?</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>https://example.com/page</td>
                <td>https://example.com</td>
                <td class="text-success"><b>✅ Да (same-origin)</b></td>
              </tr>
              <tr>
                <td>https://example.com:443/api</td>
                <td>https://example.com:443</td>
                <td class="text-success"><b>✅ Да (443 - порт по умолчанию для HTTPS)</b></td>
              </tr>
              <tr>
                <td>http://example.com</td>
                <td>http://example.com</td>
                <td class="text-error"><b>❌ Нет (другой протокол)</b></td>
              </tr>
              <tr>
                <td>https://api.example.com</td>
                <td>https://api.example.com</td>
                <td class="text-error"><b>❌ Нет (другой поддомен)</b></td>
              </tr>
              <tr>
                <td>https://example.com:8080</td>
                <td>https://example.com:8080</td>
                <td class="text-error"><b>❌ Нет (другой порт)</b></td>
              </tr>
              <tr>
                <td>https://example.org</td>
                <td>https://example.org</td>
                <td class="text-error"><b>❌ Нет (другой домен)</b></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает CORS?</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Браузер определяет cross-origin" value="1" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-web</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Отправка с Origin" value="2" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-send</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Сервер проверяет" value="3" complete color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-server</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Браузер проверяет ответ" value="4" color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-check</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
            </v-stepper>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHowCorsWorks"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CORS HTTP заголовки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCorsHeaders"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы CORS запросов</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-flash</v-icon>
                    <h3 class="text-h6 font-weight-bold">Простые запросы (Simple)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Методы:</strong> GET, HEAD, POST</li>
                    <li><strong>Заголовки:</strong> только безопасные</li>
                    <li><strong>Content-Type:</strong> form-data, form-urlencoded, text/plain</li>
                    <li><strong>Preflight:</strong> НЕ требуется</li>
                    <li><strong>Отправка:</strong> сразу</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Preflight запросы</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Методы:</strong> PUT, DELETE, PATCH, и др.</li>
                    <li><strong>Заголовки:</strong> кастомные (Authorization, и др.)</li>
                    <li><strong>Content-Type:</strong> application/json, и др.</li>
                    <li><strong>Preflight:</strong> ТРЕБУЕТСЯ (OPTIONS)</li>
                    <li><strong>Отправка:</strong> после успешного preflight</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Простые запросы (Simple Requests)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSimpleRequest"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Preflight запросы</h3>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Preflight запрос (OPTIONS) отправляется автоматически браузером для проверки
              разрешений перед отправкой основного запроса. Сервер должен корректно обрабатывать OPTIONS.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPreflightRequest"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Настройка CORS на сервере</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedServerExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Работа с Credentials (Cookies)</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Критично:</strong> При использовании <code>credentials: 'include'</code> нельзя использовать
              <code>Access-Control-Allow-Origin: *</code>. Нужно указывать конкретный origin!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCredentials"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы безопасности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка CORS</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebugging"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Обходы и альтернативы CORS</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAlternatives"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Тип запроса</th>
                <th class="text-left font-weight-bold">Preflight?</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>GET запрос без заголовков</td>
                <td class="text-success"><b>Simple</b></td>
                <td>❌ Нет</td>
                <td>Загрузка публичного API</td>
              </tr>
              <tr>
                <td>POST с form-data</td>
                <td class="text-success"><b>Simple</b></td>
                <td>❌ Нет</td>
                <td>Отправка формы</td>
              </tr>
              <tr>
                <td>POST с JSON</td>
                <td class="text-warning"><b>Preflight</b></td>
                <td>✅ Да</td>
                <td>REST API запрос</td>
              </tr>
              <tr>
                <td>DELETE запрос</td>
                <td class="text-warning"><b>Preflight</b></td>
                <td>✅ Да</td>
                <td>Удаление ресурса</td>
              </tr>
              <tr>
                <td>GET с Authorization</td>
                <td class="text-warning"><b>Preflight</b></td>
                <td>✅ Да</td>
                <td>Приватные данные</td>
              </tr>
              <tr>
                <td>PUT запрос</td>
                <td class="text-warning"><b>Preflight</b></td>
                <td>✅ Да</td>
                <td>Обновление ресурса</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое CORS и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  CORS — это механизм безопасности браузера, который контролирует cross-origin запросы через HTTP заголовки.
                  Он расширяет Same-Origin Policy, позволяя серверам явно разрешать доступ с определенных доменов,
                  защищая пользователей от атак типа CSRF и кражи данных.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Simple и Preflight запросами?</p>
                <p class="font-weight-regular ma-0">
                  Simple запросы (GET, HEAD, POST с безопасными заголовками) отправляются сразу. Preflight запросы
                  (PUT, DELETE, кастомные заголовки, JSON) требуют предварительного OPTIONS запроса для проверки
                  разрешений перед отправкой основного запроса.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие HTTP заголовки используются в CORS?</p>
                <p class="font-weight-regular ma-0">
                  Основные: <code>Access-Control-Allow-Origin</code> (разрешенные origins),
                  <code>Access-Control-Allow-Methods</code> (методы),
                  <code>Access-Control-Allow-Headers</code> (заголовки),
                  <code>Access-Control-Allow-Credentials</code> (cookies),
                  <code>Access-Control-Max-Age</code> (кэш preflight).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя использовать * с credentials?</p>
                <p class="font-weight-regular ma-0">
                  Из соображений безопасности: если разрешить любому origin (<code>*</code>) отправлять cookies,
                  злонамеренный сайт сможет украсть приватные данные пользователя. При
                  <code>credentials: true</code> нужно указывать конкретный origin.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Preflight кэширование?</p>
                <p class="font-weight-regular ma-0">
                  <code>Access-Control-Max-Age</code> указывает, сколько секунд браузер может кэшировать результат
                  preflight запроса. Это оптимизирует производительность, избегая лишних OPTIONS запросов.
                  Рекомендуется 24 часа (86400 секунд).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отладить CORS ошибки?</p>
                <p class="font-weight-regular ma-0">
                  В DevTools проверить: (1) Console — текст ошибки CORS, (2) Network → найти preflight OPTIONS,
                  (3) проверить Request Headers (Origin, Access-Control-Request-*), (4) проверить Response Headers
                  (Access-Control-Allow-*). Частые проблемы: отсутствие заголовков, несовпадение origin, неправильный credentials.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть обходы CORS?</p>
                <p class="font-weight-regular ma-0">
                  (1) Proxy сервер — запросы идут через свой бэкенд, (2) JSONP (устарело), (3) Browser extensions
                  (только для разработки), (4) CORS Anywhere (прототипирование). Правильное решение — настроить
                  CORS на целевом сервере.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Whitelist конкретных origins</li>
                    <li>Минимизировать Max-Age (24 часа)</li>
                    <li>Проверять Origin на сервере</li>
                    <li>Логировать CORS ошибки</li>
                    <li>Использовать HTTPS</li>
                    <li>Тестировать с реальными origins</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Access-Control-Allow-Origin: *</li>
                    <li>* с credentials</li>
                    <li>Отражение Origin без проверки</li>
                    <li>Слишком длинный Max-Age</li>
                    <li>Игнорирование preflight</li>
                    <li>Забывать про OPTIONS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать CORS middleware</li>
                    <li>Настроить разные origins для сред</li>
                    <li>Мониторить CORS ошибки в продакшене</li>
                    <li>Документировать CORS политику</li>
                    <li>Тестировать в разных браузерах</li>
                    <li>Учитывать мобильные приложения</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>CORS</b> — критически важный механизм безопасности, который защищает пользователей от атак
              через контроль cross-origin запросов. Понимание разницы между Simple и Preflight запросами,
              правильная настройка CORS заголовков на сервере и знание проблем безопасности необходимы
              каждому фронтенд-разработчику. Правильная конфигурация CORS балансирует между безопасностью
              и функциональностью приложения.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                target="_blank"
                class="mr-2">
                MDN: CORS
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://fetch.spec.whatwg.org/#http-cors-protocol"
                target="_blank">
                CORS Spec
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
