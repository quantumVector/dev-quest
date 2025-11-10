<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const interfaceBasicsSnippet = `
// =====================================
// INTERFACE - основы
// =====================================

// 1. Простой интерфейс
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
}

// 2. Необязательные свойства
interface Product {
  id: number
  name: string
  description?: string  // Необязательное свойство
  price?: number
}

const product1: Product = { id: 1, name: 'Laptop' }  // ✅ OK
const product2: Product = {
  id: 2,
  name: 'Phone',
  description: 'Smartphone',
  price: 999
}  // ✅ OK

// 3. Readonly свойства
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
}

// config.apiUrl = 'https://new-url.com'  // ❌ Error: Cannot assign to 'apiUrl'

// 4. Индексная сигнатура
interface Dictionary {
  [key: string]: string
}

const dict: Dictionary = {
  hello: 'привет',
  world: 'мир',
  typescript: 'тайпскрипт'
}

console.log(dict['hello'])  // 'привет'
console.log(dict.world)     // 'мир'

// 5. Методы в интерфейсах
interface Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}

// Альтернативный синтаксис для методов
interface Calculator2 {
  add: (a: number, b: number) => number
  subtract: (a: number, b: number) => number
}

// 6. Интерфейс функции
interface SearchFunc {
  (source: string, substring: string): boolean
}

const mySearch: SearchFunc = (source, substring) => {
  return source.includes(substring)
}

console.log(mySearch('hello world', 'world'))  // true
`

const interfaceExtensionSnippet = `
// =====================================
// РАСШИРЕНИЕ ИНТЕРФЕЙСОВ
// =====================================

// 1. Extends - наследование интерфейсов
interface Animal {
  name: string
  age: number
}

interface Dog extends Animal {
  breed: string
  bark(): void
}

const myDog: Dog = {
  name: 'Buddy',
  age: 3,
  breed: 'Labrador',
  bark() {
    console.log('Woof!')
  }
}

// 2. Множественное наследование
interface Flyable {
  fly(): void
  maxAltitude: number
}

interface Swimmable {
  swim(): void
  maxDepth: number
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void
}

const duck: Duck = {
  name: 'Donald',
  age: 2,
  fly() { console.log('Flying') },
  maxAltitude: 1000,
  swim() { console.log('Swimming') },
  maxDepth: 10,
  quack() { console.log('Quack!') }
}

// 3. Declaration Merging - слияние деклараций
interface Window {
  title: string
}

interface Window {
  width: number
  height: number
}

// Результат - слияние обеих деклараций
const window: Window = {
  title: 'My App',
  width: 1920,
  height: 1080
}

// 4. Augmentation - расширение существующих интерфейсов
// Полезно для расширения глобальных типов
interface Array<T> {
  myCustomMethod(): T[]
}

Array.prototype.myCustomMethod = function() {
  return this
}

const arr = [1, 2, 3]
arr.myCustomMethod()  // ✅ TypeScript знает о методе

// 5. Переопределение свойств при наследовании
interface Vehicle {
  speed: number | string
}

interface Car extends Vehicle {
  speed: number  // Сужение типа (OK)
}

// interface Bike extends Vehicle {
//   speed: boolean  // ❌ Error: не совместимый тип
// }
`

