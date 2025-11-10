<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const typeGuardsSnippet = `
// =====================================
// TYPE GUARDS - ОСНОВНЫЕ МЕХАНИЗМЫ
// =====================================

// 1. typeof - для примитивных типов
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())  // TypeScript знает, что это string
  } else {
    console.log(value.toFixed(2))     // TypeScript знает, что это number
  }
}

// 2. instanceof - для классов
class Dog {
  bark() { console.log('Woof!') }
}

class Cat {
  meow() { console.log('Meow!') }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()  // TypeScript знает, что это Dog
  } else {
    animal.meow()  // TypeScript знает, что это Cat
  }
}

// 3. in - проверка наличия свойства
interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly()   // TypeScript знает, что это Bird
  } else {
    animal.swim()  // TypeScript знает, что это Fish
  }
}

// 4. Проверка на null/undefined
function printLength(str: string | null | undefined) {
  if (str) {
    console.log(str.length)  // TypeScript знает, что str - string
  } else {
    console.log('String is null or undefined')
  }
}

// Более явная проверка
function printLengthExplicit(str: string | null) {
  if (str !== null) {
    console.log(str.length)  // TypeScript знает, что str - string
  }
}

// 5. Равенство для литеральных типов
type Status = 'success' | 'error' | 'loading'

function handleStatus(status: Status) {
  if (status === 'success') {
    // status имеет тип 'success'
    console.log('Operation succeeded!')
  } else if (status === 'error') {
    // status имеет тип 'error'
    console.log('Operation failed!')
  } else {
    // status имеет тип 'loading'
    console.log('Loading...')
  }
}
`

const customTypeGuardsSnippet = `
// =====================================
// ПОЛЬЗОВАТЕЛЬСКИЕ TYPE GUARDS
// =====================================

// 1. Функция-предикат с "is"
interface User {
  name: string
  email: string
}

interface Admin extends User {
  permissions: string[]
}

// Type Guard функция
function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user
}

function printUserInfo(user: User | Admin) {
  console.log(\`Name: \${user.name}\`)

  if (isAdmin(user)) {
    // TypeScript знает, что user - Admin
    console.log(\`Permissions: \${user.permissions.join(', ')}\`)
  } else {
    // TypeScript знает, что user - User (не Admin)
    console.log('Regular user')
  }
}

// 2. Type Guard для массивов
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string')
}

function processValue(value: unknown) {
  if (isStringArray(value)) {
    // TypeScript знает, что value - string[]
    console.log(value.map(s => s.toUpperCase()))
  }
}

// 3. Type Guard для объектов
interface ApiResponse {
  data: unknown
  error?: string
}

interface SuccessResponse extends ApiResponse {
  data: { id: number; name: string }
  error: undefined
}

interface ErrorResponse extends ApiResponse {
  data: null
  error: string
}

function isSuccessResponse(
  response: ApiResponse
): response is SuccessResponse {
  return response.error === undefined && response.data !== null
}

function handleResponse(response: ApiResponse) {
  if (isSuccessResponse(response)) {
    // TypeScript знает точный тип data
    console.log(\`ID: \${response.data.id}, Name: \${response.data.name}\`)
  } else {
    // TypeScript знает, что error существует
    console.error(\`Error: \${response.error || 'Unknown error'}\`)
  }
}

// 4. Type Guard с дженериками
function isArrayOf<T>(
  value: unknown,
  check: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(check)
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

const mixed: unknown = [1, 2, 3]

if (isArrayOf(mixed, isNumber)) {
  // TypeScript знает, что mixed - number[]
  const sum = mixed.reduce((a, b) => a + b, 0)
  console.log(sum)
}

// 5. Type Guard для union типов с дискриминантом
type Circle = {
  kind: 'circle'
  radius: number
}

type Rectangle = {
  kind: 'rectangle'
  width: number
  height: number
}

type Shape = Circle | Rectangle

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle'
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    // TypeScript знает, что shape - Circle
    return Math.PI * shape.radius ** 2
  } else {
    // TypeScript знает, что shape - Rectangle
    return shape.width * shape.height
  }
}

// 6. Type Guard для проверки типа класса
class Vehicle {
  move() { console.log('Moving...') }
}

class Car extends Vehicle {
  drive() { console.log('Driving...') }
}

class Boat extends Vehicle {
  sail() { console.log('Sailing...') }
}

function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle instanceof Car
}

function operate(vehicle: Vehicle) {
  vehicle.move()

  if (isCar(vehicle)) {
    vehicle.drive()  // TypeScript знает, что это Car
  }
}
`

