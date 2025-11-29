<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash.js'

const basicSyntaxSnippet = `
#!/bin/bash
# Шебанг (shebang) - указывает интерпретатор

# Комментарии начинаются с #

# Простая команда
echo "Hello, World!"

# Несколько команд на одной строке
echo "First"; echo "Second"

# Перенос длинной команды
echo "This is a very long command" \\
     "that spans multiple lines"

# Команды в подоболочке
result=$(date +%Y-%m-%d)
echo "Today is: $result"

# Устаревший синтаксис (избегайте)
result=\`date +%Y-%m-%d\`

# Условное выполнение
command1 && echo "Success"  # Выполнится, если command1 успешна
command2 || echo "Failed"   # Выполнится, если command2 провалилась

# Последовательное выполнение
npm install && npm run build && npm start
`

const variablesSnippet = `
#!/bin/bash

# =====================================
# ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
# =====================================

# Простое присваивание (БЕЗ пробелов вокруг =!)
NAME="John"
AGE=25
PI=3.14

# НЕПРАВИЛЬНО:
# NAME = "John"  # Ошибка!
# NAME= "John"   # Ошибка!

# Использование переменных
echo "Name: $NAME"
echo "Age: $AGE"
echo "Name: \${NAME}"  # Более явная форма

# Переменные из команд
CURRENT_DATE=$(date +%Y-%m-%d)
USER_NAME=$(whoami)
FILES_COUNT=$(ls -1 | wc -l)

echo "Date: $CURRENT_DATE"
echo "User: $USER_NAME"
echo "Files: $FILES_COUNT"

# =====================================
# СПЕЦИАЛЬНЫЕ ПЕРЕМЕННЫЕ
# =====================================

echo "Script name: $0"           # Имя скрипта
echo "First argument: $1"        # Первый аргумент
echo "Second argument: $2"       # Второй аргумент
echo "All arguments: $@"         # Все аргументы (массив)
echo "All arguments: $*"         # Все аргументы (строка)
echo "Number of arguments: $#"   # Количество аргументов
echo "Last exit code: $?"        # Код возврата последней команды
echo "Process ID: $$"            # PID текущего скрипта
echo "Background PID: $!"        # PID последнего фонового процесса

# =====================================
# ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ
# =====================================

echo "Home: $HOME"
echo "User: $USER"
echo "Path: $PATH"
echo "Working dir: $PWD"
echo "Shell: $SHELL"

# Экспорт переменной (доступна дочерним процессам)
export API_KEY="secret123"
export NODE_ENV="production"

# =====================================
# СТРОКОВЫЕ ОПЕРАЦИИ
# =====================================

TEXT="Hello World"

# Длина строки
echo "\${#TEXT}"              # 11

# Подстрока
echo "\${TEXT:0:5}"           # Hello (с позиции 0, 5 символов)
echo "\${TEXT:6}"             # World (с позиции 6 до конца)

# Замена
echo "\${TEXT/World/Bash}"    # Hello Bash (первое вхождение)
echo "\${TEXT//o/0}"          # Hell0 W0rld (все вхождения)

# Удаление префикса/суффикса
FILE="script.test.js"
echo "\${FILE%.js}"           # script.test (удалить .js)
echo "\${FILE%%.*}"           # script (удалить всё после первой точки)
echo "\${FILE#*.}"            # test.js (удалить до первой точки)

# Регистр
echo "\${TEXT^^}"             # HELLO WORLD (верхний регистр)
echo "\${TEXT,,}"             # hello world (нижний регистр)

# =====================================
# ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ
# =====================================

# Если переменная не установлена, использовать значение
echo "\${UNDEFINED:-default}"     # default

# Если переменная пустая или не установлена
echo "\${EMPTY:-default}"         # default

# Присвоить значение, если не установлено
: \${PORT:=3000}
echo "Port: $PORT"

# Ошибка, если не установлено
: \${REQUIRED_VAR:?Error: REQUIRED_VAR not set}

# =====================================
# МАССИВЫ
# =====================================

# Объявление массива
FRUITS=("Apple" "Banana" "Orange")

# Доступ к элементам
echo "\${FRUITS[0]}"          # Apple
echo "\${FRUITS[1]}"          # Banana

# Все элементы
echo "\${FRUITS[@]}"          # Apple Banana Orange

# Количество элементов
echo "\${#FRUITS[@]}"         # 3

# Добавление элемента
FRUITS+=("Mango")

# Итерация
for fruit in "\${FRUITS[@]}"; do
    echo "Fruit: $fruit"
done

# Ассоциативные массивы (требуется bash 4+)
declare -A COLORS
COLORS[red]="#FF0000"
COLORS[green]="#00FF00"
COLORS[blue]="#0000FF"

echo "\${COLORS[red]}"        # #FF0000

# =====================================
# READONLY И LOCAL
# =====================================

# Константа (нельзя изменить)
readonly VERSION="1.0.0"
# VERSION="2.0.0"  # Ошибка!

# Локальная переменная (только внутри функции)
function test() {
    local LOCAL_VAR="local value"
    echo "$LOCAL_VAR"
}
`

