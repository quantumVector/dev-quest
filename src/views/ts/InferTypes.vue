<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const snippet1 = `
// =====================================
// ОСНОВЫ INFER TYPES
// =====================================

// Infer Types используются ТОЛЬКО внутри условных типов (conditional types)
// для автоматического извлечения типов из других типов

// 1. Базовый синтаксис
// T extends Pattern ? TrueType : FalseType
// где Pattern может содержать infer для извлечения типа

// Пример: извлечение типа возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// Как это работает:
// - T extends (...args: any[]) => infer R - проверяем, является ли T функцией
// - infer R - если да, то TypeScript автоматически выводит тип возвращаемого значения
// - ? R : never - если это функция, возвращаем выведенный тип R, иначе never

function getUserName(): string {
  return "Alice"
}

function getUserAge(): number {
  return 25
}

type UserNameType = ReturnType<typeof getUserName>  // string
type UserAgeType = ReturnType<typeof getUserAge>    // number

// 2. Извлечение типов параметров функции
type Parameters<T> = T extends (...args: infer P) => any ? P : never

function createUser(name: string, age: number, active: boolean) {
  return { name, age, active }
}

type CreateUserParams = Parameters<typeof createUser>
// [name: string, age: number, active: boolean]

// Доступ к конкретным параметрам
type FirstParam = CreateUserParams[0]   // string
type SecondParam = CreateUserParams[1]  // number
type ThirdParam = CreateUserParams[2]   // boolean

// 3. Извлечение первого параметра
type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any
  ? P
  : never

type FirstArgOfCreateUser = FirstParameter<typeof createUser>  // string

// 4. Извлечение последнего параметра (сложнее)
type LastParameter<T> = T extends (...args: [...any[], infer L]) => any
  ? L
  : never

type LastArgOfCreateUser = LastParameter<typeof createUser>  // boolean

// 5. Извлечение типа элемента массива
type ArrayElement<T> = T extends (infer E)[] ? E : never

type Numbers = number[]
type NumberElement = ArrayElement<Numbers>  // number

type Strings = Array<string>
type StringElement = ArrayElement<Strings>  // string

const mixedArray = [1, "hello", true] as const
type MixedElement = ArrayElement<typeof mixedArray>  // 1 | "hello" | true

// 6. Извлечение типа промиса
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type AsyncNumber = Promise<number>
type SyncNumber = UnwrapPromise<AsyncNumber>  // number

type NotPromise = string
type StillString = UnwrapPromise<NotPromise>  // string (не изменился)

async function fetchUser(): Promise<{ name: string; age: number }> {
  return { name: "Bob", age: 30 }
}

type FetchUserResult = UnwrapPromise<ReturnType<typeof fetchUser>>
// { name: string; age: number }
`

