<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-yaml.js'

const reactSpaDockerfile = `
# =====================================
# REACT SPA - Multi-stage Dockerfile
# =====================================

# СТАДИЯ 1: Build stage (сборка)
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json для кеширования зависимостей
COPY package*.json ./
RUN npm ci --only=production --silent

# Копируем исходный код и собираем
COPY . .
RUN npm run build

# СТАДИЯ 2: Production stage (рантайм)
FROM nginx:alpine AS production

# Копируем собранные файлы из предыдущей стадии
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию Nginx для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Nginx стартует автоматически
CMD ["nginx", "-g", "daemon off;"]
`

const nextjsDockerfile = `
# =====================================
# NEXT.JS SSR - Multi-stage Dockerfile
# =====================================

# СТАДИЯ 1: Dependencies stage (зависимости)
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --silent

# СТАДИЯ 2: Build stage (сборка)
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости из предыдущей стадии
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Собираем Next.js приложение
RUN npm run build

# СТАДИЯ 3: Production stage (рантайм)
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Копируем только необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Копируем built приложение
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Запускаем Next.js сервер
CMD ["node", "server.js"]
`

const nginxConfig = `
# nginx.conf для React SPA
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/css application/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
}
`

const comparisonExample = `
# =====================================
# СРАВНЕНИЕ РАЗМЕРОВ ОБРАЗОВ
# =====================================

# БЕЗ multi-stage (React)
FROM node:18
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
# Размер: ~1.2GB (включает Node.js + все dev зависимости)

# С multi-stage (React)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Размер: ~50MB (только Nginx + статические файлы)

# Экономия: 1150MB (95% уменьшение!)
`

const dockerComposeExample = `
# docker-compose.yml для разработки и продакшена
version: '3.8'

services:
  # React SPA (статические файлы)
  react-app:
    build:
      context: ./react-app
      dockerfile: Dockerfile
      target: production  # Используем конкретную стадию
    ports:
      - "80:80"
    restart: unless-stopped

  # Next.js SSR (серверное приложение)
  nextjs-app:
    build:
      context: ./nextjs-app
      dockerfile: Dockerfile
      target: runner
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  # Для разработки Next.js
  nextjs-dev:
    build:
      context: ./nextjs-app
      dockerfile: Dockerfile
      target: deps  # Только зависимости для dev режима
    ports:
      - "3000:3000"
    volumes:
      - ./nextjs-app:/app
      - /app/node_modules
    command: npm run dev
    environment:
      - NODE_ENV=development
`

const highlightedReactSpa = ref('')
const highlightedNextjs = ref('')
const highlightedNginx = ref('')
const highlightedComparison = ref('')
const highlightedCompose = ref('')

