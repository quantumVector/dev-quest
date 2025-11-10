<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const genericsBasicsSnippet = `
// =====================================
// GENERICS - ОСНОВЫ
// =====================================

// 1. Проблема без Generics
function identityAny(value: any): any {
  return value
}

const result1 = identityAny(42)       // тип any - потеряли информацию о типе
const result2 = identityAny("hello")  // тип any - потеряли информацию о типе

// 2. Решение с Generics - Generic функция
function identity<T>(value: T): T {
  return value
}

const result3 = identity(42)        // тип number - TypeScript вывел тип автоматически
const result4 = identity("hello")   // тип string - TypeScript вывел тип автоматически

// Явное указание типа
const result5 = identity<number>(42)
const result6 = identity<string>("hello")

// 3. Generic с несколькими параметрами типа
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second]
}

const p1 = pair(1, "one")           // [number, string]
const p2 = pair<number, string>(2, "two")
const p3 = pair<boolean, number>(true, 42)

// 4. Generic с значениями по умолчанию
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value)
}

const arr1 = createArray(3, 0)        // number[] - тип выведен из значения
const arr2 = createArray(3, "hello")  // string[] - тип выведен из значения
const arr3 = createArray<string>(3, "test")  // string[] - явно указан
const arr4 = createArray(3, "default") // string[] - использует умолчание

// 5. Generic массивов
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

const first1 = getFirstElement([1, 2, 3])      // number | undefined
const first2 = getFirstElement(["a", "b"])     // string | undefined
const first3 = getFirstElement<boolean>([])    // boolean | undefined

// 6. Generic для работы с объектами
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = { name: "John", age: 30, city: "NYC" }
const name = getProperty(person, "name")    // string
const age = getProperty(person, "age")      // number
// const invalid = getProperty(person, "invalid")  // ❌ Error: не существует

// 7. Generic swap функция
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const original: [string, number] = ["hello", 42]
const swapped = swap(original)  // [number, string]
console.log(swapped)  // [42, "hello"]

// 8. Generic функция с constraints (ограничениями)
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(item: T): T {
  console.log(\`Length: \${item.length}\`)
  return item
}

logLength("hello")           // ✅ string имеет length
logLength([1, 2, 3])         // ✅ array имеет length
logLength({ length: 10 })    // ✅ объект с length
// logLength(42)             // ❌ Error: number не имеет length

// 9. Generic для фильтрации
function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = []
  for (const item of array) {
    if (predicate(item)) {
      result.push(item)
    }
  }
  return result
}

const numbers = [1, 2, 3, 4, 5, 6]
const evens = filter(numbers, n => n % 2 === 0)  // number[]

const words = ["hello", "world", "typescript"]
const long = filter(words, w => w.length > 5)    // string[]

// 10. Generic для преобразования
function map<T, U>(array: T[], mapper: (item: T) => U): U[] {
  const result: U[] = []
  for (const item of array) {
    result.push(mapper(item))
  }
  return result
}

const nums = [1, 2, 3, 4, 5]
const doubled = map(nums, n => n * 2)           // number[]
const strings = map(nums, n => \`Number: \${n}\`) // string[]
const booleans = map(nums, n => n > 3)          // boolean[]
`

const genericTypesSnippet = `
// =====================================
// GENERIC TYPES
// =====================================

// 1. Generic Interface
interface Box<T> {
  value: T
  getValue(): T
  setValue(value: T): void
}

const numberBox: Box<number> = {
  value: 42,
  getValue() {
    return this.value
  },
  setValue(value: number) {
    this.value = value
  }
}

const stringBox: Box<string> = {
  value: "hello",
  getValue() {
    return this.value
  },
  setValue(value: string) {
    this.value = value
  }
}

// 2. Generic Type Alias
type Container<T> = {
  value: T
  isEmpty(): boolean
}

const numContainer: Container<number> = {
  value: 100,
  isEmpty() {
    return this.value === 0
  }
}

// 3. Generic Array Type
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectArray = Array<{ id: number; name: string }>

// 4. Generic Promise Type
type AsyncResult<T> = Promise<T>

async function fetchUser(): AsyncResult<User> {
  const response = await fetch('/api/user')
  return response.json()
}

// 5. Generic с несколькими параметрами
interface Pair<K, V> {
  key: K
  value: V
}

const pair1: Pair<string, number> = {
  key: "age",
  value: 30
}

const pair2: Pair<number, boolean> = {
  key: 1,
  value: true
}

// 6. Generic Tuple Types
type Tuple<T, U> = [T, U]
type Triple<T, U, V> = [T, U, V]

const tuple1: Tuple<string, number> = ["hello", 42]
const triple1: Triple<boolean, string, number> = [true, "test", 123]

// 7. Generic Record Type
type Dictionary<T> = {
  [key: string]: T
}

const scores: Dictionary<number> = {
  math: 95,
  physics: 88,
  chemistry: 92
}

const settings: Dictionary<boolean> = {
  darkMode: true,
  notifications: false
}

// 8. Generic Partial Type
type PartialUser<T> = {
  [P in keyof T]?: T[P]
}

interface User {
  id: number
  name: string
  email: string
  age: number
}

const updateUser: PartialUser<User> = {
  name: "John"  // Остальные поля необязательны
}

// 9. Generic Pick Type
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }

const preview: UserPreview = {
  id: 1,
  name: "John"
}

// 10. Generic Exclude Type
type Exclude<T, U> = T extends U ? never : T

type T1 = Exclude<'a' | 'b' | 'c', 'a'>        // 'b' | 'c'
type T2 = Exclude<string | number, number>     // string
type T3 = Exclude<string | number | (() => void), Function>  // string | number
`

