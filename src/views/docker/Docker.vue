<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-yaml.js'

const dockerfileSnippet = `
# Dockerfile example
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование исходного кода
COPY . .

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
`

const commandsSnippet = `
# =====================================
# ОСНОВНЫЕ КОМАНДЫ DOCKER
# =====================================

# Работа с образами
docker build -t my-app:1.0 .          # Создать образ
docker images                          # Список образов
docker pull nginx:latest               # Скачать образ
docker rmi my-app:1.0                  # Удалить образ
docker tag my-app:1.0 my-app:latest    # Создать тег

# Работа с контейнерами
docker run -d -p 3000:3000 my-app:1.0 # Запустить контейнер
docker ps                              # Запущенные контейнеры
docker ps -a                           # Все контейнеры
docker stop container_id               # Остановить контейнер
docker start container_id              # Запустить контейнер
docker rm container_id                 # Удалить контейнер

# Интерактивная работа
docker exec -it container_id /bin/bash # Зайти в контейнер
docker logs container_id               # Посмотреть логи
docker inspect container_id            # Информация о контейнере

# Очистка
docker system prune                    # Удалить неиспользуемые ресурсы
docker container prune                 # Удалить остановленные контейнеры
docker image prune                     # Удалить неиспользуемые образы
`

const dockerComposeSnippet = `
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
`

const highlightedDockerfile = ref('')
const highlightedCommands = ref('')
const highlightedCompose = ref('')

