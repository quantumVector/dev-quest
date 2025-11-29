<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash.js'

const grepBasicsSnippet = `
# grep - Global Regular Expression Print
# Поиск текста в файлах

# Базовый поиск
grep "error" application.log
# Ищет строки со словом "error"

# Игнорирование регистра
grep -i "error" application.log
# Найдет: ERROR, Error, error

# Инверсия поиска (строки БЕЗ паттерна)
grep -v "debug" application.log
# Все строки кроме содержащих "debug"

# Подсчет совпадений
grep -c "GET" access.log
# Возвращает число строк с "GET"

# Показать номера строк
grep -n "TODO" src/index.js
# 15: // TODO: refactor this
# 42: // TODO: add tests

# Рекурсивный поиск
grep -r "useState" src/
# Ищет во всех файлах директории

# Только имена файлов
grep -l "import React" src/*.js
# Список файлов, содержащих паттерн

# Контекст вокруг совпадения
grep -A 3 "Error:" app.log    # 3 строки ПОСЛЕ
grep -B 2 "Error:" app.log    # 2 строки ДО
grep -C 2 "Error:" app.log    # 2 строки ДО и ПОСЛЕ

# Несколько паттернов
grep -e "error" -e "warning" -e "critical" app.log

# Регулярные выражения
grep "^Error" app.log          # Начинается с Error
grep "error$" app.log          # Заканчивается на error
grep "error.*critical" app.log # error и потом critical

# Поиск целых слов
grep -w "app" config.json
# Найдет "app", но не "application"

# Цветной вывод
grep --color=auto "error" app.log
# Подсвечивает найденный текст
`

const grepPracticalSnippet = `
# Практические примеры grep для разработки

# 1. Поиск console.log в проекте
grep -rn "console.log" src/
# src/components/App.jsx:15: console.log('Rendering App')
# src/utils/api.js:42: console.log(response)

# 2. Поиск TODO/FIXME комментариев
grep -rn "TODO\|FIXME" src/ | wc -l
# Количество задач в коде

# 3. Анализ ошибок в логах
grep "ERROR" application.log | tail -n 20
# Последние 20 ошибок

# 4. Поиск импортов конкретной библиотеки
grep -r "from 'react'" src/ | grep "useState"
# Файлы, использующие useState

# 5. Фильтрация HTTP статусов
grep " 500 " access.log | wc -l
# Количество ошибок 500

# 6. Поиск email адресов
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" users.txt

# 7. Поиск IP адресов
grep -E "\\b([0-9]{1,3}\\.){3}[0-9]{1,3}\\b" access.log

# 8. Исключение файлов из поиска
grep -r "config" --exclude="*.min.js" --exclude-dir="node_modules" .

# 9. Поиск с подсчетом уникальных
grep -o "import.*from" src/**/*.js | sort | uniq -c | sort -nr
# Самые частые импорты

# 10. Комбинация с другими командами
cat package.json | grep "dependencies" -A 20 | grep "react"
# Зависимости, связанные с React
`

const awkBasicsSnippet = `
# awk - мощный инструмент обработки текста
# Работает с колонками и строками

# Базовый синтаксис: awk 'pattern {action}' file

# Вывод конкретной колонки
ls -l | awk '{print $5, $9}'
# Размер и имя файла

# Первая и последняя колонки
echo "one two three four" | awk '{print $1, $NF}'
# one four

# Вывод с разделителем
awk -F: '{print $1, $3}' /etc/passwd
# Имя пользователя и UID

# Условия
ls -l | awk '$5 > 1000000 {print $9, $5}'
# Файлы больше 1MB

# Подсчет и суммирование
ls -l | awk '{sum += $5} END {print sum}'
# Общий размер всех файлов

# Номер строки
awk '{print NR, $0}' file.txt
# Нумерует строки

# Количество полей
echo "one two three" | awk '{print NF}'
# 3

# Математические операции
awk '{print $1, $2, $1+$2}' numbers.txt

# Форматированный вывод
awk '{printf "%-20s %10s\\n", $1, $2}' data.txt

# BEGIN и END блоки
awk 'BEGIN {print "Start"} {print $0} END {print "End"}' file.txt
`

