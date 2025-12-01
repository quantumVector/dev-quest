<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const ssoBasicSnippet = `
// Упрощенная схема SSO процесса

// 1. Пользователь переходит на Application A
// https://app-a.example.com

// 2. Application A проверяет авторизацию
// Нет токена → редирект на SSO Provider

// 3. Редирект на SSO Provider
window.location.href =
  'https://sso.example.com/login?redirect=https://app-a.example.com/callback'

// 4. SSO Provider проверяет сессию
// Если пользователь уже авторизован в другом приложении:
// → сразу генерирует токен
// Если нет → показывает форму логина

// 5. После успешной аутентификации:
// SSO Provider редиректит обратно с токеном
window.location.href =
  'https://app-a.example.com/callback?token=eyJhbGciOiJIUzI1...'

// 6. Application A валидирует токен и создает сессию
const validateToken = async (token) => {
  const response = await fetch('https://sso.example.com/validate', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  })

  const userData = await response.json()
  // Пользователь авторизован!
  return userData
}

// 7. Пользователь переходит на Application B
// Процесс повторяется, но SSO Provider уже знает пользователя
// → мгновенная авторизация без повторного ввода пароля!
`

const samlFlowSnippet = `
// SAML 2.0 - популярный протокол для SSO

// 1. Инициация SAML Request
const initiateSAML = () => {
  const samlRequest = {
    'samlp:AuthnRequest': {
      '@ID': generateUniqueID(),
      '@Version': '2.0',
      '@IssueInstant': new Date().toISOString(),
      '@Destination': 'https://idp.example.com/saml/sso',
      'saml:Issuer': 'https://sp.example.com',
      'samlp:NameIDPolicy': {
        '@Format': 'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
        '@AllowCreate': 'true'
      }
    }
  }

  // Кодируем и отправляем на Identity Provider
  const encoded = base64Encode(deflate(xmlStringify(samlRequest)))
  window.location.href =
    \`https://idp.example.com/saml/sso?SAMLRequest=\${encoded}\`
}

// 2. Identity Provider обрабатывает запрос
// Проверяет сессию пользователя
// Если нет сессии → показывает форму логина
// Если есть → генерирует SAML Response

// 3. SAML Response возвращается в Service Provider
const handleSAMLResponse = async (samlResponse) => {
  // Декодируем и парсим XML
  const decoded = inflate(base64Decode(samlResponse))
  const response = xmlParse(decoded)

  // Валидация подписи
  const isValid = await validateSignature(
    response.signature,
    response.data
  )

  if (!isValid) {
    throw new Error('Invalid SAML signature')
  }

  // Извлекаем данные пользователя
  const user = {
    id: response.nameID,
    email: response.attributes.email,
    name: response.attributes.displayName,
    roles: response.attributes.roles
  }

  // Создаем локальную сессию
  createUserSession(user)

  return user
}

// 4. Пример SAML Assertion (упрощенно)
const samlAssertion = \`
<saml:Assertion>
  <saml:Subject>
    <saml:NameID>user@example.com</saml:NameID>
  </saml:Subject>
  <saml:AttributeStatement>
    <saml:Attribute Name="email">
      <saml:AttributeValue>user@example.com</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="displayName">
      <saml:AttributeValue>John Doe</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="roles">
      <saml:AttributeValue>admin</saml:AttributeValue>
      <saml:AttributeValue>user</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>
\`
`