const typeBasicsSnippet = `
// =====================================
// TYPE ALIAS - основы
// =====================================

// 1. Простой тип
type UserID = number
type UserName = string

const id: UserID = 123
const name: UserName = 'John'

// 2. Объектный тип
type User = {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
}

// 3. Union Types - объединение типов
type Status = 'pending' | 'approved' | 'rejected'
type ID = number | string

const status: Status = 'pending'  // ✅ OK
// const status2: Status = 'invalid'  // ❌ Error

const userId: ID = 123      // ✅ OK
const orderId: ID = 'ORD-456'  // ✅ OK

// 4. Intersection Types - пересечение типов
type Person = {
  name: string
  age: number
}

type Employee = {
  employeeId: number
  department: string
}

type EmployeePerson = Person & Employee

const employee: EmployeePerson = {
  name: 'John',
  age: 30,
  employeeId: 12345,
  department: 'IT'
}

// 5. Tuple Types - кортежи
type Point = [number, number]
type RGB = [number, number, number]
type NamedPoint = [x: number, y: number]  // С именами (TS 4.0+)

const point: Point = [10, 20]
const color: RGB = [255, 128, 0]

// 6. Функциональные типы
type MathOperation = (a: number, b: number) => number

const add: MathOperation = (a, b) => a + b
const multiply: MathOperation = (a, b) => a * b

// 7. Литеральные типы
type Direction = 'north' | 'south' | 'east' | 'west'
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6
type Success = true

const direction: Direction = 'north'
const roll: DiceRoll = 4
const isSuccess: Success = true

// 8. Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type User = {
  id: number
  name: string
}

type ReadonlyUser = Readonly<User>

const user: ReadonlyUser = { id: 1, name: 'John' }
// user.name = 'Jane'  // ❌ Error: Cannot assign to 'name'
`

const advancedTypesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ТИПЫ
// =====================================

// 1. Conditional Types - условные типы
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false

// Практический пример
type NonNullable<T> = T extends null | undefined ? never : T

type C = NonNullable<string | null>  // string
type D = NonNullable<number | undefined>  // number

// 2. Template Literal Types
type EventName = 'click' | 'scroll' | 'mousemove'
type EventHandler = \`on\${Capitalize<EventName>}\`

// Результат: 'onClick' | 'onScroll' | 'onMousemove'

type CSSValue = number | string
type CSSProperty = 'width' | 'height' | 'margin'
type CSSStyle = \`\${CSSProperty}:\${CSSValue}\`

// 3. Utility Types - встроенные вспомогательные типы

// Partial - все свойства необязательные
type User = {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// Результат: { id?: number, name?: string, email?: string }

const updateUser = (user: User, updates: PartialUser): User => {
  return { ...user, ...updates }
}

// Required - все свойства обязательные
type OptionalUser = {
  id?: number
  name?: string
}

type RequiredUser = Required<OptionalUser>
// Результат: { id: number, name: string }

// Pick - выбрать определенные свойства
type UserPreview = Pick<User, 'id' | 'name'>
// Результат: { id: number, name: string }

// Omit - исключить определенные свойства
type UserWithoutEmail = Omit<User, 'email'>
// Результат: { id: number, name: string }

// Record - создать объект с ключами и значениями
type Roles = 'admin' | 'user' | 'guest'
type RolePermissions = Record<Roles, string[]>

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
}

// 4. infer - вывод типов в условных типах
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Func = () => string
type R = ReturnType<Func>  // string

type ArrayElement<T> = T extends (infer E)[] ? E : never

type E = ArrayElement<number[]>  // number

// 5. Recursive Types - рекурсивные типы
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

const json: JSONValue = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'New York',
    zip: 10001
  }
}

// Рекурсивный тип для вложенных объектов
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

type NestedUser = {
  name: string
  profile: {
    age: number
    address: {
      city: string
    }
  }
}

type ReadonlyNestedUser = DeepReadonly<NestedUser>
// Все вложенные объекты тоже readonly
`

