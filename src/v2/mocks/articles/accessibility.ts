import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/html/accessibility-snippet1.html.txt?raw'
import example2 from '../snippets/html/accessibility-snippet2.html.txt?raw'

// Content copied verbatim from src/views/html/Accessibility.vue.
export default {
  ...articleSummaries.accessibility,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Веб-доступность (Web Accessibility, a11y)** — это практика создания веб-сайтов и приложений, которые могут использовать все люди, включая пользователей с различными нарушениями и ограничениями. Цель — обеспечить равный доступ к информации и функциональности для всех.',
    },
  ],
  sections: [
    {
      id: 'users',
      title: 'Кому важна доступность?',
      blocks: [
        {
          id: 'table-2',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип пользователей',
            },
            {
              id: 'column-2',
              label: 'Потребности',
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
                    markdown: '**Слабовидящие и слепые**',
                  },
                ],
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: 'Скринридеры, увеличение текста, высокий контраст',
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
                    markdown: '**Глухие и слабослышащие**',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Субтитры, визуальные индикаторы вместо звуковых',
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
                    markdown: '**Моторные нарушения**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: 'Навигация с клавиатуры, крупные кликабельные области',
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
                    markdown: '**Когнитивные особенности**',
                  },
                ],
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: 'Простой интерфейс, ясные инструкции, избежание мигания',
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
                    markdown: '**Временные ограничения**',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Сломанная рука, яркий свет на экране, шумная среда',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'wcag',
      title: 'Основные принципы WCAG',
      blocks: [
        {
          id: 'text-13',
          type: 'prose',
          markdown:
            '**WCAG (Web Content Accessibility Guidelines)** — международный стандарт доступности. Основан на четырех принципах:',
        },
        {
          id: 'cards-14',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-15',
              title: '1. Воспринимаемость (Perceivable)',
              blocks: [
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    'Информация должна быть представлена так, чтобы пользователи могли её воспринять',
                },
                {
                  id: 'tags-17',
                  type: 'tags',
                  items: ['alt-тексты', 'контраст', 'субтитры'],
                },
              ],
            },
            {
              id: 'card-18',
              title: '2. Управляемость (Operable)',
              blocks: [
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Интерфейс должен быть управляемым для всех пользователей',
                },
                {
                  id: 'tags-20',
                  type: 'tags',
                  items: ['клавиатура', 'тайминги', 'судороги'],
                },
              ],
            },
            {
              id: 'card-21',
              title: '3. Понятность (Understandable)',
              blocks: [
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown: 'Информация и управление интерфейсом должны быть понятными',
                },
                {
                  id: 'tags-23',
                  type: 'tags',
                  items: ['язык', 'предсказуемость', 'помощь при вводе'],
                },
              ],
            },
            {
              id: 'card-24',
              title: '4. Надёжность (Robust)',
              blocks: [
                {
                  id: 'text-25',
                  type: 'prose',
                  markdown: 'Контент должен быть совместим с различными технологиями',
                },
                {
                  id: 'tags-26',
                  type: 'tags',
                  items: ['валидный HTML', 'совместимость'],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'basics',
      title: 'Базовые техники доступности',
      blocks: [
        {
          id: 'code-27',
          type: 'code',
          language: 'markup',
          code: example1,
        },
      ],
    },
    {
      id: 'aria',
      title: 'ARIA-атрибуты',
      blocks: [
        {
          id: 'text-28',
          type: 'prose',
          markdown:
            '**ARIA (Accessible Rich Internet Applications)** — набор атрибутов для улучшения доступности динамического контента и сложных элементов интерфейса.',
        },
        {
          id: 'code-29',
          type: 'code',
          language: 'markup',
          code: example2,
        },
      ],
    },
    {
      id: 'aria-attributes',
      title: 'Основные ARIA-атрибуты',
      blocks: [
        {
          id: 'table-30',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Атрибут',
            },
            {
              id: 'column-2',
              label: 'Назначение и использование',
            },
            {
              id: 'column-3',
              label: 'Пример',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: '`role`',
                  },
                ],
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown:
                      'Определяет роль элемента для assistive technologies. Используется когда семантический HTML недостаточен.   \n**Частые роли:** button, dialog, navigation, alert, tabpanel, menuitem',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: '`<div role="button">`',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '`aria-label`',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown:
                      'Добавляет текстовую метку элементу, которая будет прочитана скринридером. Используется когда визуальная метка отсутствует или недостаточна (иконки, кнопки без текста).   \n**Переопределяет** видимый текст элемента.',
                  },
                ],
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '`<button aria-label="Закрыть диалог">×</button>`',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: '`aria-labelledby`',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown:
                      'Связывает элемент с другим элементом, который служит его меткой. Используется для связи заголовков с контейнерами, модальных окон с их заголовками.   \n**Приоритет:** выше чем aria-label и видимый текст. Можно указать несколько ID через пробел.',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`<div role="dialog" aria-labelledby="modal-title">`',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '`aria-describedby`',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown:
                      'Связывает элемент с дополнительным описанием. Используется для подсказок, сообщений об ошибках, дополнительных инструкций к полям форм.   \n**Отличие от labelledby:** описание читается после основной метки и менее приоритетно.',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`<input aria-describedby="password-hint">`',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: '`aria-hidden`',
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown:
                      'Полностью скрывает элемент и его потомков от assistive technologies. Используется для декоративных элементов, иконок-дубликатов текста, технических элементов.   \n**⚠️ Осторожно:** не скрывает визуально, только от скринридеров.',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`<span aria-hidden="true">🏠</span>`',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '`aria-expanded`',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown:
                      'Указывает состояние раскрытия/свёрнутости элемента. Используется для аккордеонов, выпадающих меню, раскрывающихся панелей.   \n**Значения:** true (раскрыто), false (свёрнуто), undefined (не применимо). Нужно программно переключать при изменении состояния.',
                  },
                ],
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '`<button aria-expanded="false" aria-controls="menu">`',
                  },
                ],
              ],
            },
            {
              id: 'row-7',
              cells: [
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: '`aria-controls`',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown:
                      'Указывает ID элемента(ов), которым управляет текущий элемент. Используется с кнопками, управляющими другими областями (табы, модалы, выпадающие списки).   \n**Связка:** часто используется вместе с aria-expanded для навигации.',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '`<button aria-controls="panel-1">`',
                  },
                ],
              ],
            },
            {
              id: 'row-8',
              cells: [
                [
                  {
                    id: 'text-52',
                    type: 'prose',
                    markdown: '`aria-live`',
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown:
                      'Объявляет об изменениях в динамическом контенте. Используется для уведомлений, сообщений чата, обновлений статуса, таймеров.   \n**Значения:** off (не объявлять), polite (объявить когда пользователь не занят), assertive (объявить немедленно).',
                  },
                ],
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`<div aria-live="polite" role="status">`',
                  },
                ],
              ],
            },
            {
              id: 'row-9',
              cells: [
                [
                  {
                    id: 'text-55',
                    type: 'prose',
                    markdown: '`aria-atomic`',
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown:
                      'Определяет, следует ли скринридеру читать весь регион целиком или только изменившуюся часть. Используется вместе с aria-live.   \n**Значения:** true (читать весь контент), false (читать только изменения).',
                  },
                ],
                [
                  {
                    id: 'text-57',
                    type: 'prose',
                    markdown: '`<div aria-live="polite" aria-atomic="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-10',
              cells: [
                [
                  {
                    id: 'text-58',
                    type: 'prose',
                    markdown: '`aria-disabled`',
                  },
                ],
                [
                  {
                    id: 'text-59',
                    type: 'prose',
                    markdown:
                      'Указывает, что элемент отключен но остаётся в DOM и может получать фокус. Используется когда нужно показать неактивное состояние с сохранением в порядке табуляции.   \n**Отличие от disabled:** HTML disabled полностью убирает элемент из навигации.',
                  },
                ],
                [
                  {
                    id: 'text-60',
                    type: 'prose',
                    markdown: '`<button aria-disabled="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-11',
              cells: [
                [
                  {
                    id: 'text-61',
                    type: 'prose',
                    markdown: '`aria-required`',
                  },
                ],
                [
                  {
                    id: 'text-62',
                    type: 'prose',
                    markdown:
                      'Помечает поле формы как обязательное. Используется для информирования пользователей скринридеров о необходимости заполнения.   \n**Дополнение:** не заменяет валидацию, только информирует. Предпочтительнее HTML5 `required`.',
                  },
                ],
                [
                  {
                    id: 'text-63',
                    type: 'prose',
                    markdown: '`<input aria-required="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-12',
              cells: [
                [
                  {
                    id: 'text-64',
                    type: 'prose',
                    markdown: '`aria-invalid`',
                  },
                ],
                [
                  {
                    id: 'text-65',
                    type: 'prose',
                    markdown:
                      'Указывает, что значение поля некорректно. Используется после валидации для обозначения ошибок ввода.   \n**Значения:** true (ошибка), false (корректно), grammar (грамматическая ошибка), spelling (орфография).   \n**Связка:** используйте с aria-describedby для описания ошибки.',
                  },
                ],
                [
                  {
                    id: 'text-66',
                    type: 'prose',
                    markdown: '`<input aria-invalid="true" aria-describedby="error">`',
                  },
                ],
              ],
            },
            {
              id: 'row-13',
              cells: [
                [
                  {
                    id: 'text-67',
                    type: 'prose',
                    markdown: '`aria-current`',
                  },
                ],
                [
                  {
                    id: 'text-68',
                    type: 'prose',
                    markdown:
                      'Помечает текущий элемент в наборе элементов. Используется для активной страницы в навигации, текущего шага в мастере, активной даты в календаре.   \n**Значения:** page (страница), step (шаг), location (местоположение), date (дата), time (время), true (общий случай).',
                  },
                ],
                [
                  {
                    id: 'text-69',
                    type: 'prose',
                    markdown: '`<a href="/about" aria-current="page">`',
                  },
                ],
              ],
            },
            {
              id: 'row-14',
              cells: [
                [
                  {
                    id: 'text-70',
                    type: 'prose',
                    markdown: '`aria-selected`',
                  },
                ],
                [
                  {
                    id: 'text-71',
                    type: 'prose',
                    markdown:
                      'Указывает, что элемент выбран в группе выбираемых элементов. Используется для табов, элементов списка с множественным выбором, выбранных опций.   \n**Отличие от aria-current:** selected для выбора в UI-виджетах, current для навигации/контекста.',
                  },
                ],
                [
                  {
                    id: 'text-72',
                    type: 'prose',
                    markdown: '`<div role="tab" aria-selected="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-15',
              cells: [
                [
                  {
                    id: 'text-73',
                    type: 'prose',
                    markdown: '`aria-modal`',
                  },
                ],
                [
                  {
                    id: 'text-74',
                    type: 'prose',
                    markdown:
                      'Указывает, что элемент является модальным и блокирует взаимодействие с остальным контентом. Используется для модальных окон, диалогов, лайтбоксов.   \n**Требования:** при aria-modal="true" нужно программно управлять фокусом и блокировать навигацию за пределы модала.',
                  },
                ],
                [
                  {
                    id: 'text-75',
                    type: 'prose',
                    markdown: '`<div role="dialog" aria-modal="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-16',
              cells: [
                [
                  {
                    id: 'text-76',
                    type: 'prose',
                    markdown: '`aria-pressed`',
                  },
                ],
                [
                  {
                    id: 'text-77',
                    type: 'prose',
                    markdown:
                      'Указывает состояние кнопки-переключателя (toggle button). Используется для кнопок вкл/выкл, кнопок с сохранением состояния.   \n**Значения:** true (нажато), false (не нажато), mixed (частично нажато для группы).',
                  },
                ],
                [
                  {
                    id: 'text-78',
                    type: 'prose',
                    markdown: '`<button aria-pressed="false">Подписаться</button>`',
                  },
                ],
              ],
            },
            {
              id: 'row-17',
              cells: [
                [
                  {
                    id: 'text-79',
                    type: 'prose',
                    markdown: '`aria-checked`',
                  },
                ],
                [
                  {
                    id: 'text-80',
                    type: 'prose',
                    markdown:
                      'Указывает состояние чекбокса или радиокнопки. Используется для кастомных checkbox/radio элементов, элементов с множественным выбором.   \n**Значения:** true (выбрано), false (не выбрано), mixed (частично выбрано).',
                  },
                ],
                [
                  {
                    id: 'text-81',
                    type: 'prose',
                    markdown: '`<div role="checkbox" aria-checked="true">`',
                  },
                ],
              ],
            },
            {
              id: 'row-18',
              cells: [
                [
                  {
                    id: 'text-82',
                    type: 'prose',
                    markdown: '`aria-haspopup`',
                  },
                ],
                [
                  {
                    id: 'text-83',
                    type: 'prose',
                    markdown:
                      'Указывает, что элемент открывает всплывающий элемент. Используется для кнопок с меню, комбобоксов, элементов с подсказками.   \n**Значения:** true/menu (меню), dialog (диалог), listbox (список), tree (дерево), grid (таблица).',
                  },
                ],
                [
                  {
                    id: 'text-84',
                    type: 'prose',
                    markdown: '`<button aria-haspopup="menu">`',
                  },
                ],
              ],
            },
            {
              id: 'row-19',
              cells: [
                [
                  {
                    id: 'text-85',
                    type: 'prose',
                    markdown: '`aria-valuenow`',
                  },
                ],
                [
                  {
                    id: 'text-86',
                    type: 'prose',
                    markdown:
                      'Текущее значение элемента с диапазоном. Используется для слайдеров, прогресс-баров, спиннеров.   \n**Связка:** используется с aria-valuemin, aria-valuemax, aria-valuetext для полного описания.',
                  },
                ],
                [
                  {
                    id: 'text-87',
                    type: 'prose',
                    markdown:
                      '`<div role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">`',
                  },
                ],
              ],
            },
            {
              id: 'row-20',
              cells: [
                [
                  {
                    id: 'text-88',
                    type: 'prose',
                    markdown: '`aria-orientation`',
                  },
                ],
                [
                  {
                    id: 'text-89',
                    type: 'prose',
                    markdown:
                      'Указывает ориентацию элемента. Используется для слайдеров, скроллбаров, табов, меню.   \n**Значения:** horizontal (горизонтальная), vertical (вертикальная).   \n**Важно:** влияет на клавиатурную навигацию (стрелки вверх/вниз vs влево/вправо).',
                  },
                ],
                [
                  {
                    id: 'text-90',
                    type: 'prose',
                    markdown: '`<div role="tablist" aria-orientation="vertical">`',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'callout-91',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-92',
              type: 'prose',
              markdown:
                '**Правило первого приоритета:** Используйте нативные HTML-элементы когда возможно. Например, `<button>` лучше чем `<div role="button">`, потому что нативные элементы включают клавиатурную навигацию, фокус и семантику по умолчанию. ARIA следует использовать только когда HTML недостаточно.',
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-93',
          type: 'prose',
          markdown:
            '1. **В чём разница между семантическим HTML и ARIA?**\n   \n   Семантический HTML изначально несёт смысл (`<button>`, `<nav>`). ARIA дополняет или переопределяет семантику там, где HTML недостаточно. Правило: *«Сначала семантический HTML, потом ARIA»*.\n2. **Как обеспечить навигацию с клавиатуры?**\n   \n   Использовать `tabindex`, обрабатывать события `keydown` (Enter, Space, Escape, стрелки), обеспечить видимый фокус через CSS `:focus`.\n3. **Как тестировать доступность?**\n   \n   Автоматически: axe-core, Lighthouse. Вручную: навигация только с клавиатуры, скринридеры (NVDA, JAWS, VoiceOver), проверка контраста.\n4. **Какой контраст считается достаточным?**\n   \n   WCAG AA требует соотношение 4.5:1 для обычного текста и 3:1 для крупного (18pt+ или 14pt+ жирный). Уровень AAA более строгий: 7:1 и 4.5:1 соответственно.\n5. **Зачем `alt` у изображений?**\n   \n   Скринридеры читают `alt`-текст вместо изображения. Если изображение декоративное, используйте `alt=""`. Для информативных изображений описывайте их содержание и контекст.\n6. **Как интерпретировать результаты Lighthouse по доступности?**\n   \n   Lighthouse показывает автоматически обнаруживаемые проблемы и дает оценку 0-100. Однако автоматические тесты покрывают лишь часть требований WCAG. Оценка 100 не гарантирует полную доступность — обязательно нужно ручное тестирование с клавиатуры и скринридерами.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Инструменты для проверки',
      blocks: [
        {
          id: 'cards-94',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-95',
              title: 'Автоматические',
              blocks: [
                {
                  id: 'text-96',
                  type: 'prose',
                  markdown: '- axe DevTools\n- Lighthouse\n- WAVE\n- Pa11y',
                },
              ],
            },
            {
              id: 'card-97',
              title: 'Скринридеры',
              blocks: [
                {
                  id: 'text-98',
                  type: 'prose',
                  markdown:
                    '- NVDA (Windows)\n- JAWS (Windows)\n- VoiceOver (Mac/iOS)\n- TalkBack (Android)',
                },
              ],
            },
            {
              id: 'card-99',
              title: 'Ручное тестирование',
              blocks: [
                {
                  id: 'text-100',
                  type: 'prose',
                  markdown:
                    '- Навигация Tab/Shift+Tab\n- Контрастомеры\n- Симуляторы нарушений\n- Масштабирование до 200%',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lighthouse',
      title: 'Проверка доступности в Lighthouse',
      blocks: [
        {
          id: 'text-101',
          type: 'prose',
          markdown:
            'Lighthouse — встроенный инструмент Chrome DevTools, который автоматически проверяет множество аспектов доступности.',
        },
        {
          id: 'cards-102',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-103',
              title: 'Как запустить проверку:',
              blocks: [
                {
                  id: 'text-104',
                  type: 'prose',
                  markdown:
                    '1. Открыть DevTools (F12)\n2. Перейти во вкладку **Lighthouse**\n3. Выбрать категорию **Accessibility**\n4. Нажать **Analyze page load**',
                },
              ],
            },
          ],
        },
        {
          id: 'heading-105',
          type: 'heading',
          level: 3,
          text: 'Что проверяет Lighthouse:',
        },
        {
          id: 'cards-106',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-107',
              title: '✅ Структура документа',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-108',
                  type: 'prose',
                  markdown:
                    '- Наличие `<html lang>`\n- Валидные ARIA-атрибуты\n- Уникальные ID\n- Корректная иерархия заголовков\n- Правильные role-атрибуты',
                },
              ],
            },
            {
              id: 'card-109',
              title: '🖼️ Изображения и медиа',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-110',
                  type: 'prose',
                  markdown:
                    '- Наличие `alt` у `<img>`\n- Описательные alt-тексты\n- Субтитры для видео\n- Транскрипты для аудио',
                },
              ],
            },
            {
              id: 'card-111',
              title: '⌨️ Навигация',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-112',
                  type: 'prose',
                  markdown:
                    '- Все элементы доступны с клавиатуры\n- Видимый фокус\n- Правильный порядок табуляции\n- Отсутствие `tabindex` &gt; 0\n- Обработка клавиатурных событий',
                },
              ],
            },
            {
              id: 'card-113',
              title: '🎨 Визуальная доступность',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-114',
                  type: 'prose',
                  markdown:
                    '- Контраст текста (минимум 4.5:1)\n- Контраст интерактивных элементов (3:1)\n- Размер кликабельных областей (44×44px)\n- Масштабируемость текста',
                },
              ],
            },
            {
              id: 'card-115',
              title: '📝 Формы',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-116',
                  type: 'prose',
                  markdown:
                    '- Связь `<label>` с `<input>`\n- Описательные имена полей\n- Сообщения об ошибках\n- Атрибуты `aria-required`, `aria-invalid`',
                },
              ],
            },
            {
              id: 'card-117',
              title: '🔊 Динамический контент',
              headingLevel: 4,
              blocks: [
                {
                  id: 'text-118',
                  type: 'prose',
                  markdown:
                    '- Использование `aria-live`\n- Корректные role для виджетов\n- Состояния элементов (expanded, selected)\n- Фокус при открытии модалов',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-119',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-120',
              type: 'prose',
              markdown:
                '**Важно:** Lighthouse обнаруживает только ~30-50% проблем доступности. Автоматические тесты не заменяют ручное тестирование со скринридерами и навигацией с клавиатуры.',
            },
          ],
        },
        {
          id: 'heading-121',
          type: 'heading',
          level: 3,
          text: 'Интерпретация результатов:',
        },
        {
          id: 'table-122',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Оценка',
            },
            {
              id: 'column-2',
              label: 'Значение',
            },
            {
              id: 'column-3',
              label: 'Действия',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-123',
                    type: 'prose',
                    markdown: '**90-100**',
                  },
                ],
                [
                  {
                    id: 'text-124',
                    type: 'prose',
                    markdown: 'Отлично',
                  },
                ],
                [
                  {
                    id: 'text-125',
                    type: 'prose',
                    markdown: 'Мелкие улучшения, ручное тестирование',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-126',
                    type: 'prose',
                    markdown: '**50-89**',
                  },
                ],
                [
                  {
                    id: 'text-127',
                    type: 'prose',
                    markdown: 'Требует внимания',
                  },
                ],
                [
                  {
                    id: 'text-128',
                    type: 'prose',
                    markdown: 'Исправить выявленные проблемы',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-129',
                    type: 'prose',
                    markdown: '**0-49**',
                  },
                ],
                [
                  {
                    id: 'text-130',
                    type: 'prose',
                    markdown: 'Критично',
                  },
                ],
                [
                  {
                    id: 'text-131',
                    type: 'prose',
                    markdown: 'Срочно исправить основные нарушения',
                  },
                ],
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
          id: 'text-132',
          type: 'prose',
          markdown:
            'Веб-доступность — это не «дополнительная функция», а базовое требование качественного веба. Следование принципам WCAG, использование семантического HTML, ARIA-атрибутов и регулярное тестирование делают ваши проекты доступными для всех пользователей. Это не только этично, но и выгодно: расширяется аудитория, улучшается SEO, снижаются правовые риски.',
        },
        {
          id: 'resources-133',
          type: 'resources',
          items: [
            {
              id: 'link-134',
              label: 'WCAG Quick Reference',
              url: 'https://www.w3.org/WAI/WCAG21/quickref/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