const oidcFlowSnippet = `
// OpenID Connect (OIDC) - современный протокол SSO поверх OAuth 2.0

// 1. Настройка OIDC клиента
const oidcConfig = {
  client_id: 'my-web-app',
  redirect_uri: 'https://myapp.com/callback',
  response_type: 'code', // Authorization Code Flow
  scope: 'openid profile email',
  authority: 'https://auth.example.com'
}

// 2. Инициация авторизации
const initiateOIDCLogin = () => {
  const state = generateRandomState()
  const nonce = generateRandomNonce()

  // Сохраняем state для защиты от CSRF
  sessionStorage.setItem('oidc_state', state)
  sessionStorage.setItem('oidc_nonce', nonce)

  const params = new URLSearchParams({
    client_id: oidcConfig.client_id,
    redirect_uri: oidcConfig.redirect_uri,
    response_type: oidcConfig.response_type,
    scope: oidcConfig.scope,
    state: state,
    nonce: nonce
  })

  window.location.href =
    \`\${oidcConfig.authority}/authorize?\${params}\`
}

// 3. Обработка callback после авторизации
const handleOIDCCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')

  // Проверяем state (защита от CSRF)
  const savedState = sessionStorage.getItem('oidc_state')
  if (state !== savedState) {
    throw new Error('Invalid state parameter')
  }

  // Обмениваем authorization code на токены
  const tokens = await exchangeCodeForTokens(code)

  return tokens
}

// 4. Обмен code на токены
const exchangeCodeForTokens = async (code) => {
  const response = await fetch(\`\${oidcConfig.authority}/token\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: oidcConfig.redirect_uri,
      client_id: oidcConfig.client_id,
      client_secret: process.env.CLIENT_SECRET // В production через backend
    })
  })

  const tokens = await response.json()

  // Валидируем ID Token
  const user = await validateIDToken(tokens.id_token)

  // Сохраняем токены
  localStorage.setItem('access_token', tokens.access_token)
  localStorage.setItem('refresh_token', tokens.refresh_token)
  localStorage.setItem('id_token', tokens.id_token)

  return { user, tokens }
}

// 5. Валидация ID Token (JWT)
const validateIDToken = async (idToken) => {
  const decoded = decodeJWT(idToken)

  // Проверка nonce
  const savedNonce = sessionStorage.getItem('oidc_nonce')
  if (decoded.nonce !== savedNonce) {
    throw new Error('Invalid nonce')
  }

  // Проверка issuer
  if (decoded.iss !== oidcConfig.authority) {
    throw new Error('Invalid issuer')
  }

  // Проверка audience
  if (decoded.aud !== oidcConfig.client_id) {
    throw new Error('Invalid audience')
  }

  // Проверка срока действия
  if (decoded.exp < Date.now() / 1000) {
    throw new Error('Token expired')
  }

  // Проверка подписи
  const isValid = await verifyJWTSignature(idToken)
  if (!isValid) {
    throw new Error('Invalid signature')
  }

  return {
    id: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture
  }
}

// 6. Использование Access Token для API запросов
const callProtectedAPI = async (endpoint) => {
  const accessToken = localStorage.getItem('access_token')

  const response = await fetch(\`https://api.example.com\${endpoint}\`, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  })

  if (response.status === 401) {
    // Токен истек → используем refresh token
    await refreshAccessToken()
    return callProtectedAPI(endpoint) // Повторяем запрос
  }

  return response.json()
}

// 7. Обновление Access Token через Refresh Token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token')

  const response = await fetch(\`\${oidcConfig.authority}/token\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: oidcConfig.client_id
    })
  })

  const tokens = await response.json()

  localStorage.setItem('access_token', tokens.access_token)
  if (tokens.refresh_token) {
    localStorage.setItem('refresh_token', tokens.refresh_token)
  }
}
`

const casFlowSnippet = `
// CAS (Central Authentication Service) - еще один популярный протокол

// 1. Проверка авторизации в приложении
const checkCASAuth = () => {
  // Проверяем наличие TGC (Ticket Granting Cookie)
  const ticket = new URLSearchParams(window.location.search).get('ticket')

  if (!ticket && !hasValidSession()) {
    // Редирект на CAS сервер для логина
    const serviceURL = encodeURIComponent(window.location.href)
    window.location.href =
      \`https://cas.example.com/login?service=\${serviceURL}\`
  } else if (ticket) {
    // Валидируем полученный ticket
    validateCASTicket(ticket)
  }
}

// 2. Валидация CAS Service Ticket
const validateCASTicket = async (ticket) => {
  const serviceURL = encodeURIComponent(
    window.location.origin + window.location.pathname
  )

  const response = await fetch(
    \`https://cas.example.com/serviceValidate?ticket=\${ticket}&service=\${serviceURL}\`
  )

  const xmlResponse = await response.text()
  const validation = parseCASValidation(xmlResponse)

  if (validation.success) {
    // Создаем сессию для пользователя
    createUserSession({
      username: validation.user,
      attributes: validation.attributes
    })

    // Убираем ticket из URL
    window.history.replaceState({}, '', window.location.pathname)
  } else {
    throw new Error('CAS validation failed')
  }
}

// 3. Пример CAS Validation Response
const casValidationResponse = \`
<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
  <cas:authenticationSuccess>
    <cas:user>john.doe</cas:user>
    <cas:attributes>
      <cas:email>john.doe@example.com</cas:email>
      <cas:firstName>John</cas:firstName>
      <cas:lastName>Doe</cas:lastName>
      <cas:roles>
        <cas:role>admin</cas:role>
        <cas:role>user</cas:role>
      </cas:roles>
    </cas:attributes>
  </cas:authenticationSuccess>
</cas:serviceResponse>
\`

// 4. Single Logout (SLO)
const initiateCASLogout = () => {
  // Очищаем локальную сессию
  clearUserSession()

  // Редирект на CAS logout endpoint
  // Это также выйдет из всех SSO приложений
  window.location.href = 'https://cas.example.com/logout'
}
`

