<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-javascript.js'

const classBasicsSnippet = `
// Базовый класс в TypeScript
class User {
  // Свойства с типами
  name: string
  age: number
  private email: string // private - доступно только внутри класса
  protected id: number  // protected - доступно в классе и наследниках
  readonly createdAt: Date // readonly - только чтение после инициализации

  // Конструктор
  constructor(name: string, age: number, email: string) {
    this.name = name
    this.age = age
    this.email = email
    this.id = Math.random()
    this.createdAt = new Date()
  }

  // Методы
  getEmail(): string {
    return this.email
  }

  // Геттер
  get info(): string {
    return \`\${this.name}, \${this.age} years old\`
  }

  // Сеттер
  set updateAge(newAge: number) {
    if (newAge > 0 && newAge < 150) {
      this.age = newAge
    }
  }

  // Статический метод
  static isAdult(age: number): boolean {
    return age >= 18
  }
}

const user = new User('John', 30, 'john@example.com')
console.log(user.name) // "John"
console.log(user.info) // "John, 30 years old"
user.updateAge = 31
console.log(User.isAdult(user.age)) // true
`

const shorthandSyntaxSnippet = `
// Сокращенный синтаксис конструктора
class User {
  // Свойства объявляются прямо в параметрах конструктора
  constructor(
    public name: string,
    public age: number,
    private email: string,
    protected id: number = Math.random(),
    readonly createdAt: Date = new Date()
  ) {
    // Тело конструктора может быть пустым
    // Свойства уже инициализированы автоматически
  }

  getEmail(): string {
    return this.email
  }
}

// Эквивалентно предыдущему примеру, но короче!
const user = new User('John', 30, 'john@example.com')

// Пример с дефолтными значениями и необязательными параметрами
class Product {
  constructor(
    public name: string,
    public price: number,
    public category: string = 'general', // значение по умолчанию
    public description?: string // необязательный параметр
  ) {}
}

const product1 = new Product('Laptop', 1000)
const product2 = new Product('Phone', 500, 'electronics', 'Smartphone')
`

const inheritanceSnippet = `
// Наследование и абстрактные классы
abstract class Animal {
  constructor(public name: string) {}

  // Абстрактный метод - должен быть реализован в наследниках
  abstract makeSound(): string

  // Обычный метод
  move(distance: number): void {
    console.log(\`\${this.name} moved \${distance} meters\`)
  }
}

// Нельзя создать экземпляр абстрактного класса
// const animal = new Animal('Generic') // ❌ Ошибка!

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name) // Вызов конструктора родителя
  }

  // Реализация абстрактного метода
  makeSound(): string {
    return 'Woof!'
  }

  // Переопределение метода родителя
  override move(distance: number): void {
    console.log('Running...')
    super.move(distance) // Вызов метода родителя
  }

  // Собственный метод
  fetch(): void {
    console.log(\`\${this.name} is fetching!\`)
  }
}

const dog = new Dog('Buddy', 'Golden Retriever')
console.log(dog.makeSound()) // "Woof!"
dog.move(10) // "Running..." "Buddy moved 10 meters"
dog.fetch() // "Buddy is fetching!"
`

const interfacesWithClassesSnippet = `
// Интерфейсы и классы
interface IPerson {
  name: string
  age: number
  greet(): void
}

interface IEmployee {
  employeeId: number
  department: string
  getSalary(): number
}

// Класс может реализовывать несколько интерфейсов
class Employee implements IPerson, IEmployee {
  constructor(
    public name: string,
    public age: number,
    public employeeId: number,
    public department: string,
    private salary: number
  ) {}

  greet(): void {
    console.log(\`Hello, I'm \${this.name}\`)
  }

  getSalary(): number {
    return this.salary
  }
}

// Интерфейс для конструктора класса
interface IUserConstructor {
  new (name: string, age: number): IUser
  isAdult(age: number): boolean
}

interface IUser {
  name: string
  age: number
}

// Класс, соответствующий интерфейсу конструктора
const UserClass: IUserConstructor = class implements IUser {
  constructor(public name: string, public age: number) {}

  static isAdult(age: number): boolean {
    return age >= 18
  }
}
`