const interfaceVsTypeSnippet = `
// =====================================
// INTERFACE VS TYPE - РАЗЛИЧИЯ
// =====================================

// 1. Declaration Merging - только Interface
interface User {
  name: string
}

interface User {
  age: number
}

// Результат: User имеет оба свойства
const user: User = {
  name: 'John',
  age: 30
}

// Type не поддерживает слияние
// type Person = { name: string }
// type Person = { age: number }  // ❌ Error: Duplicate identifier

// 2. Extends vs Intersection

// Interface extends
interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

// Type intersection
type Animal2 = {
  name: string
}

type Dog2 = Animal2 & {
  breed: string
}

// Оба подхода работают похоже

// 3. Union Types - только Type
type Status = 'active' | 'inactive' | 'pending'

// Interface не может представлять union напрямую
// interface Status = 'active' | 'inactive'  // ❌ Error

// 4. Primitive Types - только Type
type ID = number | string
type Name = string

// Interface работает только с объектами
// interface ID = number | string  // ❌ Error

// 5. Computed Properties

// Interface с computed property (ограниченно)
const PROP_NAME = 'dynamicProp'

interface WithComputed {
  [PROP_NAME]: string  // ✅ OK, но ограничено
}

// Type с computed property
type WithComputedType = {
  [PROP_NAME]: string  // ✅ OK
}

// 6. Tuple Types - удобнее в Type
type Point = [number, number]

// Interface для tuple (менее удобно)
interface PointInterface {
  0: number
  1: number
  length: 2
}

// 7. Conditional Types - только Type
type NonNullable<T> = T extends null | undefined ? never : T

// Interface не поддерживает условную логику
// interface NonNullable<T> = ...  // ❌ Error

// 8. Mapped Types - только Type
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Interface не поддерживает mapped types напрямую
// interface Readonly<T> = ...  // ❌ Error

// 9. Производительность компиляции
// Interface обычно быстрее компилируются
// Type может быть медленнее при сложных операциях

// 10. Сообщения об ошибках
// Interface часто дает более понятные сообщения об ошибках
// Type может показывать развернутый тип, что иногда сложнее читать

interface UserInterface {
  id: number
  name: string
}

type UserType = {
  id: number
  name: string
}

// const user1: UserInterface = { id: 1 }
// ❌ Error: Property 'name' is missing in type

// const user2: UserType = { id: 1 }
// ❌ Error: Property 'name' is missing in type
// (может показать весь развернутый тип)
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. API Response типизация
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface User {
  id: number
  name: string
  email: string
}

const fetchUser = async (id: number): Promise<ApiResponse<User>> => {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}

// 2. Event Handling с дискриминированными union
type ButtonEvent = {
  type: 'click'
  x: number
  y: number
}

type InputEvent = {
  type: 'input'
  value: string
}

type FormEvent = {
  type: 'submit'
  formData: FormData
}

type AppEvent = ButtonEvent | InputEvent | FormEvent

const handleEvent = (event: AppEvent) => {
  switch (event.type) {
    case 'click':
      console.log(\`Clicked at \${event.x}, \${event.y}\`)
      break
    case 'input':
      console.log(\`Input value: \${event.value}\`)
      break
    case 'submit':
      console.log('Form submitted', event.formData)
      break
  }
}

// 3. Redux-style State Management
interface TodoState {
  items: Todo[]
  filter: 'all' | 'active' | 'completed'
}

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'SET_FILTER'; payload: { filter: TodoState['filter'] } }

const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: action.payload.text,
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
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter
      }
  }
}

// 4. Builder Pattern с типизацией
class QueryBuilder {
  private query: string = ''

  select(...fields: string[]): this {
    this.query += \`SELECT \${fields.join(', ')} \`
    return this
  }

  from(table: string): this {
    this.query += \`FROM \${table} \`
    return this
  }

  where(condition: string): this {
    this.query += \`WHERE \${condition} \`
    return this
  }

  build(): string {
    return this.query.trim()
  }
}

const query = new QueryBuilder()
  .select('id', 'name', 'email')
  .from('users')
  .where('age > 18')
  .build()

// 5. Generic Repository Pattern
interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
  create(item: Omit<T, 'id'>): Promise<T>
  update(id: number, item: Partial<T>): Promise<T>
  delete(id: number): Promise<void>
}

class UserRepository implements Repository<User> {
  async findAll(): Promise<User[]> {
    // Implementation
    return []
  }

  async findById(id: number): Promise<User | null> {
    // Implementation
    return null
  }

  async create(item: Omit<User, 'id'>): Promise<User> {
    // Implementation
    return { id: 1, ...item }
  }

  async update(id: number, item: Partial<User>): Promise<User> {
    // Implementation
    return { id, name: '', email: '', ...item }
  }

  async delete(id: number): Promise<void> {
    // Implementation
  }
}

// 6. React Component Props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// 7. Validation Schema
type ValidationRule<T> = (value: T) => string | null

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>[]
}

const userValidation: ValidationSchema<User> = {
  id: [(value) => value <= 0 ? 'ID must be positive' : null],
  name: [
    (value) => !value ? 'Name is required' : null,
    (value) => value.length < 3 ? 'Name too short' : null
  ],
  email: [
    (value) => !value ? 'Email is required' : null,
    (value) => !value.includes('@') ? 'Invalid email' : null
  ]
}

// 8. Type Guards
interface Cat {
  type: 'cat'
  meow(): void
}

interface Dog {
  type: 'dog'
  bark(): void
}

type Pet = Cat | Dog

// Type guard функция
const isCat = (pet: Pet): pet is Cat => {
  return pet.type === 'cat'
}

const handlePet = (pet: Pet) => {
  if (isCat(pet)) {
    pet.meow()  // TypeScript знает, что это Cat
  } else {
    pet.bark()  // TypeScript знает, что это Dog
  }
}
`

