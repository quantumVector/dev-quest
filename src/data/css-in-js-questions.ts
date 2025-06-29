import type { Question } from '@/types/question.ts'

export const cssInJsQuestions: Question[] = [
  {
    id: 1,
    question: "Какое главное преимущество CSS-in-JS подхода по сравнению с традиционным CSS?",
    options: [
      "Лучшая производительность браузера",
      "Динамические стили на основе пропсов компонентов",
      "Меньший размер бандла",
      "Поддержка всех браузеров без полифиллов"
    ],
    correctAnswer: 1,
    explanation: "CSS-in-JS позволяет создавать динамические стили, которые могут изменяться в зависимости от пропсов, состояния компонента или других JavaScript переменных, что невозможно с традиционным CSS.",
    topic: "CSS-in-JS"
  },
  {
    id: 2,
    question: "В чем основное различие между runtime и compile-time CSS-in-JS библиотеками?",
    options: [
      "Runtime быстрее выполняется в браузере",
      "Compile-time генерирует CSS во время сборки, runtime - в браузере",
      "Runtime поддерживает больше CSS свойств",
      "Compile-time работает только с React"
    ],
    correctAnswer: 1,
    explanation: "Compile-time библиотеки (например, Linaria, vanilla-extract) генерируют статический CSS во время сборки, а runtime библиотеки (styled-components, emotion) создают стили в браузере во время выполнения.",
    topic: "CSS-in-JS"
  },
  {
    id: 3,
    question: "Какая из перечисленных библиотек НЕ является CSS-in-JS решением?",
    options: [
      "styled-components",
      "Emotion",
      "Tailwind CSS",
      "JSS"
    ],
    correctAnswer: 2,
    explanation: "Tailwind CSS - это utility-first CSS фреймворк, который использует готовые классы, а не генерирует стили в JavaScript. Остальные являются CSS-in-JS библиотеками.",
    topic: "CSS-in-JS"
  },
  {
    id: 4,
    question: "Какая потенциальная проблема может возникнуть при использовании runtime CSS-in-JS библиотек?",
    options: [
      "Невозможность использования псевдоклассов",
      "Блокировка рендеринга до загрузки CSS",
      "Отсутствие поддержки медиа-запросов",
      "Конфликт стилей между компонентами"
    ],
    correctAnswer: 1,
    explanation: "Runtime CSS-in-JS может блокировать рендеринг, поскольку стили генерируются и внедряются в DOM во время выполнения JavaScript, что может создать задержку до отображения контента (FOUC - Flash of Unstyled Content).",
    topic: "CSS-in-JS"
  }
]
