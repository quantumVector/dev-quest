<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const basicTypesSnippet = `
// =====================================
// БАЗОВЫЕ ТИПЫ ДАННЫХ В TYPESCRIPT
// =====================================

// 1. Примитивные типы
let isDone: boolean = false
let count: number = 42
let price: number = 19.99
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
let bigNumber: bigint = 100n

let userName: string = "John"
let message: string = \`Hello, \${userName}!\`

// 2. null и undefined
let nothing: null = null
let notDefined: undefined = undefined

// По умолчанию null и undefined являются подтипами всех типов
let num: number = undefined  // ошибка только при strictNullChecks
let str: string = null       // ошибка только при strictNullChecks

// 3. void - отсутствие типа (для функций без return)
function logMessage(message: string): void {
  console.log(message)
  // нет return
}

// void переменные могут быть только undefined (при strictNullChecks)
let unusable: void = undefined

// 4. symbol - уникальные идентификаторы
const sym1: symbol = Symbol("key")
const sym2: symbol = Symbol("key")
console.log(sym1 === sym2)  // false

// 5. Массивы
let numbers: number[] = [1, 2, 3, 4, 5]
let strings: Array<string> = ["a", "b", "c"]

// Многомерные массивы
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6]
]

// 6. object - не примитивный тип
let obj: object = { name: "John" }
let obj2: object = [1, 2, 3]
let obj3: object = new Date()

// object vs Object vs {} - разница важна!
declare function create(o: object): void
create({ prop: 0 })  // OK
create(null)         // ошибка
create(42)           // ошибка
create("string")     // ошибка
`

const anyUnknownNeverSnippet = `
// =====================================
// ANY, UNKNOWN, NEVER - СПЕЦИАЛЬНЫЕ ТИПЫ
// =====================================

// 1. any - отключение проверки типов
let anything: any = 42
anything = "string"
anything = true
anything = { x: 1 }
anything.foo.bar.baz()  // нет ошибки компиляции!

// any "заразен" - распространяется на другие переменные
let value: any = "text"
let result: string = value  // OK, но небезопасно

// Использование any - антипаттерн, избегайте когда возможно
function dangerousFunction(x: any) {
  return x.toUpperCase()  // что если x - number?
}

// 2. unknown - безопасная альтернатива any
let uncertain: unknown = 42
uncertain = "string"
uncertain = true

// unknown требует проверки типа перед использованием
let value1: unknown = "Hello"
// value1.toUpperCase()  // ошибка!

// Нужна проверка типа
if (typeof value1 === "string") {
  console.log(value1.toUpperCase())  // OK
}

// Type guards с unknown
function processValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase()
  }

  if (typeof value === "number") {
    return value.toFixed(2)
  }

  if (Array.isArray(value)) {
    return value.length
  }

  throw new Error("Unsupported type")
}

// unknown безопаснее any
let unknownValue: unknown = "test"
let stringValue: string = unknownValue  // ошибка!
let stringValue2: string = unknownValue as string  // OK с явным приведением

// 3. never - тип который никогда не возникает
// Функции которые никогда не возвращают значение
function throwError(message: string): never {
  throw new Error(message)
  // после throw код не выполняется
}

function infiniteLoop(): never {
  while (true) {
    console.log("Forever...")
  }
}

// never в исчерпывающих проверках (exhaustive checks)
type Shape = Circle | Square | Triangle

interface Circle {
  kind: "circle"
  radius: number
}

interface Square {
  kind: "square"
  size: number
}

interface Triangle {
  kind: "triangle"
  base: number
  height: number
}

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.size ** 2
    case "triangle":
      return (shape.base * shape.height) / 2
    default:
      // Если мы добавим новую фигуру и забудем обработать,
      // TypeScript покажет ошибку
      const exhaustiveCheck: never = shape
      throw new Error(\`Unhandled shape: \${exhaustiveCheck}\`)
  }
}

// never в типах
type NonNullable<T> = T extends null | undefined ? never : T

type Result = NonNullable<string | null>  // string
type Result2 = NonNullable<number | undefined>  // number

// Пересечение с never дает never
type Intersection = string & never  // never
type Union = string | never  // string
`

