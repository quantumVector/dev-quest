<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const basicConditionalSnippet = `
// =====================================
// CONDITIONAL TYPES - основы
// =====================================

// 1. Базовый синтаксис
// T extends U ? X : Y
// Если T расширяет U (совместим с U), то тип X, иначе Y

type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
type C = IsString<'hello'> // true (string literal extends string)

// 2. Простой пример - TypeName
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object"

type T0 = TypeName<string>        // "string"
type T1 = TypeName<"a">           // "string"
type T2 = TypeName<true>          // "boolean"
type T3 = TypeName<() => void>    // "function"
type T4 = TypeName<string[]>      // "object"

// 3. NonNullable - исключение null и undefined
type MyNonNullable<T> = T extends null | undefined ? never : T

type D = MyNonNullable<string | null>        // string
type E = MyNonNullable<number | undefined>   // number
type F = MyNonNullable<string | null | undefined>  // string

// 4. Условия с объектами
type HasName<T> = T extends { name: string } ? true : false

type G = HasName<{ name: string; age: number }>  // true
type H = HasName<{ age: number }>                // false
type I = HasName<{ name: number }>               // false (name не string)

// 5. Множественные условия
type MsgOf<T> =
  T extends { message: unknown } ? T["message"] :
  never

interface Email {
  message: string
}

interface Dog {
  bark(): void
}

type EmailMessageContents = MsgOf<Email>  // string
type DogMessageContents = MsgOf<Dog>      // never
`

const flattenExampleSnippet = `
// =====================================
// FLATTEN TYPE - разбор примера
// =====================================

// Задача: создать тип, который "разворачивает" массивы, но оставляет примитивы как есть

type Flatten<T> = T extends any[] ? T[number] : T

// Как это работает:

// 1. Если T - массив (T extends any[])
type Test1 = Flatten<string[]>  // string
// string[] extends any[] → true
// T[number] для string[] = string

type Test2 = Flatten<number[]>  // number
// number[] extends any[] → true
// T[number] для number[] = number

// 2. Если T - не массив
type Test3 = Flatten<string>   // string
// string extends any[] → false
// Возвращаем T как есть

type Test4 = Flatten<boolean>  // boolean
// boolean extends any[] → false
// Возвращаем T

// 3. Сложные примеры
type Test5 = Flatten<Array<{ id: number; name: string }>>
// { id: number; name: string }

type Test6 = Flatten<[string, number, boolean]>
// string | number | boolean (все элементы tuple)

// 4. Расширенная версия с вложенными массивами
type DeepFlatten<T> = T extends Array<infer U>
  ? DeepFlatten<U>
  : T

type Nested = number[][][]
type Flat = DeepFlatten<Nested>  // number

// 5. Flatten с сохранением readonly
type FlattenReadonly<T> = T extends ReadonlyArray<infer U> ? U : T

type Test7 = FlattenReadonly<readonly string[]>  // string
type Test8 = FlattenReadonly<readonly [1, 2, 3]> // 1 | 2 | 3

// 6. Универсальный Flatten для массивов и Promise
type UnwrapArray<T> = T extends Array<infer U> ? U : T
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type Unwrap<T> = UnwrapPromise<UnwrapArray<T>>

type Test9 = Unwrap<Promise<string[]>>  // string
type Test10 = Unwrap<string[]>          // string
type Test11 = Unwrap<Promise<number>>   // number
type Test12 = Unwrap<boolean>           // boolean

// 7. Практическое применение - API Response
type ApiResponse<T> = {
  data: T
  status: number
}

type ExtractData<T> = T extends ApiResponse<infer U> ? U : never

type UserResponse = ApiResponse<{ id: number; name: string }>
type UserData = ExtractData<UserResponse>
// { id: number; name: string }

// 8. Flatten для вложенных объектов
type FlattenObject<T> = T extends object
  ? T extends Array<infer U>
    ? U
    : T
  : T

type Obj = { users: { id: number }[] }
type FlatUsers = FlattenObject<Obj['users']>  // { id: number }
`

