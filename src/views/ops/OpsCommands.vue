<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash.js'

const pwdSnippet = `
# pwd - Print Working Directory
# Показывает текущую рабочую директорию

# Базовое использование
pwd
# /home/user/projects/my-app

# С полным путем (абсолютный путь)
pwd -P
# Разрешает символические ссылки

# В скриптах часто используется для определения местоположения
SCRIPT_DIR=$(pwd)
echo "Script is running from: $SCRIPT_DIR"

# Пример в Docker
docker run -v $(pwd):/app node:18
# Монтирует текущую директорию в контейнер

# Пример в Node.js скриптах
cd /path/to/project && npm install
# pwd здесь вернет /path/to/project
`

const echoSnippet = `
# echo - вывод текста в терминал или файл
# Основная команда для вывода и работы с переменными

# Базовый вывод
echo "Hello, World!"
# Hello, World!

# Вывод переменных окружения
echo $HOME
# /home/user

echo $PATH
# /usr/local/bin:/usr/bin:/bin

# Перенаправление в файл
echo "console.log('Hello')" > script.js
# Создает файл с содержимым (перезаписывает)

echo "console.log('World')" >> script.js
# Добавляет в конец файла (append)

# Специальные символы
echo -e "Line 1\\nLine 2\\nLine 3"
# Line 1
# Line 2
# Line 3

# Без переноса строки
echo -n "Loading..."
# Курсор остается на той же строке

# Вывод с переменными
NAME="John"
echo "Hello, $NAME!"
# Hello, John!

# Экранирование специальных символов
echo 'Price: $100'  # Одинарные кавычки - литерально
# Price: $100

echo "Price: \\$100"  # Двойные с экранированием
# Price: $100

# Использование в скриптах сборки
echo "Building application..."
npm run build
echo "Build complete!"

# Debug информация
DEBUG=true
if [ "$DEBUG" = true ]; then
  echo "Debug mode enabled"
  echo "Current directory: $(pwd)"
  echo "User: $(whoami)"
fi
`

const catSnippet = `
# cat - concatenate and display files
# Чтение и объединение файлов

# Вывод содержимого файла
cat package.json
# Показывает весь файл

# Объединение нескольких файлов
cat file1.txt file2.txt file3.txt
# Выводит все файлы подряд

# Создание файла через cat
cat > newfile.txt
# Вводим текст, Ctrl+D для сохранения

# Добавление в файл
cat >> existingfile.txt
# Добавляет введенный текст в конец

# Нумерация строк
cat -n script.js
#  1  const express = require('express')
#  2  const app = express()
#  3  app.listen(3000)

# Показ непечатаемых символов
cat -A file.txt
# $ в конце строк, ^I для табов

# Удаление пустых строк
cat -s file.txt

# Практические примеры

# Просмотр логов
cat /var/log/nginx/error.log

# Чтение конфига
cat /etc/nginx/nginx.conf

# Объединение частей файла
cat part1.sql part2.sql part3.sql > complete.sql

# Вывод с подсветкой синтаксиса (с помощью bat)
bat package.json  # современная альтернатива cat

# Просмотр первых строк большого файла
cat large-file.txt | head -n 20

# Просмотр последних строк
cat application.log | tail -n 50

# Поиск в файле
cat server.js | grep "express"

# Создание Docker Compose файла
cat > docker-compose.yml << EOF
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "80:80"
EOF
`