const decoratorBasicsSnippet = `
// Декораторы - это функции, которые модифицируют классы, методы, свойства

// tsconfig.json должен содержать:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// Декоратор класса
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class BugReport {
  type = 'report'
  title: string

  constructor(title: string) {
    this.title = title
  }
}

// Декоратор с параметрами (фабрика декораторов)
function component(options: { selector: string; template: string }) {
  return function (constructor: Function) {
    console.log(\`Component created with selector: \${options.selector}\`)
    // Можно добавить метаданные к классу
    Object.defineProperty(constructor, 'selector', {
      value: options.selector
    })
  }
}

@component({
  selector: 'app-user',
  template: '<div>User Component</div>'
})
class UserComponent {
  name = 'User'
}
`

const methodDecoratorsSnippet = `
// Декораторы методов
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyKey} with args:\`, args)
    const result = originalMethod.apply(this, args)
    console.log(\`Result:\`, result)
    return result
  }

  return descriptor
}

function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    if (args.some(arg => arg == null)) {
      throw new Error('Arguments cannot be null or undefined')
    }
    return originalMethod.apply(this, args)
  }

  return descriptor
}

class Calculator {
  @log
  @validate
  add(a: number, b: number): number {
    return a + b
  }

  @log
  multiply(a: number, b: number): number {
    return a * b
  }
}

const calc = new Calculator()
calc.add(2, 3)
// Вывод:
// "Calling add with args: [2, 3]"
// "Result: 5"
`

const propertyAccessorDecoratorsSnippet = `
// Декораторы свойств и аксессоров
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
    configurable: false
  })
}

function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string

    const getter = function () {
      return value
    }

    const setter = function (newVal: string) {
      value = formatString.replace('%s', newVal)
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}

// Декоратор аксессора
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value
  }
}

class Person {
  @readonly
  species = 'Homo sapiens'

  @format('Name: %s')
  name!: string

  private _age: number = 0

  @configurable(false)
  get age(): number {
    return this._age
  }

  set age(value: number) {
    if (value > 0 && value < 150) {
      this._age = value
    }
  }
}

const person = new Person()
person.name = 'John' // сохранится как "Name: John"
console.log(person.name) // "Name: John"
`

const parameterDecoratorsSnippet = `
// Декораторы параметров
function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata('required', target, propertyKey) || []

  existingRequiredParameters.push(parameterIndex)

  Reflect.defineMetadata(
    'required',
    existingRequiredParameters,
    target,
    propertyKey
  )
}

function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value

  descriptor.value = function (...args: any[]) {
    const requiredParameters: number[] =
      Reflect.getOwnMetadata('required', target, propertyKey) || []

    for (const parameterIndex of requiredParameters) {
      if (args[parameterIndex] === undefined || args[parameterIndex] === null) {
        throw new Error(\`Parameter at index \${parameterIndex} is required\`)
      }
    }

    return method.apply(this, args)
  }
}

class UserService {
  @validate
  createUser(@required name: string, age: number, @required email: string) {
    return { name, age, email }
  }
}

const service = new UserService()
service.createUser('John', 30, 'john@example.com') // ✅ OK
// service.createUser(null, 30, 'john@example.com') // ❌ Error!
`

