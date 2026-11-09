import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/testing/testing-pyramid-pyramiddistributionsnippet.txt?raw'
import example2 from '../snippets/testing/testing-pyramid-unittestexamplesnippet.txt?raw'
import example3 from '../snippets/testing/testing-pyramid-integrationtestexamplesnippet.txt?raw'
import example4 from '../snippets/testing/testing-pyramid-e2etestexamplesnippet.txt?raw'
import example5 from '../snippets/testing/testing-pyramid-antipatternssnippet.txt?raw'
import example6 from '../snippets/testing/testing-pyramid-cicdintegrationsnippet.txt?raw'
import example7 from '../snippets/testing/testing-pyramid-cicdstrategysnippet.txt?raw'
import example8 from '../snippets/testing/testing-pyramid-optimizationtipssnippet.txt?raw'

// Content copied verbatim from src/views/testing/TestingPyramid.vue.
export default {
  ...articleSummaries.testingTestingPyramid,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Пирамида тестирования** — это концепция распределения автоматизированных тестов по уровням, где основание составляют быстрые и дешевые unit\\-тесты, середина — integration\\-тесты средней сложности, а вершина — медленные и дорогие E2E\\-тесты. Цель: максимальное покрытие при минимальных затратах времени.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Что такое пирамида тестирования?',
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
                  text: 'Концепция',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    'Метафора распределения тестов: много быстрых тестов в основании, мало медленных на вершине',
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
                  text: 'Цель',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    'Оптимальный баланс между скоростью выполнения тестов, стоимостью поддержки и уверенностью в качестве',
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
                  text: 'Результат',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    'Быстрая обратная связь разработчикам, высокое покрытие кода, стабильные тесты в CI/CD',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Визуализация пирамиды',
      blocks: [
        {
          id: 'cards-12',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-13',
              blocks: [
                {
                  id: 'widget-14',
                  type: 'widget',
                  name: 'testing-pyramid',
                  props: {
                    levels: [
                      {
                        id: 'level-1',
                        label: 'E2E Tests',
                        percent: 10,
                      },
                      {
                        id: 'level-2',
                        label: 'Integration Tests',
                        percent: 30,
                      },
                      {
                        id: 'level-3',
                        label: 'Unit Tests',
                        percent: 60,
                      },
                    ],
                  },
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: '**E2E Tests (10%)**',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: '⏱️ Медленные (минуты) • 💰 Дорогие • 🔴 Хрупкие',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: '**Integration Tests (30%)**',
                },
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown: '⏱️ Средние (секунды) • 💰 Умеренные • 🟡 Стабильные',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: '**Unit Tests (60%)**',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: '⏱️ Быстрые (мс) • 💰 Дешевые • 🟢 Очень стабильные',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Идеальное распределение тестов',
      blocks: [
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Основные уровни пирамиды',
      blocks: [
        {
          id: 'heading-22',
          type: 'heading',
          level: 3,
          text: '1. Unit Tests — основание пирамиды (60%)',
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
                '**Характеристика:** Тестируют отдельные функции/методы в полной изоляции. Выполняются за миллисекунды, стабильны, легко поддерживаются.',
            },
          ],
        },
        {
          id: 'code-25',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'table-26',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Значение',
            },
            {
              id: 'column-3',
              label: 'Почему важно',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: '**Скорость**',
                  },
                ],
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: 'Миллисекунды',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Мгновенная обратная связь',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '**Стабильность**',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'Очень высокая',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: 'Нет внешних зависимостей',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '**Стоимость**',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Просто писать и поддерживать',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Точность**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'Точно указывает на проблему',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '**Покрытие**',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '60% тестов',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Основа всей пирамиды',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'heading-42',
          type: 'heading',
          level: 3,
          text: '2. Integration Tests — середина пирамиды (30%)',
        },
        {
          id: 'callout-43',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-44',
              type: 'prose',
              markdown:
                '**Характеристика:** Проверяют взаимодействие между модулями, API, базами данных. Выполняются за секунды, умеренная стоимость.',
            },
          ],
        },
        {
          id: 'code-45',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'table-46',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Значение',
            },
            {
              id: 'column-3',
              label: 'Почему важно',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '**Скорость**',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: 'Секунды',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Приемлемо для CI/CD',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Стабильность**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Зависит от внешних сервисов',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '**Стоимость**',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: 'Требует настройки окружения',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Уверенность**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Проверяет реальное взаимодействие',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '**Покрытие**',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '30% тестов',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: 'Критичные интеграции',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'heading-62',
          type: 'heading',
          level: 3,
          text: '3. E2E Tests — вершина пирамиды (10%)',
        },
        {
          id: 'callout-63',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-64',
              type: 'prose',
              markdown:
                '**Характеристика:** Тестируют полные пользовательские сценарии через UI. Выполняются за минуты, дорогие, хрупкие. ТОЛЬКО критичные сценарии!',
            },
          ],
        },
        {
          id: 'code-65',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
        {
          id: 'table-66',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Характеристика',
            },
            {
              id: 'column-2',
              label: 'Значение',
            },
            {
              id: 'column-3',
              label: 'Почему важно',
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
                    markdown: '**Скорость**',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: 'Минуты',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Тормозит CI/CD',
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
                    markdown: '**Стабильность**',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: 'Низкая (flaky)',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: 'Зависит от UI, сети, timing',
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
                    markdown: '**Стоимость**',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: 'Сложно писать и поддерживать',
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
                    markdown: '**Уверенность**',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'Максимальная',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Тестирует как пользователь',
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
                    markdown: '**Покрытие**',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '10% тестов',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'Только критичные флоу',
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
      title: 'Как распределение помогает качеству?',
      blocks: [
        {
          id: 'cards-82',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-83',
              blocks: [
                {
                  id: 'heading-84',
                  type: 'heading',
                  level: 3,
                  text: 'Скорость разработки',
                },
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Unit тесты дают мгновенную обратную связь\n- Разработчики могут итерироваться быстро\n- Меньше времени на ожидание тестов\n- CI/CD пайплайн выполняется за минуты',
                },
              ],
            },
            {
              id: 'card-86',
              blocks: [
                {
                  id: 'heading-87',
                  type: 'heading',
                  level: 3,
                  text: 'Уверенность в качестве',
                },
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- Unit тесты покрывают всю логику\n- Integration тесты проверяют связи\n- E2E тесты гарантируют работу флоу\n- Баланс между скоростью и покрытием',
                },
              ],
            },
            {
              id: 'card-89',
              blocks: [
                {
                  id: 'heading-90',
                  type: 'heading',
                  level: 3,
                  text: 'Экономия ресурсов',
                },
                {
                  id: 'text-91',
                  type: 'prose',
                  markdown:
                    '- Меньше времени CI/CD → меньше затрат\n- Простые тесты легче поддерживать\n- Раннее обнаружение багов дешевле\n- Меньше flaky тестов → меньше reruns',
                },
              ],
            },
            {
              id: 'card-92',
              blocks: [
                {
                  id: 'heading-93',
                  type: 'heading',
                  level: 3,
                  text: 'Масштабируемость',
                },
                {
                  id: 'text-94',
                  type: 'prose',
                  markdown:
                    '- Легко добавлять новые unit тесты\n- Параллелизация быстрых тестов\n- E2E тесты не растут неконтролируемо\n- Пропорции сохраняются при росте',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: '❌ Антипаттерны пирамиды тестирования',
      blocks: [
        {
          id: 'code-95',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Оптимальный подход на каждом уровне',
      blocks: [
        {
          id: 'accordion-96',
          type: 'accordion',
          items: [
            {
              id: 'question-97',
              title: '**Unit Tests — когда и как тестировать**',
              blocks: [
                {
                  id: 'heading-98',
                  type: 'heading',
                  level: 4,
                  text: '✅ Что тестировать',
                },
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    '- Чистые функции без побочных эффектов\n- Бизнес\\-логику и алгоритмы\n- Валидаторы и парсеры\n- Утилиты и хелперы\n- Форматирование данных\n- Математические вычисления',
                },
                {
                  id: 'heading-100',
                  type: 'heading',
                  level: 4,
                  text: '❌ Что НЕ тестировать',
                },
                {
                  id: 'text-101',
                  type: 'prose',
                  markdown:
                    '- Приватные методы (тестируйте публичный API)\n- Тривиальный код (геттеры/сеттеры)\n- Сторонние библиотеки\n- Автогенерированный код',
                },
                {
                  id: 'heading-102',
                  type: 'heading',
                  level: 4,
                  text: '🎯 Лучшие практики',
                },
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- Один тест = одна логическая проверка\n- Описательные имена тестов\n- AAA паттерн (Arrange\\-Act\\-Assert)\n- Мокать все внешние зависимости\n- Независимые тесты\n- Быстрое выполнение (&lt; 10ms)',
                },
              ],
            },
            {
              id: 'question-104',
              title: '**Integration Tests — фокус на взаимодействии**',
              blocks: [
                {
                  id: 'heading-105',
                  type: 'heading',
                  level: 4,
                  text: '✅ Что тестировать',
                },
                {
                  id: 'text-106',
                  type: 'prose',
                  markdown:
                    '- API endpoints и контракты\n- Взаимодействие с базой данных\n- Интеграцию с внешними сервисами\n- Кэш и очереди сообщений\n- Middleware и плагины\n- Сложные workflow между модулями',
                },
                {
                  id: 'heading-107',
                  type: 'heading',
                  level: 4,
                  text: '⚙️ Как тестировать',
                },
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    '- Тестовая БД (in\\-memory или docker)\n- Моки только для внешних API\n- Проверка контрактов и схем\n- Валидация data flow\n- Проверка транзакций и rollback',
                },
                {
                  id: 'heading-109',
                  type: 'heading',
                  level: 4,
                  text: '🎯 Лучшие практики',
                },
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    '- Изолированная тестовая среда\n- Cleanup после каждого теста\n- Переиспользование соединений\n- Тестовые fixtures для данных\n- Таймауты для async операций',
                },
              ],
            },
            {
              id: 'question-111',
              title: '**E2E Tests — только критичные сценарии**',
              blocks: [
                {
                  id: 'heading-112',
                  type: 'heading',
                  level: 4,
                  text: '✅ Что тестировать',
                },
                {
                  id: 'text-113',
                  type: 'prose',
                  markdown:
                    '- **Happy path** критичных флоу (регистрация, оплата)\n- Основные ошибки пользователя\n- Критичную безопасность (авторизация)\n- Ключевые конверсионные воронки\n- Smoke тесты после деплоя',
                },
                {
                  id: 'heading-114',
                  type: 'heading',
                  level: 4,
                  text: '❌ Что НЕ тестировать',
                },
                {
                  id: 'text-115',
                  type: 'prose',
                  markdown:
                    '- Все возможные комбинации (это unit тесты)\n- Детальную валидацию форм\n- Все edge cases\n- UI компоненты изолированно',
                },
                {
                  id: 'heading-116',
                  type: 'heading',
                  level: 4,
                  text: '🎯 Лучшие практики',
                },
                {
                  id: 'text-117',
                  type: 'prose',
                  markdown:
                    '- Переиспользование авторизации\n- Page Object Model паттерн\n- Умные ожидания (не фиксированные таймауты)\n- Скриншоты/видео при падении\n- Retry стратегия для flaky тестов\n- Запуск только перед production деплоем',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Пирамида тестирования и CI/CD',
      blocks: [
        {
          id: 'callout-118',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-119',
              type: 'prose',
              markdown:
                '**Связь с CI/CD:** Пирамида определяет стратегию запуска тестов в конвейере. Быстрые тесты запускаются часто, медленные — только на важных этапах.',
            },
          ],
        },
        {
          id: 'code-120',
          type: 'code',
          language: 'yaml',
          code: example6,
        },
        {
          id: 'heading-121',
          type: 'heading',
          level: 3,
          text: 'Стратегия запуска тестов по этапам',
        },
        {
          id: 'code-122',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Оптимизация скорости выполнения',
      blocks: [
        {
          id: 'code-123',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Метрики эффективности пирамиды',
      blocks: [
        {
          id: 'cards-124',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-125',
              title: '✅ Здоровая пирамида',
              blocks: [
                {
                  id: 'table-126',
                  type: 'table',
                  columns: [
                    {
                      id: 'column-1',
                    },
                    {
                      id: 'column-2',
                    },
                  ],
                  rows: [
                    {
                      id: 'row-1',
                      cells: [
                        [
                          {
                            id: 'text-127',
                            type: 'prose',
                            markdown: '**Распределение:**',
                          },
                        ],
                        [
                          {
                            id: 'text-128',
                            type: 'prose',
                            markdown: '60% / 30% / 10%',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-2',
                      cells: [
                        [
                          {
                            id: 'text-129',
                            type: 'prose',
                            markdown: '**Время CI:**',
                          },
                        ],
                        [
                          {
                            id: 'text-130',
                            type: 'prose',
                            markdown: '&lt; 10 минут',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-3',
                      cells: [
                        [
                          {
                            id: 'text-131',
                            type: 'prose',
                            markdown: '**Flaky тесты:**',
                          },
                        ],
                        [
                          {
                            id: 'text-132',
                            type: 'prose',
                            markdown: '&lt; 2%',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-4',
                      cells: [
                        [
                          {
                            id: 'text-133',
                            type: 'prose',
                            markdown: '**Скорость unit:**',
                          },
                        ],
                        [
                          {
                            id: 'text-134',
                            type: 'prose',
                            markdown: '&lt; 5 минут',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-5',
                      cells: [
                        [
                          {
                            id: 'text-135',
                            type: 'prose',
                            markdown: '**Coverage:**',
                          },
                        ],
                        [
                          {
                            id: 'text-136',
                            type: 'prose',
                            markdown: '80%\\+',
                          },
                        ],
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-137',
              title: '❌ Проблемная пирамида',
              blocks: [
                {
                  id: 'table-138',
                  type: 'table',
                  columns: [
                    {
                      id: 'column-1',
                    },
                    {
                      id: 'column-2',
                    },
                  ],
                  rows: [
                    {
                      id: 'row-1',
                      cells: [
                        [
                          {
                            id: 'text-139',
                            type: 'prose',
                            markdown: '**Распределение:**',
                          },
                        ],
                        [
                          {
                            id: 'text-140',
                            type: 'prose',
                            markdown: '20% / 30% / 50%',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-2',
                      cells: [
                        [
                          {
                            id: 'text-141',
                            type: 'prose',
                            markdown: '**Время CI:**',
                          },
                        ],
                        [
                          {
                            id: 'text-142',
                            type: 'prose',
                            markdown: '&gt; 30 минут',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-3',
                      cells: [
                        [
                          {
                            id: 'text-143',
                            type: 'prose',
                            markdown: '**Flaky тесты:**',
                          },
                        ],
                        [
                          {
                            id: 'text-144',
                            type: 'prose',
                            markdown: '&gt; 10%',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-4',
                      cells: [
                        [
                          {
                            id: 'text-145',
                            type: 'prose',
                            markdown: '**Скорость unit:**',
                          },
                        ],
                        [
                          {
                            id: 'text-146',
                            type: 'prose',
                            markdown: '&gt; 15 минут',
                          },
                        ],
                      ],
                    },
                    {
                      id: 'row-5',
                      cells: [
                        [
                          {
                            id: 'text-147',
                            type: 'prose',
                            markdown: '**Coverage:**',
                          },
                        ],
                        [
                          {
                            id: 'text-148',
                            type: 'prose',
                            markdown: '&lt; 50%',
                          },
                        ],
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-149',
          type: 'prose',
          markdown:
            '1. **Почему нельзя делать только E2E тесты, если они дают максимальную уверенность?**\n   \n   E2E тесты медленные (минуты вместо миллисекунд), хрупкие (падают из\\-за изменений UI), дорогие в поддержке и сложно отлаживать. Если все тесты E2E, CI займет часы, разработка замедлится, а при падении теста непонятно, где именно проблема.\n2. **Что плохого в перевернутой пирамиде (Ice Cream Cone)?**\n   \n   Когда E2E тестов больше всего — тесты выполняются часами, постоянно падают без причины (flaky), невозможно быстро найти проблему, высокая стоимость поддержки. Это тормозит всю разработку и снижает доверие к тестам.\n3. **Как пирамида связана с CI/CD?**\n   \n   Пирамида определяет, какие тесты когда запускать: unit тесты — при каждом коммите (секунды), integration — при PR (минуты), E2E — только перед production (десятки минут). Это позволяет иметь быструю обратную связь без блокировки пайплайна.\n4. **Почему именно 60/30/10, а не другое соотношение?**\n   \n   Это не строгое правило, а рекомендация основанная на практике. Важен принцип: больше быстрых, меньше медленных. В вашем проекте может быть 70/25/5 или 50/35/15 в зависимости от специфики. Главное — избегать перевернутой пирамиды.\n5. **Что делать, если у нас уже есть 100 E2E тестов, которые выполняются 2 часа?**\n   \n   Провести рефакторинг: оставить только критичные E2E сценарии (~10\\-15 тестов), остальные покрыть unit и integration тестами. Критичные E2E запускать только перед production деплоем, а для PR достаточно smoke тестов. Параллелизация также помогает ускорить выполнение.\n6. **Как измерить эффективность пирамиды в проекте?**\n   \n   Метрики: время выполнения CI/CD (должно быть &lt; 10 минут для unit\\+integration), процент flaky тестов (&lt; 2%), соотношение количества тестов по уровням, coverage (80%\\+), время на отладку падающих тестов. Если CI занимает часы или тесты постоянно падают — пирамида нездорова.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Практические рекомендации',
      blocks: [
        {
          id: 'cards-150',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-151',
              blocks: [
                {
                  id: 'heading-152',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-153',
                  type: 'prose',
                  markdown:
                    '- Начинать с unit тестов\n- Следить за соотношением 60/30/10\n- Мониторить время CI/CD\n- Параллелизировать unit тесты\n- Использовать моки активно\n- E2E только для критичных флоу\n- Измерять метрики пирамиды',
                },
              ],
            },
            {
              id: 'card-154',
              blocks: [
                {
                  id: 'heading-155',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-156',
                  type: 'prose',
                  markdown:
                    '- Перевернутой пирамиды\n- Тестирования всего через UI\n- Игнорирования flaky тестов\n- E2E для каждой фичи\n- Медленных unit тестов\n- Зависимости между тестами\n- Блокирующих CI/CD пайплайнов',
                },
              ],
            },
            {
              id: 'card-157',
              blocks: [
                {
                  id: 'heading-158',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-159',
                  type: 'prose',
                  markdown:
                    '- Ревью пирамиды раз в квартал\n- Измеряйте ROI каждого уровня\n- Обучайте команду принципам\n- Автоматизируйте проверку метрик\n- Проводите test debt спринты\n- Документируйте стратегию\n- Адаптируйте под свой проект',
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
          id: 'text-160',
          type: 'prose',
          markdown:
            '**Пирамида тестирования** — это фундаментальная концепция, обеспечивающая баланс между скоростью обратной связи, уверенностью в качестве и стоимостью поддержки. Правильное распределение тестов (60% unit, 30% integration, 10% E2E) позволяет получать быструю обратную связь, поддерживать высокое покрытие и не тормозить CI/CD пайплайн. Пирамида — это не догма, а практичный подход, доказавший эффективность в реальных проектах.',
        },
        {
          id: 'resources-161',
          type: 'resources',
          items: [
            {
              id: 'link-162',
              label: 'Martin Fowler: Test Pyramid',
              url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
            },
          ],
        },
        {
          id: 'resources-163',
          type: 'resources',
          items: [
            {
              id: 'link-164',
              label: 'Google Testing Blog',
              url: 'https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
