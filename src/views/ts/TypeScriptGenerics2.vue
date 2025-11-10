<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const genericsBasicsSnippet = `
// =====================================
// GENERICS - основы
// =====================================

// 1. Функция без Generics - повторение кода
function getFirstString(arr: string[]): string {
  return arr[0]
}

function getFirstNumber(arr: number[]): number {
  return arr[0]
}

// 2. Функция с Generic - универсальное решение
function getFirst<T>(arr: T[]): T {
  return arr[0]
}

// Использование - TypeScript автоматически выводит тип
const firstString = getFirst(['a', 'b', 'c'])  // тип: string
const firstNumber = getFirst([1, 2, 3])        // тип: number
const firstBool = getFirst([true, false])      // тип: boolean

// Явное указание типа
const firstExplicit = getFirst<string>(['hello'])

// 3. Множественные типовые параметры
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value]
}

const numberPair = pair(1, 'one')      // [number, string]
const stringPair = pair('id', 123)     // [string, number]

// 4. Generic тип для объекта
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { id: 1, name: 'John', age: 30 }
const userName = getProperty(user, 'name')  // тип: string
const userAge = getProperty(user, 'age')    // тип: number
// const invalid = getProperty(user, 'invalid')  // ❌ Error

// 5. Generic интерфейс
interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 123 }
const stringBox: Box<string> = { value: 'hello' }

// 6. Generic класс
class Container<T> {
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

const numberContainer = new Container(42)
console.log(numberContainer.getValue())  // 42
numberContainer.setValue(100)

const stringContainer = new Container('hello')
console.log(stringContainer.getValue())  // 'hello'

// 7. Generic с дефолтным типом
interface Response<T = any> {
  data: T
  status: number
  message: string
}

const userResponse: Response<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'OK'
}

const defaultResponse: Response = {
  data: { anything: 'goes' },
  status: 200,
  message: 'OK'
}

// 8. Generic constraints - ограничения
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length)
}

logLength('hello')      // ✅ OK - string имеет length
logLength([1, 2, 3])    // ✅ OK - array имеет length
// logLength(123)       // ❌ Error - number не имеет length

// 9. Generic с несколькими ограничениями
interface Named {
  name: string
}

interface Aged {
  age: number
}

function printInfo<T extends Named & Aged>(person: T): void {
  console.log(\`\${person.name} is \${person.age} years old\`)
}

printInfo({ name: 'John', age: 30 })  // ✅ OK
// printInfo({ name: 'John' })        // ❌ Error - отсутствует age
`

const extendsKeywordSnippet = `
// =====================================
// EXTENDS - ограничения и условные типы
// =====================================

// 1. Базовое ограничение типа
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

const merged = merge({ name: 'John' }, { age: 30 })
console.log(merged.name, merged.age)  // ✅ OK

// merge('string', { age: 30 })  // ❌ Error - string не extends object

// 2. Extends с примитивами
function convertToString<T extends string | number>(value: T): string {
  return String(value)
}

convertToString(123)      // ✅ OK
convertToString('hello')  // ✅ OK
// convertToString(true)  // ❌ Error - boolean не подходит

// 3. Extends для массивов
function getLastItem<T extends any[]>(arr: T): T[number] {
  return arr[arr.length - 1]
}

const lastNumber = getLastItem([1, 2, 3])  // тип: number
const lastString = getLastItem(['a', 'b'])  // тип: string

// 4. Conditional Types - условные типы с extends
type IsString<T> = T extends string ? true : false

type A = IsString<string>   // true
type B = IsString<number>   // false
type C = IsString<'hello'>  // true

// 5. Практический пример - Extract возвращаемого типа
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type FuncReturn = ReturnType<() => string>     // string
type FuncReturn2 = ReturnType<() => number>    // number
type NotFunc = ReturnType<string>              // never

// 6. Extends для проверки наличия свойства
type HasProperty<T, K extends string> = T extends { [key in K]: any }
  ? true
  : false

type UserHasName = HasProperty<{ name: string; age: number }, 'name'>  // true
type UserHasEmail = HasProperty<{ name: string; age: number }, 'email'>  // false

// 7. Рекурсивные conditional types
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T

type Nested = string[][]
type Flat = Flatten<Nested>  // string

type DeepNested = number[][][]
type DeepFlat = Flatten<DeepNested>  // number

// 8. Extends с union types
type Filter<T, U> = T extends U ? T : never

type Numbers = Filter<string | number | boolean, number>  // number
type Strings = Filter<string | number | boolean, string>  // string

// 9. Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never

type StringOrNumber = string | number
type Result = ToArray<StringOrNumber>  // string[] | number[]

// 10. Extends для создания подтипов
function processValue<T extends string | number>(value: T): T extends string ? string : number {
  if (typeof value === 'string') {
    return value.toUpperCase() as any
  }
  return (value * 2) as any
}

const strResult = processValue('hello')  // тип: string
const numResult = processValue(10)       // тип: number

// 11. Extends для проверки совместимости типов
type IsAssignable<T, U> = T extends U ? true : false

type CanAssignNumberToAny = IsAssignable<number, any>        // true
type CanAssignNumberToString = IsAssignable<number, string>  // false

// 12. Extends для извлечения типов
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type StringPromise = UnwrapPromise<Promise<string>>  // string
type NumberType = UnwrapPromise<number>              // number

// 13. Extends с несколькими условиями
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object'

type T1 = TypeName<string>    // 'string'
type T2 = TypeName<123>       // 'number'
type T3 = TypeName<() => void>  // 'function'

// 14. Extends для создания утилитных типов
type NonNullable<T> = T extends null | undefined ? never : T

type MaybeString = string | null | undefined
type DefiniteString = NonNullable<MaybeString>  // string

// 15. Extends в mapped types
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? ReadonlyDeep<T[P]>
    : T[P]
}

interface User {
  name: string
  profile: {
    age: number
    settings: {
      theme: string
    }
  }
}

type ReadonlyUser = ReadonlyDeep<User>
// Все вложенные свойства readonly
`

