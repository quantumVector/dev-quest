<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'

const badDockerfileSnippet = `
# ❌ НЕПРАВИЛЬНО - плохое кэширование
FROM node:18-alpine

WORKDIR /app

# Копируем всё сразу - кэш инвалидируется при любом изменении
COPY . .

# Устанавливаем зависимости каждый раз заново
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
`

const goodDockerfileSnippet = `
# ✅ ПРАВИЛЬНО - оптимальное кэширование
FROM node:18-alpine

WORKDIR /app

# Шаг 1: Копируем только файлы зависимостей
COPY package*.json ./

# Шаг 2: Устанавливаем зависимости (кэшируется!)
RUN npm ci --only=production

# Шаг 3: Копируем исходный код (в последнюю очередь)
COPY src/ ./src/
COPY public/ ./public/

EXPOSE 3000
CMD ["npm", "start"]
`

const layerExampleSnippet = `
# Каждая инструкция = новый слой
FROM node:18-alpine        # Слой 1: Базовый образ
WORKDIR /app               # Слой 2: Создание директории
COPY package*.json ./      # Слой 3: Копирование package.json
RUN npm ci                 # Слой 4: Установка зависимостей
COPY src/ ./src/           # Слой 5: Копирование исходников
EXPOSE 3000                # Слой 6: Открытие порта (метаданные)
CMD ["npm", "start"]       # Слой 7: Команда запуска (метаданные)
`

const cacheScenarioSnippet = `
# Сценарий 1: Изменили исходный код (src/index.js)
# При оптимальной структуре Dockerfile:

✅ Слой 1 (FROM) - кэш HIT
✅ Слой 2 (WORKDIR) - кэш HIT
✅ Слой 3 (COPY package*.json) - кэш HIT (файлы не изменились)
✅ Слой 4 (RUN npm ci) - кэш HIT (зависимости не изменились)
❌ Слой 5 (COPY src/) - кэш MISS (исходники изменились)
⚡ Слои 6-7 - пересобираются быстро

# Результат: npm ci НЕ выполняется повторно!

# Сценарий 2: Изменили зависимости (package.json)
✅ Слой 1 (FROM) - кэш HIT
✅ Слой 2 (WORKDIR) - кэш HIT
❌ Слой 3 (COPY package*.json) - кэш MISS
❌ Слой 4 (RUN npm ci) - кэш MISS (зависит от слоя 3)
❌ Слои 5-7 - пересобираются

# Результат: npm ci выполняется, т.к. зависимости изменились
`

const commandsSnippet = `
# Просмотр слоев образа
docker history my-app:latest

# Просмотр размера слоев
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Сборка с выводом информации о кэше
docker build -t my-app . --progress=plain

# Сборка без использования кэша
docker build -t my-app . --no-cache

# Просмотр кэша сборки
docker system df

# Очистка кэша сборки
docker builder prune
`

const optimizationSnippet = `
# Продвинутые техники оптимизации слоев

# 1. Группировка RUN команд для уменьшения слоев
RUN apt-get update && \
    apt-get install -y \
        curl \
        git \
        python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 2. Multi-stage builds для минимизации финального образа
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 3. Использование .dockerignore для стабильности кэша
# В .dockerignore:
# node_modules/
# .git/
# *.log
# tests/
`

const highlightedBadDockerfile = ref('')
const highlightedGoodDockerfile = ref('')
const highlightedLayerExample = ref('')
const highlightedCacheScenario = ref('')
const highlightedCommands = ref('')
const highlightedOptimization = ref('')

