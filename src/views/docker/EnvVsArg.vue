<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-javascript.js'

const argExampleSnippet = `
# Dockerfile с ARG - переменные времени сборки
FROM node:18-alpine

# ARG доступны только во время сборки
ARG NODE_ENV=production
ARG API_URL=https://api.example.com
ARG BUILD_VERSION

# Используем ARG в RUN
RUN echo "Building for environment: $NODE_ENV"
RUN echo "API URL: $API_URL"
RUN echo "Build version: $BUILD_VERSION"

# ARG можно передать в ENV
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=$API_URL

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
`

const envExampleSnippet = `
# Dockerfile с ENV - переменные времени выполнения
FROM node:18-alpine

WORKDIR /app

# ENV доступны и при сборке, и в контейнере
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=postgresql://localhost/myapp

# ENV доступны в RUN командах
RUN echo "Node environment: $NODE_ENV"
RUN echo "Server will run on port: $PORT"

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE $PORT
CMD ["npm", "start"]
`

const buildCommandsSnippet = `
# Передача ARG при сборке
docker build --build-arg NODE_ENV=development .
docker build --build-arg API_URL=https://dev-api.com .
docker build --build-arg BUILD_VERSION=1.2.3 .

# Несколько ARG одновременно
docker build \
  --build-arg NODE_ENV=staging \
  --build-arg API_URL=https://staging-api.com \
  --build-arg BUILD_VERSION=$(git rev-parse --short HEAD) \
  -t my-app:staging .

# Передача ENV при запуске контейнера
docker run -e NODE_ENV=production my-app
docker run -e DATABASE_URL=postgres://prod-db:5432/app my-app

# Файл с переменными окружения
docker run --env-file .env.production my-app
`

const reactEnvSnippet = `
# .env.development (для Vite)
VITE_API_URL=http://localhost:3001
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true

# .env.production (для Vite)
VITE_API_URL=https://api.myapp.com
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true

# .env.development (для Create React App)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_VERSION=1.0.0
REACT_APP_FEATURE_FLAG=enabled

# .env.production (для Create React App)
REACT_APP_API_URL=https://api.myapp.com
REACT_APP_VERSION=1.0.0
REACT_APP_FEATURE_FLAG=enabled
`

const reactUsageSnippet = `
// Использование в React компонентах

// Vite приложение
const apiUrl = import.meta.env.VITE_API_URL
const appVersion = import.meta.env.VITE_APP_VERSION
const isAnalyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'

// Create React App
const apiUrl = process.env.REACT_APP_API_URL
const appVersion = process.env.REACT_APP_VERSION
const featureFlag = process.env.REACT_APP_FEATURE_FLAG

// Использование в коде
export default function App() {
  useEffect(() => {
    console.log('API URL:', apiUrl)
    console.log('App Version:', appVersion)

    // Инициализация аналитики
    if (isAnalyticsEnabled) {
      initAnalytics()
    }
  }, [])

  return (
    <div>
      <h1>My App v{appVersion}</h1>
      {/* Остальной код */}
    </div>
  )
}
`

const dockerfileReactSnippet = `
# Multi-stage Dockerfile для React приложения
FROM node:18-alpine as builder

# ARG для времени сборки
ARG REACT_APP_API_URL
ARG REACT_APP_VERSION
ARG VITE_API_URL
ARG VITE_APP_VERSION

# Передаем ARG в ENV для доступности в приложении
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_VERSION=$REACT_APP_VERSION
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_VERSION=$VITE_APP_VERSION

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Продакшн стадия
FROM nginx:alpine

# ENV для времени выполнения
ENV SERVER_NAME=localhost
ENV NGINX_PORT=80

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE $NGINX_PORT
CMD ["nginx", "-g", "daemon off;"]
`

const dockerComposeSnippet = `
# docker-compose.yml с ENV и ARG
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - REACT_APP_API_URL=http://localhost:3001
        - REACT_APP_VERSION=1.0.0
        - VITE_API_URL=http://localhost:3001
    environment:
      - NODE_ENV=production
      - SERVER_PORT=3000
    ports:
      - "3000:3000"
    env_file:
      - .env.local

  backend:
    image: node:18-alpine
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    env_file:
      - .env.production
`

const highlightedArgExample = ref('')
const highlightedEnvExample = ref('')
const highlightedBuildCommands = ref('')
const highlightedReactEnv = ref('')
const highlightedReactUsage = ref('')
const highlightedDockerfileReact = ref('')
const highlightedDockerCompose = ref('')

