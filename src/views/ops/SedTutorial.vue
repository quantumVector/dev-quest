<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-nix.js'

const sedBasicsSnippet = `
# sed - Stream EDitor
# Редактирование текста в потоке

# Базовый синтаксис
sed 'команда' файл
sed -e 'команда1' -e 'команда2' файл
sed -f script.sed файл

# Основные команды:
# s - substitute (замена)
# d - delete (удаление)
# p - print (печать)
# a - append (добавить после)
# i - insert (вставить до)
# c - change (заменить строку)

# ===================================================================
# ЗАМЕНА (substitute)
# ===================================================================

# Базовая замена (первое вхождение)
sed 's/old/new/' file.txt
# s/pattern/replacement/

# Глобальная замена (все вхождения)
sed 's/old/new/g' file.txt
# g - global flag

# Замена с игнорированием регистра
sed 's/old/new/gi' file.txt
# i - case insensitive

# Замена только N-го вхождения
sed 's/old/new/2' file.txt
# Заменит только второе вхождение

# Замена с изменением файла (in-place)
sed -i 's/old/new/g' file.txt
# -i редактирует файл напрямую

# Создание бэкапа при in-place редактировании
sed -i.bak 's/old/new/g' file.txt
# Создаст file.txt.bak

# ===================================================================
# УДАЛЕНИЕ (delete)
# ===================================================================

# Удалить строку N
sed '5d' file.txt
# Удаляет 5-ю строку

# Удалить диапазон строк
sed '5,10d' file.txt
# Удаляет строки с 5 по 10

# Удалить последнюю строку
sed '$d' file.txt
# $ - последняя строка

# Удалить строки с паттерном
sed '/pattern/d' file.txt
# Удаляет все строки, содержащие pattern

# Удалить пустые строки
sed '/^$/d' file.txt
# ^$ - пустая строка

# Удалить строки, НЕ содержащие паттерн
sed '/pattern/!d' file.txt
# ! - инверсия

# ===================================================================
# ПЕЧАТЬ (print)
# ===================================================================

# Печать конкретной строки
sed -n '5p' file.txt
# -n подавляет автоматический вывод
# p - печатает строку

# Печать диапазона
sed -n '5,10p' file.txt

# Печать строк с паттерном
sed -n '/pattern/p' file.txt
# Аналог grep

# Печать с номерами строк
sed -n '=' file.txt
# = печатает номер строки

# ===================================================================
# ВСТАВКА И ДОБАВЛЕНИЕ
# ===================================================================

# Вставить строку ПЕРЕД паттерном
sed '/pattern/i\\
New line before pattern' file.txt

# Добавить строку ПОСЛЕ паттерна
sed '/pattern/a\\
New line after pattern' file.txt

# Заменить всю строку
sed '/pattern/c\\
Completely new line' file.txt

# ===================================================================
# АДРЕСАЦИЯ
# ===================================================================

# Действие на строке N
sed '5s/old/new/' file.txt

# Действие на диапазоне
sed '5,10s/old/new/' file.txt

# От строки N до конца
sed '5,$s/old/new/' file.txt

# От паттерна до паттерна
sed '/START/,/END/s/old/new/' file.txt

# ===================================================================
# ФЛАГИ И ОПЦИИ
# ===================================================================

# -n - подавить автоматический вывод
# -e - несколько команд
# -i - редактирование на месте
# -r или -E - расширенные regex
# -f - скрипт из файла

# Несколько команд
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# Или с точкой с запятой
sed 's/foo/bar/g; s/baz/qux/g' file.txt

# Расширенные регулярные выражения
sed -E 's/[0-9]+/NUMBER/g' file.txt
`

const sedAdvancedSnippet = `
# ===================================================================
# ПРОДВИНУТЫЕ ТЕХНИКИ sed
# ===================================================================

# Группы захвата и обратные ссылки
sed 's/\\([0-9]*\\)-\\([0-9]*\\)/\\2-\\1/' file.txt
# Меняет местами числа: 123-456 → 456-123
# \\( \\) - группы захвата
# \\1 \\2 - обратные ссылки

# С расширенным regex (проще)
sed -E 's/([0-9]+)-([0-9]+)/\\2-\\1/' file.txt
# Без экранирования скобок

# Замена с использованием & (вся совпадающая строка)
sed 's/[0-9]*/(&)/' file.txt
# 123 → (123)
# & - вся совпавшая часть

# Множественные замены на одной строке
sed 's/foo/bar/g; s/baz/qux/g; s/old/new/g' file.txt

# Условная замена (только если есть другой паттерн)
sed '/pattern1/s/old/new/g' file.txt
# Заменяет old→new только в строках с pattern1

# Диапазон с regex
sed '/START/,/END/s/old/new/g' file.txt
# От строки со START до строки с END

# ===================================================================
# РАБОТА С БЛОКАМИ
# ===================================================================

# Удалить блок между паттернами (включительно)
sed '/START/,/END/d' file.txt

# Удалить блок между паттернами (исключая границы)
sed '/START/,/END/{/START/!{/END/!d}}' file.txt

# Добавить строку перед блоком
sed '/START/i\\
New line before block' file.txt

# Добавить строку после блока
sed '/END/a\\
New line after block' file.txt

# ===================================================================
# МНОГОСТРОЧНАЯ ОБРАБОТКА
# ===================================================================

# N - добавить следующую строку в буфер
sed '/pattern/{N; s/old/new/}' file.txt
# Обрабатывает две строки как одну

# Удалить строку и следующую
sed '/pattern/{N; d}' file.txt

# Соединить строки
sed ':a; N; $!ba; s/\\n/ /g' file.txt
# Объединяет все строки в одну

# ===================================================================
# РАБОТА С РАЗДЕЛИТЕЛЯМИ
# ===================================================================

# Использование другого разделителя
sed 's|/path/to/old|/path/to/new|g' file.txt
# Вместо / можно использовать |, #, @ и др.

# Полезно для путей
sed 's#/usr/local/bin#/opt/bin#g' file.txt

# ===================================================================
# СЛОЖНЫЕ ПАТТЕРНЫ
# ===================================================================

# Замена с условием (if-then-else в sed)
sed '/pattern/s/old/new/; t; s/default/replacement/' file.txt
# t - переход если замена успешна

# Цикл (повторять пока есть изменения)
sed ':a; s/\\([0-9]\\)\\([0-9]\\{3\\}\\)/\\1,\\2/; ta' file.txt
# Добавляет запятые в числа: 1000000 → 1,000,000

# ===================================================================
# ПРАКТИЧЕСКИЕ ПРИМЕРЫ
# ===================================================================

# Удалить комментарии (#)
sed 's/#.*//' file.txt

# Удалить комментарии и пустые строки
sed 's/#.*//; /^$/d' file.txt

# Удалить trailing whitespace
sed 's/[[:space:]]*$//' file.txt

# Удалить leading whitespace
sed 's/^[[:space:]]*//' file.txt

# Удалить пустые строки и whitespace-only строки
sed '/^[[:space:]]*$/d' file.txt

# Добавить префикс к каждой строке
sed 's/^/PREFIX: /' file.txt

# Добавить суффикс к каждой строке
sed 's/$/ SUFFIX/' file.txt

# Удвоить пробелы между строками
sed G file.txt

# Нумеровать строки
sed = file.txt | sed 'N; s/\\n/\\t/'

# Заменить множественные пробелы на один
sed 's/  */ /g' file.txt

# Конвертация DOS → Unix (удалить \\r)
sed 's/\\r$//' file.txt

# Конвертация Unix → DOS (добавить \\r)
sed 's/$/\\r/' file.txt
`

