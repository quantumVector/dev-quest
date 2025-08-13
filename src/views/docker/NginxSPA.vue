<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-nginx.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'

const nginxConfigSnippet = `
# nginx.conf для SPA
server {
    listen 80;
    server_name localhost;

    # Папка с собранным SPA
    root /usr/share/nginx/html;
    index index.html;

    # Основная магия для SPA роутинга
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кеширование статических ресурсов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # API проксирование (опционально)
    location /api/ {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
`

const problemExampleSnippet = `
# Проблема без try_files
# Структура SPA роутов:
https://example.com/           ✅ Работает (физический index.html)
https://example.com/about      ✅ Работает (JS роутинг)
https://example.com/users/123  ✅ Работает (JS роутинг)

# НО! При прямом обращении или F5:
https://example.com/about      ❌ 404 Not Found
https://example.com/users/123  ❌ 404 Not Found

# Почему? Nginx ищет физические файлы:
# /usr/share/nginx/html/about       <- не существует
# /usr/share/nginx/html/users/123   <- не существует
`

const dockerfileSnippet = `
# Dockerfile для SPA с Nginx
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Продакшн stage с Nginx
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`

const solutionExplanationSnippet = `
# try_files объяснение
try_files $uri $uri/ /index.html;

# $uri - запрошенный URL
# $uri/ - попробовать как директорию
# /index.html - fallback если ничего не найдено

# Пример работы:
# GET /about
# 1. Ищет файл /about (не находит)
# 2. Ищет папку /about/ (не находит)
# 3. Отдает /index.html ✅

# GET /assets/app.js
# 1. Ищет файл /assets/app.js (находит) ✅
# 2. Отдает найденный файл
`

const reactRouterExample = `
// React Router пример
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/products/*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

// Без try_files эти роуты не работают при прямом обращении!
`

const vueRouterExample = `
// Vue Router пример
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: User },
  { path: '/products/:category', component: Products }
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History API
  routes
});

// createWebHistory() создает "красивые" URL без #
// Но требует настройки сервера!
`

const alternativeSolutionsSnippet = `
# Альтернативные решения

# 1. Apache .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# 2. Express.js сервер
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

# 3. Hash Router (не требует серверной настройки)
# URL: https://example.com/#/about
# Все после # обрабатывается только клиентом
`

const troubleshootingSnippet = `
# Типичные проблемы и решения

# 1. Неправильный порядок location блоков
location /api/ {
  proxy_pass http://backend:3000;
}
location / {
  try_files $uri $uri/ /index.html;
}

# 2. Проблемы с относительными путями
<base href="/"> <!-- В index.html -->

# 3. Кеширование index.html
location = /index.html {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
  try_files $uri =404;
}

# 4. Проверка конфигурации
nginx -t  # Проверить синтаксис
nginx -s reload  # Перезагрузить конфигурацию
`

const highlightedNginx = ref('')
const highlightedProblem = ref('')
const highlightedDockerfile = ref('')
const highlightedSolution = ref('')
const highlightedReact = ref('')
const highlightedVue = ref('')
const highlightedAlternatives = ref('')
const highlightedTroubleshooting = ref('')