const comparisonSnippet = `
// =====================================
// СРАВНЕНИЕ ANY, UNKNOWN, NEVER
// =====================================

// 1. Присваивание TO
let anyVar: any
let unknownVar: unknown
let neverVar: never

anyVar = 42             // OK
unknownVar = 42         // OK
// neverVar = 42        // ошибка! never не может иметь значение

// 2. Присваивание FROM
let str: string

str = anyVar            // OK - any отключает проверку типов
// str = unknownVar     // ошибка! требуется проверка типа
// str = neverVar       // OK - never подтип любого типа (но присвоить never нельзя)

// 3. Безопасность типов
function handleAny(value: any) {
  value.toUpperCase()   // компилируется, но может упасть в runtime
}

function handleUnknown(value: unknown) {
  // value.toUpperCase() // ошибка компиляции!

  if (typeof value === "string") {
    value.toUpperCase()  // OK - проверка типа
  }
}

// 4. Использование в возвращаемых типах
function returnsAny(): any {
  return "anything"
}

function returnsUnknown(): unknown {
  return "something"
}

function returnsNever(): never {
  throw new Error("Never returns")
}

// 5. Таблица совместимости
/*
┌─────────────┬─────────────┬─────────────┬─────────────┐
│             │ any         │ unknown     │ never       │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ TO any      │ ✅          │ ✅          │ ✅          │
│ TO unknown  │ ✅          │ ✅          │ ✅          │
│ TO string   │ ✅          │ ❌          │ ✅*         │
│ FROM any    │ ✅          │ ✅          │ ❌          │
│ FROM unknown│ ❌          │ ✅          │ ❌          │
│ FROM never  │ ✅          │ ✅          │ ✅          │
└─────────────┴─────────────┴─────────────┴─────────────┘
* never подтип всех типов, но создать never значение нельзя
*/
`

const tuplesSnippet = `
// =====================================
// TUPLES - КОРТЕЖИ
// =====================================

// 1. Базовое определение
// Tuple - массив фиксированной длины с типами для каждого элемента
let tuple: [string, number] = ["hello", 42]

console.log(tuple[0].toUpperCase())  // "HELLO"
console.log(tuple[1].toFixed(2))     // "42.00"

// Ошибки при неправильном использовании
// tuple[0] = 42            // ошибка! ожидается string
// tuple[1] = "text"        // ошибка! ожидается number
// let third = tuple[2]     // ошибка! только 2 элемента

// 2. Различия с массивами
// Массив - произвольная длина, один тип
let array: number[] = [1, 2, 3, 4, 5]
array.push(6)  // OK
array[10] = 100  // OK

// Tuple - фиксированная длина, разные типы
let pair: [string, number] = ["age", 30]
// pair.push("extra")  // компилируется (баг TS), но не рекомендуется!
// pair[2]  // ошибка при чтении

// 3. Доступ к элементам
let employee: [string, number, boolean] = ["John", 30, true]

const [name, age, isActive] = employee  // деструктуризация
console.log(name)      // "John", тип string
console.log(age)       // 30, тип number
console.log(isActive)  // true, тип boolean

// 4. Optional элементы в tuple
let point: [number, number, number?] = [10, 20]
point = [10, 20, 30]  // OK

// 5. Rest элементы в tuple
let tuple1: [string, ...number[]] = ["hello", 1, 2, 3, 4]
let tuple2: [boolean, ...string[], number] = [true, "a", "b", "c", 42]

// 6. Readonly tuples
let readonlyTuple: readonly [string, number] = ["name", 30]
// readonlyTuple[0] = "new"  // ошибка!
// readonlyTuple.push(42)     // ошибка!

// 7. Именованные элементы tuple (TS 4.0+)
type Range = [start: number, end: number]
type Coordinates = [x: number, y: number, z?: number]

function createRange(start: number, end: number): Range {
  return [start, end]
}

const [start, end] = createRange(1, 10)

// 8. Практические примеры
// useState в React
type State = [value: number, setValue: (n: number) => void]

function useState(initial: number): State {
  let value = initial
  const setValue = (n: number) => { value = n }
  return [value, setValue]
}

const [count, setCount] = useState(0)

// Возврат множественных значений
function getUserInfo(): [string, number, string] {
  return ["John Doe", 30, "john@example.com"]
}

const [fullName, userAge, email] = getUserInfo()

// Словарь с типизированными ключами
type RGB = [red: number, green: number, blue: number]

const colors: Map<string, RGB> = new Map([
  ["red", [255, 0, 0]],
  ["green", [0, 255, 0]],
  ["blue", [0, 0, 255]]
])
`