const snippet2 = `
// =====================================
// РЕШЕНИЕ ЗАДАЧИ ИЗ ВОПРОСА
// =====================================

// Задача: тип для функции, которая принимает другую функцию
// и возвращает ее результат

// 1. Базовое решение
type FunctionResult<T> = T extends () => infer R ? R : never

// Тестирование
function getString(): string {
  return "Hello"
}

function getNumber(): number {
  return 42
}

function getUser(): { name: string; age: number } {
  return { name: "Alice", age: 25 }
}

type StringResult = FunctionResult<typeof getString>  // string
type NumberResult = FunctionResult<typeof getNumber>  // number
type UserResult = FunctionResult<typeof getUser>      // { name: string; age: number }

// 2. Улучшенное решение - поддержка функций с параметрами
type BetterFunctionResult<T> = T extends (...args: any[]) => infer R ? R : never

function add(a: number, b: number): number {
  return a + b
}

type AddResult = BetterFunctionResult<typeof add>  // number

// 3. Практическое применение - функция-обертка
function executeAndGetResult<T extends (...args: any[]) => any>(
  fn: T
): BetterFunctionResult<T> {
  return fn()
}

// Использование
const result1 = executeAndGetResult(getString)  // string
const result2 = executeAndGetResult(getNumber)  // number
const result3 = executeAndGetResult(getUser)    // { name: string; age: number }

// 4. Более сложный пример - с параметрами функции
function executeWithArgs<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>  // Используем Parameters для получения типов аргументов
): ReturnType<T> {  // Используем ReturnType для получения типа возврата
  return fn(...args)
}

// Использование
const sum = executeWithArgs(add, 5, 10)  // number, args правильно типизированы!
// executeWithArgs(add, "5", 10)  // ❌ Ошибка! Первый аргумент должен быть number

// 5. Безопасная версия с обработкой ошибок
type SafeFunctionResult<T> =
  T extends (...args: any[]) => infer R
    ? R extends Promise<infer U>
      ? Promise<{ success: true; data: U } | { success: false; error: Error }>
      : { success: true; data: R } | { success: false; error: Error }
    : never

async function safeExecute<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): SafeFunctionResult<T> {
  try {
    const result = await fn(...args)
    return { success: true, data: result } as any
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error))
    } as any
  }
}

// 6. Цепочка функций с выводом типов
type ChainedResult<T1, T2> =
  T1 extends (...args: any[]) => infer R1
    ? T2 extends (arg: R1) => infer R2
      ? R2
      : never
    : never

function chain<
  T1 extends (...args: any[]) => any,
  T2 extends (arg: ReturnType<T1>) => any
>(
  fn1: T1,
  fn2: T2
): (...args: Parameters<T1>) => ReturnType<T2> {
  return (...args) => fn2(fn1(...args))
}

// Использование
const getLength = (s: string) => s.length
const double = (n: number) => n * 2

const getLengthAndDouble = chain(getLength, double)
const result = getLengthAndDouble("hello")  // number (10)
`

const snippet3 = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ INFER
// =====================================

// 1. Извлечение типа из объекта по ключу
type PropType<T, K extends keyof T> = T extends { [key in K]: infer P }
  ? P
  : never

interface User {
  name: string
  age: number
  email: string
}

type UserName = PropType<User, 'name'>  // string
type UserAge = PropType<User, 'age'>    // number

// 2. Flatten - "распаковка" вложенных массивов
type Flatten<T> = T extends (infer U)[]
  ? U extends (infer V)[]
    ? V
    : U
  : T

type OneDimensional = Flatten<number[]>      // number
type TwoDimensional = Flatten<number[][]>    // number
type NotArray = Flatten<string>              // string

// 3. DeepFlatten - рекурсивная "распаковка"
type DeepFlatten<T> = T extends (infer U)[]
  ? DeepFlatten<U>
  : T

type Deep1 = DeepFlatten<number[][][]>  // number
type Deep2 = DeepFlatten<string[][][][]>  // string

// 4. Извлечение типов из кортежа
type TupleToUnion<T> = T extends (infer E)[] ? E : never

type Numbers = [1, 2, 3, 4, 5]
type NumberUnion = TupleToUnion<Numbers>  // 1 | 2 | 3 | 4 | 5

type Mixed = [string, number, boolean]
type MixedUnion = TupleToUnion<Mixed>  // string | number | boolean

// 5. Извлечение типа конструктора
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never

type InstanceType<T> = T extends new (...args: any[]) => infer R
  ? R
  : never

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>  // [name: string, age: number]
type PersonInstance = InstanceType<typeof Person>         // Person

// 6. Извлечение типа из getter'а
type GetterType<T> = T extends { get(): infer R } ? R : never

const numberGetter = {
  get(): number {
    return 42
  }
}

type NumberFromGetter = GetterType<typeof numberGetter>  // number

// 7. Извлечение типа события из обработчика
type EventType<T> = T extends (event: infer E) => void ? E : never

type MouseEventHandler = (event: MouseEvent) => void
type ExtractedMouseEvent = EventType<MouseEventHandler>  // MouseEvent

type KeyboardEventHandler = (event: KeyboardEvent) => void
type ExtractedKeyboardEvent = EventType<KeyboardEventHandler>  // KeyboardEvent

