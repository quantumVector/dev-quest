import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/isolation-css-snippetproblem.css.txt?raw'
import example2 from '../snippets/css/isolation-css-snippetmodules.js.txt?raw'
import example3 from '../snippets/css/isolation-css-snippetscoped.css.txt?raw'
import example4 from '../snippets/css/isolation-css-snippetshadow.js.txt?raw'
import example5 from '../snippets/css/isolation-css-snippetcssinjs.js.txt?raw'
import example6 from '../snippets/css/isolation-css-snippetzeroruntime.js.txt?raw'
import example7 from '../snippets/css/isolation-css-snippetscope.css.txt?raw'
import example8 from '../snippets/css/isolation-css-snippetmigration.js.txt?raw'

// Content copied verbatim from src/views/css/IsolationCSS.vue.
export default {
  ...articleSummaries.isolation,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'CSS глобален по природе — любой класс может случайно перебить другой. Изоляция стилей решает эту проблему, делая стили компонента локальными: они не вытекают наружу и не получают нежелательных влияний извне. Это фундамент компонентной архитектуры.',
    },
  ],
  sections: [
    {
      id: 'problem',
      title: 'Проблема глобальных стилей',
      blocks: [
        {
          id: 'text-2',
          type: 'prose',
          markdown:
            'В обычном CSS все классы живут в одном глобальном пространстве имён. Два компонента с одинаковым классом `.button` неизбежно конфликтуют — побеждает тот, кто загружен позже. Это ведёт к «войнам специфичности», страху удалять старый код и непредсказуемым визуальным регрессиям.',
        },
        {
          id: 'code-3',
          type: 'code',
          language: 'css',
          code: example1,
        },
      ],
    },
    {
      id: 'principles',
      title: 'Три принципа изоляции',
      blocks: [
        {
          id: 'table-4',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Принцип',
            },
            {
              id: 'column-2',
              label: 'Что означает',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '**Инкапсуляция**',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Стили компонента не влияют на окружение и не зависят от него',
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
                    markdown: '**Предсказуемость**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Компонент выглядит одинаково в любом контексте',
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
                    markdown: '**Безопасное удаление**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Удаление компонента не ломает чужие стили',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'methods',
      title: 'Методы изоляции',
      blocks: [
        {
          id: 'heading-11',
          type: 'heading',
          level: 3,
          text: '1. CSS Modules',
        },
        {
          id: 'text-12',
          type: 'prose',
          markdown:
            'Сборщик (Webpack, Vite) автоматически переименовывает классы в уникальные хеши на этапе компиляции. Никакого runtime overhead — просто обычный CSS с гарантированно уникальными именами. Лучший выбор для React-проектов: минимальная настройка, максимальная предсказуемость, отличная поддержка TypeScript через декларации `*.module.css`.',
        },
        {
          id: 'code-13',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
        {
          id: 'heading-14',
          type: 'heading',
          level: 3,
          text: '2. Scoped Styles (Vue / Angular / Svelte)',
        },
        {
          id: 'text-15',
          type: 'prose',
          markdown:
            'Фреймворки добавляют к каждому элементу уникальный атрибут (`data-v-xxxxxx` во Vue, `_ngcontent-c0` в Angular) и модифицируют CSS-селекторы, дописывая этот атрибут. Результат аналогичен CSS Modules, но без необходимости явного импорта — достаточно написать `<style scoped>`. Svelte делает то же самое, добавляя суффикс к имени класса.',
        },
        {
          id: 'code-16',
          type: 'code',
          language: 'css',
          code: example3,
        },
        {
          id: 'callout-17',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-18',
              type: 'prose',
              markdown:
                'Angular предлагает три режима: **Emulated** (по умолчанию, эмулирует Shadow DOM через атрибуты), **ShadowDom** (нативный Shadow DOM) и **None** (без изоляции).',
            },
          ],
        },
        {
          id: 'heading-19',
          type: 'heading',
          level: 3,
          text: '3. Shadow DOM (Web Components)',
        },
        {
          id: 'text-20',
          type: 'prose',
          markdown:
            'Единственный метод с **истинной** изоляцией на уровне браузера. Shadow DOM создаёт отдельное DOM-дерево с собственным CSS-контекстом: стили внутри не вытекают наружу, а внешние стили не проникают внутрь (за исключением наследуемых свойств и CSS-переменных). Браузер может оптимизировать рендеринг независимо для каждого Shadow DOM. Идеален для библиотек компонентов, которые должны работать в любом окружении.',
        },
        {
          id: 'code-21',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
        {
          id: 'heading-22',
          type: 'heading',
          level: 3,
          text: '4. CSS-in-JS (Styled Components, Emotion)',
        },
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            'Стили описываются прямо в JavaScript. Библиотека генерирует уникальный хеш-класс в **runtime** и вставляет стили в `<style>`-тег. Главное преимущество — возможность использовать любые JS-выражения, props и тему прямо в CSS. Платите за это runtime overhead и увеличением bundle (Styled Components ~13 KB, Emotion ~8 KB). На сервере требует дополнительной настройки для SSR.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
        {
          id: 'heading-25',
          type: 'heading',
          level: 3,
          text: '5. Zero-runtime CSS-in-JS (Vanilla Extract, Linaria)',
        },
        {
          id: 'text-26',
          type: 'prose',
          markdown:
            'Лучшее из двух миров: пишете стили с TypeScript и JS-синтаксисом, а компилятор извлекает их в статические CSS-файлы на этапе сборки. Никакого runtime overhead, полная type-safety, отличная поддержка SSR. Vanilla Extract — выбор для TypeScript-first команд. Linaria ближе к синтаксису Styled Components, но без затрат в runtime.',
        },
        {
          id: 'code-27',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
        {
          id: 'heading-28',
          type: 'heading',
          level: 3,
          text: '6. Нативный CSS @scope',
        },
        {
          id: 'text-29',
          type: 'prose',
          markdown:
            'Новая спецификация (Chrome 118+), позволяющая ограничить область действия стилей без инструментов сборки. Поддерживает **limits** — вы можете задать не только «где начинается» область, но и «где заканчивается». Пока не годится для production из-за ограниченной поддержки браузерами, но активно развивается.',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'css',
          code: example7,
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Сравнение методов',
      blocks: [
        {
          id: 'table-31',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метод',
            },
            {
              id: 'column-2',
              label: 'Уровень изоляции',
            },
            {
              id: 'column-3',
              label: 'Runtime overhead',
            },
            {
              id: 'column-4',
              label: 'TypeScript',
            },
            {
              id: 'column-5',
              label: 'SSR',
            },
            {
              id: 'column-6',
              label: 'Bundle (доп.)',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**CSS Modules**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: '⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '0 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '**Scoped (Vue/Angular)**',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: '⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '0 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**Shadow DOM**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Полная (нативная)',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: '⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '0 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '**Styled Components**',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Полная',
                  },
                ],
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: 'Средний',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '~13 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: '**Emotion**',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: 'Полная',
                  },
                ],
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: 'Низкий',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '~8 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown: '**Vanilla Extract**',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '0 KB',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown: '**CSS @scope**',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: 'Нет',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown: '—',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '⭐⭐⭐⭐⭐',
                  },
                ],
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '0 KB',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'performance',
      title: 'Влияние на производительность',
      blocks: [
        {
          id: 'text-74',
          type: 'prose',
          markdown:
            'Изоляция сама по себе не замедляет приложение — важно **как** она реализована.',
        },
        {
          id: 'cards-75',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-76',
              title: '✅ Быстро',
              blocks: [
                {
                  id: 'text-77',
                  type: 'prose',
                  markdown:
                    '- Короткие, предсказуемые селекторы (CSS Modules)\n- Изолированный layout-контекст (Shadow DOM)\n- Статический CSS без runtime вычислений\n- CSS containment: `contain: layout style paint`',
                },
              ],
            },
            {
              id: 'card-78',
              title: '⚠️ Осторожно',
              blocks: [
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Runtime CSS-in-JS с пересчётом на каждый рендер\n- Большое количество динамических тегов `<style>`\n- Глубокие вложенные селекторы\n- CSS-in-JS без SSR-конфигурации (FOUC)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'Влияние на сопровождаемость',
      blocks: [
        {
          id: 'text-80',
          type: 'prose',
          markdown: 'Это главная причина применять изоляцию. Хорошо изолированный компонент даёт:',
        },
        {
          id: 'table-81',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Аспект',
            },
            {
              id: 'column-2',
              label: 'Без изоляции',
            },
            {
              id: 'column-3',
              label: 'С изоляцией',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: 'Удаление кода',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown: 'Страшно — вдруг кто-то зависит',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: 'Безопасно — стили локальны',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: 'Рефакторинг',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown: 'Требует знания всей кодовой базы',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown: 'Ограничен файлом компонента',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: 'Отладка',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown: 'Поиск источника среди сотен правил',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: 'Стиль = файл компонента',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-91',
                    type: 'prose',
                    markdown: 'Переиспользование',
                  },
                ],
                [
                  {
                    id: 'text-92',
                    type: 'prose',
                    markdown: 'Рискованно — контекст влияет',
                  },
                ],
                [
                  {
                    id: 'text-93',
                    type: 'prose',
                    markdown: 'Безопасно — компонент самодостаточен',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-94',
                    type: 'prose',
                    markdown: 'Onboarding',
                  },
                ],
                [
                  {
                    id: 'text-95',
                    type: 'prose',
                    markdown: 'Нужно изучать всю архитектуру CSS',
                  },
                ],
                [
                  {
                    id: 'text-96',
                    type: 'prose',
                    markdown: 'Новичок разбирается в одном файле',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'migration',
      title: 'Миграция с глобальных стилей',
      blocks: [
        {
          id: 'text-97',
          type: 'prose',
          markdown:
            'Переход не должен быть «всё или ничего». Стратегия **Strangler Fig** — постепенная замена: новые компоненты сразу пишутся с изоляцией, старые мигрируют по приоритету. CSS-переменные служат мостом между двумя системами.',
        },
        {
          id: 'code-98',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
        {
          id: 'callout-99',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-100',
              type: 'prose',
              markdown:
                'Перед удалением глобальных стилей обязательно проверьте их использование инструментами вроде PurgeCSS или Coverage в DevTools. Мертвый CSS-код часто скрывает неожиданные зависимости.',
            },
          ],
        },
      ],
    },
    {
      id: 'choice',
      title: 'Когда что выбирать',
      blocks: [
        {
          id: 'cards-101',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-102',
              title: 'По стеку',
              blocks: [
                {
                  id: 'text-103',
                  type: 'prose',
                  markdown:
                    '- **React** — CSS Modules или Vanilla Extract\n- **Vue** — Scoped Styles (встроено)\n- **Angular** — ViewEncapsulation.Emulated (по умолчанию)\n- **Svelte** — автоматически (встроено)\n- **Vanilla JS / библиотека** — Shadow DOM',
                },
              ],
            },
            {
              id: 'card-104',
              title: 'По задаче',
              blocks: [
                {
                  id: 'text-105',
                  type: 'prose',
                  markdown:
                    '- **Статические стили** — CSS Modules\n- **Динамические стили / теминг** — CSS-in-JS\n- **Performance-critical** — Zero-runtime\n- **Независимая библиотека** — Shadow DOM\n- **Без сборщика** — CSS @scope (с полифилом)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      title: 'Вопросы для собеседования',
      blocks: [
        {
          id: 'accordion-106',
          type: 'accordion',
          items: [
            {
              id: 'question-107',
              title: '**Что такое изоляция стилей и зачем она нужна?**',
              blocks: [
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    'CSS глобален по природе: любой класс может случайно перебить другой. Изоляция — набор техник, ограничивающих область видимости стилей конкретным компонентом. Это исключает конфликты имён, делает компоненты предсказуемыми в любом контексте и безопасными для удаления.',
                },
              ],
            },
            {
              id: 'question-109',
              title: '**В чём разница между CSS Modules и CSS-in-JS?**',
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    'CSS Modules работают на этапе сборки (build-time): сборщик переименовывает классы в уникальные хеши. Zero runtime, обычный CSS-синтаксис. CSS-in-JS (Styled Components, Emotion) генерирует и вставляет стили в runtime, что даёт полную динамику и доступ к JS-контексту, но добавляет накладные расходы. Zero-runtime CSS-in-JS (Vanilla Extract) объединяет оба подхода: JS-синтаксис + статический CSS на выходе.',
                },
              ],
            },
            {
              id: 'question-111',
              title: '**Как работает Shadow DOM и чем отличается от других методов?**',
              blocks: [
                {
                  id: 'text-112',
                  type: 'prose',
                  markdown:
                    'Shadow DOM — единственный метод с **нативной** изоляцией на уровне браузера. Он создаёт изолированное DOM-дерево со своим CSS-контекстом: стили внутри не вытекают наружу, внешние стили не проникают внутрь. CSS Modules и Scoped Styles лишь эмулируют изоляцию через уникальные имена классов — технически это всё равно глобальный CSS, просто с очень специфичными селекторами.',
                },
              ],
            },
            {
              id: 'question-113',
              title: '**Как мигрировать существующий проект на изолированные стили?**',
              blocks: [
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    'Стратегия Strangler Fig: новые компоненты сразу с изоляцией, старые мигрируют постепенно. Настроить сборщик на поддержку обеих систем одновременно. Использовать CSS-переменные как общий язык между системами. Перед удалением глобальных стилей проверить их реальное использование через DevTools Coverage или PurgeCSS.',
                },
              ],
            },
            {
              id: 'question-115',
              title: '**Влияет ли изоляция на производительность?**',
              blocks: [
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    'Build-time методы (CSS Modules, Scoped, Zero-runtime) практически не влияют на производительность — даже улучшают её, создавая более простые и предсказуемые селекторы. Shadow DOM позволяет браузеру оптимизировать рендеринг независимо. Runtime CSS-in-JS при неаккуратном использовании может создавать накладные расходы (пересчёт стилей на каждый рендер, вставка тегов), но современные библиотеки это минимизируют.',
                },
              ],
            },
            {
              id: 'question-117',
              title: '**Что такое CSS @scope?**',
              blocks: [
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    'Нативная CSS-функция (Chrome 118+) для ограничения области действия стилей без инструментов сборки. Позволяет задать не только «корень» области (`@scope (.card)`), но и «границу» — место, где область заканчивается (`@scope (.card) to (.nested-card)`). Пока не подходит для production из-за ограниченной поддержки браузерами.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итог',
      blocks: [
        {
          id: 'cards-119',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-120',
              blocks: [
                {
                  id: 'text-121',
                  type: 'prose',
                  markdown:
                    'Изоляция стилей — не опциональное улучшение, а необходимость для любого компонентного приложения. Выбирайте build-time методы как основу (CSS Modules, Scoped Styles) — они бесплатны по производительности. Добавляйте CSS-in-JS только там, где нужна настоящая динамика. Для библиотек компонентов Shadow DOM даёт наивысший уровень изоляции. Следите за CSS @scope — в перспективе это нативное решение без компромиссов.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