const discriminatedUnionsSnippet = `
// =====================================
// DISCRIMINATED UNIONS (РАЗМЕЧЕННЫЕ ОБЪЕДИНЕНИЯ)
// =====================================

// 1. Базовый пример с дискриминантом "type"
type LoadingState = {
  type: 'loading'
}

type SuccessState = {
  type: 'success'
  data: { id: number; name: string }
}

type ErrorState = {
  type: 'error'
  error: string
}

type State = LoadingState | SuccessState | ErrorState

function renderState(state: State) {
  // TypeScript автоматически сужает тип по дискриминанту
  switch (state.type) {
    case 'loading':
      return 'Loading...'

    case 'success':
      // TypeScript знает, что state - SuccessState
      return \`Data: \${state.data.name}\`

    case 'error':
      // TypeScript знает, что state - ErrorState
      return \`Error: \${state.error}\`
  }
}

// 2. Discriminated Union для API ответов
type ApiSuccess<T> = {
  status: 'success'
  data: T
  timestamp: Date
}

type ApiError = {
  status: 'error'
  error: {
    code: number
    message: string
  }
  timestamp: Date
}

type ApiResult<T> = ApiSuccess<T> | ApiError

function handleApiResult<T>(result: ApiResult<T>) {
  if (result.status === 'success') {
    // TypeScript знает, что result - ApiSuccess<T>
    console.log('Success:', result.data)
    console.log('Timestamp:', result.timestamp)
  } else {
    // TypeScript знает, что result - ApiError
    console.error(\`Error \${result.error.code}: \${result.error.message}\`)
  }
}

// 3. Более сложный пример с событиями
type MouseEvent = {
  kind: 'mouse'
  x: number
  y: number
  button: 'left' | 'right'
}

type KeyboardEvent = {
  kind: 'keyboard'
  key: string
  modifiers: {
    ctrl: boolean
    shift: boolean
    alt: boolean
  }
}

type TouchEvent = {
  kind: 'touch'
  touches: Array<{ x: number; y: number }>
}

type InputEvent = MouseEvent | KeyboardEvent | TouchEvent

function handleEvent(event: InputEvent) {
  switch (event.kind) {
    case 'mouse':
      console.log(\`Mouse \${event.button} click at (\${event.x}, \${event.y})\`)
      break

    case 'keyboard':
      console.log(\`Key pressed: \${event.key}\`)
      if (event.modifiers.ctrl) {
        console.log('With Ctrl modifier')
      }
      break

    case 'touch':
      console.log(\`Touch with \${event.touches.length} finger(s)\`)
      break
  }
}

// 4. Exhaustiveness checking (проверка полноты)
type PaymentMethod =
  | { type: 'cash' }
  | { type: 'card'; cardNumber: string }
  | { type: 'crypto'; wallet: string }

function processPayment(payment: PaymentMethod) {
  switch (payment.type) {
    case 'cash':
      console.log('Processing cash payment')
      break

    case 'card':
      console.log(\`Processing card: \${payment.cardNumber}\`)
      break

    case 'crypto':
      console.log(\`Processing crypto: \${payment.wallet}\`)
      break

    default:
      // Если забыли обработать какой-то case, TypeScript выдаст ошибку
      const exhaustiveCheck: never = payment
      throw new Error(\`Unhandled payment type: \${exhaustiveCheck}\`)
  }
}

// 5. Вложенные Discriminated Unions
type WebSocketConnecting = {
  state: 'connecting'
  url: string
}

type WebSocketOpen = {
  state: 'open'
  connection: WebSocket
  messageCount: number
}

type WebSocketClosing = {
  state: 'closing'
  reason: string
}

type WebSocketClosed = {
  state: 'closed'
  code: number
  reason: string
}

type WebSocketState =
  | WebSocketConnecting
  | WebSocketOpen
  | WebSocketClosing
  | WebSocketClosed

function getWebSocketStatus(state: WebSocketState): string {
  switch (state.state) {
    case 'connecting':
      return \`Connecting to \${state.url}...\`

    case 'open':
      return \`Connected. Messages: \${state.messageCount}\`

    case 'closing':
      return \`Closing: \${state.reason}\`

    case 'closed':
      return \`Closed with code \${state.code}: \${state.reason}\`
  }
}
`