const genericClassesSnippet = `
// =====================================
// GENERIC CLASSES
// =====================================

// 1. Простой Generic Class
class GenericBox<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }

  setValue(value: T): void {
    this.value = value
  }
}

const numberBox = new GenericBox<number>(42)
console.log(numberBox.getValue())  // 42
numberBox.setValue(100)

const stringBox = new GenericBox<string>("hello")
console.log(stringBox.getValue())  // "hello"

// 2. Generic Stack (LIFO)
class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  clear(): void {
    this.items = []
  }
}

const numberStack = new Stack<number>()
numberStack.push(1)
numberStack.push(2)
numberStack.push(3)
console.log(numberStack.pop())   // 3
console.log(numberStack.peek())  // 2

// 3. Generic Queue (FIFO)
class Queue<T> {
  private items: T[] = []

  enqueue(item: T): void {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  peek(): T | undefined {
    return this.items[0]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }
}

const stringQueue = new Queue<string>()
stringQueue.enqueue("first")
stringQueue.enqueue("second")
console.log(stringQueue.dequeue())  // "first"

// 4. Generic Storage (Key-Value хранилище)
class Storage<K, V> {
  private storage = new Map<K, V>()

  set(key: K, value: V): void {
    this.storage.set(key, value)
  }

  get(key: K): V | undefined {
    return this.storage.get(key)
  }

  has(key: K): boolean {
    return this.storage.has(key)
  }

  delete(key: K): boolean {
    return this.storage.delete(key)
  }

  clear(): void {
    this.storage.clear()
  }

  get size(): number {
    return this.storage.size
  }

  keys(): IterableIterator<K> {
    return this.storage.keys()
  }

  values(): IterableIterator<V> {
    return this.storage.values()
  }

  entries(): IterableIterator<[K, V]> {
    return this.storage.entries()
  }
}

const cache = new Storage<string, number>()
cache.set("age", 30)
cache.set("score", 95)
console.log(cache.get("age"))  // 30

// 5. Generic Repository Pattern
interface Entity {
  id: number
}

class Repository<T extends Entity> {
  private items: T[] = []
  private nextId = 1

  create(item: Omit<T, 'id'>): T {
    const newItem = { ...item, id: this.nextId++ } as T
    this.items.push(newItem)
    return newItem
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id)
  }

  findAll(): T[] {
    return [...this.items]
  }

  update(id: number, updates: Partial<T>): T | undefined {
    const item = this.findById(id)
    if (item) {
      Object.assign(item, updates)
      return item
    }
    return undefined
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
      return true
    }
    return false
  }

  count(): number {
    return this.items.length
  }
}

interface User extends Entity {
  name: string
  email: string
}

const userRepo = new Repository<User>()
const user1 = userRepo.create({ name: "John", email: "john@example.com" })
const user2 = userRepo.create({ name: "Jane", email: "jane@example.com" })
console.log(userRepo.findAll())

// 6. Generic Observable Pattern
class Observable<T> {
  private observers: Array<(value: T) => void> = []
  private value: T

  constructor(initialValue: T) {
    this.value = initialValue
  }

  subscribe(observer: (value: T) => void): () => void {
    this.observers.push(observer)
    observer(this.value)  // Немедленно вызываем с текущим значением

    // Возвращаем функцию отписки
    return () => {
      const index = this.observers.indexOf(observer)
      if (index > -1) {
        this.observers.splice(index, 1)
      }
    }
  }

  next(value: T): void {
    this.value = value
    this.observers.forEach(observer => observer(value))
  }

  getValue(): T {
    return this.value
  }
}

const counter = new Observable<number>(0)

const unsubscribe1 = counter.subscribe(value => {
  console.log(\`Observer 1: \${value}\`)
})

const unsubscribe2 = counter.subscribe(value => {
  console.log(\`Observer 2: \${value}\`)
})

counter.next(1)  // Оба observer получат 1
counter.next(2)  // Оба observer получат 2

unsubscribe1()   // Отписываем первого observer

counter.next(3)  // Только observer 2 получит 3

// 7. Generic Result/Either Type
class Result<T, E = Error> {
  private constructor(
    private readonly isSuccess: boolean,
    private readonly value?: T,
    private readonly error?: E
  ) {}

  static success<T, E = Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value, undefined)
  }

  static failure<T, E = Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error)
  }

  isOk(): this is { value: T } {
    return this.isSuccess
  }

  isErr(): this is { error: E } {
    return !this.isSuccess
  }

  unwrap(): T {
    if (!this.isSuccess) {
      throw new Error('Called unwrap on an error result')
    }
    return this.value!
  }

  unwrapOr(defaultValue: T): T {
    return this.isSuccess ? this.value! : defaultValue
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess) {
      return Result.success(fn(this.value!))
    }
    return Result.failure(this.error!)
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    if (!this.isSuccess) {
      return Result.failure(fn(this.error!))
    }
    return Result.success(this.value!)
  }
}

// Использование
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.failure("Division by zero")
  }
  return Result.success(a / b)
}

const result1 = divide(10, 2)
if (result1.isOk()) {
  console.log(\`Result: \${result1.unwrap()}\`)  // 5
}

const result2 = divide(10, 0)
if (result2.isErr()) {
  console.log(\`Error: \${result2.unwrapOr(0)}\`)  // 0
}

// 8. Generic Builder Pattern
class UserBuilder<T extends Partial<User>> {
  private user: T = {} as T

  setName(name: string): UserBuilder<T & { name: string }> {
    return Object.assign(this, { user: { ...this.user, name } })
  }

  setEmail(email: string): UserBuilder<T & { email: string }> {
    return Object.assign(this, { user: { ...this.user, email } })
  }

  setAge(age: number): UserBuilder<T & { age: number }> {
    return Object.assign(this, { user: { ...this.user, age } })
  }

  build(): T & Required<Pick<User, 'name' | 'email'>> {
    if (!this.user.name || !this.user.email) {
      throw new Error('Name and email are required')
    }
    return this.user as T & Required<Pick<User, 'name' | 'email'>>
  }
}

// Использование
const user = new UserBuilder()
  .setName("John")
  .setEmail("john@example.com")
  .setAge(30)
  .build()
`

