import type { Question } from '@/types/question.ts'

export const cssSpecificityQuestions: Question[] = [
  {
    id: 1,
    question: "Какой селектор имеет наивысшую специфичность?",
    options: [
      "#header .nav-item",
      "div.container p",
      "body div p.highlight",
      "#main-content"
    ],
    correctAnswer: 0,
    explanation: "Селектор '#header .nav-item' имеет специфичность 110 (1 ID + 1 класс), что выше остальных вариантов.",
    topic: "Специфичность селекторов"
  },
  {
    id: 2,
    question: "Чему равна специфичность селектора 'div.container #main p.text'?",
    options: [
      "0,1,2,1",
      "0,1,1,2",
      "0,2,1,1",
      "1,1,2,0"
    ],
    correctAnswer: 0,
    explanation: "Специфичность рассчитывается как: 0 inline-стилей, 1 ID (#main), 2 класса (.container, .text), 1 элемент (div, p) = 0,1,2,1",
    topic: "Специфичность селекторов"
  },
  {
    id: 3,
    question: "Какое правило CSS будет применено к элементу <p class='text' id='intro'>?",
    options: [
      "p.text { color: blue; }",
      "#intro { color: red; }",
      "p { color: green; }",
      ".text { color: yellow; }"
    ],
    correctAnswer: 1,
    explanation: "ID-селектор #intro имеет наивысшую специфичность (0,1,0,0) среди представленных вариантов, поэтому цвет будет красным.",
    topic: "Специфичность селекторов"
  },
  {
    id: 4,
    question: "Что произойдет, если два CSS-правила имеют одинаковую специфичность?",
    options: [
      "Браузер покажет ошибку",
      "Применится правило, которое написано первым в коде",
      "Применится правило, которое написано последним в коде",
      "Применятся оба правила одновременно"
    ],
    correctAnswer: 2,
    explanation: "При одинаковой специфичности применяется каскадность - правило, которое объявлено последним в коде, имеет приоритет.",
    topic: "Специфичность селекторов"
  }
]
