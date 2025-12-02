import type { Question } from '@/types/question.ts'

export const chromeDevToolsQuestions: Question[] = [
  // Тема 1: Основные панели DevTools
  {
    id: 1,
    question: "Для чего используется панель Elements в Chrome DevTools?",
    options: [
      "Для отладки JavaScript кода",
      "Для просмотра и редактирования HTML/CSS в реальном времени",
      "Для анализа сетевых запросов",
      "Для профилирования производительности"
    ],
    correctAnswer: 1,
    explanation: "Панель Elements позволяет инспектировать и изменять DOM-структуру и CSS-стили страницы в реальном времени, видеть computed styles, box model и вносить временные изменения для тестирования.",
    topic: "Основные панели"
  },
  {
    id: 2,
    question: "Что показывает панель Console в DevTools?",
    options: [
      "Только ошибки JavaScript",
      "Логи, ошибки, предупреждения и позволяет выполнять JavaScript",
      "Только сетевые запросы",
      "Только предупреждения системы безопасности"
    ],
    correctAnswer: 1,
    explanation: "Console отображает логи (console.log), ошибки, предупреждения, позволяет выполнять JavaScript код напрямую, взаимодействовать с DOM и переменными страницы.",
    topic: "Основные панели"
  },
  {
    id: 3,
    question: "Для чего используется панель Sources в Chrome DevTools?",
    options: [
      "Для просмотра исходного кода страницы",
      "Для отладки JavaScript с брейкпоинтами и step-by-step выполнением",
      "Для загрузки файлов на сервер",
      "Для компиляции TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Sources - это debugger, позволяющий устанавливать breakpoints, пошагово выполнять код (step over, step into, step out), смотреть call stack, scope variables и исходный код всех файлов.",
    topic: "Основные панели"
  },
  {
    id: 4,
    question: "Что показывает панель Network в DevTools?",
    options: [
      "Скорость интернет-соединения",
      "Все HTTP/HTTPS запросы, их timing, headers, payload",
      "Только запросы к API",
      "Топологию сети"
    ],
    correctAnswer: 1,
    explanation: "Network показывает все сетевые запросы: timing (DNS, SSL, TTFB), размер, статус, headers, request/response body, waterfall диаграмму загрузки ресурсов.",
    topic: "Основные панели"
  },
  {
    id: 5,
    question: "Для чего используется панель Application в DevTools?",
    options: [
      "Для установки приложений",
      "Для работы с Storage (localStorage, cookies, IndexedDB), Service Workers, манифестом PWA",
      "Для запуска приложения в production режиме",
      "Для создания новых приложений"
    ],
    correctAnswer: 1,
    explanation: "Application позволяет просматривать и редактировать Storage (localStorage, sessionStorage, IndexedDB, cookies), управлять Service Workers, Cache Storage, просматривать манифест PWA.",
    topic: "Основные панели"
  },
  {
    id: 6,
    question: "Какая панель DevTools используется для анализа производительности загрузки страницы?",
    options: [
      "Console",
      "Network",
      "Lighthouse",
      "Security"
    ],
    correctAnswer: 2,
    explanation: "Lighthouse проводит аудит страницы по производительности, доступности, SEO, PWA и best practices, предоставляя детальный отчет с рекомендациями по оптимизации.",
    topic: "Основные панели"
  },

  // Тема 2: Performance Profiler
  {
    id: 7,
    question: "Для чего используется панель Performance в Chrome DevTools?",
    options: [
      "Для измерения скорости интернета",
      "Для профилирования runtime производительности: JavaScript execution, rendering, painting",
      "Для оптимизации размера bundle",
      "Для анализа SQL запросов"
    ],
    correctAnswer: 1,
    explanation: "Performance Profiler записывает и анализирует runtime активность: выполнение JS, rendering, painting, layout, composite, позволяя найти bottleneck'и производительности.",
    topic: "Performance Profiler"
  },
  {
    id: 8,
    question: "Что показывает flame chart в Performance профайлере?",
    options: [
      "Температуру процессора",
      "Иерархию вызовов функций и время их выполнения",
      "Сетевые запросы",
      "Использование памяти"
    ],
    correctAnswer: 1,
    explanation: "Flame chart визуализирует call stack: ширина блока - время выполнения, высота - глубина вложенности вызовов. Позволяет быстро найти самые медленные функции.",
    topic: "Performance Profiler"
  },
  {
    id: 9,
    question: "Что означают длинные желтые/красные блоки в Performance timeline?",
    options: [
      "Успешные операции",
      "Long tasks - задачи, блокирующие main thread (>50ms)",
      "Сетевые запросы",
      "Garbage collection"
    ],
    correctAnswer: 1,
    explanation: "Желтые (предупреждения) и красные (критичные) блоки показывают long tasks - долгие синхронные операции, блокирующие main thread и вызывающие 'janky' UI.",
    topic: "Performance Profiler"
  },
  {
    id: 10,
    question: "Как использовать Performance профайлер для поиска причин 'janky' анимаций?",
    options: [
      "Записать профиль во время воспроизведения анимации и найти frames >16.7ms",
      "Просто посмотреть на Network панель",
      "Использовать только Console",
      "Performance не показывает проблемы с анимациями"
    ],
    correctAnswer: 0,
    explanation: "Записываем Performance profile во время анимации, затем анализируем frames: frames >16.7ms (60fps) показывают dropped frames. Ищем причину в длинных JS tasks, layout thrashing, forced reflow.",
    topic: "Performance Profiler"
  },
  {
    id: 11,
    question: "Что такое 'Layout Shift' в Performance профайлере?",
    options: [
      "Изменение позиции элементов без взаимодействия пользователя",
      "Перемещение окна браузера",
      "Изменение размера экрана",
      "Скролл страницы"
    ],
    correctAnswer: 0,
    explanation: "Layout Shift - это неожиданное смещение видимых элементов страницы без действий пользователя. Влияет на CLS метрику. Частые причины: загрузка изображений без размеров, динамический контент.",
    topic: "Performance Profiler"
  },
  {
    id: 12,
    question: "Как Performance профайлер помогает оптимизировать rendering?",
    options: [
      "Автоматически оптимизирует код",
      "Показывает Paint/Layout/Composite операции и их время",
      "Компилирует CSS в оптимизированный формат",
      "Удаляет неиспользуемый CSS"
    ],
    correctAnswer: 1,
    explanation: "Performance показывает все rendering операции: Layout (вычисление позиций), Paint (отрисовка пикселей), Composite (слои). Помогает найти layout thrashing, лишние repaints, оптимизировать CSS.",
    topic: "Performance Profiler"
  },

  // Тема 3: Memory Profiler
  {
    id: 13,
    question: "Для чего используется панель Memory в Chrome DevTools?",
    options: [
      "Для очистки RAM компьютера",
      "Для поиска утечек памяти и анализа heap snapshots",
      "Для увеличения доступной памяти",
      "Для мониторинга памяти операционной системы"
    ],
    correctAnswer: 1,
    explanation: "Memory профайлер позволяет делать heap snapshots, записывать allocation timelines, находить утечки памяти, анализировать retained size объектов и garbage collection.",
    topic: "Memory Profiler"
  },
  {
    id: 14,
    question: "Что такое Heap Snapshot в Memory профайлере?",
    options: [
      "Снимок экрана приложения",
      "Снимок памяти JavaScript heap с информацией обо всех объектах",
      "Снимок сетевой активности",
      "Снимок DOM дерева"
    ],
    correctAnswer: 1,
    explanation: "Heap Snapshot - это моментальный снимок JavaScript heap, показывающий все объекты в памяти, их размеры, связи, retained size. Используется для поиска утечек памяти.",
    topic: "Memory Profiler"
  },
  {
    id: 15,
    question: "Как найти утечку памяти с помощью Memory профайлера?",
    options: [
      "Сделать один snapshot и проанализировать",
      "Сделать несколько snapshots до/после действий, сравнить, найти объекты с растущим retained size",
      "Просто посмотреть на Console",
      "Memory профайлер не показывает утечки"
    ],
    correctAnswer: 1,
    explanation: "Делаем baseline snapshot, выполняем действие (которое должно освободить память), делаем второй snapshot. Сравниваем: объекты с растущим кол-вом/размером - кандидаты на утечку.",
    topic: "Memory Profiler"
  },
  {
    id: 16,
    question: "Что показывает 'Shallow Size' vs 'Retained Size' в heap snapshot?",
    options: [
      "Это одно и то же",
      "Shallow - размер самого объекта, Retained - размер объекта + всех объектов, которые он удерживает",
      "Shallow для примитивов, Retained для объектов",
      "Shallow - до сжатия, Retained - после"
    ],
    correctAnswer: 1,
    explanation: "Shallow Size - размер самого объекта. Retained Size - размер объекта + размер всех объектов, которые будут собраны GC при удалении данного объекта (т.е. объекты, доступные только через него).",
    topic: "Memory Profiler"
  },
  {
    id: 17,
    question: "Что такое 'Detached DOM nodes' в Memory профайлере?",
    options: [
      "DOM узлы без родителя",
      "DOM узлы, удаленные из дерева, но все еще в памяти из-за JS ссылок",
      "Скрытые DOM узлы",
      "DOM узлы в Shadow DOM"
    ],
    correctAnswer: 1,
    explanation: "Detached DOM nodes - узлы, удаленные из DOM дерева, но сохраненные в памяти из-за JS ссылок на них. Частая причина утечек памяти - забытые event listeners или ссылки в замыканиях.",
    topic: "Memory Profiler"
  },
  {
    id: 18,
    question: "Как использовать Allocation Timeline в Memory профайлере?",
    options: [
      "Для просмотра истории изменений кода",
      "Для записи allocation/deallocation объектов во времени и поиска утечек",
      "Для планирования будущих allocations",
      "Для синхронизации времени между вкладками"
    ],
    correctAnswer: 1,
    explanation: "Allocation Timeline записывает создание и удаление объектов в реальном времени, показывая синие полосы (allocation) и падения (GC). Помогает найти объекты, которые создаются, но не удаляются.",
    topic: "Memory Profiler"
  },

  // Тема 4: Storage и данные
  {
    id: 19,
    question: "Где в DevTools можно просмотреть и редактировать localStorage?",
    options: [
      "Console",
      "Application → Storage → Local Storage",
      "Network",
      "Sources"
    ],
    correctAnswer: 1,
    explanation: "Application панель → Storage → Local Storage показывает все записи localStorage для текущего домена, позволяет добавлять, редактировать и удалять записи.",
    topic: "Storage"
  },
  {
    id: 20,
    question: "Как в DevTools просмотреть и отредактировать Cookies?",
    options: [
      "Console → document.cookie",
      "Application → Storage → Cookies",
      "Network → любой запрос → Cookies",
      "Оба варианта 2 и 3 корректны"
    ],
    correctAnswer: 3,
    explanation: "Cookies можно просмотреть в Application → Cookies (все cookies домена с возможностью редактирования) или в Network → конкретный запрос → Cookies tab (cookies этого запроса).",
    topic: "Storage"
  },
  {
    id: 21,
    question: "Где в DevTools можно просмотреть IndexedDB?",
    options: [
      "Console",
      "Application → Storage → IndexedDB",
      "Memory",
      "Performance"
    ],
    correctAnswer: 1,
    explanation: "Application → Storage → IndexedDB показывает все базы данных, object stores, индексы и записи. Можно просматривать данные, но редактирование ограничено.",
    topic: "Storage"
  },
  {
    id: 22,
    question: "Как в DevTools очистить все данные сайта (localStorage, cookies, cache)?",
    options: [
      "Application → Storage → Clear site data",
      "Вручную удалить каждый элемент",
      "Console → location.reload(true)",
      "Settings → Clear browsing data"
    ],
    correctAnswer: 0,
    explanation: "Application → Storage → Clear site data позволяет одним кликом очистить все данные: cookies, storage, cache, service workers для текущего origin.",
    topic: "Storage"
  },
  {
    id: 23,
    question: "Где в DevTools можно увидеть размер занятой storage quota?",
    options: [
      "Application → Storage → Storage",
      "Console → navigator.storage",
      "Network",
      "Performance"
    ],
    correctAnswer: 0,
    explanation: "Application → Storage показывает Storage Usage: сколько места занято (cookies, localStorage, IndexedDB, Cache Storage) и доступный лимит для origin.",
    topic: "Storage"
  },

  // Тема 5: Network анализ
  {
    id: 24,
    question: "Как использовать Network panel для анализа водопада загрузки (waterfall)?",
    options: [
      "Network показывает последовательность и параллелизм загрузки ресурсов",
      "Waterfall доступен только в Performance",
      "Network не показывает timing",
      "Нужно использовать сторонние инструменты"
    ],
    correctAnswer: 0,
    explanation: "Network waterfall показывает timeline загрузки каждого ресурса: DNS lookup, TCP connect, SSL, Request sent, Waiting (TTFB), Content download. Помогает найти bottleneck'и.",
    topic: "Network анализ"
  },
  {
    id: 25,
    question: "Что показывает 'DOMContentLoaded' событие в Network panel?",
    options: [
      "Когда все ресурсы загружены",
      "Когда HTML распарсен и DOM построен (до загрузки images/styles)",
      "Когда страница полностью готова",
      "Когда JavaScript выполнен"
    ],
    correctAnswer: 1,
    explanation: "DOMContentLoaded (синяя линия) срабатывает, когда HTML полностью загружен и распарсен, DOM построен, но до загрузки всех images, stylesheets и subframes.",
    topic: "Network анализ"
  },
  {
    id: 26,
    question: "Что показывает 'Load' событие в Network panel?",
    options: [
      "Когда DOM построен",
      "Когда все ресурсы (images, scripts, styles) полностью загружены",
      "Когда начинается загрузка первого ресурса",
      "Когда JavaScript начинает выполняться"
    ],
    correctAnswer: 1,
    explanation: "Load (красная линия) срабатывает, когда страница и все зависимые ресурсы (images, scripts, stylesheets) полностью загружены.",
    topic: "Network анализ"
  },
  {
    id: 27,
    question: "Как в Network panel найти запросы, которые блокируют rendering?",
    options: [
      "Искать запросы с большим размером",
      "Смотреть на Priority столбец и Waterfall - blocking resources загружаются в <head>",
      "Network не показывает блокирующие ресурсы",
      "Все запросы блокируют rendering"
    ],
    correctAnswer: 1,
    explanation: "Render-blocking ресурсы (CSS, sync scripts в <head>) показываются с High priority и блокируют DOMContentLoaded. Видны в waterfall как самые первые запросы.",
    topic: "Network анализ"
  },
  {
    id: 28,
    question: "Как в Network panel эмулировать медленное соединение?",
    options: [
      "Network throttling dropdown (Fast 3G, Slow 3G, Offline)",
      "Отключить Wi-Fi на компьютере",
      "Network не имеет throttling",
      "Только через сторонние инструменты"
    ],
    correctAnswer: 0,
    explanation: "Network panel имеет встроенный throttling: можно выбрать предустановки (Fast/Slow 3G, Offline) или настроить кастомные ограничения bandwidth и latency.",
    topic: "Network анализ"
  },
  {
    id: 29,
    question: "Как в Network найти запросы, отправленные через Fetch API?",
    options: [
      "Фильтр по XHR/Fetch или Initiator столбец",
      "Network не различает типы запросов",
      "Только через Console",
      "Fetch запросы не видны в Network"
    ],
    correctAnswer: 0,
    explanation: "Network показывает Fetch запросы в категории XHR (можно фильтровать). Initiator столбец показывает, откуда запрос инициирован (fetch(), script, img tag и т.д.).",
    topic: "Network анализ"
  },

  // Тема 6: Accessibility (A11y)
  {
    id: 30,
    question: "Что такое Accessibility Tree в DevTools?",
    options: [
      "Дерево файлов проекта",
      "Представление DOM для assistive technologies (screen readers)",
      "Дерево зависимостей",
      "Дерево CSS селекторов"
    ],
    correctAnswer: 1,
    explanation: "Accessibility Tree - это упрощенная версия DOM дерева, которую видят screen readers и другие assistive technologies. Показывает семантическую структуру без визуального мусора.",
    topic: "Accessibility"
  },
  {
    id: 31,
    question: "Где в DevTools можно увидеть Accessibility Tree?",
    options: [
      "Elements → Accessibility tab в боковой панели",
      "Console",
      "Application",
      "A11y Tree не доступен в DevTools"
    ],
    correctAnswer: 0,
    explanation: "Elements панель → выбрать элемент → Accessibility tab в боковой панели показывает роль элемента, имя, описание и его место в accessibility tree.",
    topic: "Accessibility"
  },
  {
    id: 32,
    question: "Какие проблемы accessibility может выявить Lighthouse аудит?",
    options: [
      "Только цветовой контраст",
      "Контраст, отсутствие alt текстов, неправильные ARIA атрибуты, проблемы с навигацией с клавиатуры",
      "Lighthouse не проверяет accessibility",
      "Только размер шрифтов"
    ],
    correctAnswer: 1,
    explanation: "Lighthouse проверяет множество a11y проблем: контраст цветов, alt тексты, ARIA атрибуты, порядок заголовков, доступность с клавиатуры, семантику HTML, labels для форм.",
    topic: "Accessibility"
  },
  {
    id: 33,
    question: "Как в DevTools проверить цветовой контраст элемента?",
    options: [
      "Elements → выбрать элемент → Color picker показывает contrast ratio",
      "Нужно считать вручную",
      "Только через Lighthouse",
      "DevTools не проверяют контраст"
    ],
    correctAnswer: 0,
    explanation: "Elements → выбрать элемент с текстом → Color picker для color/background-color показывает contrast ratio и соответствие AA/AAA стандартам WCAG.",
    topic: "Accessibility"
  },
  {
    id: 34,
    question: "Как эмулировать различные типы цветовой слепоты в DevTools?",
    options: [
      "Rendering → Emulate vision deficiencies",
      "Это невозможно в DevTools",
      "Только через плагины браузера",
      "Settings → Appearance"
    ],
    correctAnswer: 0,
    explanation: "DevTools → More tools → Rendering → Emulate vision deficiencies позволяет эмулировать protanopia, deuteranopia, tritanopia, achromatopsia для проверки доступности цветовой схемы.",
    topic: "Accessibility"
  },
  {
    id: 35,
    question: "Что показывает 'Name' в Accessibility панели элемента?",
    options: [
      "Имя переменной",
      "Accessible name - текст, который прочитает screen reader",
      "Имя класса CSS",
      "Имя HTML тега"
    ],
    correctAnswer: 1,
    explanation: "Accessible Name - это текст, который прочитает screen reader для данного элемента. Берется из aria-label, aria-labelledby, alt, содержимого или placeholder.",
    topic: "Accessibility"
  },

  // Тема 7: Debugging JavaScript
  {
    id: 36,
    question: "Какие типы breakpoint'ов доступны в Sources панели?",
    options: [
      "Только line breakpoints",
      "Line, conditional, DOM, XHR/Fetch, Event listener breakpoints",
      "Только DOM breakpoints",
      "Sources не поддерживает breakpoints"
    ],
    correctAnswer: 1,
    explanation: "DevTools поддерживает: line breakpoints, conditional (с условием), DOM breakpoints (на изменения), XHR/Fetch breakpoints, Event listener breakpoints, Exception breakpoints.",
    topic: "Debugging"
  },
  {
    id: 37,
    question: "Что делает 'Step Over' при отладке в Sources?",
    options: [
      "Выполняет функцию и останавливается на следующей строке",
      "Входит внутрь функции",
      "Выходит из текущей функции",
      "Пропускает все breakpoints"
    ],
    correctAnswer: 0,
    explanation: "Step Over (F10) выполняет текущую строку (включая вызовы функций) и останавливается на следующей строке в текущей функции. Не входит внутрь вызываемых функций.",
    topic: "Debugging"
  },
  {
    id: 38,
    question: "Что делает 'Step Into' при отладке?",
    options: [
      "Пропускает функцию",
      "Входит внутрь вызываемой функции",
      "Выходит из функции",
      "Перезапускает debugger"
    ],
    correctAnswer: 1,
    explanation: "Step Into (F11) входит внутрь вызываемой функции, позволяя отладить ее построчно. Если следующая строка - вызов функции, debugger войдет в нее.",
    topic: "Debugging"
  },
  {
    id: 39,
    question: "Для чего используются Logpoints в DevTools?",
    options: [
      "Для вывода логов без изменения кода (альтернатива console.log)",
      "Для установки точек остановки",
      "Для измерения производительности",
      "Для сохранения логов в файл"
    ],
    correctAnswer: 0,
    explanation: "Logpoints позволяют выводить логи в console без изменения исходного кода - добавляем logpoint через правый клик на номер строки → Add logpoint.",
    topic: "Debugging"
  },
  {
    id: 40,
    question: "Как использовать 'debugger;' statement в коде?",
    options: [
      "Это устаревший синтаксис",
      "debugger; автоматически останавливает выполнение когда DevTools открыты",
      "Работает только в production",
      "Нужно вручную активировать в настройках"
    ],
    correctAnswer: 1,
    explanation: "Ключевое слово debugger; в коде автоматически создает breakpoint, если DevTools открыты. Удобно для программной остановки в нужном месте.",
    topic: "Debugging"
  },

  // Тема 8: Coverage и оптимизация
  {
    id: 41,
    question: "Для чего используется панель Coverage в DevTools?",
    options: [
      "Для проверки test coverage",
      "Для анализа неиспользуемого CSS и JavaScript кода",
      "Для покрытия кода комментариями",
      "Для анализа покрытия сети"
    ],
    correctAnswer: 1,
    explanation: "Coverage (Cmd+Shift+P → Show Coverage) анализирует, какой процент загруженного CSS/JS кода реально используется на странице. Помогает найти код для удаления/lazy loading.",
    topic: "Оптимизация"
  },
  {
    id: 42,
    question: "Как использовать Coverage для оптимизации bundle size?",
    options: [
      "Coverage автоматически удаляет неиспользуемый код",
      "Записать Coverage → найти файлы с низким usage → удалить/оптимизировать",
      "Coverage только показывает размер файлов",
      "Coverage не помогает с оптимизацией"
    ],
    correctAnswer: 1,
    explanation: "Записываем Coverage во время использования приложения, находим файлы с низким process usage (красная полоса), анализируем какой код не используется, применяем code splitting или удаляем.",
    topic: "Оптимизация"
  },
  {
    id: 43,
    question: "Что показывает красная полоса в Coverage панели?",
    options: [
      "Ошибки в коде",
      "Неиспользуемый код (unused bytes)",
      "Медленный код",
      "Код с проблемами безопасности"
    ],
    correctAnswer: 1,
    explanation: "Красная полоса показывает процент неиспользуемого кода в файле. Зеленая - используемый. Coverage помогает идентифицировать файлы для оптимизации.",
    topic: "Оптимизация"
  },

  // Тема 9: Дополнительные инструменты
  {
    id: 44,
    question: "Для чего используется Command Menu в DevTools?",
    options: [
      "Для выполнения shell команд",
      "Быстрый доступ ко всем функциям DevTools (Cmd/Ctrl+Shift+P)",
      "Для управления командой разработчиков",
      "Для командной строки JavaScript"
    ],
    correctAnswer: 1,
    explanation: "Command Menu (Cmd+Shift+P или Ctrl+Shift+P) - быстрый доступ ко всем функциям DevTools: открытие панелей, запуск команд, изменение настроек без поиска в меню.",
    topic: "Дополнительные инструменты"
  },
  {
    id: 45,
    question: "Как сделать screenshot части страницы или всей страницы в DevTools?",
    options: [
      "Command Menu → Capture screenshot/Capture full size screenshot",
      "Только через сторонние расширения",
      "File → Save screenshot",
      "DevTools не поддерживают screenshots"
    ],
    correctAnswer: 0,
    explanation: "Cmd+Shift+P → 'Capture screenshot' (текущий viewport), 'Capture full size screenshot' (вся страница), 'Capture node screenshot' (выбранный элемент).",
    topic: "Дополнительные инструменты"
  },
  {
    id: 46,
    question: "Для чего используется Device Mode в DevTools?",
    options: [
      "Для управления устройствами Bluetooth",
      "Для эмуляции мобильных устройств и responsive дизайна",
      "Для подключения к физическим устройствам",
      "Для тестирования на разных операционных системах"
    ],
    correctAnswer: 1,
    explanation: "Device Mode (Cmd+Shift+M) эмулирует различные устройства: размеры экрана, pixel ratio, touch events, user agent, помогая тестировать responsive дизайн без физических устройств.",
    topic: "Дополнительные инструменты"
  },
  {
    id: 47,
    question: "Как в DevTools эмулировать офлайн режим?",
    options: [
      "Network → Offline checkbox или throttling dropdown",
      "Отключить интернет на компьютере",
      "Application → Service Workers → Offline",
      "Все варианты верны"
    ],
    correctAnswer: 0,
    explanation: "Network panel → Offline checkbox или throttling dropdown позволяет эмулировать офлайн режим для тестирования offline-first приложений и Service Workers.",
    topic: "Дополнительные инструменты"
  },
  {
    id: 48,
    question: "Для чего используется Sensors панель в DevTools?",
    options: [
      "Для работы с датчиками температуры",
      "Для эмуляции geolocation, orientation, touch",
      "Для сенсорных экранов",
      "Для анализа сенсорных событий"
    ],
    correctAnswer: 1,
    explanation: "Sensors (More tools → Sensors) позволяет эмулировать: геолокацию (GPS координаты), ориентацию устройства, idle state, для тестирования без физического устройства.",
    topic: "Дополнительные инструменты"
  },
  {
    id: 49,
    question: "Как использовать Local Overrides в DevTools?",
    options: [
      "Для переопределения настроек браузера",
      "Для сохранения изменений в файлах локально и их применения при перезагрузке",
      "Для изменения локальной сети",
      "DevTools не поддерживают overrides"
    ],
    correctAnswer: 1,
    explanation: "Sources → Overrides позволяет выбрать папку, сохранить туда изменения файлов из DevTools и автоматически применять их при каждой загрузке страницы (без изменения исходников на сервере).",
    topic: "Дополнительные инструменты"
  },
  {
    id: 50,
    question: "Как в DevTools быстро найти неоптимизированные изображения?",
    options: [
      "Network → фильтр Img → сортировка по размеру",
      "Lighthouse → Performance audit показывает рекомендации по оптимизации изображений",
      "Coverage → Images",
      "Оба варианта 1 и 2"
    ],
    correctAnswer: 3,
    explanation: "Network показывает размеры изображений для ручного анализа. Lighthouse автоматически выявляет: изображения без оптимизации, неправильные форматы, слишком большие размеры и дает конкретные рекомендации.",
    topic: "Оптимизация"
  }
]
