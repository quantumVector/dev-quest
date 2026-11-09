import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-use-memo-basicexamplesnippet.txt?raw'
import example2 from '../snippets/react/react-use-memo-usageexamplesnippet.txt?raw'
import example3 from '../snippets/react/react-use-memo-complexcalculationsnippet.txt?raw'
import example4 from '../snippets/react/react-use-memo-referenceequalitysnippet.txt?raw'
import example5 from '../snippets/react/react-use-memo-withreactmemosnippet.txt?raw'
import example6 from '../snippets/react/react-use-memo-antipatternssnippet.txt?raw'
import example7 from '../snippets/react/react-use-memo-performancecomparisonsnippet.txt?raw'
import example8 from '../snippets/react/react-use-memo-realworldexamplesnippet.txt?raw'

// Content copied verbatim from src/views/react/UseMemo.vue.
export default {
  ...articleSummaries.reactUseMemo,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**useMemo** — это React Hook для мемоизации (кэширования) результатов вычислений. Он запоминает результат выполнения функции и возвращает закэшированное значение, пока зависимости не изменились. Это оптимизирует производительность, избегая повторных дорогих вычислений при каждом рендере.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое useMemo?',
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
                  text: 'Без useMemo',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **Вычисления каждый раз**\n- При каждом рендере компонента\n- Независимо от изменений данных\n- Потеря производительности\n- Лишние вычислительные ресурсы',
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
                  text: 'С useMemo',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Кэширование результата**\n- Вычисление только при изменении зависимостей\n- Переиспользование закэшированного значения\n- Оптимизация производительности\n- Экономия ресурсов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Базовый пример',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Синтаксис и использование',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Когда использовать useMemo?',
      blocks: [
        {
          id: 'table-11',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Сценарий',
            },
            {
              id: 'column-2',
              label: 'Нужен useMemo?',
            },
            {
              id: 'column-3',
              label: 'Причина',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: '**Сложные вычисления**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Избегает повторных дорогих операций',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Фильтрация/сортировка больших массивов**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'O(n) или O(n log n) операции',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: '**Создание объектов/массивов для пропсов**',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Сохраняет ссылочное равенство для React.memo',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '**Простая арифметика**',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Оверхед useMemo больше пользы',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Примитивные значения**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Сравниваются по значению и так',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Деструктуризация объекта**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Не требует вычислений',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Сложные вычисления с useMemo',
      blocks: [
        {
          id: 'code-30',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'useMemo для ссылочного равенства',
      blocks: [
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown:
                '**Важно:** Объекты и массивы в JavaScript сравниваются по ссылке. Новый объект {} !== новый объект {}, даже если содержимое одинаковое!',
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Комбинация useMemo и React.memo',
      blocks: [
        {
          id: 'code-34',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: '❌ Антипаттерны - когда НЕ нужен useMemo',
      blocks: [
        {
          id: 'callout-35',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-36',
              type: 'prose',
              markdown:
                '**Внимание:** Избыточное использование useMemo может ухудшить производительность! useMemo сам имеет оверхед: проверка зависимостей, хранение кэша в памяти.',
            },
          ],
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение производительности',
      blocks: [
        {
          id: 'code-38',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Реальный пример: Dashboard',
      blocks: [
        {
          id: 'code-39',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Преимущества useMemo',
      blocks: [
        {
          id: 'cards-40',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-41',
              blocks: [
                {
                  id: 'heading-42',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- Избегает повторных вычислений\n- Сокращает время рендеринга\n- Оптимизирует сложные операции\n- Экономит CPU ресурсы',
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
                  text: 'Ссылочное равенство',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- Сохраняет ссылки на объекты\n- Работает с React.memo\n- Предотвращает лишние ре\\-рендеры\n- Оптимизирует дочерние компоненты',
                },
              ],
            },
            {
              id: 'card-47',
              blocks: [
                {
                  id: 'heading-48',
                  type: 'heading',
                  level: 3,
                  text: 'Читаемость кода',
                },
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '- Явно показывает оптимизацию\n- Документирует зависимости\n- Упрощает отладку\n- Облегчает рефакторинг',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'useMemo vs другие подходы',
      blocks: [
        {
          id: 'table-50',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Подход',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Когда использовать',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**useMemo**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Мемоизация значений',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Сложные вычисления, объекты для пропсов',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '**useCallback**',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Мемоизация функций',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Колбэки для дочерних компонентов',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '**React.memo**',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Мемоизация компонентов',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: 'Предотвращение ре\\-рендеров компонента',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '**useState**',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Хранение состояния',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: 'Начальные вычисления (ленивая инициализация)',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '**useRef**',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Хранение мутабельных данных',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: 'Кэш без влияния на рендеринг',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-66',
          type: 'prose',
          markdown:
            '1. **В чем разница между useMemo и useCallback?**\n   \n   `useMemo` возвращает мемоизированное **значение** (результат вычислений). `useCallback` возвращает мемоизированную **функцию**. `useCallback(fn, deps)` эквивалентен `useMemo(() => fn, deps)`.\n2. **Всегда ли нужно мемоизировать объекты в пропсах?**\n   \n   Нет. Только если дочерний компонент обернут в `React.memo` и вы хотите избежать его ре\\-рендера. Без React.memo мемоизация объектов бессмысленна для оптимизации.\n3. **Что произойдет, если забыть массив зависимостей?**\n   \n   Без массива зависимостей функция будет выполняться при каждом рендере — useMemo станет бесполезным. С пустым массивом `[]` вычисление выполнится только один раз.\n4. **Когда useMemo может навредить производительности?**\n   \n   При мемоизации простых вычислений оверхед (проверка зависимостей, хранение в памяти) больше, чем польза. Также при слишком частом изменении зависимостей — кэш постоянно инвалидируется, но накладные расходы остаются.\n5. **Можно ли использовать useMemo для side effects?**\n   \n   Нет! useMemo для чистых вычислений. React может отбросить кэшированное значение в любой момент. Для side effects используйте `useEffect`.\n6. **Как профилировать эффект от useMemo?**\n   \n   Используйте React DevTools Profiler для измерения времени рендера до и после добавления useMemo. Добавляйте console.log внутри useMemo для отслеживания пересчетов.',
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-67',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-68',
              blocks: [
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- Мемоизировать дорогие вычисления\n- Объекты/массивы для React.memo\n- Правильно указывать зависимости\n- Измерять производительность\n- Использовать ESLint правила\n- Документировать причину',
                },
              ],
            },
            {
              id: 'card-71',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Мемоизации простых вычислений\n- Преждевременной оптимизации\n- Мемоизации примитивов\n- Side effects в useMemo\n- Забывать массив зависимостей\n- Мемоизировать все подряд',
                },
              ],
            },
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'heading-75',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Сначала профилируйте, потом оптимизируйте\n- Используйте React.StrictMode\n- Проверяйте с React DevTools\n- Комбинируйте с React.memo\n- Следите за размером зависимостей\n- Тестируйте граничные случаи',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Итог',
      blocks: [
        {
          id: 'text-77',
          type: 'prose',
          markdown:
            '**useMemo** — это мощный инструмент оптимизации производительности в React, который кэширует результаты вычислений. Используйте его для **дорогих вычислений**, **фильтрации/сортировки больших массивов** и **сохранения ссылочного равенства** объектов для React.memo. Избегайте преждевременной оптимизации — не все вычисления нуждаются в мемоизации. Всегда профилируйте производительность перед и после применения useMemo, чтобы убедиться в реальной пользе.',
        },
        {
          id: 'resources-78',
          type: 'resources',
          items: [
            {
              id: 'link-79',
              label: 'React Docs: useMemo',
              url: 'https://react.dev/reference/react/useMemo',
            },
          ],
        },
        {
          id: 'resources-80',
          type: 'resources',
          items: [
            {
              id: 'link-81',
              label: 'React Rendering',
              url: 'https://react.dev/learn/render-and-commit',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