const genericConstraintsSnippet = `
// =====================================
// GENERIC CONSTRAINTS (ОГРАНИЧЕНИЯ)
// =====================================

// 1. Базовое ограничение extends
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

const merged = merge({ name: "John" }, { age: 30 })
// merged: { name: string; age: number }

// merge({ name: "John" }, 42)  // ❌ Error: 42 не объект

// 2. Ограничение через interface
interface Identifiable {
  id: number
}

function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
]

const user = findById(users, 1)  // ✅ OK

// const numbers = [1, 2, 3]
// findById(numbers, 1)  // ❌ Error: number не имеет id

// 3. Множественные ограничения
interface Nameable {
  name: string
}

interface Ageable {
  age: number
}

function introduce<T extends Nameable & Ageable>(person: T): string {
  return \`My name is \${person.name} and I'm \${person.age} years old\`
}

const person = { name: "John", age: 30, city: "NYC" }
console.log(introduce(person))

// 4. Ограничение через keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person2 = { name: "John", age: 30 }
const name = getProperty(person2, "name")  // string
// getProperty(person2, "invalid")  // ❌ Error

// 5. Ограничение через union type
type AllowedTypes = string | number | boolean

function stringify<T extends AllowedTypes>(value: T): string {
  return String(value)
}

stringify(42)          // ✅ "42"
stringify("hello")     // ✅ "hello"
stringify(true)        // ✅ "true"
// stringify({})       // ❌ Error: объект не в AllowedTypes

// 6. Ограничение для конструктора
interface Constructor<T = any> {
  new(...args: any[]): T
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args)
}

class Person {
  constructor(public name: string, public age: number) {}
}

const person3 = createInstance(Person, "John", 30)
console.log(person3.name)  // "John"

// 7. Ограничение с typeof
function cloneArray<T extends any[]>(arr: T): T {
  return [...arr] as T
}

const numbers = [1, 2, 3]
const cloned = cloneArray(numbers)  // number[]

// 8. Ограничение для функций
interface CompareFn<T> {
  (a: T, b: T): number
}

function sort<T>(array: T[], compareFn: CompareFn<T>): T[] {
  return [...array].sort(compareFn)
}

const numbers2 = [3, 1, 4, 1, 5, 9, 2, 6]
const sorted = sort(numbers2, (a, b) => a - b)

// 9. Условные ограничения с infer
type ArrayElement<T> = T extends (infer E)[] ? E : never

type NumArray = ArrayElement<number[]>    // number
type StrArray = ArrayElement<string[]>    // string
type NotArray = ArrayElement<number>      // never

// 10. Рекурсивные ограничения
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

interface NestedUser {
  name: string
  profile: {
    age: number
    address: {
      city: string
      zip: number
    }
  }
}

type ReadonlyNestedUser = DeepReadonly<NestedUser>
// Все вложенные свойства readonly

// 11. Ограничение с never
type NonNullable<T> = T extends null | undefined ? never : T

type T1 = NonNullable<string | null>      // string
type T2 = NonNullable<number | undefined> // number
type T3 = NonNullable<boolean | null | undefined>  // boolean

// 12. Ограничение с conditional types
type StringOrNumber<T> = T extends string ? string :
  T extends number ? number :
  never

type T4 = StringOrNumber<"hello">  // string
type T5 = StringOrNumber<42>       // number
type T6 = StringOrNumber<boolean>  // never
`

const advancedGenericsSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТЕХНИКИ GENERICS
// =====================================

// 1. Mapped Types с Generics
type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

interface User {
  id: number
  name: string
  email: string
}

type NullableUser = Nullable<User>
// { id: number | null; name: string | null; email: string | null }

// 2. Conditional Types с Generics
type Flatten<T> = T extends Array<infer U> ? U : T

type Num = Flatten<number[]>      // number
type Str = Flatten<string>        // string
type Bool = Flatten<boolean[][]>  // boolean[]

// 3. Generic для извлечения типа Promise
type Awaited<T> = T extends Promise<infer U> ? U : T

type NumPromise = Awaited<Promise<number>>      // number
type StrPromise = Awaited<Promise<string>>      // string
type NotPromise = Awaited<number>               // number

// 4. Рекурсивный Generic Type
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json }

const validJson: Json = {
  name: "John",
  age: 30,
  active: true,
  tags: ["typescript", "generics"],
  meta: {
    created: "2024-01-01",
    updated: null
  }
}

// 5. Generic для построения путей объекта
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
    }[Extract<keyof T, string>]

type NestedObj = {
  user: {
    profile: {
      name: string
      age: number
    }
  }
}

type Paths = PathsToStringProps<NestedObj>
// ["user"] | ["user", "profile"] | ["user", "profile", "name"] | ["user", "profile", "age"]

// 6. Generic для глубокого Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

interface ComplexUser {
  id: number
  profile: {
    name: string
    settings: {
      theme: string
      notifications: boolean
    }
  }
}

type PartialComplexUser = DeepPartial<ComplexUser>
// Все вложенные свойства необязательны

const update: PartialComplexUser = {
  profile: {
    settings: {
      theme: "dark"
      // notifications необязателен
    }
  }
}

// 7. Generic для создания Union из объекта
type ValuesOf<T> = T[keyof T]

type Status = {
  pending: "pending"
  approved: "approved"
  rejected: "rejected"
}

type StatusValue = ValuesOf<Status>  // "pending" | "approved" | "rejected"

// 8. Generic для Readonly глубоких объектов
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

type ReadonlyComplexUser = DeepReadonly<ComplexUser>
// Все вложенные свойства readonly

// 9. Generic для Required глубоких объектов
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? DeepRequired<T[P]>
    : T[P]
}

interface OptionalUser {
  id?: number
  profile?: {
    name?: string
    age?: number
  }
}

type RequiredUser = DeepRequired<OptionalUser>
// Все вложенные свойства обязательны

// 10. Generic для создания типа из функции
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never
type ParametersOf<T> = T extends (...args: infer P) => any ? P : never

function fetchUser(id: number): Promise<User> {
  return Promise.resolve({ id, name: "John", email: "john@example.com" })
}

type FetchUserReturn = ReturnTypeOf<typeof fetchUser>  // Promise<User>
type FetchUserParams = ParametersOf<typeof fetchUser>  // [number]

// 11. Generic для преобразования Union в Intersection
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

type Union = { a: string } | { b: number }
type Intersection = UnionToIntersection<Union>
// { a: string } & { b: number }

// 12. Generic для создания типа Record с вычисляемыми ключами
type RecordFromUnion<K extends string | number | symbol, T> = {
  [P in K]: T
}

type RGB = "r" | "g" | "b"
type ColorValues = RecordFromUnion<RGB, number>
// { r: number; g: number; b: number }

