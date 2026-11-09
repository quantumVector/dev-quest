import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-web-storage-api-basicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-web-storage-api-differencessnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-web-storage-api-datatypessnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-web-storage-api-helperfunctionssnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-web-storage-api-practicalexamplessnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-web-storage-api-securitysnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-web-storage-api-comparisonsnippet.txt?raw'

// Content copied verbatim from src/views/web-api/WebStorageAPI.vue.
export default {
  ...articleSummaries.webApiWebStorageAPI,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Storage API** предоставляет механизмы для хранения пар ключ\\-значение в браузере. Состоит из двух объектов: **localStorage** (постоянное хранилище) и **sessionStorage** (хранилище сессии). Оба хранят данные только в виде строк.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Основы работы с Web Storage',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Важно:** Оба API идентичны по методам, различаются только временем жизни и областью видимости данных',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Ключевые различия localStorage и sessionStorage',
      blocks: [
        {
          id: 'cards-5',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-6',
              blocks: [
                {
                  id: 'heading-7',
                  type: 'heading',
                  level: 3,
                  text: 'localStorage',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown:
                    '- **Время жизни:** Навсегда (пока не удалено)\n- **Область:** Все вкладки одного origin\n- **События:** Триггерит `storage` в других вкладках\n- **Размер:** ~5\\-10MB\n- **Использование:** Настройки, кэш, черновики',
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
                  text: 'sessionStorage',
                },
                {
                  id: 'text-11',
                  type: 'prose',
                  markdown:
                    '- **Время жизни:** До закрытия вкладки\n- **Область:** Только текущая вкладка\n- **События:** Не триггерит события\n- **Размер:** ~5\\-10MB\n- **Использование:** Формы, временные фильтры',
                },
              ],
            },
          ],
        },
        {
          id: 'code-12',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Типы данных в Web Storage',
      blocks: [
        {
          id: 'callout-13',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-14',
              type: 'prose',
              markdown:
                '**Критично:** Web Storage хранит ТОЛЬКО строки! Все остальные типы автоматически конвертируются в string',
            },
          ],
        },
        {
          id: 'table-15',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип данных',
            },
            {
              id: 'column-2',
              label: 'Прямое хранение',
            },
            {
              id: 'column-3',
              label: 'Способ хранения',
            },
            {
              id: 'column-4',
              label: 'Восстановление',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '`String`',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '✅ Да',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Нативно',
                  },
                ],
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: 'Без преобразования',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '`Number`',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: '⚠️ Конвертируется',
                  },
                ],
                [
                  {
                    id: 'text-22',
                    type: 'prose',
                    markdown: 'toString()',
                  },
                ],
                [
                  {
                    id: 'text-23',
                    type: 'prose',
                    markdown: 'Number() или parseInt()',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '`Boolean`',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: '⚠️ Конвертируется',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '"true" / "false"',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: "=== 'true'",
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '`Object`',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: 'JSON.stringify()',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'JSON.parse()',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '`Array`',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'JSON.stringify()',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'JSON.parse()',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`Date`',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: 'toISOString()',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'new Date()',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '`Map / Set`',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '❌ Нет',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: 'Array.from() \\+ JSON',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'new Map() / new Set()',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '`Function`',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '❌ Невозможно',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '\\-',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-48',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Универсальная обёртка для работы с типами',
      blocks: [
        {
          id: 'code-49',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-50',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Безопасность и ограничения',
      blocks: [
        {
          id: 'callout-51',
          type: 'callout',
          tone: 'error',
          blocks: [
            {
              id: 'text-52',
              type: 'prose',
              markdown:
                '**Безопасность:** НЕ храните пароли, токены и другие чувствительные данные в Web Storage! Они доступны из JavaScript и уязвимы к XSS атакам',
            },
          ],
        },
        {
          id: 'cards-53',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-54',
              title: 'Уязвимости',
              blocks: [
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown:
                    '- **XSS атаки:** JavaScript может читать Storage\n- **Переполнение:** QuotaExceededError при &gt;5MB\n- **Same\\-origin only:** Но подвержено XSS\n- **Нет шифрования:** Данные в открытом виде',
                },
              ],
            },
            {
              id: 'card-56',
              title: 'Защита',
              blocks: [
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- **httpOnly cookies** для токенов\n- **CSP** против inline скриптов\n- **Шифрование** чувствительных данных\n- **Валидация ключей** (prototype pollution)',
                },
              ],
            },
          ],
        },
        {
          id: 'code-58',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Сравнение Storage решений',
      blocks: [
        {
          id: 'code-59',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'События storage',
      blocks: [
        {
          id: 'cards-60',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-61',
              title: 'Событие storage триггерится только для localStorage',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Событие срабатывает в **других** вкладках того же origin\n- НЕ срабатывает в вкладке, где произошло изменение\n- Содержит информацию: `key`, `oldValue`, `newValue`, `url`, `storageArea`\n- sessionStorage НЕ триггерит события (изолирован)',
                },
                {
                  id: 'callout-63',
                  type: 'callout',
                  tone: 'info',
                  blocks: [
                    {
                      id: 'text-64',
                      type: 'prose',
                      markdown:
                        '**Использование:** Синхронизация состояния между вкладками, уведомления о logout/login, обновление UI',
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
      id: 'section-9',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-65',
          type: 'prose',
          markdown:
            '1. **В чем разница между localStorage и sessionStorage?**\n   \n   **Время жизни:** localStorage хранит данные навсегда (пока не удалены), sessionStorage — до закрытия вкладки. **Область видимости:** localStorage доступен во всех вкладках одного origin, sessionStorage изолирован в рамках одной вкладки. **События:** localStorage триггерит события в других вкладках, sessionStorage — нет.\n2. **Какие типы данных можно хранить в Storage?**\n   \n   Только строки! Все остальные типы автоматически конвертируются в string. Для объектов и массивов нужно использовать `JSON.stringify()` при сохранении и `JSON.parse()` при получении. Числа и boolean конвертируются автоматически, но требуют парсинга обратно.\n3. **Безопасно ли хранить токены в localStorage?**\n   \n   Нет, это небезопасно! localStorage доступен из JavaScript, что делает его уязвимым к XSS атакам. Если злоумышленник внедрит скрипт на страницу, он сможет прочитать все данные из Storage. Для токенов лучше использовать httpOnly cookies, недоступные из JavaScript.\n4. **Какой размер данных можно хранить в Web Storage?**\n   \n   Обычно 5\\-10MB в зависимости от браузера. При превышении лимита выбрасывается `QuotaExceededError`. Для больших объёмов данных лучше использовать IndexedDB, который поддерживает сотни мегабайт.\n5. **Как синхронизировать данные между вкладками?**\n   \n   Использовать событие `storage` для localStorage. Это событие автоматически срабатывает в других вкладках при изменении данных. Можно создать pub\\-sub систему для обмена сообщениями между вкладками. sessionStorage для этого не подходит (изолирован).\n6. **Что происходит с sessionStorage при открытии новой вкладки?**\n   \n   При открытии новой вкладки через ссылку (Ctrl\\+Click) или `window.open()` данные sessionStorage **копируются** в новую вкладку. Но после этого вкладки имеют независимые хранилища — изменения в одной не влияют на другую.\n7. **Как обработать переполнение Storage?**\n   \n   Оборачивать `setItem()` в try\\-catch и ловить `QuotaExceededError`. Стратегии: очистка старых данных, сжатие, использование LRU кеша, миграция на IndexedDB. Можно предварительно проверять размер данных перед сохранением.\n8. **Когда использовать localStorage, а когда sessionStorage?**\n   \n   **localStorage:** настройки пользователя, кэш данных, черновики, история — всё, что должно сохраняться между сессиями. **sessionStorage:** временные данные форм, фильтры, состояние UI, wizard navigation — всё, что актуально только в рамках текущей сессии вкладки.',
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-66',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-67',
              blocks: [
                {
                  id: 'heading-68',
                  type: 'heading',
                  level: 3,
                  text: '✅ Рекомендуется',
                },
                {
                  id: 'text-69',
                  type: 'prose',
                  markdown:
                    '- Использовать JSON для объектов\n- Обрабатывать QuotaExceededError\n- Валидировать данные при чтении\n- Создавать обёртки для типов\n- Очищать при logout\n- Использовать префиксы для ключей\n- Документировать схему данных',
                },
              ],
            },
            {
              id: 'card-70',
              blocks: [
                {
                  id: 'heading-71',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Хранения паролей и токенов\n- Сохранения функций\n- Прямого хранения объектов\n- Использования eval()\n- Игнорирования ошибок\n- Хранения PII без шифрования\n- Превышения лимита 5MB',
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
                  text: '💡 Советы',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Используйте TypeScript для типизации\n- Добавляйте TTL к данным\n- Мониторьте размер хранилища\n- Шифруйте чувствительные данные\n- Используйте namespacing\n- Тестируйте приватный режим\n- Миграция на IndexedDB для &gt;5MB',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Поддержка браузерами',
      blocks: [
        {
          id: 'cards-76',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-77',
              blocks: [
                {
                  id: 'heading-78',
                  type: 'heading',
                  level: 3,
                  text: 'Поддержка',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- **Chrome:** 4\\+ ✅\n- **Firefox:** 3.5\\+ ✅\n- **Safari:** 4\\+ ✅\n- **Edge:** Все версии ✅\n- **IE:** 8\\+ ✅\n- **Opera:** 10.5\\+ ✅',
                },
                {
                  id: 'heading-80',
                  type: 'heading',
                  level: 3,
                  text: 'Особенности',
                },
                {
                  id: 'text-81',
                  type: 'prose',
                  markdown:
                    '- Размер варьируется: 5\\-10MB\n- В приватном режиме может не работать\n- iOS Safari: ограничения в Private Browsing\n- Квота может быть меньше на мобильных\n- Node.js: нет нативной поддержки (нужны полифиллы)',
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
            '**Web Storage API** предоставляет простой способ хранения данных на стороне клиента. **localStorage** сохраняет данные навсегда и доступен во всех вкладках, **sessionStorage** — до закрытия вкладки и изолирован. Оба хранят только строки, поэтому для сложных типов нужна сериализация через JSON. Критически важно: НЕ храните чувствительные данные (токены, пароли) — они уязвимы к XSS атакам. Размер ограничен ~5\\-10MB. Для больших данных используйте IndexedDB, для токенов — httpOnly cookies.',
        },
        {
          id: 'resources-83',
          type: 'resources',
          items: [
            {
              id: 'link-84',
              label: 'MDN Web Storage API',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
            },
          ],
        },
        {
          id: 'resources-85',
          type: 'resources',
          items: [
            {
              id: 'link-86',
              label: 'WHATWG Spec',
              url: 'https://html.spec.whatwg.org/multipage/webstorage.html',
            },
          ],
        },
        {
          id: 'resources-87',
          type: 'resources',
          items: [
            {
              id: 'link-88',
              label: 'Can I Use',
              url: 'https://caniuse.com/namevalue-storage',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