const awkPracticalSnippet = `
# Практические примеры awk для разработки

# 1. Анализ размера node_modules
du -sh node_modules/* | awk '{print $1, $2}' | sort -h
# Размеры пакетов, отсортированные

# 2. Парсинг CSV файла
awk -F',' '{print $1, $3}' users.csv
# 1-я и 3-я колонки из CSV

# 3. Вычисление среднего
awk '{sum+=$1; count++} END {print sum/count}' numbers.txt

# 4. Фильтрация логов по времени
awk '$1 >= "09:00" && $1 <= "17:00"' access.log

# 5. Подсчет HTTP методов
awk '{print $6}' access.log | sort | uniq -c
# GET, POST, DELETE и их количество

# 6. Извлечение email из текста
awk '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/ {print $0}' contacts.txt

# 7. Конвертация формата даты
awk '{print $3"/"$2"/"$1}' dates.txt
# Меняет формат даты

# 8. Статистика по портам
netstat -an | awk '/ESTABLISHED/ {print $4}' | awk -F: '{print $NF}' | sort | uniq -c

# 9. Обработка JSON (простой)
cat data.json | awk -F'"' '{print $4}'
# Извлекает значения

# 10. Создание SQL INSERT
awk -F',' '{printf "INSERT INTO users VALUES (\\'%s\\', \\'%s\\');\\n", $1, $2}' data.csv

# 11. Мониторинг процессов
ps aux | awk '$3 > 50 {print $11, $3"%"}'
# Процессы с CPU > 50%

# 12. Анализ package.json зависимостей
cat package.json | grep ":" | awk -F'"' '{print $2, $4}'
# Пакет и версия
`

const tailBasicsSnippet = `
# tail - вывод последних строк файла
# Противоположность head (первые строки)

# Последние 10 строк (по умолчанию)
tail application.log

# Последние N строк
tail -n 20 application.log
tail -20 application.log  # короткая форма

# Последние N байт
tail -c 1024 file.txt
# Последние 1KB

# Пропустить первые N строк
tail -n +10 file.txt
# Все строки начиная с 10-й

# Следить за файлом в реальном времени (ВАЖНО!)
tail -f application.log
# Показывает новые строки по мере добавления
# Ctrl+C для выхода

# Следить с количеством строк
tail -n 50 -f application.log
# Последние 50 строк + follow

# Следить за несколькими файлами
tail -f app.log error.log access.log

# Прекратить после N строк (GNU tail)
tail -n 100 --pid=1234 -f app.log
# Остановится когда процесс 1234 завершится

# Вывод с именами файлов
tail -n 5 *.log
# Показывает последние 5 строк каждого файла

# Комбинация с grep
tail -f application.log | grep "ERROR"
# Показывает только строки с ERROR в реальном времени
`

const tailPracticalSnippet = `
# Практические примеры tail для разработки

# 1. Мониторинг логов приложения
tail -f logs/application.log | grep --color=auto "ERROR\\|WARN"
# Следим за ошибками и предупреждениями

# 2. Последние деплойменты
tail -n 20 /var/log/deploy.log

# 3. Мониторинг нескольких логов одновременно
tail -f logs/*.log | grep "user_id"
# Отслеживание действий пользователя

# 4. Логи с фильтрацией по времени
tail -f app.log | grep "$(date +%Y-%m-%d)"
# Только сегодняшние записи

# 5. Подсчет событий в реальном времени
tail -f access.log | grep "POST" | wc -l
# Количество POST запросов (обновляется)

# 6. Цветная подсветка важных событий
tail -f app.log | grep --color=auto -E "ERROR|SUCCESS|FAIL"

# 7. Фильтрация по нескольким критериям
tail -f app.log | grep "user_123" | grep "payment"
# События оплаты конкретного пользователя

# 8. Сохранение логов в файл
tail -f production.log | tee backup.log
# Одновременно в терминал и файл

# 9. Мониторинг производительности
tail -f performance.log | awk '$3 > 1000 {print "Slow query:", $0}'
# Запросы дольше 1000ms

# 10. Debug режим
tail -f debug.log | grep --line-buffered "function_name" | head -n 100
# Первые 100 вызовов функции
`

