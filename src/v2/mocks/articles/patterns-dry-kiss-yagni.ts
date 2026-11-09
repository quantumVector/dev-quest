import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/patterns/patterns-dry-kiss-yagni-drybadsnippet.txt?raw'
import example2 from '../snippets/patterns/patterns-dry-kiss-yagni-drygoodsnippet.txt?raw'
import example3 from '../snippets/patterns/patterns-dry-kiss-yagni-kissbadsnippet.txt?raw'
import example4 from '../snippets/patterns/patterns-dry-kiss-yagni-kissgoodsnippet.txt?raw'
import example5 from '../snippets/patterns/patterns-dry-kiss-yagni-yagnibadsnippet.txt?raw'
import example6 from '../snippets/patterns/patterns-dry-kiss-yagni-yagnigoodsnippet.txt?raw'
import example7 from '../snippets/patterns/patterns-dry-kiss-yagni-combinedexamplesnippet.txt?raw'
import example8 from '../snippets/patterns/patterns-dry-kiss-yagni-practicalexamplesnippet.txt?raw'
import example9 from '../snippets/patterns/patterns-dry-kiss-yagni-balanceexamplesnippet.txt?raw'

// Content copied verbatim from src/views/patterns/DryKissYagni.vue.
export default {
  ...articleSummaries.patternsDryKissYagni,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**DRY, KISS и YAGNI** — три ключевых принципа программирования, которые помогают писать поддерживаемый, понятный и эффективный код. Понимание этих принципов и умение их применять — важный навык для любого разработчика.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Расшифровка принципов',
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
                  text: 'DRY',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown: "Don't Repeat Yourself",
                },
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown: 'Не повторяйся',
                },
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown:
                    'Каждая часть знания должна иметь единственное, недвусмысленное, авторитетное представление в системе',
                },
              ],
            },
            {
              id: 'card-8',
              blocks: [
                {
                  id: 'heading-9',
                  type: 'heading',
                  level: 3,
                  text: 'KISS',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown: 'Keep It Simple, Stupid',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown: 'Делай проще',
                },
                {
                  id: 'text-12',
                  type: 'prose',
                  markdown: 'Простые решения работают лучше сложных. Не усложняй без необходимости',
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
                  text: 'YAGNI',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: "You Aren't Gonna Need It",
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: 'Тебе это не понадобится',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: 'Не добавляй функциональность, пока она действительно не понадобится',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: "1. DRY (Don't Repeat Yourself)",
      blocks: [
        {
          id: 'heading-18',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение DRY',
        },
        {
          id: 'callout-19',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-20',
              type: 'prose',
              markdown:
                '**Проблема:** Дублирование кода приводит к проблемам с поддержкой — изменение логики требует правок в нескольких местах',
            },
          ],
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'heading-22',
          type: 'heading',
          level: 3,
          text: '✅ Следование DRY',
        },
        {
          id: 'callout-23',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-24',
              type: 'prose',
              markdown:
                '**Решение:** Единый источник истины — логика в одном месте, легко изменить и протестировать',
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: '2. KISS (Keep It Simple, Stupid)',
      blocks: [
        {
          id: 'heading-26',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение KISS',
        },
        {
          id: 'callout-27',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-28',
              type: 'prose',
              markdown:
                '**Проблема:** Излишняя сложность затрудняет понимание, отладку и поддержку кода',
            },
          ],
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'heading-30',
          type: 'heading',
          level: 3,
          text: '✅ Следование KISS',
        },
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown: '**Решение:** Простое решение легко понять, поддерживать и отлаживать',
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-4',
      title: "3. YAGNI (You Aren't Gonna Need It)",
      blocks: [
        {
          id: 'heading-34',
          type: 'heading',
          level: 3,
          text: '❌ Нарушение YAGNI',
        },
        {
          id: 'callout-35',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-36',
              type: 'prose',
              markdown:
                '**Проблема:** Преждевременная оптимизация и избыточная функциональность усложняют код и замедляют разработку',
            },
          ],
        },
        {
          id: 'code-37',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-38',
          type: 'heading',
          level: 3,
          text: '✅ Следование YAGNI',
        },
        {
          id: 'callout-39',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-40',
              type: 'prose',
              markdown:
                '**Решение:** Минимально необходимая функциональность — добавляй только то, что нужно сейчас',
            },
          ],
        },
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Комбинация принципов',
      blocks: [
        {
          id: 'text-42',
          type: 'prose',
          markdown:
            'DRY, KISS и YAGNI работают вместе, создавая синергию для написания чистого кода:',
        },
        {
          id: 'code-43',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Практический пример: React компонент',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Взаимосвязь принципов',
      blocks: [
        {
          id: 'table-45',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Принцип',
            },
            {
              id: 'column-2',
              label: 'Основная идея',
            },
            {
              id: 'column-3',
              label: 'Как дополняет другие',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '**DRY**',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Избегать дублирования',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'KISS: абстракция должна быть простой',
                  },
                  {
                    id: 'break-49',
                    type: 'line-break',
                  },
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'YAGNI: не создавай абстракции заранее',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '**KISS**',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Простота решений',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'DRY: простота через переиспользование',
                  },
                  {
                    id: 'break-54',
                    type: 'line-break',
                  },
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'YAGNI: простота через минимализм',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**YAGNI**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Только необходимое',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'DRY: абстракции по мере необходимости',
                  },
                  {
                    id: 'break-59',
                    type: 'line-break',
                  },
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: 'KISS: меньше кода = проще код',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Баланс принципов',
      blocks: [
        {
          id: 'text-61',
          type: 'prose',
          markdown: 'Иногда принципы могут конфликтовать. Важно найти правильный баланс:',
        },
        {
          id: 'code-62',
          type: 'code',
          language: 'javascript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Когда применять каждый принцип',
      blocks: [
        {
          id: 'cards-63',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-64',
              title: 'DRY применяй когда:',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Одинаковая логика в 2\\+ местах\n- Изменения требуют правок везде\n- Абстракция будет понятной\n- Код действительно повторяется',
                },
                {
                  id: 'heading-66',
                  type: 'heading',
                  level: 4,
                  text: 'НЕ применяй когда:',
                },
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- Код похож, но логика разная\n- Абстракция сложнее дублирования\n- Это преждевременная оптимизация',
                },
              ],
            },
            {
              id: 'card-68',
              title: 'KISS применяй всегда:',
              blocks: [
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- При написании нового кода\n- При рефакторинге\n- При code review\n- Выбирая между решениями',
                },
                {
                  id: 'heading-70',
                  type: 'heading',
                  level: 4,
                  text: 'Исключения:',
                },
                {
                  id: 'text-71',
                  type: 'prose',
                  markdown:
                    '- Сложность — часть требований\n- Производительность критична\n- Нужна гибкость архитектуры',
                },
              ],
            },
            {
              id: 'card-72',
              title: 'YAGNI применяй когда:',
              blocks: [
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Добавляешь новую функцию\n- Планируешь архитектуру\n- "А что если нам понадобится..."\n- Строишь MVP',
                },
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 4,
                  text: 'НЕ применяй когда:',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Функция в текущих требованиях\n- Базовая расширяемость нужна\n- Рефакторинг дороже доработки',
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
          id: 'text-76',
          type: 'prose',
          markdown:
            '1. **Как DRY, KISS и YAGNI связаны между собой?**\n   \n   Они дополняют друг друга: **DRY** убирает дублирование, **KISS** следит за простотой решения, **YAGNI** предотвращает избыточность. Вместе они создают код, который легко понять, изменить и поддерживать.\n2. **Может ли следование DRY нарушить KISS?**\n   \n   Да. Чрезмерная абстракция ради устранения небольшого дублирования может усложнить код. Иногда два простых метода лучше одного универсального, но сложного. Правило: если абстракция сложнее дублирования — оставь дублирование.\n3. **Когда можно нарушить YAGNI?**\n   \n   Когда функциональность уже в требованиях, когда базовая расширяемость критична (например, plugin system), или когда будущий рефакторинг обойдется намного дороже. Но "может пригодиться" — не причина.\n4. **Как определить, что код следует принципам?**\n   \n   **DRY:** изменение логики требует правки только в одном месте. **KISS:** новый разработчик понимает код за 5 минут. **YAGNI:** каждая строка кода используется в продакшене.\n5. **Приведи пример конфликта принципов**\n   \n   Создание универсального компонента Button с 20 пропсами (DRY) vs создание нескольких простых компонентов PrimaryButton, SecondaryButton (KISS). Решение зависит от контекста: для UI\\-kit лучше универсальный, для конкретного приложения — специализированные.\n6. **Что важнее в спорной ситуации?**\n   \n   **KISS** обычно важнее остальных. Простой код легче рефакторить в DRY и легче расширять при нарушении YAGNI. Сложный код проблематичен всегда. Правило: в сомнениях выбирай простоту.',
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Чеклист применения принципов',
      blocks: [
        {
          id: 'cards-77',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-78',
              title: '✅ Хорошие признаки',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Код легко читается\n- Изменения локализованы\n- Нет мертвого кода\n- Минимум абстракций\n- Понятные имена\n- Каждая функция используется\n- Новички понимают код\n- Легко тестировать',
                },
              ],
            },
            {
              id: 'card-80',
              title: '❌ Плохие признаки',
              blocks: [
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Copy\\-paste в нескольких местах\n- Сложные абстракции\n- Неиспользуемый код\n- "На будущее" функции\n- Глубокая вложенность\n- Непонятные имена\n- Долгие объяснения логики\n- Сложные тесты',
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
          id: 'text-82',
          type: 'prose',
          markdown:
            '**DRY, KISS и YAGNI** — это не жесткие правила, а ориентиры для принятия решений. **DRY** помогает избежать дублирования, **KISS** сохраняет простоту, **YAGNI** предотвращает избыточность. Их комбинация создает код, который легко понять, изменить и поддерживать. Ключ к мастерству — понимание, когда и как применять каждый принцип, находя баланс между ними в зависимости от контекста.',
        },
        {
          id: 'resources-83',
          type: 'resources',
          items: [
            {
              id: 'link-84',
              label: 'DRY Principle',
              url: 'https://www.artima.com/articles/orthogonality-and-the-dry-principle',
            },
          ],
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'KISS & YAGNI',
              url: 'https://en.wikipedia.org/wiki/KISS_principle',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
