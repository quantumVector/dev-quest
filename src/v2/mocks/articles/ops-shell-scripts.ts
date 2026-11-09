import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/ops/ops-shell-scripts-basicsyntaxsnippet.txt?raw'
import example2 from '../snippets/ops/ops-shell-scripts-variablessnippet.txt?raw'
import example3 from '../snippets/ops/ops-shell-scripts-conditionalsnippet.txt?raw'
import example4 from '../snippets/ops/ops-shell-scripts-loopssnippet.txt?raw'
import example5 from '../snippets/ops/ops-shell-scripts-argumentssnippet.txt?raw'
import example6 from '../snippets/ops/ops-shell-scripts-functionssnippet.txt?raw'
import example7 from '../snippets/ops/ops-shell-scripts-markdowntablesnippet.txt?raw'
import example8 from '../snippets/ops/ops-shell-scripts-practicalexamplessnippet.txt?raw'
import example9 from '../snippets/ops/ops-shell-scripts-bestpracticessnippet.txt?raw'

// Content copied verbatim from src/views/ops/ShellScripts.vue.
export default {
  ...articleSummaries.opsShellScripts,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Shell\\-скрипты** — это программы для автоматизации задач в Unix/Linux системах. Bash (Bourne Again Shell) — самый популярный shell для написания скриптов. Понимание переменных, условий, циклов и функций критично для DevOps, CI/CD и автоматизации.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Базовый синтаксис',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'Основы',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- `#!/bin/bash` — shebang, указывает интерпретатор\n- `#` — комментарии\n- `;` — разделитель команд\n- `\\` — перенос строки\n- `$()` — подстановка команд',
                },
              ],
            },
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'Выполнение',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- `bash script.sh` — запуск через bash\n- `chmod +x script.sh` — сделать исполняемым\n- `./script.sh` — запуск напрямую\n- `source script.sh` — в текущем shell',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'bash',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Переменные',
      blocks: [
        {
          id: 'callout-10',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-11',
              type: 'prose',
              markdown:
                '**Важно:** В bash НЕ должно быть пробелов вокруг знака = при присваивании! `VAR="value"` правильно, `VAR = "value"` вызовет ошибку.',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Специальные переменные',
      blocks: [
        {
          id: 'table-13',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Переменная',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '`$0`',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Имя скрипта',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '`./script.sh`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '`$1, $2, ...`',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Позиционные аргументы',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Первый, второй аргумент',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '`$@`',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Все аргументы (массив)',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '`"arg1" "arg2"`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '`$*`',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Все аргументы (строка)',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '`"arg1 arg2"`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`$#`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Количество аргументов',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '`2`',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '`$?`',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Код возврата последней команды',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`0` (success)',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`$$`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'PID текущего процесса',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '`12345`',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`$!`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'PID последнего фонового процесса',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`12346`',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Условные конструкции',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'bash',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Операторы сравнения',
      blocks: [
        {
          id: 'cards-39',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-40',
              title: 'Числовые',
              blocks: [
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    '- `-eq` — равно (equal)\n- `-ne` — не равно (not equal)\n- `-gt` — больше (greater than)\n- `-ge` — больше или равно\n- `-lt` — меньше (less than)\n- `-le` — меньше или равно',
                },
              ],
            },
            {
              id: 'card-42',
              title: 'Строковые',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- `=` или `==` — равно\n- `!=` — не равно\n- `-z` — пустая строка\n- `-n` — непустая строка\n- `<` — меньше (лексикографически)\n- `>` — больше (лексикографически)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Циклы',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Аргументы командной строки',
      blocks: [
        {
          id: 'code-45',
          type: 'code',
          language: 'bash',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Функции',
      blocks: [
        {
          id: 'code-46',
          type: 'code',
          language: 'bash',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Решение задачи: Markdown Table Generator',
      blocks: [
        {
          id: 'callout-47',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-48',
              type: 'prose',
              markdown:
                '**Задача:** Создать bash\\-скрипт, который принимает количество строк и столбцов в качестве аргументов и генерирует таблицу в формате Markdown. Если аргументы не указаны, создаётся таблица 5×5.',
            },
          ],
        },
        {
          id: 'code-49',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Практические примеры',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'bash',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики и частые ошибки',
      blocks: [
        {
          id: 'code-51',
          type: 'code',
          language: 'bash',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-52',
          type: 'prose',
          markdown:
            '1. **В чем разница между \\[\\] и \\[\\[\\]\\]?**\n   \n   `[]` — POSIX\\-совместимый тест, работает везде. `[[]]` — bash\\-специфичный, поддерживает regex, логические операторы &amp;&amp;/||, безопаснее (не требует кавычек), но не работает в sh. Используйте `[[]]` в bash\\-скриптах.\n2. **Как передать массив в функцию?**\n   \n   Передавайте элементы как отдельные аргументы: `my_func "\\${array[@]}"`. Внутри функции восстанавливайте: `local arr=("$@")`. Или используйте nameref в bash 4.3\\+: `local -n arr=$1`\n3. **Что делает set \\-e и set \\-u?**\n   \n   `set -e` — останавливает скрипт при ошибке любой команды (exit code != 0). `set -u` — ошибка при использовании неопределённой переменной. `set -o pipefail` — ошибка в pipe если любая команда провалилась.\n4. **В чем разница между $@ и $\\*?**\n   \n   `"$@"` — каждый аргумент как отдельная строка `"arg1" "arg2"`. `"$*"` — все аргументы как одна строка `"arg1 arg2"`. Всегда используйте `"$@"` для корректной обработки аргументов с пробелами.\n5. **Как прочитать файл построчно?**\n   \n   `while IFS= read -r line; do echo "$line"; done < file.txt`  \n   `IFS=` сохраняет пробелы, `-r` отключает экранирование backslash.\n6. **Как безопасно работать с именами файлов, содержащими пробелы?**\n   \n   Всегда используйте кавычки: `cat "$file"`, а не `cat $file`. В циклах: `for file in *.txt; do echo "$file"; done`',
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Полезные инструменты',
      blocks: [
        {
          id: 'cards-53',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-54',
              title: 'Линтеры и валидация',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- `shellcheck` — линтер для shell\n- `shfmt` — форматирование\n- `bash -n script.sh` — проверка синтаксиса\n- `bash -x script.sh` — debug режим',
                },
              ],
            },
            {
              id: 'card-56',
              title: 'Тестирование',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- `bats` — Bash Automated Testing System\n- `shunit2` — unit тесты\n- `assert.sh` — assertions\n- Mock/stub frameworks',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'Документация',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- `man bash` — полное руководство\n- `help command` — встроенная помощь\n- `tldr command` — краткие примеры\n- `explainshell.com` — объяснение команд',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Сравнение синтаксиса',
      blocks: [
        {
          id: 'table-60',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Концепция',
            },
            {
              id: 'column-2',
              label: 'Старый синтаксис',
            },
            {
              id: 'column-3',
              label: 'Современный синтаксис',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Подстановка команд',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`` `command` ``',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '`$(command)`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Тест условия',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '`[ condition ]`',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '`[[ condition ]]`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: 'Арифметика',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '`expr $a + $b`',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`$((a + b))`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Локальные переменные',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Не поддерживалось',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '`local var="value"`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Массивы',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Не поддерживалось',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`arr=("a" "b")`',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Exit коды',
      blocks: [
        {
          id: 'table-76',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Код',
            },
            {
              id: 'column-2',
              label: 'Значение',
            },
            {
              id: 'column-3',
              label: 'Использование',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '`0`',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Успех',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: 'Команда выполнена успешно',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '`1`',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Общая ошибка',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Стандартная ошибка',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '`2`',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Ошибка использования',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Неверные аргументы',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: '`126`',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Не исполняемый',
                  },
                ],
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Нет прав на выполнение',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: '`127`',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Команда не найдена',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Команда отсутствует',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: '`128+N`',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Сигнал',
                  },
                ],
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Завершение по сигналу N',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Итог',
      blocks: [
        {
          id: 'text-95',
          type: 'prose',
          markdown:
            '**Shell\\-скрипты** — мощный инструмент автоматизации в Unix/Linux системах. Понимание переменных (специальных и обычных), условных конструкций (if/case), циклов (for/while/until), аргументов командной строки и функций необходимо для эффективной работы с DevOps, CI/CD и системным программированием. Следование лучшим практикам (строгий режим, кавычки, проверка ошибок) делает скрипты надежными и поддерживаемыми.',
        },
        {
          id: 'resources-96',
          type: 'resources',
          items: [
            {
              id: 'link-97',
              label: 'ShellCheck Online',
              url: 'https://www.shellcheck.net/',
            },
          ],
        },
        {
          id: 'resources-98',
          type: 'resources',
          items: [
            {
              id: 'link-99',
              label: 'Bash Cheatsheet',
              url: 'https://devhints.io/bash',
            },
          ],
        },
        {
          id: 'resources-100',
          type: 'resources',
          items: [
            {
              id: 'link-101',
              label: 'Bash Manual',
              url: 'https://www.gnu.org/software/bash/manual/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
