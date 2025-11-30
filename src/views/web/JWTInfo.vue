<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-bash.js'

const jwtStructureSnippet = `
// Структура JWT токена
// JWT состоит из трех частей, разделенных точками:
// HEADER.PAYLOAD.SIGNATURE

// Пример реального JWT токена:
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// Часть 1: HEADER (заголовок)
const header = {
  "alg": "HS256",  // Алгоритм подписи (HMAC SHA-256)
  "typ": "JWT"     // Тип токена
}
// Base64Url encoded: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

// Часть 2: PAYLOAD (полезная нагрузка)
const payload = {
  "sub": "1234567890",           // Subject - ID пользователя
  "name": "John Doe",             // Кастомные данные
  "iat": 1516239022,              // Issued At - время создания
  "exp": 1516242622,              // Expiration - время истечения
  "role": "admin",                // Роль пользователя
  "email": "john@example.com"    // Email пользователя
}
// Base64Url encoded: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

// Часть 3: SIGNATURE (подпись)
// HMACSHA256(
//   base64UrlEncode(header) + "." + base64UrlEncode(payload),
//   secret
// )
// Результат: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
`

const standardClaimsSnippet = `
// Стандартные claims (заявления) в JWT payload

const standardPayload = {
  // Зарегистрированные claims (рекомендуемые)
  "iss": "https://api.example.com",    // Issuer - издатель токена
  "sub": "user123",                     // Subject - субъект (ID пользователя)
  "aud": "https://app.example.com",    // Audience - аудитория (кому предназначен)
  "exp": 1735689600,                    // Expiration Time - время истечения (Unix timestamp)
  "nbf": 1735603200,                    // Not Before - не действителен до этого времени
  "iat": 1735603200,                    // Issued At - время выдачи
  "jti": "unique-token-id-123",        // JWT ID - уникальный идентификатор токена

  // Публичные claims (кастомные, но общепринятые)
  "name": "John Doe",
  "email": "john@example.com",
  "email_verified": true,
  "role": "admin",
  "permissions": ["read", "write", "delete"],

  // Приватные claims (специфичные для вашего приложения)
  "user_id": 12345,
  "organization_id": 67890,
  "plan": "premium",
  "features": ["analytics", "export"]
}

// Важные моменты:
// 1. exp, nbf, iat - в формате Unix timestamp (секунды с 1 января 1970)
// 2. Все claims опциональны, но exp настоятельно рекомендуется
// 3. Не храните чувствительные данные (пароли, номера карт) в payload!
`

const creatingJWTSnippet = `
// Создание JWT на сервере (Node.js)

const jwt = require('jsonwebtoken')

// 1. Определяем секретный ключ (храните в переменных окружения!)
const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key'

// 2. Создаем payload с данными пользователя
function generateAccessToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  }

  // 3. Создаем токен с опциями
  const token = jwt.sign(
    payload,
    SECRET_KEY,
    {
      expiresIn: '15m',           // Access token на 15 минут
      issuer: 'api.myapp.com',
      audience: 'myapp.com'
    }
  )

  return token
}

// 4. Создаем refresh token (долгоживущий)
function generateRefreshToken(user) {
  const payload = {
    sub: user.id,
    type: 'refresh'
  }

  const refreshToken = jwt.sign(
    payload,
    SECRET_KEY,
    {
      expiresIn: '7d',  // Refresh token на 7 дней
      issuer: 'api.myapp.com'
    }
  )

  return refreshToken
}

// 5. Использование при авторизации
async function login(req, res) {
  const { email, password } = req.body

  // Проверяем учетные данные
  const user = await User.findOne({ email })
  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Генерируем токены
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // Сохраняем refresh token в БД (для возможности отзыва)
  await RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

  // Отправляем токены клиенту
  res.json({
    accessToken,
    refreshToken,
    expiresIn: 900  // 15 минут в секундах
  })
}
`