const inferKeywordSnippet = `
// =====================================
// INFER KEYWORD - вывод типов
// =====================================

// 1. Базовое использование infer
// infer позволяет "извлечь" тип из другого типа

// Получение типа возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Func = () => string
type R1 = ReturnType<Func>  // string

type AsyncFunc = () => Promise<number>
type R2 = ReturnType<AsyncFunc>  // Promise<number>

// 2. Получение типов параметров функции
type Parameters<T> = T extends (...args: infer P) => any ? P : never

type Func2 = (a: string, b: number) => void
type P1 = Parameters<Func2>  // [a: string, b: number]

// 3. Получение типа первого параметра
type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : never

type Func3 = (name: string, age: number) => void
type F1 = FirstParameter<Func3>  // string

// 4. Распаковка Promise
type Awaited<T> = T extends Promise<infer U> ? U : T

type P2 = Awaited<Promise<string>>    // string
type P3 = Awaited<Promise<number[]>>  // number[]
type P4 = Awaited<boolean>            // boolean

// Рекурсивная версия для вложенных Promise
type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>
  : T

type P5 = DeepAwaited<Promise<Promise<string>>>  // string

// 5. Извлечение типа элемента массива
type ArrayElement<T> = T extends (infer E)[] ? E : never

type E1 = ArrayElement<string[]>           // string
type E2 = ArrayElement<{ id: number }[]>   // { id: number }
type E3 = ArrayElement<number>             // never

// 6. Извлечение типа из readonly массива
type ReadonlyArrayElement<T> =
  T extends readonly (infer E)[] ? E : never

type E4 = ReadonlyArrayElement<readonly string[]>  // string

// 7. Извлечение типа из tuple
type TupleToUnion<T> = T extends (infer E)[] ? E : never

type T1 = TupleToUnion<[string, number, boolean]>
// string | number | boolean

// 8. Извлечение типов из объекта
type PropertyType<T, K extends keyof T> = T[K]

// Извлечение всех типов свойств
type ValueOf<T> = T[keyof T]

type User = {
  id: number
  name: string
  active: boolean
}

type UserValue = ValueOf<User>  // number | string | boolean

// 9. Извлечение конструктора класса
type ConstructorParameters<T> =
  T extends new (...args: infer P) => any ? P : never

class MyClass {
  constructor(name: string, age: number) {}
}

type C1 = ConstructorParameters<typeof MyClass>  // [name: string, age: number]

// 10. Извлечение типа экземпляра класса
type InstanceType<T> =
  T extends new (...args: any[]) => infer R ? R : never

type I1 = InstanceType<typeof MyClass>  // MyClass

// 11. Сложный пример - извлечение обработчика событий
type EventHandler<T> =
  T extends { addEventListener(event: string, handler: infer H): void }
    ? H
    : never

interface CustomEventTarget {
  addEventListener(event: string, handler: (e: Event) => void): void
}

type Handler = EventHandler<CustomEventTarget>
// (e: Event) => void

// 12. Извлечение типа из функции getter
type GetterReturnType<T> =
  T extends { get(): infer R } ? R : never

interface StringGetter {
  get(): string
}

type G1 = GetterReturnType<StringGetter>  // string
`

