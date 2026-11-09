import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/ops/ops-grep-awk-tail-grepbasicssnippet.txt?raw'
import example2 from '../snippets/ops/ops-grep-awk-tail-greppracticalsnippet.txt?raw'
import example3 from '../snippets/ops/ops-grep-awk-tail-awkbasicssnippet.txt?raw'
import example4 from '../snippets/ops/ops-grep-awk-tail-awkpracticalsnippet.txt?raw'
import example5 from '../snippets/ops/ops-grep-awk-tail-tailbasicssnippet.txt?raw'
import example6 from '../snippets/ops/ops-grep-awk-tail-tailpracticalsnippet.txt?raw'
import example7 from '../snippets/ops/ops-grep-awk-tail-systeminfoscriptsnippet.txt?raw'
import example8 from '../snippets/ops/ops-grep-awk-tail-scriptexplanationsnippet.txt?raw'
import example9 from '../snippets/ops/ops-grep-awk-tail-combinedexamplessnippet.txt?raw'
import example10 from '../snippets/ops/ops-grep-awk-tail-interviewquestionssnippet.txt?raw'
import example11 from '../snippets/ops/ops-grep-awk-tail-performancesnippet.txt?raw'

// Content copied verbatim from src/views/ops/GrepAwkTail.vue.
export default {
  ...articleSummaries.opsGrepAwkTail,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**grep, awk и tail** — это три фундаментальных команды Unix/Linux для работы с текстовыми данными. **grep** ищет паттерны, **awk** обрабатывает структурированный текст по колонкам, **tail** показывает последние строки и следит за файлами в реальном времени. Их комбинация — основа эффективного анализа логов и отладки.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'grep — поиск паттернов в тексте',
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
                  text: 'Основные возможности',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Поиск** текста в файлах\n- **Регулярные выражения**\n- **Рекурсивный** поиск\n- **Инверсия** результатов\n- **Контекст** вокруг совпадений',
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
                  text: 'Применение',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Поиск ошибок в логах\n- Анализ кодовой базы\n- Фильтрация вывода команд\n- Поиск конфигураций\n- Извлечение данных',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-9',
          type: 'heading',
          level: 3,
          text: 'Основы grep',
        },
        {
          id: 'code-10',
          type: 'code',
          language: 'bash',
          code: example1,
        },
        {
          id: 'heading-11',
          type: 'heading',
          level: 3,
          text: 'Практические примеры grep',
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
      id: 'section-2',
      title: 'awk — обработка структурированного текста',
      blocks: [
        {
          id: 'cards-13',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: 'Основные возможности',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    '- **Работа** с колонками\n- **Математика** и вычисления\n- **Условная** обработка\n- **Форматирование** вывода\n- **Агрегация** данных',
                },
              ],
            },
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    '- Парсинг логов и CSV\n- Статистика и аналитика\n- Трансформация данных\n- Генерация отчетов\n- Фильтрация по условиям',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-20',
          type: 'heading',
          level: 3,
          text: 'Основы awk',
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'bash',
          code: example3,
        },
        {
          id: 'heading-22',
          type: 'heading',
          level: 3,
          text: 'Практические примеры awk',
        },
        {
          id: 'code-23',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'tail — просмотр конца файлов',
      blocks: [
        {
          id: 'cards-24',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-25',
              blocks: [
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 3,
                  text: 'Основные возможности',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- **Последние** N строк\n- **Реальное время** (tail \\-f)\n- **Несколько** файлов\n- **Пропуск** первых строк\n- **Байты** вместо строк',
                },
              ],
            },
            {
              id: 'card-28',
              blocks: [
                {
                  id: 'heading-29',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- Мониторинг логов\n- Отладка приложений\n- Просмотр последних событий\n- Следить за деплоями\n- Анализ в реальном времени',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-31',
          type: 'heading',
          level: 3,
          text: 'Основы tail',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'bash',
          code: example5,
        },
        {
          id: 'heading-33',
          type: 'heading',
          level: 3,
          text: 'Практические примеры tail',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'bash',
          code: example6,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Практическая задача: Информация о системе',
      blocks: [
        {
          id: 'callout-35',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-36',
              type: 'prose',
              markdown:
                '**Задача:** Создать bash\\-скрипт, который извлекает и записывает информацию о системе в формате "CPU: \\*\\*\\*\\*\\*\\* Kernel: \\*\\*\\*\\*\\* Date: \\*\\*\\*\\*\\*"',
            },
          ],
        },
        {
          id: 'cards-37',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-38',
              blocks: [
                {
                  id: 'heading-39',
                  type: 'heading',
                  level: 3,
                  text: 'CPU',
                },
                {
                  id: 'text-40',
                  type: 'prose',
                  markdown: 'Модель процессора из /proc/cpuinfo',
                },
              ],
            },
            {
              id: 'card-41',
              blocks: [
                {
                  id: 'heading-42',
                  type: 'heading',
                  level: 3,
                  text: 'Kernel',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown: 'Версия ядра Linux (uname \\-r)',
                },
              ],
            },
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'heading-45',
                  type: 'heading',
                  level: 3,
                  text: 'Date',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: 'Дата компиляции ядра (uname \\-v)',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-47',
          type: 'heading',
          level: 3,
          text: 'Полный скрипт с разными подходами',
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'bash',
          code: example7,
        },
        {
          id: 'heading-49',
          type: 'heading',
          level: 3,
          text: 'Подробное объяснение компонентов',
        },
        {
          id: 'code-50',
          type: 'code',
          language: 'bash',
          code: example8,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Таблица команд для извлечения системной информации',
      blocks: [
        {
          id: 'table-51',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Информация',
            },
            {
              id: 'column-2',
              label: 'Команда',
            },
            {
              id: 'column-3',
              label: 'Обработка',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '**CPU модель**',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '`/proc/cpuinfo`',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`grep "model name" | head -n 1 | awk -F: \'{print $2}\'`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '**Количество ядер**',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '`/proc/cpuinfo`',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`grep -c processor`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '**Версия ядра**',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '`uname -r`',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'Прямой вывод',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '**Дата ядра**',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '`uname -v`',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: "`awk '{print $3, $4, $5, $6, $7}'`",
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '**Архитектура**',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '`uname -m`',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: 'x86\\_64, arm64, etc.',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '**OS версия**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '`/etc/os-release`',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: "`grep PRETTY_NAME | awk -F= '{print $2}'`",
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '**Hostname**',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '`hostname`',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Прямой вывод',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '**Uptime**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: '`uptime`',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: "`awk '{print $3, $4}'`",
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '**RAM**',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: '`free -h`',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: "`awk '/^Mem:/ {print $2}'`",
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '**Disk space**',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '`df -h`',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: "`awk '/\\\\/$/ {print $4}'`",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Комбинированные примеры grep + awk + tail',
      blocks: [
        {
          id: 'code-82',
          type: 'code',
          language: 'bash',
          code: example9,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'code-83',
          type: 'code',
          language: 'bash',
          code: example10,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'code-84',
          type: 'code',
          language: 'bash',
          code: example11,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Шпаргалка по флагам',
      blocks: [
        {
          id: 'cards-85',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-86',
              title: 'grep флаги',
              blocks: [
                {
                  id: 'text-87',
                  type: 'prose',
                  markdown:
                    '- `-i` — игнорировать регистр\n- `-v` — инверсия (NOT)\n- `-r` — рекурсивно\n- `-n` — номера строк\n- `-c` — количество\n- `-l` — только имена файлов\n- `-w` — целые слова\n- `-E` — расширенный regex\n- `-A N` — N строк после\n- `-B N` — N строк до\n- `-C N` — N строк до и после',
                },
              ],
            },
            {
              id: 'card-88',
              title: 'awk переменные',
              blocks: [
                {
                  id: 'text-89',
                  type: 'prose',
                  markdown:
                    '- `$0` — вся строка\n- `$1, $2...` — колонки\n- `$NF` — последняя колонка\n- `NF` — количество полей\n- `NR` — номер строки\n- `FS` — разделитель полей\n- `OFS` — выходной разделитель\n- `RS` — разделитель записей\n- `ORS` — выходной разделитель\n- `FILENAME` — имя файла',
                },
              ],
            },
            {
              id: 'card-90',
              title: 'tail флаги',
              blocks: [
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- `-n N` — N строк\n- `-N` — короткая форма\n- `-f` — follow (следить)\n- `-c N` — N байт\n- `-n +N` — с N\\-й строки\n- `-q` — без заголовков\n- `-v` — с заголовками\n- `--pid=PID` — до завершения процесса\n- `-s N` — интервал проверки',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-92',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-93',
              blocks: [
                {
                  id: 'heading-94',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-95',
                  type: 'prose',
                  markdown:
                    '- Комбинировать команды через pipes\n- Использовать \\-n для grep (номера строк)\n- Тестировать regex на маленьких файлах\n- Использовать tail \\-f для мониторинга\n- Применять awk для структурированных данных\n- Сохранять полезные команды в алиасы',
                },
              ],
            },
            {
              id: 'card-96',
              blocks: [
                {
                  id: 'heading-97',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- grep на бинарных файлах\n- Сложные regex без тестирования\n- awk там где достаточно grep\n- Забывать про экранирование\n- Игнорировать производительность\n- Лишние cat в начале pipe',
                },
              ],
            },
            {
              id: 'card-99',
              blocks: [
                {
                  id: 'heading-100',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown:
                    '- Изучите основы regex\n- Используйте man pages\n- Практикуйтесь на реальных логах\n- Создавайте bash функции\n- Документируйте сложные команды\n- Используйте современные альтернативы (ripgrep)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Современные альтернативы',
      blocks: [
        {
          id: 'table-102',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Традиционная',
            },
            {
              id: 'column-2',
              label: 'Современная',
            },
            {
              id: 'column-3',
              label: 'Преимущества',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-103',
                    type: 'prose',
                    markdown: '`grep`',
                  },
                ],
                [
                  {
                    id: 'text-104',
                    type: 'prose',
                    markdown: '`ripgrep (rg)`',
                  },
                ],
                [
                  {
                    id: 'text-105',
                    type: 'prose',
                    markdown: 'В 10\\-100 раз быстрее, умнее игнорирует файлы, лучший вывод',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-106',
                    type: 'prose',
                    markdown: '`awk`',
                  },
                ],
                [
                  {
                    id: 'text-107',
                    type: 'prose',
                    markdown: '`miller (mlr)`',
                  },
                ],
                [
                  {
                    id: 'text-108',
                    type: 'prose',
                    markdown: 'CSV/JSON/XML поддержка, более простой синтаксис',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-109',
                    type: 'prose',
                    markdown: '`tail -f`',
                  },
                ],
                [
                  {
                    id: 'text-110',
                    type: 'prose',
                    markdown: '`multitail`',
                  },
                ],
                [
                  {
                    id: 'text-111',
                    type: 'prose',
                    markdown: 'Несколько окон, цвета, фильтрация',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: '`grep + tail`',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: '`lnav`',
                  },
                ],
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: 'Интерактивный просмотр логов, автоматическое распознавание форматов',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: '`awk для JSON`',
                  },
                ],
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: '`jq`',
                  },
                ],
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: 'Специализирован для JSON, мощные фильтры',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Итог',
      blocks: [
        {
          id: 'text-118',
          type: 'prose',
          markdown:
            '**grep, awk и tail** — это must\\-have инструменты для любого разработчика и DevOps инженера. **grep** находит паттерны, **awk** обрабатывает структурированные данные, **tail** следит за логами в реальном времени. Их комбинация через pipes создает мощные конвейеры обработки данных. Практическая задача с извлечением информации о системе демонстрирует типичное использование этих команд в production\\-окружении. Освоение этих инструментов значительно повышает эффективность работы и является обязательным для технических собеседований.',
        },
        {
          id: 'resources-119',
          type: 'resources',
          items: [
            {
              id: 'link-120',
              label: 'AWK Manual',
              url: 'https://www.gnu.org/software/gawk/manual/',
            },
          ],
        },
        {
          id: 'resources-121',
          type: 'resources',
          items: [
            {
              id: 'link-122',
              label: 'Ripgrep (modern grep)',
              url: 'https://github.com/BurntSushi/ripgrep',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