const verifyingJWTSnippet = `
// Проверка JWT на сервере

const jwt = require('jsonwebtoken')

// 1. Middleware для проверки токена
function authenticateToken(req, res, next) {
  // Получаем токен из заголовка
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  // Проверяем и декодируем токен
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // Токен невалиден, истек или подделан
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' })
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' })
      }
      return res.status(403).json({ error: 'Token verification failed' })
    }

    // Токен валиден, добавляем данные пользователя в request
    req.user = decoded
    next()
  })
}

// 2. Проверка с дополнительными условиями
function authenticateWithOptions(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      audience: 'myapp.com',           // Проверяем аудиторию
      issuer: 'api.myapp.com',         // Проверяем издателя
      clockTolerance: 10                // Допуск на разницу часов (секунды)
    })

    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: error.message })
  }
}

// 3. Проверка роли пользователя
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}

// 4. Использование middleware
const express = require('express')
const app = express()

// Защищенный роут
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'Protected route accessed successfully'
  })
})

// Роут только для админов
app.delete('/api/users/:id',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    await User.deleteById(req.params.id)
    res.json({ success: true })
  }
)
`

const clientSideSnippet = `
// Работа с JWT на клиенте (React/Vue/Angular)

// 1. Функции для работы с токенами в localStorage
const TokenService = {
  // Сохранение токенов
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  },

  // Получение access token
  getAccessToken() {
    return localStorage.getItem('accessToken')
  },

  // Получение refresh token
  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  },

  // Удаление токенов (logout)
  removeTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  // Проверка наличия токена
  hasToken() {
    return !!this.getAccessToken()
  }
}

// 2. API клиент с автоматическим добавлением токена
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor для добавления токена к каждому запросу
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. Автоматическое обновление токена при истечении
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если токен истек и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Обновляем токен
        const refreshToken = TokenService.getRefreshToken()
        const response = await axios.post(
          'https://api.example.com/auth/refresh',
          { refreshToken }
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data

        // Сохраняем новые токены
        TokenService.setTokens(accessToken, newRefreshToken)

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = \`Bearer \${accessToken}\`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh token тоже истек - выходим из системы
        TokenService.removeTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// 4. Использование в компонентах
async function loginUser(email, password) {
  try {
    const response = await apiClient.post('/auth/login', { email, password })
    const { accessToken, refreshToken } = response.data

    TokenService.setTokens(accessToken, refreshToken)

    // Перенаправляем на защищенную страницу
    window.location.href = '/dashboard'
  } catch (error) {
    console.error('Login failed:', error)
  }
}

async function getUserProfile() {
  try {
    const response = await apiClient.get('/user/profile')
    return response.data
  } catch (error) {
    console.error('Failed to get profile:', error)
  }
}

function logoutUser() {
  TokenService.removeTokens()
  window.location.href = '/login'
}
`

const securitySnippet = `
// Безопасное хранение и передача JWT

// ❌ НЕБЕЗОПАСНО - localStorage
// Проблема: Уязвимо к XSS атакам
localStorage.setItem('token', accessToken)

// ❌ НЕБЕЗОПАСНО - sessionStorage
// Проблема: Тоже уязвимо к XSS атакам
sessionStorage.setItem('token', accessToken)

// ✅ БЕЗОПАСНЕЕ - HttpOnly Cookie
// На сервере (Express):
app.post('/auth/login', async (req, res) => {
  const { accessToken, refreshToken } = generateTokens(user)

  // Устанавливаем токен в HttpOnly cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,      // Недоступен для JavaScript
    secure: true,        // Только HTTPS
    sameSite: 'strict',  // Защита от CSRF
    maxAge: 15 * 60 * 1000  // 15 минут
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 дней
    path: '/auth/refresh'  // Только для refresh endpoint
  })

  res.json({ success: true })
})

// ✅ ЛУЧШАЯ ПРАКТИКА - Комбинированный подход
// Access token в памяти (переменная), refresh в HttpOnly cookie

// На клиенте:
class TokenManager {
  constructor() {
    this.accessToken = null  // В памяти, не в localStorage!
  }

  setAccessToken(token) {
    this.accessToken = token
  }

  getAccessToken() {
    return this.accessToken
  }

  clearTokens() {
    this.accessToken = null
    // Refresh token удаляется через API запрос
  }
}

const tokenManager = new TokenManager()

// При логине - сохраняем только в памяти
async function login(email, password) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    credentials: 'include',  // Отправляем cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const { accessToken } = await response.json()
  tokenManager.setAccessToken(accessToken)  // В памяти, не в localStorage!
}

// При запросах - токен из памяти
async function makeAuthenticatedRequest(url) {
  const response = await fetch(url, {
    credentials: 'include',  // Отправляем refresh token cookie
    headers: {
      'Authorization': \`Bearer \${tokenManager.getAccessToken()}\`
    }
  })

  return response.json()
}

// Обновление токена - автоматически через interceptor
async function refreshAccessToken() {
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    credentials: 'include'  // Refresh token в HttpOnly cookie
  })

  const { accessToken } = await response.json()
  tokenManager.setAccessToken(accessToken)
  return accessToken
}
`