const bestPracticesSnippet = `
// =====================================
// ЛУЧШИЕ ПРАКТИКИ
// =====================================

// 1. Когда использовать Interface
// ✅ Для описания объектов и классов
interface User {
  id: number
  name: string
}

// ✅ Когда нужно расширение через declaration merging
interface Window {
  myCustomProperty: string
}

// ✅ Для публичных API (библиотеки)
export interface Config {
  apiUrl: string
  timeout: number
}

// 2. Когда использовать Type
// ✅ Для union types
type Status = 'active' | 'inactive' | 'pending'

// ✅ Для tuple types
type Point = [number, number]

// ✅ Для сложных типов с условной логикой
type NonNullable<T> = T extends null | undefined ? never : T

// ✅ Для mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 3. Именование - используйте осмысленные имена
// ❌ Плохо
type T = { n: string; a: number }

// ✅ Хорошо
interface User {
  name: string
  age: number
}

// 4. Префиксы - избегайте I/T префиксов
// ❌ Плохо (C# style)
interface IUser { }
type TStatus = 'active'

// ✅ Хорошо
interface User { }
type Status = 'active'

// 5. DRY - не повторяйтесь, используйте generics
// ❌ Плохо
interface UserResponse {
  data: User
  status: number
}

interface ProductResponse {
  data: Product
  status: number
}

// ✅ Хорошо
interface ApiResponse<T> {
  data: T
  status: number
}

type UserResponse = ApiResponse<User>
type ProductResponse = ApiResponse<Product>

// 6. Используйте Utility Types
// ❌ Плохо
interface UpdateUser {
  id?: number
  name?: string
  email?: string
}

// ✅ Хорошо
type UpdateUser = Partial<User>

// 7. Строгая типизация - избегайте any
// ❌ Плохо
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url)
  return response.json()
}

// ✅ Хорошо
interface ApiData {
  id: number
  value: string
}

const fetchData = async (url: string): Promise<ApiData> => {
  const response = await fetch(url)
  return response.json()
}

// 8. Используйте unknown вместо any когда тип неизвестен
// ❌ Плохо
const processData = (data: any) => {
  return data.value  // Небезопасно
}

// ✅ Хорошо
const processData = (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value
  }
  throw new Error('Invalid data')
}

// 9. Readonly для неизменяемых данных
// ✅ Хорошо
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

type ReadonlyUser = Readonly<User>

// 10. Дискриминированные union для state management
type LoadingState = {
  status: 'loading'
}

type SuccessState<T> = {
  status: 'success'
  data: T
}

type ErrorState = {
  status: 'error'
  error: string
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState

const handleState = <T>(state: AsyncState<T>) => {
  switch (state.status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return state.data  // TypeScript знает о data
    case 'error':
      return state.error  // TypeScript знает об error
  }
}

// 11. Избегайте глубокой вложенности
// ❌ Плохо
interface DeepNested {
  a: {
    b: {
      c: {
        d: {
          e: string
        }
      }
    }
  }
}

// ✅ Хорошо - разбейте на составные типы
interface E {
  e: string
}

interface D {
  d: E
}

interface C {
  c: D
}

interface B {
  b: C
}

interface A {
  a: B
}

// Или используйте плоскую структуру
interface Flat {
  aValue: string
  bValue: number
  cValue: boolean
}

// 12. Документируйте сложные типы
/**
 * Представляет состояние асинхронной операции
 * @template T - Тип данных при успешном выполнении
 */
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
`

