<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'

const exposeSnippet = `
# Dockerfile - EXPOSE только документирует порт
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# EXPOSE - только документация!
# Не открывает порт наружу
EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]
`

const runCommandsSnippet = `
# =====================================
# EXPOSE vs -p РАЗНИЦА
# =====================================

# 1. Только EXPOSE в Dockerfile - порт НЕ доступен снаружи
docker run my-app
# Приложение работает на порту 3000 ВНУТРИ контейнера
# НО недоступно с хоста! curl localhost:3000 - НЕ РАБОТАЕТ

# 2. Флаг -p делает порт доступным снаружи
docker run -p 3000:3000 my-app
# Теперь curl localhost:3000 - РАБОТАЕТ!

# 3. -p с другим портом хоста
docker run -p 8080:3000 my-app
# localhost:8080 -> контейнер:3000

# 4. Привязка к конкретному IP
docker run -p 127.0.0.1:3000:3000 my-app
# Доступно только с localhost

# 5. Автоматическое назначение порта
docker run -P my-app
# Docker автоматически назначит случайный порт для EXPOSE

# 6. Несколько портов
docker run -p 3000:3000 -p 8080:8080 my-app
`

const networkTypesSnippet = `
# =====================================
# ТИПЫ СЕТЕЙ В DOCKER
# =====================================

# 1. BRIDGE (по умолчанию)
docker run -d nginx                    # Автоматически bridge
docker run -d --network bridge nginx  # Явно bridge

# 2. HOST - использует сеть хоста
docker run -d --network host nginx
# Контейнер использует IP хоста напрямую
# Нет изоляции портов!

# 3. NONE - без сети
docker run -d --network none nginx
# Только loopback интерфейс

# 4. Пользовательские сети
docker network create my-network
docker run -d --network my-network nginx

# 5. Список сетей
docker network ls

# 6. Подробная информация о сети
docker network inspect bridge
`

const networkExamplesSnippet = `
# =====================================
# ПРАКТИЧЕСКИЕ ПРИМЕРЫ
# =====================================

# Bridge сеть (изолированная)
docker run -d -p 80:80 --name web nginx
docker run -d --name app --link web myapp

# Host сеть (прямой доступ)
docker run -d --network host nginx
# nginx доступен на всех IP хоста на порту 80

# Пользовательская сеть
docker network create --driver bridge my-app-net
docker run -d --network my-app-net --name db postgres
docker run -d --network my-app-net --name web -p 80:80 nginx
# Контейнеры могут обращаться друг к другу по именам

# Подключение к нескольким сетям
docker network connect my-app-net existing-container
`

const composeNetworkSnippet = `
# docker-compose.yml - автоматические сети
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "80:80"        # host:container
      - "443:443"
    networks:
      - frontend

  api:
    build: .
    expose:
      - "3000"         # Только внутри compose сети
    networks:
      - frontend
      - backend

  db:
    image: postgres
    # НЕТ ports - недоступна снаружи
    # ЕСТЬ expose внутри образа
    networks:
      - backend
    environment:
      POSTGRES_DB: myapp

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
`

const highlightedExpose = ref('')
const highlightedRun = ref('')
const highlightedNetworks = ref('')
const highlightedExamples = ref('')
const highlightedCompose = ref('')