const keyofOperatorSnippet = `
// =====================================
// KEYOF - получение ключей типа
// =====================================

// 1. Базовое использование keyof
interface User {
  id: number
  name: string
  email: string
}

type UserKeys = keyof User  // 'id' | 'name' | 'email'

// 2. Функция с keyof для безопасного доступа к свойствам
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user: User = { id: 1, name: 'John', email: 'john@example.com' }

const userName = getProperty(user, 'name')   // тип: string
const userId = getProperty(user, 'id')       // тип: number
// const invalid = getProperty(user, 'age')  // ❌ Error

// 3. Keyof с индексной сигнатурой
interface Dictionary {
  [key: string]: string
}

type DictKeys = keyof Dictionary  // string | number
// number потому что obj[0] === obj['0']

// 4. Создание типа из значений объекта
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map(item => item[key])
}

const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 }
]

const names = pluck(users, 'name')  // string[]
const ages = pluck(users, 'age')    // number[]

// 5. Keyof с mapped types
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface Product {
  id: number
  name: string
  price: number
  description: string
}

// id и name обязательны, остальные опциональны
type CreateProduct = PartialBy<Product, 'price' | 'description'>

const newProduct: CreateProduct = {
  id: 1,
  name: 'Laptop'
  // price и description необязательны
}

// 6. Создание типа для обновления
type UpdateFields<T> = {
  [K in keyof T]?: T[K]
}

type UserUpdate = UpdateFields<User>

const update: UserUpdate = {
  name: 'New Name'
  // другие поля опциональны
}

// 7. Keyof для создания Record типа
function createRecord<K extends string | number | symbol, V>(
  keys: K[],
  value: V
): Record<K, V> {
  const result = {} as Record<K, V>
  keys.forEach(key => {
    result[key] = value
  })
  return result
}

const defaults = createRecord(['x', 'y', 'z'], 0)
// { x: 0, y: 0, z: 0 }

// 8. Keyof для типизации событий
interface Events {
  click: { x: number; y: number }
  focus: { element: HTMLElement }
  submit: { formData: FormData }
}

type EventName = keyof Events  // 'click' | 'focus' | 'submit'

function addEventListener<E extends keyof Events>(
  event: E,
  handler: (payload: Events[E]) => void
): void {
  // Реализация...
}

addEventListener('click', ({ x, y }) => {
  console.log(\`Clicked at \${x}, \${y}\`)
})

addEventListener('submit', ({ formData }) => {
  console.log('Form submitted', formData)
})

// 9. Создание строго типизированного селектора
type Selector<T> = {
  [K in keyof T]: (state: T) => T[K]
}

interface State {
  user: User
  count: number
  isLoading: boolean
}

const selectors: Selector<State> = {
  user: (state) => state.user,
  count: (state) => state.count,
  isLoading: (state) => state.isLoading
}

// 10. Keyof для валидации схемы
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null
}

const userValidation: ValidationRules<User> = {
  name: (value) => value.length < 3 ? 'Too short' : null,
  email: (value) => value.includes('@') ? null : 'Invalid email',
  id: (value) => value > 0 ? null : 'Must be positive'
}

// 11. Keyof с template literal types
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

type UserGetters = Getters<User>
// {
//   getId: () => number
//   getName: () => string
//   getEmail: () => string
// }

// 12. Keyof для создания builder pattern
type Builder<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => Builder<T>
} & {
  build: () => T
}

class UserBuilder implements Builder<User> {
  private user: Partial<User> = {}

  setId(value: number): this {
    this.user.id = value
    return this
  }

  setName(value: string): this {
    this.user.name = value
    return this
  }

  setEmail(value: string): this {
    this.user.email = value
    return this
  }

  build(): User {
    return this.user as User
  }
}

const builtUser = new UserBuilder()
  .setId(1)
  .setName('John')
  .setEmail('john@example.com')
  .build()

// 13. Keyof для создания proxy объектов
type Proxied<T> = {
  [K in keyof T]: {
    get: () => T[K]
    set: (value: T[K]) => void
  }
}

function createProxy<T extends object>(obj: T): Proxied<T> {
  const proxy = {} as Proxied<T>

  for (const key in obj) {
    proxy[key] = {
      get: () => obj[key],
      set: (value: T[typeof key]) => {
        obj[key] = value
      }
    }
  }

  return proxy
}

// 14. Keyof для path строк
type PathKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? K | \`\${K & string}.\${PathKeys<T[K]> & string}\`
    : K
}[keyof T]

interface NestedUser {
  name: string
  profile: {
    age: number
    address: {
      city: string
    }
  }
}

type Paths = PathKeys<NestedUser>
// 'name' | 'profile' | 'profile.age' | 'profile.address' | 'profile.address.city'

// 15. Keyof с условными типами для фильтрации
type FilterByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

interface Mixed {
  id: number
  name: string
  count: number
  active: boolean
  description: string
}

type OnlyNumbers = FilterByType<Mixed, number>
// { id: number, count: number }

type OnlyStrings = FilterByType<Mixed, string>
// { name: string, description: string }
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Типизированный API клиент
interface ApiEndpoints {
  '/users': { id: number; name: string }[]
  '/posts': { id: number; title: string; userId: number }[]
  '/comments': { id: number; text: string; postId: number }[]
}

class ApiClient {
  async get<E extends keyof ApiEndpoints>(
    endpoint: E
  ): Promise<ApiEndpoints[E]> {
    const response = await fetch(\`https://api.example.com\${endpoint}\`)
    return response.json()
  }

  async post<E extends keyof ApiEndpoints>(
    endpoint: E,
    data: Partial<ApiEndpoints[E][number]>
  ): Promise<ApiEndpoints[E][number]> {
    const response = await fetch(\`https://api.example.com\${endpoint}\`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

const api = new ApiClient()

// TypeScript знает точные типы!
const users = await api.get('/users')  // { id: number; name: string }[]
const posts = await api.get('/posts')  // { id: number; title: string; userId: number }[]

// 2. Type-safe Redux reducer
type Action<T extends string, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P }

type TodoActions =
  | Action<'ADD_TODO', { text: string }>
  | Action<'TOGGLE_TODO', { id: number }>
  | Action<'DELETE_TODO', { id: number }>
  | Action<'CLEAR_COMPLETED'>

interface TodoState {
  items: Array<{ id: number; text: string; completed: boolean }>
}

function todoReducer(state: TodoState, action: TodoActions): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: action.payload.text,  // TypeScript знает о payload!
            completed: false
          }
        ]
      }

    case 'TOGGLE_TODO':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item
        )
      }

    case 'DELETE_TODO':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        items: state.items.filter(item => !item.completed)
      }
  }
}

// 3. Generic Repository Pattern
interface Entity {
  id: number | string
}

interface Repository<T extends Entity> {
  findAll(): Promise<T[]>
  findById(id: T['id']): Promise<T | null>
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: T['id'], data: Partial<Omit<T, 'id'>>): Promise<T>
  delete(id: T['id']): Promise<void>
}

class BaseRepository<T extends Entity> implements Repository<T> {
  constructor(private endpoint: string) {}

  async findAll(): Promise<T[]> {
    const response = await fetch(\`/api\${this.endpoint}\`)
    return response.json()
  }

  async findById(id: T['id']): Promise<T | null> {
    const response = await fetch(\`/api\${this.endpoint}/\${id}\`)
    if (!response.ok) return null
    return response.json()
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await fetch(\`/api\${this.endpoint}\`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async update(id: T['id'], data: Partial<Omit<T, 'id'>>): Promise<T> {
    const response = await fetch(\`/api\${this.endpoint}/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async delete(id: T['id']): Promise<void> {
    await fetch(\`/api\${this.endpoint}/\${id}\`, {
      method: 'DELETE'
    })
  }
}

// Использование
interface User extends Entity {
  id: number
  name: string
  email: string
}

const userRepo = new BaseRepository<User>('/users')

const users = await userRepo.findAll()
const user = await userRepo.findById(1)
await userRepo.create({ name: 'John', email: 'john@example.com' })

// 4. Type-safe Event Emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners: {
    [E in keyof Events]?: Array<(payload: Events[E]) => void>
  } = {}

  on<E extends keyof Events>(
    event: E,
    listener: (payload: Events[E]) => void
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(listener)
  }

  emit<E extends keyof Events>(event: E, payload: Events[E]): void {
    this.listeners[event]?.forEach(listener => listener(payload))
  }

  off<E extends keyof Events>(
    event: E,
    listener: (payload: Events[E]) => void
  ): void {
    const listeners = this.listeners[event]
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }
}

// Определяем типы событий
interface AppEvents {
  userLoggedIn: { userId: number; username: string }
  dataUpdated: { timestamp: number }
  error: { message: string; code: number }
}

const emitter = new TypedEventEmitter<AppEvents>()

// TypeScript проверяет типы!
emitter.on('userLoggedIn', ({ userId, username }) => {
  console.log(\`User \${username} logged in with ID \${userId}\`)
})

emitter.emit('userLoggedIn', { userId: 1, username: 'john' })
// emitter.emit('userLoggedIn', { userId: '1' })  // ❌ Error

// 5. Generic Form Handler
interface FormField<T = any> {
  value: T
  error: string | null
  touched: boolean
}

type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>
}

type ValidationRules<T extends Record<string, any>> = {
  [K in keyof T]?: (value: T[K]) => string | null
}

class Form<T extends Record<string, any>> {
  private state: FormState<T>

  constructor(
    initialValues: T,
    private validationRules?: ValidationRules<T>
  ) {
    this.state = {} as FormState<T>

    for (const key in initialValues) {
      this.state[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      }
    }
  }

  getValue<K extends keyof T>(field: K): T[K] {
    return this.state[field].value
  }

  setValue<K extends keyof T>(field: K, value: T[K]): void {
    this.state[field].value = value
    this.validate(field)
  }

  validate<K extends keyof T>(field: K): void {
    const rule = this.validationRules?.[field]
    if (rule) {
      this.state[field].error = rule(this.state[field].value)
    }
  }

  validateAll(): boolean {
    let isValid = true

    for (const key in this.state) {
      this.validate(key)
      if (this.state[key].error) {
        isValid = false
      }
    }

    return isValid
  }

  getValues(): T {
    const values = {} as T

    for (const key in this.state) {
      values[key] = this.state[key].value
    }

    return values
  }
}

// Использование
interface LoginForm {
  email: string
  password: string
}

const loginForm = new Form<LoginForm>(
  { email: '', password: '' },
  {
    email: (value) => value.includes('@') ? null : 'Invalid email',
    password: (value) => value.length >= 6 ? null : 'Too short'
  }
)

loginForm.setValue('email', 'test@example.com')
loginForm.setValue('password', '123456')

if (loginForm.validateAll()) {
  const values = loginForm.getValues()
  console.log('Form is valid:', values)
}

// 6. Generic State Machine
type States<S extends string> = {
  [K in S]: {
    on: {
      [E: string]: S
    }
  }
}

class StateMachine<S extends string, St extends States<S>> {
  private currentState: S

  constructor(
    initialState: S,
    private states: St
  ) {
    this.currentState = initialState
  }

  getState(): S {
    return this.currentState
  }

  transition(event: string): boolean {
    const state = this.states[this.currentState]
    const nextState = state.on[event]

    if (nextState) {
      this.currentState = nextState as S
      return true
    }

    return false
  }

  can(event: string): boolean {
    const state = this.states[this.currentState]
    return event in state.on
  }
}

// Использование
type TrafficLightState = 'red' | 'yellow' | 'green'

const trafficLight = new StateMachine<
  TrafficLightState,
  States<TrafficLightState>
>(
  'red',
  {
    red: {
      on: {
        NEXT: 'green'
      }
    },
    yellow: {
      on: {
        NEXT: 'red'
      }
    },
    green: {
      on: {
        NEXT: 'yellow'
      }
    }
  }
)

console.log(trafficLight.getState())  // 'red'
trafficLight.transition('NEXT')
console.log(trafficLight.getState())  // 'green'

// 7. Generic Query Builder
class QueryBuilder<T> {
  private query: string = ''
  private params: any[] = []

  select(...fields: Array<keyof T>): this {
    this.query += \`SELECT \${fields.join(', ')} \`
    return this
  }

  where<K extends keyof T>(field: K, operator: string, value: T[K]): this {
    this.query += \`WHERE \${String(field)} \${operator} ? \`
    this.params.push(value)
    return this
  }

  orderBy<K extends keyof T>(field: K, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.query += \`ORDER BY \${String(field)} \${direction} \`
    return this
  }

  limit(count: number): this {
    this.query += \`LIMIT \${count} \`
    return this
  }

  build(): { query: string; params: any[] } {
    return {
      query: this.query.trim(),
      params: this.params
    }
  }
}

// Использование
interface User {
  id: number
  name: string
  email: string
  age: number
}

const query = new QueryBuilder<User>()
  .select('id', 'name', 'email')
  .where('age', '>', 18)
  .orderBy('name', 'ASC')
  .limit(10)
  .build()

console.log(query)
// {
//   query: "SELECT id, name, email WHERE age > ? ORDER BY name ASC LIMIT 10",
//   params: [18]
// }

// 8. Generic Validation Schema
type ValidationResult<T> = {
  isValid: boolean
  errors: Partial<Record<keyof T, string>>
  data: T | null
}

class Validator<T extends Record<string, any>> {
  private rules: Partial<Record<keyof T, Array<(value: any) => string | null>>> = {}

  addRule<K extends keyof T>(
    field: K,
    rule: (value: T[K]) => string | null
  ): this {
    if (!this.rules[field]) {
      this.rules[field] = []
    }
    this.rules[field]!.push(rule)
    return this
  }

  validate(data: T): ValidationResult<T> {
    const errors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    for (const field in this.rules) {
      const fieldRules = this.rules[field]!
      const value = data[field]

      for (const rule of fieldRules) {
        const error = rule(value)
        if (error) {
          errors[field] = error
          isValid = false
          break
        }
      }
    }

    return {
      isValid,
      errors,
      data: isValid ? data : null
    }
  }
}

// Использование
interface SignupForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const validator = new Validator<SignupForm>()
  .addRule('username', (value) =>
    value.length >= 3 ? null : 'Username must be at least 3 characters'
  )
  .addRule('email', (value) =>
    value.includes('@') ? null : 'Invalid email address'
  )
  .addRule('password', (value) =>
    value.length >= 8 ? null : 'Password must be at least 8 characters'
  )
  .addRule('password', (value) =>
    /[A-Z]/.test(value) ? null : 'Password must contain uppercase letter'
  )

const formData: SignupForm = {
  username: 'john',
  email: 'john@example.com',
  password: 'Password123',
  confirmPassword: 'Password123'
}

const result = validator.validate(formData)

if (result.isValid) {
  console.log('Form is valid!', result.data)
} else {
  console.log('Validation errors:', result.errors)
}
`

