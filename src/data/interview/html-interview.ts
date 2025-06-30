export interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}

export const htmlInterviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Что такое HTML и для чего он используется?",
    answer: `
      <p><strong>HTML (HyperText Markup Language)</strong> — это язык разметки, который используется для создания структуры и представления содержимого веб-страниц.</p>

      <h3>Основные функции HTML:</h3>
      <ul>
        <li><strong>Структурирование контента</strong> — определяет иерархию элементов на странице</li>
        <li><strong>Семантическое описание</strong> — придает смысл различным частям документа</li>
        <li><strong>Связывание ресурсов</strong> — позволяет подключать CSS, JavaScript, изображения</li>
        <li><strong>Создание гиперссылок</strong> — обеспечивает навигацию между документами</li>
      </ul>

      <h3>Ключевые особенности:</h3>
      <ul>
        <li>HTML не является языком программирования — это язык разметки</li>
        <li>Использует систему тегов для описания элементов</li>
        <li>Поддерживается всеми современными браузерами</li>
        <li>Служит основой для веб-страниц, поверх которой работают CSS и JavaScript</li>
      </ul>
    `,
    difficulty: 'junior',
    tags: ['основы', 'структура']
  },
  {
    id: 2,
    question: "Объясните разницу между семантическими и несемантическими HTML-тегами. Приведите примеры.",
    answer: `
      <h3>Семантические теги</h3>
      <p>Семантические теги <strong>описывают смысл и назначение</strong> содержимого, а не только его внешний вид. Они помогают поисковым системам, скрин-ридерам и другим инструментам понять структуру и содержание страницы.</p>

      <h4>Основные семантические теги:</h4>
      <ul>
        <li><strong>header</strong> — заголовочная часть секции или страницы</li>
        <li><strong>nav</strong> — навигационные ссылки</li>
        <li><strong>main</strong> — основное содержимое страницы</li>
        <li><strong>article</strong> — независимая статья или публикация</li>
        <li><strong>section</strong> — логическая секция документа</li>
        <li><strong>aside</strong> — дополнительная информация (сайдбар)</li>
        <li><strong>footer</strong> — нижняя часть секции или страницы</li>
        <li><strong>figure</strong> — иллюстрация с подписью</li>
        <li><strong>time</strong> — дата и время</li>
      </ul>

      <h3>Несемантические теги</h3>
      <p>Несемантические теги <strong>не несут смысловой нагрузки</strong> и используются только для группировки или стилизации элементов. Основные примеры: div и span.</p>

      <h3>Преимущества семантической разметки:</h3>
      <ul>
        <li><strong>SEO</strong> — поисковые системы лучше понимают содержимое</li>
        <li><strong>Доступность</strong> — скрин-ридеры могут правильно навигировать</li>
        <li><strong>Читаемость кода</strong> — разработчикам легче понять структуру</li>
        <li><strong>Сопровождаемость</strong> — код становится более понятным и логичным</li>
      </ul>
    `,
    difficulty: 'middle',
    tags: ['семантика', 'доступность', 'SEO']
  },
  {
    id: 3,
    question: "Что такое DOCTYPE и зачем он нужен?",
    answer: `
      <p><strong>DOCTYPE</strong> — это декларация типа документа, которая сообщает браузеру, какую версию HTML или XHTML использует документ.</p>

      <h3>Основные функции DOCTYPE:</h3>
      <ul>
        <li><strong>Активация стандартного режима</strong> — браузер интерпретирует документ согласно современным стандартам</li>
        <li><strong>Предотвращение quirks mode</strong> — избегание режима совместимости со старыми браузерами</li>
        <li><strong>Валидация</strong> — определяет правила для проверки корректности разметки</li>
        <li><strong>Консистентность</strong> — обеспечивает одинаковое отображение в разных браузерах</li>
      </ul>

      <h3>HTML5 DOCTYPE:</h3>
      <p>В HTML5 используется упрощенная декларация, которая активирует стандартный режим во всех современных браузерах. Она должна быть первой строкой документа.</p>

      <h3>Что происходит без DOCTYPE:</h3>
      <ul>
        <li>Браузер переходит в режим совместимости (quirks mode)</li>
        <li>Непредсказуемое поведение CSS</li>
        <li>Различия в отображении между браузерами</li>
        <li>Проблемы с JavaScript и DOM</li>
      </ul>
    `,
    difficulty: 'junior',
    tags: ['основы', 'стандарты']
  },
  {
    id: 4,
    question: "Что такое семантическая верстка и почему она важна?",
    answer: `
      <p><strong>Семантическая верстка</strong> — это подход к созданию HTML-разметки, при котором теги выбираются не по внешнему виду, а по смыслу содержимого.</p>

      <h3>Принципы семантической верстки:</h3>
      <ul>
        <li><strong>Смысловое соответствие</strong> — каждый тег отражает назначение контента</li>
        <li><strong>Логическая структура</strong> — документ имеет четкую иерархию</li>
        <li><strong>Независимость от оформления</strong> — структура не зависит от CSS</li>
        <li><strong>Понятность</strong> — код легко читается и понимается</li>
      </ul>

      <h3>Преимущества семантической верстки:</h3>
      <ul>
        <li><strong>Улучшение SEO</strong> — поисковые системы лучше индексируют контент</li>
        <li><strong>Повышение доступности</strong> — скрин-ридеры корректно интерпретируют структуру</li>
        <li><strong>Лучшая поддержка</strong> — код легче поддерживать и развивать</li>
        <li><strong>Кроссплатформенность</strong> — контент корректно отображается на всех устройствах</li>
        <li><strong>Будущая совместимость</strong> — код остается актуальным при обновлении стандартов</li>
      </ul>

      <h3>Ключевые семантические элементы:</h3>
      <ul>
        <li><strong>Структурные:</strong> header, nav, main, section, article, aside, footer</li>
        <li><strong>Текстовые:</strong> h1-h6, p, blockquote, address</li>
        <li><strong>Списки:</strong> ul, ol, dl</li>
        <li><strong>Медиа:</strong> figure, figcaption</li>
        <li><strong>Интерактивные:</strong> details, summary</li>
      </ul>
    `,
    difficulty: 'middle',
    tags: ['семантика', 'структура', 'лучшие практики']
  },
  {
    id: 5,
    question: "Что такое доступность (accessibility) в веб-разработке и как HTML помогает ее обеспечить?",
    answer: `
      <p><strong>Доступность (A11y)</strong> — это практика создания веб-контента, который могут использовать люди с различными ограничениями возможностей.</p>

      <h3>Основные принципы доступности (WCAG):</h3>
      <ul>
        <li><strong>Воспринимаемость</strong> — информация должна быть представлена в доступной форме</li>
        <li><strong>Управляемость</strong> — интерфейс должен быть удобен для навигации</li>
        <li><strong>Понятность</strong> — информация и управление должны быть понятными</li>
        <li><strong>Надежность</strong> — контент должен работать с различными технологиями</li>
      </ul>

      <h3>HTML-средства для обеспечения доступности:</h3>
      <ul>
        <li><strong>Семантические теги</strong> — передают структуру и смысл контента</li>
        <li><strong>Атрибуты alt</strong> — описывают изображения для скрин-ридеров</li>
        <li><strong>Заголовки h1-h6</strong> — создают логическую иерархию контента</li>
        <li><strong>Labels для форм</strong> — связывают подписи с элементами управления</li>
        <li><strong>Атрибуты ARIA</strong> — расширяют семантику для сложных компонентов</li>
        <li><strong>Навигация с клавиатуры</strong> — tabindex, focus management</li>
      </ul>

      <h3>Группы пользователей с ограничениями:</h3>
      <ul>
        <li><strong>Слабовидящие и незрячие</strong> — используют скрин-ридеры</li>
        <li><strong>Люди с нарушениями слуха</strong> — нуждаются в субтитрах и транскрипциях</li>
        <li><strong>Люди с моторными нарушениями</strong> — используют клавиатуру или альтернативные устройства</li>
        <li><strong>Люди с когнитивными особенностями</strong> — нуждаются в простом и понятном интерфейсе</li>
      </ul>

      <h3>Инструменты для проверки доступности:</h3>
      <ul>
        <li>Автоматические тесты (axe, WAVE)</li>
        <li>Ручное тестирование с клавиатурой</li>
        <li>Проверка с помощью скрин-ридеров</li>
        <li>Валидация HTML</li>
      </ul>
    `,
    difficulty: 'middle',
    tags: ['доступность', 'ARIA', 'пользовательский опыт']
  },
  {
    id: 6,
    question: "Как эффективно сделать адаптивное изображение в HTML? Расскажите о различных подходах.",
    answer: `
      <p><strong>Адаптивные изображения</strong> — это техника, позволяющая отображать разные версии изображения в зависимости от характеристик устройства и экрана.</p>

      <h3>Основные подходы к адаптивным изображениям:</h3>

      <h4>1. Элемент picture с source</h4>
      <ul>
        <li><strong>Назначение:</strong> выбор изображения по медиа-запросам</li>
        <li><strong>Применение:</strong> разные форматы, размеры, кадрирование для разных устройств</li>
        <li><strong>Преимущества:</strong> полный контроль над выбором изображения</li>
      </ul>

      <h4>2. Атрибут srcset и sizes</h4>
      <ul>
        <li><strong>Назначение:</strong> предоставление вариантов изображения разной плотности и размера</li>
        <li><strong>srcset:</strong> список изображений с указанием их характеристик</li>
        <li><strong>sizes:</strong> информация о размерах изображения в разных условиях</li>
        <li><strong>Браузер:</strong> самостоятельно выбирает подходящее изображение</li>
      </ul>

      <h4>3. CSS background-image с медиа-запросами</h4>
      <ul>
        <li><strong>Применение:</strong> декоративные изображения</li>
        <li><strong>Ограничения:</strong> не подходит для контентных изображений</li>
      </ul>

      <h3>Критерии выбора изображения:</h3>
      <ul>
        <li><strong>Плотность пикселей (DPR)</strong> — для Retina и обычных экранов</li>
        <li><strong>Ширина viewport</strong> — для разных размеров экрана</li>
        <li><strong>Формат изображения</strong> — WebP, AVIF для современных браузеров</li>
        <li><strong>Ориентация</strong> — портретная или альбомная</li>
      </ul>

      <h3>Преимущества адаптивных изображений:</h3>
      <ul>
        <li><strong>Производительность</strong> — загрузка оптимального размера</li>
        <li><strong>Качество</strong> — четкость на всех типах экранов</li>
        <li><strong>Трафик</strong> — экономия мобильного трафика</li>
        <li><strong>UX</strong> — быстрая загрузка и хорошее качество</li>
      </ul>

      <h3>Рекомендации по использованию:</h3>
      <ul>
        <li>Всегда указывайте fallback в img src</li>
        <li>Используйте современные форматы с fallback</li>
        <li>Учитывайте art direction для разных устройств</li>
        <li>Тестируйте на разных устройствах и соединениях</li>
      </ul>
    `,
    difficulty: 'middle',
    tags: ['изображения', 'производительность', 'адаптивность']
  },
  {
    id: 7,
    question: "Что такое ARIA и как она помогает в создании доступных веб-приложений?",
    answer: `
      <p><strong>ARIA (Accessible Rich Internet Applications)</strong> — это набор атрибутов, которые расширяют семантику HTML для создания более доступных веб-приложений.</p>

      <h3>Основные категории ARIA атрибутов:</h3>

      <h4>1. Роли (Roles)</h4>
      <ul>
        <li><strong>Назначение:</strong> определяют, что представляет собой элемент</li>
        <li><strong>Примеры:</strong> button, dialog, tabpanel, menuitem</li>
        <li><strong>Использование:</strong> когда семантики HTML недостаточно</li>
      </ul>

      <h4>2. Свойства (Properties)</h4>
      <ul>
        <li><strong>aria-label:</strong> альтернативное название элемента</li>
        <li><strong>aria-labelledby:</strong> ссылка на элемент, который служит названием</li>
        <li><strong>aria-describedby:</strong> ссылка на элемент с дополнительным описанием</li>
        <li><strong>aria-required:</strong> указывает обязательность поля</li>
      </ul>

      <h4>3. Состояния (States)</h4>
      <ul>
        <li><strong>aria-expanded:</strong> развернут ли элемент</li>
        <li><strong>aria-hidden:</strong> скрыт ли элемент от скрин-ридеров</li>
        <li><strong>aria-disabled:</strong> отключен ли элемент</li>
        <li><strong>aria-checked:</strong> отмечен ли элемент</li>
      </ul>

      <h3>Когда использовать ARIA:</h3>
      <ul>
        <li><strong>Кастомные компоненты</strong> — dropdown, modal, carousel</li>
        <li><strong>Динамический контент</strong> — обновления без перезагрузки страницы</li>
        <li><strong>Сложные интерфейсы</strong> — drag-and-drop, rich text editors</li>
        <li><strong>Недостаток семантики</strong> — когда HTML тегов недостаточно</li>
      </ul>

      <h3>Принципы использования ARIA:</h3>
      <ul>
        <li><strong>Первое правило:</strong> используйте семантический HTML где возможно</li>
        <li><strong>Не изменяйте семантику</strong> — не противоречьте встроенной семантике</li>
        <li><strong>Обеспечьте доступность с клавиатуры</strong> — все интерактивные элементы должны быть доступны</li>
        <li><strong>Не скрывайте фокус</strong> — визуальный фокус должен быть виден</li>
      </ul>

      <h3>Живые области (Live Regions):</h3>
      <ul>
        <li><strong>aria-live:</strong> уведомляет о динамических изменениях</li>
        <li><strong>aria-atomic:</strong> читать всю область или только изменения</li>
        <li><strong>aria-relevant:</strong> какие изменения отслеживать</li>
        <li><strong>Применение:</strong> уведомления, статусы, ошибки валидации</li>
      </ul>
    `,
    difficulty: 'senior',
    tags: ['ARIA', 'доступность', 'семантика']
  },
  {
    id: 8,
    question: "Объясните разницу между блочными и строчными элементами. Что такое inline-block?",
    answer: `
      <h3>Блочные элементы (Block-level elements)</h3>
      <ul>
        <li><strong>Поведение:</strong> занимают всю доступную ширину</li>
        <li><strong>Новая строка:</strong> всегда начинаются с новой строки</li>
        <li><strong>Размеры:</strong> можно задавать width и height</li>
        <li><strong>Отступы:</strong> margin и padding работают во всех направлениях</li>
        <li><strong>Примеры:</strong> div, p, h1-h6, section, article, header, footer</li>
      </ul>

      <h3>Строчные элементы (Inline elements)</h3>
      <ul>
        <li><strong>Поведение:</strong> занимают только необходимую ширину</li>
        <li><strong>Размещение:</strong> располагаются в одной строке с другими элементами</li>
        <li><strong>Размеры:</strong> width и height игнорируются</li>
        <li><strong>Отступы:</strong> только горизонтальные margin и padding</li>
        <li><strong>Примеры:</strong> span, a, strong, em, img, input</li>
      </ul>

      <h3>Inline-block элементы</h3>
      <ul>
        <li><strong>Гибридное поведение:</strong> сочетают свойства блочных и строчных</li>
        <li><strong>Размещение:</strong> в одной строке, как inline</li>
        <li><strong>Размеры:</strong> можно задавать width и height, как у block</li>
        <li><strong>Отступы:</strong> margin и padding работают во всех направлениях</li>
        <li><strong>Применение:</strong> кнопки, элементы навигации, сетки</li>
      </ul>

      <h3>Ключевые различия:</h3>
      <ul>
        <li><strong>Ширина:</strong> block — 100%, inline — по содержимому, inline-block — настраиваемая</li>
        <li><strong>Высота:</strong> block и inline-block — настраиваемая, inline — по содержимому</li>
        <li><strong>Перенос строки:</strong> block — да, inline и inline-block — нет</li>
        <li><strong>Вертикальные отступы:</strong> block и inline-block — да, inline — ограниченно</li>
      </ul>

      <h3>Практические соображения:</h3>
      <ul>
        <li><strong>Выбор типа</strong> зависит от задачи и желаемого поведения</li>
        <li><strong>CSS display</strong> позволяет изменить тип отображения</li>
        <li><strong>Современные подходы:</strong> flexbox и grid часто заменяют inline-block</li>
        <li><strong>Семантика важнее</strong> — выбирайте элемент по смыслу, а не по отображению</li>
      </ul>
    `,
    difficulty: 'junior',
    tags: ['основы', 'отображение', 'CSS']
  },
  {
    id: 9,
    question: "Что такое мета-теги и какие из них наиболее важны для SEO и пользовательского опыта?",
    answer: `
      <p><strong>Мета-теги</strong> — это HTML элементы, которые предоставляют метаданные о документе. Они не отображаются на странице, но используются браузерами, поисковыми системами и другими сервисами.</p>

      <h3>Критически важные мета-теги:</h3>

      <h4>1. charset — кодировка</h4>
      <ul>
        <li><strong>Назначение:</strong> определяет кодировку символов документа</li>
        <li><strong>Важность:</strong> предотвращает проблемы с отображением текста</li>
        <li><strong>Размещение:</strong> должен быть в первых 1024 байтах документа</li>
      </ul>

      <h4>2. viewport — адаптивность</h4>
      <ul>
        <li><strong>Назначение:</strong> контролирует отображение на мобильных устройствах</li>
        <li><strong>Параметры:</strong> width, initial-scale, user-scalable</li>
        <li><strong>Критичность:</strong> необходим для корректной работы адаптивного дизайна</li>
      </ul>

      <h3>SEO мета-теги:</h3>

      <h4>1. title — заголовок страницы</h4>
      <ul>
        <li><strong>Влияние:</strong> основной фактор ранжирования</li>
        <li><strong>Отображение:</strong> заголовок вкладки и в результатах поиска</li>
        <li><strong>Рекомендации:</strong> 50-60 символов, уникальность, ключевые слова</li>
      </ul>

      <h4>2. description — описание</h4>
      <ul>
        <li><strong>Назначение:</strong> краткое описание содержания страницы</li>
        <li><strong>Влияние:</strong> влияет на CTR в поисковой выдаче</li>
        <li><strong>Длина:</strong> 150-160 символов для оптимального отображения</li>
      </ul>

      <h4>3. robots — инструкции для поисковых роботов</h4>
      <ul>
        <li><strong>Директивы:</strong> index/noindex, follow/nofollow</li>
        <li><strong>Дополнительные:</strong> noarchive, nosnippet, noimageindex</li>
      </ul>

      <h3>Open Graph (социальные сети):</h3>
      <ul>
        <li><strong>og:title:</strong> заголовок при шаринге</li>
        <li><strong>og:description:</strong> описание при шаринге</li>
        <li><strong>og:image:</strong> изображение превью</li>
        <li><strong>og:url:</strong> канонический URL страницы</li>
        <li><strong>og:type:</strong> тип контента (website, article, etc.)</li>
      </ul>

      <h3>Twitter Cards:</h3>
      <ul>
        <li><strong>twitter:card:</strong> тип карточки (summary, summary_large_image)</li>
        <li><strong>twitter:title, twitter:description:</strong> заголовок и описание</li>
        <li><strong>twitter:image:</strong> изображение для превью</li>
      </ul>

      <h3>Технические мета-теги:</h3>
      <ul>
        <li><strong>http-equiv:</strong> HTTP заголовки (refresh, content-type)</li>
        <li><strong>theme-color:</strong> цвет темы для мобильных браузеров</li>
        <li><strong>canonical:</strong> канонический URL (link rel, но важен для SEO)</li>
      </ul>

      <h3>Лучшие практики:</h3>
      <ul>
        <li><strong>Уникальность:</strong> каждая страница должна иметь уникальные title и description</li>
        <li><strong>Релевантность:</strong> мета-теги должны соответствовать содержанию страницы</li>
        <li><strong>Длина:</strong> соблюдайте рекомендуемые ограничения</li>
        <li><strong>Тестирование:</strong> проверяйте отображение в поисковых системах и соцсетях</li>
      </ul>
    `,
    difficulty: 'middle',
    tags: ['SEO', 'мета-теги', 'оптимизация']
  },
  {
    id: 10,
    question: "Как работают HTML формы? Объясните различные типы input и их валидацию.",
    answer: `
      <p><strong>HTML формы</strong> — это интерфейс для сбора пользовательских данных и их отправки на сервер. Они состоят из элемента form и различных элементов управления.</p>

      <h3>Основные атрибуты формы:</h3>
      <ul>
        <li><strong>action:</strong> URL для отправки данных</li>
        <li><strong>method:</strong> метод HTTP (GET/POST)</li>
        <li><strong>enctype:</strong> кодировка данных (важно для файлов)</li>
        <li><strong>target:</strong> где открыть результат</li>
        <li><strong>novalidate:</strong> отключить встроенную валидацию</li>
      </ul>

      <h3>Типы input элементов:</h3>

      <h4>Текстовые поля:</h4>
      <ul>
        <li><strong>text:</strong> обычное текстовое поле</li>
        <li><strong>password:</strong> поле для паролей (скрывает ввод)</li>
        <li><strong>email:</strong> для email с базовой валидацией</li>
        <li><strong>url:</strong> для URL с проверкой формата</li>
        <li><strong>search:</strong> поле поиска</li>
        <li><strong>tel:</strong> для номеров телефонов</li>
      </ul>

      <h4>Числовые поля:</h4>
      <ul>
        <li><strong>number:</strong> числовой ввод с возможностью задать min/max</li>
        <li><strong>range:</strong> слайдер для выбора значения в диапазоне</li>
      </ul>

      <h4>Дата и время:</h4>
      <ul>
        <li><strong>date:</strong> выбор даты</li>
        <li><strong>time:</strong> выбор времени</li>
        <li><strong>datetime-local:</strong> дата и время без часового пояса</li>
        <li><strong>month:</strong> выбор месяца и года</li>
        <li><strong>week:</strong> выбор недели</li>
      </ul>

      <h4>Выбор и загрузка:</h4>
      <ul>
        <li><strong>checkbox:</strong> множественный выбор</li>
        <li><strong>radio:</strong> выбор одного варианта из группы</li>
        <li><strong>file:</strong> загрузка файлов</li>
        <li><strong>color:</strong> выбор цвета</li>
      </ul>

      <h4>Кнопки:</h4>
      <ul>
        <li><strong>submit:</strong> отправка формы</li>
        <li><strong>reset:</strong> сброс формы</li>
        <li><strong>button:</strong> обычная кнопка</li>
        <li><strong>image:</strong> кнопка-изображение</li>
      </ul>

      <h3>Встроенная HTML валидация:</h3>
      <ul>
        <li><strong>required:</strong> обязательное поле</li>
        <li><strong>pattern:</strong> регулярное выражение для проверки</li>
        <li><strong>min/max:</strong> ограничения для чисел и дат</li>
        <li><strong>minlength/maxlength:</strong> ограничения длины текста</li>
        <li><strong>step:</strong> шаг для числовых полей</li>
      </ul>

      <h3>Другие важные элементы форм:</h3>
      <ul>
        <li><strong>textarea:</strong> многострочный текст</li>
        <li><strong>select:</strong> выпадающий список</li>
        <li><strong>option:</strong> элементы списка</li>
        <li><strong>optgroup:</strong> группировка опций</li>
        <li><strong>label:</strong> подписи к элементам</li>
        <li><strong>fieldset:</strong> группировка связанных полей</li>
        <li><strong>legend:</strong> заголовок для fieldset</li>
      </ul>

      <h3>Доступность форм:</h3>
      <ul>
        <li><strong>Связывание label с input</strong> — through for/id или вложением</li>
        <li><strong>Описания ошибок</strong> — aria-describedby для связи с сообщениями</li>
        <li><strong>Группировка</strong> — fieldset/legend для связанных полей</li>
        <li><strong>Автофокус</strong> — autofocus на первом поле</li>
      </ul>

      <h3>Современные возможности:</h3>
      <ul>
        <li><strong>Автозаполнение:</strong> autocomplete для помощи браузерам</li>
        <li><strong>Подсказки:</strong> datalist для предложения вариантов</li>
        <li><strong>Валидация в реальном времени:</strong> JavaScript API для кастомной валидации</li>
        <li><strong>Отправка без перезагрузки:</strong> preventDefault и fetch API</li>
      </ul>
    \`,
    difficulty: 'middle',
    tags: ['формы', 'валидация', 'пользовательский ввод']
  },
  {
    id: 11,
    question: "Что такое Web Components и как они связаны с HTML? Объясните Shadow DOM.",
    answer: \`
      <p><strong>Web Components</strong> — это набор веб-стандартов, позволяющих создавать переиспользуемые пользовательские элементы с инкапсулированной функциональностью.</p>

      <h3>Основные технологии Web Components:</h3>

      <h4>1. Custom Elements</h4>
      <ul>
        <li><strong>Назначение:</strong> создание собственных HTML тегов</li>
        <li><strong>Жизненный цикл:</strong> connectedCallback, disconnectedCallback, attributeChangedCallback</li>
        <li><strong>Наследование:</strong> от HTMLElement или существующих элементов</li>
        <li><strong>Регистрация:</strong> customElements.define()</li>
      </ul>

      <h4>2. Shadow DOM</h4>
      <ul>
        <li><strong>Инкапсуляция:</strong> изоляция DOM и стилей</li>
        <li><strong>Режимы:</strong> open (доступен извне) и closed (полностью изолирован)</li>
        <li><strong>Слоты:</strong> механизм для вставки контента извне</li>
        <li><strong>Стили:</strong> CSS не пересекается с основным документом</li>
      </ul>

      <h4>3. HTML Templates</h4>
      <ul>
        <li><strong>template элемент:</strong> содержимое не отображается до клонирования</li>
        <li><strong>slot элемент:</strong> заполнители для внешнего контента</li>
        <li><strong>Клонирование:</strong> content.cloneNode() для использования</li>
      </ul>

      <h3>Преимущества Web Components:</h3>
      <ul>
        <li><strong>Переиспользуемость:</strong> компоненты работают везде</li>
        <li><strong>Инкапсуляция:</strong> изоляция стилей и логики</li>
        <li><strong>Стандартность:</strong> нативная поддержка браузеров</li>
        <li><strong>Фреймворк-независимость:</strong> работают с любыми библиотеками</li>
        <li><strong>Семантичность:</strong> создание значимых пользовательских тегов</li>
      </ul>

      <h3>Shadow DOM подробно:</h3>
      <ul>
        <li><strong>Shadow Root:</strong> корень теневого дерева</li>
        <li><strong>Shadow Host:</strong> элемент, к которому прикреплен Shadow DOM</li>
        <li><strong>Изоляция стилей:</strong> CSS правила не проникают в/из Shadow DOM</li>
        <li><strong>Композиция:</strong> slotted content для гибкости</li>
        <li><strong>События:</strong> re-targeting для сохранения инкапсуляции</li>
      </ul>

      <h3>Практическое применение:</h3>
      <ul>
        <li><strong>UI библиотеки:</strong> создание независимых компонентов</li>
        <li><strong>Виджеты:</strong> встраиваемые элементы интерфейса</li>
        <li><strong>Дизайн-системы:</strong> консистентные компоненты</li>
        <li><strong>Микрофронтенды:</strong> изолированные части приложения</li>
      </ul>

      <h3>Ограничения и соображения:</h3>
      <ul>
        <li><strong>SEO:</strong> содержимое Shadow DOM может быть недоступно поисковикам</li>
        <li><strong>Доступность:</strong> требует дополнительного внимания к ARIA</li>
        <li><strong>Стилизация:</strong> ограниченные возможности стилизации извне</li>
        <li><strong>Отладка:</strong> может быть сложнее отлаживать</li>
      </ul>
    \`,
    difficulty: 'senior',
    tags: ['Web Components', 'Shadow DOM', 'современный HTML']
  },
  {
    id: 12,
    question: "Объясните, что такое HTML5 и какие новые возможности он принес по сравнению с предыдущими версиями.",
    answer: \`
      <p><strong>HTML5</strong> — это пятая версия языка разметки HTML, которая принесла множество новых возможностей и улучшений для современной веб-разработки.</p>

      <h3>Новые семантические элементы:</h3>
      <ul>
        <li><strong>Структурные:</strong> header, nav, main, section, article, aside, footer</li>
        <li><strong>Контентные:</strong> figure, figcaption, details, summary, mark</li>
        <li><strong>Медиа:</strong> audio, video, canvas, svg (встроенная поддержка)</li>
        <li><strong>Интерактивные:</strong> progress, meter, output</li>
      </ul>

      <h3>Улучшения в формах:</h3>
      <ul>
        <li><strong>Новые типы input:</strong> email, url, number, range, date, time, color</li>
        <li><strong>Атрибуты валидации:</strong> required, pattern, min, max, step</li>
        <li><strong>Новые элементы:</strong> datalist, keygen, output</li>
        <li><strong>Плейсхолдеры:</strong> placeholder атрибут</li>
        <li><strong>Автофокус:</strong> autofocus атрибут</li>
      </ul>

      <h3>Мультимедиа возможности:</h3>
      <ul>
        <li><strong>Нативное видео/аудио:</strong> без необходимости плагинов</li>
        <li><strong>Canvas API:</strong> рисование 2D и 3D графики</li>
        <li><strong>SVG интеграция:</strong> встроенная поддержка векторной графики</li>
        <li><strong>Веб-камера/микрофон:</strong> getUserMedia API</li>
      </ul>

      <h3>API и новые возможности:</h3>
      <ul>
        <li><strong>Локальное хранение:</strong> localStorage, sessionStorage</li>
        <li><strong>Офлайн приложения:</strong> Application Cache (устарел), Service Workers</li>
        <li><strong>Геолокация:</strong> определение местоположения пользователя</li>
        <li><strong>История браузера:</strong> History API</li>
        <li><strong>Drag and Drop:</strong> нативная поддержка перетаскивания</li>
      </ul>

      <h3>Семантические улучшения:</h3>
      <ul>
        <li><strong>Микроданные:</strong> itemscope, itemtype, itemprop</li>
        <li><strong>ARIA поддержка:</strong> лучшая интеграция с assistive technologies</li>
        <li><strong>Ролевые атрибуты:</strong> встроенная поддержка ролей</li>
        <li><strong>Контекстная семантика:</strong> элементы с четким назначением</li>
      </ul>

      <h3>Упрощения синтаксиса:</h3>
      <ul>
        <li><strong>DOCTYPE:</strong> упрощен до простого объявления</li>
        <li><strong>Мета charset:</strong> упрощенное объявление кодировки</li>
        <li><strong>Менее строгий синтаксис:</strong> опциональные закрывающие теги для некоторых элементов</li>
        <li><strong>Булевы атрибуты:</strong> упрощенное написание</li>
      </ul>

      <h3>Устаревшие элементы и атрибуты:</h3>
      <ul>
        <li><strong>Презентационные элементы:</strong> font, center, big, strike</li>
        <li><strong>Фреймы:</strong> frameset, frame, noframes</li>
        <li><strong>Устаревшие атрибуты:</strong> align, bgcolor, border (для таблиц)</li>
        <li><strong>Замена на CSS:</strong> стилевые задачи перенесены в CSS</li>
      </ul>

      <h3>Обратная совместимость:</h3>
      <ul>
        <li><strong>Graceful degradation:</strong> новые возможности не ломают старые браузеры</li>
        <li><strong>Полифиллы:</strong> возможность добавить поддержку в старые браузеры</li>
        <li><strong>Прогрессивное улучшение:</strong> базовая функциональность работает везде</li>
      </ul>

      <h3>Влияние на веб-разработку:</h3>
      <ul>
        <li><strong>Нативные возможности:</strong> меньше зависимости от плагинов</li>
        <li><strong>Мобильная дружелюбность:</strong> лучшая поддержка мобильных устройств</li>
        <li><strong>Производительность:</strong> нативные API работают быстрее</li>
        <li><strong>Стандартизация:</strong> единые подходы к решению типовых задач</li>
      </ul>
    \`,
    difficulty: 'middle',
    tags: ['HTML5', 'новые возможности', 'эволюция']
  },
  {
    id: 13,
    question: "Что такое валидация HTML и почему она важна? Какие инструменты используются для валидации?",
    answer: \`
      <p><strong>Валидация HTML</strong> — это процесс проверки HTML кода на соответствие стандартам и спецификациям W3C.</p>

      <h3>Зачем нужна валидация:</h3>
      <ul>
        <li><strong>Кроссбраузерная совместимость:</strong> корректное отображение во всех браузерах</li>
        <li><strong>Доступность:</strong> правильная работа assistive technologies</li>
        <li><strong>SEO оптимизация:</strong> поисковые системы лучше понимают валидный код</li>
        <li><strong>Производительность:</strong> браузеры быстрее обрабатывают корректную разметку</li>
        <li><strong>Сопровождаемость:</strong> чистый код легче поддерживать</li>
        <li><strong>Профессионализм:</strong> показатель качества кода</li>
      </ul>

      <h3>Типы ошибок валидации:</h3>

      <h4>Структурные ошибки:</h4>
      <ul>
        <li><strong>Незакрытые теги:</strong> отсутствие закрывающих тегов</li>
        <li><strong>Неправильная вложенность:</strong> нарушение иерархии элементов</li>
        <li><strong>Дублированные ID:</strong> повторение уникальных идентификаторов</li>
        <li><strong>Неправильное использование элементов:</strong> блочные в строчных</li>
      </ul>

      <h4>Атрибутные ошибки:</h4>
      <ul>
        <li><strong>Недопустимые атрибуты:</strong> несуществующие или неуместные атрибуты</li>
        <li><strong>Неправильные значения:</strong> некорректные значения атрибутов</li>
        <li><strong>Отсутствие обязательных атрибутов:</strong> например, alt для img</li>
        <li><strong>Синтаксические ошибки:</strong> неправильное написание атрибутов</li>
      </ul>

      <h3>Инструменты валидации:</h3>

      <h4>Онлайн валидаторы:</h4>
      <ul>
        <li><strong>W3C Markup Validator:</strong> официальный валидатор W3C</li>
        <li><strong>HTML5 Validator:</strong> специализированный для HTML5</li>
        <li><strong>Validator.nu:</strong> современный валидатор</li>
      </ul>

      <h4>Браузерные инструменты:</h4>
      <ul>
        <li><strong>DevTools:</strong> встроенные инструменты разработчика</li>
        <li><strong>Консоль:</strong> отображение ошибок парсинга</li>
        <li><strong>Lighthouse:</strong> комплексная проверка качества</li>
        <li><strong>Accessibility insights:</strong> проверка доступности</li>
      </ul>

      <h4>Редакторы и IDE:</h4>
      <ul>
        <li><strong>VS Code extensions:</strong> HTML Validate, W3C Validation</li>
        <li><strong>WebStorm:</strong> встроенная валидация</li>
        <li><strong>Sublime Text plugins:</strong> SublimeLinter-html-tidy</li>
      </ul>

      <h4>Автоматизированные инструменты:</h4>
      <ul>
        <li><strong>htmlhint:</strong> линтер для HTML</li>
        <li><strong>html-validate:</strong> валидатор для CI/CD</li>
        <li><strong>webhint:</strong> комплексная проверка веб-страниц</li>
      </ul>

      <h3>Процесс валидации:</h3>
      <ul>
        <li><strong>Локальная проверка:</strong> в процессе разработки</li>
        <li><strong>Автоматические тесты:</strong> в системе CI/CD</li>
        <li><strong>Периодический аудит:</strong> регулярная проверка проекта</li>
        <li><strong>Pre-commit hooks:</strong> проверка перед коммитом</li>
      </ul>

      <h3>Частые проблемы и их решения:</h3>
      <ul>
        <li><strong>Устаревшие DOCTYPE:</strong> использование современного HTML5 DOCTYPE</li>
        <li><strong>Смешивание HTML версий:</strong> последовательное использование стандарта</li>
        <li><strong>Игнорирование семантики:</strong> правильный выбор элементов</li>
        <li><strong>Неправильная структура форм:</strong> корректное использование label и input</li>
      </ul>

      <h3>Лучшие практики:</h3>
      <ul>
        <li><strong>Валидация на всех этапах:</strong> от разработки до продакшена</li>
        <li><strong>Автоматизация:</strong> интеграция в рабочий процесс</li>
        <li><strong>Образование команды:</strong> понимание важности валидации</li>
        <li><strong>Баланс:</strong> валидность важна, но не должна мешать инновациям</li>
      </ul>
    \`,
    difficulty: 'middle',
    tags: ['валидация', 'качество кода', 'инструменты']
  },
  {
    id: 14,
    question: "Объясните концепцию прогрессивного улучшения (Progressive Enhancement) в контексте HTML.",
    answer: \`
      <p><strong>Прогрессивное улучшение</strong> — это философия веб-разработки, при которой создается базовая функциональная версия на HTML, а затем добавляются слои улучшений через CSS и JavaScript.</p>

      <h3>Основные принципы:</h3>
      <ul>
        <li><strong>Базовый фундамент:</strong> HTML обеспечивает основную функциональность</li>
        <li><strong>Слоеная архитектура:</strong> каждый слой добавляет возможности, не нарушая предыдущие</li>
        <li><strong>Универсальный доступ:</strong> контент доступен на всех устройствах и браузерах</li>
        <li><strong>Отказоустойчивость:</strong> сайт работает даже при отключенном CSS/JavaScript</li>
      </ul>

      <h3>Слои прогрессивного улучшения:</h3>

      <h4>1. HTML слой (структура и содержание):</h4>
      <ul>
        <li><strong>Семантическая разметка:</strong> правильные теги для контента</li>
        <li><strong>Логическая структура:</strong> заголовки, абзацы, списки</li>
        <li><strong>Доступные формы:</strong> корректные label и input</li>
        <li><strong>Навигация:</strong> простые ссылки для перемещения</li>
      </ul>

      <h4>2. CSS слой (презентация):</h4>
      <ul>
        <li><strong>Визуальное оформление:</strong> цвета, шрифты, отступы</li>
        <li><strong>Адаптивный дизайн:</strong> корректное отображение на разных экранах</li>
        <li><strong>Анимации:</strong> плавные переходы и эффекты</li>
      </ul>

      <h4>3. JavaScript слой (поведение):</h4>
      <ul>
        <li><strong>Интерактивность:</strong> динамическое поведение</li>
        <li><strong>AJAX:</strong> обновление контента без перезагрузки</li>
        <li><strong>Валидация форм:</strong> проверка в реальном времени</li>
      </ul>

      <h3>Практические примеры применения:</h3>

      <h4>Навигация:</h4>
      <ul>
        <li><strong>Базовый уровень:</strong> простые ссылки между страницами</li>
        <li><strong>CSS улучшение:</strong> выпадающие меню и стилизация</li>
        <li><strong>JS улучшение:</strong> мега-меню с анимациями</li>
      </ul>

      <h4>Формы:</h4>
      <ul>
        <li><strong>HTML:</strong> базовая форма с отправкой на сервер</li>
        <li><strong>CSS:</strong> красивое оформление и адаптивность</li>
        <li><strong>JavaScript:</strong> валидация в режиме реального времени</li>
      </ul>

      <h4>Контент:</h4>
      <ul>
        <li><strong>HTML:</strong> статический контент, доступный всем</li>
        <li><strong>CSS:</strong> улучшенная типографика и layout</li>
        <li><strong>JavaScript:</strong> динамическая загрузка и фильтрация</li>
      </ul>

      <h3>Преимущества подхода:</h3>
      <ul>
        <li><strong>Универсальная доступность:</strong> работает на любых устройствах</li>
        <li><strong>Лучшая производительность:</strong> базовая версия загружается быстро</li>
        <li><strong>SEO дружественность:</strong> контент доступен поисковикам</li>
        <li><strong>Надежность:</strong> сайт работает даже при проблемах с ресурсами</li>
        <li><strong>Будущая совместимость:</strong> адаптируется к новым технологиям</li>
      </ul>

      <h3>Роль HTML в прогрессивном улучшении:</h3>
      <ul>
        <li><strong>Семантическая основа:</strong> правильная структура для всех слоев</li>
        <li><strong>Доступность по умолчанию:</strong> встроенная поддержка assistive technologies</li>
        <li><strong>Fallback функциональность:</strong> базовые возможности без дополнительных технологий</li>
        <li><strong>Кроссплатформенность:</strong> HTML работает везде</li>
      </ul>

      <h3>Современные вызовы:</h3>
      <ul>
        <li><strong>SPA приложения:</strong> сложность применения традиционного подхода</li>
        <li><strong>Ожидания пользователей:</strong> привычка к интерактивным интерфейсам</li>
        <li><strong>Сложность разработки:</strong> необходимость поддерживать несколько уровней</li>
        <li><strong>Тестирование:</strong> проверка работоспособности на всех уровнях</li>
      </ul>

      <h3>Современные адаптации:</h3>
      <ul>
        <li><strong>Server-side rendering:</strong> гибрид для SPA</li>
        <li><strong>Progressive Web Apps:</strong> применение принципов к современным приложениям</li>
        <li><strong>Feature detection:</strong> умное определение возможностей браузера</li>
        <li><strong>Critical CSS:</strong> оптимизация загрузки стилей</li>
      </ul>
    \`,
    difficulty: 'senior',
    tags: ['прогрессивное улучшение', 'архитектура', 'доступность']
  },
  {
    id: 15,
    question: "Что такое микроданные (Microdata) в HTML и как они помогают в SEO?",
    answer: \`
      <p><strong>Микроданные (Microdata)</strong> — это HTML5 стандарт для добавления структурированных данных в веб-страницы, позволяющий поисковым системам лучше понимать содержание.</p>

      <h3>Основные атрибуты микроданных:</h3>
      <ul>
        <li><strong>itemscope:</strong> определяет область действия элемента</li>
        <li><strong>itemtype:</strong> указывает тип схемы данных</li>
        <li><strong>itemprop:</strong> определяет свойство элемента</li>
        <li><strong>itemid:</strong> уникальный идентификатор элемента</li>
        <li><strong>itemref:</strong> ссылается на другие элементы той же области</li>
      </ul>

      <h3>Популярные схемы Schema.org:</h3>

      <h4>Организация и места:</h4>
      <ul>
        <li><strong>Organization:</strong> информация о компании</li>
        <li><strong>LocalBusiness:</strong> местные предприятия</li>
        <li><strong>Place:</strong> географические места</li>
        <li><strong>PostalAddress:</strong> почтовые адреса</li>
      </ul>

      <h4>Контент и медиа:</h4>
      <ul>
        <li><strong>Article:</strong> статьи и публикации</li>
        <li><strong>BlogPosting:</strong> записи в блоге</li>
        <li><strong>NewsArticle:</strong> новостные статьи</li>
        <li><strong>VideoObject:</strong> видео контент</li>
        <li><strong>ImageObject:</strong> изображения</li>
      </ul>

      <h4>Продукты и услуги:</h4>
      <ul>
        <li><strong>Product:</strong> товары</li>
        <li><strong>Offer:</strong> предложения и цены</li>
        <li><strong>Review:</strong> отзывы</li>
        <li><strong>Rating:</strong> рейтинги</li>
      </ul>

      <h4>События и время:</h4>
      <ul>
        <li><strong>Event:</strong> мероприятия</li>
        <li><strong>DateTime:</strong> даты и время</li>
        <li><strong>Duration:</strong> продолжительность</li>
      </ul>

      <h3>Преимущества для SEO:</h3>
      <ul>
        <li><strong>Расширенные сниппеты:</strong> более информативные результаты поиска</li>
        <li><strong>Knowledge Graph:
