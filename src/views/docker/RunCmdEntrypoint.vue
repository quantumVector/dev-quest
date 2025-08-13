<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-bash.js'

const runExampleSnippet = `
# RUN - выполняется во время СБОРКИ образа
FROM ubuntu:20.04

# RUN создает новый слой в образе
RUN apt-get update && apt-get install -y \\
    curl \\
    vim \\
    git

# Каждая RUN инструкция = новый слой
RUN mkdir /app
RUN cd /app && touch file.txt

# Лучше объединять команды в одну RUN
RUN apt-get update && \\
    apt-get install -y nodejs npm && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*
`

const cmdExampleSnippet = `
# CMD - команда по умолчанию при запуске контейнера
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# CMD - может быть переопределена при запуске
CMD ["npm", "start"]

# Форматы CMD:
# Exec форма (рекомендуется)
CMD ["executable", "param1", "param2"]

# Shell форма
CMD command param1 param2

# Параметры для ENTRYPOINT
CMD ["param1", "param2"]
`

const entrypointExampleSnippet = `
# ENTRYPOINT - основная команда контейнера (не переопределяется)
FROM alpine:latest

# ENTRYPOINT всегда выполняется
ENTRYPOINT ["echo", "Hello"]

# CMD добавляет параметры к ENTRYPOINT
CMD ["World"]

# При запуске: docker run image
# Результат: echo "Hello" "World"

# При запуске: docker run image "Docker"
# Результат: echo "Hello" "Docker"
`

const combinationExampleSnippet = `
# Комбинирование ENTRYPOINT + CMD
FROM python:3.9-alpine

# Устанавливаем зависимости во время сборки
RUN pip install flask requests

# Копируем скрипт
COPY app.py /app.py

# ENTRYPOINT - основная команда (неизменная)
ENTRYPOINT ["python", "/app.py"]

# CMD - параметры по умолчанию (можно переопределить)
CMD ["--port", "5000"]

# Запуск:
# docker run image → python /app.py --port 5000
# docker run image --port 8080 → python /app.py --port 8080
`

const practicalExampleSnippet = `
# Практический пример: веб-сервер
FROM nginx:alpine

# RUN - настройка во время сборки
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir -p /var/log/nginx

# Копируем файлы
COPY ./html /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# ENTRYPOINT - главный процесс
ENTRYPOINT ["nginx"]

# CMD - параметры по умолчанию
CMD ["-g", "daemon off;"]

# Результат: nginx -g "daemon off;"
`

const comparisonSnippet = `
# Сравнение поведения

# 1. Только RUN
FROM ubuntu
RUN echo "Build time" # Выполняется при сборке
# При запуске контейнер сразу завершится

# 2. Только CMD
FROM ubuntu
CMD echo "Runtime" # Выполняется при запуске
# docker run image → "Runtime"
# docker run image ls → ls (CMD переопределяется)

# 3. Только ENTRYPOINT
FROM ubuntu
ENTRYPOINT echo "Always" # Всегда выполняется
# docker run image → "Always"
# docker run image ls → "Always ls" (добавляется к ENTRYPOINT)

# 4. ENTRYPOINT + CMD
FROM ubuntu
ENTRYPOINT ["echo"]
CMD ["default"]
# docker run image → "default"
# docker run image "custom" → "custom"
`

const highlightedRun = ref('')
const highlightedCmd = ref('')
const highlightedEntrypoint = ref('')
const highlightedCombination = ref('')
const highlightedPractical = ref('')
const highlightedComparison = ref('')

