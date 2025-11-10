<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const classesWithInterfacesSnippet = `
// =====================================
// INTERFACES С КЛАССАМИ - преимущества
// =====================================

// 1. Implements - контракты для классов
interface Logger {
  log(message: string): void
  error(message: string): void
  warn(message: string): void
}

// Класс ДОЛЖЕН реализовать все методы интерфейса
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(\`[LOG] \${message}\`)
  }

  error(message: string): void {
    console.error(\`[ERROR] \${message}\`)
  }

  warn(message: string): void {
    console.warn(\`[WARN] \${message}\`)
  }
}

// ❌ Ошибка компиляции - не все методы реализованы
class IncompleteLogger implements Logger {
  log(message: string): void {
    console.log(message)
  }
  // error и warn отсутствуют - TypeScript ошибка!
}

// 2. Множественная реализация интерфейсов
interface Serializable {
  serialize(): string
}

interface Comparable<T> {
  compareTo(other: T): number
}

class User implements Serializable, Comparable<User> {
  constructor(
    public id: number,
    public name: string
  ) {}

  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name })
  }

  compareTo(other: User): number {
    return this.id - other.id
  }
}

// Type не может быть implements напрямую
type SerializableType = {
  serialize(): string
}

// ❌ Ошибка - type не может быть implements
// class User2 implements SerializableType { }

// 3. Interface для абстрактных контрактов
interface PaymentProcessor {
  processPayment(amount: number): Promise<boolean>
  refund(transactionId: string): Promise<void>
  validateCard(cardNumber: string): boolean
}

class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<boolean> {
    // Stripe API logic
    return true
  }

  async refund(transactionId: string): Promise<void> {
    // Stripe refund logic
  }

  validateCard(cardNumber: string): boolean {
    // Luhn algorithm
    return true
  }
}

class PayPalProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<boolean> {
    // PayPal API logic
    return true
  }

  async refund(transactionId: string): Promise<void> {
    // PayPal refund logic
  }

  validateCard(cardNumber: string): boolean {
    // PayPal validation
    return true
  }
}

// Dependency Injection с интерфейсами
class PaymentService {
  constructor(private processor: PaymentProcessor) {}

  async charge(amount: number): Promise<boolean> {
    return this.processor.processPayment(amount)
  }
}

// Можем легко переключать реализации
const stripeService = new PaymentService(new StripeProcessor())
const paypalService = new PaymentService(new PayPalProcessor())

// 4. Расширение интерфейсов для специализации
interface Animal {
  name: string
  makeSound(): void
}

interface Flyable {
  fly(): void
  maxAltitude: number
}

class Bird implements Animal, Flyable {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Chirp!')
  }

  fly(): void {
    console.log(\`\${this.name} is flying\`)
  }

  maxAltitude = 10000
}

// 5. Optional методы в интерфейсах
interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
  save(entity: T): Promise<T>
  delete(id: number): Promise<void>

  // Опциональные методы
  count?(): Promise<number>
  exists?(id: number): Promise<boolean>
}

class UserRepository implements Repository<User> {
  async findAll(): Promise<User[]> {
    return []
  }

  async findById(id: number): Promise<User | null> {
    return null
  }

  async save(entity: User): Promise<User> {
    return entity
  }

  async delete(id: number): Promise<void> {}

  // Optional методы можно не реализовывать
  async count(): Promise<number> {
    return 0
  }
}

// 6. Readonly свойства в интерфейсах для классов
interface DatabaseConfig {
  readonly host: string
  readonly port: number
  readonly database: string
}

class Database implements DatabaseConfig {
  readonly host: string
  readonly port: number
  readonly database: string

  constructor(config: DatabaseConfig) {
    this.host = config.host
    this.port = config.port
    this.database = config.database
  }

  // Нельзя изменить после инициализации
  // changeHost(newHost: string) {
  //   this.host = newHost  // ❌ Error: Cannot assign to 'host'
  // }
}

// 7. Static методы НЕ входят в интерфейс
interface StaticExample {
  instanceMethod(): void
  // static staticMethod(): void  // ❌ Нельзя объявить static в interface
}

// Для static методов используем отдельный контракт
interface UserConstructor {
  new (name: string): User
  fromJSON(json: string): User  // Static фабричный метод
}

class User {
  constructor(public name: string) {}

  static fromJSON(json: string): User {
    const data = JSON.parse(json)
    return new User(data.name)
  }
}

// 8. Hybrid Types - callable interfaces
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  const counter = function(start: number) {
    return \`Count: \${start}\`
  } as Counter

  counter.interval = 1000
  counter.reset = function() {
    console.log('Reset')
  }

  return counter
}

const myCounter = getCounter()
console.log(myCounter(10))      // Функция
console.log(myCounter.interval) // Свойство
myCounter.reset()                // Метод
`

