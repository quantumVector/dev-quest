import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/testing/testing-intro-unittestsnippet.txt?raw'
import example2 from '../snippets/testing/testing-intro-integrationtestsnippet.txt?raw'
import example3 from '../snippets/testing/testing-intro-e2etestsnippet.txt?raw'
import example4 from '../snippets/testing/testing-intro-reactcomponenttestsnippet.txt?raw'
import example5 from '../snippets/testing/testing-intro-tddexamplesnippet.txt?raw'
import example6 from '../snippets/testing/testing-intro-mockingexamplesnippet.txt?raw'
import example7 from '../snippets/testing/testing-intro-coverageexamplesnippet.txt?raw'

// Content copied verbatim from src/views/testing/TestingIntro.vue.
export default {
  ...articleSummaries.testingTestingIntro,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Тестирование** — это процесс проверки программного обеспечения на соответствие требованиям, обнаружения ошибок и подтверждения качества кода. Автоматизированное тестирование позволяет быстро проверять работоспособность приложения после изменений и предотвращать регрессии.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Зачем нужно тестирование?',
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
                  text: 'Качество кода',
                },
                {
                  id: 'text-5',
                  type: 'prose',
                  markdown:
                    '- Раннее обнаружение багов\n- Предотвращение регрессий\n- Уверенность при рефакторинге\n- Документация поведения',
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
                  text: 'Скорость разработки',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- Быстрая обратная связь\n- Автоматизация проверок\n- Снижение времени отладки\n- Упрощение интеграции',
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
                  text: 'Командная работа',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- Безопасность изменений\n- Понятная документация\n- Стандартизация подходов\n- Упрощение code review',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Виды тестирования',
      blocks: [
        {
          id: 'heading-12',
          type: 'heading',
          level: 3,
          text: '1. Unit Testing (Модульное тестирование)',
        },
        {
          id: 'callout-13',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-14',
              type: 'prose',
              markdown:
                '**Цель:** Тестирование отдельных функций, методов и компонентов в изоляции',
            },
          ],
        },
        {
          id: 'code-15',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
        {
          id: 'cards-16',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-17',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-18',
                  type: 'prose',
                  markdown:
                    '- Быстрое выполнение\n- Простая отладка\n- Высокая изоляция\n- Легко писать и поддерживать',
                },
              ],
            },
            {
              id: 'card-19',
              title: '📋 Когда использовать',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Тестирование бизнес\\-логики\n- Утилитарные функции\n- Валидаторы и парсеры\n- Математические расчеты',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-21',
          type: 'heading',
          level: 3,
          text: '2. Integration Testing (Интеграционное тестирование)',
        },
        {
          id: 'callout-22',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-23',
              type: 'prose',
              markdown: '**Цель:** Проверка взаимодействия между несколькими модулями/компонентами',
            },
          ],
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'cards-25',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-26',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- Проверка реальных взаимодействий\n- Обнаружение проблем интеграции\n- Тестирование API контрактов\n- Проверка data flow',
                },
              ],
            },
            {
              id: 'card-28',
              title: '📋 Когда использовать',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-29',
                  type: 'prose',
                  markdown:
                    '- API endpoints\n- Сервисы с зависимостями\n- Database queries\n- Внешние интеграции',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-30',
          type: 'heading',
          level: 3,
          text: '3. E2E Testing (End-to-End тестирование)',
        },
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown:
                '**Цель:** Тестирование полных пользовательских сценариев от начала до конца',
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
        {
          id: 'cards-34',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-35',
              title: '✅ Преимущества',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-36',
                  type: 'prose',
                  markdown:
                    '- Тестирование как пользователь\n- Проверка всей системы\n- Высокая уверенность\n- Интеграция всех слоев',
                },
              ],
            },
            {
              id: 'card-37',
              title: '⚠️ Недостатки',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- Медленное выполнение\n- Сложность настройки\n- Flaky тесты\n- Дорогое поддержание',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-39',
          type: 'heading',
          level: 3,
          text: '4. Component Testing (Тестирование компонентов)',
        },
        {
          id: 'callout-40',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-41',
              type: 'prose',
              markdown: '**Цель:** Тестирование UI компонентов с их поведением и взаимодействиями',
            },
          ],
        },
        {
          id: 'code-42',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Пирамида тестирования',
      blocks: [
        {
          id: 'cards-43',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-44',
              blocks: [
                {
                  id: 'table-45',
                  type: 'table',
                  columns: [
                    {
                      id: 'column-1',
                      label: 'Уровень',
                    },
                    {
                      id: 'column-2',
                      label: 'Количество',
                    },
                    {
                      id: 'column-3',
                      label: 'Скорость',
                    },
                    {
                      id: 'column-4',
                      label: 'Стоимость',
                    },
                    {
                      id: 'column-5',
                      label: 'Уверенность',
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
                            markdown: '**E2E Tests**',
                          },
                        ],
                        [
                          {
                            id: 'text-47',
                            type: 'prose',
                            markdown: 'Мало (10%)',
                          },
                        ],
                        [
                          {
                            id: 'text-48',
                            type: 'prose',
                            markdown: 'Медленные',
                          },
                        ],
                        [
                          {
                            id: 'text-49',
                            type: 'prose',
                            markdown: 'Дорогие',
                          },
                        ],
                        [
                          {
                            id: 'text-50',
                            type: 'prose',
                            markdown: 'Высокая',
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
                            markdown: '**Integration Tests**',
                          },
                        ],
                        [
                          {
                            id: 'text-52',
                            type: 'prose',
                            markdown: 'Средне (30%)',
                          },
                        ],
                        [
                          {
                            id: 'text-53',
                            type: 'prose',
                            markdown: 'Средние',
                          },
                        ],
                        [
                          {
                            id: 'text-54',
                            type: 'prose',
                            markdown: 'Средние',
                          },
                        ],
                        [
                          {
                            id: 'text-55',
                            type: 'prose',
                            markdown: 'Средняя',
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
                            markdown: '**Unit Tests**',
                          },
                        ],
                        [
                          {
                            id: 'text-57',
                            type: 'prose',
                            markdown: 'Много (60%)',
                          },
                        ],
                        [
                          {
                            id: 'text-58',
                            type: 'prose',
                            markdown: 'Быстрые',
                          },
                        ],
                        [
                          {
                            id: 'text-59',
                            type: 'prose',
                            markdown: 'Дешевые',
                          },
                        ],
                        [
                          {
                            id: 'text-60',
                            type: 'prose',
                            markdown: 'Базовая',
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
      id: 'section-4',
      title: 'TDD (Test-Driven Development)',
      blocks: [
        {
          id: 'callout-61',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-62',
              type: 'prose',
              markdown:
                '**RED** → Пишем падающий тест **GREEN** → Пишем минимальный код **REFACTOR** → Улучшаем код',
            },
          ],
        },
        {
          id: 'code-63',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Mocking — подмена зависимостей',
      blocks: [
        {
          id: 'text-64',
          type: 'prose',
          markdown:
            '**Моки, стабы и шпионы** позволяют изолировать тестируемый код от внешних зависимостей',
        },
        {
          id: 'code-65',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Code Coverage (Покрытие кода)',
      blocks: [
        {
          id: 'code-66',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнение фреймворков тестирования',
      blocks: [
        {
          id: 'table-67',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Фреймворк',
            },
            {
              id: 'column-2',
              label: 'Тип',
            },
            {
              id: 'column-3',
              label: 'Особенности',
            },
            {
              id: 'column-4',
              label: 'Популярность',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**Jest**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Unit/Integration',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Zero config, snapshots, coverage',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '**Vitest**',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: 'Unit/Integration',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown: 'Vite native, fast, Jest compatible',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '**Playwright**',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown: 'E2E',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: 'Multi\\-browser, auto\\-wait, трассировка',
                  },
                ],
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown: '**Cypress**',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: 'E2E',
                  },
                ],
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Developer experience, time travel',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '**Testing Library**',
                  },
                ],
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Component',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'User\\-centric, accessibility',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '**Mocha**',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Unit/Integration',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Гибкость, большая экосистема',
                  },
                ],
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: '⭐⭐⭐',
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
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-92',
          type: 'prose',
          markdown:
            '1. **В чем разница между Unit и Integration тестами?**\n   \n   Unit тесты проверяют отдельные функции/методы в полной изоляции с моками всех зависимостей. Integration тесты проверяют взаимодействие нескольких модулей с реальными или частично подмененными зависимостями.\n2. **Что такое TDD и какие у него преимущества?**\n   \n   TDD (Test\\-Driven Development) — методология, где тест пишется до кода. Цикл: RED (падающий тест) → GREEN (минимальный код) → REFACTOR (улучшение). Преимущества: лучшая архитектура, полное покрытие, уверенность в рефакторинге, тесты как документация.\n3. **Зачем нужны моки (mocks)?**\n   \n   Моки позволяют изолировать тестируемый код от внешних зависимостей (API, база данных, сторонние сервисы). Это делает тесты быстрыми, предсказуемыми и независимыми от внешних факторов.\n4. **Что такое покрытие кода (code coverage) и какой процент достаточен?**\n   \n   Coverage показывает процент кода, выполненного при тестах. Метрики: lines, branches, functions, statements. 80%\\+ считается хорошим показателем, но важнее качество тестов, чем процент покрытия. 100% покрытие не гарантирует отсутствие багов.\n5. **Когда использовать E2E тесты?**\n   \n   E2E тесты используются для критических пользовательских сценариев (логин, оформление заказа, оплата). Они медленные и дорогие в поддержке, поэтому их должно быть мало — только для самых важных флоу приложения.\n6. **Что такое flaky тесты и как с ними бороться?**\n   \n   Flaky тесты — нестабильные тесты, которые иногда падают без изменений в коде. Причины: асинхронность, таймауты, зависимость от внешних сервисов. Решение: правильные ожидания, изоляция тестов, моки внешних зависимостей, retry механизмы.',
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Лучшие практики тестирования',
      blocks: [
        {
          id: 'cards-93',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-94',
              blocks: [
                {
                  id: 'heading-95',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-96',
                  type: 'prose',
                  markdown:
                    '- Следовать пирамиде тестирования\n- Писать независимые тесты\n- Тестировать поведение, не реализацию\n- Использовать описательные имена\n- Следовать AAA паттерну (Arrange\\-Act\\-Assert)\n- Мокать внешние зависимости',
                },
              ],
            },
            {
              id: 'card-97',
              blocks: [
                {
                  id: 'heading-98',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-99',
                  type: 'prose',
                  markdown:
                    '- Тестов зависимых друг от друга\n- Тестирования приватных методов\n- Слишком сложных тестов\n- Игнорирования падающих тестов\n- Погони за 100% coverage\n- Тестов без assert',
                },
              ],
            },
            {
              id: 'card-100',
              blocks: [
                {
                  id: 'heading-101',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-102',
                  type: 'prose',
                  markdown:
                    '- Запускайте тесты локально перед push\n- Интегрируйте в CI/CD\n- Используйте watch mode при разработке\n- Следите за временем выполнения\n- Регулярно обновляйте тесты\n- Документируйте сложные кейсы',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Итог',
      blocks: [
        {
          id: 'text-103',
          type: 'prose',
          markdown:
            '**Тестирование** — критически важная часть современной разработки, обеспечивающая качество, надежность и поддерживаемость кода. Правильная комбинация unit, integration и e2e тестов создает надежную систему проверок. TDD помогает писать лучший код, а автоматизация тестирования ускоряет разработку и снижает количество багов в production.',
        },
        {
          id: 'resources-104',
          type: 'resources',
          items: [
            {
              id: 'link-105',
              label: 'Martin Fowler: Testing',
              url: 'https://martinfowler.com/testing/',
            },
          ],
        },
        {
          id: 'resources-106',
          type: 'resources',
          items: [
            {
              id: 'link-107',
              label: 'Jest Documentation',
              url: 'https://jestjs.io/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
