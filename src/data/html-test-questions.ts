import type { Question } from '@/types/question.ts'

export const questions: Question[] = [
  // Тема 1: Что такое HTML и для чего он нужен
  {
    id: 1,
    question: "Что такое HTML и для чего он нужен?",
    options: [
      "Язык программирования для создания веб-приложений",
      "Язык разметки для структурирования содержимого веб-страниц",
      "База данных для хранения информации о сайте",
      "Инструмент для стилизации веб-страниц"
    ],
    correctAnswer: 1,
    explanation: "HTML (HyperText Markup Language) — это язык разметки, который используется для структурирования и представления содержимого веб-страниц.",
    topic: "Основы HTML"
  },
  {
    id: 2,
    question: "Что означает аббревиатура HTML?",
    options: [
      "High Tech Markup Language",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: 1,
    explanation: "HTML расшифровывается как HyperText Markup Language (язык гипертекстовой разметки).",
    topic: "Основы HTML"
  },
  {
    id: 3,
    question: "Какая основная функция HTML в веб-разработке?",
    options: [
      "Создание анимаций и интерактивности",
      "Стилизация внешнего вида страницы",
      "Определение структуры и содержимого документа",
      "Обработка данных на сервере"
    ],
    correctAnswer: 2,
    explanation: "HTML определяет структуру и содержимое веб-документа, создавая основу для веб-страницы.",
    topic: "Основы HTML"
  },
  {
    id: 4,
    question: "Что представляет собой HTML-тег?",
    options: [
      "Переменная в коде",
      "Функция JavaScript",
      "Элемент разметки, заключенный в угловые скобки",
      "Свойство CSS"
    ],
    correctAnswer: 2,
    explanation: "HTML-тег — это элемент разметки, заключенный в угловые скобки (< >), который определяет структуру и содержимое документа.",
    topic: "Основы HTML"
  },
  {
    id: 5,
    question: "Какой тег является корневым элементом HTML-документа?",
    options: [
      "<head>",
      "<body>",
      "<html>",
      "<document>"
    ],
    correctAnswer: 2,
    explanation: "Тег <html> является корневым элементом HTML-документа и содержит все остальные элементы страницы.",
    topic: "Основы HTML"
  },

  // Тема 2: Семантическая вёрстка
  {
    id: 6,
    question: "Что такое семантическая вёрстка?",
    options: [
      "Использование CSS для красивого оформления",
      "Применение JavaScript для интерактивности",
      "Использование HTML-тегов по их смысловому назначению",
      "Создание адаптивного дизайна"
    ],
    correctAnswer: 2,
    explanation: "Семантическая вёрстка — это подход к созданию HTML-кода, при котором теги используются в соответствии с их смысловым назначением, а не только для визуального оформления.",
    topic: "Семантическая вёрстка"
  },
  {
    id: 7,
    question: "Какой из следующих тегов является семантическим?",
    options: [
      "<div>",
      "<span>",
      "<article>",
      "<b>"
    ],
    correctAnswer: 2,
    explanation: "Тег <article> является семантическим элементом HTML5, который обозначает независимый, самодостаточный контент.",
    topic: "Семантическая вёрстка"
  },
  {
    id: 8,
    question: "Для чего используется тег <nav>?",
    options: [
      "Для создания таблиц",
      "Для группировки навигационных ссылок",
      "Для вставки изображений",
      "Для создания форм"
    ],
    correctAnswer: 1,
    explanation: "Тег <nav> используется для группировки навигационных ссылок и обозначения навигационного блока на странице.",
    topic: "Семантическая вёрстка"
  },
  {
    id: 9,
    question: "Какой тег лучше использовать для основного содержимого страницы?",
    options: [
      "<div class='main'>",
      "<section>",
      "<main>",
      "<content>"
    ],
    correctAnswer: 2,
    explanation: "Тег <main> предназначен для основного содержимого документа, которое уникально для данной страницы.",
    topic: "Семантическая вёрстка"
  },
  {
    id: 10,
    question: "В чем основное преимущество семантической разметки?",
    options: [
      "Улучшение производительности сайта",
      "Упрощение CSS-стилей",
      "Лучшая доступность и SEO",
      "Уменьшение размера файлов"
    ],
    correctAnswer: 2,
    explanation: "Семантическая разметка улучшает доступность для людей с ограниченными возможностями и помогает поисковым системам лучше понимать содержимое страницы.",
    topic: "Семантическая вёрстка"
  },
  {
    id: 11,
    question: "Какой тег используется для обозначения заголовка секции или статьи?",
    options: [
      "<title>",
      "<header>",
      "<h1>",
      "<head>"
    ],
    correctAnswer: 1,
    explanation: "Тег <header> используется для обозначения заголовочной части секции, статьи или всей страницы.",
    topic: "Семантическая вёрстка"
  },

  // Тема 3: Доступность в Web
  {
    id: 12,
    question: "Какой из следующих принципов НЕ относится к веб-доступности (WCAG)?",
    options: [
      "Воспринимаемость (Perceivable)",
      "Управляемость (Operable)",
      "Масштабируемость (Scalable)",
      "Понятность (Understandable)"
    ],
    correctAnswer: 2,
    explanation: "Основные принципы веб-доступности (WCAG): Воспринимаемость, Управляемость, Понятность и Надёжность. Масштабируемость не является одним из основных принципов доступности.",
    topic: "Веб-доступность"
  },
  {
    id: 13,
    question: "Для чего используется атрибут 'alt' в теге <img>?",
    options: [
      "Для указания размера изображения",
      "Для альтернативного текста при недоступности изображения",
      "Для указания формата изображения",
      "Для создания всплывающей подсказки"
    ],
    correctAnswer: 1,
    explanation: "Атрибут 'alt' предоставляет альтернативный текст для изображения, который читается скрин-ридерами и отображается при недоступности изображения.",
    topic: "Веб-доступность"
  },
  {
    id: 14,
    question: "Что такое ARIA в контексте веб-доступности?",
    options: [
      "Язык программирования",
      "Набор атрибутов для улучшения доступности",
      "CSS-фреймворк",
      "Протокол передачи данных"
    ],
    correctAnswer: 1,
    explanation: "ARIA (Accessible Rich Internet Applications) — это набор атрибутов, которые можно добавлять к HTML-элементам для улучшения доступности веб-приложений.",
    topic: "Веб-доступность"
  },
  {
    id: 15,
    question: "Какой атрибут используется для связи формы с её описанием?",
    options: [
      "aria-label",
      "aria-labelledby",
      "aria-describedby",
      "role"
    ],
    correctAnswer: 2,
    explanation: "Атрибут 'aria-describedby' используется для связи элемента с другим элементом, который содержит его описание.",
    topic: "Веб-доступность"
  },
  {
    id: 16,
    question: "Почему важно использовать правильную структуру заголовков (h1-h6)?",
    options: [
      "Для красивого внешнего вида",
      "Для улучшения SEO и навигации скрин-ридеров",
      "Для ускорения загрузки страницы",
      "Для совместимости со старыми браузерами"
    ],
    correctAnswer: 1,
    explanation: "Правильная иерархия заголовков помогает скрин-ридерам создавать навигационную структуру страницы и улучшает SEO.",
    topic: "Веб-доступность"
  },
  {
    id: 17,
    question: "Какой минимальный коэффициент контрастности рекомендуется для обычного текста?",
    options: [
      "2.1:1",
      "3:1",
      "4.5:1",
      "7:1"
    ],
    correctAnswer: 2,
    explanation: "Для обычного текста рекомендуется минимальный коэффициент контрастности 4.5:1 для соответствия уровню AA WCAG.",
    topic: "Веб-доступность"
  },

  // Тема 4: Адаптивные изображения
  {
    id: 18,
    question: "Какой HTML-элемент лучше всего подходит для создания адаптивных изображений?",
    options: [
      "<img> с атрибутом src",
      "<picture> с элементами <source>",
      "<div> с background-image",
      "<canvas> для рисования изображения"
    ],
    correctAnswer: 1,
    explanation: "Элемент <picture> с дочерними элементами <source> позволяет указать разные изображения для разных условий (размер экрана, плотность пикселей и т.д.), что делает его идеальным для адаптивных изображений.",
    topic: "Адаптивные изображения"
  },
  {
    id: 19,
    question: "Для чего используется атрибут 'srcset' в теге <img>?",
    options: [
      "Для указания альтернативного текста",
      "Для указания нескольких источников изображения с разными разрешениями",
      "Для указания размера изображения",
      "Для указания формата изображения"
    ],
    correctAnswer: 1,
    explanation: "Атрибут 'srcset' позволяет указать несколько источников изображения с разными разрешениями, чтобы браузер мог выбрать наиболее подходящий.",
    topic: "Адаптивные изображения"
  },
  {
    id: 20,
    question: "Что означает дескриптор 'w' в атрибуте srcset?",
    options: [
      "Ширину изображения в пикселях",
      "Высоту изображения",
      "Вес файла",
      "Качество изображения"
    ],
    correctAnswer: 0,
    explanation: "Дескриптор 'w' в srcset указывает ширину изображения в пикселях, что помогает браузеру выбрать подходящее изображение.",
    topic: "Адаптивные изображения"
  },
  {
    id: 21,
    question: "Какой атрибут используется для указания размеров изображения в разных условиях?",
    options: [
      "media",
      "sizes",
      "width",
      "dimensions"
    ],
    correctAnswer: 1,
    explanation: "Атрибут 'sizes' указывает браузеру, какой размер изображения будет отображаться при различных условиях просмотра.",
    topic: "Адаптивные изображения"
  },
  {
    id: 22,
    question: "В чем преимущество использования формата WebP для изображений?",
    options: [
      "Лучшая совместимость со старыми браузерами",
      "Меньший размер файла при сохранении качества",
      "Поддержка анимации",
      "Более простая реализация"
    ],
    correctAnswer: 1,
    explanation: "WebP обеспечивает лучшее сжатие по сравнению с JPEG и PNG, что приводит к меньшему размеру файлов при сохранении качества изображения.",
    topic: "Адаптивные изображения"
  },
  {
    id: 23,
    question: "Как правильно реализовать fallback для формата WebP?",
    options: [
      "Использовать только тег <img>",
      "Использовать <picture> с <source> для WebP и <img> для fallback",
      "Использовать JavaScript для проверки поддержки",
      "Использовать CSS медиа-запросы"
    ],
    correctAnswer: 1,
    explanation: "Использование <picture> с <source type='image/webp'> для WebP и <img> для fallback обеспечивает автоматический выбор поддерживаемого формата браузером.",
    topic: "Адаптивные изображения"
  },
  {
    id: 24,
    question: "Что такое 'art direction' в контексте адаптивных изображений?",
    options: [
      "Изменение размера изображения",
      "Изменение содержимого изображения для разных устройств",
      "Изменение формата изображения",
      "Изменение качества изображения"
    ],
    correctAnswer: 1,
    explanation: "Art direction — это подход, при котором для разных устройств используются разные версии изображения с различным кадрированием или композицией.",
    topic: "Адаптивные изображения"
  }
]