const conditionalSnippet = `
#!/bin/bash

# =====================================
# IF-ELSE УСЛОВИЯ
# =====================================

# Базовый синтаксис
if [ condition ]; then
    echo "True"
fi

# С else
if [ "$NAME" = "John" ]; then
    echo "Hello, John!"
else
    echo "Hello, stranger!"
fi

# С elif
if [ "$AGE" -lt 18 ]; then
    echo "Minor"
elif [ "$AGE" -lt 65 ]; then
    echo "Adult"
else
    echo "Senior"
fi

# =====================================
# ОПЕРАТОРЫ СРАВНЕНИЯ
# =====================================

# Числовые сравнения
NUM=10
if [ "$NUM" -eq 10 ]; then echo "Equal to 10"; fi
if [ "$NUM" -ne 5 ]; then echo "Not equal to 5"; fi
if [ "$NUM" -gt 5 ]; then echo "Greater than 5"; fi
if [ "$NUM" -ge 10 ]; then echo "Greater or equal 10"; fi
if [ "$NUM" -lt 20 ]; then echo "Less than 20"; fi
if [ "$NUM" -le 10 ]; then echo "Less or equal 10"; fi

# Строковые сравнения
STR="hello"
if [ "$STR" = "hello" ]; then echo "Equal"; fi
if [ "$STR" != "world" ]; then echo "Not equal"; fi
if [ -z "$STR" ]; then echo "Empty string"; fi
if [ -n "$STR" ]; then echo "Non-empty string"; fi

# Проверка файлов
if [ -f "file.txt" ]; then echo "File exists"; fi
if [ -d "directory" ]; then echo "Directory exists"; fi
if [ -r "file.txt" ]; then echo "File is readable"; fi
if [ -w "file.txt" ]; then echo "File is writable"; fi
if [ -x "script.sh" ]; then echo "File is executable"; fi
if [ -s "file.txt" ]; then echo "File is not empty"; fi
if [ -e "file.txt" ]; then echo "File or directory exists"; fi

# =====================================
# ЛОГИЧЕСКИЕ ОПЕРАТОРЫ
# =====================================

# AND (&&)
if [ "$AGE" -ge 18 ] && [ "$AGE" -le 65 ]; then
    echo "Working age"
fi

# OR (||)
if [ "$NAME" = "John" ] || [ "$NAME" = "Jane" ]; then
    echo "Valid name"
fi

# NOT (!)
if [ ! -f "file.txt" ]; then
    echo "File does not exist"
fi

# Современный синтаксис [[...]] (bash-специфичный)
if [[ "$NAME" == "John" && "$AGE" -ge 18 ]]; then
    echo "Adult John"
fi

# Регулярные выражения (только с [[...]])
if [[ "$EMAIL" =~ ^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]+$ ]]; then
    echo "Valid email"
fi

# =====================================
# CASE STATEMENT
# =====================================

read -p "Enter environment (dev/staging/prod): " ENV

case "$ENV" in
    dev|development)
        echo "Development environment"
        PORT=3000
        ;;
    staging)
        echo "Staging environment"
        PORT=4000
        ;;
    prod|production)
        echo "Production environment"
        PORT=80
        ;;
    *)
        echo "Unknown environment"
        exit 1
        ;;
esac

# Пример с файловыми расширениями
FILE="script.js"
case "$FILE" in
    *.js)
        echo "JavaScript file"
        ;;
    *.ts)
        echo "TypeScript file"
        ;;
    *.py)
        echo "Python file"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac

# =====================================
# ТЕРНАРНЫЙ ОПЕРАТОР (альтернатива)
# =====================================

# Bash не имеет тернарного оператора, но можно использовать:
RESULT=$( [ "$AGE" -ge 18 ] && echo "adult" || echo "minor" )
echo "Status: $RESULT"

# Или короткая форма
[ "$DEBUG" = true ] && echo "Debug mode ON" || echo "Debug mode OFF"
`

const loopsSnippet = `
#!/bin/bash

# =====================================
# FOR LOOPS
# =====================================

# Итерация по списку
for item in apple banana orange; do
    echo "Fruit: $item"
done

# Итерация по массиву
COLORS=("red" "green" "blue")
for color in "\${COLORS[@]}"; do
    echo "Color: $color"
done

# Итерация по файлам
for file in *.js; do
    echo "Processing: $file"
    # cat "$file" | grep "console.log"
done

# C-style for loop
for ((i=0; i<5; i++)); do
    echo "Number: $i"
done

# С шагом
for ((i=0; i<=10; i+=2)); do
    echo "Even: $i"
done

# Обратный порядок
for ((i=10; i>=0; i--)); do
    echo "Countdown: $i"
done

# Итерация по диапазону (brace expansion)
for num in {1..5}; do
    echo "Number: $num"
done

# С шагом
for num in {0..10..2}; do
    echo "Even: $num"
done

# Итерация по выводу команды
for user in $(cat users.txt); do
    echo "User: $user"
done

# Безопаснее использовать while с read
while IFS= read -r user; do
    echo "User: $user"
done < users.txt

# =====================================
# WHILE LOOPS
# =====================================

# Базовый while
counter=0
while [ $counter -lt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# Бесконечный цикл
while true; do
    echo "Running..."
    sleep 1
    # break  # выход из цикла
done

# Чтение файла построчно
while IFS= read -r line; do
    echo "Line: $line"
done < file.txt

# Ожидание условия
while [ ! -f "ready.txt" ]; do
    echo "Waiting for ready signal..."
    sleep 1
done

# С таймаутом
TIMEOUT=30
COUNTER=0
while [ ! -f "ready.txt" ] && [ $COUNTER -lt $TIMEOUT ]; do
    echo "Waiting... ($COUNTER/$TIMEOUT)"
    sleep 1
    ((COUNTER++))
done

# =====================================
# UNTIL LOOPS
# =====================================

# Выполняется, пока условие ложно
counter=0
until [ $counter -ge 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# Ожидание готовности сервера
until curl -s http://localhost:3000 > /dev/null; do
    echo "Waiting for server..."
    sleep 2
done
echo "Server is ready!"

# =====================================
# BREAK И CONTINUE
# =====================================

# break - выход из цикла
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break  # выход при i=5
    fi
    echo "Number: $i"
done

# continue - пропуск итерации
for i in {1..10}; do
    if [ $((i % 2)) -eq 0 ]; then
        continue  # пропустить четные
    fi
    echo "Odd: $i"
done

# Вложенные циклы с break
for i in {1..3}; do
    for j in {1..3}; do
        if [ $j -eq 2 ]; then
            break  # выход из внутреннего цикла
        fi
        echo "i=$i, j=$j"
    done
done

# =====================================
# SELECT LOOP (МЕНЮ)
# =====================================

echo "Select environment:"
select env in "Development" "Staging" "Production" "Quit"; do
    case $env in
        Development)
            echo "Starting dev environment..."
            break
            ;;
        Staging)
            echo "Starting staging environment..."
            break
            ;;
        Production)
            echo "Starting production environment..."
            break
            ;;
        Quit)
            echo "Exiting..."
            break
            ;;
        *)
            echo "Invalid option"
            ;;
    esac
done

# =====================================
# ПРАКТИЧЕСКИЕ ПРИМЕРЫ
# =====================================

# Обработка всех JavaScript файлов
for file in src/**/*.js; do
    echo "Linting $file..."
    eslint "$file"
done

# Ожидание запуска нескольких сервисов
services=("web" "api" "db")
for service in "\${services[@]}"; do
    until docker ps | grep -q "$service"; do
        echo "Waiting for $service..."
        sleep 2
    done
    echo "$service is ready!"
done

# Пакетная обработка файлов
counter=0
for image in *.jpg; do
    convert "$image" -resize 800x600 "resized_$image"
    ((counter++))
    echo "Processed: $counter images"
done

# Чтение CSV файла
while IFS=',' read -r name email age; do
    echo "Name: $name, Email: $email, Age: $age"
done < users.csv

# Таймер обратного отсчета
for i in {10..1}; do
    echo -ne "Starting in $i seconds...\\r"
    sleep 1
done
echo "Starting now!                    "
`

