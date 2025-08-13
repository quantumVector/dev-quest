<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'

const dockerfileSnippet = `
# Dockerfile - инструкция по сборке образа
FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json (из контекста сборки)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код (из контекста сборки)
COPY src/ ./src/
COPY public/ ./public/

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
`

const contextExampleSnippet = `
# Структура проекта (контекст сборки)
my-app/
├── Dockerfile          # Инструкции для сборки
├── .dockerignore       # Что исключить из контекста
├── package.json        # Зависимости
├── package-lock.json   # Точные версии
├── src/                # Исходный код
│   ├── index.js
│   └── components/
├── public/             # Статические файлы
├── tests/              # Тесты (исключим)
├── node_modules/       # Зависимости (исключим)
└── .git/              # Git история (исключим)
`

const dockerignoreSnippet = `
# .dockerignore - исключаем из контекста сборки

# Зависимости (устанавливаем в образе)
node_modules/
npm-debug.log*

# Git и версионирование
.git/
.gitignore
.gitattributes

# IDE и редакторы
.vscode/
.idea/
*.swp
*.swo

# Тесты и документация
tests/
docs/
*.md
README*

# Временные файлы
*.tmp
*.log
.DS_Store
Thumbs.db

# CI/CD файлы
.github/
.gitlab-ci.yml
Jenkinsfile

# Файлы разработки
.env.local
.env.development
docker-compose.yml
`

const buildCommandSnippet = `
# Сборка образа с контекстом
# Контекст сборки = текущая папка (.)
docker build -t my-app:1.0 .

# Сборка с другим контекстом
docker build -t my-app:1.0 /path/to/context

# Dockerfile в другой папке, контекст текущий
docker build -f docker/Dockerfile -t my-app:1.0 .

# Просмотр размера контекста
du -sh .

# Проверка, что попадает в контекст
tar -czh . | wc -c
`

const highlightedDockerfile = ref('')
const highlightedContext = ref('')
const highlightedDockerignore = ref('')
const highlightedBuild = ref('')