const assertionsSnippet = `
// =====================================
// ASSERTION FUNCTIONS (ФУНКЦИИ УТВЕРЖДЕНИЯ)
// =====================================

// 1. Базовая assertion функция с "asserts"
function assert(condition: unknown): asserts condition {
  if (!condition) {
    throw new Error('Assertion failed')
  }
}

function processValue(value: string | null) {
  assert(value !== null)

  // После assert TypeScript знает, что value - string
  console.log(value.toUpperCase())
}

// 2. Assertion с явным типом
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value must be a string')
  }
}

function printUpperCase(value: unknown) {
  assertIsString(value)

  // TypeScript знает, что value - string
  console.log(value.toUpperCase())
}

// 3. Assertion для объектов
interface User {
  id: number
  name: string
  email: string
}

function assertIsUser(obj: unknown): asserts obj is User {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    !('id' in obj) ||
    !('name' in obj) ||
    !('email' in obj)
  ) {
    throw new Error('Object is not a User')
  }
}

function processUser(data: unknown) {
  assertIsUser(data)

  // TypeScript знает, что data - User
  console.log(\`User: \${data.name} (\${data.email})\`)
}

// 4. Assertion с условием
function assertNonNull<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message || 'Value is null or undefined')
  }
}

function getUserName(user: User | null): string {
  assertNonNull(user, 'User must be provided')

  // TypeScript знает, что user не null
  return user.name
}

// 5. Assertion для массивов
function assertIsArray<T>(
  value: unknown,
  itemCheck: (item: unknown) => item is T
): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error('Value is not an array')
  }

  for (const item of value) {
    if (!itemCheck(item)) {
      throw new Error('Array contains invalid items')
    }
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

function sumArray(arr: unknown): number {
  assertIsArray(arr, isNumber)

  // TypeScript знает, что arr - number[]
  return arr.reduce((sum, num) => sum + num, 0)
}

// 6. Комбинирование assertions
interface ValidatedData {
  id: number
  email: string
  age: number
}

function assertValidId(id: unknown): asserts id is number {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid ID')
  }
}

function assertValidEmail(email: unknown): asserts email is string {
  if (typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Invalid email')
  }
}

function assertValidAge(age: unknown): asserts age is number {
  if (typeof age !== 'number' || age < 0 || age > 150) {
    throw new Error('Invalid age')
  }
}

function validateData(data: unknown): asserts data is ValidatedData {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object')
  }

  const obj = data as Record<string, unknown>

  assertValidId(obj.id)
  assertValidEmail(obj.email)
  assertValidAge(obj.age)
}

function processValidatedData(data: unknown) {
  validateData(data)

  // TypeScript знает, что data - ValidatedData
  console.log(\`User #\${data.id}: \${data.email}, age \${data.age}\`)
}
`

const controlFlowSnippet = `
// =====================================
// CONTROL FLOW ANALYSIS (АНАЛИЗ ПОТОКА УПРАВЛЕНИЯ)
// =====================================

// 1. Сужение через if/else
function example1(value: string | number) {
  if (typeof value === 'string') {
    // Здесь value: string
    console.log(value.length)
  } else {
    // Здесь value: number
    console.log(value.toFixed(2))
  }
  // После блока value снова: string | number
}

// 2. Сужение через return
function example2(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.length)
    return
  }

  // После return TypeScript знает, что value: number
  console.log(value.toFixed(2))
}

// 3. Сужение через throw
function example3(value: string | null) {
  if (value === null) {
    throw new Error('Value is null')
  }

  // После throw TypeScript знает, что value: string
  console.log(value.toUpperCase())
}

// 4. Сужение через switch
type Action =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' }

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      // TypeScript знает, что action имеет свойство amount
      return state + action.amount

    case 'decrement':
      return state - action.amount

    case 'reset':
      return 0
  }
}

// 5. Truthiness narrowing
function printAll(values: string | string[] | null) {
  // Проверка на truthy значение
  if (values) {
    // TypeScript знает, что values: string | string[]
    if (typeof values === 'string') {
      console.log(values)
    } else {
      console.log(values.join(', '))
    }
  }
}

// 6. Equality narrowing
function example6(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript знает, что оба имеют тип string
    console.log(x.toUpperCase(), y.toUpperCase())
  } else {
    // x: string | number, y: string | boolean
    console.log(x, y)
  }
}

// 7. Narrowing через присваивание
function example7() {
  let value: string | number

  value = 'hello'
  // TypeScript знает, что value: string
  console.log(value.length)

  value = 42
  // TypeScript знает, что value: number
  console.log(value.toFixed(2))
}

// 8. Narrowing в callback функциях
function filterStrings(items: (string | number)[]): string[] {
  return items.filter((item): item is string => {
    return typeof item === 'string'
  })
}

// 9. Narrowing через деструктуризацию
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

function processResult<T, E>(result: Result<T, E>) {
  if (result.ok) {
    // TypeScript знает, что result.value существует
    console.log('Success:', result.value)
  } else {
    // TypeScript знает, что result.error существует
    console.log('Error:', result.error)
  }
}

// 10. Narrowing для optional свойств
interface Config {
  host: string
  port?: number
  timeout?: number
}

function setupServer(config: Config) {
  console.log(\`Host: \${config.host}\`)

  // Optional chaining с narrowing
  if (config.port !== undefined) {
    // TypeScript знает, что config.port: number
    console.log(\`Port: \${config.port}\`)
  }

  // Значение по умолчанию
  const timeout = config.timeout ?? 5000
  console.log(\`Timeout: \${timeout}\`)
}

// 11. Narrowing через try-catch
function parseJSON(json: string): unknown {
  try {
    return JSON.parse(json)
  } catch (error) {
    // TypeScript знает, что error: unknown
    if (error instanceof Error) {
      // TypeScript знает, что error: Error
      console.error('Parse error:', error.message)
    }
    return null
  }
}
`

const advancedNarrowingSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТЕХНИКИ СУЖЕНИЯ
// =====================================

// 1. Сужение с использованием дженериков
function findFirst<T>(
  array: T[],
  predicate: (item: T) => boolean
): T | undefined {
  for (const item of array) {
    if (predicate(item)) {
      return item
    }
  }
  return undefined
}