const realWorldExamplesSnippet = `
// Реальные примеры использования декораторов

// 1. Мемоизация результатов
function memoize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const cache = new Map()

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      console.log('Returning cached result')
      return cache.get(key)
    }

    const result = originalMethod.apply(this, args)
    cache.set(key, result)
    return result
  }

  return descriptor
}

class DataService {
  @memoize
  fetchData(id: number): any {
    console.log(\`Fetching data for id: \${id}\`)
    // Имитация тяжелой операции
    return { id, data: 'some data' }
  }
}

// 2. Дебаунс для методов
function debounce(delay: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value
    let timeoutId: NodeJS.Timeout

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args)
      }, delay)
    }

    return descriptor
  }
}

class SearchComponent {
  @debounce(300)
  onSearchInput(query: string): void {
    console.log(\`Searching for: \${query}\`)
    // API call
  }
}

// 3. Измерение производительности
function measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    const start = performance.now()
    const result = await originalMethod.apply(this, args)
    const end = performance.now()
    console.log(\`\${propertyKey} took \${(end - start).toFixed(2)}ms\`)
    return result
  }

  return descriptor
}

class ApiService {
  @measure
  async fetchUsers(): Promise<any[]> {
    // API call
    await new Promise(resolve => setTimeout(resolve, 100))
    return [{ id: 1, name: 'John' }]
  }
}
`

const deprecationAuthSnippet = `
// Практические декораторы: deprecation и авторизация

// Декоратор для пометки устаревших методов
function deprecated(reason?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value
    const deprecationMessage = reason
      ? \`\${propertyKey} is deprecated: \${reason}\`
      : \`\${propertyKey} is deprecated\`

    descriptor.value = function (...args: any[]) {
      console.warn(deprecationMessage)
      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}

// Декоратор для проверки авторизации
function authorize(roles: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = function (this: any, ...args: any[]) {
      // Предполагаем, что у класса есть свойство currentUser
      if (!this.currentUser) {
        throw new Error('User is not authenticated')
      }

      const hasRole = roles.some(role =>
        this.currentUser.roles.includes(role)
      )

      if (!hasRole) {
        throw new Error(\`User does not have required roles: \${roles.join(', ')}\`)
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}

class UserManager {
  currentUser = { roles: ['admin', 'user'] }

  @deprecated('Use createNewUser() instead')
  addUser(name: string) {
    console.log(\`Adding user: \${name}\`)
  }

  @authorize(['admin'])
  deleteUser(id: number) {
    console.log(\`Deleting user: \${id}\`)
  }

  @authorize(['admin', 'moderator'])
  banUser(id: number) {
    console.log(\`Banning user: \${id}\`)
  }
}
`

const metadataReflectionSnippet = `
// Метаданные и Reflection API (требует reflect-metadata)
import 'reflect-metadata'

// Ключи метаданных
const REQUIRED_METADATA_KEY = Symbol('required')
const VALIDATION_METADATA_KEY = Symbol('validation')

// Декоратор для валидации типов
function Type(type: any) {
  return Reflect.metadata('design:type', type)
}

// Декоратор для обязательных полей
function Required(target: any, propertyKey: string) {
  Reflect.defineMetadata(REQUIRED_METADATA_KEY, true, target, propertyKey)
}

// Декоратор для валидации
function Validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    // Получаем типы параметров
    const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey)

    // Получаем тип возвращаемого значения
    const returnType = Reflect.getMetadata('design:returntype', target, propertyKey)

    console.log('Parameter types:', paramTypes)
    console.log('Return type:', returnType)

    // Валидация типов параметров
    args.forEach((arg, index) => {
      const expectedType = paramTypes[index]
      if (expectedType && !(arg instanceof expectedType) && typeof arg !== expectedType.name.toLowerCase()) {
        throw new TypeError(\`Argument at index \${index} should be of type \${expectedType.name}\`)
      }
    })

    return originalMethod.apply(this, args)
  }

  return descriptor
}

class User {
  @Required
  @Type(String)
  name!: string

  @Type(Number)
  age!: number

  @Validate
  setName(name: string): void {
    this.name = name
  }
}

// Получение метаданных
const user = new User()
const isRequired = Reflect.getMetadata(REQUIRED_METADATA_KEY, user, 'name')
console.log('name is required:', isRequired) // true
`