const migrationSnippet = `
// =====================================
// МИГРАЦИЯ МЕЖДУ INTERFACE И TYPE
// =====================================

// Сценарий 1: Interface → Type (когда нужны union/intersection)

// Было - Interface
interface User {
  id: number
  name: string
  email: string
}

interface Admin extends User {
  permissions: string[]
}

// Стало - Type с union
type User = {
  id: number
  name: string
  email: string
}

type Role = 'admin' | 'user' | 'guest'

type Admin = User & {
  role: 'admin'
  permissions: string[]
}

type Guest = User & {
  role: 'guest'
}

type UserType = Admin | Guest  // Union невозможен с Interface

// Сценарий 2: Type → Interface (для библиотеки/API)

// Было - Type
type ApiResponse<T> = {
  data: T
  status: number
  message?: string
}

// Стало - Interface для публичного API
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Пользователи библиотеки могут расширять
declare module 'my-library' {
  interface ApiResponse<T> {
    // Добавляем кастомное поле через declaration merging
    customField?: string
  }
}

// Сценарий 3: Миграция сложных типов

// Было - сложный Type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

type UpdateUser = DeepPartial<User>

// Стало - Interface + Utility Types
interface UpdateUser extends Partial<User> {
  // Для сложных трансформаций Type остается лучшим выбором
}

// Если нужна глубокая рекурсия - Type неизбежен
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

// Сценарий 4: Постепенная миграция

// Шаг 1: Type как base
type UserBase = {
  id: number
  name: string
}

// Шаг 2: Interface расширяет Type
interface User extends UserBase {
  email: string
  createdAt: Date
}

// Шаг 3: Постепенно переносим в Interface
interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

// Сценарий 5: Комбинирование для гибкости

// Type для union/primitive
type ID = string | number
type Status = 'active' | 'inactive'

// Interface для структур
interface Entity {
  id: ID
  status: Status
  createdAt: Date
}

// Лучшее из обоих миров
interface User extends Entity {
  name: string
  email: string
}

// Сценарий 6: Миграция legacy кода

// Legacy - все Type
type OldUser = {
  id: number
  name: string
}

type OldAdmin = OldUser & {
  permissions: string[]
}

// Новый код - Interface для объектов
interface User {
  id: number
  name: string
}

interface Admin extends User {
  permissions: string[]
}

// Переходный период - совместимость
type LegacyUser = User  // Алиас для совместимости
`

const performanceSnippet = `
// =====================================
// ПРОИЗВОДИТЕЛЬНОСТЬ: INTERFACE VS TYPE
// =====================================

// 1. Скорость компиляции

// Interface - быстрее компилируются
interface FastUser {
  id: number
  name: string
  email: string
}

// TypeScript кэширует проверки Interface
interface FastAdmin extends FastUser {
  permissions: string[]
}

// Type - медленнее при сложных операциях
type SlowUser = {
  id: number
  name: string
  email: string
}

type SlowAdmin = SlowUser & {
  permissions: string[]
}

// 2. Benchmark: Сложные типы

// Interface - линейная сложность
interface Base { a: string }
interface Level1 extends Base { b: string }
interface Level2 extends Level1 { c: string }
interface Level3 extends Level2 { d: string }
interface Level4 extends Level3 { e: string }
// Быстро компилируется ~1ms

// Type - экспоненциальная сложность
type Base2 = { a: string }
type Level1_2 = Base2 & { b: string }
type Level2_2 = Level1_2 & { c: string }
type Level3_2 = Level2_2 & { d: string }
type Level4_2 = Level3_2 & { e: string }
// Медленнее ~5ms (растет экспоненциально)

// 3. Conditional Types убивают производительность

// Быстро - Interface
interface SimpleUser {
  id: number
  name: string
}

// Медленно - Type с условиями
type ConditionalUser<T> = T extends { id: number }
  ? T & { hasId: true }
  : T & { hasId: false }

// Очень медленно - вложенные условия
type DeepConditional<T> = T extends Array<infer U>
  ? U extends object
    ? { [K in keyof U]: DeepConditional<U[K]> }
    : U
  : T extends object
    ? { [K in keyof T]: DeepConditional<T[K]> }
    : T

// 4. Mapped Types - медленные

// Interface - быстро
interface UserMap {
  [key: string]: string
}

// Type - медленнее
type UserMapType = {
  [K in 'name' | 'email' | 'phone']: string
}

// Очень медленно - сложный mapped type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

// 5. Union Types - влияние на производительность

// Небольшой union - OK
type SmallUnion = 'a' | 'b' | 'c'

// Большой union - медленно
type LargeUnion =
  | 'option1' | 'option2' | 'option3' | 'option4'
  | 'option5' | 'option6' | 'option7' | 'option8'
  | 'option9' | 'option10' | 'option11' | 'option12'
  // ... 100+ вариантов
  // Компиляция может занять секунды!

// Решение - использовать enum или const
const OPTIONS = ['option1', 'option2', /* ... */] as const
type Option = typeof OPTIONS[number]  // Быстрее

// 6. Рекомендации для больших проектов

// ✅ Хорошо - Interface для публичного API
export interface Config {
  apiUrl: string
  timeout: number
}

// ✅ Хорошо - Type для внутренних утилит
type InternalConfig = Readonly<Config>

// ❌ Плохо - сложные Type в публичном API
export type ComplexConfig = Readonly<
  Partial<Config> & {
    extraOptions?: DeepPartial<Options>
  }
>
// Медленная компиляция + плохие сообщения об ошибках

// 7. Измерение производительности компиляции

// package.json
{
  "scripts": {
    "build": "tsc",
    "build:trace": "tsc --generateTrace trace",
    "build:verbose": "tsc --extendedDiagnostics"
  }
}

// Анализ trace файлов покажет узкие места

// 8. Оптимизация для production

// До оптимизации - медленно
type HeavyType<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? U extends object
      ? DeepReadonly<U>
      : U
    : T[K]
}

// После оптимизации - быстрее
interface OptimizedType<T> {
  // Упрощенная структура
  data: T
  readonly metadata: {
    readonly timestamp: number
  }
}

// Правило: Interface где возможно, Type где необходимо
`