const genericsVsExplicitSnippet = `
// =====================================
// GENERICS VS ЯВНЫЕ ТИПЫ
// =====================================

// 1. Когда использовать Generics
// ✅ ХОРОШО - переиспользуемая логика
function identity<T>(value: T): T {
  return value
}

const num = identity(42)       // number
const str = identity('hello')  // string

// ❌ ПЛОХО - излишняя сложность для простого случая
function addNumbers<T extends number>(a: T, b: T): number {
  return a + b  // Зачем generic если всегда number?
}

// ✅ ЛУЧШЕ - явный тип
function addNumbers(a: number, b: number): number {
  return a + b
}

// 2. Generics для коллекций
// ✅ ХОРОШО
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

// ❌ ПЛОХО - потеря типа
function first(arr: any[]): any {
  return arr[0]
}

// 3. Когда НЕ использовать Generics
// ❌ ПЛОХО - избыточная абстракция
function getUserName<T extends { name: string }>(user: T): string {
  return user.name
}

// ✅ ЛУЧШЕ - явный интерфейс
interface HasName {
  name: string
}

function getUserName(user: HasName): string {
  return user.name
}

// 4. Generics для API ответов
// ✅ ХОРОШО - переиспользуемая структура
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

async function fetchUser(): Promise<ApiResponse<User>> {
  // ...
}

async function fetchPosts(): Promise<ApiResponse<Post[]>> {
  // ...
}

// ❌ ПЛОХО - дублирование
interface UserApiResponse {
  data: User
  status: number
  message: string
}

interface PostsApiResponse {
  data: Post[]
  status: number
  message: string
}

// 5. Generics для React компонентов
// ✅ ХОРОШО - гибкий компонент списка
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// Использование с разными типами
<List
  items={users}
  renderItem={user => <div>{user.name}</div>}
  keyExtractor={user => user.id}
/>

<List
  items={products}
  renderItem={product => <div>{product.title}</div>}
  keyExtractor={product => product.id}
/>

// 6. Когда явные типы лучше
// ✅ ХОРОШО - специфичный случай
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'small' | 'medium' | 'large'
  onClick: () => void
  children: React.ReactNode
}

// ❌ ПЛОХО - излишняя гибкость
interface ButtonProps<V, S> {
  variant: V
  size: S
  onClick: () => void
  children: React.ReactNode
}

// 7. Generics для типизации HOC
// ✅ ХОРОШО
function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { isLoading: boolean }> {
  return (props) => {
    if (props.isLoading) {
      return <div>Loading...</div>
    }
    return <Component {...props as P} />
  }
}

// 8. Баланс между гибкостью и простотой
// ❌ СЛИШКОМ ГИБКО - сложно понять
function process<
  T extends Record<string, any>,
  K extends keyof T,
  R extends T[K]
>(
  obj: T,
  key: K,
  transform: (value: T[K]) => R
): R {
  return transform(obj[key])
}

// ✅ ДОСТАТОЧНО ГИБКО - легко понять
function transformProperty<T, R>(
  obj: T,
  key: keyof T,
  transform: (value: T[keyof T]) => R
): R {
  return transform(obj[key])
}

// 9. Когда использовать default типы
// ✅ ХОРОШО - разумный дефолт
interface Container<T = string> {
  value: T
}

const stringContainer: Container = { value: 'hello' }  // Container<string>
const numberContainer: Container<number> = { value: 42 }

// 10. Правило: "Используй Generic когда тип передается через функцию"
// ✅ ПРАВИЛЬНО - тип "течет" через функцию
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

const numbers = [1, 2, 3]
const strings = map(numbers, n => String(n))  // string[]

// ❌ НЕПРАВИЛЬНО - тип не используется
function logMessage<T>(message: string): void {
  console.log(message)  // T нигде не используется
}

// ✅ ЛУЧШЕ
function logMessage(message: string): void {
  console.log(message)
}
`