const nixosConfigSnippet = `
# ===================================================================
# ИСХОДНЫЙ ФАЙЛ amazon-image.nix
# ===================================================================

{ config, lib, pkgs, ... }:

let
  cfg = config.ec2;
in
{
  imports = [
    ../profiles/headless.nix
    ./ec2-data.nix
  ];

  # ... другие опции ...

  services.openssh.settings.PermitRootLogin = "prohibit-password";

  # ... другие опции ...

  systemd.services.fetch-ec2-metadata = {
    wantedBy = [ "multi-user.target" ];
    after = ["network-online.target"];
    path = [ pkgs.curl ];
    script = builtins.readFile ./ec2-metadata-fetcher.sh;
    serviceConfig.Type = "oneshot";
    serviceConfig.StandardOutput = "journal+console";
  };

  # ... остальной конфиг ...
}
`

const nixosModificationScriptSnippet = `
#!/bin/bash

# ===================================================================
# Скрипт модификации amazon-image.nix
# ===================================================================

INPUT_FILE="amazon-image.nix"
OUTPUT_FILE="amazon-image-modified.nix"
BACKUP_FILE="amazon-image.nix.bak"

# Создаем бэкап
cp "$INPUT_FILE" "$BACKUP_FILE"

# ===================================================================
# ЗАДАЧА 1: Добавить "./custom.nix" в блок imports
# ===================================================================

# Метод 1: Простой (если imports всегда в начале файла)
sed '/imports = \\[/,/\\];/{
  /\\];/i\\
    ./custom.nix
}' "$INPUT_FILE" > temp1.nix

# Метод 2: Более надежный (добавляем после последнего элемента)
sed '/imports = \\[/,/\\];/{
  /\\];/{
    i\\
    ./custom.nix
  }
}' "$INPUT_FILE" > temp1.nix

# Метод 3: Добавить перед закрывающей скобкой
sed '/imports = \\[/,/\\];/s|\\];|  ./custom.nix\\n  ];|' "$INPUT_FILE" > temp1.nix

# ===================================================================
# ЗАДАЧА 2: Заменить PermitRootLogin значение
# ===================================================================

# Простая замена всей строки
sed 's/services\\.openssh\\.settings\\.PermitRootLogin = "prohibit-password";/services.openssh.settings.PermitRootLogin = "true";/' temp1.nix > temp2.nix

# Или с regex для гибкости
sed 's/\\(services\\.openssh\\.settings\\.PermitRootLogin = \\)"[^"]*"/\\1"true"/' temp1.nix > temp2.nix

# ===================================================================
# ЗАДАЧА 3: Удалить последние 2 строки из systemd.services блока
# ===================================================================

# Это самая сложная часть, так как нужно:
# 1. Найти блок systemd.services.fetch-ec2-metadata
# 2. Найти последние два serviceConfig параметра
# 3. Удалить их независимо от порядка

# Метод 1: Удалить конкретные строки
sed '/systemd\\.services\\.fetch-ec2-metadata = {/,/};/{
  /serviceConfig\\.Type = "oneshot";/d
  /serviceConfig\\.StandardOutput = "journal+console";/d
}' temp2.nix > temp3.nix

# Метод 2: Более универсальный (удалить любые 2 последних serviceConfig)
sed '/systemd\\.services\\.fetch-ec2-metadata = {/,/};/{
  /serviceConfig\\./{
    # Сохраняем в hold space
    H
    # Удаляем из pattern space
    d
  }
  /};/{
    # Перед закрывающей скобкой
    # Достаем из hold space
    x
    # Удаляем последние 2 строки
    s/\\(.*\\n.*\\)\\n.*\\n.*/\\1/
    # Выводим обратно
    p
    # Очищаем hold space
    x
  }
}' temp2.nix > temp3.nix

# Метод 3: Самый надежный - обработка всего блока
sed -E '/systemd\\.services\\.fetch-ec2-metadata = \\{/,/^[[:space:]]*\\};/{
  # Удаляем строки с serviceConfig.Type и serviceConfig.StandardOutput
  /serviceConfig\\.(Type|StandardOutput)/d
}' temp2.nix > temp3.nix

# ===================================================================
# ФИНАЛЬНЫЙ СКРИПТ - ВСЕ ВМЕСТЕ
# ===================================================================

cat > modify-nixos-config.sh << 'SCRIPT'
#!/bin/bash

set -euo pipefail

INPUT_FILE="\${1:-amazon-image.nix}"
OUTPUT_FILE="\${2:-amazon-image-modified.nix}"

# Проверка существования файла
if [[ ! -f "$INPUT_FILE" ]]; then
    echo "Error: File $INPUT_FILE not found"
    exit 1
fi

# Создаем временный файл
TEMP_FILE=$(mktemp)

# Цепочка sed команд
sed -e '
# 1. Добавляем ./custom.nix в imports
/imports = \\[/,/\\];/ {
    /\\];/ i\\
    ./custom.nix
}

# 2. Меняем PermitRootLogin
s/\\(services\\.openssh\\.settings\\.PermitRootLogin = \\)"prohibit-password"/\\1"true"/

# 3. Удаляем последние два serviceConfig из fetch-ec2-metadata
/systemd\\.services\\.fetch-ec2-metadata = {/,/^[[:space:]]*};/ {
    /serviceConfig\\.(Type|StandardOutput)/d
}
' "$INPUT_FILE" > "$TEMP_FILE"

# Перемещаем результат
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "Modified configuration saved to $OUTPUT_FILE"
echo "Original file: $INPUT_FILE"

# Показываем diff
if command -v diff &> /dev/null; then
    echo ""
    echo "Changes made:"
    diff -u "$INPUT_FILE" "$OUTPUT_FILE" || true
fi
SCRIPT

chmod +x modify-nixos-config.sh

# ===================================================================
# АЛЬТЕРНАТИВНЫЙ ПОДХОД - ПОШАГОВАЯ ОБРАБОТКА
# ===================================================================

cat > modify-nixos-step-by-step.sh << 'SCRIPT'
#!/bin/bash

set -euo pipefail

INPUT_FILE="\${1:-amazon-image.nix}"
OUTPUT_FILE="\${2:-amazon-image-modified.nix}"

echo "Step 1: Adding ./custom.nix to imports..."
sed '/imports = \\[/,/\\];/ {
    /\\];/ i\\
    ./custom.nix
}' "$INPUT_FILE" > step1.nix

echo "Step 2: Changing PermitRootLogin value..."
sed 's/\\(services\\.openssh\\.settings\\.PermitRootLogin = \\)"prohibit-password"/\\1"true"/' step1.nix > step2.nix

echo "Step 3: Removing serviceConfig lines from systemd.services..."
sed '/systemd\\.services\\.fetch-ec2-metadata = {/,/^[[:space:]]*};/ {
    /serviceConfig\\.(Type|StandardOutput)/d
}' step2.nix > "$OUTPUT_FILE"

# Очистка временных файлов
rm -f step1.nix step2.nix

echo "✓ Modification complete: $OUTPUT_FILE"

# Показываем результат
echo ""
echo "Preview of changes:"
diff -u "$INPUT_FILE" "$OUTPUT_FILE" || true
SCRIPT

chmod +x modify-nixos-step-by-step.sh
`

