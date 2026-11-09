import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/ops/ops-sed-sedbasicssnippet.txt?raw'
import example2 from '../snippets/ops/ops-sed-sedadvancedsnippet.txt?raw'
import example3 from '../snippets/ops/ops-sed-nixosconfigsnippet.txt?raw'
import example4 from '../snippets/ops/ops-sed-nixosmodificationscriptsnippet.txt?raw'
import example5 from '../snippets/ops/ops-sed-sedpatternssnippet.txt?raw'
import example6 from '../snippets/ops/ops-sed-nixosexplanationsnippet.txt?raw'
import example7 from '../snippets/ops/ops-sed-sedtestingsnippet.txt?raw'
import example8 from '../snippets/ops/ops-sed-sedinterviewsnippet.txt?raw'

// Content copied verbatim from src/views/ops/SedTutorial.vue.
export default {
  ...articleSummaries.opsSedTutorial,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**sed (Stream EDitor)** — это утилита Unix для редактирования текста в потоке. Основное применение: замена текста, удаление строк, вставка содержимого, трансформация данных. sed обрабатывает файлы построчно, что делает его идеальным для автоматизации изменений в конфигурационных файлах, логах и исходном коде.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы sed',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-3',
              blocks: [
                {
                  id: 'heading-4',
                  type: 'heading',
                  level: 3,
                  text: 'Замена (s)',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: 'Substitute \\- основная команда sed для замены текста',
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
                  text: 'Удаление (d)',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: 'Delete \\- удаление строк по паттерну или номеру',
                },
              ],
            },
            {
              id: 'card-9',
              blocks: [
                {
                  id: 'heading-10',
                  type: 'heading',
                  level: 3,
                  text: 'Вставка (i/a)',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Insert/Append \\- добавление строк до или после паттерна',
                },
              ],
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'bash',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Продвинутые техники sed',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Практическая задача: Модификация NixOS конфигурации',
      blocks: [
        {
          id: 'callout-14',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-15',
              type: 'prose',
              markdown: '**Задача:** Модифицировать файл amazon\\-image.nix:',
            },
            {
              id: 'text-16',
              type: 'prose',
              markdown:
                '- Добавить `./custom.nix` в блок imports\n- Заменить `PermitRootLogin = "prohibit-password"` на `"true"`\n- Удалить последние 2 параметра из `systemd.services.fetch-ec2-metadata`',
            },
          ],
        },
        {
          id: 'heading-17',
          type: 'heading',
          level: 3,
          text: 'Исходный конфигурационный файл',
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'bash',
          code: example3,
        },
        {
          id: 'heading-19',
          type: 'heading',
          level: 3,
          text: 'Bash скрипт для модификации',
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'bash',
          code: example4,
        },
        {
          id: 'heading-21',
          type: 'heading',
          level: 3,
          text: 'Детальное объяснение sed паттернов',
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'bash',
          code: example5,
        },
        {
          id: 'heading-23',
          type: 'heading',
          level: 3,
          text: 'Подробный разбор модификации NixOS конфига',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'bash',
          code: example6,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Тестирование и отладка sed команд',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'bash',
          code: example7,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'bash',
          code: example8,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Сравнение sed с альтернативами',
      blocks: [
        {
          id: 'table-27',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Инструмент',
            },
            {
              id: 'column-2',
              label: 'Лучше для',
            },
            {
              id: 'column-3',
              label: 'Хуже для',
            },
            {
              id: 'column-4',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**sed**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Замены, удаления, потоковая обработка',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Сложная логика, вычисления',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: "`sed 's/old/new/g'`",
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**awk**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Работа с колонками, вычисления',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'In\\-place редактирование',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: "`awk '{print $1}'`",
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**grep**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Поиск и фильтрация',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Замены, модификация',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`grep "pattern"`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**perl**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Сложные regex, Unicode',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Простые задачи (overkill)',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: "`perl -pe 's/old/new/g'`",
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**tr**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Посимвольная замена',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Контекстные замены',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: "`tr 'a-z' 'A-Z'`",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Шпаргалка по sed командам',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-49',
              title: 'Основные команды',
              blocks: [
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown:
                    '- `s/old/new/` — замена\n- `d` — удаление\n- `p` — печать\n- `i\\` — вставить до\n- `a\\` — добавить после\n- `c\\` — заменить строку\n- `n` — следующая строка\n- `q` — выход',
                },
              ],
            },
            {
              id: 'card-51',
              title: 'Флаги',
              blocks: [
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '- `-n` — подавить вывод\n- `-e` — несколько команд\n- `-i` — in\\-place\n- `-E/-r` — расширенный regex\n- `-f` — скрипт из файла\n- `g` — глобальная замена\n- `i` — игнорировать регистр\n- `p` — печатать при замене',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-53',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-54',
              blocks: [
                {
                  id: 'heading-55',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Тестировать без \\-i сначала\n- Создавать бэкапы (\\-i.bak)\n- Использовать \\-E для читаемости\n- Документировать сложные команды\n- Проверять результаты через diff\n- Экранировать спецсимволы',
                },
              ],
            },
            {
              id: 'card-57',
              blocks: [
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- sed \\-i без бэкапа в продакшене\n- Сложные многострочные скрипты\n- Забывать про жадность regex\n- Игнорировать платформенные различия\n- Обработку бинарных файлов\n- Использовать когда проще perl/awk',
                },
              ],
            },
            {
              id: 'card-60',
              blocks: [
                {
                  id: 'heading-61',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Используйте другие разделители (|, #)\n- Комбинируйте с grep, awk\n- Изучите базовый vs расширенный regex\n- Практикуйтесь на реальных файлах\n- Создавайте библиотеку скриптов\n- Читайте man sed',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итог',
      blocks: [
        {
          id: 'text-63',
          type: 'prose',
          markdown:
            '**sed** — мощный инструмент для потоковой обработки и модификации текста. Основные возможности: замена текста (s), удаление строк (d), вставка содержимого (i/a/c), работа с блоками и диапазонами. Практическая задача с модификацией NixOS конфигурации демонстрирует реальное применение sed: добавление импортов, изменение параметров и удаление строк из блоков. Знание sed критически важно для DevOps, системного администрирования и автоматизации задач. Комбинация sed с другими Unix\\-утилитами (grep, awk, tail) создает мощные конвейеры обработки данных.',
        },
        {
          id: 'resources-64',
          type: 'resources',
          items: [
            {
              id: 'link-65',
              label: 'GNU sed Manual',
              url: 'https://www.gnu.org/software/sed/manual/',
            },
          ],
        },
        {
          id: 'resources-66',
          type: 'resources',
          items: [
            {
              id: 'link-67',
              label: 'NixOS amazon-image.nix',
              url: 'https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/virtualisation/amazon-image.nix',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
