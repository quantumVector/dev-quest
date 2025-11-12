import type { Question } from '@/types/question.ts'

export const typescriptTypesQuestions: Question[] = [
  // Тема 1: Примитивные типы
  {
    id: 1,
    question: "Какие примитивные типы данных существуют в TypeScript?",
    options: [
      "string, number, boolean",
      "string, number, boolean, null, undefined, symbol, bigint",
      "string, number, boolean, object, array",
      "string, number, boolean, any, unknown"
    ],
    correctAnswer: 1,
    explanation: "В TypeScript есть 7 примитивных типов: string, number, boolean, null, undefined, symbol и bigint. Эти типы соответствуют примитивам JavaScript.",
    topic: "Примитивные типы"
  },
  {
    id: 2,
    question: "В чем разница между типами null и undefined в TypeScript?",
    options: [
      "Никакой разницы нет",
      "null - отсутствие значения, undefined - неинициализированная переменная",
      "null используется только для объектов",
      "undefined - это ошибка, null - корректное значение"
    ],
    correctAnswer: 1,
    explanation: "null явно указывает на отсутствие значения, а undefined означает, что переменная объявлена, но не инициализирована. В TypeScript это разные типы.",
    topic: "Примитивные типы"
  },
  {
    id: 3,
    question: "Что такое тип void в TypeScript?",
    options: [
      "Тип для пустых объектов",
      "Тип для функций, которые ничего не возвращают",
      "Тип для null значений",
      "Синоним типа undefined"
    ],
    correctAnswer: 1,
    explanation: "void используется для обозначения функций, которые не возвращают значение. Функция с void может вернуть undefined, но чаще всего не имеет return.",
    topic: "Примитивные типы"
  },
  {
    id: 4,
    question: "Какое значение можно присвоить переменной типа never?",
    options: [
      "null или undefined",
      "Любое значение",
      "Никакое значение - never означает невозможность существования значения",
      "Только пустой объект"
    ],
    correctAnswer: 2,
    explanation: "never представляет тип значений, которые никогда не возникают. Это тип для функций, которые никогда не возвращают управление (выбрасывают ошибку или бесконечный цикл).",
    topic: "Примитивные типы"
  },
  {
    id: 5,
    question: "В чем разница между типами any и unknown?",
    options: [
      "Никакой разницы нет",
      "any отключает проверку типов, unknown требует проверки типа перед использованием",
      "unknown - это устаревший any",
      "any безопаснее unknown"
    ],
    correctAnswer: 1,
    explanation: "any полностью отключает проверку типов и позволяет делать любые операции. unknown - безопасная альтернатива, требующая проверки типа (type guard) перед использованием.",
    topic: "Примитивные типы"
  },
  {
    id: 6,
    question: "Что выведет TypeScript компилятор для этого кода?\n\nlet x: number = '5';",
    options: [
      "Код скомпилируется без ошибок",
      "Ошибка: Type 'string' is not assignable to type 'number'",
      "Предупреждение, но код скомпилируется",
      "Автоматическое преобразование типа"
    ],
    correctAnswer: 1,
    explanation: "TypeScript строго типизирован и не позволяет присваивать значение типа string переменной типа number без явного преобразования.",
    topic: "Примитивные типы"
  },

  // Тема 2: Объектные типы
  {
    id: 7,
    question: "Как правильно описать тип объекта в TypeScript?",
    options: [
      "object { name: string }",
      "{ name: string }",
      "Object<name: string>",
      "type { name: string }"
    ],
    correctAnswer: 1,
    explanation: "Объектные типы описываются фигурными скобками с перечислением свойств и их типов: { name: string, age: number }.",
    topic: "Объектные типы"
  },
  {
    id: 8,
    question: "Что означает знак ? в типе объекта: { name?: string }?",
    options: [
      "Свойство обязательное",
      "Свойство опциональное (может отсутствовать)",
      "Свойство может быть только string",
      "Это синтаксическая ошибка"
    ],
    correctAnswer: 1,
    explanation: "Модификатор ? делает свойство опциональным. Такое свойство может отсутствовать в объекте или иметь значение undefined.",
    topic: "Объектные типы"
  },
  {
    id: 9,
    question: "Что означает readonly в типе: { readonly id: number }?",
    options: [
      "Свойство можно читать, но нельзя изменять после инициализации",
      "Свойство скрыто от внешнего доступа",
      "Свойство защищено от удаления",
      "Свойство доступно только для чтения в методах класса"
    ],
    correctAnswer: 0,
    explanation: "readonly делает свойство доступным только для чтения. После инициализации объекта это свойство нельзя изменить.",
    topic: "Объектные типы"
  },
  {
    id: 10,
    question: "Как описать тип объекта с динамическими ключами?",
    options: [
      "{ [key: any]: string }",
      "{ [key: string]: string }",
      "{ dynamic: string }",
      "{ ...key: string }"
    ],
    correctAnswer: 1,
    explanation: "Index signature [key: string]: тип позволяет описать объект с любыми строковыми ключами. Например: { [key: string]: number } для объекта-словаря.",
    topic: "Объектные типы"
  },

  // Тема 3: Массивы и кортежи
  {
    id: 11,
    question: "Какие способы объявления типа массива корректны в TypeScript?",
    options: [
      "Только number[]",
      "number[] или Array<number>",
      "Только Array<number>",
      "[number]"
    ],
    correctAnswer: 1,
    explanation: "В TypeScript есть два синтаксиса для массивов: number[] (предпочтительный) и Array<number> (generic-синтаксис). Оба валидны.",
    topic: "Массивы и кортежи"
  },
  {
    id: 12,
    question: "Что такое кортеж (tuple) в TypeScript?",
    options: [
      "Массив фиксированной длины с известными типами для каждой позиции",
      "Обычный массив",
      "Объект с числовыми ключами",
      "Массив только из примитивных типов"
    ],
    correctAnswer: 0,
    explanation: "Tuple - это массив фиксированной длины, где тип каждого элемента известен на своей позиции. Например: [string, number, boolean].",
    topic: "Массивы и кортежи"
  },
  {
    id: 13,
    question: "Что выведет TypeScript для этого кода?\n\nconst tuple: [string, number] = ['hello', 42, true];",
    options: [
      "Код корректен",
      "Ошибка: tuple имеет больше элементов, чем объявлено в типе",
      "Автоматическое расширение типа",
      "Предупреждение, но код скомпилируется"
    ],
    correctAnswer: 1,
    explanation: "Tuple строго определяет длину и типы. Попытка добавить лишний элемент вызовет ошибку типизации.",
    topic: "Массивы и кортежи"
  },
  {
    id: 14,
    question: "Как сделать элементы tuple опциональными?",
    options: [
      "type Tuple = [string, number?]",
      "type Tuple = [string | undefined, number | undefined]",
      "type Tuple = [string?, number?]",
      "Нельзя сделать опциональными"
    ],
    correctAnswer: 0,
    explanation: "В tuple можно использовать ? для опциональных элементов: [string, number?]. Опциональные элементы могут быть только в конце.",
    topic: "Массивы и кортежи"
  },
  {
    id: 15,
    question: "Что такое rest-элементы в tuple?",
    options: [
      "Элементы, которые идут после основных",
      "Возможность указать переменное количество элементов одного типа: [string, ...number[]]",
      "Устаревший синтаксис",
      "Элементы для отдыха"
    ],
    correctAnswer: 1,
    explanation: "Rest-элементы (...type[]) позволяют указать переменное количество элементов определенного типа в конце tuple: [string, ...number[]].",
    topic: "Массивы и кортежи"
  },

  // Тема 4: Union и Intersection типы
  {
    id: 16,
    question: "Что означает union type (объединение типов)?",
    options: [
      "Тип, который может быть одним из нескольких указанных типов",
      "Объединение свойств нескольких типов",
      "Пересечение типов",
      "Наследование типов"
    ],
    correctAnswer: 0,
    explanation: "Union type (string | number) означает, что значение может быть либо string, либо number, либо любым из перечисленных типов.",
    topic: "Union и Intersection"
  },
  {
    id: 17,
    question: "Что означает intersection type (пересечение типов)?",
    options: [
      "Тип может быть одним из нескольких",
      "Тип должен содержать все свойства всех перечисленных типов",
      "Общие свойства типов",
      "Устаревший синтаксис"
    ],
    correctAnswer: 1,
    explanation: "Intersection type (A & B) создает тип, содержащий все свойства типов A и B. Объект должен соответствовать обоим типам одновременно.",
    topic: "Union и Intersection"
  },
  {
    id: 18,
    question: "Какой тип получится из: type A = string & number?",
    options: [
      "string | number",
      "any",
      "never",
      "unknown"
    ],
    correctAnswer: 2,
    explanation: "Пересечение несовместимых примитивных типов даёт never, так как не может существовать значение, которое одновременно является и string, и number.",
    topic: "Union и Intersection"
  },
  {
    id: 19,
    question: "Что такое discriminated union (размеченное объединение)?",
    options: [
      "Обычный union type",
      "Union type с общим литеральным свойством для различения вариантов",
      "Intersection type",
      "Устаревшая возможность"
    ],
    correctAnswer: 1,
    explanation: "Discriminated union - это паттерн, где каждый тип в union имеет общее свойство-дискриминатор (обычно 'type' или 'kind') с литеральным значением для различения вариантов.",
    topic: "Union и Intersection"
  },
  {
    id: 20,
    question: "Можно ли использовать методы строки для переменной типа string | number без проверки?",
    options: [
      "Да, TypeScript автоматически выберет правильный тип",
      "Нет, нужно сначала сузить тип (type narrowing)",
      "Да, но будет предупреждение",
      "Можно только для методов, общих для обоих типов"
    ],
    correctAnswer: 1,
    explanation: "Для union type TypeScript позволяет использовать только общие для всех типов свойства и методы. Для специфичных нужно сузить тип через type guard.",
    topic: "Union и Intersection"
  },

  // Тема 5: Literal типы
  {
    id: 21,
    question: "Что такое literal type (литеральный тип)?",
    options: [
      "Тип, принимающий только конкретное значение",
      "Тип для литералов объектов",
      "Примитивный тип",
      "Тип для констант"
    ],
    correctAnswer: 0,
    explanation: "Literal type - это тип, который может содержать только одно конкретное значение. Например, type Yes = 'yes' может содержать только строку 'yes'.",
    topic: "Literal типы"
  },
  {
    id: 22,
    question: "В чем разница между let x = 'hello' и const x = 'hello' с точки зрения типизации?",
    options: [
      "Никакой разницы",
      "let имеет тип string, const имеет literal тип 'hello'",
      "const имеет тип string, let имеет any",
      "Оба имеют тип any"
    ],
    correctAnswer: 1,
    explanation: "TypeScript выводит более узкий literal type для const (так как значение не изменится), и широкий тип для let (значение может измениться).",
    topic: "Literal типы"
  },
  {
    id: 23,
    question: "Как создать тип для набора конкретных значений?",
    options: [
      "type Status = 'pending' | 'success' | 'error'",
      "type Status = ['pending', 'success', 'error']",
      "type Status = enum('pending', 'success', 'error')",
      "type Status = string"
    ],
    correctAnswer: 0,
    explanation: "Union из literal типов создаёт тип, принимающий только указанные конкретные значения: 'pending' | 'success' | 'error'.",
    topic: "Literal типы"
  },
  {
    id: 24,
    question: "Что такое as const и для чего он используется?",
    options: [
      "Приведение к константе",
      "Утверждение, что значение должно быть воспринято как literal type и readonly",
      "Создание константного типа",
      "Устаревший синтаксис"
    ],
    correctAnswer: 1,
    explanation: "as const делает все свойства readonly и выводит максимально узкие literal типы вместо широких примитивных типов.",
    topic: "Literal типы"
  },

  // Тема 6: Enum
  {
    id: 25,
    question: "Что такое enum в TypeScript?",
    options: [
      "Массив константных значений",
      "Способ определения набора именованных константных значений",
      "Тип для чисел",
      "Синоним для union типов"
    ],
    correctAnswer: 1,
    explanation: "Enum позволяет определить набор именованных константных значений. Например: enum Direction { Up, Down, Left, Right }.",
    topic: "Enum"
  },
  {
    id: 26,
    question: "Какие значения по умолчанию имеют числовые enum?",
    options: [
      "Начинаются с 1",
      "Начинаются с 0 и увеличиваются на 1",
      "Случайные числа",
      "Undefined"
    ],
    correctAnswer: 1,
    explanation: "По умолчанию числовые enum начинаются с 0 и автоматически увеличиваются: enum E { A, B, C } // A=0, B=1, C=2.",
    topic: "Enum"
  },
  {
    id: 27,
    question: "Что такое string enum?",
    options: [
      "Enum с строковыми значениями, каждое должно быть инициализировано",
      "Enum, который конвертируется в строку",
      "Устаревший тип",
      "Enum с типом string"
    ],
    correctAnswer: 0,
    explanation: "String enum - это enum, где каждое значение явно инициализировано строкой: enum Direction { Up = 'UP', Down = 'DOWN' }.",
    topic: "Enum"
  },
  {
    id: 28,
    question: "В чем разница между enum и union из literal типов?",
    options: [
      "Никакой разницы",
      "Enum создаёт runtime объект, union типов существует только во время компиляции",
      "Union типов более производительный",
      "Enum нельзя использовать с типами"
    ],
    correctAnswer: 1,
    explanation: "Enum генерирует JavaScript объект в runtime, а union из literal типов ('a' | 'b') существует только на уровне типов и исчезает после компиляции.",
    topic: "Enum"
  },
  {
    id: 29,
    question: "Что такое const enum?",
    options: [
      "Обычный enum",
      "Enum, который полностью удаляется при компиляции (инлайнится)",
      "Enum с readonly значениями",
      "Устаревший синтаксис"
    ],
    correctAnswer: 1,
    explanation: "const enum полностью удаляется при компиляции - все его использования заменяются на конкретные значения (инлайнятся), что оптимизирует размер кода.",
    topic: "Enum"
  },
  {
    id: 30,
    question: "Можно ли получить имя enum значения по его числу?",
    options: [
      "Нет, это невозможно",
      "Да, через reverse mapping для числовых enum",
      "Только для string enum",
      "Только через специальную функцию"
    ],
    correctAnswer: 1,
    explanation: "Числовые enum имеют reverse mapping: можно получить имя по значению. enum E { A = 0 } → E[0] вернёт 'A'. String enum не имеют reverse mapping.",
    topic: "Enum"
  },

  // Тема 7: Type assertions
  {
    id: 31,
    question: "Что такое type assertion (утверждение типа)?",
    options: [
      "Автоматическое определение типа",
      "Способ явно указать TypeScript, что вы знаете тип значения лучше компилятора",
      "Проверка типа в runtime",
      "Создание нового типа"
    ],
    correctAnswer: 1,
    explanation: "Type assertion позволяет явно указать тип, когда вы уверены в типе больше, чем компилятор. Синтаксис: value as Type или <Type>value.",
    topic: "Type assertions"
  },
  {
    id: 32,
    question: "Какие синтаксисы type assertion существуют?",
    options: [
      "Только as Type",
      "as Type и <Type>value",
      "Только <Type>value",
      "type(value)"
    ],
    correctAnswer: 1,
    explanation: "Два синтаксиса: value as Type (предпочтительный, особенно в JSX) и <Type>value (не работает в JSX).",
    topic: "Type assertions"
  },
  {
    id: 33,
    question: "Проверяет ли type assertion тип в runtime?",
    options: [
      "Да, проверяет и выбрасывает ошибку",
      "Нет, это только compile-time конструкция",
      "Проверяет только в development",
      "Зависит от настроек компилятора"
    ],
    correctAnswer: 1,
    explanation: "Type assertion - это compile-time конструкция. Она не генерирует runtime проверку и полностью удаляется при компиляции.",
    topic: "Type assertions"
  },
  {
    id: 34,
    question: "Что такое non-null assertion (!))?",
    options: [
      "Утверждение, что значение точно не null и не undefined",
      "Преобразование null в undefined",
      "Проверка на null",
      "Создание nullable типа"
    ],
    correctAnswer: 0,
    explanation: "Оператор ! говорит TypeScript, что значение точно не null и не undefined: value!.method(). Используйте осторожно - это отключает проверку.",
    topic: "Type assertions"
  },
  {
    id: 35,
    question: "В каких случаях стоит избегать type assertion?",
    options: [
      "Никогда, это безопасная операция",
      "Когда тип действительно неизвестен или может не соответствовать утверждению",
      "В production коде",
      "В TypeScript strict mode"
    ],
    correctAnswer: 1,
    explanation: "Type assertion обходит проверку типов. Используйте его, только когда точно знаете тип. В остальных случаях лучше type guard или правильный вывод типов.",
    topic: "Type assertions"
  },

  // Тема 8: Type guards
  {
    id: 36,
    question: "Что такое type guard (защита типа)?",
    options: [
      "Функция для создания типов",
      "Проверка, которая сужает тип переменной в определенной области видимости",
      "Защита от изменения типа",
      "Проверка типов в runtime"
    ],
    correctAnswer: 1,
    explanation: "Type guard - это проверка (typeof, instanceof, in, custom predicate), которая позволяет TypeScript сузить union type до конкретного типа.",
    topic: "Type guards"
  },
  {
    id: 37,
    question: "Какие встроенные type guards существуют в JavaScript/TypeScript?",
    options: [
      "typeof, instanceof, in",
      "Только typeof",
      "isType()",
      "checkType()"
    ],
    correctAnswer: 0,
    explanation: "Встроенные type guards: typeof (для примитивов), instanceof (для классов), in (для проверки свойств в объекте).",
    topic: "Type guards"
  },
  {
    id: 38,
    question: "Что такое user-defined type guard (пользовательская защита типа)?",
    options: [
      "Обычная проверка типа",
      "Функция с типом возврата 'value is Type'",
      "Встроенная функция TypeScript",
      "Type assertion"
    ],
    correctAnswer: 1,
    explanation: "User-defined type guard - функция, возвращающая 'value is Type': function isString(x: any): x is string { return typeof x === 'string' }.",
    topic: "Type guards"
  },
  {
    id: 39,
    question: "Что произойдет после этой проверки?\n\nif (typeof x === 'string') {\n  // здесь\n}",
    options: [
      "x остается своим исходным типом",
      "TypeScript сузит тип x до string внутри блока",
      "Ошибка компиляции",
      "x становится any"
    ],
    correctAnswer: 1,
    explanation: "После успешной проверки typeof TypeScript автоматически сужает тип переменной в соответствующей области видимости (type narrowing).",
    topic: "Type guards"
  },
  {
    id: 40,
    question: "Как проверить, является ли значение массивом в TypeScript?",
    options: [
      "typeof value === 'array'",
      "Array.isArray(value)",
      "value instanceof Array",
      "Оба варианта 2 и 3 корректны"
    ],
    correctAnswer: 3,
    explanation: "Для проверки массива можно использовать Array.isArray() (предпочтительно) или instanceof Array. typeof вернет 'object' для массивов.",
    topic: "Type guards"
  }
]