onMounted(() => {
  highlightedArgExample.value = Prism.highlight(argExampleSnippet, Prism.languages.docker, 'docker')
  highlightedEnvExample.value = Prism.highlight(envExampleSnippet, Prism.languages.docker, 'docker')
  highlightedBuildCommands.value = Prism.highlight(buildCommandsSnippet, Prism.languages.bash, 'bash')
  highlightedReactEnv.value = Prism.highlight(reactEnvSnippet, Prism.languages.bash, 'bash')
  highlightedReactUsage.value = Prism.highlight(reactUsageSnippet, Prism.languages.javascript, 'javascript')
  highlightedDockerfileReact.value = Prism.highlight(dockerfileReactSnippet, Prism.languages.docker, 'docker')
  highlightedDockerCompose.value = Prism.highlight(dockerComposeSnippet, Prism.languages.yaml, 'yaml')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              ENV vs ARG в Docker и переменные в React
            </h1>

            <p class="font-weight-regular mb-6">
              <b>ARG</b> — переменные времени сборки (build-time), доступны только при создании образа.
              <b>ENV</b> — переменные времени выполнения (runtime), доступны в запущенном контейнере.
              В React приложениях используются префиксы <code>VITE_</code> или <code>REACT_APP_</code>
              для доступа к переменным окружения на frontend.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия ARG vs ENV</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="blue-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="blue" class="mr-2">mdi-hammer-wrench</v-icon>
                    <h3 class="text-h6 font-weight-bold">ARG (Build-time)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время сборки</strong> — только при docker build</li>
                    <li><strong>Передача</strong> — через --build-arg</li>
                    <li><strong>Область</strong> — недоступны в контейнере</li>
                    <li><strong>Кеширование</strong> — влияют на кеш слоев</li>
                    <li><strong>Безопасность</strong> — могут попасть в историю</li>
                    <li><strong>По умолчанию</strong> — можно задать значение</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="green-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="green" class="mr-2">mdi-play-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">ENV (Runtime)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время выполнения</strong> — в запущенном контейнере</li>
                    <li><strong>Передача</strong> — через -e или --env-file</li>
                    <li><strong>Область</strong> — доступны в процессах контейнера</li>
                    <li><strong>Переопределение</strong> — при запуске контейнера</li>
                    <li><strong>Наследование</strong> — дочерние процессы видят</li>
                    <li><strong>Гибкость</strong> — можно изменить без пересборки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры использования ARG</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedArgExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры использования ENV</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEnvExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Команды для передачи переменных</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBuildCommands"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать ARG vs ENV?</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">ARG</th>
                <th class="text-left font-weight-bold">ENV</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Версия приложения при сборке</b></td>
                <td class="pt-2 pb-2 text-center">✅</td>
                <td class="pt-2 pb-2 text-center">❌</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>API URL для frontend</b></td>
                <td class="pt-2 pb-2 text-center">✅</td>
                <td class="pt-2 pb-2 text-center">✅</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Database URL для backend</b></td>
                <td class="pt-2 pb-2 text-center">❌</td>
                <td class="pt-2 pb-2 text-center">✅</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Секреты и пароли</b></td>
                <td class="pt-2 pb-2 text-center">❌</td>
                <td class="pt-2 pb-2 text-center">⚠️</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Настройки для разных окружений</b></td>
                <td class="pt-2 pb-2 text-center">✅</td>
                <td class="pt-2 pb-2 text-center">✅</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Порты и хосты</b></td>
                <td class="pt-2 pb-2 text-center">❌</td>
                <td class="pt-2 pb-2 text-center">✅</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Переменные окружения в React</h2>

            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> React переменные с префиксами <code>VITE_</code> или <code>REACT_APP_</code>
              встраиваются в bundle на этапе сборки (build-time), а не runtime! Они видны всем пользователям.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="purple-lighten-5">
                  <h3 class="text-h6 font-weight-bold mb-2">Vite (современный)</h3>
                  <ul class="pl-4">
                    <li><code>VITE_*</code> — префикс для переменных</li>
                    <li><code>import.meta.env.VITE_API_URL</code></li>
                    <li>Быстрая сборка с HMR</li>
                    <li>TypeScript из коробки</li>
                    <li>ES modules</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="cyan-lighten-5">
                  <h3 class="text-h6 font-weight-bold mb-2">Create React App</h3>
                  <ul class="pl-4">
                    <li><code>REACT_APP_*</code> — префикс для переменных</li>
                    <li><code>process.env.REACT_APP_API_URL</code></li>
                    <li>Webpack под капотом</li>
                    <li>Встроенные оптимизации</li>
                    <li>Zero config setup</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Файлы переменных окружения</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactEnv"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Использование в React коде</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactUsage"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Dockerfile для React приложения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerfileReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Compose с переменными</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerCompose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Приоритет переменных окружения</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="ARG в Dockerfile" value="1" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="ENV в Dockerfile" value="2" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="docker-compose.yml" value="3" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Файл .env" value="4" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Системные переменные" value="5" complete></v-stepper-item>
              </v-stepper-header>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем основная разница между ARG и ENV?</p>
                <p class="font-weight-regular ma-0">
                  ARG доступны только во время сборки образа (docker build), ENV — в запущенном контейнере.
                  ARG передаются через --build-arg, ENV через -e или --env-file при запуске.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как передать переменные в React приложение в Docker?</p>
                <p class="font-weight-regular ma-0">
                  Через ARG в Dockerfile, которые передаются в ENV с префиксом VITE_ или REACT_APP_.
                  Важно: эти переменные встраиваются в bundle на этапе сборки, не runtime.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя передать секреты через ARG?</p>
                <p class="font-weight-regular ma-0">
                  ARG сохраняются в истории образа и могут быть видны через docker history.
                  Для секретов используйте ENV при запуске, secrets в docker-compose или внешние системы управления секретами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как изменить переменные без пересборки образа?</p>
                <p class="font-weight-regular ma-0">
                  Если переменные определены как ENV в Dockerfile, их можно переопределить при запуске контейнера
                  через -e VAR=value или --env-file. ARG нельзя переопределить без пересборки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают REACT_APP_ и VITE_ переменные?</p>
                <p class="font-weight-regular ma-0">
                  Эти переменные подставляются в код на этапе сборки (build-time), а не выполнения.
                  Webpack/Vite заменяют process.env.REACT_APP_* или import.meta.env.VITE_* на их значения в bundle.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать ARG в CMD или ENTRYPOINT?</p>
                <p class="font-weight-regular ma-0">
                  Нет, ARG недоступны в CMD/ENTRYPOINT. Нужно сначала передать ARG в ENV:
                  <code>ENV MY_VAR=$ARG_VAR</code>, затем использовать ENV в CMD.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить разные настройки для dev/staging/prod?</p>
                <p class="font-weight-regular ma-0">
                  Используйте разные .env файлы, передавайте ARG при сборке для разных окружений,
                  или используйте docker-compose с разными конфигурациями и переменными ENV.
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
                    <li>ARG для параметров сборки</li>
                    <li>ENV для runtime переменных</li>
                    <li>Значения по умолчанию для ARG</li>
                    <li>Префиксы VITE_/REACT_APP_</li>
                    <li>Использовать .env файлы</li>
                    <li>Документировать переменные</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Секреты в ARG</li>
                    <li>Хардкод значений</li>
                    <li>ARG в CMD/ENTRYPOINT</li>
                    <li>Переменные без префиксов в React</li>
                    <li>Большое количество ARG</li>
                    <li>ENV для build-time данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>React переменные в bundle</li>
                    <li>ARG влияют на кеш</li>
                    <li>Порядок объявления важен</li>
                    <li>Чувствительные данные</li>
                    <li>Валидация значений</li>
                    <li>Совместимость окружений</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Схема работы переменных</h2>
            <v-card class="pa-4 mb-8" color="grey-lighten-4">
              <h3 class="text-h6 font-weight-bold mb-3">Жизненный цикл переменных</h3>
              <v-row>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="large" color="blue" class="mb-2">mdi-hammer-wrench</v-icon>
                    <h4 class="font-weight-bold">Build Time</h4>
                    <p class="text-body-2">
                      ARG передаются через --build-arg<br>
                      React переменные встраиваются в bundle<br>
                      ENV устанавливаются в образ
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="large" color="orange" class="mb-2">mdi-rocket-launch</v-icon>
                    <h4 class="font-weight-bold">Container Start</h4>
                    <p class="text-body-2">
                      ENV могут быть переопределены<br>
                      Загрузка файлов .env<br>
                      Настройка окружения
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-icon size="large" color="green" class="mb-2">mdi-play-circle</v-icon>
                    <h4 class="font-weight-bold">Runtime</h4>
                    <p class="text-body-2">
                      ENV доступны процессам<br>
                      React переменные уже в коде<br>
                      Можно изменить через docker exec
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>ARG</b> используются для настройки процесса сборки (build-time),
              <b>ENV</b> — для конфигурации запущенного контейнера (runtime).
              В React приложениях переменные с префиксами <code>VITE_</code> или <code>REACT_APP_</code>
              встраиваются в bundle на этапе сборки через webpack/vite.
              Правильный выбор между ARG и ENV зависит от того, когда переменная нужна —
              при сборке образа или при выполнении контейнера.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/builder/#arg"
                target="_blank"
                class="mr-2">
                Docker ARG Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://vitejs.dev/guide/env-and-mode.html"
                target="_blank">
                Vite Env Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
