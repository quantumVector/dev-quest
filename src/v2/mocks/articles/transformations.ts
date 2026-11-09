import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/css/transformations-snippettransformtypes.css.txt?raw'
import example2 from '../snippets/css/transformations-snippetanimatable.css.txt?raw'
import example3 from '../snippets/css/transformations-snippetgpu.css.txt?raw'
import example4 from '../snippets/css/transformations-snippetoptimization.js.txt?raw'
import example5 from '../snippets/css/transformations-snippeta11y.css.txt?raw'

// Content copied verbatim from src/views/css/Transformations.vue.
export default {
  ...articleSummaries.transformations,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        'CSS-трансформации — один из ключевых инструментов современного фронтенда. Они позволяют перемещать, вращать, масштабировать и искажать элементы без влияния на поток документа, а при правильном применении обеспечивают плавные 60fps-анимации даже на слабых устройствах. В этой статье разберём всё: от видов трансформаций до тонкостей GPU-ускорения и доступности.',
    },
  ],
  sections: [
    {
      id: 'types',
      title: 'Виды трансформаций',
      blocks: [
        {
          id: 'text-2',
          type: 'prose',
          markdown:
            'Все трансформации задаются через единственное свойство `transform`, которое принимает одну или несколько функций через пробел. Важно: порядок функций имеет значение — каждая следующая применяется к результату предыдущей, поэтому `translateX(100px) rotate(45deg)` и `rotate(45deg) translateX(100px)` дают разный визуальный результат.',
        },
        {
          id: 'table-3',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип',
            },
            {
              id: 'column-2',
              label: 'Основные функции',
            },
            {
              id: 'column-3',
              label: 'Типичное применение',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-4',
                    type: 'prose',
                    markdown: '**Translate**',
                  },
                ],
                [
                  {
                    id: 'text-5',
                    type: 'prose',
                    markdown: '`translateX/Y/Z()`, `translate()`, `translate3d()`',
                  },
                ],
                [
                  {
                    id: 'text-6',
                    type: 'prose',
                    markdown: 'Плавное перемещение, hover-смещения, слайдеры',
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
                    markdown: '**Rotate**',
                  },
                ],
                [
                  {
                    id: 'text-8',
                    type: 'prose',
                    markdown: '`rotate()`, `rotateX/Y/Z()`, `rotate3d()`',
                  },
                ],
                [
                  {
                    id: 'text-9',
                    type: 'prose',
                    markdown: 'Спиннеры, flip-карточки, иконки раскрытия меню',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-10',
                    type: 'prose',
                    markdown: '**Scale**',
                  },
                ],
                [
                  {
                    id: 'text-11',
                    type: 'prose',
                    markdown: '`scale()`, `scaleX/Y/Z()`, `scale3d()`',
                  },
                ],
                [
                  {
                    id: 'text-12',
                    type: 'prose',
                    markdown: 'Zoom-эффекты, нажатие кнопок, акцентирование',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-13',
                    type: 'prose',
                    markdown: '**Skew**',
                  },
                ],
                [
                  {
                    id: 'text-14',
                    type: 'prose',
                    markdown: '`skewX/Y()`, `skew()`',
                  },
                ],
                [
                  {
                    id: 'text-15',
                    type: 'prose',
                    markdown: 'Декоративные наклоны, параллелограммы',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-16',
                    type: 'prose',
                    markdown: '**Matrix**',
                  },
                ],
                [
                  {
                    id: 'text-17',
                    type: 'prose',
                    markdown: '`matrix()`, `matrix3d()`',
                  },
                ],
                [
                  {
                    id: 'text-18',
                    type: 'prose',
                    markdown: 'Математически точные комбинированные трансформации',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-19',
                    type: 'prose',
                    markdown: '**Perspective**',
                  },
                ],
                [
                  {
                    id: 'text-20',
                    type: 'prose',
                    markdown: '`perspective()`',
                  },
                ],
                [
                  {
                    id: 'text-21',
                    type: 'prose',
                    markdown: 'Создание глубины для 3D-дочерних элементов',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'text-22',
          type: 'prose',
          markdown:
            'Для 3D-трансформаций необходимо создать трёхмерный контекст. Это делается двумя способами: свойство `perspective` на родителе задаёт расстояние от наблюдателя до плоскости Z=0, а `transform-style: preserve-3d` позволяет дочерним элементам существовать в трёхмерном пространстве родителя, а не быть спроецированными на плоскость. Без этих двух свойств 3D-функции вроде `rotateY()` работают некорректно или вовсе не видны.',
        },
        {
          id: 'text-23',
          type: 'prose',
          markdown:
            'Свойство `transform-origin` определяет точку, относительно которой применяется трансформация. По умолчанию это центр элемента (`50% 50%`). Изменение origin кардинально меняет визуальный результат: вращение с `transform-origin: top left` будет выглядеть как «распахивание двери», а не «вращение на месте». В 3D у свойства есть третья координата Z.',
        },
        {
          id: 'code-24',
          type: 'code',
          language: 'css',
          code: example1,
        },
      ],
    },
    {
      id: 'animation',
      title: 'Какие свойства трансформаций можно анимировать',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            'Не все свойства из семейства трансформаций поддерживают плавную интерполяцию. Браузер умеет плавно переходить между двумя состояниями только тогда, когда значения можно математически интерполировать — то есть вычислить промежуточные состояния. Свойства, принимающие только ключевые слова (`flat` / `preserve-3d`, `visible` / `hidden`), интерполировать невозможно, поэтому transition на них игнорируется.',
        },
        {
          id: 'cards-26',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-27',
              title: '✅ Анимируемые',
              blocks: [
                {
                  id: 'text-28',
                  type: 'prose',
                  markdown:
                    '- `transform` — интерполируется как матрица; браузер находит промежуточные значения для каждой функции\n- `transform-origin` — координаты интерполируются независимо, создавая эффект «плавающей оси»\n- `perspective` — числовое значение в px, легко интерполируется; позволяет динамически менять «выпуклость» 3D-сцены\n- `perspective-origin` — координаты точки наблюдателя интерполируются как числа',
                },
              ],
            },
            {
              id: 'card-29',
              title: '❌ Неанимируемые',
              blocks: [
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- `transform-style` — переключает между `flat` и `preserve-3d`; переход мгновенный\n- `backface-visibility` — переключает между `visible` и `hidden`; переход мгновенный\n- `will-change` — служебная подсказка браузеру, не визуальное свойство; анимация бессмысленна',
                },
              ],
            },
          ],
        },
        {
          id: 'callout-31',
          type: 'callout',
          tone: 'warning',
          label: 'Важная особенность transform',
          blocks: [
            {
              id: 'text-32',
              type: 'prose',
              markdown:
                'Нельзя анимировать отдельные функции внутри `transform` с разными таймингами. Всё, что записано в одном свойстве, анимируется как единое целое. Если нужны независимые тайминги для translateX и rotate — используйте вложенные элементы, каждый со своим `transition: transform`.',
            },
          ],
        },
        {
          id: 'code-33',
          type: 'code',
          language: 'css',
          code: example2,
        },
      ],
    },
    {
      id: 'gpu',
      title: 'Аппаратное ускорение и композитные слои',
      blocks: [
        {
          id: 'text-34',
          type: 'prose',
          markdown:
            'Браузер рендерит страницу в три этапа: **Layout** (вычисление позиций и размеров), **Paint** (растеризация пикселей) и **Composite** (склейка слоёв на GPU). Анимация свойств вроде `left`, `width` или `background` запускает весь конвейер с самого начала — это дорого. Анимация `transform` и `opacity` пропускает Layout и Paint и работает только на этапе Composite, который выполняется на GPU в отдельном потоке, не блокируя главный.',
        },
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            'Чтобы элемент обрабатывался на GPU, браузер должен вынести его в отдельный **композитный слой**. Это происходит автоматически при наличии 3D-трансформаций, `opacity < 1`, `filter`, `position: fixed`. Принудительно создать слой можно через `will-change: transform` (современный стандартный способ) или старый хак `transform: translateZ(0)` / `translate3d(0,0,0)`.',
        },
        {
          id: 'callout-36',
          type: 'callout',
          tone: 'warning',
          label: 'Layer explosion',
          blocks: [
            {
              id: 'text-37',
              type: 'prose',
              markdown:
                'Каждый композитный слой потребляет GPU-память. Если навесить `will-change: transform` на все элементы подряд, это может привести к исчерпанию памяти и падению производительности — особенно на мобильных устройствах. Создавайте слои только для активно анимируемых элементов и удаляйте `will-change` после завершения анимации.',
            },
          ],
        },
        {
          id: 'table-38',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Свойство',
            },
            {
              id: 'column-2',
              label: 'GPU-ускорение',
            },
            {
              id: 'column-3',
              label: 'Этапы рендеринга',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: '`transform`',
                  },
                ],
                [
                  {
                    id: 'tags-40',
                    type: 'tags',
                    items: ['✅ Полное'],
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Только Composite',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`opacity`',
                  },
                ],
                [
                  {
                    id: 'tags-43',
                    type: 'tags',
                    items: ['✅ Полное'],
                  },
                ],
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: 'Только Composite',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: '`filter`',
                  },
                ],
                [
                  {
                    id: 'tags-46',
                    type: 'tags',
                    items: ['✅ Полное'],
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Composite (иногда + Paint)',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '`background-color`',
                  },
                ],
                [
                  {
                    id: 'tags-49',
                    type: 'tags',
                    items: ['⚠️ Нет'],
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: 'Paint + Composite',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: '`left / top`',
                  },
                ],
                [
                  {
                    id: 'tags-52',
                    type: 'tags',
                    items: ['❌ Нет'],
                  },
                ],
                [
                  {
                    id: 'text-53',
                    type: 'prose',
                    markdown: 'Layout + Paint + Composite',
                  },
                ],
              ],
            },
            {
              id: 'row-6',
              cells: [
                [
                  {
                    id: 'text-54',
                    type: 'prose',
                    markdown: '`width / height`',
                  },
                ],
                [
                  {
                    id: 'tags-55',
                    type: 'tags',
                    items: ['❌ Нет'],
                  },
                ],
                [
                  {
                    id: 'text-56',
                    type: 'prose',
                    markdown: 'Layout + Paint + Composite',
                  },
                ],
              ],
            },
          ],
        },
        {
          id: 'code-57',
          type: 'code',
          language: 'css',
          code: example3,
        },
      ],
    },
    {
      id: 'optimization',
      title: 'Оптимизация анимаций',
      blocks: [
        {
          id: 'text-58',
          type: 'prose',
          markdown:
            'Даже при использовании `transform` анимации можно организовать неэффективно. Разберём ключевые техники.',
        },
        {
          id: 'text-59',
          type: 'prose',
          markdown: '**will-change**',
        },
        {
          id: 'text-60',
          type: 'prose',
          markdown:
            'Это подсказка браузеру: «этот элемент скоро изменится». Браузер может заранее вынести элемент на GPU-слой и подготовить оптимизации. Добавляйте его непосредственно перед анимацией (например, на `:hover` родителя или через JS) и удаляйте сразу после завершения, слушая событие `transitionend`.',
        },
        {
          id: 'text-61',
          type: 'prose',
          markdown: '**requestAnimationFrame**',
        },
        {
          id: 'text-62',
          type: 'prose',
          markdown:
            'Для JS-анимаций всегда используйте `requestAnimationFrame`. Он синхронизирует обновления с частотой обновления экрана (обычно 60 Гц) и не блокирует главный поток. Важно батчить все изменения стилей внутри одного колбэка — не читайте вычисленные стили и сразу не пишите новые в одном кадре, это вызывает принудительный reflow (т.н. layout thrashing).',
        },
        {
          id: 'text-63',
          type: 'prose',
          markdown: '**CSS Containment**',
        },
        {
          id: 'text-64',
          type: 'prose',
          markdown:
            'Свойство `contain: layout style paint` изолирует элемент от остальной страницы: браузер знает, что изменения внутри контейнера не влияют на внешние элементы, и не пересчитывает их. Для анимированных списков и карточек это даёт ощутимый прирост производительности.',
        },
        {
          id: 'text-65',
          type: 'prose',
          markdown: '**Intersection Observer для ленивых анимаций**',
        },
        {
          id: 'text-66',
          type: 'prose',
          markdown:
            'Не имеет смысла держать `will-change` на элементах, которые пользователь ещё не видит. Intersection Observer позволяет включать анимацию только в момент попадания элемента в viewport и сразу отключать GPU-слой после завершения перехода.',
        },
        {
          id: 'code-67',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'Доступность и адаптивность',
      blocks: [
        {
          id: 'text-68',
          type: 'prose',
          markdown:
            'У части пользователей есть вестибулярные нарушения, при которых движущиеся объекты на экране вызывают физический дискомфорт или тошноту. Операционные системы предоставляют системную настройку «Уменьшить движение», которую браузер транслирует через медиазапрос `prefers-reduced-motion: reduce`. Это не опция — это требование к доступному интерфейсу: при включённой настройке анимации должны либо отключаться, либо заменяться мгновенными переходами.',
        },
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            'Также стоит разграничивать hover-эффекты: на сенсорных экранах состояние `:hover` ведёт себя непредсказуемо. Медиазапрос `(hover: hover) and (pointer: fine)` позволяет применять эффекты наведения только на устройствах с точным указателем — то есть там, где пользователь действительно может навести курсор.',
        },
        {
          id: 'text-70',
          type: 'prose',
          markdown:
            'CSS Containment, помимо оптимизации, полезен и для изоляции анимаций: он гарантирует, что анимированный элемент не спровоцирует нежелательные сдвиги соседних элементов.',
        },
        {
          id: 'code-71',
          type: 'code',
          language: 'css',
          code: example5,
        },
      ],
    },
    {
      id: 'questions',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-72',
          type: 'prose',
          markdown:
            '1. **Почему transform быстрее, чем изменение left/top?**\n   \n   Потому что `transform` обрабатывается только на этапе Composite — на GPU, в отдельном потоке. Изменение `left` / `top` запускает полный конвейер: Layout → Paint → Composite на CPU, что блокирует главный поток и вызывает просадки FPS.\n2. **Можно ли анимировать translateX и rotate с разными таймингами?**\n   \n   Напрямую — нет. Всё, что записано в `transform` одного элемента, анимируется единым transition. Для независимых таймингов нужны вложенные элементы: внешний анимирует translate, внутренний — rotate, каждый со своим `transition: transform`.\n3. **В чём разница между will-change и translateZ(0)?**\n   \n   Оба создают композитный слой, но `will-change` — семантичный современный стандарт: он описывает намерение, а не взламывает поведение. `translateZ(0)` — хак, который работает через побочный эффект 3D-контекста. На практике сегодня предпочтителен `will-change`.\n4. **Что такое layer explosion и как его избежать?**\n   \n   Это ситуация, когда на странице создаётся слишком много GPU-слоёв, что исчерпывает видеопамять и парадоксально ухудшает производительность. Решение: добавлять `will-change` только непосредственно перед анимацией и удалять его сразу после через `transitionend` / `animationend`.\n5. **Влияет ли порядок функций в transform на результат?**\n   \n   Да, критически. Трансформации применяются справа налево в системе координат. `translate(100px, 0) rotate(45deg)` — сначала сдвиг, потом поворот в исходной системе координат. `rotate(45deg) translate(100px, 0)` — сдвиг на 100px по уже повёрнутой оси X, что даёт совершенно другое положение.\n6. **Почему transform-style и backface-visibility нельзя анимировать?**\n   \n   Эти свойства принимают только ключевые слова без промежуточных значений. Браузер не может интерполировать между `flat` и `preserve-3d` — нет математической операции для «50% между ними». Поэтому transition игнорируется, и переход происходит мгновенно.\n7. **Как проверить GPU-слои в DevTools?**\n   \n   В Chrome DevTools: вкладка Rendering → включить «Layer borders» (синие рамки — плиточные слои, оранжевые — композитные). Вкладка Layers даёт полноценный 3D-обзор всех слоёв страницы с информацией о причине создания каждого. В Performance tab видно GPU Activity во время записи.',
        },
      ],
    },
    {
      id: 'summary',
      title: 'Итог',
      blocks: [
        {
          id: 'cards-73',
          type: 'cards',
          columns: 1,
          items: [
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown: '**Ключевые выводы**',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Анимируйте только `transform` и `opacity` — они работают на GPU и не вызывают Layout/Paint\n- Из связанных свойств анимируемы: `transform`, `transform-origin`, `perspective`, `perspective-origin`\n- Неанимируемы: `transform-style`, `backface-visibility`, `will-change`\n- Порядок функций в `transform` определяет визуальный результат\n- Создавайте GPU-слои через `will-change` только перед анимацией и удаляйте после\n- Изолируйте анимации через `contain: layout style paint`\n- Всегда поддерживайте `prefers-reduced-motion` и разграничивайте hover для touch-устройств',
                },
              ],
            },
          ],
        },
        {
          id: 'resources-77',
          type: 'resources',
          items: [
            {
              id: 'link-78',
              label: 'Web.dev Animations Guide',
              url: 'https://web.dev/animations-guide/',
            },
          ],
        },
        {
          id: 'resources-79',
          type: 'resources',
          items: [
            {
              id: 'link-80',
              label: 'CSS Triggers Reference',
              url: 'https://csstriggers.com/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
