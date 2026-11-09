import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/flex-vs-grid-snippet1.css.txt?raw'
import example2 from '../snippets/css/flex-vs-grid-snippet2.css.txt?raw'
import example3 from '../snippets/css/flex-vs-grid-snippet3.css.txt?raw'
import example4 from '../snippets/css/flex-vs-grid-snippet4.css.txt?raw'
import example5 from '../snippets/css/flex-vs-grid-snippet5.css.txt?raw'
import example6 from '../snippets/css/flex-vs-grid-snippet6.css.txt?raw'
import example7 from '../snippets/css/flex-vs-grid-snippet7.css.txt?raw'
import example8 from '../snippets/css/flex-vs-grid-snippet8.css.txt?raw'
import example9 from '../snippets/css/flex-vs-grid-snippet9.css.txt?raw'

// Content copied verbatim from src/views/css/FlexboxVsGrid.vue.
export default {
  ...articleSummaries.flexGrid,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Flexbox и Grid** — это две системы макетирования CSS, которые решают разные задачи. Flexbox идеален для одномерных макетов (строка ИЛИ столбец), Grid — для двумерных (строки И столбцы). Понимание их различий критично для эффективной верстки.',
    },
  ],
  sections: [
    {
      id: 'differences',
      title: 'Основные различия',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Flexbox',
            },
            {
              id: 'column-3',
              label: 'Grid',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-3',
                    type: 'prose',
                    markdown: '**Размерность**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Одномерная (1D)',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Двумерная (2D)',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: '**Направление**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: 'Строка ИЛИ столбец',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Строки И столбцы',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: '**Размеры элементов**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Зависят от содержимого',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: 'Задаются явно',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Позиционирование**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Последовательное',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Произвольное',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Поддержка браузеров**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Отличная (IE10+)',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Хорошая (IE11+, ограниченно)',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'flexbox',
      title: 'Flexbox: одномерные макеты',
      blocks: [
        {
          id: 'code-18',
          type: 'code',
          language: 'css',
          code: example1,
        },
      ],
    },
    {
      id: 'grid',
      title: 'Grid: двумерные макеты',
      blocks: [
        {
          id: 'code-19',
          type: 'code',
          language: 'css',
          code: example2,
        },
      ],
    },
    {
      id: 'flexbox-use',
      title: 'Когда использовать Flexbox',
      blocks: [
        {
          id: 'cards-20',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-21',
              title: 'Идеально подходит для:',
              blocks: [
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown:
                    '- Навигационных меню\n- Панелей кнопок\n- Карточек в ряд\n- Центрирования элементов\n- Распределения пространства\n- Вертикального выравнивания',
                },
              ],
            },
            {
              id: 'card-23',
              title: 'Особенности:',
              blocks: [
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- Контент определяет размеры\n- Автоматическое заполнение\n- Гибкое поведение элементов\n- Простое выравнивание\n- Хорошо для адаптивности',
                },
              ],
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'css',
          code: example3,
        },
      ],
    },
    {
      id: 'grid-use',
      title: 'Когда использовать Grid',
      blocks: [
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              title: 'Идеально подходит для:',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- Макетов страниц\n- Галерей изображений\n- Дашбордов\n- Табличных данных\n- Сложных адаптивных макетов\n- Перекрывающихся элементов',
                },
              ],
            },
            {
              id: 'card-29',
              title: 'Особенности:',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- Точное позиционирование\n- Контроль над размерами\n- Двумерное планирование\n- Именованные области\n- Автоматическое размещение',
                },
              ],
            },
          ],
        },
        {
          id: 'code-31',
          type: 'code',
          language: 'css',
          code: example4,
        },
      ],
    },
    {
      id: 'centering',
      title: 'Центрирование: Flex vs Grid',
      blocks: [
        {
          id: 'code-32',
          type: 'code',
          language: 'css',
          code: example5,
        },
      ],
    },
    {
      id: 'flexbox-strengths',
      title: 'Когда Flexbox незаменим',
      blocks: [
        {
          id: 'code-33',
          type: 'code',
          language: 'css',
          code: example6,
        },
      ],
    },
    {
      id: 'grid-strengths',
      title: 'Когда Grid незаменим',
      blocks: [
        {
          id: 'code-34',
          type: 'code',
          language: 'css',
          code: example7,
        },
      ],
    },
    {
      id: 'combination',
      title: 'Комбинирование Flexbox и Grid',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            'Лучший подход — комбинировать обе технологии. Grid для общей структуры, Flexbox для деталей:',
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'css',
          code: example8,
        },
      ],
    },
    {
      id: 'performance',
      title: 'Производительность и выбор',
      blocks: [
        {
          id: 'code-37',
          type: 'code',
          language: 'css',
          code: example9,
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-38',
          type: 'prose',
          markdown:
            '1. **В чем главное отличие Flexbox от Grid?**\n   \n   Flexbox — одномерная система (работает в одном направлении: строка ИЛИ столбец). Grid — двумерная система (работает одновременно со строками И столбцами).\n2. **Можно ли заменить Grid на Flexbox везде?**\n   \n   Нет. Grid незаменим для сложных макетов с перекрывающимися элементами, точным позиционированием и двумерным планированием. Flexbox не может создать настоящие сетки.\n3. **Когда лучше использовать Flexbox вместо Grid?**\n   \n   Для простых одномерных задач: навигация, панели кнопок, распределение пространства, центрирование, когда размеры элементов зависят от содержимого.\n4. **Влияет ли выбор Flex/Grid на производительность?**\n   \n   Flexbox быстрее для простых задач (меньше вычислений). Grid эффективнее для сложных макетов (одна система вместо множества вложенных flex-контейнеров).\n5. **Как лучше всего изучить различия?**\n   \n   Практика! Создайте одинаковые макеты на Flexbox и Grid. Попробуйте сделать сложную сетку на Flexbox — увидите ограничения. Изучите Flexbox Froggy и Grid Garden.\n6. **Какие современные техники комбинирования?**\n   \n   Grid для макета страницы, Flexbox для компонентов внутри. CSS Subgrid для связи между уровнями Grid. Container Queries для адаптивности на уровне компонентов.',
        },
      ],
    },
    {
      id: 'recommendations',
      title: 'Практические рекомендации',
      blocks: [
        {
          id: 'cards-39',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-40',
              title: 'Выбор технологии',
              blocks: [
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    '- Спросите: одно или два измерения?\n- Контент или макет главнее?\n- Нужна ли точная сетка?\n- Требуются ли пересечения?',
                },
              ],
            },
            {
              id: 'card-42',
              title: 'Лучшие практики',
              blocks: [
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- Комбинируйте технологии\n- Grid для основы, Flex для деталей\n- Изучите CSS Subgrid\n- Используйте DevTools для отладки',
                },
              ],
            },
            {
              id: 'card-44',
              title: 'Обратная совместимость',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- @supports для проверки\n- Flexbox как fallback\n- Progressive enhancement\n- Полифилы при необходимости',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итог',
      blocks: [
        {
          id: 'text-46',
          type: 'prose',
          markdown:
            'Flexbox и Grid — не конкуренты, а дополняющие друг друга инструменты. Flexbox идеален для одномерных задач и контентно-зависимых макетов. Grid незаменим для сложных двумерных структур и точного позиционирования. Современная верстка использует оба инструмента: Grid для общей структуры, Flexbox для компонентов внутри.',
        },
        {
          id: 'resources-47',
          type: 'resources',
          items: [
            {
              id: 'link-48',
              label: 'CSS-Tricks: Flexbox vs Grid',
              url: 'https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