const distributiveConditionalSnippet = `
// =====================================
// DISTRIBUTIVE CONDITIONAL TYPES
// =====================================

// Условные типы дистрибутивны для голых (naked) типов-параметров

// 1. Базовый пример дистрибутивности
type ToArray<T> = T extends any ? T[] : never

type A = ToArray<string | number>
// Дистрибутивность: (string | number) → string | number
// ToArray<string> | ToArray<number>
// string[] | number[]

// 2. Без дистрибутивности (обернутый тип)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type B = ToArrayNonDist<string | number>
// Не дистрибутивно: [string | number][] → (string | number)[]

// Разница:
// ToArray<string | number> = string[] | number[]
// ToArrayNonDist<string | number> = (string | number)[]

// 3. Фильтрация типов из union
type Exclude<T, U> = T extends U ? never : T

type C = Exclude<"a" | "b" | "c", "a">  // "b" | "c"

// Дистрибутивность:
// Exclude<"a", "a"> | Exclude<"b", "a"> | Exclude<"c", "a">
// never | "b" | "c"
// "b" | "c"

// 4. Извлечение типов из union
type Extract<T, U> = T extends U ? T : never

type D = Extract<"a" | "b" | "c", "a" | "f">  // "a"

// 5. Практический пример - фильтрация функций
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

interface User {
  name: string
  age: number
  greet(): void
  sayBye(): void
}

type UserFunctions = FunctionPropertyNames<User>
// "greet" | "sayBye"

// 6. Извлечение только функций
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

type UserMethods = FunctionProperties<User>
// {
//   greet(): void
//   sayBye(): void
// }

// 7. NonNullableProperties - исключить nullable свойства
type NonNullablePropertyNames<T> = {
  [K in keyof T]: null extends T[K] ? never :
                  undefined extends T[K] ? never :
                  K
}[keyof T]

interface Product {
  id: number
  name: string
  description?: string
  category: string | null
}

type RequiredProductKeys = NonNullablePropertyNames<Product>
// "id" | "name"

// 8. Отключение дистрибутивности для конкретных случаев
type BoxedValue<T> = { value: T }
type BoxedArray<T> = BoxedValue<T extends any ? T[] : never>

type E1 = BoxedArray<string | number>
// Дистрибутивно: BoxedValue<string[]> | BoxedValue<number[]>

type BoxedArrayNonDist<T> = { value: [T] extends [any] ? T[] : never }

type E2 = BoxedArrayNonDist<string | number>
// Не дистрибутивно: { value: (string | number)[] }

// 9. Рекурсивная дистрибутивность
type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends object
    ? DeepReadonlyObject<T>
    : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

type Nested = {
  a: string
  b: {
    c: number
    d: string[]
  }
}

type ReadonlyNested = DeepReadonly<Nested>
// {
//   readonly a: string
//   readonly b: {
//     readonly c: number
//     readonly d: readonly string[]
//   }
// }

// 10. Union to Intersection (нет дистрибутивности)
type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never

type F = UnionToIntersection<{ a: string } | { b: number }>
// { a: string } & { b: number }
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Типизация Redux Actions
type Action<T extends string, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P }

type IncrementAction = Action<'INCREMENT'>
// { type: 'INCREMENT' }

type SetUserAction = Action<'SET_USER', { id: number; name: string }>
// { type: 'SET_USER'; payload: { id: number; name: string } }

// 2. Типизация API Response
type ApiResult<T> = { success: true; data: T } | { success: false; error: string }

type ExtractSuccess<T> = T extends { success: true; data: infer D } ? D : never
type ExtractError<T> = T extends { success: false; error: infer E } ? E : never

type UserResult = ApiResult<{ id: number; name: string }>
type UserData = ExtractSuccess<UserResult>  // { id: number; name: string }
type UserError = ExtractError<UserResult>   // string

// 3. Проверка наличия метода в типе
type HasMethod<T, M extends string> =
  T extends Record<M, (...args: any[]) => any> ? true : false

type A = HasMethod<{ save(): void }, 'save'>    // true
type B = HasMethod<{ save(): void }, 'delete'>  // false

// 4. Async Function Return Type
type AsyncReturnType<T> =
  T extends (...args: any[]) => Promise<infer R> ? R : never

async function fetchUser() {
  return { id: 1, name: 'John' }
}

type User = AsyncReturnType<typeof fetchUser>
// { id: number; name: string }

// 5. Curry Type Helper
type Curry<F> =
  F extends (x: infer A, ...rest: infer R) => infer Return
    ? (x: A) => Curry<(...args: R) => Return>
    : F

type OriginalFunc = (a: string, b: number, c: boolean) => void
type CurriedFunc = Curry<OriginalFunc>
// (x: string) => (x: number) => (x: boolean) => void

// 6. Flatten Object Keys
type FlattenKeys<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? FlattenKeys<T[K], \`\${Prefix}\${K}.\`>
        : \`\${Prefix}\${K}\`
    }[keyof T & string]
  : never

type NestedObj = {
  user: {
    profile: {
      name: string
      age: number
    }
    settings: {
      theme: string
    }
  }
}

type Keys = FlattenKeys<NestedObj>
// "user.profile.name" | "user.profile.age" | "user.settings.theme"

// 7. Required Keys
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type OptionalUser = {
  id: number
  name: string
  email?: string
  phone?: string
}

type Required = RequiredKeys<OptionalUser>  // "id" | "name"

// 8. Optional Keys
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

type Optional = OptionalKeys<OptionalUser>  // "email" | "phone"

// 9. Типизация формы с валидацией
type ValidationResult<T> = T extends string
  ? { valid: boolean; value?: T; error?: string }
  : T extends number
    ? { valid: boolean; value?: T; min?: number; max?: number }
    : { valid: boolean; value?: T }

type StringValidation = ValidationResult<string>
// { valid: boolean; value?: string; error?: string }

type NumberValidation = ValidationResult<number>
// { valid: boolean; value?: number; min?: number; max?: number }

// 10. Deep Partial
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type Config = {
  server: {
    host: string
    port: number
    ssl: {
      enabled: boolean
      cert: string
    }
  }
}

type PartialConfig = DeepPartial<Config>
// {
//   server?: {
//     host?: string
//     port?: number
//     ssl?: {
//       enabled?: boolean
//       cert?: string
//     }
//   }
// }

// 11. Объединение типов по ключу
type MergeByKey<T, K extends keyof T> = T extends infer O
  ? { [P in K]: O[P] } & Omit<O, K>
  : never

type Original = { id: number; name: string; age: number }
type Merged = MergeByKey<Original, 'id'>
// { id: number } & { name: string; age: number }

// 12. Проверка на пустой объект
type IsEmptyObject<T> = T extends Record<string, never> ? true : false

type C = IsEmptyObject<{}>          // true
type D = IsEmptyObject<{ a: 1 }>    // false

// 13. Получение всех путей в объекте
type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | \`\${K}.\${Paths<T[K]>}\`
          : K
        : never
    }[keyof T]
  : never

type NestedPaths = Paths<NestedObj>
// "user" | "user.profile" | "user.profile.name" | "user.profile.age" | "user.settings" | "user.settings.theme"

// 14. Safe Get - безопасное получение вложенных свойств
type Get<T, Path extends string> =
  Path extends \`\${infer K}.\${infer Rest}\`
    ? K extends keyof T
      ? Get<T[K], Rest>
      : never
    : Path extends keyof T
      ? T[Path]
      : never

type ProfileName = Get<NestedObj, 'user.profile.name'>  // string
type Invalid = Get<NestedObj, 'user.invalid'>           // never
`

const advancedPatternsSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ПАТТЕРНЫ
// =====================================

// 1. Создание строго типизированного EventEmitter
type EventMap = {
  'user:login': { userId: number; timestamp: Date }
  'user:logout': { userId: number }
  'data:update': { id: string; value: any }
}

type EventKey = keyof EventMap

type EventCallback<K extends EventKey> = (data: EventMap[K]) => void

class TypedEventEmitter {
  private listeners: {
    [K in EventKey]?: EventCallback<K>[]
  } = {}

  on<K extends EventKey>(event: K, callback: EventCallback<K>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(callback as any)
  }

  emit<K extends EventKey>(event: K, data: EventMap[K]) {
    this.listeners[event]?.forEach(callback => callback(data))
  }
}

const emitter = new TypedEventEmitter()

emitter.on('user:login', (data) => {
  console.log(data.userId, data.timestamp)  // Типизировано!
})

// 2. Условная типизация для Builder Pattern
type BuilderMethods<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => Builder<T>
} & {
  build(): T
}

type Builder<T> = BuilderMethods<T>

type UserBuilder = Builder<{ name: string; age: number }>
// {
//   setName(value: string): Builder<...>
//   setAge(value: number): Builder<...>
//   build(): { name: string; age: number }
// }

// 3. Типизация состояний (State Machine)
type State<T extends string, Data = void> = Data extends void
  ? { type: T }
  : { type: T; data: Data }

type LoadingState = State<'loading'>
type SuccessState<T> = State<'success', { data: T }>
type ErrorState = State<'error', { error: string }>

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState

function handleState<T>(state: AsyncState<T>) {
  switch (state.type) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return state.data  // TypeScript знает о data
    case 'error':
      return state.error // TypeScript знает об error
  }
}

// 4. Reverse Mapped Type - обратное отображение
type ReverseMap<T extends Record<string, any>> = {
  [V in T[keyof T]]: {
    [K in keyof T]: T[K] extends V ? K : never
  }[keyof T]
}

type StatusCodes = {
  OK: 200
  NOT_FOUND: 404
  SERVER_ERROR: 500
}

type StatusNames = ReverseMap<StatusCodes>
// {
//   200: "OK"
//   404: "NOT_FOUND"
//   500: "SERVER_ERROR"
// }

// 5. Объединение типов с контролем дубликатов
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
      ? T[K]
      : never
}

type A = { a: string; b: number }
type B = { b: string; c: boolean }

type C = Merge<A, B>
// { a: string; b: string; c: boolean }

// 6. Функция типа для проверки равенства типов
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type D = Equals<string, string>           // true
type E = Equals<string, number>           // false
type F = Equals<string | number, number | string>  // true

// 7. Получение union всех возможных значений tuple
type TupleValues<T extends readonly any[]> = T[number]

const tuple = ['a', 'b', 'c'] as const
type Values = TupleValues<typeof tuple>  // "a" | "b" | "c"

