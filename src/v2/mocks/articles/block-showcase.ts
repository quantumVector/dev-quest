import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'

export default {
  ...articleSummaries.showcase,
  schemaVersion: 1,
  sections: [
    {
      id: 'text',
      title: 'Текст и примеры кода',
      blocks: [
        {
          id: 'markdown',
          type: 'prose',
          markdown: `Один текстовый блок поддерживает **выделения**, *курсив*, \`код внутри строки\` и [ссылки](https://developer.mozilla.org/).

Абзацы разделяются пустой строкой. Списки тоже остаются частью контента:

1. Описать тему.
2. Добавить пример.
3. Проверить понимание.

> Такое оформление одинаково во всех статьях.`,
        },
        {
          id: 'typescript',
          type: 'code',
          language: 'typescript',
          filename: 'greeting.ts',
          code: 'interface User {\n  name: string\n}\n\nfunction greet(user: User): string {\n  return `Привет, ${user.name}!`\n}',
          caption: 'Код отображается как текст и подсвечивается выбранным языком.',
        },
        {
          id: 'plain',
          type: 'code',
          language: 'text',
          code: 'Каталог → Статья → Раздел → Контентные блоки',
          caption: 'Для обычного текста и неизвестного языка работает отображение без подсветки.',
        },
      ],
    },
    {
      id: 'callouts',
      title: 'Примечания и предупреждения',
      blocks: [
        {
          id: 'info',
          type: 'callout',
          tone: 'info',
          title: 'Краткий ответ',
          blocks: [
            {
              id: 'text',
              type: 'prose',
              markdown: 'Используйте такой блок для определения или ключевой мысли раздела.',
            },
          ],
        },
        {
          id: 'success',
          type: 'callout',
          tone: 'success',
          title: 'Рекомендация',
          blocks: [
            {
              id: 'text',
              type: 'prose',
              markdown: `Важные выводы можно собрать в небольшой список:
- единый стиль;
- понятная структура;
- примеры рядом с объяснением.`,
            },
          ],
        },
        {
          id: 'warning',
          type: 'callout',
          tone: 'warning',
          title: 'Обратите внимание',
          blocks: [
            {
              id: 'text',
              type: 'prose',
              markdown: 'Здесь можно описать ограничение подхода или частую ошибку.',
            },
          ],
        },
        {
          id: 'error',
          type: 'callout',
          tone: 'error',
          title: 'Антипаттерн',
          blocks: [
            {
              id: 'text',
              type: 'prose',
              markdown: 'Красный вариант подходит для примера ошибки и объяснения её последствий.',
            },
          ],
        },
      ],
    },
    {
      id: 'comparisons',
      title: 'Карточки и таблицы',
      blocks: [
        {
          id: 'cards',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'concept',
              title: 'Объяснение',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: `Карточка может содержать несколько блоков, в том числе список:
- назначение;
- ограничения;
- сценарии применения.`,
                },
              ],
            },
            {
              id: 'example',
              title: 'Пример рядом',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Код использует тот же компонент, что и полноразмерные примеры.',
                },
                {
                  id: 'code',
                  type: 'code',
                  language: 'javascript',
                  code: 'const doubled = [1, 2, 3]\n  .map(value => value * 2)',
                },
              ],
            },
          ],
        },
        {
          id: 'table',
          type: 'table',
          caption: 'В ячейках тоже могут быть вложенные блоки',
          columns: [
            { id: 'topic', label: 'Тема' },
            { id: 'content', label: 'Содержание' },
          ],
          rows: [
            {
              id: 'list',
              cells: [
                [{ id: 'label', type: 'prose', markdown: '**Список**' }],
                [
                  {
                    id: 'content',
                    type: 'prose',
                    markdown: `- Первый пункт
- Второй пункт с \`inline code\``,
                  },
                ],
              ],
            },
            {
              id: 'code',
              cells: [
                [{ id: 'label', type: 'prose', markdown: '**Пример**' }],
                [
                  {
                    id: 'content',
                    type: 'code',
                    language: 'javascript',
                    code: 'const ready = true',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      title: 'Вопросы и ответы',
      blocks: [
        {
          id: 'faq',
          type: 'accordion',
          multiple: true,
          items: [
            {
              id: 'content',
              title: 'Где хранится содержимое этой страницы?',
              blocks: [
                {
                  id: 'answer',
                  type: 'prose',
                  markdown:
                    'Текст, код и порядок блоков описаны в отдельном файле статьи. Универсальная страница получает их через асинхронный API-слой.',
                },
              ],
            },
            {
              id: 'nested',
              title: 'Что можно поместить внутрь ответа?',
              blocks: [
                {
                  id: 'answer',
                  type: 'prose',
                  markdown: 'Те же блоки, что и в разделе статьи. Например, примечание:',
                },
                {
                  id: 'note',
                  type: 'callout',
                  tone: 'info',
                  blocks: [
                    {
                      id: 'text',
                      type: 'prose',
                      markdown: 'Вложенный контент сохраняет общее оформление.',
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
      id: 'tabs',
      title: 'Вкладки',
      blocks: [
        {
          id: 'languages',
          type: 'tabs',
          items: [
            {
              id: 'javascript',
              title: 'JavaScript',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Выберите вкладку, чтобы сравнить варианты одного примера.',
                },
                {
                  id: 'code',
                  type: 'code',
                  language: 'javascript',
                  code: 'function sum(a, b) {\n  return a + b\n}',
                },
              ],
            },
            {
              id: 'typescript',
              title: 'TypeScript',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Вторая вкладка содержит тот же пример с типами.',
                },
                {
                  id: 'code',
                  type: 'code',
                  language: 'typescript',
                  code: 'function sum(a: number, b: number): number {\n  return a + b\n}',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'steps',
      title: 'Пошаговое объяснение',
      blocks: [
        {
          id: 'render-cycle',
          type: 'steps',
          items: [
            {
              id: 'state',
              title: 'Изменение состояния',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Обновление состояния сообщает интерфейсу, что данные изменились.',
                },
              ],
            },
            {
              id: 'render',
              title: 'Подготовка представления',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Фреймворк определяет, какое представление соответствует новым данным.',
                },
              ],
            },
            {
              id: 'update',
              title: 'Обновление DOM',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Необходимые изменения применяются к странице.',
                },
                {
                  id: 'note',
                  type: 'callout',
                  tone: 'success',
                  blocks: [
                    {
                      id: 'text',
                      type: 'prose',
                      markdown:
                        'Можно перейти к любому шагу по его названию или использовать кнопки навигации.',
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
      id: 'timeline',
      title: 'Последовательность событий',
      blocks: [
        {
          id: 'request',
          type: 'timeline',
          items: [
            {
              id: 'start',
              title: 'Отправка запроса',
              blocks: [
                { id: 'text', type: 'prose', markdown: 'Клиент запрашивает нужные данные.' },
              ],
            },
            {
              id: 'response',
              title: 'Получение ответа',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Ответ проверяется перед передачей в интерфейс.',
                },
              ],
            },
            {
              id: 'display',
              title: 'Отображение',
              blocks: [
                {
                  id: 'text',
                  type: 'prose',
                  markdown: 'Страница собирается из полученных блоков.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'widgets',
      title: 'Специальные вставки',
      blocks: [
        {
          id: 'intro',
          type: 'prose',
          markdown:
            'Для специальных иллюстраций и тренажёров используются зарегистрированные виджеты. Подписи и значения также передаются данными.',
        },
        {
          id: 'pyramid',
          type: 'widget',
          name: 'testing-pyramid',
          props: {
            levels: [
              { id: 'e2e', label: 'E2E', percent: 10 },
              { id: 'integration', label: 'Интеграционные', percent: 30 },
              { id: 'unit', label: 'Модульные', percent: 60 },
            ],
          },
        },
        { id: 'units', type: 'widget', name: 'css-units', props: { compact: true } },
      ],
    },
    {
      id: 'resources',
      title: 'Ссылки на материалы',
      blocks: [
        {
          id: 'links',
          type: 'resources',
          items: [
            {
              id: 'mdn',
              label: 'MDN Web Docs',
              url: 'https://developer.mozilla.org/',
              description: 'Справочник по веб-технологиям.',
            },
            {
              id: 'vue',
              label: 'Документация Vue',
              url: 'https://vuejs.org/guide/introduction.html',
              description: 'Руководство по Vue.',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