// 8. Извлечение типа из Promise.all
type UnwrapPromiseArray<T> = T extends Promise<infer U>[]
  ? U[]
  : T extends [Promise<infer U>, ...infer Rest]
    ? [U, ...UnwrapPromiseArray<Rest>]
    : T

type PromiseArray = [Promise<string>, Promise<number>, Promise<boolean>]
type UnwrappedArray = UnwrapPromiseArray<PromiseArray>
// [string, number, boolean]

// 9. Извлечение типа из React компонента
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

// Пример с функциональным компонентом
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
)

type ExtractedButtonProps = ComponentProps<typeof Button>  // ButtonProps

// 10. Извлечение типа из Redux action
type ActionPayload<T> = T extends { type: string; payload: infer P }
  ? P
  : never

type LoginAction = {
  type: 'LOGIN'
  payload: { username: string; password: string }
}

type LoginPayload = ActionPayload<LoginAction>
// { username: string; password: string }
`

const snippet4 = `
// =====================================
// МНОЖЕСТВЕННЫЕ INFER
// =====================================

// 1. Извлечение нескольких типов из функции
type FunctionParts<T> = T extends (
  ...args: infer P
) => infer R
  ? { params: P; return: R }
  : never

function calculate(a: number, b: number, operation: string): number {
  return a + b
}

type CalculateParts = FunctionParts<typeof calculate>
// {
//   params: [a: number, b: number, operation: string]
//   return: number
// }

// 2. Извлечение типов из Promise в цепочке then
type PromiseChain<T> = T extends Promise<infer U>
  ? U extends Promise<infer V>
    ? PromiseChain<V>
    : U
  : T

type Chain1 = Promise<Promise<Promise<number>>>
type Unwrapped1 = PromiseChain<Chain1>  // number

type Chain2 = Promise<string>
type Unwrapped2 = PromiseChain<Chain2>  // string

// 3. Разделение кортежа на голову и хвост
type Head<T> = T extends [infer H, ...any[]] ? H : never
type Tail<T> = T extends [any, ...infer T] ? T : never

type MyTuple = [string, number, boolean, object]
type TupleHead = Head<MyTuple>  // string
type TupleTail = Tail<MyTuple>  // [number, boolean, object]

// 4. Извлечение первого и последнего элемента
type First<T> = T extends [infer F, ...any[]] ? F : never
type Last<T> = T extends [...any[], infer L] ? L : never

type FirstElement = First<MyTuple>  // string
type LastElement = Last<MyTuple>    // object

// 5. Разбор строкового литерала
type ParseURL<T> = T extends \`\${infer Protocol}://\${infer Domain}/\${infer Path}\`
  ? { protocol: Protocol; domain: Domain; path: Path }
  : never

type URL = "https://example.com/users"
type ParsedURL = ParseURL<URL>
// { protocol: "https"; domain: "example.com"; path: "users" }

// 6. Извлечение версии из строки
type ParseVersion<T> = T extends \`v\${infer Major}.\${infer Minor}.\${infer Patch}\`
  ? { major: Major; minor: Minor; patch: Patch }
  : never

type Version = "v1.2.3"
type ParsedVersion = ParseVersion<Version>
// { major: "1"; minor: "2"; patch: "3" }

// 7. Парсинг пути роута
type ParseRoute<T> = T extends \`/\${infer Segment}/\${infer Rest}\`
  ? [Segment, ...ParseRoute<\`/\${Rest}\`>]
  : T extends \`/\${infer Segment}\`
    ? [Segment]
    : []

type Route = "/users/123/posts"
type ParsedRoute = ParseRoute<Route>  // ["users", "123", "posts"]

// 8. Извлечение параметров из пути
type ExtractParams<T> = T extends \`\${infer Start}:\${infer Param}/\${infer Rest}\`
  ? { [K in Param]: string } & ExtractParams<\`\${Start}\${Rest}\`>
  : T extends \`\${infer Start}:\${infer Param}\`
    ? { [K in Param]: string }
    : {}

type RouteWithParams = "/users/:userId/posts/:postId"
type RouteParams = ExtractParams<RouteWithParams>
// { userId: string; postId: string }

// 9. Комбинирование условий
type ComplexInfer<T> = T extends Promise<infer U>
  ? U extends Array<infer V>
    ? V extends { id: infer ID }
      ? ID
      : never
    : never
  : never

type AsyncUserArray = Promise<Array<{ id: number; name: string }>>
type UserId = ComplexInfer<AsyncUserArray>  // number

// 10. Извлечение всех возможных ключей из union
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never

type AllKeys<T> = T extends any ? keyof T : never

type Union = { a: string } | { b: number } | { c: boolean }
type Keys = AllKeys<Union>  // "a" | "b" | "c"
`