// 8. Разбиение строки по разделителю
type Split<S extends string, D extends string> =
  S extends \`\${infer T}\${D}\${infer U}\`
    ? [T, ...Split<U, D>]
    : [S]

type Path = Split<'user.profile.name', '.'>
// ["user", "profile", "name"]

// 9. Join - объединение массива строк
type Join<T extends string[], D extends string> =
  T extends [infer F extends string, ...infer R extends string[]]
    ? R extends []
      ? F
      : \`\${F}\${D}\${Join<R, D>}\`
    : ''

type Joined = Join<['user', 'profile', 'name'], '.'>
// "user.profile.name"

// 10. Deeply Readonly с исключениями
type DeeplyReadonlyExcept<T, K extends keyof any = never> =
  T extends (infer R)[]
    ? DeeplyReadonlyArray<R, K>
    : T extends Function
      ? T
      : T extends object
        ? DeeplyReadonlyObject<T, K>
        : T

type DeeplyReadonlyArray<T, K extends keyof any> =
  ReadonlyArray<DeeplyReadonlyExcept<T, K>>

type DeeplyReadonlyObject<T, K extends keyof any> = {
  readonly [P in keyof T]: P extends K
    ? T[P]
    : DeeplyReadonlyExcept<T[P], K>
}

type Config = {
  api: {
    url: string
    timeout: number
  }
  cache: {
    enabled: boolean
  }
}

type ReadonlyConfig = DeeplyReadonlyExcept<Config, 'cache'>
// {
//   readonly api: {
//     readonly url: string
//     readonly timeout: number
//   }
//   cache: {  // НЕ readonly
//     enabled: boolean
//   }
// }

// 11. Типизация SQL-like Query Builder
type Table = {
  users: { id: number; name: string; email: string }
  posts: { id: number; userId: number; title: string }
}

type SelectFields<T extends keyof Table, F extends keyof Table[T]> = {
  table: T
  fields: F[]
  result: Pick<Table[T], F>[]
}

type Query1 = SelectFields<'users', 'id' | 'name'>
// {
//   table: 'users'
//   fields: ('id' | 'name')[]
//   result: { id: number; name: string }[]
// }

// 12. Tagged Union с автоматическими дискриминантами
type Tagged<T extends Record<string, any>, K extends keyof T> = {
  [P in keyof T]: { type: P } & T[P]
}[K]

type Shapes = {
  circle: { radius: number }
  rectangle: { width: number; height: number }
  triangle: { base: number; height: number }
}

type Shape = Tagged<Shapes, keyof Shapes>
// | { type: 'circle'; radius: number }
// | { type: 'rectangle'; width: number; height: number }
// | { type: 'triangle'; base: number; height: number }

function area(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
    case 'triangle':
      return (shape.base * shape.height) / 2
  }
}
`

const interviewQuestionsSnippet = `
// =====================================
// ВОПРОСЫ НА СОБЕСЕДОВАНИИ
// =====================================

// 1. Базовые вопросы

// Q: Что такое Conditional Types?
// A: Синтаксис T extends U ? X : Y, позволяющий выбирать тип на основе условия

// Q: Как работает Flatten<T>?
// A: Проверяет, является ли T массивом. Если да - возвращает тип элемента (T[number]),
//    иначе возвращает сам тип T

type Flatten<T> = T extends any[] ? T[number] : T

// Q: Что такое infer?
// A: Ключевое слово для извлечения (inference) типа из другого типа в условных типах

// Q: Что такое дистрибутивность условных типов?
// A: Автоматическое распределение union типов по условию.
//    ToArray<A | B> = ToArray<A> | ToArray<B>

// 2. Практические задачи

// Задача 1: Реализуйте Readonly<T>
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Задача 2: Реализуйте Pick<T, K>
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Задача 3: Реализуйте Exclude<T, U>
type MyExclude<T, U> = T extends U ? never : T

// Задача 4: Реализуйте ReturnType<T>
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never

// Задача 5: Реализуйте Parameters<T>
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never

// Задача 6: Получить первый элемент tuple
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never

type Test1 = First<[1, 2, 3]>      // 1
type Test2 = First<['a', 'b']>     // 'a'
type Test3 = First<[]>             // never

// Задача 7: Получить последний элемент tuple
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never

type Test4 = Last<[1, 2, 3]>       // 3
type Test5 = Last<['a', 'b']>      // 'b'

// Задача 8: Развернуть Promise
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T

type Test6 = MyAwaited<Promise<string>>                    // string
type Test7 = MyAwaited<Promise<Promise<number>>>           // number

// Задача 9: If - условный тип
type If<C extends boolean, T, F> = C extends true ? T : F

type Test8 = If<true, 'a', 'b'>    // 'a'
type Test9 = If<false, 'a', 'b'>   // 'b'

// Задача 10: Concat - объединение tuple
type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Test10 = Concat<[1, 2], [3, 4]>  // [1, 2, 3, 4]

// Задача 11: Includes - проверка наличия в tuple
type Includes<T extends any[], U> =
  T extends [infer F, ...infer R]
    ? Equal<F, U> extends true
      ? true
      : Includes<R, U>
    : false

// Вспомогательный тип для точного сравнения
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Test11 = Includes<[1, 2, 3], 2>       // true
type Test12 = Includes<[1, 2, 3], 4>       // false

// Задача 12: Push - добавление элемента в конец tuple
type Push<T extends any[], U> = [...T, U]

type Test13 = Push<[1, 2], 3>     // [1, 2, 3]

// Задача 13: Unshift - добавление элемента в начало tuple
type Unshift<T extends any[], U> = [U, ...T]

type Test14 = Unshift<[1, 2], 0>  // [0, 1, 2]

// Задача 14: Length - длина tuple
type Length<T extends any[]> = T['length']

type Test15 = Length<[1, 2, 3]>   // 3
type Test16 = Length<[]>          // 0

// 3. Сложные задачи

// Задача 15: Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P]
}

// Задача 16: Tuple to Union
type TupleToUnion<T extends any[]> = T[number]

type Test17 = TupleToUnion<[1, 2, 3]>  // 1 | 2 | 3

// Задача 17: Chainable Options
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<T & { [P in K]: V }>
  get(): T
}

declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('bar', 'hello')
  .option('baz', true)
  .get()

// result: { foo: number; bar: string; baz: boolean }

// Задача 18: String to Union
type StringToUnion<S extends string> =
  S extends \`\${infer F}\${infer R}\`
    ? F | StringToUnion<R>
    : never

type Test18 = StringToUnion<'hello'>  // 'h' | 'e' | 'l' | 'o'

// Задача 19: Replace
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends \`\${infer L}\${From}\${infer R}\`
    ? \`\${L}\${To}\${R}\`
    : S

type Test19 = Replace<'hello world', 'world', 'TypeScript'>
// 'hello TypeScript'

// Задача 20: ReplaceAll
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends \`\${infer L}\${From}\${infer R}\`
    ? \`\${L}\${To}\${ReplaceAll<R, From, To>}\`
    : S

type Test20 = ReplaceAll<'foo foo foo', 'foo', 'bar'>
// 'bar bar bar'
`