const errorMessagesSnippet = `
// =====================================
// СООБЩЕНИЯ ОБ ОШИБКАХ: INTERFACE VS TYPE
// =====================================

// 1. Interface - понятные ошибки

interface User {
  id: number
  name: string
  email: string
}

const user1: User = {
  id: 1,
  name: 'John'
  // ❌ Error: Property 'email' is missing in type
}
// Сообщение: четкое, указывает на User interface

// 2. Type - развернутые ошибки

type User2 = {
  id: number
  name: string
  email: string
}

const user2: User2 = {
  id: 1,
  name: 'John'
  // ❌ Error: Property 'email' is missing in type
  //    '{ id: number; name: string; }'
}
// Сообщение: показывает полный развернутый тип

// 3. Сложные Type - нечитаемые ошибки

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

type UpdateUser = DeepPartial<User2>

const update: UpdateUser = {
  id: 'wrong'  // ❌ Error
}
// Сообщение: показывает весь развернутый тип DeepPartial
// Очень сложно читать!

// 4. Interface с extends - читаемые ошибки

interface BaseEntity {
  id: number
  createdAt: Date
}

interface User extends BaseEntity {
  name: string
  email: string
}

const user3: User = {
  id: 1,
  createdAt: new Date()
  // ❌ Error: Type is missing properties: name, email
}
// Четко указывает на User, не показывает всю структуру

// 5. Type intersection - запутанные ошибки

type BaseEntity2 = {
  id: number
  createdAt: Date
}

type User4 = BaseEntity2 & {
  name: string
  email: string
}

const user4: User4 = {
  id: 1,
  createdAt: new Date()
  // ❌ Error: Type '{ id: number; createdAt: Date; }'
  //    is not assignable to type 'User4'
  //    Property 'name' is missing...
}
// Показывает весь intersection тип

// 6. Generic Interface - понятные ошибки

interface Result<T, E = Error> {
  success: boolean
  data?: T
  error?: E
}

const result: Result<User> = {
  success: true
  // data или error опциональны - OK
}

const result2: Result<User> = {
  success: 'yes'  // ❌ Error
  // Type 'string' is not assignable to type 'boolean'
}
// Четкая ошибка с указанием на Result<User>

// 7. Generic Type - развернутые ошибки

type Result2<T, E = Error> = {
  success: boolean
  data?: T
  error?: E
}

const result3: Result2<User2> = {
  success: 'yes'  // ❌ Error
  // Type 'string' is not assignable to type 'boolean'
  // in type '{ success: boolean; data?: User2; error?: Error }'
}
// Показывает полный развернутый тип

// 8. Рекомендации для лучших сообщений об ошибках

// ✅ Хорошо - именованные типы
interface ApiResponse<T> {
  data: T
  status: number
}

// ❌ Плохо - inline типы
const getData = (): {
  data: User
  status: number
} => {
  // При ошибке покажет весь inline тип
  return { data: {} as User, status: 200 }
}

// ✅ Лучше - использовать интерфейс
const getData2 = (): ApiResponse<User> => {
  // При ошибке покажет ApiResponse<User>
  return { data: {} as User, status: 200 }
}

// 9. Утилита для улучшения ошибок

// Wrapper для лучших сообщений
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type UglyType = { a: string } & { b: number } & { c: boolean }
// Ошибка показывает: { a: string } & { b: number } & { c: boolean }

type PrettyType = Prettify<UglyType>
// Ошибка показывает: { a: string; b: number; c: boolean }

// 10. Brand типы для Domain-Driven Design

// Type с брендом
type UserId = number & { readonly __brand: 'UserId' }
type OrderId = number & { readonly __brand: 'OrderId' }

const createUserId = (id: number): UserId => id as UserId

const userId = createUserId(1)
const orderId: OrderId = userId  // ❌ Error
// Type 'UserId' is not assignable to type 'OrderId'
// Четкое сообщение о несовместимости брендов

// Interface не может иметь такие бренды
interface UserIdInterface {
  readonly value: number
  readonly __brand: 'UserId'
}
// Менее удобно, требует объект
`