const algorithmsSnippet = `
// Алгоритмы подписи JWT

// 1. СИММЕТРИЧНЫЕ АЛГОРИТМЫ (один секретный ключ)
// HS256 (HMAC SHA-256) - самый популярный
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'your-256-bit-secret'

// Создание токена
const token = jwt.sign(
  { userId: 123 },
  SECRET_KEY,
  { algorithm: 'HS256' }  // По умолчанию
)

// Проверка токена
const decoded = jwt.verify(token, SECRET_KEY)

// HS384, HS512 - более длинные хеши
const tokenHS512 = jwt.sign(
  { userId: 123 },
  SECRET_KEY,
  { algorithm: 'HS512' }  // Более стойкий к коллизиям
)

// 2. АСИММЕТРИЧНЫЕ АЛГОРИТМЫ (приватный + публичный ключ)
// RS256 (RSA SHA-256) - для микросервисов

const fs = require('fs')

// Генерация ключей (выполнить один раз):
// openssl genrsa -out private.key 2048
// openssl rsa -in private.key -pubout -out public.key

const privateKey = fs.readFileSync('private.key')
const publicKey = fs.readFileSync('public.key')

// Создание токена (только приватным ключом)
const tokenRS256 = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256' }
)

// Проверка токена (публичным ключом - можно распространять!)
const decodedRS256 = jwt.verify(tokenRS256, publicKey)

// ES256 (ECDSA SHA-256) - современный, быстрый
// openssl ecparam -genkey -name prime256v1 -noout -out ec-private.key
// openssl ec -in ec-private.key -pubout -out ec-public.key

const ecPrivateKey = fs.readFileSync('ec-private.key')
const ecPublicKey = fs.readFileSync('ec-public.key')

const tokenES256 = jwt.sign(
  { userId: 123 },
  ecPrivateKey,
  { algorithm: 'ES256' }
)

const decodedES256 = jwt.verify(tokenES256, ecPublicKey)

// 3. ОТСУТСТВИЕ ПОДПИСИ (НЕБЕЗОПАСНО!)
// 'none' algorithm - НИКОГДА не используйте в production!
const unsignedToken = jwt.sign(
  { userId: 123 },
  '',
  { algorithm: 'none' }
)
// ⚠️ Любой может подделать такой токен!
`

const jwtVsSessionSnippet = `
// JWT vs Session-based аутентификация

// ========================================
// SESSION-BASED АУТЕНТИФИКАЦИЯ
// ========================================

// Сервер (Express + express-session)
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 24 часа
  }
}))

// Логин - создаем сессию на сервере
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body)

  // Сохраняем данные в сессии (на сервере в Redis/памяти)
  req.session.userId = user.id
  req.session.role = user.role

  res.json({ success: true })
})

// Защищенный роут - проверяем сессию
app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Данные хранятся на сервере
  const userId = req.session.userId
  res.json({ userId })
})

// Логаут - удаляем сессию с сервера
app.post('/logout', (req, res) => {
  req.session.destroy()
  res.json({ success: true })
})

// ========================================
// JWT-BASED АУТЕНТИФИКАЦИЯ
// ========================================

// Логин - создаем JWT токен
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body)

  // Токен содержит все данные (самодостаточный)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: '24h' }
  )

  res.json({ token })
})

// Защищенный роут - проверяем токен
app.get('/profile', authenticateJWT, (req, res) => {
  // Данные из токена (не нужен запрос к БД/Redis)
  const userId = req.user.userId
  res.json({ userId })
})

// Логаут - клиент удаляет токен
app.post('/logout', (req, res) => {
  // На сервере делать нечего - токен живет до истечения
  // (если нужен blacklist - добавляем токен в Redis)
  res.json({ success: true })
})

// ========================================
// СРАВНЕНИЕ
// ========================================

/*
┌────────────────────┬──────────────────────┬──────────────────────┐
│   Характеристика   │   Session-based      │      JWT-based       │
├────────────────────┼──────────────────────┼──────────────────────┤
│ Хранение состояния │ Сервер (Redis/БД)    │ Клиент (токен)       │
│ Масштабируемость   │ Сложнее (нужен Redis)│ Легче (stateless)    │
│ Размер передачи    │ Маленький (session ID│ Больший (весь токен) │
│ Отзыв доступа      │ Легко (удалить сессию│ Сложно (blacklist)   │
│ Производительность │ Запрос к Redis       │ Проверка подписи     │
│ Безопасность       │ HttpOnly cookie      │ Риск XSS (если в LS) │
│ Микросервисы       │ Сложно (общий store) │ Отлично (stateless)  │
│ Мобильные app      │ Сложнее              │ Проще (нет cookies)  │
└────────────────────┴──────────────────────┴──────────────────────┘
*/
`