// Использование с type guard
interface Animal {
  type: 'cat' | 'dog'
  name: string
}

const animals: Animal[] = [
  { type: 'cat', name: 'Whiskers' },
  { type: 'dog', name: 'Buddy' }
]

const firstCat = findFirst(animals, (animal): animal is Animal & { type: 'cat' } => {
  return animal.type === 'cat'
})

if (firstCat) {
  // TypeScript знает, что firstCat.type === 'cat'
  console.log(\`First cat: \${firstCat.name}\`)
}

// 2. Branded types для дополнительной безопасности
type UserId = string & { readonly __brand: 'UserId' }
type ProductId = string & { readonly __brand: 'ProductId' }

function createUserId(id: string): UserId {
  return id as UserId
}

function createProductId(id: string): ProductId {
  return id as ProductId
}

function getUserById(userId: UserId) {
  console.log(\`Getting user: \${userId}\`)
}

function getProductById(productId: ProductId) {
  console.log(\`Getting product: \${productId}\`)
}

const userId = createUserId('user-123')
const productId = createProductId('prod-456')

getUserById(userId)        // ✅ OK
// getUserById(productId)  // ❌ Error: Type 'ProductId' is not assignable to type 'UserId'

// 3. Template literal types с narrowing
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ApiEndpoint = \`/api/\${string}\`
type ApiUrl = \`\${HttpMethod} \${ApiEndpoint}\`

function makeRequest(url: ApiUrl) {
  const [method, endpoint] = url.split(' ') as [HttpMethod, ApiEndpoint]

  console.log(\`Making \${method} request to \${endpoint}\`)
}

makeRequest('GET /api/users')    // ✅ OK
// makeRequest('PATCH /api/users') // ❌ Error

// 4. Conditional types с narrowing
type Unpacked<T> =
  T extends Array<infer U> ? U :
  T extends Promise<infer U> ? U :
  T

function processValue<T>(value: T): Unpacked<T> {
  if (Array.isArray(value)) {
    return value[0] as Unpacked<T>
  }

  if (value instanceof Promise) {
    throw new Error('Cannot process Promise synchronously')
  }

  return value as Unpacked<T>
}

// 5. Mapped types с сужением
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

type NonNullable<T> = {
  [K in keyof T]: Exclude<T[K], null | undefined>
}

interface User {
  name: string
  email: string | null
  age: number | undefined
}

function filterNulls<T extends object>(obj: Nullable<T>): Partial<NonNullable<T>> {
  const result: any = {}

  for (const key in obj) {
    const value = obj[key]
    if (value !== null && value !== undefined) {
      result[key] = value
    }
  }

  return result
}

// 6. Recursive type narrowing
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json }

function stringifyJson(value: Json): string {
  if (value === null) {
    return 'null'
  }

  if (typeof value === 'string') {
    return \`"\${value}"\`
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return '[' + value.map(stringifyJson).join(',') + ']'
  }

  // TypeScript знает, что value - объект
  const entries = Object.entries(value)
    .map(([k, v]) => \`"\${k}":\${stringifyJson(v)}\`)

  return '{' + entries.join(',') + '}'
}

// 7. Narrowing с использованием Map и Set
function processCollection<T>(
  collection: Set<T> | Map<string, T>
): T[] {
  if (collection instanceof Set) {
    // TypeScript знает, что это Set<T>
    return Array.from(collection)
  } else {
    // TypeScript знает, что это Map<string, T>
    return Array.from(collection.values())
  }
}

// 8. Narrowing для readonly массивов
function processArray(arr: readonly number[] | number[]): number {
  // Проверяем, является ли массив readonly
  if (Object.isFrozen(arr)) {
    // Обрабатываем readonly массив
    return arr.reduce((sum, n) => sum + n, 0)
  }

  // Можем изменять обычный массив
  arr.sort((a, b) => a - b)
  return arr[0]
}

// 9. Narrowing с помощью WeakMap
const metadata = new WeakMap<object, { type: string }>()

function setMetadata(obj: object, type: string) {
  metadata.set(obj, { type })
}

function getType(obj: object): string | undefined {
  return metadata.get(obj)?.type
}

function isKnownObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj !== null && metadata.has(obj)
}

// 10. Narrowing через Symbol
const TYPE_SYMBOL = Symbol('type')

interface Tagged {
  [TYPE_SYMBOL]: string
}

function tag<T extends object>(obj: T, type: string): T & Tagged {
  return Object.assign(obj, { [TYPE_SYMBOL]: type })
}

function isTagged(obj: unknown): obj is Tagged {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    TYPE_SYMBOL in obj
  )
}

function getTag(obj: unknown): string | undefined {
  if (isTagged(obj)) {
    return obj[TYPE_SYMBOL]
  }
  return undefined
}
`

const commonMistakesSnippet = `
// =====================================
// ЧАСТЫЕ ОШИБКИ И КАК ИХ ИЗБЕЖАТЬ
// =====================================

// ❌ ОШИБКА 1: Использование any вместо unknown
function badExample(value: any) {
  // TypeScript не проверяет типы с any
  return value.toUpperCase()  // Компилируется, но может упасть
}

// ✅ ПРАВИЛЬНО: Использовать unknown с type guard
function goodExample(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase()  // Безопасно
  }
  throw new Error('Value must be a string')
}

// ❌ ОШИБКА 2: Забывать про null/undefined
interface User {
  name: string
  email?: string
}

function badGetEmail(user: User) {
  return user.email.toLowerCase()  // ❌ Error: Object is possibly 'undefined'
}

// ✅ ПРАВИЛЬНО: Проверять на undefined
function goodGetEmail(user: User): string {
  if (user.email !== undefined) {
    return user.email.toLowerCase()
  }
  return 'no-email@example.com'
}

// Или использовать optional chaining
function betterGetEmail(user: User): string {
  return user.email?.toLowerCase() ?? 'no-email@example.com'
}

// ❌ ОШИБКА 3: Неправильный type guard
function badIsString(value: unknown): boolean {
  return typeof value === 'string'  // Не сужает тип!
}

function example(value: unknown) {
  if (badIsString(value)) {
    // value всё ещё unknown
    // value.toUpperCase()  // ❌ Error
  }
}

// ✅ ПРАВИЛЬНО: Использовать type predicate
function goodIsString(value: unknown): value is string {
  return typeof value === 'string'
}

function betterExample(value: unknown) {
  if (goodIsString(value)) {
    // value теперь string
    value.toUpperCase()  // ✅ OK
  }
}

// ❌ ОШИБКА 4: Потеря сужения при реассигнации
function badFlow(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.length)  // ✅ OK: value - string

    value = Math.random()  // Переназначение

    console.log(value.length)  // ❌ Error: value теперь number
  }
}

// ✅ ПРАВИЛЬНО: Избегать реассигнации или использовать отдельную переменную
function goodFlow(value: string | number) {
  if (typeof value === 'string') {
    const stringValue = value
    console.log(stringValue.length)  // ✅ OK

    const numValue = Math.random()
    console.log(numValue.toFixed(2))  // ✅ OK
  }
}

// ❌ ОШИБКА 5: Неполная проверка объектов
interface Person {
  name: string
  age: number
}

function badIsPerson(obj: unknown): obj is Person {
  // Неполная проверка!
  return typeof obj === 'object' && obj !== null
}

// ✅ ПРАВИЛЬНО: Проверять все обязательные свойства
function goodIsPerson(obj: unknown): obj is Person {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'age' in obj &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).age === 'number'
  )
}

// ❌ ОШИБКА 6: Игнорирование exhaustiveness checking
type Status = 'pending' | 'approved' | 'rejected'

function badHandleStatus(status: Status) {
  switch (status) {
    case 'pending':
      console.log('Pending')
      break
    case 'approved':
      console.log('Approved')
      break
    // Забыли 'rejected'! TypeScript не выдаст ошибку
  }
}

// ✅ ПРАВИЛЬНО: Использовать never для exhaustiveness
function goodHandleStatus(status: Status) {
  switch (status) {
    case 'pending':
      console.log('Pending')
      break
    case 'approved':
      console.log('Approved')
      break
    case 'rejected':
      console.log('Rejected')
      break
    default:
      // Если забыли case, TypeScript выдаст ошибку здесь
      const exhaustive: never = status
      throw new Error(\`Unhandled status: \${exhaustive}\`)
  }
}

// ❌ ОШИБКА 7: Неправильное использование in оператора
interface Cat {
  meow(): void
}

interface Dog {
  bark(): void
}

function badIdentifyAnimal(animal: Cat | Dog) {
  if ('meow' in animal) {
    // Работает, но не идиоматично для TypeScript
    animal.meow()
  }
}

// ✅ ПРАВИЛЬНО: Использовать discriminated union
type Cat2 = {
  type: 'cat'
  meow(): void
}

type Dog2 = {
  type: 'dog'
  bark(): void
}

function goodIdentifyAnimal(animal: Cat2 | Dog2) {
  if (animal.type === 'cat') {
    animal.meow()
  } else {
    animal.bark()
  }
}

// ❌ ОШИБКА 8: Слишком широкие типы в type guards
function badIsObject(value: unknown): value is object {
  return typeof value === 'object'
}

// null тоже object в JavaScript!
const result = badIsObject(null)  // true, но это проблема

// ✅ ПРАВИЛЬНО: Проверять на null
function goodIsObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

// ❌ ОШИБКА 9: Использование ! (non-null assertion) без проверки
function badGetLength(str: string | null) {
  return str!.length  // Опасно! Может упасть
}

// ✅ ПРАВИЛЬНО: Использовать type guard или optional chaining
function goodGetLength(str: string | null): number {
  if (str !== null) {
    return str.length
  }
  return 0
}

function betterGetLength(str: string | null): number {
  return str?.length ?? 0
}

// ❌ ОШИБКА 10: Забывать про union в generic типах
function badProcess<T>(value: T) {
  // Если T - union, это может не работать как ожидается
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value
}

// ✅ ПРАВИЛЬНО: Использовать overloads или conditional types
function goodProcess(value: string): string
function goodProcess<T>(value: T): T
function goodProcess<T>(value: T | string): T | string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value
}
`

const bestPracticesSnippet = `
// =====================================
// ЛУЧШИЕ ПРАКТИКИ СУЖЕНИЯ ТИПОВ
// =====================================

// 1. Предпочитайте discriminated unions обычным unions
// ❌ Плохо
type Shape = Circle | Rectangle | Triangle

interface Circle {
  radius: number
}

interface Rectangle {
  width: number
  height: number
}

interface Triangle {
  base: number
  height: number
}

// ✅ Хорошо
type Shape2 =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number }

// 2. Используйте readonly для безопасности
function processReadonly(arr: readonly number[]): number {
  // arr.push(5)  // ❌ Error: нельзя изменить
  return arr.reduce((sum, n) => sum + n, 0)  // ✅ OK
}

// 3. Создавайте утилитарные type guards
// Библиотека type guards для переиспользования
const TypeGuards = {
  isString(value: unknown): value is string {
    return typeof value === 'string'
  },

  isNumber(value: unknown): value is number {
    return typeof value === 'number'
  },

  isArray<T>(
    value: unknown,
    itemGuard: (item: unknown) => item is T
  ): value is T[] {
    return Array.isArray(value) && value.every(itemGuard)
  },

  isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
  }
}

// Использование
function example(value: unknown) {
  if (TypeGuards.isString(value)) {
    console.log(value.toUpperCase())
  }
}

// 4. Документируйте сложные type guards
/**
 * Проверяет, является ли значение валидным пользователем.
 * @param value - Значение для проверки
 * @returns true, если value является User
 * @example
 * const user = { id: 1, name: 'John', email: 'john@example.com' }
 * if (isValidUser(user)) {
 *   console.log(user.email) // TypeScript знает тип
 * }
 */
function isValidUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    typeof (value as any).id === 'number' &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string' &&
    (value as any).email.includes('@')
  )
}

// 5. Используйте exhaustiveness checking везде
type HttpStatus = 200 | 404 | 500

function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case 200:
      return 'OK'
    case 404:
      return 'Not Found'
    case 500:
      return 'Server Error'
    default:
      // Если добавим новый статус и забудем обработать,
      // TypeScript выдаст ошибку здесь
      const exhaustive: never = status
      throw new Error(\`Unhandled status: \${exhaustive}\`)
  }
}

// 6. Комбинируйте type guards для сложных проверок
type ComplexType = {
  type: 'user' | 'admin'
  data: User | Admin
  metadata?: {
    created: Date
    modified?: Date
  }
}

function isComplexType(value: unknown): value is ComplexType {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as any

  if (obj.type !== 'user' && obj.type !== 'admin') {
    return false
  }

  if (typeof obj.data !== 'object' || obj.data === null) {
    return false
  }

  if (obj.metadata !== undefined) {
    if (typeof obj.metadata !== 'object' || obj.metadata === null) {
      return false
    }

    if (!(obj.metadata.created instanceof Date)) {
      return false
    }

    if (obj.metadata.modified !== undefined &&
        !(obj.metadata.modified instanceof Date)) {
      return false
    }
  }

  return true
}

// 7. Используйте branded types для type safety
type EmailAddress = string & { readonly __brand: 'EmailAddress' }
type PhoneNumber = string & { readonly __brand: 'PhoneNumber' }

function isValidEmail(str: string): str is EmailAddress {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

function createEmail(str: string): EmailAddress {
  if (!isValidEmail(str)) {
    throw new Error('Invalid email')
  }
  return str
}

function sendEmail(to: EmailAddress, message: string) {
  console.log(\`Sending to \${to}: \${message}\`)
}

// ✅ Type-safe
const email = createEmail('user@example.com')
sendEmail(email, 'Hello!')

// ❌ Не скомпилируется
// sendEmail('invalid', 'Hello!')

// 8. Централизуйте validation логику
class Validator {
  static isPositiveNumber(value: unknown): value is number {
    return typeof value === 'number' && value > 0
  }

  static isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0
  }

  static isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime())
  }

  static hasProperties<T extends object>(
    obj: unknown,
    props: (keyof T)[]
  ): obj is T {
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    return props.every(prop => prop in obj)
  }
}

// 9. Используйте conditional types для advanced narrowing
type ExtractStrings<T> = T extends string ? T : never

type OnlyStrings = ExtractStrings<'a' | 1 | 'b' | 2>  // 'a' | 'b'

// 10. Создавайте builder pattern с type narrowing
class QueryBuilder<TSelect = never> {
  private selectFields: string[] = []

  select<T extends string>(field: T): QueryBuilder<TSelect | T> {
    this.selectFields.push(field)
    return this as any
  }

  build(): TSelect extends never ? never : { [K in TSelect]: unknown } {
    if (this.selectFields.length === 0) {
      throw new Error('No fields selected')
    }

    // Создание объекта запроса
    return {} as any
  }
}

// TypeScript знает, какие поля были выбраны
const query = new QueryBuilder()
  .select('name')
  .select('email')
  .build()  // Type: { name: unknown; email: unknown }

// const invalid = new QueryBuilder().build()  // ❌ Error: never
`

const highlightedTypeGuards = ref('')
const highlightedCustomTypeGuards = ref('')
const highlightedDiscriminatedUnions = ref('')
const highlightedAssertions = ref('')
const highlightedControlFlow = ref('')
const highlightedAdvancedNarrowing = ref('')
const highlightedCommonMistakes = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedTypeGuards.value = Prism.highlight(typeGuardsSnippet, Prism.languages.typescript, 'typescript')
  highlightedCustomTypeGuards.value = Prism.highlight(customTypeGuardsSnippet, Prism.languages.typescript, 'typescript')
  highlightedDiscriminatedUnions.value = Prism.highlight(discriminatedUnionsSnippet, Prism.languages.typescript, 'typescript')
  highlightedAssertions.value = Prism.highlight(assertionsSnippet, Prism.languages.typescript, 'typescript')
  highlightedControlFlow.value = Prism.highlight(controlFlowSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedNarrowing.value = Prism.highlight(advancedNarrowingSnippet, Prism.languages.typescript, 'typescript')
  highlightedCommonMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.typescript, 'typescript')
  highlightedBestPractices.value = Prism.highlight(bestPracticesSnippet, Prism.languages.typescript, 'typescript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Сужение типов (Type Narrowing) в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Сужение типов (Type Narrowing)</b> — это процесс, при котором TypeScript автоматически уточняет
              (сужает) тип переменной в определенном контексте кода на основе проверок во время выполнения.
              Это позволяет безопасно работать с union типами и делает код более type-safe без явных приведений типов.
            </p>

            <!-- Основные механизмы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основные механизмы сужения</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-code-braces</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">typeof</h3>
                  <p class="text-body-2">Проверка примитивных типов: string, number, boolean, symbol, bigint, undefined</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shape</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">instanceof</h3>
                  <p class="text-body-2">Проверка принадлежности объекта к классу через прототипную цепочку</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-key</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">in</h3>
                  <p class="text-body-2">Проверка наличия свойства в объекте для сужения типов</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Type Guards -->
            <h2 class="text-h5 font-weight-bold mb-3">Type Guards - встроенные механизмы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Type Guard</strong> — это выражение, которое проверяет тип во время выполнения и
              сообщает TypeScript, что в определенной области видимости тип сужен.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTypeGuards"></code></pre>

            <!-- Custom Type Guards -->
            <h2 class="text-h5 font-weight-bold mb-3">Пользовательские Type Guards</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Type Predicate:</strong> Функция с возвращаемым типом <code>value is Type</code>
              сообщает TypeScript о сужении типа.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCustomTypeGuards"></code></pre>

            <!-- Discriminated Unions -->
            <h2 class="text-h5 font-weight-bold mb-3">Discriminated Unions (Размеченные объединения)</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Что это?</h3>
                  <ul class="pl-4">
                    <li>Union типов с общим свойством-дискриминантом</li>
                    <li>Дискриминант — обычно строковый литерал</li>
                    <li>TypeScript автоматически сужает по дискриминанту</li>
                    <li>Лучшая практика для union типов</li>
                    <li>Exhaustiveness checking "из коробки"</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества</h3>
                  <ul class="pl-4">
                    <li>Автоматическое сужение типов</li>
                    <li>Защита от забытых случаев (never)</li>
                    <li>Читаемый и предсказуемый код</li>
                    <li>Работает с switch и if</li>
                    <li>Идеально для state machines</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDiscriminatedUnions"></code></pre>

            <!-- Assertion Functions -->
            <h2 class="text-h5 font-weight-bold mb-3">Assertion Functions (Функции утверждения)</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Assertion функции с <code>asserts</code> выбрасывают ошибку если проверка не пройдена,
              после чего TypeScript знает, что тип точно соответствует утверждению.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAssertions"></code></pre>

            <!-- Control Flow Analysis -->
            <h2 class="text-h5 font-weight-bold mb-3">Control Flow Analysis (Анализ потока управления)</h2>
            <p class="font-weight-regular mb-4">
              TypeScript анализирует поток выполнения кода и автоматически сужает типы на основе условий,
              return, throw, break, continue и других операторов управления потоком.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedControlFlow"></code></pre>

            <!-- Advanced Narrowing -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники сужения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedNarrowing"></code></pre>

            <!-- Сравнение методов -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов сужения</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>typeof</code></td>
                <td>Примитивные типы</td>
                <td>Простота, встроенный</td>
                <td>Только для примитивов</td>
              </tr>
              <tr>
                <td><code>instanceof</code></td>
                <td>Экземпляры классов</td>
                <td>Проверка цепочки прототипов</td>
                <td>Не работает с интерфейсами</td>
              </tr>
              <tr>
                <td><code>in</code></td>
                <td>Проверка свойств</td>
                <td>Работает с объектами</td>
                <td>Не проверяет тип значения</td>
              </tr>
              <tr>
                <td>Type Predicate</td>
                <td>Сложная логика проверки</td>
                <td>Максимальная гибкость</td>
                <td>Нужно писать вручную</td>
              </tr>
              <tr>
                <td>Discriminated Union</td>
                <td>State machines, события</td>
                <td>Автоматическое сужение</td>
                <td>Требует дискриминант</td>
              </tr>
              <tr>
                <td>Assertion Function</td>
                <td>Валидация входных данных</td>
                <td>Явные ошибки</td>
                <td>Throw вместо boolean</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Common Mistakes -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки и как их избежать</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommonMistakes"></code></pre>

            <!-- Best Practices -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Type Narrowing и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Type Narrowing — это механизм TypeScript, который автоматически уточняет (сужает) тип переменной
                  на основе проверок во время выполнения. Это позволяет безопасно работать с union типами без
                  явных приведений, делая код более type-safe и читаемым.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Type Guard и Type Predicate?</p>
                <p class="font-weight-regular ma-0">
                  Type Guard — это любое выражение, которое сужает тип (typeof, instanceof, in).
                  Type Predicate — это специальная функция с возвращаемым типом <code>value is Type</code>,
                  которая явно сообщает TypeScript о сужении типа.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Discriminated Union и почему это best practice?</p>
                <p class="font-weight-regular ma-0">
                  Discriminated Union — это union типов с общим свойством-дискриминантом (обычно строковый литерал).
                  TypeScript автоматически сужает тип по дискриминанту, что делает код более безопасным и
                  поддерживает exhaustiveness checking через never тип.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает Control Flow Analysis?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript анализирует поток выполнения кода и отслеживает изменения типов через условные
                  операторы (if/else, switch), операторы управления потоком (return, throw, break) и
                  проверки truthiness. Это позволяет автоматически сужать типы без явных type guards.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Type Guard и Assertion Function?</p>
                <p class="font-weight-regular ma-0">
                  Type Guard возвращает boolean и используется в условиях. Assertion Function использует
                  <code>asserts</code> ключевое слово и выбрасывает ошибку при несоответствии типа, после
                  чего TypeScript знает, что тип точно соответствует утверждению во всем последующем коде.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда следует использовать unknown вместо any?</p>
                <p class="font-weight-regular ma-0">
                  Всегда! unknown требует явной проверки типа перед использованием (type narrowing), в то время
                  как any отключает проверку типов. unknown — это type-safe альтернатива any для работы с
                  неизвестными данными (например, из API).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое exhaustiveness checking и как его реализовать?</p>
                <p class="font-weight-regular ma-0">
                  Exhaustiveness checking — это проверка того, что все варианты union типа обработаны.
                  Реализуется через default case с типом never: если забыть обработать какой-то вариант,
                  TypeScript выдаст ошибку при попытке присвоить необработанное значение в never.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как сужение типов работает с generic типами?</p>
                <p class="font-weight-regular ma-0">
                  С generic типами сужение работает так же, но требует осторожности: если T — union тип,
                  сужение применяется ко всему union. Для более точного контроля используйте overloads,
                  conditional types или проверяйте конкретные типы внутри generic функции.
                </p>
              </li>
            </ol>

            <!-- Performance & Tips -->
            <h2 class="text-h5 font-weight-bold mb-3">Производительность и советы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать discriminated unions</li>
                    <li>Создавать переиспользуемые type guards</li>
                    <li>Документировать сложные проверки</li>
                    <li>Применять exhaustiveness checking</li>
                    <li>Предпочитать unknown вместо any</li>
                    <li>Использовать assertion functions для валидации</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использования any без крайней необходимости</li>
                    <li>Type guards без type predicate</li>
                    <li>Игнорирования null/undefined</li>
                    <li>Неполных проверок объектов</li>
                    <li>! (non-null assertion) без проверки</li>
                    <li>Реассигнации после сужения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>strictNullChecks обязателен</li>
                    <li>Централизуйте validation логику</li>
                    <li>Используйте branded types</li>
                    <li>Применяйте builder pattern</li>
                    <li>Тестируйте type guards</li>
                    <li>Изучайте conditional types</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Type Narrowing</b> — это фундаментальный механизм TypeScript для работы с union типами и
              обеспечения type safety. Основные инструменты: встроенные type guards (typeof, instanceof, in),
              пользовательские type predicates, discriminated unions, assertion functions и control flow analysis.
              <b>Discriminated unions</b> считаются best practice для сложных union типов благодаря автоматическому
              сужению и exhaustiveness checking. Правильное использование type narrowing делает код безопаснее,
              читаемее и предотвращает runtime ошибки на этапе компиляции.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/typeof-types.html"
                target="_blank">
                Typeof Type Operator
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