const systemInfoScriptSnippet = `
#!/bin/bash

# ===================================================================
# Скрипт для записи информации о системе
# CPU модель, версия ядра, дата ядра
# ===================================================================

# Определяем выходной файл
OUTPUT_FILE="system_info.txt"

# ===================================================================
# МЕТОД 1: Пошаговое извлечение с grep и awk
# ===================================================================

echo "=== Метод 1: Пошаговое извлечение ==="

# Получаем модель CPU
# Ищем строку "model name" в /proc/cpuinfo и берем первое вхождение
CPU=$(grep "model name" /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//')
echo "CPU: $CPU"

# Получаем версию ядра
# uname -r выводит версию ядра (например: 5.15.0-91-generic)
KERNEL_VERSION=$(uname -r)
echo "Kernel: $KERNEL_VERSION"

# Получаем дату компиляции ядра
# uname -v выводит информацию о сборке, извлекаем дату
KERNEL_DATE=$(uname -v | awk '{print $3, $4, $5, $6, $7}')
echo "Date: $KERNEL_DATE"

# Формируем результат
RESULT="CPU: $CPU Kernel: $KERNEL_VERSION Date: $KERNEL_DATE"
echo "$RESULT"

# ===================================================================
# МЕТОД 2: Компактная запись в одну строку
# ===================================================================

echo -e "\\n=== Метод 2: Одной строкой ==="

# Все в одной команде с подстановкой
echo "CPU: $(grep 'model name' /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//') Kernel: $(uname -r) Date: $(uname -v | awk '{print $3, $4, $5, $6, $7}')"

# ===================================================================
# МЕТОД 3: Запись в файл с временной меткой
# ===================================================================

echo -e "\\n=== Метод 3: Запись в файл ==="

{
  echo "=== System Information ==="
  echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "CPU: $(grep 'model name' /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//')"
  echo "Kernel: $(uname -r)"
  echo "Kernel Date: $(uname -v | awk '{print $3, $4, $5, $6, $7}')"
  echo "========================="
} > "$OUTPUT_FILE"

echo "Information saved to $OUTPUT_FILE"
cat "$OUTPUT_FILE"

# ===================================================================
# МЕТОД 4: С дополнительной информацией
# ===================================================================

echo -e "\\n=== Метод 4: Расширенная информация ==="

{
  echo "=== Detailed System Information ==="
  echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')"
  echo ""

  # CPU информация
  echo "CPU Model: $(grep 'model name' /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//')"
  echo "CPU Cores: $(grep -c processor /proc/cpuinfo)"
  echo "CPU Architecture: $(uname -m)"

  # Kernel информация
  echo "Kernel Version: $(uname -r)"
  echo "Kernel Build Date: $(uname -v | awk '{print $3, $4, $5, $6, $7}')"
  echo "Kernel Name: $(uname -s)"

  # OS информация
  if [ -f /etc/os-release ]; then
    echo "OS: $(grep PRETTY_NAME /etc/os-release | awk -F= '{print $2}' | tr -d '"')"
  fi

  # Память
  echo "Total RAM: $(free -h | awk '/^Mem:/ {print $2}')"

  echo "===================================="
} > "system_info_detailed.txt"

cat "system_info_detailed.txt"

# ===================================================================
# МЕТОД 5: Функция для переиспользования
# ===================================================================

echo -e "\\n=== Метод 5: Через функцию ==="

get_system_info() {
  local cpu=$(grep 'model name' /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//')
  local kernel=$(uname -r)
  local kernel_date=$(uname -v | awk '{print $3, $4, $5, $6, $7}')

  echo "CPU: $cpu Kernel: $kernel Date: $kernel_date"
}

# Использование функции
SYSTEM_INFO=$(get_system_info)
echo "$SYSTEM_INFO"

# Сохранение в файл
echo "$SYSTEM_INFO" > system_info_function.txt

# ===================================================================
# МЕТОД 6: С проверками и обработкой ошибок
# ===================================================================

echo -e "\\n=== Метод 6: С обработкой ошибок ==="

safe_get_cpu() {
  if [ -f /proc/cpuinfo ]; then
    grep 'model name' /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//' || echo "Unknown"
  else
    echo "N/A"
  fi
}

safe_get_kernel() {
  uname -r 2>/dev/null || echo "Unknown"
}

safe_get_kernel_date() {
  uname -v 2>/dev/null | awk '{print $3, $4, $5, $6, $7}' || echo "Unknown"
}

echo "CPU: $(safe_get_cpu) Kernel: $(safe_get_kernel) Date: $(safe_get_kernel_date)"

# ===================================================================
# Завершение
# ===================================================================

echo -e "\\n=== Script completed ==="
echo "Output files created:"
ls -lh system_info*.txt 2>/dev/null || echo "No files created"
`