const snippet5 = `
// =====================================
// СЛОЖНЫЕ ПАТТЕРНЫ С INFER
// =====================================

// 1. Curried функции
type Curried<P, R> = P extends [infer First, ...infer Rest]
  ? Rest extends []
    ? (arg: First) => R
    : (arg: First) => Curried<Rest, R>
  : never

function curry<P extends any[], R>(
  fn: (...args: P) => R
): Curried<P, R> {
  return ((arg: any) => {
    if (fn.length <= 1) {
      return fn(arg)
    }
    return curry(fn.bind(null, arg) as any)
  }) as any
}

// Использование
function add3(a: number, b: number, c: number): number {
  return a + b + c
}

const curriedAdd = curry(add3)
const result = curriedAdd(1)(2)(3)  // number

// 2. Pipe функции с выводом типов
type PipeReturnType<F extends any[], T = any> = F extends [
  (arg: T) => infer R,
  ...infer Rest
]
  ? Rest extends []
    ? R
    : PipeReturnType<Rest, R>
  : never

function pipe<F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
  ...fns: F
): (arg: Parameters<F[0]>[0]) => PipeReturnType<F> {
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg) as any
}

// Использование
const addOne = (x: number) => x + 1
const toString = (x: number) => x.toString()
const addExclamation = (x: string) => x + "!"

const transform = pipe(addOne, toString, addExclamation)
const pipeResult = transform(5)  // string: "6!"

// 3. Deep Partial с infer
type DeepPartial<T> = T extends object
  ? T extends (infer U)[]
    ? DeepPartial<U>[]
    : { [P in keyof T]?: DeepPartial<T[P]> }
  : T

interface NestedUser {
  name: string
  address: {
    street: string
    city: string
    country: {
      code: string
      name: string
    }
  }
  tags: string[]
}

type PartialUser = DeepPartial<NestedUser>
// {
//   name?: string
//   address?: {
//     street?: string
//     city?: string
//     country?: {
//       code?: string
//       name?: string
//     }
//   }
//   tags?: string[]
// }

// 4. Async функции - извлечение типа из async/await
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T extends (...args: any[]) => infer R
    ? R
    : never

async function fetchUserData(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" }
}

function syncGetUser(): { id: number; name: string } {
  return { id: 1, name: "Bob" }
}

type AsyncUser = AsyncReturnType<typeof fetchUserData>
// { id: number; name: string }

type SyncUser = AsyncReturnType<typeof syncGetUser>
// { id: number; name: string }

// 5. Мемоизация с выводом типов
type MemoizedFunction<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => R
  : never

function memoize<T extends (...args: any[]) => any>(
  fn: T
): MemoizedFunction<T> {
  const cache = new Map<string, any>()

  return ((...args: any[]) => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as any
}

// Использование
const expensiveCalc = (x: number, y: number): number => {
  console.log('Calculating...')
  return x * y
}

const memoized = memoize(expensiveCalc)
memoized(5, 10)  // Calculating... 50
memoized(5, 10)  // 50 (из кэша, без лога)

// 6. Debounce с типами
type DebouncedFunction<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => void
  : never

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null

  return ((...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as any
}

// Использование
const handleSearch = (query: string): void => {
  console.log('Searching for:', query)
}

const debouncedSearch = debounce(handleSearch, 300)
debouncedSearch("hello")  // void, правильные типы!

// 7. Throttle с выводом типов
type ThrottledFunction<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => void
  : never

function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle = false

  return ((...args: any[]) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }) as any
}

// 8. Retry функция с типами
type RetryFunction<T> = T extends (...args: infer P) => Promise<infer R>
  ? (...args: P) => Promise<R>
  : never

function retry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  attempts: number = 3
): RetryFunction<T> {
  return (async (...args: any[]) => {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args)
      } catch (error) {
        if (i === attempts - 1) {
          throw error
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }) as any
}

// Использование
const fetchData = async (url: string): Promise<{ data: string }> => {
  const response = await fetch(url)
  return response.json()
}

const retryableFetch = retry(fetchData, 3)
const data = await retryableFetch("https://api.example.com")
// Promise<{ data: string }>

// 9. Compose с полным выводом типов
type Compose<F extends any[], T = any> = F extends [
  ...infer Rest,
  (arg: infer A) => T
]
  ? Rest extends []
    ? (arg: A) => T
    : Rest extends [...any[], (arg: any) => infer B]
      ? Compose<Rest, B> extends (arg: infer C) => any
        ? (arg: C) => T
        : never
      : never
  : never

function compose<F extends Array<(arg: any) => any>>(
  ...fns: F
): Compose<F> {
  return ((arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg)) as any
}

// Использование
const multiplyBy2 = (x: number) => x * 2
const subtract1 = (x: number) => x - 1
const toStr = (x: number) => x.toString()

const composed = compose(toStr, subtract1, multiplyBy2)
const composedResult = composed(5)  // string: "9"

// 10. Type-safe event emitter
type EventMap = Record<string, any>

type EventHandler<T> = T extends (...args: infer P) => any
  ? (...args: P) => void
  : T extends any[]
    ? (...args: T) => void
    : (arg: T) => void

class TypedEventEmitter<Events extends EventMap> {
  private listeners: { [K in keyof Events]?: Array<EventHandler<Events[K]>> } = {}

  on<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(handler)
  }

  emit<K extends keyof Events>(
    event: K,
    ...args: Events[K] extends any[] ? Events[K] : [Events[K]]
  ): void {
    const handlers = this.listeners[event]
    if (handlers) {
      handlers.forEach(handler => handler(...args as any))
    }
  }
}

// Использование
interface MyEvents {
  userLogin: [username: string, timestamp: number]
  userLogout: string
  dataUpdate: { id: number; data: any }
}

const emitter = new TypedEventEmitter<MyEvents>()

emitter.on('userLogin', (username, timestamp) => {
  // username: string, timestamp: number - типы выведены!
  console.log(\`User \${username} logged in at \${timestamp}\`)
})

emitter.emit('userLogin', 'alice', Date.now())  // ✅ Правильно
// emitter.emit('userLogin', 'alice')  // ❌ Ошибка! Не хватает аргумента
`