const enumsSnippet = `
// =====================================
// ENUMS - ПЕРЕЧИСЛЕНИЯ
// =====================================

// 1. Числовые enum (numeric enum)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let dir: Direction = Direction.Up
console.log(dir)  // 0
console.log(Direction[0])  // "Up" - обратное отображение

// С явными значениями
enum Status {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
  Failed = 4
}

// С вычисляемыми значениями
enum FileAccess {
  None = 0,
  Read = 1 << 0,     // 1
  Write = 1 << 1,    // 2
  ReadWrite = Read | Write  // 3
}

// 2. Строковые enum (string enum)
enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG"
}

let level: LogLevel = LogLevel.Error
console.log(level)  // "ERROR"

// Нет обратного отображения для строковых enum!
// console.log(LogLevel["ERROR"])  // undefined

// 3. Гетерогенные enum (смешанные) - не рекомендуется
enum Mixed {
  No = 0,
  Yes = "YES"
}

// 4. Const enum - оптимизация
const enum Colors {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

let color = Colors.Red  // инлайнится в "#FF0000"

// Скомпилируется в:
// let color = "#FF0000"

// 5. Computed и constant members
enum E1 {
  A = 1,
  B,              // 2 - constant member
  C = A + B,      // 3 - computed member
  D = Math.random()  // computed member
}

// 6. Enum в качестве типа
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

interface User {
  id: number
  name: string
  role: UserRole  // только значения из enum
}

const user: User = {
  id: 1,
  name: "John",
  role: UserRole.Admin  // OK
  // role: "ADMIN"       // ошибка! строка не присваивается UserRole
}

// 7. Enum vs Union Types
// Enum
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

function requestWithEnum(method: HttpMethod) {
  // ...
}

requestWithEnum(HttpMethod.GET)

// Union Type - альтернатива
type HttpMethodType = "GET" | "POST" | "PUT" | "DELETE"

function requestWithUnion(method: HttpMethodType) {
  // ...
}

requestWithUnion("GET")  // проще использовать

// 8. Reverse mapping (обратное отображение)
enum Animal {
  Dog = 1,
  Cat = 2
}

console.log(Animal.Dog)    // 1
console.log(Animal[1])     // "Dog"
console.log(Animal["Dog"]) // 1

// Скомпилируется в:
/*
var Animal;
(function (Animal) {
    Animal[Animal["Dog"] = 1] = "Dog";
    Animal[Animal["Cat"] = 2] = "Cat";
})(Animal || (Animal = {}));
*/

// 9. Практические примеры
// HTTP статус коды
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      console.log("Success!")
      break
    case HttpStatus.NotFound:
      console.log("Resource not found")
      break
    default:
      console.log("Unknown status")
  }
}

// Флаги с битовыми операциями
enum Permission {
  None = 0,
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  Delete = 1 << 2,  // 4
  Admin = Read | Write | Delete  // 7
}

function hasPermission(user: number, permission: Permission): boolean {
  return (user & permission) === permission
}

const userPermissions = Permission.Read | Permission.Write
console.log(hasPermission(userPermissions, Permission.Read))   // true
console.log(hasPermission(userPermissions, Permission.Delete)) // false
`