const decoratorCompositionSnippet = `
// Композиция декораторов и порядок выполнения

function first() {
  console.log('first(): factory evaluated')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('first(): called')
  }
}

function second() {
  console.log('second(): factory evaluated')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('second(): called')
  }
}

class Example {
  @first()
  @second()
  method() {}
}

// Вывод:
// "first(): factory evaluated"
// "second(): factory evaluated"
// "second(): called"
// "first(): called"

// Правило: фабрики выполняются сверху вниз,
// декораторы применяются снизу вверх

// Практический пример композиции
function compose(...decorators: MethodDecorator[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Применяем декораторы в обратном порядке
    for (let i = decorators.length - 1; i >= 0; i--) {
      const decorator = decorators[i]
      decorator(target, propertyKey, descriptor)
    }
  }
}

class Service {
  @compose(log, validate, memoize)
  getData(id: number) {
    return { id, data: 'some data' }
  }
}
`

const decoratorPatternsSnippet = `
// Продвинутые паттерны использования декораторов

// 1. Декоратор с конфигурацией через класс
class LogConfig {
  constructor(
    public level: 'info' | 'warn' | 'error' = 'info',
    public prefix: string = ''
  ) {}
}

function configuredLog(config: LogConfig) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const message = \`\${config.prefix}\${propertyKey}(\${args.join(', ')})\`
      console[config.level](message)
      return originalMethod.apply(this, args)
    }
  }
}

class ApiClient {
  @configuredLog(new LogConfig('info', '[API] '))
  fetchData(id: number) {
    return \`Data for \${id}\`
  }
}

// 2. Декоратор для внедрения зависимостей
const DEPENDENCIES = new Map<string, any>()

function Injectable(name: string) {
  return function (constructor: Function) {
    DEPENDENCIES.set(name, new (constructor as any)())
  }
}

function Inject(dependencyName: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => DEPENDENCIES.get(dependencyName),
      enumerable: true,
      configurable: true
    })
  }
}

@Injectable('logger')
class Logger {
  log(message: string) {
    console.log(\`[LOG] \${message}\`)
  }
}

class UserService {
  @Inject('logger')
  private logger!: Logger

  createUser(name: string) {
    this.logger.log(\`Creating user: \${name}\`)
  }
}

// 3. Декоратор для кэширования с TTL
function cachedWithTTL(ttlSeconds: number) {
  const cache = new Map<string, { value: any; expiry: number }>()

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args)
      const now = Date.now()
      const cached = cache.get(key)

      if (cached && now < cached.expiry) {
        console.log('Returning cached value')
        return cached.value
      }

      const result = originalMethod.apply(this, args)
      cache.set(key, {
        value: result,
        expiry: now + ttlSeconds * 1000
      })

      return result
    }
  }
}

class DataFetcher {
  @cachedWithTTL(60) // Кэш на 60 секунд
  async fetchUserData(userId: number) {
    console.log(\`Fetching data for user \${userId}\`)
    // Имитация API запроса
    return { id: userId, name: 'John' }
  }
}
`

const highlightedClassBasics = ref('')
const highlightedShorthandSyntax = ref('')
const highlightedInheritance = ref('')
const highlightedInterfacesWithClasses = ref('')
const highlightedDecoratorBasics = ref('')
const highlightedMethodDecorators = ref('')
const highlightedPropertyAccessorDecorators = ref('')
const highlightedParameterDecorators = ref('')
const highlightedRealWorldExamples = ref('')
const highlightedDeprecationAuth = ref('')
const highlightedMetadataReflection = ref('')
const highlightedDecoratorComposition = ref('')
const highlightedDecoratorPatterns = ref('')