const bestPracticesSnippet = `
// Лучшие практики работы с JWT

// 1. КОРОТКИЙ СРОК ЖИЗНИ ACCESS TOKEN
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id },
    SECRET_KEY,
    { expiresIn: '15m' }  // ✅ 15 минут, не часы!
  )

  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }   // ✅ 7 дней для refresh
  )

  return { accessToken, refreshToken }
}

// 2. МИНИМАЛЬНЫЙ PAYLOAD
// ❌ ПЛОХО - слишком много данных
const badPayload = {
  userId: 123,
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'base64-encoded-image-data...',  // Огромный размер!
  preferences: { /* много настроек */ },
  friends: [/* массив друзей */]
}

// ✅ ХОРОШО - только необходимое
const goodPayload = {
  sub: 123,           // User ID
  role: 'user',       // Роль
  iat: 1735603200,    // Issued at
  exp: 1735604100     // Expires
}

// 3. ПРОВЕРКА ТИПА ТОКЕНА
function verifyAccessToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY)

  // ✅ Проверяем, что это именно access token
  if (decoded.type === 'refresh') {
    throw new Error('Refresh token used as access token')
  }

  return decoded
}

// 4. WHITELIST/BLACKLIST ДЛЯ ОТЗЫВА
const Redis = require('redis')
const redisClient = Redis.createClient()

// Добавляем токен в blacklist при логауте
async function logout(token) {
  const decoded = jwt.decode(token)
  const ttl = decoded.exp - Math.floor(Date.now() / 1000)

  // Храним в Redis до истечения
  await redisClient.setex(\`blacklist:\${token}\`, ttl, 'true')
}

// Проверяем blacklist при аутентификации
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  // Проверяем blacklist
  const isBlacklisted = await redisClient.get(\`blacklist:\${token}\`)
  if (isBlacklisted) {
    return res.status(401).json({ error: 'Token revoked' })
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
}

// 5. ЗАЩИТА ОТ ПОДМЕНЫ АЛГОРИТМА
// ❌ УЯЗВИМО
jwt.verify(token, publicKey)  // Атакующий может поменять alg на "none"

// ✅ БЕЗОПАСНО - явно указываем алгоритм
jwt.verify(token, publicKey, { algorithms: ['RS256'] })

// 6. БЕЗОПАСНЫЕ СЕКРЕТНЫЕ КЛЮЧИ
// ❌ ПЛОХО
const SECRET_KEY = 'secret'

// ✅ ХОРОШО - случайная строка 256+ бит
const crypto = require('crypto')
const SECRET_KEY = crypto.randomBytes(32).toString('hex')
// Храните в переменных окружения!

// 7. РОТАЦИЯ REFRESH ТОКЕНОВ
async function refreshAccessToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, REFRESH_SECRET)

  // Создаем новые токены
  const newAccessToken = generateAccessToken(decoded.userId)
  const newRefreshToken = generateRefreshToken(decoded.userId)

  // ✅ Инвалидируем старый refresh token
  await redisClient.setex(
    \`blacklist:\${refreshToken}\`,
    7 * 24 * 60 * 60,
    'true'
  )

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

// 8. RATE LIMITING НА КРИТИЧНЫХ ENDPOINT
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 минут
  max: 5,                     // 5 попыток
  message: 'Too many login attempts'
})

app.post('/auth/login', loginLimiter, login)

// 9. HTTPS ONLY
// ✅ Всегда используйте HTTPS в production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect('https://' + req.headers.host + req.url)
  }
  next()
})
`