const scriptExplanationSnippet = `
# ===================================================================
# ПОДРОБНОЕ ОБЪЯСНЕНИЕ КОМПОНЕНТОВ СКРИПТА
# ===================================================================

# 1. Извлечение информации о CPU
grep "model name" /proc/cpuinfo
# /proc/cpuinfo - виртуальный файл с информацией о процессоре
# grep "model name" - находит строки с названием процессора
# Вывод: model name	: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz

grep "model name" /proc/cpuinfo | head -n 1
# head -n 1 - берет только первую строку (первое ядро)
# На многоядерных CPU будет много одинаковых строк

grep "model name" /proc/cpuinfo | head -n 1 | awk -F: '{print $2}'
# awk -F: - разделитель двоеточие
# {print $2} - печатает вторую колонку (после двоеточия)
# Вывод:  Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz

grep "model name" /proc/cpuinfo | head -n 1 | awk -F: '{print $2}' | sed 's/^ *//'
# sed 's/^ *//' - удаляет пробелы в начале
# s/ - substitute (замена)
# ^ - начало строки
# * - любое количество
# // - на пустую строку
# Итог: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz

# ===================================================================

# 2. Извлечение версии ядра
uname -r
# uname - Unix name - информация о системе
# -r - release (версия ядра)
# Вывод: 5.15.0-91-generic

# Альтернативные флаги uname:
uname -s  # Kernel name: Linux
uname -n  # Node name (hostname)
uname -m  # Machine architecture: x86_64
uname -p  # Processor: x86_64
uname -o  # Operating system: GNU/Linux
uname -a  # Вся информация

# ===================================================================

# 3. Извлечение даты ядра
uname -v
# -v - version (включает дату компиляции)
# Вывод: #102-Ubuntu SMP Mon Oct 23 16:45:12 UTC 2023

uname -v | awk '{print $3, $4, $5, $6, $7}'
# awk делит строку на слова (по пробелам)
# $1 = #102-Ubuntu
# $2 = SMP
# $3 = Mon
# $4 = Oct
# $5 = 23
# $6 = 16:45:12
# $7 = UTC
# Берем слова с 3 по 7: Mon Oct 23 16:45:12 UTC

# ===================================================================

# 4. Подстановка команд в bash
VARIABLE=$(command)
# $() - command substitution
# Выполняет команду и подставляет результат

# Пример:
CPU=$(grep "model name" /proc/cpuinfo | head -n 1 | awk -F: '{print $2}')
echo "Processor: $CPU"

# Старый синтаксис (устаревший):
CPU=\`grep "model name" /proc/cpuinfo | head -n 1 | awk -F: '{print $2}'\`
# Обратные кавычки - не рекомендуется, используйте $()

# ===================================================================

# 5. Запись в файл
echo "text" > file.txt        # Перезапись
echo "text" >> file.txt       # Добавление

# Многострочная запись:
{
  echo "Line 1"
  echo "Line 2"
  echo "Line 3"
} > output.txt

# Here document (heredoc):
cat > file.txt << EOF
Line 1
Line 2
Line 3
EOF

# ===================================================================

# 6. Условия и проверки
if [ -f /proc/cpuinfo ]; then
  echo "File exists"
fi

# Операторы проверки:
# -f file  - файл существует
# -d dir   - директория существует
# -e path  - путь существует
# -r file  - файл читаемый
# -w file  - файл записываемый
# -x file  - файл исполняемый

# Строки:
# -z "$var"  - пустая строка
# -n "$var"  - не пустая
# "$a" = "$b"  - равны
# "$a" != "$b" - не равны

# Числа:
# $a -eq $b  - равны
# $a -ne $b  - не равны
# $a -gt $b  - больше
# $a -lt $b  - меньше
# $a -ge $b  - больше или равно
# $a -le $b  - меньше или равно

# ===================================================================

# 7. Обработка ошибок
command 2>/dev/null
# 2> - перенаправляет stderr (поток ошибок)
# /dev/null - "черная дыра", выбрасывает данные

command || echo "Failed"
# || - логическое ИЛИ
# Если команда провалилась, выполнить следующую

command && echo "Success"
# && - логическое И
# Если команда успешна, выполнить следующую

# Пример:
CPU=$(grep 'model name' /proc/cpuinfo 2>/dev/null | head -n 1) || CPU="Unknown"
# Если grep провалился, CPU = "Unknown"

# ===================================================================

# 8. Функции в bash
function_name() {
  local variable="value"  # локальная переменная
  echo "Result"
  return 0  # код возврата (опционально)
}

# Использование:
result=$(function_name)
echo "$result"

# Параметры функции:
print_info() {
  echo "Arg 1: $1"
  echo "Arg 2: $2"
  echo "All args: $@"
  echo "Num args: $#"
}

print_info "hello" "world"
`