const lsSnippet = `
# ls - list directory contents
# Просмотр содержимого директорий

# Базовое использование
ls
# file1.js  file2.js  package.json

# Подробный вывод (long format)
ls -l
# -rw-r--r--  1 user  group  1234 Nov 29 10:30 package.json
# drwxr-xr-x  5 user  group   160 Nov 29 09:15 src

# Показать скрытые файлы
ls -a
# .  ..  .git  .gitignore  .env  package.json

# Комбинация флагов
ls -la
# Подробно + скрытые файлы

# Человекочитаемые размеры
ls -lh
# -rw-r--r--  1 user  group  1.2K Nov 29 10:30 package.json
# -rw-r--r--  1 user  group   45M Nov 29 09:20 bundle.js

# Сортировка по времени модификации
ls -lt
# Новые файлы сверху

# Обратная сортировка
ls -ltr
# Старые файлы сверху

# Рекурсивный просмотр
ls -R
# Показывает все вложенные директории

# Только директории
ls -d */
# src/  public/  tests/

# С индексными дескрипторами (inodes)
ls -li
# 12345678 -rw-r--r--  1 user  group  1234 package.json

# По размеру
ls -lS
# Большие файлы сверху

# Цветной вывод
ls --color=auto
# Директории - синий, исполняемые - зеленый

# Практические примеры

# Найти все JavaScript файлы
ls -l *.js

# Найти все тестовые файлы
ls -l **/*.test.js

# Посмотреть permissions
ls -l src/
# -rwxr-xr-x - исполняемый файл
# -rw-r--r-- - обычный файл
# drwxr-xr-x - директория

# Проверка наличия файла в скрипте
if ls package.json 1>/dev/null 2>&1; then
  echo "package.json exists"
fi

# Подсчет файлов
ls -1 | wc -l
# Количество файлов в директории

# Альтернативы для современных терминалов
exa -la  # современная замена ls с цветами
lsd -la  # ls deluxe
`

const pipesSnippet = `
# Pipes (|) - конвейеры команд
# Передача вывода одной команды на вход другой

# Базовый пример
cat file.txt | grep "error"
# Ищет строки с "error" в файле

# Цепочка команд
cat access.log | grep "POST" | wc -l
# Считает количество POST запросов

# Сортировка и уникальные значения
cat users.txt | sort | uniq
# Сортирует и удаляет дубликаты

# Постраничный просмотр
ls -la | less
# Просмотр длинного вывода постранично

# Фильтрация и подсчет
ps aux | grep node | wc -l
# Считает количество процессов node

# Практические примеры для разработки

# Поиск больших файлов
ls -lh | grep "M" | sort -k5 -h
# Файлы в мегабайтах, отсортированные по размеру

# Анализ логов
cat error.log | grep "500" | tail -n 10
# Последние 10 ошибок 500

# Поиск в коде
grep -r "useState" src/ | wc -l
# Количество использований useState

# Анализ зависимостей
npm list | grep "react"
# Все пакеты, связанные с React

# Мониторинг процессов
ps aux | grep node | grep -v grep
# Процессы node (исключая сам grep)

# Работа с JSON
cat package.json | grep "dependencies" -A 20
# Показывает dependencies и 20 строк после

# Анализ размера директорий
du -sh */ | sort -h
# Размер каждой папки, отсортировано

# Поиск TODO в коде
grep -r "TODO" src/ | wc -l
# Количество TODO комментариев

# Логи в реальном времени
tail -f application.log | grep "ERROR"
# Следит за логами и фильтрует ошибки

# Подсчет строк кода
find src -name "*.js" | xargs cat | wc -l
# Общее количество строк в JS файлах

# Поиск дубликатов
cat file.txt | sort | uniq -d
# Только дубликаты

# Статистика по файлам
ls -l | awk '{print $5}' | awk '{s+=$1} END {print s}'
# Общий размер всех файлов
`

const redirectionSnippet = `
# Перенаправление ввода/вывода
# Работа с потоками: stdin (0), stdout (1), stderr (2)

# Перенаправление вывода
echo "Hello" > output.txt
# Создает файл (или перезаписывает)

echo "World" >> output.txt
# Добавляет в конец

# Перенаправление ошибок
npm install 2> errors.txt
# Только ошибки в файл

# Вывод и ошибки в разные файлы
command > output.txt 2> errors.txt

# Вывод и ошибки в один файл
npm run build > build.log 2>&1

# Современный синтаксис
npm run build &> build.log
# То же самое, короче

# Подавление вывода
command > /dev/null 2>&1
# Игнорирует весь вывод

# Только ошибки в терминал
command 2>&1 > output.txt | grep "ERROR"

# Сохранение и просмотр одновременно
npm test | tee test-results.txt
# Вывод в терминал И в файл

# Перенаправление ввода
mysql -u root -p < database.sql
# Выполняет SQL из файла

# Here document
cat > config.yml << EOF
server:
  port: 3000
  host: localhost
EOF

# Практические примеры

# Логирование сборки
npm run build 2>&1 | tee build.log
# В терминал и в файл

# Фоновый процесс с логами
node server.js > app.log 2>&1 &
# Запуск в фоне с логированием

# Условное выполнение
if command > /dev/null 2>&1; then
  echo "Success"
else
  echo "Failed"
fi

# Объединение команд
(echo "=== Build Start ===" && npm run build && echo "=== Build End ===") > build.log
`