const bestPracticesSnippet = `
// =====================================
// ЛУЧШИЕ ПРАКТИКИ
// =====================================

// 1. Именование Generic параметров
// ❌ ПЛОХО - непонятные имена
function process<X, Y, Z>(a: X, b: Y): Z {
  // ...
}

// ✅ ХОРОШО - описательные имена
function transform<TInput, TOutput>(input: TInput): TOutput {
  // ...
}

// Общепринятые соглашения:
// T - Type (основной тип)
// K - Key (ключ)
// V - Value (значение)
// E - Element (элемент)
// R - Result (результат)
// P - Props (свойства React)
// S - State (состояние React)

// 2. Ограничения типов - используйте extends
// ❌ ПЛОХО - слишком общее
function getLength<T>(item: T): number {
  return item.length  // ❌ Error - T может не иметь length
}

// ✅ ХОРОШО - с ограничением
function getLength<T extends { length: number }>(item: T): number {
  return item.length  // ✅ OK
}

// 3. Избегайте чрезмерной вложенности Generics
// ❌ ПЛОХО - слишком сложно
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P]
}

// ✅ ЛУЧШЕ - разбить на части
type PartialArray<T> = Array<DeepPartial<T>>
type PartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }

type DeepPartial<T> = T extends Array<infer U>
  ? PartialArray<U>
  : T extends object
  ? PartialObject<T>
  : T

// 4. Используйте infer для извлечения типов
// ✅ ХОРОШО
type UnwrapArray<T> = T extends Array<infer U> ? U : T

type StringArray = UnwrapArray<string[]>  // string
type NumberType = UnwrapArray<number>     // number

// 5. Предпочитайте extends вместо условных проверок
// ❌ ПЛОХО
function process<T>(value: T): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())  // Приходится проверять в runtime
  }
}

// ✅ ЛУЧШЕ
function processString<T extends string>(value: T): void {
  console.log(value.toUpperCase())  // TypeScript знает что это string
}

// 6. Используйте Utility Types вместо создания своих
// ❌ ПЛОХО - переизобретение колеса
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// ✅ ХОРОШО - используем встроенный
type UserPartial = Partial<User>

// 7. Документируйте сложные Generic типы
/**
 * Создает тип с обязательными полями из T
 * @template T - Исходный тип
 * @template K - Ключи, которые должны быть обязательными
 * @example
 * type User = { id?: number, name?: string }
 * type RequiredUser = RequiredKeys<User, 'id'>
 * // { id: number, name?: string }
 */
type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

// 8. Используйте const assertions с Generics
// ✅ ХОРОШО
function createEnum<T extends readonly string[]>(values: T): T {
  return values
}

const Statuses = createEnum(['active', 'inactive', 'pending'] as const)
type Status = typeof Statuses[number]  // 'active' | 'inactive' | 'pending'

// 9. Избегайте any в Generic типах
// ❌ ПЛОХО
function process<T = any>(value: T): void {
  // ...
}

// ✅ ЛУЧШЕ
function process<T = unknown>(value: T): void {
  // ...
}

// ✅ ЕЩЕ ЛУЧШЕ - без дефолта если тип всегда нужен
function process<T>(value: T): void {
  // ...
}

// 10. Используйте Generic constraints для type safety
// ✅ ХОРОШО
function sortBy<T, K extends keyof T>(
  array: T[],
  key: K
): T[] {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return -1
    if (a[key] > b[key]) return 1
    return 0
  })
}

const sorted = sortBy(users, 'name')  // ✅ OK
// const invalid = sortBy(users, 'invalid')  // ❌ Error

// 11. Создавайте helper типы для переиспользования
type Nullable<T> = T | null
type Optional<T> = T | undefined
type Maybe<T> = T | null | undefined

type AsyncResult<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// 12. Используйте Generic constraints для валидации
interface Identifiable {
  id: string | number
}

function findById<T extends Identifiable>(
  items: T[],
  id: T['id']
): T | undefined {
  return items.find(item => item.id === id)
}

// 13. Предпочитайте композицию сложным Generic типам
// ❌ ПЛОХО - монолитный тип
type ComplexType<T, K extends keyof T, V extends T[K]> = {
  // Очень сложная логика
}

// ✅ ЛУЧШЕ - композиция простых типов
type PickByValue<T, V> = Pick<T, {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]>

type FilterByType<T, U> = PickByValue<T, U>

// 14. Используйте distributive conditional types правильно
// ✅ ХОРОШО - распределяется по union
type ToArray<T> = T extends any ? T[] : never

type Result = ToArray<string | number>  // string[] | number[]

// Если не нужно распределение, используйте [T]
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never

type Result2 = ToArrayNonDistributive<string | number>  // (string | number)[]

// 15. Тестируйте Generic типы
// Используйте специальные типы для проверки
type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false

// Тесты
type Test1 = Expect<Equal<
  ReturnType<typeof identity>,
  <T>(value: T) => T
>>

type Test2 = Expect<Equal<
  FilterByType<{ a: string; b: number }, number>,
  { b: number }
>>
`

