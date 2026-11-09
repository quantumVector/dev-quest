import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/react/react-ref-forward-ref-basicuserefsnippet.txt?raw'
import example2 from '../snippets/react/react-ref-forward-ref-mutablevaluesnippet.txt?raw'
import example3 from '../snippets/react/react-ref-forward-ref-previousvaluesnippet.txt?raw'
import example4 from '../snippets/react/react-ref-forward-ref-instancevariablessnippet.txt?raw'
import example5 from '../snippets/react/react-ref-forward-ref-forwardrefbasicsnippet.txt?raw'
import example6 from '../snippets/react/react-ref-forward-ref-forwardrefcomplexsnippet.txt?raw'
import example7 from '../snippets/react/react-ref-forward-ref-controlledrefsnippet.txt?raw'
import example8 from '../snippets/react/react-ref-forward-ref-uncontrolledrefsnippet.txt?raw'
import example9 from '../snippets/react/react-ref-forward-ref-comparisonsnippet.txt?raw'
import example10 from '../snippets/react/react-ref-forward-ref-callbackrefsnippet.txt?raw'
import example11 from '../snippets/react/react-ref-forward-ref-refarraysnippet.txt?raw'
import example12 from '../snippets/react/react-ref-forward-ref-antipatternssnippet.txt?raw'
import example13 from '../snippets/react/react-ref-forward-ref-advancedpatternssnippet.txt?raw'

