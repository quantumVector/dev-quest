import type { Question } from '@/types/question.ts'

export const tsTypeCastingQuestions: Question[] = [
  // Тема 1: Основы приведения типов
  {
    id: 1,
    question: "Что такое приведение типов (Type Casting) в TypeScript?",
    options: [
      "Автоматическое преобразование типов во время выполнения",
      "Способ явно указать TypeScript, что значение имеет определенный тип",
      "Функция для конвертации одного типа в другой",
      "Метод для создания новых типов"
    ],
    correctAnswer: 1,
    explanation: "Type Casting (приведение типов) — это способ явно сообщить TypeScript, что значение имеет определенный тип, отличный от того, что TypeScript вывел автоматически. Это compile-time операция, которая не влияет на runtime код.",
    topic: "Основы приведения типов"
  },
  {
    id: 2,
    question: "Какие два синтаксиса приведения типов доступны в TypeScript?",
    options: [
      "as и typeof",
      "as и угловые скобки <>",
      "cast и convert",
      "type и interface"
    ],
    correctAnswer: 1,
    explanation: "TypeScript поддерживает два синтаксиса приведения типов: 'as' (например, value as string) и угловые скобки (например, <string>value). Синтаксис 'as' предпочтительнее, особенно в JSX/TSX файлах.",
    topic: "Основы приведения типов"
  },
  {
    id: 3,
    question: "Какой синтаксис приведения типов НЕ работает в .tsx файлах?",
    options: [
      "value as Type",
      "<Type>value",
      "Оба работают",
      "Ни один не работает"
    ],
    correctAnswer: 1,
    explanation: "Синтаксис с угловыми скобками <Type>value конфликтует с JSX синтаксисом в .tsx файлах, поэтому в React компонентах нужно использовать только 'as' синтаксис.",
    topic: "Основы приведения типов"
  },
  {
    id: 4,
    question: "Что произойдет при выполнении этого кода?\n\nconst value: unknown = 'hello';\nconst length = value.length;",
    options: [
      "Выведет 5",
      "Ошибка компиляции: Property 'length' does not exist on type 'unknown'",
      "Выведет undefined",
      "Код скомпилируется и выполнится без ошибок"
    ],
    correctAnswer: 1,
    explanation: "Тип 'unknown' требует явной проверки типа или приведения перед использованием. TypeScript не позволяет обращаться к свойствам unknown типа напрямую.",
    topic: "Основы приведения типов"
  },
  {
    id: 5,
    question: "Как правильно привести unknown к string?",
    options: [
      "const str = value as string",
      "const str = string(value)",
      "const str = String(value)",
      "const str = value.toString()"
    ],
    correctAnswer: 0,
    explanation: "Для приведения unknown к string используется оператор 'as': value as string. String() и toString() — это runtime преобразования, а не type assertions.",
    topic: "Основы приведения типов"
  },

  // Тема 2: as vs угловые скобки
  {
    id: 6,
    question: "В чем основное различие между 'as' и '<>' синтаксисом?",
    options: [
      "'as' безопаснее, чем '<>'",
      "'<>' работает быстрее",
      "Функционально идентичны, но '<>' не работает в .tsx",
      "'as' создает runtime проверку типа"
    ],
    correctAnswer: 2,
    explanation: "Оба синтаксиса функционально идентичны и являются compile-time операциями. Единственное отличие — синтаксис с угловыми скобками не может использоваться в .tsx файлах из-за конфликта с JSX.",
    topic: "as vs угловые скобки"
  },
  {
    id: 7,
    question: "Какой синтаксис является предпочтительным в современном TypeScript?",
    options: [
      "<Type>value",
      "value as Type",
      "Оба равнозначны",
      "Зависит от версии TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Синтаксис 'as' является предпочтительным в современном TypeScript, так как он работает везде (включая .tsx файлы) и лучше читается.",
    topic: "as vs угловые скобки"
  },
  {
    id: 8,
    question: "Что выведет этот код?\n\nconst x = <string>'hello';\nconst y = 'hello' as string;\nconsole.log(typeof x, typeof y);",
    options: [
      "string string",
      "object object",
      "string object",
      "Ошибка компиляции"
    ],
    correctAnswer: 0,
    explanation: "Оба способа приведения типов — это compile-time операции, которые не влияют на runtime тип. После компиляции оба значения остаются строками.",
    topic: "as vs угловые скобки"
  },
  {
    id: 9,
    question: "Можно ли использовать приведение типов для изменения структуры объекта?",
    options: [
      "Да, приведение типов изменяет структуру",
      "Нет, приведение типов только влияет на compile-time типы",
      "Да, но только для примитивных типов",
      "Да, но нужно использовать угловые скобки"
    ],
    correctAnswer: 1,
    explanation: "Type casting — это только compile-time операция, которая не изменяет runtime структуру или поведение объекта. Она только сообщает TypeScript, как интерпретировать тип.",
    topic: "as vs угловые скобки"
  },
  {
    id: 10,
    question: "Что произойдет в этом коде?\n\ninterface User { name: string; }\nconst data = { age: 25 };\nconst user = data as User;\nconsole.log(user.name);",
    options: [
      "Выведет имя пользователя",
      "Ошибка компиляции",
      "Выведет undefined",
      "Код не скомпилируется из-за несовместимости типов"
    ],
    correctAnswer: 3,
    explanation: "TypeScript не позволит привести { age: 25 } к User напрямую, так как эти типы несовместимы. Нужно сначала привести к unknown: (data as unknown) as User.",
    topic: "as vs угловые скобки"
  },

  // Тема 3: Double assertion (двойное приведение)
  {
    id: 11,
    question: "Что такое двойное приведение типов (double assertion)?",
    options: [
      "Приведение типа дважды подряд",
      "Приведение к unknown/any, затем к целевому типу",
      "Использование двух разных синтаксисов",
      "Проверка типа два раза"
    ],
    correctAnswer: 1,
    explanation: "Двойное приведение (double assertion) — это паттерн, когда сначала приводим значение к unknown или any, а затем к целевому типу. Используется для обхода строгих проверок TypeScript при несовместимых типах.",
    topic: "Двойное приведение"
  },
  {
    id: 12,
    question: "Когда нужно использовать двойное приведение?\n\nconst x = value as Type; // не работает",
    options: [
      "Когда типы полностью несовместимы",
      "Всегда, для безопасности",
      "Когда нужно ускорить компиляцию",
      "Когда используются дженерики"
    ],
    correctAnswer: 0,
    explanation: "Двойное приведение используется, когда типы настолько различны, что TypeScript не позволяет прямое приведение. Это escape hatch, который следует использовать осторожно.",
    topic: "Двойное приведение"
  },
  {
    id: 13,
    question: "Какой из способов двойного приведения правильный?",
    options: [
      "value as Type as OtherType",
      "(value as unknown) as TargetType",
      "value as (unknown as TargetType)",
      "value as Type | TargetType"
    ],
    correctAnswer: 1,
    explanation: "Правильный синтаксис: (value as unknown) as TargetType. Сначала приводим к unknown, чтобы 'сбросить' информацию о типе, затем к целевому типу.",
    topic: "Двойное приведение"
  },
  {
    id: 14,
    question: "В чем опасность использования двойного приведения?",
    options: [
      "Замедляет выполнение программы",
      "Обходит проверки типов и может привести к runtime ошибкам",
      "Увеличивает размер бандла",
      "Не работает в production режиме"
    ],
    correctAnswer: 1,
    explanation: "Двойное приведение обходит систему типов TypeScript и может привести к runtime ошибкам, если значение на самом деле не соответствует целевому типу. Используйте с осторожностью.",
    topic: "Двойное приведение"
  },
  {
    id: 15,
    question: "Что лучше использовать вместо двойного приведения, когда это возможно?",
    options: [
      "Type guards и проверки типов",
      "any тип",
      "Игнорирование ошибок через // @ts-ignore",
      "Отключение strict режима"
    ],
    correctAnswer: 0,
    explanation: "Вместо двойного приведения лучше использовать type guards и проверки типов, которые обеспечивают типобезопасность и в compile-time, и в runtime.",
    topic: "Двойное приведение"
  },

  // Тема 4: const assertions
  {
    id: 16,
    question: "Что делает const assertion (as const)?",
    options: [
      "Создает константу в JavaScript",
      "Делает тип readonly и литеральным",
      "Запрещает изменение переменной",
      "Создает новый тип"
    ],
    correctAnswer: 1,
    explanation: "const assertion (as const) сообщает TypeScript, что тип должен быть максимально узким и readonly. Для объектов это означает readonly свойства и литеральные типы вместо широких.",
    topic: "const assertions"
  },
  {
    id: 17,
    question: "Какой тип будет у переменной?\n\nconst arr = [1, 2, 3] as const;",
    options: [
      "number[]",
      "readonly number[]",
      "readonly [1, 2, 3]",
      "[1, 2, 3]"
    ],
    correctAnswer: 2,
    explanation: "as const создает readonly tuple с литеральными типами: readonly [1, 2, 3]. Это самый узкий возможный тип для этого массива.",
    topic: "const assertions"
  },
  {
    id: 18,
    question: "Что произойдет при попытке изменить значение?\n\nconst obj = { x: 10 } as const;\nobj.x = 20;",
    options: [
      "x изменится на 20",
      "Ошибка компиляции: Cannot assign to 'x' because it is a read-only property",
      "Runtime ошибка",
      "Код выполнится, но значение не изменится"
    ],
    correctAnswer: 1,
    explanation: "as const делает все свойства readonly, поэтому TypeScript не позволит изменить значение и выдаст ошибку компиляции.",
    topic: "const assertions"
  },
  {
    id: 19,
    question: "Когда полезно использовать as const?",
    options: [
      "Для создания конфигурационных объектов и enum-подобных структур",
      "Для всех переменных",
      "Только для массивов",
      "Только для строк"
    ],
    correctAnswer: 0,
    explanation: "as const особенно полезен для конфигураций, enum-подобных структур, и когда нужны точные литеральные типы вместо широких типов.",
    topic: "const assertions"
  },
  {
    id: 20,
    question: "Какой тип будет у colors?\n\nconst colors = ['red', 'green', 'blue'] as const;",
    options: [
      "string[]",
      "('red' | 'green' | 'blue')[]",
      "readonly string[]",
      "readonly ['red', 'green', 'blue']"
    ],
    correctAnswer: 3,
    explanation: "as const создает readonly tuple с точными литеральными типами: readonly ['red', 'green', 'blue'], а не union тип или обычный массив строк.",
    topic: "const assertions"
  },

  // Тема 5: Non-null assertion operator (!)
  {
    id: 21,
    question: "Что делает оператор ! (non-null assertion)?",
    options: [
      "Проверяет, что значение не null",
      "Удаляет null и undefined из типа",
      "Инвертирует boolean значение",
      "Создает обязательное поле"
    ],
    correctAnswer: 1,
    explanation: "Оператор ! (non-null assertion) сообщает TypeScript, что значение гарантированно не null и не undefined. Это compile-time операция, которая не добавляет runtime проверок.",
    topic: "Non-null assertion"
  },
  {
    id: 22,
    question: "Что произойдет в этом коде?\n\nfunction getLength(str?: string) {\n  return str!.length;\n}",
    options: [
      "Всегда будет работать корректно",
      "Может вызвать runtime ошибку, если str undefined",
      "TypeScript выдаст ошибку компиляции",
      "Автоматически добавится проверка на undefined"
    ],
    correctAnswer: 1,
    explanation: "Оператор ! убирает null/undefined из типа на уровне TypeScript, но не добавляет runtime проверку. Если str действительно undefined, будет runtime ошибка.",
    topic: "Non-null assertion"
  },
  {
    id: 23,
    question: "Когда безопасно использовать non-null assertion?",
    options: [
      "Всегда, TypeScript защищает от ошибок",
      "Когда вы уверены, что значение не может быть null/undefined",
      "Никогда не следует использовать",
      "Только в production коде"
    ],
    correctAnswer: 1,
    explanation: "Non-null assertion безопасен только когда вы абсолютно уверены, что значение не null/undefined (например, после проверки или из-за логики приложения). В противном случае лучше использовать optional chaining (?.).",
    topic: "Non-null assertion"
  },
  {
    id: 24,
    question: "В чем разница между value! и value?",
    options: [
      "! убирает null/undefined из типа, ? делает optional chaining",
      "Никакой разницы нет",
      "! быстрее работает",
      "? безопаснее"
    ],
    correctAnswer: 0,
    explanation: "value! (non-null assertion) убирает null/undefined из типа и выбросит ошибку, если значение null/undefined. value? (optional chaining) безопасно вернет undefined, если значение null/undefined.",
    topic: "Non-null assertion"
  },
  {
    id: 25,
    question: "Что лучше использовать в этом случае?\n\nfunction process(data: Data | null) {\n  // Нужно обратиться к data.value\n}",
    options: [
      "data!.value",
      "if (data) { data.value }",
      "data?.value",
      "И проверка, и optional chaining, в зависимости от контекста"
    ],
    correctAnswer: 3,
    explanation: "Выбор зависит от контекста: если нужно обработать отсутствие data (вернуть undefined или дефолт) — используйте data?.value. Если data должен быть не null по логике — сначала проверка, затем безопасное использование.",
    topic: "Non-null assertion"
  },

  // Тема 6: Type guards vs Type assertions
  {
    id: 26,
    question: "В чем основное различие между type guard и type assertion?",
    options: [
      "Type guard проверяет тип в runtime, assertion только в compile-time",
      "Type guard быстрее работает",
      "Assertion безопаснее",
      "Никакой разницы нет"
    ],
    correctAnswer: 0,
    explanation: "Type guard (typeof, instanceof, user-defined) проверяет тип в runtime и гарантирует типобезопасность. Type assertion — это только compile-time подсказка TypeScript без runtime проверок.",
    topic: "Type guards vs assertions"
  },
  {
    id: 27,
    question: "Какой подход безопаснее?\n\n// Вариант 1\nif (typeof value === 'string') {\n  console.log(value.length);\n}\n\n// Вариант 2\nconsole.log((value as string).length);",
    options: [
      "Вариант 1",
      "Вариант 2",
      "Оба одинаково безопасны",
      "Оба одинаково небезопасны"
    ],
    correctAnswer: 0,
    explanation: "Вариант 1 (type guard) безопаснее, так как проверяет тип в runtime. Вариант 2 (assertion) может привести к ошибке, если value не строка.",
    topic: "Type guards vs assertions"
  },
  {
    id: 28,
    question: "Когда следует предпочесть assertion вместо type guard?",
    options: [
      "Когда вы точно знаете тип из контекста, который TypeScript не может вывести",
      "Когда хотите ускорить код",
      "Всегда следует использовать assertion",
      "Никогда не следует использовать assertion"
    ],
    correctAnswer: 0,
    explanation: "Type assertion уместен, когда вы владеете информацией о типе, которую TypeScript не может вывести автоматически (например, после сложных трансформаций или при работе с DOM API).",
    topic: "Type guards vs assertions"
  },
  {
    id: 29,
    question: "Что выведет этот код?\n\nfunction isString(value: unknown): value is string {\n  return typeof value === 'string';\n}\n\nconst x: unknown = 123;\nif (isString(x)) {\n  console.log(x.length);\n}",
    options: [
      "undefined",
      "Ошибка, так как x это число",
      "Код внутри if не выполнится",
      "123"
    ],
    correctAnswer: 2,
    explanation: "Type guard isString вернет false для числа, поэтому код внутри if не выполнится. Это runtime проверка, которая защищает от ошибок.",
    topic: "Type guards vs assertions"
  },
  {
    id: 30,
    question: "Какой паттерн лучше для работы с API ответами?",
    options: [
      "const data = response as APIResponse",
      "Проверка структуры данных с type guard",
      "const data = response as unknown as APIResponse",
      "Использование any"
    ],
    correctAnswer: 1,
    explanation: "Для API ответов лучше использовать runtime валидацию с type guard, так как структура данных от сервера может измениться. Type assertion не защитит от некорректных данных.",
    topic: "Type guards vs assertions"
  },

  // Тема 7: satisfies оператор
  {
    id: 31,
    question: "Что делает оператор satisfies в TypeScript 4.9+?",
    options: [
      "Приводит тип к указанному",
      "Проверяет, что значение соответствует типу, но сохраняет вывод типа",
      "Создает новый тип",
      "Удаляет типы из кода"
    ],
    correctAnswer: 1,
    explanation: "Оператор satisfies проверяет, что значение соответствует указанному типу, но при этом TypeScript сохраняет наиболее точный выведенный тип, а не расширяет до типа после satisfies.",
    topic: "satisfies оператор"
  },
  {
    id: 32,
    question: "В чем разница между 'as' и 'satisfies'?\n\nconst config = { url: 'api.com' } as Config;\nconst config2 = { url: 'api.com' } satisfies Config;",
    options: [
      "Никакой разницы нет",
      "as расширяет тип до Config, satisfies сохраняет точный тип",
      "satisfies безопаснее",
      "as работает в runtime"
    ],
    correctAnswer: 1,
    explanation: "as приводит тип к Config и теряется информация о точной структуре. satisfies проверяет соответствие Config, но сохраняет точный выведенный тип { url: string }.",
    topic: "satisfies оператор"
  },
  {
    id: 33,
    question: "Какой тип будет у palette?\n\ntype RGB = [number, number, number];\nconst palette = {\n  red: [255, 0, 0],\n  blue: [0, 0, 255]\n} satisfies Record<string, RGB>;",
    options: [
      "Record<string, RGB>",
      "{ red: RGB; blue: RGB }",
      "{ red: [255, 0, 0]; blue: [0, 0, 255] }",
      "{ red: number[]; blue: number[] }"
    ],
    correctAnswer: 2,
    explanation: "satisfies проверяет соответствие Record<string, RGB>, но сохраняет точный выведенный тип с литеральными значениями: { red: [255, 0, 0]; blue: [0, 0, 255] }.",
    topic: "satisfies оператор"
  },
  {
    id: 34,
    question: "Когда следует использовать satisfies вместо as?",
    options: [
      "Когда нужно проверить тип, но сохранить точность выведенного типа",
      "Всегда",
      "Никогда",
      "Только для объектов"
    ],
    correctAnswer: 0,
    explanation: "satisfies полезен, когда нужно убедиться в соответствии типу, но при этом сохранить максимально точную информацию о типе для дальнейшего использования.",
    topic: "satisfies оператор"
  },
  {
    id: 35,
    question: "Что произойдет в этом коде?\n\ntype Colors = 'red' | 'green' | 'blue';\nconst color = 'yellow' satisfies Colors;",
    options: [
      "Ошибка компиляции",
      "color будет иметь тип 'yellow'",
      "color будет иметь тип Colors",
      "color будет иметь тип string"
    ],
    correctAnswer: 0,
    explanation: "satisfies проверяет соответствие типу в compile-time. 'yellow' не входит в union тип Colors, поэтому TypeScript выдаст ошибку компиляции.",
    topic: "satisfies оператор"
  },

  // Тема 8: Практические сценарии и best practices
  {
    id: 36,
    question: "Как правильно привести тип элемента DOM?\n\nconst input = document.getElementById('email');",
    options: [
      "const input = document.getElementById('email') as HTMLInputElement",
      "const input = <HTMLInputElement>document.getElementById('email')",
      "const input = document.getElementById('email') as HTMLInputElement | null",
      "Оба варианта A и C корректны"
    ],
    correctAnswer: 3,
    explanation: "Оба варианта корректны, но важно помнить, что getElementById может вернуть null. Поэтому тип должен быть HTMLInputElement | null, либо нужно добавить non-null assertion (!).",
    topic: "Практические сценарии"
  },
  {
    id: 37,
    question: "Как безопасно работать с JSON.parse()?\n\nconst data = JSON.parse(jsonString);",
    options: [
      "const data = JSON.parse(jsonString) as MyType",
      "Использовать runtime валидацию (zod, yup) или type guard",
      "const data = JSON.parse(jsonString) as unknown as MyType",
      "Использовать any"
    ],
    correctAnswer: 1,
    explanation: "JSON.parse() возвращает any, и мы не можем быть уверены в структуре данных. Лучший подход — использовать runtime валидацию с библиотеками типа zod или написать type guard.",
    topic: "Практические сценарии"
  },
  {
    id: 38,
    question: "Что не так с этим кодом?\n\nfunction process(value: any) {\n  const str = value as string;\n  return str.toUpperCase();\n}",
    options: [
      "Ничего, код корректен",
      "Использование any и небезопасное приведение типа",
      "Метод toUpperCase() вызван неправильно",
      "Отсутствует return type"
    ],
    correctAnswer: 1,
    explanation: "Использование any теряет всю типобезопасность, а приведение к string не гарантирует, что value действительно строка. Нужно использовать unknown и type guard.",
    topic: "Практические сценарии"
  },
  {
    id: 39,
    question: "Как правильно типизировать event handler?\n\nfunction handleClick(event) {\n  const target = event.target;\n}",
    options: [
      "function handleClick(event: Event)",
      "function handleClick(event: MouseEvent)",
      "function handleClick(event: any)",
      "Зависит от контекста использования"
    ],
    correctAnswer: 3,
    explanation: "Выбор типа события зависит от контекста: MouseEvent для кликов, KeyboardEvent для клавиатуры, Event для общих случаев. Также может потребоваться приведение event.target к конкретному типу элемента.",
    topic: "Практические сценарии"
  },
  {
    id: 40,
    question: "Какой подход best practice для работы с внешними данными?",
    options: [
      "Всегда использовать as для приведения к нужному типу",
      "Использовать runtime валидацию + type guards",
      "Использовать двойное приведение через unknown",
      "Использовать any для гибкости"
    ],
    correctAnswer: 1,
    explanation: "Best practice — использовать runtime валидацию с библиотеками (zod, io-ts, yup) или type guards для проверки структуры данных. Это обеспечивает типобезопасность и в compile-time, и в runtime.",
    topic: "Практические сценарии"
  },

  // Дополнительные вопросы для углубления
  {
    id: 41,
    question: "Что такое 'type assertion' vs 'type annotation'?",
    options: [
      "Это синонимы",
      "Assertion — приведение типа, annotation — объявление типа",
      "Assertion работает в runtime, annotation в compile-time",
      "Annotation безопаснее"
    ],
    correctAnswer: 1,
    explanation: "Type annotation (x: string) объявляет тип переменной при создании. Type assertion (x as string) говорит TypeScript интерпретировать существующее значение как другой тип.",
    topic: "Теория приведения типов"
  },
  {
    id: 42,
    question: "Можно ли привести тип к более общему (widening)?",
    options: [
      "Нет, только к более узкому (narrowing)",
      "Да, это всегда безопасно",
      "Да, но это редко имеет смысл",
      "Только через unknown"
    ],
    correctAnswer: 2,
    explanation: "Технически можно привести к более общему типу (например, string as string | number), но это редко нужно, так как TypeScript автоматически расширяет типы при присваивании.",
    topic: "Теория приведения типов"
  },
  {
    id: 43,
    question: "Что произойдет при приведении union типа?\n\ntype Result = { success: true; data: string } | { success: false; error: string };\nconst result: Result = getResult();\nconst success = result as { success: true; data: string };",
    options: [
      "TypeScript выдаст ошибку",
      "Код скомпилируется, но может быть runtime ошибка",
      "TypeScript автоматически проверит success",
      "Приведение невозможно"
    ],
    correctAnswer: 1,
    explanation: "Приведение union типа к одному из вариантов опасно без проверки discriminant поля. Код скомпилируется, но если result.success === false, произойдет runtime ошибка при обращении к data.",
    topic: "Работа с union типами"
  },
  {
    id: 44,
    question: "Как type assertion работает с generics?\n\nfunction identity<T>(value: unknown): T {\n  return value as T;\n}",
    options: [
      "Это безопасный способ работы с generics",
      "Это небезопасно, так как нет гарантии соответствия типу T",
      "TypeScript выдаст ошибку",
      "Generics не поддерживают assertions"
    ],
    correctAnswer: 1,
    explanation: "Приведение unknown к generic типу T небезопасно, так как нет runtime проверки соответствия. Лучше использовать type guard или runtime валидацию.",
    topic: "Generics и assertions"
  },
  {
    id: 45,
    question: "Что такое 'definite assignment assertion' (!)?\n\nclass MyClass {\n  value!: string;\n}",
    options: [
      "Обязательное свойство",
      "Утверждение, что свойство будет инициализировано до использования",
      "Non-null assertion",
      "Readonly свойство"
    ],
    correctAnswer: 1,
    explanation: "Definite assignment assertion (!) сообщает TypeScript, что свойство будет инициализировано до использования, даже если это происходит не в конструкторе. Используется с осторожностью.",
    topic: "Специальные assertions"
  },
  {
    id: 46,
    question: "Можно ли использовать type casting с приватными свойствами?",
    options: [
      "Нет, приватные свойства защищены",
      "Да, через двойное приведение через unknown",
      "Да, но только в том же классе",
      "Нет, TypeScript запрещает это"
    ],
    correctAnswer: 1,
    explanation: "Private свойства — это compile-time конструкция TypeScript. Через двойное приведение (as unknown as Type) можно обойти проверки, но это нарушает инкапсуляцию.",
    topic: "Приватность и assertions"
  },
  {
    id: 47,
    question: "Как влияет strictNullChecks на type assertions?",
    options: [
      "Не влияет",
      "Делает assertions более строгими для null/undefined",
      "Запрещает assertions",
      "Требует двойных assertions"
    ],
    correctAnswer: 1,
    explanation: "С включенным strictNullChecks TypeScript более строго проверяет assertions, связанные с null/undefined, и может потребовать non-null assertion (!) или явных проверок.",
    topic: "Конфигурация TypeScript"
  },
  {
    id: 48,
    question: "Что лучше для type-safe работы с localStorage?\n\nconst data = localStorage.getItem('key');",
    options: [
      "const parsed = JSON.parse(data) as MyType",
      "Runtime валидация после parse",
      "const parsed = JSON.parse(data!) as MyType",
      "Использовать any"
    ],
    correctAnswer: 1,
    explanation: "localStorage.getItem() может вернуть null, а JSON.parse() может выбросить ошибку. Нужны проверки на null и runtime валидация структуры данных после parse.",
    topic: "Практические сценарии"
  },
  {
    id: 49,
    question: "Как type assertion взаимодействует с type inference?\n\nconst value = getSomeValue() as string;\nconst upper = value.toUpperCase();",
    options: [
      "Inference игнорирует assertion",
      "Assertion переопределяет inference",
      "Они работают вместе",
      "Возникает конфликт типов"
    ],
    correctAnswer: 1,
    explanation: "Type assertion переопределяет type inference TypeScript. После 'as string' TypeScript будет считать value строкой, независимо от того, что вернула getSomeValue().",
    topic: "Type inference"
  },
  {
    id: 50,
    question: "Какой самый безопасный способ работы с unknown типом?",
    options: [
      "Сразу привести к нужному типу через as",
      "Использовать серию type guards для проверки",
      "Привести к any, затем к нужному типу",
      "Использовать двойное приведение"
    ],
    correctAnswer: 1,
    explanation: "Самый безопасный способ — использовать type guards для проверки типа unknown значения в runtime. Это обеспечивает типобезопасность на всех уровнях.",
    topic: "Best practices"
  }
]