onMounted(() => {
  highlightedRun.value = Prism.highlight(runExampleSnippet, Prism.languages.docker, 'docker')
  highlightedCmd.value = Prism.highlight(cmdExampleSnippet, Prism.languages.docker, 'docker')
  highlightedEntrypoint.value = Prism.highlight(entrypointExampleSnippet, Prism.languages.docker, 'docker')
  highlightedCombination.value = Prism.highlight(combinationExampleSnippet, Prism.languages.docker, 'docker')
  highlightedPractical.value = Prism.highlight(practicalExampleSnippet, Prism.languages.docker, 'docker')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.docker, 'docker')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              RUN vs CMD vs ENTRYPOINT в Docker
            </h1>

            <p class="font-weight-regular mb-6">
              <b>RUN</b>, <b>CMD</b> и <b>ENTRYPOINT</b> — три ключевые инструкции Docker для выполнения команд.
              Они работают на разных этапах жизненного цикла контейнера и имеют разное поведение.
              Понимание их различий критически важно для эффективной работы с Docker.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Краткое сравнение</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Инструкция</th>
                <th class="text-left font-weight-bold">Когда выполняется</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Переопределение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code class="bg-grey-lighten-4 pa-1">RUN</code></td>
                <td class="pt-2 pb-2">Сборка образа</td>
                <td class="pt-2 pb-2">Установка пакетов, настройка</td>
                <td class="pt-2 pb-2">❌ Невозможно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code class="bg-grey-lighten-4 pa-1">CMD</code></td>
                <td class="pt-2 pb-2">Запуск контейнера</td>
                <td class="pt-2 pb-2">Команда по умолчанию</td>
                <td class="pt-2 pb-2">✅ Полностью заменяется</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code class="bg-grey-lighten-4 pa-1">ENTRYPOINT</code></td>
                <td class="pt-2 pb-2">Запуск контейнера</td>
                <td class="pt-2 pb-2">Главный процесс</td>
                <td class="pt-2 pb-2">⚠️ Только параметры</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">RUN — команды сборки</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-hammer-wrench</v-icon>
                    <h3 class="text-h6 font-weight-bold">Характеристики RUN</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время выполнения:</strong> сборка образа</li>
                    <li><strong>Создает слой</strong> в образе</li>
                    <li><strong>Кешируется</strong> Docker'ом</li>
                    <li><strong>Необратимые изменения</strong> образа</li>
                    <li><strong>Множественное использование</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Типичные задачи</h3>
                  <ul class="pl-4">
                    <li>Установка пакетов</li>
                    <li>Создание директорий</li>
                    <li>Компиляция кода</li>
                    <li>Настройка системы</li>
                    <li>Загрузка зависимостей</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRun"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CMD — команда по умолчанию</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-play</v-icon>
                    <h3 class="text-h6 font-weight-bold">Характеристики CMD</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Время выполнения:</strong> запуск контейнера</li>
                    <li><strong>Только последняя</strong> CMD учитывается</li>
                    <li><strong>Полностью переопределяется</strong> аргументами</li>
                    <li><strong>Гибкость</strong> при запуске</li>
                    <li><strong>Опциональность</strong> выполнения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Форматы CMD</h3>
                  <ul class="pl-4">
                    <li><code>CMD ["exec", "param"]</code> — exec форма</li>
                    <li><code>CMD command param</code> — shell форма</li>
                    <li><code>CMD ["param1", "param2"]</code> — для ENTRYPOINT</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCmd"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">ENTRYPOINT — главный процесс</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-door-open</v-icon>
                    <h3 class="text-h6 font-weight-bold">Характеристики ENTRYPOINT</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Всегда выполняется</strong> при запуске</li>
                    <li><strong>Не переопределяется</strong> аргументами</li>
                    <li><strong>Аргументы добавляются</strong> к команде</li>
                    <li><strong>Главный процесс</strong> контейнера</li>
                    <li><strong>Фиксированное поведение</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Когда использовать</h3>
                  <ul class="pl-4">
                    <li>Контейнер как исполняемый файл</li>
                    <li>Фиксированный процесс (nginx, postgres)</li>
                    <li>Обработка параметров запуска</li>
                    <li>Инициализационные скрипты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEntrypoint"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинирование ENTRYPOINT + CMD</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Совет:</strong> Комбинация ENTRYPOINT + CMD — мощный паттерн. ENTRYPOINT определяет неизменную часть команды, а CMD предоставляет параметры по умолчанию, которые можно переопределить.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCombination"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Поведенческие различия</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Exec vs Shell форма</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Exec форма (рекомендуется)</h3>
                  <div class="mb-3">
                    <code class="bg-grey-lighten-4 pa-1">CMD ["npm", "start"]</code>
                  </div>
                  <ul class="pl-4">
                    <li>✅ Прямое выполнение (PID 1)</li>
                    <li>✅ Правильная обработка сигналов</li>
                    <li>✅ Нет промежуточного shell</li>
                    <li>✅ Переменные не раскрываются</li>
                    <li>✅ Более эффективно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Shell форма</h3>
                  <div class="mb-3">
                    <code class="bg-grey-lighten-4 pa-1">CMD npm start</code>
                  </div>
                  <ul class="pl-4">
                    <li>⚠️ Выполняется через /bin/sh</li>
                    <li>⚠️ Shell получает PID 1</li>
                    <li>⚠️ Проблемы с сигналами</li>
                    <li>✅ Раскрытие переменных</li>
                    <li>✅ Shell операторы (&&, ||, |)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главная разница между RUN и CMD?</p>
                <p class="font-weight-regular ma-0">
                  RUN выполняется во время <strong>сборки образа</strong> и создает слои, а CMD выполняется при
                  <strong>запуске контейнера</strong> и может быть переопределена аргументами командной строки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет, если в Dockerfile есть несколько CMD?</p>
                <p class="font-weight-regular ma-0">
                  Только последняя CMD инструкция будет учтена. Предыдущие CMD игнорируются.
                  Это отличается от RUN, где выполняются все инструкции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как ENTRYPOINT взаимодействует с аргументами docker run?</p>
                <p class="font-weight-regular ma-0">
                  Аргументы docker run добавляются к ENTRYPOINT команде, но не заменяют её.
                  Например: ENTRYPOINT ["echo"] + docker run image "hello" = echo hello
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать ENTRYPOINT вместо CMD?</p>
                <p class="font-weight-regular ma-0">
                  ENTRYPOINT используется когда контейнер должен работать как исполняемый файл с фиксированной командой.
                  CMD подходит для команд по умолчанию, которые пользователь может переопределить.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между exec и shell формой?</p>
                <p class="font-weight-regular ma-0">
                  Exec форма (["cmd", "param"]) выполняется напрямую без shell, получает PID 1 и правильно обрабатывает сигналы.
                  Shell форма (cmd param) выполняется через /bin/sh, что может вызывать проблемы с сигналами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как передать переменные окружения в exec форме?</p>
                <p class="font-weight-regular ma-0">
                  В exec форме переменные не раскрываются автоматически. Нужно использовать shell:
                  CMD ["sh", "-c", "echo $VARIABLE"] вместо CMD ["echo", "$VARIABLE"]
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли переопределить ENTRYPOINT?</p>
                <p class="font-weight-regular ma-0">
                  Да, но только через флаг --entrypoint при запуске: docker run --entrypoint="" image new-command.
                  Это требует явного указания и не является обычным поведением.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Паттерны использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Веб-приложение</h3>
                  <div class="mb-2">
                    <code class="bg-grey-lighten-4 pa-1 d-block">RUN npm install</code>
                    <code class="bg-grey-lighten-4 pa-1 d-block">CMD ["npm", "start"]</code>
                  </div>
                  <p class="text-body-2">Гибкий запуск с возможностью переопределения команды для тестирования</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Утилита/CLI</h3>
                  <div class="mb-2">
                    <code class="bg-grey-lighten-4 pa-1 d-block">ENTRYPOINT ["./cli-tool"]</code>
                    <code class="bg-grey-lighten-4 pa-1 d-block">CMD ["--help"]</code>
                  </div>
                  <p class="text-body-2">Контейнер как исполняемый файл с параметрами по умолчанию</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Система/Сервис</h3>
                  <div class="mb-2">
                    <code class="bg-grey-lighten-4 pa-1 d-block">RUN setup-service</code>
                    <code class="bg-grey-lighten-4 pa-1 d-block">ENTRYPOINT ["service"]</code>
                    <code class="bg-grey-lighten-4 pa-1 d-block">CMD ["start"]</code>
                  </div>
                  <p class="text-body-2">Системный сервис с фиксированным поведением</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">✅ Делать</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Использовать exec форму для CMD/ENTRYPOINT</li>
                    <li>Объединять RUN команды для уменьшения слоев</li>
                    <li>Использовать ENTRYPOINT для фиксированного поведения</li>
                    <li>CMD для параметров по умолчанию</li>
                    <li>Тестировать переопределение команд</li>
                    <li>Обрабатывать сигналы правильно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">❌ Избегать</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Множественные RUN для связанных операций</li>
                    <li>Shell форму без необходимости</li>
                    <li>Сложную логику в CMD/ENTRYPOINT</li>
                    <li>Игнорирование сигналов завершения</li>
                    <li>Хардкод путей в командах</li>
                    <li>Смешивание логики сборки и запуска</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка команд</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-bug</v-icon>
              <strong>Отладка:</strong> Используйте docker run --entrypoint="" image sh для отладки проблем с командами запуска. Это позволит войти в контейнер и протестировать команды вручную.
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>RUN</b> выполняется во время сборки и создает слои образа. <b>CMD</b> предоставляет команду по умолчанию,
              которую можно переопределить. <b>ENTRYPOINT</b> определяет главный процесс контейнера, который всегда выполняется.
              Комбинация ENTRYPOINT + CMD дает максимальную гибкость: фиксированную команду с настраиваемыми параметрами.
              Понимание этих различий критически важно для создания правильных и предсказуемых Docker образов.
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
                href="https://docs.docker.com/develop/dev-best-practices/"
                target="_blank">
                Best Practices
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
