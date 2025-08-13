<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-yaml.js'
import 'prismjs/components/prism-json.js'

const volumeCommandsSnippet = `
# =====================================
# DOCKER VOLUMES - ИМЕНОВАННЫЕ ХРАНИЛИЩА
# =====================================

# Создание volume
docker volume create my-database-data
docker volume create app-logs

# Использование volume в контейнере
docker run -d \\
  --name postgres \\
  -v my-database-data:/var/lib/postgresql/data \\
  postgres:13

# Список volumes
docker volume ls

# Информация о volume
docker volume inspect my-database-data

# Удаление volume
docker volume rm my-database-data

# Удаление неиспользуемых volumes
docker volume prune
`

const bindMountCommandsSnippet = `
# =====================================
# BIND MOUNTS - ПРИВЯЗКА К ХОСТ-СИСТЕМЕ
# =====================================

# Абсолютный путь (обязательно!)
docker run -d \\
  --name dev-app \\
  -v /home/user/my-app:/app \\
  -v /home/user/my-app/node_modules:/app/node_modules \\
  node:18

# Текущая директория
docker run -d \\
  --name dev-app \\
  -v $(pwd):/app \\
  -v /app/node_modules \\
  node:18

# Windows PowerShell
docker run -d \\
  --name dev-app \\
  -v \${PWD}:/app \\
  node:18

# Только для чтения
docker run -d \\
  --name app \\
  -v $(pwd)/config:/app/config:ro \\
  my-app:latest
`

const hotReloadDockerfileSnippet = `
# Dockerfile.dev - для разработки
FROM node:18-alpine

# Установка глобальных пакетов для разработки
RUN npm install -g nodemon

# Рабочая директория
WORKDIR /app

# Копируем только package.json для кеширования
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies)
RUN npm install

# Копируем исходный код (будет заменен bind mount'ом)
COPY . .

# Открываем порт
EXPOSE 3000

# Команда с hot reload
CMD ["npm", "run", "dev"]
`

const packageJsonSnippet = `
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon --watch src --ext js,json src/index.js",
    "dev:debug": "nodemon --inspect=0.0.0.0:9229 src/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
`

const dockerComposeDevSnippet = `
# docker-compose.dev.yml - разработка с hot reload
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true  # Для Windows/macOS
    volumes:
      # Bind mount исходного кода
      - .:/app
      # Anonymous volume для node_modules
      - /app/node_modules
      # Bind mount для логов
      - ./logs:/app/logs
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      # Named volume для базы данных
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:  # Named volume
`

const frontendHotReloadSnippet = `
# docker-compose.frontend.yml - React/Vue hot reload
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
      - WDS_SOCKET_HOST=localhost
      - WDS_SOCKET_PORT=3000
    volumes:
      # Исходный код
      - .:/app
      # Исключаем node_modules
      - /app/node_modules
      # Исключаем build
      - /app/build
    stdin_open: true
    tty: true
`

const troubleshootingSnippet = `
# =====================================
# РЕШЕНИЕ ПРОБЛЕМ HOT RELOAD
# =====================================

# 1. Polling для файловых систем (Windows/macOS)
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# 2. Настройка webpack dev server
# webpack.config.js
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    }
  }
}

# 3. Vite настройки
# vite.config.js
export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  }
}

# 4. Проверка прав доступа
docker exec -it container-name ls -la /app

# 5. Очистка и пересборка
docker-compose down -v
docker-compose build --no-cache
docker-compose up
`

const highlightedVolumeCommands = ref('')
const highlightedBindMountCommands = ref('')
const highlightedHotReloadDockerfile = ref('')
const highlightedPackageJson = ref('')
const highlightedDockerComposeDev = ref('')
const highlightedFrontendHotReload = ref('')
const highlightedTroubleshooting = ref('')