const practicalExamplesSnippet = `
# Практические примеры для фронтенд/бэкенд разработки

# 1. Проверка окружения перед запуском
pwd
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
ls -la package.json

# 2. Очистка и установка зависимостей
echo "Cleaning node_modules..."
rm -rf node_modules package-lock.json
echo "Installing dependencies..."
npm install | tee install.log

# 3. Анализ размера проекта
echo "Project size analysis:"
du -sh .
du -sh node_modules
ls -lh dist/bundle.js

# 4. Поиск проблем в коде
echo "Searching for console.logs..."
grep -r "console.log" src/ | wc -l
echo "Searching for debugger statements..."
grep -r "debugger" src/ | wc -l

# 5. Мониторинг логов приложения
tail -f logs/app.log | grep "ERROR" --color

# 6. Резервное копирование перед деплоем
echo "Creating backup..."
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR
cat package.json > $BACKUP_DIR/package.json
ls -la $BACKUP_DIR

# 7. Проверка портов
echo "Checking if port 3000 is in use..."
lsof -i :3000 | grep LISTEN

# 8. Анализ git изменений
echo "Modified files:"
git status | grep "modified:"
echo "Number of changed files:"
git status --short | wc -l

# 9. Быстрая документация
cat > README.md << EOF
# Project Name

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`
EOF
echo "README.md created"

# 10. Очистка Docker
echo "Docker cleanup..."
docker ps -a | grep "Exited" | awk '{print $1}' | xargs docker rm
docker images | grep "none" | awk '{print $3}' | xargs docker rmi

# 11. Мониторинг производительности
echo "=== System Info ===" | tee system-info.txt
pwd >> system-info.txt
date >> system-info.txt
df -h >> system-info.txt
free -h >> system-info.txt

# 12. CI/CD скрипты
#!/bin/bash
echo "Starting CI pipeline..."
echo "Step 1: Linting"
npm run lint | tee lint.log
echo "Step 2: Testing"
npm test | tee test.log
echo "Step 3: Building"
npm run build | tee build.log
echo "Pipeline complete. Check logs:"
ls -lh *.log
`

const combinedExamplesSnippet = `
# Комбинированное использование команд

# 1. Полный анализ проекта
echo "=== Project Analysis ===" && \\
pwd && \\
echo "Files:" && ls -1 | wc -l && \\
echo "Size:" && du -sh . && \\
echo "Dependencies:" && cat package.json | grep -c "\\"" && \\
echo "Code lines:" && find src -name "*.js" | xargs cat | wc -l

# 2. Умная очистка
echo "Cleaning temporary files..." && \\
ls -la | grep "tmp" && \\
rm -rf *.tmp *.log && \\
echo "Done. Remaining files:" && \\
ls -l

# 3. Создание структуры проекта
mkdir -p src/{components,utils,hooks} && \\
echo "export {}" > src/index.js && \\
cat > src/components/App.jsx << EOF && \\
export default function App() {
  return <div>Hello</div>
}
EOF
ls -R src/

# 4. Deployment checklist
echo "Pre-deployment checklist:" && \\
echo "1. Tests:" && npm test | tail -n 1 && \\
echo "2. Build:" && npm run build > /dev/null 2>&1 && ls -lh dist/ && \\
echo "3. Env vars:" && cat .env | grep -v "^#" | wc -l && \\
echo "Ready for deployment!"

# 5. Quick debug session
echo "Debug Info:" && \\
echo "Working Dir: $(pwd)" && \\
echo "Git Branch: $(git branch --show-current)" && \\
echo "Last Commit: $(git log -1 --oneline)" && \\
echo "Modified Files:" && git status --short && \\
echo "Running Processes:" && ps aux | grep node | grep -v grep