const highlightedGenericsBasics = ref('')
const highlightedExtendsKeyword = ref('')
const highlightedKeyofOperator = ref('')
const highlightedPracticalExamples = ref('')
const highlightedGenericsVsExplicit = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedGenericsBasics.value = Prism.highlight(genericsBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedExtendsKeyword.value = Prism.highlight(extendsKeywordSnippet, Prism.languages.typescript, 'typescript')
  highlightedKeyofOperator.value = Prism.highlight(keyofOperatorSnippet, Prism.languages.typescript, 'typescript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.typescript, 'typescript')
  highlightedGenericsVsExplicit.value = Prism.highlight(genericsVsExplicitSnippet, Prism.languages.typescript, 'typescript')
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
              Generics в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Generics (обобщения)</b> — это мощная функция TypeScript, позволяющая создавать переиспользуемые
              компоненты, которые работают с различными типами данных, сохраняя при этом type safety. Generics
              позволяют писать функции, классы и интерфейсы, которые работают с типами как с параметрами.
            </p>

            <!-- Ключевые концепции -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые концепции</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-code-tags</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Generics</h3>
                  <p class="text-body-2">Параметры типов для создания переиспользуемого кода</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-arrow-expand-right</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Extends</h3>
                  <p class="text-body-2">Ограничения типов и условная логика</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-key</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Keyof</h3>
                  <p class="text-body-2">Получение ключей типа для type-safe операций</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Основы Generics -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы Generics</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Зачем Generics?</strong> Без generics пришлось бы дублировать код для каждого типа
              или использовать any, теряя type safety.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericsBasics"></code></pre>

            <!-- Extends -->
            <h2 class="text-h5 font-weight-bold mb-3">Extends — ограничения и условные типы</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Extends</strong> — ключевое слово для ограничения типов и создания условной типовой логики.
              Два основных применения: constraints (ограничения) и conditional types (условные типы).
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedExtendsKeyword"></code></pre>

            <!-- Keyof -->
            <h2 class="text-h5 font-weight-bold mb-3">Keyof — безопасная работа с ключами</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-key</v-icon>
              <strong>Keyof</strong> — оператор, возвращающий union всех ключей типа. Обеспечивает
              type-safe доступ к свойствам объектов.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedKeyofOperator"></code></pre>

            <!-- Сравнение возможностей -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение Extends и Keyof</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Возможность</th>
                <th class="text-left font-weight-bold">Extends</th>
                <th class="text-left font-weight-bold">Keyof</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Основное назначение</b></td>
                <td>Ограничение типов, условная логика</td>
                <td>Получение ключей типа</td>
              </tr>
              <tr>
                <td><b>Применение</b></td>
                <td>Constraints, conditional types</td>
                <td>Type-safe доступ к свойствам</td>
              </tr>
              <tr>
                <td><b>Результат</b></td>
                <td>Новый тип или boolean</td>
                <td>Union литеральных типов</td>
              </tr>
              <tr>
                <td><b>С generics</b></td>
                <td><code>&lt;T extends U&gt;</code></td>
                <td><code>&lt;K extends keyof T&gt;</code></td>
              </tr>
              <tr>
                <td><b>Комбинация</b></td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Пример</b></td>
                <td><code>T extends string ? X : Y</code></td>
                <td><code>keyof User</code> → 'id' | 'name'</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Generics vs Явные типы -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Generics, а когда явные типы?</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-code-tags</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте Generics</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Переиспользуемые функции/классы</li>
                    <li>Тип "течет" через функцию</li>
                    <li>Работа с коллекциями</li>
                    <li>API клиенты и обертки</li>
                    <li>HOC и utility функции</li>
                    <li>Типизация библиотек</li>
                    <li>State management</li>
                    <li>Форм билдеры и валидаторы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-file-document</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте явные типы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Специфичная бизнес-логика</li>
                    <li>Простые функции</li>
                    <li>UI компоненты с фиксированными props</li>
                    <li>Конфигурационные объекты</li>
                    <li>Доменные модели</li>
                    <li>Константы и enum</li>
                    <li>Единичные use-case</li>
                    <li>Когда generic усложняет код</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGenericsVsExplicit"></code></pre>

            <!-- Решающие факторы -->
            <h2 class="text-h5 font-weight-bold mb-3">Критерии выбора подхода</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">Generics</th>
                <th class="text-left font-weight-bold">Явные типы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Переиспользование</b></td>
                <td class="text-success">✅ Отлично</td>
                <td class="text-warning">⚠️ Дублирование</td>
              </tr>
              <tr>
                <td><b>Читаемость</b></td>
                <td class="text-warning">⚠️ Может быть сложно</td>
                <td class="text-success">✅ Понятно</td>
              </tr>
              <tr>
                <td><b>Type Safety</b></td>
                <td class="text-success">✅ Максимальная</td>
                <td class="text-success">✅ Хорошая</td>
              </tr>
              <tr>
                <td><b>Гибкость</b></td>
                <td class="text-success">✅ Высокая</td>
                <td class="text-warning">⚠️ Ограничена</td>
              </tr>
              <tr>
                <td><b>Простота отладки</b></td>
                <td class="text-warning">⚠️ Сложнее</td>
                <td class="text-success">✅ Проще</td>
              </tr>
              <tr>
                <td><b>Документация</b></td>
                <td class="text-warning">⚠️ Требует больше</td>
                <td class="text-success">✅ Самодокументируется</td>
              </tr>
              <tr>
                <td><b>Производительность компиляции</b></td>
                <td class="text-warning">⚠️ Медленнее</td>
                <td class="text-success">✅ Быстрее</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <!-- Частые ошибки -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки при работе с Generics</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">❌ Избегать</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Излишняя абстракция</li>
                    <li>Generic там где не нужен</li>
                    <li>Непонятные имена (X, Y, Z)</li>
                    <li>Отсутствие constraints</li>
                    <li>Чрезмерная вложенность</li>
                    <li>Игнорирование Utility Types</li>
                    <li>any в generics</li>
                    <li>Недокументированные сложные типы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">✅ Делать</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Осмысленные имена типов</li>
                    <li>Использовать extends для ограничений</li>
                    <li>Документировать сложные типы</li>
                    <li>Тестировать generic типы</li>
                    <li>Предпочитать композицию</li>
                    <li>Использовать Utility Types</li>
                    <li>Держать типы простыми</li>
                    <li>Следовать принципу DRY</li>
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
                  Generics — это параметры типов, позволяющие создавать переиспользуемый код, работающий с
                  различными типами данных при сохранении type safety. Они решают проблему дублирования кода
                  для разных типов и избавляют от необходимости использовать any.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между &lt;T extends U&gt; и &lt;T, U&gt;?</p>
                <p class="font-weight-regular ma-0">
                  <code>&lt;T extends U&gt;</code> — ограничение (constraint): T должен быть подтипом U.
                  <code>&lt;T, U&gt;</code> — два независимых параметра типа без ограничений. Extends
                  обеспечивает type safety, гарантируя что T имеет определенные свойства или методы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает keyof и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  <code>keyof T</code> возвращает union всех ключей типа T в виде литеральных типов.
                  Используется для type-safe доступа к свойствам объектов, создания mapped types и
                  обеспечения того, что ключи существуют в типе.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое conditional types и как они работают?</p>
                <p class="font-weight-regular ma-0">
                  Conditional types используют синтаксис <code>T extends U ? X : Y</code> для создания
                  типов с условной логикой. Если T расширяет (extends) U, результат X, иначе Y.
                  Используются для извлечения типов, фильтрации и создания utility types.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда следует использовать Generics, а когда явные типы?</p>
                <p class="font-weight-regular ma-0">
                  Generics — когда код переиспользуется с разными типами, тип "течет" через функцию,
                  создаются библиотеки/утилиты. Явные типы — для специфичной бизнес-логики, простых
                  функций, UI компонентов. Правило: если тип используется только внутри функции — явный тип проще.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать Generic React компонент?</p>
                <p class="font-weight-regular ma-0">
                  Определить интерфейс props с generic параметром: <code>interface Props&lt;T&gt;</code>,
                  использовать в компоненте: <code>function Component&lt;T&gt;(props: Props&lt;T&gt;)</code>.
                  Пример: универсальный List, Table, Form. TypeScript выведет тип автоматически при использовании.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое infer и как его использовать?</p>
                <p class="font-weight-regular ma-0">
                  <code>infer</code> используется в conditional types для извлечения типов. Синтаксис:
                  <code>T extends Array&lt;infer U&gt; ? U : never</code>. TypeScript "выводит" тип U
                  из T. Применяется для создания utility types вроде ReturnType, Parameters, Awaited.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть встроенные Generic Utility Types?</p>
                <p class="font-weight-regular ma-0">
                  Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable,
                  ReturnType, Parameters, Awaited и другие. Они решают типичные задачи трансформации типов
                  и избавляют от необходимости писать собственные утилиты.
                </p>
              </li>
            </ol>

            <!-- Принятие решения -->
            <h2 class="text-h5 font-weight-bold mb-3">Алгоритм принятия решения</h2>
            <v-alert color="info" class="mb-8">
              <v-icon class="mr-2">mdi-chart-tree</v-icon>
              <div>
                <p class="font-weight-bold mb-2">Когда писать код, спросите себя:</p>
                <ol class="pl-4 ma-0">
                  <li>Будет ли этот код использоваться с разными типами? <b>→ Generic</b></li>
                  <li>Типы известны и фиксированы? <b>→ Явный тип</b></li>
                  <li>Тип передается через функцию и используется в результате? <b>→ Generic</b></li>
                  <li>Код специфичен для одного use-case? <b>→ Явный тип</b></li>
                  <li>Создается библиотека/утилита? <b>→ Generic</b></li>
                  <li>Generic усложнит понимание? <b>→ Явный тип</b></li>
                  <li>Нужна максимальная type safety при переиспользовании? <b>→ Generic</b></li>
                </ol>
              </div>
            </v-alert>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Generics</b> — мощный инструмент TypeScript для создания переиспользуемого type-safe кода.
              <b>Extends</b> позволяет ограничивать типы и создавать условную типовую логику, <b>keyof</b> —
              безопасно работать с ключами объектов. Выбор между generics и явными типами зависит от контекста:
              generics для переиспользуемых компонентов и библиотек, явные типы для специфичной бизнес-логики.
              Ключ к успеху — найти баланс между гибкостью и простотой, избегая избыточной абстракции.
              Следуйте принципу: <b>"Используйте generics когда тип течет через код, явные типы когда структура
              данных фиксирована"</b>.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/generics.html"
                target="_blank"
                class="mr-2">
                TypeScript Generics
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/keyof-types.html"
                target="_blank"
                class="mr-2">
                Keyof Operator
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html"
                target="_blank">
                Conditional Types
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
