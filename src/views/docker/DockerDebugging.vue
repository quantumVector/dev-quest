<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-yaml.js'

const dockerLogsSnippet = `
# =====================================
# DOCKER LOGS - ПРОСМОТР ЛОГОВ
# =====================================

# Основные команды просмотра логов
docker logs container_name              # Все логи контейнера
docker logs container_id                # По ID контейнера
docker logs -f container_name           # Следить за логами в реальном времени (-f = follow)
docker logs --tail 50 container_name    # Последние 50 строк
docker logs --since 2h container_name   # Логи за последние 2 часа
docker logs --until 2023-01-01 container_name  # До определенной даты

# Комбинирование параметров
docker logs -f --tail 100 --since 10m my-app    # Последние 100 строк за 10 минут + follow

# Логи с временными метками
docker logs -t container_name           # Показать timestamps
docker logs -t -f --since 1h my-app     # Логи за час с временем

# Поиск в логах
docker logs container_name | grep "ERROR"       # Поиск ошибок
docker logs container_name | grep -i "warning"  # Поиск предупреждений (без учета регистра)

# Экспорт логов в файл
docker logs container_name > app.log 2>&1       # Все логи в файл
docker logs --since 1h container_name > recent.log  # Логи за час
`

const dockerExecSnippet = `
# =====================================
# DOCKER EXEC - ИНТЕРАКТИВНОЕ ПОДКЛЮЧЕНИЕ
# =====================================

# Подключение к запущенному контейнеру
docker exec -it container_name /bin/bash        # Bash терминал
docker exec -it container_name /bin/sh          # Sh терминал (для Alpine)
docker exec -it container_name bash             # Краткая форма
docker exec -it container_name sh               # Для минимальных образов

# Выполнение отдельных команд
docker exec container_name ls -la               # Выполнить команду без интерактива
docker exec container_name cat /app/config.json # Посмотреть содержимое файла
docker exec container_name ps aux               # Процессы в контейнере
docker exec container_name netstat -tlnp        # Сетевые подключения

# Работа с файловой системой
docker exec -it container_name find /app -name "*.log"  # Найти лог файлы
docker exec container_name du -sh /app          # Размер папки приложения
docker exec container_name df -h                # Свободное место

# Отладка приложения
docker exec -it container_name env              # Переменные окружения
docker exec container_name curl localhost:3000/health  # Проверка эндпоинта
docker exec container_name ping google.com      # Проверка сети

# Работа под другим пользователем
docker exec -it --user root container_name bash    # Подключиться как root
docker exec -it --user 1000 container_name sh      # Под определенным UID
`

const healthcheckDockerfileSnippet = `
# Dockerfile с HEALTHCHECK
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# HEALTHCHECK инструкция
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Альтернативные варианты healthcheck
# HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
# HEALTHCHECK --interval=30s CMD node healthcheck.js || exit 1

CMD ["npm", "start"]
`

const healthcheckScriptSnippet = `
// healthcheck.js - кастомная проверка здоровья
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('Health check passed');
    process.exit(0); // Успех
  } else {
    console.log(\`Health check failed with status: \${res.statusCode}\`);
    process.exit(1); // Ошибка
  }
});

req.on('error', (err) => {
  console.log(\`Health check error: \${err.message}\`);
  process.exit(1); // Ошибка
});

req.on('timeout', () => {
  console.log('Health check timeout');
  req.destroy();
  process.exit(1); // Ошибка
});

req.end();
`

const healthcheckExpressSnippet = `
// Express.js сервер с health endpoint
const express = require('express');
const app = express();

let isHealthy = true;
let startTime = Date.now();

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = Date.now() - startTime;

  // Базовая проверка
  if (!isHealthy) {
    return res.status(503).json({
      status: 'unhealthy',
      uptime: uptime,
      timestamp: new Date().toISOString()
    });
  }

  // Расширенная проверка
  const healthCheck = {
    status: 'healthy',
    uptime: uptime,
    timestamp: new Date().toISOString(),
    services: {
      database: checkDatabase(),
      redis: checkRedis(),
      external_api: checkExternalAPI()
    }
  };

  res.status(200).json(healthCheck);
});

// Проверки зависимостей
function checkDatabase() {
  try {
    // Проверка подключения к БД
    return { status: 'connected' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

function checkRedis() {
  // Проверка Redis
  return { status: 'connected' };
}

function checkExternalAPI() {
  // Проверка внешних API
  return { status: 'available' };
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`

