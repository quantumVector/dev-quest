<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const xssExampleSnippet = `
// ❌ УЯЗВИМЫЙ КОД - Reflected XSS
// URL: https://example.com/search?q=<script>alert('XSS')<\/script>

// Серверный код (Node.js/Express)
app.get('/search', (req, res) => {
const query = req.query.q; // Пользовательский ввод

// ОПАСНО! Вставляем без санитизации
res.send(\`
<h1>Результаты поиска для: \${query}</h1>
<p>Поиск по запросу: \${query}</p>
\`);
});

// Клиентский код - Stored XSS
function displayComment(comment) {
// ОПАСНО! innerHTML с пользовательскими данными
document.getElementById('comments').innerHTML += \`
<div class="comment">
<p>\${comment.text}</p>
<span>Автор: \${comment.author}</span>
</div>
\`;
}

// DOM-based XSS
const userInput = window.location.hash.substring(1);
// ОПАСНО! Прямая вставка в DOM
document.getElementById('content').innerHTML = userInput;

// Примеры вредоносных payload
const maliciousPayloads = [
'<script>alert("XSS")<\/script>',
'<img src=x onerror="alert(\\'XSS\\')">',
'<svg onload="alert(\\'XSS\\')">',
'javascript:alert("XSS")',
'<iframe src="javascript:alert(\\'XSS\\')"></iframe>'
];
`

const xssPreventionSnippet = `
// ✅ ЗАЩИТА ОТ XSS

// 1. Экранирование HTML (серверная сторона)
function escapeHtml(unsafe) {
return unsafe
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}

// Node.js/Express с защитой
app.get('/search', (req, res) => {
const query = escapeHtml(req.query.q);

res.send(\`
<h1>Результаты поиска для: \${query}</h1>
\`);
});

// 2. Content Security Policy (CSP)
app.use((req, res, next) => {
res.setHeader(
'Content-Security-Policy',
"default-src 'self'; " +
"script-src 'self' 'nonce-{random}'; " +
"style-src 'self' 'unsafe-inline'; " +
"img-src 'self' data: https:; " +
"font-src 'self'; " +
"connect-src 'self'; " +
"frame-ancestors 'none';"
);
next();
});

// 3. Использование textContent вместо innerHTML
function displayCommentSafe(comment) {
const commentDiv = document.createElement('div');
commentDiv.className = 'comment';

const textP = document.createElement('p');
textP.textContent = comment.text; // Безопасно!

const authorSpan = document.createElement('span');
authorSpan.textContent = \`Автор: \${comment.author}\`;

commentDiv.appendChild(textP);
commentDiv.appendChild(authorSpan);

document.getElementById('comments').appendChild(commentDiv);
}

// 4. DOMPurify для санитизации HTML
import DOMPurify from 'dompurify';

function displayRichContent(html) {
const clean = DOMPurify.sanitize(html, {
ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
ALLOWED_ATTR: ['href']
});

document.getElementById('content').innerHTML = clean;
}

// 5. React - автоматическое экранирование
function SafeComment({ comment }) {
return (
<div className="comment">
  {/* React автоматически экранирует */}
  <p>{comment.text}</p>
  <span>Автор: {comment.author}</span>
</div>
);
}

// 6. Vue - автоматическое экранирование
// <template>
  //   <div class="comment">
  //     <!-- Vue автоматически экранирует -->
  //     <p>{{ comment.text }}</p>
  //     <span>Автор: {{ comment.author }}</span>
  //   </div>
  // </template>

// 7. Валидация и санитизация на сервере
const validator = require('validator');

app.post('/comment', (req, res) => {
let { text, author } = req.body;

// Валидация
if (!validator.isLength(text, { min: 1, max: 500 })) {
return res.status(400).json({ error: 'Invalid text length' });
}

// Санитизация
text = validator.escape(text);
author = validator.escape(author);

// Сохранение в БД
saveComment({ text, author });

res.json({ success: true });
});
`

