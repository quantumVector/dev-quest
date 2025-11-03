import type { Question } from '@/types/question.ts'

export const webAPIRequestAnimationFrameQuestions: Question[] = [
  // Тема 1: Основы requestAnimationFrame
  {
    id: 1,
    question: "Для чего предназначен requestAnimationFrame?",
    options: [
      "Для выполнения анимаций синхронно с обновлением экрана браузера",
      "Для создания таймеров с точной задержкой",
      "Для отправки AJAX запросов",
      "Для работы с canvas элементами"
    ],
    correctAnswer: 0,
    explanation: "requestAnimationFrame предназначен для выполнения анимаций синхронно с частотой обновления экрана браузера (обычно 60 FPS), что обеспечивает плавность и производительность.",
    topic: "Основы requestAnimationFrame"
  },
  {
    id: 2,
    question: "С какой частотой обычно вызывается requestAnimationFrame на большинстве дисплеев?",
    options: [
      "30 раз в секунду",
      "60 раз в секунду",
      "120 раз в секунду",
      "Зависит только от производительности браузера"
    ],
    correctAnswer: 1,
    explanation: "На большинстве дисплеев requestAnimationFrame вызывается ~60 раз в секунду (60 FPS), синхронизируясь с частотой обновления экрана. На дисплеях с высокой частотой обновления (120Hz, 144Hz) может вызываться чаще.",
    topic: "Основы requestAnimationFrame"
  },
  {
    id: 3,
    question: "Что возвращает вызов requestAnimationFrame?",
    options: [
      "Promise, который резолвится при следующем кадре",
      "undefined",
      "Числовой ID, который можно использовать для отмены",
      "Объект с информацией о следующем кадре"
    ],
    correctAnswer: 2,
    explanation: "requestAnimationFrame возвращает числовой ID (request ID), который можно передать в cancelAnimationFrame для отмены запланированного вызова.",
    topic: "Основы requestAnimationFrame"
  },
  {
    id: 4,
    question: "Какой параметр передается в callback функцию requestAnimationFrame?",
    options: [
      "Номер текущего кадра",
      "Время в миллисекундах от начала анимации",
      "DOMHighResTimeStamp - время с момента создания документа",
      "Объект с информацией о производительности"
    ],
    correctAnswer: 2,
    explanation: "В callback функцию передается DOMHighResTimeStamp - высокоточная временная метка (timestamp) в миллисекундах с момента создания документа (performance.now()).",
    topic: "Основы requestAnimationFrame"
  },
  {
    id: 5,
    question: "Что произойдет с requestAnimationFrame, если вкладка браузера неактивна?",
    options: [
      "Продолжит работать с той же частотой",
      "Будет приостановлен браузером для экономии ресурсов",
      "Будет выполняться, но с меньшей частотой (1 FPS)",
      "Вызовет ошибку"
    ],
    correctAnswer: 1,
    explanation: "Браузер автоматически приостанавливает requestAnimationFrame для неактивных вкладок, что экономит CPU и батарею. Это одно из ключевых преимуществ перед setInterval.",
    topic: "Основы requestAnimationFrame"
  },

  // Тема 2: requestAnimationFrame vs setInterval/setTimeout
  {
    id: 6,
    question: "В чем главное преимущество requestAnimationFrame перед setInterval для анимаций?",
    options: [
      "Более простой синтаксис",
      "Синхронизация с частотой обновления экрана и автоматическая оптимизация",
      "Возможность задать точную задержку",
      "Поддержка во всех браузерах"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame синхронизируется с частотой обновления экрана (vsync), автоматически приостанавливается в неактивных вкладках и группирует изменения DOM, что делает анимации плавнее и эффективнее.",
    topic: "requestAnimationFrame vs setInterval"
  },
  {
    id: 7,
    question: "Почему setInterval не подходит для плавных анимаций?",
    options: [
      "Слишком медленно работает",
      "Не синхронизируется с обновлением экрана, может вызывать пропуск кадров",
      "Нельзя использовать с CSS",
      "Не поддерживает современные браузеры"
    ],
    correctAnswer: 1,
    explanation: "setInterval выполняется независимо от частоты обновления экрана, что может приводить к пропуску кадров (frame drops), дрожанию (jank) и неэффективному использованию ресурсов. requestAnimationFrame синхронизируется с vsync.",
    topic: "requestAnimationFrame vs setInterval"
  },
  {
    id: 8,
    question: "Что выведет этот код?\n\nlet count = 0;\nsetTimeout(() => count++, 16);\nsetTimeout(() => count++, 16);\nsetTimeout(() => count++, 16);\nconsole.log(count);",
    options: [
      "0",
      "3",
      "1",
      "undefined"
    ],
    correctAnswer: 0,
    explanation: "console.log выполнится сразу, до того как отработают setTimeout'ы. count будет 0. setTimeout планирует выполнение асинхронно, а console.log синхронный.",
    topic: "requestAnimationFrame vs setInterval"
  },
  {
    id: 9,
    question: "Можно ли использовать setInterval(fn, 0) для достижения максимальной частоты анимации?",
    options: [
      "Да, это лучший способ для максимальной скорости",
      "Нет, браузер имеет минимальную задержку ~4мс, и это не синхронизировано с экраном",
      "Да, но только в Chrome",
      "Нет, setInterval не принимает 0 как параметр"
    ],
    correctAnswer: 1,
    explanation: "Браузеры имеют минимальную задержку для setInterval (~4-10мс в зависимости от браузера и условий). Кроме того, это не синхронизировано с обновлением экрана, что приводит к неэффективности. requestAnimationFrame - правильный выбор.",
    topic: "requestAnimationFrame vs setInterval"
  },
  {
    id: 10,
    question: "В каком случае лучше использовать setTimeout вместо requestAnimationFrame?",
    options: [
      "Для любых анимаций",
      "Для выполнения задачи через точное время, не связанной с визуальным обновлением",
      "Для работы с canvas",
      "setTimeout всегда хуже requestAnimationFrame"
    ],
    correctAnswer: 1,
    explanation: "setTimeout подходит для задач, требующих выполнения через точное время и не связанных с визуальным обновлением (например, закрытие уведомления через 5 секунд). Для визуальных анимаций используйте requestAnimationFrame.",
    topic: "requestAnimationFrame vs setInterval"
  },

  // Тема 3: Работа с timestamp и вычисление delta
  {
    id: 11,
    question: "Для чего нужен timestamp, передаваемый в callback requestAnimationFrame?",
    options: [
      "Для подсчета количества кадров",
      "Для вычисления времени, прошедшего между кадрами (delta time)",
      "Для синхронизации с сервером",
      "Для отладки производительности"
    ],
    correctAnswer: 1,
    explanation: "Timestamp используется для вычисления delta time - времени между кадрами. Это критично для создания анимаций, независимых от частоты кадров (frame-rate independent animations).",
    topic: "Timestamp и delta time"
  },
  {
    id: 12,
    question: "Что такое delta time в контексте анимаций?",
    options: [
      "Общее время выполнения анимации",
      "Время между текущим и предыдущим кадром",
      "Время до следующего кадра",
      "Задержка рендеринга"
    ],
    correctAnswer: 1,
    explanation: "Delta time - это разница во времени между текущим и предыдущим кадром. Используется для создания плавных анимаций, которые выглядят одинаково независимо от FPS.",
    topic: "Timestamp и delta time"
  },
  {
    id: 13,
    question: "Зачем использовать delta time в анимациях?",
    options: [
      "Для уменьшения использования памяти",
      "Для обеспечения одинаковой скорости анимации независимо от частоты кадров",
      "Для синхронизации анимации с сервером",
      "Для поддержки старых браузеров"
    ],
    correctAnswer: 1,
    explanation: "Delta time обеспечивает frame-rate independence - анимация движется с одинаковой скоростью независимо от FPS. На медленных устройствах (30 FPS) и быстрых (144 FPS) объект пройдет одинаковое расстояние за одно и то же время.",
    topic: "Timestamp и delta time"
  },
  {
    id: 14,
    question: "Что произойдет с анимацией без использования delta time на устройстве с низким FPS?",
    options: [
      "Анимация будет идти быстрее",
      "Анимация будет идти медленнее",
      "Анимация остановится",
      "Ничего не изменится"
    ],
    correctAnswer: 1,
    explanation: "Без delta time анимация привязана к количеству кадров. На устройстве с низким FPS (меньше кадров в секунду) анимация будет медленнее, так как обновления происходят реже. Delta time компенсирует это.",
    topic: "Timestamp и delta time"
  },
  {
    id: 15,
    question: "Как правильно использовать timestamp для создания анимации, независимой от FPS?",
    options: [
      "Прибавлять фиксированное значение каждый кадр",
      "Умножать скорость на delta time (разницу timestamp'ов)",
      "Делить скорость на timestamp",
      "Использовать timestamp как координату"
    ],
    correctAnswer: 1,
    explanation: "Правильный подход: position += velocity * deltaTime. Это обеспечивает, что объект проходит одинаковое расстояние за единицу времени независимо от FPS. deltaTime обычно в секундах или миллисекундах.",
    topic: "Timestamp и delta time"
  },

  // Тема 4: Отмена requestAnimationFrame
  {
    id: 16,
    question: "Как отменить запланированный requestAnimationFrame?",
    options: [
      "clearAnimationFrame(id)",
      "cancelAnimationFrame(id)",
      "stopAnimationFrame(id)",
      "Нельзя отменить"
    ],
    correctAnswer: 1,
    explanation: "Для отмены используется cancelAnimationFrame(id), где id - это значение, возвращенное requestAnimationFrame. Аналогично связке setTimeout/clearTimeout.",
    topic: "Отмена анимации"
  },
  {
    id: 17,
    question: "Что произойдет, если вызвать cancelAnimationFrame с несуществующим ID?",
    options: [
      "Выбросит ошибку",
      "Остановит все анимации",
      "Ничего не произойдет",
      "Вернет false"
    ],
    correctAnswer: 2,
    explanation: "Вызов cancelAnimationFrame с несуществующим или уже выполненным ID безопасен - ничего не произойдет, ошибка не выбросится. Это аналогично поведению clearTimeout.",
    topic: "Отмена анимации"
  },
  {
    id: 18,
    question: "Когда необходимо отменять requestAnimationFrame?",
    options: [
      "Всегда, после каждой анимации",
      "Никогда, браузер сам управляет",
      "При размонтировании компонента или остановке анимации",
      "Только в production окружении"
    ],
    correctAnswer: 2,
    explanation: "Важно отменять requestAnimationFrame при размонтировании компонента (React, Vue) или остановке анимации, чтобы избежать утечек памяти и выполнения кода после удаления элемента. Это особенно критично в SPA.",
    topic: "Отмена анимации"
  },
  {
    id: 19,
    question: "Что является хорошей практикой при работе с requestAnimationFrame в React?",
    options: [
      "Никогда не отменять анимацию",
      "Сохранять ID и отменять в useEffect cleanup функции",
      "Использовать только class components",
      "Вызывать requestAnimationFrame в render методе"
    ],
    correctAnswer: 1,
    explanation: "В React хорошая практика - сохранять ID от requestAnimationFrame и отменять его в cleanup функции useEffect. Это предотвращает утечки памяти и выполнение кода после unmount компонента.",
    topic: "Отмена анимации"
  },
  {
    id: 20,
    question: "Может ли один requestAnimationFrame отменить другой?",
    options: [
      "Да, если передать правильный ID",
      "Нет, каждый независим",
      "Да, но только в одном контексте",
      "Только если они в одной функции"
    ],
    correctAnswer: 0,
    explanation: "Да, вызов cancelAnimationFrame(id) отменит любой запланированный requestAnimationFrame с соответствующим ID, независимо от того, где он был создан. ID - это глобальный идентификатор.",
    topic: "Отмена анимации"
  },

  // Тема 5: Производительность и оптимизация
  {
    id: 21,
    question: "Какую проблему производительности может вызвать тяжелый код в callback requestAnimationFrame?",
    options: [
      "Утечку памяти",
      "Пропуск кадров (frame drops) и снижение FPS",
      "Увеличение размера bundle",
      "Конфликты с CSS анимациями"
    ],
    correctAnswer: 1,
    explanation: "Если код в callback выполняется дольше ~16мс (для 60 FPS), браузер не успеет отрисовать кадр вовремя, что приведет к пропуску кадров (frame drops) и видимым лагам. Важно оптимизировать код в rAF.",
    topic: "Производительность"
  },
  {
    id: 22,
    question: "Какое максимальное время выполнения кода в requestAnimationFrame рекомендуется для 60 FPS?",
    options: [
      "5 мс",
      "10 мс",
      "16 мс",
      "33 мс"
    ],
    correctAnswer: 1,
    explanation: "Для 60 FPS у браузера есть ~16мс на кадр. Рекомендуется оставлять ~10мс на JavaScript, чтобы браузер успел выполнить layout, paint и composite. Если код занимает >16мс - будут пропуски кадров.",
    topic: "Производительность"
  },
  {
    id: 23,
    question: "Что такое 'jank' в контексте веб-анимаций?",
    options: [
      "Плавное движение объекта",
      "Видимые рывки и лаги в анимации из-за пропуска кадров",
      "Ошибка в коде анимации",
      "Стиль анимации"
    ],
    correctAnswer: 1,
    explanation: "Jank - это видимые рывки, зависания и лаги в анимации, возникающие когда браузер не успевает отрисовать кадры вовремя. Обычно вызвано тяжелым JavaScript, forced reflows или сложными CSS операциями.",
    topic: "Производительность"
  },
  {
    id: 24,
    question: "Какая операция может вызвать forced synchronous layout в requestAnimationFrame?",
    options: [
      "Изменение CSS свойства transform",
      "Чтение offsetHeight сразу после изменения стилей",
      "Использование canvas",
      "Вызов console.log"
    ],
    correctAnswer: 1,
    explanation: "Чтение layout-свойств (offsetHeight, clientWidth и т.д.) сразу после изменения стилей заставляет браузер немедленно пересчитать layout (forced reflow), что очень медленно. Сначала читайте, потом пишите (read-then-write pattern).",
    topic: "Производительность"
  },
  {
    id: 25,
    question: "Как оптимизировать анимацию множества элементов через requestAnimationFrame?",
    options: [
      "Использовать отдельный requestAnimationFrame для каждого элемента",
      "Группировать все изменения в один callback requestAnimationFrame",
      "Использовать setInterval вместо requestAnimationFrame",
      "Анимировать элементы по очереди"
    ],
    correctAnswer: 1,
    explanation: "Группируйте все изменения DOM в один callback requestAnimationFrame. Браузер оптимизирует пакетное обновление. Множественные rAF создают overhead и могут привести к рассинхронизации.",
    topic: "Производительность"
  },

  // Тема 6: Практическое применение
  {
    id: 26,
    question: "Для какой задачи requestAnimationFrame НЕ является оптимальным выбором?",
    options: [
      "Плавная прокрутка (smooth scroll)",
      "Canvas анимации",
      "Отправка аналитики каждые 5 секунд",
      "Particle system"
    ],
    correctAnswer: 2,
    explanation: "Для задач, не связанных с визуальным обновлением и требующих точного времени (таймеры, периодическая отправка данных), лучше использовать setTimeout/setInterval. requestAnimationFrame оптимизирован для визуальных обновлений.",
    topic: "Практическое применение"
  },
  {
    id: 27,
    question: "Можно ли использовать requestAnimationFrame для создания игрового цикла (game loop)?",
    options: [
      "Нет, он не предназначен для игр",
      "Да, это стандартный подход для веб-игр",
      "Только для 2D игр",
      "Только в сочетании с WebGL"
    ],
    correctAnswer: 1,
    explanation: "requestAnimationFrame - стандартный и рекомендуемый способ создания игрового цикла в браузере. Обеспечивает синхронизацию с обновлением экрана, автоматическую паузу в неактивных вкладках и оптимальную производительность.",
    topic: "Практическое применение"
  },
  {
    id: 28,
    question: "Какое свойство CSS лучше всего анимировать через requestAnimationFrame для максимальной производительности?",
    options: [
      "width и height",
      "margin и padding",
      "transform и opacity",
      "background-color"
    ],
    correctAnswer: 2,
    explanation: "transform и opacity - единственные свойства, которые могут быть анимированы на GPU (композиционный слой), без triggering layout или paint. Остальные свойства дороже в плане производительности.",
    topic: "Практическое применение"
  },
  {
    id: 29,
    question: "Как реализовать паузу анимации с requestAnimationFrame?",
    options: [
      "Вызвать cancelAnimationFrame и не вызывать requestAnimationFrame снова до resume",
      "Установить скорость в 0",
      "Использовать CSS animation-play-state: paused",
      "Нельзя поставить на паузу"
    ],
    correctAnswer: 0,
    explanation: "Для паузы: 1) Сохраните ID от requestAnimationFrame, 2) Вызовите cancelAnimationFrame(id), 3) При resume вызовите requestAnimationFrame снова. Также нужно корректно обработать timestamp для продолжения с правильной позиции.",
    topic: "Практическое применение"
  },
  {
    id: 30,
    question: "Можно ли комбинировать CSS transitions/animations с requestAnimationFrame?",
    options: [
      "Нет, это вызовет конфликт",
      "Да, но только в Chrome",
      "Да, но нужно избегать анимации одних и тех же свойств",
      "Да, но только для transform"
    ],
    correctAnswer: 2,
    explanation: "Можно комбинировать CSS анимации с JavaScript анимациями через rAF, но избегайте анимации одних и тех же свойств одновременно - это вызовет конфликт. Например, CSS для opacity, JS для transform.",
    topic: "Практическое применение"
  },

  // Тема 7: Продвинутые техники
  {
    id: 31,
    question: "Что такое 'easing' функции и как их использовать с requestAnimationFrame?",
    options: [
      "Функции для очистки памяти",
      "Функции, которые управляют скоростью анимации во времени (acceleration/deceleration)",
      "Функции для отладки производительности",
      "Встроенные методы браузера"
    ],
    correctAnswer: 1,
    explanation: "Easing функции (ease-in, ease-out, ease-in-out) управляют ускорением/замедлением анимации. Применяются к прогрессу анимации (0 до 1) для создания более естественного движения. Реализуются через математические функции.",
    topic: "Продвинутые техники"
  },
  {
    id: 32,
    question: "Как реализовать throttling для requestAnimationFrame?",
    options: [
      "Использовать setTimeout внутри callback",
      "Пропускать кадры, выполняя код только каждый N-ный кадр",
      "Использовать setInterval вместо rAF",
      "Throttling не нужен для rAF"
    ],
    correctAnswer: 1,
    explanation: "Для throttling можно пропускать кадры: let frameCount = 0; rAF(() => { if (frameCount++ % 2 === 0) { /* выполнить */ } }). Это полезно для тяжелых операций, которым не нужны все 60 кадров в секунду.",
    topic: "Продвинутые техники"
  },
  {
    id: 33,
    question: "Что такое 'animation timeline' и как его реализовать с requestAnimationFrame?",
    options: [
      "Встроенный API браузера",
      "Система отслеживания прогресса анимации от 0 до 1 на основе времени",
      "CSS свойство",
      "Инструмент DevTools"
    ],
    correctAnswer: 1,
    explanation: "Animation timeline - это система отслеживания прогресса анимации. Вычисляется как (currentTime - startTime) / duration. Значение от 0 (начало) до 1 (конец) используется для интерполяции значений и применения easing функций.",
    topic: "Продвинутые техники"
  },
  {
    id: 34,
    question: "Как правильно обрабатывать окончание анимации в requestAnimationFrame?",
    options: [
      "Проверять, достиг ли прогресс >= 1, и прекращать вызов rAF",
      "Ждать автоматической остановки браузером",
      "Использовать setTimeout для остановки",
      "Анимация не может закончиться"
    ],
    correctAnswer: 0,
    explanation: "Проверяйте условие завершения (например, прогресс >= 1 или достижение целевой позиции). При выполнении условия устанавливайте финальное значение и НЕ вызывайте requestAnimationFrame снова, иначе анимация не остановится.",
    topic: "Продвинутые техники"
  },
  {
    id: 35,
    question: "Что такое 'lerp' (linear interpolation) и как его использовать в анимациях?",
    options: [
      "Функция для логирования",
      "Функция плавного перехода между двумя значениями: lerp(a, b, t) = a + (b - a) * t",
      "Метод оптимизации производительности",
      "CSS свойство"
    ],
    correctAnswer: 1,
    explanation: "lerp (linear interpolation) вычисляет промежуточное значение между start и end: lerp(start, end, progress) = start + (end - start) * progress. Где progress от 0 до 1. Используется для плавной анимации любых числовых значений.",
    topic: "Продвинутые техники"
  },

  // Тема 8: Отладка и инструменты
  {
    id: 36,
    question: "Как измерить FPS (frames per second) в анимации с requestAnimationFrame?",
    options: [
      "Использовать специальное API браузера",
      "Подсчитывать вызовы callback за секунду",
      "FPS нельзя измерить в JavaScript",
      "Использовать Date.now()"
    ],
    correctAnswer: 1,
    explanation: "Можно подсчитывать количество вызовов callback за секунду: увеличивайте счетчик каждый кадр, раз в секунду выводите значение и сбрасывайте счетчик. Или используйте DevTools Performance панель для точных замеров.",
    topic: "Отладка"
  },
  {
    id: 37,
    question: "Какой инструмент DevTools лучше всего подходит для анализа производительности requestAnimationFrame?",
    options: [
      "Console",
      "Network",
      "Performance (Профилировщик)",
      "Application"
    ],
    correctAnswer: 2,
    explanation: "Performance панель (профилировщик) показывает timeline выполнения, длительность кадров, FPS, scripting time, rendering time. Можно увидеть пропуски кадров (long frames) и точно определить узкие места.",
    topic: "Отладка"
  },
  {
    id: 38,
    question: "Что означает красная полоса в Performance timeline Chrome DevTools?",
    options: [
      "Выполнение JavaScript",
      "Кадр занял больше времени, чем должен (>16.6мс для 60 FPS) - пропуск кадра",
      "Сетевой запрос",
      "Ошибка в коде"
    ],
    correctAnswer: 1,
    explanation: "Красная полоса (или красный треугольник вверху) в Performance timeline указывает на long frame - кадр, который занял больше ~16.6мс, что привело к пропуску кадра и снижению FPS. Это jank, который видит пользователь.",
    topic: "Отладка"
  },
  {
    id: 39,
    question: "Как проверить, правильно ли отменяется requestAnimationFrame при unmount компонента?",
    options: [
      "Использовать debugger",
      "Проверить в консоли наличие ошибок после unmount",
      "Использовать React DevTools Profiler или проверить утечки памяти",
      "Нельзя проверить"
    ],
    correctAnswer: 2,
    explanation: "Используйте React DevTools Profiler для проверки, что компонент корректно unmount'ится. Также можно проверить утечки памяти через Memory панель DevTools - количество detached DOM nodes и listeners должно уменьшаться после unmount.",
    topic: "Отладка"
  },
  {
    id: 40,
    question: "Какая метрика важна для оценки плавности анимации?",
    options: [
      "Load time",
      "FPS (frames per second) и отсутствие frame drops",
      "Bundle size",
      "Time to Interactive"
    ],
    correctAnswer: 1,
    explanation: "Для плавности критичны стабильные 60 FPS (или выше на современных дисплеях) и отсутствие пропусков кадров (frame drops). Даже кратковременные падения до 30-40 FPS заметны глазу как рывки (jank).",
    topic: "Отладка"
  }
]
