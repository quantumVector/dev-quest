import type { Question } from '@/types/question.ts'

export const typeScriptMappedTypesQuestions: Question[] = [
  // Тема 1: Основы Mapped Types
  {
    id: 1,
    question: "Что такое Mapped Types в TypeScript?",
    options: [
      "Типы для работы с картами и геолокацией",
      "Способ создания новых типов путем трансформации свойств существующего типа",
      "Типы для работы с Map и Set",
      "Альтернатива интерфейсам"
    ],
    correctAnswer: 1,
    explanation: "Mapped Types — это способ создания новых типов путем трансформации каждого свойства существующего типа. Это мощный инструмент для создания производных типов на основе других типов.",
    topic: "Основы Mapped Types"
  },
  {
    id: 2,
    question: "Какой синтаксис используется для создания Mapped Type?",
    options: [
      "{ [K in keyof T]: NewType }",
      "{ K from T: NewType }",
      "{ for K in T: NewType }",
      "{ K => T: NewType }"
    ],
    correctAnswer: 0,
    explanation: "Синтаксис Mapped Types: { [K in keyof T]: NewType }, где K — переменная ключа, T — исходный тип, а NewType — тип значения для каждого свойства.",
    topic: "Основы Mapped Types"
  },
  {
    id: 3,
    question: "Что делает следующий Mapped Type?\n\ntype ReadonlyType<T> = {\n  readonly [K in keyof T]: T[K]\n}",
    options: [
      "Создает тип с необязательными свойствами",
      "Создает тип, где все свойства доступны только для чтения",
      "Удаляет все свойства из типа",
      "Создает тип с приватными свойствами"
    ],
    correctAnswer: 1,
    explanation: "Этот Mapped Type создает новый тип, в котором все свойства исходного типа T становятся readonly (доступными только для чтения). Это альтернатива встроенному Readonly<T>.",
    topic: "Основы Mapped Types"
  },
  {
    id: 4,
    question: "Что такое keyof в контексте Mapped Types?",
    options: [
      "Функция для получения ключей объекта",
      "Оператор, который создает union type из всех ключей типа",
      "Метод для проверки существования ключа",
      "Модификатор доступа к свойствам"
    ],
    correctAnswer: 1,
    explanation: "keyof — это оператор индексного типа, который создает union type из всех ключей типа. Например, для type Person = { name: string; age: number }, keyof Person будет 'name' | 'age'.",
    topic: "Основы Mapped Types"
  },
  {
    id: 5,
    question: "Как сделать все свойства типа необязательными с помощью Mapped Type?",
    options: [
      "type Optional<T> = { [K in keyof T]: T[K] | undefined }",
      "type Optional<T> = { [K in keyof T]?: T[K] }",
      "type Optional<T> = { [K in keyof T]: T[K]? }",
      "type Optional<T> = { optional [K in keyof T]: T[K] }"
    ],
    correctAnswer: 1,
    explanation: "Для создания типа с необязательными свойствами используется модификатор ?: после K. Это делает все свойства optional. Это реализация встроенного Partial<T>.",
    topic: "Основы Mapped Types"
  },

  // Тема 2: Модификаторы в Mapped Types
  {
    id: 6,
    question: "Что делает префикс '-' перед модификатором в Mapped Type?",
    options: [
      "Добавляет модификатор",
      "Удаляет модификатор",
      "Делает свойство приватным",
      "Создает ошибку компиляции"
    ],
    correctAnswer: 1,
    explanation: "Префикс '-' удаляет модификатор. Например, -readonly удаляет readonly, а -? делает необязательные свойства обязательными. Это полезно для создания типов вроде Required<T> или мутабельных версий readonly типов.",
    topic: "Модификаторы в Mapped Types"
  },
  {
    id: 7,
    question: "Что делает следующий тип?\n\ntype Mutable<T> = {\n  -readonly [K in keyof T]: T[K]\n}",
    options: [
      "Делает все свойства readonly",
      "Удаляет readonly модификатор со всех свойств",
      "Делает все свойства необязательными",
      "Добавляет методы к типу"
    ],
    correctAnswer: 1,
    explanation: "Этот тип удаляет readonly модификатор со всех свойств, делая их мутабельными (изменяемыми). Префикс '-' перед readonly означает удаление этого модификатора.",
    topic: "Модификаторы в Mapped Types"
  },
  {
    id: 8,
    question: "Как реализован встроенный тип Required<T>?",
    options: [
      "type Required<T> = { [K in keyof T]+: T[K] }",
      "type Required<T> = { [K in keyof T]-?: T[K] }",
      "type Required<T> = { required [K in keyof T]: T[K] }",
      "type Required<T> = { [K in keyof T]!: T[K] }"
    ],
    correctAnswer: 1,
    explanation: "Required<T> использует -? для удаления optional модификатора, делая все свойства обязательными. Это противоположность Partial<T>.",
    topic: "Модификаторы в Mapped Types"
  },
  {
    id: 9,
    question: "Можно ли комбинировать модификаторы readonly и ? в Mapped Type?",
    options: [
      "Нет, можно использовать только один модификатор",
      "Да, можно использовать оба: readonly [K in keyof T]?: T[K]",
      "Только если добавить специальный флаг",
      "Только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "Модификаторы readonly и ? можно комбинировать. Например, { readonly [K in keyof T]?: T[K] } создаст тип с readonly и optional свойствами.",
    topic: "Модификаторы в Mapped Types"
  },
  {
    id: 10,
    question: "Что делает префикс '+' перед модификатором?",
    options: [
      "Удаляет модификатор",
      "Явно добавляет модификатор (поведение по умолчанию)",
      "Создает новое свойство",
      "Увеличивает строгость проверки"
    ],
    correctAnswer: 1,
    explanation: "Префикс '+' явно добавляет модификатор, хотя это поведение по умолчанию. Например, +readonly и readonly эквивалентны. '+' обычно используется для ясности кода.",
    topic: "Модификаторы в Mapped Types"
  },

  // Тема 3: Key Remapping в Mapped Types
  {
    id: 11,
    question: "Что такое Key Remapping в Mapped Types?",
    options: [
      "Изменение значений свойств",
      "Переименование или фильтрация ключей при создании нового типа",
      "Удаление дубликатов ключей",
      "Сортировка ключей в алфавитном порядке"
    ],
    correctAnswer: 1,
    explanation: "Key Remapping (появился в TypeScript 4.1) позволяет переименовывать или фильтровать ключи при создании Mapped Type. Синтаксис: [K in keyof T as NewKey]: T[K].",
    topic: "Key Remapping"
  },
  {
    id: 12,
    question: "Какой синтаксис используется для Key Remapping?",
    options: [
      "[K in keyof T rename NewK]: T[K]",
      "[K in keyof T as NewK]: T[K]",
      "[K in keyof T => NewK]: T[K]",
      "[K in keyof T -> NewK]: T[K]"
    ],
    correctAnswer: 1,
    explanation: "Для Key Remapping используется ключевое слово 'as': [K in keyof T as NewK]: T[K], где NewK — новое имя ключа (может быть выражением).",
    topic: "Key Remapping"
  },
  {
    id: 13,
    question: "Что делает следующий тип?\n\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n}",
    options: [
      "Удаляет все геттеры",
      "Создает методы-геттеры для каждого свойства с префиксом 'get'",
      "Проверяет наличие геттеров",
      "Создает сеттеры для свойств"
    ],
    correctAnswer: 1,
    explanation: "Этот тип создает методы-геттеры для каждого свойства. Например, для { name: string } создаст { getName: () => string }. Используется template literal types и Capitalize для формирования имен.",
    topic: "Key Remapping"
  },
  {
    id: 14,
    question: "Как отфильтровать ключи в Mapped Type с помощью Key Remapping?",
    options: [
      "Использовать метод filter()",
      "Использовать условный тип: [K in keyof T as T[K] extends string ? K : never]",
      "Использовать Exclude<>",
      "Нельзя фильтровать ключи"
    ],
    correctAnswer: 1,
    explanation: "Для фильтрации ключей используется условный тип с 'never'. Если условие не выполняется, возвращается never, и ключ исключается из результата. Например, это позволяет оставить только строковые свойства.",
    topic: "Key Remapping"
  },
  {
    id: 15,
    question: "Что вернет never в Key Remapping?",
    options: [
      "Создаст свойство с типом never",
      "Полностью исключит это свойство из результирующего типа",
      "Создаст ошибку компиляции",
      "Сделает свойство необязательным"
    ],
    correctAnswer: 1,
    explanation: "Когда Key Remapping возвращает never, свойство полностью исключается из результирующего типа. Это мощный способ фильтрации свойств на уровне типов.",
    topic: "Key Remapping"
  },

  // Тема 4: Template Literal Types в Mapped Types
  {
    id: 16,
    question: "Можно ли использовать Template Literal Types в Mapped Types?",
    options: [
      "Нет, это разные концепции",
      "Да, для динамического создания имен ключей",
      "Только в строгом режиме",
      "Только для строковых типов"
    ],
    correctAnswer: 1,
    explanation: "Template Literal Types можно комбинировать с Mapped Types для динамического создания имен ключей. Например: type Events<T> = { [K in keyof T as `on${Capitalize<string & K>}`]: T[K] }.",
    topic: "Template Literal Types в Mapped Types"
  },
  {
    id: 17,
    question: "Что делает следующий тип?\n\ntype EventHandlers<T> = {\n  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void\n}",
    options: [
      "Создает обработчики событий для каждого свойства",
      "Проверяет наличие событий",
      "Удаляет обработчики событий",
      "Создает getter'ы для свойств"
    ],
    correctAnswer: 0,
    explanation: "Этот тип создает методы-обработчики событий для каждого свойства с паттерном 'on{Property}Change'. Например, для { name: string } создаст { onNameChange: (value: string) => void }.",
    topic: "Template Literal Types в Mapped Types"
  },
  {
    id: 18,
    question: "Зачем используется 'string & K' в Template Literal Types?",
    options: [
      "Для конкатенации строк",
      "Для обеспечения того, что K — строковый тип (intersection с string)",
      "Для создания уникальных ключей",
      "Для проверки типа на строку"
    ],
    correctAnswer: 1,
    explanation: "'string & K' создает intersection type, гарантируя, что K будет строковым типом. Это необходимо для Template Literal Types, которые работают только со строками. Для symbol или number ключей это даст never.",
    topic: "Template Literal Types в Mapped Types"
  },
  {
    id: 19,
    question: "Какие встроенные utility types можно использовать с Template Literals в Mapped Types?",
    options: [
      "Только Capitalize",
      "Capitalize, Uppercase, Lowercase, Uncapitalize",
      "Только Uppercase и Lowercase",
      "Нельзя использовать utility types"
    ],
    correctAnswer: 1,
    explanation: "TypeScript предоставляет utility types для работы со строками: Capitalize (первая буква заглавная), Uppercase (все заглавные), Lowercase (все строчные), Uncapitalize (первая буква строчная).",
    topic: "Template Literal Types в Mapped Types"
  },
  {
    id: 20,
    question: "Что произойдет при использовании Template Literal с symbol ключом?",
    options: [
      "Создастся свойство с именем 'Symbol'",
      "Свойство будет исключено (станет never)",
      "Ошибка компиляции",
      "Symbol преобразуется в строку"
    ],
    correctAnswer: 1,
    explanation: "Template Literal Types работают только со строками. При использовании с symbol (или number) через 'string & K' intersection получится never, и свойство будет исключено из результата.",
    topic: "Template Literal Types в Mapped Types"
  },

  // Тема 5: Условные типы в Mapped Types
  {
    id: 21,
    question: "Можно ли использовать условные типы в Mapped Types?",
    options: [
      "Нет, это несовместимые концепции",
      "Да, для условной трансформации типов свойств",
      "Только в значениях, не в ключах",
      "Только с оператором extends"
    ],
    correctAnswer: 1,
    explanation: "Условные типы можно использовать в Mapped Types как для трансформации значений свойств, так и для Key Remapping. Это позволяет создавать сложные трансформации типов.",
    topic: "Условные типы в Mapped Types"
  },
  {
    id: 22,
    question: "Что делает следующий тип?\n\ntype Nullable<T> = {\n  [K in keyof T]: T[K] extends object ? Nullable<T[K]> : T[K] | null\n}",
    options: [
      "Делает все свойства null",
      "Рекурсивно добавляет null ко всем примитивным свойствам",
      "Удаляет null из типов",
      "Проверяет на null"
    ],
    correctAnswer: 1,
    explanation: "Этот тип рекурсивно обходит все свойства и добавляет null к примитивным типам. Для объектов рекурсивно применяется Nullable. Это пример условного типа с рекурсией в Mapped Type.",
    topic: "Условные типы в Mapped Types"
  },
  {
    id: 23,
    question: "Как отфильтровать только функциональные свойства типа?",
    options: [
      "type Functions<T> = { [K in keyof T]: T[K] extends Function }",
      "type Functions<T> = { [K in keyof T as T[K] extends Function ? K : never]: T[K] }",
      "type Functions<T> = { functions [K in keyof T]: T[K] }",
      "Нельзя фильтровать по типу значения"
    ],
    correctAnswer: 1,
    explanation: "Используется Key Remapping с условным типом. Если T[K] extends Function, ключ K сохраняется, иначе возвращается never и свойство исключается.",
    topic: "Условные типы в Mapped Types"
  },
  {
    id: 24,
    question: "Что делает следующий тип?\n\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]\n}",
    options: [
      "Делает readonly только первый уровень свойств",
      "Рекурсивно делает все свойства (включая вложенные) readonly",
      "Удаляет readonly со всех свойств",
      "Работает только с примитивными типами"
    ],
    correctAnswer: 1,
    explanation: "DeepReadonly рекурсивно применяет readonly модификатор ко всем уровням вложенности объекта. Для объектов рекурсивно вызывается DeepReadonly, для примитивов просто применяется readonly.",
    topic: "Условные типы в Mapped Types"
  },

  // Тема 6: Практические примеры Mapped Types
  {
    id: 25,
    question: "Как создать тип Record с помощью Mapped Type?",
    options: [
      "type Record<K, T> = { [P in K]: T }",
      "type Record<K extends keyof any, T> = { [P in K]: T }",
      "type Record<K, T> = { K: T }",
      "type Record<K, T> = Map<K, T>"
    ],
    correctAnswer: 1,
    explanation: "Record создается с помощью Mapped Type: { [P in K]: T }, где K extends keyof any гарантирует, что K может быть использован как ключ (string, number или symbol).",
    topic: "Практические примеры"
  },
  {
    id: 26,
    question: "Что делает следующий тип?\n\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P]\n}",
    options: [
      "Выбирает случайное свойство",
      "Создает новый тип только с указанными свойствами из T",
      "Удаляет указанные свойства",
      "Проверяет наличие свойств"
    ],
    correctAnswer: 1,
    explanation: "Pick создает новый тип, содержащий только указанные свойства K из типа T. Это встроенный utility type, реализованный через Mapped Type.",
    topic: "Практические примеры"
  },
  {
    id: 27,
    question: "Как реализовать тип Omit с помощью Mapped Types?",
    options: [
      "type Omit<T, K> = { [P in keyof T]: P extends K ? never : T[P] }",
      "type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>",
      "type Omit<T, K> = { [P in K]: never }",
      "type Omit<T, K> = Delete<T, K>"
    ],
    correctAnswer: 1,
    explanation: "Omit реализуется через комбинацию Pick и Exclude: Pick<T, Exclude<keyof T, K>>. Exclude исключает ключи K из всех ключей T, а Pick выбирает оставшиеся свойства.",
    topic: "Практические примеры"
  },
  {
    id: 28,
    question: "Что делает тип Readonly<T> на уровне реализации?",
    options: [
      "Блокирует изменение объекта в runtime",
      "Добавляет readonly модификатор ко всем свойствам на уровне типов",
      "Создает копию объекта",
      "Замораживает объект (Object.freeze)"
    ],
    correctAnswer: 1,
    explanation: "Readonly<T> = { readonly [P in keyof T]: T[P] } добавляет readonly только на уровне типов. В runtime никакой защиты нет. Для runtime защиты нужен Object.freeze().",
    topic: "Практические примеры"
  },
  {
    id: 29,
    question: "Как создать тип, который делает определенные свойства необязательными?",
    options: [
      "type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>",
      "type PartialBy<T, K> = { [P in K]?: T[P] }",
      "type PartialBy<T, K> = Partial<T> & Pick<T, K>",
      "Нельзя сделать частичную необязательность"
    ],
    correctAnswer: 0,
    explanation: "PartialBy создается через intersection: берем все свойства кроме K (Omit<T, K>), объединяем с необязательными свойствами K (Partial<Pick<T, K>>).",
    topic: "Практические примеры"
  },
  {
    id: 30,
    question: "Что делает следующий тип?\n\ntype NonNullable<T> = T extends null | undefined ? never : T",
    options: [
      "Это Mapped Type",
      "Это условный тип, исключающий null и undefined",
      "Это utility для работы с nullable значениями",
      "Это type guard"
    ],
    correctAnswer: 1,
    explanation: "NonNullable — это не Mapped Type, а условный тип. Он исключает null и undefined из union type. Например, NonNullable<string | null> даст string.",
    topic: "Практические примеры"
  },

  // Тема 7: Распространенные паттерны
  {
    id: 31,
    question: "Как создать тип для обработчиков событий на основе существующего типа?",
    options: [
      "Использовать Mapped Type с Key Remapping и Template Literals",
      "Использовать extends",
      "Использовать классы",
      "Нельзя автоматизировать создание обработчиков"
    ],
    correctAnswer: 0,
    explanation: "Паттерн: type Handlers<T> = { [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void }. Комбинирует Mapped Type, Key Remapping и Template Literals.",
    topic: "Распространенные паттерны"
  },
  {
    id: 32,
    question: "Как создать тип с геттерами и сеттерами?",
    options: [
      "Использовать классы с get/set",
      "Создать два Mapped Type (Getters и Setters) и объединить через &",
      "Использовать Proxy",
      "Нельзя типизировать геттеры/сеттеры"
    ],
    correctAnswer: 1,
    explanation: "Создается два Mapped Type: type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] } и type Setters<T> = { [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void }, объединяются через &.",
    topic: "Распространенные паттерны"
  },
  {
    id: 33,
    question: "Что такое паттерн 'distributive object types'?",
    options: [
      "Распределение типов по разным файлам",
      "Применение Mapped Type к каждому члену union type отдельно",
      "Распределенные вычисления типов",
      "Паттерн для работы с массивами"
    ],
    correctAnswer: 1,
    explanation: "Когда Mapped Type применяется к union type, он распределяется: { [K in keyof (A | B)]: ... } обрабатывает A и B отдельно. Это называется distributive behavior.",
    topic: "Распространенные паттерны"
  },
  {
    id: 34,
    question: "Как создать тип, который преобразует все методы в промисы?",
    options: [
      "type Promisify<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? (...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>> : T[K] }",
      "type Promisify<T> = Promise<T>",
      "type Promisify<T> = { [K in keyof T]: Promise<T[K]> }",
      "Нельзя автоматически промисифицировать типы"
    ],
    correctAnswer: 0,
    explanation: "Используется Mapped Type с условным типом: проверяется, является ли свойство функцией, и если да, то её возвращаемый тип оборачивается в Promise. Используются utility types Parameters и ReturnType.",
    topic: "Распространенные паттерны"
  },

  // Тема 8: Ограничения и лучшие практики
  {
    id: 35,
    question: "Какое ограничение есть у Mapped Types?",
    options: [
      "Нельзя использовать с интерфейсами",
      "Нельзя создавать новые свойства, только трансформировать существующие",
      "Работают только с примитивными типами",
      "Нельзя использовать модификаторы"
    ],
    correctAnswer: 1,
    explanation: "Mapped Types могут только трансформировать существующие ключи типа (с помощью Key Remapping можно их переименовать/отфильтровать), но нельзя добавить совершенно новые свойства, не существующие в исходном типе.",
    topic: "Ограничения и лучшие практики"
  },
  {
    id: 36,
    question: "Можно ли использовать Mapped Types с index signatures?",
    options: [
      "Нет, это приведет к ошибке",
      "Да, но index signature будет сохранен в результате",
      "Только с числовыми индексами",
      "Только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "При использовании Mapped Type с типом, содержащим index signature, он сохраняется в результате. Например, { [key: string]: any } останется index signature после трансформации.",
    topic: "Ограничения и лучшие практики"
  },
  {
    id: 37,
    question: "Когда следует избегать сложных Mapped Types?",
    options: [
      "Всегда, они слишком сложные",
      "Когда они ухудшают читаемость и производительность компилятора",
      "Никогда, чем сложнее, тем лучше",
      "Только в production коде"
    ],
    correctAnswer: 1,
    explanation: "Очень сложные Mapped Types (глубокая рекурсия, множественные условия) могут замедлить компиляцию и ухудшить читаемость. Важен баланс между выразительностью типов и maintainability.",
    topic: "Ограничения и лучшие практики"
  },
  {
    id: 38,
    question: "Что лучше: создать сложный Mapped Type или несколько простых?",
    options: [
      "Всегда один сложный тип",
      "Обычно несколько простых, композируемых типов",
      "Нет разницы",
      "Зависит от фазы луны"
    ],
    correctAnswer: 1,
    explanation: "Лучше создавать несколько простых, композируемых типов и комбинировать их. Это улучшает читаемость, переиспользуемость и упрощает отладку типов. Принцип 'разделяй и властвуй' применим и к типам.",
    topic: "Ограничения и лучшие практики"
  },
  {
    id: 39,
    question: "Как Mapped Types влияют на производительность TypeScript компилятора?",
    options: [
      "Не влияют никак",
      "Сложные Mapped Types могут замедлить проверку типов",
      "Всегда ускоряют компиляцию",
      "Влияют только на runtime производительность"
    ],
    correctAnswer: 1,
    explanation: "Сложные Mapped Types (особенно с рекурсией, условными типами, Key Remapping) увеличивают время проверки типов. В больших проектах это может быть заметно. Важно находить баланс между типобезопасностью и скоростью компиляции.",
    topic: "Ограничения и лучшие практики"
  },
  {
    id: 40,
    question: "Стоит ли всегда использовать встроенные utility types вместо собственных Mapped Types?",
    options: [
      "Да, всегда использовать только встроенные",
      "Предпочтительно использовать встроенные, но собственные полезны для специфичных задач",
      "Нет, встроенные типы хуже",
      "Нет разницы между встроенными и собственными"
    ],
    correctAnswer: 1,
    explanation: "Встроенные utility types (Partial, Required, Readonly, Pick, Omit, Record) хорошо оптимизированы и понятны другим разработчикам. Но для специфичных трансформаций нужны собственные Mapped Types.",
    topic: "Ограничения и лучшие практики"
  }
]