// Content copied verbatim from src/views/react/RefAndForwardRef.vue.
export default {
  ...articleSummaries.reactRefAndForwardRef,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**useRef** — это хук React для создания изменяемых значений, которые сохраняются между рендерами и не вызывают ререндер при изменении. **forwardRef** позволяет пробрасывать refs через компоненты. Понимание управляемых и неконтролируемых компонентов критично для работы с формами и DOM.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'useRef: базовое использование с DOM',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'jsx',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Основной сценарий: изменяемые значения без ререндера',
      blocks: [
        {
          id: 'callout-3',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-4',
              type: 'prose',
              markdown:
                '**Ключевое отличие useRef от useState:** изменение `ref.current` НЕ вызывает ререндер компонента!',
            },
          ],
        },
        {
          id: 'code-5',
          type: 'code',
          language: 'jsx',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Сценарий 2: Сохранение предыдущего значения',
      blocks: [
        {
          id: 'code-6',
          type: 'code',
          language: 'jsx',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Сценарий 3: Экземплярные переменные (Instance Variables)',
      blocks: [
        {
          id: 'text-7',
          type: 'prose',
          markdown:
            'Ref идеален для данных, которые должны сохраняться между рендерами, но не влияют на UI:',
        },
        {
          id: 'code-8',
          type: 'code',
          language: 'jsx',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Когда использовать useRef?',
      blocks: [
        {
          id: 'cards-9',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-10',
              blocks: [
                {
                  id: 'heading-11',
                  type: 'heading',
                  level: 3,
                  text: '✅ Используйте useRef',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown:
                    '- Доступ к DOM\\-элементам\n- Хранение таймеров/интервалов\n- Сохранение предыдущих значений\n- Мутабельные данные без ререндера\n- Кэширование дорогих вычислений\n- Ссылки на внешние библиотеки',
                },
              ],
            },
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'heading-14',
                  type: 'heading',
                  level: 3,
                  text: '❌ НЕ используйте useRef',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown:
                    '- Для данных, влияющих на UI (используйте useState)\n- Для изменения ref в рендере\n- Как замену props/state\n- Для синхронных вычислений в рендере\n- Вместо useCallback/useMemo',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'forwardRef: Проброс refs через компоненты',
      blocks: [
        {
          id: 'callout-16',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-17',
              type: 'prose',
              markdown:
                '**Проблема:** React игнорирует prop `ref` в обычных компонентах. forwardRef решает эту проблему.',
            },
          ],
        },
        {
          id: 'code-18',
          type: 'code',
          language: 'jsx',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'forwardRef с useImperativeHandle',
      blocks: [
        {
          id: 'text-19',
          type: 'prose',
          markdown:
            '**useImperativeHandle** позволяет контролировать, какой API доступен через ref (инкапсуляция):',
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'jsx',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Преимущества forwardRef',
      blocks: [
        {
          id: 'table-21',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Преимущество',
            },
            {
              id: 'column-2',
              label: 'Описание',
            },
            {
              id: 'column-3',
              label: 'Пример использования',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: '**Переиспользуемость**',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Компоненты с ref можно использовать везде',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'UI библиотеки, дизайн\\-системы',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '**Инкапсуляция**',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Контроль над публичным API через useImperativeHandle',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Сложные компоненты с внутренней логикой',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Композиция**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Легко комбинировать компоненты с refs',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Формы, модальные окна, тултипы',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '**Императивный API**',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Возможность вызова методов компонента',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'focus(), scrollIntoView(), play()',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '**Интеграция**',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Работа со сторонними библиотеками',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: 'D3.js, Chart.js, видеоплееры',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Управляемые (Controlled) refs',
      blocks: [
        {
          id: 'text-37',
          type: 'prose',
          markdown:
            'В управляемых компонентах **React контролирует значение через state**. Каждое изменение вызывает ререндер:',
        },
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
      title: 'Неконтролируемые (Uncontrolled) refs',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            'В неконтролируемых компонентах **DOM сам управляет значением**. React читает его при необходимости:',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'jsx',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Сравнение подходов',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'jsx',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Controlled vs Uncontrolled: Когда что использовать?',
      blocks: [
        {
          id: 'cards-42',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-43',
              title: '✅ Controlled (Управляемые)',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown: '**Используйте когда нужно:**',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- Валидация в реальном времени\n- Динамическое изменение значений\n- Условный рендеринг на основе значений\n- Синхронизация нескольких полей\n- Форматирование ввода\n- Отключение кнопки submit',
                },
              ],
            },
            {
              id: 'card-46',
              title: '✅ Uncontrolled (Неконтролируемые)',
              blocks: [
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown: '**Используйте когда нужно:**',
                },
                {
                  id: 'text-48',
                  type: 'prose',
                  markdown:
                    '- Простые формы без валидации\n- Загрузка файлов (всегда uncontrolled)\n- Интеграция с не\\-React кодом\n- Большие формы (производительность)\n- Редко изменяемые значения\n- Минимум JavaScript кода',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Callback Ref — альтернатива useRef',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'jsx',
          code: example10,
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Массивы refs для динамических списков',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'jsx',
          code: example11,
        },
      ],
    },
    {
      id: 'section-15',
      title: '❌ Антипаттерны с useRef',
      blocks: [
        {
          id: 'callout-51',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-52',
              type: 'prose',
              markdown: '**Важно:** Избегайте этих распространенных ошибок при работе с refs!',
            },
          ],
        },
        {
          id: 'code-53',
          type: 'code',
          language: 'jsx',
          code: example12,
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Продвинутые паттерны с ref',
      blocks: [
        {
          id: 'code-54',
          type: 'code',
          language: 'jsx',
          code: example13,
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-55',
          type: 'prose',
          markdown:
            '1. **Какой основной сценарий использования useRef, кроме DOM?**\n   \n   Хранение изменяемых значений, которые не должны вызывать ререндер: таймеры, предыдущие значения, экземплярные переменные, кэш, ссылки на внешние библиотеки. Ref — это как поле класса в классовых компонентах.\n2. **В чем преимущества forwardRef?**\n   \n   forwardRef позволяет пробросить ref через компонент, делая его переиспользуемым. С useImperativeHandle можно контролировать публичный API, создавая инкапсулированные компоненты с императивным интерфейсом (focus, scrollTo, play и т.д.).\n3. **Что такое управляемый и неконтролируемый ref?**\n   \n   **Управляемый (controlled):** React контролирует значение через state, каждое изменение проходит через onChange. **Неконтролируемый (uncontrolled):** DOM управляет значением, React читает его через ref при необходимости. Выбор зависит от сложности формы и требований к валидации.\n4. **Когда нельзя использовать ref?**\n   \n   Нельзя изменять ref.current в рендере (только в useEffect/обработчиках). Нельзя использовать ref вместо state для данных, влияющих на UI. Нельзя полагаться на ref.current в рендере — он может быть null.\n5. **В чем разница между useRef и callback ref?**\n   \n   useRef возвращает объект {current: value}, который не вызывает колбэк при изменении. Callback ref — это функция, которая вызывается при монтировании/размонтировании элемента, что позволяет реагировать на изменения DOM.\n6. **Как работать с массивом refs?**\n   \n   Для динамических списков используйте Map вместо массива: ref={(node) =&gt; map.set(id, node)}. Это обеспечивает правильное добавление/удаление элементов при изменении списка. Не забывайте очищать Map при размонтировании.',
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-56',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-57',
              blocks: [
                {
                  id: 'heading-58',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown:
                    '- Изменять ref только в useEffect/обработчиках\n- Использовать state для данных UI\n- Проверять ref.current на null\n- forwardRef для переиспользуемых компонентов\n- useImperativeHandle для инкапсуляции\n- Callback ref для реакции на DOM',
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
                  text: '❌ Избегать',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Изменение ref в рендере\n- ref вместо state для UI\n- Доступ к ref.current в рендере\n- Прямая манипуляция DOM без нужды\n- Забывать о null в ref.current\n- Сложные вычисления в callback ref',
                },
              ],
            },
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- TypeScript для типизации refs\n- Map для динамических списков\n- Controlled для сложных форм\n- Uncontrolled для файлов\n- Комбинируйте подходы\n- Документируйте императивный API',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-19',
      title: 'Итог',
      blocks: [
        {
          id: 'text-66',
          type: 'prose',
          markdown:
            '**useRef** — мощный инструмент для работы с изменяемыми значениями без ререндера, доступа к DOM и хранения экземплярных переменных. **forwardRef** позволяет создавать переиспользуемые компоненты с контролируемым API через useImperativeHandle. **Управляемые компоненты** дают полный контроль через state, **неконтролируемые** — простоту через ref. Понимание этих концепций критично для профессиональной разработки на React.',
        },
        {
          id: 'resources-67',
          type: 'resources',
          items: [
            {
              id: 'link-68',
              label: 'React Docs: useRef',
              url: 'https://react.dev/reference/react/useRef',
            },
          ],
        },
        {
          id: 'resources-69',
          type: 'resources',
          items: [
            {
              id: 'link-70',
              label: 'React Docs: forwardRef',
              url: 'https://react.dev/reference/react/forwardRef',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