onMounted(() => {
  highlightedClassBasics.value = Prism.highlight(classBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedShorthandSyntax.value = Prism.highlight(shorthandSyntaxSnippet, Prism.languages.typescript, 'typescript')
  highlightedInheritance.value = Prism.highlight(inheritanceSnippet, Prism.languages.typescript, 'typescript')
  highlightedInterfacesWithClasses.value = Prism.highlight(interfacesWithClassesSnippet, Prism.languages.typescript, 'typescript')
  highlightedDecoratorBasics.value = Prism.highlight(decoratorBasicsSnippet, Prism.languages.typescript, 'typescript')
  highlightedMethodDecorators.value = Prism.highlight(methodDecoratorsSnippet, Prism.languages.typescript, 'typescript')
  highlightedPropertyAccessorDecorators.value = Prism.highlight(propertyAccessorDecoratorsSnippet, Prism.languages.typescript, 'typescript')
  highlightedParameterDecorators.value = Prism.highlight(parameterDecoratorsSnippet, Prism.languages.typescript, 'typescript')
  highlightedRealWorldExamples.value = Prism.highlight(realWorldExamplesSnippet, Prism.languages.typescript, 'typescript')
  highlightedDeprecationAuth.value = Prism.highlight(deprecationAuthSnippet, Prism.languages.typescript, 'typescript')
  highlightedMetadataReflection.value = Prism.highlight(metadataReflectionSnippet, Prism.languages.typescript, 'typescript')
  highlightedDecoratorComposition.value = Prism.highlight(decoratorCompositionSnippet, Prism.languages.typescript, 'typescript')
  highlightedDecoratorPatterns.value = Prism.highlight(decoratorPatternsSnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Classes и Decorators в TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Классы</b> в TypeScript — это синтаксический сахар над прототипным наследованием JavaScript
              с добавлением строгой типизации и модификаторов доступа. <b>Декораторы</b> — это специальные
              функции, которые позволяют аннотировать и модифицировать классы, методы, свойства и параметры
              на этапе объявления. Это мощный инструмент метапрограммирования.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Классы в TypeScript — основы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> TypeScript добавляет к классам JavaScript модификаторы доступа
              (public, private, protected), readonly, абстрактные классы и интерфейсы.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedClassBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сокращенный синтаксис конструктора</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Удобно:</strong> TypeScript позволяет объявлять и инициализировать свойства
              прямо в параметрах конструктора!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedShorthandSyntax"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Наследование и абстрактные классы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInheritance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Интерфейсы и классы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInterfacesWithClasses"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Модификаторы доступа</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-earth</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">public</h3>
                  <ul class="text-left pl-4">
                    <li><strong>По умолчанию</strong></li>
                    <li>Доступно везде</li>
                    <li>Можно вызывать извне класса</li>
                    <li>Наследуется дочерними классами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-shield-lock</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">protected</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Защищенное</strong></li>
                    <li>Доступно внутри класса</li>
                    <li>Доступно в наследниках</li>
                    <li>Недоступно извне</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-lock</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">private</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Приватное</strong></li>
                    <li>Только внутри класса</li>
                    <li>Недоступно в наследниках</li>
                    <li>Проверяется на compile-time</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Декораторы — введение</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Экспериментально:</strong> Декораторы — экспериментальная функция TypeScript.
              Требуется включить <code>experimentalDecorators: true</code> в tsconfig.json
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDecoratorBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы декораторов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип декоратора</th>
                <th class="text-left font-weight-bold">Применяется к</th>
                <th class="text-left font-weight-bold">Параметры</th>
                <th class="text-left font-weight-bold">Возвращает</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Class Decorator</b></td>
                <td>Класс</td>
                <td><code>constructor: Function</code></td>
                <td>Function | void</td>
              </tr>
              <tr>
                <td><b>Method Decorator</b></td>
                <td>Метод</td>
                <td><code>target, propertyKey, descriptor</code></td>
                <td>PropertyDescriptor | void</td>
              </tr>
              <tr>
                <td><b>Property Decorator</b></td>
                <td>Свойство</td>
                <td><code>target, propertyKey</code></td>
                <td>void</td>
              </tr>
              <tr>
                <td><b>Accessor Decorator</b></td>
                <td>Getter/Setter</td>
                <td><code>target, propertyKey, descriptor</code></td>
                <td>PropertyDescriptor | void</td>
              </tr>
              <tr>
                <td><b>Parameter Decorator</b></td>
                <td>Параметр метода</td>
                <td><code>target, propertyKey, parameterIndex</code></td>
                <td>void</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Декораторы методов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMethodDecorators"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Декораторы свойств и аксессоров</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPropertyAccessorDecorators"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Декораторы параметров</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedParameterDecorators"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реальные примеры декораторов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorldExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические декораторы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDeprecationAuth"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Метаданные и Reflection API</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Продвинуто:</strong> С библиотекой <code>reflect-metadata</code> можно работать
              с метаданными типов во время выполнения
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMetadataReflection"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Композиция и порядок выполнения декораторов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDecoratorComposition"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые паттерны декораторов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDecoratorPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение: Классы vs Функции</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-function</v-icon>
                    <h3 class="text-h6 font-weight-bold">Классы</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>✅</strong> Строгая типизация</li>
                    <li><strong>✅</strong> Наследование и полиморфизм</li>
                    <li><strong>✅</strong> Инкапсуляция (private, protected)</li>
                    <li><strong>✅</strong> Декораторы и метаданные</li>
                    <li><strong>✅</strong> IDE поддержка и автодополнение</li>
                    <li><strong>❌</strong> Больше бойлерплейта</li>
                    <li><strong>❌</strong> Сложнее композиция</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-lambda</v-icon>
                    <h3 class="text-h6 font-weight-bold">Функции</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>✅</strong> Проще и лаконичнее</li>
                    <li><strong>✅</strong> Легче композиция</li>
                    <li><strong>✅</strong> Функциональный стиль</li>
                    <li><strong>✅</strong> Меньше памяти</li>
                    <li><strong>❌</strong> Нет инкапсуляции</li>
                    <li><strong>❌</strong> Нет декораторов</li>
                    <li><strong>❌</strong> Сложнее структурировать большой код</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Использование в популярных фреймворках</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Angular</h3>
                  <ul class="pl-4">
                    <li><code>@Component()</code></li>
                    <li><code>@Injectable()</code></li>
                    <li><code>@Input()</code>, <code>@Output()</code></li>
                    <li><code>@ViewChild()</code></li>
                    <li><code>@HostListener()</code></li>
                    <li>Dependency Injection через декораторы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">NestJS</h3>
                  <ul class="pl-4">
                    <li><code>@Controller()</code></li>
                    <li><code>@Get()</code>, <code>@Post()</code></li>
                    <li><code>@Body()</code>, <code>@Param()</code></li>
                    <li><code>@UseGuards()</code></li>
                    <li><code>@UsePipes()</code></li>
                    <li>Архитектура на основе декораторов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">TypeORM / MobX</h3>
                  <ul class="pl-4">
                    <li><code>@Entity()</code>, <code>@Column()</code></li>
                    <li><code>@PrimaryKey()</code></li>
                    <li><code>@observable</code></li>
                    <li><code>@computed</code></li>
                    <li><code>@action</code></li>
                    <li>Реактивность и ORM через декораторы</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между private в TypeScript и # в JavaScript?</p>
                <p class="font-weight-regular ma-0">
                  <code>private</code> в TypeScript — это проверка на этапе компиляции, в runtime это обычное свойство.
                  <code>#privateProp</code> в JavaScript — это настоящие приватные поля, недоступные даже через
                  <code>obj['#privateProp']</code>. TypeScript также поддерживает # синтаксис.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое абстрактные классы и когда их использовать?</p>
                <p class="font-weight-regular ma-0">
                  Абстрактные классы (<code>abstract class</code>) — это базовые классы, которые нельзя
                  инстанцировать напрямую. Они содержат абстрактные методы, которые должны быть реализованы
                  в дочерних классах. Используются для определения общего интерфейса с частичной реализацией.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают декораторы под капотом?</p>
                <p class="font-weight-regular ma-0">
                  Декораторы — это функции, которые вызываются во время объявления класса/метода/свойства.
                  TypeScript компилирует их в вызовы функций с передачей целевого объекта, имени свойства
                  и дескриптора. Они выполняются один раз при загрузке модуля, а не при каждом создании экземпляра.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В каком порядке применяются множественные декораторы?</p>
                <p class="font-weight-regular ma-0">
                  Фабрики декораторов (функции, возвращающие декоратор) выполняются <b>сверху вниз</b>.
                  Сами декораторы применяются <b>снизу вверх</b>. Для <code>@first() @second() method()</code>:
                  сначала вызовутся фабрики first() и second(), затем применятся декораторы second, потом first.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать декораторы с обычным JavaScript?</p>
                <p class="font-weight-regular ma-0">
                  Да, но это требует транспиляции через Babel с плагином
                  <code>@babel/plugin-proposal-decorators</code>. В стандарте ECMAScript декораторы находятся
                  на стадии Stage 3 (почти готово к включению), но синтаксис отличается от TypeScript.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Reflect Metadata и зачем это нужно?</p>
                <p class="font-weight-regular ma-0">
                  <code>reflect-metadata</code> — полифилл для работы с метаданными типов во время выполнения.
                  Позволяет получить информацию о типах параметров, возвращаемых значениях, создавать
                  собственные метаданные. Используется в Angular, NestJS, TypeORM для dependency injection
                  и валидации.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать модификаторы доступа осознанно</li>
                    <li>Декораторы для кросс-cutting concerns</li>
                    <li>Композиция декораторов для переиспользования</li>
                    <li>Типизировать параметры декораторов</li>
                    <li>Документировать поведение декораторов</li>
                    <li>Предпочитать readonly для неизменяемых свойств</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать private везде по умолчанию</li>
                    <li>Декораторы с побочными эффектами</li>
                    <li>Слишком много уровней наследования</li>
                    <li>Модификация прототипов в декораторах</li>
                    <li>Декораторы без понимания порядка выполнения</li>
                    <li>Игнорирование производительности декораторов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте # для истинной приватности</li>
                    <li>Предпочитайте композицию наследованию</li>
                    <li>Кэшируйте результаты тяжелых операций</li>
                    <li>Тестируйте декораторы изолированно</li>
                    <li>Используйте TypeScript strict mode</li>
                    <li>Изучайте исходники фреймворков</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-speedometer</v-icon>
              <strong>Важно:</strong> Декораторы выполняются один раз при определении класса, но созданные
              ими обертки вызываются каждый раз. Это может влиять на производительность в горячих участках кода.
            </v-alert>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Оптимизации классов</h3>
                  <ul class="pl-4">
                    <li>Используйте slots для V8 оптимизаций</li>
                    <li>Избегайте динамического добавления свойств</li>
                    <li>Минимизируйте размер класса</li>
                    <li>Используйте Object.freeze() для неизменяемых данных</li>
                    <li>Предпочитайте примитивы объектам</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Оптимизации декораторов</h3>
                  <ul class="pl-4">
                    <li>Кэшируйте результаты в замыканиях</li>
                    <li>Избегайте тяжелых операций в декораторах</li>
                    <li>Используйте WeakMap для хранения метаданных</li>
                    <li>Минимизируйте количество декораторов</li>
                    <li>Профилируйте код с декораторами</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Классы в TypeScript</b> предоставляют объектно-ориентированный подход с строгой типизацией,
              модификаторами доступа и удобным синтаксисом. <b>Декораторы</b> — мощный инструмент
              метапрограммирования для аннотации и модификации классов, методов и свойств. Они позволяют
              выносить кросс-cutting concerns (логирование, валидацию, кэширование) в переиспользуемые функции,
              делая код чище и поддерживаемее. Понимание порядка выполнения, работы с метаданными и паттернов
              использования декораторов критично для работы с современными TypeScript фреймворками.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/2/classes.html"
                target="_blank"
                class="mr-2">
                TypeScript Handbook: Classes
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/handbook/decorators.html"
                target="_blank">
                TypeScript Handbook: Decorators
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
