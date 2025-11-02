import type { Question } from '@/types/question.ts'

export const resizeObserverQuestions: Question[] = [
  // Тема 1: Основы ResizeObserver
  {
    id: 1,
    question: "Что такое ResizeObserver?",
    options: [
      "API для отслеживания кликов на элементах",
      "API для наблюдения за изменениями размеров элементов",
      "Инструмент для изменения размеров окна браузера",
      "Способ анимации элементов"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver — это API, который позволяет отслеживать изменения размеров элементов и получать уведомления, когда размеры элемента изменяются.",
    topic: "Основы ResizeObserver"
  },
  {
    id: 2,
    question: "Как создать экземпляр ResizeObserver?",
    options: [
      "ResizeObserver.create(callback)",
      "new ResizeObserver(callback)",
      "createResizeObserver(callback)",
      "ResizeObserver.observe(element)"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver создается через конструктор: new ResizeObserver(callback), где callback — функция, вызываемая при изменении размеров наблюдаемых элементов.",
    topic: "Основы ResizeObserver"
  },
  {
    id: 3,
    question: "Какие параметры принимает callback функция ResizeObserver?",
    options: [
      "Только element",
      "entries и observer",
      "width и height",
      "oldSize и newSize"
    ],
    correctAnswer: 1,
    explanation: "Callback принимает два параметра: entries (массив ResizeObserverEntry объектов) и observer (сам экземпляр ResizeObserver).",
    topic: "Основы ResizeObserver"
  },
  {
    id: 4,
    question: "Как начать наблюдение за элементом с помощью ResizeObserver?",
    options: [
      "observer.watch(element)",
      "observer.observe(element)",
      "observer.start(element)",
      "observer.track(element)"
    ],
    correctAnswer: 1,
    explanation: "Для начала наблюдения используется метод observe(element). Можно наблюдать за несколькими элементами одним observer.",
    topic: "Основы ResizeObserver"
  },
  {
    id: 5,
    question: "Как прекратить наблюдение за конкретным элементом?",
    options: [
      "observer.unobserve(element)",
      "observer.stop(element)",
      "observer.remove(element)",
      "observer.delete(element)"
    ],
    correctAnswer: 0,
    explanation: "Метод unobserve(element) прекращает наблюдение за конкретным элементом, но observer продолжает работать с другими элементами.",
    topic: "Основы ResizeObserver"
  },
  {
    id: 6,
    question: "Как полностью отключить ResizeObserver?",
    options: [
      "observer.stop()",
      "observer.disconnect()",
      "observer.destroy()",
      "observer.close()"
    ],
    correctAnswer: 1,
    explanation: "Метод disconnect() прекращает наблюдение за всеми элементами и полностью отключает observer.",
    topic: "Основы ResizeObserver"
  },

  // Тема 2: ResizeObserverEntry
  {
    id: 7,
    question: "Что содержит свойство 'target' в ResizeObserverEntry?",
    options: [
      "Родительский элемент",
      "Наблюдаемый элемент",
      "Размеры элемента",
      "Viewport браузера"
    ],
    correctAnswer: 1,
    explanation: "Свойство target содержит ссылку на наблюдаемый DOM-элемент, размеры которого изменились.",
    topic: "ResizeObserverEntry"
  },
  {
    id: 8,
    question: "Что содержит свойство 'contentRect' в ResizeObserverEntry?",
    options: [
      "Размеры viewport",
      "DOMRectReadOnly с размерами контентной области элемента",
      "Размеры окна браузера",
      "Размеры всех дочерних элементов"
    ],
    correctAnswer: 1,
    explanation: "contentRect содержит DOMRectReadOnly с информацией о размерах контентной области элемента (без padding, border и scrollbar).",
    topic: "ResizeObserverEntry"
  },
  {
    id: 9,
    question: "Что содержит свойство 'borderBoxSize' в ResizeObserverEntry?",
    options: [
      "Размер только border элемента",
      "Массив с размерами border-box (включая padding и border)",
      "Толщину рамки элемента",
      "Размер margin элемента"
    ],
    correctAnswer: 1,
    explanation: "borderBoxSize — массив объектов с размерами border-box элемента (content + padding + border), содержит inlineSize и blockSize.",
    topic: "ResizeObserverEntry"
  },
  {
    id: 10,
    question: "Что содержит свойство 'contentBoxSize' в ResizeObserverEntry?",
    options: [
      "Размер padding элемента",
      "Массив с размерами content-box (только контент)",
      "Размер border элемента",
      "Размер margin элемента"
    ],
    correctAnswer: 1,
    explanation: "contentBoxSize — массив объектов с размерами content-box элемента (только контент, без padding и border), содержит inlineSize и blockSize.",
    topic: "ResizeObserverEntry"
  },
  {
    id: 11,
    question: "Что представляют собой inlineSize и blockSize?",
    options: [
      "Ширина и высота в пикселях",
      "Логические размеры: inline-направление и block-направление",
      "Размеры для inline и block элементов",
      "Минимальные и максимальные размеры"
    ],
    correctAnswer: 1,
    explanation: "inlineSize и blockSize — это логические размеры: для горизонтального письма inlineSize = width, blockSize = height. Для вертикального письма они меняются местами.",
    topic: "ResizeObserverEntry"
  },
  {
    id: 12,
    question: "Почему borderBoxSize и contentBoxSize являются массивами?",
    options: [
      "Для поддержки множественных элементов",
      "Для поддержки фрагментированных элементов (multi-column, fragmentation)",
      "Для хранения истории изменений размеров",
      "Это ошибка в спецификации"
    ],
    correctAnswer: 1,
    explanation: "Массивы используются для поддержки фрагментированных элементов (например, в multi-column layout), где один элемент может иметь несколько фрагментов с разными размерами.",
    topic: "ResizeObserverEntry"
  },

  // Тема 3: Опции ResizeObserver
  {
    id: 13,
    question: "Какие опции можно передать в метод observe()?",
    options: [
      "Только box",
      "box, threshold, root",
      "box, delay, debounce",
      "width, height, box"
    ],
    correctAnswer: 0,
    explanation: "В метод observe() можно передать опцию box, которая определяет, какую модель размеров отслеживать: 'content-box', 'border-box' или 'device-pixel-content-box'.",
    topic: "Опции ResizeObserver"
  },
  {
    id: 14,
    question: "Что означает опция box: 'content-box'?",
    options: [
      "Отслеживать размеры включая border и padding",
      "Отслеживать размеры только контентной области (без padding и border)",
      "Отслеживать размеры всего документа",
      "Отслеживать размеры viewport"
    ],
    correctAnswer: 1,
    explanation: "box: 'content-box' (по умолчанию) отслеживает размеры контентной области элемента, исключая padding, border и scrollbar.",
    topic: "Опции ResizeObserver"
  },
  {
    id: 15,
    question: "Что означает опция box: 'border-box'?",
    options: [
      "Отслеживать только border элемента",
      "Отслеживать размеры включая content, padding и border",
      "Отслеживать размеры без content",
      "Отслеживать размеры margin"
    ],
    correctAnswer: 1,
    explanation: "box: 'border-box' отслеживает размеры border-box, включая content, padding и border (но не margin).",
    topic: "Опции ResizeObserver"
  },
  {
    id: 16,
    question: "Что означает опция box: 'device-pixel-content-box'?",
    options: [
      "Размеры в процентах",
      "Размеры в физических пикселях устройства с учетом devicePixelRatio",
      "Размеры в логических пикселях",
      "Размеры в em единицах"
    ],
    correctAnswer: 1,
    explanation: "device-pixel-content-box возвращает размеры в физических пикселях устройства, учитывая devicePixelRatio. Полезно для canvas и точных вычислений.",
    topic: "Опции ResizeObserver"
  },

  // Тема 4: Практическое применение
  {
    id: 17,
    question: "Когда срабатывает callback ResizeObserver после создания?",
    options: [
      "Немедленно и синхронно",
      "Асинхронно, сразу после создания, даже если размеры не менялись",
      "Только после первого изменения размеров",
      "Через 100ms после создания"
    ],
    correctAnswer: 1,
    explanation: "Callback вызывается асинхронно сразу после observe(), предоставляя начальные размеры элемента, даже если они еще не изменялись.",
    topic: "Практическое применение"
  },
  {
    id: 18,
    question: "Для чего чаще всего используется ResizeObserver?",
    options: [
      "Для анимации элементов",
      "Для адаптивных компонентов и container queries",
      "Для изменения размеров окна",
      "Для оптимизации производительности"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver часто используется для создания адаптивных компонентов, которые реагируют на свой размер, и для реализации container queries до их нативной поддержки.",
    topic: "Практическое применение"
  },
  {
    id: 19,
    question: "Почему ResizeObserver лучше для отслеживания размеров, чем событие window.resize?",
    options: [
      "Работает быстрее",
      "Отслеживает изменения размеров конкретных элементов, а не только окна",
      "Имеет больше методов",
      "Поддерживается во всех браузерах"
    ],
    correctAnswer: 1,
    explanation: "window.resize срабатывает только при изменении размеров окна, а ResizeObserver отслеживает изменения размеров конкретных элементов, что гораздо точнее и эффективнее.",
    topic: "Практическое применение"
  },
  {
    id: 20,
    question: "Как реализовать адаптивный компонент с помощью ResizeObserver?",
    options: [
      "Наблюдать за window",
      "Наблюдать за самим компонентом и менять классы/стили в зависимости от размера",
      "Использовать CSS media queries",
      "Использовать JavaScript для расчета размеров"
    ],
    correctAnswer: 1,
    explanation: "Наблюдая за контейнером компонента, можно применять разные стили или классы в зависимости от его размера, создавая адаптивность на уровне компонента.",
    topic: "Практическое применение"
  },
  {
    id: 21,
    question: "Как использовать ResizeObserver для адаптивного canvas?",
    options: [
      "Canvas не поддерживает ResizeObserver",
      "Наблюдать за canvas и обновлять его размеры с учетом devicePixelRatio",
      "Использовать только CSS",
      "Canvas автоматически адаптируется"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver с box: 'device-pixel-content-box' позволяет правильно обновлять размеры canvas с учетом devicePixelRatio для четкого отображения на всех экранах.",
    topic: "Практическое применение"
  },
  {
    id: 22,
    question: "Может ли ResizeObserver вызвать бесконечный цикл?",
    options: [
      "Нет, это невозможно",
      "Да, если в callback изменять размеры наблюдаемого элемента",
      "Только в старых браузерах",
      "Только при использовании border-box"
    ],
    correctAnswer: 1,
    explanation: "Если в callback изменять размеры наблюдаемого элемента, это может вызвать бесконечный цикл. Браузеры могут ограничивать глубину таких циклов и выдавать ошибку.",
    topic: "Практическое применение"
  },

  // Тема 5: Производительность и оптимизация
  {
    id: 23,
    question: "Влияет ли ResizeObserver на производительность при наблюдении за множеством элементов?",
    options: [
      "Да, сильно замедляет страницу",
      "Минимально влияет, так как работает асинхронно",
      "Нет, совершенно не влияет",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver работает асинхронно и оптимизирован браузером, поэтому минимально влияет на производительность даже при наблюдении за многими элементами.",
    topic: "Производительность"
  },
  {
    id: 24,
    question: "Нужно ли использовать debounce для ResizeObserver callback?",
    options: [
      "Да, всегда обязательно",
      "Обычно нет, браузер уже оптимизирует вызовы",
      "Только для медленных устройств",
      "Только при наблюдении за window"
    ],
    correctAnswer: 1,
    explanation: "Браузер автоматически группирует и оптимизирует вызовы ResizeObserver, поэтому дополнительный debounce обычно не нужен, в отличие от window.resize.",
    topic: "Производительность"
  },
  {
    id: 25,
    question: "Когда следует вызывать disconnect() на ResizeObserver?",
    options: [
      "Сразу после первого срабатывания",
      "При размонтировании компонента для предотвращения утечек памяти",
      "Никогда не нужно вызывать",
      "Только если наблюдаются более 10 элементов"
    ],
    correctAnswer: 1,
    explanation: "disconnect() следует вызывать при размонтировании компонента или когда наблюдение больше не нужно, чтобы избежать утечек памяти.",
    topic: "Производительность"
  },
  {
    id: 26,
    question: "Можно ли использовать один ResizeObserver для множества элементов?",
    options: [
      "Нет, нужен отдельный observer для каждого элемента",
      "Да, это рекомендуемый подход для оптимизации",
      "Только для элементов одного типа",
      "Максимум 5 элементов на observer"
    ],
    correctAnswer: 1,
    explanation: "Один ResizeObserver может наблюдать за множеством элементов. Это эффективнее создания отдельного observer для каждого элемента.",
    topic: "Производительность"
  },

  // Тема 6: Отличия от других API
  {
    id: 27,
    question: "В чем главное отличие ResizeObserver от MutationObserver?",
    options: [
      "ResizeObserver быстрее",
      "ResizeObserver отслеживает изменения размеров, MutationObserver — изменения DOM",
      "ResizeObserver работает только с размерами окна",
      "Нет отличий"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver специализируется на изменениях размеров элементов, а MutationObserver отслеживает изменения в DOM-дереве (добавление/удаление узлов, изменение атрибутов).",
    topic: "Сравнение с другими API"
  },
  {
    id: 28,
    question: "Чем ResizeObserver отличается от IntersectionObserver?",
    options: [
      "Ничем, это синонимы",
      "ResizeObserver отслеживает размеры, IntersectionObserver — видимость/пересечения",
      "ResizeObserver работает только с изображениями",
      "IntersectionObserver точнее"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver следит за изменениями размеров элементов, IntersectionObserver — за их пересечением с другими элементами или viewport. Разные задачи.",
    topic: "Сравнение с другими API"
  },
  {
    id: 29,
    question: "Можно ли использовать ResizeObserver для отслеживания изменений размеров текста?",
    options: [
      "Нет, только для блочных элементов",
      "Да, можно отслеживать размеры любого элемента, включая текстовые",
      "Только для элементов с position: absolute",
      "Только для элементов с display: block"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver может отслеживать изменения размеров любых элементов, включая текстовые, что полезно для адаптивной типографики и динамического контента.",
    topic: "Сравнение с другими API"
  },

  // Тема 7: Совместимость
  {
    id: 30,
    question: "Поддерживается ли ResizeObserver в IE11?",
    options: [
      "Да, полностью поддерживается",
      "Нет, требуется полифилл",
      "Частично поддерживается",
      "Поддерживается только с флагом"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver не поддерживается в IE11. Для поддержки старых браузеров нужен полифилл (например, @juggle/resize-observer).",
    topic: "Совместимость"
  },
  {
    id: 31,
    question: "Как проверить поддержку ResizeObserver в браузере?",
    options: [
      "if (ResizeObserver) { }",
      "if ('ResizeObserver' in window) { }",
      "if (window.ResizeObserver !== undefined) { }",
      "Все варианты верны"
    ],
    correctAnswer: 3,
    explanation: "Все три способа корректны для проверки поддержки ResizeObserver. Обычно используют 'ResizeObserver' in window или typeof ResizeObserver !== 'undefined'.",
    topic: "Совместимость"
  },

  // Тема 8: Продвинутые сценарии
  {
    id: 32,
    question: "Как отследить изменение соотношения сторон элемента?",
    options: [
      "ResizeObserver не может этого сделать",
      "Вычислить ratio из contentRect или borderBoxSize в callback",
      "Использовать специальный метод getAspectRatio()",
      "Использовать CSS aspect-ratio"
    ],
    correctAnswer: 1,
    explanation: "В callback можно вычислить соотношение сторон из полученных размеров: const ratio = width / height, и реагировать на его изменения.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 33,
    question: "Можно ли использовать ResizeObserver с элементами display: none?",
    options: [
      "Да, работает нормально",
      "Нет, элементы с display: none не имеют размеров",
      "Только с полифиллом",
      "Работает, но с задержкой"
    ],
    correctAnswer: 1,
    explanation: "Элементы с display: none не имеют размеров и не участвуют в layout, поэтому ResizeObserver не может отслеживать их. Используйте visibility: hidden.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 34,
    question: "Как реализовать container queries до нативной поддержки?",
    options: [
      "Невозможно без нативной поддержки",
      "Использовать ResizeObserver для отслеживания размеров контейнера и применения классов",
      "Использовать только media queries",
      "Использовать JavaScript для расчета"
    ],
    correctAnswer: 1,
    explanation: "До нативных container queries можно использовать ResizeObserver для отслеживания размеров контейнера и применения CSS-классов на основе пороговых значений размеров.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 35,
    question: "Что произойдет при изменении размеров элемента через transform: scale()?",
    options: [
      "ResizeObserver сработает",
      "ResizeObserver НЕ сработает, так как box model не меняется",
      "Сработает только для border-box",
      "Сработает только в Chrome"
    ],
    correctAnswer: 1,
    explanation: "transform: scale() не изменяет размеры box model элемента, поэтому ResizeObserver не сработает. Он отслеживает изменения в layout, а не визуальные трансформации.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 36,
    question: "Как использовать ResizeObserver для адаптивной типографики?",
    options: [
      "Наблюдать за контейнером текста и изменять font-size в зависимости от ширины",
      "Использовать только CSS clamp()",
      "Типографика не связана с ResizeObserver",
      "Использовать только vw единицы"
    ],
    correctAnswer: 0,
    explanation: "Можно наблюдать за контейнером и динамически менять размер шрифта, интерлиньяж или количество колонок текста в зависимости от доступного пространства.",
    topic: "Продвинутые сценарии"
  },

  // Тема 9: Типичные ошибки
  {
    id: 37,
    question: "Почему callback может вызываться очень часто?",
    options: [
      "Это баг браузера",
      "Размеры элемента действительно часто меняются (например, из-за анимаций или родительских изменений)",
      "ResizeObserver всегда вызывается часто",
      "Нужно использовать throttle"
    ],
    correctAnswer: 1,
    explanation: "Если размеры элемента часто меняются (анимации, динамический контент, изменения родителя), callback будет вызываться соответственно часто. Это нормальное поведение.",
    topic: "Типичные ошибки"
  },
  {
    id: 38,
    question: "Что делать, если нужно реагировать только на изменения ширины, игнорируя высоту?",
    options: [
      "Использовать специальную опцию observeWidth",
      "Проверять в callback, изменилась ли ширина, сравнивая с предыдущим значением",
      "ResizeObserver не позволяет этого сделать",
      "Использовать два разных observer"
    ],
    correctAnswer: 1,
    explanation: "Нужно сохранять предыдущую ширину и в callback сравнивать текущую ширину с предыдущей, игнорируя изменения высоты.",
    topic: "Типичные ошибки"
  },
  {
    id: 39,
    question: "Почему callback не срабатывает при изменении содержимого элемента?",
    options: [
      "Это баг",
      "Callback срабатывает только если изменение содержимого ПРИВОДИТ к изменению размеров",
      "Нужна дополнительная опция",
      "ResizeObserver не работает с динамическим контентом"
    ],
    correctAnswer: 1,
    explanation: "ResizeObserver отслеживает изменения размеров, а не содержимого. Callback сработает только если изменение содержимого привело к изменению размеров элемента.",
    topic: "Типичные ошибки"
  },
  {
    id: 40,
    question: "Что нужно помнить о contentRect.width/height?",
    options: [
      "Они всегда равны element.offsetWidth/offsetHeight",
      "Они НЕ включают padding, в отличие от offsetWidth/offsetHeight",
      "Они включают margin",
      "Они всегда в пикселях"
    ],
    correctAnswer: 1,
    explanation: "contentRect содержит размеры контентной области без padding и border, в то время как offsetWidth/offsetHeight включают padding и border. Нужно помнить об этой разнице.",
    topic: "Типичные ошибки"
  }
]
