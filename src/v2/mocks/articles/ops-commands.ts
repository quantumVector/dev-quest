import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/ops/ops-commands-pwdsnippet.txt?raw'
import example2 from '../snippets/ops/ops-commands-echosnippet.txt?raw'
import example3 from '../snippets/ops/ops-commands-catsnippet.txt?raw'
import example4 from '../snippets/ops/ops-commands-lssnippet.txt?raw'
import example5 from '../snippets/ops/ops-commands-pipessnippet.txt?raw'
import example6 from '../snippets/ops/ops-commands-redirectionsnippet.txt?raw'
import example7 from '../snippets/ops/ops-commands-practicalexamplessnippet.txt?raw'
import example8 from '../snippets/ops/ops-commands-combinedexamplessnippet.txt?raw'

// Content copied verbatim from src/views/ops/OpsCommands.vue.
export default {
  ...articleSummaries.opsOpsCommands,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Базовые команды терминала** — это фундамент для работы с Linux/Unix системами, Docker, CI/CD и DevOps. Понимание pwd, echo, cat, ls и pipes критически важно для эффективной разработки и деплоя приложений.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'pwd — Print Working Directory',
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
                  text: 'Назначение',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Показывает текущую директорию**\n- Абсолютный путь от корня\n- Полезно в скриптах\n- Незаменимо в Docker',
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
                    '- Docker volume монтирование\n- Определение пути в скриптах\n- Отладка местоположения\n- CI/CD конфигурация',
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
      title: 'echo — вывод текста',
      blocks: [
        {
          id: 'cards-10',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: 'Назначение',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown:
                    '- **Вывод текста в терминал**\n- Работа с переменными\n- Создание файлов\n- Debug информация',
                },
              ],
            },
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    '- Логирование в скриптах\n- Создание конфиг\\-файлов\n- Вывод переменных окружения\n- Отладочные сообщения',
                },
              ],
            },
          ],
        },
        {
          id: 'code-17',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'cat — чтение и объединение файлов',
      blocks: [
        {
          id: 'cards-18',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-19',
              blocks: [
                {
                  id: 'heading-20',
                  type: 'heading',
                  level: 3,
                  text: 'Назначение',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown:
                    '- **Вывод содержимого файлов**\n- Объединение файлов\n- Создание файлов\n- Просмотр логов',
                },
              ],
            },
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- Просмотр конфигов\n- Чтение package.json\n- Анализ логов\n- Создание SQL скриптов',
                },
              ],
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'bash',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'ls — список файлов и директорий',
      blocks: [
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              blocks: [
                {
                  id: 'heading-28',
                  type: 'heading',
                  level: 3,
                  text: 'Назначение',
                },
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown:
                    '- **Просмотр содержимого**\n- Информация о файлах\n- Права доступа\n- Размеры файлов',
                },
              ],
            },
            {
              id: 'card-30',
              blocks: [
                {
                  id: 'heading-31',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- Проверка структуры проекта\n- Поиск файлов\n- Анализ размеров\n- Проверка прав доступа',
                },
              ],
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Флаги команды ls',
      blocks: [
        {
          id: 'table-34',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Флаг',
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
                    id: 'text-35',
                    type: 'prose',
                    markdown: '`-l`',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Подробный формат (права, владелец, размер)',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`ls -l`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`-a`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Показать скрытые файлы (.git, .env)',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '`ls -a`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '`-h`',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Человекочитаемые размеры (KB, MB)',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '`ls -lh`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '`-t`',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Сортировка по времени изменения',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '`ls -lt`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '`-r`',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Обратный порядок сортировки',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '`ls -ltr`',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '`-R`',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Рекурсивный просмотр',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '`ls -R`',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '`-S`',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Сортировка по размеру',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '`ls -lS`',
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
      title: 'Pipes (|) — конвейеры команд',
      blocks: [
        {
          id: 'callout-56',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-57',
              type: 'prose',
              markdown:
                '**Мощь Unix:** Pipes позволяют соединять простые команды в сложные конвейеры обработки данных',
            },
          ],
        },
        {
          id: 'cards-58',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: 'Как работает',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Вывод первой команды → Ввод второй\n- Можно цепочками\n- Каждая команда фильтрует данные\n- Мощный инструмент анализа',
                },
              ],
            },
            {
              id: 'card-62',
              blocks: [
                {
                  id: 'heading-63',
                  type: 'heading',
                  level: 3,
                  text: 'Применение',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Анализ логов\n- Фильтрация данных\n- Поиск в файлах\n- Статистика проекта',
                },
              ],
            },
          ],
        },
        {
          id: 'code-65',
          type: 'code',
          language: 'bash',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Перенаправление ввода/вывода',
      blocks: [
        {
          id: 'table-66',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Оператор',
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
                    id: 'text-67',
                    type: 'prose',
                    markdown: '`>`',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Перезаписать файл',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`echo "text" > file.txt`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '`>>`',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Добавить в конец файла',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '`echo "more" >> file.txt`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '`2>`',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Перенаправить ошибки',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`command 2> errors.txt`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '`2>&1`',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Объединить вывод и ошибки',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '`command > all.log 2>&1`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '`&>`',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: 'Вывод и ошибки (короткая форма)',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '`command &> all.log`',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '`<`',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Ввод из файла',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '`mysql < dump.sql`',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '`|`',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Передать вывод следующей команде',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '`cat file | grep "text"`',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '`tee`',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Вывод в терминал И файл',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '`npm test | tee test.log`',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-91',
          type: 'code',
          language: 'bash',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические примеры для разработки',
      blocks: [
        {
          id: 'code-92',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Комбинированное использование',
      blocks: [
        {
          id: 'code-93',
          type: 'code',
          language: 'bash',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-94',
          type: 'prose',
          markdown:
            '1. **В чем разница между &gt; и &gt;&gt;?**\n   \n   `>` перезаписывает файл (создает новый или удаляет содержимое существующего). `>>` добавляет в конец файла (append), сохраняя существующее содержимое.\n2. **Как работает pipe (|)?**\n   \n   Pipe передает stdout (стандартный вывод) первой команды на stdin (стандартный ввод) второй команды. Например: `cat file.txt | grep "error"` — cat выводит файл, grep фильтрует строки.\n3. **Что означает 2&gt;&amp;1?**\n   \n   Перенаправляет stderr (поток ошибок, дескриптор 2) в stdout (стандартный вывод, дескриптор 1). Используется для объединения вывода и ошибок: `command > file.log 2>&1`\n4. **Как найти большие файлы в директории?**\n   \n   `ls -lhS | head -n 10` — показывает 10 самых больших файлов. Или `du -sh * | sort -h | tail -n 10` для директорий.\n5. **Как посмотреть логи в реальном времени?**\n   \n   `tail -f application.log` — следит за файлом и показывает новые строки. С фильтрацией: `tail -f app.log | grep "ERROR"`\n6. **В чем разница между cat и less?**\n   \n   `cat` выводит весь файл сразу. `less` показывает постранично с навигацией (пробел, стрелки, q для выхода). Для больших файлов используйте less.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Шпаргалка по командам',
      blocks: [
        {
          id: 'cards-95',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-96',
              title: 'Просмотр и навигация',
              blocks: [
                {
                  id: 'text-97',
                  type: 'prose',
                  markdown:
                    '- `pwd` — текущая директория\n- `ls -la` — все файлы подробно\n- `cat file.txt` — содержимое файла\n- `less file.txt` — постраничный просмотр\n- `head -n 20 file` — первые 20 строк\n- `tail -n 20 file` — последние 20 строк',
                },
              ],
            },
            {
              id: 'card-98',
              title: 'Фильтрация и поиск',
              blocks: [
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    '- `grep "text" file` — поиск текста\n- `grep -r "text" .` — рекурсивный поиск\n- `command | wc -l` — подсчет строк\n- `sort file.txt` — сортировка\n- `uniq file.txt` — удалить дубли\n- `awk, sed` — обработка текста',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-100',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-101',
              blocks: [
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Использовать pipes для сложных задач\n- Логировать важные операции\n- Проверять вывод команд\n- Использовать \\-h для размеров\n- Комбинировать команды через &amp;&amp;\n- Сохранять скрипты для повторного использования',
                },
              ],
            },
            {
              id: 'card-104',
              blocks: [
                {
                  id: 'heading-105',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown:
                    '- cat для больших файлов (используйте less)\n- Перезапись важных файлов без бэкапа\n- Игнорирование stderr (ошибок)\n- Хардкод путей в скриптах\n- Выполнение команд без понимания\n- Забывать про права доступа',
                },
              ],
            },
            {
              id: 'card-107',
              blocks: [
                {
                  id: 'heading-108',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-109',
                  type: 'prose',
                  markdown:
                    '- Изучите man pages (man ls)\n- Используйте Tab для автодополнения\n- История команд: стрелка вверх\n- Ctrl\\+R для поиска в истории\n- Алиасы для частых команд\n- Практикуйтесь в Docker контейнерах',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Современные альтернативы',
      blocks: [
        {
          id: 'table-110',
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
                    id: 'text-111',
                    type: 'prose',
                    markdown: '`ls`',
                  },
                ],
                [
                  {
                    id: 'text-112',
                    type: 'prose',
                    markdown: '`exa` или `lsd`',
                  },
                ],
                [
                  {
                    id: 'text-113',
                    type: 'prose',
                    markdown: 'Цвета, иконки, Git статус',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-114',
                    type: 'prose',
                    markdown: '`cat`',
                  },
                ],
                [
                  {
                    id: 'text-115',
                    type: 'prose',
                    markdown: '`bat`',
                  },
                ],
                [
                  {
                    id: 'text-116',
                    type: 'prose',
                    markdown: 'Подсветка синтаксиса, нумерация',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-117',
                    type: 'prose',
                    markdown: '`find`',
                  },
                ],
                [
                  {
                    id: 'text-118',
                    type: 'prose',
                    markdown: '`fd`',
                  },
                ],
                [
                  {
                    id: 'text-119',
                    type: 'prose',
                    markdown: 'Быстрее, проще синтаксис',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-120',
                    type: 'prose',
                    markdown: '`grep`',
                  },
                ],
                [
                  {
                    id: 'text-121',
                    type: 'prose',
                    markdown: '`ripgrep (rg)`',
                  },
                ],
                [
                  {
                    id: 'text-122',
                    type: 'prose',
                    markdown: 'Быстрее, умнее игнорирует файлы',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown: '`du`',
                  },
                ],
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: '`dust`',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: 'Наглядная визуализация',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-126',
          type: 'prose',
          markdown:
            '**pwd, echo, cat, ls и pipes** — это базовые команды Linux/Unix, которые должен знать каждый разработчик. Они используются везде: в Docker, CI/CD, скриптах деплоя, отладке. **Pipes** позволяют создавать мощные конвейеры обработки данных, комбинируя простые команды. Освоение этих инструментов значительно повышает продуктивность и является обязательным для любого технического собеседования.',
        },
        {
          id: 'resources-127',
          type: 'resources',
          items: [
            {
              id: 'link-128',
              label: 'TLDR Pages',
              url: 'https://tldr.sh/',
            },
          ],
        },
        {
          id: 'resources-129',
          type: 'resources',
          items: [
            {
              id: 'link-130',
              label: 'Explain Shell',
              url: 'https://explainshell.com/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