// 13. Generic для Pick вложенных свойств
type PickNested<T, K extends string> = K extends \`\${infer First}.\${infer Rest}\`
  ? First extends keyof T
    ? { [P in First]: PickNested<T[First], Rest> }
    : never
  : K extends keyof T
  ? { [P in K]: T[P] }
  : never

type UserProfile = {
  id: number
  details: {
    name: string
    age: number
    address: {
      city: string
      zip: number
    }
  }
}

type CityOnly = PickNested<UserProfile, "details.address.city">
// { details: { address: { city: string } } }

// 14. Generic для типобезопасного event emitter
type EventMap = {
  [key: string]: any
}

class TypedEventEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>
  } = {}

  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(listener)
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const listeners = this.listeners[event]
    if (listeners) {
      listeners.forEach(listener => listener(data))
    }
  }

  off<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    const listeners = this.listeners[event]
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }
}

// Использование
interface AppEvents {
  userLogin: { userId: number; timestamp: Date }
  userLogout: { userId: number }
  dataUpdate: { type: string; payload: any }
}

const emitter = new TypedEventEmitter<AppEvents>()

emitter.on('userLogin', (data) => {
  console.log(\`User \${data.userId} logged in at \${data.timestamp}\`)
})

emitter.emit('userLogin', {
  userId: 123,
  timestamp: new Date()
})

// emitter.emit('userLogin', { userId: "123" })  // ❌ Error: тип не совпадает
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Generic для API запросов
interface ApiResponse<T> {
  data: T
  status: number
  message: string
  timestamp: Date
}

async function apiRequest<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  const data = await response.json()
  return {
    data,
    status: response.status,
    message: response.statusText,
    timestamp: new Date()
  }
}

// Использование
interface User {
  id: number
  name: string
  email: string
}

const userResponse = await apiRequest<User>('/api/users/1')
console.log(userResponse.data.name)  // TypeScript знает о name

// 2. Generic для кэша с TTL
class CacheWithTTL<K, V> {
  private cache = new Map<K, { value: V; expiry: number }>()

  set(key: K, value: V, ttl: number = 60000): void {
    const expiry = Date.now() + ttl
    this.cache.set(key, { value, expiry })
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return undefined
    }

    return item.value
  }

  has(key: K): boolean {
    const value = this.get(key)
    return value !== undefined
  }

  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Очистка устаревших записей
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// Использование
const userCache = new CacheWithTTL<number, User>()
userCache.set(1, { id: 1, name: "John", email: "john@example.com" }, 5000)

const user = userCache.get(1)
if (user) {
  console.log(user.name)
}

// 3. Generic для State Machine
type StateMachine<S extends string, E extends string> = {
  current: S
  transitions: Record<S, Partial<Record<E, S>>>
  transition(event: E): S | undefined
}

function createStateMachine<S extends string, E extends string>(
  initial: S,
  transitions: Record<S, Partial<Record<E, S>>>
): StateMachine<S, E> {
  let current = initial

  return {
    current,
    transitions,
    transition(event: E) {
      const nextState = transitions[current]?.[event]
      if (nextState) {
        current = nextState
        this.current = current
        return current
      }
      return undefined
    }
  }
}

// Использование
type OrderState = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
type OrderEvent = 'confirm' | 'ship' | 'deliver' | 'cancel'

const orderMachine = createStateMachine<OrderState, OrderEvent>('pending', {
  pending: { confirm: 'confirmed', cancel: 'cancelled' },
  confirmed: { ship: 'shipped', cancel: 'cancelled' },
  shipped: { deliver: 'delivered' },
  delivered: {},
  cancelled: {}
})

console.log(orderMachine.current)  // "pending"
orderMachine.transition('confirm')
console.log(orderMachine.current)  // "confirmed"

// 4. Generic для валидации форм
type ValidationRule<T> = (value: T) => string | null

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>[]
}

function createValidator<T>(schema: ValidationSchema<T>) {
  return (data: T): Record<keyof T, string[]> => {
    const errors = {} as Record<keyof T, string[]>

    for (const key in schema) {
      const rules = schema[key]
      const value = data[key]
      const fieldErrors: string[] = []

      for (const rule of rules) {
        const error = rule(value)
        if (error) {
          fieldErrors.push(error)
        }
      }

      if (fieldErrors.length > 0) {
        errors[key] = fieldErrors
      }
    }

    return errors
  }
}

// Использование
interface LoginForm {
  email: string
  password: string
}

const required = (fieldName: string) =>
  <T>(value: T): string | null =>
    !value ? \`\${fieldName} is required\` : null

const minLength = (min: number, fieldName: string) =>
  (value: string): string | null =>
    value.length < min ? \`\${fieldName} must be at least \${min} characters\` : null

const email = (value: string): string | null =>
  !value.includes('@') ? 'Invalid email format' : null

const validateLogin = createValidator<LoginForm>({
  email: [required('Email'), email],
  password: [required('Password'), minLength(8, 'Password')]
})

const errors = validateLogin({
  email: 'invalid-email',
  password: 'short'
})

console.log(errors)
// { email: ['Invalid email format'], password: ['Password must be at least 8 characters'] }

// 5. Generic для создания type-safe Redux actions
type Action<T extends string, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P }

function createAction<T extends string>(type: T): Action<T, void>
function createAction<T extends string, P>(type: T, payload: P): Action<T, P>
function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined
    ? { type }
    : { type, payload }
}

// Использование
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')
const setCount = createAction('SET_COUNT', 42)

console.log(increment)  // { type: 'INCREMENT' }
console.log(setCount)   // { type: 'SET_COUNT', payload: 42 }

// 6. Generic для Dependency Injection Container
class Container {
  private services = new Map<string, any>()

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory)
  }

  resolve<T>(key: string): T {
    const factory = this.services.get(key)
    if (!factory) {
      throw new Error(\`Service \${key} not found\`)
    }
    return factory()
  }

  has(key: string): boolean {
    return this.services.has(key)
  }
}

// Использование
interface Logger {
  log(message: string): void
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(\`[LOG]: \${message}\`)
  }
}

const container = new Container()
container.register<Logger>('logger', () => new ConsoleLogger())

const logger = container.resolve<Logger>('logger')
logger.log('Hello, DI!')

// 7. Generic для построения SQL-like запросов
class QueryBuilder<T> {
  private selectFields: (keyof T)[] = []
  private whereConditions: Array<(item: T) => boolean> = []
  private orderByField?: keyof T
  private orderDirection: 'asc' | 'desc' = 'asc'
  private limitValue?: number

  select(...fields: (keyof T)[]): this {
    this.selectFields = fields
    return this
  }

  where(predicate: (item: T) => boolean): this {
    this.whereConditions.push(predicate)
    return this
  }

  orderBy(field: keyof T, direction: 'asc' | 'desc' = 'asc'): this {
    this.orderByField = field
    this.orderDirection = direction
    return this
  }

  limit(value: number): this {
    this.limitValue = value
    return this
  }

  execute(data: T[]): Partial<T>[] {
    let result = [...data]

    // WHERE
    for (const condition of this.whereConditions) {
      result = result.filter(condition)
    }

    // ORDER BY
    if (this.orderByField) {
      result.sort((a, b) => {
        const aVal = a[this.orderByField!]
        const bVal = b[this.orderByField!]
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return this.orderDirection === 'asc' ? comparison : -comparison
      })
    }

    // LIMIT
    if (this.limitValue !== undefined) {
      result = result.slice(0, this.limitValue)
    }

    // SELECT
    if (this.selectFields.length > 0) {
      return result.map(item => {
        const selected: Partial<T> = {}
        for (const field of this.selectFields) {
          selected[field] = item[field]
        }
        return selected
      })
    }

    return result
  }
}

// Использование
interface Product {
  id: number
  name: string
  price: number
  category: string
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
  { id: 2, name: "Phone", price: 500, category: "Electronics" },
  { id: 3, name: "Book", price: 20, category: "Books" }
]

const query = new QueryBuilder<Product>()
  .select('name', 'price')
  .where(p => p.category === 'Electronics')
  .orderBy('price', 'desc')
  .limit(1)
  .execute(products)

console.log(query)  // [{ name: "Laptop", price: 1000 }]

// 8. Generic для создания type-safe router
type RouteParams = Record<string, string>

interface Route<P extends RouteParams = {}> {
  path: string
  handler: (params: P) => void
}

class Router<Routes extends Record<string, Route>> {
  private routes: Routes

  constructor(routes: Routes) {
    this.routes = routes
  }

  navigate<K extends keyof Routes>(
    name: K,
    params: Routes[K] extends Route<infer P> ? P : never
  ): void {
    const route = this.routes[name]
    route.handler(params)
  }

  getRoute<K extends keyof Routes>(name: K): Routes[K] {
    return this.routes[name]
  }
}

// Использование
const router = new Router({
  home: {
    path: '/',
    handler: () => console.log('Home page')
  },
  user: {
    path: '/user/:id',
    handler: (params: { id: string }) => {
      console.log(\`User page: \${params.id}\`)
    }
  },
  post: {
    path: '/post/:postId/comment/:commentId',
    handler: (params: { postId: string; commentId: string }) => {
      console.log(\`Post: \${params.postId}, Comment: \${params.commentId}\`)
    }
  }
})

router.navigate('home', {})
router.navigate('user', { id: '123' })
router.navigate('post', { postId: '456', commentId: '789' })
// router.navigate('user', { id: 123 })  // ❌ Error: должен быть string
`

