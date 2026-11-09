import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web-api/web-api-blob-and-file-blobbasicssnippet.txt?raw'
import example2 from '../snippets/web-api/web-api-blob-and-file-blobmethodssnippet.txt?raw'
import example3 from '../snippets/web-api/web-api-blob-and-file-filebasicssnippet.txt?raw'
import example4 from '../snippets/web-api/web-api-blob-and-file-fileinputsnippet.txt?raw'
import example5 from '../snippets/web-api/web-api-blob-and-file-filereadersnippet.txt?raw'
import example6 from '../snippets/web-api/web-api-blob-and-file-bloburlsnippet.txt?raw'
import example7 from '../snippets/web-api/web-api-blob-and-file-practicalexamplessnippet.txt?raw'
import example8 from '../snippets/web-api/web-api-blob-and-file-advancedexamplessnippet.txt?raw'

// Content copied verbatim from src/views/web-api/BlobAndFile.vue.
export default {
  ...articleSummaries.webApiBlobAndFile,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Blob** (Binary Large Object) — объект для работы с бинарными данными. **File** — расширение Blob для работы с файлами, добавляет метаданные (имя, дата изменения). Эти API позволяют читать, создавать, изменять и загружать файлы в браузере.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Blob vs File: ключевые различия',
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
              label: 'Blob',
            },
            {
              id: 'column-3',
              label: 'File',
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
                    markdown: '**Наследование**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Базовый класс',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: 'Наследуется от Blob',
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
                    markdown: '**Создание**',
                  },
                ],
                [
                  {
                    id: 'text-7',
                    type: 'prose',
                    markdown: '`new Blob([data], options)`',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '`new File([data], name, options)`',
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
                    markdown: '**Метаданные**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Только size и type',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '\\+ name, lastModified',
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
                    markdown: '**Использование**',
                  },
                ],
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: 'Общие бинарные данные',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: 'Файлы с файловой системы',
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
                    markdown: '**Источник**',
                  },
                ],
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: 'Создается программно',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: 'Обычно из `<input type="file">`',
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
      title: 'Blob - основы работы',
      blocks: [
        {
          id: 'callout-18',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-19',
              type: 'prose',
              markdown:
                '**Blob** — неизменяемый объект. Для модификации нужно создавать новый Blob.',
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Методы Blob',
      blocks: [
        {
          id: 'cards-21',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-22',
              title: 'Синхронные',
              blocks: [
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown:
                    '- `slice(start, end, type)` — часть Blob\n- `stream()` — ReadableStream',
                },
              ],
            },
            {
              id: 'card-24',
              title: 'Асинхронные (Promise)',
              blocks: [
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: '- `text()` — текст\n- `arrayBuffer()` — бинарные данные',
                },
              ],
            },
          ],
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'File - расширение Blob',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Работа с <input type="file">',
      blocks: [
        {
          id: 'callout-28',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-29',
              type: 'prose',
              markdown:
                '**FileList** — псевдомассив объектов File. Итерируемый, но не имеет методов массива.',
            },
          ],
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'FileReader - классический API',
      blocks: [
        {
          id: 'cards-31',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-32',
              title: 'Методы чтения',
              blocks: [
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    '- `readAsText()` — текст\n- `readAsDataURL()` — base64\n- `readAsArrayBuffer()` — бинарные данные\n- `readAsBinaryString()` — устарел',
                },
              ],
            },
            {
              id: 'card-34',
              title: 'События',
              blocks: [
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown:
                    '- `onload` — успешное чтение\n- `onerror` — ошибка\n- `onprogress` — прогресс\n- `onabort` — прерывание',
                },
              ],
            },
          ],
        },
        {
          id: 'code-36',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Blob URL - временные ссылки',
      blocks: [
        {
          id: 'callout-37',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-38',
              type: 'prose',
              markdown:
                '**Важно:** Blob URL занимают память! Всегда освобождайте их через `URL.revokeObjectURL()`',
            },
          ],
        },
        {
          id: 'code-39',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Практические примеры использования',
      blocks: [
        {
          id: 'code-40',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Продвинутые техники',
      blocks: [
        {
          id: 'code-41',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Популярные MIME типы',
      blocks: [
        {
          id: 'cards-42',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-43',
              title: 'Текстовые',
              blocks: [
                {
                  id: 'text-44',
                  type: 'prose',
                  markdown:
                    '- `text/plain` — обычный текст\n- `text/html` — HTML документ\n- `text/css` — CSS стили\n- `application/json` — JSON данные\n- `application/xml` — XML документ',
                },
              ],
            },
            {
              id: 'card-45',
              title: 'Бинарные',
              blocks: [
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown:
                    '- `image/jpeg`, `image/png`, `image/webp`\n- `video/mp4`, `video/webm`\n- `audio/mpeg`, `audio/ogg`\n- `application/pdf` — PDF документ\n- `application/octet-stream` — произвольные данные',
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
          id: 'text-47',
          type: 'prose',
          markdown:
            '1. **В чем разница между Blob и File?**\n   \n   File наследуется от Blob и добавляет метаданные: `name` (имя файла) и `lastModified` (timestamp). Blob — общий объект для бинарных данных, File — специально для файлов.\n2. **Как загрузить файл на сервер?**\n   \n   Через `FormData`: создать FormData, добавить файл методом `append()`, отправить через `fetch()` или `XMLHttpRequest`. FormData автоматически устанавливает правильный Content\\-Type.\n3. **В чем разница между FileReader и blob.text()?**\n   \n   FileReader — старый callback\\-based API с событиями и поддержкой прогресса. `blob.text()` — современный Promise\\-based API, проще в использовании, но без прогресса. Для новых проектов предпочтительны методы Blob.\n4. **Что такое Blob URL и когда его использовать?**\n   \n   Blob URL (blob://...) — временная ссылка на Blob в памяти. Используется для отображения изображений, видео, скачивания файлов. Важно освобождать через `URL.revokeObjectURL()` для предотвращения утечек памяти.\n5. **Как обработать большой файл без зависания?**\n   \n   Использовать chunked processing: `file.slice()` для разбиения на части, `file.stream()` для потоковой обработки, или Web Workers для тяжелых вычислений. Также можно использовать `requestIdleCallback()`.\n6. **Как создать и скачать файл на клиенте?**\n   \n   Создать Blob с данными, создать Blob URL через `URL.createObjectURL()`, создать элемент `<a>` с атрибутами `href` (Blob URL) и `download` (имя файла), программно кликнуть, освободить URL.\n7. **Что такое FileList и как с ним работать?**\n   \n   FileList — псевдомассив File объектов из `<input type="file">`. Итерируемый (for...of), но не имеет методов массива. Преобразуется в массив через `Array.from()` или spread оператор.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-48',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-49',
              blocks: [
                {
                  id: 'heading-50',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- Освобождать Blob URL\n- Валидировать тип и размер файла\n- Использовать Web Workers для обработки\n- Показывать прогресс загрузки\n- Обрабатывать ошибки\n- Использовать современные методы (text, arrayBuffer)',
                },
              ],
            },
            {
              id: 'card-52',
              blocks: [
                {
                  id: 'heading-53',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '- Загрузки больших файлов без chunking\n- Утечек памяти через Blob URL\n- Блокировки UI при обработке\n- Доверия к MIME типам от клиента\n- Синхронных операций\n- FileReader без необходимости',
                },
              ],
            },
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: '⚠️ Внимание',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Ограничения размера файла\n- Кросс\\-браузерная совместимость\n- Безопасность (XSS через файлы)\n- Производительность обработки\n- Мобильные ограничения\n- CORS при загрузке',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Типичные сценарии использования',
      blocks: [
        {
          id: 'cards-58',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-59',
              title: 'Загрузка файлов',
              blocks: [
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Загрузка изображений на сервер\n- Drag &amp; Drop файлов\n- Chunked upload больших файлов\n- Предпросмотр перед загрузкой\n- Множественная загрузка',
                },
              ],
            },
            {
              id: 'card-61',
              title: 'Обработка файлов',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Сжатие изображений\n- Конвертация форматов\n- Создание thumbnails\n- Извлечение метаданных\n- Чтение Excel/CSV файлов',
                },
              ],
            },
            {
              id: 'card-63',
              title: 'Создание файлов',
              blocks: [
                {
                  id: 'text-64',
                  type: 'prose',
                  markdown:
                    '- Генерация отчетов (PDF, Excel)\n- Экспорт данных (JSON, CSV)\n- Создание ZIP архивов\n- Скриншоты canvas\n- Запись аудио/видео',
                },
              ],
            },
            {
              id: 'card-65',
              title: 'Работа с медиа',
              blocks: [
                {
                  id: 'text-66',
                  type: 'prose',
                  markdown:
                    '- Аватары пользователей\n- Галереи изображений\n- Видео/аудио плееры\n- WebRTC запись\n- Media Source Extensions',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-67',
          type: 'prose',
          markdown:
            '**Blob** и **File** API предоставляют мощные инструменты для работы с файлами в браузере: чтение, создание, модификация и загрузка. Blob — базовый класс для бинарных данных, File — расширение для файлов с метаданными. Современные методы (`text()`, `arrayBuffer()`) предпочтительнее устаревшего FileReader. Важно помнить об управлении памятью (Blob URL), валидации данных и производительности при работе с большими файлами.',
        },
        {
          id: 'resources-68',
          type: 'resources',
          items: [
            {
              id: 'link-69',
              label: 'MDN Blob',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Blob',
            },
          ],
        },
        {
          id: 'resources-70',
          type: 'resources',
          items: [
            {
              id: 'link-71',
              label: 'MDN File',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/File',
            },
          ],
        },
        {
          id: 'resources-72',
          type: 'resources',
          items: [
            {
              id: 'link-73',
              label: 'MDN FileReader',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
