import type { Question } from '@/types/question.ts'

export const typescriptGenericsQuestions: Question[] = [
  // Тема 1: Основы обобщений (generics)
  {
    id: 1,
    question: "Что такое обобщения (generics) в TypeScript?",
    options: [
      "Способ создания абстрактных классов",
      "Механизм для создания компонентов, работающих с различными типами данных",
      "Метод наследования типов",
      "Синтаксис для создания интерфейсов"
    ],
    correctAnswer: 1,
    explanation: "Generics — это механизм TypeScript, позволяющий создавать переиспользуемые компоненты (функции, классы, интерфейсы), которые могут работать с различными типами данных, сохраняя при этом типобезопасность.",
    topic: "Основы Generics"
  },
  {
    id: 2,
    question: "Какая основная проблема решается с помощью generics?",
    options: [
      "Улучшение производительности кода",
      "Сохранение типобезопасности при работе с разными типами данных",
      "Уменьшение размера бандла",
      "Упрощение синтаксиса TypeScript"
    ],
    correctAnswer: 1,
    explanation: "Generics позволяют избежать использования типа any и дублирования кода, сохраняя строгую типизацию для различных типов данных. Это обеспечивает типобезопасность и помогает находить ошибки на этапе компиляции.",
    topic: "Основы Generics"
  },
  {
    id: 3,
    question: "Как правильно объявить обобщенную функцию в TypeScript?",
    options: [
      "function identity(arg: T): T { return arg; }",
      "function identity<T>(arg: T): T { return arg; }",
      "function identity[T](arg: T): T { return arg; }",
      "function identity<T: any>(arg: T): T { return arg; }"
    ],
    correctAnswer: 1,
    explanation: "Обобщенная функция объявляется с использованием угловых скобок <T> после имени функции, где T — это параметр типа (type parameter), который может быть заменен любым конкретным типом.",
    topic: "Основы Generics"
  },
  {
    id: 4,
    question: "Что выведет TypeScript при компиляции этого кода?\n\nfunction identity<T>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}",
    options: [
      "Код скомпилируется без ошибок",
      "Ошибка: Property 'length' does not exist on type 'T'",
      "Ошибка: Generic type must extend string",
      "Код выполнится только для строк"
    ],
    correctAnswer: 1,
    explanation: "TypeScript выдаст ошибку, потому что не все типы имеют свойство length. Обобщенный тип T не гарантирует наличие этого свойства. Для решения нужно использовать ограничения (constraints).",
    topic: "Основы Generics"
  },
  {
    id: 5,
    question: "Как вызвать обобщенную функцию с явным указанием типа?",
    options: [
      "identity(string)('Hello')",
      "identity<string>('Hello')",
      "identity['string']('Hello')",
      "identity::string('Hello')"
    ],
    correctAnswer: 1,
    explanation: "Обобщенная функция вызывается с явным указанием типа через угловые скобки: identity<string>('Hello'). Хотя часто TypeScript может вывести тип автоматически: identity('Hello').",
    topic: "Основы Generics"
  },
  {
    id: 6,
    question: "Может ли TypeScript автоматически вывести тип generic-параметра?",
    options: [
      "Нет, тип всегда нужно указывать явно",
      "Да, на основе переданных аргументов",
      "Только для примитивных типов",
      "Только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "TypeScript может автоматически вывести тип generic-параметра на основе переданных аргументов. Например: identity('Hello') — TypeScript выведет, что T = string.",
    topic: "Основы Generics"
  },

  // Тема 2: Generics в различных конструкциях
  {
    id: 7,
    question: "Как объявить обобщенный интерфейс в TypeScript?",
    options: [
      "interface Box[T] { value: T }",
      "interface Box<T> { value: T }",
      "interface Box(T) { value: T }",
      "interface Box<T: any> { value: T }"
    ],
    correctAnswer: 1,
    explanation: "Обобщенный интерфейс объявляется с параметром типа в угловых скобках: interface Box<T> { value: T }. После этого можно использовать: Box<number>, Box<string> и т.д.",
    topic: "Generics в конструкциях"
  },
  {
    id: 8,
    question: "Как создать обобщенный класс в TypeScript?",
    options: [
      "class Container[T] { constructor(public value: T) {} }",
      "class Container<T> { constructor(public value: T) {} }",
      "class Container(T) { constructor(public value: T) {} }",
      "class<T> Container { constructor(public value: T) {} }"
    ],
    correctAnswer: 1,
    explanation: "Обобщенный класс объявляется с параметром типа после имени класса: class Container<T>. Это позволяет создавать экземпляры с разными типами: new Container<number>(42).",
    topic: "Generics в конструкциях"
  },
  {
    id: 9,
    question: "Можно ли использовать несколько параметров типа в generics?",
    options: [
      "Нет, только один параметр",
      "Да, можно использовать любое количество",
      "Максимум два параметра",
      "Только в классах"
    ],
    correctAnswer: 1,
    explanation: "TypeScript позволяет использовать несколько параметров типа: function pair<T, U>(first: T, second: U): [T, U]. Можно использовать любое количество параметров типа.",
    topic: "Generics в конструкциях"
  },
  {
    id: 10,
    question: "Что такое обобщенный тип (generic type alias)?",
    options: [
      "Синоним для interface",
      "Псевдоним типа с параметрами типа",
      "Способ создания union типов",
      "Альтернатива enum"
    ],
    correctAnswer: 1,
    explanation: "Generic type alias — это псевдоним типа с параметрами: type Container<T> = { value: T }. Это позволяет создавать переиспользуемые типы с различными конкретными типами.",
    topic: "Generics в конструкциях"
  },

  // Тема 3: Ограничения (constraints)
  {
    id: 11,
    question: "Для чего используется ключевое слово 'extends' в generics?",
    options: [
      "Для наследования классов",
      "Для наложения ограничений на параметры типа",
      "Для расширения интерфейсов",
      "Для создания union типов"
    ],
    correctAnswer: 1,
    explanation: "Ключевое слово extends в контексте generics используется для наложения ограничений (constraints) на параметры типа: function getLength<T extends { length: number }>(arg: T). Это гарантирует, что T имеет свойство length.",
    topic: "Ограничения Generics"
  },
  {
    id: 12,
    question: "Что делает следующий код?\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K) {\n  return obj[key];\n}",
    options: [
      "Создает копию объекта",
      "Получает значение свойства объекта с типобезопасностью",
      "Удаляет свойство из объекта",
      "Проверяет существование свойства"
    ],
    correctAnswer: 1,
    explanation: "Эта функция безопасно извлекает значение свойства из объекта. K extends keyof T гарантирует, что key является действительным ключом объекта obj, обеспечивая типобезопасность.",
    topic: "Ограничения Generics"
  },
  {
    id: 13,
    question: "Что такое 'keyof' в TypeScript?",
    options: [
      "Оператор для получения значений объекта",
      "Оператор для получения union типа всех ключей объекта",
      "Способ создания нового ключа",
      "Метод проверки наличия ключа"
    ],
    correctAnswer: 1,
    explanation: "keyof — это оператор индексного типа, который создает union тип из всех ключей типа. Например, для type Person = { name: string; age: number }, keyof Person даст 'name' | 'age'.",
    topic: "Ограничения Generics"
  },
  {
    id: 14,
    question: "Можно ли ограничить generic параметр несколькими типами?",
    options: [
      "Нет, только один тип",
      "Да, используя extends с union или intersection типами",
      "Только через interface",
      "Только в классах"
    ],
    correctAnswer: 1,
    explanation: "Можно использовать extends с union типами: <T extends string | number> или intersection типами: <T extends HasName & HasAge> для наложения множественных ограничений.",
    topic: "Ограничения Generics"
  },
  {
    id: 15,
    question: "Что произойдет при попытке использовать несуществующий ключ с 'keyof'?\n\ntype Person = { name: string };\nfunction getProp<K extends keyof Person>(key: K) {}\ngetProp('age');",
    options: [
      "Код скомпилируется",
      "Ошибка компиляции: Argument 'age' is not assignable to parameter of type 'name'",
      "Runtime ошибка",
      "Вернет undefined"
    ],
    correctAnswer: 1,
    explanation: "TypeScript выдаст ошибку компиляции, потому что 'age' не является ключом типа Person. K extends keyof Person ограничивает K только существующими ключами ('name').",
    topic: "Ограничения Generics"
  },

  // Тема 4: Преимущества generics
  {
    id: 16,
    question: "Какое главное преимущество generics перед использованием типа 'any'?",
    options: [
      "Лучшая производительность",
      "Сохранение информации о типе и типобезопасность",
      "Меньший размер кода",
      "Более простой синтаксис"
    ],
    correctAnswer: 1,
    explanation: "В отличие от any, generics сохраняют информацию о типе на протяжении всего кода, обеспечивая типобезопасность и автодополнение. any фактически отключает проверку типов.",
    topic: "Преимущества Generics"
  },
  {
    id: 17,
    question: "Как generics помогают избежать дублирования кода?",
    options: [
      "Автоматически создают копии функций",
      "Позволяют написать одну функцию для разных типов данных",
      "Генерируют код во время компиляции",
      "Используют рефлексию"
    ],
    correctAnswer: 1,
    explanation: "Generics позволяют написать одну универсальную функцию или класс, которые работают с любыми типами, вместо создания отдельных версий для каждого типа данных.",
    topic: "Преимущества Generics"
  },
  {
    id: 18,
    question: "Какое преимущество дают generics при работе с массивами?",
    options: [
      "Ускоряют операции с массивами",
      "Обеспечивают типобезопасность элементов массива",
      "Автоматически сортируют массивы",
      "Уменьшают размер массивов в памяти"
    ],
    correctAnswer: 1,
    explanation: "Array<T> или T[] обеспечивают типобезопасность: TypeScript знает тип элементов и может проверять операции. Например, Array<number> гарантирует, что массив содержит только числа.",
    topic: "Преимущества Generics"
  },
  {
    id: 19,
    question: "Почему generics важны для создания библиотек и API?",
    options: [
      "Упрощают документацию",
      "Делают API гибким и типобезопасным одновременно",
      "Уменьшают размер библиотеки",
      "Ускоряют выполнение кода"
    ],
    correctAnswer: 1,
    explanation: "Generics позволяют создавать гибкие API, которые работают с любыми типами данных пользователя, сохраняя при этом полную типобезопасность и автодополнение.",
    topic: "Преимущества Generics"
  },

  // Тема 5: Практическое применение
  {
    id: 20,
    question: "Как создать универсальную функцию для работы с Promise?",
    options: [
      "function wrapPromise(value: any): Promise<any>",
      "function wrapPromise<T>(value: T): Promise<T>",
      "function wrapPromise[T](value: T): Promise[T]",
      "async function wrapPromise(value: T): T"
    ],
    correctAnswer: 1,
    explanation: "function wrapPromise<T>(value: T): Promise<T> создает типобезопасную функцию, которая оборачивает любое значение в Promise, сохраняя информацию о типе значения.",
    topic: "Практическое применение"
  },
  {
    id: 21,
    question: "Как правильно типизировать функцию, возвращающую первый элемент массива?",
    options: [
      "function first(arr: any[]): any",
      "function first<T>(arr: T[]): T | undefined",
      "function first(arr: Array): any",
      "function first<T>(arr: T[]): T"
    ],
    correctAnswer: 1,
    explanation: "function first<T>(arr: T[]): T | undefined корректно типизирует функцию: она принимает массив любого типа и возвращает элемент этого типа или undefined (если массив пуст).",
    topic: "Практическое применение"
  },
  {
    id: 22,
    question: "Как создать обобщенный компонент React с правильной типизацией пропсов?",
    options: [
      "function Component(props: any) { }",
      "function Component<T>(props: { data: T }) { }",
      "function Component[T](props: { data: T }) { }",
      "function Component<T: any>(props: T) { }"
    ],
    correctAnswer: 1,
    explanation: "function Component<T>(props: { data: T }) создает обобщенный React-компонент, который может работать с любым типом данных в пропсе data, сохраняя типобезопасность.",
    topic: "Практическое применение"
  },
  {
    id: 23,
    question: "Как типизировать функцию обратного вызова (callback) с generics?",
    options: [
      "function process(callback: (value: any) => void)",
      "function process<T>(value: T, callback: (value: T) => void)",
      "function process(callback: Function)",
      "function process<T>(callback: T => void)"
    ],
    correctAnswer: 1,
    explanation: "function process<T>(value: T, callback: (value: T) => void) правильно типизирует callback, гарантируя, что функция обратного вызова получит значение того же типа, что и параметр value.",
    topic: "Практическое применение"
  },

  // Тема 6: Продвинутые концепции
  {
    id: 24,
    question: "Что такое дефолтные параметры типа в generics?",
    options: [
      "Обязательные параметры типа",
      "Параметры типа со значением по умолчанию",
      "Параметры, которые всегда any",
      "Параметры для примитивных типов"
    ],
    correctAnswer: 1,
    explanation: "Дефолтные параметры типа позволяют указать значение по умолчанию: type Container<T = string> = { value: T }. Если тип не указан явно, будет использован string.",
    topic: "Продвинутые концепции"
  },
  {
    id: 25,
    question: "Что делает следующий тип?\n\ntype Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n}",
    options: [
      "Делает все свойства типа T опциональными",
      "Делает все свойства типа T readonly",
      "Удаляет все свойства из T",
      "Создает копию типа T"
    ],
    correctAnswer: 1,
    explanation: "Это mapped type, который делает все свойства типа T readonly. [P in keyof T] перебирает все ключи T, а readonly делает каждое свойство неизменяемым.",
    topic: "Продвинутые концепции"
  },
  {
    id: 26,
    question: "Что такое conditional types в контексте generics?",
    options: [
      "Типы с условными операторами",
      "Типы, которые выбираются на основе условия",
      "Типы для if-else выражений",
      "Nullable типы"
    ],
    correctAnswer: 1,
    explanation: "Conditional types позволяют выбирать тип на основе условия: type IsString<T> = T extends string ? true : false. Это мощный инструмент для создания сложных типов.",
    topic: "Продвинутые концепции"
  },
  {
    id: 27,
    question: "Как работает 'infer' в conditional types?",
    options: [
      "Проверяет наличие свойства",
      "Извлекает (выводит) тип из другого типа",
      "Создает новый тип",
      "Объединяет типы"
    ],
    correctAnswer: 1,
    explanation: "infer позволяет извлечь и вывести тип: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never извлекает тип возвращаемого значения функции.",
    topic: "Продвинутые концепции"
  },
  {
    id: 28,
    question: "Что такое generic constraints в контексте конструкторов?",
    options: [
      "Ограничения для создания объектов",
      "Ограничение типа конструктором: T extends new (...args: any[]) => any",
      "Проверка instanceof",
      "Типизация параметров конструктора"
    ],
    correctAnswer: 1,
    explanation: "Generic constraint для конструктора: <T extends new (...args: any[]) => any> гарантирует, что T является конструктором (классом), который можно вызвать с new.",
    topic: "Продвинутые концепции"
  },

  // Тема 7: Лучшие практики
  {
    id: 29,
    question: "Когда следует использовать generics вместо явных типов?",
    options: [
      "Всегда использовать generics",
      "Когда нужна переиспользуемость для разных типов с сохранением типобезопасности",
      "Только в библиотеках",
      "Никогда не использовать"
    ],
    correctAnswer: 1,
    explanation: "Generics следует использовать, когда нужно создать переиспользуемый код для разных типов данных, сохраняя типобезопасность. Для конкретных случаев лучше использовать явные типы.",
    topic: "Лучшие практики"
  },
  {
    id: 30,
    question: "Какое соглашение об именовании параметров типа является стандартным?",
    options: [
      "Использовать полные слова: Type, Value",
      "Использовать одну заглавную букву: T, K, V",
      "Использовать snake_case: type_param",
      "Использовать числа: T1, T2"
    ],
    correctAnswer: 1,
    explanation: "Стандартное соглашение — использовать одну заглавную букву: T (Type), K (Key), V (Value), E (Element), R (Return). Для большей ясности можно использовать TData, TResponse и т.д.",
    topic: "Лучшие практики"
  },
  {
    id: 31,
    question: "Что лучше: много параметров типа или сложная структура данных?",
    options: [
      "Всегда использовать много параметров",
      "Балансировать: избегать избыточной сложности, группировать связанные типы",
      "Никогда не использовать больше одного параметра",
      "Использовать только any"
    ],
    correctAnswer: 1,
    explanation: "Следует балансировать между гибкостью и простотой. Слишком много параметров типа усложняют код. Лучше группировать связанные типы в объекты или использовать constraints.",
    topic: "Лучшие практики"
  },
  {
    id: 32,
    question: "Когда НЕ следует использовать generics?",
    options: [
      "Никогда — generics всегда лучше",
      "Когда работаете с конкретными, известными типами без нужды в переиспользовании",
      "В React компонентах",
      "В функциях с параметрами"
    ],
    correctAnswer: 1,
    explanation: "Не стоит использовать generics для кода, который работает с конкретными типами и не требует переиспользования. Излишнее использование generics усложняет код без пользы.",
    topic: "Лучшие практики"
  },

  // Тема 8: Типичные ошибки
  {
    id: 33,
    question: "Какая проблема с этим кодом?\n\nfunction merge<T>(obj1: T, obj2: T): T {\n  return { ...obj1, ...obj2 };\n}",
    options: [
      "Нет проблем",
      "Возвращаемый тип должен быть T & T или объединением типов",
      "Нельзя использовать spread оператор",
      "T должно быть object"
    ],
    correctAnswer: 1,
    explanation: "Функция объединяет два объекта, но возвращаемый тип T не отражает это. Правильнее: function merge<T, U>(obj1: T, obj2: U): T & U или использовать intersection type.",
    topic: "Типичные ошибки"
  },
  {
    id: 34,
    question: "Почему этот код может быть проблемным?\n\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst result = identity({ name: 'John' });",
    options: [
      "Код полностью корректен",
      "TypeScript выведет слишком широкий тип { name: string } вместо литерального",
      "Функция должна быть async",
      "Нужно явно указать generic параметр"
    ],
    correctAnswer: 0,
    explanation: "Этот код корректен. TypeScript правильно выведет тип { name: string }. Если нужен более точный (literal) тип, можно использовать const assertion: identity({ name: 'John' } as const).",
    topic: "Типичные ошибки"
  },
  {
    id: 35,
    question: "В чем ошибка этого кода?\n\nclass Container<T> {\n  private static instance: Container<T>;\n}",
    options: [
      "Нет ошибки",
      "Статические члены не могут ссылаться на параметры типа класса",
      "T должно быть в скобках",
      "Нужно использовать public вместо private"
    ],
    correctAnswer: 1,
    explanation: "Статические члены класса не могут использовать параметры типа класса, так как они принадлежат классу в целом, а не конкретному экземпляру с определенным типом.",
    topic: "Типичные ошибки"
  },

  // Тема 9: Сравнение подходов
  {
    id: 36,
    question: "В чем разница между <T extends object> и <T extends {}>?",
    options: [
      "Никакой разницы",
      "object исключает примитивы, {} включает всё кроме null и undefined",
      "{} более строгий тип",
      "object включает массивы, {} нет"
    ],
    correctAnswer: 1,
    explanation: "object исключает примитивные типы (string, number, boolean), а {} принимает всё кроме null и undefined, включая примитивы. Для объектов лучше использовать Record<string, unknown>.",
    topic: "Сравнение подходов"
  },
  {
    id: 37,
    question: "Когда использовать generic constraints вместо union types?",
    options: [
      "Всегда использовать union types",
      "Когда нужна гибкость и связь между входными и выходными типами",
      "Только для примитивных типов",
      "Никогда"
    ],
    correctAnswer: 1,
    explanation: "Generic constraints (<T extends string | number>) сохраняют конкретный тип, переданный функции. Union type (arg: string | number) теряет эту информацию. Constraints лучше для сохранения связи типов.",
    topic: "Сравнение подходов"
  },
  {
    id: 38,
    question: "В чем преимущество generic type alias перед generic interface?",
    options: [
      "Type alias быстрее работает",
      "Type alias может представлять union, primitive, tuple типы",
      "Interface всегда лучше",
      "Нет преимуществ"
    ],
    correctAnswer: 1,
    explanation: "Generic type alias более гибкий: type Container<T> = T | T[] | Promise<T>. Interface может представлять только объектные типы. Однако interface может быть расширен и имеет лучшую поддержку declaration merging.",
    topic: "Сравнение подходов"
  },

  // Тема 10: Реальные примеры
  {
    id: 39,
    question: "Как правильно типизировать функцию fetch с generics?",
    options: [
      "async function fetchData(url: string): Promise<any>",
      "async function fetchData<T>(url: string): Promise<T>",
      "async function fetchData<T>(url: string): T",
      "function fetchData<T = any>(url: string): Promise<T>"
    ],
    correctAnswer: 1,
    explanation: "async function fetchData<T>(url: string): Promise<T> позволяет вызывающему коду указать ожидаемый тип ответа: const user = await fetchData<User>('/api/user').",
    topic: "Реальные примеры"
  },
  {
    id: 40,
    question: "Как типизировать функцию для глубокого клонирования объекта?",
    options: [
      "function deepClone(obj: object): object",
      "function deepClone<T>(obj: T): T",
      "function deepClone<T extends object>(obj: T): T",
      "function deepClone(obj: any): any"
    ],
    correctAnswer: 1,
    explanation: "function deepClone<T>(obj: T): T правильно типизирует функцию клонирования: она принимает значение любого типа и возвращает значение того же типа. Constraint extends object может быть слишком ограничивающим.",
    topic: "Реальные примеры"
  }
]
