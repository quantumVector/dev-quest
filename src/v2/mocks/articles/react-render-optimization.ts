import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-render-optimization-rendercausessnippet.txt?raw'
import example2 from '../snippets/react/react-render-optimization-unnecessaryrenderssnippet.txt?raw'
import example3 from '../snippets/react/react-render-optimization-detectiontoolssnippet.txt?raw'
import example4 from '../snippets/react/react-render-optimization-memoizationsnippet.txt?raw'
import example5 from '../snippets/react/react-render-optimization-contextoptimizationsnippet.txt?raw'
import example6 from '../snippets/react/react-render-optimization-compositionpatternssnippet.txt?raw'
import example7 from '../snippets/react/react-render-optimization-statemanagementsnippet.txt?raw'
import example8 from '../snippets/react/react-render-optimization-virtuallistssnippet.txt?raw'

// Content copied verbatim from src/views/react/RenderOptimization.vue.
export default {
  ...articleSummaries.reactRenderOptimization,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Лишние ререндеры** — одна из главных причин проблем с производительностью в React приложениях. Понимание причин ререндера, умение их обнаруживать и оптимизировать — критически важные навыки для React\\-разработчика.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основные причины ререндера',
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
                  text: 'Всегда вызывают ререндер',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- **setState** — изменение локального состояния\n- **Новые props** — изменение пропсов компонента\n- **Ререндер родителя** — родитель перерендерился\n- **Context изменение** — изменился используемый контекст\n- **forceUpdate()** — принудительный ререндер (редко)',
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
                  text: 'НЕ вызывают ререндер',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **ref изменения** — useRef не триггерит рендер\n- **Одинаковое значение** — setState(prevValue)\n- **Мутация объекта** — obj.field = value (без setState)\n- **Мемоизированный компонент** — React.memo с теми же props\n- **Изменение вне компонента** — глобальные переменные',
                },
              ],
            },
          ],
        },
        {
          id: 'code-9',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Частые причины ЛИШНИХ ререндеров',
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
                '**Важно:** Лишний ререндер — это когда компонент рендерится, но визуальный результат не изменился. Это трата ресурсов на вычисления и проверки DOM.',
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Инструменты для обнаружения',
      blocks: [
        {
          id: 'code-13',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Методы оптимизации: Мемоизация',
      blocks: [
        {
          id: 'cards-14',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-15',
              blocks: [
                {
                  id: 'heading-16',
                  type: 'heading',
                  level: 3,
                  text: 'React.memo',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: 'Мемоизация компонента — пропускает ререндер если props не изменились',
                },
              ],
            },
            {
              id: 'card-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: 'useCallback',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: 'Мемоизация функций — возвращает ту же функцию при тех же зависимостях',
                },
              ],
            },
            {
              id: 'card-21',
              blocks: [
                {
                  id: 'heading-22',
                  type: 'heading',
                  level: 3,
                  text: 'useMemo',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: 'Мемоизация вычислений — кэширует результат при тех же зависимостях',
                },
              ],
            },
          ],
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Оптимизация Context API',
      blocks: [
        {
          id: 'code-25',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Паттерны композиции',
      blocks: [
        {
          id: 'code-26',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Оптимизация управления состоянием',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'jsx',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Виртуализация для больших списков',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение методов оптимизации',
      blocks: [
        {
          id: 'table-29',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Когда использовать',
            },
            {
              id: 'column-3',
              label: 'Overhead',
            },
            {
              id: 'column-4',
              label: 'Эффект',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**React.memo**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Компонент с частыми ререндерами родителя',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Сравнение props',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Высокий',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**useCallback**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Функции в props мемоизированных компонентов',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'Минимальный',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Средний',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '**useMemo**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Дорогие вычисления, объекты/массивы в props',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Кэширование',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Высокий',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '**Children prop**',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Статичный контент в динамическом родителе',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Очень высокий',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**State colocation**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Локальное состояние',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Высокий',
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
                    markdown: '**Виртуализация**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Списки &gt; 100 элементов',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Библиотека',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Критичный',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-54',
          type: 'prose',
          markdown:
            '1. **Какие есть основные причины ререндера в React?**\n   \n   Три главные: (1) изменение собственного состояния через setState, (2) изменение пропсов, (3) ререндер родительского компонента. Также: изменение контекста и forceUpdate().\n2. **Почему дочерний компонент ререндерится при ререндере родителя?**\n   \n   По умолчанию React ререндерит все дочерние компоненты при ререндере родителя, даже если props не изменились. Это поведение можно изменить с помощью React.memo.\n3. **В чем разница между useMemo и useCallback?**\n   \n   useMemo кэширует результат вычисления (значение), useCallback кэширует саму функцию. useCallback(fn, deps) === useMemo(() =&gt; fn, deps). Используйте useCallback для функций в props, useMemo для дорогих вычислений.\n4. **Когда НЕ стоит использовать React.memo?**\n   \n   Когда компонент всегда рендерится с новыми props, когда сравнение props дороже рендера, когда компонент очень простой (дешевый в рендере), когда props — сложные объекты без стабильных ссылок.\n5. **Как обнаружить лишние ререндеры?**\n   \n   React DevTools Profiler (Flamegraph), библиотека why\\-did\\-you\\-render, кастомный хук useWhyDidYouUpdate, console.log в компонентах. Профайлер показывает время рендера и причины обновлений.\n6. **Что такое State Colocation и зачем оно нужно?**\n   \n   Размещение состояния как можно ближе к месту использования. Это уменьшает область ререндеров — только компонент и его потомки обновляются, а не все дерево.\n7. **Как оптимизировать Context API?**\n   \n   Разделять контексты по назначению, мемоизировать value контекста, использовать селекторы для подписки только на нужные части состояния, рассмотреть альтернативы (Zustand, Jotai) для глобального состояния.\n8. **Что такое виртуализация списков и когда она нужна?**\n   \n   Рендер только видимых элементов большого списка. Нужна для списков &gt; 100 элементов. Библиотеки: react\\-window, react\\-virtualized. Критична для производительности при тысячах элементов.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-55',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-56',
              blocks: [
                {
                  id: 'heading-57',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Профилировать перед оптимизацией\n- Колокация состояния\n- Children prop для статики\n- Мемоизация только где нужно\n- Разделение контекстов\n- Виртуализация больших списков',
                },
              ],
            },
            {
              id: 'card-59',
              blocks: [
                {
                  id: 'heading-60',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- Преждевременная оптимизация\n- Inline объекты/функции в JSX\n- Глобальное состояние для локальных данных\n- Мемоизация всего подряд\n- Игнорирование DevTools\n- Context для часто меняющихся данных',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Измеряйте реальное влияние\n- Оптимизируйте узкие места\n- Используйте React.StrictMode\n- Включайте Concurrent Mode\n- Изучайте Profiler регулярно\n- Документируйте оптимизации',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Чек-лист оптимизации производительности',
      blocks: [
        {
          id: 'cards-65',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: 'Базовые проверки:',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- ✅ Используется React DevTools Profiler для анализа\n- ✅ Состояние размещено близко к месту использования\n- ✅ Нет inline объектов/функций в props мемоизированных компонентов\n- ✅ Context разделен по назначению и мемоизирован\n- ✅ Большие списки виртуализированы',
                },
                {
                  id: 'heading-69',
                  type: 'heading',
                  level: 3,
                  text: 'Продвинутые:',
                },
                {
                  id: 'text-70',
                  type: 'prose',
                  markdown:
                    '- ✅ React.memo используется для дорогих компонентов\n- ✅ useCallback для функций в props мемоизированных компонентов\n- ✅ useMemo для дорогих вычислений\n- ✅ Children prop для статичного контента\n- ✅ Code splitting и lazy loading реализованы',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Итог',
      blocks: [
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '**Основные причины ререндера:** изменение состояния (setState), изменение пропсов, ререндер родителя, изменение контекста. **Ключ к оптимизации:** обнаружение лишних ререндеров через профилирование, применение правильных методов оптимизации (мемоизация, композиция, виртуализация), и самое важное — **измерение реального эффекта** перед и после оптимизации.',
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'React Docs: Render',
              url: 'https://react.dev/learn/render-and-commit',
            },
          ],
        },
        {
          id: 'resources-74',
          type: 'resources',
          items: [
            {
              id: 'link-75',
              label: 'React.memo Docs',
              url: 'https://react.dev/reference/react/memo',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
