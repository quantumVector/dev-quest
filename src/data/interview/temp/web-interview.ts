export interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}

export const webInterviewQuestions: InterviewQuestion[] = [
  {
    id: 106,
    question: "Что такое Core Web Vitals и почему они важны?",
    answer: "<p><strong>Core Web Vitals</strong> — это набор метрик производительности, которые Google использует для оценки пользовательского опыта на веб-страницах и влияют на SEO-рейтинг.</p><p><strong>Три основные метрики:</strong></p><ul><li><strong>LCP (Largest Contentful Paint)</strong> — скорость загрузки основного контента</li><li><strong>FID (First Input Delay)</strong> — время отклика на первое взаимодействие пользователя</li><li><strong>CLS (Cumulative Layout Shift)</strong> — визуальная стабильность страницы</li></ul><p><strong>Почему важны:</strong></p><ul><li>Напрямую влияют на ранжирование в поисковой выдаче Google</li><li>Отражают реальный опыт пользователей</li><li>Коррелируют с бизнес-метриками (конверсия, отказы)</li><li>Измеряются на реальных устройствах пользователей</li></ul><p>Core Web Vitals — это мост между техническими метриками и бизнес-результатами, помогающий понять, где именно страница теряет пользователей.</p>",
    difficulty: 'middle',
    tags: ['Web Vitals', 'производительность', 'SEO', 'метрики']
  },
  {
    id: 107,
    question: "Что измеряет LCP (Largest Contentful Paint) и какие значения считаются хорошими?",
    answer: "<p><strong>LCP</strong> измеряет время, за которое самый большой видимый элемент контента появляется в области просмотра.</p><p><strong>Что считается за LCP:</strong></p><ul><li>Изображения (img, picture, svg)</li><li>Видео с постером</li><li>Фоновые изображения через CSS</li><li>Блоки текста (параграфы, заголовки)</li></ul><p><strong>Целевые показатели:</strong></p><ul><li><strong>Хорошо:</strong> менее 2.5 секунд</li><li><strong>Требует улучшения:</strong> 2.5-4 секунды</li><li><strong>Плохо:</strong> более 4 секунд</li></ul><p><strong>Почему важен:</strong></p><ul><li>Показывает, когда пользователь видит основной контент</li><li>Отражает воспринимаемую скорость загрузки</li><li>Прямо влияет на первое впечатление</li><li>Коррелирует с показателем отказов</li></ul><p>LCP — это не просто техническая метрика, это момент, когда пользователь получает ценность от вашей страницы.</p>",
    difficulty: 'middle',
    tags: ['LCP', 'Web Vitals', 'производительность', 'загрузка']
  },
  {
    id: 108,
    question: "Какие факторы влияют на LCP и как его оптимизировать?",
    answer: "<p><strong>Основные факторы, влияющие на LCP:</strong></p><p><strong>1. Медленный сервер:</strong></p><ul><li>Долгий TTFB (Time to First Byte)</li><li>Неоптимизированный серверный рендеринг</li><li>Отсутствие CDN</li></ul><p><strong>2. Блокирующие ресурсы:</strong></p><ul><li>Render-blocking CSS и JavaScript</li><li>Большие файлы стилей</li><li>Синхронные скрипты в head</li></ul><p><strong>3. Медленная загрузка ресурсов:</strong></p><ul><li>Большие несжатые изображения</li><li>Неоптимальные форматы</li><li>Отсутствие кэширования</li></ul><p><strong>4. Клиентский рендеринг:</strong></p><ul><li>JavaScript-heavy приложения</li><li>Отсутствие SSR/SSG</li><li>Большие бандлы</li></ul><p><strong>Стратегии оптимизации:</strong></p><ul><li>Использовать современные форматы изображений (WebP, AVIF)</li><li>Применять preload для критических ресурсов</li><li>Оптимизировать серверное время ответа</li><li>Минимизировать render-blocking ресурсы</li><li>Использовать CDN для статики</li><li>Внедрить code splitting и lazy loading</li></ul>",
    difficulty: 'senior',
    tags: ['LCP', 'оптимизация', 'производительность', 'Web Vitals']
  },
  {
    id: 109,
    question: "Объясните FID (First Input Delay) и его связь с INP",
    answer: "<p><strong>FID (First Input Delay)</strong> измеряет время между первым взаимодействием пользователя со страницей и моментом, когда браузер может обработать это взаимодействие.</p><p><strong>Что измеряет FID:</strong></p><ul><li>Клики по кнопкам и ссылкам</li><li>Нажатия клавиш в формах</li><li>Выбор элементов в dropdown</li><li>Не измеряет: скроллинг, зум, hover</li></ul><p><strong>Хорошие показатели:</strong></p><ul><li><strong>Хорошо:</strong> менее 100 мс</li><li><strong>Требует улучшения:</strong> 100-300 мс</li><li><strong>Плохо:</strong> более 300 мс</li></ul><p><strong>INP (Interaction to Next Paint):</strong></p><p>Новая метрика, которая заменяет FID. INP измеряет <em>все</em> взаимодействия на странице, а не только первое, и отслеживает полный цикл до отрисовки результата.</p><p><strong>Ключевые различия:</strong></p><ul><li>FID — только первое взаимодействие, INP — все взаимодействия</li><li>FID — до начала обработки, INP — до визуального отклика</li><li>INP более полно отражает интерактивность страницы</li></ul>",
    difficulty: 'middle',
    tags: ['FID', 'INP', 'интерактивность', 'Web Vitals']
  },
  {
    id: 110,
    question: "Как улучшить FID и что вызывает длительные задержки?",
    answer: "<p><strong>Основные причины плохого FID:</strong></p><p><strong>1. Долгие JavaScript-задачи:</strong></p><ul><li>Тяжелые вычисления блокируют главный поток</li><li>Парсинг и выполнение больших скриптов</li><li>Синхронные операции</li></ul><p><strong>2. Блокировка главного потока:</strong></p><ul><li>Обработка событий занимает много времени</li><li>Layout thrashing</li><li>Принудительные reflow</li></ul><p><strong>3. Большие бандлы JavaScript:</strong></p><ul><li>Долгий парсинг и компиляция</li><li>Много неиспользуемого кода</li><li>Отсутствие code splitting</li></ul><p><strong>Методы улучшения:</strong></p><ul><li><strong>Разбивайте длинные задачи:</strong> используйте requestIdleCallback, web workers</li><li><strong>Оптимизируйте JavaScript:</strong> code splitting, tree shaking, defer/async</li><li><strong>Минимизируйте сторонние скрипты:</strong> особенно analytics и widgets</li><li><strong>Используйте web workers:</strong> для тяжелых вычислений</li><li><strong>Оптимизируйте event handlers:</strong> debounce, throttle, passive listeners</li></ul><p>Главный принцип: освобождайте главный поток для быстрой реакции на действия пользователя.</p>",
    difficulty: 'senior',
    tags: ['FID', 'оптимизация', 'JavaScript', 'производительность']
  },
  {
    id: 111,
    question: "Что такое CLS (Cumulative Layout Shift) и как он рассчитывается?",
    answer: "<p><strong>CLS</strong> измеряет визуальную стабильность страницы, суммируя все неожиданные смещения контента во время загрузки.</p><p><strong>Как рассчитывается:</strong></p><p>CLS = Impact Fraction × Distance Fraction</p><ul><li><strong>Impact Fraction</strong> — какая часть viewport затронута смещением</li><li><strong>Distance Fraction</strong> — на какое расстояние сместился элемент</li></ul><p><strong>Хорошие показатели:</strong></p><ul><li><strong>Хорошо:</strong> менее 0.1</li><li><strong>Требует улучшения:</strong> 0.1-0.25</li><li><strong>Плохо:</strong> более 0.25</li></ul><p><strong>Когда происходят смещения:</strong></p><ul><li>Изображения без размеров загружаются</li><li>Динамический контент добавляется сверху</li><li>Веб-шрифты загружаются (FOUT)</li><li>Баннеры и виджеты появляются неожиданно</li><li>Анимации изменяют размеры элементов</li></ul><p><strong>Пользовательский опыт:</strong></p><p>Плохой CLS раздражает пользователей — они нажимают на кнопку, но в последний момент контент смещается и клик попадает не туда. Это особенно критично для мобильных устройств.</p>",
    difficulty: 'middle',
    tags: ['CLS', 'Web Vitals', 'layout shift', 'визуальная стабильность']
  },
  {
    id: 112,
    question: "Какие техники помогают избежать layout shifts?",
    answer: "<p><strong>Превентивные меры для стабильного макета:</strong></p><p><strong>1. Резервирование места для изображений:</strong></p><ul><li>Всегда указывайте width и height атрибуты</li><li>Используйте aspect-ratio в CSS</li><li>Применяйте placeholder'ы с правильными пропорциями</li></ul><p><strong>2. Резервирование места для рекламы:</strong></p><ul><li>Создавайте контейнеры фиксированного размера</li><li>Используйте min-height для блоков</li><li>Показывайте placeholder до загрузки</li></ul><p><strong>3. Управление шрифтами:</strong></p><ul><li>Используйте font-display: optional или swap</li><li>Preload критичных шрифтов</li><li>Подбирайте fallback-шрифты с похожими метриками</li><li>Применяйте size-adjust для выравнивания размеров</li></ul><p><strong>4. Динамический контент:</strong></p><ul><li>Добавляйте новый контент снизу или по клику</li><li>Используйте transform вместо изменения размеров</li><li>Анимируйте через CSS transitions, а не изменение layout</li></ul><p><strong>5. Embeds и iframes:</strong></p><ul><li>Устанавливайте размеры заранее</li><li>Используйте aspect-ratio</li><li>Применяйте contain: layout для изоляции</li></ul><p>Золотое правило: никогда не вставляйте контент выше существующего без взаимодействия пользователя.</p>",
    difficulty: 'senior',
    tags: ['CLS', 'оптимизация', 'layout', 'стабильность']
  },
  {
    id: 113,
    question: "Что такое TTFB и как он влияет на Core Web Vitals?",
    answer: "<p><strong>TTFB (Time to First Byte)</strong> — это время от начала запроса страницы до получения первого байта ответа от сервера.</p><p><strong>Компоненты TTFB:</strong></p><ul><li>Время DNS lookup</li><li>Время установки соединения</li><li>TLS handshake (для HTTPS)</li><li>Время обработки на сервере</li></ul><p><strong>Хорошие показатели:</strong></p><ul><li><strong>Хорошо:</strong> менее 800 мс</li><li><strong>Требует улучшения:</strong> 800-1800 мс</li><li><strong>Плохо:</strong> более 1800 мс</li></ul><p><strong>Влияние на Core Web Vitals:</strong></p><ul><li><strong>На LCP:</strong> медленный TTFB задерживает начало загрузки ресурсов</li><li><strong>На FID:</strong> косвенно — если страница долго грузится, JavaScript загружается позже</li><li><strong>На CLS:</strong> медленная загрузка может увеличить вероятность layout shifts</li></ul><p><strong>Оптимизация TTFB:</strong></p><ul><li>Использовать CDN для статического контента</li><li>Оптимизировать серверную обработку</li><li>Внедрить кэширование на разных уровнях</li><li>Использовать HTTP/2 или HTTP/3</li><li>Минимизировать редиректы</li></ul><p>TTFB — это фундамент: если сервер отвечает медленно, все остальные оптимизации теряют эффективность.</p>",
    difficulty: 'middle',
    tags: ['TTFB', 'производительность', 'серверная оптимизация', 'Web Vitals']
  },
  {
    id: 114,
    question: "Как измерять Web Vitals в реальных условиях?",
    answer: "<p><strong>Два подхода к измерению:</strong></p><p><strong>Lab Data (синтетические данные):</strong></p><ul><li><strong>Lighthouse:</strong> в Chrome DevTools или CI/CD</li><li><strong>WebPageTest:</strong> детальный анализ с разных локаций</li><li><strong>Chrome UX Report:</strong> агрегированные данные от реальных пользователей</li></ul><p><strong>Преимущества lab data:</strong> контролируемые условия, воспроизводимость, детальная диагностика</p><p><strong>Недостатки:</strong> не отражают реальный опыт пользователей</p><p><strong>Field Data (реальные пользователи):</strong></p><ul><li><strong>Web Vitals JavaScript library:</strong> для сбора метрик</li><li><strong>Google Analytics 4:</strong> автоматический сбор Web Vitals</li><li><strong>RUM (Real User Monitoring):</strong> специализированные сервисы</li><li><strong>Chrome User Experience Report:</strong> публичный датасет от Google</li></ul><p><strong>Преимущества field data:</strong> реальные устройства, сети, поведение пользователей</p><p><strong>Недостатки:</strong> сложнее диагностировать проблемы</p><p><strong>Лучшая практика:</strong></p><p>Используйте оба подхода — lab data для быстрой итерации и диагностики, field data для понимания реального опыта и приоритизации работы.</p>",
    difficulty: 'senior',
    tags: ['измерение', 'Web Vitals', 'мониторинг', 'инструменты']
  },
  {
    id: 115,
    question: "Что такое TBT (Total Blocking Time) и как он связан с FID?",
    answer: "<p><strong>TBT (Total Blocking Time)</strong> — это сумма всех периодов между FCP и TTI, когда главный поток был заблокирован достаточно долго, чтобы помешать отклику на ввод.</p><p><strong>Как рассчитывается:</strong></p><ul><li>Измеряется время между First Contentful Paint и Time to Interactive</li><li>Любая задача, занимающая более 50 мс, считается блокирующей</li><li>TBT = сумма времени выше 50 мс для всех длинных задач</li></ul><p><strong>Связь с FID:</strong></p><ul><li>TBT — это lab метрика, которая предсказывает FID</li><li>FID измеряет одно конкретное взаимодействие в реальности</li><li>Улучшение TBT обычно улучшает FID</li><li>TBT помогает диагностировать проблемы FID в lab условиях</li></ul><p><strong>Хорошие показатели TBT:</strong></p><ul><li><strong>Хорошо:</strong> менее 200 мс</li><li><strong>Требует улучшения:</strong> 200-600 мс</li><li><strong>Плохо:</strong> более 600 мс</li></ul><p><strong>Почему важен:</strong></p><p>TBT — это практичная метрика для разработки, потому что её легко измерить в Lighthouse, и она напрямую указывает на проблемы с JavaScript, которые будут влиять на интерактивность в продакшене.</p>",
    difficulty: 'middle',
    tags: ['TBT', 'FID', 'блокировка потока', 'lab metrics']
  },
  {
    id: 116,
    question: "Объясните концепцию Performance Budget и как её применять к Web Vitals",
    answer: "<p><strong>Performance Budget</strong> — это набор ограничений на метрики производительности, который команда обязуется не превышать.</p><p><strong>Типы бюджетов для Web Vitals:</strong></p><p><strong>1. Milestone-based:</strong></p><ul><li>LCP должен быть менее 2.5 секунд</li><li>FID менее 100 мс</li><li>CLS менее 0.1</li></ul><p><strong>2. Quantity-based:</strong></p><ul><li>Максимальный размер JavaScript: 300 KB</li><li>Максимальный размер изображений: 1 MB</li><li>Максимум 10 сторонних скриптов</li></ul><p><strong>3. Rule-based:</strong></p><ul><li>Все изображения должны иметь width/height</li><li>Критические ресурсы должны быть preloaded</li><li>Никакого render-blocking CSS</li></ul><p><strong>Внедрение в workflow:</strong></p><ul><li><strong>CI/CD интеграция:</strong> автоматические проверки при каждом PR</li><li><strong>Lighthouse CI:</strong> fail билда при превышении бюджетов</li><li><strong>Мониторинг:</strong> алерты при деградации метрик в продакшене</li><li><strong>Документация:</strong> четкие правила для всей команды</li></ul><p><strong>Преимущества:</strong></p><p>Performance Budget делает производительность измеримой целью, предотвращает регрессии и помогает команде принимать осознанные решения о trade-offs.</p>",
    difficulty: 'senior',
    tags: ['Performance Budget', 'Web Vitals', 'оптимизация', 'процессы']
  },
  {
    id: 117,
    question: "Как работает метрика INP и почему она заменяет FID?",
    answer: "<p><strong>INP (Interaction to Next Paint)</strong> — это метрика, которая измеряет общую отзывчивость страницы на взаимодействия пользователя в течение всего времени посещения.</p><p><strong>Ключевые отличия от FID:</strong></p><ul><li><strong>Все взаимодействия vs первое:</strong> INP учитывает все клики, нажатия клавиш, тапы, а FID только первое</li><li><strong>Полный цикл:</strong> INP измеряет от input до visual update, FID только до начала обработки</li><li><strong>Репрезентативность:</strong> INP берет p75 (75-й перцентиль) всех взаимодействий</li></ul><p><strong>Что измеряет INP:</strong></p><ol><li>Input delay — задержка до начала обработки</li><li>Processing time — время обработки event handler</li><li>Presentation delay — время до отрисовки результата</li></ol><p><strong>Хорошие показатели:</strong></p><ul><li><strong>Хорошо:</strong> менее 200 мс</li><li><strong>Требует улучшения:</strong> 200-500 мс</li><li><strong>Плохо:</strong> более 500 мс</li></ul><p><strong>Почему заменяет FID:</strong></p><ul><li>Более полно отражает интерактивность</li><li>Учитывает поведение после загрузки</li><li>Ловит проблемы с event handlers</li><li>Отражает весь пользовательский опыт</li></ul><p>INP — это эволюция метрик интерактивности, фокусирующаяся на общем опыте, а не на единичном моменте.</p>",
    difficulty: 'senior',
    tags: ['INP', 'FID', 'интерактивность', 'новые метрики']
  },
  {
    id: 118,
    question: "Какие инструменты помогают диагностировать проблемы с Web Vitals?",
    answer: "<p><strong>Браузерные инструменты:</strong></p><p><strong>Chrome DevTools:</strong></p><ul><li><strong>Lighthouse:</strong> комплексный аудит с рекомендациями</li><li><strong>Performance panel:</strong> детальная временная шкала загрузки</li><li><strong>Coverage:</strong> неиспользуемый CSS и JavaScript</li><li><strong>Network panel:</strong> анализ загрузки ресурсов</li></ul><p><strong>Онлайн-инструменты:</strong></p><ul><li><strong>PageSpeed Insights:</strong> lab и field data, рекомендации</li><li><strong>WebPageTest:</strong> детальный анализ водопада загрузки</li><li><strong>Chrome UX Report:</strong> агрегированные данные реальных пользователей</li></ul><p><strong>Библиотеки и мониторинг:</strong></p><ul><li><strong>web-vitals library:</strong> JavaScript библиотека от Google</li><li><strong>Sentry, DataDog, New Relic:</strong> RUM с Web Vitals</li><li><strong>Google Analytics 4:</strong> автоматический сбор метрик</li></ul><p><strong>CI/CD инструменты:</strong></p><ul><li><strong>Lighthouse CI:</strong> автоматизация проверок</li><li><strong>SpeedCurve:</strong> мониторинг регрессий</li><li><strong>Calibre:</strong> непрерывный мониторинг производительности</li></ul><p><strong>Диагностический workflow:</strong></p><ol><li>PageSpeed Insights — быстрая оценка</li><li>Lighthouse — детальный аудит</li><li>Performance panel — глубокая диагностика</li><li>Field data — валидация в реальности</li></ol>",
    difficulty: 'middle',
    tags: ['инструменты', 'диагностика', 'Web Vitals', 'DevTools']
  },
  {
    id: 119,
    question: "Как приоритизировать оптимизации Web Vitals?",
    answer: "<p><strong>Фреймворк приоритизации:</strong></p><p><strong>1. Анализ текущего состояния:</strong></p><ul><li>Соберите field data от реальных пользователей</li><li>Определите, какие метрики в красной зоне</li><li>Проанализируйте распределение по устройствам, регионам</li></ul><p><strong>2. Оценка влияния на бизнес:</strong></p><ul><li>Какие страницы генерируют больше конверсий?</li><li>Где пользователи чаще всего отваливаются?</li><li>Какие сегменты пользователей критичны?</li></ul><p><strong>3. Быстрые победы vs долгосрочные улучшения:</strong></p><p><strong>Быстрые победы (low-hanging fruit):</strong></p><ul><li>Добавить width/height к изображениям (CLS)</li><li>Оптимизировать изображения (LCP)</li><li>Добавить preload для критических ресурсов (LCP)</li><li>Отложить сторонние скрипты (FID/INP)</li></ul><p><strong>Долгосрочные:</strong></p><ul><li>Внедрить SSR/SSG</li><li>Рефакторинг архитектуры JavaScript</li><li>Миграция на CDN</li><li>Оптимизация бэкенда</li></ul><p><strong>4. ICE-скоринг:</strong></p><ul><li><strong>Impact:</strong> насколько улучшится метрика</li><li><strong>Confidence:</strong> уверенность в результате</li><li><strong>Ease:</strong> простота реализации</li></ul><p>Начинайте с метрик, которые влияют на бизнес-KPI, и с оптимизаций, дающих максимальный результат при минимальных усилиях.</p>",
    difficulty: 'senior',
    tags: ['приоритизация', 'оптимизация', 'стратегия', 'Web Vitals']
  },
  {
    id: 120,
    question: "Как Web Vitals влияют на SEO и бизнес-метрики?",
    answer: "<p><strong>Прямое влияние на SEO:</strong></p><ul><li>Core Web Vitals — официальный ranking factor Google с 2021 года</li><li>Плохие метрики могут снизить позиции в поиске</li><li>Особенно важно для мобильной выдачи</li><li>Влияние усиливается при прочих равных факторах</li></ul><p><strong>Корреляция с бизнес-метриками:</strong></p><p><strong>Конверсии:</strong></p><ul><li>Улучшение LCP на 0.1с может увеличить конверсию на 8%</li><li>53% мобильных пользователей покидают сайт, если загрузка длится более 3 секунд</li></ul><p><strong>Показатель отказов:</strong></p><ul><li>Плохой CLS раздражает пользователей и увеличивает bounce rate</li><li>Каждая секунда задержки FID коррелирует с ростом отказов</li></ul><p><strong>Вовлеченность:</strong></p><ul><li>Быстрые сайты показывают больше просмотров страниц</li><li>Лучше metrics вовлеченности (time on site, pages per session)</li></ul><p><strong>Документированные кейсы:</strong></p><ul><li>Vodafone: улучшение LCP на 31% → рост продаж на 8%</li><li>Tokopedia: улучшение всех Core Web Vitals → +35% органического трафика</li><li>Redbus: улучшение INP → +7% продаж</li></ul><p><strong>ROI оптимизации:</strong></p><p>Инвестиции в Web Vitals окупаются через улучшение органического трафика, конверсий и удержания пользователей.</p>",
    difficulty: 'middle',
    tags: ['SEO', 'бизнес-метрики', 'конверсии', 'ROI']
  }
];