const argumentsSnippet = `
#!/bin/bash

# =====================================
# АРГУМЕНТЫ СКРИПТА
# =====================================

# Имя скрипта
echo "Script name: $0"

# Позиционные аргументы
echo "First argument: $1"
echo "Second argument: $2"
echo "Third argument: $3"

# Все аргументы
echo "All arguments (\$@): $@"
echo "All arguments (\$*): $*"

# Количество аргументов
echo "Number of arguments: $#"

# Проверка наличия аргументов
if [ $# -eq 0 ]; then
    echo "No arguments provided"
    echo "Usage: $0 <arg1> <arg2>"
    exit 1
fi

# =====================================
# ОБРАБОТКА АРГУМЕНТОВ
# =====================================

# Простая обработка
NAME=$1
AGE=$2

if [ -z "$NAME" ]; then
    echo "Error: Name is required"
    exit 1
fi

if [ -z "$AGE" ]; then
    AGE=25  # значение по умолчанию
fi

echo "Name: $NAME, Age: $AGE"

# =====================================
# SHIFT - СДВИГ АРГУМЕНТОВ
# =====================================

echo "Original arguments: $@"
shift  # удалить $1, сдвинуть все влево
echo "After shift: $@"

shift 2  # сдвинуть на 2 позиции
echo "After shift 2: $@"

# Обработка всех аргументов
while [ $# -gt 0 ]; do
    echo "Processing: $1"
    shift
done

# =====================================
# GETOPTS - ОПЦИИ КОМАНДНОЙ СТРОКИ
# =====================================

# Базовое использование
while getopts "n:a:v" opt; do
    case $opt in
        n)
            NAME=$OPTARG
            ;;
        a)
            AGE=$OPTARG
            ;;
        v)
            VERBOSE=true
            ;;
        \\?)
            echo "Invalid option: -$OPTARG"
            exit 1
            ;;
        :)
            echo "Option -$OPTARG requires an argument"
            exit 1
            ;;
    esac
done

# Использование: ./script.sh -n John -a 25 -v

# =====================================
# ДЛИННЫЕ ОПЦИИ (GNU getopt)
# =====================================

# Требует установленного GNU getopt
TEMP=$(getopt -o n:a:vh --long name:,age:,verbose,help -n 'script.sh' -- "$@")

if [ $? != 0 ]; then
    echo "Error parsing arguments"
    exit 1
fi

eval set -- "$TEMP"

while true; do
    case "$1" in
        -n|--name)
            NAME="$2"
            shift 2
            ;;
        -a|--age)
            AGE="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo "  -n, --name NAME      Specify name"
            echo "  -a, --age AGE        Specify age"
            echo "  -v, --verbose        Verbose output"
            echo "  -h, --help           Show this help"
            exit 0
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Internal error!"
            exit 1
            ;;
    esac
done

# Использование: ./script.sh --name John --age 25 --verbose

# =====================================
# ПРАКТИЧЕСКИЕ ПРИМЕРЫ
# =====================================

# Скрипт сборки с опциями
#!/bin/bash

ENVIRONMENT="dev"
VERBOSE=false
CLEAN=false

while getopts "e:vc" opt; do
    case $opt in
        e)
            ENVIRONMENT=$OPTARG
            ;;
        v)
            VERBOSE=true
            ;;
        c)
            CLEAN=true
            ;;
    esac
done

[ "$VERBOSE" = true ] && echo "Environment: $ENVIRONMENT"

if [ "$CLEAN" = true ]; then
    [ "$VERBOSE" = true ] && echo "Cleaning..."
    rm -rf dist node_modules
fi

echo "Building for $ENVIRONMENT..."
npm run build

# Использование: ./build.sh -e prod -v -c

# =====================================
# ВАЛИДАЦИЯ АРГУМЕНТОВ
# =====================================

#!/bin/bash

validate_args() {
    if [ $# -lt 2 ]; then
        echo "Error: Not enough arguments"
        echo "Usage: $0 <rows> <cols>"
        exit 1
    fi

    if ! [[ "$1" =~ ^[0-9]+$ ]]; then
        echo "Error: Rows must be a number"
        exit 1
    fi

    if ! [[ "$2" =~ ^[0-9]+$ ]]; then
        echo "Error: Cols must be a number"
        exit 1
    fi

    if [ "$1" -le 0 ] || [ "$2" -le 0 ]; then
        echo "Error: Rows and cols must be positive"
        exit 1
    fi
}

validate_args "$@"

# =====================================
# ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ
# =====================================

#!/bin/bash

# Метод 1: Проверка и присваивание
ROWS=$1
COLS=$2

if [ -z "$ROWS" ]; then
    ROWS=5
fi

if [ -z "$COLS" ]; then
    COLS=5
fi

# Метод 2: Использование :-
ROWS=\${1:-5}
COLS=\${2:-5}

# Метод 3: Проверка количества аргументов
if [ $# -eq 0 ]; then
    ROWS=5
    COLS=5
elif [ $# -eq 1 ]; then
    ROWS=$1
    COLS=$1  # квадратная таблица
else
    ROWS=$1
    COLS=$2
fi

echo "Creating table: \${ROWS}x\${COLS}"
`

