<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'

const mappedTypesBasicsSnippet = `
// =====================================
// MAPPED TYPES - основы
// =====================================

// 1. Базовый синтаксис Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface User {
  id: number
  name: string
  email: string
}

type ReadonlyUser = Readonly<User>
// Результат:
// {
//   readonly id: number
//   readonly name: string
//   readonly email: string
// }

const user: ReadonlyUser = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
}

// user.name = 'Jane'  // ❌ Error: Cannot assign to 'name' because it is a read-only property

// 2. Разбор синтаксиса: [P in keyof T]
// [P in keyof T] - итерация по всем ключам типа T
// P - переменная, представляющая каждый ключ
// keyof T - получение всех ключей типа T
// T[P] - получение типа значения по ключу P

// 3. Optional - все свойства необязательные
type Optional<T> = {
  [P in keyof T]?: T[P]
}

type OptionalUser = Optional<User>
// Результат:
// {
//   id?: number
//   name?: string
//   email?: string
// }

const partialUser: OptionalUser = {
  name: 'John'  // ✅ OK - остальные свойства необязательны
}

// 4. Nullable - все свойства могут быть null
type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

type NullableUser = Nullable<User>
// Результат:
// {
//   id: number | null
//   name: string | null
//   email: string | null
// }

const userWithNulls: NullableUser = {
  id: 1,
  name: null,  // ✅ OK
  email: 'john@example.com'
}

// 5. Mutable - убрать readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

type ReadonlyData = {
  readonly id: number
  readonly value: string
}

type MutableData = Mutable<ReadonlyData>
// Результат:
// {
//   id: number
//   value: string
// }

const data: MutableData = { id: 1, value: 'test' }
data.id = 2  // ✅ OK - readonly убран

// 6. Required - убрать optional (?)
type Required<T> = {
  [P in keyof T]-?: T[P]
}

type OptionalData = {
  id?: number
  name?: string
}

type RequiredData = Required<OptionalData>
// Результат:
// {
//   id: number
//   name: string
// }

const requiredData: RequiredData = {
  id: 1,
  name: 'John'  // ✅ Оба свойства обязательны
}
`

const customPickOmitSnippet = `
// =====================================
// РЕАЛИЗАЦИЯ СОБСТВЕННЫХ PICK И OMIT
// =====================================

// 1. Реализация Pick - выбрать определенные свойства
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Пошаговое объяснение:
// 1. T - исходный тип
// 2. K extends keyof T - K должен быть подмножеством ключей T
// 3. [P in K] - итерация только по выбранным ключам K
// 4. T[P] - получение типа значения по ключу P

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
}

// Использование MyPick
type ProductPreview = MyPick<Product, 'id' | 'name' | 'price'>
// Результат:
// {
//   id: number
//   name: string
//   price: number
// }

const preview: ProductPreview = {
  id: 1,
  name: 'Laptop',
  price: 999
  // description и category не нужны
}

// 2. Реализация Omit - исключить определенные свойства
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

// Пошаговое объяснение:
// 1. Exclude<keyof T, K> - исключить K из всех ключей T
// 2. [P in ...] - итерация по оставшимся ключам
// 3. T[P] - получение типа значения

// Альтернативная реализация через Pick
type MyOmit2<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>

// Использование MyOmit
type ProductWithoutDescription = MyOmit<Product, 'description'>
// Результат:
// {
//   id: number
//   name: string
//   price: number
//   category: string
// }

const product: ProductWithoutDescription = {
  id: 1,
  name: 'Phone',
  price: 599,
  category: 'Electronics'
  // description исключен
}

// Можно исключить несколько свойств
type ProductBasic = MyOmit<Product, 'description' | 'category'>
// Результат:
// {
//   id: number
//   name: string
//   price: number
// }

// 3. Сравнение с встроенными типами
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

// Встроенный Pick
type UserPublic1 = Pick<User, 'id' | 'name' | 'email'>

// Наш MyPick
type UserPublic2 = MyPick<User, 'id' | 'name' | 'email'>

// Встроенный Omit
type UserSafe1 = Omit<User, 'password'>

// Наш MyOmit
type UserSafe2 = MyOmit<User, 'password'>

// Все эти типы эквивалентны!

// 4. Pick с вложенными типами
type DeepPick<T, K extends keyof T> = {
  [P in K]: T[P] extends object
    ? DeepPick<T[P], keyof T[P]>
    : T[P]
}

interface Company {
  id: number
  name: string
  address: {
    street: string
    city: string
    country: string
  }
  employees: number
}

type CompanyBasic = MyPick<Company, 'id' | 'name' | 'address'>
// address остается полным объектом

// 5. Практический пример - API Response типы
interface ApiUser {
  id: number
  username: string
  email: string
  password: string  // Не должен быть в ответе!
  createdAt: string
  updatedAt: string
}

// Тип для ответа API (без пароля)
type UserResponse = MyOmit<ApiUser, 'password'>

// Тип для создания пользователя (без id, timestamps)
type CreateUserDto = MyOmit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>

// Тип для обновления пользователя (все необязательно, без id)
type UpdateUserDto = Partial<MyOmit<ApiUser, 'id' | 'password'>>

const newUser: CreateUserDto = {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'secret123'
}

const updateData: UpdateUserDto = {
  email: 'newemail@example.com'  // Только то, что нужно обновить
}
`

const advancedMappedTypesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ MAPPED TYPES
// =====================================

// 1. Prefix - добавить префикс ко всем ключам
type Prefix<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K]
}

interface Config {
  host: string
  port: number
  secure: boolean
}

type DatabaseConfig = Prefix<Config, 'db_'>
// Результат:
// {
//   db_host: string
//   db_port: number
//   db_secure: boolean
// }

const dbConfig: DatabaseConfig = {
  db_host: 'localhost',
  db_port: 5432,
  db_secure: true
}

// 2. Suffix - добавить суффикс ко всем ключам
type Suffix<T, S extends string> = {
  [K in keyof T as \`\${string & K}\${S}\`]: T[K]
}

type ConfigEnv = Suffix<Config, '_ENV'>
// Результат:
// {
//   host_ENV: string
//   port_ENV: number
//   secure_ENV: boolean
// }

// 3. Getters - создать геттеры для всех свойств
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface State {
  count: number
  name: string
  active: boolean
}

type StateGetters = Getters<State>
// Результат:
// {
//   getCount: () => number
//   getName: () => string
//   getActive: () => boolean
// }

const stateGetters: StateGetters = {
  getCount: () => 42,
  getName: () => 'Test',
  getActive: () => true
}

// 4. Setters - создать сеттеры для всех свойств
type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void
}

type StateSetters = Setters<State>
// Результат:
// {
//   setCount: (value: number) => void
//   setName: (value: string) => void
//   setActive: (value: boolean) => void
// }

// 5. GettersAndSetters - комбинация геттеров и сеттеров
type GettersAndSetters<T> = Getters<T> & Setters<T>

type StateAccessors = GettersAndSetters<State>

const stateAccessors: StateAccessors = {
  getCount: () => 0,
  setCount: (value: number) => {},
  getName: () => '',
  setName: (value: string) => {},
  getActive: () => false,
  setActive: (value: boolean) => {}
}

// 6. Proxify - обернуть все значения в Proxy-подобную структуру
type Proxify<T> = {
  [P in keyof T]: {
    get(): T[P]
    set(value: T[P]): void
  }
}

type ProxifiedState = Proxify<State>
// Результат:
// {
//   count: { get(): number; set(value: number): void }
//   name: { get(): string; set(value: string): void }
//   active: { get(): boolean; set(value: boolean): void }
// }

// 7. RemoveReadonly - убрать readonly со всех свойств
type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}

type ReadonlyConfig = {
  readonly apiKey: string
  readonly timeout: number
}

type MutableConfig = RemoveReadonly<ReadonlyConfig>

const config: MutableConfig = {
  apiKey: 'key123',
  timeout: 5000
}
config.apiKey = 'newkey'  // ✅ OK

// 8. DeepReadonly - рекурсивный readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

interface NestedData {
  user: {
    profile: {
      name: string
      age: number
    }
  }
}

type ImmutableData = DeepReadonly<NestedData>
// Все вложенные объекты тоже readonly

// 9. NonNullableProperties - убрать null/undefined из всех свойств
type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

interface NullableUser {
  id: number | null
  name: string | undefined
  email: string | null | undefined
}

type DefiniteUser = NonNullableProperties<NullableUser>
// Результат:
// {
//   id: number
//   name: string
//   email: string
// }

// 10. FilterByType - выбрать только свойства определенного типа
type FilterByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

interface MixedTypes {
  id: number
  name: string
  age: number
  active: boolean
  description: string
}

type StringProperties = FilterByType<MixedTypes, string>
// Результат:
// {
//   name: string
//   description: string
// }

type NumberProperties = FilterByType<MixedTypes, number>
// Результат:
// {
//   id: number
//   age: number
// }
`

const conditionalMappedTypesSnippet = `
// =====================================
// CONDITIONAL MAPPED TYPES
// =====================================

// 1. Optionalize - сделать определенные свойства необязательными
type Optionalize<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P]
}

// Или лучше:
type Optionalize2<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>

interface FormData {
  username: string
  email: string
  age: number
  bio: string
}

// Делаем age и bio необязательными
type OptionalForm = Optionalize2<FormData, 'age' | 'bio'>
// Результат:
// {
//   username: string
//   email: string
//   age?: number
//   bio?: string
// }

const form: OptionalForm = {
  username: 'john',
  email: 'john@example.com'
  // age и bio необязательны
}

// 2. PickByValueType - выбрать свойства по типу значения
type PickByValueType<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>

interface Product {
  id: number
  name: string
  price: number
  description: string
  inStock: boolean
  quantity: number
}

type StringFields = PickByValueType<Product, string>
// Результат:
// {
//   name: string
//   description: string
// }

type NumberFields = PickByValueType<Product, number>
// Результат:
// {
//   id: number
//   price: number
//   quantity: number
// }

// 3. OmitByValueType - исключить свойства по типу значения
type OmitByValueType<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? never : K }[keyof T]
>

type NonStringFields = OmitByValueType<Product, string>
// Результат:
// {
//   id: number
//   price: number
//   inStock: boolean
//   quantity: number
// }

// 4. ConditionalPick - выбрать по условию
type ConditionalPick<T, Condition> = {
  [K in keyof T as (T[K] extends Condition ? K : never)]: T[K]
}

interface User {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
  metadata: object
}

// Только примитивы (string | number | boolean)
type Primitives = ConditionalPick<User, string | number | boolean>

// 5. FunctionProperties - только функции
type FunctionProperties<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K]
}

interface Component {
  name: string
  render(): void
  update(): void
  data: object
  destroy(): void
}

type ComponentMethods = FunctionProperties<Component>
// Результат:
// {
//   render: () => void
//   update: () => void
//   destroy: () => void
// }

// 6. PromisifyAll - обернуть все методы в Promise
type PromisifyAll<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K]
}

interface API {
  getUser(id: number): User
  updateUser(id: number, data: Partial<User>): User
  deleteUser(id: number): boolean
}

type AsyncAPI = PromisifyAll<API>
// Результат:
// {
//   getUser: (id: number) => Promise<User>
//   updateUser: (id: number, data: Partial<User>) => Promise<User>
//   deleteUser: (id: number) => Promise<boolean>
// }

// 7. DeepPartial - рекурсивный Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

interface Config {
  database: {
    host: string
    port: number
    credentials: {
      username: string
      password: string
    }
  }
  cache: {
    enabled: boolean
    ttl: number
  }
}

type PartialConfig = DeepPartial<Config>
// Все вложенные объекты тоже опциональны

const partialConfig: PartialConfig = {
  database: {
    host: 'localhost'
    // port и credentials необязательны
  }
  // cache необязателен
}

// 8. Merge - объединение типов
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never
}

interface Base {
  id: number
  created: Date
}

interface Extended {
  name: string
  updated: Date
}

type Combined = Merge<Base, Extended>
// Результат:
// {
//   id: number
//   created: Date
//   name: string
//   updated: Date
// }

// 9. Diff - различия между типами
type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>

interface Old {
  id: number
  name: string
  legacy: string
  deprecated: boolean
}

interface New {
  id: number
  name: string
  version: number
}

type RemovedFields = Diff<Old, New>
// Результат:
// {
//   legacy: string
//   deprecated: boolean
// }

// 10. UnionToIntersection - union в intersection (продвинутое)
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends
  ((k: infer I) => void) ? I : never

type A = { a: number }
type B = { b: string }
type C = { c: boolean }

type Union = A | B | C
type Intersection = UnionToIntersection<Union>
// Результат: A & B & C = { a: number; b: string; c: boolean }
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. API Response типы с трансформацией
interface DatabaseUser {
  user_id: number
  user_name: string
  user_email: string
  created_at: string
  updated_at: string
}

// Трансформация snake_case в camelCase
type CamelCase<S extends string> = S extends \`\${infer P1}_\${infer P2}\${infer P3}\`
  ? \`\${P1}\${Uppercase<P2>}\${CamelCase<P3>}\`
  : S

type CamelCaseKeys<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K]
}

type ApiUser = CamelCaseKeys<DatabaseUser>
// Результат:
// {
//   userId: number
//   userName: string
//   userEmail: string
//   createdAt: string
//   updatedAt: string
// }

// 2. Form State Management
interface FormField<T> {
  value: T
  error: string | null
  touched: boolean
  dirty: boolean
}

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>
}

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

type LoginFormState = FormState<LoginForm>
// Результат:
// {
//   email: FormField<string>
//   password: FormField<string>
//   rememberMe: FormField<boolean>
// }

const loginState: LoginFormState = {
  email: {
    value: '',
    error: null,
    touched: false,
    dirty: false
  },
  password: {
    value: '',
    error: 'Password is required',
    touched: true,
    dirty: true
  },
  rememberMe: {
    value: false,
    error: null,
    touched: false,
    dirty: false
  }
}

// 3. Redux-style Actions
type ActionCreator<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (
    payload: T[K]
  ) => {
    type: \`SET_\${Uppercase<string & K>}\`
    payload: T[K]
  }
}

interface AppState {
  user: User | null
  loading: boolean
  error: string | null
}

type AppActions = ActionCreator<AppState>
// Результат:
// {
//   setUser: (payload: User | null) => { type: 'SET_USER', payload: User | null }
//   setLoading: (payload: boolean) => { type: 'SET_LOADING', payload: boolean }
//   setError: (payload: string | null) => { type: 'SET_ERROR', payload: string | null }
// }

// 4. Validation Schema
type ValidationRule<T> = (value: T) => string | null

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>[]
}

interface RegistrationForm {
  username: string
  email: string
  password: string
  age: number
}

const validationSchema: ValidationSchema<RegistrationForm> = {
  username: [
    (value) => !value ? 'Username is required' : null,
    (value) => value.length < 3 ? 'Too short' : null
  ],
  email: [
    (value) => !value ? 'Email is required' : null,
    (value) => !value.includes('@') ? 'Invalid email' : null
  ],
  password: [
    (value) => !value ? 'Password is required' : null,
    (value) => value.length < 8 ? 'Too short' : null
  ],
  age: [
    (value) => value < 18 ? 'Must be 18+' : null
  ]
}

// 5. Event Handlers типизация
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]?: (value: T[K]) => void
}

interface FormInputs {
  name: string
  email: string
  age: number
}

type FormHandlers = EventHandlers<FormInputs>
// Результат:
// {
//   onName?: (value: string) => void
//   onEmail?: (value: string) => void
//   onAge?: (value: number) => void
// }

const handlers: FormHandlers = {
  onName: (value) => console.log('Name:', value),
  onEmail: (value) => console.log('Email:', value),
  onAge: (value) => console.log('Age:', value)
}

// 6. React Props с вариантами
type ComponentVariant = 'primary' | 'secondary' | 'danger'
type ComponentSize = 'small' | 'medium' | 'large'

type VariantProps<V extends string, S extends string> = {
  [K in V as \`\${K}Style\`]?: React.CSSProperties
} & {
  [K in S as \`\${K}Class\`]?: string
}

type ButtonVariants = VariantProps<ComponentVariant, ComponentSize>
// Результат:
// {
//   primaryStyle?: React.CSSProperties
//   secondaryStyle?: React.CSSProperties
//   dangerStyle?: React.CSSProperties
//   smallClass?: string
//   mediumClass?: string
//   largeClass?: string
// }

// 7. Database Query Builder
type WhereClause<T> = {
  [K in keyof T as \`where\${Capitalize<string & K>}\`]?: T[K] | {
    equals?: T[K]
    not?: T[K]
    in?: T[K][]
    notIn?: T[K][]
    lt?: T[K]
    lte?: T[K]
    gt?: T[K]
    gte?: T[K]
  }
}

interface Post {
  id: number
  title: string
  published: boolean
  views: number
}

type PostQuery = WhereClause<Post>

const query: PostQuery = {
  wherePublished: true,
  whereViews: {
    gte: 100,
    lt: 1000
  },
  whereTitle: {
    in: ['First Post', 'Second Post']
  }
}

// 8. Immutable Update Helpers
type SetProperty<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (
    value: T[K] | ((prev: T[K]) => T[K])
  ) => void
}

interface Counter {
  count: number
  label: string
}

type CounterSetters = SetProperty<Counter>

const useCounter = (): [Counter, CounterSetters] => {
  const [state, setState] = useState<Counter>({
    count: 0,
    label: 'Counter'
  })

  const setters: CounterSetters = {
    setCount: (value) => {
      setState(prev => ({
        ...prev,
        count: typeof value === 'function' ? value(prev.count) : value
      }))
    },
    setLabel: (value) => {
      setState(prev => ({
        ...prev,
        label: typeof value === 'function' ? value(prev.label) : value
      }))
    }
  }

  return [state, setters]
}

// Использование
const [counter, { setCount, setLabel }] = useCounter()
setCount(prev => prev + 1)
setLabel('New Label')

// 9. API Error типизация
type ApiError<T> = {
  [K in keyof T]: {
    field: K
    message: string
    code: string
  }
}[keyof T]

interface UserForm {
  username: string
  email: string
  password: string
}

type UserFormError = ApiError<UserForm>
// Результат: union type
// | { field: 'username'; message: string; code: string }
// | { field: 'email'; message: string; code: string }
// | { field: 'password'; message: string; code: string }

const errors: UserFormError[] = [
  { field: 'username', message: 'Already taken', code: 'DUPLICATE' },
  { field: 'email', message: 'Invalid format', code: 'INVALID' }
]

// 10. Type-safe Environment Variables
interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test'
  API_URL: string
  API_KEY: string
  PORT: number
  DATABASE_URL: string
}

type EnvPrefix<T> = {
  [K in keyof T as \`REACT_APP_\${string & K}\`]: T[K]
}

type ReactEnv = EnvPrefix<EnvironmentVariables>

// Использование
declare const process: {
  env: ReactEnv
}

const apiUrl = process.env.REACT_APP_API_URL  // string
const port = process.env.REACT_APP_PORT        // number
`

const compareBuiltInSnippet = `
// =====================================
// СРАВНЕНИЕ С ВСТРОЕННЫМИ UTILITY TYPES
// =====================================

// 1. Partial - встроенный vs кастомный
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// Встроенный Partial делает то же самое
interface User {
  id: number
  name: string
}

type PartialUser1 = Partial<User>
type PartialUser2 = MyPartial<User>
// Оба эквивалентны

// 2. Required - встроенный vs кастомный
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

type RequiredUser1 = Required<Partial<User>>
type RequiredUser2 = MyRequired<Partial<User>>
// Оба эквивалентны

// 3. Readonly - встроенный vs кастомный
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type ReadonlyUser1 = Readonly<User>
type ReadonlyUser2 = MyReadonly<User>
// Оба эквивалентны

// 4. Pick - встроенный vs кастомный
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type UserPreview1 = Pick<User, 'id' | 'name'>
type UserPreview2 = MyPick<User, 'id' | 'name'>
// Оба эквивалентны

// 5. Omit - встроенный vs кастомный
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

interface FullUser {
  id: number
  name: string
  password: string
}

type SafeUser1 = Omit<FullUser, 'password'>
type SafeUser2 = MyOmit<FullUser, 'password'>
// Оба эквивалентны

// 6. Record - встроенный vs кастомный
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

type StringMap1 = Record<string, number>
type StringMap2 = MyRecord<string, number>
// Оба эквивалентны

// 7. Exclude - встроенный (не mapped type, но часто используется)
type MyExclude<T, U> = T extends U ? never : T

type Colors = 'red' | 'blue' | 'green' | 'yellow'
type PrimaryColors1 = Exclude<Colors, 'green' | 'yellow'>
type PrimaryColors2 = MyExclude<Colors, 'green' | 'yellow'>
// Оба: 'red' | 'blue'

// 8. Extract - встроенный
type MyExtract<T, U> = T extends U ? T : never

type Numbers = 1 | 2 | 3 | 'four' | 'five'
type OnlyNumbers1 = Extract<Numbers, number>
type OnlyNumbers2 = MyExtract<Numbers, number>
// Оба: 1 | 2 | 3

// 9. NonNullable - встроенный
type MyNonNullable<T> = T extends null | undefined ? never : T

type MaybeString = string | null | undefined
type DefiniteString1 = NonNullable<MaybeString>
type DefiniteString2 = MyNonNullable<MaybeString>
// Оба: string

// 10. ReturnType - встроенный (использует infer)
type MyReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never

function getUser(): User {
  return { id: 1, name: 'John' }
}

type UserType1 = ReturnType<typeof getUser>
type UserType2 = MyReturnType<typeof getUser>
// Оба: User

// 11. Parameters - встроенный
type MyParameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never

function updateUser(id: number, data: Partial<User>): void {}

type UpdateParams1 = Parameters<typeof updateUser>
type UpdateParams2 = MyParameters<typeof updateUser>
// Оба: [number, Partial<User>]

// 12. Awaited - встроенный (TypeScript 4.5+)
type MyAwaited<T> = T extends Promise<infer U> ? U : T

async function fetchUser(): Promise<User> {
  return { id: 1, name: 'John' }
}

type FetchedUser1 = Awaited<ReturnType<typeof fetchUser>>
type FetchedUser2 = MyAwaited<ReturnType<typeof fetchUser>>
// Оба: User

// 13. Производительность встроенных vs кастомных
// Встроенные типы оптимизированы компилятором TypeScript
// и компилируются быстрее, чем кастомные эквиваленты

// Рекомендация: используйте встроенные когда возможно!
type Recommended = Omit<User, 'password'>  // ✅ Хорошо
type NotRecommended = MyOmit<User, 'password'>  // ⚠️ Работает, но медленнее
`

const interviewQuestionsSnippet = `
// =====================================
// ВОПРОСЫ НА СОБЕСЕДОВАНИИ - РЕШЕНИЯ
// =====================================

// 1. Написать свой Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Тестирование
interface TestUser {
  id: number
  name: string
  email: string
  age: number
}

type UserBasic = MyPick<TestUser, 'id' | 'name'>
const user: UserBasic = {
  id: 1,
  name: 'John'
  // email и age не нужны
}

// 2. Написать свой Omit
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

// Альтернативная реализация
type MyOmit2<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>

// Тестирование
type UserWithoutAge = MyOmit<TestUser, 'age'>
const userWithoutAge: UserWithoutAge = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
  // age исключен
}

// 3. Написать DeepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

interface NestedObject {
  user: {
    profile: {
      name: string
      settings: {
        theme: string
      }
    }
  }
}

type ImmutableNested = DeepReadonly<NestedObject>
// Все уровни вложенности readonly

// 4. Написать тип, который делает опциональными только определенные поля
type Optional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>

interface Form {
  username: string
  email: string
  age: number
  bio: string
}

type FormWithOptional = Optional<Form, 'age' | 'bio'>
// username и email обязательны, age и bio опциональны

// 5. Создать тип для всех геттеров объекта
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface State {
  count: number
  name: string
}

type StateGetters = Getters<State>
// { getCount: () => number; getName: () => string }

// 6. Создать тип, который превращает методы в Promise
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K]
}

interface SyncAPI {
  getUser(id: number): User
  deleteUser(id: number): boolean
}

type AsyncAPI = Promisify<SyncAPI>
// Все методы возвращают Promise

// 7. Создать тип, который фильтрует свойства по типу
type FilterByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

interface Mixed {
  id: number
  name: string
  age: number
  active: boolean
}

type OnlyNumbers = FilterByType<Mixed, number>
// { id: number; age: number }

// 8. Создать тип для конвертации snake_case в camelCase
type SnakeToCamel<S extends string> =
  S extends \`\${infer T}_\${infer U}\`
    ? \`\${T}\${Capitalize<SnakeToCamel<U>>}\`
    : S

type CamelCaseKeys<T> = {
  [K in keyof T as SnakeToCamel<string & K>]: T[K]
}

interface SnakeCase {
  user_id: number
  user_name: string
  created_at: string
}

type CamelCased = CamelCaseKeys<SnakeCase>
// { userId: number; userName: string; createdAt: string }

// 9. Создать Merge тип
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never
}

interface A {
  a: number
  b: string
}

interface B {
  b: boolean  // Переопределяет b из A
  c: number
}

type AB = Merge<A, B>
// { a: number; b: boolean; c: number }

// 10. Создать тип который добавляет null ко всем свойствам
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

interface Data {
  id: number
  name: string
}

type NullableData = Nullable<Data>
// { id: number | null; name: string | null }

// 11. Создать тип для валидации формы
type Validator<T> = {
  [K in keyof T]: (value: T[K]) => boolean
}

interface LoginForm {
  email: string
  password: string
}

const validators: Validator<LoginForm> = {
  email: (value) => value.includes('@'),
  password: (value) => value.length >= 8
}

// 12. Создать тип который делает все функции необязательными
type OptionalMethods<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] | undefined : T[K]
}

interface Component {
  name: string
  render(): void
  update?(): void
}

type ComponentWithOptional = OptionalMethods<Component>
// { name: string; render: (() => void) | undefined; update?: () => void }
`

const highlightedMappedTypesBasics = ref('')
const highlightedCustomPickOmit = ref('')
const highlightedAdvancedMappedTypes = ref('')
const highlightedConditionalMappedTypes = ref('')
const highlightedPracticalExamples = ref('')
const highlightedCompareBuiltIn = ref('')
const highlightedInterviewQuestions = ref('')

onMounted(() => {
  highlightedMappedTypesBasics.value = Prism.highlight(mappedTypesBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedCustomPickOmit.value = Prism.highlight(customPickOmitSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdvancedMappedTypes.value = Prism.highlight(advancedMappedTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedConditionalMappedTypes.value = Prism.highlight(conditionalMappedTypesSnippet, Prism.languages.typescript, 'typescript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.typescript, 'typescript')
  highlightedCompareBuiltIn.value = Prism.highlight(compareBuiltInSnippet, Prism.languages.typescript, 'typescript')
  highlightedInterviewQuestions.value = Prism.highlight(interviewQuestionsSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Mapped Types в TypeScript: создание и трансформация типов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Mapped Types</b> — это мощный механизм TypeScript для создания новых типов путем трансформации
              существующих. Позволяют итерироваться по ключам типа и применять преобразования к каждому свойству.
              Основа всех встроенных Utility Types (Partial, Pick, Omit, Readonly и др.).
            </p>

            <!-- Синтаксис -->
            <h2 class="text-h5 font-weight-bold mb-3">Синтаксис Mapped Types</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Базовый синтаксис:</strong> <code>[P in keyof T]: T[P]</code><br>
              • <code>P in keyof T</code> — итерация по всем ключам типа T<br>
              • <code>T[P]</code> — получение типа значения по ключу P<br>
              • Можно добавлять модификаторы: <code>readonly</code>, <code>?</code>, <code>-readonly</code>, <code>-?</code>
            </v-alert>

            <!-- Основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Основы Mapped Types</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMappedTypesBasics"></code></pre>

            <!-- Кастомные Pick и Omit -->
            <h2 class="text-h5 font-weight-bold mb-3">Реализация собственных Pick и Omit</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Собеседование:</strong> Вас могут попросить написать свою реализацию Pick и Omit с нуля.
              Это покажет понимание механизма Mapped Types.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCustomPickOmit"></code></pre>

            <!-- Сравнительная таблица -->
            <h2 class="text-h5 font-weight-bold mb-3">Pick vs Omit — когда что использовать</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Pick</th>
                <th class="text-left font-weight-bold">Omit</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Нужно несколько свойств</b></td>
                <td class="text-success">✅ Проще</td>
                <td class="text-warning">⚠️ Сложнее</td>
              </tr>
              <tr>
                <td><b>Нужно исключить 1-2 свойства</b></td>
                <td class="text-warning">⚠️ Сложнее</td>
                <td class="text-success">✅ Проще</td>
              </tr>
              <tr>
                <td><b>API Response (без password)</b></td>
                <td class="text-warning">Pick 10 свойств</td>
                <td class="text-success">✅ Omit 1 свойство</td>
              </tr>
              <tr>
                <td><b>Preview (только id, name)</b></td>
                <td class="text-success">✅ Pick 2 свойства</td>
                <td class="text-warning">Omit 8 свойств</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td class="text-info">Одинаково</td>
                <td class="text-info">Одинаково</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Продвинутые техники -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые Mapped Types</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedMappedTypes"></code></pre>

            <!-- Условные Mapped Types -->
            <h2 class="text-h5 font-weight-bold mb-3">Conditional Mapped Types</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConditionalMappedTypes"></code></pre>

            <!-- Модификаторы -->
            <h2 class="text-h5 font-weight-bold mb-3">Модификаторы в Mapped Types</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Добавление модификаторов</h3>
                  <ul class="pl-4">
                    <li><code>readonly [P in keyof T]</code> — добавить readonly</li>
                    <li><code>[P in keyof T]?</code> — сделать опциональным</li>
                    <li><code>readonly [P in keyof T]?</code> — оба модификатора</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Удаление модификаторов</h3>
                  <ul class="pl-4">
                    <li><code>-readonly [P in keyof T]</code> — убрать readonly</li>
                    <li><code>[P in keyof T]-?</code> — убрать опциональность</li>
                    <li><code>-readonly [P in keyof T]-?</code> — убрать оба</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры из реальных проектов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Сравнение со встроенными -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение с встроенными Utility Types</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Используйте встроенные Utility Types когда возможно — они оптимизированы
              и компилируются быстрее. Кастомные типы нужны для специфических задач.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompareBuiltIn"></code></pre>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные задачи на собеседовании</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterviewQuestions"></code></pre>

            <!-- Частые вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Mapped Types и как они работают?</p>
                <p class="font-weight-regular ma-0">
                  Mapped Types — механизм для создания новых типов путем трансформации существующих.
                  Синтаксис <code>[P in keyof T]: T[P]</code> итерируется по всем ключам типа T и применяет
                  преобразования к каждому свойству. Основа всех Utility Types.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Напишите свою реализацию Pick</p>
                <p class="font-weight-regular ma-0">
                  <code>type MyPick&lt;T, K extends keyof T&gt; = { [P in K]: T[P] }</code><br>
                  Итерируемся только по выбранным ключам K и создаем новый тип с этими свойствами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Напишите свою реализацию Omit</p>
                <p class="font-weight-regular ma-0">
                  <code>type MyOmit&lt;T, K extends keyof T&gt; = { [P in Exclude&lt;keyof T, K&gt;]: T[P] }</code><br>
                  Используем Exclude для получения ключей без K, затем итерируемся по оставшимся.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Pick и Omit?</p>
                <p class="font-weight-regular ma-0">
                  Pick выбирает указанные свойства (whitelist), Omit исключает указанные свойства (blacklist).
                  Pick проще когда нужно несколько свойств, Omit — когда нужно исключить 1-2 свойства.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делают модификаторы -readonly и -? ?</p>
                <p class="font-weight-regular ma-0">
                  <code>-readonly</code> удаляет модификатор readonly из свойства, <code>-?</code> удаляет
                  опциональность. Без минуса модификаторы добавляются. Это позволяет делать свойства
                  изменяемыми и обязательными.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает синтаксис [K in keyof T as ...]?</p>
                <p class="font-weight-regular ma-0">
                  <code>as</code> позволяет переименовывать ключи во время маппинга. Например,
                  <code>[K in keyof T as \`get\${Capitalize&lt;K&gt;}\`]</code> добавит префикс "get" ко всем ключам.
                  Можно использовать template literal types и conditional types.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как отфильтровать свойства по типу значения?</p>
                <p class="font-weight-regular ma-0">
                  Использовать conditional type в as: <code>[K in keyof T as T[K] extends U ? K : never]</code>.
                  Если тип значения не соответствует U, ключ становится never и исключается из результата.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли сделать рекурсивный Mapped Type?</p>
                <p class="font-weight-regular ma-0">
                  Да, например DeepReadonly: <code>type DeepReadonly&lt;T&gt; = { readonly [P in keyof T]:
                  T[P] extends object ? DeepReadonly&lt;T[P]&gt; : T[P] }</code>. Рекурсивно применяет
                  readonly ко всем вложенным объектам.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать кастомные Mapped Types вместо встроенных?</p>
                <p class="font-weight-regular ma-0">
                  Когда встроенных недостаточно для задачи: нужна трансформация ключей, фильтрация по типу,
                  комбинация нескольких трансформаций, domain-specific типы (геттеры, валидаторы, API типы).
                  Для стандартных операций используйте встроенные — они быстрее.
                </p>
              </li>
            </ol>

            <!-- Паттерны использования -->
            <h2 class="text-h5 font-weight-bold mb-3">Паттерны использования Mapped Types</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Когда использовать</h3>
                  <ul class="pl-4">
                    <li>Трансформация API типов</li>
                    <li>Создание форм состояния</li>
                    <li>Генерация геттеров/сеттеров</li>
                    <li>Валидационные схемы</li>
                    <li>Event handlers типизация</li>
                    <li>Конвертация naming conventions</li>
                    <li>Создание immutable типов</li>
                    <li>Query builders типизация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Альтернативы</h3>
                  <ul class="pl-4">
                    <li><strong>Встроенные Utility Types:</strong> для стандартных операций</li>
                    <li><strong>Intersection Types:</strong> для объединения типов</li>
                    <li><strong>Conditional Types:</strong> для выбора типа по условию</li>
                    <li><strong>Template Literal Types:</strong> для работы со строками</li>
                    <li><strong>Index Signatures:</strong> для динамических ключей</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать встроенные Utility Types</li>
                    <li>Давать осмысленные имена типам</li>
                    <li>Комбинировать с conditional types</li>
                    <li>Документировать сложные типы</li>
                    <li>Тестировать типы через присвоение</li>
                    <li>Использовать as для переименования</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Переизобретения встроенных типов</li>
                    <li>Слишком сложных трансформаций</li>
                    <li>Глубокой рекурсии (медленно)</li>
                    <li>Неосмысленных имен типов</li>
                    <li>Mapped Types вместо простых типов</li>
                    <li>Игнорирования производительности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучайте исходники библиотек</li>
                    <li>Практикуйтесь на задачах</li>
                    <li>Используйте TypeScript Playground</li>
                    <li>Читайте официальную документацию</li>
                    <li>Комбинируйте с другими фичами TS</li>
                    <li>Следите за новыми версиями TS</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Производительность компиляции</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип операции</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Рекомендация</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Встроенные Utility Types</b></td>
                <td class="text-success">⚡⚡⚡ Очень быстро</td>
                <td>Используйте когда возможно</td>
              </tr>
              <tr>
                <td><b>Простые Mapped Types</b></td>
                <td class="text-success">⚡⚡ Быстро</td>
                <td>Хорошо для большинства задач</td>
              </tr>
              <tr>
                <td><b>Conditional Mapped Types</b></td>
                <td class="text-warning">⚡ Средне</td>
                <td>Используйте когда нужно</td>
              </tr>
              <tr>
                <td><b>Рекурсивные типы (1-2 уровня)</b></td>
                <td class="text-warning">⚡ Средне</td>
                <td>Допустимо</td>
              </tr>
              <tr>
                <td><b>Глубокая рекурсия (&gt;3 уровней)</b></td>
                <td class="text-error">🐌 Медленно</td>
                <td>Избегайте или оптимизируйте</td>
              </tr>
              <tr>
                <td><b>Union с Mapped Types</b></td>
                <td class="text-error">🐌 Медленно</td>
                <td>Кешируйте результат</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Mapped Types</b> — это мощнейший инструмент TypeScript для трансформации типов. Синтаксис
              <code>[P in keyof T]: T[P]</code> позволяет итерироваться по ключам и применять преобразования.
              Реализация <b>Pick</b> и <b>Omit</b> — частый вопрос на собеседованиях, показывающий понимание
              механики. <b>Pick</b> выбирает свойства (whitelist), <b>Omit</b> исключает (blacklist).
              Модификаторы <code>readonly</code>, <code>?</code>, <code>-readonly</code>, <code>-?</code> позволяют
              добавлять/удалять свойства. Продвинутые техники включают: переименование ключей через <code>as</code>,
              фильтрацию по типу, рекурсивные типы, template literal types. Встроенные Utility Types оптимизированы
              и компилируются быстрее — используйте их когда возможно. Кастомные Mapped Types нужны для
              специфических задач: генерация геттеров, валидаторов, API типов, трансформация naming conventions.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/utility-types.html"
                target="_blank"
                class="mr-2">
                Utility Types
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
