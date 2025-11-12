import type { Question } from '@/types/question.ts'

export const tsNarrowingQuestions: Question[] = [
  // Тема 1: Основы сужения типов
  {
    id: 1,
    question: "Что такое сужение типов (Type Narrowing) в TypeScript?",
    options: [
      "Преобразование широких типов в более узкие на основе проверок",
      "Удаление неиспользуемых типов из кода",
      "Автоматическое упрощение сложных типов",
      "Приведение типов с помощью as"
    ],
    correctAnswer: 0,
    explanation: "Type Narrowing — это процесс уточнения типа переменной в определённом блоке кода на основе проверок условий. TypeScript анализирует код и автоматически сужает тип до более конкретного.",
    topic: "Основы сужения типов"
  },
  {
    id: 2,
    question: "Какая проверка НЕ приводит к сужению типов?",
    options: [
      "typeof x === 'string'",
      "x instanceof Date",
      "x == null",
      "x + 1"
    ],
    correctAnswer: 3,
    explanation: "Выражение 'x + 1' — это операция, а не проверка условия. Она не предоставляет TypeScript информацию для сужения типа. Остальные варианты — это проверки, которые TypeScript использует для сужения.",
    topic: "Основы сужения типов"
  },
  {
    id: 3,
    question: "Что произойдет с типом после этой проверки?\n\nfunction example(x: string | number) {\n  if (typeof x === 'string') {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "string | number",
      "string",
      "number",
      "unknown"
    ],
    correctAnswer: 1,
    explanation: "После проверки typeof x === 'string' TypeScript знает, что внутри блока if переменная x может быть только строкой, поэтому тип сужается до string.",
    topic: "Основы сужения типов"
  },
  {
    id: 4,
    question: "Как TypeScript определяет тип в блоке else после проверки typeof?",
    options: [
      "Тип остается union",
      "Тип становится unknown",
      "Тип сужается до оставшихся вариантов union",
      "TypeScript не может определить тип в else"
    ],
    correctAnswer: 2,
    explanation: "В блоке else TypeScript исключает проверенный тип и сужает до оставшихся вариантов. Например, если проверили typeof x === 'string' для string | number, то в else будет number.",
    topic: "Основы сужения типов"
  },
  {
    id: 5,
    question: "Что такое 'control flow analysis' в контексте сужения типов?",
    options: [
      "Анализ производительности кода",
      "Анализ потока управления для отслеживания типов",
      "Проверка циклических зависимостей",
      "Оптимизация условных операторов"
    ],
    correctAnswer: 1,
    explanation: "Control flow analysis — это анализ потока управления программы, который TypeScript использует для отслеживания того, как типы изменяются в разных ветках кода.",
    topic: "Основы сужения типов"
  },

  // Тема 2: typeof guards
  {
    id: 6,
    question: "Какие примитивные типы можно проверить с помощью typeof?",
    options: [
      "Только string и number",
      "string, number, boolean, symbol, undefined, function",
      "Все типы, включая null",
      "Только string, number и boolean"
    ],
    correctAnswer: 1,
    explanation: "typeof может различать: 'string', 'number', 'boolean', 'symbol', 'undefined', 'function', 'object', 'bigint'. Однако typeof null === 'object' из-за исторической ошибки JavaScript.",
    topic: "typeof guards"
  },
  {
    id: 7,
    question: "Что вернет typeof null?",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'empty'"
    ],
    correctAnswer: 2,
    explanation: "typeof null возвращает 'object' — это известная ошибка в JavaScript, которая сохранена для обратной совместимости. Для проверки null нужно использовать x === null.",
    topic: "typeof guards"
  },
  {
    id: 8,
    question: "Какой тип будет у x после этой проверки?\n\nfunction test(x: string | number | boolean) {\n  if (typeof x === 'number') {\n    return;\n  }\n  // Какой тип у x здесь?\n}",
    options: [
      "string | number | boolean",
      "string | boolean",
      "number",
      "string"
    ],
    correctAnswer: 1,
    explanation: "После проверки и раннего выхода (return) TypeScript исключает number из union типа, оставляя string | boolean для оставшегося кода.",
    topic: "typeof guards"
  },
  {
    id: 9,
    question: "Можно ли использовать typeof для проверки массивов?",
    options: [
      "Да, typeof [] === 'array'",
      "Нет, typeof [] === 'object'",
      "Да, но только для пустых массивов",
      "Да, typeof [] === 'Array'"
    ],
    correctAnswer: 1,
    explanation: "typeof для массива возвращает 'object'. Для проверки массивов нужно использовать Array.isArray() или instanceof Array.",
    topic: "typeof guards"
  },
  {
    id: 10,
    question: "Что произойдет с типом после множественных typeof проверок?\n\nfunction test(x: string | number | boolean | null) {\n  if (typeof x === 'string') return;\n  if (typeof x === 'number') return;\n  // Какой тип у x здесь?\n}",
    options: [
      "boolean | null",
      "string | number",
      "boolean",
      "null"
    ],
    correctAnswer: 0,
    explanation: "TypeScript отслеживает все проверки и ранние выходы. После исключения string и number остаются только boolean | null.",
    topic: "typeof guards"
  },

  // Тема 3: Truthiness narrowing
  {
    id: 11,
    question: "Что такое truthiness narrowing?",
    options: [
      "Проверка булевых значений",
      "Сужение типов на основе проверки значения в булевом контексте",
      "Преобразование типов к boolean",
      "Проверка истинности математических выражений"
    ],
    correctAnswer: 1,
    explanation: "Truthiness narrowing — это сужение типов на основе проверки значения в булевом контексте (if, &&, ||, !). TypeScript использует это для исключения falsy значений.",
    topic: "Truthiness narrowing"
  },
  {
    id: 12,
    question: "Какие значения считаются falsy в JavaScript?",
    options: [
      "false, null, undefined",
      "false, 0, '', null, undefined, NaN",
      "false, 0, null",
      "false, null, undefined, [], {}"
    ],
    correctAnswer: 1,
    explanation: "Falsy значения в JavaScript: false, 0, -0, 0n, '', null, undefined, NaN. Все остальные значения, включая пустые массивы и объекты, являются truthy.",
    topic: "Truthiness narrowing"
  },
  {
    id: 13,
    question: "Что произойдет с типом после этой проверки?\n\nfunction test(x: string | null) {\n  if (x) {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "string | null",
      "string",
      "string | ''",
      "truthy"
    ],
    correctAnswer: 1,
    explanation: "После проверки if (x) TypeScript исключает null (falsy значение), но также исключает пустую строку. Однако тип остается string, так как TypeScript не различает пустые и непустые строки в системе типов.",
    topic: "Truthiness narrowing"
  },
  {
    id: 14,
    question: "Какая проблема может возникнуть при использовании truthiness для чисел?\n\nfunction test(x: number | null) {\n  if (x) {\n    // x может быть 0?\n  }\n}",
    options: [
      "Никакой проблемы нет",
      "0 тоже будет исключен, хотя это валидное число",
      "Код не скомпилируется",
      "TypeScript выдаст предупреждение"
    ],
    correctAnswer: 1,
    explanation: "При использовании if (x) для числа 0 будет считаться falsy и код в блоке if не выполнится. Для чисел лучше использовать явную проверку x !== null.",
    topic: "Truthiness narrowing"
  },
  {
    id: 15,
    question: "Как правильно проверить, что строка не пустая и не null?\n\nfunction test(x: string | null) {\n  // ???\n}",
    options: [
      "if (x)",
      "if (x !== null)",
      "if (x && x.length > 0)",
      "if (typeof x === 'string')"
    ],
    correctAnswer: 2,
    explanation: "Проверка if (x && x.length > 0) гарантирует, что x не null/undefined и не пустая строка. Простой if (x) исключит null, но пропустит пустую строку.",
    topic: "Truthiness narrowing"
  },

  // Тема 4: Equality narrowing
  {
    id: 16,
    question: "Какая проверка лучше всего подходит для сужения типов при сравнении с null/undefined?",
    options: [
      "x === null",
      "x == null",
      "!x",
      "typeof x === 'undefined'"
    ],
    correctAnswer: 1,
    explanation: "Проверка x == null (нестрогое равенство) проверяет одновременно null и undefined, так как null == undefined === true. Это удобно для сужения типа, исключающего оба значения.",
    topic: "Equality narrowing"
  },
  {
    id: 17,
    question: "Что произойдет с типом после этой проверки?\n\nfunction test(x: string | number, y: string | boolean) {\n  if (x === y) {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "string | number",
      "string",
      "number",
      "string | boolean"
    ],
    correctAnswer: 1,
    explanation: "TypeScript понимает, что если x === y, то x и y должны иметь общий тип из их union типов. Единственный общий тип — это string.",
    topic: "Equality narrowing"
  },
  {
    id: 18,
    question: "Как работает сужение типов при сравнении с литералом?\n\nfunction test(x: 'a' | 'b' | 'c') {\n  if (x === 'a') {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "'a' | 'b' | 'c'",
      "'a'",
      "string",
      "'b' | 'c'"
    ],
    correctAnswer: 1,
    explanation: "После проверки x === 'a' TypeScript знает, что x может быть только литералом 'a', поэтому тип сужается до этого единственного литерального типа.",
    topic: "Equality narrowing"
  },
  {
    id: 19,
    question: "Что произойдет с типом после !== проверки?\n\nfunction test(x: string | number | null) {\n  if (x !== null) {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "string | number | null",
      "string | number",
      "string",
      "number"
    ],
    correctAnswer: 1,
    explanation: "После проверки x !== null TypeScript исключает null из union типа, оставляя string | number.",
    topic: "Equality narrowing"
  },
  {
    id: 20,
    question: "Можно ли использовать switch для сужения типов?",
    options: [
      "Нет, switch не поддерживает сужение типов",
      "Да, TypeScript сужает типы в каждом case",
      "Да, но только для примитивных типов",
      "Да, но только с использованием default"
    ],
    correctAnswer: 1,
    explanation: "TypeScript поддерживает сужение типов в switch операторе. В каждом case блоке тип сужается до соответствующего литерала или подтипа.",
    topic: "Equality narrowing"
  },

  // Тема 5: in operator narrowing
  {
    id: 21,
    question: "Как работает оператор in для сужения типов?",
    options: [
      "Проверяет наличие свойства в объекте и сужает тип",
      "Проверяет вхождение элемента в массив",
      "Проверяет наследование типов",
      "Проверяет равенство типов"
    ],
    correctAnswer: 0,
    explanation: "Оператор in проверяет наличие свойства в объекте. TypeScript использует эту проверку для сужения union типов до типа, который содержит это свойство.",
    topic: "in operator narrowing"
  },
  {
    id: 22,
    question: "Что произойдет с типом после этой проверки?\n\ntype Cat = { meow: () => void };\ntype Dog = { bark: () => void };\n\nfunction test(animal: Cat | Dog) {\n  if ('meow' in animal) {\n    // Какой тип у animal здесь?\n  }\n}",
    options: [
      "Cat | Dog",
      "Cat",
      "Dog",
      "{ meow: () => void }"
    ],
    correctAnswer: 1,
    explanation: "После проверки 'meow' in animal TypeScript знает, что animal должен иметь свойство meow, что соответствует только типу Cat.",
    topic: "in operator narrowing"
  },
  {
    id: 23,
    question: "Можно ли использовать in с опциональными свойствами для сужения типов?",
    options: [
      "Нет, in не работает с опциональными свойствами",
      "Да, но только если свойство определено",
      "Да, TypeScript сужает тип, но свойство может быть undefined",
      "Да, и свойство гарантировано не undefined"
    ],
    correctAnswer: 2,
    explanation: "Оператор in проверяет наличие свойства в объекте, даже если оно undefined. После проверки 'prop' in obj TypeScript знает, что свойство существует, но оно все еще может быть undefined.",
    topic: "in operator narrowing"
  },
  {
    id: 24,
    question: "Какое ограничение есть у оператора in при сужении типов?",
    options: [
      "Не работает с вложенными объектами",
      "Не различает собственные и унаследованные свойства",
      "Работает только с string свойствами",
      "Не работает в strict режиме"
    ],
    correctAnswer: 1,
    explanation: "Оператор in проверяет наличие свойства во всей цепочке прототипов, не различая собственные и унаследованные свойства. Для проверки только собственных свойств используйте hasOwnProperty.",
    topic: "in operator narrowing"
  },

  // Тема 6: instanceof narrowing
  {
    id: 25,
    question: "Для чего используется instanceof в контексте сужения типов?",
    options: [
      "Для проверки равенства экземпляров",
      "Для проверки принадлежности объекта к классу и сужения типа",
      "Для создания экземпляров класса",
      "Для копирования объектов"
    ],
    correctAnswer: 1,
    explanation: "Оператор instanceof проверяет, является ли объект экземпляром определенного класса (или его наследником). TypeScript использует это для сужения типа до проверяемого класса.",
    topic: "instanceof narrowing"
  },
  {
    id: 26,
    question: "Что произойдет с типом после этой проверки?\n\nfunction test(x: Date | string) {\n  if (x instanceof Date) {\n    // Какой тип у x здесь?\n  }\n}",
    options: [
      "Date | string",
      "Date",
      "string",
      "Object"
    ],
    correctAnswer: 1,
    explanation: "После проверки x instanceof Date TypeScript знает, что x является экземпляром Date, поэтому тип сужается до Date.",
    topic: "instanceof narrowing"
  },
  {
    id: 27,
    question: "Работает ли instanceof с интерфейсами?",
    options: [
      "Да, так же как с классами",
      "Нет, интерфейсы исчезают после компиляции",
      "Да, но только в strict режиме",
      "Да, но нужно использовать специальный синтаксис"
    ],
    correctAnswer: 1,
    explanation: "instanceof не работает с интерфейсами, так как интерфейсы TypeScript существуют только во время компиляции и не создают runtime код. Для интерфейсов используйте type guards или оператор in.",
    topic: "instanceof narrowing"
  },
  {
    id: 28,
    question: "Можно ли использовать instanceof для проверки примитивных типов?",
    options: [
      "Да, для всех примитивов",
      "Нет, instanceof работает только с объектами",
      "Да, но только для String, Number, Boolean",
      "Да, но нужно использовать обертки"
    ],
    correctAnswer: 1,
    explanation: "instanceof работает только с объектами и проверяет цепочку прототипов. Для примитивных типов используйте typeof. Примечание: 'str' instanceof String === false, но new String('str') instanceof String === true.",
    topic: "instanceof narrowing"
  },
  {
    id: 29,
    question: "Что произойдет с типом в блоке else после instanceof?\n\nfunction test(x: Error | string) {\n  if (x instanceof Error) {\n    return;\n  }\n  // Какой тип у x здесь?\n}",
    options: [
      "Error | string",
      "Error",
      "string",
      "unknown"
    ],
    correctAnswer: 2,
    explanation: "После проверки и раннего выхода TypeScript исключает Error из union типа, оставляя только string.",
    topic: "instanceof narrowing"
  },

  // Тема 7: Type predicates (пользовательские type guards)
  {
    id: 30,
    question: "Что такое type predicate в TypeScript?",
    options: [
      "Функция, которая предсказывает тип",
      "Функция с возвращаемым типом 'value is Type' для сужения типов",
      "Специальный тип данных",
      "Утилитный тип TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Type predicate — это функция с возвращаемым типом формы 'parameterName is Type', которая сообщает TypeScript, что если функция вернет true, то параметр имеет указанный тип.",
    topic: "Type predicates"
  },
  {
    id: 31,
    question: "Как правильно объявить type guard функцию?\n\nfunction isString(value: unknown): ??? {\n  return typeof value === 'string';\n}",
    options: [
      "boolean",
      "value is string",
      "string",
      "value === string"
    ],
    correctAnswer: 1,
    explanation: "Правильный возвращаемый тип для type guard — это 'value is string'. Это сообщает TypeScript, что если функция вернет true, то value является строкой.",
    topic: "Type predicates"
  },
  {
    id: 32,
    question: "Что произойдет, если type guard функция вернет неправильный тип?\n\nfunction isFish(pet: Fish | Bird): pet is Fish {\n  return (pet as Fish).swim !== undefined; // неправильная проверка\n}",
    options: [
      "TypeScript выдаст ошибку компиляции",
      "Код скомпилируется, но может привести к runtime ошибкам",
      "TypeScript автоматически исправит проверку",
      "Функция не будет работать как type guard"
    ],
    correctAnswer: 1,
    explanation: "TypeScript доверяет разработчику в реализации type guard. Если логика проверки неверна, код скомпилируется, но типы будут неправильно сужены, что может привести к runtime ошибкам.",
    topic: "Type predicates"
  },
  {
    id: 33,
    question: "Можно ли использовать type predicate с утверждениями (assertions)?",
    options: [
      "Нет, это разные концепции",
      "Да, используя 'asserts value is Type'",
      "Да, используя 'value as Type'",
      "Да, но только в strict режиме"
    ],
    correctAnswer: 1,
    explanation: "TypeScript поддерживает assertion signatures вида 'asserts value is Type'. Если такая функция не выбрасывает ошибку, TypeScript считает, что значение имеет указанный тип после вызова функции.",
    topic: "Type predicates"
  },
  {
    id: 34,
    question: "В чем разница между 'value is Type' и 'asserts value is Type'?",
    options: [
      "Никакой разницы нет",
      "'is' возвращает boolean, 'asserts' выбрасывает ошибку при false",
      "'asserts' работает быстрее",
      "'is' работает только с примитивами"
    ],
    correctAnswer: 1,
    explanation: "'value is Type' возвращает boolean и сужает тип в блоке if. 'asserts value is Type' не возвращает значение, но если функция не выбросила ошибку, TypeScript сужает тип после вызова функции.",
    topic: "Type predicates"
  },

  // Тема 8: Discriminated unions
  {
    id: 35,
    question: "Что такое discriminated union (размеченное объединение)?",
    options: [
      "Объединение типов с общим литеральным свойством для различения",
      "Специальный тип TypeScript",
      "Объединение классов",
      "Тип для работы с множествами"
    ],
    correctAnswer: 0,
    explanation: "Discriminated union — это pattern, где каждый тип в union имеет общее свойство с литеральным типом (обычно называется 'type' или 'kind'), которое используется для различения типов.",
    topic: "Discriminated unions"
  },
  {
    id: 36,
    question: "Какое свойство обычно используется как discriminant (различитель)?\n\ntype Circle = { kind: 'circle', radius: number };\ntype Square = { kind: 'square', side: number };",
    options: [
      "radius",
      "side",
      "kind",
      "type"
    ],
    correctAnswer: 2,
    explanation: "В этом примере 'kind' — это discriminant свойство. Оно имеет литеральные типы ('circle' и 'square'), которые позволяют TypeScript различать типы в union.",
    topic: "Discriminated unions"
  },
  {
    id: 37,
    question: "Что произойдет с типом после проверки discriminant?\n\ntype Shape = Circle | Square;\n\nfunction area(shape: Shape) {\n  if (shape.kind === 'circle') {\n    // Какой тип у shape здесь?\n  }\n}",
    options: [
      "Shape",
      "Circle",
      "Square",
      "{ kind: 'circle' }"
    ],
    correctAnswer: 1,
    explanation: "После проверки shape.kind === 'circle' TypeScript знает, что shape может быть только типом Circle, так как только этот тип имеет kind со значением 'circle'.",
    topic: "Discriminated unions"
  },
  {
    id: 38,
    question: "Какое преимущество дает exhaustiveness checking в discriminated unions?",
    options: [
      "Улучшает производительность",
      "Гарантирует обработку всех вариантов union",
      "Уменьшает размер кода",
      "Упрощает рефакторинг"
    ],
    correctAnswer: 1,
    explanation: "Exhaustiveness checking гарантирует, что все варианты discriminated union обработаны. Если добавить новый тип в union, TypeScript выдаст ошибку, если он не обработан.",
    topic: "Discriminated unions"
  },
  {
    id: 39,
    question: "Как реализовать exhaustiveness checking?\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case 'circle': return Math.PI * shape.radius ** 2;\n    case 'square': return shape.side ** 2;\n    // Что добавить сюда?\n  }\n}",
    options: [
      "default: throw new Error()",
      "default: const _: never = shape",
      "default: return 0",
      "Ничего не нужно"
    ],
    correctAnswer: 1,
    explanation: "Паттерн 'const _: never = shape' в default случае создает exhaustiveness check. Если shape не был обработан в предыдущих case, TypeScript выдаст ошибку, так как shape не может быть присвоен типу never.",
    topic: "Discriminated unions"
  },
  {
    id: 40,
    question: "Можно ли использовать несколько свойств как discriminants?",
    options: [
      "Нет, только одно свойство может быть discriminant",
      "Да, можно использовать комбинацию свойств",
      "Да, но только в strict режиме",
      "Да, но только для интерфейсов"
    ],
    correctAnswer: 1,
    explanation: "Можно использовать комбинацию свойств для более точного различения типов. TypeScript будет сужать тип на основе всех проверенных свойств.",
    topic: "Discriminated unions"
  }
]