const combinedExamplesSnippet = `
# ===================================================================
# КОМБИНИРОВАННЫЕ ПРИМЕРЫ grep + awk + tail
# ===================================================================

# 1. Мониторинг последних ошибок в реальном времени
tail -f /var/log/application.log | grep --color=auto "ERROR" | awk '{print $1, $2, $NF}'
# tail -f - следим за файлом
# grep - фильтруем только ERROR
# awk - выводим время и последнее поле

# 2. Топ-10 IP адресов в логах
tail -n 10000 access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -n 10
# tail - последние 10000 строк
# awk - извлекаем IP (первая колонка)
# sort - сортируем
# uniq -c - считаем уникальные
# sort -rn - сортируем по количеству (обратно, числово)
# head - топ 10

# 3. Анализ времени ответа API
tail -n 1000 api.log | grep "response_time" | awk '{sum+=$5; count++} END {print "Avg:", sum/count "ms"}'
# Вычисляет среднее время ответа

# 4. Поиск медленных запросов
tail -f slow_query.log | awk '$3 > 1000 {print "SLOW:", $0}' | grep "SELECT"
# Показывает SELECT запросы дольше 1000ms

# 5. Подсчет статусов HTTP
tail -n 5000 access.log | awk '{print $9}' | sort | uniq -c | awk '{printf "Status %s: %d requests\\n", $2, $1}'
# Группирует по HTTP статусам

# 6. Мониторинг ошибок с временем
tail -f error.log | grep --line-buffered "CRITICAL" | awk '{print strftime("%H:%M:%S"), $0}'
# Добавляет текущее время к каждой строке

# 7. Поиск паттернов в последних строках
tail -n 100 app.log | grep -E "user_id.*payment.*success" | awk -F'user_id=' '{print $2}' | awk '{print $1}'
# Извлекает user_id из успешных платежей

# 8. Статистика по методам HTTP за последний час
tail -n 50000 access.log | awk -v time="$(date -d '1 hour ago' +%s)" '$4 > time {print $6}' | sort | uniq -c
# Методы HTTP за последний час

# 9. Поиск аномалий в размере ответа
tail -n 1000 access.log | awk '$10 > 1000000 {print "Large response:", $7, $10, "bytes"}'
# Ответы больше 1MB

# 10. Комбинированный анализ логов
{
  echo "=== Log Analysis Report ==="
  echo "Total lines: $(wc -l < app.log)"
  echo "Errors: $(grep -c ERROR app.log)"
  echo "Warnings: $(grep -c WARN app.log)"
  echo "Last error: $(grep ERROR app.log | tail -n 1)"
  echo "Top error: $(grep ERROR app.log | awk '{print $NF}' | sort | uniq -c | sort -rn | head -n 1)"
} | tee log_report.txt

# 11. Мониторинг роста файла
while true; do
  SIZE=$(tail -n 1 growth.log | awk '{print $5}')
  echo "$(date +%T) - Size: $SIZE"
  sleep 5
done

# 12. Извлечение JSON полей из логов
tail -f app.log | grep "user_action" | awk -F'"' '{print $4, $8, $12}' | awk '{printf "User: %s, Action: %s, Time: %s\\n", $1, $2, $3}'

# 13. Подсчет уникальных пользователей
tail -n 10000 access.log | awk '{print $3}' | sort -u | wc -l
# Количество уникальных пользователей

# 14. Фильтрация по диапазону времени
tail -n 5000 app.log | awk '$2 >= "09:00:00" && $2 <= "17:00:00"' | grep "transaction"
# Транзакции в рабочее время

# 15. Создание CSV из логов
tail -n 100 app.log | awk '{printf "%s,%s,%s,%s\\n", $1, $2, $5, $NF}' > log_export.csv
# Экспорт в CSV формат
`

const interviewQuestionsSnippet = `
# ===================================================================
# ЧАСТЫЕ ВОПРОСЫ НА СОБЕСЕДОВАНИИ
# ===================================================================

# 1. В чем разница между grep, egrep и fgrep?
grep   # Базовые регулярные выражения (BRE)
egrep  # Расширенные регулярные выражения (ERE) = grep -E
fgrep  # Поиск фиксированных строк, без regex = grep -F
# Современный подход: используйте grep с флагами -E или -F

# 2. Как найти все файлы, содержащие определенный текст?
grep -r "text" /path/to/search
grep -rn "text" .  # с номерами строк
grep -rl "text" .  # только имена файлов

# 3. Как вывести строки БЕЗ совпадения?
grep -v "pattern" file.txt
# -v инвертирует совпадение

# 4. В чем разница между $1 и $NF в awk?
# $1 - первая колонка
# $NF - последняя колонка (NF = Number of Fields)
echo "one two three" | awk '{print $1, $NF}'
# Вывод: one three

# 5. Как считать сумму чисел в колонке?
awk '{sum += $1} END {print sum}' numbers.txt

# 6. Как tail -f работает?
# tail -f постоянно проверяет файл на изменения
# Использует inotify (Linux) или kqueue (BSD)
# Показывает новые строки в реальном времени
# Ctrl+C для выхода

# 7. Разница между head и tail?
head file.txt  # Первые 10 строк
tail file.txt  # Последние 10 строк
head -n 5 file.txt  # Первые 5 строк
tail -n 5 file.txt  # Последние 5 строк

# 8. Как получить строки с 10 по 20?
tail -n +10 file.txt | head -n 11
# tail -n +10 - все строки начиная с 10-й
# head -n 11 - первые 11 из них (10-20)

# 9. Как посчитать количество уникальных IP?
awk '{print $1}' access.log | sort | uniq | wc -l
# или
awk '{print $1}' access.log | sort -u | wc -l

# 10. Как найти самые большие файлы?
ls -lh | awk '{print $5, $9}' | sort -h | tail -n 10

# 11. Как извлечь email адреса из файла?
grep -Eo "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" file.txt
# -E - расширенные regex
# -o - только совпадения

# 12. Как посчитать слова в файле?
wc -w file.txt
# или с awk:
awk '{words += NF} END {print words}' file.txt

# 13. Как найти дубликаты строк?
sort file.txt | uniq -d
# -d показывает только дубликаты

# 14. Как заменить текст во всех файлах?
grep -rl "old_text" . | xargs sed -i 's/old_text/new_text/g'
# НЕ используйте sed -i без бэкапа в продакшене!

# 15. Как мониторить несколько логов одновременно?
tail -f /var/log/app1.log /var/log/app2.log | grep --color=auto "ERROR"
`