onMounted(() => {
  highlightedExpose.value = Prism.highlight(exposeSnippet, Prism.languages.docker, 'docker')
  highlightedRun.value = Prism.highlight(runCommandsSnippet, Prism.languages.bash, 'bash')
  highlightedNetworks.value = Prism.highlight(networkTypesSnippet, Prism.languages.bash, 'bash')
  highlightedExamples.value = Prism.highlight(networkExamplesSnippet, Prism.languages.bash, 'bash')
  highlightedCompose.value = Prism.highlight(composeNetworkSnippet, Prism.languages.yaml, 'yaml')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              EXPOSE vs -p, типы сетей Docker: bridge, host
            </h1>

            <p class="font-weight-regular mb-6">
              Понимание разницы между <b>EXPOSE</b> и <b>-p</b> критически важно для работы с Docker.
              <b>EXPOSE</b> — это только документация, а <b>-p</b> реально открывает порты.
              <b>Bridge</b> изолирует контейнеры, <b>host</b> использует сеть хоста напрямую.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">EXPOSE — только документация!</h2>

            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> EXPOSE в Dockerfile НЕ открывает порт наружу!
              Это только документация для других разработчиков и для команды <code>docker run -P</code>.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedExpose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">EXPOSE vs -p — ключевые различия</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-file-document</v-icon>
                    <h3 class="text-h6 font-weight-bold">EXPOSE</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Только документация</strong></li>
                    <li><strong>В Dockerfile</strong> — статично</li>
                    <li><strong>Не открывает</strong> порт наружу</li>
                    <li><strong>Используется</strong> с -P флагом</li>
                    <li><strong>Информирует</strong> о портах приложения</li>
                    <li><strong>Метаданные</strong> образа</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-network</v-icon>
                    <h3 class="text-h6 font-weight-bold">-p (--publish)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Реальное</strong> открытие порта</li>
                    <li><strong>При запуске</strong> — динамично</li>
                    <li><strong>Пробрасывает</strong> трафик</li>
                    <li><strong>host:container</strong> маппинг</li>
                    <li><strong>Доступ снаружи</strong> контейнера</li>
                    <li><strong>Runtime</strong> конфигурация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRun"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы сетей в Docker</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-bridge</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Bridge (по умолчанию)</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Изолированная</strong> сеть</li>
                    <li><strong>Docker0</strong> интерфейс</li>
                    <li><strong>NAT</strong> для доступа наружу</li>
                    <li><strong>Нужен -p</strong> для портов</li>
                    <li><strong>172.17.0.0/16</strong> подсеть</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-server-network</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Host</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Сеть хоста</strong> напрямую</li>
                    <li><strong>Нет изоляции</strong> портов</li>
                    <li><strong>Максимальная</strong> производительность</li>
                    <li><strong>Не нужен -p</strong></li>
                    <li><strong>Конфликты</strong> портов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-network-off</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">None</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Без сети</strong></li>
                    <li><strong>Только loopback</strong></li>
                    <li><strong>Максимальная</strong> изоляция</li>
                    <li><strong>Нет доступа</strong> в интернет</li>
                    <li><strong>Для безопасности</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNetworks"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Bridge vs Host — детальное сравнение</h2>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Bridge</th>
                <th class="text-left font-weight-bold">Host</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Изоляция</b></td>
                <td class="pt-2 pb-2">✅ Полная изоляция портов</td>
                <td class="pt-2 pb-2">❌ Нет изоляции</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность</b></td>
                <td class="pt-2 pb-2">⚠️ Небольшие накладные расходы</td>
                <td class="pt-2 pb-2">✅ Максимальная</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Безопасность</b></td>
                <td class="pt-2 pb-2">✅ Лучше (изоляция)</td>
                <td class="pt-2 pb-2">⚠️ Хуже (прямой доступ)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Порты</b></td>
                <td class="pt-2 pb-2">Нужен -p для доступа</td>
                <td class="pt-2 pb-2">Автоматически доступны</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>IP адрес</b></td>
                <td class="pt-2 pb-2">Внутренний (172.17.x.x)</td>
                <td class="pt-2 pb-2">IP хоста</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Использование</b></td>
                <td class="pt-2 pb-2">Обычные приложения</td>
                <td class="pt-2 pb-2">Мониторинг, сетевые утилиты</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Compose и сети</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические сценарии</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-web</v-icon>
                    <h3 class="text-h6 font-weight-bold">Web приложение</h3>
                  </div>
                  <div class="text-caption mb-2 text-success">✅ Bridge + -p</div>
                  <p class="text-body-2">
                    <code>docker run -p 80:3000 myapp</code><br>
                    Изоляция + контролируемый доступ
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-monitor-dashboard</v-icon>
                    <h3 class="text-h6 font-weight-bold">Мониторинг</h3>
                  </div>
                  <div class="text-caption mb-2 text-success">✅ Host сеть</div>
                  <p class="text-body-2">
                    <code>docker run --net host prometheus</code><br>
                    Доступ ко всем портам хоста
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-database</v-icon>
                    <h3 class="text-h6 font-weight-bold">База данных</h3>
                  </div>
                  <div class="text-caption mb-2 text-success">✅ Bridge без -p</div>
                  <p class="text-body-2">
                    <code>docker run postgres</code><br>
                    Только внутренний доступ
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между EXPOSE и -p?</p>
                <p class="font-weight-regular ma-0">
                  EXPOSE — только документация в Dockerfile, не открывает порт наружу.
                  -p (--publish) реально пробрасывает порт с хоста в контейнер, обеспечивая доступ снаружи.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать host сеть вместо bridge?</p>
                <p class="font-weight-regular ma-0">
                  Host сеть используется для мониторинга, сетевых утилит, когда нужна максимальная производительность
                  или доступ ко всем портам хоста. Bridge — для обычных приложений, где важна изоляция.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит с портами в host сети?</p>
                <p class="font-weight-regular ma-0">
                  В host сети контейнер использует сеть хоста напрямую. Все порты контейнера автоматически
                  доступны на хосте. Флаг -p не нужен и игнорируется.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как контейнеры общаются в bridge сети?</p>
                <p class="font-weight-regular ma-0">
                  В bridge сети контейнеры получают внутренние IP (172.17.x.x) и могут общаться между собой
                  по IP или через --link. В пользовательских сетях — по именам контейнеров (DNS).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делает команда docker run -P?</p>
                <p class="font-weight-regular ma-0">
                  -P (заглавная P) автоматически публикует ВСЕ порты из EXPOSE на случайные порты хоста.
                  Например, EXPOSE 3000 → хост:32768:контейнер:3000
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли изменить сеть запущенного контейнера?</p>
                <p class="font-weight-regular ma-0">
                  Можно подключить контейнер к дополнительным сетям:
                  <code>docker network connect network_name container_name</code>.
                  Но нельзя изменить основную сеть без пересоздания.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Диагностика сетевых проблем</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Отладка подключений</h3>
                  <ul class="pl-4">
                    <li><code>docker port container_name</code> — порты контейнера</li>
                    <li><code>docker network inspect bridge</code> — детали сети</li>
                    <li><code>docker exec -it container sh</code> — войти в контейнер</li>
                    <li><code>netstat -tlnp</code> — открытые порты в контейнере</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Частые проблемы</h3>
                  <ul class="pl-4">
                    <li><strong>Порт недоступен</strong> — забыли -p флаг</li>
                    <li><strong>Address already in use</strong> — порт занят</li>
                    <li><strong>Connection refused</strong> — приложение не слушает</li>
                    <li><strong>No route to host</strong> — проблемы с сетью</li>
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
                    <li>Всегда использовать EXPOSE в Dockerfile</li>
                    <li>Использовать bridge для изоляции</li>
                    <li>Создавать пользовательские сети</li>
                    <li>Минимизировать открытые порты</li>
                    <li>Документировать сетевую архитектуру</li>
                    <li>Тестировать доступность портов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Host сеть в production без причины</li>
                    <li>Открывать все порты -P</li>
                    <li>Хардкодить IP адреса</li>
                    <li>Использовать --link (deprecated)</li>
                    <li>Игнорировать сетевую безопасность</li>
                    <li>Забывать про firewall</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте Docker Compose для сложных сетей</li>
                    <li>Настраивайте health checks</li>
                    <li>Мониторьте сетевой трафик</li>
                    <li>Изучите iptables правила Docker</li>
                    <li>Тестируйте в изолированных средах</li>
                    <li>Изучайте logs при проблемах</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>EXPOSE</b> — это документация в Dockerfile, <b>-p</b> — реальное открытие портов при запуске.
              <b>Bridge сеть</b> обеспечивает изоляцию и безопасность, <b>host сеть</b> — максимальную производительность
              без изоляции. Понимание этих концепций критично для правильной настройки Docker приложений
              и успешного прохождения собеседования.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/config/containers/container-networking/"
                target="_blank"
                class="mr-2">
                Docker Networking
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/run/#network-settings"
                target="_blank">
                Network Settings
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