onMounted(() => {
  highlightedDockerfile.value = Prism.highlight(dockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedCommands.value = Prism.highlight(commandsSnippet, Prism.languages.bash, 'bash')
  highlightedCompose.value = Prism.highlight(dockerComposeSnippet, Prism.languages.yaml, 'yaml')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Что такое Docker? Образы и контейнеры
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Docker</b> — это платформа контейнеризации, которая позволяет упаковывать приложения
              со всеми их зависимостями в легковесные, переносимые контейнеры. Docker решает проблему
              <i>"у меня работает, а у вас не работает"</i> и обеспечивает консистентную среду выполнения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные понятия Docker</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" elevation="2">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-package-variant</v-icon>
                    <h3 class="text-h6 font-weight-bold">Образ (Image)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Шаблон</strong> для создания контейнеров</li>
                    <li><strong>Неизменяемый</strong> (immutable)</li>
                    <li>Содержит ОС, приложение, зависимости</li>
                    <li>Создается из Dockerfile</li>
                    <li>Может быть слоистым (layers)</li>
                    <li>Хранится в реестрах (Docker Hub)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" elevation="2">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-cube-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">Контейнер (Container)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Экземпляр</strong> образа</li>
                    <li><strong>Изменяемый</strong> (mutable)</li>
                    <li>Изолированная среда выполнения</li>
                    <li>Можно запускать, останавливать, удалять</li>
                    <li>Имеет свою файловую систему</li>
                    <li>Делит ядро ОС с хостом</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Аналогия: Образ vs Контейнер</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аналогия</th>
                <th class="text-left font-weight-bold">Образ (Image)</th>
                <th class="text-left font-weight-bold">Контейнер (Container)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Программирование</b></td>
                <td class="pt-2 pb-2">Класс (Class)</td>
                <td class="pt-2 pb-2">Объект/Экземпляр (Instance)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Кулинария</b></td>
                <td class="pt-2 pb-2">Рецепт блюда</td>
                <td class="pt-2 pb-2">Готовое блюдо</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Архитектура</b></td>
                <td class="pt-2 pb-2">Чертеж здания</td>
                <td class="pt-2 pb-2">Построенное здание</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Музыка</b></td>
                <td class="pt-2 pb-2">Ноты композиции</td>
                <td class="pt-2 pb-2">Исполнение композиции</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Что решает Docker?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-sync</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Консистентность</h3>
                  <p class="text-body-2 mb-0">Одинаковое поведение на всех окружениях: dev, test, production</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-lightning-bolt</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Быстрое развертывание</h3>
                  <p class="text-body-2 mb-0">Запуск приложения за секунды, а не минуты</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Изоляция</h3>
                  <p class="text-body-2 mb-0">Приложения не влияют друг на друга</p>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-scale-balance</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Масштабируемость</h3>
                  <p class="text-body-2 mb-0">Легко создать несколько экземпляров приложения</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="deep-purple" class="mb-2">mdi-package-down</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Портативность</h3>
                  <p class="text-body-2 mb-0">Работает на любой системе с Docker</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="teal" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Эффективность</h3>
                  <p class="text-body-2 mb-0">Меньше ресурсов чем виртуальные машины</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Dockerfile - создание образа</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerfile"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные команды Docker</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommands"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker Compose - многоконтейнерные приложения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompose"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Docker vs Виртуальные машины</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Docker контейнеры</th>
                <th class="text-left font-weight-bold">Виртуальные машины</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Ресурсы</b></td>
                <td class="pt-2 pb-2">Легковесные (MB)</td>
                <td class="pt-2 pb-2">Тяжелые (GB)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Запуск</b></td>
                <td class="pt-2 pb-2">Секунды</td>
                <td class="pt-2 pb-2">Минуты</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Изоляция</b></td>
                <td class="pt-2 pb-2">Процессы</td>
                <td class="pt-2 pb-2">Полная (гипервизор)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>ОС</b></td>
                <td class="pt-2 pb-2">Общее ядро</td>
                <td class="pt-2 pb-2">Отдельные ОС</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Плотность</b></td>
                <td class="pt-2 pb-2">Тысячи контейнеров</td>
                <td class="pt-2 pb-2">Десятки VM</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Архитектура Docker</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Компоненты</h3>
                  <ul class="pl-4">
                    <li><strong>Docker Client:</strong> CLI интерфейс</li>
                    <li><strong>Docker Daemon:</strong> фоновый процесс</li>
                    <li><strong>Docker Registry:</strong> хранилище образов</li>
                    <li><strong>Docker Objects:</strong> образы, контейнеры, volumes</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Принцип работы</h3>
                  <ol class="pl-4">
                    <li>Client отправляет команду Daemon'у</li>
                    <li>Daemon управляет объектами Docker</li>
                    <li>Registry хранит и распространяет образы</li>
                    <li>Контейнеры запускаются из образов</li>
                  </ol>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Жизненный цикл контейнера</h2>
            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Created" value="1" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Running" value="2" complete></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Paused" value="3"></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Stopped" value="4"></v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Deleted" value="5"></v-stepper-item>
              </v-stepper-header>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Основные концепции Docker</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Слои (Layers)</h3>
                  <ul class="pl-4">
                    <li>Образы состоят из слоев</li>
                    <li>Каждая инструкция в Dockerfile = слой</li>
                    <li>Слои кешируются и переиспользуются</li>
                    <li>Только верхний слой изменяемый</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Volumes</h3>
                  <ul class="pl-4">
                    <li>Персистентное хранение данных</li>
                    <li>Разделение данных между контейнерами</li>
                    <li>Backup и восстановление</li>
                    <li>Привязка к хост-системе</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Networks</h3>
                  <ul class="pl-4">
                    <li>Изоляция сетевого трафика</li>
                    <li>Связь между контейнерами</li>
                    <li>Bridge, Host, None, Overlay</li>
                    <li>DNS resolution между контейнерами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Environment Variables</h3>
                  <ul class="pl-4">
                    <li>Конфигурация приложений</li>
                    <li>Передача секретов</li>
                    <li>Разные настройки для окружений</li>
                    <li>Файлы .env и docker-compose</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между образом и контейнером?</p>
                <p class="font-weight-regular ma-0">
                  Образ — это неизменяемый шаблон (как класс в программировании),
                  контейнер — это запущенный экземпляр образа (как объект класса).
                  Из одного образа можно создать множество контейнеров.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое слои в Docker?</p>
                <p class="font-weight-regular ma-0">
                  Слои — это инкрементальные изменения образа. Каждая инструкция в Dockerfile
                  создает новый слой. Слои кешируются и переиспользуются, что экономит место и время.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить персистентность данных?</p>
                <p class="font-weight-regular ma-0">
                  Используя volumes — именованные хранилища данных, которые существуют независимо
                  от жизненного цикла контейнера. Также можно использовать bind mounts.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем преимущества Docker перед VM?</p>
                <p class="font-weight-regular ma-0">
                  Docker использует меньше ресурсов, быстрее запускается, обеспечивает большую
                  плотность развертывания. VM обеспечивают лучшую изоляцию, но потребляют больше ресурсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Docker Compose?</p>
                <p class="font-weight-regular ma-0">
                  Инструмент для определения и запуска многоконтейнерных приложений с помощью YAML файла.
                  Позволяет описать сервисы, сети и volumes в одном конфигурационном файле.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как контейнеры взаимодействуют между собой?</p>
                <p class="font-weight-regular ma-0">
                  Через Docker networks. Контейнеры в одной сети могут обращаться друг к другу
                  по именам контейнеров или сервисов, Docker обеспечивает DNS resolution.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое multi-stage builds?</p>
                <p class="font-weight-regular ma-0">
                  Возможность использовать несколько FROM инструкций в одном Dockerfile
                  для создания промежуточных образов и копирования только нужных файлов в финальный образ.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики Docker</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать .dockerignore</li>
                    <li>Минимизировать количество слоев</li>
                    <li>Использовать alpine образы</li>
                    <li>Запускать как non-root user</li>
                    <li>Использовать multi-stage builds</li>
                    <li>Версионировать образы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Хранить секреты в образах</li>
                    <li>Использовать latest в production</li>
                    <li>Большие образы с ненужными пакетами</li>
                    <li>Запуск под root</li>
                    <li>Хранение данных в контейнере</li>
                    <li>Один контейнер — много процессов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Сетевая безопасность</li>
                    <li>Ограничения ресурсов</li>
                    <li>Логирование и мониторинг</li>
                    <li>Обновления базовых образов</li>
                    <li>Backup volumes</li>
                    <li>Healthcheck настройки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Использование в разработке</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Development</h3>
                  <ul class="pl-4">
                    <li>Одинаковая среда у всех разработчиков</li>
                    <li>Быстрая настройка окружения</li>
                    <li>Изоляция проектов</li>
                    <li>Простое переключение между версиями</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Production</h3>
                  <ul class="pl-4">
                    <li>Масштабирование приложений</li>
                    <li>Zero-downtime deployments</li>
                    <li>Микросервисная архитектура</li>
                    <li>Оркестрация с Kubernetes</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Docker — это платформа контейнеризации, которая решает проблемы консистентности,
              развертывания и масштабирования приложений. <b>Образ</b> — это неизменяемый шаблон
              с приложением и его зависимостями, а <b>контейнер</b> — это запущенный экземпляр образа.
              Docker обеспечивает изоляцию, портативность и эффективное использование ресурсов,
              что делает его стандартом для современной разработки и развертывания приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/"
                target="_blank"
                class="mr-2">
                Docker Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://hub.docker.com/"
                target="_blank">
                Docker Hub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