const performanceSnippet = `
# ===================================================================
# ПРОИЗВОДИТЕЛЬНОСТЬ И ОПТИМИЗАЦИЯ
# ===================================================================

# 1. grep быстрее чем awk для простого поиска
time grep "pattern" large_file.txt
time awk '/pattern/' large_file.txt
# grep оптимизирован для поиска паттернов

# 2. fgrep (grep -F) быстрее для фиксированных строк
grep -F "exact_string" file.txt
# Не использует regex, работает быстрее

# 3. Ограничение вывода
grep "pattern" file.txt | head -n 100
# Останавливается после 100 совпадений

# 4. Использование --line-buffered для pipes
tail -f app.log | grep --line-buffered "ERROR" | head -n 10
# Без буферизации для реального времени

# 5. Параллельная обработка больших файлов
cat huge_file.txt | parallel --pipe grep "pattern"
# Использует все ядра CPU

# 6. Оптимизация awk
# Плохо:
awk '{
  for (i=1; i<=NF; i++) {
    if ($i == "target") print $0
  }
}' file.txt

# Хорошо:
awk '$0 ~ /target/' file.txt

# 7. Использование встроенных команд вместо pipes
# Медленно:
cat file.txt | grep "pattern" | wc -l

# Быстрее:
grep -c "pattern" file.txt

# 8. Избегайте лишних процессов
# Плохо:
cat file.txt | awk '{print $1}'

# Хорошо:
awk '{print $1}' file.txt

# 9. Использование mmap для больших файлов
grep --mmap "pattern" huge_file.txt

# 10. Ограничение глубины рекурсии
grep -r --max-depth=2 "pattern" /path
`