const sedPatternsSnippet = `
# ===================================================================
# ПОДРОБНОЕ ОБЪЯСНЕНИЕ ПАТТЕРНОВ
# ===================================================================

# АДРЕСАЦИЯ В sed
# ===================================================================

# Формат: адрес команда
# Адрес может быть:

1. Номер строки:
   5s/old/new/           # Строка 5
   5,10s/old/new/        # Строки 5-10
   5,$s/old/new/         # От строки 5 до конца
   $s/old/new/           # Последняя строка

2. Регулярное выражение:
   /pattern/s/old/new/   # Строки с pattern
   /start/,/end/s/old/new/  # От start до end

3. Комбинация:
   5,/pattern/s/old/new/ # От строки 5 до pattern
   /pattern/,10s/old/new/  # От pattern до строки 10

# ===================================================================
# БЛОЧНАЯ ОБРАБОТКА
# ===================================================================

# Найти блок между паттернами
/BEGIN/,/END/{
    # команды для строк между BEGIN и END
}

# Пример: работа с imports блоком
/imports = \\[/,/\\];/{
    # Все что между "imports = [" и "];"
    /\\];/ i\\
    ./custom.nix
}

# Объяснение:
# /imports = \\[/  - начало блока (экранируем [)
# ,                - до
# /\\];/           - конец блока (экранируем ])
# {...}            - команды для этого диапазона
# /\\];/           - внутри блока найти закрывающую скобку
# i\\              - вставить перед ней
# ./custom.nix     - эту строку

# ===================================================================
# КОМАНДЫ i, a, c
# ===================================================================

# i - insert (вставить ПЕРЕД)
/pattern/i\\
Inserted line

# a - append (добавить ПОСЛЕ)
/pattern/a\\
Appended line

# c - change (ЗАМЕНИТЬ всю строку)
/pattern/c\\
New line

# Важно! После i, a, c нужен обратный слэш и перенос строки

# ===================================================================
# РАБОТА С ГРУППАМИ ЗАХВАТА
# ===================================================================

# Базовый regex (нужно экранировать скобки)
sed 's/\\([0-9]*\\)-\\([0-9]*\\)/\\2-\\1/' file.txt

# Расширенный regex (скобки не экранируются)
sed -E 's/([0-9]+)-([0-9]+)/\\2-\\1/' file.txt

# Группы:
# \\( \\)  - базовый regex
# ( )      - расширенный regex (-E или -r)

# Обратные ссылки:
# \\1 - первая группа
# \\2 - второя группа
# & - вся совпавшая строка

# Пример:
echo "John Doe" | sed -E 's/([A-Z][a-z]+) ([A-Z][a-z]+)/\\2, \\1/'
# Вывод: Doe, John

# ===================================================================
# ФЛАГИ КОМАНДЫ s (substitute)
# ===================================================================

s/pattern/replacement/flags

# Флаги:
# g - global (все вхождения в строке)
# i - ignore case (игнорировать регистр)
# p - print (печатать если была замена)
# w file - write (записать в файл если была замена)
# N - заменить только N-е вхождение

# Примеры:
sed 's/old/new/g'          # Все вхождения
sed 's/old/new/gi'         # Все, игнорируя регистр
sed 's/old/new/2'          # Только второе
sed -n 's/old/new/p'       # Печатать только измененные
sed 's/old/new/w out.txt'  # Сохранить измененные в файл

# ===================================================================
# УСЛОВНАЯ ОБРАБОТКА
# ===================================================================

# Замена только если строка содержит другой паттерн
/condition/s/old/new/

# Пример: заменить foo→bar только в строках с "DEBUG"
/DEBUG/s/foo/bar/g

# Несколько условий
/DEBUG/,/INFO/{
    s/foo/bar/g
}

# ===================================================================
# МЕТКИ И ПЕРЕХОДЫ
# ===================================================================

# :label - создать метку
# b label - безусловный переход
# t label - переход если была замена
# T label - переход если НЕ было замены

# Пример: повторять замену пока есть изменения
:loop
s/foo/bar/
t loop

# Пример: добавить запятые в числа
:comma
s/\\([0-9]\\)\\([0-9]\\{3\\}\\)/\\1,\\2/
t comma
# 1000000 → 1,000,000

# ===================================================================
# HOLD SPACE И PATTERN SPACE
# ===================================================================

# Pattern space - текущая обрабатываемая строка
# Hold space - дополнительный буфер

# h - скопировать pattern → hold
# H - добавить pattern → hold
# g - скопировать hold → pattern
# G - добавить hold → pattern
# x - обменять pattern ↔ hold

# Пример: поменять местами строки
sed -n '1~2{h;n;p;g;p}'
# Меняет местами пары строк

# ===================================================================
# МНОГОСТРОЧНАЯ ОБРАБОТКА
# ===================================================================

# N - добавить следующую строку в pattern space
# D - удалить до первого \\n в pattern space
# P - печатать до первого \\n в pattern space

# Пример: объединить строки
sed ':a; N; $!ba; s/\\n/ /g'

# Разбор:
# :a        - метка 'a'
# N         - добавить следующую строку
# $!ba      - если не последняя строка, перейти к 'a'
# s/\\n/ /g  - заменить переносы на пробелы

# ===================================================================
# ПРАКТИЧЕСКИЕ ПАТТЕРНЫ
# ===================================================================

# Удалить строки между паттернами (включая границы)
sed '/START/,/END/d'

# Удалить строки между паттернами (НЕ включая границы)
sed '/START/,/END/{/START/!{/END/!d}}'

# Извлечь блок
sed -n '/START/,/END/p'

# Заменить в блоке
sed '/START/,/END/s/old/new/g'

# Добавить строку перед блоком
sed '/START/i\\
Before block'

# Добавить строку после блока
sed '/END/a\\
After block'
`