const functionsSnippet = `
#!/bin/bash

# =====================================
# ОБЪЯВЛЕНИЕ ФУНКЦИЙ
# =====================================

# Синтаксис 1
function greet() {
    echo "Hello, $1!"
}

# Синтаксис 2 (предпочтительный)
greet() {
    echo "Hello, $1!"
}

# Вызов функции
greet "World"

# =====================================
# АРГУМЕНТЫ ФУНКЦИЙ
# =====================================

print_info() {
    local name=$1
    local age=$2

    echo "Name: $name"
    echo "Age: $age"
    echo "All args: $@"
    echo "Number of args: $#"
}

print_info "John" 25 "extra" "params"

# =====================================
# ВОЗВРАТ ЗНАЧЕНИЙ
# =====================================

# Return code (0-255)
is_valid_email() {
    if [[ "$1" =~ ^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]+$ ]]; then
        return 0  # success
    else
        return 1  # failure
    fi
}

if is_valid_email "test@example.com"; then
    echo "Valid email"
else
    echo "Invalid email"
fi

# Вывод через echo (захват в переменную)
get_date() {
    echo $(date +%Y-%m-%d)
}

TODAY=$(get_date)
echo "Today: $TODAY"

# =====================================
# ЛОКАЛЬНЫЕ VS ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
# =====================================

GLOBAL_VAR="global"

test_scope() {
    local LOCAL_VAR="local"
    GLOBAL_VAR="modified"

    echo "Inside function:"
    echo "  Local: $LOCAL_VAR"
    echo "  Global: $GLOBAL_VAR"
}

test_scope

echo "Outside function:"
# echo "  Local: $LOCAL_VAR"  # пустая строка
echo "  Global: $GLOBAL_VAR"  # modified

# =====================================
# ПРАКТИЧЕСКИЕ ФУНКЦИИ
# =====================================

# Логирование
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message"
}

log "INFO" "Application started"
log "ERROR" "Connection failed"

# Проверка команды
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

if command_exists "node"; then
    echo "Node.js is installed"
    node --version
else
    echo "Node.js is not installed"
fi

# Создание директории
ensure_dir() {
    local dir=$1

    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo "Created directory: $dir"
    fi
}

ensure_dir "dist/assets"

# Обработка ошибок
handle_error() {
    local exit_code=$?
    local line_number=$1

    if [ $exit_code -ne 0 ]; then
        echo "Error on line $line_number: command failed with code $exit_code"
        exit $exit_code
    fi
}

# Использование
npm install || handle_error $LINENO

# Цветной вывод
print_color() {
    local color=$1
    shift
    local message="$@"

    case $color in
        red)
            echo -e "\\033[0;31m$message\\033[0m"
            ;;
        green)
            echo -e "\\033[0;32m$message\\033[0m"
            ;;
        yellow)
            echo -e "\\033[0;33m$message\\033[0m"
            ;;
        *)
            echo "$message"
            ;;
    esac
}

print_color green "Success!"
print_color red "Error!"
print_color yellow "Warning!"
`

const markdownTableSnippet = `
#!/bin/bash

# =====================================
# РЕШЕНИЕ ЗАДАЧИ: MARKDOWN TABLE
# =====================================

# Функция создания таблицы
create_markdown_table() {
    local rows=\${1:-5}  # По умолчанию 5
    local cols=\${2:-5}  # По умолчанию 5
    local output_file="table.md"

    # Валидация аргументов
    if ! [[ "$rows" =~ ^[0-9]+$ ]] || ! [[ "$cols" =~ ^[0-9]+$ ]]; then
        echo "Error: Arguments must be numbers"
        return 1
    fi

    if [ "$rows" -le 0 ] || [ "$cols" -le 0 ]; then
        echo "Error: Arguments must be positive"
        return 1
    fi

    # Очистка файла
    > "$output_file"

    # Заголовок таблицы
    for ((c=1; c<=cols; c++)); do
        echo -n "| Col $c " >> "$output_file"
    done
    echo "|" >> "$output_file"

    # Разделитель
    for ((c=1; c<=cols; c++)); do
        echo -n "| --- " >> "$output_file"
    done
    echo "|" >> "$output_file"

    # Строки данных
    for ((r=1; r<=rows; r++)); do
        for ((c=1; c<=cols; c++)); do
            echo -n "| R\${r}C\${c} " >> "$output_file"
        done
        echo "|" >> "$output_file"
    done

    echo "Table \${rows}x\${cols} created in $output_file"
}

# Использование
create_markdown_table "$@"

# =====================================
# АЛЬТЕРНАТИВНАЯ ВЕРСИЯ С КРАСИВЫМ ФОРМАТИРОВАНИЕМ
# =====================================

create_pretty_table() {
    local rows=\${1:-5}
    local cols=\${2:-5}
    local output_file="table.md"

    # Валидация
    if ! [[ "$rows" =~ ^[0-9]+$ ]] || ! [[ "$cols" =~ ^[0-9]+$ ]]; then
        echo "Error: Arguments must be numbers" >&2
        exit 1
    fi

    # Начало файла
    {
        echo "# Markdown Table \${rows}x\${cols}"
        echo ""

        # Заголовок
        printf "|"
        for ((c=1; c<=cols; c++)); do
            printf " Column %-2d |" "$c"
        done
        printf "\\n"

        # Разделитель
        printf "|"
        for ((c=1; c<=cols; c++)); do
            printf " --------- |"
        done
        printf "\\n"

        # Строки
        for ((r=1; r<=rows; r++)); do
            printf "|"
            for ((c=1; c<=cols; c++)); do
                printf " R%dC%-6d |" "$r" "$c"
            done
            printf "\\n"
        done

    } > "$output_file"

    echo "✓ Pretty table \${rows}x\${cols} created in $output_file"
}

# =====================================
# ВЕРСИЯ С ОПЦИЯМИ
# =====================================

#!/bin/bash

# Значения по умолчанию
ROWS=5
COLS=5
OUTPUT="table.md"
HEADER_PREFIX="Column"
CELL_PREFIX="Cell"
PRETTY=false

# Функция помощи
show_help() {
    cat << EOF
Usage: $0 [OPTIONS] [ROWS] [COLS]

Create a Markdown table with specified dimensions.

Options:
  -o, --output FILE     Output file (default: table.md)
  -h, --header PREFIX   Header prefix (default: Column)
  -c, --cell PREFIX     Cell prefix (default: Cell)
  -p, --pretty          Pretty formatting
  --help                Show this help

Arguments:
  ROWS                  Number of rows (default: 5)
  COLS                  Number of columns (default: 5)

Examples:
  $0                    Create 5x5 table
  $0 10 3               Create 10x3 table
  $0 -p 8 8            Create pretty 8x8 table
  $0 -o output.md 6 4  Create 6x4 table in output.md
EOF
}

# Парсинг опций
while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT="$2"
            shift 2
            ;;
        -h|--header)
            HEADER_PREFIX="$2"
            shift 2
            ;;
        -c|--cell)
            CELL_PREFIX="$2"
            shift 2
            ;;
        -p|--pretty)
            PRETTY=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        -*)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
        *)
            if [[ -z "$ROWS_SET" ]]; then
                ROWS=$1
                ROWS_SET=true
            elif [[ -z "$COLS_SET" ]]; then
                COLS=$1
                COLS_SET=true
            else
                echo "Too many arguments"
                show_help
                exit 1
            fi
            shift
            ;;
    esac
done

# Валидация
if ! [[ "$ROWS" =~ ^[0-9]+$ ]] || ! [[ "$COLS" =~ ^[0-9]+$ ]]; then
    echo "Error: ROWS and COLS must be positive integers"
    exit 1
fi

if [ "$ROWS" -le 0 ] || [ "$COLS" -le 0 ]; then
    echo "Error: ROWS and COLS must be greater than 0"
    exit 1
fi

# Создание таблицы
create_table() {
    {
        # Заголовок
        printf "|"
        for ((c=1; c<=COLS; c++)); do
            if [ "$PRETTY" = true ]; then
                printf " %-10s |" "$HEADER_PREFIX $c"
            else
                printf " %s %d |" "$HEADER_PREFIX" "$c"
            fi
        done
        printf "\\n"

        # Разделитель
        printf "|"
        for ((c=1; c<=COLS; c++)); do
            if [ "$PRETTY" = true ]; then
                printf " ---------- |"
            else
                printf " --- |"
            fi
        done
        printf "\\n"

        # Строки
        for ((r=1; r<=ROWS; r++)); do
            printf "|"
            for ((c=1; c<=COLS; c++)); do
                if [ "$PRETTY" = true ]; then
                    printf " %-10s |" "$CELL_PREFIX R\${r}C\${c}"
                else
                    printf " %s R\${r}C\${c} |" "$CELL_PREFIX"
                fi
            done
            printf "\\n"
        done
    } > "$OUTPUT"
}

create_table

echo "✓ Table \${ROWS}x\${COLS} created in $OUTPUT"

# =====================================
# ИНТЕРАКТИВНАЯ ВЕРСИЯ
# =====================================

#!/bin/bash

# Интерактивный режим
interactive_mode() {
    echo "=== Markdown Table Generator ==="
    echo ""

    # Запрос строк
    read -p "Enter number of rows (default: 5): " rows
    rows=\${rows:-5}

    # Запрос столбцов
    read -p "Enter number of columns (default: 5): " cols
    cols=\${cols:-5}

    # Запрос имени файла
    read -p "Enter output filename (default: table.md): " output
    output=\${output:-table.md}

    # Подтверждение
    echo ""
    echo "Creating table:"
    echo "  Rows: $rows"
    echo "  Columns: $cols"
    echo "  Output: $output"
    echo ""
    read -p "Continue? (y/n): " confirm

    if [[ "$confirm" != "y" ]]; then
        echo "Cancelled"
        exit 0
    fi

    create_markdown_table "$rows" "$cols" "$output"
}

# Если нет аргументов, запускаем интерактивный режим
if [ $# -eq 0 ]; then
    interactive_mode
else
    create_markdown_table "$@"
fi
`