const highlightedInterfaceBasics = ref('')
const highlightedInterfaceExtension = ref('')
const highlightedTypeBasics = ref('')
const highlightedAdvancedTypes = ref('')
const highlightedInterfaceVsType = ref('')
const highlightedPracticalExamples = ref('')
const highlightedBestPractices = ref('')

onMounted(() => {
  highlightedInterfaceBasics.value = Prism.highlight(interfaceBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedInterfaceExtension.value = Prism.highlight(interfaceExtensionSnippet, Prism.languages.typescript, 'typescript')
  highlightedTypeBasics.value = Prism.highlight(typeBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedTypes.value = Prism.highlight(advancedTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedInterfaceVsType.value = Prism.highlight(interfaceVsTypeSnippet, Prism.languages.typescript, 'typescript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.typescript, 'typescript')
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
              Interfaces и Types в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Interface</b> и <b>Type</b> — два основных способа описания типов в TypeScript.
              Interface используется для описания структуры объектов и контрактов, Type — более гибкий
              инструмент для создания псевдонимов типов, union, intersection и сложных типов.
              Понимание различий критично для эффективной работы с TypeScript.
            </p>

            <!-- Ключевые различия -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия: Interface vs Type</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Возможность</th>
                <th class="text-left font-weight-bold">Interface</th>
                <th class="text-left font-weight-bold">Type</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Описание объектов</b></td>
                <td class="text-success">✅ Да</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Наследование (extends)</b></td>
                <td class="text-success">✅ Да</td>
                <td class="text-warning">⚠️ Через &</td>
              </tr>
              <tr>
                <td><b>Declaration Merging</b></td>
                <td class="text-success">✅ Да</td>
                <td class="text-error">❌ Нет</td>
              </tr>
              <tr>
                <td><b>Union Types</b></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Примитивные типы</b></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Tuple Types</b></td>
                <td class="text-warning">⚠️ Сложно</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Conditional Types</b></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Mapped Types</b></td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ Да</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td class="text-success">Быстрее</td>
                <td class="text-warning">Медленнее</td>
              </tr>
              <tr>
                <td><b>Сообщения об ошибках</b></td>
                <td class="text-success">Понятнее</td>
                <td class="text-warning">Развернутые</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Interface основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Interface — основы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Interface</strong> — декларация контракта для структуры объектов. Идеален для описания
              формы данных, классов и публичных API.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterfaceBasics"></code></pre>

            <!-- Расширение интерфейсов -->
            <h2 class="text-h5 font-weight-bold mb-3">Расширение интерфейсов</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-link-variant</v-icon>
              <strong>Declaration Merging</strong> — уникальная особенность Interface. Позволяет расширять
              существующие интерфейсы, включая глобальные типы.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterfaceExtension"></code></pre>

            <!-- Type основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Type Alias — основы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Type</strong> — псевдоним для любого типа. Более мощный и гибкий инструмент, чем Interface,
              поддерживает union, intersection, conditional и mapped types.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTypeBasics"></code></pre>

            <!-- Продвинутые типы -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые возможности Type</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Conditional Types</h3>
                  <p class="text-body-2">Типы с условной логикой: <code>T extends U ? X : Y</code></p>
                  <p class="text-caption mb-0">Позволяют создавать типы, зависящие от условий</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Mapped Types</h3>
                  <p class="text-body-2">Трансформация типов: <code>[P in keyof T]: ...</code></p>
                  <p class="text-caption mb-0">Создание новых типов на основе существующих</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Template Literal Types</h3>
                  <p class="text-body-2">Типы-шаблоны: <code>\`prefix\${Type}\`</code></p>
                  <p class="text-caption mb-0">Генерация строковых литеральных типов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Utility Types</h3>
                  <p class="text-body-2">Встроенные хелперы: <code>Partial, Pick, Omit...</code></p>
                  <p class="text-caption mb-0">Готовые типы для типичных трансформаций</p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedTypes"></code></pre>

            <!-- Детальное сравнение -->
            <h2 class="text-h5 font-weight-bold mb-3">Interface vs Type — детальное сравнение</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterfaceVsType"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBestPractices"></code></pre>

            <!-- Встроенные Utility Types -->
            <h2 class="text-h5 font-weight-bold mb-3">Встроенные Utility Types</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Utility Type</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>Partial&lt;T&gt;</code></td>
                <td>Все свойства необязательные</td>
                <td><code>Partial&lt;User&gt;</code></td>
              </tr>
              <tr>
                <td><code>Required&lt;T&gt;</code></td>
                <td>Все свойства обязательные</td>
                <td><code>Required&lt;User&gt;</code></td>
              </tr>
              <tr>
                <td><code>Readonly&lt;T&gt;</code></td>
                <td>Все свойства readonly</td>
                <td><code>Readonly&lt;User&gt;</code></td>
              </tr>
              <tr>
                <td><code>Pick&lt;T, K&gt;</code></td>
                <td>Выбрать определенные свойства</td>
                <td><code>Pick&lt;User, 'id' | 'name'&gt;</code></td>
              </tr>
              <tr>
                <td><code>Omit&lt;T, K&gt;</code></td>
                <td>Исключить определенные свойства</td>
                <td><code>Omit&lt;User, 'password'&gt;</code></td>
              </tr>
              <tr>
                <td><code>Record&lt;K, T&gt;</code></td>
                <td>Объект с ключами K и значениями T</td>
                <td><code>Record&lt;string, number&gt;</code></td>
              </tr>
              <tr>
                <td><code>Exclude&lt;T, U&gt;</code></td>
                <td>Исключить типы из union</td>
                <td><code>Exclude&lt;T, null&gt;</code></td>
              </tr>
              <tr>
                <td><code>Extract&lt;T, U&gt;</code></td>
                <td>Извлечь типы из union</td>
                <td><code>Extract&lt;T, string&gt;</code></td>
              </tr>
              <tr>
                <td><code>NonNullable&lt;T&gt;</code></td>
                <td>Исключить null и undefined</td>
                <td><code>NonNullable&lt;T&gt;</code></td>
              </tr>
              <tr>
                <td><code>ReturnType&lt;T&gt;</code></td>
                <td>Тип возвращаемого значения</td>
                <td><code>ReturnType&lt;typeof fn&gt;</code></td>
              </tr>
              <tr>
                <td><code>Parameters&lt;T&gt;</code></td>
                <td>Tuple типов параметров функции</td>
                <td><code>Parameters&lt;typeof fn&gt;</code></td>
              </tr>
              <tr>
                <td><code>Awaited&lt;T&gt;</code></td>
                <td>Развернуть тип Promise</td>
                <td><code>Awaited&lt;Promise&lt;T&gt;&gt;</code></td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем основное различие между Interface и Type?</p>
                <p class="font-weight-regular ma-0">
                  Interface предназначен для описания структуры объектов и поддерживает declaration merging.
                  Type — более гибкий инструмент, поддерживает union, intersection, conditional и mapped types.
                  Type может описывать примитивы и кортежи, Interface — нет.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Declaration Merging и когда это полезно?</p>
                <p class="font-weight-regular ma-0">
                  Declaration Merging — возможность Interface объединять несколько деклараций с одинаковым именем.
                  Полезно для расширения глобальных типов (например, Window), добавления методов в существующие
                  интерфейсы библиотек, или модульного определения больших интерфейсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать Interface, а когда Type?</p>
                <p class="font-weight-regular ma-0">
                  Interface: для объектов, классов, публичных API библиотек, когда нужен extends или merging.
                  Type: для union, tuple, conditional types, mapped types, примитивов, сложных трансформаций.
                  Для простых объектов можно использовать любой вариант.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Utility Types и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Utility Types — встроенные generic типы для типичных трансформаций: Partial (все необязательные),
                  Pick (выбрать свойства), Omit (исключить свойства), Record (создать объект) и другие.
                  Упрощают работу и делают код более выразительным.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают Conditional Types?</p>
                <p class="font-weight-regular ma-0">
                  Conditional Types используют синтаксис <code>T extends U ? X : Y</code> для создания типов
                  с условной логикой. С помощью <code>infer</code> можно извлекать типы из других типов.
                  Используются для создания гибких generic типов, зависящих от входных типов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Mapped Types?</p>
                <p class="font-weight-regular ma-0">
                  Mapped Types позволяют трансформировать все свойства существующего типа через синтаксис
                  <code>[P in keyof T]: ...</code>. Используются для создания производных типов, например,
                  делая все свойства readonly, optional или изменяя их типы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Type и Interface в производительности?</p>
                <p class="font-weight-regular ma-0">
                  Interface компилируются быстрее, так как TypeScript кэширует их проверки. Type, особенно
                  сложные с условиями и маппингом, могут компилироваться медленнее. На практике разница
                  заметна только в очень больших проектах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать тип на основе ключей объекта?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>keyof</code> оператор: <code>type Keys = keyof MyType</code>.
                  Для получения типа значений по ключам: <code>MyType[keyof MyType]</code>.
                  Можно комбинировать с mapped types для сложных трансформаций.
                </p>
              </li>
            </ol>

            <!-- Когда использовать что -->
            <h2 class="text-h5 font-weight-bold mb-3">Принятие решения: Interface или Type?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-file-document-outline</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте Interface</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Описание структуры объектов</li>
                    <li>Описание классов и их контрактов</li>
                    <li>Публичные API библиотек</li>
                    <li>Когда нужен extends</li>
                    <li>Когда нужно declaration merging</li>
                    <li>Расширение глобальных типов</li>
                    <li>React компоненты Props</li>
                    <li>Когда важна производительность компиляции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-code-tags</v-icon>
                    <h3 class="text-h6 font-weight-bold">Используйте Type</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Union types (string | number)</li>
                    <li>Tuple types ([string, number])</li>
                    <li>Примитивные типы (type ID = number)</li>
                    <li>Conditional types (T extends U ? X : Y)</li>
                    <li>Mapped types ([P in keyof T])</li>
                    <li>Template literal types</li>
                    <li>Сложные трансформации типов</li>
                    <li>Когда нужна максимальная гибкость</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Распространенные ошибки -->
            <h2 class="text-h5 font-weight-bold mb-3">Распространенные ошибки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-error">
                  <v-icon size="large" color="white" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Использование I/T префиксов</li>
                    <li>Дублирование типов</li>
                    <li>Глубокая вложенность</li>
                    <li>Использование any</li>
                    <li>Игнорирование Utility Types</li>
                    <li>Неосмысленные имена типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="large" color="white" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Осмысленные имена</li>
                    <li>Использование generics</li>
                    <li>DRY принцип для типов</li>
                    <li>Utility Types где возможно</li>
                    <li>Строгая типизация</li>
                    <li>Документирование сложных типов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="large" color="white" class="mb-2">mdi-lightbulb-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4 text-white">
                    <li>Используйте unknown вместо any</li>
                    <li>Readonly для неизменяемых данных</li>
                    <li>Type guards для проверок</li>
                    <li>Discriminated unions для state</li>
                    <li>Изучайте advanced types</li>
                    <li>Читайте исходники библиотек</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Interface</b> и <b>Type</b> — два мощных инструмента TypeScript для описания типов.
              <b>Interface</b> идеален для объектов, классов, публичных API и когда нужны extends или declaration merging.
              <b>Type</b> более гибкий: поддерживает union, tuple, conditional и mapped types, подходит для
              сложных трансформаций и примитивов. В современном TypeScript часто используются оба подхода:
              Interface для структур данных, Type для сложной типовой логики. Ключ к мастерству — понимание
              сильных сторон каждого подхода и применение правильного инструмента для конкретной задачи.
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
                href="https://www.typescriptlang.org/docs/handbook/2/objects.html"
                target="_blank"
                class="mr-2">
                Object Types
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/utility-types.html"
                target="_blank">
                Utility Types
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