const highlightedJwtStructure = ref('')
const highlightedStandardClaims = ref('')
const highlightedCreatingJWT = ref('')
const highlightedVerifyingJWT = ref('')
const highlightedClientSide = ref('')
const highlightedSecurity = ref('')
const highlightedAlgorithms = ref('')
const highlightedJwtVsSession = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedJwtStructure.value = Prism.highlight(jwtStructureSnippet, Prism.languages.javascript, 'javascript')
  highlightedStandardClaims.value = Prism.highlight(standardClaimsSnippet, Prism.languages.javascript, 'javascript')
  highlightedCreatingJWT.value = Prism.highlight(creatingJWTSnippet, Prism.languages.javascript, 'javascript')
  highlightedVerifyingJWT.value = Prism.highlight(verifyingJWTSnippet, Prism.languages.javascript, 'javascript')
  highlightedClientSide.value = Prism.highlight(clientSideSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurity.value = Prism.highlight(securitySnippet, Prism.languages.javascript, 'javascript')
  highlightedAlgorithms.value = Prism.highlight(algorithmsSnippet, Prism.languages.javascript, 'javascript')
  highlightedJwtVsSession.value = Prism.highlight(jwtVsSessionSnippet, Prism.languages.javascript, 'javascript')
  highlightedBestPractices.value = Prism.highlight(bestPracticesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              JWT (JSON Web Token): аутентификация и безопасность
            </h1>

            <p class="font-weight-regular mb-6">
              <b>JWT (JSON Web Token)</b> — это открытый стандарт (RFC 7519) для безопасной передачи информации
              между сторонами в виде JSON-объекта. JWT используется для аутентификации и авторизации,
              позволяя передавать подписанные данные, которые можно проверить на достоверность.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое JWT и зачем он нужен?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные цели</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Аутентификация</strong> — подтверждение личности пользователя</li>
                    <li><strong>Авторизация</strong> — предоставление доступа к ресурсам</li>
                    <li><strong>Обмен данными</strong> — безопасная передача информации</li>
                    <li><strong>Stateless</strong> — сервер не хранит состояние сессии</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Компактный</strong> — передается в URL, заголовках</li>
                    <li><strong>Самодостаточный</strong> — содержит все данные</li>
                    <li><strong>Кроссплатформенный</strong> — работает везде</li>
                    <li><strong>Масштабируемый</strong> — не требует серверной памяти</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Структура JWT токена</h2>
            <p class="font-weight-regular mb-4">
              JWT состоит из трех частей, разделенных точками: <code>HEADER.PAYLOAD.SIGNATURE</code>
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJwtStructure"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Компоненты JWT</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Компонент</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Формат</th>
                <th class="text-left font-weight-bold">Назначение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Header</b></td>
                <td class="pt-2 pb-2">Метаданные о токене</td>
                <td class="pt-2 pb-2">Base64Url(JSON)</td>
                <td class="pt-2 pb-2">Алгоритм подписи, тип токена</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Payload</b></td>
                <td class="pt-2 pb-2">Данные пользователя (claims)</td>
                <td class="pt-2 pb-2">Base64Url(JSON)</td>
                <td class="pt-2 pb-2">ID пользователя, роли, время истечения</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Signature</b></td>
                <td class="pt-2 pb-2">Криптографическая подпись</td>
                <td class="pt-2 pb-2">Base64Url(hash)</td>
                <td class="pt-2 pb-2">Проверка подлинности и целостности</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Стандартные claims (заявления)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStandardClaims"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Механизм работы JWT аутентификации</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-primary">
                  <v-icon size="large" color="white" class="mb-2">mdi-login</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">1. Логин</h3>
                  <p class="text-white text-body-2">Пользователь отправляет логин и пароль на сервер (POST /auth/login)</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-key-plus</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">2. Генерация токена</h3>
                  <p class="text-white text-body-2">Сервер проверяет данные и генерирует JWT с подписью секретным ключом</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="large" color="white" class="mb-2">mdi-content-save</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">3. Сохранение</h3>
                  <p class="text-white text-body-2">Клиент сохраняет токен (в памяти, localStorage или HttpOnly cookie)</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-warning">
                  <v-icon size="large" color="white" class="mb-2">mdi-send</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">4. Использование</h3>
                  <p class="text-white text-body-2">Токен отправляется с каждым запросом в заголовке Authorization: Bearer TOKEN</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Создание JWT на сервере</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCreatingJWT"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проверка JWT на сервере</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVerifyingJWT"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Работа с JWT на клиенте</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedClientSide"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Безопасное хранение и передача JWT</h2>

            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-shield-alert</v-icon>
              <strong>Критически важно:</strong> Выбор способа хранения токенов влияет на безопасность всего приложения!
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение способов хранения</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Способ</th>
                <th class="text-left font-weight-bold">XSS атаки</th>
                <th class="text-left font-weight-bold">CSRF атаки</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>localStorage</b></td>
                <td class="text-error">❌ Уязвим</td>
                <td class="text-success">✅ Защищен</td>
                <td class="text-error">Не рекомендуется</td>
              </tr>
              <tr>
                <td><b>sessionStorage</b></td>
                <td class="text-error">❌ Уязвим</td>
                <td class="text-success">✅ Защищен</td>
                <td class="text-error">Не рекомендуется</td>
              </tr>
              <tr>
                <td><b>HttpOnly Cookie</b></td>
                <td class="text-success">✅ Защищен</td>
                <td class="text-warning">⚠️ Требует CSRF защиты</td>
                <td class="text-success">Рекомендуется</td>
              </tr>
              <tr>
                <td><b>Memory (переменная)</b></td>
                <td class="text-success">✅ Защищен</td>
                <td class="text-success">✅ Защищен</td>
                <td class="text-success">Лучший вариант</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Алгоритмы подписи JWT</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAlgorithms"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение алгоритмов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Алгоритм</th>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Безопасность</th>
                <th class="text-left font-weight-bold">Скорость</th>
                <th class="text-left font-weight-bold">Применение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>HS256</b></td>
                <td>Симметричный</td>
                <td class="text-success">Хорошая</td>
                <td class="text-success">Быстрый</td>
                <td>Монолитные приложения</td>
              </tr>
              <tr>
                <td><b>HS512</b></td>
                <td>Симметричный</td>
                <td class="text-success">Отличная</td>
                <td class="text-success">Быстрый</td>
                <td>Повышенная безопасность</td>
              </tr>
              <tr>
                <td><b>RS256</b></td>
                <td>Асимметричный</td>
                <td class="text-success">Отличная</td>
                <td class="text-warning">Медленный</td>
                <td>Микросервисы, OAuth</td>
              </tr>
              <tr>
                <td><b>ES256</b></td>
                <td>Асимметричный</td>
                <td class="text-success">Отличная</td>
                <td class="text-success">Быстрый</td>
                <td>Современные приложения</td>
              </tr>
              <tr>
                <td><b>none</b></td>
                <td>Без подписи</td>
                <td class="text-error">Отсутствует</td>
                <td class="text-success">Мгновенный</td>
                <td class="text-error">❌ Никогда не используйте!</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">JWT vs Session-based аутентификация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJwtVsSession"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать JWT vs Sessions</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ JWT лучше для:</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Микросервисов</strong> — stateless архитектура</li>
                    <li><strong>API</strong> — RESTful сервисы</li>
                    <li><strong>Мобильных app</strong> — нет cookies</li>
                    <li><strong>SPA</strong> — Single Page Applications</li>
                    <li><strong>OAuth/SSO</strong> — федеративная аутентификация</li>
                    <li><strong>Масштабирования</strong> — нет серверного состояния</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-primary">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Sessions лучше для:</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Традиционных web-app</strong> — server-side rendering</li>
                    <li><strong>Мгновенной инвалидации</strong> — нужен logout</li>
                    <li><strong>Чувствительных данных</strong> — финансы, здравоохранение</li>
                    <li><strong>Длительных сессий</strong> — недели/месяцы</li>
                    <li><strong>Простоты</strong> — меньше кода на клиенте</li>
                    <li><strong>Централизованного контроля</strong> — все на сервере</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики JWT</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое JWT и из каких частей он состоит?</p>
                <p class="font-weight-regular ma-0">
                  JWT (JSON Web Token) — стандарт передачи данных в формате JSON. Состоит из трех частей:
                  <b>Header</b> (алгоритм и тип), <b>Payload</b> (данные пользователя/claims),
                  <b>Signature</b> (криптографическая подпись для проверки целостности).
                  Части разделяются точками и кодируются в Base64Url.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает механизм аутентификации с JWT?</p>
                <p class="font-weight-regular ma-0">
                  1) Пользователь отправляет credentials на сервер. 2) Сервер проверяет данные и генерирует JWT
                  с подписью. 3) Клиент сохраняет токен. 4) При каждом запросе токен отправляется в заголовке
                  Authorization. 5) Сервер проверяет подпись и извлекает данные из payload.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем JWT отличается от session-based аутентификации?</p>
                <p class="font-weight-regular ma-0">
                  <b>JWT:</b> stateless (данные в токене), масштабируется легко, но сложнее отозвать.
                  <b>Sessions:</b> stateful (данные на сервере), легко инвалидировать, но требует
                  общее хранилище (Redis) для масштабирования. JWT лучше для API и микросервисов,
                  sessions — для традиционных web-приложений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Где безопаснее хранить JWT на клиенте?</p>
                <p class="font-weight-regular ma-0">
                  <b>Лучший вариант:</b> Access token в памяти (переменная), refresh token в HttpOnly cookie
                  с SameSite=strict. <b>Избегать:</b> localStorage/sessionStorage (уязвимы к XSS).
                  <b>Альтернатива:</b> оба токена в HttpOnly cookies с CSRF защитой.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какую роль играют алгоритмы подписи в JWT?</p>
                <p class="font-weight-regular ma-0">
                  Алгоритмы обеспечивают целостность и подлинность токена. <b>Симметричные</b> (HS256):
                  один секретный ключ, быстрые, для монолитов. <b>Асимметричные</b> (RS256, ES256):
                  приватный ключ для подписи, публичный для проверки, для микросервисов.
                  Всегда явно указывайте алгоритм при проверке!
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить безопасность JWT?</p>
                <p class="font-weight-regular ma-0">
                  1) Короткий срок жизни access token (15 мин). 2) Refresh token для обновления.
                  3) HTTPS только. 4) HttpOnly cookies или память. 5) Проверка алгоритма подписи.
                  6) Минимальный payload. 7) Blacklist для отзыва. 8) Сильные секретные ключи.
                  9) Rate limiting на login/refresh endpoints.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отозвать JWT токен?</p>
                <p class="font-weight-regular ma-0">
                  JWT нельзя отозвать напрямую (stateless). Решения: 1) <b>Blacklist</b> в Redis —
                  храним отозванные токены до истечения. 2) <b>Короткий срок жизни</b> — токен истекает быстро.
                  3) <b>Версионирование</b> — добавляем версию в payload, инкрементируем при logout.
                  4) <b>Whitelist refresh токенов</b> — храним только валидные refresh токены.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Распространенные уязвимости и защита</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-bug</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Уязвимости</h3>
                  <ul class="text-left pl-4">
                    <li><strong>XSS</strong> — кража токена из localStorage</li>
                    <li><strong>CSRF</strong> — подделка запросов с cookies</li>
                    <li><strong>Algorithm confusion</strong> — подмена алгоритма</li>
                    <li><strong>Weak secrets</strong> — слабые ключи</li>
                    <li><strong>Token replay</strong> — повторное использование</li>
                    <li><strong>JWT in URL</strong> — утечка в логах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Защита</h3>
                  <ul class="text-left pl-4">
                    <li>HttpOnly cookies или memory storage</li>
                    <li>SameSite=strict для cookies</li>
                    <li>Явная проверка алгоритма</li>
                    <li>Криптографически стойкие ключи 256+ бит</li>
                    <li>Короткий срок жизни + blacklist</li>
                    <li>Только в заголовках, не в URL</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <ul class="text-left pl-4">
                    <li>Логирование неудачных попыток</li>
                    <li>Rate limiting на auth endpoints</li>
                    <li>Аномалии в использовании токенов</li>
                    <li>Геолокация и IP проверка</li>
                    <li>Автоматическая блокировка при атаках</li>
                    <li>Регулярный аудит безопасности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>JWT</b> — это мощный инструмент для stateless аутентификации, идеально подходящий для современных
              API и микросервисов. Токен состоит из Header, Payload и Signature, обеспечивающей целостность.
              <b>Ключевые принципы безопасности:</b> короткий срок жизни access токена, безопасное хранение
              (HttpOnly cookies или память), использование refresh токенов, HTTPS, явная проверка алгоритма подписи.
              JWT отличается от sessions отсутствием серверного состояния, что упрощает масштабирование,
              но усложняет отзыв токенов. Правильная реализация JWT требует понимания всех аспектов безопасности
              и выбора подходящих алгоритмов подписи для конкретного сценария.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://jwt.io/"
                target="_blank"
                class="mr-2">
                JWT.io Debugger
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://datatracker.ietf.org/doc/html/rfc7519"
                target="_blank">
                RFC 7519 Spec
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
