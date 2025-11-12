import type { Question } from '@/types/question.ts'

export const tsConditionalTypesQuestions: Question[] = [
  // Основы Conditional Types
  {
    id: 1,
    question: "Что такое условные типы (Conditional Types) в TypeScript?",
    options: [
      "Типы, которые зависят от условий в if-else выражениях",
      "Типы, которые выбираются на основе проверки типов с помощью extends",
      "Типы для условных операторов",
      "Типы, которые работают только с boolean значениями"
    ],
    correctAnswer: 1,
    explanation: "Conditional Types — это типы, которые выбирают один из двух возможных типов на основе проверки типов с помощью оператора extends. Синтаксис: T extends U ? X : Y",
    topic: "Основы Conditional Types"
  },
  {
    id: 2,
    question: "Какой синтаксис используется для создания условного типа?",
    options: [
      "T if U then X else Y",
      "T extends U ? X : Y",
      "T === U ? X : Y",
      "if (T extends U) X else Y"
    ],
    correctAnswer: 1,
    explanation: "Условные типы используют синтаксис тернарного оператора с ключевым словом extends: T extends U ? X : Y. Если T расширяет (совместим с) U, результат X, иначе Y.",
    topic: "Основы Conditional Types"
  },
  {
    id: 3,
    question: "Что выведет этот тип?\n\ntype IsString<T> = T extends string ? 'yes' : 'no';\ntype Result = IsString<'hello'>;",
    options: [
      "'yes'",
      "'no'",
      "boolean",
      "string"
    ],
    correctAnswer: 0,
    explanation: "Тип 'hello' (string literal) расширяет string, поэтому условие T extends string истинно, и результат будет 'yes'.",
    topic: "Основы Conditional Types"
  },
  {
    id: 4,
    question: "Что означает оператор extends в контексте условных типов?",
    options: [
      "Наследование классов",
      "Проверку на совместимость типов (is assignable to)",
      "Расширение интерфейса",
      "Клонирование типа"
    ],
    correctAnswer: 1,
    explanation: "В условных типах extends проверяет, можно ли присвоить тип T типу U (is assignable to). Это более широкое понятие, чем наследование.",
    topic: "Основы Conditional Types"
  },
  {
    id: 5,
    question: "Что выведет этот тип?\n\ntype IsNumber<T> = T extends number ? true : false;\ntype Result = IsNumber<42>;",
    options: [
      "true",
      "false",
      "number",
      "42"
    ],
    correctAnswer: 0,
    explanation: "Тип 42 (number literal) расширяет number, поэтому условие истинно и результат true.",
    topic: "Основы Conditional Types"
  },

  // Distributive Conditional Types
  {
    id: 6,
    question: "Что такое Distributive Conditional Types?",
    options: [
      "Типы, которые распределяются по всему коду",
      "Условные типы, которые автоматически применяются к каждому члену union типа",
      "Типы для распределённых систем",
      "Типы, которые распределяют нагрузку"
    ],
    correctAnswer: 1,
    explanation: "Distributive Conditional Types автоматически применяются к каждому члену union типа отдельно. Например, T extends U ? X : Y, где T это union, будет применено к каждому элементу union.",
    topic: "Distributive Conditional Types"
  },
  {
    id: 7,
    question: "Что выведет этот тип?\n\ntype ToArray<T> = T extends any ? T[] : never;\ntype Result = ToArray<string | number>;",
    options: [
      "string[] | number[]",
      "(string | number)[]",
      "Array<string | number>",
      "never"
    ],
    correctAnswer: 0,
    explanation: "Distributive conditional type применяется к каждому члену union отдельно: ToArray<string> | ToArray<number> = string[] | number[].",
    topic: "Distributive Conditional Types"
  },
  {
    id: 8,
    question: "Как предотвратить distributive поведение условного типа?",
    options: [
      "Использовать ключевое слово nodistribute",
      "Обернуть проверяемый тип в квадратные скобки [T]",
      "Использовать оператор &",
      "Это невозможно"
    ],
    correctAnswer: 1,
    explanation: "Чтобы предотвратить distributive поведение, нужно обернуть проверяемый тип в кортеж: [T] extends [U] ? X : Y. Это заставит TypeScript обрабатывать union как единое целое.",
    topic: "Distributive Conditional Types"
  },
  {
    id: 9,
    question: "Что выведет этот тип?\n\ntype Wrap<T> = [T] extends [any] ? [T] : never;\ntype Result = Wrap<string | number>;",
    options: [
      "[string] | [number]",
      "[string | number]",
      "string | number",
      "never"
    ],
    correctAnswer: 1,
    explanation: "Обёртывание в квадратные скобки [T] предотвращает distributive поведение, поэтому весь union обрабатывается как единое целое: [string | number].",
    topic: "Distributive Conditional Types"
  },
  {
    id: 10,
    question: "Когда условный тип является distributive?",
    options: [
      "Всегда",
      "Только когда проверяется голый (naked) type parameter",
      "Только с union типами",
      "Никогда"
    ],
    correctAnswer: 1,
    explanation: "Условный тип становится distributive только когда проверяется голый (naked) type parameter, т.е. T без каких-либо оберток или модификаторов перед extends.",
    topic: "Distributive Conditional Types"
  },

  // Встроенные Conditional Types
  {
    id: 11,
    question: "Что делает встроенный тип Exclude<T, U>?",
    options: [
      "Добавляет U к T",
      "Исключает из T те типы, которые присваиваемы U",
      "Объединяет T и U",
      "Выбирает общие типы T и U"
    ],
    correctAnswer: 1,
    explanation: "Exclude<T, U> исключает из union типа T те типы, которые можно присвоить U. Реализация: T extends U ? never : T.",
    topic: "Встроенные Conditional Types"
  },
  {
    id: 12,
    question: "Что выведет этот тип?\n\ntype Result = Exclude<'a' | 'b' | 'c', 'a'>;",
    options: [
      "'a' | 'b' | 'c'",
      "'b' | 'c'",
      "'a'",
      "never"
    ],
    correctAnswer: 1,
    explanation: "Exclude удаляет 'a' из union типа, оставляя 'b' | 'c'.",
    topic: "Встроенные Conditional Types"
  },
  {
    id: 13,
    question: "Что делает встроенный тип Extract<T, U>?",
    options: [
      "Извлекает метаданные типов",
      "Извлекает из T те типы, которые присваиваемы U",
      "Удаляет U из T",
      "Создаёт новый тип из T и U"
    ],
    correctAnswer: 1,
    explanation: "Extract<T, U> извлекает из union типа T только те типы, которые можно присвоить U. Реализация: T extends U ? T : never.",
    topic: "Встроенные Conditional Types"
  },
  {
    id: 14,
    question: "Что выведет этот тип?\n\ntype Result = Extract<'a' | 'b' | 'c', 'a' | 'f'>;",
    options: [
      "'a' | 'b' | 'c'",
      "'a'",
      "'f'",
      "'b' | 'c'"
    ],
    correctAnswer: 1,
    explanation: "Extract оставляет только те типы из первого union, которые присутствуют во втором. Только 'a' удовлетворяет условию.",
    topic: "Встроенные Conditional Types"
  },
  {
    id: 15,
    question: "Что делает встроенный тип NonNullable<T>?",
    options: [
      "Делает все свойства необязательными",
      "Исключает null и undefined из типа T",
      "Добавляет null и undefined к типу",
      "Проверяет, является ли тип null"
    ],
    correctAnswer: 1,
    explanation: "NonNullable<T> исключает null и undefined из типа. Реализация: T extends null | undefined ? never : T.",
    topic: "Встроенные Conditional Types"
  },

  // Infer в Conditional Types
  {
    id: 16,
    question: "Для чего используется ключевое слово infer в условных типах?",
    options: [
      "Для вывода типа вручную",
      "Для извлечения и сохранения части типа для дальнейшего использования",
      "Для проверки типов",
      "Для создания новых типов"
    ],
    correctAnswer: 1,
    explanation: "infer позволяет извлечь часть типа во время проверки с помощью extends и использовать его в результирующем типе. Это мощный инструмент для работы с generic типами.",
    topic: "Infer в Conditional Types"
  },
  {
    id: 17,
    question: "Что выведет этот тип?\n\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\ntype Result = ReturnType<() => string>;",
    options: [
      "() => string",
      "string",
      "void",
      "never"
    ],
    correctAnswer: 1,
    explanation: "infer R извлекает тип возвращаемого значения функции. Для () => string это будет string.",
    topic: "Infer в Conditional Types"
  },
  {
    id: 18,
    question: "Можно ли использовать несколько infer в одном условном типе?",
    options: [
      "Нет, только один infer на условный тип",
      "Да, можно использовать несколько infer для извлечения разных частей типа",
      "Только два infer максимум",
      "Только в nested conditional types"
    ],
    correctAnswer: 1,
    explanation: "Можно использовать несколько infer для извлечения разных частей типа, например: T extends (arg: infer A) => infer R для извлечения типа аргумента и возвращаемого значения.",
    topic: "Infer в Conditional Types"
  },
  {
    id: 19,
    question: "Что произойдёт, если infer используется вне условного типа?",
    options: [
      "TypeScript выведет тип автоматически",
      "Это вызовет ошибку компиляции",
      "infer будет проигнорирован",
      "Тип станет any"
    ],
    correctAnswer: 1,
    explanation: "infer можно использовать только в правой части extends в условных типах. Использование вне этого контекста вызовет ошибку компиляции.",
    topic: "Infer в Conditional Types"
  },
  {
    id: 20,
    question: "Что выведет этот тип?\n\ntype FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;\ntype Result = FirstArg<(x: number, y: string) => void>;",
    options: [
      "number",
      "string",
      "[number, string]",
      "void"
    ],
    correctAnswer: 0,
    explanation: "infer A извлекает тип первого аргумента функции. Для (x: number, y: string) => void это будет number.",
    topic: "Infer в Conditional Types"
  },

  // Практическое применение
  {
    id: 21,
    question: "Как создать тип, который определяет базовый тип для массивов и оставляет примитивы без изменений?",
    options: [
      "type UnwrapArray<T> = T extends Array<any> ? T : T",
      "type UnwrapArray<T> = T extends Array<infer U> ? U : T",
      "type UnwrapArray<T> = T extends infer U[] ? U : T",
      "type UnwrapArray<T> = T[] extends Array<U> ? U : T"
    ],
    correctAnswer: 1,
    explanation: "UnwrapArray проверяет, является ли T массивом. Если да, извлекает тип элементов с помощью infer U. Если нет — возвращает T как есть.",
    topic: "Практическое применение"
  },
  {
    id: 22,
    question: "Что выведет этот тип?\n\ntype Flatten<T> = T extends Array<infer U> ? U : T;\ntype Result = Flatten<number[]>;",
    options: [
      "number[]",
      "number",
      "Array<number>",
      "never"
    ],
    correctAnswer: 1,
    explanation: "number[] соответствует Array<infer U>, где U = number, поэтому результат будет number.",
    topic: "Практическое применение"
  },
  {
    id: 23,
    question: "Что выведет этот тип?\n\ntype Flatten<T> = T extends Array<infer U> ? U : T;\ntype Result = Flatten<string>;",
    options: [
      "string[]",
      "string",
      "Array<string>",
      "never"
    ],
    correctAnswer: 1,
    explanation: "string не соответствует Array<infer U>, поэтому возвращается сам тип T, то есть string.",
    topic: "Практическое применение"
  },
  {
    id: 24,
    question: "Как создать тип, который извлекает тип Promise?",
    options: [
      "type Awaited<T> = T extends Promise<any> ? T : never",
      "type Awaited<T> = T extends Promise<infer U> ? U : T",
      "type Awaited<T> = Promise<T>",
      "type Awaited<T> = T.value"
    ],
    correctAnswer: 1,
    explanation: "Awaited проверяет, является ли T Promise. Если да, извлекает тип значения с помощью infer U. Если нет — возвращает T. Это позволяет работать как с Promise, так и с обычными типами.",
    topic: "Практическое применение"
  },
  {
    id: 25,
    question: "Что выведет этот тип?\n\ntype IsArray<T> = T extends any[] ? true : false;\ntype Result = IsArray<string>;",
    options: [
      "true",
      "false",
      "string",
      "never"
    ],
    correctAnswer: 1,
    explanation: "string не расширяет any[], поэтому условие ложно и результат false.",
    topic: "Практическое применение"
  },

  // Сложные случаи
  {
    id: 26,
    question: "Что выведет этот тип?\n\ntype DeepReadonly<T> = T extends object \n  ? { readonly [K in keyof T]: DeepReadonly<T[K]> } \n  : T;\ntype Result = DeepReadonly<{ a: { b: number } }>;",
    options: [
      "{ a: { b: number } }",
      "{ readonly a: { readonly b: number } }",
      "readonly { a: { b: number } }",
      "{ a: readonly { b: number } }"
    ],
    correctAnswer: 1,
    explanation: "DeepReadonly рекурсивно применяет readonly ко всем вложенным объектам, делая все свойства readonly на всех уровнях вложенности.",
    topic: "Сложные случаи"
  },
  {
    id: 27,
    question: "Можно ли создать рекурсивный условный тип?",
    options: [
      "Нет, TypeScript не поддерживает рекурсию в типах",
      "Да, условные типы могут ссылаться на себя",
      "Только через интерфейсы",
      "Только с ограничением глубины"
    ],
    correctAnswer: 1,
    explanation: "TypeScript поддерживает рекурсивные условные типы, что позволяет создавать типы для работы с глубоко вложенными структурами данных.",
    topic: "Сложные случаи"
  },
  {
    id: 28,
    question: "Что выведет этот тип?\n\ntype UnionToIntersection<U> = \n  (U extends any ? (x: U) => void : never) extends \n  (x: infer I) => void ? I : never;\ntype Result = UnionToIntersection<{ a: string } | { b: number }>;",
    options: [
      "{ a: string } | { b: number }",
      "{ a: string } & { b: number }",
      "{ a: string, b: number }",
      "never"
    ],
    correctAnswer: 1,
    explanation: "UnionToIntersection — это продвинутый паттерн, который преобразует union тип в intersection, используя contravariance функций и distributive conditional types.",
    topic: "Сложные случаи"
  },
  {
    id: 29,
    question: "Что такое contravariance в контексте условных типов?",
    options: [
      "Изменение типа в обратном направлении",
      "Поведение, когда типы в позиции параметров функций работают \"наоборот\"",
      "Противоположность conditional types",
      "Способ отменить условный тип"
    ],
    correctAnswer: 1,
    explanation: "Contravariance означает, что в позиции параметров функций типы ведут себя \"наоборот\": если A extends B, то (x: B) => void extends (x: A) => void. Это используется в продвинутых паттернах типов.",
    topic: "Сложные случаи"
  },
  {
    id: 30,
    question: "Что выведет этот тип?\n\ntype IsNever<T> = [T] extends [never] ? true : false;\ntype Result = IsNever<never>;",
    options: [
      "true",
      "false",
      "never",
      "Ошибка компиляции"
    ],
    correctAnswer: 0,
    explanation: "Обёртка в кортеж [T] необходима для проверки never, так как never является пустым union и distributive conditional type не сработает. [never] extends [never] даёт true.",
    topic: "Сложные случаи"
  },

  // Комбинирование условных типов
  {
    id: 31,
    question: "Как можно вложить условные типы друг в друга?",
    options: [
      "Нельзя вкладывать условные типы",
      "Просто использовать условный тип в true или false ветке другого условного типа",
      "Только через отдельные type aliases",
      "Только через interfaces"
    ],
    correctAnswer: 1,
    explanation: "Условные типы можно вкладывать друг в друга: T extends U ? (T extends V ? X : Y) : Z. Это позволяет создавать сложную логику проверки типов.",
    topic: "Комбинирование условных типов"
  },
  {
    id: 32,
    question: "Что выведет этот тип?\n\ntype Check<T> = \n  T extends string ? 'string' :\n  T extends number ? 'number' :\n  T extends boolean ? 'boolean' : 'other';\ntype Result = Check<42>;",
    options: [
      "'string'",
      "'number'",
      "'boolean'",
      "'other'"
    ],
    correctAnswer: 1,
    explanation: "Множественные условные типы работают как цепочка if-else. 42 это number, поэтому результат 'number'.",
    topic: "Комбинирование условных типов"
  },
  {
    id: 33,
    question: "Можно ли комбинировать mapped types с conditional types?",
    options: [
      "Нет, это разные концепции",
      "Да, можно использовать conditional types внутри mapped types",
      "Только в обратном порядке",
      "Только с union типами"
    ],
    correctAnswer: 1,
    explanation: "Mapped types и conditional types прекрасно комбинируются: { [K in keyof T]: T[K] extends string ? boolean : T[K] }. Это позволяет создавать сложные трансформации типов.",
    topic: "Комбинирование условных типов"
  },
  {
    id: 34,
    question: "Что выведет этот тип?\n\ntype Readonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? Readonly<T[K]> : T[K]\n};\ntype Result = Readonly<{ a: string, b: { c: number } }>;",
    options: [
      "{ readonly a: string, readonly b: { c: number } }",
      "{ readonly a: string, readonly b: { readonly c: number } }",
      "{ a: string, b: { c: number } }",
      "readonly { a: string, b: { c: number } }"
    ],
    correctAnswer: 1,
    explanation: "Комбинация mapped и conditional types позволяет рекурсивно применять readonly: примитивы остаются как есть, а объекты обрабатываются рекурсивно.",
    topic: "Комбинирование условных типов"
  },
  {
    id: 35,
    question: "Как работают conditional types с template literal types?",
    options: [
      "Не работают вместе",
      "Можно проверять template literal patterns с помощью extends",
      "Только для string типов",
      "Только в TypeScript 5.0+"
    ],
    correctAnswer: 1,
    explanation: "Conditional types могут проверять template literal patterns: T extends `prefix-${infer Rest}` ? Rest : never. Это позволяет разбирать и извлекать части строковых типов.",
    topic: "Комбинирование условных типов"
  },

  // Ограничения и особенности
  {
    id: 36,
    question: "Есть ли ограничение на глубину рекурсии в условных типах?",
    options: [
      "Нет ограничений",
      "Да, TypeScript имеет ограничение на глубину рекурсии типов",
      "Ограничение только для production builds",
      "Ограничение зависит от версии TypeScript"
    ],
    correctAnswer: 1,
    explanation: "TypeScript имеет ограничение на глубину рекурсии типов (обычно около 50 уровней) для предотвращения бесконечных циклов и проблем с производительностью компилятора.",
    topic: "Ограничения и особенности"
  },
  {
    id: 37,
    question: "Что происходит при циклической зависимости в условных типах?",
    options: [
      "TypeScript автоматически разрешает цикл",
      "TypeScript выдаёт ошибку 'Type instantiation is excessively deep'",
      "Компилятор зависает",
      "Тип становится any"
    ],
    correctAnswer: 1,
    explanation: "При слишком глубокой или циклической рекурсии TypeScript выдаёт ошибку 'Type instantiation is excessively deep and possibly infinite', предотвращая зависание компилятора.",
    topic: "Ограничения и особенности"
  },
  {
    id: 38,
    question: "Как условные типы влияют на производительность компиляции?",
    options: [
      "Не влияют",
      "Сложные условные типы могут замедлять компиляцию",
      "Всегда ускоряют компиляцию",
      "Влияют только на runtime"
    ],
    correctAnswer: 1,
    explanation: "Сложные условные типы, особенно с глубокой рекурсией или множественными проверками, могут существенно замедлить компиляцию TypeScript проектов.",
    topic: "Ограничения и особенности"
  },
  {
    id: 39,
    question: "Можно ли использовать условные типы для runtime проверок?",
    options: [
      "Да, условные типы работают в runtime",
      "Нет, условные типы существуют только на этапе компиляции",
      "Только с включённым флагом runtime-types",
      "Только для примитивных типов"
    ],
    correctAnswer: 1,
    explanation: "Условные типы, как и все типы в TypeScript, существуют только на этапе компиляции и полностью стираются в runtime JavaScript коде.",
    topic: "Ограничения и особенности"
  },
  {
    id: 40,
    question: "Что произойдёт с этим типом?\n\ntype Circular<T> = T extends any ? Circular<T> : never;",
    options: [
      "Будет работать нормально",
      "Вызовет ошибку из-за бесконечной рекурсии",
      "Вернёт never",
      "Вернёт any"
    ],
    correctAnswer: 1,
    explanation: "Это пример бесконечной рекурсии в условных типах, которая вызовет ошибку 'Type instantiation is excessively deep and possibly infinite'.",
    topic: "Ограничения и особенности"
  }
]