onMounted(() => {
  highlightedReactSpa.value = Prism.highlight(reactSpaDockerfile, Prism.languages.docker, 'docker')
  highlightedNextjs.value = Prism.highlight(nextjsDockerfile, Prism.languages.docker, 'docker')
  highlightedNginx.value = Prism.highlight(nginxConfig, Prism.languages.bash, 'bash')
  highlightedComparison.value = Prism.highlight(comparisonExample, Prism.languages.docker, 'docker')
  highlightedCompose.value = Prism.highlight(dockerComposeExample, Prism.languages.yaml, 'yaml')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Multi-stage Docker builds: React SPA vs Next.js SSR
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Multi-stage builds</b> — это возможность использовать несколько <code>FROM</code> инструкций в одном Dockerfile
              для создания промежуточных образов и копирования только нужных файлов в финальный образ.
              Это кардинально различается для <b>React SPA</b> (статические файлы) и <b>Next.js SSR</b> (серверное приложение).
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Зачем нужны Multi-stage builds?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-resize</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Размер образа</h3>
                  <p class="text-body-2 mb-0">Уменьшение с 1.2GB до 50MB за счет исключения build инструментов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Безопасность</h3>
                  <p class="text-body-2 mb-0">Исключение исходного кода, dev зависимостей и build инструментов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-lightning-bolt</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <p class="text-body-2 mb-0">Быстрый запуск, меньше сетевого трафика, оптимальный рантайм</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">React SPA: Билд в Node → Рантайм в Nginx</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Концепция:</strong> React SPA компилируется в статические файлы (HTML, CSS, JS),
              которые можно отдавать через любой веб-сервер. Node.js нужен только для сборки!
            </v-alert>

            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedReactSpa"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Конфигурация Nginx для SPA</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNginx"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Next.js SSR: Серверное приложение</h2>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Отличие:</strong> Next.js с SSR требует Node.js сервера в рантайме для генерации HTML
              на сервере и обработки API маршрутов. Это не статические файлы!
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNextjs"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия: SPA vs SSR</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">React SPA</th>
                <th class="text-left font-weight-bold">Next.js SSR</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-3 pb-3"><b>Рантайм сервер</b></td>
                <td class="pt-3 pb-3">Nginx (статические файлы)</td>
                <td class="pt-3 pb-3">Node.js (серверное приложение)</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Размер образа</b></td>
                <td class="pt-3 pb-3">~50MB (Nginx + статика)</td>
                <td class="pt-3 pb-3">~200MB (Node + приложение)</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Время старта</b></td>
                <td class="pt-3 pb-3">Мгновенно</td>
                <td class="pt-3 pb-3">2-5 секунд (Bootstrap Node.js)</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Масштабирование</b></td>
                <td class="pt-3 pb-3">CDN + статические файлы</td>
                <td class="pt-3 pb-3">Горизонтальное масштабирование серверов</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Ресурсы</b></td>
                <td class="pt-3 pb-3">Минимальные (только память)</td>
                <td class="pt-3 pb-3">CPU + память для обработки запросов</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Безопасность</b></td>
                <td class="pt-3 pb-3">Статические файлы + Nginx</td>
                <td class="pt-3 pb-3">Node.js сервер + API уязвимости</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Кеширование</b></td>
                <td class="pt-3 pb-3">Browser + CDN кеш</td>
                <td class="pt-3 pb-3">ISR, SSG, динамическое кеширование</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение размеров образов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Compose для разных стратегий</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Архитектурные различия</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-center">React SPA</h3>
                  <div class="text-center mb-3">
                    <v-icon size="large" color="primary">mdi-folder-multiple</v-icon>
                    <p class="text-body-2 mt-2">Статические файлы</p>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Build:</strong> Node.js компилирует в HTML/CSS/JS</li>
                    <li><strong>Runtime:</strong> Nginx отдает статические файлы</li>
                    <li><strong>Роутинг:</strong> Client-side (React Router)</li>
                    <li><strong>Гидратация:</strong> Полная на клиенте</li>
                    <li><strong>SEO:</strong> Проблемы без SSG/Prerendering</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-center">Next.js SSR</h3>
                  <div class="text-center mb-3">
                    <v-icon size="large" color="success">mdi-server</v-icon>
                    <p class="text-body-2 mt-2">Серверное приложение</p>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Build:</strong> Next.js компилирует серверный код</li>
                    <li><strong>Runtime:</strong> Node.js сервер</li>
                    <li><strong>Роутинг:</strong> Server-side + Client-side</li>
                    <li><strong>Рендеринг:</strong> Server → Client гидратация</li>
                    <li><strong>SEO:</strong> Отличная поддержка</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему для React SPA используется Nginx, а не Node.js в production?</p>
                <p class="font-weight-regular ma-0">
                  React SPA компилируется в статические файлы, которым не нужен JavaScript runtime.
                  Nginx оптимизирован для отдачи статики: меньше ресурсов, выше производительность,
                  лучшее кеширование и gzip сжатие из коробки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем Next.js SSR кардинально отличается от SPA в контексте Docker?</p>
                <p class="font-weight-regular ma-0">
                  Next.js SSR требует Node.js сервера в рантайме для server-side рендеринга и API routes.
                  SPA нужен Node.js только для сборки, в рантайме работает статика через веб-сервер.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как multi-stage builds экономят место?</p>
                <p class="font-weight-regular ma-0">
                  Build стадия включает TypeScript, Webpack, dev зависимости (~1GB). Production стадия
                  копирует только результат сборки. Для SPA — статические файлы (~50MB),
                  для SSR — скомпилированное приложение (~200MB).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать одинаковый подход для SPA и SSR?</p>
                <p class="font-weight-regular ma-0">
                  Нет! SPA можно отдавать через CDN как статику, SSR требует серверной инфраструктуры.
                  Разные стратегии кеширования, масштабирования и deployment.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы решает разделение на стадии?</p>
                <p class="font-weight-regular ma-0">
                  Безопасность (нет исходного кода), размер образа (95% экономия для SPA),
                  быстрый старт контейнеров, оптимизированный рантайм без лишних зависимостей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить client-side роутинг в SPA через Nginx?</p>
                <p class="font-weight-regular ma-0">
                  Директива <code>try_files $uri $uri/ /index.html</code> перенаправляет все несуществующие
                  маршруты на index.html, позволяя React Router обрабатывать роутинг на клиенте.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый подход?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">React SPA + Nginx</h3>
                  <p class="text-h7 font-weight-medium mb-2">Используйте когда:</p>
                  <ul class="pl-4">
                    <li>Статическое содержимое</li>
                    <li>CSR (Client-Side Rendering)</li>
                    <li>Максимальная производительность</li>
                    <li>CDN distribution</li>
                    <li>Простота deployment</li>
                    <li>Минимальные ресурсы сервера</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-primary">Next.js SSR + Node</h3>
                  <p class="text-h7 font-weight-medium mb-2">Используйте когда:</p>
                  <ul class="pl-4">
                    <li>SEO критичен</li>
                    <li>Server-Side Rendering</li>
                    <li>API routes в том же приложении</li>
                    <li>Динамический контент</li>
                    <li>ISR (Incremental Static Regeneration)</li>
                    <li>Сложная серверная логика</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики Multi-stage builds</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Общие практики</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте alpine образы</li>
                    <li>Кешируйте зависимости отдельно</li>
                    <li>Именуйте стадии (AS builder)</li>
                    <li>Минимизируйте слои</li>
                    <li>Используйте .dockerignore</li>
                    <li>Создавайте non-root пользователей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-folder-multiple</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">📁 SPA специфика</h3>
                  <ul class="text-left pl-4">
                    <li>Копируйте только /build папку</li>
                    <li>Настройте gzip в Nginx</li>
                    <li>Включите кеширование статики</li>
                    <li>Обеспечьте SPA роутинг</li>
                    <li>Добавьте security headers</li>
                    <li>Оптимизируйте для CDN</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-server</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ SSR специфика</h3>
                  <ul class="text-left pl-4">
                    <li>Копируйте .next/standalone</li>
                    <li>Настройте health checks</li>
                    <li>Ограничьте память/CPU</li>
                    <li>Используйте graceful shutdown</li>
                    <li>Настройте логирование</li>
                    <li>Подготовьте к масштабированию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Multi-stage builds</b> кардинально различаются для SPA и SSR приложений. <b>React SPA</b>
              компилируется в статические файлы и отдается через Nginx (экономия 95% места),
              <b>Next.js SSR</b> требует Node.js сервера в рантайме для server-side рендеринга.
              Выбор подхода зависит от архитектурных требований: статика vs динамический контент,
              SEO требования, и стратегии масштабирования.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/build/building/multi-stage/"
                target="_blank"
                class="mr-2">
                Docker Multi-stage
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://nextjs.org/docs/deployment#docker-image"
                target="_blank">
                Next.js Docker Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