const realWorldPatternsSnippet = `
// =====================================
// РЕАЛЬНЫЕ ПАТТЕРНЫ: КОГДА ЧТО ИСПОЛЬЗОВАТЬ
// =====================================

// Паттерн 1: Domain Models - Interface
interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

interface Product {
  id: number
  title: string
  price: number
  inStock: boolean
}

// Domain logic с четкими контрактами
class UserService {
  constructor(private repository: UserRepository) {}

  async findUser(id: number): Promise<User | null> {
    return this.repository.findById(id)
  }
}

// Паттерн 2: API Responses - Type Union
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

const fetchUser = async (id: number): Promise<ApiResult<User>> => {
  try {
    const user = await fetch(\`/api/users/\${id}\`).then(r => r.json())
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: 'Failed to fetch' }
  }
}

// Паттерн 3: State Management - Discriminated Union
type LoadingState = { status: 'loading' }
type SuccessState<T> = { status: 'success'; data: T }
type ErrorState = { status: 'error'; error: string }

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState

const UserComponent = () => {
  const [state, setState] = useState<AsyncState<User>>({
    status: 'loading'
  })

  // Type narrowing работает идеально
  if (state.status === 'success') {
    console.log(state.data)  // TypeScript знает о data
  }
}

// Паттерн 4: Builder Pattern - Interface
interface QueryBuilder {
  select(...fields: string[]): this
  from(table: string): this
  where(condition: string): this
  build(): string
}

class SQLQueryBuilder implements QueryBuilder {
  private query = ''

  select(...fields: string[]): this {
    this.query += \`SELECT \${fields.join(', ')} \`
    return this
  }

  from(table: string): this {
    this.query += \`FROM \${table} \`
    return this
  }

  where(condition: string): this {
    this.query += \`WHERE \${condition}\`
    return this
  }

  build(): string {
    return this.query
  }
}

// Паттерн 5: Utility Types - Type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

// Используем для создания производных типов
type ReadonlyUser = DeepReadonly<User>
type UpdateUser = DeepPartial<User>

// Паттерн 6: Repository Pattern - Interface
interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
  save(entity: T): Promise<T>
  delete(id: number): Promise<void>
}

// Конкретная реализация
class UserRepository implements Repository<User> {
  // Реализация всех методов обязательна
  async findAll(): Promise<User[]> {
    return []
  }

  async findById(id: number): Promise<User | null> {
    return null
  }

  async save(entity: User): Promise<User> {
    return entity
  }

  async delete(id: number): Promise<void> {}
}

// Паттерн 7: Event System - Type Union
type UserEvent =
  | { type: 'USER_CREATED'; payload: User }
  | { type: 'USER_UPDATED'; payload: Partial<User> }
  | { type: 'USER_DELETED'; payload: { id: number } }

const handleUserEvent = (event: UserEvent) => {
  switch (event.type) {
    case 'USER_CREATED':
      console.log('New user:', event.payload)
      break
    case 'USER_UPDATED':
      console.log('Updated:', event.payload)
      break
    case 'USER_DELETED':
      console.log('Deleted user:', event.payload.id)
      break
  }
}

// Паттерн 8: Strategy Pattern - Interface
interface SortStrategy<T> {
  sort(items: T[]): T[]
}

class AlphabeticalSort implements SortStrategy<User> {
  sort(users: User[]): User[] {
    return users.sort((a, b) => a.name.localeCompare(b.name))
  }
}

class DateSort implements SortStrategy<User> {
  sort(users: User[]): User[] {
    return users.sort((a, b) =>
      a.createdAt.getTime() - b.createdAt.getTime()
    )
  }
}

class UserList {
  constructor(private sortStrategy: SortStrategy<User>) {}

  displayUsers(users: User[]): User[] {
    return this.sortStrategy.sort(users)
  }
}

// Паттерн 9: Type Guards - Type Predicates
type Admin = User & { role: 'admin'; permissions: string[] }
type Guest = User & { role: 'guest' }

type UserRole = Admin | Guest

const isAdmin = (user: UserRole): user is Admin => {
  return user.role === 'admin'
}

const processUser = (user: UserRole) => {
  if (isAdmin(user)) {
    console.log(user.permissions)  // TypeScript знает о permissions
  }
}

// Паттерн 10: Branded Types - Type
type Email = string & { readonly __brand: 'Email' }
type PhoneNumber = string & { readonly __brand: 'PhoneNumber' }

const createEmail = (value: string): Email => {
  if (!value.includes('@')) {
    throw new Error('Invalid email')
  }
  return value as Email
}

const sendEmail = (to: Email, message: string) => {
  // Гарантированно валидный email
}

const email = createEmail('test@example.com')
sendEmail(email, 'Hello')

// const phone: PhoneNumber = "+123"
// sendEmail(phone, 'Hello')  // ❌ Type error

// Паттерн 11: Facade Pattern - Interface
interface PaymentGateway {
  charge(amount: number, token: string): Promise<boolean>
  refund(transactionId: string): Promise<void>
}

class StripeGateway implements PaymentGateway {
  async charge(amount: number, token: string): Promise<boolean> {
    // Stripe specific implementation
    return true
  }

  async refund(transactionId: string): Promise<void> {
    // Stripe refund
  }
}

class PayPalGateway implements PaymentGateway {
  async charge(amount: number, token: string): Promise<boolean> {
    // PayPal specific implementation
    return true
  }

  async refund(transactionId: string): Promise<void> {
    // PayPal refund
  }
}

// Единый интерфейс для работы с разными платежными системами
class PaymentService {
  constructor(private gateway: PaymentGateway) {}

  async processPayment(amount: number, token: string) {
    return this.gateway.charge(amount, token)
  }
}

// Паттерн 12: DTO (Data Transfer Object) - Interface
interface CreateUserDTO {
  name: string
  email: string
  password: string
}

interface UpdateUserDTO {
  name?: string
  email?: string
}

interface UserDTO {
  id: number
  name: string
  email: string
  createdAt: string  // Сериализованная дата
}

// Разделение между domain model и API contract
class UserController {
  async createUser(dto: CreateUserDTO): Promise<UserDTO> {
    // Преобразование DTO -> Domain Model
    const user: User = {
      id: 1,
      name: dto.name,
      email: dto.email,
      createdAt: new Date()
    }

    // Сохранение...

    // Преобразование Domain Model -> DTO
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString()
    }
  }
}
`

const advancedTechniquesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТЕХНИКИ
// =====================================

// 1. Mixins с Interfaces
interface Timestamped {
  createdAt: Date
  updatedAt: Date
}

interface Versioned {
  version: number
}

// Mixin функция
function applyTimestamps<T extends new (...args: any[]) => {}>(Base: T) {
  return class extends Base implements Timestamped {
    createdAt = new Date()
    updatedAt = new Date()

    touch() {
      this.updatedAt = new Date()
    }
  }
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = applyTimestamps(User)
const user = new TimestampedUser('John')
console.log(user.createdAt)  // Работает!

// 2. Conditional Interface Extension
interface BaseEntity {
  id: number
}

// Условное расширение через Type
type EntityWithTimestamps<T, WithTime extends boolean> =
  T & (WithTime extends true ? Timestamped : {})

interface User extends BaseEntity {
  name: string
}

type UserWithTime = EntityWithTimestamps<User, true>
type UserWithoutTime = EntityWithTimestamps<User, false>

// 3. Interface Merging для библиотек
// lib.d.ts
interface Window {
  myLibrary: MyLibrary
}

interface MyLibrary {
  version: string
  init(): void
}

// Пользователи могут расширять
declare global {
  interface Window {
    customProperty: string
  }
}

// В коде
window.myLibrary.init()
window.customProperty = 'value'

// 4. Recursive Interfaces
interface TreeNode<T> {
  value: T
  children: TreeNode<T>[]
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 3, children: [] }
      ]
    }
  ]
}

// 5. Phantom Types для безопасности
type Opaque<K, T> = T & { readonly __TYPE__: K }

type USD = Opaque<'USD', number>
type EUR = Opaque<'EUR', number>

const usd = (amount: number): USD => amount as USD
const eur = (amount: number): EUR => amount as EUR

const price1: USD = usd(100)
const price2: EUR = eur(100)

// const mixed: USD = price2  // ❌ Error - нельзя смешивать валюты

// 6. Builder Pattern с Fluent Interface
interface QueryBuilder {
  select(...fields: string[]): this
  from(table: string): this
  where(condition: string): this
  orderBy(field: string, direction?: 'ASC' | 'DESC'): this
  limit(count: number): this
  build(): string
}

// Цепочка вызовов типизирована
const query = new SQLQueryBuilder()
  .select('id', 'name')
  .from('users')
  .where('age > 18')
  .orderBy('name', 'ASC')
  .limit(10)
  .build()

// 7. Const Assertions с Type
const STATUSES = ['pending', 'approved', 'rejected'] as const
type Status = typeof STATUSES[number]  // 'pending' | 'approved' | 'rejected'

const CONFIG = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const

type Config = typeof CONFIG
// Config = {
//   readonly apiUrl: "https://api.example.com"
//   readonly timeout: 5000
//   readonly retries: 3
// }

// 8. Discriminated Unions для State Machines
type State =
  | { status: 'idle' }
  | { status: 'loading'; startTime: number }
  | { status: 'success'; data: string; loadTime: number }
  | { status: 'error'; error: Error; retryCount: number }

const transition = (state: State, action: Action): State => {
  switch (state.status) {
    case 'idle':
      if (action.type === 'START_LOADING') {
        return { status: 'loading', startTime: Date.now() }
      }
      return state

    case 'loading':
      if (action.type === 'LOAD_SUCCESS') {
        return {
          status: 'success',
          data: action.payload,
          loadTime: Date.now() - state.startTime
        }
      }
      return state

    // ...
  }
}

// 9. Variance Annotations (TS 4.7+)
interface Producer<out T> {
  produce(): T
}

interface Consumer<in T> {
  consume(item: T): void
}

interface Transformer<in T, out U> {
  transform(input: T): U
}

// out = covariant (только возвращает)
// in = contravariant (только принимает)

// 10. Template Literal Types для API Routes
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type APIVersion = 'v1' | 'v2'
type Resource = 'users' | 'posts' | 'comments'

