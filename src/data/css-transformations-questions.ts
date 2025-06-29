import type { Question } from '@/types/question.ts'

export const questions: Question[] = [
  {
    id: 1,
    question: "Какие виды трансформаций можно применять в CSS?",
    options: [
      "Только translate() и rotate()",
      "translate(), rotate(), scale(), skew()",
      "Только scale() и skew()",
      "translate(), rotate(), opacity(), display()"
    ],
    correctAnswer: 1,
    explanation: "В CSS доступны четыре основных типа 2D трансформаций: translate() (перемещение), rotate() (поворот), scale() (масштабирование) и skew() (наклон). Также есть 3D версии этих трансформаций.",
    topic: "Трансформации в CSS"
  },
  {
    id: 2,
    question: "Какое свойство CSS используется для указания точки, относительно которой применяется трансформация?",
    options: [
      "transform-center",
      "transform-anchor",
      "transform-origin",
      "transform-point"
    ],
    correctAnswer: 2,
    explanation: "Свойство transform-origin определяет точку, относительно которой применяется трансформация. По умолчанию это центр элемента (50% 50%).",
    topic: "Трансформации в CSS"
  },
  {
    id: 3,
    question: "Что происходит с элементом при применении transform: translateZ(10px)?",
    options: [
      "Элемент перемещается на 10px вправо",
      "Элемент перемещается на 10px вниз",
      "Элемент перемещается на 10px по оси Z (ближе к пользователю)",
      "Элемент увеличивается на 10px"
    ],
    correctAnswer: 2,
    explanation: "translateZ(10px) перемещает элемент на 10 пикселей по оси Z, то есть ближе к пользователю в 3D пространстве. Это работает только при наличии perspective у родительского элемента.",
    topic: "Трансформации в CSS"
  },
  {
    id: 4,
    question: "Какие трансформации НЕ влияют на layout (не вызывают reflow) и оптимизированы для GPU?",
    options: [
      "Только translate() и rotate()",
      "Все 2D трансформации: translate(), rotate(), scale(), skew()",
      "Только scale() и skew()",
      "Трансформации не влияют на производительность"
    ],
    correctAnswer: 1,
    explanation: "Все 2D и 3D трансформации (translate, rotate, scale, skew) не влияют на layout документа и выполняются на композитном слое, что позволяет использовать аппаратное ускорение GPU для лучшей производительности.",
    topic: "Трансформации в CSS"
  }
]