const csrfExampleSnippet = `
// ❌ УЯЗВИМЫЙ КОД - CSRF атака

// Серверный код без защиты
app.post('/transfer-money', (req, res) => {
const { to, amount } = req.body;
const userId = req.session.userId; // Пользователь авторизован

// ОПАСНО! Нет проверки origin запроса
transferMoney(userId, to, amount);

res.json({ success: true });
});

// Вредоносный сайт attacker.com
// HTML форма автоматически отправляется
\`
<!DOCTYPE html>
<html>
<body>
<h1>Вы выиграли приз!</h1>
<form id="malicious" method="POST" action="https://bank.com/transfer-money">
  <input type="hidden" name="to" value="attacker_account">
  <input type="hidden" name="amount" value="10000">
</form>
<script>
  // Автоматическая отправка формы
  document.getElementById('malicious').submit();
<\/script>
</body>
</html>
\`

// Другие примеры CSRF
\`
<!-- Атака через img тег (GET запрос) -->
<img src="https://bank.com/delete-account?confirm=yes">

<!-- Атака через iframe -->
<iframe style="display:none"
        src="https://bank.com/change-email?email=attacker@evil.com">
</iframe>

<!-- Атака через fetch (современные браузеры блокируют без CORS) -->
<script>
  fetch('https://bank.com/transfer-money', {
    method: 'POST',
    credentials: 'include', // Включает cookies
    body: JSON.stringify({ to: 'attacker', amount: 10000 })
  });
<\/script>
\`
`

const csrfPreventionSnippet = `
// ✅ ЗАЩИТА ОТ CSRF

// 1. CSRF Token (Synchronizer Token Pattern)
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Middleware для генерации CSRF токенов
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Отправка токена клиенту
app.get('/form', (req, res) => {
res.render('form', { csrfToken: req.csrfToken() });
});

// HTML форма с токеном
\`
<form method="POST" action="/transfer-money">
  <input type="hidden" name="_csrf" value="{{ csrfToken }}">
  <input type="text" name="to" placeholder="Recipient">
  <input type="number" name="amount" placeholder="Amount">
  <button type="submit">Transfer</button>
</form>
\`

// Проверка токена на сервере
app.post('/transfer-money', (req, res) => {
// Middleware автоматически проверяет _csrf
const { to, amount } = req.body;
const userId = req.session.userId;

transferMoney(userId, to, amount);
res.json({ success: true });
});

// 2. SameSite Cookie атрибут
app.use(session({
secret: 'your-secret-key',
cookie: {
httpOnly: true,
secure: true, // Только HTTPS
sameSite: 'strict' // или 'lax'
}
}));

// 3. Double Submit Cookie Pattern
function generateCSRFToken() {
return crypto.randomBytes(32).toString('hex');
}

app.use((req, res, next) => {
if (!req.cookies.csrfToken) {
const token = generateCSRFToken();
res.cookie('csrfToken', token, {
httpOnly: false, // Доступно для JS
secure: true,
sameSite: 'strict'
});
req.csrfToken = token;
} else {
req.csrfToken = req.cookies.csrfToken;
}
next();
});

// Клиентская сторона - добавление токена в запросы
function getCookie(name) {
const value = \`; \${document.cookie}\`;
const parts = value.split(\`; \${name}=\`);
if (parts.length === 2) return parts.pop().split(';').shift();
}

fetch('/api/transfer', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'X-CSRF-Token': getCookie('csrfToken')
},
body: JSON.stringify({ to: 'recipient', amount: 100 })
});

// 4. Origin и Referer проверка
app.use((req, res, next) => {
const allowedOrigins = ['https://yourdomain.com'];
const origin = req.get('origin') || req.get('referer');

if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
if (!origin || !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
return res.status(403).json({ error: 'Forbidden: Invalid origin' });
}
}

next();
});

// 5. Custom Request Headers
// Клиент
fetch('/api/transfer', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'X-Requested-With': 'XMLHttpRequest' // Custom header
},
body: JSON.stringify({ to: 'recipient', amount: 100 })
});

// Сервер
app.use((req, res, next) => {
if (req.method !== 'GET' && !req.get('X-Requested-With')) {
return res.status(403).json({ error: 'Forbidden: Missing custom header' });
}
next();
});

// 6. React + CSRF Token
function TransferForm() {
const [csrfToken, setCsrfToken] = useState('');

useEffect(() => {
// Получение токена
fetch('/api/csrf-token')
.then(r => r.json())
.then(data => setCsrfToken(data.token));
}, []);

const handleSubmit = async (e) => {
e.preventDefault();

await fetch('/api/transfer', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'X-CSRF-Token': csrfToken
},
body: JSON.stringify({
to: e.target.to.value,
amount: e.target.amount.value
})
});
};

return (
<form onSubmit={handleSubmit}>
  <input type="text" name="to" />
  <input type="number" name="amount" />
  <button type="submit">Transfer</button>
</form>
);
}
`