const highlightedGrepBasics = ref('')
const highlightedGrepPractical = ref('')
const highlightedAwkBasics = ref('')
const highlightedAwkPractical = ref('')
const highlightedTailBasics = ref('')
const highlightedTailPractical = ref('')
const highlightedSystemScript = ref('')
const highlightedScriptExplanation = ref('')
const highlightedCombined = ref('')
const highlightedInterview = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedGrepBasics.value = Prism.highlight(grepBasicsSnippet, Prism.languages.bash, 'bash')
  highlightedGrepPractical.value = Prism.highlight(grepPracticalSnippet, Prism.languages.bash, 'bash')
  highlightedAwkBasics.value = Prism.highlight(awkBasicsSnippet, Prism.languages.bash, 'bash')
  highlightedAwkPractical.value = Prism.highlight(awkPracticalSnippet, Prism.languages.bash, 'bash')
  highlightedTailBasics.value = Prism.highlight(tailBasicsSnippet, Prism.languages.bash, 'bash')
  highlightedTailPractical.value = Prism.highlight(tailPracticalSnippet, Prism.languages.bash, 'bash')
  highlightedSystemScript.value = Prism.highlight(systemInfoScriptSnippet, Prism.languages.bash, 'bash')
  highlightedScriptExplanation.value = Prism.highlight(scriptExplanationSnippet, Prism.languages.bash, 'bash')
  highlightedCombined.value = Prism.highlight(combinedExamplesSnippet, Prism.languages.bash, 'bash')
  highlightedInterview.value = Prism.highlight(interviewQuestionsSnippet, Prism.languages.bash, 'bash')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              grep, awk, tail — мощные инструменты обработки текста и логов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>grep, awk и tail</b> — это три фундаментальных команды Unix/Linux для работы с текстовыми данными.
              <b>grep</b> ищет паттерны, <b>awk</b> обрабатывает структурированный текст по колонкам,
              <b>tail</b> показывает последние строки и следит за файлами в реальном времени.
              Их комбинация — основа эффективного анализа логов и отладки.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">grep — поиск паттернов в тексте</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-magnify</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные возможности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Поиск</strong> текста в файлах</li>
                    <li><strong>Регулярные выражения</strong></li>
                    <li><strong>Рекурсивный</strong> поиск</li>
                    <li><strong>Инверсия</strong> результатов</li>
                    <li><strong>Контекст</strong> вокруг совпадений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-rocket-launch</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Поиск ошибок в логах</li>
                    <li>Анализ кодовой базы</li>
                    <li>Фильтрация вывода команд</li>
                    <li>Поиск конфигураций</li>
                    <li>Извлечение данных</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Основы grep</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGrepBasics"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Практические примеры grep</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGrepPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">awk — обработка структурированного текста</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-table-edit</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные возможности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Работа</strong> с колонками</li>
                    <li><strong>Математика</strong> и вычисления</li>
                    <li><strong>Условная</strong> обработка</li>
                    <li><strong>Форматирование</strong> вывода</li>
                    <li><strong>Агрегация</strong> данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-chart-line</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Парсинг логов и CSV</li>
                    <li>Статистика и аналитика</li>
                    <li>Трансформация данных</li>
                    <li>Генерация отчетов</li>
                    <li>Фильтрация по условиям</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Основы awk</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAwkBasics"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Практические примеры awk</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAwkPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">tail — просмотр конца файлов</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-file-document-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные возможности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Последние</strong> N строк</li>
                    <li><strong>Реальное время</strong> (tail -f)</li>
                    <li><strong>Несколько</strong> файлов</li>
                    <li><strong>Пропуск</strong> первых строк</li>
                    <li><strong>Байты</strong> вместо строк</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-monitor-eye</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Мониторинг логов</li>
                    <li>Отладка приложений</li>
                    <li>Просмотр последних событий</li>
                    <li>Следить за деплоями</li>
                    <li>Анализ в реальном времени</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Основы tail</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTailBasics"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Практические примеры tail</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTailPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практическая задача: Информация о системе</h2>

            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Задача:</strong> Создать bash-скрипт, который извлекает и записывает информацию о системе
              в формате "CPU: ****** Kernel: ***** Date: *****"
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="large" color="white" class="mb-2">mdi-cpu-64-bit</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">CPU</h3>
                  <p class="text-white text-body-2 ma-0">Модель процессора из /proc/cpuinfo</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-linux</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Kernel</h3>
                  <p class="text-white text-body-2 ma-0">Версия ядра Linux (uname -r)</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-warning">
                  <v-icon size="large" color="white" class="mb-2">mdi-calendar-clock</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Date</h3>
                  <p class="text-white text-body-2 ma-0">Дата компиляции ядра (uname -v)</p>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">Полный скрипт с разными подходами</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSystemScript"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Подробное объяснение компонентов</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedScriptExplanation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Таблица команд для извлечения системной информации</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Информация</th>
                <th class="text-left font-weight-bold">Команда</th>
                <th class="text-left font-weight-bold">Обработка</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>CPU модель</b></td>
                <td><code>/proc/cpuinfo</code></td>
                <td><code>grep "model name" | head -n 1 | awk -F: '{print $2}'</code></td>
              </tr>
              <tr>
                <td><b>Количество ядер</b></td>
                <td><code>/proc/cpuinfo</code></td>
                <td><code>grep -c processor</code></td>
              </tr>
              <tr>
                <td><b>Версия ядра</b></td>
                <td><code>uname -r</code></td>
                <td>Прямой вывод</td>
              </tr>
              <tr>
                <td><b>Дата ядра</b></td>
                <td><code>uname -v</code></td>
                <td><code>awk '{print $3, $4, $5, $6, $7}'</code></td>
              </tr>
              <tr>
                <td><b>Архитектура</b></td>
                <td><code>uname -m</code></td>
                <td>x86_64, arm64, etc.</td>
              </tr>
              <tr>
                <td><b>OS версия</b></td>
                <td><code>/etc/os-release</code></td>
                <td><code>grep PRETTY_NAME | awk -F= '{print $2}'</code></td>
              </tr>
              <tr>
                <td><b>Hostname</b></td>
                <td><code>hostname</code></td>
                <td>Прямой вывод</td>
              </tr>
              <tr>
                <td><b>Uptime</b></td>
                <td><code>uptime</code></td>
                <td><code>awk '{print $3, $4}'</code></td>
              </tr>
              <tr>
                <td><b>RAM</b></td>
                <td><code>free -h</code></td>
                <td><code>awk '/^Mem:/ {print $2}'</code></td>
              </tr>
              <tr>
                <td><b>Disk space</b></td>
                <td><code>df -h</code></td>
                <td><code>awk '/\\/$/ {print $4}'</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинированные примеры grep + awk + tail</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCombined"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterview"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Шпаргалка по флагам</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">grep флаги</h3>
                  <ul class="pl-4">
                    <li><code>-i</code> — игнорировать регистр</li>
                    <li><code>-v</code> — инверсия (NOT)</li>
                    <li><code>-r</code> — рекурсивно</li>
                    <li><code>-n</code> — номера строк</li>
                    <li><code>-c</code> — количество</li>
                    <li><code>-l</code> — только имена файлов</li>
                    <li><code>-w</code> — целые слова</li>
                    <li><code>-E</code> — расширенный regex</li>
                    <li><code>-A N</code> — N строк после</li>
                    <li><code>-B N</code> — N строк до</li>
                    <li><code>-C N</code> — N строк до и после</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">awk переменные</h3>
                  <ul class="pl-4">
                    <li><code>$0</code> — вся строка</li>
                    <li><code>$1, $2...</code> — колонки</li>
                    <li><code>$NF</code> — последняя колонка</li>
                    <li><code>NF</code> — количество полей</li>
                    <li><code>NR</code> — номер строки</li>
                    <li><code>FS</code> — разделитель полей</li>
                    <li><code>OFS</code> — выходной разделитель</li>
                    <li><code>RS</code> — разделитель записей</li>
                    <li><code>ORS</code> — выходной разделитель</li>
                    <li><code>FILENAME</code> — имя файла</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">tail флаги</h3>
                  <ul class="pl-4">
                    <li><code>-n N</code> — N строк</li>
                    <li><code>-N</code> — короткая форма</li>
                    <li><code>-f</code> — follow (следить)</li>
                    <li><code>-c N</code> — N байт</li>
                    <li><code>-n +N</code> — с N-й строки</li>
                    <li><code>-q</code> — без заголовков</li>
                    <li><code>-v</code> — с заголовками</li>
                    <li><code>--pid=PID</code> — до завершения процесса</li>
                    <li><code>-s N</code> — интервал проверки</li>
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
                    <li>Комбинировать команды через pipes</li>
                    <li>Использовать -n для grep (номера строк)</li>
                    <li>Тестировать regex на маленьких файлах</li>
                    <li>Использовать tail -f для мониторинга</li>
                    <li>Применять awk для структурированных данных</li>
                    <li>Сохранять полезные команды в алиасы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>grep на бинарных файлах</li>
                    <li>Сложные regex без тестирования</li>
                    <li>awk там где достаточно grep</li>
                    <li>Забывать про экранирование</li>
                    <li>Игнорировать производительность</li>
                    <li>Лишние cat в начале pipe</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите основы regex</li>
                    <li>Используйте man pages</li>
                    <li>Практикуйтесь на реальных логах</li>
                    <li>Создавайте bash функции</li>
                    <li>Документируйте сложные команды</li>
                    <li>Используйте современные альтернативы (ripgrep)</li>
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
                <td><code>grep</code></td>
                <td><code>ripgrep (rg)</code></td>
                <td>В 10-100 раз быстрее, умнее игнорирует файлы, лучший вывод</td>
              </tr>
              <tr>
                <td><code>awk</code></td>
                <td><code>miller (mlr)</code></td>
                <td>CSV/JSON/XML поддержка, более простой синтаксис</td>
              </tr>
              <tr>
                <td><code>tail -f</code></td>
                <td><code>multitail</code></td>
                <td>Несколько окон, цвета, фильтрация</td>
              </tr>
              <tr>
                <td><code>grep + tail</code></td>
                <td><code>lnav</code></td>
                <td>Интерактивный просмотр логов, автоматическое распознавание форматов</td>
              </tr>
              <tr>
                <td><code>awk для JSON</code></td>
                <td><code>jq</code></td>
                <td>Специализирован для JSON, мощные фильтры</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>grep, awk и tail</b> — это must-have инструменты для любого разработчика и DevOps инженера.
              <b>grep</b> находит паттерны, <b>awk</b> обрабатывает структурированные данные,
              <b>tail</b> следит за логами в реальном времени. Их комбинация через pipes создает
              мощные конвейеры обработки данных. Практическая задача с извлечением информации о системе
              демонстрирует типичное использование этих команд в production-окружении. Освоение этих
              инструментов значительно повышает эффективность работы и является обязательным для
              технических собеседований.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.gnu.org/software/gawk/manual/"
                target="_blank"
                class="mr-2">
                AWK Manual
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/BurntSushi/ripgrep"
                target="_blank">
                Ripgrep (modern grep)
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