onMounted(() => {
  highlightedNginx.value = Prism.highlight(nginxConfigSnippet, Prism.languages.nginx, 'nginx')
  highlightedProblem.value = Prism.highlight(problemExampleSnippet, Prism.languages.bash, 'bash')
  highlightedDockerfile.value = Prism.highlight(dockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedSolution.value = Prism.highlight(solutionExplanationSnippet, Prism.languages.bash, 'bash')
  highlightedReact.value = Prism.highlight(reactRouterExample, Prism.languages.javascript, 'javascript')
  highlightedVue.value = Prism.highlight(vueRouterExample, Prism.languages.javascript, 'javascript')
  highlightedAlternatives.value = Prism.highlight(alternativeSolutionsSnippet, Prism.languages.bash, 'bash')
  highlightedTroubleshooting.value = Prism.highlight(troubleshootingSnippet, Prism.languages.bash, 'bash')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Nginx для SPA: зачем <code>try_files $uri /index.html;</code>
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Single Page Application (SPA)</b> использует клиентский роутинг для навигации между страницами
              без перезагрузки. Но при прямом обращении к URL или обновлении страницы (F5) сервер пытается найти
              физический файл, которого не существует. <code>try_files</code> решает эту проблему.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема: SPA роутинг vs HTTP запросы</h2>

            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Суть проблемы:</strong> SPA имеет только один физический файл (index.html), но URL выглядят как обычные страницы. При прямом запросе сервер ищет несуществующие файлы.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedProblem"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает SPA роутинг</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Клиентский роутинг</h3>
                  <ol class="pl-4">
                    <li>Пользователь загружает <code>index.html</code></li>
                    <li>JavaScript загружает роутер (React Router, Vue Router)</li>
                    <li>Роутер читает URL и показывает нужный компонент</li>
                    <li>При клике по ссылкам URL меняется без перезагрузки</li>
                    <li>History API управляет браузерной историей</li>
                  </ol>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Проблема с прямыми запросами</h3>
                  <ol class="pl-4">
                    <li>Пользователь вводит <code>/about</code> в адресную строку</li>
                    <li>Браузер отправляет GET запрос на сервер</li>
                    <li>Nginx ищет файл <code>/about</code> на диске</li>
                    <li>Файл не найден → 404 Error</li>
                    <li>JavaScript роутер даже не загружается!</li>
                  </ol>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">React Router пример</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Vue Router пример</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVue"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение: try_files в Nginx</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSolution"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Полная конфигурация Nginx</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNginx"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Dockerfile с Nginx для SPA</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerfile"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает try_files</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-file-search</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">1. Ищет файл</h3>
                  <p class="text-body-2">Сначала пытается найти точный файл по запрошенному пути</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-folder-search</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">2. Ищет папку</h3>
                  <p class="text-body-2">Если файл не найден, пытается найти папку с таким именем</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-home</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">3. Fallback</h3>
                  <p class="text-body-2">Если ничего не найдено, отдает index.html</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Альтернативные решения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAlternatives"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типичные проблемы и решения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTroubleshooting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему SPA падает при обновлении страницы (F5)?</p>
                <p class="font-weight-regular ma-0">
                  При F5 браузер делает HTTP запрос на сервер за текущим URL. Если это клиентский роут (например, /about),
                  сервер ищет физический файл /about, не находит его и возвращает 404. JavaScript роутер даже не загружается.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делает <code>try_files $uri $uri/ /index.html;</code>?</p>
                <p class="font-weight-regular ma-0">
                  Последовательно пытается найти: 1) файл по точному пути, 2) папку с таким именем,
                  3) если ничего не найдено — отдает index.html, который содержит JavaScript роутер.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается History API от Hash роутинга?</p>
                <p class="font-weight-regular ma-0">
                  History API создает "красивые" URL (/about), но требует серверной настройки.
                  Hash роутинг использует # (/#!/about), все после # обрабатывается только браузером, не требует настройки сервера.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как правильно кешировать SPA?</p>
                <p class="font-weight-regular ma-0">
                  index.html — не кешировать (no-cache), статические ресурсы (JS/CSS) — кешировать надолго с версионированием.
                  Это позволяет получать обновления приложения, но кешировать неизменяемые ресурсы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что будет, если забыть try_files для API роутов?</p>
                <p class="font-weight-regular ma-0">
                  API запросы (/api/users) будут перенаправлены на index.html вместо backend сервера.
                  Поэтому location /api/ должен идти ПЕРЕД location / в конфигурации Nginx.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как дебажить проблемы с роутингом?</p>
                <p class="font-weight-regular ma-0">
                  Проверить: 1) порядок location блоков в nginx.conf, 2) наличие тега &lt;base href="/"&gt;,
                  3) настройки роутера (history mode), 4) логи Nginx, 5) Network tab в DevTools.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">URL вид</th>
                <th class="text-left font-weight-bold">Настройка сервера</th>
                <th class="text-left font-weight-bold">SEO</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>History API</b></td>
                <td class="pt-2 pb-2">/about</td>
                <td class="pt-2 pb-2">Требуется try_files</td>
                <td class="pt-2 pb-2">✅ Хорошо</td>
                <td class="pt-2 pb-2">Production SPA</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Hash Router</b></td>
                <td class="pt-2 pb-2">/#/about</td>
                <td class="pt-2 pb-2">Не требуется</td>
                <td class="pt-2 pb-2">❌ Плохо</td>
                <td class="pt-2 pb-2">Простые приложения</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Server-side routing</b></td>
                <td class="pt-2 pb-2">/about</td>
                <td class="pt-2 pb-2">Каждый роут = файл</td>
                <td class="pt-2 pb-2">✅ Отлично</td>
                <td class="pt-2 pb-2">Traditional MPA</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать try_files для SPA</li>
                    <li>Кешировать статические ресурсы</li>
                    <li>НЕ кешировать index.html</li>
                    <li>API роуты располагать первыми</li>
                    <li>Добавлять security заголовки</li>
                    <li>Gzip сжатие для текстовых файлов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Кеширования index.html</li>
                    <li>try_files для API роутов</li>
                    <li>Неправильного порядка location</li>
                    <li>Отсутствия base href</li>
                    <li>Жесткого кеширования SPA</li>
                    <li>Игнорирования MIME типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Тестировать прямые URL</li>
                    <li>Мониторить 404 ошибки</li>
                    <li>Использовать CDN для статики</li>
                    <li>Настроить error pages</li>
                    <li>Логировать доступ и ошибки</li>
                    <li>Проверять mobile доступность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <code>try_files $uri $uri/ /index.html;</code> — это ключевая директива для работы SPA с Nginx.
              Она решает проблему клиентского роутинга, обеспечивая корректную работу при прямых запросах и обновлении страницы.
              Без неё пользователи получат 404 ошибки при попытке зайти на любую страницу SPA напрямую или при нажатии F5.
              Правильная настройка Nginx критична для production деплоя современных SPA приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files"
                target="_blank"
                class="mr-2">
                Nginx try_files
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://router.vuejs.org/guide/essentials/history-mode.html"
                target="_blank">
                Vue Router History
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