const practicalExampleSnippet = `
// Практический пример: React приложение с SSO через OIDC

import { useEffect, useState } from 'react'
import { UserManager, WebStorageStateStore } from 'oidc-client'

// Конфигурация OIDC
const oidcConfig = {
  authority: 'https://auth.example.com',
  client_id: 'my-react-app',
  redirect_uri: window.location.origin + '/callback',
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile email',
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

// Создаем UserManager
const userManager = new UserManager(oidcConfig)

// Компонент для защищенных роутов
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    userManager.getUser().then(user => {
      if (user && !user.expired) {
        setUser(user)
      } else {
        // Начинаем SSO процесс
        userManager.signinRedirect()
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // Будет редирект на SSO
  }

  return children
}

// Компонент для обработки callback
function CallbackPage() {
  useEffect(() => {
    userManager.signinRedirectCallback()
      .then(user => {
        console.log('User logged in:', user)
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Login error:', error)
      })
  }, [])

  return <div>Processing login...</div>
}

// Компонент для профиля пользователя
function UserProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    userManager.getUser().then(setUser)
  }, [])

  const handleLogout = () => {
    userManager.signoutRedirect()
  }

  if (!user) return null

  return (
    <div>
      <img src={user.profile.picture} alt={user.profile.name} />
      <h2>{user.profile.name}</h2>
      <p>{user.profile.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

// Пример защищенного API запроса
async function callProtectedAPI(endpoint) {
  const user = await userManager.getUser()

  if (!user || user.expired) {
    // Обновляем токен автоматически
    const newUser = await userManager.signinSilent()
    return callProtectedAPI(endpoint) // Повторяем с новым токеном
  }

  const response = await fetch(\`https://api.example.com\${endpoint}\`, {
    headers: {
      'Authorization': \`Bearer \${user.access_token}\`
    }
  })

  return response.json()
}

// Автоматическое обновление токена в фоне
userManager.events.addAccessTokenExpiring(() => {
  console.log('Token expiring, renewing...')
  userManager.signinSilent()
    .catch(error => {
      console.error('Token renewal failed:', error)
      userManager.signoutRedirect()
    })
})

// Обработка событий
userManager.events.addUserLoaded(user => {
  console.log('User loaded:', user)
})

userManager.events.addUserSignedOut(() => {
  console.log('User signed out')
  window.location.href = '/'
})
`