onMounted(() => {
  highlightedVolumeCommands.value = Prism.highlight(volumeCommandsSnippet, Prism.languages.bash, 'bash')
  highlightedBindMountCommands.value = Prism.highlight(bindMountCommandsSnippet, Prism.languages.bash, 'bash')
  highlightedHotReloadDockerfile.value = Prism.highlight(hotReloadDockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedPackageJson.value = Prism.highlight(packageJsonSnippet, Prism.languages.json, 'json')
  highlightedDockerComposeDev.value = Prism.highlight(dockerComposeDevSnippet, Prism.languages.yaml, 'yaml')
  highlightedFrontendHotReload.value = Prism.highlight(frontendHotReloadSnippet, Prism.languages.yaml, 'yaml')
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
              Docker Volume vs Bind Mount + Hot Reload в разработке
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Volumes</b> и <b>bind mounts</b> — это два способа сохранения данных в Docker.
              <b>Volume</b> — это управляемое Docker хранилище, <b>bind mount</b> — привязка к файловой системе хоста.
              Для разработки с hot reload чаще используются bind mounts для синхронизации исходного кода.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Volume vs Bind Mount — сравнение</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Volume (именованный)</th>
                <th class="text-left font-weight-bold">Bind Mount</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Управление</b></td>
                <td class="pt-2 pb-2">Docker управляет полностью</td>
                <td class="pt-2 pb-2">Пользователь управляет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Расположение</b></td>
                <td class="pt-2 pb-2">/var/lib/docker/volumes/</td>
                <td class="pt-2 pb-2">Любая папка на хосте</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Портативность</b></td>
                <td class="pt-2 pb-2">Высокая (между контейнерами)</td>
                <td class="pt-2 pb-2">Низкая (зависит от хоста)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность</b></td>
                <td class="pt-2 pb-2">Оптимальная</td>
                <td class="pt-2 pb-2">Зависит от файловой системы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Backup</b></td>
                <td class="pt-2 pb-2">docker volume команды</td>
                <td class="pt-2 pb-2">Стандартные средства ОС</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Разработка</b></td>
                <td class="pt-2 pb-2">Данные, конфиги</td>
                <td class="pt-2 pb-2">Исходный код, hot reload</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Volume vs Bind Mount</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-database</v-icon>
                    <h3 class="text-h6 font-weight-bold">Volume — для данных</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>База данных:</strong> PostgreSQL, MySQL</li>
                    <li><strong>Логи приложений</strong></li>
                    <li><strong>Кеш:</strong> Redis, Memcached</li>
                    <li><strong>Пользовательские данные</strong></li>
                    <li><strong>Конфигурации</strong> (production)</li>
                    <li><strong>Между контейнерами</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-folder-sync</v-icon>
                    <h3 class="text-h6 font-weight-bold">Bind Mount — для разработки</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Исходный код:</strong> hot reload</li>
                    <li><strong>Конфигурации</strong> (development)</li>
                    <li><strong>Статические файлы</strong></li>
                    <li><strong>Скрипты сборки</strong></li>
                    <li><strong>Документация</strong></li>
                    <li><strong>Доступ к хост-файлам</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Volumes — команды</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVolumeCommands"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Bind Mounts — команды</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBindMountCommands"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Hot Reload — настройка для разработки</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Hot Reload</strong> позволяет автоматически перезагружать приложение при изменении исходного кода,
              не требуя пересборки образа. Для этого используются bind mounts и специальные инструменты мониторинга файлов.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">1. Dockerfile для разработки</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedHotReloadDockerfile"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. Package.json с dev скриптами</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedPackageJson"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">3. Docker Compose для разработки</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerComposeDev"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Frontend Hot Reload (React/Vue/Angular)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFrontendHotReload"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы монтирования в Docker</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Named Volume</h3>
                  <p class="text-body-2 mb-3"><code>volume_name:/path</code></p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Управляется Docker</li>
                    <li>Персистентность</li>
                    <li>Оптимальная производительность</li>
                    <li>Переносимость</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-folder-open</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Bind Mount</h3>
                  <p class="text-body-2 mb-3"><code>/host/path:/container/path</code></p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Прямая привязка к хосту</li>
                    <li>Hot reload</li>
                    <li>Прямое редактирование</li>
                    <li>Зависимость от хоста</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-help-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Anonymous Volume</h3>
                  <p class="text-body-2 mb-3"><code>/container/path</code></p>
                  <ul class="text-left pl-4 text-body-2">
                    <li>Автоматическое создание</li>
                    <li>Временные данные</li>
                    <li>Защита от bind mount</li>
                    <li>Удаляется с контейнером</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Решение проблем Hot Reload</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTroubleshooting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между volume и bind mount?</p>
                <p class="font-weight-regular ma-0">
                  <strong>Volume</strong> управляется Docker, хранится в /var/lib/docker/volumes/, обеспечивает лучшую производительность и портативность.
                  <strong>Bind mount</strong> привязывает конкретную папку хоста, удобен для разработки и hot reload.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как настроить hot reload в Docker для разработки?</p>
                <p class="font-weight-regular ma-0">
                  Используйте bind mount для исходного кода (<code>-v $(pwd):/app</code>), anonymous volume для node_modules (<code>-v /app/node_modules</code>),
                  и инструменты мониторинга файлов (nodemon, webpack-dev-server) с polling для совместимости файловых систем.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему hot reload не работает на Windows/macOS?</p>
                <p class="font-weight-regular ma-0">
                  Проблемы с file system events между хостом и контейнером. Решение: включить polling через
                  <code>CHOKIDAR_USEPOLLING=true</code>, <code>WATCHPACK_POLLING=true</code> или настройки инструментов сборки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать anonymous volume?</p>
                <p class="font-weight-regular ma-0">
                  Для защиты папок от перезаписи bind mount'ом. Например, <code>-v /app/node_modules</code>
                  не даст bind mount'у <code>-v $(pwd):/app</code> затереть установленные в образе зависимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить персистентность данных БД в контейнере?</p>
                <p class="font-weight-regular ma-0">
                  Использовать named volume: <code>docker run -v postgres_data:/var/lib/postgresql/data postgres</code>.
                  Volume будет сохраняться между пересозданиями контейнера и может быть подключен к другим контейнерам.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как организовать разные окружения (dev/prod) с volumes?</p>
                <p class="font-weight-regular ma-0">
                  Разные docker-compose файлы: в dev — bind mounts для кода, в prod — volumes для данных и COPY для кода.
                  Используйте <code>docker-compose -f docker-compose.dev.yml</code> для разработки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли разделить volume между несколькими контейнерами?</p>
                <p class="font-weight-regular ma-0">
                  Да! Named volume можно подключить к нескольким контейнерам одновременно.
                  Это полезно для разделения данных, логов или конфигураций между сервисами.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Практические сценарии</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🛠️ Development Setup</h3>
                  <ul class="pl-4">
                    <li><strong>Bind mount:</strong> исходный код</li>
                    <li><strong>Anonymous volume:</strong> node_modules</li>
                    <li><strong>Named volume:</strong> база данных</li>
                    <li><strong>Bind mount:</strong> конфигурации</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 Production Setup</h3>
                  <ul class="pl-4">
                    <li><strong>Named volume:</strong> база данных</li>
                    <li><strong>Named volume:</strong> логи</li>
                    <li><strong>Named volume:</strong> пользовательские файлы</li>
                    <li><strong>No bind mounts:</strong> безопасность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Named volumes для данных</li>
                    <li>Bind mounts для dev hot reload</li>
                    <li>Anonymous volumes для защиты папок</li>
                    <li>Polling для cross-platform</li>
                    <li>Backup критичных volumes</li>
                    <li>Разные setup для dev/prod</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Bind mounts в production</li>
                    <li>Хранение секретов в volumes</li>
                    <li>Большие bind mounts</li>
                    <li>Прямое редактирование volume данных</li>
                    <li>Отсутствие backup стратегии</li>
                    <li>Игнорирование прав доступа</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Производительность на Windows/macOS</li>
                    <li>Синхронизация времени файлов</li>
                    <li>Права доступа пользователей</li>
                    <li>Размер и очистка volumes</li>
                    <li>Сетевое хранилище проблемы</li>
                    <li>Concurrent access к данным</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Volumes</b> — это управляемое Docker хранилище для персистентных данных, идеально для production.
              <b>Bind mounts</b> — привязка к файловой системе хоста, незаменимы для разработки с hot reload.
              <b>Anonymous volumes</b> используются для защиты критичных папок от перезаписи.
              Правильное сочетание всех типов монтирования обеспечивает эффективную разработку и надежную работу в production.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/storage/"
                target="_blank"
                class="mr-2">
                Docker Storage
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/storage/volumes/"
                target="_blank">
                Volumes Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