const literalTypesSnippet = `
// =====================================
// LITERAL TYPES - ЛИТЕРАЛЬНЫЕ ТИПЫ
// =====================================

// 1. String literal types
let direction: "up" | "down" | "left" | "right"
direction = "up"    // OK
// direction = "forward"  // ошибка!

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

function request(url: string, method: HttpMethod) {
  console.log(\`\${method} \${url}\`)
}

request("/api/users", "GET")  // OK
// request("/api/users", "PATCH")  // ошибка!

// 2. Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll
}

let result: DiceRoll = 3  // OK
// let result2: DiceRoll = 7  // ошибка!

// 3. Boolean literal types
type Yes = true
type No = false

let agree: Yes = true
// let agree2: Yes = false  // ошибка!

// 4. Mixed literal types
type Status = "success" | "error" | 200 | 404 | 500

function handleStatus(status: Status) {
  if (status === "success" || status === 200) {
    console.log("Operation successful")
  } else {
    console.log("Operation failed")
  }
}

// 5. Literal inference
// const - литеральный тип
const constantString = "hello"  // тип: "hello"
const constantNumber = 42       // тип: 42

// let - расширенный тип
let variableString = "hello"    // тип: string
let variableNumber = 42         // тип: number

// Решение - as const
let literalString = "hello" as const  // тип: "hello"
let literalNumber = 42 as const       // тип: 42

// 6. as const для объектов
const config = {
  host: "localhost",
  port: 3000,
  protocol: "http"
} as const

// Тип config:
// {
//   readonly host: "localhost"
//   readonly port: 3000
//   readonly protocol: "http"
// }

// config.host = "example.com"  // ошибка! readonly

// 7. Template literal types (TS 4.1+)
type EventName = "click" | "focus" | "blur"
type HandlerName = \`on\${Capitalize<EventName>}\`
// тип: "onClick" | "onFocus" | "onBlur"

type HTTPMethod = "GET" | "POST"
type Endpoint = "/users" | "/posts"
type APIRoute = \`\${HTTPMethod} \${Endpoint}\`
// тип: "GET /users" | "GET /posts" | "POST /users" | "POST /posts"

// 8. Практические примеры
// Цвета
type PrimaryColor = "red" | "green" | "blue"
type RGB = \`rgb(\${number}, \${number}, \${number})\`
type HEX = \`#\${string}\`

type Color = PrimaryColor | RGB | HEX

const color1: Color = "red"
const color2: Color = "rgb(255, 0, 0)"
const color3: Color = "#ff0000"

// CSS размеры
type CSSUnit = "px" | "em" | "rem" | "%" | "vh" | "vw"
type CSSSize = \`\${number}\${CSSUnit}\`

const width: CSSSize = "100px"
const height: CSSSize = "50vh"

// Состояние загрузки
type LoadingState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "success"; data: any }
  | { status: "error"; error: string }

function handleLoading(state: LoadingState) {
  switch (state.status) {
    case "idle":
      console.log("Not started")
      break
    case "loading":
      console.log(\`Loading: \${state.progress}%\`)
      break
    case "success":
      console.log("Data:", state.data)
      break
    case "error":
      console.log("Error:", state.error)
      break
  }
}

// 9. Дискриминированные union с литералами
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number }

function getArea(shape: Shape): number {
  switch (shape.kind) {  // kind - дискриминант
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.size ** 2
    case "rectangle":
      return shape.width * shape.height
  }
}

// 10. Брендированные типы (branded types)
type UserId = string & { readonly __brand: "UserId" }
type PostId = string & { readonly __brand: "PostId" }

function getUserById(id: UserId) {
  // ...
}

function getPostById(id: PostId) {
  // ...
}

const userId = "user-123" as UserId
const postId = "post-456" as PostId

getUserById(userId)  // OK
// getUserById(postId)  // ошибка! PostId не UserId
`

const advancedTypesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТЕХНИКИ С ТИПАМИ
// =====================================

// 1. Type guards с literal types
function isHttpSuccess(status: number): status is 200 | 201 | 204 {
  return status >= 200 && status < 300
}

function handleResponse(status: number) {
  if (isHttpSuccess(status)) {
    // status имеет тип 200 | 201 | 204
    console.log("Success:", status)
  }
}

// 2. Mapped types с template literals
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface Person {
  name: string
  age: number
}

type PersonGetters = Getters<Person>
// {
//   getName: () => string
//   getAge: () => number
// }

// 3. Conditional types с infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function createUser() {
  return { id: 1, name: "John" }
}

type User = ReturnType<typeof createUser>
// { id: number; name: string }

// 4. Tuple types с variadic tuples
type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Result1 = Concat<[1, 2], [3, 4]>  // [1, 2, 3, 4]
type Result2 = Concat<[string], [number, boolean]>  // [string, number, boolean]