const securitySnippet = `
// Меры безопасности при работе с SSO

// 1. PKCE (Proof Key for Code Exchange) для публичных клиентов
const generatePKCE = () => {
  // Генерируем code_verifier (случайная строка)
  const codeVerifier = generateRandomString(128)

  // Создаем code_challenge (SHA-256 хэш)
  const codeChallenge = base64URLEncode(
    sha256(codeVerifier)
  )

  // Сохраняем code_verifier
  sessionStorage.setItem('pkce_verifier', codeVerifier)

  return {
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  }
}

// Использование PKCE при авторизации
const initiateLoginWithPKCE = () => {
  const pkce = generatePKCE()

  const params = new URLSearchParams({
    client_id: 'my-app',
    redirect_uri: 'https://myapp.com/callback',
    response_type: 'code',
    scope: 'openid profile',
    code_challenge: pkce.code_challenge,
    code_challenge_method: pkce.code_challenge_method,
    state: generateRandomState()
  })

  window.location.href =
    \`https://auth.example.com/authorize?\${params}\`
}

// При обмене code на токен добавляем code_verifier
const exchangeWithPKCE = async (code) => {
  const codeVerifier = sessionStorage.getItem('pkce_verifier')

  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://myapp.com/callback',
      client_id: 'my-app',
      code_verifier: codeVerifier // PKCE проверка
    })
  })

  return response.json()
}

// 2. Защита от CSRF через state parameter
const protectAgainstCSRF = () => {
  // Генерируем уникальный state
  const state = crypto.randomUUID()

  // Сохраняем в session storage
  sessionStorage.setItem('oauth_state', state)

  return state
}

// Проверка state при callback
const validateState = (receivedState) => {
  const savedState = sessionStorage.getItem('oauth_state')

  if (receivedState !== savedState) {
    throw new Error('CSRF attack detected: state mismatch')
  }

  // Очищаем использованный state
  sessionStorage.removeItem('oauth_state')
}

// 3. Валидация токенов
const validateTokenSecurity = (token) => {
  const decoded = decodeJWT(token)

  // Проверка времени жизни
  const now = Math.floor(Date.now() / 1000)
  if (decoded.exp < now) {
    throw new Error('Token expired')
  }

  if (decoded.nbf && decoded.nbf > now) {
    throw new Error('Token not yet valid')
  }

  // Проверка издателя (issuer)
  const trustedIssuers = ['https://auth.example.com']
  if (!trustedIssuers.includes(decoded.iss)) {
    throw new Error('Untrusted issuer')
  }

  // Проверка аудитории (audience)
  if (decoded.aud !== 'my-app') {
    throw new Error('Invalid audience')
  }

  // Проверка подписи (должна выполняться на backend)
  return verifyJWTSignature(token)
}

// 4. Безопасное хранение токенов
const secureTokenStorage = {
  // НЕ храним токены в localStorage для чувствительных данных
  // Используем httpOnly cookies (через backend)

  setTokens: async (tokens) => {
    // Отправляем токены на backend
    await fetch('/api/auth/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tokens),
      credentials: 'include' // Включаем cookies
    })

    // Backend установит httpOnly cookie с refresh token
    // Access token может быть в memory (не в storage)
  },

  getAccessToken: async () => {
    // Получаем access token из backend
    const response = await fetch('/api/auth/token', {
      credentials: 'include'
    })

    const { access_token } = await response.json()
    return access_token
  }
}

// 5. Content Security Policy для защиты от XSS
const cspHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' https://trusted-cdn.com; " +
    "connect-src 'self' https://auth.example.com https://api.example.com; " +
    "frame-ancestors 'none'; " +
    "form-action 'self' https://auth.example.com;"
}
`

const highlightedSSOBasic = ref('')
const highlightedSAMLFlow = ref('')
const highlightedOIDCFlow = ref('')
const highlightedCASFlow = ref('')
const highlightedPracticalExample = ref('')
const highlightedSecurity = ref('')