const snippet6 = `
// =====================================
// ОГРАНИЧЕНИЯ И EDGE CASES
// =====================================

// 1. Infer не работает вне условных типов
// ❌ type BadInfer = infer T  // Ошибка!

// ✅ Правильно - только внутри conditional type
type GoodInfer<T> = T extends infer U ? U : never

// 2. Циклические ссылки
type Circular<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Circular<U>  // Рекурсия
    : U
  : T

type Test1 = Circular<number[][][]>  // number
type Test2 = Circular<string[]>      // string

// 3. Множественные infer с одинаковым именем
type MultipleInfer<T> = T extends (a: infer U, b: infer U) => any
  ? U  // U будет union типов если они разные
  : never

type Func1 = (a: string, b: string) => void
type Result1 = MultipleInfer<Func1>  // string

type Func2 = (a: string, b: number) => void
type Result2 = MultipleInfer<Func2>  // string | number (union!)

// 4. Infer в позиции возврата vs параметров
// Контравариантность vs ковариантность
type InParams<T> = T extends (arg: infer U) => any ? U : never
type InReturn<T> = T extends (...args: any[]) => infer R ? R : never

type FuncType = (arg: string | number) => boolean | null

type Param = InParams<FuncType>   // string | number
type Return = InReturn<FuncType>  // boolean | null

// 5. Infer с дженериками
type UnpackGeneric<T> = T extends Box<infer U> ? U : never

interface Box<T> {
  value: T
}

type StringBox = Box<string>
type UnpackedString = UnpackGeneric<StringBox>  // string

type NumberBox = Box<number>
type UnpackedNumber = UnpackGeneric<NumberBox>  // number

// 6. Infer с mapped types
type Values<T> = T extends { [K in keyof T]: infer V } ? V : never

interface Person {
  name: string
  age: number
  active: boolean
}

type PersonValues = Values<Person>  // string | number | boolean

// 7. Глубокая распаковка с ограничениями
type DeepUnpack<T> = {
  done: T
  recur: T extends Promise<infer U>
    ? DeepUnpack<U>
    : T extends Array<infer U>
      ? DeepUnpack<U>
      : T
}[T extends Promise<any> | Array<any> ? 'recur' : 'done']

type Deep1 = Promise<Promise<number>>
type Unpacked1 = DeepUnpack<Deep1>  // number

type Deep2 = Array<Array<string>>
type Unpacked2 = DeepUnpack<Deep2>  // string

type Deep3 = Promise<Array<number>>
type Unpacked3 = DeepUnpack<Deep3>  // number

// 8. Невозможные типы с infer
type Impossible<T> = T extends (infer U & infer V) ? U | V : never

type Test = Impossible<string>  // string (U и V оба string)

// 9. Проблема с any
type InferFromAny<T> = T extends infer U ? U : never

type FromAny = InferFromAny<any>  // any (теряется информация)

// 10. Infer с never
type InferFromNever<T> = T extends infer U ? U : string

type FromNever = InferFromNever<never>  // never (не string!)
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.typescript, 'typescript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.typescript, 'typescript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.typescript, 'typescript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.typescript, 'typescript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.typescript, 'typescript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Infer Types в TypeScript: автоматический вывод типов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Infer Types</b> — это мощная возможность TypeScript для автоматического извлечения и вывода типов
              из других типов внутри условных типов (conditional types). Ключевое слово <code>infer</code> позволяет
              TypeScript "угадать" тип на основе структуры и автоматически его извлечь.
            </p>

            <!-- Основная концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Что такое Infer Types?</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> <code>infer</code> используется ТОЛЬКО внутри условных типов
              (T extends Something ? TrueType : FalseType) и позволяет TypeScript автоматически определить
              и сохранить тип для дальнейшего использования.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">Зачем нужен infer?</h3>
                  <ul class="pl-4">
                    <li>Извлечение типов из функций</li>
                    <li>Распаковка Promise и массивов</li>
                    <li>Получение типов параметров</li>
                    <li>Парсинг строковых литералов</li>
                    <li>Работа с дженериками</li>
                    <li>Создание утилитарных типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">Когда использовать?</h3>
                  <ul class="pl-4">
                    <li>Нужен тип возврата функции</li>
                    <li>Работа с неизвестными типами</li>
                    <li>Создание type-safe оберток</li>
                    <li>Построение сложных типов</li>
                    <li>Автоматизация вывода типов</li>
                    <li>Создание библиотечных типов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы работы с Infer</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <!-- Решение задачи -->
            <h2 class="text-h5 font-weight-bold mb-3">Решение задачи из вопроса</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Задача:</strong> Создать тип для функции, которая принимает другую функцию
              и возвращает ее результат, используя Infer Types для вывода типа возвращаемого значения.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования Infer</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <!-- Множественные infer -->
            <h2 class="text-h5 font-weight-bold mb-3">Множественные Infer в одном типе</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <!-- Сложные паттерны -->
            <h2 class="text-h5 font-weight-bold mb-3">Сложные паттерны с Infer</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <!-- Встроенные утилитарные типы с infer -->
            <h2 class="text-h5 font-weight-bold mb-3">Встроенные утилитарные типы TypeScript</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Реализация с Infer</th>
                <th class="text-left font-weight-bold">Описание</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>ReturnType&lt;T&gt;</code></td>
                <td><code>T extends (...args: any) => infer R</code></td>
                <td>Возвращаемый тип функции</td>
              </tr>
              <tr>
                <td><code>Parameters&lt;T&gt;</code></td>
                <td><code>T extends (...args: infer P) => any</code></td>
                <td>Типы параметров функции</td>
              </tr>
              <tr>
                <td><code>ConstructorParameters&lt;T&gt;</code></td>
                <td><code>T extends new (...args: infer P) => any</code></td>
                <td>Типы параметров конструктора</td>
              </tr>
              <tr>
                <td><code>InstanceType&lt;T&gt;</code></td>
                <td><code>T extends new (...args: any) => infer R</code></td>
                <td>Тип экземпляра класса</td>
              </tr>
              <tr>
                <td><code>Awaited&lt;T&gt;</code></td>
                <td><code>T extends Promise&lt;infer U&gt;</code></td>
                <td>Распаковка Promise</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Ограничения -->
            <h2 class="text-h5 font-weight-bold mb-3">Ограничения и Edge Cases</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Infer vs Альтернативные подходы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Infer Types</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Автоматический вывод</li>
                    <li>Гибкость</li>
                    <li>Читаемость</li>
                    <li>Композируемость</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Только в conditional types</li>
                    <li>Может быть сложным</li>
                    <li>Производительность компилятора</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Явные дженерики</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Простота</li>
                    <li>Прозрачность</li>
                    <li>Контроль</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Многословность</li>
                    <li>Ручное управление</li>
                    <li>Дублирование</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>typeof/keyof</strong></td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Простые случаи</li>
                    <li>Быстрота</li>
                  </ul>
                </td>
                <td>
                  <ul class="ma-0 pl-4">
                    <li>Ограниченные возможности</li>
                    <li>Нет автоматического вывода</li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое infer в TypeScript и где его можно использовать?</p>
                <p class="font-weight-regular ma-0">
                  <code>infer</code> — это ключевое слово для автоматического вывода типов внутри условных типов.
                  Используется ТОЛЬКО в выражениях <code>T extends Pattern ? TrueType : FalseType</code>.
                  Позволяет TypeScript "угадать" и сохранить тип для дальнейшего использования.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как извлечь тип возвращаемого значения функции?</p>
                <p class="font-weight-regular ma-0">
                  Использовать встроенный тип <code>ReturnType&lt;T&gt;</code> или создать свой:
                  <code>type MyReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never</code>.
                  Infer R автоматически выведет тип возвращаемого значения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между infer в позиции параметра и возврата?</p>
                <p class="font-weight-regular ma-0">
                  Позиция параметра: контравариантность — если несколько типов, берется более общий.
                  Позиция возврата: ковариантность — если несколько типов, создается union.
                  Это связано с variance в системе типов TypeScript.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать несколько infer в одном типе?</p>
                <p class="font-weight-regular ma-0">
                  Да! Можно использовать множество <code>infer</code> для извлечения разных частей типа.
                  Например: <code>T extends (a: infer A, b: infer B) => infer R</code> извлечет все три типа.
                  Если одно имя используется дважды, TypeScript создаст union или intersection.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как распаковать вложенные Promise?</p>
                <p class="font-weight-regular ma-0">
                  Рекурсивно: <code>type Unwrap&lt;T&gt; = T extends Promise&lt;infer U&gt; ? Unwrap&lt;U&gt; : T</code>.
                  Или использовать встроенный <code>Awaited&lt;T&gt;</code> (TypeScript 4.5+), который делает то же самое.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает infer с generic типами?</p>
                <p class="font-weight-regular ma-0">
                  Infer может извлекать типы из дженериков: <code>T extends Box&lt;infer U&gt; ? U : never</code>.
                  Это позволяет "распаковывать" обертки типов и получать внутренний тип,
                  что полезно для работы с контейнерными типами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть ограничения у infer?</p>
                <p class="font-weight-regular ma-0">
                  Работает только в conditional types, не может использоваться напрямую вне условий.
                  При рекурсии может замедлять компилятор. С <code>any</code> теряет информацию о типе.
                  С циклическими ссылками может вызвать проблемы производительности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как infer используется в Template Literal Types?</p>
                <p class="font-weight-regular ma-0">
                  Infer отлично работает с template literals для парсинга строк:
                  <code>T extends \`\${infer Start}-\${infer End}\`</code> извлечет части до и после дефиса.
                  Это мощный инструмент для type-safe работы со строками.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать type-safe wrapper функции с infer?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>Parameters&lt;T&gt;</code> и <code>ReturnType&lt;T&gt;</code>:
                  <code>function wrap&lt;T extends (...args: any[]) => any&gt;(fn: T): (...args: Parameters&lt;T&gt;) => ReturnType&lt;T&gt;</code>.
                  Это сохранит все типы исходной функции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет при infer с never?</p>
                <p class="font-weight-regular ma-0">
                  <code>T extends infer U ? U : X</code> где T = never вернет never, а не X.
                  Never "распространяется" через conditional types. Это важно учитывать при работе
                  с union типами и фильтрацией.
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
                    <li>Использовать встроенные утилиты</li>
                    <li>Давать понятные имена типам</li>
                    <li>Документировать сложные типы</li>
                    <li>Тестировать edge cases</li>
                    <li>Использовать для библиотек</li>
                    <li>Комбинировать с другими типами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использования вне conditional types</li>
                    <li>Слишком глубокой рекурсии</li>
                    <li>Неоднозначных имен</li>
                    <li>Избыточной сложности</li>
                    <li>Игнорирования производительности</li>
                    <li>Повторного изобретения встроенных типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Начинать с простых примеров</li>
                    <li>Использовать TypeScript Playground</li>
                    <li>Изучать встроенные типы</li>
                    <li>Читать type definitions</li>
                    <li>Практиковаться на реальных задачах</li>
                    <li>Смотреть на популярные библиотеки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Применение в реальных проектах -->
            <h2 class="text-h5 font-weight-bold mb-3">Применение в реальных проектах</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Библиотеки</h3>
                  <ul class="pl-4">
                    <li><strong>React:</strong> ComponentProps, ReactElement</li>
                    <li><strong>Redux:</strong> ActionType, ThunkAction</li>
                    <li><strong>Express:</strong> RequestHandler типы</li>
                    <li><strong>GraphQL:</strong> Resolver types</li>
                    <li><strong>Prisma:</strong> Model types</li>
                    <li><strong>tRPC:</strong> Procedure types</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Частые паттерны</h3>
                  <ul class="pl-4">
                    <li>Type-safe event emitters</li>
                    <li>API client типизация</li>
                    <li>State management типы</li>
                    <li>Routing типизация</li>
                    <li>Form validation</li>
                    <li>Data transformation pipelines</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Infer Types</b> — это мощный инструмент TypeScript для автоматического извлечения и вывода типов
              внутри условных типов. Ключевое слово <code>infer</code> позволяет создавать гибкие, переиспользуемые
              и type-safe утилитарные типы. Основные применения: извлечение типов из функций (<code>ReturnType</code>,
              <code>Parameters</code>), распаковка Promise и массивов, работа с дженериками, парсинг template literals.
              Важно помнить, что <code>infer</code> работает ТОЛЬКО внутри conditional types и требует понимания
              variance (ковариантности/контравариантности). Правильное использование infer делает код более безопасным,
              читаемым и maintainable, особенно при создании библиотек и сложных type-level операций.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types"
                target="_blank"
                class="mr-2">
                TypeScript Handbook
              </v-btn>
              <v-btn
                color="secondary"
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
