import type { Question } from '@/types/question.ts'

export const typescriptInterfacesTypesQuestions: Question[] = [
  // Тема 1: Основы Interfaces и Types
  {
    id: 1,
    question: "В чем основное синтаксическое различие между interface и type?",
    options: [
      "Interface использует знак =, type не использует",
      "Type использует знак =, interface не использует",
      "Никакой разницы в синтаксисе нет",
      "Interface требует ключевое слово declare"
    ],
    correctAnswer: 1,
    explanation: "Type alias использует знак равенства: type Person = { name: string }, в то время как interface объявляется без него: interface Person { name: string }.",
    topic: "Основы Interfaces и Types"
  },
  {
    id: 2,
    question: "Что из перечисленного можно описать только с помощью type, но не с помощью interface?",
    options: [
      "Объекты с методами",
      "Union типы и примитивы",
      "Наследование от других типов",
      "Опциональные свойства"
    ],
    correctAnswer: 1,
    explanation: "Type может описывать union типы (string | number), примитивы (type Name = string), tuple и другие сложные типы, которые interface описать не может.",
    topic: "Основы Interfaces и Types"
  },
  {
    id: 3,
    question: "Что такое declaration merging в контексте interface?",
    options: [
      "Объединение двух interface в один через &",
      "Автоматическое слияние нескольких объявлений interface с одинаковым именем",
      "Наследование одного interface от другого",
      "Копирование свойств из одного interface в другой"
    ],
    correctAnswer: 1,
    explanation: "Declaration merging — это возможность объявить interface с одинаковым именем несколько раз, и TypeScript автоматически объединит их в один. Это работает только для interface, но не для type.",
    topic: "Основы Interfaces и Types"
  },
  {
    id: 4,
    question: "Какой из вариантов правильно описывает union тип?",
    options: [
      "interface Result = Success | Error",
      "type Result = Success | Error",
      "interface Result { Success | Error }",
      "type Result { Success | Error }"
    ],
    correctAnswer: 1,
    explanation: "Union типы можно создать только с помощью type alias: type Result = Success | Error. Interface не поддерживает union типы.",
    topic: "Основы Interfaces и Types"
  },
  {
    id: 5,
    question: "Можно ли использовать interface для описания функционального типа?",
    options: [
      "Нет, только type может описывать функции",
      "Да, interface может описывать call signature",
      "Только для arrow функций",
      "Только с использованием ключевого слова function"
    ],
    correctAnswer: 1,
    explanation: "Interface может описывать функциональные типы через call signature: interface Greeter { (name: string): string }. Однако для функций обычно удобнее использовать type.",
    topic: "Основы Interfaces и Types"
  },

  // Тема 2: Наследование и расширение
  {
    id: 6,
    question: "Как interface наследуется от другого interface?",
    options: [
      "interface Child = Parent & { ... }",
      "interface Child extends Parent { ... }",
      "interface Child implements Parent { ... }",
      "interface Child: Parent { ... }"
    ],
    correctAnswer: 1,
    explanation: "Interface использует ключевое слово extends для наследования: interface Child extends Parent { additionalProp: string }.",
    topic: "Наследование и расширение"
  },
  {
    id: 7,
    question: "Как объединить два type alias в один?",
    options: [
      "type Combined extends Type1, Type2",
      "type Combined = Type1 & Type2",
      "type Combined implements Type1, Type2",
      "type Combined = Type1 + Type2"
    ],
    correctAnswer: 1,
    explanation: "Type alias объединяются с помощью intersection оператора &: type Combined = Type1 & Type2.",
    topic: "Наследование и расширение"
  },
  {
    id: 8,
    question: "Может ли interface наследоваться от type alias?",
    options: [
      "Нет, это невозможно",
      "Да, если type описывает объект",
      "Только если type описывает примитив",
      "Только через промежуточный interface"
    ],
    correctAnswer: 1,
    explanation: "Interface может наследоваться от type alias, если этот type описывает объектный тип: type Animal = { name: string }; interface Dog extends Animal { breed: string }.",
    topic: "Наследование и расширение"
  },
  {
    id: 9,
    question: "Что произойдет при множественном наследовании interface с конфликтующими свойствами?",
    options: [
      "Последний interface переопределит предыдущие",
      "TypeScript выдаст ошибку о конфликте типов",
      "Свойства автоматически объединятся в union",
      "Первый interface будет иметь приоритет"
    ],
    correctAnswer: 1,
    explanation: "Если при множественном наследовании interface имеют конфликтующие свойства с несовместимыми типами, TypeScript выдаст ошибку компиляции.",
    topic: "Наследование и расширение"
  },
  {
    id: 10,
    question: "Какой результат даст следующий код?\n\ntype A = { x: number }\ntype B = { x: string }\ntype C = A & B",
    options: [
      "C будет иметь x: number",
      "C будет иметь x: string",
      "C будет иметь x: never (невозможный тип)",
      "Ошибка компиляции"
    ],
    correctAnswer: 2,
    explanation: "Intersection двух несовместимых типов для одного свойства приводит к типу never, так как не существует значения, которое одновременно является и number, и string.",
    topic: "Наследование и расширение"
  },

  // Тема 3: Индексные сигнатуры и mapped types
  {
    id: 11,
    question: "Что такое индексная сигнатура (index signature)?",
    options: [
      "Порядковый номер свойства в объекте",
      "Способ описать объект с динамическими ключами определенного типа",
      "Метод доступа к элементам массива",
      "Уникальный идентификатор типа"
    ],
    correctAnswer: 1,
    explanation: "Индексная сигнатура позволяет описать объект с произвольными ключами определенного типа: interface StringMap { [key: string]: number }.",
    topic: "Индексные сигнатуры"
  },
  {
    id: 12,
    question: "Какие типы можно использовать для ключей в индексной сигнатуре?",
    options: [
      "Любые типы",
      "Только string, number и symbol",
      "Только string и number",
      "Только string"
    ],
    correctAnswer: 2,
    explanation: "В индексной сигнатуре можно использовать только string, number или symbol (с TypeScript 4.4+) как типы ключей.",
    topic: "Индексные сигнатуры"
  },
  {
    id: 13,
    question: "Что такое mapped type в TypeScript?",
    options: [
      "Тип, привязанный к Map структуре данных",
      "Тип, который создает новый тип путем трансформации свойств существующего типа",
      "Тип для работы с географическими картами",
      "Тип, описывающий функции map"
    ],
    correctAnswer: 1,
    explanation: "Mapped type создает новый тип, трансформируя свойства существующего типа: type Readonly<T> = { readonly [P in keyof T]: T[P] }.",
    topic: "Индексные сигнатуры"
  },
  {
    id: 14,
    question: "Что делает utility type Partial<T>?",
    options: [
      "Делает все свойства типа T обязательными",
      "Делает все свойства типа T опциональными",
      "Удаляет половину свойств из типа T",
      "Создает union из всех свойств типа T"
    ],
    correctAnswer: 1,
    explanation: "Partial<T> — это встроенный mapped type, который делает все свойства типа T опциональными: type Partial<T> = { [P in keyof T]?: T[P] }.",
    topic: "Индексные сигнатуры"
  },
  {
    id: 15,
    question: "Как работает utility type Record<K, T>?",
    options: [
      "Записывает значение T по ключу K",
      "Создает тип объекта с ключами типа K и значениями типа T",
      "Создает массив из K элементов типа T",
      "Конвертирует K в T"
    ],
    correctAnswer: 1,
    explanation: "Record<K, T> создает объектный тип с ключами типа K и значениями типа T: type Record<K extends keyof any, T> = { [P in K]: T }.",
    topic: "Индексные сигнатуры"
  },

  // Тема 4: Опциональные и readonly свойства
  {
    id: 16,
    question: "Чем отличается свойство name?: string от name: string | undefined?",
    options: [
      "Никакой разницы нет",
      "Первое может отсутствовать, второе должно быть явно определено (может быть undefined)",
      "Первое обязательно, второе опционально",
      "Второе может отсутствовать, первое должно быть undefined"
    ],
    correctAnswer: 1,
    explanation: "name?: string означает, что свойство может отсутствовать в объекте. name: string | undefined требует наличия свойства, но его значение может быть undefined.",
    topic: "Опциональные свойства"
  },
  {
    id: 17,
    question: "Что делает модификатор readonly?",
    options: [
      "Делает свойство приватным",
      "Запрещает изменение свойства после инициализации",
      "Делает свойство доступным только для чтения из других файлов",
      "Оптимизирует производительность чтения"
    ],
    correctAnswer: 1,
    explanation: "readonly делает свойство доступным только для чтения — его нельзя изменить после создания объекта: interface Point { readonly x: number }.",
    topic: "Опциональные свойства"
  },
  {
    id: 18,
    question: "Что делает utility type Required<T>?",
    options: [
      "Удаляет необязательные свойства из T",
      "Делает все свойства типа T обязательными",
      "Проверяет наличие всех свойств в T",
      "Создает копию T с обязательными полями"
    ],
    correctAnswer: 1,
    explanation: "Required<T> делает все свойства типа T обязательными, удаляя модификатор ?: type Required<T> = { [P in keyof T]-?: T[P] }.",
    topic: "Опциональные свойства"
  },
  {
    id: 19,
    question: "Что делает utility type Readonly<T>?",
    options: [
      "Делает объект T неизменяемым в runtime",
      "Добавляет модификатор readonly ко всем свойствам типа T",
      "Создает константу из T",
      "Блокирует доступ к T"
    ],
    correctAnswer: 1,
    explanation: "Readonly<T> добавляет модификатор readonly ко всем свойствам: type Readonly<T> = { readonly [P in keyof T]: T[P] }. Это проверка только на уровне типов.",
    topic: "Опциональные свойства"
  },
  {
    id: 20,
    question: "Можно ли изменить readonly свойство через JavaScript в runtime?",
    options: [
      "Нет, readonly блокирует изменения навсегда",
      "Да, readonly — это только проверка типов TypeScript",
      "Только с использованием Reflect API",
      "Только через Object.defineProperty"
    ],
    correctAnswer: 1,
    explanation: "readonly — это только проверка на уровне типов TypeScript. В скомпилированном JavaScript коде эти ограничения не существуют, и свойства можно изменить.",
    topic: "Опциональные свойства"
  },

  // Тема 5: Различия в поведении и использовании
  {
    id: 21,
    question: "Поддерживает ли type alias declaration merging?",
    options: [
      "Да, так же как interface",
      "Нет, это вызовет ошибку 'Duplicate identifier'",
      "Только для объектных типов",
      "Только в режиме strict"
    ],
    correctAnswer: 1,
    explanation: "Type alias не поддерживает declaration merging. Попытка объявить type с одинаковым именем дважды приведет к ошибке 'Duplicate identifier'.",
    topic: "Различия в использовании"
  },
  {
    id: 22,
    question: "В каком случае interface предпочтительнее type?",
    options: [
      "Для описания union типов",
      "Для публичных API и библиотек, где важна расширяемость",
      "Для tuple типов",
      "Для примитивных типов"
    ],
    correctAnswer: 1,
    explanation: "Interface лучше подходит для публичных API, так как поддерживает declaration merging, что позволяет пользователям расширять типы библиотеки.",
    topic: "Различия в использовании"
  },
  {
    id: 23,
    question: "Какое сообщение об ошибке обычно более информативно?",
    options: [
      "Для type alias",
      "Для interface",
      "Одинаково информативны",
      "Зависит от версии TypeScript"
    ],
    correctAnswer: 1,
    explanation: "TypeScript обычно показывает более понятные сообщения об ошибках для interface, показывая имя интерфейса, в то время как для type может показать всю структуру типа.",
    topic: "Различия в использовании"
  },
  {
    id: 24,
    question: "Что из перечисленного можно описать и через interface, и через type?",
    options: [
      "Union типы",
      "Объектные типы с методами",
      "Tuple типы",
      "Mapped types"
    ],
    correctAnswer: 1,
    explanation: "Объектные типы с методами и свойствами можно описать как через interface, так и через type. Union, tuple и mapped types доступны только для type.",
    topic: "Различия в использовании"
  },

  // Тема 6: Продвинутые паттерны
  {
    id: 25,
    question: "Что такое conditional type в TypeScript?",
    options: [
      "Тип, который зависит от условия if-else",
      "Тип, который выбирается на основе условия: T extends U ? X : Y",
      "Тип для описания условных операторов",
      "Тип, который существует только при определенных условиях"
    ],
    correctAnswer: 1,
    explanation: "Conditional type использует тернарный оператор для выбора типа на основе условия: type IsString<T> = T extends string ? true : false.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 26,
    question: "Что делает utility type Pick<T, K>?",
    options: [
      "Выбирает случайное свойство из T",
      "Создает новый тип, выбирая из T только свойства K",
      "Удаляет свойства K из типа T",
      "Конвертирует T в массив свойств K"
    ],
    correctAnswer: 1,
    explanation: "Pick<T, K> создает новый тип, выбирая из T только указанные свойства K: type Pick<T, K extends keyof T> = { [P in K]: T[P] }.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 27,
    question: "Что делает utility type Omit<T, K>?",
    options: [
      "Пропускает первые K свойств из T",
      "Создает новый тип, исключая из T свойства K",
      "Делает свойства K опциональными",
      "Переименовывает свойства K в T"
    ],
    correctAnswer: 1,
    explanation: "Omit<T, K> создает новый тип, исключая из T указанные свойства K: type Omit<T, K> = Pick<T, Exclude<keyof T, K>>.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 28,
    question: "Что такое template literal type?",
    options: [
      "Тип для работы с template strings",
      "Тип, который создает строковые литералы из комбинаций других типов",
      "Тип для описания React компонентов",
      "Шаблон для создания новых типов"
    ],
    correctAnswer: 1,
    explanation: "Template literal type позволяет создавать строковые литеральные типы через интерполяцию: type EventName<T> = `on${Capitalize<T>}Changed`.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 29,
    question: "Что делает utility type Extract<T, U>?",
    options: [
      "Извлекает значения из T по ключам U",
      "Извлекает из T только те типы, которые assignable к U",
      "Создает массив из T и U",
      "Конвертирует T в тип U"
    ],
    correctAnswer: 1,
    explanation: "Extract<T, U> извлекает из union типа T только те типы, которые assignable к U: type Extract<T, U> = T extends U ? T : never.",
    topic: "Продвинутые паттерны"
  },
  {
    id: 30,
    question: "Что делает utility type Exclude<T, U>?",
    options: [
      "Исключает U из массива T",
      "Исключает из union типа T те типы, которые assignable к U",
      "Создает intersection T и U",
      "Блокирует использование типа U в T"
    ],
    correctAnswer: 1,
    explanation: "Exclude<T, U> исключает из union типа T те типы, которые assignable к U: type Exclude<T, U> = T extends U ? never : T.",
    topic: "Продвинутые паттерны"
  },

  // Тема 7: Generic constraints
  {
    id: 31,
    question: "Что такое generic constraint?",
    options: [
      "Ограничение на количество generic параметров",
      "Ограничение на тип, который может быть использован как generic параметр",
      "Ограничение на использование generics в коде",
      "Размер generic типа"
    ],
    correctAnswer: 1,
    explanation: "Generic constraint ограничивает типы, которые могут быть использованы как generic параметры: function getProperty<T extends object>(obj: T) { }.",
    topic: "Generic constraints"
  },
  {
    id: 32,
    question: "Как правильно написать constraint, что T должен иметь свойство length?",
    options: [
      "function fn<T: { length: number }>(arg: T)",
      "function fn<T extends { length: number }>(arg: T)",
      "function fn<T = { length: number }>(arg: T)",
      "function fn<T implements { length: number }>(arg: T)"
    ],
    correctAnswer: 1,
    explanation: "Для constraint используется ключевое слово extends: function fn<T extends { length: number }>(arg: T) { return arg.length; }.",
    topic: "Generic constraints"
  },
  {
    id: 33,
    question: "Что означает constraint <T extends keyof U>?",
    options: [
      "T должен быть объектом",
      "T должен быть одним из ключей типа U",
      "T должен наследоваться от U",
      "T должен содержать все ключи из U"
    ],
    correctAnswer: 1,
    explanation: "T extends keyof U означает, что T должен быть одним из ключей (свойств) типа U. Часто используется в функциях для безопасного доступа к свойствам.",
    topic: "Generic constraints"
  },
  {
    id: 34,
    question: "Можно ли использовать несколько constraints для одного generic параметра?",
    options: [
      "Нет, только один constraint",
      "Да, через intersection: T extends A & B",
      "Да, через union: T extends A | B",
      "Только с использованием interface"
    ],
    correctAnswer: 1,
    explanation: "Множественные constraints можно объединить через intersection: function fn<T extends Interface1 & Interface2>(arg: T) { }.",
    topic: "Generic constraints"
  },
  {
    id: 35,
    question: "Что выведет тип:\n\ntype Test<T extends string | number> = T extends string ? 'string' : 'number';\ntype Result = Test<'hello'>;",
    options: [
      "'string' | 'number'",
      "'string'",
      "'number'",
      "never"
    ],
    correctAnswer: 1,
    explanation: "Conditional type проверяет, что 'hello' (string literal) extends string, что истинно, поэтому возвращается 'string'.",
    topic: "Generic constraints"
  },

  // Тема 8: Практические примеры
  {
    id: 36,
    question: "Какой подход лучше для описания конфигурационного объекта?",
    options: [
      "type Config = string | number | boolean",
      "interface Config { [key: string]: any }",
      "type Config = Record<string, string | number | boolean>",
      "interface Config extends Object"
    ],
    correctAnswer: 2,
    explanation: "Record<string, string | number | boolean> явно указывает типы ключей и значений, что делает тип безопаснее и понятнее, чем использование any.",
    topic: "Практические примеры"
  },
  {
    id: 37,
    question: "Как правильно типизировать объект с динамическими ключами, но известными значениями?",
    options: [
      "{ [key: string]: ValueType }",
      "Map<string, ValueType>",
      "Record<string, ValueType>",
      "Все варианты правильные"
    ],
    correctAnswer: 3,
    explanation: "Все три варианта корректны, но Record<string, ValueType> — самый идиоматичный для TypeScript, индексная сигнатура — для совместимости с interface, Map — для runtime структуры данных.",
    topic: "Практические примеры"
  },
  {
    id: 38,
    question: "Как типизировать функцию, которая принимает объект и ключ этого объекта?",
    options: [
      "function get(obj: object, key: string)",
      "function get<T>(obj: T, key: keyof T)",
      "function get<T, K>(obj: T, key: K)",
      "function get(obj: any, key: any)"
    ],
    correctAnswer: 1,
    explanation: "function get<T>(obj: T, key: keyof T) гарантирует, что key действительно является ключом объекта obj, обеспечивая типобезопасность.",
    topic: "Практические примеры"
  },
  {
    id: 39,
    question: "Как создать тип, который делает определенные свойства опциональными?",
    options: [
      "type PartialBy<T, K> = Partial<T> & Pick<T, K>",
      "type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>",
      "type PartialBy<T, K> = T & Partial<K>",
      "Использовать только встроенный Partial<T>"
    ],
    correctAnswer: 1,
    explanation: "PartialBy<T, K> = Omit<T, K> & Partial<Pick<T, K>> создает тип, где указанные свойства K становятся опциональными, а остальные остаются как есть.",
    topic: "Практические примеры"
  },
  {
    id: 40,
    question: "Что лучше использовать для описания DTO (Data Transfer Object)?",
    options: [
      "Только type",
      "Только interface",
      "Зависит от конкретного случая и стиля команды",
      "class с декораторами"
    ],
    correctAnswer: 2,
    explanation: "Выбор между type и interface для DTO зависит от нужд проекта: interface лучше для расширяемых структур и публичных API, type — для сложных типов с union/intersection. Оба варианта валидны.",
    topic: "Практические примеры"
  }
]