onMounted(() => {
  highlightedSSOBasic.value = Prism.highlight(ssoBasicSnippet, Prism.languages.javascript, 'javascript')
  highlightedSAMLFlow.value = Prism.highlight(samlFlowSnippet, Prism.languages.javascript, 'javascript')
  highlightedOIDCFlow.value = Prism.highlight(oidcFlowSnippet, Prism.languages.javascript, 'javascript')
  highlightedCASFlow.value = Prism.highlight(casFlowSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExample.value = Prism.highlight(practicalExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurity.value = Prism.highlight(securitySnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              SSO (Single Sign-On): Принципы и Реализация
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Single Sign-On (SSO)</b> — это механизм аутентификации, который позволяет пользователю войти
              в систему один раз и автоматически получить доступ к множеству связанных приложений без
              повторного ввода учетных данных. SSO упрощает управление доступом и улучшает пользовательский опыт.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое SSO?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-account-key</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основная идея</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Один вход</strong> для всех приложений</li>
                    <li><strong>Централизованная</strong> аутентификация</li>
                    <li><strong>Единая точка</strong> управления доступом</li>
                    <li><strong>Автоматическая</strong> авторизация</li>
                    <li><strong>Общая сессия</strong> между приложениями</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-cog-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">Компоненты системы</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Identity Provider (IdP)</strong> — сервер аутентификации</li>
                    <li><strong>Service Provider (SP)</strong> — приложения</li>
                    <li><strong>User Agent</strong> — браузер пользователя</li>
                    <li><strong>Trust Relationship</strong> — доверие между IdP и SP</li>
                    <li><strong>Assertions/Tokens</strong> — доказательства аутентификации</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает SSO: Базовый процесс</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSSOBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Схема работы SSO</h2>

            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Попытка доступа" value="1" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-login</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Проверка сессии" value="2" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-shield-check</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Аутентификация" value="3" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-account-lock</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Выдача токена" value="4" complete color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-key</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Авторизация" value="5" complete color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-check-circle</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Популярные протоколы SSO</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-xml</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">SAML 2.0</h3>
                  <ul class="text-left pl-4">
                    <li><strong>XML-based</strong> протокол</li>
                    <li><strong>Enterprise</strong> стандарт</li>
                    <li><strong>Сложная</strong> настройка</li>
                    <li><strong>Assertions</strong> для передачи данных</li>
                    <li><strong>Популярен</strong> в корпоративном секторе</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shield-lock</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">OpenID Connect</h3>
                  <ul class="text-left pl-4">
                    <li><strong>JSON/REST</strong> протокол</li>
                    <li><strong>Современный</strong> стандарт</li>
                    <li><strong>Простая</strong> интеграция</li>
                    <li><strong>JWT токены</strong></li>
                    <li><strong>Поверх OAuth 2.0</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-ticket</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">CAS</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Ticket-based</strong> система</li>
                    <li><strong>Простой</strong> протокол</li>
                    <li><strong>Легкая</strong> настройка</li>
                    <li><strong>Популярен</strong> в образовании</li>
                    <li><strong>Open source</strong> решения</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">SAML 2.0 — Enterprise протокол</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSAMLFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">OpenID Connect — Современный подход</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOIDCFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CAS — Простой и эффективный</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCASFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример: React с OIDC</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества SSO</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-account-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Для пользователей</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Один пароль</strong> вместо десятков</li>
                    <li><strong>Быстрый доступ</strong> к приложениям</li>
                    <li><strong>Меньше забытых паролей</strong></li>
                    <li><strong>Удобство</strong> использования</li>
                    <li><strong>Единый профиль</strong> пользователя</li>
                    <li><strong>Seamless experience</strong> между приложениями</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-briefcase-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Для владельцев</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Централизованное</strong> управление доступом</li>
                    <li><strong>Снижение нагрузки</strong> на поддержку</li>
                    <li><strong>Улучшенная безопасность</strong></li>
                    <li><strong>Единая точка</strong> аудита</li>
                    <li><strong>Соответствие</strong> compliance требованиям</li>
                    <li><strong>Быстрое отключение</strong> доступа при увольнении</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Безопасность в SSO</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение протоколов SSO</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">SAML 2.0</th>
                <th class="text-left font-weight-bold">OpenID Connect</th>
                <th class="text-left font-weight-bold">CAS</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Формат данных</b></td>
                <td>XML</td>
                <td>JSON/JWT</td>
                <td>Tickets (простой текст)</td>
              </tr>
              <tr>
                <td><b>Сложность</b></td>
                <td class="text-warning">Высокая</td>
                <td class="text-success">Средняя</td>
                <td class="text-success">Низкая</td>
              </tr>
              <tr>
                <td><b>Мобильные приложения</b></td>
                <td class="text-error">Плохо подходит</td>
                <td class="text-success">Отлично</td>
                <td class="text-warning">Средне</td>
              </tr>
              <tr>
                <td><b>API доступ</b></td>
                <td class="text-error">Не подходит</td>
                <td class="text-success">Отлично (OAuth 2.0)</td>
                <td class="text-warning">Ограничено</td>
              </tr>
              <tr>
                <td><b>Популярность</b></td>
                <td>Enterprise</td>
                <td>Современные приложения</td>
                <td>Образование, университеты</td>
              </tr>
              <tr>
                <td><b>Поддержка браузеров</b></td>
                <td class="text-success">Отличная</td>
                <td class="text-success">Отличная</td>
                <td class="text-success">Отличная</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между аутентификацией и авторизацией в SSO?</p>
                <p class="font-weight-regular ma-0">
                  <b>Аутентификация</b> — проверка личности пользователя (кто вы?). Выполняется один раз на
                  Identity Provider. <b>Авторизация</b> — проверка прав доступа (что вам разрешено?).
                  Выполняется каждым приложением на основе токена/assertion от IdP.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как SSO влияет на безопасность?</p>
                <p class="font-weight-regular ma-0">
                  SSO улучшает безопасность через централизованное управление, MFA, единую точку аудита.
                  Но создает single point of failure — компрометация SSO аккаунта дает доступ ко всем
                  приложениям. Важны: сильная аутентификация, мониторинг, своевременное отзыв доступа.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое SLO (Single Logout)?</p>
                <p class="font-weight-regular ma-0">
                  Single Logout — выход из всех приложений одновременно. Когда пользователь выходит из одного
                  приложения, IdP отправляет запросы на выход всем остальным Service Providers. Это сложнее
                  реализовать, чем SSO, так как требует обратной связи со всеми приложениями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем OpenID Connect отличается от OAuth 2.0?</p>
                <p class="font-weight-regular ma-0">
                  OAuth 2.0 — протокол авторизации (делегирование доступа). OpenID Connect — слой аутентификации
                  поверх OAuth 2.0. OIDC добавляет ID Token (JWT) с информацией о пользователе, стандартизированные
                  endpoints для получения данных профиля, и фреймворк для SSO.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое PKCE и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  PKCE (Proof Key for Code Exchange) — расширение OAuth 2.0 для защиты публичных клиентов
                  (SPA, мобильные приложения) от перехвата authorization code. Клиент генерирует случайный
                  code_verifier, отправляет его хэш (code_challenge) при авторизации, и сам verifier при
                  обмене code на токен. Защищает даже если code перехвачен.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать SSO между приложениями на разных доменах?</p>
                <p class="font-weight-regular ma-0">
                  Используются протоколы SSO (SAML, OIDC, CAS), которые работают через редиректы и не зависят
                  от домена. IdP может быть на своем домене, приложения — на разных. Токены/assertions передаются
                  через URL parameters или POST requests. Cookies IdP работают только для его домена, но
                  токены валидны для всех доверенных приложений.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Популярные SSO решения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Enterprise</h3>
                  <ul class="pl-4">
                    <li><strong>Okta</strong> — облачный IdP</li>
                    <li><strong>Azure AD</strong> — Microsoft</li>
                    <li><strong>Auth0</strong> — developer-friendly</li>
                    <li><strong>OneLogin</strong> — enterprise SSO</li>
                    <li><strong>Ping Identity</strong> — enterprise</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Open Source</h3>
                  <ul class="pl-4">
                    <li><strong>Keycloak</strong> — Red Hat</li>
                    <li><strong>Apereo CAS</strong> — CAS протокол</li>
                    <li><strong>Shibboleth</strong> — SAML IdP</li>
                    <li><strong>Gluu</strong> — enterprise IdP</li>
                    <li><strong>WSO2 Identity Server</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Social Login</h3>
                  <ul class="pl-4">
                    <li><strong>Google Identity</strong> — OIDC</li>
                    <li><strong>Facebook Login</strong> — OAuth</li>
                    <li><strong>GitHub OAuth</strong></li>
                    <li><strong>Apple Sign In</strong></li>
                    <li><strong>LinkedIn OAuth</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать HTTPS везде</li>
                    <li>Включить MFA (2FA)</li>
                    <li>Валидировать все токены</li>
                    <li>Использовать PKCE для SPA</li>
                    <li>Короткий срок жизни токенов</li>
                    <li>Логировать все аутентификации</li>
                    <li>Регулярно ротировать ключи</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Хранение токенов в localStorage (для чувствительных данных)</li>
                    <li>Долгоживущие access tokens</li>
                    <li>Игнорирование валидации state</li>
                    <li>Отсутствие CSRF защиты</li>
                    <li>Передача токенов в URL</li>
                    <li>Самописные crypto алгоритмы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте готовые библиотеки</li>
                    <li>Тестируйте SLO процесс</li>
                    <li>Мониторьте подозрительную активность</li>
                    <li>Документируйте интеграции</li>
                    <li>Настройте автоматическое обновление токенов</li>
                    <li>Планируйте отзыв доступа</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>SSO (Single Sign-On)</b> — это механизм централизованной аутентификации, позволяющий пользователю
              войти один раз и получить доступ к множеству приложений. Основные протоколы: <b>SAML 2.0</b> (enterprise,
              XML-based), <b>OpenID Connect</b> (современный, JSON/JWT), <b>CAS</b> (простой, ticket-based).
              SSO улучшает UX и безопасность, но требует тщательной реализации защитных механизмов (PKCE, state validation,
              token security). Процесс включает: редирект на IdP → аутентификацию → получение токена → валидацию → авторизацию.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://openid.net/connect/"
                target="_blank"
                class="mr-2">
                OpenID Connect
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html"
                target="_blank">
                SAML 2.0
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