const dockerComposeHealthSnippet = `
# docker-compose.yml с healthcheck
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  redis:
    image: redis:6-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s
`

const debuggingCommandsSnippet = `
# =====================================
# КОМПЛЕКСНАЯ ОТЛАДКА КОНТЕЙНЕРА
# =====================================

# Проверка статуса контейнера
docker ps                              # Запущенные контейнеры
docker ps -a                           # Все контейнеры (включая остановленные)
docker inspect container_name          # Детальная информация
docker stats container_name            # Использование ресурсов в реальном времени

# Проверка здоровья
docker inspect --format='{{.State.Health.Status}}' container_name
docker events --filter container=container_name    # События контейнера

# Отладка сети
docker exec container_name netstat -tlnp           # Открытые порты
docker exec container_name nslookup google.com     # DNS проверка
docker network ls                                  # Список сетей
docker network inspect bridge                      # Информация о сети

# Отладка файловой системы
docker exec container_name df -h                   # Свободное место
docker exec container_name mount                   # Смонтированные volumes
docker diff container_name                         # Изменения в файловой системе

# Анализ производительности
docker exec container_name top                     # Процессы
docker exec container_name free -h                 # Память
docker exec container_name iostat                  # I/O статистика (если доступна)
`

const highlightedLogs = ref('')
const highlightedExec = ref('')
const highlightedHealthDockerfile = ref('')
const highlightedHealthScript = ref('')
const highlightedHealthExpress = ref('')
const highlightedHealthCompose = ref('')
const highlightedDebugging = ref('')