onMounted(() => {
  highlightedBadDockerfile.value = Prism.highlight(badDockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedGoodDockerfile.value = Prism.highlight(goodDockerfileSnippet, Prism.languages.docker, 'docker')
  highlightedLayerExample.value = Prism.highlight(layerExampleSnippet, Prism.languages.docker, 'docker')
  highlightedCacheScenario.value = Prism.highlight(cacheScenarioSnippet, Prism.languages.bash, 'bash')
  highlightedCommands.value = Prism.highlight(commandsSnippet, Prism.languages.bash, 'bash')
  highlightedOptimization.value = Prism.highlight(optimizationSnippet, Prism.languages.docker, 'docker')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Docker: Слои, кэш и оптимизация сборки
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Ключевой принцип Docker:</b> каждая инструкция в Dockerfile создает новый слой.
              Понимание работы слоев и кэширования критически важно для эффективной сборки образов.
              Почему мы копируем <code>package.json</code> перед <code>npm install</code>, а исходный код — в последнюю очередь?
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы: что такое слои Docker?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-layers-triple</v-icon>
                    <h3 class="text-h6 font-weight-bold">Слой (Layer)</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Неизменяемая</strong> файловая система</li>
                    <li><strong>Результат</strong> выполнения инструкции</li>
                    <li><strong>Кэшируется</strong> по содержимому</li>
                    <li><strong>Переиспользуется</strong> между образами</li>
                    <li><strong>Накладывается</strong> поверх предыдущих</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-cached</v-icon>
                    <h3 class="text-h6 font-weight-bold">Кэш</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Проверяется</strong> перед каждой инструкцией</li>
                    <li><strong>Инвалидируется</strong> при изменениях</li>
                    <li><strong>Ускоряет</strong> повторные сборки</li>
                    <li><strong>Зависит</strong> от порядка инструкций</li>
                    <li><strong>Общий</strong> для всех образов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Каждая инструкция = новый слой</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLayerExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Неправильный подход</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> При любом изменении кода зависимости устанавливаются заново, даже если package.json не изменился!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBadDockerfile"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">✅ Правильный подход</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Преимущество:</strong> Зависимости кэшируются отдельно от исходного кода. При изменении кода npm ci не выполняется!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGoodDockerfile"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как работает кэширование слоев</h2>

            <v-stepper class="mb-8" alt-labels>
              <v-stepper-header>
                <v-stepper-item title="Проверка кэша" value="1" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-magnify</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Сравнение" value="2" complete color="primary">
                  <template v-slot:icon>
                    <v-icon>mdi-compare</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Cache HIT" value="3" color="success">
                  <template v-slot:icon>
                    <v-icon>mdi-check</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item title="Cache MISS" value="4" color="error">
                  <template v-slot:icon>
                    <v-icon>mdi-close</v-icon>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
              <v-stepper-window>
                <v-stepper-window-item value="1">
                  <div class="pa-4">
                    <h3>1. Проверка кэша</h3>
                    <p>Docker проверяет, есть ли уже готовый слой для данной инструкции</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="2">
                  <div class="pa-4">
                    <h3>2. Сравнение</h3>
                    <p>Сравнивается контрольная сумма (checksum) файлов и содержимого команды</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="3">
                  <div class="pa-4">
                    <h3>3. Cache HIT</h3>
                    <p>Если найден идентичный слой — используется готовый, инструкция пропускается</p>
                  </div>
                </v-stepper-window-item>
                <v-stepper-window-item value="4">
                  <div class="pa-4">
                    <h3>4. Cache MISS</h3>
                    <p>Если слой не найден — выполняется инструкция, все последующие слои инвалидируются</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>
            </v-stepper>

            <h2 class="text-h5 font-weight-bold mb-3">Сценарии кэширования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCacheScenario"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Почему именно такой порядок?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-primary">
                  <v-icon size="large" color="white" class="mb-2">mdi-numeric-1-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">package.json первым</h3>
                  <p class="text-white text-body-2">Зависимости изменяются редко. Копируем файлы зависимостей в отдельный слой</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-numeric-2-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">npm ci после</h3>
                  <p class="text-white text-body-2">Установка зависимостей в отдельном слое. Кэшируется, пока package.json не изменится</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-warning">
                  <v-icon size="large" color="white" class="mb-2">mdi-numeric-3-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Исходники в конце</h3>
                  <p class="text-white text-body-2">Код изменяется часто. Копируем последним, чтобы не инвалидировать кэш зависимостей</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практические команды</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommands"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники оптимизации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOptimization"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при изменении одного слоя?</p>
                <p class="font-weight-regular ma-0">
                  Инвалидируются все последующие слои. Если изменился слой 3, то слои 4, 5, 6... будут пересобраны,
                  даже если их инструкции не изменились. Поэтому порядок критически важен.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему COPY package.json делают отдельно от COPY . ?</p>
                <p class="font-weight-regular ma-0">
                  Чтобы разделить зависимости и исходный код в разные слои. При изменении исходников
                  слой с зависимостями остается в кэше, и npm install не выполняется повторно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Docker определяет, что слой изменился?</p>
                <p class="font-weight-regular ma-0">
                  По контрольной сумме (checksum) файлов для COPY/ADD инструкций и по тексту команды
                  для RUN. Если хэш отличается от кэшированного — слой пересобирается.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое cache busting?</p>
                <p class="font-weight-regular ma-0">
                  Намеренная инвалидация кэша, например, добавление случайного числа в команду:
                  RUN apt-get update && echo "Cache bust: $(date)". Используется редко.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли порядок файлов в COPY на кэш?</p>
                <p class="font-weight-regular ma-0">
                  Да! COPY src/ dest/ и COPY public/ src/ dest/ создают разные слои с разными хэшами.
                  Изменение любого файла в копируемой папке инвалидирует весь слой.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем группировать RUN команды?</p>
                <p class="font-weight-regular ma-0">
                  Каждый RUN создает слой. Группировка (RUN cmd1 && cmd2 && cmd3) создает один слой
                  вместо трех, уменьшая размер образа и количество слоев.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое dangling layers?</p>
                <p class="font-weight-regular ma-0">
                  "Висячие" слои — промежуточные слои, не связанные ни с одним образом.
                  Появляются при пересборке и занимают место. Очищаются через docker image prune.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация по частоте изменений</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Компонент</th>
                <th class="text-left font-weight-bold">Частота изменений</th>
                <th class="text-left font-weight-bold">Порядок в Dockerfile</th>
                <th class="text-left font-weight-bold">Обоснование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Базовый образ</b></td>
                <td class="text-success"><b>Очень редко</b></td>
                <td>1. FROM</td>
                <td>Основа для всех слоев</td>
              </tr>
              <tr>
                <td><b>Системные пакеты</b></td>
                <td class="text-success"><b>Редко</b></td>
                <td>2. RUN apt-get install</td>
                <td>Стабильная инфраструктура</td>
              </tr>
              <tr>
                <td><b>package.json</b></td>
                <td class="text-warning"><b>Иногда</b></td>
                <td>3. COPY package*.json</td>
                <td>Зависимости изменяются реже кода</td>
              </tr>
              <tr>
                <td><b>Установка зависимостей</b></td>
                <td class="text-warning"><b>Иногда</b></td>
                <td>4. RUN npm ci</td>
                <td>Только при изменении package.json</td>
              </tr>
              <tr>
                <td><b>Исходный код</b></td>
                <td class="text-error"><b>Часто</b></td>
                <td>5. COPY src/</td>
                <td>Изменяется при каждом коммите</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Измерение эффективности кэша</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Без оптимизации</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Время сборки:</strong> 5-10 минут</li>
                    <li><strong>npm install:</strong> каждая сборка</li>
                    <li><strong>Сетевой трафик:</strong> скачивание пакетов</li>
                    <li><strong>CPU нагрузка:</strong> высокая</li>
                    <li><strong>Размер слоев:</strong> дублирование</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">С оптимизацией</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Время сборки:</strong> 30-60 секунд</li>
                    <li><strong>npm install:</strong> только при изменении deps</li>
                    <li><strong>Сетевой трафик:</strong> минимальный</li>
                    <li><strong>CPU нагрузка:</strong> низкая</li>
                    <li><strong>Размер слоев:</strong> переиспользование</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики кэширования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Копировать зависимости первыми</li>
                    <li>Группировать похожие команды</li>
                    <li>Использовать .dockerignore</li>
                    <li>Мониторить размер слоев</li>
                    <li>Применять multi-stage builds</li>
                    <li>Минимизировать изменения в начальных слоях</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>COPY . . в начале Dockerfile</li>
                    <li>Частое использование --no-cache</li>
                    <li>Изменение порядка инструкций без причины</li>
                    <li>Множество мелких RUN команд</li>
                    <li>Игнорирование размера контекста</li>
                    <li>Копирование ненужных файлов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Анализируйте docker history</li>
                    <li>Тестируйте разные варианты</li>
                    <li>Используйте BuildKit</li>
                    <li>Настройте CI/CD кэширование</li>
                    <li>Документируйте оптимизации</li>
                    <li>Обучайте команду принципам</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Порядок инструкций в Dockerfile критически важен</b> для эффективного кэширования.
              Принцип <b>"от редко изменяемого к часто изменяемому"</b> позволяет максимально использовать кэш.
              Копирование <code>package.json</code> → <code>npm ci</code> → <code>COPY исходников</code>
              обеспечивает, что зависимости переустанавливаются только при их реальном изменении,
              а не при каждом изменении кода.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/develop/dev-best-practices/"
                target="_blank"
                class="mr-2">
                Best Practices
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://docs.docker.com/build/cache/"
                target="_blank">
                Build Cache
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