const securityHeadersSnippet = `
// Безопасные HTTP заголовки

// 1. Content Security Policy (CSP)
app.use((req, res, next) => {
res.setHeader(
'Content-Security-Policy',
[
"default-src 'self'",
"script-src 'self' 'nonce-{random}' https://trusted-cdn.com",
"style-src 'self' 'unsafe-inline'",
"img-src 'self' data: https:",
"font-src 'self'",
"connect-src 'self' https://api.example.com",
"frame-ancestors 'none'",
"base-uri 'self'",
"form-action 'self'",
"upgrade-insecure-requests"
].join('; ')
);
next();
});

// CSP с nonce для inline скриптов
const crypto = require('crypto');

app.use((req, res, next) => {
res.locals.nonce = crypto.randomBytes(16).toString('base64');
res.setHeader(
'Content-Security-Policy',
\`script-src 'self' 'nonce-\${res.locals.nonce}'\`
);
next();
});

// HTML с nonce
\`
<script nonce="{{ nonce }}">
  console.log('This script is allowed');
<\/script>
\`

// 2. X-Frame-Options (защита от Clickjacking)
app.use((req, res, next) => {
res.setHeader('X-Frame-Options', 'DENY');
// или 'SAMEORIGIN' для разрешения фреймов с того же домена
next();
});

// 3. X-Content-Type-Options
app.use((req, res, next) => {
res.setHeader('X-Content-Type-Options', 'nosniff');
next();
});

// 4. Referrer-Policy
app.use((req, res, next) => {
res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
next();
});

// 5. Permissions-Policy (Feature-Policy)
app.use((req, res, next) => {
res.setHeader(
'Permissions-Policy',
'geolocation=(), microphone=(), camera=()'
);
next();
});

// 6. Strict-Transport-Security (HSTS)
app.use((req, res, next) => {
res.setHeader(
'Strict-Transport-Security',
'max-age=31536000; includeSubDomains; preload'
);
next();
});

// 7. X-XSS-Protection (устаревший, но все еще используется)
app.use((req, res, next) => {
res.setHeader('X-XSS-Protection', '1; mode=block');
next();
});

// Использование helmet.js для всех заголовков
const helmet = require('helmet');

app.use(helmet({
contentSecurityPolicy: {
directives: {
defaultSrc: ["'self'"],
scriptSrc: ["'self'", "'nonce-{random}'"],
styleSrc: ["'self'", "'unsafe-inline'"],
imgSrc: ["'self'", "data:", "https:"],
connectSrc: ["'self'"],
fontSrc: ["'self'"],
objectSrc: ["'none'"],
mediaSrc: ["'self'"],
frameSrc: ["'none'"],
},
},
crossOriginEmbedderPolicy: true,
crossOriginOpenerPolicy: true,
crossOriginResourcePolicy: { policy: "same-site" },
dnsPrefetchControl: true,
frameguard: { action: 'deny' },
hidePoweredBy: true,
hsts: {
maxAge: 31536000,
includeSubDomains: true,
preload: true
},
ieNoOpen: true,
noSniff: true,
referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
xssFilter: true,
}));

// Nginx конфигурация для заголовков
\`
# nginx.conf
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline';" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
\`
`