const nixosExplanationSnippet = `
# ===================================================================
# ДЕТАЛЬНОЕ ОБЪЯСНЕНИЕ МОДИФИКАЦИИ NIXOS CONFIG
# ===================================================================

# СТРУКТУРА ФАЙЛА amazon-image.nix
# ===================================================================

# Nix файл имеет структуру:
{ config, lib, pkgs, ... }:     # Аргументы функции
{                                # Начало атрибутов
  imports = [                    # Список импортов
    ../profiles/headless.nix
    ./ec2-data.nix
  ];

  services.openssh.settings.PermitRootLogin = "prohibit-password";

  systemd.services.fetch-ec2-metadata = {
    wantedBy = [ "multi-user.target" ];
    after = ["network-online.target"];
    path = [ pkgs.curl ];
    script = builtins.readFile ./ec2-metadata-fetcher.sh;
    serviceConfig.Type = "oneshot";
    serviceConfig.StandardOutput = "journal+console";
  };
}

# ===================================================================
# ЗАДАЧА 1: ДОБАВИТЬ ./custom.nix В IMPORTS
# ===================================================================

# Цель: получить
imports = [
  ../profiles/headless.nix
  ./ec2-data.nix
  ./custom.nix              # <-- ДОБАВИТЬ ЭТО
];

# Решение 1: Вставить перед закрывающей скобкой
sed '/imports = \\[/,/\\];/ {
    /\\];/ i\\
    ./custom.nix
}'

# Разбор:
# /imports = \\[/     - найти начало блока imports
#                      \\[ - экранируем [, т.к. [ - спецсимвол regex
# ,/\\];/             - до строки с ];
#                      \\] - экранируем ]
# {...}               - команды для этого диапазона
# /\\];/              - внутри диапазона найти ];
# i\\                 - вставить ПЕРЕД этой строкой
# ./custom.nix        - эту строку

# Решение 2: Добавить в конец списка
sed '/imports = \\[/,/\\];/ {
    /\\];/ s|\\];|  ./custom.nix\\n  ];|
}'

# Разбор:
# Все так же, но вместо i используем s (замену)
# s|старое|новое|  - заменяем ]; на ./custom.nix\\n  ];
#                    \\n - символ новой строки

# Решение 3: С автоматическим отступом
sed '/imports = \\[/,/\\];/ {
    /\\];/ {
        i\\
    ./custom.nix
    }
}'

# Важно: отступы в sed сохраняются как есть
# Если нужен правильный отступ (2 пробела), добавляем их в строке

# ===================================================================
# ЗАДАЧА 2: ИЗМЕНИТЬ PermitRootLogin
# ===================================================================

# Было:
services.openssh.settings.PermitRootLogin = "prohibit-password";

# Нужно:
services.openssh.settings.PermitRootLogin = "true";

# Решение 1: Простая замена всей строки
sed 's/services\\.openssh\\.settings\\.PermitRootLogin = "prohibit-password";/services.openssh.settings.PermitRootLogin = "true";/'

# Проблема: длинно и хрупко

# Решение 2: Замена только значения (лучше)
sed 's/\\(services\\.openssh\\.settings\\.PermitRootLogin = \\)"prohibit-password"/\\1"true"/'

# Разбор:
# \\(                  - начало группы захвата (базовый regex)
# services\\.openssh   - экранируем точки (\\.)
# \\.settings\\.       - точки - метасимволы в regex
# PermitRootLogin =
# \\)                  - конец группы захвата
# "prohibit-password"  - старое значение
# /                    - разделитель
# \\1                  - обратная ссылка на группу 1
# "true"               - новое значение

# С расширенным regex (проще):
sed -E 's/(services\\.openssh\\.settings\\.PermitRootLogin = )"prohibit-password"/\\1"true"/'

# Разбор:
# -E                   - включить расширенный regex (ERE)
# (...)                - группа (без экранирования)
# \\1                  - обратная ссылка

# Решение 3: Самое гибкое (любое старое значение)
sed -E 's/(services\\.openssh\\.settings\\.PermitRootLogin = )"[^"]*"/\\1"true"/'

# [^"]*  - любые символы кроме кавычки (любое значение)

# ===================================================================
# ЗАДАЧА 3: УДАЛИТЬ ПОСЛЕДНИЕ 2 serviceConfig ИЗ БЛОКА
# ===================================================================

# Было:
systemd.services.fetch-ec2-metadata = {
  wantedBy = [ "multi-user.target" ];
  after = ["network-online.target"];
  path = [ pkgs.curl ];
  script = builtins.readFile ./ec2-metadata-fetcher.sh;
  serviceConfig.Type = "oneshot";              # <-- УДАЛИТЬ
  serviceConfig.StandardOutput = "journal+console";  # <-- УДАЛИТЬ
};

# Нужно:
systemd.services.fetch-ec2-metadata = {
  wantedBy = [ "multi-user.target" ];
  after = ["network-online.target"];
  path = [ pkgs.curl ];
  script = builtins.readFile ./ec2-metadata-fetcher.sh;
};

# Сложность: нужно удалить ВНЕ ЗАВИСИМОСТИ от порядка

# Решение 1: Удалить конкретные строки
sed '/systemd\\.services\\.fetch-ec2-metadata = {/,/^[[:space:]]*};/ {
    /serviceConfig\\.Type/d
    /serviceConfig\\.StandardOutput/d
}'

# Разбор:
# /systemd\\.services\\.fetch-ec2-metadata = {/  - начало блока
# ,/^[[:space:]]*};/                             - до };
#     ^              - начало строки
#     [[:space:]]*   - любое количество пробелов
#     };             - закрывающая скобка
# {...}                                          - команды
# /serviceConfig\\.Type/d                        - удалить строку с Type
# /serviceConfig\\.StandardOutput/d              - удалить строку с StandardOutput

# Решение 2: С regex (более гибко)
sed -E '/systemd\\.services\\.fetch-ec2-metadata = \\{/,/^[[:space:]]*\\};/ {
    /serviceConfig\\.(Type|StandardOutput)/d
}'

# Разбор:
# -E                            - расширенный regex
# (Type|StandardOutput)         - Type ИЛИ StandardOutput
# d                             - удалить

# Решение 3: Удалить ЛЮБЫЕ два последних serviceConfig
# (Самый сложный вариант)

# Используем hold space для сохранения строк
sed '/systemd\\.services\\.fetch-ec2-metadata = {/,/};/{
    # Если строка содержит serviceConfig
    /serviceConfig\\./{
        H              # Добавить в hold space
        d              # Удалить из pattern space
    }
    # Когда дошли до закрывающей скобки
    /};/{
        x              # Обменять hold и pattern space
        # Удалить последние 2 строки из hold space
        s/\\(.*\\n.*\\n.*\\n.*\\)\\n.*\\n.*/\\1/
        p              # Печатать
        x              # Вернуть обратно
    }
}'

# Это сложно! Проще использовать решение 1 или 2.

# ===================================================================
# ПОЛНЫЙ РАБОЧИЙ ПРИМЕР
# ===================================================================

# Одна команда sed для всех задач:
sed -E '
# Задача 1: добавить ./custom.nix
/imports = \\[/,/\\];/ {
    /\\];/ i\\
    ./custom.nix
}

# Задача 2: изменить PermitRootLogin
s/(services\\.openssh\\.settings\\.PermitRootLogin = )"[^"]*"/\\1"true"/

# Задача 3: удалить serviceConfig строки
/systemd\\.services\\.fetch-ec2-metadata = \\{/,/^[[:space:]]*\\};/ {
    /serviceConfig\\.(Type|StandardOutput)/d
}
' amazon-image.nix > amazon-image-modified.nix

# Важные моменты:
# 1. -E для расширенного regex (проще синтаксис)
# 2. Многострочный скрипт sed (удобно читать)
# 3. Каждая задача - отдельный блок
# 4. Результат в новый файл (безопасно)
`

