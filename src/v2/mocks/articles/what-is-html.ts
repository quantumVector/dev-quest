import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/html/what-is-html-snippet.html.txt?raw'

// Content copied verbatim from src/views/html/WhatIsHtml.vue.
export default {
  ...articleSummaries.htmlIntro,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'HTML — это язык гипертекстовой разметки, который задаёт структуру и семантику веб-страницы. Он описывает, какие элементы содержатся на странице (заголовки, списки, изображения, ссылки), чтобы браузер мог построить DOM и отобразить контент. Оформление задаётся CSS, а поведение — JavaScript; HTML служит фундаментом, на который они накладываются.',
    },
    {
      id: 'table-2',
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
                id: 'text-3',
                type: 'prose',
                markdown: 'Расшифровка',
              },
            ],
            [
              {
                id: 'text-4',
                type: 'prose',
                markdown: 'HyperText Markup Language — «язык гипертекстовой разметки»',
              },
            ],
          ],
        },
        {
          id: 'row-2',
          cells: [
            [
              {
                id: 'text-5',
                type: 'prose',
                markdown: 'Основная роль',
              },
            ],
            [
              {
                id: 'text-6',
                type: 'prose',
                markdown:
                  'Структурировать контент: задаёт, где заголовок, абзац, список, изображение, таблица и т. д.',
              },
            ],
          ],
        },
        {
          id: 'row-3',
          cells: [
            [
              {
                id: 'text-7',
                type: 'prose',
                markdown: 'Ключевые особенности',
              },
            ],
            [
              {
                id: 'text-8',
                type: 'prose',
                markdown:
                  'Гипертекст — поддержка ссылок; разметка — описывает семантику элементов, а не их внешний вид.',
              },
            ],
          ],
        },
        {
          id: 'row-4',
          cells: [
            [
              {
                id: 'text-9',
                type: 'prose',
                markdown: 'Чего *не* делает',
              },
            ],
            [
              {
                id: 'text-10',
                type: 'prose',
                markdown:
                  'Не содержит логики (как JavaScript) и не отвечает за оформление (как CSS), хотя может включать встроенные скрипты/стили.',
              },
            ],
          ],
        },
        {
          id: 'row-5',
          cells: [
            [
              {
                id: 'text-11',
                type: 'prose',
                markdown: 'Как работает',
              },
            ],
            [
              {
                id: 'text-12',
                type: 'prose',
                markdown:
                  'Браузер парсит HTML → строит DOM-дерево → потом применяет CSS → затем запускает JS.',
              },
            ],
          ],
        },
        {
          id: 'row-6',
          cells: [
            [
              {
                id: 'text-13',
                type: 'prose',
                markdown: 'Зачем нужен',
              },
            ],
            [
              {
                id: 'text-14',
                type: 'prose',
                markdown:
                  '- Отображение контента в браузере\n- SEO и доступность. Семантические теги помогают поисковикам и скрин-ридерам.\n- Фундамент для интеграции с CSS, JS, Web Components',
              },
            ],
          ],
        },
        {
          id: 'row-7',
          cells: [
            [
              {
                id: 'text-15',
                type: 'prose',
                markdown: 'Примеры тегов',
              },
            ],
            [
              {
                id: 'text-16',
                type: 'prose',
                markdown:
                  '&lt;h1&gt;, &lt;p&gt;, &lt;a&gt;, &lt;ul&gt;, &lt;img&gt;, &lt;article&gt;',
              },
            ],
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'example',
      title: 'Минимальный пример HTML‑страницы',
      blocks: [
        {
          id: 'code-17',
          type: 'code',
          language: 'markup',
          code: example1,
        },
        {
          id: 'resources-18',
          type: 'resources',
          items: [
            {
              id: 'link-19',
              label: 'Открыть MDN',
              url: 'https://developer.mozilla.org/ru/docs/Web/HTML',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