const highlightedGenericsBasics = ref('')
const highlightedGenericTypes = ref('')
const highlightedGenericClasses = ref('')
const highlightedGenericConstraints = ref('')
const highlightedAdvancedGenerics = ref('')
const highlightedPracticalExamples = ref('')

onMounted(() => {
  highlightedGenericsBasics.value = Prism.highlight(genericsBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedGenericTypes.value = Prism.highlight(genericTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedGenericClasses.value = Prism.highlight(genericClassesSnippet, Prism.languages.typescript, 'typescript')
  highlightedGenericConstraints.value = Prism.highlight(genericConstraintsSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedGenerics.value = Prism.highlight(advancedGenericsSnippet, Prism.languages.typescript, 'typescript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Generics в TypeScript: Обобщенное программирование
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Generics (обобщения)</b> — это механизм TypeScript, позволяющий создавать переиспользуемый
              код, работающий с различными типами данных, сохраняя при этом типобезопасность.
              Generics позволяют писать гибкий код без потери информации о типах.
            </p>

            <!-- Ключевая концепция -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевая концепция</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Основная идея:</strong> Generics позволяют определить "тип-переменную", которая
              будет заменена на конкретный тип при использовании. Это как параметры функции, но для типов.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Без Generics</h3>
                  <pre class="text-left text-caption">function id(x: any): any {
  return x
}
// Теряем информацию о типе</pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Дублирование</h3>
                  <pre class="text-left text-caption">function idNum(x: number): number
function idStr(x: string): string
// Много похожего кода</pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ С Generics</h3>
                  <pre class="text-left text-caption">function id&lt;T&gt;(x: T): T {
  return x
}
// Типобезопасно и гибко</pre>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы Generics</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericsBasics"></code></pre>

            <!-- Generic Types -->
            <h2 class="text-h5 font-weight-bold mb-3">Generic Types и Interfaces</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericTypes"></code></pre>

            <!-- Generic Classes -->
            <h2 class="text-h5 font-weight-bold mb-3">Generic Classes</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-code-braces</v-icon>
              <strong>Паттерн:</strong> Generic классы особенно полезны для структур данных:
              Stack, Queue, Tree, List и других контейнеров.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericClasses"></code></pre>

            <!-- Constraints -->
            <h2 class="text-h5 font-weight-bold mb-3">Generic Constraints (Ограничения)</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-shield-check</v-icon>
              <strong>Важно:</strong> Constraints позволяют ограничить набор типов, которые можно
              использовать с generic, обеспечивая дополнительную типобезопасность.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericConstraints"></code></pre>

            <!-- Преимущества Generics -->
            <h2 class="text-h5 font-weight-bold mb-3">Преимущества Generics</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-decagram</v-icon>
                    <h3 class="text-h6 font-weight-bold">Ключевые преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Типобезопасность:</strong> Проверка типов на этапе компиляции</li>
                    <li><strong>Переиспользование:</strong> Один код для разных типов</li>
                    <li><strong>Читаемость:</strong> Явные типы вместо any</li>
                    <li><strong>Рефакторинг:</strong> Безопасное изменение типов</li>
                    <li><strong>Автодополнение:</strong> IDE знает о типах</li>
                    <li><strong>Документация:</strong> Типы как часть API</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
                    <h3 class="text-h6 font-weight-bold">Практическая польза</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Избежание any:</strong> Нет потери типов</li>
                    <li><strong>DRY принцип:</strong> Меньше дублирования</li>
                    <li><strong>Композиция:</strong> Легко комбинировать типы</li>
                    <li><strong>Эволюция кода:</strong> Легко добавлять новые типы</li>
                    <li><strong>Ошибки раньше:</strong> На компиляции, а не в runtime</li>
                    <li><strong>Уверенность:</strong> Код работает как ожидается</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Продвинутые техники -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedGenerics"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Когда использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Generics?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">✅ Используйте</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Структуры данных (Stack, Queue, List)</li>
                    <li>Утилитарные функции (map, filter, reduce)</li>
                    <li>API обертки (fetch, axios)</li>
                    <li>React компоненты и хуки</li>
                    <li>Event emitters и observers</li>
                    <li>Repository и DAO паттерны</li>
                    <li>State management (Redux, MobX)</li>
                    <li>Валидация и парсинг данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">❌ Избегайте</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Простые функции с фиксированными типами</li>
                    <li>Когда типы всегда одинаковые</li>
                    <li>Overcomplicated abstractions</li>
                    <li>Когда any действительно нужен</li>
                    <li>Слишком много generic параметров (&gt;3)</li>
                    <li>Без четкого понимания зачем</li>
                    <li>Преждевременная абстракция</li>
                    <li>Когда union type достаточно</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Generics и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Generics — это механизм создания переиспользуемого кода, работающего с разными типами,
                  сохраняя типобезопасность. Они позволяют избежать дублирования кода и использования any,
                  при этом TypeScript точно знает с какими типами работает код.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как объявить generic функцию?</p>
                <p class="font-weight-regular ma-0">
                  Используя угловые скобки после имени функции: <code>function name&lt;T&gt;(param: T): T</code>.
                  T — это параметр типа, который будет заменен на конкретный тип при вызове. Можно использовать
                  несколько параметров: <code>&lt;T, U, V&gt;</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между any и Generics?</p>
                <p class="font-weight-regular ma-0">
                  <code>any</code> отключает проверку типов — TypeScript не знает какой тип на самом деле.
                  Generics сохраняют информацию о типе — TypeScript точно знает с чем работает и может
                  проверять корректность операций. Generics = типобезопасный any.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое generic constraints?</p>
                <p class="font-weight-regular ma-0">
                  Constraints (ограничения) позволяют ограничить набор типов для generic параметра через
                  <code>extends</code>. Например, <code>&lt;T extends string&gt;</code> — только string типы,
                  <code>&lt;T extends { length: number }&gt;</code> — только типы с свойством length.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает type inference с Generics?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript автоматически выводит типы из аргументов функции. Если вызвать
                  <code>identity(42)</code>, TypeScript выведет <code>identity&lt;number&gt;(42)</code>.
                  Явное указание типа нужно только когда TypeScript не может вывести его автоматически.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли задать значение по умолчанию для generic?</p>
                <p class="font-weight-regular ma-0">
                  Да, используя <code>&lt;T = DefaultType&gt;</code>. Например,
                  <code>function create&lt;T = string&gt;(): T</code>. Если тип не указан явно и не выведен,
                  будет использован тип по умолчанию.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать generic class?</p>
                <p class="font-weight-regular ma-0">
                  Указать параметры типа после имени класса: <code>class Box&lt;T&gt; { value: T }</code>.
                  При создании экземпляра указывается конкретный тип: <code>new Box&lt;number&gt;()</code>.
                  Методы класса могут использовать эти типы без повторного объявления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое keyof с Generics?</p>
                <p class="font-weight-regular ma-0">
                  <code>keyof</code> создает union всех ключей типа. С generics позволяет типобезопасно
                  работать с ключами объекта: <code>&lt;T, K extends keyof T&gt;</code> гарантирует,
                  что K — это действительно ключ объекта типа T.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают Conditional Types с Generics?</p>
                <p class="font-weight-regular ma-0">
                  Conditional Types используют <code>T extends U ? X : Y</code> для создания типов с условной
                  логикой. С <code>infer</code> можно извлекать типы: <code>T extends Array&lt;infer U&gt; ? U : T</code>
                  извлекает тип элементов массива.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Сколько generic параметров можно использовать?</p>
                <p class="font-weight-regular ma-0">
                  Технически неограниченно, но практически больше 3-4 редко нужно. Много параметров усложняет
                  понимание кода. Лучше разбить на несколько типов или использовать объекты для группировки.
                  Обычно хватает 1-2 параметров.
                </p>
              </li>
            </ol>

            <!-- Сравнительная таблица -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Типобезопасность</th>
                <th class="text-left font-weight-bold">Переиспользование</th>
                <th class="text-left font-weight-bold">Читаемость</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>any</code></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
                <td class="text-warning">⚠️ Плохая</td>
                <td>Избегать, только для миграции</td>
              </tr>
              <tr>
                <td><code>unknown</code></td>
                <td class="text-success">✅ Да</td>
                <td class="text-warning">⚠️ Ограничено</td>
                <td class="text-warning">⚠️ Средняя</td>
                <td>Когда тип действительно неизвестен</td>
              </tr>
              <tr>
                <td><strong>Generics</strong></td>
                <td class="text-success">✅ Полная</td>
                <td class="text-success">✅ Отличное</td>
                <td class="text-success">✅ Хорошая</td>
                <td>Переиспользуемый типобезопасный код</td>
              </tr>
              <tr>
                <td><strong>Union Types</strong></td>
                <td class="text-success">✅ Да</td>
                <td class="text-warning">⚠️ Среднее</td>
                <td class="text-success">✅ Хорошая</td>
                <td>Фиксированный набор типов</td>
              </tr>
              <tr>
                <td><strong>Overloads</strong></td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Дублирование</td>
                <td class="text-warning">⚠️ Средняя</td>
                <td>Разное поведение для разных типов</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать осмысленные имена (T, K, V)</li>
                    <li>Добавлять constraints когда нужно</li>
                    <li>Позволять type inference работать</li>
                    <li>Документировать generic параметры</li>
                    <li>Использовать defaults для удобства</li>
                    <li>Тестировать с разными типами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Слишком много параметров (&gt;3)</li>
                    <li>Generics вместо конкретных типов</li>
                    <li>Overcomplicated constraints</li>
                    <li>Использования any внутри generic</li>
                    <li>Преждевременной абстракции</li>
                    <li>Нечитаемых имен (T1, T2, T3)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Начинайте с простого</li>
                    <li>Рефакторьте в generics по мере роста</li>
                    <li>Используйте Utility Types</li>
                    <li>Изучайте исходники библиотек</li>
                    <li>Практикуйтесь на реальных задачах</li>
                    <li>Читайте TypeScript handbook</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Распространенные ошибки -->
            <h2 class="text-h5 font-weight-bold mb-3">Распространенные ошибки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Неправильно</h3>
                  <pre class="text-caption mb-2">// Слишком общий
function process&lt;T&gt;(data: T): T {
  return data.map(x => x * 2) // ❌ Error
}</pre>
                  <pre class="text-caption mb-2">// Слишком много параметров
function fn&lt;A, B, C, D, E&gt;(...) // ❌ Сложно</pre>
                  <pre class="text-caption">// any внутри generic
function bad&lt;T&gt;(x: T): any // ❌ Теряем типы</pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Правильно</h3>
                  <pre class="text-caption mb-2">// С constraints
function process&lt;T extends number[]&gt;(data: T) {
  return data.map(x => x * 2) // ✅ OK
}</pre>
                  <pre class="text-caption mb-2">// Объединяем в объект
function fn&lt;T extends Config&gt;(...) // ✅ Понятно</pre>
                  <pre class="text-caption">// Сохраняем типы
function good&lt;T&gt;(x: T): T // ✅ Типобезопасно</pre>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Generics</b> — это фундаментальная возможность TypeScript для создания переиспользуемого
              типобезопасного кода. Они позволяют писать функции, классы и типы, работающие с различными
              типами данных без потери информации о типах. <b>Ключевые преимущества:</b> типобезопасность,
              переиспользование кода, избежание any, лучшее автодополнение IDE. <b>Используйте:</b> для
              структур данных, утилит, API оберток, React компонентов. <b>Избегайте:</b> overcomplicated
              abstractions, слишком много параметров, преждевременной абстракции. Мастерство в Generics
              приходит с практикой — начинайте с простых примеров и постепенно усложняйте.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/generics.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook: Generics
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
                target="_blank"
                class="mr-2">
                Everyday Types
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