const practicalExamplesSnippet = `
#!/bin/bash

# =====================================
# ПРАКТИЧЕСКИЕ ПРИМЕРЫ ДЛЯ РАЗРАБОТКИ
# =====================================

# 1. Скрипт деплоя
#!/bin/bash
set -e  # Остановка при ошибке

echo "Starting deployment..."

# Проверка окружения
if [ -z "$DEPLOY_ENV" ]; then
    echo "Error: DEPLOY_ENV not set"
    exit 1
fi

# Сборка
echo "Building application..."
npm run build

# Тесты
echo "Running tests..."
npm test

# Деплой
echo "Deploying to $DEPLOY_ENV..."
if [ "$DEPLOY_ENV" = "production" ]; then
    # Дополнительные проверки для production
    read -p "Deploy to PRODUCTION? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        echo "Deployment cancelled"
        exit 0
    fi
fi

# Копирование файлов
rsync -avz dist/ user@server:/var/www/app/

echo "Deployment complete!"

# =====================================
# 2. Скрипт резервного копирования
#!/bin/bash

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
SOURCE="/var/www/app"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"

# Создание директории для бэкапов
mkdir -p "$BACKUP_DIR"

# Создание архива
echo "Creating backup..."
tar -czf "$BACKUP_FILE" -C "$(dirname "$SOURCE")" "$(basename "$SOURCE")"

# Проверка размера
SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "Backup created: $BACKUP_FILE ($SIZE)"

# Удаление старых бэкапов (старше 7 дней)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "Old backups cleaned"

# =====================================
# 3. Мониторинг процессов
#!/bin/bash

APP_NAME="node"
MAX_RESTARTS=3
RESTART_COUNT=0

monitor_process() {
    if ! pgrep -x "$APP_NAME" > /dev/null; then
        echo "[$(date)] Process $APP_NAME not running"

        if [ $RESTART_COUNT -lt $MAX_RESTARTS ]; then
            echo "Restarting... (attempt $((RESTART_COUNT + 1))/$MAX_RESTARTS)"
            npm start &
            ((RESTART_COUNT++))
        else
            echo "Max restarts reached. Sending alert..."
            # Отправка уведомления
        fi
    else
        echo "[$(date)] Process $APP_NAME is running"
        RESTART_COUNT=0
    fi
}

# Запуск мониторинга каждые 60 секунд
while true; do
    monitor_process
    sleep 60
done

# =====================================
# 4. Анализ логов
#!/bin/bash

LOG_FILE="/var/log/app/error.log"
REPORT_FILE="error_report_$(date +%Y%m%d).txt"

{
    echo "=== Error Report $(date) ==="
    echo ""

    echo "Total errors:"
    grep -c "ERROR" "$LOG_FILE"
    echo ""

    echo "Errors by type:"
    grep "ERROR" "$LOG_FILE" | awk '{print $4}' | sort | uniq -c | sort -rn
    echo ""

    echo "Top 10 most recent errors:"
    grep "ERROR" "$LOG_FILE" | tail -n 10

} > "$REPORT_FILE"

echo "Report saved to $REPORT_FILE"

# =====================================
# 5. Настройка окружения
#!/bin/bash

setup_project() {
    echo "Setting up development environment..."

    # Проверка Node.js
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        # установка Node.js
    fi

    # Проверка Git
    if ! command -v git &> /dev/null; then
        echo "Installing Git..."
        # установка Git
    fi

    # Установка зависимостей
    if [ -f "package.json" ]; then
        echo "Installing npm dependencies..."
        npm install
    fi

    # Создание .env файла
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        cat > .env << EOF
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost/myapp
EOF
    fi

    # Git hooks
    if [ -d ".git" ]; then
        echo "Setting up Git hooks..."
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
npm test
EOF
        chmod +x .git/hooks/pre-commit
    fi

    echo "Setup complete!"
}

setup_project

# =====================================
# 6. Очистка проекта
#!/bin/bash

clean_project() {
    echo "Cleaning project..."

    # Удаление зависимостей
    rm -rf node_modules

    # Удаление временных файлов
    rm -rf dist build .next

    # Удаление логов
    rm -rf logs/*.log

    # Очистка кэша
    npm cache clean --force

    echo "Project cleaned"
}

rebuild_project() {
    clean_project

    echo "Reinstalling dependencies..."
    npm install

    echo "Rebuilding..."
    npm run build

    echo "Rebuild complete"
}

case "$1" in
    clean)
        clean_project
        ;;
    rebuild)
        rebuild_project
        ;;
    *)
        echo "Usage: $0 {clean|rebuild}"
        exit 1
        ;;
esac

# =====================================
# 7. Проверка здоровья сервиса
#!/bin/bash

API_URL="http://localhost:3000/health"
TIMEOUT=5
MAX_RETRIES=3

check_health() {
    local retry=0

    while [ $retry -lt $MAX_RETRIES ]; do
        if curl -sf --max-time $TIMEOUT "$API_URL" > /dev/null; then
            echo "✓ Service is healthy"
            return 0
        else
            ((retry++))
            echo "× Health check failed (attempt $retry/$MAX_RETRIES)"
            sleep 2
        fi
    done

    echo "× Service is unhealthy"
    return 1
}

check_health || exit 1
`