onMounted(() => {
  highlightedLogs.value = Prism.highlight(dockerLogsSnippet, Prism.languages.bash, 'bash')
  highlightedExec.value = Prism.highlight(dockerExecSnippet, Prism.languages.bash, 'bash')
  highlightedHealthDockerfile.value = Prism.highlight(healthcheckDockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedHealthScript.value = Prism.highlight(healthcheckScriptSnippet, Prism.languages.javascript, 'javascript')
  highlightedHealthExpress.value = Prism.highlight(healthcheckExpressSnippet, Prism.languages.javascript, 'javascript')
  highlightedHealthCompose.value = Prism.highlight(dockerComposeHealthSnippet, Prism.languages.yaml, 'yaml')
  highlightedDebugging.value = Prism.highlight(debuggingCommandsSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Отладка Docker: логи, exec и healthcheck
            </h1>

            <p class="font-weight-regular mb-6">
              Отладка контейнеров — важный навык для разработчика. Основные инструменты:
              <b>docker logs</b> для просмотра логов, <b>docker exec</b> для интерактивной работы,
              и <b>healthcheck</b> для мониторинга здоровья приложения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Logs — просмотр логов контейнера</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-text-box-search</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Что это?</h3>
                  <p class="text-body-2">Команда для просмотра stdout и stderr вывода контейнера</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-clock-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Реальное время</h3>
                  <p class="text-body-2">Возможность следить за логами в реальном времени с флагом -f</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-filter-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Фильтрация</h3>
                  <p class="text-body-2">Фильтр по времени, количеству строк и поиск по содержимому</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLogs"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Exec — интерактивное подключение</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Интерактивный режим</h3>
                  <ul class="pl-4">
                    <li><code>-i</code> — интерактивный режим (STDIN)</li>
                    <li><code>-t</code> — псевдо-TTY (терминал)</li>
                    <li><code>-it</code> — комбинация для полноценного терминала</li>
                    <li>Работает только с запущенными контейнерами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Отладочные возможности</h3>
                  <ul class="pl-4">
                    <li>Проверка файловой системы</li>
                    <li>Запуск команд внутри контейнера</li>
                    <li>Проверка сетевых подключений</li>
                    <li>Анализ процессов и ресурсов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedExec"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Healthcheck — мониторинг здоровья</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Healthcheck позволяет Docker автоматически определять, здоров ли контейнер. Это критически важно для production окружений и оркестрации.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-heart-pulse</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Здоровье</h3>
                  <p class="text-body-2">Автоматическая проверка работоспособности приложения</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-restart</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Перезапуск</h3>
                  <p class="text-body-2">Автоматический перезапуск нездоровых контейнеров</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-chart-line</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <p class="text-body-2">Интеграция с системами мониторинга и оркестрации</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="deep-purple" class="mb-2">mdi-network-pos</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Load Balancer</h3>
                  <p class="text-body-2">Исключение нездоровых контейнеров из балансировки</p>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Параметры HEALTHCHECK</h3>
            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Параметр</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">По умолчанию</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>--interval</code></td>
                <td class="pt-2 pb-2">Интервал между проверками</td>
                <td class="pt-2 pb-2">30s</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>--timeout</code></td>
                <td class="pt-2 pb-2">Таймаут одной проверки</td>
                <td class="pt-2 pb-2">30s</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>--start-period</code></td>
                <td class="pt-2 pb-2">Период инициализации приложения</td>
                <td class="pt-2 pb-2">0s</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>--retries</code></td>
                <td class="pt-2 pb-2">Количество попыток до признания нездоровым</td>
                <td class="pt-2 pb-2">3</td>
              </tr>
              </tbody>
            </v-table>

            <h3 class="text-h6 font-weight-bold mb-3">Статусы Healthcheck</h3>
            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-blue-lighten-5">
                  <v-icon size="large" color="blue" class="mb-2">mdi-clock-outline</v-icon>
                  <h4 class="text-subtitle-1 font-weight-bold">starting</h4>
                  <p class="text-caption">Период инициализации</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-green-lighten-5">
                  <v-icon size="large" color="green" class="mb-2">mdi-check-circle</v-icon>
                  <h4 class="text-subtitle-1 font-weight-bold">healthy</h4>
                  <p class="text-caption">Контейнер здоров</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-red-lighten-5">
                  <v-icon size="large" color="red" class="mb-2">mdi-close-circle</v-icon>
                  <h4 class="text-subtitle-1 font-weight-bold">unhealthy</h4>
                  <p class="text-caption">Проверка провалилась</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center bg-grey-lighten-3">
                  <v-icon size="large" color="grey" class="mb-2">mdi-help-circle</v-icon>
                  <h4 class="text-subtitle-1 font-weight-bold">none</h4>
                  <p class="text-caption">Healthcheck не настроен</p>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">HEALTHCHECK в Dockerfile</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHealthDockerfile"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Кастомный healthcheck скрипт</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHealthScript"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Health endpoint в Express.js</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHealthExpress"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Healthcheck в Docker Compose</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHealthCompose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комплексная отладка контейнера</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebugging"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как посмотреть логи контейнера, который постоянно перезапускается?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>docker logs container_name</code> даже если контейнер перезапущен — логи сохраняются.
                  Для автоматического перезапуска: <code>docker logs -f --since 5m container_name</code> покажет последние логи.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Контейнер запускается, но приложение не отвечает. Как отладить?</p>
                <p class="font-weight-regular ma-0">
                  1) <code>docker exec -it container_name sh</code> — подключиться к контейнеру
                  2) <code>ps aux</code> — проверить запущенные процессы
                  3) <code>netstat -tlnp</code> — проверить открытые порты
                  4) <code>curl localhost:port</code> — проверить приложение изнутри
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужен HEALTHCHECK и как он работает?</p>
                <p class="font-weight-regular ma-0">
                  HEALTHCHECK позволяет Docker определять работоспособность приложения, не полагаясь только на статус процесса.
                  Выполняется периодически, возвращает exit code 0 (здоров) или 1 (нездоров). Используется оркестраторами для перезапуска.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается docker exec от docker run?</p>
                <p class="font-weight-regular ma-0">
                  <code>docker run</code> создает новый контейнер из образа, <code>docker exec</code> выполняет команду в уже запущенном контейнере.
                  exec не создает новый контейнер, а использует namespace и окружение существующего.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить, почему контейнер считается unhealthy?</p>
                <p class="font-weight-regular ma-0">
                  <code>docker inspect container_name</code> покажет последние результаты healthcheck в разделе State.Health.
                  Также можно запустить healthcheck команду вручную через <code>docker exec</code> для отладки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как ограничить размер логов контейнера?</p>
                <p class="font-weight-regular ma-0">
                  При запуске: <code>docker run --log-opt max-size=10m --log-opt max-file=3</code>
                  В compose: logging.options.max-size: "10m". Логи ротируются автоматически при достижении лимита.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делать, если exec не работает (контейнер без bash/sh)?</p>
                <p class="font-weight-regular ma-0">
                  Проверить доступные исполнимые файлы: <code>docker exec container_name ls /bin</code>
                  Попробовать другие shell: <code>/bin/ash</code>, <code>/usr/bin/sh</code>
                  Использовать <code>docker cp</code> для копирования файлов отладки.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики отладки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Логирование</h3>
                  <ul class="text-left pl-4">
                    <li>Структурированные логи (JSON)</li>
                    <li>Разные уровни логирования</li>
                    <li>Ротация логов</li>
                    <li>Централизованное логирование</li>
                    <li>Контекстная информация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-heart-pulse</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Healthcheck</h3>
                  <ul class="text-left pl-4">
                    <li>Всегда настраивать healthcheck</li>
                    <li>Проверять зависимости</li>
                    <li>Быстрые проверки (\<5s)</li>
                    <li>Graceful degradation</li>
                    <li>Детальная информация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-tools</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Инструменты</h3>
                  <ul class="text-left pl-4">
                    <li>Мониторинг ресурсов</li>
                    <li>Профилирование производительности</li>
                    <li>Трейсинг запросов</li>
                    <li>Интеграция с APM системами</li>
                    <li>Автоматизированные проверки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практические сценарии отладки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Сценарий 1: Контейнер не запускается</h3>
                  <ol class="pl-4">
                    <li><code>docker ps -a</code> — проверить статус</li>
                    <li><code>docker logs container_name</code> — посмотреть ошибки</li>
                    <li><code>docker inspect container_name</code> — детали конфигурации</li>
                    <li>Проверить Dockerfile и переменные окружения</li>
                  </ol>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Сценарий 2: Приложение не отвечает</h3>
                  <ol class="pl-4">
                    <li><code>docker exec -it container_name sh</code></li>
                    <li><code>ps aux</code> — проверить процессы</li>
                    <li><code>netstat -tlnp</code> — открытые порты</li>
                    <li><code>curl localhost:port/health</code> — тест изнутри</li>
                  </ol>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Мониторинг в production</h2>
            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Production:</strong> В производственной среде обязательно настройте централизованное логирование (ELK, Fluentd), мониторинг (Prometheus, Grafana) и алерты на основе healthcheck статуса.
            </v-alert>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="blue" class="mb-2">mdi-chart-timeline-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Логи</h3>
                  <ul class="text-left pl-4">
                    <li>Централизованный сбор</li>
                    <li>Структурированный формат</li>
                    <li>Ротация и архивирование</li>
                    <li>Поиск и фильтрация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="green" class="mb-2">mdi-pulse</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Метрики</h3>
                  <ul class="text-left pl-4">
                    <li>CPU, память, диск</li>
                    <li>Сетевой трафик</li>
                    <li>Время отклика</li>
                    <li>Количество ошибок</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="orange" class="mb-2">mdi-bell-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Алерты</h3>
                  <ul class="text-left pl-4">
                    <li>Unhealthy контейнеры</li>
                    <li>Высокое использование ресурсов</li>
                    <li>Частые ошибки в логах</li>
                    <li>Недоступность сервисов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Эффективная отладка Docker контейнеров требует комплексного подхода: <b>docker logs</b> для анализа вывода,
              <b>docker exec</b> для интерактивного исследования, и <b>healthcheck</b> для проактивного мониторинга.
              Комбинирование этих инструментов с правильным логированием и мониторингом обеспечивает надежную работу
              приложений в контейнерах как в разработке, так и в production.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/commandline/logs/"
                target="_blank"
                class="mr-2">
                Docker Logs Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/builder/#healthcheck"
                target="_blank">
                Healthcheck Reference
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