// 5. Recursive types
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

const data: JSONValue = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  address: {
    city: "New York",
    nested: {
      deep: true
    }
  }
}

// 6. Const assertions для создания readonly literal types
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const

type Route = typeof routes[keyof typeof routes]
// "/" | "/about" | "/contact"

// 7. Exhaustiveness checking с never
type Animal = "dog" | "cat" | "bird"

function getSound(animal: Animal): string {
  switch (animal) {
    case "dog":
      return "woof"
    case "cat":
      return "meow"
    case "bird":
      return "tweet"
    default:
      const exhaustiveCheck: never = animal
      throw new Error(\`Unhandled animal: \${exhaustiveCheck}\`)
  }
}

// 8. Брендированные ID типы
declare const IdBrand: unique symbol

type Id<T> = string & { [IdBrand]: T }

type UserId = Id<"User">
type PostId = Id<"Post">

function getUser(id: UserId): void {
  console.log("Getting user:", id)
}

const userId = "user-123" as UserId
const postId = "post-456" as PostId

getUser(userId)   // OK
// getUser(postId)  // ошибка!
`

const highlightedBasicTypes = ref('')
const highlightedAnyUnknownNever = ref('')
const highlightedComparison = ref('')
const highlightedTuples = ref('')
const highlightedEnums = ref('')
const highlightedLiteralTypes = ref('')
const highlightedAdvancedTypes = ref('')

onMounted(() => {
  highlightedBasicTypes.value = Prism.highlight(basicTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedAnyUnknownNever.value = Prism.highlight(anyUnknownNeverSnippet, Prism.languages.typescript, 'typescript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.typescript, 'typescript')
  highlightedTuples.value = Prism.highlight(tuplesSnippet, Prism.languages.typescript, 'typescript')
  highlightedEnums.value = Prism.highlight(enumsSnippet, Prism.languages.typescript, 'typescript')
  highlightedLiteralTypes.value = Prism.highlight(literalTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedTypes.value = Prism.highlight(advancedTypesSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Типы данных в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>TypeScript</b> расширяет JavaScript статической типизацией, добавляя богатую систему типов.
              Понимание базовых и продвинутых типов критически важно для эффективной работы и успешного
              прохождения собеседования.
            </p>

            <!-- Базовые типы -->
            <h2 class="text-h5 font-weight-bold mb-3">Базовые типы данных</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Примитивные типы</h3>
                  <ul class="pl-4">
                    <li><code>boolean</code> — true/false</li>
                    <li><code>number</code> — числа (int, float)</li>
                    <li><code>bigint</code> — большие целые числа</li>
                    <li><code>string</code> — строки</li>
                    <li><code>symbol</code> — уникальные идентификаторы</li>
                    <li><code>null</code> и <code>undefined</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Составные типы</h3>
                  <ul class="pl-4">
                    <li><code>Array</code> — массивы</li>
                    <li><code>Tuple</code> — кортежи</li>
                    <li><code>object</code> — объекты</li>
                    <li><code>enum</code> — перечисления</li>
                    <li><code>void</code> — отсутствие значения</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicTypes"></code></pre>

            <!-- any, unknown, never -->
            <h2 class="text-h5 font-weight-bold mb-3">Специальные типы: any, unknown, never</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-error">
                  <v-icon size="large" color="white" class="mb-2">mdi-alert-octagon</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">any</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Отключает проверку типов</li>
                    <li>Небезопасен</li>
                    <li>Избегайте когда возможно</li>
                    <li>Совместим со всеми типами</li>
                    <li>Используйте только для миграции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">unknown</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Безопасная альтернатива any</li>
                    <li>Требует проверки типа</li>
                    <li>Топ тип (top type)</li>
                    <li>Рекомендуется вместо any</li>
                    <li>Type-safe</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-primary">
                  <v-icon size="large" color="white" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">never</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Тип который никогда не возникает</li>
                    <li>Для функций с throw/infinite loop</li>
                    <li>Боттом тип (bottom type)</li>
                    <li>Exhaustiveness checks</li>
                    <li>Подтип всех типов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedAnyUnknownNever"></code></pre>

            <!-- Таблица сравнения -->
            <h3 class="text-h6 font-weight-bold mb-3">Детальное сравнение</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <!-- Tuples -->
            <h2 class="text-h5 font-weight-bold mb-3">Tuple — кортежи</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Tuple</strong> — массив фиксированной длины с известными типами для каждого элемента.
              В отличие от массива, каждая позиция имеет свой тип.
            </v-alert>

            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Array</th>
                <th class="text-left font-weight-bold">Tuple</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Длина</strong></td>
                <td>Динамическая</td>
                <td>Фиксированная</td>
              </tr>
              <tr>
                <td><strong>Типы элементов</strong></td>
                <td>Один тип для всех</td>
                <td>Разные типы для позиций</td>
              </tr>
              <tr>
                <td><strong>Индексация</strong></td>
                <td><code>T[]</code> или <code>Array&lt;T&gt;</code></td>
                <td><code>[T1, T2, T3]</code></td>
              </tr>
              <tr>
                <td><strong>Методы</strong></td>
                <td>Все методы массива</td>
                <td>Методы массива (с осторожностью)</td>
              </tr>
              <tr>
                <td><strong>Использование</strong></td>
                <td>Коллекции однотипных данных</td>
                <td>Структуры с фиксированными полями</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTuples"></code></pre>

            <!-- Enums -->
            <h2 class="text-h5 font-weight-bold mb-3">Enum — перечисления</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Числовые enum</h3>
                  <ul class="pl-4">
                    <li>По умолчанию начинаются с 0</li>
                    <li>Автоинкремент</li>
                    <li>Обратное отображение</li>
                    <li>Битовые флаги</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Строковые enum</h3>
                  <ul class="pl-4">
                    <li>Явные строковые значения</li>
                    <li>Лучше для сериализации</li>
                    <li>Без обратного отображения</li>
                    <li>Более читаемы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Const enum</h3>
                  <ul class="pl-4">
                    <li>Полностью инлайнятся</li>
                    <li>Нет runtime кода</li>
                    <li>Оптимизация производительности</li>
                    <li>Нельзя использовать dynamically</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEnums"></code></pre>

            <!-- Enum vs Union -->
            <h3 class="text-h6 font-weight-bold mb-3">Enum vs Union Types</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">Enum</th>
                <th class="text-left font-weight-bold">Union Types</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Синтаксис</strong></td>
                <td><code>enum Status { ... }</code></td>
                <td><code>type Status = "A" | "B"</code></td>
              </tr>
              <tr>
                <td><strong>Runtime код</strong></td>
                <td>Генерируется объект</td>
                <td>Нет runtime кода</td>
              </tr>
              <tr>
                <td><strong>Автокомплит</strong></td>
                <td><code>Status.Active</code></td>
                <td>Просто строка <code>"Active"</code></td>
              </tr>
              <tr>
                <td><strong>Обратное отображение</strong></td>
                <td>Есть для числовых</td>
                <td>Нет</td>
              </tr>
              <tr>
                <td><strong>Рефакторинг</strong></td>
                <td>Проще</td>
                <td>Сложнее (строковые литералы)</td>
              </tr>
              <tr>
                <td><strong>Bundle size</strong></td>
                <td>Больше (без const enum)</td>
                <td>Меньше</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Literal Types -->
            <h2 class="text-h5 font-weight-bold mb-3">Literal Types — литеральные типы</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Литеральные типы</strong> — точные значения вместо общих типов. Более строгая типизация
              для конкретных значений.
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества</h3>
                  <ul class="pl-4">
                    <li>Строгая типизация</li>
                    <li>Exhaustiveness checking</li>
                    <li>Лучший автокомплит</li>
                    <li>Нет runtime overhead</li>
                    <li>Самодокументируемый код</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Применение</h3>
                  <ul class="pl-4">
                    <li>Константы конфигурации</li>
                    <li>HTTP методы и статусы</li>
                    <li>Состояния машины состояний</li>
                    <li>CSS значения</li>
                    <li>Дискриминированные union</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLiteralTypes"></code></pre>

            <!-- Advanced -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedTypes"></code></pre>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие базовые типы данных есть в TypeScript?</p>
                <p class="font-weight-regular ma-0">
                  Примитивные: <code>boolean</code>, <code>number</code>, <code>bigint</code>, <code>string</code>,
                  <code>symbol</code>, <code>null</code>, <code>undefined</code>.
                  Составные: массивы, tuple, object, enum. Специальные: <code>any</code>, <code>unknown</code>,
                  <code>never</code>, <code>void</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое tuple и чем отличается от массива?</p>
                <p class="font-weight-regular ma-0">
                  Tuple — массив фиксированной длины с известными типами для каждой позиции.
                  Массив имеет динамическую длину и один тип для всех элементов.
                  Tuple: <code>[string, number]</code>, Array: <code>number[]</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между any, unknown и never?</p>
                <p class="font-weight-regular ma-0">
                  <code>any</code> отключает проверку типов (небезопасно). <code>unknown</code> — безопасная
                  альтернатива any, требует проверки типа. <code>never</code> — тип который никогда не возникает,
                  для функций с throw или бесконечными циклами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как использовать enum и когда он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Enum создает именованный набор констант. Числовые enum поддерживают обратное отображение,
                  строковые — более читаемы. Используйте для статусов, HTTP методов, ролей пользователей.
                  Альтернатива — union types с литералами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое литеральные типы и где применяются?</p>
                <p class="font-weight-regular ma-0">
                  Литеральные типы — точные значения вместо общих типов (<code>"GET" | "POST"</code>).
                  Используются для строгой типизации: HTTP методы, CSS значения, состояния,
                  дискриминированные union. Нет runtime overhead.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать unknown вместо any?</p>
                <p class="font-weight-regular ma-0">
                  Всегда когда тип заранее неизвестен: данные из API, пользовательский ввод, динамический контент.
                  <code>unknown</code> безопаснее — требует проверки типа перед использованием.
                  <code>any</code> только для legacy кода или миграции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает exhaustiveness checking с never?</p>
                <p class="font-weight-regular ma-0">
                  В switch/if для всех вариантов union, в default присваиваем переменную типа <code>never</code>.
                  Если мы забудем обработать вариант, TypeScript покажет ошибку — переменная не может быть
                  присвоена never, так как есть необработанный случай.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между tuple и readonly массивом?</p>
                <p class="font-weight-regular ma-0">
                  Tuple имеет фиксированную длину и разные типы для позиций: <code>[string, number]</code>.
                  Readonly массив запрещает мутации, но длина динамическая и тип один: <code>readonly number[]</code>.
                  Можно комбинировать: <code>readonly [string, number]</code>.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать <code>unknown</code> вместо <code>any</code></li>
                    <li>Tuple для фиксированных структур</li>
                    <li>Literal types для константных значений</li>
                    <li>Строковые enum для читаемости</li>
                    <li>Exhaustiveness checking с <code>never</code></li>
                    <li><code>as const</code> для readonly литералов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использования <code>any</code> без необходимости</li>
                    <li>Гетерогенных enum (смешанных)</li>
                    <li>Мутации tuple через push/pop</li>
                    <li>Числовых enum без явных значений</li>
                    <li>Перегрузки union types</li>
                    <li>Игнорирования ошибок типов через <code>@ts-ignore</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Union types часто лучше enum</li>
                    <li>Type guards для <code>unknown</code></li>
                    <li>Template literal types для строгости</li>
                    <li>Branded types для ID</li>
                    <li>Именованные элементы tuple</li>
                    <li>Const enum для оптимизации</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              TypeScript предоставляет богатую систему типов: от базовых примитивов до продвинутых конструкций.
              <b>Tuple</b> — массивы с фиксированной структурой, отличаются от обычных массивов типами элементов.
              <b>any</b> отключает проверку (избегайте), <b>unknown</b> — безопасная альтернатива (требует проверки),
              <b>never</b> — для exhaustiveness checks. <b>Enum</b> создают именованные константы.
              <b>Литеральные типы</b> обеспечивают точную типизацию конкретных значений.
              Используйте правильные типы для конкретных задач — это основа type-safe кода.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/enums.html"
                target="_blank"
                class="mr-2">
                TS Enums
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types"
                target="_blank">
                Literal Types
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