const bestPracticesSnippet = `
#!/bin/bash

# =====================================
# ЛУЧШИЕ ПРАКТИКИ SHELL СКРИПТОВ
# =====================================

# 1. ВСЕГДА ИСПОЛЬЗУЙТЕ SHEBANG
#!/bin/bash

# 2. СТРОГИЙ РЕЖИМ
set -e          # Выход при ошибке
set -u          # Ошибка при неопределенной переменной
set -o pipefail # Ошибка в pipe
# Или короткая форма:
set -euo pipefail

# 3. ИСПОЛЬЗУЙТЕ КАВЫЧКИ
name="John Doe"
echo "$name"              # ✓ Правильно
echo $name                # ✗ Может привести к проблемам

# Массивы
files=("file 1.txt" "file 2.txt")
for file in "\${files[@]}"; do  # ✓ Правильно
    echo "$file"
done

# 4. ПРОВЕРКА КОМАНД
if command -v node &> /dev/null; then
    echo "Node.js is installed"
fi

# 5. ОБРАБОТКА ОШИБОК
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

[ -f "config.json" ] || error_exit "Config file not found"

# 6. ЛОГИРОВАНИЕ
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >&2
}

log "Starting process..."

# 7. ВРЕМЕННЫЕ ФАЙЛЫ
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

echo "data" > "$TEMP_FILE"
# Файл автоматически удалится при выходе

# 8. ФУНКЦИИ ДЛЯ ПОВТОРНОГО ИСПОЛЬЗОВАНИЯ
validate_number() {
    if ! [[ "$1" =~ ^[0-9]+$ ]]; then
        return 1
    fi
    return 0
}

# 9. ПЕРЕМЕННЫЕ В ВЕРХНЕМ РЕГИСТРЕ ДЛЯ ГЛОБАЛЬНЫХ
readonly VERSION="1.0.0"
readonly CONFIG_DIR="/etc/myapp"

# 10. КОММЕНТАРИИ И ДОКУМЕНТАЦИЯ
: << 'DOCUMENTATION'
Script: deploy.sh
Purpose: Deploy application to server
Usage: ./deploy.sh [environment]
Author: Developer Name
Date: 2025-01-01
DOCUMENTATION

# =====================================
# ЧАСТЫЕ ОШИБКИ И КАК ИХ ИЗБЕЖАТЬ
# =====================================

# ОШИБКА 1: Пробелы в присваивании
VAR="value"     # ✓ Правильно
# VAR = "value" # ✗ Ошибка

# ОШИБКА 2: Сравнение строк и чисел
if [ "$AGE" -eq 18 ]; then    # ✓ Числовое сравнение
    echo "Adult"
fi

if [ "$NAME" = "John" ]; then # ✓ Строковое сравнение
    echo "Hello John"
fi

# ОШИБКА 3: Не использование кавычек
file="my file.txt"
cat $file        # ✗ Будет искать "my" и "file.txt"
cat "$file"      # ✓ Правильно

# ОШИБКА 4: Использование [] вместо [[]]
if [[ "$VAR" =~ ^[0-9]+$ ]]; then  # ✓ Regex работает
    echo "Number"
fi

# ОШИБКА 5: Не проверка exit кодов
npm install      # ✗ Игнорирует ошибки
npm install || exit 1  # ✓ Выход при ошибке

# ОШИБКА 6: Небезопасное чтение файлов
while read line; do     # ✗ Может потерять последнюю строку
    echo "$line"
done < file.txt

while IFS= read -r line || [ -n "$line" ]; do  # ✓ Правильно
    echo "$line"
done < file.txt

# ОШИБКА 7: Использование deprecated команд
result=\`command\`       # ✗ Устаревший
result=$(command)      # ✓ Современный

# =====================================
# DEBUGGING
# =====================================

# Включить debug режим
set -x  # Показывать выполняемые команды
set +x  # Выключить debug

# Debug только для части скрипта
(set -x
    npm install
    npm build
)

# Использование shellcheck (линтер)
# shellcheck script.sh

# =====================================
# ШАБЛОН ПРОФЕССИОНАЛЬНОГО СКРИПТА
# =====================================

#!/bin/bash

# Strict mode
set -euo pipefail

# Constants
readonly SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly VERSION="1.0.0"

# Colors
readonly RED='\\033[0;31m'
readonly GREEN='\\033[0;32m'
readonly YELLOW='\\033[0;33m'
readonly NC='\\033[0m' # No Color

# Functions
log_info() {
    echo -e "\${GREEN}[INFO]\${NC} $*"
}

log_warn() {
    echo -e "\${YELLOW}[WARN]\${NC} $*" >&2
}

log_error() {
    echo -e "\${RED}[ERROR]\${NC} $*" >&2
}

show_help() {
    cat << EOF
\${SCRIPT_NAME} v\${VERSION}

Usage: \${SCRIPT_NAME} [OPTIONS] COMMAND

OPTIONS:
    -h, --help      Show this help
    -v, --verbose   Verbose output
    -V, --version   Show version

COMMANDS:
    start           Start the service
    stop            Stop the service
    status          Show service status

EOF
}

cleanup() {
    log_info "Cleaning up..."
    # Cleanup code here
}

main() {
    trap cleanup EXIT

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -V|--version)
                echo "$VERSION"
                exit 0
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            *)
                COMMAND=$1
                shift
                break
                ;;
        esac
    done

    # Main logic
    log_info "Starting $SCRIPT_NAME..."

    # Your code here

    log_info "Done!"
}

# Run
if [[ "\${BASH_SOURCE[0]}" == "\${0}" ]]; then
    main "$@"
fi
`