# 6. Backup важных файлов
BACKUP="backup-$(date +%Y%m%d)" && \\
mkdir -p $BACKUP && \\
cat package.json > $BACKUP/package.json && \\
cat .env > $BACKUP/.env 2>/dev/null && \\
ls -la src/*.js | while read file; do
  cat "$file" > "$BACKUP/$(basename $file)"
done && \\
echo "Backup created in $BACKUP" && \\
ls -lh $BACKUP/

# 7. Поиск и замена в файлах
echo "Finding and replacing..." && \\
grep -r "oldAPI" src/ | cut -d: -f1 | sort | uniq | while read file; do
  echo "Processing $file"
  # sed -i '' 's/oldAPI/newAPI/g' "$file"  # macOS
  # sed -i 's/oldAPI/newAPI/g' "$file"     # Linux
done

# 8. Генерация отчета
{
  echo "=== Project Report ==="
  echo "Date: $(date)"
  echo "Directory: $(pwd)"
  echo ""
  echo "=== Files ==="
  ls -lh
  echo ""
  echo "=== Dependencies ==="
  cat package.json | grep -A 50 '"dependencies"'
  echo ""
  echo "=== Recent Changes ==="
  git log --oneline -n 5
} > project-report.txt && \\
cat project-report.txt && \\
echo "Report saved to project-report.txt"
`

const highlightedPwd = ref('')
const highlightedEcho = ref('')
const highlightedCat = ref('')
const highlightedLs = ref('')
const highlightedPipes = ref('')
const highlightedRedirection = ref('')
const highlightedPractical = ref('')
const highlightedCombined = ref('')

onMounted(() => {
  highlightedPwd.value = Prism.highlight(pwdSnippet, Prism.languages.bash, 'bash')
  highlightedEcho.value = Prism.highlight(echoSnippet, Prism.languages.bash, 'bash')
  highlightedCat.value = Prism.highlight(catSnippet, Prism.languages.bash, 'bash')
  highlightedLs.value = Prism.highlight(lsSnippet, Prism.languages.bash, 'bash')
  highlightedPipes.value = Prism.highlight(pipesSnippet, Prism.languages.bash, 'bash')
  highlightedRedirection.value = Prism.highlight(redirectionSnippet, Prism.languages.bash, 'bash')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.bash, 'bash')
  highlightedCombined.value = Prism.highlight(combinedExamplesSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              pwd, echo, cat, ls, pipes — основные команды Linux/Unix
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Базовые команды терминала</b> — это фундамент для работы с Linux/Unix системами,
              Docker, CI/CD и DevOps. Понимание pwd, echo, cat, ls и pipes критически важно для
              эффективной разработки и деплоя приложений.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">pwd — Print Working Directory</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-folder-open</v-icon>
                    <h3 class="text-h6 font-weight-bold">Назначение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Показывает текущую директорию</strong></li>
                    <li>Абсолютный путь от корня</li>
                    <li>Полезно в скриптах</li>
                    <li>Незаменимо в Docker</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Docker volume монтирование</li>
                    <li>Определение пути в скриптах</li>
                    <li>Отладка местоположения</li>
                    <li>CI/CD конфигурация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPwd"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">echo — вывод текста</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-message-text</v-icon>
                    <h3 class="text-h6 font-weight-bold">Назначение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Вывод текста в терминал</strong></li>
                    <li>Работа с переменными</li>
                    <li>Создание файлов</li>
                    <li>Debug информация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-application-brackets</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Логирование в скриптах</li>
                    <li>Создание конфиг-файлов</li>
                    <li>Вывод переменных окружения</li>
                    <li>Отладочные сообщения</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEcho"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">cat — чтение и объединение файлов</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-file-document</v-icon>
                    <h3 class="text-h6 font-weight-bold">Назначение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Вывод содержимого файлов</strong></li>
                    <li>Объединение файлов</li>
                    <li>Создание файлов</li>
                    <li>Просмотр логов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-cog</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Просмотр конфигов</li>
                    <li>Чтение package.json</li>
                    <li>Анализ логов</li>
                    <li>Создание SQL скриптов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCat"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">ls — список файлов и директорий</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="purple" class="mr-2">mdi-format-list-bulleted</v-icon>
                    <h3 class="text-h6 font-weight-bold">Назначение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Просмотр содержимого</strong></li>
                    <li>Информация о файлах</li>
                    <li>Права доступа</li>
                    <li>Размеры файлов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-magnify</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Проверка структуры проекта</li>
                    <li>Поиск файлов</li>
                    <li>Анализ размеров</li>
                    <li>Проверка прав доступа</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLs"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Флаги команды ls</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Флаг</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>-l</code></td>
                <td>Подробный формат (права, владелец, размер)</td>
                <td><code>ls -l</code></td>
              </tr>
              <tr>
                <td><code>-a</code></td>
                <td>Показать скрытые файлы (.git, .env)</td>
                <td><code>ls -a</code></td>
              </tr>
              <tr>
                <td><code>-h</code></td>
                <td>Человекочитаемые размеры (KB, MB)</td>
                <td><code>ls -lh</code></td>
              </tr>
              <tr>
                <td><code>-t</code></td>
                <td>Сортировка по времени изменения</td>
                <td><code>ls -lt</code></td>
              </tr>
              <tr>
                <td><code>-r</code></td>
                <td>Обратный порядок сортировки</td>
                <td><code>ls -ltr</code></td>
              </tr>
              <tr>
                <td><code>-R</code></td>
                <td>Рекурсивный просмотр</td>
                <td><code>ls -R</code></td>
              </tr>
              <tr>
                <td><code>-S</code></td>
                <td>Сортировка по размеру</td>
                <td><code>ls -lS</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Pipes (|) — конвейеры команд</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-pipe</v-icon>
              <strong>Мощь Unix:</strong> Pipes позволяют соединять простые команды в сложные конвейеры обработки данных
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-pipe</v-icon>
                    <h3 class="text-h6 font-weight-bold">Как работает</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Вывод первой команды → Ввод второй</li>
                    <li>Можно цепочками</li>
                    <li>Каждая команда фильтрует данные</li>
                    <li>Мощный инструмент анализа</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-filter</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Анализ логов</li>
                    <li>Фильтрация данных</li>
                    <li>Поиск в файлах</li>
                    <li>Статистика проекта</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPipes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Перенаправление ввода/вывода</h2>
            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Оператор</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>&gt;</code></td>
                <td>Перезаписать файл</td>
                <td><code>echo "text" &gt; file.txt</code></td>
              </tr>
              <tr>
                <td><code>&gt;&gt;</code></td>
                <td>Добавить в конец файла</td>
                <td><code>echo "more" &gt;&gt; file.txt</code></td>
              </tr>
              <tr>
                <td><code>2&gt;</code></td>
                <td>Перенаправить ошибки</td>
                <td><code>command 2&gt; errors.txt</code></td>
              </tr>
              <tr>
                <td><code>2&gt;&amp;1</code></td>
                <td>Объединить вывод и ошибки</td>
                <td><code>command &gt; all.log 2&gt;&amp;1</code></td>
              </tr>
              <tr>
                <td><code>&amp;&gt;</code></td>
                <td>Вывод и ошибки (короткая форма)</td>
                <td><code>command &amp;&gt; all.log</code></td>
              </tr>
              <tr>
                <td><code>&lt;</code></td>
                <td>Ввод из файла</td>
                <td><code>mysql &lt; dump.sql</code></td>
              </tr>
              <tr>
                <td><code>|</code></td>
                <td>Передать вывод следующей команде</td>
                <td><code>cat file | grep "text"</code></td>
              </tr>
              <tr>
                <td><code>tee</code></td>
                <td>Вывод в терминал И файл</td>
                <td><code>npm test | tee test.log</code></td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRedirection"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры для разработки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинированное использование</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCombined"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между > и >>?</p>
                <p class="font-weight-regular ma-0">
                  <code>&gt;</code> перезаписывает файл (создает новый или удаляет содержимое существующего).
                  <code>&gt;&gt;</code> добавляет в конец файла (append), сохраняя существующее содержимое.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает pipe (|)?</p>
                <p class="font-weight-regular ma-0">
                  Pipe передает stdout (стандартный вывод) первой команды на stdin (стандартный ввод)
                  второй команды. Например: <code>cat file.txt | grep "error"</code> — cat выводит файл,
                  grep фильтрует строки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что означает 2>&1?</p>
                <p class="font-weight-regular ma-0">
                  Перенаправляет stderr (поток ошибок, дескриптор 2) в stdout (стандартный вывод, дескриптор 1).
                  Используется для объединения вывода и ошибок: <code>command &gt; file.log 2&gt;&amp;1</code>
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как найти большие файлы в директории?</p>
                <p class="font-weight-regular ma-0">
                  <code>ls -lhS | head -n 10</code> — показывает 10 самых больших файлов.
                  Или <code>du -sh * | sort -h | tail -n 10</code> для директорий.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как посмотреть логи в реальном времени?</p>
                <p class="font-weight-regular ma-0">
                  <code>tail -f application.log</code> — следит за файлом и показывает новые строки.
                  С фильтрацией: <code>tail -f app.log | grep "ERROR"</code>
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между cat и less?</p>
                <p class="font-weight-regular ma-0">
                  <code>cat</code> выводит весь файл сразу. <code>less</code> показывает постранично
                  с навигацией (пробел, стрелки, q для выхода). Для больших файлов используйте less.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Шпаргалка по командам</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Просмотр и навигация</h3>
                  <ul class="pl-4">
                    <li><code>pwd</code> — текущая директория</li>
                    <li><code>ls -la</code> — все файлы подробно</li>
                    <li><code>cat file.txt</code> — содержимое файла</li>
                    <li><code>less file.txt</code> — постраничный просмотр</li>
                    <li><code>head -n 20 file</code> — первые 20 строк</li>
                    <li><code>tail -n 20 file</code> — последние 20 строк</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Фильтрация и поиск</h3>
                  <ul class="pl-4">
                    <li><code>grep "text" file</code> — поиск текста</li>
                    <li><code>grep -r "text" .</code> — рекурсивный поиск</li>
                    <li><code>command | wc -l</code> — подсчет строк</li>
                    <li><code>sort file.txt</code> — сортировка</li>
                    <li><code>uniq file.txt</code> — удалить дубли</li>
                    <li><code>awk, sed</code> — обработка текста</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать pipes для сложных задач</li>
                    <li>Логировать важные операции</li>
                    <li>Проверять вывод команд</li>
                    <li>Использовать -h для размеров</li>
                    <li>Комбинировать команды через &&</li>
                    <li>Сохранять скрипты для повторного использования</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>cat для больших файлов (используйте less)</li>
                    <li>Перезапись важных файлов без бэкапа</li>
                    <li>Игнорирование stderr (ошибок)</li>
                    <li>Хардкод путей в скриптах</li>
                    <li>Выполнение команд без понимания</li>
                    <li>Забывать про права доступа</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите man pages (man ls)</li>
                    <li>Используйте Tab для автодополнения</li>
                    <li>История команд: стрелка вверх</li>
                    <li>Ctrl+R для поиска в истории</li>
                    <li>Алиасы для частых команд</li>
                    <li>Практикуйтесь в Docker контейнерах</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные альтернативы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Традиционная</th>
                <th class="text-left font-weight-bold">Современная</th>
                <th class="text-left font-weight-bold">Преимущества</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>ls</code></td>
                <td><code>exa</code> или <code>lsd</code></td>
                <td>Цвета, иконки, Git статус</td>
              </tr>
              <tr>
                <td><code>cat</code></td>
                <td><code>bat</code></td>
                <td>Подсветка синтаксиса, нумерация</td>
              </tr>
              <tr>
                <td><code>find</code></td>
                <td><code>fd</code></td>
                <td>Быстрее, проще синтаксис</td>
              </tr>
              <tr>
                <td><code>grep</code></td>
                <td><code>ripgrep (rg)</code></td>
                <td>Быстрее, умнее игнорирует файлы</td>
              </tr>
              <tr>
                <td><code>du</code></td>
                <td><code>dust</code></td>
                <td>Наглядная визуализация</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>pwd, echo, cat, ls и pipes</b> — это базовые команды Linux/Unix, которые должен знать
              каждый разработчик. Они используются везде: в Docker, CI/CD, скриптах деплоя, отладке.
              <b>Pipes</b> позволяют создавать мощные конвейеры обработки данных, комбинируя простые
              команды. Освоение этих инструментов значительно повышает продуктивность и является
              обязательным для любого технического собеседования.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://tldr.sh/"
                target="_blank"
                class="mr-2">
                TLDR Pages
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://explainshell.com/"
                target="_blank">
                Explain Shell
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