onMounted(() => {
  highlightedDockerfile.value = Prism.highlight(dockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedContext.value = Prism.highlight(contextExampleSnippet, Prism.languages.bash, 'bash')
  highlightedDockerignore.value = Prism.highlight(dockerignoreSnippet, Prism.languages.bash, 'bash')
  highlightedBuild.value = Prism.highlight(buildCommandSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Что такое Dockerfile, контекст сборки и .dockerignore?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Dockerfile</b> — это текстовый файл с инструкциями для автоматической сборки Docker образа.
              <b>Контекст сборки</b> — это набор файлов, которые Docker отправляет daemon'у для использования во время сборки.
              <b>.dockerignore</b> — это файл для исключения ненужных файлов из контекста сборки.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Dockerfile — рецепт образа</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Что это?</h3>
                  <ul class="pl-4">
                    <li><strong>Текстовый файл</strong> с инструкциями</li>
                    <li><strong>Рецепт</strong> для создания образа</li>
                    <li><strong>Декларативное описание</strong> окружения</li>
                    <li><strong>Автоматизация</strong> процесса сборки</li>
                    <li><strong>Версионируется</strong> вместе с кодом</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Основные инструкции</h3>
                  <ul class="pl-4">
                    <li><code>FROM</code> — базовый образ</li>
                    <li><code>WORKDIR</code> — рабочая директория</li>
                    <li><code>COPY</code> — копирование файлов</li>
                    <li><code>RUN</code> — выполнение команд</li>
                    <li><code>EXPOSE</code> — открытие портов</li>
                    <li><code>CMD</code> — команда по умолчанию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerfile"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Контекст сборки — что видит Docker</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Контекст сборки — это все файлы и папки, которые Docker daemon может использовать во время сборки образа. Он определяется путем, указанным в команде <code>docker build</code>.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-folder-open</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Содержимое</h3>
                  <p class="text-body-2">Все файлы из указанной папки отправляются Docker daemon'у</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-network-pos</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Передача</h3>
                  <p class="text-body-2">Контекст передается по сети Docker daemon'у перед сборкой</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-eye</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Видимость</h3>
                  <p class="text-body-2">Только файлы из контекста доступны инструкциям COPY/ADD</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedContext"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы без .dockerignore</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Проблемы</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Большой размер контекста</strong> — node_modules, .git</li>
                    <li><strong>Медленная сборка</strong> — передача ненужных файлов</li>
                    <li><strong>Утечки данных</strong> — секреты, конфиги попадают в образ</li>
                    <li><strong>Кеш инвалидация</strong> — изменения в ненужных файлах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">С .dockerignore</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Быстрая сборка</strong> — меньший контекст</li>
                    <li><strong>Безопасность</strong> — исключение секретов</li>
                    <li><strong>Лучшее кеширование</strong> — стабильность слоев</li>
                    <li><strong>Чистота образа</strong> — только нужные файлы</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">.dockerignore — фильтр контекста</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDockerignore"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Команды сборки и контекст</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBuild"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правила работы с контекстом</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">COPY vs ADD</h3>
                  <ul class="pl-4">
                    <li><code>COPY src/ ./src/</code> — копирует из контекста</li>
                    <li><code>COPY ../outside .</code> — ❌ ОШИБКА! Выходит за контекст</li>
                    <li><code>ADD</code> — может распаковывать архивы</li>
                    <li>Предпочитайте <code>COPY</code> для простоты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Оптимизация контекста</h3>
                  <ul class="pl-4">
                    <li>Используйте <code>.dockerignore</code></li>
                    <li>Минимизируйте размер контекста</li>
                    <li>Копируйте только нужные файлы</li>
                    <li>Используйте multi-stage builds</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при выполнении <code>docker build .</code>?</p>
                <p class="font-weight-regular ma-0">
                  Docker создает tar-архив всех файлов из текущей папки (исключая .dockerignore),
                  отправляет его daemon'у, который распаковывает и использует как контекст для инструкций COPY/ADD.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли копировать файлы извне контекста?</p>
                <p class="font-weight-regular ma-0">
                  Нет! Инструкции COPY и ADD работают только с файлами внутри контекста сборки.
                  <code>COPY ../file .</code> вызовет ошибку. Решение — изменить контекст или использовать multi-stage builds.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как уменьшить размер контекста?</p>
                <p class="font-weight-regular ma-0">
                  Использовать .dockerignore для исключения node_modules/, .git/, тестов,
                  документации и других ненужных файлов. Также можно изменить расположение Dockerfile.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между .dockerignore и .gitignore?</p>
                <p class="font-weight-regular ma-0">
                  .dockerignore исключает файлы из контекста сборки Docker, .gitignore — из Git репозитория.
                  Часто пересекаются, но имеют разные цели: Docker — оптимизация сборки, Git — версионирование.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое слои и как они связаны с контекстом?</p>
                <p class="font-weight-regular ma-0">
                  Каждая инструкция Dockerfile создает слой. Файлы из контекста копируются в слои через COPY/ADD.
                  Изменение файлов в контексте инвалидирует кеш слоев, поэтому важно оптимизировать порядок инструкций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить, что попадает в контекст?</p>
                <p class="font-weight-regular ma-0">
                  Можно использовать <code>docker build --dry-run</code> (если поддерживается),
                  проверить размер через <code>du -sh .</code> или создать временный tar: <code>tar -czf context.tar.gz .</code>
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
                    <li>Всегда создавать .dockerignore</li>
                    <li>Исключать node_modules/, .git/</li>
                    <li>Копировать только нужные файлы</li>
                    <li>Использовать COPY вместо ADD</li>
                    <li>Оптимизировать порядок инструкций</li>
                    <li>Проверять размер контекста</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Копирование всего проекта COPY . .</li>
                    <li>Включение секретов в контекст</li>
                    <li>Большие контексты (>100MB)</li>
                    <li>Попытки выйти за контекст</li>
                    <li>Игнорирование .dockerignore</li>
                    <li>Копирование бинарных файлов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Структурируйте Dockerfile слоями</li>
                    <li>Используйте multi-stage builds</li>
                    <li>Кешируйте зависимости отдельно</li>
                    <li>Копируйте package.json первым</li>
                    <li>Мониторьте размер образов</li>
                    <li>Автоматизируйте сборку</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Dockerfile</b> — это инструкция по сборке образа. <b>Контекст сборки</b> — это набор файлов,
              доступных для копирования в образ через COPY/ADD. <b>.dockerignore</b> исключает ненужные файлы
              из контекста, ускоряя сборку и повышая безопасность. Правильная настройка этих компонентов —
              ключ к эффективной работе с Docker.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/builder/"
                target="_blank"
                class="mr-2">
                Dockerfile Reference
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/engine/reference/builder/#dockerignore-file"
                target="_blank">
                .dockerignore Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