const highlightedBasicSyntax = ref('')
const highlightedVariables = ref('')
const highlightedConditional = ref('')
const highlightedLoops = ref('')
const highlightedArguments = ref('')
const highlightedFunctions = ref('')
const highlightedMarkdownTable = ref('')
const highlightedPractical = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedBasicSyntax.value = Prism.highlight(basicSyntaxSnippet, Prism.languages.bash, 'bash')
  highlightedVariables.value = Prism.highlight(variablesSnippet, Prism.languages.bash, 'bash')
  highlightedConditional.value = Prism.highlight(conditionalSnippet, Prism.languages.bash, 'bash')
  highlightedLoops.value = Prism.highlight(loopsSnippet, Prism.languages.bash, 'bash')
  highlightedArguments.value = Prism.highlight(argumentsSnippet, Prism.languages.bash, 'bash')
  highlightedFunctions.value = Prism.highlight(functionsSnippet, Prism.languages.bash, 'bash')
  highlightedMarkdownTable.value = Prism.highlight(markdownTableSnippet, Prism.languages.bash, 'bash')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.bash, 'bash')
  highlightedBestPractices.value = Prism.highlight(bestPracticesSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Shell-скрипты: синтаксис, переменные, циклы, аргументы
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Shell-скрипты</b> — это программы для автоматизации задач в Unix/Linux системах.
              Bash (Bourne Again Shell) — самый популярный shell для написания скриптов.
              Понимание переменных, условий, циклов и функций критично для DevOps, CI/CD и автоматизации.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Базовый синтаксис</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-file-code</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основы</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>#!/bin/bash</code> — shebang, указывает интерпретатор</li>
                    <li><code>#</code> — комментарии</li>
                    <li><code>;</code> — разделитель команд</li>
                    <li><code>\</code> — перенос строки</li>
                    <li><code>$()</code> — подстановка команд</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-run-fast</v-icon>
                    <h3 class="text-h6 font-weight-bold">Выполнение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>bash script.sh</code> — запуск через bash</li>
                    <li><code>chmod +x script.sh</code> — сделать исполняемым</li>
                    <li><code>./script.sh</code> — запуск напрямую</li>
                    <li><code>source script.sh</code> — в текущем shell</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicSyntax"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Переменные</h2>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> В bash НЕ должно быть пробелов вокруг знака = при присваивании!
              <code>VAR="value"</code> правильно, <code>VAR = "value"</code> вызовет ошибку.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVariables"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Специальные переменные</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Переменная</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>$0</code></td>
                <td>Имя скрипта</td>
                <td><code>./script.sh</code></td>
              </tr>
              <tr>
                <td><code>$1, $2, ...</code></td>
                <td>Позиционные аргументы</td>
                <td>Первый, второй аргумент</td>
              </tr>
              <tr>
                <td><code>$@</code></td>
                <td>Все аргументы (массив)</td>
                <td><code>"arg1" "arg2"</code></td>
              </tr>
              <tr>
                <td><code>$*</code></td>
                <td>Все аргументы (строка)</td>
                <td><code>"arg1 arg2"</code></td>
              </tr>
              <tr>
                <td><code>$#</code></td>
                <td>Количество аргументов</td>
                <td><code>2</code></td>
              </tr>
              <tr>
                <td><code>$?</code></td>
                <td>Код возврата последней команды</td>
                <td><code>0</code> (success)</td>
              </tr>
              <tr>
                <td><code>$$</code></td>
                <td>PID текущего процесса</td>
                <td><code>12345</code></td>
              </tr>
              <tr>
                <td><code>$!</code></td>
                <td>PID последнего фонового процесса</td>
                <td><code>12346</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Условные конструкции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConditional"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Операторы сравнения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Числовые</h3>
                  <ul class="pl-4">
                    <li><code>-eq</code> — равно (equal)</li>
                    <li><code>-ne</code> — не равно (not equal)</li>
                    <li><code>-gt</code> — больше (greater than)</li>
                    <li><code>-ge</code> — больше или равно</li>
                    <li><code>-lt</code> — меньше (less than)</li>
                    <li><code>-le</code> — меньше или равно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Строковые</h3>
                  <ul class="pl-4">
                    <li><code>=</code> или <code>==</code> — равно</li>
                    <li><code>!=</code> — не равно</li>
                    <li><code>-z</code> — пустая строка</li>
                    <li><code>-n</code> — непустая строка</li>
                    <li><code>&lt;</code> — меньше (лексикографически)</li>
                    <li><code>&gt;</code> — больше (лексикографически)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Циклы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLoops"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Аргументы командной строки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedArguments"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFunctions"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение задачи: Markdown Table Generator</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-table</v-icon>
              <strong>Задача:</strong> Создать bash-скрипт, который принимает количество строк и столбцов
              в качестве аргументов и генерирует таблицу в формате Markdown. Если аргументы не указаны,
              создаётся таблица 5×5.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMarkdownTable"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики и частые ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между [] и [[]]?</p>
                <p class="font-weight-regular ma-0">
                  <code>[]</code> — POSIX-совместимый тест, работает везде. <code>[[]]</code> — bash-специфичный,
                  поддерживает regex, логические операторы &&/||, безопаснее (не требует кавычек),
                  но не работает в sh. Используйте <code>[[]]</code> в bash-скриптах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как передать массив в функцию?</p>
                <p class="font-weight-regular ma-0">
                  Передавайте элементы как отдельные аргументы: <code>my_func "\${array[@]}"</code>.
                  Внутри функции восстанавливайте: <code>local arr=("$@")</code>. Или используйте
                  nameref в bash 4.3+: <code>local -n arr=$1</code>
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делает set -e и set -u?</p>
                <p class="font-weight-regular ma-0">
                  <code>set -e</code> — останавливает скрипт при ошибке любой команды (exit code != 0).
                  <code>set -u</code> — ошибка при использовании неопределённой переменной.
                  <code>set -o pipefail</code> — ошибка в pipe если любая команда провалилась.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между $@ и $*?</p>
                <p class="font-weight-regular ma-0">
                  <code>"$@"</code> — каждый аргумент как отдельная строка <code>"arg1" "arg2"</code>.
                  <code>"$*"</code> — все аргументы как одна строка <code>"arg1 arg2"</code>.
                  Всегда используйте <code>"$@"</code> для корректной обработки аргументов с пробелами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как прочитать файл построчно?</p>
                <p class="font-weight-regular ma-0">
                  <code>while IFS= read -r line; do echo "$line"; done &lt; file.txt</code><br>
                  <code>IFS=</code> сохраняет пробелы, <code>-r</code> отключает экранирование backslash.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как безопасно работать с именами файлов, содержащими пробелы?</p>
                <p class="font-weight-regular ma-0">
                  Всегда используйте кавычки: <code>cat "$file"</code>, а не <code>cat $file</code>.
                  В циклах: <code>for file in *.txt; do echo "$file"; done</code>
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Полезные инструменты</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Линтеры и валидация</h3>
                  <ul class="pl-4">
                    <li><code>shellcheck</code> — линтер для shell</li>
                    <li><code>shfmt</code> — форматирование</li>
                    <li><code>bash -n script.sh</code> — проверка синтаксиса</li>
                    <li><code>bash -x script.sh</code> — debug режим</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Тестирование</h3>
                  <ul class="pl-4">
                    <li><code>bats</code> — Bash Automated Testing System</li>
                    <li><code>shunit2</code> — unit тесты</li>
                    <li><code>assert.sh</code> — assertions</li>
                    <li>Mock/stub frameworks</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Документация</h3>
                  <ul class="pl-4">
                    <li><code>man bash</code> — полное руководство</li>
                    <li><code>help command</code> — встроенная помощь</li>
                    <li><code>tldr command</code> — краткие примеры</li>
                    <li><code>explainshell.com</code> — объяснение команд</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение синтаксиса</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Концепция</th>
                <th class="text-left font-weight-bold">Старый синтаксис</th>
                <th class="text-left font-weight-bold">Современный синтаксис</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Подстановка команд</td>
                <td><code>`command`</code></td>
                <td><code>$(command)</code></td>
              </tr>
              <tr>
                <td>Тест условия</td>
                <td><code>[ condition ]</code></td>
                <td><code>[[ condition ]]</code></td>
              </tr>
              <tr>
                <td>Арифметика</td>
                <td><code>expr $a + $b</code></td>
                <td><code>$((a + b))</code></td>
              </tr>
              <tr>
                <td>Локальные переменные</td>
                <td>Не поддерживалось</td>
                <td><code>local var="value"</code></td>
              </tr>
              <tr>
                <td>Массивы</td>
                <td>Не поддерживалось</td>
                <td><code>arr=("a" "b")</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Exit коды</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Код</th>
                <th class="text-left font-weight-bold">Значение</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>0</code></td>
                <td>Успех</td>
                <td>Команда выполнена успешно</td>
              </tr>
              <tr>
                <td><code>1</code></td>
                <td>Общая ошибка</td>
                <td>Стандартная ошибка</td>
              </tr>
              <tr>
                <td><code>2</code></td>
                <td>Ошибка использования</td>
                <td>Неверные аргументы</td>
              </tr>
              <tr>
                <td><code>126</code></td>
                <td>Не исполняемый</td>
                <td>Нет прав на выполнение</td>
              </tr>
              <tr>
                <td><code>127</code></td>
                <td>Команда не найдена</td>
                <td>Команда отсутствует</td>
              </tr>
              <tr>
                <td><code>128+N</code></td>
                <td>Сигнал</td>
                <td>Завершение по сигналу N</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Shell-скрипты</b> — мощный инструмент автоматизации в Unix/Linux системах. Понимание
              переменных (специальных и обычных), условных конструкций (if/case), циклов (for/while/until),
              аргументов командной строки и функций необходимо для эффективной работы с DevOps,
              CI/CD и системным программированием. Следование лучшим практикам (строгий режим, кавычки,
              проверка ошибок) делает скрипты надежными и поддерживаемыми.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.shellcheck.net/"
                target="_blank"
                class="mr-2">
                ShellCheck Online
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://devhints.io/bash"
                target="_blank"
                class="mr-2">
                Bash Cheatsheet
              </v-btn>
              <v-btn
                color="info"
                size="small"
                variant="elevated"
                href="https://www.gnu.org/software/bash/manual/"
                target="_blank">
                Bash Manual
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}

.custom-code code {
  background: none !important;
  color: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
}

.ol-list {
  padding-left: 1.5rem;
}

.ol-list li {
  margin-bottom: 1rem;
}

:deep(.token.comment) {
  color: #6272a4;
}

:deep(.token.string) {
  color: #f1fa8c;
}

:deep(.token.keyword) {
  color: #ff79c6;
}

:deep(.token.function) {
  color: #50fa7b;
}

:deep(.token.number) {
  color: #bd93f9;
}

:deep(.token.operator) {
  color: #ff79c6;
}

:deep(.token.punctuation) {
  color: #f8f8f2;
}

:deep(.token.variable) {
  color: #f8f8f2;
}

:deep(.token.builtin) {
  color: #8be9fd;
}
</style>