type APIRoute = \`/api/\${APIVersion}/\${Resource}\`
// "/api/v1/users" | "/api/v1/posts" | ... (12 комбинаций)

type APIEndpoint = \`\${HTTPMethod} \${APIRoute}\`
// "GET /api/v1/users" | "POST /api/v1/users" | ... (48 комбинаций)

// 11. Excess Property Checks обход
interface Config {
  apiUrl: string
  timeout?: number
}

// ❌ Error - excess property
const config1: Config = {
  apiUrl: 'https://api.example.com',
  debug: true  // Error!
}

// ✅ OK - через переменную
const configData = {
  apiUrl: 'https://api.example.com',
  debug: true
}
const config2: Config = configData  // OK

// ✅ OK - через type assertion
const config3: Config = {
  apiUrl: 'https://api.example.com',
  debug: true
} as Config

// 12. Index Signatures с Interfaces
interface Dictionary {
  [key: string]: string
}

interface StrictDictionary {
  name: string  // Известные свойства
  [key: string]: string | number  // Index signature
}

const dict: StrictDictionary = {
  name: 'John',
  age: 30,  // OK - number разрешен
  city: 'NYC'  // OK - string разрешен
}

// 13. Namespace Augmentation
// my-library.d.ts
declare namespace MyLibrary {
  interface Options {
    debug: boolean
  }

  function init(options: Options): void
}

// Расширение в другом файле
declare namespace MyLibrary {
  interface Options {
    verbose?: boolean  // Добавили новую опцию
  }
}

MyLibrary.init({ debug: true, verbose: true })  // Работает!

// 14. Readonly Tuples с Type
type Point = readonly [number, number]

const point: Point = [10, 20]
// point[0] = 30  // ❌ Error - readonly

type RGB = readonly [red: number, green: number, blue: number]

const color: RGB = [255, 128, 0]
console.log(color[0])  // OK - чтение
// color[0] = 100  // ❌ Error - readonly

// 15. Higher-Order Types
type Constructor<T = {}> = new (...args: any[]) => T

type Mixin<T extends Constructor> = (Base: T) => T

const TimestampMixin: Mixin<Constructor> = (Base) => {
  return class extends Base {
    timestamp = Date.now()
  }
}

const LoggableMixin: Mixin<Constructor> = (Base) => {
  return class extends Base {
    log(message: string) {
      console.log(\`[\${this.constructor.name}] \${message}\`)
    }
  }
}

class BaseClass {
  name = 'Base'
}

const EnhancedClass = LoggableMixin(TimestampMixin(BaseClass))
const instance = new EnhancedClass()
instance.log('Hello')  // "[EnhancedClass] Hello"
console.log(instance.timestamp)  // 1234567890
`

const highlightedClassesWithInterfaces = ref('')
const highlightedMigration = ref('')
const highlightedPerformance = ref('')
const highlightedErrorMessages = ref('')
const highlightedRealWorldPatterns = ref('')
const highlightedAdvancedTechniques = ref('')

