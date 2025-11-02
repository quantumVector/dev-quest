import type { Question } from '@/types/question.ts'

export const intersectionObserverQuestions: Question[] = [
  // Тема 1: Основы IntersectionObserver
  {
    id: 1,
    question: "Что такое IntersectionObserver?",
    options: [
      "Метод для отслеживания кликов на элементах",
      "API для асинхронного наблюдения за изменениями пересечения элемента с его предком или viewport",
      "Инструмент для измерения размеров элементов",
      "Способ анимации элементов при скролле"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver — это API, который позволяет асинхронно наблюдать за изменениями пересечения целевого элемента с его родительским элементом или с viewport браузера.",
    topic: "Основы IntersectionObserver"
  },
  {
    id: 2,
    question: "Как создать экземпляр IntersectionObserver?",
    options: [
      "IntersectionObserver.create(callback, options)",
      "new IntersectionObserver(callback, options)",
      "createIntersectionObserver(callback, options)",
      "IntersectionObserver.observe(element)"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver создается через конструктор: new IntersectionObserver(callback, options), где callback — функция обратного вызова, options — настройки наблюдателя.",
    topic: "Основы IntersectionObserver"
  },
  {
    id: 3,
    question: "Какие параметры принимает callback функция IntersectionObserver?",
    options: [
      "Только один параметр — element",
      "entries и observer",
      "element, isIntersecting, ratio",
      "target, root, threshold"
    ],
    correctAnswer: 1,
    explanation: "Callback принимает два параметра: entries (массив IntersectionObserverEntry объектов) и observer (сам экземпляр IntersectionObserver).",
    topic: "Основы IntersectionObserver"
  },
  {
    id: 4,
    question: "Как начать наблюдение за элементом?",
    options: [
      "observer.watch(element)",
      "observer.observe(element)",
      "observer.start(element)",
      "observer.track(element)"
    ],
    correctAnswer: 1,
    explanation: "Для начала наблюдения за элементом используется метод observe(element). Можно наблюдать за несколькими элементами одним observer.",
    topic: "Основы IntersectionObserver"
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
    topic: "Основы IntersectionObserver"
  },
  {
    id: 6,
    question: "Как полностью отключить IntersectionObserver?",
    options: [
      "observer.stop()",
      "observer.disconnect()",
      "observer.destroy()",
      "observer.close()"
    ],
    correctAnswer: 1,
    explanation: "Метод disconnect() прекращает наблюдение за всеми элементами и полностью отключает observer.",
    topic: "Основы IntersectionObserver"
  },

  // Тема 2: Опции IntersectionObserver
  {
    id: 7,
    question: "Что определяет опция 'root' в IntersectionObserver?",
    options: [
      "Корневой элемент документа",
      "Элемент, который используется как viewport для проверки видимости целевого элемента",
      "Первый родительский элемент",
      "Главный наблюдаемый элемент"
    ],
    correctAnswer: 1,
    explanation: "Опция root определяет элемент, используемый как viewport для проверки видимости. Если null (по умолчанию), используется viewport браузера.",
    topic: "Опции IntersectionObserver"
  },
  {
    id: 8,
    question: "Что такое 'rootMargin' в IntersectionObserver?",
    options: [
      "Внешний отступ целевого элемента",
      "Отступы вокруг root элемента, расширяющие или сужающие область для расчета пересечений",
      "Минимальное расстояние между элементами",
      "Размер viewport"
    ],
    correctAnswer: 1,
    explanation: "rootMargin работает как CSS margin, расширяя или сужая зону пересечения вокруг root. Синтаксис аналогичен CSS: '10px 20px 30px 40px' или '10px'.",
    topic: "Опции IntersectionObserver"
  },
  {
    id: 9,
    question: "Какой формат принимает rootMargin?",
    options: [
      "Только числа в пикселях",
      "Строка в формате CSS margin (px или %)",
      "Объект с полями top, right, bottom, left",
      "Массив из 4 чисел"
    ],
    correctAnswer: 1,
    explanation: "rootMargin принимает строку в CSS-формате, например '10px 20px' или '10%'. Поддерживаются пиксели и проценты.",
    topic: "Опции IntersectionObserver"
  },
  {
    id: 10,
    question: "Что определяет опция 'threshold' в IntersectionObserver?",
    options: [
      "Минимальный размер элемента",
      "Число или массив чисел от 0 до 1, указывающих при каких долях видимости вызывать callback",
      "Максимальное количество наблюдаемых элементов",
      "Время задержки перед вызовом callback"
    ],
    correctAnswer: 1,
    explanation: "threshold указывает, при каких долях видимости элемента должен срабатывать callback. 0 — хотя бы 1 пиксель виден, 1 — элемент виден полностью, [0, 0.5, 1] — при 0%, 50% и 100%.",
    topic: "Опции IntersectionObserver"
  },
  {
    id: 11,
    question: "Что означает threshold: [0, 0.25, 0.5, 0.75, 1]?",
    options: [
      "Callback сработает один раз при любой видимости",
      "Callback сработает при достижении каждого из указанных значений видимости (0%, 25%, 50%, 75%, 100%)",
      "Callback сработает максимум 5 раз",
      "Элемент должен быть виден на 25-75%"
    ],
    correctAnswer: 1,
    explanation: "При таком threshold callback будет вызываться каждый раз, когда видимость элемента пересекает одно из указанных значений: 0%, 25%, 50%, 75%, 100%.",
    topic: "Опции IntersectionObserver"
  },

  // Тема 3: IntersectionObserverEntry
  {
    id: 12,
    question: "Какое свойство IntersectionObserverEntry указывает, пересекается ли элемент с root?",
    options: [
      "isVisible",
      "isIntersecting",
      "intersects",
      "visible"
    ],
    correctAnswer: 1,
    explanation: "Свойство isIntersecting возвращает true, если целевой элемент пересекается с root элементом, иначе false.",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 13,
    question: "Что содержит свойство 'intersectionRatio' в IntersectionObserverEntry?",
    options: [
      "Размер элемента в пикселях",
      "Число от 0 до 1, показывающее какая доля элемента видима",
      "Процент прокрутки страницы",
      "Расстояние до viewport"
    ],
    correctAnswer: 1,
    explanation: "intersectionRatio — число от 0.0 до 1.0, показывающее какая доля целевого элемента видна в root. 0 — не виден, 1 — виден полностью.",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 14,
    question: "Что содержит свойство 'target' в IntersectionObserverEntry?",
    options: [
      "Root элемент",
      "Viewport браузера",
      "Наблюдаемый элемент",
      "Родительский элемент"
    ],
    correctAnswer: 2,
    explanation: "Свойство target содержит ссылку на наблюдаемый DOM-элемент, для которого произошло событие пересечения.",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 15,
    question: "Какое свойство IntersectionObserverEntry содержит информацию о границах элемента?",
    options: [
      "elementBounds",
      "boundingClientRect",
      "bounds",
      "rectangle"
    ],
    correctAnswer: 1,
    explanation: "boundingClientRect содержит DOMRectReadOnly с информацией о границах целевого элемента (аналогично element.getBoundingClientRect()).",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 16,
    question: "Что содержит свойство 'rootBounds' в IntersectionObserverEntry?",
    options: [
      "Границы целевого элемента",
      "Границы root элемента (или viewport, если root null)",
      "Границы пересечения",
      "Координаты корня документа"
    ],
    correctAnswer: 1,
    explanation: "rootBounds содержит DOMRectReadOnly с информацией о границах root элемента. Если root — viewport, содержит его размеры. Может быть null.",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 17,
    question: "Что содержит свойство 'intersectionRect' в IntersectionObserverEntry?",
    options: [
      "Размер целевого элемента",
      "Прямоугольник, описывающий видимую часть целевого элемента",
      "Размер viewport",
      "Позицию элемента на странице"
    ],
    correctAnswer: 1,
    explanation: "intersectionRect — DOMRectReadOnly, описывающий прямоугольник пересечения целевого элемента и root. Если элемент не пересекается, все значения будут 0.",
    topic: "IntersectionObserverEntry"
  },
  {
    id: 18,
    question: "Что содержит свойство 'time' в IntersectionObserverEntry?",
    options: [
      "Время создания observer",
      "DOMHighResTimeStamp, указывающий время возникновения пересечения",
      "Длительность пересечения",
      "Время последнего обновления"
    ],
    correctAnswer: 1,
    explanation: "time содержит DOMHighResTimeStamp (высокоточная временная метка), указывающий когда произошло пересечение относительно начала навигации.",
    topic: "IntersectionObserverEntry"
  },

  // Тема 4: Практическое применение
  {
    id: 19,
    question: "Какой паттерн используется для lazy loading изображений с IntersectionObserver?",
    options: [
      "Загружать изображение при создании элемента",
      "Наблюдать за img элементом и загружать src при isIntersecting: true",
      "Использовать threshold: 1",
      "Загружать все изображения сразу"
    ],
    correctAnswer: 1,
    explanation: "Для lazy loading наблюдают за img элементом и при isIntersecting: true заменяют data-src на src, затем прекращают наблюдение через unobserve().",
    topic: "Практическое применение"
  },
  {
    id: 20,
    question: "Как реализовать бесконечную прокрутку с IntersectionObserver?",
    options: [
      "Наблюдать за последним элементом списка и загружать новые данные при пересечении",
      "Отслеживать событие scroll",
      "Использовать setInterval для проверки позиции",
      "Проверять scrollTop каждые 100ms"
    ],
    correctAnswer: 0,
    explanation: "Для бесконечной прокрутки наблюдают за последним элементом или специальным элементом-триггером в конце списка. При его появлении в viewport загружают новые данные.",
    topic: "Практическое применение"
  },
  {
    id: 21,
    question: "Почему IntersectionObserver лучше для lazy loading, чем событие scroll?",
    options: [
      "Работает быстрее",
      "Асинхронный, не блокирует главный поток, автоматически дебаунсит вызовы",
      "Имеет больше методов",
      "Поддерживается во всех браузерах"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver выполняется асинхронно, не блокирует главный поток, браузер оптимизирует вызовы. Это эффективнее чем обработка scroll с debounce/throttle.",
    topic: "Практическое применение"
  },
  {
    id: 22,
    question: "Как отследить, когда элемент становится виден хотя бы на 50%?",
    options: [
      "Использовать threshold: 0.5",
      "Проверять intersectionRatio >= 0.5",
      "Оба варианта верны",
      "Использовать rootMargin: '50%'"
    ],
    correctAnswer: 2,
    explanation: "Можно использовать threshold: 0.5 чтобы callback срабатывал при 50% видимости, или проверять intersectionRatio >= 0.5 в callback.",
    topic: "Практическое применение"
  },
  {
    id: 23,
    question: "Как реализовать анимацию появления элементов при скролле?",
    options: [
      "Использовать CSS transition",
      "Наблюдать за элементом и добавлять класс с анимацией при isIntersecting: true",
      "Использовать requestAnimationFrame",
      "Отслеживать событие scroll"
    ],
    correctAnswer: 1,
    explanation: "При пересечении элемента с viewport добавляется CSS-класс с анимацией. После анимации можно вызвать unobserve() для оптимизации.",
    topic: "Практическое применение"
  },
  {
    id: 24,
    question: "Как отследить элемент, который появился в viewport на 100%?",
    options: [
      "threshold: 1.0",
      "threshold: 100",
      "intersectionRatio === '100%'",
      "rootMargin: '100%'"
    ],
    correctAnswer: 0,
    explanation: "threshold: 1.0 (или просто 1) означает, что callback сработает когда элемент виден на 100%. intersectionRatio также будет равен 1.",
    topic: "Практическое применение"
  },

  // Тема 5: Оптимизация и производительность
  {
    id: 25,
    question: "Зачем вызывать unobserve() после однократной обработки события?",
    options: [
      "Это обязательное требование API",
      "Для оптимизации производительности, чтобы браузер не отслеживал ненужные элементы",
      "Чтобы освободить память",
      "Для предотвращения утечек памяти"
    ],
    correctAnswer: 1,
    explanation: "После обработки элемента (например, загрузки изображения) вызов unobserve() освобождает браузер от необходимости отслеживать этот элемент, улучшая производительность.",
    topic: "Оптимизация"
  },
  {
    id: 26,
    question: "Можно ли использовать один IntersectionObserver для нескольких элементов?",
    options: [
      "Нет, нужен отдельный observer для каждого элемента",
      "Да, один observer может наблюдать за несколькими элементами",
      "Только если элементы одного типа",
      "Максимум 10 элементов на observer"
    ],
    correctAnswer: 1,
    explanation: "Один IntersectionObserver может наблюдать за множеством элементов. Это эффективнее создания отдельного observer для каждого элемента.",
    topic: "Оптимизация"
  },
  {
    id: 27,
    question: "Что происходит при вызове disconnect() на IntersectionObserver?",
    options: [
      "Удаляется только последний наблюдаемый элемент",
      "Прекращается наблюдение за всеми элементами",
      "Observer переходит в режим паузы",
      "Ничего не происходит"
    ],
    correctAnswer: 1,
    explanation: "disconnect() прекращает наблюдение за всеми элементами сразу. После этого можно снова использовать observe() для новых элементов.",
    topic: "Оптимизация"
  },
  {
    id: 28,
    question: "Как влияет rootMargin на производительность?",
    options: [
      "Сильно снижает производительность",
      "Позволяет предзагружать контент до того, как он попадет в viewport",
      "Не влияет на производительность",
      "Увеличивает потребление памяти"
    ],
    correctAnswer: 1,
    explanation: "Положительный rootMargin (например, '100px') позволяет начать действия (загрузку изображений) до того, как элемент попадет в viewport, улучшая UX.",
    topic: "Оптимизация"
  },

  // Тема 6: Совместимость и полифиллы
  {
    id: 29,
    question: "Поддерживается ли IntersectionObserver в IE11?",
    options: [
      "Да, полностью поддерживается",
      "Нет, требуется полифилл",
      "Частично поддерживается",
      "Поддерживается только с флагом"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver не поддерживается в IE11. Для поддержки старых браузеров нужно использовать полифилл (например, intersection-observer полифилл от W3C).",
    topic: "Совместимость"
  },
  {
    id: 30,
    question: "Как проверить поддержку IntersectionObserver в браузере?",
    options: [
      "if (IntersectionObserver) { }",
      "if ('IntersectionObserver' in window) { }",
      "if (window.IntersectionObserver !== undefined) { }",
      "Все варианты верны"
    ],
    correctAnswer: 3,
    explanation: "Все три способа корректны для проверки поддержки IntersectionObserver. Обычно используют 'IntersectionObserver' in window или typeof IntersectionObserver !== 'undefined'.",
    topic: "Совместимость"
  },

  // Тема 7: Продвинутые сценарии
  {
    id: 31,
    question: "Как отследить, когда элемент полностью покидает viewport?",
    options: [
      "Проверять isIntersecting === false и intersectionRatio === 0",
      "Использовать threshold: -1",
      "Проверять только isIntersecting === false",
      "Использовать rootMargin: '-100%'"
    ],
    correctAnswer: 0,
    explanation: "Элемент полностью вне viewport когда isIntersecting === false и intersectionRatio === 0. Можно использовать threshold: [0] для срабатывания при пересечении границы.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 32,
    question: "Можно ли использовать IntersectionObserver с элементами внутри скроллящегося контейнера?",
    options: [
      "Нет, работает только с window viewport",
      "Да, указав скроллящийся элемент как root",
      "Только с position: fixed элементами",
      "Требуется специальный API"
    ],
    correctAnswer: 1,
    explanation: "Можно указать любой скроллящийся элемент как root в опциях. Это позволяет отслеживать пересечения внутри кастомных скролл-контейнеров.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 33,
    question: "Что произойдет если элемент изменит размер после начала наблюдения?",
    options: [
      "Нужно пересоздать observer",
      "IntersectionObserver автоматически отреагирует на изменения",
      "Нужно вызвать observer.update()",
      "Наблюдение прервется"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver автоматически отслеживает изменения размеров, позиции элемента и viewport, вызывая callback при необходимости.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 34,
    question: "Как реализовать sticky header с IntersectionObserver?",
    options: [
      "Наблюдать за элементом-sentinel перед header и менять класс при пересечении",
      "Наблюдать за самим header",
      "Использовать position: sticky достаточно",
      "IntersectionObserver не подходит для этой задачи"
    ],
    correctAnswer: 0,
    explanation: "Создается элемент-sentinel (0 высоты) перед header. При его пересечении с viewport добавляется/удаляется класс для sticky header.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 35,
    question: "Может ли callback IntersectionObserver вызваться сразу после создания observer?",
    options: [
      "Нет, только после прокрутки",
      "Да, callback вызывается синхронно с начальным состоянием элементов",
      "Да, но асинхронно, даже если элемент уже в viewport",
      "Только если элемент видим на 100%"
    ],
    correctAnswer: 2,
    explanation: "Callback вызывается асинхронно сразу после вызова observe(), предоставляя начальное состояние элемента, даже если он уже в viewport.",
    topic: "Продвинутые сценарии"
  },

  // Тема 8: Отличия от других API
  {
    id: 36,
    question: "В чем главное отличие IntersectionObserver от getBoundingClientRect()?",
    options: [
      "getBoundingClientRect() точнее",
      "IntersectionObserver асинхронный и не вызывает reflow",
      "IntersectionObserver работает только с изображениями",
      "Нет отличий"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver асинхронный, не блокирует основной поток и не вызывает reflow. getBoundingClientRect() синхронный и может вызвать принудительный reflow.",
    topic: "Сравнение с другими API"
  },
  {
    id: 37,
    question: "Когда лучше использовать scroll event вместо IntersectionObserver?",
    options: [
      "Для lazy loading изображений",
      "Для параллакс эффектов требующих точную позицию скролла",
      "Для бесконечной прокрутки",
      "IntersectionObserver всегда лучше"
    ],
    correctAnswer: 1,
    explanation: "Для параллакс эффектов нужна точная позиция скролла в каждый момент, что лучше реализуется через scroll event. IntersectionObserver лучше для дискретных проверок видимости.",
    topic: "Сравнение с другими API"
  },
  {
    id: 38,
    question: "Чем IntersectionObserver отличается от ResizeObserver?",
    options: [
      "Ничем, это синонимы",
      "IntersectionObserver отслеживает видимость/пересечения, ResizeObserver — изменения размеров",
      "ResizeObserver работает только с изображениями",
      "IntersectionObserver точнее"
    ],
    correctAnswer: 1,
    explanation: "IntersectionObserver следит за пересечениями элементов, ResizeObserver — за изменениями размеров элементов. Это разные API для разных задач.",
    topic: "Сравнение с другими API"
  },

  // Тема 9: Типичные ошибки и решения
  {
    id: 39,
    question: "Почему callback может не срабатывать для элементов с display: none?",
    options: [
      "Это баг браузера",
      "display: none убирает элемент из layout, он не имеет размеров и не может пересечься",
      "Нужно использовать visibility: hidden",
      "Нужно добавить threshold: 0"
    ],
    correctAnswer: 1,
    explanation: "Элементы с display: none не имеют размеров и не участвуют в layout, поэтому IntersectionObserver не может отследить их пересечение. Используйте visibility: hidden или opacity: 0.",
    topic: "Типичные ошибки"
  },
  {
    id: 40,
    question: "Что нужно сделать при размонтировании компонента с IntersectionObserver?",
    options: [
      "Ничего, браузер сам очистит",
      "Вызвать disconnect() чтобы избежать утечек памяти",
      "Вызвать observer = null",
      "Удалить наблюдаемые элементы"
    ],
    correctAnswer: 1,
    explanation: "При размонтировании компонента нужно вызвать disconnect() для освобождения ресурсов и предотвращения утечек памяти. Особенно важно в SPA.",
    topic: "Типичные ошибки"
  }
]