const sedTestingSnippet = `
# ===================================================================
# ТЕСТИРОВАНИЕ И ОТЛАДКА sed КОМАНД
# ===================================================================

# 1. ТЕСТИРОВАНИЕ НА МАЛЕНЬКОМ ПРИМЕРЕ
# ===================================================================

# Создаем тестовый файл
cat > test.nix << 'EOF'
{ config, lib, pkgs, ... }:
{
  imports = [
    ../profiles/headless.nix
    ./ec2-data.nix
  ];

  services.openssh.settings.PermitRootLogin = "prohibit-password";

  systemd.services.fetch-ec2-metadata = {
    wantedBy = [ "multi-user.target" ];
    after = ["network-online.target"];
    path = [ pkgs.curl ];
    script = builtins.readFile ./ec2-metadata-fetcher.sh;
    serviceConfig.Type = "oneshot";
    serviceConfig.StandardOutput = "journal+console";
  };
}
EOF

# 2. ПОСТЕПЕННОЕ ТЕСТИРОВАНИЕ
# ===================================================================

# Шаг 1: Проверить адресацию блока imports
sed -n '/imports = \\[/,/\\];/p' test.nix
# Должно показать только блок imports

# Шаг 2: Проверить вставку (без изменения файла)
sed '/imports = \\[/,/\\];/{
  /\\];/i\\
  ./custom.nix
}' test.nix

# Шаг 3: Проверить замену PermitRootLogin
sed -n 's/\\(services\\.openssh\\.settings\\.PermitRootLogin = \\)"prohibit-password"/\\1"true"/p' test.nix
# -n + p = показать только измененные строки

# Шаг 4: Проверить удаление serviceConfig
sed -n '/systemd\\.services\\.fetch-ec2-metadata = {/,/};/{
  /serviceConfig\\./d
  p
}' test.nix

# 3. ИСПОЛЬЗОВАНИЕ DIFF ДЛЯ ПРОВЕРКИ
# ===================================================================

# Создаем модифицированную версию
sed -E '
/imports = \\[/,/\\];/ {
    /\\];/ i\\
    ./custom.nix
}
s/(services\\.openssh\\.settings\\.PermitRootLogin = )"[^"]*"/\\1"true"/
/systemd\\.services\\.fetch-ec2-metadata = \\{/,/^[[:space:]]*\\};/ {
    /serviceConfig\\.(Type|StandardOutput)/d
}
' test.nix > test-modified.nix

# Смотрим что изменилось
diff -u test.nix test-modified.nix

# Ожидаемый вывод:
# --- test.nix
# +++ test-modified.nix
# @@ -3,10 +3,11 @@
#   imports = [
#     ../profiles/headless.nix
#     ./ec2-data.nix
# +    ./custom.nix
#   ];
#
# -  services.openssh.settings.PermitRootLogin = "prohibit-password";
# +  services.openssh.settings.PermitRootLogin = "true";
#
#   systemd.services.fetch-ec2-metadata = {
#     wantedBy = [ "multi-user.target" ];
# @@ -14,7 +15,5 @@
#     path = [ pkgs.curl ];
#     script = builtins.readFile ./ec2-metadata-fetcher.sh;
# -    serviceConfig.Type = "oneshot";
# -    serviceConfig.StandardOutput = "journal+console";
#   };
# }

# 4. ОТЛАДКА СЛОЖНЫХ КОМАНД
# ===================================================================

# Добавить verbose вывод (GNU sed)
sed --debug -E 'команды' file

# Показать что sed делает на каждом шаге
sed -n '
/pattern/{
  p
  q
}' file

# Использовать l команду для показа спецсимволов
sed -n 'l' file
# Показывает \\n, \\t и другие невидимые символы

# 5. ТИПИЧНЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ
# ===================================================================

# Проблема 1: Не работает i, a, c
# Причина: После команды нужен \\ и новая строка

# ❌ Неправильно:
sed '/pattern/i New line' file

# ✅ Правильно:
sed '/pattern/i\\
New line' file

# Или в одну строку (GNU sed):
sed '/pattern/i New line' file  # работает только в GNU sed

# -------------------------------------------------------------------

# Проблема 2: Экранирование точек
# Причина: . в regex означает "любой символ"

# ❌ Неправильно:
sed 's/file.txt/file.log/' file
# Совпадет с "fileXtxt"

# ✅ Правильно:
sed 's/file\\.txt/file.log/' file

# -------------------------------------------------------------------

# Проблема 3: Жадность regex
# По умолчанию .* жадный (максимальное совпадение)

echo '<tag>text</tag>' | sed 's/<.*>/REPLACED/'
# Вывод: REPLACED (удалило ВСЁ между первым < и последним >)

# Решение: использовать [^>]*
echo '<tag>text</tag>' | sed 's/<[^>]*>/REPLACED/g'
# Вывод: REPLACEDtext</tag> (только первый тег)

# -------------------------------------------------------------------

# Проблема 4: In-place редактирование не работает с пустым расширением

# ❌ Неправильно (MacOS):
sed -i 's/old/new/' file

# ✅ Правильно (MacOS):
sed -i '' 's/old/new/' file
# Пустые кавычки после -i

# ✅ Linux (GNU sed):
sed -i 's/old/new/' file
# Работает без расширения

# Кроссплатформенное решение:
sed -i.bak 's/old/new/' file && rm file.bak

# -------------------------------------------------------------------

# Проблема 5: Специальные символы в replacement

# Если replacement содержит &, нужно экранировать
sed 's/old/\\&new/' file
# Заменит old на &new (буквально)

# Если replacement содержит /, используйте другой разделитель
sed 's|/path/old|/path/new|' file

# 6. ВАЛИДАЦИЯ РЕЗУЛЬТАТА
# ===================================================================

# Проверить синтаксис Nix файла (если установлен nix)
nix-instantiate --parse test-modified.nix

# Или просто проверить парность скобок
awk '{
  for(i=1;i<=length($0);i++){
    c=substr($0,i,1)
    if(c=="{") level++
    if(c=="}") level--
  }
}
END {
  if(level==0) print "OK"
  else print "Error: unbalanced braces"
}' test-modified.nix

# 7. АВТОМАТИЧЕСКОЕ ТЕСТИРОВАНИЕ
# ===================================================================

cat > test-sed-script.sh << 'EOF'
#!/bin/bash

# Цвета для вывода
GREEN='\\033[0;32m'
RED='\\033[0;31m'
NC='\\033[0m' # No Color

# Тест 1: imports содержит ./custom.nix
if grep -q "./custom.nix" test-modified.nix; then
    echo -e "\${GREEN}✓\${NC} Test 1 passed: ./custom.nix added to imports"
else
    echo -e "\${RED}✗\${NC} Test 1 failed: ./custom.nix not found"
    exit 1
fi

# Тест 2: PermitRootLogin = "true"
if grep -q 'PermitRootLogin = "true"' test-modified.nix; then
    echo -e "\${GREEN}✓\${NC} Test 2 passed: PermitRootLogin changed to true"
else
    echo -e "\${RED}✗\${NC} Test 2 failed: PermitRootLogin not true"
    exit 1
fi

# Тест 3: serviceConfig.Type удален
if grep -q 'serviceConfig.Type' test-modified.nix; then
    echo -e "\${RED}✗\${NC} Test 3 failed: serviceConfig.Type still present"
    exit 1
else
    echo -e "\${GREEN}✓\${NC} Test 3 passed: serviceConfig.Type removed"
fi

# Тест 4: serviceConfig.StandardOutput удален
if grep -q 'serviceConfig.StandardOutput' test-modified.nix; then
    echo -e "\${RED}✗\${NC} Test 4 failed: serviceConfig.StandardOutput still present"
    exit 1
else
    echo -e "\${GREEN}✓\${NC} Test 4 passed: serviceConfig.StandardOutput removed"
fi

echo -e "\\n\${GREEN}All tests passed!\${NC}"
EOF

chmod +x test-sed-script.sh
./test-sed-script.sh
`