const highlightedBasic = ref('')
const highlightedFlatten = ref('')
const highlightedInfer = ref('')
const highlightedDistributive = ref('')
const highlightedPractical = ref('')
const highlightedAdvanced = ref('')
const highlightedInterview = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(basicConditionalSnippet, Prism.languages.typescript, 'typescript')
  highlightedFlatten.value = Prism.highlight(flattenExampleSnippet, Prism.languages.typescript, 'typescript')
  highlightedInfer.value = Prism.highlight(inferKeywordSnippet, Prism.languages.typescript, 'typescript')
  highlightedDistributive.value = Prism.highlight(distributiveConditionalSnippet, Prism.languages.typescript, 'typescript')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvanced.value = Prism.highlight(advancedPatternsSnippet, Prism.languages.typescript, 'typescript')
  highlightedInterview.value = Prism.highlight(interviewQuestionsSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Conditional Types: условные типы в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Conditional Types</b> — это мощная возможность TypeScript для создания типов на основе условий.
              Синтаксис <code>T extends U ? X : Y</code> позволяет выбирать один из двух типов в зависимости от того,
              совместим ли тип T с типом U. Это основа для создания гибких, переиспользуемых типов и Utility Types.
            </p>

            <!-- Основной синтаксис -->
            <h2 class="text-h5 font-weight-bold mb-3">Основной синтаксис</h2>
            <v-card class="pa-4 mb-6" color="primary" variant="tonal">
              <div class="text-h6 font-weight-bold mb-3">T extends U ? X : Y</div>
              <p class="mb-2"><strong>T extends U</strong> — проверка, совместим ли тип T с типом U</p>
              <p class="mb-2"><strong>X</strong> — возвращаемый тип, если условие истинно</p>
              <p class="mb-0"><strong>Y</strong> — возвращаемый тип, если условие ложно</p>
            </v-card>

            <!-- Ключевые концепции -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые концепции</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-file-question</v-icon>
                    <h3 class="text-h6 font-weight-bold">extends</h3>
                  </div>
                  <p class="text-body-2 mb-2">Проверка совместимости типов:</p>
                  <ul class="pl-4">
                    <li><code>string extends any</code> → true</li>
                    <li><code>number extends string</code> → false</li>
                    <li><code>'hello' extends string</code> → true</li>
                    <li><code>{ a: 1 } extends object</code> → true</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-magnify</v-icon>
                    <h3 class="text-h6 font-weight-bold">infer</h3>
                  </div>
                  <p class="text-body-2 mb-2">Извлечение типа из другого типа:</p>
                  <ul class="pl-4">
                    <li>Работает только в условных типах</li>
                    <li>Создает "переменную типа"</li>
                    <li>Используется для pattern matching</li>
                    <li>Основа для Utility Types</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Базовые примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Базовые примеры Conditional Types</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <!-- Flatten пример -->
            <h2 class="text-h5 font-weight-bold mb-3">Разбор примера: Flatten&lt;T&gt;</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Flatten&lt;T&gt;</strong> — классический пример условного типа, который "разворачивает"
              массивы, возвращая тип элемента, но оставляет примитивы без изменений.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFlatten"></code></pre>

            <!-- infer keyword -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевое слово infer</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Что делает infer</h3>
                  <ul class="pl-4">
                    <li>Извлекает тип из сложного типа</li>
                    <li>Создает "временную переменную типа"</li>
                    <li>Работает только в true ветке условия</li>
                    <li>Может извлекать несколько типов</li>
                    <li>Основа для декомпозиции типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Типичные применения</h3>
                  <ul class="pl-4">
                    <li>Получение return type функции</li>
                    <li>Получение параметров функции</li>
                    <li>Распаковка Promise</li>
                    <li>Извлечение элемента массива</li>
                    <li>Получение типа из generic</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInfer"></code></pre>

            <!-- Distributive Conditional Types -->
            <h2 class="text-h5 font-weight-bold mb-3">Дистрибутивные условные типы</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Условные типы дистрибутивны для "голых" (naked) типов-параметров.
              Это значит, что union типы автоматически распределяются по условию.
            </v-alert>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Дистрибутивный</h3>
                  <pre class="text-caption mb-2"><code>type T&lt;X&gt; = X extends Y ? A : B</code></pre>
                  <p class="text-body-2 mb-2">X — голый тип параметр</p>
                  <p class="text-body-2 ma-0">
                    <code>T&lt;A | B&gt;</code> → <code>T&lt;A&gt; | T&lt;B&gt;</code>
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Не дистрибутивный</h3>
                  <pre class="text-caption mb-2"><code>type T&lt;X&gt; = [X] extends [Y] ? A : B</code></pre>
                  <p class="text-body-2 mb-2">[X] — обернутый тип</p>
                  <p class="text-body-2 ma-0">
                    <code>T&lt;A | B&gt;</code> → работает с union как единым типом
                  </p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDistributive"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <!-- Продвинутые паттерны -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые паттерны</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvanced"></code></pre>

            <!-- Сравнительная таблица -->
            <h2 class="text-h5 font-weight-bold mb-3">Встроенные Utility Types на основе Conditional Types</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Utility Type</th>
                <th class="text-left font-weight-bold">Реализация</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>Exclude&lt;T, U&gt;</code></td>
                <td><code>T extends U ? never : T</code></td>
                <td>Исключить типы из union</td>
              </tr>
              <tr>
                <td><code>Extract&lt;T, U&gt;</code></td>
                <td><code>T extends U ? T : never</code></td>
                <td>Извлечь типы из union</td>
              </tr>
              <tr>
                <td><code>NonNullable&lt;T&gt;</code></td>
                <td><code>T extends null | undefined ? never : T</code></td>
                <td>Исключить null/undefined</td>
              </tr>
              <tr>
                <td><code>ReturnType&lt;T&gt;</code></td>
                <td><code>T extends (...args: any) => infer R ? R : never</code></td>
                <td>Тип возврата функции</td>
              </tr>
              <tr>
                <td><code>Parameters&lt;T&gt;</code></td>
                <td><code>T extends (...args: infer P) => any ? P : never</code></td>
                <td>Типы параметров функции</td>
              </tr>
              <tr>
                <td><code>Awaited&lt;T&gt;</code></td>
                <td><code>T extends Promise&lt;infer U&gt; ? U : T</code></td>
                <td>Развернуть Promise</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Задачи и вопросы на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterview"></code></pre>

            <!-- Частые вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Conditional Types?</p>
                <p class="font-weight-regular ma-0">
                  Conditional Types — это типы, которые выбираются на основе условия. Синтаксис:
                  <code>T extends U ? X : Y</code>. Если тип T совместим с U (может быть присвоен U),
                  то результирующий тип X, иначе Y. Это основа для создания гибких, переиспользуемых типов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает type Flatten&lt;T&gt; = T extends any[] ? T[number] : T?</p>
                <p class="font-weight-regular ma-0">
                  Flatten проверяет, является ли T массивом. Если да (T extends any[]), возвращает тип элемента
                  через <code>T[number]</code> (indexed access type). Если нет — возвращает T без изменений.
                  Пример: <code>Flatten&lt;string[]&gt;</code> = string, <code>Flatten&lt;number&gt;</code> = number.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делает ключевое слово infer?</p>
                <p class="font-weight-regular ma-0">
                  <code>infer</code> позволяет "извлекать" (infer) тип из другого типа внутри условных типов.
                  Создает временную "переменную типа", которую можно использовать в true-ветке условия.
                  Пример: <code>T extends (infer R)[] ? R : never</code> извлекает тип элемента массива.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое дистрибутивность условных типов?</p>
                <p class="font-weight-regular ma-0">
                  Когда условный тип применяется к union типу с "голым" (naked) параметром типа, условие
                  применяется к каждому члену union независимо. <code>T&lt;A | B&gt;</code> → <code>T&lt;A&gt; | T&lt;B&gt;</code>.
                  Чтобы отключить дистрибутивность, нужно обернуть тип: <code>[T] extends [U]</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как получить тип возвращаемого значения функции?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>ReturnType&lt;T&gt;</code> или создать свой:
                  <code>type MyReturnType&lt;T&gt; = T extends (...args: any) => infer R ? R : never</code>.
                  Infer R извлекает тип возврата из сигнатуры функции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать тип, который извлекает тип элемента массива?</p>
                <p class="font-weight-regular ma-0">
                  Два способа: 1) <code>T[number]</code> — indexed access type. 2) <code>T extends (infer E)[] ? E : never</code>
                  — через infer. Первый способ проще, второй более гибкий и работает с условиями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как развернуть (unwrap) Promise&lt;Promise&lt;T&gt;&gt;?</p>
                <p class="font-weight-regular ma-0">
                  Рекурсивный условный тип: <code>type Awaited&lt;T&gt; = T extends Promise&lt;infer U&gt; ? Awaited&lt;U&gt; : T</code>.
                  Проверяет, является ли T промисом, извлекает внутренний тип и рекурсивно применяет снова, пока не дойдет до не-промиса.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Exclude и Omit?</p>
                <p class="font-weight-regular ma-0">
                  <code>Exclude&lt;T, U&gt;</code> работает с union типами, удаляя типы. <code>Omit&lt;T, K&gt;</code> работает
                  с типами объектов, удаляя свойства. Exclude — условный тип (<code>T extends U ? never : T</code>),
                  Omit использует Pick и Exclude: <code>Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;</code>.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать для гибких типов</li>
                    <li>Комбинировать с infer</li>
                    <li>Переиспользовать встроенные Utility Types</li>
                    <li>Документировать сложную логику</li>
                    <li>Тестировать с разными типами</li>
                    <li>Использовать never для невозможных кейсов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Чрезмерной вложенности условий</li>
                    <li>Непонятных имен типов</li>
                    <li>Дублирования встроенных типов</li>
                    <li>Игнорирования дистрибутивности</li>
                    <li>Слишком сложной логики</li>
                    <li>Отсутствия fallback (never)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите встроенные Utility Types</li>
                    <li>Практикуйтесь на type-challenges</li>
                    <li>Используйте type aliases для читаемости</li>
                    <li>Проверяйте дистрибутивность</li>
                    <li>Комбинируйте с Mapped Types</li>
                    <li>Читайте код TypeScript библиотек</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Когда использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Conditional Types</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Идеально для</h3>
                  <ul class="pl-4">
                    <li>Создания гибких Utility Types</li>
                    <li>Извлечения типов из сложных структур</li>
                    <li>Фильтрации union типов</li>
                    <li>Работы с generic типами</li>
                    <li>Трансформации типов функций</li>
                    <li>Создания type guards на уровне типов</li>
                    <li>Работы с библиотеками и API</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Альтернативы</h3>
                  <ul class="pl-4">
                    <li><strong>Mapped Types:</strong> для трансформации всех свойств</li>
                    <li><strong>Template Literal Types:</strong> для строк</li>
                    <li><strong>Union Types:</strong> для простых вариантов</li>
                    <li><strong>Overloads:</strong> для разных сигнатур функций</li>
                    <li><strong>Type Guards:</strong> для runtime проверок</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Ресурсы для практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Ресурсы для практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-school</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Type Challenges</h3>
                  <p class="text-body-2 mb-3">Коллекция практических задач на TypeScript типы</p>
                  <v-btn
                    size="small"
                    color="primary"
                    href="https://github.com/type-challenges/type-challenges"
                    target="_blank">
                    GitHub
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-book-open-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">TypeScript Handbook</h3>
                  <p class="text-body-2 mb-3">Официальная документация по Conditional Types</p>
                  <v-btn
                    size="small"
                    color="success"
                    href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html"
                    target="_blank">
                    Docs
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-web</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">TypeScript Playground</h3>
                  <p class="text-body-2 mb-3">Онлайн редактор для экспериментов с типами</p>
                  <v-btn
                    size="small"
                    color="info"
                    href="https://www.typescriptlang.org/play"
                    target="_blank">
                    Playground
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Conditional Types</b> — это фундаментальная возможность TypeScript для создания гибких,
              переиспользуемых типов на основе условий. Синтаксис <code>T extends U ? X : Y</code> вместе
              с ключевым словом <code>infer</code> позволяет извлекать типы, трансформировать их и создавать
              сложную типовую логику. Тип <code>Flatten&lt;T&gt; = T extends any[] ? T[number] : T</code> —
              классический пример, демонстрирующий, как один тип может обрабатывать и массивы (возвращая тип элемента),
              и примитивы (возвращая их без изменений). Дистрибутивность условных типов автоматически распределяет
              union типы, что важно учитывать при проектировании. Понимание Conditional Types критически важно
              для работы с продвинутыми TypeScript паттернами и успешного прохождения технических собеседований.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/type-challenges/type-challenges"
                target="_blank"
                class="mr-2">
                Type Challenges
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/play"
                target="_blank">
                TypeScript Playground
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
