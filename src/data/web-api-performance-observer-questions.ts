import type { Question } from '@/types/question.ts'

export const performanceObserverQuestions: Question[] = [
  // Тема 1: Основы PerformanceObserver
  {
    id: 1,
    question: "Что такое PerformanceObserver?",
    options: [
      "API для изменения производительности приложения",
      "API для асинхронного мониторинга метрик производительности",
      "Инструмент для отладки JavaScript",
      "Метод для оптимизации DOM"
    ],
    correctAnswer: 1,
    explanation: "PerformanceObserver — это Web API для асинхронного мониторинга метрик производительности. Работает по принципу observer pattern — подписывается на типы метрик и вызывает callback при появлении новых данных.",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 2,
    question: "Как создать экземпляр PerformanceObserver?",
    options: [
      "PerformanceObserver.create(callback)",
      "new PerformanceObserver(callback)",
      "createPerformanceObserver(callback)",
      "PerformanceObserver.observe(callback)"
    ],
    correctAnswer: 1,
    explanation: "PerformanceObserver создается через конструктор: new PerformanceObserver(callback), где callback — функция, которая вызывается при обнаружении новых метрик производительности.",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 3,
    question: "Какие параметры принимает callback функция PerformanceObserver?",
    options: [
      "Только entries",
      "list (PerformanceObserverEntryList) и observer",
      "entries и timestamp",
      "metrics и duration"
    ],
    correctAnswer: 1,
    explanation: "Callback принимает два параметра: list (объект PerformanceObserverEntryList с методом getEntries()) и observer (сам экземпляр PerformanceObserver).",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 4,
    question: "Как начать наблюдение за метриками производительности?",
    options: [
      "observer.watch({ type: 'resource' })",
      "observer.observe({ type: 'resource' })",
      "observer.start({ type: 'resource' })",
      "observer.monitor({ type: 'resource' })"
    ],
    correctAnswer: 1,
    explanation: "Для начала наблюдения используется метод observe() с объектом опций, указывающим тип метрик для отслеживания: observer.observe({ type: 'resource' }).",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 5,
    question: "Как прекратить наблюдение с помощью PerformanceObserver?",
    options: [
      "observer.stop()",
      "observer.disconnect()",
      "observer.unsubscribe()",
      "observer.destroy()"
    ],
    correctAnswer: 1,
    explanation: "Метод disconnect() прекращает наблюдение за всеми отслеживаемыми метриками и полностью отключает observer. Это важно для предотвращения утечек памяти.",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 6,
    question: "Что возвращает метод takeRecords()?",
    options: [
      "Текущее состояние производительности",
      "Массив необработанных записей метрик, очищая очередь",
      "Количество записанных метрик",
      "Последнюю запись метрики"
    ],
    correctAnswer: 1,
    explanation: "takeRecords() возвращает массив всех необработанных записей метрик и очищает очередь. Полезно вызывать перед disconnect() для обработки последних изменений.",
    topic: "Основы PerformanceObserver"
  },
  {
    id: 7,
    question: "В чем преимущество PerformanceObserver перед периодическим опросом performance.getEntries()?",
    options: [
      "PerformanceObserver более точный",
      "PerformanceObserver асинхронный и не блокирует главный поток",
      "PerformanceObserver поддерживает больше метрик",
      "PerformanceObserver работает быстрее"
    ],
    correctAnswer: 1,
    explanation: "PerformanceObserver работает асинхронно на основе событий, не требует постоянных проверок и не блокирует главный поток, в отличие от polling через setInterval с performance.getEntries().",
    topic: "Основы PerformanceObserver"
  },

  // Тема 2: Опции наблюдения
  {
    id: 8,
    question: "В чем разница между опциями 'type' и 'entryTypes' при вызове observe()?",
    options: [
      "Нет разницы, это синонимы",
      "'type' для одного типа с buffered, 'entryTypes' для нескольких типов",
      "'type' устарел, используйте 'entryTypes'",
      "'entryTypes' поддерживает регулярные выражения"
    ],
    correctAnswer: 1,
    explanation: "type: 'resource' — подписка на один тип с возможностью использовать buffered: true. entryTypes: ['resource', 'navigation'] — подписка на несколько типов одновременно, но без buffered.",
    topic: "Опции наблюдения"
  },
  {
    id: 9,
    question: "Что означает опция buffered: true?",
    options: [
      "Буферизация метрик для пакетной отправки",
      "Получение метрик, записанных до создания observer",
      "Кэширование результатов для повторного использования",
      "Замедление частоты вызовов callback"
    ],
    correctAnswer: 1,
    explanation: "buffered: true позволяет получить метрики, которые были записаны до создания observer. Полезно для получения FCP, LCP и других ранних метрик. Работает только с опцией type.",
    topic: "Опции наблюдения"
  },
  {
    id: 10,
    question: "Как проверить, какие типы метрик поддерживаются браузером?",
    options: [
      "PerformanceObserver.supportedTypes",
      "PerformanceObserver.supportedEntryTypes",
      "PerformanceObserver.availableTypes",
      "performance.getSupportedTypes()"
    ],
    correctAnswer: 1,
    explanation: "Статическое свойство PerformanceObserver.supportedEntryTypes возвращает массив строк с поддерживаемыми типами метрик: ['navigation', 'resource', 'paint', ...].",
    topic: "Опции наблюдения"
  },

  // Тема 3: Типы метрик (Performance Entry Types)
  {
    id: 11,
    question: "Какой тип метрики используется для отслеживания загрузки страницы?",
    options: [
      "'page'",
      "'navigation'",
      "'document'",
      "'load'"
    ],
    correctAnswer: 1,
    explanation: "Тип 'navigation' содержит детальную информацию о загрузке документа: DNS lookup, TCP connection, request/response timing, DOM interactive/complete и load events.",
    topic: "Типы метрик"
  },
  {
    id: 12,
    question: "Какой тип метрики используется для отслеживания загрузки ресурсов (JS, CSS, изображений)?",
    options: [
      "'assets'",
      "'resource'",
      "'files'",
      "'loading'"
    ],
    correctAnswer: 1,
    explanation: "Тип 'resource' предоставляет информацию о загрузке всех ресурсов: URL, initiatorType (script, css, img), duration, transferSize, кэширование.",
    topic: "Типы метрик"
  },
  {
    id: 13,
    question: "Какие метрики входят в тип 'paint'?",
    options: [
      "FCP и LCP",
      "First Paint (FP) и First Contentful Paint (FCP)",
      "Все метрики рендеринга",
      "FP, FCP, FMP и TTI"
    ],
    correctAnswer: 1,
    explanation: "Тип 'paint' включает два события: 'first-paint' (FP) — первый пиксель на экране, и 'first-contentful-paint' (FCP) — первый контент (текст, изображение).",
    topic: "Типы метрик"
  },
  {
    id: 14,
    question: "Что означает метрика LCP (Largest Contentful Paint)?",
    options: [
      "Время загрузки самого большого файла",
      "Время рендеринга самого большого видимого элемента контента",
      "Время до полной загрузки страницы",
      "Время первого взаимодействия пользователя"
    ],
    correctAnswer: 1,
    explanation: "LCP измеряет время рендеринга самого большого видимого элемента контента (изображение, видео, текстовый блок) в viewport. Core Web Vital метрика.",
    topic: "Типы метрик"
  },
  {
    id: 15,
    question: "Что измеряет метрика FID (First Input Delay)?",
    options: [
      "Время до первого ввода пользователя",
      "Задержку между первым вводом пользователя и началом его обработки браузером",
      "Время обработки первого ввода",
      "Время до интерактивности страницы"
    ],
    correctAnswer: 1,
    explanation: "FID измеряет задержку (delay) между моментом, когда пользователь первый раз взаимодействует со страницей (клик, tap), и моментом, когда браузер может начать обработку события. Core Web Vital метрика.",
    topic: "Типы метрик"
  },
  {
    id: 16,
    question: "Что такое CLS (Cumulative Layout Shift)?",
    options: [
      "Количество изменений CSS стилей",
      "Совокупная метрика неожиданных сдвигов макета",
      "Скорость рендеринга страницы",
      "Размер изменений в DOM"
    ],
    correctAnswer: 1,
    explanation: "CLS измеряет визуальную стабильность — сумму всех неожиданных сдвигов макета (когда элементы перемещаются без действий пользователя). Core Web Vital метрика.",
    topic: "Типы метрик"
  },
  {
    id: 17,
    question: "Какой тип метрики используется для отслеживания долгих задач JavaScript?",
    options: [
      "'slowtask'",
      "'longtask'",
      "'heavytask'",
      "'blocking'"
    ],
    correctAnswer: 1,
    explanation: "Тип 'longtask' отслеживает задачи JavaScript, выполняющиеся дольше 50ms и блокирующие главный поток. Поддерживается в Chrome/Edge.",
    topic: "Типы метрик"
  },
  {
    id: 18,
    question: "Какие типы метрик используются для пользовательских измерений?",
    options: [
      "'custom' и 'user'",
      "'mark' и 'measure'",
      "'metric' и 'timing'",
      "'event' и 'trace'"
    ],
    correctAnswer: 1,
    explanation: "Типы 'mark' (метки, созданные через performance.mark()) и 'measure' (измерения между метками через performance.measure()) используются для кастомных метрик.",
    topic: "Типы метрик"
  },

  // Тема 4: Core Web Vitals
  {
    id: 19,
    question: "Какие три метрики составляют Core Web Vitals?",
    options: [
      "FP, FCP, TTI",
      "LCP, FID, CLS",
      "TTFB, FCP, LCP",
      "FID, TBT, CLS"
    ],
    correctAnswer: 1,
    explanation: "Core Web Vitals от Google включают три ключевые метрики: LCP (скорость загрузки), FID (интерактивность), CLS (визуальная стабильность). Влияют на SEO и ранжирование.",
    topic: "Core Web Vitals"
  },
  {
    id: 20,
    question: "Какое значение LCP считается хорошим?",
    options: [
      "< 1.5 секунд",
      "< 2.5 секунд",
      "< 3.5 секунд",
      "< 4.0 секунд"
    ],
    correctAnswer: 1,
    explanation: "Хорошее значение LCP: < 2.5s. Требует улучшения: 2.5s - 4s. Плохое: > 4s. Измеряется до 75-го перцентиля пользователей.",
    topic: "Core Web Vitals"
  },
  {
    id: 21,
    question: "Какое значение FID считается хорошим?",
    options: [
      "< 50ms",
      "< 100ms",
      "< 200ms",
      "< 300ms"
    ],
    correctAnswer: 1,
    explanation: "Хорошее значение FID: < 100ms. Требует улучшения: 100ms - 300ms. Плохое: > 300ms.",
    topic: "Core Web Vitals"
  },
  {
    id: 22,
    question: "Какое значение CLS считается хорошим?",
    options: [
      "< 0.05",
      "< 0.1",
      "< 0.15",
      "< 0.25"
    ],
    correctAnswer: 1,
    explanation: "Хорошее значение CLS: < 0.1. Требует улучшения: 0.1 - 0.25. Плохое: > 0.25. CLS — безразмерная метрика.",
    topic: "Core Web Vitals"
  },
  {
    id: 23,
    question: "Почему Core Web Vitals важны для SEO?",
    options: [
      "Google использует их как сигналы для ранжирования поисковой выдачи",
      "Они измеряют скорость сервера",
      "Они влияют на размер страницы",
      "Они определяют количество рекламы"
    ],
    correctAnswer: 0,
    explanation: "Google официально включил Core Web Vitals в алгоритм ранжирования как part of page experience signals. Плохие значения могут негативно влиять на позиции в поиске.",
    topic: "Core Web Vitals"
  },
  {
    id: 24,
    question: "Как учитывается пользовательский ввод при расчете CLS?",
    options: [
      "Все сдвиги учитываются одинаково",
      "Сдвиги, произошедшие в течение 500ms после ввода, исключаются из расчета",
      "Пользовательский ввод увеличивает CLS",
      "CLS не зависит от пользовательского ввода"
    ],
    correctAnswer: 1,
    explanation: "Сдвиги макета, произошедшие в течение 500ms после пользовательского взаимодействия, считаются ожидаемыми и не учитываются в CLS (свойство hadRecentInput в layout-shift entry).",
    topic: "Core Web Vitals"
  },

  // Тема 5: Практическое применение
  {
    id: 25,
    question: "Как отследить медленные ресурсы на странице?",
    options: [
      "Использовать тип 'slowresource'",
      "Подписаться на 'resource' и фильтровать по duration > threshold",
      "Использовать performance.timing",
      "Вызвать performance.getSlowResources()"
    ],
    correctAnswer: 1,
    explanation: "Создать PerformanceObserver для типа 'resource', затем в callback фильтровать entries по entry.duration > 1000 (или другому пороговому значению) для выявления медленных ресурсов.",
    topic: "Практическое применение"
  },
  {
    id: 26,
    question: "Как определить, что ресурс был загружен из кэша?",
    options: [
      "entry.cached === true",
      "entry.transferSize === 0 && entry.decodedBodySize > 0",
      "entry.fromCache === true",
      "entry.cacheHit === true"
    ],
    correctAnswer: 1,
    explanation: "Если transferSize === 0, но decodedBodySize > 0, ресурс был загружен из кэша (не было сетевой передачи данных).",
    topic: "Практическое применение"
  },
  {
    id: 27,
    question: "Какой метод лучше использовать для отправки метрик при закрытии страницы?",
    options: [
      "fetch() с async/await",
      "navigator.sendBeacon() или fetch() с keepalive: true",
      "XMLHttpRequest с async: false",
      "localStorage для сохранения на потом"
    ],
    correctAnswer: 1,
    explanation: "navigator.sendBeacon() или fetch() с keepalive: true гарантируют отправку данных даже при закрытии страницы, не блокируя процесс выгрузки.",
    topic: "Практическое применение"
  },
  {
    id: 28,
    question: "Когда следует вызывать disconnect() у PerformanceObserver?",
    options: [
      "Сразу после первой метрики",
      "При размонтировании компонента или когда наблюдение больше не нужно",
      "Никогда не нужно вызывать",
      "Перед каждым новым observe()"
    ],
    correctAnswer: 1,
    explanation: "disconnect() следует вызывать при размонтировании компонента или когда наблюдение больше не требуется, чтобы избежать утечек памяти и ненужной работы.",
    topic: "Практическое применение"
  },
  {
    id: 29,
    question: "Как создать кастомную метрику производительности?",
    options: [
      "Использовать performance.createMetric()",
      "Использовать performance.mark() и performance.measure()",
      "Создать CustomPerformanceEntry",
      "Использовать PerformanceObserver.addMetric()"
    ],
    correctAnswer: 1,
    explanation: "Создать метки через performance.mark('start'), затем performance.mark('end'), и измерение между ними через performance.measure('duration', 'start', 'end'). Observer типа 'measure' получит результат.",
    topic: "Практическое применение"
  },
  {
    id: 30,
    question: "Что такое Total Blocking Time (TBT)?",
    options: [
      "Общее время блокировки страницы",
      "Сумма времени блокировки всех long tasks (duration - 50ms)",
      "Время до первого взаимодействия",
      "Время загрузки скриптов"
    ],
    correctAnswer: 1,
    explanation: "TBT — это сумма blocking time всех long tasks между FCP и Time to Interactive. Blocking time = duration - 50ms для каждой long task.",
    topic: "Практическое применение"
  },

  // Тема 6: Интеграция с фреймворками
  {
    id: 31,
    question: "Как правильно интегрировать PerformanceObserver в React компонент?",
    options: [
      "Создать observer в render функции",
      "Создать observer в useEffect с cleanup через disconnect()",
      "Использовать useState для хранения observer",
      "Создать глобальный observer вне компонента"
    ],
    correctAnswer: 1,
    explanation: "Создать observer в useEffect, сохранить в useRef, и обязательно вызвать disconnect() в cleanup функции при размонтировании компонента для предотвращения утечек памяти.",
    topic: "Интеграция"
  },
  {
    id: 32,
    question: "Что нужно проверить перед созданием PerformanceObserver?",
    options: [
      "Версию браузера",
      "Наличие 'PerformanceObserver' in window",
      "Скорость интернета",
      "Размер viewport"
    ],
    correctAnswer: 1,
    explanation: "Необходимо проверить поддержку API: if ('PerformanceObserver' in window) { ... }, так как старые браузеры могут не поддерживать PerformanceObserver.",
    topic: "Интеграция"
  },
  {
    id: 33,
    question: "Как отправить метрики в Google Analytics?",
    options: [
      "gtag('send', 'metric', data)",
      "gtag('event', metricName, { value, metric_rating })",
      "ga('track', 'performance', data)",
      "analytics.sendMetric(data)"
    ],
    correctAnswer: 1,
    explanation: "Использовать gtag('event', 'LCP', { value: Math.round(lcp), metric_rating: 'good', event_category: 'Web Vitals' }) для отправки метрик в GA.",
    topic: "Интеграция"
  },

  // Тема 7: Производительность и оптимизация
  {
    id: 34,
    question: "Влияет ли PerformanceObserver на производительность страницы?",
    options: [
      "Да, сильно замедляет страницу",
      "Минимально влияет, так как работает асинхронно",
      "Нет, совершенно не влияет",
      "Только при большом количестве метрик"
    ],
    correctAnswer: 1,
    explanation: "PerformanceObserver работает асинхронно и вызывает callback в idle time, поэтому минимально влияет на производительность. Однако тяжелые вычисления в callback могут замедлить страницу.",
    topic: "Производительность"
  },
  {
    id: 35,
    question: "Почему не стоит выполнять тяжелые вычисления в callback PerformanceObserver?",
    options: [
      "Это запрещено спецификацией",
      "Callback выполняется в главном потоке и может заблокировать UI",
      "Данные будут потеряны",
      "Observer автоматически отключится"
    ],
    correctAnswer: 1,
    explanation: "Callback выполняется в главном потоке. Тяжелые операции могут заблокировать UI и негативно повлиять на производительность, особенно на показатели FID и TBT.",
    topic: "Производительность"
  },
  {
    id: 36,
    question: "Почему рекомендуется отправлять метрики батчами, а не по одной?",
    options: [
      "Так метрики более точные",
      "Для уменьшения количества сетевых запросов и overhead",
      "Браузер требует батчинг",
      "Одиночные метрики не поддерживаются"
    ],
    correctAnswer: 1,
    explanation: "Батчинг (накопление метрик и отправка группами) уменьшает количество HTTP запросов, снижает overhead и экономит ресурсы сервера.",
    topic: "Производительность"
  },

  // Тема 8: Отладка и диагностика
  {
    id: 37,
    question: "Как получить список всех поддерживаемых типов метрик в текущем браузере?",
    options: [
      "performance.supportedTypes",
      "PerformanceObserver.supportedEntryTypes",
      "navigator.performanceTypes",
      "window.supportedMetrics"
    ],
    correctAnswer: 1,
    explanation: "PerformanceObserver.supportedEntryTypes возвращает массив всех поддерживаемых типов метрик в текущем браузере: ['navigation', 'resource', 'paint', ...].",
    topic: "Отладка"
  },
  {
    id: 38,
    question: "Что произойдет при попытке подписаться на неподдерживаемый тип метрики?",
    options: [
      "Метод observe() вернет false",
      "Будет выброшено исключение TypeError",
      "Observer подпишется, но callback не будет вызван",
      "Браузер выведет предупреждение в консоль"
    ],
    correctAnswer: 1,
    explanation: "При попытке observe() с неподдерживаемым типом будет выброшено исключение TypeError. Поэтому важно использовать try-catch или проверять supportedEntryTypes.",
    topic: "Отладка"
  },
  {
    id: 39,
    question: "Как отладить, почему LCP не срабатывает?",
    options: [
      "Увеличить размер viewport",
      "Проверить, что используется buffered: true и элемент больше порогового размера",
      "Перезагрузить страницу несколько раз",
      "Изменить тип observer на 'paint'"
    ],
    correctAnswer: 1,
    explanation: "LCP может не сработать если: не используется buffered: true, элемент меньше минимального размера, элемент загружается после user input, или браузер не поддерживает эту метрику.",
    topic: "Отладка"
  },
  {
    id: 40,
    question: "Какая библиотека предоставляет готовое решение для мониторинга Web Vitals?",
    options: [
      "performance-monitor",
      "web-vitals",
      "vitals-observer",
      "google-vitals"
    ],
    correctAnswer: 1,
    explanation: "Библиотека 'web-vitals' от Google Chrome team предоставляет готовые функции для измерения всех Core Web Vitals с полифиллами и best practices.",
    topic: "Отладка"
  }
]