const detectionToolsSnippet = `
// Инструменты для обнаружения XSS/CSRF

// 1. ESLint плагины для React
// .eslintrc.js
module.exports = {
plugins: ['react', 'security'],
rules: {
'react/no-danger': 'error', // Запретить dangerouslySetInnerHTML
'security/detect-unsafe-regex': 'error',
'security/detect-non-literal-regexp': 'warn',
'security/detect-object-injection': 'warn'
}
};

// 2. Автоматическое тестирование с OWASP ZAP
// zap-scan.js
const ZapClient = require('zaproxy');

async function scanForVulnerabilities(targetUrl) {
const zaproxy = new ZapClient({
apiKey: process.env.ZAP_API_KEY,
proxy: {
host: 'localhost',
port: 8080
}
});

// Запуск spider для обнаружения страниц
await zaproxy.spider.scan(targetUrl);

// Активное сканирование на XSS и CSRF
const scanId = await zaproxy.ascan.scan(targetUrl);

// Получение результатов
const alerts = await zaproxy.core.alerts(targetUrl);

return alerts.filter(alert =>
alert.risk === 'High' || alert.risk === 'Medium'
);
}

// 3. Тестирование CSP с помощью CSP Evaluator
\`
<!-- Добавление CSP репортинга -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; report-uri /csp-report">
\`

// Обработка CSP отчетов
app.post('/csp-report', express.json({ type: 'application/csp-report' }), (req, res) => {
const report = req.body['csp-report'];

console.error('CSP Violation:', {
documentURI: report['document-uri'],
violatedDirective: report['violated-directive'],
blockedURI: report['blocked-uri'],
sourceFile: report['source-file']
});

// Отправка в систему мониторинга
sendToMonitoring(report);

res.status(204).send();
});

// 4. Sanitization библиотеки
// Сравнение популярных библиотек

// DOMPurify
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(dirtyHtml, {
ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
ALLOWED_ATTR: ['href']
});

// js-xss
import xss from 'xss';

const clean = xss(dirtyHtml, {
whiteList: {
a: ['href', 'title', 'target'],
img: ['src', 'alt']
}
});

// sanitize-html
import sanitizeHtml from 'sanitize-html';

const clean = sanitizeHtml(dirtyHtml, {
allowedTags: ['b', 'i', 'em', 'strong', 'a'],
allowedAttributes: {
'a': ['href']
}
});

// 5. Playwright тесты для XSS
import { test, expect } from '@playwright/test';

test('XSS protection in comment form', async ({ page }) => {
await page.goto('http://localhost:3000/comments');

const xssPayload = '<script>alert("XSS")<\/script>';

await page.fill('#comment-input', xssPayload);
await page.click('#submit-button');

// Проверяем, что скрипт не выполнился
const alertDialogPromise = page.waitForEvent('dialog', { timeout: 1000 })
.catch(() => null);

const dialog = await alertDialogPromise;
expect(dialog).toBeNull(); // Alert не должен появиться

// Проверяем, что HTML экранирован
const commentText = await page.textContent('.comment:last-child');
expect(commentText).toContain('<script>');
expect(commentText).not.toContain('XSS');
});

// 6. Jest тесты для CSRF защиты
import request from 'supertest';
import app from './app';

describe('CSRF Protection', () => {
  test('POST without CSRF token should fail', async () => {
    const response = await request(app)
      .post('/api/transfer')
      .send({ to: 'attacker', amount: 1000 });

    expect(response.status).toBe(403);
  });

  test('POST with valid CSRF token should succeed', async () => {
    // Получение токена
    const tokenResponse = await request(app).get('/api/csrf-token');
    const token = tokenResponse.body.token;

    // Запрос с токеном
    const response = await request(app)
      .post('/api/transfer')
      .set('X-CSRF-Token', token)
      .send({ to: 'recipient', amount: 100 });

    expect(response.status).toBe(200);
  });
});

// 7. Burp Suite скрипт для автоматизации
\`
# Burp Suite Intruder payload для XSS
<script>alert(1)<\/script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
  javascript:alert(1)
  <iframe src=javascript:alert(1)>
    \`

    // 8. CSRF тест с curl
    \`bash
    # Попытка CSRF атаки
    curl -X POST https://example.com/transfer \
    -H "Content-Type: application/json" \
    -d '{"to":"attacker","amount":1000}' \
    --cookie "session=valid_session_cookie"

    # Должно вернуть 403 Forbidden без CSRF токена
    \`
    `

    const realWorldExampleSnippet = `
    // Полный пример защищенного приложения

    // server.js
    const express = require('express');
    const helmet = require('helmet');
    const csrf = require('csurf');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const DOMPurify = require('isomorphic-dompurify');
    const validator = require('validator');

    const app = express();

    // 1. Безопасные заголовки
    app.use(helmet({
    contentSecurityPolicy: {
    directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    },
    },
    }));

    // 2. Парсинг и сессии
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
    }
    }));

    // 3. CSRF защита
    const csrfProtection = csrf({ cookie: true });

    // 4. Rate limiting
    const rateLimit = require('express-rate-limit');
    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
    });
    app.use(limiter);

    // 5. API endpoints с защитой

    // Получение CSRF токена
    app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ token: req.csrfToken() });
    });

    // Безопасное создание комментария
    app.post('/api/comments', csrfProtection, async (req, res) => {
    try {
    let { text, author } = req.body;

    // Валидация
    if (!validator.isLength(text, { min: 1, max: 500 })) {
    return res.status(400).json({ error: 'Invalid text length' });
    }

    if (!validator.isLength(author, { min: 1, max: 50 })) {
    return res.status(400).json({ error: 'Invalid author length' });
    }

    // Санитизация
    text = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
    });
    author = validator.escape(author);

    // Сохранение в БД
    const comment = await db.comments.create({
    text,
    author,
    userId: req.session.userId,
    createdAt: new Date()
    });

    res.json({ success: true, comment });
    } catch (error) {
    console.error('Comment creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    // Безопасный перевод денег
    app.post('/api/transfer', csrfProtection, async (req, res) => {
    try {
    const { to, amount } = req.body;
    const userId = req.session.userId;

    // Проверка авторизации
    if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
    }

    // Валидация
    if (!validator.isNumeric(amount.toString()) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!validator.isAlphanumeric(to)) {
    return res.status(400).json({ error: 'Invalid recipient' });
    }

    // Проверка баланса
    const balance = await getBalance(userId);
    if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Выполнение перевода
    await transferMoney(userId, to, amount);

    res.json({ success: true });
    } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    // 6. Middleware для логирования подозрительной активности
    app.use((req, res, next) => {
    const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i
    ];

    const checkString = JSON.stringify(req.body) + JSON.stringify(req.query);

    if (suspiciousPatterns.some(pattern => pattern.test(checkString))) {
    console.warn('Suspicious request detected:', {
    ip: req.ip,
    url: req.url,
    body: req.body,
    query: req.query
    });
    }

    next();
    });

    // React компонент с защитой
    function CommentForm() {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
    // Получение CSRF токена
    fetch('/api/csrf-token')
    .then(r => r.json())
    .then(data => setCsrfToken(data.token));
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Клиентская валидация
    if (text.length < 1 || text.length > 500) {
    alert('Text must be 1-500 characters');
    return;
    }

    try {
    const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ text, author })
    });

    if (response.ok) {
    setText('');
    setAuthor('');
    // Обновление списка комментариев
    } else {
    const error = await response.json();
    alert(error.error);
    }
    } catch (error) {
    console.error('Submission error:', error);
    alert('Failed to submit comment');
    }
    };

    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        maxLength={50}
        required
        />
      </div>
      <div>
        <label htmlFor="text">Comment:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        maxLength={500}
        required
        />
        </div>
        <button type="submit">Submit</button>
        </form>
        );
        }
        `

        const highlightedXssExample = ref('')
        const highlightedXssPrevention = ref('')
        const highlightedCsrfExample = ref('')
        const highlightedCsrfPrevention = ref('')
        const highlightedSecurityHeaders = ref('')
        const highlightedDetectionTools = ref('')
        const highlightedRealWorldExample = ref('')

        onMounted(() => {
        highlightedXssExample.value = Prism.highlight(xssExampleSnippet, Prism.languages.javascript, 'javascript')
        highlightedXssPrevention.value = Prism.highlight(xssPreventionSnippet, Prism.languages.javascript, 'javascript')
        highlightedCsrfExample.value = Prism.highlight(csrfExampleSnippet, Prism.languages.javascript, 'javascript')
        highlightedCsrfPrevention.value = Prism.highlight(csrfPreventionSnippet, Prism.languages.javascript, 'javascript')
        highlightedSecurityHeaders.value = Prism.highlight(securityHeadersSnippet, Prism.languages.javascript, 'javascript')
        highlightedDetectionTools.value = Prism.highlight(detectionToolsSnippet, Prism.languages.javascript, 'javascript')
        highlightedRealWorldExample.value = Prism.highlight(realWorldExampleSnippet, Prism.languages.javascript, 'javascript')
        })

        </script>

        <template>
        <v-app>
        <v-main>
        <v-container>
        <v-row justify="center">
        <v-col lg="10">
        <h1 class="text-h4 font-weight-bold mb-6">
        XSS и CSRF: Угрозы и защита веб-приложений
        </h1>

        <p class="font-weight-regular mb-6">
        <b>XSS (Cross-Site Scripting)</b> и <b>CSRF (Cross-Site Request Forgery)</b> — две наиболее
        распространенные уязвимости веб-приложений. XSS позволяет внедрить вредоносный код на страницу,
        а CSRF — выполнить действия от имени пользователя без его ведома. Понимание различий и методов
        защиты критически важно для безопасности приложений.
        </p>

        <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия XSS и CSRF</h2>
        <v-table density="comfortable" class="mb-8">
        <thead>
        <tr>
        <th class="text-left font-weight-bold">Характеристика</th>
        <th class="text-left font-weight-bold">XSS</th>
        <th class="text-left font-weight-bold">CSRF</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td class="pt-2 pb-2"><b>Цель атаки</b></td>
        <td class="pt-2 pb-2">Внедрение вредоносного кода</td>
        <td class="pt-2 pb-2">Выполнение действий от имени пользователя</td>
        </tr>
        <tr>
        <td class="pt-2 pb-2"><b>Атакуемая сторона</b></td>
        <td class="pt-2 pb-2">Клиент (браузер пользователя)</td>
        <td class="pt-2 pb-2">Сервер (через браузер пользователя)</td>
        </tr>
        <tr>
        <td class="pt-2 pb-2"><b>Требуется авторизация</b></td>
        <td class="pt-2 pb-2">Нет</td>
        <td class="pt-2 pb-2">Да (использует активную сессию)</td>
        </tr>
        <tr>
        <td class="pt-2 pb-2"><b>Метод атаки</b></td>
        <td class="pt-2 pb-2">JavaScript инъекция</td>
        <td class="pt-2 pb-2">Подделка HTTP запроса</td>
        </tr>
        <tr>
        <td class="pt-2 pb-2"><b>Защита</b></td>
        <td class="pt-2 pb-2">Санитизация, CSP, экранирование</td>
        <td class="pt-2 pb-2">CSRF токены, SameSite cookies</td>
        </tr>
        </tbody>
        </v-table>

        <h2 class="text-h5 font-weight-bold mb-3">XSS (Cross-Site Scripting)</h2>

        <v-row class="mb-6">
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100 text-center">
        <v-icon size="large" color="error" class="mb-2">mdi-script-text</v-icon>
        <h3 class="text-h6 font-weight-bold mb-2">Reflected XSS</h3>
        <p class="text-body-2">
        Вредоносный код в URL параметрах немедленно отражается на странице.
        Требует перехода по специальной ссылке.
        </p>
        </v-card>
        </v-col>
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100 text-center">
        <v-icon size="large" color="warning" class="mb-2">mdi-database-alert</v-icon>
        <h3 class="text-h6 font-weight-bold mb-2">Stored XSS</h3>
        <p class="text-body-2">
        Вредоносный код сохраняется в БД и выполняется у всех пользователей,
        просматривающих зараженный контент.
        </p>
        </v-card>
        </v-col>
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100 text-center">
        <v-icon size="large" color="info" class="mb-2">mdi-code-tags</v-icon>
        <h3 class="text-h6 font-weight-bold mb-2">DOM-based XSS</h3>
        <p class="text-body-2">
        Уязвимость в клиентском JavaScript коде, манипулирующем DOM.
        Серверная сторона не задействована.
        </p>
        </v-card>
        </v-col>
        </v-row>

        <h3 class="text-h6 font-weight-bold mb-3">❌ Примеры XSS уязвимостей</h3>
        <v-alert color="error" class="mb-4">
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        <strong>Опасно:</strong> Никогда не вставляйте пользовательский ввод напрямую в HTML без санитизации!
        </v-alert>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedXssExample"></code></pre>

        <h3 class="text-h6 font-weight-bold mb-3">✅ Защита от XSS атак</h3>
        <v-alert color="success" class="mb-4">
        <v-icon class="mr-2">mdi-shield-check</v-icon>
        <strong>Правильно:</strong> Всегда экранируйте пользовательский ввод и используйте CSP заголовки
        </v-alert>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedXssPrevention"></code></pre>

        <h2 class="text-h5 font-weight-bold mb-3">CSRF (Cross-Site Request Forgery)</h2>

        <v-row class="mb-6">
        <v-col cols="12" md="6">
        <v-card class="pa-4 h-100">
        <div class="d-flex align-center mb-3">
        <v-icon size="large" color="error" class="mr-2">mdi-account-alert</v-icon>
        <h3 class="text-h6 font-weight-bold">Как работает CSRF</h3>
        </div>
        <ol class="pl-4">
        <li>Пользователь авторизован на сайте bank.com</li>
        <li>Пользователь посещает вредоносный сайт attacker.com</li>
        <li>Attacker.com отправляет запрос на bank.com</li>
        <li>Браузер автоматически добавляет cookies</li>
        <li>Сервер выполняет действие от имени пользователя</li>
        </ol>
        </v-card>
        </v-col>
        <v-col cols="12" md="6">
        <v-card class="pa-4 h-100">
        <div class="d-flex align-center mb-3">
        <v-icon size="large" color="warning" class="mr-2">mdi-account-lock</v-icon>
        <h3 class="text-h6 font-weight-bold">Угрозы CSRF</h3>
        </div>
        <ul class="pl-4">
        <li>Перевод денег</li>
        <li>Изменение пароля/email</li>
        <li>Удаление аккаунта</li>
        <li>Изменение настроек</li>
        <li>Публикация контента</li>
        <li>Подписка на рассылки</li>
        </ul>
        </v-card>
        </v-col>
        </v-row>

        <h3 class="text-h6 font-weight-bold mb-3">❌ Примеры CSRF атак</h3>
        <v-alert color="error" class="mb-4">
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        <strong>Опасно:</strong> Важные действия без проверки origin запроса уязвимы для CSRF!
        </v-alert>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCsrfExample"></code></pre>

        <h3 class="text-h6 font-weight-bold mb-3">✅ Защита от CSRF атак</h3>
        <v-alert color="success" class="mb-4">
        <v-icon class="mr-2">mdi-shield-check</v-icon>
        <strong>Правильно:</strong> Используйте CSRF токены и SameSite cookie атрибут
        </v-alert>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCsrfPrevention"></code></pre>

        <h2 class="text-h5 font-weight-bold mb-3">Безопасные HTTP заголовки</h2>
        <p class="font-weight-regular mb-4">
        Правильная настройка HTTP заголовков критична для защиты от XSS, CSRF и других атак.
        </p>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSecurityHeaders"></code></pre>

        <h2 class="text-h5 font-weight-bold mb-3">Сравнение безопасных заголовков</h2>
        <v-table density="comfortable" class="mb-8">
        <thead>
        <tr>
        <th class="text-left font-weight-bold">Заголовок</th>
        <th class="text-left font-weight-bold">Защита от</th>
        <th class="text-left font-weight-bold">Назначение</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td><code>Content-Security-Policy</code></td>
        <td class="text-error">XSS</td>
        <td>Контролирует источники загрузки ресурсов</td>
        </tr>
        <tr>
        <td><code>X-Frame-Options</code></td>
        <td class="text-error">Clickjacking, некоторые CSRF</td>
        <td>Запрещает отображение сайта во фреймах</td>
        </tr>
        <tr>
        <td><code>X-Content-Type-Options</code></td>
        <td class="text-error">XSS</td>
        <td>Запрещает MIME-sniffing</td>
        </tr>
        <tr>
        <td><code>Referrer-Policy</code></td>
        <td class="text-warning">Утечка данных</td>
        <td>Контролирует передачу Referer заголовка</td>
        </tr>
        <tr>
        <td><code>Strict-Transport-Security</code></td>
        <td class="text-warning">MITM атаки</td>
        <td>Принудительное использование HTTPS</td>
        </tr>
        <tr>
        <td><code>Permissions-Policy</code></td>
        <td class="text-info">Различные угрозы</td>
        <td>Контроль доступа к browser API</td>
        </tr>
        </tbody>
        </v-table>

        <h2 class="text-h5 font-weight-bold mb-3">Инструменты обнаружения и предотвращения</h2>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDetectionTools"></code></pre>

        <h2 class="text-h5 font-weight-bold mb-3">Сравнение инструментов</h2>
        <v-row class="mb-8">
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100">
        <h3 class="text-h6 font-weight-bold mb-2">Статический анализ</h3>
        <ul class="pl-4">
        <li><b>ESLint</b> — анализ кода</li>
        <li><b>SonarQube</b> — комплексный анализ</li>
        <li><b>Semgrep</b> — поиск паттернов</li>
        <li><b>CodeQL</b> — GitHub анализ</li>
        </ul>
        </v-card>
        </v-col>
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100">
        <h3 class="text-h6 font-weight-bold mb-2">Динамическое тестирование</h3>
        <ul class="pl-4">
        <li><b>OWASP ZAP</b> — сканер уязвимостей</li>
        <li><b>Burp Suite</b> — пентест платформа</li>
        <li><b>Acunetix</b> — веб-сканер</li>
        <li><b>Netsparker</b> — автоматизация</li>
        </ul>
        </v-card>
        </v-col>
        <v-col cols="12" md="4">
        <v-card class="pa-4 h-100">
        <h3 class="text-h6 font-weight-bold mb-2">Runtime защита</h3>
        <ul class="pl-4">
        <li><b>DOMPurify</b> — санитизация HTML</li>
        <li><b>helmet.js</b> — безопасные заголовки</li>
        <li><b>csurf</b> — CSRF токены</li>
        <li><b>express-validator</b> — валидация</li>
        </ul>
        </v-card>
        </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mb-3">Полный пример защищенного приложения</h2>
        <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorldExample"></code></pre>

        <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
        <ol class="ol-list mb-8">
        <li class="mb-4">
        <p class="font-weight-bold mb-1">В чем главное отличие XSS от CSRF?</p>
        <p class="font-weight-regular ma-0">
        XSS внедряет вредоносный код, который выполняется в браузере пользователя, атакуя клиента.
        CSRF подделывает запросы от имени авторизованного пользователя, атакуя сервер через браузер.
        XSS не требует авторизации, CSRF — требует активную сессию.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Какие типы XSS существуют и чем они отличаются?</p>
        <p class="font-weight-regular ma-0">
        <b>Reflected XSS</b> — код в URL, выполняется сразу. <b>Stored XSS</b> — код в БД,
        выполняется у всех пользователей. <b>DOM-based XSS</b> — уязвимость в клиентском JS,
        серверная сторона не задействована. Stored наиболее опасен из-за масштаба.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Как Content Security Policy защищает от XSS?</p>
        <p class="font-weight-regular ma-0">
        CSP контролирует источники, откуда можно загружать скрипты, стили и другие ресурсы.
        Это блокирует выполнение inline скриптов и загрузку с недоверенных доменов.
        Использование nonce или hash для разрешения конкретных скриптов.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Почему CSRF токены должны быть уникальными для каждой сессии?</p>
        <p class="font-weight-regular ma-0">
        Если токен предсказуем или одинаков для всех пользователей, атакующий может его узнать
        и использовать. Уникальность на сессию и непредсказуемость (криптографическая случайность)
        делают токен невозможным для подделки.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Что такое SameSite cookie и как это защищает от CSRF?</p>
        <p class="font-weight-regular ma-0">
        SameSite атрибут контролирует отправку cookies в cross-site запросах.
        <code>Strict</code> — cookies не отправляются вообще при переходе с других сайтов.
        <code>Lax</code> — отправляются только для безопасных методов (GET) при навигации.
        Это блокирует CSRF атаки автоматически.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Почему React и Vue защищают от XSS, но не на 100%?</p>
        <p class="font-weight-regular ma-0">
        Фреймворки автоматически экранируют вывод в шаблонах. Но
        <code>dangerouslySetInnerHTML</code> в React или <code>v-html</code> в Vue обходят защиту.
        Также уязвимы атрибуты <code>href="javascript:"</code> и некоторые event handlers.
        </p>
        </li>
        <li class="mb-4">
        <p class="font-weight-bold mb-1">Как тестировать приложение на XSS и CSRF?</p>
        <p class="font-weight-regular ma-0">
        <b>XSS:</b> OWASP ZAP, Burp Suite, ручные payload в формах/URL. Проверка CSP через
        DevTools. <b>CSRF:</b> попытка отправить запрос с другого домена без токена,
        проверка SameSite cookies. Автоматизация через Playwright/Cypress.
        </p>
        </li>
        </ol>

        <h2 class="text-h5 font-weight-bold mb-3">Чек-лист безопасности</h2>
        <v-row class="mb-8">
        <v-col cols="12" md="6">
        <v-card class="pa-4 h-100">
        <h3 class="text-h6 font-weight-bold mb-2">✅ Защита от XSS</h3>
        <ul class="pl-4">
        <li>☑ Экранирование всего пользовательского ввода</li>
        <li>☑ Использование textContent вместо innerHTML</li>
        <li>☑ Настройка Content Security Policy</li>
        <li>☑ Санитизация HTML с DOMPurify</li>
        <li>☑ Валидация данных на сервере</li>
        <li>☑ X-Content-Type-Options: nosniff</li>
        <li>☑ Запрет dangerouslySetInnerHTML в React</li>
        <li>☑ Регулярное тестирование на XSS</li>
        </ul>
        </v-card>
        </v-col>
        <v-col cols="12" md="6">
        <v-card class="pa-4 h-100">
        <h3 class="text-h6 font-weight-bold mb-2">✅ Защита от CSRF</h3>
        <ul class="pl-4">
        <li>☑ CSRF токены для state-changing операций</li>
        <li>☑ SameSite=Strict/Lax для cookies</li>
        <li>☑ Проверка Origin/Referer заголовков</li>
        <li>☑ Custom headers для API запросов</li>
        <li>☑ Double Submit Cookie Pattern</li>
        <li>☑ Re-authentication для критичных действий</li>
        <li>☑ X-Frame-Options для защиты от clickjacking</li>
        <li>☑ Регулярное тестирование на CSRF</li>
        </ul>
        </v-card>
        </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
        <p class="font-weight-regular mb-6">
        <b>XSS и CSRF</b> — критические уязвимости веб-приложений. XSS внедряет вредоносный код через
        недостаточную санитизацию ввода, а CSRF выполняет действия от имени пользователя через подделку
        запросов. Защита требует комплексного подхода: экранирование и CSP для XSS, CSRF токены и SameSite
        cookies для CSRF, безопасные HTTP заголовки, регулярное тестирование и использование проверенных
        библиотек санитизации.
        </p>

        <div class="d-flex justify-end">
        <v-btn
        color="primary"
        size="small"
        variant="elevated"
        href="https://owasp.org/www-community/attacks/xss/"
        target="_blank"
        class="mr-2">
        OWASP XSS
        </v-btn>
        <v-btn
        color="secondary"
        size="small"
        variant="elevated"
        href="https://owasp.org/www-community/attacks/csrf"
        target="_blank"
        class="mr-2">
        OWASP CSRF
        </v-btn>
        <v-btn
        color="info"
        size="small"
        variant="elevated"
        href="https://cheatsheetseries.owasp.org/"
        target="_blank">
        OWASP Cheat Sheets
        </v-btn>
        </div>
        </v-col>
        </v-row>
        </v-container>
        </v-main>
        </v-app>
        </template>
