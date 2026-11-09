import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-structural-patterns-adaptersnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-structural-patterns-adapterreactsnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-structural-patterns-decoratorsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-structural-patterns-decoratorreactsnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-structural-patterns-facadesnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-structural-patterns-facadereactsnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-structural-patterns-proxysnippet.txt?raw'
import example8 from '../snippets/patterns/patterns-structural-patterns-proxyreactsnippet.txt?raw'
import example9 from '../snippets/patterns/patterns-structural-patterns-compositesnippet.txt?raw'
import example10 from '../snippets/patterns/patterns-structural-patterns-compositereactsnippet.txt?raw'
import example11 from '../snippets/patterns/patterns-structural-patterns-bridgesnippet.txt?raw'
import example12 from '../snippets/patterns/patterns-structural-patterns-bridgereactsnippet.txt?raw'
import example13 from '../snippets/patterns/patterns-structural-patterns-flyweightsnippet.txt?raw'
import example14 from '../snippets/patterns/patterns-structural-patterns-flyweightreactsnippet.txt?raw'

// Content copied verbatim from src/views/patterns/StructuralPatterns.vue.
export default {
  ...articleSummaries.patternsStructuralPatterns,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Структурные паттерны** описывают способы компоновки объектов и классов в более крупные структуры, сохраняя при этом гибкость и эффективность. Они помогают организовать связи между компонентами системы. Рассмотрим 7 основных структурных паттернов с примерами для фронтенд\\-разработки.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Обзор структурных паттернов',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Паттерн',
            },
            {
              id: 'column-2',
              label: 'Назначение',
            },
            {
              id: 'column-3',
              label: 'Когда использовать',
            },
            {
              id: 'column-4',
              label: 'Пример в UI',
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
                    markdown: '**Adapter**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Адаптация несовместимых интерфейсов',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Интеграция сторонних библиотек',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Обертка старой библиотеки',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '**Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Динамическое добавление функций',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Расширение без изменения кода',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'HOC в React',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '**Facade**',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Упрощение сложного интерфейса',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Множество зависимых операций',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Кастомные хуки',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: '**Proxy**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Контроль доступа к объекту',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Ленивая загрузка, кэширование',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Виртуальный скроллинг',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Composite**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: 'Древовидные структуры',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Иерархии объектов',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'Вложенное меню',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: '**Bridge**',
                  },
                ],
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: 'Разделение абстракции и реализации',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Независимое изменение частей',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: 'Разные API провайдеры',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Flyweight**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Экономия памяти',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Множество однотипных объектов',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'Большие таблицы/списки',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: '1. Adapter (Адаптер)',
      blocks: [
        {
          id: 'text-31',
          type: 'prose',
          markdown:
            '**Проблема:** Нужно использовать класс с несовместимым интерфейсом.  \n**Решение:** Создать класс\\-адаптер, преобразующий интерфейс.',
        },
        {
          id: 'code-32',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
        {
          id: 'heading-33',
          type: 'heading',
          level: 3,
          text: 'Adapter в React',
        },
        {
          id: 'code-34',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. Decorator (Декоратор)',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            '**Проблема:** Нужно динамически добавлять функциональность без изменения кода.  \n**Решение:** Создать обертки, добавляющие поведение.',
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
        {
          id: 'heading-37',
          type: 'heading',
          level: 3,
          text: 'Decorator в React (HOC)',
        },
        {
          id: 'code-38',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: '3. Facade (Фасад)',
      blocks: [
        {
          id: 'text-39',
          type: 'prose',
          markdown:
            '**Проблема:** Сложная система с множеством взаимосвязанных компонентов.  \n**Решение:** Единый упрощенный интерфейс для работы с подсистемами.',
        },
        {
          id: 'code-40',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
        {
          id: 'heading-41',
          type: 'heading',
          level: 3,
          text: 'Facade в React (Custom Hooks)',
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-5',
      title: '4. Proxy (Прокси)',
      blocks: [
        {
          id: 'text-43',
          type: 'prose',
          markdown:
            '**Проблема:** Нужен контроль доступа к объекту или отложенная инициализация.  \n**Решение:** Прокси\\-объект контролирует обращения к реальному объекту.',
        },
        {
          id: 'code-44',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
        {
          id: 'heading-45',
          type: 'heading',
          level: 3,
          text: 'Proxy в React (Виртуализация)',
        },
        {
          id: 'code-46',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-6',
      title: '5. Composite (Компоновщик)',
      blocks: [
        {
          id: 'text-47',
          type: 'prose',
          markdown:
            '**Проблема:** Нужно работать с древовидными структурами единообразно.  \n**Решение:** Единый интерфейс для листьев и композитных объектов.',
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'typescript',
          code: example9,
        },
        {
          id: 'heading-49',
          type: 'heading',
          level: 3,
          text: 'Composite в React (Меню)',
        },
        {
          id: 'code-50',
          type: 'code',
          language: 'typescript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-7',
      title: '6. Bridge (Мост)',
      blocks: [
        {
          id: 'text-51',
          type: 'prose',
          markdown:
            '**Проблема:** Тесная связь между абстракцией и реализацией.  \n**Решение:** Разделить абстракцию и реализацию в независимые иерархии.',
        },
        {
          id: 'code-52',
          type: 'code',
          language: 'typescript',
          code: example11,
        },
        {
          id: 'heading-53',
          type: 'heading',
          level: 3,
          text: 'Bridge в React (API провайдеры)',
        },
        {
          id: 'code-54',
          type: 'code',
          language: 'typescript',
          code: example12,
        },
      ],
    },
    {
      id: 'section-8',
      title: '7. Flyweight (Приспособленец)',
      blocks: [
        {
          id: 'text-55',
          type: 'prose',
          markdown:
            '**Проблема:** Много однотипных объектов потребляют память.  \n**Решение:** Разделять общее состояние между объектами.',
        },
        {
          id: 'code-56',
          type: 'code',
          language: 'typescript',
          code: example13,
        },
        {
          id: 'heading-57',
          type: 'heading',
          level: 3,
          text: 'Flyweight в React (Оптимизация)',
        },
        {
          id: 'code-58',
          type: 'code',
          language: 'typescript',
          code: example14,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Сравнение паттернов',
      blocks: [
        {
          id: 'cards-59',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-60',
              title: 'Изменение интерфейса',
              blocks: [
                {
                  id: 'text-61',
                  type: 'prose',
                  markdown:
                    '- **Adapter** — преобразует интерфейс\n- **Facade** — упрощает интерфейс\n- **Proxy** — сохраняет интерфейс, добавляет контроль',
                },
              ],
            },
            {
              id: 'card-62',
              title: 'Добавление функциональности',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- **Decorator** — добавляет поведение динамически\n- **Proxy** — контролирует доступ\n- **Bridge** — разделяет абстракцию и реализацию',
                },
              ],
            },
            {
              id: 'card-64',
              title: 'Работа со структурами',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- **Composite** — древовидные иерархии\n- **Flyweight** — экономия памяти',
                },
              ],
            },
            {
              id: 'card-66',
              title: 'Упрощение сложности',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- **Facade** — единый интерфейс к подсистемам\n- **Proxy** — отложенная инициализация',
                },
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
          id: 'text-68',
          type: 'prose',
          markdown:
            '1. **В чем разница между Adapter и Facade?**\n   \n   **Adapter** преобразует один интерфейс в другой для совместимости. **Facade** предоставляет упрощенный интерфейс к сложной подсистеме. Adapter работает с существующим классом, Facade создает новый интерфейс для группы классов.\n2. **Чем Decorator отличается от Proxy?**\n   \n   **Decorator** добавляет новую функциональность, расширяя объект. **Proxy** контролирует доступ к объекту (кэширование, ленивая загрузка, контроль доступа). Decorator изменяет поведение, Proxy управляет использованием.\n3. **Когда использовать Composite в React?**\n   \n   Используйте Composite для древовидных структур: меню, файловые системы, комментарии с ответами, организационные структуры. Когда нужен единый интерфейс для работы с листьями и контейнерами.\n4. **Как Bridge помогает в тестировании?**\n   \n   Bridge разделяет абстракцию (бизнес\\-логику) и реализацию (API, хранилище). Это позволяет легко подменять реализацию на mock\\-объекты для тестирования, не изменяя код компонентов.\n5. **Где применяется Flyweight в современном фронтенде?**\n   \n   Виртуальный скроллинг (react\\-window, react\\-virtualized), большие таблицы, canvas\\-приложения с множеством объектов, текстовые редакторы. Везде, где много похожих объектов и важна производительность.\n6. **Можно ли комбинировать структурные паттерны?**\n   \n   Да! Часто используют: Facade \\+ Adapter (упрощение адаптированной библиотеки), Decorator \\+ Composite (декорирование древовидных структур), Proxy \\+ Flyweight (ленивая загрузка разделяемых объектов).',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Лучшие практики применения',
      blocks: [
        {
          id: 'cards-69',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-70',
              blocks: [
                {
                  id: 'heading-71',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Adapter для интеграции библиотек\n- Facade для сложных API\n- HOC как Decorator в React\n- Composite для рекурсивных структур\n- Flyweight для больших списков\n- Proxy для виртуализации',
                },
              ],
            },
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Избыточное использование паттернов\n- Глубокая вложенность декораторов\n- Facade для простых операций\n- Proxy без реальной необходимости\n- Flyweight для малого числа объектов\n- Bridge там, где достаточно простого интерфейса',
                },
              ],
            },
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Начинайте с простых решений\n- Применяйте паттерны по мере роста\n- Документируйте использование паттернов\n- Тестируйте каждый слой отдельно\n- Профилируйте производительность\n- Рефакторите постепенно',
                },
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
          id: 'text-79',
          type: 'prose',
          markdown:
            '**Структурные паттерны** помогают организовать связи между объектами эффективно и гибко. **Adapter, Decorator, Facade** — самые частые в React. **Proxy и Flyweight** — для оптимизации производительности. **Composite** — для древовидных структур. **Bridge** — для разделения абстракции и реализации. Выбирайте паттерн в зависимости от конкретной проблемы, избегайте избыточной сложности.',
        },
        {
          id: 'resources-80',
          type: 'resources',
          items: [
            {
              id: 'link-81',
              label: 'Refactoring Guru',
              url: 'https://refactoring.guru/design-patterns/structural-patterns',
            },
          ],
        },
        {
          id: 'resources-82',
          type: 'resources',
          items: [
            {
              id: 'link-83',
              label: 'Patterns.dev',
              url: 'https://www.patterns.dev/posts/classic-design-patterns',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