onMounted(() => {
  highlightedClassesWithInterfaces.value = Prism.highlight(classesWithInterfacesSnippet, Prism.languages.typescript, 'typescript')
  highlightedMigration.value = Prism.highlight(migrationSnippet, Prism.languages.typescript, 'typescript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.typescript, 'typescript')
  highlightedErrorMessages.value = Prism.highlight(errorMessagesSnippet, Prism.languages.typescript, 'typescript')
  highlightedRealWorldPatterns.value = Prism.highlight(realWorldPatternsSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedTechniques.value = Prism.highlight(advancedTechniquesSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Interfaces vs Types: Углубленное сравнение
            </h1>

            <p class="font-weight-regular mb-6">
              Дополнительный материал к основному файлу. Фокус на работе с классами, производительности,
              миграции между подходами, качестве сообщений об ошибках и продвинутых техниках использования.
            </p>

            <!-- Преимущества Interface с классами -->
            <h2 class="text-h5 font-weight-bold mb-3">Interfaces с классами: ключевые преимущества</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-decagram</v-icon>
              <strong>Главное преимущество:</strong> Interface создает явный контракт для классов через
              <code>implements</code>, обеспечивая строгую проверку реализации всех методов и свойств.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Interface может</h3>
                  <ul class="pl-4">
                    <li><code>implements</code> — класс реализует интерфейс</li>
                    <li>Множественная реализация</li>
                    <li>Extends для иерархии интерфейсов</li>
                    <li>Declaration merging</li>
                    <li>Используется в DI (Dependency Injection)</li>
                    <li>Четкие контракты для методов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Type не может</h3>
                  <ul class="pl-4">
                    <li><code>implements</code> напрямую не работает</li>
                    <li>Нет declaration merging</li>
                    <li>Сложнее для OOP паттернов</li>
                    <li>Менее подходит для публичных API</li>
                    <li>Intersection вместо extends</li>
                    <li>Хуже для строгих контрактов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedClassesWithInterfaces"></code></pre>

            <!-- Миграция между Interface и Type -->
            <h2 class="text-h5 font-weight-bold mb-3">Миграция между Interface и Type</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-swap-horizontal</v-icon>
              <strong>Когда мигрировать:</strong> Interface → Type при необходимости union/mapped types.
              Type → Interface для публичных API и лучших сообщений об ошибках.
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Направление</th>
                <th class="text-left font-weight-bold">Причина</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Нужны union types</td>
                <td class="text-warning">Interface → Type</td>
                <td>Interface не поддерживает union</td>
              </tr>
              <tr>
                <td>Публичный API библиотеки</td>
                <td class="text-success">Type → Interface</td>
                <td>Declaration merging, лучше DX</td>
              </tr>
              <tr>
                <td>Работа с классами</td>
                <td class="text-success">Type → Interface</td>
                <td>Поддержка implements</td>
              </tr>
              <tr>
                <td>Сложные трансформации</td>
                <td class="text-warning">Interface → Type</td>
                <td>Mapped/conditional types</td>
              </tr>
              <tr>
                <td>Производительность критична</td>
                <td class="text-success">Type → Interface</td>
                <td>Быстрее компилируется</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMigration"></code></pre>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Производительность компиляции</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-speedometer</v-icon>
              <strong>Критично для больших проектов:</strong> Interface компилируются в 2-5 раз быстрее
              сложных Type с conditional/mapped types. В проектах 100k+ строк разница ощутима.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Быстро</h3>
                  <ul class="text-left pl-4">
                    <li>Interface (кэшируются)</li>
                    <li>Простые Type aliases</li>
                    <li>Enum</li>
                    <li>Const assertions</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-speedometer-medium</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Средне</h3>
                  <ul class="text-left pl-4">
                    <li>Union types (до 10 вариантов)</li>
                    <li>Intersection types</li>
                    <li>Простые Mapped types</li>
                    <li>Utility types (Pick, Omit)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-speedometer-slow</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Медленно</h3>
                  <ul class="text-left pl-4">
                    <li>Conditional types</li>
                    <li>Recursive types</li>
                    <li>Deep mapped types</li>
                    <li>Large union (100+ вариантов)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <!-- Сообщения об ошибках -->
            <h2 class="text-h5 font-weight-bold mb-3">Качество сообщений об ошибках</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
              <strong>Developer Experience:</strong> Interface дает более читаемые ошибки, показывая
              имя интерфейса. Type часто показывает полный развернутый тип, что усложняет отладку.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Interface ошибки</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Показывает имя интерфейса</li>
                    <li>Краткие сообщения</li>
                    <li>Четко указывает источник</li>
                    <li>Легко читать и понимать</li>
                    <li>Ссылается на конкретный контракт</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Type ошибки</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Развернутая структура типа</li>
                    <li>Многословные сообщения</li>
                    <li>Сложно найти корень проблемы</li>
                    <li>Особенно плохо для mapped types</li>
                    <li>Показывает все intersection/union</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedErrorMessages"></code></pre>

            <!-- Реальные паттерны -->
            <h2 class="text-h5 font-weight-bold mb-3">Реальные паттерны проектирования</h2>
            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-layers-triple</v-icon>
              <strong>Best Practice:</strong> Комбинируйте Interface и Type — используйте каждый
              для того, для чего он лучше подходит. Interface для структур и классов, Type для union и трансформаций.
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Паттерн</th>
                <th class="text-left font-weight-bold">Инструмент</th>
                <th class="text-left font-weight-bold">Причина выбора</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Domain Models</td>
                <td class="text-success"><strong>Interface</strong></td>
                <td>Структура данных, используется с классами</td>
              </tr>
              <tr>
                <td>API Responses</td>
                <td class="text-warning"><strong>Type Union</strong></td>
                <td>Success/Error states</td>
              </tr>
              <tr>
                <td>State Management</td>
                <td class="text-warning"><strong>Discriminated Union</strong></td>
                <td>Type narrowing для разных состояний</td>
              </tr>
              <tr>
                <td>Repository Pattern</td>
                <td class="text-success"><strong>Interface</strong></td>
                <td>Контракт для реализации в классах</td>
              </tr>
              <tr>
                <td>Utility Types</td>
                <td class="text-warning"><strong>Type</strong></td>
                <td>Mapped/conditional трансформации</td>
              </tr>
              <tr>
                <td>Builder Pattern</td>
                <td class="text-success"><strong>Interface</strong></td>
                <td>Fluent API с методами, возвращающими this</td>
              </tr>
              <tr>
                <td>Event System</td>
                <td class="text-warning"><strong>Type Union</strong></td>
                <td>Разные типы событий</td>
              </tr>
              <tr>
                <td>Strategy Pattern</td>
                <td class="text-success"><strong>Interface</strong></td>
                <td>Взаимозаменяемые алгоритмы</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorldPatterns"></code></pre>

            <!-- Продвинутые техники -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники использования</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Interface Advanced</h3>
                  <ul class="pl-4">
                    <li><strong>Mixins</strong> — композиция функциональности</li>
                    <li><strong>Declaration Merging</strong> — расширение библиотек</li>
                    <li><strong>Namespace Augmentation</strong> — модули</li>
                    <li><strong>Fluent Interfaces</strong> — method chaining</li>
                    <li><strong>Recursive Interfaces</strong> — деревья, графы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Type Advanced</h3>
                  <ul class="pl-4">
                    <li><strong>Phantom Types</strong> — compile-time safety</li>
                    <li><strong>Branded Types</strong> — domain primitives</li>
                    <li><strong>Template Literals</strong> — type-level строки</li>
                    <li><strong>Variance Annotations</strong> — in/out</li>
                    <li><strong>Higher-Order Types</strong> — типы типов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedTechniques"></code></pre>

            <!-- Чек-лист принятия решений -->
            <h2 class="text-h5 font-weight-bold mb-3">Чек-лист: Interface или Type?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-checkbox-marked-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Выбирайте Interface если:</h3>
                  </div>
                  <v-checklist>
                    <v-checkbox label="☑️ Описываете объект или структуру данных" readonly></v-checkbox>
                    <v-checkbox label="☑️ Работаете с классами (нужен implements)" readonly></v-checkbox>
                    <v-checkbox label="☑️ Создаете публичный API библиотеки" readonly></v-checkbox>
                    <v-checkbox label="☑️ Нужна возможность расширения (declaration merging)" readonly></v-checkbox>
                    <v-checkbox label="☑️ Важна производительность компиляции" readonly></v-checkbox>
                    <v-checkbox label="☑️ Хотите четкие сообщения об ошибках" readonly></v-checkbox>
                    <v-checkbox label="☑️ Используете OOP паттерны" readonly></v-checkbox>
                    <v-checkbox label="☑️ Описываете контракты для dependency injection" readonly></v-checkbox>
                  </v-checklist>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-checkbox-marked-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Выбирайте Type если:</h3>
                  </div>
                  <v-checklist>
                    <v-checkbox label="☑️ Нужны union types (A | B | C)" readonly></v-checkbox>
                    <v-checkbox label="☑️ Работаете с примитивами (type ID = number)" readonly></v-checkbox>
                    <v-checkbox label="☑️ Используете tuple types ([string, number])" readonly></v-checkbox>
                    <v-checkbox label="☑️ Нужны mapped types" readonly></v-checkbox>
                    <v-checkbox label="☑️ Нужны conditional types (T extends U ? X : Y)" readonly></v-checkbox>
                    <v-checkbox label="☑️ Создаете utility types" readonly></v-checkbox>
                    <v-checkbox label="☑️ Используете template literal types" readonly></v-checkbox>
                    <v-checkbox label="☑️ Нужны branded/phantom types для безопасности" readonly></v-checkbox>
                  </v-checklist>
                </v-card>
              </v-col>
            </v-row>

            <!-- Частые ошибки -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки и как их избежать</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-error">
                  <v-icon size="large" color="white" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ Типичные ошибки</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Использование Type вместо Interface для классов</li>
                    <li>Сложные nested mapped types в публичном API</li>
                    <li>Игнорирование declaration merging возможностей</li>
                    <li>Смешивание стилей без причины</li>
                    <li>Избыточное использование conditional types</li>
                    <li>Забывание о производительности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Правильный подход</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Interface для всех структур данных</li>
                    <li>Type для union и трансформаций</li>
                    <li>Консистентность в проекте</li>
                    <li>Документирование выбора</li>
                    <li>Использование ESLint правил</li>
                    <li>Профилирование компиляции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="large" color="white" class="mb-2">mdi-lightbulb-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">💡 Рекомендации</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Начинайте с Interface по умолчанию</li>
                    <li>Переходите на Type только при необходимости</li>
                    <li>Изучайте code style команды</li>
                    <li>Используйте prettier для форматирования</li>
                    <li>Регулярно ревьюйте типы в PR</li>
                    <li>Следите за обновлениями TypeScript</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итоговая таблица -->
            <h2 class="text-h5 font-weight-bold mb-3">Итоговая сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">Interface</th>
                <th class="text-left font-weight-bold">Type</th>
                <th class="text-left font-weight-bold">Победитель</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Работа с классами</strong></td>
                <td class="text-success">✅ Отлично (implements)</td>
                <td class="text-error">❌ Не поддерживает</td>
                <td class="text-success">Interface</td>
              </tr>
              <tr>
                <td><strong>Union types</strong></td>
                <td class="text-error">❌ Не поддерживает</td>
                <td class="text-success">✅ Отлично</td>
                <td class="text-success">Type</td>
              </tr>
              <tr>
                <td><strong>Производительность</strong></td>
                <td class="text-success">✅ Быстро</td>
                <td class="text-warning">⚠️ Медленнее</td>
                <td class="text-success">Interface</td>
              </tr>
              <tr>
                <td><strong>Сообщения об ошибках</strong></td>
                <td class="text-success">✅ Четкие</td>
                <td class="text-warning">⚠️ Развернутые</td>
                <td class="text-success">Interface</td>
              </tr>
              <tr>
                <td><strong>Declaration merging</strong></td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">Interface</td>
              </tr>
              <tr>
                <td><strong>Mapped types</strong></td>
                <td class="text-error">❌ Не поддерживает</td>
                <td class="text-success">✅ Отлично</td>
                <td class="text-success">Type</td>
              </tr>
              <tr>
                <td><strong>Conditional types</strong></td>
                <td class="text-error">❌ Не поддерживает</td>
                <td class="text-success">✅ Отлично</td>
                <td class="text-success">Type</td>
              </tr>
              <tr>
                <td><strong>Публичный API</strong></td>
                <td class="text-success">✅ Рекомендуется</td>
                <td class="text-warning">⚠️ Допустимо</td>
                <td class="text-success">Interface</td>
              </tr>
              <tr>
                <td><strong>Tuple types</strong></td>
                <td class="text-warning">⚠️ Сложно</td>
                <td class="text-success">✅ Легко</td>
                <td class="text-success">Type</td>
              </tr>
              <tr>
                <td><strong>Примитивы</strong></td>
                <td class="text-error">❌ Только объекты</td>
                <td class="text-success">✅ Любые типы</td>
                <td class="text-success">Type</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <strong>Главный вывод:</strong> Нет однозначного победителя — Interface и Type дополняют друг друга.
              <strong>Interface</strong> идеален для структур данных, классов, публичных API и когда важна
              производительность. <strong>Type</strong> незаменим для union, tuple, mapped и conditional types.
              В реальных проектах используйте оба инструмента, выбирая подходящий для конкретной задачи.
              Начинайте с Interface по умолчанию и переходите на Type, когда его возможности критически необходимы.
            </p>

            <v-alert type="success" class="mb-6">
              <template v-slot:title>
                Золотое правило
              </template>
              <strong>Interface</strong> для структуры и контрактов. <strong>Type</strong> для трансформаций и union.
              Комбинируйте их для максимальной выразительности и производительности TypeScript кода.
            </v-alert>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces"
                target="_blank"
                class="mr-2">
                TypeScript Interfaces
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases"
                target="_blank"
                class="mr-2">
                TypeScript Type Aliases
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/classes.html"
                target="_blank">
                Classes
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
