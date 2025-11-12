import type { Question } from '@/types/question.ts'

export const tsInferTypesQuestions: Question[] = [
  // Тема 1: Что такое Infer Types
  {
    id: 1,
    question: "Что такое ключевое слово infer в TypeScript?",
    options: [
      "Способ явного указания типа переменной",
      "Ключевое слово для вывода типа из условного типа",
      "Оператор для приведения типов",
      "Метод для проверки типов в runtime"
    ],
    correctAnswer: 1,
    explanation: "Ключевое слово infer используется в условных типах для вывода (извлечения) типа из более сложного типа. Оно позволяет TypeScript автоматически определить тип на основе структуры.",
    topic: "Основы Infer Types"
  },
  {
    id: 2,
    question: "Где можно использовать ключевое слово infer?",
    options: [
      "В любом месте кода TypeScript",
      "Только в условных типах (conditional types)",
      "Только в интерфейсах",
      "Только в классах"
    ],
    correctAnswer: 1,
    explanation: "infer может использоваться только внутри условных типов в extends части. Это его единственное допустимое место применения.",
    topic: "Основы Infer Types"
  },
  {
    id: 3,
    question: "Какой синтаксис правильно использует infer?",
    options: [
      "type Result<T> = infer T extends string ? T : never",
      "type Result<T> = T extends infer U ? U : never",
      "type Result<T> = T extends string ? infer U : never",
      "type Result<T> = T extends (arg: infer P) => any ? P : never"
    ],
    correctAnswer: 3,
    explanation: "infer должен использоваться в extends части условного типа для извлечения типа. Правильный синтаксис: T extends Pattern ? infer X : never, где Pattern содержит infer.",
    topic: "Основы Infer Types"
  },
  {
    id: 4,
    question: "Что выведет этот тип?\n\ntype GetReturnType<T> = T extends () => infer R ? R : never;\ntype Result = GetReturnType<() => number>;",
    options: [
      "never",
      "() => number",
      "number",
      "unknown"
    ],
    correctAnswer: 2,
    explanation: "infer R извлекает тип возвращаемого значения функции. В данном случае функция возвращает number, поэтому Result будет типом number.",
    topic: "Основы Infer Types"
  },
  {
    id: 5,
    question: "Можно ли использовать несколько infer в одном условном типе?",
    options: [
      "Нет, только один infer на условный тип",
      "Да, можно использовать несколько infer",
      "Да, но только если они в разных ветках условия",
      "Да, но только для функциональных типов"
    ],
    correctAnswer: 1,
    explanation: "В одном условном типе можно использовать несколько infer для извлечения разных типов из сложной структуры. Например: T extends (a: infer A, b: infer B) => infer R.",
    topic: "Основы Infer Types"
  },

  // Тема 2: В каких ситуациях полезно использовать Infer Types
  {
    id: 6,
    question: "Для чего чаще всего используется infer?",
    options: [
      "Для создания новых типов данных",
      "Для извлечения типов из сложных структур",
      "Для проверки типов в runtime",
      "Для оптимизации производительности"
    ],
    correctAnswer: 1,
    explanation: "infer в основном используется для извлечения (вывода) типов из сложных структур, таких как типы функций, массивов, промисов и других generic типов.",
    topic: "Применение Infer Types"
  },
  {
    id: 7,
    question: "Как извлечь тип элемента массива с помощью infer?",
    options: [
      "type ArrayElement<T> = T[number]",
      "type ArrayElement<T> = T extends Array<infer U> ? U : never",
      "type ArrayElement<T> = T extends infer U[] ? U : never",
      "type ArrayElement<T> = infer T extends U[] ? U : never"
    ],
    correctAnswer: 1,
    explanation: "Для извлечения типа элемента массива используется паттерн T extends Array<infer U> ? U : never или T extends (infer U)[] ? U : never.",
    topic: "Применение Infer Types"
  },
  {
    id: 8,
    question: "Что делает этот тип?\n\ntype UnwrapPromise<T> = T extends Promise<infer U> ? U : T;",
    options: [
      "Создает Promise из типа T",
      "Проверяет, является ли T промисом",
      "Извлекает тип из Promise или возвращает исходный тип",
      "Преобразует T в Promise"
    ],
    correctAnswer: 2,
    explanation: "Этот тип извлекает тип значения из Promise. Если T является Promise<U>, то возвращается U, иначе возвращается сам тип T.",
    topic: "Применение Infer Types"
  },
  {
    id: 9,
    question: "Как с помощью infer извлечь типы параметров функции?",
    options: [
      "type Params<T> = T extends (...args: infer P) => any ? P : never",
      "type Params<T> = T extends (infer P) => any ? P : never",
      "type Params<T> = infer P extends T ? P : never",
      "type Params<T> = T.parameters"
    ],
    correctAnswer: 0,
    explanation: "Для извлечения типов параметров функции используется паттерн T extends (...args: infer P) => any ? P : never, где P будет кортежем типов параметров.",
    topic: "Применение Infer Types"
  },
  {
    id: 10,
    question: "Что вернет этот тип?\n\ntype FirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;\ntype Result = FirstArg<(name: string, age: number) => void>;",
    options: [
      "never",
      "string",
      "[string, number]",
      "any"
    ],
    correctAnswer: 1,
    explanation: "infer F извлекает тип первого параметра функции. В данном случае первый параметр имеет тип string, поэтому Result будет string.",
    topic: "Применение Infer Types"
  },
  {
    id: 11,
    question: "Какая основная польза от использования infer при работе с библиотеками?",
    options: [
      "Улучшение производительности приложения",
      "Автоматический вывод сложных типов без явного указания",
      "Упрощение runtime проверок",
      "Уменьшение размера бандла"
    ],
    correctAnswer: 1,
    explanation: "infer позволяет автоматически выводить сложные типы из существующих типов библиотек, избегая необходимости вручную указывать или дублировать типы.",
    topic: "Применение Infer Types"
  },

  // Тема 3: Практические примеры использования
  {
    id: 12,
    question: "Что делает этот тип?\n\ntype FunctionResult<T> = T extends (...args: any[]) => infer R ? R : never;",
    options: [
      "Извлекает типы параметров функции",
      "Извлекает тип возвращаемого значения функции",
      "Проверяет, является ли T функцией",
      "Создает новую функцию с типом T"
    ],
    correctAnswer: 1,
    explanation: "Этот тип извлекает тип возвращаемого значения функции. infer R в позиции возвращаемого значения позволяет вывести этот тип.",
    topic: "Практические примеры"
  },
  {
    id: 13,
    question: "Что вернет этот тип?\n\ntype GetConstructorArgs<T> = T extends new (...args: infer P) => any ? P : never;\ntype Result = GetConstructorArgs<typeof Date>;",
    options: [
      "Date",
      "Типы параметров конструктора Date",
      "never",
      "any"
    ],
    correctAnswer: 1,
    explanation: "Этот тип извлекает типы параметров конструктора класса. Для Date это будет кортеж возможных параметров конструктора.",
    topic: "Практические примеры"
  },
  {
    id: 14,
    question: "Как извлечь тип из nested Promise?\n\ntype Awaited<T> = ?",
    options: [
      "T extends Promise<infer U> ? U : T",
      "T extends Promise<infer U> ? Awaited<U> : T",
      "T extends Promise<any> ? T : never",
      "infer U extends Promise<T> ? U : T"
    ],
    correctAnswer: 1,
    explanation: "Для извлечения типа из вложенных промисов используется рекурсивный подход: T extends Promise<infer U> ? Awaited<U> : T, который будет разворачивать Promise до базового типа.",
    topic: "Практические примеры"
  },
  {
    id: 15,
    question: "Что делает этот тип?\n\ntype Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;",
    options: [
      "Создает многомерный массив",
      "Рекурсивно извлекает тип элемента из вложенных массивов",
      "Проверяет, является ли T массивом",
      "Преобразует T в массив"
    ],
    correctAnswer: 1,
    explanation: "Этот тип рекурсивно извлекает тип элемента из вложенных массивов. Например, Flatten<number[][]> вернет number.",
    topic: "Практические примеры"
  },
  {
    id: 16,
    question: "Как извлечь тип значения из объекта по ключу с помощью infer?",
    options: [
      "type GetValue<T, K> = T[K]",
      "type GetValue<T, K> = T extends { [key in K]: infer V } ? V : never",
      "type GetValue<T, K> = T extends Record<K, infer V> ? V : never",
      "Оба варианта B и C верны"
    ],
    correctAnswer: 3,
    explanation: "Оба подхода работают для извлечения типа значения. Однако проще использовать индексный доступ T[K]. infer полезен для более сложных паттернов.",
    topic: "Практические примеры"
  },
  {
    id: 17,
    question: "Что вернет этот тип?\n\ntype Last<T extends any[]> = T extends [...any[], infer L] ? L : never;\ntype Result = Last<[string, number, boolean]>;",
    options: [
      "string",
      "never",
      "boolean",
      "[string, number, boolean]"
    ],
    correctAnswer: 2,
    explanation: "infer L в конце кортежа извлекает тип последнего элемента. В данном случае это boolean.",
    topic: "Практические примеры"
  },
  {
    id: 18,
    question: "Как с помощью infer создать тип, который извлекает тип this из метода класса?",
    options: [
      "type ThisType<T> = T extends (this: infer U, ...args: any[]) => any ? U : never",
      "type ThisType<T> = T extends (...args: any[]) => infer U ? U : never",
      "type ThisType<T> = infer U extends T ? U : never",
      "Невозможно извлечь тип this"
    ],
    correctAnswer: 0,
    explanation: "Для извлечения типа this из функции используется паттерн T extends (this: infer U, ...args: any[]) => any ? U : never.",
    topic: "Практические примеры"
  },

  // Тема 4: Продвинутые паттерны с infer
  {
    id: 19,
    question: "Что произойдет, если infer используется несколько раз с одним и тем же именем типа?",
    options: [
      "Ошибка компиляции",
      "TypeScript создаст union всех возможных типов",
      "Будет использован только первый infer",
      "Будет использован только последний infer"
    ],
    correctAnswer: 1,
    explanation: "Если infer используется несколько раз с одним именем, TypeScript создаст union type всех возможных значений для этого типа.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 20,
    question: "Что делает этот тип?\n\ntype TupleToUnion<T> = T extends Array<infer U> ? U : never;",
    options: [
      "Преобразует массив в кортеж",
      "Преобразует тип элементов массива/кортежа в union",
      "Проверяет, является ли T массивом",
      "Создает новый тип массива"
    ],
    correctAnswer: 1,
    explanation: "Этот тип извлекает все типы элементов из массива/кортежа и объединяет их в union. Например, TupleToUnion<[string, number]> вернет string | number.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 21,
    question: "Как создать тип, который извлекает ключи объекта определенного типа значения?",
    options: [
      "type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]",
      "type KeysOfType<T, V> = T extends { [key: string]: infer U } ? U : never",
      "type KeysOfType<T, V> = keyof T extends infer K ? K : never",
      "Невозможно создать такой тип"
    ],
    correctAnswer: 0,
    explanation: "Для извлечения ключей с определенным типом значения используется mapped type с условным типом. infer здесь не нужен, так как мы работаем с известными типами через keyof и индексный доступ.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 22,
    question: "Что делает этот тип?\n\ntype PromiseValue<T> = T extends Promise<infer U> ? U extends Promise<any> ? PromiseValue<U> : U : T;",
    options: [
      "Проверяет, является ли T промисом",
      "Рекурсивно извлекает тип из вложенных промисов",
      "Создает Promise из типа T",
      "Преобразует T в Promise"
    ],
    correctAnswer: 1,
    explanation: "Этот тип рекурсивно разворачивает вложенные промисы до получения базового типа. Это полезно для работы со сложными асинхронными типами.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 23,
    question: "Можно ли использовать infer с условными ограничениями?",
    options: [
      "Нет, infer не поддерживает ограничения",
      "Да, через extends: T extends (arg: infer P extends string) => any",
      "Да, но только для функций",
      "Да, но это устаревший синтаксис"
    ],
    correctAnswer: 1,
    explanation: "В TypeScript 4.7+ можно добавлять ограничения к infer через extends: infer P extends SomeType. Это позволяет более точно контролировать выводимые типы.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 24,
    question: "Что вернет этот тип?\n\ntype Head<T> = T extends [infer H, ...any[]] ? H : never;\ntype Result = Head<[]>;",
    options: [
      "undefined",
      "never",
      "any",
      "unknown"
    ],
    correctAnswer: 1,
    explanation: "Пустой массив не соответствует паттерну [infer H, ...any[]], так как в нем нет первого элемента. Поэтому возвращается never.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 25,
    question: "Как infer взаимодействует с distributive conditional types?",
    options: [
      "infer отключает дистрибутивность",
      "infer применяется к каждому члену union отдельно",
      "infer не работает с union типами",
      "infer создает intersection вместо union"
    ],
    correctAnswer: 1,
    explanation: "Когда условный тип с infer применяется к union типу, TypeScript применяет его дистрибутивно к каждому члену union отдельно, создавая union результатов.",
    topic: "Продвинутые паттерны"
  },

  // Дополнительные вопросы для углубленного понимания
  {
    id: 26,
    question: "Что делает этот utility type?\n\ntype ReturnTypeOf<T> = T extends (...args: any) => infer R ? R : any;",
    options: [
      "Это переопределение встроенного ReturnType",
      "Извлекает тип возвращаемого значения, но с fallback на any",
      "Проверяет сигнатуру функции",
      "Создает обертку над функцией"
    ],
    correctAnswer: 1,
    explanation: "Это практически встроенный ReturnType, но с fallback на any вместо never для не-функциональных типов. Встроенный ReturnType лучше, так как возвращает never для безопасности типов.",
    topic: "Utility Types с infer"
  },
  {
    id: 27,
    question: "Как извлечь тип instance из конструктора класса?",
    options: [
      "type Instance<T> = T extends new (...args: any) => infer I ? I : never",
      "type Instance<T> = T extends { prototype: infer I } ? I : never",
      "type Instance<T> = InstanceType<T>",
      "Все варианты A и C верны"
    ],
    correctAnswer: 3,
    explanation: "Можно использовать как паттерн с infer в сигнатуре конструктора, так и встроенный InstanceType<T>. Оба подхода работают корректно.",
    topic: "Utility Types с infer"
  },
  {
    id: 28,
    question: "Что произойдет в этом случае?\n\ntype Test<T> = T extends { a: infer U; b: infer U } ? U : never;\ntype Result = Test<{ a: string; b: number }>;",
    options: [
      "string",
      "number",
      "string | number",
      "never"
    ],
    correctAnswer: 2,
    explanation: "Когда один и тот же infer тип используется в нескольких позициях с разными значениями, TypeScript создает union этих типов: string | number.",
    topic: "Сложные случаи infer"
  },
  {
    id: 29,
    question: "Можно ли использовать infer в mapped types?",
    options: [
      "Да, напрямую в mapped type",
      "Нет, только в условных типах",
      "Да, но только через вложенный условный тип",
      "Да, но это deprecated функция"
    ],
    correctAnswer: 2,
    explanation: "infer можно использовать только в условных типах, но mapped types могут содержать условные типы, поэтому infer используется через вложенные условные типы внутри mapped type.",
    topic: "Сложные случаи infer"
  },
  {
    id: 30,
    question: "Что делает этот тип?\n\ntype ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;",
    options: [
      "Это переопределение встроенного ConstructorParameters",
      "Извлекает типы параметров конструктора класса",
      "Проверяет, является ли T конструктором",
      "Все варианты A и B верны"
    ],
    correctAnswer: 3,
    explanation: "Это определение встроенного utility type ConstructorParameters, который извлекает кортеж типов параметров конструктора класса.",
    topic: "Utility Types с infer"
  },
  {
    id: 31,
    question: "Как создать тип, который извлекает типы всех методов класса?",
    options: [
      "type Methods<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]",
      "type Methods<T> = { [K in keyof T]: T[K] extends (...args: any) => any ? K : never }[keyof T]",
      "type Methods<T> = T extends { [key: string]: infer M } ? M : never",
      "Оба варианта A и B верны"
    ],
    correctAnswer: 3,
    explanation: "Оба варианта работают для извлечения ключей методов. Вариант B более точный, так как Function включает больше, чем просто вызываемые функции.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 32,
    question: "Что вернет этот тип?\n\ntype Tail<T> = T extends [any, ...infer Rest] ? Rest : never;\ntype Result = Tail<[1, 2, 3, 4]>;",
    options: [
      "[1, 2, 3, 4]",
      "[2, 3, 4]",
      "never",
      "[4]"
    ],
    correctAnswer: 1,
    explanation: "infer Rest извлекает все элементы кортежа кроме первого. Для [1, 2, 3, 4] это будет [2, 3, 4].",
    topic: "Работа с кортежами"
  },
  {
    id: 33,
    question: "Можно ли использовать infer с template literal types?",
    options: [
      "Нет, infer не работает со строковыми литералами",
      "Да, например: T extends `${infer Start}world` ? Start : never",
      "Да, но только в TypeScript 5.0+",
      "Да, но это экспериментальная функция"
    ],
    correctAnswer: 1,
    explanation: "С TypeScript 4.1+ можно использовать infer с template literal types для извлечения частей строковых литеральных типов.",
    topic: "Template Literal Types с infer"
  },
  {
    id: 34,
    question: "Что делает этот тип?\n\ntype Shift<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];",
    options: [
      "Удаляет первый элемент из кортежа",
      "Удаляет последний элемент из кортежа",
      "Сдвигает все элементы влево",
      "Создает новый массив"
    ],
    correctAnswer: 0,
    explanation: "Этот тип извлекает все элементы кортежа кроме первого (операция shift). Если кортеж пустой, возвращается пустой кортеж.",
    topic: "Работа с кортежами"
  },
  {
    id: 35,
    question: "Как с помощью infer проверить, является ли тип функцией с определенным количеством параметров?",
    options: [
      "type IsBinary<T> = T extends (a: any, b: any) => any ? true : false",
      "type IsBinary<T> = T extends (...args: infer P) => any ? P['length'] extends 2 ? true : false : false",
      "type IsBinary<T> = T extends (...args: [any, any]) => any ? true : false",
      "Варианты A и C верны"
    ],
    correctAnswer: 3,
    explanation: "Можно проверить количество параметров либо явно указав их в сигнатуре, либо через кортеж. infer здесь необязателен для простой проверки.",
    topic: "Проверка типов функций"
  },
  {
    id: 36,
    question: "Что вернет этот тип?\n\ntype UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;\ntype Result = UnionToIntersection<{ a: string } | { b: number }>;",
    options: [
      "{ a: string } | { b: number }",
      "{ a: string } & { b: number }",
      "never",
      "unknown"
    ],
    correctAnswer: 1,
    explanation: "Это продвинутый паттерн для преобразования union в intersection. Он использует особенность вывода типов в contravariant позициях для создания intersection типа.",
    topic: "Продвинутые трансформации"
  },
  {
    id: 37,
    question: "Как infer ведет себя с readonly модификаторами?",
    options: [
      "infer игнорирует readonly модификаторы",
      "infer сохраняет readonly модификаторы",
      "infer преобразует readonly в mutable",
      "infer вызывает ошибку с readonly"
    ],
    correctAnswer: 1,
    explanation: "infer сохраняет все модификаторы типа, включая readonly. Если извлекается тип из readonly массива, результат также будет readonly.",
    topic: "Модификаторы типов"
  },
  {
    id: 38,
    question: "Что делает этот тип?\n\ntype PropType<T, Path extends string> = Path extends `${infer K}.${infer Rest}` ? K extends keyof T ? PropType<T[K], Rest> : never : Path extends keyof T ? T[Path] : never;",
    options: [
      "Извлекает тип свойства по пути через точку",
      "Создает новый объект с вложенными свойствами",
      "Проверяет существование свойства",
      "Преобразует строку в объект"
    ],
    correctAnswer: 0,
    explanation: "Этот тип рекурсивно извлекает тип вложенного свойства объекта по строковому пути через точку, например 'user.address.city'.",
    topic: "Работа со строковыми путями"
  },
  {
    id: 39,
    question: "Можно ли использовать default тип с infer?",
    options: [
      "Нет, такой синтаксис не поддерживается",
      "Да, через = после infer: infer R = DefaultType",
      "Да, но только в TypeScript 5.0+",
      "Да, но это экспериментальная функция"
    ],
    correctAnswer: 1,
    explanation: "С TypeScript 4.7+ можно указать default тип для infer: T extends Promise<infer U = any> ? U : T. Если вывод невозможен, будет использован default тип.",
    topic: "Default типы с infer"
  },
  {
    id: 40,
    question: "Что произойдет с этим типом?\n\ntype Test<T> = T extends Array<infer U extends number> ? U : never;\ntype Result = Test<string[]>;",
    options: [
      "string",
      "number",
      "never",
      "unknown"
    ],
    correctAnswer: 2,
    explanation: "Ограничение infer U extends number требует, чтобы элементы массива были числами. string[] не соответствует этому ограничению, поэтому возвращается never.",
    topic: "Ограничения infer"
  },
  {
    id: 41,
    question: "Как создать тип, который извлекает имена всех async методов класса?",
    options: [
      "type AsyncMethods<T> = { [K in keyof T]: T[K] extends (...args: any) => Promise<any> ? K : never }[keyof T]",
      "type AsyncMethods<T> = { [K in keyof T]: T[K] extends (...args: any) => infer R ? R extends Promise<any> ? K : never : never }[keyof T]",
      "type AsyncMethods<T> = T extends { [key: string]: (...args: any) => Promise<any> } ? keyof T : never",
      "Варианты A и B верны"
    ],
    correctAnswer: 3,
    explanation: "Оба подхода работают. Вариант A проще и читабельнее, вариант B использует infer для извлечения типа возвращаемого значения, что может быть полезно в более сложных случаях.",
    topic: "Продвинутые фильтры типов"
  },
  {
    id: 42,
    question: "Что делает этот тип?\n\ntype Reverse<T extends any[]> = T extends [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>] : [];",
    options: [
      "Сортирует элементы кортежа",
      "Переворачивает порядок элементов в кортеже",
      "Удаляет дубликаты из кортежа",
      "Создает копию кортежа"
    ],
    correctAnswer: 1,
    explanation: "Этот тип рекурсивно переворачивает порядок элементов в кортеже, помещая последний элемент в начало и вызывая себя для остальных.",
    topic: "Рекурсивные типы с infer"
  },
  {
    id: 43,
    question: "Как работает variance с infer в позициях параметров функции?",
    options: [
      "infer в параметрах всегда covariant",
      "infer в параметрах всегда contravariant",
      "infer в параметрах создает union при множественном использовании",
      "infer в параметрах создает intersection при множественном использовании"
    ],
    correctAnswer: 3,
    explanation: "Позиция параметров функции является contravariant, поэтому множественное использование infer в этой позиции создает intersection типов вместо union.",
    topic: "Variance и infer"
  },
  {
    id: 44,
    question: "Что вернет этот тип?\n\ntype StringToNumber<T extends string> = T extends `${infer N extends number}` ? N : never;\ntype Result = StringToNumber<'42'>;",
    options: [
      "string",
      "42",
      "number",
      "never"
    ],
    correctAnswer: 1,
    explanation: "Template literal types с infer и extends позволяют извлекать числовые литеральные типы из строк. '42' будет преобразовано в литеральный тип 42.",
    topic: "Template Literals с infer"
  },
  {
    id: 45,
    question: "Можно ли использовать infer рекурсивно для создания глубоких типов?",
    options: [
      "Нет, рекурсия с infer не поддерживается",
      "Да, но есть ограничение на глубину рекурсии",
      "Да, без ограничений",
      "Да, но только для массивов и кортежей"
    ],
    correctAnswer: 1,
    explanation: "TypeScript поддерживает рекурсивные типы с infer, но есть ограничение на глубину рекурсии (около 50 уровней), чтобы избежать бесконечных циклов.",
    topic: "Рекурсивные типы"
  },
  {
    id: 46,
    question: "Что делает этот паттерн?\n\ntype DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;",
    options: [
      "Делает только верхний уровень объекта readonly",
      "Рекурсивно делает все вложенные свойства readonly",
      "Создает копию объекта",
      "Проверяет, является ли объект readonly"
    ],
    correctAnswer: 1,
    explanation: "Этот тип рекурсивно применяет readonly модификатор ко всем свойствам объекта, включая вложенные объекты. infer здесь не используется, но паттерн часто комбинируется с infer.",
    topic: "Рекурсивные mapped types"
  },
  {
    id: 47,
    question: "Как извлечь тип ошибки из rejected Promise?",
    options: [
      "type ErrorType<T> = T extends Promise<any, infer E> ? E : never",
      "type ErrorType<T> = T extends PromiseLike<any> ? unknown : never",
      "Невозможно извлечь тип ошибки из Promise типа",
      "type ErrorType<T> = T extends Promise<infer U> ? U : never"
    ],
    correctAnswer: 2,
    explanation: "Promise в TypeScript типизирован только по успешному значению. Тип ошибки в reject всегда unknown или any, его нельзя извлечь через типы.",
    topic: "Ограничения типизации"
  },
  {
    id: 48,
    question: "Что делает этот utility type?\n\ntype OmitByType<T, U> = { [K in keyof T as T[K] extends U ? never : K]: T[K] };",
    options: [
      "Удаляет свойства с типом U из объекта T",
      "Оставляет только свойства с типом U",
      "Преобразует тип U в T",
      "Создает union типов T и U"
    ],
    correctAnswer: 0,
    explanation: "Этот тип использует key remapping с as для фильтрации свойств: если тип свойства extends U, ключ становится never (удаляется).",
    topic: "Key Remapping"
  },
  {
    id: 49,
    question: "Как infer работает с optional типами?",
    options: [
      "infer игнорирует optional модификатор",
      "infer сохраняет optional модификатор в выведенном типе",
      "infer преобразует optional в required",
      "infer создает union с undefined"
    ],
    correctAnswer: 1,
    explanation: "infer сохраняет все характеристики типа, включая optional модификатор. Если извлекается optional свойство, оно остается optional.",
    topic: "Optional типы с infer"
  },
  {
    id: 50,
    question: "Какой самый производительный способ работы с глубокими типами?",
    options: [
      "Использовать максимально глубокую рекурсию",
      "Ограничивать глубину рекурсии и использовать tail recursion где возможно",
      "Избегать infer полностью",
      "Использовать any для глубоких уровней"
    ],
    correctAnswer: 1,
    explanation: "Для оптимальной производительности TypeScript рекомендуется ограничивать глубину рекурсии и использовать tail recursion оптимизации, где это возможно, чтобы избежать медленной компиляции.",
    topic: "Производительность типов"
  }
]