const sedInterviewSnippet = `
# ===================================================================
# ЧАСТЫЕ ВОПРОСЫ НА СОБЕСЕДОВАНИИ ПО sed
# ===================================================================

# 1. В чем разница между sed 's/old/new/' и sed 's/old/new/g'?
# Ответ:
# Без g - заменяется только ПЕРВОЕ вхождение в строке
# С g (global) - ВСЕ вхождения в строке

echo "foo foo foo" | sed 's/foo/bar/'
# Вывод: bar foo foo

echo "foo foo foo" | sed 's/foo/bar/g'
# Вывод: bar bar bar

# -------------------------------------------------------------------

# 2. Как заменить строку в файле "на месте" (in-place)?
# Ответ: sed -i

sed -i 's/old/new/g' file.txt        # Linux
sed -i '' 's/old/new/g' file.txt     # macOS
sed -i.bak 's/old/new/g' file.txt    # С бэкапом (кроссплатформенно)

# -------------------------------------------------------------------

# 3. Как удалить пустые строки из файла?
# Ответ:

sed '/^$/d' file.txt
# ^$ - regex для пустой строки (начало сразу за концом)

# Или пустые + whitespace-only:
sed '/^[[:space:]]*$/d' file.txt

# -------------------------------------------------------------------

# 4. В чем разница между sed и awk?
# Ответ:

# sed - Stream EDitor
# - Замены и трансформации
# - Работа со строками
# - Простые операции

# awk - Pattern scanning and processing
# - Работа с колонками
# - Вычисления и агрегация
# - Сложная логика

# Пример: для простой замены - sed
sed 's/old/new/g' file.txt

# Для работы с колонками - awk
awk '{print $1, $3}' file.txt

# -------------------------------------------------------------------

# 5. Как вывести только строки, где была замена?
# Ответ: sed -n с флагом p

sed -n 's/old/new/p' file.txt
# -n подавляет автоматический вывод
# p печатает только если была замена

# -------------------------------------------------------------------

# 6. Как удалить комментарии из файла?
# Ответ:

# Удалить строки, начинающиеся с #
sed '/^#/d' file.txt

# Удалить # и все после него
sed 's/#.*//' file.txt

# Комбо: удалить комментарии и пустые строки
sed 's/#.*//; /^$/d' file.txt

# -------------------------------------------------------------------

# 7. Как обработать диапазон строк?
# Ответ:

# По номерам строк:
sed '5,10s/old/new/' file.txt      # Строки 5-10
sed '5,$s/old/new/' file.txt       # От 5 до конца

# По паттернам:
sed '/START/,/END/s/old/new/' file.txt

# -------------------------------------------------------------------

# 8. Как вставить строку перед/после паттерна?
# Ответ:

# Вставить ПЕРЕД:
sed '/pattern/i\\
New line' file.txt

# Вставить ПОСЛЕ:
sed '/pattern/a\\
New line' file.txt

# -------------------------------------------------------------------

# 9. В чем разница между базовым и расширенным regex?
# Ответ:

# Базовый (BRE) - нужно экранировать метасимволы:
sed 's/\\([0-9]\\+\\)/NUM/' file.txt

# Расширенный (ERE) - не нужно экранировать:
sed -E 's/([0-9]+)/NUM/' file.txt

# Метасимволы: + ? | () {}

# -------------------------------------------------------------------

# 10. Как заменить текст в блоке между маркерами?
# Ответ:

sed '/BEGIN/,/END/{
  /BEGIN/!{
    /END/!{
      s/old/new/g
    }
  }
}' file.txt

# Объяснение:
# /BEGIN/,/END/  - диапазон от BEGIN до END
# /BEGIN/!       - НЕ на строке BEGIN
# /END/!         - НЕ на строке END
# s/old/new/g    - замена

# -------------------------------------------------------------------

# 11. Как поменять местами два слова?
# Ответ: группы захвата

sed -E 's/([a-z]+) ([a-z]+)/\\2 \\1/' file.txt
# hello world → world hello

# -------------------------------------------------------------------

# 12. Как обработать несколько файлов?
# Ответ:

# Простой способ:
for file in *.txt; do
  sed -i 's/old/new/g' "$file"
done

# С xargs:
find . -name "*.txt" -print0 | xargs -0 sed -i 's/old/new/g'

# -------------------------------------------------------------------

# 13. Как удалить trailing whitespace?
# Ответ:

sed 's/[[:space:]]*$//' file.txt
# [[:space:]]* - любые пробельные символы
# $ - конец строки

# -------------------------------------------------------------------

# 14. Как добавить строку в начало файла?
# Ответ:

sed '1i\\
New first line' file.txt

# Или:
sed -i '1s/^/New first line\\n/' file.txt

# -------------------------------------------------------------------

# 15. Как проверить результат перед изменением файла?
# Ответ:

# Сначала без -i (вывод в терминал)
sed 's/old/new/g' file.txt

# Потом с -i и бэкапом
sed -i.bak 's/old/new/g' file.txt

# Проверить diff
diff file.txt.bak file.txt

# Если OK, удалить бэкап
rm file.txt.bak
`

const highlightedSedBasics = ref('')
const highlightedSedAdvanced = ref('')
const highlightedNixosConfig = ref('')
const highlightedNixosScript = ref('')
const highlightedSedPatterns = ref('')
const highlightedNixosExplanation = ref('')
const highlightedSedTesting = ref('')
const highlightedSedInterview = ref('')

onMounted(() => {
  highlightedSedBasics.value = Prism.highlight(sedBasicsSnippet, Prism.languages.bash, 'bash')
  highlightedSedAdvanced.value = Prism.highlight(sedAdvancedSnippet, Prism.languages.bash, 'bash')
  highlightedNixosConfig.value = Prism.highlight(nixosConfigSnippet, Prism.languages.bash, 'bash')
  highlightedNixosScript.value = Prism.highlight(nixosModificationScriptSnippet, Prism.languages.bash, 'bash')
  highlightedSedPatterns.value = Prism.highlight(sedPatternsSnippet, Prism.languages.bash, 'bash')
  highlightedNixosExplanation.value = Prism.highlight(nixosExplanationSnippet, Prism.languages.bash, 'bash')
  highlightedSedTesting.value = Prism.highlight(sedTestingSnippet, Prism.languages.bash, 'bash')
  highlightedSedInterview.value = Prism.highlight(sedInterviewSnippet, Prism.languages.bash, 'bash')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              sed — мощный редактор потоков для модификации текста
            </h1>

            <p class="font-weight-regular mb-6">
              <b>sed (Stream EDitor)</b> — это утилита Unix для редактирования текста в потоке.
              Основное применение: замена текста, удаление строк, вставка содержимого, трансформация данных.
              sed обрабатывает файлы построчно, что делает его идеальным для автоматизации изменений
              в конфигурационных файлах, логах и исходном коде.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы sed</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-swap-horizontal</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Замена (s)</h3>
                  <p class="text-body-2">Substitute - основная команда sed для замены текста</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-delete</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Удаление (d)</h3>
                  <p class="text-body-2">Delete - удаление строк по паттерну или номеру</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-text-box-plus</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Вставка (i/a)</h3>
                  <p class="text-body-2">Insert/Append - добавление строк до или после паттерна</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSedBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники sed</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSedAdvanced"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практическая задача: Модификация NixOS конфигурации</h2>

            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Задача:</strong> Модифицировать файл amazon-image.nix:
              <ul class="mt-2 pl-4">
                <li>Добавить <code>./custom.nix</code> в блок imports</li>
                <li>Заменить <code>PermitRootLogin = "prohibit-password"</code> на <code>"true"</code></li>
                <li>Удалить последние 2 параметра из <code>systemd.services.fetch-ec2-metadata</code></li>
              </ul>
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">Исходный конфигурационный файл</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNixosConfig"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Bash скрипт для модификации</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNixosScript"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Детальное объяснение sed паттернов</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSedPatterns"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Подробный разбор модификации NixOS конфига</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNixosExplanation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Тестирование и отладка sed команд</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSedTesting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSedInterview"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение sed с альтернативами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Инструмент</th>
                <th class="text-left font-weight-bold">Лучше для</th>
                <th class="text-left font-weight-bold">Хуже для</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>sed</b></td>
                <td>Замены, удаления, потоковая обработка</td>
                <td>Сложная логика, вычисления</td>
                <td><code>sed 's/old/new/g'</code></td>
              </tr>
              <tr>
                <td><b>awk</b></td>
                <td>Работа с колонками, вычисления</td>
                <td>In-place редактирование</td>
                <td><code>awk '{print $1}'</code></td>
              </tr>
              <tr>
                <td><b>grep</b></td>
                <td>Поиск и фильтрация</td>
                <td>Замены, модификация</td>
                <td><code>grep "pattern"</code></td>
              </tr>
              <tr>
                <td><b>perl</b></td>
                <td>Сложные regex, Unicode</td>
                <td>Простые задачи (overkill)</td>
                <td><code>perl -pe 's/old/new/g'</code></td>
              </tr>
              <tr>
                <td><b>tr</b></td>
                <td>Посимвольная замена</td>
                <td>Контекстные замены</td>
                <td><code>tr 'a-z' 'A-Z'</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Шпаргалка по sed командам</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Основные команды</h3>
                  <ul class="pl-4">
                    <li><code>s/old/new/</code> — замена</li>
                    <li><code>d</code> — удаление</li>
                    <li><code>p</code> — печать</li>
                    <li><code>i\</code> — вставить до</li>
                    <li><code>a\</code> — добавить после</li>
                    <li><code>c\</code> — заменить строку</li>
                    <li><code>n</code> — следующая строка</li>
                    <li><code>q</code> — выход</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Флаги</h3>
                  <ul class="pl-4">
                    <li><code>-n</code> — подавить вывод</li>
                    <li><code>-e</code> — несколько команд</li>
                    <li><code>-i</code> — in-place</li>
                    <li><code>-E/-r</code> — расширенный regex</li>
                    <li><code>-f</code> — скрипт из файла</li>
                    <li><code>g</code> — глобальная замена</li>
                    <li><code>i</code> — игнорировать регистр</li>
                    <li><code>p</code> — печатать при замене</li>
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
                    <li>Тестировать без -i сначала</li>
                    <li>Создавать бэкапы (-i.bak)</li>
                    <li>Использовать -E для читаемости</li>
                    <li>Документировать сложные команды</li>
                    <li>Проверять результаты через diff</li>
                    <li>Экранировать спецсимволы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>sed -i без бэкапа в продакшене</li>
                    <li>Сложные многострочные скрипты</li>
                    <li>Забывать про жадность regex</li>
                    <li>Игнорировать платформенные различия</li>
                    <li>Обработку бинарных файлов</li>
                    <li>Использовать когда проще perl/awk</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте другие разделители (|, #)</li>
                    <li>Комбинируйте с grep, awk</li>
                    <li>Изучите базовый vs расширенный regex</li>
                    <li>Практикуйтесь на реальных файлах</li>
                    <li>Создавайте библиотеку скриптов</li>
                    <li>Читайте man sed</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>sed</b> — мощный инструмент для потоковой обработки и модификации текста.
              Основные возможности: замена текста (s), удаление строк (d), вставка содержимого (i/a/c),
              работа с блоками и диапазонами. Практическая задача с модификацией NixOS конфигурации
              демонстрирует реальное применение sed: добавление импортов, изменение параметров и
              удаление строк из блоков. Знание sed критически важно для DevOps, системного
              администрирования и автоматизации задач. Комбинация sed с другими Unix-утилитами
              (grep, awk, tail) создает мощные конвейеры обработки данных.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.gnu.org/software/sed/manual/"
                target="_blank"
                class="mr-2">
                GNU sed Manual
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/virtualisation/amazon-image.nix"
                target="_blank">
                NixOS amazon-image.nix
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
